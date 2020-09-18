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
     * @author chen xi.
     *
     * @date 2019-2-22
     *
     * @class 查看猎人详情
     */
    var CommonPlayer = (function (_super) {
        __extends(CommonPlayer, _super);
        function CommonPlayer() {
            var _this = _super.call(this) || this;
            _this.listHeroData = new eui.ArrayCollection();
            _this.listCardData = new eui.ArrayCollection();
            _this.currentSelectedHunterIndex = null;
            _this.canViewDetail = true;
            _this.skinName = "resource/skins/common/CommonPlayerSkin.exml";
            _this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnInfo, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listHero.itemRenderer = zj.CommonPlayerHunterItem;
            _this.listHero.dataProvider = _this.listHeroData;
            _this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListHeroTap, _this);
            _this.listCard.itemRenderer = zj.CommonPlayerCardItem;
            _this.listCard.dataProvider = _this.listCardData;
            _this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListCardTap, _this);
            return _this;
        }
        CommonPlayer.prototype.setInfo = function (msg, name, cb) {
            var data = msg.baseInfo;
            this.data = data;
            this.canViewDetail = msg.baseInfo.agree_detail;
            this.setPlayerInfo(data, name);
            this.setHeroList(msg.generals);
        };
        CommonPlayer.prototype.setPlayerInfo = function (data, name) {
            var framePath = zj.PlayerItemSystem.ItemPath(data.picFrameId);
            var iconPath = zj.PlayerItemSystem.ItemPath(data.picId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.labelNameLevel.text = data.name + " Lv" + data.level.toString();
            var title = zj.PlayerItemSystem.Title(data.titleId ? data.titleId : 140001);
            var titleString = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.title, title);
            this.labelTitle.text = titleString;
            var server = "";
            if (name == null) {
                server = zj.TextsConfig.TextsConfig_Chat.serverSelf;
            }
            else if (typeof name === "object") {
                server = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Login.serverDesSimple, name[0], name[1]);
            }
            else {
                server = name;
            }
            var serverString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.attack_info.server, server);
            this.labelServer.text = serverString;
            var ally = data.leagueName.length > 0 ? data.leagueName : zj.TextsConfig.TextsConfig_Rank.ally_no;
            this.labelAlly.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.leagueDes, ally);
            var allySprite = zj.PlayerLeagueSystem.GetSegment(data.matchScore)[4];
            if (allySprite == "ui_union_battle_star11_png") {
                allySprite = "";
            }
            this.imgAlly.source = zj.cachekey(allySprite, this);
        };
        CommonPlayer.prototype.setHeroList = function (generals) {
            generals.sort(zj.PlayerHunterSystem.SortGeneral);
            this.listHeroData.removeAll();
            for (var i = 0; i < generals.length; i++) {
                var data = new zj.CommonPlayerHunterItemData();
                var v = generals[i];
                data.info = v;
                data.isSelected = (i == 0);
                this.listHeroData.addItem(data);
            }
            this.currentSelectedHunterIndex = 0;
            var info = generals[this.currentSelectedHunterIndex];
            this.setHunterInfo(info);
            this.setHunterCardInfo(info);
        };
        CommonPlayer.prototype.onListHeroTap = function (e) {
            if (this.currentSelectedHunterIndex < 0 || this.currentSelectedHunterIndex == e.itemIndex)
                return;
            var lastData = this.listHeroData.getItemAt(this.currentSelectedHunterIndex);
            if (lastData) {
                lastData.isSelected = false;
                this.listHeroData.replaceItemAt(lastData, this.currentSelectedHunterIndex);
            }
            var data = this.listHeroData.getItemAt(e.itemIndex);
            data.isSelected = true;
            this.listHeroData.replaceItemAt(data, e.itemIndex);
            this.currentSelectedHunterIndex = e.itemIndex;
            this.setHunterInfo(data.info);
            this.setHunterCardInfo(data.info);
        };
        CommonPlayer.prototype.setHunterInfo = function (info) {
            var _this = this;
            this.labelPlayerPower.text = info.battleValue.toString();
            var baseHunterInfo = zj.PlayerHunterSystem.Table(info.general_id);
            var aptitudePath = zj.UIConfig.UIConfig_General.hunter_grade[baseHunterInfo.aptitude];
            var jobsPath = zj.UIConfig.UIConfig_General.hunter_type1[baseHunterInfo.type];
            this.imgAptitude.source = zj.cachekey(aptitudePath, this);
            this.imgJob.source = zj.cachekey(jobsPath, this);
            zj.Helper.SetHeroAwakenStar(this.groupStar, info.star, info.awakePassive.level);
            var strStep = zj.TableGeneralStep.Item(info.step).name;
            var name = (info.level > 0) ? zj.Helper.StringFormat("%s %s Lv%d", baseHunterInfo.general_name, strStep, info.level) : zj.Helper.StringFormat("%s", baseHunterInfo.general_name);
            this.labelName.text = name;
            var color = zj.Helper.GetStepColor(info.step);
            this.labelName.textColor = color;
            var _a = zj.PlayerHunterSystem.SpineID(info), spineId = _a[0], scale = _a[1];
            var spine = zj.TableClientFightAniSpineSource.Item(spineId);
            var obj = this.groupHero.getChildByName("common-player-hunter");
            if (obj)
                this.groupHero.removeChild(obj);
            zj.Game.DragonBonesManager.playAnimation(this, spine.json, null, spine.ani_name, 0).then(function (display) {
                if (scale != null) {
                    display.scaleX = scale;
                    display.scaleY = scale;
                }
                display.x = _this.groupHero.width * 0.5;
                display.y = _this.groupHero.height * 1;
                display.name = "common-player-hunter";
                _this.groupHero.addChild(display);
            });
            for (var _i = 0, _b = zj.HelpUtil.GetKV([]); _i < _b.length; _i++) {
                var _c = _b[_i], kk = _c[0], vv = _c[1];
            }
        };
        CommonPlayer.prototype.setHunterCardInfo = function (info) {
            var cardMap = info.potatoInfo;
            var baseHunterInfo = zj.PlayerHunterSystem.Table(info.general_id);
            this.listCardData.removeAll();
            for (var i = 0; i < zj.CommonConfig.general_max_card; i++) {
                var data = new zj.CommonPlayerCardItemData();
                var v = cardMap[i];
                if (v)
                    data.info = v;
                data.type = baseHunterInfo.card_type[i];
                data.level = baseHunterInfo.card_level[i];
                data.father = this;
                this.listCardData.addItem(data);
            }
        };
        CommonPlayer.prototype.onListCardTap = function (e) {
            var data = this.listCardData.getItemAt(e.itemIndex);
            if (data.info == null)
                return;
            if (!this.canViewDetail) {
                zj.TipManager.ShowCard(data.info);
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Common.detaillimit);
            }
        };
        CommonPlayer.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        CommonPlayer.prototype.onBtnInfo = function () {
            if (!this.canViewDetail) {
                var data = this.listHeroData.getItemAt(this.currentSelectedHunterIndex);
                zj.TipManager.ShowGeneralDetails(data.info);
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Common.detaillimit);
            }
        };
        return CommonPlayer;
    }(zj.Dialog));
    zj.CommonPlayer = CommonPlayer;
    __reflect(CommonPlayer.prototype, "zj.CommonPlayer");
})(zj || (zj = {}));
//# sourceMappingURL=CommonPlayer.js.map