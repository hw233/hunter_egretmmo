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
    //Tavern Pop
    //hexiaowei
    //2018/11/12
    var TavernPop = (function (_super) {
        __extends(TavernPop, _super);
        function TavernPop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/tavern/TavernPopSkin.exml";
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            /*
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnone, this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
            */
            _this.btnOne.enabled = false;
            _this.btnMore.enabled = false;
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.info();
            return _this;
        }
        TavernPop.prototype.init = function (tavern) {
            this.tavern = tavern;
        };
        TavernPop.prototype.info = function () {
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.group4.visible = false;
            this.group5.visible = false;
            this.imageHunter1.mask = this.rectMask1;
            this.imageHunter2.mask = this.rectMask2;
            this.imageHunter3.mask = this.rectMask3;
            this.imageHunter4.mask = this.rectMask4;
            this.imageHunter5.mask = this.rectMask5;
            this.groupArray = [
                this.group1,
                this.group2,
                this.group3,
                this.group4,
                this.group5
            ];
        };
        TavernPop.prototype.setInfo = function (info) {
            this.taverninfo = info;
            this.num = this.taverninfo.length;
            if (this.taverninfo.length == 2) {
                //this.group1.horizontalCenter = -350;
                //this.group2.horizontalCenter = 350;
                this.group1.horizontalCenter = -(this.width * 0.24);
                this.group2.horizontalCenter = this.width * 0.24;
            }
            else if (this.taverninfo.length == 3) {
                /*
                this.group1.horizontalCenter = -450;
                this.group2.horizontalCenter = 0;
                this.group3.horizontalCenter = 450;
                */
                this.group1.horizontalCenter = -(this.width * 0.34);
                this.group2.horizontalCenter = 0;
                this.group3.horizontalCenter = this.width * 0.34;
            }
            else if (this.taverninfo.length == 4) {
                /*
                this.group1.horizontalCenter = -480;
                this.group2.horizontalCenter = -160;
                this.group3.horizontalCenter = 160;
                this.group4.horizontalCenter = 480;
                */
                this.group1.horizontalCenter = -(this.width * 0.375);
                this.group2.horizontalCenter = -(this.width * 0.125);
                this.group3.horizontalCenter = this.width * 0.125;
                this.group4.horizontalCenter = this.width * 0.375;
            }
            if (zj.Game.PlayerInfoSystem.Soda >= 5) {
                this.labelPossessSodaNum.text = (5).toString();
                this.sodaNum = 5;
            }
            else if (zj.Game.PlayerInfoSystem.Soda >= 1) {
                this.labelPossessSodaNum.text = zj.Game.PlayerInfoSystem.Soda.toString();
                this.sodaNum = zj.Game.PlayerInfoSystem.Soda;
            }
            else {
                this.btnMore.visible = false;
                this.labelPossessSodaNum.visible = false;
                this.btnOne.horizontalCenter = 0;
            }
            for (var i = 1; i <= 5; i++) {
                var index = i - 1;
                if (index < this.taverninfo.length) {
                    var goodsId = info[index].goodsId;
                    var aptitude = zj.PlayerHunterSystem.Table(goodsId).aptitude;
                    //this.aptitudeList.push(aptitude);
                    var roleId = zj.PlayerHunterSystem.Table(goodsId).general_roleId;
                    //this[`labelHuntername${i}`].text=PlayerHunterSystem.Table(goodsId ).general_name
                    this["imageHuntername" + i].source = zj.cachekey(zj.PlayerHunterSystem.Table(goodsId).name_pic, this);
                    this["imageRank" + i].source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[aptitude], this);
                    this["imagebackground" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Tavern.tavernBoard[aptitude], this);
                    var path = zj.PlayerHunterSystem.MapInstance(roleId).half_path;
                    console.log(path);
                    this["imageHunter" + i].source = zj.cachekey(path, this);
                    zj.TavernPopA.GetNodeStarByAlignLeft(this["groupStar" + i], zj.PlayerHunterSystem.Table(goodsId).init_star, zj.CommonConfig.general_max_star, 0.8, null, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], null);
                }
            }
            //this.setInfoAni(1); 
        };
        TavernPop.prototype.setInfoAni = function (i) {
            var _this = this;
            if (i > this.num) {
                this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnone, this);
                this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
                this.btnOne.enabled = true;
                this.btnMore.enabled = true;
                return;
            }
            ;
            var display = this.groupArray[i - 1];
            egret.Tween.get(display)
                .call(function () { display.visible = true; })
                .to({ scaleY: 3, scaleX: 3 }, 0)
                .to({ scaleY: 0.95, scaleX: 0.95 }, 150, egret.Ease.quadIn)
                .call(function () { _this.addAnimatoin("ui_jiuguan_sudashui_new", "000_lan", 1, display); })
                .call(function () { _this.onFadingin(i); })
                .to({ scaleY: 1.03, scaleX: 1.03 }, 100, egret.Ease.quadIn)
                .to({ scaleY: 1, scaleX: 1 }, 150, egret.Ease.sineInOut)
                .call(function () { console.log(i++); _this.setInfoAni(i++); }, this);
        };
        TavernPop.prototype.onFadingin = function (i) {
            var display = this["groupImage" + i];
            egret.Tween.get(display)
                .to({ alpha: 0 })
                .to({ alpha: 1 }, 100);
        };
        //返回
        TavernPop.prototype.onBtnone = function () {
            this.tavern.removeEvent();
            this.close();
        };
        //添加龙骨动画
        TavernPop.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        //再喝多少杯
        TavernPop.prototype.onBtnMore = function () {
            var _this = this;
            egret.Tween.get(this)
                .call(function () {
                //this.tavern.removeChild(this);
                _this.close();
            })
                .wait(1000, true)
                .call(function () {
                // this.tavern.removeEvent();
                if (zj.Game.PlayerInfoSystem.Soda >= 2) {
                    _this.tavern.onBtnxxxSoda(_this.sodaNum);
                }
                else {
                    _this.tavern.onBtnDrinkOneSoda();
                }
            });
            //this.setInfoAni(1);
        };
        return TavernPop;
    }(zj.UI));
    zj.TavernPop = TavernPop;
    __reflect(TavernPop.prototype, "zj.TavernPop");
})(zj || (zj = {}));
//# sourceMappingURL=TavernPop.js.map