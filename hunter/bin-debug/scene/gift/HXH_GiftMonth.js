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
    // wang shen zhuo
    // HXH_GiftMonth
    // 20190420
    var HXH_GiftMonth = (function (_super) {
        __extends(HXH_GiftMonth, _super);
        function HXH_GiftMonth() {
            var _this = _super.call(this) || this;
            _this.AddGiftIndex = 0;
            _this.allProducts = [];
            _this.index = 0;
            _this.dataid = 0;
            _this.arrayLength = 0;
            _this.skinName = "resource/skins/gift/HXH_GiftMonthSkin.exml";
            zj.cachekeys(zj.UIResource["HXH_GiftMonth"], null);
            _this.buttonGiftBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonGiftBuy_CallBack, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            zj.Game.EventManager.on(zj.GameEvent.USER_PAY_RESULT, function () {
                _this.buttonGiftBuy.enabled = true;
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.TouchEvent.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_ROLE_INFO, _this.refreshInfo, _this);
            }, _this);
            _this.this_buy = false;
            _this.buttonGiftGo.visible = false;
            _this.buttonGiftGet.visible = false;
            _this.labelNum.visible = false;
            return _this;
        }
        HXH_GiftMonth.prototype.dataChanged = function () {
            this.father = this.data.father;
            this.info = this.data.info;
            this.index = this.data.index;
            this.allProducts = this.data.allPro;
            this.SetInfoItem();
            this.SetInfoReward();
            this.SetInfoState();
        };
        HXH_GiftMonth.prototype.SetInfoItem = function () {
            if (this.info.pay_index != "") {
                var tblConsume = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.pay + ".json"); //读表
                var pay_index = tblConsume[this.info.pay_index];
                var pay_tbl = null;
                for (var kk in this.allProducts) {
                    var vv = this.allProducts[kk];
                    if (Number(vv.coin) == pay_index.raw_token) {
                        pay_tbl = zj.Table.DeepCopy(vv);
                        break;
                    }
                }
                if (pay_tbl) {
                    this.info.pay_tbl = pay_tbl;
                    var str_money = pay_tbl.amount;
                    this.labelGetNum.text = str_money;
                }
                else {
                    this.labelGetNum.text = " ";
                }
                this.imageGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[0], this);
                this.imageRMB.visible = true;
                this.imageToken.visible = false;
            }
            else if (this.info.token_price != "") {
                var a = this.info.token_price;
                this.labelGetNum.text = this.info.token_price;
                this.imageGestoneIcon.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.donate[1], this);
                this.imageRMB.visible = false;
                this.imageToken.visible = true;
                // this.labelNum.visible = false;
            }
            this.imageTip.source = zj.cachekey(this.info.name_path, this);
            this.imageBuyType.source = zj.cachekey(zj.UIConfig.UIConfig_Gift.buy_type[4], this);
            this.imageGiftType.source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.backcolor[(this.info.index - 1) % 2], this);
            this.imageBuyTypeBoard.source = zj.cachekey(this.info.path, this);
            this.labelNumValue.text = this.info.all_price;
            for (var i = 1; i < 5; i++) {
                this["imageicon" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Hunter_Pay.bordcolor[(this.info.index - 1) % 2], this);
            }
        };
        HXH_GiftMonth.prototype.SetInfoReward = function () {
            var rewards = [];
            for (var k in this.info.goods_id) {
                var v = this.info.goods_id[k];
                var goods = new message.GoodsInfo();
                goods.goodsId = v;
                if (v == message.EResourceType.RESOURCE_TOKEN) {
                    goods.count = this.info.goods_num[k] + this.info.raw_raw_token;
                }
                else {
                    goods.count = this.info.goods_num[k];
                }
                rewards.push(goods);
            }
            var good = new message.GoodsInfo();
            good.goodsId = message.EResourceType.RESOURCE_TOKEN;
            good.count = this.info.raw_token;
            var Token = message.EResourceType.RESOURCE_TOKEN;
            ;
            var find_token = zj.Table.FindF(rewards, function (k, v) {
                return v.goodsId == Token;
            });
            if (!find_token && good.count != 0) {
                rewards.splice(0, 0, good);
            }
            this.listBuyAward.selectedIndex = -1; // 默认选中
            this.listBuyAward.itemRenderer = zj.HXH_GiftMonthItem;
            this.AddGiftItem = new eui.ArrayCollection();
            for (var i = 0; i < rewards.length; i++) {
                var data = new zj.HXH_GiftMonthItemData();
                data.goods = rewards[i];
                data.father = this;
                data.index = i;
                this.AddGiftItem.addItem(data);
            }
            this.listBuyAward.dataProvider = this.AddGiftItem;
            this.AddGiftIndex = this.listBuyAward.selectedIndex;
            this.dataid++;
        };
        HXH_GiftMonth.prototype.SetInfoState = function () {
            var a = this.info.index;
            var b_bought = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.monthGift, function (k, v) {
                return v == a;
            });
            var time = zj.PlayerGiftSystem.LastTime(this.info.open_time, this.info.duration);
            var str_last_time = b_bought && zj.TextsConfig.TextsConfig_Hunter_NewGift.sold_out || zj.TextsConfig.TextsConfig_Hunter_NewGift.last_time + this.formatMsTimeCh(time);
            this.labelCurrentType.text = str_last_time;
            this.buttonGiftBuy.enabled = !b_bought;
            this.imageTypeTop.visible = !b_bought;
            this.labelGetNum.visible = !b_bought;
            this.buttonGiftBuy.visible = !b_bought;
            this.imageSoul.visible = b_bought;
            this.imageGestoneIcon.visible = !b_bought;
            this.imageLeft.source = zj.cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
            this.imageRight.source = zj.cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
        };
        HXH_GiftMonth.prototype.refreshInfo = function (ev) {
            var _this = this;
            if (this.this_buy == false) {
                return;
            }
            else {
                this.this_buy = true;
            }
            this.buttonGiftGet.touchEnabled = false;
            var msg = ev.data.body;
            if (msg.gameInfo.getGoods.length > 0) {
                var cb_1 = function () {
                    _this.FollowUp(true);
                };
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(msg.gameInfo.getGoods);
                    dialog.show();
                    dialog.setCB(cb_1);
                });
            }
            else {
                this.FollowUp(false);
            }
        };
        HXH_GiftMonth.prototype.FollowUp = function (run_ani) {
            var _this = this;
            if (run_ani) {
                egret.Tween.get(this)
                    .to({ scaleX: 1, scaleY: 0 }, 400, egret.Ease.backInOut).call(function () {
                    _this.SetInfoState();
                })
                    .wait(500)
                    .to({ scaleX: 1, scaleY: 1 }, 600, egret.Ease.backOut);
                this.imageLeft.source = zj.cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
                this.imageRight.source = zj.cachekey("ui_hunter_ButtonHunterLeftNor_png", this);
                this.this_buy = false;
            }
            else {
                this.SetInfoState();
            }
        };
        HXH_GiftMonth.prototype.ButtonGiftBuy_CallBack = function () {
            var _this = this;
            if (zj.Device.isTestSwitch) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.sw_error);
            }
            else {
                this.buttonGiftBuy.touchEnabled = false;
                this.this_buy = true;
                var index = this.info.index;
                if (this.info.pay_index != "") {
                    if (zj.Util.getAppVersionInfo().channel == "test") {
                        zj.Game.PlayerPaySystem.simulateCharge(index).then(function (gameInfo) {
                            _this.buttonGiftBuy.enabled = false;
                            _this.simulateCharge(gameInfo, 0);
                        }).catch(function (err) {
                            _this.simulateCharge(null, err);
                            _this.buttonGiftBuy.touchEnabled = true;
                        });
                    }
                    else {
                        var strIndex = this.info["index"];
                        zj.platform.pay(zj.PlayerPaySystem.GetProductId(this.info["pay_index"], this.allProducts), 1, zj.PlayerPaySystem.GetCpExtJson(strIndex));
                    }
                }
                else if (this.info.token_price != "") {
                    this.BuyMonthGiftReqBody(index).then(function (gameInfo) {
                        _this.buttonGiftBuy.enabled = false;
                        _this.simulateCharge(gameInfo, 0);
                    }).catch(function (err) {
                        _this.simulateCharge(null, err);
                        _this.buttonGiftBuy.touchEnabled = true;
                    });
                }
            }
        };
        HXH_GiftMonth.prototype.simulateCharge = function (gameInfo, result) {
            var _this = this;
            if (result == message.EC.SUCCESS) {
                if (gameInfo.getGoods.length > 0) {
                    var cb_2 = function () {
                        _this.FollowUp(true);
                    };
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(gameInfo.getGoods);
                        dialog.show();
                        dialog.setCB(cb_2);
                    });
                }
                else {
                    this.FollowUp(false);
                }
            }
            else {
                zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(result) + "(" + result + ")");
            }
        };
        HXH_GiftMonth.prototype.BuyMonthGiftReqBody = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyMonthGiftRequest();
                request.body.gift_id = index;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 鼠标点击说明
        HXH_GiftMonth.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.goods.goodsId);
            var dialog = this.father.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.father.groupMain.removeChild(dialog);
            var index = data.index * 70 + this.index * 350 + 38;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = 65;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.father.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = 65;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.father.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = 65;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.father.groupMain.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = -154 + index;
                        dialog.y = 65;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.goods.goodsId, data.goods.count);
                        _this.father.groupMain.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除说明
        HXH_GiftMonth.prototype.onRemoveAward = function () {
            var dialog = this.father.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.father.groupMain.removeChild(dialog);
        };
        // 中文时间
        HXH_GiftMonth.prototype.formatMsTimeCh = function (ms) {
            var d = Math.floor(ms / 86400);
            var ttmp = Math.floor(ms % 86400);
            var a = Math.floor(ttmp / 3600);
            var tmp = Math.floor(ttmp % 3600);
            var b = Math.floor(tmp / 60);
            var c = Math.floor(tmp % 60);
            var hour = a;
            var min = b;
            var sec = c;
            var day = d;
            if (d == 0) {
                return hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
            }
            return day + zj.TextsConfig.TextsConfig_Time.day + hour + zj.TextsConfig.TextsConfig_Time.hour + min + zj.TextsConfig.TextsConfig_Time.min;
        };
        return HXH_GiftMonth;
    }(eui.ItemRenderer));
    zj.HXH_GiftMonth = HXH_GiftMonth;
    __reflect(HXH_GiftMonth.prototype, "zj.HXH_GiftMonth");
    var HXH_GiftMonthData = (function () {
        function HXH_GiftMonthData() {
            this.allPro = [];
        }
        return HXH_GiftMonthData;
    }());
    zj.HXH_GiftMonthData = HXH_GiftMonthData;
    __reflect(HXH_GiftMonthData.prototype, "zj.HXH_GiftMonthData");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GiftMonth.js.map