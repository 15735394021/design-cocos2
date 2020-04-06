
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
    }
  },
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true;
    p.gravity = cc.v2(0, 0); // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    this.groundJs = this.node.getComponent("ground2");

    var _this = this;

    _this.groundJs.Init = function () {
      _this.groundJs.mapCameraNode = hero_go.mycamrea;
      hero_go.node.parent = _this.groundJs.getLayerNodeFun("map"); // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
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
          body.destroy();
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
  start: function start() {},
  closeDoor: function closeDoor(point1, point2) {//关门时的点起火焰粒子
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

          cc.audioEngine.play(this.bg_audio, true, 0.3); // this.node.getChildByName("hero").active = true;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxncm91bmRJbml0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaGl0X2F1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsImJnX2F1ZGlvIiwicmVhZHlfcGxheSIsIk5vZGUiLCJyZWFkeV9wcm9ncmVzcyIsIkxhYmVsIiwiZmxhbWVQYXJ0aWNsZSIsIlBhcnRpY2xlU3lzdGVtIiwib25Mb2FkIiwicCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJlbmFibGVkIiwiZ3Jhdml0eSIsInYyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImdyb3VuZEpzIiwibm9kZSIsImdldENvbXBvbmVudCIsIl90aGlzIiwiSW5pdCIsIm1hcENhbWVyYU5vZGUiLCJoZXJvX2dvIiwibXljYW1yZWEiLCJwYXJlbnQiLCJnZXRMYXllck5vZGVGdW4iLCJvbkxvYWRTcHJpdGVQYXJlbnQiLCJuIiwiTGF5ZXJOYW1lIiwiYm8iLCJvbkxvYWRZTW92aWVDbGlwIiwieW1jIiwibGF5ZXJOYW1lIiwibmFtZSIsIm9uIiwiZXZlbnQiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJvbkxvYWRTcHJpdGUiLCJ0YWcwIiwiUG9seWdvbkNvbGxpZGVyIiwidGFnIiwiYm9keSIsImFkZENvbXBvbmVudCIsIlJpZ2lkQm9keSIsIlJpZ2lkQm9keVR5cGUiLCJTdGF0aWMiLCJwcyIsInBvaW50cyIsImNvbGxpZGVyIiwiUGh5c2ljc1BvbHlnb25Db2xsaWRlciIsImkiLCJsZW5ndGgiLCJwdXNoIiwieCIsInkiLCJhcHBseSIsImtpbGxTcHJpdGUiLCJkZXN0cm95IiwiTG9hZGluZyIsIkxvYWRlZCIsIlRvdGFsIiwicHJvZ3Jlc3MiLCJyZWFkeV9wcm9ncmVzc051bSIsInN0cmluZyIsInN0YXJ0IiwiY2xvc2VEb29yIiwicG9pbnQxIiwicG9pbnQyIiwidXBkYXRlIiwiZHQiLCJQcm9ncmVzc0JhciIsImFjdGl2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LFdBQWhDLEVBQTZDVCxRQUE1RDs7QUFDQSxVQUFHQSxRQUFRLElBQUksS0FBS0MsaUJBQXBCLEVBQXNDO0FBQ2xDRCxRQUFBQSxRQUFRLEdBQUdBLFFBQVEsR0FBQyxJQUFwQjtBQUNBLGFBQUs1RCxVQUFMLENBQWdCZ0IsWUFBaEIsQ0FBNkJ4QixFQUFFLENBQUM2RSxXQUFoQyxFQUE2Q1QsUUFBN0MsR0FBd0RBLFFBQXhEOztBQUNBLFlBQUcsS0FBSzVELFVBQUwsQ0FBZ0JnQixZQUFoQixDQUE2QnhCLEVBQUUsQ0FBQzZFLFdBQWhDLEVBQTZDVCxRQUE3QyxJQUF5RCxDQUF6RCxJQUE4RCxLQUFLNUQsVUFBTCxDQUFnQmdCLFlBQWhCLENBQTZCeEIsRUFBRSxDQUFDNkUsV0FBaEMsRUFBNkNULFFBQTdDLElBQXlELElBQTFILEVBQStIO0FBQzNILGVBQUs1RCxVQUFMLENBQWdCc0UsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxlQUFLcEUsY0FBTCxDQUFvQm9FLE1BQXBCLEdBQTZCLEtBQTdCLENBRjJILENBRzNIOztBQUNBOUUsVUFBQUEsRUFBRSxDQUFDMEMsV0FBSCxDQUFlQyxJQUFmLENBQW9CLEtBQUtwQyxRQUF6QixFQUFrQyxJQUFsQyxFQUF1QyxHQUF2QyxFQUoySCxDQUszSDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBbkhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgaGl0X2F1ZGlvOnsgICAgLy/lh7vmiZPml7bnmoTpn7PmlYhcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYmdfYXVkaW86eyAgICAvL+iDjOaZr+mfs+S5kFxyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWFkeV9wbGF5OnsgICAvL+a4uOaIj+WKoOi9veS4reeahOi/m+W6puadoVxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlYWR5X3Byb2dyZXNzOnsgICAvL+a4uOaIj+WKoOi9veS4reeahOW9k+WJjei/m+W6pmxhYmVsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZmxhbWVQYXJ0aWNsZTp7ICAgLy/ngavnhLDnspLlrZDvvIznlKjlnKjmnZHluoTpl6jlj6PnmoTlvIDpl6jlhbPpl6jmlYjmnpxcclxuICAgICAgICAgICAgdHlwZTpjYy5QYXJ0aWNsZVN5c3RlbSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBsZXQgcCA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwLmdyYXZpdHkgPSBjYy52MigwLDApO1xyXG4gICAgICAgIC8vIHAuZGVidWdEcmF3RmxhZ3MgPSB0cnVlOyAgLy/mmL7npLrlh7rmnaXnorDmkp7ovrnmoYbvvIzkuLrkuobmlrnkvr/mvJTnpLpcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7IC8v5qOA5rWL56Kw5pKeXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlOy8v56Kw5pKe5qOA5rWL55qE6L655qGG5pi+56S6XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiZ3JvdW5kMlwiKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLmdyb3VuZEpzLkluaXQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgX3RoaXMuZ3JvdW5kSnMubWFwQ2FtZXJhTm9kZSA9IGhlcm9fZ28ubXljYW1yZWE7XHJcbiAgICAgICAgICAgIGhlcm9fZ28ubm9kZS5wYXJlbnQgPSBfdGhpcy5ncm91bmRKcy5nZXRMYXllck5vZGVGdW4oXCJtYXBcIik7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKF90aGlzLmdyb3VuZEpzLmdldExheWVyTm9kZUZ1bihcIm1hcFwiKS5SZWN0MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF90aGlzLmdyb3VuZEpzLm9uTG9hZFNwcml0ZVBhcmVudD1mdW5jdGlvbihuLExheWVyTmFtZSxibyl7Ly9vbkxvYWRTcHJpdGVQYXJlbnQo54i26IqC54K577yaTm9kZe+8jOWbvuWxguWQje+8mlN0cmluZ++8jOaYr+WQpuesrOS4gOasoeWKoOi9ve+8mmJvb2wpXHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBfdGhpcy5ncm91bmRKcy5vbkxvYWRZTW92aWVDbGlwPWZ1bmN0aW9uKHltYyxsYXllck5hbWUsYm8pey8v5Yqg6L295Yqo55S7XHJcbiAgICAgICAgICAgIGlmKHltYy5uYW1lID09IFwiaGsxXCIpe1xyXG4gICAgICAgICAgICAgICAgeW1jLm9uKFwic291bmRcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShfdGhpcy5oaXRfYXVkaW8sZmFsc2UsMC4zKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcy5vbkxvYWRTcHJpdGU9ZnVuY3Rpb24obm9kZSxuYW1lKXsgLy/liqDovb3lm77lnZfml7bosIPnlKggIG9uTG9hZFNwcml0ZSjlm77lnZfvvJpOb2Rl77yM5Zu+5bGC5ZCN77yaU3RyaW5nKVxyXG4gICAgICAgICAgICBpZihuYW1lID09IFwibWFwXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhZzAgPSBub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFnMCAhPSBudWxsICYmIHRhZzAudGFnID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib2R5ID0gbm9kZS5hZGRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICAgICAgICAgICAgICBib2R5LnR5cGUgPSBjYy5SaWdpZEJvZHlUeXBlLlN0YXRpYztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcHMgPSB0YWcwLnBvaW50cztcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY29sbGlkZXIgPSBub2RlLmFkZENvbXBvbmVudChjYy5QaHlzaWNzUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGk9MDtpPHBzLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID4gMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHMucHVzaCh7eDpwc1tpXS54LHk6cHNbaV0ueX0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9ZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbaV0ueCA9IHBzW2ldLng7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5wb2ludHNbaV0ueSA9IHBzW2ldLnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIuYXBwbHkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VuZEpzLmtpbGxTcHJpdGU9ZnVuY3Rpb24obm9kZSxuYW1lKXsvL+avj+asoeWbvuWdl+S7juiInuWPsOS4iua4hemZpOaXtuiwg+eUqCAgICBraWxsU3ByaXRlKOWbvuWdl++8mk5vZGXvvIzlm77lsYLlkI3vvJpTdHJpbmcpXHJcbiAgICAgICAgICAgIGlmKG5hbWUgPT0gXCJtYXBcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnMCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZih0YWcwICE9IG51bGwgJiYgdGFnMC50YWcgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBub2RlLmdldENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMuTG9hZGluZz1mdW5jdGlvbihMb2FkZWQsVG90YWwpeyAgIC8vTG9hZGluZyjlt7LliqDovb3nmoTotLTlm77mlbDvvJpOdW1iZXLvvIzmgLvotLTlm77mlbDvvJpOdW1iZXIpXHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IExvYWRlZC9Ub3RhbDtcclxuICAgICAgICAgICAgaWYoX3RoaXMucmVhZHlfcGxheSAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgIF90aGlzLnJlYWR5X3Byb2dyZXNzTnVtID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoX3RoaXMucmVhZHlfcHJvZ3Jlc3MgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWFkeV9wcm9ncmVzcy5zdHJpbmcgPVwi5Zyw5Zu+5q2j5Zyo5Yib5bu677yaXCIrIHByb2dyZXNzKjEwMCtcIiVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIFxyXG4gICAgfSxcclxuXHJcbiAgICBjbG9zZURvb3IocG9pbnQxLHBvaW50Mil7ICAgLy/lhbPpl6jml7bnmoTngrnotbfngavnhLDnspLlrZBcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgICAgICBpZih0aGlzLnJlYWR5X3BsYXkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzO1xyXG4gICAgICAgICAgICBpZihwcm9ncmVzcyA8PSB0aGlzLnJlYWR5X3Byb2dyZXNzTnVtKXtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gcHJvZ3Jlc3MrMC4wMTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJlYWR5X3BsYXkuZ2V0Q29tcG9uZW50KGNjLlByb2dyZXNzQmFyKS5wcm9ncmVzcyA+PSAxICYmIHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzIDw9IDEuMDIpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZHlfcGxheS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlYWR5X3Byb2dyZXNzLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJlYWR5X3BsYXlcIikuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5iZ19hdWRpbyx0cnVlLDAuMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==