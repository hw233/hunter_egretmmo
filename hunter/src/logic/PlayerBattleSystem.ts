namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-2-23
     * 
     * @class 战斗数据系统
     */
    export class PlayerBattleSystem {

        private _multiResultInfo: CustomBattleResultInfo = new CustomBattleResultInfo();
        public get multiResultInfo(): CustomBattleResultInfo {
            return this._multiResultInfo;
        }
        public set multiResultInfo(v: CustomBattleResultInfo) {
            this._multiResultInfo = v;
        }
        /**联赛未压缩数据 */
        public multiReplayNozipInfo = [];
        /**联赛回放数据 */
        public multiReplayInfo = [];
        public battleSequence;
        public battleDetailFormation;
        public cacheBattleResult;
        public battleReportId;
        /**战斗结果数据(存储了当前过程及相关结果) */
        public battleResultInfo;
        /**连续战斗获取物品数据 */
        public continueBattleDropItems = [];
        /**连续战斗获取宝物数据 */
        public continueBattleDropPotatos = [];
        /**缓存战斗失败分析数据 */
        public cacheBattleResultInfo = [];
        /**缓存战斗获得物品数据 */
        public cacheBattleItemInfo = [];

        public pvpOppBriefInfo;
        /**跨服战战斗数据信息 */
        public battleSingleInfo = [];

        public singBattle;

        public singleEnemyInfo = {
            roleId: -1,
            rank: -1,
            score: -1
        };

        public init() {
            Game.EventManager.on(GameEvent.PLAYER_BASE_INFO_CHANGE, this.onBaseInfoChange, this);
        }
        public onBaseInfoChange() {
            this.initFightState();
        }
        public uninit() {
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
        }

        public setFightState() {
            let arr = JSON.stringify(Gmgr.Instance.backupAutoTbl);
            Game.Controller.setRoleStorageItem("FightState", arr);

            arr = JSON.stringify(Gmgr.Instance.backupSpeedTbl);
            Game.Controller.setRoleStorageItem("FightSpeed", arr);
        }
        public pid = -1;
        public initFightState() {
            if (Game.PlayerInfoSystem.BaseInfo.id != this.pid) {
                this.resetFightAuto();
                this.resetFightSpeed();
                this.pid = Game.PlayerInfoSystem.BaseInfo.id;
            }
        }


        public resetFightAuto(args?) {
            if (Gmgr.Instance.backupAutoTbl.length == 0) {
                Gmgr.Instance.backupAutoTbl = []
                for (let i = message.EFormationType.FORMATION_TYPE_NONO + 1; i <= message.EFormationType.FORMATION_TYPE_CNT - 1; i++) {
                    Gmgr.Instance.backupAutoTbl[i] = false;
                }
            }
            let data = Game.Controller.getRoleStorageItem("FightState");
            if (data != null && data != undefined && data != "") {
                let formation: Array<string> = JSON.parse(data);
                if (formation.length > 0) {
                    Gmgr.Instance.backupAutoTbl = formation;
                }
            }
        }

        public resetFightSpeed(args?) {
            if (Gmgr.Instance.backupSpeedTbl.length == 0) {
                Gmgr.Instance.backupSpeedTbl = [];
                for (let i = message.EFormationType.FORMATION_TYPE_NONO + 1; i <= message.EFormationType.FORMATION_TYPE_CNT - 1; i++) {
                    Gmgr.Instance.backupSpeedTbl[i] = 1.0
                }
            }
            let data = Game.Controller.getRoleStorageItem("FightSpeed");
            if (data != null && data != undefined && data != "") {
                let speed: Array<string> = JSON.parse(data);
                if (speed.length > 0) {
                    Gmgr.Instance.backupSpeedTbl = speed;
                }
            }
        }
        //战斗发起回复
        public sendFight(request): Promise<{}> {
            return new Promise((resolve, reject) => {
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.BattleStartResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }//战斗发起回复
                    this.battleSequence = response.body.sequence;

                    if (response.body.detailFormation.length > 0) {
                        let para = {}
                        para["index"] = 4;
                        let inflate = new Zlib.Inflate(response.body.detailFormation, para);
                        let plain = inflate.decompress();
                        let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                        let detailForma = new message.DetailFormationInfo()
                        if (!detailForma.parse_bytes(decoder)) {
                            toast(LANG("游戏数据解析失败"));
                            return;
                        }
                        this.battleDetailFormation = detailForma;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    toast(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public sendMobReq(request): Promise<{}> {
            return new Promise((resolve, reject) => {
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.ChallengeMobResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    toast(LANG("请求超时"));
                    reject("timeout");
                    return;
                }, this, false);
                return;
            });
        }

        //鼠崽闹春
        public sendMobReq1(request): Promise<{}> {
            return new Promise((resolve, reject) => {
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.ActivityRandInstanceResultResponse>resp;
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    toast(LANG("请求超时"));
                    reject("timeout");
                    return;
                }, this, false);
                return;
            });
        }

        /**
         * 解压战斗数据
         * @param msg 
         * @param bContend 
         */
        public UncompressBattleData(msg: message.BattleResultInfo, bContend?: boolean) {
            this.multiResultInfo.is_check = msg.is_check;
            this.multiResultInfo.battleId = msg.battleId
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
                let para = {}
                let decoder
                if (bContend != null && bContend == true) {
                    decoder = new aone.BinaryDecoder(new Uint8Array(msg.battleData))
                    let items = new message.MultiResultInfo()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newMultiResultInfo = items;
                } else if (bContend != null && bContend == false) {
                    let para = {}
                    para["index"] = 4;
                    let inflate = new Zlib.Inflate(msg.battleData, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let items = new message.ReplayBattleInfo()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newReplayBattleInfo = items;
                } else {
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(msg.battleData, para);
                    let plain = inflate.decompress();
                    decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let items = new message.MultiResultInfo()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return false;
                    }
                    this.multiResultInfo.newMultiResultInfo = items;
                }

            } else {
                // this.multiResultInfo.battleData = JSON.parse(msg.battleData);
                let para = {}
                para["index"] = 4;
                let inflate = new Zlib.Inflate(msg.battleData, para);
                let plain = inflate.decompress();
                let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                let items = new message.ReplayBattleInfo()
                if (!items.parse_bytes(decoder)) {
                    toast(LANG("游戏数据解析失败"));
                    return false;
                }
                this.multiResultInfo.newReplayBattleInfo = items;
                // item = items;
                // return (this.multiResultInfo.battleData != null);
            }

            return true;
        }
        /**这个是结束战斗的返回逻辑根据类型去不同的场景! */
        public goBattleBefore() {
            if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS) {
                // function tmp(){
                //     Gmgr.Instance.bPause = false;
                //     //PushUI("League_Home")
                // }
            }
        }

    }

    export class CustomBattleResultInfo extends message.BattleResultInfo {
        newMultiResultInfo: message.MultiResultInfo = null;
        newReplayBattleInfo: message.ReplayBattleInfo = null;
        newMoreSimpleFormationInfo: message.MoreSimpleFormationInfo = null;
    }
}