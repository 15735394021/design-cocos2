"use strict";
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