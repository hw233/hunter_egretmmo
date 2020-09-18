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
    //公会BOSS-庆功宴Item
    //yuqingchao
    //2019.03.11
    var LeagueBossCelebrateFood = (function (_super) {
        __extends(LeagueBossCelebrateFood, _super);
        function LeagueBossCelebrateFood() {
            var _this = _super.call(this) || this;
            _this.process = null;
            _this.skinName = "resource/skins/league/LeagueBossCelebrateFoodSkin.exml";
            _this.btnEat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEat, _this);
            _this.btnGraEat.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnGraEat, _this);
            _this.btnAddFood.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnAddFood, _this);
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, _this.refreash, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, _this.refreash, _this);
            }, null);
            return _this;
        }
        LeagueBossCelebrateFood.prototype.dataChanged = function () {
            var i = this.data.i;
            this.type = this.data.type;
            var num = this.data.num;
            this.refreash();
        };
        LeagueBossCelebrateFood.prototype.refreash = function () {
            if (this.type == zj.TableEnum.Enum.League_CelebrateType.NORMAL) {
                this.setNormal();
            }
            if (this.type == zj.TableEnum.Enum.League_CelebrateType.ADD) {
                this.setAdd();
            }
        };
        LeagueBossCelebrateFood.prototype.setNormal = function () {
            var tm = zj.Game.PlayerLeagueSystem.Member.party_time;
            this.btnEat.visible = true;
            this.btnAddFood.visible = false;
            this.btnGraEat.visible = false;
            this.imgBack.visible = false;
            this.imgGold.visible = false;
            this.lbMoney.visible = false;
            this.lbAdd.visible = false;
            var a = zj.Game.PlayerLeagueSystem.Member.party_time;
            if (zj.Game.PlayerLeagueSystem.Member.party_time == 0) {
                this.btnEat.enabled = true;
            }
            else if (zj.Game.PlayerLeagueSystem.Member.party_time > 0) {
                this.btnEat.enabled = false;
            }
            this.imgFood.source = zj.cachekey(zj.UIConfig.UIConfig_League.leagueAddFood[0], this);
        };
        LeagueBossCelebrateFood.prototype.setAdd = function () {
            this.btnEat.visible = false;
            this.btnAddFood.visible = false;
            this.btnGraEat.visible = false;
            this.process = zj.Table.FindR(zj.Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
                if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
                    return true;
                }
            })[0];
            this.imgFood.source = zj.cachekey(zj.UIConfig.UIConfig_League.leagueAddFood[1], this);
            if (this.process.info == 0) {
                zj.Helper.SetImageFilterColor(this.imgFood, "gray");
                this.btnAddFood.visible = true;
                this.imgBack.visible = true;
                this.lbAdd.visible = true;
                this.imgGold.visible = true;
                this.lbMoney.visible = true;
                this.lbMoney.text = zj.CommonConfig.league_party_add_consume.toString();
                this.lbAdd.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_celeNoAdd, zj.CommonConfig.league_party_power));
            }
            else {
                zj.Helper.SetImageFilterColor(this.imgFood, null);
                this.btnGraEat.visible = true;
                this.imgBack.visible = true;
                this.lbAdd.visible = true;
                this.btnAddFood.visible = false;
                this.imgGold.visible = false;
                this.lbMoney.visible = false;
                var info_1 = this.process.info;
                var mem = zj.Table.FindR(zj.Game.PlayerLeagueSystem.Members, function (k, v) {
                    if (v.monarchbase.id == info_1) {
                        return true;
                    }
                });
                var name_1 = mem[0].monarchbase.name;
                if (mem[0] == null) {
                    var des = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_celeAdd, zj.TextsConfig.TextConfig_League.animal_noName);
                    this.lbAdd.textFlow = zj.Util.RichText(des);
                }
                else {
                    this.lbAdd.textFlow = zj.Util.RichText(zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextConfig_League.animal_celeAdd, name_1));
                }
                if (zj.Game.PlayerLeagueSystem.Member.party_time_add == 0) {
                    this.btnGraEat.enabled = true;
                }
                else if (zj.Game.PlayerLeagueSystem.Member.party_time_add > 0) {
                    this.btnGraEat.enabled = false;
                }
            }
        };
        LeagueBossCelebrateFood.prototype.onBtnEat = function () {
            this.leagueParty(false);
        };
        LeagueBossCelebrateFood.prototype.onBtnGraEat = function () {
            this.leagueParty(true);
        };
        LeagueBossCelebrateFood.prototype.onBtnAddFood = function () {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leaguePartyAdd().then(function () {
                _this.setAdd();
                zj.toast_success(zj.LANG(zj.TextsConfig.TextConfig_League.animal_celeAddSuccess));
            });
        };
        LeagueBossCelebrateFood.prototype.leagueParty = function (is_add) {
            var _this = this;
            zj.Game.PlayerLeagueSystem.leagueParty(is_add).then(function () {
                _this.refreash();
                var str_power = zj.Helper.StringFormat("+%d", zj.CommonConfig.league_party_power);
                zj.Game.EventManager.event(zj.GameEvent.SHOW_COMMON_MESSAGE, { source: "ui_currencyicon_IconStrength_png", text: str_power });
            });
        };
        return LeagueBossCelebrateFood;
    }(eui.ItemRenderer));
    zj.LeagueBossCelebrateFood = LeagueBossCelebrateFood;
    __reflect(LeagueBossCelebrateFood.prototype, "zj.LeagueBossCelebrateFood");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossCelebrateFood.js.map