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