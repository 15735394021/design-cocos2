
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbInJlcXVlc3RVcmwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5vdGljZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwib25Mb2FkIiwicCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJlbmFibGVkIiwiZ3Jhdml0eSIsInYyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsIndpbmRvdyIsImdhbWUiLCJpbml0aWFsaXphdGlvbiIsImFjdGl2ZSIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsIm9wZW4iLCJzZW5kIiwibm90aWNlIiwibWVzc2FnZSIsIngiLCJ5Iiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwib3BhY2l0eSIsIm5vdGljZVBvcyIsInNldFBvc2l0aW9uIiwib3ZlcmZsb3ciLCJPdmVyZmxvdyIsIlJFU0laRV9IRUlHSFQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsInN0cmluZyIsIm5vdGljZUV4aXQiLCJvcGVuS25hcHNhY2siLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxVQUFVLEdBQUcsa0RBQW5CO0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUM7QUFDUkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLEtBREE7QUFFUixpQkFBUTtBQUZBO0FBREosR0FIUDtBQVdMQyxFQUFBQSxNQVhLLG9CQVdLO0FBQ04sUUFBSUMsQ0FBQyxHQUFHUixFQUFFLENBQUNTLFFBQUgsQ0FBWUMsaUJBQVosRUFBUjtBQUNBRixJQUFBQSxDQUFDLENBQUNHLE9BQUYsR0FBWSxJQUFaO0FBQ0FILElBQUFBLENBQUMsQ0FBQ0ksT0FBRixHQUFZWixFQUFFLENBQUNhLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUFaLENBSE0sQ0FJTjs7QUFDQWIsSUFBQUEsRUFBRSxDQUFDUyxRQUFILENBQVlLLG1CQUFaLEdBQWtDSCxPQUFsQyxHQUE0QyxJQUE1QyxDQUxNLENBSzRDO0FBQ2xEOztBQUVBSSxJQUFBQSxNQUFNLENBQUNDLElBQVAsR0FBYyxJQUFkO0FBQ0EsU0FBS0MsY0FBTCxHQVRNLENBU2dCO0FBRXRCOztBQUNBLFNBQUtiLFdBQUwsQ0FBaUJjLE1BQWpCLEdBQTBCLEtBQTFCO0FBQ0gsR0F4Qkk7QUEwQkxELEVBQUFBLGNBMUJLLDRCQTBCVztBQUFJO0FBQ2hCLFFBQUlFLEdBQUcsR0FBRyxJQUFJQyxjQUFKLEVBQVY7O0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0Usa0JBQUosR0FBeUIsWUFBWTtBQUNqQyxVQUFJRixHQUFHLENBQUNHLFVBQUosSUFBa0IsQ0FBbEIsSUFBd0JILEdBQUcsQ0FBQ0ksTUFBSixJQUFjLEdBQWQsSUFBcUJKLEdBQUcsQ0FBQ0ksTUFBSixHQUFhLEdBQTlELEVBQW9FO0FBQ2hFLFlBQUlDLFFBQVEsR0FBR0wsR0FBRyxDQUFDTSxZQUFuQjtBQUNBQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUgsUUFBWjtBQUNIO0FBQ0osS0FMRDs7QUFNQUwsSUFBQUEsR0FBRyxDQUFDUyxJQUFKLENBQVMsS0FBVCxFQUFnQjdCLFVBQWhCLEVBQTRCLElBQTVCO0FBQ0FvQixJQUFBQSxHQUFHLENBQUNVLElBQUo7QUFDSCxHQXBDSTtBQXNDTEMsRUFBQUEsTUF0Q0ssa0JBc0NFQyxPQXRDRixFQXNDVUMsQ0F0Q1YsRUFzQ1lDLENBdENaLEVBc0NjO0FBQUc7QUFDcEIsU0FBS0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCLEtBQXpCLEVBQWdDQyxPQUFoQyxHQUEwQyxFQUExQztBQUNBLFNBQUtGLElBQUwsQ0FBVUMsY0FBVixDQUF5QixNQUF6QixFQUFpQ0MsT0FBakMsR0FBMkMsRUFBM0M7QUFDQSxRQUFJQyxTQUFTLEdBQUdyQyxFQUFFLENBQUNhLEVBQUgsQ0FBTW1CLENBQU4sRUFBUUMsQ0FBUixDQUFoQjtBQUNBLFNBQUs3QixXQUFMLENBQWlCOEIsSUFBakIsQ0FBc0JJLFdBQXRCLENBQWtDRCxTQUFsQztBQUNBLFNBQUtqQyxXQUFMLENBQWlCOEIsSUFBakIsQ0FBc0JoQixNQUF0QixHQUErQixJQUEvQjtBQUNBLFNBQUtkLFdBQUwsQ0FBaUJtQyxRQUFqQixHQUE0QnZDLEVBQUUsQ0FBQ00sS0FBSCxDQUFTa0MsUUFBVCxDQUFrQkMsYUFBOUMsQ0FOaUIsQ0FNMkM7O0FBQzVELFNBQUtyQyxXQUFMLENBQWlCOEIsSUFBakIsQ0FBc0JRLFlBQXRCLENBQW1DQyxLQUFuQyxHQUEyQyxHQUEzQztBQUNBLFNBQUt2QyxXQUFMLENBQWlCd0MsTUFBakIsR0FBMEJiLE9BQU8sR0FBQyxpQkFBbEM7QUFDRCxHQS9DSTtBQWlETGMsRUFBQUEsVUFqREssd0JBaURPO0FBQUk7QUFDZCxTQUFLekMsV0FBTCxDQUFpQmMsTUFBakIsR0FBMEIsS0FBMUI7QUFDQSxTQUFLZ0IsSUFBTCxDQUFVQyxjQUFWLENBQXlCLEtBQXpCLEVBQWdDQyxPQUFoQyxHQUEwQyxHQUExQztBQUNBLFNBQUtGLElBQUwsQ0FBVUMsY0FBVixDQUF5QixNQUF6QixFQUFpQ0MsT0FBakMsR0FBMkMsR0FBM0M7QUFDQSxTQUFLaEMsV0FBTCxDQUFpQjhCLElBQWpCLENBQXNCaEIsTUFBdEIsR0FBK0IsS0FBL0I7QUFDRCxHQXRESTtBQXdETDRCLEVBQUFBLFlBeERLLDBCQXdEUyxDQUFJO0FBRWpCLEdBMURJO0FBNERMQyxFQUFBQSxLQTVESyxtQkE0REksQ0FFUixDQTlESSxDQWdFTDs7QUFoRUssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHJlcXVlc3RVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvYXJjaGl2ZXMvcXVlcnlBcmNoaXZlc1wiXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vdGljZUxhYmVsOntcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBsZXQgcCA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwLmdyYXZpdHkgPSBjYy52MigwLDApOyBcclxuICAgICAgICAvLyBwLmRlYnVnRHJhd0ZsYWdzID0gdHJ1ZTsgIC8v5pi+56S65Ye65p2l56Kw5pKe6L655qGG77yM5Li65LqG5pa55L6/5ryU56S6XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlOyAvL+ajgOa1i+eisOaSnlxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsvL+eisOaSnuajgOa1i+eahOi+ueahhuaYvuekulxyXG5cclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pbml0aWFsaXphdGlvbigpOy8v5ri45oiP5byA5aeL55qE5pWw5o2u5Yid5aeL5YyWXHJcblxyXG4gICAgICAgIC8v6YCa55+l5o+Q56S655qEbGFiZWzliJ3lp4vljJbml7ZhY3RpdmXkuLpmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGljZUxhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBpbml0aWFsaXphdGlvbigpeyAgIC8v6L+b5YWl5ri45oiP55qE5Liq5Lq65pWw5o2u5Yid5aeL5YyWXHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0geGhyLnJlc3BvbnNlVGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgcmVxdWVzdFVybCwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgbm90aWNlKG1lc3NhZ2UseCx5KXsgIC8v6L+b5YWl5oi/6Ze055qE5o+Q56S64oCc5oi/6Ze05rKh5pyJ5Lic6KW/77yM5oyJcemAgOWHuuKAnVxyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXBcIikub3BhY2l0eSA9IDMwO1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLm9wYWNpdHkgPSAzMDtcclxuICAgICAgdmFyIG5vdGljZVBvcyA9IGNjLnYyKHgseSk7XHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5zZXRQb3NpdGlvbihub3RpY2VQb3MpO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlJFU0laRV9IRUlHSFQ7Ly/oh6rpgILlupTpq5jluqbjgILmloflrZfni7Hng63lpJrvvIzkvJrmianlsZXpq5jluqZcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5ub2RlLl9jb250ZW50U2l6ZS53aWR0aCA9IDgwMDtcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5zdHJpbmcgPSBtZXNzYWdlK1wiLi4uLi4uICDmjIkncSfplK7pgIDlh7pcIjtcclxuICAgIH0sXHJcblxyXG4gICAgbm90aWNlRXhpdCgpeyAgIC8v5oyJcemUrumAgOWHuueahOWkhOeQhlxyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXBcIikub3BhY2l0eSA9IDI1NTtcclxuICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiaGVyb1wiKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5LbmFwc2FjaygpeyAgIC8v5omT5byA6IOM5YyFXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==