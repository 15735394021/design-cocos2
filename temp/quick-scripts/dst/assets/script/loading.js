
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
    m_ProImage: cc.Node
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxsb2FkaW5nLmpzIl0sIm5hbWVzIjpbImNjIiwiQ2xhc3MiLCJDb21wb25lbnQiLCJwcm9wZXJ0aWVzIiwibV9Qcm9NYXhMZW4iLCJ0eXBlIiwiSW50ZWdlciIsIm1fU3BlZWQiLCJtX1Byb2dyZXNzIiwic2xpZGUiLCJtaW4iLCJtYXgiLCJzdGVwIiwibm90aWZ5IiwiX3Byb2dyZXNzQ2hhbmdlIiwibV9Qcm9JbWFnZSIsIk5vZGUiLCJjdG9yIiwibV9wcm9ncmVzc0luZyIsIndpZHRoIiwic2V0UHJvZ3Jlc3MiLCJwcm8iLCJtX1NldFdpZHRoIiwib25Mb2FkIiwic3RhcnQiLCJ1cGRhdGUiLCJkdCIsImZpbmlzaENhbGxCYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUztBQUNMLGFBQVNELEVBQUUsQ0FBQ0UsU0FEUDtBQUdMQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsV0FBVyxFQUFDO0FBQ1IsaUJBQVEsR0FEQTtBQUVSQyxNQUFBQSxJQUFJLEVBQUNMLEVBQUUsQ0FBQ007QUFGQSxLQURKO0FBS1JDLElBQUFBLE9BQU8sRUFBQztBQUNKLGlCQUFRLEdBREo7QUFFSkYsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNO0FBRkosS0FMQTtBQVNSRSxJQUFBQSxVQUFVLEVBQUM7QUFDUEgsTUFBQUEsSUFBSSxFQUFDTCxFQUFFLENBQUNNLE9BREQ7QUFFUCxpQkFBUSxDQUZEO0FBR1BHLE1BQUFBLEtBQUssRUFBQyxJQUhDO0FBSVBDLE1BQUFBLEdBQUcsRUFBQyxDQUpHO0FBS1BDLE1BQUFBLEdBQUcsRUFBQyxHQUxHO0FBTVBDLE1BQUFBLElBQUksRUFBQyxDQU5FO0FBT1BDLE1BQUFBLE1BUE8sb0JBT0M7QUFDSixhQUFLQyxlQUFMO0FBQ0g7QUFUTSxLQVRIO0FBb0JSQyxJQUFBQSxVQUFVLEVBQUNmLEVBQUUsQ0FBQ2dCO0FBcEJOLEdBSFA7QUEwQkxDLEVBQUFBLElBQUksRUFBQyxnQkFBVTtBQUNYLFNBQUtDLGFBQUwsR0FBcUIsS0FBckI7QUFDSCxHQTVCSTtBQTZCTEosRUFBQUEsZUFBZSxFQUFDLDJCQUFVO0FBQ3RCLFNBQUtDLFVBQUwsQ0FBZ0JJLEtBQWhCLEdBQXlCLEtBQUtYLFVBQTlCO0FBQ0gsR0EvQkk7QUFnQ0w7QUFDQVksRUFBQUEsV0FBVyxFQUFDLHFCQUFTQyxHQUFULEVBQWE7QUFDckIsUUFBS0EsR0FBRyxHQUFHLENBQU4sSUFBV0EsR0FBRyxHQUFHLENBQXRCLEVBQXlCO0FBQ3JCO0FBQ0g7O0FBQ0QsUUFBSUYsS0FBSyxHQUFHLEtBQUtmLFdBQUwsR0FBbUJpQixHQUEvQjs7QUFDQSxRQUFJRixLQUFLLEdBQUcsS0FBS0csVUFBakIsRUFBNkI7QUFDekI7QUFDSDs7QUFDRCxTQUFLQSxVQUFMLEdBQWtCLEtBQUtsQixXQUFMLEdBQW1CaUIsR0FBckM7QUFFQSxTQUFLSCxhQUFMLEdBQXFCLElBQXJCO0FBQ0gsR0E1Q0k7QUE2Q0w7QUFFQUssRUFBQUEsTUEvQ0ssb0JBK0NLO0FBQ04sU0FBS1IsVUFBTCxDQUFnQkksS0FBaEIsR0FBd0IsQ0FBeEI7QUFFSCxHQWxESTtBQW9ETEssRUFBQUEsS0FwREssbUJBb0RJLENBRVIsQ0F0REk7QUF3RExDLEVBQUFBLE1BeERLLGtCQXdER0MsRUF4REgsRUF3RE87QUFDUixRQUFLLEtBQUtSLGFBQVYsRUFBeUI7QUFFckIsVUFBSSxLQUFLSCxVQUFMLENBQWdCSSxLQUFoQixHQUF3QixLQUFLRyxVQUFqQyxFQUE0QztBQUN4QyxhQUFLUCxVQUFMLENBQWdCSSxLQUFoQixJQUF5Qk8sRUFBRSxHQUFDLEtBQUtuQixPQUFqQztBQUNIOztBQUNELFVBQUksS0FBS1EsVUFBTCxDQUFnQkksS0FBaEIsSUFBeUIsS0FBS2YsV0FBbEMsRUFBOEM7QUFDMUMsYUFBS2MsYUFBTCxHQUFxQixLQUFyQjs7QUFDQSxZQUFLLEtBQUtTLGNBQUwsSUFBdUIsSUFBNUIsRUFBaUM7QUFDN0IsZUFBS0EsY0FBTDtBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBckVJLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIG1fUHJvTWF4TGVuOntcclxuICAgICAgICAgICAgZGVmYXVsdDo2OTAsXHJcbiAgICAgICAgICAgIHR5cGU6Y2MuSW50ZWdlclxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbV9TcGVlZDp7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6NjkwLFxyXG4gICAgICAgICAgICB0eXBlOmNjLkludGVnZXJcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1fUHJvZ3Jlc3M6e1xyXG4gICAgICAgICAgICB0eXBlOmNjLkludGVnZXIsXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6MCxcclxuICAgICAgICAgICAgc2xpZGU6dHJ1ZSxcclxuICAgICAgICAgICAgbWluOjAsXHJcbiAgICAgICAgICAgIG1heDo2OTAsXHJcbiAgICAgICAgICAgIHN0ZXA6MSxcclxuICAgICAgICAgICAgbm90aWZ5KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9ncmVzc0NoYW5nZSgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtX1Byb0ltYWdlOmNjLk5vZGUsXHJcblxyXG4gICAgfSxcclxuICAgIGN0b3I6ZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLm1fcHJvZ3Jlc3NJbmcgPSBmYWxzZVxyXG4gICAgfSxcclxuICAgIF9wcm9ncmVzc0NoYW5nZTpmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubV9Qcm9JbWFnZS53aWR0aCA9ICB0aGlzLm1fUHJvZ3Jlc3NcclxuICAgIH0sXHJcbiAgICAvL+aIkeS7rOinhOWumui/m+W6puadoeaVtOS9k+mVv+W6pueZvuWIhuavlC4wLTFcclxuICAgIHNldFByb2dyZXNzOmZ1bmN0aW9uKHBybyl7XHJcbiAgICAgICAgaWYgKCBwcm8gPiAxIHx8IHBybyA8IDAgKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMubV9Qcm9NYXhMZW4gKiBwcm9cclxuICAgICAgICBpZiggd2lkdGggPCB0aGlzLm1fU2V0V2lkdGggKXtcclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubV9TZXRXaWR0aCA9IHRoaXMubV9Qcm9NYXhMZW4gKiBwcm9cclxuXHJcbiAgICAgICAgdGhpcy5tX3Byb2dyZXNzSW5nID0gdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8vIExJRkUtQ1lDTEUgQ0FMTEJBQ0tTOlxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgICAgdGhpcy5tX1Byb0ltYWdlLndpZHRoID0gMFxyXG5cclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgdXBkYXRlIChkdCkge1xyXG4gICAgICAgIGlmICggdGhpcy5tX3Byb2dyZXNzSW5nICl7XHJcblxyXG4gICAgICAgICAgICBpZiggdGhpcy5tX1Byb0ltYWdlLndpZHRoIDwgdGhpcy5tX1NldFdpZHRoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubV9Qcm9JbWFnZS53aWR0aCArPSBkdCp0aGlzLm1fU3BlZWRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiggdGhpcy5tX1Byb0ltYWdlLndpZHRoID49IHRoaXMubV9Qcm9NYXhMZW4pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tX3Byb2dyZXNzSW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5maW5pc2hDYWxsQmFjayAhPSBudWxsKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbmlzaENhbGxCYWNrKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=