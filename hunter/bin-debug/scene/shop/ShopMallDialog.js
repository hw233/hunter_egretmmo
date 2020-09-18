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
    // MallAll_Main
    // hexiaowei
    // 20018/12/19
    var ShopMallDialog = (function (_super) {
        __extends(ShopMallDialog, _super);
        function ShopMallDialog() {
            var _this = _super.call(this) || this;
            _this.isNormal = zj.TableEnum.Enum.Mall.NORMAL;
            _this.isArena = zj.TableEnum.Enum.Mall.ARENA;
            _this.isLeague = [zj.TableEnum.Enum.Mall.LEAGUE];
            _this.isHonor = zj.TableEnum.Enum.Mall.HONOR;
            _this.isLottery = zj.TableEnum.Enum.Mall.LOTTERY;
            //各个类型商店
            _this.progressMall = (_a = {},
                _a[1] = message.EProcessType.PROCESS_TYPE_MALL_NORMAL,
                _a[2] = message.EProcessType.PROCESS_TYPE_MALL_LADDER,
                _a[3] = message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,
                _a[4] = message.EProcessType.PROCESS_TYPE_MALL_HONOR,
                _a[5] = message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,
                _a);
            //各个类型商店所需的货币
            _this.costMall = (_b = {},
                _b[1] = message.EResourceType.RESOURCE_MONEY,
                _b[2] = message.EResourceType.RESOURCE_LADDER,
                _b[3] = message.EResourceType.RESOURCE_LEAGUE,
                _b[4] = message.EResourceType.RESOURCE_HONOR_COIN,
                _b[5] = message.EResourceType.RESOURCE_LOTTERYSCORE,
                _b);
            //错误码提示
            _this.costError = (_c = {},
                _c[20001] = message.EC.XG_LACK_MONEY,
                _c[20002] = message.EC.XG_LACK_TOKEN,
                _c[20004] = message.EC.XG_LACK_LADDERSCORE,
                _c[20007] = message.EC.XG_LACK_LEAGUECOIN,
                _c[20014] = message.EC.XG_LACK_LOTTERY_SCORE,
                _c[20019] = message.EC.XG_LACK_HONOR_COIN,
                _c);
            _this.itemIndex = 0;
            _this.itemIndex1 = 0;
            // 商店类型（切换）
            _this.index = 0;
            //进入商店的入口类型
            _this.indexType = 0;
            _this.LastTime = 0;
            _this.timea = 14400;
            _this._COST_MALL = [];
            //列表下拉移动位置
            _this.moveLocation = 0;
            _this.skinName = "resource/skins/shop/ShopMallDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.listButtonType.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.AddShopMainType, _this);
            _this.listGoods.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.AddShopmallList, _this);
            _this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.buttonRefresh, _this);
            //注册事件侦听器
            _this.timers = new egret.Timer(1000, 0);
            _this.timers.start();
            _this.timers.addEventListener(egret.TimerEvent.TIMER, _this.setUpdate, _this);
            _this.imageBackground.visible = false;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.timers.stop();
            }, _this);
            if (zj.Device.isReviewSwitch) {
                _this.btnFresh.visible = false;
                _this.imgSpriteRushGes.visible = false;
                _this.labelCost.visible = false;
                _this.imgSpriteCost.width = 40;
                _this.imgSpriteCost.height = 40;
                _this.imgSpriteCost_1.width = 40;
                _this.imgSpriteCost_1.height = 40;
                _this.btnClose.x = 800;
            }
            _this.isTime = Math.floor(egret.getTimer() / 1000);
            return _this;
            var _a, _b, _c;
        }
        ;
        ShopMallDialog.prototype.Init = function () {
            // this._mall_data = [];
            this.groupButtonType.visible = true;
            this._COST_MALL = [
                message.EMallType.MALL_TYPE_ORDINARY,
                message.EMallType.MALL_TYPE_LADDER,
                message.EMallType.MALL_TYPE_LEAGUE,
                message.EMallType.MALL_TYPE_HONOR,
                message.EMallType.MALL_TYPE_LOTTERY,
            ];
            //list 加载
            this.listButtonType.selectedIndex = this.index - 1; // 默认选中
            this.listButtonType.itemRenderer = zj.ShopMainType;
            this.arrCollectionItem = new eui.ArrayCollection();
            for (var i = 0; i < this._COST_MALL.length; i++) {
                this.arrCollectionItem.addItem(this._COST_MALL[i]);
            }
            this.listButtonType.dataProvider = this.arrCollectionItem;
            this.itemIndex = this.listButtonType.selectedIndex;
            // this.timerFunc();
            this.setUpdate();
        };
        ShopMallDialog.prototype.isFullScreen = function () {
            return this.imageBackground.visible;
        };
        //商铺入口
        //index : 商店类型 （1、普通商店；2、格斗商店；3、公会商店；4、荣誉商店；5、酒馆商店）
        //shopbool : 表示是否从普通商店进入
        ShopMallDialog.prototype.load = function (index, shopbool, info) {
            if (index === void 0) { index = 0; }
            this.index = index != 0 ? index : zj.TableEnum.Enum.Mall.NORMAL;
            if (shopbool == true) {
                this.imageBackground.visible = true;
                this.groupSum.y = -606;
                egret.Tween.get(this.groupSum).to({ y: 0 }, 300, egret.Ease.backOut);
            }
            if (info != null) {
                this.indexType = index;
            }
            this.moveLocation = 0;
            /*
            if (this.index == 1) {
                //开始计时
                this.timers.start();
            }
            */
            if (info != null) {
                this.info = info;
            }
            this.Init();
            this.setInfo(index);
            this.setInfoFresh();
        };
        //切换商铺类型
        ShopMallDialog.prototype.setInfo = function (index) {
            if (index === void 0) { index = 0; }
            this.index = index != 0 ? index : this.index;
            this.reqMallBefore(index);
        };
        //设置本地数据
        ShopMallDialog.prototype.setInfoLocate = function () {
            // this.setUpdate();
            this.setInfoReset();
            this.setInfoFresh();
        };
        ShopMallDialog.prototype.setUpdate = function () {
            this.setUpdateRes();
            this.SetUpdateTime();
        };
        //设置刷新花费
        ShopMallDialog.prototype.setInfoReset = function () {
            var m = zj.Game.PlayerVIPSystem.vipInfo;
            var dayRefreshNum = zj.Game.PlayerVIPSystem.vipInfo.mall_ordinary_time - zj.PlayerVIPSystem.LowItem().mall_free_time;
            var count_mall = (_a = {},
                _a[1] = dayRefreshNum,
                _a[2] = 0,
                _a[3] = 0,
                _a[4] = 0,
                _a[5] = 0,
                _a);
            var mall = zj.TableEnum.Enum.Mall[this.index];
            var count = count_mall[this.index];
            var str_count = zj.CommonConfig.mall_refresh_token(mall, count);
            if (this.index == zj.TableEnum.Enum.Mall.NORMAL) {
                if (count < 0) {
                    str_count[0] = 0;
                }
            }
            this.labelCost.text = str_count[0].toString();
            var str_refresh = zj.TextsConfig.TextsConfig_Mall.mall_refresh;
            this.labelRefresh.text = str_refresh;
            var _a;
        };
        //设置提示文字
        ShopMallDialog.prototype.setInfoFresh = function () {
            var index = zj.TableEnum.Enum.Mall[this.index] + 1;
            var str_time = "";
            if (this.isNormal == this.index) {
                str_time = zj.TextsConfig.TextsConfig_Mall.fourfreshs;
                this.groupNodeRefresh.visible = true;
            }
            else {
                str_time = zj.TextsConfig.TextsConfig_Mall.fourfresh;
                this.groupNodeRefresh.visible = false;
            }
            this.labelTimeTips.text = str_time;
        };
        //更新资源信息
        ShopMallDialog.prototype.setUpdateRes = function () {
            var index = this.index != 0 ? this.index : zj.TableEnum.Enum.Mall.NORMAL;
            var id = this.costMall[index];
            var str_res = zj.PlayerItemSystem.Str_Resoure(id);
            var item = zj.PlayerItemSystem.Item(id);
            var path_icon = item.icon;
            var count = zj.PlayerItemSystem.Resource(this.costMall[index]);
            this.nowMoney = count;
            this.labelMoney.text = str_res;
            this.imgSpriteCost_1.source = zj.cachekey(path_icon, this);
            //钻石数量
            var token = zj.Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 10) / 10 + "万";
            }
            else {
                this.labelToken.text = token.toString();
            }
        };
        //金币更新
        ShopMallDialog.prototype.Shopmoney = function () {
            var token = zj.Game.PlayerInfoSystem.Coin;
            if (token > 100000) {
                this.labelMoney.text = Math.floor((token / 10000) * 10) / 10 + "万";
            }
            else {
                this.labelMoney.text = token.toString();
            }
        };
        //钻石更新
        ShopMallDialog.prototype.ShopToken = function () {
            //钻石数量
            var token = zj.Game.PlayerInfoSystem.Token;
            if (token > 100000) {
                this.labelToken.text = Math.floor((token / 10000) * 10) / 10 + "万";
            }
            else {
                this.labelToken.text = token.toString();
            }
        };
        ShopMallDialog.prototype.SetUpdateTime = function () {
            var index = this.index || zj.TableEnum.Enum.Mall.NORMAL;
            var progess = this.progressMall[index];
            var time = zj.Game.PlayerProgressesSystem.progressMap[progess].leftTime + this.isTime - Math.floor(egret.getTimer() / 1000);
            if (time <= 0 && this.index != message.EMallType.MALL_TYPE_HONOR) {
                this.timers.stop();
                this.ReqProcess(index);
            }
            this.labelTime.text = zj.Helper.GetTimeStr(time, false);
        };
        ShopMallDialog.prototype.ReqProcess = function (indexs) {
            var _this = this;
            var index = this.progressMall[indexs];
            ShopMallDialog.CheckProcessReq(index).then(function () {
                _this.reqMall(indexs);
                _this.timers.start();
            }).catch(function (reason) {
            });
        };
        ShopMallDialog.CheckProcessReq = function (index) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.CheckProcessRequest();
                request.body.types = index;
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
        //切换前
        ShopMallDialog.prototype.reqMallBefore = function (index) {
            this.reqMall(index);
        };
        //设置商品列表
        ShopMallDialog.prototype.setInfoMall = function () {
            this.listGoods.selectedIndex = -1; // 默认选中
            this.array = new eui.ArrayCollection();
            for (var i = 0; i < ShopMallDialog._mall_data[this.index].length; i++) {
                var data = new zj.ShopMainItemData();
                data.mallitem = ShopMallDialog._mall_data[this.index][i];
                data.shopmallscene = this;
                this.array.addItem(data);
            }
            this.listGoods.dataProvider = this.array;
            this.listGoods.itemRenderer = zj.ShopMainItem;
            this.itemIndex1 = this.listGoods.selectedIndex;
            this.scrollerInfo.viewport = this.listGoods;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        //拉取不同类型商店的数据
        ShopMallDialog.prototype.reqMall = function (index) {
            var _this = this;
            var type = zj.TableEnum.Enum.Mall[this.index];
            zj.PlayerProgressesSystem.ReqGain(type)
                .then(function (data) {
                ShopMallDialog._mall_data[_this.index] = [];
                ShopMallDialog._mall_data[_this.index] = data.body.items;
                var m = ShopMallDialog._mall_data[_this.index];
                _this.mallList = ShopMallDialog._mall_data[_this.index];
                _this.setInfoMall();
                _this.setInfoLocate();
            });
        };
        //折扣
        ShopMallDialog.prototype.getDiscount = function () {
            return zj.Table.VIn(this.isLeague, this.index);
        };
        //获取各个商品可购买的数量
        ShopMallDialog.prototype.getMallRemain = function (id) {
            var remain = 0;
            for (var k in this.mallList) {
                var v = this.mallList[k];
                if (v.mall_id == id) {
                    return v.remain;
                }
            }
            return remain;
        };
        /**关闭按钮*/
        ShopMallDialog.prototype.onButtonClose = function () {
            if (this.index == zj.TableEnum.Enum.Mall.LOTTERY) {
                var times = zj.Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
                zj.Tips.SetSaveTimeByMallNewProduct(message.EMallType.MALL_TYPE_HONOR, times + 1);
            }
            if (this.info != null) {
                this.info.setUI();
            }
            // this.timers.stop();
            // this.timers.reset();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //点击顶部list 切换商店类型
        ShopMallDialog.prototype.AddShopMainType = function (e) {
            if (this.index == zj.TableEnum.Enum.Mall.LOTTERY) {
                var times = zj.Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
                zj.Tips.SetSaveTimeByMallNewProduct(message.EMallType.MALL_TYPE_HONOR, times + 1);
            }
            if (this.itemIndex != this.listButtonType.selectedIndex) {
                if (this.itemIndex == 4) {
                    var times = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
                    zj.Tips.SetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, times + 1, "MALL");
                }
                if (this.itemIndex == 2) {
                    var times = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
                    zj.Tips.SetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, times + 1, "MALL");
                }
                var onstate = this.GetOpen(this.listButtonType.selectedIndex + 1, true, true);
                if (onstate) {
                    this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                    this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listButtonType.selectedIndex]);
                    this.itemIndex = this.listButtonType.selectedIndex;
                    this.load(this.itemIndex + 1);
                }
            }
        };
        //点击购买物品
        ShopMallDialog.prototype.buy = function (mallId, count) {
            var _this = this;
            var type = zj.TableEnum.Enum.Mall[this.index];
            zj.PlayerProgressesSystem.ReqBuy(type, mallId, count)
                .then(function (data) {
                egret.Tween.get(_this)
                    .call(function () {
                    _this.buyInfo.onBtnClose();
                    //this.tavern.removeChild(this); 
                })
                    .wait(500, true)
                    .call(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                    });
                });
                _this.scrollerInfo.viewport = _this.listGoods;
                _this.scrollerInfo.validateNow();
                _this.moveLocation = _this.scrollerInfo.viewport.scrollV;
                //this.load(this.index);
                _this.reqMall(_this.index);
                if (_this.info != null) {
                    _this.info.setUI();
                }
                //this.Init();
            })
                .catch(function (reason) { });
        };
        //购买商品界面
        ShopMallDialog.prototype.AddShopmallList = function (e) {
            var _this = this;
            if (this.itemIndex1 != this.listGoods.selectedIndex) {
                this.array.itemUpdated(this.array.source[this.itemIndex1]);
                this.array.itemUpdated(this.array.source[this.listGoods.selectedIndex]);
                this.itemIndex1 = this.listGoods.selectedIndex;
            }
            var tbl = zj.TableQuickMall.Table();
            var lastData = ShopMallDialog._mall_data[this.index][this.itemIndex1];
            if (lastData.remain <= 0) {
            }
            else {
                var num = 0;
                if (lastData.buy_limit < zj.Game.PlayerInfoSystem.Level) {
                    num = this.getMallRemain(lastData.mall_id);
                }
                if (lastData.remain >= 10) {
                    zj.loadUI(zj.ShopBuyAll)
                        .then(function (dialog) {
                        _this.buyInfo = dialog;
                        dialog.init();
                        dialog.setInfo(lastData, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.ShopBuyOne)
                        .then(function (dialog) {
                        _this.buyInfo = dialog;
                        dialog.setInfo(lastData, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        //刷新普通商城
        ShopMallDialog.prototype.buttonRefresh = function () {
            var _this = this;
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.refresh_confirm, _this.labelCost.text));
                dialog.setCB(function () {
                    if (Number(_this.labelCost.text) > zj.Game.PlayerInfoSystem.Token) {
                        zj.loadUI(zj.ConfirmCancelDialog)
                            .then(function (dialog) {
                            dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Money.demstone));
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                        });
                    }
                    else {
                        var type = zj.TableEnum.Enum.Mall[_this.index];
                        zj.PlayerProgressesSystem.ReqRefresh(type)
                            .then(function (data) {
                            if (_this.indexType == 5) {
                                _this.info.setUI();
                            }
                            ShopMallDialog._mall_data[_this.index] = [];
                            ShopMallDialog._mall_data[_this.index] = data.body.items;
                            _this.mallList = ShopMallDialog._mall_data[_this.index];
                            _this.setInfoMall();
                            _this.setInfoLocate();
                        });
                    }
                });
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        //判断商店是否达到解锁条件
        ShopMallDialog.prototype.GetOpen = function (index, bTips, isdown) {
            if (index == zj.TableEnum.Enum.Mall.NORMAL) {
                return true;
            }
            else if (index == zj.TableEnum.Enum.Mall.ARENA) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.LEAGUE) {
                return true
                    && zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, isdown)
                    && zj.PlayerHunterSystem.LevelDBOpenLeague(bTips)
                    && zj.Game.PlayerInfoSystem.LeagueId != 0;
            }
            else if (index == zj.TableEnum.Enum.Rank.CONTEND) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.EC.XG_OPENFUNCTION_CONTEND, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.LOTTERY) {
                return true;
            }
            else if (index == zj.TableEnum.Enum.OneKeySell.Demon) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON, isdown);
            }
            else if (index == zj.TableEnum.Enum.Mall.HONOR) {
                return zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_SINGLE_CRAFT, isdown);
            }
        };
        ShopMallDialog.prototype.GetTips = function (index) {
            if (index == zj.TableEnum.Enum.Mall.NORMAL) {
                return zj.Tips.GetTipsOfId(zj.Tips.TAG.MALL, 1);
            }
            else if (index == zj.TableEnum.Enum.Mall.ARENA) {
                return true && zj.PlayerHunterSystem.LevelDBFunOpenTo(2) && zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, 2);
            }
            else if (index == message.EMallType.MALL_TYPE_LEAGUE) {
                return true && zj.Game.PlayerInfoSystem.LeagueId != 0
                    && zj.PlayerHunterSystem.LevelDBFunOpenTo(1)
                    && zj.PlayerHunterSystem.LevelDBFunOpenLeague(false)
                    && zj.Tips.GetTipsOfId(zj.Tips.TAG.LEAGUE, zj.Tips.TAG.LEAGUE_MALL);
            }
            else if (index == zj.TableEnum.Enum.Mall.LOTTERY) {
                var times = zj.Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
                if (times < 3) {
                    return false;
                }
                else {
                    //return Tips.GetTipsOfId(Tips.TAG.TREAUSER, 2);
                    return false;
                }
            }
            else if (index == zj.TableEnum.Enum.Mall.HONOR) {
                return true && zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WORLD_FIRST) && zj.Tips.GetTipsOfId(zj.Tips.TAG.LADDER, 6);
            }
        };
        //单个商店数据
        ShopMallDialog._mall_data = [];
        return ShopMallDialog;
    }(zj.Dialog));
    zj.ShopMallDialog = ShopMallDialog;
    __reflect(ShopMallDialog.prototype, "zj.ShopMallDialog");
})(zj || (zj = {}));
//# sourceMappingURL=ShopMallDialog.js.map