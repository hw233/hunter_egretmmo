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
    // yuqingchao
    // 许愿屋---抽取成功--item
    // 2019 05 14
    var ACtivityXuyuanPopItem = (function (_super) {
        __extends(ACtivityXuyuanPopItem, _super);
        function ACtivityXuyuanPopItem() {
            var _this = _super.call(this) || this;
            _this.info = null;
            _this.displayAnimatoin = null;
            _this.skinName = "resource/skins/activity/ActivityXuyuanPopItemSkin.exml";
            zj.cachekeys(zj.UIResource["ACtivityXuyuanPopItem"], null);
            _this.groupShow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            _this.groupMain.alpha = 1;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                var displayAnimatoin = _this.displayAnimatoin;
                _this.displayAnimatoin = null;
                if (displayAnimatoin && displayAnimatoin.parent) {
                    displayAnimatoin.parent.removeChild(displayAnimatoin);
                }
            }, null);
            return _this;
        }
        ACtivityXuyuanPopItem.prototype.SetInfo = function (index, goods, father) {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.info = goods;
            if (zj.PlayerItemSystem.ItemType(goods.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.SetInfoHero(goods);
            }
            else {
                this.SetInfoItem(goods);
            }
            if (this.isImgMask(goods.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            this.daojuguangAnimatoin();
        };
        //添加龙骨动画背景发光
        ACtivityXuyuanPopItem.prototype.daojuguangAnimatoin = function () {
            if (zj.PlayerItemSystem.ItemQuality(this.info.goodsId) >= 5) {
                this.displayAnimatoin = null;
                this.addBackdropAnimatoin("ui_wawaji02_eff", null, "002_daojuguang_01", 0, this.groupAni);
            }
            else if (zj.PlayerItemSystem.ItemQuality(this.info.goodsId) == 4) {
                this.displayAnimatoin = null;
                this.addBackdropAnimatoin("ui_wawaji02_eff", null, "004_daojuguang_03", 0, this.groupAni);
            }
            else { }
        };
        ACtivityXuyuanPopItem.prototype.addBackdropAnimatoin = function (dbName, armatureName, animationName, playTimes, group) {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
                _this.displayAnimatoin = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        ACtivityXuyuanPopItem.prototype.SetInfoHero = function (goods) {
            var itemSet = zj.PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelTextNum.text = "x" + goods.count;
        };
        ACtivityXuyuanPopItem.prototype.SetInfoItem = function (goods) {
            var itemSet = zj.PlayerItemSystem.Set(goods.goodsId, 1, goods.count);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.labelTextNum.text = "x" + goods.count;
        };
        // 物品遮罩
        ACtivityXuyuanPopItem.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        ACtivityXuyuanPopItem.prototype.onShowGoodProperty = function (e) {
            var info = new message.GoodsInfo();
            info.goodsId = this.info.goodsId;
            info.count = this.info.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.info, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return ACtivityXuyuanPopItem;
    }(eui.ItemRenderer));
    zj.ACtivityXuyuanPopItem = ACtivityXuyuanPopItem;
    __reflect(ACtivityXuyuanPopItem.prototype, "zj.ACtivityXuyuanPopItem");
})(zj || (zj = {}));
//# sourceMappingURL=ACtivityXuyuanPopItem.js.map