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
     * @author xing li wei
     *
     * @date 2019-5-24
     *
     * @class 贪婪之岛包裹
     */
    var CommonOneKeySell = (function (_super) {
        __extends(CommonOneKeySell, _super);
        function CommonOneKeySell() {
            var _this = _super.call(this) || this;
            _this.fruitMax = 100;
            _this.cost = 0;
            _this.skinName = "resource/skins/common/CommonOneKeySellSkin.exml";
            _this.init();
            return _this;
        }
        CommonOneKeySell.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
        };
        CommonOneKeySell.prototype.SetInfo = function (type, cb) {
            var _this = this;
            this.type = type;
            this.cb = cb;
            this.SetInfoSell();
            if (this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                this.function = function (getGoods) {
                    _this.SetInfoSell();
                };
            }
        };
        CommonOneKeySell.prototype.SetInfoSell = function () {
            if (this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                this.LabelTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_fruit_tips);
                this.labelFruitTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_fruit_nor);
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Demon) {
                this.LabelTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_demon_tips);
                this.labelFruitTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_demon_nor);
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                this.LabelTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_nor_tips);
                this.labelFruitTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_rogue_nor);
            }
            else {
                this.LabelTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_nor_tips);
            }
            this.labelFruitTips.visible = (this.type == zj.TableEnum.Enum.OneKeySell.Fruit || this.type == zj.TableEnum.Enum.OneKeySell.Demon || this.type == zj.TableEnum.Enum.OneKeySell.Rogue);
            this.groupRes.visible = (this.type != zj.TableEnum.Enum.OneKeySell.Fruit && this.type != zj.TableEnum.Enum.OneKeySell.Demon && this.type != zj.TableEnum.Enum.OneKeySell.Rogue);
            //set prop
            var props = {};
            if (this.type == zj.TableEnum.Enum.OneKeySell.MONEY) {
                props = zj.TableEnum.Enum.PropMoney;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.CRYSTAL) {
                props = zj.TableEnum.Enum.PropCRYSTAL;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Qi) {
                props = zj.TableEnum.Enum.PropQi;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                props = zj.Game.PlayerItemSystem.GetWonderlandFruit();
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Demon) {
                props = zj.Game.PlayerItemSystem.GetWonderlandDemon();
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                props = zj.Game.PlayerItemSystem.GetWonderlandRogue();
            }
            var item_count = 0;
            //set goods
            var _goods = [];
            for (var k in props) {
                if (props.hasOwnProperty(k)) {
                    var v = props[k];
                    if (zj.Game.PlayerCardSystem.goodsMap[v].count != 0) {
                        item_count = item_count + zj.Game.PlayerCardSystem.goodsMap[v].count;
                        if (item_count > this.fruitMax && this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                            this.labelFruitTips.text = (zj.TextsConfig.TextsConfig_Common.one_key_fruit_max);
                            if (zj.Game.PlayerCardSystem.goodsMap[v].count - (item_count - this.fruitMax) == 0) {
                                break;
                            }
                            else {
                                var goods_1 = new message.GoodsInfo();
                                goods_1.goodsId = v;
                                goods_1.count = zj.Game.PlayerCardSystem.goodsMap[v].count - (item_count - this.fruitMax);
                                goods_1.index = 0;
                                goods_1.showType = 0;
                                _goods.push(goods_1);
                            }
                        }
                        var goods = new message.GoodsInfo();
                        goods.goodsId = v;
                        goods.count = zj.Game.PlayerCardSystem.goodsMap[v].count;
                        goods.index = 0;
                        goods.showType = 0;
                        _goods.push(goods);
                    }
                }
            }
            this.goods = _goods;
            //fix goods
            var lc_tbl = zj.Table.DeepCopy(this.goods);
            var fix = zj.PlayerItemSystem.FixCount(this.goods.length, 4, 1);
            for (var i = 0; i < fix; i++) {
                lc_tbl.push(0);
            }
            // set list
            var array = new eui.ArrayCollection();
            for (var i = 0; i < lc_tbl.length; i++) {
                var data = new zj.CommonOneKeySellItemData();
                data.goods = lc_tbl[i];
                array.addItem(data);
            }
            this.listViewItem.itemRenderer = zj.CommonOneKeySellItem;
            this.listViewItem.dataProvider = array;
            //set cost
            if (this.type == zj.TableEnum.Enum.OneKeySell.MONEY) {
                this.cost = zj.Table.Count(_goods, function (i) {
                    var table = zj.PlayerItemSystem.Item(_goods[i].goodsId);
                    return table.money * _goods[i].count;
                });
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.CRYSTAL) {
                this.cost = zj.Table.Count(_goods, function (i) {
                    var table = zj.PlayerItemSystem.Item(_goods[i].goodsId);
                    return table.crystal_soul * _goods[i].count;
                });
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Qi) {
                this.cost = zj.Table.Count(_goods, function (i) {
                    var table = zj.PlayerItemSystem.Item(_goods[i].goodsId);
                    return table.vital_qi * _goods[i].count;
                });
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                this.cost = 0;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Demon) {
                this.cost = 0;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                this.cost = 0;
            }
            this.labelCose.text = this.cost.toString();
            //set path
            var path = "";
            if (this.type == zj.TableEnum.Enum.OneKeySell.MONEY) {
                var a = zj.PlayerItemSystem.Item(message.EResourceType.RESOURCE_MONEY);
                path = a.icon;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.CRYSTAL) {
                // path = PlayerItemSystem.Item(message.EResourceType.RESOURCE_CRYSTALSOUL).icon
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                var a = zj.PlayerItemSystem.Item(message.EResourceType.RESOURCE_TOKEN);
                path = a.icon;
            }
            this.imgCost.source = zj.cachekey(path, this);
            //set type
            if (this.type == zj.TableEnum.Enum.OneKeySell.MONEY) {
                this.res = message.EResourceType.RESOURCE_MONEY;
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.CRYSTAL) {
                // this.res = message.EResourceType.RESOURCE_CRYSTALSOUL
                zj.toast_warning("有错误");
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Qi) {
                // this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
                zj.toast_warning("有错误");
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Fruit) {
                // this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
                zj.toast_warning("有错误");
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Demon) {
                // this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
                zj.toast_warning("有错误");
            }
            else if (this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                this.res = message.EResourceType.RESOURCE_TOKEN;
            }
        };
        CommonOneKeySell.prototype.onBtnConfirm = function () {
            var _this = this;
            this.UsePropReqBody()
                .then(function (gameInfo) {
                if (_this.function) {
                    _this.function(gameInfo.getGoods);
                }
                else {
                    if (_this.type == zj.TableEnum.Enum.OneKeySell.Fruit || _this.type == zj.TableEnum.Enum.OneKeySell.Demon || _this.type == zj.TableEnum.Enum.OneKeySell.Rogue) {
                        var get_goods_1 = [];
                        get_goods_1 = zj.Table.copy(gameInfo.getGoods);
                        get_goods_1.sort(function (a, b) {
                            var aa = zj.PlayerItemSystem.Set(a.goodsId).Info;
                            var bb = zj.PlayerItemSystem.Set(b.goodsId).Info;
                            return a.quality - b.quality;
                        });
                        _this.close();
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(get_goods_1);
                            dialog.setCB(_this.cb);
                            dialog.show();
                        });
                    }
                    else {
                        zj.Common_ShortMsg.promptBattleValue("+" + _this.cost, _this.res, zj.UIManager.StageHeight / 2);
                        _this.close(zj.UI.HIDE_TRAIL_OFF);
                        if (_this.cb) {
                            _this.cb();
                        }
                    }
                }
            }).catch(function () {
            });
        };
        CommonOneKeySell.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        CommonOneKeySell.prototype.UsePropReqBody = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.UsePropRequest();
                request.body.goodses = zj.Table.copy(_this.goods);
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        return CommonOneKeySell;
    }(zj.Dialog));
    zj.CommonOneKeySell = CommonOneKeySell;
    __reflect(CommonOneKeySell.prototype, "zj.CommonOneKeySell");
})(zj || (zj = {}));
//# sourceMappingURL=CommonOneKeySell.js.map