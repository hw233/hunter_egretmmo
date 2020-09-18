namespace zj {
//RelicOpenChest
//hexiaowei
// 2019/03/013
export class RelicOpenChest extends Dialog {

    private groupEntirety: eui.Group;

    private groupCard1: eui.Group;
    private groupItemContent1: eui.Group;
    private imageItemFrame1: eui.Image;
    private imageItemIcon1: eui.Image;
    private labelItemNum1: eui.BitmapLabel;
    private labelItemName1: eui.Label;
    private groupCardBack1: eui.Group;
    private imageBack_1: eui.Image;
    private groupCost1: eui.Group;
    private labelCost1: eui.Label;
    private labelFree1: eui.Label;

    private groupAnim1: eui.Group;
    private groupAnim2: eui.Group;
    private groupAnim3: eui.Group;
    private groupAnim4: eui.Group;
    private groupAnim5: eui.Group;
    private groupAnim6: eui.Group;

    private groupCard2: eui.Group;
    private groupItemContent2: eui.Group;
    private imageItemFrame2: eui.Image;
    private imageItemIcon2: eui.Image;
    private labelItemNum2: eui.BitmapLabel;
    private labelItemName2: eui.Label;
    private groupCardBack2: eui.Group;
    private imageBack_2: eui.Image;
    private groupCost2: eui.Group;
    private labelCost2: eui.Label;
    private labelFree2: eui.Label;

    private groupCard3: eui.Group;
    private groupItemContent3: eui.Group;
    private imageItemFrame3: eui.Image;
    private imageItemIcon3: eui.Image;
    private labelItemNum3: eui.BitmapLabel;
    private labelItemName3: eui.Label;
    private groupCardBack3: eui.Group;
    private imageBack_3: eui.Image;
    private groupCost3: eui.Group;
    private labelCost3: eui.Label;
    private labelFree3: eui.Label;

    private groupCard4: eui.Group;
    private groupItemContent4: eui.Group;
    private imageItemFrame4: eui.Image;
    private imageItemIcon4: eui.Image;
    private labelItemNum4: eui.BitmapLabel;
    private labelItemName4: eui.Label;
    private groupCardBack4: eui.Group;
    private imageBack_4: eui.Image;
    private groupCost4: eui.Group;
    private labelCost4: eui.Label;
    private labelFree4: eui.Label;

    private groupCard5: eui.Group;
    private groupItemContent5: eui.Group;
    private imageItemFrame5: eui.Image;
    private imageItemIcon5: eui.Image;
    private labelItemNum5: eui.BitmapLabel;
    private labelItemName5: eui.Label;
    private groupCardBack5: eui.Group;
    private imageBack_5: eui.Image;
    private groupCost5: eui.Group;
    private labelCost5: eui.Label;
    private labelFree5: eui.Label;

    private groupCard6: eui.Group;
    private groupItemContent6: eui.Group;
    private imageItemFrame6: eui.Image;
    private imageItemIcon6: eui.Image;
    private labelItemNum6: eui.BitmapLabel;
    private labelItemName6: eui.Label;
    private groupCardBack6: eui.Group;
    private imageBack_6: eui.Image;
    private groupCost6: eui.Group;
    private labelCost6: eui.Label;
    private labelFree6: eui.Label;

    private buttonShowAward: eui.Button;
    private buttonAllOpen: eui.Button;
    private labelCost: eui.Label;
    private labelLastFreeTime: eui.Label;
    private labelMaxOpenTime: eui.Label;
    private buttonClose: eui.Button;
    private imageRect: eui.Image;
    private openInfos;

    private chestId: number;
    private allFreeTimes: number;
    private allTimes: number;
    private chestTbl: TableInstanceRelicChest;
    private openPosInfo;
    private allNum: number;

    private father: RelicFinaChest | Relic_BigEnd;
    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicOpenChestSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.groupCardBack1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard1, this);
        this.groupCardBack2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard2, this);
        this.groupCardBack3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard3, this);
        this.groupCardBack4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard4, this);
        this.groupCardBack5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard5, this);
        this.groupCardBack6.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupCard6, this);

        this.groupItemContent1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent1, this);
        this.groupItemContent2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent2, this);
        this.groupItemContent3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent3, this);
        this.groupItemContent4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent4, this);
        this.groupItemContent5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent5, this);
        this.groupItemContent6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGroupContent6, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);

        this.buttonAllOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAllOpen, this);
        this.buttonShowAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonShowAward, this);
        this.imageRect.visible = false;
        this.Init();
    }

    private Init() {
        this.openPosInfo = [];
        for (var i = 1; i <= 6; i++) {
            this.openPosInfo.push(null);
        }
    }

    //添加龙骨动画
    public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
        Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
            .then(display => {
                display.scaleY = 0.8;
                display.scaleX = 0.85;
                display.x = group.explicitWidth / 2
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
            .catch(reason => {
                toast(reason);
            });
    }

    public setChestId(id: number, father: RelicFinaChest | Relic_BigEnd) {
        this.chestId = id;
        this.father = father;
        let chestTbl = PlayerDarkSystem.RelicInstanceChest(id);
        this.chestTbl = chestTbl;
        // 总免费次数
        let allFreeTimes = Table.Count(chestTbl.price, function (k, v) {
            let count = v == 0 ? 1 : 0;
            return count;
        });
        this.allFreeTimes = allFreeTimes;
        // 总开启次数
        let allTimes = chestTbl.open_time;
        this.allTimes = allTimes;
        // 已经开启信息
        this.openInfos = Table.FindR(Game.PlayerInstanceSystem.RelicChest, function (k, v) {
            return v.key == id;
        });
        // 设置宝箱信息
        for (var i = 1; i <= this.openInfos[0].value; i++) {
            let key = this.openPosInfo.length - i;
            this.openPosInfo[key] = -1;

            this[`groupCard${key + 1}`].visible = false;
        }
        this.setUI();
    }

    private setUI() {
        // 已经开启信息
        let chestid = this.chestId;
        this.openInfos = Table.FindR(Game.PlayerInstanceSystem.RelicChest, function (k, v) {
            return v.key == chestid;
        });
        // 剩余免费次数
        let lastFreeTimes = this.allFreeTimes > this.openInfos[0].value ? this.allFreeTimes - this.openInfos[0].value : 0;

        this.labelMaxOpenTime.text = this.allTimes.toString();
        this.labelLastFreeTime.text = lastFreeTimes.toString();
        if (lastFreeTimes != 0) {
            this.labelLastFreeTime.textColor = Helper.RGBToHex("r:60,g:255,b:0");
        } else {
            this.labelLastFreeTime.textColor = Helper.RGBToHex("r:255,g:38,b:0");
        }

        //花费
        let cost = this.chestTbl.price[this.openInfos[0].value];
        for (var i = 1; i <= 6; i++) {
            if (cost == 0) {
                this[`groupCost${i}`].visible = false;
                this[`labelFree${i}`].visible = true;
            } else {
                this[`groupCost${i}`].visible = true;
                this[`labelFree${i}`].visible = false;
                this[`labelCost${i}`].text = cost;
            }
        }
        // 全开花费
        // 剩余开启次数
        let price = this.chestTbl.price;
        let lastOpenTimes = this.allTimes - this.openInfos[0].value;
        let allCost = Table.Add(this.openInfos[0].value, 5, function (i) {
            return price[i];
        });
        this.buttonAllOpen.enabled = lastOpenTimes != 0;
        this.labelCost.text = allCost.toString();
        this.allNum = allCost;

    }

    private setGoodsInfo(Info, index) {
        let i = index;
        let cur_goods = Info;
        let goods_type = PlayerItemSystem.ItemType(cur_goods.goodsId);
        let itemSet = PlayerItemSystem.Set(cur_goods.goodsId, null, cur_goods.count);
        this[`imageItemFrame${i}`].source = cachekey(itemSet.Frame, this);
        this[`imageItemIcon${i}`].source = cachekey(itemSet.Clip, this);
        this[`labelItemNum${i}`].text = cur_goods.count;
        let itemInfo: any = itemSet.Info;

        this[`labelItemName${i}`].text = itemInfo.name;
        this[`labelItemName${i}`].textColor = ConstantConfig_Common.Color.psy_quality_color[itemInfo.quality - 1];

    }

    private playPosAni(Infos, indexs) {
        for (const k in Infos) {
            this.setGoodsInfo(Infos[k], indexs[k]);

            this[`groupItemContent${indexs[k]}`].visible = false;
        }
        egret.Tween.get(this.groupEntirety)
            .call(() => {
                for (const k in Infos) {
                    egret.Tween.get(this[`groupCardBack${indexs[k]}`])
                        .to({ scaleX: 0 }, 600, egret.Ease.backIn)
                        .to({ scaleX: 1 }, 600, egret.Ease.backIn)
                        .call(() => {
                            this[`groupCardBack${indexs[k]}`].visible = false;
                            this[`groupItemContent${indexs[k]}`].visible = true;
                            this.imageRect.visible = false;
                            let goods_type = PlayerItemSystem.ItemType(Infos[k].goodsId);
                            let itemSet = PlayerItemSystem.Set(Infos[k].goodsId, null, Infos[k].count).Info;
                            if (itemSet["quality"] == 5) {
                                this.addAnimatoin("kapai_chengse", "002_xunhuan_hou", 0, this[`groupAnim${indexs[k]}`])
                            }
                        })
                }
            })
    }

    private openRelicChest(chestId: number, indexs: Array<number>) {
        let cost = this.chestTbl.price[this.openInfos[0].value];
        let nowGold = Game.PlayerInfoSystem.Token;
        if (nowGold < cost) {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Tavern.tips, (() => {

                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init();
                    });
            }))
        } else {
            this.imageRect.visible = true;
            RelicOpenChest.ReqOpenChest(chestId, indexs)
                .then((data: any) => {
                    for (const k in indexs) {
                        const v = indexs[k];
                        this.openPosInfo[Number(v) - 1] = data.body.gameInfo.getGoods[k];
                    }
                    let mn = this.openPosInfo;
                    this.setUI();
                    this.playPosAni(data.body.gameInfo.getGoods, indexs);
                }).catch((reason) => {
                    this.imageRect.visible = false;
                    toast(reason)
                });
        }

    }

    public static ReqOpenChest(chestId: number, indexs: Array<number>) {
        return new Promise((resolve, reject) => {
            let request = new message.OpenRelicChestRequest();
            request.body.chest_id = chestId;
            request.body.is_open_all = indexs.length > 1;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.OpenRelicChestResponse>resp;
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

    private onButtonAllOpen() {
        if (this.allNum > Game.PlayerInfoSystem.Token) {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_Tavern.tips, (() => {
                loadUI(PayMallScene)
                    .then((scene: PayMallScene) => {
                        scene.show(UI.SHOW_FROM_TOP);
                        scene.init();
                    });
            }))
        } else {
            let canOpenPos = [];
            for (const k in this.openPosInfo) {
                const v = this.openPosInfo[k];
                if (v != -1 && v == null) {
                    canOpenPos.push(Number(k) + 1);
                }
            }
            for (let i = 0; i < canOpenPos.length; i++) {
                this.openRelicChest(this.chestId, [canOpenPos[i]]);
            }
        }
    }

    private onGroupCard1() {
        this.openRelicChest(this.chestId, [1]);
    }

    private onGroupCard2() {
        this.openRelicChest(this.chestId, [2]);
    }

    private onGroupCard3() {
        this.openRelicChest(this.chestId, [3]);
    }

    private onGroupCard4() {
        this.openRelicChest(this.chestId, [4]);
    }

    private onGroupCard5() {
        this.openRelicChest(this.chestId, [5]);
    }

    private onGroupCard6() {
        this.openRelicChest(this.chestId, [6]);
    }

    private onGroupContent1(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[0], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private onGroupContent2(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[1], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private onGroupContent3(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[2], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private onGroupContent4(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[3], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private onGroupContent5(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[4], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }

    private onGroupContent6(e: egret.TouchEvent) {
        Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { info: <message.GoodsInfo>this.openPosInfo[5], xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
    }


    private onButtonShowAward() {
        let tblInfo = PlayerDarkSystem.RelicInstanceChest(this.chestId);
        let goodsMap = [];
        for (var i = 0; i < tblInfo.client_good.length; i++) {
            let goods = new message.GoodsInfo;
            goods.goodsId = tblInfo.client_good[i];
            goods.count = 0;
            goods.showType = 1;
            goodsMap.push(goods);
        }

        loadUI(Common_DesRelic)
            .then((dialog: Common_DesRelic) => {
                dialog.setInfoActivity(goodsMap);
                dialog.show(UI.SHOW_FROM_TOP);
            });

    }

    private onButtonClose() {
        let chestId = this.chestId;;
        let openInfos = Table.FindR(Game.PlayerInstanceSystem.RelicChest, function (k, v) {
            return v.key == chestId;
        });
        let haveFree = this.allFreeTimes > this.openInfos[0].value;
        let lastOpenTimes = this.allTimes - this.openInfos[0].value;
        if (!haveFree && (lastOpenTimes > 0)) {
            TipManager.ShowConfirmCancel(TextsConfig.TextsConfig_DarkLand.relic.closeCannotOpen, (() => {
                this.close(UI.HIDE_TO_TOP), this.father.setInfoList()
            }))
        } else {
            this.close(UI.HIDE_TO_TOP);
            this.father.setInfoList();
        }
    }

    private showGoodsProperty(ev: egret.Event) {
        if (Game.UIManager.dialogCount() == 3) return;
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }

}

}