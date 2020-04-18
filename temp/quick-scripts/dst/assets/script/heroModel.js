
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/heroModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxoZXJvTW9kZWwuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJoZXJvR3JhZGUiLCJ0eXBlIiwiTm9kZSIsImhlcm9FeHBlcmllbmNlIiwiaGVyb0xpZmUiLCJoZXJvR29sZCIsIm9uTG9hZCIsImJhc2VVcmwiLCJxdWVyeUhlcm9EZXRhaWwiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJyZXNwb25zZSIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsImRhdGEiLCJhZGRFeHBlcmllbmNlIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJ1c2VyR29sZCIsImJpbmQiLCJvcGVuIiwic2VuZCIsImFkZEdyYWRlIiwiZ3JhZGUiLCJwYXJzZUludCIsIm51bSIsInRvdG9sIiwiZ2V0Q2hpbGRCeU5hbWUiLCJ3aWR0aCIsIlByb2dyZXNzQmFyIiwidG90YWxMZW5ndGgiLCJhZGRMaWZlIiwibGlmZSIsIndpZGh0IiwiYWRkR29sZCIsImdvbGQiLCJ1c2VHb2xkIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFNBQVMsRUFBQztBQUFDO0FBQ1BDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTSxJQURGO0FBRU4saUJBQVE7QUFGRixLQURGO0FBS1JDLElBQUFBLGNBQWMsRUFBQztBQUFDO0FBQ1pGLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTSxJQURHO0FBRVgsaUJBQVE7QUFGRyxLQUxQO0FBU1JFLElBQUFBLFFBQVEsRUFBQztBQUFDO0FBQ05ILE1BQUFBLElBQUksRUFBQ0ws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NkIsS0FBN0IsRUFBb0NNLEtBQXBDLEdBQTRDRCxJQUE1QztBQUNILEtBRkQsTUFFSztBQUNELFdBQUtqQyxRQUFMLENBQWM0QixjQUFkLENBQTZCLEtBQTdCLEVBQW9DTSxLQUFwQyxHQUE0QyxHQUE1QztBQUNIO0FBQ0osR0FuRUk7QUFxRUxDLEVBQUFBLE9BckVLLG1CQXFFR1QsR0FyRUgsRUFxRU87QUFBQztBQUNULFFBQUlVLElBQUksR0FBR1gsUUFBUSxDQUFDLEtBQUt4QixRQUFMLENBQWNlLFlBQWQsQ0FBMkJ4QixFQUFFLENBQUN5QixLQUE5QixFQUFxQ0MsTUFBdEMsQ0FBbkI7QUFDQSxTQUFLakIsUUFBTCxDQUFjZSxZQUFkLENBQTJCeEIsRUFBRSxDQUFDeUIsS0FBOUIsRUFBcUNDLE1BQXJDLEdBQThDa0IsSUFBSSxHQUFDVixHQUFuRDtBQUNILEdBeEVJO0FBMEVMVyxFQUFBQSxPQTFFSyxtQkEwRUdYLEdBMUVILEVBMEVPO0FBQUM7QUFDVCxRQUFJVSxJQUFJLEdBQUdYLFFBQVEsQ0FBQyxLQUFLeEIsUUFBTCxDQUFjZSxZQUFkLENBQTJCeEIsRUFBRSxDQUFDeUIsS0FBOUIsRUFBcUNDLE1BQXRDLENBQW5CO0FBQ0EsU0FBS2pCLFFBQUwsQ0FBY2UsWUFBZCxDQUEyQnhCLEVBQUUsQ0FBQ3lCLEtBQTlCLEVBQXFDQyxNQUFyQyxHQUE4Q2tCLElBQUksR0FBQ1YsR0FBbkQ7QUFDSCxHQTdFSTtBQStFTFksRUFBQUEsS0EvRUssbUJBK0VJLENBRVIsQ0FqRkk7QUFtRkxDLEVBQUFBLE1BbkZLLGtCQW1GR0MsRUFuRkgsRUFtRk8sQ0FFWDtBQXJGSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGhlcm9HcmFkZTp7Ly/nrYnnuqdcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGhlcm9FeHBlcmllbmNlOnsvL+e7j+mqjOWAvFxyXG4gICAgICAgICAgICB0eXBlOmNjLk5vZGUsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaGVyb0xpZmU6ey8v55Sf5ZG95YC8XHJcbiAgICAgICAgICAgIHR5cGU6Y2MuTm9kZSxcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBoZXJvR29sZDp7Ly/ph5HluIFcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cDovLzQ3LjEwNC44MC4xMjc6ODA4MC9cIjtcclxuICAgICAgICB0aGlzLnF1ZXJ5SGVyb0RldGFpbCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBxdWVyeUhlcm9EZXRhaWwoKXtcclxuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQgJiYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3RhdHVzID09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhID0gcmVzcG9uc2UuZGF0YVswXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEV4cGVyaWVuY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlcm9Hb2xkLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID1kYXRhLnVzZXJHb2xkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCtcImFyY2hpdmVzL3F1ZXJ5QXJjaGl2ZXM/dXNlcklkPTFcIiwgdHJ1ZSk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0sXHJcblxyXG4gICAgYWRkR3JhZGUoKXsvL+WinuWKoOetiee6p1xyXG4gICAgICAgIGxldCBncmFkZSA9IHBhcnNlSW50KHRoaXMuaGVyb0dyYWRlLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nKTtcclxuICAgICAgICB0aGlzLmhlcm9HcmFkZS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdyYWRlKzE7XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZEV4cGVyaWVuY2UobnVtKXsvL+WinuWKoOe7j+mqjOWAvFxyXG4gICAgICAgIGxldCB0b3RvbCA9IHRoaXMuaGVyb0V4cGVyaWVuY2UuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIikud2lkdGg7XHJcbiAgICAgICAgdG90b2wgKz0gbnVtO1xyXG4gICAgICAgIGlmKHRvdG9sIDwgdGhpcy5oZXJvRXhwZXJpZW5jZS5nZXRDb21wb25lbnQoY2MuUHJvZ3Jlc3NCYXIpLnRvdGFsTGVuZ3RoKXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvRXhwZXJpZW5jZS5nZXRDaGlsZEJ5TmFtZShcImJhclwiKS53aWR0aCA9IHRvdG9sO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICB0aGlzLmFkZEdyYWRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuaGVyb0V4cGVyaWVuY2UuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIikud2lkdGggPSB0b3RvbC8zMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBhZGRMaWZlKG51bSl7XHJcbiAgICAgICAgbGV0IGxpZmUgPSB0aGlzLmhlcm9MaWZlLmdldENoaWxkQnlOYW1lKFwiYmFyXCIpLndpZHRoO1xyXG4gICAgICAgIGxpZmUgKz0gbnVtO1xyXG4gICAgICAgIGlmKGxpZmUgPCB0aGlzLmhlcm9MaWZlLmdldENvbXBvbmVudChjYy5Qcm9ncmVzc0JhcikudG90YWxMZW5ndGgpe1xyXG4gICAgICAgICAgICB0aGlzLmhlcm9MaWZlLmdldENoaWxkQnlOYW1lKFwiYmF0XCIpLndpZGh0ID0gbGlmZTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5oZXJvTGlmZS5nZXRDaGlsZEJ5TmFtZShcImJhdFwiKS53aWRodCA9IDMwMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGFkZEdvbGQobnVtKXsvL+WinuWKoOmHkeW4gVxyXG4gICAgICAgIGxldCBnb2xkID0gcGFyc2VJbnQodGhpcy5oZXJvR29sZC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyk7XHJcbiAgICAgICAgdGhpcy5oZXJvR29sZC5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IGdvbGQrbnVtO1xyXG4gICAgfSxcclxuXHJcbiAgICB1c2VHb2xkKG51bSl7Ly/kvb/nlKjph5HluIHvvIzlh4/lsJFcclxuICAgICAgICBsZXQgZ29sZCA9IHBhcnNlSW50KHRoaXMuaGVyb0dvbGQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcpO1xyXG4gICAgICAgIHRoaXMuaGVyb0dvbGQuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBnb2xkLW51bTtcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG5cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=