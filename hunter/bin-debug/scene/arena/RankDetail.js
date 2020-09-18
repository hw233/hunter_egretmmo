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
     * @author chen xi
     *
     * @date 2019-2-21
     *
     * @class 格斗场 猎人排行 详情
     */
    var RankDetail = (function (_super) {
        __extends(RankDetail, _super);
        function RankDetail() {
            var _this = _super.call(this) || this;
            _this.rankData = null;
            _this.skinName = "resource/skins/arena/RankDetailSkin.exml";
            _this.labelValue.visible = false;
            var tap = egret.TouchEvent.TOUCH_TAP;
            _this.btnClose.addEventListener(tap, _this.onBtnClose, _this);
            _this.btnViewDetail.addEventListener(tap, _this.onBtnViewDetail, _this);
            _this.btnAddFriend.addEventListener(tap, _this.onBtnAddFriend, _this);
            _this.btnAddUnion.addEventListener(tap, _this.onBtnAddUnion, _this);
            _this.btnChat.addEventListener(tap, _this.onBtnChat, _this);
            return _this;
        }
        RankDetail.prototype.setInfo = function (data) {
            this.rankData = data;
            var framePath = zj.PlayerItemSystem.ItemPath(data.picFrameId);
            var iconPath = zj.PlayerItemSystem.ItemPath(data.picId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            this.imgIcon.source = zj.cachekey(iconPath, this);
            this.labelLevel.text = "Lv" + data.level.toString();
            this.labelName.text = data.name.toString();
            if (data.leagueId == 0) {
                this.labelAlly.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.pop_league, zj.TextsConfig.TextsConfig_Common.nothing);
            }
            else {
                this.labelAlly.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.pop_league, data.leagueName);
            }
            var titleForUser = function (id) {
                if (id == 0) {
                    return zj.TextsConfig.TextsConfig_User.text_no_title;
                }
                else {
                    var item = zj.PlayerItemSystem.Item(id);
                    return item ? item.name : "";
                }
            };
            var titleString = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Rank.pop_title, titleForUser(data.titleId));
            this.labelTitle.text = titleString;
            var allySprite = zj.PlayerLeagueSystem.GetSegment(data.matchScore)[4];
            if (allySprite == "ui_union_battle_star11_png") {
                allySprite = "";
            }
            this.imgAlly.source = zj.cachekey(allySprite, this);
        };
        RankDetail.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        RankDetail.prototype.onBtnViewDetail = function () {
            zj.TipManager.ReqRoleInfo(this.rankData.id, this.rankData.group_id);
        };
        RankDetail.prototype.onBtnAddFriend = function () {
            var _this = this;
            zj.TipManager.RelationAdd(this.rankData.id, function () {
                _this.alpha = 0;
                _this.close(zj.UI.HIDE_TRAIL_OFF);
            });
        };
        RankDetail.prototype.onBtnAddUnion = function () {
            zj.TipManager.LeagueApply(this.rankData.leagueId);
        };
        RankDetail.prototype.onBtnChat = function () {
            var _this = this;
            // toast_warning("聊天");
            zj.loadUI(zj.Chat_Main)
                .then(function (dialog) {
                zj.Game.EventManager.event(zj.GameEvent.FRIEND_CHAT, { id: _this.rankData.id, name: _this.rankData.name });
                dialog.show();
            });
        };
        return RankDetail;
    }(zj.Dialog));
    zj.RankDetail = RankDetail;
    __reflect(RankDetail.prototype, "zj.RankDetail");
})(zj || (zj = {}));
//# sourceMappingURL=RankDetail.js.map