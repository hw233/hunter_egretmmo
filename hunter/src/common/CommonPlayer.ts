namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-2-22
 * 
 * @class 查看猎人详情
 */
export class CommonPlayer extends Dialog {

    private btnClose: eui.Button;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelNameLevel: eui.Label;
    private labelTitle: eui.Label;
    private labelServer: eui.Label;
    private labelAlly: eui.Label;
    private listHero: eui.List;
    private labelPlayerPower: eui.Label;
    private imgAptitude: eui.Image;
    private labelName: eui.Label;
    private groupHero: eui.Group;
    private imgJob: eui.Image;
    private groupStar: eui.Group;
    private btnInfo: eui.Button;
    private listCard: eui.List;
    private imgAlly: eui.Image;
    private listHeroData: eui.ArrayCollection = new eui.ArrayCollection();
    private listCardData: eui.ArrayCollection = new eui.ArrayCollection();
    private currentSelectedHunterIndex: number = null;
    private canViewDetail: boolean = true;
        public data: message.RoleBriefInfo;
    constructor() {
        super();

        this.skinName = "resource/skins/common/CommonPlayerSkin.exml";

        this.btnInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnInfo, this);
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        this.listHero.itemRenderer = CommonPlayerHunterItem;
        this.listHero.dataProvider = this.listHeroData;
        this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHeroTap, this);

        this.listCard.itemRenderer = CommonPlayerCardItem;
        this.listCard.dataProvider = this.listCardData;
        this.listCard.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListCardTap, this);
    }

    public setInfo(msg: message.RoleInfoZip, name?: any, cb?: Function) {
        let data = msg.baseInfo;
            this.data = data;
        this.canViewDetail = msg.baseInfo.agree_detail;

        this.setPlayerInfo(data, name);
        this.setHeroList(msg.generals);
    }

    private setPlayerInfo(data: message.RoleBriefInfo, name?: string) {
        let framePath = PlayerItemSystem.ItemPath(data.picFrameId);
        let iconPath = PlayerItemSystem.ItemPath(data.picId);
        this.imgFrame.source = cachekey(framePath, this);
        this.imgIcon.source = cachekey(iconPath, this);

        this.labelNameLevel.text = data.name + " Lv" + data.level.toString();

        let title = PlayerItemSystem.Title(data.titleId ? data.titleId : 140001);
        let titleString = Helper.StringFormat(TextsConfig.TextConfig_Relation.title, title);
        this.labelTitle.text = titleString;

        let server = "";
        if (name == null) {
            server = TextsConfig.TextsConfig_Chat.serverSelf;
        } else if (typeof name === "object") {
            server = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, name[0], name[1]);
        } else {
            server = name;
        }
        let serverString = Helper.StringFormat(TextsConfig.TextsConfig_Pk.attack_info.server, server);
        this.labelServer.text = serverString;

        let ally = data.leagueName.length > 0 ? data.leagueName : TextsConfig.TextsConfig_Rank.ally_no;
        this.labelAlly.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.leagueDes, ally);

        let allySprite = PlayerLeagueSystem.GetSegment(data.matchScore)[4];
        if (allySprite == "ui_union_battle_star11_png") {
            allySprite = "";
        }
        this.imgAlly.source = cachekey(allySprite, this);
    }

    private setHeroList(generals: Array<message.GeneralInfo>) {
        generals.sort(PlayerHunterSystem.SortGeneral);

        this.listHeroData.removeAll();
        for (let i = 0; i < generals.length; i++) {
            let data = new CommonPlayerHunterItemData();
            let v = generals[i];
            data.info = v;
            data.isSelected = (i == 0);
            this.listHeroData.addItem(data);
        }
        this.currentSelectedHunterIndex = 0;

        let info = generals[this.currentSelectedHunterIndex];
        this.setHunterInfo(info);
        this.setHunterCardInfo(info);
    }

    private onListHeroTap(e: eui.ItemTapEvent) {
        if (this.currentSelectedHunterIndex < 0 || this.currentSelectedHunterIndex == e.itemIndex) return;

        let lastData = this.listHeroData.getItemAt(this.currentSelectedHunterIndex) as CommonPlayerHunterItemData;
        if (lastData) {
            lastData.isSelected = false;
            this.listHeroData.replaceItemAt(lastData, this.currentSelectedHunterIndex);
        }

        let data = this.listHeroData.getItemAt(e.itemIndex) as CommonPlayerHunterItemData;
        data.isSelected = true;
        this.listHeroData.replaceItemAt(data, e.itemIndex);
        this.currentSelectedHunterIndex = e.itemIndex;

        this.setHunterInfo(data.info);
        this.setHunterCardInfo(data.info);
    }

    private setHunterInfo(info: message.GeneralInfo) {
        this.labelPlayerPower.text = info.battleValue.toString();

        let baseHunterInfo = PlayerHunterSystem.Table(info.general_id);
        let aptitudePath = UIConfig.UIConfig_General.hunter_grade[baseHunterInfo.aptitude];
        let jobsPath = UIConfig.UIConfig_General.hunter_type1[baseHunterInfo.type];

        this.imgAptitude.source = cachekey(aptitudePath, this);
        this.imgJob.source = cachekey(jobsPath, this);
        Helper.SetHeroAwakenStar(this.groupStar, info.star, info.awakePassive.level);

        let strStep = TableGeneralStep.Item(info.step).name;
        let name = (info.level > 0) ? Helper.StringFormat("%s %s Lv%d", baseHunterInfo.general_name, strStep, info.level) : Helper.StringFormat("%s", baseHunterInfo.general_name);
        this.labelName.text = name;
        let color = Helper.GetStepColor(info.step);
        this.labelName.textColor = color;

        let [spineId, scale,] = PlayerHunterSystem.SpineID(info);
        let spine = TableClientFightAniSpineSource.Item(spineId);
        let obj = this.groupHero.getChildByName("common-player-hunter");
        if (obj) this.groupHero.removeChild(obj);
        Game.DragonBonesManager.playAnimation(this, spine.json, null, spine.ani_name, 0).then((display) => {
            if (scale != null) {
                display.scaleX = scale;
                display.scaleY = scale;
            }
            display.x = this.groupHero.width * 0.5;
            display.y = this.groupHero.height * 1;
            display.name = "common-player-hunter";
            this.groupHero.addChild(display);
        });
        for (let [kk, vv] of HelpUtil.GetKV([])) {

        }
    }

    private setHunterCardInfo(info: message.GeneralInfo) {
        let cardMap = info.potatoInfo;
        let baseHunterInfo = PlayerHunterSystem.Table(info.general_id);

        this.listCardData.removeAll();

        for (let i = 0; i < CommonConfig.general_max_card; i++) {
            let data = new CommonPlayerCardItemData();
            let v = cardMap[i];
            if (v) data.info = v;
            data.type = baseHunterInfo.card_type[i];
            data.level = baseHunterInfo.card_level[i];
                data.father = this;
            this.listCardData.addItem(data);
        }
    }

    private onListCardTap(e: eui.ItemTapEvent) {
        let data = this.listCardData.getItemAt(e.itemIndex) as CommonPlayerCardItemData;
        if (data.info == null) return;

        if (!this.canViewDetail) {
            TipManager.ShowCard(data.info);
        } else {
            toast_warning(TextsConfig.TextsConfig_Common.detaillimit);
        }
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnInfo() {
        if (!this.canViewDetail) {
            let data = this.listHeroData.getItemAt(this.currentSelectedHunterIndex) as CommonPlayerHunterItemData;
            TipManager.ShowGeneralDetails(data.info);
        } else {
            toast_warning(TextsConfig.TextsConfig_Common.detaillimit);
        }
    }
}
}