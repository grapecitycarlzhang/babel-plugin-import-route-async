import {
    transformFileSync
} from "@babel/core"
import {
    readFileSync
} from "fs"
import {
    join
} from "path"
import assert from "assert"
import plugin from "../lib/index"

function trim(str) {
    return str.trim().replace(/[\r\n\s]*/g, '');
}

function validCase(caseName, sourceKey, localKey, async) {
    var actualFile = join(join(__dirname, 'fixtures'), `import/${caseName}/input.js`);
    var expectedFile = join(join(__dirname, 'fixtures'), `import/${caseName}/output.js`);

    var actual = trim(transformFileSync(actualFile, {
        plugins: [
            [plugin, {
                sourceKey: sourceKey,
                localKey: localKey,
                async: async
            }, 'route'],
        ],
        babelrc: false,
    }).code).replace('importlazyloadfrom"react-lazyable";', '').split('');

    var expected = trim(readFileSync(expectedFile, 'utf-8')).split('');
    for (let index = 0; index < actual.length; index++) {
        if (expected[index] !== actual[index]) {
            console.error(`------Test case: ${caseName} throw errors as follows:`)
            assert.equal(actual.join('').slice(index), expected.join('').slice(index))
            break;
        }
    }

    // assert.equal(actual, expected)
}
describe('route-sync', function () {
    validCase('route-sync', undefined, undefined, false)
})
describe('route-sync-async', function () {
    validCase('route-sync-async', undefined, undefined, false)
})
describe('route-sync-async-others', function () {
    validCase('route-sync-async-others', undefined, undefined, false)
})
describe('route-async', function () {
    validCase('route-async')
})
describe('route-async-sync', function () {
    validCase('route-async-sync')
})
describe('route-async-sync-others', function () {
    validCase('route-async-sync-others')
})