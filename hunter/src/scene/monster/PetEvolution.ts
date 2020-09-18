namespace zj {
//PetEvolution
//wangshenzhuo
//2019/01/19
export class PetEvolution extends Dialog {
    public btnclose: eui.Button;
    /**当前形象 */
    public imgSpriteNow1: eui.Image;
    public imgSpriteNow2: eui.Image;
    public imgSpriteNow3: eui.Image;

    //一阶进化解锁
    public lableUnLock1: eui.Label;
    public lableUnLock2: eui.Label;
    public lableUnLock3: eui.Label;

    //龙骨动画
    public groupNodePet1: eui.Group;
    public groupNodePet2: eui.Group;
    public groupNodePet3: eui.Group;

    //几阶进化
    public labelEvolutionNum: eui.Label;

    public imgSpriteArrow: eui.Image;
    //解锁天赋介绍
    public labelTalent: eui.Label;
    public labelTalent2: eui.Label;

    //头像框
    public imgSpriteFrameCost1: eui.Image;
    public imgSpriteIconCost1: eui.Image;
    public imgSpriteAddCost1: eui.Image;
    public labelNumCost1: eui.Label;
    public imgSpriteAdd: eui.Image;

    public btnEvolution: eui.Button;
    public labelNum: eui.Label;
    public labelTTF1: eui.Label;
    public groupNodePetStar: eui.Group;
    public labelTTF2: eui.Label;

    public max_step = CommonConfig.pet_step_max;
    private index: number;
    private father: PetMainScene;

    private groupLock: eui.Group;

    private btnSpriteAddCost1 : eui.Button;

    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetEvolutionSkin.exml";
        this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);
        this.btnEvolution.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEvolution, this);
        this.btnSpriteAddCost1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddCost1, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);
    }

    //龙骨动画宠物
    public addAnimatoinPet(groupAdviser: eui.Group, scale: number, dbName: string, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
            .then(display => {
                display.x = groupAdviser.width / 2;
                display.y = groupAdviser.height / 1.2;
                display.scaleX = scale;
                display.scaleY = scale;
                groupAdviser.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setInfo(index, father) {
        this.index = index;
        this.father = father;

        this.SetInfoSkill();
        this.showAnimatitinPet();
    }


    //显示宠物进化龙骨
    public showAnimatitinPet() {
        let petInfo = PlayerAdviserSystem.PetBase(this.index);
        let spine1 = petInfo.spine_id[0];
        let aniSpine1 = TableClientAniSpineSource.Item(spine1);
        this.addAnimatoinPet(this.groupNodePet1, 0.7, aniSpine1.json);

        let spine2 = petInfo.spine_id[1];
        let aniSpine2 = TableClientAniSpineSource.Item(spine2);
        this.addAnimatoinPet(this.groupNodePet2, 0.8, aniSpine2.json);

        let spine3 = petInfo.spine_id[2];
        let aniSpine3 = TableClientAniSpineSource.Item(spine3);
        this.addAnimatoinPet(this.groupNodePet3, 0.7, aniSpine3.json);

        this.lableUnLock1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[0]));
        this.lableUnLock2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[1]));
        this.lableUnLock3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[2]));
    }

    private SetInfoSkill() {
        let evolution = 0;
        if (Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
            evolution = 1;
        } else if (Game.PlayerAdviserSystem.petMap[this.index].step >= PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
            && Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
            evolution = 2;
        } else {
            evolution = 3;
        }

        if (evolution == 1) {

            this.lableUnLock1.visible = false;
            this.imgSpriteNow1.visible = true;
            this.lableUnLock2.visible = true;
            this.imgSpriteNow2.visible = false;
            this.lableUnLock3.visible = true;
            this.imgSpriteNow3.visible = false;

        } else if (evolution == 2) {

            this.lableUnLock1.visible = false;
            this.imgSpriteNow1.visible = false;
            this.lableUnLock2.visible = false;
            this.imgSpriteNow2.visible = true;
            this.lableUnLock3.visible = true;
            this.imgSpriteNow3.visible = false;

        } else {

            this.lableUnLock1.visible = false;
            this.imgSpriteNow1.visible = false;
            this.lableUnLock2.visible = false;
            this.imgSpriteNow2.visible = false;
            this.lableUnLock3.visible = false;
            this.imgSpriteNow3.visible = true;

        }


        //进阶消耗
        let step = 0;
        if (Game.PlayerAdviserSystem.petMap[this.index].step >= CommonConfig.pet_step_max) {
            step = Game.PlayerAdviserSystem.petMap[this.index].step - 1;
        } else {
            step = Game.PlayerAdviserSystem.petMap[this.index].step;
        }
        this.labelEvolutionNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_lock_stpe, step + 1);

        this.imgSpriteIconCost1.source = cachekey(PlayerAdviserSystem.PetBase(this.index).skill_Icon[1] , this) ;
        this.labelNum.visible = false;

        let talentId = PlayerAdviserSystem.PetBase(this.index).skill_normal[step + 1];
        let skillId = PlayerAdviserSystem.PetBase(this.index).skill_island[step + 1];

        this.labelTalent.textFlow = Util.RichText(PlayerTalentSystem.Des(talentId, 0));

        let attri = null;
        let str = null;
        let des = null;

        if (TablePetSkill.Item(skillId).type != 1) {
            if (TablePetSkill.Item(skillId).type == 2) {
                des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(skillId).type], TablePetSkill.Item(skillId).rand[0]);
            } else {
                des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_passive[TablePetSkill.Item(skillId).type], TablePetSkill.Item(skillId).value);
            }
        } else {
            attri = TablePetSkill.Item(skillId).attri_add;
            str = TextsConfig.TextsConfig_Potato.AttriStr[attri[0] - 1];
            des = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.darkland, str, attri[1]);
        }
        this.labelTalent2.textFlow = Util.RichText(des);

        let goods = PlayerAdviserSystem.PetBase(this.index).evo_consume[step];
        let count = PlayerAdviserSystem.PetBase(this.index).evo_consume_good[step];
        let itemSet1 = PlayerItemSystem.ItemPath(goods[0]);
        let Cur1 = PlayerItemSystem.Count(goods[0]);
        let str_count1 = Helper.StringFormat("%d/%d", Cur1, count[0]);

        this.imgSpriteIconCost1.source = cachekey(itemSet1 , this) ;
        this.labelNumCost1.text = str_count1;
        this.labelNum.text = PlayerAdviserSystem.PetBase(this.index).evo_consume_money[step].toString();
        let star = Game.PlayerAdviserSystem.petMap[this.index].star;
        let step1 = Game.PlayerAdviserSystem.petMap[this.index].step;
        let curStar = 0;
        if (step1 < CommonConfig.pet_step_max) {
            curStar = PlayerAdviserSystem.PetBase(this.index).evo_star_req[step1];
        } else {
            curStar = CommonConfig.pet_step_max;
        }
        let level = Game.PlayerAdviserSystem.petMap[this.index].star;
        PetEvolution.GetNodeStarByAlignmentsPet(this.groupNodePetStar, 5, 5, 0.8, level, null);
        if (star < curStar) {
            this.btnEvolution.visible = false;
            this.labelNum.visible = false;
            this.groupLock.visible = true;
        } else {
            this.btnEvolution.visible = true;
            this.labelNum.visible = true;
            this.groupLock.visible = false;
        }
    }

    private onBtnclose() {
        if(this.father.petMainKeelAnimation.parent) {
            this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
        }
        this.father.inIt(this.father.btnType);
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnEvolution() {
        this.PetEvolution_Visit();
    }

    private onBtnAddCost1(){
        let itemId = PlayerAdviserSystem.PetBase(this.index).evo_consume[Game.PlayerAdviserSystem.petMap[this.index].step][0];
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(itemId, this);
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    public PetEvolution_Visit() {
        let data_net = Game.PlayerAdviserSystem.petMap[this.index];
        PlayerAdviserSystem.PetEvolution_Req(data_net.pet_id).then((data: any) => {
            if (Game.PlayerAdviserSystem.petMap[this.index].step == this.max_step) {
                this.onBtnclose();
                loadUI(PetUpStar)
                    .then((dialog: PetUpStar) => {
                        dialog.SetInfo(this.index, this, 3);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                this.SetInfoSkill();
                if(this.father.petMainKeelAnimation.parent) {
                    this.father.groupAdviser.removeChild(this.father.petMainKeelAnimation);
                }
                this.father.inIt(this.father.btnType);
            } else {
                loadUI(PetUpStar)
                    .then((dialog: PetUpStar) => {
                        dialog.SetInfo(this.index, this, 3);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                this.SetInfoSkill();

            }
        })
    }

    //居中对齐星星(宠物进化页面)
    public static GetNodeStarByAlignmentsPet(nodeMid: eui.Group, star, maxStar, scale, level, angle) {

        let nodeStar = [];
        let path: string;
        maxStar = maxStar != 0 ? maxStar : CommonConfig.general_max_star;
        star = (maxStar < star) ? maxStar : star;
        let gap = nodeMid.width / (maxStar - 1);
        let centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height / 2);
        let posList = Helper.GetLinePosition(centerPos.x, -centerPos.y, gap, star, angle);
        level = level + 1;
        for (let i = 0; i < star; i++) {
            if (level > 0 && level < 6) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
            }
            else if (level >= 6 && level < 11) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
            }
            else if (level >= 11 && level < 16) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
            }
            else if (level >= 16 && level < 21) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
            }
            else if (level >= 21 && level < 26) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
            }
            else if (level >= 26 && level < 30) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
            }
            else if (level >= 30 && level <= 35) {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "7" + "_png";
            }

            let img = new eui.Image();
            img.source = cachekey(path , nodeMid) ;
            img.x = posList[i].x + i * 5;
            img.verticalCenter = 0;
            //img.y = posList[i].y; 

            img.anchorOffsetX = 0.5;
            img.anchorOffsetY = 0.5;

            img.scaleX = scale;
            img.scaleY = scale;

            nodeMid.addChild(img);
            nodeStar.push(img);

        }
        return nodeStar;
    }

}

}