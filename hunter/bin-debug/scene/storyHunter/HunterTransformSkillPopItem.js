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
    // HXH_HunterTransformSkillPopItem
    // wangshenzhuo
    // 2019-07-18
    var HunterTransformSkillPopItem = (function (_super) {
        __extends(HunterTransformSkillPopItem, _super);
        function HunterTransformSkillPopItem() {
            var _this = _super.call(this) || this;
            _this.generalId = 0;
            _this.staticGeneralId = 0;
            _this.skinName = "resource/skins/storyHunter/HunterTransformSkillPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterTransformSkillPopItem"], null);
            _this.groupHave.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClick, _this);
            _this.transferTab = zj.TableGeneralTransfer.Table();
            _this.init();
            return _this;
        }
        HunterTransformSkillPopItem.prototype.init = function () {
            this.focus = false;
            this.defenceType = 0;
            this.imageBigon.visible = false;
            this.imageShadow.visible = false;
            this.imageLock.visible = false;
        };
        HunterTransformSkillPopItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.generalItemInfo = this.data.info;
            if (typeof (this.data.info) == "number") {
                this.info = this.data.info;
            }
            else {
                this.info = this.data.info;
                this.generalId = this.data.info.general_id;
                this.staticGeneralId = this.data.info.staticGeneralId;
            }
            this.level = this.data.level;
            //判断是否选中
            var have_break = zj.Table.FindF(zj.PlayerHunterSystem.breakSelectedGenerals, function (k, v) {
                return v == this.index;
            });
            this.imageBigon.visible = this.focus || have_break;
            //判断是否有满足的猎人
            var level = this.level;
            this.SetHunterInfo();
            var star = 99;
            var transferTbl = zj.TableGeneralTransfer.Table();
            if (this.index != 1) {
                var cardInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalId];
                var path_head = zj.PlayerHunterSystem.Head(this.generalId);
                this.imageIcon.source = zj.cachekey(path_head, this);
            }
            else {
                var newGeneralId = zj.PlayerHunterSystem.replaceGeneralID(this.info);
                level = transferTbl[this.info].general_level;
                star = transferTbl[this.info].general_star;
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Trans.transformCondition, star, level);
                var info_gnr = zj.PlayerHunterSystem.Table(this.info);
                var info_map = zj.TableMapRole.Item(info_gnr.general_roleId);
                var path_head = info_map.head_path;
                this.labelMeterialsTip.text = str;
                this.groupNo.visible = true;
                this.groupHave.visible = false;
                this.imageIcon.source = zj.cachekey(path_head, this);
            }
            if (this.index == 1) {
                this.groupNo.visible = true;
                this.groupHave.visible = false;
            }
            else {
                this.groupNo.visible = false;
                this.groupHave.visible = true;
            }
            if (this.index == 1) {
                if (typeof (this.data.info) == "number") {
                    var newGeneralId = zj.PlayerHunterSystem.replaceGeneralID(this.info);
                    var info_gnr = zj.PlayerHunterSystem.Table(this.info);
                    this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Trans.transformName, info_gnr.general_name);
                }
                else {
                    var dex = zj.TextsConfig.TextsConfig_Hunter_Trans.transformCondition;
                    this.labelNoMet.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Break.hunterMet, zj.PlayerHunterSystem.Table(this.generalId).general_name);
                }
            }
        };
        HunterTransformSkillPopItem.prototype.SetHunterInfo = function () {
            var star = 1;
            var newGeneralId = 1;
            var transferTbl;
            if (typeof (this.info) == "number") {
                transferTbl = zj.TableGeneralTransfer.Table();
                var transferTabInfo = zj.TableGeneralTransfer.Item(this.info);
                star = transferTabInfo.general_star;
                newGeneralId = this.info;
            }
            else {
                star = this.generalItemInfo.star;
                newGeneralId = this.info.general_id;
            }
            var path_aptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(newGeneralId).aptitude];
            this.imageHeroGrade.visible = true;
            this.imageHeroGrade.source = zj.cachekey(path_aptitude, this);
            if (this.index != 1) {
                var path_fram = zj.PlayerHunterSystem.Frame(this.generalItemInfo.general_id);
                this.imageFrame.source = zj.cachekey(path_fram, this);
            }
            if (this.index == 1) {
                this.groupNo.visible = true;
                this.groupHave.visible = false;
                this.labelItemNum.visible = false;
            }
            else {
                var general = zj.Game.PlayerHunterSystem.queryHunter(this.generalItemInfo.general_id);
                var battleValue = general.battleValue;
                var cardNum = general.potatoInfo.length;
                this.lebelMeterialsPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.battleValue, zj.Set.NumberUnit3(battleValue));
                this.labelMeterialsNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Compound.cardNum, cardNum);
                this.groupNo.visible = false;
                this.groupHave.visible = true;
                zj.Helper.SetHeroAwakenStar(this.groupStar, this.info.star, this.info.awakePassive.level);
                this.labelItemNum.text = this.info.level;
                this.imageLock.visible = general.is_ware;
                this.imageShadow.visible = general.is_ware;
            }
        };
        HunterTransformSkillPopItem.prototype.onButtonClick = function () {
            if (zj.PlayerHunterSystem.transformSel != 1) {
                if (zj.PlayerHunterSystem.transformSel == this.generalItemInfo.general_id) {
                    zj.PlayerHunterSystem.transformSel = 1;
                    this.imageBigon.visible = false;
                }
                else {
                    return zj.toast_success(zj.TextsConfig.TextsConfig_Hunter_Trans.transformEnough);
                }
            }
            else {
                this.imageBigon.visible = true;
                zj.PlayerHunterSystem.transformSel = this.generalItemInfo.general_id;
            }
        };
        return HunterTransformSkillPopItem;
    }(eui.ItemRenderer));
    zj.HunterTransformSkillPopItem = HunterTransformSkillPopItem;
    __reflect(HunterTransformSkillPopItem.prototype, "zj.HunterTransformSkillPopItem");
    //子项数据源
    var HunterTransformSkillPopItemData = (function () {
        function HunterTransformSkillPopItemData() {
        }
        return HunterTransformSkillPopItemData;
    }());
    zj.HunterTransformSkillPopItemData = HunterTransformSkillPopItemData;
    __reflect(HunterTransformSkillPopItemData.prototype, "zj.HunterTransformSkillPopItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformSkillPopItem.js.map