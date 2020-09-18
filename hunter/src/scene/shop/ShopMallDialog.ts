namespace zj {
// MallAll_Main
// hexiaowei
// 20018/12/19
export class ShopMallDialog extends Dialog {
    public imgSpriteCost: eui.Image;
    public groupNodeRefresh: eui.Group;
    public labelTimeTips: eui.Label;
    public labelMoney: eui.Label;
    public labelToken: eui.Label;
    public labelTime: eui.Label;
    public labelCost: eui.Label;
    public labelRefresh: eui.Label;
    private btnFresh: eui.Button;
    private imageBackground: eui.Image;
    private scrollerInfo: eui.Scroller;
    private groupSum: eui.Group;
    private imgSpriteRushGes: eui.Image;

    private isNormal = TableEnum.Enum.Mall.NORMAL;
    private isArena = TableEnum.Enum.Mall.ARENA;
    private isLeague = [TableEnum.Enum.Mall.LEAGUE];
    private isHonor = TableEnum.Enum.Mall.HONOR;
    private isLottery = TableEnum.Enum.Mall.LOTTERY;


    //各个类型商店
    private progressMall = {
        [1]: message.EProcessType.PROCESS_TYPE_MALL_NORMAL,
        [2]: message.EProcessType.PROCESS_TYPE_MALL_LADDER,
        [3]: message.EProcessType.PROCESS_TYPE_MALL_LEAGUE,
        [4]: message.EProcessType.PROCESS_TYPE_MALL_HONOR,
        [5]: message.EProcessType.PROCESS_TYPE_MALL_LOTTERY,
    }

    //各个类型商店所需的货币
    private costMall = {
        [1]: message.EResourceType.RESOURCE_MONEY,
        [2]: message.EResourceType.RESOURCE_LADDER,
        [3]: message.EResourceType.RESOURCE_LEAGUE,
        [4]: message.EResourceType.RESOURCE_HONOR_COIN,
        [5]: message.EResourceType.RESOURCE_LOTTERYSCORE,
    }

    //错误码提示
    private costError = {
        [20001]: message.EC.XG_LACK_MONEY,
        [20002]: message.EC.XG_LACK_TOKEN,
        [20004]: message.EC.XG_LACK_LADDERSCORE,
        [20007]: message.EC.XG_LACK_LEAGUECOIN,
        [20014]: message.EC.XG_LACK_LOTTERY_SCORE,
        [20019]: message.EC.XG_LACK_HONOR_COIN,
    }

    //单个商店数据
    public static _mall_data = [];

    private groupButtonType: eui.Group;
    //顶部list
    private listButtonType: eui.List;

    private listltem: eui.List;
    public itemIndex: number = 0;
    private itemIndex1: number = 0;

    //顶部商店类型列表
    private arrCollectionItem: eui.ArrayCollection;
    //商店物品列表
    private array: eui.ArrayCollection;

    private listGoods: eui.List;
    //关闭按钮
    private btnClose: eui.Button;

    private info: any;
    //那种购买方式
    private buyInfo: any;
    // 货币数量
    public nowMoney: number;

    private imgSpriteCost_1: eui.Image;
    // 商店类型（切换）
    public index: number = 0;
    //进入商店的入口类型
    private indexType: number = 0;

    //各个商店类型的数据源
    private mallList: eui.List;

    //创建一个计时器对象
    private timers: egret.Timer;;

    private LastTime = 0;
    private timea: number = 14400;
    private _COST_MALL = [];

    //列表下拉移动位置
    private moveLocation: number = 0;

    private isTime: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/shop/ShopMallDialogSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.listButtonType.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.AddShopMainType, this);

        this.listGoods.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.AddShopmallList, this);
        this.btnFresh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.buttonRefresh, this);

        //注册事件侦听器
        this.timers = new egret.Timer(1000, 0);
        this.timers.start();
        this.timers.addEventListener(egret.TimerEvent.TIMER, this.setUpdate, this);

        this.imageBackground.visible = false;
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.timers.stop();
        }, this)
        if (Device.isReviewSwitch) {
            this.btnFresh.visible = false;
            this.imgSpriteRushGes.visible = false;
            this.labelCost.visible = false;

            this.imgSpriteCost.width = 40;
            this.imgSpriteCost.height = 40;

            this.imgSpriteCost_1.width = 40;
            this.imgSpriteCost_1.height = 40;

            this.btnClose.x = 800;
        }
        this.isTime = Math.floor(egret.getTimer()/1000);
    }


    private Init() {
        // this._mall_data = [];
        this.groupButtonType.visible = true;

        this._COST_MALL = [
            message.EMallType.MALL_TYPE_ORDINARY,  //普通商店
            message.EMallType.MALL_TYPE_LADDER,  //竞技场商店
            message.EMallType.MALL_TYPE_LEAGUE,  //公会商店
            message.EMallType.MALL_TYPE_HONOR,  //荣誉商店
            message.EMallType.MALL_TYPE_LOTTERY,  //酒馆商店
        ]

        //list 加载
        this.listButtonType.selectedIndex = this.index - 1; // 默认选中
        this.listButtonType.itemRenderer = ShopMainType;
        this.arrCollectionItem = new eui.ArrayCollection();
        for (let i = 0; i < this._COST_MALL.length; i++) {
            this.arrCollectionItem.addItem(this._COST_MALL[i]);
        }
        this.listButtonType.dataProvider = this.arrCollectionItem;
        this.itemIndex = this.listButtonType.selectedIndex;
        // this.timerFunc();
        this.setUpdate();
    }

    
    public isFullScreen(){
        return this.imageBackground.visible;
    }

    //商铺入口
    //index : 商店类型 （1、普通商店；2、格斗商店；3、公会商店；4、荣誉商店；5、酒馆商店）
    //shopbool : 表示是否从普通商店进入
    public load(index: number = 0, shopbool?: Boolean, info?: any) {

        this.index = index != 0 ? index : TableEnum.Enum.Mall.NORMAL;
        if (shopbool == true) {
            this.imageBackground.visible = true;
            this.groupSum.y = -606;
            egret.Tween.get(this.groupSum).to({ y: 0 }, 300, egret.Ease.backOut);
        }
        if (info != null) {
            this.indexType = index;
        }
        this.moveLocation = 0;
        /*
        if (this.index == 1) {
            //开始计时
            this.timers.start();
        }
        */
        if (info != null) {
            this.info = info;
        }
        this.Init();
        this.setInfo(index);
        this.setInfoFresh();
    }

    //切换商铺类型
    private setInfo(index: number = 0) {
        this.index = index != 0 ? index : this.index;
        this.reqMallBefore(index);
    }

    //设置本地数据
    private setInfoLocate() {
        // this.setUpdate();
        this.setInfoReset();
        this.setInfoFresh();
    }

    private setUpdate() {
        this.setUpdateRes();
        this.SetUpdateTime();
    }


    //设置刷新花费
    private setInfoReset() {
        let m = Game.PlayerVIPSystem.vipInfo;
        let dayRefreshNum = Game.PlayerVIPSystem.vipInfo.mall_ordinary_time - PlayerVIPSystem.LowItem().mall_free_time;
        let count_mall = {
            [1]: dayRefreshNum,
            [2]: 0,
            [3]: 0,
            [4]: 0,
            [5]: 0,
        }
        let mall = TableEnum.Enum.Mall[this.index]
        let count = count_mall[this.index]

        let str_count = CommonConfig.mall_refresh_token(mall, count);

        if (this.index == TableEnum.Enum.Mall.NORMAL) {
            if (count < 0) {
                str_count[0] = 0;
            }
        }

        this.labelCost.text = str_count[0].toString();

        let str_refresh = TextsConfig.TextsConfig_Mall.mall_refresh;
        this.labelRefresh.text = str_refresh;
    }

    //设置提示文字
    private setInfoFresh() {
        let index = TableEnum.Enum.Mall[this.index] + 1;

        let str_time = ""

        if (this.isNormal == this.index) {
            str_time = TextsConfig.TextsConfig_Mall.fourfreshs;
            this.groupNodeRefresh.visible = true;
        } else {
            str_time = TextsConfig.TextsConfig_Mall.fourfresh;
            this.groupNodeRefresh.visible = false;
        }
        this.labelTimeTips.text = str_time;
    }

    //更新资源信息
    private setUpdateRes() {
        let index = this.index != 0 ? this.index : TableEnum.Enum.Mall.NORMAL;
        let id = this.costMall[index];
        let str_res = PlayerItemSystem.Str_Resoure(id);

        let item: any = PlayerItemSystem.Item(id);
        let path_icon = item.icon;
        let count = PlayerItemSystem.Resource(this.costMall[index]);
        this.nowMoney = count;
        this.labelMoney.text = str_res;

        this.imgSpriteCost_1.source = cachekey(path_icon, this);
        //钻石数量
        let token = Game.PlayerInfoSystem.Token;
        if (token > 100000) {
            this.labelToken.text = Math.floor((token / 10000) * 10) / 10 + "万";
        } else {
            this.labelToken.text = token.toString();
        }
    }

    //金币更新
    public Shopmoney() {
        let token = Game.PlayerInfoSystem.Coin;
        if (token > 100000) {
            this.labelMoney.text = Math.floor((token / 10000) * 10) / 10 + "万";
        } else {
            this.labelMoney.text = token.toString();
        }
    }

    //钻石更新
    public ShopToken() {
        //钻石数量
        let token = Game.PlayerInfoSystem.Token;
        if (token > 100000) {
            this.labelToken.text = Math.floor((token / 10000) * 10) / 10 + "万";
        } else {
            this.labelToken.text = token.toString();
        }
    }

    private SetUpdateTime() {
        let index = this.index || TableEnum.Enum.Mall.NORMAL;
        let progess = this.progressMall[index];
        let time = Game.PlayerProgressesSystem.progressMap[progess].leftTime + this.isTime - Math.floor(egret.getTimer()/1000);
        if (time <= 0 && this.index != message.EMallType.MALL_TYPE_HONOR) {
            this.timers.stop();
            this.ReqProcess(index);
        }
        this.labelTime.text = Helper.GetTimeStr(time, false);
    }

    private ReqProcess(indexs) {
        let index = this.progressMall[indexs];
        ShopMallDialog.CheckProcessReq(index).then(() => {
            this.reqMall(indexs);
            this.timers.start();
        }).catch((reason) => {
    
        });
    }

    public static CheckProcessReq(index) {
        return new Promise((resolve, reject) => {
            let request = new message.CheckProcessRequest();
            request.body.types = index;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.CheckProcessResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    //切换前
    private reqMallBefore(index: number) {
        this.reqMall(index);
    }

    //设置商品列表
    private setInfoMall() {
        this.listGoods.selectedIndex = -1; // 默认选中
        this.array = new eui.ArrayCollection();
        for (let i = 0; i < ShopMallDialog._mall_data[this.index].length; i++) {
            let data = new ShopMainItemData();
            data.mallitem = ShopMallDialog._mall_data[this.index][i];
            data.shopmallscene = this;
            this.array.addItem(data);
        }
        this.listGoods.dataProvider = this.array;
        this.listGoods.itemRenderer = ShopMainItem;
        this.itemIndex1 = this.listGoods.selectedIndex;

        this.scrollerInfo.viewport = this.listGoods;
        this.scrollerInfo.validateNow();
        this.scrollerInfo.viewport.scrollV = this.moveLocation;
    }


    //拉取不同类型商店的数据
    private reqMall(index: number) {
        let type = TableEnum.Enum.Mall[this.index];
        PlayerProgressesSystem.ReqGain(type)
            .then((data: any) => {
                ShopMallDialog._mall_data[this.index] = [];
                ShopMallDialog._mall_data[this.index] = data.body.items;
                let m = ShopMallDialog._mall_data[this.index];
                this.mallList = ShopMallDialog._mall_data[this.index];
                this.setInfoMall();
                this.setInfoLocate();
            })
    }

    //折扣
    public getDiscount() {
        return Table.VIn(this.isLeague, this.index);
    }

    //获取各个商品可购买的数量
    public getMallRemain(id) {
        let remain = 0;

        for (const k in this.mallList) {
            const v = this.mallList[k];
            if (v.mall_id == id) {
                return v.remain;
            }
        }
        return remain;
    }

    /**关闭按钮*/
    private onButtonClose() {
        if (this.index == TableEnum.Enum.Mall.LOTTERY) {
            let times = Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
            Tips.SetSaveTimeByMallNewProduct(message.EMallType.MALL_TYPE_HONOR, times + 1);
        }

        if (this.info != null) {
            this.info.setUI();
        }
        // this.timers.stop();
        // this.timers.reset();
        this.close(UI.HIDE_TO_TOP);
    }

    //点击顶部list 切换商店类型
    private AddShopMainType(e: eui.ItemTapEvent) {
        if (this.index == TableEnum.Enum.Mall.LOTTERY) {
            let times = Tips.GetSaveByMallNewProduct(message.EMallType.MALL_TYPE_HONOR);
            Tips.SetSaveTimeByMallNewProduct(message.EMallType.MALL_TYPE_HONOR, times + 1);
        }
        if (this.itemIndex != this.listButtonType.selectedIndex) {

            if (this.itemIndex == 4) {
                let times = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
                Tips.SetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, times + 1, "MALL");
            }
            if (this.itemIndex == 2) {
                let times = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, "MALL");
                Tips.SetSaveIntValue(message.EMallType.MALL_TYPE_LEAGUE, times + 1, "MALL");
            }

            let onstate = this.GetOpen(this.listButtonType.selectedIndex + 1, true, true);
            if (onstate) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.listButtonType.selectedIndex]);
                this.itemIndex = this.listButtonType.selectedIndex;
                this.load(this.itemIndex + 1);
            }
        }
    }



    //点击购买物品
    public buy(mallId, count: number) {
        let type = TableEnum.Enum.Mall[this.index];
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

                this.scrollerInfo.viewport = this.listGoods;
                this.scrollerInfo.validateNow();
                this.moveLocation = this.scrollerInfo.viewport.scrollV;
                //this.load(this.index);
                this.reqMall(this.index);
                if (this.info != null) {
                    this.info.setUI();
                }
                //this.Init();
            })
            .catch(reason => { });
    }

    //购买商品界面
    private AddShopmallList(e: eui.ItemTapEvent) {

        if (this.itemIndex1 != this.listGoods.selectedIndex) {
            this.array.itemUpdated(this.array.source[this.itemIndex1]);
            this.array.itemUpdated(this.array.source[this.listGoods.selectedIndex]);
            this.itemIndex1 = this.listGoods.selectedIndex;

        }

        let tbl = TableQuickMall.Table();
        let lastData: any = ShopMallDialog._mall_data[this.index][this.itemIndex1];
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



    //刷新普通商城
    private buttonRefresh() {
        loadUI(ConfirmCancelDialog)
            .then((dialog: ConfirmCancelDialog) => {
                dialog.setInfo(Helper.StringFormat(TextsConfig.TextsConfig_Mall.refresh_confirm, this.labelCost.text));
                dialog.setCB(() => {
                    if (Number(this.labelCost.text) > Game.PlayerInfoSystem.Token) {
                        loadUI(ConfirmCancelDialog)
                            .then((dialog: ConfirmCancelDialog) => {
                                dialog.setInfo(Helper.StringFormat(TextsConfig.TextsConfig_Money.demstone));
                                dialog.show(UI.SHOW_FILL_OUT);
                            });
                    } else {
                        let type = TableEnum.Enum.Mall[this.index];
                        PlayerProgressesSystem.ReqRefresh(type)
                            .then((data: any) => {
                                if (this.indexType == 5) {
                                    this.info.setUI();
                                }
                                ShopMallDialog._mall_data[this.index] = [];
                                ShopMallDialog._mall_data[this.index] = data.body.items;
                                this.mallList = ShopMallDialog._mall_data[this.index];
                                this.setInfoMall();
                                this.setInfoLocate();
                            })
                    }
                });
                dialog.show(UI.SHOW_FILL_OUT);
            });
    }

    //判断商店是否达到解锁条件
    public GetOpen(index, bTips, isdown): boolean {
        if (index == TableEnum.Enum.Mall.NORMAL) {
            return true;
        } else if (index == TableEnum.Enum.Mall.ARENA) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER, isdown);
        } else if (index == TableEnum.Enum.Mall.LEAGUE) {
            return true
                && PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE, isdown)
                && PlayerHunterSystem.LevelDBOpenLeague(bTips)
                && Game.PlayerInfoSystem.LeagueId != 0;
        } else if (index == TableEnum.Enum.Rank.CONTEND) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.EC.XG_OPENFUNCTION_CONTEND, isdown);
        } else if (index == TableEnum.Enum.Mall.LOTTERY) {
            return true;
        } else if (index == TableEnum.Enum.OneKeySell.Demon) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON, isdown);
        } else if (index == TableEnum.Enum.Mall.HONOR) {
            return PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_SINGLE_CRAFT, isdown);
        }
    }

    public GetTips(index): boolean {
        if (index == TableEnum.Enum.Mall.NORMAL) {
            return Tips.GetTipsOfId(Tips.TAG.MALL, 1);
        } else if (index == TableEnum.Enum.Mall.ARENA) {
            return true && PlayerHunterSystem.LevelDBFunOpenTo(2) && Tips.GetTipsOfId(Tips.TAG.LADDER, 2);
        } else if (index == message.EMallType.MALL_TYPE_LEAGUE) {
            return true && Game.PlayerInfoSystem.LeagueId != 0
                && PlayerHunterSystem.LevelDBFunOpenTo(1)
                && PlayerHunterSystem.LevelDBFunOpenLeague(false)
                && Tips.GetTipsOfId(Tips.TAG.LEAGUE, Tips.TAG.LEAGUE_MALL);
        } else if (index == TableEnum.Enum.Mall.LOTTERY) {
            let times = Tips.GetSaveIntValue(message.EMallType.MALL_TYPE_LOTTERY, "MALL");
            if (times < 3) {
                return false;
            } else {
                //return Tips.GetTipsOfId(Tips.TAG.TREAUSER, 2);
                return false;
            }
        } else if (index == TableEnum.Enum.Mall.HONOR) {
            return true && PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WORLD_FIRST) && Tips.GetTipsOfId(Tips.TAG.LADDER, 6);
        }
    }


}

}