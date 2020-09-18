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
    //BiographyDontGetParTherItem
    //yuqingchao
    //2019.04.18
    var BiographyDontGetParTherItem = (function (_super) {
        __extends(BiographyDontGetParTherItem, _super);
        function BiographyDontGetParTherItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.id = 0;
            _this.skillId = 0;
            _this.goodsId = null;
            _this.count = null;
            _this.skinName = "resource/skins/hunter/HunterDontGetParTnerItemSkin.exml";
            zj.cachekeys(zj.UIResource["BiographyDontGetParTherItem"], null);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowDessSkill, _this);
            return _this;
        }
        BiographyDontGetParTherItem.prototype.dataChanged = function () {
            this.index = this.data.index;
            this.id = this.data.id;
            this.skillId = this.data.skillId;
            this.father = this.data.father;
            this.setUI();
        };
        BiographyDontGetParTherItem.prototype.setUI = function () {
            var tbl = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.baseTalent + ".json"); //读表
            var tblGen = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.baseSkill + ".json"); //读表
            if (this.index == 2) {
                this.imgspriteIcon.source = zj.cachekey(tbl[this.skillId].path, this);
                this.goodsId = tbl[this.skillId].talent_id;
            }
            else if (this.index == 3) {
                this.imgspriteIcon.source = zj.cachekey(tbl[this.skillId].path, this);
                this.goodsId = tbl[this.skillId].talent_id;
            }
            else {
                this.imgspriteIcon.source = zj.cachekey(tblGen[this.skillId].path, this);
                this.goodsId = tblGen[this.skillId].skill_id;
            }
        };
        BiographyDontGetParTherItem.prototype.onShowDessSkill = function (e) {
            if (this.index == 2 || this.index == 3) {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { talentId: this.goodsId, generalId: this.id, index: this.index, level: 1, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
            else {
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { skillId: this.goodsId, index: this.index, level: 1, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }
        };
        BiographyDontGetParTherItem.prototype.onShowAwakenSkillInfo = function () {
            var _this = this;
            if (this.index == 2 || this.index == 3) {
            }
            else {
                zj.loadUI(zj.Common_DesSkill).then(function (dialog) {
                    // let baseGeneralInfo = PlayerHunterSystem.Table(this.goodsId);
                    // let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.id);
                    // let level = hunterInfo.awakePassive.level + 1;
                    // if (hunterInfo.awakePassive.level == 5) {
                    // 	level -= 1;
                    // }
                    dialog.setInfoSkill(_this.goodsId, 1, 1);
                    dialog.name = "groupAwakenSkillInfoDialog";
                    var x = (_this.width - dialog.width) * 0.5;
                    var y = dialog.height;
                    dialog.x = x;
                    dialog.y = y;
                    _this.father.addChild(dialog);
                });
            }
        };
        return BiographyDontGetParTherItem;
    }(eui.ItemRenderer));
    zj.BiographyDontGetParTherItem = BiographyDontGetParTherItem;
    __reflect(BiographyDontGetParTherItem.prototype, "zj.BiographyDontGetParTherItem");
})(zj || (zj = {}));
//# sourceMappingURL=BiographyDontGetParTherItem.js.map