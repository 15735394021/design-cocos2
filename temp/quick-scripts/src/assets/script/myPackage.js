"use strict";
cc._RF.push(module, 'cf9b0MojWNGILhbCt5G+JQ4', 'myPackage');
// script/myPackage.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    myDrugsDetail: {
      type: cc.Prefab,
      "default": null
    },
    myPropDetail: {
      type: cc.Prefab,
      "default": null
    }
  },
  onLoad: function onLoad() {
    var myUrl = cc.sys.localStorage.getItem("baseUrl");
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);

        if (response.status == 0) {
          var data = response.data;
          console.log(data);
          this.drugs = data.drugs;
          this.prop = data.prop;
          var drug = this.node.getChildByName("ScrollView").getChildByName("myDrug").getChildByName("content");
          drug.height = 0;

          for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 3; j++) {
              var myDrugNode = cc.instantiate(this.myDrugsDetail);
              myDrugNode.setPosition(cc.v2(10 + 180 * j, -100 - 220 * i));

              if (i * 3 + (j + 1) <= this.drugs.length) {
                var myDrugJs = myDrugNode.getComponent("myDrug");
                myDrugJs.drugName = "touxiang";
                myDrugJs.num = this.drugs[i * 3 + j].drugsNum;
                myDrugJs.addHp = this.drugs[i * 3 + j].hpReply;
                myDrugJs.addMp = this.drugs[i * 3 + j].mpReply;
              }

              myDrugNode.parent = drug;
            }

            drug.height += 220;
          }

          var prop = this.node.getChildByName("ScrollView").getChildByName("myProp").getChildByName("content");
          prop.height = 0;

          for (var _i = 0; _i < 10; _i++) {
            for (var _j = 0; _j < 3; _j++) {
              var myPropNode = cc.instantiate(this.myPropDetail);
              myPropNode.setPosition(cc.v2(10 + 170 * _j, -100 - 220 * _i));

              if (_i * 3 + (_j + 1) <= this.prop.length) {
                var myPropJs = myPropNode.getComponent("myProp");
                myPropJs.propName = "touxiang";
                myPropJs.addSpeed = this.prop[_i * 3 + _j].addSpeed;
                myPropJs.addHurt = this.prop[_i * 3 + _j].addHurt;
                myPropJs.addDefense = this.prop[_i * 3 + _j].addDefense;
              }

              myPropNode.parent = prop;
            }

            prop.height += 220;
          }
        }
      }
    }.bind(this);

    xhr.open("GET", myUrl + "archives/beginGame?archivesId=" + cc.sys.localStorage.getItem("archivesId"), true);
    xhr.send();
  },
  closePackage: function closePackage() {
    this.hide();
  },
  hide: function hide() {
    this.node.active = false;
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();