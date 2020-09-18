namespace zj {
    //好友列表点击后的小界面
    //wangshenzhuo
    //2019/03/15
    export class Friend_MyFriendPop extends UI {

        public imageBG: eui.Image;
        public buttonCheck: eui.Button;
        public buttonPrivate: eui.Button;
        public buttonJoin: eui.Button;
        public buttonMail: eui.Button;
        public buttonDelete: eui.Button;
        public buttonOnePk: eui.Button;
        public buttonThreePk: eui.Button;
        public groupMain: eui.Group;

        public name1: any;
        public index1: number;

        public battlelevel = 8; //开启单队切磋
        public battlelevels = 40; //开启三队切磋
        public info: any;
        public father: Friend_MainFriendSence;

        public constructor() {
            super();
            this.skinName = "resource/skins/friend/Friend_MyFriendPopSkin.exml";
            this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCheck, this);
            this.buttonJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonJoin, this);
            this.buttonPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this);
            this.buttonMail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMail, this);
            this.buttonDelete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonDelete, this);
            this.buttonOnePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOnePk, this);
            this.buttonThreePk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnThreePk, this);

        }

        public SetInfo(info, father: Friend_MainFriendSence, index: number, x: number, y: number) {
            this.groupMain.scaleX = 0.1;
            this.groupMain.scaleY = 0.1;
            egret.Tween.get(this.groupMain).to({ scaleX: 1.2 }, 250).to({ scaleX: 1.1 }, 80).to({ scaleX: 1.2 }, 80);
            egret.Tween.get(this.groupMain).to({ scaleY: 1.2 }, 250).to({ scaleY: 1.1 }, 80).to({ scaleY: 1.2 }, 80);
            this.x = x;
            this.y = y - 175;
            this.father = father;
            this.info = info;
            this.index1 = index;
            if (Game.Controller.lastLoginGroupID() != this.info.roleInfo.server_id && this.info.roleInfo.group_name != "") {
                // this.buttonJoin.visible = false;
                if (this.info.roleInfo.group_name != "") {
                    let sn = JSON.stringify(this.info.roleInfo.group_name);
                    this.name1 = sn.split("&")[1];
                } else {
                    this.name1 = this.info.roleInfo.group_name;
                }
            }
            //设置单队切磋是否显示
            if (this.info.roleInfo.level < this.battlelevel) {
                this.buttonOnePk.visible = false;
            } else {
                this.buttonOnePk.visible = true;
            }

            //设置三队切磋是否显示
            if (this.info.roleInfo.level < this.battlelevels) {
                this.buttonThreePk.visible = false;
            } else {
                this.buttonThreePk.visible = true;
            }
        }
        //查看详情
        private onButtonCheck() {
            Game.PlayerInfoSystem.queryRoleInfo(this.info.roleInfo.id, this.info.roleInfo.group_id).then((resp: message.RoleInfoZip) => {
                let name: string = "";
                if (resp.baseInfo.group_name != "") {
                    name = resp.baseInfo.group_name;
                    name = name.slice(name.indexOf(":") + 2, name.indexOf("&")) + "区" + name.slice(name.indexOf("&") + 1, name.indexOf("}") - 1);
                } else {
                    name = TextsConfig.TextsConfig_Chat.serverSelf;
                }

                if (resp.generals.length == 0) {
                    toast_warning(LANG(TextsConfig.TextsConfig_Common.noHunter));
                } else {
                    // "Common_Player"
                    loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
                        dialog.setInfo(resp, name);
                        dialog.show(UI.SHOW_FROM_TOP);
                        Game.EventManager.event(GameEvent.FRIEND_TOPPOP_REMOVE);
                    });
                }
            });
            this.removeChildren();
        }

        public UplistTable(ev) {

        }

        //加入公会
        private onButtonJoin() {
            if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, true)) {
                let role = this.info.roleInfo.id;
                TipManager.LeagueApply(this.info.roleInfo.leagueId);
            }
            this.removeChildren();
        }

        //删除好友
        private onButtonDelete() {
            let confirmDes = TextsConfig.TextsConfig_Friend.confirmDelete[this.father.relationMap[this.index1].type];
            TipManager.ShowConfirmCancel(Helper.StringFormat(confirmDes, this.father.relationMap[this.index1].roleInfo.name), () => { this.RelationDelete_Req() });
            this.removeChildren();
        }

        public RelationDelete_Req() {
            this.RelationDelele_Visit()
                .then((data: any) => {
                    let relate = this.father.relationMap[this.index1];
                    PlayerRelateSystem.Delete(relate);
                    setTimeout(() => {
                        this.father.SetInfo();
                    }, 500);
                })
                .catch(reason => { toast_warning(reason) });
        }

        public RelationDelele_Visit() {
            return new Promise((resolve, reject) => {
                let request = new message.RelationDeleteRequest();
                request.body.type = this.father.relationType;
                request.body.roleId = this.info.roleInfo.id;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.RelationDeleteResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
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

        private onBtnMail() {
            // toast("发送信件");
            let info = new message.MailInfo();
            info.type = message.MailType.MAIL_TYPE_NORMAL;
            info.from_id = this.father.relationMap[this.index1].roleInfo.id;
            let roles = [];
            roles.push(this.info.roleInfo);
            info.roleBaseInfo = roles;
            loadUI(Common_Letter)
                .then((dailog: Common_Letter) => {
                    dailog.show();
                    dailog.setInfo(info);
                });
            this.removeChildren();
        }

        private onBtnPrivate() {
            // toast("设为私聊");
            let role = this.father.relationMap[this.index1].roleInfo;
            loadUI(Chat_Main)
                .then((dialog: Chat_Main) => {
                    Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: role.id, name: role.name, group_id: this.info.roleInfo.group_id });
                    dialog.show();
                });
        }

        private onBtnOnePk() {
            // toast("单队切磋");
            let Formation = message.EFormationType.FORMATION_TYPE_PVP_SIMPLE;
            let playerInfo = ["Lv." + this.info.roleInfo.level + " " + this.info.role_name, "groupStr", ":", this.info.pic, this.index1]
            if (PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_SIMPLE, true)) {
                TipManager.PVPLadderBattle_Req(this.info.roleInfo.id, null, Formation, null, this.info.roleInfo, playerInfo, this);
            }
            this.removeChildren();
        }

        private onBtnThreePk() {
            // toast("三队切磋");
            let playerInfo = ["Lv." + this.info.roleInfo.level + " " + this.info.roleInfo, "groupStr", ":", this.info.roleInfo.picId, this.index1]
            let Formation = message.EFormationType.FORMATION_TYPE_PVP_THIRD;
            if (PlayerHunterSystem.LevelDBFunOpenTo(message.EFormationType.FORMATION_TYPE_PVP_THIRD)) {
                TipManager.PVPLadderBattle_Req(this.info.roleInfo.id, null, Formation, null, this.info.roleInfo, playerInfo, this, this.index1);
            }
            this.removeChildren();
        }
    }
}