namespace zj {
    /**
     * @author chen xi.
     * 
     * @date 2019-1-24
     * 
     * @class 天赋效果描述
     */

    export class CommonDesTalents extends UI {
        public imgFrame: eui.Image;
        public imgIcon: eui.Image;
        public labelName: eui.Label;
        public labelDes: eui.Label;
        constructor() {
            super();
            this.skinName = "resource/skins/common/Common_DesTalents.exml";
        }

        public setInfo(id) {
            let info = TableClientWantedMobsFeature.Item(id);
            let frame = PlayerItemSystem.QualityFrame(info.quality);

            this.imgFrame.source = cachekey(frame, this);
            this.imgIcon.source = cachekey(info.path, this);

            this.labelName.text = info.name;
            this.labelDes.text = info.des;
        }
    }
}