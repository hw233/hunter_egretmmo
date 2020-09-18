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
    // created by yuqingchao in 2019/04/11
    var VipLowCard = (function (_super) {
        __extends(VipLowCard, _super);
        function VipLowCard() {
            var _this = _super.call(this) || this;
            _this.listAttriData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/common/PlayerCardPopDialogSkin.exml";
            _this.width = _this.skin.width * 1.2;
            _this.height = _this.skin.height * 1.2;
            _this.init();
            return _this;
        }
        VipLowCard.prototype.init = function () {
            this.labelMainAttriConst.text = zj.LANG("主属性：");
            this.labelDeputyAttriConst.text = zj.LANG("副属性：");
            this.labelRaityConst.text = zj.LANG("稀有度：");
            this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
        };
        VipLowCard.prototype.loadGet = function (info) {
            this.info = info;
            this.labelAttriMainFull.visible = false;
            this.setUI();
        };
        VipLowCard.prototype.setUI = function () {
            this.curCard = this.info;
            this.curTbl = zj.TableItemPotato.Item(this.curCard.id);
            var bigFramePic = zj.PlayerCardSystem.GetItemFrame(this.curCard.id)[1];
            this.labelCardNum.text = this.curTbl.num;
            this.labelCardName.text = this.curTbl.name;
            this.labelCardDetails.text = this.curTbl.des;
            this.labelLevel.text = this.curTbl.level;
            this.imageCard.source = zj.cachekey(this.curTbl.paths, this);
            this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.imageCardGrad.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);
            this.imageFrame.source = zj.cachekey(bigFramePic, this);
            if (this.curCard.add_attri.length + 1 == 5 && this.curCard.star < 6 || this.curCard.add_attri.length == 5 && this.curCard.star >= 6) {
                zj.Helper.SetStar(this.groupStar, this.curTbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
            }
            else {
                zj.Helper.SetStar(this.groupStar, this.curTbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }
            this.setAttriUI();
        };
        VipLowCard.prototype.setAttriUI = function () {
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curCard.star, this.curCard.level)[0];
            this.labelAttriMain.text = baseStr[0];
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard);
            this.listAttri.itemRenderer = zj.CardAttriItem;
            var collection = [];
            for (var i = 0; i < addStr.length; i++) {
                collection[i] = { type: 1, colorWhite: false, index: i, info: addStr[i], star: this.curTbl.star, length: addStr.length, width: this.scroAttri.width };
            }
            this.listAttri.dataProvider = new eui.ArrayCollection(collection);
        };
        VipLowCard.prototype.loadNotGet = function (info, bShowPurple, cb) {
            if (bShowPurple === void 0) { bShowPurple = false; }
            this.info = info;
            this.purple = bShowPurple;
            this.callBack = cb;
            this.labelAttriMainFull.visible = true;
            this.setUINotGet();
        };
        VipLowCard.prototype.setUINotGet = function () {
            this.curTbl = this.info;
            var _a = zj.PlayerCardSystem.GetItemFrame(this.info.id), _ = _a[0], bigFramePic = _a[1], __ = _a[2];
            this.labelCardNum.text = this.curTbl.num;
            this.labelCardName.text = this.curTbl.name;
            this.labelCardDetails.text = this.curTbl.des;
            this.labelLevel.text = "1";
            this.imageCard.source = zj.cachekey(this.curTbl.paths, this);
            this.imageCardType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1], this);
            this.imageCardGrad.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1], this);
            this.imageFrame.source = zj.cachekey(bigFramePic, this);
            if (this.purple) {
                zj.Helper.SetStar(this.groupStar, this.curTbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_Star_awaken, 0.7, 14);
            }
            else {
                zj.Helper.SetStar(this.groupStar, this.curTbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }
            this.setAttriUINotGet();
        };
        VipLowCard.prototype.setAttriUINotGet = function () {
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curTbl.star, 1)[0];
            this.labelAttriMain.text = baseStr[0];
            var baseStrFullNum = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, zj.CommonConfig.card_max_star, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1])[1];
            this.labelAttriMainFull.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_full_attr, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0]);
            var addStr = zj.PlayerCardSystem.GetAddStrNotGet(this.curTbl);
            if (this.purple)
                addStr[0] = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.unidTipes, 4);
            this.listAttri.itemRenderer = zj.CardAttriItem;
            var collection = [];
            for (var i = 0; i < addStr.length; i++) {
                collection[i] = { type: 4, colorWhite: false, index: i, info: addStr[i], star: this.curTbl.star, length: addStr.length, width: this.scroAttri.width };
            }
            this.listAttri.dataProvider = new eui.ArrayCollection(collection);
            // this.listAttriData.removeAll();
            // for (let i = 0; i < addStr.length; i++) {
            //     let v = addStr[i];
            //     let data = new HunterCardAttriItemData();
            //     data.index = i;
            //     data.description = v;
            //     data.fatherArray = addStr.length;
            //     data.cardInfo = this.info;
            //     data.width = this.groupAddAttri.width - 7;
            //     this.listAttriData.addItem(data);
            // }
            // this.listAttri.dataProvider = this.listAttriData;
            // this.listAttri.itemRenderer = HunterCardAttriItem;
        };
        VipLowCard.prototype.onTouchClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        VipLowCard.prototype.onRemoveDialog = function () {
            if (this.callBack) {
                this.callBack();
            }
        };
        return VipLowCard;
    }(zj.UI));
    zj.VipLowCard = VipLowCard;
    __reflect(VipLowCard.prototype, "zj.VipLowCard");
})(zj || (zj = {}));
//# sourceMappingURL=VipLowCard.js.map