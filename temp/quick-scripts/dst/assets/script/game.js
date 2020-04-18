
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
    },
    openDoorAudio: {
      type: cc.AudioClip,
      "default": null
    },
    openPackageAudio: {
      type: cc.AudioClip,
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
    cc.audioEngine.play(this.openPackageAudio, false, 0.3);

    if (this.myPackage.active) {
      this.myPackage.setPosition(pos);
    }
  },
  notice: function notice(message, pos) {
    //进入房间的提示“房间没有东西，按q退出”
    this.node.getChildByName("map").opacity = 30;
    this.node.getChildByName("hero").opacity = 30;
    cc.audioEngine.play(this.openDoorAudio, false, 0.3); // this.node.addComponent(cc.Label);
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

    cc.audioEngine.play(this.openDoorAudio, false, 0.3);
    this.noticeLabel.node.active = false;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbInJlcXVlc3RVcmwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5vdGljZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwibXlQYWNrYWdlIiwiTm9kZSIsIm9wZW5Eb29yQXVkaW8iLCJBdWRpb0NsaXAiLCJvcGVuUGFja2FnZUF1ZGlvIiwib25Mb2FkIiwicCIsImRpcmVjdG9yIiwiZ2V0UGh5c2ljc01hbmFnZXIiLCJlbmFibGVkIiwiZ3Jhdml0eSIsInYyIiwiZ2V0Q29sbGlzaW9uTWFuYWdlciIsIndpbmRvdyIsImdhbWUiLCJhY3RpdmUiLCJpbml0aWFsaXphdGlvbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsIm9wZW4iLCJzZW5kIiwicXVlcnlIZXJvRGV0YWlsIiwib3BlbkFuZENsb3NlUGFja2FnZSIsInBvcyIsImF1ZGlvRW5naW5lIiwicGxheSIsInNldFBvc2l0aW9uIiwibm90aWNlIiwibWVzc2FnZSIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsIm9wYWNpdHkiLCJvdmVyZmxvdyIsIk92ZXJmbG93IiwiUkVTSVpFX0hFSUdIVCIsIl9jb250ZW50U2l6ZSIsIndpZHRoIiwic3RyaW5nIiwibm90aWNlRXhpdCIsInN3aXRjaE1hcCIsIm9sZE1hcCIsIm5ld01hcCIsInN0YXJ0IiwiYmFzZVVybCIsInVwZGF0ZSIsImR0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFVBQVUsR0FBRyw0QkFBbkI7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFB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RixJQUFMLENBQVVDLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNDLE9BQWpDLEdBQTJDLEdBQTNDLENBRlUsQ0FHVjs7QUFDRS9DLElBQUFBLEVBQUUsQ0FBQ3dDLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixLQUFLaEMsYUFBekIsRUFBdUMsS0FBdkMsRUFBNkMsR0FBN0M7QUFDQSxTQUFLTCxXQUFMLENBQWlCeUMsSUFBakIsQ0FBc0J2QixNQUF0QixHQUErQixLQUEvQjtBQUNILEdBaEdJO0FBa0dMaUMsRUFBQUEsU0FsR0sscUJBa0dLQyxNQWxHTCxFQWtHWUMsTUFsR1osRUFrR21CO0FBQ3BCLFNBQUtaLElBQUwsQ0FBVUMsY0FBVixDQUF5QlUsTUFBekIsRUFBaUNsQyxNQUFqQyxHQUEwQyxLQUExQztBQUNBLFNBQUt1QixJQUFMLENBQVVDLGNBQVYsQ0FBeUJXLE1BQXpCLEVBQWlDbkMsTUFBakMsR0FBMEMsSUFBMUM7QUFDSCxHQXJHSTtBQXVHTG9DLEVBQUFBLEtBdkdLLG1CQXVHSTtBQUNMLFNBQUtDLE9BQUwsR0FBZSw0QkFBZjtBQUNILEdBekdJO0FBMkdMQyxFQUFBQSxNQTNHSyxrQkEyR0dDLEVBM0dILEVBMkdPLENBRVg7QUE3R0ksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHJlcXVlc3RVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvXCJcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbm90aWNlTGFiZWw6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG15UGFja2FnZTp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuRG9vckF1ZGlvOntcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlblBhY2thZ2VBdWRpbzp7XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICBsZXQgcCA9IGNjLmRpcmVjdG9yLmdldFBoeXNpY3NNYW5hZ2VyKCk7XHJcbiAgICAgICAgcC5lbmFibGVkID0gdHJ1ZTtcclxuICAgICAgICBwLmdyYXZpdHkgPSBjYy52MigwLDApOyBcclxuICAgICAgICAvLyBwLmRlYnVnRHJhd0ZsYWdzID0gdHJ1ZTsgIC8v5pi+56S65Ye65p2l56Kw5pKe6L655qGG77yM5Li65LqG5pa55L6/5ryU56S6XHJcbiAgICAgICAgY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWQgPSB0cnVlOyAvL+ajgOa1i+eisOaSnlxyXG4gICAgICAgIC8vIGNjLmRpcmVjdG9yLmdldENvbGxpc2lvbk1hbmFnZXIoKS5lbmFibGVkRGVidWdEcmF3ID0gdHJ1ZTsvL+eisOaSnuajgOa1i+eahOi+ueahhuaYvuekulxyXG5cclxuICAgICAgICB3aW5kb3cuZ2FtZSA9IHRoaXM7XHJcbiAgICAgICAgLy8gdGhpcy5pbml0aWFsaXphdGlvbigpOy8v5ri45oiP5byA5aeL55qE5pWw5o2u5Yid5aeL5YyWICAg572R57uc6K+35rGCXHJcbiAgICAgICAgLy8gdGhpcy5xdWVyeUhlcm9EZXRhaWwoKTsgIC8v5bey57uP5ZyoaGVyb0RldGFpbC5qc+mHjOiwg+eUqFxyXG5cclxuICAgICAgICAvL+mAmuefpeaPkOekuueahGxhYmVs5Yid5aeL5YyW5pe2YWN0aXZl5Li6ZmFsc2U7XHJcbiAgICAgICAgdGhpcy5ub3RpY2VMYWJlbC5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm15UGFja2FnZS5hY3RpdmUgPSBmYWxzZTsvL+iDjOWMheWIneWni+WMluS4jeaYvuekulxyXG5cclxuICAgIH0sXHJcblxyXG5cclxuICAgIGluaXRpYWxpemF0aW9uKCl7ICAgLy/ov5vlhaXmuLjmiI/nmoTkuKrkurrmlbDmja7liJ3lp4vljJYs5p+l6IOM5YyFXHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgcmVxdWVzdFVybCtcImFyY2hpdmVzL2JlZ2luR2FtZT9hcmNoaXZlc0lkPTFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcXVlcnlIZXJvRGV0YWlsKCl7XHJcbiAgICAgICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0ICYmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgNDAwKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgcmVxdWVzdFVybCtcImFyY2hpdmVzL3F1ZXJ5QXJjaGl2ZXM/dXNlcklkPTFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgb3BlbkFuZENsb3NlUGFja2FnZShwb3Mpe1xyXG4gICAgICAgIHRoaXMubXlQYWNrYWdlLmFjdGl2ZSA9ICF0aGlzLm15UGFja2FnZS5hY3RpdmU7XHJcbiAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLm9wZW5QYWNrYWdlQXVkaW8sZmFsc2UsMC4zKTtcclxuICAgICAgICBpZih0aGlzLm15UGFja2FnZS5hY3RpdmUpe1xyXG4gICAgICAgICAgICB0aGlzLm15UGFja2FnZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgbm90aWNlKG1lc3NhZ2UscG9zKXsgIC8v6L+b5YWl5oi/6Ze055qE5o+Q56S64oCc5oi/6Ze05rKh5pyJ5Lic6KW/77yM5oyJcemAgOWHuuKAnVxyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJtYXBcIikub3BhY2l0eSA9IDMwO1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLm9wYWNpdHkgPSAzMDtcclxuICAgICAgY2MuYXVkaW9FbmdpbmUucGxheSh0aGlzLm9wZW5Eb29yQXVkaW8sZmFsc2UsMC4zKTtcclxuICAgICAgLy8gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgIC8vICAgbGV0IG5vdGljZUxhYmVsID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCk7ICAgLy9ub3RpY2XmiZPnrpfliqjmgIHnlJ/miJDnmoTvvIzogIzkuI3mmK/lnKh0aGlzLm5vdGljZUxhYmVs6IqC54K55pu05pS5XHJcbiAgICAgIC8vICAgICAgIG5vdGljZUxhYmVsLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgICAgLy8gICBjb25zb2xlLmxvZyh0aGlzLm5vdGljZUxhYmVsKVxyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKG5vdGljZUxhYmVsKVxyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuUkVTSVpFX0hFSUdIVDsvL+iHqumAguW6lOmrmOW6puOAguaWh+Wtl+i2iuWkmu+8jOS8muaJqeWxlemrmOW6plxyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLm5vZGUuX2NvbnRlbnRTaXplLndpZHRoID0gODAwO1xyXG4gICAgICB0aGlzLm5vdGljZUxhYmVsLnN0cmluZyA9IG1lc3NhZ2UrXCIuLi4uLi4gIOaMiSdxJ+mUrumAgOWHulwiO1xyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2VFeGl0KCl7ICAgLy/mjIlx6ZSu6YCA5Ye655qE5aSE55CGXHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hcFwiKS5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoZXJvXCIpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgIC8vIHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLmRlc3Ryb3koKTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMub3BlbkRvb3JBdWRpbyxmYWxzZSwwLjMpO1xyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgc3dpdGNoTWFwKG9sZE1hcCxuZXdNYXApe1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShvbGRNYXApLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShuZXdNYXApLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvXCI7XHJcbiAgICB9LFxyXG5cclxuICAgIHVwZGF0ZSAoZHQpIHtcclxuXHJcbiAgICB9LFxyXG59KTtcclxuIl19