/*!
 curves.js
 (c) 2015 Bartosz Krawczyk
 bartoszkrawczyk.com
 MIT License
*/
var regs = requirejs.config({
    "waitSeconds": 0,
    "enforceDefine": false,
    "baseUrl": "/assets/js",
    "paths": {
        "app"        : "app",
        "modules"    : "app/modules",
        "components" : "app/components",
        "libs"       : "libs",
        "jquery"     : "libs/jquery/dist/jquery",
        "react"      : "libs/react/react"
    }
});

regs(["app/app"]);