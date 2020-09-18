namespace zj {
/**
 * 私聊
 */
export class Chat_ItemDialogue extends UI {
    public ButtonCheck: eui.Button;
    public ButtonShow: eui.Button;
    public VariateLayer: eui.Image;
    public LayerCommon: eui.Group;
    public TextName: eui.Label;// 私聊玩家名称
    public TextCommon: eui.Label;// 说的话
    public LayerVip: eui.Group;

    public index;
    public curMsgInfo;

    SpriteSelect;
    SpriteFrame;
    SpriteHead;
    SpriteBG;
    SpriteLink;
    LayerReport;
    TextReport;
    NodePop;
    SpriteVipBoard;
    SpriteVip;

    public constructor() {
        super();
        this.skinName = "resource/skins/chat/Chat_ItemDialogueSkin.exml";
        this.Init();
        this.monitorEvent();
    }

    public Init() {

    }

    public monitorEvent() {
        this.ButtonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCheck, this);
        this.ButtonShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShow, this);
    }

    /**
     * 悄悄话
     */
    public onButtonCheck() {
        if ((this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.curMsgInfo.senderId == 0) ||
            (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
            return;
        }
        if (this.curMsgInfo.senderId == Game.PlayerInfoSystem.BaseInfo.id) {
            return;
        }

        // 加载Chat_UserPop
        // local pop = PushUI("Chat_UserPop")
        // pop: SetMsgInfo(self.curMsgInfo, self.index)
        // local trans = self.NodePop:convertToWorldSpace(cc.p(0, 0))
        // local sizeBG = pop.SpriteBG:getContentSize()
        // local dstX, dstY = trans.x, trans.y
        // --高度调整
        // if dstY - sizeBG.height / 2 < 0 then
        // dstY = sizeBG.height / 2
        // end
        // pop.AdaptBoard:setPosition(cc.p(dstX, dstY))

        // pop.AdaptBoard:setVisible(false)
        // pop.AdaptBoard:runAction(createAction.PopAction())
    }

    /**
     * 发送内容
     */
    public onButtonShow() {
        // 战报
        if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_WONDERLAND || Gmgr.Instance.layerId == TableEnumLayerId.LAYER_LEAGUE_FIGHT) {
            return;
        }

        if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT ||
            this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT_BIG) {
            // 加载Common_BattleReport
            // local ui = PushUI("Common_BattleReport")
            // Gmgr:setReplaySkipType(TableEnumReportSkipType.REPORT_SKIP_CHAT)
            Gmgr.Instance.etReplaySkipType(TableEnum.TableEnumReportSkipType.REPORT_SKIP_CHAT)
        }
    }

    public LoadData(index, msgInfo) {
        // 聊天总数据结构的下标
        this.index = index;
        // 当前聊天信息
        //let this.curMsgInfo = msgInfo;
        if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM ||
            (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
            this.LayerVip.visible = false;
        } else {
            if (this.curMsgInfo.roleBaseInfo.length != 0 && this.curMsgInfo.roleBaseInfo[1].vipLevel != 0) {
                this.LayerVip.visible = true;
            } else {
                this.LayerVip.visible = false;
            }
        }

        // 展示类型
        if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_NONE) {
            this.ButtonShow.enabled = false;
        } else {
            this.ButtonShow.enabled = true;
        }
        if (this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT ||
            this.curMsgInfo.showType == message.ChatShowType.CHAT_SHOW_TYPE_WARREPORT_BIG) {
            this.LayerCommon.visible = false;
        } else {
            this.LayerCommon.visible = true;
        }
        // 聊天内容
        let name = "";
        if (this.curMsgInfo.roleBaseInfo.length != 0) {
            name = this.curMsgInfo.roleBaseInfo[1].name;
        }
        let content = Lang.chatContent(this.curMsgInfo);
        // 都先做一下多语言的处理
        content = Set.DecodeJson(content);
        if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM ||
            (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_LEAGUE && this.curMsgInfo.senderId == 0)) {
            name = TextsConfig.TextsConfig_Chat.say_tag_1;
        } else if (this.curMsgInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_PERSONAL) {
            if (this.curMsgInfo.senderId == Game.PlayerInfoSystem.BaseInfo.id) {
                name = TextsConfig.TextsConfig_Chat.say_you
                content = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.say_tag_2, (this.curMsgInfo.receiverName, content));
            } else {
                content = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Chat.say_tag_2, (TextsConfig.TextsConfig_Chat.say_you, content));
            }
        }
        this.TextName.text = name;
        // 设置头像、外框
        // 系统的角色信息备用，以后查看详情什么的可能会用到
        if (this.curMsgInfo.type != message.ChatChannelType.CHAT_CHANNEL_TYPE_SYSTEM && this.curMsgInfo.roleBaseInfo.length != 0) {
            let tblHead = TableItemPic.Table();
            let tblFrame = TableItemPicFrame.Table();
            // self.SpriteHead:setTexture(tblHead[this.curMsgInfo.roleBaseInfo[1].picId].path)
            // self.SpriteFrame:setTexture(tblFrame[this.curMsgInfo.roleBaseInfo[1].picFrameId].path)
        }
        this.curMsgInfo = this.curMsgInfo;
    }
}
}