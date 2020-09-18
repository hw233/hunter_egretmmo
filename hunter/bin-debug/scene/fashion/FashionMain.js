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
    // 形象变换
    // lizhengiang
    // 20190316
    var FashionMain = (function (_super) {
        __extends(FashionMain, _super);
        function FashionMain() {
            var _this = _super.call(this) || this;
            _this.focusHunterIndex = 0;
            _this.currentHunterFashionIndex = 0;
            _this.hunterTbl = [];
            _this.generalHasGet = false;
            _this.rectMask = null;
            _this.moveBX = null;
            _this.moveEX = null;
            _this.skinName = "resource/skins/fashion/FashionMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.lstHeroes.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstSelectedItem, _this);
            _this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUse, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy, _this);
            _this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLeft, _this);
            _this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRight, _this);
            _this.imgFloor.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onMoveBegin, _this);
            _this.imgFloor.addEventListener(egret.TouchEvent.TOUCH_END, _this.onMoveEnd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            return _this;
        }
        FashionMain.prototype.init = function () {
            this.setInfoResources();
            this.timer = new egret.Timer(990, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.setInfoResources, this);
            this.timer.start();
            this.rectMask = zj.Util.getMaskImgBlack(this.groupSellect.width / 2, this.groupSellect.height);
            this.rectMask.verticalCenter = 0;
            this.groupProgress.addChild(this.rectMask);
            this.groupSellect.mask = this.rectMask;
            this.setInfoHunterList();
            this.setInfoHunterInfo();
        };
        FashionMain.prototype.setInfoResources = function () {
            var count = zj.Game.PlayerItemSystem.mapGoodsInfo[31201] ? zj.Game.PlayerItemSystem.mapGoodsInfo[31201].count : 0;
            this.lbToken.text = zj.Set.NumberUnit3(count);
        };
        FashionMain.prototype.setInfoHunterList = function () {
            this.hunterTbl = zj.PlayerFashionSystem.GetHunterListWithFashion();
            this.arrCollection = new eui.ArrayCollection();
            for (var _i = 0, _a = this.hunterTbl; _i < _a.length; _i++) {
                var v = _a[_i];
                this.arrCollection.addItem(v);
            }
            var fix = this.hunterTbl.length % 3;
            if (fix) {
                for (var i = 0; i < 3 - fix; i++) {
                    this.arrCollection.addItem(null);
                }
            }
            this.lstHeroes.dataProvider = this.arrCollection;
            this.lstHeroes.itemRenderer = zj.FashionMainItemIR;
            this.lstHeroes.selectedIndex = 0;
        };
        FashionMain.prototype.onLstSelectedItem = function (e) {
            if (this.focusHunterIndex != this.lstHeroes.selectedIndex && this.lstHeroes.selectedItem != null) {
                this.arrCollection.itemUpdated(this.arrCollection.source[this.focusHunterIndex]);
                this.arrCollection.itemUpdated(this.arrCollection.source[this.lstHeroes.selectedIndex]);
                this.focusHunterIndex = this.lstHeroes.selectedIndex;
                this.setInfoHunterInfo();
            }
        };
        FashionMain.prototype.setInfoHunterInfo = function () {
            var currentGeneralTbl = this.hunterTbl[this.focusHunterIndex];
            this.generalHasGet = zj.Table.FindF(zj.PlayerHunterSystem.GetHunterList(), function (k, v) { return currentGeneralTbl.general_id == zj.PlayerHunterSystem.GetGeneralId(Number(v)); });
            if (currentGeneralTbl == null)
                return;
            _a = zj.PlayerFashionSystem.GetAllFashionByGeneralId(currentGeneralTbl.general_id), this.currentHunterFashionList = _a[0], this.currentHunterFashionIndex = _a[1];
            this.hasLeft = true;
            this.hasRight = false;
            this.setInfoCurHunterFashionInfo();
            var _a;
        };
        FashionMain.prototype.setInfoCurHunterFashionInfo = function (tween) {
            var _this = this;
            if (tween === void 0) { tween = false; }
            this.btnLeft.visible = this.hasLeft;
            this.btnRight.visible = this.hasRight;
            if (this.currentHunterFashionList[this.currentHunterFashionIndex].state == 1 || this.currentHunterFashionList[this.currentHunterFashionIndex].state == 2) {
                zj.Tips.SetSaveBoolForFashionNewGet(this.currentHunterFashionList[this.currentHunterFashionIndex].id, true);
                zj.Tips.SetTipsOfId(zj.Tips.TAG.WONDERLAND, zj.Tips.TAG.FASHION);
            }
            var mapRoleId = null;
            if (zj.PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                mapRoleId = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
            }
            else {
                mapRoleId = zj.PlayerHunterSystem.Table(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId;
            }
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var scale = zj.TableMapRole.Item(mapRoleId).spine_scale;
            var body = zj.TableClientFightAniSpineSource.Item(bodySpxId).json;
            if (tween) {
                var x = this.groupFashion.x;
                var y = this.groupFashion.y;
                var maskX = this.groupSellect.x;
                var moveX1 = null;
                var moveX2 = null;
                var moveX3 = null;
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
                    .call(function () {
                    _this.groupFashion.removeChildren();
                })
                    .to({ x: moveX2, y: y - 30 }, 100)
                    .call(function () {
                    zj.Game.DragonBonesManager.playAnimation(_this, body, "armatureName", 1, 0)
                        .then(function (display) {
                        display.scaleX = scale;
                        display.scaleY = scale;
                        display.name = "fashion";
                        _this.groupFashion.addChild(display);
                    });
                })
                    .to({ x: x, y: y }, 150);
                egret.Tween.get(this.rectMask).to({ x: moveX3 }, 300);
            }
            else {
                this.groupFashion.removeChildren();
                zj.Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                    .then(function (display) {
                    display.scaleX = scale;
                    display.scaleY = scale;
                    display.name = "fashion";
                    _this.groupFashion.addChild(display);
                });
                this.rectMask.x = this.groupSellect.x + this.groupSellect.width / 2;
            }
            // 设置使用权限
            var state = this.currentHunterFashionList[this.currentHunterFashionIndex].state;
            var fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
            var fashionTbl = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id);
            // 武将身上时装
            var currentOneGeneralInfo = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) { return _this.hunterTbl[_this.focusHunterIndex].general_id == zj.PlayerHunterSystem.GetGeneralId(Number(v.general_id)); });
            var currentGeneralFashionId = 0;
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
                }
                else {
                    // 购买时装
                    this.groupBuy.visible = true;
                    this.imgUseing.visible = false;
                    this.btnUse.visible = false;
                    this.lbDes.visible = false;
                    if (!this.generalHasGet) {
                        //未获得该武将
                        this.groupBuy.visible = false;
                        this.lbDes.visible = true;
                        this.lbDes.text = zj.TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                    }
                    this.lbFashionName.text = fashionTbl.name;
                    this.lbFashionName.textColor = zj.Helper.GetStepColor(fashionTbl.quality);
                    this.lbBuyNum.text = fashionTbl.buy_price.toString();
                }
            }
            else if (state == 1) {
                // 购买为未使用
                this.groupBuy.visible = false;
                this.imgUseing.visible = false;
                this.btnUse.visible = true;
                this.lbDes.visible = false;
                this.lbFashionName.text = fashionTbl.name;
                this.lbFashionName.textColor = zj.Helper.GetStepColor(fashionTbl.quality);
                this.lbDes.text = fashionTbl.extrac;
                this.lbBuyNum.text = fashionTbl.buy_price.toString();
                if (!this.generalHasGet) {
                    //未获得该武将
                    this.btnUse.visible = false;
                    this.lbDes.visible = true;
                    this.lbDes.text = zj.TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                }
            }
            else if (state == 2) {
                // 购买且使用
                this.groupBuy.visible = false;
                this.imgUseing.visible = true;
                this.btnUse.visible = false;
                this.lbDes.visible = false;
                this.lbFashionName.text = fashionTbl.name;
                this.lbFashionName.textColor = zj.Helper.GetStepColor(fashionTbl.quality);
                this.lbDes.text = fashionTbl.extrac;
                this.lbBuyNum.text = fashionTbl.buy_price.toString();
            }
            else if (state == 3) {
                // 原皮肤
                var generalName = this.hunterTbl[this.focusHunterIndex].general_name;
                this.groupBuy.visible = false;
                this.imgUseing.visible = currentGeneralFashionId == 0;
                this.btnUse.visible = currentGeneralFashionId != 0;
                this.lbDes.visible = false;
                this.lbFashionName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.fashion.original, generalName);
                this.lbFashionName.textColor = zj.Helper.GetStepColor(0);
                if (!this.generalHasGet) {
                    //未获得该武将
                    this.lbDes.visible = true;
                    this.lbDes.text = zj.TextsConfig.TextsConfig_Hunter.fashion.noGeneral;
                    this.btnUse.visible = false;
                    this.imgUseing.visible = false;
                }
            }
        };
        FashionMain.prototype.progressBarAni = function (bLeft, index) {
            if (bLeft) {
                this.currentHunterFashionIndex = this.currentHunterFashionIndex - 1;
                this.hasLeft = true;
                this.hasRight = false;
            }
            else {
                this.currentHunterFashionIndex = this.currentHunterFashionIndex + 1;
                this.hasLeft = false;
                this.hasRight = true;
            }
            this.setInfoCurHunterFashionInfo(true);
        };
        // 使用时装
        FashionMain.prototype.onBtnUse = function () {
            var _this = this;
            var isUnwear = true;
            var fashionId = this.hunterTbl[this.focusHunterIndex].general_id;
            if (zj.PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                isUnwear = false;
                fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
            }
            var hunterInfo = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) {
                return zj.PlayerHunterSystem.GetGeneralId(v.general_id) == (_this.hunterTbl[_this.focusHunterIndex].general_id);
            })[0] || 0;
            zj.Game.PlayerFashionSystem.fashionWear(isUnwear, fashionId, hunterInfo.general_id).then(function () {
                zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Hunter.fashion.wearSuccess));
                var fashionId = 0;
                if (zj.PlayerItemSystem.Type2(_this.currentHunterFashionList[_this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                    fashionId = _this.currentHunterFashionList[_this.currentHunterFashionIndex].id;
                }
                // 设置所有武将拥有此时装
                for (var k in zj.Game.PlayerHunterSystem.allHuntersMap()) {
                    if (zj.PlayerHunterSystem.GetGeneralId(Number(k)) == _this.hunterTbl[_this.focusHunterIndex].general_id) {
                        zj.Game.PlayerHunterSystem.allHuntersMap()[k].fashionId = fashionId;
                    }
                }
                for (var k in zj.Game.PlayerHunterSystem.queryAllHunters()) {
                    if (zj.PlayerHunterSystem.GetGeneralId(Number(zj.Game.PlayerHunterSystem.queryAllHunters()[k].general_id)) == _this.hunterTbl[_this.focusHunterIndex].general_id) {
                        zj.Game.PlayerHunterSystem.queryAllHunters()[k].fashionId = fashionId;
                    }
                }
                for (var k in _this.currentHunterFashionList) {
                    if (_this.currentHunterFashionList[k].state != 3) {
                        if (_this.currentHunterFashionList[k].state == 2) {
                            _this.currentHunterFashionList[k].state = 1;
                        }
                        else if (Number(k) == _this.currentHunterFashionIndex) {
                            _this.currentHunterFashionList[k].state = 2;
                        }
                    }
                }
                _this.setInfoCurHunterFashionInfo();
            });
        };
        // 购买时装
        FashionMain.prototype.onBtnBuy = function () {
            var _this = this;
            zj.Game.PlayerFashionSystem.fashionBuy(this.currentHunterFashionList[this.currentHunterFashionIndex].id).then(function () {
                zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Hunter.fashion.buySuccess));
                // 设置当前为已购买
                _this.currentHunterFashionList[_this.currentHunterFashionIndex].state = 1;
                _this.setInfoCurHunterFashionInfo();
            });
        };
        FashionMain.prototype.onBtnLeft = function () {
            this.progressBarAni(false, this.currentHunterFashionIndex);
        };
        FashionMain.prototype.onBtnRight = function () {
            this.progressBarAni(true, this.currentHunterFashionIndex);
        };
        FashionMain.prototype.onMoveBegin = function (e) {
            this.moveBX = e.localX;
        };
        FashionMain.prototype.onMoveEnd = function (e) {
            this.moveEX = e.localX;
            if (this.btnLeft.visible && this.moveEX > this.moveBX && Math.abs(this.moveEX - this.moveBX) >= 80) {
                this.onBtnLeft();
            }
            else if (this.btnRight.visible && this.moveEX < this.moveBX && Math.abs(this.moveEX - this.moveBX) >= 80) {
                this.onBtnRight();
            }
        };
        FashionMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return FashionMain;
    }(zj.Dialog));
    zj.FashionMain = FashionMain;
    __reflect(FashionMain.prototype, "zj.FashionMain");
})(zj || (zj = {}));
//# sourceMappingURL=FashionMain.js.map