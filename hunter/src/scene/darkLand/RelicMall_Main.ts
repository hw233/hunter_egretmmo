namespace zj {
//RelicMall_Main (晶石商店)
//hexiaowei
// 2019/03/08
export class RelicMall_Main extends Dialog {

    private buttonClose: eui.Button;
    private labelRefresh: eui.Label;
    private buttonFresh: eui.Button;
    private imageRushGes: eui.Image;
    private labelTime: eui.Label;
    private labelCost: eui.Label;
    private labelRefreshTimes: eui.Label;
    private labelToken: eui.Label;
    private listInfo: eui.List;
    private imageCost: eui.Image;

    private mall_list: Array<message.MallItem>;

    private selectedItem: eui.ArrayCollection;
    private selectedIndex: number = 0;

    private buyInfo: any;
    public itemIndex: number = 7;
    // 货币数量
    public nowMoney: number;
    //创建一个计时器对象
    private timer: egret.Timer = new egret.Timer(1000, 0);

    private numberMoney: number;
    private isNumber: number ;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicMall_MainSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.listInfo.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.AddShopmallList, this);
        this.buttonFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonRefresh, this);

        this.timer.addEventListener(egret.TimerEvent.TIMER, this.setUpdateTime, this);
        this.timer.start();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.timer.stop();
            egret.Tween.removeTweens(this);
        }, this)
        this.setInfo();

    }

    private setInfo() {
        this.isNumber =  Math.floor(egret.getTimer()/1000);
        this.setInfoReset();
        this.reqMallBefore();
        this.setInfoLocate();
    }

    //设置本地数据
    private setInfoLocate() {
        this.setUpdate()
        //this.setInfoFresh()
    }

    //更新
    private setUpdate() {
        this.setUpdateRes()
        this.setUpdateTime()
    }
    //更新资源信息
    private setUpdateRes() {
        let index = 7;
        let id = message.EResourceType.RESOURCE_RELIC_COIN;
        let str_res = PlayerItemSystem.Str_Resoure(id);
        this.nowMoney = Number(str_res);
        let item: any = PlayerItemSystem.Item(id);
        let path_icon = item.icon;

        this.labelToken.text = str_res;
        this.imageCost.source = cachekey(path_icon, this);

    }


    //更新刷新时间
    private setUpdateTime() {
        let index = 7;
        let progess = message.EProcessType.PROCESS_TYPE_MALL_RELIC;
        let time = Game.PlayerProgressesSystem.progressMap[progess].leftTime + this.isNumber;
        time = time - Math.floor(egret.getTimer()/1000) ;
        let str_time = Helper.GetTimeStr(time, false);

        this.labelTime.text = str_time;

        if (time <= 0) {
            this.timer.stop();
            this.reqProcessVisit();
        }
    }

    // //设置提示文字
    // private setInfoFresh(){
    //     let str_time = TextsConfig.TextsConfig_Mall.fourfreshs;

    // }

    //设置商品列表
    private setInfoMall() {

        this.listInfo.selectedIndex = 0; // 默认选中
        this.listInfo.itemRenderer = RelicMall_MainItem;//
        this.selectedItem = new eui.ArrayCollection();
        for (const k in this.mall_list) {
            let data = new RelicMall_MainItemData();
            data.mallitem = this.mall_list[k];
            data.relicmallmain = this;
            this.selectedItem.addItem(data);
        }

        this.listInfo.dataProvider = this.selectedItem;
        this.selectedIndex = this.listInfo.selectedIndex;
    }

    private reqProcessVisit() {
        PlayerDarkSystem.ReqProcess()
            .then((data: any) => {
                this.reqMallBefore();
            })
            .catch(reason => { toast_warning(reason) });

    }

    private reqMallBefore() {
        PlayerDarkSystem.reqMall()
            .then((data: any) => {
                this.timer.start();
                this.mall_list = data.items;
                this.setInfoMall();
                this.setInfoReset();
                this.setUpdateRes();
            })
            .catch(reason => { toast_warning(reason) });
    }


    //折扣
    public getDiscount() {
        return false;
    }

    //不限制购买
    public getLimit() {
        return false;
    }

    public getMallRemain(id) {
        let remain = 0
        for (const k in this.mall_list) {
            const v = this.mall_list[k];
            if (v.mall_id == id) {
                remain = v.remain;
            }
        }
        return remain
    }

    // 设置刷新花费
    private setInfoReset() {

        let countMall = [Game.PlayerVIPSystem.vipInfo.mall_ordinary_time, 0, 0, 0, 0];
        let mall = message.EMallType.MALL_TYPE_RELIC;
        let count = Game.PlayerVIPSystem.vipInfo.mall_relic_time;
        let str_count = CommonConfig.mall_refresh_token(mall, count);
        this.labelCost.text = str_count[0].toString();
        this.numberMoney = str_count[0];

        let bNotVipOpenSecret = false;
        let str_refresh = TextsConfig.TextsConfig_Mall.mall_refresh;
        this.labelRefresh.text = str_refresh;

        // let bHide = false
        // self.nodeRefresh:setVisible(not bHide)

        let freshLastTime = PlayerVIPSystem.ItemNew().mall_relic_time - count;
        this.labelRefreshTimes.text = Helper.StringFormat(TextsConfig.TextsConfig_DarkLand.relic.mallLastFresh, freshLastTime);

    }

    //点击购买物品
    public buy(mallId, count: number) {
        let type = 7;
        PlayerProgressesSystem.ReqBuy(type, mallId, count)
            .then((data: any) => {
                egret.Tween.get(this)
                    .call(() => {
                        this.buyInfo.onBtnClose();
                        //this.tavern.removeChild(this); 
                    })
                    .wait(500, true)
                    .call(() => {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.init(data.body.gameInfo.getGoods);
                                dialog.show();
                            });
                    });

                this.reqMallBefore();

            })
        .catch(reason => { }); 
    }


    //购买商品界面
    private AddShopmallList(e: eui.ItemTapEvent) {

        if (this.selectedIndex != this.listInfo.selectedIndex) {
            this.selectedItem.itemUpdated(this.selectedItem.source[this.selectedIndex]);
            this.selectedItem.itemUpdated(this.selectedItem.source[this.listInfo.selectedIndex]);
            this.selectedIndex = this.listInfo.selectedIndex;

        }

        let tbl = TableQuickMall.Table();
        let lastData: any = this.mall_list[this.selectedIndex];
        if (lastData.remain <= 0) {

        } else {
            let num: number = 0;
            if (lastData.buy_limit < Game.PlayerInfoSystem.Level) {
                num = this.getMallRemain(lastData.mall_id)
            }
            if (lastData.remain >= 10) {
                loadUI(ShopBuyAll)
                    .then((dialog: ShopBuyAll) => {
                        this.buyInfo = dialog;
                        dialog.init();
                        dialog.setInfo(lastData, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });
            }
            else {
                loadUI(ShopBuyOne)
                    .then((dialog: ShopBuyOne) => {
                        this.buyInfo = dialog;
                        dialog.setInfo(lastData, this);
                        dialog.show(UI.SHOW_FROM_TOP);
                    });

            }
        }
    }

    //刷新商品
    private buttonRefresh() {
        loadUI(ConfirmCancelDialog)
            .then((dialog: ConfirmCancelDialog) => {
                dialog.setInfo(Helper.StringFormat(TextsConfig.TextsConfig_Mall.refresh_confirm2, this.labelCost.text));
                dialog.setCB(() => {
                    let a = this.numberMoney;
                    if (this.numberMoney > this.nowMoney) {
                        loadUI(ConfirmCancelDialog)
                            .then((dialog: ConfirmCancelDialog) => {
                                dialog.setInfo(Helper.StringFormat(TextsConfig.TextsConfig_Money.demstone));
                                dialog.show(UI.SHOW_FILL_OUT);
                            });
                    } else {
                        PlayerProgressesSystem.ReqRefresh(7)
                            .then((data: any) => {
                                this.setInfo();

                            })
                    }
                });
                dialog.show(UI.SHOW_FILL_OUT);
            });
    }

    private onButtonClose() {
        this.timer.stop();
        this.close(UI.HIDE_TO_TOP);
    }


}

}