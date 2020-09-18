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
    // lizhengqiang
    // 2018/12/06
    var CommonGetDialogItemIR = (function (_super) {
        __extends(CommonGetDialogItemIR, _super);
        function CommonGetDialogItemIR() {
            var _this = _super.call(this) || this;
            _this.i = 0;
            _this.skinName = "resource/skins/common/CommonGetDialogItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["CommonGetDialogItemIR"], null);
            _this.groupItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = new eui.Rect(73, 70, 0x000000);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupItem.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupItem.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            _this.groupAnimation.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(_this, "ui_tongyong_daojuguang", null, "001_daojuguang_02", 0)
                .then(function (display) {
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                _this.groupAnimation.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            return _this;
        }
        CommonGetDialogItemIR.prototype.dataChanged = function () {
            this.rectMaskCommon.visible = false;
            this.rectMask.visible = false;
            this.imgMask.visible = false;
            this.goods = this.data.info;
            this.i = this.data.index;
            this.father = this.data.father;
            var aniBoolean = this.data.aniBoolean;
            this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.Set(this.goods.goodsId, null, this.goods.count).Frame, this);
            this.imgIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.goods.goodsId), this);
            if (this.goods.count >= 100000) {
                this.lbCount.text = (this.goods.count / 10000) + "万";
            }
            else {
                this.lbCount.text = this.goods.count.toString();
            }
            this.lbName.text = zj.PlayerItemSystem.ItemConfig(this.goods.goodsId)["name"];
            this.lbPropID.text = zj.PlayerItemSystem.GoodsNumID(this.goods.goodsId);
            // 遮罩
            if (zj.PlayerItemSystem.IsImgMask(this.goods.goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(this.goods.goodsId)) {
                this.rectMask.visible = true;
                this.imgIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            this.groupAnimation.visible = false;
            if (aniBoolean && this.goods.goodsId != 20001) {
                this.groupAnimation.visible = true;
            }
            if (zj.PlayerItemSystem.ItemType(this.goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.reSetGeneral();
            }
            if (this.goods.goodsId == 20012) {
                this.imgFrame.source = zj.cachekey("ui_frame_FrameHunterUpStar_png", this);
            }
        };
        CommonGetDialogItemIR.prototype.reSetGeneral = function () {
            var info = zj.Otherdb.MissionGeneral(this.goods.goodsId);
            if (info == null) {
                return;
            }
            this.imgFrame.source = zj.cachekey(zj.TableGeneralStep.Item(info.step).frame_path, this);
        };
        CommonGetDialogItemIR.prototype.onShowGoodProperty = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY_1, { info: this.goods, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return CommonGetDialogItemIR;
    }(eui.ItemRenderer));
    zj.CommonGetDialogItemIR = CommonGetDialogItemIR;
    __reflect(CommonGetDialogItemIR.prototype, "zj.CommonGetDialogItemIR");
    //子项数据源
    var CommonGetDialogItemIRData = (function () {
        function CommonGetDialogItemIRData() {
        }
        return CommonGetDialogItemIRData;
    }());
    zj.CommonGetDialogItemIRData = CommonGetDialogItemIRData;
    __reflect(CommonGetDialogItemIRData.prototype, "zj.CommonGetDialogItemIRData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonGetDialogItemIR.js.map