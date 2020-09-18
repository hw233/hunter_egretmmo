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
     * 2019.11.21
     * xingliwei
     * @class 公会技能界面
     */
    var LeagueSkill = (function (_super) {
        __extends(LeagueSkill, _super);
        function LeagueSkill() {
            var _this = _super.call(this) || this;
            _this.array = new eui.ArrayCollection();
            _this.levels = [];
            /**1:攻击型 2：防御型 3：辅助型 */
            _this.type = 1;
            _this.skinName = "resource/skins/league/LeagueSkillSkin.exml";
            _this.init();
            return _this;
        }
        LeagueSkill.prototype.init = function () {
            for (var i = 1; i <= 6; i++) {
                this["imgSkillIcon" + i].mask = this["imgSkillIconbg" + i];
            }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
            this.btnType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType1, this);
            this.btnType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType2, this);
            this.btnType3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType3, this);
            this.tableSkillInfo = zj.TableLeagueSkill.Table();
            this.tableLevel = zj.TableLevel.Table();
            this.onBtnType1();
        };
        /**点击攻击 */
        LeagueSkill.prototype.onBtnType1 = function () {
            this.btnType(1);
        };
        /**点击防御 */
        LeagueSkill.prototype.onBtnType2 = function () {
            this.btnType(2);
        };
        /**点击辅助 */
        LeagueSkill.prototype.onBtnType3 = function () {
            this.btnType(3);
        };
        /**设置按钮是否选中 */
        LeagueSkill.prototype.btnType = function (type) {
            var self = this;
            self.setSkillLevelInfo();
            self.type = type;
            for (var j = 1; j <= 3; j++) {
                self["btnType" + j].enabled = true;
            }
            self["btnType" + type].enabled = false;
            var a = [];
            var _loop_1 = function (i) {
                self["labelSkillName" + i].text = zj.TextsConfig.TextsConfig_Potato.AttriStr[self.tableSkillInfo[i + (type - 1) * 6].attri_type - 1];
                self["imgSkillIcon" + i].source = self.getimg(self.tableSkillInfo[i + (type - 1) * 6].attri_type);
                self["imgSkillFrame" + i].visible = false;
                self["labelSkillName" + i].strokeColor = 0x000000; //描边颜色
                self["labelSkillName" + i].stroke = 3;
                var num = 0;
                for (var k = 0; k < self.levels[i + (type - 1) * 6 - 1].value; k++) {
                    num += self.tableSkillInfo[i + (type - 1) * 6].attri_value[k];
                }
                var type1 = self.tableSkillInfo[i + (type - 1) * 6].attri_type;
                if (type1 == 24) {
                    self["labelSkillElevate" + i].text = "+" + num.toFixed(1);
                }
                else {
                    self["labelSkillElevate" + i].text = "+" + num.toFixed(1) + "%";
                }
                //self.levels[i + (type - 1) * 6 - 1].value >= self.tableLevel[Game.PlayerLeagueSystem.BaseInfo.level].league_skill || self.levels[i + (type - 1) * 6 - 1].value == 0
                if (self.levels[i + (type - 1) * 6 - 1].value <= self.levels[self.getSkill() + (type - 1) * 6].value) {
                    zj.Helper.SetImageFilterColor(self["imgSkillIcon" + i], "gray");
                    self["imgSkillbg" + i].visible = false;
                }
                else {
                    zj.Helper.SetImageFilterColor(self["imgSkillIcon" + i], null);
                    self["imgSkillbg" + i].visible = true;
                }
                var b = zj.Table.FindR(a, function (k, v) {
                    return v[0] == self.tableSkillInfo[i + (type - 1) * 6].attri_type;
                });
                if (b[0]) {
                    a[b[1]][1] += num;
                }
                else {
                    a.push([self.tableSkillInfo[i + (type - 1) * 6].attri_type, num, zj.TextsConfig.TextsConfig_Potato.AttriStr[self.tableSkillInfo[i + (type - 1) * 6].attri_type - 1], type1]);
                }
            };
            for (var i = 1; i <= 6; i++) {
                _loop_1(i);
            }
            self.loadList(a);
            var index = self.getSkill();
            self["imgSkillFrame" + (index + 1)].visible = true;
            var n1 = self.tableSkillInfo[(index + 1) + (type - 1) * 6].consume_coin[self.levels[index + (type - 1) * 6].value] || 0;
            var n2 = self.tableSkillInfo[(index + 1) + (type - 1) * 6].consume_money[self.levels[index + (type - 1) * 6].value] || 0;
            self.setInfo(n1, n2);
            self.skillIndex = ((index + 1) + (type - 1) * 6);
            self.labelSkillLevel.text = self.levels[index + (type - 1) * 6].value.toString();
        };
        /**设置技能等级信息 */
        LeagueSkill.prototype.setSkillLevelInfo = function () {
            var info = zj.Game.PlayerLeagueSystem.Member.skillLevel;
            var _loop_2 = function (i) {
                var a = zj.Table.FindR(info, function (k, v) {
                    return v.key == (i + 1);
                })[0];
                if (a) {
                    this_1.levels[i] = a;
                }
                else {
                    var a_1 = new message.IIKVPairs();
                    a_1.key = i;
                    a_1.value = 0;
                    this_1.levels[i] = a_1;
                }
            };
            var this_1 = this;
            for (var i = 0; i < 18; i++) {
                _loop_2(i);
            }
        };
        /**获取第几个技能 */
        LeagueSkill.prototype.getSkill = function () {
            var info = [];
            for (var i = 0; i < 6; i++) {
                info.push(this.levels[(i + (this.type - 1) * 6)]);
            }
            for (var i = 0; i < info.length; i++) {
                if (i != info.length - 1) {
                    if (info[i + 1].value < info[i].value) {
                        return (i + 1);
                    }
                }
                else {
                    if (info[info.length - 1].value == info[0].value) {
                        return 0;
                    }
                }
            }
        };
        LeagueSkill.prototype.loadList = function (info) {
            this.array.removeAll();
            for (var i = 0; i < info.length; i++) {
                var data = new zj.LeagueSkillItemData();
                data.index = i;
                data.info = info[i];
                data.father = this;
                this.array.addItem(data);
            }
            this.listBonuses.dataProvider = this.array;
            this.listBonuses.itemRenderer = zj.LeagueSkillItem;
        };
        LeagueSkill.prototype.setInfo = function (n1, n2) {
            //公会币消耗数量
            var a = zj.PlayerItemSystem.Str_Resoure(20007);
            this.labelConsortiaGold.text = n1 + "/" + a;
            //金币消耗数量
            var token = zj.Game.PlayerInfoSystem.Coin;
            var text = "";
            if (token > 100000) {
                text = Math.floor((token / 10000) * 10) / 10 + "万";
            }
            else {
                text = token.toString();
            }
            this.labelGold.text = n2 + "/" + text;
        };
        /**点击升级 */
        LeagueSkill.prototype.onBtnUpgrade = function () {
            var _this = this;
            this.leagueSkillUp(this.skillIndex).then(function (gameInfo) {
                _this.btnType(_this.type);
            }).catch(function () {
            });
        };
        /**公会技能升级请求 */
        LeagueSkill.prototype.leagueSkillUp = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.LeagueSkillUpRequest();
                request.body.type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        LeagueSkill.prototype.getimg = function (type) {
            var src = [
                "skill_icon_leiouli04_png",
                "skill_icon_lianji_png",
                "skill_icon_gaofangyu_png",
                "skill_icon_danti_png",
                "效果抵抗",
                "ui_union_skill_icon_baoshang_2_png",
                "x技能暴击",
                "skill_icon_yinda01_png",
                "skill_icon_break_icon_fangyuzengshang_png",
                "格挡率",
                "忽视格挡",
                "忽视防御",
                "x忽视魔防",
                "x终伤附加",
                "x终伤减免",
                "怒气减免",
                "x攻击",
                "x防御",
                "x暴击",
                "x忽视防御",
                "异常抵抗",
                "忽视异常抵抗",
                "浮空抵抗",
                "skill_icon_shuishou01_png",
                "援护怒气",
            ];
            return zj.cachekey(src[type - 1], this);
        };
        LeagueSkill.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueSkill;
    }(zj.Dialog));
    zj.LeagueSkill = LeagueSkill;
    __reflect(LeagueSkill.prototype, "zj.LeagueSkill");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueSkill.js.map