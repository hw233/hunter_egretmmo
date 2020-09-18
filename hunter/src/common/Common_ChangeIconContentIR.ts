namespace zj {
    //
    // lizhengqiang
    // 20190112
    export class Common_ChangeIconContentIR extends eui.ItemRenderer {

        private lstItem: eui.List;

        private arrCollection: eui.ArrayCollection;
        private index: number = 0;
        public listID = 0;
        public listType = 0;
        public constructor() {
            super();
            this.skinName = "resource/skins/common/Common_ChangeIconContentIRSkin.exml";
            cachekeys(<string[]>UIResource["Common_ChangeIconContentIR"], null);

            this.lstItem.selectedIndex = 0;
            this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedItem, this);
        }

        protected dataChanged() {
            this.listType = this.data.i ? this.data.i : 0;
            this.listID = this.data.j ? this.data.j : 0;
            let picIds: number[] = this.data.picIds;
            let iconType: number = this.data.iconType;
            let indexArr: number[] = this.data.index;
            this.arrCollection = new eui.ArrayCollection();
            for (let i = 0; i < picIds.length; i++) {
                this.data.father.mapIndex += 1;
                this.arrCollection.addItem({ "iconType": iconType, "picId": picIds[i], "index": indexArr[i], "vis": true, "father": this, "i": i });
            }
            this.lstItem.itemRenderer = Common_ChangeIconItemIR;
            this.lstItem.dataProvider = this.arrCollection;
            this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlstIconStyleTag, this);
        }

        private onlstIconStyleTag(e: eui.ItemTapEvent) {

        }

        private onLstSelectedItem(e: eui.PropertyEvent) {
            if (this.data.father.vis == true) {
                this.data.father.vis = false;
            } else {
                return;
            }
            Game.EventManager.event(GameEvent.COMMON_CHANGE_ICON_SHUAXIN);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.index]);
            this.arrCollection.itemUpdated(this.arrCollection.source[this.lstItem.selectedIndex]);
            this.index = this.lstItem.selectedIndex;

        }
    }
}