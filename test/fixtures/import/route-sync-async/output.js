import defaultroutepage from './pages/routepage';
var defaultcommentroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.defaultcommentroutepage || modules.default;
    },
    identifier: "defaultcommentroutepage"
});
import {
    specifierroutepage
} from './pages/routepage';
var specifiercommentroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.specifiercommentroutepage || modules.default;
    },
    identifier: "specifiercommentroutepage"
});