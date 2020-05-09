
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/archivesList.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '7aba31aiItLHaGikvGJP96R', 'archivesList');
// script/archivesList.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    archivesPre: {
      type: cc.Prefab,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.baseUrl = cc.sys.localStorage.getItem("baseUrl");

    if (this.baseUrl == null) {
      cc.director.loadScene("welcome");
    }

    this.userId = cc.sys.localStorage.getItem("userId");

    if (this.userId == null) {
      cc.director.loadScene("welcome");
    }

    var self = this;
    var timer1 = window.setTimeout(function () {
      self.queryArchives();
    }, 500);
    this.node.height = 0; //初始化时设置档案纪录的content高度为0，之后每创建一行高度再增加
  },
  queryArchives: function queryArchives() {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        var response = JSON.parse(xhr.responseText);

        if (response.status == 0) {
          var data = response.data;
          this.createArchivesList(data);
        }
      }
    }.bind(this);

    console.log(this.baseUrl + "archives/queryArchives?userId=" + this.userId);
    xhr.open("GET", this.baseUrl + "archives/queryArchives?userId=" + this.userId, true);
    xhr.send();
  },
  createArchivesList: function createArchivesList(data) {
    for (var i = 0; i < data.length; i++) {
      this.node.height += 80;
      var archivesNode = cc.instantiate(this.archivesPre);
      var archivesJs = archivesNode.getComponent("archive");
      archivesJs.archivesId = data[i].archivesId;
      archivesJs.createTime = data[i].ts;
      archivesJs.archivesName = data[i].archivesName;
      archivesJs.grade = data[i].userGrade;
      archivesJs.experience = data[i].userExperience;
      archivesJs.gold = data[i].userGold;
      archivesJs.describe = data[i].archivesDescribe;
      archivesJs.checkPoint = data[i].checkPoint;
      archivesNode.parent = this.node;
      archivesNode.setPosition(cc.v2(0, -40 - 80 * i));
    }
  },
  start: function start() {
    if (cc.sys.localStorage.getItem("checkPoint") != null && cc.sys.localStorage.getItem("archivesId")) {
      cc.director.loadScene("game" + cc.sys.localStorage.getItem("checkPoint"));
    }

    if (cc.sys.localStorage.getItem("userId") == null) {
      cc.director.loadScene("welcome");
    }
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhcmNoaXZlc0xpc3QuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJhcmNoaXZlc1ByZSIsInR5cGUiLCJQcmVmYWIiLCJvbkxvYWQiLCJiYXNlVXJsIiwic3lzIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImRpcmVjdG9yIiwibG9hZFNjZW5lIiwidXNlcklkIiwic2VsZiIsInRpbWVyMSIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJxdWVyeUFyY2hpdmVzIiwibm9kZSIsImhlaWdodCIsInhociIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsInJlc3BvbnNlIiwiSlNPTiIsInBhcnNlIiwicmVzcG9uc2VUZXh0IiwiZGF0YSIsImNyZWF0ZUFyY2hpdmVzTGlzdCIsImJpbmQiLCJjb25zb2xlIiwibG9nIiwib3BlbiIsInNlbmQiLCJpIiwibGVuZ3RoIiwiYXJjaGl2ZXNOb2RlIiwiaW5zdGFudGlhdGUiLCJhcmNoaXZlc0pzIiwiZ2V0Q29tcG9uZW50IiwiYXJjaGl2ZXNJZCIsImNyZWF0ZVRpbWUiLCJ0cyIsImFyY2hpdmVzTmFtZSIsImdyYWRlIiwidXNlckdyYWRlIiwiZXhwZXJpZW5jZSIsInVzZXJFeHBlcmllbmNlIiwiZ29sZCIsInVzZXJHb2xkIiwiZGVzY3JpYmUiLCJhcmNoaXZlc0Rlc2NyaWJlIiwiY2hlY2tQb2ludCIsInBhcmVudCIsInNldFBvc2l0aW9uIiwidjIiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBQztBQUNSQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ00sTUFEQTtBQUVSLGlCQUFR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LENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNjLkNsYXNzKHtcclxuICAgIGV4dGVuZHM6IGNjLkNvbXBvbmVudCxcclxuXHJcbiAgICBwcm9wZXJ0aWVzOiB7XHJcbiAgICAgICAgYXJjaGl2ZXNQcmU6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImJhc2VVcmxcIik7XHJcbiAgICAgICAgaWYodGhpcy5iYXNlVXJsID09IG51bGwpe1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJ3ZWxjb21lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVzZXJJZCA9IGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKTtcclxuICAgICAgICBpZih0aGlzLnVzZXJJZCA9PSBudWxsKXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwid2VsY29tZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciB0aW1lcjE9d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgICAgIHNlbGYucXVlcnlBcmNoaXZlcygpO1xyXG4gICAgICAgIH0sNTAwKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IDA7IC8v5Yid5aeL5YyW5pe26K6+572u5qGj5qGI57qq5b2V55qEY29udGVudOmrmOW6puS4ujDvvIzkuYvlkI7mr4/liJvlu7rkuIDooYzpq5jluqblho3lop7liqBcclxuICAgIH0sXHJcblxyXG4gICAgcXVlcnlBcmNoaXZlcygpe1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXJjaGl2ZXNMaXN0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuYmFzZVVybCtcImFyY2hpdmVzL3F1ZXJ5QXJjaGl2ZXM/dXNlcklkPVwiK3RoaXMudXNlcklkKVxyXG4gICAgICAgIHhoci5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCtcImFyY2hpdmVzL3F1ZXJ5QXJjaGl2ZXM/dXNlcklkPVwiK3RoaXMudXNlcklkLCB0cnVlKTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfSxcclxuXHJcbiAgICBjcmVhdGVBcmNoaXZlc0xpc3QoZGF0YSl7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgKz0gODA7XHJcbiAgICAgICAgICAgIGxldCBhcmNoaXZlc05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmFyY2hpdmVzUHJlKTtcclxuICAgICAgICAgICAgbGV0IGFyY2hpdmVzSnMgPSBhcmNoaXZlc05vZGUuZ2V0Q29tcG9uZW50KFwiYXJjaGl2ZVwiKTtcclxuICAgICAgICAgICAgYXJjaGl2ZXNKcy5hcmNoaXZlc0lkID0gZGF0YVtpXS5hcmNoaXZlc0lkO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmNyZWF0ZVRpbWUgPSBkYXRhW2ldLnRzO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmFyY2hpdmVzTmFtZSA9IGRhdGFbaV0uYXJjaGl2ZXNOYW1lO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmdyYWRlID0gZGF0YVtpXS51c2VyR3JhZGU7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZXhwZXJpZW5jZSA9IGRhdGFbaV0udXNlckV4cGVyaWVuY2U7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZ29sZCA9IGRhdGFbaV0udXNlckdvbGQ7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZGVzY3JpYmUgPSBkYXRhW2ldLmFyY2hpdmVzRGVzY3JpYmU7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuY2hlY2tQb2ludCA9IGRhdGFbaV0uY2hlY2tQb2ludDtcclxuICAgICAgICAgICAgYXJjaGl2ZXNOb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgYXJjaGl2ZXNOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsLTQwIC0gODAgKiBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcbiAgICAgICAgaWYoY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2hlY2tQb2ludFwiKSAhPSBudWxsICYmIGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFyY2hpdmVzSWRcIikpe1xyXG4gICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoXCJnYW1lXCIrY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKFwiY2hlY2tQb2ludFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGNjLnN5cy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInVzZXJJZFwiKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKFwid2VsY29tZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19