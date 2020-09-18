namespace zj {
// 商城信息系统
// lizhengqiang
// 20190318

export class PlayerPaySystem {

    ///////////////////////////////////////////////////////////////////////////
    // 静态函数

    // 通过ID查找Item(普通商品)
    public static PayItemByID(id: string): TablePayIndex {
        if (!id) return null;
        let payTbl = TablePayIndex.Table();
        if (!payTbl) return null;
        for (let k in payTbl) {
            if (payTbl[k].index.toString() == id && payTbl[k].product_type == 2) {
                return payTbl[k];
            }
        }
        return null;
    }

    public static GetCpExtJson(ext_index: number | string, secret_mallId?: number | string, activityIndex?: number | string): string {
        let cpExt: string = "";
        if (secret_mallId == undefined || secret_mallId == null) {
            cpExt = `{\"info\":[{\"index\":\"${ext_index}\",\"count\":1}]}`;
        } else {
            cpExt = `{\"info\":[{\"secret_mall\":\"${secret_mallId}\",\"count\":${ext_index}, \"index\":\"${activityIndex}\"}]}`;
        }

        return cpExt;
    }

    public static GetProductId(index: number | string, products?: Array<MyProductInfo>): string {
        if (index == undefined || index == null) return "";
        if (!products) {
            products = Game.PlayerPaySystem.allProducts;
        }
        let payIndex = TablePayIndex.Item(index);
        if (!payIndex) return "";
        for (const v of products) {
            if (v.coin == payIndex.raw_token) {
                return v.id;
            }
        }

        return "";
    }

    ///////////////////////////////////////////////////////////////////////////
    // 变量
    public webPayUrl: string = null;
    public customerInfo: { "customerName": string, "customerQQ": string, "customerWeichat": string, "customerWeb": string } = { "customerName": "", "customerQQ": "", "customerWeichat": "", "customerWeb": "" };
    public overSeaPayInfo: { "web_pay_sea": string, "pay_types": number[], "pay_rebate": boolean } = { "web_pay_sea": "", "pay_types": [], "pay_rebate": false };

    private allProducts: Array<MyProductInfo> = [];

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        Game.EventManager.on(GameEvent.PLAYER_LOGIN_GAMESERVER_INFO, this.initPayInfo, this);
        this.queryAppProducts();
    }

    public uninit() {
        this.webPayUrl = null;
        this.customerInfo = { "customerName": "", "customerQQ": "", "customerWeichat": "", "customerWeb": "" };
        this.overSeaPayInfo = { "web_pay_sea": "", "pay_types": [], "pay_rebate": false };

        //this.allProducts = [];
    }

    private initPayInfo(response: message.LoginGameserverRespBody) {
        this.customerInfo.customerName = response.customer_name;
        this.customerInfo.customerQQ = response.customer_qq;
        this.customerInfo.customerWeichat = response.customer_weichat;
        this.customerInfo.customerWeb = response.customer_web_pay;

        this.webPayUrl = response.web_pay;

        this.overSeaPayInfo.web_pay_sea = response.web_pay_sea;
        this.overSeaPayInfo.pay_types = response.pay_types;
        this.overSeaPayInfo.pay_rebate = response.pay_rebate;

    }

    public queryProduct(productID: string): MyProductInfo {
        for (let i = 0; i < this.allProducts.length; i++) {
            if (this.allProducts[i].id == productID) return this.allProducts[i];
        }
        return null;
    }

    private loadPayProducts(response: message.QueryAppProductsRespBody) {
        this.allProducts = [];

        for (const v of response.products) {
            for (const vv of response.channel_products_ext) {
                if (v.id == vv.id) {
                    let tmp: MyProductInfo = {
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
                    for (const k in tmp) {
                        tmp[k] = v[k];
                    }
                    tmp.cp_product_id = vv.cp_product_id;
                    this.allProducts.push(tmp);
                    break;
                }
            }
        }

        let i = 0;
        while (i < this.allProducts.length) {
            if (PlayerPaySystem.PayItemByID(this.allProducts[i].cp_product_id) == null) {
                this.allProducts.splice(i, 1);
            } else {
                i = i + 1;
            }
        }

        this.allProducts.sort(function (a, b) {
            let itemA = PlayerPaySystem.PayItemByID(a.cp_product_id);
            let itemB = PlayerPaySystem.PayItemByID(b.cp_product_id);
            if (itemA == null) return 1;
            if (itemB == null) return -1;
            if (itemA.sort_index == itemB.sort_index) {
                return b.amount - a.amount;
            } else {
                return itemA.sort_index - itemB.sort_index;
            }

        });
    }

    public queryAppProducts(): Promise<{}> {
        return new Promise((resolve, reject) => {
            let data = new message.QueryAppProductsReqBody();
            data.channel = Util.getAppVersionInfo().channel;
            let body = JSON.stringify(data);

            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            request.setRequestHeader("Content-Type", "application/json");
            request.open(AppConfig.ApiUrlRoot + `/api/query_products.do?appid=${AppConfig.AppId}`, egret.HttpMethod.POST);
            request.send(body);
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                let request = <egret.HttpRequest>event.currentTarget;
                let json = JSON.parse(request.response);
                if (json.retcode != 0) {
                    reject(json.retcode);
                    return;
                }

                let response = <message.QueryAppProductsRespBody>json.body;
                this.loadPayProducts(response);
                resolve(response);
            }, this);

            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                reject(-1);
            }, this);
        });
    }

    public simulateCharge(payIndex: number, secretMall: number = 0, activityIndex: number = 0): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SimulateChargeRequest();
            request.body.activity_index = activityIndex;
            request.body.secret_mall = secretMall;
            request.body.payIndex = payIndex;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SimulateChargeResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }
                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

}
}