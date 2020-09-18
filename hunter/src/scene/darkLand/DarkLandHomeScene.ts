namespace zj {
//DarkLandHomeScene (黑暗大陆)
//hexiaowei
// 2019/03/01
export class DarkLandHomeScene extends Scene {

    private imageLine1: eui.Image;
    private imageLine2: eui.Image;
    private imageLine3: eui.Image;
    private imageLine4: eui.Image;
    private imageLine5: eui.Image;
    private imageLine6: eui.Image;
    private groupZone1: eui.Group;
    private imageBoardName1: eui.Image;
    private imageName1: eui.Image;
    private imageLock1: eui.Image;
    private imageTip1: eui.Image;
    private groupZone2: eui.Group;
    private imageBoardName2: eui.Image;
    private imageName2: eui.Image;
    private imageLock2: eui.Image;
    private imageTip2: eui.Image;
    private groupZone3: eui.Group;
    private imageBoardName3: eui.Image;
    private imageName3: eui.Image;
    private imageLock3: eui.Image;
    private imageTip3: eui.Image;
    private groupZone4: eui.Group;
    private imageBoardName4: eui.Image;
    private imageName4: eui.Image;
    private imageLock4: eui.Image;
    private imageTip4: eui.Image;
    private groupZone5: eui.Group;
    private imageBoardName5: eui.Image;
    private imageName5: eui.Image;
    private imageType5: eui.Image;
    private imageLock5: eui.Image;
    private imageTip5: eui.Image;
    private groupZone6: eui.Group;
    private imageBoardName6: eui.Image;
    private imageName6: eui.Image;
    private imageTip6: eui.Image;
    private groupClick1_1: eui.Group;
    private groupClick1_2: eui.Group;
    private groupClick1_3: eui.Group;
    private groupClick1_4: eui.Group;
    private groupClick1_5: eui.Group;
    private groupClick2_1: eui.Group;
    private groupClick2_2: eui.Group;
    private groupClick2_3: eui.Group;
    private groupClick2_4: eui.Group;
    private groupClick2_5: eui.Group;
    private groupClick3_1: eui.Group;
    private groupClick3_2: eui.Group;
    private groupClick3_3: eui.Group;
    private groupClick3_4: eui.Group;
    private groupClick3_5: eui.Group;
    private groupClick6_1: eui.Group;
    private groupClick6_2: eui.Group;
    private groupClick6_3: eui.Group;
    private groupClick6_4: eui.Group;
    private groupClick6_5: eui.Group;
    private groupClick5_1: eui.Group;
    private groupClick5_2: eui.Group;
    private groupClick5_3: eui.Group;
    private groupClick5_4: eui.Group;
    private groupClick5_5: eui.Group;
    private groupClick4_1: eui.Group;
    private groupClick4_2: eui.Group;
    private groupClick4_3: eui.Group;
    private groupClick4_4: eui.Group;
    private groupClick4_5: eui.Group;
    private buttonClose: eui.Button;
    private lbGold: eui.Label;
    private btnAddGold: eui.Button;
    private imgFlagGold: eui.Image;
    private labelToken: eui.Label;
    private btnAddToken: eui.Button;
    private imgFlagToken: eui.Image;
    private labelRElicCoin: eui.Label;
    private imageSpar: eui.Image;
    private imageBackGroud: eui.Image;

    private groupWhole: eui.Group;
    private groupScene: eui.Group;
    private labelLevel5: eui.BitmapLabel;

    private boardScale: number = 1.2;

    private lock = [];
    private board = [];
    private tips = [];
    private teachId: number;

    private timer: egret.Timer;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/DarkLandHomeSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        //创建一个计时器对象
		this.timer = new egret.Timer(900, 0);
		//注册事件侦听器
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.UpdateTips, this);
        this.timer.start();
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);

        this.groupZone1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);
        this.groupClick1_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);
        this.groupClick1_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);
        this.groupClick1_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);
        this.groupClick1_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);
        this.groupClick1_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick1, this);

        this.groupZone2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);
        this.groupClick2_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);
        this.groupClick2_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);
        this.groupClick2_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);
        this.groupClick2_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);
        this.groupClick2_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick2, this);

        this.groupZone3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);
        this.groupClick3_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);
        this.groupClick3_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);
        this.groupClick3_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);
        this.groupClick3_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);
        this.groupClick3_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick3, this);

        this.groupZone4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);
        this.groupClick4_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);
        this.groupClick4_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);
        this.groupClick4_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);
        this.groupClick4_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);
        this.groupClick4_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick4, this);

        this.groupZone5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);
        this.groupClick5_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);
        this.groupClick5_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);
        this.groupClick5_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);
        this.groupClick5_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);
        this.groupClick5_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick5, this);

        this.groupZone6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);
        this.groupClick6_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);
        this.groupClick6_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);
        this.groupClick6_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);
        this.groupClick6_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);
        this.groupClick6_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupClick6, this);



        this.groupZone1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);
        this.groupClick1_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);
        this.groupClick1_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);
        this.groupClick1_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);
        this.groupClick1_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);
        this.groupClick1_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd1, this);

        this.groupZone2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);
        this.groupClick2_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);
        this.groupClick2_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);
        this.groupClick2_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);
        this.groupClick2_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);
        this.groupClick2_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd2, this);

        this.groupZone3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);
        this.groupClick3_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);
        this.groupClick3_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);
        this.groupClick3_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);
        this.groupClick3_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);
        this.groupClick3_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd3, this);

        this.groupZone4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);
        this.groupClick4_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);
        this.groupClick4_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);
        this.groupClick4_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);
        this.groupClick4_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);
        this.groupClick4_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd4, this);

        this.groupZone5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);
        this.groupClick5_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);
        this.groupClick5_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);
        this.groupClick5_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);
        this.groupClick5_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);
        this.groupClick5_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd5, this);

        this.groupZone6.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);
        this.groupClick6_1.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);
        this.groupClick6_2.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);
        this.groupClick6_3.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);
        this.groupClick6_4.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);
        this.groupClick6_5.addEventListener(egret.TouchEvent.TOUCH_END, this.onGroupEnd6, this);

        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAddGold, this);
        this.btnAddToken.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAddGemstone, this);

        this.groupScene.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveGroup, this);

        Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        if (this.width >= 1344) {
            this.imageBackGroud.scaleX = this.width / 1334;
        }
        this.inIt();
    }

    public UpdateTips() {
        this.imageTip1.visible = Tips.GetTipsOfId( Tips.TAG.DarkLand, Tips.TAG.RELIC_INSTANCE);
        this.imageTip6.visible = Tips.GetTipsOfId( Tips.TAG.DarkLand, Tips.TAG.RELIC_MALL);
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.anchorOffsetX = display.width / 2;
                display.anchorOffsetY = display.height / 2;
                display.x = display.width / 2 - 195;
                if (this.width >= 1334) {
                    display.scaleX = this.width / 1334;
                     display.x = display.width / 2 - (195*this.width / 1334);
                }
                
                display.y = this.groupWhole.height + display.height / 2;
              
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    private inIt() {
        this.imageLine1.visible = false;
        this.imageLine2.visible = false;
        this.imageLine3.visible = false;
        this.imageLine4.visible = false;
        this.imageLine5.visible = false;
        this.imageLine6.visible = false;

        this.setInfo();

        this.addAnimatoin("worldspine", "animation", 0, this.groupWhole);

    }

    private setInfo() {
        // 遗迹探索
        let open1: boolean = true;
        this.imageLock1.visible = !open1;
        if (open1) {
            this.imageBoardName1.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imageBoardName1.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imageTip1.visible = Tips.GetTipsOfId( Tips.TAG.DarkLand, Tips.TAG.RELIC_INSTANCE); //红点

        //圣泉森林 （未开启）
        let open3: boolean = false;
        this.imageLock3.visible = !open3;
        if (open3) {
            this.imageBoardName3.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imageBoardName3.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imageTip3.visible = false;

        //晶石商店
        let open6: boolean = true;
        if (open6) {
            this.imageBoardName6.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imageBoardName6.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imageTip6.visible = Tips.GetTipsOfId( Tips.TAG.DarkLand, Tips.TAG.RELIC_MALL); //红点

        //碧蓝湖畔（未开启）
        let open4: boolean = false;
        this.imageLock4.visible = !open4;
        if (open4) {
            this.imageBoardName4.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imageBoardName4.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imageTip4.visible = false;

        //飞龙 (好友助阵)
        let open5 = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT, false);
        this.imageLock5.visible = !open5;
        this.imageType5.visible = open5;
        this.labelLevel5.visible = !open5;
        this.labelLevel5.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT).condition);

        if (open5) {
            this.imageBoardName5.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
            this.imageType5.source = cachekey(UIConfig.UIConfig_Wonderland.area[5], this);
        } else {
            this.imageBoardName5.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
            this.imageType5.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
        }

        this.imageTip5.visible = Tips.GetTipsOfId(Tips.TAG.DarkLand, Tips.TAG.GROUPDARKFIGHT);

        //熔岩洞穴(未开放)
        let open2 = false;
        if (open2) {
            this.imageBoardName2.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imageBoardName2.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imageTip2.visible = false;
        this.imageSpar.source = cachekey("ui_iconresources_jingshi3_png", this);
        this.updateUIStates();

        //初始记录
        for (let i = 1; i < 6; i++) {
            let lock = this["imageLock" + i].visible;
            let board = this["imageLock" + i].visible;
            let tips = this["imageTip" + i].visible;

            this.lock.push(lock);
            this.board.push(board);
            this.tips.push(tips);
        }
    }

    private onRemoveFromStage() {
        Game.EventManager.off(GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
        Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
    }

    private updateUIStates() {
        //金幣
        if (Game.PlayerInfoSystem.Coin > 100000) {
            this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
        } else {
            this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
        }

        //鑽石
        if (Game.PlayerInfoSystem.Token > 100000) {
            this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
        } else {
            this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
        }

        //晶石
        let id = message.EResourceType.RESOURCE_RELIC_COIN;
        let str_res = PlayerItemSystem.Str_Resoure(id);
        this.labelRElicCoin.text = str_res;
    }

    private onGroupClick1(num) {
        this.onGroupClick(1);

    }

    private onGroupClick2() {
        this.onGroupClick(2);

    }

    private onGroupClick3() {
        this.onGroupClick(3);

    }

    private onGroupClick4() {
        this.onGroupClick(4);

    }

    private onGroupClick5() {
        this.onGroupClick(5);

    }

    private onGroupClick6() {
        this.onGroupClick(6);

    }

    private onGroupClick(num: number) {
        for (var i = 1; i <= 6; i++) {
            if (i == num) {
                this[`imageLine${i}`].visible = true;
                this[`groupZone${i}`].scaleX = this.boardScale;
                this[`groupZone${i}`].scaleY = this.boardScale;
            } else {
                this[`imageLine${i}`].visible = false;
                this[`groupZone${i}`].scaleX = 1;
                this[`groupZone${i}`].scaleY = 1;
            }
        }
    }


    public onGroupEnd1() {

        loadUI(RelicMain)
            .then((scene: RelicMain) => {
                scene.show(UI.SHOW_FROM_TOP);
            });

    }

    private onGroupEnd2() {
        toast_warning("敬请期待");
    }

    private onGroupEnd3() {
        toast_warning("敬请期待");
    }

    private onGroupEnd4() {
        toast_warning("敬请期待");
    }

    private onGroupEnd5() {
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT, true)) {
            //  toast("飞龙营地");
            loadUI(HXH_GroupFightMain)
                .then((scene: HXH_GroupFightMain) => {
                    scene.Init();
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }

    }

    private onGroupEnd6() {
        loadUI(RelicMall_Main)
            .then((dialog: RelicMall_Main) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }


    private onRemoveGroup() {
        for (var i = 1; i <= 6; i++) {

            this[`imageLine${i}`].visible = false;
            this[`groupZone${i}`].scaleX = 1;
            this[`groupZone${i}`].scaleY = 1;
        }
    }

    private onBtnAddGold() {
        loadUI(HelpGoldDialog)
            .then((dialog: HelpGoldDialog) => {
                dialog.SetInfoList();
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnAddGemstone() {
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    private onButtonClose() {
        this.timer.stop();
        this.timer.reset();
        this.close(UI.HIDE_TRAIL_OFF);
    }

    public SetTeachOpen() {
        for (let i = 1; i < 6; i++) {
            this["imageLock" + i].visible = false;
            this["imageBoardName" + i].source = cachekey(UIConfig.UIConfig_Wonderland.board[0], this);
            this["imageTip" + i].visible = false;
        }
    }

    public SetTeachClose() {
        for (let i = 1; i < 6; i++) {
            let pathIndex = this.board[i] && 2 || 1;
            this["imageLock" + i].visible = this.lock[(i - 1)];
            this["imageBoardName" + i].source = cachekey(UIConfig.UIConfig_Wonderland.board[pathIndex], this);
            this["imageTip" + i].visible = this.tips[(i - 1)];
        }
    }

    public SetTeach(id) {
        if (id == null) {
            return;
        }
        this.teachId = id;
        let name = null;
        if (id == 5) {
            //杀戮仙境 进入新手仙境
            name = "groupZone5";
        }
        return name;
    }

}

}