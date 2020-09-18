namespace zj {
// lizhengqiang
// 20190104
export class LeagueInstanceMainItem extends UI {
    private groupGift: eui.Group;
    private groupGift1: eui.Group;
    private groupGift2: eui.Group;
    private groupGift3: eui.Group;
    private groupBox1: eui.Group;
    private imgIcon1: eui.Image;
    private btnBox1: eui.Button;
    private groupAni1: eui.Group;
    private groupBox2: eui.Group;
    private imgIcon2: eui.Image;
    private btnBox2: eui.Button;
    private groupAni2: eui.Group;
    private groupBox3: eui.Group;
    private imgIcon3: eui.Image;
    private btnBox3: eui.Button;
    private groupAni3: eui.Group;
    private groupBoard: eui.Group;
    private imgBack: eui.Image;
    private imgName: eui.Image;
    private imgBurBlood: eui.Image;
    private lbBloodNum: eui.BitmapLabel;
    private imgInBattle: eui.Image;
    private imgKilled: eui.Image;
    private imgCircle: eui.Image;
    private imgCenter: eui.Image;


    private groupGiftY: number;
    private groupBoardY: number;
    private imgCenterY: number;

    private index: number;
    private tblInfo: TableLeagueInstance = null;
    private info: message.LeagueInstanceSimple = null;
    private giftPosition: number[] = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueInstanceMainItemSkin.exml";

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.groupGift); // 因为是循环播放，需要特别处理
        }, null);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.groupBoard); // 因为是循环播放，需要特别处理
        }, null);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.imgCenter); // 因为是循环播放，需要特别处理
        }, null);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            egret.Tween.removeTweens(this.imgCircle); // 因为是循环播放，需要特别处理
        }, null);

        this.groupGiftY = this.groupGift.y;
        this.groupBoardY = this.groupBoard.y;
        this.imgCenterY = this.imgCenter.y;
    }

    public setInfo(id: number, tblInfo: TableLeagueInstance, info: message.LeagueInstanceSimple) {
        this.index = id;
        this.tblInfo = tblInfo;
        this.info = info;
        this.giftPosition = [];
        for (let i = 1; i <= 3; i++) {
            this.giftPosition.push(this[`groupGift${i}`].x);
        }

        this.setUI();
        this.playAnimation(id);
    }

    public freshInfo(id: number, info: message.LeagueInstanceSimple) {
        this.index = id;
        this.info = info;
        this.setUI();
    }

    private setUI() {
        this.imgBurBlood.visible = (this.info != null);
        this.groupBox1.visible = (this.info != null);
        this.groupBox2.visible = (this.info != null);
        this.groupBox3.visible = (this.info != null);
        this.imgName.source = cachekey(UIConfig.UIConfig_League.leagueInstanceName[this.index], this);
        this.lbBloodNum.visible = true;
        if (this.info == null) {
            this.imgBack.source = cachekey(UIConfig.UIConfig_League.leagueInstanceLock, this);
            this.lbBloodNum.visible = false;
            this.imgInBattle.visible = false;
            this.imgKilled.visible = false;
        } else {
            this.imgBack.source = cachekey(this.tblInfo.back_img, this);
            this.imgName.source = cachekey(this.tblInfo.name_img, this);

            let hp = this.info.stageInfos[0].curHp;
            for (let k in this.tblInfo.reward_zone) {
                if (this.info.stageInfos[0].is_win) {
                    break;
                } else if (hp < 1 - this.tblInfo.reward_zone[k]) {
                    this.imgBurBlood.source = cachekey(UIConfig.UIConfig_Format.bossBloodPng[k], this);
                }
            }

            let perect = this.info.stageInfos[0].curHp;
            if (perect > 1) perect = 1;
            this.imgBurBlood.width = this.imgBurBlood.width * perect;
            this.lbBloodNum.text = (perect * 100).toFixed(1) + "%";
            if (this.info.stageInfos[0].battle_time == 0 && this.info.stageInfos[0].memberId == 0) {
                this.imgInBattle.visible = false;
            } else if (this.info.stageInfos[0].battle_time != 0 && this.info.stageInfos[0].memberId == Game.PlayerInfoSystem.BaseInfo.id) {
                this.imgInBattle.visible = false;
            } else {
                if (Game.Controller.curServerTime - this.info.stageInfos[0].battle_time <= CommonConfig.league_instance_battle_duration) {
                    this.imgInBattle.visible = true;
                } else {
                    this.imgInBattle.visible = false;
                }
            }
            this.imgKilled.visible = this.info.stageInfos[0].is_win;
            this.lbBloodNum.visible = !this.info.stageInfos[0].is_win;
            if (this.info.stageInfos[0].is_win) {
                this.groupBoard.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBoss, this);
            } else {
                this.groupBoard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBoss, this);
            }

            this.setGift();
        }
    }

    private setGift() {
        let hp = this.info.stageInfos[0].curHp;
        let giftTbl = [];
        for (let i = 0; i < this.tblInfo.reward_zone.length; i++) {
            if (this.info.stageInfos[0].is_win) {
                giftTbl.push(i);
            } else if (hp <= 1 - this.tblInfo.reward_zone[i]) {
                giftTbl.push(i);
            }
        }

        let mv: message.LegInstRewardInfo = Table.FindR(Game.PlayerLeagueSystem.Member.mobsReward, (k, v) => {
            return v.instanceId == this.index;
        })[0];

        let rewTbl = [];
        if (mv != null) {
            rewTbl = mv.mobsReward;
        }

        let ik = 0;
        while (ik <= giftTbl.length) {
            if (Table.FindK(rewTbl, giftTbl[ik]) != -1) {
                giftTbl.splice(ik, 1);
            } else {
                ik = ik + 1;
            }
        }

        let postionIndex: number = 0;
        for (let i = 0; i < 3; i++) {
            if (Table.FindK(giftTbl, i) != -1) {
                this[`groupBox${i + 1}`].visible = true;
                this[`btnBox${i + 1}`].addEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnBox${i + 1}`], this);
                this[`groupAni${i + 1}`].removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_tongyong_lingqu", "armatureName", null, 0).then(display => {
                    this[`groupAni${i + 1}`].addChild(display);
                }).catch(reason => {
                    toast(reason);
                });
                this[`groupBox${i + 1}`].x = this.giftPosition[postionIndex];
                postionIndex = postionIndex + 1;
            } else {
                this[`groupBox${i + 1}`].visible = false;
                this[`btnBox${i + 1}`].removeEventListener(egret.TouchEvent.TOUCH_TAP, this[`onBtnBox${i + 1}`], this);
            }
        }
    }

    private playAnimation(index: number) {
        let num: number = (index % 2) * 2 - 1;
        egret.Tween.get(this.groupGift)
            .to({ y: this.groupGiftY - 5 * (index % 2 - 1) }, 0);
        egret.Tween.get(this.groupGift, { loop: true })
            .to({ y: this.groupGiftY + 5 * num }, 800)
            .to({ y: this.groupGiftY - 5 * num }, 800)
            .to({ y: this.groupGiftY }, 800);
        egret.Tween.get(this.groupBoard)
            .to({ y: this.groupBoardY - 5 * (index % 2 - 1) }, 0);
        egret.Tween.get(this.groupBoard, { loop: true })
            .to({ y: this.groupBoardY + 5 * num }, 800)
            .to({ y: this.groupBoardY - 5 * num }, 800)
            .to({ y: this.groupBoardY }, 800);

        egret.Tween.get(this.imgCenter)
            .to({ y: this.imgCenterY - 10 * (index % 2 - 1) }, 0)
        egret.Tween.get(this.imgCenter, { loop: true })
            .to({ y: this.imgCenterY + 10 * num }, 800)
            .to({ y: this.imgCenterY - 10 * num }, 800)
            .to({ y: this.imgCenterY }, 800);

        egret.Tween.get(this.imgCircle, { loop: true })
            .to({ scaleX: 1.1, scaleY: 1.1 }, 800)
            .to({ scaleX: 0.9, scaleY: 0.9 }, 800)
            .to({ scaleX: 1, scaleY: 1 }, 800);
    }

    private onClickBoss() {
        let info = Game.PlayerLeagueSystem.Instances;
        if (info.length < this.index) return;
        if (info[this.index - 1].stageInfos[0].battle_time != 0 && Game.PlayerInstanceSystem.curServerTime - info[this.index - 1].stageInfos[0].battle_time <= CommonConfig.league_instance_battle_duration &&
            info[this.index - 1].stageInfos[0].memberId != Game.PlayerInfoSystem.BaseInfo.id) {
            toast_warning(LANG(TextsConfig.TextsConfig_Hunter_League.league_instance_inbattle));
        } else {
            Game.PlayerLeagueSystem.leagueInstance.curInstanceId = info[this.index - 1].instance_id;
            Game.PlayerLeagueSystem.leagueInstanceStageInfo(info[this.index - 1].instance_id).then((msg: message.LeagueInstanceStageInfo) => {
                Game.PlayerStageSystem.insert(msg.stageInfo);
                PlayerStageSystem.stageInfoTbl = [msg.stageInfo];
                Game.PlayerLeagueSystem.leagueInstance.leagueInstanceStageInfo[1] = msg;
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LEAGUE_INSTANCE;
                // "HXH_CommonFormationPveUnion"
                //加载阵型界面
                loadUI(CommonFormatePveMain)
                    .then((dialog: CommonFormatePveMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.index);
                    });
            });
        }
    }

    private onBtnBox1() {
        this.leagueInstanceMobReward(0);
    }

    private onBtnBox2() {
        this.leagueInstanceMobReward(1);
    }

    private onBtnBox3() {
        this.leagueInstanceMobReward(2);
    }

    private leagueInstanceMobReward(pos: number) {
        Game.PlayerLeagueSystem.leagueInstanceMobReward(this.info.instance_id, pos).then((gameInfo: message.GameInfo) => {
            if (gameInfo.getGoods.length > 0) {
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.show();
                        dialog.init(gameInfo.getGoods);
                    });
                this.setGift();
            }
        });
    }


}

}