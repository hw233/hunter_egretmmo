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
     * 日常--奖励Item
     * created by lian lei
     * 2019.03.16
     */
    var Daily_AwardItem = (function (_super) {
        __extends(Daily_AwardItem, _super);
        function Daily_AwardItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/daily/Daily_AwardItemSkin.exml";
            _this.groupHead.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchShow, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveDialog, _this);
            zj.cachekeys(zj.UIResource["Daily_AwardItem"], null);
            _this.init();
            return _this;
        }
        Daily_AwardItem.prototype.init = function () {
            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupAnimate.addChild(this.imgMask);
            this.imgMask.visible = false;
            // 徽章遮罩
            this.rectMask = zj.Util.getMaskImgBlack(30, 30);
            this.rectMask.horizontalCenter = -1;
            this.rectMask.verticalCenter = 0;
            this.groupAnimate.addChild(this.rectMask);
            this.rectMask.visible = false;
            zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, this);
        };
        Daily_AwardItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Daily_AwardItem.prototype.updateView = function (data) {
            this.goodsId = data.goodsId;
            this.count = data.count;
            this.type = this.data.type;
            if (data.goodsId == 0) {
                this.imgIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Role.daily_live, this);
                this.labelNum.text = ("x" + data.count);
                this.imgLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
                this.imgFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.itemFrame[0], this);
            }
            else {
                var itemSet = zj.PlayerItemSystem.Set(data.goodsId, null, data.count);
                var strCount = zj.Set.NumberUnit2(data.count);
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.labelNum.text = ("x" + strCount);
                this.imgLogo.source = zj.cachekey(itemSet.Logo, this);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            }
            // 遮罩
            this.imgMask.visible = false;
            this.rectMask.visible = false;
            this.imgIcon.mask = null;
            if (zj.PlayerItemSystem.IsImgMask(this.goodsId)) {
                this.imgMask.visible = true;
                this.imgMask.width = 32;
                this.imgMask.height = 40;
                this.imgIcon.mask = this.imgMask;
            }
            else if (zj.PlayerItemSystem.IsRectMask(this.goodsId)) {
                this.rectMask.visible = true;
                this.rectMask.width = 32;
                this.rectMask.height = 40;
                this.imgIcon.mask = this.rectMask;
            }
        };
        Daily_AwardItem.prototype.onTouchShow = function (e) {
            if (egret.getQualifiedClassName(this.data.father) == "zj.Daily_AchieveItem" && this.data.father['imgGet'].visible)
                return;
            var newThis = this;
            var touchX = e.stageX;
            var groupY;
            var groupX;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            if (e.stageY >= this.data.Ffather.groupAddDialog.height / 2) {
                groupY = e.stageY - e.localY - this.data.father.height / 2;
                type = 1;
            }
            else {
                groupY = e.stageY + e.localY - this.data.father.height / 2 - 20;
            }
            if (e.stageX >= zj.UIManager.StageWidth - 240) {
                groupX = zj.UIManager.StageWidth - 240;
            }
            else {
                groupX = touchX;
            }
            if (this.goodsId == 0) {
                return;
            }
            var _type = zj.PlayerItemSystem.ItemType(this.goodsId);
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                    dialog.name = "award";
                    dialog.x = groupX - dialog.width;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, newThis.count);
                    newThis.data.Ffather.groupAddDialog.addChild(dialog);
                });
            }
            else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                    dialog.name = "award";
                    dialog.x = groupX - dialog.width;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.setInfo(newThis.goodsId, newThis.count);
                    newThis.data.Ffather.groupAddDialog.addChild(dialog);
                });
            }
            else {
                zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                    dialog.name = "award";
                    dialog.x = groupX - dialog.width;
                    if (type == 1) {
                        dialog.y = groupY - dialog.height;
                    }
                    else {
                        dialog.y = groupY;
                    }
                    dialog.init(newThis.goodsId, newThis.count);
                    newThis.data.Ffather.groupAddDialog.addChild(dialog);
                });
            }
        };
        Daily_AwardItem.prototype.onRemoveDialog = function () {
            this.data.Ffather.onRemoveDialog();
        };
        return Daily_AwardItem;
    }(eui.ItemRenderer));
    zj.Daily_AwardItem = Daily_AwardItem;
    __reflect(Daily_AwardItem.prototype, "zj.Daily_AwardItem");
    var Daily_AwardItemData = (function () {
        function Daily_AwardItemData() {
            this.CurState = {
                /**日常 */
                daily_live: 1,
                /**成就 */
                daily_achieve: 2,
                /** */
                daily_task: 3
            };
        }
        return Daily_AwardItemData;
    }());
    zj.Daily_AwardItemData = Daily_AwardItemData;
    __reflect(Daily_AwardItemData.prototype, "zj.Daily_AwardItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_AwardItem.js.map