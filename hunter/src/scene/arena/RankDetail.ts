namespace zj {
/**
 * @author chen xi
 * 
 * @date 2019-2-21
 * 
 * @class 格斗场 猎人排行 详情
 */
export class RankDetail extends Dialog {

    private btnClose: eui.Button;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelLevel: eui.Label;
    private labelName: eui.Label;
    private labelAlly: eui.Label;
    private labelTitle: eui.Label;
    private labelValue: eui.Label;
    private btnViewDetail: eui.Button;
    private btnAddFriend: eui.Button;
    private btnAddUnion: eui.Button;
    private btnChat: eui.Button;
    private imgAlly: eui.Image;

    private rankData: message.RoleBriefInfo = null;

    constructor() {
        super();
        this.skinName = "resource/skins/arena/RankDetailSkin.exml";

        this.labelValue.visible = false;

        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.btnViewDetail.addEventListener(tap, this.onBtnViewDetail, this);
        this.btnAddFriend.addEventListener(tap, this.onBtnAddFriend, this);
        this.btnAddUnion.addEventListener(tap, this.onBtnAddUnion, this);
        this.btnChat.addEventListener(tap, this.onBtnChat, this);
    }

    public setInfo(data: message.RoleBriefInfo) {
        this.rankData = data;

        let framePath = PlayerItemSystem.ItemPath(data.picFrameId);
        let iconPath = PlayerItemSystem.ItemPath(data.picId);
        this.imgFrame.source = cachekey(framePath, this);
        this.imgIcon.source = cachekey(iconPath, this);

        this.labelLevel.text = "Lv" + data.level.toString();
        this.labelName.text = data.name.toString();
        if (data.leagueId == 0) {
            this.labelAlly.text = Helper.StringFormat(TextsConfig.TextsConfig_Rank.pop_league, TextsConfig.TextsConfig_Common.nothing);
        } else {
            this.labelAlly.text = Helper.StringFormat(TextsConfig.TextsConfig_Rank.pop_league, data.leagueName);
        }

        let titleForUser = (id) => {
            if (id == 0) {
                return TextsConfig.TextsConfig_User.text_no_title;
            } else {
                let item = PlayerItemSystem.Item(id) as any;
                return item ? item.name : "";
            }
        }
        let titleString = Helper.StringFormat(TextsConfig.TextsConfig_Rank.pop_title, titleForUser(data.titleId));
        this.labelTitle.text = titleString;


        let allySprite = PlayerLeagueSystem.GetSegment(data.matchScore)[4];
        if (allySprite == "ui_union_battle_star11_png") {
            allySprite = "";
        }
        this.imgAlly.source = cachekey(allySprite, this);
    }

    private onBtnClose() {
        this.close(UI.HIDE_TRAIL_OFF);
    }

    private onBtnViewDetail() {
        TipManager.ReqRoleInfo(this.rankData.id, this.rankData.group_id);
    }

    private onBtnAddFriend() {
        TipManager.RelationAdd(this.rankData.id, () => {
            this.alpha = 0;
            this.close(UI.HIDE_TRAIL_OFF);
        });
    }

    private onBtnAddUnion() {
        TipManager.LeagueApply(this.rankData.leagueId);
    }

    private onBtnChat() {
        // toast_warning("聊天");
        loadUI(Chat_Main)
            .then((dialog: Chat_Main) => {
                Game.EventManager.event(GameEvent.FRIEND_CHAT, {  id :this.rankData.id, name : this.rankData.name });
                dialog.show();
            });
    }
}
}