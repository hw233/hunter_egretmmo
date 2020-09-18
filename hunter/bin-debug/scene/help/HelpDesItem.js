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
     * 帮助界面右边item
     * created by Lian Lei
     * 2018.12.19
     */
    var HelpDesItem = (function (_super) {
        __extends(HelpDesItem, _super);
        function HelpDesItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/help/HelpDesItemSkin.exml";
            return _this;
        }
        HelpDesItem.prototype.dataChanged = function () {
            this.setInfo(this.data);
        };
        HelpDesItem.prototype.setInfo = function (data) {
            // 显示右侧信息icon
            if (data.info.path) {
                this.imageTitlePic.source = zj.cachekey(data.info.path, this);
            }
            else {
                this.imageTitlePic.source = null;
            }
            this.labelTitle.text = data.info.title;
            this.labelDes.text = data.info.des;
            // 设置标题文本背景宽度
            // if (this.labelTitle.width <= 50) {
            //     let labelTitleWidth: number = this.labelTitle.width;
            //     this.imageTitleFloor.width = labelTitleWidth * 3;
            // }
            // else if (this.labelTitle.width > 50 && this.labelTitle.width <= 70) {
            //     let labelTitleWidth: number = this.labelTitle.width;
            //     this.imageTitleFloor.width = labelTitleWidth * 2.5;
            // }
            // else {
            //     let labelTitleWidth: number = this.labelTitle.width;
            //     this.imageTitleFloor.width = labelTitleWidth * 2;
            // }
            // // 设置右侧详细信息内容文本高度变化
            // this.labelDes.height = this.labelDes.textHeight;
            // this.groupLabDes.height = this.labelDes.height + 25;
            // this.groupAll.height = this.groupLabDes.height + this.groupLabTitle.height + 25;
            // this.skin.height = this.groupLabDes.height + this.groupLabTitle.height + 25;
        };
        return HelpDesItem;
    }(eui.ItemRenderer));
    zj.HelpDesItem = HelpDesItem;
    __reflect(HelpDesItem.prototype, "zj.HelpDesItem");
    var HelpDesItemData = (function () {
        function HelpDesItemData() {
        }
        return HelpDesItemData;
    }());
    zj.HelpDesItemData = HelpDesItemData;
    __reflect(HelpDesItemData.prototype, "zj.HelpDesItemData");
})(zj || (zj = {}));
//# sourceMappingURL=HelpDesItem.js.map