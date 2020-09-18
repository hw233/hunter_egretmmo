namespace zj {
    // lizhengqiang
    // 2018/11/27
    // 获得体力/金币
    export class CommonMessage extends Dialog {
        private groupMain: eui.Group;
        private imgIcon: eui.Image;
        private lbadd: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/CommonMessageSkin.exml";
        }

        public init(source: string, text: string, scaleX: number = 1, scaleY: number = 1, isTween: boolean = true) {
            this.horizontalCenter = 0;
            this.verticalCenter = 0;

            this.imgIcon.source = cachekey(source, this);
            this.imgIcon.scaleX = scaleX;
            this.imgIcon.scaleY = scaleY;

            this.lbadd.text = text;

            if (!isTween) {
                this.imgIcon.right = this.width / 2;
                this.lbadd.left = this.width / 2;
            } else {
                this.imgIcon.right = UIManager.StageWidth;
                egret.Tween.get(this.imgIcon)
                    // .to({ x: -this.imgIcon.width })
                    .to({ right: this.width / 2 }, 260)
                    .call(() => {
                        egret.Tween.removeTweens(this.imgIcon)
                    });
                this.lbadd.left = UIManager.StageWidth;
                egret.Tween.get(this.lbadd)
                    // .to({ x: UIManager.StageWidth })
                    .to({ left: this.width / 2 }, 260)
                    .call(() => {
                        egret.Tween.removeTweens(this.lbadd)
                    });
            }

            egret.Tween.get(this.groupMain)
                .wait(800).to({ y: - UIManager.StageHeight }, 300, egret.Ease.circIn)
                .call(() => {
                    egret.Tween.removeTweens(this.groupMain)
                    this.close();
                });
        }
    }

}