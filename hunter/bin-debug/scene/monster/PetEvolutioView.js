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
    //PetEvolutioView
    //hexiaowei  
    //2019/01/18
    var PetEvolutioView = (function (_super) {
        __extends(PetEvolutioView, _super);
        function PetEvolutioView() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/monster/PetEvolutioViewSkin.exml";
            _this.btnclose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        //龙骨动画宠物
        PetEvolutioView.prototype.addAnimatoinPet = function (groupAdviser, scale, dbName, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, null, 0)
                .then(function (display) {
                display.x = groupAdviser.width / 2;
                display.y = groupAdviser.height / 1.2;
                display.scaleX = scale;
                display.scaleY = scale;
                //this.groupAnimation.addChild(display);
                groupAdviser.addChild(display);
                //this.petMainKeelAnimation = display;
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        PetEvolutioView.prototype.setInfo = function (index, father) {
            this.index = index;
            this.father = father;
            var evolution = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]) {
                evolution = 1;
            }
            else if (zj.Game.PlayerAdviserSystem.petMap[this.index].step >= zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[1]
                && zj.Game.PlayerAdviserSystem.petMap[this.index].step < zj.PlayerAdviserSystem.PetBase(this.index).unlock_step[2]) {
                evolution = 2;
            }
            else {
                evolution = 3;
            }
            var petInfo = zj.PlayerAdviserSystem.PetBase(this.index);
            var spine1 = petInfo.spine_id[0];
            var aniSpine1 = zj.TableClientAniSpineSource.Item(spine1);
            this.addAnimatoinPet(this.groupNodePet0, 0.7, aniSpine1.json);
            var spine2 = petInfo.spine_id[1];
            var aniSpine2 = zj.TableClientAniSpineSource.Item(spine2);
            this.addAnimatoinPet(this.groupNodePet1, 0.8, aniSpine2.json);
            var spine3 = petInfo.spine_id[2];
            var aniSpine3 = zj.TableClientAniSpineSource.Item(spine3);
            this.addAnimatoinPet(this.groupNodePet2, 0.7, aniSpine3.json);
            if (evolution == 1) {
                this.lableUnLock0.visible = false;
                this.imgSpriteNow0.visible = true;
                this.lableUnLock1.visible = true;
                this.imgSpriteNow1.visible = false;
                this.lableUnLock2.visible = true;
                this.imgSpriteNow2.visible = false;
            }
            else if (evolution == 2) {
                this.lableUnLock0.visible = false;
                this.imgSpriteNow0.visible = false;
                this.lableUnLock1.visible = false;
                this.imgSpriteNow1.visible = true;
                this.lableUnLock2.visible = true;
                this.imgSpriteNow2.visible = false;
            }
            else {
                this.lableUnLock0.visible = false;
                this.imgSpriteNow0.visible = false;
                this.lableUnLock1.visible = false;
                this.imgSpriteNow1.visible = false;
                this.lableUnLock2.visible = false;
                this.imgSpriteNow2.visible = true;
            }
            this.lableUnLock0.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[0]));
            this.lableUnLock1.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[1]));
            this.lableUnLock2.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.pet_unlock, petInfo.unlock_step[2]));
        };
        PetEvolutioView.prototype.onBtnclose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return PetEvolutioView;
    }(zj.Dialog));
    zj.PetEvolutioView = PetEvolutioView;
    __reflect(PetEvolutioView.prototype, "zj.PetEvolutioView");
})(zj || (zj = {}));
//# sourceMappingURL=PetEvolutioView.js.map