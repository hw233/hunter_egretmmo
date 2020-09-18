namespace zj {
    // 形象变换
    // lizhengiang
    // 20190316
    export class FashionMain extends Dialog {
        private groupLeft: eui.Group;
        private lstHeroes: eui.List;
        private groupRight: eui.Group;
        private imgFloor: eui.Image;
        private lbFashionName: eui.Label;
        private groupFashion: eui.Group;
        private groupProgress: eui.Group;
        private groupSellect: eui.Group;
        private btnLeft: eui.Button;
        private btnRight: eui.Button;
        private groupBuy: eui.Group;
        private btnBuy: eui.Button;
        private lbBuyNum: eui.Label;
        private btnUse: eui.Button;
        private imgUseing: eui.Image;
        private lbDes: eui.Label;
        private imgCost: eui.Image;
        private lbToken: eui.Label;
        private btnClose: eui.Button;

        private timer: egret.Timer;
        private arrCollection: eui.ArrayCollection;
        private focusHunterIndex: number = 0;
        private currentHunterFashionIndex: number = 0;
        private hunterTbl: Array<TableBaseGeneral> = [];
        private currentHunterFashionList: Array<{ id: number, state: number }>;
        private generalHasGet: boolean = false;

        private rectMask: eui.Image = null;

        private moveBX: number = null;
        private moveEX: number = null;

        private hasLeft: boolean;
        private hasRight: boolean;

        public constructor() {
            super();
            this.skinName = "resource/skins/fashion/FashionMainSkin.exml";
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.lstHeroes.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedItem, this);
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
            this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuy, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeft, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRight, this);
            this.imgFloor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMoveBegin, this);
            this.imgFloor.addEventListener(egret.TouchEvent.TOUCH_END, this.onMoveEnd, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                if (this.timer) this.timer.stop();
            }, null);
        }

        public init() {
            this.setInfoResources();
            this.timer = new egret.Timer(990, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoResources, this);
            this.timer.start();

            this.rectMask = Util.getMaskImgBlack(this.groupSellect.width / 2, this.groupSellect.height);
            this.rectMask.verticalCenter = 0;
            this.groupProgress.addChild(this.rectMask);

            this.groupSellect.mask = this.rectMask;

            this.setInfoHunterList();
            this.setInfoHunterInfo();
        }

        private setInfoResources() {
            let count: number = Game.PlayerItemSystem.mapGoodsInfo[31201] ? Game.PlayerItemSystem.mapGoodsInfo[31201].count : 0;
            this.lbToken.text = Set.NumberUnit3(count);
        }

        private setInfoHunterList() {
            this.hunterTbl = PlayerFashionSystem.GetHunterListWithFashion();
            this.arrCollection = new eui.ArrayCollection();
            for (let v of this.hunterTbl) {
                this.arrCollection.addItem(v);
            }

            let fix: number = this.hunterTbl.length % 3;
            if (fix) {
                for (let i = 0; i < 3 - fix; i++) {
                    this.arrCollection.addItem(null);
                }
            }

            this.lstHeroes.dataProvider = this.arrCollection;
            this.lstHeroes.itemRenderer = FashionMainItemIR;
            this.lstHeroes.selectedIndex = 0;
        }

        private onLstSelectedItem(e: eui.PropertyEvent) {
            if (this.focusHunterIndex != this.lstHeroes.selectedIndex && this.lstHeroes.selectedItem != null) {
                this.arrCollection.itemUpdated(this.arrCollection.source[this.focusHunterIndex]);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.lstHeroes.selectedIndex]);
                this.focusHunterIndex = this.lstHeroes.selectedIndex;

                this.setInfoHunterInfo();
            }
        }

        private setInfoHunterInfo() {
            let currentGeneralTbl = this.hunterTbl[this.focusHunterIndex];

            this.generalHasGet = Table.FindF(PlayerHunterSystem.GetHunterList(), function (k, v) { return currentGeneralTbl.general_id == PlayerHunterSystem.GetGeneralId(Number(v)); });

            if (currentGeneralTbl == null) return;

            [this.currentHunterFashionList, this.currentHunterFashionIndex] = PlayerFashionSystem.GetAllFashionByGeneralId(currentGeneralTbl.general_id);

            this.hasLeft = true;
            this.hasRight = false;

            this.setInfoCurHunterFashionInfo();
        }

        private setInfoCurHunterFashionInfo(tween: boolean = false) {
            this.btnLeft.visible = this.hasLeft;
            this.btnRight.visible = this.hasRight;

            if (this.currentHunterFashionList[this.currentHunterFashionIndex].state == 1 || this.currentHunterFashionList[this.currentHunterFashionIndex].state == 2) {
                Tips.SetSaveBoolForFashionNewGet(this.currentHunterFashionList[this.currentHunterFashionIndex].id, true)
                Tips.SetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FASHION);
            }

            let mapRoleId: number = null;
            if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                mapRoleId = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
            } else {
                mapRoleId = PlayerHunterSystem.Table(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId;
            }

            let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
            let scale = TableMapRole.Item(mapRoleId).spine_scale;
            let body = TableClientFightAniSpineSource.Item(bodySpxId).json;

            if (tween) {
                let x = this.groupFashion.x;
                let y = this.groupFashion.y;
                let maskX = this.groupSellect.x;

                let moveX1: number = null;
                let moveX2: number = null;
                let moveX3: number = null;

                if (this.hasLeft) {
                    moveX1 = x - 30;
                    moveX2 = x + 30;
                    moveX3 = maskX + this.groupSellect.width / 2;
                }
                if (this.hasRight) {
                    moveX1 = x + 30;
                    moveX2 = x - 30;
                    moveX3 = maskX;
                }

                egret.Tween.get(this.groupFashion)
                    .to({ x: moveX1, y: y - 30 }, 150)
                    .call(() => {
                        this.groupFashion.removeChildren();
                    })
                    .to({ x: moveX2, y: y - 30 }, 100)
                    .call(() => {
                        Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                            .then(display => {
                                display.scaleX = scale;
                                display.scaleY = scale;
                                display.name = "fashion";
                                this.groupFashion.addChild(display);
                            });
                    })
                    .to({ x: x, y: y }, 150);

                egret.Tween.get(this.rectMask).to({ x: moveX3 }, 300);

            } else {
                this.groupFashion.removeChildren();
                Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                    .then(display => {
                        display.scaleX = scale;
                        display.scaleY = scale;
                        display.name = "fashion";
                        this.groupFashion.addChild(display);
                    });

                this.rectMask.x = this.groupSellect.x + this.groupSellect.width / 2;
            }

            // 设置使用权限
            let state: number = this.currentHunterFashionList[this.currentHunterFashionIndex].state;
            let fashionId: number = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
            let fashionTbl: TableItemFashion = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id);
            // 武将身上时装
            let currentOneGeneralInfo = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v) => { return this.hunterTbl[this.focusHunterIndex].general_id == PlayerHunterSystem.GetGeneralId(Number(v.general_id)); });

            let currentGeneralFashionId: number = 0;
            if (currentOneGeneralInfo[0] != null) {
                currentGeneralFashionId = currentOneGeneralInfo[0].fashionId;
            }

            if (state == 0) {
                // 未购买
                if (fashionTbl.buy_type == 0) {
                    this.groupBuy.visible = false;
                    this.imgUseing.visible = false;
                    this.btnUse.visible = false;
                    this.lbDes.visible = true;
                    this.lbDes.text = fashionTbl.extrac;
                } else {
                    // 购买时装
                    this.groupBuy.visible = true;
                    this.imgUseing.visible = false;
                    this.btnUse.visible = false;
                    this.lbDes.visible = false;

                    if (!this.generalHasGet) {
                        //未获得该武将
                        this.groupBuy.visible = false;
                        this.lbDes.visible = true;
                        this.lbDes.text = TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                    }

                    this.lbFashionName.text = fashionTbl.name;
                    this.lbFashionName.textColor = Helper.GetStepColor(fashionTbl.quality);
                    this.lbBuyNum.text = fashionTbl.buy_price.toString();
                }
            } else if (state == 1) {
                // 购买为未使用
                this.groupBuy.visible = false;
                this.imgUseing.visible = false;
                this.btnUse.visible = true;
                this.lbDes.visible = false;
                this.lbFashionName.text = fashionTbl.name;
                this.lbFashionName.textColor = Helper.GetStepColor(fashionTbl.quality);
                this.lbDes.text = fashionTbl.extrac;
                this.lbBuyNum.text = fashionTbl.buy_price.toString();

                if (!this.generalHasGet) {
                    //未获得该武将
                    this.btnUse.visible = false;
                    this.lbDes.visible = true;
                    this.lbDes.text = TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                }
            } else if (state == 2) {
                // 购买且使用
                this.groupBuy.visible = false;
                this.imgUseing.visible = true;
                this.btnUse.visible = false;
                this.lbDes.visible = false;
                this.lbFashionName.text = fashionTbl.name;
                this.lbFashionName.textColor = Helper.GetStepColor(fashionTbl.quality);
                this.lbDes.text = fashionTbl.extrac;
                this.lbBuyNum.text = fashionTbl.buy_price.toString();
            } else if (state == 3) {
                // 原皮肤
                let generalName = this.hunterTbl[this.focusHunterIndex].general_name;
                this.groupBuy.visible = false;
                this.imgUseing.visible = currentGeneralFashionId == 0;
                this.btnUse.visible = currentGeneralFashionId != 0;
                this.lbDes.visible = false;
                this.lbFashionName.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.fashion.original, generalName);
                this.lbFashionName.textColor = Helper.GetStepColor(0);

                if (!this.generalHasGet) {
                    //未获得该武将
                    this.lbDes.visible = true;
                    this.lbDes.text = TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                    this.btnUse.visible = false;
                    this.imgUseing.visible = false;
                }
            }
        }

        private progressBarAni(bLeft: boolean, index: number) {
            if (bLeft) {
                this.currentHunterFashionIndex = this.currentHunterFashionIndex - 1;

                this.hasLeft = true;
                this.hasRight = false;
            } else {
                this.currentHunterFashionIndex = this.currentHunterFashionIndex + 1;

                this.hasLeft = false;
                this.hasRight = true;
            }
            this.setInfoCurHunterFashionInfo(true);
        }

        // 使用时装
        private onBtnUse() {
            let isUnwear: boolean = true;
            let fashionId: number = this.hunterTbl[this.focusHunterIndex].general_id;
            if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                isUnwear = false;
                fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
            }
            let hunterInfo = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v: message.GeneralInfo) => {
                return PlayerHunterSystem.GetGeneralId(v.general_id) == (this.hunterTbl[this.focusHunterIndex].general_id);
            })[0] || 0;
            Game.PlayerFashionSystem.fashionWear(isUnwear, fashionId, hunterInfo.general_id).then(() => {
                toast_success(LANG(TextsConfig.TextsConfig_Hunter.fashion.wearSuccess));

                let fashionId: number = 0;
                if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                    fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
                }

                // 设置所有武将拥有此时装
                for (let k in Game.PlayerHunterSystem.allHuntersMap()) {
                    if (PlayerHunterSystem.GetGeneralId(Number(k)) == this.hunterTbl[this.focusHunterIndex].general_id) {
                        Game.PlayerHunterSystem.allHuntersMap()[k].fashionId = fashionId;
                    }
                }

                for (let k in Game.PlayerHunterSystem.queryAllHunters()) {
                    if (PlayerHunterSystem.GetGeneralId(Number(Game.PlayerHunterSystem.queryAllHunters()[k].general_id)) == this.hunterTbl[this.focusHunterIndex].general_id) {
                        Game.PlayerHunterSystem.queryAllHunters()[k].fashionId = fashionId;
                    }
                }

                for (let k in this.currentHunterFashionList) {
                    if (this.currentHunterFashionList[k].state != 3) {
                        if (this.currentHunterFashionList[k].state == 2) {
                            this.currentHunterFashionList[k].state = 1;
                        } else if (Number(k) == this.currentHunterFashionIndex) {
                            this.currentHunterFashionList[k].state = 2;
                        }
                    }
                }

                this.setInfoCurHunterFashionInfo();
            });
        }

        // 购买时装
        private onBtnBuy() {
            Game.PlayerFashionSystem.fashionBuy(this.currentHunterFashionList[this.currentHunterFashionIndex].id).then(() => {
                toast_success(LANG(TextsConfig.TextsConfig_Hunter.fashion.buySuccess));

                // 设置当前为已购买
                this.currentHunterFashionList[this.currentHunterFashionIndex].state = 1;
                this.setInfoCurHunterFashionInfo();
            });
        }

        private onBtnLeft() {
            this.progressBarAni(false, this.currentHunterFashionIndex);
        }

        private onBtnRight() {
            this.progressBarAni(true, this.currentHunterFashionIndex);
        }

        private onMoveBegin(e: egret.TouchEvent) {
            this.moveBX = e.localX;
        }

        private onMoveEnd(e: egret.TouchEvent) {
            this.moveEX = e.localX;
            if (this.btnLeft.visible && this.moveEX > this.moveBX && Math.abs(this.moveEX - this.moveBX) >= 80) {
                this.onBtnLeft();
            } else if (this.btnRight.visible && this.moveEX < this.moveBX && Math.abs(this.moveEX - this.moveBX) >= 80) {
                this.onBtnRight();
            }
        }

        private onBtnClose() {
            this.close(UI.HIDE_TO_TOP);
        }
    }
}