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
     * @class 功能开启得奖Item
     *
     * @author LianLei
     *
     * @date 2019-11-02
     */
    var Activity_FunOpenItem = (function (_super) {
        __extends(Activity_FunOpenItem, _super);
        function Activity_FunOpenItem() {
            var _this = _super.call(this) || this;
            _this.tbl = null;
            _this.skinName = "resource/skins/activity/Activity_FunOpenItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_FunOpenItem"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.groupGoods1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty1, _this);
            _this.groupGoods2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty2, _this);
            return _this;
        }
        Activity_FunOpenItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Activity_FunOpenItem.prototype.updateView = function (data) {
            var _this = this;
            if (data.info == null)
                return;
            this.imgFunOpenIcon.source = zj.cachekey(data.info.path, this);
            this.labelFunName.text = data.info.name;
            this.labelFunTip.text = "玩家达到" + data.info.condition + "级解锁"; //data.info.unopen_tip;
            this.labelLevelState.textColor = zj.Game.PlayerInfoSystem.BaseInfo.level >= data.info.condition ? 0x1B7F01 : 0xff0000;
            this.labelLevelState.text = "(" + zj.Game.PlayerInfoSystem.BaseInfo.level + "/" + data.info.condition + ")";
            for (var key in zj.TableUplevelReward.Table()) {
                if (zj.TableUplevelReward.Table().hasOwnProperty(key)) {
                    var element = zj.TableUplevelReward.Table()[key];
                    if (element.index > 1000) {
                        if (element.level == data.info.condition) {
                            this.tbl = element;
                            break;
                        }
                    }
                }
            }
            var itemSet1 = zj.PlayerItemSystem.Set(this.tbl.level_reward[0][0], null, this.tbl.level_reward[0][1]);
            var itemSet2 = zj.PlayerItemSystem.Set(this.tbl.level_reward[1][0], null, this.tbl.level_reward[0][1]);
            this.imgAwardFrame1.source = zj.cachekey(itemSet1.Frame, this);
            this.imgAwardFrame2.source = zj.cachekey(itemSet2.Frame, this);
            this.imgAwardIcon1.source = zj.cachekey(itemSet1.Path, this);
            this.imgAwardIcon2.source = zj.cachekey(itemSet2.Path, this);
            this.labelAwardNum1.text = this.tbl.level_reward[0][1].toString();
            this.labelAwardNum2.text = this.tbl.level_reward[1][1].toString();
            var levelReward = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward, function (k, v) {
                return v == _this.tbl.index;
            });
            if (levelReward) {
                this.btnGet.enabled = false;
                this.btnGet.visible = false;
                this.imgGet.visible = true;
                // this.btnGet.currentState = "disabled1";
                var btnLabel = this.btnGet.getChildAt(this.btnGet.numChildren - 1);
                if (btnLabel)
                    btnLabel.text = "已领取";
            }
            else {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= data.info.condition) {
                    this.btnGet.enabled = true;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    // this.btnGet.currentState = "up";
                    var btnLabel = this.btnGet.getChildAt(this.btnGet.numChildren - 1);
                    if (btnLabel)
                        btnLabel.text = "领取";
                }
                else {
                    this.btnGet.enabled = false;
                    this.btnGet.visible = true;
                    this.imgGet.visible = false;
                    // this.btnGet.currentState = "disabled";
                    var btnLabel = this.btnGet.getChildAt(this.btnGet.numChildren - 1);
                    if (btnLabel)
                        btnLabel.text = "领取";
                }
            }
        };
        Activity_FunOpenItem.prototype.onBtnGet = function () {
            var self = this;
            zj.Game.PlayerActivitySystem.upLevelReward(this.tbl.index).then(function (value) {
                zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                    dialog.init(value.getGoods);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                    dialog.setCB(function () {
                        self.data.father.setInfoList();
                        zj.Game.EventManager.event(zj.GameEvent.GET_LEVELUP_REWARD);
                    });
                });
            });
        };
        Activity_FunOpenItem.prototype.onShowGoodProperty1 = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.tbl.level_reward[0][0];
            goodsInfo.count = this.tbl.level_reward[0][1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        Activity_FunOpenItem.prototype.onShowGoodProperty2 = function (e) {
            var goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = this.tbl.level_reward[1][0];
            goodsInfo.count = this.tbl.level_reward[1][1];
            zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: goodsInfo, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
        };
        return Activity_FunOpenItem;
    }(eui.ItemRenderer));
    zj.Activity_FunOpenItem = Activity_FunOpenItem;
    __reflect(Activity_FunOpenItem.prototype, "zj.Activity_FunOpenItem");
    var Activity_FunOpenItemData = (function () {
        function Activity_FunOpenItemData() {
        }
        return Activity_FunOpenItemData;
    }());
    zj.Activity_FunOpenItemData = Activity_FunOpenItemData;
    __reflect(Activity_FunOpenItemData.prototype, "zj.Activity_FunOpenItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_FunOpenItem.js.map