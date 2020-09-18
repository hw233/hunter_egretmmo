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
    var BattleEnd_HeroItemUpgrade = (function (_super) {
        __extends(BattleEnd_HeroItemUpgrade, _super);
        function BattleEnd_HeroItemUpgrade() {
            var _this = _super.call(this) || this;
            // public scene;
            _this.generalId = -1;
            _this.generalMapId = -1;
            //public id = nil    
            _this.bWin = true;
            _this.bEmpty = false;
            _this.generalInfo = null;
            _this.total_tick = 0;
            _this.bFinish = false;
            _this.cssRole = null;
            //public cssUpWord = nil
            _this.isWordPlayed = false;
            _this.expProgress = null;
            _this.maxExp = 0;
            _this.distMaxExp = 0;
            _this.curExp = 0;
            _this.addExp = 0;
            _this.curLv = 0;
            _this.bakeLv = 0;
            _this.nowLv = 0;
            _this.nowExp = 0;
            _this.finalLv = 0;
            _this.expTick = 0;
            _this.curTotalExp = 0;
            _this.totalGetExp = 0;
            _this.bStart = false;
            _this.bHeroIn = false;
            _this.bLayerIn = false;
            _this.bExpIn = false;
            _this.bExpEnd = false;
            _this.tableLayers = [];
            _this.skinName = "resource/skins/battleEnd/BattleEndHeroItemUpgradeSkin.exml";
            zj.cachekeys(zj.UIResource["BattleEnd_HeroItemUpgrade"], null);
            _this.Init();
            return _this;
        }
        BattleEnd_HeroItemUpgrade.prototype.dataChanged = function () {
            this.SetItemInfo(this.data);
        };
        //初始化ui
        BattleEnd_HeroItemUpgrade.prototype.Init = function () {
            var _this = this;
            this.update = egret.setInterval(this.Update, this, 0, 1 / 60);
            zj.BattleSettle.updates.push(this.update);
            this.tableLayers = [this.SpriteFrame, this.SpriteIcon, this.LabelLv, this.SpriteBoard, this.SpriteExpBar];
            this.setVisible(false);
            this.NodeLevelUp.visible = false;
            this.proWidth = 84;
            this.SpriteExpBar.mask = this.SpriteExpBar1;
            this.Playing();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.update);
            }, this);
        };
        BattleEnd_HeroItemUpgrade.prototype.Playing = function () {
            this.bStart = true;
        };
        BattleEnd_HeroItemUpgrade.prototype.PlayWordUp = function () {
            if (this.isWordPlayed == true) {
                return;
            }
            this.isWordPlayed = true;
            this.NodeLevelUp.visible = true;
        };
        BattleEnd_HeroItemUpgrade.prototype.setVisible = function (tag) {
            for (var i = 0; i < this.tableLayers.length; i++) {
                this.tableLayers[i].visible = tag;
            }
            this.LabelAddExp.visible = tag;
        };
        BattleEnd_HeroItemUpgrade.prototype.Update = function (dt) {
            if (this.bStart == false) {
                return;
            }
            this.total_tick = this.total_tick + dt * 10000;
            if (this.total_tick >= 0 && this.bHeroIn == false && this.bEmpty == false) {
                this.bHeroIn = true;
            }
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.generalInfoComeTime * 1000 && this.bLayerIn == false) {
                this.bLayerIn = true;
                this.LayerFadeIn();
                if (this.bEmpty == true) {
                    this.bFinish = true;
                }
            }
            if (this.total_tick >= zj.ConstantConfig_BattleSettle.generalExpComeTime * 1000 && this.bExpIn == false && this.bEmpty == false) {
                this.bExpIn = true;
            }
            if (this.bExpIn == true && this.bExpEnd == false) {
                this.expTick = this.expTick + dt * 1000;
                if (this.expTick >= zj.ConstantConfig_BattleSettle.expPipeTick) {
                    this.expTick = this.expTick - zj.ConstantConfig_BattleSettle.expPipeTick;
                    var addValue = this.addExp;
                    var tmp = this.curExp + addValue;
                    if (tmp >= this.distMaxExp) {
                        addValue = this.distMaxExp - this.curExp;
                        if (addValue <= 0) {
                            addValue = 0;
                        }
                    }
                    this.curExp = this.curExp + addValue;
                    this.curTotalExp = this.curTotalExp + addValue;
                    if (this.curExp >= this.distMaxExp) {
                        if (this.curLv != this.finalLv) {
                            this.curExp = 0;
                            this.curLv = this.curLv + 1;
                            this.SetLv();
                            this.DealExp();
                            this.PlayWordUp();
                        }
                    }
                    if (this.curTotalExp >= this.totalGetExp) {
                        this.bExpEnd = true;
                        this.bFinish = true;
                        this.bStart = true;
                    }
                    this.SetExp();
                    this.SetAddTotalExp();
                }
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.DealNobody = function () {
        };
        BattleEnd_HeroItemUpgrade.prototype.SetItemInfo = function (info) {
            this.generalInfo = info.generalInfo;
            this.bEmpty = zj.yuan3(this.generalInfo == null || this.generalInfo.general_id <= 0, true, false);
            if (this.bEmpty == true) {
                this.DealNobody();
            }
            else {
                this.generalId = this.generalInfo.general_id;
                this.generalMapId = zj.TableBaseGeneral.Item(this.generalId % zj.CommonConfig.general_id_to_index_multiple).general_roleId;
                this.curExp = this.generalInfo.exp;
                this.curLv = this.generalInfo.level;
                this.bakeLv = this.curLv;
                var index = zj.Helper.getGeneralIndexById(this.generalId);
                var generalInfo = zj.Game.PlayerHunterSystem.queryAllHunters()[index];
                this.nowLv = generalInfo.level;
                this.nowExp = generalInfo.exp;
                var now_exp = zj.Helper.getGenerlBeforeTotalExp(this.nowLv, zj.PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10) + this.nowExp;
                var old_exp = zj.Helper.getGenerlBeforeTotalExp(this.bakeLv, zj.PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10) + this.generalInfo.exp;
                var get_exp = now_exp - old_exp;
                this.totalGetExp = get_exp;
                //有待优化
                this.finalLv = generalInfo.level;
                this.SetLv();
                this.SetHero();
                this.DealExp();
                this.DealProgress();
                // this.Init();
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.SetLv = function () {
            this.LabelLv.text = "Lv" + this.curLv;
        };
        BattleEnd_HeroItemUpgrade.prototype.SetHero = function () {
            var headPath = zj.PlayerHunterSystem.Head(this.generalInfo);
            var path_frame = zj.PlayerHunterSystem.Frame(this.generalInfo.general_id);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame) {
                this.SpriteIcon.source = zj.cachekey("wx_" + headPath, this);
            }
            else {
                this.SpriteIcon.source = zj.cachekey(headPath, this);
            }
            this.SpriteFrame.source = zj.cachekey(path_frame, this);
            var awakeLevel = this.generalInfo.awakePassive.level;
            this.SpriteIconAwaken.visible = false;
            if (this.generalInfo.star > 0 && this.generalInfo.star <= zj.Helper.getObjLen(zj.UIConfig.UIConfig_Role.heroStar)) {
                zj.Game.PlayerHunterSystem.allHuntersMap()[this.generalInfo.general_id].awakePassive.level;
                this.NodeStar.visible = true;
                zj.Helper.SetHeroAwakenStar(this.NodeStar, this.generalInfo.star, awakeLevel);
            }
            else {
                this.NodeStar.visible = false;
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.DealExp = function () {
            var instance = zj.TableLevel.Item(this.curLv);
            this.maxExp = instance.general_exp[zj.PlayerHunterSystem.Table(this.generalInfo.general_id).aptitude % 10 - 1];
            if (this.curLv == this.finalLv) {
                if (this.bakeLv == this.finalLv) {
                    this.distMaxExp = this.generalInfo.exp + this.totalGetExp;
                }
                else {
                    this.distMaxExp = this.nowExp;
                }
            }
            else {
                this.distMaxExp = this.maxExp;
            }
            this.addExp = Math.floor(this.totalGetExp * zj.ConstantConfig_BattleSettle.expPipeTick / zj.ConstantConfig_BattleSettle.expPipeTime);
            if (this.addExp <= 0) {
                this.addExp = 1;
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.DealProgress = function () {
            var percent = this.curExp / this.maxExp * 100;
            this.SpriteExpBar1.width = (this.proWidth / 100) * percent;
        };
        BattleEnd_HeroItemUpgrade.prototype.SetExp = function () {
            var percent = this.curExp / this.maxExp * 100;
            this.SpriteExpBar1.width = (this.proWidth / 100) * percent;
        };
        BattleEnd_HeroItemUpgrade.prototype.SetAddTotalExp = function () {
            if (message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL == zj.Gmgr.Instance.fightType || message.EFormationType.FORMATION_TYPE_INSTANCE_ELITE == zj.Gmgr.Instance.fightType) {
                if (this.curTotalExp == 0) {
                    if (this.bWin == true && this.bakeLv >= zj.CommonConfig.role_max_level) {
                        this.LabelAddExp.visible = true;
                        this.LabelAddExp.text = zj.TextsConfig.TextsConfig_HeroMain.full_level_simple;
                    }
                    else {
                        this.LabelAddExp.visible = false;
                    }
                }
                else {
                    this.LabelAddExp.visible = true;
                    this.LabelAddExp.text = "Exp+" + this.curTotalExp;
                }
            }
            else {
                this.LabelAddExp.visible = false;
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.LayerFadeIn = function () {
            var tableFade = null;
            if (this.bEmpty == true) {
                tableFade = [this.SpriteFrame];
            }
            else {
                tableFade = this.tableLayers;
            }
            for (var i = 0; i < tableFade.length; i++) {
                tableFade[i].visible = true;
                tableFade[i].alpha = 0;
                egret.Tween.get(tableFade[i]).to({ alpha: 1 }, zj.ConstantConfig_BattleSettle.generalInfoFadeTime);
            }
        };
        BattleEnd_HeroItemUpgrade.prototype.SetWinTag = function (bTag) {
            this.bWin = bTag;
        };
        BattleEnd_HeroItemUpgrade.prototype.isFinished = function () {
            return this.bFinish;
        };
        BattleEnd_HeroItemUpgrade.prototype.Close = function () {
            egret.clearInterval(this.update);
        };
        return BattleEnd_HeroItemUpgrade;
    }(eui.ItemRenderer));
    zj.BattleEnd_HeroItemUpgrade = BattleEnd_HeroItemUpgrade;
    __reflect(BattleEnd_HeroItemUpgrade.prototype, "zj.BattleEnd_HeroItemUpgrade");
})(zj || (zj = {}));
//# sourceMappingURL=BattleEnd_HeroItemUpgrade.js.map