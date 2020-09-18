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
    // 果实收集者 主界面
    // wangshenzhuo
    // 2019.05.18
    var ExchangeMainSence = (function (_super) {
        __extends(ExchangeMainSence, _super);
        function ExchangeMainSence() {
            var _this = _super.call(this) || this;
            _this.type = 1;
            _this.index = 1;
            _this.TableViewIndex = 0;
            _this.skinName = "resource/skins/fishing/ExchangeMainSenceSkin.exml";
            _this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_END, _this.onButtonClsse, _this);
            _this.listGood.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.buttonAward, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.imageBack.visible = false;
            _this.SetInfoList();
            _this.changeMainRight = new zj.ExchangeMainRight();
            _this.groupRight.addChild(_this.changeMainRight);
            _this.changeMainRight.name = "rightui";
            _this.changeMainRight.SetInfo(_this);
            zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.ExchangeMainRight" });
            return _this;
        }
        ;
        ExchangeMainSence.prototype.SetInfo = function (type, index) {
            this.type = type;
        };
        ExchangeMainSence.prototype.SetInfoList = function () {
            var infos = zj.PlayerConvertSystem.SortType(this.type);
            //当前不可兑换聚焦第一个
            if (!zj.PlayerConvertSystem.CanConvert(infos[this.index - 1].id) && (!zj.Teach.BeInTeaching())) {
                this.index = 1;
            }
            this.getList = infos[this.index - 1];
            this.listGood.selectedIndex = 0; // 默认选中
            this.listGood.itemRenderer = zj.ExchangeMainItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < infos.length; i++) {
                var data = new zj.ExchangeMainItemData();
                data.father = this;
                data.good = infos[i];
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listGood.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listGood.selectedIndex;
        };
        ExchangeMainSence.prototype.ReqExchangeMall = function () {
            var _this = this;
            var type;
            var id;
            if (this.getList != null) {
                type = this.getList.type;
                id = this.getList.id;
            }
            zj.PlayerConvertSystem.ExchangeMall_Visit(type, id).then(function (data) {
                var cb = function () {
                    var goods = new message.GoodsInfo();
                    goods.goodsId = _this.getList.reward_goods;
                    goods.count = _this.getList.reward_count;
                    var infos = zj.PlayerConvertSystem.SortType(_this.type);
                    //    let aaa = Table.FindR(infos , function(k , v) {
                    //        return v.id == this.getList.id;
                    //    })
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init([goods]);
                        dialog.show();
                        dialog.setCB(function () {
                            setTimeout(function () {
                                _this.SetInfoList();
                                _this.changeMainRight.SetInfo(_this);
                                _this.imageBack.visible = false;
                            }, 200);
                        });
                    });
                };
                zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls = data.body.gameInfo.mixUnitInfo[0].exchangeMalls;
                _this.changeMainRight.SetInfoAni(function () { cb(); });
            }).catch(function (reason) {
                _this.imageBack.visible = false;
            });
            // Teach.addTeaching();
        };
        ExchangeMainSence.prototype.showGoodsProperty = function (ev) {
            var goods = new message.GoodsInfo();
            goods.goodsId = ev.data.info.good.reward_goods;
            var show = zj.TipManager.ShowProp(goods, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        ExchangeMainSence.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        ExchangeMainSence.prototype.buttonAward = function (e) {
            if (this.TableViewIndex == this.listGood.selectedIndex) {
                return;
            }
            if (this.TableViewIndex != this.listGood.selectedIndex) {
                this.TableViewItem.itemUpdated(this.TableViewItem.source[this.TableViewIndex]);
                this.TableViewItem.itemUpdated(this.TableViewItem.source[this.listGood.selectedIndex]);
                this.TableViewIndex = this.listGood.selectedIndex;
            }
            this.index = this.TableViewIndex + 1;
            var infos = zj.PlayerConvertSystem.SortType(this.type);
            this.getList = infos[this.index - 1];
            this.changeMainRight.SetInfo(this);
        };
        // 鼠标点击 物品详情
        ExchangeMainSence.prototype.onChooseItemTap = function (isTouchBegin, goodsids, counts, itemIndex) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(goodsids);
            var dialog = this.groupRight.getChildByName("Item-skill-common");
            if (dialog)
                this.groupRight.removeChild(dialog);
            var posY = 0;
            var posX = 0;
            if (itemIndex == 1) {
                posY = 30;
                posX = -110;
            }
            else if (itemIndex == 2) {
                posX = 60;
                posY = 60;
            }
            else if (itemIndex == 3) {
                posX = 210;
                posY = 30;
            }
            else if (itemIndex == 10) {
                posX = 60;
                posY = -60;
            }
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsids, 2);
                        _this.groupRight.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsids, 2);
                        _this.groupRight.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsids, 2);
                        _this.groupRight.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.init(goodsids, 2);
                        _this.groupRight.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除 物品详情
        ExchangeMainSence.prototype.onRemoveAward = function () {
            var dialog = this.groupRight.getChildByName("Item-skill-common");
            if (dialog)
                this.groupRight.removeChild(dialog);
        };
        ExchangeMainSence.prototype.onButtonClsse = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            // this.groupRight.removeChildren();
        };
        ExchangeMainSence.prototype.CheckTeach = function (id) {
            var canConvernt = zj.PlayerConvertSystem.CanConvert(id);
            if (canConvernt) {
                var type = zj.TableExchangeMall.Item(id).type;
                var name_1 = null;
                if (type == 1) {
                    return [canConvernt, null];
                }
                else if (type == 2) {
                    return [canConvernt, "ButtonProp"];
                }
                else if (type == 3) {
                    return [canConvernt, "ButtonHunter"];
                }
            }
            else {
                return [canConvernt, null];
            }
        };
        ExchangeMainSence.prototype.FindIndexById = function (id) {
            var type = zj.TableExchangeMall.Item(id).type;
            var infos = zj.PlayerConvertSystem.SortType(type);
            // let [_v, _k] = Table.FindR(infos, function (k, v) {
            //     return v[0] == id;
            // });
            for (var i = 0; i < infos.length; i++) {
                if (infos[i].id == id) {
                    return i;
                }
            }
            return null;
        };
        ExchangeMainSence.prototype.getItemList = function () {
            this.itemList = [];
            var infos = zj.PlayerConvertSystem.SortType(this.type);
            for (var i = 0; i < infos.length; i++) {
                var item = this.listGood.getElementAt(i);
                this.itemList.push(item);
            }
        };
        return ExchangeMainSence;
    }(zj.Dialog));
    zj.ExchangeMainSence = ExchangeMainSence;
    __reflect(ExchangeMainSence.prototype, "zj.ExchangeMainSence");
})(zj || (zj = {}));
//# sourceMappingURL=ExchangeMainSence.js.map