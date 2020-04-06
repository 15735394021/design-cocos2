
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxncm91bmRJbml0LmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiaGl0X2F1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsImdyb3VuZEpzIiwibm9kZSIsImdldENvbXBvbmVudCIsIl90aGlzIiwiSW5pdCIsImNvbnNvbGUiLCJsb2ciLCJnZXRMYXllck5vZGVGdW4iLCJSZWN0MSIsIm9uTG9hZFNwcml0ZVBhcmVudCIsIm4iLCJMYXllck5hbWUiLCJibyIsIm9uTG9hZFlNb3ZpZUNsaXAiLCJ5bWMiLCJsYXllck5hbWUiLCJuYW1lIiwib24iLCJldmVudCIsImF1ZGlvRW5naW5lIiwicGxheSIsIm9uTG9hZFNwcml0ZSIsInRhZzAiLCJQb2x5Z29uQ29sbGlkZXIiLCJ0YWciLCJib2R5IiwiYWRkQ29tcG9uZW50IiwiUmlnaWRCb2R5IiwiUmlnaWRCb2R5VHlwZSIsIlN0YXRpYyIsImNvbGxpZGVyIiwiUGh5c2ljc1BvbHlnb25Db2xsaWRlciIsIm9mZnNldCIsIlBvaW50cyIsInBvaW50cyIsImFwcGx5Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUM7QUFDTkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLFNBREY7QUFFTixpQkFBUTtBQUZGO0FBREYsR0FIUDtBQVVMQyxFQUFBQSxNQVZLLG9CQVVLO0FBQ047QUFDQTtBQUNBO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixLQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUIsU0FBdkIsQ0FBaEI7O0FBQ0EsUUFBSUMsS0FBSyxHQUFHLElBQVo7O0FBQ0FBLElBQUFBLEtBQUssQ0FBQ0gsUUFBTixDQUFlSSxJQUFmLEdBQW9CLFlBQVU7QUFDMUJDLE1BQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLEtBQVo7QUFDQUQsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILEtBQUssQ0FBQ0gsUUFBTixDQUFlTyxlQUFmLENBQStCLEtBQS9CLEVBQXNDQyxLQUFsRDtBQUNILEtBSEQ7O0FBSUFMLElBQUFBLEtBQUssQ0FBQ0gsUUFBTixDQUFlUyxrQkFBZixHQUFrQyxVQUFTQyxDQUFULEVBQVdDLFNBQVgsRUFBcUJDLEVBQXJCLEVBQXdCLENBQUM7QUFDdkQ7QUFDSCxLQUZEOztBQUdBVCxJQUFBQSxLQUFLLENBQUNILFFBQU4sQ0FBZWEsZ0JBQWYsR0FBZ0MsVUFBU0MsR0FBVCxFQUFhQyxTQUFiLEVBQXVCSCxFQUF2QixFQUEwQjtBQUFDO0FBQ3ZELFVBQUdFLEdBQUcsQ0FBQ0UsSUFBSixJQUFZLEtBQWYsRUFBcUI7QUFDakJGLFFBQUFBLEdBQUcsQ0FBQ0csRUFBSixDQUFPLE9BQVAsRUFBZSxVQUFTQyxLQUFULEVBQWU7QUFDMUIxQixVQUFBQSxFQUFFLENBQUMyQixXQUFILENBQWVDLElBQWYsQ0FBb0JqQixLQUFLLENBQUNQLFNBQTFCLEVBQW9DLEtBQXBDLEVBQTBDLEdBQTFDO0FBQ0gsU0FGRDtBQUdIO0FBQ0osS0FORDs7QUFPQSxTQUFLSSxRQUFMLENBQWNxQixZQUFkLEdBQTJCLFVBQVNwQixJQUFULEVBQWNlLElBQWQsRUFBbUI7QUFBQztBQUMzQyxVQUFHQSxJQUFJLElBQUksS0FBWCxFQUFpQjtBQUNiLFlBQUlNLElBQUksR0FBR3JCLElBQUksQ0FBQ0MsWUFBTCxDQUFrQlYsRUFBRSxDQUFDK0IsZUFBckIsQ0FBWDs7QUFDQSxZQUFHRCxJQUFJLElBQUksSUFBUixJQUFnQkEsSUFBSSxDQUFDRSxHQUFMLElBQVksQ0FBL0IsRUFBaUM7QUFDN0IsY0FBSUMsSUFBSSxHQUFHeEIsSUFBSSxDQUFDeUIsWUFBTCxDQUFrQmxDLEVBQUUsQ0FBQ21DLFNBQXJCLENBQVg7QUFDQUYsVUFBQUEsSUFBSSxDQUFDNUIsSUFBTCxHQUFZTCxFQUFFLENBQUNvQyxhQUFILENBQWlCQyxNQUE3QjtBQUNBLGNBQUlDLFFBQVEsR0FBRzdCLElBQUksQ0FBQ3lCLFlBQUwsQ0FBa0JsQyxFQUFFLENBQUN1QyxzQkFBckIsQ0FBZjtBQUNBRCxVQUFBQSxRQUFRLENBQUNFLE1BQVQsR0FBa0JWLElBQUksQ0FBQ1UsTUFBdkI7QUFDQUYsVUFBQUEsUUFBUSxDQUFDRyxNQUFULEdBQWtCWCxJQUFJLENBQUNZLE1BQXZCO0FBQ0FKLFVBQUFBLFFBQVEsQ0FBQ0ssS0FBVDtBQUNIO0FBQ0o7QUFDSixLQVpEO0FBYUgsR0EzQ0k7QUE2Q0xDLEVBQUFBLEtBN0NLLG1CQTZDSSxDQUVSLENBL0NJLENBaURMOztBQWpESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGhpdF9hdWRpbzp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTtcclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpLmVuYWJsZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcyA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoXCJncm91bmQyXCIpO1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgX3RoaXMuZ3JvdW5kSnMuSW5pdD1mdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIuWIneWni+WMllwiKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coX3RoaXMuZ3JvdW5kSnMuZ2V0TGF5ZXJOb2RlRnVuKFwibWFwXCIpLlJlY3QxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX3RoaXMuZ3JvdW5kSnMub25Mb2FkU3ByaXRlUGFyZW50PWZ1bmN0aW9uKG4sTGF5ZXJOYW1lLGJvKXsvL29uTG9hZFNwcml0ZVBhcmVudCjniLboioLngrnvvJpOb2Rl77yM5Zu+5bGC5ZCN77yaU3RyaW5n77yM5piv5ZCm56ys5LiA5qyh5Yqg6L2977yaYm9vbClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coX3RoaXMuZ3JvdW5kSnMuZ2V0TGF5ZXJOb2RlRnVuKFwibWFwXCIpLmdldENvbXBvbmVudChjYy5Cb3hDb2xsaWRlcikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfdGhpcy5ncm91bmRKcy5vbkxvYWRZTW92aWVDbGlwPWZ1bmN0aW9uKHltYyxsYXllck5hbWUsYm8pey8v5Yqg6L295Yqo55S7XHJcbiAgICAgICAgICAgIGlmKHltYy5uYW1lID09IFwiaGsxXCIpe1xyXG4gICAgICAgICAgICAgICAgeW1jLm9uKFwic291bmRcIixmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheShfdGhpcy5oaXRfYXVkaW8sZmFsc2UsMC4zKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91bmRKcy5vbkxvYWRTcHJpdGU9ZnVuY3Rpb24obm9kZSxuYW1lKXsvL+WKoOi9veWbvuWdlyAgb25Mb2FkU3ByaXRlKOWbvuWdl++8mk5vZGXvvIzlm77lsYLlkI3vvJpTdHJpbmcpXHJcbiAgICAgICAgICAgIGlmKG5hbWUgPT0gXCJtYXBcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnMCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgICAgICAgICBpZih0YWcwICE9IG51bGwgJiYgdGFnMC50YWcgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvZHkgPSBub2RlLmFkZENvbXBvbmVudChjYy5SaWdpZEJvZHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJvZHkudHlwZSA9IGNjLlJpZ2lkQm9keVR5cGUuU3RhdGljO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjb2xsaWRlciA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlBoeXNpY3NQb2x5Z29uQ29sbGlkZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLm9mZnNldCA9IHRhZzAub2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLlBvaW50cyA9IHRhZzAucG9pbnRzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbGxpZGVyLmFwcGx5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBcclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=