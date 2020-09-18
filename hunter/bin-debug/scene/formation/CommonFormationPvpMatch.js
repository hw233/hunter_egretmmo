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
    // 防守阵容
    // lizhengqiang
    // 20190312
    var CommonFormationPvpMatch = (function (_super) {
        __extends(CommonFormationPvpMatch, _super);
        function CommonFormationPvpMatch() {
            var _this = _super.call(this, "resource/skins/formation/CommonFormationPvpMatchSkin.exml") || this;
            _this.isAttack = false;
            _this.openIndex = 0;
            _this.currentFormationIndex = 1;
            _this.formations = {};
            _this.generals = [];
            _this.tmpFormation = {};
            _this.cb = function () {
                setTimeout(function () {
                    _this.close(zj.UI.HIDE_TO_TOP);
                    zj.Game.PlayerFormationSystem.formatsMatchDefine = _this.tmpFormation;
                }, 300);
            };
            _this.skinName = "resource/skins/formation/CommonFormationPvpMatchSkin.exml";
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
            _this["btnConfirmTeam"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnConfirmTeam, _this);
            _this["btnTeam1"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam1, _this);
            _this["btnTeam2"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam2, _this);
            _this["btnTeam3"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam3, _this);
            _this["btnTeam4"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam4, _this);
            _this["btnTeam5"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam5, _this);
            _this["btnTeam11"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam11, _this);
            _this["btnTeam21"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam21, _this);
            _this["btnTeam31"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam31, _this);
            _this["btnTeam41"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam41, _this);
            _this["btnTeam51"].addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnTeam51, _this);
            _this.init1();
            return _this;
        }
        CommonFormationPvpMatch.prototype.onAddToStage = function () {
            _super.prototype.onAddToStage.call(this);
        };
        CommonFormationPvpMatch.prototype.getSelectGenIds = function () {
            this.generals = [];
            for (var k in this.formations) {
                for (var _i = 0, _a = this.formations[k]; _i < _a.length; _i++) {
                    var v = _a[_i];
                    this.generals.push(v);
                }
            }
            this.loadList(this.currentFormationIndex);
            return this.generals;
        };
        CommonFormationPvpMatch.prototype.onBtnReturn = function () {
            var _this = this;
            zj.loadUI(zj.ConfirmCancelDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FILL_OUT);
                dialog.setInfo(zj.TextsConfig.TextsConfig_Pk.DoYouGoOut);
                dialog.setCB(_this.cb);
            });
        };
        CommonFormationPvpMatch.prototype.init1 = function () {
            if (this.up["TopLeft0"] != null) {
                this.up["TopLeft0"].visible = false;
            }
            if (this.up["combatNumber"] != null) {
                this.up["combatNumber"].visible = false;
            }
            if (this.up["TopRight1"] != null) {
                this.up["TopRight1"].visible = false;
            }
            if (this.up["TopLeft1"] != null) {
                this.up["TopLeft1"].visible = false;
            }
            if (this.up["restrict10"] != null) {
                this.up["restrict10"].visible = false;
            }
            if (this.up["restrict20"] != null) {
                this.up["restrict20"].visible = false;
            }
            if (this.up["restrict30"] != null) {
                this.up["restrict30"].visible = false;
            }
            if (this.up["censorshipRestrict"] != null) {
                this.up["censorshipRestrict"].visible = false;
            }
            // this["groupDown"].scaleX = 1.05;
            // this["groupDown"].scaleY = 0.85;
            this.LoadScene(39);
            this.tmpFormation = zj.Table.DeepCopy(zj.Game.PlayerFormationSystem.formatsMatchDefine);
            for (var i in this.tmpFormation) {
                var generals = [];
                for (var j in this.tmpFormation[i].generals) {
                    generals.push(new zj.PosState());
                    generals[j].generalId = this.tmpFormation[i].generals[j];
                }
                for (var j in this.tmpFormation[i].supports) {
                    generals.push(new zj.PosState());
                    generals[Number(j) + 4].generalId = this.tmpFormation[i].supports[j];
                    if (generals[j].generalId != 0)
                        generals[Number(j) + 4].state = 1;
                }
                this.formations[i] = generals;
            }
            zj.Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE;
            for (var i = 1; i <= 5; i++) {
                if (zj.Game.PlayerFormationSystem.formatsMatchDefine[i] == null) {
                    var formation = new message.FormationInfo();
                    for (var j = 0; j < 4; j++) {
                        formation.generals.push(0);
                        formation.supports.push(0);
                    }
                    formation.formationType = message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE;
                    formation.formationIndex = i;
                    zj.Game.PlayerFormationSystem.formatsMatchDefine[i] = formation;
                }
                else {
                    for (var j = 0; j < 4; j++) {
                        if (zj.Game.PlayerFormationSystem.formatsMatchDefine[i].generals[j] == null) {
                            zj.Game.PlayerFormationSystem.formatsMatchDefine[i].generals[j] = 0;
                        }
                        if (zj.Game.PlayerFormationSystem.formatsMatchDefine[i].supports[j] == null) {
                            zj.Game.PlayerFormationSystem.formatsMatchDefine[i].supports[j] = 0;
                        }
                    }
                }
            }
            this.openIndex = this.initFormateOpen();
            this.setInfoUIFormateOpen();
        };
        CommonFormationPvpMatch.prototype.setState = function (isAttack) {
            var _this = this;
            if (isAttack === void 0) { isAttack = false; }
            this.isAttack = isAttack;
            zj.Game.PlayerLeagueSystem.leagueMatchQueryFormation().then(function (formationIndex) {
                _this["lbError"].visible = true;
                var _loop_1 = function (i) {
                    var value = zj.Table.FindR(formationIndex, function (k, v) {
                        return v.value == i;
                    });
                    if (value[0] != null) {
                        var str = zj.TextsConfig.TextsConfig_Match.flyName[Math.floor(value[0].key / 100) - 1];
                        _this["lbHunterNum" + i].textFlow = zj.Util.RichText(str);
                    }
                    else {
                        _this["lbHunterNum" + i].text = zj.TextsConfig.TextsConfig_Match.notbSet;
                    }
                    _this.loadList(i);
                };
                for (var i = 1; i <= 5; i++) {
                    _loop_1(i);
                }
                if (_this.isAttack) {
                    for (var _i = 0, formationIndex_1 = formationIndex; _i < formationIndex_1.length; _i++) {
                        var v = formationIndex_1[_i];
                        _this["imgLock" + v.value].visible = true;
                        // ???
                    }
                }
            });
        };
        CommonFormationPvpMatch.prototype.onBtnConfirmTeam = function () {
            this.setFormat();
        };
        CommonFormationPvpMatch.prototype.setFormat = function () {
            var _this = this;
            zj.Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill = this.openIndex;
            var formations = [];
            for (var i in zj.Game.PlayerFormationSystem.formatsMatchDefine) {
                formations.push(zj.Game.PlayerFormationSystem.formatsMatchDefine[i]);
            }
            for (var i in formations) {
                for (var j in formations[i].generals) {
                    if (!this.formations[Number(i) + 1])
                        break;
                    formations[i].generals[j] = this.formations[Number(i) + 1][j].generalId;
                    formations[i].supports[j] = this.formations[Number(i) + 1][Number(j) + 4].generalId;
                }
            }
            zj.Game.PlayerLeagueSystem.setFormation(formations).then(function () {
                zj.toast_success(zj.TextsConfig.TextsConfig_Contend.formationSave);
                _this.close();
                for (var k in formations) {
                    zj.Game.PlayerFormationSystem.formatsMatchDefine[Number(k) + 1] = formations[k];
                }
            });
        };
        CommonFormationPvpMatch.prototype.loadList = function (index) {
            if (!this["lstTeam" + index])
                return;
            var arrCollection = new eui.ArrayCollection();
            for (var i = 0; i < 4; i++) {
                arrCollection.addItem({
                    generalId: this.formations[index] != null ? this.formations[index][3 - i].generalId : this.up.generals[3 - i].generalId
                });
            }
            this["lstTeam" + index].itemRenderer = zj.CommonTeamAddHunterItem;
            this["lstTeam" + index].dataProvider = arrCollection;
        };
        CommonFormationPvpMatch.prototype.onBtnTeam1 = function () {
            this.setInfoButtonClick(1);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam2 = function () {
            this.setInfoButtonClick(2);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam3 = function () {
            this.setInfoButtonClick(3);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam4 = function () {
            this.setInfoButtonClick(4);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam5 = function () {
            this.setInfoButtonClick(5);
        };
        CommonFormationPvpMatch.prototype.setInfoButtonClick = function (index, isInit) {
            if (isInit === void 0) { isInit = false; }
            if (!isInit) {
                this.formations[this.currentFormationIndex] = this.up.generals;
                if (index != this.currentFormationIndex) {
                    var a = 400;
                    for (var i = 0; i < 4; i++) {
                        a -= 100;
                        this.up["group" + i].alpha = 0;
                        this.up["group" + i].scaleY = 1.1;
                        this.up["group" + i].scaleX = 1.1;
                        egret.Tween.get(this.up["group" + i]).wait(a).to({ alpha: 1 }, 10).to({ scaleX: 1, scaleY: 1 }, 200);
                    }
                }
            }
            if (this.formations[index] != null) {
                this.up.generals = this.formations[index];
            }
            else {
                this.up.generals = [];
                for (var i = 0; i < 8; i++) {
                    this.up.generals.push(new zj.PosState());
                }
                this.formations[index] = this.up.generals;
            }
            this.up.drawUI();
            for (var i = 1; i <= 5; i++) {
                this["btnTeam" + i].currentState = "up";
                if (i == index) {
                    this["btnTeam" + i].currentState = "down";
                }
            }
            this.currentFormationIndex = index;
        };
        CommonFormationPvpMatch.prototype.initFormateOpen = function () {
            var openIndex = 1;
            if (zj.Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill == 0) {
                for (var k in zj.Game.PlayerFormationSystem.formatsMatchDefine) {
                    var hGeneral = zj.Table.FindR(zj.Game.PlayerFormationSystem.formatsMatchDefine[k].generals, function (k, v) {
                        return v != 0;
                    });
                    if (hGeneral[0]) {
                        openIndex = hGeneral[1];
                    }
                }
            }
            else {
                openIndex = zj.Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill;
            }
            return openIndex;
        };
        CommonFormationPvpMatch.prototype.setInfoUIFormateOpen = function () {
            var openIndex = this.openIndex;
            for (var i = 1; i <= 5; i++) {
                if (this["groupTeam" + i + "1"]) {
                    this["groupTeam" + i + "1"].visible = (i == openIndex + 1);
                }
                if (this["groupTeam" + i]) {
                    this["groupTeam" + i].visible = (i <= openIndex);
                }
            }
            this.setInfoButtonClick(1, true);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam11 = function () {
            this.setInfoButtonClick1(1);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam21 = function () {
            this.setInfoButtonClick1(2);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam31 = function () {
            this.setInfoButtonClick1(3);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam41 = function () {
            this.setInfoButtonClick1(4);
        };
        CommonFormationPvpMatch.prototype.onBtnTeam51 = function () {
            this.setInfoButtonClick1(5);
        };
        CommonFormationPvpMatch.prototype.setInfoButtonClick1 = function (index) {
            if (this["groupTeam" + index + "1"]) {
                this["groupTeam" + index + "1"].visible = false;
            }
            if (this["groupTeam" + index]) {
                this["groupTeam" + index].visible = true;
            }
            if (this["groupTeam" + (index + 1) + "1"]) {
                this["groupTeam" + (index + 1) + "1"].visible = true;
            }
            this.openIndex = index;
            this["onBtnTeam" + this.openIndex]();
            this.setOpenAni(index);
        };
        CommonFormationPvpMatch.prototype.setOpenAni = function (index) {
            egret.Tween.get(this["groupTeam" + index]).to({ scaleX: 0 }).to({ scaleX: 1 }, 200);
            if (this["groupTeam" + (index + 1) + "1"]) {
                egret.Tween.get(this["groupTeam" + (index + 1) + "1"]).to({ scaleX: 0 }).to({ scaleX: 1 }, 250);
            }
        };
        return CommonFormationPvpMatch;
    }(zj.FormatChoose));
    zj.CommonFormationPvpMatch = CommonFormationPvpMatch;
    __reflect(CommonFormationPvpMatch.prototype, "zj.CommonFormationPvpMatch");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormationPvpMatch.js.map