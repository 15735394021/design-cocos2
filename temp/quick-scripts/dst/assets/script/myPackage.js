
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/myPackage.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cf9b0MojWNGILhbCt5G+JQ4', 'myPackage');
// script/myPackage.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    myDrugsDetail: {
      type: cc.Prefab,
      "default": null
    },
    myPropDetail: {
      type: cc.Prefab,
      "default": null
    }
  },
  onLoad: function onLoad() {
    this.node.getChildByName("myDrug").getChildByName("content").height = 0;

    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        var myDrugNode = cc.instantiate(this.myDrugsDetail);
        var myDrugJs = myDrugNode.getComponent("myDrug");
        myDrugJs.drugName = "touxiang";
        myDrugNode.parent = this.node.getChildByName("myDrug").getChildByName("content");
        myDrugNode.setPosition(cc.v2(10 + 180 * j, -100 - 200 * i));
      }

      this.node.getChildByName("myDrug").getChildByName("content").height += 200;
    }

    this.node.getChildByName("myProp").getChildByName("content").height = 0;

    for (var _i = 0; _i < 4; _i++) {
      for (var _j = 0; _j < 3; _j++) {
        var myPropNode = cc.instantiate(this.myPropDetail);
        var myPropJs = myPropNode.getComponent("myProp");
        myPropJs.propName = "touxiang";
        myPropNode.parent = this.node.getChildByName("myProp").getChildByName("content");
        myPropNode.setPosition(cc.v2(10 + 180 * _j, -100 - 200 * _i));
      }

      this.node.getChildByName("myProp").getChildByName("content").height += 200;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxteVBhY2thZ2UuanMiXSwibmFtZXMiOlsiY2MiLCJDbGFzcyIsIkNvbXBvbmVudCIsInByb3BlcnRpZXMiLCJteURydWdzRGV0YWlsIiwidHlwZSIsIlByZWZhYiIsIm15UHJvcERldGFpbCIsIm9uTG9hZCIsIm5vZGUiLCJnZXRDaGlsZEJ5TmFtZSIsImhlaWdodCIsImkiLCJqIiwibXlEcnVnTm9kZSIsImluc3RhbnRpYXRlIiwibXlEcnVnSnMiLCJnZXRDb21wb25lbnQiLCJkcnVnTmFtZSIsInBhcmVudCIsInNldFBvc2l0aW9uIiwidjIiLCJteVByb3BOb2RlIiwibXlQcm9wSnMiLCJwcm9wTmFtZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsYUFBYSxFQUFDO0FBQ1ZDLE1BQUFBLElBQUksRUFBQ0wsRUFBRSxDQUFDTSxNQURFO0FBRVYsaUJBQVE7QUFGRSxLQUROO0FBS1JDLElBQUFBLFlBQVksRUFBQztBQUNURixNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ00sTUFEQztBQUVULGlCQUFRO0FBRkM7QUFMTCxHQUhQO0FBY0xFLEVBQUFBLE1BZEssb0JBY0s7QUFDTixTQUFLQyxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNBLGNBQW5DLENBQWtELFNBQWxELEVBQTZEQyxNQUE3RCxHQUFzRSxDQUF0RTs7QUFDQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLENBQUMsRUFBeEIsRUFBNEI7QUFDeEIsV0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLENBQXBCLEVBQXVCQSxDQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLFlBQUlDLFVBQVUsR0FBR2QsRUFBRSxDQUFDZSxXQUFILENBQWUsS0FBS1gsYUFBcEIsQ0FBakI7QUFDQSxZQUFJWSxRQUFRLEdBQUdGLFVBQVUsQ0FBQ0csWUFBWCxDQUF3QixRQUF4QixDQUFmO0FBQ0FELFFBQUFBLFFBQVEsQ0FBQ0UsUUFBVCxHQUFvQixVQUFwQjtBQUNBSixRQUFBQSxVQUFVLENBQUNLLE1BQVgsR0FBb0IsS0FBS1YsSUFBTCxDQUFVQyxjQUFWLENBQXlCLFFBQXpCLEVBQW1DQSxjQUFuQyxDQUFrRCxTQUFsRCxDQUFwQjtBQUNBSSxRQUFBQSxVQUFVLENBQUNNLFdBQVgsQ0FBdUJwQixFQUFFLENBQUNxQixFQUFILENBQU0sS0FBSyxNQUFJUixDQUFmLEVBQWlCLENBQUMsR0FBRCxHQUFPLE1BQUlELENBQTVCLENBQXZCO0FBQ0g7O0FBQ0QsV0FBS0gsSUFBTCxDQUFVQyxjQUFWLENBQXlCLFFBQXpCLEVBQW1DQSxjQUFuQyxDQUFrRCxTQUFsRCxFQUE2REMsTUFBN0QsSUFBdUUsR0FBdkU7QUFDSDs7QUFFRCxTQUFLRixJQUFMLENBQVVDLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNBLGNBQW5DLENBQWtELFNBQWxELEVBQTZEQyxNQUE3RCxHQUFzRSxDQUF0RTs7QUFDQSxTQUFLLElBQUlDLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLEVBQUMsRUFBeEIsRUFBNEI7QUFDeEIsV0FBSyxJQUFJQyxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLENBQXBCLEVBQXVCQSxFQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLFlBQUlTLFVBQVUsR0FBR3RCLEVBQUUsQ0FBQ2UsV0FBSCxDQUFlLEtBQUtSLFlBQXBCLENBQWpCO0FBQ0EsWUFBSWdCLFFBQVEsR0FBR0QsVUFBVSxDQUFDTCxZQUFYLENBQXdCLFFBQXhCLENBQWY7QUFDQU0sUUFBQUEsUUFBUSxDQUFDQyxRQUFULEdBQW9CLFVBQXBCO0FBQ0FGLFFBQUFBLFVBQVUsQ0FBQ0gsTUFBWCxHQUFvQixLQUFLVixJQUFMLENBQVVDLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNBLGNBQW5DLENBQWtELFNBQWxELENBQXBCO0FBQ0FZLFFBQUFBLFVBQVUsQ0FBQ0YsV0FBWCxDQUF1QnBCLEVBQUUsQ0FBQ3FCLEVBQUgsQ0FBTSxLQUFJLE1BQUlSLEVBQWQsRUFBZ0IsQ0FBQyxHQUFELEdBQU8sTUFBSUQsRUFBM0IsQ0FBdkI7QUFDSDs7QUFDRCxXQUFLSCxJQUFMLENBQVVDLGNBQVYsQ0FBeUIsUUFBekIsRUFBbUNBLGNBQW5DLENBQWtELFNBQWxELEVBQTZEQyxNQUE3RCxJQUF1RSxHQUF2RTtBQUNIO0FBQ0osR0F0Q0k7QUF3Q0xjLEVBQUFBLEtBeENLLG1CQXdDSSxDQUVSLENBMUNJLENBNENMOztBQTVDSyxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG15RHJ1Z3NEZXRhaWw6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBteVByb3BEZXRhaWw6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLlByZWZhYixcclxuICAgICAgICAgICAgZGVmYXVsdDpudWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm15RHJ1Z1wiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuaGVpZ2h0ID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG15RHJ1Z05vZGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm15RHJ1Z3NEZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG15RHJ1Z0pzID0gbXlEcnVnTm9kZS5nZXRDb21wb25lbnQoXCJteURydWdcIik7XHJcbiAgICAgICAgICAgICAgICBteURydWdKcy5kcnVnTmFtZSA9IFwidG91eGlhbmdcIjtcclxuICAgICAgICAgICAgICAgIG15RHJ1Z05vZGUucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibXlEcnVnXCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIG15RHJ1Z05vZGUuc2V0UG9zaXRpb24oY2MudjIoMTAgKyAxODAqaiwtMTAwIC0gMjAwKmkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJteURydWdcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmhlaWdodCArPSAyMDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJteVByb3BcIikuZ2V0Q2hpbGRCeU5hbWUoXCJjb250ZW50XCIpLmhlaWdodCA9IDA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBteVByb3BOb2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy5teVByb3BEZXRhaWwpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG15UHJvcEpzID0gbXlQcm9wTm9kZS5nZXRDb21wb25lbnQoXCJteVByb3BcIik7XHJcbiAgICAgICAgICAgICAgICBteVByb3BKcy5wcm9wTmFtZSA9IFwidG91eGlhbmdcIjtcclxuICAgICAgICAgICAgICAgIG15UHJvcE5vZGUucGFyZW50ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibXlQcm9wXCIpLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICAgICAgICAgIG15UHJvcE5vZGUuc2V0UG9zaXRpb24oY2MudjIoMTAgKzE4MCpqLC0xMDAgLSAyMDAqaSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcIm15UHJvcFwiKS5nZXRDaGlsZEJ5TmFtZShcImNvbnRlbnRcIikuaGVpZ2h0ICs9IDIwMDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIHN0YXJ0ICgpIHtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIC8vIHVwZGF0ZSAoZHQpIHt9LFxyXG59KTtcclxuIl19