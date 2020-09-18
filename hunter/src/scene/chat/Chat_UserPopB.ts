namespace zj {
// 
// lizhengqiang
// 20190312
export class Chat_UserPopB extends UI {
    public groupAdaptBoard: eui.Group;
    private imgBG: eui.Image;
    private imgBoard: eui.Image;
    private imgIcon: eui.Image;
    private lbPlayerName: eui.Label;
    private lbLeagueName: eui.Label;
    private lbTitleName: eui.Label;
    private lbServerName: eui.Label;
    private btnPrivate: eui.Button;
    private btnAdd: eui.Button;
    private btnCheck: eui.Button;
    private btnJoin: eui.Button;

    private info: message.RoleBriefInfo;
    private infos: message.PostInfo;
    private index: number;
    private isCommon: boolean;
    private groupName: string;
    private msg: message.RoleInfoZip;
    private splitList: [string, string];
    private name1: string;

    public constructor() {
        super();

        this.skinName = "resource/skins/chat/Chat_UserPopBSkin.exml";
        this.btnPrivate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPrivate, this);
        this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
        this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCheck, this);
        this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJoin, this);
    }

    public setMsgInfo(info, infos = null, index: number = null) {
        this.info = (<message.RoleInfoZip>info).baseInfo;
        this.infos = infos;
        this.index = index;
        this.msg = info;

        if (infos == null) {
            this.isCommon = true;
            this.btnJoin.visible = false;
        } else {
            this.isCommon = false;
            this.groupName = (<message.PostInfo>infos).role_info.group_name;
        }

        this.imgBoard.source = cachekey(PlayerItemSystem.ItemPath(this.info.picFrameId), this);
        if (!this.isCommon && Game.Controller.lastLoginGroupID() != this.infos.role_info.server_id && this.groupName != "") {
            this.btnJoin.visible = false;
            if (this.groupName != "") {
                let split = function (str: string): [string, string] {
                    if (str.indexOf("{") == -1) return ["", ""];
                    let json = JSON.parse(str);
                    let arr = json["zhcn"].split("&");
                    if (arr.length >= 2) return arr;
                    return ["", ""];
                }
                this.splitList = split(this.groupName);
                this.lbServerName.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, this.splitList[0], this.splitList[1]);
                this.name1 = this.splitList[1];

            } else {
                this.lbServerName.text = this.groupName;
                this.name1 = this.info.group_name;
            }
        } else if (this.isCommon || Game.Controller.lastLoginGroupID() == this.infos.role_info.server_id || this.groupName == "") {
            this.lbServerName.text = TextsConfig.TextsConfig_Chat.serverSelf;
            this.name1 = TextsConfig.TextsConfig_Chat.serverSelf;
        }

        let titleName = TableItemTitle.Item(this.info.titleId).name;
        this.imgIcon.source = cachekey(PlayerItemSystem.ItemPath(this.info.picId), this);
        this.lbPlayerName.text = this.info.name;
        if (this.info.leagueName != "") {
            this.lbLeagueName.text = this.info.leagueName;
        } else {
            this.lbLeagueName.text = TextsConfig.TextsConfig_Rank.ally_no;
        }
        this.lbTitleName.text = titleName;

        if (this.info.leagueName != "" && this.info.matchScore != 0) {
            let imgLeagueStar: eui.Image = new eui.Image(PlayerLeagueSystem.GetSegment(this.info.matchScore)[4]);
            imgLeagueStar.x = this.lbLeagueName.x + this.lbLeagueName.width + 5;
            imgLeagueStar.y = this.lbLeagueName.y - 5;
            this.groupAdaptBoard.addChild(imgLeagueStar);
        }
    }

    private onBtnPrivate() {
        // toast("设为私聊");
        if (this.info.id != null) {
            if (this.isCommon) {
                loadUI(Chat_Main)
                    .then((dialog: Chat_Main) => {
                        Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: this.info.id, name: this.info.name, group_id: Device.gameserver.ID });
                        dialog.show();
                        this.close();
                    });
            } else {
                loadUI(Chat_Main)
                    .then((dialog: Chat_Main) => {
                        Game.EventManager.event(GameEvent.FRIEND_CHAT, { id: this.info.id, name: this.info.name, group_id: this.infos.role_info.group_id });
                        dialog.show();
                        this.close();
                    });
            }
        }
    }

    // 加为好友
    private onBtnAdd() {
        TipManager.RelationAdd(this.info.id, () => { this.close() });
    }

    // 查看详情
    private onBtnCheck() {
        if (this.msg.generals == null || this.msg.generals.length == 0) {
            toast_warning(LANG(TextsConfig.TextsConfig_Common.noHunter));
        } else {
            if (!this.isCommon && Game.Controller.lastLoginGroupID() != this.infos.role_info.server_id && this.groupName != "") {
                loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
                    dialog.setInfo(this.msg, this.splitList);
                    dialog.show(UI.SHOW_FROM_TOP);
                    this.close()
                });
            } else {
                loadUI(CommonPlayer).then((dialog: CommonPlayer) => {
                    dialog.setInfo(this.msg, this.name1);
                    dialog.show(UI.SHOW_FROM_TOP);
                    this.close()
                });
            }
        }
    }

    // 加入公会
    private onBtnJoin() {
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, true)) {
            TipManager.LeagueApply(this.info.leagueId);
        }
    }
}

}