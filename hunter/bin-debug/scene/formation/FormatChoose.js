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
    var ChooseState = (function () {
        function ChooseState() {
            this.generalId = 0;
            this.index = -1;
        }
        return ChooseState;
    }());
    zj.ChooseState = ChooseState;
    __reflect(ChooseState.prototype, "zj.ChooseState");
    /**
     * 冒险上阵界面基类
     */
    var FormatChoose = (function (_super) {
        __extends(FormatChoose, _super);
        function FormatChoose(sk) {
            var _this = _super.call(this) || this;
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.listRect = new egret.Rectangle();
            _this.moveGId = null;
            _this.moveIndex = 0;
            _this.skinName = sk;
            _this.scene = new zj.GoFightMap();
            _this.addChildAt(_this.scene, 0);
            _this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnReturn, _this); //返回按钮
            zj.Game.EventManager.on(zj.GameEvent.FORMATE_REFRESH_LIST, _this.onFormate_refresh_list, _this);
            zj.Game.EventManager.on(zj.GameEvent.MOUSE_BEGIN, _this.onMouseBegin, _this);
            _this.up = new zj.FormateFourPos;
            _this.down = new zj.FormateBottomList();
            _this.down.setInfo(_this);
            zj.Game.EventManager.on(zj.GameEvent.DELAY_EXECUTE, _this.ontouchBeginTime, _this);
            return _this;
            // (function () {
            //     var count = egret.$hashCount;
            //     setInterval(() => {
            //         var newcount = egret.$hashCount;
            //         var diff = newcount - count;
            //         count = newcount;
            //         console.log("new object: ", diff);
            //     }, 1000);
            // })();
        }
        /**
         * 关闭滑动bug
         */
        FormatChoose.prototype.ontouchBeginTime = function (e) {
            if (e.data.isInLongPress == true) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
            else {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        };
        FormatChoose.prototype.onFormate_refresh_list = function (e) {
            var _this = this;
            // this.LoadListMine();
            this.moveImg.source = zj.cachekey(e.data.id, this);
            if (e.data != null && e.data != undefined) {
                this.moveImg.visible = true;
                var objectData = e.data;
                if (objectData.x == undefined && objectData.y == undefined) {
                    this.moveImg.visible = false;
                    this.moveImg.source = "";
                }
                else {
                    egret.Tween.get(this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300) //346  178
                        .call(function () {
                        _this.moveImg.visible = false;
                        _this.moveImg.source = "";
                    });
                }
            }
        };
        FormatChoose.prototype.onMouseBegin = function (e) {
            var objectData = e.data;
            if (objectData.generalId != 0) {
                this.moveImg.width = 95;
                this.moveImg.height = 93;
                this.moveImg.anchorOffsetX = this.moveImg.width / 2;
                this.moveImg.anchorOffsetY = this.moveImg.height / 2;
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                    this.moveImg.source = zj.cachekey("wx_" + zj.PlayerHunterSystem.Head(objectData.generalId), this);
                }
                else {
                    this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), this);
                }
                this.moveImg.visible = false;
                this.moveGId = objectData.generalId;
                this.moveIndex = objectData.index;
            }
        };
        FormatChoose.prototype.LoadScene = function (mapID) {
            this.scene.LoadMap(mapID); //这里是不同功能的地图ID
        };
        FormatChoose.prototype.isFullScreen = function () {
            return true;
        };
        /**
         * 该方法被它的子类调用
         */
        FormatChoose.prototype.onAddToStage = function () {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.groupUp.addChild(this.up);
            this.down.setInfo(this);
            this.groupDown.addChild(this.down);
            this.init();
            this.addChild(this.moveImg);
        };
        FormatChoose.prototype.mouseMove = function (e) {
            try {
                if (this.stage) {
                    this.down.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                    if (zj.Game.TeachSystem.curPart == 3002 || zj.Game.TeachSystem.curPart == 1003) {
                        this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    }
                    this.moveImg.visible = false;
                    // let rate = 18 / 9;
                    // if (egret.Capabilities.os == "iOS") rate = 18 / 9; // 苹果18/9，其他平台18/9
                    // if (this.stage.stageWidth / this.stage.stageHeight >= rate) {
                    //     // let width = this.stage.stageHeight * rate;
                    //     // let mask_width = (this.stage.stageWidth - width) / 2;
                    //     // // UIManager.StageWidth = width;
                    // }
                    this.moveImg.x = e.stageX - (this.stage.stageWidth - this.width) / 2;
                    this.moveImg.y = e.stageY;
                    var listWorld = this.groupDown.localToGlobal(this.down.scroller.x, this.down.scroller.y);
                    listWorld.x -= zj.Game.UIManager.x;
                    this.listRect.setTo(listWorld.x, listWorld.y, this.down.listBottom.width, this.down.listBottom.height);
                    if (this.listRect.contains(this.moveImg.x, this.moveImg.y) == false) {
                        this.moveImg.visible = true;
                        this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    }
                }
            }
            catch (ex) { }
        };
        FormatChoose.prototype.init = function () {
            this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.LoadListMine();
        };
        FormatChoose.prototype.mouseUp = function (e) {
            this.down.scroller.scrollPolicyH = eui.ScrollPolicy.ON; // 总是允许滚动
            if (zj.Game.TeachSystem.curPart == 3002 || zj.Game.TeachSystem.curPart == 1003) {
                this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            zj.Game.EventManager.event(zj.GameEvent.ON_MOVE, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex }); // 向上拖动选择上阵猎人
            this.moveImg.visible = false;
            this.moveImg.source = "";
            this.LoadListMine();
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE); // 阵容战斗力
        };
        // private up() {
        // 	this.vis = true;
        // 	this.scroller.scrollPolicyH = eui.ScrollPolicy.ON
        // 	this.moveImg.visible = false;
        // 	this.moveImg.source = "";
        // }
        FormatChoose.prototype.LoadListMine = function () {
            this.down.init();
        };
        /**
         * 注销事件
         */
        FormatChoose.prototype.unEvent = function () {
            zj.Game.EventManager.off(zj.GameEvent.FORMATE_REFRESH_LIST, this.onFormate_refresh_list, this);
            zj.Game.EventManager.off(zj.GameEvent.MOUSE_BEGIN, this.onMouseBegin, this);
            //Game.EventManager.off(GameEvent.DELAY_EXECUTE, this.ontouchBeginTime, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        };
        /**
         * 返回按钮
         */
        FormatChoose.prototype.onBtnReturn = function () {
            egret.Tween.removeTweens(this.moveImg);
            this.up.unEvent();
            this.unEvent();
            this.scene.close();
            this.close();
            this.up.close();
            this.down.close();
        };
        /**
         * 上阵猎人列表
         */
        FormatChoose.prototype.getSelectGenIds = function () {
            return this.up.getBattleGenerals();
        };
        /**
         * 1.2.3队上阵猎人列表
         */
        FormatChoose.prototype.getTeamMultitudeList = function () {
            return this.up.getMultitudeList();
        };
        /**
         * 猎人战斗力
         */
        FormatChoose.prototype.LoadTotalBattleValue = function () {
            var allBV = 0;
            var allGens = this.up.getBattleGenerals();
            for (var i = 0; i < allGens.length; i++) {
                if (allGens[i].generalId != 0) {
                    allBV += zj.Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                }
            }
            return zj.Set.NumberUnit3(allBV);
        };
        FormatChoose.ID = "FormatChoose";
        return FormatChoose;
    }(zj.Dialog));
    zj.FormatChoose = FormatChoose;
    __reflect(FormatChoose.prototype, "zj.FormatChoose");
})(zj || (zj = {}));
//# sourceMappingURL=FormatChoose.js.map