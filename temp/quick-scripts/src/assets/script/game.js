"use strict";
cc._RF.push(module, '51293OX1ixHEqj08Raz1Et2', 'game');
// script/game.js

"use strict";

var requestUrl = "http://47.104.80.127:8080/archives/queryArchives";
cc.Class({
  "extends": cc.Component,
  properties: {
    noticeLabel: {
      type: cc.Label,
      "default": null
    }
  },
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true;
    p.gravity = cc.v2(0, 0); // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    window.game = this;
    this.initialization(); //游戏开始的数据初始化
    //通知提示的label初始化时active为false;

    this.noticeLabel.active = false;
  },
  initialization: function initialization() {
    //进入游戏的个人数据初始化
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = xhr.responseText;
        console.log(response);
      }
    };

    xhr.open("GET", requestUrl, true);
    xhr.send();
  },
  notice: function notice(message, x, y) {
    //进入房间的提示“房间没有东西，按q退出”
    this.node.getChildByName("map").opacity = 30;
    this.node.getChildByName("hero").opacity = 30;
    var noticePos = cc.v2(x, y);
    this.noticeLabel.node.setPosition(noticePos);
    this.noticeLabel.node.active = true;
    this.noticeLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT; //自适应高度。文字狱热多，会扩展高度

    this.noticeLabel.node._contentSize.width = 800;
    this.noticeLabel.string = message + "......  按'q'键退出";
  },
  noticeExit: function noticeExit() {
    //按q键退出的处理
    this.noticeLabel.active = false;
    this.node.getChildByName("map").opacity = 255;
    this.node.getChildByName("hero").opacity = 255;
    this.noticeLabel.node.active = false;
  },
  openKnapsack: function openKnapsack() {//打开背包
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();