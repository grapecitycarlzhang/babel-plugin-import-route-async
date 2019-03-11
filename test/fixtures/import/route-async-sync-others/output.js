import {
    defaultroutepageother1,
    defaultroutepageother2
} from "./pages/routepage";
var defaultroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.defaultroutepage || modules.default;
    },
    identifier: "defaultroutepage"
});
import /* route-sync */ defaultcommentroutepage, {
    defaultcommentroutepageother1,
    defaultcommentroutepageother2
} from "./pages/routepage";
import {
    specifierroutepageother1,
    specifierroutepageother2
} from "./pages/routepage";
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
    specifiercommentroutepage,
    specifiercommentroutepageother1,
    specifiercommentroutepageother2
} from "./pages/routepage";