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
    // HXH_GroupFightCombat (飞龙营地 -- 挑战)
    // wangshenzhuo
    // 2019/03/15
    var HXH_GroupFightCombat = (function (_super) {
        __extends(HXH_GroupFightCombat, _super);
        function HXH_GroupFightCombat() {
            var _this = _super.call(this) || this;
            _this.groupleft = [];
            _this.groupright = [];
            _this.imageleft = [];
            _this.imageright = [];
            _this.nameleft = [];
            _this.nameright = [];
            _this.order = [];
            _this.leftPos = [];
            _this.rightPos = [];
            _this.skinName = "resource/skins/darkLand/HXH_GroupFightCombatSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonChange1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChange1, _this);
            _this.buttonChange2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChange2, _this);
            _this.buttonCombat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonOpen, _this);
            if (_this.width >= 1344) {
                _this.imageBg.scaleX = _this.width / 1334;
            }
            _this.init();
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        HXH_GroupFightCombat.prototype.init = function () {
            var _this = this;
            this.groupleft = [
                this.groupTeam1,
                this.groupTeam2,
                this.groupTeam3,
            ];
            this.groupright = [
                this.groupEnemy1,
                this.groupEnemy2,
                this.groupEnemy3,
            ];
            this.imageleft = [
                this.imageTeamIcon1,
                this.imageTeamIcon2,
                this.imageTeamIcon3,
            ];
            this.imageright = [
                this.imageEnemyIcon1,
                this.imageEnemyIcon2,
                this.imageEnemyIcon3,
            ];
            this.nameleft = [
                this.labelTeamName1,
                this.labelTeamName2,
                this.labelTeamName3,
            ];
            this.nameright = [
                this.labelEnemyName1,
                this.labelEnemyName2,
                this.labelEnemyName3,
            ];
            this.order = [1, 2, 3];
            for (var k in this.groupleft) {
                var v = this.groupleft[k];
                v.visible = false;
            }
            for (var k in this.groupright) {
                var v = this.groupright[k];
                v.visible = false;
            }
            for (var k in this.imageleft) {
                var v = this.imageleft[k];
                v.visible = false;
            }
            for (var k in this.imageright) {
                var v = this.imageright[k];
                v.visible = false;
            }
            this.buttonChange1.visible = false;
            this.buttonChange2.visible = false;
            this.InitMovePos();
            egret.Tween.get(this).wait(500).call(function () {
                _this.EntranceAni();
            });
        };
        HXH_GroupFightCombat.prototype.SetTeach = function () {
            this.bInteach = true;
        };
        //开场动画
        HXH_GroupFightCombat.prototype.EntranceAni = function () {
            var _this = this;
            for (var k in this.groupleft) {
                var v = this.groupleft[k];
                egret.Tween.get(this.groupleft[k])
                    .to({ visible: false }, 0)
                    .to({ x: -480 }, 0).wait(100 * (Number(k)))
                    .to({ visible: true })
                    .to({ x: 10 }, 200, egret.Ease.sineOut)
                    .to({ x: 0 }, 50);
            }
            for (var k in this.groupright) {
                var v = this.groupright[k];
                egret.Tween.get(this.groupright[k])
                    .to({ visible: false }, 0)
                    .to({ x: 480 }, 0).wait(100 * (Number(k)))
                    .to({ visible: true })
                    .to({ x: -10 }, 200, egret.Ease.sineOut)
                    .to({ x: 0 }, 50);
            }
            for (var k in this.imageleft) {
                var v = this.imageleft[k];
                egret.Tween.get(this.imageleft[k])
                    .to({ visible: false }, 0)
                    .to({ x: -480 }, 0).wait(200 * (Number(k)))
                    .to({ visible: true })
                    .to({ x: 64 }, 200, egret.Ease.sineOut)
                    .to({ x: 54 }, 50);
            }
            var _loop_1 = function (k) {
                var v = this_1.imageright[k];
                egret.Tween.get(this_1.imageright[k])
                    .to({ visible: false }, 0)
                    .to({ x: 200 }, 0).wait(200 * (Number(k)))
                    .to({ visible: true })
                    .to({ x: 0 }, 200, egret.Ease.sineOut)
                    .to({ x: 10 }, 50).call(function () {
                    if (Number(k) == 2) {
                        _this.buttonChange1.visible = true;
                        _this.buttonChange2.visible = true;
                    }
                });
            };
            var this_1 = this;
            for (var k in this.imageright) {
                _loop_1(k);
            }
        };
        HXH_GroupFightCombat.prototype.SetInfo = function (father) {
            this.father = father;
            this.labelLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.hard, this.father.DiffInfo.id % 10000);
            this.SetInfoRightInfo();
            this.SetInfoFightFormation();
            this.SetInfoLeftInfo();
        };
        //右侧领主boss信息
        HXH_GroupFightCombat.prototype.SetInfoRightInfo = function () {
            for (var k in this.father.DiffInfo.boss_roleId) {
                var v = this.father.DiffInfo.boss_roleId[k];
                var generalId = v[0];
                var teamName = this.father.DiffInfo.boss_name1[k];
                var mapRoleId = zj.PlayerHunterSystem.Table(generalId).general_roleId;
                var eyePath = zj.TableMapRole.Table()[mapRoleId].eye_head;
                this.imageright[k].source = zj.cachekey(eyePath, this);
                this.nameright[k].visible = true;
                this.nameright[k].text = teamName;
            }
        };
        HXH_GroupFightCombat.prototype.SetInfoFightFormation = function () {
            for (var k in this.order) {
                var v = this.order[k];
                var formation = new message.DetailFormationInfo;
                if (v == 3) {
                    formation = this.father.friendFormate;
                }
                else {
                    formation.advisers = zj.Game.PlayerAdviserSystem.adviser;
                    formation.pets = zj.Game.PlayerAdviserSystem.petInfo;
                    formation.historyGenerals = zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds();
                    for (var i = 0; i < this.father.generalNum; i++) {
                        var generalInfo = new message.GeneralInfo;
                        if (zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i] != 0 && zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i] != null) {
                            generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals[i]];
                        }
                        formation.generals.push(generalInfo);
                    }
                    for (var i = 0; i < this.father.supportNum; i++) {
                        var generalInfo = new message.GeneralInfo;
                        if (zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i] != 0 && zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i] != null) {
                            generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].supports[i]];
                        }
                        formation.supports.push(generalInfo);
                    }
                }
                zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[k] = formation;
            }
        };
        //左侧君主信息
        HXH_GroupFightCombat.prototype.SetInfoLeftInfo = function () {
            for (var k in this.order) {
                var v = this.order[k];
                var generalId = null;
                var teamName = zj.TextsConfig.TextsConfig_GroupFight.noFriend;
                if (v == 3) {
                    var findGeneralId = zj.Table.FindR(this.father.friendFormate.generals, function (kk, vv) {
                        if (vv == 0) {
                            return false;
                        }
                        else {
                            return vv.general_id != 0;
                        }
                    });
                    if (findGeneralId[0] == null) {
                        generalId = 0;
                        teamName = zj.TextsConfig.TextsConfig_GroupFight.noFriend;
                    }
                    else {
                        generalId = findGeneralId[0].general_id;
                        teamName = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_GroupFight.teamName, this.father.bUsedInfo[1].name);
                    }
                }
                else {
                    var a = zj.Game.PlayerFormationSystem.formatsGroupFight;
                    var findGeneralId = zj.Table.FindR(zj.Game.PlayerFormationSystem.formatsGroupFight[v - 1].generals, function (kk, vv) {
                        return vv != 0;
                    });
                    generalId = findGeneralId[0] || 0;
                    teamName = zj.TextsConfig.TextsConfig_GroupFight.myTeamName[v - 1];
                }
                if (generalId != 0 && generalId != null) {
                    var mapRoleId = zj.PlayerHunterSystem.Table(generalId).general_roleId;
                    var eyePath = zj.TableMapRole.Table()[mapRoleId].eye_head;
                    this.imageleft[k].source = zj.cachekey(eyePath, this);
                }
                else {
                    var eyePath = "hero_role_wu_png";
                    this.imageleft[k].source = zj.cachekey(eyePath, this);
                }
                this.nameleft[k].text = teamName;
            }
        };
        HXH_GroupFightCombat.prototype.onButtonChange1 = function () {
            this.buttonChange1.enabled = false;
            this.buttonChange2.enabled = false;
            this.SetInfoControlMove(0);
        };
        HXH_GroupFightCombat.prototype.onButtonChange2 = function () {
            this.buttonChange1.enabled = false;
            this.buttonChange2.enabled = false;
            this.SetInfoControlMove(1);
        };
        HXH_GroupFightCombat.prototype.SetInfoControlMove = function (index) {
            var _this = this;
            egret.Tween.get(this.imageleft[index + 1]).wait(200)
                .to({ x: this["Posx" + (index + 1)], y: this["Posy" + (index + 1)] }, 5)
                .to({ x: this["Posx" + index], y: this["Posy" + index] }, 410, egret.Ease.sineInOut).call(function () {
                _this.tmp(index);
                _this.buttonChange1.enabled = true;
                _this.buttonChange2.enabled = true;
            });
            egret.Tween.get(this.imageleft[index]).wait(200)
                .to({ x: this["Posx" + index], y: this["Posy" + index] }, 0)
                .to({ x: this["Posx" + (index + 1)], y: this["Posy" + (index + 1)] }, 400, egret.Ease.sineInOut);
        };
        HXH_GroupFightCombat.prototype.tmp = function (index) {
            var _this = this;
            var tmp = zj.Table.DeepCopy(this.order[index]);
            this.order[index] = this.order[index + 1];
            this.order[index + 1] = tmp;
            var imgTmp = this.imageleft[index];
            this.imageleft[index] = this.imageleft[index + 1];
            this.imageleft[index + 1] = imgTmp;
            var tmps = zj.Table.DeepCopy(zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index]);
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index] = zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index + 1];
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[index + 1] = tmps;
            setTimeout(function () {
                _this.SetInfoLeftInfo();
            }, 100);
        };
        HXH_GroupFightCombat.prototype.InitMovePos = function () {
            for (var i = 0; i < 3; i++) {
                this["Posx" + i] = this.imageleft[i].x;
                this["Posy" + i] = this.imageleft[i].y;
            }
            this.leftPos = [];
            this.rightPos = [];
            for (var i = 0; i < 2; i++) {
                var p0 = [0, 0];
                var p1 = [55, (this["Posy" + (i + 1)] - this["Posy" + i]) / 2];
                var p2 = [0, (this["Posy" + (i + 1)] - this["Posy" + i])];
                var p3 = [0, 0];
                var p4 = [0 - 35, (this["Posy" + i] - this["Posy" + (i + 1)]) / 2];
                var p5 = [0, (this["Posy" + i] - this["Posy" + (i + 1)])];
                var arrayLeft = this.CurvilinearPath(p3, p4, p5);
                var arrayRight = this.CurvilinearPath(p0, p1, p2);
                this.rightPos.push(arrayRight);
                this.leftPos.push(arrayLeft);
            }
        };
        HXH_GroupFightCombat.prototype.CurvilinearPath = function (p0, p1, p2) {
            var result = [];
            for (var i = 0; i < 10; i++) {
                var t = i / 10;
                result[i] = [];
                result[i]["x"] = (1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * p0[0] + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * p1[0] + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * p2[0]);
                result[i]["y"] = (1 * Math.pow(1 - t, 2) * Math.pow(t, 0) * p0[1] + 2 * Math.pow(1 - t, 1) * Math.pow(t, 1) * p1[1] + 1 * Math.pow(1 - t, 0) * Math.pow(t, 2) * p2[1]);
            }
            result.push(p0);
            return result;
        };
        HXH_GroupFightCombat.prototype.onButtonOpen = function () {
            if (this.father.bUsedInfo[1].id == null || this.father.bUsedInfo[1].id == 0) {
                if (this.father.fakeRole == true && this.father.bInTeach == true) {
                    this.SetFakeDetailRoleInfo();
                    this.BattleStart_Req();
                }
                else {
                    var baseDetailInfo = new message.DetailFormationInfo;
                    this.SetInfoDetailsInfo(baseDetailInfo);
                    this.BattleStart_Req();
                }
            }
            else {
                this.GetFirendFormationReq();
            }
        };
        HXH_GroupFightCombat.prototype.GetFirendFormationReq = function () {
            var _this = this;
            var id = this.father.bUsedInfo[1].id;
            var groupid = this.father.bUsedInfo[1].group_id;
            zj.Game.PlayerInfoSystem.queryRoleInfo(id, groupid, message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).then(function (resp) {
                _this.SetInfoDetailsInfo(resp.formations[0]);
                _this.BattleStart_Req();
            }).catch(function (reason) { });
        };
        HXH_GroupFightCombat.prototype.BattleStart_Req = function () {
            var _this = this;
            var request = new message.BattleStartRequest();
            request.body.type = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            request.body.id = this.father.id;
            request.body.ext = this.father.bUsedInfo[1].id || 0;
            zj.Game.PlayerBattleSystem.sendFight(request)
                .then(function (value) {
                var FightCB = function () {
                    zj.Game.PlayerFormationSystem.curFormationIndex = 1;
                    zj.Gmgr.Instance.starcraftIndex = 1;
                    _this.CacheGroupSkillSpineId();
                    zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneFightBGroupFight);
                };
                zj.FightLoading.getInstance().loadFightRes(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT, FightCB, _this);
            }).catch(function (reason) {
            });
        };
        HXH_GroupFightCombat.prototype.CacheGroupSkillSpineId = function () {
            zj.Gmgr.Instance.relatedAsynDataId = [];
            var detailFormation = zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[zj.Gmgr.Instance.starcraftIndex];
            for (var i = 0; i < detailFormation.generals.length; i++) {
                var generalInfo = detailFormation.generals[i];
                if (generalInfo.general_id != 0) {
                    for (var x = 0; x < generalInfo.skills.length; x++) {
                        zj.Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
                    }
                }
            }
            for (var i = 0; i < detailFormation.supports.length; i++) {
                var generalInfo = detailFormation.supports[i];
                if (generalInfo.general_id != 0) {
                    for (var x = 0; x < generalInfo.skills.length; x++) {
                        zj.Gmgr.Instance.relatedAsynDataId.push(generalInfo.skills[x].skillId);
                    }
                }
            }
            var retTbl = zj.PlayerGroupFightSystem.Instance(zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId);
            var stageId = retTbl.monster_stages[zj.Gmgr.Instance.starcraftIndex - 1];
            var enemys = zj.getEnemyFomation({ stageId: stageId });
            for (var k in enemys) {
                var v = enemys[k];
                var info = zj.Game.PlayerMobSystem.Instance(v.id);
                zj.Gmgr.Instance.relatedAsynDataId.push(info.skill_ids);
            }
        };
        HXH_GroupFightCombat.prototype.SetInfoDetailsInfo = function (formation) {
            var key = zj.Table.FindK(this.order, 3);
            var star = zj.Table.FindRcall(zj.Game.PlayerWantedSystem.wantedInfo.groupBattleStar, function (k, v) {
                return v.key == this.father.id;
            }, this);
            if (star == null || star[0] == null) {
                zj.PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = 0;
            }
            else {
                zj.PlayerGroupFightSystem.groupFightDetailsInfo.starBeforeBattle = star[0].value;
            }
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.instanceId = this.father.id;
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerPos = this.order;
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.leftInfo[key] = formation;
            zj.PlayerGroupFightSystem.groupFightDetailsInfo.cheerRoleInfo = this.father.bUsedInfo[1];
        };
        HXH_GroupFightCombat.prototype.SetFakeDetailRoleInfo = function () {
            var baseDetailInfo = new message.DetailFormationInfo;
            for (var i = 0; i < 4; i++) {
                var general = new message.GeneralInfo;
            }
        };
        HXH_GroupFightCombat.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        return HXH_GroupFightCombat;
    }(zj.Scene));
    zj.HXH_GroupFightCombat = HXH_GroupFightCombat;
    __reflect(HXH_GroupFightCombat.prototype, "zj.HXH_GroupFightCombat");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GroupFightCombat.js.map