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
    var PATCHER_RESULT;
    (function (PATCHER_RESULT) {
        PATCHER_RESULT[PATCHER_RESULT["SUCCESS"] = 0] = "SUCCESS";
        PATCHER_RESULT[PATCHER_RESULT["COMMON_ERROR"] = 1] = "COMMON_ERROR";
        PATCHER_RESULT[PATCHER_RESULT["NETWORK_ERROR"] = 2] = "NETWORK_ERROR";
        PATCHER_RESULT[PATCHER_RESULT["MD5_ERROR"] = 3] = "MD5_ERROR";
        PATCHER_RESULT[PATCHER_RESULT["ZLIB_ERROR"] = 4] = "ZLIB_ERROR";
        PATCHER_RESULT[PATCHER_RESULT["STORAGE_ERROR"] = 5] = "STORAGE_ERROR";
        PATCHER_RESULT[PATCHER_RESULT["CANCEL"] = 6] = "CANCEL";
        PATCHER_RESULT[PATCHER_RESULT["INVALID_ARG"] = 7] = "INVALID_ARG";
    })(PATCHER_RESULT || (PATCHER_RESULT = {}));
    /**
     * 战斗前loading
     */
    var LodingScene = (function (_super) {
        __extends(LodingScene, _super);
        function LodingScene() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_TransSkin.exml";
            _this.init();
            return _this;
        }
        LodingScene.prototype.init = function () {
            this.SetBGPic();
            this.TextTip.text = this.GetRandomTip();
            this.updateTimer = 0;
            this.SpriteBar.percentWidth = 0;
        };
        /**设置背景图 */
        LodingScene.prototype.SetBGPic = function () {
            var loadItem = this.GetRandomLoad();
            // if (Device.isReviewSwitch && Util.isWxMiniGame()) {
            // 	this.SpriteBG.source = cachekey("loading_board_review_jpg", this);
            // }
            if (zj.Device.isCopyright || zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.SpriteBG.source = zj.cachekey("ui_login_BoardLoading_h5_jpg", this);
            }
            else {
                this.SpriteBG.source = zj.cachekey(loadItem.bg, this);
            }
            var back_width = 1344;
            var back_height = 640;
            var rate = zj.UIManager.StageHeight / back_height;
            var rate2 = zj.UIManager.StageWidth / back_width;
            if (rate2 > rate)
                rate = rate2;
            back_width *= rate;
            back_height *= rate;
            this.SpriteBG.width = back_width;
            this.SpriteBG.height = back_height;
            if (zj.Device.isReviewSwitch || zj.Device.isCopyright) {
                this.imgName.visible = false;
                this.imgName.source = "";
            }
            else {
                this.imgName.visible = true;
                this.imgName.source = zj.cachekey(loadItem.text, this);
                if (zj.Game.TeachSystem.loadnum == 0) {
                    zj.Game.TeachSystem.loadnum = 1;
                }
            }
        };
        /**设置文字提示 */
        LodingScene.prototype.GetRandomTip = function () {
            var randTotal = {};
            var tableTips = zj.TableClientRandomTips.Table();
            if (zj.Game.PlayerInfoSystem.BaseInfo == null) {
                randTotal = tableTips;
            }
            else {
                for (var _i = 0, _a = zj.HelpUtil.GetKV(tableTips); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    if (v.level <= zj.Game.PlayerInfoSystem.BaseInfo.level) {
                        randTotal[k] = v;
                    }
                }
            }
            if (randTotal == null || zj.Util.isEmptyObj(randTotal)) {
                randTotal = tableTips;
            }
            var len = zj.Game.PlayerMissionSystem.tableLength(randTotal);
            var rowTips = Math.floor(Math.random() * (len - 1) + 1);
            var tipRet = randTotal[rowTips].des;
            return tipRet;
        };
        /**计时切换背景图 */
        LodingScene.prototype.Update = function () {
            this.updateTimer = this.updateTimer + 1;
            if (this.updateTimer > 15 * 30) {
                this.updateTimer = 0;
                this.SetBGPic();
            }
        };
        /**设置进度条 */
        LodingScene.prototype.setImgBar = function (num) {
            this.SpriteBar.percentWidth = num * 100; //this.barWidth * num;
        };
        LodingScene.prototype.closeFun = function () {
            this.close();
            if (!zj.Teach.isDone(3001)) {
                // Teach.teachingNow = false;
                // Game.TeachSystem.curPart = -1;
                zj.Teach.checkTeachId();
            }
        };
        LodingScene.prototype.GetHarmoniousLoad = function () {
            var tableLoad = zj.TableClientRandomLoading.Table();
            var ret = tableLoad[1];
            return ret;
        };
        LodingScene.prototype.GetRandomLoad = function () {
            var len = zj.Game.PlayerMissionSystem.tableLength(zj.TableClientRandomLoading.Table());
            var index = Math.floor(Math.random() * (len - 1) + 1);
            var ret = zj.TableClientRandomLoading.Item(index);
            return ret;
        };
        return LodingScene;
    }(zj.Dialog));
    zj.LodingScene = LodingScene;
    __reflect(LodingScene.prototype, "zj.LodingScene");
})(zj || (zj = {}));
//# sourceMappingURL=LodingScene.js.map