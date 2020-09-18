namespace zj {
    //HXH_FirstChargeMainNew
    //wangshenzhuo
    // 2019/03/29
    export class HXH_FirstChargeMainNew extends Scene {

        private imageTitle: eui.Image;
        private imageTitleTip: eui.Image;
        private groupAdd: eui.Group;
        private buttonClose: eui.Button;
        private listScrollView: eui.List;
        private listTableViewPay: eui.List;
        private labelTips: eui.Label;
        private buttonReward: eui.Button;
        private buttonGo1: eui.Button;
        private buttonGo2: eui.Button;
        private buttonGo3: eui.Button;
        private imageTips: eui.Image;
        private labelTime: eui.Label;
        private groupTime: eui.Group;
        private groupListItem: eui.Group;
        private imageBackGroud: eui.Image;

        private TableViewPayItem: eui.ArrayCollection;
        private TableViewPayIndex: number = 0;

        private ScrollViewItem: eui.ArrayCollection;
        private ScrollViewIndex: number = 0;

        private FIRST_FIVE: number;
        private buttonGo = [];
        private index: number;
        public first_data: any;
        private firstTime;

        public constructor() {
            super();
            this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainNewSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.buttonGo1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGo1, this);
            this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
            this.buttonReward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonReward, this);
            this.listTableViewPay.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistTableView, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
            if (this.width >= 1344) {
                this.imageBackGroud.scaleX = this.width / 1334;
            }
            this.init();
        }

        public init() {
            let num: any = TableFirstCharge.Table();
            this.FIRST_FIVE = Object.keys(num).length;

            this.buttonGo = [
                this.buttonGo1,
                this.buttonGo2,
                this.buttonGo3
            ];
            this.index = 0;
            this.first_data = Game.PlayerGiftSystem.firstCharge();
            this.SetInfo();

            this.listTableViewPay.selectedIndex = this.index; // 默认选中
            this.listTableViewPay.itemRenderer = HXH_FirstChargeMainPayItemNew;//
            this.TableViewPayItem = new eui.ArrayCollection();
            for (let i = 0; i < this.first_data.length; i++) {
                let data = new HXH_FirstChargeMainPayItemNewData();
                data.father = this;
                data.index = i;
                data.info = this.first_data[i];
                this.TableViewPayItem.addItem(data);
            }

            this.listTableViewPay.dataProvider = this.TableViewPayItem;
            this.TableViewPayIndex = this.listTableViewPay.selectedIndex;

            this.addAnimatoin("shouchong_eff", "000_lei", 0, this.groupAdd);
        }

        public onlistTableView() {
            if (this.TableViewPayIndex != this.listTableViewPay.selectedIndex) {
                this.TableViewPayItem.itemUpdated(this.TableViewPayItem.source[this.TableViewPayIndex]);
                this.TableViewPayItem.itemUpdated(this.TableViewPayItem.source[this.listTableViewPay.selectedIndex]);
                this.TableViewPayIndex = this.listTableViewPay.selectedIndex;
            }
            this.SetSelectIndex(this.TableViewPayIndex);
        }

        private SetSelectIndex(index) {
            this.index = index;
            this.SetCost()
            this.SetSelectReward()
            this.SetInfoReward()
            this.SetTime()
        }

        private SetInfo() {
            this.SetCost();
            this.SetInfoIndex();
            this.SetSelectReward();
            this.SetInfoReward();
            this.SetTime();
        }

        private SetTime() {
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            let show = false;
            this.SetFirstTimmer();
            if (Device.isDebug) {
                show = info.leftTime <= 3600 * 24 * 5 && info.leftTime > 0;
            } else {
                show = info.leftTime <= 3600 * 24 && info.leftTime > 0;
            }
            this.groupTime.visible = (info.leftTime > 0 && show);
            if (info.leftTime > 0 && this.firstTime == null) {
                this.SetFirstTimmer();
            }
        }

        private SetInfoReward() {
            let info = this.first_data[this.index];
            let title = UIConfig.UIConfig_Activity.title[this.index];
            let token = (info.token - Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10;
            let bFull = Game.PlayerInfoSystem.BaseInfo.chargeToken >= info.token;
            let bGoCharge = Game.PlayerInfoSystem.BaseInfo.chargeToken < info.token;
            let a: any = this.index + 1;
            let bAward = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, function (k, v) {
                return v == a;
            })
            let str_tips = "";
            if (bFull && bAward) {
                str_tips = TextsConfig.TextsConfig_Activity.rewarded;
            } else if (bFull && !bAward) {
                str_tips = TextsConfig.TextsConfig_Activity.reward;
            } else if (!bFull) {
                str_tips = Helper.StringFormat(TextsConfig.TextsConfig_Activity.charge, token);
            }

            this.labelTips.text = str_tips;
            this.SetButtonGO(!bFull);
            this.buttonReward.visible = bFull;
            this.buttonReward.enabled = (bFull && !bAward);
            this.imageTitle.source = cachekey(info.icon_path_title, this);
            this.imageTitleTip.source = cachekey(info.icon_path_topic, this);
            this.imageTips.visible = false;
        }

        private SetButtonGO(visible) {
            for (const k in this.buttonGo) {
                const v = this.buttonGo[k];
                v.visible = false;
            }
            this.buttonGo1.visible = visible;
        }

        private SetSelectReward() {
            this.listScrollView.selectedIndex = -1; // 默认选中
            this.listScrollView.itemRenderer = HXH_FirstChargeMainItemNew;//
            this.ScrollViewItem = new eui.ArrayCollection();
            for (let i = 0; i < this.first_data[this.index].reward_goods.length; i++) {
                let data = new HXH_FirstChargeMainItemNewData();
                data.father = this;
                data.index = i;
                data.info = this.first_data[this.index];
                data.itemindex = this.index;
                this.ScrollViewItem.addItem(data);
            }

            this.listScrollView.dataProvider = this.ScrollViewItem;
            this.ScrollViewIndex = this.listScrollView.selectedIndex;
        }



        private SetInfoIndex() {
            let index = 1;
            let bFind = false;

            for (let i = 0; i < this.first_data.length; i++) {
                //充值阶梯未满
                let b = Game.PlayerInfoSystem.BaseInfo.chargeToken;
                let c = this.first_data[i].token;
                if (Game.PlayerInfoSystem.BaseInfo.chargeToken < this.first_data[i].token) {
                    index = i;
                    bFind = true;
                    //充值满了未领取
                } else if (Table.FindK(Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward, i + 1) < 0) {
                    let a = Game.PlayerMixUnitInfoSystem.mixunitinfo.newFirstChargeReward;
                    index = i;
                    bFind = true;
                }
                //满足其一
                if (bFind) {
                    break;
                }
            }
            this.index = index;
        }

        private SetCost() {
            let own = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            let labeltext = own;
        }

        private SetFirstTimmer() {
            let info = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_FIRST_REWARD];
            let call = () => {
                if (info.leftTime <= 0) {
                    return;
                }
                this.labelTime.textFlow = Util.RichText(TextsConfig.TextsConfig_Common.fistTimeTips + PlayerGiftSystem.upToTime3(info.leftTime));
            }
            call();

            this.firstTime = this.SetTime
        }

        public onDropInfoItemTap(isTouchBegin: boolean, data: HXH_FirstChargeMainItemNewData) {
            let goodsId = data.info.reward_goods[data.index];
            let count = data.info.reward_count[data.index];
            let _type = PlayerItemSystem.ItemType(goodsId);
            let dialog = this.groupListItem.getChildByName("Item-skill-common") as CommonDesGeneral;
            if (dialog) this.groupListItem.removeChild(dialog);
            let cardMap = PlayerHunterSystem.GetHunterCardMap(goodsId);
            let goodsInfo = TableItemPotato.Table()[goodsId];
            let distance = -150 + data.index * 85;
            let type: number = 0;

            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        this.groupListItem.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        this.groupListItem.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                        dialog.x = distance;
                        dialog.y = -200;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        this.groupListItem.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_POTATO) {
                    loadUI(PlayerCardPopDialog).then((dialog: PlayerCardPopDialog) => {
                        dialog.x = -480 + 100;
                        dialog.y = -320;
                        dialog.name = "Item-skill-common";
                        dialog.loadNotGet(goodsInfo);
                        this.groupListItem.addChild(dialog);
                    });
                }
                else {
                    loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                        dialog.x = distance;
                        dialog.y = -250;
                        dialog.name = "Item-skill-common";
                        dialog.init(goodsId, count);
                        this.groupListItem.addChild(dialog);
                    });

                }
            }
        }

        //鼠标抬起，移除通关奖励材料说明
        private onRemoveAward() {
            let dialog = this.groupListItem.getChildByName("Item-skill-common");
            if (dialog) this.groupListItem.removeChild(dialog);
        }

        private onButtonGo1() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.setCB(() => { this.init() });
                    scene.init();
                });

        }

        private onButtonGo2() {
            let junior_Id = CommonConfig.month_card_fit[0];
            let junior_Info: any = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == junior_Id;
            })
            if (junior_Info != null && junior_Info.buy_times == 0) {
                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.setCB(() => { this.init() });
                        scene.init();
                    });
            } else {
                this.onButtonClose();
            }
        }

        private onButtonGo3() {
            let Advanced_Id = CommonConfig.month_card_fit[1]; //高级月卡
            let Advanced_Info: any = Table.FindR(Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == Advanced_Id;
            })
            if (Advanced_Info != null && Advanced_Info.buy_times == 0) {
                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.setCB(() => { this.init() });
                        scene.init();
                    });
            } else {
                this.onButtonClose();
            }
        }

        private onButtonReward() {
            this.ReqFirstCharge()
                .then((data: message.FirstChargeRewardResponse) => {
                    let [hero, index] = Table.FindR(data.body.gameInfo.getGoods, (k, v: message.GoodsInfo) => {
                        return PlayerItemSystem.ItemType(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                    });
                    if (hero != null && index != null) {
                        loadUI(CommonGetGeneral)
                            .then((dialog: CommonGetGeneral) => {
                                dialog.setInfo(hero.goodsId, hero.index);
                                dialog.show(UI.SHOW_FILL_OUT);

                                // setTimeout(() => {
                                //     loadUI(TavernGetGeneralPop)
                                //         .then((taverngetgeneralpop: TavernGetGeneralPop) => {
                                //             taverngetgeneralpop.init(this);
                                //             egret.Tween.get(taverngetgeneralpop.group1)
                                //                 .call(() => {
                                //                     taverngetgeneralpop.setInof(hero);
                                //                     // taverngetgeneralpop.show();
                                //                     dialog.addChild(taverngetgeneralpop);
                                //                 })
                                //                 .to({ alpha: 1 }, 100)
                                //                 .to({ y: 10 }, 150, egret.Ease.sineInOut)
                                //                 .wait(300, false)
                                //                 .to({ y: -10 }, 150, egret.Ease.sineInOut)
                                //                 .wait(300, false)
                                //                 .call(() => { taverngetgeneralpop.onGroupParent(); })
                                //         });
                                // }, 300)
                            });

                    } else {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.init(data.body.gameInfo.getGoods);
                                dialog.show();
                            });
                    }
                    this.init();
                }).catch(reason => { });
        }

        public ReqFirstCharge() {
            return new Promise((resolve, reject) => {
                let request = new message.FirstChargeRewardRequest();
                request.body.index = this.index + 1;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.FirstChargeRewardResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        private onButtonClose() {
            this.close(UI.HIDE_TO_TOP);
            if (Teach.m_bOpenTeach == true && Teach.teachingNow == false && !Teach.isDone(teachBattle.teachPartID_GiftBag) && Teach.isDone(3005)) {
                // Teach.SetTeachPart(teachBattle.teachPartID_GiftBag);
                Game.TeachSystem.isShowGetVip = false;
                Game.EventManager.event(GameEvent.START_NEW_TEACHING, { curPart: teachBattle.teachPartID_GiftBag });
                let ui: any = Game.UIManager.topScene();
                if (ui instanceof MainCityUI) {
                    (ui as MainCityUI).sceneUI.setInfoGiftList();
                }
            }
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2;
                    display.y = group.explicitHeight / 2;
                    display.alpha = 0.6;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }
}