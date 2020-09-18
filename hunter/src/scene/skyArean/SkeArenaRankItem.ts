namespace zj {
    /**
     * 2019.11.19
     * xingliwei
     * @class 天空竞技场排行Item
     */
    export class SkeArenaRankItem extends eui.ItemRenderer {
        private imgRank: eui.Image;
        private labelTier: eui.BitmapLabel;
        private labelRank: eui.BitmapLabel;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private PlayerName: eui.Label;
        public constructor() {
            super();
            this.skinName = "resource/skins/skyArean/SkeArenaRankListSkin.exml";
            cachekeys(<string[]>UIResource["SkeArenaRankItem"], null);

        }
        protected dataChanged() {
            let data = this.data as SkeArenaRankItemData;
            let info = { name: data.info.baseInfo.name, paihang: data.info.rank, frame: PlayerItemSystem.ItemPath(data.info.baseInfo.picFrameId), icon: PlayerItemSystem.ItemPath(data.info.baseInfo.picId), wanjiacengshu: (data.info.value) % 10000 }
            this.imgFrame.source = info.frame;
            this.imgIcon.source = info.icon;
            this.PlayerName.text = info.name;
            if (info.paihang <= 3) {
                this.imgRank.visible = true;
                this.labelRank.visible = false;
                let str = ""
                if (info.paihang == 1) {
                    str = "ui_skyarean_1st_png"
                } else if (info.paihang == 2) {
                    str = "ui_skyarean_2nd_png"
                } else if (info.paihang == 3) {
                    str = "ui_skyarean_3rd_png"
                }
                this.imgRank.source = str;
            } else {
                this.imgRank.visible = false;
                this.labelRank.visible = true;
                this.labelRank.text = info.paihang.toString();
            }
            this.labelTier.text = "第" + info.wanjiacengshu + "层";
        }
    }

    export class SkeArenaRankItemData {
        index: number = 1;
        info: message.RankBaseItemInfo;
    }
}