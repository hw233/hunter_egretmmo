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
    // 201901
    var Common_ChangeIconDialog = (function (_super) {
        __extends(Common_ChangeIconDialog, _super);
        function Common_ChangeIconDialog() {
            var _this = _super.call(this) || this;
            _this.COUNT_PER_ROW = 5;
            _this.CB = null;
            _this.picId = 0;
            _this.mapIndex = 0;
            _this.idMap = [];
            _this.vis = false;
            _this.skinName = "resource/skins/common/Common_ChangeIconDialogSkin.exml";
            _this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirm, _this);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            Common_ChangeIconDialog.index = 1;
            Common_ChangeIconDialog.picType1 = null;
            zj.Game.EventManager.on("COMMON_CHANGE_ICON_SETPICID", _this.setPicId, _this);
            return _this;
        }
        Common_ChangeIconDialog.prototype.setCB = function (cb) {
            this.CB = cb;
        };
        Common_ChangeIconDialog.prototype.loadList = function (picType) {
            Common_ChangeIconDialog.picType1 = picType;
            if (picType == zj.TableEnum.TableIconListState.LEAGUE) {
                this.loadListLEAGUE();
            }
            this.focisCur = 1;
            this.focusLast = this.focisCur;
        };
        Common_ChangeIconDialog.prototype.itemRendererFunction = function (source) {
            if (source.listType == "title") {
                if (zj.PlayerItemSystem.GetNormalPic(3).length != 0) {
                    return zj.Common_ChangeIconTitleIR;
                }
                else {
                    return zj.Common_ChangeIconNoneIR;
                }
            }
            else if (source.listType == "content") {
                return zj.Common_ChangeIconContentIR;
            }
        };
        Common_ChangeIconDialog.prototype.itemRendererFunction1 = function (source) {
            if (source.listType == "1") {
                return zj.Common_ChangeIconTitleIR;
            }
            else if (source.listType == "2") {
                return zj.Common_ChangeIconNoneIR;
            }
            else if (source.listType == "3") {
                return zj.Common_ChangeIconContentIR;
            }
        };
        Common_ChangeIconDialog.prototype.loadListLEAGUE = function () {
            this.lbTipUser.visible = false;
            this.lbTipLeague.visible = false;
            var picIdsNormal = zj.PlayerItemSystem.GetNormalPic(3);
            var arrayCollection = new eui.ArrayCollection();
            arrayCollection.addItem({ "listType": "title", "iconType": zj.TableEnum.TableIconListState.LEAGUE, "titleType": 1 });
            var index1 = 0;
            for (var i = 0; i < Math.ceil(picIdsNormal.length / this.COUNT_PER_ROW); i++) {
                var num = (i + 1) * this.COUNT_PER_ROW;
                if (num <= picIdsNormal.length) {
                    var arr = [];
                    var indexArr = [];
                    for (var j = 0; j < this.COUNT_PER_ROW; j++) {
                        var index = i * 5 + j;
                        arr.push(picIdsNormal[index]);
                        indexArr.push(index1 += 1);
                    }
                    arrayCollection.addItem({ "listType": "content", "iconType": zj.TableEnum.TableIconListState.LEAGUE, "picIds": arr, "index": indexArr, "father": this, "i": i });
                }
                else {
                    var arr = [];
                    var indexArr = [];
                    for (var j = 0; j < num - picIdsNormal.length; j++) {
                        var index = i * 5 + j;
                        arr.push(picIdsNormal[index]);
                        indexArr.push(index1 += 1);
                    }
                    arrayCollection.addItem({ "listType": "content", "iconType": zj.TableEnum.TableIconListState.LEAGUE, "picIds": arr, "index": indexArr, "father": this, "i": i });
                }
            }
            this.lstIconStyle.itemRendererFunction = this.itemRendererFunction;
            this.lstIconStyle.dataProvider = arrayCollection;
        };
        Common_ChangeIconDialog.prototype.setPicId = function (ev) {
            this.picId = ev.data;
        };
        Common_ChangeIconDialog.prototype.onBtnConfirm = function () {
            if (this.CB != null)
                this.CB(this.picId);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_ChangeIconDialog.prototype.onBtnClose = function () {
            if (this.CB != null)
                this.CB(0);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_ChangeIconDialog.prototype.FreshFocus = function (index, id, vis) {
            this.idRet = id;
            this.vis = vis;
        };
        Common_ChangeIconDialog.index = 1;
        return Common_ChangeIconDialog;
    }(zj.Dialog));
    zj.Common_ChangeIconDialog = Common_ChangeIconDialog;
    __reflect(Common_ChangeIconDialog.prototype, "zj.Common_ChangeIconDialog");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ChangeIconDialog.js.map