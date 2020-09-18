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
    // 首领奖励item
    // lizhengiang
    // 20190325
    var WantedSecondBossDropInfoItem = (function (_super) {
        __extends(WantedSecondBossDropInfoItem, _super);
        function WantedSecondBossDropInfoItem() {
            var _this = _super.call(this) || this;
            _this.goodsInfo = null;
            _this.skinName = "resource/skins/meteorstreet/WantedSecondBossDropInfoItemSkin.exml";
            _this.imgIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty1, _this);
            _this.imgIcon2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty2, _this);
            _this.imgIcon3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty3, _this);
            // 遮罩
            _this.rectMask1 = zj.Util.getMaskImgBlack(67, 61);
            _this.rectMask1.horizontalCenter = 0;
            _this.rectMask1.verticalCenter = -1;
            _this.groupItem1.addChild(_this.rectMask1);
            _this.rectMask2 = zj.Util.getMaskImgBlack(67, 61);
            _this.rectMask2.horizontalCenter = 0;
            _this.rectMask2.verticalCenter = -1;
            _this.groupItem2.addChild(_this.rectMask2);
            _this.rectMask3 = zj.Util.getMaskImgBlack(67, 61);
            _this.rectMask3.horizontalCenter = 0;
            _this.rectMask3.verticalCenter = -1;
            _this.groupItem3.addChild(_this.rectMask3);
            return _this;
        }
        WantedSecondBossDropInfoItem.prototype.dataChanged = function () {
            var _this = this;
            var index = this.data.index;
            var info = this.data.info;
            this.imgInstanceName.source = zj.cachekey(zj.PlayerWantedSystem.Instance(10000 * index + 1).boss_name_client, this);
            var bossFloor = [];
            for (var k in info) {
                bossFloor.push(Number(k));
            }
            this.goodsInfo = {};
            var _loop_1 = function (i) {
                if (bossFloor[i] != null) {
                    var floorId = index * 10000 + bossFloor[i];
                    var bossName = zj.PlayerWantedSystem.Instance(floorId).Instance_name;
                    var currentFloorInfo = info[bossFloor[i]][0];
                    var itemSet = zj.PlayerItemSystem.Set(currentFloorInfo.goodsId, currentFloorInfo.showType, currentFloorInfo.count);
                    this_1.goodsInfo[i + 1] = currentFloorInfo;
                    this_1["imgFrame" + (i + 1)].source = zj.cachekey(itemSet.Frame, this_1);
                    this_1["imgIcon" + (i + 1)].source = zj.cachekey(zj.PlayerItemSystem.ItemPath(currentFloorInfo.goodsId), this_1);
                    this_1["lbItemNum" + (i + 1)].text = "x" + currentFloorInfo.count;
                    this_1["lbName" + (i + 1)].text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Wanted.level, bossFloor[i]);
                    this_1["groupAnimation" + (i + 1)].removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this_1, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0).then(function (display) {
                        _this["groupAnimation" + (i + 1)].addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                    // 遮罩
                    this_1["rectMask" + (i + 1)].visible = true;
                    this_1["imgIcon" + (i + 1)].mask = this_1["rectMask" + (i + 1)];
                }
                else {
                    this_1["imgFrame" + (i + 1)].visible = false;
                    this_1["imgIcon" + (i + 1)].visible = false;
                    this_1["lbItemNum" + (i + 1)].visible = false;
                    this_1["lbName" + (i + 1)].visible = false;
                    // 遮罩
                    this_1["rectMask" + (i + 1)].visible = false;
                    this_1["imgIcon" + (i + 1)].mask = null;
                }
            };
            var this_1 = this;
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
        };
        WantedSecondBossDropInfoItem.prototype.onShowGoodProperty1 = function (e) {
            if (this.goodsInfo[1] != null) {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[1], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
        };
        WantedSecondBossDropInfoItem.prototype.onShowGoodProperty2 = function (e) {
            if (this.goodsInfo[2] != null) {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[2], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
        };
        WantedSecondBossDropInfoItem.prototype.onShowGoodProperty3 = function (e) {
            if (this.goodsInfo[3] != null) {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: this.goodsInfo[3], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
        };
        return WantedSecondBossDropInfoItem;
    }(eui.ItemRenderer));
    zj.WantedSecondBossDropInfoItem = WantedSecondBossDropInfoItem;
    __reflect(WantedSecondBossDropInfoItem.prototype, "zj.WantedSecondBossDropInfoItem");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondBossDropInfoItem.js.map