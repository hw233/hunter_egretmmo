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
    //战斗记录——防守记录
    //yuqingchao
    //2019.02.27
    var LeagueMatchBattleRecordItem = (function (_super) {
        __extends(LeagueMatchBattleRecordItem, _super);
        function LeagueMatchBattleRecordItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMatchBattleRecordItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMatchBattleRecordItem"], null);
            return _this;
        }
        LeagueMatchBattleRecordItem.prototype.dataChanged = function () {
            this.info = this.data.info;
            this.setInfo();
            this.setInfoUI(1);
            this.setInfoUI(2);
        };
        LeagueMatchBattleRecordItem.prototype.setInfo = function () {
            this.lbFly.textFlow = zj.Util.RichText(zj.TextsConfig.TextsConfig_Match.flyName[Math.floor(Number(this.info.index) / 100) - 1]);
            var ret = 0;
            var sec = this.info.time - Date.parse(zj.Game.Controller.serverNow().toString());
            var des = "";
            if (sec > (3600 * 24) * 365) {
                ret = Math.floor(sec / ((3600 * 24) * 365));
                des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.yearsAgo, ret);
            }
            else if (sec > (3600 * 24) * 30) {
                ret = Math.floor(sec / ((3600 * 24) * 30));
                des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.monsAgo, ret);
            }
            else if (sec > (3600 * 24)) {
                ret = Math.floor(sec / (3600 * 24));
                des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.daysAgo, ret);
            }
            else if (sec > (3600)) {
                ret = Math.floor(sec / 3600);
                des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.hoursAgo, ret);
            }
            else if (sec > (60)) {
                ret = Math.floor(sec / 60);
                des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.minsAgo, ret);
            }
            else {
                des = zj.TextsConfig.TextsConfig_Time.justNow;
            }
            this.lbTime.text = des;
            this.lbTime.textColor = this.lbFly.textColor;
        };
        LeagueMatchBattleRecordItem.prototype.setInfoUI = function (index) {
            if (index == 1) {
                var win = this.info.leftResult[0] ? 0 : 1;
                if (this.info.leftInfo[1] == "0") {
                    this.imgIcon1.visible = false;
                }
                else {
                    this.imgIcon1.source = zj.cachekey(zj.TableItemPic.Item(Number(this.info.leftInfo[1])).path, this);
                }
                if (this.info.leftInfo[2] == "0") {
                    this.imgBoard1.source = zj.cachekey("ui_frame_FrameHunterAsh_png", this);
                }
                else {
                    this.imgBoard1.source = zj.cachekey(zj.TableItemPicFrame.Item(Number(this.info.leftInfo[2])).path, this);
                }
                this.imgWin1.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win[win], this);
                this.lbName1.text = this.info.leftInfo[0];
                var num = this.info.leftResult[1];
                if (num == 1) {
                    this.groupStar1.visible = true;
                    this.groupStar2.visible = false;
                    this.groupStar3.visible = false;
                    this.imgStar1.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else if (num == 2) {
                    this.groupStar1.visible = false;
                    this.groupStar2.visible = true;
                    this.groupStar3.visible = false;
                    this.imgStar2.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar3.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else if (num == 3) {
                    this.groupStar1.visible = false;
                    this.groupStar2.visible = false;
                    this.groupStar3.visible = true;
                    this.imgStar4.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar5.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar6.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else {
                    this.groupStar1.visible = false;
                    this.groupStar2.visible = false;
                    this.groupStar3.visible = false;
                }
            }
            else {
                var win = this.info.rightResult[0] ? 0 : 1;
                if (this.info.rightInfo[1] == "0") {
                    this.imgIcon2.visible = false;
                }
                else {
                    this.imgIcon2.source = zj.cachekey(zj.TableItemPic.Item(Number(this.info.rightInfo[1])).path, this);
                }
                if (this.info.rightInfo[2] == "0") {
                    this.imgBoard2.source = zj.cachekey("ui_frame_FrameHunterAsh_png", this);
                }
                else {
                    this.imgBoard2.source = zj.cachekey(zj.TableItemPicFrame.Item(Number(this.info.rightInfo[2])).path, this);
                }
                this.imgWin2.source = zj.cachekey(zj.UIConfig.UIConfig_Mail.win[win], this);
                this.lbName2.text = this.info.rightInfo[0];
                var num = this.info.rightResult[1];
                if (num == 1) {
                    this.groupStar4.visible = true;
                    this.groupStar5.visible = false;
                    this.groupStar6.visible = false;
                    this.imgStar7.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else if (num == 2) {
                    this.groupStar4.visible = false;
                    this.groupStar5.visible = true;
                    this.groupStar6.visible = false;
                    this.imgStar8.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar9.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else if (num == 3) {
                    this.groupStar4.visible = false;
                    this.groupStar5.visible = false;
                    this.groupStar6.visible = true;
                    this.imgStar10.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar11.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                    this.imgStar12.source = zj.cachekey(zj.UIConfig.UIConfig_Union.star[0], this);
                }
                else {
                    this.groupStar4.visible = false;
                    this.groupStar5.visible = false;
                    this.groupStar6.visible = false;
                }
            }
        };
        return LeagueMatchBattleRecordItem;
    }(eui.ItemRenderer));
    zj.LeagueMatchBattleRecordItem = LeagueMatchBattleRecordItem;
    __reflect(LeagueMatchBattleRecordItem.prototype, "zj.LeagueMatchBattleRecordItem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchBattleRecordItem.js.map