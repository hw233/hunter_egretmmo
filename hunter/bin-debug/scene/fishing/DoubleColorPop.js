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
    //DoubleColorPop(投注界面)
    //yuqingchao
    var DoubleColorPop = (function (_super) {
        __extends(DoubleColorPop, _super);
        function DoubleColorPop() {
            var _this = _super.call(this) || this;
            _this._my_list_red = [];
            _this._my_list_blue = [];
            _this._my_bet_fruit = [];
            _this._my_bet_blue_id = [0, 0, 0, 0];
            _this._my_bet_red_id = 0;
            _this.myBet = [];
            _this.skinName = "resource/skins/fishing/DoubleColorPopSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnOk, _this);
            _this.btnViewEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnViewEnd, _this);
            _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, function () {
                _this.father = null;
            }, null);
            return _this;
        }
        DoubleColorPop.prototype.init = function (father) {
            this.father = father;
            this._my_fruit_red = zj.Game.PlayerItemSystem.GetWonderlandFruitByType(0);
            this._my_fruit_blue = zj.Game.PlayerItemSystem.GetWonderlandFruitByType(1);
            this.initMyBetGroup();
            this.setInfoMyFruitList();
        };
        DoubleColorPop.prototype.initMyBetGroup = function () {
            for (var i = 0; i < 5; i++) {
                var item = new zj.DoubleColorPopItemTop();
                if (i <= 3) {
                    item.setInfo(i, 1, this);
                }
                else {
                    item.setInfo(i, 0, this);
                }
                this["groupFruit" + i].addChild(item);
                this.myBet.push(item);
                this._my_bet_fruit.push(item);
            }
        };
        DoubleColorPop.prototype.setInfoMyFruitList = function () {
            var _this = this;
            //红球
            this.redArr = new eui.ArrayCollection();
            for (var i = 0; i < this._my_fruit_red.length; i++) {
                this.redArr.addItem({
                    id: i,
                    info: this._my_fruit_red[i],
                    color: 0,
                    father: this,
                });
            }
            this.lstRed.dataProvider = this.redArr;
            this.lstRed.itemRenderer = zj.DoubleColorPopItem;
            //蓝球
            this.blueArr = new eui.ArrayCollection();
            for (var i = 0; i < this._my_fruit_blue.length; i++) {
                this.blueArr.addItem({
                    id: i,
                    info: this._my_fruit_blue[i],
                    color: 1,
                    father: this,
                });
            }
            this.lstBlue.dataProvider = this.blueArr;
            this.lstBlue.itemRenderer = zj.DoubleColorPopItem;
            setTimeout(function () {
                _this.listPush();
            }, 100);
        };
        DoubleColorPop.prototype.listPush = function () {
            this._my_list_red = [];
            for (var i = 0; i < this._my_fruit_red.length; i++) {
                var item = this.lstRed.getElementAt(i);
                this._my_list_red.push(item);
            }
            this._my_list_blue = [];
            for (var i = 0; i < this._my_fruit_blue.length; i++) {
                var any = this.lstBlue;
                var item = this.lstBlue.getElementAt(i);
                this._my_list_blue.push(item);
            }
        };
        DoubleColorPop.prototype.insertIntoMyBet = function (id, color) {
            if (id == 0)
                return;
            if (color == 1) {
                var _a = zj.Game.PlayerDoubleBallSystem.FruitListStateC2hange(this._my_bet_blue_id, id), cur_list = _a[0], modify_list = _a[1];
                for (var k in modify_list.add) {
                    var v = modify_list.add[k];
                    this._my_bet_fruit[v.pos].Add(v.id);
                }
                for (var k in modify_list.change) {
                    var v = modify_list.change[k];
                    if (v.length != 0)
                        this._my_bet_fruit[v.pos].Change(v.id);
                }
                var any = this._my_list_blue;
                var _b = zj.Table.FindR(this._my_list_blue, function (_k, _v) {
                    return _v.fruitId == id;
                }), _ = _b[0], kk = _b[1];
                if (kk != null) {
                    this._my_list_blue[kk].MinusNum();
                }
                this._my_bet_blue_id = cur_list;
            }
            else {
                if (this._my_bet_red_id == 0) {
                    this._my_bet_fruit[4].Add(id);
                }
                else {
                    this._my_bet_fruit[4].Change(id);
                }
                var _c = zj.Table.FindR(this._my_list_red, function (_k, _v) {
                    return _v.fruitId == id;
                }), _ = _c[0], kk_1 = _c[1];
                var _d = zj.Table.FindR(this._my_list_red, function (_k, _v) {
                    return _v.fruitId == this._my_bet_red_id;
                }), __ = _d[0], kk_2 = _d[1];
                if (kk_1 != null) {
                    this._my_list_red[kk_1].MinusNum();
                }
                if (kk_2 != null) {
                    this._my_list_red[kk_1].addNum();
                }
                this._my_bet_red_id = id;
            }
        };
        DoubleColorPop.prototype.DeleteFromMyBet = function (id, color) {
            if (id == 0)
                return;
            if (color == 1) {
                var _a = zj.Game.PlayerDoubleBallSystem.FruitListStateDelete(this._my_bet_blue_id, id), cur_list = _a[0], modify_list = _a[1];
                for (var k in modify_list.delete) {
                    var v = modify_list.delete[k];
                    this._my_bet_fruit[v.pos].Delete();
                }
                for (var k in modify_list.change) {
                    var v = modify_list.change[k];
                    this._my_bet_fruit[v.pos].Change(v.id);
                }
                var kk = zj.Table.FindR(this._my_list_blue, function (k, v) {
                    return v.fruitId == id;
                })[1];
                if (kk != null) {
                    this._my_list_blue[kk].addNum();
                }
                this._my_bet_blue_id = cur_list;
            }
            else {
                if (this._my_bet_red_id == 0)
                    return;
                if (this._my_bet_red_id == id) {
                    this._my_bet_fruit[4].Delete();
                }
                var kk = zj.Table.FindR(this._my_list_red, function (_k, _v) {
                    return _v.fruitId == id;
                })[1];
                if (kk != null) {
                    this._my_list_red[kk].addNum();
                }
                this._my_bet_red_id = 0;
            }
        };
        DoubleColorPop.prototype.SetBetAni = function () {
            for (var i = 0; i < 5; i++) {
                if (i == 0) {
                    this._my_bet_fruit[4].SetAni(i);
                }
                else {
                    this._my_bet_fruit[i].SetAni(i);
                }
            }
        };
        DoubleColorPop.prototype.onBtnOk = function () {
            var _this = this;
            var find_blue = zj.Table.FindF(this._my_bet_blue_id, function (k, v) {
                return v == 0;
            });
            if (!find_blue && this._my_bet_red_id != 0) {
                var redFruit = this._my_bet_red_id;
                var blueFruit = this._my_bet_blue_id;
                zj.Game.PlayerDoubleBallSystem.setRoleLotteryFruit(redFruit, blueFruit)
                    .then(function (data) {
                    zj.Game.PlayerDoubleBallSystem.my_id = zj.Game.PlayerDoubleBallSystem.serverFruit(data.body.gameInfo.mixUnitInfo[0].redFruit, data.body.gameInfo.mixUnitInfo[0].blueFruit);
                    _this.onBtnClose();
                    _this.father.onAbovePop();
                    zj.toast_success(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.bet_succsee);
                    _this.father.upDate();
                    var lastDoubleInfo = _this._my_bet_red_id + "&";
                    for (var i = 0; i < zj.CommonConfig.double_fruit_blue_number; i++) {
                        if (i == zj.CommonConfig.double_fruit_blue_number) {
                            lastDoubleInfo = lastDoubleInfo + _this._my_bet_blue_id[i];
                        }
                        else {
                            lastDoubleInfo = lastDoubleInfo + _this._my_bet_blue_id[i] + "&";
                        }
                    }
                    zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo = lastDoubleInfo;
                    var cur = _this.time(Date.parse(zj.Game.Controller.serverNow().toString()) / 100);
                    var sec = cur.h * 3600 + cur.m * 60 + cur.s;
                    var lastTime = "";
                    if (sec <= zj.CommonConfig.double_fruit_bet_time[2]) {
                        var curLast = _this.time(Date.parse(zj.Game.Controller.serverNow().toString()) / 100 - 86400);
                        lastTime = zj.Helper.StringFormat("%4d%02d%02d", curLast.Y, curLast.M, curLast.D);
                    }
                    else {
                        lastTime = zj.Helper.StringFormat("%4d%02d%02d", cur.Y, cur.M, cur.D);
                    }
                    zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.lastTime = lastTime;
                    zj.Game.PlayerDoubleBallSystem.lastDoubleInfo.bPushed = false;
                    zj.Game.PlayerDoubleBallSystem.SaveLastDoubleInfo();
                });
            }
            else {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Hunter_DoubleColor.fruit_not_enough);
            }
        };
        DoubleColorPop.prototype.onBtnViewEnd = function () {
            var random = zj.Game.PlayerDoubleBallSystem.RandomFruit();
            var minus_index = 3;
            for (var i = 0; i < 5; i++) {
                if (i == 4) {
                    this.DeleteFromMyBet(this._my_bet_red_id, 0);
                }
                else {
                    this.DeleteFromMyBet(this._my_bet_blue_id[minus_index], 1);
                    minus_index = minus_index - 1;
                }
            }
            for (var k in random) {
                var v = random[k];
                if (Number(k) == 4) {
                    this.insertIntoMyBet(random[Number(k)], 0);
                }
                else {
                    this.insertIntoMyBet(random[Number(k)], 1);
                }
            }
            this.SetBetAni();
        };
        DoubleColorPop.prototype.onBtnClose = function () {
            this.close(zj.UI.HIDE_TO_TOP);
        };
        //时间戳转换为字符串格式
        DoubleColorPop.prototype.time = function (timestamp) {
            var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear();
            var M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
            var D = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            return { Y: Y, M: M, D: D, h: h, m: m, s: s }; //年月日时分秒
        };
        return DoubleColorPop;
    }(zj.Dialog));
    zj.DoubleColorPop = DoubleColorPop;
    __reflect(DoubleColorPop.prototype, "zj.DoubleColorPop");
})(zj || (zj = {}));
//# sourceMappingURL=DoubleColorPop.js.map