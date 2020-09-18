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
    //ACtivityUplevelActivityPop
    //yuqingchao
    //2019.04.01
    var ACtivityUplevelActivityPop = (function (_super) {
        __extends(ACtivityUplevelActivityPop, _super);
        function ACtivityUplevelActivityPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ACtivityUplevelActivityPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        ACtivityUplevelActivityPop.prototype.init = function (index, uplevelItems, upLevel) {
            var _this = this;
            this.index - index;
            this.uplevelItems = uplevelItems;
            this.upLevel = upLevel;
            zj.Game.PlayerActivitySystem.upLevelRankReward(this.index).then(function (resq) {
                _this.setList(resq);
            });
        };
        ACtivityUplevelActivityPop.prototype.setList = function (rankItem) {
            var rewardNum = [];
            var allNum = 0;
            for (var k in this.uplevelItems) {
                var v = this.uplevelItems[k];
                allNum = allNum + v.rewardCount;
                rewardNum.push(v.rewardCount);
            }
            var findLevel = function (index) {
                var level = 0;
                var allNum = 0;
                var add = function () {
                    if (rewardNum[level] != null) {
                        allNum = allNum + rewardNum[level];
                    }
                    else {
                        return level + 1;
                    }
                    if (index < allNum) {
                        return level;
                    }
                    else {
                        level = level + 1;
                        return add();
                    }
                };
                return add();
            };
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < 50; i++) {
                this.arrayCollection.addItem({
                    info: rankItem[i],
                    i: i,
                    find: findLevel(i)
                });
            }
            this.lstView.dataProvider = this.arrayCollection;
            this.lstView.itemRenderer = zj.ActivityUplevelActivityPopItem;
        };
        ACtivityUplevelActivityPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ACtivityUplevelActivityPop;
    }(zj.Dialog));
    zj.ACtivityUplevelActivityPop = ACtivityUplevelActivityPop;
    __reflect(ACtivityUplevelActivityPop.prototype, "zj.ACtivityUplevelActivityPop");
})(zj || (zj = {}));
//# sourceMappingURL=ACtivityUplevelActivityPop.js.map