namespace zj {
// HXH_HunterTransformSkillPopItem
// wangshenzhuo
// 2019-07-18
export class HunterTransformSkillPopItem extends eui.ItemRenderer {

    public groupNo: eui.Group;
    public labelNoMet: eui.Label;
    public labelMeterialsTip: eui.Label;
    public groupHave: eui.Group;
    public lebelMeterialsPower: eui.Label;
    public labelMeterialsNum: eui.Label;
    public imageBigon: eui.Image;
    public imageFrame: eui.Image;
    public imageIcon: eui.Image;
    public labelItemNum: eui.BitmapLabel;
    public imageHeroGrade: eui.Image;
    public groupStar: eui.Group;
    public imageShadow: eui.Image;
    public imageLock: eui.Image;



    private transferTab: { [key: string]: TableGeneralTransfer };
    private focus: boolean;
    private defenceType: number;
    private index: number;
    private generalItemInfo;
    private info;
    private generalId: number = 0;
    private staticGeneralId: number = 0;
    private level: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/storyHunter/HunterTransformSkillPopItemSkin.exml";
        cachekeys(<string[]>UIResource["HunterTransformSkillPopItem"], null);
        this.groupHave.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonClick , this);
        this.transferTab = TableGeneralTransfer.Table();
        this.init();
    }

    private init() {
        this.focus = false;
        this.defenceType = 0;
        this.imageBigon.visible = false;
        this.imageShadow.visible = false;
        this.imageLock.visible = false;
    }

    protected dataChanged() {
        this.index = this.data.index;
        this.generalItemInfo = this.data.info;

        if (typeof (this.data.info) == "number") {
            this.info = this.data.info;
        } else {
            this.info = this.data.info;
            this.generalId = this.data.info.general_id;
            this.staticGeneralId = this.data.info.staticGeneralId;
        }
        this.level = this.data.level;

        //判断是否选中
        let have_break = Table.FindF(PlayerHunterSystem.breakSelectedGenerals, function (k, v) {
            return v == this.index;
        })

        this.imageBigon.visible = this.focus || have_break;

        //判断是否有满足的猎人
        let level = this.level;
        this.SetHunterInfo();
        let star = 99;
        let transferTbl = TableGeneralTransfer.Table();
        if (this.index != 1) {
            let cardInfo = Game.PlayerHunterSystem.allHuntersMap()[this.generalId];
            let path_head = PlayerHunterSystem.Head(this.generalId);
            this.imageIcon.source = cachekey(path_head , this);
        }else{
            let newGeneralId = PlayerHunterSystem.replaceGeneralID(this.info);
            level = transferTbl[this.info].general_level;
            star = transferTbl[this.info].general_star;
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Trans.transformCondition , star , level);
            let info_gnr = PlayerHunterSystem.Table(this.info);
            let info_map = TableMapRole.Item(info_gnr.general_roleId);
            let path_head = info_map.head_path;
            this.labelMeterialsTip.text = str;

            this.groupNo.visible = true;
            this.groupHave.visible = false;
            this.imageIcon.source = cachekey(path_head , this);
        }

        if(this.index == 1) {
            this.groupNo.visible = true;
            this.groupHave.visible = false;
        }else{
            this.groupNo.visible = false;
            this.groupHave.visible = true;
        }

        if(this.index == 1) {
            if(typeof(this.data.info) == "number") {
                let newGeneralId = PlayerHunterSystem.replaceGeneralID(this.info);
                let info_gnr = PlayerHunterSystem.Table(this.info);
                this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Trans.transformName , info_gnr.general_name);
            }else{
                let dex = TextsConfig.TextsConfig_Hunter_Trans.transformCondition;
                this.labelNoMet.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Break.hunterMet , PlayerHunterSystem.Table(this.generalId).general_name);
            }
        }
    }

    private SetHunterInfo() {
        let star = 1;
        let newGeneralId = 1;
        let transferTbl;
        if (typeof (this.info) == "number") {
            transferTbl = TableGeneralTransfer.Table();
            let transferTabInfo = TableGeneralTransfer.Item(this.info);
            star = transferTabInfo.general_star;
            newGeneralId = this.info;
        } else {
            star = this.generalItemInfo.star;
            newGeneralId = this.info.general_id;
        }

        let path_aptitude = UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(newGeneralId).aptitude];
        this.imageHeroGrade.visible = true;
        this.imageHeroGrade.source = cachekey(path_aptitude, this);

        if (this.index != 1) {
            let path_fram = PlayerHunterSystem.Frame(this.generalItemInfo.general_id);
            this.imageFrame.source = cachekey(path_fram, this);
        }

        if (this.index == 1) {
            this.groupNo.visible = true;
            this.groupHave.visible = false;
            this.labelItemNum.visible = false;
        } else {
            let general = Game.PlayerHunterSystem.queryHunter(this.generalItemInfo.general_id);
            let battleValue = general.battleValue;
            let cardNum = general.potatoInfo.length;
            this.lebelMeterialsPower.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.battleValue, Set.NumberUnit3(battleValue));
            this.labelMeterialsNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Compound.cardNum, cardNum);

            this.groupNo.visible = false;
            this.groupHave.visible = true;
            Helper.SetHeroAwakenStar(this.groupStar, this.info.star, this.info.awakePassive.level);
            this.labelItemNum.text = this.info.level;
            this.imageLock.visible = general.is_ware;
            this.imageShadow.visible = general.is_ware;

        }
    }

    private onButtonClick() {
        if(PlayerHunterSystem.transformSel != 1) {
            if(PlayerHunterSystem.transformSel == this.generalItemInfo.general_id) {
                PlayerHunterSystem.transformSel = 1;
                this.imageBigon.visible = false;
            }else{
                return toast_success(TextsConfig.TextsConfig_Hunter_Trans.transformEnough);
            }
        }else{
            this.imageBigon.visible = true;
            PlayerHunterSystem.transformSel = this.generalItemInfo.general_id;
        }
    }

}


//子项数据源
export class HunterTransformSkillPopItemData {
    //数据源
    index: number;
    info: any;
    level: number;
    father;


}


}