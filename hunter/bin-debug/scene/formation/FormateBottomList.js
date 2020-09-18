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
     * 向上拖动选择上阵猎人空list列表
     */
    var FormateBottomList = (function (_super) {
        __extends(FormateBottomList, _super);
        function FormateBottomList() {
            var _this = _super.call(this) || this;
            // 底部数据data
            _this.listBottomData = new eui.ArrayCollection();
            // 父类
            _this.father = null;
            _this.vis = true;
            _this.skinName = "resource/skins/formation/FormateBottomListSkin.exml";
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            // // 每个item点击触发
            // this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            // // 每个item是否选中状态
            // this.listBottom.allowMultipleSelection = true;
            // // 每个item显示--item数据类需要继承eui.ItemRenderer接口
            // this.listBottom.itemRenderer = FormatChooseHeroItem;
            // 初始化
            _this.init();
            _this.listBottom.dataProvider = _this.listBottomData;
            _this.listBottom.itemRenderer = zj.FormatChooseHeroItem;
            // 每个item点击触发
            _this.listBottom.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onListHerosTap, _this);
            // 每个item是否选中状态
            _this.listBottom.allowMultipleSelection = true;
            return _this;
        }
        FormateBottomList.prototype.setInfo = function (father) {
            this.father = father;
        };
        /**
         * 初始化--每一个item添加到list中
         */
        FormateBottomList.prototype.init = function () {
            zj.closeCache(this.groupCache);
            if (this.father == null || this.father == undefined) {
                return;
            }
            var hunterList = zj.PlayerHunterSystem.GetHunterList();
            var fix = zj.PlayerItemSystem.FixCount(hunterList.length, 8, 1);
            for (var i = 0; i < fix; i++) {
                hunterList.push(0);
            }
            if (this.vis == true) {
                this.listBottomData.removeAll();
                for (var i = 0; i < hunterList.length; i++) {
                    var v = hunterList[i];
                    var data = new zj.FormatChooseHeroData();
                    data.father = this.father;
                    data.generalId = v;
                    data.isCanTouch = true;
                    this.listBottomData.addItem(data);
                }
                if (this.father != null && this.father != undefined) {
                    this.vis = false;
                }
            }
            zj.setCache(this.groupCache);
            // 列表数据源--dataProvider
            // 每个item显示--item数据类需要继承eui.ItemRenderer接口
            //this.listBottom.itemRenderer = FormatChooseHeroItem;
        };
        /**
         * list中每个点击触发--eui.ItemTapEvent
         */
        FormateBottomList.prototype.onListHerosTap = function (e) {
            // 获取每一个item索引
            var index = e.itemIndex;
            var point = this.listBottom.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= zj.Game.UIManager.x;
            this.father.moveImg.x = point.x;
            this.father.moveImg.y = point.y;
            if (!e.item.isCanTouch || e.item.generalId == 0) {
                return;
            }
            this.father.up.addGeneral(e.item.generalId);
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
            // Teach.addTeaching();
        };
        FormateBottomList.prototype.getItemList = function () {
            zj.Game.PlayerFormationSystem.itemlist = [];
            var hunterList = zj.PlayerHunterSystem.GetHunterList();
            for (var i = 0; i < hunterList.length; i++) {
                var item = this.listBottom.getElementAt(i);
                zj.Game.PlayerFormationSystem.itemlist.push(item);
            }
        };
        FormateBottomList.ID = "FormateBottomList";
        return FormateBottomList;
    }(zj.UI));
    zj.FormateBottomList = FormateBottomList;
    __reflect(FormateBottomList.prototype, "zj.FormateBottomList");
})(zj || (zj = {}));
//# sourceMappingURL=FormateBottomList.js.map