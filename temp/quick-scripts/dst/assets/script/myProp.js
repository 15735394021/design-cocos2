
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/myProp.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '74cf1kv609IJICgzp7XsYR/', 'myProp');
// script/myProp.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    propName: null,
    num: null,
    addDefense: null,
    //防御
    addSpeed: null,
    //移动
    hurt: null //伤害值

  },
  onLoad: function onLoad() {
    // 使用枚举类型来注册
    this.node.on(cc.Node.EventType.MOUSE_ENTER, function (event) {
      //鼠标移入
      this.node.getChildByName("ground").color = new cc.Color(100, 100, 100);
      this.node.scale = 1.2;
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_LEAVE, function (event) {
      //鼠标移出
      this.node.getChildByName("ground").color = new cc.Color(104, 105, 91, 255);
      this.node.scale = 1;
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
      //鼠标点击
      console.log('确定装备该配件吗？');
    }, this);
    var self = this;
    cc.loader.loadRes(self.propName, cc.SpriteFrame, function (err, spriteFrame) {
      if (spriteFrame.length != 0) {
        self.node.getChildByName("image").getComponent(cc.Sprite).spriteFrame = spriteFrame;
      }
    });

    if (self.num != null) {
      self.node.getChildByName("num").getComponent(cc.Label).string = self.num;
    }

    self.node.getChildByName("name").getComponent(cc.Label).string = self.propName;
    self.node.getChildByName("content").getComponent(cc.Label).string = "防御+:" + this.addDefense + "\n移动+:" + this.addSpeed + "伤害+:" + self.hurt;
  },
  onDestroy: function onDestroy() {
    cc.loader.releaseRes(this.drugName, cc.SpriteFrame); //图片资源释放
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxteVByb3AuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwcm9wTmFtZSIsIm51bSIsImFkZERlZmVuc2UiLCJhZGRTcGVlZCIsImh1cnQiLCJvbkxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJldmVudCIsImdldENoaWxkQnlOYW1lIiwiY29sb3IiLCJDb2xvciIsInNjYWxlIiwiTU9VU0VfTEVBVkUiLCJNT1VTRV9ET1dOIiwiY29uc29sZSIsImxvZyIsInNlbGYiLCJsb2FkZXIiLCJsb2FkUmVzIiwiU3ByaXRlRnJhbWUiLCJlcnIiLCJzcHJpdGVGcmFtZSIsImxlbmd0aCIsImdldENvbXBvbmVudCIsIlNwcml0ZSIsIkxhYmVsIiwic3RyaW5nIiwib25EZXN0cm95IiwicmVsZWFzZVJlcyIsImRydWdOYW1lIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsSUFERDtBQUVSQyxJQUFBQSxHQUFHLEVBQUMsSUFGSTtBQUdSQyxJQUFBQSxVQUFVLEVBQUMsSUFISDtBQUdTO0FBQ2pCQyxJQUFBQSxRQUFRLEVBQUMsSUFKRDtBQUlRO0FBQ2hCQyxJQUFBQSxJQUFJLEVBQUMsSUFMRyxDQUtLOztBQUxMLEdBSFA7QUFXTEMsRUFBQUEsTUFYSyxvQkFXSztBQUVOO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWFYLEVBQUUsQ0FBQ1ksSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxXQUEvQixFQUE0QyxVQUFVQyxLQUFWLEVBQWlCO0FBQUc7QUFDNUQsV0FBS0wsSUFBTCxDQUFVTSxjQUFWLENBQXlCLFFBQXpCLEVBQW1DQyxLQUFuQyxHQUEyQyxJQUFJakIsRUFBRSxDQUFDa0IsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBM0M7QUFDQSxXQUFLUixJQUFMLENBQVVTLEtBQVYsR0FBa0IsR0FBbEI7QUFDSCxLQUhELEVBR0csSUFISDtBQUtBLFNBQUtULElBQUwsQ0FBVUMsRUFBVixDQUFhWCxFQUFFLENBQUNZLElBQUgsQ0FBUUMsU0FBUixDQUFrQk8sV0FBL0IsRUFBNEMsVUFBVUwsS0FBVixFQUFpQjtBQUFFO0FBQzNELFdBQUtMLElBQUwsQ0FBVU0sY0FBVixDQUF5QixRQUF6QixFQUFtQ0MsS0FBbkMsR0FBMkMsSUFBSWpCLEVBQUUsQ0FBQ2tCLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEVBQXJCLEVBQXdCLEdBQXhCLENBQTNDO0FBQ0EsV0FBS1IsSUFBTCxDQUFVUyxLQUFWLEdBQWtCLENBQWxCO0FBQ0gsS0FIRCxFQUdHLElBSEg7QUFLQSxTQUFLVCxJQUFMLENBQVVDLEVBQVYsQ0FBYVgsRUFBRSxDQUFDWSxJQUFILENBQVFDLFNBQVIsQ0FBa0JRLFVBQS9CLEVBQTJDLFVBQVVOLEtBQVYsRUFBaUI7QUFBRztBQUMzRE8sTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksV0FBWjtBQUNILEtBRkQsRUFFRyxJQUZIO0FBSUEsUUFBSUMsSUFBSSxHQUFHLElBQVg7QUFDQXhCLElBQUFBLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVUMsT0FBVixDQUFrQkYsSUFBSSxDQUFDcEIsUUFBdkIsRUFBaUNKLEVBQUUsQ0FBQzJCLFdBQXBDLEVBQWlELFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUN6RSxVQUFHQSxXQUFXLENBQUNDLE1BQVosSUFBc0IsQ0FBekIsRUFBMkI7QUFDdkJOLFFBQUFBLElBQUksQ0FBQ2QsSUFBTCxDQUFVTSxjQUFWLENBQXlCLE9BQXpCLEVBQWtDZSxZQUFsQyxDQUErQy9CLEVBQUUsQ0FBQ2dDLE1BQWxELEVBQTBESCxXQUExRCxHQUF3RUEsV0FBeEU7QUFDSDtBQUNKLEtBSkQ7O0FBS0EsUUFBR0wsSUFBSSxDQUFDbkIsR0FBTCxJQUFZLElBQWYsRUFBb0I7QUFDaEJtQixNQUFBQSxJQUFJLENBQUNkLElBQUwsQ0FBVU0sY0FBVixDQUF5QixLQUF6QixFQUFnQ2UsWUFBaEMsQ0FBNkMvQixFQUFFLENBQUNpQyxLQUFoRCxFQUF1REMsTUFBdkQsR0FBZ0VWLElBQUksQ0FBQ25CLEdBQXJFO0FBQ0g7O0FBQ0RtQixJQUFBQSxJQUFJLENBQUNkLElBQUwsQ0FBVU0sY0FBVixDQUF5QixNQUF6QixFQUFpQ2UsWUFBakMsQ0FBOEMvQixFQUFFLENBQUNpQyxLQUFqRCxFQUF3REMsTUFBeEQsR0FBaUVWLElBQUksQ0FBQ3BCLFFBQXRFO0FBQ0FvQixJQUFBQSxJQUFJLENBQUNkLElBQUwsQ0FBVU0sY0FBVixDQUF5QixTQUF6QixFQUFvQ2UsWUFBcEMsQ0FBaUQvQixFQUFFLENBQUNpQyxLQUFwRCxFQUEyREMsTUFBM0QsR0FBb0UsU0FBTyxLQUFLNUIsVUFBWixHQUF1QixRQUF2QixHQUFnQyxLQUFLQyxRQUFyQyxHQUE4QyxNQUE5QyxHQUFxRGlCLElBQUksQ0FBQ2hCLElBQTlIO0FBQ0gsR0F2Q0k7QUF5Q0wyQixFQUFBQSxTQXpDSyx1QkF5Q007QUFDUG5DLElBQUFBLEVBQUUsQ0FBQ3lCLE1BQUgsQ0FBVVcsVUFBVixDQUFxQixLQUFLQyxRQUExQixFQUFvQ3JDLEVBQUUsQ0FBQzJCLFdBQXZDLEVBRE8sQ0FDOEM7QUFDeEQsR0EzQ0k7QUE2Q0xXLEVBQUFBLEtBN0NLLG1CQTZDSSxDQUVSLENBL0NJLENBaURMOztBQWpESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwcm9wTmFtZTpudWxsLFxyXG4gICAgICAgIG51bTpudWxsLFxyXG4gICAgICAgIGFkZERlZmVuc2U6bnVsbCwgLy/pmLLlvqFcclxuICAgICAgICBhZGRTcGVlZDpudWxsLCAgLy/np7vliqhcclxuICAgICAgICBodXJ0Om51bGwgICAgLy/kvKTlrrPlgLxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICAgICAgLy8g5L2/55So5p6a5Li+57G75Z6L5p2l5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHsgIC8v6byg5qCH56e75YWlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdyb3VuZFwiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDAsMTAwLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDEuMjtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCBmdW5jdGlvbiAoZXZlbnQpIHsgLy/pvKDmoIfnp7vlh7pcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JvdW5kXCIpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwNCwxMDUsOTEsMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04sIGZ1bmN0aW9uIChldmVudCkgeyAgLy/pvKDmoIfngrnlh7tcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+ehruWumuijheWkh+ivpemFjeS7tuWQl++8nycpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc2VsZi5wcm9wTmFtZSwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmKHNwcml0ZUZyYW1lLmxlbmd0aCAhPSAwKXtcclxuICAgICAgICAgICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcImltYWdlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpLnNwcml0ZUZyYW1lID0gc3ByaXRlRnJhbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihzZWxmLm51bSAhPSBudWxsKXtcclxuICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwibnVtXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc2VsZi5udW07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm5hbWVcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzZWxmLnByb3BOYW1lO1xyXG4gICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIumYsuW+oSs6XCIrdGhpcy5hZGREZWZlbnNlK1wiXFxu56e75YqoKzpcIit0aGlzLmFkZFNwZWVkK1wi5Lyk5a6zKzpcIitzZWxmLmh1cnQ7XHJcbiAgICB9LFxyXG5cclxuICAgIG9uRGVzdHJveSgpe1xyXG4gICAgICAgIGNjLmxvYWRlci5yZWxlYXNlUmVzKHRoaXMuZHJ1Z05hbWUsIGNjLlNwcml0ZUZyYW1lKTsgLy/lm77niYfotYTmupDph4rmlL5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=