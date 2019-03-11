import {
  declare
} from "@babel/helper-plugin-utils";
import {
  types as t
} from "@babel/core";


export default declare((api, options) => {
  api.assertVersion(7);

  const pluginState = {
    useLazyLoad: {
      existed: false,
      appended: false,
      noUse: () => !pluginState.useLazyLoad.existed && !pluginState.useLazyLoad.appended
    }
  }

  function buildAsyncAst(spec, path) {
    return t.variableDeclaration(
      "var",
      [
        t.variableDeclarator(
          t.identifier(spec.local.name),
          t.callExpression(
            t.identifier('lazyload'),
            [
              t.objectExpression([
                t.objectProperty(
                  t.identifier('loader'),
                  t.functionExpression(
                    null,
                    [],
                    t.blockStatement([
                      t.returnStatement(
                        t.callExpression(
                          t.identifier('import'),
                          [t.stringLiteral(path)]
                        ))
                    ])
                  )
                ),
                t.objectProperty(
                  t.identifier('export'),
                  t.functionExpression(
                    null,
                    [t.identifier('modules')],
                    t.blockStatement([
                      t.returnStatement(
                        t.logicalExpression("||",
                          t.memberExpression(
                            t.identifier('modules'),
                            t.identifier(spec.imported ? spec.imported.name : spec.local.name)),
                          t.memberExpression(
                            t.identifier('modules'),
                            t.identifier('default'))))
                    ])
                  )
                ),
                t.objectProperty(
                  t.identifier('identifier'),
                  t.stringLiteral(spec.local.name)
                )
              ])
            ]
          )
        )
      ]
    );
  }

  function buildSyncAst(specs, path) {
    const specifiers = specs.map(spec =>
      t.isImportDefaultSpecifier(spec) ?
      t.importDefaultSpecifier(t.identifier(spec.local.name)) :
      t.importSpecifier(t.identifier(spec.local.name), t.identifier(spec.imported.name)));
    return t.importDeclaration(specifiers, t.stringLiteral(path));
  }

  function buildLazyLoadAst() {
    return t.importDeclaration([t.importDefaultSpecifier(t.identifier('lazyload'))], t.stringLiteral('react-lazyable'))
  }

  function existLazyLoad(node) {
    if (node.source.value === 'react-lazyable' && node.specifiers.length === 1 && node.specifiers[0].local.name === 'lazyload') {
      pluginState.useLazyLoad.existed = true;
    }
  }

  function appendLazyLoadAst() {
    if (pluginState.useLazyLoad.noUse()) {
      pluginState.useLazyLoad.appended = true;
      return [buildLazyLoadAst()]
    } else {
      return []
    }
  }

  function getLeadingComments(spec) {
    return spec.leadingComments || []
  }

  function hasRouteKey(spec, key) {
    return getLeadingComments(spec).some(c => c.value.search(key) > -1)
  }

  function hasLocalKey(spec) {
    return spec.local.name.search(localKey) > -1
  }

  function hasSourceKey(node) {
    return node.source.value.search(sourceKey) > -1
  }

  function useExactMatch(spec, node) {
    const imported = hasLocalKey(spec) || hasRouteKey(spec, 'route-async')
    return exact ? imported && hasSourceKey(node) : imported;
  }

  var
    sourceKey = options.sourceKey || /\/pages?\//,
    localKey = options.localKey || /.*[p|P]age$/,
    exact = options.async === undefined ? true : options.exact,
    async = options.async === undefined ? true : options.async;

  return {
    name: "import-route-async",

    visitor: {
      Program: {
        exit() {
          pluginState.useLazyLoad.existed = false
          pluginState.useLazyLoad.appended = false
        }
      },
      ImportDeclaration(path) {
        const {
          node
        } = path;

        // path maybe removed by prev instances.
        if (!node) return;

        existLazyLoad(node);

        if (node.specifiers
          .some(spec =>
            hasLocalKey(spec) ||
            hasRouteKey(spec, /route-a?sync/)) ||
          hasSourceKey(node)) {

          const asts = [];
          const others = [];

          node.specifiers.forEach(spec => {
            if (async) {
              if (useExactMatch(spec, node) && !hasRouteKey(spec, 'route-sync')) {
                asts.push(buildAsyncAst(spec, node.source.value));
              } else {
                others.push(spec);
              }
            } else {
              if (hasRouteKey(spec, 'route-async')) {
                asts.push(buildAsyncAst(spec, node.source.value));
              } else {
                others.push(spec);
              }
            }
          })

          if (asts.length > 0) {
            const asyncAst = appendLazyLoadAst().concat(asts);
            path.replaceWithMultiple(others.length > 0 ? [buildSyncAst(others, node.source.value)].concat(asyncAst) : asyncAst);
          }

        }

      }
    }
  };
});