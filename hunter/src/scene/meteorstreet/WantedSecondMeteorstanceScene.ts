namespace zj {
    //WantedSecondMeteorstanceScene
    //hexiaowei
    // 2019/02/12
    export class WantedSecondMeteorstanceScene extends Scene {
        public imageBackGroud: eui.Image;
        public listSelectedBoss: eui.List;
        public scrollerInfo: eui.Scroller;
        public listBoss: eui.List;
        public groupTeach1: eui.Group;
        public imageBackground: eui.Image;
        public groupBackgroundAnimation1: eui.Group;
        public groupBackgroundAnimation2: eui.Group;
        public groupNPC: eui.Group;
        public groupTalk: eui.Group;
        public labelTalk: eui.Label;
        public groupNpc: eui.Group;
        public buttonPlan: eui.Button;
        public imageBossType: eui.Image;
        public imageBossTypeInfoA: eui.Image;
        public imageBossTypeInfoB: eui.Image;
        public groupRight: eui.Group;
        public groupChallengeBoss2: eui.Group;
        public buttonStrength: eui.Button;
        public labelStrength: eui.Label;
        public groupChallengeBoss1: eui.Group;
        public buttonElites: eui.Button;
        public labelStrengthNum: eui.Label;
        public groupChallengeBoss3: eui.Group;
        public imageFrameMeterials: eui.Image;
        public imageIconMeterials: eui.Image;
        public imageAddSkillMeterials: eui.Image;
        public labelNumMeterials: eui.Label;
        public buttonElitesA: eui.Button;
        public labelElitesA: eui.Label;
        public groupAnimate: eui.Group;
        public imageFrameFirstBlood: eui.Image;
        public imageIconFirstBlood: eui.Image;
        public imageGetFirstBlood: eui.Image;
        public labelFirstBlood: eui.BitmapLabel;
        public groupAward: eui.Group;
        public scrollerRewards: eui.Scroller;
        public listBossAward: eui.List;
        public lableBossName: eui.Label;
        public scrollerBossSkill: eui.Scroller;
        public listBossSkill: eui.List;
        public listSysTeam: eui.List;
        public groupRightNew: eui.Group;
        public groupFirstBlood: eui.Group;
        public groupConsume: eui.Group;
        public buttonReturn: eui.Button;
        public labelGold: eui.Label;
        public buttonAddGold: eui.Button;
        public labelGemstone: eui.Label;
        public buttonAddpower: eui.Button;


        public bossMainKeelAnimation: dragonBones.EgretArmatureDisplay;// boos动画
        public bossMainKeelAnimation1: dragonBones.EgretArmatureDisplay; // boos 普通背景
        public bossMainKeelAnimation2: dragonBones.EgretArmatureDisplay; // 领主背景
        public bossMainKeelAnimation3: dragonBones.EgretArmatureDisplay; // 领主背景2
        private cost_id = [message.EResourceType.RESOURCE_WANTED_COIN, message.EResourceType.RESOURCE_ARREST_COIN, message.EResourceType.RESOURCE_HUNT_COIN];
        private coststr = ["wanted_time", "arrest_time", "hunt_time"];
        private MAX_BOSS_NUM = message.EWantedType.WANTED_TYPE_END - 1;

        public generalKeelAnimation: dragonBones.EgretArmatureDisplay;// 龙骨动画

        private roleInfo;
        private floorInfo = [];

        private selectedBossItem: eui.ArrayCollection;
        private selectedBossIndex: number = 0;

        private listBossItem: eui.ArrayCollection;
        private listBossIndex: number = 0;

        private listBossAwardItem: eui.ArrayCollection;
        private listBossAwardIndex: number = 0;

        private chooseItem: eui.ArrayCollection;
        private chooseIndex: number = 0;

        private startItem: eui.ArrayCollection;
        private startIndex: number = 0;

        private highHandItem: eui.ArrayCollection;
        private highHandIndex: number = 0;

        private imgMask: eui.Image;
        private rectMaskCommon: eui.Image;

        private common_DesRes: Common_DesRes;

        private common_DesProp: Common_DesProp;

        private commonDesProp: CommonDesProp;
        //推荐上阵
        private commonDesGeneral: CommonDesGeneral;
        private technique_id: number = 0;


        private wantedId: number;

        private AwardmoveLocation: number = 0;
        private chooselist: Array<message.GoodsInfo> = [];
        private tableWantedInfo: TableWanted;
        private timenpc: Array<number> = [];
        private itemId: number;
        private itemCount: number;
        private bFirstReward: boolean;
        /**流星街挑战哪里显示的挑战次数 */
        public static challenge: string = null;
        public constructor() {
            super();
            this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorstanceSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

            this.listSelectedBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.buttonSelectedBossCallBack, this);

            //首杀奖励
            this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupAnimate, this);
            this.groupAnimate.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveGroup, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveGroup, this);

            //挑战消耗物品卡
            this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.ongroupMeterials, this);
            this.imageIconMeterials.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveGroup, this);

            this.buttonElites.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonElitesClicked, this);
            this.buttonElitesA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonBattleClicked, this);
            this.buttonStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonBattleClicked, this);

            this.listBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.buttonState, this);
            this.listBossAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.buttonAward, this);

            this.groupNpc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDialogue, this);
            this.buttonAddpower.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAddpower, this);
            this.buttonAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.setInfoUpdate, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfoUpdate, this);

            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
            this.buttonPlan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonPlan, this);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this.groupTalk);
                Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            }, null);

            //遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.scaleX = 0.8;
            this.imgMask.scaleY = 0.8;
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupAnimate.addChild(this.imgMask);
            this.imgMask.visible = false;

            //普通物品遮罩
            this.rectMaskCommon = Util.getMaskImgBlack(83, 84);
            this.rectMaskCommon.scaleX = 0.8;
            this.rectMaskCommon.scaleY = 0.8;
            this.rectMaskCommon.horizontalCenter = 0;
            this.rectMaskCommon.verticalCenter = -2;
            this.groupAnimate.addChild(this.rectMaskCommon);
            this.rectMaskCommon.visible = false;

            this.common_DesRes = new Common_DesRes();
            this.groupFirstBlood.addChild(this.common_DesRes);
            this.common_DesRes.visible = false;

            //挑战消耗物品卡
            this.common_DesProp = new Common_DesProp();
            this.groupConsume.addChild(this.common_DesProp);
            this.common_DesProp.visible = false;
            this.widthhight();

            this.setNewOpenState(1, false);
            Game.TeachSystem.battleEndOpenTeach = true;

        }
        public Init(index: number) {
            this.setInfoUpdate();
            this.setInfoBossList(index);
        }

        public widthhight() {
            if (this.width >= 1344) {
                this.imageBackGroud.scaleX = this.width / 1334;
            }
        }


        private ongroupAnimate() {
            let _type = PlayerItemSystem.ItemType(this.itemId);
            message.EGoodsType.GOODS_TYPE_GENERAL
            let dialog = this.groupFirstBlood.getChildByName("Item-skill-common") as CommonDesGeneral;
            if (dialog) this.groupFirstBlood.removeChild(dialog);

            if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                loadUI(Common_DesRes).then((dialog: Common_DesRes) => {

                    dialog.name = "Item-skill-common";
                    dialog.setInfo(this.itemId, this.itemCount);
                    this.groupFirstBlood.addChild(dialog);
                });
            }
            else {
                loadUI(Common_DesProp).then((dialog: Common_DesProp) => {
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(this.itemId, this.itemCount);
                    this.groupFirstBlood.addChild(dialog);
                });

            }
        }

        private onRemoveAnimate() {
            let dialog = this.groupFirstBlood.getChildByName("Item-skill-common");
            if (dialog) this.groupFirstBlood.removeChild(dialog);
        }

        private ongroupMeterials() {
            this.common_DesProp.visible = true;
        }

        private onRemoveGroup() {
            this.common_DesRes.visible = false;
            this.common_DesProp.visible = false;
            this.up();
            this.onRemoveAward();
            this.onRemoveAnimate();
        }


        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2
                    //display.y =this.height*0.25;
                    display.y = group.explicitHeight / 2;
                    display.scaleX = 0.7;
                    display.scaleY = 0.7;
                    group.addChild(display);
                    this.generalKeelAnimation = display;
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        // 推荐上阵列表显示
        public setInfo(index: number) {

            let headPath = [];
            for (const k in this.roleInfo) {
                const v = this.roleInfo[k];
                let path = TableMapRole.Item(v).head_path;
                headPath.push(path);
            }

            this.technique_id = index;
            let floor_id = index * 10000 + 1;
            let floor_info = otherdb.WantedInstance(floor_id)


            //推荐上阵

            let technique = floor_info.technique
            this.listSysTeam.selectedIndex = 0; // 默认选中
            this.listSysTeam.itemRenderer = WantedSecondMeteorlnstance;//
            this.highHandItem = new eui.ArrayCollection();

            for (let i = 0; i < technique.length; i++) {
                let data = new WantedSecondMeteorlnstanceData();
                data.father = this;
                data.index = technique[i];
                data.id = i;
                this.highHandItem.addItem(data);
            }

            this.listSysTeam.dataProvider = this.highHandItem;
            this.highHandIndex = this.listSysTeam.selectedIndex;

        }

        //推荐上阵 信息显示
        public onItemTap(isTouchBegin: boolean, data: WantedSecondMeteorlnstanceData) {

            let dialog = this.groupRightNew.getChildByName("hunter-skill-commondesgeneral") as CommonDesGeneral;
            if (dialog) this.groupRightNew.removeChild(dialog);

            if (isTouchBegin) {
                loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                    if (data.id == 0) {
                        dialog.x = -125;
                        dialog.y = -82;
                    } else if (data.id == 1) {
                        dialog.x = -55;
                        dialog.y = -82;
                    } else if (data.id == 2) {
                        dialog.x = 25;
                        dialog.y = -83;
                    } else if (data.id == 3) {
                        dialog.x = 100;
                        dialog.y = -83;
                    }
                    dialog.name = "hunter-skill-commondesgeneral";
                    let floor_id = this.technique_id * 10000 + 1;
                    let floor_info = otherdb.WantedInstance(floor_id);
                    let technique = floor_info.technique;
                    dialog.setInfo(technique[data.id], 1);
                    this.groupRightNew.addChild(dialog);
                });
            }
        }


        /**抬起移除 推荐上阵 详情 */
        private up() {
            let dialog = this.groupRightNew.getChildByName("hunter-skill-commondesgeneral") as CommonDesGeneral;
            if (dialog) this.groupRightNew.removeChild(dialog);
        }

        // 鼠标点击 提示通关材料的说明
        public onChooseItemTap(isTouchBegin: boolean, data: WantedSecondChooseItemData) {
            let _type = PlayerItemSystem.ItemType(data.tableWanted.goodsId);
            message.EGoodsType.GOODS_TYPE_GENERAL
            let dialog = this.groupAward.getChildByName("Item-skill-common") as CommonDesGeneral;
            if (dialog) this.groupAward.removeChild(dialog);
            let listnum: number = this.scrollerRewards.viewport.scrollH; //列表滑动位置
            let distance: number = 0;
            if (this.chooselist.length < 3) {
                if (this.chooselist.length == 1) {
                    distance = listnum - 84 * data.index - 105;
                } else {
                    distance = listnum - 84 * data.index - 60;
                }
            } else {
                distance = listnum - 84 * data.index;
            }
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                        dialog.x = -154 - distance;
                        dialog.y = -243;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        this.groupAward.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                        dialog.x = -154 - distance;
                        dialog.y = -248;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        this.groupAward.addChild(dialog);
                    });
                }
                else {
                    loadUI(Common_DesProp).then((dialog: Common_DesProp) => {
                        dialog.x = -154 - distance;
                        dialog.y = -248;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.tableWanted.goodsId, data.tableWanted.count);
                        this.groupAward.addChild(dialog);
                    });

                }
            }
        }

        //鼠标抬起，移除通关奖励材料说明
        private onRemoveAward() {
            let dialog = this.groupAward.getChildByName("Item-skill-common");
            if (dialog) this.groupAward.removeChild(dialog);
        }

        //长按 技能 详情
        private showGoodsProperty(ev: egret.Event) {
            let show = TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "Talenttouch";
            this.addChild(show);
        }

        // 长按 技能 抬起
        private removeShow() {
            let show = this.getChildByName("Talenttouch");
            if (show) {
                this.removeChild(show);
            }
        }

        // 钻石、体力的数量
        private setInfoUpdate() {
            let str = "";
            if (Game.PlayerInfoSystem.Power > 100000) {
                if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                } else {
                    str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            } else {
                str += Game.PlayerInfoSystem.Power.toString();
            }
            let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
            this.labelGemstone.text = str_energy;
            this.labelGemstone.size = 20;
            // if (this.labelGemstone.text.length > 7) {
            //     this.labelGemstone.size = 14;
            // } else {
            //     this.labelGemstone.size = 16;
            // }
            //钻石数量
            if (Game.PlayerInfoSystem.Token > 100000) {
                this.labelGold.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            } else {
                this.labelGold.text = Game.PlayerInfoSystem.Token.toString();
            }
            // this.labelGold.text = str_token;
            //体力数量
            this.labelGemstone.text = str_energy;

        }

        //boss
        private setInfoBossList(index: number) {

            //list 加载
            this.listSelectedBoss.selectedIndex = index - 1; // 默认选中
            this.listSelectedBoss.itemRenderer = WantedSecondMeteorlnstanceBossItem;//
            this.selectedBossItem = new eui.ArrayCollection();

            for (let i = 1; i <= this.MAX_BOSS_NUM; i++) {
                let data = new WantedSecondMeteorlnstanceBossItemData();
                data.index = i;
                data.father = this;
                data.tableWanted = PlayerWantedSystem.Instance(1 + i * 10000);
                this.selectedBossItem.addItem(data);
            }

            this.listSelectedBoss.dataProvider = this.selectedBossItem;
            this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
            Game.PlayerMissionSystem.fightExt = this.selectedBossIndex;
            Game.PlayerWantedSystem.wantedBossDifficulty = this.selectedBossIndex;
            this.listSelectedBoss.addEventListener(eui.ItemTapEvent.ITEM_TAP, () => {
                // this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
            }, this);
            this.ReqWanted_Visit(index);

            //this.setInfoTime(0);
        }

        //boss点击
        private buttonSelectedBossCallBack(e: eui.ItemTapEvent) {
            let limit_level = PlayerWantedSystem.GetLimitLevel(this.listSelectedBoss.selectedIndex + 1);
            let bOpen = false;
            if (limit_level <= CommonConfig.role_max_level) {
                bOpen = Game.PlayerInfoSystem.BaseInfo.level >= limit_level;
                if (bOpen) {
                    let iconbool: boolean = Tips.GetSaveBoolForWantedNewOpen(this.listSelectedBoss.selectedIndex + 1, true);
                    if (!false) {
                        this.setNewOpenState(this.listSelectedBoss.selectedIndex + 1, false);
                    }
                    if (this.selectedBossIndex != this.listSelectedBoss.selectedIndex) {
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.selectedBossIndex]);
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.listSelectedBoss.selectedIndex]);
                        this.selectedBossIndex = this.listSelectedBoss.selectedIndex;
                        Game.PlayerWantedSystem.wantedBossDifficulty = this.selectedBossIndex;
                        Game.PlayerMissionSystem.fightExt = this.selectedBossIndex;

                        this.ReqWanted_Visit(this.listSelectedBoss.selectedIndex + 1);
                        if (this.bossMainKeelAnimation.parent) this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                        if (this.generalKeelAnimation.parent) this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                    }
                } else {
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel, limit_level, TextsConfig.TextsConfig_Comment.wanted_type[this.listSelectedBoss.selectedIndex + 1]));
                    return;
                }
            } else {
                bOpen = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, limit_level) != -1;
                if (bOpen) {
                    let iconbool: boolean = Tips.GetSaveBoolForWantedNewOpen(this.listSelectedBoss.selectedIndex + 1, true);
                    if (!false) {
                        this.setNewOpenState(this.listSelectedBoss.selectedIndex + 1, false);
                    }
                    if (this.selectedBossIndex != this.listSelectedBoss.selectedIndex) {
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.selectedBossIndex]);
                        this.selectedBossItem.itemUpdated(this.selectedBossItem.source[this.listSelectedBoss.selectedIndex]);
                        this.selectedBossIndex = this.listSelectedBoss.selectedIndex;

                        this.ReqWanted_Visit(this.listSelectedBoss.selectedIndex + 1);

                        if (this.bossMainKeelAnimation.parent) this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                        if (this.generalKeelAnimation.parent) this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                    }

                } else {
                    let boosname = TextsConfig.TextsConfig_Comment.wanted_type[Math.floor(limit_level / 10000)];
                    let part = limit_level % 100;
                    toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Wanted.openLevel3, part, boosname));
                    return;
                }
            }
        }

        //boss难度选择
        private setInfoList(args) {

            this.floorInfo = otherdb.WantedTypeInfo(args);
            //list 加载
            let typeIndex = (Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100) - 1;
            if (typeIndex <= 0) {
                typeIndex = 0;
            }
            this.listBoss.selectedIndex = typeIndex; // 默认选中
            this.listBoss.itemRenderer = WantedSecondMeteorlnstanceItem;//
            this.listBossItem = new eui.ArrayCollection();

            for (let i = 0; i < this.floorInfo.length; i++) {
                let data = new WantedSecondMeteorlnstanceItemData();
                data.indexId = this.selectedBossIndex + 1;
                data.tableWanted = this.floorInfo[i];
                this.listBossItem.addItem(data);
            }

            this.listBoss.dataProvider = this.listBossItem;
            this.listBossIndex = this.listBoss.selectedIndex;

            this.scrollerInfo.viewport = this.listBoss;
            this.scrollerInfo.validateNow();

            //this.onGroupDialogue();
            this.setFloorInfo(this.listBoss.selectedIndex);

            Game.PlayerWantedSystem.wantedCurPos = this.floorInfo[this.listBossIndex].wanted_id;
            let index = (this.listBossIndex - 3) * 60;
            if (index > 0) {
                if ((this.listBossIndex + 1) == this.floorInfo.length) {
                    this.scrollerInfo.viewport.scrollV = index - 60;
                } else {
                    this.scrollerInfo.viewport.scrollV = index;
                }

            } else {
                this.scrollerInfo.viewport.scrollV = 0;
            }

            this.setInfoTime(this.listBoss.selectedIndex);

        }

        //boss难度选中
        private buttonState(e: eui.ItemTapEvent) {
            if (this.listBossIndex != this.listBoss.selectedIndex) {
                this.listBossItem.itemUpdated(this.listBossItem.source[this.listBossIndex]);
                this.listBossItem.itemUpdated(this.listBossItem.source[this.listBoss.selectedIndex]);
                this.listBossIndex = this.listBoss.selectedIndex;

                Game.PlayerWantedSystem.wantedCurPos = this.floorInfo[this.listBossIndex].wanted_id;

                if (this.bossMainKeelAnimation.parent) this.bossMainKeelAnimation.parent.removeChild(this.bossMainKeelAnimation);
                if (this.generalKeelAnimation.parent) this.generalKeelAnimation.parent.removeChild(this.generalKeelAnimation);
                this.setFloorInfo(this.listBoss.selectedIndex);

                this.setInfoTime(this.listBossIndex);
            }

        }

        //显示  通关奖励 boss技能 等
        private setFloorInfo(indexId: number) {

            let maprole = TableMapRole.Item(this.roleInfo[indexId]);

            let animationUrl = TableClientFightAniSpineSource.Item(maprole.body_spx_id).json;

            Game.DragonBonesManager.playAnimation(this, animationUrl, null, "0001_daiji", 0)
                .then(display => {
                    display.x = this.groupNPC.width * 0.4;
                    display.y = this.groupNPC.height;
                    display.scaleX = maprole.body_scale < 0.5 ? 0.53 : maprole.body_scale;
                    display.scaleY = maprole.body_scale < 0.5 ? 0.53 : maprole.body_scale;
                    this.groupNPC.removeChildren();
                    this.groupNPC.addChild(display);
                    this.bossMainKeelAnimation = display;

                })
                .catch(reason => {
                    toast(reason);
                });

            let floor_id = (this.selectedBossIndex + 1) * 10000 + 1 + indexId;
            this.wantedId = floor_id;
            let floor_info = otherdb.WantedInstance(floor_id);
            this.tableWantedInfo = floor_info;
            let bSpecial = floor_info.bSpecial;
            this.onGroupDialogue();
            let boradPath = bSpecial == 0 ? UIConfig.UIConfig_Wanted.newBoard[1] : UIConfig.UIConfig_Wanted.newBoard[2]
            // this.imageBackground.source = cachekey(boradPath, this);
            if (bSpecial != 0) {
                if (bSpecial == 2) {
                    if (this.bossMainKeelAnimation1 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation3);
                        this.bossMainKeelAnimation1 = undefined;
                    } else if (this.bossMainKeelAnimation3 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                        this.bossMainKeelAnimation3 = undefined;
                    }
                    Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "016_guanghuan6_1", 0)
                        .then(display => {
                            display.x = this.groupBackgroundAnimation2.width * 0.4;
                            display.y = this.groupBackgroundAnimation2.height;
                            this.groupBackgroundAnimation2.addChild(display);
                            this.bossMainKeelAnimation2 = display;
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                    Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "017_guanghuan6_2", 0)
                        .then(display => {
                            display.x = this.groupBackgroundAnimation1.width * 0.7;
                            display.y = this.groupBackgroundAnimation1.height;
                            this.groupBackgroundAnimation1.addChild(display);
                            this.bossMainKeelAnimation3 = display;
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                }
                else if (bSpecial == 1) {
                    let m = this.bossMainKeelAnimation3;
                    if (this.bossMainKeelAnimation3 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                        this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                        this.bossMainKeelAnimation3 = undefined;
                    } else if (this.bossMainKeelAnimation1 != undefined) {
                        this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                        this.bossMainKeelAnimation1 = undefined
                    }
                    Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "013_guanghuan5_1", 0)
                        .then(display => {
                            display.x = this.groupBackgroundAnimation2.width * 0.4;
                            display.y = this.groupBackgroundAnimation2.height;
                            this.groupBackgroundAnimation2.removeChildren();
                            this.groupBackgroundAnimation2.addChild(display);
                            this.bossMainKeelAnimation2 = display;
                        })
                        .catch(reason => {
                            toast(reason);
                        });

                    Game.DragonBonesManager.playAnimation(this, "guanghuan_eff_2", null, "014_guanghuan5_2", 0)
                        .then(display => {
                            display.x = this.groupBackgroundAnimation1.width * 0.7;
                            display.y = this.groupBackgroundAnimation1.height;
                            this.groupBackgroundAnimation1.removeChildren();
                            this.groupBackgroundAnimation1.addChild(display);
                            this.bossMainKeelAnimation3 = display;
                        })
                        .catch(reason => {
                            toast(reason);
                        });
                }


            } else {
                if (this.bossMainKeelAnimation1 != undefined) {
                    this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation1);
                    this.bossMainKeelAnimation1 = undefined;
                } else if (this.bossMainKeelAnimation3 != undefined) {
                    this.groupBackgroundAnimation1.removeChild(this.bossMainKeelAnimation3);
                    this.groupBackgroundAnimation2.removeChild(this.bossMainKeelAnimation2);
                    this.bossMainKeelAnimation3 = undefined;
                }
            }

            this.imageBossType.source = cachekey(UIConfig.UIConfig_Hunter.type2[floor_info.boss_type_client - 1], this);
            this.imageBossTypeInfoA.source = cachekey(floor_info.boss_feature_client[0], this);
            this.imageBossTypeInfoB.source = cachekey(floor_info.boss_feature_client[1], this);

            let itemSet = PlayerItemSystem.Set(floor_info.first_reward[0][0], 1, floor_info.first_reward[0][1]);
            this.imageFrameFirstBlood.source = cachekey(itemSet.Frame, this);
            this.imageIconFirstBlood.source = cachekey(itemSet.Clip, this);
            if (this.isRectMask(floor_info.first_reward[0][0])) {
                this.imgMask.visible = true;
                this.imageIconFirstBlood.mask = this.imgMask;
            } else {
                this.imgMask.visible = false;
                this.imageIconFirstBlood.mask = this.rectMaskCommon;
            }

            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupAnimate);

            this.labelFirstBlood.text = ("x" + Set.NumberUnit2(floor_info.first_reward[0][1]));

            this.itemId = floor_info.first_reward[0][0];
            this.itemCount = floor_info.first_reward[0][1];

            //boss技能
            let feature = floor_info.feature;
            this.listBossSkill.selectedIndex = 0; // 默认选中
            this.listBossSkill.itemRenderer = WantedSecondStartItem;//
            this.startItem = new eui.ArrayCollection();
            for (let i = 0; i < feature.length; i++) {
                let boosTalent = new WantedSecondStartItemData();
                boosTalent.father = this;
                boosTalent.index = i;
                boosTalent.talent = feature[i];
                this.startItem.addItem(boosTalent);
            }

            this.listBossSkill.dataProvider = this.startItem;
            this.startIndex = this.listBossSkill.selectedIndex;
            if (feature.length <= 6) {
                this.scrollerBossSkill.scrollPolicyH = "off";
                if (feature.length == 4) {
                    this.scrollerBossSkill.left = 50;
                } else if (feature.length == 5) {
                    this.scrollerBossSkill.left = 25;
                } else if (feature.length == 6) {
                    this.scrollerBossSkill.left = 0;
                }
            } else {
                this.scrollerBossSkill.scrollPolicyH = "on";
                this.scrollerBossSkill.left = 0;
            }

            //通关奖励 list 加载
            let infoList = PlayerWantedSystem.GetClientDrop(floor_id);
            this.chooselist = infoList;
            this.listBossAward.selectedIndex = 0; // 默认选中
            this.listBossAward.itemRenderer = WantedSecondChooseItem;//
            this.chooseItem = new eui.ArrayCollection();

            for (let i = 0; i < infoList.length; i++) {
                let data = new WantedSecondChooseItemData();
                data.index = i;
                data.father = this;
                data.tableWanted = infoList[i];
                this.chooseItem.addItem(data);
            }

            this.listBossAward.dataProvider = this.chooseItem;
            this.chooseIndex = this.listBossAward.selectedIndex;

            this.scrollerRewards.viewport = this.listBossAward;
            this.scrollerRewards.validateNow();
            this.scrollerRewards.viewport.scrollH = this.AwardmoveLocation;

            if (infoList.length <= 3) {
                this.scrollerRewards.scrollPolicyH = "off";
                if (infoList.length == 2) {
                    this.scrollerRewards.left = 60;
                } else if (infoList.length == 1) {
                    this.scrollerRewards.left = 100;
                }
                else {
                    this.scrollerRewards.left = 0;
                }

            } else {
                this.scrollerRewards.scrollPolicyH = "on";
                this.scrollerRewards.left = 0;
            }

            this.bFirstReward = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_id) == -1;
            this.imageGetFirstBlood.visible = !this.bFirstReward;


            let consumeStr = "";
            if (this.bFirstReward) {
                consumeStr = TextsConfig.TextsConfig_Common.firstFree;
            } else {
                consumeStr = floor_info.battle_consume.toString();
            }
            this.labelStrength.text = consumeStr;
            this.labelElitesA.text = consumeStr;
        }

        private onButtonElitesClicked() {
            //判断此时
            let floor_id = (Game.PlayerMissionSystem.fightExt + 1) * 10000 + (this.listBoss.selectedIndex + 1);
            let floor_info = TableWanted.Item(floor_id);
            let lastTime = Game.PlayerItemSystem.itemCount(Number(floor_info.consume_type));
            // if(!this.bFirstReward && lastTime <= 0) {
            //     this.BuyEliteTime(Number(floor_info.consume_type));
            // }else{
            this.onButtonBattleClicked();
            // }
        }

        private BuyEliteTime(consumeType) {
            let a = PlayerItemSystem.Item(consumeType);
            let buyTime = 0;
            let buyInfo = Table.FindR(Game.PlayerWantedSystem.wantedInfo.wantedTicketTime, function (k, v) {
                return v.key == consumeType;
            })
            if (buyInfo[0] != null || buyInfo[1] != null) {
                buyTime = buyInfo[0].value;
            }
            if (buyTime < CommonConfig.wanted_ticket_daily_buy_time) {
                let cost = CommonConfig.wanted_buy_ticket_token(buyTime);
                let consumeName = PlayerItemSystem.Item(consumeType)["name"]
                let lastTime = CommonConfig.wanted_ticket_daily_buy_time - buyTime;
                let allTime = CommonConfig.wanted_ticket_daily_buy_time;
                let everyAddNum = CommonConfig.wanted_ticket_add_count;
                let numMsg = Helper.StringFormat(TextsConfig.TextsConfig_Wanted.buyEliteTimes, cost, everyAddNum, consumeName, lastTime, allTime);
                TipManager.ShowConfirmCancel(numMsg, () => { this.BuyEliteTimeReq(consumeType) })
            } else {
                toast_warning(TextsConfig.TextsConfig_Wanted.buyEliteTimesMax);
            }
        }

        public BuyEliteTimeReq(consumeType) {
            Game.PlayerWantedSystem.WantedBuyTicketReq_Visit(consumeType).then((data: message.WantedBuyTicketResponse) => {
                if (data.header.result == 0) {
                    //购买成功
                    this.setInfoTime(this.listBoss.selectedIndex);
                    toast_success(TextsConfig.TextsConfig_Wanted.buyChallengeNumSuccessTip);
                } else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init(false);
                        });
                }
            }).catch(reason => { toast(reason) });
        }



        //点击通关奖励信息
        private buttonAward(e: eui.ItemTapEvent) {
            let a = this.listBossAward.selectedIndex;
            if (this.chooseIndex != this.listBossAward.selectedIndex) {
                this.chooseItem.itemUpdated(this.chooseItem.source[this.chooseIndex]);
                this.chooseItem.itemUpdated(this.chooseItem.source[this.listBossAward.selectedIndex]);
                this.chooseIndex = this.listBossAward.selectedIndex;

            }
        }

        //根据奖励类型判断是否添加遮罩
        private isRectMask(goodsId: number): boolean {

            let m = PlayerItemSystem.ItemType(goodsId);
            if (goodsId == 33053 || goodsId == 33055 || goodsId == 33057) {
                return true;
            }

            return false;
        }

        // 挑战按钮的显示方式
        private setInfoTime(index: number) {
            let cost = [
                Game.PlayerInfoSystem.BaseInfo.wantedCoin,
                Game.PlayerInfoSystem.BaseInfo.arrestCoin,
                Game.PlayerInfoSystem.BaseInfo.huntCoin
            ];

            let coststr = [
                "wanted_time",
                "arrest_time",
                "hunt_time"
            ];

            let floor_id = (this.selectedBossIndex + 1) * 10000 + 1 + index;
            let floor_info = otherdb.WantedInstance(floor_id);
            let bFirstReward = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, floor_id) == -1;
            let bButtontype: boolean;

            if (this.listBossIndex > ((Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100) - 1)) {
                bButtontype = true;
            } else if (this.listBossIndex < Game.PlayerWantedSystem.wantedInfo.typeLevel[this.selectedBossIndex].value % 100 && bFirstReward) {
                bButtontype = false;
            } else {
                bButtontype = false;
            }

            if (this.selectedBossIndex + 1 == message.EWantedType.WANTED_TYPE_EASY || this.selectedBossIndex + 1 == message.EWantedType.WANTED_TYPE_HARD) {
                this.groupChallengeBoss2.visible = false;
                this.groupChallengeBoss3.visible = false;
                this.groupChallengeBoss1.visible = true;
                let str = null;
                if (bFirstReward) {
                    str = TextsConfig.TextsConfig_Common.firstFreeCom;
                } else {
                    if (cost[this.selectedBossIndex] > 0) {
                        str = "<color>r=60,g=255,b=0</color><text>" + cost[this.selectedBossIndex] + "</text>" + "<text>/" + PlayerVIPSystem.Level()[coststr[this.selectedBossIndex]] + "</text>"
                    } else {
                        str = "<color>r=255,g=38,b=0</color><text>" + cost[this.selectedBossIndex] + "</text>" + "<text>/" + PlayerVIPSystem.Level()[coststr[this.selectedBossIndex]] + "</text>"
                    }
                }
                Game.PlayerWantedSystem.ChallengeNumber = cost[this.selectedBossIndex];
                this.labelStrengthNum.textFlow = Util.RichText(str);
                WantedSecondMeteorstanceScene.challenge = this.labelStrengthNum.textFlow[0].text;
                if (bButtontype) {
                    this.buttonElites.enabled = false;
                } else {
                    this.buttonElites.enabled = true;
                }
            } else if (floor_info.consume_type != null && floor_info.consume_type != "") {
                this.groupChallengeBoss2.visible = false;
                this.groupChallengeBoss3.visible = true;
                this.groupChallengeBoss1.visible = false;
                this.setSpecialConsumeInfo(floor_info);
                if (bButtontype) {
                    this.buttonElitesA.enabled = false;
                } else {
                    this.buttonElitesA.enabled = true;
                }
            } else {
                this.groupChallengeBoss2.visible = true;
                this.groupChallengeBoss3.visible = false;
                this.groupChallengeBoss1.visible = false;
                this.labelStrengthNum.text = TextsConfig.TextsConfig_Common.noLimit;
                WantedSecondMeteorstanceScene.challenge = this.labelStrengthNum.text;
                if (bButtontype) {
                    this.buttonStrength.enabled = false;
                } else {
                    this.buttonStrength.enabled = true;
                }
            }

        }

        //挑战boss (统治者) 消耗的材料 
        private setSpecialConsumeInfo(floor_info: TableWanted) {
            let itemSet = PlayerItemSystem.Set(Number(floor_info.consume_type));
            this.common_DesProp.setInfo(floor_info.consume_type, null);
            this.imageFrameMeterials.source = cachekey(itemSet.Frame, this);
            this.imageIconMeterials.source = cachekey(itemSet.Clip, this);
            let haveCount: number = 0;
            if (Game.PlayerItemSystem.mapGoodsInfo[floor_info.consume_type] != null) {
                haveCount = Game.PlayerItemSystem.mapGoodsInfo[floor_info.consume_type].count;
            }
            let str = "";
            if (haveCount > 0 || this.buttonElitesA.enabled) {
                if (haveCount > 0) {
                    str = "<color>r=60,g=255,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                }
                else {
                    str = "<color>r=255,g=38,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                }
                this.imageAddSkillMeterials.visible = false;

            }
            else {
                str = "<color>r=255,g=38,b=0</color><text>" + haveCount + "</text>" + "<text>/" + 1 + "</text>";
                this.imageAddSkillMeterials.visible = true;

            }
            this.labelNumMeterials.textFlow = Util.RichText(str);
        }



        // 场景添加到舞台时自动调用
        // 此时可以打开定时器、播放音乐等操作
        protected onAddedToStage() {
        }

        // 场景从舞台移除时自动调用
        // 此时可以关闭定时器、暂停音乐等操作
        protected onRemoveFromStage() {
        }

        // 场景从UI栈里弹出时回调
        // 此时可以回收资源，移除事件监听等操作
        public onRemoveFromStack() {
        }
        //挑战Boss
        private onButtonBattleClicked() {
            let floor_id = (Game.PlayerMissionSystem.fightExt + 1) * 10000 + (this.listBoss.selectedIndex + 1);
            let floor_info = TableWanted.Item(floor_id);
            if (!this.bFirstReward && Game.PlayerInfoSystem.BaseInfo.power < floor_info.battle_consume) {
                loadUI(HXH_HunterUserStrength)
                    .then((dialog: HXH_HunterUserStrength) => {
                        dialog.SetInfo();
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_WANTED;
                PlayerWantedSystem.ReqGetMobsInfo(this.wantedId)
                    .then((data: any) => {
                        loadUI(CommonFormatePveMain)
                            .then((dialog: CommonFormatePveMain) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.setInfo(this.wantedId);
                            });
                    })
                    .catch(reason => { toast_warning(reason) });
            }


        }

        private ReqWanted_Visit(diff) {
            PlayerWantedSystem.reqMobRoles(diff)
                .then((data: any) => {
                    this.roleInfo = data.body.mapRoles;
                    this.setInfo(diff);
                    this.setInfoList(diff);
                })
                .catch(reason => { toast_warning(reason) });
        }


        private typerEffect(obj, content: string = "", interval: number = 200, backFun: Function = null): void {
            var strArr: Array<any> = content.split("");
            var len: number = strArr.length;
            obj.text = "";
            this.timenpc = [];
            for (let i = 0; i < len; i++) {

                let timenum = egret.setTimeout(function () {
                    obj.appendText(strArr[Number(this)]);
                }, i, interval * i);

                this.timenpc.push(timenum);
            }

        }

        //NPC对话框
        public onGroupDialogue() {
            //toast("对话框");
            this.groupTalk.visible = false;
            this.labelTalk.visible = false;
            egret.Tween.removeTweens(this.groupTalk);
            if (this.timenpc.length > 0) {
                for (let i = 0; i < this.timenpc.length; i++) {
                    egret.clearTimeout(this.timenpc[i]);
                }
            }
            // let m = this.tableWantedInfo;
            // var index =  Math.floor((Math.random() * this.floorInfo.length));
            let str_talk = this.tableWantedInfo.dialog_tip;
            if (str_talk == "") {
                return "";
            }

            //let str_talk = this.floorInfo[1].dialog_tip;

            egret.Tween.get(this.groupTalk)
                .wait(100, false)
                .call(() => {
                    this.groupTalk.visible = true;
                    this.labelTalk.visible = true;
                    this.typerEffect(this.labelTalk, str_talk, 50);
                })
                .to({ y: 90 }, 1000, egret.Ease.quartIn)
                .to({ y: 85 }, 1000, egret.Ease.quartIn)
                .to({ y: 95 }, 1000, egret.Ease.quartIn)
                .to({ y: 90 }, 1000, egret.Ease.quartIn)
                .call(() => { this.groupTalk.visible = false; });

        }

        //设置红点新
        private setNewOpenState(index, str) {
            Tips.SetSaveBoolForWantedNewOpen(index, str)
        }

        //添加体力
        private onButtonAddpower() {
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        //添加钻石
        private onBtnAddGemstone() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        private onButtonPlan() {
            toast_warning("攻略暂未开启！")
        }


        private onButtonClose() {
            this.close(UI.HIDE_TO_TOP);
        }


        private itemList: Array<WantedSecondMeteorlnstanceBossItem> = [];
        private getItemList() {
            for (let i = 0; i < this.MAX_BOSS_NUM; i++) {
                let item = this.listSelectedBoss.getElementAt(i) as WantedSecondMeteorlnstanceBossItem;
                this.itemList.push(item);
            }
        }
    }
}