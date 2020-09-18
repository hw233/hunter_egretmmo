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
     * @date 2019-7-16
     *
     * @class 领取高级执照界面
     */
    var licenseHunterUpStarHight = (function (_super) {
        __extends(licenseHunterUpStarHight, _super);
        function licenseHunterUpStarHight() {
            var _this = _super.call(this) || this;
            _this.aniEnd = false;
            _this.skinName = "resource/skins/license/licenseHunterUpStarHightSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this.labelCloseTip); // 因为是循环播放，需要特别处理
            }, null);
            return _this;
        }
        licenseHunterUpStarHight.prototype.setInfo = function (index, msg, father, cb) {
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
        licenseHunterUpStarHight.prototype.setInfoLicenseInfo = function () {
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
                zj.Helper.SetStar(this.groupStar, zj.Game.PlayerMissionSystem.missionActive.licence - zj.CommonConfig.licence_max_level, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], 1, 18);
            }
            this.groupRight.visible = false;
            this.labelCloseTip.visible = false;
        };
        licenseHunterUpStarHight.prototype.setInfoAni = function () {
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
        licenseHunterUpStarHight.prototype.onClose = function () {
            this.close();
        };
        return licenseHunterUpStarHight;
    }(zj.Dialog));
    zj.licenseHunterUpStarHight = licenseHunterUpStarHight;
    __reflect(licenseHunterUpStarHight.prototype, "zj.licenseHunterUpStarHight");
})(zj || (zj = {}));
//# sourceMappingURL=licenseHunterUpStarHight.js.map