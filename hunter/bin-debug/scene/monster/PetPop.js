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
    // PetPop
    // wangshenzhuo /hexiaowei
    // 2019/1/12
    var PetPop = (function (_super) {
        __extends(PetPop, _super);
        function PetPop() {
            var _this = _super.call(this) || this;
            _this.BASE_ID = 10000;
            _this.skinName = "resource/skins/monster/PetPopSkin.exml";
            _this.groupWhole.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        //念兽信息
        PetPop.prototype.SetInfo = function (index) {
            var _this = this;
            this.index = index;
            var dat_tbl = zj.PlayerAdviserSystem.Instance(this.index);
            var adviserId = zj.PlayerAdviserSystem.Instance(this.index).adviser_id;
            var level = zj.Game.PlayerAdviserSystem.advisersMap[this.index].level + 1;
            var attr_des = "";
            var attr_tbl = zj.PlayerAdviserSystem.AdviserlvdbAttrTbl(adviserId, level);
            for (var i = 0; i < attr_tbl.length; i++) {
                var des_1 = zj.PlayerAdviserSystem.AdviserLvdbAttrDes(adviserId, level, i);
                attr_des = attr_des + des_1 + zj.TextsConfig.TextsConfig_Adviser.attr_space;
            }
            var skill_id = zj.PlayerAdviserSystem.Instance(this.index).skill_id;
            var skill_level = zj.PlayerAdviserSystem.AdviserlvdbInstance(this.index * this.BASE_ID + level).skill_level;
            var des = zj.PlayerAdviserSystem.Instance(this.index).des;
            var name = zj.PlayerAdviserSystem.Instance(this.index).adviser_name;
            var quality = zj.PlayerAdviserSystem.Instance(this.index).quality + 10;
            this.labelPetName.text = name;
            //  let des = PlayerAdviserSystem.Instance(this.index).des;
            //  set.textInView(des, this.labelAtt1, this.LayerSkill, this.Stencil)
            this.labelAtt1.text = des;
            //this.labelAtt1.visible = true;
            //this.imgSpriteBack.visible = true;
            this.imgSpriteIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[quality], this);
            //this.imgSpriteBackShadow.visible = true;
            var ids = zj.PlayerAdviserSystem.Instance(this.index).spine_id;
            var spine_scale = zj.PlayerAdviserSystem.Instance(this.index).spine_scale;
            var infoItem = zj.PlayerAdviserSystem.Instance(this.index);
            var aniSpine = zj.TableClientAniSpineSource.Item(infoItem.spine_id);
            zj.Game.DragonBonesManager.playAnimation(this, aniSpine.json, null, null, 0)
                .then(function (display) {
                display.x = _this.groupAdviser.width / 2;
                display.y = _this.groupAdviser.height * 1.05;
                display.scaleX = spine_scale;
                display.scaleY = spine_scale;
                _this.groupAdviser.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            //this.addAnimatoin(aniSpine.json);
            this.addAnimatoin("jg_zhaohuan", 1);
        };
        //宠物信息
        PetPop.prototype.SetInfoPet = function (index) {
            var _this = this;
            this.index = index;
            var name = zj.PlayerAdviserSystem.PetBase(this.index).pet_name;
            var quality = zj.PlayerAdviserSystem.PetBase(this.index).quality + 10;
            this.labelPetName.text = name;
            this.imgSpriteIconGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[quality], this);
            var steps = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
                steps = 0;
            }
            else if (zj.Game.PlayerAdviserSystem.petMap[this.index].step >= zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
                && zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
                steps = 1;
            }
            else {
                steps = 2;
            }
            var infoItem = zj.PlayerAdviserSystem.PetBase(this.index);
            var aniSpine = zj.TableClientAniSpineSource.Item(infoItem.spine_id[steps]);
            zj.Game.DragonBonesManager.playAnimation(this, aniSpine.json, null, null, 0)
                .then(function (display) {
                display.x = _this.groupAdviser.width / 2;
                display.y = _this.groupAdviser.height * 1.05;
                //this.groupAnimation.addChild(display);
                _this.groupAdviser.addChild(display);
                _this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            this.addAnimatoin("jg_zhaohuan", 2);
            this.imgSpriteBackShadow.visible = false;
            this.labelAtt1.visible = false;
        };
        PetPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            // this.groupAdviser.removeChild(this.petMainKeelAnimation);
        };
        //龙骨动画念兽
        PetPop.prototype.addAnimatoin = function (dbName, type, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            var displays = [];
            var solts = [];
            if (type == 1) {
                displays = [this.groupImage, this.labelPetName, this.groupAttl];
                solts = ["002_juese", "005_mingzi", "006_shuxing"];
            }
            else {
                displays = [this.groupImage, this.labelPetName, this.groupAttl, this.groupBackShadow];
                solts = ["002_juese", "005_mingzi", "006_shuxing", "003_wenzidiban"];
            }
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "jg_zhaohuan", null, displays, solts)
                .then(function (armatureDisplay) {
                // this.addEventListener(egret.Event.REMOVED_FROM_STAGE ,()=>{
                //     armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // } , null);
                armatureDisplay.animation.play("001_xunhuan", 0);
                armatureDisplay.x = _this.groupMap.width / 2;
                armatureDisplay.y = _this.groupMap.height * 0.88;
                _this.groupMap.addChild(armatureDisplay);
            });
        };
        return PetPop;
    }(zj.Dialog));
    zj.PetPop = PetPop;
    __reflect(PetPop.prototype, "zj.PetPop");
})(zj || (zj = {}));
//# sourceMappingURL=PetPop.js.map