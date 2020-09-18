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
    // 抓娃娃 -- 首页
    // wangshenzhuo
    // 2019/04/08
    var Activity_RandomBoomSence = (function (_super) {
        __extends(Activity_RandomBoomSence, _super);
        // private timer: egret.Timer;
        function Activity_RandomBoomSence() {
            var _this = _super.call(this) || this;
            _this.TableViewIndex = 0;
            _this.skinName = "resource/skins/activity/Activity_RandomBoomSenceSkin.exml";
            // //创建一个计时器对象
            // this.timer = new egret.Timer(999, 0);
            // //注册事件侦听器
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
            // this.timer.start();
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this);
            _this.buttonOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonOne, _this);
            _this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMore, _this);
            _this.groupGift.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onGroupGift, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.buttonChangeItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChange, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.SetFresh, _this);
            _this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRank, _this);
            _this.imageRect.visible = false;
            return _this;
        }
        Activity_RandomBoomSence.prototype.Init = function () {
            var _this = this;
            this.imageRect.visible = false;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_wawa_libao_eff", "armatureName", "000_libao", 0)
                .then(function (display) {
                display.x = _this.groupGift.x + display.width / 2 - 10;
                display.y = _this.groupGift.y + display.height / 2 - 13;
                _this.groupGift.addChild(display);
            });
            this.babyNum = 0;
            this.SetInfo();
            this.FreshRedTips();
            var info = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            if (info != null && zj.Game.Controller.curServerTime > info.openTime && zj.Game.Controller.curServerTime < info.closeTime && info.consumeType == message.ConsumeType.CONSUME_TYPE_INTEGRAL) {
                this.btnRank.visible = true;
            }
            else {
                this.btnRank.visible = false;
            }
        };
        Activity_RandomBoomSence.prototype.update = function () {
        };
        Activity_RandomBoomSence.prototype.SetInfo = function () {
            var _this = this;
            var randomTbl = zj.TableIntegralEgg.Table();
            var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info % Object.keys(randomTbl).length;
            index = index == 0 && Object.keys(randomTbl).length || index;
            this.topicId = index;
            this.leftTime = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].leftTime;
            var tblConsume = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.egg_random + ".json"); //读表
            this.curTopicInfo = tblConsume[this.topicId];
            this.page = 1;
            this.SetInfoGoodsList();
            this.SetInfoTime();
            this.SetFresh();
            this.addAnimatoin("ui_wawaji_eff", "000_daiji", 0, this.groupAni);
            if (this.groupLight1 != null && this.groupLight2 != null) {
                zj.Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "004_dengzu_02", 0)
                    .then(function (display) {
                    display.x = _this.groupLight1.x;
                    display.y = _this.groupLight1.y;
                    _this.groupLight1.addChild(display);
                });
                zj.Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "003_dengzu_01", 0)
                    .then(function (display) {
                    display.x = _this.groupLight2.x / 2;
                    display.y = 0;
                    _this.groupLight2.addChild(display);
                });
            }
        };
        Activity_RandomBoomSence.prototype.SetInfoGoodsList = function () {
            var goodsList1 = [];
            var goodsList2 = [];
            for (var k in this.curTopicInfo.client_goods) {
                var v = this.curTopicInfo.client_goods[k];
                var good = new message.GoodsInfo;
                good.goodsId = v[0];
                good.count = v[1];
                good.showType = 1;
                if (Number(k) <= 9) {
                    goodsList1.push(good);
                }
                else {
                    goodsList2.push(good);
                }
            }
            this.listTableView.selectedIndex = -1; // 默认选中
            this.listTableView.itemRenderer = zj.Activity_RandomBoomAwardItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < goodsList1.length; i++) {
                var data = new zj.Activity_RandomBoomAwardItemData();
                data.father = this;
                data.good = goodsList1[i];
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listTableView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableView.selectedIndex;
        };
        Activity_RandomBoomSence.prototype.SetInfoTime = function () {
            zj.Game.PlayerInstanceSystem.curServerTime = Date.parse(zj.Game.Controller.serverNow().toString());
            var begin_time = zj.Game.PlayerInstanceSystem.curServerTime + this.leftTime * 1000 - (this.curTopicInfo.subject_duration * 1000);
            var end_time = zj.Game.PlayerInstanceSystem.curServerTime + this.leftTime * 1000;
            var str_open = this.formatMsTimeCh(begin_time);
            var str_close = this.formatMsTimeCh(end_time);
            this.labelTextTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.wishing_tree_time, str_open, str_close);
            this.imageTitle.source = zj.cachekey(this.curTopicInfo.background, this);
        };
        Activity_RandomBoomSence.prototype.SetFresh = function () {
            var cur_score = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
            var b_first = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_isFree;
            if (!b_first) {
                this.labelOne.text = zj.TextsConfig.TextsConfig_Egg_Random.free;
            }
            else {
                this.labelOne.text = zj.Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
            }
            this.imageOne.visible = b_first;
            this.labelOne.visible = b_first;
            this.labelOneFree.visible = !b_first;
            this.labelMore.text = zj.Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
            this.labelCore.text = cur_score.toString();
            // this.imageNew.visible = true;
            this.imageNew.visible = zj.Tips.tips_Random_get(999);
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.lbGemstone.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.lbGemstone.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
        };
        //点击抓一次
        Activity_RandomBoomSence.prototype.onButtonOne = function () {
            this.AllGeneralHistory = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            this.imageRect.visible = true;
            this.babyNum = this.curTopicInfo.consume_token;
            this.LotteryReq(1);
        };
        //点击抓10次
        Activity_RandomBoomSence.prototype.onButtonMore = function () {
            this.AllGeneralHistory = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
            this.imageRect.visible = true;
            this.babyNum = 10 - zj.Game.PlayerInfoSystem.BaseInfo.dollCoin;
            this.LotteryReq(10);
        };
        Activity_RandomBoomSence.prototype.LotteryReq = function (time) {
            var _this = this;
            this.takeNum = time;
            zj.Game.PlayerInfoSystem.playAnnouce = false;
            this.IntegralLotteryReqBody_Visit(time).then(function (data) {
                if (data.header.result == 0) {
                    // let resetPosTbl = this.ResetFirstBlue(data.body.gameInfo.getGoods);
                    _this.SetInfoEggAni(data.body.gameInfo.getGoods);
                    _this.SetFresh();
                    _this.FreshRedTips();
                }
                else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    zj.Game.PlayerInfoSystem.playAnnouce = false;
                    _this.imageRect.visible = false;
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.init();
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.setCB(function () { _this.SetFresh(); });
                    });
                }
                else if (data.header.result == message.EC.XG_DOLL_COIN_NOT_ENOUGH) {
                    _this.imageRect.visible = false;
                    zj.loadUI(zj.TavernBuyPop)
                        .then(function (tavernBuyPop) {
                        tavernBuyPop.init(_this);
                        tavernBuyPop.setInfo(message.EResourceType.RESOURCE_DOLL_COIN, zj.Game.PlayerInfoSystem.BaseInfo.dollCoin, _this.babyNum);
                        tavernBuyPop.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    _this.imageRect.visible = false;
                }
            }).catch(function (reason) {
                if (reason == "猎人数量达到上限") {
                    zj.toast_warning(reason);
                    _this.imageRect.visible = false;
                }
            });
        };
        Activity_RandomBoomSence.prototype.setUI = function () {
        };
        Activity_RandomBoomSence.prototype.FreshRedTips = function () {
            if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone == null) {
                return;
            }
            var canConvert = false;
            var _loop_1 = function (k) {
                var v = this_1.curTopicInfo.exchange_goods[k];
                var num = (Number(k) - 1);
                var buy_times = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone, function (kk, vv) {
                    return vv.key == num;
                });
                var coreCanGet = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore >= this_1.curTopicInfo.exchange_integral[k];
                var timeCanGet = (buy_times[0] == null) || (buy_times[0].value < this_1.curTopicInfo.exchange_count[k]);
                if (coreCanGet && coreCanGet) {
                    canConvert = true;
                    return "break";
                }
            };
            var this_1 = this;
            for (var k in this.curTopicInfo.exchange_goods) {
                var state_1 = _loop_1(k);
                if (state_1 === "break")
                    break;
            }
            this.imgRedTip.visible = canConvert;
        };
        Activity_RandomBoomSence.prototype.SetInfoEggAni = function (goods) {
            var _this = this;
            var ani = null;
            if (this.takeNum == 1) {
                this.groupAni.removeChildren();
                // this.addAnimatoin("ui_wawaji_eff", "001_zhuaqu_01", 1, this.groupAni);
                zj.Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "001_zhuaqu_01", 1)
                    .then(function (display) {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this.animationEventBox(goods);
                        _this.imageRect.visible = false;
                    }, _this);
                    display.x = _this.groupAni.x + display.width / 2;
                    display.y = _this.groupAni.y + display.height / 2;
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    _this.groupAni.addChild(display);
                });
            }
            else if (this.takeNum == 10) {
                this.groupAni.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, "ui_wawaji_eff", "armatureName", "002_zhuaqu_02", 1)
                    .then(function (display) {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                        _this.animationEventBox(goods);
                        _this.imageRect.visible = false;
                    }, _this);
                    display.x = _this.groupAni.x + display.width / 2;
                    display.y = _this.groupAni.y + display.height / 2;
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    _this.groupAni.addChild(display);
                });
            }
        };
        Activity_RandomBoomSence.prototype.animationEventBox = function (goods) {
            var _this = this;
            this.groupAni.removeChildren();
            this.addAnimatoin("ui_wawaji_eff", "000_daiji", 0, this.groupAni);
            zj.loadUI(zj.Activity_RandomPop)
                .then(function (dialog) {
                dialog.SetInfo(goods, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        Activity_RandomBoomSence.prototype.ResetFirstBlue = function (tbl) {
            var _a = zj.Table.FindR(tbl, function (k, v) {
                var a = v;
                var b = k;
                if (zj.PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    if (zj.PlayerHunterSystem.Table(v.goodsId).aptitude < 13) {
                        return true;
                    }
                }
                else {
                    return true;
                }
                return false;
            }), value = _a[0], key = _a[1];
            if (key != null && value != null) {
                tbl.splice(key);
                tbl.push(value);
            }
            return tbl;
        };
        Activity_RandomBoomSence.prototype.IntegralLotteryReqBody_Visit = function (time) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.IntegralLotteryRequest();
                request.body.lottery_time = time;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_DOLL_COIN_NOT_ENOUGH) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        //返回主界面
        Activity_RandomBoomSence.prototype.onBtnReturn = function () {
            zj.Game.PlayerInfoSystem.playAnnouce = true;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //跳转 娃娃币礼包 界面
        Activity_RandomBoomSence.prototype.onGroupGift = function () {
            var _this = this;
            zj.Tips.tips_Random_set(999);
            zj.loadUI(zj.ActivityTimeGiftFirstPopCEgg)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.SetInfo(_this.curTopicInfo);
                dialog.setCB(function () { _this.SetFresh(); });
            });
        };
        //跳转 兑换礼物  界面
        Activity_RandomBoomSence.prototype.onButtonChange = function () {
            var _this = this;
            zj.loadUI(zj.Activity_RandomLive)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.SetInfo(_this);
            });
        };
        //跳转商城
        Activity_RandomBoomSence.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.init();
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        // 鼠标点击 物品详情
        Activity_RandomBoomSence.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.good.goodsId);
            var dialog = this.groupListMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupListMain.removeChild(dialog);
            var posY;
            var posX;
            var index;
            if (data.index > 5) {
                posY = 70;
                index = data.index - 5;
            }
            else if (data.index > 2) {
                posY = -120;
                index = data.index - 2;
            }
            else {
                posY = 85;
                index = data.index + 1;
            }
            if (data.index == 0) {
                index = 2.8;
                posY = -80;
            }
            else if (data.index == 3) {
                index = 2.8;
                posY = 100;
            }
            else if (data.index == 6) {
                index = 2.8;
                posY = 185;
            }
            posX = -250 + index * 130;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.good.goodsId, data.good.count);
                        _this.groupListMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.good.goodsId, data.good.count);
                        _this.groupListMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.good.goodsId, data.good.count);
                        _this.groupListMain.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.good.goodsId, data.good.count);
                        _this.groupListMain.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除 物品详情
        Activity_RandomBoomSence.prototype.onRemoveAward = function () {
            var dialog = this.groupListMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupListMain.removeChild(dialog);
        };
        Activity_RandomBoomSence.prototype.formatMsTimeCh = function (times) {
            var time = new Date(times);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            var h = time.getHours();
            var mm = time.getMinutes();
            var s = time.getSeconds();
            var m1;
            var d1;
            var mm1;
            if (m < 10) {
                m1 = ("0" + m);
            }
            else {
                m1 = m.toString();
            }
            if (d < 10) {
                d1 = ("0" + d);
            }
            else {
                d1 = d.toString();
            }
            if (mm < 10) {
                mm1 = ("0" + mm);
            }
            else {
                mm1 = mm.toString();
            }
            return y + "-" + m1 + "-" + d1 + " " + h + ":" + mm1;
        };
        //添加龙骨动画
        Activity_RandomBoomSence.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.x + display.width / 2;
                display.y = group.y + display.height / 2;
                display.scaleX = 1.2;
                display.scaleY = 1.2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        Activity_RandomBoomSence.prototype.onBtnRank = function () {
            var info = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == message.ActivityType.ACT_TYPE_RANK;
            })[0];
            if (info != null && zj.Game.Controller.curServerTime > info.openTime && zj.Game.Controller.curServerTime < info.closeTime && info.consumeType == message.ConsumeType.CONSUME_TYPE_INTEGRAL) {
                zj.loadUI(zj.Activity_RanklistMain).then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
            else {
                zj.toast_success("活动未开启!");
            }
        };
        return Activity_RandomBoomSence;
    }(zj.Scene));
    zj.Activity_RandomBoomSence = Activity_RandomBoomSence;
    __reflect(Activity_RandomBoomSence.prototype, "zj.Activity_RandomBoomSence");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomBoomSence.js.map