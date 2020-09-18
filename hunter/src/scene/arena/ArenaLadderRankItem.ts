namespace zj {
    /** 
     * @author 
     * 
     * @date 2019-1-26
     * 
     * @class 本服排行子项界面
     */
    export class ArenaLadderRankItem extends eui.ItemRenderer {
        private groupCache: eui.Group;
        private LabelName: eui.Label;
        private labelLevel: eui.Label;
        private labelPlayerLayer: eui.BitmapLabel;
        private imgBest: eui.Image;
        private LabelFont: eui.BitmapLabel;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private imgbg: eui.Image;
        public constructor() {
            super();

            this.skinName = "resource/skins/arena/ArenaLadderRankItemSkin.exml";
            cachekeys(<string[]>UIResource["ArenaLadderRankItem"], null);
            this.labelPlayerLayer.visible = false;
        }

        protected dataChanged() {
            closeCache(this.groupCache);
            let data = this.data as ArenaLadderRankItemData;
            let info = data.info;
            let index = data.index;
            this.imgbg.source = cachekey("ui_frame_FrameImageB_png", this)
            let bestPath = "";
            if (info.rank <= 3) {
                bestPath = UIConfig.UIConfig_Rank.best[info.rank - 1];
                this.LabelFont.visible = false;
            }
            else {
                bestPath = UIConfig.UIConfig_Common.nothing;
                this.LabelFont.visible = true;
                this.LabelFont.text = Helper.StringFormat(TextsConfig.TextsConfig_Rank.floor_next, info.rank);
            }

            let framePath = PlayerItemSystem.ItemPath(info.baseInfo.picFrameId);
            let iconPath = PlayerItemSystem.ItemPath(info.baseInfo.picId);
            this.imgFrame.source = cachekey(framePath, this);
            this.imgIcon.source = cachekey(iconPath, this);
            this.imgBest.source = cachekey(bestPath, this);

            this.LabelName.text = info.baseInfo.name;
            if (index == 2) { // 格斗场
                this.labelLevel.text = "LV." + info.baseInfo.level.toString();
                this.labelLevel.textColor = Helper.RGBToHex("r:0,g:0,b:0")
            } else if (index == 4 || index == 5) { // 天空竞技场
                this.labelLevel.text = Helper.StringFormat(TextsConfig.TextConfig_Tower.towerCur, (info.value - 1) % 10000);
                this.labelLevel.textColor = Helper.RGBToHex("r:65,g:26,b:3");
            }

            setCache(this.groupCache);
        }
    }

    /** 子项数据源 */
    export class ArenaLadderRankItemData {

        /** 数据源 */
        info: message.RankBaseItemInfo;

        index: number
    }
}