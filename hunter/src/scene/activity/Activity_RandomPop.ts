namespace zj {
// 2019/04/13
// wangshenzhuo
// 抓取成功
export class Activity_RandomPop extends Dialog {

    public groupMain: eui.Group;
    public groupMain2: eui.Group;
    public buttonReturn: eui.Button;
    public buttonMore: eui.Button;
    public buttonOne: eui.Button;
    public labelMore: eui.BitmapLabel;
    public labelCore: eui.BitmapLabel;
    public groupMain3: eui.Group;
    public groupMain4: eui.Group;
    private timer: egret.Timer;
    private time: number = 0;
    private time2: number = 0;
    private time3: number = 0
    private textsss: eui.Label;

    private anminmoy: any;
    private arrayItem = [];
    private arrayItem2 = [];

    public item_list = [];
    public goods: any;
    public father: Activity_RandomBoomSence;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/Activity_RandomPopSkin.exml";
        this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonReturn, this);
        this.buttonOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOne, this);
        this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMore, this);

        //创建一个计时器对象
        this.timer = new egret.Timer(16.6, 0);
        //注册事件侦听器
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
        // this.timer.start();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this);
        }, this);
    }

    public SetInfo(goods, father: Activity_RandomBoomSence) {
        Helper.PlayEff(TableClientSoundResource.Item(30010).sound_path, 100);
        this.father = father;
        this.goods = goods;
        this.groupMain3.visible = false;
        this.groupMain4.visible = false;
        this.SetInfoEggAni();
        let scoreAdd = this.father.takeNum * this.father.curTopicInfo.get_integral;
        this.labelCore.text = scoreAdd.toString();

        this.textsss = new eui.Label;
        this.addChild(this.textsss);

    }

    private SetInfoEggAni() {
        let bones = [];
        let paths = [];

        let thisOne = this;
        for (const k in thisOne.goods) {
            const v = thisOne.goods[k];

            let item = new Activity_RandomPopItem();
            item.SetInfo(k, v, thisOne);
            thisOne.item_list.push(item);

            let bone = Helper.StringFormat("00%2d_daoju0%2d", Number(k) + 1, Number(k) + 1);
            if (Number(k) + 1 >= 10) {
                bone = Helper.StringFormat("0%2d_daoju%2d", Number(k) + 1, Number(k) + 1);
            }
            let path = item.groupMain;
            path.anchorOffsetX = path.width / 2;
            path.anchorOffsetY = path.height / 2;
            bones.push(bone);
            paths.push(path);

            let ball_bone = Helper.StringFormat("00%2d_caidan%d", Number(k) + 1, Number(k) + 1);
            if (Number(k) + 1 >= 10) {
                ball_bone = Helper.StringFormat("0%2d_caidan%d", Number(k) + 1, Number(k) + 1)
            }
            let ball_path: eui.Image = new eui.Image();
            ball_path.width = 100;
            ball_path.height = 100;
            ball_path.anchorOffsetX = ball_path.width / 2;
            ball_path.anchorOffsetY = ball_path.height / 2;

            let ani_id: string;
            if (PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                if (PlayerHunterSystem.Table(v.goodsId).aptitude >= 14) {
                    ani_id = "002_daojuguang_01";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[14], this);
                } else if (PlayerHunterSystem.Table(v.goodsId).aptitude == 13) {
                    ani_id = "004_daojuguang_03";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[13], this);
                } else {
                    ani_id = "003_daojuguang_02";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[1], this);
                }
            } else {
                if (PlayerItemSystem.ItemQuality(v.goodsId) >= 5) {
                    ani_id = "002_daojuguang_01";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[1], this);
                } else if (PlayerItemSystem.ItemQuality(v.goodsId) == 4) {
                    ani_id = "004_daojuguang_03";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[1], this);
                } else {
                    ani_id = "003_daojuguang_02";
                    ball_path.source = cachekey(UIConfig.UIConfig_Activity.random[1], this);
                }
            }

            let light_node = new eui.Group;
            light_node.anchorOffsetX = light_node.width / 2;
            light_node.anchorOffsetY = light_node.height / 2;
            Game.DragonBonesManager.playAnimation(this, "ui_wawaji02_eff", "armatureName", ani_id, 0)
                .then((display: dragonBones.EgretArmatureDisplay) => {
                    light_node.addChild(display);
                });

            let light_bone = Helper.StringFormat("00%2d_daoju_guang0%2d", Number(k) + 1, Number(k) + 1);
            if (Number(k) + 1 >= 10) {
                light_bone = Helper.StringFormat("0%2d_daoju_guang%2d", Number(k) + 1, Number(k) + 1);
            }
            bones.push(light_bone);
            paths.push(light_node);
            bones.push(ball_bone);
            paths.push(ball_path);

            if (PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                // if((PlayerHunterSystem.Table(v.goodsId).aptitude >= 13 && thisOne.goods.length == 10) || (thisOne.goods.length == 1)) {
                thisOne.arrayItem.push(k);
                // }
            }

            let generalhistoryids = Game.PlayerHunterHistorySystem.getPokedexSkill();
            for (const kk in generalhistoryids) {
                const vv: any = generalhistoryids[kk];
                if (vv.generalId == v.goodsId) {
                    thisOne.arrayItem2.push(k);
                }
            }
        }

        if (this.goods.length == 1) {

            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_wawaji02_eff", null, paths, bones)
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        armatureDisplay.animation.stop();
                        Game.PlayerInfoSystem.playAnnouce = true;
                        this.SetButtonOpen();
                    }, thisOne)
                    armatureDisplay.animation.play("000_caiqiu_00", 1);
                    armatureDisplay.x = this.groupMain.width / 2;
                    armatureDisplay.y = this.groupMain.height;
                    this.anminmoy = armatureDisplay;
                    this.groupMain.addChild(this.anminmoy);
                    this.timer.start();
                });
        } else {
            Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_wawaji02_eff", null, paths, bones)
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

                    // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                    //     armatureDisplay.animation.stop();
                    //     armatureDisplay.animation.reset();
                    //     armatureDisplay.armature.dispose();
                    //     armatureDisplay.dbClear();
                    //     armatureDisplay.dispose(true);
                    //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                    // }, null);
                    armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        armatureDisplay.animation.stop();
                        Game.PlayerInfoSystem.playAnnouce = false;
                        this.SetButtonOpen();
                    }, thisOne)
                    armatureDisplay.animation.play("001_caiqiu_01", 1);
                    armatureDisplay.x = this.groupMain2.width / 2;
                    armatureDisplay.y = this.groupMain2.height / 2;
                    this.anminmoy = armatureDisplay;
                    this.groupMain2.addChild(armatureDisplay);
                    this.timer.start();
                });
        }
    }

    private update() {
        this.time = this.time + 1;
        //console.log(this.time);

        if (this.time >= 94) {
            let time1: number = 0;
            time1++;

            if (this.time == 94 + this.arrayItem[this.time2] * 14) {
                this.animationFrame(this.anminmoy);
                this.time2++;
            }
        }
        if (this.time >= 240) {
            this.timer.stop();
            this.timer.reset()
        }
    }

    private SetButtonOpen() {
        this.groupMain3.visible = true;
        this.groupMain4.visible = true;
        let show_one = this.goods.length == 1;
        let price = null;
        this.buttonOne.visible = show_one;
        this.buttonMore.visible = !show_one;

        if (show_one) {
            price = this.father.curTopicInfo.consume_token;
        } else {
            price = this.father.curTopicInfo.consume_token_ten;
        }
        this.labelMore.text = Game.PlayerInfoSystem.BaseInfo.dollCoin.toString();
        Helper.PlayEff(TableClientSoundResource.Item(30067).sound_path, 100);
    }

    private animationFrame(anminmoy) {
        let index = this.arrayItem[this.time2];
        let isPokedex = false;
        let generalHistory = this.father.AllGeneralHistory;
        let general = Table.FindK(generalHistory, PlayerHunterSystem.Table(this.goods[index].goodsId).general_id)
        if (index != null) {
            if (PlayerItemSystem.ItemType(this.goods[index].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                if ((PlayerHunterSystem.Table(this.goods[index].goodsId).aptitude >= 13 && this.goods.length == 10) || (this.goods.length == 1)) {
                    anminmoy.animation.stop();
                    this.timer.stop();
                    loadUI(CommonGetGeneral)
                        .then((dialog: CommonGetGeneral) => {
                            dialog.setInfo(this.goods[index].goodsId, 0, () => {
                                anminmoy.animation.play();
                                this.timer.start();
                            });
                            dialog.show(UI.SHOW_FILL_OUT);

                            // if (general == -1) {
                            //     setTimeout(() => {
                            //         loadUI(TavernGetGeneralPop)
                            //             .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                            //                 taverngetgeneralpop.init(this);
                            //                 egret.Tween.get(taverngetgeneralpop.group1)
                            //                     .call(() => {
                            //                         taverngetgeneralpop.setInof(this.goods[index]);
                            //                         dialog.addChild(taverngetgeneralpop);
                            //                     })
                            //                     .to({ alpha: 1 }, 100)
                            //                     .to({ y: 10 }, 150, egret.Ease.sineInOut)
                            //                     .wait(300, false)
                            //                     .to({ y: -10 }, 150, egret.Ease.sineInOut)
                            //                     .wait(300, false)
                            //                     .call(() => { taverngetgeneralpop.onGroupParent(); })
                            //             });
                            //     }, 300)
                            // }
                        })
                } else {
                    // if (general == -1) {
                    //     egret.Tween.get(this).wait(700 * this.time2).call(() => {
                    //         setTimeout(() => {
                    //             loadUI(TavernGetGeneralPop)
                    //                 .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                    //                     taverngetgeneralpop.init(this);
                    //                     egret.Tween.get(taverngetgeneralpop.group1)
                    //                         .call(() => {
                    //                             taverngetgeneralpop.setInof(this.goods[index]);
                    //                             this.addChild(taverngetgeneralpop);
                    //                         })
                    //                         .to({ alpha: 1 }, 100)
                    //                         .to({ y: 10 }, 150, egret.Ease.sineInOut)
                    //                         .wait(300, false)
                    //                         .to({ y: -10 }, 150, egret.Ease.sineInOut)
                    //                         .wait(300, false)
                    //                         .call(() => { taverngetgeneralpop.onGroupParent(); })
                    //                 });
                    //         }, 300)
                    //     })
                    // }
                }
            }
        }
    }

    //再来一次
    private onButtonOne() {
        this.buttonOne.enabled = false;
        this.close();
        this.father.onButtonOne();
    }

    //再来10次
    private onButtonMore() {
        this.buttonMore.enabled = false;
        this.close();
        this.father.onButtonMore();
    }

    //返回
    public onButtonReturn() {
        this.buttonReturn.enabled = false;
        loadUI(CommonGetDialog)
            .then((dialog: CommonGetDialog) => {
                dialog.init(this.goods);
                dialog.show();
            });
        this.close();
    }
}
}