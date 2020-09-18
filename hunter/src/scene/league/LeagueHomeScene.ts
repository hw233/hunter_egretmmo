namespace zj {
    //公会主页面
    //lizhengqiang
    //2018.11.27
    export class LeagueHomeScene extends Scene {
        public groupHome: eui.Group; //Everything
        public groupMain: eui.Group; //主界面

        private groupShop: eui.Group; //公会商店
        private btnShop: eui.Button;
        private groupDonate: eui.Group; //公会建设
        private btnDonate: eui.Button;
        private groupManager: eui.Group; //公会管理
        private btnManager: eui.Button;
        private groupInstance: eui.Group; //公会副本
        private btnInstance: eui.Button;
        private groupAnimal: eui.Group; //公会BOOS
        private btnAnimal: eui.Button;
        private groupUnionBattle: eui.Group; //公会战
        private btnUnionBattle: eui.Button;

        private groupSkill: eui.Group;//公会技能;
        private btnSkill: eui.Button;
        private groupLeftTop: eui.Group;// 公会描述
        private imgBackround: eui.Image; //背景图
        private lbMemberNum: eui.Label; //在线人数
        private lbLeagueName: eui.Label; //公会名
        private lbLiveNum: eui.Label; //公会活跃度
        private imgLeagueIcon: eui.Image; //公会头像
        private lbLevel: eui.Label; //公会等级
        private lbNotice: eui.Label; //公告
        private btnChat: eui.Button; // 聊天
        private btnRecruit: eui.Button; // 公会招募
        private btnSetNotice: eui.Button; // 编辑公告
        private btnClose: eui.Button; // 返回
        private messageHistoryChat: eui.Group;// 聊天
        private simpleChat: eui.List;
        private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();  // 聊天数据

        private touchStartX: number = 0; // 触摸开始坐标
        private lbNoticeX: number;
        private lbNoticeY: number;
        private groupShopX: number;
        private groupShopY: number;
        private groupDonateX: number;
        private groupDonateY: number;
        private groupManagerX: number;
        private groupManagerY: number;
        private groupInstanceX: number;
        private groupInstanceY: number;
        private groupAnimalX: number;
        private groupAnimalY: number;
        private groupUnionBattleX: number;
        private groupUnionBattleY: number;
        private type: number = 1;

        private timer: egret.Timer;

        private imgBackroundScaleX: number = 1;
        private imgBackroundScaleY: number = 1;

        public constructor() {
            super();
            this.skinName = "resource/skins/league/LeagueHomeSenceSkin.exml";

            this.groupDonate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDonate, this); //公会建设
            this.groupManager.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupManager, this); //公会管理
            this.groupShop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupShop, this); //公会商店
            this.groupInstance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupInstance, this); //公会副本
            this.groupAnimal.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupAnimal, this); //公会BOOS
            this.groupUnionBattle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupUnionBattle, this); //公会战
            this.groupSkill.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupSkill, this)//公会技能
            this.groupLeftTop.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupLeftTopBegin, this);
            this.groupLeftTop.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupLeftTopEnd, this);

            this.btnChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);
            this.btnRecruit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRecurit, this);
            this.btnSetNotice.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSetNotice, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.messageHistoryChat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChat, this);

            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

            Game.EventManager.on(GameEvent.LEAGUE_HOME_UPDATE, this.update, this);
            Game.EventManager.on(GameEvent.LEAGUE_HOME_CLOSE, this.onBtnClose, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.update, this);
            Game.EventManager.on(GameEvent.GUILD_LOUNCH, this.duild_lounch, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.LEAGUE_HOME_UPDATE, this.update, this);
                Game.EventManager.off(GameEvent.LEAGUE_HOME_CLOSE, this.onBtnClose, this);
                Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_MEMBER, this.update, this);
                Game.EventManager.off(GameEvent.GUILD_LOUNCH, this.duild_lounch, this);

                if (this.timer) this.timer.stop();
            }, null);

            this.lbNoticeX = this.lbNotice.x;
            this.lbNoticeY = this.lbNotice.y;
            this.groupShopX = this.groupShop.x;
            this.groupShopY = this.groupShop.y;
            this.groupDonateX = this.groupDonate.x;
            this.groupDonateY = this.groupDonate.y;
            this.groupManagerX = this.groupManager.x;
            this.groupManagerY = this.groupManager.y;
            this.groupInstanceX = this.groupInstance.x;
            this.groupInstanceY = this.groupInstance.y;
            this.groupAnimalX = this.groupAnimal.x;
            this.groupAnimalY = this.groupAnimal.y;
            this.groupUnionBattleX = this.groupUnionBattle.x;
            this.groupUnionBattleY = this.groupUnionBattle.y;
        }

        public onClose() {
            this.listBottomData.removeAll();
            this.messageHistoryChat.visible = false;
        }

        public init() {
            this.setInfoTips();

            this.imgBackroundScaleX = this.imgBackround.scaleX;
            this.imgBackroundScaleY = this.imgBackround.scaleY;

            this.timer = new egret.Timer(0.4 * 1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
                this.setInfoTips();
                this.adaptScene();
            }, this);

            this.addAnimations();
            Game.PlayerLeagueSystem.leagueInfo().then(() => {
                this.setInfo();
            });
        }

        private adaptScene() {
            let scaleX: number = UIManager.StageWidth - 1541 > 0 ? UIManager.StageWidth / 1541 : 1;
            let scaleY: number = UIManager.StageHeight - 640 > 0 ? UIManager.StageHeight / 640 : 1;

            if (scaleX > 1) {
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            } else {
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }

            this.imgBackround.scaleX = this.imgBackroundScaleX * scaleX;
            this.imgBackround.scaleY = this.imgBackroundScaleY * scaleY;

            this.lbNotice.x = this.lbNoticeX * scaleX;
            this.lbNotice.y = this.lbNoticeY * scaleY;

            this.groupShop.x = this.groupShopX * scaleX;
            this.groupShop.y = this.groupShopY * scaleY;
            this.groupDonate.x = this.groupDonateX * scaleX;
            this.groupDonate.y = this.groupDonateY * scaleY;
            this.groupManager.x = this.groupManagerX * scaleX;
            this.groupManager.y = this.groupManagerY * scaleY;
            this.groupInstance.x = this.groupInstanceX * scaleX;
            this.groupInstance.y = this.groupInstanceY * scaleY;
            this.groupAnimal.x = this.groupAnimalX * scaleX;
            this.groupAnimal.y = this.groupAnimalY * scaleY;
            this.groupUnionBattle.x = this.groupUnionBattleX * scaleX;
            this.groupUnionBattle.y = this.groupUnionBattleY * scaleY;

            for (let i = 0; i < 4; i++) {
                let display = this.groupMain.getChildByName(`display${i}`);
                if (display) {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.scaleX = scaleX;
                    display.scaleY = scaleY;
                }
            }
        }

        private setInfo() {
            this.imgLeagueIcon.source = cachekey(TableItemPic.Item(Game.PlayerLeagueSystem.BaseInfo.picId).path, this);
            this.lbLevel.text = Game.PlayerLeagueSystem.BaseInfo.level.toString();
            this.lbLeagueName.text = Game.PlayerLeagueSystem.BaseInfo.name;
            this.lbMemberNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberDes, Game.PlayerLeagueSystem.getLineNum(), Game.PlayerLeagueSystem.BaseInfo.curNum);
            this.lbLiveNum.text = Game.PlayerLeagueSystem.BaseInfo.enliven_all + "/" + TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all;
            this.lbNotice.text = Helper.StringFormat(TextsConfig.TextConfig_League.home_pop_notice, Game.PlayerLeagueSystem.getNotice(Game.PlayerLeagueSystem.BaseInfo.notice));

            let bLeader: boolean = false;
            if (Game.PlayerLeagueSystem.Member.officialId != message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                bLeader = true;
            }
            this.btnSetNotice.visible = bLeader;
            this.btnRecruit.visible = bLeader;
        }

        public update() {
            this.setInfo();
        }

        public duild_lounch() {
            Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
        }

        public ChatMessageNotice_Visit(msg, result) {
            this.messageHistoryChat.visible = true;
            this.listBottomData.removeAll();
            for (let i = 0; i < msg.data.body.chatinfos.length; i++) {
                const v = msg.data.body.chatinfos[i];
                let ChatItem = new FormatChatItem();
                let content = Game.PlayerChatDataSystem.GetChatInfo(v);
                let lineNum = Game.PlayerChatDataSystem.getStrlineNum(HelpUtil.textConfigFormat(content[0]), 350);
                if (lineNum == 1) {
                    if (v.type == 5 && v.content != "") {
                        ChatItem.itemNum = 40;
                    } else {
                        ChatItem.itemNum = 20;
                    }
                } else {
                    ChatItem.itemNum = 40;
                }
                ChatItem.Data = v;

                this.listBottomData.addItem(ChatItem);
            }
            this.simpleChat.dataProvider = this.listBottomData;
            this.simpleChat.itemRenderer = HXH_ChatItem;

            egret.setTimeout(this.onClose, this, 10000);
        }


        private setInfoTips() {
            this["imgTip1"].visible = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_DONATE);
            this["imgTip2"].visible = Tips.FUNC[Tips.TAG.LEAGUE][Tips.TAG.LEAGUE_MALL]();
            this["imgTip3"].visible = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_APPLY);
            this["imgTip4"].visible = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_INSTANCE);
            this["imgTip5"].visible = Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_CELEBRATE);
            this["imgTip6"].visible =
                Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_ENTRANCE) ||
                Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_DEFENCE_FORMATE) ||
                Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_SIGNIN) ||
                Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.MATCH_MALL);
        }

        private addAnimations() {
            Game.DragonBonesManager.playAnimation(this, "fish", "armatureName", null, 0) // 鱼
                .then(display => {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.name = "display0";
                    this.groupMain.addChildAt(display, 100);
                });

            Game.DragonBonesManager.playAnimation(this, "hunterhallfloor", "armatureName", null, 0) // 场景灯光
                .then(display => {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.name = "display1";
                    this.groupMain.addChildAt(display, 2);
                });

            Game.DragonBonesManager.playAnimation(this, "fb", "armatureName", null, 0) // 副本动态
                .then(display => {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.name = "display2";
                    this.groupMain.addChildAt(display, 1);
                });

            Game.DragonBonesManager.playAnimation(this, "window", "armatureName", null, 0) // 飞艇
                .then(display => {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.name = "display3";
                    this.groupMain.addChildAt(display, 0);
                });

            this.timer.start();
        }

        private onTouchBegin(evt: egret.TouchEvent) {
            this.touchStartX = evt.stageX;
        }

        private onTouchMove(evt: egret.TouchEvent) {
            let deltaX: number = 0;
            if (this.groupHome.touchChildren == true) {
                deltaX = evt.stageX - this.touchStartX;
                this.touchStartX = evt.stageX;
                if (this.groupMain.x + deltaX > 0) {
                    deltaX = -this.groupMain.x;
                }
                if (this.imgBackround.width * this.imgBackroundScaleX - UIManager.StageWidth + this.groupMain.x + deltaX < 0) {
                    deltaX = -(this.imgBackround.width * this.imgBackroundScaleX - UIManager.StageWidth + this.groupMain.x);
                }
                this.groupMain.x += deltaX;
            }
        }

        private onTouchEnd() {
            this.onGroupLeftTopEnd();
        }

        private onGroupDonate() {
            // toast("公会建设");
            egret.Tween.get(this.btnDonate).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueDonate)
                    .then((dialog: LeagueDonate) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                egret.Tween.get(this.btnDonate).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        private onGroupManager() {
            // toast("公会管理");
            egret.Tween.get(this.btnManager).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueMain)
                    .then((dialog: LeagueMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.init();
                    });
                egret.Tween.get(this.btnManager).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        private onGroupShop() {
            // toast("公会商店")
            egret.Tween.get(this.btnShop).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(ShopMallDialog)
                    .then((dialog: ShopMallDialog) => {
                        dialog.load(3);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                egret.Tween.get(this.btnShop).to({ scaleX: 1, scaleY: 1 }, 10);
            });
        }

        public onGroupInstance() {
            // toast("公会副本")
            egret.Tween.get(this.btnInstance).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueInstanceMain)
                    .then((dialog: LeagueInstanceMain) => {
                        dialog.show(UI.SHOW_FILL_OUT);
                        dialog.init();
                    });
                egret.Tween.get(this.btnInstance).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        public onGroupAnimal() {
            // toast("公会BOOS")
            egret.Tween.get(this.btnAnimal).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                let tip = Table.FindF(Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                    if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS && v.leftTime * 1000 - egret.getTimer() > 0) {
                        return true;
                    }
                });

                let partyTip = Table.FindF(Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                    if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY && v.leftTime * 1000 - egret.getTimer() > 0) {
                        return true;
                    }
                });

                if (partyTip) {
                    this.goCeleTip();
                } else if (tip) {
                    Game.PlayerLeagueSystem.leagueBossScene().then(() => {
                        // "League_BossFighting"
                        loadUI(LeagueBossFighting)
                            .then((dialog: LeagueBossFighting) => {
                                dialog.show(UI.SHOW_FROM_TOP);
                                dialog.init();
                            });
                    });
                } else {
                    loadUI(LeagueBossInfo)
                        .then((dialog: LeagueBossInfo) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                        });
                }

                egret.Tween.get(this.btnAnimal).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        private goCeleTip() {
            if (Game.PlayerLeagueSystem.Member.is_party_join) {
                // "League_BossCelebrate"
                loadUI(LeagueBossCelebrate)
                    .then((dialog: LeagueBossCelebrate) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            } else {
                if (Game.PlayerLeagueSystem.Member.is_boss_join) {
                    this.goCele();
                } else {
                    loadUI(ConfirmCancelDialog)
                        .then((dialog: ConfirmCancelDialog) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(Helper.StringFormat(TextsConfig.TextConfig_League.animal_goCele, CommonConfig.league_party_consume));
                            dialog.setCB(this.goCele);
                        });
                }
            }
        }

        private goCele = () => {
            Game.PlayerLeagueSystem.leaguePartyScene().then(() => {
                // "League_BossCelebrate"
                loadUI(LeagueBossCelebrate)
                    .then((dialog: LeagueBossCelebrate) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            });
        }

        public onGroupUnionBattle() {
            // toast("公会战")
            egret.Tween.get(this.btnUnionBattle).to({ scaleX: -1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueUnionBattleMain)
                    .then((dialog: LeagueUnionBattleMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.init();
                    });
                egret.Tween.get(this.btnUnionBattle).to({ scaleX: -1, scaleY: 1 }, 100);
            });
        }

        /**点击公会技能 */
        private onGroupSkill() {
            loadUI(LeagueSkill)
                .then((dialog: LeagueSkill) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                })
        }

        private onGroupLeftTopBegin() {
            loadUI(LeagueHomeDesLive)
                .then((des: LeagueHomeDesLive) => {
                    des.x = this.groupLeftTop.x + this.groupLeftTop.width;
                    des.y = this.groupLeftTop.y + this.groupLeftTop.height;
                    des.name = "des";
                    this.addChild(des);
                });
        }

        private onGroupLeftTopEnd() {
            let des = this.getChildByName("des");
            if (des) this.removeChild(des);
        }

        private onBtnChat() {
            // "Chat_Main"
            loadUI(Chat_Main)
                .then((dialog: Chat_Main) => {
                    dialog.show();
                    dialog.inittypr(this.type);
                });
        }

        private onBtnRecurit() {
            // toast("公会招募");
            egret.Tween.get(this.btnRecruit).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueRecruit)
                    .then((dialog: LeagueRecruit) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                egret.Tween.get(this.btnRecruit).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        private onBtnSetNotice() {
            // toast("编辑公告");
            egret.Tween.get(this.btnSetNotice).to({ scaleX: 1.1, scaleY: 1.1 }, 100).call(() => {
                loadUI(LeagueManageMian)
                    .then((dialog: LeagueManageMian) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.onBtnMsgSet();
                    });
                egret.Tween.get(this.btnSetNotice).to({ scaleX: 1, scaleY: 1 }, 100);
            });
        }

        private onBtnClose(data: { type: number } = { type: 0 }) {
            if (data.type == 1) {
                this.close();
            } else {
                this.close(UI.HIDE_TO_TOP);
            }
        }
    }

}