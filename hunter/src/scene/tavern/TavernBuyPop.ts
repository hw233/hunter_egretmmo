namespace zj {
    //Tavern BuyPop
    //hexiaowei
    //2018/11/12
    export class TavernBuyPop extends Dialog {
        private spriteFrame: eui.Image;
        private spriteIcon: eui.Image;
        private spriteNode: eui.Image;
        private spriteLogo: eui.Image;
        private textName: eui.Label;
        private textNum: eui.Label;
        private textInfo: eui.Label;
        private textCount: eui.Label;
        private textOwn: eui.Label;
        private spriteCost2: eui.Image;
        private textCost2: eui.Label;
        private groupWhole: eui.Group;
        private labelPossessBeelNum: eui.Label;
        private groupBeer: eui.Group;

        private resunm: number = 2;
        private count: number = 1;
        private goodId: number = 0;
        private num: number = 0;
        private tavern: TavernScene;
        private MIN_COUNT: number = 1;
        private MAX_COUNT: number = 10;

        private btnSub: eui.Button;
        private btnAdd: eui.Button;
        private btnMax: eui.Button;
        private btnBuy: eui.Button;
        private btnClose: eui.Button;

        public constructor() {
            super();
            this.skinName = "resource/skins/tavern/TavernBuyPopSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.resunm = 0;
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2
                    //display.y =this.height*0.25;
                    display.y = group.explicitHeight / 2;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        public init(tavern) {
            this.tavern = tavern;
            this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSub, this);
            this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAdd, this);
            this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMax, this);
            this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);

        }

        public setInfo(goodId: number, num: number, typestate: number) {
            this.num = num;
            this.goodId = goodId;
            if (typestate == 1) {
                this.count = 1;
            } else {
                this.count = 10 - num;
            }
            if (this.count <= 0) {
                this.count = 1;
            }
            this.setInfoMall();
            let OnAbovePop = () => {
                if (this.goodId == message.EResourceType.RESOURCE_PROMISE) {
                    let canBuyNum = 0
                    let xuyuanTbl = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json");
                    let quickMallInfo = Game.ConfigManager.getTable(StringConfig_Table.fastMall + ".json")[message.EResourceType.RESOURCE_PROMISE];
                    let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % Object.keys(xuyuanTbl).length;
                    index = index == 0 && Object.keys(xuyuanTbl).length || index;
                    let openIndex = index;
                    let xuyuanTbl0 = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json")[openIndex];
                    if (xuyuanTbl != null) {
                        let maxTime = xuyuanTbl0.max_time
                        let useTime = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
                        let ownNum = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_PROMISE);
                        canBuyNum = maxTime - useTime - ownNum;
                        let tokenCanBuyNum = Math.floor(PlayerItemSystem.Resource(message.EResourceType.RESOURCE_TOKEN) / quickMallInfo.consume_num);
                        canBuyNum = canBuyNum < tokenCanBuyNum ? canBuyNum : tokenCanBuyNum;
                        canBuyNum = canBuyNum > 99 ? 99 : canBuyNum;
                        this.MAX_COUNT = canBuyNum;
                    }
                }
            }
            OnAbovePop();
        }
        public setInfoMall() {
            let tbl = TableQuickMall.Table();
            let restbl = TableItemResource.Table();

            let consumeType = tbl[this.goodId].consume_type;
            let resNum = tbl[this.goodId].consume_num;
            this.resunm = resNum;
            let itemIcon = restbl[consumeType].icon;
            let count = Game.PlayerInfoSystem.Beer;
            //this.labelPossessBeelNum.text = this.count.toString();
            this.labelPossessBeelNum.text = this.num.toString();
            //let itemSet = itemdb.Set(this._goodId, 1, count);
            let str_count = HelpUtil.textConfigFormat("%s%d", TextsConfig.TextsConfig_Mall.buy_count, count);
            this.spriteFrame.source = cachekey(UIConfig.UIConfig_Role.itemFrame[PlayerItemSystem.ItemQuality(this.goodId)], this);
            //this.spriteFrame.source = cachekey(UIConfig.UIConfig_Common.nothing , this) ;
            let item: any = PlayerItemSystem.Item(this.goodId);
            this.spriteLogo.source = cachekey(UIConfig.UIConfig_Common.nothing, this);
            this.textName.text = item.name;
            //this.textNum.text = count.toString();
            this.textOwn.text = str_count;
            this.textInfo.text = item.des;
            this.textCost2.text = (this.count * resNum).toString();
            this.spriteCost2.source = cachekey(itemIcon, this);
            this.textCount.text = this.count.toString();
            this.spriteIcon.source = cachekey(PlayerItemSystem.ItemPath(this.goodId), this);
            this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupBeer);
        }


        public onBtnSub() {
            if (this.count > 1) {
                this.count -= 1;
            }
            this.setInfoCount();
        }
        public onBtnAdd() {
            if (this.count < this.MAX_COUNT) {
                this.count += 1;
            }
            this.setInfoCount();
        }

        public setInfoCount() {
            this.textCount.text = this.count.toString();
            this.textCost2.text = (this.count * this.resunm).toString();
        }

        public onBtnMax() {
            this.count = Math.floor(Game.PlayerInfoSystem.Token / this.resunm);

            if (this.count == 0) {
                this.count = 1;
            }

            if (this.count > 10) {
                this.count = this.MAX_COUNT;
            }
            this.setInfoCount();
        }

        public onBtnBuy() {
            this.reqConvert();
        }

        public reqConvert() {
            PlayerInfoSystem.buyBeer(this.goodId, this.count)
                .then((data: message.QuickMallResponse) => {
                    this.buyBeerResolve(data);
                }).catch((toast) => {
                    if (toast == message.EC.XG_GOODS_NOT_ENOUGH || toast == message.EC.XG_LACK_TOKEN) {
                        TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
                            setTimeout(() => {
                                call();
                            }, 450)
                        });
                        let call = () => {
                            loadUI(PayMallScene)
                                .then((scene: PayMallScene) => {
                                    scene.show(UI.SHOW_FROM_TOP);
                                    scene.init();
                                });
                        }
                    } else {
                        toast_warning(Game.ConfigManager.getAone2CodeReason(toast));
                    }
                });
            //this.compose(this._goodId, this._count);
            this.tavern.setUI();

        }

        public buyBeerResolve(data: message.QuickMallResponse) {
            if (data.header.result == 0) {
                if (data.body.gameInfo.getGoods != null) {
                    this.close(UI.HIDE_TO_TOP);
                    this.tavern.setUI();
                    setTimeout(() => {
                        loadUI(CommonGetDialog)
                            .then((dialog: CommonGetDialog) => {
                                dialog.init(data.body.gameInfo.getGoods);
                                dialog.show();
                            });
                    }, 300)

                }
            } else if (data.header.result == message.EC.XG_GOODS_NOT_ENOUGH || data.header.result == message.EC.XG_LACK_TOKEN) {
                TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Money.demstone, () => {
                    setTimeout(() => {
                        call();
                    }, 450)

                });
                let call = () => {
                    loadUI(PayMallScene)
                        .then((scene: PayMallScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                            scene.init();
                        });
                }

            }

        }


        public onBtnClose() {
            //this._tavern.removeChild(this);   
            this.close(UI.HIDE_TO_TOP);
        }
    }

}