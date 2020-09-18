namespace zj {
// created by hhh in 2018/12/12

/************** 卡片部分 突破界面 ****************/

export class CardBreakSelectItem extends eui.ItemRenderer {
    private groupStar: eui.Group;
    private groupClick: eui.Group;
    private groupClickLong: eui.Group;

    private imageFrame: eui.Image;
    private imageIcon: eui.Image;
    private imageCardType: eui.Image;
    private imageLock: eui.Image;
    private imageShadow: eui.Image;
    private imageBingo: eui.Image;

    private labelLevel: eui.BitmapLabel;

    private father: CardBreakSelectDialog;
    private tbl: Array<message.PotatoInfo> = [];
    private info: message.PotatoInfo;

    private focus: boolean = false;

    private index: number;
    private breakLevel: number;

    private touchX: number = 0;
    private touchY: number = 0;
    private timeOut: number = 0;

    public constructor() {
        super();

        this.skinName = "resource/skins/card/CardBreakSelectItemSkin.exml";
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);

        cachekeys(<string[]>UIResource["CardBreakSelectItem"], null);

        this.init();
    }

    private init() {
        this.groupClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupClick, this);
        this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupLongClickBegin, this);
        this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchGroupLongClickMove, this);
        this.groupClickLong.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchGroupLongClickEnd, this);

        this.focus = false;
    }

    protected dataChanged() {
        this.father = this.data.father;
        this.index = this.data.index;
        this.info = this.data.info;
        this.breakLevel = this.data.breakLevel;
        this.tbl = this.data.infos;

        let tbl = TableItemPotato.Item(this.info.id);
        let framePic = PlayerCardSystem.GetItemFrame(this.info.id)[0];

        let imgFramePath = framePic;
        let imgCardTypePath = UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1];
        let imgIconPath = tbl.path;

        this.imageFrame.source = cachekey(imgFramePath, this);
        this.imageCardType.source = cachekey(imgCardTypePath, this);
        this.imageIcon.source = cachekey(imgIconPath, this);
        
        this.labelLevel.text = this.info.level + "";

        if (this.info.add_attri.length + 1 == 5 && this.info.star < 6 || this.info.add_attri.length == 5 && this.info.star >= 6)
            Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
        else
            Helper.SetStar(this.groupStar, this.info.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);

        let isSel = false;
        for (let k in Game.PlayerCardSystem.getBreakPotatoSel()) {
            if (this.index == Game.PlayerCardSystem.getBreakPotatoSel()[k]) {
                isSel = true;
                break;
            }
        }
        let lock = false;
        for (let k in this.tbl) {
            if (this.tbl[k].index == this.info.index && (this.tbl[k].pos != 0 || this.tbl[k].is_lock)) {
                lock = true;
                break;
            }
        }

        this.imageBingo.visible = isSel;
        this.imageShadow.visible = lock;
        this.imageLock.visible = lock;
    }

    private onTouchGroupLongClickBegin(e: egret.TouchEvent) {
        this.touchX = e.stageX;
        this.touchY = e.stageY;

        this.timeOut = egret.setTimeout(() => { TipManager.ShowCard(this.info); }, this, 1000);
    }

    private onTouchGroupLongClickMove(e: egret.TouchEvent) {
        if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
            return;

        egret.clearTimeout(this.timeOut);

        this.onTouchGroupClick();
    }

    private onTouchGroupLongClickEnd() {
        egret.clearTimeout(this.timeOut);

        this.onTouchGroupClick();
    }

    private onTouchGroupClick() {
        let info = TablePotatoBreak.Item(this.breakLevel);
        let gnrNum = info.exchange_count;
        let hava = false;
        for (let k in Game.PlayerCardSystem.getBreakPotatoSel()) {
            if (Game.PlayerCardSystem.getBreakPotatoSel()[k] == this.index) {
                hava = true;
                break;
            }
        }
        let host = false;
        for (let k in this.tbl) {
            if (this.tbl[k].index == this.info.index && this.tbl[k].pos != 0) {
                host = true;
                break;
            }
        }
        let lock = false;
        for (let k in this.tbl) {
            if (this.tbl[k].index == this.info.index && this.tbl[k].is_lock) {
                lock = true;
                break;
            }
        }
        if (host) {
            toast_warning(TextsConfig.TextsConfig_Hunter.card_be_break);
            return;
        }
        else if (lock) {
            toast_warning(TextsConfig.TextsConfig_Hunter.card_be_lock);
            return;
        }
        else if (Game.PlayerCardSystem.getBreakPotatoSel().length >= gnrNum && !this.focus && !hava) {
            toast_warning(TextsConfig.TextsConfig_Hunter_Break.selectBreak);
            return;
        }
        else if (!this.focus && (!hava || Game.PlayerCardSystem.getBreakPotatoSel().length == 0)) {
            this.focus = !this.focus;
            Game.PlayerCardSystem.setBreakPotatoSel(this.index);
            this.imageBingo.visible = this.focus;
        }
        else if (this.focus) {
            let findK = -1;
            for (let i = 0; i < Game.PlayerCardSystem.getBreakPotatoSel().length; i++) {
                if (this.index == Game.PlayerCardSystem.getBreakPotatoSel()[i]) {
                    findK = i;
                    break;
                }
            }
            if (findK != -1) {
                Game.PlayerCardSystem.getBreakPotatoSel().splice(findK, 1);
                this.imageBingo.visible = !this.focus;
            }
            else {
                this.imageBingo.visible = this.focus;
            }
            this.focus = !this.focus;
        }
        else if (!this.focus && hava) {
            this.focus = !this.focus;
            for (let i = 0; i < Game.PlayerCardSystem.getBreakPotatoSel().length; i++) {
                if (this.index == Game.PlayerCardSystem.getBreakPotatoSel()[i]) {
                    Game.PlayerCardSystem.getBreakPotatoSel().splice(i, 1);
                    this.imageBingo.visible = !this.focus;
                }
            }
        }

        this.father.setConsume();
    }
}
}