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
    // 福利-升级奖励item
    // lizhengiang
    // 20190323
    var ActivitySpecialLevelUpItem = (function (_super) {
        __extends(ActivitySpecialLevelUpItem, _super);
        function ActivitySpecialLevelUpItem() {
            var _this = _super.call(this) || this;
            _this.getAward = false;
            _this.reqReward = function () {
                zj.Game.PlayerActivitySystem.upLevelReward(_this.tbl.index).then(function (resp) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(resp.getGoods);
                        dialog.setCB(_this.data.father.setList);
                        zj.Game.EventManager.event(zj.GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
                    });
                }).catch(function (result) {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result));
                });
            };
            _this.skinName = "resource/skins/activity/ActivitySpecialLevelUpItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivitySpecialLevelUpItem"], null);
            _this.btnMonthCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMonthCard, _this);
            _this.btnCardGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCardGetAward, _this);
            _this.imgMonthCardIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                _this.groupAnimation.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            return _this;
        }
        ActivitySpecialLevelUpItem.prototype.dataChanged = function () {
            var _this = this;
            zj.closeCache(this.groupCache);
            this.info = this.data.info;
            this.tbl = this.data.tbl;
            this.lbPlayerLevel.text = this.tbl.level.toString(); // Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Activity.getAward, ));
            this.imgMonthCardIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.tbl.month_reward[0][0]), this);
            this.lbMonthCardNum.text = (this.tbl.month_reward[0][1]).toString();
            var buyCard = zj.PlayerGiftSystem.AdvanceMonthBeBought();
            var level = this.tbl.level;
            var levelReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward, function (k, v) {
                return v == _this.tbl.index;
            });
            var monthReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.monthReward, function (k, v) {
                return v == _this.tbl.index;
            });
            this.imgGetAward.visible = false;
            this.imgMask.visible = false;
            this.getAward = false;
            // (<eui.Image>this.btnCardGetAward.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Special.buttonNor, this);
            this.btnCardGetAward.label = "普通领取";
            // (<eui.Image>this.btnMonthCard.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Special.buttonSingle["buttonNor"], this);
            this.btnMonthCard.label = "领取专享";
            this.btnCardGetAward.enabled = true;
            this.btnMonthCard.enabled = true;
            if (zj.Game.PlayerInfoSystem.BaseInfo.level >= level) {
                if (buyCard) {
                    if (levelReward) {
                        this.getAward = true;
                        this.btnCardGetAward.visible = false;
                        if (monthReward) {
                            this.imgGetAward.visible = true;
                            this.btnMonthCard.visible = true;
                            // (<eui.Image>this.btnMonthCard.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Activity.ButtonOk, this);
                            this.imgMask.visible = true;
                            this.btnMonthCard.label = "已领取";
                            this.btnMonthCard.enabled = false;
                        }
                        else {
                            this.btnMonthCard.visible = true;
                        }
                    }
                    else {
                        this.btnCardGetAward.visible = true;
                        this.btnMonthCard.visible = false;
                    }
                }
                else {
                    if (levelReward) {
                        this.getAward = true;
                        this.btnCardGetAward.visible = false;
                        this.btnMonthCard.visible = true;
                    }
                    else {
                        this.btnCardGetAward.visible = true;
                        this.btnMonthCard.visible = false;
                    }
                }
            }
            else {
                this.imgGetAward.visible = false;
                this.btnCardGetAward.visible = true;
                this.btnMonthCard.visible = false;
                // (<eui.Image>this.btnCardGetAward.getChildAt(0)).source = cachekey(UIConfig.UIConfig_Activity.ButtonLevel, this);
                this.btnCardGetAward.label = "等级不足";
                this.btnCardGetAward.enabled = false;
            }
            this.loadList();
            zj.setCache(this.groupCache);
        };
        ActivitySpecialLevelUpItem.prototype.loadList = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = this.tbl.level_reward; _i < _a.length; _i++) {
                var v = _a[_i];
                arrCollection.addItem({
                    "goods": v[0],
                    "count": v[1],
                    "isGet": this.getAward
                });
            }
            this.lstAward.dataProvider = arrCollection;
            this.lstAward.itemRenderer = zj.ActivityActivityItemB;
        };
        ActivitySpecialLevelUpItem.prototype.onBtnMonthCard = function () {
            var _this = this;
            var buyCard = zj.PlayerGiftSystem.AdvanceMonthBeBought();
            var advancedId = zj.CommonConfig.month_card_fit[1];
            var advanceInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == advancedId;
            })[0];
            if (buyCard == false) {
                if (advanceInfo == null) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.BuyCard);
                }
                else {
                    // loadUI(GiftTimeNode)
                    //     .then((dialog: GiftTimeNode) => {
                    //         dialog.show(UI.SHOW_FROM_TOP);
                    //         dialog.setInfo(advanceInfo, null, null, true);
                    //     });
                    zj.TipManager.ShowConfirmCancel("是否前往超值月卡购买", function () {
                        _this.data.father.cb();
                    });
                }
            }
            else {
                this.reqReward();
            }
        };
        ActivitySpecialLevelUpItem.prototype.onBtnCardGetAward = function () {
            this.reqReward();
        };
        ActivitySpecialLevelUpItem.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.tbl.month_reward[0][0];
            goodsInfo.count = this.tbl.month_reward[0][1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ActivitySpecialLevelUpItem;
    }(eui.ItemRenderer));
    zj.ActivitySpecialLevelUpItem = ActivitySpecialLevelUpItem;
    __reflect(ActivitySpecialLevelUpItem.prototype, "zj.ActivitySpecialLevelUpItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivitySpecialLevelUpItem.js.map