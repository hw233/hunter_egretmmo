namespace zj {
    //公会-公会副本
    //lizhengqiang
    //2019.01.02
    export class LeagueInstanceMain extends Scene {
        private lbTimes: eui.Label;
        private btnAddTimes: eui.Button;
        private lbStrength: eui.Label;
        private btnAddStrength: eui.Button;
        private lbGemstone: eui.Label;
        private btnAddGemstone: eui.Button;
        private btnClose: eui.Button;

        private groupBoss: eui.Group;
        private imgBackround: eui.Image;
        private groupItem: eui.Group;
        private groupBoss1: eui.Group;
        private groupBoss2: eui.Group;
        private groupBoss3: eui.Group;
        private groupBoss4: eui.Group;
        private groupBoss5: eui.Group;
        private groupBoss6: eui.Group;
        private groupBoss7: eui.Group;

        private btnLog: eui.Button;
        private btnViewAward: eui.Button;
        private btnRule: eui.Button;

        private timer: egret.Timer;
        private uiItem: LeagueInstanceMainItem[] = null;
        private instanceTable: { [key: string]: TableLeagueInstance } = null;
        private leagueInstancesInfo: Array<message.LeagueInstanceSimple> = null;

        private animationScaleX: number = 1;
        private animationScaleY: number = 1;

        public constructor() {
            super();

            this.skinName = "resource/skins/league/LeagueInstanceMainSkin.exml";

            this.btnAddTimes.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddTimes, this);
            this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
            this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnLog.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLog, this);
            this.btnViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnViewAward, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRule, this);
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.setInfo, this);
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfo, this);
            Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, this.refreshInfo, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.PLAYER_POWER_CHANGE, this.setInfo, this);
                Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.setInfo, this);
                Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_INSTANCE, this.refreshInfo, this);

                if (this.timer) this.timer.stop();
            }, null);
        }

        public onEntryTopScene() {
            this.setInfo();
        }

        public init() {
            this.timer = new egret.Timer(0.4 * 1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.adaptScene, this);

            this.setInfo();
            this.instanceTable = Game.PlayerLeagueSystem.getAllInstance();
            this.addAnimation();
            Game.PlayerLeagueSystem.leagueInstanceList().then(() => {
                this.leagueInstancesInfo = Game.PlayerLeagueSystem.Instances;
                this.initList();
            });

            if (Teach.isDone(teachBattle.teachPartID_League_Instance) == false) {
                Teach.CheckAndSetTeach(teachBattle.teachPartID_League_Instance);
            }
        }

        private adaptScene() {
            let scaleX: number = UIManager.StageWidth - 1142 > 0 ? UIManager.StageWidth / 1142 : 1;
            let scaleY: number = UIManager.StageHeight - 642 > 0 ? UIManager.StageHeight / 642 : 1;

            this.imgBackround.scaleX = scaleX;
            this.imgBackround.scaleY = scaleY;

            let display = this.groupBoss.getChildByName("display");
            if (display) {
                display.x = 0;
                display.y = UIManager.StageHeight;
                display.scaleX = this.animationScaleX * scaleX;
                display.scaleY = this.animationScaleY * scaleY;
            }

            this.groupItem.scaleX = scaleX;
            this.groupItem.scaleY = scaleY;
        }

        private addAnimation() {
            Game.DragonBonesManager.playAnimation(this, "gonghuifuben", "armatureName", null, 0)
                .then(display => {
                    display.x = 0;
                    display.y = UIManager.StageHeight;
                    display.name = "display";
                    this.groupBoss.addChildAt(display, 1);

                    this.animationScaleX = display.scaleX;
                    this.animationScaleY = display.scaleY;
                });
            this.timer.start();
        }

        private setInfo() {
            this.lbTimes.text = Helper.StringFormat(TextsConfig.TextConfig_League.instance_times_left, Game.PlayerLeagueSystem.Member.instance_buy_time + CommonConfig.league_instance_day_time - Game.PlayerLeagueSystem.Member.instance_time, CommonConfig.league_instance_day_time);
            this.lbStrength.text = Helper.StringFormat("%d/%d", PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_POWER), (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
            this.lbGemstone.text = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
        }

        private refreshInfo() {
            let instancesInfo = Game.PlayerLeagueSystem.LeagueInfo.instances;
            for (const k in this.uiItem) {
                this.uiItem[k].freshInfo(Number(k) + 1, instancesInfo[k]);
            }
        }

        private initList() {
            let item1 = new LeagueInstanceMainItem();
            item1.setInfo(1, this.instanceTable[1], this.leagueInstancesInfo[0]);
            item1.name = "item1";
            this.groupBoss1.addChild(item1);

            let item2 = new LeagueInstanceMainItem();
            item2.setInfo(2, this.instanceTable[2], this.leagueInstancesInfo[1]);
            item2.name = "item2";
            this.groupBoss2.addChild(item2);

            let item3 = new LeagueInstanceMainItem();
            item3.setInfo(3, this.instanceTable[3], this.leagueInstancesInfo[2]);
            item3.name = "item3";
            this.groupBoss3.addChild(item3);

            let item4 = new LeagueInstanceMainItem();
            item4.setInfo(4, this.instanceTable[4], this.leagueInstancesInfo[3]);
            item4.name = "item4";
            this.groupBoss4.addChild(item4);

            let item5 = new LeagueInstanceMainItem();
            item5.setInfo(5, this.instanceTable[5], this.leagueInstancesInfo[4]);
            item5.name = "item5";
            this.groupBoss5.addChild(item5);

            let item6 = new LeagueInstanceMainItem();
            item6.setInfo(6, this.instanceTable[6], this.leagueInstancesInfo[5]);
            item6.name = "item6";
            this.groupBoss6.addChild(item6);

            let item7 = new LeagueInstanceMainItem();
            item7.setInfo(7, this.instanceTable[7], this.leagueInstancesInfo[6]);
            item7.name = "item7";
            this.groupBoss7.addChild(item7);

            this.uiItem = [item1, item2, item3, item4, item5, item6, item7];
        }

        private onBtnAddTimes() {
            // toast("+ 挑战次数");
            if (Game.PlayerLeagueSystem.Member.instance_buy_time == CommonConfig.league_instance_buy_time_max) {
                toast_warning("挑战次数已达购买上限");
                return;
            }
            let cost: number = CommonConfig.league_instance_buytime_consume(Game.PlayerLeagueSystem.Member.instance_buy_time);
            let buyTime: number = CommonConfig.league_instance_buy_time_max;
            loadUI(ConfirmCancelDialog)
                .then((dialog: ConfirmCancelDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(Helper.StringFormat(TextsConfig.TextConfig_League.instance_addtimes_tips, cost, buyTime - Game.PlayerLeagueSystem.Member.instance_buy_time, buyTime));
                    dialog.setCB(this.buyTime);
                });
        }

        private buyTime = () => {
            Game.PlayerLeagueSystem.leagueInstanceBuyTime().then(() => {
                toast_success(LANG(TextsConfig.TextConfig_League.instance_addtimes_success));
                this.setInfo();
            });
        }

        private onBtnAddStrength() {
            // toast("+ 体力");
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        private onBtnAddGemstone() {
            // toast("+ 钻石");
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init();
                });
        }

        // 副本日志
        private onBtnLog() {
            // toast("副本日志");
            Game.PlayerLeagueSystem.leagueLog(2)
                .then((records: Array<message.LeagueRecord>) => {
                    loadUI(LeagueLog)
                        .then((dialog: LeagueLog) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.init(TableEnum.Enum.League_LogType.Instance, records);
                        });
                });
        }

        // 奖励预览
        private onBtnViewAward() {
            // toast("奖励预览");
            loadUI(LeagueInstanceViewAward)
                .then((dialog: LeagueInstanceViewAward) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        // 玩法说明
        private onBtnRule() {
            // toast("玩法说明");
            loadUI(Common_RuleDialog)
                .then((dialog: Common_RuleDialog) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.init(RuleConfig.leagueInstance);
                });
        }

        private onBtnClose() {
            this.close(UI.HIDE_TRAIL_OFF);
        }
    }

}