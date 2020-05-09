cc.Class({
    extends: cc.Component,

    properties: {
        archivesPre:{
            type:cc.Prefab,
            default:null
        }
    },

    onLoad () {
        this.baseUrl = cc.sys.localStorage.getItem("baseUrl");
        if(this.baseUrl == null){
            cc.director.loadScene("welcome");
        }
        this.userId = cc.sys.localStorage.getItem("userId");
        if(this.userId == null){
            cc.director.loadScene("welcome");
        }
        let self = this;
        var timer1=window.setTimeout(function (){
            self.queryArchives();
        },500);

        this.node.height = 0; //初始化时设置档案纪录的content高度为0，之后每创建一行高度再增加
    },

    queryArchives(){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.status == 0){
                    let data = response.data;
                    this.createArchivesList(data);
                }
            }
        }.bind(this);
        console.log(this.baseUrl+"archives/queryArchives?userId="+this.userId)
        xhr.open("GET", this.baseUrl+"archives/queryArchives?userId="+this.userId, true);
        xhr.send();
    },

    createArchivesList(data){
        for (let i = 0; i < data.length; i++) {
            this.node.height += 80;
            let archivesNode = cc.instantiate(this.archivesPre);
            let archivesJs = archivesNode.getComponent("archive");
            archivesJs.archivesId = data[i].archivesId;
            archivesJs.createTime = data[i].ts;
            archivesJs.archivesName = data[i].archivesName;
            archivesJs.grade = data[i].userGrade;
            archivesJs.experience = data[i].userExperience;
            archivesJs.gold = data[i].userGold;
            archivesJs.describe = data[i].archivesDescribe;
            archivesJs.checkPoint = data[i].checkPoint;
            archivesNode.parent = this.node;
            archivesNode.setPosition(cc.v2(0,-40 - 80 * i));
        }
    },

    start () {
        if(cc.sys.localStorage.getItem("checkPoint") != null && cc.sys.localStorage.getItem("archivesId")){
            cc.director.loadScene("game"+cc.sys.localStorage.getItem("checkPoint"));
        }
        if(cc.sys.localStorage.getItem("userId") == null){
            cc.director.loadScene("welcome");
        }
    },
});
