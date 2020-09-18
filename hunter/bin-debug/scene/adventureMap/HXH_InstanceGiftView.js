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
     * 冒险主场景可领取奖励UI
     * created by LianLei
     * 2019.2.27
     */
    var HXH_InstanceGiftView = (function (_super) {
        __extends(HXH_InstanceGiftView, _super);
        function HXH_InstanceGiftView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventureMap/HXH_InstanceGiftViewSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this); // 因为是循环播放，需要特别处理
            }, null);
            _this.runAni();
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.imgMask.width = 56;
            _this.imgMask.height = 56;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = zj.Util.getMaskImgBlack(53, 53);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 2;
            _this.groupAnimate.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(53, 53);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        /**
         * 刷新区域上方浮动奖励
         * @param areaId 区域ID
         */
        HXH_InstanceGiftView.prototype.fresh = function (areaId) {
            if (areaId > zj.Game.PlayerInstanceSystem.curInstances[message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL].maxAreaID) {
                this.groupAll.visible = false;
                return;
            }
            var instanceData = zj.Game.PlayerInstanceSystem.AreaInstance(areaId);
            if (instanceData == null)
                return;
            var chapterList = instanceData.area_normal;
            var eliteList = instanceData.area_elite;
            var instanceListNormal = [];
            var instanceListElite = [];
            for (var i = 0; i < chapterList.length; i++) {
                var vv = chapterList[i];
                var chapterData = null;
                chapterData = zj.Game.PlayerInstanceSystem.ChapterInstance(vv);
                instanceListNormal.push(chapterData.chapter_pack[chapterData.chapter_pack.length - 1]);
            }
            for (var i = 0; i < eliteList.length; i++) {
                var vv = eliteList[i];
                var eliteData = null;
                eliteData = zj.Game.PlayerInstanceSystem.EliteInstance(vv);
                instanceListElite.push(eliteData.chapter_pack[eliteData.chapter_pack.length - 1]);
            }
            var giftInfoNormal = zj.Table.DeepCopy(instanceListNormal);
            var giftInfoElite = zj.Table.DeepCopy(instanceListElite);
            // normal
            for (var i = 0; i < instanceListNormal.length; i++) {
                var vv = instanceListNormal[i];
                var mobInfos = zj.Game.PlayerInstanceSystem.mobInfos;
                var instance = null;
                for (var j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }
                if (instance != null && instance.star != 0) {
                    giftInfoNormal[i] = instance;
                }
                if (typeof giftInfoNormal[i] === "number" || giftInfoNormal[i].star == 0 || giftInfoNormal[i].chestReward == false) {
                    if (giftInfoNormal[i] instanceof Object && giftInfoNormal[i].star != 0 && giftInfoNormal[i].chestReward == false) {
                        this.imgGet.visible = true;
                        var path = "ui_instance_WordsBoxCanGet_png";
                        this.imgGet.source = zj.cachekey(path, this);
                    }
                    else {
                        this.imgGet.visible = false;
                    }
                    var goods_tbl = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
                    var count_tbl = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
                    var itemSet = zj.PlayerItemSystem.Set(goods_tbl[0], 0, count_tbl[0]);
                    this.groupClip.removeChildren();
                    this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                    this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                    // if (this.isImgMask(goods_tbl[0])) {
                    // 	this.imgMask.visible = true;
                    // 	this.rectMask.visible = false;
                    // 	this.rectMaskCommon.visible = false;
                    // 	this.imgIcon.mask = this.imgMask;
                    // } else if (this.isRectMask(goods_tbl[0])) {
                    // 	this.rectMask.visible = true;
                    // 	this.rectMaskCommon.visible = false;
                    // 	this.imgMask.visible = false;
                    // 	this.imgIcon.mask = this.rectMask;
                    // } else {
                    // 	this.imgMask.visible = false;
                    // 	this.rectMask.visible = false;
                    // 	this.rectMaskCommon.visible = true;
                    // 	this.imgIcon.mask = this.rectMaskCommon;
                    // }
                    if (this.isImgMask(goods_tbl[0]) && goods_tbl[0] == 40008) {
                        this.imgMask.visible = true;
                        this.rectMask.visible = false;
                        this.rectMaskCommon.visible = false;
                        this.imgIcon.mask = this.imgMask;
                    }
                    else {
                        this.imgMask.visible = false;
                        this.rectMask.visible = false;
                        this.rectMaskCommon.visible = false;
                        this.imgIcon.mask = null;
                    }
                    this.labelAwardNum.text = ("x" + zj.Set.NumberUnit2(count_tbl[0]));
                    return;
                }
            }
            for (var i = 0; i < instanceListElite.length; i++) {
                var vv = instanceListElite[i];
                var mobInfos = zj.Game.PlayerInstanceSystem.mobInfos;
                var instance = null;
                for (var j = 0; j < mobInfos.length; j++) {
                    if (mobInfos[j].mobId == vv) {
                        instance = mobInfos[j];
                        break;
                    }
                }
                if (instance != null && instance.star != 0) {
                    giftInfoElite[i] = instance;
                }
                if (typeof giftInfoElite[i] === "number" || giftInfoElite[i].star == 0 || giftInfoElite[i].chestReward == false) {
                    if (giftInfoElite[i] instanceof Object && giftInfoElite[i].star != 0 && giftInfoElite[i].chestReward == false) {
                        this.imgGet.visible = true;
                        var path = "ui_instance_WordsBoxCanGet_png";
                        this.imgGet.source = zj.cachekey(path, this);
                    }
                    else {
                        this.imgGet.visible = false;
                    }
                    var goods_tbl = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_ids;
                    var count_tbl = zj.Game.PlayerInstanceSystem.ChestItem(vv).goods_counts;
                    var itemSet = zj.PlayerItemSystem.Set(goods_tbl[0], 0, count_tbl[0]);
                    this.groupClip.removeChildren();
                    this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
                    this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                    this.labelAwardNum.text = ("x" + zj.Set.NumberUnit2(count_tbl[0]));
                    return;
                }
            }
            this.groupAll.visible = false;
        };
        // 物品遮罩
        HXH_InstanceGiftView.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        // 徽章遮罩
        HXH_InstanceGiftView.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        /**上下浮动动画 */
        HXH_InstanceGiftView.prototype.runAni = function () {
            var off = 5 + 2 * Math.random();
            var time = (1 + 0.5 * Math.random()) * 1000;
            var groupY = this.y;
            if (Math.random() > 0.5) {
                egret.Tween.get(this, { loop: true }).to({ y: -off }, time, egret.Ease.sineInOut).to({ y: off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
            else {
                egret.Tween.get(this, { loop: true }).to({ y: off }, time, egret.Ease.sineInOut).to({ y: -off }, time, egret.Ease.sineInOut).to({ y: groupY }, time, egret.Ease.sineInOut);
            }
        };
        /**
         * 刷新方法(外部调用)
         * @param areaId 区域ID
         */
        HXH_InstanceGiftView.prototype.onTapFresh = function (areaId) {
            this.fresh(areaId);
        };
        return HXH_InstanceGiftView;
    }(zj.UI));
    zj.HXH_InstanceGiftView = HXH_InstanceGiftView;
    __reflect(HXH_InstanceGiftView.prototype, "zj.HXH_InstanceGiftView");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_InstanceGiftView.js.map