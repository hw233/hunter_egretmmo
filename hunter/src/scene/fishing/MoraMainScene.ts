namespace zj {
// 猜拳 主界面
// wangshenzhuo
// 2019.05.24
export class MoraMainScene extends Dialog {

    public group1: eui.Group;
    public lbGold: eui.Label;
    public btnAddGold: eui.Button;
    public imgFlagGold: eui.Image;
    public lbGemstone: eui.Label;
    public btnAddGemstone: eui.Button;
    public imgFlagGemstone: eui.Image;
    public buttonClose: eui.Button;
    public groupAniA: eui.Group;
    public groupAniB: eui.Group;
    public groupMid: eui.Group;
    public group2: eui.Group;
    public listEnemy: eui.List;
    public listMy: eui.List;
    public buttonTip: eui.Button;
    public labelMoraNum: eui.Label;
    public labelMoraFreeNum: eui.Label;
    public buttonViewAward: eui.Button;
    public buttonStartMora: eui.Button;
    public group3: eui.Group;
    public imageWinNum: eui.Image;
    public imageLoseNum: eui.Image;
    public listEndMy: eui.List;
    public listEndEnemy: eui.List;
    public listAward: eui.List;
    public buttonMoraAgain: eui.Button;
    public buttonGetAward: eui.Button;
    public imageDemon: eui.Image;
    public labelMoraAgainNum: eui.Label;
    public labelMoraFree: eui.Label;
    public groupTeach: eui.Group;
    public groupList1: eui.Group;
    public groupList2: eui.Group;
    public scroller1: eui.Scroller;
    public scroller2: eui.Scroller;
    public groupWinLose: eui.Group;
    public groupVs: eui.Group;
    public imageRect: eui.Image;

    private TableViewItem: eui.ArrayCollection;

    private MyEndItem: eui.ArrayCollection;
    private MyEndIndex: number = 0;

    private EndEneMyItem: eui.ArrayCollection;
    private EndEneMyIndex: number = 0;

    private listEnemyItem: eui.ArrayCollection;
    private listMyItem: eui.ArrayCollection;

    public game_state = {
        start: 0,
        change: 1,
        finish: 2,
    }

    public result_state = {
        win: 1,
        lose: 2,
        tie: 3,
    }

    public random_value = {
        scissor: 1,
        rock: 2,
        paper: 3,
    }

    public groupNode = [
        this.group1,
        this.group2,
        this.group3,
    ]

    public isRunes: boolean;
    public tag;
    public cost;
    public myMoraResult = [];
    public enemyMoraResult = [];
    public gain_runes_time;
    public change_runes_time;
    public charm_tbl = [];
    public charm_index = [];
    public charm_count;
    public pre_charm_tbl;
    public pre_charm_index;
    public bTeach: boolean = false;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/MoraMainSceneSkin.exml";
        Game.EventManager.on(GameEvent.PLAYER_COIN_CHANGE, this.TokenCoin, this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.TokenCoin, this);
        this.imageRect.visible = false;
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
        this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        this.buttonViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonViewAward, this);
        this.buttonTip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTip, this);
        this.buttonStartMora.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonStartMora, this);
        this.buttonGetAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGetAward, this);
        this.buttonMoraAgain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMoraAgain, this);
    }

    public Init() {

        this.listEndMy.itemRenderer = MoraMainEndWinItem;
        this.MyEndItem = new eui.ArrayCollection();


        this.listEndEnemy.itemRenderer = MoraMainEndLoseItem;
        this.EndEneMyItem = new eui.ArrayCollection();

        if (!((PlayerZorkSystem.moraFormatMy.length != 0) && PlayerZorkSystem.moraFormatEnemy.length != 0)) {
            [PlayerZorkSystem.moraFormatEnemy, PlayerZorkSystem.moraFormatMy] = PlayerZorkSystem.randomHead();
        }
        this.isRunes = Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0;
        if (!this.isRunes) {
            Game.PlayerFormationSystem.InitCharmInfo();
        }

        this.tag = this.isRunes == true && 2 || 1;
        this.cost = null;
        this.myMoraResult = [];    //  我方猜拳结果排列
        this.enemyMoraResult = [];

        this.gain_runes_time = null;
        this.change_runes_time = null;
        this.charm_tbl = [];
        this.charm_index = [];

        this.charm_count = Game.PlayerMixUnitInfoSystem.mixunitinfo.runes;
        this.SetInfo();

        Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "000_zhipai", 0)
            .then((display: dragonBones.EgretArmatureDisplay) => {
                display.x = 0;
                display.y = 0;
                this.groupAniA.addChild(display);
            });

        Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "001_jiantou", 0)
            .then((display: dragonBones.EgretArmatureDisplay) => {
                display.x = 0;
                display.y = 0;
                this.groupAniB.addChild(display);
            });

        if (Teach.isDone(teachBattle.teachPartID_WONDER_ENTER_2) == false) {
            Teach.SetTeachPart(teachBattle.teachPartID_WONDER_ENTER_2);
        }

    }
    
    public isFullScreen(){
        return true;
    }
    
    public onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    public SetInfo() {
        this.SetMoraTimes();
        this.UpdateCharms(this.charm_count);
        this.SetEnemyAndMyPosition();
        this.TokenCoin();
    }

    //猜拳阵容
    public SetEnemyAndMyPosition() {
        this.listEnemy.itemRenderer = MoraMainTeamItem;
        this.listEnemyItem = new eui.ArrayCollection();
        for (let i = 0; i < PlayerZorkSystem.moraFormatEnemy.length; i++) {
            let data = new MoraMainTeamItemData();
            data.father = this;
            data.info = PlayerZorkSystem.moraFormatEnemy[PlayerZorkSystem.moraFormatEnemy.length - 1 - i];
            data.index = PlayerZorkSystem.moraFormatEnemy.length - i;
            this.listEnemyItem.addItem(data);
        }
        this.listEnemy.dataProvider = this.listEnemyItem;

        this.listMy.itemRenderer = MoraMainTeamItem;
        this.listMyItem = new eui.ArrayCollection();
        for (let i = 0; i < PlayerZorkSystem.moraFormatMy.length; i++) {
            let data = new MoraMainTeamItemData();
            data.father = this;
            data.info = PlayerZorkSystem.moraFormatMy[i];
            data.index = i + 1;
            this.listMyItem.addItem(data);
        }
        this.listMy.dataProvider = this.listMyItem;
    }

    public UpdateCharms(info) {
        this.SetNodeShow();
        if (info != null && info != 0) {
            this.dealMoraShowCost();
            this.charm_tbl = Table.DeepCopy(Game.PlayerFormationSystem.curCharmInfos);
            let index = [];
            let id = 0;
            for (const k in this.charm_tbl) {
                const v = this.charm_tbl[k];
                if (v == this.result_state.win) {
                    index[id] = k;
                    id = id + 1;
                }
            }
            this.charm_index = Table.DeepCopy(index);
            // this.dealShowReward();
            this.imageWinNum.source = cachekey(UIConfig.UIConfig_WonderRunes.numberPath[this.charm_count], this);
            this.imageLoseNum.source = cachekey(UIConfig.UIConfig_WonderRunes.numberPath[CommonConfig.gain_runes_number - this.charm_count], this);
            let isEnable = (info != CommonConfig.gain_runes_number);
            this.ChangeCharmEnable(isEnable);
            this.SetInfoUI();
            this.SetListAni();
        } else {
            this.groupMid.removeChildren();
            Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "002_caiquan_daiji", 0)
                .then((display: dragonBones.EgretArmatureDisplay) => {
                    display.x = this.groupMid.width / 2;;
                    display.y = this.groupMid.height / 2;
                    this.groupMid.addChild(display);
                });
        }

    }

    public SetMoraTimes() {
        let level = Game.PlayerInfoSystem.BaseInfo.licenceLevel;
        let tbl = TableLicence.Table();
        this.gain_runes_time = tbl[level].gain_runes_time;
        this.change_runes_time = tbl[level].change_runes_time + PlayerVIPSystem.LowLevel().runes_free_time;

        let can_runes = (this.gain_runes_time - Game.PlayerVIPSystem.vipInfo.gain_runes_time) > 0 && true || false;
        let can_charm = (this.change_runes_time - Game.PlayerVIPSystem.vipInfo.change_runes_time) > 0 && true || false;

        let runesTime = can_runes == true && this.gain_runes_time - Game.PlayerVIPSystem.vipInfo.gain_runes_time || 0;
        let charmTime = can_charm == true && this.change_runes_time - Game.PlayerVIPSystem.vipInfo.change_runes_time || 0;

        let str_runes_id = can_runes == true && 1 || 2;
        let str_charm_id = can_charm == true && 1 || 2;

        let str_runes = Helper.StringFormat(TextsConfig.TextsConfig_Runes.RunesTime[str_runes_id], runesTime, this.gain_runes_time);
        let str_charm = Helper.StringFormat(TextsConfig.TextsConfig_Runes.freeCharm[str_charm_id], charmTime, this.change_runes_time);

        this.labelMoraNum.textFlow = Util.RichText(str_runes);
        this.labelMoraFreeNum.textFlow = Util.RichText(str_charm);

        this.SetInfoCost(can_charm);
    }

    public SetInfoCost(flag) {
        let num_charm = Game.PlayerVIPSystem.vipInfo.change_runes_time - this.change_runes_time;
        if (flag) {
            this.cost = 0;
        } else {
            this.cost = CommonConfig.change_runes_consume(num_charm + 1);
        }
    }

    public SetNodeShow() {
        this.group1.visible = true;
        this.group2.visible = !this.isRunes;
        this.group3.visible = this.isRunes;
        if (this.group3.visible == true) {
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, {isAni: true});
        }
    }

    public dealMoraShowCost() {
        let num_charm = this.change_runes_time - Game.PlayerVIPSystem.vipInfo.change_runes_time > 0;
        let charmTime = this.change_runes_time - Game.PlayerVIPSystem.vipInfo.change_runes_time;
        this.imageDemon.visible = (charmTime <= 0);
        this.labelMoraFree.visible = !(charmTime <= 0);
        this.labelMoraAgainNum.visible = (charmTime <= 0);
        if (charmTime > 0) {
            let str = Helper.StringFormat(TextsConfig.TextsConfig_Runes.CharmLast, charmTime, this.change_runes_time);
            this.labelMoraFree.text = str;
        } else {
            this.SetInfoCost(num_charm);
            this.labelMoraAgainNum.text = this.cost;
        }
    }

    //猜拳奖励内容
    public dealShowReward() {
        if (this.charm_count == null) {
            return;
        }

        let tbl = [];
        if (this.charm_count != 0) {
            tbl = this.GetReward(this.charm_count);
        }

        this.listAward.itemRenderer = MoraMainAwardItemItem;
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < tbl.length; i++) {
            let data = new MoraMainAwardItemItemData();
            data.father = this;
            data.good = tbl[i];
            data.index = i;
            this.TableViewItem.addItem(data);
        }
        this.listAward.dataProvider = this.TableViewItem;
        this.buttonMoraAgain.touchEnabled = true;
    }

    public GetReward(index?) {
        let tbl = PlayerZorkSystem.RewardLevel(this.charm_count);
        return tbl;
    }

    public ChangeCharmEnable(enable) {
        if (enable) {
            this.buttonMoraAgain.enabled = true;
        } else {
            this.buttonMoraAgain.enabled = false;
        }
    }

    public SetInfoUI() {
        let tbl = [];
        let index = [];
        let numWin = this.result_state.win;
        let has_save = Table.FindF(Game.PlayerFormationSystem.curCharmInfos, function (k, v) {
            return v == numWin;
        })
        if (has_save) {
            tbl = Table.DeepCopy(Game.PlayerFormationSystem.curCharmInfos);
        } else {
            [tbl, index] = this.CharmLoi(this.charm_count);
            Game.PlayerFormationSystem.curCharmInfos = Table.DeepCopy(tbl);
            this.SaveCharm(Game.PlayerFormationSystem.curCharmInfos)
            this.charm_tbl = Table.DeepCopy(tbl);
            this.charm_index = Table.DeepCopy(index);
        }

        for (let i = 0; i < 6; i++) {
            let is_win = this.charm_tbl[i] == 1 && 1 || 2;
            let my_mora = Math.floor(Math.random() * 3) + 1;
            let enemy_mora = this.findOppositeGesture(my_mora, is_win);

            let data = new MoraMainEndWinItemData();
            data.father = this;
            data.good = PlayerZorkSystem.moraFormatMy[i];
            data.index = i;
            data.mora = my_mora;
            data.isshow = this.charm_tbl[i] == 1;
            data.isTween = false;
            this.MyEndItem.addItem(data);
            this.myMoraResult[i] = data;


            let Losedata = new MoraMainEndLoseItemData();
            Losedata.father = this;
            Losedata.good = PlayerZorkSystem.moraFormatEnemy[i];
            Losedata.index = i;
            Losedata.mora = enemy_mora;
            Losedata.isshow = !(this.charm_tbl[i] == 1);
            Losedata.isTween = false;
            this.EndEneMyItem.addItem(Losedata);
            this.enemyMoraResult[i] = Losedata;

        }

        this.listEndMy.dataProvider = this.MyEndItem;
        this.MyEndIndex = this.listEndMy.selectedIndex;

        this.listEndEnemy.dataProvider = this.EndEneMyItem;
        this.EndEneMyIndex = this.listEndEnemy.selectedIndex;
    }

    public findOppositeGesture(gesture, state) {
        let oppoSite = null;
        let num = 3;
        if (state == this.result_state.tie) {
            oppoSite = gesture;
        } else if (state == this.result_state.win) {
            oppoSite = gesture % num + 1;
        } else if (state == this.result_state.lose) {
            oppoSite = (1 + num) * num / 2 - gesture - (gesture % num + 1);
        }
        return oppoSite;
    }

    public CharmLoi(count) {
        let tbl = [];

        if (this.tag == 2) {
            tbl = Table.DeepCopy(this.charm_tbl);
            this.pre_charm_tbl = Table.DeepCopy(this.charm_tbl);
            this.pre_charm_index = Table.DeepCopy(this.charm_index);
            let recount = count - this.pre_charm_index.length;
            if (recount <= 0) {
                let a = 0;
            } else {
                this.charm_tbl = Table.DeepCopy(Game.PlayerFormationSystem.curCharmInfos);
                for (let i = 0; i < recount; i++) {
                    let dis_prize = [];
                    for (const k in this.charm_tbl) {
                        const v = this.charm_tbl[k];
                        if (v != this.result_state.win) {
                            dis_prize.push(k);
                        }
                    }
                    if (dis_prize != null) {
                        let posit = Math.floor(Math.random() * dis_prize.length);
                        tbl[dis_prize[posit]] = this.result_state.win;
                    }
                    this.charm_tbl = Table.DeepCopy(tbl);
                }
                for (const k in this.charm_tbl) {
                    const v = this.charm_tbl[k];
                    if (v != this.result_state.win) {
                        tbl[k] = this.result_state.lose;
                    }
                }
            }
        } else {
            this.pre_charm_tbl = [];
            this.pre_charm_index = [];
            for (let i = 0; i < CommonConfig.gain_runes_number - count; i++) {
                tbl[i] = this.result_state.lose;
            }
            for (let j = 0; j < count; j++) {
                let randNum = Math.floor(Math.random() * (tbl.length + 1));
                tbl.splice(randNum, 0, this.result_state.win);
            }
        }
        let index = [];
        let id = 0;
        for (const k in tbl) {
            const v = tbl[k];
            if (v == this.result_state.win) {
                index[id] = k;
                id = id + 1;
            }
        }
        return [tbl, index];
    }


    private GainRunes_Req(isNovice) {
        this.imageRect.visible = true;
        PlayerZorkSystem.GainRunesReqBody_Visit().then((data: message.GainRunesResponse) => {
            this.groupWinLose.visible = false;
            this.groupVs.visible = false;
            this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
            this.dealUpdate(1);
        }).catch((reason) => {
            this.imageRect.visible = false;
        });
        // Teach.addTeaching();
    }

    public dealUpdate(index) {
        if (index == 1) {
            this.tag = 1;
            this.isRunes = true;
            this.UpdateCharm(this.charm_count);
            this.SetInfoAni(true);
        } else if (index == 2) {
            this.tag = 2;
            this.UpdateCharm(this.charm_count);
            this.SetInfoAni(false);
        } else if (index == 3) {
            this.isRunes = false;
            this.UpdateCharm();
            this.dealShowReward();
        }
    }

    public UpdateCharm(info?) {
        if (info != null) {
            this.dealMoraShowCost();
            this.dealShowCharm();
        } else {
            return;
        }
    }

    public dealShowCharm() {
        [this.charm_tbl, this.charm_index] = this.CharmLoi(this.charm_count);
        this.SaveCharm(this.charm_tbl);
    }

    public SetInfoAni(enable) {
        if (enable) {
            this.groupMid.removeChildren();
            Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "003_caiquan_jihuo", 1)
                .then((display: dragonBones.EgretArmatureDisplay) => {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, () => {
                        if (display.parent) display.parent.removeChild(display);
                        this.SetNodeShow();
                        this.groupWinLose.visible = false;
                        egret.Tween.get(this.groupVs)
                            .to({ visible: true }, 0)
                            .to({ scaleX: 0.8 }, 0)
                            .to({ scaleY: 0.8 }, 0)
                            .to({ scaleX: 1, scaleY: 1 }, 150).call(() => {
                                this.SetInfoMoraProcess();
                            })
                    }, this)
                    display.x = this.groupMid.width / 2;;
                    display.y = this.groupMid.height / 2;

                    this.groupMid.addChild(display);
                });
        } else {
            this.SetInfoMoraProcess();
        }

    }

    private SetInfoMoraProcess() {
        if (this.myMoraResult.length > 0 && this.enemyMoraResult.length > 0) {
            let need_change = [];
            for (let i = 0; i < 6; i++) {
                let find = Table.FindF(this.pre_charm_index, function (k, v) {
                    return v == i;
                })
                if (!find) {
                    need_change.push(i);
                }
            }

            for (let i = 0; i < need_change.length; i++) {
                let is_win = this.charm_tbl[need_change[i] == 1 && 1 || 2];
                let my_mora = Math.floor(Math.random() * 3) + 1;
                let enemy_mora = this.findOppositeGesture(my_mora, is_win);

                let aa = this.listEndMy.getElementAt(need_change[i]) as MoraMainEndWinItem;
                aa.groupMain.visible = false;
                aa.SetItemInfo(need_change[i], my_mora, this.charm_tbl[need_change[i]] == 1, PlayerZorkSystem.moraFormatMy[need_change[i]]);
                egret.Tween.get(aa.groupMain).wait(210 * (i + 1))
                    .to({ visible: true }, 0)
                    .to({ x: -350 }, 0)
                    .to({ x: 0 }, 200, egret.Ease.sineInOut);

                let bb = this.listEndEnemy.getElementAt(need_change[i]) as MoraMainEndLoseItem;
                bb.groupMain.visible = false;
                // bb.SetInfoTween(need_change[i], true);
                bb.SetItemInfo(need_change[i], enemy_mora, !(this.charm_tbl[need_change[i]] == 1), PlayerZorkSystem.moraFormatEnemy[need_change[i]]);
                egret.Tween.get(bb.groupMain).wait((i + 1) * 210)
                    .to({ visible: true }, 0)
                    .to({ x: 350 }, 0)
                    .to({ x: 0 }, 200, egret.Ease.sineInOut);

                egret.Tween.get(this.groupWinLose).wait(220 * need_change.length)
                    .to({ visible: true }, 0)
                    .to({ scaleX: 0.8, scaleY: 0.8 }, 0)
                    .to({ scaleX: 1, scaleY: 1 }, 150).call(() => {
                        this.SetListAni();
                        this.imageRect.visible = false;
                    })
            }

        } else {
            for (let i = 0; i < 6; i++) {
                let is_win = this.charm_tbl[i] == 1 && 1 || 2;
                let my_mora = Math.floor(Math.random() * 3) + 1;
                let enemy_mora = this.findOppositeGesture(my_mora, is_win);

                let data = new MoraMainEndWinItemData();
                data.father = this;
                data.good = PlayerZorkSystem.moraFormatMy[i];
                data.index = i;
                data.mora = my_mora;
                data.isshow = this.charm_tbl[i] == 1;
                data.isTween = true;
                this.MyEndItem.addItem(data);
                this.myMoraResult[i] = data;

                let Losedata = new MoraMainEndLoseItemData();
                Losedata.father = this;
                Losedata.good = PlayerZorkSystem.moraFormatEnemy[i];
                Losedata.index = i;
                Losedata.mora = enemy_mora;
                Losedata.isshow = !(this.charm_tbl[i] == 1);
                Losedata.isTween = true;
                this.EndEneMyItem.addItem(Losedata);
                this.enemyMoraResult[i] = Losedata;
                // this.listMy.getElementAt(1)
            }
            this.listEndMy.dataProvider = this.MyEndItem;
            this.MyEndIndex = this.listEndMy.selectedIndex;

            this.listEndEnemy.dataProvider = this.EndEneMyItem;
            this.EndEneMyIndex = this.listEndEnemy.selectedIndex;

            egret.Tween.get(this.groupWinLose).wait(1260)
                .to({ visible: true }, 0)
                .to({ scaleX: 0.8, scaleY: 0.8 }, 0)
                .to({ scaleX: 1, scaleY: 1 }, 150).call(() => {
                    this.SetListAni();
                    this.imageRect.visible = false;
                })

        }
        let isEnable = (this.charm_count != CommonConfig.gain_runes_number);
        this.ChangeCharmEnable(isEnable);
    }

    public SetListAni() {
        this.dealShowReward();
        this.imageWinNum.source = cachekey(UIConfig.UIConfig_WonderRunes.numberPath[this.charm_count], this);
        this.imageLoseNum.source = cachekey(UIConfig.UIConfig_WonderRunes.numberPath[CommonConfig.gain_runes_number - this.charm_count], this);
    }

    public SetShowInfo() {
        for (let i = 0; i < 6; i++) {
            let aa = this.listEndMy.getElementAt(i) as MoraMainEndWinItem;
            aa.groupMain.visible = false;

            let bb = this.listEndEnemy.getElementAt(i) as MoraMainEndLoseItem;
            bb.groupMain.visible = false;
        }
    }


    //领取奖励
    private onButtonGetAward() {
        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0) {
            if ((this.charm_count == CommonConfig.gain_runes_number) || this.bTeach == true) {
                this.ReqGetReward();
            } else {
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Runes.Get, () => { this.ReqGetReward() })
            }
        } else {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Runes.AlreadyGet);
        }
    }

    public ReqGetReward(isNovice?) {
        if (isNovice == null) {
            isNovice = false;
        }
        let isget: boolean = (this.bTeach == true);
        PlayerZorkSystem.RunesRewardReqBody_Visit(isget).then((data: message.RunesRewardResponse) => {
            if (data.header.result == 0) {
                this.SetShowInfo();
                PlayerZorkSystem.moraFormatEnemy = [];
                PlayerZorkSystem.moraFormatMy = [];
                [PlayerZorkSystem.moraFormatEnemy, PlayerZorkSystem.moraFormatMy] = PlayerZorkSystem.randomHead();
                this.myMoraResult = [];
                this.enemyMoraResult = [];
                this.MyEndItem.removeAll();
                this.EndEneMyItem.removeAll();

                this.charm_tbl = [];
                this.charm_index = [];
                if (this.isRunes) {
                    this.isRunes = false;
                    this.SetNodeShow();
                    this.groupMid.removeChildren();
                    Game.DragonBonesManager.playAnimation(this, "ui_tanlanzhidao_caiquan_eff", "armatureName", "002_caiquan_daiji", 0)
                        .then((display: dragonBones.EgretArmatureDisplay) => {
                            display.x = this.groupMid.width / 2;;
                            display.y = this.groupMid.height / 2;
                            this.groupMid.addChild(display);
                        });
                    this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
                    this.dealUpdate(3);
                    this.SetEnemyAndMyPosition();
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(() => { this.SetMoraTimes() })
                        })
                }
            } else if (data.header.result == 10295) {
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Runes.ReLogin, () => { Game.PlayerFormationSystem.InitCharmInfo() })
            } else if (data.header.result == message.EC.XG_LACK_TOKEN) {
                this.onBtnAddGemstone();
            } else {

            }
        }).catch(reason => { });

    }

    //重新猜拳
    public onButtonMoraAgain() {
        this.imageRect.visible = true;
        if (Game.PlayerMixUnitInfoSystem.mixunitinfo.runes != 0) {
            this.ChangeCharmReq();
        } else {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Runes.AlreadyGet);
            this.imageRect.visible = false;
        }
    }

    public SetTeach() {
        this.bTeach = true;
    }

    public ChangeCharmReq() {
        let isdown = (this.bTeach == true);
        PlayerZorkSystem.ChangeRunesReqBody_Visit(isdown).then((data: message.ChangeRunesResponse) => {
            // if (data.header.result == 0) {
            this.charm_count = data.body.gameInfo.mixUnitInfo[0].runes;
            this.groupWinLose.visible = false;
            this.dealUpdate(2);
            // } else 
        }).catch((reason) => {
            if (reason == 10295) {
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Runes.AlreadyGet, () => { Game.PlayerFormationSystem.InitCharmInfo() })
            } else if (reason == message.EC.XG_LACK_TOKEN) {
                TipManager.ShowAddGemStone();
            }
            this.imageRect.visible = false;
        });
    }


    // 跳转-- 查看奖励
    private onButtonViewAward() {
        loadUI(MoraMainAwardDialog)
            .then((dialog: MoraMainAwardDialog) => {
                dialog.SetInfo();
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    //跳转规则
    private onButtonTip() {
        loadUI(Common_RuleDialog)
            .then((dialog: Common_RuleDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
                dialog.init(RuleConfig.runes);
            });
    }

    //开始猜拳
    public onButtonStartMora() {
        this.GainRunes_Req(false);
    }

    //加钻石
    private onBtnAddGemstone() {
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    //加金币
    private onBtnAddGold() {
        loadUI(HelpGoldDialog)
            .then((dialog: HelpGoldDialog) => {
                dialog.SetInfoList();
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    public SaveCharm(tbl) {
        let formatInfo = this.getFormationInfoStreet(tbl);
        Game.PlayerFormationSystem.curCharmInfosMap.push(formatInfo);
        let msg = JSON.stringify(Game.PlayerFormationSystem.curCharmInfosMap);
        let roletext = Game.Controller.roleID() + "charms";
        egret.localStorage.setItem(roletext, msg);
    }

    private getFormationInfoStreet(tbl) {
        for (let i = 0; i < tbl.length; i++) {
            Game.PlayerFormationSystem.curCharmInfos[i] = tbl[i];
        }
        let formats = [];
        for (let k = 0; k < Game.PlayerFormationSystem.curCharmInfos.length; k++) {
            let v = Game.PlayerFormationSystem.curCharmInfos[k];
            formats.push(v);
        }
        let msg = [];

        msg = formats;

        return msg;
    }

    public TokenCoin() {

        if (Game.PlayerInfoSystem.Coin > 100000) {
            if (((Game.PlayerInfoSystem.Coin / 1000) >>> 0) % 10 == 0) {
                this.lbGold.text = ((Game.PlayerInfoSystem.Coin / 10000) >>> 0) + "万";
            } else {
                this.lbGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
        } else {
            this.lbGold.text = Game.PlayerInfoSystem.Coin.toString();
        }
        if (this.lbGold.text.length > 6) {
            this.lbGold.size = 12;
        } else {
            this.lbGold.size = 16;
        }

        if (Game.PlayerInfoSystem.Token > 100000) {
            if (((Game.PlayerInfoSystem.Token / 1000) >>> 0) % 10 == 0) {
                this.lbGemstone.text = ((Game.PlayerInfoSystem.Token / 10000) >>> 0) + "万";
            } else {
                this.lbGemstone.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
        } else {
            this.lbGemstone.text = Game.PlayerInfoSystem.Token.toString();
        }
        if (this.lbGemstone.text.length > 6) {
            this.lbGemstone.size = 12;
        } else {
            this.lbGemstone.size = 16;
        }
    }

}
}