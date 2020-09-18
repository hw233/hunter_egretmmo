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
     * @author xing li wei
     *
     * @date 2019-3-23
     *
     * @class 领取执照界面
     */
    var licenseHunterUpStar = (function (_super) {
        __extends(licenseHunterUpStar, _super);
        function licenseHunterUpStar() {
            var _this = _super.call(this) || this;
            _this.aniEnd = false;
            _this.skinName = "resource/skins/license/licenseHunterUpStarSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTip); // 因为是循环播放，需要特别处理
                egret.Tween.removeTweens(_this);
            }, null);
            return _this;
        }
        licenseHunterUpStar.prototype.setInfo = function (index, msg, father, cb) {
            var _this = this;
            this.index = index;
            this.msg = msg;
            this.father = father;
            this.cb = cb;
            egret.Tween.get(this).wait(3000).call(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClose, _this);
                egret.Tween.get(_this.labelCloseTip, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
            });
            // this.grouplic 
            this.setInfoLicenseInfo();
            egret.Tween.get(this).wait(4).call(function () {
                _this.groupStar.anchorOffsetX = _this.groupStar.width / 2;
                _this.groupStar.anchorOffsetY = _this.groupStar.height / 2;
                _this.setInfoAni();
            });
            this.labelCloseTip.visible = false;
        };
        licenseHunterUpStar.prototype.setInfoLicenseInfo = function () {
            var _this = this;
            var goods = this.msg.getGoods;
            this.imgLicenceLevel.source = zj.cachekey(zj.UIConfig.UIConfig_Task.Title[this.index], this);
            this.labelLicenSeLevel.text = "NO. " + zj.Game.PlayerInfoSystem.BaseInfo.id;
            egret.Tween.get(this).wait(4).call(function () {
                _this.labelLicenSeLevel.anchorOffsetX = _this.labelLicenSeLevel.width / 2;
                _this.labelLicenSeLevel.anchorOffsetY = _this.labelLicenSeLevel.height / 2;
            });
            var array = new eui.ArrayCollection();
            for (var i = 0; i < goods.length; i++) {
                var data = new zj.licenseProgressItemData();
                data.index = i;
                data.goods = goods[i].goodsId;
                data.count = goods[i].count;
                // data.father = this;
                array.addItem(data);
            }
            this.listStarAward.dataProvider = array;
            this.listStarAward.itemRenderer = zj.licenseProgressItem;
            var strVip = zj.PlayerVIPSystem.StrVip(this.index);
            var array1 = new eui.ArrayCollection();
            for (var i = 0; i < strVip.length; i++) {
                var data = new zj.licenseProgressInfoItemBData();
                data.id = strVip[i];
                array1.addItem(data);
            }
            this.listHunterInfo.dataProvider = array1;
            this.listHunterInfo.itemRenderer = zj.licenseProgressInfoItemB;
            if (zj.Game.PlayerMissionSystem.missionActive.licence == 1) {
                this.groupStar.visible = false;
            }
            else {
                zj.Helper.SetStar(this.groupStar, zj.Game.PlayerMissionSystem.missionActive.licence, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], 1, 18);
            }
            this.groupRight.visible = false;
            this.labelCloseTip.visible = false;
        };
        licenseHunterUpStar.prototype.setInfoAni = function () {
            var _this = this;
            var path1 = [this.groupStar, this.labelLicenSeLevel, this.imgLicense];
            var bones = ["002_xingxing01", "004_id", "002_juese"];
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_zhizhao_shengxing", null, path1, bones)
                .then(function (armatureDisplay) {
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.stop();
                    _this.groupRight.visible = true;
                    _this.labelCloseTip.visible = true;
                    _this.aniEnd = true;
                    zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                }, _this);
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.animation.play("000_shengxing", 1);
                _this.groupgu.addChild(armatureDisplay);
            });
        };
        licenseHunterUpStar.prototype.onClose = function () {
            this.close();
            // this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            // this.removeChild(this);
        };
        return licenseHunterUpStar;
    }(zj.Dialog));
    zj.licenseHunterUpStar = licenseHunterUpStar;
    __reflect(licenseHunterUpStar.prototype, "zj.licenseHunterUpStar");
})(zj || (zj = {}));
//# sourceMappingURL=licenseHunterUpStar.js.map