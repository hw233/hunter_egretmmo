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
    //管理公会的list
    //yuqingchao
    //2018.12.6
    var LeagueMainMemberltem = (function (_super) {
        __extends(LeagueMainMemberltem, _super);
        function LeagueMainMemberltem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueMainMemberltemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueMainMemberltem"], null);
            _this.imgSpriteBarExp.mask = _this.imgBarExpMask;
            return _this;
        }
        LeagueMainMemberltem.prototype.dataChanged = function () {
            zj.closeCache(this.groupMain);
            this.imgTrue.visible = false;
            var i = this.data.i;
            var mem = this.data.mem;
            this.imgUserFrame.source = zj.cachekey(zj.TableItemPicFrame.Item(mem.monarchbase.picFrameId).path, this);
            this.imgUserHead.source = zj.cachekey(zj.TableItemPic.Item(mem.monarchbase.picId).path, this);
            //职位判定
            if (mem.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {
                this.imgText.visible = false;
            }
            else {
                this.imgText.visible = true;
                this.imgText.source = zj.cachekey(zj.UIConfig.UIConfig_League.official[mem.officialId - 1], this); //职位图片
            }
            this.lbTextLevel.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.levelDes, mem.monarchbase.level.toString());
            this.lbName.text = mem.monarchbase.name;
            this.imgTrue.visible = this.selected;
            this.lbTextProgress.text = mem.enliven_seven + "/" + zj.CommonConfig.league_active_day_max * 7;
            var perect = mem.enliven_seven / (zj.CommonConfig.league_active_day_max * 7);
            this.imgBarExpMask.x = this.imgSpriteBarExp.x - this.imgBarExpMask.width + this.imgBarExpMask.width * perect;
            //登陆时间判定
            var des = "";
            if (mem.monarchbase.is_online == true) {
                des = zj.TextsConfig.TextsConfig_Time.online;
                this.lbTime.text = des;
                this.lbTime.textColor = zj.ConstantConfig_Common.Color.online; //在线字体颜色
            }
            else {
                var sec = mem.monarchbase.logoutTime; //离线时长
                var ret = 0;
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
                else if (sec > 3600) {
                    ret = Math.floor(sec / 3600);
                    des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.hoursAgo, ret);
                }
                else if (sec > 60) {
                    ret = Math.floor(sec / 60);
                    des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Time.minsAgo, ret);
                }
                else {
                    des = zj.TextsConfig.TextsConfig_Time.justNow;
                }
                this.lbTime.text = des;
                this.lbTime.textColor = zj.ConstantConfig_Common.Color.offline; //离线字体颜色
            }
            zj.setCache(this.groupMain);
        };
        return LeagueMainMemberltem;
    }(eui.ItemRenderer));
    zj.LeagueMainMemberltem = LeagueMainMemberltem;
    __reflect(LeagueMainMemberltem.prototype, "zj.LeagueMainMemberltem");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMainMemberltem.js.map