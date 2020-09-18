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
    // HXH_StoryInstanceAdventureItem
    // wangshenzhuo
    // 2019-07-24
    var StoryInstanceAdventureItem = (function (_super) {
        __extends(StoryInstanceAdventureItem, _super);
        function StoryInstanceAdventureItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureItemSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceAdventureItem"], null);
            _this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.buttonDekaron.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonDekaron, _this);
            _this.imageGetFirstBlood.visible = false;
            _this.x = _this.groupMain.x;
            _this.y = _this.groupMain.y;
            _this.groupDown.scaleY = 0;
            _this.groupMain.height -= _this.groupDown.height;
            _this.height -= _this.groupDown.height;
            return _this;
        }
        StoryInstanceAdventureItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.instanceId = this.data.instanceId;
            this.father = this.data.father;
            this.activityInfo = this.data.activityInfo;
            if (this.instanceId == null) {
                return;
            }
            if (this.index == this.father.itemShowIndex) {
                this.data.isShow = false;
                this.father.itemShowIndex = -1;
            }
            if (this.data.isShow) {
                this.moveUp();
            }
            else {
                this.moveDown();
            }
            this.info = zj.TableActivityBattleInstance.Item(this.instanceId);
            this.SetUI();
            this.LoadList();
        };
        StoryInstanceAdventureItem.prototype.SetUI = function () {
            this.labelName.text = this.info.name;
            this.imageIcon1.source = zj.cachekey(this.info.instance_pic1, this);
            this.imageIcon2.source = zj.cachekey(this.info.instance_pic2, this);
            var star = 0;
            var maxMob = this.father.mob;
            var curMob = this.info.instance_id;
            var cardInfo = zj.TableItemPotato.Table();
            var reward = this.info.first_reward[0][0];
            var cardId = zj.Table.FindF(cardInfo, function (k, v) {
                return v.id == reward;
            });
            if (curMob < maxMob) {
                var curStarInfo = zj.Table.FindR(this.activityInfo.dailyAddItems, function (k, v) {
                    if (v.index == curMob) {
                        return true;
                    }
                });
                star = curStarInfo[0].rewardIndex.length;
                this.imagePassStar.visible = true;
                this.groupFirstBloodAll.visible = false;
            }
            else {
                this.groupFirstBloodAll.visible = true;
                this.imagePassStar.visible = false;
            }
            this.imagePassStar.source = zj.cachekey(zj.UIConfig.UIConfig_Instance.instanceStar[star], this);
            this.imageMack.visible = curMob > maxMob;
            this.data.isMack = curMob > maxMob;
            this.imageFrameButton1.visible = curMob == maxMob;
            this.imageFrameButton2.visible = curMob == maxMob;
            this.SetStarInfo();
        };
        StoryInstanceAdventureItem.prototype.SetStarInfo = function () {
            var getDes = zj.otherdb.ActivityBattleGetInstanceStarDes(this.instanceId);
            for (var k in getDes) {
                var v = getDes[k];
                this["labelMission" + (Number(k) + 1)].text = v;
            }
            var curStarInfo = zj.otherdb.ActivityBattleGetCurStarById(this.activityInfo, this.instanceId);
            for (var i = 1; i < 4; i++) {
                if (zj.Table.FindK(curStarInfo, i) == -1) {
                    this["imageMission" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryCheckPath[2], this);
                    this["labelMission" + i].textColor = zj.Helper.RGBToHex("r:170,g:170,b:170");
                }
                else {
                    this["imageMission" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryCheckPath[1], this);
                    this["labelMission" + i].textColor = zj.Helper.RGBToHex("r:0,g:249,b:0");
                }
            }
        };
        StoryInstanceAdventureItem.prototype.LoadList = function () {
            this.listViewDrops.itemRenderer = zj.StoryInstanceAdventureItemItem;
            var listItem = new eui.ArrayCollection();
            var a = this.info.rewards;
            for (var i = 0; i < this.info.rewards.length; i++) {
                var itemData = new zj.StoryInstanceAdventureItemItemData();
                itemData.itemId = this.info.rewards[i][0];
                itemData.itemCount = this.info.rewards[i][1];
                itemData.father = this;
                listItem.addItem(itemData);
            }
            this.listViewDrops.dataProvider = listItem;
            var itemSet = zj.PlayerItemSystem.Set(this.info.first_reward[0][0], 1, this.info.first_reward[0][1]);
            this.groupFirstBlood.removeChildren();
            this.imageFrameFirstBlood.source = zj.cachekey(itemSet.Frame, this);
            this.imageIconFirstBlood.source = zj.cachekey(itemSet.Clip, this);
            this.labelFirstBlood.text = "x" + zj.Set.NumberUnit2(this.info.first_reward[0][1]);
            if (this.groupFirstBloodAll.visible == true) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupFirstBlood, "daojuguang");
            }
        };
        StoryInstanceAdventureItem.prototype.onShowGoodProperty = function (e) {
            var goodsinfo = new message.GoodsInfo();
            goodsinfo.goodsId = this.info.first_reward[0][0];
            goodsinfo.count = this.info.first_reward[0][1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsinfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY, isshow: false });
        };
        StoryInstanceAdventureItem.prototype.moveDown = function () {
            var _this = this;
            if (this.data.isTween) {
                egret.Tween.get(this.groupDown).to({ scaleY: 1 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this.groupMain).to({ height: 299 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this).to({ height: 299 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this.skin).to({ height: 299 }, 150, egret.Ease.sineInOut).call(function () {
                    _this.data.isTween = false;
                });
            }
            else {
                this.groupDown.scaleY = 1;
                this.groupMain.height = 299;
                this.height = 299;
                this.skin.height = 299;
            }
        };
        StoryInstanceAdventureItem.prototype.moveUp = function () {
            var _this = this;
            if (this.data.isTween) {
                egret.Tween.get(this.groupDown).to({ scaleY: 0 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this.groupMain).to({ height: 119 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this).to({ height: 119 }, 150, egret.Ease.sineInOut);
                egret.Tween.get(this.skin).to({ height: 119 }, 150, egret.Ease.sineInOut).call(function () {
                    _this.data.isTween = false;
                });
            }
            else {
                this.groupDown.scaleY = 0;
                this.groupMain.height = 119;
                this.height = 119;
                this.skin.height = 119;
            }
        };
        StoryInstanceAdventureItem.prototype.onButtonDekaron = function () {
            var _this = this;
            var maxTimes = zj.CommonConfig.activity_instance_battle_time + zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time * zj.CommonConfig.activity_instance_buy_battle_time_add;
            if (maxTimes <= zj.Game.PlayerVIPSystem.vipInfo.activity_time) {
                var a = zj.CommonConfig.activity_instance_buy_consume_token(zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time);
                var b = zj.CommonConfig.activity_instance_buy_battle_time_add;
                var c = zj.CommonConfig.activity_instance_buy_time_limit - zj.Game.PlayerVIPSystem.vipInfo.buy_activity_time;
                var d = zj.CommonConfig.activity_instance_buy_time_limit;
                var numMsg_1 = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Activity.battleNumTip, a, b, c, d);
                zj.loadUI(zj.ConfirmCancelDialog)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setInfo(numMsg_1);
                    dialog.setCB(function () {
                        _this.ActivityInstanceBuyTimeReq().then(function (data) {
                            zj.toast_warning(zj.TextsConfig.TextsConfig_Activity.buyBattleNumSuccessTip);
                        }).catch(function (reason) { });
                    });
                });
            }
            else {
                zj.Game.PlayerMissionSystem.MobsInfo(message.EFormationType.FORMATION_TYPE_ACTIVITY, this.instanceId).then(function () {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY;
                    zj.PlayerActivitySystem.activityBattleCurPos = _this.instanceId;
                    zj.Game.PlayerInstanceSystem.activityBattleIndex = _this.activityInfo.index;
                    zj.Game.PlayerInstanceSystem.activityBattleCachInfo = {
                        goodsId: _this.info.rewards[0][0],
                        count: zj.otherdb.getActivityByTypeAndIndex(_this.father.father.cur_info.type, _this.father.father.cur_info.index).daysIndex,
                        type: _this.father.father.cur_info.type,
                        index: _this.father.father.cur_info.index
                    };
                    var a = zj.Game.PlayerInstanceSystem.activityBattleCachInfo;
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(1);
                    });
                }).catch(function () { });
            }
        };
        StoryInstanceAdventureItem.prototype.ActivityInstanceBuyTimeReq = function () {
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
        StoryInstanceAdventureItem.prototype.MobsInfoReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
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
        //添加龙骨动画
        StoryInstanceAdventureItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, aniName) {
            zj.Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2 + 1;
                display.y = group.explicitHeight / 2;
                display.name = aniName;
                if (group.getChildByName(aniName) == null) {
                    group.addChild(display);
                }
                display.scaleX = 0.5;
                display.scaleY = 0.5;
            })
                .catch(function (reason) {
            });
        };
        return StoryInstanceAdventureItem;
    }(eui.ItemRenderer));
    zj.StoryInstanceAdventureItem = StoryInstanceAdventureItem;
    __reflect(StoryInstanceAdventureItem.prototype, "zj.StoryInstanceAdventureItem");
    //子项数据源
    var StoryInstanceAdventureItemData = (function () {
        function StoryInstanceAdventureItemData() {
            this.isShow = true;
            this.isTween = false;
            // showIndex: number;
        }
        return StoryInstanceAdventureItemData;
    }());
    zj.StoryInstanceAdventureItemData = StoryInstanceAdventureItemData;
    __reflect(StoryInstanceAdventureItemData.prototype, "zj.StoryInstanceAdventureItemData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceAdventureItem.js.map