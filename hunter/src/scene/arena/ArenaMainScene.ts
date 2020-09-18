namespace zj {
    /** 
     * @author xingliwei
     * 
     * @date 2019-1-23
     * 
     * @class 格斗场主界面
     */
    export class ArenaMainScene extends Scene {
        private btnClose: eui.Button;
        private btnAddGemsTone: eui.Button;
        private labelGemsToneNumber: eui.Label;
        private btnLadder: eui.Button;
        private labelLadder: eui.Label;
        private imgTipLadder: eui.Image;
        private btnPK: eui.Button;
        private labelPK: eui.Label;
        private imgTipPK: eui.Image;
        private imgbg: eui.Image;
        private groupPK: eui.Group;
        /**本服列表数据 */
        public static roleFormationInfo: Array<message.SimpleRoleFormationInfo>;
        private update: number;
        private jewel: eui.Image;

        constructor() {
            super();
            this.skinName = "resource/skins/arena/ArenaMainSceneSkin.exml";

            this.init();
            if (this.imgbg.width < UIManager.StageWidth) {
                this.imgbg.width = UIManager.StageWidth;
            }
            this.refresh();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.clearInterval(this.update);
            }, this);
            this.update = egret.setInterval(this.Update, this, 2000);
            this.Update();
        }
        private Update() {
            this.refresh();
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnLadder.addEventListener(tap, this.onBtnLadder, this);
            this.btnPK.addEventListener(tap, this.onBtnPK, this);
            this.btnAddGemsTone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            let progressMap = [];
            for (var v in message.EProcessType) {
                if (message.EProcessType.hasOwnProperty(v)) {
                    var k = message.EProcessType[v];
                    if (Number(k) != message.EProcessType.PROCESS_TYPE_NONO) {
                        // let prog = 
                    }
                }
            }
            Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.refresh, this);
            // let process = PlayerArenaSystem
            // message.EProcessType
            this.setInfo();
            if (Device.isReviewSwitch) {
                this.groupPK.visible = false;
                this.jewel.x = 8;
                this.jewel.y = 0;
                this.jewel.width = 40;
                this.jewel.height = 40;

                this.btnAddGemsTone.x = 100;
                this.btnAddGemsTone.y = 3;
                this.btnAddGemsTone.width = 30;
                this.btnAddGemsTone.height = 30;

                this.labelGemsToneNumber.width = 85;
            }
        }

        private refresh() {
            let ladderTipVisible = Tips.getTipsOfMail(message.MailType.MAIL_TYPE_LADDER) || Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_MALL) || Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.LADDER_FIGHT);
            this.imgTipLadder.visible = ladderTipVisible;

            let pkTipVisible = Tips.GetTipsOfId(Tips.TAG.LADDER, Tips.TAG.CHARGE_CHALLENGE) || Tips.getTipsOfMail(message.MailType.MAIL_TYPE_SINGLECRAFT);
            this.imgTipPK.visible = pkTipVisible;

            let tokenStr = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
            this.labelGemsToneNumber.text = tokenStr;

            let vipInfo = Game.PlayerVIPSystem.vipInfo;
            let max = CommonConfig.ladder_challenge_time;
            let currrent = vipInfo.buyPvpPower + max - vipInfo.pvpPower;
            this.labelLadder.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.ladderLeft, currrent, max);

            if (this.labelGemsToneNumber.width < 80) {
                this.labelGemsToneNumber.width = 80;
            }

            let canOpen = PlayerMissionSystem.FunOpenTo(FUNC.SINGLE);
            let conditionLevel = TableFunctionOpen.Item(FUNC.SINGLE).condition;
            if (canOpen && conditionLevel <= Game.PlayerInfoSystem.Level) {
                let process = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
                if (process == null) return;

                let time = process.leftTime;
                let state = process.info % 10;

                if (state == message.CraftStateType.CRAFT_STATE_TYPE_NONO) { // 未参加本轮跨服战
                    this.labelPK.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.nextOpenTime, Math.floor(time / (3600 * 24) + 1)));
                } else {
                    if (state == message.CraftStateType.CRAFT_STATE_TYPE_FIGHTING) { // 战斗阶段
                        let licenceInfo = TableLicence.Item(Game.PlayerInfoSystem.BaseInfo.licenceLevel);

                        let remainTimes = licenceInfo.singlecraft_free + (vipInfo.craft_buy * CommonConfig.singlecraft_buy_time) - vipInfo.craft_time;
                        let maxTimes = licenceInfo.singlecraft_free;

                        this.labelPK.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.pkLeft, remainTimes, maxTimes));

                    } else if (state == message.CraftStateType.CRAFT_STATE_TYPE_FINISH || state == message.CraftStateType.CRAFT_STATE_TYPE_READY) { // 结束阶段
                        this.labelPK.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.nextOpenTimes, (Math.floor(time / (3600) + 1))));
                    }
                }
            } else {
                this.labelPK.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Pk.open, conditionLevel));
            }

        }

        private setInfo() {
            let process = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SINGLECRAFT];
            let state = false;
            if (process != null) {
                state = process.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_NONO && process.info % 10 != message.CraftStateType.CRAFT_STATE_TYPE_READY;
            }
            this.btnLadder.enabled = (PlayerMissionSystem.FunOpenTo(FUNC.ARENA));
            this.btnPK.enabled = (PlayerMissionSystem.FunOpenTo(FUNC.SINGLE) && state);

            let cur = Game.PlayerVIPSystem.vipInfo.buyPvpPower * CommonConfig.ladder_challenge_time + CommonConfig.ladder_challenge_time - Game.PlayerVIPSystem.vipInfo.pvpPower;
            let max = CommonConfig.ladder_challenge_time;
            this.labelLadder.text = Helper.StringFormat(TextsConfig.TextsConfig_Arena.ladderLeft, cur, max)
        }

        private onBtnLadder() {
            loadUI(ArenaLadder).then((dialog: ArenaLadder) => {
                // if (ArenaMainScene.roleFormationInfo == null) {
                Game.PlayerArenaSystem.ladderList(false).then((data: any) => {
                    ArenaMainScene.roleFormationInfo = data;
                    dialog.setInfo(data, () => {
                        this.refresh();
                    });
                    dialog.show(UI.SHOW_FROM_TOP);
                });
                // } else {
                //     dialog.setInfo(ArenaMainScene.roleFormationInfo, () => {
                //         this.refresh();
                //     });
                //     dialog.show(UI.SHOW_FROM_TOP);
                // }

            });
        }

        private onBtnAddGemstone() {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init(false);
                });
        }

        /**点击进入跨服格斗场 */
        private onBtnPK() {
            Game.PlayerArenaSystem.craftQureyList(false)
                .then(() => {
                    loadUI(ArenaWhole).then((dialog: ArenaWhole) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
                })
                .catch((reason) => {
                    toast(reason);
                });
        }

        private async onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }
    }

}