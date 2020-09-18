namespace zj {
    /**
     * 向上拖动选择上阵猎人空list列表
     */
    export class FormateBottomList extends UI {
        public static ID = "FormateBottomList"
        private groupCache: eui.Group;
        // 底部list
        public listBottom: eui.List;
        // 底部数据data
        public listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
        // 滚动框
        public scroller: eui.Scroller;
        // 父类
        private father: FormatChoose = null;
        private vis: boolean = true;
        constructor() {
            super();
            this.skinName = "resource/skins/formation/FormateBottomListSkin.exml";
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.father = null;
            }, null);

            // // 每个item点击触发
            // this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            // // 每个item是否选中状态
            // this.listBottom.allowMultipleSelection = true;
            // // 每个item显示--item数据类需要继承eui.ItemRenderer接口
            // this.listBottom.itemRenderer = FormatChooseHeroItem;

            // 初始化
            this.init();
            this.listBottom.dataProvider = this.listBottomData;
            this.listBottom.itemRenderer = FormatChooseHeroItem;
            // 每个item点击触发
            this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            // 每个item是否选中状态
            this.listBottom.allowMultipleSelection = true;
        }

        public setInfo(father) {
            this.father = father;
        }

        /**
         * 初始化--每一个item添加到list中
         */
        public init() {
            closeCache(this.groupCache);
            if (this.father == null || this.father == undefined) {
                return;
            }
            let hunterList = PlayerHunterSystem.GetHunterList();
            let fix = PlayerItemSystem.FixCount(hunterList.length, 8, 1);
            for (let i = 0; i < fix; i++) {
                hunterList.push(0);
            }
            if (this.vis == true) {
                this.listBottomData.removeAll();
                for (let i = 0; i < hunterList.length; i++) {
                    let v = hunterList[i];
                    let data = new FormatChooseHeroData();
                    data.father = this.father;
                    data.generalId = v;
                    data.isCanTouch = true;
                    this.listBottomData.addItem(data);
                }
                if (this.father != null && this.father != undefined) {
                    this.vis = false;
                }
            }
            setCache(this.groupCache);
            // 列表数据源--dataProvider

            // 每个item显示--item数据类需要继承eui.ItemRenderer接口
            //this.listBottom.itemRenderer = FormatChooseHeroItem;
        }

        /**
         * list中每个点击触发--eui.ItemTapEvent
         */
        public onListHerosTap(e: eui.ItemTapEvent) {
            // 获取每一个item索引
            let index = e.itemIndex;

            let point = this.listBottom.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= Game.UIManager.x;
            this.father.moveImg.x = point.x;
            this.father.moveImg.y = point.y;

            if (!e.item.isCanTouch || e.item.generalId == 0) {
                return;
            }

            this.father.up.addGeneral(e.item.generalId);
            Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM)
            // Teach.addTeaching();
        }

        public getItemList() {
            Game.PlayerFormationSystem.itemlist = [];
            let hunterList = PlayerHunterSystem.GetHunterList();
            for (let i = 0; i < hunterList.length; i++) {
                let item = this.listBottom.getElementAt(i) as FormatChooseHeroItem;
                Game.PlayerFormationSystem.itemlist.push(item);
            }
        }
    }
}