
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
    addHurt: null //伤害值

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
      this.node.getChildByName("used").active = false;
    }, this);
    this.node.on(cc.Node.EventType.MOUSE_DOWN, function (event) {
      //鼠标点击
      this.node.getChildByName("used").getChildByName("context").getComponent(cc.Label).string = "确定装备该配件吗";
      this.node.getChildByName("used").active = true;
    }, this);
    this.node.getChildByName("used").active = false;
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
    self.node.getChildByName("content").getComponent(cc.Label).string = "防御+:" + this.addDefense + "\n移动+:" + this.addSpeed + "\n伤害+:" + self.addHurt;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxteVByb3AuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJwcm9wTmFtZSIsIm51bSIsImFkZERlZmVuc2UiLCJhZGRTcGVlZCIsImFkZEh1cnQiLCJvbkxvYWQiLCJub2RlIiwib24iLCJOb2RlIiwiRXZlbnRUeXBlIiwiTU9VU0VfRU5URVIiLCJldmVudCIsImdldENoaWxkQnlOYW1lIiwiY29sb3IiLCJDb2xvciIsInNjYWxlIiwiTU9VU0VfTEVBVkUiLCJhY3RpdmUiLCJNT1VTRV9ET1dOIiwiZ2V0Q29tcG9uZW50IiwiTGFiZWwiLCJzdHJpbmciLCJzZWxmIiwibG9hZGVyIiwibG9hZFJlcyIsIlNwcml0ZUZyYW1lIiwiZXJyIiwic3ByaXRlRnJhbWUiLCJsZW5ndGgiLCJTcHJpdGUiLCJvbkRlc3Ryb3kiLCJyZWxlYXNlUmVzIiwiZHJ1Z05hbWUiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFO0FBQ1JDLElBQUFBLFFBQVEsRUFBQyxJQUREO0FBRVJDLElBQUFBLEdBQUcsRUFBQyxJQUZJO0FBR1JDLElBQUFBLFVBQVUsRUFBQyxJQUhIO0FBR1M7QUFDakJDLElBQUFBLFFBQVEsRUFBQyxJQUpEO0FBSVE7QUFDaEJDLElBQUFBLE9BQU8sRUFBQyxJQUxBLENBS1E7O0FBTFIsR0FIUDtBQVdMQyxFQUFBQSxNQVhLLG9CQVdLO0FBRU47QUFDQSxTQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYVgsRUFBRSxDQUFDWSxJQUFILENBQVFDLFNBQVIsQ0FBa0JDLFdBQS9CLEVBQTRDLFVBQVVDLEtBQVYsRUFBaUI7QUFBRztBQUM1RCxXQUFLTCxJQUFMLENBQVVNLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNDLEtBQW5DLEdBQTJD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Q3BDLEVBQUUsQ0FBQzZCLFdBQXZDLEVBRE8sQ0FDOEM7QUFDeEQsR0E5Q0k7QUFnRExRLEVBQUFBLEtBaERLLG1CQWdESSxDQUVSLENBbERJLENBb0RMOztBQXBESyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBwcm9wTmFtZTpudWxsLFxyXG4gICAgICAgIG51bTpudWxsLFxyXG4gICAgICAgIGFkZERlZmVuc2U6bnVsbCwgLy/pmLLlvqFcclxuICAgICAgICBhZGRTcGVlZDpudWxsLCAgLy/np7vliqhcclxuICAgICAgICBhZGRIdXJ0Om51bGwgICAgLy/kvKTlrrPlgLxcclxuICAgIH0sXHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuXHJcbiAgICAgICAgLy8g5L2/55So5p6a5Li+57G75Z6L5p2l5rOo5YaMXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCBmdW5jdGlvbiAoZXZlbnQpIHsgIC8v6byg5qCH56e75YWlXHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImdyb3VuZFwiKS5jb2xvciA9IG5ldyBjYy5Db2xvcigxMDAsMTAwLDEwMCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDEuMjtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCBmdW5jdGlvbiAoZXZlbnQpIHsgLy/pvKDmoIfnp7vlh7pcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiZ3JvdW5kXCIpLmNvbG9yID0gbmV3IGNjLkNvbG9yKDEwNCwxMDUsOTEsMjU1KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlZFwiKS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0RPV04sIGZ1bmN0aW9uIChldmVudCkgeyAgLy/pvKDmoIfngrnlh7tcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwidXNlZFwiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRleHRcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBcIuehruWumuijheWkh+ivpemFjeS7tuWQl1wiO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VkXCIpLmFjdGl2ZSAgPSB0cnVlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJ1c2VkXCIpLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyhzZWxmLnByb3BOYW1lLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgaWYoc3ByaXRlRnJhbWUubGVuZ3RoICE9IDApe1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiaW1hZ2VcIikuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKHNlbGYubnVtICE9IG51bGwpe1xyXG4gICAgICAgICAgICBzZWxmLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJudW1cIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBzZWxmLm51bTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwibmFtZVwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IHNlbGYucHJvcE5hbWU7XHJcbiAgICAgICAgc2VsZi5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpLnN0cmluZyA9IFwi6Ziy5b6hKzpcIit0aGlzLmFkZERlZmVuc2UrXCJcXG7np7vliqgrOlwiK3RoaXMuYWRkU3BlZWQrXCJcXG7kvKTlrrMrOlwiK3NlbGYuYWRkSHVydDtcclxuICAgIH0sXHJcblxyXG4gICAgb25EZXN0cm95KCl7XHJcbiAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VSZXModGhpcy5kcnVnTmFtZSwgY2MuU3ByaXRlRnJhbWUpOyAvL+WbvueJh+i1hOa6kOmHiuaUvlxyXG4gICAgfSxcclxuXHJcbiAgICBzdGFydCAoKSB7XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvLyB1cGRhdGUgKGR0KSB7fSxcclxufSk7XHJcbiJdfQ==