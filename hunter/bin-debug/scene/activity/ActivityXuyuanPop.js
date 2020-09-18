var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // ActivityXuyuanPop
    // yuqingchao
    // 2019.05.08
    var ActivityXuyuanPop = (function (_super) {
        __extends(ActivityXuyuanPop, _super);
        function ActivityXuyuanPop() {
            var _this = _super.call(this) || this;
            _this.itemList = [];
            _this.boomAniRet = [];
            _this.bones = [];
            _this.paths = [];
            _this.lanternNodes = [];
            _this.boomState = [];
            _this.donghua = null;
            _this.denglongAnimation = [];
            _this.baozhaAnimation = [];
            _this.animationBoolean = false;
            _this.itemArr = [];
            _this.skinName = "resource/skins/activity/ActivityXuyuanPopSkin.exml";
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOne, _this);
            _this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMore, _this);
            _this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.init();
            return _this;
        }
        ActivityXuyuanPop.prototype.init = function () {
            this.lbCore.x = 0;
            this.lstItem0.visible = false;
            this.scrollerAni.visible = true;
            this.lstItem.visible = true;
        };
        ActivityXuyuanPop.prototype.setInfo = function (goods, father) {
            this.goods = goods;
            this.father = father;
            this.createPosition();
            this.setInfoEggAni();
            this.groupButton.visible = false;
            this.groupStar.visible = false;
            var num = this.father.takeNum;
            var score = this.father.curTopicInfo.score;
            ;
            var scoreAdd = this.father.takeNum * this.father.curTopicInfo.score;
            this.lbCore.text = scoreAdd.toString();
            for (var i = 0; i < this.goods.length; i++) {
                var tbl = [];
                tbl.bFinish = false;
                tbl.runTime = 0;
                this.boomState.push(tbl);
            }
        };
        ActivityXuyuanPop.prototype.createPosition = function () {
            var _this = this;
            var linePos = [];
            if (Object.keys(this.goods).length <= 5) {
                var pos = [];
                pos.x = this.width / 2 + this.width / 20;
                pos.y = zj.Device.screenHeight / 2;
                linePos.push(pos);
            }
            else {
                var num = Math.ceil(Object.keys(this.goods).length / 5);
                for (var i = 0; i < num; i++) {
                    var pos = [];
                    pos.x = this.width / 2 + this.width / 20;
                    pos.y = zj.Device.screenHeight * (num + 1 - i) / (num + 1) + 30;
                    linePos.push(pos);
                }
            }
            var lineNodes = [];
            for (var i = 0; i < linePos.length; i++) {
                var node = new eui.Group;
                node.anchorOffsetX = node.width / 2;
                node.anchorOffsetY = node.height / 2;
                node.x = linePos[i].x;
                node.y = linePos[i].y;
            }
            var lanternPos = [];
            var heightDiff = 0;
            var widthDiff = 170;
            if (Object.keys(this.goods).length <= 5) {
                var pos = new eui.Group;
                pos.x = this.width / 2;
                pos.y = linePos[0].y + heightDiff - 160;
                lanternPos.push(pos);
                setTimeout(function () {
                    _this.setButtonOpen();
                }, 3500);
            }
            else {
                for (var i = 0; i < Object.keys(this.goods).length; i++) {
                    var pos = new eui.Group;
                    var tbl = linePos;
                    var index = i > 4 && (i - 4) || i + 1;
                    var index2 = i > 4 ? 0 : 1;
                    var num = (index - 3) * widthDiff;
                    var ix = linePos[0].x;
                    pos.x = (index - 3) * widthDiff + this.width / 2;
                    pos.y = linePos[index2].y + Math.abs(2 - index) * heightDiff - 400;
                    lanternPos.push(pos);
                    setTimeout(function () {
                        _this.setButtonOpen();
                    }, 4500);
                }
            }
            var LanternLightNode = [];
            this.lanternNodes = [];
            var lanternSprite = [];
            for (var i = 0; i < lanternPos.length; i++) {
                var light = new eui.Group;
                light.anchorOffsetX = light.width / 2;
                light.anchorOffsetY = light.height / 2;
                light.x = lanternPos[i].x;
                light.y = lanternPos[i].y;
                var aniId = null;
                if (zj.PlayerItemSystem.ItemQuality(this.goods[i].goodsId) >= 5) {
                    aniId = 800502;
                }
                else if (zj.PlayerItemSystem.ItemQuality(this.goods[i].goodsId) == 4) {
                    aniId = 800504;
                }
                if (aniId != null) {
                    // light.addChild()
                }
                light.visible = false;
                LanternLightNode[i] = light;
                var node = new eui.Group;
                node.anchorOffsetX = node.width / 2;
                node.anchorOffsetY = node.height / 2;
                node.x = lanternPos[i].x;
                node.y = lanternPos[i].y;
                this.lanternNodes[i] = node;
                var sprite = new eui.Group;
                sprite.anchorOffsetX = sprite.width / 2;
                sprite.anchorOffsetY = sprite.height / 2;
                sprite.x = lanternPos[i].x;
                sprite.y = lanternPos[i].y;
                lanternSprite[i] = sprite;
            }
        };
        ActivityXuyuanPop.prototype.setInfoEggAni = function () {
            var thisOne = this;
            for (var k in Object.keys(this.goods)) {
                var v = this.goods[k];
                this.bones[k] = [];
                this.paths[k] = [];
                this.item = new zj.ACtivityXuyuanPopItem();
                this.item.SetInfo(k, v, this);
                this.itemArr.push(this.item);
                var bone = "001_tubiao";
                var path = this.item.groupMain;
                path.anchorOffsetX = path.width / 2;
                path.anchorOffsetY = path.height / 2;
                this.bones[k].push(bone);
                this.paths[k].push(path);
            }
            this.lanternAni();
        };
        ActivityXuyuanPop.prototype.lanternAni = function () {
            var _this = this;
            var _loop_1 = function (i) {
                egret.Tween.get(this_1).wait(i * 180).call(function () {
                    if (_this.animationBoolean == true)
                        return;
                    var item = zj.PlayerItemSystem.Item(_this.goods[i].goodsId);
                    zj.Game.DragonBonesManager.playAnimation(_this, "denglong_eff", null, "001_denglong_chuxian", 1)
                        .then(function (display) {
                        _this.lstItem.addChild(_this.lanternNodes[i]);
                        _this.lanternNodes[i].addChild(display);
                        if (item.quality >= 4) {
                            zj.Game.DragonBonesManager.playAnimation(_this, "denglong_eff", null, "003_denglong_xunhuan2", 2)
                                .then(function (display) {
                                _this.lanternNodes[i].removeChildren();
                                _this.lstItem.addChild(_this.lanternNodes[i]);
                                _this.lanternNodes[i].addChild(display);
                                _this.denglongAnimation[i] = display;
                                setTimeout(function () {
                                    if (this.animationBoolean == true)
                                        return;
                                    baoZha();
                                }, 3000);
                            });
                        }
                        else {
                            zj.Game.DragonBonesManager.playAnimation(_this, "denglong_eff", null, "002_denglong_xunhuan", 2)
                                .then(function (display) {
                                _this.lanternNodes[i].removeChildren();
                                _this.lstItem.addChild(_this.lanternNodes[i]);
                                _this.lanternNodes[i].addChild(display);
                                _this.denglongAnimation[i] = display;
                                setTimeout(function () {
                                    if (this.animationBoolean == true)
                                        return;
                                    baoZha();
                                }, 3000);
                            });
                        }
                    });
                    var baoZha = function () {
                        if (_this.animationBoolean == true)
                            return;
                        zj.Game.DragonBonesManager.getAnimationWithBindImages(_this, "denglong_eff", null, _this.paths[i], _this.bones[i])
                            .then(function (armatureDisplay) {
                            _this.lanternNodes[i].removeChildren();
                            _this.donghua = armatureDisplay;
                            _this.lstItem.addChild(_this.lanternNodes[i]);
                            _this.lanternNodes[i].addChild(armatureDisplay);
                            _this.baozhaAnimation[i] = armatureDisplay;
                            // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                            // 	armatureDisplay.animation.stop();
                            // 	armatureDisplay.animation.reset();
                            // 	armatureDisplay.armature.dispose();
                            // 	armatureDisplay.dbClear();
                            // 	armatureDisplay.dispose(true);
                            // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                            // }, null);
                            _this.donghua.animation.play("004_denglong_baozha", 1);
                            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                                armatureDisplay.animation.stop();
                                _this.btnDown.enabled = false;
                            }, _this);
                        });
                    };
                });
            };
            var this_1 = this;
            for (var i = 0; i < this.lanternNodes.length; i++) {
                _loop_1(i);
            }
        };
        ActivityXuyuanPop.prototype.setButtonOpen = function () {
            this.btnDown.enabled = false;
            this.groupStar.visible = true;
            egret.Tween.get(this.lbCore).to({ x: 277 }, 500);
            this.groupButton.visible = true;
            this.lbCloseTip.visible = false;
            var state = {
                none: 0,
                useOne: 1,
                useTen: 2,
                freeOne: 3,
            };
            var lastFreeTime = zj.TableLicence.Item(zj.Game.PlayerInfoSystem.LecenceLevel).xuyuan_free - zj.Game.PlayerVIPSystem.vipInfo.xuyuan_free;
            var lastUseTime = this.father.curTopicInfo.max_time - zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
            var curState = state.none;
            if (lastUseTime > 0) {
                if (this.goods.length > 1 && lastUseTime >= 10) {
                    curState = state.useTen;
                }
                else if (lastFreeTime > 0) {
                    curState = state.freeOne;
                }
                else {
                    curState = state.useOne;
                }
            }
            else if (lastFreeTime > 0) {
                curState = state.freeOne;
            }
            if (curState == state.none) {
                this.groupOther.visible = false;
            }
            else if (curState == state.useOne) {
                this.btnMore.visible = false;
                this.lbFreeTime.visible = false;
                this.imgSale.visible = false;
            }
            else if (curState == state.useTen) {
                this.btnOne.visible = false;
                this.lbFreeTime.visible = false;
            }
            else if (curState == state.freeOne) {
                this.btnOne.visible = true;
                this.btnMore.visible = false;
                this.imgCost.visible = false;
                this.lbMore.visible = false;
                this.imgSale.visible = false;
                this.lbFreeTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.wishing_tree_free, lastFreeTime);
            }
            var price;
            if (curState == state.useTen) {
                price = this.father.curTopicInfo.consume_pai_ten;
            }
            else {
                price = this.father.curTopicInfo.consume_pai;
            }
            this.lbMore.text = price;
        };
        ActivityXuyuanPop.prototype.onTouchTap = function () {
            this.setButtonOpen();
            this.animationBoolean = true;
            this.lstItem0.visible = true;
            this.lstItem.visible = false;
            this.lstItem.removeChildren();
            this.scrollerAni.visible = false;
            this.scrollerAni.removeChildren();
            for (var i = 0; i < this.lanternNodes.length; i++) {
                this.lanternNodes[i].removeChildren();
                this.paths[i][0].anchorOffsetX = this.paths[i][0].width / 2;
                this.paths[i][0].anchorOffsetY = this.paths[i][0].height / 2;
                this.lstItem0.addChild(this.lanternNodes[i]);
                this.lanternNodes[i].addChild(this.paths[i][0]);
            }
        };
        ActivityXuyuanPop.prototype.onBtnOne = function () {
            this.btnMore.enabled = false;
            this.close();
            this.father.onBtnOne();
        };
        ActivityXuyuanPop.prototype.onBtnMore = function () {
            this.btnOne.enabled = false;
            this.close();
            this.father.onBtnMore();
        };
        ActivityXuyuanPop.prototype.onBtnReturn = function () {
            var _this = this;
            this.close(zj.UI.HIDE_TO_TOP);
            zj.loadUI(zj.CommonGetDialog)
                .then(function (dialog) {
                dialog.init(_this.goods);
                dialog.show();
            });
        };
        //删除长按
        ActivityXuyuanPop.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        //长按点击详情
        ActivityXuyuanPop.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return ActivityXuyuanPop;
    }(zj.Dialog));
    zj.ActivityXuyuanPop = ActivityXuyuanPop;
    __reflect(ActivityXuyuanPop.prototype, "zj.ActivityXuyuanPop");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanPop.js.map