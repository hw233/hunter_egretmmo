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
     * @date 2019-1-7
     */
    var HunterAwakenSelectDialogItem = (function (_super) {
        __extends(HunterAwakenSelectDialogItem, _super);
        function HunterAwakenSelectDialogItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/hunter/HunterAwakenSelectDialogItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterAwakenSelectDialogItem"], null);
            return _this;
        }
        HunterAwakenSelectDialogItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        HunterAwakenSelectDialogItem.prototype.updateView = function (data) {
            this.groupLock.visible = false;
            if (typeof data.info === "number") {
                if (data.info == -1) {
                    var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
                    if (baseGeneralInfo.aptitude == 13) {
                        zj.Set.ButtonBackgroud(this.btnGet, zj.UIConfig.UIConfig_Hunter.wanou[0], zj.UIConfig.UIConfig_Hunter.wanou[1], zj.UIConfig.UIConfig_Hunter.wanou[1]);
                    }
                }
                this.btnGet.visible = (data.info != 0);
                this.groupAll.visible = false;
                return;
            }
            this.groupAll.visible = true;
            this.imgBingo.visible = data.isSelected;
            var defenceTbl = zj.PlayerHunterSystem.GeneralsIdInDefence();
            var isDefence = zj.Table.FindF(defenceTbl, function (_, _v) {
                return _v[0] == data.info.general_id;
            });
            this.groupLock.visible = isDefence;
            var framePath, headPath;
            if (data.info instanceof message.GeneralInfo) {
                framePath = zj.PlayerHunterSystem.Frame(data.info.general_id);
                headPath = zj.PlayerHunterSystem.Head(data.info.general_id);
                this.groupStar.visible = true;
                this.labelLevel.visible = true;
                var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.info.general_id);
                this.labelLevel.text = hunterInfo.level.toString();
                zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            }
            else if (data.info instanceof Object) {
                var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
                var itemId = zj.CommonConfig.same_aptitude_doll[baseGeneralInfo.aptitude - 13];
                framePath = zj.PlayerItemSystem.ItemFrame(itemId);
                headPath = zj.PlayerItemSystem.ItemPath(itemId);
                this.groupStar.visible = false;
                this.labelLevel.visible = false;
            }
            else {
                throw Error("data info type error");
            }
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(headPath, this);
        };
        return HunterAwakenSelectDialogItem;
    }(eui.ItemRenderer));
    zj.HunterAwakenSelectDialogItem = HunterAwakenSelectDialogItem;
    __reflect(HunterAwakenSelectDialogItem.prototype, "zj.HunterAwakenSelectDialogItem");
    var HunterAwakenSelectDialogItemData = (function () {
        function HunterAwakenSelectDialogItemData() {
            this.isSelected = false;
        }
        return HunterAwakenSelectDialogItemData;
    }());
    zj.HunterAwakenSelectDialogItemData = HunterAwakenSelectDialogItemData;
    __reflect(HunterAwakenSelectDialogItemData.prototype, "zj.HunterAwakenSelectDialogItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterAwakenSelectDialogItem.js.map