
(function () {
var scripts = [{"deps":{"./assets/script/archivesList":2,"./assets/script/csjs":4,"./assets/script/enemy1":9,"./assets/script/ground":25,"./assets/script/game":8,"./assets/script/ground3":24,"./assets/script/ground2":26,"./assets/script/groundInit":7,"./assets/script/heroCollision":12,"./assets/script/ground3Init":11,"./assets/script/hero_go":1,"./assets/script/gold101":6,"./assets/script/heroModel":14,"./assets/script/loading":13,"./assets/script/myDrug":15,"./assets/script/register":18,"./assets/script/talk":19,"./assets/script/myProp":16,"./assets/script/shilaimu":17,"./assets/script/login":21,"./assets/script/welcome":22,"./assets/script/BlackMap":23,"./assets/migration/use_v2.1-2.2.1_cc.Toggle_event":5,"./assets/script/archive":20,"./assets/script/myPackage":10,"./assets/script/dici":3},"path":"preview-scripts/__qc_index__.js"},{"deps":{},"path":"preview-scripts/assets/script/hero_go.js"},{"deps":{},"path":"preview-scripts/assets/script/archivesList.js"},{"deps":{},"path":"preview-scripts/assets/script/dici.js"},{"deps":{},"path":"preview-scripts/assets/script/csjs.js"},{"deps":{},"path":"preview-scripts/assets/migration/use_v2.1-2.2.1_cc.Toggle_event.js"},{"deps":{},"path":"preview-scripts/assets/script/gold101.js"},{"deps":{},"path":"preview-scripts/assets/script/groundInit.js"},{"deps":{},"path":"preview-scripts/assets/script/game.js"},{"deps":{},"path":"preview-scripts/assets/script/enemy1.js"},{"deps":{},"path":"preview-scripts/assets/script/myPackage.js"},{"deps":{},"path":"preview-scripts/assets/script/ground3Init.js"},{"deps":{},"path":"preview-scripts/assets/script/heroCollision.js"},{"deps":{},"path":"preview-scripts/assets/script/loading.js"},{"deps":{},"path":"preview-scripts/assets/script/heroModel.js"},{"deps":{},"path":"preview-scripts/assets/script/myDrug.js"},{"deps":{},"path":"preview-scripts/assets/script/myProp.js"},{"deps":{},"path":"preview-scripts/assets/script/shilaimu.js"},{"deps":{},"path":"preview-scripts/assets/script/register.js"},{"deps":{},"path":"preview-scripts/assets/script/talk.js"},{"deps":{},"path":"preview-scripts/assets/script/archive.js"},{"deps":{},"path":"preview-scripts/assets/script/login.js"},{"deps":{},"path":"preview-scripts/assets/script/welcome.js"},{"deps":{},"path":"preview-scripts/assets/script/BlackMap.js"},{"deps":{"BlackMap":23},"path":"preview-scripts/assets/script/ground3.js"},{"deps":{"BlackMap":23},"path":"preview-scripts/assets/script/ground.js"},{"deps":{"BlackMap":23},"path":"preview-scripts/assets/script/ground2.js"}];
var entries = ["preview-scripts/__qc_index__.js"];

/**
 * Notice: This file can not use ES6 (for IE 11)
 */
var modules = {};
var name2path = {};

if (typeof global === 'undefined') {
    window.global = window;
}

function loadScript (src, cb) {
    if (typeof require !== 'undefined') {
        require(src);
        return cb();
    }

    // var timer = 'load ' + src;
    // console.time(timer);

    var scriptElement = document.createElement('script');

    function done() {
        // console.timeEnd(timer);
        // deallocation immediate whatever
        scriptElement.remove();
    }

    scriptElement.onload = function () {
        done();
        cb();
    };
    scriptElement.onerror = function () {
        done();
        var error = 'Failed to load ' + src;
        console.error(error);
        cb(new Error(error));
    };
    scriptElement.setAttribute('type','text/javascript');
    scriptElement.setAttribute('charset', 'utf-8');
    scriptElement.setAttribute('src', src);

    document.head.appendChild(scriptElement);
}

function loadScripts (srcs, cb) {
    var n = srcs.length;

    srcs.forEach(function (src) {
        loadScript(src, function () {
            n--;
            if (n === 0) {
                cb();
            }
        });
    })
}

function formatPath (path) {
    let destPath = window.__quick_compile_project__.destPath;
    if (destPath) {
        let prefix = 'preview-scripts';
        if (destPath[destPath.length - 1] === '/') {
            prefix += '/';
        }
        path = path.replace(prefix, destPath);
    }
    return path;
}

window.__quick_compile_project__ = {
    destPath: '',

    registerModule: function (path, module) {
        path = formatPath(path);
        modules[path].module = module;
    },

    registerModuleFunc: function (path, func) {
        path = formatPath(path);
        modules[path].func = func;

        var sections = path.split('/');
        var name = sections[sections.length - 1];
        name = name.replace(/\.(?:js|ts|json)$/i, '');
        name2path[name] = path;
    },

    require: function (request, path) {
        var m, requestScript;

        path = formatPath(path);
        if (path) {
            m = modules[path];
            if (!m) {
                console.warn('Can not find module for path : ' + path);
                return null;
            }
        }

        if (m) {
            requestScript = scripts[ m.deps[request] ];
        }
        
        path = '';
        if (!requestScript) {
            // search from name2path when request is a dynamic module name
            if (/^[\w- .]*$/.test(request)) {
                path = name2path[request];
            }

            if (!path) {
                if (CC_JSB) {
                    return require(request);
                }
                else {
                    console.warn('Can not find deps [' + request + '] for path : ' + path);
                    return null;
                }
            }
        }
        else {
            path = formatPath(requestScript.path);
        }

        m = modules[path];
        
        if (!m) {
            console.warn('Can not find module for path : ' + path);
            return null;
        }

        if (!m.module && m.func) {
            m.func();
        }

        if (!m.module) {
            console.warn('Can not find module.module for path : ' + path);
            return null;
        }

        return m.module.exports;
    },

    run: function () {
        entries.forEach(function (entry) {
            entry = formatPath(entry);
            var module = modules[entry];
            if (!module.module) {
                module.func();
            }
        });
    },

    load: function (cb) {
        var self = this;

        var srcs = scripts.map(function (script) {
            var path = formatPath(script.path);
            modules[path] = script;
        
            if (script.mtime) {
                path += ("?mtime=" + script.mtime);
            }
        
            return path;
        });

        loadScripts(srcs, function () {
            self.run();
            cb();
        });
    }
};

// Polyfill for IE 11
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function () {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
})();
    