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
    // created by hhh in 2018/12/4
    var ListType;
    (function (ListType) {
        ListType[ListType["List_Instance"] = 0] = "List_Instance";
        ListType[ListType["List_Instance2"] = 41] = "List_Instance2";
        ListType[ListType["List_Elite"] = 29] = "List_Elite";
    })(ListType = zj.ListType || (zj.ListType = {}));
    var Common_OutPutDialog = (function (_super) {
        __extends(Common_OutPutDialog, _super);
        function Common_OutPutDialog() {
            var _this = _super.call(this) || this;
            _this.itemId = null;
            _this.listData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/common/Common_OutPutDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listPath.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onlistPathTap, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
                egret.Tween.removeTweens(_this);
            }, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            // 徽章遮罩
            _this.rectMask = new eui.Rect(73, 70, 0x000000);
            _this.rectMask.horizontalCenter = 0;
            _this.rectMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.rectMask);
            _this.rectMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupAnimate.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        /**
         * 设置基本信息
         *
         * @param itemId 物品ID
         * @param father 父类
         * @param call 回调函数
         */
        Common_OutPutDialog.prototype.setInfo = function (itemId, father, call, area) {
            var _this = this;
            this.itemId = itemId;
            this.father = father;
            this.cb = call;
            this.area = area;
            var info = zj.PlayerItemSystem.ItemConfig(itemId);
            var frame = zj.PlayerItemSystem.Set(itemId);
            this.imageFrame.source = zj.cachekey(frame.Frame, this);
            this.imageIcon.source = zj.cachekey(info.path, this);
            egret.Tween.get(this).wait(10).call(function () {
                if (_this.imageIcon.width > 100 || _this.imageIcon.height > 100) {
                    _this.imageIcon.scaleX = 0.8;
                    _this.imageIcon.scaleY = 0.8;
                }
            });
            if (this.isImgMask(itemId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else if (this.isRectMask(itemId)) {
                this.rectMask.visible = true;
                this.imageIcon.mask = this.rectMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            if (itemId == 20006) {
                this.labelNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.Game.PlayerInfoSystem.BaseInfo.psychicFruit);
            }
            else {
                this.labelNum.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.PlayerItemSystem.Count(itemId));
            }
            this.labelName.text = info.name;
            // this.loadGetList(info.from);
            this.freshInfo();
        };
        Common_OutPutDialog.prototype.OnAbovePop = function () {
            var str_has = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.PlayerItemSystem.Count(this.itemId));
            this.labelNum.text = str_has;
            if (this.needNum != null) {
                if (zj.PlayerItemSystem.Count(this.itemId) >= this.needNum) {
                    this.onBtnClose();
                }
            }
        };
        Common_OutPutDialog.prototype.setNeedNum = function (needNum) {
            this.needNum = needNum;
        };
        Common_OutPutDialog.prototype.freshInfo = function () {
            var itemSet = zj.PlayerItemSystem.Set(this.itemId);
            var str_has = "";
            if (this.itemId == 20006) {
                str_has = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.Game.PlayerInfoSystem.BaseInfo.psychicFruit);
            }
            else {
                str_has = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_HeroMain.has, zj.PlayerItemSystem.Count(this.itemId));
            }
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelName.text = itemSet.Info.name;
            this.labelNum.text = str_has;
            this.labelNum.visible = (zj.PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_GENERAL);
            var list = [[], [], []];
            var arr = itemSet.Info.from;
            if (itemSet.Info.from instanceof Array) {
            }
            else {
                arr = itemSet.Info.from.split("|");
                for (var i = 0; i < arr.length; i++) {
                    arr[i] = Number(arr[i]);
                }
            }
            for (var i = 0; i < arr.length; i++) {
                var id = arr[i];
                if (id == ListType.List_Instance) {
                    var drops = zj.Game.PlayerInstanceSystem.GetProp(this.itemId);
                    for (var j = 0; j < drops.length; j++) {
                        var v = drops[j];
                        if (this.isInstanceOpen(Number(v))) {
                            var find = false;
                            for (var k = 0; k < list[1].length; k++) {
                                var _v = list[1][k];
                                if (_v[1] == v) {
                                    find = true;
                                }
                                else {
                                    find = false;
                                }
                            }
                            if (!find && Number(v) < 200000) {
                                list[1].push(0);
                                list[1].push(v);
                            }
                        }
                    }
                }
                else if (id == ListType.List_Instance2) {
                    var drops = zj.Game.PlayerInstanceSystem.GetProp(this.itemId);
                    for (var j = 0; j < drops.length; j++) {
                        var v = drops[j];
                        if (this.isInstanceOpen(Number(v))) {
                            var find = false;
                            for (var k = 0; k < list[1].length; k++) {
                                var _v = list[1][k];
                                if (_v[1] == v) {
                                    find = true;
                                }
                                else {
                                    find = false;
                                }
                            }
                            if (!find) {
                                list[1].push(ListType.List_Instance2);
                                list[1].push(v);
                            }
                        }
                    }
                }
                else if (id == ListType.List_Elite) {
                    if (this.area != null) {
                        for (var _i = 0, _a = zj.HelpUtil.GetKV(this.area); _i < _a.length; _i++) {
                            var _b = _a[_i], k = _b[0], v = _b[1];
                            list[1].push(ListType.List_Elite);
                            list[1].push(v);
                        }
                    }
                }
                else {
                    if (isNaN(Number(id))) {
                        continue;
                    }
                    if (zj.Table.VIn(zj.TableEnum.Enum.HIDE_REVIEW, id) == false) {
                        /*if (PlayerMissionSystem.beHide(id)) {
    
                        }
                        else*/
                        if (zj.Game.PlayerMissionSystem.Open(id)) {
                            list[0].push(id);
                        }
                        else {
                            if (id == 7 && zj.Game.PlayerInfoSystem.LeagueId != 0) {
                                list[2].push(id);
                            }
                            else if (id != 7) {
                                list[2].push(id);
                            }
                        }
                    }
                    else {
                        if (id == 7 && zj.Game.PlayerInfoSystem.LeagueId != 0) {
                            list[2].push(id);
                        }
                        else if (id != 7) {
                            list[2].push(id);
                        }
                    }
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
            this.listData.removeAll();
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
                    this.listData.addItem(itemData);
                }
            }
            this.listPath.dataProvider = this.listData;
            this.listPath.itemRenderer = zj.Common_OutPutItem;
        };
        Common_OutPutDialog.prototype.isInstanceOpen = function (instanceId) {
            var _a = zj.Game.PlayerInstanceSystem.getChapterByInstanceId(instanceId), chapter = _a[0], idx = _a[1];
            if (chapter) {
                return chapter.chapter_id <= zj.SceneManager.adventureOpenMax;
            }
            return false;
        };
        Common_OutPutDialog.prototype.onBtnClose = function () {
            if (this.cb != null) {
                // this.cb();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        Common_OutPutDialog.prototype.onlistPathTap = function (e) {
            var _this = this;
            // let data = this.listData.getItemAt(e.itemIndex) as TableClientGetProp;
            var item = this.listPath.getElementAt(e.itemIndex);
            var data = this.listData.getItemAt(e.itemIndex);
            if (data == null || data == undefined)
                return;
            if (item.imgGo.visible == false) {
                return;
            }
            if (item.lock == true) {
                zj.toast_warning("暂未解锁");
                return;
            }
            if (data.fromId == 0 && (data.mobId != null || data.mobId != undefined)) {
                // if (Game.PlayerInstanceSystem.Chapter(data.mobId).chapter_id >= 17 ||
                //     PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_PARTNER) {
                //     this.onBtnClose();
                //     let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.StartFast(data.mobId, this.itemId, this.needNum, this) }, this, 1000);
                // }
                // else {
                this.onBtnClose();
                var timer = egret.setTimeout(function () { zj.Game.PlayerInstanceSystem.StartFast(data.mobId, _this.itemId, _this.needNum, _this, _this.cb); }, this, 1000);
                // }
            }
            else if (data.fromId == 41 && (data.mobId != null || data.mobId != undefined)) {
                // 高级副本
                this.onBtnClose();
                var timer = egret.setTimeout(function () { zj.Game.PlayerInstanceSystem.Start2(data.mobId, _this.itemId, _this.needNum, _this); }, this, 1000);
                // Game.PlayerInstanceSystem.Start2(data.mobId, this.itemId, this.needNum, this, () => {
                //     this.freshInfo();
                // });
            }
            else if (data.fromId == ListType.List_Elite && data.mobId != null) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.LoadFromCardOutPut(data.mobId);
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                zj.SceneManager.instance.EnterAdventure(-2, data.mobId);
            }
            else {
                if (this.cb) {
                    this.cb();
                }
                this.onBtnClose();
                var timer = egret.setTimeout(function () { zj.Game.PlayerMissionSystem.jump(data.fromId); }, this, 1000);
            }
        };
        // 物品遮罩
        Common_OutPutDialog.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        // 徽章遮罩
        Common_OutPutDialog.prototype.isRectMask = function (goodsId) {
            if (zj.TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || zj.PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }
            return false;
        };
        Common_OutPutDialog.ID = "Common_OutPutDialog";
        return Common_OutPutDialog;
    }(zj.Dialog));
    zj.Common_OutPutDialog = Common_OutPutDialog;
    __reflect(Common_OutPutDialog.prototype, "zj.Common_OutPutDialog");
})(zj || (zj = {}));
//# sourceMappingURL=Common_OutPutDialog.js.map