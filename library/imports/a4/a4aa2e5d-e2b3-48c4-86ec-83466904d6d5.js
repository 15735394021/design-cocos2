"use strict";
cc._RF.push(module, 'a4aa25d4rNIxIbsg0ZpBNbV', 'register');
// script/register.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.g_register = this;
  },
  show: function show() {
    this.node.active = true;
  },
  hide: function hide() {
    this.node.active = false;
  },
  onClickClose: function onClickClose() {
    this.hide();
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();