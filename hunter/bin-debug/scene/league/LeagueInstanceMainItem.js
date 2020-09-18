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
    // lizhengqiang
    // 20190104
    var LeagueInstanceMainItem = (function (_super) {
        __extends(LeagueInstanceMainItem, _super);
        function LeagueInstanceMainItem() {
            var _this = _super.call(this) || this;
            _this.tblInfo = null;
            _this.info = null;
            _this.giftPosition = [];
            _this.skinName = "resource/skins/league/LeagueInstanceMainItemSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupGift); // 因为是循环播放，需要特别处理
            }, null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.groupBoard); // 因为是循环播放，需要特别处理
            }, null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.imgCenter); // 因为是循环播放，需要特别处理
            }, null);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.imgCircle); // 因为是循环播放，需要特别处理
            }, null);
            _this.groupGiftY = _this.groupGift.y;
            _this.groupBoardY = _this.groupBoard.y;
            _this.imgCenterY = _this.imgCenter.y;
            return _this;
        }
        LeagueInstanceMainItem.prototype.setInfo = function (id, tblInfo, info) {
            this.index = id;
            this.tblInfo = tblInfo;
            this.info = info;
            this.giftPosition = [];
            for (var i = 1; i <= 3; i++) {
                this.giftPosition.push(this["groupGift" + i].x);
            }
            this.setUI();
            this.playAnimation(id);
        };
        LeagueInstanceMainItem.prototype.freshInfo = function (id, info) {
            this.index = id;
            this.info = info;
            this.setUI();
        };
        LeagueInstanceMainItem.prototype.setUI = function () {
            this.imgBurBlood.visible = (this.info != null);
            this.groupBox1.visible = (this.info != null);
            this.groupBox2.visible = (this.info != null);
            this.groupBox3.visible = (this.info != null);
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_League.leagueInstanceName[this.index], this);
            this.lbBloodNum.visible = true;
            if (this.info == null) {
                this.imgBack.source = zj.cachekey(zj.UIConfig.UIConfig_League.leagueInstanceLock, this);
                this.lbBloodNum.visible = false;
                this.imgInBattle.visible = false;
                this.imgKilled.visible = false;
            }
            else {
                this.imgBack.source = zj.cachekey(this.tblInfo.back_img, this);
                this.imgName.source = zj.cachekey(this.tblInfo.name_img, this);
                var hp = this.info.stageInfos[0].curHp;
                for (var k in this.tblInfo.reward_zone) {
                    if (this.info.stageInfos[0].is_win) {
                        break;
                    }
                    else if (hp < 1 - this.tblInfo.reward_zone[k]) {
                        this.imgBurBlood.source = zj.cachekey(zj.UIConfig.UIConfig_Format.bossBloodPng[k], this);
                    }
                }
                var perect = this.info.stageInfos[0].curHp;
                if (perect > 1)
                    perect = 1;
                this.imgBurBlood.width = this.imgBurBlood.width * perect;
                this.lbBloodNum.text = (perect * 100).toFixed(1) + "%";
                if (this.info.stageInfos[0].battle_time == 0 && this.info.stageInfos[0].memberId == 0) {
                    this.imgInBattle.visible = false;
                }
                else if (this.info.stageInfos[0].battle_time != 0 && this.info.stageInfos[0].memberId == zj.Game.PlayerInfoSystem.BaseInfo.id) {
                    this.imgInBattle.visible = false;
                }
                else {
                    if (zj.Game.Controller.curServerTime - this.info.stageInfos[0].battle_time <= zj.CommonConfig.league_instance_battle_duration) {
                        this.imgInBattle.visible = true;
                    }
                    else {
                        this.imgInBattle.visible = false;
                    }
                }
                this.imgKilled.visible = this.info.stageInfos[0].is_win;
                this.lbBloodNum.visible = !this.info.stageInfos[0].is_win;
                if (this.info.stageInfos[0].is_win) {
                    this.groupBoard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBoss, this);
                }
                else {
                    this.groupBoard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBoss, this);
                }
                this.setGift();
            }
        };
        LeagueInstanceMainItem.prototype.setGift = function () {
            var _this = this;
            var hp = this.info.stageInfos[0].curHp;
            var giftTbl = [];
            for (var i = 0; i < this.tblInfo.reward_zone.length; i++) {
                if (this.info.stageInfos[0].is_win) {
                    giftTbl.push(i);
                }
                else if (hp <= 1 - this.tblInfo.reward_zone[i]) {
                    giftTbl.push(i);
                }
            }
            var mv = zj.Table.FindR(zj.Game.PlayerLeagueSystem.Member.mobsReward, function (k, v) {
                return v.instanceId == _this.index;
            })[0];
            var rewTbl = [];
            if (mv != null) {
                rewTbl = mv.mobsReward;
            }
            var ik = 0;
            while (ik <= giftTbl.length) {
                if (zj.Table.FindK(rewTbl, giftTbl[ik]) != -1) {
                    giftTbl.splice(ik, 1);
                }
                else {
                    ik = ik + 1;
                }
            }
            var postionIndex = 0;
            var _loop_1 = function (i) {
                if (zj.Table.FindK(giftTbl, i) != -1) {
                    this_1["groupBox" + (i + 1)].visible = true;
                    this_1["btnBox" + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, this_1["onBtnBox" + (i + 1)], this_1);
                    this_1["groupAni" + (i + 1)].removeChildren();
                    zj.Game.DragonBonesManager.playAnimation(this_1, "ui_tongyong_lingqu", "armatureName", null, 0).then(function (display) {
                        _this["groupAni" + (i + 1)].addChild(display);
                    }).catch(function (reason) {
                        zj.toast(reason);
                    });
                    this_1["groupBox" + (i + 1)].x = this_1.giftPosition[postionIndex];
                    postionIndex = postionIndex + 1;
                }
                else {
                    this_1["groupBox" + (i + 1)].visible = false;
                    this_1["btnBox" + (i + 1)].removeEventListener(egret.TouchEvent.TOUCH_TAP, this_1["onBtnBox" + (i + 1)], this_1);
                }
            };
            var this_1 = this;
            for (var i = 0; i < 3; i++) {
                _loop_1(i);
            }
        };
        LeagueInstanceMainItem.prototype.playAnimation = function (index) {
            var num = (index % 2) * 2 - 1;
            egret.Tween.get(this.groupGift)
                .to({ y: this.groupGiftY - 5 * (index % 2 - 1) }, 0);
            egret.Tween.get(this.groupGift, { loop: true })
                .to({ y: this.groupGiftY + 5 * num }, 800)
                .to({ y: this.groupGiftY - 5 * num }, 800)
                .to({ y: this.groupGiftY }, 800);
            egret.Tween.get(this.groupBoard)
                .to({ y: this.groupBoardY - 5 * (index % 2 - 1) }, 0);
            egret.Tween.get(this.groupBoard, { loop: true })
                .to({ y: this.groupBoardY + 5 * num }, 800)
                .to({ y: this.groupBoardY - 5 * num }, 800)
                .to({ y: this.groupBoardY }, 800);
            egret.Tween.get(this.imgCenter)
                .to({ y: this.imgCenterY - 10 * (index % 2 - 1) }, 0);
            egret.Tween.get(this.imgCenter, { loop: true })
                .to({ y: this.imgCenterY + 10 * num }, 800)
                .to({ y: this.imgCenterY - 10 * num }, 800)
                .to({ y: this.imgCenterY }, 800);
            egret.Tween.get(this.imgCircle, { loop: true })
                .to({ scaleX: 1.1, scaleY: 1.1 }, 800)
                .to({ scaleX: 0.9, scaleY: 0.9 }, 800)
                .to({ scaleX: 1, scaleY: 1 }, 800);
        };
        LeagueInstanceMainItem.prototype.onClickBoss = function () {
            var _this = this;
            var info = zj.Game.PlayerLeagueSystem.Instances;
            if (info.length < this.index)
                return;
            if (info[this.index - 1].stageInfos[0].battle_time != 0 && zj.Game.PlayerInstanceSystem.curServerTime - info[this.index - 1].stageInfos[0].battle_time <= zj.CommonConfig.league_instance_battle_duration &&
                info[this.index - 1].stageInfos[0].memberId != zj.Game.PlayerInfoSystem.BaseInfo.id) {
                zj.toast_warning(zj.LANG(zj.TextsConfig.TextsConfig_Hunter_League.league_instance_inbattle));
            }
            else {
                zj.Game.PlayerLeagueSystem.leagueInstance.curInstanceId = info[this.index - 1].instance_id;
                zj.Game.PlayerLeagueSystem.leagueInstanceStageInfo(info[this.index - 1].instance_id).then(function (msg) {
                    zj.Game.PlayerStageSystem.insert(msg.stageInfo);
                    zj.PlayerStageSystem.stageInfoTbl = [msg.stageInfo];
                    zj.Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1] = msg;
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
                    // "HXH_CommonFormationPveUnion"
                    //加载阵型界面
                    zj.loadUI(zj.CommonFormatePveMain)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setInfo(_this.index);
                    });
                });
            }
        };
        LeagueInstanceMainItem.prototype.onBtnBox1 = function () {
            this.leagueInstanceMobReward(0);
        };
        LeagueInstanceMainItem.prototype.onBtnBox2 = function () {
            this.leagueInstanceMobReward(1);
        };
        LeagueInstanceMainItem.prototype.onBtnBox3 = function () {
            this.leagueInstanceMobReward(2);
        };
        LeagueInstanceMainItem.prototype.leagueInstanceMobReward = function (pos) {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueInstanceMobReward(this.info.instance_id, pos).then(function (gameInfo) {
                if (gameInfo.getGoods.length > 0) {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.show();
                        dialog.init(gameInfo.getGoods);
                    });
                    _this.setGift();
                }
            });
        };
        return LeagueInstanceMainItem;
    }(zj.UI));
    zj.LeagueInstanceMainItem = LeagueInstanceMainItem;
    __reflect(LeagueInstanceMainItem.prototype, "zj.LeagueInstanceMainItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueInstanceMainItem.js.map