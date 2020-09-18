namespace zj {
// 贪婪之岛 HXH_Wonderland
// 20190314
// lizhengqiang
export class WonderlandScene extends Scene {
    private groupMap: eui.Group;
    private groupAnimation: eui.Group;
    private groupClick: eui.Group;
    private rectClick1_1: eui.Rect;
    private rectClick1_2: eui.Rect;
    private rectClick1_3: eui.Rect;
    private rectClick1_4: eui.Rect;
    private rectClick1_5: eui.Rect;
    private rectClick2_1: eui.Rect;
    private rectClick2_2: eui.Rect;
    private rectClick2_3: eui.Rect;
    private rectClick2_4: eui.Rect;
    private rectClick2_5: eui.Rect;
    private rectClick3_1: eui.Rect;
    private rectClick3_2: eui.Rect;
    private rectClick3_3: eui.Rect;
    private rectClick3_4: eui.Rect;
    private rectClick3_5: eui.Rect;
    private rectClick4_1: eui.Rect;
    private rectClick4_2: eui.Rect;
    private rectClick4_3: eui.Rect;
    private rectClick4_4: eui.Rect;
    private rectClick4_5: eui.Rect;
    private rectClick5_1: eui.Rect;
    private rectClick5_2: eui.Rect;
    private rectClick5_3: eui.Rect;
    private rectClick5_4: eui.Rect;
    private rectClick5_5: eui.Rect;
    private rectClick6_1: eui.Rect;
    private rectClick6_2: eui.Rect;
    private rectClick6_3: eui.Rect;
    private rectClick6_4: eui.Rect;
    private rectClick6_5: eui.Rect;
    private groupLine: eui.Group;
    private imgLine1: eui.Image;
    private imgLine2: eui.Image;
    private imgLine3: eui.Image;
    private imgLine4: eui.Image;
    private imgLine5: eui.Image;
    private imgLine6: eui.Image;
    private groupZone1: eui.Group;
    private imgBoardName1: eui.Image;
    private imgName1: eui.Image;
    private imgLock1: eui.Image;
    private imgType1: eui.Image;
    private imgTip1: eui.Image;
    private imgDone: eui.Image;
    private groupZone2: eui.Group;
    private imgBoardName2: eui.Image;
    private imgName2: eui.Image;
    private imgLock2: eui.Image;
    private imgType2: eui.Image;
    private imgTip2: eui.Image;
    private lbLevel2: eui.BitmapLabel;
    private groupZone3: eui.Group;
    private imgBoardName3: eui.Image;
    private imgName3: eui.Image;
    private imgLock3: eui.Image;
    private imgType3: eui.Image;
    private imgTip3: eui.Image;
    private groupZone4: eui.Group;
    private imgBoardName4: eui.Image;
    private imgName4: eui.Image;
    private imgLock4: eui.Image;
    private imgType4: eui.Image;
    private imgTip4: eui.Image;
    private lbLevel4: eui.BitmapLabel;
    private groupTime4: eui.Group;
    private imgIconTime4: eui.Image;
    private lbEndTime4: eui.Label;
    private groupZone5: eui.Group;
    private imgBoardName5: eui.Image;
    private imgName5: eui.Image;
    private imgLock5: eui.Image;
    private imgType5: eui.Image;
    private imgTip5: eui.Image;
    private lbLevel5: eui.BitmapLabel;
    private groupZone6: eui.Group;
    private imgBoardName6: eui.Image;
    private imgName6: eui.Image;
    private imgLock6: eui.Image;
    private imgType6: eui.Image;
    private imgTip6: eui.Image;
    private lbLevel6: eui.BitmapLabel;
    private groupTime6: eui.Group;
    private imgIconTime6: eui.Image;
    private lbEndTime6: eui.Label;
    private groupRight: eui.Group;
    private btnClose: eui.Button;

    private stageType = {
        peace: 2,
        pk: 3,
        gamble: 0,
        port: 1,
        boss: 0,
        replica: 0,
    };
    private bossState: number;
    private timer: egret.Timer;

    private generalList: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }>;
    private generalIdList: Array<number>;
    private isChange: boolean;
    private serverFormat: message.FormationInfo;
    private board: Array<boolean> = [];
    private lock: Array<boolean> = [];
    private tips: Array<boolean> = [];
    private teachId: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/wonderland/WonderlandSceneSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

        Gmgr.Instance.setLayerId(TableEnumLayerId.LAYER_WONDERLAND);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
        }, null);
    }

    public init() {
        this.adaptScene();

        this.groupAnimation.removeChildren();
        Game.DragonBonesManager.playAnimation(this, "island", "armatureName", null, 0)
            .then(display => {
                display.x = 100;
                display.y = UIManager.StageHeight;
                this.groupAnimation.addChildAt(display, 1);
            });

        for (let i = 1; i <= 6; i++) {
            this[`imgBoardName${i}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this[`onClick${i}_1`], this);
            this[`imgBoardName${i}`].addEventListener(egret.TouchEvent.TOUCH_END, this[`onClick${i}_2`], this);
            this[`imgBoardName${i}`].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this[`onClick${i}_3`], this);
            for (let j = 1; j <= 5; j++) {
                this[`rectClick${i}_${j}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this[`onClick${i}_1`], this);
                this[`rectClick${i}_${j}`].addEventListener(egret.TouchEvent.TOUCH_END, this[`onClick${i}_2`], this);
                this[`rectClick${i}_${j}`].addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this[`onClick${i}_3`], this);
            }

            this[`imgLine${i}`].alpha = 0;
        }

        this.serverFormat = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
        this.setInfo();
        this.initList();

        this.updateBossInfo();
        this.updatePortInfo();
        this.updateFishInfo();

        this.timer = new egret.Timer(990, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, () => {
            this.updateBossInfo();
            this.updatePortInfo();
            this.updateFishInfo();

            this.adaptScene();
        }, this);
        this.timer.start();

        this.CheckTeach();
    }

    private initList() {
        this.generalIdList = [];
        let serverFormatTogether = [];
        for (let [k, v] of HelpUtil.GetKV(this.serverFormat.generals)) {
            serverFormatTogether.push(v);
        }

        for (let [k, v] of HelpUtil.GetKV(this.serverFormat.reserves)) {
            serverFormatTogether.push(v);
        }

        let hasServerFormat = Table.FindF(serverFormatTogether, (k, v) => {
            let haveSame = false;
            for (let [kk, vv] of HelpUtil.GetKV(this.serverFormat.generals)) {
                if (vv != 0 && vv != v && PlayerHunterSystem.GetGeneralId(v)) {
                    haveSame = true;
                }
            }

            if (v != 0 && !haveSame) {
                return true;
            }
            return false;
        });

        if (hasServerFormat) {
            for (let i = 0; i < this.serverFormat.generals.length; i++) {
                let v = this.serverFormat.generals[i];
                if (v != 0) {
                    this.generalIdList.push(v);
                }
            }

            for (let i = 0; i < this.serverFormat.reserves.length; i++) {
                let v = this.serverFormat.reserves[i];
                if (v != 0) {
                    this.generalIdList.push(v);
                }
            }
            this.generalList = Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[0];
            this.isChange = Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[1];
        }
        else {
            this.generalList = Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
            this.isChange = Game.PlayerHunterSystem.getWonderlandGeneral(null)[1];
        }

        Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
        Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];

        for (let [k, v] of HelpUtil.GetKV(this.generalList)) {
            if (Number(k) < 4) {
                Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
            }
            else {
                Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
            }
        }
    }

    private adaptScene() {
        let scaleX: number = UIManager.StageWidth - 1344 > 0 ? UIManager.StageWidth / 1344 : 1;
        let scaleY: number = UIManager.StageHeight - 640 > 0 ? UIManager.StageHeight / 640 : 1;

        this.groupMap.scaleX = scaleX;
        this.groupMap.scaleY = scaleY;
    }

    private setInfo() {
        for (let i = 0; i < 6; i++) {
            this[`imgName${i + 1}`].source = cachekey(UIConfig.UIConfig_Wonderland.name[i], this);
        }

        // 安多尼拔
        let peaceInfo = TableWonderland.Item(this.stageType.peace);
        let open1: boolean = (Game.PlayerInfoSystem.BaseInfo.level >= peaceInfo.mix_level && Game.PlayerInfoSystem.BaseInfo.level <= peaceInfo.max_level);
        this.imgLock1.visible = !open1;
        if (open1) {
            this.imgType1.source = cachekey(UIConfig.UIConfig_Wonderland.area[1], this);
            this.imgBoardName1.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imgType1.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
            this.imgBoardName1.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imgTip1.visible = (Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.RUNES) ||
            Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FISH) ||
            Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.DOUBLE));

        this.imgDone.visible = false;

        // 杜力亚司
        let open3: boolean = true;
        this.imgLock3.visible = !open3;
        if (open3) {
            this.imgType3.source = cachekey(UIConfig.UIConfig_Wonderland.area[6], this);
            this.imgBoardName3.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imgType3.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
            this.imgBoardName3.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }
        this.imgTip3.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FASHION);

        // 寿富拉比
        let open6: boolean = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, false);
        this.groupTime6.visible = open6;
        this.imgLock6.visible = !open6;
        this.imgType6.visible = open6;
        this.lbLevel6.visible = !open6;
        this.lbLevel6.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS).condition);
        if (open6) {
            this.imgType6.source = cachekey(UIConfig.UIConfig_Wonderland.area[4], this);
            this.imgBoardName6.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imgType6.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
            this.imgBoardName6.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);

            this.lbEndTime6.visible = false;
        }
        this.imgTip6.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.ZORK_BOSS);

        // 港口
        let open4: boolean = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, false);
        this.groupTime4.visible = open4;
        this.imgLock4.visible = !open4;
        this.imgType4.visible = open4;
        this.lbLevel4.visible = !open4;
        this.lbLevel4.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND).condition);
        if (open4) {
            this.imgType4.source = cachekey(UIConfig.UIConfig_Wonderland.area[7], this);
            this.imgBoardName4.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imgType4.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
            this.imgBoardName4.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);

            this.lbEndTime4.visible = false;
        }
        this.imgTip4.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.PORT);

        // 山贼老巢
        let open5 = false;
        this.imgLock5.visible = !open5;
        this.imgType5.visible = true;
        this.lbLevel5.visible = false;
        this.imgBoardName5.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        this.imgType5.source = cachekey(UIConfig.UIConfig_Wonderland.area[2], this);
        this.imgTip5.visible = false;

        // 大草原
        let fightInfo = TableWonderland.Item(this.stageType.pk);
        let open2: boolean = (Game.PlayerInfoSystem.BaseInfo.level >= fightInfo.mix_level && Game.PlayerInfoSystem.BaseInfo.level <= fightInfo.max_level);
        this.imgLock2.visible = !open2;
        this.lbLevel2.visible = !open2;
        this.lbLevel2.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, fightInfo.mix_level);
        if (open2) {
            this.imgType2.source = cachekey(UIConfig.UIConfig_Wonderland.area[3], this);
            this.imgBoardName2.source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
        } else {
            this.imgType2.visible = false;
            this.imgBoardName2.source = cachekey(UIConfig.UIConfig_Wonderland.board[2], this);
        }

        this.imgTip2.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FIGHT);

        for (let i = 1; i <= 6; i++) {
            let board = (<eui.Image>this[`imgLock${i}`]).visible;
            let tips = (<eui.Image>this[`imgTip${i}`]).visible;
            let lock = (<eui.Image>this[`imgLock${i}`]).visible;
            this.board.push(board);
            this.tips.push(tips);
            this.lock.push(lock);
        }
    }

    private updateBossInfo() {
        this.imgTip3.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FASHION);

        let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
        if (progress != null) {
            if (this.bossState != progress.info) {
                this.bossState = progress.info;
                this.imgTip6.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.ZORK_BOSS);
            }

            if (progress.leftTime == 0) {
                Game.PlayerZorkSystem.bossInfo();
            }
        }
        Game.PlayerZorkSystem.bossInfo().then(() => { });
        let strTime = progress.leftTime //- Math.floor(egret.getTimer() / 1000);
        let strTimeText = Helper.GetTimeStr(strTime > 0 ? strTime : 0, false);
        if (this.bossState == 0) {
            this.lbEndTime6.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTimeText));
        } else {
            this.lbEndTime6.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTimeText));
        }
    }

    private updatePortInfo() {
        let [bOpen, lastTime] = PlayerDarkSystem.PortOpenTime();
        let strTime: string = Set.timeLeaveSec(lastTime);
        if (!bOpen) {
            this.lbEndTime4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTime));
        } else {
            this.lbEndTime4.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTime));
        }
    }

    private updateFishInfo() {
        if (!this.imgDone.visible && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info != 0 && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.leftTime - Math.floor(egret.getTimer() / 1000) <= 0) {
            this.imgDone.visible = true;
        } else if (this.imgDone.visible && Game.PlayerMixUnitInfoSystem.mixunitinfo.process.info == 0) {
            this.imgDone.visible = false;
        }
    }
    public SetFormatReqOnly() {
        if (Device.isReviewSwitch) {
            this.aa();
        }
        let req = new message.SetFormationRequest();
        let formation = Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1];
        formation.formationType = message.EFormationType.FORMATION_TYPE_WONDERLAND;
        req.body.formations.push(formation);
        Game.Controller.send(req, this.SetFormatOnly_Visit, null, this, false);
    }
    public SetFormatOnly_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
        let response = <message.SetFormationResponse>resp;
        if (response.header.result != 0) {
            toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
            return;
        }
        this.WonderlandEnterReq();
    }
    public WonderlandEnterReq() {
        let req = new message.WonderlandEnterRequest();
        req.body.id = this.teachId == null ? this.info.wonderland_id : this.teachId;
        // req.body.id = this.info.wonderland_id//this.teachId || this.info.wonderland_id;
        Game.PlayerWonderLandSystem.willGoRpg();
        Game.Controller.send(req, this.WonderlandEnter_Visit, null, this, false);
    }
    public WonderlandEnter_Visit(req: aone.AoneRequest, resp: aone.AoneResponse) {
        let response = <message.WonderlandEnterResponse>resp;
        if (response.header.result != 0) {
            toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
            return;
        }
        Game.PlayerWonderLandSystem.OpenwonderlandScene(response);
        Game.PlayerWonderLandSystem.mapBlockIndex = this.info.block_index;
        Game.PlayerWonderLandSystem.wonderlandId = this.teachId == null ? this.info.wonderland_id : this.teachId;
        this.teachId = null;
        // Game.PlayerWonderLandSystem.wonderlandId = this.info.wonderland_id//this.teachId || this.info.wonderland_id
        let MapId = TableWonderland.Item(Game.PlayerWonderLandSystem.wonderlandId).map_id;
        MapSceneLoading.getInstance().loadFightRes(MapId, this.wonderland, this);

        Teach.addTeaching()
    }
    private wonderland() {
        StageSceneManager.Instance.ChangeScene(StageSceneWonderland);
    }
    public info;

    // 安多尼拔   和平仙境
    private onClick1_1() {
        this.onClick(1, 1);
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_2, true)) {
            this.info = TableWonderland.Item(this.stageType.peace);
            this.SetFormatReqOnly();
        }
    }

    private onClick1_2() {
        this.onClick(1, 2);
    }

    private onClick1_3() {
        this.onClick(1, 2);
    }

    // 大草原
    private onClick2_1() {
        // this.onClick(2, 1);
        // loadUI(WonderLandChoose)
        //     .then((dialog: WonderLandChoose) => {
        //         dialog.show();
        //     });
    }

    public onClick2_2() {
        this.onClick(2, 2);
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3, true)) {
            this.info = TableWonderland.Item(this.stageType.pk);
            this.SetFormatReqOnly();
        }
    }

    private onClick2_3() {
        this.onClick(2, 2);
    }

    // 杜力亚司
    private onClick3_1() {
        this.onClick(3, 1);
    }

    private onClick3_2() {
        this.onClick(3, 2);
        // "HXH_FashionMain"
        loadUI(FashionMain)
            .then((dialog: FashionMain) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.init();
            });
    }

    private onClick3_3() {
        this.onClick(3, 2);
    }

    // 港口
    private onClick4_1() {
        this.onClick(4, 1);
    }

    private onClick4_2() {
        this.onClick(4, 2);
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND, true)) {
            loadUI(DarkLandPortMainSence)
                .then((Scene: DarkLandPortMainSence) => {
                    Scene.Init();
                    Scene.show(UI.SHOW_FROM_TOP);
                });
        }
    }

    private onClick4_3() {
        this.onClick(4, 2);
    }

    // 山贼老巢
    private onClick5_1() {
        this.onClick(5, 1);
    }

    private onClick5_2() {
        this.onClick(5, 2);
        toast_warning(LANG(TextsConfig.TextsConfig_Error.wait));
    }

    private onClick5_3() {
        this.onClick(5, 2);
    }

    // 寿富拉比
    public onClick6_1() {
        this.onClick(6, 1);
    }

    public onClick6_2() {
        this.onClick(6, 2);
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS, true)) {
            Game.PlayerZorkSystem.bossInfo().then(() => {
                loadUI(ZorkBossMainPop)
                    .then((scene: ZorkBossMainPop) => {
                        scene.show(UI.SHOW_FROM_TOP);
                    });
            });
        }
    }

    private onClick6_3() {
        this.onClick(6, 2);
    }

    private onClick(index: number, type: number) {
        if (index < 1 || index > 6) return;
        if (type == 1) {
            this[`groupZone${index}`].scaleX = 1.2;
            this[`groupZone${index}`].scaleY = 1.2;

            this[`imgLine${index}`].alpha = 1;
        } else if (type == 2) {
            this[`groupZone${index}`].scaleX = 1;
            this[`groupZone${index}`].scaleY = 1;

            this[`imgLine${index}`].alpha = 0;
        }

    }

    private onBtnClose() {
        this.close(UI.HIDE_TRAIL_OFF);
    }

    private SetTeachOpen() {
        for (let i = 1; i <= 6; i++) {
            (<eui.Image>this[`imgLock${i}`]).visible = false;
            (<eui.Image>this[`imgBoardName${i}`]).source = cachekey(UIConfig.UIConfig_Wonderland.board[1], this);
            (<eui.Image>this[`imgTip${i}`]).visible = false;
        }

    }

    private SetTeachClose() {
        for (let i = 1; i <= 6; i++) {
            let pathIndex = this.board[i - 1] ? 2 : 1;
            (<eui.Image>this[`imgLock${i}`]).visible = this.lock[i];
            (<eui.Image>this[`imgBoardName${i}`]).source = (UIConfig.UIConfig_Wonderland.board[pathIndex]);
            (<eui.Image>this[`imgTip${i}`]).visible = (this.tips[i])
        }
    }

    private CheckTeach() {
        if (Teach.isDone(teachBattle.teachPartID_WONDER_ENTER_1) == true) {
            Teach.CheckAndSetTeach(teachBattle.teachPartID_WONDER_NPC);
        }
    }

    private SetTeach(id: number): string {
        if (id == null) return
        this.teachId = id;
        let name = null;
        if (id == 1) {
            // 和平仙境
            name = "groupZone1";
        }
        else if (id == 4) {
            // 杀戮仙境 进入新手仙境
            name = "groupZone2";
        }
        else if (id == 5) {
            // 杀戮仙境 进入新手仙境
            name = "groupZone5";
        }
        return name;
    }

    private aa() {
        this.serverFormat = Game.PlayerFormationSystem.curFormations[12];
        if (this.serverFormat.generals[0] == 0) {
            this.serverFormat = Game.PlayerFormationSystem.formatsServer[13];
        }
        this.generalList = Game.PlayerHunterSystem.getWonderlandGeneral(this.serverFormat)[0];

        Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
        Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];

        for (let [k, v] of HelpUtil.GetKV(this.generalList)) {
            if (Number(k) < 4) {
                Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
            }
            else {
                Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
            }
        }
    }
}
}