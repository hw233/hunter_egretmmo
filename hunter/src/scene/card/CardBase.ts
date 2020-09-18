namespace zj {
    // created by hhh in 2018/11/8

    /************** 卡片界面基类 ****************/

    export class CardBase extends UI {
        private beSelected: boolean = false;
        private beginPosX: number;
        private cardUIwidth: number = 960;

        public constructor() {
            super();

            this.beginPosX = 0;
        }

        private setSelect(selected) {
            if (selected == true && this.beSelected == false) {
                this.aniEnter();
                this.beSelected = true;

                this.loadCardList();
            }
            else if (this.beSelected == true) {
                this.aniExit();
                this.beSelected = false;
            }
        }

        private aniEnter() {
            egret.Tween.get(this)
                .call(() => { this.visible = true; })
                .to({ x: -1 * UIManager.StageWidth }, 0, egret.Ease.sineOut)
                .to({ x: this.beginPosX, alpha: 1 }, 300, egret.Ease.sineOut)
                .call(() => {
                    Game.EventManager.event(GameEvent.SHOW_UI, { typeName: egret.getQualifiedClassName(this) });
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
        }

        private aniExit() {
            egret.Tween.get(this)
                .to({ x: -2 * UIManager.StageWidth, alpha: 0 }, 300, egret.Ease.sineOut)
                .call(() => { this.visible = false; })
                .to({ x: this.beginPosX }, 0)
                .call(() => {
                    Game.EventManager.event(GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(this) });
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
        }

        public loadCardList() { }
    }

}