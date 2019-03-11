import defaultroutepage, {
    defaultroutepageother1,
    defaultroutepageother2
} from "./pages/routepage";
import {
    defaultcommentroutepageother1,
    defaultcommentroutepageother2
} from "./pages/routepage";
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
    specifierroutepage,
    specifierroutepageother1,
    specifierroutepageother2
} from "./pages/routepage";
import {
    specifiercommentroutepageother1,
    specifiercommentroutepageother2
} from "./pages/routepage";
var specifiercommentroutepage = lazyload({
    loader: function () {
        return import("./pages/routepage");
    },
    export: function (modules) {
        return modules.specifiercommentroutepage || modules.default;
    },
    identifier: "specifiercommentroutepage"
});