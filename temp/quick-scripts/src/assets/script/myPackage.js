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
    this.node.getChildByName("myDrug").getChildByName("content").height = 0;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var myDrugNode = cc.instantiate(this.myDrugsDetail);
        var myDrugJs = myDrugNode.getComponent("myDrug");
        myDrugJs.drugName = "touxiang";
        myDrugNode.parent = this.node.getChildByName("myDrug").getChildByName("content");
        myDrugNode.setPosition(cc.v2(10 + 180 * j, -100 - 200 * i));
      }

      this.node.getChildByName("myDrug").getChildByName("content").height += 200;
    }

    this.node.getChildByName("myProp").getChildByName("content").height = 0;

    for (var _i = 0; _i < 4; _i++) {
      for (var _j = 0; _j < 3; _j++) {
        var myPropNode = cc.instantiate(this.myPropDetail);
        var myPropJs = myPropNode.getComponent("myProp");
        myPropJs.propName = "touxiang";
        myPropNode.parent = this.node.getChildByName("myProp").getChildByName("content");
        myPropNode.setPosition(cc.v2(10 + 180 * _j, -100 - 200 * _i));
      }

      this.node.getChildByName("myProp").getChildByName("content").height += 200;
    }
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();