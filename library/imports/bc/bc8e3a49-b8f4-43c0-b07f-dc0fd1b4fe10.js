"use strict";
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