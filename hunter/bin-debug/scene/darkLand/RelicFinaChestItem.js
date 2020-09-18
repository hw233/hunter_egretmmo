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
    //RelicFinaChestItem
    //hexiaowei
    // 2019/03/12
    var RelicFinaChestItem = (function (_super) {
        __extends(RelicFinaChestItem, _super);
        function RelicFinaChestItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/darkLand/RelicFinaChestItemSkin.exml";
            zj.cachekeys(zj.UIResource["RelicFinaChestItem"], null);
            _this.buttonOpen.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonOpen, _this);
            return _this;
        }
        //添加龙骨动画
        RelicFinaChestItem.prototype.addAnimatoin = function (dbName, animationName, playTimes, group, armatureName) {
            if (armatureName === void 0) { armatureName = "armatureName"; }
            zj.Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(function (display) {
                display.x = group.explicitWidth / 2;
                //display.y =this.height*0.25;
                display.y = group.explicitHeight / 2;
                display.scaleX = 0.55;
                display.scaleY = 0.55;
                group.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
        };
        RelicFinaChestItem.prototype.dataChanged = function () {
            var chestTbl = zj.PlayerDarkSystem.RelicInstanceChest(this.data.chest);
            this.father = this.data.father;
            var _a = zj.PlayerDarkSystem.CanOpenByChestId(this.data.chest), canopen = _a[0], bGet = _a[1];
            this.chestId = this.data.chest;
            this.buttonOpen.enabled = canopen;
            this.buttonOpen.visible = bGet;
            this.buttonNotGet.visible = !bGet;
            this.buttonNotGet.enabled = false;
            var path = zj.Table.DeepCopy(chestTbl.path);
            if (!bGet) {
                path[0] = path[2];
                path[1] = path[2];
            }
            else if (!canopen) {
                path[0] = path[0];
                path[2] = path[1];
            }
            else {
                path[1] = path[0];
                path[2] = path[0];
                this.addAnimatoin("xiaojiesuan_heiandalu", "003_xiangzi", 0, this.groupTreasure);
            }
            this.imageChestBox.source = zj.cachekey(path[0], this);
            this.groupTreasure.visible = canopen;
            this.imageChestBox.visible = !canopen;
            if (this.data.father instanceof zj.Relic_BigEnd) {
                this.imgBg.visible = false;
            }
        };
        RelicFinaChestItem.prototype.onButtonOpen = function () {
            var _this = this;
            var chestId = this.chestId;
            var exit = zj.Table.FindF(zj.Game.PlayerInstanceSystem.RelicChest, function (k, v) {
                return v.key == chestId;
            });
            if (this.father instanceof zj.RelicFinaChest) {
                this.father;
            }
            if (this.father instanceof zj.Relic_BigEnd) {
                this.father;
            }
            if (exit) {
                zj.loadUI(zj.RelicOpenChest)
                    .then(function (dialog) {
                    dialog.setChestId(_this.chestId, _this.father);
                    dialog.show(zj.UI.SHOW_FROM_TOP);
                });
            }
        };
        return RelicFinaChestItem;
    }(eui.ItemRenderer));
    zj.RelicFinaChestItem = RelicFinaChestItem;
    __reflect(RelicFinaChestItem.prototype, "zj.RelicFinaChestItem");
    //子项数据源
    var RelicFinaChestItemData = (function () {
        function RelicFinaChestItemData() {
        }
        return RelicFinaChestItemData;
    }());
    zj.RelicFinaChestItemData = RelicFinaChestItemData;
    __reflect(RelicFinaChestItemData.prototype, "zj.RelicFinaChestItemData");
})(zj || (zj = {}));
//# sourceMappingURL=RelicFinaChestItem.js.map