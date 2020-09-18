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
     * @author chen xi
     *
     * @date 2018-12-1
     *
     * @class 长按显示英雄详细介绍
     */
    var Common_ViewHeroDetail = (function (_super) {
        __extends(Common_ViewHeroDetail, _super);
        function Common_ViewHeroDetail() {
            var _this = _super.call(this) || this;
            _this.cardListData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/common/Common_ViewHeroDetailSkin.exml";
            // this.middleNode.cacheAsBitmap = true;
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.rightNode.visible = false;
                _this.backdrop.width = 430;
                _this.btnClose.x = 380;
            }
            return _this;
        }
        Common_ViewHeroDetail.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeSkill, this);
            this.hunterList.itemRenderer = zj.Common_ViewHeroDetailItem;
            this.cardList.itemRenderer = zj.Common_PlayerItemCard;
            this.cardList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardListTap, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.cb) {
                    _this.cb();
                }
            }, this);
        };
        Common_ViewHeroDetail.prototype.setInfo = function (generalId, cb) {
            this.generalId = generalId;
            this.setLabelInfo();
            this.setSkillInfo();
            this.setCardInfo();
            this.cb = cb;
        };
        Common_ViewHeroDetail.prototype.setLabelInfo = function () {
            var tableInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            var level = hunterInfo.level;
            var name = tableInfo.general_name;
            // let step = PlayerHunterSystem.GetStep(this.generalId).name;
            this.labelName.textColor = zj.Helper.GetStepColor(hunterInfo.step);
            this.labelName.text = "Lv." + String(level) + " " + name; //+ step;
            this.labelPower.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_result_power, zj.Set.NumberUnit3(hunterInfo.battleValue));
            var info = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(hunterInfo)[0];
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriShow.length; i++) {
                var v = zj.TableEnum.EnumHunterAttriShow[i];
                var str = String(Math.ceil(info[v - 1]));
                if (i > 3) {
                    str += "%";
                }
                var label = this.middleNode.getChildByName("labelCurrentAttribute" + String(i + 1));
                label.text = zj.TextsConfig.TextsConfig_HeroMain.attr[v] + ": " + str;
            }
            var attriInfo = zj.PlayerHunterSystem.HXHCalcGelOtherAttrToShow(hunterInfo);
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriShow.length; i++) {
                var v = zj.TableEnum.EnumHunterAttriShow[i];
                var str = "+" + String(Math.ceil(attriInfo[v - 1]));
                if (i > 3) {
                    str += "%";
                }
                var label = this.middleNode.getChildByName("labelNextAttribute" + String(i + 1));
                label.text = str;
            }
            var path = "ui_hunter_OrnLine_png";
            for (var i = 1; i <= 4; i++) {
                this["labelLine" + i].source = zj.cachekey(path, this);
            }
        };
        Common_ViewHeroDetail.prototype.setSkillInfo = function () {
            var tableInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (hunterInfo == null) {
                zj.toast(String(this.generalId) + "is null");
                return;
            }
            var collectionData = new eui.ArrayCollection();
            // 自动技、手动技
            for (var i = 0; i < tableInfo.skill_ids.length; i++) {
                var v = tableInfo.skill_ids[i];
                var data = new zj.Common_ViewHeroDetailItemData();
                data.index = i;
                data.skillId = v;
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }
            // 被动技
            if (tableInfo.init_passive[0] != 0) {
                var data = new zj.Common_ViewHeroDetailItemData();
                data.index = 3;
                data.skillId = tableInfo.init_passive[0];
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }
            // 主动技
            if (tableInfo.awake_passive != 0) {
                var data = new zj.Common_ViewHeroDetailItemData();
                data.index = 4;
                data.skillId = tableInfo.awake_passive;
                data.generalId = this.generalId;
                data.father = this;
                collectionData.addItem(data);
            }
            this.hunterList.dataProvider = collectionData;
        };
        Common_ViewHeroDetail.prototype.showSkill = function (data, index, level, cx) {
            var _this = this;
            zj.loadUI(zj.Common_DesSkill).then(function (desSkill) {
                // 1. adjust coordinate
                desSkill.y = _this.nodeLeft.height - _this.hunterList.height - desSkill.height;
                var itemWidth = _this.hunterList.width / 4;
                cx = _this.hunterList.parent.x + itemWidth * (index + 0.5) - desSkill.width * 0.5;
                if (cx < 0) {
                    cx = 0;
                }
                desSkill.x = cx;
                // 2. set data
                if (data.index == 3 || data.index == 4) {
                    // this.desSkill.setInfoLevelSkill(data.skillId, data.generalId, data.index, level);
                    desSkill.setInfoTalent(data.skillId, data.index - 1);
                }
                else {
                    desSkill.setInfoSkill(data.skillId, data.index, level);
                }
                // 3. add to node
                desSkill.name = "CommonViewHeroDetailDesSkill";
                _this.nodeLeft.addChild(desSkill);
            });
        };
        Common_ViewHeroDetail.prototype.removeSkill = function () {
            var obj = this.nodeLeft.getChildByName("CommonViewHeroDetailDesSkill");
            if (obj)
                this.nodeLeft.removeChild(obj);
        };
        Common_ViewHeroDetail.prototype.setCardInfo = function () {
            // the following code snippet is same as the HunterCardMainItem.ts
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var cardMap = zj.PlayerHunterSystem.GetHunterCardMap(this.generalId);
            this.cardListData.removeAll();
            for (var i = 0; i < 9; i++) {
                var data = new zj.Common_PlayerItemCardData();
                data.generalId = this.generalId;
                data.cardType = baseGeneralInfo.card_type[i];
                data.cardLevel = baseGeneralInfo.card_level[i];
                data.cardInfo = cardMap[i + 1];
                data.father = this;
                this.cardListData.addItem(data);
            }
            this.cardList.dataProvider = this.cardListData;
        };
        Common_ViewHeroDetail.prototype.onCardListTap = function (e) {
            var data = this.cardListData.getItemAt(e.itemIndex);
            if (!data)
                return;
            if (data.cardInfo == undefined || data.cardInfo == null) {
                return;
            }
            zj.loadUI(zj.PlayerCardPopDialog)
                .then(function (dialog) {
                dialog.loadGet(data.cardInfo);
                dialog.show();
            });
        };
        Common_ViewHeroDetail.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            // loadUI(CommonFormatePveMain)
            //     .then((dialog: CommonFormatePveMain) => {
            //         //dialog.show(UI.SHOW_FROM_TOP);
            //         dialog.onAddToStage();
            //         dialog.setInfo(1);
            //     });
        };
        return Common_ViewHeroDetail;
    }(zj.Dialog));
    zj.Common_ViewHeroDetail = Common_ViewHeroDetail;
    __reflect(Common_ViewHeroDetail.prototype, "zj.Common_ViewHeroDetail");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ViewHeroDetail.js.map