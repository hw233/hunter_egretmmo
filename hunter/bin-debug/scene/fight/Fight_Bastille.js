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
    var Fight_Bastille = (function (_super) {
        __extends(Fight_Bastille, _super);
        function Fight_Bastille() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.totalDamage = 0;
            _this.maxCombo = 0;
            _this.rewardAdd = 0;
            _this.formation = {};
            _this.tblDamage = {};
            _this.tblMaxCombo = {};
            _this.addMax = -1;
            _this.uiCombo = 0;
            _this.uiDamage = zj.Helper.StringFormat("%d", 0);
            _this.uiNumberScale = 1.0;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            return _this;
        }
        Fight_Bastille.prototype.Init = function () {
            //this.update = egret.setInterval(this.Update,this,0);
            this.LoadTable();
            this.LoadData();
            this.HandleUi();
        };
        Fight_Bastille.prototype.LoadTable = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            var tableInstance = zj.TableInstanceVillage.Table();
            this.tblDamage = tableInstance[scene.instanceId].total_damage;
            this.tblMaxCombo = tableInstance[scene.instanceId].max_combo;
            this.addMax = tableInstance[scene.instanceId].add_max;
            if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_MONEY) {
                this.baseCount = tableInstance[scene.instanceId].goodses[0][1];
            }
            else if (zj.Game.PlayerInstanceSystem.curInstanceType == message.EFormationType.FORMATION_TYPE_INSTANCE_EXP) {
                var exp_id = tableInstance[scene.instanceId].goodses[0][0];
                var exp_count = tableInstance[scene.instanceId].goodses[0][1];
                var obj = zj.PlayerItemSystem.Item(exp_id);
                this.baseCount = obj["general_exp"] * exp_count;
            }
        };
        Fight_Bastille.prototype.LoadData = function () {
            var scene = zj.StageSceneManager.Instance.GetCurScene();
            this.formation = zj.Game.PlayerFormationSystem.curFormations[scene.formationType];
        };
        Fight_Bastille.prototype.HandleUi = function () {
            //伤害转转钱
            // if(Game.PlayerInstanceSystem.curInstanceType == message.EInstanceType.MONEY){
            // 	this.LabelTitle1st:setString(TextsConfig_Bastille.btl_total_damage)
            // 	local tmp = getMillionNum(self.baseCount)
            // 	self.LabelBase:setString(tmp..TextsConfig_Bastille.btl_money)
            // }
        };
        return Fight_Bastille;
    }(zj.UI));
    zj.Fight_Bastille = Fight_Bastille;
    __reflect(Fight_Bastille.prototype, "zj.Fight_Bastille");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Bastille.js.map