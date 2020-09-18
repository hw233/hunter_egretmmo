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
    // ActivityXuyuanLiveExchange
    // yuqingchao
    // 2019.05.10
    var ActivityXuyuanLiveExchange = (function (_super) {
        __extends(ActivityXuyuanLiveExchange, _super);
        function ActivityXuyuanLiveExchange() {
            var _this = _super.call(this) || this;
            _this.count = 1;
            _this.maxCount = null;
            _this.saveCost = null;
            _this.MIN_COUNT = 1;
            _this.MAX_COUNT = 100;
            _this._start = false;
            _this._time = null;
            _this._sount = null;
            _this.skinName = "resource/skins/activity/ActivityXuyuanLiveExchangeSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnSub, _this);
            _this.btnAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAdd, _this);
            _this.btnMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBntMax, _this);
            _this.btnBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnBuy, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
            }, null);
            return _this;
        }
        ActivityXuyuanLiveExchange.prototype.init = function () {
        };
        ActivityXuyuanLiveExchange.prototype.setInfo = function (father) {
            var _this = this;
            this.father = father;
            var buyTimes = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_exchangeZone, function (k, v) {
                return v.key == _this.father.index;
            })[0];
            this.maxCount = buyTimes == null && this.father.exchangeTimes || this.father.exchangeTimes - buyTimes.value;
            this.setInfoMall();
            var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
            this.maxCount = num >= this.maxCount && this.maxCount || Math.floor(num);
        };
        ActivityXuyuanLiveExchange.prototype.setInfoMall = function () {
            var id = this.father.goods.goodsId;
            var show = this.father.goods.showType;
            var count = this.father.goods.count;
            var itemSet = zj.PlayerItemSystem.Set(id, show, count);
            var ownCount = zj.PlayerItemSystem.Count(id);
            var strCount = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Mall.buy_count, ownCount);
            var strCost = this.father.score;
            this.saveCost = strCost;
            var iSet = itemSet;
            this.imgFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Clip, this);
            var info = itemSet.Info;
            this.lbName.text = info.name;
            this.lbType.text = iSet.TyprDes;
            this.lbDes.textFlow = zj.Util.RichText(info.des);
            this.lbNum.text = count;
            this.lbOwn.text = strCount;
            this.lbCost2.text = strCost.toString();
            this.lbCount.text = this.count.toString();
        };
        ActivityXuyuanLiveExchange.prototype.setInfoCount = function () {
            this.lbCount.text = this.count.toString();
            this.lbCost2.text = (this.saveCost * this.count).toString();
        };
        ActivityXuyuanLiveExchange.prototype.onBtnSub = function () {
            this.count = this.count - 1;
            if (this.count <= this.MIN_COUNT) {
                this.count = this.MIN_COUNT;
            }
            this.setInfoCount();
        };
        ActivityXuyuanLiveExchange.prototype.onBtnAdd = function () {
            var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
            if (num <= 1) {
                this.count = this.MIN_COUNT;
            }
            else {
                this.count = this.count + 1;
            }
            if (this.count >= this.MAX_COUNT) {
                this.count = this.MAX_COUNT;
            }
            this.setInfoCount();
        };
        ActivityXuyuanLiveExchange.prototype.onBntMax = function () {
            var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore / this.saveCost;
            this.count = num >= this.maxCount && this.maxCount || Math.floor(num);
            this.count = this.count > 0 && this.count || 1;
            this.setInfoCount();
        };
        ActivityXuyuanLiveExchange.prototype.onBtnBuy = function () {
            var _this = this;
            if (this.getExchange()) {
                this.xuyuanStepReqBody_Visit(this.father.index, this.count).then(function (data) {
                    if (data.header.result == 0) {
                        setTimeout(function () {
                            _this.close(zj.UI.HIDE_TO_TOP);
                        }, 300);
                        zj.loadUI(zj.CommonGetDialog)
                            .then(function (dialog) {
                            dialog.init(data.body.gameInfo.getGoods);
                            dialog.show();
                            dialog.setCB(function () {
                                _this.father.father.refreshScoreList();
                                _this.father.setInfoOther();
                                zj.Game.EventManager.event(zj.GameEvent.XUYUAN_UPDATE);
                            });
                        });
                    }
                });
            }
        };
        ActivityXuyuanLiveExchange.prototype.getExchange = function () {
            var bBuy = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore >= this.saveCost * this.count;
            if (!bBuy) {
                zj.toast(zj.TextsConfig.TextsConfig_Xuyuan.not_enough);
            }
            return bBuy;
        };
        ActivityXuyuanLiveExchange.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        ActivityXuyuanLiveExchange.prototype.xuyuanStepReqBody_Visit = function (exchangeId, exchange_time) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.XuyuanExchangeRequest();
                request.body.exchangeId = exchangeId;
                request.body.exchange_time = exchange_time;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //console.log(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false, true);
                return;
            });
        };
        return ActivityXuyuanLiveExchange;
    }(zj.Dialog));
    zj.ActivityXuyuanLiveExchange = ActivityXuyuanLiveExchange;
    __reflect(ActivityXuyuanLiveExchange.prototype, "zj.ActivityXuyuanLiveExchange");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityXuyuanLiveExchange.js.map