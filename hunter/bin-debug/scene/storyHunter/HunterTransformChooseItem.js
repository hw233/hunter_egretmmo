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
    //HXH_HunterTransformChooseItem
    // wangshenzhuo
    // 2019-07-17
    var HunterTransformChooseItem = (function (_super) {
        __extends(HunterTransformChooseItem, _super);
        function HunterTransformChooseItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/HunterTransformChooseItemSkin.exml";
            zj.cachekeys(zj.UIResource["HunterTransformChooseItem"], null);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupMain, _this);
            return _this;
        }
        HunterTransformChooseItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            var baseInfo = zj.Game.PlayerHunterSystem.Table(this.info.general_id);
            var picTbl = zj.TableBaseGeneral.Table();
            var picRoleInfo = zj.PlayerHunterSystem.MapInstance(this.info.transfer_role);
            if (baseInfo.aptitude) {
                this.imageGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude], this);
                this.imageType1.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
                this.imageType.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type2[baseInfo.features], this);
            }
            this.imageFrameHunter.source = zj.cachekey(this.info.transfer_floor, this);
            this.imageHunterBottom.source = zj.cachekey(this.info.transfer_board, this);
            this.imageHunterName.source = zj.cachekey(this.info.name_pic, this);
            this.imageHunterIcon.source = zj.cachekey(picRoleInfo.half_path, this);
            this.SetTipsShow();
        };
        HunterTransformChooseItem.prototype.SetTipsShow = function () {
            var isEnough1 = false;
            var isEnough2 = false;
            var canTrans_list = zj.PlayerHunterSystem.getCanTransformHunter(this.info);
            if (canTrans_list.length > 0) {
                var transformTab = zj.TableGeneralTransfer.Table();
                for (var i = 0; i < 2; i++) {
                    var itemSetCount = zj.PlayerItemSystem.Count(transformTab[this.info.general_id].consume_goods[i][0]);
                    var needCount = transformTab[this.info.general_id].consume_goods[i][1];
                    if (itemSetCount >= needCount) {
                        if (i == 0) {
                            isEnough1 = true;
                        }
                        else {
                            isEnough2 = true;
                        }
                    }
                    if (isEnough1 && isEnough2) {
                        this.imageTipView.visible = true;
                    }
                    else {
                        this.imageTipView.visible = false;
                    }
                }
            }
            else {
                this.imageTipView.visible = false;
            }
        };
        HunterTransformChooseItem.prototype.onGroupMain = function () {
            var _this = this;
            zj.loadUI(zj.HunterTransformDetailsItem)
                .then(function (scene) {
                scene.SetInfo(_this.info);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return HunterTransformChooseItem;
    }(eui.ItemRenderer));
    zj.HunterTransformChooseItem = HunterTransformChooseItem;
    __reflect(HunterTransformChooseItem.prototype, "zj.HunterTransformChooseItem");
    //子项数据源
    var HunterTransformChooseItemData = (function () {
        function HunterTransformChooseItemData() {
        }
        return HunterTransformChooseItemData;
    }());
    zj.HunterTransformChooseItemData = HunterTransformChooseItemData;
    __reflect(HunterTransformChooseItemData.prototype, "zj.HunterTransformChooseItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformChooseItem.js.map