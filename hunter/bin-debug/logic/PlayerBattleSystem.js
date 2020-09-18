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
     * @author chen xi
     *
     * @date 2019-2-23
     *
     * @class 战斗数据系统
     */
    var PlayerBattleSystem = (function () {
        function PlayerBattleSystem() {
            this._multiResultInfo = new CustomBattleResultInfo();
            /**联赛未压缩数据 */
            this.multiReplayNozipInfo = [];
            /**联赛回放数据 */
            this.multiReplayInfo = [];
            /**连续战斗获取物品数据 */
            this.continueBattleDropItems = [];
            /**连续战斗获取宝物数据 */
            this.continueBattleDropPotatos = [];
            /**缓存战斗失败分析数据 */
            this.cacheBattleResultInfo = [];
            /**缓存战斗获得物品数据 */
            this.cacheBattleItemInfo = [];
            /**跨服战战斗数据信息 */
            this.battleSingleInfo = [];
            this.singleEnemyInfo = {
                roleId: -1,
                rank: -1,
                score: -1
            };
            this.pid = -1;
        }
        Object.defineProperty(PlayerBattleSystem.prototype, "multiResultInfo", {
            get: function () {
                return this._multiResultInfo;
            },
            set: function (v) {
                this._multiResultInfo = v;
            },
            enumerable: true,
            configurable: true
        });
        PlayerBattleSystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
        };
        PlayerBattleSystem.prototype.onBaseInfoChange = function () {
            this.initFightState();
        };
        PlayerBattleSystem.prototype.uninit = function () {
            this._multiResultInfo = new CustomBattleResultInfo();
            this.multiReplayNozipInfo = [];
            /**联赛回放数据 */
            this.multiReplayInfo = [];
            this.battleSequence = null;
            this.battleDetailFormation = null;
            this.cacheBattleResult = null;
            this.battleReportId = null;
            /**战斗结果数据(存储了当前过程及相关结果) */
            this.battleResultInfo = null;
            /**连续战斗获取物品数据 */
            this.continueBattleDropItems = [];
            /**连续战斗获取宝物数据 */
            this.continueBattleDropPotatos = [];
            /**缓存战斗失败分析数据 */
            this.cacheBattleResultInfo = [];
            /**缓存战斗获得物品数据 */
            this.cacheBattleItemInfo = [];
            this.pvpOppBriefInfo = 0;
            /**跨服战战斗数据信息 */
            this.battleSingleInfo = [];
            this.singBattle = 0;
            this.singleEnemyInfo = {
                roleId: -1,
                rank: -1,
                score: -1
            };
        };
        PlayerBattleSystem.prototype.setFightState = function () {
            var arr = JSON.stringify(zj.Gmgr.Instance.backupAutoTbl);
            zj.Game.Controller.setRoleStorageItem("FightState", arr);
            arr = JSON.stringify(zj.Gmgr.Instance.backupSpeedTbl);
            zj.Game.Controller.setRoleStorageItem("FightSpeed", arr);
        };
        PlayerBattleSystem.prototype.initFightState = function () {
            if (zj.Game.PlayerInfoSystem.BaseInfo.id != this.pid) {
                this.resetFightAuto();
                this.resetFightSpeed();
                this.pid = zj.Game.PlayerInfoSystem.BaseInfo.id;
            }
        };
        PlayerBattleSystem.prototype.resetFightAuto = function (args) {
            if (zj.Gmgr.Instance.backupAutoTbl.length == 0) {
                zj.Gmgr.Instance.backupAutoTbl = [];
                for (var i = message.EFormationType.FORMATION_TYPE_NONO + 1; i <= message.EFormationType.FORMATION_TYPE_CNT - 1; i++) {
                    zj.Gmgr.Instance.backupAutoTbl[i] = false;
                }
            }
            var data = zj.Game.Controller.getRoleStorageItem("FightState");
            if (data != null && data != undefined && data != "") {
                var formation = JSON.parse(data);
                if (formation.length > 0) {
                    zj.Gmgr.Instance.backupAutoTbl = formation;
                }
            }
        };
        PlayerBattleSystem.prototype.resetFightSpeed = function (args) {
            if (zj.Gmgr.Instance.backupSpeedTbl.length == 0) {
                zj.Gmgr.Instance.backupSpeedTbl = [];
                for (var i = message.EFormationType.FORMATION_TYPE_NONO + 1; i <= message.EFormationType.FORMATION_TYPE_CNT - 1; i++) {
                    zj.Gmgr.Instance.backupSpeedTbl[i] = 1.0;
                }
            }
            var data = zj.Game.Controller.getRoleStorageItem("FightSpeed");
            if (data != null && data != undefined && data != "") {
                var speed = JSON.parse(data);
                if (speed.length > 0) {
                    zj.Gmgr.Instance.backupSpeedTbl = speed;
                }
            }
        };
        //战斗发起回复
        PlayerBattleSystem.prototype.sendFight = function (request) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    } //战斗发起回复
                    _this.battleSequence = response.body.sequence;
                    if (response.body.detailFormation.length > 0) {
                        var para = {};
                        para["index"] = 4;
                        var inflate = new Zlib.Inflate(response.body.detailFormation, para);
                        var plain = inflate.decompress();
                        var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                        var detailForma = new message.DetailFormationInfo();
                        if (!detailForma.parse_bytes(decoder)) {
                            zj.toast(zj.LANG("游戏数据解析失败"));
                            return;
                        }
                        _this.battleDetailFormation = detailForma;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    zj.toast(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        PlayerBattleSystem.prototype.sendMobReq = function (request) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    zj.toast(zj.LANG("请求超时"));
                    reject("timeout");
                    return;
                }, _this, false);
                return;
            });
        };
        //鼠崽闹春
        PlayerBattleSystem.prototype.sendMobReq1 = function (request) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    zj.toast(zj.LANG("请求超时"));
                    reject("timeout");
                    return;
                }, _this, false);
                return;
            });
        };
        /**
         * 解压战斗数据
         * @param msg
         * @param bContend
         */
        PlayerBattleSystem.prototype.UncompressBattleData = function (msg, bContend) {
            this.multiResultInfo.is_check = msg.is_check;
            this.multiResultInfo.battleId = msg.battleId;
            this.multiResultInfo.battleType = msg.battleType;
            this.multiResultInfo.battleResult = msg.battleResult;
            this.multiResultInfo.battleStar = msg.battleStar;
            this.multiResultInfo.battleTime = msg.battleTime;
            this.multiResultInfo.totalDamage = msg.totalDamage;
            this.multiResultInfo.maxCombo = msg.maxCombo;
            this.multiResultInfo.battleData = msg.battleData;
            // to do ?
            // let item;
            if ((msg.battleType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
                || msg.battleType == message.EFormationType.FORMATION_TYPE_PVP_THIRD
                || msg.battleType == message.EFormationType.FORMATION_TYPE_GROUP_FIGHT)) {
                var para = {};
                var decoder = void 0;
                if (bContend != null && bContend == true) {
                    decoder = new aone.BinaryDecoder(new Uint8Array(msg.battleData));
                    var items = new message.MultiResultInfo();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newMultiResultInfo = items;
                }
                else if (bContend != null && bContend == false) {
                    var para_1 = {};
                    para_1["index"] = 4;
                    var inflate = new Zlib.Inflate(msg.battleData, para_1);
                    var plain = inflate.decompress();
                    var decoder_1 = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.ReplayBattleInfo();
                    if (!items.parse_bytes(decoder_1)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newReplayBattleInfo = items;
                }
                else {
                    para["index"] = 4;
                    var inflate = new Zlib.Inflate(msg.battleData, para);
                    var plain = inflate.decompress();
                    decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                    var items = new message.MultiResultInfo();
                    if (!items.parse_bytes(decoder)) {
                        zj.toast(zj.LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newMultiResultInfo = items;
                }
            }
            else {
                // this.multiResultInfo.battleData = JSON.parse(msg.battleData);
                var para = {};
                para["index"] = 4;
                var inflate = new Zlib.Inflate(msg.battleData, para);
                var plain = inflate.decompress();
                var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
                var items = new message.ReplayBattleInfo();
                if (!items.parse_bytes(decoder)) {
                    zj.toast(zj.LANG("游戏数据解析失败"));
                    return false;
                }
                this.multiResultInfo.newReplayBattleInfo = items;
                // item = items;
                // return (this.multiResultInfo.battleData != null);
            }
            return true;
        };
        /**这个是结束战斗的返回逻辑根据类型去不同的场景! */
        PlayerBattleSystem.prototype.goBattleBefore = function () {
            if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                // function tmp(){
                //     Gmgr.Instance.bPause = false;
                //     //PushUI("League_Home")
                // }
            }
        };
        return PlayerBattleSystem;
    }());
    zj.PlayerBattleSystem = PlayerBattleSystem;
    __reflect(PlayerBattleSystem.prototype, "zj.PlayerBattleSystem");
    var CustomBattleResultInfo = (function (_super) {
        __extends(CustomBattleResultInfo, _super);
        function CustomBattleResultInfo() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.newMultiResultInfo = null;
            _this.newReplayBattleInfo = null;
            _this.newMoreSimpleFormationInfo = null;
            return _this;
        }
        return CustomBattleResultInfo;
    }(message.BattleResultInfo));
    zj.CustomBattleResultInfo = CustomBattleResultInfo;
    __reflect(CustomBattleResultInfo.prototype, "zj.CustomBattleResultInfo");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerBattleSystem.js.map