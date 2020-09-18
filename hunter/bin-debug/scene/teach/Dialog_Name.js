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
     * 起战队名Dialog
     * created by LianLei
     * 2019.04.22
     */
    var Dialog_Name = (function (_super) {
        __extends(Dialog_Name, _super);
        function Dialog_Name() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/teach/Dialog_NameSkin.exml";
            _this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRand, _this);
            _this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            _this.editBoxContent.addEventListener(egret.FocusEvent.FOCUS_OUT, _this.EditBoxContent, _this);
            _this.init();
            return _this;
        }
        Dialog_Name.prototype.init = function () {
            this.editRet = "";
            this.editBoxContent.prompt = zj.LANG("长度不可超过六个字");
            this.editBoxContent.textColor = 0x470707;
            this.editBoxContent.promptColor = 0x470707;
        };
        Dialog_Name.prototype.EditBoxContent = function () {
            this.editRet = this.editBoxContent.text;
        };
        Dialog_Name.prototype.onBtnRand = function () {
            this.editRet = this.getRandName();
            this.editBoxContent.text = this.editRet;
        };
        Dialog_Name.prototype.getRandName = function () {
            var tableFamilyName = zj.TableClientRandomFamilyName.Table();
            var tableName = zj.TableClientRandomName.Table();
            var name1 = this.GetRandItem(tableFamilyName).family_name;
            var name2 = this.GetRandItem(tableName).name;
            var nameFinal = name1 + name2;
            return nameFinal;
        };
        Dialog_Name.prototype.GetRandItem = function (tbl) {
            var total = [];
            var length = zj.Game.PlayerMissionSystem.tableLength(tbl);
            for (var i = 0; i < length; i++) {
                total.push(tbl[i]);
            }
            var randNum = zj.Helper.Rand(length);
            var rowNum = (randNum % total.length) + 1;
            return total[rowNum];
        };
        Dialog_Name.prototype.onBtnOk = function () {
            var _this = this;
            // let re = /^[A-Za-z0-9#]{1,}$/;
            // if (!re.test(this.textContent.text)) { 
            // 	console.log(!re.test(this.textContent.text));
            // }
            zj.Game.TeachSystem.ModifyRoleName_Req(this.editRet)
                .then(function (value) {
                zj.Teach.addTeaching();
                _this.close();
            })
                .catch(function (reason) {
            });
        };
        return Dialog_Name;
    }(zj.Dialog));
    zj.Dialog_Name = Dialog_Name;
    __reflect(Dialog_Name.prototype, "zj.Dialog_Name");
})(zj || (zj = {}));
//# sourceMappingURL=Dialog_Name.js.map