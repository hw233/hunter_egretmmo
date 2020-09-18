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
    //战功商店
    //yuqingchao
    //2019.01.26
    var LeagueMatchMallMain = (function (_super) {
        __extends(LeagueMatchMallMain, _super);
        function LeagueMatchMallMain() {
            var _this = _super.call(this) || this;
            _this.isLeague = [zj.TableEnum.Enum.Mall.LEAGUE];
            _this.index = 0;
            _this.moveLocation = 0; //列表下拉移动位置
            //商店数据
            _this._mall_data = [];
            _this.skinName = "resource/skins/league/LeagueMatchMallMainSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.lstViewItem.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.AddShopmallList, _this);
            _this.lbTimeTips.text = zj.TextsConfig.TextsConfig_Mall.fourfresh;
            _this.SetUpdateRes();
            _this.ReqMall();
            _this.lstViewItem.selectedIndex = 0; //默认选中
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                egret.Tween.removeTweens(_this);
            }, _this);
            zj.Game.EventManager.on(zj.GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE, _this.SetUpdate, _this);
            return _this;
        }
        LeagueMatchMallMain.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        LeagueMatchMallMain.prototype.SetUpdate = function () {
            this.ReqMall();
            this.SetUpdateRes();
        };
        LeagueMatchMallMain.prototype.SetUpdateRes = function () {
            var _this = this;
            var index = this.index != 0 ? this.index : zj.TableEnum.Enum.Mall.NORMAL;
            var _COST_MALL = message.EResourceType.RESOURCE_LEAGUE_SCORE;
            var id = _COST_MALL;
            var str_res = zj.PlayerItemSystem.Str_Resoure(id);
            this.lbMoney.text = str_res;
            var count = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_LEAGUE_SCORE);
            this.nowMoney = count;
            var time = (zj.Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE].leftTime - Math.floor(egret.getTimer() / 1000));
            if (time <= 0) {
                zj.Game.PlayerProgressesSystem.checkProcess([message.EProcessType.PROCESS_TYPE_MALL_LEAGUE_SCORE]).then(function () {
                    _this.SetUpdate();
                });
            }
        };
        //折扣
        LeagueMatchMallMain.prototype.getDiscount = function () {
            return zj.Table.VIn(this.isLeague, 6);
        };
        LeagueMatchMallMain.prototype.ReqMall = function () {
            var _this = this;
            var type = zj.TableEnum.Enum.Mall[6];
            zj.PlayerProgressesSystem.ReqGain(type)
                .then(function (data) {
                _this._mall_data[6] = [];
                _this._mall_data[6] = data.body.items;
                _this.SetInfoMall();
            });
        };
        //点击购买物品
        LeagueMatchMallMain.prototype.buy = function (mallId, count) {
            var _this = this;
            var type = zj.TableEnum.Enum.Mall[6];
            zj.PlayerProgressesSystem.ReqBuy(type, mallId, count)
                .then(function (data) {
                egret.Tween.get(_this)
                    .call(function () {
                    _this.buyInfo.onBtnClose();
                })
                    .wait(500, true)
                    .call(function () {
                    zj.loadUI(zj.CommonGetDialog)
                        .then(function (dialog) {
                        dialog.init(data.body.gameInfo.getGoods);
                        dialog.show();
                    });
                });
                _this.scrollerInfo.viewport = _this.lstViewItem;
                _this.scrollerInfo.validateNow();
                _this.moveLocation = _this.scrollerInfo.viewport.scrollV;
                zj.Game.EventManager.event(zj.GameEvent.LEAGUE_MATCH_MALL_MAIN_UPDATE);
            }).catch(function (reason) { });
        };
        LeagueMatchMallMain.prototype.SetInfoMall = function () {
            this.array = new eui.ArrayCollection();
            for (var i = 0; i < this._mall_data[6].length; i++) {
                this.array.addItem({
                    malldata: this._mall_data[6][i]
                });
            }
            this.lstViewItem.dataProvider = this.array;
            this.lstViewItem.itemRenderer = zj.LeagueMatchMallMainItem;
            this.scrollerInfo.viewport = this.lstViewItem;
            this.scrollerInfo.validateNow();
            this.scrollerInfo.viewport.scrollV = this.moveLocation;
        };
        //购买商品界面
        LeagueMatchMallMain.prototype.AddShopmallList = function (e) {
            var _this = this;
            var lastData = this._mall_data[6][this.lstViewItem.selectedIndex];
            if (lastData.remain <= 0) {
            }
            else {
                if (lastData.remain >= 10) {
                    zj.loadUI(zj.LeagueMatchMallMainBuyAll)
                        .then(function (dialog) {
                        _this.buyInfo = dialog;
                        dialog.init();
                        dialog.setInfo(lastData, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
                else {
                    zj.loadUI(zj.LeagueMatchMallMainBuyOne)
                        .then(function (dialog) {
                        _this.buyInfo = dialog;
                        dialog.setInfo(lastData, _this);
                        dialog.show(zj.UI.SHOW_FROM_TOP);
                    });
                }
            }
        };
        return LeagueMatchMallMain;
    }(zj.Dialog));
    zj.LeagueMatchMallMain = LeagueMatchMallMain;
    __reflect(LeagueMatchMallMain.prototype, "zj.LeagueMatchMallMain");
})(zj || (zj = {}));
//# sourceMappingURL=LeagueMatchMallMain.js.map