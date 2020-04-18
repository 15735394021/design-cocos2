"use strict";
cc._RF.push(module, '835d1dI699LlrgSrNQRk/Eg', 'heroModel');
// script/heroModel.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    heroGrade: {
      //等级
      type: cc.Node,
      "default": null
    },
    heroExperience: {
      //经验值
      type: cc.Node,
      "default": null
    },
    heroLife: {
      //生命值
      type: cc.Node,
      "default": null
    },
    heroGold: {
      //金币
      type: cc.Node,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.baseUrl = "http://47.104.80.127:8080/";
    this.queryHeroDetail();
  },
  queryHeroDetail: function queryHeroDetail() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);

        if (response.status == 0) {
          var data = response.data[0];
          this.addExperience();
          this.heroGold.getComponent(cc.Label).string = data.userGold;
        }
      }
    }.bind(this);

    xhr.open("GET", this.baseUrl + "archives/queryArchives?userId=1", true);
    xhr.send();
  },
  addGrade: function addGrade() {
    //增加等级
    var grade = parseInt(this.heroGrade.getComponent(cc.Label).string);
    this.heroGrade.getComponent(cc.Label).string = grade + 1;
  },
  addExperience: function addExperience(num) {
    //增加经验值
    var totol = this.heroExperience.getChildByName("bar").width;
    totol += num;

    if (totol < this.heroExperience.getComponent(cc.ProgressBar).totalLength) {
      this.heroExperience.getChildByName("bar").width = totol;
    } else {
      this.addGrade();
      this.heroExperience.getChildByName("bar").width = totol / 300;
    }
  },
  addLife: function addLife(num) {
    var life = this.heroLife.getChildByName("bar").width;
    life += num;

    if (life < this.heroLife.getComponent(cc.ProgressBar).totalLength) {
      this.heroLife.getChildByName("bat").widht = life;
    } else {
      this.heroLife.getChildByName("bat").widht = 300;
    }
  },
  addGold: function addGold(num) {
    //增加金币
    var gold = parseInt(this.heroGold.getComponent(cc.Label).string);
    this.heroGold.getComponent(cc.Label).string = gold + num;
  },
  useGold: function useGold(num) {
    //使用金币，减少
    var gold = parseInt(this.heroGold.getComponent(cc.Label).string);
    this.heroGold.getComponent(cc.Label).string = gold - num;
  },
  start: function start() {},
  update: function update(dt) {}
});

cc._RF.pop();