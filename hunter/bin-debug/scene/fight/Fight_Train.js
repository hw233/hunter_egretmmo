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
    var Fight_Train = (function (_super) {
        __extends(Fight_Train, _super);
        function Fight_Train() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.battleResult = message.BattleResultState.BATTLE_RESULT_STATE_NO;
            _this.battleQuality = message.EQuality.QUALITY_NONE;
            _this.battleStar = message.EBattleStar.BATTLE_STAR_NONO;
            _this.skinName = "resource/skins/fight/Fight_Instance.exml";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            return _this;
        }
        Fight_Train.prototype.Init = function () {
            //this.update = egret.setInterval(this.Update,this,0);
            this.LoadTable();
            //this.HandleUi();
        };
        Fight_Train.prototype.LoadTable = function () {
            var index = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].curMobID;
            //let tbl = traindb.Table()
            //let dataTbl = tbl[index]
            // this.combo_total = dataTbl.combo_count;
            // this.combo = this.scene.maxCombo;
        };
        return Fight_Train;
    }(zj.UI));
    zj.Fight_Train = Fight_Train;
    __reflect(Fight_Train.prototype, "zj.Fight_Train");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Train.js.map