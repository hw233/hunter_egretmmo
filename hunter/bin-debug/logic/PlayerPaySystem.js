var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 商城信息系统
    // lizhengqiang
    // 20190318
    var PlayerPaySystem = (function () {
        function PlayerPaySystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.webPayUrl = null;
            this.customerInfo = { "customerName": "", "customerQQ": "", "customerWeichat": "", "customerWeb": "" };
            this.overSeaPayInfo = { "web_pay_sea": "", "pay_types": [], "pay_rebate": false };
            this.allProducts = [];
        }
        // 通过ID查找Item(普通商品)
        PlayerPaySystem.PayItemByID = function (id) {
            if (!id)
                return null;
            var payTbl = zj.TablePayIndex.Table();
            if (!payTbl)
                return null;
            for (var k in payTbl) {
                if (payTbl[k].index.toString() == id && payTbl[k].product_type == 2) {
                    return payTbl[k];
                }
            }
            return null;
        };
        PlayerPaySystem.GetCpExtJson = function (ext_index, secret_mallId, activityIndex) {
            var cpExt = "";
            if (secret_mallId == undefined || secret_mallId == null) {
                cpExt = "{\"info\":[{\"index\":\"" + ext_index + "\",\"count\":1}]}";
            }
            else {
                cpExt = "{\"info\":[{\"secret_mall\":\"" + secret_mallId + "\",\"count\":" + ext_index + ", \"index\":\"" + activityIndex + "\"}]}";
            }
            return cpExt;
        };
        PlayerPaySystem.GetProductId = function (index, products) {
            if (index == undefined || index == null)
                return "";
            if (!products) {
                products = zj.Game.PlayerPaySystem.allProducts;
            }
            var payIndex = zj.TablePayIndex.Item(index);
            if (!payIndex)
                return "";
            for (var _i = 0, products_1 = products; _i < products_1.length; _i++) {
                var v = products_1[_i];
                if (v.coin == payIndex.raw_token) {
                    return v.id;
                }
            }
            return "";
        };
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerPaySystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_LOGIN_GAMESERVER_INFO, this.initPayInfo, this);
            this.queryAppProducts();
        };
        PlayerPaySystem.prototype.uninit = function () {
            this.webPayUrl = null;
            this.customerInfo = { "customerName": "", "customerQQ": "", "customerWeichat": "", "customerWeb": "" };
            this.overSeaPayInfo = { "web_pay_sea": "", "pay_types": [], "pay_rebate": false };
            //this.allProducts = [];
        };
        PlayerPaySystem.prototype.initPayInfo = function (response) {
            this.customerInfo.customerName = response.customer_name;
            this.customerInfo.customerQQ = response.customer_qq;
            this.customerInfo.customerWeichat = response.customer_weichat;
            this.customerInfo.customerWeb = response.customer_web_pay;
            this.webPayUrl = response.web_pay;
            this.overSeaPayInfo.web_pay_sea = response.web_pay_sea;
            this.overSeaPayInfo.pay_types = response.pay_types;
            this.overSeaPayInfo.pay_rebate = response.pay_rebate;
        };
        PlayerPaySystem.prototype.queryProduct = function (productID) {
            for (var i = 0; i < this.allProducts.length; i++) {
                if (this.allProducts[i].id == productID)
                    return this.allProducts[i];
            }
            return null;
        };
        PlayerPaySystem.prototype.loadPayProducts = function (response) {
            this.allProducts = [];
            for (var _i = 0, _a = response.products; _i < _a.length; _i++) {
                var v = _a[_i];
                for (var _b = 0, _c = response.channel_products_ext; _b < _c.length; _b++) {
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
                        this.allProducts.push(tmp);
                        break;
                    }
                }
            }
            var i = 0;
            while (i < this.allProducts.length) {
                if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                    this.allProducts.splice(i, 1);
                }
                else {
                    i = i + 1;
                }
            }
            this.allProducts.sort(function (a, b) {
                var itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
                var itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
                if (itemA == null)
                    return 1;
                if (itemB == null)
                    return -1;
                if (itemA.sort_index == itemB.sort_index) {
                    return b.amount - a.amount;
                }
                else {
                    return itemA.sort_index - itemB.sort_index;
                }
            });
        };
        PlayerPaySystem.prototype.queryAppProducts = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var data = new message.QueryAppProductsReqBody();
                data.channel = zj.Util.getAppVersionInfo().channel;
                var body = JSON.stringify(data);
                var request = new egret.HttpRequest();
                request.responseType = egret.HttpResponseType.TEXT;
                request.setRequestHeader("Content-Type", "application/json");
                request.open(zj.AppConfig.ApiUrlRoot + ("/api/query_products.do?appid=" + zj.AppConfig.AppId), egret.HttpMethod.POST);
                request.send(body);
                request.addEventListener(egret.Event.COMPLETE, function (event) {
                    var request = event.currentTarget;
                    var json = JSON.parse(request.response);
                    if (json.retcode != 0) {
                        reject(json.retcode);
                        return;
                    }
                    var response = json.body;
                    _this.loadPayProducts(response);
                    resolve(response);
                }, _this);
                request.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                    reject(-1);
                }, _this);
            });
        };
        PlayerPaySystem.prototype.simulateCharge = function (payIndex, secretMall, activityIndex) {
            var _this = this;
            if (secretMall === void 0) { secretMall = 0; }
            if (activityIndex === void 0) { activityIndex = 0; }
            return new Promise(function (resolve, reject) {
                var request = new message.SimulateChargeRequest();
                request.body.activity_index = activityIndex;
                request.body.secret_mall = secretMall;
                request.body.payIndex = payIndex;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    if (response.header.result != 0) {
                        reject(response.header.result);
                        return;
                    }
                    resolve(response.body.gameInfo);
                }, function (req) {
                    console.log("req:", req);
                    reject("timeout");
                }, _this, false, false);
            });
        };
        return PlayerPaySystem;
    }());
    zj.PlayerPaySystem = PlayerPaySystem;
    __reflect(PlayerPaySystem.prototype, "zj.PlayerPaySystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerPaySystem.js.map