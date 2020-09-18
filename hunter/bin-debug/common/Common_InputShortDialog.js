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
    // 
    // lizhengqiang
    // 20190111
    var Common_InputShortDialog = (function (_super) {
        __extends(Common_InputShortDialog, _super);
        function Common_InputShortDialog() {
            var _this = _super.call(this) || this;
            _this.CB = null;
            _this.itemId = 0;
            _this.skinName = "resource/skins/common/Common_InputShortDialogSkin.exml";
            _this.btnRand.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRand, _this);
            _this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCancel, _this);
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOK, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.init();
            if (zj.Device.isReviewSwitch) {
                _this.imgProp.width = 40;
                _this.imgProp.height = 40;
                _this.imgProp.y = -5;
            }
            return _this;
        }
        Common_InputShortDialog.prototype.init = function () {
            this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
            this.textContent.textDisplay.textColor = 0x5A3722;
            this.textContent.promptDisplay.textColor = 0xB19782;
            this.textContent.inputType = egret.TextFieldType.INPUT;
            this.textContent.prompt = zj.TextsConfig.TextConfig_Input.commonShort;
        };
        Common_InputShortDialog.prototype.setCB = function (cb) {
            this.CB = cb;
        };
        Common_InputShortDialog.prototype.SetInfo = function (strTitle, itemId) {
            this.itemId = itemId;
            if (this.itemId != null) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.modify_name > 0) {
                    this.imgProp.visible = false;
                    this.lbProp.visible = true;
                    this.lbProp.text = zj.TextsConfig.TextConfig_League.freeName;
                }
                else {
                    if (this.itemId == message.EResourceType.RESOURCE_TOKEN) {
                        this.imgProp.visible = true;
                        this.lbProp.visible = true;
                        this.lbProp.text = "x" + zj.CommonConfig.modify_role_name_consume;
                    }
                    else {
                        this.imgProp.visible = true;
                        this.imgProp.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.itemId), this);
                        this.lbProp.visible = true;
                        this.lbProp.text = zj.PlayerItemSystem.Count(this.itemId).toString();
                    }
                }
            }
            else {
                this.imgProp.visible = false;
                this.lbProp.visible = false;
            }
            if (this.itemId == zj.CommonConfig.league_modify_name_prop_id && zj.Game.PlayerLeagueSystem.leagueInfo[0].info.modify_name > 0) {
                this.imgProp.visible = false;
                this.lbProp.visible = true;
                this.lbProp.text = zj.TextsConfig.TextConfig_League.freeName;
            }
        };
        Common_InputShortDialog.prototype.setLeagueInfo = function () {
            if (zj.Game.PlayerLeagueSystem.BaseInfo.modify_name > 0) {
                this.imgProp.visible = false;
                this.lbProp.visible = true;
                this.lbProp.text = zj.TextsConfig.TextConfig_League.freeName;
                var lbPropX = this.lbProp.x;
                this.lbProp.x = lbPropX - 40;
            }
            else {
                this.imgProp.visible = true;
                this.lbProp.visible = true;
                this.lbProp.text = "x" + zj.CommonConfig.modify_league_name_consume;
            }
        };
        Common_InputShortDialog.prototype.getRandomName = function () {
            var lastName = zj.Helper.GetRandItem(zj.TableClientRandomFamilyName.Table())["family_name"];
            var firstName = zj.Helper.GetRandItem(zj.TableClientRandomName.Table())["name"];
            return lastName + firstName;
        };
        Common_InputShortDialog.prototype.onBtnRand = function () {
            this.textContent.text = this.getRandomName();
        };
        Common_InputShortDialog.prototype.onBtnCancel = function () {
            this.onBtnClose();
        };
        Common_InputShortDialog.prototype.onBtnOK = function () {
            var _this = this;
            if (this.CB != null)
                this.CB(this.textContent.text, function () {
                    _this.close(zj.UI.HIDE_TO_TOP);
                });
        };
        Common_InputShortDialog.prototype.onBtnClose = function () {
            if (this.CB != null)
                this.CB(undefined, null);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_InputShortDialog.ID = "Common_InputShortDialog";
        return Common_InputShortDialog;
    }(zj.Dialog));
    zj.Common_InputShortDialog = Common_InputShortDialog;
    __reflect(Common_InputShortDialog.prototype, "zj.Common_InputShortDialog");
})(zj || (zj = {}));
//# sourceMappingURL=Common_InputShortDialog.js.map