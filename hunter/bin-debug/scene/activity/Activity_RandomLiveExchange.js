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
    //  娃娃机 -- 兑换
    //  wangshenzhuo
    //  2019/04/12
    var Activity_RandomLiveExchange = (function (_super) {
        __extends(Activity_RandomLiveExchange, _super);
        function Activity_RandomLiveExchange() {
            var _this = _super.call(this) || this;
            _this.MIN_COUNT = 1;
            _this.MAX_COUNT = 100;
            _this.skinName = "resource/skins/activity/Activity_RandomLiveExchangeSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonSub.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSub, _this);
            _this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonAdd, _this);
            _this.buttonMax.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMax, _this);
            _this.buttonBuy.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonBuy, _this);
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupMain.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            //普通物品遮罩
            _this.rectMaskCommon = zj.Util.getMaskImgBlack(83, 84);
            _this.rectMaskCommon.horizontalCenter = 0;
            _this.rectMaskCommon.verticalCenter = -2;
            _this.groupMain.addChild(_this.rectMaskCommon);
            _this.rectMaskCommon.visible = false;
            return _this;
        }
        Activity_RandomLiveExchange.prototype.SetInfo = function (father) {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.father = father;
            this.count = 1;
            var DataIndex = this.father.data.index - 1;
            var buyTimes = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone, function (k, v) {
                return v.key == DataIndex;
            });
            this.maxCount = buyTimes[0] == null && this.father.exchange_times || this.father.exchange_times - buyTimes[0].value;
            this.SetInfoMall();
            var num = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost;
            this.maxCount = num >= this.maxCount && this.maxCount || Math.floor(num);
            if (this.isImgMask(this.father.data.goods.goodsId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
        };
        Activity_RandomLiveExchange.prototype.SetInfoMall = function () {
            var id = this.father.data.goods.goodsId;
            var show = this.father.data.goods.showType;
            var count = this.father.data.goods.count;
            var itemSet = zj.PlayerItemSystem.Set(id, show, count);
            var own_count = zj.PlayerItemSystem.Count(id);
            var str_count = zj.Helper.StringFormat("%s%d", zj.TextsConfig.TextsConfig_Mall.buy_count, own_count);
            var str_cost = this.father.score;
            this.save_cost = str_cost;
            this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
            this.imageIcon.source = zj.cachekey(itemSet.Clip, this);
            this.labelTextName.text = itemSet.Info["name"];
            this.labelTextType.text = itemSet["TypeDes"];
            this.labelTextNum.text = count;
            this.labelTextOwn.text = str_count;
            this.labelTextCost2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.jifen, str_cost);
            this.labelCount.text = this.count.toString();
        };
        Activity_RandomLiveExchange.prototype.SetInfoCount = function () {
            this.labelCount.text = this.count.toString();
            this.labelTextCost2.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.jifen, this.save_cost * this.count);
        };
        //  按钮 -
        Activity_RandomLiveExchange.prototype.onButtonSub = function () {
            this.count = this.count - 1;
            if (this.count < this.MIN_COUNT) {
                this.count = this.MIN_COUNT;
            }
            this.SetInfoCount();
        };
        // 按钮 +
        Activity_RandomLiveExchange.prototype.onButtonAdd = function () {
            var maxNum = 0;
            //当积分可换次数
            var num = Math.floor(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost);
            //当前剩余次数
            if (num > this.father.exchange_times2) {
                maxNum = this.father.exchange_times2;
            }
            else {
                maxNum = num;
            }
            this.count = this.count + 1;
            if (this.count > maxNum) {
                this.count = maxNum;
            }
            if (this.count <= 1) {
                this.count = 1;
            }
            this.SetInfoCount();
        };
        // 按钮 最大
        Activity_RandomLiveExchange.prototype.onButtonMax = function () {
            //当积分可换次数
            var num = Math.floor(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore / this.save_cost);
            //当前剩余次数
            if (num > this.father.exchange_times2) {
                this.count = this.father.exchange_times2;
            }
            else {
                this.count = num;
            }
            if (this.count <= 1) {
                this.count = 1;
            }
            // this.count = num >= this.maxCount && this.maxCount || Math.floor(num);
            // this.count = this.count > 0 && this.count || 1;
            this.SetInfoCount();
        };
        //确认兑换 按钮
        Activity_RandomLiveExchange.prototype.onButtonBuy = function () {
            var _this = this;
            if (this.GetExchange()) {
                this.onButtonClose();
                setTimeout(function () {
                    _this.father.ExchangeReq(_this.count);
                }, 350);
            }
        };
        Activity_RandomLiveExchange.prototype.GetExchange = function () {
            var bBuy = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore >= this.save_cost * this.count;
            if (!bBuy) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Egg_Random.not_enough);
            }
            return bBuy;
        };
        Activity_RandomLiveExchange.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        // 物品遮罩
        Activity_RandomLiveExchange.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true;
            }
            return false;
        };
        return Activity_RandomLiveExchange;
    }(zj.Dialog));
    zj.Activity_RandomLiveExchange = Activity_RandomLiveExchange;
    __reflect(Activity_RandomLiveExchange.prototype, "zj.Activity_RandomLiveExchange");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomLiveExchange.js.map