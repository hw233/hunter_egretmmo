namespace zj {
    export class CommonBossSkillItem extends eui.ItemRenderer {
        public imgFrame: eui.Image;
        public imgIcon: eui.Image;
        public uiTip: CommonDesTalents;
        public isBegin = false;

        constructor() {
            super();
            this.skinName = "resource/skins/common/CommonBossSkillItemSkin.exml";
            cachekeys(<string[]>UIResource["CommonBossSkillItem"], null);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.down, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
            }, null);
        }

        public onAddToStage() {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        }

        public dataChanged() {
            let info = TableClientWantedMobsFeature.Item(this.data.mobId);
            let frame = PlayerItemSystem.QualityFrame(info.quality);

            this.imgIcon.source = cachekey(info.path, this);
            this.imgFrame.source = cachekey(frame, this);
        }

        public down() {
            let father = this.data.father;
            let listWorld = father.groupRight.localToGlobal(father.scroller.x, father.scroller.y);
            listWorld.x -= Game.UIManager.x;

            this.uiTip = new CommonDesTalents();
            this.uiTip.setInfo(this.data.mobId);
            this.uiTip.x = listWorld.x - 53;
            this.uiTip.y = listWorld.y + 58;
            this.stage.addChild(this.uiTip);

            this.isBegin = true;
        }

        public up() {
            if (this.isBegin) {
                this.stage.removeChild(this.uiTip);
                this.isBegin = false;
            }
        }
    }

    export class CommonBossSkillData {
        public mobId: number;
        public father: CommonFormatePveMain | CommonFormateWanted
    }
}