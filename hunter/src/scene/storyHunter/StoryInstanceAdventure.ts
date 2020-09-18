namespace zj {
    // wangshenzhuo
    // 2019-7-23
    // HXH_StoryInstanceAdventure

    export class StoryInstanceAdventure extends UI {

        public imgChapter1: eui.Image;
        public scrollerAdventure: eui.Scroller;
        public listInstance: eui.List;


        public father: StoryInstanceSelectStage;
        public itemIndex: number = 0;
        public itemShowIndex: number = 0;
        public listInstancetem: eui.ArrayCollection;
        public list_item = [];
        public activityInfo;
        public cur_sel;
        public last_sel;
        public focus_item_index;
        public mob;
        public itemShow: boolean = true;;

        public constructor() {
            super();
            this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureSkin.exml";
            this.listInstance.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onButtonAward, this);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.hideGoods, this);
        }

        public Father(father) {
            this.father = father;
        }

        public LoadList(instancePack, mob, activityInfo) {
            this.activityInfo = activityInfo;
            this.list_item = [];
            this.cur_sel = null;
            this.last_sel = null;
            this.focus_item_index = 0;
            this.mob = mob;
            if (mob > instancePack[instancePack.length - 1]) {
                this.listInstance.selectedIndex = -1;
                // this.listInstance.selectedIndex = 0;
            } else {
                this.listInstance.selectedIndex = mob - instancePack[0];
                // this.listInstance.selectedIndex = 0;
            }
            this.itemShowIndex = this.listInstance.selectedIndex;
            this.listInstance.itemRenderer = StoryInstanceAdventureItem;
            this.listInstancetem = new eui.ArrayCollection();
            for (const kk in instancePack) {
                const vv = instancePack[kk];
                if (vv == mob) {
                    this.focus_item_index == kk;
                }
                let data = new StoryInstanceAdventureItemData();
                data.index = Number(kk);
                data.instanceId = vv;
                data.father = this;
                data.activityInfo = this.activityInfo;
                this.listInstancetem.addItem(data);
            }
            this.listInstance.dataProvider = this.listInstancetem;
            this.itemIndex = this.listInstance.selectedIndex;
            this.listInstance.validateNow();
            this.scrollerAdventure.viewport = this.listInstance;

            setTimeout(() => {
                if (this.itemIndex != -1) {
                    let a = this.itemIndex;
                    let b = this.scrollerAdventure.height;
                    if (15 * 119 + 180 - this.itemIndex * 119 > this.scrollerAdventure.height) {
                        this.listInstance.scrollV = this.itemIndex * 119;
                    } else { // 滑不了太多
                        this.listInstance.scrollV = 840 + 180 - this.scrollerAdventure.height + this.itemIndex * 18;
                    }
                } else {
                    this.listInstance.scrollV = 0;
                }
            }, 300)

            let titlePath = this.father.cur_table.instance_Title;
            this.imgChapter1.source = cachekey(titlePath , this);
        }

        public hideGoods(ev: egret.Event) {
            let a = ev.data;
            this.itemShow = ev.data.isshow;
        }

        private onButtonAward(e: eui.ItemTapEvent) {
            this.itemIndex = this.listInstance.selectedIndex;
            let item = this.listInstance.getElementAt(this.listInstance.selectedIndex) as StoryInstanceAdventureItem;
            let itemDate = this.listInstancetem.getItemAt(this.listInstance.selectedIndex) as StoryInstanceAdventureItemData;

            if (itemDate.isMack == true || this.itemShow == false) {
                this.itemShow = true;
                return;
            } else {
                for (let i = 0; i < this.listInstancetem.length; i++) {
                    let tmp = this.listInstancetem.source[i];
                    if (i != this.listInstance.selectedIndex) {
                        tmp["isShow"] = true;
                        tmp["isTween"] = true;
                        this.listInstancetem.replaceItemAt(tmp, i);
                    } else {
                        tmp["isShow"] = !tmp["isShow"];
                        tmp["isTween"] = true;
                        this.listInstancetem.replaceItemAt(tmp, i);
                    }
                    tmp["isTween"] = false;
                }
            }
        }

    }
}