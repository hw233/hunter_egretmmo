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
    //LeagueBossFightingIncertive
    //yuqingchao
    //2019.03.08
    var LeagueBossFightingIncertive = (function (_super) {
        __extends(LeagueBossFightingIncertive, _super);
        function LeagueBossFightingIncertive() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBossFightingIncertiveSkin.exml";
            return _this;
        }
        LeagueBossFightingIncertive.prototype.dataChanged = function () {
            var i = this.data.i;
            var info = this.data.info;
            var buffDes = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.buff + ".json"); //buff
            this.lbTip.text = buffDes[info].buff_des;
            this.lbTitle.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_buff, i + 1);
        };
        return LeagueBossFightingIncertive;
    }(eui.ItemRenderer));
    zj.LeagueBossFightingIncertive = LeagueBossFightingIncertive;
    __reflect(LeagueBossFightingIncertive.prototype, "zj.LeagueBossFightingIncertive");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossFightingIncertive.js.map