namespace zj {
// created by hhh in 2018/11/14

/************** 碎片item ****************/

export class CardComposeItem extends eui.ItemRenderer {
    private groupAll: eui.Group;
    private groupAni: eui.Group;
    private groupStar: eui.Group;

    private imageDown: eui.Image;
    private imageCardPic: eui.Image;
    private imageCardType: eui.Image;
    private imageFrame: eui.Image;
    private imageExpBar: eui.Image;

    private labelLevel: eui.BitmapLabel;
    private labelCardName: eui.Label;
    private labelCardChipNum: eui.Label;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardComposeItemSkin.exml";

        cachekeys(<string[]>UIResource["CardComposeItem"], null);
    }

    protected dataChanged() {
        let info: { product_id: number, need_ids: Array<number>, need_counts: Array<number>, have_counts: Array<number>, counts_per: Array<number>, can_compose: number, randomCard: number, isSel: boolean } = this.data;
        this.groupAll.visible = info.product_id != null;

        if (info.product_id != null) {
            if (info.randomCard == 0) {
                let tbl = TableItemPotato.Item(info.product_id);

                this.imageCardType.visible = true;

                let framePic = PlayerCardSystem.GetItemFrame(info.product_id)[0];
                this.labelCardName.text = tbl.name;

                this.imageCardPic.source = cachekey(tbl.path, this);
                this.imageCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
                this.imageFrame.source = cachekey(framePic, this);

                Helper.SetStar(this.groupStar, tbl.star, UIConfig.UIConfig_Hunter_Card.card_star, 1, 10);
            }
            // 当卡片为随机生成
            else {
                let cardInfo: TableItemProp = <TableItemProp>PlayerItemSystem.ItemConfig(info.need_ids[0]);

                this.imageCardType.visible = false;

                let framePic = UIConfig.UIConfig_Role.itemFrame[cardInfo.compose_quality];
                this.labelCardName.text = cardInfo.compose_name;
                this.imageCardPic.source = cachekey(cardInfo.path, this);
                this.imageFrame.source = cachekey(framePic, this);


                if (cardInfo.compose_purple != "")
                    Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), UIConfig.UIConfig_Hunter_Card.card_star_next, 1, 10);
                else
                    Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), UIConfig.UIConfig_Hunter_Card.card_star, 1, 10);
            }

            this.labelLevel.text = "1";
            this.labelCardChipNum.text = info.have_counts[0] + "/" + info.need_counts[0];
            this.imageExpBar.percentWidth = info.counts_per[0] * 100;

            this.groupAni.visible = (info.can_compose == 1);
            if (info.can_compose == 1) {
                this.groupAni.removeChildren();
                Game.DragonBonesManager.playAnimation(this, "ui_kehecheng", "armatureName", null, 0)
                    .then(display => {
                        display.x = this.groupAni.width / 2;
                        display.y = this.groupAni.height / 2 - 10;
                        this.groupAni.addChild(display);
                    })
                    .catch(reason => {
                        toast(reason);
                    });
            }

            // if (info.isSel) {
            //     this.groupSelAni.removeChildren();
            //     this.imgSel .visible = false;
            //     Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", "002_xuanzhong_anniu2", 0)
            //         .then(display => {
            //             display.x = this.groupSelAni.width / 2;
            //             display.y = this.groupSelAni.height / 2;
            //             this.groupSelAni.addChild(display);
            //             display.rotation = 90;
            //             display.scaleX = 0.85;
            //             display.scaleY = 1.3;
            //         })
            //         .catch(reason => {
            //             toast(reason);
            //         });
            // }
            // else {
            //     this.groupSelAni.removeChildren();
            //     this.imgSel.visible = true;
            // }
        }
    }
}
}