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
        let myUrl = game.baseUrl;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.status == 0){
                    let data = response.data;
                    this.drugs = data.drugs;
                    this.prop = data.prop;

                    this.node.getChildByName("myDrug").getChildByName("content").height = 0;
                    for (let i = 0; i < Math.ceil(this.drugs.length/3); i++) {
                        for (let j = 0; j < 3; j++) {
                            let myDrugNode = cc.instantiate(this.myDrugsDetail);
                            let myDrugJs = myDrugNode.getComponent("myDrug");
                            myDrugJs.drugName = "touxiang";
                            myDrugJs.num = this.drugs[(i+1)*(j)].drugsNum;
                            myDrugJs.addHp = this.drugs[(i+1)*(j)].hpReply;
                            myDrugJs.addMp = this.drugs[(i+1)*(j)].mpReply;
                            myDrugNode.parent = this.node.getChildByName("myDrug").getChildByName("content");
                            myDrugNode.setPosition(cc.v2(10 + 180*j,-100 - 200*i));
                        }
                        this.node.getChildByName("myDrug").getChildByName("content").height += 200;
                    }

                    this.node.getChildByName("myProp").getChildByName("content").height = 0;
                    for (let i = 0; i < Math.ceil(this.prop.length/3); i++) {
                        for (let j = 0; j < 3; j++) {
                            let myPropNode = cc.instantiate(this.myPropDetail);
                            let myPropJs = myPropNode.getComponent("myProp");
                            myPropJs.propName = "touxiang";
                            myPropJs.addSpeed = this.prop[(i+1)*(j)].addSpeed;
                            myPropJs.addHurt = this.prop[(i+1)*(j)].addHurt;
                            myPropJs.addDefense = this.prop[(i+1)*(j)].addDefense;
                            myPropNode.parent = this.node.getChildByName("myProp").getChildByName("content");
                            myPropNode.setPosition(cc.v2(10 +170*j,-100 - 200*i));
                        }
                        this.node.getChildByName("myProp").getChildByName("content").height += 200;
                    }

                }
            }
        }.bind(this);
        xhr.open("GET", myUrl+"archives/beginGame?archivesId=1", true);
        xhr.send();


    },

    start () {

    },

    // update (dt) {},
});
