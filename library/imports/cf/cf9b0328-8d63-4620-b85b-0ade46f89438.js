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
    var myUrl = game.baseUrl;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);

        if (response.status == 0) {
          var data = response.data;
          this.drugs = data.drugs;
          this.prop = data.prop;
          this.node.getChildByName("myDrug").getChildByName("content").height = 0;

          for (var i = 0; i < Math.ceil(this.drugs.length / 3); i++) {
            for (var j = 0; j < 3; j++) {
              var myDrugNode = cc.instantiate(this.myDrugsDetail);
              var myDrugJs = myDrugNode.getComponent("myDrug");
              myDrugJs.drugName = "touxiang";
              myDrugJs.num = this.drugs[(i + 1) * j].drugsNum;
              myDrugJs.addHp = this.drugs[(i + 1) * j].hpReply;
              myDrugJs.addMp = this.drugs[(i + 1) * j].mpReply;
              myDrugNode.parent = this.node.getChildByName("myDrug").getChildByName("content");
              myDrugNode.setPosition(cc.v2(10 + 180 * j, -100 - 200 * i));
            }

            this.node.getChildByName("myDrug").getChildByName("content").height += 200;
          }

          this.node.getChildByName("myProp").getChildByName("content").height = 0;

          for (var _i = 0; _i < Math.ceil(this.prop.length / 3); _i++) {
            for (var _j = 0; _j < 3; _j++) {
              var myPropNode = cc.instantiate(this.myPropDetail);
              var myPropJs = myPropNode.getComponent("myProp");
              myPropJs.propName = "touxiang";
              myPropJs.addSpeed = this.prop[(_i + 1) * _j].addSpeed;
              myPropJs.addHurt = this.prop[(_i + 1) * _j].addHurt;
              myPropJs.addDefense = this.prop[(_i + 1) * _j].addDefense;
              myPropNode.parent = this.node.getChildByName("myProp").getChildByName("content");
              myPropNode.setPosition(cc.v2(10 + 170 * _j, -100 - 200 * _i));
            }

            this.node.getChildByName("myProp").getChildByName("content").height += 200;
          }
        }
      }
    }.bind(this);

    xhr.open("GET", myUrl + "archives/beginGame?archivesId=1", true);
    xhr.send();
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();