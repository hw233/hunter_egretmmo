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
     * @author xingliwei
     *
     * @date 2019-2-22
     *
     * @class 格斗场战报详情list子项的子项
     */
    var CommonArenaEnemyTeamItem = (function (_super) {
        __extends(CommonArenaEnemyTeamItem, _super);
        function CommonArenaEnemyTeamItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/arena/CommonArenaEnemyTeamItemSkin.exml";
            zj.cachekeys(zj.UIResource["CommonArenaEnemyTeamItem"], null);
            return _this;
        }
        CommonArenaEnemyTeamItem.prototype.dataChanged = function () {
            this.imgNo.source = zj.cachekey("ui_instance_WordsIconNode_png", this);
            this.imgNo.visible = true;
            this.imgStatus.visible = true;
            this.imgHeroHead.visible = true;
            this.labelLevel.visible = true;
            this.groupStar.removeChildren();
            this.imgHunterFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[0], this);
            var data = this.data;
            if (data == null)
                return;
            if (data.simpleInfo == 0) {
                this.visiblefalse();
            }
            else {
                var info = void 0;
                if (data.simpleInfo instanceof message.BattleGeneralInfo) {
                    info = data.simpleInfo;
                    if (info.generalInfo == null || info.generalInfo.general_id == 0) {
                        this.visiblefalse();
                    }
                    else {
                        this.imgNo.visible = false;
                        var headPath = zj.PlayerHunterSystem.Head(info.generalInfo);
                        this.imgHeroHead.source = zj.cachekey(headPath, this);
                        this.imgHunterFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[info.generalInfo.step], this);
                        this.labelLevel.text = info.generalInfo.level.toString();
                        var awakeLevel = info.generalInfo.awakePassive.level ? info.generalInfo.awakePassive.level : 0;
                        zj.Helper.SetHeroAwakenStar(this.groupStar, info.generalInfo.star, awakeLevel);
                        if (this.imgIconAwaken != null) {
                            this.imgIconAwaken.visible = false;
                        }
                    }
                }
                else if (data.simpleInfo instanceof message.GeneralSimpleInfo) {
                    info = data.simpleInfo;
                    if (info == null || info.general_id == 0) {
                        this.visiblefalse();
                    }
                    else {
                        this.imgNo.visible = false;
                        var headPath = zj.PlayerHunterSystem.Head(info);
                        this.imgHeroHead.source = zj.cachekey(headPath, this);
                        this.imgHunterFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[info.step], this);
                        this.labelLevel.text = info.level.toString();
                        var awakeLevel = info.awake_Level ? info.awake_Level : 0;
                        zj.Helper.SetHeroAwakenStar(this.groupStar, info.star, awakeLevel);
                        if (this.imgIconAwaken != null) {
                            this.imgIconAwaken.visible = false;
                        }
                    }
                }
                else if (data.simpleInfo instanceof message.GeneralInfo) {
                    info = data.simpleInfo;
                    if (info == null || info == 0) {
                        this.visiblefalse();
                    }
                    else if (info.general_id == 0 || info.general_id == null) {
                        this.visiblefalse();
                    }
                    else {
                        this.imgNo.visible = false;
                        var headPath = zj.PlayerHunterSystem.Head(info);
                        this.imgHeroHead.source = zj.cachekey(headPath, this);
                        this.imgHunterFrame.source = zj.cachekey(zj.UIConfig.UIConfig_Role.heroFrame[info.step], this);
                        this.labelLevel.text = info.level;
                        // let awakeLevel = 0;
                        // if(info.awakePassive == null){
                        // 	awakeLevel = info.awaken_level || 0;
                        // }else{
                        // 	awakeLevel = info.awakePassIve.level || 0;
                        // }
                        var awakeLevel = info.awake_Level ? info.awake_Level : 0;
                        zj.Helper.SetHeroAwakenStar(this.groupStar, info.star, awakeLevel);
                        if (this.imgIconAwaken != null) {
                            this.imgIconAwaken.visible = false;
                        }
                    }
                }
            }
            if (data.index > 4) {
                this.imgStatus.source = zj.cachekey(zj.Game.UIManager.cacheKey(zj.UIConfig.UIConfig_Role.inFormationIcon[0], this), this);
                this.imgStatus.bottom = -6;
                this.imgStatus.right = -6;
            }
            else {
                this.imgStatus.source = zj.cachekey(zj.Game.UIManager.cacheKey(zj.UIConfig.UIConfig_Role.inFormationIcon[2], this), this);
                this.imgStatus.bottom = 8;
                this.imgStatus.right = 5;
            }
            this.imgStatus.visible = (data.showTeam != false);
        };
        CommonArenaEnemyTeamItem.prototype.visiblefalse = function () {
            this.imgHeroHead.visible = false;
            this.labelLevel.visible = false;
            this.imgIconAwaken.visible = false;
        };
        return CommonArenaEnemyTeamItem;
    }(eui.ItemRenderer));
    zj.CommonArenaEnemyTeamItem = CommonArenaEnemyTeamItem;
    __reflect(CommonArenaEnemyTeamItem.prototype, "zj.CommonArenaEnemyTeamItem");
    /**子项数据源 */
    var CommonArenaEnemyTeamItemData = (function () {
        function CommonArenaEnemyTeamItemData() {
        }
        return CommonArenaEnemyTeamItemData;
    }());
    zj.CommonArenaEnemyTeamItemData = CommonArenaEnemyTeamItemData;
    __reflect(CommonArenaEnemyTeamItemData.prototype, "zj.CommonArenaEnemyTeamItemData");
})(zj || (zj = {}));
//# sourceMappingURL=CommonArenaEnemyTeamItem.js.map