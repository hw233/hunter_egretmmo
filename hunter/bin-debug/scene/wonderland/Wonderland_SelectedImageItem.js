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
     * @class 贪婪之岛更换猎人头像Item
     *
     * @author LianLei
     *
     * 2019.05.30
     */
    var Wonderland_SelectedImageItem = (function (_super) {
        __extends(Wonderland_SelectedImageItem, _super);
        function Wonderland_SelectedImageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/wonderland/Wonderland_SelectedImageItemSkin.exml";
            zj.cachekeys(zj.UIResource["Wonderland_SelectedImageItem"], null);
            return _this;
        }
        Wonderland_SelectedImageItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Wonderland_SelectedImageItem.prototype.updateView = function (data) {
            var _this = this;
            this.imgSelect.visible = false;
            if (this.selected) {
                this.imgSelect.visible = true;
            }
            else {
                this.imgSelect.visible = false;
            }
            var mapRole_id = zj.TableItemPic.Item(data.id).mapRole_id;
            var oneGeneral;
            for (var i = 0; i < zj.Game.PlayerHunterSystem.queryAllHunters().length; i++) {
                var v = zj.Game.PlayerHunterSystem.queryAllHunters()[i];
                if (zj.PlayerHunterSystem.GetGeneralId(v.general_id) == zj.TableItemPic.Item(data.id).match_general) {
                    oneGeneral = v;
                    break;
                }
            }
            if (oneGeneral != null) {
                var fashionId = oneGeneral.fashionId;
                mapRole_id = fashionId != 0 ? zj.PlayerHunterSystem.GetFahionInfo(fashionId).fashion_roleId : mapRole_id;
            }
            var bodySpxtbl = zj.TableMapRole.Item(mapRole_id);
            if (bodySpxtbl != null) {
                var bodySpxId = bodySpxtbl.body_spx_id;
                var scale_1 = bodySpxtbl.spine_scale;
                if (bodySpxId != -1) {
                    var spineMap = zj.TableClientFightAniSpineSource.Table();
                    var spineName = spineMap[bodySpxId].atlas;
                    var aniName = spineMap[bodySpxId].ani_name;
                    zj.Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0).then(function (display) {
                        display.x = _this.groupAddHero.explicitWidth / 2;
                        display.y = _this.groupAddHero.explicitHeight;
                        display.scaleX = scale_1;
                        display.scaleY = scale_1;
                        _this.groupAddHero.removeChildren();
                        _this.groupAddHero.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
            this.imgYincang.visible = (data.index == 0);
            // 光环设置
            var haloTbl = zj.PlayerVIPSystem.HaloItem(zj.Game.PlayerInfoSystem.BaseInfo.haloId);
            if (haloTbl != null) {
                var auraCssIdFront = haloTbl.halo_front_aniId;
                var auraCssIdBack = haloTbl.halo_back_aniId;
                var getAinmationInfo = function (id) {
                    var aniUi = zj.TableClientAniUi.Item(id);
                    var cssSource = zj.TableClientAniCssSource.Item(aniUi.css_id);
                    return [cssSource.name + "_" + cssSource.number, aniUi.index];
                };
                var back1 = getAinmationInfo(auraCssIdBack);
                var front1 = getAinmationInfo(auraCssIdFront);
                // 光环龙骨
                if (auraCssIdFront != null) {
                    zj.Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(function (display) {
                        display.x = _this.groupHaloFront.explicitWidth / 2;
                        display.y = _this.groupHaloFront.explicitHeight;
                        _this.groupHaloFront.removeChildren();
                        _this.groupHaloFront.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
                if (auraCssIdBack != null) {
                    zj.Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(function (display) {
                        display.x = _this.groupHaloBack.explicitWidth / 2;
                        display.y = _this.groupHaloBack.explicitHeight;
                        _this.groupHaloBack.removeChildren();
                        _this.groupHaloBack.addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                }
            }
        };
        return Wonderland_SelectedImageItem;
    }(eui.ItemRenderer));
    zj.Wonderland_SelectedImageItem = Wonderland_SelectedImageItem;
    __reflect(Wonderland_SelectedImageItem.prototype, "zj.Wonderland_SelectedImageItem");
    var Wonderland_SelectedImageItemData = (function () {
        function Wonderland_SelectedImageItemData() {
        }
        return Wonderland_SelectedImageItemData;
    }());
    zj.Wonderland_SelectedImageItemData = Wonderland_SelectedImageItemData;
    __reflect(Wonderland_SelectedImageItemData.prototype, "zj.Wonderland_SelectedImageItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Wonderland_SelectedImageItem.js.map