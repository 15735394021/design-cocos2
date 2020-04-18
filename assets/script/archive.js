cc.Class({
    extends: cc.Component,

    properties: {
        createTime:null,
        archivesName:null,
        grade:null,
        experience:null,
        gold:null,
        describe:null,
        checkPoint:null,
        enterAudio:{    //鼠标移入的音效
            type:cc.AudioClip,
            default:null
        },
    },

    onLoad () {
        //为节点注册事件
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {  //鼠标移入
            this.node.getChildByName("bg").color = new cc.Color(100,100,100);
            this.node.scale = 1.2;
            cc.audioEngine.play(this.enterAudio,false,0.3);
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) { //鼠标移出
            this.node.getChildByName("bg").color = new cc.Color(100,93,11,255);
            this.node.scale = 1;
            cc.audioEngine.stop(this.enterAudio);
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {  //鼠标点击,开始该档案的剧情，进入游戏场景
            console.log(this.checkPoint)
            cc.director.loadScene("game1");
        }, this);

        var self = this;
        if(self.createTime){
            self.node.getChildByName("createTime").getComponent(cc.Label).string = self.createTime;
        }
        if(self.archivesName){
            self.node.getChildByName("name").getComponent(cc.Label).string = self.archivesName;
        }
        if(self.grade){
            self.node.getChildByName("grade").getComponent(cc.Label).string = "等级:"+self.grade;
        }
        if(self.experience){
            self.node.getChildByName("experience").getComponent(cc.Label).string = "经验:"+self.experience;
        }
        if(self.gold){
            self.node.getChildByName("gold").getComponent(cc.Label).string = "金币:"+self.gold;
        }
        if(self.describe){
            self.node.getChildByName("describe").getComponent(cc.Label).string = "描述:"+self.describe;
        }
    },

    start () {

    },

    // update (dt) {},
});
