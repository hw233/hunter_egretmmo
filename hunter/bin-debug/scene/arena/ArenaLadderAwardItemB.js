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
     * @author xing li wei
     *
     * @date 2019-1-25
     *
     * @class 奖励说明list的List子项
     */
    var ArenaLadderAwardItemB = (function (_super) {
        __extends(ArenaLadderAwardItemB, _super);
        function ArenaLadderAwardItemB() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueUnionRewarPreviewItemItemSkin.exml";
            zj.cachekeys(zj.UIResource["ArenaLadderAwardItemB"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.touchBegin, _this);
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.scaleX = 0.7;
            _this.imgMask.scaleY = 0.7;
            _this.groupAll.addChild(_this.imgMask);
            _this.imgMask.anchorOffsetX = _this.imgMask.width / 2;
            _this.imgMask.anchorOffsetY = _this.imgMask.height / 2;
            _this.imgMask.x = _this.groupAll.width / 2;
            _this.imgMask.y = _this.groupAll.height / 2;
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.rectMaskCommon.scaleX = 0.7;
            _this.rectMaskCommon.scaleY = 0.7;
            _this.rectMaskCommon.anchorOffsetX = _this.rectMaskCommon.width / 2;
            _this.rectMaskCommon.anchorOffsetY = _this.rectMaskCommon.height / 2;
            _this.rectMaskCommon.x = _this.groupAll.width / 2;
            _this.rectMaskCommon.y = _this.groupAll.height / 2;
            _this.groupAll.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        ArenaLadderAwardItemB.prototype.dataChanged = function () {
            var data = this.data;
            var goodsId = data.goodsId;
            var count = data.count;
            var itemSet = zj.PlayerItemSystem.Set(goodsId, null, count);
            this.imgBoard.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.lbNum.text = "x" + zj.Set.NumberUnit3(count);
            if (this.isRectMask(goodsId)) {
                this.imgMask.visible = true;
                this.imgIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.imgIcon.mask = this.rectMaskCommon;
            }
            if (data.goodsId == 33011) {
                this.imgIcon.scaleX = 0.9;
                this.imgIcon.scaleY = 0.9;
            }
        };
        ArenaLadderAwardItemB.prototype.touchBegin = function (e) {
            var data = this.data;
            var info = new message.GoodsInfo();
            info.goodsId = data.goodsId;
            info.count = data.count;
            data.father.data.father.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
        };
        //根据奖励类型判断是否添加遮罩
        ArenaLadderAwardItemB.prototype.isRectMask = function (goodsId) {
            var m = zj.PlayerItemSystem.ItemType(goodsId);
            if (zj.PlayerItemSystem.ItemType(goodsId) == 6 || zj.PlayerItemSystem.ItemType(goodsId) == 3 && goodsId != 39101 && goodsId != 39102 && goodsId != 39103 && goodsId != 34002 && goodsId != 34003) {
                return true;
            }
            return false;
        };
        return ArenaLadderAwardItemB;
    }(eui.ItemRenderer));
    zj.ArenaLadderAwardItemB = ArenaLadderAwardItemB;
    __reflect(ArenaLadderAwardItemB.prototype, "zj.ArenaLadderAwardItemB");
    var ArenaLadderAwardItemBData = (function () {
        function ArenaLadderAwardItemBData() {
        }
        return ArenaLadderAwardItemBData;
    }());
    zj.ArenaLadderAwardItemBData = ArenaLadderAwardItemBData;
    __reflect(ArenaLadderAwardItemBData.prototype, "zj.ArenaLadderAwardItemBData");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadderAwardItemB.js.map