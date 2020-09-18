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
    //传记
    //yuqingchao
    //2019.04.17
    var Biographyinfo = (function (_super) {
        __extends(Biographyinfo, _super);
        function Biographyinfo() {
            var _this = _super.call(this) || this;
            _this.generalId = 0;
            _this.skinName = "resource/skins/biography/BiographyinfoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showDessSkill, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                // this.father = null;
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showDessSkill, _this);
            }, null);
            return _this;
        }
        Biographyinfo.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
            if (this.callBack) {
                this.callBack();
            }
        };
        Biographyinfo.prototype.init = function (info, cb) {
            this.callBack = cb;
            this.info = info;
            this.generalId = info.general_id;
            this.setHeroTop();
            this.setHeroSkill();
        };
        Biographyinfo.prototype.setHeroTop = function () {
            var pathHead = zj.PlayerHunterSystem.Head(this.generalId);
            this.imgHero.source = zj.cachekey(pathHead, this);
            this.imgQuality.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[zj.PlayerHunterSystem.Table(this.generalId).aptitude], this);
            this.imgName.source = zj.cachekey(this.info.name_path, this);
            this.imgSeries.source = zj.cachekey(this.info.general_series, this);
            this.imgType.source = zj.cachekey(this.info.general_type_path, this);
            this.lbStory.text = this.info.general_story;
            var len = zj.PlayerHunterSystem.Table(this.generalId).position.length;
            for (var i = 0; i < 4; i++) {
                if (i < zj.PlayerHunterSystem.Table(this.generalId).position.length) {
                    var tion = zj.PlayerHunterSystem.Table(this.generalId).position;
                    var p = zj.UIConfig.UIConfig_Comment.position[zj.PlayerHunterSystem.Table(this.generalId).position[i]];
                    this["imgType" + (i + 1)].visible = true;
                    this["imgType" + (i + 1)].source = zj.cachekey(zj.UIConfig.UIConfig_Comment.position[zj.PlayerHunterSystem.Table(this.generalId).position[i] - 1], this);
                }
                else {
                    this["imgType" + (i + 1)].visible = false;
                }
            }
        };
        Biographyinfo.prototype.setHeroSkill = function () {
            var genTbl = zj.PlayerHunterSystem.Table(this.generalId);
            this.arrayCollection = new eui.ArrayCollection();
            for (var k in genTbl.skill_ids) {
                var v = genTbl.skill_ids[k];
                this.arrayCollection.addItem({
                    index: Number(k),
                    id: this.generalId,
                    skillId: v,
                });
            }
            if (genTbl.init_passive[0] != 0) {
                this.arrayCollection.addItem({
                    index: 2,
                    id: this.generalId,
                    skillId: genTbl.init_passive[0]
                });
            }
            if (genTbl.awake_passive != 0) {
                this.arrayCollection.addItem({
                    index: 3,
                    id: this.generalId,
                    skillId: genTbl.awake_passive,
                    father: this
                });
            }
            this.lstHunterSkill.dataProvider = this.arrayCollection;
            this.lstHunterSkill.itemRenderer = zj.BiographyDontGetParTherItem;
        };
        Biographyinfo.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
            var skill = this.getChildByName("groupAwakenSkillInfoDialog");
            if (skill) {
                this.removeChild(skill);
            }
        };
        Biographyinfo.prototype.showDessSkill = function (ev) {
            var show;
            if (ev.data.index == 2 || ev.data.index == 3) {
                show = zj.TipManager.ShowInfoLevelSkill(ev.data.talentId, ev.data.generalId, ev.data.index, ev.data.level, this, ev.data.xy, ev.data.cx, ev.data.cy, true);
            }
            else {
                show = zj.TipManager.ShowDesSkill(ev.data.skillId, ev.data.index, ev.data.level, this, ev.data.xy, ev.data.cx, ev.data.cy);
            }
            show.name = "details";
            this.addChild(show);
        };
        return Biographyinfo;
    }(zj.Dialog));
    zj.Biographyinfo = Biographyinfo;
    __reflect(Biographyinfo.prototype, "zj.Biographyinfo");
})(zj || (zj = {}));
//# sourceMappingURL=Biographyinfo.js.map