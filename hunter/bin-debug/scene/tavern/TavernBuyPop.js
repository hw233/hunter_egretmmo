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
    //Tavern BuyPop
    //hexiaowei
    //2018/11/12
    var TavernBuyPop = (function (_super) {
        __extends(TavernBuyPop, _super);
        function TavernBuyPop() {
            var _this = _super.call(this) || this;
            _this.resunm = 2;
            _this.count = 1;
            _this.goodId = 0;
            _this.num = 0;
            _this.MIN_COUNT = 1;
            _this.MAX_COUNT = 10;
            _this.skinName = "resource/skins/tavern/TavernBuyPopSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.resunm = 0;
            return _this;
        }
        //添加龙骨动画
        TavernBuyPop.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        TavernBuyPop.prototype.init = function (tavern) {
            this.tavern = tavern;
            this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
            this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
            this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
        };
        TavernBuyPop.prototype.setInfo = function (goodId, num, typestate) {
            var _this = this;
            this.num = num;
            this.goodId = goodId;
            if (typestate == 1) {
                this.count = 1;
            }
            else {
                this.count = 10 - num;
            }
            if (this.count <= 0) {
                this.count = 1;
            }
            this.setInfoMall();
            var OnAbovePop = function () {
                if (_this.goodId == message.EResourceType.RESOURCE_PROMISE) {
                    var canBuyNum = 0;
                    var xuyuanTbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json");
                    var quickMallInfo = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.fastMall + ".json")[message.EResourceType.RESOURCE_PROMISE];
                    var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % Object.keys(xuyuanTbl).length;
                    index = index == 0 && Object.keys(xuyuanTbl).length || index;
                    var openIndex = index;
                    var xuyuanTbl0 = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.xuyuan_random + ".json")[openIndex];
                    if (xuyuanTbl != null) {
                        var maxTime = xuyuanTbl0.max_time;
                        var useTime = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
                        var ownNum = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
                        canBuyNum = maxTime - useTime - ownNum;
                        var tokenCanBuyNum = Math.floor(zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num);
                        canBuyNum = canBuyNum < tokenCanBuyNum ? canBuyNum : tokenCanBuyNum;
                        canBuyNum = canBuyNum > 99 ? 99 : canBuyNum;
                        _this.MAX_COUNT = canBuyNum;
                    }
                }
            };
            OnAbovePop();
        };
        TavernBuyPop.prototype.setInfoMall = function () {
            var tbl = zj.TableQuickMall.Table();
            var restbl = zj.TableItemResource.Table();
            var consumeType = tbl[this.goodId].consume_type;
            var resNum = tbl[this.goodId].consume_num;
            this.resunm = resNum;
            var itemIcon = restbl[consumeType].icon;
            var count = zj.Game.PlayerInfoSystem.Beer;
            //this.labelPossessBeelNum.text = this.count.toString();
            this.labelPossessBeelNum.text = this.num.toString();
            //let itemSet = itemdb.Set(this._goodId, 1, count);
            var str_count = zj.HelpUtil.textConfigFormat("%s%d", zj.TextsConfig.TextsConfig_Mall.buy_count, count);
            this.spriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.itemFrame[zj.PlayerItemSystem.ItemQuality(this.goodId)], this);
            //this.spriteFrame.source = cachekey(UIConfig.UIConfig_Common.nothing , this) ;
            var item = zj.PlayerItemSystem.Item(this.goodId);
            this.spriteLogo.source = zj.cachekey(zj.UIConfig.UIConfig_Common.nothing, this);
            this.textName.text = item.name;
            //this.textNum.text = count.toString();
            this.textOwn.text = str_count;
            this.textInfo.text = item.des;
            this.textCost2.text = (this.count * resNum).toString();
            this.spriteCost2.source = zj.cachekey(itemIcon, this);
            this.textCount.text = this.count.toString();
            this.spriteIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.goodId), this);
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupBeer);
        };
        TavernBuyPop.prototype.onBtnSub = function () {
            if (this.count > 1) {
                this.count -= 1;
            }
            this.setInfoCount();
        };
        TavernBuyPop.prototype.onBtnAdd = function () {
            if (this.count < this.MAX_COUNT) {
                this.count += 1;
            }
            this.setInfoCount();
        };
        TavernBuyPop.prototype.setInfoCount = function () {
            this.textCount.text = this.count.toString();
            this.textCost2.text = (this.count * this.resunm).toString();
        };
        TavernBuyPop.prototype.onBtnMax = function () {
            this.count = Math.floor(zj.Game.PlayerInfoSystem.Token / this.resunm);
            if (this.count == 0) {
                this.count = 1;
            }
            if (this.count > 10) {
                this.count = this.MAX_COUNT;
            }
            this.setInfoCount();
        };
        TavernBuyPop.prototype.onBtnBuy = function () {
            this.reqConvert();
        };
        TavernBuyPop.prototype.reqConvert = function () {
            var _this = this;
            zj.PlayerInfoSystem.buyBeer(this.goodId, this.count)
                .then(function (data) {
                _this.buyBeerResolve(data);
            }).catch(function (toast) {
                if (toast == message.EC.XG_GOODS_NOT_ENOUGH || toast == message.EC.XG_LACK_TOKEN) {
                    zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                        setTimeout(function () {
                            call_1();
                        }, 450);
                    });
                    var call_1 = function () {
                        zj.loadUI(zj.PayMallScene)
                            .then(function (scene) {
                            scene.show(zj.UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                    };
                }
                else {
                    zj.toast_warning(zj.Game.ConfigManager.getAone2CodeReason(toast));
                }
            });
            //this.compose(this._goodId, this._count);
            this.tavern.setUI();
        };
        TavernBuyPop.prototype.buyBeerResolve = function (data) {
            if (data.header.result == 0) {
                if (data.body.gameInfo.getGoods != null) {
                    this.close(zj.UI.HIDE_TO_TOP);
                    this.tavern.setUI();
                    setTimeout(function () {
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                        });
                    }, 300);
                }
            }
            else if (data.header.result == message.EC.XG_GOODS_NOT_ENOUGH || data.header.result == message.EC.XG_LACK_TOKEN) {
                zj.TipManager.ShowConfirmCancel(zj.TextsConfig.TextsConfig_Money.demstone, function () {
                    setTimeout(function () {
                        call_2();
                    }, 450);
                });
                var call_2 = function () {
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init();
                    });
                };
            }
        };
        TavernBuyPop.prototype.onBtnClose = function () {
            //this._tavern.removeChild(this);   
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return TavernBuyPop;
    }(zj.Dialog));
    zj.TavernBuyPop = TavernBuyPop;
    __reflect(TavernBuyPop.prototype, "zj.TavernBuyPop");
})(zj || (zj = {}));
//# sourceMappingURL=TavernBuyPop.js.map