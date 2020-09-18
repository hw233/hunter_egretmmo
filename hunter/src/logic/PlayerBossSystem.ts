namespace zj {
export class PlayerBossSystem {
    ///////////////////////////////////////////////////////////////////////////
    // 变量
    public ActivityBoss = {
        inZorkBoss: false,
        isZorkBossEnd: false,
        serverSceneId: 0,
        cityId: 0,
        bossInfo: new message.BossInfo(),		//BOSS信息
        roleInfo: {},
        chatInfosMini: [],
        bChatAdd: false,
        rankItems: [],      //攻击BOSS的全体成员信息
        groupName: null,
        resultInfo: {},
        myRank: 0,          //自身排名
        bossId: 0,
        tips: 3,
    }
    //////////////////////////////////////////////////////////////////////////
    //成员方法
    public uninit() {
        this.ActivityBoss = {
            inZorkBoss: false,
            isZorkBossEnd: false,
            serverSceneId: 0,
            cityId: 0,
            bossInfo: new message.BossInfo(),		//BOSS信息
            roleInfo: {},
            chatInfosMini: [],
            bChatAdd: false,
            rankItems: [],      //攻击BOSS的全体成员信息
            groupName: null,
            resultInfo: {},
            myRank: 0,          //自身排名
            bossId: 0,
            tips: 3,
        }
    }

    public GetBossRankGoodsTbl() {
        let tblWonderBossRanks = [];
        let a = Game.PlayerActivitySystem.Activities;
        for (let kk in Game.PlayerActivitySystem.Activities) {
            let vv = Game.PlayerActivitySystem.Activities[kk];
            if (vv.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {
                tblWonderBossRanks = vv.rankRewards;
                this.ActivityBoss.bossId = vv.buffValue;
            }
        }
        return tblWonderBossRanks;
    }

    /**
     * 活动BOSS开启时间，结束时间；
     * 返回值 [bOpen:boolean,lastTime:number]
    */
    public ActivityBossOpenTime() {
        let bOpen = false;
        let lastTime = 0;
        let curTime = Game.Controller.serverNow();
        let curSec: number = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
        let timePart = [];
        for (let i = 0; i < CommonConfig.darkland_boss_open_time.length; i++) {
            for (let j = 0; j < 2; j++) {
                let timeDiff = CommonConfig.darkland_boss_open_time[i][j] - curSec;
                if (timeDiff > 0) {
                    timePart.push([j, timeDiff]);
                }
            }
        }
        timePart.sort((a, b) => {
            return a[1] - b[1];
        });
        if (timePart[0] != null) {
            bOpen = !(timePart[0][0] == 0);
            lastTime = timePart[0][1];
        } else {
            bOpen = false;
            lastTime = (86400 - curSec) + CommonConfig.darkland_boss_open_time[0][0];
        }

        return [bOpen, lastTime];
    }

    /**
     * 活动开启前5分钟/结束后5分钟
     * 返回值 IsStart：开始前（boolean）;
     *        IsOver：结束后（boolean）;
     *        StartFive：number;
     *        300- OverFive：number;
     */
    public ActivityBossIsFive() {
        let battleNum = 0;
        let curTime = Game.Controller.serverNow();
        let curSec: number = curTime.getHours() * 3600 + (curTime.getMinutes()) * 60 + curTime.getSeconds();
        let IsStart = false;
        let IsOver = false;
        let a = Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime;
        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime.length == 0) {
            battleNum = 0;
        } else if (curSec - CommonConfig.darkland_boss_open_time[0][1] > CommonConfig.darkland_boss_coming_minute * 60) {
            battleNum = 1;
        } else {
            battleNum = Game.PlayerMixUnitInfoSystem.mixunitinfo.bossBattleTime[0].key - 1;
        }

        let StartFive = CommonConfig.darkland_boss_open_time[battleNum][0] - curSec;
        let OverFive = curSec - CommonConfig.darkland_boss_open_time[battleNum][1];

        //开始前5分钟
        if (StartFive < 300 && StartFive > 0) {
            IsStart = true;
        }

        //结束后5分钟
        if (OverFive <= 300 && OverFive > 0) {
            IsOver = true;
        }

        return [IsStart, IsOver, StartFive, 300 - OverFive];

    }

    public GetBossActivityOpen() {
        for (let kk in Game.PlayerActivitySystem.Activities) {
            let vv = Game.PlayerActivitySystem.Activities[kk];
            if (vv.type == message.ActivityType.ACT_TYPE_BOSS_BATTLE) {
                return true
            }
        }
        return false;
    }
    /**关闭活动BOSS */
    public closeActivityBoss() {
        Game.PlayerBossSystem.DarklandBossLeave().then(() => {
            StageSceneManager.Instance.clearScene();
            Game.PlayerBossSystem.ActivityBoss.inZorkBoss = false;
        }).catch((reason) => { });
    }


    /**************************网络协议*******************/
    /**
     * 进入活动BOSS活动场景
    */
    public darklandBossScoreRank(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.DarklandBossScoreRankRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.DarklandBossScoreRankResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                this.ActivityBoss.myRank = response.body.self_rank.rank;
                this.ActivityBoss.rankItems = response.body.ranks;

                resolve(response);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject(LANG("请求超时"));
            }, this, true);
        });
    }

    /**
     * 积分加成激励
     */
    public DarklandBossInspire(inspireType: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.DarklandBossInspireRequest();
            request.body.inspireType = inspireType;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.DarklandBossInspireResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject(LANG("请求超时"));
            }, this, false, false);
        });
    }

    /**
     * 退出场景
     */

    public DarklandBossLeave(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.DarklandBossLeaveRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.DarklandBossLeaveResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject(LANG("请求超时"));
            }, this, false, false);
        });
    }


    public DarklandBossEnter(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.DarklandBossEnterRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.DarklandBossEnterResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                PlayerWonderLandSystem.MapHeight = 960;
                response.body.roleInfo.posInfo.posItem.scene_y = PlayerWonderLandSystem.MapHeight - response.body.roleInfo.posInfo.posItem.scene_y;
                this.ActivityBoss.roleInfo = response.body.roleInfo;
                this.ActivityBoss.cityId = response.body.cityId;
                this.ActivityBoss.groupName = response.body.group_name;
                this.ActivityBoss.inZorkBoss = true;
                Game.PlayerWonderLandSystem.loadRpgScenePos(response.body.posInfos);
                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject(LANG("请求超时"));
            }, this, false, false);
        });
    }
}
}