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
    // wang shen zhuo
    // 娃娃机---兑换礼物--item
    // 2019 04 12
    var Activity_RandomLiveItem = (function (_super) {
        __extends(Activity_RandomLiveItem, _super);
        function Activity_RandomLiveItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_RandomLiveItemSkin.exml";
            zj.cachekeys(zj.UIResource["Activity_RandomLiveItem"], null);
            _this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonChange, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
                _this.data.father.onChooseItemTap(true, _this.data);
            }, _this);
            _this.groupMain.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                _this.data.father.onChooseItemTap(false, _this.data);
            }, _this);
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
        Activity_RandomLiveItem.prototype.dataChanged = function () {
            this.imgMask.visible = false;
            this.rectMaskCommon.visible = false;
            this.score = this.data.father.curTopicInfo.exchange_integral[this.data.index];
            this.exchange_times = this.data.father.curTopicInfo.exchange_count[this.data.index];
            this.SetInfoGoods();
            this.SetInfoOther();
            this.SetInfoCoreColor();
            if (this.isImgMask(this.data.goods.goodsId)) {
                this.imgMask.visible = true;
                this.imageClip.mask = this.imgMask;
            }
            else {
                this.imgMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageClip.mask = this.rectMaskCommon;
            }
        };
        Activity_RandomLiveItem.prototype.SetInfoGoods = function () {
            if (this.data.goods.goodsId != 0) {
                var itemSet = zj.PlayerItemSystem.Set(this.data.goods.goodsId, this.data.goods.showType, this.data.goods.count);
                this.imageClip.source = zj.cachekey(itemSet.Clip, this);
                this.imageFrame.source = zj.cachekey(itemSet.Frame, this);
                this.labelNum.text = "x" + this.data.goods.count;
                this.labelItemName.text = itemSet["name"];
                this.labelChangeCore.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.jifen, this.score);
            }
            else {
            }
        };
        Activity_RandomLiveItem.prototype.SetInfoCoreColor = function () {
            if (this.score == null) {
                return;
            }
            var a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
            if (this.score <= zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore) {
                this.labelChangeCore.textColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            }
            else {
                this.labelChangeCore.textColor = zj.Helper.RGBToHex("r:255,g:38,b:0");
            }
        };
        Activity_RandomLiveItem.prototype.SetInfoOther = function () {
            if (this.data.goods.goodsId == 0) {
                return;
            }
            var a = this.data.index;
            var aa = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone;
            var buy_times = zj.Table.FindR(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_exchangeZone, function (k, v) {
                return v.key == a;
            });
            var color_green = [60, 255, 0];
            var color_red = [200, 38, 0];
            if (buy_times[0] == null) {
                this.labelChangeNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.last_times, color_green[0], color_green[1], color_green[2], this.exchange_times, this.exchange_times));
                this.buttonChange.enabled = true;
                this.imageGet.visible = false;
                this.exchange_times2 = this.exchange_times;
            }
            else {
                var can_exchange = buy_times[0].value < this.exchange_times;
                if ((this.exchange_times - buy_times[0].value) > 0) {
                    this.labelChangeNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.last_times, color_green[0], color_green[1], color_green[2], this.exchange_times - buy_times[0].value, this.exchange_times));
                }
                else {
                    this.labelChangeNum.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Egg_Random.last_times, color_red[0], color_red[1], color_red[2], this.exchange_times - buy_times[0].value, this.exchange_times));
                }
                this.exchange_times2 = this.exchange_times - buy_times[0].value;
                this.buttonChange.enabled = can_exchange;
                this.imageGet.visible = !can_exchange;
            }
            this.SetInfoCoreColor();
        };
        // 物品遮罩
        Activity_RandomLiveItem.prototype.isImgMask = function (goodsId) {
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
        // 点击 兑换按钮 
        Activity_RandomLiveItem.prototype.onButtonChange = function () {
            var _this = this;
            zj.loadUI(zj.Activity_RandomLiveExchange)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.SetInfo(_this);
            });
        };
        Activity_RandomLiveItem.prototype.ExchangeReq = function (count) {
            var _this = this;
            this.IntegralExchangeReqBody_Visit(count).then(function (data) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(data.body.gameInfo.getGoods);
                    dialog.show();
                    dialog.setCB(function () { _this.data.father.SetInfoList(); });
                });
                _this.data.father.RefreshScoreList();
            }).catch(function (reason) { });
        };
        Activity_RandomLiveItem.prototype.IntegralExchangeReqBody_Visit = function (count) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.IntegralExchangeRequest();
                request.body.exchangeId = _this.data.index;
                request.body.exchange_time = count || 1;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return Activity_RandomLiveItem;
    }(eui.ItemRenderer));
    zj.Activity_RandomLiveItem = Activity_RandomLiveItem;
    __reflect(Activity_RandomLiveItem.prototype, "zj.Activity_RandomLiveItem");
    var Activity_RandomLiveItemData = (function () {
        function Activity_RandomLiveItemData() {
        }
        return Activity_RandomLiveItemData;
    }());
    zj.Activity_RandomLiveItemData = Activity_RandomLiveItemData;
    __reflect(Activity_RandomLiveItemData.prototype, "zj.Activity_RandomLiveItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomLiveItem.js.map