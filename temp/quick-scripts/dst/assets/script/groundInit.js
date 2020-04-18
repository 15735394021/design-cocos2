
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/groundInit.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '88f4dRXWHdA2boc1EUQJNQp', 'groundInit');
// script/groundInit.js

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
    flameParticle: {
      //火焰粒子，用在村庄门口的开门关门效果
      type: cc.ParticleSystem,
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
    p.enabled = true;
    p.gravity = cc.v2(0, 0); // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    this.ready_play.active = true;
    this.ready_progress.active = true;
    this.ready_play.getComponent(cc.ProgressBar).progress = 0;
    this.ready_progress.string = "地图正在初始化。。。";
    this.groundJs = this.node.getComponent("ground2");

    var _this = this;

    _this.groundJs.Init = function () {// _this.groundJs.mapCameraNode = this.mycamrea;
      // hero_go.node.parent = _this.groundJs.getLayerNodeFun("map");
      // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
    };

    _this.groundJs.onLoadSpriteParent = function (n, LayerName, bo) {//onLoadSpriteParent(父节点：Node，图层名：String，是否第一次加载：bool)
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
      //加载图块时调用  onLoadSprite(图块：Node，图层名：String)
      if (name == "map") {
        var tag0 = node.getComponent(cc.PolygonCollider);

        if (tag0 != null && tag0.tag == 0 && node.getComponent(cc.RigidBody) == null && node.getComponent(cc.PhysicsPolygonCollider) == null) {
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

          if (body != null) {
            body.destroy();
          }

          var pp = node.getComponent(cc.PhysicsPolygonCollider);

          if (pp != null) {
            pp.destroy();
          }
        }
      }
    };

    this.groundJs.killSpriteParent = function (n, LayerName) {// 每次图块父节点从舞台上清除时调用。  killSpriteParent(父图块：Node，图层名：String)
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
  start: function start() {},
  onEnable: function onEnable() {//active,enable从false变成true
  },
  onDisable: function onDisable() {//active,enable从true变成false
  },
  generate: function generate() {
    //加载英雄预制体进入地图
    var heroNode = cc.instantiate(this.hero_pre);
    var heroNodeJs = heroNode.getComponent("hero_go");
    heroNode.parent = this.groundJs.getLayerNodeFun("map"); // heroNode.setPosition(cc.v2(0,0));

    heroNodeJs.mycamrea = this.mycamrea;
    heroNodeJs.groundJsNode = this.node;
    heroNodeJs.map = "ground2";
    heroNodeJs.top = this.node.parent.getChildByName("top");
  },
  closeDoor: function closeDoor(point1, point2) {//关门时的点起火焰粒子
  },
  update: function update(dt) {
    // console.log(dt)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxncm91bmRJbml0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaGl0X2F1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsImJnX2F1ZGlvIiwicmVhZHlfcGxheSIsIk5vZGUiLCJyZWFkeV9wcm9ncmVzcyIsIkxhYmVsIiwiZmxhbWVQYXJ0aWNsZSIsIlBhcnRpY2xlU3lzdGVtIiwiaGVyb19wcmUiLCJQcmVmYWIiLCJteWNhbXJlYSIsIm9uTG9hZCIsInAiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZW5hYmxlZCIsImdyYXZpdHkiLCJ2MiIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJhY3RpdmUiLCJnZXRDb21wb25lbnQiLCJQcm9ncmVzc0JhciIsInByb2dyZXNzIiwic3RyaW5nIiwiZ3JvdW5kSnMiLCJub2RlIiwiX3RoaXMiLCJJbml0Iiwib25Mb2FkU3ByaXRlUGFyZW50IiwibiIsIkxheWVyTmFtZSIsImJvIiwib25Mb2FkWU1vdmllQ2xpcCIsInltYyIsImxheWVyTmFtZSIsIm5hbWUiLCJvbiIsImV2ZW50IiwiYXVkaW9FbmdpbmUiLCJwbGF5Iiwib25Mb2FkU3ByaXRlIiwidGFnMCIsIlBvbHlnb25Db2xsaWRlciIsInRhZyIsIlJpZ2lkQm9keSIsIlBoeXNpY3NQb2x5Z29uQ29sbGlkZXIiLCJib2R5IiwiYWRkQ29tcG9uZW50IiwiUmlnaWRCb2R5VHlwZSIsIlN0YXRpYyIsInBzIiwicG9pbnRzIiwiY29sbGlkZXIiLCJpIiwibGVuZ3RoIiwicHVzaCIsIngiLCJ5IiwiYXBwbHkiLCJraWxsU3ByaXRlIiwiZGVzdHJveSIsInBwIiwia2lsbFNwcml0ZVBhcmVudCIsIkxvYWRpbmciLCJMb2FkZWQiLCJUb3RhbCIsInJlYWR5X3Byb2dyZXNzTnVtIiwic3RhcnQiLCJvbkVuYWJsZSIsIm9uRGlzYWJsZSIsImdlbmVyYXRlIiwiaGVyb05vZGUiLCJpbnN0YW50aWF0ZSIsImhlcm9Ob2RlSnMiLCJwYXJlbnQiLCJnZXRMYXllck5vZGVGdW4iLCJncm91bmRKc05vZGUiLCJtYXAiLCJ0b3AiLCJnZXRDaGlsZEJ5TmFtZSIsImNsb3NlRG9vciIsInBvaW50MSIsInBvaW50MiIsInVwZGF0ZSIsImR0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFDO0FBQUs7QUFDWEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLFNBREY7QUFFTixpQkFBUTtBQUZGLEtBREY7QUFLUkMsSUFBQUEsUUFBUSxFQUFDO0FBQUs7QUFDVkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLFNBREg7QUFFTCxpQkFBUTtBQUZILEtBTEQ7QUFTUkUsSUFBQUEsVUFBVSxFQUFDO0FBQUk7QUFDWEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNTLElBREQ7QUFFUCxpQkFBUztBQUZGLEtBVEg7QUFhUkMsSUFBQUEsY0FBYyxFQUFDO0FBQUk7QUFDZkwsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXLEtBREc7QUFFWCxpQkFBUTtBQUZHLEtBYlA7QUFpQlJDLElBQUFBLGFBQWEsRUFBQztBQUFJO0FBQ2RQLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDYSxjQURFO0FBRVYsaUJBQVE7QUFGRSxLQWpCTjtBQXFCUkMsSUFBQUEsUUFBUSxFQUFDO0FBQ0xULE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDZSxNQURIO0FBRUwsaUJBQVE7QUFGSCxLQXJCRDtBQXlCUkMsSUFBQUEsUUFBUSxFQUFDO0FBQ0xYLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDUyxJQURIO0FBRUwsaUJBQVE7QUFGSDtBQXpCRCxHQUhQO0FBa0NMUSxFQUFBQSxNQWxDSyxvQkFrQ0s7QUFDTixRQUFJQyxDQUFDLEdBQUds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QUFlQyxJQUFmLENBQW9CLEtBQUt0QyxRQUF6QixFQUFrQyxJQUFsQyxFQUF1QyxHQUF2QztBQUNBLGVBQUtxRSxRQUFMLEdBTDJILENBTTNIO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUE1SkksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBoaXRfYXVkaW86eyAgICAvL+WHu+aJk+aXtueahOmfs+aViFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBiZ19hdWRpbzp7ICAgIC8v6IOM5pmv6Z+z5LmQXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWR5X3BsYXk6eyAgIC8v5ri45oiP5Yqg6L295Lit55qE6L+b5bqm5p2hXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDogbnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVhZHlfcHJvZ3Jlc3M6eyAgIC8v5ri45oiP5Yqg6L295Lit55qE5b2T5YmN6L+b5bqmbGFiZWxcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBmbGFtZVBhcnRpY2xlOnsgICAvL+eBq+eEsOeykuWtkO+8jOeUqOWcqOadkeW6hOmXqOWPo+eahOW8gOmXqOWFs+mXqOaViOaenFxyXG4gICAgICAgICAgICB0eXBlOmNjLlBhcnRpY2xlU3lzdGVtLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlcm9fcHJlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXljYW1yZWE6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHAuZ3Jhdml0eSA9IGNjLnYyKDAsMCk7XHJcbiAgICAgICAgLy8gcC5kZWJ1Z0RyYXdGbGFncyA9IHRydWU7ICAvL+aYvuekuuWHuuadpeeisOaSnui+ueahhu+8jOS4uuS6huaWueS+v+a8lOekulxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTsgLy/mo4DmtYvnorDmkp5cclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7Ly/norDmkp7mo4DmtYvnmoTovrnmoYbmmL7npLpcclxuXHJcbiAgICAgICAgdGhpcy5yZWFkeV9wbGF5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWFkeV9wcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLnJlYWR5X3Byb2dyZXNzLnN0cmluZyA9IFwi5Zyw5Zu+5q2j5Zyo5Yid5aeL5YyW44CC44CC44CCXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiZ3JvdW5kMlwiKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLmdyb3VuZEpzLkluaXQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gX3RoaXMuZ3JvdW5kSnMubWFwQ2FtZXJhTm9kZSA9IHRoaXMubXljYW1yZWE7XHJcbiAgICAgICAgICAgIC8vIGhlcm9fZ28ubm9kZS5wYXJlbnQgPSBfdGhpcy5ncm91bmRKcy5nZXRMYXllck5vZGVGdW4oXCJtYXBcIik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKF90aGlzLmdyb3VuZEpzLmdldExheWVyTm9kZUZ1bihcIm1hcFwiKS5SZWN0MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF90aGlzLmdyb3VuZEpzLm9uTG9hZFNwcml0ZVBhcmVudD1mdW5jdGlvbihuLExheWVyTmFtZSxibyl7Ly9vbkxvYWRTcHJpdGVQYXJlbnQo54i26IqC54K577yaTm9kZe+8jOWbvuWxguWQje+8mlN0cmluZ++8jOaYr+WQpuesrOS4gOasoeWKoOi9ve+8mmJvb2wpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBfdGhpcy5ncm91bmRKcy5vbkxvYWRZTW92aWVDbGlwPWZ1bmN0aW9uKHltYyxsYXllck5hbWUsYm8pey8v5Yqg6L295Yqo55S7XHJcbiAgICAgICAgICAgIGlmKHltYy5uYW1lID09IFwiaGsxXCIpe1xyXG4gICAgICAgICAgICAgICAgeW1jLm9uKFwic291bmRcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShfdGhpcy5oaXRfYXVkaW8sZmFsc2UsMC4zKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcy5vbkxvYWRTcHJpdGU9ZnVuY3Rpb24obm9kZSxuYW1lKXsgLy/liqDovb3lm77lnZfml7bosIPnlKggIG9uTG9hZFNwcml0ZSjlm77lnZfvvJpOb2Rl77yM5Zu+5bGC5ZCN77yaU3RyaW5nKVxyXG4gICAgICAgICAgICBpZihuYW1lID09IFwibWFwXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhZzAgPSBub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFnMCAhPSBudWxsICYmIHRhZzAudGFnID09IDAgJiYgbm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KSA9PSBudWxsICYmIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NQb2x5Z29uQ29sbGlkZXIpID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib2R5ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LnR5cGUgPSBjYy5SaWdpZEJvZHlUeXBlLlN0YXRpYztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHMgPSB0YWcwLnBvaW50cztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSBub2RlLmFkZENvbXBvbmVudChjYy5QaHlzaWNzUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHBzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID4gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHMucHVzaCh7eDpwc1tpXS54LHk6cHNbaV0ueX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbaV0ueCA9IHBzW2ldLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbaV0ueSA9IHBzW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIuYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VuZEpzLmtpbGxTcHJpdGU9ZnVuY3Rpb24obm9kZSxuYW1lKXsvL+avj+asoeWbvuWdl+S7juiInuWPsOS4iua4hemZpOaXtuiwg+eUqCAgICBraWxsU3ByaXRlKOWbvuWdl++8mk5vZGXvvIzlm77lsYLlkI3vvJpTdHJpbmcpXHJcbiAgICAgICAgICAgIGlmKG5hbWUgPT0gXCJtYXBcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnMCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZih0YWcwICE9IG51bGwgJiYgdGFnMC50YWcgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGJvZHkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHAgPSBub2RlLmdldENvbXBvbmVudChjYy5QaHlzaWNzUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihwcCAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcHAuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VuZEpzLmtpbGxTcHJpdGVQYXJlbnQ9ZnVuY3Rpb24obixMYXllck5hbWUpey8vIOavj+asoeWbvuWdl+eItuiKgueCueS7juiInuWPsOS4iua4hemZpOaXtuiwg+eUqOOAgiAga2lsbFNwcml0ZVBhcmVudCjniLblm77lnZfvvJpOb2Rl77yM5Zu+5bGC5ZCN77yaU3RyaW5nKVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcy5Mb2FkaW5nPWZ1bmN0aW9uKExvYWRlZCxUb3RhbCl7ICAgLy9Mb2FkaW5nKOW3suWKoOi9veeahOi0tOWbvuaVsO+8mk51bWJlcu+8jOaAu+i0tOWbvuaVsO+8mk51bWJlcilcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gTG9hZGVkL1RvdGFsO1xyXG4gICAgICAgICAgICBpZihfdGhpcy5yZWFkeV9wbGF5ICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVhZHlfcHJvZ3Jlc3NOdW0gPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZihfdGhpcy5yZWFkeV9wcm9ncmVzcyAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlYWR5X3Byb2dyZXNzLnN0cmluZyA9XCLlnLDlm77mraPlnKjliJvlu7rvvJpcIisgcHJvZ3Jlc3MqMTAwK1wiJVwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgXHJcbiAgICB9LFxyXG5cclxuICAgIG9uRW5hYmxlKCl7Ly9hY3RpdmUsZW5hYmxl5LuOZmFsc2Xlj5jmiJB0cnVlXHJcblxyXG4gICAgfSxcclxuICAgIG9uRGlzYWJsZSgpey8vYWN0aXZlLGVuYWJsZeS7jnRydWXlj5jmiJBmYWxzZVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgZ2VuZXJhdGUoKXsvL+WKoOi9veiLsembhOmihOWItuS9k+i/m+WFpeWcsOWbvlxyXG4gICAgICAgIGxldCBoZXJvTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaGVyb19wcmUpO1xyXG4gICAgICAgIGxldCBoZXJvTm9kZUpzID0gaGVyb05vZGUuZ2V0Q29tcG9uZW50KFwiaGVyb19nb1wiKTtcclxuICAgICAgICBoZXJvTm9kZS5wYXJlbnQgPSB0aGlzLmdyb3VuZEpzLmdldExheWVyTm9kZUZ1bihcIm1hcFwiKTtcclxuICAgICAgICAvLyBoZXJvTm9kZS5zZXRQb3NpdGlvbihjYy52MigwLDApKTtcclxuICAgICAgICBoZXJvTm9kZUpzLm15Y2FtcmVhID0gdGhpcy5teWNhbXJlYTtcclxuICAgICAgICBoZXJvTm9kZUpzLmdyb3VuZEpzTm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgICBoZXJvTm9kZUpzLm1hcCA9IFwiZ3JvdW5kMlwiO1xyXG4gICAgICAgIGhlcm9Ob2RlSnMudG9wID0gdGhpcy5ub2RlLnBhcmVudC5nZXRDaGlsZEJ5TmFtZShcInRvcFwiKTtcclxuICAgIH0sXHJcblxyXG4gICAgY2xvc2VEb29yKHBvaW50MSxwb2ludDIpeyAgIC8v5YWz6Zeo5pe255qE54K56LW354Gr54Sw57KS5a2QXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICB1cGRhdGUgKGR0KSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coZHQpXHJcbiAgICAgICAgaWYodGhpcy5yZWFkeV9wbGF5ICE9IG51bGwpe1xyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSB0aGlzLnJlYWR5X3BsYXkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcztcclxuICAgICAgICAgICAgaWYocHJvZ3Jlc3MgPD0gdGhpcy5yZWFkeV9wcm9ncmVzc051bSl7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IHByb2dyZXNzKzAuMDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlYWR5X3BsYXkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5yZWFkeV9wbGF5LmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPj0gMSAmJiB0aGlzLnJlYWR5X3BsYXkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA8PSAxLjAyKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWR5X3BsYXkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkeV9wcm9ncmVzcy5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJyZWFkeV9wbGF5XCIpLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuYmdfYXVkaW8sdHJ1ZSwwLjMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19