namespace zj {
//HeroesPokedexScene
//hexiaowei
// 2018/12/05
export class HeroesPokedexInfo extends UI {
    private groupLayer: eui.Group;
    private imgScale9Sprite: eui.Image;
    private groupNode: eui.Group;
    private imgSprite: eui.Image;
    private imgScale9Sprite_1: eui.Image;
    private imgSpriteHunterHalf: eui.Image;
    private imgScale9Sprite_1_1: eui.Image;
    private imgSprite_24: eui.Image;
    private LabelHunterName: eui.Label;
    private labelHunterInfo: eui.Label;
    private imgSpriteHunterName: eui.Image;
    private listHunterSkill: eui.List;
    private imgSpriteHunterGrade: eui.Image;
    private imgSpriteHunterAttType: eui.Image;
    private imgSprite_25: eui.Image;
    private imgSprite_26: eui.Image;
    private imgSpriteHunterDpt: eui.Image;

    private btnViewComment: eui.Button;
    private btnHaveHunter: eui.Button;


    //关闭按钮
    private btnClose: eui.Button;
    private _father: HeroesPokedexScene

    private labelTitle3: eui.Label;
    private labelTitle2: eui.Label;
    private labelTitle24: eui.Label;
    private labelTitle9: eui.Label;
    private labelTitle6: eui.Label;
    private labelTitle8: eui.Label;
    private labelTitle23: eui.Label;
    private labelTitle4: eui.Label;
    private labelTitle5: eui.Label;
    private labelTitle1: eui.Label;


    private labelAttri1: eui.Label;
    private labelAttri2: eui.Label;
    private labelAttri3: eui.Label;
    private labelAttri24: eui.Label;
    private labelAttri9: eui.Label;
    private labelAttri6: eui.Label;
    private labelAttri8: eui.Label;
    private labelAttri23: eui.Label;
    private labelAttri4: eui.Label;
    private labelAttri5: eui.Label;

    private imgSpriteIcon1: eui.Image;
    private imgSpriteIcon2: eui.Image;
    private imgSpriteIcon3: eui.Image;
    private imgSpriteIcon4: eui.Image;

    private imgSpriteFrame1: eui.Image;
    private imgSpriteFrame2: eui.Image;
    private imgSpriteFrame3: eui.Image;
    private imgSpriteFrame4: eui.Image;

    private groupNode1: eui.Group;
    private groupNode2: eui.Group;
    private groupNode3: eui.Group;
    private groupNode4: eui.Group;

    private groupSum: eui.Group;

    public generalid: number;
    private info;
    private labelArray: Array<number> = [1, 2, 3, 24, 9, 6, 8, 23, 4, 5];
    private itemIndex: number = 0;
    private arrCollectionItem: eui.ArrayCollection;
    private skillArray = [];
    private dommondesskill: Common_DesSkill;

    private arrCollectionType: eui.ArrayCollection;

    private rectBg: eui.Rect;

    public constructor() {
        super();

        this.skinName = "resource/skins/archive/HeroesPokedexInfoSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

        this.groupNode1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode1Begin, this);
        this.groupNode1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupNode1Tap, this);

        this.groupNode2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode2Begin, this);
        this.groupNode2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupNode2Tap, this);

        this.groupNode3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode3Begin, this);
        this.groupNode3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupNode3Tap, this);

        this.groupNode4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGroupNode4Begin, this);
        this.groupNode4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGroupNode4Tap, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnGroupRemove, this);

        this.btnHaveHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonHaveHunter, this);
        this.btnViewComment.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onBtnViewComment , this);

        this.dommondesskill = new Common_DesSkill();
        this.addChild(this.dommondesskill);
        this.dommondesskill.visible = false;

        this.groupLayer.scaleX = 0;
        this.groupLayer.scaleY = 0;

        this.rectBg.visible = true;
        this.rectBg.fillAlpha = 0;

        egret.Tween.get(this.rectBg).to({ fillAlpha: 0.3 }, 500, egret.Ease.backOut).call(() => {

        });
        egret.Tween.get(this.groupLayer).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);

    }

    public init(father) {
        this._father = father;
    }

    public Load(data) {
        UIConfig.UIConfig_CommonBattle.formulaP2 = 125;
        this.info = data;
        this.generalid = data.generalId;
        let mapRoleIns = PlayerHunterSystem.MapInstance(PlayerHunterSystem.Table(data.generalId).general_roleId);
        let generalIns = PlayerHunterSystem.Table(data.generalId);
        this.imgSpriteHunterHalf.source = cachekey(mapRoleIns.half_path , this) ;
        if (data.isHave != true) {
            Helper.SetImageFilterColor(this.imgSpriteHunterHalf, "black");
        } else {
            Helper.SetImageFilterColor(this.imgSpriteHunterHalf);
        }
        this.imgSpriteHunterName.source = cachekey(generalIns.name_pic , this) ;
        this.imgSpriteHunterDpt.source = cachekey(UIConfig.UIConfig_Hunter_Pokedex.dpt2[PlayerHunterSystem.Table(data.generalId).type] , this) ;
        this.labelHunterInfo.text = generalIns.des;
        this.imgSpriteHunterGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[PlayerHunterSystem.Table(data.generalId).aptitude] , this) ;
        this.imgSpriteHunterAttType.source = cachekey(UIConfig.UIConfig_General.hunter_type2[PlayerHunterSystem.Table(data.generalId).features] , this) ;
        let info = data.generalInfo;
        info.step = 0;
        let result = PlayerHunterSystem.HXHCalcGelBaseAttrToBattle(info);

        this.SetAttri(result);
        this.SetSkillList();
    }

    private SetAttri(result) {
        for (let i = TableEnum.EnumGelAttrib.ATTR_HP; i < TableEnum.EnumGelAttrib.ATTR_MAX; i++) {
            for (const k in this.labelArray) {
                if (i == this.labelArray[k]) {
                    //this[`labelTitle${i}`].text=TextsConfig.TextsConfig_Potato.AttriStr[i];
                    this["labelTitle" + i].text = TextsConfig.TextsConfig_Potato.AttriStr[i - 1];
                    if (i == TableEnum.EnumGelAttrib.ATTR_HP || i == TableEnum.EnumGelAttrib.ATTR_PHY_ATK ||
                        i == TableEnum.EnumGelAttrib.ATTR_PHY_DEF || i == TableEnum.EnumGelAttrib.ATTR_CD_SPEED ||
                        i == TableEnum.EnumGelAttrib.ATTR_FLOAT_RESIS) {
                        this["labelAttri" + i].text = Math.ceil(result[i]).toString();;
                    } else {
                        this["labelAttri" + i].text = HelpUtil.textConfigFormat(StringConfig_Common.percent, Math.ceil(result[i]));
                    }
                } else {
                    continue;
                }
            }
        }
    }

    private SetSkillList() {
        let genTbl = PlayerHunterSystem.Table(this.generalid);
        this.groupNode1.visible = false;
        this.groupNode2.visible = false;
        this.groupNode3.visible = false;
        this.groupNode4.visible = false;
        for (let i = 0; i < genTbl.skill_ids.length; i++) {
            this["groupNode" + (i + 1)].visible = true;
            this["imgSpriteIcon" + (i + 1)].source = cachekey(TableGeneralSkill.Item(genTbl.skill_ids[i]).path, this);
        }
        if (genTbl.init_passive[0] != 0) {
            this.groupNode3.visible = true;
            this.imgSpriteIcon3.source = cachekey(TableGeneralTalent.Item(genTbl.init_passive[0]).path , this) ;
        }

        if (genTbl.awake_passive != 0) {
            this.groupNode4.visible = true;
            this.imgSpriteIcon4.source = cachekey(TableGeneralTalent.Item(genTbl.awake_passive).path , this) ;

        }

    }

    public onBtnGroupRemove() {
        this.dommondesskill.visible = false;
    }

    public onBtnGroupNode1Begin() {
        this.dommondesskill.visible = true;
        let genTbl = PlayerHunterSystem.Table(this.generalid);
        this.dommondesskill.x = this.width * 0.2;
        this.dommondesskill.y = this.height * 0.35;
        this.dommondesskill.setInfoSkill(genTbl.skill_ids[0], 0, 1);
    }

    public onBtnGroupNode1Tap() {
        this.dommondesskill.visible = false;
    }

    public onBtnGroupNode2Begin() {
        this.dommondesskill.visible = true;
        let genTbl = PlayerHunterSystem.Table(this.generalid);
        this.dommondesskill.x = this.width * 0.30;
        this.dommondesskill.y = this.height * 0.35;
        this.dommondesskill.setInfoSkill(genTbl.skill_ids[1], 1, 1);
        this.dommondesskill.visible = true;
    }

    public onBtnGroupNode2Tap() {
        this.dommondesskill.visible = false;
    }

    public onBtnGroupNode3Begin() {
        this.dommondesskill.visible = true;
        let genTbl = PlayerHunterSystem.Table(this.generalid);
        this.dommondesskill.x = this.width * 0.35;
        this.dommondesskill.y = this.height * 0.35;
        this.dommondesskill.setInfoTalent(genTbl.init_passive[0], 2);

    }

    public onBtnGroupNode3Tap() {
        this.dommondesskill.visible = false;
    }

    public onBtnGroupNode4Begin() {
        this.dommondesskill.visible = true;
        let genTbl = PlayerHunterSystem.Table(this.generalid);
        this.dommondesskill.x = this.width * 0.4;
        this.dommondesskill.y = this.height * 0.35;
        this.dommondesskill.setInfoTalent(genTbl.awake_passive, 3);

    }

    public onBtnGroupNode4Tap() {
        this.dommondesskill.visible = false;
    }

    public onBtnGroupNodeEnd() {
        this.dommondesskill.visible = false;
    }


    public LoadShow(generalId) {
        // UIOpenAndDown(self)
    }

    public onBtnViewComment() {
        toast_warning("查看评论暂未开启！");
    }

    private onButtonClose() {
        egret.Tween.get(this.rectBg).to({ fillAlpha: 0 }, 100, egret.Ease.backOut).call(() => {

        });

        egret.Tween.get(this.groupLayer).to({ scaleX: 0, scaleY: 0 }, 200, egret.Ease.backInOut).call(() => {
            this.rectBg.visible = false;
            this.close();
        });

    }

    private onButtonHaveHunter() {
        let id = this.generalid % CommonConfig.general_id_to_index_multiple;
        let soulId = TableBaseGeneral.Item(id).general_soul;
        loadUI(Common_OutPutDialog)
            .then((dialog: Common_OutPutDialog) => {
                dialog.setInfo(soulId, this, () => {
                });
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }


}

}