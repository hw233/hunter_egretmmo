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
    // 列表游戏角色的item reader
    // guoshanhe 创建于2018.11.15
    var GameRoleIR = (function (_super) {
        __extends(GameRoleIR, _super);
        function GameRoleIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/login/GameRoleIRSkin.exml";
            _this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelect, _this);
            return _this;
        }
        GameRoleIR.prototype.onBtnSelect = function () {
            //toast("item");
        };
        GameRoleIR.prototype.dataChanged = function () {
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgHeader.source = zj.cachekey("wx_" + zj.TableItemPic.Item(Number(this.data.role.role_features[0].value)).path, this);
            }
            else {
                this.imgHeader.source = zj.cachekey(zj.TableItemPic.Item(Number(this.data.role.role_features[0].value)).path, this);
            }
            this.imgFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(Number(this.data.role.role_features[1].value)).path, this);
            this.lbRoleName.text = this.data.role.role_name;
            this.lbGroupName.text = this.getGroupName(this.data.group.group_name);
            this.lbLevel.text = this.data.role.role_level + "";
            if (zj.Device.isReviewSwitch) {
                this.imgVIP.visible = false;
            }
            else {
                this.imgVIP.source = "ui_common_WordsVip" + this.data.role.role_vip + "_png";
            }
        };
        // 取出分区名
        GameRoleIR.prototype.getGroupName = function (group_name) {
            var json = JSON.parse(group_name);
            if (typeof json != "object")
                return this.parseGroupName(group_name);
            if (zj.Game.LanguageManager.getLang() in json)
                return this.parseGroupName(json[zj.Game.LanguageManager.getLang()]);
            if ('zhcn' in json)
                return this.parseGroupName(json['zhcn']);
            if ('en' in json)
                return this.parseGroupName(json['en']);
            for (var k in json) {
                return this.parseGroupName(json[k]);
            }
            return zj.LANG("未知分区");
        };
        // 解析分区名
        GameRoleIR.prototype.parseGroupName = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return zj.Util.cutString(groupName, 16);
            return zj.Util.cutString(names[0] + "\u533A " + names[1], 16);
        };
        return GameRoleIR;
    }(eui.ItemRenderer));
    zj.GameRoleIR = GameRoleIR;
    __reflect(GameRoleIR.prototype, "zj.GameRoleIR");
})(zj || (zj = {}));
//# sourceMappingURL=GameRoleIR.js.map