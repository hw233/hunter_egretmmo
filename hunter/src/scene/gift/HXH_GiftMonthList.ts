namespace zj {
// HXH_GiftMonthList
// wangshenzhuo
// 2019/04/20
export class HXH_GiftMonthList extends Scene {

    private groupAni: eui.Group;
    private buttonClose: eui.Button;
    private imageName: eui.Image;
    private listAddGift: eui.List;
    public groupMain: eui.Group;
    private imageBackGroud: eui.Group;

    private this_gift_info: any;
    private AddGiftItem: eui.ArrayCollection;
    private AddGiftIndex: number = 0;
    private cb: Function = null;
    public allProducts: Array<MyProductInfo> = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/gift/HXH_GiftMonthListSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        if (this.width >= 1344) {
            this.imageBackGroud.scaleX = this.width / 1334;
        }
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
        this.Init();
    }

    public Init() {
        Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0)
            .then((display: dragonBones.EgretArmatureDisplay) => {
                display.x = display.width / 2;
                display.y = display.height / 2;
                this.groupAni.addChild(display);
            });
    }

    private SetInfoPush(push_info) {
        let tip_index: any = push_info.refrence + "push_month" + push_info.month;
        Tips.tips_oneday_set(tip_index, true);
    }

    public SetInfo(refrence, cb?: Function) {
        this.cb = cb;
        let refrence_tbl = PlayerGiftSystem.Instance_newGiftIndex(refrence);
        this.this_gift_info = PlayerGiftSystem.AllGiftByRefrence(refrence);
        this.imageName.source = cachekey(refrence_tbl.name_path, this);
        this.LoadPayProducts();
    }

    private LoadPayProducts() {
        Game.PlayerPaySystem.queryAppProducts().then((resp: message.QueryAppProductsRespBody) => {
            let this_this = this;
            for (let v of resp.products) {
                for (let vv of resp.channel_products_ext) {
                    if (v.id == vv.id) {
                        let tmp: MyProductInfo = {
                            id: "",
                            name: "",
                            describe: "",
                            currency: "",
                            amount: 0,
                            amount_usd: 0,
                            coin: 0,
                            type: "",
                            discount: "",
                            cp_product_id: "",
                        };
                        for (const k in tmp) {
                            tmp[k] = v[k];
                        }
                        tmp.cp_product_id = vv.cp_product_id;
                        this_this.allProducts.push(tmp);
                        break;
                    }
                }
            }

            let i = 0;
            while (i < this_this.allProducts.length) {
                if (PlayerPaySystem.PayItemByID(this_this.allProducts[i].cp_product_id) == null) {
                    this_this.allProducts.splice(i, 1);
                } else {
                    i = i + 1;
                }
            }

            this_this.allProducts.sort(function (a, b) {
                let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
                let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
                return itemA.sort_index - itemB.sort_index;
            });
            this.SetInfoList();
        });
    }

    private onRemoveAward() {
        let dialog = this.groupMain.getChildByName("Item-skill-common");
        if (dialog) this.groupMain.removeChild(dialog);
    }

    private SetInfoList() {
        this.listAddGift.selectedIndex = -1; // 默认选中
        this.listAddGift.itemRenderer = HXH_GiftMonth;//
        this.AddGiftItem = new eui.ArrayCollection();
        for (let i = 0; i < this.this_gift_info.length; i++) {
            let data = new HXH_GiftMonthData();
            data.father = this;
            data.info = this.this_gift_info[i];
            data.index = i;
            data.allPro = this.allProducts;
            this.AddGiftItem.addItem(data);
        }

        this.listAddGift.dataProvider = this.AddGiftItem;
        this.AddGiftIndex = this.listAddGift.selectedIndex;
    }

    private onButtonClose() {
        if (this.cb != null) {
            this.cb();
        }
        this.close(UI.HIDE_TO_BOTTON);
    }

}
}