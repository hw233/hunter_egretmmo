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
     * 副本界面-关卡列表
     * zhaiweili
     * 2019.11.7
     */
    var AdventureDialog = (function (_super) {
        __extends(AdventureDialog, _super);
        function AdventureDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/adventure/AdventureDialogSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        AdventureDialog.prototype.init = function () {
            this.itemList = [];
            this.tagBtns = [this["tagBtn0"], this["tagBtn1"]];
            var types = [message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL, message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE];
            for (var i = 0; i < this.tagBtns.length; ++i) {
                this.tagBtns[i].value = types[i];
                this.tagBtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTag, this);
                this.itemList[types[i]] = [];
            }
            // this.imgDialogBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.btnCloseAdventure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.gorupDrop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDrop, this);
            // this.btnMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMap, this);
            this.btnBox.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnBox, this);
            this.type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
        };
        AdventureDialog.prototype.setOwner = function (_owner) {
            this.father = _owner;
        };
        AdventureDialog.prototype.getCurrAreaId = function () {
            return this.currArea.area_id;
        };
        AdventureDialog.prototype.setData = function (data, type) {
            if (type === void 0) { type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL; }
            this.currArea = data;
            var isHasElite = data.area_elite && data.area_elite.length > 0;
            if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE && !isHasElite) {
                type = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
            }
            this.tagBtns[1].visible = isHasElite;
            this.type = type;
            this.tagBtns[type - 1].selected = true;
            this.giftRunTime = 3;
            this.updateUI(true);
        };
        AdventureDialog.prototype.updateUI = function (isInit) {
            if (isInit === void 0) { isInit = false; }
            zj.Game.PlayerInstanceSystem.curInstanceType = this.type;
            this.gorupDrop.visible = this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE;
            var complete2 = zj.Game.PlayerInstanceSystem.ElitePackCanChallenge(this.currArea.area_id);
            this.imgEliteLock.visible = !complete2[0];
            // this.tagBtns[1].enabled = complete2[0];
            this.isAni = false;
            this.imgName.source = zj.cachekey("ui_instancenew_area_name_" + this.currArea.area_id + "_png", this);
            this.imgTitleBg.source = zj.cachekey("ui_instancenew_dialog_cover_" + this.currArea.area_id + "_png", this);
            // this.imgTitleBg.source = cachekey("ui_instancenew_dialog_cover_" + 1 + "_png", this);
            this.lbDesc.text = this.currArea.des; // this.currArea.elite_drop_des;
            this.listAdventure.removeChildren();
            this.listAdventure.scrollV = 0;
            this.updateList(isInit);
            if (!isInit && this.currItem) {
                var item = this.currItem;
                this.currItem = null;
                this.onTouchItem(item);
            }
        };
        AdventureDialog.prototype.updateList = function (isInit) {
            if (isInit === void 0) { isInit = false; }
            var model = this.getChapterList(this.type);
            var chapterIds = model.chapter_pack;
            var items = this.itemList[this.type];
            var currInfo = zj.Game.PlayerInstanceSystem.curInstances[this.type];
            var classz = this.type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE ? zj.AdventureDialogItemElite : zj.AdventureDialogItem;
            var gap = 2; // item之间的间隔（在exml中设置）
            var maxMobId = currInfo.maxMobID;
            var gheight = 0;
            for (var i = 0; i < chapterIds.length; ++i) {
                var data = zj.TableInstance.Item(chapterIds[i]);
                var mobInfo = currInfo.mobsMap[chapterIds[i]];
                var item = items[i];
                if (!item) {
                    item = new classz();
                    items.push(item);
                }
                item.init(this, this.currArea, model, data, i);
                item.initClose();
                if (isInit) {
                    if (gheight > 0) {
                        gheight += gap;
                    }
                    gheight += item.getTopHeight();
                    if (!this.isTeachCloseAll() && maxMobId == data.instance_id || (i == chapterIds.length - 1 && data.instance_id < maxMobId)) {
                        item.initOpen();
                        this.currItem = item;
                        gheight += item.getBottomHeight();
                    }
                }
                this.listAdventure.addChild(item);
                // 奖励
                if (i == chapterIds.length - 1) {
                    this.giftMobId = -1;
                    this.giftType = 2;
                    if (!mobInfo || mobInfo.star == 0) {
                        this.giftType = 2;
                    }
                    else if (mobInfo.chestReward) {
                        this.giftType = 0;
                    }
                    else {
                        this.giftMobId = mobInfo.mobId;
                        this.giftType = 1;
                    }
                    this.giftId = zj.Game.PlayerInstanceSystem.ChestItem(chapterIds[i]).goods_ids[0];
                    this.giftCount = zj.Game.PlayerInstanceSystem.ChestItem(chapterIds[i]).goods_counts[0];
                }
            }
            // 奖励显示
            this.updateGift();
            if (isInit) {
                this.updateInitY(gap, gheight);
            }
        };
        AdventureDialog.prototype.setGiftAni = function () {
            var _this = this;
            var daley = 3;
            egret.Tween.get(this.btnBox)
                .to({ rotation: -20 }, 20 * daley)
                .to({ rotation: 18 }, 38 * daley)
                .to({ rotation: -16 }, 34 * daley)
                .to({ rotation: 14 }, 30 * daley)
                .to({ rotation: -12 }, 26 * daley)
                .to({ rotation: 10 }, 22 * daley)
                .to({ rotation: -8 }, 18 * daley)
                .to({ rotation: 6 }, 14 * daley)
                .to({ rotation: -4 }, 10 * daley)
                .to({ rotation: 0 }, 4 * daley)
                .call(function () {
                egret.Tween.removeTweens(_this.btnBox);
            });
        };
        AdventureDialog.prototype.Update = function (dt) {
            if (this.giftType == 1) {
                this.giftRunTime -= dt;
                if (this.giftRunTime <= 0) {
                    this.giftRunTime = 3;
                    this.setGiftAni();
                }
            }
        };
        /**
         * 如果有新手需要关闭所有item
         */
        AdventureDialog.prototype.isTeachCloseAll = function () {
            return zj.Game.TeachSystem.curPart == 3002;
        };
        AdventureDialog.prototype.updateGift = function () {
            // 奖励显示
            // 0-已领取，1-领取，2-未通关
            var lab = this["lbGift"];
            switch (this.giftType) {
                case 0:
                    lab.text = "已领取";
                    this.btnBox.icon = zj.cachekey("ui_instancenew_dialog_box_" + this.type + "_1_png", this);
                    break;
                case 1:
                    lab.text = "领取";
                    this.btnBox.icon = zj.cachekey("ui_instancenew_dialog_box_" + this.type + "_0_png", this);
                    break;
                case 2:
                    lab.text = "未通关";
                    this.btnBox.icon = zj.cachekey("ui_instancenew_dialog_box_" + this.type + "_0_png", this);
                    break;
            }
        };
        AdventureDialog.prototype.updateInitY = function (gap, gheight) {
            if (this.currItem) {
                var idx = this.itemList[this.type].indexOf(this.currItem);
                var itemy = (this.currItem.getTopHeight() + gap) * idx;
                this.listAdventure.scrollV = Math.min(itemy, Math.max(0, gheight - this.scrollerAdventure.height));
            }
        };
        AdventureDialog.prototype.getItem = function (type, idx) {
            var item = this.itemList[type][idx];
            if (item) {
                return [item, item == this.currItem];
            }
            return null;
        };
        /**
         * 获取关卡列表
         */
        AdventureDialog.prototype.getChapterList = function (type) {
            if (type == message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE) {
                return zj.Game.PlayerInstanceSystem.EliteInstance(this.currArea.area_elite[0]);
            }
            return zj.Game.PlayerInstanceSystem.ChapterInstance(this.currArea.area_normal[0]);
        };
        AdventureDialog.prototype.onItemAniFinish = function (type) {
            this.isAni = false;
            if (type == 1) {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }
        };
        AdventureDialog.prototype.onTouchItem = function (item) {
            if (!this.isAni) {
                var type = 0;
                var temp = null;
                if (this.currItem) {
                    this.currItem.startAniClose();
                    type--;
                    temp = this.currItem;
                    this.isAni = true;
                    if (this.currItem == item) {
                        this.currItem = null;
                    }
                    else {
                        this.currItem = item;
                    }
                }
                else {
                    this.currItem = item;
                }
                if (this.currItem) {
                    item.startAniOpen();
                    type++;
                    temp = item;
                    this.isAni = true;
                }
                this.startAni(type, temp);
            }
        };
        AdventureDialog.prototype.startAni = function (type, item) {
            var _this = this;
            if (type != 0) {
                var groupY = this.listAdventure.scrollV;
                var aniHeight = item.getBottomHeight();
                if (type == -1) {
                    var groupHei = this.listAdventure.contentHeight - aniHeight;
                    if (groupHei - groupY < this.scrollerAdventure.height) {
                        var mot = groupY - (this.scrollerAdventure.height - (groupHei - groupY));
                        if (mot < 0) {
                            mot = 0;
                        }
                        var tw = egret.Tween.get(this.listAdventure);
                        tw.to({ scrollV: mot }, AdventureDialog.aniTime);
                        tw.call(function () {
                            egret.Tween.removeTweens(_this.listAdventure);
                        }, this);
                    }
                }
                else if (type == 1) {
                    var bottom = item.y + item.getTopHeight() + aniHeight;
                    if (bottom - groupY > this.scrollerAdventure.height) {
                        var tw = egret.Tween.get(this.listAdventure);
                        tw.to({ scrollV: bottom - this.scrollerAdventure.height }, AdventureDialog.aniTime);
                        tw.call(function () {
                            egret.Tween.removeTweens(_this.listAdventure);
                        }, this);
                    }
                }
            }
        };
        AdventureDialog.prototype.onTouchTag = function (event) {
            var radioBtn = event.currentTarget;
            if (this.type != radioBtn.value) {
                if (this.checkIsOpen(radioBtn.value)) {
                    this.type = radioBtn.value;
                    this.currItem = null;
                    this.updateUI();
                }
                else {
                    this.tagBtns[0].selected = true;
                }
            }
        };
        AdventureDialog.prototype.checkIsOpen = function (type) {
            if (this.imgEliteLock.visible) {
                var _a = zj.Game.PlayerInstanceSystem.ElitePackCanChallenge(this.currArea.area_id), complete2 = _a[0], error_code = _a[1];
                if (!complete2) {
                    if (error_code == 2) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[error_code - 1]);
                        return;
                    }
                    else {
                        var chapter_info = zj.TableInstance.Item(error_code);
                        if (chapter_info != null) {
                            var _b = zj.Game.PlayerInstanceSystem.ChapterIdx(error_code), value1 = _b[0], value2 = _b[1];
                            value2 = Number(value2) + 1;
                            zj.toast_warning(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[0], value1, value2, false));
                            return;
                        }
                    }
                }
                // let currInfo = Game.PlayerInstanceSystem.curInstances[this.type];
                // let chapterIds = this.getChapterList(this.type).chapter_pack;
                // let maxMobId = chapterIds[chapterIds.length - 1];
                // if(currInfo.maxMobID >= maxMobId){
                // 	if(this.currArea.area_id == 1){
                // 	} else {
                // 		toast_warning(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[1]);
                // 	}
                // } else {
                // 	toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.not_complete_last[0], this.currArea.area_id, chapterIds.length, false));
                // }
                return false;
            }
            return true;
        };
        AdventureDialog.prototype.onBtnDrop = function () {
            var _this = this;
            zj.loadUI(zj.HXH_InstanceEliteDropInfo)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.setInfo(_this.currArea.area_id);
            });
        };
        AdventureDialog.prototype.onBtnBox = function (e) {
            // 0-已领取，1-领取，2-未通关
            switch (this.giftType) {
                case 1:
                    this.onGetGift();
                    break;
                case 0:
                case 2:
                    this.onLookBox(e);
                    break;
            }
        };
        AdventureDialog.prototype.onGetGift = function () {
            var _this = this;
            var mobsId = this.giftMobId;
            zj.Game.PlayerInstanceSystem.InstanceChestReq(mobsId)
                .then(function (value) {
                _this.currItem = null;
                _this.updateUI();
                var _a = zj.Table.FindR(value.body.gameInfo.getGoods, function (k, v) {
                    return zj.PlayerItemSystem.Type2(v.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL;
                }), hero = _a[0], index = _a[1];
                if (hero != null) {
                    zj.loadUI(zj.TavernGetGeneral)
                        .then(function (taverngetgeneral) {
                        taverngetgeneral.init(_this);
                        taverngetgeneral.setInfo(hero.goodsId, hero.index, 1, true, function () {
                            zj.loadUI(zj.CommonGetDialog)
                                .then(function (dialog) {
                                dialog.init(value.body.gameInfo.getGoods);
                                dialog.show();
                            });
                        });
                        _this.addChild(taverngetgeneral);
                        zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.TavernGetGeneral" });
                    });
                }
                else {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(value.body.gameInfo.getGoods);
                        dialog.show();
                    });
                }
            })
                .catch(function (reason) {
                zj.toast_warning(reason);
            });
        };
        AdventureDialog.prototype.onLookBox = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.giftId;
            goodsInfo.count = this.giftCount;
            var show = zj.TipManager.ShowProp(goodsInfo, this, 30, e.stageX, e.stageY);
            show.name = "award";
            this.father.addChild(show);
        };
        // private onBtnMap() {
        // 	this.father.enterMap(this.currArea);
        // }
        AdventureDialog.prototype.show = function () {
            var _this = this;
            var scaleHeight = 1.2;
            this.groupAll.scaleX = this.groupAll.scaleY = 0.1;
            var tw = egret.Tween.get(this.groupAll);
            tw.to({ scaleX: scaleHeight, scaleY: scaleHeight }, 400, egret.Ease.backOut);
            tw.call(function () {
                egret.Tween.removeTweens(_this.groupAll);
            }, this);
            this.imgDialogBG.alpha = 0.01;
            var twImg = egret.Tween.get(this.imgDialogBG);
            twImg.wait(400);
            twImg.to({ alpha: 0.4 }, 600);
            twImg.call(function () {
                egret.Tween.removeTweens(_this.imgDialogBG);
                zj.Game.EventManager.event(zj.GameEvent.SHOW_UI, { typeName: "zj.AdventureDialog" });
            }, this);
        };
        AdventureDialog.prototype.onClose = function () {
            var _this = this;
            this.currItem = null;
            this.isAni = false;
            var twImg = egret.Tween.get(this.imgDialogBG);
            twImg.to({ alpha: 0 }, 400);
            twImg.call(function () {
                egret.Tween.removeTweens(_this.imgDialogBG);
            }, this);
            var tw = egret.Tween.get(this.groupAll);
            tw.to({ scaleX: 0, scaleY: 0 }, 400, egret.Ease.sineIn);
            tw.call(function () {
                egret.Tween.removeTweens(_this.groupAll);
                _this.father.closeAdventureInfo();
                zj.Game.EventManager.event(zj.GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(_this) });
            }, this);
        };
        AdventureDialog.aniTime = 150;
        return AdventureDialog;
    }(zj.UI));
    zj.AdventureDialog = AdventureDialog;
    __reflect(AdventureDialog.prototype, "zj.AdventureDialog");
})(zj || (zj = {}));
//# sourceMappingURL=AdventureDialog.js.map