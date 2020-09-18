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
    //RelicMain (遗迹探索)奖励预览
    //hexiaowei
    // 2019/03/06
    var RelicAwardMain = (function (_super) {
        __extends(RelicAwardMain, _super);
        function RelicAwardMain() {
            var _this = _super.call(this) || this;
            _this.selectedIndex1 = 0;
            _this.selectedIndex2 = 0;
            _this.skinName = "resource/skins/darkLand/RelicAwardMainSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.groupOne.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroup1, _this);
            _this.groupOne.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.groupTwo.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onGroup2, _this);
            _this.groupOne.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            return _this;
        }
        RelicAwardMain.prototype.setRelicId = function (relicId) {
            this.relicId = relicId;
            this.relicTbl = zj.PlayerDarkSystem.RelicInstance(relicId);
            this.imageTitle.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicDropTitle[relicId - 1], this);
            this.imageDropDes.source = zj.cachekey(zj.UIConfig.UIConfig_DarkLand.relicDropDes[relicId - 1], this);
            this.setList();
        };
        RelicAwardMain.prototype.setList = function () {
            var awardTbl1 = zj.PlayerDarkSystem.GetRelicAwardByType(this.relicId, 1);
            var maxNum = this.relicTbl.max_step;
            this.listTableView1.selectedIndex = 0; // 默认选中
            this.listTableView1.itemRenderer = zj.RelicAwardMainItem; //
            this.selectedItem1 = new eui.ArrayCollection();
            for (var k in awardTbl1) {
                var v = awardTbl1[k];
                var data = new zj.RelicAwardMainItemData();
                data.index = Number(k);
                data.tableAward = v;
                data.bool = false;
                data.father = this;
                data.listtype = 1;
                this.selectedItem1.addItem(data);
            }
            this.listTableView1.dataProvider = this.selectedItem1;
            this.selectedIndex1 = this.listTableView1.selectedIndex;
            var awardTbl2 = zj.PlayerDarkSystem.GetRelicAwardByType(this.relicId, 2);
            this.listTableView2.selectedIndex = 0; // 默认选中
            this.listTableView2.itemRenderer = zj.RelicAwardMainItem; //
            this.selectedItem2 = new eui.ArrayCollection();
            for (var k in awardTbl2) {
                var v = awardTbl2[k];
                var data = new zj.RelicAwardMainItemData();
                data.index = Number(k);
                data.tableAward = v;
                data.bool = true;
                data.father = this;
                data.listtype = 2;
                this.selectedItem2.addItem(data);
            }
            this.listTableView2.dataProvider = this.selectedItem2;
            this.selectedIndex2 = this.listTableView2.selectedIndex;
        };
        RelicAwardMain.prototype.onDropInfoItemTap = function (isTouchBegin, data) {
            var _this = this;
            // let _type ;
            // let a = data;
            var _type = zj.PlayerItemSystem.ItemType(data.tableAward.goodsId);
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
            var distance = 0;
            var highttype = 0;
            distance = 80 * data.index;
            var goodsId = data.tableAward.goodsId;
            var count = data.tableAward.count;
            if (data.listtype == 1) {
                highttype = 95;
            }
            else if (data.listtype == 2) {
                highttype = 15;
            }
            else {
                highttype = -40;
            }
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = highttype;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = highttype;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = distance;
                        dialog.y = highttype;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(goodsId, count);
                        _this.groupMain.addChild(dialog);
                    });
                }
            }
        };
        RelicAwardMain.prototype.onGroup1 = function () {
            this.onGroupBegin(1);
        };
        RelicAwardMain.prototype.onGroup2 = function () {
            this.onGroupBegin(2);
        };
        RelicAwardMain.prototype.onGroupBegin = function (num) {
            var _this = this;
            var dialogs = this.groupMain.getChildByName("Item-group-common");
            if (dialogs)
                this.groupMain.removeChild(dialogs);
            var goodsId = 0;
            var count;
            var distance = 0;
            var highttype = 0;
            if (num == 1) {
                goodsId = 20008;
                count = 0;
                distance = 0;
                highttype = -120;
            }
            else {
                goodsId = 20001;
                count = 0;
                distance = 80;
                highttype = -120;
            }
            zj.loadUI(zj.Common_DesRes).then(function (dialogs) {
                dialogs.x = distance;
                dialogs.y = highttype;
                dialogs.name = "Item-group-common";
                dialogs.setInfo(goodsId, count);
                _this.groupMain.addChild(dialogs);
            });
        };
        //鼠标抬起，移除通关奖励材料说明
        RelicAwardMain.prototype.onRemoveAward = function () {
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
            var dialogs = this.groupMain.getChildByName("Item-group-common");
            if (dialogs)
                this.groupMain.removeChild(dialogs);
        };
        RelicAwardMain.prototype.onButtonClose = function () {
            this.close();
        };
        return RelicAwardMain;
    }(zj.Dialog));
    zj.RelicAwardMain = RelicAwardMain;
    __reflect(RelicAwardMain.prototype, "zj.RelicAwardMain");
})(zj || (zj = {}));
//# sourceMappingURL=RelicAwardMain.js.map