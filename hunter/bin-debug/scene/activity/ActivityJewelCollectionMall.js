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
    // 宝石收藏 -- 宝石商店
    // wangshenzhuo
    // 20019/05/07
    var ActivityJewelCollectionMall = (function (_super) {
        __extends(ActivityJewelCollectionMall, _super);
        function ActivityJewelCollectionMall() {
            var _this = _super.call(this) || this;
            _this.TableViewIndex = 0;
            _this.skinName = "resource/skins/activity/ActivityJewelCollectionMallSkin.exml";
            _this.buttonRed.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnclose, _this);
            return _this;
        }
        ActivityJewelCollectionMall.prototype.SetInfo = function () {
            // 商品数据
            this.aData = zj.PlayerJewelSystem.GetJewelMallData(zj.PlayerJewelSystem.GetActivityIndex());
            //当前可用宝石
            this.labelCore.text = String(zj.Game.PlayerMissionSystem.missionActive.jewelHave);
            this.SetList();
            this.fatherTips();
        };
        ActivityJewelCollectionMall.prototype.SetList = function () {
            this.listViewTask.selectedIndex = -1; // 默认选中
            this.listViewTask.itemRenderer = zj.ActivityJewelCollectionMallItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.aData.length; i++) {
                var data = new zj.ActivityJewelCollectionMallItemData();
                data.father = this;
                data.info = this.aData[i];
                data.id = i;
                this.TableViewItem.addItem(data);
            }
            this.listViewTask.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listViewTask.selectedIndex;
        };
        ActivityJewelCollectionMall.prototype.SetFather = function (father) {
            this.father = father;
        };
        ActivityJewelCollectionMall.prototype.fatherTips = function () {
            this.father.tips();
        };
        //关闭按钮
        ActivityJewelCollectionMall.prototype.onBtnclose = function () {
            this.father.SetInfo();
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return ActivityJewelCollectionMall;
    }(zj.Dialog));
    zj.ActivityJewelCollectionMall = ActivityJewelCollectionMall;
    __reflect(ActivityJewelCollectionMall.prototype, "zj.ActivityJewelCollectionMall");
})(zj || (zj = {}));
//# sourceMappingURL=ActivityJewelCollectionMall.js.map