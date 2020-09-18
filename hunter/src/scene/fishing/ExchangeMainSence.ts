namespace zj {
// 果实收集者 主界面
// wangshenzhuo
// 2019.05.18
export class ExchangeMainSence extends Dialog {

    private scrollerGoods: eui.Scroller;
    public listGood: eui.List;
    public buttonReturn: eui.Button;
    public groupRight: eui.Group;
    public imageBack: eui.Image;;
    public type: number = 1;
    public index: number = 1;
    public getList;

    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    public changeMainRight: ExchangeMainRight;

    public constructor() {
        super();
        this.skinName = "resource/skins/fishing/ExchangeMainSenceSkin.exml";
        this.buttonReturn.addEventListener(egret.TouchEvent.TOUCH_END, this.onButtonClsse, this);
        this.listGood.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.buttonAward, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
        this.imageBack.visible = false;
        this.SetInfoList();
        this.changeMainRight = new ExchangeMainRight();
        this.groupRight.addChild(this.changeMainRight);
        this.changeMainRight.name = "rightui";
        this.changeMainRight.SetInfo(this);
        Game.EventManager.event(GameEvent.SHOW_UI, {typeName: "zj.ExchangeMainRight"});
    }

    public SetInfo(type, index) {
        this.type = type;
    }

    public SetInfoList() {
        let infos = PlayerConvertSystem.SortType(this.type);
        //当前不可兑换聚焦第一个
        if (!PlayerConvertSystem.CanConvert(infos[this.index - 1].id) && (!Teach.BeInTeaching())) {
            this.index = 1;
        }
        this.getList = infos[this.index - 1];
        this.listGood.selectedIndex = 0; // 默认选中
        this.listGood.itemRenderer = ExchangeMainItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < infos.length; i++) {
            let data = new ExchangeMainItemData();
            data.father = this;
            data.good = infos[i];
            data.index = i;
            this.TableViewItem.addItem(data);
        }

        this.listGood.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listGood.selectedIndex;

    }

    public ReqExchangeMall() {
        let type;
        let id;
        if (this.getList != null) {
            type = this.getList.type;
            id = this.getList.id;
        }
        PlayerConvertSystem.ExchangeMall_Visit(type, id).then((data: message.ExchangeMallResponse) => {
            let cb = () => {
                let goods: any = new message.GoodsInfo();
                goods.goodsId = this.getList.reward_goods;
                goods.count = this.getList.reward_count;

                let infos = PlayerConvertSystem.SortType(this.type);
                //    let aaa = Table.FindR(infos , function(k , v) {
                //        return v.id == this.getList.id;
                //    })

                loadUI(CommonGetDialog)
                    .then((dialog: CommonGetDialog) => {
                        dialog.init([goods]);
                        dialog.show();
                        dialog.setCB(() => {
                            setTimeout(() => {
                                this.SetInfoList();
                                this.changeMainRight.SetInfo(this);
                                this.imageBack.visible = false;
                            }, 200)
                        })
                    });
            }

            Game.PlayerMixUnitInfoSystem.mixunitinfo.exchangeMalls = data.body.gameInfo.mixUnitInfo[0].exchangeMalls;
            this.changeMainRight.SetInfoAni(() => { cb() });
        }).catch((reason) => {
            this.imageBack.visible = false;
        });
        // Teach.addTeaching();
    }

    private showGoodsProperty(ev: egret.Event) {
        let goods = new message.GoodsInfo();
        goods.goodsId = ev.data.info.good.reward_goods;
        let show = TipManager.ShowProp(goods, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

    private buttonAward(e: eui.ItemTapEvent) {
        if (this.TableViewIndex == this.listGood.selectedIndex) {
            return;
        }
        if (this.TableViewIndex != this.listGood.selectedIndex) {
            this.TableViewItem.itemUpdated(this.TableViewItem.source[this.TableViewIndex]);
            this.TableViewItem.itemUpdated(this.TableViewItem.source[this.listGood.selectedIndex]);
            this.TableViewIndex = this.listGood.selectedIndex;
        }
        this.index = this.TableViewIndex + 1;
        let infos = PlayerConvertSystem.SortType(this.type);
        this.getList = infos[this.index - 1];
        this.changeMainRight.SetInfo(this);
    }

    // 鼠标点击 物品详情
    public onChooseItemTap(isTouchBegin: boolean, goodsids, counts, itemIndex) {
        let _type = PlayerItemSystem.ItemType(goodsids);

        let dialog = this.groupRight.getChildByName("Item-skill-common") as CommonDesGeneral;
        if (dialog) this.groupRight.removeChild(dialog);
        let posY: number = 0;
        let posX: number = 0;
        if (itemIndex == 1) {
            posY = 30;
            posX = -110;
        } else if (itemIndex == 2) {
            posX = 60;
            posY = 60;
        } else if (itemIndex == 3) {
            posX = 210;
            posY = 30;
        } else if (itemIndex == 10) {
            posX = 60;
            posY = -60;
        }

        if (isTouchBegin) {
            if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
                    dialog.x = posX;
                    dialog.y = posY;
                    dialog.name = "Item-skill-common";
                    dialog.setInfo(goodsids, 2);
                    this.groupRight.addChild(dialog);
                });
            } else
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    loadUI(Common_DesRandom).then((dialog: Common_DesRandom) => {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsids, 2);
                        this.groupRight.addChild(dialog);
                    });
                } else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsids, 2);
                        this.groupRight.addChild(dialog);
                    });
                }
                else {
                    loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.init(goodsids, 2);
                        this.groupRight.addChild(dialog);
                    });

                }
        }
    }

    //鼠标抬起，移除 物品详情
    private onRemoveAward() {
        let dialog = this.groupRight.getChildByName("Item-skill-common");
        if (dialog) this.groupRight.removeChild(dialog);
    }


    public onButtonClsse() {
        this.close(UI.HIDE_TO_TOP);
        // this.groupRight.removeChildren();
    }

    private CheckTeach(id: number) {
        let canConvernt = PlayerConvertSystem.CanConvert(id);
        if (canConvernt) {
            let type = TableExchangeMall.Item(id).type;
            let name = null;
            if (type == 1) {
                return [canConvernt, null];
            }
            else if (type == 2) {
                return [canConvernt, "ButtonProp"];
            }
            else if (type == 3) {
                return [canConvernt, "ButtonHunter"];
            }
        }
        else {
            return [canConvernt, null];
        }
    }

    private FindIndexById(id: number) {
        let type = TableExchangeMall.Item(id).type;
        let infos = PlayerConvertSystem.SortType(type)
        // let [_v, _k] = Table.FindR(infos, function (k, v) {
        //     return v[0] == id;
        // });
        for (let i = 0; i < infos.length; i++) {
            if (infos[i].id == id) {
                return i;
            }
        }
        return null;
    }

    private itemList: Array<any>;
    private getItemList() {
        this.itemList = [];
        let infos = PlayerConvertSystem.SortType(this.type);
        for (let i = 0; i < infos.length; i++) {
            let item = this.listGood.getElementAt(i);
			this.itemList.push(item);
        }
    }
}
}