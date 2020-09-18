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
     * @class 开服七天乐
     *
     * @author LianLei
     *
     * @date 2019-12-04
     */
    var ActivityHappySeven = (function (_super) {
        __extends(ActivityHappySeven, _super);
        function ActivityHappySeven() {
            var _this = _super.call(this) || this;
            _this.listAwardData = new eui.ArrayCollection();
            _this.day = 0;
            _this.timer = 0;
            _this.sevenDay = 1; // 相对凌晨四点现在是创建号的第几天
            _this.skinName = "resource/skins/activity/ActivityHappySevenSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_POWER_CHANGE, _this.update, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.update, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGold, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddStrength, _this);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.init, _this);
            for (var i = 1; i <= 7; i++)
                _this["day" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this["onBtnDay" + i], _this);
            _this.timer = egret.setInterval(_this.updateDay, _this, 1000);
            _this.init();
            return _this;
        }
        ActivityHappySeven.prototype.init = function () {
            this.updateDay();
            this.setInfo();
            this.setAward(null);
            this.update();
        };
        ActivityHappySeven.prototype.updateDay = function () {
            var day = zj.Helper.getDayIdx(zj.Game.PlayerInfoSystem.BaseInfo.createTime * 1000, zj.Game.Controller.curServerTime * 1000);
            if (day != 0 && day <= 7 && day != this.sevenDay) {
                this.sevenDay = Math.min(7, day);
                this.setInfo();
                this.setAward(null);
                this.update();
            }
            this.sevenDay = Math.min(7, day);
        };
        ActivityHappySeven.prototype.update = function () {
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                if (((zj.Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                    this.lbGold.text = ((zj.Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                if (((zj.Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                    this.lbGemstone.text = ((zj.Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
                }
                else {
                    this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
                }
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            var str = "";
            if (zj.Game.PlayerInfoSystem.Power > 100000) {
                if (((zj.Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((zj.Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                }
                else {
                    str += (zj.Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            }
            else {
                str += zj.Game.PlayerInfoSystem.Power.toString();
            }
            var str_energy = zj.Helper.StringFormat("%d/%d", str, (zj.TableLevel.Item(zj.Game.PlayerInfoSystem.Level).role_power + zj.PlayerVIPSystem.LowLevel().power_add));
            this.lbStrength.text = str_energy;
        };
        ActivityHappySeven.prototype.setInfo = function () {
            var awardInfo = zj.TableContinueLogin.Table();
            for (var key in awardInfo) {
                if (awardInfo.hasOwnProperty(key)) {
                    var element = awardInfo[key];
                    if (this["day" + element.dayIndex]) {
                        var bReward = element.dayIndex <= this.sevenDay && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(element.dayIndex) != -1; // 是否已经领取
                        var isHaveGot = element.dayIndex <= this.sevenDay && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(element.dayIndex) == -1; // 是否可领取
                        this["day" + element.dayIndex].setInfo(element, bReward, false, isHaveGot);
                    }
                }
            }
        };
        ActivityHappySeven.prototype.setAward = function (time) {
            var day = (time == null ? this.sevenDay : time);
            this.day = day;
            // let bReward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward, (k, v) => {
            //     return k == (this.day - 1) && v == 1;
            // });
            var bReward = this.day <= day && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.indexOf(this.day) != -1; // 是否已经领取
            this.btnGet.enabled = (this.day <= this.sevenDay && !bReward);
            this.btnGet.visible = !bReward;
            this.imgGet.visible = (this.imgGet.visible = (this.day <= this.sevenDay && bReward));
            var awardInfo = zj.TableContinueLogin.Item(this.day);
            if (!awardInfo)
                return;
            this.labelDay.text = day == 0 ? 1 + "" : this.day.toString();
            this.listAwardData.removeAll();
            for (var i = 0; i < awardInfo.reward_goods.length; i++)
                this.listAwardData.addItem({ goodsId: awardInfo.reward_goods[i], count: awardInfo.reward_count[i], showType: awardInfo.show_type[i], isAwardList: true });
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.ActivityHappySevenAwardItem;
        };
        ActivityHappySeven.prototype.onBtnGet = function () {
            var _this = this;
            var allGeneralHistory = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            var tbl = zj.TableContinueLogin.Table();
            // let day: number = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length == 0 ? 1 : Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
            zj.Game.PlayerMixUnitInfoSystem.loginReward(this.day).then(function (gameInfo) {
                if (gameInfo.getGoods.length > 0) {
                    var hasGeneral = false;
                    var goods_1 = null;
                    for (var _i = 0, _a = gameInfo.getGoods; _i < _a.length; _i++) {
                        var v = _a[_i];
                        if (Math.floor(v.goodsId / 10000) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                            hasGeneral = true;
                            goods_1 = v;
                            break;
                        }
                    }
                    if (hasGeneral && goods_1 != null) {
                        zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                            dialog.setInfo(goods_1.goodsId, 0, function () {
                                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                                    dialog.show();
                                    dialog.init(gameInfo.getGoods);
                                    dialog.setCB(function () { _this.init(); });
                                });
                            });
                            dialog.show(zj.UI.SHOW_FILL_OUT);
                            var general = zj.Table.FindK(allGeneralHistory, zj.PlayerHunterSystem.Table(goods_1.goodsId).general_id);
                            if (general == -1) {
                                // setTimeout(() => {
                                //     // 图鉴解锁成功
                                //     let ui = <TavernGetGeneralPop>newUI(TavernGetGeneralPop);
                                //     ui.setInof(goods);
                                //     this.addChild(ui);
                                //     egret.Tween.get(ui.group1)
                                //         .to({ alpha: 1 }, 100)
                                //         .to({ y: 10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .to({ y: -10 }, 150, egret.Ease.sineInOut)
                                //         .wait(300, false)
                                //         .call(() => { ui.close(); });
                                // }, 300);
                            }
                        });
                    }
                    else {
                        zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                            dialog.show();
                            dialog.init(gameInfo.getGoods);
                            dialog.setCB(function () { _this.init(); });
                        });
                    }
                }
            });
        };
        ActivityHappySeven.prototype.onBtnDay1 = function () {
            this.setAward(1);
        };
        ActivityHappySeven.prototype.onBtnDay2 = function () {
            this.setAward(2);
        };
        ActivityHappySeven.prototype.onBtnDay3 = function () {
            this.setAward(3);
        };
        ActivityHappySeven.prototype.onBtnDay4 = function () {
            this.setAward(4);
        };
        ActivityHappySeven.prototype.onBtnDay5 = function () {
            this.setAward(5);
        };
        ActivityHappySeven.prototype.onBtnDay6 = function () {
            this.setAward(6);
        };
        ActivityHappySeven.prototype.onBtnDay7 = function () {
            this.setAward(7);
        };
        ActivityHappySeven.prototype.onBtnClose = function () {
            egret.clearInterval(this.timer);
            this.timer = -1;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //添加金币
        ActivityHappySeven.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog).then(function (dialog) {
                dialog.SetInfoList(true);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivityHappySeven.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene).then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(true);
            });
        };
        ActivityHappySeven.prototype.onBtnAddStrength = function () {
            //增加体力
            zj.loadUI(zj.HXH_HunterUserStrength).then(function (dialog) {
                dialog.SetInfo();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        ActivityHappySeven.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        ActivityHappySeven.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return ActivityHappySeven;
    }(zj.Scene));
    zj.ActivityHappySeven = ActivityHappySeven;
    __reflect(ActivityHappySeven.prototype, "zj.ActivityHappySeven");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityHappySeven.js.map