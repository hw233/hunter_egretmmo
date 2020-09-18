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
    // ActivityXuyuanLiveItem
    // yuqingchao
    // 2019.05.10
    var ActivityXuyuanLiveItem = (function (_super) {
        __extends(ActivityXuyuanLiveItem, _super);
        function ActivityXuyuanLiveItem() {
            var _this = _super.call(this) || this;
            _this.index = null;
            _this.score = null;
            _this.exchangeTimes = null;
            _this.skinName = "resource/skins/activity/ActivityXuyuanLiveItemSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityXuyuanLiveItem"], null);
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChange, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupDown.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(73, 70);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupDown.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupDown.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityXuyuanLiveItem.prototype.dataChanged = function () {
            zj.closeCache(this.groupAll);
            this.index = this.data.i;
            this.goods = this.data.info;
            this.father = this.data.father;
            this.score = this.father.curTopicInfo.exchange_xuyuan[this.index];
            this.exchangeTimes = this.father.curTopicInfo.exchange_count[this.index];
            if (this.goods.goodsId == 0) {
                this.groupAll.touchEnabled = false;
            }
            if (this.isImgMask(this.goods.goodsId)) {
                this.imgMask.visible = true;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = false;
                this.imgClip.mask = this.imgMask;
            }
            else if (this.isRectMask(this.goods.goodsId)) {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = false;
                this.rectMask.visible = true;
                this.imgClip.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imgClip.mask = this.rectMaskCommon;
            }
            this.setInfoGoods();
            this.setInfoOther();
            zj.setCache(this.groupAll);
        };
        ActivityXuyuanLiveItem.prototype.setInfoGoods = function () {
            if (this.goods.goodsId != 0) {
                var itemSet = zj.PlayerItemSystem.Set(this.goods.goodsId, this.goods.showType, this.goods.count);
                this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                this.imgClip.source = zj.cachekey(itemSet.Clip, this);
                this.lbNum.text = "x" + this.goods.count;
                this.resume();
                this.lbChangeCore.text = this.score.toString();
                this.groupFrame.visible = true;
            }
            else {
                this.groupFrame.visible = false;
            }
        };
        ActivityXuyuanLiveItem.prototype.setInfoOther = function () {
            var _this = this;
            if (this.goods.goodsId == 0)
                return;
            var buyTimes = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, function (k, v) {
                return v.key == _this.index;
            })[0];
            var colorGreen = [60, 255, 0]; //0x3CFF00;
            var colorRed = [200, 38, 0]; //0xC82600;
            if (buyTimes == null) {
                var str = zj.HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorGreen[0], colorGreen[1], colorGreen[2], this.exchangeTimes, this.exchangeTimes);
                this.lbChangeNum.textFlow = zj.Util.RichText(str);
                this.btnChange.enabled = true;
                this.imgGet.visible = false;
            }
            else {
                var canExchange = buyTimes.value < this.exchangeTimes;
                if ((this.exchangeTimes - buyTimes.value) > 0) {
                    var str = zj.HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorGreen[0], colorGreen[1], colorGreen[2], this.exchangeTimes - buyTimes.value, this.exchangeTimes);
                    this.lbChangeNum.textFlow = zj.Util.RichText(str);
                }
                else {
                    var str = zj.HelpUtil.textConfigFormat("<color>r=%s,g=%s,b=%s</color><text>%s</text><text>/%s</text>", colorRed[0], colorRed[1], colorRed[2], this.exchangeTimes - buyTimes.value, this.exchangeTimes);
                    this.lbChangeNum.textFlow = zj.Util.RichText(str);
                }
                this.btnChange.enabled = canExchange;
                this.imgGet.visible = !canExchange;
            }
        };
        ActivityXuyuanLiveItem.prototype.resume = function () {
            // local function call()
            // if self._goods == nil then return end
            // TipMgr: ShowProp(self._goods.goodsId, self._goods.count, self.SpriteClip)
            // self: AddLongPressCB(call, 0.1, self.SpriteClip)
        };
        ActivityXuyuanLiveItem.prototype.onBtnChange = function () {
            var _this = this;
            if (this.btnChange.enabled == true) {
                if (this.goods.goodsId == 0)
                    return;
                zj.loadUI(zj.ActivityXuyuanLiveExchange)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(_this);
                });
            }
        };
        // 物品遮罩
        ActivityXuyuanLiveItem.prototype.isImgMask = function (goodsId) {
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
        // 徽章遮罩
        ActivityXuyuanLiveItem.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        return ActivityXuyuanLiveItem;
    }(eui.ItemRenderer));
    zj.ActivityXuyuanLiveItem = ActivityXuyuanLiveItem;
    __reflect(ActivityXuyuanLiveItem.prototype, "zj.ActivityXuyuanLiveItem");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanLiveItem.js.map