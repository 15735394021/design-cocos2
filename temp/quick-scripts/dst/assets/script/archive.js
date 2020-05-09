
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
    archivesId: null,
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
      cc.sys.localStorage.setItem("checkPoint", this.checkPoint);
      cc.sys.localStorage.setItem("archivesId", this.archivesId);
      cc.director.loadScene("game" + this.checkPoint);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhcmNoaXZlLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwiYXJjaGl2ZXNJZCIsImNyZWF0ZVRpbWUiLCJhcmNoaXZlc05hbWUiLCJncmFkZSIsImV4cGVyaWVuY2UiLCJnb2xkIiwiZGVzY3JpYmUiLCJjaGVja1BvaW50IiwiZW50ZXJBdWRpbyIsInR5cGUiLCJBdWRpb0NsaXAiLCJvbkxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJldmVudCIsImdldENoaWxkQnlOYW1lIiwiY29sb3IiLCJDb2xvciIsInNjYWxlIiwiYXVkaW9FbmdpbmUiLCJwbGF5IiwiTU9VU0VfTEVBVkUiLCJzdG9wIiwiTU9VU0VfRE9XTiIsInN5cyIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJkaXJlY3RvciIsImxvYWRTY2VuZSIsInNlbGYiLCJnZXRDb21wb25lbnQiLCJMYWJlbCIsInN0cmluZyIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsVUFBVSxFQUFDLElBREg7QUFFUkMsSUFBQUEsVUFBVSxFQUFDLElBRkg7QUFHUkMsSUFBQUEsWUFBWSxFQUFDLElBSEw7QUFJUkMsSUFBQUEsS0FBSyxFQUFDLElBSkU7QUFLUkMsSUFBQUEsVUFBVSxFQUFDLElBTEg7QUFNUkMsSUFBQUEsSUFBSSxFQUFDLElBTkc7QUFPUkMsSUFBQUEsUUFBUSxFQUFDLElBUEQ7QUFRUkMsSUFBQUEsVUFBVSxFQUFDLElBUkg7QUFTUkMsSUFBQUEsVUFBVSxFQUFDO0FBQUs7QUFDWkMsTUFBQUEsSUFBSSxFQUFDYixFQUFFLENBQUNjLFNBREQ7QUFFUCxpQkFBUTtBQUZEO0FBVEgsR0FIUDtB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dUUsUUFBTUgsSUFBSSxDQUFDNUIsVUFBbEY7QUFDSDs7QUFDRCxRQUFHNEIsSUFBSSxDQUFDM0IsSUFBUixFQUFhO0FBQ1QyQixNQUFBQSxJQUFJLENBQUNwQixJQUFMLENBQVVNLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNlLFlBQWpDLENBQThDckMsRUFBRSxDQUFDc0MsS0FBakQsRUFBd0RDLE1BQXhELEdBQWlFLFFBQU1ILElBQUksQ0FBQzNCLElBQTVFO0FBQ0g7O0FBQ0QsUUFBRzJCLElBQUksQ0FBQzFCLFFBQVIsRUFBaUI7QUFDYjBCLE1BQUFBLElBQUksQ0FBQ3BCLElBQUwsQ0FBVU0sY0FBVixDQUF5QixVQUF6QixFQUFxQ2UsWUFBckMsQ0FBa0RyQyxFQUFFLENBQUNzQyxLQUFyRCxFQUE0REMsTUFBNUQsR0FBcUUsUUFBTUgsSUFBSSxDQUFDMUIsUUFBaEY7QUFDSDtBQUNKLEdBekRJO0FBMkRMOEIsRUFBQUEsS0EzREssbUJBMkRJLENBRVIsQ0E3REksQ0ErREw7O0FBL0RLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYXJjaGl2ZXNJZDpudWxsLFxyXG4gICAgICAgIGNyZWF0ZVRpbWU6bnVsbCxcclxuICAgICAgICBhcmNoaXZlc05hbWU6bnVsbCxcclxuICAgICAgICBncmFkZTpudWxsLFxyXG4gICAgICAgIGV4cGVyaWVuY2U6bnVsbCxcclxuICAgICAgICBnb2xkOm51bGwsXHJcbiAgICAgICAgZGVzY3JpYmU6bnVsbCxcclxuICAgICAgICBjaGVja1BvaW50Om51bGwsXHJcbiAgICAgICAgZW50ZXJBdWRpbzp7ICAgIC8v6byg5qCH56e75YWl55qE6Z+z5pWIXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuQXVkaW9DbGlwLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIC8v5Li66IqC54K55rOo5YaM5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHsgIC8v6byg5qCH56e75YWlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImJnXCIpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwMCwxMDAsMTAwKTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMS4yO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wbGF5KHRoaXMuZW50ZXJBdWRpbyxmYWxzZSwwLjMpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIGZ1bmN0aW9uIChldmVudCkgeyAvL+m8oOagh+enu+WHulxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDAsOTMsMTEsMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcCh0aGlzLmVudGVyQXVkaW8pO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgZnVuY3Rpb24gKGV2ZW50KSB7ICAvL+m8oOagh+eCueWHuyzlvIDlp4vor6XmoaPmoYjnmoTliafmg4XvvIzov5vlhaXmuLjmiI/lnLrmma9cclxuICAgICAgICAgICAgY2Muc3lzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiY2hlY2tQb2ludFwiLHRoaXMuY2hlY2tQb2ludCk7XHJcbiAgICAgICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFyY2hpdmVzSWRcIix0aGlzLmFyY2hpdmVzSWQpO1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIrdGhpcy5jaGVja1BvaW50KTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmKHNlbGYuY3JlYXRlVGltZSl7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNyZWF0ZVRpbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzZWxmLmNyZWF0ZVRpbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKHNlbGYuYXJjaGl2ZXNOYW1lKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNlbGYuYXJjaGl2ZXNOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmdyYWRlKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JhZGVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuetiee6pzpcIitzZWxmLmdyYWRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmV4cGVyaWVuY2Upe1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJleHBlcmllbmNlXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLnu4/pqow6XCIrc2VsZi5leHBlcmllbmNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmdvbGQpe1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJnb2xkXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCLph5HluIE6XCIrc2VsZi5nb2xkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihzZWxmLmRlc2NyaWJlKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiZGVzY3JpYmVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuaPj+i/sDpcIitzZWxmLmRlc2NyaWJlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=