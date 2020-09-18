namespace zj {
    // Common_DesRes
    // hexiaowei 
    // 2018/12/5

    export class Common_DesRes extends UI {

        private imageFrame: eui.Image;
        private imageIcon: eui.Image;
        private labelName: eui.Label;
        private labelHide: eui.Label;
        private labelNum: eui.Label;
        private labelHas: eui.Label;
        private labelInfo: eui.Label;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/Common_DesResSkin.exml";
        }
        public setInfo(goodsId, count) {
            let itemSet: any = PlayerItemSystem.Set(goodsId, null, count);
            this.imageFrame.source = cachekey(itemSet.Frame, this);
            this.imageIcon.source = cachekey(itemSet.Clip, this);
            let info: any = itemSet.Info;
            this.labelName.text = info.name;
            this.labelNum.text = count;
            this.labelHas.text = itemSet.Count.toString();
            this.labelInfo.text = info.des;
            this.labelHide.visible = count != "" && count != 0 && count != null;
            this.labelNum.visible = count != "" && count != 0 && count != null;

        }
    }
}