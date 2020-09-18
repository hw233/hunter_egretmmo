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
    // lizhengqiang
    // 20190212
    var LeagueMatchSelectDefenceFormationItemIR = (function (_super) {
        __extends(LeagueMatchSelectDefenceFormationItemIR, _super);
        function LeagueMatchSelectDefenceFormationItemIR() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchSelectDefenceFormationItemIR"], null);
            _this.btnClickA.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClickA, _this);
            return _this;
        }
        LeagueMatchSelectDefenceFormationItemIR.prototype.dataChanged = function () {
            this.id = this.data.i;
            this.info = this.data.info;
            this.bLeft = this.data.bLeft;
            this.bTouch = this.data.bTouch;
            this.setInfoOther();
            this.setInfoList();
            this.btnClickA.currentState = "up";
            if (this.bLeft) {
                if (this.selected) {
                    this.btnClickA.currentState = "down";
                }
            }
            else {
                if (this.bTouch && this.selected) {
                    this.btnClickA.currentState = "down";
                }
            }
        };
        LeagueMatchSelectDefenceFormationItemIR.prototype.setInfoOther = function () {
            if (this.info) {
                if (this.info.member_id != 0) {
                    this.lbName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Match.teamName, this.info.name, this.info.formationIndex);
                }
                else {
                    this.lbName.text = zj.TextsConfig.TextsConfig_Match.no;
                }
                if (!this.bLeft) {
                    this.lbNumber.visible = true;
                    this.lbNumber.text = this.id.toString();
                }
                else {
                    this.lbNumber.visible = false;
                }
            }
        };
        LeagueMatchSelectDefenceFormationItemIR.prototype.setInfoList = function () {
            var formation = {};
            for (var i = 1; i <= 4; i++) {
                if (this.info.formations.generals[i - 1] == null) {
                    var generalInfo = new message.GeneralSimpleInfo();
                    formation[i] = generalInfo;
                }
                else {
                    formation[i] = this.info.formations.generals[i - 1];
                }
            }
            var bShowAdd = zj.PlayerLeagueSystem.FormationShowAdd(formation);
            var arrCollection = new eui.ArrayCollection();
            for (var v in formation) {
                arrCollection.addItem({ generalInfo: formation[v], bShowAdd: bShowAdd[v] });
            }
            this.lstFormateA.itemRenderer = zj.LeagueMatchSelectDefenceFormationItemBIR;
            this.lstFormateA.dataProvider = arrCollection;
        };
        LeagueMatchSelectDefenceFormationItemIR.prototype.onBtnClickA = function () {
        };
        return LeagueMatchSelectDefenceFormationItemIR;
    }(eui.ItemRenderer));
    zj.LeagueMatchSelectDefenceFormationItemIR = LeagueMatchSelectDefenceFormationItemIR;
    __reflect(LeagueMatchSelectDefenceFormationItemIR.prototype, "zj.LeagueMatchSelectDefenceFormationItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchSelectDefenceFormationItemIR.js.map