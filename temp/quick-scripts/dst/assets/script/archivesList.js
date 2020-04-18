
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
    this.baseUrl = "http://47.104.80.127:8080/";
    this.queryArchives();
    this.userId = cc.sys.localStorage.getItem("userId");

    if (this.userId == null) {
      this.userId = 1;
    }

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
    }.bind(this); // xhr.open("GET", this.baseUrl+"archives/queryArchives?userId="+this.userId, true);


    xhr.open("GET", this.baseUrl + "archives/queryArchives?userId=1", true);
    xhr.send();
  },
  createArchivesList: function createArchivesList(data) {
    for (var i = 0; i < data.length; i++) {
      this.node.height += 80;
      var archivesNode = cc.instantiate(this.archivesPre);
      var archivesJs = archivesNode.getComponent("archive");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxhcmNoaXZlc0xpc3QuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJhcmNoaXZlc1ByZSIsInR5cGUiLCJQcmVmYWIiLCJvbkxvYWQiLCJiYXNlVXJsIiwicXVlcnlBcmNoaXZlcyIsInVzZXJJZCIsInN5cyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJub2RlIiwiaGVpZ2h0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwicmVzcG9uc2UiLCJKU09OIiwicGFyc2UiLCJyZXNwb25zZVRleHQiLCJkYXRhIiwiY3JlYXRlQXJjaGl2ZXNMaXN0IiwiYmluZCIsIm9wZW4iLCJzZW5kIiwiaSIsImxlbmd0aCIsImFyY2hpdmVzTm9kZSIsImluc3RhbnRpYXRlIiwiYXJjaGl2ZXNKcyIsImdldENvbXBvbmVudCIsImNyZWF0ZVRpbWUiLCJ0cyIsImFyY2hpdmVzTmFtZSIsImdyYWRlIiwidXNlckdyYWRlIiwiZXhwZXJpZW5jZSIsInVzZXJFeHBlcmllbmNlIiwiZ29sZCIsInVzZXJHb2xkIiwiZGVzY3JpYmUiLCJhcmNoaXZlc0Rlc2NyaWJlIiwiY2hlY2tQb2ludCIsInBhcmVudCIsInNldFBvc2l0aW9uIiwidjIiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFdBQVcsRUFBQztBQUNSQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ00sTUFEQTtBQUVSLGlCQUFRO0FBRkE7QUFESixHQUhQO0FBVUxDLEVBQUFBLE1BVkssb0JBVUs7QUFDTixTQUFLQyxPQUFMLEdBQWUsNEJBQWY7QUFDQSxTQUFLQyxhQUFMO0FBQ0EsU0FB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dCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGFyY2hpdmVzUHJlOntcclxuICAgICAgICAgICAgdHlwZTpjYy5QcmVmYWIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6bnVsbFxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgICB0aGlzLmJhc2VVcmwgPSBcImh0dHA6Ly80Ny4xMDQuODAuMTI3OjgwODAvXCI7XHJcbiAgICAgICAgdGhpcy5xdWVyeUFyY2hpdmVzKCk7XHJcbiAgICAgICAgdGhpcy51c2VySWQgPSBjYy5zeXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJ1c2VySWRcIik7XHJcbiAgICAgICAgaWYodGhpcy51c2VySWQgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHRoaXMudXNlcklkID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmhlaWdodCA9IDA7IC8v5Yid5aeL5YyW5pe26K6+572u5qGj5qGI57qq5b2V55qEY29udGVudOmrmOW6puS4ujDvvIzkuYvlkI7mr4/liJvlu7rkuIDooYzpq5jluqblho3lop7liqBcclxuICAgIH0sXHJcblxyXG4gICAgcXVlcnlBcmNoaXZlcygpe1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNwb25zZS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlQXJjaGl2ZXNMaXN0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xyXG4gICAgICAgIC8vIHhoci5vcGVuKFwiR0VUXCIsIHRoaXMuYmFzZVVybCtcImFyY2hpdmVzL3F1ZXJ5QXJjaGl2ZXM/dXNlcklkPVwiK3RoaXMudXNlcklkLCB0cnVlKTtcclxuICAgICAgICB4aHIub3BlbihcIkdFVFwiLCB0aGlzLmJhc2VVcmwrXCJhcmNoaXZlcy9xdWVyeUFyY2hpdmVzP3VzZXJJZD0xXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIGNyZWF0ZUFyY2hpdmVzTGlzdChkYXRhKXtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCArPSA4MDtcclxuICAgICAgICAgICAgbGV0IGFyY2hpdmVzTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuYXJjaGl2ZXNQcmUpO1xyXG4gICAgICAgICAgICBsZXQgYXJjaGl2ZXNKcyA9IGFyY2hpdmVzTm9kZS5nZXRDb21wb25lbnQoXCJhcmNoaXZlXCIpO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmNyZWF0ZVRpbWUgPSBkYXRhW2ldLnRzO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmFyY2hpdmVzTmFtZSA9IGRhdGFbaV0uYXJjaGl2ZXNOYW1lO1xyXG4gICAgICAgICAgICBhcmNoaXZlc0pzLmdyYWRlID0gZGF0YVtpXS51c2VyR3JhZGU7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZXhwZXJpZW5jZSA9IGRhdGFbaV0udXNlckV4cGVyaWVuY2U7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZ29sZCA9IGRhdGFbaV0udXNlckdvbGQ7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuZGVzY3JpYmUgPSBkYXRhW2ldLmFyY2hpdmVzRGVzY3JpYmU7XHJcbiAgICAgICAgICAgIGFyY2hpdmVzSnMuY2hlY2tQb2ludCA9IGRhdGFbaV0uY2hlY2tQb2ludDtcclxuICAgICAgICAgICAgYXJjaGl2ZXNOb2RlLnBhcmVudCA9IHRoaXMubm9kZTtcclxuICAgICAgICAgICAgYXJjaGl2ZXNOb2RlLnNldFBvc2l0aW9uKGNjLnYyKDAsLTQwIC0gODAgKiBpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==