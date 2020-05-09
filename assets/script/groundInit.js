cc.Class({
    extends: cc.Component,

    properties: {
        hit_audio: {    //击打时的音效
            type: cc.AudioClip,
            default: null
        },
        bg_audio: {    //背景音乐
            type: cc.AudioClip,
            default: null
        },
        ready_play: {   //游戏加载中的进度条
            type: cc.Node,
            default: null
        },
        ready_progress: {   //游戏加载中的当前进度label
            type: cc.Label,
            default: null
        },
        flameParticle: {   //火焰粒子，用在村庄门口的开门关门效果
            type: cc.ParticleSystem,
            default: null
        },
        hero_pre: {
            type: cc.Prefab,
            default: null
        },
        guai1_pre:{
            type:cc.Prefab,
            default:null
        },
        topNode:{
          type:cc.Node,
          default:null
        },
        mycamrea: {
            type: cc.Node,
            default: null,
        },
        hero: {
            type: cc.Node,
            default: null
        }
    },

    onLoad() {
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2(0, 0);
        // p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
        cc.director.getCollisionManager().enabled = true; //检测碰撞
        // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

        this.ready_play.active = true;
        this.ready_progress.active = true;
        this.ready_play.getComponent(cc.ProgressBar).progress = 0;
        this.ready_progress.string = "地图正在初始化。。。";

        this.groundJs = this.node.getComponent("ground2");
        let _this = this;
        _this.groundJs.Init = function () {
            // _this.groundJs.mapCameraNode = this.mycamrea;
            _this.hero.parent = _this.groundJs.getLayerNodeFun("map");
            // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
        }
        _this.groundJs.onLoadSpriteParent = function (n, LayerName, bo) {//onLoadSpriteParent(父节点：Node，图层名：String，是否第一次加载：bool)

        }
        _this.groundJs.onLoadYMovieClip = function (ymc, layerName, bo) {//加载动画
            if (ymc.name == "hk1") {
                ymc.on("sound", function (event) {
                    cc.audioEngine.play(_this.hit_audio, false, 0.3);
                })
            }
        }
        this.groundJs.onLoadSprite = function (node, name) { //加载图块时调用  onLoadSprite(图块：Node，图层名：String)
            if (name == "map") {
                let tag0 = node.getComponent(cc.PolygonCollider);
                if (tag0 != null && tag0.tag == 0 && node.getComponent(cc.RigidBody) == null && node.getComponent(cc.PhysicsPolygonCollider) == null) {
                    let body = node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    let ps = tag0.points;
                    let collider = node.addComponent(cc.PhysicsPolygonCollider);
                    for (let i = 0; i < ps.length; i++) {
                        if (i > 3) {
                            collider.points.push({x: ps[i].x, y: ps[i].y});
                        } else {
                            collider.points[i].x = ps[i].x;
                            collider.points[i].y = ps[i].y;
                        }
                    }
                    collider.apply();
                }
            }
            // if(name == "ground"){
            //     let guai = node.g101;
            //     if(guai){
            //         console.log(guai)
            //     }
                // let guaiNode = cc.instantiate(this.guai1_pre);
                // guaiNode.parent = _this.groundJs.getLayerNodeFun("map");
                // guaiNode.setPosition(guai);
            // }
        }
        this.groundJs.killSprite = function (node, name) {//每次图块从舞台上清除时调用    killSprite(图块：Node，图层名：String)
            if (name == "map") {
                let tag0 = node.getComponent(cc.PolygonCollider);
                if (tag0 != null && tag0.tag == 0) {
                    let body = node.getComponent(cc.RigidBody);
                    if (body != null) {
                        body.destroy();
                    }
                    let pp = node.getComponent(cc.PhysicsPolygonCollider);
                    if (pp != null) {
                        pp.destroy();
                    }
                }
            }
        }
        this.groundJs.killSpriteParent = function (n, LayerName) {// 每次图块父节点从舞台上清除时调用。  killSpriteParent(父图块：Node，图层名：String)

        }
        this.groundJs.Loading = function (Loaded, Total) {   //Loading(已加载的贴图数：Number，总贴图数：Number)
            let progress = Loaded / Total;
            if (_this.ready_play != null) {
                _this.ready_progressNum = progress;
            }
            if (_this.ready_progress != null) {
                _this.ready_progress.string = "地图正在创建：" + progress * 100 + "%";
            }
        }

    },

    start () {
        
    },
    huaiwu1Init(){
            let guai1 = this.groundJs.getLayerNodeFun("map").g101;
            this.initG1(guai1);
        let guai2 = this.groundJs.getLayerNodeFun("map").g102;
        this.initG1(guai2);
        let guai3 = this.groundJs.getLayerNodeFun("map").g103;
        this.initG1(guai3);
        let guai4 = this.groundJs.getLayerNodeFun("map").g104;
        this.initG1(guai4);
        let guai5 = this.groundJs.getLayerNodeFun("map").g105;
        this.initG1(guai5);
        let guai6 = this.groundJs.getLayerNodeFun("map").g106;
        this.initG1(guai6);
        let guai7 = this.groundJs.getLayerNodeFun("map").g107;
        this.initG1(guai7);
        let guai8 = this.groundJs.getLayerNodeFun("map").g108;
        this.initG1(guai8);
        let guai9 = this.groundJs.getLayerNodeFun("map").g109;
        this.initG1(guai9);
    },
    initG1(guai){//初始化史莱姆
        let guaiNode = cc.instantiate(this.guai1_pre);
        guaiNode.parent = this.groundJs.getLayerNodeFun("map");
        guaiNode.setPosition(guai);
    },

    onEnable(){//active,enable从false变成true

    },
    onDisable(){//active,enable从true变成false

    },

    generate(){//加载英雄预制体进入地图
        let heroNode = cc.instantiate(this.hero_pre);
        let heroNodeJs = heroNode.getComponent("hero_go");
        heroNode.parent = this.groundJs.getLayerNodeFun("map");
        heroNodeJs.mycamrea = this.mycamrea;
        heroNodeJs.groundJsNode = this.node;
        heroNodeJs.map = "ground2";
        this.initHero = true;
        this.topPosheight = this.topNode.getPosition().y - heroGo.node.getPosition().y;//界面顶部的top信息，等级，经验，头像等
    },

    closeDoor(point1,point2){   //关门时的点起火焰粒子

    },
    onDestroy(){
        cc.audioEngine.stopAllEffects()
    },

    update (dt) {
        if(this.ready_play != null){
            let progress = this.ready_play.getComponent(cc.ProgressBar).progress;
            if(progress <= this.ready_progressNum){
                progress = progress+0.01;
                this.ready_play.getComponent(cc.ProgressBar).progress = progress;
                if(this.ready_play.getComponent(cc.ProgressBar).progress >= 1 && this.ready_play.getComponent(cc.ProgressBar).progress <= 1.02){
                    this.ready_play.destroy();
                    this.ready_play = null;
                    cc.audioEngine.play(this.bg_audio,true,0.3);
                    this.generate();
                    this.huaiwu1Init();
                }
            }
        }
        if(this.initHero){
            let viewX = heroGo.node.x;
            let viewY = heroGo.node.y;
            if(viewX <= -1850){
                viewX = -1850;
            }
            if(viewX >= 2077){
                viewX = 2077;
            }
            if(viewY >= 1130){
                viewY = 1130;
            }
            if(viewY <= -3160){
                viewY = -3160;
            }
            this.mycamrea.x = viewX;
            this.mycamrea.y = viewY;
            let pp = new cc.v2(viewX,viewY +this.topPosheight);
            this.topNode.setPosition(pp);
        }

    },
});
