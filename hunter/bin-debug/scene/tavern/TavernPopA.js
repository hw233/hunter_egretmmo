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
    //Tavern PopA
    //hexiaowei
    //2018/11/15
    var TavernPopA = (function (_super) {
        __extends(TavernPopA, _super);
        function TavernPopA() {
            var _this = _super.call(this) || this;
            _this.aptitudeList = [];
            _this.vis = true;
            _this.skinName = "resource/skins/tavern/TavernPopASkin.exml";
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            _this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnone, _this);
            _this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnMore, _this);
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            _this.info();
            return _this;
        }
        TavernPopA.prototype.init = function (tavern, vis) {
            this.tavern = tavern;
            this.vis = vis;
        };
        TavernPopA.prototype.info = function () {
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.group4.visible = false;
            this.group5.visible = false;
            this.group6.visible = false;
            this.group7.visible = false;
            this.group8.visible = false;
            this.group9.visible = false;
            this.group10.visible = false;
            this.groupBtn.visible = false;
            this.btnMore.visible = false;
            this.labelBeel10.visible = false;
            this.groupImage1.alpha = 0;
            this.groupImage2.alpha = 0;
            this.groupImage3.alpha = 0;
            this.groupImage4.alpha = 0;
            this.groupImage5.alpha = 0;
            this.groupImage6.alpha = 0;
            this.groupImage7.alpha = 0;
            this.groupImage8.alpha = 0;
            this.groupImage9.alpha = 0;
            this.groupImage10.alpha = 0;
            this.groupArray = [
                this.group1,
                this.group2,
                this.group3,
                this.group4,
                this.group5,
                this.group6,
                this.group7,
                this.group8,
                this.group9,
                this.group10
            ];
            this.imageHunter1.mask = this.rectMask1;
            this.imageHunter2.mask = this.rectMask2;
            this.imageHunter3.mask = this.rectMask3;
            this.imageHunter4.mask = this.rectMask4;
            this.imageHunter5.mask = this.rectMask5;
            this.imageHunter6.mask = this.rectMask6;
            this.imageHunter7.mask = this.rectMask7;
            this.imageHunter8.mask = this.rectMask8;
            this.imageHunter9.mask = this.rectMask9;
            this.imageHunter10.mask = this.rectMask10;
        };
        TavernPopA.prototype.setInfo = function (info) {
            this.taverninfo = info;
            for (var k in info) {
                if (info.hasOwnProperty(k)) {
                    if (zj.PlayerItemSystem.ItemType(info[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        var v = info[k];
                        var table = zj.PlayerHunterSystem.Table(v.goodsId);
                        if (table) {
                            if (table.aptitude >= 13) {
                                console.log(k + "kaishi");
                                this.aptitudeList.push(Number(k));
                            }
                        }
                        else {
                            console.error("这是抽到了啥：" + v.goodsId);
                        }
                    }
                }
            }
            //this.imageHuntername1.source=PlayerHunterSystem.Table(info[0].goodsId).name_pic;
            for (var i = 1; i <= 10; i++) {
                var index = i - 1;
                if (index < this.taverninfo.length) {
                    var goodsId = info[index].goodsId;
                    var aptitude = zj.PlayerHunterSystem.Table(goodsId).aptitude;
                    //this.aptitudeList.push(aptitude);
                    var roleId = zj.PlayerHunterSystem.Table(goodsId).general_roleId;
                    //this[`labelHuntername${i}`].text=PlayerHunterSystem.Table(goodsId ).general_name
                    var imageHuntername = zj.PlayerHunterSystem.Table(goodsId).name_pic;
                    var imageRank = zj.UIConfig.UIConfig_General.hunter_grade[aptitude];
                    var imagebackground = zj.UIConfig.UIConfig_Tavern.tavernBoard[aptitude];
                    var imageHunter = zj.PlayerHunterSystem.MapInstance(roleId).half_path;
                    this["imageHuntername" + i].source = zj.cachekey(imageHuntername, this);
                    this["imageRank" + i].source = zj.cachekey(imageRank, this);
                    this["imagebackground" + i].source = zj.cachekey(imagebackground, this);
                    this["imageHunter" + i].source = zj.cachekey(imageHunter, this);
                    TavernPopA.GetNodeStarByAlignLeft(this["groupStar" + i], zj.PlayerHunterSystem.Table(goodsId).init_star, zj.CommonConfig.general_max_star, 0.8, null, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], null);
                }
            }
        };
        //十连抽播放动画
        TavernPopA.prototype.setInfoAni = function (ind_times) {
            var _this = this;
            var infonew = 0;
            if (ind_times > 10) {
                this.tavern.onTavernget();
                this.groupBtn.visible = true;
                if (this.vis) {
                    if (zj.Game.PlayerInfoSystem.Rum >= 10) {
                        this.btnMore.visible = true;
                        this.labelBeel10.visible = true;
                    }
                    else {
                        this.groupBtn.horizontalCenter = 0;
                        this.btnOne.horizontalCenter = 0;
                    }
                }
                else {
                    if (zj.Game.PlayerInfoSystem.Beer >= 10) {
                        this.btnMore.visible = true;
                        this.labelBeel10.visible = true;
                    }
                    else {
                        this.groupBtn.horizontalCenter = 0;
                        this.btnOne.horizontalCenter = 0;
                    }
                }
                return;
            }
            ;
            var display = this.groupArray[ind_times - 1];
            //display.visible = true;    //   -------------------------
            egret.Tween.get(display)
                .call(function () { display.visible = true; })
                .to({ scaleY: 3, scaleX: 3 }, 0)
                .to({ scaleY: 0.95, scaleX: 0.95 }, 150, egret.Ease.quadIn)
                .call(function () {
                for (var m = 0; m <= _this.aptitudeList.length; m++) {
                    if (ind_times == (_this.aptitudeList[m] + 1)) {
                        var goodsId = _this.taverninfo[_this.aptitudeList[m]].goodsId;
                        infonew = zj.PlayerHunterSystem.Table(goodsId).aptitude;
                        break;
                    }
                }
                if (infonew == 13) {
                    _this.addAnimatoin("ui_jiuguan_sudashui_new", "001_zi", 1, display);
                    _this.addAnimatoin("ui_jiuguan_sudashui_new", "004_zi_xunhuan", 0, display);
                }
                else if (infonew == 14) {
                    _this.addAnimatoin("ui_jiuguan_sudashui_new", "002_cheng", 1, display);
                    _this.addAnimatoin("ui_jiuguan_sudashui_new", "005_cheng_xunhuan", 0, display);
                }
                else {
                    _this.addAnimatoin("ui_jiuguan_sudashui_new", "000_lan", 1, display);
                }
            })
                .call(function () { _this.onFadingin(ind_times); })
                .to({ scaleY: 1, scaleX: 1 }, 100, egret.Ease.quadIn)
                .to({ scaleY: 0.85, scaleX: 0.85 }, 150, egret.Ease.sineInOut)
                .call(function () {
                for (var m = 0; m <= _this.aptitudeList.length; m++) {
                    if (ind_times == (_this.aptitudeList[m] + 1)) {
                        var goodsId = _this.taverninfo[_this.aptitudeList[m]].goodsId;
                        _this.tavern.test(function () { _this.setInfoAni(ind_times + 1); }, _this, goodsId);
                        return;
                    }
                }
                if (ind_times == 10) {
                    _this.tavern.onEarnPoint(1);
                    _this.groupBtn.visible = true;
                    // if (Game.PlayerInfoSystem.Beer >= 10) {
                    //     this.btnMore.visible = true;
                    //     this.labelBeel10.visible = true;
                    // } else {
                    //     this.groupBtn.horizontalCenter = 0;
                    //     this.btnOne.horizontalCenter = 0;
                    // }
                    if (_this.vis) {
                        if (zj.Game.PlayerInfoSystem.Rum >= 10) {
                            _this.btnMore.visible = true;
                            _this.labelBeel10.visible = true;
                        }
                        else {
                            _this.groupBtn.horizontalCenter = 0;
                            _this.btnOne.horizontalCenter = 0;
                        }
                    }
                    else {
                        if (zj.Game.PlayerInfoSystem.Beer >= 10) {
                            _this.btnMore.visible = true;
                            _this.labelBeel10.visible = true;
                        }
                        else {
                            _this.groupBtn.horizontalCenter = 0;
                            _this.btnOne.horizontalCenter = 0;
                        }
                    }
                    return;
                }
                else {
                    _this.setInfoAni(ind_times + 1);
                }
            }, this);
        };
        //添加龙骨动画
        TavernPopA.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                display.y = group.explicitHeight / 2;
                // display.animation.timeScale = 2;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        TavernPopA.prototype.onFadingin = function (i) {
            var display = this["groupImage" + i];
            egret.Tween.get(display)
                .to({ alpha: 0 })
                .to({ alpha: 1 }, 100);
        };
        //返回
        TavernPopA.prototype.onBtnone = function () {
            // this.tavern.removeEvent();
            this.close();
        };
        //再喝十杯
        TavernPopA.prototype.onBtnMore = function () {
            var _this = this;
            this.tavern.AddEvent();
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
                .call(function () {
                _this.close();
                //this.tavern.removeChild(this); 
            })
                .wait(1000, true)
                .call(function () {
                if (_this.vis) {
                    _this.tavern.onBtnDrinkAnother10Run();
                }
                else {
                    _this.tavern.onBtnDrinkAnother10Beel();
                }
            });
            //this.setInfoAni(1);
        };
        /**
        * 获取在直线上的点
        *
        * @param positionCenter 中心点坐标
        * @param gap 两点的间距
        * @param num 数量
        * @param angle 角度
        */
        TavernPopA.GetLinePosition = function (centerX, centerY, gap, num, angle) {
            if (angle === void 0) { angle = 0; }
            // console.log("\n---- centerX = ", centerX, "centerY = ", centerY, " gap = ", gap, " num = ", num);
            var ret = [];
            for (var i = 0; i < num; i++) {
                var pos = new egret.Point();
                pos.x = centerX + gap * i;
                //pos.y = centerY + gap * i * Math.tan(this.DegreeToRadian(angle));
                ret.push(pos);
            }
            return ret;
        };
        /**
         * 居左对齐星星
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param showDark 是否显示暗星
         * @param lightStarPath 亮星路径
         * @param darkStarPath 暗星路径
         */
        TavernPopA.GetNodeStarByAlignLeft = function (node, star, maxStar, scale, showDark, lightStarPath, darkStarPath) {
            if (showDark === void 0) { showDark = false; }
            if (lightStarPath === void 0) { lightStarPath = null; }
            if (darkStarPath === void 0) { darkStarPath = null; }
            node.removeChildren();
            scale = (scale != null) ? scale : node.scaleX;
            maxStar = (maxStar != null) ? maxStar : zj.CommonConfig.general_max_star;
            //star = (maxStar < star) ? maxStar : star;
            var showStarNum = showDark ? maxStar : star;
            lightStarPath = (lightStarPath != null) ? lightStarPath : zj.UIConfig.UIConfig_Role.starOnNew;
            var mn = (node.width - 18 * star) / 2 - 5;
            darkStarPath = (darkStarPath != null) ? darkStarPath : zj.UIConfig.UIConfig_Role.heroAwakenStar[0];
            var gap = node.width / (maxStar - 1);
            var centerPos = new egret.Point((node.width) / 2, node.height / 2);
            var posList = this.GetLinePosition(mn, centerPos.y, 18, star);
            for (var i = 0; i < showStarNum; i++) {
                var img = new eui.Image();
                img.source = (i < star) ? lightStarPath : darkStarPath;
                img.x = posList[i].x;
                img.y = 0;
                if (i < star) {
                    node.addChild(img);
                }
                else {
                    if (showDark == true) {
                        node.addChild(img);
                    }
                }
                img.scaleX = scale;
                img.scaleY = scale;
                //img.anchorOffsetX = img.width/2;
                //img.anchorOffsetY = img.height/2;
            }
        };
        return TavernPopA;
    }(zj.UI));
    zj.TavernPopA = TavernPopA;
    __reflect(TavernPopA.prototype, "zj.TavernPopA");
})(zj || (zj = {}));
//# sourceMappingURL=TavernPopA.js.map