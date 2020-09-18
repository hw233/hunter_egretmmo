namespace zj {
    // 福利-领取体力
    // lizhengqiang
    // 20190322
    export class ActivitySpecialGetPower extends UI {
        public imgFood1: eui.Image;
        public imgFood2: eui.Image;
        public imgFood3: eui.Image;
        public lbPower1: eui.Label;
        public lbTime1: eui.Label;
        public imgGet1: eui.Image;
        public btnGet1: eui.Button;
        public btnBuy1: eui.Button;
        public lbNum1: eui.BitmapLabel;
        public imgZuan1: eui.Image;
        public lbPower2: eui.Label;
        public lbTime2: eui.Label;
        public imgGet2: eui.Image;
        public btnGet2: eui.Button;
        public btnBuy2: eui.Button;
        public lbNum2: eui.BitmapLabel;
        public imgZuan2: eui.Image;
        public lbPower3: eui.Label;
        public lbTime3: eui.Label;
        public imgGet3: eui.Image;
        public btnGet3: eui.Button;
        public btnBuy3: eui.Button;
        public lbNum3: eui.BitmapLabel;
        public imgZuan3: eui.Image;

        private getIndex: number;
        private powerIndex: number;
        private groupTalkY: number;

        public constructor() {
            super();
            this.skinName = "resource/skins/activity/ActivitySpecialGetPowerSkin.exml";
            this.btnGet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet1, this);
            this.btnGet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet2, this);
            this.btnGet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet3, this);
            this.btnBuy1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy1, this);
            this.btnBuy2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy2, this);
            this.btnBuy3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy3, this);
        }

        public init() {
            let canGet = CommonConfig.recieve_instance_power_info;
            let getTime = CommonConfig.recieve_instance_power_time;

            for (let i = 0; i < canGet.length; i++) {
                let str: string = "0";
                if (i != 2) {
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Award.GetPowerTime, Math.floor(getTime[canGet[i] - 1] / 3600), Math.floor(getTime[canGet[i]] / 3600 + 1));
                } else {
                    str = Helper.StringFormat(TextsConfig.TextsConfig_Award.GetPowerTime, Math.floor(getTime[canGet[i] - 1] / 3600), Math.floor(getTime[canGet[i]] / 3600));
                }
                this[`lbTime${i + 1}`].text = str;
            }
            this.setInfo();
        }

        private setInfo() {
            let rewardProgress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INSTANCE_POWER];
            let canGet = CommonConfig.recieve_instance_power_info;
            let info = rewardProgress.info;
            let powerCount = CommonConfig.recieve_instance_power_count;
            let powerConsume = CommonConfig.recieve_instance_power_consume;
            let getReward = Game.PlayerMixUnitInfoSystem.mixunitinfo.instancePower;
            for (let i = 0; i < canGet.length; i++) {
                let isGet: boolean = Table.FindF(getReward, function (k, v) {
                    return v == canGet[i];
                });

                this[`lbPower${i + 1}`].text = Helper.StringFormat(TextsConfig.TextsConfig_Friend.getPower, powerCount[i]);
                this[`lbNum${i + 1}`].text = powerConsume[i];
                if (rewardProgress.leftTime != 0 && info == canGet[i] && !isGet) {
                    this[`btnGet${i + 1}`].visible = true;
                    this[`btnBuy${i + 1}`].visible = false;
                    this[`imgZuan${i + 1}`].visible = false;
                    this[`imgGet${i + 1}`].visible = false;
                    this[`lbNum${i + 1}`].visible = false;
                    this[`imgFood${i + 1}`].source = UIConfig.UIConfig_Special.foodNor[i + 1];
                } else if (rewardProgress.leftTime != 0 && info > canGet[i] && !isGet) {
                    this[`btnGet${i + 1}`].visible = false;
                    this[`btnBuy${i + 1}`].visible = true;
                    this[`imgZuan${i + 1}`].visible = true;
                    this[`imgGet${i + 1}`].visible = false;
                    this[`lbNum${i + 1}`].visible = true;
                    this[`imgFood${i + 1}`].source = UIConfig.UIConfig_Special.foodNor[i + 1];
                } else if (rewardProgress.leftTime != 0 && isGet) {
                    this[`btnGet${i + 1}`].visible = false;
                    this[`btnBuy${i + 1}`].visible = false;
                    this[`imgZuan${i + 1}`].visible = false;
                    this[`imgGet${i + 1}`].visible = true;
                    this[`lbNum${i + 1}`].visible = false;
                    this[`imgFood${i + 1}`].source = UIConfig.UIConfig_Special.foodDis[i + 1];
                } else {
                    this[`btnGet${i + 1}`].visible = true;
                    this[`btnBuy${i + 1}`].visible = false;
                    this[`imgZuan${i + 1}`].visible = false;
                    this[`imgGet${i + 1}`].visible = false;
                    this[`lbNum${i + 1}`].visible = false;
                    this[`imgFood${i + 1}`].source = UIConfig.UIConfig_Special.foodNor[i + 1];

                    this[`btnGet${i + 1}`].currentState = "disabled";
                }
            }

            let list = [];
            for (let v of canGet) {
                if (v <= info) {
                    list.push(v);
                }
            }
        }

        private onBtnGet1() {
            this.onBtnBuy1();
        }

        private onBtnGet2() {
            this.onBtnBuy2();
        }

        private onBtnGet3() {
            this.onBtnBuy3();
        }

        private onBtnBuy1() {
            this.getIndex = CommonConfig.recieve_instance_power_info[0];
            this.powerIndex = 0;
            this.recievePower();
        }

        private onBtnBuy2() {
            this.getIndex = CommonConfig.recieve_instance_power_info[1];
            this.powerIndex = 1;
            this.recievePower();
        }

        private onBtnBuy3() {
            this.getIndex = CommonConfig.recieve_instance_power_info[2];
            this.powerIndex = 2;
            this.recievePower();
        }

        private recievePower() {
            Game.PlayerActivitySystem.recievePower(this.getIndex).then(() => {
                this.setInfo();
                let power: string = "+" + CommonConfig.recieve_instance_power_count[this.powerIndex];
                let source: string = PlayerItemSystem.ItemPath(message.EResourceType.RESOURCE_POWER);

                Game.EventManager.event(GameEvent.SHOW_COMMON_MESSAGE, { source: source, text: power });
                Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
            }).catch((result) => {
                if (result == message.EC.XG_LACK_TOKEN) {
                    loadUI(ConfirmCancelDialog)
                        .then((dialog: ConfirmCancelDialog) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(TextsConfig.TextsConfig_Money.demstone);
                            dialog.setCB(this.addStone);
                        });
                } else {
                    toast_warning(Game.ConfigManager.getAone2CodeReason(result));
                }
            });
        }

        private addStone = () => {
            loadUI(PayMallScene)
                .then((scene: PayMallScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.init();
                });
        }

    }
}