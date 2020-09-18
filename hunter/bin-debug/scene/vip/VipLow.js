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
    //VIP特权
    //yuqingchao
    //2019.04.10
    var VipLow = (function (_super) {
        __extends(VipLow, _super);
        function VipLow() {
            var _this = _super.call(this) || this;
            _this.goods = [];
            _this.MAX = 12;
            _this.MIN = 0;
            _this.levelCur = 0;
            _this.id = 0;
            _this.good = [];
            _this.count = [];
            _this.isBackground = false;
            _this.skinName = "resource/skins/vip/VipLowSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.imgName);
            }, null);
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPay, _this);
            _this.groupLeftButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnLeft, _this);
            _this.groupRightButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRight, _this);
            _this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGet, _this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            return _this;
        }
        VipLow.prototype.init = function (isBackground) {
            var _this = this;
            if (isBackground === void 0) { isBackground = false; }
            this.isBackground = isBackground;
            this.imgBackground.visible = this.isBackground;
            this.imgName.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_title_name, this);
            this.imgPay.visible = false;
            this.imgTip.visible = false;
            this.rectMask = zj.Util.getMaskImgBlack(341, 25);
            this.rectMask.verticalCenter = 0;
            this.rectMask.left = 7;
            this.rectMask.visible = false;
            this.groupExp.addChild(this.rectMask);
            zj.Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(function (display) {
                _this.groupBgAni.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            egret.Tween.get(this.imgName, { loop: true })
                .to({ y: -34 }, 500)
                .to({ y: -30 }, 1000)
                .to({ y: -32 }, 500);
            // this.groupCach.cacheAsBitmap = true;
            // this.imgBackground.cacheAsBitmap = true;
            // this.btnClose.cacheAsBitmap = true;
            this.setFocusInfo();
            this.btnTW();
        };
        VipLow.prototype.CB = function (cb) {
            this.cb = cb;
        };
        VipLow.prototype.isFullScreen = function () {
            return this.imgBackground.visible;
        };
        VipLow.prototype.btnTW = function () {
            var _this = this;
            this.groupSelectRight.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(function (display) {
                _this.groupSelectRight.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
            this.groupSelectLeft.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(function (display) {
                _this.groupSelectLeft.addChild(display);
            }).catch(function (reason) {
                zj.toast(reason);
            });
        };
        VipLow.prototype.setFocusInfo = function () {
            this.levelCur = zj.Game.PlayerInfoSystem.VipLevel;
            var bGetCur = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                return v == zj.Game.PlayerInfoSystem.VipLevel;
            });
            //0级未领取显示0
            if ((zj.Game.PlayerInfoSystem.VipLevel == 0 && !bGetCur) || (zj.Game.PlayerInfoSystem.VipLevel == this.MAX)) {
                this.id = zj.Game.PlayerInfoSystem.VipLevel;
            }
            else {
                this.id = zj.Game.PlayerInfoSystem.VipLevel + 1;
            }
            for (var i = 0; i < this.MAX; i++) {
                if (!zj.Table.VIn(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, i) && i < this.id) {
                    this.id = i;
                }
            }
            if (this.levelCur > this.MAX) {
                this.levelCur = this.MAX;
            }
            this.setInfo();
            this.setList();
            this.setListDes();
        };
        VipLow.prototype.setInfo = function () {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.LowVip + ".json"); //读表
            if (this.id > this.MAX) {
                this.id = this.MAX;
            }
            if (this.levelCur != this.MAX) {
                this.imgVipNext.visible = true;
                this.lbNeed.visible = true;
                //当前星耀等级名称
                this.imgVip.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur], this);
                //下一星耀等级名称
                this.imgVipNext.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur + 1], this);
                //需要充值
                this.lbNeed.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[this.levelCur + 1].sum - zj.Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10);
            }
            else {
                this.imgVip.source = zj.cachekey(zj.UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur], this);
                this.imgVipNext.visible = false;
                this.lbNeed.text = zj.TextsConfig.TextsConfig_Common.expMax;
            }
            //经验
            var percent = 0;
            if (this.levelCur != this.MAX) {
                percent = Number((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / (tbl[this.levelCur].charge + tbl[this.levelCur].sum));
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / 10 + "/" + (tbl[this.levelCur].charge + tbl[this.levelCur].sum) / 10).toString();
            }
            else {
                percent = Number((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / tbl[this.levelCur].sum);
                this.lbPay.text = ((zj.Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / 10 + "/" + tbl[this.levelCur].sum / 10).toString();
            }
            if (percent > 1) {
                percent = 1;
            }
            else if (percent < 0) {
                percent = 0;
            }
            //经验条
            this.rectMask.visible = true;
            this.rectMask.width = 341 * percent;
            this.imgExp.mask = this.rectMask;
            this.setButtonState();
        };
        //左侧切换按钮
        VipLow.prototype.onBtnLeft = function () {
            if (this.id != this.MIN) {
                this.id = this.id - 1;
                this.setList();
                this.setListDes();
                this.setButtonState();
            }
        };
        //右侧切换按钮
        VipLow.prototype.onBtnRight = function () {
            if (this.id != this.MAX) {
                this.id = this.id + 1;
                this.setList();
                this.setListDes();
                this.setButtonState();
            }
        };
        //设置按钮状态
        VipLow.prototype.setButtonState = function () {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.LowVip + ".json"); //读表
            this.groupLeftButton.visible = this.id != this.MIN;
            this.groupRightButton.visible = this.id != this.MAX;
            this.lbLevel.text = this.id.toString();
            this.lbNeedAll.text = (tbl[this.id].sum / 10).toString();
            var arr = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.payIndexs;
            var id = this.id;
            var isHave = zj.Table.FindF(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, function (k, v) {
                return v == id;
            });
            if (this.id <= zj.Game.PlayerInfoSystem.VipLevel && !isHave) {
                this.btnGet.enabled = true;
            }
            else {
                this.btnGet.enabled = false;
            }
            isHave;
            if (isHave) {
                this.imgSellOut.visible = true;
                this.groupGet.visible = false;
                this.groupPrimer.visible = false;
            }
            else {
                this.groupGet.visible = true;
                this.groupPrimer.visible = true;
                this.imgSellOut.visible = false;
            }
        };
        //VIP特权
        VipLow.prototype.setList = function () {
            var strVip = zj.PlayerVIPSystem.DesVip(this.id);
            this.arrayCollectionLest = new eui.ArrayCollection();
            for (var i = 0; i < strVip.length; i++) {
                this.arrayCollectionLest.addItem({
                    info: strVip[i]
                });
            }
            this.lstLestInfo.dataProvider = this.arrayCollectionLest;
            this.lstLestInfo.itemRenderer = zj.VipLowItem;
        };
        //超值折扣
        VipLow.prototype.setListDes = function () {
            this.good = zj.PlayerVIPSystem.LowWealItem(this.id).goods_content;
            this.count = zj.PlayerVIPSystem.LowWealItem(this.id).goods_count;
            this.arrayCollectionLestB = new eui.ArrayCollection();
            for (var i = 0; i < this.good.length; i++) {
                this.arrayCollectionLestB.addItem({
                    i: i,
                    good: this.good[i],
                    count: this.count[i],
                    father: this
                });
            }
            this.lstViewItem.dataProvider = this.arrayCollectionLestB;
            this.lstViewItem.itemRenderer = zj.VipLowItemB;
            this.lbTokem.text = zj.PlayerVIPSystem.LowWealItem(this.id).consume_token.toString();
            this.lbPrimer.text = zj.HelpUtil.textConfigFormat("%s", zj.PlayerVIPSystem.LowWealItem(this.id).primer); // TextsConfig.TextsConfig_Gift.primer
        };
        //跳转充值界面
        VipLow.prototype.onBtnPay = function () {
            var _this = this;
            this.btnPay.enabled = false;
            setTimeout(function () {
                _this.onBtnClose();
            }, 500);
            setTimeout(function () {
                zj.loadUI(zj.PayMallScene)
                    .then(function (dialog) {
                    dialog.show(zj.UI.SHOW_FILL_OUT);
                    dialog.init(_this.isBackground);
                });
            }, 1000);
        };
        //购买超值折扣
        VipLow.prototype.onBtnGet = function () {
            var _this = this;
            zj.Game.PlayerVIPSystem.lowVipBuyWealReward(this.id).then(function (resp) {
                _this.setFocusInfo();
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(resp.getGoods);
                    dialog.show();
                });
            });
        };
        VipLow.prototype.onBtnClose = function () {
            if (this.cb) {
                this.cb();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        VipLow.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        VipLow.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
        };
        return VipLow;
    }(zj.Dialog));
    zj.VipLow = VipLow;
    __reflect(VipLow.prototype, "zj.VipLow");
})(zj || (zj = {}));
//# sourceMappingURL=VipLow.js.map