
cc.Class({
    extends: cc.Component,

    properties: {
        drugName:null,
        num:null,
        addHp:null,
        addMp:null,
        drink_audio:{    //背景音乐
            type:cc.AudioClip,
            default:null
        },
    },

    onLoad () {
        if(this.drugName == null){
            this.drugName = "------";
        }
        if(this.num == null){
            this.num = 0;
        }
        if(this.addHp == null){
            this.addHp = "000";
        }
        if(this.addMp == null){
            this.addMp = "000";
        }

        //为每个结点绑定事件
        // 使用枚举类型来注册
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {  //鼠标移入
            this.node.getChildByName("ground").color = new cc.Color(100,100,100);
            this.node.scale = 1.2;
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) { //鼠标移出
            this.node.getChildByName("ground").color = new cc.Color(104,105,91,255);
            this.node.scale = 1;
            this.node.getChildByName("used").active = false;
        }, this);

        this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {  //鼠标点击
            if(this.num == 0){
                this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "该药品已经用完了";
            }
            this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "使用该药品吗？";
            this.node.getChildByName("used").active = true;
        }, this);

        this.node.getChildByName("used").active = false;
        var self = this;
        cc.loader.loadRes(self.drugName, cc.SpriteFrame, function (err, spriteFrame) {
            if(spriteFrame.length != 0){
                self.node.getChildByName("image").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
            self.node.getChildByName("num").getComponent(cc.Label).string = self.num;
            self.node.getChildByName("name").getComponent(cc.Label).string = self.drugName;
            self.node.getChildByName("content").getComponent(cc.Label).string = "hp+:"+this.addHp+"\nmp+:"+this.addMp;
    },

    onDestroy(){
        cc.loader.releaseRes(this.drugName, cc.SpriteFrame); //图片资源释放
    },
    useDrug(){
        if(this.num == 0){
            this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "该药品已经用完了";
            return;
        }
        if(heroModel.heroLife.getChildByName("bar").width == 300){
            this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "生命值不低于100时无法使用药品";
            return;
        }
      heroModel.addLife(this.addHp);
      this.num--;
        cc.audioEngine.play(this.drink_audio,false,0.3);
        this.node.getChildByName("num").getComponent(cc.Label).string = this.num;
    },


    // update (dt) {},
});
