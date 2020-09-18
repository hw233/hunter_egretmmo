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
     * @class 累计在线赢大奖
     *
     * @author LianLei
     *
     * @date 2019-10-29
     */
    var Activity_OnlineGetAwards = (function (_super) {
        __extends(Activity_OnlineGetAwards, _super);
        function Activity_OnlineGetAwards() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/activity/Activity_OnlineGetAwardsSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.listAward.addEventListener(eui.ItemTapEvent.ITEM_TAP, _this.onChangeList, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.removeShow, _this);
            zj.Game.EventManager.on(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                zj.Game.EventManager.off(zj.GameEvent.SHOW_GOODS_PROPERTY, _this.showGoodsProperty, _this);
            }, null);
            zj.Game.EventManager.on(zj.GameEvent.NET_SERVER_CONNECTED, _this.updateLoginTime, _this);
            _this.timer = egret.setInterval(_this.update, _this, 0);
            _this.init();
            return _this;
        }
        Activity_OnlineGetAwards.prototype.init = function () {
            this.last_logintime = zj.Game.UIManager.topScene()['sceneUI']['last_logintime']; //Game.Controller.curServerTime;//this.timeFormatConversion(Game.Controller.roleInfo().last_logintime);
            this.server_Time = zj.Game.Controller.curServerTime;
            this.total_login_time = zj.Game.UIManager.topScene()['sceneUI']['total_login_time'];
            this.awardIndex = 0;
            this.update();
            this.listAwardData = new eui.ArrayCollection();
            this.awardInfo = zj.TableOnlineReward.Table();
            this.setInfoList();
        };
        Activity_OnlineGetAwards.prototype.setInfoList = function () {
            this.listAwardData.removeAll();
            for (var key in this.awardInfo) {
                if (this.awardInfo.hasOwnProperty(key)) {
                    var element = this.awardInfo[key];
                    var info = { goods_id: element.goods_id[0], count: element.goods_count[0], countTime: element.online_time };
                    var itemData = new zj.Activity_OnlineGetAwardsItemData();
                    itemData.goodsInfo = info;
                    itemData.index = Number(key);
                    this.listAwardData.addItem(itemData);
                }
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Activity_OnlineGetAwardsItem;
            this.listAward.selectedIndex = 0;
        };
        Activity_OnlineGetAwards.prototype.setInfoListEnd = function () {
            this.listAwardData.removeAll();
            for (var key in this.awardInfo) {
                if (this.awardInfo.hasOwnProperty(key)) {
                    var element = this.awardInfo[key];
                    var info = { goods_id: element.goods_id[0], count: element.goods_count[0], countTime: 0 };
                    var itemData = new zj.Activity_OnlineGetAwardsItemData();
                    itemData.goodsInfo = info;
                    itemData.index = Number(key);
                    this.listAwardData.addItem(itemData);
                }
            }
            this.listAward.dataProvider = this.listAwardData;
            this.listAward.itemRenderer = zj.Activity_OnlineGetAwardsItem;
            this.listAward.selectedIndex = 0;
        };
        Activity_OnlineGetAwards.prototype.setAward = function (index) {
            if (this.awardIndex == index)
                return;
            this.awardIndex = index;
            var award = zj.TableOnlineReward.Item(index);
            var itemSet = zj.PlayerItemSystem.Set(award.goods_id[0], null, award.goods_count[0]);
            // this.imgFrame.source = cachekey(itemSet.Frame, this);
            this.imgIcon.source = zj.cachekey(itemSet.Path, this);
            this.labelNum.text = "x" + award.goods_count;
        };
        Activity_OnlineGetAwards.prototype.updateLoginTime = function () {
            this.last_logintime = zj.Game.UIManager.topScene()['sceneUI']['last_logintime'];
            this.total_login_time = zj.Game.UIManager.topScene()['sceneUI']['total_login_time'];
            this.update();
        };
        Activity_OnlineGetAwards.prototype.update = function () {
            this.server_Time = zj.Game.Controller.curServerTime;
            var onlineTime = this.total_login_time + (this.server_Time - this.last_logintime); // 登录总时长
            if (this.listAwardData == null)
                return;
            var timeAll = 0;
            for (var i = 1; i <= Object.keys(zj.TableOnlineReward.Table()).length; i++) {
                timeAll += zj.TableOnlineReward.Item(i).online_time;
            }
            if (onlineTime >= timeAll) {
                this.labelCountTime.text = "00:00:00";
                this.setInfoListEnd();
                egret.clearInterval(this.timer);
                this.timer = -1;
                var len = zj.Helper.getObjLen(zj.TableOnlineReward.Table());
                var info = zj.TableOnlineReward.Item(len);
                var itemSet = zj.PlayerItemSystem.Set(info.goods_id[0], null, info.goods_count[0]);
                this.imgIcon.source = zj.cachekey(itemSet.Path, this);
                this.labelNum.text = "x" + info.goods_count[0];
                return;
            }
            for (var i = 1; i <= zj.Helper.getObjLen(zj.TableOnlineReward.Table()); i++) {
                var a = 0;
                for (var j = 0; j < i; j++) {
                    a += zj.TableOnlineReward.Item(j + 1).online_time;
                }
                if (a - onlineTime > 0) {
                    this.setAward(i);
                    this.labelCountTime.text = zj.Helper.GetTimeStr(a - onlineTime, false);
                    this.listAwardData.source[i - 1].goodsInfo.countTime = a - onlineTime;
                    this.listAwardData.source[i - 1].isShowTime = true;
                    this.listAwardData.replaceItemAt(this.listAwardData.source[i - 1], i - 1);
                    return;
                }
                else {
                    var index = i;
                    if (index + 1 > Object.keys(zj.TableOnlineReward.Table()).length)
                        index = Object.keys(zj.TableOnlineReward.Table()).length;
                    this.setAward(index);
                    this.listAwardData.source[i - 1].goodsInfo.countTime = 0;
                    this.listAwardData.source[i - 1].isShowTime = false;
                    this.listAwardData.replaceItemAt(this.listAwardData.source[i - 1], i - 1);
                }
            }
        };
        Activity_OnlineGetAwards.prototype.onChangeList = function (e) {
            var _this = this;
            var item = this.listAward.getElementAt(e.itemIndex);
            var data = this.listAwardData.getItemAt(e.itemIndex);
            if (data.goodsInfo.countTime <= 0 && zj.Game.PlayerMixUnitInfoSystem.mixunitinfo.online_reward.indexOf(e.itemIndex + 1) == -1) {
                var self_1 = this;
                zj.Game.PlayerActivitySystem.OnlineTimeRewardReq(e.itemIndex + 1).then(function (value) {
                    zj.loadUI(zj.CommonGetDialog).then(function (dialog) {
                        dialog.init(value.body.gameInfo.getGoods);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                        dialog.setCB(function () {
                            self_1.listAwardData.replaceItemAt(_this.listAwardData.source[e.itemIndex], e.itemIndex);
                        });
                    });
                });
            }
        };
        Activity_OnlineGetAwards.prototype.onBtnClose = function () {
            egret.clearInterval(this.timer);
            this.timer = -1;
            this.close(zj.UI.HIDE_TRAIL_OFF);
        };
        Activity_OnlineGetAwards.prototype.removeShow = function () {
            var show = this.getChildByName("details");
            if (show)
                this.removeChild(show);
        };
        Activity_OnlineGetAwards.prototype.showGoodsProperty = function (ev) {
            // if (Game.UIManager.dialogCount() > 0) return;
            var show = zj.TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
            show.name = "details";
            this.addChild(show);
            show.touchChildren = show.touchEnabled = false;
        };
        return Activity_OnlineGetAwards;
    }(zj.Dialog));
    zj.Activity_OnlineGetAwards = Activity_OnlineGetAwards;
    __reflect(Activity_OnlineGetAwards.prototype, "zj.Activity_OnlineGetAwards");
})(zj || (zj = {}));
//# sourceMappingURL=Activity_OnlineGetAwards.js.map