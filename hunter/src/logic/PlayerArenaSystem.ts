namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2019-126
     * 
     * @class 猎人格斗场系统
     */

    export class PlayerArenaSystem {

        public init() {
        }

        public uninit() {
        }

        /** 天梯挑战列表(刷新) */
        public ladderList(vis): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderListRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    let data = response.body.ladders;
                    resolve(data);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, vis);
            });
        }

        /** 天梯挑战请求 */
        public ladderBattle(sequence: number, roleId: number, battleInfo: message.BattleResultInfo): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderBattleRequest();
                request.body.sequence = sequence;
                request.body.roleId = roleId;
                request.body.battleInfo = battleInfo;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderBattleResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /** 天梯快速挑战请求 */
        public ladderQuickReward(roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderQuickRewardRequest();
                request.body.roleId = roleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderQuickRewardResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo.getGoods);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /** 天梯挑战次数增加请求 */
        public ladderChallengeAdd(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderChallengeAddRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderChallengeAddResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.header.result);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false, true);
            });
        }

        /** 天梯清除冷却请求 */
        public ladderCollingClear(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderCoolingClearRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderCoolingClearResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.gameInfo);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 排行信息
         * @param type 排行类型
         * @param start 排名起始下标
         * @param num 请求数量(最多rank_list_max个)
         * 
         * @description RankItemsZip
         */
        public rankItemInfo(type: number, start: number, num: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.RankItemInfoRequest();
                request.body.type = type;
                request.body.start = start;
                request.body.num = num;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RankItemInfoResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    // 解压RankItemsZip 信息
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.itemsZip, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let items = new message.RankItemsZip()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return;
                    }

                    resolve(items);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                    }, this, false);
            });
        }

        /**
         * 进跨服判断
         * 
         * @param isRefresh // 是否是更换对手
         */
        public craftQureyList(isRefresh: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftQueryListRequest();
                request.body.is_refresh = isRefresh;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftQueryListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body.index);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 跨服排行
         * 
         * @param type 0-当前排行; 1-昨日排行; 2-天下第一; 3-本服当前排名; 4-本服上轮排名
         */
        public craftRankList(type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftRankListRequest();
                request.body.type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftRankListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    // 解压CraftRoleInfoChunk 信息
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.roles, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let items = new message.CraftRoleInfoChunk()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items.roles);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 本服战斗
         * 
         * @param type 邮件类别
         */
        public getMailList(type: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GetMailListRequest();
                request.body.box_type = type;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GetMailListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    if (response.body.mails.length != 0) {
                        // 解压MailInfoZip 信息
                        let para = {}
                        para["index"] = 4
                        let inflate = new Zlib.Inflate(response.body.mails, para);
                        let plain = inflate.decompress();
                        let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                        let items = new message.MailInfoZip()
                        if (!items.parse_bytes(decoder)) {
                            toast(LANG("游戏数据解析失败"));
                            return;
                        }
                        resolve([response.body.mailBoxs, items.mails]);
                    } else {
                        resolve([response.body.mailBoxs, []]);
                    }

                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 本服战斗战报
         * 
         * @param type 邮件类别
         * @param ids 邮件ID
         */
        public getMailDetail(type: number, ids: string[]): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.GetMailDetailRequest();
                request.body.box_type = type;
                request.body.mailIds = ids;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.GetMailDetailResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 跨服排行世界精英
         */
        public craftElitesRankList(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftElitesRankListRequest();
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftElitesRankListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    // 解压CraftElitesListChunk 信息
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.items, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let items = new message.CraftElitesListChunk()
                    if (!items.parse_bytes(decoder)) {
                        toast(LANG("游戏数据解析失败"));
                        return;
                    }
                    resolve(items.items);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 跨服主界面
         * @param is_refresh 是否是更换对手
         */
        public craftQueryList(is_refresh: boolean): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftQueryListRequest();
                request.body.is_refresh = is_refresh;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftQueryListResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve(response.body);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /**
         * 跨服增加挑战次数
         * @param 
         */
        public craftBuyTime(): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftBuyTimeRequest();

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftBuyTimeResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve(response.body.gameInfo);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false, true);
            });
        }

        public relationAdd(roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.RelationAddRequest();
                request.body.type = message.ERelationType.RELATION_TYPE_FRIEND;
                request.body.roleId = roleId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationAddResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve(response.body);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            });
        }

        /** 加入联盟请求 */
        public leagueApply(leagueId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LeagueApplyRequest();
                request.body.leagueid = leagueId;

                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LeagueApplyResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve(response.body);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            })
        }

        /**
         * 跨服查看战报请求
         * @param info 信息
         */
        public queryBattle(war_id: string): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.QueryBattleRequest();
                request.body.battle_id = war_id;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.QueryBattleResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    let item;
                    // 解压MultiResultInfo 信息
                    if (response.body.battleData.battleType == 16 || response.body.battleData.battleType == 22 || response.body.battleData.battleType == 23) {
                        let decoder = new aone.BinaryDecoder(new Uint8Array(response.body.battleData.battleData))
                        let items = new message.MultiResultInfo()
                        if (!items.parse_bytes(decoder)) {
                            toast(LANG("游戏数据解析失败"));
                            return;
                        }
                        item = response.body.battleData.battleData;
                    } else {
                        let para = {}
                        para["index"] = 4
                        let inflate = new Zlib.Inflate(response.body.battleData.battleData, para);
                        let plain = inflate.decompress();
                        let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                        let items = new message.ReplayBattleInfo()
                        if (!items.parse_bytes(decoder)) {
                            toast(LANG("游戏数据解析失败"));
                            return;
                        }
                        item = items;
                    }
                    // battleType 战斗数据(类型为16\22\23数据格式为MultiResultInfo否则为ReplayBattleInfo)

                    resolve([response.body.battleData, item]);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            })
        }

        /**
        * 跨服查看战报请求
        * @param roleId 
        */
        public craftQueryDetail(roleId: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.CraftQueryDetailRequest();
                request.body.roleId = roleId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.CraftQueryDetailResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    message.QueryRoleInfoResponse
                    resolve(response.body.formations);//对方阵型信息
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            })
        }

        /**
        * 本服阵型设置请求
        * @param formations // 阵型设置(军师信息不需要设置)
        */
        public setFormation(formations: message.FormationInfo): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.SetFormationRequest();
                request.body.formations.push(formations);
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.SetFormationResponse>resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }

                    resolve();
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            })
        }

        /**
        * 天梯点赞请求
        * @param rank 排名
        */
        public ladderPraiseRank(rank: number): Promise<{}> {
            return new Promise((resolve, reject) => {
                let request = new message.LadderPraiseRankRequest();
                request.body.rank = rank;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.LadderPraiseRankResponse>resp;
                    if (response.header.result != 0) {
                        // reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response.body);
                },
                    (req: aone.AoneRequest): void => {
                        reject(LANG("请求超时"));
                        return;
                    }, this, false);
            })
        }

        private _singleTimmer = { last_time: -1, timmer: null }

        public get singleTimmer() {
            return this._singleTimmer;
        }

        public set singleTimmer(v) {

            this._singleTimmer = v;
        }
    }
}