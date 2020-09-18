namespace zj {
//PetInfoItem
//hexiaowei
//2019/01/11
export class PetInfoItem extends eui.ItemRenderer {
    private btnPetName: eui.Button;
    private imgSpriteIcon: eui.Image;
    private imgSpriteName: eui.Image;
    private imgSpriteNode: eui.Image;
    private groupNodeStar: eui.Group;
    private imgSpriteFrame: eui.Image;
    private imgSpriteTip: eui.Image;
    private imgSpriteGrade: eui.Image;
    private imgSpriteIFrame: eui.Image;
    private groupNodeLevel: eui.Group;
    private imgSpriteLevel: eui.Image;
    private labelLevel: eui.Label;

    private level: number = 0;
    private money;
    private moneyDes;
    private desNext;
    private two: boolean;

    public isdown: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetInfoItemSkin.exml";
        cachekeys(<string[]>UIResource["PetInfoItem"], null);
        this.imgSpriteFrame.visible = false;

        // this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
        //     this.imgSpriteFrame.visible = true;
        // }, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
        //     this.imgSpriteFrame.visible = false;
        // }, this);

        this.addEventListener(egret.Event.ADDED_TO_STAGE,()=>{
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
        },this);
    }


    protected dataChanged() {
        if (this.data.pet_id == undefined) {
            this.getAdviser();
        } else {
            let petid = this.data.pet_id;
            let petinfo = PlayerAdviserSystem.PetBase(petid);
            this.imgSpriteName.source = cachekey(petinfo.name_path , this) ;
            this.imgSpriteIcon.source = cachekey(petinfo.frame_path , this) ;
            this.imgSpriteGrade.source = cachekey(UIConfig.UIConfig_Pet.smallGrade[petinfo.quality + 10] , this) ;

            if (this.selected) {
                this.imgSpriteFrame.visible = true;
            } else {
                this.imgSpriteFrame.visible = false;
            }

            let mn = Game.PlayerAdviserSystem.petMap;
            let level = Game.PlayerAdviserSystem.petMap[petid].star;
            let itemId = petinfo.compose_goods;
            let cur = PlayerItemSystem.Count(itemId);
            let des = petinfo.compose_count;

            if ((level > 0 && level < 6) || level == 0 && cur >= des) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[1];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[1];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 6 && level < 11) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[2];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[2];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 11 && level < 16) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[3];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[3];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 16 && level < 21) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[4];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[4];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 21 && level < 26) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[5];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[5];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 26 && level < 31) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[6];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[6];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else if (level >= 31) {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[7];
                let path2 = UIConfig.UIConfig_Pet.buttonSel[7];
                Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
            }
            else {
                let path1 = UIConfig.UIConfig_Pet.buttonNor[8];
                Set.ButtonBackgroud(this.btnPetName, path1, path1, path1);
            }

            let money = 0;
            let moneyDes = 0;
            if (PlayerAdviserSystem.GetPet(petid)) {
                Helper.SetImageFilterColor(this.imgSpriteIcon);
                this.imgSpriteNode.visible = false;
                this.groupNodeStar.visible = true;
                this.labelLevel.text = "+" + level;
                PetInfoItem.GetNodeStarByAlignmentsPet(this.groupNodeStar, 5, 5, 0.8, level, null);

                money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
                moneyDes = petinfo.up_money[level + 1];
            } else {
                Helper.SetImageFilterColor(this.imgSpriteIcon, "gray");
                this.imgSpriteNode.visible = true;
                if (cur >= des) {
                    this.imgSpriteNode.source = cachekey(UIConfig.UIConfig_Pet.canGet , this); 
                } else {
                    this.imgSpriteNode.source = cachekey(UIConfig.UIConfig_Pet.dontGet , this) ;
                }
                this.groupNodeStar.visible = false;
                this.imgSpriteLevel.visible = false;
                this.labelLevel.visible = false;
            }


            let step = 0;
            if (PlayerAdviserSystem.GetPet(petid) && Game.PlayerAdviserSystem.petMap[petid].step == CommonConfig.pet_step_max) {
                step = Game.PlayerAdviserSystem.petMap[petid].step - 1;
            } else {
                step = Game.PlayerAdviserSystem.petMap[petid].step;
            }
            let goods = petinfo.evo_consume[step];
            let count = petinfo.evo_consume_good[step][0];
            let itemSet1 = PlayerItemSystem.Set(goods[0]);
            let cur1 = PlayerItemSystem.Count(goods[0]);
            let moneyStep = petinfo.evo_consume_money[step];
            let moneyDeStep = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            let curStar = 0;
            if (step <= CommonConfig.pet_step_max) {
                curStar = petinfo.evo_star_req[step];
            }

            let star = 1;
            if (PlayerAdviserSystem.GetPet(petid)) {
                star = Game.PlayerAdviserSystem.petMap[petid].star - 1;
            }
            let itemIdnew = petinfo.up_goods[star][0];
            let curStarnew = PlayerItemSystem.Count(itemIdnew);
            let desStar = petinfo.up_count[star][0];
            let itemSet = PlayerItemSystem.Set(itemIdnew);

            let moneyStar = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            let moneyDesStar = petinfo.up_money[star];

            //宠物红点
            if (cur >= des && PlayerAdviserSystem.GetPet(petid) == false) {
                this.imgSpriteTip.visible = true;
            } else if (level != CommonConfig.pet_star_max && PlayerAdviserSystem.GetPet(petid) == true
                && petinfo.up_count[Game.PlayerAdviserSystem.petMap[petid].star][0] >= PlayerItemSystem.Count(petinfo.up_goods[Game.PlayerAdviserSystem.petMap[petid].star][0])
                && moneyDes != null
                && petinfo.up_money[Game.PlayerAdviserSystem.petMap[petid].star] >= moneyDes
            ) {
                this.imgSpriteTip.visible = true;
            } else if (PlayerAdviserSystem.GetPet(petid) && curStarnew >= desStar && star != CommonConfig.pet_star_max && moneyStar >= moneyDesStar) {
                this.imgSpriteTip.visible = true;
            } else if (PlayerAdviserSystem.GetPet(petid)
                && Game.PlayerAdviserSystem.petMap[petid].step != CommonConfig.pet_step_max
                && step <= CommonConfig.pet_step_max
                && Game.PlayerAdviserSystem.petMap[petid].star >= curStar
                && cur1 >= count
                && moneyDeStep >= moneyStep) {
                this.imgSpriteTip.visible = true;
            } else {
                this.imgSpriteTip.visible = false;
            }
         

        }
    }

    private getAdviser() {
        let adviserid = this.data.adviser_id != undefined ? this.data.adviser_id : this.data.adviserId;
        let info = PlayerAdviserSystem.Instance(adviserid);

        this.imgSpriteName.source = cachekey(info.name_path , this) ;
        this.imgSpriteIcon.source = cachekey(info.head_path , this) ;
        this.imgSpriteGrade.source = cachekey(UIConfig.UIConfig_Pet.smallGrade[info.quality + 10] , this) ;

        if (this.selected) {
            this.imgSpriteFrame.visible = true;
        } else {
            this.imgSpriteFrame.visible = false;
        }

        if (PlayerAdviserSystem.Have(info.adviser_id) == false) {
            this.level = 0
        } else {
            this.level = Game.PlayerAdviserSystem.advisersMap[info.adviser_id].level;
            this.money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            this.moneyDes = PlayerAdviserSystem.AdviserlvdbInstance(info.adviser_id * 10000 + this.level).adviser_money;
            this.desNext = PlayerAdviserSystem.AdviserlvdbInstance(info.adviser_id * 10000 + this.level).consume_count;
        }

        let itemId = PlayerAdviserSystem.Instance(info.adviser_id).compose_goods;
        let cur = PlayerItemSystem.Count(itemId);
        let des = PlayerAdviserSystem.Instance(info.adviser_id).compose_count;
        let adviserId = PlayerAdviserSystem.Instance(info.adviser_id).adviser_id;

        //是否拥有念兽
        if (PlayerAdviserSystem.Have(info.adviser_id)) {
            Helper.SetImageFilterColor(this.imgSpriteIcon);
            this.imgSpriteNode.visible = false;
            this.groupNodeStar.visible = true;
            this.labelLevel.text = "+" + this.level;
            PetInfoItem.GetNodeStarByAlignmentsPet(this.groupNodeStar, 5, 5, 0.8, this.level, null);
        } else {
            Helper.SetImageFilterColor(this.imgSpriteIcon, "gray");
            this.imgSpriteNode.visible = true;
            if (cur >= des) {
                this.imgSpriteNode.source = cachekey(UIConfig.UIConfig_Pet.canGet , this); 
            } else {
                this.imgSpriteNode.source = cachekey(UIConfig.UIConfig_Pet.dontGet , this) ;
            }
            this.groupNodeStar.visible = false;
            this.imgSpriteLevel.visible = false;
            this.labelLevel.visible = false;
        }

        let one = [];
        for (const k in Game.PlayerAdviserSystem.adviser) {
            const v = Game.PlayerAdviserSystem.adviser[k];
            if (v.reward_count != 0) {
                one.push(v.adviserId);
            }
            this.two = Table.FindF(one, function (k, v) {
                return v == info.adviser_id;
            })
        }

        //红点
        if (cur >= des && PlayerAdviserSystem.Have(info.adviser_id) == false) {
            this.imgSpriteTip.visible = true;
        } else if (PlayerAdviserSystem.Have(info.adviser_id) == true && cur >= this.desNext && PlayerAdviserSystem.AdviserlvdbIsMax(info.adviser_id, this.level) == false && this.money >= this.moneyDes) {
            this.imgSpriteTip.visible = true;
        } else if (this.two) {
            this.imgSpriteTip.visible = true;
        } else {
            this.imgSpriteTip.visible = false;
        }

        //list按钮背景（念兽星级有关）
        if ((this.level > 0 && this.level < 6) || (this.level == 0 && cur >= des)) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[1];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[1];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if (this.level >= 6 && this.level < 11) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[2];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[2];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if (this.level >= 11 && this.level < 16) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[3];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[3];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if (this.level >= 16 && this.level < 21) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[4];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[4];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if (this.level >= 21 && this.level < 26) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[5];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[5];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if (this.level >= 26 && this.level < 31) {
            let path1 = UIConfig.UIConfig_Pet.buttonNor[6];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[6];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }
        else if(this.level >=31){
            let path1 = UIConfig.UIConfig_Pet.buttonNor[7];
            let path2 = UIConfig.UIConfig_Pet.buttonSel[7];
            Set.ButtonBackgroud(this.btnPetName, path1, path2, path2);
        }else{
            let path1 = UIConfig.UIConfig_Pet.buttonNor[8];
            Set.ButtonBackgroud(this.btnPetName, path1, path1, path1);
        }
    }

    //居中对齐星星(念兽按钮列表)
    public static GetNodeStarByAlignmentsPet(nodeMid: eui.Group, star, maxStar, scale, level, angle) {
        nodeMid.removeChildren();
        let nodeStar = [];
        let path: string;
        maxStar = maxStar != 0 ? maxStar : CommonConfig.general_max_star;
        star = (maxStar < star) ? maxStar : star;
        let gap = nodeMid.width / (maxStar - 1);
        let centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height / 2);
        let posList = Helper.GetLinePosition(centerPos.x, -centerPos.y, gap, star, angle);

        for (let i = 0; i < star; i++) {
            let flag1 = 5
            let flag2 = 6
            if (level > 0 && level < 6) {
                if (i < level) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "0" + "_png";
                }
            }
            else if (level >= 6 && level < 11) {
                if (i < level - flag1) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "1" + "_png";
                }
            }
            else if (level >= 11 && level < 16) {
                if (i < level - flag1 * 2) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "2" + "_png";
                }
            }
            else if (level >= 16 && level < 21) {
                if (i < level - flag1 * 3) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "3" + "_png";
                }
            }
            else if (level >= 21 && level < 26) {
                if (i < level - flag1 * 4) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "4" + "_png";
                }
            }
            else if (level >= 26 && level < 31) {
                if (i < level - flag1 * 5) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "5" + "_png";
                }
            }
            else if (level >= 31 && level <= 35) {
                if (i < level - flag1 * 6) {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "7" + "_png";
                } else {
                    path = "ui_hunter_evaluate_IconSkillAwaken" + "6" + "_png";
                }
            }
            else {
                path = "ui_hunter_evaluate_IconSkillAwaken" + "0" + "_png";
            }

            let img = new eui.Image();
            img.source = path;
            img.x = posList[i].x;
            img.verticalCenter = 0;
            //img.y = posList[i].y; 

            img.anchorOffsetX = 0.5;
            img.anchorOffsetY = 0.5;

            nodeMid.addChild(img);
            nodeStar.push(img);

        }
        return nodeStar;
    }
}

}