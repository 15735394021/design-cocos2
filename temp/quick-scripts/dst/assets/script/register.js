
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/register.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4aa25d4rNIxIbsg0ZpBNbV', 'register');
// script/register.js

"use strict";

cc.Class({
  "extends": cc.Component,
  properties: {},
  // LIFE-CYCLE CALLBACKS:
  onLoad: function onLoad() {
    window.g_register = this;
  },
  show: function show() {
    this.node.active = true;
  },
  hide: function hide() {
    this.node.active = false;
  },
  onClickClose: function onClickClose() {
    this.hide();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxyZWdpc3Rlci5qcyJdLCJuYW1lcyI6WyJjYyIsIkNsYXNzIiwiQ29tcG9uZW50IiwicHJvcGVydGllcyIsIm9uTG9hZCIsIndpbmRvdyIsImdfcmVnaXN0ZXIiLCJzaG93Iiwibm9kZSIsImFjdGl2ZSIsImhpZGUiLCJvbkNsaWNrQ2xvc2UiLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQUEsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDTCxhQUFTRCxFQUFFLENBQUNFLFNBRFA7QUFHTEMsRUFBQUEsVUFBVSxFQUFFLEVBSFA7QUFNTDtBQUVBQyxFQUFBQSxNQVJLLG9CQVFLO0FBQ05DLElBQUFBLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQixJQUFwQjtBQUNILEdBVkk7QUFZTEMsRUFBQUEsSUFBSSxFQUFDLGdCQUFVO0FBQ1gsU0FBS0MsSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0gsR0FkSTtBQWVMQyxFQUFBQSxJQUFJLEVBQUMsZ0JBQVU7QUFDWCxTQUFLRixJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDSCxHQWpCSTtBQWtCTEUsRUFBQUEsWUFBWSxFQUFDLHdCQUFVO0FBQ25CLFNBQUtELElBQUw7QUFDSCxHQXBCSTtBQXNCTEUsRUFBQUEsS0F0QkssbUJBc0JJLENBRVIsQ0F4QkksQ0EwQkw7O0FBMUJLLENBQVQiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgfSxcclxuXHJcbiAgICAvLyBMSUZFLUNZQ0xFIENBTExCQUNLUzpcclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICAgIHdpbmRvdy5nX3JlZ2lzdGVyID0gdGhpc1xyXG4gICAgfSxcclxuXHJcbiAgICBzaG93OmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWVcclxuICAgIH0sXHJcbiAgICBoaWRlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICB9LFxyXG4gICAgb25DbGlja0Nsb3NlOmZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5oaWRlKClcclxuICAgIH0sXHJcblxyXG4gICAgc3RhcnQgKCkge1xyXG5cclxuICAgIH0sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge30sXHJcbn0pO1xyXG4iXX0=