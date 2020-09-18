namespace zj {
    // created by hhh in 2018/12/5

    export class Common_DesProp extends UI {
        private imageFrame: eui.Image;
        private imageIcon: eui.Image;
        private groupItem: eui.Group;
        private labelNum: eui.BitmapLabel;
        private labelName: eui.Label;
        private labelType: eui.Label;
        private labelConst: eui.Label;
        private labelOwn: eui.Label;
        private labelInfo: eui.Label;
        private labelNumId: eui.Label;

        private imgMask: eui.Image;
        private rectMask: eui.Rect;
        private rectMaskCommon: eui.Rect;
        private imgpifu: eui.Image;
        public constructor() {
            super();

            this.skinName = "resource/skins/common/Common_DesPropSkin.exml";

            this.labelConst.text = LANG("拥有          件");

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;

            // 徽章遮罩
            this.rectMask = new eui.Rect(73, 70, 0x000000);
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupItem.addChild(this.rectMask);
            this.rectMask.visible = false;

            //普通物品遮罩
            this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            this.rectMaskCommon.horizontalCenter = 0;
            this.rectMaskCommon.verticalCenter = -2;
            this.groupItem.addChild(this.rectMaskCommon);
            this.rectMaskCommon.visible = false;
        }

        public setInfo(goodsId, count) {
            let info = <TableItemProp>PlayerItemSystem.ItemConfig(goodsId);
            let iteminfo = PlayerItemSystem.Set(goodsId, 0, count);
            let frame = UIConfig.UIConfig_Role.itemFrame[info.quality];
            let typeDes = PlayerItemSystem.ItemTypeDesc(goodsId);
            let countOwn = PlayerItemSystem.Count(goodsId);
            let fruitId = "";

            this.imageFrame.source = cachekey(iteminfo.Frame, this);
            this.imageIcon.source = cachekey(info.path, this);

            this.labelNum.text = count;
            this.labelNum.visible = count != "" && count != 0;
            this.labelName.text = info.name;
            this.labelType.text = typeDes;
            this.labelOwn.text = countOwn + "";
            let str = info.des as string;
            if (str.indexOf("_") != -1) {
                let string = str.split('_');
                let a: string = "";
                for (let i = 0; i < string.length; i++) {
                    a += string[i] + "\n"
                }
                this.labelInfo.textFlow = Util.RichText(a);
            } else {
                this.labelInfo.textFlow = Util.RichText(info.des);
            }
            this.labelNumId.text = fruitId;

            // 遮罩
            if (this.isImgMask(goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            } else if (this.isRectMask(goodsId)) {
                this.rectMask.visible = true;
                this.imageIcon.mask = this.rectMask;
            } else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            let type = PlayerItemSystem.ItemType(goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true
            } else {
                this.imgpifu.visible = false;
            }
        }

        // 物品遮罩
        private isImgMask(goodsId: number): boolean {
            if (PlayerItemSystem.ItemType(goodsId) == 4
                || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }

            return false;
        }

        // 徽章遮罩
        private isRectMask(goodsId: number): boolean {
            if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }

            return false;
        }
    }
}