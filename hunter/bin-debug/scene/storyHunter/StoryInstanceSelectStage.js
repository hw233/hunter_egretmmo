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
    //  wangshenzhuo
    //  2019/7/22
    //  HXH_StoryInstanceSelectStage  猎人故事 冒险
    var StoryInstanceSelectStage = (function (_super) {
        __extends(StoryInstanceSelectStage, _super);
        function StoryInstanceSelectStage() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceSelectStageSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonMall.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMall, _this);
            _this.Timers = new egret.Timer(999, 0);
            _this.Timers.addEventListener(egret.TimerEvent.TIMER, _this.updateInfo, _this);
            _this.Timers.start();
            _this.buttonNormal.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonNormal, _this);
            _this.buttonHard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonHard, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateUIStates, _this);
            _this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddGemstone, _this);
            _this.buttonAddTimes.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAddTimes, _this);
            return _this;
        }
        StoryInstanceSelectStage.prototype.Init = function () {
            this.curType = zj.TableEnum.Enum.ActivityInstance.Normal;
            this.buttonNormal.enabled = false;
            this.imageLockNormal.visible = false;
            this.buttonAddTimes.enabled = true;
            this.subWin = new zj.StoryInstanceAdventure();
            this.subWin.Father(this);
            this.groupAdd.addChild(this.subWin);
        };
        StoryInstanceSelectStage.prototype.Load = function (activity_info) {
            this.activity_info = activity_info;
            this.cur_info = zj.otherdb.getActivityByTypeAndIndex(activity_info.type, activity_info.index);
            this.cur_table = zj.TableActivityBattle.Item(this.cur_info.buffValue);
            this.imageBG.source = zj.cachekey(this.cur_table.instance_bg, this);
            this.max_star = this.cur_table.instance_pack.length * 3;
            this.cur_star = zj.otherdb.ActivityBattleGetCurStar(this.cur_info);
            this.labelStarNumNormal.text = this.cur_star + "/" + this.max_star;
            this.imageLockHard.visible = true;
            var maxMob = this.cur_info.itemCount;
            if (maxMob + 1 >= this.cur_table.instance_elite[0]) {
                this.imageLockHard.visible = false;
                this.curType = zj.TableEnum.Enum.ActivityInstance.Hard;
                this.buttonHard.enabled = false;
                this.buttonNormal.enabled = true;
            }
            this.imageIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(this.cur_table.act_coin), this);
            this.updateInfo();
            this.loadList();
            this.SetStarGetList();
            this.updateUIStates();
        };
        StoryInstanceSelectStage.prototype.updateUIStates = function () {
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
            if (this.lbGemstone.text.length > 6) {
                this.lbGemstone.size = 12;
            }
            else {
                this.lbGemstone.size = 16;
            }
        };
        StoryInstanceSelectStage.prototype.loadList = function () {
            var mob = this.cur_info.itemCount + 1;
            if (this.cur_info.itemCount == 0) {
                mob = this.cur_table.instance_normal[0];
            }
            if (this.curType == zj.TableEnum.Enum.ActivityInstance.Normal) {
                this.subWin.LoadList(this.cur_table.instance_normal, mob, this.cur_info);
            }
            else {
                this.subWin.LoadList(this.cur_table.instance_elite, mob, this.cur_info);
            }
        };
        StoryInstanceSelectStage.prototype.SetStarGetList = function () {
            this.listStarAwardNormal.itemRenderer = zj.StoryInstanceSelectStageItem;
            var listStarAwardNormalItem = new eui.ArrayCollection();
            for (var i = 0; i < this.cur_table.star_zone.length; i++) {
                var data = new zj.StoryInstanceSelectStageItemData();
                data.index = i;
                data.table = this.cur_table;
                data.star = this.cur_star;
                data.info = this.cur_info;
                data.father = this;
                listStarAwardNormalItem.addItem(data);
            }
            this.listStarAwardNormal.dataProvider = listStarAwardNormalItem;
        };
        StoryInstanceSelectStage.prototype.updateInfo = function () {
            var maxTimes = zj.CommonConfig.activity_instance_battle_time + zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time * zj.CommonConfig.activity_instance_buy_battle_time_add;
            this.labelTimes.text = (maxTimes - zj.Game.PlayerVIPSystem.vipInfo.activity_time + "/" + maxTimes);
            this.labelHavaNum.text = zj.otherdb.getActivityByTypeAndIndex(this.activity_info.type, this.activity_info.index).daysIndex.toString();
        };
        //长按详情
        StoryInstanceSelectStage.prototype.showGoodsProperty = function (ev) {
            var a = ev.data;
            if (zj.Game.UIManager.dialogCount() == 0) {
                var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "firstGoods";
                this.addChild(show);
            }
        };
        // 长按抬起
        StoryInstanceSelectStage.prototype.removeShow = function () {
            var show = this.getChildByName("firstGoods");
            if (show) {
                this.removeChild(show);
            }
        };
        StoryInstanceSelectStage.prototype.onButtonMall = function () {
            var _this = this;
            zj.loadUI(zj.StoryInstanceMall)
                .then(function (scene) {
                scene.Load(_this.cur_info);
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        StoryInstanceSelectStage.prototype.onButtonNormal = function () {
            this.curType = zj.TableEnum.Enum.ActivityInstance.Normal;
            this.buttonNormal.enabled = false;
            this.buttonHard.enabled = true;
            this.loadList();
        };
        //  钻石
        StoryInstanceSelectStage.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        StoryInstanceSelectStage.prototype.onButtonHard = function () {
            var maxMob = this.cur_info.itemCount;
            if (maxMob + 1 >= this.cur_table.instance_elite[0]) {
                this.curType = zj.TableEnum.Enum.ActivityInstance.Hard;
                this.buttonHard.enabled = false;
                this.buttonNormal.enabled = true;
                this.loadList();
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.mastWinNor);
            }
        };
        StoryInstanceSelectStage.prototype.onButtonAddTimes = function () {
            var _this = this;
            var a = zj.CommonConfig.activity_instance_buy_consume_token(zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time);
            var b = zj.CommonConfig.activity_instance_buy_battle_time_add;
            var c = zj.CommonConfig.activity_instance_buy_time_limit - zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time;
            var d = zj.CommonConfig.activity_instance_buy_time_limit;
            var numMsg = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.battleNumTip, a, b, c, d);
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(numMsg);
                dialog.setCB((function () {
                    _this.BuyNumReq();
                }));
            });
        };
        StoryInstanceSelectStage.prototype.BuyNumReq = function () {
            var _this = this;
            if (zj.CommonConfig.activity_instance_buy_time_limit - zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time <= 0) {
                setTimeout(function () {
                    zj.loadUI(zj.ConfirmCancelDialog)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(zj.TextsConfig.TextsConfig_User.notime);
                    });
                }, 300);
            }
            else {
                this.ActivityInstanceBuyTimeReq().then(function (data) {
                    zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.buyBattleNumSuccessTip);
                    var maxTimes = zj.CommonConfig.activity_instance_battle_time + zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time * zj.CommonConfig.activity_instance_buy_battle_time_add;
                    _this.labelTimes.text = maxTimes - zj.Game.PlayerVIPSystem.vipInfo.activity_time + "/" + maxTimes;
                }).catch(function (reason) { });
            }
        };
        StoryInstanceSelectStage.prototype.ActivityInstanceBuyTimeReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ActivityInstanceBuyTimeRequest();
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
        StoryInstanceSelectStage.prototype.onButtonClose = function () {
            this.Timers.stop();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return StoryInstanceSelectStage;
    }(zj.Scene));
    zj.StoryInstanceSelectStage = StoryInstanceSelectStage;
    __reflect(StoryInstanceSelectStage.prototype, "zj.StoryInstanceSelectStage");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceSelectStage.js.map