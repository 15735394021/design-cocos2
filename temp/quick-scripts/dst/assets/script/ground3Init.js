
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/ground3Init.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxncm91bmQzSW5pdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsImhpdF9hdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJiZ19hdWRpbyIsInJlYWR5X3BsYXkiLCJOb2RlIiwicmVhZHlfcHJvZ3Jlc3MiLCJMYWJlbCIsImhlcm9fcHJlIiwiUHJlZmFiIiwibXljYW1yZWEiLCJvbkxvYWQiLCJwIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwiYWN0aXZlIiwiZ2V0Q29tcG9uZW50IiwiUHJvZ3Jlc3NCYXIiLCJwcm9ncmVzcyIsInN0cmluZyIsImdyb3VuZEpzIiwibm9kZSIsIl90aGlzIiwiSW5pdCIsIm9uTG9hZFNwcml0ZSIsIm5hbWUiLCJ0YWcwIiwiUG9seWdvbkNvbGxpZGVyIiwidGFnIiwiYm9keSIsImFkZENvbXBvbmVudCIsIlJpZ2lkQm9keSIsIlJpZ2lkQm9keVR5cGUiLCJTdGF0aWMiLCJwcyIsInBvaW50cyIsImNvbGxpZGVyIiwiUGh5c2ljc1BvbHlnb25Db2xsaWRlciIsImkiLCJsZW5ndGgiLCJwdXNoIiwieCIsInkiLCJhcHBseSIsImtpbGxTcHJpdGUiLCJkZXN0cm95IiwiTG9hZGluZyIsIkxvYWRlZCIsIlRvdGFsIiwicmVhZHlfcHJvZ3Jlc3NOdW0iLCJnZW5lcmF0ZSIsImhlcm9Ob2RlIiwiaW5zdGFudGlhdGUiLCJoZXJvTm9kZUpzIiwicGFyZW50IiwiZ2V0TGF5ZXJOb2RlRnVuIiwiZ3JvdW5kSnNOb2RlIiwibWFwIiwidG9wIiwiZ2V0Q2hpbGRCeU5hbWUiLCJzdGFydCIsImdyYXZpdHkiLCJ2MiIsInVwZGF0ZSIsImR0IiwiYXVkaW9FbmdpbmUiLCJwbGF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFDO0FBQUs7QUFDWEMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLFNBREY7QUFFTixpQkFBUTtBQUZGLEtBREY7QUFLUkMsSUFBQUEsUUFBUSxFQUFDO0FBQUs7QUFDVkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLFNBREg7QUFFTCxpQkFBUTtBQUZILEtBTEQ7QUFTUkUsSUFBQUEsVUFBVSxFQUFDO0FBQUk7QUFDWEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNTLElBREQ7QUFFUCxpQkFBUztBQUZGLEtBVEg7QUFhUkMsSUFBQUEsY0FBYyxFQUFDO0FBQUk7QUFDZkwsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNXLEtBREc7QUFFWCxpQkFBUTtBQUZHLEtBYlA7QUFpQlJDLElBQUFBLFFBQVEsRUFBQztBQUNMUCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ2EsTUFESDtBQUVMLGlCQUFRO0FBRkgsS0FqQkQ7QUFxQlJDLElBQUFBLFFBQVEsRUFBQztBQUNMVCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ1MsSUFESDtBQUVMLGlCQUFRO0FBRkg7QUFyQkQsR0FIUDtBQThCTE0sRUFBQUEsTUE5Qkssb0JBOEJLO0FBQ04sUUFBSUMsQ0FBQyxHQUFHaEIsRUFBRSxDQUFDaUIsUUFBSCxDQUFZQyxpQkFBWixFQUFSO0FBQ0FGLElBQUFBLENBQUMsQ0FBQ0csT0FBRixHQUFZLElBQVosQ0FGTSxDQUdOO0FBQ0E7O0FBQ0FuQixJQUFBQSxFQUFFLENBQUNpQixRQUFILENBQVlHLG1CQUFaLEdBQWtDRCxPQUFsQyxHQUE0QyxJQUE1QyxDQUxNLENBSzRDO0FBQ2xEOztBQUVBLFNBQUtYLFVBQUwsQ0FBZ0JhLE1BQWhCLEdBQXlCLElBQXpCO0FBQ0EsU0FBS1gsY0FBTCxDQUFvQlcsTUFBcEIsR0FBNkIsSUFBN0I7QUFDQSxTQUFLYixVQUFMLENBQWdCYyxZQUFoQixDQUE2QnRCLEVBQUUsQ0FBQ3VCLFdBQWhDLEVBQTZDQyxRQUE3QyxHQUF3RCxDQUF4RDtBQUNBLFNBQUtkLGNBQUwsQ0FBb0JlLE1BQXBCLEdBQTZCLFlBQTdCO0FBRUEsU0FBS0MsUUFBTCxHQUFnQixLQUFLQyxJQUFMLENBQVVMLFlBQVYsQ0FBdUIsU0FBdkIsQ0FBaEI7O0FBQ0EsUUFBSU0sS0FBSyxHQUFHLElBQVo7O0FBQ0FBLElBQUFBLEtBQUssQ0FBQ0YsUUFBTixDQUFlRyxJQUFmLEdBQW9CLFlBQVUsQ0FDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDSCxLQUxEOztBQU1BLFNBQUtILFFBQUwsQ0FBY0ksWUFBZCxHQUEyQixVQUFTSCxJQUFULEVBQWNJLElBQWQsRUFBbUI7QUFBRTtBQUM1QyxVQUFHQSxJQUFJLElBQUksS0FBWCxFQUFpQjtBQUNiLFlBQUlDLElBQUksR0FBR0wsSUFBSSxDQUFDTCxZQUFMLENBQWtCdEIsRUFBRSxDQUFDaUMsZUFBckIsQ0FBWDs7QUFDQSxZQUFHRCxJQUFJLElBQUksSUFBUixJQUFnQkEsSUFBSSxDQUFDRSxHQUFMLElBQVksQ0FBL0IsRUFBaUM7QUFDN0IsY0FBSUMsSUFBSSxHQUFHUixJQUFJLENBQUNTLFlBQUwsQ0FBa0JwQyxFQUFFLENBQUNxQyxTQUFyQixDQUFYO0FBQ0FGLFVBQUFBLElBQUksQ0FBQzlCLElBQUwsR0FBWUwsRUFBRSxDQUFDc0MsYUFBSCxDQUFpQkMsTUFBN0I7QUFDQSxjQUFJQyxFQUFFLEdBQUdSLElBQUksQ0FBQ1MsTUFBZDtBQUNBLGNBQUlDLFFBQVEsR0FBR2YsSUFBSSxDQUFDUyxZQUFMLENBQWtCcEMsRUFBRSxDQUFDMkMsc0JBQXJCLENBQWY7O0FBQ0EsZUFBSSxJQUFJQyxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNKLEVBQUUsQ0FBQ0ssTUFBakIsRUFBd0JELENBQUMsRUFBekIsRUFBNEI7QUFDeEIsZ0JBQUdBLENBQUMsR0FBRyxDQUFQLEVBQVM7QUFDTEYsY0FBQUEsUUFBUSxDQUFDRCxNQUFULENBQWdCSyxJQUFoQixDQUFxQjtBQUFDQyxnQkFBQUEsQ0FBQyxFQUFDUCxFQUFFLENBQUNJLENBQUQsQ0FBRixDQUFNRyxDQUFUO0FBQVdDLGdCQUFBQSxDQUFDLEVBQUNSLEVBQUUsQ0FBQ0ksQ0FBRCxDQUFGLENBQU1JO0FBQW5CLGVBQXJCO0FBQ0gsYUFGRCxNQUVNO0FBQ0ZOLGNBQUFBLFFBQVEsQ0FBQ0QsTUFBVCxDQUFnQkcsQ0FBaEIsRUFBbUJHLENBQW5CLEdBQXVCUCxFQUFFLENBQUNJLENBQUQsQ0FBRixDQUFNRyxDQUE3QjtBQUNBTCxjQUFBQSxRQUFRLENBQUNELE1BQVQsQ0FBZ0JHLENBQWhCLEVBQW1CSSxDQUFuQixHQUF1QlIsRUFBRSxDQUFDSSxDQUFELENBQUYsQ0FBTUksQ0FBN0I7QUFDSDtBQUNKOztBQUNETixVQUFBQSxRQUFRLENBQUNPLEtBQVQ7QUFDSDtBQUNKO0FBQ0osS0FuQkQ7O0FBb0JBLFNBQUt2QixRQUFMLENBQWN3QixVQUFkLEdBQXlCLFVBQVN2QixJQUFULEVBQWNJLElBQWQsRUFBbUI7QUFBQztBQUN6QyxVQUFHQSxJQUFJLElBQUksS0FBWCxFQUFpQjtBQUNiLFlBQUlDLElBQUksR0FBR0wsSUFBSSxDQUFDTCxZQUFMLENBQWtCdEIsRUFBRSxDQUFDaUMsZUFBckIsQ0FBWDs7QUFDQSxZQUFHRCxJQUFJLElBQUksSUFBUixJQUFnQkEsSUFBSSxDQUFDRSxHQUFMLElBQVksQ0FBL0IsRUFBaUM7QUFDN0IsY0FBSUMsSUFBSSxHQUFHUixJQUFJLENBQUNMLFlBQUwsQ0FBa0J0QixFQUFFLENBQUNxQyxTQUFyQixDQUFYOztBQUNBLGNBQUdGLElBQUksSUFBSSxJQUFYLEVBQWdCO0FBQ1o7QUFDSDs7QUFDREEsVUFBQUEsSUFBSSxDQUFDZ0IsT0FBTDtBQUNBeEIsVUFBQUEsSUFBSSxDQUFDTCxZQUFMLENBQWtCdEIsRUFBRSxDQUFDMkMsc0JBQXJCLEVBQTZDUSxPQUE3QztBQUNIO0FBQ0o7QUFDSixLQVpEOztBQWFBLFNBQUt6QixRQUFMLENBQWMwQixPQUFkLEdBQXNCLFVBQVNDLE1BQVQsRUFBZ0JDLEtBQWhCLEVBQXNCO0FBQUk7QUFDNUMsVUFBSTlCLFFBQVEsR0FBRzZCLE1BQU0sR0FBQ0MsS0FBdEI7O0FBQ0EsVUFBRzFCLEtBQUssQ0FBQ3BCLFVBQU4sSUFBb0IsSUFBdkIsRUFBNEI7QUFDeEJvQixRQUFBQSxLQUFLLENBQUMyQixpQkFBTixHQUEwQi9CLFFBQTFCO0FBQ0g7O0FBQ0QsVUFBR0ksS0FBSyxDQUFDbEIsY0FBTixJQUF3QixJQUEzQixFQUFnQztBQUM1QmtCLFFBQUFBLEtBQUssQ0FBQ2xCLGNBQU4sQ0FBcUJlLE1BQXJCLEdBQTZCLFlBQVdELFFBQVEsR0FBQyxHQUFwQixHQUF3QixHQUFyRDtBQUNIO0FBQ0osS0FSRDtBQVNILEdBN0ZJO0FBK0ZMZ0MsRUFBQUEsUUEvRkssc0JBK0ZLO0FBQUM7QUFDUCxRQUFJQyxRQUFRLEdBQUd6RCxFQUFFLENBQUMwRCxXQUFILENBQWUsS0FBSzlDLFFBQXBCLENBQWY7QUFDQSxRQUFJK0MsVUFBVSxHQUFHRixRQUFRLENBQUNuQyxZQUFULENBQXNCLFNBQXRCLENBQWpCO0FBQ0FtQyxJQUFBQSxRQUFRLENBQUNHLE1BQVQsR0FBa0IsS0FBS2xDLFFBQUwsQ0FBY21DLGVBQWQsQ0FBOEIsTUFBOUIsQ0FBbEIsQ0FITSxDQUlOOztBQUNBRixJQUFBQSxVQUFVLENBQUM3QyxRQUFYLEdBQXNCLEtBQUtBLFFBQTNCO0FBQ0E2QyxJQUFBQSxVQUFVLENBQUNHLFlBQVgsR0FBMEIsS0FBS25DLElBQS9CO0FBQ0FnQyxJQUFBQSxVQUFVLENBQUNJLEdBQVgsR0FBaUIsU0FBakI7QUFDQUosSUFBQUEsVUFBVSxDQUFDSyxHQUFYLEdBQWlCLEtBQUtyQyxJQUFMLENBQVVpQyxNQUFWLENBQWlCSyxjQUFqQixDQUFnQyxLQUFoQyxDQUFqQjtBQUNILEdBeEdJO0FBMEdMQyxFQUFBQSxLQTFHSyxtQkEwR0k7QUFDTGxFLElBQUFBLEVBQUUsQ0FBQ2lCLFFBQUgsQ0FBWUMsaUJBQVosR0FBZ0NpRCxPQUFoQyxHQUEwQ25FLEVBQUUsQ0FBQ29FLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBQyxHQUFULENBQTFDO0FBQ0gsR0E1R0k7QUE4R0xDLEVBQUFBLE1BOUdLLGtCQThHR0MsRUE5R0gsRUE4R087QUFDUixRQUFHLEtBQUs5RCxVQUFMLElBQW1CLElBQXRCLEVBQTJCO0FBQ3ZCLFVBQUlnQixRQUFRLEdBQUcsS0FBS2hCLFVBQUwsQ0FBZ0JjLFlBQWhCLENBQTZCdEIsRUFBRSxDQUFDdUIsV0FBaEMsRUFBNkNDLFFBQTVEOztBQUNBLFVBQUdBLFFBQVEsSUFBSSxLQUFLK0IsaUJBQXBCLEVBQXNDO0FBQ2xDL0IsUUFBQUEsUUFBUSxHQUFHQSxRQUFRLEdBQUMsSUFBcEI7QUFDQSxhQUFLaEIsVUFBTCxDQUFnQmMsWUFBaEIsQ0FBNkJ0QixFQUFFLENBQUN1QixXQUFoQyxFQUE2Q0MsUUFBN0MsR0FBd0RBLFFBQXhEOztBQUNBLFlBQUcsS0FBS2hCLFVBQUwsQ0FBZ0JjLFlBQWhCLENBQTZCdEIsRUFBRSxDQUFDdUIsV0FBaEMsRUFBNkNDLFFBQTdDLElBQXlELENBQXpELElBQThELEtBQUtoQixVQUFMLENBQWdCYyxZQUFoQixDQUE2QnRCLEVBQUUsQ0FBQ3VCLFdBQWhDLEVBQTZDQyxRQUE3QyxJQUF5RCxJQUExSCxFQUErSDtBQUMzSCxlQUFLaEIsVUFBTCxDQUFnQmEsTUFBaEIsR0FBeUIsS0FBekI7QUFDQSxlQUFLWCxjQUFMLENBQW9CVyxNQUFwQixHQUE2QixLQUE3QixDQUYySCxDQUczSDs7QUFDQXJCLFVBQUFBLEVBQUUsQ0FBQ3VFLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixLQUFLakUsUUFBekIsRUFBa0MsSUFBbEMsRUFBdUMsR0FBdkM7QUFDQSxlQUFLaUQsUUFBTCxHQUwySCxDQU0zSDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBOUhJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGhpdF9hdWRpbzp7ICAgIC8v5Ye75omT5pe255qE6Z+z5pWIXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJnX2F1ZGlvOnsgICAgLy/og4zmma/pn7PkuZBcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcmVhZHlfcGxheTp7ICAgLy/muLjmiI/liqDovb3kuK3nmoTov5vluqbmnaFcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICByZWFkeV9wcm9ncmVzczp7ICAgLy/muLjmiI/liqDovb3kuK3nmoTlvZPliY3ov5vluqZsYWJlbFxyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlcm9fcHJlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXljYW1yZWE6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbCxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vIHAuZ3Jhdml0eSA9IGNjLnYyKDAsLTMyMCk7XHJcbiAgICAgICAgLy8gcC5kZWJ1Z0RyYXdGbGFncyA9IHRydWU7ICAvL+aYvuekuuWHuuadpeeisOaSnui+ueahhu+8jOS4uuS6huaWueS+v+a8lOekulxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTsgLy/mo4DmtYvnorDmkp5cclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7Ly/norDmkp7mo4DmtYvnmoTovrnmoYbmmL7npLpcclxuXHJcbiAgICAgICAgdGhpcy5yZWFkeV9wbGF5LmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZWFkeV9wcm9ncmVzcy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID0gMDtcclxuICAgICAgICB0aGlzLnJlYWR5X3Byb2dyZXNzLnN0cmluZyA9IFwi5Zyw5Zu+5q2j5Zyo5Yid5aeL5YyW44CC44CC44CCXCI7XHJcblxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KFwiZ3JvdW5kM1wiKTtcclxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIF90aGlzLmdyb3VuZEpzLkluaXQ9ZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy8gX3RoaXMuZ3JvdW5kSnMubWFwQ2FtZXJhTm9kZSA9IGhlcm9fZ28ubXljYW1yZWE7XHJcbiAgICAgICAgICAgIC8vIGhlcm9fZ28ubm9kZS5wYXJlbnQgPSBfdGhpcy5ncm91bmRKcy5nZXRMYXllck5vZGVGdW4oXCJtYXBcIik7XHJcbiAgICAgICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCkuZ3Jhdml0eSA9IGNjLnYyKDAsLTMyMCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKF90aGlzLmdyb3VuZEpzLmdldExheWVyTm9kZUZ1bihcIm1hcFwiKS5SZWN0MSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMub25Mb2FkU3ByaXRlPWZ1bmN0aW9uKG5vZGUsbmFtZSl7IC8v5Yqg6L295Zu+5Z2X5pe26LCD55SoICBvbkxvYWRTcHJpdGUo5Zu+5Z2X77yaTm9kZe+8jOWbvuWxguWQje+8mlN0cmluZylcclxuICAgICAgICAgICAgaWYobmFtZSA9PSBcIm1hcFwiKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YWcwID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgIGlmKHRhZzAgIT0gbnVsbCAmJiB0YWcwLnRhZyA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9keSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS50eXBlID0gY2MuUmlnaWRCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBzID0gdGFnMC5wb2ludHM7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gbm9kZS5hZGRDb21wb25lbnQoY2MuUGh5c2ljc1BvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxwcy5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA+IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzLnB1c2goe3g6cHNbaV0ueCx5OnBzW2ldLnl9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzW2ldLnggPSBwc1tpXS54O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sbGlkZXIucG9pbnRzW2ldLnkgPSBwc1tpXS55O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLmFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcy5raWxsU3ByaXRlPWZ1bmN0aW9uKG5vZGUsbmFtZSl7Ly/mr4/mrKHlm77lnZfku47oiJ7lj7DkuIrmuIXpmaTml7bosIPnlKggICAga2lsbFNwcml0ZSjlm77lnZfvvJpOb2Rl77yM5Zu+5bGC5ZCN77yaU3RyaW5nKVxyXG4gICAgICAgICAgICBpZihuYW1lID09IFwibWFwXCIpe1xyXG4gICAgICAgICAgICAgICAgbGV0IHRhZzAgPSBub2RlLmdldENvbXBvbmVudChjYy5Qb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYodGFnMCAhPSBudWxsICYmIHRhZzAudGFnID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBib2R5ID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUmlnaWRCb2R5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZihib2R5ID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBoeXNpY3NQb2x5Z29uQ29sbGlkZXIpLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VuZEpzLkxvYWRpbmc9ZnVuY3Rpb24oTG9hZGVkLFRvdGFsKXsgICAvL0xvYWRpbmco5bey5Yqg6L2955qE6LS05Zu+5pWw77yaTnVtYmVy77yM5oC76LS05Zu+5pWw77yaTnVtYmVyKVxyXG4gICAgICAgICAgICBsZXQgcHJvZ3Jlc3MgPSBMb2FkZWQvVG90YWw7XHJcbiAgICAgICAgICAgIGlmKF90aGlzLnJlYWR5X3BsYXkgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5yZWFkeV9wcm9ncmVzc051bSA9IHByb2dyZXNzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKF90aGlzLnJlYWR5X3Byb2dyZXNzICE9IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgX3RoaXMucmVhZHlfcHJvZ3Jlc3Muc3RyaW5nID1cIuWcsOWbvuato+WcqOWIm+W7uu+8mlwiKyBwcm9ncmVzcyoxMDArXCIlXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdlbmVyYXRlKCl7Ly/liqDovb3oi7Hpm4TpooTliLbkvZPov5vlhaXlnLDlm75cclxuICAgICAgICBsZXQgaGVyb05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhlcm9fcHJlKTtcclxuICAgICAgICBsZXQgaGVyb05vZGVKcyA9IGhlcm9Ob2RlLmdldENvbXBvbmVudChcImhlcm9fZ29cIik7XHJcbiAgICAgICAgaGVyb05vZGUucGFyZW50ID0gdGhpcy5ncm91bmRKcy5nZXRMYXllck5vZGVGdW4oXCJoZXJvXCIpO1xyXG4gICAgICAgIC8vIGhlcm9Ob2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsMCkpO1xyXG4gICAgICAgIGhlcm9Ob2RlSnMubXljYW1yZWEgPSB0aGlzLm15Y2FtcmVhO1xyXG4gICAgICAgIGhlcm9Ob2RlSnMuZ3JvdW5kSnNOb2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGhlcm9Ob2RlSnMubWFwID0gXCJncm91bmQzXCI7XHJcbiAgICAgICAgaGVyb05vZGVKcy50b3AgPSB0aGlzLm5vZGUucGFyZW50LmdldENoaWxkQnlOYW1lKFwidG9wXCIpO1xyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKS5ncmF2aXR5ID0gY2MudjIoMCwtMzIwKTtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmKHRoaXMucmVhZHlfcGxheSAhPSBudWxsKXtcclxuICAgICAgICAgICAgbGV0IHByb2dyZXNzID0gdGhpcy5yZWFkeV9wbGF5LmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGlmKHByb2dyZXNzIDw9IHRoaXMucmVhZHlfcHJvZ3Jlc3NOdW0pe1xyXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzcyswLjAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFkeV9wbGF5LmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMucmVhZHlfcGxheS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnByb2dyZXNzID49IDEgJiYgdGhpcy5yZWFkeV9wbGF5LmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikucHJvZ3Jlc3MgPD0gMS4wMil7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWFkeV9wbGF5LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVhZHlfcHJvZ3Jlc3MuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicmVhZHlfcGxheVwiKS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLmJnX2F1ZGlvLHRydWUsMC4zKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==