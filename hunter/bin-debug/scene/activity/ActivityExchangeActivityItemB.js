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
    //兑换活动
    //yuqingchao
    //2019.05.28
    var ActivityExchangeActivityItemB = (function (_super) {
        __extends(ActivityExchangeActivityItemB, _super);
        function ActivityExchangeActivityItemB() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.bRefresh = false;
            _this.canGet = false;
            _this.saveGet = false;
            _this.skinName = "resource/skins/activity/ActivityExchangeActivityItemBSkin.exml";
            zj.cachekeys(zj.UIResource["ActivityExchangeActivityItemB"], null);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        ActivityExchangeActivityItemB.prototype.dataChanged = function () {
            this.index = this.data.i;
            this.info = this.data.info;
            this.father = this.data.father;
            this.exchangeInfo = this.info.exchanges[this.index];
            this.goods = this.exchangeInfo.goodsInfo;
            if (!this.bRefresh) {
                this.setInfoGoods();
                this.bRefresh = true;
            }
            this.setInfoGet();
        };
        ActivityExchangeActivityItemB.prototype.setInfoGoods = function () {
            this.arrItem0 = new eui.ArrayCollection();
            this.arrItem1 = new eui.ArrayCollection();
            for (var i = 0; i < 2; i++) {
                if (i == 1) {
                    this.arrItem0.addItem({
                        index: i,
                        info: this.exchangeInfo.goodsInfo[0],
                    });
                }
                else {
                    this.arrItem1.addItem({
                        index: i,
                        info: this.exchangeInfo.exchangeInfo[0]
                    });
                }
            }
            this.lstItem0.dataProvider = this.arrItem0;
            this.lstItem0.itemRenderer = zj.ActivityAwardItemB;
            this.lstItem1.dataProvider = this.arrItem1;
            this.lstItem1.itemRenderer = zj.ActivityAwardItemB;
        };
        ActivityExchangeActivityItemB.prototype.setInfoGet = function () {
            var itemSet01 = zj.PlayerItemSystem.Set(this.exchangeInfo.exchangeInfo[0].goodsId);
            var item01_get = zj.Game.PlayerItemSystem.itemCount(this.exchangeInfo.exchangeInfo[0].goodsId);
            var item01_getStr = itemSet01.Count;
            var item01_num = this.exchangeInfo.exchangeInfo[0].count;
            // this.lbBeforNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, item01_getStr, item01_num);
            // if (item01_get < item01_num) {
            // 	this.lbBeforNum.textColor = ConstantConfig_Common.Color.red;
            // } else {
            // 	this.lbBeforNum.textColor = ConstantConfig_Common.Color.green;
            // }
            this.canGet = item01_get >= item01_num;
            //活动时间
            var bStart = this.father.getInfoStart();
            var bIsGet = false;
            for (var i = 0; i < zj.Game.PlayerActivitySystem.Activities.length; i++) {
                if (zj.Game.PlayerActivitySystem.Activities[i].index == this.info.index) {
                    for (var j = 0; j < zj.Game.PlayerActivitySystem.Activities[i].kvInfos.length; j++) {
                        if (zj.Game.PlayerActivitySystem.Activities[i].kvInfos[j].key == this.exchangeInfo.index && zj.Game.PlayerActivitySystem.Activities[i].kvInfos[j].value >= this.exchangeInfo.exchangeCount) {
                            bIsGet = true;
                        }
                    }
                    break;
                }
            }
            // let bIsGet = Table.FindF(Game.PlayerActivitySystem.Activities[this.index].kvInfos, (k, v) => {
            // 	return v.key == this.exchangeInfo.index && v.value >= this.exchangeInfo.exchangeCount;
            // });
            var bNotGet = this.canGet && !bIsGet && bStart;
            // let getVar = Table.FindR(Game.PlayerActivitySystem.Activities[this.index].kvInfos, (k, v: message.IIKVPairs) => {
            // 	return v.key == this.exchangeInfo.index;
            // })[0];
            var getVar;
            for (var i = 0; i < zj.Game.PlayerActivitySystem.Activities.length; i++) {
                if (zj.Game.PlayerActivitySystem.Activities[i].index == this.info.index) {
                    for (var j = 0; j < zj.Game.PlayerActivitySystem.Activities[i].kvInfos.length; j++) {
                        if (this.exchangeInfo.index == zj.Game.PlayerActivitySystem.Activities[i].kvInfos[j].key) {
                            getVar = zj.Game.PlayerActivitySystem.Activities[i].kvInfos[j];
                        }
                    }
                    break;
                }
            }
            var getNum = null;
            if (getVar == null) {
                getNum = 0;
            }
            else {
                getNum = getVar.value;
            }
            // this.lbLimit.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.get, getNum, this.exchangeInfo.exchangeCount);
            this.lbLimit.text = "活动期间可兑换" + this.exchangeInfo.exchangeCount + "次";
            this.labelHasChange.text = "已兑" + getNum + "次";
            this.btnGet.enabled = bNotGet;
            this.labelHasChange.visible = bNotGet;
            this.imgGot.visible = bIsGet;
            // if (this.saveGet && bIsGet) {
            // 	this.runActionGet();
            // }
            this.saveGet = bNotGet;
        };
        ActivityExchangeActivityItemB.prototype.runActionGet = function () { };
        ;
        ActivityExchangeActivityItemB.prototype.onBtnGet = function () {
            var _this = this;
            var type = this.info.type;
            var index = this.info.index;
            var rewardIndex = this.exchangeInfo.index;
            zj.Game.PlayerActivitySystem.activityReward(type, index, rewardIndex, false).then(function (resp) {
                setTimeout(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(resp.getGoods);
                        dialog.show();
                        dialog.setCB(function () {
                            _this.data.father.setInfoAward();
                        });
                    });
                }, 300);
            });
        };
        return ActivityExchangeActivityItemB;
    }(eui.ItemRenderer));
    zj.ActivityExchangeActivityItemB = ActivityExchangeActivityItemB;
    __reflect(ActivityExchangeActivityItemB.prototype, "zj.ActivityExchangeActivityItemB");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityExchangeActivityItemB.js.map