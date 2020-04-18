"use strict";
cc._RF.push(module, 'fa61eIvIg9OdrxRbu6vr74S', 'ground3Init');
// script/ground3Init.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    hit_audio: {
      //击打时的音效
      type: cc.AudioClip,
      "default": null
    },
    bg_audio: {
      //背景音乐
      type: cc.AudioClip,
      "default": null
    },
    ready_play: {
      //游戏加载中的进度条
      type: cc.Node,
      "default": null
    },
    ready_progress: {
      //游戏加载中的当前进度label
      type: cc.Label,
      "default": null
    },
    hero_pre: {
      type: cc.Prefab,
      "default": null
    },
    mycamrea: {
      type: cc.Node,
      "default": null
    }
  },
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true; // p.gravity = cc.v2(0,-320);
    // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    this.ready_play.active = true;
    this.ready_progress.active = true;
    this.ready_play.getComponent(cc.ProgressBar).progress = 0;
    this.ready_progress.string = "地图正在初始化。。。";
    this.groundJs = this.node.getComponent("ground3");

    var _this = this;

    _this.groundJs.Init = function () {// _this.groundJs.mapCameraNode = hero_go.mycamrea;
      // hero_go.node.parent = _this.groundJs.getLayerNodeFun("map");
      // cc.director.getPhysicsManager().gravity = cc.v2(0,-320);
      // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
    };

    this.groundJs.onLoadSprite = function (node, name) {
      //加载图块时调用  onLoadSprite(图块：Node，图层名：String)
      if (name == "map") {
        var tag0 = node.getComponent(cc.PolygonCollider);

        if (tag0 != null && tag0.tag == 0) {
          var body = node.addComponent(cc.RigidBody);
          body.type = cc.RigidBodyType.Static;
          var ps = tag0.points;
          var collider = node.addComponent(cc.PhysicsPolygonCollider);

          for (var i = 0; i < ps.length; i++) {
            if (i > 3) {
              collider.points.push({
                x: ps[i].x,
                y: ps[i].y
              });
            } else {
              collider.points[i].x = ps[i].x;
              collider.points[i].y = ps[i].y;
            }
          }

          collider.apply();
        }
      }
    };

    this.groundJs.killSprite = function (node, name) {
      //每次图块从舞台上清除时调用    killSprite(图块：Node，图层名：String)
      if (name == "map") {
        var tag0 = node.getComponent(cc.PolygonCollider);

        if (tag0 != null && tag0.tag == 0) {
          var body = node.getComponent(cc.RigidBody);

          if (body == null) {
            return;
          }

          body.destroy();
          node.getComponent(cc.PhysicsPolygonCollider).destroy();
        }
      }
    };

    this.groundJs.Loading = function (Loaded, Total) {
      //Loading(已加载的贴图数：Number，总贴图数：Number)
      var progress = Loaded / Total;

      if (_this.ready_play != null) {
        _this.ready_progressNum = progress;
      }

      if (_this.ready_progress != null) {
        _this.ready_progress.string = "地图正在创建：" + progress * 100 + "%";
      }
    };
  },
  generate: function generate() {
    //加载英雄预制体进入地图
    var heroNode = cc.instantiate(this.hero_pre);
    var heroNodeJs = heroNode.getComponent("hero_go");
    heroNode.parent = this.groundJs.getLayerNodeFun("hero"); // heroNode.setPosition(cc.v2(0,0));

    heroNodeJs.mycamrea = this.mycamrea;
    heroNodeJs.groundJsNode = this.node;
    heroNodeJs.map = "ground3";
    heroNodeJs.top = this.node.parent.getChildByName("top");
  },
  start: function start() {
    cc.director.getPhysicsManager().gravity = cc.v2(0, -320);
  },
  update: function update(dt) {
    if (this.ready_play != null) {
      var progress = this.ready_play.getComponent(cc.ProgressBar).progress;

      if (progress <= this.ready_progressNum) {
        progress = progress + 0.01;
        this.ready_play.getComponent(cc.ProgressBar).progress = progress;

        if (this.ready_play.getComponent(cc.ProgressBar).progress >= 1 && this.ready_play.getComponent(cc.ProgressBar).progress <= 1.02) {
          this.ready_play.active = false;
          this.ready_progress.active = false; // this.node.getChildByName("ready_play").destroy();

          cc.audioEngine.play(this.bg_audio, true, 0.3);
          this.generate(); // this.node.getChildByName("hero").active = true;
        }
      }
    }
  }
});

cc._RF.pop();