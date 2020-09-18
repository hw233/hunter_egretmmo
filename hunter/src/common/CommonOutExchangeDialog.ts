namespace zj {
/**
 * @author chen xi.
 * 
 * @date 2019-1-8
 * 
 * @class 转化公共界面
 */
export class CommonOutExchangeDialog extends Dialog {
    private btnClose: eui.Button;
    private imgFrame: eui.Image;
    private imgIcon: eui.Image;
    private labelName: eui.Label;
    private labelOwn: eui.Label;
    private listGet: eui.List;
    private groupConvert: eui.Group;
    private imgCurrentFrame: eui.Image;
    private imgCurrentIcon: eui.Image;
    private labelCurrentName: eui.Label;
    private labelCurrentOwn: eui.Label;
    private labelNextName: eui.Label;
    private labelNextOwn: eui.Label;
    private imgNextFrame: eui.Image;
    private imgNextIcon: eui.Image;
    private btnSub: eui.Button;
    private labelCount: eui.EditableText;
    private btnAdd: eui.Button;
    private btnMax: eui.Button;
    private btnExchange: eui.Button;

    private listGetData: eui.ArrayCollection = new eui.ArrayCollection();
    private max: number;
    private count: number;
    private itemId: number;
    private callback: Function;
    private needNum: number;
    public constructor() {
        super();
        this.skinName = "resource/skins/common/CommonOutExchangeDialogSkin.exml";

        let tap = egret.TouchEvent.TOUCH_TAP;
        this.btnSub.addEventListener(tap, this.onBtnSub, this);
        this.btnAdd.addEventListener(tap, this.onBtnAdd, this);
        this.btnMax.addEventListener(tap, this.onBtnMax, this);
        this.btnExchange.addEventListener(tap, this.onBtnExchange, this);
        this.btnClose.addEventListener(tap, this.onBtnClose, this);
        this.labelCount.addEventListener(egret.FocusEvent.FOCUS_OUT, this.labelChange, this)
    }

    /**
     * 设置信息
     * 
     * @param itemId 物品ID
     * @param callback 回调函数，关闭界面后，调用该回调函数
     */
    public setInfo(itemId: number, callback: Function) {
        this.itemId = itemId;
        this.callback = callback;

        this.refresh();
    }

    private refresh() {
        // set own group info
        let itemInfo = PlayerItemSystem.Set(this.itemId) as any;
        this.imgFrame.source = cachekey(itemInfo.Frame, this);
        this.imgIcon.source = cachekey(itemInfo.Path, this);
        this.labelName.text = itemInfo.Info.name;
        this.labelOwn.text = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.has, PlayerItemSystem.Count(this.itemId));

        this.loadGetList(itemInfo.Info.from);

        // set current group info
        let itemCurrentInfo = PlayerItemSystem.Set(itemInfo.Info.client_transfer[0]) as any;
        this.imgCurrentFrame.source = cachekey(itemCurrentInfo.Frame, this);
        this.imgCurrentIcon.source = cachekey(itemCurrentInfo.Path, this);
        this.labelCurrentName.text = itemCurrentInfo.Info.name;
        let current = PlayerItemSystem.Count(itemInfo.Info.client_transfer[0]);
        let enough = itemInfo.Info.client_transfer[1];
        this.labelCurrentOwn.text = Helper.StringFormat("%d/%d", current, enough);
        Set.LabelNumberGreenAndRed(this.labelCurrentOwn, current, enough);

        this.max = Math.floor(current / enough) > 999 ? 999 : Math.floor(current / enough);

        // set next group info
        let itemNextInfo = PlayerItemSystem.Set(itemInfo.Info.id) as any;
        this.imgNextFrame.source = cachekey(itemNextInfo.Frame, this);
        this.imgNextIcon.source = cachekey(itemNextInfo.Path, this);
        this.labelNextName.text = itemNextInfo.Info.name;
        this.labelNextOwn.text = "x1";

        this.count = 1;
        this.setCountInfo();
    }

    private loadGetList(data: Array<any>) {
        // to do
        // 测试
        let list = [[], [], []];
        for (let i = 0; i < data.length; i++) {
            let id = data[i];
            if (id == 0) {
                let drops = Game.PlayerInstanceSystem.GetProp(this.itemId);
                for (let i = 0; i < drops.length; i++) {
                    let v = drops[i];
                    list[1].push([0, v]);
                }
            } else {
                if (Table.VIn(TableEnum.Enum.HIDE_REVIEW, id) == false) {
                    // to do 
                    // lvdb.GetOpen(id)   
                }
                list[2].push([id, null]);
            }
        }
        let item = [];
        if (list[1].length != 0) item = [[], [], []];
        for (let i = 0; i < list.length; i++) {
            if (list[1].length != 0) {
                for (let j = 0; j < list[i].length; j++) {
                    item[i].push(list[i][j]);
                }
            } else {
                for (let j = 0; j < list[i].length; j++) {
                    item.push(list[i][j]);
                }
            }
        }
        this.listGetData.removeAll();
        for (let i = 0; i < item.length; i++) {
            if (item[i] != null && item[i].length != 0 && item[i] != undefined) {
                let itemData = new Common_OutPutItemData();
                if (item[i][0] == null || item[i][0] == undefined) {
                    itemData.fromId = item[i];
                    itemData.mobId = null;
                }
                else {
                    itemData.fromId = item[i][0];
                    itemData.mobId = item[i][1];
                }
                this.listGetData.addItem(itemData);
            }
        }
        this.listGet.dataProvider = this.listGetData;
        this.listGet.itemRenderer = Common_OutPutItem;
        this.listGet.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListGetTap, this);
    }
    public setNeedNum(needNum) {
        this.needNum = needNum;
    }

    private onListGetTap(e: eui.ItemTapEvent) {
        let data = this.listGetData.getItemAt(e.itemIndex) as Common_OutPutItemData;
        if (data == null || data == undefined) return;

        if (data.fromId == 0 && (data.mobId != null || data.mobId != undefined)) {
            if (Game.PlayerInstanceSystem.Chapter(data.mobId).chapter_id >= 17 ||
                PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_PARTNER) {
                this.onBtnClose();
                let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.StartFast(data.mobId, this.itemId, this.needNum, this) }, this, 1000);
            }
            else {
                this.onBtnClose();
                let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.StartFast(data.mobId, this.itemId, this.needNum, this) }, this, 1000);
            }
        }
        else if (data.fromId == 41 && (data.mobId != null || data.mobId != undefined)) {
            // 高级副本
        }
        else if (data.fromId == ListType.List_Elite && data.mobId != null) {
            // loadUI(Adventurems)
            //     .then((dialog: Adventurems) => {
            //         dialog.LoadFromCardOutPut(data.mobId);
            //         dialog.show(UI.SHOW_FROM_TOP);
            //     });
            SceneManager.instance.EnterAdventure(-2, data.mobId);
        }
        else {
            this.onBtnClose();
            let timer = egret.setTimeout(() => { Game.PlayerMissionSystem.jump(data.fromId) }, this, 1000);
        }
    }

    private setCountInfo() {
        this.labelCount.text = this.count.toString();
    }

    private onBtnSub() {
        if (this.count <= 1) return;

        this.count -= 1;
        this.setCountInfo();
    }

    private onBtnAdd() {
        if (this.count >= this.max) return;
        this.count += 1;
        if (this.count > 100) {
            this.count = 100;
            toast_warning("最大转化数为100");
        }

        this.setCountInfo();
    }

    private onBtnMax() {
        if (this.max <= 0) return;
        if (this.max > 100) {
            toast_warning("最大转化数为100");
            this.count = 100;
        } else {
            this.count = this.max;
        }
        this.setCountInfo();
    }

    private labelChange() {
        if (isNaN(Number(this.labelCount.text)) || this.labelCount.text == "") {
            this.labelCount.text = "1";
        }
    }

    private onBtnExchange() {
        Game.PlayerHunterSystem.quickMall(this.itemId, Number(this.labelCount.text))
            .then((gameInfo: message.GameInfo) => {
                loadUI(CommonGetDialog).then((dialog: CommonGetDialog) => {
                    dialog.init(gameInfo.getGoods);
                    dialog.show();
                });
                this.refresh();
            }).catch(() => {

            });
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);

        if (this.callback) {
            this.callback();
        }
    }
}

}