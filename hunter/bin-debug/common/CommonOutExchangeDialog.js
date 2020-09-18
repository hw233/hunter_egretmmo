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
    /**
     * @author chen xi.
     *
     * @date 2019-1-8
     *
     * @class 转化公共界面
     */
    var CommonOutExchangeDialog = (function (_super) {
        __extends(CommonOutExchangeDialog, _super);
        function CommonOutExchangeDialog() {
            var _this = _super.call(this) || this;
            _this.listGetData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/common/CommonOutExchangeDialogSkin.exml";
            var tap = egret.TouchEvent.TOUCH_TAP;
            _this.btnSub.addEventListener(tap, _this.onBtnSub, _this);
            _this.btnAdd.addEventListener(tap, _this.onBtnAdd, _this);
            _this.btnMax.addEventListener(tap, _this.onBtnMax, _this);
            _this.btnExchange.addEventListener(tap, _this.onBtnExchange, _this);
            _this.btnClose.addEventListener(tap, _this.onBtnClose, _this);
            _this.labelCount.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.labelChange, _this);
            return _this;
        }
        /**
         * 设置信息
         *
         * @param itemId 物品ID
         * @param callback 回调函数，关闭界面后，调用该回调函数
         */
        CommonOutExchangeDialog.prototype.setInfo = function (itemId, callback) {
            this.itemId = itemId;
            this.callback = callback;
            this.refresh();
        };
        CommonOutExchangeDialog.prototype.refresh = function () {
            // set own group info
            var itemInfo = zj.PlayerItemSystem.Set(this.itemId);
            this.imgFrame.source = zj.cachekey(itemInfo.Frame, this);
            this.imgIcon.source = zj.cachekey(itemInfo.Path, this);
            this.labelName.text = itemInfo.Info.name;
            this.labelOwn.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.PlayerItemSystem.Count(this.itemId));
            this.loadGetList(itemInfo.Info.from);
            // set current group info
            var itemCurrentInfo = zj.PlayerItemSystem.Set(itemInfo.Info.client_transfer[0]);
            this.imgCurrentFrame.source = zj.cachekey(itemCurrentInfo.Frame, this);
            this.imgCurrentIcon.source = zj.cachekey(itemCurrentInfo.Path, this);
            this.labelCurrentName.text = itemCurrentInfo.Info.name;
            var current = zj.PlayerItemSystem.Count(itemInfo.Info.client_transfer[0]);
            var enough = itemInfo.Info.client_transfer[1];
            this.labelCurrentOwn.text = zj.Helper.StringFormat("%d/%d", current, enough);
            zj.Set.LabelNumberGreenAndRed(this.labelCurrentOwn, current, enough);
            this.max = Math.floor(current / enough) > 999 ? 999 : Math.floor(current / enough);
            // set next group info
            var itemNextInfo = zj.PlayerItemSystem.Set(itemInfo.Info.id);
            this.imgNextFrame.source = zj.cachekey(itemNextInfo.Frame, this);
            this.imgNextIcon.source = zj.cachekey(itemNextInfo.Path, this);
            this.labelNextName.text = itemNextInfo.Info.name;
            this.labelNextOwn.text = "x1";
            this.count = 1;
            this.setCountInfo();
        };
        CommonOutExchangeDialog.prototype.loadGetList = function (data) {
            // to do
            // 测试
            var list = [[], [], []];
            for (var i = 0; i < data.length; i++) {
                var id = data[i];
                if (id == 0) {
                    var drops = zj.Game.PlayerInstanceSystem.GetProp(this.itemId);
                    for (var i_1 = 0; i_1 < drops.length; i_1++) {
                        var v = drops[i_1];
                        list[1].push([0, v]);
                    }
                }
                else {
                    if (zj.Table.VIn(zj.TableEnum.Enum.HIDE_REVIEW, id) == false) {
                        // to do 
                        // lvdb.GetOpen(id)   
                    }
                    list[2].push([id, null]);
                }
            }
            var item = [];
            if (list[1].length != 0)
                item = [[], [], []];
            for (var i = 0; i < list.length; i++) {
                if (list[1].length != 0) {
                    for (var j = 0; j < list[i].length; j++) {
                        item[i].push(list[i][j]);
                    }
                }
                else {
                    for (var j = 0; j < list[i].length; j++) {
                        item.push(list[i][j]);
                    }
                }
            }
            this.listGetData.removeAll();
            for (var i = 0; i < item.length; i++) {
                if (item[i] != null && item[i].length != 0 && item[i] != undefined) {
                    var itemData = new zj.Common_OutPutItemData();
                    if (item[i][0] == null || item[i][0] == undefined) {
                        itemData.fromId = item[i];
                        itemData.mobId = null;
                    }
                    else {
                        itemData.fromId = item[i][0];
                        itemData.mobId = item[i][1];
                    }
                    this.listGetData.addItem(itemData);
                }
            }
            this.listGet.dataProvider = this.listGetData;
            this.listGet.itemRenderer = zj.Common_OutPutItem;
            this.listGet.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListGetTap, this);
        };
        CommonOutExchangeDialog.prototype.setNeedNum = function (needNum) {
            this.needNum = needNum;
        };
        CommonOutExchangeDialog.prototype.onListGetTap = function (e) {
            var _this = this;
            var data = this.listGetData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            if (data.fromId == 0 && (data.mobId != null || data.mobId != undefined)) {
                if (zj.Game.PlayerInstanceSystem.Chapter(data.mobId).chapter_id >= 17 ||
                    zj.PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_PARTNER) {
                    this.onBtnClose();
                    var timer = egret.setTimeout(function () { zj.Game.PlayerInstanceSystem.StartFast(data.mobId, _this.itemId, _this.needNum, _this); }, this, 1000);
                }
                else {
                    this.onBtnClose();
                    var timer = egret.setTimeout(function () { zj.Game.PlayerInstanceSystem.StartFast(data.mobId, _this.itemId, _this.needNum, _this); }, this, 1000);
                }
            }
            else if (data.fromId == 41 && (data.mobId != null || data.mobId != undefined)) {
                // 高级副本
            }
            else if (data.fromId == zj.ListType.List_Elite && data.mobId != null) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.LoadFromCardOutPut(data.mobId);
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                zj.SceneManager.instance.EnterAdventure(-2, data.mobId);
            }
            else {
                this.onBtnClose();
                var timer = egret.setTimeout(function () { zj.Game.PlayerMissionSystem.jump(data.fromId); }, this, 1000);
            }
        };
        CommonOutExchangeDialog.prototype.setCountInfo = function () {
            this.labelCount.text = this.count.toString();
        };
        CommonOutExchangeDialog.prototype.onBtnSub = function () {
            if (this.count <= 1)
                return;
            this.count -= 1;
            this.setCountInfo();
        };
        CommonOutExchangeDialog.prototype.onBtnAdd = function () {
            if (this.count >= this.max)
                return;
            this.count += 1;
            if (this.count > 100) {
                this.count = 100;
                zj.toast_warning("最大转化数为100");
            }
            this.setCountInfo();
        };
        CommonOutExchangeDialog.prototype.onBtnMax = function () {
            if (this.max <= 0)
                return;
            if (this.max > 100) {
                zj.toast_warning("最大转化数为100");
                this.count = 100;
            }
            else {
                this.count = this.max;
            }
            this.setCountInfo();
        };
        CommonOutExchangeDialog.prototype.labelChange = function () {
            if (isNaN(Number(this.labelCount.text)) || this.labelCount.text == "") {
                this.labelCount.text = "1";
            }
        };
        CommonOutExchangeDialog.prototype.onBtnExchange = function () {
            var _this = this;
            zj.Game.PlayerHunterSystem.quickMall(this.itemId, Number(this.labelCount.text))
                .then(function (gameInfo) {
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.init(gameInfo.getGoods);
                    dialog.show();
                });
                _this.refresh();
            }).catch(function () {
            });
        };
        CommonOutExchangeDialog.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callback) {
                this.callback();
            }
        };
        return CommonOutExchangeDialog;
    }(zj.Dialog));
    zj.CommonOutExchangeDialog = CommonOutExchangeDialog;
    __reflect(CommonOutExchangeDialog.prototype, "zj.CommonOutExchangeDialog");
})(zj || (zj = {}));
//# sourceMappingURL=CommonOutExchangeDialog.js.map