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
     * @date 2019-6-17
     *
     * @class 贪婪之岛世界Boos结算
     */
    var ZorkBossEnd = (function (_super) {
        __extends(ZorkBossEnd, _super);
        function ZorkBossEnd() {
            var _this = _super.call(this) || this;
            // public imgTip: eui.Image;
            _this.win = [
                _this.imgWinStar,
                _this.imgWinSword,
                _this.imgWinFlag,
                _this.imgWinLoge,
            ];
            _this.lose = [
                _this.imgLoseSword,
                _this.imgLoseFlag,
                _this.imgLoseLogo,
            ];
            _this.isWin = false;
            _this.rank = [];
            _this.display_num = 10;
            _this.bossBlood = 0;
            _this.skinName = "resource/skins/battleEnd/ZorkBossEndSkin.exml";
            _this.init();
            return _this;
        }
        ZorkBossEnd.prototype.init = function () {
            // egret.Tween.get(this.imgTip, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
            this.imgMyPer.mask = this.imgMyPerBg;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            if (zj.Game.PlayerZorkSystem.zorkBoss.resultInfo) {
                var data = zj.Game.PlayerZorkSystem.zorkBoss.resultInfo;
                this.isWin = data.is_kill;
                this.bossBlood = data.max_hp;
            }
            this.win = [
                this.imgWinStar,
                this.imgWinSword,
                this.imgWinFlag,
                this.imgWinLoge,
            ];
            this.lose = [
                this.imgLoseSword,
                this.imgLoseFlag,
                this.imgLoseLogo,
            ];
            this.SetInfoList();
            this.SetInfoItem();
        };
        ZorkBossEnd.prototype.SetInfoList = function () {
            this.rank = zj.Game.PlayerZorkSystem.zorkBoss.rankItems;
            var rank = this.rank;
            this.display_num = rank.length >= this.display_num ? this.display_num : rank.length;
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.display_num; i++) {
                var data = new zj.ZorkBossEndItemData();
                data.info = rank[i];
                data.blood = this.bossBlood;
                array.addItem(data);
            }
            this.listViewList.dataProvider = array;
            this.listViewList.itemRenderer = zj.ZorkBossEndItem;
            this.UpdateMyRank();
        };
        ZorkBossEnd.prototype.UpdateMyRank = function () {
            var rank = 0;
            this.labelMyRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.disAttend);
            this.imgicon.source = zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picId);
            this.imgMyFrame.source = zj.PlayerItemSystem.ItemPath(zj.Game.PlayerInfoSystem.BaseInfo.picFrameId);
            this.labelMyName.text = (zj.Game.PlayerInfoSystem.BaseInfo.name);
            this.labelMyAtk.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.role_level, zj.Game.PlayerInfoSystem.BaseInfo.level);
            var roleInfo = zj.Game.PlayerZorkSystem.zorkBoss.roleInfo;
            if (roleInfo) {
                var a = (roleInfo.bossHurt / this.bossBlood * 100);
                if (a >= 100) {
                    a = 100;
                }
                this.imgMyPerBg.width = 276 * a / 100;
                this.labelPer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.NumberUnit4(roleInfo.bossHurt), a.toFixed(2));
            }
            for (var k in this.rank) {
                if (this.rank.hasOwnProperty(k)) {
                    var v = this.rank[k];
                    if (zj.Game.PlayerInfoSystem.BaseInfo.id == v.baseInfo.id) {
                        var rank_1 = v.rank;
                        this.labelMyRank.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.rewardRank, rank_1);
                        var percent = v.value / this.bossBlood * 100;
                        if (percent > 100) {
                            percent = 100;
                        }
                        this.imgMyPerBg.width = 276 * percent / 100;
                        this.labelPer.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.perDemage, zj.Set.NumberUnit4(v.value), percent.toFixed(2));
                    }
                }
            }
        };
        ZorkBossEnd.prototype.SetInfoItem = function () {
            var data = zj.Game.PlayerZorkSystem.zorkBoss.resultInfo;
            var str_killer = data.kill_name;
            var str_demage = data.max_hp - data.cur_hp;
            var str_per = str_demage / data.max_hp;
            for (var k in this.win) {
                if (this.win.hasOwnProperty(k)) {
                    var v = this.win[k];
                    if (v) {
                        v.visible = this.isWin;
                    }
                }
            }
            for (var k in this.lose) {
                if (this.lose.hasOwnProperty(k)) {
                    var v = this.lose[k];
                    if (v) {
                        v.visible = !this.isWin;
                    }
                }
            }
            if (this.isWin) {
                this.labelDemage.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.winKill, str_killer));
            }
            else {
                this.labelDemage.textFlow = zj.Util.RichText(zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.loseKill, zj.Set.NumberUnit3(str_demage), str_per * 100));
            }
        };
        ZorkBossEnd.prototype.onBtnClose = function () {
            zj.StageSceneManager.Instance.clearScene();
            this.close();
            // Game.UIManager.popAllScenesAndDialogs(() => {
            // 	// loadUI(WonderlandScene)
            // 	// 	.then((scene: WonderlandScene) => {
            // 	// 		scene.show(UI.SHOW_FILL_OUT);
            // 	// 		scene.init();
            // 	// 	});
            // 	SceneManager.instance.EnterSceneZorkBoss()
            // });
            zj.SceneManager.instance.EnterSceneZorkBoss();
        };
        return ZorkBossEnd;
    }(zj.Dialog));
    zj.ZorkBossEnd = ZorkBossEnd;
    __reflect(ZorkBossEnd.prototype, "zj.ZorkBossEnd");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossEnd.js.map