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
    //WantedSecondMeteorlnstanceItem
    //hexiaowei
    // 2019/02/13
    var WantedSecondMeteorlnstanceItem = (function (_super) {
        __extends(WantedSecondMeteorlnstanceItem, _super);
        function WantedSecondMeteorlnstanceItem() {
            var _this = _super.call(this) || this;
            _this.buttonFloorA = [];
            _this.buttonFloorB = [];
            _this.tempButtonDelegate = [];
            _this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceItemSkin.exml";
            zj.cachekeys(zj.UIResource["WantedSecondMeteorlnstanceItem"], null);
            return _this;
        }
        WantedSecondMeteorlnstanceItem.prototype.dataChanged = function () {
            this.buttonFloorA = [
                this.btnInstance,
                this.btnInstance1,
                this.btnInstance2
            ];
            this.buttonFloorB = [
                this.btnInstanceB,
                this.btnInstanceB1,
                this.btnInstanceB2
            ];
            var index = (this.data.tableWanted.wanted_id - 10000 * this.data.indexId);
            var bSpecial = this.data.tableWanted.bSpecial == 2;
            this.imgType.visible = true;
            this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Wanted.isWin[3], this);
            // if (!bSpecial) {
            this.labelLayerBoard.text = index.toString();
            // this.imgLayerBoard.source = cachekey(UIConfig.UIConfig_Wanted.number2[index - 1], this);
            // } else {
            // this.imgLayerBoard.source = cachekey(UIConfig.UIConfig_Wanted.number3[index], this);
            // }
            var floor_id = this.data.indexId - 1;
            var get_first = zj.Table.FindK(zj.Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value) != -1;
            this.labelName.text = this.data.tableWanted.Instance_name;
            if (bSpecial) {
                this.groupFloorA.visible = false;
                this.groupFloorB.visible = true;
                this.tempButtonDelegate = this.buttonFloorB;
            }
            else {
                this.groupFloorA.visible = true;
                this.groupFloorB.visible = false;
                this.tempButtonDelegate = this.buttonFloorA;
            }
            var a = zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100;
            if (index > zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100) {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = true;
                this.labelName.textColor = zj.Helper.RGBToHex("r:180,g:180,b:180");
                zj.Helper.SetImageFilterColor(this.imgLayerBoard, "gray");
            }
            else if (index < zj.Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100 || get_first) {
                this.tempButtonDelegate[0].visible = true;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = false;
                this.labelName.textColor = zj.Helper.RGBToHex("r:255,g:255,b:0");
                zj.Helper.SetImageFilterColor(this.imgLayerBoard);
                this.imgType.visible = true;
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Wanted.isWin[1], this);
            }
            else {
                this.tempButtonDelegate[0].visible = true;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = false;
                this.labelName.textColor = zj.Helper.RGBToHex("r:255,g:255,b:0");
                zj.Helper.SetImageFilterColor(this.imgLayerBoard);
                this.imgType.visible = true;
                this.imgType.source = zj.cachekey(zj.UIConfig.UIConfig_Wanted.isWin[2], this);
            }
            if (this.selected) {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = true;
                this.tempButtonDelegate[2].visible = true;
            }
            else {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = true;
            }
        };
        return WantedSecondMeteorlnstanceItem;
    }(eui.ItemRenderer));
    zj.WantedSecondMeteorlnstanceItem = WantedSecondMeteorlnstanceItem;
    __reflect(WantedSecondMeteorlnstanceItem.prototype, "zj.WantedSecondMeteorlnstanceItem");
    //子项数据源
    var WantedSecondMeteorlnstanceItemData = (function () {
        function WantedSecondMeteorlnstanceItemData() {
        }
        return WantedSecondMeteorlnstanceItemData;
    }());
    zj.WantedSecondMeteorlnstanceItemData = WantedSecondMeteorlnstanceItemData;
    __reflect(WantedSecondMeteorlnstanceItemData.prototype, "zj.WantedSecondMeteorlnstanceItemData");
})(zj || (zj = {}));
//# sourceMappingURL=WantedSecondMeteorlnstanceItem.js.map