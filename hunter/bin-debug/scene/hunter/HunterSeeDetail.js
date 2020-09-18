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
    /**猎人详情
     *xingliwei
     *2018.12.18
     * @class HunterSeeDetail
     */
    var HunterSeeDetail = (function (_super) {
        __extends(HunterSeeDetail, _super);
        function HunterSeeDetail() {
            var _this = _super.call(this) || this;
            /**猎人ID */
            _this.generalId = 0;
            _this.skinName = "resource/skins/hunter/HunterSeeDetailSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            _this.init();
            return _this;
        }
        HunterSeeDetail.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
        };
        HunterSeeDetail.prototype.setInfo = function (generalId, cb) {
            this.generalId = generalId;
            this.callback = cb;
            this.loadData();
            this.listInfo();
        };
        /**加载各属性数据*/
        HunterSeeDetail.prototype.loadData = function () {
            var gen = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            if (gen == null || this.generalId < 100000) {
                gen = new message.GeneralInfo();
                gen.general_id = this.generalId;
                gen.star = zj.PlayerHunterSystem.Table(this.generalId).init_star;
                gen.level = 1;
                gen.step = 0;
                gen.awakePassive.level = 1;
            }
            var info = zj.PlayerHunterSystem.HXHCalcGelBaseAttrToShow(gen)[0];
            for (var i = 0; i < zj.TableEnum.EnumHunterAttriShow.length; i++) {
                var vv = zj.TableEnum.EnumHunterAttriShow[i];
                var str = String(Math.ceil(info[vv - 1]));
                if (Number(i + 1) > 4) {
                    str += "%";
                }
                var labelAttri = this.groupInfo.getChildByName("labelAttri" + (Number(i) + 1));
                labelAttri.text = String(str);
            }
        };
        HunterSeeDetail.prototype.listInfo = function () {
            var genTable = zj.PlayerHunterSystem.Table(this.generalId);
            var array = new eui.ArrayCollection();
            for (var kk in genTable.skill_ids) {
                if (genTable.skill_ids.hasOwnProperty(kk)) {
                    var vv = genTable.skill_ids[kk];
                    var data = new zj.HunterSeeDetailItemData();
                    data.index = Number(kk);
                    data.generalId = this.generalId;
                    data.skillId = vv;
                    data.fatherDetail = this;
                    array.addItem(data);
                }
            }
            if (genTable.init_passive[0] != 0) {
                var data = new zj.HunterSeeDetailItemData();
                data.index = 2;
                data.generalId = this.generalId;
                data.skillId = genTable.init_passive[0];
                data.fatherDetail = this;
                array.addItem(data);
            }
            if (genTable.awake_passive != 0) {
                var data = new zj.HunterSeeDetailItemData();
                data.index = 3;
                data.generalId = this.generalId;
                data.skillId = genTable.awake_passive;
                data.fatherDetail = this;
                array.addItem(data);
            }
            this.listHunterSkill.dataProvider = array;
            this.listHunterSkill.itemRenderer = zj.HunterSeeDetailItem;
        };
        HunterSeeDetail.prototype.subitemClick = function (vis, data) {
            var _this = this;
            var ui = this.getChildByName("UI_Common_DesSkill");
            if (ui) {
                return;
            }
            zj.loadUI(zj.Common_DesSkill)
                .then(function (dialog) {
                dialog.name = "UI_Common_DesSkill";
                dialog.x = _this.father.x + 100 * data.index;
                dialog.y = _this.father.y + _this.groupList.y - dialog.height + 20;
                if (data.index == 2 || data.index == 3) {
                    // this.commonDesSkill.setInfoLevelSkill(data.skillId, data.generalId, data.index, 0);
                    dialog.setInfoTalent(data.skillId, data.index);
                }
                else {
                    dialog.setInfoSkill(data.skillId, data.index, 1);
                }
                _this.addChild(dialog);
            });
        };
        HunterSeeDetail.prototype.up = function () {
            var ui = this.getChildByName("UI_Common_DesSkill");
            if (ui) {
                this.removeChild(ui);
            }
        };
        /**关闭弹窗 */
        HunterSeeDetail.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterSeeDetail;
    }(zj.Dialog));
    zj.HunterSeeDetail = HunterSeeDetail;
    __reflect(HunterSeeDetail.prototype, "zj.HunterSeeDetail");
})(zj || (zj = {}));
//# sourceMappingURL=HunterSeeDetail.js.map