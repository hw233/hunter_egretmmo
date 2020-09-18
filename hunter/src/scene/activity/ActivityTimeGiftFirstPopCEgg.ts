namespace zj {
//  娃娃机 -- 娃娃币礼包
//  wangshenzhuo
//  2019/04/11
export class ActivityTimeGiftFirstPopCEgg extends Dialog {

    public imageInfoIcon: eui.Image;
    public imageLimit: eui.Image;
    public labelCanBuy: eui.Label;
    public labelEndTime: eui.Label;
    public listTableView: eui.List;
    public labelTipName: eui.BitmapLabel;
    public buttonGet_2: eui.Button;
    public labelValue_2: eui.BitmapLabel;
    public imageIcon: eui.Image;
    public imageEight: eui.Image;
    private groupMain: eui.Group;
    private groupGift: eui.Group;

    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    private confirmCB: Function = null;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityTimeGiftFirstPopCEggSkin.exml";
        this.buttonGet_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGet, this);
        this.groupMain.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
        this.labelEndTime.visible = false;
        this.labelCanBuy.visible = false;
        this.imageLimit.visible = false;
        this.imageEight.visible = false;
    }

    public SetInfo(info) {
        this.imageInfoIcon.source = cachekey(info.path, this);
        this.labelValue_2.text = info.gift_consume;
        let goods = info.gift_content;
        let reward_list = [];
        for (const k in goods) {
            const v = goods[k];
            let good = new message.GoodsInfo();
            good.goodsId = v[0];
            good.count = v[1];
            reward_list.push(good);
        }

        this.listTableView.selectedIndex = -1; // 默认选中
        this.TableViewItem = new eui.ArrayCollection();
        this.listTableView.itemRenderer = HXH_GiftMonthItem;
        for (let i = 0; i < reward_list.length; i++) {
            let data = new HXH_GiftMonthItemData();
            data.goods = reward_list[i];
            data.father = this;
            data.index = i;
            this.TableViewItem.addItem(data);
        }

        this.listTableView.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listTableView.selectedIndex;
        this.buttonGet_2.touchEnabled = true;
    }

    private onButtonGet() {
        this.buttonGet_2.touchEnabled = false;
        this.GetGiftReq_Visit().then((data: message.IntegralBuyGiftResponse) => {
            setTimeout(() => {
                this.buttonGet_2.touchEnabled = true;
                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                    });
            }, 500);
        }).catch((reason) => {
            if (reason == message.EC.XG_LACK_TOKEN) {
                this.buttonGet_2.touchEnabled = true;
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => { shopping() })
                let shopping = () => {
                    setTimeout(() => {
                        loadUI(PayMallScene)
                            .then((scene: PayMallScene) => {
                                scene.show(UI.SHOW_FROM_TOP);
                                scene.init();
                            });
                    }, 800);
                }
            }else{
                this.buttonGet_2.touchEnabled = true;
                toast_warning(Game.ConfigManager.getAone2CodeReason(reason));
            }
            
        });
    }

    public GetGiftReq_Visit() {
        return new Promise((resolve, reject) => {
            let request = new message.IntegralBuyGiftRequest();
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.IntegralBuyGiftResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false,true);
            return;
        });
    }

    // public GetGiftReq_Visit() {
    //     return new Promise((resolve, reject) => {
    //         let request = new message.IntegralBuyGiftRequest();
    //             Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
    //             let response = <message.IntegralBuyGiftResponse>resp;
    //             console.log(response);
    //             resolve(response);
    //             return;
    //         }, (req: aone.AoneRequest): void => {
    //             reject(LANG("请求超时"));
    //             return;
    //         }, this, false , true);
    //         return;
    //     });
    // }

    // 鼠标点击说明
    public onChooseItemTap(isTouchBegin: boolean, data: HXH_GiftMonthItemData) {
        let _type = PlayerItemSystem.ItemType(data.goods.goodsId);

        let dialog = this.groupGift.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.groupGift.removeChild(dialog);

        let index = data.index * 75;

        if (isTouchBegin) {
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                    dialog.x = -154 + index;
                    dialog.y = -245;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(data.goods.goodsId, data.goods.count);
                    this.groupGift.addChild(dialog);
                });
            } else
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        this.groupGift.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        this.groupGift.addChild(dialog);
                    });
                }
                else {
                    loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                        dialog.x = -154 + index;
                        dialog.y = -245;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.goods.goodsId, data.goods.count);
                        this.groupGift.addChild(dialog);
                    });

                }
        }
    }

    //鼠标抬起，移除说明
    private onRemoveAward() {
        let dialog = this.groupGift.getChildByName("Item-skill-common");
        if (dialog) this.groupGift.removeChild(dialog);
    }

    public setCB(confirmCB?: Function) {
        this.confirmCB = confirmCB;
    }

    public onBtnClose() {

        if (this.confirmCB != null) {
            this.confirmCB();
        }
        this.close(UI.HIDE_TO_TOP);
    }
}
}