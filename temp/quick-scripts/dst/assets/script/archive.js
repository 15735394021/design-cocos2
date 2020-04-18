
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/archive.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1a17c2ebtZLlqFKux/m8Zwy', 'archive');
// script/archive.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    createTime: null,
    archivesName: null,
    grade: null,
    experience: null,
    gold: null,
    describe: null,
    checkPoint: null,
    enterAudio: {
      //鼠标移入的音效
      type: cc.AudioClip,
      "default": null
    }
  },
  onLoad: function onLoad() {
    //为节点注册事件
    this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
      //鼠标移入
      this.node.getChildByName("bg").color = new cc.Color(100, 100, 100);
      this.node.scale = 1.2;
      cc.audioEngine.play(this.enterAudio, false, 0.3);
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
      //鼠标移出
      this.node.getChildByName("bg").color = new cc.Color(100, 93, 11, 255);
      this.node.scale = 1;
      cc.audioEngine.stop(this.enterAudio);
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
      //鼠标点击,开始该档案的剧情，进入游戏场景
      console.log(this.checkPoint);
      cc.director.loadScene("game1");
    }, this);
    var self = this;

    if (self.createTime) {
      self.node.getChildByName("createTime").getComponent(cc.Label).string = self.createTime;
    }

    if (self.archivesName) {
      self.node.getChildByName("name").getComponent(cc.Label).string = self.archivesName;
    }

    if (self.grade) {
      self.node.getChildByName("grade").getComponent(cc.Label).string = "等级:" + self.grade;
    }

    if (self.experience) {
      self.node.getChildByName("experience").getComponent(cc.Label).string = "经验:" + self.experience;
    }

    if (self.gold) {
      self.node.getChildByName("gold").getComponent(cc.Label).string = "金币:" + self.gold;
    }

    if (self.describe) {
      self.node.getChildByName("describe").getComponent(cc.Label).string = "描述:" + self.describe;
    }
  },
  start: function start() {} // update (dt) {},

});

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhcmNoaXZlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiY3JlYXRlVGltZSIsImFyY2hpdmVzTmFtZSIsImdyYWRlIiwiZXhwZXJpZW5jZSIsImdvbGQiLCJkZXNjcmliZSIsImNoZWNrUG9pbnQiLCJlbnRlckF1ZGlvIiwidHlwZSIsIkF1ZGlvQ2xpcCIsIm9uTG9hZCIsIm5vZGUiLCJvbiIsIk5vZGUiLCJFdmVudFR5cGUiLCJNT1VTRV9FTlRFUiIsImV2ZW50IiwiZ2V0Q2hpbGRCeU5hbWUiLCJjb2xvciIsIkNvbG9yIiwic2NhbGUiLCJhdWRpb0VuZ2luZSIsInBsYXkiLCJNT1VTRV9MRUFWRSIsInN0b3AiLCJNT1VTRV9ET1dOIiwiY29uc29sZSIsImxvZyIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwic2VsZiIsImdldENvbXBvbmVudCIsIkxhYmVsIiwic3RyaW5nIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxVQUFVLEVBQUMsSUFESDtBQUVSQyxJQUFBQSxZQUFZLEVBQUMsSUFGTDtBQUdSQyxJQUFBQSxLQUFLLEVBQUMsSUFIRTtBQUlSQyxJQUFBQSxVQUFVLEVBQUMsSUFKSDtBQUtSQyxJQUFBQSxJQUFJLEVBQUMsSUFMRztBQU1SQyxJQUFBQSxRQUFRLEVBQUMsSUFORDtBQU9SQyxJQUFBQSxVQUFVLEVBQUMsSUFQSDtBQVFSQyxJQUFBQSxVQUFVLEVBQUM7QUFBSztBQUNaQyxNQUFBQSxJQUFJLEVBQUNaLEVBQUUsQ0FBQ2EsU0FERDtBQUVQLGlCQUFRO0FBRkQ7QUFSSCxHQUhQO0FBaUJMQyxFQUFBQSxNQWpCSyxvQkFpQks7QUFDTjtBQUNBLFNBQUtDLElBQUwsQ0FBVUMsRUFB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QUMxQixJQUE1RTtBQUNIOztBQUNELFFBQUcwQixJQUFJLENBQUN6QixRQUFSLEVBQWlCO0FBQ2J5QixNQUFBQSxJQUFJLENBQUNuQixJQUFMLENBQVVNLGNBQVYsQ0FBeUIsVUFBekIsRUFBcUNjLFlBQXJDLENBQWtEbkMsRUFBRSxDQUFDb0MsS0FBckQsRUFBNERDLE1BQTVELEdBQXFFLFFBQU1ILElBQUksQ0FBQ3pCLFFBQWhGO0FBQ0g7QUFDSixHQXZESTtBQXlETDZCLEVBQUFBLEtBekRLLG1CQXlESSxDQUVSLENBM0RJLENBNkRMOztBQTdESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNyZWF0ZVRpbWU6bnVsbCxcclxuICAgICAgICBhcmNoaXZlc05hbWU6bnVsbCxcclxuICAgICAgICBncmFkZTpudWxsLFxyXG4gICAgICAgIGV4cGVyaWVuY2U6bnVsbCxcclxuICAgICAgICBnb2xkOm51bGwsXHJcbiAgICAgICAgZGVzY3JpYmU6bnVsbCxcclxuICAgICAgICBjaGVja1BvaW50Om51bGwsXHJcbiAgICAgICAgZW50ZXJBdWRpbzp7ICAgIC8v6byg5qCH56e75YWl55qE6Z+z5pWIXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Li66IqC54K55rOo5YaM5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHsgIC8v6byg5qCH56e75YWlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwMCwxMDAsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMS4yO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuZW50ZXJBdWRpbyxmYWxzZSwwLjMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIGZ1bmN0aW9uIChldmVudCkgeyAvL+m8oOagh+enu+WHulxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDAsOTMsMTEsMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmVudGVyQXVkaW8pO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgZnVuY3Rpb24gKGV2ZW50KSB7ICAvL+m8oOagh+eCueWHuyzlvIDlp4vor6XmoaPmoYjnmoTliafmg4XvvIzov5vlhaXmuLjmiI/lnLrmma9cclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jaGVja1BvaW50KVxyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lMVwiKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmKHNlbGYuY3JlYXRlVGltZSl7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNyZWF0ZVRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzZWxmLmNyZWF0ZVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGYuYXJjaGl2ZXNOYW1lKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNlbGYuYXJjaGl2ZXNOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmdyYWRlKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JhZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuetiee6pzpcIitzZWxmLmdyYWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmV4cGVyaWVuY2Upe1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleHBlcmllbmNlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLnu4/pqow6XCIrc2VsZi5leHBlcmllbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmdvbGQpe1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLph5HluIE6XCIrc2VsZi5nb2xkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmRlc2NyaWJlKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGVzY3JpYmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaPj+i/sDpcIitzZWxmLmRlc2NyaWJlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=