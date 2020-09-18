namespace zj {
    // 社交好友 系统
    // wangshenzhuo 创建于2019.03.19
    // 对应db_relate.ts

    //关系成员排序
    export enum PlayerRelateSystemSORT {
        NONE = 1, // 无排序
        MAIN = 2, // 好友主界面，是否在线，玩家等级，离线时长
        MINE = 3, // 邀请护矿，玩家等级
    }

    export class PlayerRelateSystem {

        public relatInfo: message.RelationInfo = null;  // 关系信息
        public relateResp: message.RelationInfoZip = null; // 我的关系信息
        private givepowerMap = [];
        public serverName: any;
        public TipFirend: boolean = false;    // 主场景好友红点

        public givepower() {
            for (const k in Game.PlayerRelateSystem.relateResp.givepower) {
                const v = Game.PlayerRelateSystem.relateResp.givepower[k];
                this.givepowerMap[v] = v;
            }
            return this.givepowerMap;
        }

        public init() {
            if (!Device.isReviewSwitch) {
                Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.onRelatInfoChange, this);
            }
        }

        public uninit() {
            this.relatInfo = null;
            this.relateResp = null;
            this.givepowerMap = [];
            this.serverName = "";
        }

        public onRelatInfoChange(ev: egret.Event) {
            this.relationInfo().then((data: message.RelationInfoZip) => {
                this.relateResp = data;
                for (let v of data.relations) {
                    if (Game.PlayerInfoSystem.BaseInfo.id == v.roleInfo.id) {
                        this.relatInfo = v;
                        break;
                    }
                }
            });
        }


        public static Instance(id: number) {
            if (id == 0 || id == -1) return null;
            return TableGeneralSkill.Item(id);
        }

        public static Insert(relate) {
            let data = Table.DeepCopy(relate);
            let bFind = false;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.roleInfo.id == data.roleInfo.id && !bFind) {
                    Game.PlayerRelateSystem.relateResp.relations[k] = data;
                    bFind = true;
                }
            }
            //新的关系信息直接添加
            if (!bFind) {
                Game.PlayerRelateSystem.relateResp.relations.push(data);
            }
        }

        public static Delete(relate) {
            let data = Table.DeepCopy(relate);
            let bFind = false;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.roleInfo.id == data.roleInfo.id && !bFind) {
                    let a = Game.PlayerRelateSystem.relateResp.relations;
                    Game.PlayerRelateSystem.relateResp.relations.splice(Number(k), 1);
                    bFind = true;
                }
            }
        }

        public static Count(relateType) {
            let ret = 0;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == relateType) {
                    ret = ret + 1;
                }
            }
            return ret;
        }

        //排序比较函数
        public static sort_func(sort_type) {
            //排序类型
            if (sort_type == null) {
                sort_type = PlayerRelateSystemSORT.NONE;
            }
            if (sort_type == PlayerRelateSystemSORT.MAIN) {

            }
        }

        public static Map(relateType, sort_type) {
            let ret = [];
            let a = Game.PlayerRelateSystem.relateResp;
            //原始数据
            if (Game.PlayerRelateSystem.relateResp) {
                for (let i = 0; i < Game.PlayerRelateSystem.relateResp.relations.length; i++) {
                    if (Game.PlayerRelateSystem.relateResp.relations[i].type == relateType) {
                        ret.push(Game.PlayerRelateSystem.relateResp.relations[i]);
                    }
                }
                //排序
                ret.sort(function (a, b) {
                    if (a.roleInfo.logoutTime == b.roleInfo.logoutTime) {
                        return b.roleInfo.logoutTime - a.roleInfo.logoutTime;
                    } else {
                        return a.roleInfo.logoutTime - b.roleInfo.logoutTime;
                    }
                });
            }

            return ret;
        }

        public IsFriend(roleId) {
            let ret = false;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_FRIEND && v.roleInfo.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        }

        public IsEnemy(roleId) {
            let ret = false;
            for (const k in Game.PlayerRelateSystem.relateResp.relations) {
                const v = Game.PlayerRelateSystem.relateResp.relations[k];
                if (v.type == message.ERelationType.RELATION_TYPE_ENEMY && v.roleInfo.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        }

        public IsLeague(roleId) {
            let ret = false;
            for (const k in Game.PlayerLeagueSystem.LeagueInfo.info[0].members) {
                const v = Game.PlayerLeagueSystem.LeagueInfo.info[0].members[k];
                if (v.monarchbase.id == roleId) {
                    ret = true;
                    break;
                }
            }
            return ret;
        }

        //获取数据
        public relationInfo() {
            return new Promise((resolve, reject) => {
                let request = new message.RelationInfoRequest();
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationInfoResponse>resp;
                    if (response.header.result != 0) {
                        return;
                    }
                    // 解压其他gameinfo信息
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(response.body.relationInfo, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let RelationInfo = new message.RelationInfoZip()
                    if (!RelationInfo.parse_bytes(decoder)) {
                        toast(LANG("其他游戏数据解析失败"));
                        return;
                    }

                    this.relateResp = RelationInfo;
                    for (let v of RelationInfo.relations) {
                        if (Game.PlayerInfoSystem.BaseInfo.id == v.roleInfo.id) {
                            this.relatInfo = v;
                            break;
                        }
                    }
                    Game.PlayerRelateSystem.givepower()

                    resolve(RelationInfo);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static RelationGivePower_Req(data: any) {
            return new Promise((resolve, reject) => {
                let request = new message.RelationGivePowerRequest();
                request.body.roleIds = data;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationGivePowerResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static RelationRewardPower_Req(data: any) {
            return new Promise((resolve, reject) => {
                let request = new message.RelationRewardPowerRequest();
                request.body.roleIds = data;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationRewardPowerResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static RelationApplyListReq() {
            return new Promise((resolve, reject) => {
                let request = new message.RelationApplyListRequest();
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationApplyListResponse>resp;
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    Game.PlayerRelateSystem.TipFirend = response.body.applys.length > 0;
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static RelationAnswerFriend_Visit(data: any, bAgree) {
            return new Promise((resolve, reject) => {
                let request = new message.RelationAnswerFriendRequest();
                request.body.roleIds = data;
                request.body.is_agree = bAgree;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationAnswerFriendResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        public static RelationSearchList_Visit(serchId, serchName, beginPos, numEach) {
            return new Promise((resolve, reject) => {
                let request = new message.RelationSearchListRequest();
                request.body.roleId = serchId;
                request.body.roleName = serchName;
                request.body.beginPos = beginPos;
                request.body.num = numEach;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationSearchListResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    Game.PlayerRelateSystem.relationInfo();
                    Game.PlayerRelateSystem.givepower();
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

    }
}