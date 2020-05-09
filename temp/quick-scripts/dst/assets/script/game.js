
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
    openAndPackageAudio: {
      type: cc.AudioClip,
      "default": null
    },
    openDoor: {
      type: cc.AudioClip,
      "default": null
    },
    hcs_pre: {
      type: cc.Prefab,
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
    cc.audioEngine.play(this.openAndPackageAudio, false, 0.3);

    if (this.myPackage.active) {
      this.myPackage.setPosition(pos);
    }
  },
  notice: function notice(message, pos) {
    //进入房间的提示“房间没有东西，按q退出”
    this.node.getChildByName("map").opacity = 30; // this.node.getChildByName("hero").opacity = 30;

    cc.audioEngine.play(this.openDoor, false, 0.3); // this.node.addComponent(cc.Label);
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
    cc.audioEngine.play(this.openDoor, false, 0.3);
    this.node.getChildByName("map").opacity = 255; // this.node.getChildByName("hero").opacity = 255;
    // this.node.getComponent(cc.Label).destroy();

    this.noticeLabel.node.active = false;
  },
  openKnapsack: function openKnapsack() {//打开背包
  },
  start: function start() {
    if (cc.sys.localStorage.getItem("userId") == null) {
      cc.director.loadScene("welcome");
    }

    if (cc.sys.localStorage.getItem("checkPoint") == null) {
      cc.director.loadScene("archives");
    }
  },
  loadNewScene: function loadNewScene(scene, pos) {
    //在这里加传送的特效,预加载新地图，节省loading时间
    cc.director.preloadScene(scene);
    var timer1 = window.setTimeout(function () {
      cc.director.loadScene(scene);
    }, 3000);
    var herocsNode = cc.instantiate(this.hcs_pre);
    herocsNode.parent = this.node;
    herocsNode.setPosition(pos);
  } // update (dt) {
  // },

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxnYW1lLmpzIl0sIm5hbWVzIjpbInJlcXVlc3RVcmwiLCJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm5vdGljZUxhYmVsIiwidHlwZSIsIkxhYmVsIiwibXlQYWNrYWdlIiwiTm9kZSIsIm9wZW5BbmRQYWNrYWdlQXVkaW8iLCJBdWRpb0NsaXAiLCJvcGVuRG9vciIsImhjc19wcmUiLCJQcmVmYWIiLCJvbkxvYWQiLCJwIiwiZGlyZWN0b3IiLCJnZXRQaHlzaWNzTWFuYWdlciIsImVuYWJsZWQiLCJncmF2aXR5IiwidjIiLCJnZXRDb2xsaXNpb25NYW5hZ2VyIiwid2luZG93IiwiZ2FtZSIsImFjdGl2ZSIsImluaXRpYWxpemF0aW9uIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjb25zb2xlIiwibG9nIiwib3BlbiIsInNlbmQiLCJxdWVyeUhlcm9EZXRhaWwiLCJvcGVuQW5kQ2xvc2VQYWNrYWdlIiwicG9zIiwiYXVkaW9FbmdpbmUiLCJwbGF5Iiwic2V0UG9zaXRpb24iLCJub3RpY2UiLCJtZXNzYWdlIiwibm9kZSIsImdldENoaWxkQnlOYW1lIiwib3BhY2l0eSIsIm92ZXJmbG93IiwiT3ZlcmZsb3ciLCJSRVNJWkVfSEVJR0hUIiwiX2NvbnRlbnRTaXplIiwid2lkdGgiLCJzdHJpbmciLCJub3RpY2VFeGl0Iiwib3BlbktuYXBzYWNrIiwic3RhcnQiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwibG9hZFNjZW5lIiwibG9hZE5ld1NjZW5lIiwic2NlbmUiLCJwcmVsb2FkU2NlbmUiLCJ0aW1lcjEiLCJzZXRUaW1lb3V0IiwiaGVyb2NzTm9kZSIsImluc3RhbnRpYXRlIiwicGFyZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFVBQVUsR0FBRyw0QkFBbkI7QUFFQUMsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBQztBQUNSQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ00sS0FEQTtBQUVSLGlCQUFRO0FBRkEsS0FESjtBQUtSQyxJQUFBQSxTQUFTLEVBQUU7QUFDUEYsTUFBQUEsSUFBSSxFQUFFTCxFQUFFLENBQUNRLElBREY7QUFFUCxpQkFBUztBQUZGLEtBTEg7QUFTUkMsSUFBQUEsbUJBQW1CLEVBQUM7QUFDaEJKLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDVSxTQURRO0FBRWhCLGlCQUFRO0FBRlEsS0FUWjtBQWFSQyxJQUFBQSxRQUFRLEVBQUM7QUFDTE4sTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNVLFNBREg7QUFFTCxpQkFBUTtBQUZILEtBYkQ7QUFpQlJFLElBQUFBLE9BQU8sRUFBQztBQUNKUCxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ2EsTUFESjtBQUVKLGlCQUFRO0FBRko7QUFqQkEsR0FIUDtBQTJCTEMsRUFBQUEsTUEzQkssb0JBMkJLO0FBQ04sUUFBSUMsQ0FBQyxHQUFHZixFQUFFLENBQUNnQixRQUFILENBQVlDLGlCQUFaLEVBQVI7QUFDQUYsSUFBQUEsQ0FBQyxDQUFDRyxPQUFGLEdBQVksSUFBWjtBQUNBSCxJQUFBQSxDQUFDLENBQUNJLE9BQUYsR0FBWW5CLEVBQUUsQ0FBQ29CLEVBQUgsQ0FBTSxDQUFOLEVBQVEsQ0FBUixDQUFaLENBSE0sQ0FJTjs7QUFDQXBCLElBQUFBLEVBQUUsQ0FBQ2dCLFFBQUgsQ0FBWUssbUJBQVosR0FBa0NILE9BQWxDLEdBQTRDLElBQTVDLENBTE0sQ0FLNEM7QUFDbEQ7O0FBRUFJLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxHQUFjLElBQWQsQ0FSTSxDQVNOO0FBQ0E7QUFFQTs7QUFDQSxTQUFLbkIsV0FBTCxDQUFpQm9CLE1BQWpCLEdBQTBCLEtBQTFCO0FBQ0EsU0FBS2pCLFNBQUwsQ0FBZWlCLE1BQWYsR0FBd0IsS0FBeEIsQ0FkTSxDQWN3QjtBQUVqQyxHQTNDSTtBQThDTEMsRUFBQUEsY0E5Q0ssNEJBOENXO0FBQUk7QUFDaEIsUUFBSUMsR0FBRyxHQUFHLElBQUlDLGNBQUosRUFBVjs7QUFDQUQsSUFBQUEsR0FBRyxDQUFDRSxrQkFBSixHQUF5QixZQUFZO0FBQ2pDLFVBQUlGLEdBQUcsQ0FBQ0csVUFBSixJQUFrQixDQUFsQixJQUF3QkgsR0FBRyxDQUFDSSxNQUFKLElBQWMsR0FBZCxJQUFxQkosR0FBRyxDQUFDSSxNQUFKLEdBQWEsR0FBOUQsRUFBb0U7QUFDaEUsWUFBSUMsUUFBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV1AsR0FBRyxDQUFDUSxZQUFmLENBQWY7QUFDQUMsUUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlMLFFBQVo7QUFDSDtBQUNKLEtBTEQ7O0FBTUFMLElBQUFBLEdBQUcsQ0FBQ1csSUFBSixDQUFTLEtBQVQsRUFBZ0J0QyxVQUFVLEdBQUMsaUNBQTNCLEVBQThELElBQTlEO0FBQ0EyQixJQUFBQSxHQUFHLENBQUNZLElBQUo7QUFDSCxHQXhESTtBQTBETEMsRUFBQUEsZUExREssNkJBMERZO0FBQ2IsUUFBSWIsR0FBRyxHQUFHLElBQUlDLGNBQUosRUFBVjs7QUFDQUQsSUFBQUEsR0FBRyxDQUFDRSxrQkFBSixHQUF5QixZQUFZO0FBQ2pDLFVBQUlGLEdBQUcsQ0FBQ0csVUFBSixJQUFrQixDQUFsQixJQUF3QkgsR0FBRyxDQUFDSSxNQUFKLElBQWMsR0FBZCxJQUFxQkosR0FBRyxDQUFDSSxNQUFKLEdBQWEsR0FBOUQsRUFBb0U7QUFDaEUsWUFBSUMsUUFBUSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV1AsR0FBRyxDQUFDUSxZQUFmLENBQWYsQ0FEZ0UsQ0FFaEU7QUFDSDtBQUNKLEtBTEQ7O0FBTUFSLElBQUFBLEdBQUcsQ0FBQ1csSUFBSixDQUFTLEtBQVQsRUFBZ0J0QyxVQUFVLEdBQUMsaUNBQTNCLEVBQThELElBQTlEO0FBQ0EyQixJQUFBQSxHQUFHLENBQUNZLElBQUo7QUFDSCxHQXBFSTtBQXNFTEUsRUFBQUEsbUJBdEVLLCtCQXNFZUMsR0F0RWYsRUFzRW1CO0FBQ3BCLFNBQUtsQyxTQUFMLENBQWVpQixNQUFmLEdBQXdCLENBQUMsS0FBS2pCLFNBQUwsQ0FBZWlCLE1BQXhDO0FBQ0F4QixJQUFBQSxFQUFFLENBQUMwQyxXQUFILENBQWVDLElBQWYsQ0FBb0IsS0FBS2xDLG1CQUF6QixFQUE2QyxLQUE3QyxFQUFtRCxHQUFuRDs7QUFDQSxRQUFHLEtBQUtGLFNBQUwsQ0FBZWlCLE1BQWxCLEVBQXlCO0FBQ3JCLFdBQUtqQixTQUFMLENBQWVxQyxXQUFmLENBQTJCSCxHQUEzQjtBQUNIO0FBQ0osR0E1RUk7QUE4RUxJLEVBQUFBLE1BOUVLLGtCQThFRUMsT0E5RUYsRUE4RVVMLEdBOUVWLEVBOEVjO0FBQUc7QUFDcEIsU0FBS00sSUFBTCxDQUFVQyxjQUFWLENBQXlCLEtBQXpCLEVBQWdDQyxPQUFoQyxHQUEwQyxFQUExQyxDQURpQixDQUVqQjs7QUFDRWpELElBQUFBLEVBQUUsQ0FBQzBDLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixLQUFLaEMsUUFBekIsRUFBa0MsS0FBbEMsRUFBd0MsR0FBeEMsRUFIZSxDQUlqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNFLFNBQUtQLFdBQUwsQ0FBaUIyQyxJQUFqQixDQUFzQkgsV0FBdEIsQ0FBa0NILEdBQWxDO0FBQ0EsU0FBS3JDLFdBQUwsQ0FBaUIyQyxJQUFqQixDQUFzQnZCLE1BQXRCLEdBQStCLElBQS9CO0FBQ0YsU0FBS3BCLFdBQUwsQ0FBaUI4QyxRQUFqQixHQUE0QmxELEVBQUUsQ0FBQ00sS0FBSCxDQUFTNkMsUUFBVCxDQUFrQkMsYUFBOUMsQ0FYaUIsQ0FXMkM7O0FBQzVELFNBQUtoRCxXQUFMLENBQWlCMkMsSUFBakIsQ0FBc0JNLFlBQXRCLENBQW1DQyxLQUFuQyxHQUEyQyxHQUEzQztBQUNBLFNBQUtsRCxXQUFMLENBQWlCbUQsTUFBakIsR0FBMEJULE9BQU8sR0FBQyxpQkFBbEM7QUFDRCxHQTVGSTtBQThGTFUsRUFBQUEsVUE5Rkssd0JBOEZPO0FBQUk7QUFDWnhELElBQUFBLEVBQUUsQ0FBQzBDLFdBQUgsQ0FBZUMsSUFBZixDQUFvQixLQUFLaEMsUUFBekIsRUFBa0MsS0FBbEMsRUFBd0MsR0FBeEM7QUFDRixTQUFLb0MsSUFBTCxDQUFVQyxjQUFWLENBQXlCLEtBQXpCLEVBQWdDQyxPQUFoQyxHQUEwQyxHQUExQyxDQUZVLENBR1Y7QUFDQTs7QUFDRSxTQUFLN0MsV0FBTCxDQUFpQjJDLElBQWpCLENBQXNCdkIsTUFBdEIsR0FBK0IsS0FBL0I7QUFDSCxHQXBHSTtBQXNHTGlDLEVBQUFBLFlBdEdLLDBCQXNHUyxDQUFJO0FBRWpCLEdBeEdJO0FBMEdMQyxFQUFBQSxLQTFHSyxtQkEwR0k7QUFDTCxRQUFHMUQsRUFBRSxDQUFDMkQsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixRQUE1QixLQUF5QyxJQUE1QyxFQUFpRDtBQUM3QzdELE1BQUFBLEVBQUUsQ0FBQ2dCLFFBQUgsQ0FBWThDLFNBQVosQ0FBc0IsU0FBdEI7QUFDSDs7QUFDRCxRQUFHOUQsRUFBRSxDQUFDMkQsR0FBSCxDQUFPQyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixZQUE1QixLQUE2QyxJQUFoRCxFQUFxRDtBQUNqRDdELE1BQUFBLEVBQUUsQ0FBQ2dCLFFBQUgsQ0FBWThDLFNBQVosQ0FBc0IsVUFBdEI7QUFDSDtBQUNKLEdBakhJO0FBa0hMQyxFQUFBQSxZQWxISyx3QkFrSFFDLEtBbEhSLEVBa0hjdkIsR0FsSGQsRUFrSGtCO0FBQUM7QUFDcEJ6QyxJQUFBQSxFQUFFLENBQUNnQixRQUFILENBQVlpRCxZQUFaLENBQXlCRCxLQUF6QjtBQUNBLFFBQUlFLE1BQU0sR0FBQzVDLE1BQU0sQ0FBQzZDLFVBQVAsQ0FBa0IsWUFBVztBQUNwQ25FLE1BQUFBLEVBQUUsQ0FBQ2dCLFFBQUgsQ0FBWThDLFNBQVosQ0FBc0JFLEtBQXRCO0FBQ0gsS0FGVSxFQUVULElBRlMsQ0FBWDtBQUdBLFFBQUlJLFVBQVUsR0FBR3BFLEVBQUUsQ0FBQ3FFLFdBQUgsQ0FBZSxLQUFLekQsT0FBcEIsQ0FBakI7QUFDQXdELElBQUFBLFVBQVUsQ0FBQ0UsTUFBWCxHQUFvQixLQUFLdkIsSUFBekI7QUFDQXFCLElBQUFBLFVBQVUsQ0FBQ3hCLFdBQVgsQ0FBdUJILEdBQXZCO0FBRUgsR0EzSEksQ0E2SEw7QUFDQTs7QUE5SEssQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNvbnN0IHJlcXVlc3RVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvXCJcclxuXHJcbmNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgbm90aWNlTGFiZWw6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkxhYmVsLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIG15UGFja2FnZToge1xyXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvcGVuQW5kUGFja2FnZUF1ZGlvOntcclxuICAgICAgICAgICAgdHlwZTpjYy5BdWRpb0NsaXAsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb3BlbkRvb3I6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkF1ZGlvQ2xpcCxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoY3NfcHJlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIGxldCBwID0gY2MuZGlyZWN0b3IuZ2V0UGh5c2ljc01hbmFnZXIoKTtcclxuICAgICAgICBwLmVuYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIHAuZ3Jhdml0eSA9IGNjLnYyKDAsMCk7IFxyXG4gICAgICAgIC8vIHAuZGVidWdEcmF3RmxhZ3MgPSB0cnVlOyAgLy/mmL7npLrlh7rmnaXnorDmkp7ovrnmoYbvvIzkuLrkuobmlrnkvr/mvJTnpLpcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRDb2xsaXNpb25NYW5hZ2VyKCkuZW5hYmxlZCA9IHRydWU7IC8v5qOA5rWL56Kw5pKeXHJcbiAgICAgICAgLy8gY2MuZGlyZWN0b3IuZ2V0Q29sbGlzaW9uTWFuYWdlcigpLmVuYWJsZWREZWJ1Z0RyYXcgPSB0cnVlOy8v56Kw5pKe5qOA5rWL55qE6L655qGG5pi+56S6XHJcblxyXG4gICAgICAgIHdpbmRvdy5nYW1lID0gdGhpcztcclxuICAgICAgICAvLyB0aGlzLmluaXRpYWxpemF0aW9uKCk7Ly/muLjmiI/lvIDlp4vnmoTmlbDmja7liJ3lp4vljJYgICDnvZHnu5zor7fmsYJcclxuICAgICAgICAvLyB0aGlzLnF1ZXJ5SGVyb0RldGFpbCgpOyAgLy/lt7Lnu4/lnKhoZXJvRGV0YWlsLmpz6YeM6LCD55SoXHJcblxyXG4gICAgICAgIC8v6YCa55+l5o+Q56S655qEbGFiZWzliJ3lp4vljJbml7ZhY3RpdmXkuLpmYWxzZTtcclxuICAgICAgICB0aGlzLm5vdGljZUxhYmVsLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubXlQYWNrYWdlLmFjdGl2ZSA9IGZhbHNlOy8v6IOM5YyF5Yid5aeL5YyW5LiN5pi+56S6XHJcblxyXG4gICAgfSxcclxuXHJcblxyXG4gICAgaW5pdGlhbGl6YXRpb24oKXsgICAvL+i/m+WFpea4uOaIj+eahOS4quS6uuaVsOaNruWIneWni+WMlizmn6Xog4zljIVcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCByZXF1ZXN0VXJsK1wiYXJjaGl2ZXMvYmVnaW5HYW1lP2FyY2hpdmVzSWQ9MVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBxdWVyeUhlcm9EZXRhaWwoKXtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCByZXF1ZXN0VXJsK1wiYXJjaGl2ZXMvcXVlcnlBcmNoaXZlcz91c2VySWQ9MVwiLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBvcGVuQW5kQ2xvc2VQYWNrYWdlKHBvcyl7XHJcbiAgICAgICAgdGhpcy5teVBhY2thZ2UuYWN0aXZlID0gIXRoaXMubXlQYWNrYWdlLmFjdGl2ZTtcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMub3BlbkFuZFBhY2thZ2VBdWRpbyxmYWxzZSwwLjMpO1xyXG4gICAgICAgIGlmKHRoaXMubXlQYWNrYWdlLmFjdGl2ZSl7XHJcbiAgICAgICAgICAgIHRoaXMubXlQYWNrYWdlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBub3RpY2UobWVzc2FnZSxwb3MpeyAgLy/ov5vlhaXmiL/pl7TnmoTmj5DnpLrigJzmiL/pl7TmsqHmnInkuJzopb/vvIzmjIlx6YCA5Ye64oCdXHJcbiAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm1hcFwiKS5vcGFjaXR5ID0gMzA7XHJcbiAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikub3BhY2l0eSA9IDMwO1xyXG4gICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXkodGhpcy5vcGVuRG9vcixmYWxzZSwwLjMpO1xyXG4gICAgICAvLyB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgLy8gICBsZXQgbm90aWNlTGFiZWwgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTsgICAvL25vdGljZeaJk+eul+WKqOaAgeeUn+aIkOeahO+8jOiAjOS4jeaYr+WcqHRoaXMubm90aWNlTGFiZWzoioLngrnmm7TmlLlcclxuICAgICAgLy8gICAgICAgbm90aWNlTGFiZWwubm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKHRoaXMubm90aWNlTGFiZWwpXHJcbiAgICAgIC8vICAgY29uc29sZS5sb2cobm90aWNlTGFiZWwpXHJcbiAgICAgICAgdGhpcy5ub3RpY2VMYWJlbC5ub2RlLnNldFBvc2l0aW9uKHBvcyk7XHJcbiAgICAgICAgdGhpcy5ub3RpY2VMYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwub3ZlcmZsb3cgPSBjYy5MYWJlbC5PdmVyZmxvdy5SRVNJWkVfSEVJR0hUOy8v6Ieq6YCC5bqU6auY5bqm44CC5paH5a2X6LaK5aSa77yM5Lya5omp5bGV6auY5bqmXHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5fY29udGVudFNpemUud2lkdGggPSA4MDA7XHJcbiAgICAgIHRoaXMubm90aWNlTGFiZWwuc3RyaW5nID0gbWVzc2FnZStcIi4uLi4uLiAg5oyJJ3En6ZSu6YCA5Ye6XCI7XHJcbiAgICB9LFxyXG5cclxuICAgIG5vdGljZUV4aXQoKXsgICAvL+aMiXHplK7pgIDlh7rnmoTlpITnkIZcclxuICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMub3BlbkRvb3IsZmFsc2UsMC4zKTtcclxuICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibWFwXCIpLm9wYWNpdHkgPSAyNTU7XHJcbiAgICAgIC8vIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhlcm9cIikub3BhY2l0eSA9IDI1NTtcclxuICAgICAgLy8gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5MYWJlbCkuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMubm90aWNlTGFiZWwubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgIH0sXHJcblxyXG4gICAgb3BlbktuYXBzYWNrKCl7ICAgLy/miZPlvIDog4zljIVcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuICAgICAgICBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcIndlbGNvbWVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNoZWNrUG9pbnRcIikgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImFyY2hpdmVzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBsb2FkTmV3U2NlbmUoc2NlbmUscG9zKXsvL+WcqOi/memHjOWKoOS8oOmAgeeahOeJueaViCzpooTliqDovb3mlrDlnLDlm77vvIzoioLnnIFsb2FkaW5n5pe26Ze0XHJcbiAgICAgICAgY2MuZGlyZWN0b3IucHJlbG9hZFNjZW5lKHNjZW5lKTtcclxuICAgICAgICB2YXIgdGltZXIxPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoc2NlbmUpO1xyXG4gICAgICAgIH0sMzAwMCk7XHJcbiAgICAgICAgbGV0IGhlcm9jc05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmhjc19wcmUpO1xyXG4gICAgICAgIGhlcm9jc05vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGhlcm9jc05vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHtcclxuICAgIC8vIH0sXHJcbn0pO1xyXG4iXX0=