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
    //  娃娃机 -- 娃娃币礼包
    //  wangshenzhuo
    //  2019/04/11
    var ActivityTimeGiftFirstPopCEgg = (function (_super) {
        __extends(ActivityTimeGiftFirstPopCEgg, _super);
        function ActivityTimeGiftFirstPopCEgg() {
            var _this = _super.call(this) || this;
            _this.TableViewIndex = 0;
            _this.confirmCB = null;
            _this.skinName = "resource/skins/activity/ActivityTimeGiftFirstPopCEggSkin.exml";
            _this.buttonGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonGet, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.labelEndTime.visible = false;
            _this.labelCanBuy.visible = false;
            _this.imageLimit.visible = false;
            _this.imageEight.visible = false;
            return _this;
        }
        ActivityTimeGiftFirstPopCEgg.prototype.SetInfo = function (info) {
            this.imageInfoIcon.source = zj.cachekey(info.path, this);
            this.labelValue_2.text = info.gift_consume;
            var goods = info.gift_content;
            var reward_list = [];
            for (var k in goods) {
                var v = goods[k];
                var good = new message.GoodsInfo();
                good.goodsId = v[0];
                good.count = v[1];
                reward_list.push(good);
            }
            this.listTableView.selectedIndex = -1; // 默认选中
            this.TableViewItem = new eui.ArrayCollection();
            this.listTableView.itemRenderer = zj.HXH_GiftMonthItem;
            for (var i = 0; i < reward_list.length; i++) {
                var data = new zj.HXH_GiftMonthItemData();
                data.goods = reward_list[i];
                data.father = this;
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listTableView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableView.selectedIndex;
            this.buttonGet_2.touchEnabled = true;
        };
        ActivityTimeGiftFirstPopCEgg.prototype.onButtonGet = function () {
            var _this = this;
            this.buttonGet_2.touchEnabled = false;
            this.GetGiftReq_Visit().then(function (data) {
                setTimeout(function () {
                    _this.buttonGet_2.touchEnabled = true;
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                    });
                }, 500);
            }).catch(function (reason) {
                if (reason == message.EC.XG_LACK_TOKEN) {
                    _this.buttonGet_2.touchEnabled = true;
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () { shopping_1(); });
                    var shopping_1 = function () {
                        setTimeout(function () {
                            zj.loadUI(zj.PayMallScene)
                                .then(function (scene) {
                                scene.show(zj.UI.SHOW_FROM_TOP);
                                scene.init();
                            });
                        }, 800);
                    };
                }
                else {
                    _this.buttonGet_2.touchEnabled = true;
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(reason));
                }
            });
        };
        ActivityTimeGiftFirstPopCEgg.prototype.GetGiftReq_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.IntegralBuyGiftRequest();
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        // public GetGiftReq_Visit() {
        //     return new Promise((resolve, reject) => {
        //         let request = new message.IntegralBuyGiftRequest();
        //             Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
        //             let response = <message.IntegralBuyGiftResponse>resp;
        //             console.log(response);
        //             resolve(response);
        //             return;
        //         }, (req: aone.AoneRequest): void => {
        //             reject(LANG("请求超时"));
        //             return;
        //         }, this, false , true);
        //         return;
        //     });
        // }
        // 鼠标点击说明
        ActivityTimeGiftFirstPopCEgg.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.goods.goodsId);
            var dialog = this.groupGift.getChildByName("Item-skill-common");
            if (dialog)
                this.groupGift.removeChild(dialog);
            var index = data.index * 75;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupGift.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupGift.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupGift.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.goods.goodsId, data.goods.count);
                        _this.groupGift.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除说明
        ActivityTimeGiftFirstPopCEgg.prototype.onRemoveAward = function () {
            var dialog = this.groupGift.getChildByName("Item-skill-common");
            if (dialog)
                this.groupGift.removeChild(dialog);
        };
        ActivityTimeGiftFirstPopCEgg.prototype.setCB = function (confirmCB) {
            this.confirmCB = confirmCB;
        };
        ActivityTimeGiftFirstPopCEgg.prototype.onBtnClose = function () {
            if (this.confirmCB != null) {
                this.confirmCB();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityTimeGiftFirstPopCEgg;
    }(zj.Dialog));
    zj.ActivityTimeGiftFirstPopCEgg = ActivityTimeGiftFirstPopCEgg;
    __reflect(ActivityTimeGiftFirstPopCEgg.prototype, "zj.ActivityTimeGiftFirstPopCEgg");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityTimeGiftFirstPopCEgg.js.map