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
     * @class 贪婪之岛更换猎人形象
     *
     * @author LianLei
     *
     * 2019.05.29
     */
    var Wonderland_SelectedImage = (function (_super) {
        __extends(Wonderland_SelectedImage, _super);
        function Wonderland_SelectedImage() {
            var _this = _super.call(this) || this;
            _this.listViewImageData = new eui.ArrayCollection();
            _this.focusCur = -1;
            _this.focusCurBefore = 0;
            _this.skinName = "resource/skins/wonderland/Wonderland_SelectedImageSkin.exml";
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listViewImage.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeList, _this);
            _this.loadList();
            return _this;
        }
        Wonderland_SelectedImage.prototype.loadList = function () {
            this.loadListGeneral();
        };
        Wonderland_SelectedImage.prototype.loadListGeneral = function () {
            var picIds_normal = zj.PlayerItemSystem.GetNormalPic(1);
            var picIds_other = zj.Table.DeepCopy(zj.Game.PlayerWonderLandSystem.otherAttri.picIds);
            var _loop_1 = function (kk, vv) {
                var find = zj.Table.FindF(picIds_normal, function (k, v) {
                    return v == vv;
                });
                if (!find) {
                    picIds_normal.push(vv);
                }
            };
            for (var _i = 0, _a = zj.HelpUtil.GetKV(picIds_other); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                _loop_1(kk, vv);
            }
            this.picIds = picIds_normal;
            this.SetReptition();
            this.listViewImageData.removeAll();
            for (var i = 0; i < this.picIds.length; i++) {
                var itemData = new zj.Wonderland_SelectedImageItemData();
                itemData.index = i;
                itemData.id = Number(this.picIds[i]);
                itemData.father = this;
                this.listViewImageData.addItem(itemData);
            }
            this.listViewImage.selectedIndex = 0;
            this.listViewImage.itemRenderer = zj.Wonderland_SelectedImageItem;
            this.listViewImage.dataProvider = this.listViewImageData;
        };
        Wonderland_SelectedImage.prototype.SetReptition = function () {
            var aa = {};
            var bb = [];
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.picIds); _i < _a.length; _i++) {
                var _b = _a[_i], kk = _b[0], vv = _b[1];
                if (aa[vv] == null && vv != zj.Game.PlayerInfoSystem.BaseInfo.picId) {
                    aa[vv] = vv;
                }
            }
            for (var _c = 0, _d = zj.HelpUtil.GetKV(aa); _c < _d.length; _c++) {
                var _e = _d[_c], kk = _e[0], vv = _e[1];
                bb.push(vv);
            }
            bb.sort(function (a, b) {
                return a - b;
            });
            bb.splice(0, 0, zj.Game.PlayerInfoSystem.BaseInfo.picId);
            this.picIds = bb;
        };
        Wonderland_SelectedImage.prototype.onChangeList = function (e) {
            if (e.itemIndex == this.focusCurBefore)
                return;
            var data = this.listViewImageData.getItemAt(e.itemIndex);
            var dataBefore = this.listViewImageData.getItemAt(this.focusCurBefore);
            this.listViewImage.selectedIndex = e.itemIndex;
            this.focusCur = this.listViewImage.selectedIndex;
            this.listViewImageData.replaceItemAt(data, e.itemIndex);
            this.listViewImageData.replaceItemAt(dataBefore, this.focusCurBefore);
            this.focusCurBefore = e.itemIndex;
        };
        Wonderland_SelectedImage.prototype.setCB = function (cb) {
            this.callBack = cb;
        };
        Wonderland_SelectedImage.prototype.onBtnOk = function () {
            if (this.callBack != null && this.focusCur != -1) {
                this.callBack(this.picIds[this.focusCur]);
                zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Wonderland_SelectedImage.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Wonderland_SelectedImage;
    }(zj.Dialog));
    zj.Wonderland_SelectedImage = Wonderland_SelectedImage;
    __reflect(Wonderland_SelectedImage.prototype, "zj.Wonderland_SelectedImage");
})(zj || (zj = {}));
//# sourceMappingURL=Wonderland_SelectedImage.js.map