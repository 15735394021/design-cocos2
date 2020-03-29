"use strict";
cc._RF.push(module, '88f4dRXWHdA2boc1EUQJNQp', 'groundInit');
// script/groundInit.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    hit_audio: {
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    // cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;
    // cc.director.getPhysicsManager().enable = true;
    this.groundJs = this.node.getComponent("ground2");

    var _this = this;

    _this.groundJs.Init = function () {
      console.log("初始化");
      console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
    };

    _this.groundJs.onLoadSpriteParent = function (n, LayerName, bo) {//onLoadSpriteParent(父节点：Node，图层名：String，是否第一次加载：bool)
      // console.log(_this.groundJs.getLayerNodeFun("map").getComponent(cc.BoxCollider));
    };

    _this.groundJs.onLoadYMovieClip = function (ymc, layerName, bo) {
      //加载动画
      if (ymc.name == "hk1") {
        ymc.on("sound", function (event) {
          cc.audioEngine.play(_this.hit_audio, false, 0.3);
        });
      }
    };

    this.groundJs.onLoadSprite = function (node, name) {
      //加载图块  onLoadSprite(图块：Node，图层名：String)
      if (name == "map") {
        var tag0 = node.getComponent(cc.PolygonCollider);

        if (tag0 != null && tag0.tag == 0) {
          var body = node.addComponent(cc.RigidBody);
          body.type = cc.RigidBodyType.Static;
          var collider = node.addComponent(cc.PhysicsPolygonCollider);
          collider.offset = tag0.offset;
          collider.Points = tag0.points;
          collider.apply();
        }
      }
    };
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();