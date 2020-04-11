
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
    this.node.getChildByName("hero").opacity = 30;
    this.noticeLabel.node.setPosition(pos);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbInJlcXVlc3RVcmwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5vdGljZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwibXlQYWNrYWdlIiwiTm9kZSIsIm9uTG9hZCIsInAiLCJkaXJlY3RvciIsImdldFBoeXNpY3NNYW5hZ2VyIiwiZW5hYmxlZCIsImdyYXZpdHkiLCJ2MiIsImdldENvbGxpc2lvbk1hbmFnZXIiLCJ3aW5kb3ciLCJnYW1lIiwiYWN0aXZlIiwiaW5pdGlhbGl6YXRpb24iLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwic2VuZCIsInF1ZXJ5SGVyb0RldGFpbCIsIm9wZW5BbmRDbG9zZVBhY2thZ2UiLCJwb3MiLCJzZXRQb3NpdGlvbiIsIm5vdGljZSIsIm1lc3NhZ2UiLCJub2RlIiwiZ2V0Q2hpbGRCeU5hbWUiLCJvcGFjaXR5Iiwib3ZlcmZsb3ciLCJPdmVyZmxvdyIsIlJFU0laRV9IRUlHSFQiLCJfY29udGVudFNpemUiLCJ3aWR0aCIsInN0cmluZyIsIm5vdGljZUV4aXQiLCJvcGVuS25hcHNhY2siLCJzd2l0Y2hNYXAiLCJvbGRNYXAiLCJuZXdNYXAiLCJzdGFydCIsImJhc2VVcmwiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxVQUFVLEdBQUcsNEJBQW5CO0FBRUFDLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxXQUFXLEVBQUM7QUFDUkMsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLEtBREE7QUFF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QkEyRkk7QUFDTCxTQUFLQyxPQUFMLEdBQWUsNEJBQWY7QUFDSCxHQTdGSTtBQStGTEMsRUFBQUEsTUEvRkssa0JBK0ZHQyxFQS9GSCxFQStGTyxDQUNYO0FBaEdJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jb25zdCByZXF1ZXN0VXJsID0gXCJodHRwOi8vNDcuMTA0LjgwLjEyNzo4MDgwL1wiXHJcblxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG5vdGljZUxhYmVsOntcclxuICAgICAgICAgICAgdHlwZTpjYy5MYWJlbCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBteVBhY2thZ2U6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgbGV0IHAgPSBjYy5kaXJlY3Rvci5nZXRQaHlzaWNzTWFuYWdlcigpO1xyXG4gICAgICAgIHAuZW5hYmxlZCA9IHRydWU7XHJcbiAgICAgICAgcC5ncmF2aXR5ID0gY2MudjIoMCwwKTsgXHJcbiAgICAgICAgLy8gcC5kZWJ1Z0RyYXdGbGFncyA9IHRydWU7ICAvL+aYvuekuuWHuuadpeeisOaSnui+ueahhu+8jOS4uuS6huaWueS+v+a8lOekulxyXG4gICAgICAgIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkID0gdHJ1ZTsgLy/mo4DmtYvnorDmkp5cclxuICAgICAgICAvLyBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZERlYnVnRHJhdyA9IHRydWU7Ly/norDmkp7mo4DmtYvnmoTovrnmoYbmmL7npLpcclxuXHJcbiAgICAgICAgd2luZG93LmdhbWUgPSB0aGlzO1xyXG4gICAgICAgIC8vIHRoaXMuaW5pdGlhbGl6YXRpb24oKTsvL+a4uOaIj+W8gOWni+eahOaVsOaNruWIneWni+WMliAgIOe9kee7nOivt+axglxyXG4gICAgICAgIC8vIHRoaXMucXVlcnlIZXJvRGV0YWlsKCk7ICAvL+W3sue7j+WcqGhlcm9EZXRhaWwuanPph4zosIPnlKhcclxuXHJcbiAgICAgICAgLy/pgJrnn6Xmj5DnpLrnmoRsYWJlbOWIneWni+WMluaXtmFjdGl2ZeS4umZhbHNlO1xyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5teVBhY2thZ2UuYWN0aXZlID0gZmFsc2U7Ly/og4zljIXliJ3lp4vljJbkuI3mmL7npLpcclxuXHJcbiAgICB9LFxyXG5cclxuXHJcbiAgICBpbml0aWFsaXphdGlvbigpeyAgIC8v6L+b5YWl5ri45oiP55qE5Liq5Lq65pWw5o2u5Yid5aeL5YyWLOafpeiDjOWMhVxyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHJlcXVlc3RVcmwrXCJhcmNoaXZlcy9iZWdpbkdhbWU/YXJjaGl2ZXNJZD0xXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHF1ZXJ5SGVyb0RldGFpbCgpe1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHJlcXVlc3RVcmwrXCJhcmNoaXZlcy9xdWVyeUFyY2hpdmVzP3VzZXJJZD0xXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIG9wZW5BbmRDbG9zZVBhY2thZ2UocG9zKXtcclxuICAgICAgICB0aGlzLm15UGFja2FnZS5hY3RpdmUgPSAhdGhpcy5teVBhY2thZ2UuYWN0aXZlO1xyXG4gICAgICAgIGlmKHRoaXMubXlQYWNrYWdlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubXlQYWNrYWdlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2UobWVzc2FnZSxwb3MpeyAgLy/ov5vlhaXmiL/pl7TnmoTmj5DnpLrigJzmiL/pl7TmsqHmnInkuJzopb/vvIzmjIlx6YCA5Ye64oCdXHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hcFwiKS5vcGFjaXR5ID0gMzA7XHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikub3BhY2l0eSA9IDMwO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5SRVNJWkVfSEVJR0hUOy8v6Ieq6YCC5bqU6auY5bqm44CC5paH5a2X54ux54Ot5aSa77yM5Lya5omp5bGV6auY5bqmXHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5fY29udGVudFNpemUud2lkdGggPSA4MDA7XHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwuc3RyaW5nID0gbWVzc2FnZStcIi4uLi4uLiAg5oyJJ3En6ZSu6YCA5Ye6XCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG5vdGljZUV4aXQoKXsgICAvL+aMiXHplK7pgIDlh7rnmoTlpITnkIZcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFwXCIpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikub3BhY2l0eSA9IDI1NTtcclxuICAgICAgdGhpcy5ub3RpY2VMYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuS25hcHNhY2soKXsgICAvL+aJk+W8gOiDjOWMhVxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3dpdGNoTWFwKG9sZE1hcCxuZXdNYXApe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShvbGRNYXApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShuZXdNYXApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=