namespace zj {
//  念兽  PetDontGet
//  wangshenzhuo
//  2019/1/11
export class PetDontGet extends UI {
    private BASE_ID: number = 10000;
    private index: number;
    private father: PetMainScene;

    private labelCurrentAtt1: eui.Label;
    private labelNextAtt1: eui.Label;

    public labelPetSkillName: eui.Label;
    public labelPetSkillCurrentAward: eui.Label;
    public imgSpriteDontSumon: eui.Image;
    public imgSpriteFrame: eui.Image;
    public imgSpriteIcon: eui.Image;
    public imgSpriteMask: eui.Image;
    public btnAddPetSoul: eui.Button;
    public labelNeedFragment: eui.Label;
    public btnAddFragment: eui.Button;
    public imgSpriteTipAdd: eui.Image;
    private groupAnimate: eui.Group;

    private imgMask: eui.Image;
    private btnType: number;


    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetDontGetSkin.exml";

        this.btnAddFragment.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddFragment, this);
        this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddPetSoul, this);
        Game.EventManager.on(GameEvent.SERVER_NOTICE_ROLE_INFO, this.updateInfo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);

        this.imgMask = new eui.Image;
        this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
        this.imgMask.horizontalCenter = 0;
        this.imgMask.verticalCenter = 0;
        this.imgMask.scaleX = 0.7;
        this.imgMask.scaleY = 0.7;
        this.groupAnimate.addChild(this.imgMask);
        this.imgMask.visible = true;
    }

    public SetInfo(index, father: PetMainScene , btnType) {
        this.btnType = btnType;
        this.index = index;
        this.father = father;
        this.SetAttriInfo();
        this.SetSkillInfo();
        this.SetConsumeInfo();
    }

    public updateInfo() {
        if(this.btnType == 1) {
            this.SetConsumeInfo();
        }
    } 

    //基础技
    private SetAttriInfo() {
        let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;
        let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
        let level_next = level + 1;
        // let skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
        let base_skill = PlayerAdviserSystem.Instance(this.index).base_skill;
        let str_talent = PlayerTalentSystem.Des(base_skill[0], level);

        //基础技
        this.labelCurrentAtt1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.base_attri, str_talent));
        this.labelNextAtt1.textFlow = Util.RichText(TextsConfig.TextsConfig_Adviser.des1);
    }

    //念力技
    private SetSkillInfo() {
        if (this.index < 10 || this.index == 13) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            let skill_id = PlayerAdviserSystem.Instance(this.index).skill_id;
            let skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
            let str_talent = PlayerTalentSystem.Des(skill_id[0], skill_level);

            this.labelPetSkillName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
            this.labelPetSkillCurrentAward.textFlow = Util.RichText(TextsConfig.TextsConfig_Adviser.des2);
        } else if (this.index == 10) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            this.labelPetSkillName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[1],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerLimit,
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerRatio));
        } else if (this.index == 11) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            this.labelPetSkillName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[5],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).wanted_money_addradio * 100 + "%",
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[1],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[3]));
        } else if (this.index == 12) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            this.labelPetSkillName.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[6],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).challenge_gain_token[1] + "%",
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[1],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).resource_cdCount[3]));
        }
    }

    //召唤所需
    private SetConsumeInfo() {
        let PetName = PlayerAdviserSystem.Instance(this.index).adviser_name;
        let itemId = PlayerAdviserSystem.Instance(this.index).compose_goods;

        let Cur: any = PlayerItemSystem.Count(itemId);
        let Des = PlayerAdviserSystem.Instance(this.index).compose_count;
        let dat_tbl = PlayerAdviserSystem.Instance(this.index);

        if (Cur >= Des && PlayerAdviserSystem.Have(this.index) == false) {
            this.imgSpriteTipAdd.visible = true;
            this.labelNeedFragment.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragment, Cur, Des));
            this.btnAddPetSoul.visible = false;
        } else {
            this.imgSpriteTipAdd.visible = false;
            this.labelNeedFragment.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragments, Cur, Des));
            this.btnAddPetSoul.visible = true;
        }
        this.imgSpriteFrame.source = cachekey(UIConfig.UIConfig_Role.pieceFrame[PlayerAdviserSystem.Instance(this.index).quality + 1], this);
        this.imgSpriteIcon.source = cachekey(PlayerAdviserSystem.Instance(this.index).head_path, this);
        this.imgSpriteIcon.mask = this.imgMask;

        //this.imgSpriteIcon.texture = UIConfig.UIConfig_Role.pieceFrame[];

        // let clip = (UIConfig.UIConfig_Adviser.petIcons[this.index] ,UIConfig.UIConfig_Role.mask.soul);
        // this.node
    }

    //跳转 “获取途径 ” 界面
    private onBtnAddPetSoul() {
        let itemId = PlayerAdviserSystem.Instance(this.index).compose_goods;
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(itemId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //召唤
    private onBtnAddFragment() {
        let itemId = PlayerAdviserSystem.Instance(this.index).compose_goods;
        let Cur = PlayerItemSystem.Count(itemId);
        let Des = PlayerAdviserSystem.Instance(this.index).compose_count;
        if (Cur >= Des && PlayerAdviserSystem.Have(this.index) == false) {
            this.AdviserCompose_Visit();
        } else {
            toast(TextsConfig.TextsConfig_Adviser.goods);
        }
    }

    private AdviserCompose_Visit() {
        let data_net = Game.PlayerAdviserSystem.advisersMap[this.index];
        PlayerAdviserSystem.ReqSummon(data_net.adviserId).then((data: any) => {
            loadUI(PetPop)
                .then((dialog: PetPop) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.SetInfo(this.index);
                });
            let adviserInfo = PlayerAdviserSystem.GetTable();
            let adviserkey: number;
            for (const k in adviserInfo) {
                const v = adviserInfo[k];
                let adviserId = v.adviserId != undefined ? v.adviserId : v.adviser_id;
                if (adviserId == this.index) {
                    adviserkey = Number(k);
                }
            }

            let location = Helper.getObjLen(adviserInfo) * 110 - 470;
            if (adviserkey * 110 > location) {
                this.father.moveLocation = location
            } else {
                this.father.moveLocation = adviserkey * 110;
            }
            if (this.father.petMainKeelAnimation.parent) {
                this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
            }
            this.father.inIt(this.father.btnType);

        })
    }


}

}