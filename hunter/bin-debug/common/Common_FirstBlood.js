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
     * 首杀奖励
     * created by LianLei
     * 2019.4.13
     */
    var Common_FirstBlood = (function (_super) {
        __extends(Common_FirstBlood, _super);
        function Common_FirstBlood() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_FirstBloodSkin.exml";
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnTouchBeginFirstBlood, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnTouchEndFirstBlood, _this);
            return _this;
        }
        Common_FirstBlood.prototype.SetInfoGet = function (goods) {
            var goodId = goods[0].goodsId;
            var count = goods[0].count;
            this.goodsId = goodId;
            this.count = count;
            var itemSet = zj.PlayerItemSystem.Set(goodId, null, count);
            var name = itemSet.Info.name;
            this.imgIconFirstBlood.source = zj.cachekey(itemSet.Path, this);
            this.labelFirstBloodNum.text = count.toString();
            if (zj.Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_RELIC) {
                this.labelFirstBloodTip.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.awardFirst, name, count));
            }
            else {
                var scene = zj.Game.UIManager.topScene();
                var step = scene['getCurrChapSetp']() || 1;
                this.labelFirstBloodTip.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter_Instance.relicAwardFirst, step, name, count));
            }
            this.imgFrameFirstBlood.source = zj.cachekey(itemSet.Frame, this);
            var path = "WordsBattleEndPopTip_png";
            this.playAnimation();
            this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);
            var cardInfo = zj.TableItemPotato.Table();
            for (var _i = 0, _a = zj.HelpUtil.GetKV(cardInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (v.id == goodId) {
                    return goodId;
                }
            }
        };
        //添加龙骨动画背景发光
        Common_FirstBlood.prototype.addBackdropAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        Common_FirstBlood.prototype.onBtnClose = function () {
            // Teach.addTeaching();
            if (this.callBack) {
                this.callBack();
            }
            this.close();
        };
        Common_FirstBlood.prototype.SetCB = function (cb) {
            this.callBack = cb;
        };
        Common_FirstBlood.prototype.playAnimation = function () {
            var _this = this;
            this.imgGet.scaleX = 10;
            this.imgGet.scaleY = 10;
            this.imgGet.alpha = 1;
            egret.Tween.get(this.imgGet)
                .to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
                .call(function () {
                _this.imgGetB.scaleX = 0.85;
                _this.imgGetB.scaleY = 0.85;
                _this.imgGetB.alpha = 0.75;
                egret.Tween.get(_this.imgGetB)
                    .to({ scaleY: 2.5, scaleX: 2.5, alpha: 0 }, 1000, egret.Ease.sineInOut)
                    .call(function () {
                    egret.Tween.removeTweens(_this.imgGetB);
                });
            })
                .to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
                .to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut)
                .call(function () {
                egret.Tween.removeTweens(_this.imgGet);
            });
        };
        Common_FirstBlood.prototype.onBtnTouchBeginFirstBlood = function (e) {
            var _this = this;
            var newThis = this;
            var touchX = e.stageX;
            var groupY;
            var type = 0; // type == 1 点击位置大于父类高度的一半
            groupY = e.stageY - e.localY;
            type = 1;
            var cardInfo = zj.TableItemPotato.Table();
            var cardId = zj.Table.FindF(cardInfo, function (_k, _v) {
                return _v.id == _this.goodsId;
            });
            if (!cardId) {
                var _type = zj.PlayerItemSystem.ItemType(this.goodsId);
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        dialog.y = groupY - dialog.height;
                        dialog.setInfo(newThis.goodsId, newThis.count);
                        newThis.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        dialog.y = groupY - dialog.height;
                        dialog.setInfo(newThis.goodsId, newThis.count);
                        newThis.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.name = "First_Blood";
                        dialog.x = touchX - dialog.width / 2 - 20;
                        dialog.y = groupY - dialog.height;
                        dialog.init(newThis.goodsId, newThis.count);
                        newThis.addChild(dialog);
                    });
                }
            }
            else {
                var showCardInfo_1 = cardInfo[this.goodsId];
                zj.loadUI(zj.PlayerCardPopDialog)
                    .then(function (dialog) {
                    dialog.loadNotGet(showCardInfo_1, false, function () {
                        dialog.close();
                    });
                    dialog.name = "First_Blood";
                    dialog.show();
                });
            }
        };
        Common_FirstBlood.prototype.onBtnTouchEndFirstBlood = function () {
            var dialogFirstBlood = this.getChildByName("First_Blood");
            if (dialogFirstBlood)
                this.removeChild(dialogFirstBlood);
        };
        return Common_FirstBlood;
    }(zj.Dialog));
    zj.Common_FirstBlood = Common_FirstBlood;
    __reflect(Common_FirstBlood.prototype, "zj.Common_FirstBlood");
})(zj || (zj = {}));
//# sourceMappingURL=Common_FirstBlood.js.map