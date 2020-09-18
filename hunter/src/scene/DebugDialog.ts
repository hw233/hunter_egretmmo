namespace zj {
// 闪屏界面

export class DebugDialog extends Dialog {
    
    private btnClose: eui.Button; // 关闭按钮
    private btnUpLevel: eui.Button; // 升级按钮
    private btnShare: eui.Button; // 分享按钮
    private btnPay: eui.Button; // 支付按钮
    private btnFight: eui.Button; // 战斗按钮
    private btnClearCache: eui.Button; // 清除所有缓存数据
    private btnRestart: eui.Button; // 重启游戏

    public constructor() {
        super();
        this.skinName = "resource/skins/DebugDialogSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnUpLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpLevel, this);
        this.btnShare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnShare, this);
        this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPay, this);
        this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFight, this);
        this.btnClearCache.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClearCache, this);
        this.btnRestart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRestart, this);
    }

    private onBtnClose() {
        this.close();
    }
    
    private onBtnUpLevel() {
        this.testGrade();
        this.openInstance();
        this.testDeleteGeneral();
        this.testAddAllCard();
        this.testAddAllHunter();
        this.testResource();
        this.testAddProp();
    }

    private onBtnRestart() {
        platform.restart();
    }

    private onBtnShare() {
        platform.share("精彩猎人之旅，不容错过", AppConfig.ProjectUrlRoot + "load.jpg", AppConfig.ProjectUrlRoot + "index.html", `userid=${Game.Controller.userID()}&roleid=${Game.Controller.roleID()}`);
    }

    private onBtnPay() {
        platform.pay("com.lrsj.ko.46", 1, "");
    }

    private onBtnFight() {
        //FightLoading.getInstance().startLoad(this.callBack,this);
        MapSceneLoading.getInstance().loadFightRes(18,this.callBack,this);
    }

    private onBtnClearCache() {
        egret.localStorage.clear();
        console.log("清除成功");
    }

    public callBack() {
        let scene = new StageSceneRpg();
        scene.initTmx();
        UIManager.Stage.addChild(scene);
    }

    private openInstance() {
        // 普通副本
        let request = new message.SimulateInstanceRequest();
        request.body.instanceId = 100113;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateInstanceResponse>resp;
            console.log("--- response = ", response);
            console.log("open instance success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("open instance fail");
        }, this, false);

        // 精英副本
        let request1 = new message.SimulateInstanceRequest();
        request1.body.instanceId = 200068;

        Game.Controller.send(request1, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateInstanceResponse>resp;
            console.log("--- response = ", response);
            console.log("open instance success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("open instance fail");
        }, this, false);

    }

    /** 测试删除所有hunter */
    private testDeleteGeneral() {
        let generals = [];
        let generalInfos: Array<message.GeneralInfo> = Game.PlayerHunterSystem.queryAllHunters();
        generalInfos.splice(0, 1);
        for (let i = 0; i < generalInfos.length; i++) {
            const v = generalInfos[i];
            if (v != null) {
                generals.push(v.general_id);
            }
        }        

        let request = new message.GeneralSellRequest();
        request.body.general_ids = generals;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.GeneralSellResponse>resp;
            console.log("--- response = ", response);
            console.log("delete general success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("delete general fail");
        }, this, false);

    }

    /** 测试添加所有卡片 */
    private testAddAllCard() {
        let cardIds = [];
        let table = TableItemPotato.Table();
        for (const k in table) {
            if (table.hasOwnProperty(k)) {
                const v = table[k];
                cardIds.push(v.id);
            }
        }

        let goodsInfos = [];
        for (let index = 0; index < cardIds.length; index++) {
            const v = cardIds[index];
            let goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = v;
            goodsInfo.count = 1;
            goodsInfo.index = 0;
            goodsInfo.showType = 0;
            goodsInfos.push(goodsInfo);
        }

        let request = new message.SimulateModifyGoodsRequest();
        request.body.goods = goodsInfos;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateModifyGoodsResponse>resp;
            console.log("--- response = ", response);
            console.log("add all cards success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("add all cards fail");
        }, this, false);

    }

    /** 测试添加所有猎人 */
    private testAddAllHunter() {
        let generalIds = [];
        let table = TableBaseGeneral.Table();
        for (const k in table) {
            if (table.hasOwnProperty(k)) {
                const v = table[k];
                if (v.is_open == 1) generalIds.push(v.general_id);
            }
        }

        let goodsInfos = [];
        for (let index = 0; index < generalIds.length; index++) {
            const v = generalIds[index];
            let goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = v;
            goodsInfo.count = 1;
            goodsInfo.index = 0;
            goodsInfo.showType = 0;
            goodsInfos.push(goodsInfo);
        }

        let request = new message.SimulateModifyGoodsRequest();
        request.body.goods = goodsInfos;
        
        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateModifyGoodsResponse>resp;
            console.log("--- response = ", response);
            console.log("add all hunters success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("add all hunters fail");
        }, this, false);
    }

    /** 添加所有资源 */
    private testResource() {

        let resources = [ 
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

        let goodsInfos = [];
        for (let index = 0; index < resources.length; index++) {
            const v = resources[index];
            let goodsInfo = new message.GoodsInfo();
            goodsInfo.goodsId = v[0];
            goodsInfo.count = v[1];
            goodsInfo.index = 0;
            goodsInfo.showType = 0;
            goodsInfos.push(goodsInfo);
        }

        let request = new message.SimulateModifyGoodsRequest();
        request.body.goods = goodsInfos;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateModifyGoodsResponse>resp;
            console.log("testResource --- response = ", response);
            console.log("add resouces success");
        }, (req: aone.AoneRequest): void => {
            console.log("testResource --- res = ", req);
            console.log("add resources fail");
        }, this, false);
    }

    /** 添加所有宝箱 */
    private testAddProp() {
        let propsTypes = [
            [message.EGoodsType.GOODS_TYPE_PROP, 900],
            [message.EGoodsType.GOODS_TYPE_GENERAL_SOUL, 900],
            [message.EGoodsType.GOODS_TYPE_PARTNER, 900],
            [message.EGoodsType.GOODS_TYPE_COLLECT, 10],
            [message.EGoodsType.GOODS_TYPE_CIMELIA, 50],
            [message.EGoodsType.GOODS_TYPE_TRANSEFER, 50]
        ];

        let props = [];
        for (let i = 0; i < propsTypes.length; i++) {
            const v = propsTypes[i];
            let name = TableItemBase.Item(v[0]).table_name;
            if (name == "table_item_prop") {
                let table = TableItemProp.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        let v1: TableItemProp = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            } else if (name == "table_item_general_soul") {
                let table = TableItemGeneralSoul.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        const v1 = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            } else if (name == "table_item_partner") {
                let table = TableItemPartner.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        const v1 = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            } else if (name == "table_item_collect") {
                let table = TableItemCollect.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        const v1 = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            } else if (name == "table_item_cimelia") {
                let table = TableItemCimelia.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        const v1 = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            } else if (name == "table_item_transfer") {
                let table = TableItemTransfer.Table();
                for (const k in table) {
                    if (table.hasOwnProperty(k)) {
                        const v1 = table[k];
                        let goodsInfo = new message.GoodsInfo();
                        goodsInfo.goodsId = v1.id;
                        goodsInfo.count = v[1];
                        props.push(goodsInfo);
                    }
                }
            }
        }

        let request = new message.SimulateModifyGoodsRequest();
        request.body.goods = props;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateModifyGoodsResponse>resp;
            console.log("add props success");
        }, (req: aone.AoneRequest): void => {
            console.log("testResource --- res = ", req);
            console.log("add props fail");
        }, this, false);
    }

    private testGrade() {
        let request = new message.SimulateModifyRoleLevelRequest();
        request.body.level = 60;

        Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
            let response = <message.SimulateModifyRoleLevelResponse>resp;
            console.log("--- response = ", response);
            console.log("grade success");
        }, (req: aone.AoneRequest): void => {
            console.log("--- res = ", req);
            console.log("greade fail");
        }, this, false);
    }

}
}