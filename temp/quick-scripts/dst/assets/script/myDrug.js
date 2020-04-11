
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/myDrug.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a7c19fvD19OWKXYoYUwGab/', 'myDrug');
// script/myDrug.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    drugName: null,
    num: null,
    addHp: null,
    addMp: null
  },
  onLoad: function onLoad() {
    //为每个结点绑定事件
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
      this.node.getChildByName("used").active = false;
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
      //鼠标点击
      if (this.num == 0) {
        this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "该药品已经用完了";
      }

      this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "使用该药品吗？";
      this.node.getChildByName("used").active = true;
    }, this);
    this.node.getChildByName("used").active = false;
    var self = this;
    cc.loader.loadRes(self.drugName, cc.SpriteFrame, function (err, spriteFrame) {
      if (spriteFrame.length != 0) {
        self.node.getChildByName("image").getComponent(cc.Sprite).spriteFrame = spriteFrame;
      }
    });

    if (self.num != null) {
      self.node.getChildByName("num").getComponent(cc.Label).string = self.num;
    }

    self.node.getChildByName("name").getComponent(cc.Label).string = self.drugName;
    self.node.getChildByName("content").getComponent(cc.Label).string = "hp+:" + this.addHp + "\nmp+:" + this.addMp;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxteURydWcuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJkcnVnTmFtZSIsIm51bSIsImFkZEhwIiwiYWRkTXAiLCJvbkxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJldmVudCIsImdldENoaWxkQnlOYW1lIiwiY29sb3IiLCJDb2xvciIsInNjYWxlIiwiTU9VU0VfTEVBVkUiLCJhY3RpdmUiLCJNT1VTRV9ET1dOIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJzZWxmIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJsZW5ndGgiLCJTcHJpdGUiLCJvbkRlc3Ryb3kiLCJyZWxlYXNlUmVzIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0FBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTO0FBQ0wsYUFBU0QsRUFBRSxDQUFDRSxTQURQO0FBR0xDLEVBQUFBLFVBQVUsRUFBRTtBQUNSQyxJQUFBQSxRQUFRLEVBQUMsSUFERDtBQUVSQyxJQUFBQSxHQUFHLEVBQUMsSUFGSTtBQUdSQyxJQUFBQSxLQUFLLEVBQUMsSUFIRTtBQUlSQyxJQUFBQSxLQUFLLEVBQUM7QUFKRSxHQUhQO0FBVUxDLEVBQUFBLE1BVkssb0JBVUs7QUFFTjtBQUNBO0FBQ0EsU0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWFWLEVBQUUsQ0FBQ1csSUFBSCxDQUFRQyxTQUFSLENBQWtCQyxXQUEvQixFQUE0QyxVQUFVQyxLQUFWLEVBQWlCO0FBQUc7QUFDNUQsV0FBS0wsSUFBTCxDQUFVTSxjQUFWLENBQXlCLFFBQXpCLEVBQW1DQyxLQUFuQyxHQUEyQyxJQUFJaEIsRUFBRSxDQUFDaUIsS0FBUCxDQUFhLEdBQWIsRUFBaUIsR0FBakIsRUFBcUIsR0FBckIsQ0FBM0M7QUFDQSxXQUFLUixJQUFMLENBQVVTLEtBQVYsR0FBa0IsR0FBbEI7QUFDSCxLQUhELEVBR0csSUFISDtBQUtBLFNBQUtULElBQUwsQ0FBVUMsRUFBVixDQUFhVixFQUFFLENBQUNXLElBQUgsQ0FBUUMsU0FBUixDQUFrQk8sV0FBL0IsRUFBNEMsVUFBVUwsS0FBVixFQUFpQjtBQUFFO0FBQzNELFdBQUtMLElBQUwsQ0FBVU0sY0FBVixDQUF5QixRQUF6QixFQUFtQ0MsS0FBbkMsR0FBMkMsSUFBSWhCLEVBQUUsQ0FBQ2lCLEtBQVAsQ0FBYSxHQUFiLEVBQWlCLEdBQWpCLEVBQXFCLEVBQXJCLEVBQXdCLEdBQXhCLENBQTNDO0FBQ0EsV0FBS1IsSUFBTCxDQUFVUyxLQUFWLEdBQWtCLENBQWxCO0FBQ0EsV0FBS1QsSUFBTCxDQUFVTSxjQUFWLENBQXlCLE1BQXpCLEVBQWlDSyxNQUFqQyxHQUEwQyxLQUExQztBQUNILEtBSkQsRUFJRyxJQUpIO0FBTUEsU0FBS1gsSUFBTCxDQUFVQyxFQUFWLENBQWFWLEVBQUUsQ0FBQ1csSUFBSCxDQUFRQyxTQUFSLENBQWtCUyxVQUEvQixFQUEyQyxVQUFVUCxLQUFWLEVBQWlCO0FBQUc7QUFDM0QsVUFBRyxLQUFLVCxHQUFMLElBQVksQ0FBZixFQUFpQjtBQUNiLGFBQUtJLElBQUwsQ0FBVU0sY0FBVixDQUF5QixNQUF6QixFQUFpQ0EsY0FBakMsQ0FBZ0QsU0FBaEQsRUFBMkRPLFlBQTNELENBQXdFdEIsRUFBRSxDQUFDdUIsS0FBM0UsRUFBa0ZDLE1BQWxGLEdBQTJGLFVBQTNGO0FBQ0g7O0FBQ0QsV0FBS2YsSUFBTCxDQUFVTSxjQUFWLENBQXlCLE1BQXpCLEVBQWlDQSxjQUFqQyxDQUFnRCxTQUFoRCxFQUEyRE8sWUFBM0QsQ0FBd0V0QixFQUFFLENBQUN1QixLQUEzRSxFQUFrRkMsTUFBbEYsR0FBMkYsU0FBM0Y7QUFDQSxXQUFLZixJQUFMLENBQVVNLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNLLE1BQWpDLEdBQTBDLElBQTFDO0FBQ0gsS0FORCxFQU1HLElBTkg7QUFRQSxTQUFLWCxJQUFMLENBQVVNLGNBQVYsQ0FBeUIsTUFBekIsRUFBaUNLLE1BQWpDLEdBQTBDLEtBQTFDO0FBQ0EsUUFBSUssSUFBSSxHQUFHLElBQVg7QUFDQXpCLElBQUFBLEVBQUUsQ0FBQzBCLE1BQUgsQ0FBVUMsT0FBVixDQUFrQkYsSUFBSSxDQUFDckIsUUFBdkIsRUFBaUNKLEVBQUUsQ0FBQzRCLFdBQXBDLEVBQWlELFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QjtBQUN6RSxVQUFHQSxXQUFXLENBQUNDLE1BQVosSUFBc0IsQ0FBekIsRUFBMkI7QUFDdkJOLFFBQUFBLElBQUksQ0FBQ2hCLElBQUwsQ0FBVU0sY0FBVixDQUF5QixPQUF6QixFQUFrQ08sWUFBbEMsQ0FBK0N0QixFQUFFLENBQUNnQyxNQUFsRCxFQUEwREYsV0FBMUQsR0FBd0VBLFdBQXhFO0FBQ0g7QUFDSixLQUpEOztBQUtBLFFBQUdMLElBQUksQ0FBQ3BCLEdBQUwsSUFBWSxJQUFmLEVBQW9CO0FBQ2hCb0IsTUFBQUEsSUFBSSxDQUFDaEIsSUFBTCxDQUFVTSxjQUFWLENBQXlCLEtBQXpCLEVBQWdDTyxZQUFoQyxDQUE2Q3RCLEVBQUUsQ0FBQ3VCLEtBQWhELEVBQXVEQyxNQUF2RCxHQUFnRUMsSUFBSSxDQUFDcEIsR0FBckU7QUFDSDs7QUFDRG9CLElBQUFBLElBQUksQ0FBQ2hCLElBQUwsQ0FBVU0sY0FBVixDQUF5QixNQUF6QixFQUFpQ08sWUFBakMsQ0FBOEN0QixFQUFFLENBQUN1QixLQUFqRCxFQUF3REMsTUFBeEQsR0FBaUVDLElBQUksQ0FBQ3JCLFFBQXRFO0FBQ0FxQixJQUFBQSxJQUFJLENBQUNoQixJQUFMLENBQVVNLGNBQVYsQ0FBeUIsU0FBekIsRUFBb0NPLFlBQXBDLENBQWlEdEIsRUFBRSxDQUFDdUIsS0FBcEQsRUFBMkRDLE1BQTNELEdBQW9FLFNBQU8sS0FBS2xCLEtBQVosR0FBa0IsUUFBbEIsR0FBMkIsS0FBS0MsS0FBcEc7QUFDSCxHQTdDSTtBQStDTDBCLEVBQUFBLFNBL0NLLHVCQStDTTtBQUNQakMsSUFBQUEsRUFBRSxDQUFDMEIsTUFBSCxDQUFVUSxVQUFWLENBQXFCLEtBQUs5QixRQUExQixFQUFvQ0osRUFBRSxDQUFDNEIsV0FBdkMsRUFETyxDQUM4QztBQUN4RCxHQWpESTtBQW1ETE8sRUFBQUEsS0FuREssbUJBbURJLENBRVIsQ0FyREksQ0F1REw7O0FBdkRLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGRydWdOYW1lOm51bGwsXHJcbiAgICAgICAgbnVtOm51bGwsXHJcbiAgICAgICAgYWRkSHA6bnVsbCxcclxuICAgICAgICBhZGRNcDpudWxsXHJcbiAgICB9LFxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcblxyXG4gICAgICAgIC8v5Li65q+P5Liq57uT54K557uR5a6a5LqL5Lu2XHJcbiAgICAgICAgLy8g5L2/55So5p6a5Li+57G75Z6L5p2l5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHsgIC8v6byg5qCH56e75YWlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdyb3VuZFwiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDAsMTAwLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDEuMjtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCBmdW5jdGlvbiAoZXZlbnQpIHsgLy/pvKDmoIfnp7vlh7pcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JvdW5kXCIpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwNCwxMDUsOTEsMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04sIGZ1bmN0aW9uIChldmVudCkgeyAgLy/pvKDmoIfngrnlh7tcclxuICAgICAgICAgICAgaWYodGhpcy5udW0gPT0gMCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VkXCIpLmdldENoaWxkQnlOYW1lKFwiY29udGV4dFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6K+l6I2v5ZOB5bey57uP55So5a6M5LqGXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRleHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuS9v+eUqOivpeiNr+WTgeWQl++8n1wiO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VkXCIpLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInVzZWRcIikuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHNlbGYuZHJ1Z05hbWUsIGNjLlNwcml0ZUZyYW1lLCBmdW5jdGlvbiAoZXJyLCBzcHJpdGVGcmFtZSkge1xyXG4gICAgICAgICAgICBpZihzcHJpdGVGcmFtZS5sZW5ndGggIT0gMCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJpbWFnZVwiKS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKS5zcHJpdGVGcmFtZSA9IHNwcml0ZUZyYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYoc2VsZi5udW0gIT0gbnVsbCl7XHJcbiAgICAgICAgICAgIHNlbGYubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm51bVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNlbGYubnVtO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJuYW1lXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gc2VsZi5kcnVnTmFtZTtcclxuICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmdldENvbXBvbmVudChjYy5MYWJlbCkuc3RyaW5nID0gXCJocCs6XCIrdGhpcy5hZGRIcCtcIlxcbm1wKzpcIit0aGlzLmFkZE1wO1xyXG4gICAgfSxcclxuXHJcbiAgICBvbkRlc3Ryb3koKXtcclxuICAgICAgICBjYy5sb2FkZXIucmVsZWFzZVJlcyh0aGlzLmRydWdOYW1lLCBjYy5TcHJpdGVGcmFtZSk7IC8v5Zu+54mH6LWE5rqQ6YeK5pS+XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19