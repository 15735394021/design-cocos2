
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/game.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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

    if (this.myPackage.active) {
      this.myPackage.setPosition(pos);
    }
  },
  notice: function notice(message, pos) {
    //进入房间的提示“房间没有东西，按q退出”
    this.node.getChildByName("map").opacity = 30;
    this.node.getChildByName("hero").opacity = 30; // this.node.addComponent(cc.Label);
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

    this.noticeLabel.node.active = false;
  },
  openKnapsack: function openKnapsack() {//打开背包
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbInJlcXVlc3RVcmwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5vdGljZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwibXlQYWNrYWdlIiwiTm9kZSIsIm9uTG9hZCIsInAiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZW5hYmxlZCIsImdyYXZpdHkiLCJ2MiIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJ3aW5kb3ciLCJnYW1lIiwiYWN0aXZlIiwiaW5pdGlhbGl6YXRpb24iLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwic2VuZCIsInF1ZXJ5SGVyb0RldGFpbCIsIm9wZW5BbmRDbG9zZVBhY2thZ2UiLCJwb3MiLCJzZXRQb3NpdGlvbiIsIm5vdGljZSIsIm1lc3NhZ2UiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJvcGFjaXR5Iiwib3ZlcmZsb3ciLCJPdmVyZmxvdyIsIlJFU0laRV9IRUlHSFQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsInN0cmluZyIsIm5vdGljZUV4aXQiLCJvcGVuS25hcHNhY2siLCJzd2l0Y2hNYXAiLCJvbGRNYXAiLCJuZXdNYXAiLCJzdGFydCIsImJhc2VVcmwiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxVQUFVLEdBQUcsNEJBQW5CO0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUM7QUFDUkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLEtBREE7QUFF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bUJBZ0dJO0FBQ0wsU0FBS0MsT0FBTCxHQUFlLDRCQUFmO0FBQ0gsR0FsR0k7QUFvR0xDLEVBQUFBLE1BcEdLLGtCQW9HR0MsRUFwR0gsRUFvR08sQ0FDWDtBQXJHSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY29uc3QgcmVxdWVzdFVybCA9IFwiaHR0cDovLzQ3LjEwNC44MC4xMjc6ODA4MC9cIlxyXG5cclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBub3RpY2VMYWJlbDp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTGFiZWwsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbXlQYWNrYWdlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHAuZ3Jhdml0eSA9IGNjLnYyKDAsMCk7IFxyXG4gICAgICAgIC8vIHAuZGVidWdEcmF3RmxhZ3MgPSB0cnVlOyAgLy/mmL7npLrlh7rmnaXnorDmkp7ovrnmoYbvvIzkuLrkuobmlrnkvr/mvJTnpLpcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7IC8v5qOA5rWL56Kw5pKeXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlOy8v56Kw5pKe5qOA5rWL55qE6L655qGG5pi+56S6XHJcblxyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gdGhpcztcclxuICAgICAgICAvLyB0aGlzLmluaXRpYWxpemF0aW9uKCk7Ly/muLjmiI/lvIDlp4vnmoTmlbDmja7liJ3lp4vljJYgICDnvZHnu5zor7fmsYJcclxuICAgICAgICAvLyB0aGlzLnF1ZXJ5SGVyb0RldGFpbCgpOyAgLy/lt7Lnu4/lnKhoZXJvRGV0YWlsLmpz6YeM6LCD55SoXHJcblxyXG4gICAgICAgIC8v6YCa55+l5o+Q56S655qEbGFiZWzliJ3lp4vljJbml7ZhY3RpdmXkuLpmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGljZUxhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubXlQYWNrYWdlLmFjdGl2ZSA9IGZhbHNlOy8v6IOM5YyF5Yid5aeL5YyW5LiN5pi+56S6XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5pdGlhbGl6YXRpb24oKXsgICAvL+i/m+WFpea4uOaIj+eahOS4quS6uuaVsOaNruWIneWni+WMlizmn6Xog4zljIVcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCByZXF1ZXN0VXJsK1wiYXJjaGl2ZXMvYmVnaW5HYW1lP2FyY2hpdmVzSWQ9MVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBxdWVyeUhlcm9EZXRhaWwoKXtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCByZXF1ZXN0VXJsK1wiYXJjaGl2ZXMvcXVlcnlBcmNoaXZlcz91c2VySWQ9MVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuQW5kQ2xvc2VQYWNrYWdlKHBvcyl7XHJcbiAgICAgICAgdGhpcy5teVBhY2thZ2UuYWN0aXZlID0gIXRoaXMubXlQYWNrYWdlLmFjdGl2ZTtcclxuICAgICAgICBpZih0aGlzLm15UGFja2FnZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLm15UGFja2FnZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbm90aWNlKG1lc3NhZ2UscG9zKXsgIC8v6L+b5YWl5oi/6Ze055qE5o+Q56S64oCc5oi/6Ze05rKh5pyJ5Lic6KW/77yM5oyJcemAgOWHuuKAnVxyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXBcIikub3BhY2l0eSA9IDMwO1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLm9wYWNpdHkgPSAzMDtcclxuICAgICAgLy8gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgIC8vICAgbGV0IG5vdGljZUxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7ICAgLy9ub3RpY2XmiZPnrpfliqjmgIHnlJ/miJDnmoTvvIzogIzkuI3mmK/lnKh0aGlzLm5vdGljZUxhYmVs6IqC54K55pu05pS5XHJcbiAgICAgIC8vICAgICAgIG5vdGljZUxhYmVsLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLm5vdGljZUxhYmVsKVxyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKG5vdGljZUxhYmVsKVxyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVDsvL+iHqumAguW6lOmrmOW6puOAguaWh+Wtl+i2iuWkmu+8jOS8muaJqeWxlemrmOW6plxyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuX2NvbnRlbnRTaXplLndpZHRoID0gODAwO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLnN0cmluZyA9IG1lc3NhZ2UrXCIuLi4uLi4gIOaMiSdxJ+mUrumAgOWHulwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2VFeGl0KCl7ICAgLy/mjIlx6ZSu6YCA5Ye655qE5aSE55CGXHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hcFwiKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5LbmFwc2FjaygpeyAgIC8v5omT5byA6IOM5YyFXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzd2l0Y2hNYXAob2xkTWFwLG5ld01hcCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKG9sZE1hcCkuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKG5ld01hcCkuYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzQ3LjEwNC44MC4xMjc6ODA4MC9cIjtcclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgfSxcclxufSk7XHJcbiJdfQ==