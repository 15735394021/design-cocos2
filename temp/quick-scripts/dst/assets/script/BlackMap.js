
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/script/BlackMap.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '322b9Cqs8BN05aN5zN1OJKv', 'BlackMap');
// script/BlackMap.js

"use strict";

var YMovieClip = cc.Class({
  "extends": cc.Node,
  properties: {
    cFrame: 0,
    currentFrame: {
      get: function get() {
        return this.cFrame + 1;
      }
    },
    totalFrame: {
      get: function get() {
        return this.frameArr.length;
      }
    },
    isYMC: true,
    frameArr: [],
    imgNode: cc.Node,
    actionObj: null,
    eventObj: null,
    tagObj: null,
    stageNode: cc.Node,
    frameNode: cc.Node,
    spriteArr: [],
    currentArr: [],
    rect: cc.Rect,
    revise: false
  },
  Init: function Init(parentNode, nstr, fraArr, actObj, eveArr, rect, tObj, sprArr, SpriteObj, rBo) {
    this.revise = rBo;
    this.stopBo = false;
    this.offBo = false; //停止运行 最高权限 只有执行了stop()才能为true

    this.currActArr = null;
    this.name = nstr;
    this.frameArr = fraArr;
    this.actionObj = actObj;
    this.eventObj = eveArr;
    this.tagObj = tObj;
    this.spriteArr = sprArr;
    this.cFrame = 0;
    this.SpriteObj = SpriteObj;
    this.rect = rect;
    this.eventFunObj = {};
    this.currentArr = this.frameArr[this.cFrame];
    this.parent = parentNode;
    this.frameNode = new cc.Node();
    this.frameNode.parent = this;
    this.frameNode.addComponent(cc.Sprite);
    this.frameNode.anchorX = 0;
    this.frameNode.anchorY = 1;
    this.anchorX = 0;
    this.anchorY = 1;
    this.setSprite();
  },
  Init2: function Init2(rect, sprArr, SpriteObj, rBo) {
    this.revise = rBo;
    this.stopBo = false;
    this.offBo = false; //停止运行 最高权限 只有执行了stop()才能为true

    this.currActArr = null;
    this.spriteArr = sprArr;
    this.cFrame = 0;
    this.SpriteObj = SpriteObj;
    this.rect = rect;
    this.eventFunObj = {};
    this.currentArr = this.frameArr[this.cFrame];
    this.setSprite();
  },

  /***如果该帧上有事件类型但是无接收方法,那么就会执行ymc.dispatchEvent弹出事件***/

  /***也可以通过setEventFun和addEventFun为该帧上的事件类型增加方法，屏蔽弹出***/
  onEventFun: function onEventFun() {
    if (this.EventFrame == this.cFrame) {
      return;
    }

    this.EventFrame = this.cFrame; //上一次执行代码的帧

    if (this.eventObj[this.cFrame] != null) {
      for (var str in this.eventObj[this.cFrame]) {
        if (this.eventObj[this.cFrame][str] != null) {
          this.eventObj[this.cFrame][str]();
        } else {
          this.dispatchEvent(new cc.Event.EventCustom(str, false));
        }
      }
    }
  },

  /********设置或更改已有的帧事件********/
  setEventFun: function setEventFun(zhen2, typeStr, fun) {
    var zhen = zhen2 - 1;

    if (this.eventObj[zhen] != null) {
      if (this.eventObj[zhen].hasOwnProperty(typeStr)) {
        this.eventObj[zhen][typeStr] = fun;
      }
    }
  },

  /********添加的帧事件，如果已经存则会被覆盖********/
  addEventFun: function addEventFun(zhen2, typeStr, fun) {
    var zhen = zhen2 - 1;

    if (this.eventObj[zhen] == null) {
      this.eventObj[zhen] = {};
    }

    this.eventObj[zhen][typeStr] = fun;
  },

  /********清除某一帧上的某一事件********/
  deleteEventFun: function deleteEventFun(zhen2, typeStr) {
    var zhen = zhen2 - 1;

    if (this.eventObj[zhen] != null) {
      if (this.eventObj[zhen].hasOwnProperty(typeStr)) {
        delete this.eventObj[zhen][typeStr];
      }
    }
  },

  /********清除某一帧上的所有事件********/
  deleteAllEventFun: function deleteAllEventFun(zhen2) {
    var zhen = zhen2 - 1;

    if (this.eventObj.hasOwnProperty(zhen)) {
      delete this.eventObj[zhen];
    }
  },

  /*********设置帧参数：卸载时动画的帧，当前时间，卸载时间,暂时BO，停止Bo */
  setFrame: function setFrame(remFrame, cTim, tTim, sbo, oBo) {
    this.stopBo = sbo;
    this.offBo = oBo;

    if (tTim == 0 || tTim == null) {
      //如果是第一次加载，则什么都不做
      if (this.actionObj != null) {
        this.currActArr = this.actionObj[0];

        if (this.currActArr != null) {
          if (this.currActArr[0] == 'stop') {
            this.cFrame = 0;
            this.onHitComponent();
            this.currentArr = this.frameArr[this.cFrame];
            this.setActionObj(this.cFrame);
            this.setSprite();
            this.EventFrame = this.cFrame;
            return;
          }
        }
      }
    }

    if (sbo || oBo || this.totalFrame == 1) {
      if (this.totalFrame == 1) {
        this.cFrame = 0;
      } else {
        this.cFrame = remFrame;
      }

      this.onHitComponent();
      this.currentArr = this.frameArr[this.cFrame];
      this.setActionObj(this.cFrame);
      this.setSprite();
      this.EventFrame = this.cFrame;
      return;
    }

    var xh = cTim - tTim;

    if (this.actionObj == null) {
      var ys = xh % this.totalFrame;

      if (remFrame + ys >= this.totalFrame) {
        this.cFrame = remFrame + ys - this.totalFrame;
      } else {
        this.cFrame = remFrame + ys;
      }

      this.onHitComponent();
      this.currentArr = this.frameArr[this.cFrame];
      this.setActionObj(this.cFrame);
      this.setSprite();
      this.onEventFun();
      return;
    } else {
      this.cFrame = remFrame;

      if (xh >= this.totalFrame * 3 && xh > 50) {
        var zhenObj = {};
        var zhenTim = tTim;
        var zhenArr = [];
        this.setActionObj(this.cFrame);

        for (var _i = 0; _i < this.totalFrame * 3; _i++) {
          this.currentArr = this.frameArr[this.cFrame];
          this.cFrame = this.addFrame();
          zhenTim++;
          zhenArr[zhenArr.length] = this.cFrame;

          if (zhenObj[this.cFrame] == null) {
            zhenObj[this.cFrame] = 1;
          } else {
            zhenObj[this.cFrame]++;

            if (zhenObj[this.cFrame] >= 3) {
              //当一帧连着出现三次 那么应该是循环了
              var arr = []; //用来记录每帧的位置和时间

              for (var c = zhenArr.length - 2; c > 0; c--) {
                //倒着检查 出循环点
                arr.unshift(zhenArr[c]);

                if (zhenArr[c] == this.cFrame) {
                  xh = cTim - zhenTim;
                  var cy = xh % arr.length;
                  this.cFrame = arr[cy];
                  this.onHitComponent();
                  this.currentArr = this.frameArr[this.cFrame];
                  this.setActionObj(this.cFrame);
                  this.setSprite();
                  this.onEventFun();
                  _i = this.totalFrame * 4;
                  break;
                }
              }
            }
          }
        }
      } else {
        this.setActionObj(this.cFrame);

        for (var _i2 = 0; _i2 < xh; _i2++) {
          this.cFrame = this.addFrame();
        }

        this.onHitComponent();
        this.currentArr = this.frameArr[this.cFrame];
        this.setActionObj(this.cFrame);
        this.setSprite(); //

        this.onEventFun();
      }
    }
  },
  setActionObj: function setActionObj(zhen) {
    if (this.actionObj != null) {
      this.currActArr = this.actionObj[zhen];
    }
  },
  addFrame: function addFrame() {
    var zhen = this.cFrame;

    if (this.stopBo) {
      if (zhen < 0) {
        zhen = 0;
      }

      if (zhen >= this.totalFrame) {
        zhen = 0;
      }

      return zhen;
    }

    if (this.actionObj == null) {
      zhen++;
    } else {
      if (this.currActArr != null) {
        if (this.currActArr[0] == 'gotoAndStop') {
          if (zhen != this.currActArr[1]) {
            if (this.currActArr[1] < this.totalFrame) {
              zhen = this.currActArr[1];
            } else {
              this.currActArr[1] = this.totalFrame - 1;
              zhen = this.currActArr[1];
            }
          }

          this.stopBo = true;
          this.currActArr = null;
        } else if (this.currActArr[0] == 'gotoAndPlay') {
          if (zhen != this.currActArr[1]) {
            if (this.currActArr[1] < this.totalFrame) {
              zhen = this.currActArr[1];
            } else {
              this.currActArr[1] = this.totalFrame - 1;
              zhen = this.currActArr[1];
            }
          }

          this.currActArr = null;
          this.stopBo = false;
        } else if (this.currActArr[0] == 'stop') {
          this.stopBo = true;
        } else if (this.currActArr[0] == 'play') {
          this.stopBo = false;
          zhen++;
        }
      } else {
        zhen++;
      }
    }

    if (zhen >= this.frameArr.length) {
      zhen = 0;
    }

    this.setActionObj(zhen);
    return zhen;
  },
  removeThis: function removeThis() {
    var spr = this.frameNode.getComponent(cc.Sprite);
    spr.spriteFrame = null;
    this.parent = null;
    this.frameNode.parent = null;
    this.name = '';
    this.frameArr = null;
    this.actionObj = null;
    this.eventObj = null;
    this.tagObj = null;
    this.spriteArr = null;
    this.cFrame = 0;
    this.rect = null;
    this.SpriteObj = null;
    this.frameNode.destroy();
    this.destroy();
  },
  gotoAndPlay: function gotoAndPlay(frame) {
    if (frame != null) {
      if (typeof frame == 'number') {
        if (frame % 1 == 0) {
          var f = frame - 1;

          if (f > -1 && f < this.totalFrame) {
            this.stopBo = false;
            this.offBo = false;
            this.cFrame = f;
            this.onHitComponent();
            this.setActionObj(this.cFrame);
          }
        }
      } else {
        if (this.tagObj[frame] != null) {
          this.stopBo = false;
          this.offBo = false;
          this.cFrame = this.tagObj[frame];
          this.onHitComponent();
          this.setActionObj(this.tagObj[frame]);
        }
      }
    }
  },
  gotoAndStop: function gotoAndStop(frame) {
    if (frame != null) {
      if (typeof frame == 'number') {
        if (frame % 1 == 0) {
          var f = frame - 1;

          if (f > -1 && f < this.totalFrame) {
            this.stopBo = true;
            this.offBo = false;
            this.cFrame = f;
            this.onHitComponent();
            this.setActionObj(this.cFrame);
          }
        }
      } else {
        if (this.tagObj[frame] != null) {
          this.stopBo = true;
          this.offBo = false;
          this.cFrame = this.tagObj[frame];
          this.onHitComponent();
          this.setActionObj(this.tagObj[frame]);
        }
      }
    }
  },
  play: function play() {
    this.stopBo = false;
    this.offBo = false;
    this.cFrame++;
    var zhen = this.cFrame + 1;

    if (zhen < 0) {
      zhen = 0;
    }

    if (zhen >= this.totalFrame) {
      zhen = 0;
    }

    this.cFrame = zhen;
    this.onHitComponent();
    this.setActionObj(this.cFrame);
  },
  stop: function stop() {
    this.offBo = true;
    this.stopBo = true;
  },
  getPraent: function getPraent() {
    if (this._y_parent != null) {
      return this._y_parent.parent;
    } else {
      return this.parent;
    }
  },
  getRect: function getRect() {
    return this.rect;
  },
  setSprite: function setSprite() {
    var spr = this.frameNode.getComponent(cc.Sprite);

    if (this.currentArr.length > 0) {
      spr.spriteFrame = this.SpriteObj[this.spriteArr[this.currentArr[0]][0][1]['Sprite']['spriteFrame']];
      this.frameNode.x = this.currentArr[1];
      this.frameNode.y = this.currentArr[2];
    } else {
      spr.spriteFrame = null;
    }

    if (this.revise) {
      this.frameNode.width += 1;
      this.frameNode.height += 1;
    }
  },
  startYMC: function startYMC() {
    if (this.offBo) {
      return;
    }

    this.cFrame = this.addFrame();
    this.onEventFun();
    this.onHitComponent();

    if (this.frameArr[this.cFrame] != this.currentArr) {
      this.currentArr = this.frameArr[this.cFrame];
      this.setSprite();
    }
  },
  onHitComponent: function onHitComponent() {
    if (this.pz != null) {
      for (var _i3 = 0; _i3 < this.pz.length; _i3++) {
        if (this.pz[_i3][1][this.cFrame] != null) {
          if (!this.pz[_i3][0].enabled) {
            this.pz[_i3][0].enabled = true;
          }

          for (var str in this.pz[_i3][1][this.cFrame]) {
            this.pz[_i3][0][str] = this.pz[_i3][1][this.cFrame][str];
          }
        } else {
          if (this.pz[_i3][0].enabled) {
            this.pz[_i3][0].enabled = false;
          }
        }
      }
    }
  },
  setLocationFun: function setLocationFun(X, Y) {
    this.x = X;
    this.y = Y;
  }
});
cc.Class({
  "extends": cc.Component,
  properties: {
    revise: {
      "default": false,
      tooltip: '当出现透明缝隙时可以开启，该属性会造成所有图块增加一像素的距离，可能会出现衔接问题，所以未出现问题介意不要动'
    },
    //保存贴图的obj，格式为{IDStr：贴图}
    SpriteObj: {
      "default": {},
      visible: false
    },
    //存放除不被记录外的所有Node｛唯一ID:[素材ID,x,y]｝
    nodeAllObj: {
      "default": {},
      visible: false
    },
    ///存放所有地图信息的数组格式：
    ///[
    ///    0.素材数组=[贴图ID,x,y,[绘制的xy]]
    ///    1.IDNode对像={Node唯一ID：Node}
    ///    2.Node池数组=[]
    ///    3.上次使用池对像提取的时间
    ///]
    MapSprArr: {
      "default": [],
      visible: false
    },
    ///保存图层信息的数组，格式为:
    ///[{LayerName：'',""Position:
    ///    {
    ///        x:{整数:{
    ///            y:{整数:[层ID(也是唯一ID)]}
    ///        }
    ///    }
    ///,LayerType:"地形"}]
    LayerArr: {
      "default": [],
      visible: false
    },
    ///参数1-100
    FPS: {
      get: function get() {
        if (this._FPS == null) {
          if (this.FPS2 != null) {
            this._FPS = this.FPS2;
          } else {
            this._FPS = 25;
          }
        }

        return this._FPS;
      },
      set: function set(value) {
        if (typeof value == 'number') {
          var _i4 = Math.floor(value);

          if (_i4 <= 100 && _i4 >= 1) {
            if (this._FPS != null) {
              if (this.timDelay != null) {
                this.unschedule(this.timerFun);
              }

              ;
              this._FPS = _i4;
              this.timDelay = 1 / this._FPS;
              this.schedule(this.timerFun, this.timDelay);
            } else {
              this._FPS = _i4;
            }
          }
        }
      },
      visible: false
    },
    mapCameraNode: {
      get: function get() {
        return this._mapCameraNode;
      },
      set: function set(value) {
        if (this._mapCameraNode == value) {
          return;
        }

        if (value == null) {
          if (this._mapCameraNode != null) {
            this._mapCameraNode.off('position-changed', this.onMapCamera, this);
          }
        } else {
          value.on('position-changed', this.onMapCamera, this);
        }

        this._mapCameraNode = value;
      },
      visible: false
    },
    BGObj: {
      get: function get() {
        return this._BGObj;
      },
      set: function set(value) {
        this._BGObj = value;
      },
      visible: false
    }
  },

  /***********未声明但存在的对像********/
  ///var this.LoadBo=false;素材是否加载完成
  ///var this.LayerNodeArr=[];保存图层Node的数组
  ///var this.LayerNodeObj={};保存图层Node的obj，包含图层宽高
  ///var this.stageRectObj=new cc.Rect();上一次图层node的渲染矩形
  ///var this.stageNodeObj={Node唯一ID：Node};舞台上的Node
  ///var this.pointObj=cc.Vec2();主node或图层node上次移动的点
  ///var this.killArr=[];没有清除的图片ID
  ///var this.killSprArr=[];没有清除的Spr图片ID
  ///var this.mcAllObj={};记录所用的动画
  ///var this.timInt=0;//当前运行的时间
  ///var this.LocObj={};//上次渲染的图场位置
  ///var this.Loading(已加载的贴图数,总贴图数);//上次渲染的图场位置
  ///var this.layerRect={[实际像素rect，图层的块宽度，图层的块高度]}图层里实际node的宽高
  ///var this.flagPoint=cc.Vec2();零点坐标
  ///var this.Init();程序准备完成了执行
  ///this.FPS;帧频
  ///this.mapCameraNode;地图摄像机
  ///var this.timDelay;计时器每次执行的延迟
  ///this.ymcStageArr=[];舞台上的ymc动画
  ///this.MapMcArr={};舞吧上已经有的ymc ID
  ///this.ymcFrameObj={};动画清除时留下的当前帧以及地图运行的时间
  ///this.ymcTimInt=0;动画的时间
  ///this.ymcMapSprArr=[[动画名，动画上的属性]];
  ///this.onLoadYMovieClip(ymc,LayerName,bo:是否第一个加次载);//@public每次动画添加时调用
  ///this.onLoadSprite(node,LayerName);//@public每次图块添加时调用
  ///this.onLoadSpriteParent(node,LayerName,bo:是否第一个加次载);//@public每次组添加时调用
  ///this.killSprite(node,LayerName);//@public图块清除时调用
  ///this.killYMovieClip(node,LayerName);//@public动画清除时调用
  ///this.killSpriteParent(node,LayerName);//@public组清除时调用
  ///this.MapRect;//@public地图的矩形
  ///this.killFrameArr;//清除克隆贴图的frame
  ///this.showNodeObj;//显示在后台的对像Node
  ///this.mcPool;{ID:{timer:使用时间,pool:[]}}
  onLoad2: function onLoad2() {
    this.LocObj = {};
    this.isHit = {};
    this.timInt = 0; //地图运行的时间，以秒为单位

    this.pointObj = {};
    this.stageRectObj = {};
    this.showNodeObj = {};
    this.stageNodeObj = {};
    this.LoadBo = false;
    this.onSrpiteFun();
    this.ymcStageArr = [];
    this.MapMcArr = {};
    this.ymcFrameObj = {};
    this.ymcTimInt = 0;
    this.mcPool = {}; // this.data = new Proxy({x:0,y:0}, {
    //     get: function (target, propKey, receiver) {
    //         return target;
    //     },
    //     set: function (target, propKey, value, receiver) {
    //         console.log(target, propKey, value)
    //     }
    // });

    if (this.timDelay == null) {
      this.timDelay = 1 / this.FPS; //每次执行的延迟

      this.schedule(this.timerFun, this.timDelay);
    }
  },
  timerFun: function timerFun() {
    this.timInt += this.timDelay;

    for (var _i5 = 0; _i5 < this.ymcStageArr.length; _i5++) {
      this.ymcStageArr[_i5].startYMC();
    }

    this.ymcTimInt++;
  },
  showAll: function showAll() {
    this._showAllBo = true;
  },
  addAll: function addAll() {
    console.log("添加了");

    for (var LayerStr in this.nodeAllObj) {
      for (var _i6 = 0; _i6 < this.LayerArr.length; _i6++) {
        if (this.LayerArr[_i6]['LayerName'] == LayerStr) {
          this.LayerArr[_i6]['Position'] = {};

          for (var idStr in this.nodeAllObj[LayerStr]) {
            //  this.Info(LayerStr, idStr, i);
            //  if (this.nodeAllObj[str][idStr][3] == null) { this.nodeAllObj[str][idStr][3] = []; }
            var larr = this.nodeAllObj[LayerStr][idStr];
            this.addNodeChildFun(larr[0], larr[1] - this.flagPoint.x, larr[2] - this.flagPoint.y, _i6, idStr);
          }
        }
      }
    }
  },

  /********设置Node坐标（X,Y）并刷新地图，可以设置为null********/
  //@public
  setLocationFun: function setLocationFun(x, y, nstr, bo) {
    if (!this.LoadBo || this._showAllBo) {
      return;
    }

    if (nstr == null) {
      nstr = "this";
    }

    if (nstr != "this") {
      if (this.LayerNodeObj[nstr] == null) {
        return;
      }
    }

    if (this.pointObj[nstr] == null) {
      this.pointObj[nstr] = new cc.Vec2(this.node.x - 1, this.node.y - 1);
    }

    var n;

    if (nstr == "this") {
      n = this.node;
    } else {
      n = this.LayerNodeObj[nstr];
    }

    if (x != null) {
      n.x = x;
    }

    if (y != null) {
      n.y = y;
    }

    var tX = n.x;
    var tY = n.y;

    if (this._mapCameraNode != null) {
      tX += this._mapCameraNode.x;
      tY += this._mapCameraNode.y;
    } //查看负坐标


    if (this.pointObj[nstr].x != tX || this.pointObj[nstr].y != tY || bo) {
      var dian = n.parent.convertToWorldSpaceAR(cc.v2(n.x, n.y));

      if (this._mapCameraNode == null) {
        this.AddMapChildFun(new cc.Rect((cc.view.getVisibleOrigin().x - dian.x) / this.node.scaleX, (cc.view.getVisibleOrigin().y - dian.y) / this.node.scaleY, cc.view.getVisibleSize().width / this.node.scaleX, cc.view.getVisibleSize().height / this.node.scaleY), nstr);
      } else {
        this.AddMapChildFun(new cc.Rect((cc.view.getVisibleOrigin().x - dian.x + this._mapCameraNode.x) / this.node.scaleX, (cc.view.getVisibleOrigin().y - dian.y + this._mapCameraNode.y) / this.node.scaleY, cc.view.getVisibleSize().width / this.node.scaleX, cc.view.getVisibleSize().height / this.node.scaleY), nstr);
      }

      this.pointObj[nstr].x = tX;
      this.pointObj[nstr].y = tY;
    }
  },
  onMapCamera: function onMapCamera() {
    //摄像机更改事件
    this.setLocationFun();
  },

  /********以舞台坐标缩放地图*******/
  scaleFun: function scaleFun(px, py, tx, ty) {
    if (this.node.scaleX != tx || this.node.scaleY != ty) {
      if (tx >= 0.1 || ty >= 0.1) {
        var p = cc.v2((px - this.node.x) / this.node.scaleX, (py - this.node.y) / this.node.scaleY);
        var p2 = cc.v2(px - p.x, py - p.y);
        this.node.scaleX = tx;
        this.node.scaleY = ty;
        this.setLocationFun(p.x * (this.node.scaleX - 1) * -1 + p2.x, p.y * (this.node.scaleY - 1) * -1 + p2.y, 'this', true);
      }
    }
  },
  //@public
  removeAll: function removeAll() {
    this.unschedule(this.timerFun);

    for (var _i7 = 0; _i7 < this.LayerNodeArr.length; _i7++) {
      this.LayerNodeArr[_i7].destroyAllChildren();

      this.LayerNodeArr[_i7].parent = null;

      this.LayerNodeArr[_i7].destroy();
    }

    for (var _i8 = 0; _i8 < this.MapSprArr.length; _i8++) {
      var arr = this.MapSprArr[_i8][2];

      for (var c = 0; c < arr.length; c++) {
        arr[c].destroy();
      }
    }

    for (var s in this.mcArr) {
      var _arr = this.mcArr[s]['pool'];

      for (var _c = 0; _c < _arr.length; _c++) {
        _arr[_c].removeThis();
      }
    }

    for (var _s = 0; _s < this.killFrameArr.length; _s++) {
      this.killFrameArr[_s].destroy();
    }

    if (this.killSprArr != null) {
      for (var _i9 = 0; _i9 < this.killSprArr.length; _i9++) {
        cc.loader.releaseRes(this.killSprArr[0], cc.SpriteFrame);
      }
    }

    for (var str in this.nodeParentObj) {
      if (this.nodeParentObj[str][7] != null) {
        this.nodeParentObj[str][7].destroy();
      }
    }

    cc.loader.release(this.killArr); //释放贴图

    if (this.pathFind != null) {
      this.node.removeComponent(this.pathFind); //
    }

    if (this.BGObj != null) {
      if (this.BGObj["alt"] != null) {
        cc.loader.releaseRes(this.BGObj['path'] + "/s");
        this.BGObj["alt"] = null;
      }

      for (var _str in this.BGObj['sprite']) {
        cc.loader.releaseAsset(this.BGObj['sprite'][_str]);
      }

      for (var _i10 = 0; _i10 < this.BGObj['pool'].length; _i10++) {
        this.BGObj['pool'][_i10].destroy();
      }

      if (this.BGNode != null) {
        this.BGNode.destroy();
        this.BGNode = null;
      }
    }

    if (this._mapCameraNode != null) {
      this._mapCameraNode.off('position-changed', this.onMapCamera, this); //销毁摄像机上的事件

    }

    this.BGObj = null;
    this.mcArr = null;
    this.pathFind = null;
    this.PathGridObj = null;
    this.killFrameArr = null;
    this.nodeParentObj = null;
    this.SpriteObj = null;
    this.MapSprArr = null;
    this.LayerArr = null;
    this.LayerNodeArr = null;
    this.LayerNodeObj = null;
    this.stageRectObj = null;
    this.stageNodeObj = null;
    this.showNodeObj = null;
    this.killArr = null;
    this.killSprArr = null;
    this.LocObj = null;
    this.Loading = null;
    this.layerRect = null;
    this.Init = null;
    this.onLoadYMovieClip = null;
    this.onLoadSprite = null;
    this.onLoadSpriteParent = null;
    this.killSprite = null;
    this.killSpriteParent = null;
    this.killYMovieClip = null;
    this.ymcAllObj = null;
    this.ymcStageArr = null;
    this.MapMcArr = null;
    this.ymcFrameObj = null;
    this.ymcMapSprArr = null;
  },

  /********返回图层实际对像的数据*******/
  //@public
  getLayerRectFun: function getLayerRectFun(str) {
    if (str != null) {
      return this.layerRect[str][0];
    }
  },
  //@public
  getLayerNodeFun: function getLayerNodeFun(str) {
    if (str != null) {
      return this.LayerNodeObj[str];
    }
  },

  /******清除池中的node********/
  //@public
  killNodePool: function killNodePool(timOrName) {
    if (timOrName == null) {
      return;
    }

    var bo = timOrName.constructor == Number;

    for (var _i11 = 0; _i11 < this.MapSprArr.length; _i11++) {
      var arr = this.MapSprArr[_i11][2];

      if (bo) {
        var id = this.MapSprArr[_i11][3];

        if (this.timInt - id > timOrName) {
          for (var c = 0; c < arr.length; c++) {
            arr[_i11].destroy();
          }

          this.MapSprArr[_i11][2] = [];
        }
      } else {
        var _id = this.MapSprArr[_i11][0];

        if (_id == timOrName) {
          for (var _c2 = 0; _c2 < arr.length; _c2++) {
            arr[_i11].destroy();
          }

          this.MapSprArr[_i11][2] = [];
        }
      }
    }

    for (var str in this.mcPool) {
      var _arr2 = this.mcPool[str]["pool"];

      if (bo) {
        var t = this.mcPool[str]["timer"];

        if (this.timInt - t > timOrName) {
          for (var _c3 = 0; _c3 < _arr2.length; _c3++) {
            _arr2[i].removeThis();
          }

          this.mcPool[str]["pool"] = [];
        }
      } else {
        if (this.mcPool[str]["name"] == timOrName) {
          for (var _c4 = 0; _c4 < _arr2.length; _c4++) {
            _arr2[i].removeThis();
          }

          this.mcPool[str]["pool"] = [];
        }
      }
    }
  },

  /****public****更改替换所有图块*******/
  setSpriteFrame: function setSpriteFrame(path, name, frame) {
    if (this.SpriteObj[path + '-' + name] != null) {
      var pa = this.SpriteObj[path + '-' + name];
      this.SpriteObj[path + '-' + name] = frame;

      for (var _i12 = 0; _i12 < this.LayerNodeArr.length; _i12++) {
        for (var l = 0; l < this.LayerNodeArr[_i12].childrenCount; l++) {
          var n = this.LayerNodeArr[_i12].children[l];
          var spr = n.getComponent(cc.Sprite);

          if (spr != null && spr.spriteFrame == pa) {
            spr.spriteFrame = frame;
          }
        }
      }
    }
  },
  LoadLength: function LoadLength() {
    return this.MapObj['loadLen'];
  },

  /********加载所有贴图********/
  onSrpiteFun: function onSrpiteFun() {
    this.killArr = [];
    this.killSprArr = [];
    this.killFrameArr = [];
    var loadInt = 0;
    var loadLen = this.MapObj['loadLen'];

    var _this = this;

    if (this.BGObj != null) {
      loadLen++;
      cc.loader.loadRes(this.BGObj['path'] + "/s", cc.SpriteAtlas, function (err, atlas) {
        loadInt++;
        _this.BGObj["alt"] = atlas;

        if (_this.Loading != null) {
          _this.Loading(loadInt, loadLen);
        }

        if (loadInt >= loadLen) {
          _this.onLayerFun();
        }
      });

      if (loadLen == 0) {
        return;
      }
    }

    if (loadLen == 0) {
      this.onLayerFun();
      return;
    }

    var fraArr = this.MapObj['fraArr'];
    var atlArr = this.MapObj['atlArr'];
    var rArr = [];

    var _loop = function _loop(str) {
      cc.loader.loadRes(str, cc.SpriteFrame, function (err, spriteFrame) {
        var f = spriteFrame.clone();
        _this.killFrameArr[_this.killFrameArr.length] = f;
        _this.SpriteObj[str + '-' + fraArr[str]] = f;
        _this.killSprArr[_this.killSprArr.length] = [str, spriteFrame];
        f.getTexture().setFilters(cc.Texture2D.Filter.NEAREST, cc.Texture2D.Filter.NEAREST);
        loadInt++;

        if (_this.Loading != null) {
          _this.Loading(loadInt, loadLen);
        }

        if (loadInt >= loadLen) {
          _this.onLayerFun();
        }
      });
    };

    for (var str in fraArr) {
      _loop(str);
    }

    var frame2 = null;

    var _loop2 = function _loop2(str2) {
      cc.loader.loadRes(str2, cc.SpriteAtlas, function (err, atlas) {
        var deps = cc.loader.getDependsRecursively(atlas);

        for (var _i13 = 0; _i13 < atlArr[str2].length; _i13++) {
          frame2 = atlas.getSpriteFrame(atlArr[str2][_i13]);
          _this.killFrameArr[_this.killFrameArr.length] = frame2;
          _this.SpriteObj[str2 + '-' + atlArr[str2][_i13]] = frame2;
        }

        for (var a = 0; a < deps.length; a++) {
          //可否优化?
          _this.killArr[_this.killArr.length] = deps[a];
        }

        loadInt++;

        if (_this.Loading != null) {
          _this.Loading(loadInt, loadLen);
        }

        if (loadInt >= loadLen) {
          _this.onLayerFun();
        }
      });
    };

    for (var str2 in atlArr) {
      _loop2(str2);
    } //cc.loader.release(this.killArr);//释放贴图

  },
  addNode: function addNode(obj, n) {
    var newNode;

    if (n == null) {
      newNode = new cc.Node();
    } else {
      newNode = n;
    }

    newNode.anchorX = 0;
    newNode.anchorY = 1;

    for (var str in obj) {
      if (str == "Collider" || str == "PolygonCollider") {
        this.hitObject(newNode, this.getComponentType(str), obj[str]);
      } else if (str == "Sprite" || str == "Graphics") {
        var SprObj = obj[str];
        var spr = newNode.addComponent(this.getComponentType(str));

        for (var str2 in SprObj) {
          if (str == "Graphics" && str2 == "rect") {
            if (str2 == "rect") {
              spr.rect(SprObj[str2].x, SprObj[str2].y, SprObj[str2].width, SprObj[str2].height);
            }
          } else if (str2 == "spriteFrame") {
            spr[str2] = this.SpriteObj[SprObj[str2]];
          } else if (str2 == "fillColor") {
            spr[str2] = new cc.Color(SprObj[str2].r, SprObj[str2].g, SprObj[str2].b, SprObj[str2].a);
          } else {
            spr[str2] = SprObj[str2];
          }
        }

        if (this.revise) {
          if (str == 'Sprite') {
            newNode.width += 1;
            newNode.height += 1;
            ;
          }
        }

        if (str == "Graphics") {
          spr.fill();
        }
      } else {
        newNode[str] = obj[str];
      }
    }

    return newNode;
  },
  hitObject: function hitObject(newNode, type, arr) {
    for (var _i14 = 0; _i14 < arr.length; _i14++) {
      var spr = newNode.addComponent(type);
      var obj = arr[_i14];

      if (obj['pz'] != null) {
        if (newNode.pz == null) {
          newNode.pz = [];
        }

        newNode.pz[newNode.pz.length] = [spr, obj['pz']];
      }

      for (var str in obj) {
        spr[str] = obj[str];
      }
    }
  },
  getComponentType: function getComponentType(str) {
    if (str == "Sprite") {
      return cc.Sprite;
    } else if (str == "Graphics") {
      return cc.Graphics;
    } else if (str == "Collider") {
      return cc.BoxCollider;
    } else if (str == "PolygonCollider") {
      return cc.PolygonCollider;
    }
  },
  getBGNode: function getBGNode(x, y) {
    var str = this.BGObj["name"] + x + this.BGObj["pname"] + y;
    var n;

    if (this.BGObj['pool'].length > 0) {
      var l = this.BGObj['pool'].length - 1;
      n = this.BGObj['pool'][l];
      this.BGObj['pool'].splice(l, 1);
    } else {
      n = new cc.Node();
      n.spr = n.addComponent(cc.Sprite);
      n.anchorX = 0;
      n.anchorY = 1;
    }

    if (this.BGObj['sprite'][str] != null) {
      n.spr.spriteFrame = this.BGObj['sprite'][str];
    } else {
      this.LoadMapBG(str);
      n.spr.spriteFrame = this.BGObj["alt"].getSpriteFrame(str);

      if (n.spr.spriteFrame == null) {
        console.log("找到空" + str);
      }
    }

    var nx = x * this.BGObj['width'];
    var ny = y * this.BGObj['height'] * -1;
    n.x = nx;
    n.y = ny;
    n.width = this.BGObj['width'];
    n.height = this.BGObj['height'];
    n.parent = this.BGNode;
    this.BGObj["stageNode"][str] = n;
  },
  BGInit: function BGInit() {
    if (this.BGObj == null) {
      return;
    }

    this.BGObj['rect'] = new cc.Rect(this.BGObj['x'], this.BGObj['y'], this.BGObj['width'] * this.BGObj['nx'], this.BGObj['height'] * this.BGObj['ny']);
    this.BGObj['pool'] = [];
    this.BGObj['sprite'] = {};
    this.BGObj["length"] = this.BGObj['nx'] * this.BGObj['ny'];
    this.BGObj["loadArr"] = [];
    this.BGObj["loadObj"] = {};
    this.BGObj["stageNode"] = {};
    this.BGObj["rect2"] = null;
    this.BGObj["loadBo"] = false;
    this.BGNode = new cc.Node();
    this.BGNode.zIndex = -1;
    this.BGNode.x = this.BGObj['x'];
    this.BGNode.y = this.BGObj['y'];
    this.BGNode.parent = this.node;

    for (var w = 0; w < this.BGObj['nx']; w++) {
      for (var h = 0; h < this.BGObj['ny']; h++) {
        var str = this.BGObj["name"] + w + this.BGObj["pname"] + h;
        this.BGObj["loadArr"][this.BGObj["loadArr"].length] = str;
        this.BGObj["loadObj"][str] = false;
      }
    }

    this.LoadMapBG(null, true);
  },
  getBGID: function getBGID() {
    var id = this.BGObj["loadArr"].length - 1;
    var str = this.BGObj["loadArr"][id];
    this.BGObj["loadArr"].splice(id, 1);
    return str;
  },
  LoadMapBG: function LoadMapBG(str, bo) {
    if (this.BGObj == null || this.BGObj["length"] == 0) {
      return;
    }

    var _this = this;

    if (bo) {
      if (this.BGObj["loadArr"].length > 0) {
        str = this.getBGID();

        while (this.BGObj["stageNode"][str] != null) {
          str = this.getBGID();
          ;
        }
      } else {
        return;
      }
    }

    if (!this.BGObj["loadObj"][str]) {
      this.BGObj["loadObj"][str] = true;
    } else {
      return;
    }

    cc.loader.loadRes(this.BGObj['path'] + "/" + str, cc.SpriteFrame, function (err, spriteFrame) {
      if (err) {
        return;
      }

      if (_this.BGObj == null) {
        cc.loader.releaseAsset(spriteFrame);
        return;
      }

      _this.BGObj['sprite'][str] = spriteFrame;

      if (_this.BGObj["stageNode"][str] != null) {
        _this.BGObj["stageNode"][str].spr.spriteFrame = spriteFrame;
      }

      _this.BGObj["length"]--;

      if (_this.BGObj["length"] == 0) {
        cc.loader.releaseRes(_this.BGObj['path'] + "/s");
        _this.BGObj["alt"] = null;
        this.BGObj["loadObj"] = null;
      } else {
        if (bo) {
          _this.LoadMapBG(null, true);
        }
      }
    });
  },
  AddMapBG: function AddMapBG(rect) {
    var pw = this.BGObj['width'];
    var ph = this.BGObj['height'];
    this.BGObj['rect'].x = 0;
    this.BGObj['rect'].y = 0;
    var intersection = new cc.Rect();
    this.BGObj['rect'].intersection(intersection, new cc.Rect(rect.x - this.BGNode.x, rect.y * -1 - rect.height - this.BGNode.y * -1, rect.width, rect.height));
    var cx = Math.floor(intersection.x / pw);
    var cy = Math.floor(intersection.y / ph);
    var cw = Math.ceil((intersection.x + intersection.width) / pw);
    var ch = Math.ceil((intersection.y + intersection.height) / ph);

    if (cx < 0) {
      cx = 0;
    }

    if (cy < 0) {
      cy = 0;
    }

    if (cw >= this.BGObj['nx']) {
      cw = this.BGObj['nx'] - 1;
    }

    if (ch >= this.BGObj['ny']) {
      ch = this.BGObj['ny'] - 1;
    }

    if (this.BGObj["rect2"] != null) {
      var rArr = this.getHitRectObj(this.BGObj["rect2"], new cc.Rect(cx, cy, cw - cx, ch - cy));

      for (var o = 0; o < rArr.length; o++) {
        var cx2 = rArr[o].x;
        var cy2 = rArr[o].y;
        var cw2 = rArr[o].width + rArr[o].x;
        var ch2 = rArr[o].height + rArr[o].y;

        for (var x = cx2; x < cw2; x++) {
          for (var y = cy2; y < ch2; y++) {
            var nx = x * pw;
            var ny = y * ph * -1;
            var str = this.BGObj["name"] + x + this.BGObj["pname"] + y;

            if (this.BGObj["stageNode"][str] != null) {
              this.BGObj["stageNode"][str].parent = null;
              this.BGObj['pool'].push(this.BGObj["stageNode"][str]);
              delete this.BGObj["stageNode"][str];
            }
          }
        }
      }

      if (intersection.width > 0 && intersection.height > 0) {
        var _rArr = this.getHitRectObj(new cc.Rect(cx, cy, cw - cx, ch - cy), this.BGObj["rect2"]);

        for (var _o = 0; _o < _rArr.length; _o++) {
          this.fBG(_rArr[_o].x, _rArr[_o].y, _rArr[_o].width + _rArr[_o].x, _rArr[_o].height + _rArr[_o].y);
        }
      }
    } else {
      this.fBG(cx, cy, cw, ch);
    }

    if (this.BGNode.childrenCount > 0) {
      this.BGObj["rect2"] = new cc.Rect(cx, cy, cw - cx, ch - cy);
    } else {
      this.BGObj["rect2"] = null;
    }
  },
  fBG: function fBG(cx, cy, cw, ch) {
    for (var w = cx; w <= cw; w++) {
      for (var h = cy; h <= ch; h++) {
        this.getBGNode(w, h);
      }
    }
  },
  AddMapChildFun: function AddMapChildFun(rect, nstr) {
    if (this.BGObj != null) {
      this.AddMapBG(rect);
    }

    if (nstr != "this") {
      if (this.LayerNodeObj[nstr] == null) {
        return;
      }
    }

    var jlObj = {};

    for (var _i15 = 0; _i15 < this.LayerArr.length; _i15++) {
      if (nstr != "this") {
        if (this.LayerNodeArr[_i15].name != nstr) {
          continue;
        }
      }

      var n = this.LayerNodeArr[_i15];
      var pw = this.layerRect[n.name][1];
      var ph = this.layerRect[n.name][2];
      var cx = Math.floor((rect.x + this.flagPoint.x) / pw);
      var cy = Math.floor((rect.y + this.flagPoint.y) / ph) + 1;
      var cw = Math.ceil((rect.x + this.flagPoint.x + rect.width - cx * pw) / pw);
      var ch = Math.ceil((rect.y + this.flagPoint.y + rect.height - cy * ph) / ph) + 1;
      var rArr = [];

      if (this.stageRectObj[n.name] != null) {
        var r2 = this.stageRectObj[n.name];

        if (cx != r2.x || cy != r2.y || cw != r2.width || ch != r2.height) {
          rArr = this.getHitRectObj(new cc.Rect(cx, cy, cw, ch), r2);

          if (this.LayerNodeArr[_i15].parent != null) {
            this.removeNodeChildFun(this.getHitRectObj(r2, new cc.Rect(cx, cy, cw, ch)), new cc.Rect(cc.view.getVisibleOrigin().x, cc.view.getVisibleOrigin().y, cc.view.getVisibleSize().width, cc.view.getVisibleSize().height), n.name);
            this.stageRectObj[n.name] = new cc.Rect(cx, cy, cw, ch);
          } else {
            this.removeNodeChildFun([r2], new cc.Rect(), n.name);
            this.stageRectObj[n.name] = null;
            continue; //不在舞台之中时，只删不加
          }
        } else {
            continue; //覆盖跳过
          }
      } else {
        if (this.LayerNodeArr[_i15].parent != null) {
          this.stageRectObj[n.name] = new cc.Rect(cx, cy, cw, ch);
          rArr = [new cc.Rect(cx, cy, cw, ch)];
        } else {
          continue; //不在舞台之中时，空也不添加
        }
      }

      for (var o = 0; o < rArr.length; o++) {
        cx = rArr[o].x;
        cy = rArr[o].y;
        cw = rArr[o].width;
        ch = rArr[o].height;
        var obj = this.LayerArr[_i15]["Position"];
        jlObj[this.LayerNodeArr[_i15].name] = {};

        for (var w = 0; w < cw; w++) {
          var nx = cx * pw + w * pw;

          for (var h = 0; h < ch; h++) {
            var ny = cy * ph + h * ph;

            if (obj[nx] != null) {
              if (obj[nx][ny] != null) {
                jlObj[this.LayerNodeArr[_i15].name][nx + " + " + ny] = 0;
                var sxArr = obj[nx][ny];

                for (var t = 0; t < sxArr.length; t++) {
                  var id = sxArr[t];
                  var larr = this.nodeAllObj[this.LayerNodeArr[_i15].name][id];
                  this.addNodeChildFun(larr[0], larr[1] - this.flagPoint.x, larr[2] - this.flagPoint.y, _i15, id);
                }
              }
            }
          }
        }
      }
    }
  },

  /*******返回两个rect相交之外的rect数组，最多返回四个***********/
  getHitRectObj: function getHitRectObj(r1, r2) {
    if (r1.x + r1.width <= r2.x || r2.x + r2.width <= r1.x || r1.y + r1.height <= r2.y || r2.y + r2.height <= r1.y) {
      //没有相交
      return [r1];
    } else {
      var arr = [];

      if (r1.x < r2.x) {
        //左下
        var rzx = new cc.Rect(r1.x, r1.y, r2.x - r1.x, 0);

        if (r2.y + r2.height < r1.y + r1.height) {
          rzx.height = r2.y + r2.height - r1.y;
        } else {
          rzx.height = r1.height;
        }

        arr[arr.length] = rzx;
      }

      if (r1.y + r1.height > r2.y + r2.height) {
        //左上
        var rzs = new cc.Rect(r1.x, r2.y + r2.height, 0, r1.y + r1.height - (r2.y + r2.height));

        if (r2.x + r2.width < r1.x + r1.width) {
          rzs.width = r2.x + r2.width - r1.x;
        } else {
          rzs.width = r1.width;
        }

        arr[arr.length] = rzs;
      }

      if (r1.y < r2.y) {
        //右下
        var ryx = new cc.Rect(0, r1.y, 0, r2.y - r1.y);

        if (r2.x > r1.x) {
          ryx.x = r2.x;
        } else {
          ryx.x = r1.x;
        }

        ryx.width = r1.x + r1.width - ryx.x;
        arr[arr.length] = ryx;
      }

      if (r1.x + r1.width > r2.x + r2.width) {
        //右上
        var rys = new cc.Rect(r2.x + r2.width, 0, r1.x + r1.width - (r2.x + r2.width), 0);

        if (r2.y > r1.y) {
          rys.y = r2.y;
        } else {
          rys.y = r1.y;
        }

        rys.height = r1.y + r1.height - rys.y;
        arr[arr.length] = rys;
      }

      return arr;
    }
  },
  addNodeChildFun: function addNodeChildFun(id, x, y, tcID, NodeID) {
    var r;
    var pw = this.layerRect[this.LayerNodeArr[tcID].name][1];
    var ph = this.layerRect[this.LayerNodeArr[tcID].name][2];
    var mcBo = false;
    var lBo = false;
    var zNode = null;
    var parBo = false;

    if (typeof id == 'number') {
      var arr = this.MapSprArr[id];

      if (arr[1][NodeID + ''] != null) {
        return;
      }

      var nArr = arr[0];

      var _newNode;

      if (arr[2].length > 0) {
        var l = arr[2].length - 1;
        _newNode = arr[2][l];
        arr[2].splice(l, 1);
        arr[3] = this.timInt; //重置池

        _newNode.x = x;
        _newNode.y = y;
        _newNode.zIndex = NodeID; //  newNode.parent=this.LayerNodeArr[tcID];

        arr[1][NodeID + ''] = _newNode;
      } else {
        if (nArr.length >= 5) {
          _newNode = this.addNode(this.extend({
            "name": nArr[0],
            "x": x,
            "y": y,
            "rotation": nArr[4],
            "zIndex": NodeID
          }, nArr[1]));
        } else {
          _newNode = this.addNode(this.extend({
            "name": nArr[0],
            "x": x,
            "y": y,
            "zIndex": NodeID
          }, nArr[1]));
        }

        arr[1][NodeID + ''] = _newNode;
      }

      _newNode.scaleX = 1;
      _newNode.scaleY = 1;
      r = new cc.Rect(_newNode.x, _newNode.y, nArr[2], nArr[3]);

      if (nArr.length >= 5 || this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''].length >= 4) {
        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][0] != null) {
          r.x = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][0] - this.flagPoint.x;
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][1] != null) {
          r.y = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][1] - this.flagPoint.y;
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][2] != null) {
          _newNode.opacity = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][2];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][4] != null) {
          _newNode.scaleX = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][4];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][5] != null) {
          _newNode.scaleY = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][5];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][3] != null) {
          parBo = true;
          this.addNodeParent(_newNode, this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][3], tcID);
        }
      }

      _newNode.color = new cc.Color(255, 255, 255);
      _newNode.bID = [NodeID, this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''], r];
      zNode = _newNode;
      _newNode["Info"] = this.infoObj[NodeID];

      if (!parBo) {
        _newNode.parent = this.LayerNodeArr[tcID];
      }

      _newNode.mapLayerName = _newNode.parent.name;
      this.showNodeObj[NodeID] = _newNode;
    } else {
      if (this.MapMcArr[NodeID + ''] != null) {
        return;
      }

      mcBo = true;
      var strID = this.ymcMapSprArr[id][0];

      if (this.mcPool[id] == null) {
        this.mcPool[id] = {};
        this.mcPool[id]["pool"] = [];
        this.mcPool[id]["name"] = strID;
      }

      this.mcPool[id]["timer"] = this.timInt;
      var ymc;
      var pbo = false;

      if (this.mcPool[id]["pool"].length <= 0) {
        ymc = new YMovieClip();
      } else {
        var _l = this.mcPool[id]["pool"].length - 1;

        ymc = this.mcPool[id]["pool"][_l];
        this.mcPool[id]["pool"].splice(_l, 1);
        pbo = true;
      }

      ymc.pid = id;
      var eObj = {};

      for (var eStr in this.ymcAllObj[strID][2]) {
        for (var vStr in this.ymcAllObj[strID][2][eStr]) {
          eObj[eStr] = {};
          eObj[eStr][vStr] = null;
        }
      }

      if (!pbo) {
        ymc.Init(null, strID, this.ymcAllObj[strID][0], this.ymcAllObj[strID][1], eObj, this.ymcAllObj[strID][3], this.ymcAllObj[strID][4], this.MapSprArr, this.SpriteObj, this.revise);
        this.addNode(this.ymcMapSprArr[id][1], ymc);
      } else {
        ymc.Init2(this.ymcAllObj[strID][3], this.MapSprArr, this.SpriteObj, this.revise);
      }

      ymc.setLocationFun(x, y);

      if (this.ymcFrameObj[NodeID + ''] == null) {
        lBo = true;
        ymc.setFrame(0, this.ymcTimInt, 0, false, false);
      } else {
        ymc.setFrame(this.ymcFrameObj[NodeID + ''][0], this.ymcTimInt, this.ymcFrameObj[NodeID + ''][1], this.ymcFrameObj[NodeID + ''][2], this.ymcFrameObj[NodeID + ''][3]);
      }

      this.ymcStageArr[this.ymcStageArr.length] = ymc;
      this.MapMcArr[NodeID + ''] = ymc;
      ymc.zIndex = NodeID;
      r = new cc.Rect(ymc.x + ymc.getRect().x, ymc.y + ymc.getRect().y, ymc.getRect().width, ymc.getRect().height);
      id = ymc;

      if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''].length >= 4) {
        //动画暂时不支持旋转，所以理论上不用添加0和1
        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][2] != null) {
          ymc.opacity = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][2];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][4] != null) {
          newNode.scaleX = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][4];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][5] != null) {
          newNode.scaleY = this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][5];
        }

        if (this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][3] != null) {
          parBo = true;
          this.addNodeParent(ymc, this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''][3][3], tcID);
        }
      }

      ymc.color = new cc.Color(255, 255, 255);
      ymc.bID = [NodeID, this.nodeAllObj[this.LayerNodeArr[tcID].name][NodeID + ''], r];
      ymc.info = this.infoObj[NodeID];

      if (!parBo) {
        ymc.parent = this.LayerNodeArr[tcID];
      }

      ymc.mapLayerName = ymc.parent.name;
      this.showNodeObj[NodeID] = ymc;
      zNode = ymc;
    }

    this.setStageNodeInfo(this.LayerNodeArr[tcID].name, NodeID, pw, ph, false);

    if (mcBo) {
      if (this.onLoadYMovieClip != null) {
        this.onLoadYMovieClip(zNode, this.LayerNodeArr[tcID].name, lBo);
      }
    } else {
      if (this.onLoadSprite != null) {
        this.onLoadSprite(zNode, this.LayerNodeArr[tcID].name);
      }
    }
  },

  /*************组合多个Node********/
  addNodeParent: function addNodeParent(node, id, tcID) {
    if (this.nodeParentObj[id] != null) {
      if (this.nodeParentObj[id][7] == null) {
        var pnode = this.addNode(this.extend({
          'name': this.nodeParentObj[id][0],
          'x': this.nodeParentObj[id][1] - this.flagPoint.x,
          'y': this.nodeParentObj[id][2] - this.flagPoint.y,
          'zIndex': this.nodeParentObj[id][5] + 0.5,
          'parent': this.LayerNodeArr[tcID]
        }, this.nodeParentObj[id][6]));
        node._y_parent = pnode;
        node.parent = pnode;
        this.nodeParentObj[id][7] = pnode;
        node.x -= pnode.x;
        node.y -= pnode.y;
        pnode.zIndex = node.zIndex;

        if (this.onLoadSpriteParent != null) {
          this.onLoadSpriteParent(pnode, this.LayerNodeArr[tcID].name, true);
        }
      } else {
        node._y_parent = this.nodeParentObj[id][7];
        node.parent = this.nodeParentObj[id][7];
        node.x -= this.nodeParentObj[id][7].x;
        node.y -= this.nodeParentObj[id][7].y;

        if (this.nodeParentObj[id][7].parent == null) {
          this.nodeParentObj[id][7].parent = this.LayerNodeArr[tcID];
          this.nodeParentObj[id][7].zIndex = node.zIndex;

          if (this.onLoadSpriteParent != null) {
            this.onLoadSpriteParent(this.nodeParentObj[id][7], this.LayerNodeArr[tcID].name, false);
          }
        }
      }
    }

    node._y_parID = id;
  },

  /****publice***设置更改动画帧*注意一旦用此方法，那么动画的onLoadYMovieClip中的是否第一次加载参数将为flash*****/
  setYMovieClipFrame: function setYMovieClipFrame(nodeID, frame, pBo) {
    if (this.showNodeObj[nodeID] != null) {
      if (pBo) {
        if (this.showNodeObj[nodeID].gotoAndPlay != null) {
          this.showNodeObj[nodeID].gotoAndPlay(frame);
        }
      } else {
        if (this.showNodeObj[nodeID].gotoAndStop != null) {
          this.showNodeObj[nodeID].gotoAndStop(frame);
        }
      }
    } else {
      if (typeof frame == 'number') {
        if (frame > 0) {
          frame -= 1;
        }
      } else {
        for (var str in this.nodeAllObj) {
          if (this.nodeAllObj[str][nodeID]) {
            frame = this.ymcAllObj[this.ymcMapSprArr[this.nodeAllObj[str][nodeID][0]][0]][4][frame];
            break;
          }
        }

        if (frame == null) {
          return;
        }
      }

      if (pBo) {
        this.ymcFrameObj[nodeID] = [frame, this.ymcTimInt, false, false];
      } else {
        this.ymcFrameObj[nodeID] = [frame, this.ymcTimInt, true, true];
      }
    }
  },

  /*************清除组合的父级Node********/
  removeNodeParent: function removeNodeParent(node, str) {
    if (node._y_parent != null) {
      if (node._y_parent.childrenCount == 0) {
        node._y_parent.parent = null;

        if (this.killSpriteParent != null) {
          this.onLoadSpriteParent(node._y_parent, str);
        }
      }

      node._y_parent = null;
    }

    if (node._y_parID != null) {
      node._y_parID = null;
    }
  },

  /*********将node添加到舞台对像中**********/
  addStageNodeObjFun: function addStageNodeObjFun(tcName, nodeID, nhStr) {
    if (this.stageNodeObj[tcName] == null) {
      this.stageNodeObj[tcName] = {};
    }

    if (this.stageNodeObj[tcName][nhStr] == null) {
      this.stageNodeObj[tcName][nhStr] = {};
    }

    if (this.stageNodeObj[tcName][nhStr][nodeID] === undefined) {
      this.stageNodeObj[tcName][nhStr][nodeID] = null;
    }
  },
  extend: function extend(obj1, obj2) {
    for (var key in obj2) {
      obj1[key] = obj2[key];
    }

    return obj1;
  },

  /***public******通坐标返回某块区域内的所有node**********/
  getNodesByLocation: function getNodesByLocation(LayerName, x, y) {
    var obj = this.stageNodeObj[LayerName];
    var arr = [];

    if (obj != null) {
      var pw = this.layerRect[LayerName][1];
      var ph = this.layerRect[LayerName][2];
      var nx = Math.floor((x + this.flagPoint.x) / pw) * pw;
      var ny = Math.ceil((y + this.flagPoint.y) / ph) * ph;

      if (obj[nx + '-' + ny] != null) {
        var sarr = this.stageNodeObj[LayerName][nx + '-' + ny];

        if (sarr != null) {
          for (var str in sarr) {
            if (this.showNodeObj[str] != null) {
              arr[arr.length] = this.showNodeObj[str];
            }
          }
        }
      }
    }

    return arr;
  },

  /***public******通坐标返回某块区域内的最顶部的node**********/
  getTopNodeByLocation: function getTopNodeByLocation(LayerName, x, y) {
    var obj = this.stageNodeObj[LayerName];
    var node;

    if (obj != null) {
      var pw = this.layerRect[LayerName][1];
      var ph = this.layerRect[LayerName][2];
      var nx = Math.floor((x + this.flagPoint.x) / pw) * pw;
      var ny = Math.ceil((y + this.flagPoint.y) / ph) * ph;

      if (obj[nx + '-' + ny] != null) {
        var sarr = this.stageNodeObj[LayerName][nx + '-' + ny];

        if (sarr != null) {
          for (var str in sarr) {
            if (this.showNodeObj[str] != null) {
              if (node == null) {
                ;
                node = this.showNodeObj[str];
              } else {
                if (node.zInde < this.showNodeObj[str].zIndex) {
                  node = this.showNodeObj[str];
                }
              }

              ;
            }
          }
        }
      }
    }

    return node;
  },

  /****public*****将图块node信息添加到地图中,参数1 可以是ID也可以图块Node**********/
  addMapNode: function addMapNode(n, LayerName, x, y) {
    var id = null;
    var nBo = false;

    if (n instanceof cc.Node) {
      if (n.bID == null) {
        return false;
      }

      id = n.bID[0];
      nBo = true;
    } else {
      if (typeof n == 'number') {
        id = n;
      } else {
        return false;
      }
    }

    if (this.nodeAllObj[LayerName] == null) {
      return false;
    }

    var pw = this.layerRect[LayerName][1];
    var ph = this.layerRect[LayerName][2];
    var i = -1;

    if (this.LayerNodeObj[LayerName] != null) {
      i = this.LayerNodeObj[LayerName].LayerArrID;
    } else {
      return false;
    }

    var nArr = null;

    for (var str in this.nodeAllObj) {
      if (str != LayerName) {
        if (this.nodeAllObj[str][id] != null) {
          nArr = this.nodeAllObj[str][id];
          this.setStageNodeInfo(str, id, this.layerRect[str][1], this.layerRect[str][2], true);
          this.Info(str, id, i, null, true); //清除地图中的信息

          delete this.nodeAllObj[str][id];
        }
      }
    }

    if (nArr != null) {
      this.nodeAllObj[LayerName][id] = nArr;
      this.setStageNodeInfo(LayerName, id, pw, ph, true);
      this.Info(LayerName, id, i, null, true); //清除地图中的信息
    }

    var mcBo = false;

    if (typeof this.nodeAllObj[LayerName][id][0] != 'number') {
      mcBo = true;
    }

    var node = this.showNodeObj[id];

    if (x == null) {
      x = this.nodeAllObj[LayerName][id][1] - this.flagPoint.x;
    }

    if (y == null) {
      y = this.nodeAllObj[LayerName][id][2] - this.flagPoint.y;
    }

    var ix = this.nodeAllObj[LayerName][id][1] - this.flagPoint.x;
    var iy = this.nodeAllObj[LayerName][id][2] - this.flagPoint.y;

    var _this = this;

    this.setNodeLocation(LayerName, id, x + _this.flagPoint.x, y + _this.flagPoint.y, node);
    this.Info(LayerName, id, i, function (lx, ly, jx) {
      //添加地图中的信息
      var stageRect = new cc.Rect(cc.view.getVisibleOrigin().x, cc.view.getVisibleOrigin().y, cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
      var nXY = new cc.Vec2(jx.x - _this.flagPoint.x, jx.y - _this.flagPoint.y);
      var rect = new cc.Rect(0, 0, jx.width * this.node.scaleX, jx.height * this.node.scaleY);

      var dian = _this.LayerNodeObj[LayerName].convertToWorldSpaceAR(cc.v2(nXY.x, nXY.y));

      rect.x = dian.x;
      rect.y = dian.y * -1;
      var r1 = rect;
      var r2 = new cc.Rect(stageRect.x, stageRect.y - stageRect.height, stageRect.width, stageRect.height);

      if (r1.x + r1.width <= r2.x || r2.x + r2.width <= r1.x || r1.y + r1.height <= r2.y || r2.y + r2.height <= r1.y) {
        //这里应该必要
        if (_this.showNodeObj[id] != null) {
          _this.killStageNode(LayerName, _this.showNodeObj[id], id, mcBo);
        }
      } else {
        if (_this.showNodeObj[id] != null) {
          _this.showNodeObj[id].x = x;
          _this.showNodeObj[id].y = y;

          _this.setStageNodeInfo(LayerName, id, pw, ph, false);
        } else {
          if (_this.LayerNodeArr[i].parent != null) {
            _this.addNodeChildFun(_this.nodeAllObj[LayerName][id][0], x - _this.flagPoint.x, y - _this.flagPoint.y, i, id);
          }
        }
      }
    });

    if (nBo) {
      n.destroy();
    }

    return true;
  },

  /*********删除舞台外面的对像**********/
  removeNodeChildFun: function removeNodeChildFun(rArr, stageRect, nStr) {
    for (var _i16 = 0; _i16 < this.LayerNodeArr.length; _i16++) {
      if (nStr != 'this') {
        if (this.LayerNodeArr[_i16].name != nStr) {
          continue;
        }
      }

      for (var o = 0; o < rArr.length; o++) {
        var pw = this.layerRect[this.LayerNodeArr[_i16].name][1];
        var ph = this.layerRect[this.LayerNodeArr[_i16].name][2];
        var cx = rArr[o].x;
        var cy = rArr[o].y;
        var cw = rArr[o].width;
        var ch = rArr[o].height;
        var obj = this.stageNodeObj[this.LayerNodeArr[_i16].name];

        if (obj == null) {
          continue;
        }

        for (var w = 0; w < cw; w++) {
          for (var h = 0; h < ch; h++) {
            var nx = cx * pw + w * pw;
            var ny = cy * ph + h * ph;

            if (obj[nx + "-" + ny] != null) {
              var sarr = this.stageNodeObj[this.LayerNodeArr[_i16].name][nx + "-" + ny];

              if (sarr == null) {
                continue;
              }

              for (var str in sarr) {
                this.removeStageNode(str, stageRect);
              }
            }
          }
        }
      }
    }
  },

  /************清除舞台上单个Node*************/
  removeStageNode: function removeStageNode(nodeID, stageRect) {
    var n = this.showNodeObj[nodeID];

    if (n == null) {
      return;
    }

    var nRect = n.bID[2];
    var nPar;
    var mcBo = false;

    if (typeof n.bID[1][0] == 'number') {
      if (n._y_parent != null) {
        nPar = n._y_parent.parent;
      } else {
        nPar = n.parent;
      }
    } else {
      nPar = n.getPraent();
      mcBo = true;
    }

    if (nPar == null) {
      return;
    }

    var layerName = nPar.name;
    var pw = this.layerRect[layerName][1];
    var ph = this.layerRect[layerName][2];
    var nXY = new cc.Vec2(nRect.x, nRect.y);
    var dian = nPar.convertToWorldSpaceAR(cc.v2(n.MRect.x * pw - this.flagPoint.x, n.MRect.y * ph - this.flagPoint.y));
    var r1 = new cc.Rect(dian.x, dian.y * -1, (n.MRect.width - n.MRect.x + 1) * pw * this.node.scaleX, (n.MRect.y - n.MRect.height + 1) * ph * this.node.scaleY);
    var r2 = new cc.Rect(stageRect.x, stageRect.y - stageRect.height, stageRect.width, stageRect.height);

    if (r1.x + r1.width <= r2.x || r2.x + r2.width <= r1.x || r1.y + r1.height <= r2.y || r2.y + r2.height <= r1.y) {
      //这里应该必要
      this.setStageNodeInfo(layerName, nodeID, pw, ph, true);
    } else {
      return;
    }

    this.killStageNode(layerName, n, nodeID, mcBo);
  },

  /*public*****获得地图Node信息,第一个参数可以Node也可以是ID*******/
  getMapNodeObj: function getMapNodeObj(IDorN, LayerName) {
    var nodeID = null;

    if (IDorN instanceof cc.Node) {
      nodeID = IDorN.bID[0];
      LayerName = IDorN.mapLayerName;
    } else {
      nodeID = IDorN;
    }

    if (LayerName == null) {
      for (var str in this.nodeAllObj) {
        if (this.nodeAllObj[str][nodeID] != null) {
          LayerName = str;
          break;
        }
      }
    }

    if (LayerName == null) {
      return null;
    }

    var obj = {};

    if (typeof this.nodeAllObj[LayerName][nodeID][0] == 'number') {
      obj['name'] = this.MapSprArr[this.nodeAllObj[LayerName][nodeID][0]][0];
    } else {
      obj['name'] = this.ymcMapSprArr[this.nodeAllObj[LayerName][nodeID][0]][0];
    }

    obj['LayerName'] = LayerName;
    obj['id'] = nodeID;
    obj['x'] = this.nodeAllObj[LayerName][nodeID][1] - this.flagPoint.x;
    obj['y'] = this.nodeAllObj[LayerName][nodeID][2] - this.flagPoint.y;
    obj['sx'] = this.nodeAllObj[LayerName][nodeID][3][4] != null ? this.nodeAllObj[LayerName][nodeID][3][4] : 1;
    obj['sy'] = this.nodeAllObj[LayerName][nodeID][3][5] != null ? this.nodeAllObj[LayerName][nodeID][3][5] : 1;
    return obj;
  },
  getShadow: function getShadow(IDorN, LayerName) {
    var _this2 = this;

    var obj = this.getMapNodeObj(IDorN, LayerName);
    return new Proxy(obj, {
      get: function get(target, propKey, receiver) {
        return target[propKey];
      },
      set: function set(target, propKey, value, receiver) {
        target[propKey] = value;

        _this2.setMapLocation(target['id'], target, obj['LayerName']);

        return true;
      }
    });
  },

  /****public****坐标更改******Bo 加等还是更改***/
  setMapLocation: function setMapLocation(n, lObj, LayerName, Bo) {
    var id = -1;
    var mcBo = false;
    var x = lObj['x'];
    var y = lObj['y'];
    var sx = lObj['sx'];
    var sy = lObj['sy'];

    if (n instanceof cc.Node) {
      LayerName = newNode.mapLayerName;

      if (n.bID != null) {
        id = n.bID[0];
      } else {
        return;
      }
    } else {
      id = n;
    }

    if (id == -1) {
      return;
    }

    if (LayerName == null) {
      for (var str in this.nodeAllObj) {
        if (this.nodeAllObj[str][id] != null) {
          LayerName = str;
          break;
        }
      }
    }

    if (LayerName == null) {
      return;
    }

    var i = -1;

    if (this.LayerNodeObj[LayerName] != null) {
      i = this.LayerNodeObj[LayerName].LayerArrID;
    } else {
      return;
    }

    if (typeof this.nodeAllObj[LayerName][id][0] != 'number') {
      mcBo = true;
    }

    var node = this.showNodeObj[id];
    var pw = this.layerRect[LayerName][1];
    var ph = this.layerRect[LayerName][2];

    if (x == null) {
      x = this.nodeAllObj[LayerName][id][1] - this.flagPoint.x;
    } else if (Bo) {
      x = this.nodeAllObj[LayerName][id][1] - this.flagPoint.x + x;
    }

    if (y == null) {
      y = this.nodeAllObj[LayerName][id][2] - this.flagPoint.y;
    } else if (Bo) {
      y = this.nodeAllObj[LayerName][id][2] - this.flagPoint.y + y;
    }

    var ix = this.nodeAllObj[LayerName][id][1] - this.flagPoint.x;
    var iy = this.nodeAllObj[LayerName][id][2] - this.flagPoint.y;

    var _this = this;

    var ggBo = false;
    var lx = this.nodeAllObj[LayerName][id][3][4] == null ? 1 : this.nodeAllObj[LayerName][id][3][4];
    var ly = this.nodeAllObj[LayerName][id][3][5] == null ? 1 : this.nodeAllObj[LayerName][id][3][5];

    if (sx != null && sx != lx) {
      ggBo = true;
    }

    if (sy != null && sy != ly) {
      ggBo = true;
    }

    if (x != ix || y != iy || ggBo) {
      this.setStageNodeInfo(LayerName, id, pw, ph, true);
      this.Info(LayerName, id, i, null, true); //清除地图中的信息

      if (sx != null) {
        this.nodeAllObj[LayerName][id][3][4] = sx;
      }

      if (sy != null) {
        this.nodeAllObj[LayerName][id][3][5] = sy;
      }

      this.setNodeLocation(LayerName, id, x + _this.flagPoint.x, y + _this.flagPoint.y, node);
      this.Info(LayerName, id, i, function (lx, ly, jx) {
        //添加地图中的信息
        var stageRect = new cc.Rect(cc.view.getVisibleOrigin().x, cc.view.getVisibleOrigin().y, cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        var nXY = new cc.Vec2(jx.x - _this.flagPoint.x, jx.y - _this.flagPoint.y);
        var rect = new cc.Rect(0, 0, jx.width * _this.node.scaleX, jx.height * _this.node.scaleY);

        var dian = _this.LayerNodeObj[LayerName].convertToWorldSpaceAR(cc.v2(nXY.x, nXY.y));

        rect.x = dian.x;
        rect.y = dian.y * -1;
        var r1 = rect;
        var r2 = new cc.Rect(stageRect.x, stageRect.y - stageRect.height, stageRect.width, stageRect.height);

        if (r1.x + r1.width <= r2.x || r2.x + r2.width <= r1.x || r1.y + r1.height <= r2.y || r2.y + r2.height <= r1.y) {
          //这里应该必要
          if (_this.showNodeObj[id] != null) {
            _this.killStageNode(LayerName, _this.showNodeObj[id], id, mcBo);
          }
        } else {
          if (_this.showNodeObj[id] != null) {
            _this.showNodeObj[id].x = x;
            _this.showNodeObj[id].y = y;

            if (sx != null) {
              _this.showNodeObj[id].scaleX = sx;
            }

            if (sy != null) _this.showNodeObj[id].scaleY = sy;

            _this.setStageNodeInfo(LayerName, id, pw, ph, false);
          } else {
            if (_this.LayerNodeArr[i].parent != null) {
              _this.addNodeChildFun(_this.nodeAllObj[LayerName][id][0], x - _this.flagPoint.x, y - _this.flagPoint.y, i, id);
            }
          }
        }
      });
    }
  },

  /********清除或清加舞台上地图信息*********/
  setStageNodeInfo: function setStageNodeInfo(LayerName, id, pw, ph, remBo) {
    var node = this.showNodeObj[id];

    if (node == null) {
      return;
    }

    var yrect = node.bID[2];
    var tx, ty, iw, ih;

    if (remBo) {
      ;
      tx = node.MRect.x;
      ty = node.MRect.y;
      iw = node.MRect.width;
      ih = node.MRect.height;
    } else {
      var r = this.getNodeRect(LayerName, id);
      var nodeX = r.x;
      var nodeY = r.y;
      tx = Math.floor(nodeX / pw);
      ty = Math.ceil(nodeY / ph);
      iw = Math.floor((r.width + nodeX - 1) / pw);
      ih = Math.ceil((nodeY - r.height + 1) / ph); // let nodeX = yrect.x+this.flagPoint.x;
      // let nodeY = yrect.y+this.flagPoint.y;
      // tx =(Math.floor(nodeX/(pw)));
      // ty =(Math.ceil(nodeY/(ph)));
      // iw =Math.floor(((yrect.width+ nodeX-1)/pw));
      // ih =Math.ceil((nodeY-yrect.height+1)/(ph));

      node.MRect = new cc.rect(tx, ty, iw, ih);
    }

    for (var xt = tx; xt <= iw; xt++) {
      for (var yt = ty; yt >= ih; yt--) {
        //坐标相反倒序列相减
        if (node != null) {
          if (remBo) {
            if (this.stageNodeObj[LayerName][xt * pw + '-' + yt * ph] != null) {
              delete this.stageNodeObj[LayerName][xt * pw + '-' + yt * ph][id];
            }
          } else {
            this.addStageNodeObjFun(LayerName, id, xt * pw + '-' + yt * ph);
          }
        }
      }
    }
  },

  /***********清除舞台上的Node****/
  killStageNode: function killStageNode(layerName, n, nodeID, mcBo) {
    var arr = this.MapSprArr[n.bID[1][0]];

    if (!mcBo) {
      if (this.killSprite != null) {
        this.killSprite(n, layerName);
      }

      n.parent = null;
      n.opacity = 255;
      arr[2][arr[2].length] = n;
      var ctobj = arr[1];
      delete ctobj[nodeID];
    } else {
      if (this.killYMovieClip != null) {
        this.killYMovieClip(n, layerName);
      }

      this.mcPool[n.pid]["pool"][this.mcPool[n.pid]["pool"].length] = n;
      delete this.MapMcArr[nodeID];
      this.ymcFrameObj[nodeID] = [n.cFrame, this.ymcTimInt, n.stopBo, n.offBo];
      var sy = this.ymcStageArr.indexOf(n);

      if (sy != -1) {
        this.ymcStageArr.splice(sy, 1);
      }

      n.parent = null; //    n.removeThis();
    }

    delete this.showNodeObj[nodeID];
    this.removeNodeParent(n, layerName);
  },

  /********返回两个矩形相交的部分********/
  getIntersectsRectFun: function getIntersectsRectFun(rect1, rect2) {
    var rect = new cc.Rect();
    rect.x = rect1.x > rect2.x ? rect1.x : rect2.x; //X取最大

    rect.y = rect1.y < rect2.y ? rect1.y : rect2.y; //Y取最小

    var nw = rect1.x + rect1.width > rect2.x + rect2.width ? rect2.x + rect2.width : rect1.x + rect1.width;
    var nh = rect1.y - rect1.height < rect2.y - rect2.height ? rect2.y - rect2.height : rect1.y - rect1.height;
    rect.width = nw - rect.x;
    rect.height = Math.abs(rect.y - nh);
    return rect;
  },

  /******public****卸载地图Node 参数：ID或是图块Node*********/
  removeMapNode: function removeMapNode(n) {
    var id = null;
    var nBo = false;

    if (n instanceof cc.Node) {
      if (n.bID == null) {
        return false;
      }

      id = n.bID[0];
      nBo = true;
    } else {
      if (typeof n == 'number') {
        id = n;
      } else {
        return false;
      }

      if (this.showNodeObj[id] != null) {
        nBo = true;
        n = this.showNodeObj[id];
      }
    }

    var LayerName = null;

    for (var str in this.nodeAllObj) {
      if (this.nodeAllObj[str][id] != null) {
        LayerName = str;
        break;
      }
    }

    if (LayerName == null) {
      return;
    }

    var i = -1;

    if (this.LayerNodeObj[LayerName] != null) {
      i = this.LayerNodeObj[LayerName].LayerArrID;
    } else {
      return;
    }

    var mcBo = false;

    if (nBo) {
      if (this.showNodeObj[id] != null) {
        var pw = this.layerRect[LayerName][1];
        var ph = this.layerRect[LayerName][2];
        var arr = this.MapSprArr[this.nodeAllObj[LayerName][id][0]];

        if (n instanceof YMovieClip) {
          mcBo = true;
        }

        this.setStageNodeInfo(LayerName, id, pw, ph, true);

        if (!mcBo) {
          var ctobj = arr[1];

          if (ctobj[id] != null) {
            delete ctobj[id];
          }
        } else {
          if (this.MapMcArr[id] != null) {
            delete this.MapMcArr[id];
          }

          this.ymcFrameObj[id] = [n.cFrame, this.ymcTimInt, n.stopBo, n.offBo];
          var sy = this.ymcStageArr.indexOf(n);

          if (sy != -1) {
            this.ymcStageArr.splice(sy, 1);
          }
        }

        delete this.showNodeObj[id];
      }
    }

    this.Info(LayerName, id, i, null, true); //清除地图中的信息

    if (mcBo) {
      n.removeThis();
    }
  },

  /**public*****通过名子得到图块的地图父节点，但需要地图父节点必须在场景加载过，否则反为null***/
  getNodeParentByName: function getNodeParentByName(name) {
    for (var str in this.nodeParentObj) {
      if (this.nodeParentObj[str][0] == name) {
        if (this.nodeParentObj[str].length >= 8) {
          return this.nodeParentObj[str][7];
        }
      }
    }

    return null;
  },

  /**public*****通过图块得到其地图父节点，如果图没有地图父节点，则反为null,如果你确定该图块一定有地图父节点，也可以直接n.parent得到***/
  getNodeParentBySprite: function getNodeParentBySprite(n) {
    if (node._y_parent != null) {
      return node._y_parent.parent;
    }

    return null;
  },
  getNodeRect: function getNodeRect(layerName, nodeID) {
    var r = new cc.Rect(this.nodeAllObj[layerName][nodeID][1], this.nodeAllObj[layerName][nodeID][2]);
    var id = this.nodeAllObj[layerName][nodeID][0];
    var sx = 1;
    var sy = 1;

    if (this.nodeAllObj[layerName][nodeID].length >= 4) {
      if (this.nodeAllObj[layerName][nodeID][3][0] != null) {
        r.x = this.nodeAllObj[layerName][nodeID][3][0];
      }

      if (this.nodeAllObj[layerName][nodeID][3][1] != null) {
        r.y = this.nodeAllObj[layerName][nodeID][3][1];
      }

      if (this.nodeAllObj[layerName][nodeID][3][4] != null) {
        sx = this.nodeAllObj[layerName][nodeID][3][4];
      }

      if (this.nodeAllObj[layerName][nodeID][3][5] != null) {
        sy = this.nodeAllObj[layerName][nodeID][3][5];
      }
    }

    if (typeof id == 'number') {
      r.width = this.MapSprArr[id][0][2] * sx;
      r.height = this.MapSprArr[id][0][3] * sy;
    } else {
      var mr = this.ymcAllObj[this.ymcMapSprArr[id][0]][3];
      r.x += mr.x;
      r.y += mr.y;
      r.width = mr.width * sx;
      r.height = mr.height * sy;
    }

    return r;
  },

  /******地图坐标信息更改*******/
  setNodeLocation: function setNodeLocation(layerName, nodeID, x, y, node) {
    var tx = x - this.nodeAllObj[layerName][nodeID][1];
    var ty = y - this.nodeAllObj[layerName][nodeID][2];
    this.nodeAllObj[layerName][nodeID][1] += tx;
    this.nodeAllObj[layerName][nodeID][2] += ty;

    if (this.nodeAllObj[layerName][nodeID].length >= 4) {
      if (this.nodeAllObj[layerName][nodeID][3][0] != null) {
        this.nodeAllObj[layerName][nodeID][3][0] += tx;
      }

      if (this.nodeAllObj[layerName][nodeID][3][1] != null) {
        this.nodeAllObj[layerName][nodeID][3][1] += ty;
      }
    }

    if (node != null) {
      if (node.bID != null) {
        node.bID[2].x += tx;
        node.bID[2].y += ty;
      }
    }
  },

  /**********得到舞台上的显示对像***********/
  isShow: function isShow(id) {
    if (this.showNodeObj[id] != null) {
      return this.showNodeObj[id];
    }

    return null;
  },

  /******向地图添加信息*******/
  Info: function Info(layerName, nodeID, i, fun, remBo) {
    if (i == -1) {
      for (var t = 0; t < this.LayerArr.length; t++) {
        if (this.LayerArr[t]['LayerName'] == layerName) {
          i = t;
          break;
        }
      }
    }

    if (i == -1) {
      return;
    }

    ;

    if (remBo == null) {
      remBo = false;
    }

    var id = this.nodeAllObj[layerName][nodeID][0];
    var r = this.getNodeRect(layerName, nodeID);
    var pw = this.layerRect[layerName][1];
    var ph = this.layerRect[layerName][2];
    var nodeX = r.x;
    var nodeY = r.y;
    var tx = Math.floor(nodeX / pw);
    var ty = Math.ceil(nodeY / ph);
    var iw = Math.floor((r.width + nodeX - 1) / pw);
    var ih = Math.ceil((nodeY - r.height + 1) / ph);
    var hitObj = this.isHit;
    var hitStr = "";

    if (typeof id == "number") {
      if (this.MapSprArr[id] != null) {
        hitStr = this.MapSprArr[id][0][0];
      }
    } else {
      if (this.ymcMapSprArr[id] != null) {
        hitStr = this.ymcMapSprArr[id][0];
      }
    }

    for (var xt = tx; xt <= iw; xt++) {
      for (var yt = ty; yt >= ih; yt--) {
        var xn = (xt * pw).toString();
        var yn = (yt * ph).toString();

        if (!remBo) {
          if (this.LayerArr[i]['Position'][xn] == null) {
            this.LayerArr[i]['Position'][xn] = {};
          }

          if (this.LayerArr[i]['Position'][xn][yn] == null) {
            this.LayerArr[i]['Position'][xn][yn] = [];
          }

          this.LayerArr[i]['Position'][xn][yn].push(Number(nodeID));

          if (hitObj[hitStr]) {
            if (this.hitObj[xn] == null) this.hitObj[xn] = {};
            if (this.hitObj[xn][yn] == null) this.hitObj[xn][yn] = [];
            this.hitObj[xn][yn].push({
              x: r.x,
              y: r.y * -1,
              width: r.width,
              height: r.height,
              id: nodeID
            });
          }
        } else {
          if (this.LayerArr[i]['Position'][xn] != null) {
            if (this.LayerArr[i]['Position'][xn][yn] != null) {
              var v = this.LayerArr[i]['Position'][xn][yn].indexOf(nodeID);

              if (v != -1) {
                this.LayerArr[i]['Position'][xn][yn].splice(v, 1);
              }

              if (this.hitObj[xn] != null && this.hitObj[xn][yn] != null) {
                for (var _v = 0; _v < this.hitObj[xn][yn].length; _v++) {
                  if (this.hitObj[xn][yn][_v]['id'] == nodeID) {
                    this.hitObj[xn][yn].splice(_v, 1);

                    if (this.hitObj[xn][yn].length == 0) {
                      delete this.hitObj[xn][yn];
                    }

                    break;
                  }
                }
              }
            }
          }
        }

        if (fun != null) {
          fun(xn, yn, r);
        }
      }
    }
  },

  /*****得到标标签******/
  getTag: function getTag(str) {
    if (this.tagObj[str] != null) {
      return this.tagObj[str];
    } else {
      return [];
    }
  },

  /***导出寻路对像**/
  onPath: function onPath(pathObj) {
    if (pathObj['pathObj'] == null) {
      return;
    }

    var pobj = {};

    for (var _i17 = 0; _i17 < pathObj['pathObj'].length; _i17++) {
      pobj[pathObj['pathObj'][_i17][1] + "*" + pathObj['pathObj'][_i17][0]] = {
        'x': pathObj['pathObj'][_i17][0],
        'y': pathObj['pathObj'][_i17][1]
      };
    }

    pathObj['pathObj'] = pobj;
    this.PathGridObj = pathObj;
  },

  set ols(v) {
    this.onLoadSprite = olp;
  },

  set oLsp(v) {
    this.onLoadSpriteParent = v;
  },

  set olymc(v) {
    this.onLoadYMovieClip = v;
  },

  /********当贴图加载完成执行********/
  onLayerFun: function onLayerFun() {
    // console.log("地图加载完了")
    //'闪影 个人版v0.9.0
    this.hitObj = {}; //新加属性

    this.BGInit();
    this.onLayerFun2();
    var mcArr = this.MapObj['mcArr'];
    this.ymcAllObj = {};

    for (var str in mcArr) {
      var arr = mcArr[str][0];
      var zarr = [];

      for (var t = 0; t < arr.length; t++) {
        var tarr = [];
        var carr = arr[t];
        var l = carr[0];

        for (var c = 1; c < carr.length; c++) {
          tarr[tarr.length] = carr[c];
        }

        for (var s = 0; s < l; s++) {
          zarr[zarr.length] = tarr;
        }

        this.ymcAllObj[str] = [zarr, mcArr[str][1], mcArr[str][2], new cc.Rect(mcArr[str][3][0], mcArr[str][3][1], mcArr[str][3][2], mcArr[str][3][3]), mcArr[str][4]];
      }
    }

    for (var _str2 in this.nodeAllObj) {
      for (var _i18 = 0; _i18 < this.LayerArr.length; _i18++) {
        if (this.LayerArr[_i18]['LayerName'] == _str2) {
          if (this.LayerArr[_i18]['Position'] == null) {
            this.LayerArr[_i18]['Position'] = {};

            for (var idStr in this.nodeAllObj[_str2]) {
              this.Info(_str2, idStr, _i18);

              if (this.nodeAllObj[_str2][idStr][3] == null) {
                this.nodeAllObj[_str2][idStr][3] = [];
              }
            }
          }
        }
      }
    }

    var hitFun = function hitFun(arr, bo) {
      for (var _i19 = 0; _i19 < arr.length; _i19++) {
        if (arr[_i19]['pz'] != null) {
          var pzArr = {};

          for (var _str3 in arr[_i19]['pz']) {
            if (arr[_i19]['pz'][_str3]) {
              if (bo) {
                pzArr[_str3] = {};
                pzArr[_str3]['offset'] = new cc.Vec2(arr[_i19]['pz'][_str3][0], arr[_i19]['pz'][_str3][1]);
                pzArr[_str3]['size'] = new cc.Size(arr[_i19]['pz'][_str3][2], arr[_i19]['pz'][_str3][3]);
              } else {
                pzArr[_str3] = {};
                pzArr[_str3]['points'] = [];

                for (var _s2 = 0; _s2 < arr[_i19]['pz'][_str3].length; _s2++) {
                  pzArr[_str3]['points'][pzArr[_str3]['points'].length] = new cc.Vec2(arr[_i19]['pz'][_str3][_s2][0], arr[_i19]['pz'][_str3][_s2][1]);
                }
              }
            }
          }

          arr[_i19]['pz'] = pzArr;
        }
      }
    };

    for (var yStr in this.ymcMapSprArr) {
      var pzObj = this.ymcMapSprArr[yStr][1];

      if (pzObj['Collider'] != null) {
        hitFun(pzObj['Collider'], true);
      }

      if (pzObj['PolygonCollider'] != null) {
        hitFun(pzObj['PolygonCollider'], false);
      }
    }

    this.LayerNodeArr = new Array();
    this.LayerNodeObj = {};

    for (var _i20 = 0; _i20 < this.LayerArr.length; _i20++) {
      var n = this.addNode(this.extend({
        "name": this.LayerArr[_i20]["LayerName"],
        "zIndex": _i20 * 100,
        "parent": this.node
      }, this.LayerArr[_i20]["Pro"]));
      this.LayerNodeObj[this.LayerArr[_i20]["LayerName"]] = n;
      this.LayerNodeArr[_i20] = n; //保存图层Node的数组

      n.LayerArrID = _i20;
    }

    this.LoadBo = true;

    if (this._showAllBo) {
      this.addAll();
    } else {
      this.setLocationFun(this.node.x, this.node.y);
    }

    if (this.cInit != null) {
      this.cInit();
      this.cInit = null;
    }

    window.hitObj = this.hitObj;

    if (this.Init != null) {
      this.Init();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0XFxCbGFja01hcC5qcyJdLCJuYW1lcyI6WyJZTW92aWVDbGlwIiwiY2MiLCJDbGFzcyIsIk5vZGUiLCJwcm9wZXJ0aWVzIiwiY0ZyYW1lIiwiY3VycmVudEZyYW1lIiwiZ2V0IiwidG90YWxGcmFtZSIsImZyYW1lQXJyIiwibGVuZ3RoIiwiaXNZTUMiLCJpbWdOb2RlIiwiYWN0aW9uT2JqIiwiZXZlbnRPYmoiLCJ0YWdPYmoiLCJzdGFnZU5vZGUiLCJmcmFtZU5vZGUiLCJzcHJpdGVBcnIiLCJjdXJyZW50QXJyIiwicmVjdCIsIlJlY3QiLCJyZXZpc2UiLCJJbml0IiwicGFyZW50Tm9kZSIsIm5zdHIiLCJmcmFBcnIiLCJhY3RPYmoiLCJldmVBcnIiLCJ0T2JqIiwic3ByQXJyIiwiU3ByaXRlT2JqIiwickJvIiwic3RvcEJvIiwib2ZmQm8iLCJjdXJyQWN0QXJyIiwibmFtZSIsImV2ZW50RnVuT2JqIiwicGFyZW50IiwiYWRkQ29tcG9uZW50IiwiU3ByaXRlIiwiYW5jaG9yWCIsImFuY2hvclkiLCJzZXRTcHJpdGUiLCJJbml0MiIsIm9uRXZlbnRGdW4iLCJFdmVudEZyYW1lIiwic3RyIiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiRXZlbnRDdXN0b20iLCJzZXRFdmVudEZ1biIsInpoZW4yIiwidHlwZVN0ciIsImZ1biIsInpoZW4iLCJoYXNPd25Qcm9wZXJ0eSIsImFkZEV2ZW50RnVuIiwiZGVsZXRlRXZlbnRGdW4iLCJkZWxldGVBbGxFdmVudEZ1biIsInNldEZyYW1lIiwicmVtRnJhbWUiLCJjVGltIiwidFRpbSIsInNibyIsIm9CbyIsIm9uSGl0Q29tcG9uZW50Iiwic2V0QWN0aW9uT2JqIiwieGgiLCJ5cyIsInpoZW5PYmoiLCJ6aGVuVGltIiwiemhlbkFyciIsImkiLCJhZGRGcmFtZSIsImFyciIsImMiLCJ1bnNoaWZ0IiwiY3kiLCJyZW1vdmVUaGlzIiwic3ByIiwiZ2V0Q29tcG9uZW50Iiwic3ByaXRlRnJhbWUiLCJkZXN0cm95IiwiZ290b0FuZFBsYXkiLCJmcmFtZSIsImYiLCJnb3RvQW5kU3RvcCIsInBsYXkiLCJzdG9wIiwiZ2V0UHJhZW50IiwiX3lfcGFyZW50IiwiZ2V0UmVjdCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJzdGFydFlNQyIsInB6IiwiZW5hYmxlZCIsInNldExvY2F0aW9uRnVuIiwiWCIsIlkiLCJDb21wb25lbnQiLCJ0b29sdGlwIiwidmlzaWJsZSIsIm5vZGVBbGxPYmoiLCJNYXBTcHJBcnIiLCJMYXllckFyciIsIkZQUyIsIl9GUFMiLCJGUFMyIiwic2V0IiwidmFsdWUiLCJNYXRoIiwiZmxvb3IiLCJ0aW1EZWxheSIsInVuc2NoZWR1bGUiLCJ0aW1lckZ1biIsInNjaGVkdWxlIiwibWFwQ2FtZXJhTm9kZSIsIl9tYXBDYW1lcmFOb2RlIiwib2ZmIiwib25NYXBDYW1lcmEiLCJvbiIsIkJHT2JqIiwiX0JHT2JqIiwib25Mb2FkMiIsIkxvY09iaiIsImlzSGl0IiwidGltSW50IiwicG9pbnRPYmoiLCJzdGFnZVJlY3RPYmoiLCJzaG93Tm9kZU9iaiIsInN0YWdlTm9kZU9iaiIsIkxvYWRCbyIsIm9uU3JwaXRlRnVuIiwieW1jU3RhZ2VBcnIiLCJNYXBNY0FyciIsInltY0ZyYW1lT2JqIiwieW1jVGltSW50IiwibWNQb29sIiwic2hvd0FsbCIsIl9zaG93QWxsQm8iLCJhZGRBbGwiLCJjb25zb2xlIiwibG9nIiwiTGF5ZXJTdHIiLCJpZFN0ciIsImxhcnIiLCJhZGROb2RlQ2hpbGRGdW4iLCJmbGFnUG9pbnQiLCJibyIsIkxheWVyTm9kZU9iaiIsIlZlYzIiLCJub2RlIiwibiIsInRYIiwidFkiLCJkaWFuIiwiY29udmVydFRvV29ybGRTcGFjZUFSIiwidjIiLCJBZGRNYXBDaGlsZEZ1biIsInZpZXciLCJnZXRWaXNpYmxlT3JpZ2luIiwic2NhbGVYIiwic2NhbGVZIiwiZ2V0VmlzaWJsZVNpemUiLCJzY2FsZUZ1biIsInB4IiwicHkiLCJ0eCIsInR5IiwicCIsInAyIiwicmVtb3ZlQWxsIiwiTGF5ZXJOb2RlQXJyIiwiZGVzdHJveUFsbENoaWxkcmVuIiwicyIsIm1jQXJyIiwia2lsbEZyYW1lQXJyIiwia2lsbFNwckFyciIsImxvYWRlciIsInJlbGVhc2VSZXMiLCJTcHJpdGVGcmFtZSIsIm5vZGVQYXJlbnRPYmoiLCJyZWxlYXNlIiwia2lsbEFyciIsInBhdGhGaW5kIiwicmVtb3ZlQ29tcG9uZW50IiwicmVsZWFzZUFzc2V0IiwiQkdOb2RlIiwiUGF0aEdyaWRPYmoiLCJMb2FkaW5nIiwibGF5ZXJSZWN0Iiwib25Mb2FkWU1vdmllQ2xpcCIsIm9uTG9hZFNwcml0ZSIsIm9uTG9hZFNwcml0ZVBhcmVudCIsImtpbGxTcHJpdGUiLCJraWxsU3ByaXRlUGFyZW50Iiwia2lsbFlNb3ZpZUNsaXAiLCJ5bWNBbGxPYmoiLCJ5bWNNYXBTcHJBcnIiLCJnZXRMYXllclJlY3RGdW4iLCJnZXRMYXllck5vZGVGdW4iLCJraWxsTm9kZVBvb2wiLCJ0aW1Pck5hbWUiLCJjb25zdHJ1Y3RvciIsIk51bWJlciIsImlkIiwidCIsInNldFNwcml0ZUZyYW1lIiwicGF0aCIsInBhIiwibCIsImNoaWxkcmVuQ291bnQiLCJjaGlsZHJlbiIsIkxvYWRMZW5ndGgiLCJNYXBPYmoiLCJsb2FkSW50IiwibG9hZExlbiIsIl90aGlzIiwibG9hZFJlcyIsIlNwcml0ZUF0bGFzIiwiZXJyIiwiYXRsYXMiLCJvbkxheWVyRnVuIiwiYXRsQXJyIiwickFyciIsImNsb25lIiwiZ2V0VGV4dHVyZSIsInNldEZpbHRlcnMiLCJUZXh0dXJlMkQiLCJGaWx0ZXIiLCJORUFSRVNUIiwiZnJhbWUyIiwic3RyMiIsImRlcHMiLCJnZXREZXBlbmRzUmVjdXJzaXZlbHkiLCJnZXRTcHJpdGVGcmFtZSIsImEiLCJhZGROb2RlIiwib2JqIiwibmV3Tm9kZSIsImhpdE9iamVjdCIsImdldENvbXBvbmVudFR5cGUiLCJTcHJPYmoiLCJDb2xvciIsInIiLCJnIiwiYiIsImZpbGwiLCJ0eXBlIiwiR3JhcGhpY3MiLCJCb3hDb2xsaWRlciIsIlBvbHlnb25Db2xsaWRlciIsImdldEJHTm9kZSIsInNwbGljZSIsIkxvYWRNYXBCRyIsIm54IiwibnkiLCJCR0luaXQiLCJ6SW5kZXgiLCJ3IiwiaCIsImdldEJHSUQiLCJBZGRNYXBCRyIsInB3IiwicGgiLCJpbnRlcnNlY3Rpb24iLCJjeCIsImN3IiwiY2VpbCIsImNoIiwiZ2V0SGl0UmVjdE9iaiIsIm8iLCJjeDIiLCJjeTIiLCJjdzIiLCJjaDIiLCJwdXNoIiwiZkJHIiwiamxPYmoiLCJyMiIsInJlbW92ZU5vZGVDaGlsZEZ1biIsInN4QXJyIiwicjEiLCJyengiLCJyenMiLCJyeXgiLCJyeXMiLCJ0Y0lEIiwiTm9kZUlEIiwibWNCbyIsImxCbyIsInpOb2RlIiwicGFyQm8iLCJuQXJyIiwiZXh0ZW5kIiwib3BhY2l0eSIsImFkZE5vZGVQYXJlbnQiLCJjb2xvciIsImJJRCIsImluZm9PYmoiLCJtYXBMYXllck5hbWUiLCJzdHJJRCIsInltYyIsInBibyIsInBpZCIsImVPYmoiLCJlU3RyIiwidlN0ciIsImluZm8iLCJzZXRTdGFnZU5vZGVJbmZvIiwicG5vZGUiLCJfeV9wYXJJRCIsInNldFlNb3ZpZUNsaXBGcmFtZSIsIm5vZGVJRCIsInBCbyIsInJlbW92ZU5vZGVQYXJlbnQiLCJhZGRTdGFnZU5vZGVPYmpGdW4iLCJ0Y05hbWUiLCJuaFN0ciIsInVuZGVmaW5lZCIsIm9iajEiLCJvYmoyIiwia2V5IiwiZ2V0Tm9kZXNCeUxvY2F0aW9uIiwiTGF5ZXJOYW1lIiwic2FyciIsImdldFRvcE5vZGVCeUxvY2F0aW9uIiwiekluZGUiLCJhZGRNYXBOb2RlIiwibkJvIiwiTGF5ZXJBcnJJRCIsIkluZm8iLCJpeCIsIml5Iiwic2V0Tm9kZUxvY2F0aW9uIiwibHgiLCJseSIsImp4Iiwic3RhZ2VSZWN0IiwiblhZIiwia2lsbFN0YWdlTm9kZSIsIm5TdHIiLCJyZW1vdmVTdGFnZU5vZGUiLCJuUmVjdCIsIm5QYXIiLCJsYXllck5hbWUiLCJNUmVjdCIsImdldE1hcE5vZGVPYmoiLCJJRG9yTiIsImdldFNoYWRvdyIsIlByb3h5IiwidGFyZ2V0IiwicHJvcEtleSIsInJlY2VpdmVyIiwic2V0TWFwTG9jYXRpb24iLCJsT2JqIiwiQm8iLCJzeCIsInN5IiwiZ2dCbyIsInJlbUJvIiwieXJlY3QiLCJpdyIsImloIiwiZ2V0Tm9kZVJlY3QiLCJub2RlWCIsIm5vZGVZIiwieHQiLCJ5dCIsImN0b2JqIiwiaW5kZXhPZiIsImdldEludGVyc2VjdHNSZWN0RnVuIiwicmVjdDEiLCJyZWN0MiIsIm53IiwibmgiLCJhYnMiLCJyZW1vdmVNYXBOb2RlIiwiZ2V0Tm9kZVBhcmVudEJ5TmFtZSIsImdldE5vZGVQYXJlbnRCeVNwcml0ZSIsIm1yIiwiaXNTaG93IiwiaGl0T2JqIiwiaGl0U3RyIiwieG4iLCJ0b1N0cmluZyIsInluIiwidiIsImdldFRhZyIsIm9uUGF0aCIsInBhdGhPYmoiLCJwb2JqIiwib2xzIiwib2xwIiwib0xzcCIsIm9seW1jIiwib25MYXllckZ1bjIiLCJ6YXJyIiwidGFyciIsImNhcnIiLCJoaXRGdW4iLCJwekFyciIsIlNpemUiLCJ5U3RyIiwicHpPYmoiLCJBcnJheSIsImNJbml0Iiwid2luZG93Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLFVBQVUsR0FBR0MsRUFBRSxDQUFDQyxLQUFILENBQVM7QUFDdEIsYUFBU0QsRUFBRSxDQUFDRSxJQURVO0FBRXRCQyxFQUFBQSxVQUFVLEVBQUU7QUFDUkMsSUFBQUEsTUFBTSxFQUFFLENBREE7QUFFUkMsSUFBQUEsWUFBWSxFQUFFO0FBQ1ZDLE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLRixNQUFMLEdBQWMsQ0FBckI7QUFDSDtBQUhTLEtBRk47QUFPUkcsSUFBQUEsVUFBVSxFQUFFO0FBQ1JELE1BQUFBLEdBQUcsRUFBRSxlQUFZO0FBQ2IsZUFBTyxLQUFLRSxRQUFMLENBQWNDLE1BQXJCO0FBQ0g7QUFITyxLQVBKO0FBWVJDLElBQUFBLEtBQUssRUFBRSxJQVpDO0FBYVJGLElBQUFBLFFBQVEs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QUtBLElBQUw7QUFBYztBQUMxQztBQTl2REksQ0FBVCIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFlNb3ZpZUNsaXAgPSBjYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Ob2RlLFxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIGNGcmFtZTogMCxcclxuICAgICAgICBjdXJyZW50RnJhbWU6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jRnJhbWUgKyAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICB0b3RhbEZyYW1lOiB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZnJhbWVBcnIubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpc1lNQzogdHJ1ZSxcclxuICAgICAgICBmcmFtZUFycjogW10sXHJcbiAgICAgICAgaW1nTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBhY3Rpb25PYmo6IG51bGwsXHJcbiAgICAgICAgZXZlbnRPYmo6IG51bGwsXHJcbiAgICAgICAgdGFnT2JqOiBudWxsLFxyXG4gICAgICAgIHN0YWdlTm9kZTogY2MuTm9kZSxcclxuICAgICAgICBmcmFtZU5vZGU6IGNjLk5vZGUsXHJcbiAgICAgICAgc3ByaXRlQXJyOiBbXSxcclxuICAgICAgICBjdXJyZW50QXJyOiBbXSxcclxuICAgICAgICByZWN0OiBjYy5SZWN0LFxyXG4gICAgICAgIHJldmlzZTogZmFsc2VcclxuICAgIH0sXHJcbiAgICBJbml0OiBmdW5jdGlvbiAocGFyZW50Tm9kZSwgbnN0ciwgZnJhQXJyLCBhY3RPYmosIGV2ZUFyciwgcmVjdCwgdE9iaiwgc3ByQXJyLCBTcHJpdGVPYmosIHJCbykge1xyXG4gICAgICAgIHRoaXMucmV2aXNlID0gckJvO1xyXG4gICAgICAgIHRoaXMuc3RvcEJvID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5vZmZCbyA9IGZhbHNlOy8v5YGc5q2i6L+Q6KGMIOacgOmrmOadg+mZkCDlj6rmnInmiafooYzkuoZzdG9wKCnmiY3og73kuLp0cnVlXHJcbiAgICAgICAgdGhpcy5jdXJyQWN0QXJyID0gbnVsbDtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuc3RyO1xyXG4gICAgICAgIHRoaXMuZnJhbWVBcnIgPSBmcmFBcnI7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25PYmogPSBhY3RPYmo7XHJcbiAgICAgICAgdGhpcy5ldmVudE9iaiA9IGV2ZUFycjtcclxuICAgICAgICB0aGlzLnRhZ09iaiA9IHRPYmo7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVBcnIgPSBzcHJBcnI7XHJcbiAgICAgICAgdGhpcy5jRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuU3ByaXRlT2JqID0gU3ByaXRlT2JqO1xyXG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgdGhpcy5ldmVudEZ1bk9iaiA9IHt9O1xyXG4gICAgICAgIHRoaXMuY3VycmVudEFyciA9IHRoaXMuZnJhbWVBcnJbdGhpcy5jRnJhbWVdO1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50Tm9kZTtcclxuICAgICAgICB0aGlzLmZyYW1lTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5mcmFtZU5vZGUucGFyZW50ID0gdGhpcztcclxuICAgICAgICB0aGlzLmZyYW1lTm9kZS5hZGRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICB0aGlzLmZyYW1lTm9kZS5hbmNob3JYID0gMDtcclxuICAgICAgICB0aGlzLmZyYW1lTm9kZS5hbmNob3JZID0gMTtcclxuICAgICAgICB0aGlzLmFuY2hvclggPSAwO1xyXG4gICAgICAgIHRoaXMuYW5jaG9yWSA9IDE7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0U3ByaXRlKCk7XHJcbiAgICB9LFxyXG4gICAgSW5pdDI6IGZ1bmN0aW9uIChyZWN0LCBzcHJBcnIsIFNwcml0ZU9iaiwgckJvKSB7XHJcbiAgICAgICAgdGhpcy5yZXZpc2UgPSByQm87XHJcbiAgICAgICAgdGhpcy5zdG9wQm8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9mZkJvID0gZmFsc2U7Ly/lgZzmraLov5DooYwg5pyA6auY5p2D6ZmQIOWPquacieaJp+ihjOS6hnN0b3AoKeaJjeiDveS4unRydWVcclxuICAgICAgICB0aGlzLmN1cnJBY3RBcnIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3ByaXRlQXJyID0gc3ByQXJyO1xyXG4gICAgICAgIHRoaXMuY0ZyYW1lID0gMDtcclxuICAgICAgICB0aGlzLlNwcml0ZU9iaiA9IFNwcml0ZU9iajtcclxuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xyXG4gICAgICAgIHRoaXMuZXZlbnRGdW5PYmogPSB7fTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRBcnIgPSB0aGlzLmZyYW1lQXJyW3RoaXMuY0ZyYW1lXTtcclxuXHJcbiAgICAgICAgdGhpcy5zZXRTcHJpdGUoKTtcclxuICAgIH0sXHJcbiAgICAvKioq5aaC5p6c6K+l5bin5LiK5pyJ5LqL5Lu257G75Z6L5L2G5piv5peg5o6l5pS25pa55rOVLOmCo+S5iOWwseS8muaJp+ihjHltYy5kaXNwYXRjaEV2ZW505by55Ye65LqL5Lu2KioqL1xyXG4gICAgLyoqKuS5n+WPr+S7pemAmui/h3NldEV2ZW50RnVu5ZKMYWRkRXZlbnRGdW7kuLror6XluKfkuIrnmoTkuovku7bnsbvlnovlop7liqDmlrnms5XvvIzlsY/olL3lvLnlh7oqKiovXHJcbiAgICBvbkV2ZW50RnVuOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuRXZlbnRGcmFtZSA9PSB0aGlzLmNGcmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuRXZlbnRGcmFtZSA9IHRoaXMuY0ZyYW1lOy8v5LiK5LiA5qyh5omn6KGM5Luj56CB55qE5binXHJcbiAgICAgICAgaWYgKHRoaXMuZXZlbnRPYmpbdGhpcy5jRnJhbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgc3RyIGluIHRoaXMuZXZlbnRPYmpbdGhpcy5jRnJhbWVdKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ldmVudE9ialt0aGlzLmNGcmFtZV1bc3RyXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ldmVudE9ialt0aGlzLmNGcmFtZV1bc3RyXSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IGNjLkV2ZW50LkV2ZW50Q3VzdG9tKHN0ciwgZmFsc2UpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKioqKioqKirorr7nva7miJbmm7TmlLnlt7LmnInnmoTluKfkuovku7YqKioqKioqKi9cclxuICAgIHNldEV2ZW50RnVuOiBmdW5jdGlvbiAoemhlbjIsIHR5cGVTdHIsIGZ1bikge1xyXG4gICAgICAgIGxldCB6aGVuID0gemhlbjIgLSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50T2JqW3poZW5dICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZXZlbnRPYmpbemhlbl0uaGFzT3duUHJvcGVydHkodHlwZVN0cikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRPYmpbemhlbl1bdHlwZVN0cl0gPSBmdW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioq5re75Yqg55qE5bin5LqL5Lu277yM5aaC5p6c5bey57uP5a2Y5YiZ5Lya6KKr6KaG55uWKioqKioqKiovXHJcbiAgICBhZGRFdmVudEZ1bjogZnVuY3Rpb24gKHpoZW4yLCB0eXBlU3RyLCBmdW4pIHtcclxuICAgICAgICBsZXQgemhlbiA9IHpoZW4yIC0gMTtcclxuICAgICAgICBpZiAodGhpcy5ldmVudE9ialt6aGVuXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRPYmpbemhlbl0gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ldmVudE9ialt6aGVuXVt0eXBlU3RyXSA9IGZ1bjtcclxuICAgIH0sXHJcbiAgICAvKioqKioqKirmuIXpmaTmn5DkuIDluKfkuIrnmoTmn5DkuIDkuovku7YqKioqKioqKi9cclxuICAgIGRlbGV0ZUV2ZW50RnVuOiBmdW5jdGlvbiAoemhlbjIsIHR5cGVTdHIpIHtcclxuICAgICAgICBsZXQgemhlbiA9IHpoZW4yIC0gMTtcclxuICAgICAgICBpZiAodGhpcy5ldmVudE9ialt6aGVuXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmV2ZW50T2JqW3poZW5dLmhhc093blByb3BlcnR5KHR5cGVTdHIpKSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgKHRoaXMuZXZlbnRPYmpbemhlbl1bdHlwZVN0cl0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKua4hemZpOafkOS4gOW4p+S4iueahOaJgOacieS6i+S7tioqKioqKioqL1xyXG4gICAgZGVsZXRlQWxsRXZlbnRGdW46IGZ1bmN0aW9uICh6aGVuMikge1xyXG4gICAgICAgIGxldCB6aGVuID0gemhlbjIgLSAxO1xyXG4gICAgICAgIGlmICh0aGlzLmV2ZW50T2JqLmhhc093blByb3BlcnR5KHpoZW4pKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSAodGhpcy5ldmVudE9ialt6aGVuXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKirorr7nva7luKflj4LmlbDvvJrljbjovb3ml7bliqjnlLvnmoTluKfvvIzlvZPliY3ml7bpl7TvvIzljbjovb3ml7bpl7Qs5pqC5pe2Qk/vvIzlgZzmraJCbyAqL1xyXG4gICAgc2V0RnJhbWU6IGZ1bmN0aW9uIChyZW1GcmFtZSwgY1RpbSwgdFRpbSwgc2JvLCBvQm8pIHtcclxuICAgICAgICB0aGlzLnN0b3BCbyA9IHNibztcclxuICAgICAgICB0aGlzLm9mZkJvID0gb0JvO1xyXG4gICAgICAgIGlmICh0VGltID09IDAgfHwgdFRpbSA9PSBudWxsKSB7Ly/lpoLmnpzmmK/nrKzkuIDmrKHliqDovb3vvIzliJnku4DkuYjpg73kuI3lgZpcclxuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uT2JqICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VyckFjdEFyciA9IHRoaXMuYWN0aW9uT2JqWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyckFjdEFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyckFjdEFyclswXSA9PSAnc3RvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSGl0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudEFyciA9IHRoaXMuZnJhbWVBcnJbdGhpcy5jRnJhbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih0aGlzLmNGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3ByaXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuRXZlbnRGcmFtZSA9IHRoaXMuY0ZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzYm8gfHwgb0JvIHx8IHRoaXMudG90YWxGcmFtZSA9PSAxKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRvdGFsRnJhbWUgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSByZW1GcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm9uSGl0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEFyciA9IHRoaXMuZnJhbWVBcnJbdGhpcy5jRnJhbWVdO1xyXG4gICAgICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih0aGlzLmNGcmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3ByaXRlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuRXZlbnRGcmFtZSA9IHRoaXMuY0ZyYW1lO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB4aCA9IGNUaW0gLSB0VGltO1xyXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbk9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCB5cyA9IHhoICUgdGhpcy50b3RhbEZyYW1lO1xyXG4gICAgICAgICAgICBpZiAocmVtRnJhbWUgKyB5cyA+PSB0aGlzLnRvdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY0ZyYW1lID0gKHJlbUZyYW1lICsgeXMpIC0gdGhpcy50b3RhbEZyYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSByZW1GcmFtZSArIHlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMub25IaXRDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QXJyID0gdGhpcy5mcmFtZUFyclt0aGlzLmNGcmFtZV07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uT2JqKHRoaXMuY0ZyYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTcHJpdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkV2ZW50RnVuKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNGcmFtZSA9IHJlbUZyYW1lO1xyXG4gICAgICAgICAgICBpZiAoeGggPj0gdGhpcy50b3RhbEZyYW1lICogMyAmJiB4aCA+IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgemhlbk9iaiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgbGV0IHpoZW5UaW0gPSB0VGltO1xyXG4gICAgICAgICAgICAgICAgbGV0IHpoZW5BcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uT2JqKHRoaXMuY0ZyYW1lKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50b3RhbEZyYW1lICogMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXJyID0gdGhpcy5mcmFtZUFyclt0aGlzLmNGcmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSB0aGlzLmFkZEZyYW1lKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgemhlblRpbSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHpoZW5BcnJbemhlbkFyci5sZW5ndGhdID0gdGhpcy5jRnJhbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHpoZW5PYmpbdGhpcy5jRnJhbWVdID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgemhlbk9ialt0aGlzLmNGcmFtZV0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHpoZW5PYmpbdGhpcy5jRnJhbWVdKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh6aGVuT2JqW3RoaXMuY0ZyYW1lXSA+PSAzKSB7Ly/lvZPkuIDluKfov57nnYDlh7rnjrDkuInmrKEg6YKj5LmI5bqU6K+l5piv5b6q546v5LqGXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gW107Ly/nlKjmnaXorrDlvZXmr4/luKfnmoTkvY3nva7lkozml7bpl7RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSB6aGVuQXJyLmxlbmd0aCAtIDI7IGMgPiAwOyBjLS0pIHsvL+WAkuedgOajgOafpSDlh7rlvqrnjq/ngrlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnIudW5zaGlmdCh6aGVuQXJyW2NdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoemhlbkFycltjXSA9PSB0aGlzLmNGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aCA9IGNUaW0gLSB6aGVuVGltO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgY3kgPSB4aCAlIGFyci5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY0ZyYW1lID0gYXJyW2N5XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhpdENvbXBvbmVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRBcnIgPSB0aGlzLmZyYW1lQXJyW3RoaXMuY0ZyYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb25PYmoodGhpcy5jRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFNwcml0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRGdW4oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaSA9IHRoaXMudG90YWxGcmFtZSAqIDQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uT2JqKHRoaXMuY0ZyYW1lKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY0ZyYW1lID0gdGhpcy5hZGRGcmFtZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkhpdENvbXBvbmVudCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50QXJyID0gdGhpcy5mcmFtZUFyclt0aGlzLmNGcmFtZV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih0aGlzLmNGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFNwcml0ZSgpOy8vXHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXZlbnRGdW4oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXRBY3Rpb25PYmo6IGZ1bmN0aW9uICh6aGVuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uT2JqICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyQWN0QXJyID0gdGhpcy5hY3Rpb25PYmpbemhlbl07XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFkZEZyYW1lOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHpoZW4gPSB0aGlzLmNGcmFtZTtcclxuICAgICAgICBpZiAodGhpcy5zdG9wQm8pIHtcclxuICAgICAgICAgICAgaWYgKHpoZW4gPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB6aGVuID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoemhlbiA+PSB0aGlzLnRvdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIHpoZW4gPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB6aGVuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hY3Rpb25PYmogPT0gbnVsbCkge1xyXG4gICAgICAgICAgICB6aGVuKys7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY3VyckFjdEFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyQWN0QXJyWzBdID09ICdnb3RvQW5kU3RvcCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoemhlbiAhPSB0aGlzLmN1cnJBY3RBcnJbMV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VyckFjdEFyclsxXSA8IHRoaXMudG90YWxGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemhlbiA9IHRoaXMuY3VyckFjdEFyclsxXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyQWN0QXJyWzFdID0gdGhpcy50b3RhbEZyYW1lIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpoZW4gPSB0aGlzLmN1cnJBY3RBcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VyckFjdEFyciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VyckFjdEFyclswXSA9PSAnZ290b0FuZFBsYXknKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHpoZW4gIT0gdGhpcy5jdXJyQWN0QXJyWzFdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJBY3RBcnJbMV0gPCB0aGlzLnRvdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpoZW4gPSB0aGlzLmN1cnJBY3RBcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJBY3RBcnJbMV0gPSB0aGlzLnRvdGFsRnJhbWUgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgemhlbiA9IHRoaXMuY3VyckFjdEFyclsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJBY3RBcnIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJvID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyQWN0QXJyWzBdID09ICdzdG9wJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyQWN0QXJyWzBdID09ICdwbGF5Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgemhlbisrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgemhlbisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh6aGVuID49IHRoaXMuZnJhbWVBcnIubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHpoZW4gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih6aGVuKTtcclxuICAgICAgICByZXR1cm4gemhlbjtcclxuICAgIH0sXHJcbiAgICByZW1vdmVUaGlzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IHNwciA9IHRoaXMuZnJhbWVOb2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5uYW1lID0gJyc7XHJcbiAgICAgICAgdGhpcy5mcmFtZUFyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5hY3Rpb25PYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZXZlbnRPYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFnT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNwcml0ZUFyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMucmVjdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5TcHJpdGVPYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZnJhbWVOb2RlLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH0sXHJcbiAgICBnb3RvQW5kUGxheTogZnVuY3Rpb24gKGZyYW1lKSB7XHJcbiAgICAgICAgaWYgKGZyYW1lICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZnJhbWUpID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUgJSAxID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZiA9IGZyYW1lIC0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZiA+IC0xICYmIGYgPCB0aGlzLnRvdGFsRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wQm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZCbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNGcmFtZSA9IGY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25IaXRDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBY3Rpb25PYmoodGhpcy5jRnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhZ09ialtmcmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcEJvID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZCbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY0ZyYW1lID0gdGhpcy50YWdPYmpbZnJhbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IaXRDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih0aGlzLnRhZ09ialtmcmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdvdG9BbmRTdG9wOiBmdW5jdGlvbiAoZnJhbWUpIHtcclxuICAgICAgICBpZiAoZnJhbWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIChmcmFtZSkgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcmFtZSAlIDEgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBmID0gZnJhbWUgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmID4gLTEgJiYgZiA8IHRoaXMudG90YWxGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2ZmQm8gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jRnJhbWUgPSBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSGl0Q29tcG9uZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QWN0aW9uT2JqKHRoaXMuY0ZyYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50YWdPYmpbZnJhbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3BCbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vZmZCbyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY0ZyYW1lID0gdGhpcy50YWdPYmpbZnJhbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IaXRDb21wb25lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEFjdGlvbk9iaih0aGlzLnRhZ09ialtmcmFtZV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHBsYXk6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnN0b3BCbyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMub2ZmQm8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNGcmFtZSsrO1xyXG4gICAgICAgIGxldCB6aGVuID0gdGhpcy5jRnJhbWUgKyAxO1xyXG4gICAgICAgIGlmICh6aGVuIDwgMCkge1xyXG4gICAgICAgICAgICB6aGVuID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHpoZW4gPj0gdGhpcy50b3RhbEZyYW1lKSB7XHJcbiAgICAgICAgICAgIHpoZW4gPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNGcmFtZSA9IHpoZW47XHJcbiAgICAgICAgdGhpcy5vbkhpdENvbXBvbmVudCgpO1xyXG4gICAgICAgIHRoaXMuc2V0QWN0aW9uT2JqKHRoaXMuY0ZyYW1lKTtcclxuICAgIH0sXHJcbiAgICBzdG9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5vZmZCbyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zdG9wQm8gPSB0cnVlO1xyXG4gICAgfSxcclxuICAgIGdldFByYWVudDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl95X3BhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl95X3BhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50O1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRSZWN0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjdDtcclxuICAgIH0sXHJcbiAgICBzZXRTcHJpdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgc3ByID0gdGhpcy5mcmFtZU5vZGUuZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEFyci5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHNwci5zcHJpdGVGcmFtZSA9IHRoaXMuU3ByaXRlT2JqW3RoaXMuc3ByaXRlQXJyW3RoaXMuY3VycmVudEFyclswXV1bMF1bMV1bJ1Nwcml0ZSddWydzcHJpdGVGcmFtZSddXTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGUueCA9IHRoaXMuY3VycmVudEFyclsxXTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGUueSA9IHRoaXMuY3VycmVudEFyclsyXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzcHIuc3ByaXRlRnJhbWUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5yZXZpc2UpIHtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGUud2lkdGggKz0gMTtcclxuICAgICAgICAgICAgdGhpcy5mcmFtZU5vZGUuaGVpZ2h0ICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN0YXJ0WU1DOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub2ZmQm8pIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdGhpcy5jRnJhbWUgPSB0aGlzLmFkZEZyYW1lKCk7XHJcbiAgICAgICAgdGhpcy5vbkV2ZW50RnVuKCk7XHJcbiAgICAgICAgdGhpcy5vbkhpdENvbXBvbmVudCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmZyYW1lQXJyW3RoaXMuY0ZyYW1lXSAhPSB0aGlzLmN1cnJlbnRBcnIpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50QXJyID0gdGhpcy5mcmFtZUFyclt0aGlzLmNGcmFtZV07XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3ByaXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIG9uSGl0Q29tcG9uZW50OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucHoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnB6W2ldWzFdW3RoaXMuY0ZyYW1lXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodGhpcy5weltpXVswXS5lbmFibGVkKSkgeyB0aGlzLnB6W2ldWzBdLmVuYWJsZWQgPSB0cnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3RyIGluIHRoaXMucHpbaV1bMV1bdGhpcy5jRnJhbWVdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHpbaV1bMF1bc3RyXSA9IHRoaXMucHpbaV1bMV1bdGhpcy5jRnJhbWVdW3N0cl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5weltpXVswXS5lbmFibGVkKSB7IHRoaXMucHpbaV1bMF0uZW5hYmxlZCA9IGZhbHNlOyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgc2V0TG9jYXRpb25GdW46IGZ1bmN0aW9uIChYLCBZKSB7XHJcbiAgICAgICAgdGhpcy54ID0gWDtcclxuICAgICAgICB0aGlzLnkgPSBZO1xyXG4gICAgfVxyXG59KVxyXG5jYy5DbGFzcyh7XHJcbiAgICBleHRlbmRzOiBjYy5Db21wb25lbnQsXHJcblxyXG4gICAgcHJvcGVydGllczoge1xyXG4gICAgICAgIHJldmlzZToge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgICAgdG9vbHRpcDogJ+W9k+WHuueOsOmAj+aYjue8nemameaXtuWPr+S7peW8gOWQr++8jOivpeWxnuaAp+S8mumAoOaIkOaJgOacieWbvuWdl+WinuWKoOS4gOWDj+e0oOeahOi3neemu++8jOWPr+iDveS8muWHuueOsOihlOaOpemXrumimO+8jOaJgOS7peacquWHuueOsOmXrumimOS7i+aEj+S4jeimgeWKqCdcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v5L+d5a2Y6LS05Zu+55qEb2Jq77yM5qC85byP5Li6e0lEU3Ry77ya6LS05Zu+fVxyXG4gICAgICAgIFNwcml0ZU9iajoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8v5a2Y5pS+6Zmk5LiN6KKr6K6w5b2V5aSW55qE5omA5pyJTm9kZe+9m+WUr+S4gElEOlvntKDmnZBJRCx4LHld772dXHJcbiAgICAgICAgbm9kZUFsbE9iajoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiB7fSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vL+WtmOaUvuaJgOacieWcsOWbvuS/oeaBr+eahOaVsOe7hOagvOW8j++8mlxyXG4gICAgICAgIC8vL1tcclxuICAgICAgICAvLy8gICAgMC7ntKDmnZDmlbDnu4Q9W+i0tOWbvklELHgseSxb57uY5Yi255qEeHldXVxyXG4gICAgICAgIC8vLyAgICAxLklETm9kZeWvueWDjz17Tm9kZeWUr+S4gElE77yaTm9kZX1cclxuICAgICAgICAvLy8gICAgMi5Ob2Rl5rGg5pWw57uEPVtdXHJcbiAgICAgICAgLy8vICAgIDMu5LiK5qyh5L2/55So5rGg5a+55YOP5o+Q5Y+W55qE5pe26Ze0XHJcbiAgICAgICAgLy8vXVxyXG4gICAgICAgIE1hcFNwckFycjoge1xyXG4gICAgICAgICAgICBkZWZhdWx0OiBbXSxcclxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIC8vL+S/neWtmOWbvuWxguS/oeaBr+eahOaVsOe7hO+8jOagvOW8j+S4ujpcclxuICAgICAgICAvLy9be0xheWVyTmFtZe+8micnLFwiXCJQb3NpdGlvbjpcclxuICAgICAgICAvLy8gICAge1xyXG4gICAgICAgIC8vLyAgICAgICAgeDp75pW05pWwOntcclxuICAgICAgICAvLy8gICAgICAgICAgICB5OnvmlbTmlbA6W+WxgklEKOS5n+aYr+WUr+S4gElEKV19XHJcbiAgICAgICAgLy8vICAgICAgICB9XHJcbiAgICAgICAgLy8vICAgIH1cclxuICAgICAgICAvLy8sTGF5ZXJUeXBlOlwi5Zyw5b2iXCJ9XVxyXG4gICAgICAgIExheWVyQXJyOiB7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IFtdLFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgLy8v5Y+C5pWwMS0xMDBcclxuICAgICAgICBGUFM6IHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fRlBTID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5GUFMyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fRlBTID0gdGhpcy5GUFMyO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX0ZQUyA9IDI1O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9GUFM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mICh2YWx1ZSkgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IE1hdGguZmxvb3IodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpIDw9IDEwMCAmJiBpID49IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX0ZQUyAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50aW1EZWxheSAhPSBudWxsKSB7IHRoaXMudW5zY2hlZHVsZSh0aGlzLnRpbWVyRnVuKSB9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fRlBTID0gaTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGltRGVsYXkgPSAxIC8gdGhpcy5fRlBTO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRpbWVyRnVuLCB0aGlzLnRpbURlbGF5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX0ZQUyA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXBDYW1lcmFOb2RlOiB7XHJcbiAgICAgICAgICAgIGdldCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBDYW1lcmFOb2RlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tYXBDYW1lcmFOb2RlID09IHZhbHVlKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbWFwQ2FtZXJhTm9kZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENhbWVyYU5vZGUub2ZmKCdwb3NpdGlvbi1jaGFuZ2VkJywgdGhpcy5vbk1hcENhbWVyYSwgdGhpcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5vbigncG9zaXRpb24tY2hhbmdlZCcsIHRoaXMub25NYXBDYW1lcmEsIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwQ2FtZXJhTm9kZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2aXNpYmxlOiBmYWxzZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgQkdPYmo6IHtcclxuICAgICAgICAgICAgZ2V0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0JHT2JqO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX0JHT2JqID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZpc2libGU6IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcblxyXG5cclxuICAgIC8qKioqKioqKioqKuacquWjsOaYjuS9huWtmOWcqOeahOWvueWDjyoqKioqKioqL1xyXG4gICAgLy8vdmFyIHRoaXMuTG9hZEJvPWZhbHNlO+e0oOadkOaYr+WQpuWKoOi9veWujOaIkFxyXG4gICAgLy8vdmFyIHRoaXMuTGF5ZXJOb2RlQXJyPVtdO+S/neWtmOWbvuWxgk5vZGXnmoTmlbDnu4RcclxuICAgIC8vL3ZhciB0aGlzLkxheWVyTm9kZU9iaj17fTvkv53lrZjlm77lsYJOb2Rl55qEb2Jq77yM5YyF5ZCr5Zu+5bGC5a696auYXHJcbiAgICAvLy92YXIgdGhpcy5zdGFnZVJlY3RPYmo9bmV3IGNjLlJlY3QoKTvkuIrkuIDmrKHlm77lsYJub2Rl55qE5riy5p+T55+p5b2iXHJcbiAgICAvLy92YXIgdGhpcy5zdGFnZU5vZGVPYmo9e05vZGXllK/kuIBJRO+8mk5vZGV9O+iInuWPsOS4iueahE5vZGVcclxuICAgIC8vL3ZhciB0aGlzLnBvaW50T2JqPWNjLlZlYzIoKTvkuLtub2Rl5oiW5Zu+5bGCbm9kZeS4iuasoeenu+WKqOeahOeCuVxyXG4gICAgLy8vdmFyIHRoaXMua2lsbEFycj1bXTvmsqHmnInmuIXpmaTnmoTlm77niYdJRFxyXG4gICAgLy8vdmFyIHRoaXMua2lsbFNwckFycj1bXTvmsqHmnInmuIXpmaTnmoRTcHLlm77niYdJRFxyXG4gICAgLy8vdmFyIHRoaXMubWNBbGxPYmo9e3076K6w5b2V5omA55So55qE5Yqo55S7XHJcbiAgICAvLy92YXIgdGhpcy50aW1JbnQ9MDsvL+W9k+WJjei/kOihjOeahOaXtumXtFxyXG4gICAgLy8vdmFyIHRoaXMuTG9jT2JqPXt9Oy8v5LiK5qyh5riy5p+T55qE5Zu+5Zy65L2N572uXHJcbiAgICAvLy92YXIgdGhpcy5Mb2FkaW5nKOW3suWKoOi9veeahOi0tOWbvuaVsCzmgLvotLTlm77mlbApOy8v5LiK5qyh5riy5p+T55qE5Zu+5Zy65L2N572uXHJcbiAgICAvLy92YXIgdGhpcy5sYXllclJlY3Q9e1vlrp7pmYXlg4/ntKByZWN077yM5Zu+5bGC55qE5Z2X5a695bqm77yM5Zu+5bGC55qE5Z2X6auY5bqmXX3lm77lsYLph4zlrp7pmYVub2Rl55qE5a696auYXHJcbiAgICAvLy92YXIgdGhpcy5mbGFnUG9pbnQ9Y2MuVmVjMigpO+mbtueCueWdkOagh1xyXG4gICAgLy8vdmFyIHRoaXMuSW5pdCgpO+eoi+W6j+WHhuWkh+WujOaIkOS6huaJp+ihjFxyXG4gICAgLy8vdGhpcy5GUFM75bin6aKRXHJcbiAgICAvLy90aGlzLm1hcENhbWVyYU5vZGU75Zyw5Zu+5pGE5YOP5py6XHJcbiAgICAvLy92YXIgdGhpcy50aW1EZWxheTvorqHml7blmajmr4/mrKHmiafooYznmoTlu7bov59cclxuICAgIC8vL3RoaXMueW1jU3RhZ2VBcnI9W1076Iie5Y+w5LiK55qEeW1j5Yqo55S7XHJcbiAgICAvLy90aGlzLk1hcE1jQXJyPXt9O+iInuWQp+S4iuW3sue7j+acieeahHltYyBJRFxyXG4gICAgLy8vdGhpcy55bWNGcmFtZU9iaj17fTvliqjnlLvmuIXpmaTml7bnlZnkuIvnmoTlvZPliY3luKfku6Xlj4rlnLDlm77ov5DooYznmoTml7bpl7RcclxuICAgIC8vL3RoaXMueW1jVGltSW50PTA75Yqo55S755qE5pe26Ze0XHJcbiAgICAvLy90aGlzLnltY01hcFNwckFycj1bW+WKqOeUu+WQje+8jOWKqOeUu+S4iueahOWxnuaAp11dO1xyXG4gICAgLy8vdGhpcy5vbkxvYWRZTW92aWVDbGlwKHltYyxMYXllck5hbWUsYm865piv5ZCm56ys5LiA5Liq5Yqg5qyh6L29KTsvL0BwdWJsaWPmr4/mrKHliqjnlLvmt7vliqDml7bosIPnlKhcclxuICAgIC8vL3RoaXMub25Mb2FkU3ByaXRlKG5vZGUsTGF5ZXJOYW1lKTsvL0BwdWJsaWPmr4/mrKHlm77lnZfmt7vliqDml7bosIPnlKhcclxuICAgIC8vL3RoaXMub25Mb2FkU3ByaXRlUGFyZW50KG5vZGUsTGF5ZXJOYW1lLGJvOuaYr+WQpuesrOS4gOS4quWKoOasoei9vSk7Ly9AcHVibGlj5q+P5qyh57uE5re75Yqg5pe26LCD55SoXHJcbiAgICAvLy90aGlzLmtpbGxTcHJpdGUobm9kZSxMYXllck5hbWUpOy8vQHB1YmxpY+WbvuWdl+a4hemZpOaXtuiwg+eUqFxyXG4gICAgLy8vdGhpcy5raWxsWU1vdmllQ2xpcChub2RlLExheWVyTmFtZSk7Ly9AcHVibGlj5Yqo55S75riF6Zmk5pe26LCD55SoXHJcbiAgICAvLy90aGlzLmtpbGxTcHJpdGVQYXJlbnQobm9kZSxMYXllck5hbWUpOy8vQHB1YmxpY+e7hOa4hemZpOaXtuiwg+eUqFxyXG4gICAgLy8vdGhpcy5NYXBSZWN0Oy8vQHB1YmxpY+WcsOWbvueahOefqeW9olxyXG4gICAgLy8vdGhpcy5raWxsRnJhbWVBcnI7Ly/muIXpmaTlhYvpmobotLTlm77nmoRmcmFtZVxyXG4gICAgLy8vdGhpcy5zaG93Tm9kZU9iajsvL+aYvuekuuWcqOWQjuWPsOeahOWvueWDj05vZGVcclxuICAgIC8vL3RoaXMubWNQb29sO3tJRDp7dGltZXI65L2/55So5pe26Ze0LHBvb2w6W119fVxyXG4gICAgb25Mb2FkMjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHRoaXMuTG9jT2JqID0ge307XHJcbiAgICAgICAgdGhpcy5pc0hpdCA9IHt9XHJcbiAgICAgICAgdGhpcy50aW1JbnQgPSAwOy8v5Zyw5Zu+6L+Q6KGM55qE5pe26Ze077yM5Lul56eS5Li65Y2V5L2NXHJcbiAgICAgICAgdGhpcy5wb2ludE9iaiA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RhZ2VSZWN0T2JqID0ge307XHJcbiAgICAgICAgdGhpcy5zaG93Tm9kZU9iaiA9IHt9O1xyXG4gICAgICAgIHRoaXMuc3RhZ2VOb2RlT2JqID0ge307XHJcbiAgICAgICAgdGhpcy5Mb2FkQm8gPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm9uU3JwaXRlRnVuKCk7XHJcbiAgICAgICAgdGhpcy55bWNTdGFnZUFyciA9IFtdO1xyXG4gICAgICAgIHRoaXMuTWFwTWNBcnIgPSB7fTtcclxuICAgICAgICB0aGlzLnltY0ZyYW1lT2JqID0ge307XHJcbiAgICAgICAgdGhpcy55bWNUaW1JbnQgPSAwO1xyXG4gICAgICAgIHRoaXMubWNQb29sID0ge307XHJcbiAgICAgICAgLy8gdGhpcy5kYXRhID0gbmV3IFByb3h5KHt4OjAseTowfSwge1xyXG4gICAgICAgIC8vICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BLZXksIHJlY2VpdmVyKSB7XHJcblxyXG4gICAgICAgIC8vICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICAvLyAgICAgfSxcclxuICAgICAgICAvLyAgICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wS2V5LCB2YWx1ZSwgcmVjZWl2ZXIpIHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKHRhcmdldCwgcHJvcEtleSwgdmFsdWUpXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICBpZiAodGhpcy50aW1EZWxheSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGltRGVsYXkgPSAxIC8gdGhpcy5GUFM7Ly/mr4/mrKHmiafooYznmoTlu7bov59cclxuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZSh0aGlzLnRpbWVyRnVuLCB0aGlzLnRpbURlbGF5KTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGltZXJGdW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLnRpbUludCArPSB0aGlzLnRpbURlbGF5O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy55bWNTdGFnZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnltY1N0YWdlQXJyW2ldLnN0YXJ0WU1DKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMueW1jVGltSW50Kys7XHJcbiAgICB9LFxyXG4gICAgc2hvd0FsbCgpe1xyXG4gICAgICAgIHRoaXMuX3Nob3dBbGxCbz10cnVlO1xyXG4gICAgfSxcclxuICAgIGFkZEFsbDpmdW5jdGlvbigpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5re75Yqg5LqGXCIpXHJcbiAgICAgICAgZm9yIChsZXQgTGF5ZXJTdHIgaW4gdGhpcy5ub2RlQWxsT2JqKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ0xheWVyTmFtZSddID09IExheWVyU3RyKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ10gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpZFN0ciBpbiB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJTdHJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICB0aGlzLkluZm8oTGF5ZXJTdHIsIGlkU3RyLCBpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGlmICh0aGlzLm5vZGVBbGxPYmpbc3RyXVtpZFN0cl1bM10gPT0gbnVsbCkgeyB0aGlzLm5vZGVBbGxPYmpbc3RyXVtpZFN0cl1bM10gPSBbXTsgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhcnIgPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJTdHJdW2lkU3RyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROb2RlQ2hpbGRGdW4obGFyclswXSwgKGxhcnJbMV0gLSB0aGlzLmZsYWdQb2ludC54KSwgKGxhcnJbMl0gLSB0aGlzLmZsYWdQb2ludC55KSwgaSwgaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKioqKioqKuiuvue9rk5vZGXlnZDmoIfvvIhYLFnvvInlubbliLfmlrDlnLDlm77vvIzlj6/ku6Xorr7nva7kuLpudWxsKioqKioqKiovXHJcbiAgICAvL0BwdWJsaWNcclxuICAgIHNldExvY2F0aW9uRnVuOiBmdW5jdGlvbiAoeCwgeSwgbnN0ciwgYm8pIHtcclxuICAgICAgICBpZiAoIXRoaXMuTG9hZEJvfHx0aGlzLl9zaG93QWxsQm8pIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgaWYgKG5zdHIgPT0gbnVsbCkgeyBuc3RyID0gXCJ0aGlzXCI7IH1cclxuICAgICAgICBpZiAobnN0ciAhPSBcInRoaXNcIikgeyBpZiAodGhpcy5MYXllck5vZGVPYmpbbnN0cl0gPT0gbnVsbCkgeyByZXR1cm47IH0gfVxyXG4gICAgICAgIGlmICh0aGlzLnBvaW50T2JqW25zdHJdID09IG51bGwpIHsgdGhpcy5wb2ludE9ialtuc3RyXSA9IG5ldyBjYy5WZWMyKHRoaXMubm9kZS54IC0gMSwgdGhpcy5ub2RlLnkgLSAxKTsgfVxyXG4gICAgICAgIGxldCBuO1xyXG4gICAgICAgIGlmIChuc3RyID09IFwidGhpc1wiKSB7IG4gPSB0aGlzLm5vZGU7IH0gZWxzZSB7IG4gPSB0aGlzLkxheWVyTm9kZU9ialtuc3RyXTsgfVxyXG4gICAgICAgIGlmICh4ICE9IG51bGwpIHsgbi54ID0geDsgfVxyXG4gICAgICAgIGlmICh5ICE9IG51bGwpIHsgbi55ID0geTsgfVxyXG4gICAgICAgIGxldCB0WCA9IG4ueDtcclxuICAgICAgICBsZXQgdFkgPSBuLnk7XHJcbiAgICAgICAgaWYgKHRoaXMuX21hcENhbWVyYU5vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0WCArPSB0aGlzLl9tYXBDYW1lcmFOb2RlLng7XHJcbiAgICAgICAgICAgIHRZICs9IHRoaXMuX21hcENhbWVyYU5vZGUueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/mn6XnnIvotJ/lnZDmoIdcclxuICAgICAgICBpZiAodGhpcy5wb2ludE9ialtuc3RyXS54ICE9IHRYIHx8IHRoaXMucG9pbnRPYmpbbnN0cl0ueSAhPSB0WSB8fCBibykge1xyXG4gICAgICAgICAgICBsZXQgZGlhbiA9IG4ucGFyZW50LmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MihuLngsIG4ueSkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFwQ2FtZXJhTm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkFkZE1hcENoaWxkRnVuKG5ldyBjYy5SZWN0KChjYy52aWV3LmdldFZpc2libGVPcmlnaW4oKS54IC0gZGlhbi54KSAvIHRoaXMubm9kZS5zY2FsZVgsIChjYy52aWV3LmdldFZpc2libGVPcmlnaW4oKS55IC0gZGlhbi55KSAvIHRoaXMubm9kZS5zY2FsZVksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCAvIHRoaXMubm9kZS5zY2FsZVgsIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQgLyB0aGlzLm5vZGUuc2NhbGVZKSwgbnN0cik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5BZGRNYXBDaGlsZEZ1bihuZXcgY2MuUmVjdCgoY2Mudmlldy5nZXRWaXNpYmxlT3JpZ2luKCkueCAtIGRpYW4ueCArIHRoaXMuX21hcENhbWVyYU5vZGUueCkgLyB0aGlzLm5vZGUuc2NhbGVYLCAoY2Mudmlldy5nZXRWaXNpYmxlT3JpZ2luKCkueSAtIGRpYW4ueSArIHRoaXMuX21hcENhbWVyYU5vZGUueSkgLyB0aGlzLm5vZGUuc2NhbGVZLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGggLyB0aGlzLm5vZGUuc2NhbGVYLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0IC8gdGhpcy5ub2RlLnNjYWxlWSksIG5zdHIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucG9pbnRPYmpbbnN0cl0ueCA9IHRYO1xyXG4gICAgICAgICAgICB0aGlzLnBvaW50T2JqW25zdHJdLnkgPSB0WTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIG9uTWFwQ2FtZXJhOiBmdW5jdGlvbiAoKSB7Ly/mkYTlg4/mnLrmm7TmlLnkuovku7ZcclxuXHJcbiAgICAgICAgdGhpcy5zZXRMb2NhdGlvbkZ1bigpO1xyXG4gICAgfSxcclxuICAgIC8qKioqKioqKuS7peiInuWPsOWdkOagh+e8qeaUvuWcsOWbvioqKioqKiovXHJcbiAgICBzY2FsZUZ1bjogZnVuY3Rpb24gKHB4LCBweSwgdHgsIHR5KSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5zY2FsZVggIT0gdHggfHwgdGhpcy5ub2RlLnNjYWxlWSAhPSB0eSkge1xyXG4gICAgICAgICAgICBpZiAodHggPj0gMC4xIHx8IHR5ID49IDAuMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHAgPSBjYy52MigocHggLSB0aGlzLm5vZGUueCkgLyB0aGlzLm5vZGUuc2NhbGVYLCAocHkgLSB0aGlzLm5vZGUueSkgLyB0aGlzLm5vZGUuc2NhbGVZKVxyXG4gICAgICAgICAgICAgICAgbGV0IHAyID0gY2MudjIocHggLSBwLngsIHB5IC0gcC55KTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSB0eDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSB0eTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYXRpb25GdW4ocC54ICogKHRoaXMubm9kZS5zY2FsZVggLSAxKSAqIC0xICsgcDIueCwgcC55ICogKHRoaXMubm9kZS5zY2FsZVkgLSAxKSAqIC0xICsgcDIueSwgJ3RoaXMnLCB0cnVlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8vQHB1YmxpY1xyXG4gICAgcmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy51bnNjaGVkdWxlKHRoaXMudGltZXJGdW4pO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MYXllck5vZGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5MYXllck5vZGVBcnJbaV0uZGVzdHJveUFsbENoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuTGF5ZXJOb2RlQXJyW2ldLnBhcmVudCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMuTGF5ZXJOb2RlQXJyW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLk1hcFNwckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5NYXBTcHJBcnJbaV1bMl07XHJcbiAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYXJyLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJbY10uZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHMgaW4gdGhpcy5tY0Fycikge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5tY0FycltzXVsncG9vbCddO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGFyci5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgYXJyW2NdLnJlbW92ZVRoaXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IHRoaXMua2lsbEZyYW1lQXJyLmxlbmd0aDsgcysrKSB7XHJcbiAgICAgICAgICAgIHRoaXMua2lsbEZyYW1lQXJyW3NdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMua2lsbFNwckFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5raWxsU3ByQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5sb2FkZXIucmVsZWFzZVJlcyh0aGlzLmtpbGxTcHJBcnJbMF0sIGNjLlNwcml0ZUZyYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBzdHIgaW4gdGhpcy5ub2RlUGFyZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVQYXJlbnRPYmpbc3RyXVs3XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVQYXJlbnRPYmpbc3RyXVs3XS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2MubG9hZGVyLnJlbGVhc2UodGhpcy5raWxsQXJyKTsvL+mHiuaUvui0tOWbvlxyXG4gICAgICAgIGlmICh0aGlzLnBhdGhGaW5kICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnJlbW92ZUNvbXBvbmVudCh0aGlzLnBhdGhGaW5kKTsvL1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5CR09iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJHT2JqW1wiYWx0XCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNjLmxvYWRlci5yZWxlYXNlUmVzKHRoaXMuQkdPYmpbJ3BhdGgnXSArIFwiL3NcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJHT2JqW1wiYWx0XCJdID0gbnVsbFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0ciBpbiB0aGlzLkJHT2JqWydzcHJpdGUnXSkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VBc3NldCh0aGlzLkJHT2JqWydzcHJpdGUnXVtzdHJdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuQkdPYmpbJ3Bvb2wnXS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CR09ialsncG9vbCddW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5CR05vZGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CR05vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5CR05vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9tYXBDYW1lcmFOb2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5fbWFwQ2FtZXJhTm9kZS5vZmYoJ3Bvc2l0aW9uLWNoYW5nZWQnLCB0aGlzLm9uTWFwQ2FtZXJhLCB0aGlzKTsvL+mUgOavgeaRhOWDj+acuuS4iueahOS6i+S7tlxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkJHT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1jQXJyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnBhdGhGaW5kID0gbnVsbDtcclxuICAgICAgICB0aGlzLlBhdGhHcmlkT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLmtpbGxGcmFtZUFyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5ub2RlUGFyZW50T2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLlNwcml0ZU9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5NYXBTcHJBcnIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGF5ZXJBcnIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTGF5ZXJOb2RlQXJyID0gbnVsbDtcclxuICAgICAgICB0aGlzLkxheWVyTm9kZU9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGFnZVJlY3RPYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc3RhZ2VOb2RlT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNob3dOb2RlT2JqID0gbnVsbDtcclxuICAgICAgICB0aGlzLmtpbGxBcnIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMua2lsbFNwckFyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5Mb2NPYmogPSBudWxsO1xyXG4gICAgICAgIHRoaXMuTG9hZGluZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXllclJlY3QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuSW5pdCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRZTW92aWVDbGlwID0gbnVsbDtcclxuICAgICAgICB0aGlzLm9uTG9hZFNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRTcHJpdGVQYXJlbnQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMua2lsbFNwcml0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5raWxsU3ByaXRlUGFyZW50ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmtpbGxZTW92aWVDbGlwID0gbnVsbDtcclxuICAgICAgICB0aGlzLnltY0FsbE9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy55bWNTdGFnZUFyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5NYXBNY0FyciA9IG51bGw7XHJcbiAgICAgICAgdGhpcy55bWNGcmFtZU9iaiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy55bWNNYXBTcHJBcnIgPSBudWxsO1xyXG4gICAgfSxcclxuICAgIC8qKioqKioqKui/lOWbnuWbvuWxguWunumZheWvueWDj+eahOaVsOaNrioqKioqKiovXHJcbiAgICAvL0BwdWJsaWNcclxuICAgIGdldExheWVyUmVjdEZ1bjogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgIT0gbnVsbCkgeyByZXR1cm4gdGhpcy5sYXllclJlY3Rbc3RyXVswXTsgfVxyXG4gICAgfSxcclxuICAgIC8vQHB1YmxpY1xyXG4gICAgZ2V0TGF5ZXJOb2RlRnVuOiBmdW5jdGlvbiAoc3RyKSB7XHJcbiAgICAgICAgaWYgKHN0ciAhPSBudWxsKSB7IHJldHVybiB0aGlzLkxheWVyTm9kZU9ialtzdHJdOyB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKua4hemZpOaxoOS4reeahG5vZGUqKioqKioqKi9cclxuICAgIC8vQHB1YmxpY1xyXG4gICAga2lsbE5vZGVQb29sOiBmdW5jdGlvbiAodGltT3JOYW1lKSB7XHJcbiAgICAgICAgaWYgKHRpbU9yTmFtZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGxldCBibyA9ICh0aW1Pck5hbWUuY29uc3RydWN0b3IgPT0gTnVtYmVyKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuTWFwU3ByQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLk1hcFNwckFycltpXVsyXTtcclxuICAgICAgICAgICAgaWYgKGJvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgaWQgPSB0aGlzLk1hcFNwckFycltpXVszXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbUludCAtIGlkID4gdGltT3JOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBhcnIubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyW2ldLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5NYXBTcHJBcnJbaV1bMl0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBpZCA9IHRoaXMuTWFwU3ByQXJyW2ldWzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkID09IHRpbU9yTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYXJyLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuTWFwU3ByQXJyW2ldWzJdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgc3RyIGluIHRoaXMubWNQb29sKSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLm1jUG9vbFtzdHJdW1wicG9vbFwiXTtcclxuICAgICAgICAgICAgaWYgKGJvKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdCA9IHRoaXMubWNQb29sW3N0cl1bXCJ0aW1lclwiXTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpbUludCAtIHQgPiB0aW1Pck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IGFyci5sZW5ndGg7IGMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJbaV0ucmVtb3ZlVGhpcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1jUG9vbFtzdHJdW1wicG9vbFwiXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubWNQb29sW3N0cl1bXCJuYW1lXCJdID09IHRpbU9yTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgYXJyLmxlbmd0aDsgYysrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFycltpXS5yZW1vdmVUaGlzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWNQb29sW3N0cl1bXCJwb29sXCJdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKipwdWJsaWMqKioq5pu05pS55pu/5o2i5omA5pyJ5Zu+5Z2XKioqKioqKi9cclxuICAgIHNldFNwcml0ZUZyYW1lOiBmdW5jdGlvbiAocGF0aCwgbmFtZSwgZnJhbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5TcHJpdGVPYmpbcGF0aCArICctJyArIG5hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHBhID0gdGhpcy5TcHJpdGVPYmpbcGF0aCArICctJyArIG5hbWVdO1xyXG4gICAgICAgICAgICB0aGlzLlNwcml0ZU9ialtwYXRoICsgJy0nICsgbmFtZV0gPSBmcmFtZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkxheWVyTm9kZUFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbCA9IDA7IGwgPCB0aGlzLkxheWVyTm9kZUFycltpXS5jaGlsZHJlbkNvdW50OyBsKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbiA9IHRoaXMuTGF5ZXJOb2RlQXJyW2ldLmNoaWxkcmVuW2xdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHIgPSBuLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcHIgIT0gbnVsbCAmJiBzcHIuc3ByaXRlRnJhbWUgPT0gcGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByLnNwcml0ZUZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIExvYWRMZW5ndGg6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5NYXBPYmpbJ2xvYWRMZW4nXVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKuWKoOi9veaJgOaciei0tOWbvioqKioqKioqL1xyXG4gICAgb25TcnBpdGVGdW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmtpbGxBcnIgPSBbXTtcclxuICAgICAgICB0aGlzLmtpbGxTcHJBcnIgPSBbXTtcclxuICAgICAgICB0aGlzLmtpbGxGcmFtZUFyciA9IFtdO1xyXG4gICAgICAgIGxldCBsb2FkSW50ID0gMDtcclxuICAgICAgICBsZXQgbG9hZExlbiA9IHRoaXMuTWFwT2JqWydsb2FkTGVuJ107XHJcblxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuQkdPYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsb2FkTGVuKys7XHJcbiAgICAgICAgICAgIGNjLmxvYWRlci5sb2FkUmVzKHRoaXMuQkdPYmpbJ3BhdGgnXSArIFwiL3NcIiwgY2MuU3ByaXRlQXRsYXMsIGZ1bmN0aW9uIChlcnIsIGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkSW50Kys7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5CR09ialtcImFsdFwiXSA9IGF0bGFzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5Mb2FkaW5nICE9IG51bGwpIHsgX3RoaXMuTG9hZGluZyhsb2FkSW50LCBsb2FkTGVuKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRJbnQgPj0gbG9hZExlbikgeyBfdGhpcy5vbkxheWVyRnVuKCk7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKGxvYWRMZW4gPT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxvYWRMZW4gPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLm9uTGF5ZXJGdW4oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZnJhQXJyID0gdGhpcy5NYXBPYmpbJ2ZyYUFyciddO1xyXG4gICAgICAgIGxldCBhdGxBcnIgPSB0aGlzLk1hcE9ialsnYXRsQXJyJ107XHJcblxyXG4gICAgICAgIGxldCByQXJyID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IHN0ciBpbiBmcmFBcnIpIHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyLCBjYy5TcHJpdGVGcmFtZSwgZnVuY3Rpb24gKGVyciwgc3ByaXRlRnJhbWUpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmID0gc3ByaXRlRnJhbWUuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIF90aGlzLmtpbGxGcmFtZUFycltfdGhpcy5raWxsRnJhbWVBcnIubGVuZ3RoXSA9IGY7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5TcHJpdGVPYmpbc3RyICsgJy0nICsgZnJhQXJyW3N0cl1dID0gZjtcclxuICAgICAgICAgICAgICAgIF90aGlzLmtpbGxTcHJBcnJbX3RoaXMua2lsbFNwckFyci5sZW5ndGhdID0gW3N0ciwgc3ByaXRlRnJhbWVdXHJcbiAgICAgICAgICAgICAgICBmLmdldFRleHR1cmUoKS5zZXRGaWx0ZXJzKGNjLlRleHR1cmUyRC5GaWx0ZXIuTkVBUkVTVCwgY2MuVGV4dHVyZTJELkZpbHRlci5ORUFSRVNUKTtcclxuICAgICAgICAgICAgICAgIGxvYWRJbnQrKztcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5Mb2FkaW5nICE9IG51bGwpIHsgX3RoaXMuTG9hZGluZyhsb2FkSW50LCBsb2FkTGVuKTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRJbnQgPj0gbG9hZExlbikgeyBfdGhpcy5vbkxheWVyRnVuKCk7IH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZyYW1lMiA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgc3RyMiBpbiBhdGxBcnIpIHtcclxuICAgICAgICAgICAgY2MubG9hZGVyLmxvYWRSZXMoc3RyMiwgY2MuU3ByaXRlQXRsYXMsIGZ1bmN0aW9uIChlcnIsIGF0bGFzKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGVwcyA9IGNjLmxvYWRlci5nZXREZXBlbmRzUmVjdXJzaXZlbHkoYXRsYXMpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhdGxBcnJbc3RyMl0ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmcmFtZTIgPSBhdGxhcy5nZXRTcHJpdGVGcmFtZShhdGxBcnJbc3RyMl1baV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmtpbGxGcmFtZUFycltfdGhpcy5raWxsRnJhbWVBcnIubGVuZ3RoXSA9IGZyYW1lMjtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5TcHJpdGVPYmpbc3RyMiArICctJyArIGF0bEFycltzdHIyXVtpXV0gPSBmcmFtZTI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBhID0gMDsgYSA8IGRlcHMubGVuZ3RoOyBhKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WPr+WQpuS8mOWMlj9cclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5raWxsQXJyW190aGlzLmtpbGxBcnIubGVuZ3RoXSA9IGRlcHNbYV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsb2FkSW50Kys7XHJcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuTG9hZGluZyAhPSBudWxsKSB7IF90aGlzLkxvYWRpbmcobG9hZEludCwgbG9hZExlbik7IH1cclxuICAgICAgICAgICAgICAgIGlmIChsb2FkSW50ID49IGxvYWRMZW4pIHsgX3RoaXMub25MYXllckZ1bigpOyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vY2MubG9hZGVyLnJlbGVhc2UodGhpcy5raWxsQXJyKTsvL+mHiuaUvui0tOWbvlxyXG4gICAgfSxcclxuICAgIGFkZE5vZGU6IGZ1bmN0aW9uIChvYmosIG4pIHtcclxuXHJcbiAgICAgICAgbGV0IG5ld05vZGU7XHJcbiAgICAgICAgaWYgKG4gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBuZXdOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBuZXdOb2RlID0gbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3Tm9kZS5hbmNob3JYID0gMDtcclxuICAgICAgICBuZXdOb2RlLmFuY2hvclkgPSAxO1xyXG4gICAgICAgIGZvciAobGV0IHN0ciBpbiBvYmopIHtcclxuICAgICAgICAgICAgaWYgKHN0ciA9PSBcIkNvbGxpZGVyXCIgfHwgc3RyID09IFwiUG9seWdvbkNvbGxpZGVyXCIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGl0T2JqZWN0KG5ld05vZGUsIHRoaXMuZ2V0Q29tcG9uZW50VHlwZShzdHIpLCBvYmpbc3RyXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RyID09IFwiU3ByaXRlXCIgfHwgc3RyID09IFwiR3JhcGhpY3NcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IFNwck9iaiA9IG9ialtzdHJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNwciA9IG5ld05vZGUuYWRkQ29tcG9uZW50KHRoaXMuZ2V0Q29tcG9uZW50VHlwZShzdHIpKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHN0cjIgaW4gU3ByT2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA9PSBcIkdyYXBoaWNzXCIgJiYgKHN0cjIgPT0gXCJyZWN0XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHIyID09IFwicmVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcHIucmVjdChTcHJPYmpbc3RyMl0ueCwgU3ByT2JqW3N0cjJdLnksIFNwck9ialtzdHIyXS53aWR0aCwgU3ByT2JqW3N0cjJdLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0cjIgPT0gXCJzcHJpdGVGcmFtZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwcltzdHIyXSA9IHRoaXMuU3ByaXRlT2JqW1Nwck9ialtzdHIyXV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdHIyID09IFwiZmlsbENvbG9yXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByW3N0cjJdID0gbmV3IGNjLkNvbG9yKFNwck9ialtzdHIyXS5yLCBTcHJPYmpbc3RyMl0uZywgU3ByT2JqW3N0cjJdLmIsIFNwck9ialtzdHIyXS5hKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJbc3RyMl0gPSBTcHJPYmpbc3RyMl07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmV2aXNlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ciA9PSAnU3ByaXRlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdOb2RlLndpZHRoICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld05vZGUuaGVpZ2h0ICs9IDE7O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9IGlmIChzdHIgPT0gXCJHcmFwaGljc1wiKSB7IHNwci5maWxsKCk7IH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5ld05vZGVbc3RyXSA9IG9ialtzdHJdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdOb2RlO1xyXG4gICAgfSxcclxuICAgIGhpdE9iamVjdDogZnVuY3Rpb24gKG5ld05vZGUsIHR5cGUsIGFycikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBzcHIgPSBuZXdOb2RlLmFkZENvbXBvbmVudCh0eXBlKTtcclxuICAgICAgICAgICAgbGV0IG9iaiA9IGFycltpXTtcclxuICAgICAgICAgICAgaWYgKG9ialsncHonXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3Tm9kZS5weiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Tm9kZS5weiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS5weltuZXdOb2RlLnB6Lmxlbmd0aF0gPSBbc3ByLCBvYmpbJ3B6J11dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAobGV0IHN0ciBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIHNwcltzdHJdID0gb2JqW3N0cl07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0Q29tcG9uZW50VHlwZTogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIGlmIChzdHIgPT0gXCJTcHJpdGVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuU3ByaXRlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoc3RyID09IFwiR3JhcGhpY3NcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuR3JhcGhpY3M7XHJcbiAgICAgICAgfSBlbHNlIGlmIChzdHIgPT0gXCJDb2xsaWRlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5Cb3hDb2xsaWRlcjtcclxuICAgICAgICB9IGVsc2UgaWYgKHN0ciA9PSBcIlBvbHlnb25Db2xsaWRlclwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjYy5Qb2x5Z29uQ29sbGlkZXI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldEJHTm9kZTogZnVuY3Rpb24gKHgsIHkpIHtcclxuICAgICAgICBsZXQgc3RyID0gdGhpcy5CR09ialtcIm5hbWVcIl0gKyB4ICsgdGhpcy5CR09ialtcInBuYW1lXCJdICsgeTtcclxuICAgICAgICBsZXQgbjtcclxuICAgICAgICBpZiAodGhpcy5CR09ialsncG9vbCddLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbGV0IGwgPSB0aGlzLkJHT2JqWydwb29sJ10ubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICBuID0gdGhpcy5CR09ialsncG9vbCddW2xdO1xyXG4gICAgICAgICAgICB0aGlzLkJHT2JqWydwb29sJ10uc3BsaWNlKGwsIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG4gPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgICAgICBuLnNwciA9IG4uYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIG4uYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgICAgIG4uYW5jaG9yWSA9IDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5CR09ialsnc3ByaXRlJ11bc3RyXSAhPSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICBuLnNwci5zcHJpdGVGcmFtZSA9IHRoaXMuQkdPYmpbJ3Nwcml0ZSddW3N0cl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5Mb2FkTWFwQkcoc3RyKTtcclxuICAgICAgICAgICAgbi5zcHIuc3ByaXRlRnJhbWUgPSB0aGlzLkJHT2JqW1wiYWx0XCJdLmdldFNwcml0ZUZyYW1lKHN0cik7XHJcbiAgICAgICAgICAgIGlmIChuLnNwci5zcHJpdGVGcmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuaJvuWIsOepulwiICsgc3RyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBueCA9IHggKiB0aGlzLkJHT2JqWyd3aWR0aCddO1xyXG4gICAgICAgIGxldCBueSA9IHkgKiB0aGlzLkJHT2JqWydoZWlnaHQnXSAqIC0xO1xyXG4gICAgICAgIG4ueCA9IG54O1xyXG4gICAgICAgIG4ueSA9IG55O1xyXG4gICAgICAgIG4ud2lkdGggPSB0aGlzLkJHT2JqWyd3aWR0aCddO1xyXG4gICAgICAgIG4uaGVpZ2h0ID0gdGhpcy5CR09ialsnaGVpZ2h0J107XHJcbiAgICAgICAgbi5wYXJlbnQgPSB0aGlzLkJHTm9kZTtcclxuICAgICAgICB0aGlzLkJHT2JqW1wic3RhZ2VOb2RlXCJdW3N0cl0gPSBuO1xyXG5cclxuICAgIH0sXHJcbiAgICBCR0luaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5CR09iaiA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHRoaXMuQkdPYmpbJ3JlY3QnXSA9IG5ldyBjYy5SZWN0KHRoaXMuQkdPYmpbJ3gnXSwgdGhpcy5CR09ialsneSddLCB0aGlzLkJHT2JqWyd3aWR0aCddICogdGhpcy5CR09ialsnbngnXSwgdGhpcy5CR09ialsnaGVpZ2h0J10gKiB0aGlzLkJHT2JqWydueSddKTtcclxuICAgICAgICB0aGlzLkJHT2JqWydwb29sJ10gPSBbXTtcclxuICAgICAgICB0aGlzLkJHT2JqWydzcHJpdGUnXSA9IHt9O1xyXG4gICAgICAgIHRoaXMuQkdPYmpbXCJsZW5ndGhcIl0gPSB0aGlzLkJHT2JqWydueCddICogdGhpcy5CR09ialsnbnknXTtcclxuICAgICAgICB0aGlzLkJHT2JqW1wibG9hZEFyclwiXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuQkdPYmpbXCJsb2FkT2JqXCJdID0ge307XHJcbiAgICAgICAgdGhpcy5CR09ialtcInN0YWdlTm9kZVwiXSA9IHt9O1xyXG4gICAgICAgIHRoaXMuQkdPYmpbXCJyZWN0MlwiXSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5CR09ialtcImxvYWRCb1wiXSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuQkdOb2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB0aGlzLkJHTm9kZS56SW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLkJHTm9kZS54ID0gdGhpcy5CR09ialsneCddO1xyXG4gICAgICAgIHRoaXMuQkdOb2RlLnkgPSB0aGlzLkJHT2JqWyd5J107XHJcbiAgICAgICAgdGhpcy5CR05vZGUucGFyZW50ID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGZvciAobGV0IHcgPSAwOyB3IDwgdGhpcy5CR09ialsnbngnXTsgdysrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgdGhpcy5CR09ialsnbnknXTsgaCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3RyID0gdGhpcy5CR09ialtcIm5hbWVcIl0gKyB3ICsgdGhpcy5CR09ialtcInBuYW1lXCJdICsgaDtcclxuICAgICAgICAgICAgICAgIHRoaXMuQkdPYmpbXCJsb2FkQXJyXCJdW3RoaXMuQkdPYmpbXCJsb2FkQXJyXCJdLmxlbmd0aF0gPSBzdHI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJHT2JqW1wibG9hZE9ialwiXVtzdHJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Mb2FkTWFwQkcobnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgfSxcclxuICAgIGdldEJHSUQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgaWQgPSB0aGlzLkJHT2JqW1wibG9hZEFyclwiXS5sZW5ndGggLSAxXHJcbiAgICAgICAgbGV0IHN0ciA9IHRoaXMuQkdPYmpbXCJsb2FkQXJyXCJdW2lkXTtcclxuICAgICAgICB0aGlzLkJHT2JqW1wibG9hZEFyclwiXS5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgIHJldHVybiBzdHI7XHJcbiAgICB9LFxyXG4gICAgTG9hZE1hcEJHOiBmdW5jdGlvbiAoc3RyLCBibykge1xyXG4gICAgICAgIGlmICh0aGlzLkJHT2JqID09IG51bGwgfHwgdGhpcy5CR09ialtcImxlbmd0aFwiXSA9PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKGJvKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLkJHT2JqW1wibG9hZEFyclwiXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzdHIgPSB0aGlzLmdldEJHSUQoKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlICh0aGlzLkJHT2JqW1wic3RhZ2VOb2RlXCJdW3N0cl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ciA9IHRoaXMuZ2V0QkdJRCgpOztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuQkdPYmpbXCJsb2FkT2JqXCJdW3N0cl0pIHtcclxuICAgICAgICAgICAgdGhpcy5CR09ialtcImxvYWRPYmpcIl1bc3RyXSA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYy5sb2FkZXIubG9hZFJlcyh0aGlzLkJHT2JqWydwYXRoJ10gKyBcIi9cIiArIHN0ciwgY2MuU3ByaXRlRnJhbWUsIGZ1bmN0aW9uIChlcnIsIHNwcml0ZUZyYW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX3RoaXMuQkdPYmogPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VBc3NldChzcHJpdGVGcmFtZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX3RoaXMuQkdPYmpbJ3Nwcml0ZSddW3N0cl0gPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgaWYgKF90aGlzLkJHT2JqW1wic3RhZ2VOb2RlXCJdW3N0cl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgX3RoaXMuQkdPYmpbXCJzdGFnZU5vZGVcIl1bc3RyXS5zcHIuc3ByaXRlRnJhbWUgPSBzcHJpdGVGcmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfdGhpcy5CR09ialtcImxlbmd0aFwiXS0tO1xyXG4gICAgICAgICAgICBpZiAoX3RoaXMuQkdPYmpbXCJsZW5ndGhcIl0gPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY2MubG9hZGVyLnJlbGVhc2VSZXMoX3RoaXMuQkdPYmpbJ3BhdGgnXSArIFwiL3NcIik7XHJcbiAgICAgICAgICAgICAgICBfdGhpcy5CR09ialtcImFsdFwiXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLkJHT2JqW1wibG9hZE9ialwiXSA9IG51bGw7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5Mb2FkTWFwQkcobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSlcclxuICAgIH0sXHJcbiAgICBBZGRNYXBCRzogZnVuY3Rpb24gKHJlY3QpIHtcclxuXHJcbiAgICAgICAgbGV0IHB3ID0gdGhpcy5CR09ialsnd2lkdGgnXTtcclxuICAgICAgICBsZXQgcGggPSB0aGlzLkJHT2JqWydoZWlnaHQnXTtcclxuICAgICAgICB0aGlzLkJHT2JqWydyZWN0J10ueCA9IDA7XHJcbiAgICAgICAgdGhpcy5CR09ialsncmVjdCddLnkgPSAwO1xyXG5cclxuICAgICAgICBsZXQgaW50ZXJzZWN0aW9uID0gbmV3IGNjLlJlY3QoKTtcclxuICAgICAgICB0aGlzLkJHT2JqWydyZWN0J10uaW50ZXJzZWN0aW9uKGludGVyc2VjdGlvbiwgbmV3IGNjLlJlY3QocmVjdC54IC0gdGhpcy5CR05vZGUueCwgcmVjdC55ICogLTEgLSByZWN0LmhlaWdodCAtIHRoaXMuQkdOb2RlLnkgKiAtMSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpKTtcclxuICAgICAgICBsZXQgY3ggPSBNYXRoLmZsb29yKGludGVyc2VjdGlvbi54IC8gcHcpO1xyXG4gICAgICAgIGxldCBjeSA9IE1hdGguZmxvb3IoaW50ZXJzZWN0aW9uLnkgLyBwaCk7XHJcbiAgICAgICAgbGV0IGN3ID0gTWF0aC5jZWlsKChpbnRlcnNlY3Rpb24ueCArIGludGVyc2VjdGlvbi53aWR0aCkgLyBwdyk7XHJcbiAgICAgICAgbGV0IGNoID0gTWF0aC5jZWlsKChpbnRlcnNlY3Rpb24ueSArIGludGVyc2VjdGlvbi5oZWlnaHQpIC8gcGgpO1xyXG4gICAgICAgIGlmIChjeCA8IDApIHsgY3ggPSAwOyB9XHJcbiAgICAgICAgaWYgKGN5IDwgMCkgeyBjeSA9IDA7IH1cclxuICAgICAgICBpZiAoY3cgPj0gdGhpcy5CR09ialsnbngnXSkgeyBjdyA9IHRoaXMuQkdPYmpbJ254J10gLSAxOyB9XHJcbiAgICAgICAgaWYgKGNoID49IHRoaXMuQkdPYmpbJ255J10pIHsgY2ggPSB0aGlzLkJHT2JqWydueSddIC0gMTsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5CR09ialtcInJlY3QyXCJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHJBcnIgPSB0aGlzLmdldEhpdFJlY3RPYmoodGhpcy5CR09ialtcInJlY3QyXCJdLCBuZXcgY2MuUmVjdChjeCwgY3ksIGN3IC0gY3gsIGNoIC0gY3kpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCByQXJyLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3gyID0gckFycltvXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IGN5MiA9IHJBcnJbb10ueTtcclxuICAgICAgICAgICAgICAgIGxldCBjdzIgPSByQXJyW29dLndpZHRoICsgckFycltvXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IGNoMiA9IHJBcnJbb10uaGVpZ2h0ICsgckFycltvXS55O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHggPSBjeDI7IHggPCBjdzI7IHgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHkgPSBjeTI7IHkgPCBjaDI7IHkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnggPSB4ICogcHc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBueSA9IHkgKiBwaCAqIC0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RyID0gdGhpcy5CR09ialtcIm5hbWVcIl0gKyB4ICsgdGhpcy5CR09ialtcInBuYW1lXCJdICsgeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuQkdPYmpbXCJzdGFnZU5vZGVcIl1bc3RyXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkJHT2JqW1wic3RhZ2VOb2RlXCJdW3N0cl0ucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuQkdPYmpbJ3Bvb2wnXS5wdXNoKHRoaXMuQkdPYmpbXCJzdGFnZU5vZGVcIl1bc3RyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgKHRoaXMuQkdPYmpbXCJzdGFnZU5vZGVcIl1bc3RyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGludGVyc2VjdGlvbi53aWR0aCA+IDAgJiYgaW50ZXJzZWN0aW9uLmhlaWdodCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGxldCByQXJyID0gdGhpcy5nZXRIaXRSZWN0T2JqKG5ldyBjYy5SZWN0KGN4LCBjeSwgY3cgLSBjeCwgY2ggLSBjeSksIHRoaXMuQkdPYmpbXCJyZWN0MlwiXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHJBcnIubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZCRyhyQXJyW29dLngsIHJBcnJbb10ueSwgckFycltvXS53aWR0aCArIHJBcnJbb10ueCwgckFycltvXS5oZWlnaHQgKyByQXJyW29dLnkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5mQkcoY3gsIGN5LCBjdywgY2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5CR05vZGUuY2hpbGRyZW5Db3VudCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5CR09ialtcInJlY3QyXCJdID0gbmV3IGNjLlJlY3QoY3gsIGN5LCBjdyAtIGN4LCBjaCAtIGN5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLkJHT2JqW1wicmVjdDJcIl0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgZkJHOiBmdW5jdGlvbiAoY3gsIGN5LCBjdywgY2gpIHtcclxuICAgICAgICBmb3IgKGxldCB3ID0gY3g7IHcgPD0gY3c7IHcrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBoID0gY3k7IGggPD0gY2g7IGgrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRCR05vZGUodywgaCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgQWRkTWFwQ2hpbGRGdW46IGZ1bmN0aW9uIChyZWN0LCBuc3RyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuQkdPYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLkFkZE1hcEJHKHJlY3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnN0ciAhPSBcInRoaXNcIikgeyBpZiAodGhpcy5MYXllck5vZGVPYmpbbnN0cl0gPT0gbnVsbCkgeyByZXR1cm47IH0gfVxyXG4gICAgICAgIGxldCBqbE9iaiA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MYXllckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnN0ciAhPSBcInRoaXNcIikgeyBpZiAodGhpcy5MYXllck5vZGVBcnJbaV0ubmFtZSAhPSBuc3RyKSB7IGNvbnRpbnVlOyB9IH1cclxuICAgICAgICAgICAgbGV0IG4gPSB0aGlzLkxheWVyTm9kZUFycltpXTtcclxuICAgICAgICAgICAgbGV0IHB3ID0gdGhpcy5sYXllclJlY3Rbbi5uYW1lXVsxXTtcclxuICAgICAgICAgICAgbGV0IHBoID0gdGhpcy5sYXllclJlY3Rbbi5uYW1lXVsyXTtcclxuICAgICAgICAgICAgbGV0IGN4ID0gTWF0aC5mbG9vcigoKHJlY3QueCArIHRoaXMuZmxhZ1BvaW50LngpIC8gcHcpKTtcclxuICAgICAgICAgICAgbGV0IGN5ID0gTWF0aC5mbG9vcigoKHJlY3QueSArIHRoaXMuZmxhZ1BvaW50LnkpIC8gcGgpKSArIDE7XHJcbiAgICAgICAgICAgIGxldCBjdyA9IE1hdGguY2VpbCgoKHJlY3QueCArIHRoaXMuZmxhZ1BvaW50LnggKyByZWN0LndpZHRoIC0gKGN4ICogcHcpKSAvIHB3KSk7XHJcbiAgICAgICAgICAgIGxldCBjaCA9IE1hdGguY2VpbCgoKHJlY3QueSArIHRoaXMuZmxhZ1BvaW50LnkgKyByZWN0LmhlaWdodCAtIChjeSAqIHBoKSkgLyBwaCkpICsgMTtcclxuICAgICAgICAgICAgbGV0IHJBcnIgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YWdlUmVjdE9ialtuLm5hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCByMiA9IHRoaXMuc3RhZ2VSZWN0T2JqW24ubmFtZV07XHJcbiAgICAgICAgICAgICAgICBpZiAoY3ggIT0gcjIueCB8fCBjeSAhPSByMi55IHx8IGN3ICE9IHIyLndpZHRoIHx8IGNoICE9IHIyLmhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJBcnIgPSB0aGlzLmdldEhpdFJlY3RPYmoobmV3IGNjLlJlY3QoY3gsIGN5LCBjdywgY2gpLCByMik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJOb2RlQXJyW2ldLnBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTm9kZUNoaWxkRnVuKHRoaXMuZ2V0SGl0UmVjdE9iaihyMiwgbmV3IGNjLlJlY3QoY3gsIGN5LCBjdywgY2gpKSwgbmV3IGNjLlJlY3QoY2Mudmlldy5nZXRWaXNpYmxlT3JpZ2luKCkueCwgY2Mudmlldy5nZXRWaXNpYmxlT3JpZ2luKCkueSwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLndpZHRoLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkuaGVpZ2h0KSwgbi5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZVJlY3RPYmpbbi5uYW1lXSA9IG5ldyBjYy5SZWN0KGN4LCBjeSwgY3csIGNoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZU5vZGVDaGlsZEZ1bihbcjJdLCBuZXcgY2MuUmVjdCgpLCBuLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlUmVjdE9ialtuLm5hbWVdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7Ly/kuI3lnKjoiJ7lj7DkuYvkuK3ml7bvvIzlj6rliKDkuI3liqBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlOy8v6KaG55uW6Lez6L+HXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYXllck5vZGVBcnJbaV0ucGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlUmVjdE9ialtuLm5hbWVdID0gbmV3IGNjLlJlY3QoY3gsIGN5LCBjdywgY2gpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJBcnIgPSBbbmV3IGNjLlJlY3QoY3gsIGN5LCBjdywgY2gpXTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7Ly/kuI3lnKjoiJ7lj7DkuYvkuK3ml7bvvIznqbrkuZ/kuI3mt7vliqBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGxldCBvID0gMDsgbyA8IHJBcnIubGVuZ3RoOyBvKyspIHtcclxuICAgICAgICAgICAgICAgIGN4ID0gckFycltvXS54O1xyXG4gICAgICAgICAgICAgICAgY3kgPSByQXJyW29dLnk7XHJcbiAgICAgICAgICAgICAgICBjdyA9IHJBcnJbb10ud2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjaCA9IHJBcnJbb10uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMuTGF5ZXJBcnJbaV1bXCJQb3NpdGlvblwiXTtcclxuICAgICAgICAgICAgICAgIGpsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW2ldLm5hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMDsgdyA8IGN3OyB3KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbnggPSBjeCAqIHB3ICsgdyAqIHB3O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGggPSAwOyBoIDwgY2g7IGgrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbnkgPSBjeSAqIHBoICsgaCAqIHBoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqW254XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqW254XVtueV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGpsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW2ldLm5hbWVdW254ICsgXCIgKyBcIiArIG55XSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHN4QXJyID0gb2JqW254XVtueV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBzeEFyci5sZW5ndGg7IHQrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSBzeEFyclt0XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxhcnIgPSB0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbaV0ubmFtZV1baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE5vZGVDaGlsZEZ1bihsYXJyWzBdLCAobGFyclsxXSAtIHRoaXMuZmxhZ1BvaW50LngpLCAobGFyclsyXSAtIHRoaXMuZmxhZ1BvaW50LnkpLCBpLCBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKioqKioqKui/lOWbnuS4pOS4qnJlY3Tnm7jkuqTkuYvlpJbnmoRyZWN05pWw57uE77yM5pyA5aSa6L+U5Zue5Zub5LiqKioqKioqKioqKiovXHJcbiAgICBnZXRIaXRSZWN0T2JqOiBmdW5jdGlvbiAocjEsIHIyKSB7XHJcbiAgICAgICAgaWYgKChyMS54ICsgcjEud2lkdGgpIDw9IHIyLnggfHwgKHIyLnggKyByMi53aWR0aCkgPD0gcjEueCB8fCAocjEueSArIHIxLmhlaWdodCkgPD0gcjIueSB8fCAocjIueSArIHIyLmhlaWdodCkgPD0gcjEueSkgey8v5rKh5pyJ55u45LqkXHJcbiAgICAgICAgICAgIHJldHVybiBbcjFdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBhcnIgPSBbXTtcclxuICAgICAgICAgICAgaWYgKHIxLnggPCByMi54KSB7Ly/lt6bkuItcclxuICAgICAgICAgICAgICAgIGxldCByenggPSBuZXcgY2MuUmVjdChyMS54LCByMS55LCByMi54IC0gcjEueCwgMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocjIueSArIHIyLmhlaWdodCA8IHIxLnkgKyByMS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByenguaGVpZ2h0ID0gcjIueSArIHIyLmhlaWdodCAtIHIxLnk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ6eC5oZWlnaHQgPSByMS5oZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhcnJbYXJyLmxlbmd0aF0gPSByeng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHIxLnkgKyByMS5oZWlnaHQgPiByMi55ICsgcjIuaGVpZ2h0KSB7Ly/lt6bkuIpcclxuICAgICAgICAgICAgICAgIGxldCByenMgPSBuZXcgY2MuUmVjdChyMS54LCByMi55ICsgcjIuaGVpZ2h0LCAwLCByMS55ICsgcjEuaGVpZ2h0IC0gKHIyLnkgKyByMi5oZWlnaHQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChyMi54ICsgcjIud2lkdGggPCByMS54ICsgcjEud2lkdGgpIHtcclxuICAgICAgICAgICAgICAgICAgICByenMud2lkdGggPSAocjIueCArIHIyLndpZHRoKSAtIHIxLng7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ6cy53aWR0aCA9IHIxLndpZHRoO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJyW2Fyci5sZW5ndGhdID0gcnpzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChyMS55IDwgcjIueSkgey8v5Y+z5LiLXHJcbiAgICAgICAgICAgICAgICBsZXQgcnl4ID0gbmV3IGNjLlJlY3QoMCwgcjEueSwgMCwgcjIueSAtIHIxLnkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHIyLnggPiByMS54KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnl4LnggPSByMi54O1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByeXgueCA9IHIxLng7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByeXgud2lkdGggPSByMS54ICsgcjEud2lkdGggLSByeXgueDtcclxuICAgICAgICAgICAgICAgIGFyclthcnIubGVuZ3RoXSA9IHJ5eDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocjEueCArIHIxLndpZHRoID4gcjIueCArIHIyLndpZHRoKSB7Ly/lj7PkuIpcclxuICAgICAgICAgICAgICAgIGxldCByeXMgPSBuZXcgY2MuUmVjdChyMi54ICsgcjIud2lkdGgsIDAsIHIxLnggKyByMS53aWR0aCAtIChyMi54ICsgcjIud2lkdGgpLCAwKTtcclxuICAgICAgICAgICAgICAgIGlmIChyMi55ID4gcjEueSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJ5cy55ID0gcjIueTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcnlzLnkgPSByMS55O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcnlzLmhlaWdodCA9IHIxLnkgKyByMS5oZWlnaHQgLSByeXMueTtcclxuICAgICAgICAgICAgICAgIGFyclthcnIubGVuZ3RoXSA9IHJ5cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgYWRkTm9kZUNoaWxkRnVuOiBmdW5jdGlvbiAoaWQsIHgsIHksIHRjSUQsIE5vZGVJRCkge1xyXG4gICAgICAgIGxldCByXHJcbiAgICAgICAgbGV0IHB3ID0gdGhpcy5sYXllclJlY3RbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bMV07XHJcbiAgICAgICAgbGV0IHBoID0gdGhpcy5sYXllclJlY3RbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bMl07XHJcbiAgICAgICAgbGV0IG1jQm8gPSBmYWxzZTtcclxuICAgICAgICBsZXQgbEJvID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHpOb2RlID0gbnVsbDtcclxuICAgICAgICBsZXQgcGFyQm8gPSBmYWxzZTtcclxuICAgICAgICBpZiAodHlwZW9mIChpZCkgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuTWFwU3ByQXJyW2lkXTtcclxuICAgICAgICAgICAgaWYgKGFyclsxXVtOb2RlSUQgKyAnJ10gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuQXJyID0gYXJyWzBdO1xyXG4gICAgICAgICAgICBsZXQgbmV3Tm9kZTtcclxuICAgICAgICAgICAgaWYgKGFyclsyXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbCA9IGFyclsyXS5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlID0gYXJyWzJdW2xdO1xyXG4gICAgICAgICAgICAgICAgYXJyWzJdLnNwbGljZShsLCAxKTtcclxuICAgICAgICAgICAgICAgIGFyclszXSA9IHRoaXMudGltSW50Oy8v6YeN572u5rGgXHJcbiAgICAgICAgICAgICAgICBuZXdOb2RlLnggPSB4O1xyXG4gICAgICAgICAgICAgICAgbmV3Tm9kZS55ID0geTtcclxuICAgICAgICAgICAgICAgIG5ld05vZGUuekluZGV4ID0gTm9kZUlEO1xyXG4gICAgICAgICAgICAgICAgLy8gIG5ld05vZGUucGFyZW50PXRoaXMuTGF5ZXJOb2RlQXJyW3RjSURdO1xyXG4gICAgICAgICAgICAgICAgYXJyWzFdW05vZGVJRCArICcnXSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobkFyci5sZW5ndGggPj0gNSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUgPSB0aGlzLmFkZE5vZGUodGhpcy5leHRlbmQoeyBcIm5hbWVcIjogbkFyclswXSwgXCJ4XCI6IHgsIFwieVwiOiB5LCBcInJvdGF0aW9uXCI6IG5BcnJbNF0sIFwiekluZGV4XCI6IE5vZGVJRCB9LCBuQXJyWzFdKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld05vZGUgPSB0aGlzLmFkZE5vZGUodGhpcy5leHRlbmQoeyBcIm5hbWVcIjogbkFyclswXSwgXCJ4XCI6IHgsIFwieVwiOiB5LCBcInpJbmRleFwiOiBOb2RlSUQgfSwgbkFyclsxXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYXJyWzFdW05vZGVJRCArICcnXSA9IG5ld05vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZS5zY2FsZVggPSAxO1xyXG4gICAgICAgICAgICBuZXdOb2RlLnNjYWxlWSA9IDE7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgY2MuUmVjdChuZXdOb2RlLngsIG5ld05vZGUueSwgbkFyclsyXSwgbkFyclszXSk7XHJcbiAgICAgICAgICAgIGlmIChuQXJyLmxlbmd0aCA+PSA1IHx8IHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ10ubGVuZ3RoID49IDQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzBdICE9IG51bGwpIHsgci54ID0gdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXVszXVswXSAtIHRoaXMuZmxhZ1BvaW50Lng7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzFdICE9IG51bGwpIHsgci55ID0gdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXVszXVsxXSAtIHRoaXMuZmxhZ1BvaW50Lnk7IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzJdICE9IG51bGwpIHsgbmV3Tm9kZS5vcGFjaXR5ID0gdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXVszXVsyXTsgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bNF0gIT0gbnVsbCkgeyBuZXdOb2RlLnNjYWxlWCA9IHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bNF0gfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bNV0gIT0gbnVsbCkgeyBuZXdOb2RlLnNjYWxlWSA9IHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bNV0gfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bM10gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhckJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZE5vZGVQYXJlbnQobmV3Tm9kZSwgdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXVszXVszXSwgdGNJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3Tm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDI1NSwgMjU1KTtcclxuICAgICAgICAgICAgbmV3Tm9kZS5iSUQgPSBbTm9kZUlELCB0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddLCByXTtcclxuICAgICAgICAgICAgek5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICBuZXdOb2RlW1wiSW5mb1wiXSA9IHRoaXMuaW5mb09ialtOb2RlSURdO1xyXG4gICAgICAgICAgICBpZiAoIXBhckJvKSB7IG5ld05vZGUucGFyZW50ID0gdGhpcy5MYXllck5vZGVBcnJbdGNJRF0gfVxyXG4gICAgICAgICAgICBuZXdOb2RlLm1hcExheWVyTmFtZSA9IG5ld05vZGUucGFyZW50Lm5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vZGVPYmpbTm9kZUlEXSA9IG5ld05vZGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTWFwTWNBcnJbTm9kZUlEICsgJyddICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtY0JvID0gdHJ1ZTtcclxuICAgICAgICAgICAgbGV0IHN0cklEID0gdGhpcy55bWNNYXBTcHJBcnJbaWRdWzBdO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubWNQb29sW2lkXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1jUG9vbFtpZF0gPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWNQb29sW2lkXVtcInBvb2xcIl0gPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWNQb29sW2lkXVtcIm5hbWVcIl0gPSBzdHJJRDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5tY1Bvb2xbaWRdW1widGltZXJcIl0gPSB0aGlzLnRpbUludDtcclxuICAgICAgICAgICAgbGV0IHltYztcclxuICAgICAgICAgICAgbGV0IHBibyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMubWNQb29sW2lkXVtcInBvb2xcIl0ubGVuZ3RoIDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHltYyA9IG5ldyBZTW92aWVDbGlwKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbCA9IHRoaXMubWNQb29sW2lkXVtcInBvb2xcIl0ubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICAgICAgeW1jID0gdGhpcy5tY1Bvb2xbaWRdW1wicG9vbFwiXVtsXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWNQb29sW2lkXVtcInBvb2xcIl0uc3BsaWNlKGwsIDEpO1xyXG4gICAgICAgICAgICAgICAgcGJvID0gdHJ1ZTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB5bWMucGlkID0gaWQ7XHJcblxyXG5cclxuICAgICAgICAgICAgbGV0IGVPYmogPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgZVN0ciBpbiB0aGlzLnltY0FsbE9ialtzdHJJRF1bMl0pIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHZTdHIgaW4gdGhpcy55bWNBbGxPYmpbc3RySURdWzJdW2VTdHJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZU9ialtlU3RyXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGVPYmpbZVN0cl1bdlN0cl0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghcGJvKSB7XHJcbiAgICAgICAgICAgICAgICB5bWMuSW5pdChudWxsLCBzdHJJRCwgdGhpcy55bWNBbGxPYmpbc3RySURdWzBdLCB0aGlzLnltY0FsbE9ialtzdHJJRF1bMV0sIGVPYmosIHRoaXMueW1jQWxsT2JqW3N0cklEXVszXSwgdGhpcy55bWNBbGxPYmpbc3RySURdWzRdLCB0aGlzLk1hcFNwckFyciwgdGhpcy5TcHJpdGVPYmosIHRoaXMucmV2aXNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTm9kZSh0aGlzLnltY01hcFNwckFycltpZF1bMV0sIHltYyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB5bWMuSW5pdDIodGhpcy55bWNBbGxPYmpbc3RySURdWzNdLCB0aGlzLk1hcFNwckFyciwgdGhpcy5TcHJpdGVPYmosIHRoaXMucmV2aXNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB5bWMuc2V0TG9jYXRpb25GdW4oeCwgeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy55bWNGcmFtZU9ialtOb2RlSUQgKyAnJ10gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbEJvID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHltYy5zZXRGcmFtZSgwLCB0aGlzLnltY1RpbUludCwgMCwgZmFsc2UsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHltYy5zZXRGcmFtZSh0aGlzLnltY0ZyYW1lT2JqW05vZGVJRCArICcnXVswXSwgdGhpcy55bWNUaW1JbnQsIHRoaXMueW1jRnJhbWVPYmpbTm9kZUlEICsgJyddWzFdLCB0aGlzLnltY0ZyYW1lT2JqW05vZGVJRCArICcnXVsyXSwgdGhpcy55bWNGcmFtZU9ialtOb2RlSUQgKyAnJ11bM10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnltY1N0YWdlQXJyW3RoaXMueW1jU3RhZ2VBcnIubGVuZ3RoXSA9IHltYztcclxuICAgICAgICAgICAgdGhpcy5NYXBNY0FycltOb2RlSUQgKyAnJ10gPSB5bWM7XHJcbiAgICAgICAgICAgIHltYy56SW5kZXggPSBOb2RlSUQ7XHJcbiAgICAgICAgICAgIHIgPSBuZXcgY2MuUmVjdCh5bWMueCArIHltYy5nZXRSZWN0KCkueCwgeW1jLnkgKyB5bWMuZ2V0UmVjdCgpLnksIHltYy5nZXRSZWN0KCkud2lkdGgsIHltYy5nZXRSZWN0KCkuaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWQgPSB5bWM7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddLmxlbmd0aCA+PSA0KSB7Ly/liqjnlLvmmoLml7bkuI3mlK/mjIHml4vovazvvIzmiYDku6XnkIborrrkuIrkuI3nlKjmt7vliqAw5ZKMMVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bMl0gIT0gbnVsbCkgeyB5bWMub3BhY2l0eSA9IHRoaXMubm9kZUFsbE9ialt0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lXVtOb2RlSUQgKyAnJ11bM11bMl07IH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzRdICE9IG51bGwpIHsgbmV3Tm9kZS5zY2FsZVggPSB0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzRdIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzVdICE9IG51bGwpIHsgbmV3Tm9kZS5zY2FsZVkgPSB0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzVdIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZV1bTm9kZUlEICsgJyddWzNdWzNdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJCbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGROb2RlUGFyZW50KHltYywgdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXVszXVszXSwgdGNJRCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgeW1jLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMjU1LCAyNTUpO1xyXG4gICAgICAgICAgICB5bWMuYklEID0gW05vZGVJRCwgdGhpcy5ub2RlQWxsT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW3RjSURdLm5hbWVdW05vZGVJRCArICcnXSwgcl07XHJcbiAgICAgICAgICAgIHltYy5pbmZvID0gdGhpcy5pbmZvT2JqW05vZGVJRF07XHJcbiAgICAgICAgICAgIGlmICghcGFyQm8pIHsgeW1jLnBhcmVudCA9IHRoaXMuTGF5ZXJOb2RlQXJyW3RjSURdIH1cclxuICAgICAgICAgICAgeW1jLm1hcExheWVyTmFtZSA9IHltYy5wYXJlbnQubmFtZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2hvd05vZGVPYmpbTm9kZUlEXSA9IHltYztcclxuICAgICAgICAgICAgek5vZGUgPSB5bWM7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YWdlTm9kZUluZm8odGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZSwgTm9kZUlELCBwdywgcGgsIGZhbHNlKTtcclxuICAgICAgICBpZiAobWNCbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkxvYWRZTW92aWVDbGlwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkWU1vdmllQ2xpcCh6Tm9kZSwgdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZSwgbEJvKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9uTG9hZFNwcml0ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTG9hZFNwcml0ZSh6Tm9kZSwgdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioqKioqKirnu4TlkIjlpJrkuKpOb2RlKioqKioqKiovXHJcbiAgICBhZGROb2RlUGFyZW50OiBmdW5jdGlvbiAobm9kZSwgaWQsIHRjSUQpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlUGFyZW50T2JqW2lkXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzddID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGxldCBwbm9kZSA9IHRoaXMuYWRkTm9kZSh0aGlzLmV4dGVuZCh7ICduYW1lJzogdGhpcy5ub2RlUGFyZW50T2JqW2lkXVswXSwgJ3gnOiB0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzFdIC0gdGhpcy5mbGFnUG9pbnQueCwgJ3knOiB0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzJdIC0gdGhpcy5mbGFnUG9pbnQueSwgJ3pJbmRleCc6IHRoaXMubm9kZVBhcmVudE9ialtpZF1bNV0gKyAwLjUsICdwYXJlbnQnOiB0aGlzLkxheWVyTm9kZUFyclt0Y0lEXSwgfSwgdGhpcy5ub2RlUGFyZW50T2JqW2lkXVs2XSkpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5feV9wYXJlbnQgPSBwbm9kZTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gcG5vZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzddID0gcG5vZGU7XHJcbiAgICAgICAgICAgICAgICBub2RlLnggLT0gcG5vZGUueDtcclxuICAgICAgICAgICAgICAgIG5vZGUueSAtPSBwbm9kZS55O1xyXG4gICAgICAgICAgICAgICAgcG5vZGUuekluZGV4ID0gbm9kZS56SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vbkxvYWRTcHJpdGVQYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkU3ByaXRlUGFyZW50KHBub2RlLCB0aGlzLkxheWVyTm9kZUFyclt0Y0lEXS5uYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuX3lfcGFyZW50ID0gdGhpcy5ub2RlUGFyZW50T2JqW2lkXVs3XTtcclxuICAgICAgICAgICAgICAgIG5vZGUucGFyZW50ID0gdGhpcy5ub2RlUGFyZW50T2JqW2lkXVs3XTtcclxuICAgICAgICAgICAgICAgIG5vZGUueCAtPSB0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzddLng7XHJcbiAgICAgICAgICAgICAgICBub2RlLnkgLT0gdGhpcy5ub2RlUGFyZW50T2JqW2lkXVs3XS55O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubm9kZVBhcmVudE9ialtpZF1bN10ucGFyZW50ID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGVQYXJlbnRPYmpbaWRdWzddLnBhcmVudCA9IHRoaXMuTGF5ZXJOb2RlQXJyW3RjSURdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZVBhcmVudE9ialtpZF1bN10uekluZGV4ID0gbm9kZS56SW5kZXg7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25Mb2FkU3ByaXRlUGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWRTcHJpdGVQYXJlbnQodGhpcy5ub2RlUGFyZW50T2JqW2lkXVs3XSwgdGhpcy5MYXllck5vZGVBcnJbdGNJRF0ubmFtZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlLl95X3BhcklEID0gaWQ7XHJcbiAgICB9LFxyXG4gICAgLyoqKipwdWJsaWNlKioq6K6+572u5pu05pS55Yqo55S75binKuazqOaEj+S4gOaXpueUqOatpOaWueazle+8jOmCo+S5iOWKqOeUu+eahG9uTG9hZFlNb3ZpZUNsaXDkuK3nmoTmmK/lkKbnrKzkuIDmrKHliqDovb3lj4LmlbDlsIbkuLpmbGFzaCoqKioqL1xyXG4gICAgc2V0WU1vdmllQ2xpcEZyYW1lOiBmdW5jdGlvbiAobm9kZUlELCBmcmFtZSwgcEJvKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc2hvd05vZGVPYmpbbm9kZUlEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwQm8pIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dOb2RlT2JqW25vZGVJRF0uZ290b0FuZFBsYXkgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd05vZGVPYmpbbm9kZUlEXS5nb3RvQW5kUGxheShmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zaG93Tm9kZU9ialtub2RlSURdLmdvdG9BbmRTdG9wICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dOb2RlT2JqW25vZGVJRF0uZ290b0FuZFN0b3AoZnJhbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoZnJhbWUpID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJhbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnJhbWUgLT0gMTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHN0ciBpbiB0aGlzLm5vZGVBbGxPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW3N0cl1bbm9kZUlEXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZSA9IHRoaXMueW1jQWxsT2JqW3RoaXMueW1jTWFwU3ByQXJyW3RoaXMubm9kZUFsbE9ialtzdHJdW25vZGVJRF1bMF1dWzBdXVs0XVtmcmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChmcmFtZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocEJvKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnltY0ZyYW1lT2JqW25vZGVJRF0gPSBbZnJhbWUsIHRoaXMueW1jVGltSW50LCBmYWxzZSwgZmFsc2VdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55bWNGcmFtZU9ialtub2RlSURdID0gW2ZyYW1lLCB0aGlzLnltY1RpbUludCwgdHJ1ZSwgdHJ1ZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioqKioqKirmuIXpmaTnu4TlkIjnmoTniLbnuqdOb2RlKioqKioqKiovXHJcbiAgICByZW1vdmVOb2RlUGFyZW50OiBmdW5jdGlvbiAobm9kZSwgc3RyKSB7XHJcbiAgICAgICAgaWYgKG5vZGUuX3lfcGFyZW50ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuX3lfcGFyZW50LmNoaWxkcmVuQ291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbm9kZS5feV9wYXJlbnQucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmtpbGxTcHJpdGVQYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Mb2FkU3ByaXRlUGFyZW50KG5vZGUuX3lfcGFyZW50LCBzdHIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuX3lfcGFyZW50ID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUuX3lfcGFySUQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBub2RlLl95X3BhcklEID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioqKuWwhm5vZGXmt7vliqDliLDoiJ7lj7Dlr7nlg4/kuK0qKioqKioqKioqL1xyXG4gICAgYWRkU3RhZ2VOb2RlT2JqRnVuOiBmdW5jdGlvbiAodGNOYW1lLCBub2RlSUQsIG5oU3RyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhZ2VOb2RlT2JqW3RjTmFtZV0gPT0gbnVsbCkgeyB0aGlzLnN0YWdlTm9kZU9ialt0Y05hbWVdID0ge307IH1cclxuICAgICAgICBpZiAodGhpcy5zdGFnZU5vZGVPYmpbdGNOYW1lXVtuaFN0cl0gPT0gbnVsbCkgeyB0aGlzLnN0YWdlTm9kZU9ialt0Y05hbWVdW25oU3RyXSA9IHt9OyB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhZ2VOb2RlT2JqW3RjTmFtZV1bbmhTdHJdW25vZGVJRF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLnN0YWdlTm9kZU9ialt0Y05hbWVdW25oU3RyXVtub2RlSURdID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZXh0ZW5kOiBmdW5jdGlvbiAob2JqMSwgb2JqMikge1xyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiBvYmoyKSB7XHJcbiAgICAgICAgICAgIG9iajFba2V5XSA9IG9iajJba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajE7XHJcbiAgICB9LFxyXG4gICAgLyoqKnB1YmxpYyoqKioqKumAmuWdkOagh+i/lOWbnuafkOWdl+WMuuWfn+WGheeahOaJgOaciW5vZGUqKioqKioqKioqL1xyXG4gICAgZ2V0Tm9kZXNCeUxvY2F0aW9uOiBmdW5jdGlvbiAoTGF5ZXJOYW1lLCB4LCB5KSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMuc3RhZ2VOb2RlT2JqW0xheWVyTmFtZV07XHJcbiAgICAgICAgbGV0IGFyciA9IFtdO1xyXG4gICAgICAgIGlmIChvYmogIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBsZXQgcHcgPSB0aGlzLmxheWVyUmVjdFtMYXllck5hbWVdWzFdO1xyXG4gICAgICAgICAgICBsZXQgcGggPSB0aGlzLmxheWVyUmVjdFtMYXllck5hbWVdWzJdO1xyXG4gICAgICAgICAgICBsZXQgbnggPSBNYXRoLmZsb29yKCgoeCArIHRoaXMuZmxhZ1BvaW50LngpIC8gcHcpKSAqIHB3O1xyXG4gICAgICAgICAgICBsZXQgbnkgPSBNYXRoLmNlaWwoKCh5ICsgdGhpcy5mbGFnUG9pbnQueSkgLyBwaCkpICogcGg7XHJcbiAgICAgICAgICAgIGlmIChvYmpbbnggKyAnLScgKyBueV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNhcnIgPSB0aGlzLnN0YWdlTm9kZU9ialtMYXllck5hbWVdW254ICsgJy0nICsgbnldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNhcnIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0ciBpbiBzYXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNob3dOb2RlT2JqW3N0cl0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyW2Fyci5sZW5ndGhdID0gdGhpcy5zaG93Tm9kZU9ialtzdHJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyO1xyXG4gICAgfSxcclxuICAgIC8qKipwdWJsaWMqKioqKirpgJrlnZDmoIfov5Tlm57mn5DlnZfljLrln5/lhoXnmoTmnIDpobbpg6jnmoRub2RlKioqKioqKioqKi9cclxuICAgIGdldFRvcE5vZGVCeUxvY2F0aW9uOiBmdW5jdGlvbiAoTGF5ZXJOYW1lLCB4LCB5KSB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHRoaXMuc3RhZ2VOb2RlT2JqW0xheWVyTmFtZV07XHJcbiAgICAgICAgbGV0IG5vZGU7XHJcbiAgICAgICAgaWYgKG9iaiAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGxldCBwdyA9IHRoaXMubGF5ZXJSZWN0W0xheWVyTmFtZV1bMV07XHJcbiAgICAgICAgICAgIGxldCBwaCA9IHRoaXMubGF5ZXJSZWN0W0xheWVyTmFtZV1bMl07XHJcbiAgICAgICAgICAgIGxldCBueCA9IE1hdGguZmxvb3IoKCh4ICsgdGhpcy5mbGFnUG9pbnQueCkgLyBwdykpICogcHc7XHJcbiAgICAgICAgICAgIGxldCBueSA9IE1hdGguY2VpbCgoKHkgKyB0aGlzLmZsYWdQb2ludC55KSAvIHBoKSkgKiBwaDtcclxuICAgICAgICAgICAgaWYgKG9ialtueCArICctJyArIG55XSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2FyciA9IHRoaXMuc3RhZ2VOb2RlT2JqW0xheWVyTmFtZV1bbnggKyAnLScgKyBueV07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2FyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3RyIGluIHNhcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hvd05vZGVPYmpbc3RyXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgPSB0aGlzLnNob3dOb2RlT2JqW3N0cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnpJbmRlIDwgdGhpcy5zaG93Tm9kZU9ialtzdHJdLnpJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5zaG93Tm9kZU9ialtzdHJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9LFxyXG4gICAgLyoqKipwdWJsaWMqKioqKuWwhuWbvuWdl25vZGXkv6Hmga/mt7vliqDliLDlnLDlm77kuK0s5Y+C5pWwMSDlj6/ku6XmmK9JROS5n+WPr+S7peWbvuWdl05vZGUqKioqKioqKioqL1xyXG4gICAgYWRkTWFwTm9kZTogZnVuY3Rpb24gKG4sIExheWVyTmFtZSwgeCwgeSkge1xyXG4gICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5CbyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChuIGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICBpZiAobi5iSUQgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICBpZCA9IG4uYklEWzBdO1xyXG4gICAgICAgICAgICBuQm8gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG4pID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICAgICAgbGV0IHB3ID0gdGhpcy5sYXllclJlY3RbTGF5ZXJOYW1lXVsxXTtcclxuICAgICAgICBsZXQgcGggPSB0aGlzLmxheWVyUmVjdFtMYXllck5hbWVdWzJdO1xyXG4gICAgICAgIGxldCBpID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuTGF5ZXJOb2RlT2JqW0xheWVyTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpID0gdGhpcy5MYXllck5vZGVPYmpbTGF5ZXJOYW1lXS5MYXllckFycklEO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5BcnIgPSBudWxsO1xyXG4gICAgICAgIGZvciAobGV0IHN0ciBpbiB0aGlzLm5vZGVBbGxPYmopIHtcclxuICAgICAgICAgICAgaWYgKHN0ciAhPSBMYXllck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbc3RyXVtpZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5BcnIgPSB0aGlzLm5vZGVBbGxPYmpbc3RyXVtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFnZU5vZGVJbmZvKHN0ciwgaWQsIHRoaXMubGF5ZXJSZWN0W3N0cl1bMV0sIHRoaXMubGF5ZXJSZWN0W3N0cl1bMl0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuSW5mbyhzdHIsIGlkLCBpLCBudWxsLCB0cnVlKTsvL+a4hemZpOWcsOWbvuS4reeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAodGhpcy5ub2RlQWxsT2JqW3N0cl1baWRdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobkFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXSA9IG5BcnI7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhZ2VOb2RlSW5mbyhMYXllck5hbWUsIGlkLCBwdywgcGgsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLkluZm8oTGF5ZXJOYW1lLCBpZCwgaSwgbnVsbCwgdHJ1ZSk7Ly/muIXpmaTlnLDlm77kuK3nmoTkv6Hmga9cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1jQm8gPSBmYWxzZTtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMF0pICE9ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgIG1jQm8gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuc2hvd05vZGVPYmpbaWRdO1xyXG4gICAgICAgIGlmICh4ID09IG51bGwpIHsgeCA9IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVsxXSAtIHRoaXMuZmxhZ1BvaW50Lng7IH1cclxuICAgICAgICBpZiAoeSA9PSBudWxsKSB7IHkgPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMl0gLSB0aGlzLmZsYWdQb2ludC55OyB9XHJcbiAgICAgICAgbGV0IGl4ID0gdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzFdIC0gdGhpcy5mbGFnUG9pbnQueDtcclxuICAgICAgICBsZXQgaXkgPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMl0gLSB0aGlzLmZsYWdQb2ludC55O1xyXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5zZXROb2RlTG9jYXRpb24oTGF5ZXJOYW1lLCBpZCwgeCArIF90aGlzLmZsYWdQb2ludC54LCB5ICsgX3RoaXMuZmxhZ1BvaW50LnksIG5vZGUpO1xyXG4gICAgICAgIHRoaXMuSW5mbyhMYXllck5hbWUsIGlkLCBpLCBmdW5jdGlvbiAobHgsIGx5LCBqeCkgey8v5re75Yqg5Zyw5Zu+5Lit55qE5L+h5oGvXHJcbiAgICAgICAgICAgIGxldCBzdGFnZVJlY3QgPSBuZXcgY2MuUmVjdChjYy52aWV3LmdldFZpc2libGVPcmlnaW4oKS54LCBjYy52aWV3LmdldFZpc2libGVPcmlnaW4oKS55LCBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgsIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQpO1xyXG4gICAgICAgICAgICBsZXQgblhZID0gbmV3IGNjLlZlYzIoangueCAtIF90aGlzLmZsYWdQb2ludC54LCBqeC55IC0gX3RoaXMuZmxhZ1BvaW50LnkpO1xyXG4gICAgICAgICAgICBsZXQgcmVjdCA9IG5ldyBjYy5SZWN0KDAsIDAsIGp4LndpZHRoICogdGhpcy5ub2RlLnNjYWxlWCwganguaGVpZ2h0ICogdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICAgICAgICAgIGxldCBkaWFuID0gX3RoaXMuTGF5ZXJOb2RlT2JqW0xheWVyTmFtZV0uY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKG5YWS54LCBuWFkueSkpO1xyXG4gICAgICAgICAgICByZWN0LnggPSBkaWFuLng7XHJcbiAgICAgICAgICAgIHJlY3QueSA9IGRpYW4ueSAqIC0xO1xyXG4gICAgICAgICAgICBsZXQgcjEgPSByZWN0O1xyXG4gICAgICAgICAgICBsZXQgcjIgPSBuZXcgY2MuUmVjdChzdGFnZVJlY3QueCwgc3RhZ2VSZWN0LnkgLSBzdGFnZVJlY3QuaGVpZ2h0LCBzdGFnZVJlY3Qud2lkdGgsIHN0YWdlUmVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAoKHIxLnggKyByMS53aWR0aCkgPD0gcjIueCB8fCAocjIueCArIHIyLndpZHRoKSA8PSByMS54IHx8IChyMS55ICsgcjEuaGVpZ2h0KSA8PSByMi55IHx8IChyMi55ICsgcjIuaGVpZ2h0KSA8PSByMS55KSB7Ly/ov5nph4zlupTor6Xlv4XopoFcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zaG93Tm9kZU9ialtpZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmtpbGxTdGFnZU5vZGUoTGF5ZXJOYW1lLCBfdGhpcy5zaG93Tm9kZU9ialtpZF0sIGlkLCBtY0JvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5zaG93Tm9kZU9ialtpZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3dOb2RlT2JqW2lkXS54ID0geDtcclxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zaG93Tm9kZU9ialtpZF0ueSA9IHk7XHJcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2V0U3RhZ2VOb2RlSW5mbyhMYXllck5hbWUsIGlkLCBwdywgcGgsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLkxheWVyTm9kZUFycltpXS5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5hZGROb2RlQ2hpbGRGdW4oX3RoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVswXSwgeCAtIF90aGlzLmZsYWdQb2ludC54LCB5IC0gX3RoaXMuZmxhZ1BvaW50LnksIGksIGlkKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChuQm8pIHsgbi5kZXN0cm95KCk7IH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICAvKioqKioqKioq5Yig6Zmk6Iie5Y+w5aSW6Z2i55qE5a+55YOPKioqKioqKioqKi9cclxuICAgIHJlbW92ZU5vZGVDaGlsZEZ1bjogZnVuY3Rpb24gKHJBcnIsIHN0YWdlUmVjdCwgblN0cikge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5MYXllck5vZGVBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG5TdHIgIT0gJ3RoaXMnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYXllck5vZGVBcnJbaV0ubmFtZSAhPSBuU3RyKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChsZXQgbyA9IDA7IG8gPCByQXJyLmxlbmd0aDsgbysrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcHcgPSB0aGlzLmxheWVyUmVjdFt0aGlzLkxheWVyTm9kZUFycltpXS5uYW1lXVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBwaCA9IHRoaXMubGF5ZXJSZWN0W3RoaXMuTGF5ZXJOb2RlQXJyW2ldLm5hbWVdWzJdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN4ID0gckFycltvXS54O1xyXG4gICAgICAgICAgICAgICAgbGV0IGN5ID0gckFycltvXS55O1xyXG4gICAgICAgICAgICAgICAgbGV0IGN3ID0gckFycltvXS53aWR0aDtcclxuICAgICAgICAgICAgICAgIGxldCBjaCA9IHJBcnJbb10uaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgbGV0IG9iaiA9IHRoaXMuc3RhZ2VOb2RlT2JqW3RoaXMuTGF5ZXJOb2RlQXJyW2ldLm5hbWVdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PSBudWxsKSB7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCB3ID0gMDsgdyA8IGN3OyB3KyspIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBoID0gMDsgaCA8IGNoOyBoKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG54ID0gY3ggKiBwdyArIHcgKiBwdztcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG55ID0gY3kgKiBwaCArIGggKiBwaDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9ialtueCArIFwiLVwiICsgbnldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzYXJyID0gdGhpcy5zdGFnZU5vZGVPYmpbdGhpcy5MYXllck5vZGVBcnJbaV0ubmFtZV1bbnggKyBcIi1cIiArIG55XTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYXJyID09IG51bGwpIHsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IHN0ciBpbiBzYXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTdGFnZU5vZGUoc3RyLCBzdGFnZVJlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKioqKirmuIXpmaToiJ7lj7DkuIrljZXkuKpOb2RlKioqKioqKioqKioqKi9cclxuICAgIHJlbW92ZVN0YWdlTm9kZTogZnVuY3Rpb24gKG5vZGVJRCwgc3RhZ2VSZWN0KSB7XHJcbiAgICAgICAgbGV0IG4gPSB0aGlzLnNob3dOb2RlT2JqW25vZGVJRF07XHJcbiAgICAgICAgaWYgKG4gPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICBsZXQgblJlY3QgPSBuLmJJRFsyXTtcclxuICAgICAgICBsZXQgblBhcjtcclxuICAgICAgICBsZXQgbWNCbyA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgKG4uYklEWzFdWzBdKSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBpZiAobi5feV9wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgblBhciA9IG4uX3lfcGFyZW50LnBhcmVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG5QYXIgPSBuLnBhcmVudDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5QYXIgPSBuLmdldFByYWVudCgpO1xyXG4gICAgICAgICAgICBtY0JvID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5QYXIgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsYXllck5hbWUgPSBuUGFyLm5hbWU7XHJcbiAgICAgICAgbGV0IHB3ID0gdGhpcy5sYXllclJlY3RbbGF5ZXJOYW1lXVsxXTtcclxuICAgICAgICBsZXQgcGggPSB0aGlzLmxheWVyUmVjdFtsYXllck5hbWVdWzJdO1xyXG4gICAgICAgIGxldCBuWFkgPSBuZXcgY2MuVmVjMihuUmVjdC54LCBuUmVjdC55KTtcclxuICAgICAgICBsZXQgZGlhbiA9IG5QYXIuY29udmVydFRvV29ybGRTcGFjZUFSKGNjLnYyKG4uTVJlY3QueCAqIHB3IC0gdGhpcy5mbGFnUG9pbnQueCwgbi5NUmVjdC55ICogcGggLSB0aGlzLmZsYWdQb2ludC55KSk7XHJcbiAgICAgICAgbGV0IHIxID0gbmV3IGNjLlJlY3QoZGlhbi54LCBkaWFuLnkgKiAtMSwgKG4uTVJlY3Qud2lkdGggLSBuLk1SZWN0LnggKyAxKSAqIHB3ICogdGhpcy5ub2RlLnNjYWxlWCwgKG4uTVJlY3QueSAtIG4uTVJlY3QuaGVpZ2h0ICsgMSkgKiBwaCAqIHRoaXMubm9kZS5zY2FsZVkpO1xyXG4gICAgICAgIGxldCByMiA9IG5ldyBjYy5SZWN0KHN0YWdlUmVjdC54LCBzdGFnZVJlY3QueSAtIHN0YWdlUmVjdC5oZWlnaHQsIHN0YWdlUmVjdC53aWR0aCwgc3RhZ2VSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgaWYgKChyMS54ICsgcjEud2lkdGgpIDw9IHIyLnggfHwgKHIyLnggKyByMi53aWR0aCkgPD0gcjEueCB8fCAocjEueSArIHIxLmhlaWdodCkgPD0gcjIueSB8fCAocjIueSArIHIyLmhlaWdodCkgPD0gcjEueSkgey8v6L+Z6YeM5bqU6K+l5b+F6KaBXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhZ2VOb2RlSW5mbyhsYXllck5hbWUsIG5vZGVJRCwgcHcsIHBoLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMua2lsbFN0YWdlTm9kZShsYXllck5hbWUsIG4sIG5vZGVJRCwgbWNCbyk7XHJcbiAgICB9LFxyXG4gICAgLypwdWJsaWMqKioqKuiOt+W+l+WcsOWbvk5vZGXkv6Hmga8s56ys5LiA5Liq5Y+C5pWw5Y+v5LulTm9kZeS5n+WPr+S7peaYr0lEKioqKioqKi9cclxuICAgIGdldE1hcE5vZGVPYmo6IGZ1bmN0aW9uIChJRG9yTiwgTGF5ZXJOYW1lKSB7XHJcbiAgICAgICAgbGV0IG5vZGVJRCA9IG51bGw7XHJcbiAgICAgICAgaWYgKElEb3JOIGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICBub2RlSUQgPSBJRG9yTi5iSURbMF07XHJcbiAgICAgICAgICAgIExheWVyTmFtZT0gSURvck4ubWFwTGF5ZXJOYW1lXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbm9kZUlEID0gSURvck47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChMYXllck5hbWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBzdHIgaW4gdGhpcy5ub2RlQWxsT2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW3N0cl1bbm9kZUlEXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgTGF5ZXJOYW1lID0gc3RyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChMYXllck5hbWUgPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgIGxldCBvYmogPSB7fTtcclxuICAgICAgICBpZiAodHlwZW9mICh0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtub2RlSURdWzBdKSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBvYmpbJ25hbWUnXSA9IHRoaXMuTWFwU3ByQXJyW3RoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW25vZGVJRF1bMF1dWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG9ialsnbmFtZSddID0gdGhpcy55bWNNYXBTcHJBcnJbdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1bbm9kZUlEXVswXV1bMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG9ialsnTGF5ZXJOYW1lJ10gPSBMYXllck5hbWU7XHJcbiAgICAgICAgb2JqWydpZCddID0gbm9kZUlEO1xyXG4gICAgICAgIG9ialsneCddID0gdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1bbm9kZUlEXVsxXSAtIHRoaXMuZmxhZ1BvaW50Lng7XHJcbiAgICAgICAgb2JqWyd5J10gPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtub2RlSURdWzJdIC0gdGhpcy5mbGFnUG9pbnQueTtcclxuICAgICAgICBvYmpbJ3N4J109dGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1bbm9kZUlEXVszXVs0XSAhPSBudWxsP3RoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW25vZGVJRF1bM11bNF06MTtcclxuICAgICAgICBvYmpbJ3N5J109dGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1bbm9kZUlEXVszXVs1XSAhPSBudWxsP3RoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW25vZGVJRF1bM11bNV06MTtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfSxcclxuICAgIGdldFNoYWRvdzogZnVuY3Rpb24gKElEb3JOLCBMYXllck5hbWUpIHtcclxuICAgICAgICBsZXQgb2JqPXRoaXMuZ2V0TWFwTm9kZU9iaihJRG9yTiwgTGF5ZXJOYW1lKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KG9iaiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIHByb3BLZXksIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BLZXldO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXQ6ICAodGFyZ2V0LCBwcm9wS2V5LCB2YWx1ZSwgcmVjZWl2ZXIpPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BLZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldE1hcExvY2F0aW9uKHRhcmdldFsnaWQnXSwgdGFyZ2V0LG9ialsnTGF5ZXJOYW1lJ10pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvKioqKnB1YmxpYyoqKirlnZDmoIfmm7TmlLkqKioqKipCbyDliqDnrYnov5jmmK/mm7TmlLkqKiovXHJcbiAgICBzZXRNYXBMb2NhdGlvbjogZnVuY3Rpb24gKG4sIGxPYmosIExheWVyTmFtZSwgQm8pIHtcclxuICAgICAgICBsZXQgaWQgPSAtMTtcclxuICAgICAgICBsZXQgbWNCbyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB4ID0gbE9ialsneCddO1xyXG4gICAgICAgIGxldCB5ID0gbE9ialsneSddO1xyXG4gICAgICAgIGxldCBzeCA9IGxPYmpbJ3N4J107XHJcbiAgICAgICAgbGV0IHN5ID0gbE9ialsnc3knXTtcclxuICAgICAgICBpZiAobiBpbnN0YW5jZW9mIGNjLk5vZGUpIHtcclxuICAgICAgICAgICAgTGF5ZXJOYW1lID0gbmV3Tm9kZS5tYXBMYXllck5hbWU7XHJcbiAgICAgICAgICAgIGlmIChuLmJJRCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG4uYklEWzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlkID0gbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlkID09IC0xKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKExheWVyTmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgc3RyIGluIHRoaXMubm9kZUFsbE9iail7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLm5vZGVBbGxPYmpbc3RyXVtpZF0hPW51bGwpe1xyXG4gICAgICAgICAgICAgICAgICAgIExheWVyTmFtZT1zdHI7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKExheWVyTmFtZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGxldCBpID0gLTE7XHJcbiAgICAgICAgaWYgKHRoaXMuTGF5ZXJOb2RlT2JqW0xheWVyTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpID0gdGhpcy5MYXllck5vZGVPYmpbTGF5ZXJOYW1lXS5MYXllckFycklEO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiAodGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzBdKSAhPSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICBtY0JvID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnNob3dOb2RlT2JqW2lkXTtcclxuICAgICAgICBsZXQgcHcgPSB0aGlzLmxheWVyUmVjdFtMYXllck5hbWVdWzFdO1xyXG4gICAgICAgIGxldCBwaCA9IHRoaXMubGF5ZXJSZWN0W0xheWVyTmFtZV1bMl07XHJcbiAgICAgICAgaWYgKHggPT0gbnVsbCkgeyB4ID0gdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzFdIC0gdGhpcy5mbGFnUG9pbnQueDsgfVxyXG4gICAgICAgIGVsc2UgaWYgKEJvKSB7IHggPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMV0gLSB0aGlzLmZsYWdQb2ludC54ICsgeDsgfVxyXG4gICAgICAgIGlmICh5ID09IG51bGwpIHsgeSA9IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVsyXSAtIHRoaXMuZmxhZ1BvaW50Lnk7IH1cclxuICAgICAgICBlbHNlIGlmIChCbykgeyB5ID0gdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzJdIC0gdGhpcy5mbGFnUG9pbnQueSArIHk7IH1cclxuICAgICAgICBsZXQgaXggPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMV0gLSB0aGlzLmZsYWdQb2ludC54O1xyXG4gICAgICAgIGxldCBpeSA9IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVsyXSAtIHRoaXMuZmxhZ1BvaW50Lnk7XHJcbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcclxuICAgICAgICBsZXQgZ2dCbyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBseCA9IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVszXVs0XSA9PSBudWxsID8gMSA6IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVszXVs0XTtcclxuICAgICAgICBsZXQgbHkgPSB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bM11bNV0gPT0gbnVsbCA/IDEgOiB0aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bM11bNV07XHJcbiAgICAgICAgaWYgKHN4ICE9IG51bGwgJiYgc3ggIT0gbHgpIHsgZ2dCbyA9IHRydWU7IH1cclxuICAgICAgICBpZiAoc3kgIT0gbnVsbCAmJiBzeSAhPSBseSkgeyBnZ0JvID0gdHJ1ZTsgfVxyXG4gICAgICAgIGlmICh4ICE9IGl4IHx8IHkgIT0gaXkgfHwgZ2dCbykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YWdlTm9kZUluZm8oTGF5ZXJOYW1lLCBpZCwgcHcsIHBoLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5JbmZvKExheWVyTmFtZSwgaWQsIGksIG51bGwsIHRydWUpOy8v5riF6Zmk5Zyw5Zu+5Lit55qE5L+h5oGvXHJcbiAgICAgICAgICAgIGlmIChzeCAhPSBudWxsKSB7IHRoaXMubm9kZUFsbE9ialtMYXllck5hbWVdW2lkXVszXVs0XSA9IHN4IH1cclxuICAgICAgICAgICAgaWYgKHN5ICE9IG51bGwpIHsgdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzNdWzVdID0gc3kgfVxyXG4gICAgICAgICAgICB0aGlzLnNldE5vZGVMb2NhdGlvbihMYXllck5hbWUsIGlkLCB4ICsgX3RoaXMuZmxhZ1BvaW50LngsIHkgKyBfdGhpcy5mbGFnUG9pbnQueSwgbm9kZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLkluZm8oTGF5ZXJOYW1lLCBpZCwgaSwgZnVuY3Rpb24gKGx4LCBseSwgangpIHsvL+a3u+WKoOWcsOWbvuS4reeahOS/oeaBr1xyXG4gICAgICAgICAgICAgICAgbGV0IHN0YWdlUmVjdCA9IG5ldyBjYy5SZWN0KGNjLnZpZXcuZ2V0VmlzaWJsZU9yaWdpbigpLngsIGNjLnZpZXcuZ2V0VmlzaWJsZU9yaWdpbigpLnksIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgblhZID0gbmV3IGNjLlZlYzIoangueCAtIF90aGlzLmZsYWdQb2ludC54LCBqeC55IC0gX3RoaXMuZmxhZ1BvaW50LnkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdCgwLCAwLCBqeC53aWR0aCAqIF90aGlzLm5vZGUuc2NhbGVYLCBqeC5oZWlnaHQgKiBfdGhpcy5ub2RlLnNjYWxlWSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZGlhbiA9IF90aGlzLkxheWVyTm9kZU9ialtMYXllck5hbWVdLmNvbnZlcnRUb1dvcmxkU3BhY2VBUihjYy52MihuWFkueCwgblhZLnkpKTtcclxuICAgICAgICAgICAgICAgIHJlY3QueCA9IGRpYW4ueDtcclxuICAgICAgICAgICAgICAgIHJlY3QueSA9IGRpYW4ueSAqIC0xO1xyXG4gICAgICAgICAgICAgICAgbGV0IHIxID0gcmVjdDtcclxuICAgICAgICAgICAgICAgIGxldCByMiA9IG5ldyBjYy5SZWN0KHN0YWdlUmVjdC54LCBzdGFnZVJlY3QueSAtIHN0YWdlUmVjdC5oZWlnaHQsIHN0YWdlUmVjdC53aWR0aCwgc3RhZ2VSZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHIxLnggKyByMS53aWR0aCkgPD0gcjIueCB8fCAocjIueCArIHIyLndpZHRoKSA8PSByMS54IHx8IChyMS55ICsgcjEuaGVpZ2h0KSA8PSByMi55IHx8IChyMi55ICsgcjIuaGVpZ2h0KSA8PSByMS55KSB7Ly/ov5nph4zlupTor6Xlv4XopoFcclxuICAgICAgICAgICAgICAgICAgICBpZiAoX3RoaXMuc2hvd05vZGVPYmpbaWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMua2lsbFN0YWdlTm9kZShMYXllck5hbWUsIF90aGlzLnNob3dOb2RlT2JqW2lkXSwgaWQsIG1jQm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLnNob3dOb2RlT2JqW2lkXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNob3dOb2RlT2JqW2lkXS54ID0geDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvd05vZGVPYmpbaWRdLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ggIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuc2hvd05vZGVPYmpbaWRdLnNjYWxlWCA9IHN4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzeSAhPSBudWxsKSBfdGhpcy5zaG93Tm9kZU9ialtpZF0uc2NhbGVZID0gc3k7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnNldFN0YWdlTm9kZUluZm8oTGF5ZXJOYW1lLCBpZCwgcHcsIHBoLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzLkxheWVyTm9kZUFycltpXS5wYXJlbnQgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuYWRkTm9kZUNoaWxkRnVuKF90aGlzLm5vZGVBbGxPYmpbTGF5ZXJOYW1lXVtpZF1bMF0sIHggLSBfdGhpcy5mbGFnUG9pbnQueCwgeSAtIF90aGlzLmZsYWdQb2ludC55LCBpLCBpZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKua4hemZpOaIlua4heWKoOiInuWPsOS4iuWcsOWbvuS/oeaBryoqKioqKioqKi9cclxuICAgIHNldFN0YWdlTm9kZUluZm86IGZ1bmN0aW9uIChMYXllck5hbWUsIGlkLCBwdywgcGgsIHJlbUJvKSB7XHJcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnNob3dOb2RlT2JqW2lkXTtcclxuICAgICAgICBpZiAobm9kZSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGxldCB5cmVjdCA9IG5vZGUuYklEWzJdO1xyXG4gICAgICAgIGxldCB0eCwgdHksIGl3LCBpaDtcclxuICAgICAgICBpZiAocmVtQm8pIHtcclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICB0eCA9IG5vZGUuTVJlY3QueDtcclxuICAgICAgICAgICAgdHkgPSBub2RlLk1SZWN0Lnk7XHJcbiAgICAgICAgICAgIGl3ID0gbm9kZS5NUmVjdC53aWR0aDtcclxuICAgICAgICAgICAgaWggPSBub2RlLk1SZWN0LmhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgciA9IHRoaXMuZ2V0Tm9kZVJlY3QoTGF5ZXJOYW1lLCBpZCk7XHJcbiAgICAgICAgICAgIGxldCBub2RlWCA9IHIueDtcclxuICAgICAgICAgICAgbGV0IG5vZGVZID0gci55O1xyXG4gICAgICAgICAgICB0eCA9IChNYXRoLmZsb29yKG5vZGVYIC8gcHcpKTtcclxuICAgICAgICAgICAgdHkgPSAoTWF0aC5jZWlsKG5vZGVZIC8gcGgpKTtcclxuICAgICAgICAgICAgaXcgPSBNYXRoLmZsb29yKCgoci53aWR0aCArIG5vZGVYIC0gMSkgLyBwdykpO1xyXG4gICAgICAgICAgICBpaCA9IE1hdGguY2VpbCgobm9kZVkgLSByLmhlaWdodCArIDEpIC8gcGgpO1xyXG4gICAgICAgICAgICAvLyBsZXQgbm9kZVggPSB5cmVjdC54K3RoaXMuZmxhZ1BvaW50Lng7XHJcbiAgICAgICAgICAgIC8vIGxldCBub2RlWSA9IHlyZWN0LnkrdGhpcy5mbGFnUG9pbnQueTtcclxuICAgICAgICAgICAgLy8gdHggPShNYXRoLmZsb29yKG5vZGVYLyhwdykpKTtcclxuICAgICAgICAgICAgLy8gdHkgPShNYXRoLmNlaWwobm9kZVkvKHBoKSkpO1xyXG4gICAgICAgICAgICAvLyBpdyA9TWF0aC5mbG9vcigoKHlyZWN0LndpZHRoKyBub2RlWC0xKS9wdykpO1xyXG4gICAgICAgICAgICAvLyBpaCA9TWF0aC5jZWlsKChub2RlWS15cmVjdC5oZWlnaHQrMSkvKHBoKSk7XHJcbiAgICAgICAgICAgIG5vZGUuTVJlY3QgPSBuZXcgY2MucmVjdCh0eCwgdHksIGl3LCBpaCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHh0ID0gdHg7IHh0IDw9IGl3OyB4dCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHl0ID0gdHk7IHl0ID49IGloOyB5dC0tKSB7Ly/lnZDmoIfnm7jlj43lgJLluo/liJfnm7jlh49cclxuICAgICAgICAgICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtQm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhZ2VOb2RlT2JqW0xheWVyTmFtZV1bKCh4dCkgKiBwdykgKyAnLScgKyAoKHl0KSAqIHBoKV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlICh0aGlzLnN0YWdlTm9kZU9ialtMYXllck5hbWVdWygoeHQpICogcHcpICsgJy0nICsgKCh5dCkgKiBwaCldW2lkXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YWdlTm9kZU9iakZ1bihMYXllck5hbWUsIGlkLCAoKHh0KSAqIHB3KSArICctJyArICgoeXQpICogcGgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKioqKioq5riF6Zmk6Iie5Y+w5LiK55qETm9kZSoqKiovXHJcbiAgICBraWxsU3RhZ2VOb2RlOiBmdW5jdGlvbiAobGF5ZXJOYW1lLCBuLCBub2RlSUQsIG1jQm8pIHtcclxuICAgICAgICBsZXQgYXJyID0gdGhpcy5NYXBTcHJBcnJbbi5iSURbMV1bMF1dO1xyXG4gICAgICAgIGlmICghbWNCbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5raWxsU3ByaXRlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2lsbFNwcml0ZShuLCBsYXllck5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4ucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgbi5vcGFjaXR5ID0gMjU1O1xyXG4gICAgICAgICAgICBhcnJbMl1bYXJyWzJdLmxlbmd0aF0gPSBuO1xyXG4gICAgICAgICAgICBsZXQgY3RvYmogPSBhcnJbMV07XHJcbiAgICAgICAgICAgIGRlbGV0ZSAoY3RvYmpbbm9kZUlEXSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh0aGlzLmtpbGxZTW92aWVDbGlwICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMua2lsbFlNb3ZpZUNsaXAobiwgbGF5ZXJOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLm1jUG9vbFtuLnBpZF1bXCJwb29sXCJdW3RoaXMubWNQb29sW24ucGlkXVtcInBvb2xcIl0ubGVuZ3RoXSA9IG47XHJcbiAgICAgICAgICAgIGRlbGV0ZSAodGhpcy5NYXBNY0Fycltub2RlSURdKTtcclxuICAgICAgICAgICAgdGhpcy55bWNGcmFtZU9ialtub2RlSURdID0gW24uY0ZyYW1lLCB0aGlzLnltY1RpbUludCwgbi5zdG9wQm8sIG4ub2ZmQm9dO1xyXG4gICAgICAgICAgICBsZXQgc3kgPSB0aGlzLnltY1N0YWdlQXJyLmluZGV4T2Yobik7XHJcbiAgICAgICAgICAgIGlmIChzeSAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy55bWNTdGFnZUFyci5zcGxpY2Uoc3ksIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG4ucGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgLy8gICAgbi5yZW1vdmVUaGlzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlbGV0ZSAodGhpcy5zaG93Tm9kZU9ialtub2RlSURdKTtcclxuICAgICAgICB0aGlzLnJlbW92ZU5vZGVQYXJlbnQobiwgbGF5ZXJOYW1lKTtcclxuICAgIH0sXHJcbiAgICAvKioqKioqKirov5Tlm57kuKTkuKrnn6nlvaLnm7jkuqTnmoTpg6jliIYqKioqKioqKi9cclxuICAgIGdldEludGVyc2VjdHNSZWN0RnVuOiBmdW5jdGlvbiAocmVjdDEsIHJlY3QyKSB7XHJcbiAgICAgICAgbGV0IHJlY3QgPSBuZXcgY2MuUmVjdCgpO1xyXG4gICAgICAgIHJlY3QueCA9IHJlY3QxLnggPiByZWN0Mi54ID8gcmVjdDEueCA6IHJlY3QyLng7Ly9Y5Y+W5pyA5aSnXHJcbiAgICAgICAgcmVjdC55ID0gcmVjdDEueSA8IHJlY3QyLnkgPyByZWN0MS55IDogcmVjdDIueTsvL1nlj5bmnIDlsI9cclxuICAgICAgICBsZXQgbncgPSAocmVjdDEueCArIHJlY3QxLndpZHRoKSA+IChyZWN0Mi54ICsgcmVjdDIud2lkdGgpID8gKHJlY3QyLnggKyByZWN0Mi53aWR0aCkgOiAocmVjdDEueCArIHJlY3QxLndpZHRoKTtcclxuICAgICAgICBsZXQgbmggPSAocmVjdDEueSAtIHJlY3QxLmhlaWdodCkgPCAocmVjdDIueSAtIHJlY3QyLmhlaWdodCkgPyAocmVjdDIueSAtIHJlY3QyLmhlaWdodCkgOiAocmVjdDEueSAtIHJlY3QxLmhlaWdodCk7XHJcbiAgICAgICAgcmVjdC53aWR0aCA9IG53IC0gcmVjdC54O1xyXG4gICAgICAgIHJlY3QuaGVpZ2h0ID0gTWF0aC5hYnMocmVjdC55IC0gbmgpO1xyXG4gICAgICAgIHJldHVybiByZWN0O1xyXG4gICAgfSxcclxuICAgIC8qKioqKipwdWJsaWMqKioq5Y246L295Zyw5Zu+Tm9kZSDlj4LmlbDvvJpJROaIluaYr+WbvuWdl05vZGUqKioqKioqKiovXHJcbiAgICByZW1vdmVNYXBOb2RlOiBmdW5jdGlvbiAobikge1xyXG4gICAgICAgIGxldCBpZCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG5CbyA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChuIGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICBpZiAobi5iSUQgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2UgfVxyXG4gICAgICAgICAgICBpZCA9IG4uYklEWzBdO1xyXG4gICAgICAgICAgICBuQm8gPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKG4pID09ICdudW1iZXInKSB7XHJcbiAgICAgICAgICAgICAgICBpZCA9IG47XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd05vZGVPYmpbaWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5CbyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBuID0gdGhpcy5zaG93Tm9kZU9ialtpZF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IExheWVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgZm9yIChsZXQgc3RyIGluIHRoaXMubm9kZUFsbE9iaikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW3N0cl1baWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIExheWVyTmFtZSA9IHN0cjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChMYXllck5hbWUgPT0gbnVsbCkgeyByZXR1cm47IH1cclxuICAgICAgICBsZXQgaSA9IC0xO1xyXG4gICAgICAgIGlmICh0aGlzLkxheWVyTm9kZU9ialtMYXllck5hbWVdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaSA9IHRoaXMuTGF5ZXJOb2RlT2JqW0xheWVyTmFtZV0uTGF5ZXJBcnJJRDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBtY0JvID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG5Cbykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zaG93Tm9kZU9ialtpZF0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHB3ID0gdGhpcy5sYXllclJlY3RbTGF5ZXJOYW1lXVsxXTtcclxuICAgICAgICAgICAgICAgIGxldCBwaCA9IHRoaXMubGF5ZXJSZWN0W0xheWVyTmFtZV1bMl07XHJcbiAgICAgICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5NYXBTcHJBcnJbdGhpcy5ub2RlQWxsT2JqW0xheWVyTmFtZV1baWRdWzBdXTtcclxuICAgICAgICAgICAgICAgIGlmIChuIGluc3RhbmNlb2YgWU1vdmllQ2xpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1jQm8gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGFnZU5vZGVJbmZvKExheWVyTmFtZSwgaWQsIHB3LCBwaCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW1jQm8pIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3RvYmogPSBhcnJbMV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN0b2JqW2lkXSAhPSBudWxsKSB7IGRlbGV0ZSAoY3RvYmpbaWRdKTsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5NYXBNY0FycltpZF0gIT0gbnVsbCkgeyBkZWxldGUgKHRoaXMuTWFwTWNBcnJbaWRdKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueW1jRnJhbWVPYmpbaWRdID0gW24uY0ZyYW1lLCB0aGlzLnltY1RpbUludCwgbi5zdG9wQm8sIG4ub2ZmQm9dO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzeSA9IHRoaXMueW1jU3RhZ2VBcnIuaW5kZXhPZihuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3kgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy55bWNTdGFnZUFyci5zcGxpY2Uoc3ksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRlbGV0ZSAodGhpcy5zaG93Tm9kZU9ialtpZF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuSW5mbyhMYXllck5hbWUsIGlkLCBpLCBudWxsLCB0cnVlKTsvL+a4hemZpOWcsOWbvuS4reeahOS/oeaBr1xyXG4gICAgICAgIGlmIChtY0JvKSB7IG4ucmVtb3ZlVGhpcygpOyB9XHJcbiAgICB9LFxyXG4gICAgLyoqcHVibGljKioqKirpgJrov4flkI3lrZDlvpfliLDlm77lnZfnmoTlnLDlm77niLboioLngrnvvIzkvYbpnIDopoHlnLDlm77niLboioLngrnlv4XpobvlnKjlnLrmma/liqDovb3ov4fvvIzlkKbliJnlj43kuLpudWxsKioqL1xyXG4gICAgZ2V0Tm9kZVBhcmVudEJ5TmFtZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICBmb3IgKGxldCBzdHIgaW4gdGhpcy5ub2RlUGFyZW50T2JqKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVQYXJlbnRPYmpbc3RyXVswXSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlUGFyZW50T2JqW3N0cl0ubGVuZ3RoID49IDgpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlUGFyZW50T2JqW3N0cl1bN107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgLyoqcHVibGljKioqKirpgJrov4flm77lnZflvpfliLDlhbblnLDlm77niLboioLngrnvvIzlpoLmnpzlm77msqHmnInlnLDlm77niLboioLngrnvvIzliJnlj43kuLpudWxsLOWmguaenOS9oOehruWumuivpeWbvuWdl+S4gOWumuacieWcsOWbvueItuiKgueCue+8jOS5n+WPr+S7peebtOaOpW4ucGFyZW505b6X5YiwKioqL1xyXG4gICAgZ2V0Tm9kZVBhcmVudEJ5U3ByaXRlOiBmdW5jdGlvbiAobikge1xyXG4gICAgICAgIGlmIChub2RlLl95X3BhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBub2RlLl95X3BhcmVudC5wYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIGdldE5vZGVSZWN0OiBmdW5jdGlvbiAobGF5ZXJOYW1lLCBub2RlSUQpIHtcclxuICAgICAgICBsZXQgciA9IG5ldyBjYy5SZWN0KHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bMV0sIHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bMl0pO1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bMF07XHJcbiAgICAgICAgbGV0IHN4ID0gMTtcclxuICAgICAgICBsZXQgc3kgPSAxO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbbGF5ZXJOYW1lXVtub2RlSURdLmxlbmd0aCA+PSA0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVBbGxPYmpbbGF5ZXJOYW1lXVtub2RlSURdWzNdWzBdICE9IG51bGwpIHsgci54ID0gdGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVszXVswXTsgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVszXVsxXSAhPSBudWxsKSB7IHIueSA9IHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bM11bMV07IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bM11bNF0gIT0gbnVsbCkgeyBzeCA9IHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bM11bNF0gfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVszXVs1XSAhPSBudWxsKSB7IHN5ID0gdGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVszXVs1XSB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgKGlkKSA9PSAnbnVtYmVyJykge1xyXG4gICAgICAgICAgICByLndpZHRoID0gdGhpcy5NYXBTcHJBcnJbaWRdWzBdWzJdICogc3g7XHJcbiAgICAgICAgICAgIHIuaGVpZ2h0ID0gdGhpcy5NYXBTcHJBcnJbaWRdWzBdWzNdICogc3k7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG1yID0gdGhpcy55bWNBbGxPYmpbdGhpcy55bWNNYXBTcHJBcnJbaWRdWzBdXVszXTtcclxuICAgICAgICAgICAgci54ICs9IG1yLng7XHJcbiAgICAgICAgICAgIHIueSArPSBtci55O1xyXG4gICAgICAgICAgICByLndpZHRoID0gbXIud2lkdGggKiBzeDtcclxuICAgICAgICAgICAgci5oZWlnaHQgPSBtci5oZWlnaHQgKiBzeTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKuWcsOWbvuWdkOagh+S/oeaBr+abtOaUuSoqKioqKiovXHJcbiAgICBzZXROb2RlTG9jYXRpb246IGZ1bmN0aW9uIChsYXllck5hbWUsIG5vZGVJRCwgeCwgeSwgbm9kZSkge1xyXG4gICAgICAgIGxldCB0eCA9IHggLSB0aGlzLm5vZGVBbGxPYmpbbGF5ZXJOYW1lXVtub2RlSURdWzFdO1xyXG4gICAgICAgIGxldCB0eSA9IHkgLSB0aGlzLm5vZGVBbGxPYmpbbGF5ZXJOYW1lXVtub2RlSURdWzJdO1xyXG4gICAgICAgIHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bMV0gKz0gdHg7XHJcbiAgICAgICAgdGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVsyXSArPSB0eTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXS5sZW5ndGggPj0gNCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVszXVswXSAhPSBudWxsKSB7IHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bM11bMF0gKz0gdHg7IH1cclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZUFsbE9ialtsYXllck5hbWVdW25vZGVJRF1bM11bMV0gIT0gbnVsbCkgeyB0aGlzLm5vZGVBbGxPYmpbbGF5ZXJOYW1lXVtub2RlSURdWzNdWzFdICs9IHR5OyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChub2RlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUuYklEICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIG5vZGUuYklEWzJdLnggKz0gdHg7XHJcbiAgICAgICAgICAgICAgICBub2RlLmJJRFsyXS55ICs9IHR5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKioqKioqKioq5b6X5Yiw6Iie5Y+w5LiK55qE5pi+56S65a+55YOPKioqKioqKioqKiovXHJcbiAgICBpc1Nob3c6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dOb2RlT2JqW2lkXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dOb2RlT2JqW2lkXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgLyoqKioqKuWQkeWcsOWbvua3u+WKoOS/oeaBryoqKioqKiovXHJcbiAgICBJbmZvOiBmdW5jdGlvbiAobGF5ZXJOYW1lLCBub2RlSUQsIGksIGZ1biwgcmVtQm8pIHtcclxuICAgICAgICBpZiAoaSA9PSAtMSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IHRoaXMuTGF5ZXJBcnIubGVuZ3RoOyB0KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLkxheWVyQXJyW3RdWydMYXllck5hbWUnXSA9PSBsYXllck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpID0gdDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PSAtMSkgeyByZXR1cm4gfTtcclxuICAgICAgICBpZiAocmVtQm8gPT0gbnVsbCkgeyByZW1CbyA9IGZhbHNlOyB9XHJcbiAgICAgICAgbGV0IGlkID0gdGhpcy5ub2RlQWxsT2JqW2xheWVyTmFtZV1bbm9kZUlEXVswXTtcclxuICAgICAgICBsZXQgciA9IHRoaXMuZ2V0Tm9kZVJlY3QobGF5ZXJOYW1lLCBub2RlSUQpO1xyXG4gICAgICAgIGxldCBwdyA9IHRoaXMubGF5ZXJSZWN0W2xheWVyTmFtZV1bMV07XHJcbiAgICAgICAgbGV0IHBoID0gdGhpcy5sYXllclJlY3RbbGF5ZXJOYW1lXVsyXTtcclxuICAgICAgICBsZXQgbm9kZVggPSByLng7XHJcbiAgICAgICAgbGV0IG5vZGVZID0gci55O1xyXG4gICAgICAgIGxldCB0eCA9IChNYXRoLmZsb29yKG5vZGVYIC8gcHcpKTtcclxuICAgICAgICBsZXQgdHkgPSAoTWF0aC5jZWlsKG5vZGVZIC8gcGgpKTtcclxuICAgICAgICBsZXQgaXcgPSBNYXRoLmZsb29yKCgoci53aWR0aCArIG5vZGVYIC0gMSkgLyBwdykpO1xyXG4gICAgICAgIGxldCBpaCA9IE1hdGguY2VpbCgobm9kZVkgLSByLmhlaWdodCArIDEpIC8gcGgpO1xyXG5cclxuICAgICAgICBsZXQgaGl0T2JqID0gdGhpcy5pc0hpdDtcclxuICAgICAgICBsZXQgaGl0U3RyID0gXCJcIjtcclxuICAgICAgICBpZiAodHlwZW9mIGlkID09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuTWFwU3ByQXJyW2lkXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBoaXRTdHIgPSB0aGlzLk1hcFNwckFycltpZF1bMF1bMF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy55bWNNYXBTcHJBcnJbaWRdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGhpdFN0ciA9IHRoaXMueW1jTWFwU3ByQXJyW2lkXVswXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZm9yIChsZXQgeHQgPSB0eDsgeHQgPD0gaXc7IHh0KyspIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgeXQgPSB0eTsgeXQgPj0gaWg7IHl0LS0pIHtcclxuICAgICAgICAgICAgICAgIGxldCB4biA9ICh4dCAqIHB3KS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHluID0gKHl0ICogcGgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlbUJvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5MYXllckFycltpXVsnUG9zaXRpb24nXVt4bl0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dW3luXSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dW3luXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLkxheWVyQXJyW2ldWydQb3NpdGlvbiddW3huXVt5bl0ucHVzaChOdW1iZXIobm9kZUlEKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoaXRPYmpbaGl0U3RyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXRPYmpbeG5dID09IG51bGwpIHRoaXMuaGl0T2JqW3huXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXRPYmpbeG5dW3luXSA9PSBudWxsKSB0aGlzLmhpdE9ialt4bl1beW5dID0gW11cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRPYmpbeG5dW3luXS5wdXNoKHsgeDogci54LCB5OiByLnkgKiAtMSwgd2lkdGg6IHIud2lkdGgsIGhlaWdodDogci5oZWlnaHQsIGlkOiBub2RlSUQgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dW3luXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdiA9IHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dW3luXS5pbmRleE9mKG5vZGVJRCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodiAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ11beG5dW3luXS5zcGxpY2UodiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXRPYmpbeG5dICE9IG51bGwgJiYgdGhpcy5oaXRPYmpbeG5dW3luXSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgdiA9IDA7IHYgPCB0aGlzLmhpdE9ialt4bl1beW5dLmxlbmd0aDsgdisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhpdE9ialt4bl1beW5dW3ZdWydpZCddID09IG5vZGVJRCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaXRPYmpbeG5dW3luXS5zcGxpY2UodiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oaXRPYmpbeG5dW3luXS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmhpdE9ialt4bl1beW5dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGZ1biAhPSBudWxsKSB7IGZ1bih4biwgeW4sIHIpOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8qKioqKuW+l+WIsOagh+agh+etvioqKioqKi9cclxuICAgIGdldFRhZzogZnVuY3Rpb24gKHN0cikge1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ09ialtzdHJdICE9IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFnT2JqW3N0cl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKioq5a+85Ye65a+76Lev5a+55YOPKiovXHJcbiAgICBvblBhdGg6IGZ1bmN0aW9uIChwYXRoT2JqKSB7XHJcbiAgICAgICAgaWYgKHBhdGhPYmpbJ3BhdGhPYmonXSA9PSBudWxsKSB7IHJldHVybjsgfVxyXG4gICAgICAgIGxldCBwb2JqID0ge307XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoT2JqWydwYXRoT2JqJ10ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcG9ialtwYXRoT2JqWydwYXRoT2JqJ11baV1bMV0gKyBcIipcIiArIHBhdGhPYmpbJ3BhdGhPYmonXVtpXVswXV0gPSB7ICd4JzogcGF0aE9ialsncGF0aE9iaiddW2ldWzBdLCAneSc6IHBhdGhPYmpbJ3BhdGhPYmonXVtpXVsxXSB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHBhdGhPYmpbJ3BhdGhPYmonXSA9IHBvYmo7XHJcbiAgICAgICAgdGhpcy5QYXRoR3JpZE9iaiA9IHBhdGhPYmo7XHJcbiAgICB9LFxyXG4gICAgc2V0IG9scyh2KSB7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRTcHJpdGUgPSBvbHA7XHJcbiAgICB9LFxyXG4gICAgc2V0IG9Mc3Aodikge1xyXG4gICAgICAgIHRoaXMub25Mb2FkU3ByaXRlUGFyZW50ID0gdjtcclxuICAgIH0sXHJcbiAgICBzZXQgb2x5bWModikge1xyXG4gICAgICAgIHRoaXMub25Mb2FkWU1vdmllQ2xpcCA9IHZcclxuICAgIH0sXHJcbiAgICAvKioqKioqKirlvZPotLTlm77liqDovb3lrozmiJDmiafooYwqKioqKioqKi9cclxuICAgIG9uTGF5ZXJGdW46IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIuWcsOWbvuWKoOi9veWujOS6hlwiKVxyXG4gICAgICAgIC8vJ+mXquW9sSDkuKrkurrniYh2MC45LjBcclxuICAgICAgICB0aGlzLmhpdE9iaiA9IHt9Oy8v5paw5Yqg5bGe5oCnXHJcbiAgICAgICAgdGhpcy5CR0luaXQoKTtcclxuICAgICAgICB0aGlzLm9uTGF5ZXJGdW4yKCk7XHJcbiAgICAgICAgbGV0IG1jQXJyID0gdGhpcy5NYXBPYmpbJ21jQXJyJ107XHJcbiAgICAgICAgdGhpcy55bWNBbGxPYmogPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBzdHIgaW4gbWNBcnIpIHtcclxuICAgICAgICAgICAgbGV0IGFyciA9IG1jQXJyW3N0cl1bMF07XHJcbiAgICAgICAgICAgIGxldCB6YXJyID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IHQgPSAwOyB0IDwgYXJyLmxlbmd0aDsgdCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNhcnIgPSBhcnJbdF07XHJcbiAgICAgICAgICAgICAgICBsZXQgbCA9IGNhcnJbMF07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjID0gMTsgYyA8IGNhcnIubGVuZ3RoOyBjKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0YXJyW3RhcnIubGVuZ3RoXSA9IGNhcnJbY107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBzID0gMDsgcyA8IGw7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHphcnJbemFyci5sZW5ndGhdID0gdGFycjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMueW1jQWxsT2JqW3N0cl0gPSBbemFyciwgbWNBcnJbc3RyXVsxXSwgbWNBcnJbc3RyXVsyXSwgbmV3IGNjLlJlY3QobWNBcnJbc3RyXVszXVswXSwgbWNBcnJbc3RyXVszXVsxXSwgbWNBcnJbc3RyXVszXVsyXSwgbWNBcnJbc3RyXVszXVszXSksIG1jQXJyW3N0cl1bNF1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAobGV0IHN0ciBpbiB0aGlzLm5vZGVBbGxPYmopIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLkxheWVyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5MYXllckFycltpXVsnTGF5ZXJOYW1lJ10gPT0gc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuTGF5ZXJBcnJbaV1bJ1Bvc2l0aW9uJ10gPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkxheWVyQXJyW2ldWydQb3NpdGlvbiddID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGlkU3RyIGluIHRoaXMubm9kZUFsbE9ialtzdHJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLkluZm8oc3RyLCBpZFN0ciwgaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlQWxsT2JqW3N0cl1baWRTdHJdWzNdID09IG51bGwpIHsgdGhpcy5ub2RlQWxsT2JqW3N0cl1baWRTdHJdWzNdID0gW107IH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaGl0RnVuID0gZnVuY3Rpb24gKGFyciwgYm8pIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcnJbaV1bJ3B6J10gIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBwekFyciA9IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgc3RyIGluIGFycltpXVsncHonXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2ldWydweiddW3N0cl0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChibykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB6QXJyW3N0cl0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwekFycltzdHJdWydvZmZzZXQnXSA9IG5ldyBjYy5WZWMyKGFycltpXVsncHonXVtzdHJdWzBdLCBhcnJbaV1bJ3B6J11bc3RyXVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHpBcnJbc3RyXVsnc2l6ZSddID0gbmV3IGNjLlNpemUoYXJyW2ldWydweiddW3N0cl1bMl0sIGFycltpXVsncHonXVtzdHJdWzNdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHpBcnJbc3RyXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHB6QXJyW3N0cl1bJ3BvaW50cyddID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyA9IDA7IHMgPCBhcnJbaV1bJ3B6J11bc3RyXS5sZW5ndGg7IHMrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwekFycltzdHJdWydwb2ludHMnXVtwekFycltzdHJdWydwb2ludHMnXS5sZW5ndGhdID0gbmV3IGNjLlZlYzIoYXJyW2ldWydweiddW3N0cl1bc11bMF0sIGFycltpXVsncHonXVtzdHJdW3NdWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyW2ldWydweiddID0gcHpBcnI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgeVN0ciBpbiB0aGlzLnltY01hcFNwckFycikge1xyXG4gICAgICAgICAgICBsZXQgcHpPYmogPSB0aGlzLnltY01hcFNwckFyclt5U3RyXVsxXTtcclxuICAgICAgICAgICAgaWYgKHB6T2JqWydDb2xsaWRlciddICE9IG51bGwpIHsgaGl0RnVuKHB6T2JqWydDb2xsaWRlciddLCB0cnVlKTsgfVxyXG4gICAgICAgICAgICBpZiAocHpPYmpbJ1BvbHlnb25Db2xsaWRlciddICE9IG51bGwpIHsgaGl0RnVuKHB6T2JqWydQb2x5Z29uQ29sbGlkZXInXSwgZmFsc2UpOyB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuTGF5ZXJOb2RlQXJyID0gbmV3IEFycmF5KCk7XHJcbiAgICAgICAgdGhpcy5MYXllck5vZGVPYmogPSB7fTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuTGF5ZXJBcnIubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBuID0gdGhpcy5hZGROb2RlKHRoaXMuZXh0ZW5kKHsgXCJuYW1lXCI6IHRoaXMuTGF5ZXJBcnJbaV1bXCJMYXllck5hbWVcIl0sIFwiekluZGV4XCI6IGkgKiAxMDAsIFwicGFyZW50XCI6IHRoaXMubm9kZSB9LCB0aGlzLkxheWVyQXJyW2ldW1wiUHJvXCJdKSk7XHJcbiAgICAgICAgICAgIHRoaXMuTGF5ZXJOb2RlT2JqW3RoaXMuTGF5ZXJBcnJbaV1bXCJMYXllck5hbWVcIl1dID0gbjtcclxuICAgICAgICAgICAgdGhpcy5MYXllck5vZGVBcnJbaV0gPSBuOy8v5L+d5a2Y5Zu+5bGCTm9kZeeahOaVsOe7hFxyXG4gICAgICAgICAgICBuLkxheWVyQXJySUQgPSBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLkxvYWRCbyA9IHRydWU7XHJcbiAgICAgICAgaWYodGhpcy5fc2hvd0FsbEJvKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRBbGwoKTtcclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zZXRMb2NhdGlvbkZ1bih0aGlzLm5vZGUueCwgdGhpcy5ub2RlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5jSW5pdCAhPSBudWxsKSB7IHRoaXMuY0luaXQoKTsgdGhpcy5jSW5pdCA9IG51bGw7IH1cclxuICAgICAgICB3aW5kb3cuaGl0T2JqID0gdGhpcy5oaXRPYmo7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLkluaXQgIT0gbnVsbCkgeyB0aGlzLkluaXQoKTsgfVxyXG4gICAgfSxcclxufSk7Il19