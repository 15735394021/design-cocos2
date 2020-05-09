
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/welcome.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'bc8e3pJuPRDwLB/3A/RtP4Q', 'welcome');
// script/welcome.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_BackGround: cc.Node,
    m_LoadingPrefab: cc.Prefab,
    m_RegisterPrefab: cc.Prefab,
    m_Logo: cc.Node,
    m_LoginBg: cc.Node,
    m_AccountLoginPrefab: cc.Prefab,
    m_LoginButton: [cc.Node]
  },
  onLoad: function onLoad() {
    window.g_welcome = this;
    this.m_Loading = cc.instantiate(this.m_LoadingPrefab);
    this.m_BackGround.addChild(this.m_Loading);
    this.m_Loading.y = -290;
    this.m_Loading = this.m_Loading.getComponent('loading');
    this.m_Loading.setProgress(1);
    var self = this;

    this.m_Loading.finishCallBack = function () {
      this.m_Loading.node.active = false;
      self.m_Logo.active = false;
      this.m_LoginBg.active = true;
    }.bind(this);
  },
  onClickLoginType: function onClickLoginType(target, data) {
    if (data == 'zh') {
      if (this.m_AccountLogin == null) {
        this.m_AccountLogin = cc.instantiate(this.m_AccountLoginPrefab);
        this.node.addChild(this.m_AccountLogin);
        this.m_AccountLogin = this.m_AccountLogin.getComponent('login');
      }

      this.m_AccountLogin.show();
    } else if (data == 'wx') {} else if (data == 'yk') {}
  },
  showRegisterView: function showRegisterView() {
    this.node.emit('open_register', '打开注册界面');

    if (this.m_RegisterView == null) {
      this.m_RegisterView = cc.instantiate(this.m_RegisterPrefab);
      this.node.addChild(this.m_RegisterView);
      this.m_RegisterView = this.m_RegisterView.getComponent('register');
    }

    this.m_RegisterView.show();
  },
  onText: function onText() {
    this.m_LoginButton[0].zIndex = 100;
  },
  start: function start() {
    if (cc.sys.localStorage.getItem("checkPoint") != null && cc.sys.localStorage.getItem("userId") != null && cc.sys.localStorage.getItem("archivesId") != null) {
      cc.director.loadScene("game" + cc.sys.localStorage.getItem("checkPoint"));
    } // if(cc.sys.localStorage.getItem("userId") != null){
    //     cc.director.loadScene("archives");
    // }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFx3ZWxjb21lLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9CYWNrR3JvdW5kIiwiTm9kZSIsIm1fTG9hZGluZ1ByZWZhYiIsIlByZWZhYiIsIm1fUmVnaXN0ZXJQcmVmYWIiLCJtX0xvZ28iLCJtX0xvZ2luQmciLCJtX0FjY291bnRMb2dpblByZWZhYiIsIm1fTG9naW5CdXR0b24iLCJvbkxvYWQiLCJ3aW5kb3ciLCJnX3dlbGNvbWUiLCJtX0xvYWRpbmciLCJpbnN0YW50aWF0ZSIsImFkZENoaWxkIiwieSIsImdldENvbXBvbmVudCIsInNldFByb2dyZXNzIiwic2VsZiIsImZpbmlzaENhbGxCYWNrIiwibm9kZSIsImFjdGl2ZSIsImJpbmQiLCJvbkNsaWNrTG9naW5UeXBlIiwidGFyZ2V0IiwiZGF0YSIsIm1fQWNjb3VudExvZ2luIiwic2hvdyIsInNob3dSZWdpc3RlclZpZXciLCJlbWl0IiwibV9SZWdpc3RlclZpZXciLCJvblRleHQiLCJ6SW5kZXgiLCJzdGFydCIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInVwZGF0ZSIsImR0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsWUFBWSxFQUFDSixFQUFFLENBQUNLLElBRFI7QUFFUkMsSUFBQUEsZUFBZSxFQUFDTixFQUFFLENBQUNPLE1BRlg7QUFHUkMsSUFBQUEsZ0JBQWdCLEVBQUNSLEVBQUUsQ0FBQ08sTUFIWjtBQUlSRSxJQUFBQSxNQUFNLEVBQUNULEVBQUUsQ0FBQ0ssSUFKRjtBQUtSSyxJQUFBQSxTQUFTLEVBQUNWLEVBQUUsQ0FBQ0ssSUFMTDtBQU1STSxJQUFBQSxvQkFBb0IsRUFBQ1gs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RUFBRSxDQUFDeUMsUUFBSCxDQUFZQyxTQUFaLENBQXNCLFNBQU8xQyxFQUFFLENBQUNzQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFlBQTVCLENBQTdCO0FBQ0gsS0FIQSxDQUlEO0FBQ0E7QUFDQTs7QUFDSCxHQS9ESTtBQWlFTEcsRUFBQUEsTUFqRUssa0JBaUVHQyxFQWpFSCxFQWlFTyxDQUVYO0FBbkVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1fQmFja0dyb3VuZDpjYy5Ob2RlLFxyXG4gICAgICAgIG1fTG9hZGluZ1ByZWZhYjpjYy5QcmVmYWIsXHJcbiAgICAgICAgbV9SZWdpc3RlclByZWZhYjpjYy5QcmVmYWIsXHJcbiAgICAgICAgbV9Mb2dvOmNjLk5vZGUsXHJcbiAgICAgICAgbV9Mb2dpbkJnOmNjLk5vZGUsXHJcbiAgICAgICAgbV9BY2NvdW50TG9naW5QcmVmYWI6Y2MuUHJlZmFiLFxyXG4gICAgICAgIG1fTG9naW5CdXR0b246W2NjLk5vZGVdLFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG5cclxuICAgICAgICB3aW5kb3cuZ193ZWxjb21lID0gdGhpc1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nID0gY2MuaW5zdGFudGlhdGUodGhpcy5tX0xvYWRpbmdQcmVmYWIpXHJcbiAgICAgICAgdGhpcy5tX0JhY2tHcm91bmQuYWRkQ2hpbGQodGhpcy5tX0xvYWRpbmcpXHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmcueSA9IC0yOTBcclxuICAgICAgICB0aGlzLm1fTG9hZGluZyA9IHRoaXMubV9Mb2FkaW5nLmdldENvbXBvbmVudCgnbG9hZGluZycpO1xyXG4gICAgICAgIHRoaXMubV9Mb2FkaW5nLnNldFByb2dyZXNzKDEpXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzXHJcbiAgICAgICAgdGhpcy5tX0xvYWRpbmcuZmluaXNoQ2FsbEJhY2sgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0aGlzLm1fTG9hZGluZy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzZWxmLm1fTG9nby5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5tX0xvZ2luQmcuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9LmJpbmQodGhpcylcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIG9uQ2xpY2tMb2dpblR5cGU6ZnVuY3Rpb24odGFyZ2V0LGRhdGEpe1xyXG4gICAgICAgIGlmICggZGF0YSA9PSAnemgnICl7XHJcbiAgICAgICAgICAgIGlmKCB0aGlzLm1fQWNjb3VudExvZ2luID09IG51bGwgKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9BY2NvdW50TG9naW4gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1fQWNjb3VudExvZ2luUHJlZmFiKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKHRoaXMubV9BY2NvdW50TG9naW4pXHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fQWNjb3VudExvZ2luID0gdGhpcy5tX0FjY291bnRMb2dpbi5nZXRDb21wb25lbnQoJ2xvZ2luJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1fQWNjb3VudExvZ2luLnNob3coKVxyXG4gICAgICAgIH1lbHNlIGlmKCBkYXRhID09ICd3eCcgKXtcclxuXHJcbiAgICAgICAgfWVsc2UgaWYoIGRhdGEgPT0gJ3lrJyApe1xyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2hvd1JlZ2lzdGVyVmlldzpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCdvcGVuX3JlZ2lzdGVyJywn5omT5byA5rOo5YaM55WM6Z2iJyk7XHJcbiAgICAgICAgaWYoIHRoaXMubV9SZWdpc3RlclZpZXcgPT0gbnVsbCApe1xyXG4gICAgICAgICAgICB0aGlzLm1fUmVnaXN0ZXJWaWV3ID0gY2MuaW5zdGFudGlhdGUodGhpcy5tX1JlZ2lzdGVyUHJlZmFiKVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQodGhpcy5tX1JlZ2lzdGVyVmlldylcclxuICAgICAgICAgICAgdGhpcy5tX1JlZ2lzdGVyVmlldyA9IHRoaXMubV9SZWdpc3RlclZpZXcuZ2V0Q29tcG9uZW50KCdyZWdpc3RlcicpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9SZWdpc3RlclZpZXcuc2hvdygpXHJcbiAgICB9LFxyXG4gICAgb25UZXh0OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5tX0xvZ2luQnV0dG9uWzBdLnpJbmRleCA9IDEwMDtcclxuICAgIH0sXHJcbnN0YXJ0ICgpIHtcclxuICAgICAgICBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJjaGVja1BvaW50XCIpICE9IG51bGwgJiYgY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwidXNlcklkXCIpICE9IG51bGwgJiYgY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiYXJjaGl2ZXNJZFwiKSAhPSBudWxsKXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiZ2FtZVwiK2NjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImNoZWNrUG9pbnRcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBpZihjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIikgIT0gbnVsbCl7XHJcbiAgICAgICAgLy8gICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZShcImFyY2hpdmVzXCIpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=