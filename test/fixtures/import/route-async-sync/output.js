var defaultroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.defaultroutepage || modules.default;
    },
    identifier: "defaultroutepage"
});
import /* route-sync */ defaultcommentroutepage from './pages/routepage';
var specifierroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.specifierroutepage || modules.default;
    },
    identifier: "specifierroutepage"
});
import {
    /* route-sync */
    specifiercommentroutepage
} from './pages/routepage';