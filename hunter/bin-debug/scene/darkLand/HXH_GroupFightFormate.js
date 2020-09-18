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
    // HXH_GroupFightFormate ()
    // wangshenzhuo
    // 2019/03/07
    var EnumBossState;
    (function (EnumBossState) {
        EnumBossState[EnumBossState["Info"] = 1] = "Info";
        EnumBossState[EnumBossState["Feature"] = 2] = "Feature";
    })(EnumBossState || (EnumBossState = {}));
    var EnumUseState;
    (function (EnumUseState) {
        EnumUseState[EnumUseState["Friend"] = 1] = "Friend";
        EnumUseState[EnumUseState["League"] = 2] = "League";
    })(EnumUseState || (EnumUseState = {}));
    var EnumUIState;
    (function (EnumUIState) {
        EnumUIState[EnumUIState["Boss"] = 1] = "Boss";
        EnumUIState[EnumUIState["Friend"] = 2] = "Friend";
    })(EnumUIState || (EnumUIState = {}));
    var HXH_GroupFightFormate = (function (_super) {
        __extends(HXH_GroupFightFormate, _super);
        function HXH_GroupFightFormate() {
            var _this = _super.call(this) || this;
            _this.listMy1Index = 0;
            _this.listMy2Index = 0;
            _this.listFriIndex = 0;
            _this.LayerlistIndex = 0;
            _this.listFriendIndex = 0;
            _this.AwardmoveLocation0 = 0;
            _this.AwardmoveLocation1 = 0;
            _this.AwardmoveLocation2 = 0;
            _this.nodeUIState = [];
            _this.headBoss = [];
            _this.listBossFeature = [];
            _this.bossName = [];
            _this.groupBoss = [];
            _this.bGetFriendInfo = false;
            _this.bGetUnionInfo = false;
            _this.leagueInfo = [];
            _this.friendInfo = [];
            /** useType -- 0
             *  useRoleInfo -- 1*/
            _this.bUsedInfo = [];
            _this.useRoleInfo = []; // use info
            _this.bossInfo = [];
            _this.getListAllFri = [];
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightFormateSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonSet3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSet3, _this);
            _this.buttonSet1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSet1, _this);
            _this.buttonSet2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSet2, _this);
            _this.groupFightPos.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonFight, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            if (_this.width >= 1344) {
                _this.imageBg.scaleX = _this.width / 1334;
            }
            _this.groupRightHelp.visible = false;
            return _this;
        }
        HXH_GroupFightFormate.prototype.init = function () {
            this.nodeUIState[EnumUIState.Boss] = this.groupRightBoss;
            this.nodeUIState[EnumUIState.Friend] = this.groupRightHelp;
            this.headBoss = [
                this.imageBossIcon1,
                this.imageBossIcon2,
                this.imageBossIcon3,
            ];
            this.listBossFeature = [
                this.listViewBossSkill1,
                this.listViewBossSkill2,
                this.listViewBossSkill3,
            ];
            this.bossName = [
                this.labelBossName1,
                this.labelBossName2,
                this.labelBossName3,
            ];
            this.groupBoss = [
                this.groupBossSkill3,
                this.groupBossSkill2,
                this.groupBossSkill1,
            ];
            this.useState = EnumUseState.Friend;
            this.bossState = EnumBossState.Info;
            this.uiState = EnumUIState.Boss;
            // this.nodeUIState[EnumUIState.Friend].visible = false;
            //上阵猎人数量
            this.generalNum = zj.TableFormations.Item(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).generals; // 参战武将数量
            this.supportNum = zj.TableFormations.Item(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).supports; // 援助武将数量
            this.bUsedInfo = [
                this.useType = null,
                this.useRoleInfo = [],
            ];
            zj.PlayerGroupFightSystem.InitGroupBattleInfo();
        };
        HXH_GroupFightFormate.prototype.SetInfo = function (id, father) {
            this.id = id;
            this.father = father;
            this.init();
            this.DiffInfo = zj.PlayerGroupFightSystem.Instance(id);
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.hard, id % 10000);
            this.InitFriendState();
            this.SetInfoMyFormate();
            this.SetInfoFriendFormate();
            this.SetInfoBossInfo();
            this.SetInfoAssistTime();
        };
        //好友队伍剩余邀请次数
        HXH_GroupFightFormate.prototype.SetInfoAssistTime = function () {
            var useTime = zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
            var allTime = zj.PlayerVIPSystem.Level().assist_time;
            this.labelTimes.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.timeLastAssist, (allTime - useTime), allTime);
        };
        HXH_GroupFightFormate.prototype.InitFriendState = function () {
            this.friendFormate = new message.SimpleFormationInfo;
            for (var i = 0; i < this.generalNum; i++) {
                this.friendFormate.generals.push(0);
            }
            for (var i = 0; i < this.supportNum; i++) {
                this.friendFormate.supports.push(0);
            }
        };
        //左侧我的队伍
        HXH_GroupFightFormate.prototype.SetInfoMyFormate = function () {
            //第一队-----------------------
            var Team1 = [];
            for (var i = this.supportNum; i > 0; i--) {
                var a = zj.Game.PlayerFormationSystem.formatsGroupFight;
                var generalId = zj.Game.PlayerFormationSystem.formatsGroupFight[0].supports[i - 1];
                if (generalId == 0) {
                    Team1.push(0);
                }
                else {
                    var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[generalId];
                    Team1.push(generalInfo);
                }
            }
            for (var i = this.generalNum; i > 0; i--) {
                var generalId = zj.Game.PlayerFormationSystem.formatsGroupFight[0].generals[i - 1];
                if (generalId == 0) {
                    Team1.push(0);
                }
                else {
                    var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[generalId];
                    Team1.push(generalInfo);
                }
            }
            this.listMy1.itemRenderer = zj.CommonArenaEnemyTeamItem;
            this.listMy1Item = new eui.ArrayCollection();
            for (var i = 0; i < Team1.length; i++) {
                var data = new zj.CommonArenaEnemyTeamItemData();
                data.index = i + 1;
                data.showTeam = true;
                data.simpleInfo = Team1[i];
                this.listMy1Item.addItem(data);
            }
            this.listMy1.dataProvider = this.listMy1Item;
            this.listMy1Index = this.listMy1.selectedIndex;
            //第二队------------------------
            var Team2 = [];
            for (var i = this.supportNum; i > 0; i--) {
                var a = zj.Game.PlayerFormationSystem.formatsGroupFight;
                var generalId = zj.Game.PlayerFormationSystem.formatsGroupFight[1].supports[i - 1];
                if (generalId == 0) {
                    Team2.push(0);
                }
                else {
                    var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[generalId];
                    Team2.push(generalInfo);
                }
            }
            for (var i = this.generalNum; i > 0; i--) {
                var generalId = zj.Game.PlayerFormationSystem.formatsGroupFight[1].generals[i - 1];
                if (generalId == 0) {
                    Team2.push(0);
                }
                else {
                    var generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[generalId];
                    Team2.push(generalInfo);
                }
            }
            this.listMy2.itemRenderer = zj.CommonArenaEnemyTeamItem;
            this.listMy2Item = new eui.ArrayCollection();
            for (var i = 0; i < Team2.length; i++) {
                var data = new zj.CommonArenaEnemyTeamItemData();
                data.index = i + 1;
                data.showTeam = true;
                data.simpleInfo = Team2[i];
                this.listMy2Item.addItem(data);
            }
            this.listMy2.dataProvider = this.listMy2Item;
            this.listMy2Index = this.listMy2.selectedIndex;
        };
        HXH_GroupFightFormate.prototype.SetInfoFriendFormate = function () {
            var TeamFriend = [];
            for (var i = 0; i < this.generalNum + this.supportNum; i++) {
                if (i < this.supportNum) {
                    TeamFriend[this.supportNum - 1 - i] = this.friendFormate.supports[i] || [];
                }
                else {
                    TeamFriend[this.generalNum + 2 * this.supportNum - i - 1] = this.friendFormate.generals[i - this.supportNum] || [];
                }
            }
            this.listFri.itemRenderer = zj.CommonArenaEnemyTeamItem;
            this.listFriItem = new eui.ArrayCollection();
            for (var i = 0; i < TeamFriend.length; i++) {
                var data = new zj.CommonArenaEnemyTeamItemData();
                data.index = i + 1;
                data.showTeam = true;
                data.simpleInfo = TeamFriend[i];
                this.listFriItem.addItem(data);
            }
            this.listFri.dataProvider = this.listFriItem;
            this.listFriIndex = this.listFri.selectedIndex;
            var a = this.bUsedInfo[1].useRoleInfo;
            if (this.bUsedInfo[1].useRoleInfo) {
                var str = this.bUsedInfo[1].name;
                this.labelHelpName.text = str;
            }
            else {
                this.labelHelpName.text = zj.TextsConfig.TextsConfig_GroupFight.noFriend;
            }
        };
        //右侧首领信息
        HXH_GroupFightFormate.prototype.SetInfoBossInfo = function () {
            this.bossInfo = [];
            for (var n in this.DiffInfo.boss_roleId) {
                var info = this.DiffInfo.boss_roleId[n];
                info.id = this.DiffInfo.boss_roleId[n][0];
                info.feature = this.DiffInfo.feature[n];
                this.bossInfo.push(info);
            }
            for (var k in this.headBoss) {
                var v = this.headBoss[k];
                var m = this.bossInfo[k].id;
                var mapRoleId = zj.PlayerHunterSystem.Table(m);
                var eyePath = zj.TableMapRole.Item(mapRoleId.general_roleId).eye_head;
                v.source = zj.cachekey(eyePath, this);
            }
            for (var k in this.bossName) {
                var v = this.bossName[k];
                var str = this.DiffInfo.boss_name1[k];
                v.text = str;
                for (var k_1 in this.listBossFeature) {
                    var v_1 = this.listBossFeature[k_1];
                    var listLenght = this.bossInfo[k_1].feature;
                    this.listBossFeature[k_1].itemRenderer = zj.WantedSecondStartItem;
                    this.LayerlistItem = new eui.ArrayCollection();
                    for (var i = 0; i < listLenght.length; i++) {
                        var data = new zj.WantedSecondStartItemData();
                        data.father = this;
                        data.index = i;
                        data.talent = listLenght[i];
                        data.key = Number(k_1);
                        this.LayerlistItem.addItem(data);
                    }
                    this.listBossFeature[k_1].dataProvider = this.LayerlistItem;
                    this.LayerlistIndex = this.listBossFeature[k_1].selectedIndex;
                    var a = this.listBossFeature[k_1];
                    this["scrollerRewards" + k_1].viewport = this.listBossFeature[k_1];
                    this["scrollerRewards" + k_1].validateNow();
                    this["scrollerRewards" + k_1].viewport.scrollH = this["AwardmoveLocation" + k_1];
                    this["scrollerRewards" + k_1].left = 0;
                }
            }
        };
        //右侧好友信息
        HXH_GroupFightFormate.prototype.SetInfoFriendInfoList = function (bFirst) {
            this.listFriendTeam.itemRenderer = zj.HXH_GroupFightFormateItem;
            this.listFriendItem = new eui.ArrayCollection();
            for (var i = 0; i < this.friendInfo.length; i++) {
                var data = new zj.HXH_GroupFightFormateItemData();
                data.index = i;
                data.info = this.friendInfo[i];
                data.bFriend = true;
                data.father = this;
                this.listFriendItem.addItem(data);
            }
            this.listFriendTeam.dataProvider = this.listFriendItem;
            this.listFriendIndex = this.listFriendTeam.selectedIndex;
        };
        HXH_GroupFightFormate.prototype.getItemList = function () {
            for (var i = 0; i < this.friendInfo.length; i++) {
                var item = this.listFriendTeam.getElementAt(i);
                this.getListAllFri.push(item);
            }
        };
        //选择队伍
        HXH_GroupFightFormate.prototype.onButtonSet3 = function () {
            var _this = this;
            // this.SetFakeRoleInfo();
            // this.SetInfoFriendInfoList();
            if (this.friendInfo.length > 0 || this.bGetFriendInfo) {
                this.tmp();
            }
            else {
                this.GetFirendReq(function () { _this.tmp(); });
            }
        };
        HXH_GroupFightFormate.prototype.tmp = function () {
            var state = this.uiState == EnumUIState.Boss && EnumUIState.Friend || EnumUIState.Boss;
            this.SetUITagAni(state);
        };
        HXH_GroupFightFormate.prototype.GetFirendReq = function (cb) {
            var this_this = this;
            this_this.GroupBattleQuery_Visit()
                .then(function (data) {
                if (data.header.result == 0) {
                    // 解压其他gameinfo信息
                    var para = {};
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(data.body.formations, para);
                    var plain = inflate.decompress();
                    var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var RelationInfo = new message.SimpleRoleFormationZip();
                    if (!RelationInfo.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("其他游戏数据解析失败"));
                        return;
                    }
                    this_this.bGetFriendInfo = true;
                    this_this.friendInfo = RelationInfo.formations;
                    //新手假信息
                    this_this.SetFakeRoleInfo();
                    this_this.SortMsgInfo(1);
                    this_this.SetInfoFriendInfoList(true);
                    cb();
                }
                else {
                    this_this.friendInfo = [];
                    //新手假信息
                    this_this.SetFakeRoleInfo();
                    this_this.SortMsgInfo(1);
                    this_this.SetInfoFriendInfoList(true);
                    cb();
                }
            }).catch(function (reason) { });
        };
        HXH_GroupFightFormate.prototype.onButtonSet1 = function () {
            this.ButtonSetMyFormate(1);
        };
        HXH_GroupFightFormate.prototype.onButtonSet2 = function () {
            this.ButtonSetMyFormate(2);
        };
        HXH_GroupFightFormate.prototype.ButtonSetMyFormate = function (index) {
            var _this = this;
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            zj.loadUI(zj.HXH_CommonFormationPveGroupFigh)
                .then(function (Scene) {
                Scene.SetInfo(_this);
                Scene.SetInfoButtonClick(index);
                Scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HXH_GroupFightFormate.prototype.SetUITagAni = function (state) {
            var _this = this;
            for (var kk in this.nodeUIState) {
                var vv = this.nodeUIState[kk];
                if (state == kk) {
                    var a = this.nodeUIState[kk];
                    egret.Tween.get(this.nodeUIState[kk])
                        .to({ visible: true })
                        .to({ x: 400 }, 0)
                        .to({ x: 0 }, 300, egret.Ease.backOut).call(function () {
                        _this.uiState = state;
                        _this.SetInfoButtonSet3Pic();
                    });
                }
                else if (this.uiState == Number(kk)) {
                    egret.Tween.get(this.nodeUIState[kk]).wait(10)
                        .to({ visible: false })
                        .to({ x: 400 }, 300).call(function () {
                        _this.uiState = state;
                        _this.SetInfoButtonSet3Pic();
                    });
                }
            }
        };
        HXH_GroupFightFormate.prototype.SetInfoButtonSet3Pic = function () {
            if (this.uiState == EnumUIState.Boss) {
                this.enterOpen(zj.UIConfig.UIConfig_Hunter_GroupFight.chooseTeam[1]);
            }
            else if (this.uiState == EnumUIState.Friend) {
                this.enterOpen(zj.UIConfig.UIConfig_Hunter_GroupFight.unChooseTeam[1]);
            }
        };
        HXH_GroupFightFormate.prototype.enterOpen = function (ui) {
            zj.Set.ButtonBackgroud(this.buttonSet3, ui);
            this.buttonSet3.enabled = true;
            this.buttonSet3.touchEnabled = true;
        };
        HXH_GroupFightFormate.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        HXH_GroupFightFormate.prototype.onButtonFight = function () {
            var _this = this;
            var times = zj.Table.FindR(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleTime, function (k, v) {
                return k == 1;
            });
            if (times != null && times.value == zj.CommonConfig.group_battle_limit_times[zj.PlayerGroupFightSystem.fightGroupExt] && !zj.Device.isDebug) {
                //判断是否处于教学
                zj.toast_warning(zj.TextsConfig.TextsConfig_GroupFight.timeNotEnough);
            }
            var errorId = this.JudgeCanBat();
            if (errorId == 0 || (zj.Teach.bInTeaching && zj.Teach.m_bOpenTeach)) {
                this.MobsInfoReq()
                    .then(function () {
                    zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                    zj.loadUI(zj.HXH_GroupFightCombat)
                        .then(function (Scene) {
                        Scene.SetInfo(_this);
                        Scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                })
                    .then(function () {
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_GroupFight.needGeneral2[errorId - 1]);
            }
        };
        //拉取怪物副本信息
        HXH_GroupFightFormate.prototype.MobsInfoReq = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                request.body.mobsId = _this.id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
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
        HXH_GroupFightFormate.prototype.JudgeCanBat = function () {
            var bat1 = zj.Table.FindF(zj.Game.PlayerFormationSystem.formatsGroupFight[0].generals, function (k, v) {
                return v != 0;
            });
            var bat2 = zj.Table.FindF(zj.Game.PlayerFormationSystem.formatsGroupFight[1].generals, function (k, v) {
                return v != 0;
            });
            if (bat1 && bat2) {
                return 0;
            }
            else if (bat1) {
                return 2;
            }
            else {
                return 1;
            }
        };
        HXH_GroupFightFormate.prototype.SetTeach = function () {
            this.bInTeach = true;
            this.fakeRole = true;
        };
        HXH_GroupFightFormate.prototype.SortMsgInfo = function (type) {
            var tbl = [];
            if (type == 1) {
                tbl = this.friendInfo;
            }
            else if (type == 2) {
                tbl = this.leagueInfo;
            }
            zj.Table.Sort(tbl, function (a, b) {
                var bUsedA = zj.Table.FindF(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed, function (k, v) {
                    return v == a.baseInfo.id;
                });
                var bUsedB = zj.Table.FindF(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleUsed, function (k, v) {
                    return v == b.baseInfo.id;
                });
                var useA = bUsedA && 1 || 0;
                var useB = bUsedB && 1 || 0;
                return useA - useB;
            });
        };
        //新手假信息
        HXH_GroupFightFormate.prototype.SetFakeRoleInfo = function () {
            if (this.bInTeach != true) {
                return;
            }
            if (this.friendInfo != null) {
                this.fakeRole = false;
                return;
            }
            var roleInfo = new message.RoleBriefInfo;
            roleInfo.id = 0;
            roleInfo.name = zj.TextsConfig.TextsConfig_GroupFight.fakeRoleInfo.name;
            roleInfo.level = zj.TextsConfig.TextsConfig_GroupFight.fakeRoleInfo.level;
            var simpleInfo = new message.SimpleFormationInfo();
            for (var i = 0; i < 4; i++) {
                var general = new message.GeneralSimpleInfo();
                general = zj.teachBattle.groupFightFakeGeneralInfo.generals[i];
                simpleInfo.generals[i] = general;
            }
            for (var i = 0; i < 4; i++) {
                var supports = new message.GeneralSimpleInfo();
                supports = zj.teachBattle.groupFightFakeGeneralInfo.supports[i];
                simpleInfo.supports[i] = supports;
            }
            var baseInfo = new message.SimpleRoleFormationInfo();
            baseInfo.baseInfo = roleInfo;
            baseInfo.formation = simpleInfo;
            this.friendInfo.push(baseInfo);
        };
        HXH_GroupFightFormate.prototype.GroupBattleQuery_Visit = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GroupBattleQueryRequest();
                request.body.get_type = 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        //长按 技能 详情
        HXH_GroupFightFormate.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "Talenttouch";
            this.addChild(show);
        };
        // 长按 技能 抬起
        HXH_GroupFightFormate.prototype.removeShow = function () {
            var show = this.getChildByName("Talenttouch");
            if (show) {
                this.removeChild(show);
            }
        };
        return HXH_GroupFightFormate;
    }(zj.Scene));
    zj.HXH_GroupFightFormate = HXH_GroupFightFormate;
    __reflect(HXH_GroupFightFormate.prototype, "zj.HXH_GroupFightFormate");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightFormate.js.map