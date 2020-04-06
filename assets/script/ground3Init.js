
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {

        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2(0,-8000);
        p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
        cc.director.getCollisionManager().enabled = true; //检测碰撞
        // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示

        this.groundJs = this.node.getComponent("ground3");
        let _this = this;
        _this.groundJs.Init=function(){
            _this.groundJs.mapCameraNode = hero_go.mycamrea;
            hero_go.node.parent = _this.groundJs.getLayerNodeFun("map");
            // console.log(_this.groundJs.getLayerNodeFun("map").Rect1);
        }
        this.groundJs.onLoadSprite=function(node,name){ //加载图块时调用  onLoadSprite(图块：Node，图层名：String)
            if(name == "map"){
                let tag0 = node.getComponent(cc.BoxCollider);
                if(tag0 != null && tag0.tag == 0){
                    let body = node.addComponent(cc.RigidBody);
                    body.type = cc.RigidBodyType.Static;
                    // let ps = tag0.points;
                    let collider = node.addComponent(cc.PhysicsBoxCollider);
                    collider.offset = cc.v2(0,0);
                    // for(let i=0;i<ps.length;i++){
                    //     collider.points[i].x = ps[i].x;
                    //     collider.points[i].y = ps[i].y;
                    // }
                    collider.apply();
                }
            }
        }
        this.groundJs.killSprite=function(node,name){//每次图块从舞台上清除时调用    killSprite(图块：Node，图层名：String)
            if(name == "map"){
                let tag0 = node.getComponent(cc.PolygonCollider);
                if(tag0 != null && tag0.tag == 0){
                    let body = node.getComponent(cc.RigidBody);
                    body.destroy();
                }
            }
        }
    },

    start () {

    },

    // update (dt) {},
});
