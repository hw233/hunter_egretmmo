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
     * @class 功能开启得奖
     *
     * @author LianLei
     *
     * @date 2019-11-02
     */
    var Activity_FunOpen = (function (_super) {
        __extends(Activity_FunOpen, _super);
        function Activity_FunOpen() {
            var _this = _super.call(this) || this;
            _this.funOpenInfo = [];
            _this.listFunOpenData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/activity/Activity_FunOpenSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            _this.init();
            _this.setInfoList();
            return _this;
        }
        Activity_FunOpen.prototype.init = function () {
            for (var key in zj.TableFunctionOpen.Table()) {
                if (zj.TableFunctionOpen.Table().hasOwnProperty(key)) {
                    var element = zj.TableFunctionOpen.Table()[key];
                    if (element.condition == 0 || element.condition == 999 || element.show == 0)
                        continue;
                    this.funOpenInfo.push(element);
                }
            }
        };
        Activity_FunOpen.prototype.setInfoList = function () {
            var rewardIdArr = [];
            for (var key in zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward) {
                if (zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward.hasOwnProperty(key)) {
                    var element = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.levelReward[key];
                    if (element < 1000)
                        continue;
                    rewardIdArr.push(element);
                }
            }
            this.funOpenInfo.sort(function (a, b) { return a.condition - b.condition; });
            var funOpenArr = []; // 已经领奖的功能
            var getLevelArr = [];
            for (var i = 0; i < rewardIdArr.length; i++) {
                for (var key in zj.TableUplevelReward.Table()) {
                    var element = zj.TableUplevelReward.Table()[key];
                    if (rewardIdArr[i] == element.index)
                        getLevelArr.push(element.level);
                }
            }
            for (var i = 0; i < this.funOpenInfo.length; i++) {
                for (var j = 0; j < getLevelArr.length; j++) {
                    if (this.funOpenInfo[i].condition == getLevelArr[j])
                        funOpenArr.push(this.funOpenInfo[i]);
                }
            }
            funOpenArr.sort(function (a, b) { return a.condition - b.condition; });
            var self = this;
            this.funOpenInfo = this.funOpenInfo.filter(function (v) { return !(funOpenArr.indexOf(v) > -1); }).concat(funOpenArr.filter(function (v) { return !(self.funOpenInfo.indexOf(v) > -1); })); // 求补集
            for (var i = 0; i < funOpenArr.length; i++)
                this.funOpenInfo.push(funOpenArr[i]);
            this.listFunOpenData.removeAll();
            for (var i = 0; i < this.funOpenInfo.length; i++) {
                var itemData = new zj.Activity_FunOpenItemData();
                itemData.index = i;
                itemData.info = this.funOpenInfo[i];
                itemData.father = this;
                this.listFunOpenData.addItem(itemData);
            }
            this.listFunOpen.dataProvider = this.listFunOpenData;
            this.listFunOpen.itemRenderer = zj.Activity_FunOpenItem;
        };
        Activity_FunOpen.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        Activity_FunOpen.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        Activity_FunOpen.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return Activity_FunOpen;
    }(zj.Dialog));
    zj.Activity_FunOpen = Activity_FunOpen;
    __reflect(Activity_FunOpen.prototype, "zj.Activity_FunOpen");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_FunOpen.js.map