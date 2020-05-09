const Input = {};
const State = {
    stand:1,
    attack:2,
    noPlay:3
}
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
        },
        map:null,
        heroPos:null,
        kit_Audio:{
            type:cc.AudioClip,
            default:null
        }
    },

    onLoad () {
        window.heroGo = this;
        for(let i=0;i<Input.length;i++){
            Input[i] = 0;
        }
        let _this = this;
        _this.rect = null;
        //人物的基本属性，速度，方向，重力
        this.playing = true;//是否正在游戏中还是在查看背包，查看别的信息时角色不能移动
        this.walk = false;
        this.kit = false;
        this.jump = false;
        this._speed1 = 200;
        this._speed2 = 300;
        if(this.heroPos != null){
            this.node.setPosition(this.heroPos);
        }else{
            this.node.setPosition(cc.v2(0,0));//初始位置
        }
        this.heroState = State.stand;
        this.anima = "hero_idle";
        this._speed = 200;
        this.sp = cc.v2(0,0);  //角色当前移动的方向
        this.heroAnim = this.node.getComponent(cc.Animation);
        this.combo = 0;//是否处于连击状态

        //注册事件监听
        if(cc.director.getPhysicsManager().gravity.y == 0){//未开启重力的键盘监听，没有自由落体
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down,this);//向系统注册键盘按下事件
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.on_key_up,this);//向系统注册键盘抬起事件
        }else{//开启重力的键盘监听,有自由落体
            this.herobody = this.node.getComponent(cc.RigidBody);//把刚体保存下来
            this.input_control = 0;
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down_1,this);//向系统注册键盘按下事件
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.on_key_up_1,this);//向系统注册键盘抬起事件
        }

    },
    systemEventOff(){   //注销键盘监听事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down_1,this);//向系统注册键盘按下事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.on_key_up_1,this);//向系统注册键盘抬起事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.on_key_down,this);//向系统注册键盘按下事件
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.on_key_up,this);//向系统注册键盘抬起事件
    },


    kit_end(){
        this.heroState = State.stand;
        // this.combo = (this.combo + 1) % 3;
    },
    kit_start(){
        cc.audioEngine.play(this.kit_Audio,false,0.3);
    },

    setState(anima){
        if(this.anima == anima)return;
        this.anima = anima;
        this.heroAnim.play(this.anima);
    },

    on_player_jump(){//有自由落体时的跳跃
        this.jump = true;
        var v = this.node.getComponent(cc.RigidBody).linearVelocity;
        if(v.y == 0){
            this.jump = false;
        }
        if(this.jump){
            return;
        }
        if(this.input_control == -1){
            this.heroAnim.stop("hero_left");
        }else if(this.input_control == 1){
            this.heroAnim.stop("hero_right");
        }
        this.direction = 0;
        var v = this.node.getComponent(cc.RigidBody).linearVelocity;
        v.y = 800;
        this.node.getComponent(cc.RigidBody).linearVelocity = v;
    },

    on_player_walk(dir){//有自由落体时的行走
        var v = this.node.getComponent(cc.RigidBody).linearVelocity;
        v.x = (300 * dir);
        this.node.getComponent(cc.RigidBody).linearVelocity = v;
        if(this.direction == dir){
            return
        }
        this.direction = dir;
        if(dir == 1){
            this.heroAnim.play("hero_right");
        }else if(dir == -1){
            this.heroAnim.play("hero_left");
        }
    },
    on_player_stop(){//有自由落体时停止行走
        if(this.input_control == -1){
            this.heroAnim.stop("hero_left");
        }else if(this.input_control == 1){
            this.heroAnim.stop("hero_right");
        }
        this.input_control = 0;
        this.direction = 0;
    },
    on_key_down_1(e){
        switch(e.keyCode){
            case 87:
                this.on_player_jump();
                break;
            case 65:
                this.input_control = -1;
                break;
            case 68:
                this.input_control = 1;
                break;
            case 66:
                this.playing = !this.playing;
                game.openAndClosePackage(this.node.getPosition());
                break;
        }
    },
    on_key_up_1(e){
        switch(e.keyCode){
            case 65:
                this.on_player_stop();
                break;
            case 68:
                this.on_player_stop();
                break;
        }
    },

    on_key_down(e){           //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79  shift:16   l:76   空格：32  q:81   t:84
        Input[e.keyCode]=1;
        switch (e.keyCode) {
            case cc.macro.KEY.l:
                this._speed = this._speed2;
                break;
            case cc.macro.KEY.q:  //q
                game.noticeExit();
                this.heroState = State.stand;
                break;
            case cc.macro.KEY.b:   //打开或关闭背包
                this.heroState = this.heroState==State.stand?State.noPlay:State.stand;
                game.openAndClosePackage(this.mycamrea.getPosition());
                break;
            case cc.macro.KEY.t:   //关闭对话
                this.closeTalk();
                break;
        }
    },
    closeTalk(){
        if(cc.find("Canvas/ground/talk")){
            this.heroState = State.stand;
            cc.find("Canvas/ground/talk").destroy();
        }
    },
    on_key_up(e){        //w:87  s:83   a:65  d:68  j:74  k:75  l:76  u:85  i:73   o:79
        Input[e.keyCode]=0;
        switch(e.keyCode){
            case cc.macro.KEY.l:
                this._speed = this._speed1;
                break;
        }
    },

    start () {
        this.groundJs = this.groundJsNode.getComponent(this.map);
        this.groundJs.mapCameraNode = this.mycamrea;
        this.talkNum = 0;
    },

    update (dt) {
        if(this.playing){
            if(cc.director.getPhysicsManager().gravity.y == 0){
                let anima = this.anima;
                this.lv = this.node.getComponent(cc.RigidBody).linearVelocity;

                switch(this.heroState){
                    case State.stand:
                        if(Input[cc.macro.KEY.j]){
                            this.heroState = State.attack;
                        }
                        break;
                }
                if(this.heroState == State.attack){
                    if(Input[cc.macro.KEY.j]){
                        if(this.combo == 0){
                            anima = "hero_right_kit";
                        }
                        // else if(this.combo == 1){     //连击
                        //     anmia = "hero_up_kit";
                        // }else if(this.combo == 2){
                        //     anima = "hero_down_kit";
                        // }
                    }
                }
                if(this.heroState != State.stand){
                    this.sp.x = 0;
                    this.sp.y = 0;
                }else{
                    // this.combo = 0;//取消掉连击
                    if(Input[cc.macro.KEY.d]){
                        this.sp.x = 1;
                        this.sp.y = 0;
                        anima = "hero_right";
                        this.node.scaleX = 1;
                    }else if(Input[cc.macro.KEY.a]){
                        this.sp.x = -1;
                        this.sp.y = 0;
                        anima = "hero_right";
                        this.node.scaleX = -1;
                    }else if(Input[cc.macro.KEY.w]){
                        this.sp.y = 1;
                        this.sp.x = 0;
                        anima = "hero_up";
                    }else if(Input[cc.macro.KEY.s]){
                        this.sp.y = -1;
                        this.sp.x = 0;
                        anima = "hero_down";
                    }else{
                        this.sp.y = 0;
                        this.sp.x = 0;
                        anima = "hero_idle";
                    }
                }

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
                if(anima){
                    this.setState(anima);
                }
            }else{
                if(this.input_control !== 0){
                    this.on_player_walk(this.input_control);
                }
            }
        }
    },
});
