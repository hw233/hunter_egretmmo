namespace zj {
// created by hhh in 2018/12/11

/************** 卡片部分 突破界面 ****************/

export class CardBreakSelectDialog extends Dialog {
    private btnClose: eui.Button;
    private btnSelectedOk: eui.Button;

    private labelTip: eui.Label;
    private labelSelectedNum: eui.Label;

    private listMetarials: eui.List;

    private potatoId: number;
    private index: number;
    private breakLevel: number;
    private info: message.PotatoInfo;
    private consume: number;
    private father: CardBreakMainDialog;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBreakSelectDialogSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);

        this.init();
    }

    private init() {
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnSelectedOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSelectedOk, this);
    }

    public setInfo(id: number, index: number, breaklevel: number, info: message.PotatoInfo, father: CardBreakMainDialog) {
        this.potatoId = id;
        this.index = index;
        this.breakLevel = breaklevel;
        this.info = info;
        this.father = father;

        this.setInfoList();
        this.setConsume();

        let name = TableItemPotato.Item(this.potatoId).name;
        let level = TablePotatoBreak.Item(this.breakLevel).exchange_level;
        if (level == 0)
            this.labelTip.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_break_rand, name));
        else
            this.labelTip.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_break_tips, level, name));
    }

    private setInfoList() {
        let level = TablePotatoBreak.Item(this.breakLevel).exchange_level;
        let tbl = PlayerCardSystem.GetAllCardByName(this.info, this.potatoId, this.index, level);
        this.consume = TablePotatoBreak.Item(this.breakLevel).exchange_count;

        this.listMetarials.itemRenderer = CardBreakSelectItem;
        let collection = [];
        for (let i = 0; i < tbl.length; i++) {
            collection[i] = { index: i, info: tbl[i], breakLevel: this.breakLevel, infos: tbl, father: this };
        }
        this.listMetarials.dataProvider = new eui.ArrayCollection(collection);
    }

    public setConsume() {
        let len = Game.PlayerCardSystem.getBreakPotatoSel().length;
        if (len != this.consume)
            this.labelSelectedNum.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.awaken_select, len, this.consume));
        else
            this.labelSelectedNum.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.awaken_select_next, len, this.consume));
    }

    private onBtnSelectedOk() {
        this.close(UI.HIDE_TO_TOP);
        this.father.setCardBreak();
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
        Game.PlayerCardSystem.initBreakPotatoSel();
        this.father.setCardBreak();
    }
}

}