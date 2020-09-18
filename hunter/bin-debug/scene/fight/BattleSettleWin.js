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
    var BattleSettleWin = (function (_super) {
        __extends(BattleSettleWin, _super);
        // public container = [];
        function BattleSettleWin() {
            var _this = _super.call(this) || this;
            _this.tableAniNode = [];
            _this.tableDropItem = [];
            _this.bDropCome = false;
            _this.fireParticle = null;
            return _this;
        }
        BattleSettleWin.prototype.Init = function () {
            _super.prototype.Init.call(this);
            this.hero_come_time = zj.ConstantConfig_BattleSettle.generalComeTime;
            this.tableDropItem = [];
            //gmsound.playbgmByID ( 100005 )
            //缓存战斗获得数据
            if (zj.Gmgr.Instance.bReplay == false) {
                zj.Game.PlayerBattleSystem.cacheBattleItemInfo = this.scene.getItemInfo;
            }
            else {
                this.scene.getItemInfo = zj.Game.PlayerBattleSystem.cacheBattleItemInfo;
            }
        };
        BattleSettleWin.prototype.Load = function () {
            _super.prototype.Load.call(this);
            this.LoadHerosList();
            this.InitAni();
        };
        BattleSettleWin.prototype.Update = function (tick) {
            _super.prototype.Update.call(this, tick);
            this.UpdateDrop(tick);
        };
        BattleSettleWin.prototype.InitAni = function () {
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK || zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_PVP_THIRD) {
                this.InitSingleAni();
            }
            else {
                this.InitNormalAni();
            }
        };
        BattleSettleWin.prototype.InitSingleAni = function () {
        };
        BattleSettleWin.prototype.InitNormalAni = function () {
            this.tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
            var boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];
            var boardAniIndex = [0, 1];
            var aniId = 1009;
            var starAniName = [];
            var starAniIndex = [];
            var winAniName = ["010_shengli_chuxian", "011_shengli_xunhuan"];
            var winAniIndex = [10, 11];
            if (zj.Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_1) {
                starAniName = ["004_yixing_chuxian", "005_yixing_xunhuan"];
                starAniIndex = [4, 5];
            }
            else if (zj.Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_2) {
                starAniName = ["006_erxing_chuxian", "007_erxing_xunhuan"];
                starAniIndex = [6, 7];
            }
            else if (zj.Game.PlayerBattleSystem.multiResultInfo.battleStar == message.EBattleStar.BATTLE_STAR_3) {
                starAniName = ["008_sanxing_chuxian", "009_sanxing_xunhuan"];
                starAniIndex = [8, 9];
            }
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(boardAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(boardAniName[0], 1);
                armatureDisplay.x = thisOne.NodeBoard.width / 2;
                armatureDisplay.y = thisOne.NodeBoard.height / 2;
                thisOne.NodeBoard.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(starAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(starAniName[0], 1);
                armatureDisplay.x = thisOne.NodeStar.width / 2;
                armatureDisplay.y = thisOne.NodeStar.height / 2;
                thisOne.NodeStar.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "ui_tongyong_jiesuan", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                //     armatureDisplay.animation.reset();
                //     armatureDisplay.armature.dispose();
                //     armatureDisplay.dbClear();
                //     armatureDisplay.dispose(true);
                //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(winAniName[1], 0);
                }, thisOne);
                armatureDisplay.animation.play(winAniName[0], 1);
                armatureDisplay.x = thisOne.NodeWin.width / 2;
                armatureDisplay.y = thisOne.NodeWin.height / 2;
                thisOne.NodeWin.addChild(armatureDisplay);
            });
        };
        BattleSettleWin.prototype.UpdateDrop = function (tick) {
        };
        return BattleSettleWin;
    }(zj.BattleSettle));
    zj.BattleSettleWin = BattleSettleWin;
    __reflect(BattleSettleWin.prototype, "zj.BattleSettleWin");
})(zj || (zj = {}));
//# sourceMappingURL=BattleSettleWin.js.map