namespace zj {
    // 背包-物品转化
    // lizhengqiang
    // 2018/11/16

    export class PackagePopChange extends Dialog {
        public groupChange: eui.Group;
        private btnClose: eui.Button;

        // 被转化物品
        private imgFrameL: eui.Image;
        private imgIconL: eui.Image;
        private lbNameL: eui.Label;
        private lbNumL: eui.Label;

        // 转化物品
        private imgFrameR: eui.Image;
        private imgIconR: eui.Image;
        private lbNameR: eui.Label;
        private lbNumR: eui.Label;

        private lbCount: eui.Label;

        private btnSub: eui.Button;
        private btnAdd: eui.Button;
        private btnMax: eui.Button;
        private btnChange: eui.Button;

        private timer: egret.Timer;
        private father: PackageMainScene;
        private itemId: number = 0;
        private composeId: number = 0;
        private count: number = 1;
        private max: number = 0;
        readonly MAXNUM: number = 999;

        public constructor() {
            super();

            this.skinName = "resource/skins/package/PackagePopChangeSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

            this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
            this.btnSub.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSubBegin, this);
            this.btnSub.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnSubEnd, this);

            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnAddBegin, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnAddEnd, this);

            this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                if (this.timer != null) {
                    this.timer.stop();
                    this.timer = null;
                };
            }, null);
        }

        public init(father: PackageMainScene) {
            this.father = father;
            this.itemId = this.father.itemId;

            this.setInfoConvert();
            this.setInfoCount();

            this.timer = new egret.Timer(170, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
        }

        private setInfoConvert() {
            for (let v of Object.keys(TableQuickMall.Table())) {
                if (TableQuickMall.Item(v).consume_type == this.itemId) {
                    this.composeId = TableQuickMall.Item(v).item_id;
                }
            }

            let count1 = Game.PlayerItemSystem.itemCount(this.itemId);
            let count11 = TableQuickMall.Item(this.composeId).consume_num;

            // 被转化物品
            let config1 = PlayerItemSystem.ItemConfig(this.itemId);
            this.imgFrameL.source = cachekey(PlayerItemSystem.ItemFrame(this.itemId), this);
            this.imgIconL.source = cachekey(config1["path"], this);
            this.lbNameL.text = config1["name"];
            this.lbNumL.text = count1 + "/" + count11;
            Set.LabelNumberGreenAndRed(this.lbNumL, count1, count11);

            // 转化物品
            let config2 = PlayerItemSystem.ItemConfig(this.composeId);
            this.imgFrameR.source = cachekey(PlayerItemSystem.ItemFrame(this.composeId), this);
            this.imgIconR.source = cachekey(config2["path"], this);
            this.lbNameR.text = config2["name"];
            this.lbNumR.text = "x1";

            this.max = Math.floor(count1 / count11) > this.MAXNUM ? this.MAXNUM : Math.floor(count1 / count11);
            if (this.max < 1) this.max = 1;

            if (this.max > 100) {
                this.max = 100;
            }
        }

        private setInfoCount() {
            this.lbCount.text = this.count.toString();
        }

        private onTimer() {
            if (this.btnSub.currentState == "down") this.onBtnSub();
            if (this.btnAdd.currentState == "down") this.onBtnAdd();
        }

        private onBtnSub() {
            if (this.count > 1) {
                this.count = this.count - 1;
                this.setInfoCount();
            }
        }

        private onBtnSubBegin() {
            this.timer.start();
        }

        private onBtnSubEnd() {
            this.timer.stop();
        }

        private onBtnAdd() {
            if (this.count < this.max) {
                this.count = this.count + 1;
                this.setInfoCount();
            }
        }

        private onBtnAddBegin() {
            this.timer.start();
        }

        private onBtnAddEnd() {
            this.timer.stop();
        }

        private onBtnMax() {
            this.count = this.max;
            this.setInfoCount();
        }

        private onBtnChange() {
            Game.PlayerItemSystem.quickMall(this.composeId, this.count).then((resp: message.GameInfo) => {
                this.father.update();
                this.onBtnClose();
                setTimeout(() => {
                    loadUI(CommonGetDialog)
                        .then((dialog: CommonGetDialog) => {
                            dialog.init(resp.getGoods);
                            dialog.show();
                        });
                }, 500);

            });
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
            egret.Tween.get(this.father.groupMain).to({ scaleX: 1, scaleY: 1 }, 300);
        }
    }

}