namespace zj {
    /**
     * @author chen xi.
     * 
     * @date 2019-1-25
     * 
     * @class 排行界面
     */
    export class ArenaLadderRank extends Dialog {
        private groupCache: eui.Group;
        private imgTopLog: eui.Image;
        private btnClose: eui.Button;
        private listRank: eui.List;
        private labelLevelRanking: eui.Label;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private LabelName: eui.Label;
        private labelValue: eui.Label;
        private labelPlayerLayer: eui.BitmapLabel;
        private groupMiRanking: eui.Group;

        private listRankData = new eui.ArrayCollection();
        private callback: Function;

        private index: number; //排名类型

        constructor() {
            super();

            this.skinName = "resource/skins/arena/ArenaLadderRankSkin.exml";

            this.init();
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);

            let baseInfo = Game.PlayerInfoSystem.BaseInfo;
            let iconPath = PlayerItemSystem.ItemPath(baseInfo.picId);
            this.imgIcon.source = cachekey(iconPath, this);
            let framePath = PlayerItemSystem.ItemPath(baseInfo.picFrameId);
            this.imgFrame.source = cachekey(framePath, this);

            this.LabelName.text = baseInfo.name;
            //this.labelValue.text = "LV." + baseInfo.level.toString();
            this.labelPlayerLayer.visible = false;

            this.listRank.itemRenderer = ArenaLadderRankItem;
            this.listRank.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListRankTap, this);
        }

        /**
         * 设置基本信息
         * 
         * @param index 索引下标
         * @param cb 回调函数
         */
        public setInfo(index: number, cb?: Function) {
            closeCache(this.groupCache);
            this.index = index;
            this.callback = cb;

            let start = 0;
            let count = CommonConfig.rank_list_max - 1;

            Game.PlayerArenaSystem.rankItemInfo(index, start, count).then((body: message.RankItemsZip) => {
                // console.log("--- body = ", body);
                let lastIndex = body.rankItemsInfo.length - 1;
                let value = body.rankItemsInfo[lastIndex].value;

                if (index == 2) { // 格斗场
                    this.imgTopLog.source = cachekey("ui_arena_WordsTipServerArenaRank_png", this);
                    this.labelValue.text = "LV." + Game.PlayerInfoSystem.BaseInfo.level.toString();
                    this.groupMiRanking.y = 29;
                } else if (index == 4) { // 天空竞技场
                    this.imgTopLog.source = cachekey("ui_skyarean_WordsSkyRankTipLow_png", this);
                    this.labelValue.text = "当前层数：" + (value - 1);;
                    this.groupMiRanking.y = 45;
                } else if (index == 5) { // 天空竞技场
                    this.imgTopLog.source = cachekey("ui_skyarean_WordsSkyRankTipHigh_png", this);
                    this.labelValue.text = "当前层数：" + (value - 1);
                    this.groupMiRanking.y = 45;
                }

                this.loadList(body.rankItemsInfo);
            });
        }

        private loadList(itemsInfo: Array<message.RankBaseItemInfo>) {
            if (itemsInfo.length == 0) return;
            let lastIndex = itemsInfo.length - 1;
            let rank = itemsInfo[lastIndex].rank;
            if (rank == 0) {
                this.labelLevelRanking.text = TextsConfig.TextsConfig_Activity.Rank_Charge.out;
            } else {
                this.labelLevelRanking.text = rank.toString();
            }

            itemsInfo.splice(lastIndex, 1);

            this.listRankData.removeAll();
            for (let i = 0; i < itemsInfo.length; i++) {
                let data = new ArenaLadderRankItemData();
                let v = itemsInfo[i];
                data.index = this.index;
                data.info = v;
                this.listRankData.addItem(data);
            }
            this.listRank.dataProvider = this.listRankData;

            setCache(this.groupCache);
        }

        private onListRankTap(e: eui.ItemTapEvent) {
            let data = this.listRankData.getItemAt(e.itemIndex) as ArenaLadderRankItemData;

            loadUI(RankDetail).then((ui: RankDetail) => {
                ui.setInfo(data.info.baseInfo);
                ui.show(UI.SHOW_FILL_OUT);
            });
        }

        private onBtnClose() {
            if (this.callback) this.callback();
            this.close(UI.HIDE_TO_TOP);
        }
    }
}