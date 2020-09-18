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
     * @class 收藏有礼
     *
     * @author xingliwei
     *
     * 2019.08.20
     */
    var ActivityCollection = (function (_super) {
        __extends(ActivityCollection, _super);
        function ActivityCollection() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityCollectionSkin.exml";
            _this.init();
            return _this;
        }
        ActivityCollection.prototype.init = function () {
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
            this.btnLeaveFor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLesverFor, this);
            this.btnLookOver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLookOver, this);
            this.btnCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopy, this);
            this.setInfo();
        };
        ActivityCollection.prototype.isFullScreen = function () {
            return true;
        };
        /**根据设备信息设置界面信息 */
        ActivityCollection.prototype.setInfo = function () {
            if (zj.Util.isWxMiniGame()) {
                this.imgAndroid.visible = true;
                this.imgIOS1.visible = false;
                this.imgIOS2.visible = false;
                this.imgIOS3.visible = false;
            }
            else if (ActivityCollection.myBrowser() == "Safari") {
                this.imgAndroid.visible = false;
                this.imgIOS1.visible = false;
                this.imgIOS2.visible = true;
                this.imgIOS3.visible = false;
            }
            else if (ActivityCollection.myBrowser() == "micromessenger") {
                this.imgAndroid.visible = false;
                this.imgIOS1.visible = true;
                this.imgIOS2.visible = false;
                this.imgIOS3.visible = false;
            }
            else if (egret.Capabilities.os == "iOS") {
                this.imgAndroid.visible = false;
                this.imgIOS1.visible = false;
                this.imgIOS2.visible = false;
                this.imgIOS3.visible = true;
            }
            //判断是否已经领取
            var vis = true;
            for (var _i = 0, _a = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType; _i < _a.length; _i++) {
                var key = _a[_i];
                if (key == 10001) {
                    vis = false;
                }
            }
            if ((zj.Util.isWxMiniGame() && egret.Capabilities.os == "Android")) {
                var a = window['wx']["getLaunchOptionsSync"]();
                if (a) {
                    this.btnGet.visible = (vis && a.scene == 1023);
                }
            }
            else {
                // this.btnGet.visible = (vis && !window.name && ActivityCollection.URL.indexOf("from=desktop") >= 0);//window.location.href
                if (navigator) {
                    if (navigator["standalone"] == true || navigator["standalone"] == false) {
                        this.btnGet.visible = (vis && navigator["standalone"] == true && egret.Capabilities.os == "iOS" && ActivityCollection.myBrowser() == "Safari"); //&& !window.name && ActivityCollection.URL.indexOf("?from=desktop") >= 0);//window.location.href
                    }
                }
            }
            if (this.imgIOS3.visible) {
                this.btnCopy.visible = true;
            }
            else {
                this.btnCopy.visible = false;
                // if (!window.name && ActivityCollection.URL.indexOf("?from=desktop") < 0) {//window.location.href
                // 	window.name = 'test';
                // }
            }
        };
        /**领取 */
        ActivityCollection.prototype.onBtnGet = function () {
            var _this = this;
            this.receiveAward(10001).then(function (gameInfo) {
                zj.loadUI(zj.CommonGetDialog)
                    .then(function (dialog) {
                    dialog.init(gameInfo.getGoods);
                    dialog.show();
                    ActivityCollection.vis = false;
                    dialog.setCB(function () {
                        _this.onBtnClose();
                    });
                });
            }).catch(function () {
            });
        };
        /**前往 */
        ActivityCollection.prototype.onBtnLesverFor = function () {
            ActivityCollection.guidance = true;
            this.onBtnClose();
        };
        /**查看奖励 */
        ActivityCollection.prototype.onBtnLookOver = function () {
            var awards = [];
            var a = new message.GoodsInfo();
            a.count = 2;
            a.goodsId = 20020;
            awards.push(a);
            var b = new message.GoodsInfo();
            b.count = 1;
            b.goodsId = 30452;
            awards.push(b);
            var c = new message.GoodsInfo();
            c.count = 5;
            c.goodsId = 30003;
            awards.push(c);
            zj.loadUI(zj.Daily_AwardPop)
                .then(function (dialog) {
                dialog.SetInfoGift(awards, null, null, null, function () {
                });
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        /**关闭 */
        ActivityCollection.prototype.onBtnClose = function () {
            zj.Game.EventManager.event(zj.GameEvent.MAIN_CITY_UPDATE);
            this.close(zj.UI.HIDE_TO_TOP);
        };
        /**领取奖励发协议 */
        ActivityCollection.prototype.receiveAward = function (type) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.ShareRewardRequest();
                request.body.share_type = type;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
            });
        };
        /**复制 */
        ActivityCollection.prototype.onBtnCopy = function () {
            zj.platform.setClipboardData(window.location.href);
        };
        ActivityCollection.myBrowser = function () {
            if (navigator) {
                if (navigator.userAgent) {
                    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
                    var ua = navigator.userAgent.toLowerCase();
                    // toast(ua);  
                    var isOpera = userAgent.indexOf("Opera") > -1;
                    if (isOpera) {
                        return "Opera";
                    }
                    ; //判断是否Opera浏览器
                    if (userAgent.indexOf("Firefox") > -1) {
                        return "FF";
                    } //判断是否Firefox浏览器
                    if (userAgent.indexOf("Chrome") > -1) {
                        return "Chrome";
                    } //判断是否谷歌浏览器
                    if (userAgent.indexOf("Safari") > -1) {
                        return "Safari";
                    } //判断是否Safari浏览器
                    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                        return "IE";
                    }
                    ; //判断是否IE浏览器
                    var isWeixin = ua.indexOf('micromessenger') != -1;
                    if (isWeixin) {
                        return "micromessenger";
                    }
                }
            }
            return "no";
        };
        Object.defineProperty(ActivityCollection.prototype, "IsHtml5", {
            /**
             * 当前是否是H5版本
             * @returns{boolean}
             * @constructor
             */
            get: function () {
                return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityCollection.prototype, "IsSafariBrowser", {
            /**
             * 是否是Safari浏览器
             * @returns{boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ActivityCollection.prototype, "IsOperaBrowser", {
            /**
             * 是否是Opera浏览器
             * @returns{boolean}
             * @constructor
             */
            get: function () {
                return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
            },
            enumerable: true,
            configurable: true
        });
        ActivityCollection.URL = "";
        /**判断收藏有礼引导是否开启 */
        ActivityCollection.guidance = false;
        // 判断收藏有礼是否领取
        ActivityCollection.vis = true;
        return ActivityCollection;
    }(zj.Dialog));
    zj.ActivityCollection = ActivityCollection;
    __reflect(ActivityCollection.prototype, "zj.ActivityCollection");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityCollection.js.map