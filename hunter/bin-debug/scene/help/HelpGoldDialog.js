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
    // HelpGoldDialog(HXH_Gold)
    // wang shen zhuo
    // 2019/1/3
    var HelpGoldDialog = (function (_super) {
        __extends(HelpGoldDialog, _super);
        function HelpGoldDialog() {
            var _this = _super.call(this) || this;
            _this.array = new eui.ArrayCollection();
            _this.itemIndex1 = 0;
            _this.count = 0;
            _this.savecount_1 = 0;
            _this.savecount = 0;
            /**探索获得的金币 */
            _this.strMoney = 0;
            /**探索的暴击率 */
            _this.multiple = 0;
            _this.table = [];
            _this.skinName = "resource/skins/help/GoldSkin.exml";
            _this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonClose, _this);
            _this.btnSearchA.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonSearchA, _this);
            _this.btnSearchB.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.ButtonSearchB, _this);
            _this.imagebg.visible = false;
            _this.table = [];
            _this.SetInfo();
            return _this;
        }
        HelpGoldDialog.prototype.isFullScreen = function () {
            return this.imagebg.visible;
        };
        HelpGoldDialog.prototype.SetInfo = function () {
            this.SetInfoText();
            this.SetToken();
            this.SetCan();
        };
        //判断list是否为空
        HelpGoldDialog.prototype.SetCan = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length == 0) {
                this.imgSpriteSearchNode.visible = true;
            }
            else {
                this.imgSpriteSearchNode.visible = false;
            }
        };
        HelpGoldDialog.prototype.SetInfoList = function (isShow) {
            if (isShow === void 0) { isShow = false; }
            this.imagebg.visible = isShow;
            var buyLength = zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length;
            this.buyMoneyLogNum = buyLength;
            for (var i = 0; i < buyLength; i++) {
                var data = new zj.HelpGoldItemData();
                data.id = i;
                data.condition = false;
                data.mallitem = zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List[i];
                data.father = this;
                this.array.addItem(data);
            }
            this.listTableViewReward.dataProvider = this.array;
            this.listTableViewReward.itemRenderer = zj.HelpGoldItem;
            this.slidingBottom();
        };
        //列表滑动到最底部
        HelpGoldDialog.prototype.slidingBottom = function () {
            this.scrollerLog.viewport = this.listTableViewReward;
            this.scrollerLog.validateNow();
            if (this.scrollerLog.viewport.contentHeight > this.scrollerLog.viewport.height) {
                this.scrollerLog.viewport.scrollV = this.scrollerLog.viewport.contentHeight - this.scrollerLog.viewport.height;
            }
        };
        HelpGoldDialog.prototype.SetInfoText = function () {
            var _a = this.GetCost(), cost1 = _a[0], cost3 = _a[1], count3 = _a[2];
            var str_cost_one = zj.Helper.StringFormat("%d", cost1);
            var str_cost_more = zj.Helper.StringFormat("%d", cost3);
            var info = zj.TableLicence.Table();
            var index = info[zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + zj.PlayerVIPSystem.LowItem().buy_coin_free_time - zj.Game.PlayerVIPSystem.vipInfo.buy_money;
            var aa = info[zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money;
            var bb = zj.Game.PlayerVIPSystem.vipInfo.buy_money;
            if (zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time < zj.PlayerVIPSystem.LowItem().buy_coin_free_time) {
                this.imgSpriteIconNeedA.visible = false;
                var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Vip.Gold_num, zj.PlayerVIPSystem.LowItem().buy_coin_free_time - zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time);
                this.imageTip.visible = true;
                this.labelNeedA.textFlow = zj.Util.RichText(zj.Helper.StringFormat("<color>r:11,g:239,b:27</color><text>%s</text>", str));
            }
            else {
                this.imgSpriteIconNeedA.visible = true;
                this.imageTip.visible = false;
                this.labelNeedA.textFlow = zj.Util.RichText(zj.Helper.StringFormat("<color>r:212,g:224,b:238</color><text>%s</text>", str_cost_one));
            }
            if (index <= 0) {
                index = 0;
            }
            this.labelTime;
            this.labelTime.text = index.toString();
            this.labelNeedB.text = str_cost_more;
        };
        //钻石数量
        HelpGoldDialog.prototype.SetToken = function () {
            var token = zj.Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelHaveGemstone.text = (token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelHaveGemstone.text = token.toString();
            }
            var str_token = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        };
        HelpGoldDialog.prototype.isBg = function () {
            this.imagebg.visible = true;
        };
        //探索按钮是否能点击
        HelpGoldDialog.prototype.SetInfoLock = function () {
            this.btnSearchA.touchEnabled = true;
            this.btnSearchB.touchEnabled = true;
        };
        HelpGoldDialog.prototype.GetCost = function () {
            var tbl = zj.TableBuyMoney.Table();
            var next1 = zj.Game.PlayerVIPSystem.vipInfo.buy_money + 1 - zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time;
            var next3 = zj.Game.PlayerVIPSystem.vipInfo.buy_money + 10 - zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time;
            var max = zj.Table.LengthDisorder(tbl);
            if (next1 > max) {
                return [0, 0, 0];
            }
            next1 = this.yuan3(next1 > max, max, next1);
            next3 = this.yuan3(next3 > max, max, next3);
            var cost1 = tbl[next1].consume;
            var cost3 = zj.Table.Add(next1, next3 - (zj.PlayerVIPSystem.LowItem().buy_coin_free_time - zj.Game.PlayerVIPSystem.vipInfo.buy_coin_free_time) + 1, function (i) {
                return tbl[i].consume;
            });
            return [cost1, cost3, next3 - next1 + 1];
        };
        HelpGoldDialog.prototype.yuan3 = function (condition, param1, param2) {
            if (condition == true) {
                return param1;
            }
            else {
                return param2;
            }
        };
        HelpGoldDialog.prototype.ButtonClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
            this.SetToken();
        };
        //探索一次
        HelpGoldDialog.prototype.ButtonSearchA = function () {
            this.btnSearchA.touchEnabled = false;
            this.count = 1;
            var info = zj.TableLicence.Table();
            var index = info[zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + zj.PlayerVIPSystem.LowLevel().buy_coin_free_time - zj.Game.PlayerVIPSystem.vipInfo.buy_money;
            var _a = this.GetCost(), cost1 = _a[0], cost3 = _a[1], count3 = _a[2];
            this.savecount_1 = 1;
            this.savecount_2 = 0;
            this.savecount = this.savecount_1;
            var str_token = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            if (index < this.count) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.buy_money);
            }
            else {
                this.reqBuyVisit();
            }
            this.btnSearchA.touchEnabled = true;
        };
        //探索10次
        HelpGoldDialog.prototype.ButtonSearchB = function () {
            this.btnSearchB.touchEnabled = false;
            this.count = 10;
            var info = zj.TableLicence.Table();
            var index = info[zj.Game.PlayerInfoSystem.BaseInfo.licenceLevel].buy_money + zj.PlayerVIPSystem.LowItem().buy_coin_free_time - zj.Game.PlayerVIPSystem.vipInfo.buy_money;
            var _a = this.GetCost(), cost1 = _a[0], cost3 = _a[1], count3 = _a[2];
            this.savecount_1 = 0;
            this.savecount_2 = count3;
            this.savecount = this.savecount_2;
            var str_token = zj.PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            if (index < this.count) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Error.buy_money);
            }
            else {
                this.reqBuyVisit();
            }
            this.btnSearchB.touchEnabled = true;
        };
        //跳转充值成功界面
        HelpGoldDialog.prototype.recharge = function () {
        };
        HelpGoldDialog.prototype.reqBuyVisit = function () {
            var _this = this;
            HelpGoldDialog.reqBuy(this.count).then(function (data) {
                if (data.header.result == 0) {
                    var max = zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length;
                    var item = zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List[max - 1];
                    _this.slidingBottom();
                    if (_this.count == 1) {
                        _this.strMoney = item.money;
                        _this.multiple = item.multiple;
                    }
                    else if (_this.count == 10) {
                        _this.multiple = zj.Table.Add(zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length - 10 + 1, zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length, function (i) {
                            return zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List[i - 1].multiple;
                        });
                        _this.strMoney = zj.Table.Add(zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length - 10 + 1, zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List.length, function (i) {
                            return zj.Game.PlayerMixUnitInfoSystem.Buy_Money_List[i - 1].money;
                        });
                    }
                    if (_this.count == 1) {
                        var data_1 = new zj.HelpGoldItemData();
                        data_1.id = _this.buyMoneyLogNum;
                        data_1.condition = true;
                        _this.buyMoneyLogNum = _this.buyMoneyLogNum + 1;
                        data_1.mallitem = item;
                        data_1.father = _this;
                        _this.array.addItem(data_1);
                    }
                    else {
                        _this.SetInfoList(true);
                    }
                    _this.slidingBottom();
                    _this.SetCan();
                    _this.SetInfoText();
                    _this.SetToken();
                    zj.loadUI(zj.HelpGoldPop)
                        .then(function (dialog) {
                        dialog.SetInfo(_this.strMoney, _this.multiple, _this);
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                    });
                }
                else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    _this.SetInfoLock();
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        setTimeout(function () {
                            call();
                        }, 450);
                        var call = function () {
                            zj.loadUI(zj.PayMallScene)
                                .then(function (scene) {
                                scene.show(zj.UI.SHOW_FROM_TOP);
                                scene.init();
                            });
                        };
                    });
                }
            });
        };
        HelpGoldDialog.reqBuy = function (count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.BuyMoneyRequest();
                request.body.count = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    // if (response.header.result != 0) {
                    //     reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    //     return;
                    // }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        return HelpGoldDialog;
    }(zj.Dialog));
    zj.HelpGoldDialog = HelpGoldDialog;
    __reflect(HelpGoldDialog.prototype, "zj.HelpGoldDialog");
})(zj || (zj = {}));
//# sourceMappingURL=HelpGoldDialog.js.map