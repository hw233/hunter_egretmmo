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
    // 闪屏界面
    var DebugDialog = (function (_super) {
        __extends(DebugDialog, _super);
        function DebugDialog() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/DebugDialogSkin.exml";
            _this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClose, _this);
            _this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnUpLevel, _this);
            _this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnShare, _this);
            _this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnPay, _this);
            _this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnFight, _this);
            _this.btnClearCache.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnClearCache, _this);
            _this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBtnRestart, _this);
            return _this;
        }
        DebugDialog.prototype.onBtnClose = function () {
            this.close();
        };
        DebugDialog.prototype.onBtnUpLevel = function () {
            this.testGrade();
            this.openInstance();
            this.testDeleteGeneral();
            this.testAddAllCard();
            this.testAddAllHunter();
            this.testResource();
            this.testAddProp();
        };
        DebugDialog.prototype.onBtnRestart = function () {
            zj.platform.restart();
        };
        DebugDialog.prototype.onBtnShare = function () {
            zj.platform.share("精彩猎人之旅，不容错过", zj.AppConfig.ProjectUrlRoot + "load.jpg", zj.AppConfig.ProjectUrlRoot + "index.html", "userid=" + zj.Game.Controller.userID() + "&roleid=" + zj.Game.Controller.roleID());
        };
        DebugDialog.prototype.onBtnPay = function () {
            zj.platform.pay("com.lrsj.ko.46", 1, "");
        };
        DebugDialog.prototype.onBtnFight = function () {
            //FightLoading.getInstance().startLoad(this.callBack,this);
            zj.MapSceneLoading.getInstance().loadFightRes(18, this.callBack, this);
        };
        DebugDialog.prototype.onBtnClearCache = function () {
            egret.localStorage.clear();
            console.log("清除成功");
        };
        DebugDialog.prototype.callBack = function () {
            var scene = new zj.StageSceneRpg();
            scene.initTmx();
            zj.UIManager.Stage.addChild(scene);
        };
        DebugDialog.prototype.openInstance = function () {
            // 普通副本
            var request = new message.SimulateInstanceRequest();
            request.body.instanceId = 100113;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("open instance success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("open instance fail");
            }, this, false);
            // 精英副本
            var request1 = new message.SimulateInstanceRequest();
            request1.body.instanceId = 200068;
            zj.Game.Controller.send(request1, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("open instance success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("open instance fail");
            }, this, false);
        };
        /** 测试删除所有hunter */
        DebugDialog.prototype.testDeleteGeneral = function () {
            var generals = [];
            var generalInfos = zj.Game.PlayerHunterSystem.queryAllHunters();
            generalInfos.splice(0, 1);
            for (var i = 0; i < generalInfos.length; i++) {
                var v = generalInfos[i];
                if (v != null) {
                    generals.push(v.general_id);
                }
            }
            var request = new message.GeneralSellRequest();
            request.body.general_ids = generals;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("delete general success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("delete general fail");
            }, this, false);
        };
        /** 测试添加所有卡片 */
        DebugDialog.prototype.testAddAllCard = function () {
            var cardIds = [];
            var table = zj.TableItemPotato.Table();
            for (var k in table) {
                if (table.hasOwnProperty(k)) {
                    var v = table[k];
                    cardIds.push(v.id);
                }
            }
            var goodsInfos = [];
            for (var index = 0; index < cardIds.length; index++) {
                var v = cardIds[index];
                var goodsInfo = new message.GoodsInfo();
                goodsInfo.goodsId = v;
                goodsInfo.count = 1;
                goodsInfo.index = 0;
                goodsInfo.showType = 0;
                goodsInfos.push(goodsInfo);
            }
            var request = new message.SimulateModifyGoodsRequest();
            request.body.goods = goodsInfos;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("add all cards success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("add all cards fail");
            }, this, false);
        };
        /** 测试添加所有猎人 */
        DebugDialog.prototype.testAddAllHunter = function () {
            var generalIds = [];
            var table = zj.TableBaseGeneral.Table();
            for (var k in table) {
                if (table.hasOwnProperty(k)) {
                    var v = table[k];
                    if (v.is_open == 1)
                        generalIds.push(v.general_id);
                }
            }
            var goodsInfos = [];
            for (var index = 0; index < generalIds.length; index++) {
                var v = generalIds[index];
                var goodsInfo = new message.GoodsInfo();
                goodsInfo.goodsId = v;
                goodsInfo.count = 1;
                goodsInfo.index = 0;
                goodsInfo.showType = 0;
                goodsInfos.push(goodsInfo);
            }
            var request = new message.SimulateModifyGoodsRequest();
            request.body.goods = goodsInfos;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("add all hunters success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("add all hunters fail");
            }, this, false);
        };
        /** 添加所有资源 */
        DebugDialog.prototype.testResource = function () {
            var resources = [
                [message.EResourceType.RESOURCE_MONEY, 999000000],
                [message.EResourceType.RESOURCE_TOKEN, 99900000],
                [message.EResourceType.RESOURCE_POWER, 99900000],
                [message.EResourceType.RESOURCE_RELIC_COIN, 999],
                [message.EResourceType.RESOURCE_LADDER, 99900000],
                [message.EResourceType.RESOURCE_LEAGUE, 99900000],
                [message.EResourceType.RESOURCE_HONOR_COIN, 99900000],
                [message.EResourceType.RESOURCE_LOTTERYSCORE, 9990000],
                [message.EResourceType.RESOURCE_LEAGUE_SCORE, 9990000],
                [message.EResourceType.RESOURCE_BEER, 3000],
                [message.EResourceType.RESOURCE_CHAMPAGNE, 2],
                [message.EResourceType.RESOURCE_REDWINE, 2],
                [message.EResourceType.RESOURCE_SODA, 300]
            ];
            var goodsInfos = [];
            for (var index = 0; index < resources.length; index++) {
                var v = resources[index];
                var goodsInfo = new message.GoodsInfo();
                goodsInfo.goodsId = v[0];
                goodsInfo.count = v[1];
                goodsInfo.index = 0;
                goodsInfo.showType = 0;
                goodsInfos.push(goodsInfo);
            }
            var request = new message.SimulateModifyGoodsRequest();
            request.body.goods = goodsInfos;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("testResource --- response = ", response);
                console.log("add resouces success");
            }, function (req) {
                console.log("testResource --- res = ", req);
                console.log("add resources fail");
            }, this, false);
        };
        /** 添加所有宝箱 */
        DebugDialog.prototype.testAddProp = function () {
            var propsTypes = [
                [message.EGoodsType.GOODS_TYPE_PROP, 900],
                [message.EGoodsType.GOODS_TYPE_GENERAL_SOUL, 900],
                [message.EGoodsType.GOODS_TYPE_PARTNER, 900],
                [message.EGoodsType.GOODS_TYPE_COLLECT, 10],
                [message.EGoodsType.GOODS_TYPE_CIMELIA, 50],
                [message.EGoodsType.GOODS_TYPE_TRANSEFER, 50]
            ];
            var props = [];
            for (var i = 0; i < propsTypes.length; i++) {
                var v = propsTypes[i];
                var name_1 = zj.TableItemBase.Item(v[0]).table_name;
                if (name_1 == "table_item_prop") {
                    var table = zj.TableItemProp.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
                else if (name_1 == "table_item_general_soul") {
                    var table = zj.TableItemGeneralSoul.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
                else if (name_1 == "table_item_partner") {
                    var table = zj.TableItemPartner.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
                else if (name_1 == "table_item_collect") {
                    var table = zj.TableItemCollect.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
                else if (name_1 == "table_item_cimelia") {
                    var table = zj.TableItemCimelia.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
                else if (name_1 == "table_item_transfer") {
                    var table = zj.TableItemTransfer.Table();
                    for (var k in table) {
                        if (table.hasOwnProperty(k)) {
                            var v1 = table[k];
                            var goodsInfo = new message.GoodsInfo();
                            goodsInfo.goodsId = v1.id;
                            goodsInfo.count = v[1];
                            props.push(goodsInfo);
                        }
                    }
                }
            }
            var request = new message.SimulateModifyGoodsRequest();
            request.body.goods = props;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("add props success");
            }, function (req) {
                console.log("testResource --- res = ", req);
                console.log("add props fail");
            }, this, false);
        };
        DebugDialog.prototype.testGrade = function () {
            var request = new message.SimulateModifyRoleLevelRequest();
            request.body.level = 60;
            zj.Game.Controller.send(request, function (req, resp) {
                var response = resp;
                console.log("--- response = ", response);
                console.log("grade success");
            }, function (req) {
                console.log("--- res = ", req);
                console.log("greade fail");
            }, this, false);
        };
        return DebugDialog;
    }(zj.Dialog));
    zj.DebugDialog = DebugDialog;
    __reflect(DebugDialog.prototype, "zj.DebugDialog");
})(zj || (zj = {}));
//# sourceMappingURL=DebugDialog.js.map