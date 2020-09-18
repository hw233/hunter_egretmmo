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
    // HXH_GiftMonthList
    // wangshenzhuo
    // 2019/04/20
    var HXH_GiftMonthList = (function (_super) {
        __extends(HXH_GiftMonthList, _super);
        function HXH_GiftMonthList() {
            var _this = _super.call(this) || this;
            _this.AddGiftIndex = 0;
            _this.cb = null;
            _this.allProducts = [];
            _this.skinName = "resource/skins/gift/HXH_GiftMonthListSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            if (_this.width >= 1344) {
                _this.imageBackGroud.scaleX = _this.width / 1334;
            }
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            _this.Init();
            return _this;
        }
        HXH_GiftMonthList.prototype.Init = function () {
            var _this = this;
            zj.Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0)
                .then(function (display) {
                display.x = display.width / 2;
                display.y = display.height / 2;
                _this.groupAni.addChild(display);
            });
        };
        HXH_GiftMonthList.prototype.SetInfoPush = function (push_info) {
            var tip_index = push_info.refrence + "push_month" + push_info.month;
            zj.Tips.tips_oneday_set(tip_index, true);
        };
        HXH_GiftMonthList.prototype.SetInfo = function (refrence, cb) {
            this.cb = cb;
            var refrence_tbl = zj.PlayerGiftSystem.Instance_newGiftIndex(refrence);
            this.this_gift_info = zj.PlayerGiftSystem.AllGiftByRefrence(refrence);
            this.imageName.source = zj.cachekey(refrence_tbl.name_path, this);
            this.LoadPayProducts();
        };
        HXH_GiftMonthList.prototype.LoadPayProducts = function () {
            var _this = this;
            zj.Game.PlayerPaySystem.queryAppProducts().then(function (resp) {
                var this_this = _this;
                for (var _i = 0, _a = resp.products; _i < _a.length; _i++) {
                    var v = _a[_i];
                    for (var _b = 0, _c = resp.channel_products_ext; _b < _c.length; _b++) {
                        var vv = _c[_b];
                        if (v.id == vv.id) {
                            var tmp = {
                                id: "",
                                name: "",
                                describe: "",
                                currency: "",
                                amount: 0,
                                amount_usd: 0,
                                coin: 0,
                                type: "",
                                discount: "",
                                cp_product_id: "",
                            };
                            for (var k in tmp) {
                                tmp[k] = v[k];
                            }
                            tmp.cp_product_id = vv.cp_product_id;
                            this_this.allProducts.push(tmp);
                            break;
                        }
                    }
                }
                var i = 0;
                while (i < this_this.allProducts.length) {
                    if (zj.PlayerPaySystem.PayItemByID(this_this.allProducts[i].cp_product_id) == null) {
                        this_this.allProducts.splice(i, 1);
                    }
                    else {
                        i = i + 1;
                    }
                }
                this_this.allProducts.sort(function (a, b) {
                    var itemA = zj.PlayerPaySystem.PayItemByID(a.cp_product_id);
                    var itemB = zj.PlayerPaySystem.PayItemByID(b.cp_product_id);
                    return itemA.sort_index - itemB.sort_index;
                });
                _this.SetInfoList();
            });
        };
        HXH_GiftMonthList.prototype.onRemoveAward = function () {
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
        };
        HXH_GiftMonthList.prototype.SetInfoList = function () {
            this.listAddGift.selectedIndex = -1; // 默认选中
            this.listAddGift.itemRenderer = zj.HXH_GiftMonth; //
            this.AddGiftItem = new eui.ArrayCollection();
            for (var i = 0; i < this.this_gift_info.length; i++) {
                var data = new zj.HXH_GiftMonthData();
                data.father = this;
                data.info = this.this_gift_info[i];
                data.index = i;
                data.allPro = this.allProducts;
                this.AddGiftItem.addItem(data);
            }
            this.listAddGift.dataProvider = this.AddGiftItem;
            this.AddGiftIndex = this.listAddGift.selectedIndex;
        };
        HXH_GiftMonthList.prototype.onButtonClose = function () {
            if (this.cb != null) {
                this.cb();
            }
            this.close(zj.UI.HIDE_TO_BOTTON);
        };
        return HXH_GiftMonthList;
    }(zj.Scene));
    zj.HXH_GiftMonthList = HXH_GiftMonthList;
    __reflect(HXH_GiftMonthList.prototype, "zj.HXH_GiftMonthList");
})(zj || (zj = {}));
//# sourceMappingURL=HXH_GiftMonthList.js.map