
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '51293OX1ixHEqj08Raz1Et2', 'game');
// script/game.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true;
    p.gravity = cc.v2(0, 0);
    p.debugDrawFlags = true; //显示出来碰撞边框，为了方便演示
    // cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwib25Mb2FkIiwicCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJlbmFibGVkIiwiZ3Jhdml0eSIsInYyIiwiZGVidWdEcmF3RmxhZ3MiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFPTEMsRUFBQUEsTUFQSyxvQkFPSztBQUNOLFFBQUlDLENBQUMsR0FBR0wsRUFBRSxDQUFDTSxRQUFILENBQVlDLGlCQUFaLEVBQVI7QUFDQUYsSUFBQUEsQ0FBQyxDQUFDRyxPQUFGLEdBQVksSUFBWjtBQUNBSCxJQUFBQSxDQUFDLENBQUNJLE9BQUYsR0FBWVQsRUFBRSxDQUFDVSxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBWjtBQUNBTCxJQUFBQSxDQUFDLENBQUNNLGNBQUYsR0FBbUIsSUFBbkIsQ0FKTSxDQUlvQjtBQUMxQjtBQUNBO0FBQ0gsR0FkSTtBQWdCTEMsRUFBQUEsS0FoQkssbUJBZ0JJLENBRVIsQ0FsQkksQ0FvQkw7O0FBcEJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHAuZ3Jhdml0eSA9IGNjLnYyKDAsMCk7IFxyXG4gICAgICAgIHAuZGVidWdEcmF3RmxhZ3MgPSB0cnVlOyAgLy/mmL7npLrlh7rmnaXnorDmkp7ovrnmoYbvvIzkuLrkuobmlrnkvr/mvJTnpLpcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7IC8v5qOA5rWL56Kw5pKeXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlOy8v56Kw5pKe5qOA5rWL55qE6L655qGG5pi+56S6XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19