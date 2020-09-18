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
     * 日常活跃度奖励预览
     * created by Lian Lei
     * 2019.03.19
     */
    var Daily_AwardPop = (function (_super) {
        __extends(Daily_AwardPop, _super);
        function Daily_AwardPop() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/daily/Daily_AwardPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        Daily_AwardPop.prototype.setInfoActive = function (activeId) {
            var tbl = zj.TableMissionActive.Table();
            var goods = tbl[activeId].reward_goods;
            this.listAwardData.removeAll();
            for (var i = 0; i < goods.length; i++) {
                var itemData = new zj.Daily_AwardPopItemData();
                itemData.goodsId = goods[i][0];
                itemData.count = goods[i][1];
                itemData.noName = null;
                itemData.needDetail = true;
                itemData.father = this;
                this.listAwardData.addItem(itemData);
            }
            var layout = new eui.HorizontalLayout();
            layout.verticalAlign = "middle";
            layout.horizontalAlign = "center";
            layout.gap = 6;
            // 1~4个商品时，居中显示特殊处理
            if (goods.length > 0 && goods.length < 5) {
                var width = 130;
                switch (goods.length) {
                    case 1:
                        {
                            layout.paddingLeft = this.listAward.width / 2 - width / 2;
                        }
                        ;
                        break;
                    case 2:
                        {
                            layout.paddingLeft = this.listAward.width / 2 - width - layout.gap / 2;
                        }
                        ;
                        break;
                    case 3:
                        {
                            layout.paddingLeft = this.listAward.width / 2 - width * 3 / 2 - layout.gap;
                        }
                        ;
                        break;
                    case 4:
                        {
                            layout.paddingLeft = this.listAward.width / 2 - width * 2 - layout.gap * 3 / 2;
                        }
                        ;
                        break;
                }
            }
            this.listAward.layout = layout;
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Daily_AwardPopItem;
        };
        Daily_AwardPop.prototype.SetInfoGift = function (goods, bFinish, ismissionnewReward, father, cb) {
            this.bFinish = bFinish;
            this.father = father;
            this.cb = cb;
            this.ismissionnewReward = ismissionnewReward;
            for (var k in goods) {
                if (goods.hasOwnProperty(k)) {
                    var v = goods[k];
                    this.listAwardData.removeAll();
                    for (var i = 0; i < goods.length; i++) {
                        var itemData = new zj.Daily_AwardPopItemData();
                        itemData.goodsId = goods[i].goodsId;
                        itemData.count = goods[i].count;
                        itemData.noName = null;
                        itemData.needDetail = true;
                        itemData.father = this;
                        this.listAwardData.addItem(itemData);
                    }
                    this.listAward.dataProvider = this.listAwardData;
                    this.listAward.itemRenderer = zj.Daily_AwardPopItem;
                }
            }
            if (this.bFinish && this.bFinish != null && !ismissionnewReward) {
                var path1 = zj.UIConfig.UIConfig_Activity.buttonGet2[1];
                var path2 = zj.UIConfig.UIConfig_Activity.buttonGet2[2];
                zj.Set.ButtonBackgroud(this.btnClose, path1, path2, path1);
            }
            else {
                var path1 = zj.UIConfig.UIConfig_Activity.bknow[1];
                var path2 = zj.UIConfig.UIConfig_Activity.bknow[2];
                zj.Set.ButtonBackgroud(this.btnClose, path1, path2, path1);
            }
        };
        Daily_AwardPop.prototype.onBtnClose = function () {
            if (this.bFinish && !this.ismissionnewReward) {
                this.reqRewardEnd();
            }
            else {
                if (this.cb) {
                    this.cb();
                }
                this.close(zj.UI.HIDE_TO_TOP);
            }
        };
        Daily_AwardPop.prototype.reqRewardEnd = function () {
            var _this = this;
            this.missionNew().then(function (response) {
                var goods = zj.Table.DeepCopy(response.body.gameInfo.getGoods);
                var hero = zj.Table.FindR(goods, function (k, v) {
                    return zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                });
                if (hero[0] != null) {
                    zj.loadUI(zj.CommonGetGeneral)
                        .then(function (dialog) {
                        dialog.setInfo(hero[0].goodsId, null, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(goods);
                                dialog.setCB(function () {
                                    _this.close(zj.UI.HIDE_TO_TOP);
                                    if (_this.cb) {
                                        _this.cb();
                                    }
                                });
                                dialog.show(zj.UI.SHOW_FROM_TOP);
                            });
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(goods);
                        dialog.setCB(function () {
                            _this.close(zj.UI.HIDE_TO_TOP);
                            if (_this.cb) {
                                _this.cb();
                            }
                        });
                        dialog.show();
                    });
                }
            }).catch(function () {
            });
        };
        Daily_AwardPop.prototype.missionNew = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MissionNewRequest();
                request.body.mission_type = _this.father.missionType;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        Daily_AwardPop.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        Daily_AwardPop.prototype.showGoodsProperty = function (ev) {
            if (zj.Game.UIManager.dialogCount() > 1)
                return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Daily_AwardPop;
    }(zj.Dialog));
    zj.Daily_AwardPop = Daily_AwardPop;
    __reflect(Daily_AwardPop.prototype, "zj.Daily_AwardPop");
})(zj || (zj = {}));
//# sourceMappingURL=Daily_AwardPop.js.map