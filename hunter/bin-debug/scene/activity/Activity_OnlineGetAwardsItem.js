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
     * @class 累计在线赢大奖Item
     *
     * @author LianLei
     *
     * @date 2019-10-29
     */
    var Activity_OnlineGetAwardsItem = (function (_super) {
        __extends(Activity_OnlineGetAwardsItem, _super);
        function Activity_OnlineGetAwardsItem() {
            var _this = _super.call(this) || this;
            _this.lastPercent = -1;
            _this.skinName = "resource/skins/activity/Activity_OnlineGetAwardsItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_OnlineGetAwardsItem"], null);
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        Activity_OnlineGetAwardsItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Activity_OnlineGetAwardsItem.prototype.updateView = function (data) {
            if (data.goodsInfo.goods_id == null || data.goodsInfo.goods_id == 0)
                return;
            var itemSet = zj.PlayerItemSystem.Set(data.goodsInfo.goods_id, null, data.goodsInfo.count);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = "x" + data.goodsInfo.count;
            this.imgCanGetAward.visible = false;
            this.imgGetAwardEnd.visible = false;
            if (data.goodsInfo.countTime <= 0) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(data.index) == -1) {
                    this.imgCanGetAward.visible = true;
                    this.imgGetAwardEnd.visible = false;
                }
                else {
                    this.imgCanGetAward.visible = false;
                    this.imgGetAwardEnd.visible = true;
                    zj.Helper.SetImageFilterColor(this.imgFrame, "gray");
                    zj.Helper.SetImageFilterColor(this.imgIcon, "gray");
                }
            }
            if (data.isShowTime) {
                this.imgBalck.visible = true;
                if (data.goodsInfo.countTime >= 0) {
                    this.addArcMask(this.imgBalck, this.imgBalck.width / 2, (zj.TableOnlineReward.Item(data.index).online_time - data.goodsInfo.countTime) / zj.TableOnlineReward.Item(data.index).online_time);
                }
                else {
                    this.imgBalck.mask = null;
                }
            }
            else {
                this.imgBalck.visible = false;
            }
        };
        Activity_OnlineGetAwardsItem.prototype.onShowGoodProperty = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.data.goodsInfo.goods_id;
            goodsInfo.count = this.data.goodsInfo.count;
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        /**设置图片扇形遮罩(环形,圆形进度条)
         * img: 目标图片
         * radius: 半径
         * percent: 进度(0-1)
         * startAngle: 起始位置, 默认为12点方向
         */
        Activity_OnlineGetAwardsItem.prototype.addArcMask = function (img, radius, percent, startAngle) {
            if (startAngle === void 0) { startAngle = -Math.PI / 2; }
            var temp = percent;
            if (percent >= 1) {
                percent = 1;
                temp = 0;
            }
            else if (percent <= 0) {
                percent = 0;
                temp = 1;
            }
            if (this.lastPercent == temp)
                return;
            this.lastPercent = temp;
            if (temp > 1)
                temp = 1;
            var endAngle = Math.PI * 2 * temp + startAngle;
            var shp = null;
            if (img.mask != null) {
                shp = img.mask;
                shp.graphics.clear();
            }
            else {
                shp = new egret.Shape();
                shp.x = img.x + img.width / 2;
                shp.y = img.y + img.height / 2;
                img.parent.addChild(shp);
                shp.touchEnabled = false;
                img.mask = shp;
            }
            shp.graphics.beginFill(0xff00ff);
            shp.graphics.moveTo(0, 0);
            shp.graphics.lineTo(radius * Math.cos(startAngle), radius * Math.sin(startAngle));
            shp.graphics.drawArc(0, 0, 110, startAngle, endAngle, true);
            shp.graphics.lineTo(0, 0);
            shp.graphics.endFill();
        };
        return Activity_OnlineGetAwardsItem;
    }(eui.ItemRenderer));
    zj.Activity_OnlineGetAwardsItem = Activity_OnlineGetAwardsItem;
    __reflect(Activity_OnlineGetAwardsItem.prototype, "zj.Activity_OnlineGetAwardsItem");
    var Activity_OnlineGetAwardsItemData = (function () {
        function Activity_OnlineGetAwardsItemData() {
        }
        return Activity_OnlineGetAwardsItemData;
    }());
    zj.Activity_OnlineGetAwardsItemData = Activity_OnlineGetAwardsItemData;
    __reflect(Activity_OnlineGetAwardsItemData.prototype, "zj.Activity_OnlineGetAwardsItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_OnlineGetAwardsItem.js.map