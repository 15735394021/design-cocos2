
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/login.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f91ebuEjo5ClYx+dho9eYXa', 'login');
// script/login.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_Account: cc.EditBox,
    m_PassWord: cc.EditBox
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.g_login = this;
    this.baseUrl = "http://47.104.80.127:8080/";
  },
  show: function show() {
    this.node.active = true;
  },
  hide: function hide() {
    this.node.active = false;
  },
  onClickClose: function onClickClose() {
    this.hide();
  },
  onClickRegister: function onClickRegister() {
    g_welcome.showRegisterView();
  },
  onClickLogin: function onClickLogin() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);
        console.log(response);

        if (response.status == 0) {
          var data = response.data;
          console.log(response);
          cc.sys.localStorage.setItem("userId", data.id);
          cc.director.loadScene("archives");
        }
      }
    }.bind(this);

    xhr.open("GET", this.baseUrl + "user/login?userId=" + this.m_Account.string + "&userPassword=" + this.m_PassWord.string, true);
    xhr.send();
    console.log(this.baseUrl + "user/login?userId=" + this.m_Account.string + "&userPassword=" + this.m_PassWord.string);
    this.hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2dpbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fQWNjb3VudCIsIkVkaXRCb3giLCJtX1Bhc3NXb3JkIiwib25Mb2FkIiwid2luZG93IiwiZ19sb2dpbiIsImJhc2VVcmwiLCJzaG93Iiwibm9kZSIsImFjdGl2ZSIsImhpZGUiLCJvbkNsaWNrQ2xvc2UiLCJvbkNsaWNrUmVnaXN0ZXIiLCJnX3dlbGNvbWUiLCJzaG93UmVnaXN0ZXJWaWV3Iiwib25DbGlja0xvZ2luIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJjb25zb2xlIiwibG9nIiwiZGF0YSIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJpZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiYmluZCIsIm9wZW4iLCJzdHJpbmciLCJzZW5kIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxTQUFTLEVBQUNKLEVBQUUsQ0FBQ0ssT0FETDtBQUVSQyxJQUFBQSxVQUFVLEVBQUNOLEVBQUUsQ0FBQ0s7QUFGTixHQUhQO0FBUUw7QUFFQUUsRUFBQUEsTUFWSyxvQkFVSztBQUNOQyxJQUFBQSxNQUFNLENBQUNDLE9BQVAsR0FBaUIsSUFBakI7QUFDQSxTQUFLQyxPQUFMLEdBQWUsNEJBQWY7QUFDSCxHQWJJO0FBZUxDLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNILEdBakJJO0FBa0JMQyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLRixJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQXBCSTtBQXFCTEUsRUFBQUEsWUFBWSxFQUFDLHdCQUFVO0FBQ25CLFNBQUtELElBQUw7QUFDSCxHQXZCSTtBQXdCTEUsRUFBQUEsZUFBZSxFQUFDLDJCQUFVO0FBQ3RCQyxJQUFBQSxTQUFTLENBQUNDLGdCQUFWO0FBQ0gsR0ExQkk7QUEyQkxDLEVBQUFBLFlBQVksRUFBQyx3QkFBVTtBQUVuQixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWOztBQUNBRCxJQUFBQSxHQUFHLENBQUNFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsVUFBSUYsR0FBRyxDQUFDRyxVQUFKLElBQWtCLENBQWxCLElBQXdCSCxHQUFHLENBQUNJLE1BQUosSUFBYyxHQUFkLElBQXFCSixHQUFHLENBQUNJLE1BQUosR0FBYSxHQUE5RCxFQUFvRTtBQUNoRSxZQUFJQyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXUCxHQUFHLENBQUNRLFlBQWYsQ0FBZjtBQUNBQyxRQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUwsUUFBWjs7QUFDQSxZQUFHQSxRQUFRLENBQUNELE1BQVQsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDcEIsY0FBSU8sSUFBSSxHQUFHTixRQUFRLENBQUNNLElBQXBCO0FBQ0FGLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZTCxRQUFaO0FBQ0F6QixVQUFBQSxFQUFFLENBQUNnQyxHQUFILENBQU9DLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLFFBQTVCLEVBQXFDSCxJQUFJLENBQUNJLEVBQTFDO0FBQ0FuQyxVQUFBQSxFQUFFLENBQUNvQyxRQUFILENBQVlDLFNBQVosQ0FBc0IsVUFBdEI7QUFDSDtBQUNKO0FBQ0osS0FYd0IsQ0FXdkJDLElBWHVCLENBV2xCLElBWGtCLENBQXpCOztBQVlBbEIsSUFBQUEsR0FBRyxDQUFDbUIsSUFBSixDQUFTLEtBQVQsRUFBZ0IsS0FBSzdCLE9BQUwsR0FBYSxvQkFBYixHQUFrQyxLQUFLTixTQUFMLENBQWVvQyxNQUFqRCxHQUF3RCxnQkFBeEQsR0FBeUUsS0FBS2xDLFVBQUwsQ0FBZ0JrQyxNQUF6RyxFQUFpSCxJQUFqSDtBQUNBcEIsSUFBQUEsR0FBRyxDQUFDcUIsSUFBSjtBQUNBWixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxLQUFLcEIsT0FBTCxHQUFhLG9CQUFiLEdBQWtDLEtBQUtOLFNBQUwsQ0FBZW9DLE1BQWpELEdBQXdELGdCQUF4RCxHQUF5RSxLQUFLbEMsVUFBTCxDQUFnQmtDLE1BQXJHO0FBQ0EsU0FBSzFCLElBQUw7QUFDSCxHQTlDSTtBQStDTDRCLEVBQUFBLEtBL0NLLG1CQStDSSxDQUVSLENBakRJLENBa0RMOztBQWxESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtX0FjY291bnQ6Y2MuRWRpdEJveCxcclxuICAgICAgICBtX1Bhc3NXb3JkOmNjLkVkaXRCb3gsXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2luZG93LmdfbG9naW4gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzQ3LjEwNC44MC4xMjc6ODA4MC9cIjtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdzpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlXHJcbiAgICB9LFxyXG4gICAgaGlkZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIG9uQ2xpY2tDbG9zZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICB9LFxyXG4gICAgb25DbGlja1JlZ2lzdGVyOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgZ193ZWxjb21lLnNob3dSZWdpc3RlclZpZXcoKVxyXG4gICAgfSxcclxuICAgIG9uQ2xpY2tMb2dpbjpmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ1c2VySWRcIixkYXRhLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJhcmNoaXZlc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwrXCJ1c2VyL2xvZ2luP3VzZXJJZD1cIit0aGlzLm1fQWNjb3VudC5zdHJpbmcrXCImdXNlclBhc3N3b3JkPVwiK3RoaXMubV9QYXNzV29yZC5zdHJpbmcsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5iYXNlVXJsK1widXNlci9sb2dpbj91c2VySWQ9XCIrdGhpcy5tX0FjY291bnQuc3RyaW5nK1wiJnVzZXJQYXNzd29yZD1cIit0aGlzLm1fUGFzc1dvcmQuc3RyaW5nKVxyXG4gICAgICAgIHRoaXMuaGlkZSgpXHJcbiAgICB9LFxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==