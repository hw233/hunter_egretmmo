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
    * @author xingliwei
    *
    * @date 2019-11-4
    *
    * @class 猎人批量升星
    */
    var HunterBatchStar = (function (_super) {
        __extends(HunterBatchStar, _super);
        function HunterBatchStar() {
            var _this = _super.call(this) || this;
            _this.hunterInfo = [];
            _this.generalInfo = [];
            _this.money = zj.TableBaseGeneral.Item(10001).up_star_money;
            _this.skinName = "resource/skins/hunter/HunterBatchStarSkin.exml";
            _this.addEventListener(egret.TouchEvent.ADDED_TO_STAGE, _this.init, _this);
            return _this;
        }
        HunterBatchStar.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.groupBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible1, this);
            this.groupBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible2, this);
            this.groupBtn3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnvisible3, this);
            this.btnAddStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStar, this);
            this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
            this.btnAdddiamond.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
            this.btnClose1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.init(); }, this);
            this.imgvisible1.alpha = 1;
            this.imgvisible2.alpha = 1;
            this.imgvisible3.alpha = 0.01;
            this.sethunterinfo();
            this.countGeneralInfo();
            this.groupLeft1.visible = false;
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_COIN_CHANGE, this.Update, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_TOKEN_CHANGE, this.Update, this);
            this.Update();
        };
        HunterBatchStar.prototype.Update = function () {
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Coin > 100000) {
                this.labelIntegrate.text = (zj.Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
            }
            else {
                this.labelIntegrate.text = zj.Game.PlayerInfoSystem.Coin.toString();
            }
            //钻石数量
            if (zj.Game.PlayerInfoSystem.Token > 100000) {
                this.labelToken.text = (zj.Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
            }
            else {
                this.labelToken.text = zj.Game.PlayerInfoSystem.Token.toString();
            }
            if (this.labelIntegrate.width < 60) {
                this.labelIntegrate.width = 60;
            }
            if (this.labelToken.width < 60) {
                this.labelToken.width = 60;
            }
        };
        HunterBatchStar.prototype.onBtnAddGold = function () {
            zj.loadUI(zj.HelpGoldDialog)
                .then(function (dialog) {
                dialog.SetInfoList();
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterBatchStar.prototype.onBtnAddGemstone = function () {
            // toast_success("加钻石功能未开启");
            zj.loadUI(zj.PayMallScene)
                .then(function (scene) {
                scene.show(zj.UI.SHOW_FROM_TOP);
                scene.init(false);
            });
        };
        HunterBatchStar.prototype.cb = function (cb, generalId) {
            this.CB = cb;
            this.fatherGeneralId = generalId;
        };
        /**点击C品质按钮 */
        HunterBatchStar.prototype.onBtnvisible1 = function () {
            if (this.imgvisible1.alpha == 1) {
                this.imgvisible1.alpha = 0.01;
            }
            else {
                this.imgvisible1.alpha = 1;
            }
            this.countGeneralInfo();
        };
        /**点击B品质按钮 */
        HunterBatchStar.prototype.onBtnvisible2 = function () {
            if (this.imgvisible2.alpha == 1) {
                this.imgvisible2.alpha = 0.01;
            }
            else {
                this.imgvisible2.alpha = 1;
            }
            this.countGeneralInfo();
        };
        /**点击A品质按钮 */
        HunterBatchStar.prototype.onBtnvisible3 = function () {
            if (this.imgvisible3.alpha == 1) {
                this.imgvisible3.alpha = 0.01;
            }
            else {
                this.imgvisible3.alpha = 1;
            }
            this.countGeneralInfo();
        };
        /**把符合升星条件的猎人筛选出来(未在阵容，) */
        HunterBatchStar.prototype.sethunterinfo = function () {
            this.hunterInfo = [];
            var hunterinfo = zj.Game.PlayerHunterSystem.queryAllHunters();
            var _loop_1 = function (i) {
                var a = zj.Table.FindF(zj.PlayerHunterSystem.GeneralsIdInDefence(), function (k, v) {
                    return hunterinfo[i].general_id == v.general_id;
                });
                if (!a && zj.Game.PlayerHunterSystem.Table(hunterinfo[i].general_id).aptitude >= 11
                    && zj.Game.PlayerHunterSystem.Table(hunterinfo[i].general_id).aptitude <= 13 && hunterinfo[i].level == 1 && hunterinfo[i].star <= 4) {
                    this_1.hunterInfo.push(hunterinfo[i]);
                }
            };
            var this_1 = this;
            for (var i = 0; i < hunterinfo.length; i++) {
                _loop_1(i);
            }
            this.hunterInfo.sort(function (a, b) {
                var gnr_a = zj.PlayerHunterSystem.Table(a.general_id);
                var gnr_b = zj.PlayerHunterSystem.Table(b.general_id);
                if (gnr_a.aptitude == gnr_b.aptitude) {
                    if (a.level == b.level) {
                        if (a.star == b.star) {
                            if (a.awakePassive.level == b.awakePassive.level) {
                                return gnr_b.general_id - gnr_a.general_id;
                            }
                            else {
                                return b.awakePassive.level - a.awakePassive.level;
                            }
                        }
                        else {
                            return b.star - a.star;
                        }
                    }
                    else {
                        return b.level - a.level;
                    }
                }
                else {
                    return gnr_b.aptitude - gnr_a.aptitude;
                }
            });
        };
        HunterBatchStar.prototype.countGeneralInfo = function () {
            this.generalInfo = [];
            var a1 = [];
            var a2 = [];
            var a3 = [];
            for (var i = 0; i < this.hunterInfo.length; i++) {
                if (this.imgvisible1.alpha == 1) {
                    if (zj.Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 11 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
                        this.generalInfo.push(this.hunterInfo[i]);
                        a1.push(this.hunterInfo[i]);
                    }
                }
                if (this.imgvisible2.alpha == 1) {
                    if (zj.Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 12 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
                        this.generalInfo.push(this.hunterInfo[i]);
                        a2.push(this.hunterInfo[i]);
                    }
                }
                if (this.imgvisible3.alpha == 1) {
                    if (zj.Game.PlayerHunterSystem.Table(this.hunterInfo[i].general_id).aptitude == 13 && this.hunterInfo[i].general_id != this.fatherGeneralId) {
                        this.generalInfo.push(this.hunterInfo[i]);
                        a3.push(this.hunterInfo[i]);
                    }
                }
            }
            this.loadMoney(a1, a2, a3);
            this.loadList();
        };
        /**计算金币 */
        HunterBatchStar.prototype.loadMoney = function (a, b, c) {
            var a1 = 0;
            var a2 = 0;
            var a3 = 0;
            var money = 0;
            a1 = Math.floor((a.length) / 3);
            money += a1 * this.money[1];
            a2 = Math.floor((b.length + a1) / 4);
            money += a2 * this.money[2];
            a3 = Math.floor((c.length + a2) / 5);
            money += a3 * this.money[3];
            this.labelUpStarNumber.text = zj.Set.NumberUnit2(money);
        };
        /**加载猎人列表 */
        HunterBatchStar.prototype.loadList = function () {
            var array = new eui.ArrayCollection();
            var fix = zj.PlayerItemSystem.FixCount(this.generalInfo.length, 18, 6);
            for (var i = 0; i < fix; i++) {
                this.generalInfo.push(new message.GeneralInfo());
            }
            for (var i = 0; i < this.generalInfo.length; i++) {
                var data = new zj.HunterBatchStarItemData;
                data.info = this.generalInfo[i];
                array.addItem(data);
            }
            this.listHeros.dataProvider = array;
            this.listHeros.itemRenderer = zj.HunterBatchStarItem;
        };
        /**点击升星 */
        HunterBatchStar.prototype.onBtnAddStar = function () {
            var _this = this;
            this.generals = null;
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GENERALS_CHANGE, this.onGeneralsChange, this);
            if (this.generalInfo.length > 0) {
                var a_1 = [];
                for (var i = 0; i < this.generalInfo.length; i++) {
                    if (this.generalInfo[i].general_id != 0) {
                        a_1.push(this.generalInfo[i].general_id);
                    }
                }
                if (a_1.length > 0) {
                    var vis = zj.Table.FindF(a_1, function (k, v) {
                        return zj.Game.PlayerHunterSystem.Table(v).aptitude == 13;
                    });
                    this.generals = a_1;
                    var star_1 = function () {
                        _this.GeneralUpStarBatch(a_1).then(function (info) {
                            var vis = zj.Table.FindF(info.generals, function (k, v) {
                                return v.star == 5;
                            });
                            if (vis) {
                                zj.toast_success("猎人批量升星成功");
                            }
                            if (info.generals.length != 0) {
                                var _loop_2 = function (i) {
                                    var b = zj.Table.FindF(info.generals, function (k, v) {
                                        return a_1[i] == v.general_id;
                                    });
                                    if (!b && info.generals.length > 0) {
                                        zj.Game.PlayerHunterSystem.deleteHunterById(a_1[i]);
                                    }
                                    ;
                                };
                                for (var i = 0; i < a_1.length; i++) {
                                    _loop_2(i);
                                }
                                if (info.generals.length != _this.generals.length) {
                                    _this.groupLeft1.visible = true;
                                    var array = new eui.ArrayCollection();
                                    info.generals.sort(function (a, b) {
                                        return b.star - a.star;
                                    });
                                    var fix = zj.PlayerItemSystem.FixCount(info.generals, 24, 6);
                                    for (var i = 0; i < fix; i++) {
                                        _this.generalInfo.push(new message.GeneralInfo());
                                    }
                                    for (var i = 0; i < info.generals.length; i++) {
                                        var data = new zj.HunterBatchStarItemData;
                                        data.info = info.generals[i];
                                        data.vis = false;
                                        array.addItem(data);
                                    }
                                    _this.listHeros1.dataProvider = array;
                                    _this.listHeros1.itemRenderer = zj.HunterBatchStarItem;
                                }
                                else {
                                    zj.toast_warning("所选猎人不足，未有猎人升星");
                                }
                                _this.sethunterinfo();
                                _this.countGeneralInfo();
                            }
                        }).catch(function () {
                        });
                    };
                    if (vis) {
                        zj.TipManager.ShowConfirmCancel("所选猎人中包含A级猎人是否继续？", function () {
                            star_1();
                        }, function () { });
                    }
                    else {
                        star_1();
                    }
                }
                else {
                    zj.toast_warning("数量不足，请选择");
                }
            }
            else {
                zj.toast_warning("数量不足，请选择");
            }
        };
        HunterBatchStar.prototype.onGeneralsChange = function () {
        };
        /** 批量升星协议 */
        HunterBatchStar.prototype.GeneralUpStarBatch = function (info) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralUpStarBatchRequest();
                request.body.generalIds = info;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_MONEY) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    var data = response.body.gameInfo;
                    resolve(data);
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                }, _this, false);
            });
        };
        HunterBatchStar.prototype.onBtnClose = function () {
            if (this.CB) {
                this.CB();
            }
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterBatchStar;
    }(zj.Dialog));
    zj.HunterBatchStar = HunterBatchStar;
    __reflect(HunterBatchStar.prototype, "zj.HunterBatchStar");
})(zj || (zj = {}));
//# sourceMappingURL=HunterBatchStar.js.map