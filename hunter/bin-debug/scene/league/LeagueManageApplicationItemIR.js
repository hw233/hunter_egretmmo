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
    //lizhengqiang
    //20190108
    var LeagueManageApplicationItemIR = (function (_super) {
        __extends(LeagueManageApplicationItemIR, _super);
        function LeagueManageApplicationItemIR() {
            var _this = _super.call(this) || this;
            _this.roleId = 0;
            _this.skinName = "resource/skins/league/LeagueManageApplicationItemIRSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueInstanceViewAwardItemIR"], null);
            _this.btnCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnCheck, _this);
            _this.btnRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRefuse, _this);
            _this.btnAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAgree, _this);
            return _this;
        }
        LeagueManageApplicationItemIR.prototype.dataChanged = function () {
            var index = this.data.index;
            if (index < 0)
                return;
            var applyInfo = zj.Game.PlayerLeagueSystem.Applicants[index];
            this.imgUserFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(applyInfo.monarchbase.picFrameId).path, this); // StringConfig_Table.itemFrame
            this.imgUserIcon.source = zj.cachekey(zj.TableItemPic.Item(applyInfo.monarchbase.picId).path, this); // StringConfig_Table.itemHead
            this.lbName.text = applyInfo.monarchbase.name;
            this.lbLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.levelDes, applyInfo.monarchbase.level);
            this.roleId = applyInfo.monarchbase.id;
        };
        // 查看详情
        LeagueManageApplicationItemIR.prototype.onBtnCheck = function () {
            zj.toast_warning(zj.TextsConfig.TextsConfig_Error.wait);
        };
        // 拒绝
        LeagueManageApplicationItemIR.prototype.onBtnRefuse = function () {
            var _this = this;
            if (this.roleId == 0)
                return;
            zj.Game.PlayerLeagueSystem.leagueApplyDeal([this.roleId], false).then(function () {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, _this.itemIndex);
            });
        };
        // 同意
        LeagueManageApplicationItemIR.prototype.onBtnAgree = function () {
            var _this = this;
            if (this.roleId == 0)
                return;
            zj.Game.PlayerLeagueSystem.leagueApplyDeal([this.roleId], true).then(function () {
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MANAGE_MAIN_REMOVEITEM, _this.itemIndex);
            });
        };
        return LeagueManageApplicationItemIR;
    }(eui.ItemRenderer));
    zj.LeagueManageApplicationItemIR = LeagueManageApplicationItemIR;
    __reflect(LeagueManageApplicationItemIR.prototype, "zj.LeagueManageApplicationItemIR");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueManageApplicationItemIR.js.map