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
    //HXH_StoryInstanceMallItem
    // wangshenzhuo
    // 2019-07-17
    var StoryInstanceMallItem = (function (_super) {
        __extends(StoryInstanceMallItem, _super);
        function StoryInstanceMallItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceMallItemSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceMallItem"], null);
            _this.buttonNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonNormal, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            return _this;
        }
        StoryInstanceMallItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.tbl = this.data.info;
            this.father = this.data.father;
            this.rewardGoods = (_a = {},
                _a[1] = this.tbl.act_coin,
                _a[2] = this.tbl.exchange_reduce_score[this.index],
                _a);
            this.getGoods = this.tbl.exchange_get_goods[this.index];
            this.SetLabelColor();
            this.SetInfoGetItem();
            this.SetInfoReduceGoods();
            this.SetBuyInfo();
            var _a;
        };
        StoryInstanceMallItem.prototype.SetLabelColor = function () {
            if (this.father.activityInfo.daysIndex >= this.rewardGoods[2]) {
                this.labelResoureNum.textColor = zj.ConstantConfig_Common.Color.green;
            }
            else {
                this.labelResoureNum.textColor = zj.ConstantConfig_Common.Color.red;
            }
        };
        StoryInstanceMallItem.prototype.SetInfoGetItem = function () {
            var itemSet = zj.PlayerItemSystem.Set(this.getGoods[0]);
            var count = this.getGoods[1];
            this.imageLogo.visible = false;
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelNum.text = count;
            this.labelItemName.text = itemSet.Info["name"];
            this.labelItemType.text = zj.PlayerItemSystem.ItemTypeDesc(this.getGoods[0]);
        };
        StoryInstanceMallItem.prototype.SetInfoReduceGoods = function () {
            var itemSet = zj.PlayerItemSystem.Set(this.rewardGoods[1]);
            this.imageResoure.source = zj.cachekey(itemSet["Path"], this);
            this.labelResoureNum.text = this.rewardGoods[2];
        };
        StoryInstanceMallItem.prototype.SetBuyInfo = function () {
            var buyMax = this.tbl.exchange_count[this.index];
            var buyCur = 0;
            for (var k in this.father.activityInfo.kvInfos) {
                var v = this.father.activityInfo.kvInfos[k];
                if (v.key == (this.index + 1)) {
                    buyCur = v.value;
                }
            }
            this.groupSoldOut.visible = (buyMax <= buyCur);
            this.labelBuyTimes.text = ("(" + (buyMax - buyCur) + "/" + buyMax + ")");
            this.buttonNormal.enabled = (buyMax > buyCur);
            this.SetLabelColor();
        };
        StoryInstanceMallItem.prototype.onButtonNormal = function () {
            var _this = this;
            this.SetBuyInfo();
            var index = this.father.activityInfo.index;
            var zone = this.index + 1;
            var num = 1;
            this.ActivityInstanceExchangeReq(index, zone, num).then(function (data) {
                _this.father.activityInfo = zj.otherdb.getActivityByTypeAndIndex(_this.father.activityInfo.type, _this.father.activityInfo.index);
                // this.father.
                var goods = zj.Table.DeepCopy(data.body.gameInfo.getGoods);
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                        dialog.setInfo(hero[0]["goodsId"], 0, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.show();
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    _this.father.onAwardInfo();
                                });
                            });
                        });
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(goods);
                        dialog.setCB(function () {
                            _this.father.onAwardInfo();
                        });
                    });
                }
            }).catch(function (reason) { });
        };
        StoryInstanceMallItem.prototype.ActivityInstanceExchangeReq = function (index, zone, num) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ActivityInstanceExchangeRequest();
                request.body.activityIndex = index;
                request.body.num = num;
                request.body.zone = zone;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        StoryInstanceMallItem.prototype.onShowGoodProperty = function (e) {
            var goodsinfo = new message.GoodsInfo();
            goodsinfo.goodsId = this.getGoods[0];
            goodsinfo.count = this.getGoods[1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return StoryInstanceMallItem;
    }(eui.ItemRenderer));
    zj.StoryInstanceMallItem = StoryInstanceMallItem;
    __reflect(StoryInstanceMallItem.prototype, "zj.StoryInstanceMallItem");
    //子项数据源
    var StoryInstanceMallItemData = (function () {
        function StoryInstanceMallItemData() {
        }
        return StoryInstanceMallItemData;
    }());
    zj.StoryInstanceMallItemData = StoryInstanceMallItemData;
    __reflect(StoryInstanceMallItemData.prototype, "zj.StoryInstanceMallItemData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceMallItem.js.map