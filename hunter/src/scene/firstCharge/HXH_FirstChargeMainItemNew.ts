namespace zj {
    //HXH_FirstChargeMainItemNew
    //wangshenzhuo
    // 2019/03/30
    export class HXH_FirstChargeMainItemNew extends eui.ItemRenderer {

        private groupMain: eui.Group;
        private groupSence: eui.Group;
        private imageBoard: eui.Image;
        private imageIcon: eui.Image;
        private labelNum: eui.BitmapLabel;
        private imgpifu: eui.Image;
        private goodsId: any;
        private count: any;
        private showType: any;
        private itemSet: any;

        public constructor() {
            super();
            this.skinName = "resource/skins/firstCharge/HXH_FirstChargeMainItemNewSkin.exml";
            cachekeys(<string[]>UIResource["HXH_FirstChargeMainItemNew"], null);
            this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                (this.data as HXH_FirstChargeMainItemNewData).father.onDropInfoItemTap(true, this.data);
            }, this);
            this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                (this.data as HXH_FirstChargeMainItemNewData).father.onDropInfoItemTap(false, this.data);
            }, this);
        }

        protected dataChanged() {
            this.goodsId = this.data.info.reward_goods[this.data.index];
            this.count = this.data.info.reward_count[this.data.index];
            this.showType = this.data.info.show_type[this.data.index];
            let itemSet = PlayerItemSystem.Set(this.goodsId, this.showType, this.count);
            this.itemSet = itemSet;
            this.labelNum.text = this.count;
            this.imageIcon.source = cachekey(itemSet.Clip, this);

            let type = PlayerItemSystem.ItemType(this.goodsId);
            if (type == message.EGoodsType.GOODS_TYPE_FASHION) {
                this.imgpifu.visible = true
            }
            else {
                this.imgpifu.visible = false;
            }

            this.groupSence.removeChildren();
            if (this.data.itemindex == 0 || this.data.itemindex == 1) {
                if (this.data.index >= 3) {
                    return;
                } else {
                    this.addAnimatoin("shouchong_liuguang", "000_liuguang", 0, this.groupSence);
                    this.addAnimatoin2("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupSence);
                }
            } else {
                this.addAnimatoin("shouchong_liuguang", "000_liuguang", 0, this.groupSence);
                this.addAnimatoin2("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupSence);
            }
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {

                    display.x = group.explicitWidth / 2;
                    display.y = group.explicitHeight / 2;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        //添加龙骨动画
        public addAnimatoin2(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2;
                    display.y = group.explicitHeight / 2;
                    display.scaleX = 0.75;
                    display.scaleY = 0.75;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }
    }



    //子项数据源
    export class HXH_FirstChargeMainItemNewData {
        index: number;
        father: HXH_FirstChargeMainNew;
        info: any;
        itemindex: number;
    }
}