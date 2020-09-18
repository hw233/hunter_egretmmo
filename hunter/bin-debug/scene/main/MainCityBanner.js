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
    // 主城banner界面
    // 翟伟利
    // 2019.12.17
    var MainCityBanner = (function (_super) {
        __extends(MainCityBanner, _super);
        function MainCityBanner() {
            var _this = _super.call(this) || this;
            _this.bannerW = 200;
            _this.bannerAniTime = 5; // banner自动切换时间
            _this.skinName = "resource/skins/main/MainCityBannerSkin.exml";
            zj.cachekeys(zj.UIResource["MainCityBanner"], _this);
            return _this;
        }
        MainCityBanner.prototype.init = function () {
            this.mask = this.imgMask;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.OnTouchBegan, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.OnTouchMoved, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnTouchTap, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_END, this.OnTouchEnded, this);
            // this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.OnTouchEnded, this);
            this.banners = [];
            this.dots = [];
            this.dotgs = [];
            this.types = [];
            this.posXList = [];
            this.currIdx = 0;
            var idx = 0;
            while (this["banner" + idx]) {
                this.banners[idx] = this["banner" + idx];
                this.banners[idx].name = idx + "";
                this.posXList[idx] = -idx * this.bannerW;
                this.dots[idx] = this["dot" + idx];
                this.dotgs[idx] = this["dotg" + idx];
                if (idx > 0) {
                    this.setVisible(idx, false);
                }
                ++idx;
            }
            this.autoTime = this.bannerAniTime;
            this.isRightMove = true;
        };
        MainCityBanner.prototype.checkRandomMove = function () {
            if (this.types && this.types.length > 1) {
                if (this.isRightMove) {
                    if (this.currIdx >= this.types.length - 1) {
                        this.isRightMove = false;
                    }
                }
                else {
                    if (this.currIdx <= 0) {
                        this.isRightMove = true;
                    }
                }
                this.setMoveAni(this.isRightMove ? this.currIdx + 1 : this.currIdx - 1);
            }
        };
        MainCityBanner.prototype.Update = function (dt) {
            if (!this.isTouchDown) {
                this.autoTime -= dt;
                if (this.autoTime <= 0) {
                    this.autoTime = this.bannerAniTime;
                    this.checkRandomMove();
                }
            }
        };
        MainCityBanner.prototype.updateUIStates = function () {
            this.updateJNH();
            this.updateXinChang();
            this.updateUp();
            this.resetInfo();
        };
        MainCityBanner.prototype.resetInfo = function () {
            this.groupWidth = 0;
            this.types.length = 0;
            for (var i = 0; i < this.banners.length; ++i) {
                if (this.banners[i].visible) {
                    this.groupWidth += this.bannerW;
                    this.types.push(i);
                }
            }
            if (this.currIdx >= this.types.length) {
                this.group.x = 0;
                this.currIdx = 0;
                this.setDot(this.currIdx);
            }
        };
        MainCityBanner.prototype.setDot = function (idx) {
            for (var i = 0; i < this.types.length; ++i) {
                this.dots[this.types[i]].source = zj.cachekey(i == idx ? "ui_line_dot_1_t_png" : "ui_line_dot_2_t_png", this);
            }
        };
        MainCityBanner.prototype.updateJNH = function () {
            //新手狂欢
            var bReward = !zj.Device.isReviewSwitch && zj.Table.FindK(zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.missionReward, zj.TableEnum.Enum.TableNoviceMissionType[zj.TableEnum.Enum.TableEnumNoviceIndex.NOVICE_ONE - 1]) != -1;
            var bNovice = !bReward
                && (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_SEVEN].leftTime > 0
                    || zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MISSION_ONE].leftTime > 0);
            this.setVisible(1, bNovice);
        };
        MainCityBanner.prototype.updateXinChang = function () {
            var visible = false;
            var xinchanginfo = zj.Table.FindR(zj.Game.PlayerGiftSystem.giftInfos, function (k, v) {
                return v.gift_index == 101507;
            })[0];
            if (xinchanginfo) {
                if (zj.Game.PlayerInfoSystem.BaseInfo.level >= 15 && xinchanginfo.buy_times == 0) {
                    visible = true;
                }
            }
            this.setVisible(2, visible);
        };
        MainCityBanner.prototype.updateUp = function () {
            var vis = false;
            var RumInfo = zj.Table.FindR(zj.Game.PlayerActivitySystem.Activities, function (k, v) {
                return v.type == 23;
            })[0];
            if (RumInfo && RumInfo.closeTime - zj.Game.Controller.curServerTime > 0) {
                vis = true;
            }
            this.setVisible(3, vis);
        };
        MainCityBanner.prototype.setVisible = function (type, visible) {
            this.banners[type].visible = this.dotgs[type].visible = visible;
            if (visible) {
                this.banners[type].scaleX = this.dotgs[type].scaleX = 1;
            }
            else {
                this.banners[type].scaleX = this.dotgs[type].scaleX = 0;
            }
        };
        MainCityBanner.prototype.setMoveGroup = function (offx) {
            this.group.x += offx;
            this.group.x = this.group.x > 0 ? 0 : this.group.x;
            this.group.x = Math.max(this.group.x, -(this.groupWidth - this.bannerW));
        };
        MainCityBanner.prototype.setMoveGroupOver = function (offX) {
            if (Math.abs(offX) < 30) {
                if (this.types.length > 1) {
                    var idx = 0;
                    for (var i = 1; i < this.types.length; ++i) {
                        if (Math.abs(this.posXList[i] - this.group.x) < Math.abs(this.posXList[idx] - this.group.x)) {
                            idx = i;
                        }
                    }
                    this.setMoveAni(idx);
                }
            }
            else {
                var idx = Math.floor(Math.abs(this.group.x / this.bannerW));
                if (offX < 0) {
                    idx += 1;
                }
                idx = Math.min(idx, this.types.length - 1);
                this.setMoveAni(idx);
            }
        };
        MainCityBanner.prototype.setMoveAni = function (idx) {
            var _this = this;
            this.currIdx = idx;
            if (this.posXList[idx] - this.group.x != 0) {
                egret.Tween.get(this.group)
                    .to({ x: this.posXList[idx] }, 400)
                    .call(function () {
                    egret.Tween.removeTweens(_this.group);
                    _this.setDot(_this.currIdx);
                });
            }
            else {
                this.setDot(this.currIdx);
            }
        };
        MainCityBanner.prototype.onJump = function (type) {
            switch (type) {
                case 0:// 商城
                    zj.loadUI(zj.PayMallScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FROM_TOP);
                        scene.init(true);
                    });
                    break;
                case 1:// 嘉年华
                    zj.MainCitySceneNew.onBtnNovice1();
                    break;
                case 2:// 信长
                    zj.loadUI(zj.Activity_HunterGift)
                        .then(function (dialog) {
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                    break;
                case 3:// 酒馆
                    zj.loadUI(zj.TavernScene)
                        .then(function (scene) {
                        scene.show(zj.UI.SHOW_FILL_OUT);
                        scene.nPCDialog();
                    });
                    break;
            }
        };
        MainCityBanner.prototype.OnTouchBegan = function (touchs) {
            this.setDot(this.currIdx);
            this.autoTime = this.bannerAniTime;
            this.isTouchDown = true;
            this.isTouchMove = false;
            this.touchX = touchs.stageX;
            this.downX = touchs.stageX;
        };
        MainCityBanner.prototype.OnTouchMoved = function (touchs) {
            if (this.isTouchDown) {
                if (this.isTouchMove) {
                    this.setMoveGroup(touchs.stageX - this.touchX);
                    this.touchX = touchs.stageX;
                }
                else if (Math.abs(touchs.stageX - this.touchX) > 20) {
                    this.isTouchMove = true;
                    this.touchX = touchs.stageX;
                }
            }
        };
        MainCityBanner.prototype.OnTouchTap = function (touchs) {
            if (!this.isTouchMove) {
                this.onJump(Number(touchs.target.name));
            }
        };
        MainCityBanner.prototype.setTouchEnded = function (touchs) {
            if (this.isTouchDown) {
                this.isTouchDown = false;
                this.setMoveGroupOver(touchs.stageX - this.downX);
            }
        };
        return MainCityBanner;
    }(zj.UI));
    zj.MainCityBanner = MainCityBanner;
    __reflect(MainCityBanner.prototype, "zj.MainCityBanner");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityBanner.js.map