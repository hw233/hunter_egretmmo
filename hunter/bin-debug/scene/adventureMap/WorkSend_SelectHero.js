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
    zj.GENERAL_APTITUDE = (_a = {},
        _a[11] = ["ui_instance_search_quality3_1_png", "ui_instance_search_quality3_2_png", "C级猎人"],
        _a[12] = ["ui_instance_search_quality2_1_png", "ui_instance_search_quality2_2_png", "B级猎人"],
        _a[13] = ["ui_instance_search_quality1_1_png", "ui_instance_search_quality1_2_png", "A级猎人"],
        _a[14] = ["ui_instance_search_quality4_1_png", "ui_instance_search_quality4_2_png", "S级猎人"],
        _a);
    zj.GENERAL_STAR = (_b = {},
        _b[1] = ["ui_instance_search_star_star1_1_png", "ui_instance_search_star_star1_2_png", "1星猎人"],
        _b[2] = ["ui_instance_search_star_star2_1_png", "ui_instance_search_star_star2_2_png", "2星猎人"],
        _b[3] = ["ui_instance_search_star_star3_1_png", "ui_instance_search_star_star3_2_png", "3星猎人"],
        _b[4] = ["ui_instance_search_star_star4_1_png", "ui_instance_search_star_star4_2_png", "4星猎人"],
        _b[5] = ["ui_instance_search_star_star5_1_png", "ui_instance_search_star_star5_2_png", "5星猎人"],
        _b[6] = ["ui_instance_search_star_star6_1_png", "ui_instance_search_star_star6_2_png", "6星猎人"],
        _b);
    zj.GENERAL_TYPE1 = (_c = {},
        _c[1] = ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
        _c[2] = ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
        _c[3] = ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
        _c[4] = ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
        _c[5] = ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
        _c[6] = ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"],
        _c);
    zj.GENERAL_TYPE2 = (_d = {},
        _d[1] = ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
        _d[2] = ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
        _d[3] = ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
        _d[4] = ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
        _d[5] = ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
        _d[6] = ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"],
        _d);
    zj.GENERAL_TYPE3 = (_e = {},
        _e[1] = ["ui_instance_search_type3_1_png", "ui_instance_search_type3_2_png", "强化系猎人"],
        _e[2] = ["ui_instance_search_type2_1_png", "ui_instance_search_type2_2_png", "放出系猎人"],
        _e[3] = ["ui_instance_search_type5_1_png", "ui_instance_search_type5_2_png", "具现系猎人"],
        _e[4] = ["ui_instance_search_type4_1_png", "ui_instance_search_type4_2_png", "特质系猎人"],
        _e[5] = ["ui_instance_search_type6_1_png", "ui_instance_search_type6_2_png", "变化系猎人"],
        _e[6] = ["ui_instance_search_type1_1_png", "ui_instance_search_type1_2_png", "操作系猎人"],
        _e);
    var HERO_TYPE;
    (function (HERO_TYPE) {
        HERO_TYPE[HERO_TYPE["QIANGHUA"] = 1] = "QIANGHUA";
        HERO_TYPE[HERO_TYPE["FANGCHU"] = 2] = "FANGCHU";
        HERO_TYPE[HERO_TYPE["JUXIAN"] = 3] = "JUXIAN";
        HERO_TYPE[HERO_TYPE["TEZHI"] = 4] = "TEZHI";
        HERO_TYPE[HERO_TYPE["BIANHUA"] = 5] = "BIANHUA";
        HERO_TYPE[HERO_TYPE["CAOZUO"] = 6] = "CAOZUO";
        HERO_TYPE[HERO_TYPE["ALLHERO"] = 7] = "ALLHERO";
    })(HERO_TYPE = zj.HERO_TYPE || (zj.HERO_TYPE = {}));
    /**
     * @class 工作派遣选择猎人
     *
     * @author LianLei
     *
     * @date 2019-11-09
     */
    var WorkSend_SelectHero = (function (_super) {
        __extends(WorkSend_SelectHero, _super);
        function WorkSend_SelectHero() {
            var _this = _super.call(this) || this;
            _this.listHeroData = new eui.ArrayCollection();
            _this.condition = {};
            _this.hunterSelArr = []; // 选中的猎人
            _this.allHunterArr = []; // 所有可选的猎人
            _this.conditionSelArr = []; // 一键上阵猎人满足的条件
            _this.type = HERO_TYPE.ALLHERO;
            _this.skinName = "resource/skins/adventureMap/WorkSend_SelectHeroSkin.exml";
            _this.listHero.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeHeroList, _this);
            _this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnStart, _this);
            _this.btnAkeyChoose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAkeyChoose, _this);
            for (var i = 1; i <= 4; i++)
                _this["groupHero" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this["onBtnGroupHero" + i], _this);
            for (var i = 1; i <= 6; i++)
                _this["btnType" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, _this["onBtnType" + i], _this);
            return _this;
        }
        WorkSend_SelectHero.prototype.init = function (info, index) {
            this.itemIndex = 0;
            this.index = index;
            this.workInfo = info;
            for (var i = 1; i <= 4; i++) {
                this["groupHero" + i].visible = false;
                this["imgCondition" + i].visible = false;
            }
            this.condition = {};
            this.hunterSelArr = [];
            this.allHunterArr = [];
            this.labelTime.text = "所需时间: " + zj.Helper.GetTimeStr(info.time, false);
            this.setConditionPos();
            this.setHeroPos();
            this.changeHeroList(this.type);
            egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
        };
        WorkSend_SelectHero.prototype.changeHeroList = function (type) {
            this.scrollerHero.stopAnimation();
            this.scrollerHero.viewport.scrollV = 0;
            this.type = type;
            this.setHeroList(type);
            if (this.type == HERO_TYPE.ALLHERO) {
                for (var i = 1; i <= 6; i++)
                    this["btnType" + i].currentState = "up";
                this.imgTypeSel.visible = false;
            }
            else {
                for (var i = 1; i <= 6; i++) {
                    if (i == type)
                        this["btnType" + i].currentState = "down";
                    if (i != type)
                        this["btnType" + i].currentState = "up";
                }
                this.imgTypeSel.visible = true;
                this.imgTypeSel.x = this["btnType" + type].left + this["btnType" + type].width / 2;
            }
        };
        WorkSend_SelectHero.prototype.setHeroList = function (type) {
            var hunterList = zj.PlayerHunterSystem.GetHunterList();
            this.allHunterArr = [];
            var generalInfoArr = [];
            for (var i = 0; i < hunterList.length; i++) {
                if (zj.Game.PlayerInstanceSystem.GetHunterBeInSearch(hunterList[i]) != -1)
                    continue;
                generalInfoArr.push(zj.Game.PlayerHunterSystem.queryHunter(hunterList[i]));
            }
            generalInfoArr.sort(function (a, b) {
                if (a.star == b.star) {
                    return zj.PlayerHunterSystem.Table(b.general_id).aptitude - zj.PlayerHunterSystem.Table(a.general_id).aptitude;
                }
                else {
                    return b.star - a.star;
                }
            });
            for (var i = 0; i < generalInfoArr.length; i++)
                this.allHunterArr.push(generalInfoArr[i].general_id);
            var arr = [];
            if (type != HERO_TYPE.ALLHERO) {
                for (var i = 0; i < this.allHunterArr.length; i++) {
                    var baseInfo = zj.PlayerHunterSystem.Table(this.allHunterArr[i]);
                    if (baseInfo.type == type)
                        arr.push(this.allHunterArr[i]);
                }
                this.labelNone.text = "暂无" + zj.GENERAL_TYPE1[type][2];
            }
            else {
                arr = this.allHunterArr;
            }
            this.labelNone.visible = arr.length == 0;
            this.listHeroData.removeAll();
            for (var i = 0; i < arr.length; i++) {
                var info = zj.Game.PlayerHunterSystem.queryHunter(arr[i]);
                var itemData = new zj.WorkSendHeroItemData();
                itemData.generalInfo = zj.Game.PlayerHunterSystem.allHuntersMap()[arr[i]];
                itemData.isSel = this.hunterSelArr.indexOf(info) != -1;
                this.listHeroData.addItem(itemData);
            }
            this.listHero.dataProvider = this.listHeroData;
            this.listHero.itemRenderer = zj.WorkSendHeroItem;
            this.listHero.selectedIndex = this.itemIndex == -1 ? 0 : this.itemIndex;
        };
        WorkSend_SelectHero.prototype.setConditionPos = function () {
            for (var _i = 0, _a = zj.HelpUtil.GetKV(this.workInfo); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                if (k == "general_aptitude" && v != 0)
                    this.condition["GENERAL_APTITUDE"] = v;
                if (k == "general_star" && v != 0)
                    this.condition["GENERAL_STAR"] = v;
                if (k == "general_type" && v.length != 0) {
                    for (var i_1 = 0; i_1 < v.length; i_1++)
                        this.condition["GENERAL_TYPE" + (i_1 + 1)] = v[i_1];
                }
            }
            var keys = Object.keys(this.condition);
            var i = 1;
            for (var _c = 0, keys_1 = keys; _c < keys_1.length; _c++) {
                var key = keys_1[_c];
                this["imgCondition" + i].visible = true;
                this["imgCondition" + i].source = zj.cachekey(zj[key][this.condition[key]][0], this);
                i++;
            }
            if (this.conditionSelArr.length == 0) {
                for (var i_2 = 0; i_2 < Object.keys(this.condition).length; i_2++)
                    this.conditionSelArr.push(null);
            }
        };
        WorkSend_SelectHero.prototype.setHeroPos = function () {
            for (var i = 1; i <= Object.keys(this.condition).length; i++) {
                this["groupHero" + i].visible = true;
                if (i == 1)
                    continue;
                this["groupHero" + i].x += this["groupHero" + i].width + 10 + this["groupHero" + (i - 1)].x;
            }
        };
        WorkSend_SelectHero.prototype.onChangeHeroList = function (e) {
            if (this.hunterSelArr.length == Object.keys(this.condition).length && this.hunterSelArr.indexOf(null) == -1 && this.conditionSelArr.indexOf(null) != -1)
                return;
            var item = this.listHero.getElementAt(e.itemIndex);
            var data = this.listHeroData.getItemAt(e.itemIndex);
            this.listHeroData.itemUpdated(this.listHeroData.source[e.itemIndex]);
            this.listHeroData.itemUpdated(this.listHeroData.source[this.itemIndex]);
            this.itemIndex = e.itemIndex;
            this.chooleOneHero(data);
        };
        WorkSend_SelectHero.prototype.chooleOneHero = function (data) {
            if (this.hunterSelArr.indexOf(data.generalInfo) != -1)
                return;
            var fun = function (data, self) {
                for (var i = 0; i < self.hunterSelArr.length; i++) {
                    if (self.hunterSelArr[i] == null && self.hunterSelArr.indexOf(data) == -1) {
                        self.hunterSelArr[i] = data;
                        break;
                    }
                }
            };
            this.hunterSelArr.length < Object.keys(this.condition).length && this.hunterSelArr.indexOf(null) == -1 ? this.hunterSelArr.push(data.generalInfo) : fun(data.generalInfo, this);
            var isStar = this.workInfo.general_star != 0;
            var baseInfo = zj.PlayerHunterSystem.Table(data.generalInfo.general_id);
            var typeIndex = this.workInfo.general_type.indexOf(baseInfo.type);
            if (isStar) {
                if (data.generalInfo.star >= this.workInfo.general_star)
                    this.conditionSelArr[0] = 1;
            }
            else {
                if (baseInfo.aptitude >= this.workInfo.general_aptitude)
                    this.conditionSelArr[0] = 1;
            }
            if (typeIndex != -1)
                this.conditionSelArr[typeIndex + 1] = typeIndex + 2;
            this.setHeroInfo();
            this.setConditionSel(data.generalInfo.general_id);
        };
        WorkSend_SelectHero.prototype.onBtnAkeyChoose = function () {
            var isStar = this.workInfo.general_star != 0;
            var arrConditionHunter = []; // 星级或者资质满足条件的猎人
            var arrAll = zj.Table.DeepCopy(this.allHunterArr); // 所有猎人
            var arrSelHunter = []; // 上阵猎人
            this.conditionSelArr = [];
            for (var i = 0; i < Object.keys(this.condition).length; i++) {
                arrSelHunter.push(null);
                this.conditionSelArr.push(null);
            }
            for (var i = 0; i < this.allHunterArr.length; i++) {
                var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(this.allHunterArr[i]);
                var baseInfo = zj.PlayerHunterSystem.Table(this.allHunterArr[i]);
                if (isStar) {
                    if (generalInfo.star >= this.workInfo.general_star)
                        arrConditionHunter.push(this.allHunterArr[i]);
                }
                else {
                    if (baseInfo.aptitude >= this.workInfo.general_aptitude)
                        arrConditionHunter.push(this.allHunterArr[i]);
                }
            }
            arrConditionHunter.sort(function (a, b) {
                var generalInfoA = zj.Game.PlayerHunterSystem.queryHunter(a);
                var baseInfoA = zj.PlayerHunterSystem.Table(a);
                var generalInfoB = zj.Game.PlayerHunterSystem.queryHunter(b);
                var baseInfoB = zj.PlayerHunterSystem.Table(b);
                if (isStar) {
                    if (generalInfoA.star == generalInfoB.star) {
                        if (baseInfoA.aptitude == baseInfoB.aptitude) {
                            return generalInfoA.level - generalInfoB.level;
                        }
                        else {
                            return baseInfoA.aptitude - baseInfoB.aptitude;
                        }
                    }
                    else {
                        return generalInfoA.star - generalInfoB.star;
                    }
                }
                else {
                    if (baseInfoA.aptitude == baseInfoB.aptitude) {
                        if (generalInfoA.star == generalInfoB.star) {
                            return generalInfoA.level - generalInfoB.level;
                        }
                        else {
                            return generalInfoA.star - generalInfoB.star;
                        }
                    }
                    else {
                        return baseInfoA.aptitude - baseInfoB.aptitude;
                    }
                }
            });
            if (arrConditionHunter.length != 0) {
                arrAll.sort(function (a, b) {
                    var generalInfoA = zj.Game.PlayerHunterSystem.queryHunter(a);
                    var baseInfoA = zj.PlayerHunterSystem.Table(a);
                    var generalInfoB = zj.Game.PlayerHunterSystem.queryHunter(b);
                    var baseInfoB = zj.PlayerHunterSystem.Table(b);
                    if (isStar) {
                        if (generalInfoA.star == generalInfoB.star) {
                            if (baseInfoA.aptitude == baseInfoB.aptitude) {
                                return generalInfoA.level - generalInfoB.level;
                            }
                            else {
                                return baseInfoA.aptitude - baseInfoB.aptitude;
                            }
                        }
                        else {
                            return generalInfoA.star - generalInfoB.star;
                        }
                    }
                    else {
                        if (baseInfoA.aptitude == baseInfoB.aptitude) {
                            if (generalInfoA.star == generalInfoB.star) {
                                return generalInfoA.level - generalInfoB.level;
                            }
                            else {
                                return generalInfoA.star - generalInfoB.star;
                            }
                        }
                        else {
                            return baseInfoA.aptitude - baseInfoB.aptitude;
                        }
                    }
                });
                var starOrQualityNum = void 0;
                if (isStar) {
                    starOrQualityNum = zj.Game.PlayerHunterSystem.queryHunter(arrConditionHunter[0]).star;
                }
                else {
                    starOrQualityNum = zj.PlayerHunterSystem.Table(arrConditionHunter[0]).aptitude;
                }
                // arrSelHunter.push(arrConditionHunter[0]);
                arrSelHunter[0] = arrConditionHunter[0];
                this.conditionSelArr[0] = 1;
                if (this.conditionSelArr.length == Object.keys(this.condition).length && this.conditionSelArr.indexOf(null) == -1)
                    return;
                for (var i = 0; i < arrConditionHunter.length; i++) {
                    if (isStar) {
                        if (zj.Game.PlayerHunterSystem.queryHunter(arrConditionHunter[i]).star > starOrQualityNum)
                            break;
                    }
                    else {
                        if (zj.PlayerHunterSystem.Table(arrConditionHunter[i]).aptitude > starOrQualityNum)
                            break;
                    }
                    var type = zj.PlayerHunterSystem.Table(arrConditionHunter[i]).type;
                    var typeIndex = this.workInfo.general_type.indexOf(type);
                    if (typeIndex != -1) {
                        // this.conditionSelArr.push(typeIndex + 2);
                        if (this.conditionSelArr[typeIndex + 1] == null)
                            this.conditionSelArr[typeIndex + 1] = typeIndex + 2;
                        if (arrSelHunter.indexOf(arrConditionHunter[i]) == -1) {
                            arrSelHunter[0] = arrConditionHunter[i];
                        }
                        break;
                    }
                }
            }
            var num = 0;
            var arrr = []; // 临时存放
            for (var j = 0; j < this.workInfo.general_type.length; j++) {
                for (var i = num; i < arrAll.length; i++) {
                    var type = zj.PlayerHunterSystem.Table(arrAll[i]).type;
                    arrr.push(type);
                    var typeIndex = this.workInfo.general_type.indexOf(type);
                    if (typeIndex != -1 && this.conditionSelArr.indexOf(typeIndex + 2) == -1) {
                        // this.conditionSelArr[j] == null ? this.conditionSelArr[j] = typeIndex + 2 : this.conditionSelArr.push(typeIndex + 2);
                        // this.conditionSelArr.push(typeIndex + 2);
                        if (this.conditionSelArr[j + 1] == null) {
                            this.conditionSelArr[j + 1] = typeIndex + 2;
                            // if (arrSelHunter[j + 1] == null) arrSelHunter[j + 1] = arrAll[i];
                            if (arrSelHunter.indexOf(null) != -1)
                                arrSelHunter[arrSelHunter.indexOf(null)] = arrAll[i];
                        }
                        // if (arrSelHunter[j + 1] == null) arrSelHunter[j + 1] = arrAll[i];
                        // arrSelHunter.push(arrAll[i]);
                        break;
                    }
                    num = i;
                }
            }
            if (arrSelHunter.length == 0) {
                zj.toast_warning("没有满足条件的猎人！");
                return;
            }
            this.hunterSelArr = [];
            for (var i = 0; i < arrSelHunter.length; i++) {
                if (arrSelHunter[i] != null) {
                    var generalinfo = zj.Game.PlayerHunterSystem.queryHunter(arrSelHunter[i]);
                    this.hunterSelArr[i] = generalinfo;
                    this.setConditionSel(generalinfo.general_id);
                    this.setHeroInfo();
                }
                else {
                    this.hunterSelArr[i] = null;
                    this.setHeroInfo();
                }
            }
            this.setHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.setHeroInfo = function () {
            for (var i = 1; i <= this.hunterSelArr.length; i++) {
                if (this.hunterSelArr[i - 1] != null) {
                    // let baseInfo = PlayerHunterSystem.Table(this.hunterSelArr[i - 1].general_id);
                    this["imgFrame" + i].source = zj.cachekey(zj.PlayerHunterSystem.Frame(this.hunterSelArr[i - 1].general_id), this);
                    this["imgIcon" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.hunterSelArr[i - 1].general_id), this);
                    this["imgFrame" + i].horizontalCenter = 0;
                    if (this["imgIcon" + i].source == "hero_icon_head_gw_moguguai_png")
                        this["imgFrame" + i].horizontalCenter = -2;
                    // if (this.selected) {
                    // this[`imgType${i}`].source = cachekey(UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
                    // this[`labelLevel${i}`].text = this.hunterSelArr[i - 1].level.toString();
                    // Helper.SetHeroAwakenStar(this[`groupStar${i}`], this.hunterSelArr[i - 1].star, this.hunterSelArr[i - 1].awakePassive.level);
                    // Helper.GetBreakLevelToPath(this[`imgBreak${i}`], this.hunterSelArr[i - 1].break_level);
                    // this[`imgQuality${i}`].source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(this.hunterSelArr[i - 1].general_id).aptitude], this);
                }
                else {
                    this["imgFrame" + i].source = zj.cachekey("ui_frame_FrameHunterAsh_png", this);
                    this["imgIcon" + i].source = null;
                    this["imgFrame" + i].horizontalCenter = 0;
                    // this[`imgType${i}`].source = null;
                    // this[`labelLevel${i}`].text = "";
                    // this[`groupStar${i}`].removeChildren();
                    // this[`imgBreak${i}`].source = null;
                    // this[`imgQuality${i}`].source = null;
                }
            }
            this.setHeroList(this.type);
        };
        /**选中猎人刷新条件 */
        WorkSend_SelectHero.prototype.setConditionSel = function (generalId) {
            var baseInfo = zj.PlayerHunterSystem.Table(generalId);
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var index = 1;
            var keys = Object.keys(this.condition);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                var v = this.condition[key];
                var isShow = false;
                if (key == "GENERAL_APTITUDE") {
                    if (v && baseInfo.aptitude >= v)
                        isShow = true;
                    if (isShow)
                        this["imgCondition" + index].source = zj.cachekey(zj[key][this.condition[key]][1], this);
                    ++index;
                }
                if (key == "GENERAL_STAR") {
                    if (v && generalInfo.star >= v)
                        isShow = true;
                    if (isShow)
                        this["imgCondition" + index].source = zj.cachekey(zj[key][this.condition[key]][1], this);
                    ++index;
                }
                if (key == "GENERAL_TYPE1") {
                    if (v && baseInfo.type == v)
                        isShow = true;
                    if (isShow)
                        this["imgCondition" + index].source = zj.cachekey(zj[key][this.condition[key]][1], this);
                    ++index;
                }
                if (key == "GENERAL_TYPE2") {
                    if (v && baseInfo.type == v)
                        isShow = true;
                    if (isShow)
                        this["imgCondition" + index].source = zj.cachekey(zj[key][this.condition[key]][1], this);
                    ++index;
                }
                if (key == "GENERAL_TYPE3") {
                    if (v && baseInfo.type == v)
                        isShow = true;
                    if (isShow)
                        this["imgCondition" + index].source = zj.cachekey(zj[key][this.condition[key]][1], this);
                    ++index;
                }
            }
        };
        /**取消选中猎人刷新条件 */
        WorkSend_SelectHero.prototype.setConditionUnSel = function () {
            var keys = Object.keys(this.condition);
            var indexArr = [];
            var generals = this.hunterSelArr;
            for (var _i = 0, generals_1 = generals; _i < generals_1.length; _i++) {
                var generalInfo = generals_1[_i];
                if (!generalInfo)
                    continue;
                var index = 1;
                var baseInfo = zj.PlayerHunterSystem.Table(generalInfo.general_id);
                for (var _a = 0, keys_3 = keys; _a < keys_3.length; _a++) {
                    var key = keys_3[_a];
                    if (indexArr.indexOf(index) != -1) {
                        index++;
                        continue;
                    }
                    var v = this.condition[key];
                    var isShow = false;
                    var typeIsShow = false;
                    if (key == "GENERAL_APTITUDE")
                        if (v && baseInfo.aptitude >= v)
                            isShow = true;
                    if (key == "GENERAL_STAR")
                        if (v && generalInfo.star >= v)
                            isShow = true;
                    if (key == "GENERAL_TYPE1")
                        if (v && baseInfo.type == v)
                            isShow = true;
                    if (key == "GENERAL_TYPE2")
                        if (v && baseInfo.type == v)
                            isShow = true;
                    if (key == "GENERAL_TYPE3")
                        if (v && baseInfo.type == v)
                            isShow = true;
                    if (isShow)
                        indexArr.push(index);
                    index++;
                }
            }
            var allCondition = [1, 2, 3, 4];
            for (var _b = 0, allCondition_1 = allCondition; _b < allCondition_1.length; _b++) {
                var v = allCondition_1[_b];
                if (indexArr.indexOf(v) != -1)
                    continue;
                var keys_4 = Object.keys(this.condition);
                if (this["imgCondition" + v].visible) {
                    this["imgCondition" + v].source = zj.cachekey(zj[keys_4[v - 1]][this.condition[keys_4[v - 1]]][0], this);
                    for (var i = 0; i < this.conditionSelArr.length; i++) {
                        if (v == this.conditionSelArr[i]) {
                            this.conditionSelArr[i] = null;
                        }
                    }
                }
            }
        };
        WorkSend_SelectHero.prototype.onBtnGroupHero1 = function () {
            if (this.hunterSelArr.length >= 1 && this.hunterSelArr[0] != null) {
                this.hunterSelArr[0] = null;
                this.setConditionUnSel();
                this.setHeroInfo();
            }
        };
        WorkSend_SelectHero.prototype.onBtnGroupHero2 = function () {
            if (this.hunterSelArr.length >= 2 && this.hunterSelArr[1] != null) {
                this.hunterSelArr[1] = null;
                this.setConditionUnSel();
                this.setHeroInfo();
            }
        };
        WorkSend_SelectHero.prototype.onBtnGroupHero3 = function () {
            if (this.hunterSelArr.length >= 3 && this.hunterSelArr[2] != null) {
                this.hunterSelArr[2] = null;
                this.setConditionUnSel();
                this.setHeroInfo();
            }
        };
        WorkSend_SelectHero.prototype.onBtnGroupHero4 = function () {
            if (this.hunterSelArr.length >= 4 && this.hunterSelArr[3] != null) {
                this.hunterSelArr[3] = null;
                this.setConditionUnSel();
                this.setHeroInfo();
            }
        };
        WorkSend_SelectHero.prototype.onBtnType1 = function () {
            if (this.type == HERO_TYPE.QIANGHUA) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.QIANGHUA;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnType2 = function () {
            if (this.type == HERO_TYPE.FANGCHU) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.FANGCHU;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnType3 = function () {
            if (this.type == HERO_TYPE.JUXIAN) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.JUXIAN;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnType4 = function () {
            if (this.type == HERO_TYPE.TEZHI) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.TEZHI;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnType5 = function () {
            if (this.type == HERO_TYPE.BIANHUA) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.BIANHUA;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnType6 = function () {
            if (this.type == HERO_TYPE.CAOZUO) {
                this.type = HERO_TYPE.ALLHERO;
            }
            else {
                this.type = HERO_TYPE.CAOZUO;
            }
            this.changeHeroList(this.type);
        };
        WorkSend_SelectHero.prototype.onBtnStart = function () {
            var condition = 0;
            for (var i = 0; i < Object.keys(this.condition).length; i++) {
                if (this.conditionSelArr[i] == null) {
                    for (var key in this.condition) {
                        if (key == Object.keys(this.condition)[i]) {
                            condition = this.condition[key];
                            break;
                        }
                    }
                    var str = zj[Object.keys(this.condition)[i]][condition][2];
                    zj.toast_warning("请选择一个" + str);
                    return;
                }
            }
            var arr = [];
            var self = this;
            for (var i = 0; i < this.hunterSelArr.length; i++) {
                if (this.hunterSelArr[i] != null)
                    arr.push(this.hunterSelArr[i].general_id);
            }
            zj.Game.PlayerInstanceSystem.StartSearchingReq(this.workInfo.id, arr).then(function (value) {
                self.close(zj.UI.HIDE_TO_TOP);
                zj.Game.EventManager.event(zj.GameEvent.WORK_SEND_START, self.workInfo.id);
            });
        };
        WorkSend_SelectHero.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return WorkSend_SelectHero;
    }(zj.Dialog));
    zj.WorkSend_SelectHero = WorkSend_SelectHero;
    __reflect(WorkSend_SelectHero.prototype, "zj.WorkSend_SelectHero");
    var _a, _b, _c, _d, _e;
})(zj || (zj = {}));
//# sourceMappingURL=WorkSend_SelectHero.js.map