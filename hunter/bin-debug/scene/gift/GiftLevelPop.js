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
    // 
    // lizhengqiang
    // 20190411
    var GiftLevelPop = (function (_super) {
        __extends(GiftLevelPop, _super);
        function GiftLevelPop() {
            var _this = _super.call(this) || this;
            _this.father = null;
            _this.cb = null;
            _this.updateItem = function (item) {
                var replaceItem = _this.arrCollection.getItemAt(_this.lstAward.selectedIndex);
                replaceItem["info"] = item;
                _this.arrCollection.replaceItemAt(replaceItem, _this.lstAward.selectedIndex);
            };
            _this.skinName = "resource/skins/gift/GiftLevelPopSkin.exml";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                egret.Tween.removeTweens(_this.lbTipClose); // 因为是循环播放，需要特别处理
            }, null);
            return _this;
        }
        GiftLevelPop.prototype.setInfo = function (info, father, cb) {
            this.info = info;
            this.father = father;
            this.cb = cb;
            if (this.father != null) {
                this.father.openDown();
            }
            var giftInfo = zj.PlayerGiftSystem.Instance_item(info["gift_index"]);
            var dailyInfo = zj.PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));
            var offset = 0;
            this.arrCollection = new eui.ArrayCollection();
            for (var _i = 0, dailyInfo_1 = dailyInfo; _i < dailyInfo_1.length; _i++) {
                var v = dailyInfo_1[_i];
                this.arrCollection.addItem({ info: info, dayInfo: v, father: this });
            }
            this.lstAward.dataProvider = this.arrCollection;
            this.lstAward.itemRenderer = zj.GiftLevelPopItem;
            var forcus = this.setOffset();
            this.scroller.viewport = this.lstAward;
            this.scroller.validateNow();
            if (this.scroller.viewport.contentWidth > this.scroller.viewport.width) {
                var moveDistance = 0;
                if (this.scroller.viewport.contentWidth - forcus * 244 > this.scroller.viewport.width) {
                    moveDistance = forcus * 244;
                }
                else {
                    moveDistance = this.scroller.viewport.contentWidth - this.scroller.viewport.width;
                }
                this.scroller.viewport.scrollH = moveDistance;
            }
            if (giftInfo.gift_form == 6) {
                this.lbCurrentLevelPrefix.visible = true;
                this.lbCurrentLevel.textFlow = zj.Util.RichText(zj.Helper.StringFormat("<color>r:60,g:255,b:0</color><text>%s</text>", zj.Game.PlayerInfoSystem.BaseInfo.level)); //TextsConfig.TextsConfig_Hunter_Pay.cur_level
            }
            else {
                this.lbCurrentLevelPrefix.visible = false;
                this.lbCurrentLevel.text = "";
            }
            if (zj.PlayerItemSystem.Type2(info["mark"]) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                this.lbName.text = giftInfo.name + "(" + zj.PlayerHunterSystem.Table(info["mark"]).general_name + ")";
                zj.StringConfig_Table.baseGeneral;
            }
            else {
                this.lbName.text = giftInfo.name_str;
            }
            if (this.father != null) {
                this.father.openDown();
            }
            // 点击任意区域关闭
            egret.Tween.get(this.lbTipClose, { loop: true })
                .to({ alpha: 1 }, 1000)
                .to({ alpha: 0 }, 1000);
        };
        GiftLevelPop.prototype.setOffset = function () {
            var giftInfo = zj.PlayerGiftSystem.Instance_item(this.info["gift_index"]);
            if (giftInfo.gift_form == 6) {
                var daysInfo_1 = zj.PlayerGiftSystem.GetGiftFate(Number(giftInfo.daily_index));
                var nextlevel = 1;
                var _loop_1 = function (i) {
                    var limitLevel = (daysInfo_1[i].reward_level != "" ? Number(daysInfo_1[i].reward_level) : 0);
                    if (zj.Game.PlayerInfoSystem.BaseInfo.level < limitLevel) {
                        nextlevel = Number(i);
                        return "break";
                    }
                    else if (zj.Game.PlayerInfoSystem.BaseInfo.level >= limitLevel) {
                        var find = zj.Table.FindF(this_1.info["markIndex"], function (k, v) {
                            return daysInfo_1[i].index == v;
                        });
                        if (!find) {
                            nextlevel = Number(i);
                            return "break";
                        }
                    }
                };
                var this_1 = this;
                for (var i = 0; i < daysInfo_1.length; i++) {
                    var state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
                return nextlevel;
            }
            else if (giftInfo.gift_form == 3) {
                return Number(this.info["dailyIndex"]) - Number(giftInfo.daily_index);
            }
            return 0;
        };
        GiftLevelPop.prototype.onClickClose = function (e) {
            var global = this.groupMain.localToGlobal();
            global.x -= zj.Game.UIManager.x;
            var rect = new egret.Rectangle(global.x, global.y, this.groupMain.width, this.groupMain.height);
            if (rect.contains(e.stageX, e.stageY) == false) {
                this.onBtnClose();
            }
        };
        GiftLevelPop.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        GiftLevelPop.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        GiftLevelPop.prototype.onBtnClose = function () {
            if (this.father != null) {
                this.father.closeUp();
            }
            if (this.cb != null) {
                this.cb();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return GiftLevelPop;
    }(zj.Dialog));
    zj.GiftLevelPop = GiftLevelPop;
    __reflect(GiftLevelPop.prototype, "zj.GiftLevelPop");
})(zj || (zj = {}));
//# sourceMappingURL=GiftLevelPop.js.map