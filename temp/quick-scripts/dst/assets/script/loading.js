
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/loading.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '798d7HmzgtFkYTKHNC5yjPm', 'loading');
// script/loading.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {
    m_ProMaxLen: {
      "default": 690,
      type: cc.Integer
    },
    m_Speed: {
      "default": 690,
      type: cc.Integer
    },
    m_Progress: {
      type: cc.Integer,
      "default": 0,
      slide: true,
      min: 0,
      max: 690,
      step: 1,
      notify: function notify() {
        this._progressChange();
      }
    },
    m_ProImage: cc.Node,
    run_load: {
      type: cc.Node,
      "default": null
    }
  },
  ctor: function ctor() {
    this.m_progressIng = false;
  },
  _progressChange: function _progressChange() {
    this.m_ProImage.width = this.m_Progress;
  },
  //我们规定进度条整体长度百分比.0-1
  setProgress: function setProgress(pro) {
    if (pro > 1 || pro < 0) {
      return;
    }

    var width = this.m_ProMaxLen * pro;

    if (width < this.m_SetWidth) {
      return;
    }

    this.m_SetWidth = this.m_ProMaxLen * pro;
    this.m_progressIng = true;
  },
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    this.m_ProImage.width = 0;
  },
  start: function start() {},
  update: function update(dt) {
    if (this.m_progressIng) {
      this.run_load.x = -390 + this.m_ProImage.width;

      if (this.m_ProImage.width < this.m_SetWidth) {
        this.m_ProImage.width += dt * this.m_Speed;
      }

      if (this.m_ProImage.width >= this.m_ProMaxLen) {
        this.m_progressIng = false;

        if (this.finishCallBack != null) {
          this.finishCallBack();
        }
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9Qcm9NYXhMZW4iLCJ0eXBlIiwiSW50ZWdlciIsIm1fU3BlZWQiLCJtX1Byb2dyZXNzIiwic2xpZGUiLCJtaW4iLCJtYXgiLCJzdGVwIiwibm90aWZ5IiwiX3Byb2dyZXNzQ2hhbmdlIiwibV9Qcm9JbWFnZSIsIk5vZGUiLCJydW5fbG9hZCIsImN0b3IiLCJtX3Byb2dyZXNzSW5nIiwid2lkdGgiLCJzZXRQcm9ncmVzcyIsInBybyIsIm1fU2V0V2lkdGgiLCJvbkxvYWQiLCJzdGFydCIsInVwZGF0ZSIsImR0IiwieCIsImZpbmlzaENhbGxCYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFDO0FBQ1IsaUJBQVEsR0FEQTtBQUVSQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGQSxLQURKO0FBS1JDLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRLEdBREo7QUFFSkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkosS0FMQTtBQVNSRSxJQUFBQSxVQUFVLEVBQUM7QUFDUEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLE9BREQ7QUFFUCxpQkFBUSxDQUZEO0FBR1BHLE1BQUFBLEtBQUssRUFBQyxJQUhDO0FBSVBDLE1BQUFBLEdBQUcsRUFBQyxDQUpHO0FBS1BDLE1BQUFBLEdBQUcsRUFBQyxHQUxHO0FBTVBDLE1BQUFBLElBQUksRUFBQyxDQU5FO0FBT1BDLE1BQUFBLE1BUE8sb0JBT0M7QUFDSixhQUFLQyxlQUFMO0FBQ0g7QUFUTSxLQVRIO0FBb0JSQyxJQUFBQSxVQUFVLEVBQUNmLEVBQUUsQ0FBQ2dCLElBcEJOO0FBcUJSQyxJQUFBQSxRQUFRLEVBQUM7QUFDTFosTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNnQixJQURIO0FBRUwsaUJBQVE7QUFGSDtBQXJCRCxHQUhQO0FBOEJMRSxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLQyxhQUFMLEdBQXFCLEtBQXJCO0FBQ0gsR0FoQ0k7QUFpQ0xMLEVBQUFBLGVBQWUsRUFBQywyQkFBVTtBQUN0QixTQUFLQyxVQUFMLENBQWdCSyxLQUFoQixHQUF5QixLQUFLWixVQUE5QjtBQUNILEdBbkNJO0FBb0NMO0FBQ0FhLEVBQUFBLFdBQVcsRUFBQyxxQkFBU0MsR0FBVCxFQUFhO0FBQ3JCLFFBQUtBLEdBQUcsR0FBRyxDQUFOLElBQVdBLEdBQUcsR0FBRyxDQUF0QixFQUF5QjtBQUNyQjtBQUNIOztBQUNELFFBQUlGLEtBQUssR0FBRyxLQUFLaEIsV0FBTCxHQUFtQmtCLEdBQS9COztBQUNBLFFBQUlGLEtBQUssR0FBRyxLQUFLRyxVQUFqQixFQUE2QjtBQUN6QjtBQUNIOztBQUNELFNBQUtBLFVBQUwsR0FBa0IsS0FBS25CLFdBQUwsR0FBbUJrQixHQUFyQztBQUVBLFNBQUtILGFBQUwsR0FBcUIsSUFBckI7QUFDSCxHQWhESTtBQWlETDtBQUVBSyxFQUFBQSxNQW5ESyxvQkFtREs7QUFDTixTQUFLVCxVQUFMLENBQWdCSyxLQUFoQixHQUF3QixDQUF4QjtBQUVILEdBdERJO0FBd0RMSyxFQUFBQSxLQXhESyxtQkF3REksQ0FFUixDQTFESTtBQTRETEMsRUFBQUEsTUE1REssa0JBNERHQyxFQTVESCxFQTRETztBQUNSLFFBQUssS0FBS1IsYUFBVixFQUF5QjtBQUNyQixXQUFLRixRQUFMLENBQWNXLENBQWQsR0FBa0IsQ0FBQyxHQUFELEdBQUssS0FBS2IsVUFBTCxDQUFnQkssS0FBdkM7O0FBRUEsVUFBSSxLQUFLTCxVQUFMLENBQWdCSyxLQUFoQixHQUF3QixLQUFLRyxVQUFqQyxFQUE0QztBQUN4QyxhQUFLUixVQUFMLENBQWdCSyxLQUFoQixJQUF5Qk8sRUFBRSxHQUFDLEtBQUtwQixPQUFqQztBQUNIOztBQUNELFVBQUksS0FBS1EsVUFBTCxDQUFnQkssS0FBaEIsSUFBeUIsS0FBS2hCLFdBQWxDLEVBQThDO0FBQzFDLGFBQUtlLGFBQUwsR0FBcUIsS0FBckI7O0FBQ0EsWUFBSyxLQUFLVSxjQUFMLElBQXVCLElBQTVCLEVBQWlDO0FBQzdCLGVBQUtBLGNBQUw7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQTFFSSxDQUFUIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJcclxuY2MuQ2xhc3Moe1xyXG4gICAgZXh0ZW5kczogY2MuQ29tcG9uZW50LFxyXG5cclxuICAgIHByb3BlcnRpZXM6IHtcclxuICAgICAgICBtX1Byb01heExlbjp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6NjkwLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkludGVnZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fU3BlZWQ6e1xyXG4gICAgICAgICAgICBkZWZhdWx0OjY5MCxcclxuICAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtX1Byb2dyZXNzOntcclxuICAgICAgICAgICAgdHlwZTpjYy5JbnRlZ2VyLFxyXG4gICAgICAgICAgICBkZWZhdWx0OjAsXHJcbiAgICAgICAgICAgIHNsaWRlOnRydWUsXHJcbiAgICAgICAgICAgIG1pbjowLFxyXG4gICAgICAgICAgICBtYXg6NjkwLFxyXG4gICAgICAgICAgICBzdGVwOjEsXHJcbiAgICAgICAgICAgIG5vdGlmeSgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvZ3Jlc3NDaGFuZ2UoKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV9Qcm9JbWFnZTpjYy5Ob2RlLFxyXG4gICAgICAgIHJ1bl9sb2FkOntcclxuICAgICAgICAgICAgdHlwZTpjYy5Ob2RlLFxyXG4gICAgICAgICAgICBkZWZhdWx0Om51bGxcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm1fcHJvZ3Jlc3NJbmcgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIF9wcm9ncmVzc0NoYW5nZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubV9Qcm9JbWFnZS53aWR0aCA9ICB0aGlzLm1fUHJvZ3Jlc3NcclxuICAgIH0sXHJcbiAgICAvL+aIkeS7rOinhOWumui/m+W6puadoeaVtOS9k+mVv+W6pueZvuWIhuavlC4wLTFcclxuICAgIHNldFByb2dyZXNzOmZ1bmN0aW9uKHBybyl7XHJcbiAgICAgICAgaWYgKCBwcm8gPiAxIHx8IHBybyA8IDAgKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMubV9Qcm9NYXhMZW4gKiBwcm9cclxuICAgICAgICBpZiggd2lkdGggPCB0aGlzLm1fU2V0V2lkdGggKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9TZXRXaWR0aCA9IHRoaXMubV9Qcm9NYXhMZW4gKiBwcm9cclxuXHJcbiAgICAgICAgdGhpcy5tX3Byb2dyZXNzSW5nID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5tX1Byb0ltYWdlLndpZHRoID0gMFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICggdGhpcy5tX3Byb2dyZXNzSW5nICl7XHJcbiAgICAgICAgICAgIHRoaXMucnVuX2xvYWQueCA9IC0zOTArdGhpcy5tX1Byb0ltYWdlLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgaWYoIHRoaXMubV9Qcm9JbWFnZS53aWR0aCA8IHRoaXMubV9TZXRXaWR0aCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1fUHJvSW1hZ2Uud2lkdGggKz0gZHQqdGhpcy5tX1NwZWVkXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoIHRoaXMubV9Qcm9JbWFnZS53aWR0aCA+PSB0aGlzLm1fUHJvTWF4TGVuKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9wcm9ncmVzc0luZyA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuZmluaXNoQ2FsbEJhY2sgIT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maW5pc2hDYWxsQmFjaygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59KTtcclxuIl19