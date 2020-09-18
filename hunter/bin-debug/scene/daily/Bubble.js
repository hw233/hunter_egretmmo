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
     * @author Lian Lei
     *
     * date 2019-07-03
     *
     * @class 主线任务气泡
     */
    var Bubble = (function (_super) {
        __extends(Bubble, _super);
        function Bubble() {
            var _this = _super.call(this) || this;
            _this.initData = false;
            _this.skinName = "resource/skins/daily/BubbleSkin.exml";
            return _this;
        }
        Bubble.prototype.init = function () {
            if (!this.initData) {
                this.groupAll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
                this.btnTurnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTurn, this);
                this.btnTurnOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTurn, this);
                this.rightX = this.x;
                this.leftX = -this.groupAll.width;
                this.isOpen = true;
                this.initData = true;
            }
            this.updateTurnBtn();
            this.mission = zj.Game.PlayerMissionSystem.listForTask();
            this.mTable = zj.Game.PlayerMissionSystem.itemMain(this.mission.missionId);
        };
        Bubble.prototype.updateTurnBtn = function () {
            this.groupTurn.visible = !this.isOpen;
            this.btnTurnClose.visible = this.isOpen;
        };
        // 主线任务相关 回到主城界面
        Bubble.prototype.SetMainMissionOnComeBack = function () {
            this.init();
            var mIndex = zj.Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);
            var tb = zj.Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
            // let aa = "完成一次“窝金の试炼”，并对敌方施加一次中毒效果";
            // this.StartTalk(this.mTable.name);
            this.labelMission.text = this.mTable.name;
            // this.timestop = egret.setTimeout(function () {
            // 	this.StopTalk();
            // }, this, 5000);
            this.setState(tb);
            this.setReward(this.mTable.reward_goods);
            this.playAni();
        };
        Bubble.prototype.SetMainMissionAfterLogin = function () {
            // if (this.mission != null && !this.mission.isFinish) {
            this.SetMainMissionOnComeBack();
            // }
            // else {
            // 	this.groupAll.visible = false;
            // }
        };
        // private StartTalk(text: string) {
        // 	egret.Tween.removeTweens(this.groupAll);
        // 	this.labelMission.text = "";
        // 	this._cur = 0;
        // 	this._count = text.length;
        // 	let _time = 150;
        // 	let _delayTime = 70;
        // 	egret.Tween.get(this.groupAll)
        // 		.call(() => { this.groupAll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this) })
        // 		.to({ alpha: 0 }, 0).wait(300)
        // 		.to({ scaleX: 0.3, scaleY: 0.3 }, 0)
        // 		.to({ scaleX: 1.05, scaleY: 1.05 }, _time)
        // 		.to({ scaleX: 0.95, scaleY: 0.95 }, _time)
        // 		.to({ scaleX: 1, scaleY: 1 }, _time)
        // 		.to({ alpha: 1 }, _time)
        // 		.call(() => {
        // 			this.Talking(text);
        // 		});
        // }
        // private Talking(text: string) {
        // 	egret.Tween.removeTweens(this.groupAll);
        // 	this.groupAll.alpha = 1;
        // 	this.groupAll.visible = true;
        // 	this.groupOpen.alpha = 1;
        // 	this.groupOpen.visible = true;
        // 	for (let i = 0; i <= text.length; i++) {
        // 		let timenum = egret.setTimeout(function () {
        // 			this.labelMission.text = text.substr(0, this._cur);
        // 			this._cur += 1;
        // 		}, this, 30 * i);
        // 		this.timenpc.push(timenum);
        // 	}
        // 	this._cur = 0;
        // 	this._count = 0;
        // 	let _time = 150;
        // 	let _delay = 500;
        // 	egret.Tween.get(this.groupAll)
        // 		.to({ alpha: 1 }, _time * 2);
        // }
        // private StopTalk() {
        // 	this.clearAll();
        // }
        // private clearAll() {
        // 	if (this.timenpc.length > 0) {
        // 		for (let i = 0; i < this.timenpc.length; i++) {
        // 			egret.clearTimeout(this.timenpc[i]);
        // 		}
        // 	}
        // 	egret.clearTimeout(this.timestop);
        // }
        /**奖励 */
        Bubble.prototype.setReward = function (rewards) {
            var goods = [];
            for (var i = 0; i < rewards.length; i++) {
                goods.push([]);
            }
            for (var i = 0; i < rewards.length; i++) {
                var v = rewards[i];
                if (goods.length == 1) {
                    goods[i].push(v[0], v[1]);
                }
                else {
                    for (var j = 0; j < rewards[i].length; j++) {
                        goods[i].push(v[j]);
                    }
                }
            }
            this.goods = goods;
            this.awardDescription();
        };
        /**显示奖励描述 */
        Bubble.prototype.awardDescription = function () {
            if (this.goods.length != 0) {
                var des = [];
                for (var i = 0; i < this.goods.length; i++) {
                    var goodsItem = zj.PlayerItemSystem.ItemConfig(this.goods[i][0]); // 物品信息
                    // (<eui.Label>this[`labelAward${i + 1}`]).text = goodsItem['name'] + "x" + this.goods[i][1];
                    des.push(goodsItem['name'] + "x" + this.goods[i][1]);
                }
                this.labelAward1.text = zj.TextsConfig.TextsConfig_Common.reward + "：" + (des.length == 2 ? des[0] + "，" + des[1] : des[0]);
            }
        };
        /**状态 */
        Bubble.prototype.setState = function (tb) {
            var finish = tb.finish;
            this.imgGet.visible = false;
            this.labelState.visible = true;
            var str = "(" + tb.isDo + "/" + tb.toDo + ")";
            if (finish) {
                this.labelState.text = "(已完成)";
                // this.labelState.textColor = Helper.RGBToHex("r:0,g:255,b:0");
                egret.Tween.get(this.labelState).to({ alpha: 0 }, 0).wait(300).to({ alpha: 1 }, 300);
            }
            else {
                this.labelState.text = str;
                // this.labelState.textColor = Helper.RGBToHex("r:255,g:0,b:0");
                egret.Tween.get(this.labelState).to({ alpha: 0 }, 0).wait(500).to({ alpha: 1 }, 300);
            }
        };
        Bubble.prototype.onBtnTurn = function () {
            var _this = this;
            this.isOpen = !this.isOpen;
            var tw = egret.Tween.get(this);
            tw.to({ x: this.isOpen ? this.rightX : this.leftX }, 200, this.isOpen ? egret.Ease.backOut : egret.Ease.backIn);
            tw.call(function () {
                egret.Tween.removeTweens(_this);
                _this.updateTurnBtn();
            }, this);
        };
        /**跳转 */
        Bubble.prototype.onBtnGo = function () {
            var mIndex = zj.Game.PlayerMissionSystem.itemIndex(this.mission.type, this.mission.subType);
            var tb = zj.Game.PlayerMissionSystem.itemCompleteForMain(mIndex);
            //if (Teach.teachingNow == false) {
            if (!tb.finish) {
                // this.groupAll.alpha = 0;
                if (this.mission.subType == message.MissionSubType.MISSION_SUB_TYPE_WANTED_TIMES) {
                    zj.Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)(this.mTable.condition);
                }
                else {
                    zj.Game.PlayerMissionSystem.getMission(this.mission.type, this.mission.subType)();
                }
            }
            else {
                zj.Game.PlayerMissionSystem.ReqReward(this.mission.type, this.mission.subType).then(function (value) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        dialog.init(value.body.gameInfo.getGoods);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }).catch(function (reason) {
                    zj.toast_warning(reason);
                });
            }
            //}
        };
        Bubble.prototype.playAni = function () {
            var _this = this;
            if (this.mTable.id < 10 && this.groupAni.getChildByName("hand") == null && zj.Teach.isDone(3005)) {
                zj.Game.DragonBonesManager.playAnimation(null, "ui_tongyong_xinshou", "armatureName", 1, 0).then(function (display) {
                    display.name = "hand";
                    // display.x = this.width - display.width;
                    // display.y = this.height / 2 + 10;
                    display.touchEnabled = false;
                    display.scaleX = 0.6;
                    display.scaleY = 0.6;
                    _this.groupAni.addChild(display);
                });
            }
            else if (this.mTable.id >= 10) {
                var ani = this.groupAni.getChildByName("hand");
                if (ani) {
                    this.groupAni.removeChild(ani);
                }
            }
        };
        return Bubble;
    }(zj.UI));
    zj.Bubble = Bubble;
    __reflect(Bubble.prototype, "zj.Bubble");
})(zj || (zj = {}));
//# sourceMappingURL=Bubble.js.map