namespace zj {
    /**
     * 战斗力提示
     */
    export class CommonTipBmfont extends UI {

        private groupmain: eui.Group;
        private lableDes: eui.BitmapLabel;
        private oldValue: number = 500000;
        private newValue: number = 999999;
        private vis: boolean = true;
        private time: number = 0;

        public constructor() {
            super();
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;

            this.skinName = "resource/skins/common/Common_TipBmfontSkin.exml";
            this.addEventListener(egret.Event.ACTIVATE, () => {
                this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }, this);
            this.addEventListener(egret.Event.DEACTIVATE, () => {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }, this)
            egret.Tween.get(this).wait(800).call(() => {
                this.addEventListener(egret.Event.ENTER_FRAME, this.update, this);
            });
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this);
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
            }, this);
            this.groupmain.alpha = 1;
            this.touchEnabled = false;
            this.touchChildren = false;
        }

        private setInfo(oldValue, newValue: number) {
            this.oldValue = oldValue;
            this.newValue = newValue;
            this.lableDes.text = "" + this.oldValue;
            if (oldValue > newValue || newValue >= 10000000) {
                this.vis = false;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                this.close();
            }
        }

        private update() {
            this.time++;
            if (this.oldValue == this.newValue) {
                this.groupmain.y -= 3;
                this.groupmain.alpha -= 0.05;
            }
            if (this.time > 2) {
                this.time = 0;
            } else {
                return;
            }

            if (this.vis == true) {
                if (this.oldValue % 10 != this.newValue % 10) {
                    this.oldValue++;
                    if (this.oldValue % 10 > 9) {
                        this.oldValue % 10 === 0;
                    }
                } else if (this.oldValue % 100 != this.newValue % 100) {
                    this.oldValue += 10;
                    if (this.oldValue % 10 > 9) {
                        this.oldValue % 10 === 0;
                    }
                } else if (this.oldValue % 1000 != this.newValue % 1000) {
                    this.oldValue += 100;
                    if (this.oldValue % 100 > 9) {
                        this.oldValue % 100 === 0;
                    }
                } else if (this.oldValue % 10000 != this.newValue % 10000) {
                    this.oldValue += 1000;
                    if (this.oldValue % 1000 > 9) {
                        this.oldValue % 1000 === 0;
                    }

                } else if (this.oldValue % 100000 != this.newValue % 100000) {
                    this.oldValue += 10000;
                    if (this.oldValue % 10000 > 9) {
                        this.oldValue % 10000 === 0;
                    }

                } else if (this.oldValue % 1000000 != this.newValue % 1000000) {
                    this.oldValue += 100000;
                    if (this.oldValue % 100000 > 9) {
                        this.oldValue % 100000 === 0;
                    }
                } else {

                    if (this.groupmain.alpha <= 0) {
                        // this.parent.removeChild(this);
                        this.vis = false;
                        this.removeEventListener(egret.Event.ENTER_FRAME, this.update, this);
                        this.close();
                    }
                }
                this.lableDes.text = "" + this.oldValue;
            }
        }

        /**
         * 战斗力提示
         * @param oldValue 就值
         * @param newValue 新值
         */
        public static promptBattleValue(oldValue: number, newValue) {
            let tip = new CommonTipBmfont();
            tip.setInfo(oldValue, newValue);
            Game.UIManager.AnimationGroup.addChild(tip);
        }
    }

}