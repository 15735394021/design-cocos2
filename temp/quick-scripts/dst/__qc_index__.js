
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/migration/use_v2.1-2.2.1_cc.Toggle_event');
require('./assets/script/BlackMap');
require('./assets/script/archive');
require('./assets/script/archivesList');
require('./assets/script/csjs');
require('./assets/script/dici');
require('./assets/script/enemy1');
require('./assets/script/game');
require('./assets/script/gold101');
require('./assets/script/ground');
require('./assets/script/ground2');
require('./assets/script/ground3');
require('./assets/script/ground3Init');
require('./assets/script/groundInit');
require('./assets/script/heroCollision');
require('./assets/script/heroModel');
require('./assets/script/hero_go');
require('./assets/script/loading');
require('./assets/script/login');
require('./assets/script/myDrug');
require('./assets/script/myPackage');
require('./assets/script/myProp');
require('./assets/script/register');
require('./assets/script/shilaimu');
require('./assets/script/talk');
require('./assets/script/welcome');

                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();