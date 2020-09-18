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
    // wangshenzhuo
    // 2019-7-23
    // HXH_StoryInstanceAdventure
    var StoryInstanceAdventure = (function (_super) {
        __extends(StoryInstanceAdventure, _super);
        function StoryInstanceAdventure() {
            var _this = _super.call(this) || this;
            _this.itemIndex = 0;
            _this.itemShowIndex = 0;
            _this.list_item = [];
            _this.itemShow = true;
            _this.skinName = "resource/skins/storyHunter/StoryInstanceAdventureSkin.exml";
            _this.listInstance.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onButtonAward, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.hideGoods, _this);
            return _this;
        }
        ;
        StoryInstanceAdventure.prototype.Father = function (father) {
            this.father = father;
        };
        StoryInstanceAdventure.prototype.LoadList = function (instancePack, mob, activityInfo) {
            var _this = this;
            this.activityInfo = activityInfo;
            this.list_item = [];
            this.cur_sel = null;
            this.last_sel = null;
            this.focus_item_index = 0;
            this.mob = mob;
            if (mob > instancePack[instancePack.length - 1]) {
                this.listInstance.selectedIndex = -1;
                // this.listInstance.selectedIndex = 0;
            }
            else {
                this.listInstance.selectedIndex = mob - instancePack[0];
                // this.listInstance.selectedIndex = 0;
            }
            this.itemShowIndex = this.listInstance.selectedIndex;
            this.listInstance.itemRenderer = zj.StoryInstanceAdventureItem;
            this.listInstancetem = new eui.ArrayCollection();
            for (var kk in instancePack) {
                var vv = instancePack[kk];
                if (vv == mob) {
                    this.focus_item_index == kk;
                }
                var data = new zj.StoryInstanceAdventureItemData();
                data.index = Number(kk);
                data.instanceId = vv;
                data.father = this;
                data.activityInfo = this.activityInfo;
                this.listInstancetem.addItem(data);
            }
            this.listInstance.dataProvider = this.listInstancetem;
            this.itemIndex = this.listInstance.selectedIndex;
            this.listInstance.validateNow();
            this.scrollerAdventure.viewport = this.listInstance;
            setTimeout(function () {
                if (_this.itemIndex != -1) {
                    var a = _this.itemIndex;
                    var b = _this.scrollerAdventure.height;
                    if (15 * 119 + 180 - _this.itemIndex * 119 > _this.scrollerAdventure.height) {
                        _this.listInstance.scrollV = _this.itemIndex * 119;
                    }
                    else {
                        _this.listInstance.scrollV = 840 + 180 - _this.scrollerAdventure.height + _this.itemIndex * 18;
                    }
                }
                else {
                    _this.listInstance.scrollV = 0;
                }
            }, 300);
            var titlePath = this.father.cur_table.instance_Title;
            this.imgChapter1.source = zj.cachekey(titlePath, this);
        };
        StoryInstanceAdventure.prototype.hideGoods = function (ev) {
            var a = ev.data;
            this.itemShow = ev.data.isshow;
        };
        StoryInstanceAdventure.prototype.onButtonAward = function (e) {
            this.itemIndex = this.listInstance.selectedIndex;
            var item = this.listInstance.getElementAt(this.listInstance.selectedIndex);
            var itemDate = this.listInstancetem.getItemAt(this.listInstance.selectedIndex);
            if (itemDate.isMack == true || this.itemShow == false) {
                this.itemShow = true;
                return;
            }
            else {
                for (var i = 0; i < this.listInstancetem.length; i++) {
                    var tmp = this.listInstancetem.source[i];
                    if (i != this.listInstance.selectedIndex) {
                        tmp["isShow"] = true;
                        tmp["isTween"] = true;
                        this.listInstancetem.replaceItemAt(tmp, i);
                    }
                    else {
                        tmp["isShow"] = !tmp["isShow"];
                        tmp["isTween"] = true;
                        this.listInstancetem.replaceItemAt(tmp, i);
                    }
                    tmp["isTween"] = false;
                }
            }
        };
        return StoryInstanceAdventure;
    }(zj.UI));
    zj.StoryInstanceAdventure = StoryInstanceAdventure;
    __reflect(StoryInstanceAdventure.prototype, "zj.StoryInstanceAdventure");
})(zj || (zj = {}));
//# sourceMappingURL=StoryInstanceAdventure.js.map