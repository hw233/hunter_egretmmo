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
    //DarkLandHomeScene (黑暗大陆)
    //hexiaowei
    // 2019/03/01
    var DarkLandHomeScene = (function (_super) {
        __extends(DarkLandHomeScene, _super);
        function DarkLandHomeScene() {
            var _this = _super.call(this) || this;
            _this.boardScale = 1.2;
            _this.lock = [];
            _this.board = [];
            _this.tips = [];
            _this.skinName = "resource/skins/darkLand/DarkLandHomeSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            //创建一个计时器对象
            _this.timer = new egret.Timer(900, 0);
            //注册事件侦听器
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.UpdateTips, _this);
            _this.timer.start();
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.groupZone1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupClick1_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupClick1_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupClick1_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupClick1_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupClick1_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick1, _this);
            _this.groupZone2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupClick2_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupClick2_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupClick2_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupClick2_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupClick2_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick2, _this);
            _this.groupZone3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupClick3_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupClick3_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupClick3_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupClick3_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupClick3_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick3, _this);
            _this.groupZone4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupClick4_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupClick4_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupClick4_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupClick4_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupClick4_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick4, _this);
            _this.groupZone5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupClick5_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupClick5_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupClick5_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupClick5_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupClick5_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick5, _this);
            _this.groupZone6.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupClick6_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupClick6_2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupClick6_3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupClick6_4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupClick6_5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroupClick6, _this);
            _this.groupZone1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupClick1_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupClick1_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupClick1_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupClick1_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupClick1_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd1, _this);
            _this.groupZone2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupClick2_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupClick2_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupClick2_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupClick2_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupClick2_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd2, _this);
            _this.groupZone3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupClick3_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupClick3_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupClick3_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupClick3_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupClick3_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd3, _this);
            _this.groupZone4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupClick4_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupClick4_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupClick4_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupClick4_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupClick4_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd4, _this);
            _this.groupZone5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupClick5_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupClick5_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupClick5_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupClick5_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupClick5_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd5, _this);
            _this.groupZone6.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.groupClick6_1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.groupClick6_2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.groupClick6_3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.groupClick6_4.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.groupClick6_5.addEventListener(egret.TouchEvent.TOUCH_END, _this.onGroupEnd6, _this);
            _this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAddGold, _this);
            _this.btnAddToken.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnAddGemstone, _this);
            _this.groupScene.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveGroup, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, _this.updateUIStates, _this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, _this.updateUIStates, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoveFromStage, _this);
            if (_this.width >= 1344) {
                _this.imageBackGroud.scaleX = _this.width / 1334;
            }
            _this.inIt();
            return _this;
        }
        DarkLandHomeScene.prototype.UpdateTips = function () {
            this.imageTip1.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_INSTANCE);
            this.imageTip6.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_MALL);
        };
        //添加龙骨动画
        DarkLandHomeScene.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            var _this = this;
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.anchorOffsetX = display.width / 2;
                display.anchorOffsetY = display.height / 2;
                display.x = display.width / 2 - 195;
                if (_this.width >= 1334) {
                    display.scaleX = _this.width / 1334;
                    display.x = display.width / 2 - (195 * _this.width / 1334);
                }
                display.y = _this.groupWhole.height + display.height / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        DarkLandHomeScene.prototype.inIt = function () {
            this.imageLine1.visible = false;
            this.imageLine2.visible = false;
            this.imageLine3.visible = false;
            this.imageLine4.visible = false;
            this.imageLine5.visible = false;
            this.imageLine6.visible = false;
            this.setInfo();
            this.addAnimatoin("worldspine", "animation", 0, this.groupWhole);
        };
        DarkLandHomeScene.prototype.setInfo = function () {
            // 遗迹探索
            var open1 = true;
            this.imageLock1.visible = !open1;
            if (open1) {
                this.imageBoardName1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imageBoardName1.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imageTip1.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_INSTANCE); //红点
            //圣泉森林 （未开启）
            var open3 = false;
            this.imageLock3.visible = !open3;
            if (open3) {
                this.imageBoardName3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imageBoardName3.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imageTip3.visible = false;
            //晶石商店
            var open6 = true;
            if (open6) {
                this.imageBoardName6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imageBoardName6.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imageTip6.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.RELIC_MALL); //红点
            //碧蓝湖畔（未开启）
            var open4 = false;
            this.imageLock4.visible = !open4;
            if (open4) {
                this.imageBoardName4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imageBoardName4.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imageTip4.visible = false;
            //飞龙 (好友助阵)
            var open5 = zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT, false);
            this.imageLock5.visible = !open5;
            this.imageType5.visible = open5;
            this.labelLevel5.visible = !open5;
            this.labelLevel5.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Pk.open, zj.PlayerHunterSystem.LevelDBFunOpenLevel(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT).condition);
            if (open5) {
                this.imageBoardName5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
                this.imageType5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[5], this);
            }
            else {
                this.imageBoardName5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
                this.imageType5.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.area[2], this);
            }
            this.imageTip5.visible = zj.Tips.GetTipsOfId(zj.Tips.TAG.DarkLand, zj.Tips.TAG.GROUPDARKFIGHT);
            //熔岩洞穴(未开放)
            var open2 = false;
            if (open2) {
                this.imageBoardName2.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[1], this);
            }
            else {
                this.imageBoardName2.source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[2], this);
            }
            this.imageTip2.visible = false;
            this.imageSpar.source = zj.cachekey("ui_iconresources_jingshi3_png", this);
            this.updateUIStates();
            //初始记录
            for (var i = 1; i < 6; i++) {
                var lock = this["imageLock" + i].visible;
                var board = this["imageLock" + i].visible;
                var tips = this["imageTip" + i].visible;
                this.lock.push(lock);
                this.board.push(board);
                this.tips.push(tips);
            }
        };
        DarkLandHomeScene.prototype.onRemoveFromStage = function () {
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_COIN_CHANGE, this.updateUIStates, this);
            zj.Game.EventManager.off(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
        };
        DarkLandHomeScene.prototype.updateUIStates = function () {
            //金幣
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.lbGold.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.lbGold.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            //鑽石
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            //晶石
            var id = message.EResourceType.RESOURCE_RELIC_COIN;
            var str_res = zj.PlayerItemSystem.Str_Resoure(id);
            this.labelRElicCoin.text = str_res;
        };
        DarkLandHomeScene.prototype.onGroupClick1 = function (num) {
            this.onGroupClick(1);
        };
        DarkLandHomeScene.prototype.onGroupClick2 = function () {
            this.onGroupClick(2);
        };
        DarkLandHomeScene.prototype.onGroupClick3 = function () {
            this.onGroupClick(3);
        };
        DarkLandHomeScene.prototype.onGroupClick4 = function () {
            this.onGroupClick(4);
        };
        DarkLandHomeScene.prototype.onGroupClick5 = function () {
            this.onGroupClick(5);
        };
        DarkLandHomeScene.prototype.onGroupClick6 = function () {
            this.onGroupClick(6);
        };
        DarkLandHomeScene.prototype.onGroupClick = function (num) {
            for (var i = 1; i <= 6; i++) {
                if (i == num) {
                    this["imageLine" + i].visible = true;
                    this["groupZone" + i].scaleX = this.boardScale;
                    this["groupZone" + i].scaleY = this.boardScale;
                }
                else {
                    this["imageLine" + i].visible = false;
                    this["groupZone" + i].scaleX = 1;
                    this["groupZone" + i].scaleY = 1;
                }
            }
        };
        DarkLandHomeScene.prototype.onGroupEnd1 = function () {
            zj.loadUI(zj.RelicMain)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        DarkLandHomeScene.prototype.onGroupEnd2 = function () {
            zj.toast_warning("敬请期待");
        };
        DarkLandHomeScene.prototype.onGroupEnd3 = function () {
            zj.toast_warning("敬请期待");
        };
        DarkLandHomeScene.prototype.onGroupEnd4 = function () {
            zj.toast_warning("敬请期待");
        };
        DarkLandHomeScene.prototype.onGroupEnd5 = function () {
            if (zj.PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_GROUP_FIGHT, true)) {
                //  toast("飞龙营地");
                zj.loadUI(zj.HXH_GroupFightMain)
                    .then(function (scene) {
                    scene.Init();
                    scene.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        DarkLandHomeScene.prototype.onGroupEnd6 = function () {
            zj.loadUI(zj.RelicMall_Main)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        DarkLandHomeScene.prototype.onRemoveGroup = function () {
            for (var i = 1; i <= 6; i++) {
                this["imageLine" + i].visible = false;
                this["groupZone" + i].scaleX = 1;
                this["groupZone" + i].scaleY = 1;
            }
        };
        DarkLandHomeScene.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        DarkLandHomeScene.prototype.onBtnAddGemstone = function () {
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init();
            });
        };
        DarkLandHomeScene.prototype.onButtonClose = function () {
            this.timer.stop();
            this.timer.reset();
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        DarkLandHomeScene.prototype.SetTeachOpen = function () {
            for (var i = 1; i < 6; i++) {
                this["imageLock" + i].visible = false;
                this["imageBoardName" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[0], this);
                this["imageTip" + i].visible = false;
            }
        };
        DarkLandHomeScene.prototype.SetTeachClose = function () {
            for (var i = 1; i < 6; i++) {
                var pathIndex = this.board[i] && 2 || 1;
                this["imageLock" + i].visible = this.lock[(i - 1)];
                this["imageBoardName" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Wonderland.board[pathIndex], this);
                this["imageTip" + i].visible = this.tips[(i - 1)];
            }
        };
        DarkLandHomeScene.prototype.SetTeach = function (id) {
            if (id == null) {
                return;
            }
            this.teachId = id;
            var name = null;
            if (id == 5) {
                //杀戮仙境 进入新手仙境
                name = "groupZone5";
            }
            return name;
        };
        return DarkLandHomeScene;
    }(zj.Scene));
    zj.DarkLandHomeScene = DarkLandHomeScene;
    __reflect(DarkLandHomeScene.prototype, "zj.DarkLandHomeScene");
})(zj || (zj = {}));
//# sourceMappingURL=DarkLandHomeScene.js.map