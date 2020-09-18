var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // 背包主界面
    // lizhengqiang
    // 2018/11/08
    var PackageMainScene = (function (_super) {
        __extends(PackageMainScene, _super);
        function PackageMainScene() {
            var _this = _super.call(this) || this;
            _this.tips = [false, false, false, false, false, false];
            _this.types = [];
            _this.typeIndex = 0;
            _this.itemIndex = 0;
            _this.itemId = 0;
            _this.skinName = "resource/skins/package/PackageMainSceneSkin.exml";
            _this.lstType.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedType, _this); //左边滑动按钮list
            _this.lstItem.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedItem, _this); //右边背包格子list
            _this.btnSell.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSell, _this); //出售
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this); //使用
            _this.btnChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnChange, _this); //转化
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this); //关闭
            zj.Game.EventManager.on(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_COMMON_MESSAGE, _this.showCommonMessgae, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.open();
            _this.init();
            return _this;
        }
        PackageMainScene.prototype.open = function () {
            this.setPosition("open");
            egret.Tween.get(this.groupMain).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        };
        /**控制背包界面缩放 */
        PackageMainScene.prototype.setPosition = function (type) {
            if (type === void 0) { type = "other"; }
            switch (type) {
                case "open":
                    this.groupMain.anchorOffsetX = 787;
                    this.groupMain.anchorOffsetY = 581;
                    this.groupMain.x = (zj.UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (zj.UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    this.groupMain.scaleX = 0;
                    this.groupMain.scaleY = 0;
                    break;
                case "close":
                    this.groupMain.anchorOffsetX = 787;
                    this.groupMain.anchorOffsetY = 581;
                    this.groupMain.x = (zj.UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (zj.UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    break;
                case "other":
                    this.groupMain.anchorOffsetX = this.groupMain.width / 2;
                    this.groupMain.anchorOffsetY = this.groupMain.height / 2;
                    this.groupMain.x = (zj.UIManager.StageWidth - this.groupMain.width) / 2 + this.groupMain.anchorOffsetX;
                    this.groupMain.y = (zj.UIManager.StageHeight - this.groupMain.height) / 2 + this.groupMain.anchorOffsetY;
                    egret.Tween.get(this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
                    break;
            }
        };
        PackageMainScene.prototype.init = function () {
            var types = zj.PlayerItemSystem.PackageType(); //可以直接调用 let types = TableClientTypePackage.Table();
            for (var i = 0; i < Object.keys(types).length; i++) {
                this.types.push(types[i + 1]);
            }
            this.allItem = zj.PlayerItemSystem.GoodsForPackage(); //红点
            this.lstType.selectedIndex = 0; // 默认选中
            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupItem.addChild(this.imgMask);
            this.imgMask.visible = false;
            // 遮罩
            this.rectMask = zj.Util.getMaskImgBlack(82, 85);
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
        };
        // 左边list列表
        PackageMainScene.prototype.setInfoType = function () {
            this.scrollerType.stopAnimation();
            this.typeIndex = this.lstType.selectedIndex;
            this.arrCollectionType = new eui.ArrayCollection();
            for (var i = 0; i < this.types.length; i++) {
                this.arrCollectionType.addItem({
                    imgTextSource: this.types[i].path,
                    imgTipVisible: this.tips[i]
                });
            }
            this.lstType.dataProvider = this.arrCollectionType; //数据源发生改变，自动更新ui
            this.lstType.itemRenderer = zj.PackageMainTypeIR; //显示每条数据
            // this.lstType.useVirtualLayout = false;
        };
        // 物品列表
        PackageMainScene.prototype.setInfoItem = function (resetIndex) {
            if (resetIndex === void 0) { resetIndex = true; }
            this.scrollerItem.stopAnimation();
            this.lstItem.selectedIndex = 0; // 默认选中
            this.arrCollectionItem = new eui.ArrayCollection();
            var n = this.allItem[this.lstType.selectedIndex].length;
            for (var i = 0; i < (n > 18 ? (Math.ceil(n / 6) * 6) : 18); i++) {
                if (i < n) {
                    var item = this.allItem[this.typeIndex][i];
                    this.arrCollectionItem.addItem({
                        labelNum: zj.PlayerItemSystem.GoodsNumID(item.id),
                        labelCount: item.count,
                        itemId: item.id,
                        isEmpty: false
                    });
                }
                else {
                    this.arrCollectionItem.addItem({ isEmpty: true });
                }
            }
            this.lstItem.dataProvider = this.arrCollectionItem; //数据源发生改变，自动更新ui
            this.lstItem.itemRenderer = zj.PackageMainItemIR; //显示每条数据
            // this.lstItem.useVirtualLayout = false;
            if (resetIndex)
                this.itemIndex = this.lstItem.selectedIndex;
        };
        // 物品详情
        PackageMainScene.prototype.setInfoProp = function () {
            if (this.allItem[this.lstType.selectedIndex].length == 0) {
                this.imgTips.visible = true;
                this.groupInfo.visible = false;
                this.groupInfo2.visible = false;
            }
            else {
                this.itemId = this.allItem[this.lstType.selectedIndex][this.itemIndex]["id"];
                var config = zj.PlayerItemSystem.ItemConfig(this.itemId);
                this.imgFrame.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(this.itemId), this);
                this.imgIcon.source = zj.cachekey(config["path"], this);
                this.lbPropID.text = zj.PlayerItemSystem.GoodsNumID(this.itemId);
                this.lbName.text = config["name"];
                this.lbType.text = zj.PlayerItemSystem.ItemTypeDesc(this.itemId);
                this.lbCount.text = zj.TextsConfig.TextsConfig_Package.number + zj.Game.PlayerItemSystem.itemCount(this.itemId);
                this.lbPrice.text = config["price"];
                this.lbDescription.textFlow = zj.Util.RichText(config["des"]);
                // 遮罩
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.imgIcon.mask = null;
                this.imgIcon.scaleX = 1;
                this.imgIcon.scaleY = 1;
                if (zj.PlayerItemSystem.IsImgMask(this.itemId)) {
                    this.imgMask.visible = true;
                    this.imgIcon.mask = this.imgMask;
                }
                else if (zj.PlayerItemSystem.IsRectMask(this.itemId)) {
                    this.rectMask.visible = true;
                    this.rectMask.verticalCenter = -1;
                    this.rectMask.scaleX = 0.85;
                    this.rectMask.scaleY = 0.83;
                    this.imgIcon.scaleX = 0.85;
                    this.imgIcon.scaleY = 0.85;
                    this.imgIcon.mask = this.rectMask;
                }
                else {
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
        };
        // 物品类型列表红点
        PackageMainScene.prototype.setTips = function () {
            var tips = [false, false, false, false, false, false];
            for (var i = 0; i < this.allItem.length; i++) {
                for (var j = 0; j < this.allItem[i].length; j++) {
                    var config = zj.PlayerItemSystem.ItemConfig(this.allItem[i][j]["id"]);
                    if (config.hasOwnProperty("red_tips") && config["red_tips"] != 0) {
                        tips[i] = true;
                        break;
                    }
                }
            }
            for (var i = 0; i < this.allItem.length; i++) {
                if (tips[i] != this.tips[i]) {
                    this.tips = tips;
                    this.arrCollectionType = new eui.ArrayCollection();
                    for (var i_1 = 0; i_1 < this.types.length; i_1++) {
                        this.arrCollectionType.addItem({
                            imgTextSource: this.types[i_1].path,
                            imgTipVisible: this.tips[i_1]
                        });
                    }
                    this.lstType.dataProvider = this.arrCollectionType;
                    return;
                }
            }
        };
        PackageMainScene.prototype.update = function () {
            this.allItem = zj.PlayerItemSystem.GoodsForPackage();
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
        };
        /**左边list列表 */
        PackageMainScene.prototype.onLstSelectedType = function (e) {
            if (this.typeIndex != this.lstType.selectedIndex) {
                this.setInfoType(); //物品类型列表
                this.setInfoItem(); //物品列表
                this.setInfoProp(); //物品详情
                this.typeIndex = this.lstType.selectedIndex;
            }
        };
        /**右边背包格子list列表 */
        PackageMainScene.prototype.onLstSelectedItem = function (e) {
            if (this.lstItem.selectedItem.isEmpty)
                return;
            if (this.itemIndex != this.lstItem.selectedIndex) {
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.itemIndex]);
                this.arrCollectionItem.itemUpdated(this.arrCollectionItem.source[this.lstItem.selectedIndex]);
                this.itemIndex = this.lstItem.selectedIndex;
                this.setInfoProp();
            }
        };
        PackageMainScene.prototype.onTimer = function () {
            this.setTips();
        };
        // 物品出售
        PackageMainScene.prototype.onBtnSell = function () {
            var _this = this;
            zj.loadUI(zj.PackagePopSell)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(_this);
                _this.setPosition();
            });
        };
        // 物品使用
        PackageMainScene.prototype.onBtnUse = function () {
            var _this = this;
            var config = zj.PlayerItemSystem.ItemConfig(this.itemId);
            //跳转界面  config["use_tips"]  方法搜索：table_item_prop.csv
            // 未有配置
            if (config["use_tips"] == null) {
                zj.toast(zj.TextsConfig.TextsConfig_Error.debug_packge); //通用提示
            }
            if (config["use_tips"] == 1) {
                zj.loadUI(zj.PackagePopUse)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init(_this);
                    _this.setPosition();
                });
            }
            else if (config["use_tips"] == 2) {
                // 猎人
                // toast("2");
                this.onBtnClose();
                setTimeout(function () {
                    zj.loadUI(zj.HunterMainScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                    });
                }, 301);
            }
            else if (config["use_tips"] == 11) {
                // 活动
                // toast("11");
            }
            else if (config["use_tips"] == 12) {
                // 礼盒
                zj.loadUI(zj.PackageMainPop)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.init(_this);
                    _this.setPosition();
                });
            }
            else if (config["use_tips"] == 15) {
                // 时装
                zj.toast_success("请关注相关运营活动");
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
        };
        // 物品转化
        PackageMainScene.prototype.onBtnChange = function () {
            var _this = this;
            zj.loadUI(zj.PackagePopChange)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(_this);
                _this.setPosition();
                egret.Tween.get(_this.groupMain).to({ scaleX: 0.9, scaleY: 0.9 }, 300);
            });
        };
        PackageMainScene.prototype.showCommonMessgae = function (ev) {
            var _this = this;
            setTimeout(function () {
                var ui = zj.newUI(zj.CommonMessage);
                _this.addChild(ui);
                ui.init(ev.data.source, ev.data.text);
            }, 300);
        };
        PackageMainScene.prototype.onBtnClose = function () {
            var _this = this;
            this.setPosition("close");
            egret.Tween.get(this.groupMain)
                .to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.backIn)
                .call(function () {
                _this.close();
            });
        };
        return PackageMainScene;
    }(zj.Scene));
    zj.PackageMainScene = PackageMainScene;
    __reflect(PackageMainScene.prototype, "zj.PackageMainScene");
})(zj || (zj = {}));
//# sourceMappingURL=PackageMainScene.js.map