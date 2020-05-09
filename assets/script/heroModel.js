cc.Class({
    extends: cc.Component,

    properties: {
        heroGrade:{//等级
            type:cc.Node,
            default:null
        },
        heroExperience:{//经验值
            type:cc.Node,
            default:null
        },
        heroLife:{//生命值
            type:cc.Node,
            default:null
        },
        heroGold:{//金币
            type:cc.Node,
            default:null
        },
        die_audio:{
            type:cc.AudioClip,
            default:null
        },
        hurt_audio:{
            type:cc.AudioClip,
            default:null
        },
    },

    onLoad () {
        window.heroModel = this;
        this.baseUrl = cc.sys.localStorage.getItem("baseUrl");
        this.userId = cc.sys.localStorage.getItem("userId");
        if(this.baseUrl == null || this.userId == null){
            cc.director.loadScene("welcome");
        }
        this.queryHeroDetail();
    },

    queryHeroDetail(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.status == 0){
                    let data = response.data[0];
                    this.heroGold.getComponent(cc.Label).string =data.userGold;
                }
            }
        }.bind(this);
        xhr.open("GET", this.baseUrl+"archives/queryArchives?userId="+this.userId, true);
        xhr.send();
    },

    addGrade(){//增加等级
        let grade = parseInt(this.heroGrade.getComponent(cc.Label).string);
        this.heroGrade.getComponent(cc.Label).string = grade+1;
    },

    addExperience(num){//增加经验值
        let totol = parseInt(this.heroExperience.getChildByName("bar").width);
        totol += parseInt(num);
        if(totol < this.heroExperience.getComponent(cc.ProgressBar).totalLength){
            this.heroExperience.getChildByName("bar").width = totol;
        }else{
            this.addGrade();
            this.heroExperience.getChildByName("bar").width = totol/300;
        }
    },

    addLife(num){
        let life = parseInt(this.heroLife.getChildByName("bar").width);
        life += parseInt(num);
        if(life < this.heroLife.getComponent(cc.ProgressBar).totalLength){
            this.heroLife.getChildByName("bar").width = life;
        }else{
            this.heroLife.getChildByName("bar").width = 300;
        }
        this.isDie = false;
        // let life = this.heroLife.getChildByName("bar").scaleX;
    },
    hit(num){
        let life = parseInt(this.heroLife.getChildByName("bar").width);
        life -= parseInt(num);
        if(life > 0){
            cc.audioEngine.play(this.hurt_audio,false,0.4);
            this.heroLife.getChildByName("bar").width = life;
        }else{
            this.heroLife.getChildByName("bar").width = 0;
            if(this.isDie == true){
                return;
            }
            this.isDie = true;
            this.die();
        }
    },
    die(){
        cc.audioEngine.play(this.die_audio,false,0.4);
        var timer1=window.setTimeout(function (){
            alert("英雄死亡，点击确定重新加载当前地图");
            cc.director.loadScene(cc.director.getScene().getName());
        },1000);
        // heroGo.destroy();
    },

    addGold(num){//增加金币
        let gold = parseInt(this.heroGold.getComponent(cc.Label).string);
        this.heroGold.getComponent(cc.Label).string = gold+num;
    },

    useGold(num){//使用金币，减少
        let gold = parseInt(this.heroGold.getComponent(cc.Label).string);
        this.heroGold.getComponent(cc.Label).string = gold-num;
    },

    update (dt) {

    },
});
