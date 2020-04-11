cc.Class({
    extends: cc.Component,

    properties: {
        myDrugsDetail:{
            type:cc.Prefab,
            default:null
        },
        myPropDetail:{
            type:cc.Prefab,
            default:null
        }
    },

    onLoad () {
        this.node.getChildByName("myDrug").getChildByName("content").height = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let myDrugNode = cc.instantiate(this.myDrugsDetail);
                let myDrugJs = myDrugNode.getComponent("myDrug");
                myDrugJs.drugName = "touxiang";
                myDrugNode.parent = this.node.getChildByName("myDrug").getChildByName("content");
                myDrugNode.setPosition(cc.v2(10 + 180*j,-100 - 200*i));
            }
            this.node.getChildByName("myDrug").getChildByName("content").height += 200;
        }

        this.node.getChildByName("myProp").getChildByName("content").height = 0;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 3; j++) {
                let myPropNode = cc.instantiate(this.myPropDetail);
                let myPropJs = myPropNode.getComponent("myProp");
                myPropJs.propName = "touxiang";
                myPropNode.parent = this.node.getChildByName("myProp").getChildByName("content");
                myPropNode.setPosition(cc.v2(10 +180*j,-100 - 200*i));
            }
            this.node.getChildByName("myProp").getChildByName("content").height += 200;
        }
    },

    start () {

    },

    // update (dt) {},
});
