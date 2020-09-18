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
    //贪婪之岛-寿富拉比(世界BOOS)
    //yuqingchao
    //2019.03.14
    var ZorkBossMainPop = (function (_super) {
        __extends(ZorkBossMainPop, _super);
        function ZorkBossMainPop() {
            var _this = _super.call(this) || this;
            _this.openLevel = 36;
            _this.bossState = null;
            _this.expsave = 0;
            _this.skinName = "resource/skins/zork/ZorkBossMainPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRule, _this); //说明按钮监听
            _this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnEnter, _this); //进入战场按钮监听
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.clearInterval(_this.upDateboss);
                egret.clearInterval(_this.update);
            }, null);
            _this.init();
            return _this;
        }
        ZorkBossMainPop.prototype.init = function () {
            this.groupAward.visible = false;
            this.groupRank.visible = false;
            this.reward = zj.PlayerZorkSystem.GetWonderlandBossRankGoodsTbl(zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level);
            this.freshList(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
            this.setInfo();
            this.initBlood();
            this.upDate();
            this.upDateBoss();
            this.judgeKill = false;
            this.isRewardTip = true;
            this.imgBlood.mask = this.imgExpBoart;
            this.upDateboss = egret.setInterval(this.upDateBoss, this, 3000);
            this.update = egret.setInterval(this.upDate, this, 990);
        };
        ZorkBossMainPop.prototype.isFullScreen = function () {
            return true;
        };
        ZorkBossMainPop.prototype.setInfo = function () {
            var level;
            var name = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_name == 0 && zj.TextsConfig.TextsConfig_WonderlandBoss.bossName || zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_name;
            if (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level != null) {
                level = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level;
            }
            else {
                level = this.openLevel;
            }
            this.lbLevel.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.bossLevel, level);
            this.setIsKill(true);
        };
        ZorkBossMainPop.prototype.setRewardList = function () {
            if (!this.arrayCollection1) {
                var lastRewardTbl = [];
                var goods = new message.GoodsInfo;
                goods.goodsId = zj.CommonConfig.scene_boss_kill_reward[0];
                goods.count = zj.CommonConfig.scene_boss_kill_reward[1];
                goods.showType = 1;
                lastRewardTbl.push(goods);
                //伤害奖励列表
                this.arrayCollection1 = new eui.ArrayCollection();
                var a = this.reward;
                for (var k in this.reward) {
                    this.arrayCollection1.addItem({
                        info: this.reward[k],
                        boold: true,
                        father: this,
                    });
                }
                this.lstAward.itemRenderer = zj.ZorkBossMainPopItem;
                this.lstAward.dataProvider = this.arrayCollection1;
                //最后一击奖励列表
                this.arrayCollection2 = new eui.ArrayCollection();
                for (var i = 0; i < 1; i++) {
                    this.arrayCollection2.addItem({
                        i: i,
                        info: lastRewardTbl,
                        boold: false,
                        father: this,
                    });
                }
                this.lstViewKillReward.itemRenderer = zj.ZorkBossMainPopItem;
                this.lstViewKillReward.dataProvider = this.arrayCollection2;
            }
        };
        //伤害列表
        ZorkBossMainPop.prototype.setRankList = function () {
            // Game.PlayerZorkSystem.bossRank().then(() => {
            var blood = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.bossInfo.monster_pos3[0].baseInfo.monster_hp;
            var display_num = 20;
            var rank = zj.Game.PlayerZorkSystem.zorkBoss.rankItems;
            if (rank.length >= display_num) {
                display_num = display_num;
            }
            else {
                display_num = rank.length;
            }
            this.arrayCollection3 = new eui.ArrayCollection();
            for (var i = 0; i < display_num; i++) {
                this.arrayCollection3.addItem({
                    info: rank[i],
                    hp: blood
                });
            }
            this.lstHit.itemRenderer = zj.ZorkBossMainPopHitItem;
            this.lstHit.dataProvider = this.arrayCollection3;
            // });
        };
        //更新
        ZorkBossMainPop.prototype.upDate = function () {
            var _this = this;
            this.upDateBase();
            this.upDateUI(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
            this.freshList(zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
            zj.Game.PlayerZorkSystem.bossInfo().then(function () {
                _this.refreshBlood();
            });
        };
        //进去战场按钮的显示变化
        ZorkBossMainPop.prototype.upDateBase = function () {
            var progress = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
            if (progress != null) {
                if (this.bossState != progress.info) {
                    this.bossState = progress.info;
                }
            }
            if (this.bossState != 0 && zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre > 0) {
                this.btnEnter.enabled = true;
                this.btnEnter.touchEnabled = true;
            }
            else {
                this.btnEnter.enabled = false;
                this.btnEnter.touchEnabled = false;
            }
        };
        //开始或者结束时间显示变化
        ZorkBossMainPop.prototype.upDateUI = function (progress) {
            var strTime = progress.leftTime; //- Math.floor(egret.getTimer() / 1000) >= 0 ? progress.leftTime - Math.floor(egret.getTimer() / 1000) : 0;
            if (strTime <= 0) {
                zj.Game.EventManager.on(zj.GameEvent.PLAYER_PROGRESS_INFO_CHANGE, this.upDate, this);
            }
            if (progress.info == 0) {
                strTime = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToOpen2, zj.Helper.GetTimeStr(strTime, false));
                this.lbStarTime.textFlow = zj.Util.RichText(strTime);
            }
            else {
                strTime = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.timeToEnd2, zj.Helper.GetTimeStr(strTime, false));
                this.lbStarTime.textFlow = zj.Util.RichText(strTime);
            }
        };
        //Group的显示调节
        ZorkBossMainPop.prototype.freshList = function (progress) {
            var hp = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre;
            if (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre <= 0) {
                //世界BOSS开启且击杀后，显示伤害列表
                this.groupRank.visible = true;
                this.setRankList();
                this.isRewardTip = false;
                this.groupAward.visible = false;
            }
            else {
                this.groupAward.visible = true;
                this.setRewardList();
                this.isRewardTip = true;
                this.groupRank.visible = false;
            }
        };
        //剩余血量
        ZorkBossMainPop.prototype.initBlood = function () {
            var bossBlood = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre != null && zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre || 1;
            bossBlood = bossBlood >= 0 && bossBlood || 0;
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info == 0) {
                bossBlood = 1;
            }
            var info = {
                node: null,
                now: bossBlood,
                level: 1,
                level_max: 1,
                exp_max: 1,
                table: [1],
                bar: this.imgBlood,
                dir: 1,
                opacity: 255,
            };
            this.expsave = info.now;
            this.lbBloodPer.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (info.now * 100).toFixed(2));
        };
        ZorkBossMainPop.prototype.refreshBlood = function () {
            var hp = zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre;
            this.lbBloodPer.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (hp * 100).toFixed(2));
            var num = Number(hp.toFixed(2));
            this.imgExpBoart.x = this.imgBlood.x - this.imgExpBoart.width + this.imgExpBoart.width * num; // 经验条遮罩的变化
            if (hp == 0) {
                this.setIsKill(this.judgeKill);
            }
            else {
                this.imgKill.visible = false; //不显示击杀图片
            }
        };
        //“已击杀”图片的显示调节
        ZorkBossMainPop.prototype.setIsKill = function (action) {
            if (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info == 0) {
                this.imgKill.visible = false;
            }
            else if (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre > 0) {
                this.imgKill.visible = false;
            }
            else if (zj.Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre <= 0) {
                this.judgeKill = true;
                this.imgKill.visible = true;
                if (action) {
                    this.setAction();
                }
            }
        };
        //龙骨动画
        ZorkBossMainPop.prototype.setAction = function () {
        };
        ZorkBossMainPop.prototype.upDateBoss = function () {
            if (this.isRewardTip == false) {
                this.setRankList();
            }
        };
        //说明
        ZorkBossMainPop.prototype.onBtnRule = function () {
            zj.loadUI(zj.Common_RuleDialog)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                dialog.init(zj.RuleConfig.wonderlandBoss);
            });
        };
        //进入战场
        ZorkBossMainPop.prototype.onBtnEnter = function () {
            var _this = this;
            zj.Game.PlayerZorkSystem.bossEntry(0, 0).then(function () {
                zj.MapSceneLoading.getInstance().loadFightRes(19, _this.wonderlandBoss, _this);
            });
        };
        ZorkBossMainPop.prototype.wonderlandBoss = function () {
            zj.StageSceneManager.Instance.ChangeScene(zj.StageSceneZorkBoss);
        };
        //退出
        ZorkBossMainPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //鼠标抬起，移除  掉落 材料说明
        ZorkBossMainPop.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ZorkBossMainPop;
    }(zj.Dialog));
    zj.ZorkBossMainPop = ZorkBossMainPop;
    __reflect(ZorkBossMainPop.prototype, "zj.ZorkBossMainPop");
})(zj || (zj = {}));
//# sourceMappingURL=ZorkBossMainPop.js.map