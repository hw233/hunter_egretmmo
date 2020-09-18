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
     * 2019.11.22
     * xingliwei
     * @class 公会技能Item
     */
    var LeagueSkillItem = (function (_super) {
        __extends(LeagueSkillItem, _super);
        function LeagueSkillItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueSkillItemSkin.exml";
            zj.cachekeys(zj.UIResource["LeagueSkillItem"], null);
            _this.imgIcon.mask = _this.imgIconbg;
            return _this;
        }
        LeagueSkillItem.prototype.dataChanged = function () {
            var data = this.data;
            this.labelName.text = data.info[2];
            var a = data.info[1];
            if (data.info[3] == 24) {
                this.labelBonuses.text = "+" + a.toFixed(1);
            }
            else {
                this.labelBonuses.text = "+" + a.toFixed(1) + "%";
            }
            this.imgIcon.source = zj.cachekey(data.father.getimg(data.info[0]), this);
        };
        return LeagueSkillItem;
    }(eui.ItemRenderer));
    zj.LeagueSkillItem = LeagueSkillItem;
    __reflect(LeagueSkillItem.prototype, "zj.LeagueSkillItem");
    var LeagueSkillItemData = (function () {
        function LeagueSkillItemData() {
        }
        return LeagueSkillItemData;
    }());
    zj.LeagueSkillItemData = LeagueSkillItemData;
    __reflect(LeagueSkillItemData.prototype, "zj.LeagueSkillItemData");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueSkillItem.js.map