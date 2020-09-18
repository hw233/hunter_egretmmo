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
     * @class 贪婪之岛战报详情展示list子项 右
     */
    var LeagueWarPopItemEnemy = (function (_super) {
        __extends(LeagueWarPopItemEnemy, _super);
        function LeagueWarPopItemEnemy() {
            var _this = _super.call(this) || this;
            _this.maxHp = 0;
            _this.beforeHp = 0;
            _this.curHp = 0;
            _this.curHurt = 0;
            _this.maxValue = 0;
            _this.yes = true;
            _this.skinName = "resource/skins/league/LeagueWarPopItemEnemySkin.exml";
            _this.SpriteHurt.mask = _this.SpriteHurtbg;
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            return _this;
        }
        LeagueWarPopItemEnemy.prototype.dataChanged = function () {
            var data = this.data;
            if (this.data.itemtype == 0) {
                this.data.itemtype = 1;
                egret.Tween.get(this).to({ height: 0 }, 0).to({ height: 95 }, 200);
                egret.Tween.get(this.groupMain1).to({ x: 300 }, 0).to({ x: -50 }, 200).to({ x: 0 }, 50).call(function () {
                    data.father.LoadRightGeneral();
                });
            }
            if (data.generalInfo) {
                this.LabelHurtNum.text = ("Lv " + data.generalInfo.level);
            }
            if (data.father.rightData.length > 12) {
                if (data.index == 11) {
                    if (this.yes == true) {
                        this.yes = false;
                        data.father.RightEnd();
                    }
                }
            }
            else {
                if (data.index == data.father.rightData.length - 1) {
                    if (this.yes == true) {
                        this.yes = false;
                        data.father.RightEnd();
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
                    data.father.RightHpSub(data.itemInfo.cur_rage - data.itemInfo.cur_hp);
                }
            }
            this.maxHp = Math.floor(data.itemInfo.cur_bean);
            this.beforeHp = Math.floor(data.itemInfo.cur_rage);
            this.curHp = Math.floor(data.itemInfo.cur_hp);
            this.curHurt = Math.floor(data.itemInfo.cur_pos);
            this.maxValue = Math.floor(data.maxValue);
            this.isDead = data.itemInfo.is_dead;
            var mpr = zj.fromGeneral(data.itemInfo.monster_id);
            if (data.generalInfo) {
                if (mpr != null) {
                    var headPath = zj.PlayerHunterSystem.Head(data.generalInfo);
                    this.SpriteHead.source = zj.cachekey(headPath, this);
                }
                else {
                    mpr = zj.TableMapRole.Item(data.generalInfo.fashionId);
                    if (mpr != null) {
                        this.SpriteHead.source = zj.cachekey(mpr.head_path, this);
                    }
                }
            }
            this.SpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
            // let gap = Helper.getSpriteGap(this.SpriteStar1, this.SpriteStar2)
            // let posList = getLinePosition(ccp(sx, sy), gap, this.generalInfo.star)
            this.runItemAction();
            this.SetGeneralInfo(data);
            for (var i = 1; i <= zj.CommonConfig.general_max_star; i++) {
                if (i > data.generalInfo.star) {
                    this["SpriteStar" + i].visible = (false);
                }
                else {
                    this["SpriteStar" + i].sourcr = (zj.UIConfig.UIConfig_Role.starOn);
                    // this["SpriteStar"+ i]:setPosition(posList[i])
                }
            }
            // this.LabelPlayerPower.text = (Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
            if (this.data.itemtype == 1) {
                var a = void 0;
                if (this.data.father.vis == true) {
                    // this.LabelHurtNum.text = (Set.NumberUnit3(this.curHp) + "/" + Set.NumberUnit3(this.maxHp))
                    a = this.SpriteHurt.width * (this.curHp / this.maxHp);
                }
                else {
                    // this.LabelHurtNum.text = (Set.NumberUnit3(this.beforeHp) + "/" + Set.NumberUnit3(this.curHurt))
                    a = this.SpriteHurt.width * (this.curHurt / this.beforeHp);
                }
                if (data.itemtype == 1) {
                    egret.Tween.get(this.SpriteHurtbg).to({ width: a }, 400);
                }
                this.data.itemtype = 2;
            }
            else {
                var a = void 0;
                if (this.data.father.vis == true) {
                    a = this.SpriteHurt.width * (this.curHp / this.maxHp);
                }
                else {
                    a = this.SpriteHurt.width * (this.curHurt / this.beforeHp);
                }
                this.SpriteHurtbg.width = a;
            }
        };
        LeagueWarPopItemEnemy.prototype.DealProgress = function () {
            // this.SpriteRecoverBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HP)
            // this.SpriteHurtBar.visible = (this.data.barType == TableEnum.Enum.FastResultBarType.HURT)
            this.SpriteHurt.visible = (false);
        };
        LeagueWarPopItemEnemy.prototype.runItemAction = function () {
            this.SpriteBossTag.visible = this.data.itemInfo.is_dead;
        };
        LeagueWarPopItemEnemy.prototype.setProgress = function (data) {
            // let percent = yuan3(this.maxValue == 0, 0, this.curHurt / this.maxValue * 100)
            // this.hurtProgress:setPercentage(0)
            var percent = zj.yuan3(this.maxHp == 0, 0, this.beforeHp / this.maxHp * 100);
            // this.recoverProgress:setPercentage(percent)
            if (data.barType == zj.TableEnum.Enum.FastResultBarType.HP) {
                this.LabelHurtNum.text = (zj.Set.NumberUnit3(data.beforeHp) + "/" + zj.Set.NumberUnit3(this.maxHp));
            }
            else {
                this.LabelHurtNum.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_League.war_fast_hurt, zj.Set.NumberUnit3(this.curHurt));
            }
        };
        LeagueWarPopItemEnemy.prototype.SetGeneralInfo = function (data) {
            var mpr = zj.fromGeneral(data.itemInfo.monster_id);
            if (mpr != null) {
                var headPath = zj.PlayerHunterSystem.Head(data.generalInfo);
                this.SpriteHead.source = zj.cachekey(headPath, this);
            }
            else {
                var mpr_1 = zj.TableMapRole.Item((data.generalInfo.fashionId));
                if (mpr_1 != null) {
                    this.SpriteHead.source = zj.cachekey(mpr_1.head_path, this);
                }
            }
            this.SpriteFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
            // let gap = getSpriteGap(this.SpriteStar1, this.SpriteStar2)
            // let posList = getLinePosition(ccp(sx, sy), gap, this.generalInfo.star)
            for (var i = 1; i <= zj.CommonConfig.general_max_star; i++) {
                if (i > data.generalInfo.star) {
                    this["SpriteStar" + i].visible = (false);
                }
                else {
                    this["SpriteStar" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.starOn, this);
                    // this["SpriteStar" + i]:setPosition(posList[i])
                }
            }
            this.LabelHurtNum.text = ("Lv " + data.generalInfo.level);
            this.LabelPlayerPower.text = (zj.Set.numberUnitBattleValue(Math.floor(data.generalInfo.battleValue)));
        };
        return LeagueWarPopItemEnemy;
    }(eui.ItemRenderer));
    zj.LeagueWarPopItemEnemy = LeagueWarPopItemEnemy;
    __reflect(LeagueWarPopItemEnemy.prototype, "zj.LeagueWarPopItemEnemy");
    var LeagueWarPopItemEnemyData = (function () {
        function LeagueWarPopItemEnemyData() {
            this.vis = true;
        }
        return LeagueWarPopItemEnemyData;
    }());
    zj.LeagueWarPopItemEnemyData = LeagueWarPopItemEnemyData;
    __reflect(LeagueWarPopItemEnemyData.prototype, "zj.LeagueWarPopItemEnemyData");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueWarPopItemEnemy.js.map