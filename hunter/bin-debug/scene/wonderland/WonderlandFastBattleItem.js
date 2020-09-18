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
     * @author xingliwei
     *
     * @date 2019-5-21
     *
     * @class 贪婪之岛战报子项
     */
    var WonderlandFastBattleItem = (function (_super) {
        __extends(WonderlandFastBattleItem, _super);
        function WonderlandFastBattleItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/WonderlandFastBattleItemSkin.exml";
            _this.btnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOpen, _this);
            zj.cachekeys(zj.UIResource["WonderlandFastBattleItem"], null);
            return _this;
        }
        WonderlandFastBattleItem.prototype.dataChanged = function () {
            var data = this.data;
            if (this.data.info.leftRoleBase.id != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                this.data.info.leftRoleBase, this.data.info.rightRoleBase = this.data.info.rightRoleBase, this.data.info.leftRoleBase;
                this.data.info.leftArmy, this.data.info.rightArmy = this.data.info.rightArmy, this.data.info.leftArmy;
                this.data.info.leftGenerals, this.data.info.rightGenerals = this.data.info.rightGenerals, this.data.info.leftGenerals;
                this.data.info.leftAllHp, this.data.info.rightAllHp = this.data.info.rightAllHp, this.data.info.leftAllHp;
            }
            this.InitUI();
            if (data.info.goods == null) {
                this.groupItemLeft1.visible = false;
                this.groupItemLeft2.visible = false;
                this.groupItemLeft3.visible = false;
                this.groupItemRight1.visible = false;
                this.groupItemRight2.visible = false;
                this.groupItemRight3.visible = false;
            }
        };
        WonderlandFastBattleItem.prototype.InitUI = function () {
            // if (this.data.infosceneType == message.ESceneType.SCENE_TYPE_LEAGUE_WAR) {
            // 	this.labelName.text = TextsConfig.TextConfig_League.war;
            // } else 
            if (this.data.info.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                var sceneType = this.data.info.sceneId;
                while (sceneType >= 10) {
                    sceneType = Math.floor(sceneType / 10);
                }
                this.labelName.text = (zj.TableDarkland.Item(sceneType).darkland_name);
            }
            else {
                if (this.data.info.sceneId < 100) {
                    this.labelName.text = (zj.TableWonderland.Item(this.data.info.sceneId).wonderland_name);
                }
                else {
                    this.labelName.text = (zj.TableWonderland.Item(Math.floor(this.data.info.sceneId / 100)).wonderland_name);
                }
            }
            this.labelTime.text = (zj.Helper.GetTMStrForActivity(this.data.info.generate_time));
            if (this.data.info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                this.imgLeftResult.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultWinOrLose[1], this);
                this.imgRightResult.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultWinOrLose[2], this);
            }
            else {
                this.imgLeftResult.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultWinOrLose[2], this);
                this.imgRightResult.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.resultWinOrLose[1], this);
            }
            if (zj.PlayerItemSystem.ItemType(this.data.info.rightRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.ItemType(this.data.info.rightRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.data.info.rightRoleBase.picId);
                if (mpr != null) {
                    this.imgRightHead.source = zj.cachekey(mpr.head_path, this);
                }
                // this.imgRightVip.visible(false);
                // this.imgVipBack.visible(false);
            }
            else {
                this.imgRightHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.info.rightRoleBase.picId), this);
                // this.imgRightVip.source = (UIConfig.UIConfig.UIConfig_User.vip[this.data.info.rightRoleBase.vipLevel]);
            }
            if (zj.PlayerItemSystem.ItemType(this.data.info.leftRoleBase.picId) == message.EGoodsType.GOODS_TYPE_NONO ||
                zj.PlayerItemSystem.ItemType(this.data.info.leftRoleBase.picId) == null) {
                var mpr = zj.TableMapRole.Item(this.data.info.leftRoleBase.picId);
                if (mpr != null) {
                    this.imgLeftHead.source = zj.cachekey(mpr.head_path, this);
                }
                // this.imgRightVip.visible(false);
                // this.imgVipBack.visible(false);
            }
            else {
                this.imgLeftHead.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.data.info.leftRoleBase.picId), this);
                // this.imgRightVip.source = (UIConfig.UIConfig.UIConfig_User.vip[this.data.info.rightRoleBase.vipLevel]);
            }
            var right_name = "";
            if (this.data.info.rightRoleBase.name_type == message.ETextArgType.TEXT_ARG_TYPE_MOBS) {
                right_name = zj.Lang.Des(Number(this.data.info.rightRoleBase.name)); //))langdb.Des(tonumber(
            }
            else {
                right_name = this.data.info.rightRoleBase.name;
            }
            this.labelLeftName.text = ("Lv" + this.data.info.leftRoleBase.level + " " + this.data.info.leftRoleBase.name);
            this.labelRightName.text = ("Lv" + this.data.info.rightRoleBase.level + " " + right_name);
            // this.labelLeftPower.text = (Set.numberUnitBattleValue(this.getGeneralPower(this.data.info.leftGenerals)))
            // this.labelRightPower.text = (Set.numberUnitBattleValue(this.getGeneralPower(this.data.info.rightGenerals)))
            if (this.data.info.goods != null) {
                if ((this.data.info.goods)) {
                    if (this.data.info.battleResult == message.BattleResultState.BATTLE_RESULT_STATE_WIN) {
                        this.imgGetOrLoseLeft.source = zj.cachekey(zj.UIConfig.UIConfig_League.WarWinGetFoods, this);
                        this.imgGetOrLoseRight.source = zj.cachekey(zj.UIConfig.UIConfig_League.WarWinLoseFoods, this);
                    }
                    else {
                        this.imgGetOrLoseLeft.source = zj.cachekey(zj.UIConfig.UIConfig_League.WarWinLoseFoods, this);
                        this.imgGetOrLoseRight.source = zj.cachekey(zj.UIConfig.UIConfig_League.WarWinGetFoods, this);
                    }
                }
                else {
                    this.imgGetOrLoseLeft.visible = (false);
                    this.imgGetOrLoseRight.visible = (false);
                }
                for (var i = 0; i < 3; i++) {
                    if (this.data.info.goods[i] != null && this.data.info.goods[i].goodsId != 0) {
                        var itemSet = zj.PlayerItemSystem.Set(this.data.info.goods[i].goodsId, this.data.info.goods[i].showType, this.data.info.goods[i].count);
                        this["imgItemFrame1_" + (i + 1)].text = itemSet.Frame;
                        this["imgItemIcon1_" + (i + 1)].source = zj.cachekey(itemSet.Clip, this);
                        this["labelFruitNum1_" + (i + 1)].text = itemSet.FruitID;
                        this["labelItemRightNum1_" + (i + 1)].text = this.data.info.goods[i].count;
                        var itemSet2 = zj.PlayerItemSystem.Set(this.data.info.goods[i].goodsId, this.data.info.goods[i].showType, this.data.info.goods[i].count);
                        this["imgItemFrame2_" + (i + 1)].source = zj.cachekey(itemSet2.Frame, this);
                        this["imgItemIcon2_" + (i + 1)].source = zj.cachekey(itemSet2.Clip, this);
                        this["labelFruitNum2_" + (i + 1)].text = itemSet2.FruitID;
                        this["labelItemRightNum2_" + (i + 1)].text = this.data.info.goods[i].count;
                    }
                    else {
                        this["groupItemLeft" + (i + 1)].visible = false;
                        this["groupItemRight" + (i + 1)].visible = false;
                    }
                }
            }
            else {
                this.imgGetOrLoseLeft.visible = false;
                this.imgGetOrLoseRight.visible = false;
            }
        };
        WonderlandFastBattleItem.prototype.getGeneralPower = function (generalList) {
            var generalPowerSub = 0;
            for (var k in generalList) {
                if (generalList.hasOwnProperty(k)) {
                    var v = generalList[k];
                    generalPowerSub = generalPowerSub + v.battleValue;
                }
            }
            return generalPowerSub;
        };
        WonderlandFastBattleItem.prototype.onBtnOpen = function () {
            var _this = this;
            zj.loadUI(zj.LeagueWarPop)
                .then(function (dialog) {
                dialog.show();
                dialog.PlayReport(_this.data.info);
            });
        };
        return WonderlandFastBattleItem;
    }(eui.ItemRenderer));
    zj.WonderlandFastBattleItem = WonderlandFastBattleItem;
    __reflect(WonderlandFastBattleItem.prototype, "zj.WonderlandFastBattleItem");
    var WonderlandFastBattleItemData = (function () {
        function WonderlandFastBattleItemData() {
        }
        return WonderlandFastBattleItemData;
    }());
    zj.WonderlandFastBattleItemData = WonderlandFastBattleItemData;
    __reflect(WonderlandFastBattleItemData.prototype, "zj.WonderlandFastBattleItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WonderlandFastBattleItem.js.map