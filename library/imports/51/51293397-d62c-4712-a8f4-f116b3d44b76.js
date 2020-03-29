"use strict";
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