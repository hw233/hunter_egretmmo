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
     * @author xingliwei
     *
     * @date 2019-5-21
     *
     * @class 贪婪之岛战报详情展示list子项 左
     */
    var LeagueWarPopItemMine = (function (_super) {
        __extends(LeagueWarPopItemMine, _super);
        function LeagueWarPopItemMine() {
            var _this = _super.call(this) || this;
            _this.maxHp = 0;
            _this.beforeHp = 0;
            _this.curHp = 0;
            _this.curHurt = 0;
            _this.maxValue = 0;
            _this.yes = true;
            _this.skinName = "resource/skins/league/LeagueWarPopItemMineSkin.exml";
            _this.SpriteRecover.mask = _this.SpriteRecoverbg;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        LeagueWarPopItemMine.prototype.dataChanged = function () {
            var data = this.data;
            if (this.data.itemtype == 0) {
                this.data.itemtype = 1;
                egret.Tween.get(this).to({ height: 0 }, 0).to({ height: 95 }, 200);
                egret.Tween.get(this.groupMain1).to({ x: -300 }, 0).to({ x: 50 }, 200).to({ x: 0 }, 50).call(function () {
                    data.father.LoadLeftGeneral();
                });
            }
            if (data.generalInfo) {
                this.LabelRecoverNum.text = ("Lv " + data.generalInfo.level);
            }
            if (data.father.leftData.length > 12) {
                if (data.index == 11) {
                    if (this.yes == true) {
                        this.yes = false;
                        data.father.LeftEnd();
                    }
                }
            }
            else {
                if (data.index == data.father.leftData.length - 1) {
                    if (this.yes == true) {
                        this.yes = false;
                        data.father.LeftEnd();
                    }
                }
            }
            if (data.itemInfo == undefined || data.itemInfo == null) {
                this.visible = false;
                return;
            }
            if (data.itemInfo.length <= 0) {
                this.visible = false;
                return;
            }
            else {
                this.visible = true;
            }
            if (this.data.itemInfo) {
                if (data.vis) {
                    data.vis = false;
                    data.father.LeftHpSub(data.itemInfo.cur_rage - data.itemInfo.cur_hp);
                }
            }
            this.maxHp = Math.floor(data.itemInfo.cur_bean);
            this.beforeHp = Math.floor(data.itemInfo.cur_rage);
            this.curHp = Math.floor(data.itemInfo.cur_hp);
            this.curHurt = Math.floor(data.itemInfo.cur_pos);
            this.maxValue = Math.floor(data.maxValue);
            this.isDead = data.itemInfo.is_dead;
            this.setProgress();
            this.SetGeneralInfo(data);
            this.DealProgress();
            this.runItemAction();
            if (this.data.itemtype == 1) {
                var a = void 0;
                if (this.data.father.vis == true) {
                    this.LabelHurtNum.text = (zj.Set.NumberUnit3(this.curHp) + "/" + zj.Set.NumberUnit3(this.maxHp));
                    a = this.SpriteRecover.width * (this.curHp / this.maxHp);
                }
                else {
                    this.LabelHurtNum.text = (zj.Set.NumberUnit3(this.beforeHp) + "/" + zj.Set.NumberUnit3(this.curHurt));
                    a = this.SpriteRecover.width * (this.beforeHp / this.curHurt);
                }
                if (data.itemtype == 1) {
                    egret.Tween.get(this.SpriteRecoverbg).to({ width: a }, 400);
                }
                this.data.itemtype = 2;
            }
            else {
                var a = void 0;
                if (this.data.father.vis == true) {
                    a = this.SpriteRecover.width * (this.curHp / this.maxHp);
                }
                else {
                    a = this.SpriteRecover.width * (this.beforeHp / this.curHurt);
                }
                this.SpriteRecoverbg.width = a;
            }
        };
        LeagueWarPopItemMine.prototype.runItemAction = function () {
            this.SpriteBoosTag.visible = this.data.itemInfo.is_dead;
        };
        LeagueWarPopItemMine.prototype.DealProgress = function () {
            // this.SpriteRecoverBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HP)
            // this.SpriteHurtBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HURT)
            // this.SpriteRecover.visible = (false)
        };
        LeagueWarPopItemMine.prototype.setBarType = function (barType) {
            var data = this.data;
            data.barType = barType;
            // this.imgRecoverBar.visible = (data.barType == TableEnum.Enum.FastResultBarType.HP);
            // this.imgHurtBar.visible = (data.barType == TableEnum.Enum.FastResultBarType.HURT);
            if (data.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.LabelHurtNum.text = (zj.Set.NumberUnit3(this.beforeHp) + "/" + zj.Set.NumberUnit3(this.maxHp));
            }
            else {
                this.LabelHurtNum.text = (zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_hurt, zj.Set.NumberUnit3(this.curHurt)));
            }
        };
        LeagueWarPopItemMine.prototype.setProgress = function () {
            var percent = zj.yuan3(this.maxValue == 0, 0, this.curHurt / this.maxValue * 100);
            // this.hurtProgress.setPercentage(0)
            var percent1 = zj.yuan3(this.maxHp == 0, 0, this.beforeHp / this.maxHp * 100);
            // this.recoverProgress:setPercentage(percent)
            if (this.data.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.LabelHurtNum.text = (zj.Set.NumberUnit3(this.beforeHp) + "/" + zj.Set.NumberUnit3(this.maxHp));
            }
            else {
                this.LabelHurtNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_hurt, zj.Set.NumberUnit3(this.curHurt));
            }
        };
        LeagueWarPopItemMine.prototype.SetGeneralInfo = function (data) {
            if (data.generalInfo) {
                this.LabelRecoverNum.text = ("Lv " + data.generalInfo.level);
            }
            var mpr = zj.fromGeneral(data.itemInfo.monster_id);
            if (data.generalInfo != null) {
                if (mpr != null) {
                    var headPath = zj.PlayerHunterSystem.Head(data.generalInfo);
                    this.SpriteHead.source = zj.cachekey(headPath, this);
                }
                else {
                    var mpr_1 = zj.TableMapRole.Item((data.generalInfo.fashionId));
                    if (mpr_1 != null) {
                        this.SpriteHead.source = zj.cachekey(mpr_1.head_path, this);
                    }
                    else {
                        zj.toast("LeagueWarPopItemMine" + 172 + "data.generalInfo.fashionId" + data.generalInfo.fashionId);
                    }
                }
            }
            this.SpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
            for (var i = 1; i <= zj.CommonConfig.general_max_star; i++) {
                if (i > data.generalInfo.star) {
                    this["SpriteStar" + i].visible = (false);
                }
                else {
                    this["SpriteStar" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.starOn, this);
                }
            }
            this.LabelPlayerPower.text = (zj.Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
        };
        return LeagueWarPopItemMine;
    }(eui.ItemRenderer));
    zj.LeagueWarPopItemMine = LeagueWarPopItemMine;
    __reflect(LeagueWarPopItemMine.prototype, "zj.LeagueWarPopItemMine");
    var LeagueWarPopItemMineData = (function () {
        function LeagueWarPopItemMineData() {
            this.vis = true;
        }
        return LeagueWarPopItemMineData;
    }());
    zj.LeagueWarPopItemMineData = LeagueWarPopItemMineData;
    __reflect(LeagueWarPopItemMineData.prototype, "zj.LeagueWarPopItemMineData");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueWarPopItemMine.js.map