cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        let p = cc.director.getPhysicsManager();
        p.enabled = true;
        p.gravity = cc.v2(0,0); 
        p.debugDrawFlags = true;  //显示出来碰撞边框，为了方便演示
        // cc.director.getCollisionManager().enabled = true; //检测碰撞
        // cc.director.getCollisionManager().enabledDebugDraw = true;//碰撞检测的边框显示
    },

    start () {

    },

    // update (dt) {},
});
