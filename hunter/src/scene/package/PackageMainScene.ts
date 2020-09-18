namespace zj {
    // 背包主界面
    // lizhengqiang
    // 2018/11/08

    export class PackageMainScene extends Scene {
        private imgBackground: eui.Image;
        public groupMain: eui.Group;
        private scrollerType: eui.Scroller;
        private lstType: eui.List;
        private scrollerItem: eui.Scroller;
        private lstItem: eui.List;
        private groupInfo: eui.Group;
        private groupItem: eui.Group;
        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private lbPropID: eui.Label;
        private lbName: eui.Label;
        private lbType: eui.Label;
        private lbCount: eui.Label;
        private lbPrice: eui.Label;
        private imgTips: eui.Image;
        private groupInfo2: eui.Group;
        private lbDescription: eui.Label;
        private groupDescription: eui.Group;
        private btnSell: eui.Button;
        private btnUse: eui.Button;
        private btnChange: eui.Button;
        private btnClose: eui.Button;

        private timer: egret.Timer;
        private arrCollectionItem: eui.ArrayCollection;
        private arrCollectionType: eui.ArrayCollection;
        private tips: boolean[] = [false, false, false, false, false, false];
        private types: TableClientTypePackage[] = [];
        private allItem: { "id": number, "count": number, "quality": number }[][];
        private typeIndex: number = 0;
        private itemIndex: number = 0;
        public itemId: number = 0;
        private imgMask: eui.Image; // 碎片遮罩
        private rectMask: eui.Image; // 徽章遮罩

        public constructor() {
            super();

            this.skinName = "resource/skins/package/PackageMainSceneSkin.exml";
            this.lstType.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedType, this);//左边滑动按钮list
            this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstSelectedItem, this);//右边背包格子list
            this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell, this);//出售
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);//使用
            this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChange, this);//转化
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);//关闭

            Game.EventManager.on(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);

            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SHOW_COMMON_MESSAGE, this.showCommonMessgae, this);

                if (this.timer) this.timer.stop();
            }, null);

            this.open();

            this.init();
        }

        private open() {
            this.setPosition("open");
            egret.Tween.get(this.groupMain).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }

        /**控制背包界面缩放 */
        private setPosition(type: string = "other") {
            switch (type) {
                case "open":
                    this.groupMain.anchorOffsetX = 787;
                    this.groupMain.anchorOffsetY = 581;
                    this.groupMain.x = (UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    this.groupMain.scaleX = 0;
                    this.groupMain.scaleY = 0;
                    break;
                case "close":
                    this.groupMain.anchorOffsetX = 787;
                    this.groupMain.anchorOffsetY = 581;
                    this.groupMain.x = (UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    break;
                case "other":
                    this.groupMain.anchorOffsetX = this.groupMain.width / 2;
                    this.groupMain.anchorOffsetY = this.groupMain.height / 2;
                    this.groupMain.x = (UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    egret.Tween.get(this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
                    break;
            }
        }

        private init() {
            let types = PlayerItemSystem.PackageType();//可以直接调用 let types = TableClientTypePackage.Table();
            for (let i = 0; i < Object.keys(types).length; i++) {
                this.types.push(types[i + 1]);
            }

            this.allItem = PlayerItemSystem.GoodsForPackage();//红点
            this.lstType.selectedIndex = 0; // 默认选中

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;
            // 遮罩
            this.rectMask = Util.getMaskImgBlack(82, 85);
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupItem.addChild(this.rectMask);
            this.rectMask.visible = false;

            this.setInfoType();
            this.setInfoItem();
            this.setInfoProp();
            this.setTips();

            this.timer = new egret.Timer(999, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.timer.start();
        }

        // 左边list列表
        private setInfoType() {
            this.scrollerType.stopAnimation();
            this.typeIndex = this.lstType.selectedIndex;
            this.arrCollectionType = new eui.ArrayCollection();
            for (let i = 0; i < this.types.length; i++) {
                this.arrCollectionType.addItem({
                    imgTextSource: this.types[i].path,
                    imgTipVisible: this.tips[i]
                });
            }
            this.lstType.dataProvider = this.arrCollectionType;//数据源发生改变，自动更新ui
            this.lstType.itemRenderer = PackageMainTypeIR;//显示每条数据
            // this.lstType.useVirtualLayout = false;
        }

        // 物品列表
        private setInfoItem(resetIndex: boolean = true) {
            this.scrollerItem.stopAnimation();
            this.lstItem.selectedIndex = 0; // 默认选中
            this.arrCollectionItem = new eui.ArrayCollection();
            let n = this.allItem[this.lstType.selectedIndex].length;
            for (let i = 0; i < (n > 18 ? (Math.ceil(n / 6) * 6) : 18); i++) { // 背包格子数量为 6 的整数倍且不小于 3 倍
                if (i < n) {
                    let item = this.allItem[this.typeIndex][i];
                    this.arrCollectionItem.addItem({
                        labelNum: PlayerItemSystem.GoodsNumID(item.id),
                        labelCount: item.count,
                        itemId: item.id,
                        isEmpty: false
                    });
                }
                else {
                    this.arrCollectionItem.addItem({ isEmpty: true });
                }
            }
            this.lstItem.dataProvider = this.arrCollectionItem;//数据源发生改变，自动更新ui
            this.lstItem.itemRenderer = PackageMainItemIR;//显示每条数据
            // this.lstItem.useVirtualLayout = false;
            if (resetIndex) this.itemIndex = this.lstItem.selectedIndex;
        }

        // 物品详情
        private setInfoProp() {
            if (this.allItem[this.lstType.selectedIndex].length == 0) { // 空背包
                this.imgTips.visible = true;
                this.groupInfo.visible = false;
                this.groupInfo2.visible = false;
            }
            else {
                this.itemId = this.allItem[this.lstType.selectedIndex][this.itemIndex]["id"];
                let config = PlayerItemSystem.ItemConfig(this.itemId);
                this.imgFrame.source = cachekey(PlayerItemSystem.ItemFrame(this.itemId), this);
                this.imgIcon.source = cachekey(config["path"], this);
                this.lbPropID.text = PlayerItemSystem.GoodsNumID(this.itemId);
                this.lbName.text = config["name"];
                this.lbType.text = PlayerItemSystem.ItemTypeDesc(this.itemId);
                this.lbCount.text = TextsConfig.TextsConfig_Package.number + Game.PlayerItemSystem.itemCount(this.itemId);
                this.lbPrice.text = config["price"];
                this.lbDescription.textFlow = Util.RichText(config["des"]);

                // 遮罩
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.imgIcon.mask = null;
                this.imgIcon.scaleX = 1;
                this.imgIcon.scaleY = 1;
                if (PlayerItemSystem.IsImgMask(this.itemId)) {
                    this.imgMask.visible = true;
                    this.imgIcon.mask = this.imgMask;
                } else if (PlayerItemSystem.IsRectMask(this.itemId)) { // 徽章
                    this.rectMask.visible = true;
                    this.rectMask.verticalCenter = -1;
                    this.rectMask.scaleX = 0.85;
                    this.rectMask.scaleY = 0.83;

                    this.imgIcon.scaleX = 0.85;
                    this.imgIcon.scaleY = 0.85;
                    this.imgIcon.mask = this.rectMask;
                } else {
                    this.rectMask.visible = true;
                    this.rectMask.verticalCenter = 0;
                    this.rectMask.scaleX = 1;
                    this.rectMask.scaleY = 1;
                    this.imgIcon.mask = this.rectMask;
                }

                this.imgTips.visible = false;
                this.groupInfo.visible = true;
                this.groupInfo2.visible = true;

                // 出售按钮显示
                if (config["price"] != 0) {
                    this.btnSell.visible = true;
                }
                else {
                    this.btnSell.visible = false;
                }

                // 使用/转化按钮显示
                if (config["use_tips"] == 0 || config["use_tips"] == 11) {
                    this.btnUse.visible = false;
                    this.btnChange.visible = false;
                }
                else if (config["use_tips"] == 99 || config["use_tips"] == 100) {
                    this.btnUse.visible = false;
                    this.btnChange.visible = true;
                }
                else {
                    this.btnUse.visible = true;
                    this.btnChange.visible = false;
                }
            }
        }

        // 物品类型列表红点
        private setTips() {
            let tips = [false, false, false, false, false, false];
            for (let i = 0; i < this.allItem.length; i++) {
                for (let j = 0; j < this.allItem[i].length; j++) {
                    let config = PlayerItemSystem.ItemConfig(this.allItem[i][j]["id"]);
                    if (config.hasOwnProperty("red_tips") && config["red_tips"] != 0) {
                        tips[i] = true;
                        break;
                    }
                }
            }

            for (let i = 0; i < this.allItem.length; i++) {
                if (tips[i] != this.tips[i]) {
                    this.tips = tips;
                    this.arrCollectionType = new eui.ArrayCollection();
                    for (let i = 0; i < this.types.length; i++) {
                        this.arrCollectionType.addItem({
                            imgTextSource: this.types[i].path,
                            imgTipVisible: this.tips[i]
                        });
                    }
                    this.lstType.dataProvider = this.arrCollectionType;
                    return;
                }
            }
        }

        public update() {
            this.allItem = PlayerItemSystem.GoodsForPackage();
            this.setInfoItem(false);
            if (this.itemIndex <= 18 && this.itemIndex < this.allItem[this.lstType.selectedIndex].length) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.lstItem.selectedIndex]);
                this.lstItem.selectedIndex = this.itemIndex;
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.lstItem.selectedIndex]);
            }
            else {
                this.itemIndex = 0;
            }
            this.setInfoProp();
        }

        /**左边list列表 */
        private onLstSelectedType(e: eui.PropertyEvent) {
            if (this.typeIndex != this.lstType.selectedIndex) {
                this.setInfoType();//物品类型列表
                this.setInfoItem();//物品列表
                this.setInfoProp();//物品详情
                this.typeIndex = this.lstType.selectedIndex;
            }
        }

        /**右边背包格子list列表 */
        private onLstSelectedItem(e: eui.PropertyEvent) {
            if (this.lstItem.selectedItem.isEmpty) return;
            if (this.itemIndex != this.lstItem.selectedIndex) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.lstItem.selectedIndex]);
                this.itemIndex = this.lstItem.selectedIndex;
                this.setInfoProp();
            }
        }

        private onTimer() {
            this.setTips();
        }

        // 物品出售
        private onBtnSell() {
            loadUI(PackagePopSell)
                .then((dialog: PackagePopSell) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.init(this);
                    this.setPosition();
                });
        }

        // 物品使用
        private onBtnUse() {
            let config = PlayerItemSystem.ItemConfig(this.itemId);
            //跳转界面  config["use_tips"]  方法搜索：table_item_prop.csv
            // 未有配置
            if (config["use_tips"] == null) {
                toast(TextsConfig.TextsConfig_Error.debug_packge);//通用提示
            }

            if (config["use_tips"] == 1) {
                loadUI(PackagePopUse)
                    .then((dialog: PackagePopUse) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.init(this);
                        this.setPosition();
                    });
            }
            else if (config["use_tips"] == 2) {
                // 猎人
                // toast("2");
                this.onBtnClose();
                setTimeout(() => {
                    loadUI(HunterMainScene)
                        .then((scene: HunterMainScene) => {
                            scene.show(UI.SHOW_FROM_TOP);
                        });
                }, 301);
            }
            else if (config["use_tips"] == 11) {
                // 活动
                // toast("11");
            }
            else if (config["use_tips"] == 12) {
                // 礼盒
                loadUI(PackageMainPop)
                    .then((dialog: PackageMainPop) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.init(this);
                        this.setPosition();
                    });
            }
            else if (config["use_tips"] == 15) {
                // 时装
                toast_success("请关注相关运营活动");
                // if (!PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND, true)) return;
                // this.onBtnClose();
                // setTimeout(() => {
                //     loadUI(FashionMain)
                //         .then((dialog: FashionMain) => {
                //             dialog.init();
                //             dialog.show();
                //             let obj = dialog.getChildAt(0);
                //             egret.Tween.removeTweens(obj);
                //             if (obj instanceof eui.Rect) {
                //                 obj.fillAlpha = 1;
                //             } else {
                //                 obj.alpha = 1;
                //             }
                //         });
                // }, 301);
            }
            else if (config["use_tips"] == 16) {
                // 念兽
                // toast("16");
                // if (!(PlayerAdviserSystem.Open() || PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, true))) return;
                // this.onBtnClose();
                // setTimeout(() => {
                //     loadUI(PetMainScene)
                //         .then((dialog: PetMainScene) => {
                //             dialog.inIt(1);
                //             dialog.show(UI.SHOW_FILL_OUT);
                //         });
                // }, 301);
            }
            else if (config["use_tips"] == 17) {
                // 宠物
                // toast("17");
                // if (!(PlayerAdviserSystem.Open() || PlayerMissionSystem.FunOpenTo(FUNC.ADVISER, true))) return;
                // this.onBtnClose();
                // setTimeout(() => {
                //     loadUI(PetMainScene)
                //         .then((dialog: PetMainScene) => {
                //             dialog.inIt(2);
                //             dialog.show(UI.SHOW_FILL_OUT);
                //         });
                // }, 301);
            }
        }

        // 物品转化
        private onBtnChange() {
            loadUI(PackagePopChange)
                .then((dialog: PackagePopChange) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.init(this);
                    this.setPosition();
                    egret.Tween.get(this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
                });
        }

        private showCommonMessgae(ev: egret.Event) {
            setTimeout(() => {
                let ui = <CommonMessage>newUI(CommonMessage);
                this.addChild(ui);
                ui.init(ev.data.source, ev.data.text);
            }, 300);
        }

        private onBtnClose() {
            this.setPosition("close");
            egret.Tween.get(this.groupMain)
                .to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backIn)
                .call(() => {
                    this.close();
                });
        }
    }

}