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
    var Common_OutPutItem = (function (_super) {
        __extends(Common_OutPutItem, _super);
        function Common_OutPutItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/common/Common_OutPutItemSkin.exml";
            zj.cachekeys(zj.UIResource["Common_OutPutItem"], null);
            return _this;
        }
        Common_OutPutItem.prototype.dataChanged = function () {
            this.updateView(this.data);
        };
        Common_OutPutItem.prototype.updateView = function (data) {
            this.labelNotOpen.visible = false;
            if (data.fromId != 0 && (data.mobId == null || data.mobId == undefined) && data.fromId != 41) {
                this.fromId = data.fromId;
                this.mobId = data.mobId;
                // let item = this.data as TableClientGetProp;
                var item = zj.TableClientGetProp.Item(data.fromId);
                if (item == null) {
                    throw Error("item should not null.");
                }
                this.imgIcon1.source = zj.cachekey(item.path, this);
                this.imgIcon2.source = zj.cachekey(item.path, this);
                this.labelName.text = item.name;
                var bOpen = zj.Game.PlayerMissionSystem.Open(item.index);
                var color = bOpen ? 0x1C5A00 : zj.ConstantConfig_Common.Color.red;
                this.labelInfo.text = bOpen ? item.info : item.open;
                this.labelInfo.textColor = color;
                this.imgGo.visible = (bOpen && item.skip == "1");
                // this.labelNotOpen.visible = !bOpen;
                this.imgIconLock1.visible = !bOpen;
                this.imgIconLock2.visible = !bOpen;
                this.lock = !bOpen;
                this.groupLayer1.visible = true;
                this.groupLayer2.visible = false;
            }
            else if ((data.fromId == 0 || data.fromId == 41) && data.mobId != null) {
                this.fromId = data.fromId;
                this.mobId = data.mobId;
                var inst = zj.Game.PlayerInstanceSystem.Set(data.mobId);
                var item = zj.TableClientGetProp.Item(data.fromId);
                if (item == null) {
                    throw Error("item should not null.");
                }
                this.imgIconLock1.visible = (!inst.Open);
                this.imgIconLock2.visible = (!inst.Open);
                this.lock = !inst.Open;
                var imgIcon = [this.imgIcon1, this.imgIcon2];
                this.imgIcon1.source = zj.cachekey(inst.Boss, this);
                if (zj.Device.isReviewSwitch) {
                    this.imgIcon2.source = zj.cachekey("hero_icon_head_gw_xiaoemo_png", this);
                }
                else {
                    this.imgIcon2.source = zj.cachekey(inst.Boss, this);
                }
                this.labelInfo.text = inst.Info;
                this.labelInfo.textColor = inst.Color;
                this.labelName.text = inst.Name;
                this.imgGo.visible = (inst.Open && zj.TableClientGetProp.Item(this.fromId).skip == "1");
                this.groupLayer1.visible = false;
                this.groupLayer2.visible = true;
            }
            else if (data.fromId == 29 && data.mobId != null) {
                this.fromId = data.fromId;
                this.mobId = data.mobId;
                var item = zj.TableClientGetProp.Item(data.fromId);
                if (item == null) {
                    throw Error("item should not null.");
                }
                var areaInfo = zj.TableInstanceArea.Item(data.mobId);
                var bOpen = zj.Game.PlayerInstanceSystem.ElitePackCanChallenge(data.mobId);
                var color = bOpen == true ? zj.Helper.RGBToHex("r:28.g:90,b:0") : zj.Helper.RGBToHex("r:241,g:34,b:0");
                this.labelName.text = item.name;
                var inst = zj.Game.PlayerInstanceSystem.Set(data.mobId);
                this.imgIcon1.source = zj.cachekey(inst.Boss, this);
                if (zj.Device.isReviewSwitch) {
                    this.imgIcon2.source = zj.cachekey("hero_icon_head_gw_xiaoemo_png", this);
                }
                else {
                    this.imgIcon2.source = zj.cachekey(inst.Boss, this);
                }
                this.labelInfo.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Instance.instance_drop, areaInfo.area_name);
                this.labelInfo.textColor = color;
                this.labelNotOpen.visible = !bOpen;
                this.imgGo.visible = bOpen;
                var imgIcon = [this.imgIcon1, this.imgIcon2];
                for (var i = 1; i <= imgIcon.length; i++) {
                    this["imgIcon" + i].source = zj.cachekey(item.path, this);
                }
                this.groupLayer1.visible = true;
                this.groupLayer2.visible = false;
            }
        };
        return Common_OutPutItem;
    }(eui.ItemRenderer));
    zj.Common_OutPutItem = Common_OutPutItem;
    __reflect(Common_OutPutItem.prototype, "zj.Common_OutPutItem");
    var Common_OutPutItemData = (function () {
        function Common_OutPutItemData() {
        }
        return Common_OutPutItemData;
    }());
    zj.Common_OutPutItemData = Common_OutPutItemData;
    __reflect(Common_OutPutItemData.prototype, "zj.Common_OutPutItemData");
})(zj || (zj = {}));
//# sourceMappingURL=Common_OutPutItem.js.map