namespace zj {
    // 进程系统
    // hexiaowei 创建于2019.01.02

    export class PlayerProgressesSystem {

        ///////////////////////////////////////////////////////////////////////////
        // 静态函数


        ///////////////////////////////////////////////////////////////////////////
        // 变量
        public progressInfo: Array<message.ProgressInfo> = []; //  进程信息

        public progressMap: { [id: number]: message.ProgressInfo } = {};

        public progressTime1057: number = 0;// 许愿屋倒计时

        ///////////////////////////////////////////////////////////////////////////
        // 成员方法

        // 初始化系统
        public init() {
            // this.getprogressMap();
            Game.EventManager.on(GameEvent.PLAYER_PROGRESS_INFO_CHANGE, this.onMixUnitInfoChange, this);
        }

        public uninit() {
            this.progressInfo = [];
            this.progressMap = [];
        }

        private setProcesses() {
            if (!this.progressInfo) return;

            let time: number = Math.floor(egret.getTimer() / 1000);
            for (let v of this.progressInfo) {
                v.leftTime = v.leftTime + time;
            }
        }

        private onMixUnitInfoChange(ev: egret.Event) {
            this.progressInfo = <Array<message.ProgressInfo>>ev.data;
            this.getprogressMap();
            if (this.progressInfo.length <= 0) return;
            // this.setProcesses();
            for (let k in this.progressInfo) {
                let v = this.progressInfo[k];
                //if (!this.progressMap[v.type]) {
                //    this.progressMap[v.type] = v;
                //} else if (v.type == this.progressMap[v.type].type) {
                this.progressMap[v.type] = v;
                if(v.type == message.EProcessType.PROCESS_TYPE_XUYUAN){
                    this.progressTime1057 = new Date().getTime() + v.leftTime * 1000;
                }
                //}
            }
        }

        private getprogressMap() {
            for (const k in this.newEProcessType) {
                const v = this.newEProcessType[k];
                if (v != message.EProcessType.PROCESS_TYPE_NONO) {
                    let prog = new message.ProgressInfo;
                    prog.type = Number(k);
                    if (!this.progressMap[k]) {
                        this.progressMap[k] = prog;
                    }
                }
            }
        }

        private newEProcessType = {
            [0]: message.EProcessType.PROCESS_TYPE_NONO,
            [1]: message.EProcessType.PROCESS_TYPE_NEXTDAY, // 到第二天时间
            [101]: message.EProcessType.PROCESS_TYPE_ACTIVITIES, // 运营活动
            [1001]: message.EProcessType.PROCESS_TYPE_LADDER,  // 竞技场挑战倒计时
            [1002]: message.EProcessType.PROCESS_TYPE_LOTTERY_DOUBLE,  // 酒馆招募活动 
            [1003]: message.EProcessType.PROCESS_TYPE_LEAGUE_MATCH,  // 公会联赛倒计时（Info是第几轮lefttime是当前状态）
            [1004]: message.EProcessType.PROCESS_TYPE_IMPEACH,  // 弹劾倒计时(作废)
            [1005]: message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE,  // 加入联盟倒计时
            [1006]: message.EProcessType.PROCESS_TYPE_CHAT_FORBID,  // 禁言倒计时
            [1007]: message.EProcessType.PROCESS_TYPE_REWARD_POWER,  // 领时间段果子倒计时
            [1008]: message.EProcessType.PROCESS_TYPE_OPEN_POWER,  // 领时间段果子开启倒计时
            [1009]: message.EProcessType.PROCESS_TYPE_MALL_LADDER,  // 竞技场商城
            [1010]: message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,  // 联盟商城
            [1011]: message.EProcessType.PROCESS_TYPE_MALL_NORMAL,  // 普通商城
            [1012]: message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,  // 酒馆积分商城
            [1013]: message.EProcessType.PROCESS_TYPE_MISSION_SEVEN,  // 七日任务倒计时
            [1014]: message.EProcessType.PROCESS_TYPE_GAMBLE_NORMAL,  // 宝石普通单切倒计时
            [1015]: message.EProcessType.PROCESS_TYPE_GAMBLE_SENIOR,  // 宝石高级单切倒计时
            [1016]: message.EProcessType.PROCESS_TYPE_SCENE_BOSS,  // 场景boss倒计时
            [1018]: message.EProcessType.PROCESS_TYPE_MALL_HONOR,  // 荣誉上铺倒计时
            [1019]: message.EProcessType.PROCESS_TYPE_SINGLECRAFT,  // 跨服战倒计时
            [1020]: message.EProcessType.PROCESS_TYPE_POST_FORBID,  // 禁评论倒计时
            [1021]: message.EProcessType.PROCESS_TYPE_MALL_RELIC,  // 遗迹商店倒计时
            [1050]: message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS,  // 联盟boss倒计时
            [1051]: message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY,  // 联盟宴会倒计时
            [1052]: message.EProcessType.PROCESS_TYPE_LEAGUE_FISHING,  // 联盟钓鱼倒计时
            [1053]: message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE,  // 联盟战功商店倒计时
            [1054]: message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG,  // 扭蛋机倒计时
            [1055]: message.EProcessType.PROCESS_TYPE_COMMENT_FORBID,  // 禁回复倒计时
            [1056]: message.EProcessType.PROCESS_TYPE_FIRST_REWARD,  // 首冲倒计时
            [1057]: message.EProcessType.PROCESS_TYPE_XUYUAN,  // 许愿屋倒计时
            [1058]: message.EProcessType.PROCESS_TYPE_MISSION_ONE,  // 新嘉年华一
            [1059]: message.EProcessType.PROCESS_TYPE_MISSION_TWO,  // 新嘉年华二
            [1060]: message.EProcessType.PROCESS_TYPE_MISSION_MAQI,  // 新嘉年华马琪
            [1061]: message.EProcessType.PROCESS_TYPE_MISSION_KUBI,  // 新嘉年华库哔
            [1062]: message.EProcessType.PROCESS_TYPE_INSTANCE_POWER,  // 领取副本体力
            [1063]: message.EProcessType.PROCESS_TYPE_MISSION_WEEK   // 周任务显示进程
        }

        //刷新普通商店
        public static ReqRefresh(type: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MallListRefreshRequest();
                request.body.type = type;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MallListRefreshResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        //购买商品
        public static ReqBuy(type: number, mallId, count: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MallBuyRequest();
                request.body.type = type;
                request.body.mallId = mallId;
                request.body.count = count;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MallBuyResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        //获取各个类型商店的数据
        public static ReqGain(type: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MallListRequest();
                request.body.type = type;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MallListResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        // 验证倒计时
        public checkProcess(types: Array<number>): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CheckProcessRequest();
                request.body.types = types;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CheckProcessResponse>resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }

                    for (let i in response.body.processes) {
                        for (let j in this.progressInfo) {
                            if (this.progressInfo[j].type == response.body.processes[i].type) {
                                this.progressInfo[j] = response.body.processes[i];
                                break;
                            }
                        }
                    }
                    resolve();
                }, (req: aone.AoneRequest): void => {
                    console.log("req:", req);
                    reject("timeout");
                }, this, false, false);
            });
        }
    }

}