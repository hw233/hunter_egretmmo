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
     * 向上拖动选择上阵猎人list列表中--每个item数据
     */
    var FormatChooseHeroItem = (function (_super) {
        __extends(FormatChooseHeroItem, _super);
        function FormatChooseHeroItem() {
            var _this = _super.call(this) || this;
            _this.bDead = false;
            _this.touchBeginTime = 0;
            _this.touchTimeInterval = 1000; // 长按间隔1秒
            /** 是否处于长按状态中 */
            _this.isInLongPress = false;
            // 副本类型
            _this.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            _this.skinName = "resource/skins/formation/Formate_ItemHero.exml";
            // this.groupMain.cacheAsBitmap = true;//item不能加位图缓存
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                if (zj.Game.PlayerInstanceSystem.curInstanceType == 0) {
                    if (_this.data.isCanTouch) {
                        zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.data.generalId, index: -1 });
                    }
                }
                else {
                    if (_this.data.isCanTouch) {
                        zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.data.generalId, index: -1 });
                    }
                    _this.isInLongPress = false;
                    _this.touchBeginTime = egret.setTimeout(_this.onLongPress, _this, 1000, _this.data); // 超时触发（长按）
                }
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_MOVE, function () {
                egret.clearTimeout(_this.touchBeginTime); // 注销超时触发
                zj.Game.EventManager.event(zj.GameEvent.DELAY_EXECUTE, { isInLongPress: _this.isInLongPress });
            }, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, function () {
                egret.clearTimeout(_this.touchBeginTime);
            }, _this);
            zj.Game.EventManager.on(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM, function () {
                _this.dataChanged();
            }, _this);
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, function () {
                zj.Game.EventManager.event(zj.GameEvent.END_OF_THE_ANIMATION, { isAni: true });
            }, _this);
            return _this;
        }
        FormatChooseHeroItem.prototype.onLongPress = function (data) {
            var _this = this;
            if (zj.Teach.teachingNow == false && zj.Game.TeachSystem.curPart != 3002 && zj.Game.TeachSystem.curPart != 8023 && zj.Game.TeachSystem.curPart != 1003) {
                this.isInLongPress = true;
                if (zj.Game.PlayerHunterSystem.huntervis == true) {
                    zj.Game.PlayerHunterSystem.huntervis = false;
                    zj.loadUI(zj.Common_ViewHeroDetail)
                        .then(function (dialog) {
                        zj.Game.EventManager.event(zj.GameEvent.DELAY_EXECUTE, { isInLongPress: _this.isInLongPress });
                        dialog.setInfo(data.generalId, function () {
                            zj.Game.PlayerHunterSystem.huntervis = true;
                        });
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        FormatChooseHeroItem.prototype.setIcon = function (data) {
            zj.closeCache(this.groupMain);
            var framePath = zj.PlayerHunterSystem.Frame(data.generalId);
            this.imgFrame.source = zj.cachekey(framePath, this);
            var iconPath = zj.PlayerHunterSystem.Head(data.generalId);
            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                this.imgIcon.source = zj.cachekey("wx_" + iconPath, this);
            }
            else {
                this.imgIcon.source = zj.cachekey(iconPath, this);
            }
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(data.generalId);
            var baseGeneralInfo = zj.PlayerHunterSystem.Table(data.generalId);
            this.imgTopRight.source = zj.cachekey(zj.UIConfig.UIConfig_Arena.hunterFeatureType[baseGeneralInfo.features - 1], this);
            this.labelNum.text = hunterInfo.level.toString();
            zj.Helper.SetHeroAwakenStar(this.groupStar, hunterInfo.star, hunterInfo.awakePassive.level);
            this.imgLetter.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[baseGeneralInfo.aptitude], this);
            var father = data.father;
            this.selectIds = father.getSelectGenIds();
            this.imgYuan.visible = false;
            this.imgTick.visible = false;
            this.imgShade.visible = false;
            this.SpriteDead.visible = false;
            data.isCanTouch = true;
            if (Object.keys(this.selectIds).length) {
                for (var _i = 0, _a = zj.HelpUtil.GetKV(this.selectIds); _i < _a.length; _i++) {
                    var _b = _a[_i], k = _b[0], v = _b[1];
                    // 如果选中则跳过
                    if (data.generalId == v.generalId) {
                        this.imgTick.visible = true; // V
                        //this.imgShade.visible = false;// 遮罩
                        this.imgShade.visible = true;
                        this.imgShade.alpha = 0;
                        this.imgShade.touchEnabled = false;
                        if (k % 8 < 4) {
                            this.imgTick.visible = true;
                            this.imgYuan.visible = false;
                        }
                        else {
                            this.imgYuan.visible = true;
                            this.imgTick.visible = false;
                        }
                        data.isCanTouch = false;
                        break;
                    }
                    if (data.generalId % zj.CommonConfig.general_id_to_index_multiple == v.generalId % zj.CommonConfig.general_id_to_index_multiple) {
                        this.imgTick.visible = false;
                        this.imgShade.visible = true;
                        this.imgShade.alpha = 1;
                        data.isCanTouch = false;
                        break;
                    }
                    //工会战
                    if (zj.Game.PlayerLeagueSystem.Member != null && zj.Game.PlayerInstanceSystem.curInstanceType == 24) {
                        this.bDead = zj.Table.FindF(zj.Game.PlayerLeagueSystem.Member.usedMatchGenerals, function (_k, _v) {
                            return _v == data.generalId;
                        });
                        if (this.bDead) {
                            data.isCanTouch = false;
                            this.imgShade.touchEnabled = true;
                            this.imgShade.visible = true;
                            this.SpriteDead.visible = true;
                        }
                    }
                }
            }
            zj.setCache(this.groupMain);
        };
        FormatChooseHeroItem.prototype.dataChanged = function () {
            if (this.data.generalId == 0) {
                this.imgbg.visible = true;
                this.groupMain.visible = false;
                return;
            }
            else {
                this.imgbg.visible = false;
                this.groupMain.visible = true;
            }
            this.setIcon(this.data);
        };
        return FormatChooseHeroItem;
    }(eui.ItemRenderer));
    zj.FormatChooseHeroItem = FormatChooseHeroItem;
    __reflect(FormatChooseHeroItem.prototype, "zj.FormatChooseHeroItem");
    var FormatChooseHeroData = (function () {
        function FormatChooseHeroData() {
            this.isCanTouch = true;
        }
        return FormatChooseHeroData;
    }());
    zj.FormatChooseHeroData = FormatChooseHeroData;
    __reflect(FormatChooseHeroData.prototype, "zj.FormatChooseHeroData");
})(zj || (zj = {}));
//# sourceMappingURL=FormatChooseHeroItem.js.map