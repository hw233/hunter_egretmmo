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
    // HXH_StoryInstanceSelectStageItem
    // wangshenzhuo
    // 2019-07-22
    var StoryInstanceSelectStageItem = (function (_super) {
        __extends(StoryInstanceSelectStageItem, _super);
        function StoryInstanceSelectStageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceSelectStageItemSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceSelectStageItem"], null);
            _this.groupFirstAward.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.groupFirstAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTapGorupFirst, _this);
            return _this;
        }
        StoryInstanceSelectStageItem.prototype.dataChanged = function () {
            this.tbl = this.data.table;
            this.index = this.data.index;
            this.curInfo = this.data.info;
            this.curStar = this.data.star;
            this.father = this.data.father;
            this.labelStarNum.text = "X" + this.tbl.star_zone[this.index];
            this.labelInfo.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.battleStarDes, this.tbl.star_zone[this.index]);
            var itemSet = zj.PlayerItemSystem.Set(this.tbl.star_rewards[this.index][0]);
            var count = this.tbl.star_rewards[this.index][1];
            this.getGoods = (_a = {},
                _a[1] = this.tbl.star_rewards[this.index][0],
                _a[2] = this.tbl.star_rewards[this.index][1],
                _a);
            // this.imageIconFirstBlood.visible = false;
            this.imageFrameFirstBlood.source = zj.cachekey(itemSet.Frame, this);
            this.imageIconFirstBlood.source = zj.cachekey(itemSet.Clip, this);
            this.lebelFirstBlood.text = count.toString();
            this.SetInfoAward();
            var _a;
        };
        StoryInstanceSelectStageItem.prototype.SetInfoAward = function () {
            var curInforewardIndex = zj.otherdb.getActivityByTypeAndIndex(this.father.activity_info.type, this.father.activity_info.index);
            this.bIsGet = zj.Table.VIn(curInforewardIndex.rewardIndex, this.index + 1);
            this.canGet = this.curStar >= this.tbl.star_zone[this.index];
            this.imageGet.visible = this.bIsGet;
            this.imageShadow.visible = !this.canGet;
            this.groupGiftAni.removeChildren();
            this.addAnimatoin("ui_tongyong_lingqu", this.groupGiftAni, (!this.bIsGet && this.canGet));
        };
        StoryInstanceSelectStageItem.prototype.onTapGorupFirst = function () {
            if (!this.bIsGet && this.canGet) {
                this.ReqReward();
            }
        };
        StoryInstanceSelectStageItem.prototype.ReqReward = function () {
            var _this = this;
            zj.Game.PlayerActivitySystem.activityReward(this.curInfo.type, this.curInfo.index, this.index + 1, false).then(function (resp) {
                _this.curInfo = zj.otherdb.getActivityByTypeAndIndex(_this.curInfo.type, _this.curInfo.index);
                var goods = zj.Table.DeepCopy(resp.getGoods);
                if (goods[0].goodsId == 0) {
                    goods[0].goodsId = _this.getGoods[1];
                    goods[0].count = _this.getGoods[2];
                }
                var hero = zj.Table.FindR(goods, function (key, value) {
                    return zj.PlayerItemSystem.Type2(value.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    _this.SetInfoAward();
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(goods);
                        dialog.setCB(function () {
                            _this.SetInfoAward();
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }).catch(function () { });
        };
        StoryInstanceSelectStageItem.prototype.onShowGoodProperty = function (e) {
            if (!this.bIsGet && this.canGet) {
                return;
            }
            var goodsinfo = new message.GoodsInfo();
            goodsinfo.goodsId = this.getGoods[1];
            // goodsinfo.count = PlayerItemSystem.Count()
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        //添加龙骨动画
        StoryInstanceSelectStageItem.prototype.addAnimatoin = function (dbName, groupAni, isShow) {
            if (isShow) {
                zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", null, 0)
                    .then(function (display) {
                    display.x = groupAni.explicitWidth / 2;
                    display.y = groupAni.explicitHeight - 6;
                    groupAni.addChild(display);
                    display.scaleX = 0.85;
                    display.scaleY = 0.85;
                })
                    .catch(function (reason) {
                    zj.toast(reason);
                });
            }
        };
        return StoryInstanceSelectStageItem;
    }(eui.ItemRenderer));
    zj.StoryInstanceSelectStageItem = StoryInstanceSelectStageItem;
    __reflect(StoryInstanceSelectStageItem.prototype, "zj.StoryInstanceSelectStageItem");
    //子项数据源
    var StoryInstanceSelectStageItemData = (function () {
        function StoryInstanceSelectStageItemData() {
        }
        return StoryInstanceSelectStageItemData;
    }());
    zj.StoryInstanceSelectStageItemData = StoryInstanceSelectStageItemData;
    __reflect(StoryInstanceSelectStageItemData.prototype, "zj.StoryInstanceSelectStageItemData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceSelectStageItem.js.map