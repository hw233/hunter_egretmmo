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
    //兑换活动
    //yuqingchao
    //2019.04.04
    var ActivityDrop = (function (_super) {
        __extends(ActivityDrop, _super);
        function ActivityDrop() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/ActivityDropSkin.exml";
            _this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFight, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        ActivityDrop.prototype.setInfo = function (info, father) {
            this.info = info;
            this.father = father;
            this.setInfoText();
            this.listView();
        };
        ActivityDrop.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        ActivityDrop.prototype.setInfoText = function () {
            var strOpen = this.time(this.info.openTime);
            var timeOpen;
            if (strOpen.m < 10) {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + "0" + strOpen.m;
            }
            else {
                timeOpen = strOpen.Y + "-" + strOpen.M + "-" + strOpen.D + "  " + strOpen.h + ":" + strOpen.m;
            }
            var strColse = this.time(this.info.closeTime);
            var timeColse;
            if (strColse.m < 10) {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + "0" + strColse.m;
            }
            else {
                timeColse = strColse.Y + "-" + strColse.M + "-" + strColse.D + "  " + strColse.h + ":" + strColse.m;
            }
            this.lbTime.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Activity.timeOpenAndClose, timeOpen, timeColse);
            this.lbInfo.text = zj.singLecraft.decodeGroupName(this.info.des, "&", false);
        };
        ActivityDrop.prototype.listView = function () {
            this.arrayCollection = new eui.ArrayCollection();
            for (var i = 0; i < this.info.collectItems.length; i++) {
                this.arrayCollection.addItem({
                    info: this.info.collectItems[i],
                    father: this
                });
            }
            this.lstItem.dataProvider = this.arrayCollection;
            this.lstItem.itemRenderer = zj.ActivityDropItem;
        };
        ActivityDrop.prototype.onBtnFight = function () {
            // loadUI(AdventureMapScene)
            // 	.then((scene: AdventureMapScene) => {
            // 		scene.show(UI.SHOW_FROM_TOP);
            // 	});
            this.father.close(zj.UI.HIDE_TO_TOP);
            zj.SceneManager.instance.EnterAdventure();
        };
        ActivityDrop.prototype.onRemoveAward = function () {
            var dialog = this.getChildByName("Item-skill-common");
            if (dialog)
                this.removeChild(dialog);
        };
        return ActivityDrop;
    }(zj.UI));
    zj.ActivityDrop = ActivityDrop;
    __reflect(ActivityDrop.prototype, "zj.ActivityDrop");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityDrop.js.map