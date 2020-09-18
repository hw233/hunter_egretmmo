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
    // HXH_GroupFightFormateItem
    // wangshenzhuo
    // 2019/03/06
    var HXH_GroupFightFormateItem = (function (_super) {
        __extends(HXH_GroupFightFormateItem, _super);
        function HXH_GroupFightFormateItem() {
            var _this = _super.call(this) || this;
            _this.listHunterIndex = 0;
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightFormateItemSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_GroupFightFormateItem"], null);
            _this.buttonUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonUse, _this);
            _this.buttonCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonUse, _this);
            _this.buttonCancel.visible = false;
            return _this;
        }
        HXH_GroupFightFormateItem.prototype.dataChanged = function () {
            this.dataItem = this.data;
            this.InitBase();
            this.SetInfoButton();
            var formate = [];
            for (var i = 0; i < this.data.father.generalNum; i++) {
                formate[this.data.father.generalNum - 1 - i] = this.data.info.formation.generals[i];
            }
            this.listHunter.itemRenderer = zj.CommonArenaEnemyTeamItem;
            this.listHunterItem = new eui.ArrayCollection();
            for (var i = 0; i < formate.length; i++) {
                var data = new zj.CommonArenaEnemyTeamItemData();
                data.index = i + 1;
                data.simpleInfo = formate[i];
                data.showTeam = true;
                this.listHunterItem.addItem(data);
            }
            this.listHunter.dataProvider = this.listHunterItem;
            this.listHunterIndex = this.listHunter.selectedIndex;
            this.labelHelpName.text = this.data.info.baseInfo.name;
        };
        HXH_GroupFightFormateItem.prototype.SetInfoButton = function () {
            var dataId = this.dataItem.info.baseInfo.id;
            var hasBeenUsed = zj.Table.FindF(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed, function (k, v) {
                return v == dataId;
            });
            this.bSelected = this.dataItem.info.baseInfo.id == this.dataItem.father.bUsedInfo[1].lenght;
            var a = this.dataItem.info.baseInfo;
            this.bSelected = this.dataItem.info.baseInfo.id == this.dataItem.father.bUsedInfo[1].id;
            if (hasBeenUsed) {
                // this.imageShadow.visible = true;
                this.notBeUsed(zj.UIConfig.UIConfig_Hunter_GroupFight.haveUse[1], false);
            }
            else if (this.bSelected) {
                this.beUsed(zj.UIConfig.UIConfig_Hunter_GroupFight.cancel[1]);
            }
            else {
                this.notBeUsed(zj.UIConfig.UIConfig_Hunter_GroupFight.use[1], true);
            }
        };
        HXH_GroupFightFormateItem.prototype.onButtonUse = function () {
            if (this.bSelected) {
                //取消选中
                this.bSelected != this.bSelected;
                this.dataItem.father.bUsedInfo[0] = null;
                this.dataItem.father.InitFriendState();
                this.dataItem.father.bUsedInfo[1] = [];
                this.dataItem.father.SetInfoFriendInfoList();
                this.dataItem.father.SetInfoFriendFormate();
            }
            else {
                //选中
                var useTime = zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
                var allTime = zj.PlayerVIPSystem.Level().assist_time;
                if (useTime >= allTime) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_GroupFight.timeNotEnough2);
                    return;
                }
                this.dataItem.father.bUsedInfo[0] = this.dataItem.bFriend && 1 || 2;
                this.dataItem.father.friendFormate = this.dataItem.info.formation;
                this.dataItem.father.bUsedInfo[1] = this.dataItem.info.baseInfo;
                this.dataItem.father.SetInfoFriendInfoList();
                this.dataItem.father.SetInfoFriendFormate();
                this.dataItem.father.SetUITagAni(1);
            }
        };
        HXH_GroupFightFormateItem.prototype.InitBase = function () {
            this.bSelected = false;
            this.imageShadow.visible = false;
        };
        HXH_GroupFightFormateItem.prototype.beUsed = function (ui) {
            zj.Set.ButtonBackgroud(this.buttonUse, ui);
            this.buttonUse.enabled = true;
            this.buttonUse.touchEnabled = true;
        };
        HXH_GroupFightFormateItem.prototype.notBeUsed = function (ui, enable) {
            zj.Set.ButtonBackgroud(this.buttonUse, ui);
            this.buttonUse.enabled = enable;
            this.buttonUse.touchEnabled = enable;
        };
        return HXH_GroupFightFormateItem;
    }(eui.ItemRenderer));
    zj.HXH_GroupFightFormateItem = HXH_GroupFightFormateItem;
    __reflect(HXH_GroupFightFormateItem.prototype, "zj.HXH_GroupFightFormateItem");
    //子项数据源
    var HXH_GroupFightFormateItemData = (function () {
        function HXH_GroupFightFormateItemData() {
        }
        return HXH_GroupFightFormateItemData;
    }());
    zj.HXH_GroupFightFormateItemData = HXH_GroupFightFormateItemData;
    __reflect(HXH_GroupFightFormateItemData.prototype, "zj.HXH_GroupFightFormateItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightFormateItem.js.map