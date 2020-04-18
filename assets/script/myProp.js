
cc.Class({
    extends: cc.Component,

    properties: {
        propName:null,
        num:null,
        addDefense:null, //防御
        addSpeed:null,  //移动
        addHurt:null    //伤害值
    },

    onLoad () {

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
            this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "确定装备该配件吗";
            this.node.getChildByName("used").active  = true;
        }, this);

        this.node.getChildByName("used").active = false;
        var self = this;
        cc.loader.loadRes(self.propName, cc.SpriteFrame, function (err, spriteFrame) {
            if(spriteFrame.length != 0){
                self.node.getChildByName("image").getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }
        });
        if(self.num != null){
            self.node.getChildByName("num").getComponent(cc.Label).string = self.num;
        }
        self.node.getChildByName("name").getComponent(cc.Label).string = self.propName;
        self.node.getChildByName("content").getComponent(cc.Label).string = "防御+:"+this.addDefense+"\n移动+:"+this.addSpeed+"\n伤害+:"+self.addHurt;
    },

    onDestroy(){
        cc.loader.releaseRes(this.drugName, cc.SpriteFrame); //图片资源释放
    },

    start () {

    },

    // update (dt) {},
});
