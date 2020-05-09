"use strict";
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