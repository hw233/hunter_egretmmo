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
    /**
     * @class 通行证主界面奖励UI 每级奖励Item
     *
     * @author LianLei
     *
     * @date 2019-11-20
     */
    var HXH_BattlePassRewardItem = (function (_super) {
        __extends(HXH_BattlePassRewardItem, _super);
        function HXH_BattlePassRewardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/battlePass/HXH_BattlePassRewardItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_BattlePassRewardItem"], null);
            _this.groupLow.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonCheckLow_CallBack, _this);
            _this.groupLow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ButtonCheckLow_OnTouchDown, _this);
            _this.groupHigh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonCheckHigh_CallBack, _this);
            _this.groupHigh.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.ButtonCheckHigh_OnTouchDown, _this);
            return _this;
        }
        HXH_BattlePassRewardItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HXH_BattlePassRewardItem.prototype.updateView = function (data) {
            this.index = data.index;
            this.info = data.info;
            this.high = data.high;
            this.father = data.father;
            this.imgBlackLv.visible = data.index > zj.Game.PlayerInfoSystem.BaseInfo.permitLevel && data.high == null;
            this.labelPassLv.text = "Lv." + data.index;
            var itemSetL = zj.PlayerItemSystem.Set(data.info.free_reward[0], null, data.info.free_reward[1]);
            var itemSetH = zj.PlayerItemSystem.Set(data.info.pay_reward[0], null, data.info.pay_reward[1]);
            // 免费通行证奖励是否领取
            var findLow = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_free_reward.indexOf(data.index) != -1;
            // 高级通行证奖励是否领取
            var findHigh = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.permit_pay_reward.indexOf(data.index) != -1;
            this.imgBlackLow.visible = data.index > zj.Game.PlayerInfoSystem.BaseInfo.permitLevel;
            this.imgBlackHigh.visible = zj.Game.PlayerInfoSystem.BaseInfo.permitLevel < data.index || zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 0;
            this.imgGetLow.visible = findLow;
            this.imgGetHigh.visible = findHigh;
            if (itemSetL != null) {
                this.imgBoardLow.source = zj.cachekey(itemSetL.Frame, this);
                this.imgIconLow.source = zj.cachekey(itemSetL.Path, this);
                this.labelNumLow.text = data.info.free_reward[1].toString();
                this.groupLow.visible = true;
            }
            else {
                this.groupLow.visible = false;
            }
            if (itemSetH != null) {
                this.imgBoardHigh.source = zj.cachekey(itemSetH.Frame, this);
                this.imgIconHigh.source = zj.cachekey(itemSetH.Path, this);
                this.labelNumHigh.text = data.info.pay_reward[1].toString();
                this.groupHigh.visible = true;
            }
            else {
                this.groupHigh.visible = false;
            }
            if (!this.selected) {
                this.groupAni1.removeChildren();
                this.groupAni2.removeChildren();
            }
            else {
                if (this.father.touchWhich == zj.TOUCHWHICH.default) {
                    this.SetSelect(data.index, zj.Game.PlayerInfoSystem.BaseInfo.permitPay == 1);
                }
                else {
                    if (this.father.touchWhich != zj.TOUCHWHICH.right)
                        this.SetSelect(data.index, this.father.touchWhich == zj.TOUCHWHICH.low ? false : (this.father.touchWhich == zj.TOUCHWHICH.high ? true : false));
                }
            }
        };
        HXH_BattlePassRewardItem.prototype.ButtonCheckLow_CallBack = function () {
            if (!this.high) {
                this.father.touchWhich = zj.TOUCHWHICH.low;
                this.SetSelect(this.index, false);
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.free_reward[0], count: this.info.free_reward[1], is_senior: false, level: this.index });
            }
        };
        HXH_BattlePassRewardItem.prototype.ButtonCheckHigh_CallBack = function () {
            if (!this.high) {
                this.father.touchWhich = zj.TOUCHWHICH.high;
                this.SetSelect(this.index, true);
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.pay_reward[0], count: this.info.pay_reward[1], is_senior: true, level: this.index });
            }
        };
        HXH_BattlePassRewardItem.prototype.ButtonCheckLow_OnTouchDown = function () {
            if (this.high) {
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.free_reward[0], count: this.info.free_reward[1], is_senior: false, level: this.index, isRight: true });
            }
        };
        HXH_BattlePassRewardItem.prototype.ButtonCheckHigh_OnTouchDown = function () {
            if (this.high) {
                zj.Game.EventManager.event(zj.GameEvent.UPDATE_BATTLEPASS_REWARD, { goodsId: this.info.pay_reward[0], count: this.info.pay_reward[1], is_senior: true, level: this.index, isRight: true });
            }
        };
        HXH_BattlePassRewardItem.prototype.SetSelect = function (level, enabled) {
            this.groupAni1.removeChildren();
            this.groupAni2.removeChildren();
            if (this.selected) {
                if (this.index == level && !enabled)
                    this.addAnimation(this.groupAni1);
                if (this.index == level && enabled)
                    this.addAnimation(this.groupAni2);
            }
        };
        HXH_BattlePassRewardItem.prototype.addAnimation = function (group) {
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0).then(function (display) {
                display.name = "selAni";
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        return HXH_BattlePassRewardItem;
    }(eui.ItemRenderer));
    zj.HXH_BattlePassRewardItem = HXH_BattlePassRewardItem;
    __reflect(HXH_BattlePassRewardItem.prototype, "zj.HXH_BattlePassRewardItem");
    var HXH_BattlePassRewardItemData = (function () {
        function HXH_BattlePassRewardItemData() {
        }
        return HXH_BattlePassRewardItemData;
    }());
    zj.HXH_BattlePassRewardItemData = HXH_BattlePassRewardItemData;
    __reflect(HXH_BattlePassRewardItemData.prototype, "zj.HXH_BattlePassRewardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_BattlePassRewardItem.js.map