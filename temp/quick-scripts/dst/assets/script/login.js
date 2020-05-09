
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
  onLoad: function onLoad() {
    window.g_login = this;
    this.baseUrl = "http://47.104.80.127:8080/";
    cc.sys.localStorage.setItem("baseUrl", this.baseUrl);
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

        if (response.status == 0) {
          var data = response.data;
          console.log(data.id);
          cc.sys.localStorage.setItem("userId", data.id);
          cc.director.loadScene("archives");
        }
      }
    }.bind(this);

    xhr.open("GET", this.baseUrl + "user/login?userName=" + this.m_Account.string + "&userPassword=" + this.m_PassWord.string, true);
    xhr.send();
    this.hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2dpbi5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm1fQWNjb3VudCIsIkVkaXRCb3giLCJtX1Bhc3NXb3JkIiwib25Mb2FkIiwid2luZG93IiwiZ19sb2dpbiIsImJhc2VVcmwiLCJzeXMiLCJsb2NhbFN0b3JhZ2UiLCJzZXRJdGVtIiwic2hvdyIsIm5vZGUiLCJhY3RpdmUiLCJoaWRlIiwib25DbGlja0Nsb3NlIiwib25DbGlja1JlZ2lzdGVyIiwiZ193ZWxjb21lIiwic2hvd1JlZ2lzdGVyVmlldyIsIm9uQ2xpY2tMb2dpbiIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJpZCIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwiYmluZCIsIm9wZW4iLCJzdHJpbmciLCJzZW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsU0FBUyxFQUFDSixFQUFFLENBQUNLLE9BREw7QUFFUkMsSUFBQUEsVUFBVSxFQUFDTixFQUFFLENBQUNLO0FBRk4sR0FIUDtBQVFMRSxFQUFBQSxNQVJLLG9CQVFLO0FBQ05DLElBQUFBLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQixJQUFqQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSw0QkFBZjtBQUNBVixJQUFBQSxFQUFFLENBQUNXLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsU0FBNUIsRUFBc0MsS0FBS0gsT0FBM0M7QUFDSCxHQVpJO0FBY0xJLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLElBQUwsQ0FBVUMsTUFBVixHQUFtQixJQUFuQjtBQUNILEdBaEJJO0FBaUJMQyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLRixJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQW5CSTtBQW9CTEUsRUFBQUEsWUFBWSxFQUFDLHdCQUFVO0FBQ25CLFNBQUtELElBQUw7QUFDSCxHQXRCSTtBQXVCTEUsRUFBQUEsZUFBZSxFQUFDLDJCQUFVO0FBQ3RCQyxJQUFBQSxTQUFTLENBQUNDLGdCQUFWO0FBQ0gsR0F6Qkk7QUEwQkxDLEVBQUFBLFlBQVksRUFBQyx3QkFBVTtBQUVuQixRQUFJQyxHQUFHLEdBQUcsSUFBSUMsY0FBSixFQUFWOztBQUNBRCxJQUFBQSxHQUFHLENBQUNFLGtCQUFKLEdBQXlCLFlBQVk7QUFDakMsVUFBSUYsR0FBRyxDQUFDRyxVQUFKLElBQWtCLENBQWxCLElBQXdCSCxHQUFHLENBQUNJLE1BQUosSUFBYyxHQUFkLElBQXFCSixHQUFHLENBQUNJLE1BQUosR0FBYSxHQUE5RCxFQUFvRTtBQUNoRSxZQUFJQyxRQUFRLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXUCxHQUFHLENBQUNRLFlBQWYsQ0FBZjs7QUFDQSxZQUFHSCxRQUFRLENBQUNELE1BQVQsSUFBbUIsQ0FBdEIsRUFBd0I7QUFDcEIsY0FBSUssSUFBSSxHQUFHSixRQUFRLENBQUNJLElBQXBCO0FBQ0FDLFVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixJQUFJLENBQUNHLEVBQWpCO0FBQ0FuQyxVQUFBQSxFQUFFLENBQUNXLEdBQUgsQ0FBT0MsWUFBUCxDQUFvQkMsT0FBcEIsQ0FBNEIsUUFBNUIsRUFBcUNtQixJQUFJLENBQUNHLEVBQTFDO0FBQ0FuQyxVQUFBQSxFQUFFLENBQUNvQyxRQUFILENBQVlDLFNBQVosQ0FBc0IsVUFBdEI7QUFDSDtBQUNKO0FBQ0osS0FWd0IsQ0FVdkJDLElBVnVCLENBVWxCLElBVmtCLENBQXpCOztBQVdBZixJQUFBQSxHQUFHLENBQUNnQixJQUFKLENBQVMsS0FBVCxFQUFnQixLQUFLN0IsT0FBTCxHQUFhLHNCQUFiLEdBQW9DLEtBQUtOLFNBQUwsQ0FBZW9DLE1BQW5ELEdBQTBELGdCQUExRCxHQUEyRSxLQUFLbEMsVUFBTCxDQUFnQmtDLE1BQTNHLEVBQW1ILElBQW5IO0FBQ0FqQixJQUFBQSxHQUFHLENBQUNrQixJQUFKO0FBQ0EsU0FBS3hCLElBQUw7QUFDSDtBQTNDSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtX0FjY291bnQ6Y2MuRWRpdEJveCxcclxuICAgICAgICBtX1Bhc3NXb3JkOmNjLkVkaXRCb3gsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgd2luZG93LmdfbG9naW4gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzQ3LjEwNC44MC4xMjc6ODA4MC9cIjtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJiYXNlVXJsXCIsdGhpcy5iYXNlVXJsKTtcclxuICAgIH0sXHJcblxyXG4gICAgc2hvdzpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGhpZGU6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgb25DbGlja0Nsb3NlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5oaWRlKClcclxuICAgIH0sXHJcbiAgICBvbkNsaWNrUmVnaXN0ZXI6ZnVuY3Rpb24oKXtcclxuICAgICAgICBnX3dlbGNvbWUuc2hvd1JlZ2lzdGVyVmlldygpXHJcbiAgICB9LFxyXG4gICAgb25DbGlja0xvZ2luOmZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidXNlcklkXCIsZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwiYXJjaGl2ZXNcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LmJpbmQodGhpcyk7XHJcbiAgICAgICAgeGhyLm9wZW4oXCJHRVRcIiwgdGhpcy5iYXNlVXJsK1widXNlci9sb2dpbj91c2VyTmFtZT1cIit0aGlzLm1fQWNjb3VudC5zdHJpbmcrXCImdXNlclBhc3N3b3JkPVwiK3RoaXMubV9QYXNzV29yZC5zdHJpbmcsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgdGhpcy5oaWRlKClcclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=