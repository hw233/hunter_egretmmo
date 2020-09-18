namespace zj {
//  念兽  PetGet
//  wangshenzhuo
//  2019/1/12
export class PetGet extends UI {
    private BASE_ID = 10000;
    private index: number;
    private father: PetMainScene;
    private types: number; // 1(念兽)；2(宠物)

    public labelCurrentAtt1: eui.Label;
    public labelCurrentAtt2: eui.Label;
    public labelPetStrengthLevel: eui.Label;
    public labelCurrentAtt3: eui.Label;
    public labelCurrentAtt4: eui.Label;
    public labelPetSkillNextAward: eui.Label;
    public imgSpritePetLevelMax: eui.Image;
    public groupPetUpLevel: eui.Group;
    public imgSpriteBoard: eui.Image;
    public imgSpriteIcon: eui.Image;
    public labelNeedFragement: eui.Label;
    public btnAddPetSoul: eui.Button;
    public btnStrength: eui.Button;
    public imgSpriteTipStrength: eui.Image;
    public labelStrength: eui.Label;
    public imgSpritePetStarMax: eui.Image;
    public labelPetSkillName: eui.Label;
    public btnGetAward: eui.Button;
    public imgSpriteGetAward: eui.Image;

    private level_next: number = 0;
    private skill_level: number = 0;
    private skill_level_next: number = 0;
    private rewardCount: number = 0;

    private imgMask: eui.Image;
    private groupAnimate: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetGetSkin.exml";
        this.btnAddPetSoul.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddPetSoul, this);
        this.btnStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStrength, this);
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

    public SetInfo(index, father, type?: number) {
        this.index = index;
        this.father = father;
        this.types = type;

        //念兽升星
        if (type == 1) {
            if (this.index >= 11 && this.index != 13) {
                this.btnGetAward.visible = true;
                this.SetAttriInfo();
                this.SetConsumeInfo();
            } else {
                this.SetAttriInfo();
                this.SetSkillInfo();
                this.SetConsumeInfo();
            }
        }
        //宠物升星
        else {
            this.setPetConsumeInfo();
        }

        this.btnGetAward.visible = false;
        this.imgSpriteGetAward.visible = false;
        this.labelPetSkillName.visible = false;

    }

    private updateInfo() {
        //念兽升星
        if (this.types == 1) {
            this.SetConsumeInfo();
        } else {
            //宠物升星
            this.setPetConsumeInfo();
        }
    }

    // 念兽基础技--nianshou
    private SetAttriInfo() {

        let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;
        let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
        if (PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
            this.level_next = level;
            this.labelCurrentAtt3.visible = false;
        } else {
            this.level_next = level + 1
            this.labelCurrentAtt3.visible = true;
        }

        let base_skill = PlayerAdviserSystem.Instance(this.index).base_skill;
        let str_talent = PlayerTalentSystem.Des(base_skill[0], level);
        let str_talent_next = PlayerTalentSystem.DesNext(base_skill[0], level + 1);

        //当前基础技
        this.labelCurrentAtt1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.base_attri, str_talent));
        //下一技能
        this.labelCurrentAtt3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.base_attri, str_talent_next));

        let max: any = PlayerAdviserSystem.AdviserLvdbMinLevel(this.index);
        let skill: any = PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.index + level, this.index);
        this.labelPetStrengthLevel.visible = false;
        if (level >= max) {
            this.labelPetSkillNextAward.visible = false;
        } else {
            if (skill - level == 1) {
                this.labelPetSkillNextAward.visible = true;
                this.labelPetSkillNextAward.text = TextsConfig.TextsConfig_Adviser.add_star_next;
            } else {
                this.labelPetSkillNextAward.visible = false;
            }
        }

        let money_Des = PlayerAdviserSystem.AdviserlvdbInstance(adviserId * 10000 + level).adviser_money;
        this.labelStrength.text = money_Des.toString();

    }

    //念兽 念力技
    private SetSkillInfo() {
        if (this.index < 10 || this.index == 13) {
            let skill_id = PlayerAdviserSystem.Instance(this.index).skill_id;
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
            let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;

            let max = PlayerAdviserSystem.AdviserLvdbMinLevel(this.index);
            let skill: any = PlayerAdviserSystem.AdviserLvdbGetLevel(this.BASE_ID * this.index + level, this.index);

            if (level == 1) {
                this.skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                this.skill_level_next = 0;
            } else {
                this.skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
                this.skill_level_next = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level - 1).skill_level;
            }

            let base_skill = PlayerAdviserSystem.Instance(this.index).base_skill;
            let str_talent_next = PlayerTalentSystem.DesNext(base_skill[0], level + 1);

            let str_talent = PlayerTalentSystem.Des(skill_id[0], this.skill_level);
            if (PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
                str_talent_next = null;
                this.labelPetSkillNextAward.visible = false;
            } else {
                str_talent_next = PlayerTalentSystem.DesNext(skill_id[0], this.skill_level + 1);
            }

            //下一级念力技
            if (level < 26) {
                if (skill - level != 1) {
                    this.labelCurrentAtt4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
                } else {
                    this.labelCurrentAtt4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent_next));
                }
            } else {
                if (level == 29) {
                    this.labelCurrentAtt4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent_next));
                } else {
                    this.labelCurrentAtt4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
                }
            }
            this.labelCurrentAtt2.visible = true;
            //当前念力技
            this.labelCurrentAtt2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.skill_attri, str_talent));
        } else if (this.index == 10) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
            this.labelPetSkillName.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[1],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerLimit,
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).add_powerRatio);
        } else if (this.index == 11) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
            this.labelPetSkillName.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[2],
                PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).wanted_money_addradio * 100 + "%", this.rewardCount);
            if (this.rewardCount != 0) {
                //红点状态为显示
            }
        } else if (this.index == 12) {
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
            this.labelPetSkillName.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.adviser_attri[3], PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).challenge_gain_token[0] + "%", this.rewardCount);
            if (this.rewardCount != 0) {
                //红点状态为显示
            }
        }
    }

    //念兽升星所需
    private SetConsumeInfo() {
        let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
        let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;

        //碎片
        let itemId = PlayerAdviserSystem.Instance(this.index).compose_goods;
        let Cur: any = PlayerItemSystem.Count(itemId);
        let Des = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).consume_count;
        //铜qian
        let money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
        let money_Des = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).adviser_money;

        let dat_tbl = PlayerAdviserSystem.Instance(this.index);
        let itemSet = PlayerItemSystem.Set(itemId);

        this.imgSpriteBoard.source = cachekey(UIConfig.UIConfig_Role.pieceFrame[PlayerAdviserSystem.Instance(this.index).quality + 1], this);
        this.imgSpriteIcon.source = cachekey(PlayerAdviserSystem.Instance(this.index).head_path, this);
        this.imgSpriteIcon.mask = this.imgMask;

        if (Cur >= Des) {
            this.labelNeedFragement.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragment, Cur, Des));
            this.btnAddPetSoul.visible = false;
        } else {
            this.labelNeedFragement.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragments, Cur, Des));
            this.btnAddPetSoul.visible = true;
        }

        if (Cur >= Des && PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level) == false && money >= money_Des) {
            this.imgSpriteTipStrength.visible = true;
        } else {
            this.imgSpriteTipStrength.visible = false;
        }

        if (PlayerAdviserSystem.AdviserlvdbIsMax(this.index, level) == true) {
            this.groupPetUpLevel.visible = false;
            this.imgSpritePetLevelMax.visible = true;
            this.labelPetSkillNextAward.visible = false;
            this.labelCurrentAtt4.visible = false;
            this.imgSpritePetStarMax.visible = true;
        } else {
            this.groupPetUpLevel.visible = true;
            this.imgSpritePetLevelMax.visible = false;
            this.imgSpritePetStarMax.visible = false;
            this.labelCurrentAtt4.visible = true;
        }

    }

    //获取途径
    private ButtonAddPetSoul() {
        let itemId = PlayerAdviserSystem.Instance(this.index).compose_goods;
    }

    private SetUpLevel() {
        let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;
        let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
        if (level == 1) {
            this.skill_level_next = 0;
        } else {
            this.skill_level = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
            this.skill_level_next = PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level - 1).skill_level;
        }

        if (this.skill_level - 1 == this.skill_level_next) {
            // self.NodeAddAni:addChild(resdb.AniReminder( 5,UIConfig_Hunter.common_hint[5] ))
        }
    }

    // 念兽升星
    private onBtnStrength() {
        if (this.types == 1) {
            let adviserId = PlayerAdviserSystem.Instance(this.index).adviser_id;
            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;
            if (PlayerAdviserSystem.AdviserlvdbIsMax(adviserId, level)) {
                toast(TextsConfig.TextsConfig_Adviser.strengthMax);
            } else {
                this.AdviserUpLevel_Visit();
            }
        } else {
            this.PetUpStar_Req();
        }
        this.father.CoinMoney();
    }


    private AdviserUpLevel_Visit() {
        //let data_net = Game.PlayerAdviserSystem.advisersMap[this.index];
        PlayerAdviserSystem.AdviserUpLevel_Req(this.index)
            .then((data: any) => {
                loadUI(PetUpStar)
                    .then((dialog: PetUpStar) => {
                        dialog.SetInfo(this.index, this, 1);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });

                this.SetAttriInfo();
                this.SetSkillInfo();
                this.SetConsumeInfo();

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

                this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
                this.father.inIt(this.father.btnType);

            }).catch((reason) => { });
    }

    public setPetConsumeInfo() {
        this.labelCurrentAtt2.visible = false;
        this.labelCurrentAtt4.visible = false;
        let star = Game.PlayerAdviserSystem.petMap[this.index].star;
        let [attri1, title1] = PlayerAdviserSystem.AttriAdd(this.index, star);

        this.labelCurrentAtt1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_attri_dont[title1], attri1));

        if (star == CommonConfig.pet_star_max) {
            this.labelCurrentAtt3.visible = false;
            this.imgSpritePetLevelMax.visible = true;

            this.groupPetUpLevel.visible = false;
            this.imgSpritePetStarMax.visible = true;
        } else {
            this.labelCurrentAtt3.visible = true;
            this.imgSpritePetLevelMax.visible = false;

            this.groupPetUpLevel.visible = true;
            this.imgSpritePetStarMax.visible = false;
            let [attri2, title2] = PlayerAdviserSystem.AttriAdd(this.index, star + 1);
            this.labelCurrentAtt3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_attri_Get[title2], attri2));
        }

        let petInfo = PlayerAdviserSystem.PetBase(this.index);
        let pet_id = petInfo.pet_id;
        let itemId = petInfo.up_goods[star - 1][0];

        let cur = PlayerItemSystem.Count(itemId);
        let des = petInfo.up_count[star - 1][0];
        let itemSet = PlayerItemSystem.Set(itemId);

        let money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
        let money_Des = petInfo.up_money[star - 1];
        this.labelStrength.text = money_Des.toString();

        this.imgSpriteBoard.source = cachekey(UIConfig.UIConfig_Role.pieceFrame[petInfo.quality + 1], this);
        this.imgSpriteIcon.source = cachekey(petInfo.frame_path, this);
        this.imgSpriteIcon.mask = this.imgMask;

        if (cur >= des) {
            this.labelNeedFragement.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragment, cur, des));
            this.btnAddPetSoul.visible = false;
        } else {
            this.labelNeedFragement.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.needFragments, cur, des));
            this.btnAddPetSoul.visible = true;
        }

        let starMax = Game.PlayerAdviserSystem.petMap[this.index].star;

        if (cur >= des && starMax != CommonConfig.pet_star_max && money >= money_Des) {
            this.imgSpriteTipStrength.visible = true;
        } else {
            this.imgSpriteTipStrength.visible = false;
        }


    }

    private onBtnAddPetSoul() {
        let itemId: number;
        if (this.types == 1) {
            let Id = PlayerAdviserSystem.Instance(this.index).compose_goods;
            itemId = Id;
        } else {
            let Id = PlayerAdviserSystem.PetBase(this.index).compose_goods;
            itemId = Id;
        }

        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(itemId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //宠物升星
    private PetUpStar_Req() {
        PlayerAdviserSystem.PetUpStar_Visit(this.index)
            .then((data: any) => {

                loadUI(PetUpStar)
                    .then((dialog: PetUpStar) => {
                        dialog.SetInfo(this.index, this, 2);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });

                this.setPetConsumeInfo();

                let petInfo = PlayerAdviserSystem.SortPet();
                let petkey: number;
                for (const k in petInfo) {
                    const v = petInfo[k];
                    if (v.pet_id == this.index) {
                        petkey = Number(k);
                    }
                }

                let location = Helper.getObjLen(petInfo) * 110 - 470;
                if (petkey * 110 > location) {
                    this.father.moveLocation = location
                } else {
                    this.father.moveLocation = petkey * 110;
                }

                this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
                this.father.inIt(this.father.btnType);
            })
            .catch(reason => {
                toast_warning(reason)
            });
    }

}

}