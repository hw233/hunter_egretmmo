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
    //RelicMainItem
    //hexiaowei
    // 2019/03/05
    var RelicMainItem = (function (_super) {
        __extends(RelicMainItem, _super);
        function RelicMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/RelicMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["RelicMainItem"], null);
            _this.buttonAward.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAward, _this);
            _this.buttonRank.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonRank, _this);
            _this.buttonChest.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChest, _this);
            _this.buttonFight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonFight, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, _this);
            return _this;
        }
        RelicMainItem.prototype.dataChanged = function () {
            var off1 = 50;
            var off2 = 15;
            var hightoff1 = Math.pow(-1, this.data.index + 1) * off1;
            var hightoff2 = Math.pow(-1, this.data.index) * (off1 + off2);
            var hightoff3 = Math.pow(-1, this.data.index + 1) * off2;
            var delayTime = 70 * this.data.index + 180;
            egret.Tween.get(this.groupAll)
                .to({ y: hightoff1 }, 0)
                .wait(delayTime)
                .to({ y: hightoff2 }, 100, egret.Ease.sineInOut)
                .to({ y: 0 }, 50, egret.Ease.sineIn);
            this.id = this.data.item.id;
            this.open_chest = this.data.item.open_chest;
            var thisid = this.id;
            var instanceInfo = zj.Table.FindR(zj.Game.PlayerInstanceSystem.RelicInfo, function (k, v) {
                return v.id == thisid;
            });
            if (instanceInfo[0] == null) {
                instanceInfo = new message.InstanceRelic();
                instanceInfo.def = null;
                instanceInfo.id = this.data.item.id;
            }
            else {
                instanceInfo = instanceInfo[0];
            }
            this.instanceInfo = instanceInfo;
            var relicStar = instanceInfo.star;
            var hurtLevel = zj.PlayerDarkSystem.GetLevelByHurt(this.data.item.id, instanceInfo.damage_max);
            this.imageBossPic.source = zj.cachekey(this.data.item.boss_head_client, this);
            this.imageRelicName.source = zj.cachekey(this.data.item.relic_pic, this);
            this.labelDes.text = this.data.item.award_des;
            this.imageLevel.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicHurtLevel[hurtLevel], this);
            zj.Helper.NodeStarByAlignLeft(this.groupStar, relicStar, 5, 0.6, true, zj.UIConfig.UIConfig_DarkLand.relicSmallStar[0], zj.UIConfig.UIConfig_DarkLand.relicSmallStar[1]);
            var strOpen = "";
            var bOpen = false;
            var date = zj.Game.Controller.serverNow();
            // let humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() - 20, date.getMinutes(), date.getSeconds()));  
            var humanDate = new Date();
            // let bb = humanDate.toLocaleString();
            var wDay = humanDate.getDay();
            // var timestamp = (new Date()).getTime() - 72000;
            if (wDay == 0) {
                wDay = 7;
            }
            else {
                wDay = wDay;
            }
            var num = zj.PlayerDarkSystem.LastChallengeTime(instanceInfo.id);
            this.labelChallenge.text = num.toString();
            for (var i = 0; i < this.data.item.open_day.length; i++) {
                if (this.data.item.open_day[i] == 7) {
                    strOpen = strOpen + zj.TextsConfig.TextsConfig_Common.ri;
                }
                else {
                    strOpen = strOpen + zj.Helper.GetNumCH(this.data.item.open_day[i], false);
                }
                if (i != this.data.item.open_day.length - 1) {
                    strOpen = strOpen + "、";
                }
                if (wDay == this.data.item.open_day[i]) {
                    bOpen = true;
                }
            }
            this.labelOpenTime.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_DarkLand.relic.openTime, strOpen);
            this.bOpen = bOpen;
            this.data.father.b_open = this.bOpen;
            if (this.bOpen) {
                this.data.father.teachOpenIndex = this.data.index - 2;
                this.labelChallenge.text = num.toString();
            }
            else {
                this.labelChallenge.text = "0";
            }
            this.buttonFight.visible = bOpen;
            this.imageClose.visible = !bOpen;
            this.groupCount.visible = bOpen;
            // this.buttonFight.visible = true;
            // this.imageClose.visible = false;
            // let num = PlayerDarkSystem.LastChallengeTime(instanceInfo.id);
            // if(num <= 0) {
            //     num = 0;
            // }
            // this.labelChallenge.text = PlayerDarkSystem.LastChallengeTime(instanceInfo.id).toString();
            // this.labelChallenge.text = num.toString();
            if (zj.PlayerDarkSystem.LastChallengeTime(instanceInfo.id) > 0) {
                this.labelChallenge.textColor = zj.Helper.RGBToHex("r:60,g:255,b:0");
            }
            else {
                this.labelChallenge.textColor = zj.Helper.RGBToHex("r:255,g:38,b:0");
            }
            this.setShowAward(this.data.item.id, bOpen);
        };
        RelicMainItem.prototype.setShowAward = function (id, bOpen) {
            var canOpenChest = zj.PlayerDarkSystem.CanOpenByRelicId(id);
            if (canOpenChest.length > 0) {
                this.buttonFight.visible = false;
                this.buttonChest.visible = true;
            }
            else {
                this.buttonFight.visible = bOpen == true ? true : false;
                this.buttonChest.visible = false;
            }
        };
        RelicMainItem.prototype.onButtonAward = function () {
            var _this = this;
            zj.loadUI(zj.RelicAwardMain)
                .then(function (dialog) {
                dialog.setRelicId(_this.instanceInfo.id);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        RelicMainItem.prototype.onButtonRank = function () {
            var _this = this;
            zj.loadUI(zj.RelicRank)
                .then(function (dialog) {
                dialog.setInfo(_this.id);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        RelicMainItem.prototype.onButtonChest = function () {
            var _this = this;
            zj.loadUI(zj.RelicFinaChest)
                .then(function (dialog) {
                dialog.Init(_this.open_chest, function () {
                    _this.dataChanged();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        RelicMainItem.prototype.onButtonFight = function () {
            //次數足夠
            if (zj.PlayerDarkSystem.LastChallengeTime(this.instanceInfo.id) <= 0 && !zj.Device.isDebug) {
                zj.toast_warning(zj.TextsConfig.TextConfig_Instance.errorCountWanted);
                return;
            }
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_RELIC;
            zj.Game.PlayerMissionSystem.fightExt = this.data.item.id - 1;
            this.ReqGetMobsInfo();
        };
        RelicMainItem.prototype.ReqGetMobsInfo = function () {
            this.ReqGetMobsInfo_Visit()
                .then(function (data) {
                zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_RELIC;
                zj.Game.PlayerFormationSystem.siteIndex = zj.Game.PlayerMissionSystem.fightExt;
                zj.loadUI(zj.CommonFormatePveMain)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(zj.Game.PlayerMissionSystem.fightExt);
                });
            }).catch(function (reason) { });
        };
        RelicMainItem.prototype.ReqGetMobsInfo_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_RELIC;
                request.body.mobsId = zj.Game.PlayerMissionSystem.fightExt + 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    zj.Game.PlayerRelateSystem.relationInfo();
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return RelicMainItem;
    }(eui.ItemRenderer));
    zj.RelicMainItem = RelicMainItem;
    __reflect(RelicMainItem.prototype, "zj.RelicMainItem");
    //子项数据源
    var RelicMainItemData = (function () {
        function RelicMainItemData() {
        }
        return RelicMainItemData;
    }());
    zj.RelicMainItemData = RelicMainItemData;
    __reflect(RelicMainItemData.prototype, "zj.RelicMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=RelicMainItem.js.map