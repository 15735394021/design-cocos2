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
        let myUrl = cc.sys.localStorage.getItem("baseUrl");
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.status == 0){
                    let data = response.data;
                    console.log(data)
                    this.drugs = data.drugs;
                    this.prop = data.prop;
                    let drug = this.node.getChildByName("ScrollView").getChildByName("myDrug").getChildByName("content");
                    drug.height = 0;
                    for (let i = 0; i < 10; i++) {
                        for (let j = 0; j < 3; j++) {
                            let myDrugNode = cc.instantiate(this.myDrugsDetail);
                            myDrugNode.setPosition(cc.v2(10 + 180*j,-100 - 220*i));
                            if(i*3+(j+1) <= this.drugs.length){
                                let myDrugJs = myDrugNode.getComponent("myDrug");
                                myDrugJs.drugName = "touxiang";
                                myDrugJs.num = this.drugs[i*3+j].drugsNum;
                                myDrugJs.addHp = this.drugs[i*3+j].hpReply;
                                myDrugJs.addMp = this.drugs[i*3+j].mpReply;
                            }
                            myDrugNode.parent = drug;
                        }
                        drug.height += 220;
                    }
                    let prop = this.node.getChildByName("ScrollView").getChildByName("myProp").getChildByName("content");
                    prop.height = 0;
                    for (let i = 0; i < 10; i++) {
                        for (let j = 0; j < 3; j++) {
                            let myPropNode = cc.instantiate(this.myPropDetail);
                            myPropNode.setPosition(cc.v2(10 +170*j,-100 - 220*i));
                            if(i*3+(j+1) <= this.prop.length){
                                let myPropJs = myPropNode.getComponent("myProp");
                                myPropJs.propName = "touxiang";
                                myPropJs.addSpeed = this.prop[i*3+j].addSpeed;
                                myPropJs.addHurt = this.prop[i*3+j].addHurt;
                                myPropJs.addDefense = this.prop[i*3+j].addDefense;
                            }
                            myPropNode.parent = prop;
                        }
                        prop.height += 220;
                    }

                }
            }
        }.bind(this);
        xhr.open("GET", myUrl+"archives/beginGame?archivesId="+cc.sys.localStorage.getItem("archivesId"), true);
        xhr.send();


    },
    closePackage(){
        this.hide();
    },
    hide:function(){
        this.node.active = false;
    },

    start () {

    },

    // update (dt) {},
});
