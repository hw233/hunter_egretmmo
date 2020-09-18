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
    var TOUCHWHICH;
    (function (TOUCHWHICH) {
        TOUCHWHICH[TOUCHWHICH["low"] = 1] = "low";
        TOUCHWHICH[TOUCHWHICH["high"] = 2] = "high";
        TOUCHWHICH[TOUCHWHICH["right"] = 3] = "right";
        TOUCHWHICH[TOUCHWHICH["default"] = 4] = "default"; // 初始状态
    })(TOUCHWHICH = zj.TOUCHWHICH || (zj.TOUCHWHICH = {}));
    /**
     * @class 通行证主界面奖励UI
     *
     * @author LianLei
     *
     * @date 2019-11-16
     */
    var HXH_BattlePassGift = (function (_super) {
        __extends(HXH_BattlePassGift, _super);
        function HXH_BattlePassGift() {
            var _this = _super.call(this) || this;
            _this.level = 0;
            _this.touchWhich = TOUCHWHICH.default;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassGiftSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.closeUI, _this);
            zj.Game.EventManager.on(zj.GameEvent.UPDATE_BATTLEPASS_GIFT, _this.SetInfo, _this);
            _this.scrollerItemA.addEventListener(eui.UIEvent.CHANGE, _this.scrollerItemAChange, _this);
            _this.btnGetGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGetGift, _this);
            _this.btnPassUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPassUp, _this);
            _this.btnExpUp.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnExpUp, _this);
            _this.btnCheckGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onbtnCheckGift, _this);
            _this.btnHighUnLock.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnHighUnLock, _this);
            zj.Game.EventManager.on(zj.GameEvent.UPDATE_BATTLEPASS_REWARD, _this.RefreshReward, _this);
            _this.Init();
            return _this;
        }
        HXH_BattlePassGift.prototype.Init = function () {
            this.size = this.imgExpBar.width;
            this.offestLevel = 10;
            this.imgExpBar.mask = this.barMask;
            this.listItemAData = new eui.ArrayCollection();
            this.listItemBData = new eui.ArrayCollection();
            this.initData();
        };
        HXH_BattlePassGift.prototype.initData = function () {
            this.rewardList = [];
            var season = Math.floor((zj.Set.TimeFormatBeijing().getMonth()) + 1);
            var tblInfo = zj.TablePermitReward.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(tblInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.season == season)
                    this.rewardList.push(v);
            }
            if (season != zj.CommonConfig.permit_season_zone_month.length) {
                this.labelOver.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_BattlePass.timeOver, zj.Set.TimeFormatBeijing().getFullYear(), zj.CommonConfig.permit_season_zone_month[season]);
            }
            else {
                this.labelOver.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_BattlePass.timeOver, zj.Set.TimeFormatBeijing().getFullYear() + 1, zj.CommonConfig.permit_season_zone_month[0]);
            }
            this.labelSeason.text = season.toString();
        };
        HXH_BattlePassGift.prototype.SetInfo = function () {
            this.setInstance();
            egret.setTimeout(this.scrollerItemAChange, this, 200);
        };
        HXH_BattlePassGift.prototype.setInstance = function () {
            this.setUIItemsList();
            this.setUIItemsListHigh();
            var high_gift_id = 100210;
            var highGiftInfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == high_gift_id;
            })[0];
            var isBuyHigh = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_monthgift.indexOf(high_gift_id) == -1 ? (highGiftInfo != null && highGiftInfo.buy_times < 1) : false;
            this.btnExpUp.visible = isBuyHigh;
            var is_senior = zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1;
            var goodId = is_senior ? this.rewardList[this.listItemA.selectedIndex].pay_reward[0] : this.rewardList[this.listItemA.selectedIndex].free_reward[0];
            var count = is_senior ? this.rewardList[this.listItemA.selectedIndex].pay_reward[1] : this.rewardList[this.listItemA.selectedIndex].free_reward[1];
            this.SetBuyGiftHigh(goodId, count, is_senior, this.rewardList[this.listItemA.selectedIndex].level);
        };
        HXH_BattlePassGift.prototype.setUIItemsList = function () {
            var _this = this;
            this.rewardList.sort(function (a, b) { return a.id - b.id; });
            this.listItemAData.removeAll();
            for (var i = 0; i < this.rewardList.length; i++) {
                var itemData = new zj.HXH_BattlePassRewardItemData();
                itemData.index = this.rewardList[i].level;
                itemData.info = this.rewardList[i];
                itemData.father = this;
                this.listItemAData.addItem(itemData);
            }
            this.listItemA.dataProvider = this.listItemAData;
            this.listItemA.itemRenderer = zj.HXH_BattlePassRewardItem;
            var offSet = (this.scrollerItemA.width - this.rewardList.length * this.scrollerItemA.width / 5) / 2;
            offSet = offSet > 0 ? offSet : 0;
            this.scrollerItemA.viewport.scrollH = offSet;
            var level = 0;
            var max = 0;
            var level_1 = 0;
            var max_1 = 0;
            for (var i = 0; i < this.rewardList.length; i++) {
                var index = i + 1;
                var vv = this.rewardList[i];
                var getAward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1;
                if (index <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
                    if (index > max && vv.free_reward[0] != null)
                        level = vv.level;
                }
            }
            for (var i = 0; i < this.rewardList.length; i++) {
                var index = i + 1;
                var vv = this.rewardList[i];
                var getAward_1 = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(vv.level) != -1;
                if (index <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward_1) {
                    if (index > max_1) {
                        max_1 = index;
                        level_1 = vv.level;
                    }
                }
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay != 1) {
                this.listItemA.selectedIndex = (level - 1) == -1 ? zj.Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level - 1);
            }
            else if (level_1 >= level) {
                this.listItemA.selectedIndex = (level_1 - 1) < 0 ? zj.Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level_1 - 1);
            }
            else {
                this.listItemA.selectedIndex = (level - 1) < 0 ? zj.Game.PlayerInfoSystem.BaseInfo.permitLevel - 1 : (level - 1);
            }
            this.itemIndex = this.listItemA.selectedIndex;
            this.listItemA.validateNow();
            this.scrollerItemA.viewport = this.listItemA;
            egret.Tween.get(this).wait(100).call(function () { _this.listSlide(); });
        };
        HXH_BattlePassGift.prototype.listSlide = function () {
            if (this.listItemA.selectedIndex != -1) {
                if (this.rewardList.length * 86.5 - this.listItemA.selectedIndex * 86.5 > this.scrollerItemA.width) {
                    this.listItemA.scrollH = this.listItemA.selectedIndex * 86.5;
                }
                else {
                    this.listItemA.scrollH = this.rewardList.length * 86.5 - this.scrollerItemA.width;
                }
            }
            else {
                this.listItemA.scrollH = 0;
            }
        };
        HXH_BattlePassGift.prototype.setUIItemsListHigh = function () {
            this.listItemBData.removeAll();
            for (var i = 0; i < 1; i++) {
                var itemData = new zj.HXH_BattlePassRewardGoodItemData();
                itemData.level = this.offestLevel;
                this.listItemBData.addItem(itemData);
            }
            this.listItemB.dataProvider = this.listItemBData;
            this.listItemB.itemRenderer = zj.HXH_BattlePassRewardGoodItem;
        };
        HXH_BattlePassGift.prototype.RefreshReward = function (ev) {
            if (ev == null)
                return;
            this.SetBuyGiftHigh(ev.data.goodsId, ev.data.count, ev.data.is_senior, ev.data.level, false);
            if (ev.data.isRight == true) {
                this.touchWhich = TOUCHWHICH.right;
                for (var i = 0; i < this.listItemAData.source.length; i++) {
                    var item = this.listItemA.getElementAt(i);
                    if (item != null) {
                        item['groupAni1'].removeChildren();
                        item['groupAni2'].removeChildren();
                    }
                }
            }
        };
        HXH_BattlePassGift.prototype.SetBuyGiftHigh = function (goodIdSel, counts, is_senior, index, isSlide) {
            if (isSlide === void 0) { isSlide = true; }
            var self = this;
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 || goodIdSel != null) {
                this.groupShow.visible = true;
                this.groupNotBuy.visible = false;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
                this.groupShow.visible = true;
                this.groupNotBuy.visible = false;
            }
            else {
                this.groupShow.visible = false;
                this.groupNotBuy.visible = true;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
                this.groupHighPassLock.visible = false;
            }
            else {
                this.groupHighPassLock.visible = true;
            }
            // 经验进度条
            var exp = zj.TableLevel.Item(zj.Game.PlayerInfoSystem.BaseInfo.permitLevel).permit_exp;
            var percent = zj.Game.PlayerInfoSystem.BaseInfo.permitExp / exp;
            if (percent > 1 || zj.Game.PlayerInfoSystem.BaseInfo.permitLevel == 100)
                percent = 1;
            this.barMask.width = this.size * percent;
            this.level = 0;
            this.is_senior = false;
            if (is_senior != null) {
                this.is_senior = is_senior;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
                this.is_senior = true;
            }
            // 奖励预览
            var show_level = 0;
            var goodId = 0;
            var count = 0;
            var Buy_goods = zj.Table.DeepCopy(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward);
            var max = 0;
            var max_high = 0;
            var goods_low = 0;
            var goods_high = 0;
            var counts_low = 0;
            var counts_high = 0;
            var level_low = 0;
            var level_high = 0;
            var m = 0;
            if (goodIdSel != null) {
                goodId = goodIdSel;
                count = counts;
                this.level = index;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
                for (var i = 0; i < this.rewardList.length; i++) {
                    var index_1 = i + 1;
                    var vv = this.rewardList[i];
                    var getAward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1;
                    if (index_1 <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
                        if (index_1 > m && vv.free_reward[0] != null)
                            show_level = vv.level;
                    }
                }
                goodId = this.rewardList[show_level - 1].free_reward[0];
                count = this.rewardList[show_level - 1].free_reward[1];
                this.level = show_level;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length) {
                show_level = Math.ceil(zj.Game.PlayerInfoSystem.BaseInfo.permitLevel / 10) * 10 && 1;
                goodId = this.rewardList[show_level - 1].pay_reward[0];
                count = this.rewardList[show_level - 1].pay_reward[1];
                this.level = show_level;
                this.is_senior = true;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel >= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length) {
                for (var i = 0; i < this.rewardList.length; i++) {
                    var index_2 = i + 1;
                    var vv = this.rewardList[i];
                    var getAwards = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(vv.level) != -1 && vv.free_reward[0] != null;
                    if (index_2 <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAwards) {
                        if (index_2 >= max && vv.free_reward[0] != null) {
                            max = index_2;
                            goods_low = vv.free_reward[0];
                            counts_low = vv.free_reward[1];
                            level_low = vv.level;
                        }
                    }
                }
                for (var i = 0; i < this.rewardList.length; i++) {
                    var index_3 = i + 1;
                    var vv = this.rewardList[i];
                    var getAward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(vv.level) != -1;
                    if (index_3 <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
                        if (index_3 > max_high) {
                            max_high = index_3;
                            goods_high = vv.pay_reward[0];
                            counts_high = vv.pay_reward[1];
                            level_high = vv.level;
                        }
                    }
                }
                if (level_high >= level_low && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
                    goodId = goods_high;
                    count = counts_high;
                    this.level = level_high;
                    this.is_senior = true;
                    this.touchWhich = TOUCHWHICH.high;
                }
                else {
                    goodId = goods_low;
                    count = counts_low;
                    this.level = level_low;
                    this.is_senior = false;
                    this.touchWhich = TOUCHWHICH.low;
                }
                if (this.itemIndex == this.listItemA.selectedIndex) {
                    this.listItemA.selectedIndex = this.level - 1;
                    this.listItemAData.replaceItemAt(this.listItemAData.source[this.level], this.level);
                    this.listItemAData.replaceItemAt(this.listItemAData.source[this.level - 1], this.level - 1);
                    this.listSlide();
                }
                else {
                    this.itemIndex = this.listItemA.selectedIndex;
                    this.listItemA.selectedIndex = (this.level - 1) <= 0 ? zj.Game.PlayerInfoSystem.BaseInfo.permitLevel : (this.level - 1);
                }
            }
            var one = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(1) != -1;
            var one_low = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(1) != -1;
            // if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level == 1 && one && one_low) {
            // 	let flag = (Game.PlayerInfoSystem.BaseInfo.permitLevel - Game.PlayerInfoSystem.BaseInfo.permitLevel % 10) + 10;
            // 	if (flag > 100) flag = 1;
            // 	goodId = this.rewardList[flag - 1].pay_reward[0];
            // 	count = this.rewardList[flag - 1].pay_reward[1];
            // }
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 || goodIdSel != null || (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel > zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length)) {
                var itemSet = zj.PlayerItemSystem.Set(goodId, null, counts == null ? count : counts);
                this.labelItemDes.textFlow = zj.Util.RichText(itemSet.Info.des);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.labelItemName.text = itemSet.Info.name;
                this.labelNum.text = (counts == null ? count : counts).toString();
                // if (this.is_senior == null) {
                // 	this.touchWhich = Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? TOUCHWHICH.high : TOUCHWHICH.low;
                // }
                // else {
                // 	this.touchWhich = this.is_senior ? TOUCHWHICH.high : TOUCHWHICH.low;
                // }
                if (this.itemIndex == this.listItemA.selectedIndex) {
                    this.listItemA.selectedIndex = this.level - 1;
                    if (this.is_senior == null) {
                        this.touchWhich = zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? TOUCHWHICH.high : TOUCHWHICH.low;
                    }
                    else {
                        this.touchWhich = this.is_senior ? TOUCHWHICH.high : TOUCHWHICH.low;
                    }
                    this.listItemAData.replaceItemAt(this.listItemAData.source[this.level - 1], this.level - 1);
                    if (isSlide)
                        this.listSlide();
                }
            }
            var isLowGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(this.level) != -1;
            var isHighGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(this.level) != -1;
            // 判断领取按钮是否可见
            if (this.level > zj.Game.PlayerInfoSystem.BaseInfo.permitLevel) {
                this.btnGetGift.visible = false;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length != 0 && !isLowGet && this.touchWhich == TOUCHWHICH.low) {
                this.btnGetGift.visible = true;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length != 0 && !isHighGet && (this.is_senior || this.is_senior == null) && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.touchWhich == TOUCHWHICH.high) {
                this.btnGetGift.visible = true;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length == 0 && this.level <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && (!this.is_senior || this.is_senior == null) && this.touchWhich == TOUCHWHICH.low) {
                this.btnGetGift.visible = true;
            }
            else if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length == 0 && this.level <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.touchWhich == TOUCHWHICH.high) {
                this.btnGetGift.visible = true;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && this.level <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !isLowGet && !this.is_senior && this.touchWhich == TOUCHWHICH.low) {
                this.btnGetGift.visible = true;
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !isLowGet && this.touchWhich == TOUCHWHICH.low) {
                this.btnGetGift.visible = true;
            }
            else {
                this.btnGetGift.visible = false;
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitLevel >= 100) {
                this.labelExp.text = zj.TextsConfig.TextsConfig_BattlePass.expMAN;
            }
            else {
                this.labelExp.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_BattlePass.exp, zj.Game.PlayerInfoSystem.BaseInfo.permitExp, exp);
            }
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0) {
                this.imgTipPass.source = zj.cachekey(zj.UIConfig.UIConfig_BattlePass.lowPass, this);
                this.labelLvNow.text = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel.toString();
                this.btnPassUp.visible = true;
            }
            else {
                this.imgTipPass.source = zj.cachekey(zj.UIConfig.UIConfig_BattlePass.highPass, this);
                this.labelLvNow.text = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel.toString();
                this.btnPassUp.visible = false;
            }
            if (this.itemIndex == this.listItemA.selectedIndex)
                return;
            this.listItemAData.replaceItemAt(this.listItemAData.source[this.itemIndex], this.itemIndex);
            this.listItemAData.replaceItemAt(this.listItemAData.source[this.listItemA.selectedIndex], this.listItemA.selectedIndex);
            this.itemIndex = this.listItemA.selectedIndex;
            if (isSlide)
                this.listSlide();
        };
        HXH_BattlePassGift.prototype.onBtnGetGift = function () {
            if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.length && this.is_senior) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_BattlePass.NoReward);
            }
            else if (zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && zj.Game.PlayerInfoSystem.BaseInfo.permitLevel == zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.length && !this.is_senior) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_BattlePass.NoReward);
            }
            else {
                this.ContendQueryListReqData();
            }
        };
        HXH_BattlePassGift.prototype.ContendQueryListReqData = function () {
            var req = new message.RewardPermitLevelRequest();
            req.body.is_senior = this.is_senior;
            req.body.level = this.level;
            zj.Game.Controller.send(req, this.ContendQueryListReqData_Visit, null, this, false);
        };
        HXH_BattlePassGift.prototype.ContendQueryListReqData_Visit = function (req, resp) {
            var response = resp;
            if (response.header.result != 0) {
                // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                return;
            }
            this.touchWhich = TOUCHWHICH.default;
            zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REDTIP);
            if (!this.is_senior) {
                var max = 0;
                var max_high = 0;
                var goods_low = 0;
                var goods_high = 0;
                var counts_low = 0;
                var counts_high = 0;
                var level_low = 0;
                var level_high = 0;
                for (var i = 0; i < this.rewardList.length; i++) {
                    var v = this.rewardList[i];
                    var index = i + 1;
                    var getAwards = (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(v.level) != -1 && v.free_reward[0] != null);
                    if (index <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAwards) {
                        if (index >= max && v.free_reward[0] != null) {
                            max = index;
                            goods_low = v.free_reward[0];
                            counts_low = v.free_reward[1];
                            level_low = v.level;
                        }
                    }
                }
                for (var i = 0; i < this.rewardList.length; i++) {
                    var v = this.rewardList[i];
                    var index = i + 1;
                    var getAward = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(v.level) != -1;
                    if (index <= zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && !getAward) {
                        if (index >= max_high) {
                            max_high = index;
                            goods_high = v.pay_reward[0];
                            counts_high = v.pay_reward[1];
                            level_high = v.level;
                        }
                    }
                }
                if (level_high >= level_low && zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1) {
                    if (goods_high != null && goods_high != 0) {
                        this.touchWhich = TOUCHWHICH.high;
                        this.SetBuyGiftHigh(goods_high, counts_high, true, max_high);
                        this.itemIndex = this.listItemA.selectedIndex;
                        this.listItemA.selectedIndex = max_high - 1;
                    }
                    else {
                        var info = this.returnGoodsInfo();
                        this.SetBuyGiftHigh(info[1], info[2], this.is_senior, zj.Game.PlayerInfoSystem.BaseInfo.permitLevel);
                        this.itemIndex = this.listItemA.selectedIndex;
                        this.listItemA.selectedIndex = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel - 1;
                    }
                }
                else {
                    if (goods_low != null && goods_low != 0) {
                        this.touchWhich = TOUCHWHICH.low;
                        this.SetBuyGiftHigh(goods_low, counts_low, false, max);
                        this.itemIndex = this.listItemA.selectedIndex;
                        this.listItemA.selectedIndex = max - 1;
                    }
                    else {
                        var info = this.returnGoodsInfo();
                        this.SetBuyGiftHigh(info[1], info[2], this.is_senior, zj.Game.PlayerInfoSystem.BaseInfo.permitLevel);
                        this.itemIndex = this.listItemA.selectedIndex;
                        this.listItemA.selectedIndex = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel - 1;
                    }
                }
            }
            else {
                // this.SetBuyGiftHigh(null, null, this.is_senior, null);
                this.SetBuyGiftHigh(null, null, false, null);
            }
            zj.toast_success(zj.TextsConfig.TextsConfig_Adviser.adviser_success);
        };
        /**
         * @return [is_senior, goodsId, count];
         */
        HXH_BattlePassGift.prototype.returnGoodsInfo = function () {
            // let is_senior = Game.PlayerInfoSystem.BaseInfo.permitPay == 1
            for (var i = 0; i < this.rewardList.length; i++) {
                if (this.rewardList[i].level == zj.Game.PlayerInfoSystem.BaseInfo.permitLevel) {
                    return [zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1, this.is_senior ? this.rewardList[i].pay_reward[0] : this.rewardList[i].free_reward[0], this.is_senior ? this.rewardList[i].pay_reward[1] : this.rewardList[i].free_reward[1]];
                }
            }
            return [null, null, null];
        };
        HXH_BattlePassGift.prototype.scrollerItemAChange = function () {
            var temp = 4.39; // listItemA一行显示多少item
            var nextIndex = 1;
            var off = this.scrollerItemA.viewport.scrollH;
            var perSizeX = this.scrollerItemA.width / temp;
            nextIndex = Math.ceil((1 * off + temp * perSizeX) / (perSizeX * 10));
            if (nextIndex <= 0) {
                nextIndex = 1;
            }
            else if (nextIndex > Math.floor(this.rewardList.length / 10)) {
                nextIndex = Math.floor(this.rewardList.length / 10);
            }
            if (this.offestLevel != (nextIndex * 10)) {
                this.offestLevel = nextIndex * 10;
                this.setUIItemsListHigh();
            }
        };
        HXH_BattlePassGift.prototype.onBtnPassUp = function () {
            zj.loadUI(zj.HXH_BattlePassPay).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassGift.prototype.onBtnExpUp = function () {
            zj.loadUI(zj.HXH_BattlePassPay).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassGift.prototype.onbtnCheckGift = function () {
            zj.loadUI(zj.HXH_BattlePassAllReward).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassGift.prototype.onBtnHighUnLock = function () {
            zj.loadUI(zj.HXH_BattlePassAllReward).then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_BattlePassGift.prototype.closeUI = function () {
            this.close();
        };
        return HXH_BattlePassGift;
    }(zj.UI));
    zj.HXH_BattlePassGift = HXH_BattlePassGift;
    __reflect(HXH_BattlePassGift.prototype, "zj.HXH_BattlePassGift");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassGift.js.map