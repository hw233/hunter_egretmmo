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
     * @author wang shen zhuo
     *
     * @date 2019-05-21
     *
     * @class
     */
    var ExchangeMainRight = (function (_super) {
        __extends(ExchangeMainRight, _super);
        function ExchangeMainRight() {
            var _this = _super.call(this) || this;
            _this.num = 0;
            _this.groupNode = [];
            _this.CB = null;
            _this.skinName = "resource/skins/fishing/ExchangeMainRightSkin.exml";
            _this.buttonExchange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonExchange, _this);
            _this.groupNode = [
                _this.group1,
                _this.group2,
                _this.group3,
            ];
            return _this;
        }
        ExchangeMainRight.prototype.SetInfo = function (father) {
            this.buttonExchange.touchEnabled = true;
            this.father = father;
            this.SetInfoState();
            this.SetInfoUI();
        };
        ExchangeMainRight.prototype.SetInfoState = function () {
            var valueNum = 0;
            if (this.father.getList != null) {
                var listId_1 = this.father.getList.id;
                this.convert = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls, function (k, v) {
                    return listId_1 == v.key;
                });
                if (this.convert[0] != null) {
                    valueNum = this.convert[0].value;
                }
                var can_convert = this.convert == null && true || (valueNum < this.father.getList.exchange_times);
                this.buttonExchange.enabled = can_convert;
                this.labelExchangeTime.visible = (this.convert[0] != null);
                if (this.convert[0] != null) {
                    if (can_convert) {
                        if (this.father.getList.is_only == 1) {
                            this.labelExchangeTime.text = zj.TextsConfig.TextsConfig_Convert.once_buy;
                        }
                        else if (this.father.getList.daily_refresh == 1) {
                            this.labelExchangeTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.t_day_times, this.father.getList.exchange_times - valueNum);
                        }
                        else if (this.father.getList.week_refresh == 1) {
                            this.labelExchangeTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Convert.t_week_times, this.father.getList.exchange_times - valueNum);
                        }
                    }
                    else {
                        if (this.father.getList.is_only == 1) {
                            this.labelExchangeTime.text = zj.TextsConfig.TextsConfig_Convert.once_buy;
                        }
                        else if (this.father.getList.daily_refresh == 1) {
                            this.labelExchangeTime.text = zj.TextsConfig.TextsConfig_Convert.day_times_sold_out;
                        }
                        else if (this.father.getList.week_refresh == 1) {
                            this.labelExchangeTime.text = zj.TextsConfig.TextsConfig_Convert.week_times_sold_out;
                        }
                    }
                }
            }
            else {
                this.buttonExchange.enabled = false;
                this.labelExchangeTime.visible = false;
            }
        };
        ExchangeMainRight.prototype.SetInfoUI = function () {
            var num = 3;
            var isVisible = true;
            if (this.father.getList != null) {
                if (this.father.getList.exchange_goods >= 5) {
                    num = 5;
                }
                else if (this.father.getList.exchange_goods < 3) {
                    num = 3;
                }
                else {
                    num = this.father.getList.exchange_goods.length;
                }
            }
            else {
                isVisible = false;
            }
            this.num = num;
            this.imageBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Random.board[num], this);
            if (isVisible) {
                for (var k in this.groupNode) {
                    var v = this.groupNode[k];
                    // v.visible = (Number(k) + 2 == num);
                }
                this.group1.removeChildren();
                this.group2.removeChildren();
                this.group3.removeChildren();
                for (var i = 0; i < num; i++) {
                    var exchangeNeedItem_1 = new zj.ExchangeNeedItem();
                    this["group" + (i + 1)].addChild(exchangeNeedItem_1);
                    exchangeNeedItem_1.x = -50;
                    exchangeNeedItem_1.y = -10;
                    exchangeNeedItem_1.SetFather(this);
                    exchangeNeedItem_1.SetInfo(i, false, i + 1);
                }
                this.groupMidB.removeChildren();
                var exchangeNeedItem = new zj.ExchangeNeedItem();
                this.groupMidB.addChild(exchangeNeedItem);
                exchangeNeedItem.x = -50;
                exchangeNeedItem.y = -10;
                exchangeNeedItem.SetFather(this);
                exchangeNeedItem.SetInfo(null, true, 10);
            }
        };
        ExchangeMainRight.prototype.onButtonExchange = function () {
            if (zj.PlayerConvertSystem.CanConvert(this.father.getList.id)) {
                this.buttonExchange.touchEnabled = false;
                this.father.imageBack.visible = true;
                this.father.ReqExchangeMall();
            }
            else {
                this.buttonExchange.touchEnabled = true;
                this.father.imageBack.visible = false;
                zj.toast_warning(zj.TextsConfig.TextsConfig_Convert.not_enough);
            }
        };
        ExchangeMainRight.prototype.SetInfoAni = function (cb) {
            var _this = this;
            var cssName = zj.TableClientAniCssSource.Item(3005);
            var names = cssName.name;
            var str = "00" + ((this.num - 3) * 2) + "_duihua0" + (this.num - 3);
            zj.Game.DragonBonesManager.playAnimation(this, names, "armatureName", str, 1)
                .then(function (display) {
                display.x = 40;
                display.y = 40;
                _this.groupMidB.addChild(display);
            });
            zj.Game.DragonBonesManager.playAnimation(this, names, "armatureName", "001_duihua_di_00", 1)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    if (cb != null) {
                        cb();
                    }
                    _this.buttonExchange.touchEnabled = true;
                }, _this);
                armatureDisplay.x = 40;
                armatureDisplay.y = 40;
                _this.groupMidB.addChild(armatureDisplay);
            });
        };
        return ExchangeMainRight;
    }(zj.UI));
    zj.ExchangeMainRight = ExchangeMainRight;
    __reflect(ExchangeMainRight.prototype, "zj.ExchangeMainRight");
})(zj || (zj = {}));
//# sourceMappingURL=ExchangeMainRight.js.map