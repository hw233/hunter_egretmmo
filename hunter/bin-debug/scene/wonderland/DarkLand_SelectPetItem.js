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
     * @class 黑暗大陆更换宠物形象 Item
     *
     * @author LianLei
     *
     * 2019.05.31
     */
    var DarkLand_SelectPetItem = (function (_super) {
        __extends(DarkLand_SelectPetItem, _super);
        function DarkLand_SelectPetItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/DarkLand_SelectPetItemSkin.exml";
            zj.cachekeys(zj.UIResource["DarkLand_SelectPetItem"], null);
            _this.init();
            return _this;
        }
        DarkLand_SelectPetItem.prototype.init = function () {
            this.groupNotCall.visible = false;
        };
        DarkLand_SelectPetItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        DarkLand_SelectPetItem.prototype.updateView = function (data) {
            var _this = this;
            this.imgSelect.visible = false;
            if (this.selected) {
                this.imgSelect.visible = true;
            }
            else {
                this.imgSelect.visible = false;
            }
            var petInfo = zj.PlayerAdviserSystem.PetBase(data.info.pet_id);
            var spineId = zj.PlayerAdviserSystem.GetPetEvolution(data.info.pet_id, data.info);
            if (spineId != null) {
                var spineMap = zj.TableClientAniSpineSource.Table();
                var spineName = spineMap[spineId].atlas;
                var aniName = spineMap[spineId].ani_name;
                this.groupImage.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0).then(function (display) {
                    display.x = _this.groupImage.explicitWidth / 2;
                    display.y = _this.groupImage.explicitHeight;
                    display.scaleX = 0.6;
                    display.scaleY = 0.6;
                    _this.groupImage.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
            }
            this.imgYincang.visible = (data.info.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION);
            if (data.info.star == 0) {
                this.groupNotCall.visible = true;
            }
        };
        return DarkLand_SelectPetItem;
    }(eui.ItemRenderer));
    zj.DarkLand_SelectPetItem = DarkLand_SelectPetItem;
    __reflect(DarkLand_SelectPetItem.prototype, "zj.DarkLand_SelectPetItem");
    var DarkLand_SelectPetItemData = (function () {
        function DarkLand_SelectPetItemData() {
        }
        return DarkLand_SelectPetItemData;
    }());
    zj.DarkLand_SelectPetItemData = DarkLand_SelectPetItemData;
    __reflect(DarkLand_SelectPetItemData.prototype, "zj.DarkLand_SelectPetItemData");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLand_SelectPetItem.js.map