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
    var HXH_WonderlandFruitCollection = (function (_super) {
        __extends(HXH_WonderlandFruitCollection, _super);
        function HXH_WonderlandFruitCollection() {
            var _this = _super.call(this) || this;
            _this.curFrame = 0;
            _this.maxFrame = 0;
            _this.barWidth = 0;
            _this.barHeight = 0;
            _this.bUpdate = true;
            _this.skinName = "resource/skins/fight/HXH_WonderlandFruitCollectionSkin.exml";
            _this.scene = zj.StageSceneManager.Instance.GetCurScene();
            _this.sceneType = _this.scene.sceneType;
            _this.Init();
            return _this;
        }
        HXH_WonderlandFruitCollection.prototype.release = function () {
            this.clearTime();
            this.scene = null;
        };
        HXH_WonderlandFruitCollection.prototype.Init = function () {
            var _this = this;
            this.barWidth = this.SpriteCollectBar.width;
            this.barHeight = this.SpriteCollectBar.height;
            this.SpriteCollectBar.scrollRect = new egret.Rectangle(0, 0, 0, 0);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.removeEventListener(egret.Event.ENTER_FRAME, _this.Update, _this);
            }, this);
        };
        HXH_WonderlandFruitCollection.prototype.setInfo = function (frame, type) {
            this.clearTime();
            this.SpriteCollectBar.scrollRect = new egret.Rectangle(0, 0, 0, 0);
            this.Ticktimer = egret.getTimer();
            this.addEventListener(egret.Event.ENTER_FRAME, this.Update, this);
            this.maxFrame = frame || 0;
            this.SpriteCollectType.source = zj.cachekey(zj.UIConfig.UIConfig_RpgScene.controlProgressPic[type], this);
        };
        HXH_WonderlandFruitCollection.prototype.Update = function (tick) {
            tick = (egret.getTimer() - this.Ticktimer) / 1000;
            this.Ticktimer = egret.getTimer();
            if (this.bUpdate == false || zj.Game.PlayerWonderLandSystem.wonderlandId == 4) {
                return;
            }
            this.curFrame = this.curFrame + tick * 1000;
            if (this.curFrame >= this.maxFrame) {
                this.curFrame = this.curFrame - this.maxFrame;
                if (this.sceneType == message.ESceneType.SCENE_TYPE_WONDERLAND ||
                    this.sceneType == message.ESceneType.SCENE_TYPE_DARKLAND) {
                    this.bUpdate = false;
                    this.scene.playerLeader.endProgress();
                    this.clearTime();
                }
            }
            var tempRect = new egret.Rectangle(0, 0, this.curFrame / this.maxFrame * this.barWidth, this.barHeight);
            this.SpriteCollectBar.scrollRect = tempRect;
        };
        HXH_WonderlandFruitCollection.prototype.clearTime = function () {
            this.bUpdate = true;
            this.curFrame = 0;
            this.removeEventListener(egret.Event.ENTER_FRAME, this.Update, this);
        };
        return HXH_WonderlandFruitCollection;
    }(zj.UI));
    zj.HXH_WonderlandFruitCollection = HXH_WonderlandFruitCollection;
    __reflect(HXH_WonderlandFruitCollection.prototype, "zj.HXH_WonderlandFruitCollection");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_WonderlandFruitCollection.js.map