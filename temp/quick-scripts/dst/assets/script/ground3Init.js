
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
  properties: {},
  onLoad: function onLoad() {
    var p = cc.director.getPhysicsManager();
    p.enabled = true;
    p.gravity = cc.v2(0, -8000);
    p.debugDrawFlags = true; //显示出来碰撞边框，为了方便演示

    cc.director.getCollisionManager().enabled = true; //检测碰撞
    // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

    this.groundJs = this.node.getComponent("ground3");

    var _this = this;

    _this.groundJs.Init = function () {
      _this.groundJs.mapCameraNode = hero_go.mycamrea;
      hero_go.node.parent = _this.groundJs.getLayerNodeFun("map"); // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
    };

    this.groundJs.onLoadSprite = function (node, name) {
      //加载图块时调用  onLoadSprite(图块：Node，图层名：String)
      if (name == "map") {
        var tag0 = node.getComponent(cc.BoxCollider);

        if (tag0 != null && tag0.tag == 0) {
          var body = node.addComponent(cc.RigidBody);
          body.type = cc.RigidBodyType.Static; // let ps = tag0.points;

          var collider = node.addComponent(cc.PhysicsBoxCollider);
          collider.offset = cc.v2(0, 0); // for(let i=0;i<ps.length;i++){
          //     collider.points[i].x = ps[i].x;
          //     collider.points[i].y = ps[i].y;
          // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxncm91bmQzSW5pdC5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsInAiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZW5hYmxlZCIsImdyYXZpdHkiLCJ2MiIsImRlYnVnRHJhd0ZsYWdzIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsImdyb3VuZEpzIiwibm9kZSIsImdldENvbXBvbmVudCIsIl90aGlzIiwiSW5pdCIsIm1hcENhbWVyYU5vZGUiLCJoZXJvX2dvIiwibXljYW1yZWEiLCJwYXJlbnQiLCJnZXRMYXllck5vZGVGdW4iLCJvbkxvYWRTcHJpdGUiLCJuYW1lIiwidGFnMCIsIkJveENvbGxpZGVyIiwidGFnIiwiYm9keSIsImFkZENvbXBvbmVudCIsIlJpZ2lkQm9keSIsInR5cGUiLCJSaWdpZEJvZHlUeXBlIiwiU3RhdGljIiwiY29sbGlkZXIiLCJQaHlzaWNzQm94Q29sbGlkZXIiLCJvZmZzZXQiLCJhcHBseSIsImtpbGxTcHJpdGUiLCJQb2x5Z29uQ29sbGlkZXIiLCJkZXN0cm95Iiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRSxFQUhQO0FBT0xDLEVBQUFBLE1BUEssb0JBT0s7QUFFTixRQUFJQyxDQUFDLEdBQUdMLEVBQUUsQ0FBQ00sUUFBSCxDQUFZQyxpQkFBWixFQUFSO0FBQ0FGLElBQUFBLENBQUMsQ0FBQ0csT0FBRixHQUFZLElBQVo7QUFDQUgsSUFBQUEsQ0FBQyxDQUFDSSxPQUFGLEdBQVlULEVBQUUsQ0FBQ1UsRUFBSCxDQUFNLENBQU4sRUFBUSxDQUFDLElBQVQsQ0FBWjtBQUNBTCxJQUFBQSxDQUFDLENBQUNNLGNBQUYsR0FBbUIsSUFBbkIsQ0FMTSxDQUtvQjs7QUFDMUJYLElBQUFBLEVBQUUsQ0FBQ00sUUFBSCxDQUFZTSxtQkFBWixHQUFrQ0osT0FBbEMsR0FBNEMsSUFBNUMsQ0FOTSxDQU00QztBQUNsRDs7QUFFQSxTQUFLSyxRQUFMLEdBQWdCLEtBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QixTQUF2QixDQUFoQjs7QUFDQSxRQUFJQyxLQUFLLEdBQUcsSUFBWjs7QUFDQUEsSUFBQUEsS0FBSyxDQUFDSCxRQUFOLENBQWVJLElBQWYsR0FBb0IsWUFBVTtBQUMxQkQsTUFBQUEsS0FBSyxDQUFDSCxRQUFOLENBQWVLLGFBQWYsR0FBK0JDLE9BQU8sQ0FBQ0MsUUFBdkM7QUFDQUQsTUFBQUEsT0FBTyxDQUFDTCxJQUFSLENBQWFPLE1BQWIsR0FBc0JMLEtBQUssQ0FBQ0gsUUFBTixDQUFlUyxlQUFmLENBQStCLEtBQS9CLENBQXRCLENBRjBCLENBRzFCO0FBQ0gsS0FKRDs7QUFLQSxTQUFLVCxRQUFMLENBQWNVLFlBQWQsR0FBMkIsVUFBU1QsSUFBVCxFQUFjVSxJQUFkLEVBQW1CO0FBQUU7QUFDNUMsVUFBR0EsSUFBSSxJQUFJLEtBQVgsRUFBaUI7QUFDYixZQUFJQyxJQUFJLEdBQUdYLElBQUksQ0FBQ0MsWUFBTCxDQUFrQmYsRUFBRSxDQUFDMEIsV0FBckIsQ0FBWDs7QUFDQSxZQUFHRCxJQUFJLElBQUksSUFBUixJQUFnQkEsSUFBSSxDQUFDRSxHQUFMLElBQVksQ0FBL0IsRUFBaUM7QUFDN0IsY0FBSUMsSUFBSSxHQUFHZCxJQUFJLENBQUNlLFlBQUwsQ0FBa0I3QixFQUFFLENBQUM4QixTQUFyQixDQUFYO0FBQ0FGLFVBQUFBLElBQUksQ0FBQ0csSUFBTCxHQUFZL0IsRUFBRSxDQUFDZ0MsYUFBSCxDQUFpQkMsTUFBN0IsQ0FGNkIsQ0FHN0I7O0FBQ0EsY0FBSUMsUUFBUSxHQUFHcEIsSUFBSSxDQUFDZSxZQUFMLENBQWtCN0IsRUFBRSxDQUFDbUMsa0JBQXJCLENBQWY7QUFDQUQsVUFBQUEsUUFBUSxDQUFDRSxNQUFULEdBQWtCcEMsRUFBRSxDQUFDVSxFQUFILENBQU0sQ0FBTixFQUFRLENBQVIsQ0FBbEIsQ0FMNkIsQ0FNN0I7QUFDQTtBQUNBO0FBQ0E7O0FBQ0F3QixVQUFBQSxRQUFRLENBQUNHLEtBQVQ7QUFDSDtBQUNKO0FBQ0osS0FoQkQ7O0FBaUJBLFNBQUt4QixRQUFMLENBQWN5QixVQUFkLEdBQXlCLFVBQVN4QixJQUFULEVBQWNVLElBQWQsRUFBbUI7QUFBQztBQUN6QyxVQUFHQSxJQUFJLElBQUksS0FBWCxFQUFpQjtBQUNiLFlBQUlDLElBQUksR0FBR1gsSUFBSSxDQUFDQyxZQUFMLENBQWtCZixFQUFFLENBQUN1QyxlQUFyQixDQUFYOztBQUNBLFlBQUdkLElBQUksSUFBSSxJQUFSLElBQWdCQSxJQUFJLENBQUNFLEdBQUwsSUFBWSxDQUEvQixFQUFpQztBQUM3QixjQUFJQyxJQUFJLEdBQUdkLElBQUksQ0FBQ0MsWUFBTCxDQUFrQmYsRUFBRSxDQUFDOEIsU0FBckIsQ0FBWDtBQUNBRixVQUFBQSxJQUFJLENBQUNZLE9BQUw7QUFDSDtBQUNKO0FBQ0osS0FSRDtBQVNILEdBakRJO0FBbURMQyxFQUFBQSxLQW5ESyxtQkFtREksQ0FFUixDQXJESSxDQXVETDs7QUF2REssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICBsZXQgcCA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwLmdyYXZpdHkgPSBjYy52MigwLC04MDAwKTtcclxuICAgICAgICBwLmRlYnVnRHJhd0ZsYWdzID0gdHJ1ZTsgIC8v5pi+56S65Ye65p2l56Kw5pKe6L655qGG77yM5Li65LqG5pa55L6/5ryU56S6XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlOyAvL+ajgOa1i+eisOaSnlxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsvL+eisOaSnuajgOa1i+eahOi+ueahhuaYvuekulxyXG5cclxuICAgICAgICB0aGlzLmdyb3VuZEpzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChcImdyb3VuZDNcIik7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBfdGhpcy5ncm91bmRKcy5Jbml0PWZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIF90aGlzLmdyb3VuZEpzLm1hcENhbWVyYU5vZGUgPSBoZXJvX2dvLm15Y2FtcmVhO1xyXG4gICAgICAgICAgICBoZXJvX2dvLm5vZGUucGFyZW50ID0gX3RoaXMuZ3JvdW5kSnMuZ2V0TGF5ZXJOb2RlRnVuKFwibWFwXCIpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhfdGhpcy5ncm91bmRKcy5nZXRMYXllck5vZGVGdW4oXCJtYXBcIikuUmVjdDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdyb3VuZEpzLm9uTG9hZFNwcml0ZT1mdW5jdGlvbihub2RlLG5hbWUpeyAvL+WKoOi9veWbvuWdl+aXtuiwg+eUqCAgb25Mb2FkU3ByaXRlKOWbvuWdl++8mk5vZGXvvIzlm77lsYLlkI3vvJpTdHJpbmcpXHJcbiAgICAgICAgICAgIGlmKG5hbWUgPT0gXCJtYXBcIil7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFnMCA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLkJveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgIGlmKHRhZzAgIT0gbnVsbCAmJiB0YWcwLnRhZyA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9keSA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS50eXBlID0gY2MuUmlnaWRCb2R5VHlwZS5TdGF0aWM7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHBzID0gdGFnMC5wb2ludHM7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvbGxpZGVyID0gbm9kZS5hZGRDb21wb25lbnQoY2MuUGh5c2ljc0JveENvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5vZmZzZXQgPSBjYy52MigwLDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaT0wO2k8cHMubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbGxpZGVyLnBvaW50c1tpXS54ID0gcHNbaV0ueDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29sbGlkZXIucG9pbnRzW2ldLnkgPSBwc1tpXS55O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICBjb2xsaWRlci5hcHBseSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdW5kSnMua2lsbFNwcml0ZT1mdW5jdGlvbihub2RlLG5hbWUpey8v5q+P5qyh5Zu+5Z2X5LuO6Iie5Y+w5LiK5riF6Zmk5pe26LCD55SoICAgIGtpbGxTcHJpdGUo5Zu+5Z2X77yaTm9kZe+8jOWbvuWxguWQje+8mlN0cmluZylcclxuICAgICAgICAgICAgaWYobmFtZSA9PSBcIm1hcFwiKXtcclxuICAgICAgICAgICAgICAgIGxldCB0YWcwID0gbm9kZS5nZXRDb21wb25lbnQoY2MuUG9seWdvbkNvbGxpZGVyKTtcclxuICAgICAgICAgICAgICAgIGlmKHRhZzAgIT0gbnVsbCAmJiB0YWcwLnRhZyA9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9keSA9IG5vZGUuZ2V0Q29tcG9uZW50KGNjLlJpZ2lkQm9keSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9keS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19