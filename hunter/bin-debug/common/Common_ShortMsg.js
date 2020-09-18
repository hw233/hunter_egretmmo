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
    //获得资源
    //wangshenzhuo
    //2.19/4/3
    var Common_ShortMsg = (function (_super) {
        __extends(Common_ShortMsg, _super);
        function Common_ShortMsg() {
            var _this = _super.call(this) || this;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.skinName = "resource/skins/common/Common_ShortMsgSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        Common_ShortMsg.prototype.SetInfo = function (text, id, posY, multiple) {
            var _this = this;
            this.y = posY / 2;
            this.imageDouble.visible = false;
            this.labelTip.visible = false;
            if (multiple != null) {
                this.labelTip.visible = true;
                this.labelTip.scaleX = 0.7;
                this.labelTip.scaleY = 0.7;
                if (multiple < 3) {
                    this.labelTip.font = zj.UIConfig.UIConfig_Money.nameFont[0];
                    this.labelTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
                }
                else if (multiple >= 3 && multiple <= 5) {
                    this.labelTip.font = zj.UIConfig.UIConfig_Money.nameFont[1];
                    this.labelTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
                }
                else if (multiple >= 6 && multiple <= 8) {
                    this.labelTip.font = zj.UIConfig.UIConfig_Money.nameFont[2];
                    this.labelTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
                }
                else if (multiple >= 9 && multiple <= 10) {
                    this.labelTip.font = zj.UIConfig.UIConfig_Money.nameFont[3];
                    this.labelTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
                }
                else {
                    this.labelTip.font = zj.UIConfig.UIConfig_Money.nameFont[4];
                    this.labelTip.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.multiple1, multiple);
                }
            }
            var item = zj.PlayerItemSystem.Item(id);
            var path = item.icon || item.path;
            this.imageIcon.source = zj.cachekey(path, this);
            this.labelTextNum.text = text;
            if (id == message.EResourceType.RESOURCE_MONEY) {
                zj.Game.SoundManager.playEffect(this.SoundOpen(30021), 100);
            }
            else if (zj.PlayerItemSystem.Type2(id) == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                zj.Game.SoundManager.playEffect(this.SoundOpen(30022), 100);
            }
            setTimeout(function () {
                egret.Tween.get(_this.imageIcon)
                    .to({ x: 430 }, 0)
                    .to({ x: 480 }, 100, egret.Ease.backOut);
                egret.Tween.get(_this.labelTextNum)
                    .to({ x: 600 }, 0)
                    .to({ x: 550 }, 100, egret.Ease.backOut);
                egret.Tween.get(_this).wait(400)
                    .to({ y: posY / 2 }, 0)
                    .to({ y: 0 }, 500)
                    .call(function () {
                    _this.removeChildren();
                });
            }, 100);
        };
        Common_ShortMsg.promptBattleValue = function (text, id, posY, multiple) {
            var tip = new Common_ShortMsg();
            tip.SetInfo(text, id, posY, multiple);
            zj.Game.UIManager.AnimationGroup.addChild(tip);
            tip.y = posY;
        };
        Common_ShortMsg.prototype.SoundOpen = function (id) {
            var sound = zj.TableClientSoundResource.Item(id);
            var textDrop = sound.sound_path;
            var strs = new Array();
            strs = textDrop.split("/");
            var soundtext = strs[2];
            soundtext = soundtext.replace('.', '_');
            return soundtext;
        };
        return Common_ShortMsg;
    }(zj.UI));
    zj.Common_ShortMsg = Common_ShortMsg;
    __reflect(Common_ShortMsg.prototype, "zj.Common_ShortMsg");
})(zj || (zj = {}));
//# sourceMappingURL=Common_ShortMsg.js.map