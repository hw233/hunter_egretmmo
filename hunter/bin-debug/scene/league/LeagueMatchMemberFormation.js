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
    // 公会战-查看详情
    // lizhengqiang
    //  20190212
    var LeagueMatchMemberFormation = (function (_super) {
        __extends(LeagueMatchMemberFormation, _super);
        function LeagueMatchMemberFormation() {
            var _this = _super.call(this) || this;
            _this.rightInfo = [];
            _this.skinName = "resource/skins/league/LeagueMatchMemberFormationSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            return _this;
        }
        LeagueMatchMemberFormation.prototype.setInfo = function (type) {
            var _this = this;
            this.type = type;
            this.setInfoTitle();
            this.setProgress();
            zj.Game.PlayerLeagueSystem.leagueMatchFortress(this.type, false).then(function (resp) {
                for (var i = 0; i < zj.CommonConfig.league_match_fortress_team_num[_this.type - 1]; i++) {
                    if (_this.rightInfo[i] == null) {
                        var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                        info.name = "";
                        info.member_id = 0;
                        info.formationIndex = 0;
                        info.index = _this.type * 100 + (i + 1);
                        _this.rightInfo.push(info);
                    }
                }
                for (var _i = 0, _a = resp.leagueFortress.leagueFortress; _i < _a.length; _i++) {
                    var v = _a[_i];
                    var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                    info.formations = v.simpleFormation;
                    info.member_id = v.memberId;
                    info.name = v.name;
                    info.formationIndex = v.formationIndex;
                    info.index = v.index;
                    var currentId = info.index % 10;
                    if (currentId > zj.CommonConfig.league_match_fortress_team_num[_this.type - 1])
                        continue;
                    _this.rightInfo[currentId - 1] = info;
                }
                _this.rightInfo.sort(function (a, b) {
                    return a.index - b.index;
                });
                _this.setInfoList();
            });
        };
        LeagueMatchMemberFormation.prototype.setProgress = function () {
            var maxHp = zj.PlayerLeagueSystem.GetMaxScore(this.type);
            this.lbName.textColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            this.lbName.text = maxHp + "/" + maxHp;
            this.lbName.stroke = 2;
            this.lbName.strokeColor = zj.Helper.RGBToHex("r:42,g:42,b:42");
            var progress = new eui.Image(zj.UIConfig.UIConfig_League.leaguMatchProgress2);
            this.groupProgress.addChild(progress);
        };
        LeagueMatchMemberFormation.prototype.setInfoTitle = function () {
            var titlePicture = zj.UIConfig.UIConfig_Union.airShipTitle[this.type - 1];
            this.imgFlyTitle.source = zj.cachekey(titlePicture, this);
        };
        LeagueMatchMemberFormation.prototype.setInfoList = function () {
            var arrCollection = new eui.ArrayCollection();
            for (var k in this.rightInfo) {
                arrCollection.addItem({ i: Number(k) + 1, info: this.rightInfo[k], bLeft: false, bTouch: false });
            }
            this.lstView.itemRenderer = zj.LeagueMatchSelectDefenceFormationItemIR;
            this.lstView.dataProvider = arrCollection;
        };
        LeagueMatchMemberFormation.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueMatchMemberFormation;
    }(zj.Dialog));
    zj.LeagueMatchMemberFormation = LeagueMatchMemberFormation;
    __reflect(LeagueMatchMemberFormation.prototype, "zj.LeagueMatchMemberFormation");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchMemberFormation.js.map