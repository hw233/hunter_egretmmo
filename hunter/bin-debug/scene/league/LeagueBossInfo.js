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
    //公会BOSS界面（未开启挑战）
    //yuqingcaho
    var LeagueBossInfo = (function (_super) {
        __extends(LeagueBossInfo, _super);
        function LeagueBossInfo() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/league/LeagueBossInfoSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOpen, _this);
            _this.groupAdd.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onShowGoodProperty, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
                if (_this.timer)
                    _this.timer.stop();
            }, null);
            _this.init();
            _this.update();
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.update, _this);
            _this.timer.start();
            return _this;
        }
        LeagueBossInfo.prototype.init = function () {
            this.lbText.text = zj.RuleConfig.leagueAnimal;
            this.setAwardList();
            this.imgAwadBoard.source = zj.cachekey(zj.PlayerItemSystem.ItemFrame(message.EResourceType.RESOURCE_POWER), this);
            this.imgAwardIcon.source = zj.cachekey(zj.PlayerItemSystem.ItemPath(message.EResourceType.RESOURCE_POWER), this);
            var tblAnimals = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.leagueAnimal + ".json");
            this.lbBossName.text = tblAnimals[1].name;
            this.lbOpenNeed.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter_League.league_boss_cost, tblAnimals[1].consume_res);
            this.update();
            if (zj.Teach.isDone(zj.teachBattle.teachPartID_League_Boss) == false) {
                zj.Teach.CheckAndSetTeach(zj.teachBattle.teachPartID_League_Boss);
            }
        };
        LeagueBossInfo.prototype.update = function () {
            this.lbNum.text = zj.Game.PlayerLeagueSystem.BaseInfo.enliven_all.toString();
        };
        LeagueBossInfo.prototype.setAwardList = function () {
            var arr = new eui.ArrayCollection();
            var tblBoss = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.league_boss_reward + ".json");
            var leag = tblBoss[1].reward_goods;
            for (var i = 0; i < leag.length; i++) {
                arr.addItem({
                    goodsId: leag[i],
                    i: i,
                    father: this
                });
            }
            this.lstChangAward.itemRenderer = zj.LeagueBossInfoAwardItem;
            this.lstChangAward.dataProvider = arr;
        };
        LeagueBossInfo.prototype.onBtnOpen = function () {
            var _this = this;
            // toast("开坯挑战");
            zj.Game.PlayerLeagueSystem.leagueOpenBoss(1).then(function () {
                zj.Game.PlayerLeagueSystem.leagueInfo().then(function () {
                    zj.Game.PlayerLeagueSystem.leagueBossScene().then(function () {
                        zj.loadUI(zj.LeagueBossFighting)
                            .then(function (dialog) {
                            dialog.show(zj.UI.SHOW_FROM_TOP);
                            dialog.init();
                            _this.close();
                        });
                    });
                });
            });
        };
        LeagueBossInfo.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show) {
                this.removeChild(show);
            }
        };
        LeagueBossInfo.prototype.showGoodsProperty = function (ev) {
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            if (zj.PlayerItemSystem.ItemType(ev.data.info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                show.reSetGeneral();
            }
            show.name = "details";
            this.addChild(show);
        };
        LeagueBossInfo.prototype.onShowGoodProperty = function (e) {
            var info = new message.GoodsInfo();
            info.goodsId = message.EResourceType.RESOURCE_POWER;
            var show = zj.TipManager.ShowProp(info, this, e.localY * 0.75, e.stageX * 1.1, e.stageY);
            show.name = "details";
            this.addChild(show);
        };
        LeagueBossInfo.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return LeagueBossInfo;
    }(zj.Scene));
    zj.LeagueBossInfo = LeagueBossInfo;
    __reflect(LeagueBossInfo.prototype, "zj.LeagueBossInfo");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueBossInfo.js.map