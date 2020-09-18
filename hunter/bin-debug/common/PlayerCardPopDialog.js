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
    // created by hhh in 2018/11/19
    var PlayerCardPopDialog = (function (_super) {
        __extends(PlayerCardPopDialog, _super);
        function PlayerCardPopDialog() {
            var _this = _super.call(this) || this;
            _this.listAttriData = new eui.ArrayCollection();
            _this.confirmCB = null;
            _this.skinName = "resource/skins/common/PlayerCardPopDialogSkin.exml";
            _this.imageRect.alpha = 0;
            _this.init();
            return _this;
        }
        PlayerCardPopDialog.prototype.init = function () {
            this.labelMainAttriConst.text = zj.LANG("主属性：");
            this.labelDeputyAttriConst.text = zj.LANG("副属性：");
            this.labelRaityConst.text = zj.LANG("稀有度：");
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchClose, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveDialog, this);
            egret.Tween.get(this.imageRect)
                .to({ alpha: 0 }, 0);
            // .to({ alpha: 0.65 }, 300);
        };
        PlayerCardPopDialog.prototype.loadGet = function (info) {
            this.info = info;
            this.labelAttriMainFull.visible = false;
            this.setUI();
        };
        PlayerCardPopDialog.prototype.setUI = function () {
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
        PlayerCardPopDialog.prototype.setAttriUI = function () {
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curCard.star, this.curCard.level)[0];
            this.labelAttriMain.text = baseStr[0];
            var addStr = zj.PlayerCardSystem.GetAddStr(this.curCard);
            this.listAttriData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.cardInfo = this.info;
                itemData.width = this.scroAttri.width;
                itemData.addStrlength = addStr.length;
                itemData.type = 0;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.itemRenderer = zj.CardAttriItem;
        };
        PlayerCardPopDialog.prototype.loadNotGet = function (info, bShowPurple, cb) {
            if (bShowPurple === void 0) { bShowPurple = false; }
            this.info = info;
            this.purple = bShowPurple;
            this.callBack = cb;
            this.labelAttriMainFull.visible = true;
            this.setUINotGet();
        };
        PlayerCardPopDialog.prototype.setUINotGet = function () {
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
        PlayerCardPopDialog.prototype.setAttriUINotGet = function () {
            var baseStr = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curTbl.star, 1)[0];
            this.labelAttriMain.text = baseStr[0];
            var baseStrFullNum = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, zj.CommonConfig.card_max_star, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1])[1];
            this.labelAttriMainFull.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_full_attr, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0]);
            var addStr = zj.PlayerCardSystem.GetAddStrNotGet(this.curTbl);
            if (this.purple)
                addStr[0] = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_Card.unidTipes, 4);
            this.listAttriData.removeAll();
            for (var i = 0; i < addStr.length; i++) {
                var itemData = new zj.CardAttriItemData();
                itemData.index = i;
                itemData.info = addStr[i];
                itemData.width = this.scroAttri.width;
                itemData.type = 1;
                this.listAttriData.addItem(itemData);
            }
            this.listAttri.dataProvider = this.listAttriData;
            this.listAttri.itemRenderer = zj.CardAttriItem;
        };
        PlayerCardPopDialog.prototype.onTouchClose = function () {
            if (this.callBack) {
                this.callBack();
            }
            this.close();
        };
        PlayerCardPopDialog.prototype.setCB = function () {
            var _this = this;
            var a = function () {
                _this.close();
            };
            return a;
        };
        return PlayerCardPopDialog;
    }(zj.Dialog));
    zj.PlayerCardPopDialog = PlayerCardPopDialog;
    __reflect(PlayerCardPopDialog.prototype, "zj.PlayerCardPopDialog");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerCardPopDialog.js.map