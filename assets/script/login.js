
cc.Class({
    extends: cc.Component,

    properties: {
        m_Account:cc.EditBox,
        m_PassWord:cc.EditBox,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.g_login = this;
        this.baseUrl = "http://47.104.80.127:8080/";
    },

    show:function(){
        this.node.active = true
    },
    hide:function(){
        this.node.active = false
    },
    onClickClose:function(){
        this.hide()
    },
    onClickRegister:function(){
        g_welcome.showRegisterView()
    },
    onClickLogin:function(){

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                console.log(response)
                if(response.status == 0){
                    let data = response.data;
                    console.log(response);
                    cc.sys.localStorage.setItem("userId",data.id);
                    cc.director.loadScene("archives");
                }
            }
        }.bind(this);
        xhr.open("GET", this.baseUrl+"user/login?userId="+this.m_Account.string+"&userPassword="+this.m_PassWord.string, true);
        xhr.send();
        console.log(this.baseUrl+"user/login?userId="+this.m_Account.string+"&userPassword="+this.m_PassWord.string)
        this.hide()
    },
    start () {

    },
    // update (dt) {},
});
