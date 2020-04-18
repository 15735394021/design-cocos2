"use strict";
cc._RF.push(module, '51293OX1ixHEqj08Raz1Et2', 'game');
// script/game.js

"use strict";

var requestUrl = "http://47.104.80.127:8080/";
cc.Class({
  "extends": cc.Component,
  properties: {
    noticeLabel: {
      type: cc.Label,
      "default": null
    },
    myPackage: {
      type: cc.Node,
      "default": null
    },
    openDoorAudio: {
      type: cc.AudioClip,
      "default": null
    },
    openPackageAudio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true;
    p.gravity = cc.v2(0, 0); // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    window.game = this; // this.initialization();//游戏开始的数据初始化   网络请求
    // this.queryHeroDetail();  //已经在heroDetail.js里调用
    //通知提示的label初始化时active为false;

    this.noticeLabel.active = false;
    this.myPackage.active = false; //背包初始化不显示
  },
  initialization: function initialization() {
    //进入游戏的个人数据初始化,查背包
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);
      }
    };

    xhr.open("GET", requestUrl + "archives/beginGame?archivesId=1", true);
    xhr.send();
  },
  queryHeroDetail: function queryHeroDetail() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText); // console.log(response);
      }
    };

    xhr.open("GET", requestUrl + "archives/queryArchives?userId=1", true);
    xhr.send();
  },
  openAndClosePackage: function openAndClosePackage(pos) {
    this.myPackage.active = !this.myPackage.active;
    cc.audioEngine.play(this.openPackageAudio, false, 0.3);

    if (this.myPackage.active) {
      this.myPackage.setPosition(pos);
    }
  },
  notice: function notice(message, pos) {
    //进入房间的提示“房间没有东西，按q退出”
    this.node.getChildByName("map").opacity = 30;
    this.node.getChildByName("hero").opacity = 30;
    cc.audioEngine.play(this.openDoorAudio, false, 0.3); // this.node.addComponent(cc.Label);
    //   let noticeLabel = this.node.getComponent(cc.Label);   //notice打算动态生成的，而不是在this.noticeLabel节点更改
    //       noticeLabel.node.setPosition(pos);
    //   console.log(this.noticeLabel)
    //   console.log(noticeLabel)

    this.noticeLabel.node.setPosition(pos);
    this.noticeLabel.node.active = true;
    this.noticeLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT; //自适应高度。文字越多，会扩展高度

    this.noticeLabel.node._contentSize.width = 800;
    this.noticeLabel.string = message + "......  按'q'键退出";
  },
  noticeExit: function noticeExit() {
    //按q键退出的处理
    this.node.getChildByName("map").opacity = 255;
    this.node.getChildByName("hero").opacity = 255; // this.node.getComponent(cc.Label).destroy();

    cc.audioEngine.play(this.openDoorAudio, false, 0.3);
    this.noticeLabel.node.active = false;
  },
  switchMap: function switchMap(oldMap, newMap) {
    this.node.getChildByName(oldMap).active = false;
    this.node.getChildByName(newMap).active = true;
  },
  start: function start() {
    this.baseUrl = "http://47.104.80.127:8080/";
  },
  update: function update(dt) {}
});

cc._RF.pop();