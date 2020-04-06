const Input = {};
cc.Class({
    extends: cc.Component,

    properties: {
        mycamrea:{
            type:cc.Node,
            default:null,
        },
        groundJsNode:{
            type:cc.Node,
            default:null
        }
    },

    onLoad () {
        window.hero_go = this;
        this.groundJs = this.groundJsNode.getComponent("ground2");
        let _this = this;
        _this.rect = null;
        _this.fagPoint = null;
        //设置相机等属性，以及加入的map地图node
        // if(this.camrea == null){
        //
        // }
        // if(this.groundJsNode == null){
        //
        // }
        //人物的基本属性，速度，方向，重力
        this.playing = true;//是否正在游戏中还是在查看背包，查看别的信息时角色不能移动
        this.walk = false;
        this.kit = false;
        this._speed = 200;
        this._speed1 = 200;
        this._speed2 = 300;
        this._kiting = false;
        this.state = '';
        this.sp = cc.v2(0,0);  //角色当前移动的方向
        this.heroAnim = this.node.getComponent(cc.Animation);
        // let p = cc.director.getPhysicsManager();    //得到物理组件
        // p.enabled = true;  //启用物理引擎
        // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
        // cc.director.getCollisionManager().enabled = true; //检测碰撞
        // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示
        // p.gravity = cc.v2(0,0);    //关闭重力

        //注册事件监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down,this);//向系统注册键盘按下事件
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.on_key_up,this);//向系统注册键盘抬起事件
        
    },

    onCollisionEnter:function(other , self){ //碰撞开始
        if(other.tag == 1001){
            other.node.gotoAndStop(other.node.currentFrame==1?5:1);
            this.groundJs.setYMovieClipFrame(this.groundJs.getTag("a1001"),other.node.currentFrame,false);//setYMovieClipFrame方法是播放制定动画的帧，第一个参数为动画标记，第二个是帧数，第三个是是播放还是跳到该帧就停止
        }
        if(other.tag == 2001){
            this.groundJs.getLayerNodeFun("house").parent = this.groundJsNode;
            this.node.parent = this.groundJs.getLayerNodeFun("hero");
            this.groundJs.getLayerNodeFun("map").parent = null;
            this.groundJs.getLayerNodeFun("ground").parent = null;
        }
        if(other.tag == 300){
            this.playing = false;
            game.notice("房间里什么都没有!!去别的房子看看吧",this.node.x,this.node.y);
        }
        if(other.tag == 501){
            console.log("跨越第一个地图")
        }
    },
    onCollisionStay: function (other, self) {  //碰撞持续
        
    },

    kit_end(){
        this._kiting = false;
        this.heroAnim.play(this.state);d
    },

    setState(state){
        if(this.state == state)return;
            this.state = state;
        if(this._kiting)return;
        this.heroAnim.play(this.state);
    },

    hero_stop(){
        this.heroAnim.stop(this.state);
    },
    on_key_down(e){           //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79  shift:16   l:76   空格：32  q:81
        Input[e.keyCode]=1;
        if(e.keyCode == 76){
            this._speed = this._speed2;
        }
        if(e.keyCode == 81){
            game.noticeExit();
            this.playing = true;
        }
    },
    on_key_up(e){        //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79
        Input[e.keyCode]=0;
        this.state = '';
        switch(e.keyCode){
            case 87:  //上
                this.hero_stop();
                break;
            case 65:  //左
                this.hero_stop();
                break;
            case 68:   //右
                this.hero_stop();
                break;
            case 83:   //下
                this.hero_stop();
                break;
            case 76:
                this._speed = this._speed1;
                break;
        }
    },

    start () {

    },

    update (dt) {
        if(this.playing){
            if(Input[cc.macro.KEY.d]){
                this.sp.x = 1;
            }else if(Input[cc.macro.KEY.a]){
                this.sp.x = -1;
            }else{
                this.sp.x = 0;
            }
            if(Input[cc.macro.KEY.w]){
                this.sp.y = 1;
            }else if(Input[cc.macro.KEY.s]){
                this.sp.y = -1;
            }else{
                this.sp.y = 0;
            }

            this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

            if(this.sp.x){
                this.lv.y = 0;
                this.lv.x = this.sp.x * this._speed;
            }else if(this.sp.y){
                this.lv.x = 0;
                this.lv.y = this.sp.y * this._speed;
            }else{
                this.lv.y = 0;
                this.lv.x = 0;
            }
            this.node.getComponent(cc.RigidBody).linearVelocity = this.lv;
            let state = '';
            if(this.sp.x == 1){
                state = "hero_right";
            }else if(this.sp.x == -1){
                state = "hero_left";
            }else if(this.sp.y == 1){
                state = "hero_up";
            }else if(this.sp.y == -1){
                state = "hero_down";
            }
            if(state){
                this.setState(state);
            }
            if(state && Input[cc.macro.KEY.j]){
                if(!this._kiting){
                    this._kiting = true;
                    this.heroAnim.play(this.state+"_kit");
                    this.state = '';
                }
            }
        }

        if(this.mycamrea !== null){
            this.mycamrea.x = this.node.x;
            this.mycamrea.y = this.node.y;
            if(this.fagPonint != null && this.rect != null){
                // console.log(this.fagPonint);
                // this.fagPonint.x = this.node.x;
                // this.fagPonint.y = this.node.y;
                // this.rect.x = this.node.x;
                // this.rect.y = this.node.y;
            }
        }

    },
});
