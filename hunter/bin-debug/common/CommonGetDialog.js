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
    // lizhengqiang
    // 2018/12/05
    // 恭喜获得界面
    var CommonGetDialog = (function (_super) {
        __extends(CommonGetDialog, _super);
        function CommonGetDialog() {
            var _this = _super.call(this) || this;
            _this.AwardmoveLocation = 0;
            _this.TableViewIndex = 0;
            _this.arrData = [];
            _this.CB = null;
            _this.removeCb = null;
            _this.skinName = "resource/skins/common/CommonGetDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY_1, _this.showGoodsProperty, _this);
            _this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, _this.groupBackdrop);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY_1, _this.showGoodsProperty, _this);
            }, null);
            if (zj.Game.TeachSystem.curPart == 3014 || zj.Game.TeachSystem.curPart == 3020)
                _this.btnClose.enabled = false;
            return _this;
        }
        //添加龙骨动画背景发光
        CommonGetDialog.prototype.addBackdropAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        CommonGetDialog.prototype.onEntryTopDialog = function () {
            zj.Game.SoundManager.playEffect("ui_lingqu_wupin_mp3");
        };
        CommonGetDialog.prototype.init = function (goods, type, ani) {
            if (goods === void 0) { goods = []; }
            if (type == "HXH_InstanceSearchItem") {
                this.imgCongratulations.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.successB, this);
                this.imgCongratulationsB.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter.successB, this);
                this.btnLeft.visible = false;
                this.btnRight.visible = false;
                this.scrollerRewards.width = 597;
            }
            this.arrData = goods;
            var aniBoolean = false;
            if (ani) {
                aniBoolean = ani;
            }
            this.lstItem.selectedIndex = -1; // 默认选中
            this.lstItem.itemRenderer = zj.CommonGetDialogItemIR; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.arrData.length; i++) {
                var data = new zj.CommonGetDialogItemIRData();
                data.index = i;
                data.info = this.arrData[i];
                data.father = this;
                data.aniBoolean = aniBoolean;
                this.TableViewItem.addItem(data);
            }
            this.scrollerRewards.viewport = this.lstItem;
            this.scrollerRewards.validateNow();
            this.scrollerRewards.viewport.scrollH = this.AwardmoveLocation;
            this.scrollerRewards.left = 0;
            var layout = new eui.HorizontalLayout();
            layout.verticalAlign = "middle";
            layout.horizontalAlign = "center";
            layout.gap = 20;
            // 1~4个商品时，居中显示特殊处理
            if (this.arrData.length > 0 && this.arrData.length < 5) {
                this.btnLeft.visible = false;
                this.btnRight.visible = false;
                var width = 94;
                switch (this.arrData.length) {
                    case 1:
                        {
                            layout.paddingLeft = this.lstItem.width / 2 - width / 2;
                        }
                        ;
                        break;
                    case 2:
                        {
                            layout.paddingLeft = this.lstItem.width / 2 - width - layout.gap / 2;
                        }
                        ;
                        break;
                    case 3:
                        {
                            layout.paddingLeft = this.lstItem.width / 2 - width * 3 / 2 - layout.gap;
                        }
                        ;
                        break;
                    case 4:
                        {
                            layout.paddingLeft = this.lstItem.width / 2 - width * 2 - layout.gap * 3 / 2;
                        }
                        ;
                        break;
                }
            }
            this.lstItem.layout = layout;
            this.lstItem.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.lstItem.selectedIndex;
            this.playAnimation();
        };
        CommonGetDialog.prototype.onScrollerEnd = function () {
            if (this.lstItem.scrollH == 0) {
                this.btnLeft.visible = false;
                this.btnRight.visible = true;
            }
            else if (this.lstItem.scrollH + this.scrollerRewards.width >= this.lstItem.contentWidth) {
                this.btnLeft.visible = true;
                this.btnRight.visible = false;
            }
            else {
                this.btnLeft.visible = true;
                this.btnRight.visible = true;
            }
        };
        CommonGetDialog.prototype.setCB = function (cb) {
            this.CB = cb;
        };
        CommonGetDialog.prototype.onBtnClose = function () {
            if (this.CB != null)
                this.CB();
            this.close();
        };
        CommonGetDialog.prototype.playAnimation = function () {
            var _this = this;
            this.imgCongratulations.scaleX = 10;
            this.imgCongratulations.scaleY = 10;
            this.imgCongratulations.alpha = 1;
            egret.Tween.get(this.imgCongratulations)
                .to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
                .call(function () {
                _this.imgCongratulationsB.scaleX = 0.85;
                _this.imgCongratulationsB.scaleY = 0.85;
                _this.imgCongratulationsB.alpha = 1;
                egret.Tween.get(_this.imgCongratulationsB)
                    .to({ scaleY: 2.5, scaleX: 2.5, alpha: 0 }, 1000, egret.Ease.sineInOut)
                    .call(function () {
                    egret.Tween.removeTweens(_this.imgCongratulationsB);
                });
            })
                .to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
                .to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut)
                .call(function () {
                egret.Tween.removeTweens(_this.imgCongratulations);
            });
        };
        CommonGetDialog.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        CommonGetDialog.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            if (zj.PlayerItemSystem.ItemType(ev.data.info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                show.reSetGeneral();
            }
            show.name = "details";
            this.addChild(show);
            var any = true;
            var num = Number(any);
        };
        return CommonGetDialog;
    }(zj.Dialog));
    zj.CommonGetDialog = CommonGetDialog;
    __reflect(CommonGetDialog.prototype, "zj.CommonGetDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CommonGetDialog.js.map