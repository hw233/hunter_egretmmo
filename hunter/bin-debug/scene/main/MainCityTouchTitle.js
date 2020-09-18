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
    var MainCityTouchTitle = (function (_super) {
        __extends(MainCityTouchTitle, _super);
        function MainCityTouchTitle() {
            return _super.call(this) || this;
        }
        MainCityTouchTitle.getFuncIdx = function (type) {
            for (var i = 0; i < this.funcIdList.length; ++i) {
                if (type == this.funcIdList[i]) {
                    return i;
                }
            }
            return -1;
        };
        MainCityTouchTitle.prototype.initGroup = function (type, touchGroup) {
            this.imgFlagPub.visible = this.groupLock.visible = false;
            this.type = type;
            this.touchGroup = touchGroup;
            touchGroup.name = "touchGroup" + type;
            this.groupTitle.name = "titleGroup" + type;
            if (type == 0) {
                this.lbName.text = "招募";
            }
            else {
                var item = zj.TableFunctionOpen.Item(this.type);
                this.lbName.text = item.name;
            }
            // switch (this.type) {
            // 	case 0:// 酒馆
            // 		this.resSourceUp = "ui_mainui_BtnPubNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnPubSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE:// 1工会
            // 		this.resSourceUp = "ui_mainui_BtnUnionNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnUnionSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER:// 2格斗
            // 		this.resSourceUp = "ui_mainui_BtnHunterCambatfieldNor_png";
            // 		this.resSourceDown = "ui_mainui_btnHunterCambatfieldSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER:// 5天空竞技场
            // 		this.resSourceUp = "ui_mainui_BtnSkyArenaNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnSkyArenaSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2:// 62黑暗大陆
            // 		this.resSourceUp = "ui_mainui_BtnDarkContinentNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnDarkContinentSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED:// 7流星街
            // 		this.resSourceUp = "ui_mainui_BtnMeteorStreetNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnMeteorStreetSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL:// 26商店
            // 		this.resSourceUp = "ui_mainui_BtnShopingMallNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnShopingMallSel_png";
            // 		break;
            // 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3:// 37大草原
            // 		this.resSourceUp = "ui_mainui_BtnGreedyIslandNor_png";
            // 		this.resSourceDown = "ui_mainui_BtnGreedyIslandSel_png";
            // 		break;
            // }
            this.setUp();
        };
        MainCityTouchTitle.prototype.init = function (touchCall, touchThis, redFunc, thisObj) {
            if (redFunc === void 0) { redFunc = null; }
            if (thisObj === void 0) { thisObj = null; }
            this.touchCall = touchCall;
            this.touchThis = touchThis;
            this.redFunc = redFunc;
            this.thisObj = thisObj;
            this.setUp();
            this.addListeners();
        };
        MainCityTouchTitle.prototype.addListeners = function () {
            this.groupTitle.touchChildren = false;
            this.addListener(this.groupTitle);
            this.addListener(this.touchGroup);
        };
        MainCityTouchTitle.prototype.addListener = function (group) {
            group.touchEnabled = true;
            group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
            group.addEventListener(egret.TouchEvent.TOUCH_END, this.setUp, this);
            group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUp, this);
        };
        MainCityTouchTitle.prototype.getTouchGroup = function () {
            return this.touchGroup;
        };
        // private removeListeners() {
        // 	this.removeListener(this.groupTitle);
        // 	this.removeListener(this.touchGroup);
        // }
        // private removeListener(group: eui.Group) {
        // 	group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setDown, this);
        // 	group.removeEventListener(egret.TouchEvent.TOUCH_END, this.setUp, this);
        // 	group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUp, this);
        // }
        MainCityTouchTitle.prototype.setUp = function () {
            // this.imgBtn.source = this.resSourceUp;
        };
        MainCityTouchTitle.prototype.setDown = function () {
            // this.imgBtn.source = this.resSourceDown;
        };
        MainCityTouchTitle.prototype.refreshState = function (isAlert) {
            if (isAlert === void 0) { isAlert = false; }
            var item = zj.TableFunctionOpen.Item(this.type);
            if (item) {
                this.isOpen = item ? zj.PlayerHunterSystem.LevelDBFunOpenTo(this.type, isAlert) : true;
                this.groupLock.visible = !this.isOpen;
                if (this.isOpen) {
                    if (this.redFunc) {
                        this.imgFlagPub.visible = this.redFunc.call(this.thisObj);
                    }
                    else {
                        this.imgFlagPub.visible = false;
                    }
                    return true;
                }
                else {
                    var str = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Common.openAutoLv, item.condition);
                    this.lbOpenLevel.text = str;
                    // if(isAlert){
                    // 	toast_warning(item.unopen_tip);
                    // 	// toast(str);
                    // }
                }
                return false;
            }
            return true;
        };
        MainCityTouchTitle.prototype.onTouchDown = function () {
            this.setDown();
            this.touchCall.call(this.touchThis, this, 0);
        };
        MainCityTouchTitle.prototype.onTouchUp = function () {
            this.touchCall.call(this.touchThis, this, 1);
        };
        MainCityTouchTitle.prototype.getTouchRandom = function () {
            if (this.type == message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2) {
                return this.touchGroup.width / 4;
            }
            return this.touchGroup.width / 3;
        };
        MainCityTouchTitle.prototype.close = function (animation) {
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            if (this.parent)
                this.parent.removeChild(this);
            // this.removeListeners();
        };
        MainCityTouchTitle.funcIdList = [0,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL,
            message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3 // 37-大草原（贪婪之岛）
        ];
        MainCityTouchTitle.movePosList = {
            0: [1200, 424],
            1: [2055, 424],
            2: [2400, 424],
            5: [1484, 424],
            62: [2856, 406],
            7: [660, 406],
            26: [1844, 462],
            37: [250, 416] // 37-大草原（贪婪之岛）
        };
        return MainCityTouchTitle;
    }(zj.UI));
    zj.MainCityTouchTitle = MainCityTouchTitle;
    __reflect(MainCityTouchTitle.prototype, "zj.MainCityTouchTitle");
})(zj || (zj = {}));
//# sourceMappingURL=MainCityTouchTitle.js.map