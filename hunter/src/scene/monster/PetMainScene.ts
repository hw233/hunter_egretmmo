namespace zj {
//PetMainScene
//hexiaowei
//2019/01/11
export class PetMainScene extends Scene {
    private btnReturn: eui.Button;
    private imgSpriteIconGrade: eui.Image;
    private imgSpritePetName: eui.Image;
    private groupSceneStar: eui.Group;
    private BtnMonster: eui.Button;
    private btnPet: eui.Button;
    private imageMonster: eui.Image;
    private imagePet: eui.Image;
    private labelGetNum: eui.Label;
    private groupPetState: eui.Group; //宠物的当前状态
    private groupPreview: eui.Group; //宠物形象预览
    private groupSkill1: eui.Group; // 宠物技能一
    private groupSkill2: eui.Group; //宠物技能二
    private imgSpriteIcon: eui.Image;
    private imgSpriteIcon1: eui.Image;
    private scrollerInfo: eui.Scroller;
    private btnRest: eui.Button;
    private labelBattle: eui.Label;
    private imgred1: eui.Image;
    private imgred2: eui.Image;
    private imgSpriteRedPoint: eui.Image;

    private btnControl: eui.Button;
    private btnControlShow: eui.Button;

    private listAdviser: eui.List;
    private arrCollectionItem: eui.ArrayCollection;

    private groupProperty: eui.Group;
    private groupProperty1: eui.Group;
    private groupProperty2: eui.Group;
    public groupAdviser: eui.Group;

    private itemIndex: number = 0;
    public petMainKeelAnimation: dragonBones.EgretArmatureDisplay;//	念兽、宠物动画
    public btnType: number = 1;

    private btnDes: eui.Button;
    public petdes: Common_PetDes;
    public groupPetMain: eui.Group;
    public groupPetMain2: eui.Group;
    public DontGet: PetDontGet;  //念兽属性召唤页面
    public PetGet: PetGet; // 念兽、宠物升星页面
    public DontGetB: PetDontGetB; //宠物属性召唤页面

    public labelGold: eui.Label;  //金币

    public btnAddGold: eui.Button;

    //列表下拉移动位置
    public moveLocation: number = 0;
    public despettalent: Common_DesPetTalent;
    private info = [];
    private index: number = 0;
    private ui = [
        "PetDontGet",
        "PetDontGetB",
        "PetGet"
    ]

    private imgTabulate: eui.Image;
    private imgTabulate1: eui.Image;

    private groupMessage: eui.Group;
    private groupSkillMessage: eui.Group;

    public constructor() {
        super();
        this.skinName = "resource/skins/monster/PetMainSceneSkin.exml";

        this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
        this.listAdviser.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.AddHeroesPokedexInfo, this);
        this.imgSpriteIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupSkill1, this);
        this.imgSpriteIcon1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupSkill2, this);
        this.btnDes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDes, this);
        this.btnDes.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDes1, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDes1, this);

        this.BtnMonster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMonster, this);
        this.btnPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPet, this);
        this.btnDes.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnDes, this);
        this.btnDes.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDes1, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnDes1, this);

        this.btnRest.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRest, this);
        this.btnControl.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnControl1, this);
        this.btnControl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnControl, this);
        this.btnControlShow.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnControlShow1, this);
        this.btnControlShow.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnControlShow, this);

        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
        Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.CoinMoney, this);

        this.PetGet = new PetGet();
        this.groupProperty1.addChild(this.PetGet);
        this.DontGet = new PetDontGet();
        this.groupProperty.addChild(this.DontGet);
        this.DontGet.name = "DontGet";
        this.DontGetB = new PetDontGetB();
        this.groupProperty2.addChild(this.DontGetB);

        this.petdes = new Common_PetDes();
        this.groupMessage.addChild(this.petdes);
        this.petdes.visible = false;

        this.despettalent = new Common_DesPetTalent();
        this.groupSkillMessage.addChild(this.despettalent);
        this.despettalent.visible = false;

        Game.EventManager.event(GameEvent.SHOW_UI, {typeName: "zj.PetDontGet"});
    }

    //金币
    public CoinMoney() {
        let token = Game.PlayerInfoSystem.Coin;
        if (token > 100000) {
            this.labelGold.text = (token / 10000).toFixed(1) + "万";
        } else {
            this.labelGold.text = token.toString();
        }
    }

    //跳转加金币页面
    private onBtnAddGold() {
        loadUI(HelpGoldDialog)
            .then((dialog: HelpGoldDialog) => {
                dialog.SetInfoList();
                dialog.show(UI.SHOW_FILL_OUT);
            });
    }

    //龙骨动画念兽
    public addAnimatoin(dbName: string, scale: number, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
            .then(display => {
                display.x = this.groupAdviser.width / 2;
                display.y = this.groupAdviser.height + 10;
                display.scaleX = scale;
                display.scaleY = scale;
                this.groupAdviser.removeChildren();
                this.groupAdviser.addChild(display);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });
    }

    //龙骨动画宠物
    public addAnimatoinPet(dbName: string, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
            .then(display => {
                display.x = this.groupAdviser.width / 2;
                display.y = this.groupAdviser.height / 1.2;
                this.groupAdviser.removeChildren();
                this.groupAdviser.addChild(display);
                this.petMainKeelAnimation = display;
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public inIt(btnType: number) {

        this.btnType = btnType;
        //this.btnType = 2;
        if (this.btnType == 1) {
            this.BtnMonster.visible = false;
            this.imagePet.visible = false;
            this.imageMonster.visible = true;
            this.imgred1.visible = true;
            this.imgred2.visible = false;
            this.btnPet.visible = true;
            this.imgTabulate.visible = false;
            this.imgTabulate1.visible = true;

            this.groupPetState.visible = false;
            this.groupPreview.visible = false;
            this.groupSkill1.visible = false;
            this.groupSkill2.visible = false;

            this.labelGetNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.LabelGetName, Game.PlayerAdviserSystem.adviser.length, Helper.getObjLen(TableBaseAdviser.Table()));
        } else {
            this.BtnMonster.visible = true;
            this.imagePet.visible = true;
            this.imageMonster.visible = false;
            this.imgred1.visible = false;
            this.imgred2.visible = true;
            this.btnPet.visible = false;
            this.imgTabulate.visible = true;
            this.imgTabulate1.visible = false;

            this.groupPetState.visible = true;
            this.groupPreview.visible = true;
            this.groupSkill1.visible = true;
            this.groupSkill2.visible = true;
            this.labelGetNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.pet_get_num, Game.PlayerAdviserSystem.petInfo.length, Helper.getObjLen(PlayerAdviserSystem.SortPet()));
        }
        //this.groupAdviser.removeChildren();
        //this.dontget();
        this.setInfo();
        this.CoinMoney();
        this.dontget();
    }

    //宠物、念兽属性刷新
    public dontget() {
        let adviser_id = PlayerAdviserSystem.Instance(this.index).adviser_id;
        if (this.btnType == 1) {
            if (PlayerAdviserSystem.Have(this.index)) {
                this.PetGet.SetInfo(adviser_id, this, this.btnType);
                this.groupProperty.visible = false;
                this.groupProperty2.visible = false;
                this.groupProperty1.visible = true;

            } else {
                this.DontGet.SetInfo(adviser_id, this , this.btnType);
                this.groupProperty1.visible = false;
                this.groupProperty2.visible = false;
                this.groupProperty.visible = true;
            }
        } else {
            if (PlayerAdviserSystem.GetPet(this.index)) {
                this.PetGet.SetInfo(adviser_id, this, this.btnType);
                this.groupProperty.visible = false;
                this.groupProperty1.visible = true;
                this.groupProperty2.visible = false;
            } else {
                this.DontGetB.SetInfo(adviser_id, this , this.btnType);
                this.groupProperty1.visible = false;
                this.groupProperty2.visible = true;
                this.groupProperty.visible = false;
            }
        }
    }



    public setInfo() {
        this.imgred1.visible = (this.btnType != 1 && (Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_GET) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_UP) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_AWARD)))
        this.imgred2.visible = (this.btnType != 2 && (Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_GET) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_UPSTAR) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_STEP)))
        let info;
        if (this.btnType == 1) {
            info = PlayerAdviserSystem.GetTable();
            this.imgred1.visible = false;
            this.imgred2.visible = (Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_GET) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_UPSTAR) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.PET_STEP));
        } else {
            info = PlayerAdviserSystem.SortPet();
            this.imgred1.visible = (Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_GET) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_UP) || Tips.GetTipsOfId(Tips.TAG.ADVISER, Tips.TAG.ADVISER_AWARD));
            this.imgred2.visible = false;
        }

        //this.listAdviser.selectedIndex = this.itemIndex; // 默认选中
        this.listAdviser.itemRenderer = PetInfoItem;
        this.arrCollectionItem = new eui.ArrayCollection();
        for (let i = 0; i < info.length; i++) {
            this.arrCollectionItem.addItem(info[i]);
            let adviserId = info[i].adviserId != undefined ? info[i].adviserId : info[i].adviser_id;
            let petId = info[i].pet_id;
            if (adviserId == this.index) {
                this.listAdviser.selectedIndex = i;
                this.itemIndex = this.listAdviser.selectedIndex;
            } else if (petId == this.index) {
                this.listAdviser.selectedIndex = i;
                this.itemIndex = this.listAdviser.selectedIndex;
            }
            else {
                this.listAdviser.selectedIndex = this.itemIndex; // 默认选中
                this.itemIndex = this.listAdviser.selectedIndex;
            }
        }
        this.listAdviser.dataProvider = this.arrCollectionItem;
        //this.itemIndex=this.listAdviser.selectedIndex;

        this.scrollerInfo.viewport = this.listAdviser;
        this.scrollerInfo.validateNow();
        this.scrollerInfo.viewport.scrollV = this.moveLocation;
        this.setIconInfo();
    }

    //列表点击
    private AddHeroesPokedexInfo(e: eui.ItemTapEvent) {
        if (this.itemIndex != this.listAdviser.selectedIndex) {
            this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
            this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listAdviser.selectedIndex]);
            this.itemIndex = this.listAdviser.selectedIndex;
        }else{
            return;
        }
        this.groupAdviser.removeChildren();
        this.moveLocation = this.scrollerInfo.viewport.scrollV;
        this.setIconInfo();

        this.dontget();
        this.CoinMoney();

    }

    //念兽、宠物详情
    private setIconInfo() {
        //this.addAnimatoin("beastjokerspine");
        if (this.btnType == 1) {
            this.info = PlayerAdviserSystem.GetTable();
            if (this.info.length == 0) {
                this.index = 0;
            } else {
                this.index = this.info[this.itemIndex].adviserId != undefined ? this.info[this.itemIndex].adviserId : this.info[this.itemIndex].adviser_id;
            }

            let infoItem = PlayerAdviserSystem.Instance(this.index);

            // let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id);
            // var strs = new Array()
            // strs = aniSpine.json.split("/");
            // let animationPracticalUrl = strs[strs.length - 1].split(".")[0];
            // this.addAnimatoin(animationPracticalUrl);

            let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id);
            this.addAnimatoin(aniSpine.json, infoItem.spine_scale);

            let quality = infoItem.quality;
            let name = infoItem.adviser_name;
            let quality1 = infoItem.quality + 10;

            this.imgSpriteIconGrade.source = cachekey(UIConfig.UIConfig_Pet.Grade[quality1], this);
            this.imgSpritePetName.source = cachekey(infoItem.name_down_path, this);

            let level = Game.PlayerAdviserSystem.advisersMap[this.index].level;

            PetMainScene.GetNodeStarByPet(this.groupSceneStar, 5, 5, 1, level, 0);
        }
        else {

            this.info = PlayerAdviserSystem.SortPet();
            if (this.info.length == 0) {
                this.index = 0;
            } else {
                this.index = this.info[this.itemIndex].pet_id;
            }
            let infoItem = PlayerAdviserSystem.PetBase(this.index);
            let isHave = PlayerAdviserSystem.GetPet(this.index);

            this.btnControl.visible = !isHave;
            this.btnControlShow.visible = isHave;

            this.groupPetState.visible = isHave;
            //this.groupPreview.visible = isHave;
            this.groupSkill1.visible = isHave;
            this.groupSkill2.visible = isHave;

            let steps = 0;
            if (Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
                steps = 0;
            } else if (Game.PlayerAdviserSystem.petMap[this.index].step >= PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
                && Game.PlayerAdviserSystem.petMap[this.index].step < PlayerAdviserSystem.PetBase(this.index).unlock_step[2]
            ) {
                steps = 1;
            } else {
                steps = 2;
            }

            let path1 = UIConfig.UIConfig_Adviser.pet_battle_state.stopNor
            let path2 = UIConfig.UIConfig_Adviser.pet_battle_state.stopSel
            let path3 = UIConfig.UIConfig_Adviser.pet_battle_state.battleNor
            let path4 = UIConfig.UIConfig_Adviser.pet_battle_state.battleSel

            if (Game.PlayerAdviserSystem.petMap[this.index].situtation == 1) {
                for (const k in Game.PlayerAdviserSystem.petMap) {
                    const v = Game.PlayerAdviserSystem.petMap[k];
                    if (v.pet_id != this.index) {
                        v.situtation = 0;
                    }
                }
            }

            if (Game.PlayerAdviserSystem.petMap[this.index].situtation == 1) {

                Set.ButtonBackgroud(this.btnRest, path1, path2, path2);
                this.labelBattle.text = TextsConfig.TextsConfig_Adviser.pet_battle;

            } else if (Game.PlayerAdviserSystem.petMap[this.index].situtation == 0) {
                Set.ButtonBackgroud(this.btnRest, path3, path4, path4);
                this.labelBattle.text = TextsConfig.TextsConfig_Adviser.pet_stop;
            }

            let aniSpine = TableClientAniSpineSource.Item(infoItem.spine_id[steps]);
            this.addAnimatoinPet(aniSpine.json);

            this.imgSpriteIcon.source = cachekey(PlayerAdviserSystem.PetBase(this.index).skill_Icon[1], this);
            this.imgSpriteIcon1.source = cachekey(PlayerAdviserSystem.PetBase(this.index).skill_Icon[2], this);

            let quality = infoItem.quality;
            let quality1 = infoItem.quality + 10;

            this.imgSpriteIconGrade.source = cachekey(UIConfig.UIConfig_Pet.Grade[quality1], this);
            this.imgSpritePetName.source = cachekey(infoItem.name_down_path, this);

            let level = Game.PlayerAdviserSystem.petMap[this.index].star;

            PetMainScene.GetNodeStarByPet(this.groupSceneStar, 5, 5, 1, level, 0);
            let step = 0;
            if (Game.PlayerAdviserSystem.petMap[this.index].step == CommonConfig.pet_step_max) {
                step = Game.PlayerAdviserSystem.petMap[this.index].step - 1;
            } else {
                step = Game.PlayerAdviserSystem.petMap[this.index].step;
            }
            let curStar = 0
            if (step <= CommonConfig.pet_step_max) {
                curStar = PlayerAdviserSystem.PetBase(this.index).evo_star_req[step];
            }
            let goods = PlayerAdviserSystem.PetBase(this.index).evo_consume[step]
            let count = PlayerAdviserSystem.PetBase(this.index).evo_consume_good[step][0]
            let itemSet1 = PlayerItemSystem.Set(goods[0])
            let Cur1 = PlayerItemSystem.Count(goods[0])
            let money = PlayerAdviserSystem.PetBase(this.index).evo_consume_money[step]
            let moneyDes = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY)
            this.imgSpriteRedPoint.visible = (Game.PlayerAdviserSystem.petMap[this.index].step != CommonConfig.pet_step_max && step <= CommonConfig.pet_step_max && Game.PlayerAdviserSystem.petMap[this.index].star >= curStar && Cur1 >= count && moneyDes >= money)
        }

    }

    //宠物天赋技能
    public onGroupSkill1() {
        let star = Game.PlayerAdviserSystem.petMap[this.index].star;
        let step = Game.PlayerAdviserSystem.petMap[this.index].step;

        this.despettalent.Load(this.index, star, step, 0);
        this.despettalent.visible = true;
    }

    public onGroupSkill2() {
        let star = Game.PlayerAdviserSystem.petMap[this.index].star;
        let step = Game.PlayerAdviserSystem.petMap[this.index].step;

        this.despettalent.Load(this.index, star, step, 1);
        this.despettalent.visible = true;
    }

    //隐藏宠物天赋技能
    public onGroupSkill() {
        this.despettalent.visible = false;
    }

    //返回主界面
    private onBtnReturn() {
        // this.anchorOffsetX = this.groupPetMain.width/2;
        // this.anchorOffsetY = this.groupPetMain.height;
        egret.Tween.get(this)
            .to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backIn)
            .call(() => {
                this.close();
            });
    }

    //念兽按钮
    private onBtnMonster() {
        //this.btnType = 1;
        this.groupAdviser.removeChildren();
        this.index = PlayerAdviserSystem.GetTable()[0].adviserId != undefined ? PlayerAdviserSystem.GetTable()[0].adviserId : PlayerAdviserSystem.GetTable()[0].adviser_id;
        this.itemIndex = 0;
        this.moveLocation = 0;
        this.inIt(1);
        this.dontget();
    }
    //宠物按钮
    public onBtnPet() {
        //this.btnType = 2;
        this.groupAdviser.removeChildren();
        this.index = PlayerAdviserSystem.SortPet()[0].pet_id;
        this.itemIndex = 0;
        this.moveLocation = 0;
        this.inIt(2);
        this.dontget();
    }

    //宠物信息
    private onBtnDes() {
        this.btnDes.scaleX = 1.05;
        this.btnDes.scaleY = 1.05;
        if (this.btnType == 1) {
            let des = PlayerAdviserSystem.Instance(this.index).des;
            this.petdes.Load(des);
        } else {
            let des = PlayerAdviserSystem.PetBase(this.index).des;
            this.petdes.Load(des);
        }

        this.petdes.visible = true;
    }

    //移除宠物信息/技能
    private onBtnDes1() {
        this.petdes.visible = false;
        this.despettalent.visible = false;
        this.btnDes.scaleX = 1;
        this.btnDes.scaleY = 1;
        this.btnControlShow.scaleX = 1;
        this.btnControlShow.scaleY = 1;
        this.btnControl.scaleX = 1;
        this.btnControl.scaleY = 1;
    }

    //宠物休息、跟随
    private onBtnRest() {
        PlayerAdviserSystem.PetBattle_Visit(this.index)
            .then(() => {
                this.groupAdviser.removeChildren();
                this.inIt(this.btnType);
                if (Game.PlayerAdviserSystem.petMap[this.index].situtation == 1) {
                    toast(TextsConfig.TextsConfig_Adviser.pet_battle_success);
                } else if (Game.PlayerAdviserSystem.petMap[this.index].situtation == 0) {
                    toast(TextsConfig.TextsConfig_Adviser.pet_stop_success);
                }
            })
            .catch(reason => {
                toast_warning(reason)
            });
    }

    private onBtnControl1() {
        this.btnControl.scaleX = 1.05;
        this.btnControl.scaleY = 1.05;

    }

    //宠物预览
    private onBtnControl() {
        loadUI(PetEvolutioView)
            .then((petEvolutioView: PetEvolutioView) => {
                petEvolutioView.setInfo(this.index, this);
                petEvolutioView.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnControlShow1() {
        this.btnControlShow.scaleX = 1.05;
        this.btnControlShow.scaleY = 1.05;

    }
    //宠物进化
    private onBtnControlShow() {
        if (Game.PlayerAdviserSystem.petMap[this.index].step == CommonConfig.pet_step_max) {
            toast_warning(TextsConfig.TextsConfig_Adviser.max_step);
        } else {
            loadUI(PetEvolution)
                .then((PetEvolution: PetEvolution) => {
                    PetEvolution.setInfo(this.index, this);
                    PetEvolution.show(UI.SHOW_FROM_TOP);
                });
        }

    }


    //居中对齐星星 （主界面念兽）
    public static GetNodeStarByPet(nodeMid: eui.Group, star, maxStar, scale, level, angle) {
        nodeMid.removeChildren();
        let nodeStar = [];
        let path: string;
        maxStar = maxStar = 0 ? maxStar : CommonConfig.general_max_star;
        star = (maxStar < star) ? maxStar : star;
        let gap = nodeMid.width / (maxStar - 1);
        let centerPos = new egret.Point(nodeMid.width / 4, nodeMid.height);
        let posList = Helper.GetLinePosition(centerPos.x, -centerPos.y, 55, star, angle);
        for (let i = 0; i < star; i++) {
            let flag1 = 5
            let flag2 = 6
            if (level > 0 && level < 6) {
                if (i < level) {
                    path = "ui_hunter_UpStar" + "1" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "0" + "_" + "2" + "_png";
                }
            }
            else if (level >= 6 && level < 11) {
                if (i < level - flag1) {
                    path = "ui_hunter_UpStar" + "2" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "1" + "_" + "2" + "_png";
                }
            }
            else if (level >= 11 && level < 16) {
                if (i < level - flag1 * 2) {
                    path = "ui_hunter_UpStar" + "3" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "2" + "_" + "2" + "_png";
                }
            }
            else if (level >= 16 && level < 21) {
                if (i < level - flag1 * 3) {
                    path = "ui_hunter_UpStar" + "4" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "3" + "_" + "2" + "_png";
                }
            }
            else if (level >= 21 && level < 26) {
                if (i < level - flag1 * 4) {
                    path = "ui_hunter_UpStar" + "5" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "4" + "_" + "2" + "_png";
                }
            }
            else if (level >= 26 && level < 31) {
                if (i < level - flag1 * 5) {
                    path = "ui_hunter_UpStar" + "6" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "5" + "_" + "2" + "_png";
                }
            }
            else if (level >= 31 && level <= 35) {
                if (i < level - flag1 * 6) {
                    path = "ui_hunter_UpStar" + "7" + "_" + "2" + "_png";
                } else {
                    path = "ui_hunter_UpStar" + "6" + "_" + "2" + "_png";
                }
            }
            else {
                path = "ui_hunter_UpStar" + "0" + "_" + "2" + "_png";
            }

            let img = new eui.Image();
            img.source = cachekey(path, nodeMid);
            img.x = posList[i].x;
            img.y = posList[i].y;

            img.anchorOffsetX = 0.5;
            img.anchorOffsetY = 0.5;

            nodeMid.addChild(img);
            nodeStar.push(img);
        }
        return nodeStar;

    }

    private itemList: Array<PetInfoItem> = [];

    private getItemList() {
        this.itemList = [];
        let info;
        if (this.btnType == 1) {
            info = PlayerAdviserSystem.GetTable();
        } else {
            info = PlayerAdviserSystem.SortPet();
        }

        for (let i = 0; i < info.length; i++) {
            let item = this.listAdviser.getElementAt(i) as PetInfoItem;
            this.itemList.push(item);
        }
    }

    public onEntryTopScene() {
        if (this.index == 2 && Game.PlayerAdviserSystem.petInfo != null && Game.PlayerAdviserSystem.petInfo.length != 0) {
            if (Teach.isDone(teachBattle.teachPartID_PETINTRODUCE) == false) {
                Teach.CheckAndSetTeach(teachBattle.teachPartID_PETINTRODUCE);
            }
        }
    }
}



}