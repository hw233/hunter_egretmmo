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
     * 2019.11.19
     * xingliwei
     * @class 天空竞技场左侧Item
     */
    var SkyAreanMainItem = (function (_super) {
        __extends(SkyAreanMainItem, _super);
        function SkyAreanMainItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/skyArean/SkyAreanMainItemSkin.exml";
            zj.cachekeys(zj.UIResource["SkyAreanMainItem"], _this);
            _this.imgIcon1.mask = _this.imgBg1;
            _this.imgIcon2.mask = _this.imgBg2;
            _this.info = zj.TableTower.Table(); //[key.toString()]
            _this.group1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.data.father.buttonAward(_this.data.father.floorInfo[0].length - _this.data.index * 2 - 2); }, _this);
            _this.group2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.data.father.buttonAward(_this.data.father.floorInfo[0].length - _this.data.index * 2 - 3); }, _this);
            _this.group11.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                var a = new message.GoodsInfo();
                a.goodsId = _this.data.info.first_reward[0][0];
                a.count = _this.data.info.first_reward[0][1];
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: a, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }, _this);
            _this.group22.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                var a = new message.GoodsInfo();
                a.goodsId = _this.data.info1.first_reward[0][0];
                a.count = _this.data.info1.first_reward[0][1];
                zj.Game.EventManager.event(zj.GameEvent.SHOW_GOODS_PROPERTY, { info: a, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
            }, _this);
            return _this;
        }
        SkyAreanMainItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.info != null) {
                this.group1.visible = true;
                this.labelTier1.text = "第" + (data.index * 2 + 1) + "层";
                var info1 = data.info;
                var itemSet1 = zj.PlayerItemSystem.Set(info1.first_reward[0][0], 1, info1.first_reward[0][1]);
                this.imgIcon1.source = zj.cachekey(zj.TableMapRole.Item(this.data.info.boss_roleId[1]).head_path, this);
                this.labelQuantity1.text = ("x" + zj.Set.NumberUnit2(info1.first_reward[0][1]));
                this.imgAward1.source = zj.cachekey(itemSet1.Clip, this);
                if (data.index * 2 + 1 > zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                    this.imgLock1.visible = true;
                    this.imgLock1.source = zj.cachekey("ui_skyarean_biaoqian1_png", this);
                    this.imgpass1.visible = false;
                    this.imgFrame1.source = zj.cachekey("ui_skyarean_touxiangkuang1_png", this);
                    this.imgLock1.visible = false;
                    this.imgsuo1.visible = true;
                }
                else if (data.index * 2 + 1 < zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                    this.imgpass1.visible = true;
                    this.imgsuo1.visible = false;
                    this.imgLock1.visible = false;
                    this.imgFrame1.source = zj.cachekey("ui_skyarean_touxiangkuang3_png", this);
                }
                else {
                    this.imgpass1.visible = false;
                    this.imgLock1.visible = true;
                    this.imgsuo1.visible = false;
                    this.imgLock1.source = zj.cachekey("ui_skyarean_biaoqian2_png", this);
                    this.imgFrame1.source = zj.cachekey("ui_skyarean_touxiangkuang2_png", this);
                }
            }
            else {
                this.group1.visible = false;
            }
            if (data.info1 != null) {
                this.group2.visible = true;
                this.labelTier2.text = "第" + (data.index * 2 + 2) + "层";
                var info2 = data.info1;
                var itemSet2 = zj.PlayerItemSystem.Set(info2.first_reward[0][0], 1, info2.first_reward[0][1]);
                this.imgIcon2.source = zj.cachekey(zj.TableMapRole.Item(data.info1.boss_roleId[1]).head_path, this);
                this.imgAward2.source = zj.cachekey(itemSet2.Clip, this);
                this.labelQuantity2.text = ("x" + zj.Set.NumberUnit2(info2.first_reward[0][1]));
                if (data.index * 2 + 2 > zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                    this.imgFrame2.source = zj.cachekey("ui_skyarean_touxiangkuang1_png", this);
                    this.imgLock2.source = zj.cachekey("ui_skyarean_biaoqian1_png", this);
                    this.imgLock2.visible = false;
                    this.imgpass2.visible = false;
                    this.imgsuo2.visible = true;
                }
                else if (data.index * 2 + 2 < zj.Game.PlayerTowerSystem.towerInfo.towerCur) {
                    this.imgpass2.visible = true;
                    this.imgsuo2.visible = false;
                    this.imgLock2.visible = false;
                    this.imgFrame2.source = zj.cachekey("ui_skyarean_touxiangkuang3_png", this);
                }
                else {
                    this.imgFrame2.source = zj.cachekey("ui_skyarean_touxiangkuang2_png", this);
                    this.imgLock2.source = zj.cachekey("ui_skyarean_biaoqian2_png", this);
                    this.imgLock2.visible = true;
                    this.imgpass2.visible = false;
                    this.imgsuo2.visible = false;
                }
            }
            else {
                this.group2.visible = false;
            }
        };
        return SkyAreanMainItem;
    }(eui.ItemRenderer));
    zj.SkyAreanMainItem = SkyAreanMainItem;
    __reflect(SkyAreanMainItem.prototype, "zj.SkyAreanMainItem");
    //子项数据源
    var SkyAreanMainItemData = (function () {
        function SkyAreanMainItemData() {
        }
        return SkyAreanMainItemData;
    }());
    zj.SkyAreanMainItemData = SkyAreanMainItemData;
    __reflect(SkyAreanMainItemData.prototype, "zj.SkyAreanMainItemData");
})(zj || (zj = {}));
//# sourceMappingURL=SkyAreanMainItem.js.map