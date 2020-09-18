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
     * @date 2019-1-11
     *
     * @class 猎人念力
     */
    var HunterPsychic = (function (_super) {
        __extends(HunterPsychic, _super);
        function HunterPsychic() {
            var _this = _super.call(this) || this;
            _this.psychicItems = [];
            _this.listGroupData = new eui.ArrayCollection();
            _this.showName = true;
            _this.max_psy = 6;
            _this.max_group = 2;
            _this.actIndex = 0;
            _this.teach_ani_end = false;
            _this.showProp = true;
            _this.isAct = false;
            _this.psy_items = [];
            _this.group_items = [];
            _this.skinName = "resource/skins/hunter/HunterPsychicSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.init();
            return _this;
        }
        HunterPsychic.prototype.init = function () {
            // this.groupEffect.addChild(resdb.UI(101106))
            this.groupEffect.visible = false;
            this.SetShowNameType();
            this.InitPsychicUI();
            var tap = egret.TouchEvent.TOUCH_TAP;
            this.btnLevel.addEventListener(tap, this.onBtnPlan, this);
            this.groupName.addEventListener(tap, this.onBtnName, this);
            this.groupProperty.addEventListener(tap, this.onBtnProperty, this);
            this.btnRefresh.addEventListener(tap, this.onBtnRefresh, this);
            this.btnGet.addEventListener(tap, this.onBtnGet, this);
            this.addEventListener(tap, this.onUp, this);
        };
        HunterPsychic.prototype.InitPsychicUI = function () {
            for (var i = 1; i <= this.max_psy; i++) {
                var item = zj.newUI(zj.HunterPsychicItem);
                this["groupPsychic" + i].addChild(item);
                this.psy_items.push(item);
                item.setInfo(this, i, null);
            }
            for (var i = 1; i <= this.max_group; i++) {
                var item = zj.newUI(zj.HunterPsychicGroupItem);
                this["group" + i].addChild(item);
                this.group_items.push(item);
            }
            this.groupBigEffect.visible = false;
        };
        HunterPsychic.prototype.SetShowNameType = function () {
            this.imgBigonName.visible = this.showName;
            this.imgBingoProperty.visible = this.showProp;
        };
        HunterPsychic.prototype.reloadGeneral = function (isAct) {
            this.SetData(isAct);
            this.SetPsychicView();
            this.SetPsychicUI();
            this.setPlayEffect();
        };
        HunterPsychic.prototype.SetData = function (isAct) {
            this.isAct = isAct || false;
            this.show = false;
            this.genInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            this.groupDataCur = zj.PlayerHunterSystem.getGeneralPsychicCurGroup(this.generalId);
            this.generalPsys = zj.Game.PlayerHunterSystem.getGeneralPsychicAttri(this.generalId);
            this.curPsychicData = zj.PlayerHunterSystem.GetGeneralPsychicData(this.generalId);
        };
        HunterPsychic.prototype.SetPsychicView = function () {
            // this.groupYinCang.visible = false
            var isOpen = this.genInfo.psychicInfo != null && this.genInfo.psychicInfo.length > 0;
            this.btnRefresh.visible = isOpen;
            this.btnGet.visible = !isOpen;
            this.groupEffect.visible = !isOpen && this.genInfo.star >= 6;
        };
        HunterPsychic.prototype.SetPsychicUI = function () {
            if (this.isAct) {
                this.actIndex = this.actIndex + 1;
                if (this.actIndex > this.max_psy) {
                    this.actIndex = 0;
                    this.setGroupList();
                }
                else {
                    this.setPsychicItem();
                }
            }
            else {
                this.setPsychicItem();
                this.setGroupList();
            }
        };
        HunterPsychic.prototype.setPsychicItem = function () {
            var _this = this;
            if (this.isAct) {
                this.psy_items[this.actIndex - 1].SetMainItemUI(this.generalPsys[this.actIndex - 1], this.curPsychicData[this.actIndex - 1], this.genInfo.star > 5, true, function () { _this.SetPsychicUI(); }); //ccbk(self, self.SetPsychicUI)
            }
            else {
                for (var i = 0; i < this.max_psy; i++) {
                    this.psy_items[i].SetMainItemUI(this.generalPsys[i], this.curPsychicData[i], this.genInfo.star > 5, false);
                }
            }
        };
        HunterPsychic.prototype.setGroupList = function () {
            var _this = this;
            var setGroupItem = function () {
                for (var i = 0; i < _this.max_group; i++) {
                    _this.group_items[i].SetInfo(i, _this.groupDataCur[i + 1], _this, _this.isAct, true);
                }
            };
            var cbFunc = function () {
                _this.isAct = false;
                _this.teach_ani_end = true;
            };
            if (this.isAct) {
                setGroupItem();
                zj.TipManager.GetPsychicGroup(this, this.groupDataCur, cbFunc);
            }
            else {
                setGroupItem();
            }
        };
        HunterPsychic.prototype.setPlayEffect = function () {
            var _this = this;
            if (this.isAct) {
                zj.Game.DragonBonesManager.playAnimation(this, "nianli_eff", "armatureName", "001_jihuo_yuanpan01", 1)
                    .then(function (display) {
                    display.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    }, _this);
                    _this.groupBigEffect.addChild(display);
                }).catch(function (reason) {
                    zj.toast(reason);
                });
                this.groupBigEffect.visible = true;
            }
        };
        HunterPsychic.prototype.onBtnPlan = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.init(zj.RuleConfig.psychic);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterPsychic.prototype.onBtnName = function () {
            this.showName = !this.showName;
            this.RefreshNameType();
        };
        HunterPsychic.prototype.onBtnProperty = function () {
            this.showProp = !this.showProp;
            this.RefreshNameType();
        };
        HunterPsychic.prototype.RefreshNameType = function () {
            this.SetShowNameType();
            for (var i = 0; i < this.max_psy; i++) {
                this.psy_items[i].SetItemName();
            }
        };
        HunterPsychic.prototype.onBtnGet = function () {
            this.teach_ani_end = false;
            this.GeneralPsychicActivateReq();
            zj.Teach.addTeaching();
        };
        HunterPsychic.prototype.onBtnRefresh = function () {
            var _this = this;
            zj.loadUI(zj.HunterPsychicRefreshNew).then(function (dialog) {
                dialog.setInfo(_this, function () {
                    _this.reloadGeneral();
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterPsychic.prototype.GeneralPsychicActivateReq = function () {
            var _this = this;
            zj.Game.PlayerHunterSystem.psychicActivate(this.generalId)
                .then(function () {
                _this.reloadGeneral(true);
            }).catch(function () {
            });
        };
        HunterPsychic.prototype.lodeUI = function (groupInfo) {
            if (groupInfo == 0) {
                return;
            }
            var commonDes = zj.newUI(zj.CommonDesPsychicGroup);
            commonDes.SetInfo(groupInfo);
            commonDes.anchorOffsetX = commonDes.width / 2;
            commonDes.anchorOffsetY = commonDes.height / 2;
            commonDes.x = this.father.width / 2;
            commonDes.y = this.father.height / 2;
            commonDes.name = "commonDes";
            this.addChild(commonDes);
        };
        HunterPsychic.prototype.onUp = function () {
            var ui = this.getChildByName("commonDes");
            if (ui) {
                this.removeChild(ui);
                ui.close();
            }
        };
        return HunterPsychic;
    }(zj.HunterSubUI));
    zj.HunterPsychic = HunterPsychic;
    __reflect(HunterPsychic.prototype, "zj.HunterPsychic");
})(zj || (zj = {}));
//# sourceMappingURL=HunterPsychic.js.map