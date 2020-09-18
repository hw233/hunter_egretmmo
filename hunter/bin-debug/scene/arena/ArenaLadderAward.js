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
     * @date 2019-1-25
     *
     * @class 奖励说明界面
     */
    var ArenaLadderAward = (function (_super) {
        __extends(ArenaLadderAward, _super);
        function ArenaLadderAward() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/ArenaLadderAwardSkin.exml";
            _this.init();
            return _this;
        }
        ArenaLadderAward.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.awardUp, this);
            this.labelRushTime.text = zj.TextsConfig.TextsConfig_Arena.final;
            this.labelRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Arena.myRank, zj.Game.PlayerInfoSystem.BaseInfo.ladderRank);
            this.loadAwardList();
        };
        ArenaLadderAward.prototype.loadAwardList = function () {
            var scoreTbl = zj.TableLadderScore.Table();
            var array = new eui.ArrayCollection();
            for (var i = 0; i < 7; i++) {
                var data = new zj.ArenaLadderAwardItemData();
                data.info = scoreTbl[i + 1];
                data.father = this;
                array.addItem(data);
            }
            this.listAward.dataProvider = array;
            this.listAward.itemRenderer = zj.ArenaLadderAwardItem;
            zj.setCache(this.groupCache);
        };
        /**奖励详情 */
        ArenaLadderAward.prototype.awardParticulars = function (xy, cx, cy, info) {
            var commonDesSkill = zj.TipManager.ShowProp(info, this, xy, cx, cy);
            commonDesSkill.name = "UI";
            this.addChild(commonDesSkill);
        };
        /**抬起移除奖励详情界面 */
        ArenaLadderAward.prototype.awardUp = function () {
            var ui = this.getChildByName("UI");
            if (ui) {
                this.removeChild(ui);
            }
        };
        ArenaLadderAward.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ArenaLadderAward;
    }(zj.Dialog));
    zj.ArenaLadderAward = ArenaLadderAward;
    __reflect(ArenaLadderAward.prototype, "zj.ArenaLadderAward");
})(zj || (zj = {}));
//# sourceMappingURL=ArenaLadderAward.js.map