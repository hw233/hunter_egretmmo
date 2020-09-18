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
    //RelicMall_Main (晶石商店)
    //hexiaowei
    // 2019/03/08
    var RelicMall_Main = (function (_super) {
        __extends(RelicMall_Main, _super);
        function RelicMall_Main() {
            var _this = _super.call(this) || this;
            _this.selectedIndex = 0;
            _this.itemIndex = 7;
            //创建一个计时器对象
            _this.timer = new egret.Timer(1000, 0);
            _this.skinName = "resource/skins/darkLand/RelicMall_MainSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.listInfo.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.AddShopmallList, _this);
            _this.buttonFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.buttonRefresh, _this);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.setUpdateTime, _this);
            _this.timer.start();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.timer.stop();
                egret.Tween.removeTweens(_this);
            }, _this);
            _this.setInfo();
            return _this;
        }
        RelicMall_Main.prototype.setInfo = function () {
            this.isNumber = Math.floor(egret.getTimer() / 1000);
            this.setInfoReset();
            this.reqMallBefore();
            this.setInfoLocate();
        };
        //设置本地数据
        RelicMall_Main.prototype.setInfoLocate = function () {
            this.setUpdate();
            //this.setInfoFresh()
        };
        //更新
        RelicMall_Main.prototype.setUpdate = function () {
            this.setUpdateRes();
            this.setUpdateTime();
        };
        //更新资源信息
        RelicMall_Main.prototype.setUpdateRes = function () {
            var index = 7;
            var id = message.EResourceType.RESOURCE_RELIC_COIN;
            var str_res = zj.PlayerItemSystem.Str_Resoure(id);
            this.nowMoney = Number(str_res);
            var item = zj.PlayerItemSystem.Item(id);
            var path_icon = item.icon;
            this.labelToken.text = str_res;
            this.imageCost.source = zj.cachekey(path_icon, this);
        };
        //更新刷新时间
        RelicMall_Main.prototype.setUpdateTime = function () {
            var index = 7;
            var progess = message.EProcessType.PROCESS_TYPE_MALL_RELIC;
            var time = zj.Game.PlayerProgressesSystem.progressMap[progess].leftTime + this.isNumber;
            time = time - Math.floor(egret.getTimer() / 1000);
            var str_time = zj.Helper.GetTimeStr(time, false);
            this.labelTime.text = str_time;
            if (time <= 0) {
                this.timer.stop();
                this.reqProcessVisit();
            }
        };
        // //设置提示文字
        // private setInfoFresh(){
        //     let str_time = TextsConfig.TextsConfig_Mall.fourfreshs;
        // }
        //设置商品列表
        RelicMall_Main.prototype.setInfoMall = function () {
            this.listInfo.selectedIndex = 0; // 默认选中
            this.listInfo.itemRenderer = zj.RelicMall_MainItem; //
            this.selectedItem = new eui.ArrayCollection();
            for (var k in this.mall_list) {
                var data = new zj.RelicMall_MainItemData();
                data.mallitem = this.mall_list[k];
                data.relicmallmain = this;
                this.selectedItem.addItem(data);
            }
            this.listInfo.dataProvider = this.selectedItem;
            this.selectedIndex = this.listInfo.selectedIndex;
        };
        RelicMall_Main.prototype.reqProcessVisit = function () {
            var _this = this;
            zj.PlayerDarkSystem.ReqProcess()
                .then(function (data) {
                _this.reqMallBefore();
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        RelicMall_Main.prototype.reqMallBefore = function () {
            var _this = this;
            zj.PlayerDarkSystem.reqMall()
                .then(function (data) {
                _this.timer.start();
                _this.mall_list = data.items;
                _this.setInfoMall();
                _this.setInfoReset();
                _this.setUpdateRes();
            })
                .catch(function (reason) { zj.toast_warning(reason); });
        };
        //折扣
        RelicMall_Main.prototype.getDiscount = function () {
            return false;
        };
        //不限制购买
        RelicMall_Main.prototype.getLimit = function () {
            return false;
        };
        RelicMall_Main.prototype.getMallRemain = function (id) {
            var remain = 0;
            for (var k in this.mall_list) {
                var v = this.mall_list[k];
                if (v.mall_id == id) {
                    remain = v.remain;
                }
            }
            return remain;
        };
        // 设置刷新花费
        RelicMall_Main.prototype.setInfoReset = function () {
            var countMall = [zj.Game.PlayerVIPSystem.vipInfo.mall_ordinary_time, 0, 0, 0, 0];
            var mall = message.EMallType.MALL_TYPE_RELIC;
            var count = zj.Game.PlayerVIPSystem.vipInfo.mall_relic_time;
            var str_count = zj.CommonConfig.mall_refresh_token(mall, count);
            this.labelCost.text = str_count[0].toString();
            this.numberMoney = str_count[0];
            var bNotVipOpenSecret = false;
            var str_refresh = zj.TextsConfig.TextsConfig_Mall.mall_refresh;
            this.labelRefresh.text = str_refresh;
            // let bHide = false
            // self.nodeRefresh:setVisible(not bHide)
            var freshLastTime = zj.PlayerVIPSystem.ItemNew().mall_relic_time - count;
            this.labelRefreshTimes.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.relic.mallLastFresh, freshLastTime);
        };
        //点击购买物品
        RelicMall_Main.prototype.buy = function (mallId, count) {
            var _this = this;
            var type = 7;
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
                _this.reqMallBefore();
            })
                .catch(function (reason) { });
        };
        //购买商品界面
        RelicMall_Main.prototype.AddShopmallList = function (e) {
            var _this = this;
            if (this.selectedIndex != this.listInfo.selectedIndex) {
                this.selectedItem.itemUpdated(this.selectedItem.source[this.selectedIndex]);
                this.selectedItem.itemUpdated(this.selectedItem.source[this.listInfo.selectedIndex]);
                this.selectedIndex = this.listInfo.selectedIndex;
            }
            var tbl = zj.TableQuickMall.Table();
            var lastData = this.mall_list[this.selectedIndex];
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
        //刷新商品
        RelicMall_Main.prototype.buttonRefresh = function () {
            var _this = this;
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Mall.refresh_confirm2, _this.labelCost.text));
                dialog.setCB(function () {
                    var a = _this.numberMoney;
                    if (_this.numberMoney > _this.nowMoney) {
                        zj.loadUI(zj.ConfirmCancelDialog)
                            .then(function (dialog) {
                            dialog.setInfo(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Money.demstone));
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                        });
                    }
                    else {
                        zj.PlayerProgressesSystem.ReqRefresh(7)
                            .then(function (data) {
                            _this.setInfo();
                        });
                    }
                });
                dialog.show(zj.UI.SHOW_FILL_OUT);
            });
        };
        RelicMall_Main.prototype.onButtonClose = function () {
            this.timer.stop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return RelicMall_Main;
    }(zj.Dialog));
    zj.RelicMall_Main = RelicMall_Main;
    __reflect(RelicMall_Main.prototype, "zj.RelicMall_Main");
})(zj || (zj = {}));
//# sourceMappingURL=RelicMall_Main.js.map