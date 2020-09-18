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
    // 列表游戏分区的item reader
    // guoshanhe 创建于2018.11.15
    var GameGroupIR = (function (_super) {
        __extends(GameGroupIR, _super);
        function GameGroupIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/login/GameGroupIRSkin.exml";
            _this.btnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSelect, _this);
            return _this;
        }
        GameGroupIR.prototype.onBtnSelect = function () {
            //toast("item");
        };
        GameGroupIR.prototype.dataChanged = function () {
            this.imgRecommend.visible = this.data.is_recommend;
            this.imgInitialed.visible = this.data.is_initialed;
            this.imgClose.visible = false;
            this.imgBusy.visible = false;
            this.imgFull.visible = false;
            this.imgGood.visible = false;
            this.btnSelect.enabled = true;
            if (this.data.status == 4) {
                this.imgFull.visible = true;
            }
            else if (this.data.status == 3) {
                this.imgBusy.visible = true;
            }
            else if (this.data.status == 2) {
                this.imgGood.visible = true;
            }
            else {
                this.imgClose.visible = true;
                this.btnSelect.enabled = false;
            }
            this.lbGroupName.text = this.getGroupName(this.data.group_name);
            console.log("GameGroupIR dataChanged ", this.lbGroupName.text);
        };
        // 取出分区名
        GameGroupIR.prototype.getGroupName = function (group_name) {
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
        GameGroupIR.prototype.parseGroupName = function (groupName) {
            var names = groupName.split("&");
            if (names.length <= 1)
                return zj.Util.cutString(groupName, 16);
            return zj.Util.cutString(names[0] + "\u533A " + names[1], 16);
        };
        return GameGroupIR;
    }(eui.ItemRenderer));
    zj.GameGroupIR = GameGroupIR;
    __reflect(GameGroupIR.prototype, "zj.GameGroupIR");
})(zj || (zj = {}));
//# sourceMappingURL=GameGroupIR.js.map