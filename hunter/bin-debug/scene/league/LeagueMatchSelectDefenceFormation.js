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
    // 公会战-布置防守
    // lizhengqiang
    // 20190212
    var LeagueMatchSelectDefenceFormation = (function (_super) {
        __extends(LeagueMatchSelectDefenceFormation, _super);
        function LeagueMatchSelectDefenceFormation() {
            var _this = _super.call(this) || this;
            _this.type = 0;
            _this.leftInfo = [];
            _this.rightInfo = [];
            _this.leftMaxIndex = 0;
            _this.arrCollectionLeft = new eui.ArrayCollection();
            _this.arrCollectionRight = new eui.ArrayCollection();
            _this.leftIndex = -1;
            _this.rightIndex = -1;
            _this.leftSelected = false;
            _this.rightSelected = true;
            _this.colorGrayMatrix = [
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0.3, 0.6, 0, 0, 0,
                0, 0, 0, 1, 0
            ];
            _this.colorDefaultMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            _this.exchangeList = [0, 0];
            _this.selectLeftInfo = [0, {}];
            _this.selectRightInfo = [0, {}];
            _this.battleValue = function (data) {
                var battleValue = 0;
                for (var _i = 0, _a = data.formations.generals; _i < _a.length; _i++) {
                    var v = _a[_i];
                    battleValue = battleValue + v.battleValue;
                }
                return battleValue;
            };
            _this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnGraison.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGraison, _this);
            _this.btnDisarm.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDisarm, _this);
            _this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOneKey, _this);
            _this.btnDownGar.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnDownGar, _this);
            _this.lstViewLeft.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstViewLeft, _this);
            _this.lstViewRight.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onLstViewRight, _this);
            return _this;
        }
        LeagueMatchSelectDefenceFormation.prototype.setInfo = function (type) {
            var _this = this;
            this.type = type;
            this.setInfoTitle();
            this.setProgress();
            zj.Game.PlayerLeagueSystem.leagueMatchFortress(this.type, true).then(function (resp) {
                _this.leftMaxIndex = 1001;
                for (var _i = 0, _a = resp.member_formations.formations; _i < _a.length; _i++) {
                    var v = _a[_i];
                    var _loop_1 = function (i) {
                        var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                        info.member_id = v.baseInfo.id;
                        info.name = v.baseInfo.name;
                        info.index = _this.leftMaxIndex;
                        // formation
                        info.formations = v.formation[i - 1];
                        info.formationIndex = v.formation[i - 1].adviserSkill;
                        info.battleValue = function () {
                            var battleValue = 0;
                            for (var _i = 0, _a = info.formations.generals; _i < _a.length; _i++) {
                                var v_1 = _a[_i];
                                battleValue = battleValue + v_1.battleValue;
                            }
                            return battleValue;
                        }();
                        _this.leftInfo.push(info);
                        _this.leftMaxIndex = _this.leftMaxIndex + 1;
                    };
                    for (var i = 1; i <= v.formation.length; i++) {
                        _loop_1(i);
                    }
                }
                _this.leftInfo.sort(function (a, b) {
                    return b.battleValue - a.battleValue;
                });
                for (var i = 0; i < zj.CommonConfig.league_match_fortress_team_num[_this.type - 1]; i++) {
                    if (_this.rightInfo[i] == null) {
                        var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                        info.name = "";
                        info.member_id = 0;
                        info.formationIndex = 0;
                        info.index = _this.type * 100 + (i + 1);
                        _this.rightInfo.push(info);
                    }
                }
                for (var _b = 0, _c = resp.leagueFortress.leagueFortress; _b < _c.length; _b++) {
                    var v = _c[_b];
                    var info = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                    info.formations = v.simpleFormation;
                    info.member_id = v.memberId;
                    info.name = v.name;
                    info.formationIndex = v.formationIndex;
                    info.index = v.index;
                    var currentId = info.index % 10;
                    if (currentId > zj.CommonConfig.league_match_fortress_team_num[_this.type - 1])
                        continue;
                    _this.rightInfo[currentId - 1] = info;
                }
                _this.rightInfo.sort(function (a, b) {
                    return a.index - b.index;
                });
                _this.setInfoList();
            });
        };
        LeagueMatchSelectDefenceFormation.prototype.setProgress = function () {
            var maxHp = zj.PlayerLeagueSystem.GetMaxScore(this.type);
            this.lbName.textColor = zj.Helper.RGBToHex("r:255,g:255,b:255");
            this.lbName.stroke = 2;
            this.lbName.strokeColor = zj.Helper.RGBToHex("r:42,g:42,b:42");
            this.lbName.text = maxHp + "/" + maxHp;
            var progress = new eui.Image(zj.UIConfig.UIConfig_League.leaguMatchProgress2);
            this.groupProgress.addChild(progress);
        };
        LeagueMatchSelectDefenceFormation.prototype.setInfoTitle = function () {
            var titlePicture = zj.UIConfig.UIConfig_Union.airShipTitle[this.type - 1];
            this.imgFlyTitle.source = zj.cachekey(titlePicture, this);
        };
        LeagueMatchSelectDefenceFormation.prototype.setInfoList = function () {
            this.arrCollectionLeft = new eui.ArrayCollection();
            for (var k in this.leftInfo) {
                this.arrCollectionLeft.addItem({ i: Number(k) + 1, info: this.leftInfo[k], bLeft: true, bTouch: true });
            }
            this.lstViewLeft.itemRenderer = zj.LeagueMatchSelectDefenceFormationItemIR;
            this.lstViewLeft.dataProvider = this.arrCollectionLeft;
            this.arrCollectionRight = new eui.ArrayCollection();
            var isFirstEmpty = false;
            for (var k in this.rightInfo) {
                this.arrCollectionRight.addItem({ i: Number(k) + 1, info: this.rightInfo[k], bLeft: false, bTouch: true });
                if (!isFirstEmpty && this.rightInfo[k].member_id == 0) {
                    this.lstViewRight.selectedIndex = Number(k);
                    this.rightIndex = Number(k);
                    isFirstEmpty = true;
                }
            }
            this.lstViewRight.itemRenderer = zj.LeagueMatchSelectDefenceFormationItemIR;
            this.lstViewRight.dataProvider = this.arrCollectionRight;
            if (!isFirstEmpty) {
                this.btnGraison.visible = false;
                this.btnDisarm.visible = true;
                this.lstViewRight.selectedIndex = 0;
                this.rightIndex = 0;
            }
            else {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                this.btnGraison.touchEnabled = false;
                this.btnGraison.visible = true;
                this.btnDisarm.visible = false;
            }
        };
        LeagueMatchSelectDefenceFormation.prototype.onLstViewLeft = function () {
            if (this.leftIndex != this.lstViewLeft.selectedIndex) {
                if (this.leftIndex == -1)
                    this.leftIndex = 0;
                this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
                this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.lstViewLeft.selectedIndex]);
                this.leftIndex = this.lstViewLeft.selectedIndex;
                this.leftSelected = true;
            }
            else {
                if (this.leftSelected) {
                    this.lstViewLeft.selectedIndex = -1;
                    this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
                    this.lstViewLeft.selectedIndex = this.leftIndex;
                    this.leftSelected = false;
                }
                else {
                    this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
                    this.leftSelected = true;
                }
            }
            if (this.leftSelected) {
                if (this.rightSelected) {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorDefaultMatrix)];
                    this.btnGraison.visible = true;
                    this.btnGraison.touchEnabled = true;
                    this.btnDisarm.visible = false;
                }
                else {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                    this.btnGraison.touchEnabled = false;
                    this.btnGraison.visible = true;
                    this.btnDisarm.visible = false;
                }
            }
            else {
                if (this.rightSelected) {
                    if (this.lstViewRight.selectedItem.info.member_id == 0) {
                        this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                        this.btnGraison.touchEnabled = false;
                        this.btnGraison.visible = true;
                        this.btnDisarm.visible = false;
                    }
                    else {
                        this.btnGraison.visible = false;
                        this.btnDisarm.visible = true;
                    }
                }
                else {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                    this.btnGraison.touchEnabled = false;
                    this.btnGraison.visible = true;
                    this.btnDisarm.visible = false;
                }
            }
        };
        LeagueMatchSelectDefenceFormation.prototype.onLstViewRight = function () {
            if (this.rightIndex != this.lstViewRight.selectedIndex) {
                if (this.rightIndex == -1)
                    this.rightIndex = 0;
                this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
                this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.lstViewRight.selectedIndex]);
                this.rightIndex = this.lstViewRight.selectedIndex;
                this.rightSelected = true;
            }
            else {
                if (this.rightSelected) {
                    this.lstViewRight.selectedIndex = -1;
                    this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
                    this.lstViewRight.selectedIndex = this.rightIndex;
                    this.rightSelected = false;
                }
                else {
                    this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
                    this.rightSelected = true;
                }
            }
            if (this.rightSelected) {
                if (this.leftSelected) {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorDefaultMatrix)];
                    this.btnGraison.visible = true;
                    this.btnGraison.touchEnabled = true;
                    this.btnDisarm.visible = false;
                }
                else {
                    if (this.lstViewRight.selectedItem.info.member_id == 0) {
                        this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                        this.btnGraison.touchEnabled = false;
                        this.btnGraison.visible = true;
                        this.btnDisarm.visible = false;
                    }
                    else {
                        this.btnGraison.visible = false;
                        this.btnDisarm.visible = true;
                    }
                }
            }
            else {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                this.btnGraison.touchEnabled = false;
                this.btnGraison.visible = true;
                this.btnDisarm.visible = false;
            }
        };
        LeagueMatchSelectDefenceFormation.prototype.onBtnClose = function () {
            var type = this.type;
            var arrarMemberId = [];
            var arrayFormationIndex = [];
            var arrayIndex = [];
            for (var i = 0; i < zj.CommonConfig.league_match_fortress_team_num[this.type - 1]; i++) {
                arrarMemberId.push(this.rightInfo[i].member_id);
                arrayFormationIndex.push(this.rightInfo[i].formationIndex);
                arrayIndex.push(this.rightInfo[i].index);
            }
            zj.Game.PlayerLeagueSystem.leagueMatchSetFortress(type, arrarMemberId, arrayFormationIndex, arrayIndex).then(function () {
                zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Contend.formationSave));
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2);
            });
            this.close(zj.UI.HIDE_TO_TOP);
        };
        LeagueMatchSelectDefenceFormation.prototype.onBtnGraison = function () {
            // toast("驻防");
            this.rightInfo[this.rightIndex] = this.leftInfo[this.leftIndex];
            this.rightInfo[this.rightIndex].index = this.type * 100 + this.rightIndex + 1;
            this.leftInfo.splice(this.leftIndex, 1);
            this.leftInfo.sort(function (a, b) {
                return b.battleValue - a.battleValue;
            });
            this.setInfoList();
        };
        LeagueMatchSelectDefenceFormation.prototype.onBtnDisarm = function () {
            // toast("撤防");
            this.leftInfo.push(this.rightInfo[this.rightIndex]);
            this.leftInfo[this.leftInfo.length - 1].battleValue = this.battleValue(this.rightInfo[this.rightIndex]);
            this.rightInfo[this.rightIndex] = { member_id: 0, name: "", index: this.rightInfo[this.rightIndex].index, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
            this.leftInfo.sort(function (a, b) {
                return b.battleValue - a.battleValue;
            });
            this.setInfoList();
        };
        LeagueMatchSelectDefenceFormation.prototype.onBtnOneKey = function () {
            // toast("一键驻防");
            for (var k in this.rightInfo) {
                if (this.leftInfo.length == 0)
                    break;
                if (this.rightInfo[k].member_id != 0)
                    continue;
                this.rightInfo[k] = this.leftInfo[0];
                this.rightInfo[k].index = this.type * 100 + Number(k) + 1;
                this.leftInfo.splice(0, 1);
            }
            this.leftInfo.sort(function (a, b) {
                return b.battleValue - a.battleValue;
            });
            this.setInfoList();
            zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Match.oneKeySuccess));
        };
        LeagueMatchSelectDefenceFormation.prototype.onBtnDownGar = function () {
            // toast("一键撤防");
            for (var k in this.rightInfo) {
                if (this.rightInfo[k].member_id == 0)
                    continue;
                this.leftInfo.push(this.rightInfo[k]);
                this.leftInfo[this.leftInfo.length - 1].battleValue = this.battleValue(this.rightInfo[k]);
                this.rightInfo[k] = { member_id: 0, name: "", index: this.rightInfo[k].index, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
            }
            this.leftInfo.sort(function (a, b) {
                return b.battleValue - a.battleValue;
            });
            this.setInfoList();
            zj.toast(zj.LANG(zj.TextsConfig.TextsConfig_Match.downGarSuccess));
        };
        return LeagueMatchSelectDefenceFormation;
    }(zj.Dialog));
    zj.LeagueMatchSelectDefenceFormation = LeagueMatchSelectDefenceFormation;
    __reflect(LeagueMatchSelectDefenceFormation.prototype, "zj.LeagueMatchSelectDefenceFormation");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchSelectDefenceFormation.js.map