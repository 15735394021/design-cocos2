cc.Class({
    extends: cc.Component,

    properties: {
        archivesPre:{
            type:cc.Prefab,
            default:null
        }
    },

    onLoad () {
        this.baseUrl = "http://47.104.80.127:8080/";
        this.queryArchives();
        this.userId = cc.sys.localStorage.getItem("userId");
        if(this.userId == null){
            this.userId = 1;
        }
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
        // xhr.open("GET", this.baseUrl+"archives/queryArchives?userId="+this.userId, true);
        xhr.open("GET", this.baseUrl+"archives/queryArchives?userId=1", true);
        xhr.send();
    },

    createArchivesList(data){
        for (let i = 0; i < data.length; i++) {
            this.node.height += 80;
            let archivesNode = cc.instantiate(this.archivesPre);
            let archivesJs = archivesNode.getComponent("archive");
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

    },

    // update (dt) {},
});
