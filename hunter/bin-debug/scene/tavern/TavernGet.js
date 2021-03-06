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
    //TavernGet
    //hexiaowei
    // 2018/11/15
    var TavernGet = (function (_super) {
        __extends(TavernGet, _super);
        function TavernGet() {
            var _this = _super.call(this) || this;
            _this.goodsId = 0;
            _this.goodsId2 = 0;
            _this.goodsConut = 0;
            _this.group2Center = 0;
            _this.skinName = "resource/skins/tavern/TavernGetSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.group1.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroupNode1End, _this);
            _this.group1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode1Begin, _this);
            _this.group2.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroupNode2End, _this);
            _this.group2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode2Begin, _this);
            _this.group3.addEventListener(egret.TouchEvent.TOUCH_END, _this.onBtnGroupNode3End, _this);
            _this.group3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onBtnGroupNode3Begin, _this);
            _this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, _this.groupBackdrop);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeTouchEnd, _this);
            return _this;
        }
        //添加龙骨动画
        TavernGet.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //添加龙骨动画背景发光
        TavernGet.prototype.addBackdropAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight;
                display.scaleX = 0.8;
                display.scaleY = 0.8;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        TavernGet.prototype.init = function (tavern) {
            this.tavern = tavern;
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.isShow = false;
            this.imageDouble2.visible = false;
            this.imageDouble3.visible = false;
            //酒馆积分
            for (var k in zj.Game.PlayerActivitySystem.Activities) {
                var v = zj.Game.PlayerActivitySystem.Activities[k];
                if (v.stopTime > Date.parse(zj.Game.Controller.serverNow().toString()) / 1000) {
                    if (v.type == message.ActivityType.ACT_TYPE_LOTTERY_DOUBLING) {
                        this.isShow = true;
                    }
                }
            }
        };
        TavernGet.prototype.setInfo = function (i, goodid, type, num) {
            zj.Helper.PlayEff(zj.TableClientSoundResource.Item(30018).sound_path);
            this.goodsId = goodid;
            this.goodsId2 = 20014;
            if (i == 1) {
                this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate3);
                this.group3.visible = true;
                var num10 = 100;
                if (this.isShow) {
                    num10 = num10 * 2;
                    this.imageDouble3.visible = this.isShow;
                    this.imageDouble2.visible = !this.isShow;
                }
                this.label10Integral.text = num10.toString();
            }
            else {
                var general_roleId = zj.PlayerHunterSystem.Table(goodid).general_roleId;
                var aptitude = zj.PlayerHunterSystem.Table(goodid).aptitude;
                if (aptitude == 11) {
                    this.imageFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[1], this);
                }
                else if (aptitude == 12) {
                    this.imageFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[3], this);
                }
                else if (aptitude == 13) {
                    this.imageFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[6], this);
                }
                else if (aptitude == 14) {
                    this.imageFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[9], this);
                }
                else if (aptitude == 15) {
                    this.imageFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[13], this);
                }
                ;
                var head_path = zj.PlayerHunterSystem.MapInstance(general_roleId).head_path;
                if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                    this.imageHunter.source = zj.cachekey("wx_" + head_path, this);
                }
                else {
                    this.imageHunter.source = zj.cachekey(head_path, this);
                }
                this.labelHuntername.text = zj.PlayerHunterSystem.Table(goodid).general_name;
                this.group2Center = 0;
                if (type == 1) {
                    this.group2.visible = true;
                    this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                    this.labelIntegral.text = (num * 10).toString();
                    this.goodsConut = num * 10;
                }
                else if (type == 4) {
                    this.group1.horizontalCenter = 0;
                    this.group2Center = 65;
                    //this.labelIntegral.text = (num * 1).toString();
                }
                else if (type == 2) {
                    this.group2.visible = true;
                    this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                    this.labelIntegral.text = (num * 20).toString();
                    this.goodsConut = num * 20;
                }
                else if (type == 3) {
                    this.group2.visible = true;
                    this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this.groupIntegrate2);
                    this.labelIntegral.text = (num * 30).toString();
                    this.goodsConut = num * 30;
                }
                if (this.isShow) {
                    this.labelIntegral.text = (this.goodsConut * 2).toString();
                    this.goodsConut = (this.goodsConut * 2);
                    this.imageDouble2.visible = this.isShow;
                    this.imageDouble3.visible = !this.isShow;
                }
                this.group1.visible = true;
            }
        };
        TavernGet.prototype.setInfoAni = function () {
            var _this = this;
            egret.Tween.get(this.imageCongratulations)
                .to({ scaleY: 10, scaleX: 10, alpha: 0.75, fillAlpha: 0.75 }, 0)
                .to({ fillAlpha: 0.75 }, 0)
                .to({ alpha: 1 }, 0)
                .to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
                .call(function () {
                egret.Tween.get(_this.imageCongratulationsB)
                    .to({ scaleY: 0.85, scaleX: 0.85, fillAlpha: 0.75 })
                    .to({ alpha: 0.75 }, 0)
                    .to({ scaleY: 2.5, scaleX: 2.5, fillAlpha: 0, alpha: 0 }, 1000, egret.Ease.sineInOut);
            })
                .to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
                .to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut);
        };
        TavernGet.prototype.onBtnGroupNode1Begin = function () {
            var pop = zj.newUI(zj.CommonDesGeneral);
            pop.name = "pop";
            pop.x = this.groupMain.width / 2 - 260 + this.group2Center;
            pop.y = -this.groupMain.height / 2 + 20;
            pop.setInfo(this.goodsId, 1);
            this.groupMain.addChild(pop);
        };
        TavernGet.prototype.onBtnGroupNode1End = function () {
            this.removeTouchEnd();
        };
        TavernGet.prototype.onBtnGroupNode2Begin = function () {
            var commondesres = zj.newUI(zj.Common_DesRes);
            commondesres.name = "commondesres";
            commondesres.x = this.groupMain.width / 2 - 150;
            commondesres.y = -this.groupMain.height / 2 - 20;
            commondesres.setInfo(this.goodsId2, this.goodsConut);
            this.groupMain.addChild(commondesres);
        };
        TavernGet.prototype.onBtnGroupNode2End = function () {
            this.removeTouchEnd();
        };
        TavernGet.prototype.onBtnGroupNode3Begin = function () {
            var commondesres1 = zj.newUI(zj.Common_DesRes);
            commondesres1.name = "commondesres1";
            commondesres1.x = this.groupMain.width / 2 - 210;
            commondesres1.y = -this.groupMain.height / 2 - 20;
            commondesres1.setInfo(this.goodsId2, this.goodsConut);
            this.groupMain.addChild(commondesres1);
        };
        TavernGet.prototype.onBtnGroupNode3End = function () {
            this.removeTouchEnd();
        };
        TavernGet.prototype.removeTouchEnd = function () {
            var pop = this.groupMain.getChildByName("pop");
            var commondesres = this.groupMain.getChildByName("commondesres");
            var commondesres1 = this.groupMain.getChildByName("commondesres1");
            if (pop) {
                this.groupMain.removeChild(pop);
            }
            if (commondesres) {
                this.groupMain.removeChild(commondesres);
            }
            if (commondesres1) {
                this.groupMain.removeChild(commondesres1);
            }
        };
        TavernGet.prototype.onBtnClose = function () {
            this.tavern.removeEvent();
            this.tavern = null;
            this.close();
            console.log("——————————————————————————" + "新手引导： 酒馆恭喜获得关闭" + "——————————————————————————");
        };
        return TavernGet;
    }(zj.Dialog));
    zj.TavernGet = TavernGet;
    __reflect(TavernGet.prototype, "zj.TavernGet");
})(zj || (zj = {}));
//# sourceMappingURL=TavernGet.js.map