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
    },

    onLoad () {
        this.baseUrl = "http://47.104.80.127:8080/";
        this.queryHeroDetail();
    },

    queryHeroDetail(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.status == 0){
                    let data = response.data[0];
                    this.addExperience();
                    this.heroGold.getComponent(cc.Label).string =data.userGold;
                }
            }
        }.bind(this);
        xhr.open("GET", this.baseUrl+"archives/queryArchives?userId=1", true);
        xhr.send();
    },

    addGrade(){//增加等级
        let grade = parseInt(this.heroGrade.getComponent(cc.Label).string);
        this.heroGrade.getComponent(cc.Label).string = grade+1;
    },

    addExperience(num){//增加经验值
        let totol = this.heroExperience.getChildByName("bar").width;
        totol += num;
        if(totol < this.heroExperience.getComponent(cc.ProgressBar).totalLength){
            this.heroExperience.getChildByName("bar").width = totol;
        }else{
            this.addGrade();
            this.heroExperience.getChildByName("bar").width = totol/300;
        }
    },

    addLife(num){
        let life = this.heroLife.getChildByName("bar").width;
        life += num;
        if(life < this.heroLife.getComponent(cc.ProgressBar).totalLength){
            this.heroLife.getChildByName("bat").widht = life;
        }else{
            this.heroLife.getChildByName("bat").widht = 300;
        }
    },

    addGold(num){//增加金币
        let gold = parseInt(this.heroGold.getComponent(cc.Label).string);
        this.heroGold.getComponent(cc.Label).string = gold+num;
    },

    useGold(num){//使用金币，减少
        let gold = parseInt(this.heroGold.getComponent(cc.Label).string);
        this.heroGold.getComponent(cc.Label).string = gold-num;
    },

    start () {

    },

    update (dt) {

    },
});
