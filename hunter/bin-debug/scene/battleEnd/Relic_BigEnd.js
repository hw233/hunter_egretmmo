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
     * @author xing li wei
     *
     * @date 2019-4-19
     *
     * @class 遗迹探索结算
     */
    var Relic_BigEnd = (function (_super) {
        __extends(Relic_BigEnd, _super);
        function Relic_BigEnd() {
            var _this = _super.call(this) || this;
            _this.hurtPer = 0;
            _this.curLevelPic = new eui.Image();
            _this.ui_name = "BattleEnd_Win";
            _this.skinName = "resource/skins/battleEnd/Relic_BigEndSkin.exml";
            return _this;
        }
        Relic_BigEnd.prototype.Init = function () {
            this.TextExp.text = "0";
            this.ButtonOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonOk, this);
            this.SpriteExpBar.mask = this.SpriteExpBarBg;
        };
        Relic_BigEnd.prototype.SetInfo = function (star, hurt) {
            this.star = star;
            this.hurt = hurt;
            this.instanceTbl = zj.PlayerDarkSystem.RelicInstance(zj.Game.PlayerMissionSystem.fightExt + 1);
            this.serverRelicInfo = zj.Table.FindR(zj.Game.PlayerInstanceSystem.InstanceInfo.relicInfo, function (k, v) {
                return v.id == zj.Game.PlayerMissionSystem.fightExt + 1;
            });
            if (this.serverRelicInfo == null) {
                this.serverRelicInfo = new message.InstanceRelic();
                this.serverRelicInfo.id = zj.Game.PlayerMissionSystem.fightExt + 1;
            }
            this.InitNorMalAni();
            this.setInfoList();
            this.setProgressAni();
        };
        Relic_BigEnd.prototype.setInfoList = function () {
            var array = new eui.ArrayCollection();
            for (var i = 0; i < this.instanceTbl.max_step; i++) {
                var data = new zj.RelicFinaChestItemData();
                data.chest = this.instanceTbl.open_chest[i];
                data.father = this;
                array.addItem(data);
            }
            this.TableViewList.dataProvider = array;
            this.TableViewList.itemRenderer = zj.RelicFinaChestItem;
            var curLevel = zj.PlayerDarkSystem.GetLevelByHurt(zj.Game.PlayerMissionSystem.fightExt + 1, this.hurt);
            this.curLevelPic.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicHurtLevel2[curLevel], this);
            var preHurt = this.instanceTbl.damage_zone[curLevel];
            var nextHurt = this.instanceTbl.damage_zone[curLevel + 1] || this.hurt;
            this.hurtPer = ((this.hurt - preHurt) / (nextHurt - preHurt)) < 1 && (this.hurt / nextHurt) || 1;
            var maxLevel = zj.TableEnum.Enum.TableEnumRelicLevel[zj.TableEnum.Enum.TableEnumRelicLevel.length - 1] - 1;
            if (curLevel >= maxLevel) {
                // this.nex
            }
            else {
                var nextLevel = curLevel + 1;
                var nextDamage = this.instanceTbl.damage_zone[nextLevel];
                var minusValue = nextDamage - this.hurt;
                if (minusValue >= 10000) {
                    this.LableNextLevel.text = (minusValue / 10000).toFixed(1) + "万";
                }
                else if (minusValue >= 100000000) {
                    this.LableNextLevel.text = (minusValue / 100000000).toFixed(1) + "亿";
                }
                else {
                    this.LableNextLevel.text = (minusValue / 10000).toFixed(1);
                }
                this.SpriteNextLevel.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicHurtLevel[nextLevel], this);
            }
            var allGoods = [];
            for (var i = 0; i < this.instanceTbl.damage_daily_goods[curLevel].length; i++) {
                var goods = new message.GoodsInfo();
                goods.goodsId = this.instanceTbl.damage_daily_goods[curLevel][i];
                goods.count = this.instanceTbl.damage_daily_count[curLevel][i];
                allGoods.push(goods);
            }
            var array1 = new eui.ArrayCollection();
            for (var i = 0; i < allGoods.length; i++) {
                var data = new zj.SuccessionBattleDropItemData();
                data.index = i;
                data.itemInfo = allGoods[i];
                data.father = this;
                data.showWhite = false;
                array1.addItem(data);
            }
            this.TableViewAward.dataProvider = array1;
            this.TableViewAward.itemRenderer = zj.SuccessionBattleDropItem;
        };
        Relic_BigEnd.prototype.InitNorMalAni = function () {
            var _this = this;
            var tableAniNode = [this.NodeBoard, this.NodeStar, this.NodeWin];
            var boardAniName = ["000_diban_chuxian", "001_diban_xunhuan"];
            var winAniName = ["014_pingfen_chuxian", "015pingfen_xunhuan"];
            var winAniBones = ["018_wenzi"];
            var winAniPics = [this.curLevelPic];
            var starAniName;
            if (this.star == message.EBattleStar.BATTLE_STAR_NONO) {
                starAniName = ["002_lingxing_chuxian", "003_lingxing_xunhuan"];
            }
            else if (this.star == message.EBattleStar.BATTLE_STAR_1) {
                starAniName = ["004_yixing_chuxian", "005_yixing_xunhuan"];
            }
            else if (this.star == message.EBattleStar.BATTLE_STAR_2) {
                starAniName = ["006_erxing_chuxian", "007_erxing_xunhuan"];
            }
            else if (this.star == message.EBattleStar.BATTLE_STAR_3) {
                starAniName = ["008_sanxing_chuxian", "009_sanxing_xunhuan"];
            }
            else if (this.star == 4) {
                starAniName = ["010_sixing_chuxian", "011_sixing_xunhuan"];
            }
            else {
                starAniName = ["012_wuxing_chuxian", "013_wuxing_xunhuan"];
            }
            var thisOne = this;
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(boardAniName[1], 0);
                }, _this);
                armatureDisplay.animation.play(boardAniName[0], 1);
                armatureDisplay.x = thisOne.NodeBoard.width / 2;
                armatureDisplay.y = thisOne.NodeBoard.height;
                thisOne.NodeBoard.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, [], [])
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(starAniName[1], 0);
                }, _this);
                armatureDisplay.animation.play(starAniName[0], 1);
                armatureDisplay.x = thisOne.NodeStar.width / 2;
                armatureDisplay.y = thisOne.NodeStar.height;
                thisOne.NodeStar.addChild(armatureDisplay);
            });
            zj.Game.DragonBonesManager.getAnimationWithBindImages(this, "jiesuan_heiandalu", null, winAniPics, winAniBones)
                .then(function (armatureDisplay) {
                // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                // 	armatureDisplay.animation.stop();
                // 	armatureDisplay.animation.reset();
                // 	armatureDisplay.armature.dispose();
                // 	armatureDisplay.dbClear();
                // 	armatureDisplay.dispose(true);
                // 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                // }, null);
                armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, function () {
                    armatureDisplay.animation.play(winAniName[1], 0);
                }, _this);
                armatureDisplay.animation.play(winAniName[0], 1);
                armatureDisplay.x = thisOne.NodeWin.width / 2;
                armatureDisplay.y = thisOne.NodeWin.height;
                thisOne.NodeWin.addChild(armatureDisplay);
            });
        };
        Relic_BigEnd.prototype.setProgressAni = function () {
            var _this = this;
            var delayTime1 = 1;
            var progressTime = this.hurtPer * 0.4;
            var num = Math.floor(this.hurtPer * 30);
            num = num < 1 ? 1 : num;
            var index = 1;
            var a = { width: 274, height: 20 };
            var Update = function () {
                var per = _this.hurtPer / num * index;
                var hurt = _this.hurt / num * index; //Set.NumberUnit3()
                if (index == num) {
                    per = _this.hurtPer;
                    hurt = _this.hurt; //Set.NumberUnit3();
                }
                var rect_exp = zj.getPercentSize(a, per);
                _this.SpriteExpBarBg.width = rect_exp.width;
                if (hurt >= 10000) {
                    _this.TextExp.text = (hurt / 10000).toFixed(1) + "万";
                }
                else if (hurt >= 100000000) {
                    _this.TextExp.text = (hurt / 100000000).toFixed(1) + "亿";
                }
                else {
                    _this.TextExp.text = (hurt / 10000).toFixed(1);
                }
                index = index + 1;
                if (index > num) {
                    egret.clearInterval(_this.update);
                }
            };
            this.update = egret.setInterval(Update, this, progressTime / num);
        };
        Relic_BigEnd.prototype.onButtonOk = function () {
            //关闭战斗
            zj.StageSceneManager.Instance.clearScene();
            this.close();
            zj.Game.UIManager.popAllScenesAndDialogs(function () {
                zj.loadUI(zj.DarkLandHomeScene)
                    .then(function (scene) {
                    scene.show(zj.UI.SHOW_FILL_OUT);
                    scene.onGroupEnd1();
                });
            });
        };
        return Relic_BigEnd;
    }(zj.Dialog));
    zj.Relic_BigEnd = Relic_BigEnd;
    __reflect(Relic_BigEnd.prototype, "zj.Relic_BigEnd");
})(zj || (zj = {}));
//# sourceMappingURL=Relic_BigEnd.js.map