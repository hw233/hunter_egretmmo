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
     * @date 2019-2-26
     *
     * @class 查看猎人详情-查看猎人信息界面
     */
    var HeroDetailMain = (function (_super) {
        __extends(HeroDetailMain, _super);
        function HeroDetailMain() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/HeroDetailMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listAttribute.itemRenderer = zj.HeroDetailMainItem;
            return _this;
        }
        HeroDetailMain.prototype.setInfo = function (info, cb) {
            var values = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(info)[0];
            var serverInfo = zj.Helper.AttriConvertTbl(info.attri);
            var array = new eui.ArrayCollection();
            var _loop_1 = function (i) {
                var v = zj.TableEnum.EnumHunterAttriReal[i];
                var b_percent = zj.Table.FindF(zj.TableEnum.EnumHunterAttriPercent, function (_, v) {
                    return zj.TableEnum.EnumHunterAttriReal[i] == v;
                });
                var name_1 = zj.TextsConfig.TextsConfig_HeroMain.attr[v] + ":";
                if (b_percent) {
                    var value = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.test_specail_attri, Math.ceil(values[v - 1]), Math.ceil(serverInfo[v]));
                    array.addItem([name_1, value]);
                }
                else {
                    var value = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.test_attri, Math.ceil(values[v - 1]), Math.ceil(serverInfo[v]));
                    array.addItem([name_1, value]);
                }
            };
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriReal.length; i++) {
                _loop_1(i);
            }
            this.listAttribute.dataProvider = array;
        };
        HeroDetailMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HeroDetailMain;
    }(zj.Dialog));
    zj.HeroDetailMain = HeroDetailMain;
    __reflect(HeroDetailMain.prototype, "zj.HeroDetailMain");
})(zj || (zj = {}));
//# sourceMappingURL=HeroDetailMain.js.map