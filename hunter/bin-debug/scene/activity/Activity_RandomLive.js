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
    // 2019/04/12
    // 娃娃机---兑换奖励
    var Activity_RandomLive = (function (_super) {
        __extends(Activity_RandomLive, _super);
        function Activity_RandomLive() {
            var _this = _super.call(this) || this;
            _this.TableViewIndex = 0;
            _this.skinName = "resource/skins/activity/Activity_RandomLiveSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onRemoveAward, _this);
            return _this;
        }
        Activity_RandomLive.prototype.SetInfo = function (father) {
            this.father = father;
            var cur_sore = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
            this.labelCore.text = String(cur_sore);
            var randomTbl = zj.TableIntegralEgg.Table();
            var index = zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_INTEGRAL_EGG].info % Object.keys(randomTbl).length;
            index = index == 0 && Object.keys(randomTbl).length || index;
            var tblConsume = zj.Game.ConfigManager.getTable(zj.StringConfig_Table.egg_random + ".json"); //读表
            this.curTopicInfo = tblConsume[index];
            var goods = [];
            for (var k in this.curTopicInfo.exchange_goods) {
                var v = this.curTopicInfo.exchange_goods[k];
                var good = new message.GoodsInfo();
                good.goodsId = v[0];
                good.count = v[1];
                goods.push(good);
            }
            this.GoodsInfo = goods;
            this.SetInfoList();
        };
        Activity_RandomLive.prototype.SetInfoList = function () {
            var lc_tbl = zj.Table.DeepCopy(this.GoodsInfo);
            var fix = zj.PlayerItemSystem.FixCount(this.GoodsInfo.length, 8, 4);
            for (var i = 0; i < fix; i++) {
                var good = new message.GoodsInfo();
                good.goodsId = 0;
                good.count = 0;
                this.GoodsInfo.push(good);
            }
            this.listTableViewTask.selectedIndex = -1; // 默认选中
            this.listTableViewTask.itemRenderer = zj.Activity_RandomLiveItem; //
            this.TableViewItem = new eui.ArrayCollection();
            for (var i = 0; i < this.GoodsInfo.length; i++) {
                var data = new zj.Activity_RandomLiveItemData();
                data.father = this;
                data.goods = this.GoodsInfo[i];
                data.index = i;
                this.TableViewItem.addItem(data);
            }
            this.listTableViewTask.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableViewTask.selectedIndex;
        };
        Activity_RandomLive.prototype.RefreshScoreList = function () {
            var cur_score = zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.integral_currentScore;
            this.labelCore.text = cur_score.toString();
            this.father.SetFresh();
            this.father.FreshRedTips();
        };
        // 鼠标点击 物品详情
        Activity_RandomLive.prototype.onChooseItemTap = function (isTouchBegin, data) {
            var _this = this;
            var _type = zj.PlayerItemSystem.ItemType(data.goods.goodsId);
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
            var posY;
            var posX;
            var index;
            if (data.index > 3) {
                posY = 50;
                index = data.index - 3;
            }
            else {
                posY = 100;
                index = data.index + 1;
            }
            if (data.index == 0) {
                index = 2.4;
                posY = -65;
            }
            else if (data.index == 4) {
                index = 2.4;
                posY = 180;
            }
            posX = -250 + index * 170;
            if (isTouchBegin) {
                if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
                    zj.loadUI(zj.CommonDesGeneral).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_CLIENT) {
                    zj.loadUI(zj.Common_DesRandom).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
                    zj.loadUI(zj.Common_DesRes).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.setInfo(data.goods.goodsId, data.goods.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
                else {
                    zj.loadUI(zj.CommonDesProp).then(function (dialog) {
                        dialog.x = posX;
                        dialog.y = posY;
                        dialog.name = "Item-skill-common";
                        dialog.init(data.goods.goodsId, data.goods.count);
                        _this.groupMain.addChild(dialog);
                    });
                }
            }
        };
        //鼠标抬起，移除 物品详情
        Activity_RandomLive.prototype.onRemoveAward = function () {
            var dialog = this.groupMain.getChildByName("Item-skill-common");
            if (dialog)
                this.groupMain.removeChild(dialog);
        };
        //返回主界面
        Activity_RandomLive.prototype.onButtonClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return Activity_RandomLive;
    }(zj.Dialog));
    zj.Activity_RandomLive = Activity_RandomLive;
    __reflect(Activity_RandomLive.prototype, "zj.Activity_RandomLive");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_RandomLive.js.map