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
     * @date 2019-4-15
     *
     * @class 结算伤害统计界面子界面右
     */
    var BattleEnd_StastPopItemEnemy = (function (_super) {
        __extends(BattleEnd_StastPopItemEnemy, _super);
        function BattleEnd_StastPopItemEnemy() {
            var _this = _super.call(this) || this;
            _this.vis = true;
            _this.skinName = "resource/skins/battleEnd/BattleEnd_StastPopItemEnemySkin.exml";
            zj.cachekeys(zj.UIResource["BattleEnd_StastPopItemEnemy"], null);
            _this.update = egret.setInterval(_this.Update, _this, 0, 1 / 60);
            zj.BattleSettle.updates.push(_this.update);
            _this.SetItemVisble(false);
            _this.SpriteBestOpp.alpha = 0;
            _this.SpriteHurt.mask = _this.SpriteHurtBar;
            _this.SpriteRecover.mask = _this.SpriteRecoverBar;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, _this);
            return _this;
        }
        BattleEnd_StastPopItemEnemy.prototype.dataChanged = function () {
            var data = this.data;
            if (this.data.time < 2) {
                this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
                zj.BattleSettle.updates.push(this.update);
            }
            this.data.maxValue = Math.floor(data.maxValue);
            this.data.maxHurtValue = Math.floor(data.itemInfo.totalDamage);
            this.data.maxRecoverValue = Math.floor(data.itemInfo.recoverValue);
            this.DealProgress(data);
            this.DealSpeed();
            this.SetGeneralInfo(data);
            this.Playering();
            if (data.indexvis == data.index) {
                this.SpriteBestOpp.alpha = 1;
                // egret.Tween.get(this.SpriteBestOpp).to({ alpha: 1 }, 1000);			
            }
            else {
                this.SpriteBestOpp.alpha = 0;
            }
            this.SpriteHurtBar.width = 133 * this.data.scale / 100;
            this.SpriteRecoverBar.width = 133 * this.data.scale1 / 100;
            this.LabelHurtNum.text = data.num.toString();
            this.LabelRecoverNum.text = data.num1.toString(); // this.data.maxRecoverValue.toString();
        };
        BattleEnd_StastPopItemEnemy.prototype.DealProgress = function (data) {
            // let 
            // this.SpriteHurt.visible = false;
            // this.SpriteRecover.visible = false;
            var percent = zj.yuan3(this.data.maxValue == 0, 0, this.data.curHurtValue / this.data.maxValue * 100);
        };
        BattleEnd_StastPopItemEnemy.prototype.DealSpeed = function () {
            this.data.addHurt = Math.floor(this.data.maxValue * zj.ConstantConfig_BattleSettle.hurtPipeTick / zj.ConstantConfig_BattleSettle.hurtPipeTime);
            if (this.data.addHurt <= 0) {
                this.data.addHurt = 1;
            }
            this.data.addRecover = this.data.addHurt;
        };
        BattleEnd_StastPopItemEnemy.prototype.SetGeneralInfo = function (data) {
            var headPath = null;
            var bossTag = false;
            var battleType = zj.Game.PlayerBattleSystem.multiResultInfo.battleType;
            if (battleType == message.EFormationType.FORMATION_TYPE_LADDER_ATTACK
                || battleType == message.EFormationType.FORMATION_TYPE_MATCH_ATTACK
                || battleType == message.EFormationType.FORMATION_TYPE_PVP_SIMPLE) {
                headPath = zj.PlayerHunterSystem.Head(data.itemInfo.generalInfo);
            }
            else {
                headPath = zj.Game.PlayerStageSystem.fromMonster(data.itemInfo.generalInfo.general_id).head_path;
                var type = zj.Game.PlayerMobSystem.Instance(data.itemInfo.generalInfo.general_id).role_type;
            }
            this.SpriteHead.source = zj.cachekey(headPath, this);
            this.SpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.itemInfo.generalInfo.step - 1], this);
            this.LabelLevel.text = data.itemInfo.generalInfo.level.toString();
            this.SpriteStar.visible = false;
            if (data.itemInfo.generalInfo.star > 0 && data.itemInfo.generalInfo.star <= zj.Game.PlayerMissionSystem.tableLength(zj.UIConfig.UIConfig_Role.heroStar)) {
                zj.Helper.SetHeroAwakenStar(this.NodeStar, data.itemInfo.generalInfo.star, 0);
            }
            else {
                this.NodeStar.visible = false;
            }
        };
        BattleEnd_StastPopItemEnemy.prototype.Update = function (dt) {
            if (this.data.bStart == false) {
                return;
            }
            this.data.hurtTick += dt * 1000;
            if (this.data.hurtEnd == false) {
                if (this.data.hurtTick >= zj.ConstantConfig_BattleSettle.hurtPipeTick) {
                    this.data.hurtTick -= zj.ConstantConfig_BattleSettle.hurtPipeTick;
                    var addValue = this.data.addHurt;
                    var tmp = this.data.curHurtValue + addValue;
                    if (tmp >= this.data.maxHurtValue) {
                        addValue = this.data.maxHurtValue - this.data.curHurtValue;
                        this.data.hurtEnd = true;
                        this.data.time++;
                    }
                    this.data.curHurtValue += addValue;
                    this.data.num = this.data.curHurtValue;
                    this.LabelHurtNum.text = this.data.curHurtValue.toString();
                }
            }
            this.data.recoverTick += dt * 1000;
            if (this.data.recoverEnd == false) {
                if (this.data.recoverTick >= zj.ConstantConfig_BattleSettle.hurtPipeTick) {
                    this.data.recoverTick -= zj.ConstantConfig_BattleSettle.hurtPipeTick;
                    var addValue = this.data.addRecover;
                    var tmp = this.data.curRecoverValue + addValue;
                    if (tmp >= this.data.maxRecoverValue) {
                        addValue = this.data.maxRecoverValue - this.data.curRecoverValue;
                        this.data.recoverEnd = true;
                        this.data.time++;
                    }
                    this.data.curRecoverValue += addValue;
                    this.data.num1 = this.data.curRecoverValue;
                    this.LabelRecoverNum.text = this.data.curRecoverValue.toString();
                }
            }
            this.setProgress();
            if (this.data.time >= 2) {
                egret.clearInterval(this.update);
            }
            if (this.data.recoverEnd == true && this.data.hurtEnd == true && this.data.bMapPlay == false && this.data.tag == true) {
                this.data.bMapPlay = true;
                this.PlayerMvpEffect();
            }
        };
        BattleEnd_StastPopItemEnemy.prototype.PlayerMvpEffect = function () {
            // let 
        };
        BattleEnd_StastPopItemEnemy.prototype.setProgress = function () {
            this.data.scale = zj.yuan3(this.data.maxValue == 0, 0, this.data.curHurtValue / this.data.maxValue * 100);
            this.data.scale1 = zj.yuan3(this.data.maxValue == 0, 0, this.data.curRecoverValue / this.data.maxValue * 100);
            this.SpriteHurtBar.width = 133 * this.data.scale / 100;
            this.SpriteRecoverBar.width = 133 * this.data.scale1 / 100;
        };
        BattleEnd_StastPopItemEnemy.prototype.SetItemVisble = function (tag) {
            this.SpriteHurtBoard.visible = tag;
            this.SpriteRecoverBoard.visible = tag;
            this.LabelHurtNum.text = "0";
            this.LabelHurtNum.visible = tag;
            this.LabelRecoverNum.text = "0";
            this.LabelRecoverNum.visible = tag;
        };
        BattleEnd_StastPopItemEnemy.prototype.Playering = function () {
            this.SetItemVisble(true);
            this.data.bStart = true;
        };
        return BattleEnd_StastPopItemEnemy;
    }(eui.ItemRenderer));
    zj.BattleEnd_StastPopItemEnemy = BattleEnd_StastPopItemEnemy;
    __reflect(BattleEnd_StastPopItemEnemy.prototype, "zj.BattleEnd_StastPopItemEnemy");
    var BattleEnd_StastPopItemEnemyData = (function () {
        function BattleEnd_StastPopItemEnemyData() {
            this.scale = 0;
            this.scale1 = 0;
            this.num = -1;
            this.num1 = -1;
            this.maxHurtValue = 0;
            this.maxRecoverValue = 0;
            this.curHurtValue = 0;
            this.addHurt = 0;
            this.addRecover = 0;
            this.bStart = false;
            this.hurtTick = 0;
            this.hurtEnd = false;
            this.recoverTick = 0;
            this.recoverEnd = false;
            this.curRecoverValue = 0;
            this.bMapPlay = false;
            this.time = 0;
        }
        return BattleEnd_StastPopItemEnemyData;
    }());
    zj.BattleEnd_StastPopItemEnemyData = BattleEnd_StastPopItemEnemyData;
    __reflect(BattleEnd_StastPopItemEnemyData.prototype, "zj.BattleEnd_StastPopItemEnemyData");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_StastPopItemEnemy.js.map