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
    // 福利
    // lizhengqiang
    // 20190320
    var ActivitySpecialMainScene = (function (_super) {
        __extends(ActivitySpecialMainScene, _super);
        // private vis: boolean = true;
        function ActivitySpecialMainScene() {
            var _this = _super.call(this) || this;
            _this.focusCurrent = 0;
            _this.ui = {
                "0": new zj.AwardSign(),
                "1": new zj.ActivitySpecialGetPower(),
                "2": new zj.ActivitySpecialLevelUp(),
                "3": new zj.ActivitySpecialWord(),
                "4": new zj.ActivitySpecialWonderland(),
                "5": new zj.ActivitySpecialWantedSeonde(),
                "6": new zj.ActivityRecharge(),
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialMainSceneSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.lstViewType.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedItem, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
            zj.Game.EventManager.on(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE, _this.typeUpdte, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.CLOSE_ACTIVITY_SCENE, _this.closeThis, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.groupbtnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.groupbtnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.groupbtnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                zj.Game.EventManager.off(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
                zj.Game.EventManager.off(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE, _this.typeUpdte, _this);
                for (var k in _this.ui) {
                    if (_this.ui.hasOwnProperty(k)) {
                        var v = _this.ui[k];
                        v.close();
                    }
                }
                _this.ui = null;
            }, null);
            _this.init();
            _this.update();
            if (zj.Device.isReviewSwitch) {
                _this.btnClose.x = 900;
                _this.btnClose.y = 25;
            }
            return _this;
        }
        ActivitySpecialMainScene.prototype.update = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.lbStrength.text = str_energy;
            // //金币红点
            // if (Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < PlayerVIPSystem.LowItem().buy_coin_free_time) {
            //     this.imgFlagGold.visible = true;
            // } else {
            //     this.imgFlagGold.visible = false;
            // }
            // this.imgFlagGemstone.visible = false;
            // this.imgFlagStrength.visible = false;
            this.imgFlagGemstone.visible = false;
            this.imgFlagGold.visible = false;
            this.imgFlagStrength.visible = false;
        };
        ActivitySpecialMainScene.prototype.init = function () {
            this.loadAttrList();
            this.groupRight.removeChildren();
            if (this.ui[this.focusCurrent] != null) {
                this.groupRight.addChild(this.ui[this.focusCurrent]);
                this.ui[this.focusCurrent].init();
            }
        };
        ActivitySpecialMainScene.prototype.loadAttrList = function () {
            var length = Object.keys(this.ui).length; //屏蔽活动加了个+1
            if (zj.Device.isReviewSwitch) {
                length = 1;
            }
            this.arrCollection = new eui.ArrayCollection();
            for (var i = 1; i <= length; i++) {
                this.arrCollection.addItem(i);
            }
            this.lstViewType.dataProvider = this.arrCollection;
            this.lstViewType.itemRenderer = zj.ActivitySpecialMainItem;
            this.lstViewType.selectedIndex = 0;
        };
        ActivitySpecialMainScene.prototype.onLstSelectedItem = function (e) {
            var _this = this;
            var gift = zj.Table.FindF(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            var charge = zj.Table.FindF(zj.PlayerGiftSystem.SortCharge(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100203 || v.gift_index == 100204;
            });
            if ((!gift && e.itemIndex == 3) && (!charge && e.itemIndex == 3)) {
                zj.toast_warning("月卡暂未开启");
                return;
            }
            ;
            var info = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100302;
            })[0];
            if (!info && e.itemIndex == 4) {
                zj.toast_warning("基金暂未开启");
                return;
            }
            ;
            var info1 = zj.Table.FindR(zj.PlayerGiftSystem.SortGift(zj.Game.PlayerGiftSystem.giftInfos), function (k, v) {
                return v.gift_index == 100303;
            })[0];
            if (!info1 && e.itemIndex == 5) {
                zj.toast_warning("礼包暂未开启");
                return;
            }
            ;
            if (this.focusCurrent != this.lstViewType.selectedIndex) {
                zj.Tips.tips_useTime_set(this.focusCurrent + 1);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, this.focusCurrent + 1);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.focusCurrent]);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.lstViewType.selectedIndex]);
                this.focusCurrent = this.lstViewType.selectedIndex;
                var x = this.groupRight.x;
                this.groupRight.removeChildren();
                if (this.ui[this.focusCurrent] != null) {
                    this.groupRight.addChild(this.ui[this.focusCurrent]);
                    this.ui[this.focusCurrent].init();
                    zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
                    if (this.focusCurrent == 0 || this.focusCurrent == 3) {
                        zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
                    }
                    if (this.focusCurrent == 2) {
                        this.ui[this.focusCurrent].cb(function () {
                            var e = new eui.ItemTapEvent(null);
                            e.itemIndex = 3;
                            _this.lstViewType.selectedIndex = 3;
                            _this.onLstSelectedItem(e);
                        });
                    }
                }
            }
        };
        ActivitySpecialMainScene.prototype.jump = function (num) {
            var e = new eui.ItemTapEvent(null);
            e.itemIndex = num;
            this.lstViewType.selectedIndex = num;
            this.onLstSelectedItem(e);
        };
        ActivitySpecialMainScene.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        ActivitySpecialMainScene.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() > 0)
                return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        ActivitySpecialMainScene.prototype.showCommonMessgae = function (ev) {
            var _this = this;
            setTimeout(function () {
                var ui = zj.newUI(zj.CommonMessage);
                _this.addChild(ui);
                ui.init(ev.data.source, ev.data.text);
            }, 300);
        };
        ActivitySpecialMainScene.prototype.typeUpdte = function (ev) {
            zj.Tips.tips_useTime_set(this.focusCurrent + 1);
            zj.Tips.SetTipsOfId(zj.Tips.TAG.SPECIAL, this.focusCurrent + 1);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.focusCurrent]);
        };
        //添加金币
        ActivitySpecialMainScene.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivitySpecialMainScene.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        ActivitySpecialMainScene.prototype.onBtnAddStrength = function () {
            //增加体力
            zj.loadUI(zj.HXH_HunterUserStrength)
                .then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivitySpecialMainScene.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivitySpecialMainScene.prototype.closeThis = function () {
            this.close();
        };
        return ActivitySpecialMainScene;
    }(zj.Scene));
    zj.ActivitySpecialMainScene = ActivitySpecialMainScene;
    __reflect(ActivitySpecialMainScene.prototype, "zj.ActivitySpecialMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialMainScene.js.map