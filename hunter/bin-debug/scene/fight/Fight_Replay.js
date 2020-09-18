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
    var Fight_Replay = (function (_super) {
        __extends(Fight_Replay, _super);
        function Fight_Replay() {
            var _this = _super.call(this) || this;
            _this.stopChannelTag = false;
            _this.winSubUi = null;
            _this.loseSubUi = null;
            _this.bTag = false;
            _this.tblFlags = [];
            _this.tblWords = [];
            _this.tblStates = [];
            _this.skinName = "resource/skins/fight/Fight_SingleSkin.exml";
            return _this;
        }
        Fight_Replay.prototype.Init = function () {
            // this.tblFlags = [this.SpritFlag1, this.SpritFlag2, this.SpritFlag3];
            // this.tblWords = [this.SpritWord1, this.SpritWord2, this.SpritWord3];
            // this.tblStates = [];
            // this.update = egret.setInterval(this.Update,this,0);
            // this.DealUi();
            // if(this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT
            // || this.battleType == message.EFormationType.FORMATION_TYPE_CRAFT_ATTACK
            // ){
            // 	this.saveSpriteState();
            // 	this.FreshFlag();
            // }else{
            // 	this.LayerContend
            // }
        };
        return Fight_Replay;
    }(zj.UI));
    zj.Fight_Replay = Fight_Replay;
    __reflect(Fight_Replay.prototype, "zj.Fight_Replay");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_Replay.js.map