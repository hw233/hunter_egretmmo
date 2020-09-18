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
    // HXH_StoryInstanceMainItem
    // wangshenzhuo
    // 2019-07-18
    var StoryInstanceMainItem = (function (_super) {
        __extends(StoryInstanceMainItem, _super);
        function StoryInstanceMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["StoryInstanceMainItem"], null);
            return _this;
        }
        StoryInstanceMainItem.prototype.dataChanged = function () {
            if (this.selected) {
                this.imageSelect.visible = true;
            }
            else {
                this.imageSelect.visible = false;
            }
            var index = this.data.index;
            var info = this.data.info;
            var time = info.openTime - info.closeTime;
            this.labelTime.text = zj.Helper.activityTime(info.openTime, info.closeTime).toString();
            var curTime = zj.Game.Controller.serverNow();
            var curServerTime = Date.parse(curTime.toString()) / 1000;
            if (curServerTime < info.openTime) {
                this.imageState.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryTimePath[1], this);
            }
            else if (curServerTime >= info.openTime && curServerTime < info.closeTime) {
                this.imageState.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryTimePath[2], this);
            }
            else if (curServerTime >= info.closeTime && curServerTime < info.stopTime) {
                this.imageState.source = zj.cachekey(zj.UIConfig.UIConfig_Activity.StoryTimePath[3], this);
            }
            this.cur_table = zj.TableActivityBattle.Item(info.buffValue);
            zj.Set.ButtonBackgroud(this.buttonInstance, this.cur_table.instance_button[0].toString());
        };
        return StoryInstanceMainItem;
    }(eui.ItemRenderer));
    zj.StoryInstanceMainItem = StoryInstanceMainItem;
    __reflect(StoryInstanceMainItem.prototype, "zj.StoryInstanceMainItem");
    //子项数据源
    var StoryInstanceMainItemData = (function () {
        function StoryInstanceMainItemData() {
        }
        return StoryInstanceMainItemData;
    }());
    zj.StoryInstanceMainItemData = StoryInstanceMainItemData;
    __reflect(StoryInstanceMainItemData.prototype, "zj.StoryInstanceMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceMainItem.js.map