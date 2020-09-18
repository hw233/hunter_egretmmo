namespace zj {
    // lizhengqiang
    // 2018/11/30

    export class CommonDesProp extends UI {
        public static ID = "CommonDesProp";

        public groupMain: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private lbName: eui.Label;
        private lbType: eui.Label;
        private lbOwn: eui.Label;
        private lbNum: eui.Label;
        private lbNumID: eui.Label;
        private lbInfo: eui.Label;
        private maskimage: eui.Image;
        private groupMack: eui.Group;
        private imgMask: eui.Image;		//碎片遮罩
        private imgpifu: eui.Image;
        public constructor() {
            super();
            this.skinName = "resource/skins/common/CommonDesPropSkin.exml";

            //物品遮罩
            this.maskimage = Util.getMaskImgBlack(84.6, 85);
            this.maskimage.horizontalCenter = 0;
            this.maskimage.verticalCenter = -1;
            this.groupMack.addChild(this.maskimage);
            this.maskimage.visible = false;

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupMack.addChild(this.imgMask);
            this.imgMask.visible = false;
        }

        public init(goodsId: number, count: number) {
            let config = PlayerItemSystem.ItemConfig(goodsId);
            let iteminfo = PlayerItemSystem.Set(goodsId, 0, count);
            let num: number = 0;
            if (TableClientTypePackage.Item(6)["itemId"].indexOf(goodsId) != -1) {
                num = goodsId % 100;
            }

            this.imgFrame.source = cachekey(iteminfo.Frame, this);
            this.imgIcon.source = cachekey(config["path"], this);
            if (count != null) {
                this.lbNum.visible = true;
                this.lbNumID.visible = true;
                this.lbNum.text = count.toString();
                this.lbNumID.text = num == 0 ? "" : num.toString();
            }
            else {
                this.lbNum.visible = false;
                this.lbNumID.visible = false;
            }

            this.lbName.text = config["name"];
            this.lbType.text = PlayerItemSystem.ItemTypeDesc(goodsId);
            this.lbOwn.text = Game.PlayerItemSystem.itemCount(goodsId).toString();
            let str = config["des"] as string;
            if (str.indexOf("_") != -1) {
                let string = str.split('_')
                let a: string = "";
                for (let i = 0; i < string.length; i++) {
                    a += string[i] + "\n"
                }
                this.lbInfo.textFlow = Util.RichText(a);
            } else {
                this.lbInfo.textFlow = Util.RichText(config["des"]);
            }

            //this.lbInfo.text = config["des"];

            // this.maskimage.visible = true;
            // this.imgIcon.mask = this.maskimage;

            if (this.isImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.maskimage.visible = false;
                this.imgIcon.mask = this.imgMask;
            } else {
                this.imgMask.visible = false;
                this.maskimage.visible = true;
                this.imgIcon.mask = this.maskimage;
            }

            let type = PlayerItemSystem.ItemType(goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true;
            } else {
                this.imgpifu.visible = false;
            }

        }
        // 物品遮罩
        private isImgMask(goodsId: number): boolean {
            if (PlayerItemSystem.ItemType(goodsId) == 4
                //||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
                || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }

            return false;
        }
    }

}