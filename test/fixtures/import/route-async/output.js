var defaultroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.defaultroutepage || modules.default;
    },
    identifier: "defaultroutepage"
});
var defaultcommentroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.defaultcommentroutepage || modules.default;
    },
    identifier: "defaultcommentroutepage"
});
var specifierroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.specifierroutepage || modules.default;
    },
    identifier: "specifierroutepage"
});
var specifiercommentroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.specifiercommentroutepage || modules.default;
    },
    identifier: "specifiercommentroutepage"
});