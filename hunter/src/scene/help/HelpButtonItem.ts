namespace zj {
/**
 * 帮助界面左边Item
 * created by Lian Lei
 * 2018.12.19
 */

export class HelpButtonItem extends eui.ItemRenderer {
    private groupBtnOne: eui.Group;
    private groupBtnTwo: eui.Group;
    private btnLevelOne: eui.Button;
    private labelLevelOne: eui.Label;
    private btnLevelTwo: eui.Button;
    private labelLevelTwo: eui.Label;
    private index: number;
    private info;
    // private father: HelpDialog;
    private curSmallType: number;
    private curBigType: number;

    public constructor() {
        super();
        this.skinName = "resource/skins/help/HelpButtonItemSkin.exml";
        this.groupBtnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLevelOne, this);
        this.groupBtnTwo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLevelTwo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			// this.father = null;
		}, null);
    }

    protected dataChanged() {
        this.setInfo(this.data);
    }

    private setInfo(data: HelpButttonItemData) {
        this.index = data.index;
        this.info = data.info;
        this.curSmallType = data.smallType;
        this.curBigType = data.bigType;
        data.father.groupAddHelpButtonItem.addChild(this);

        this.groupBtnOne.visible = (data.info.big_id != null);
        this.groupBtnTwo.visible = (data.info.small_id != null);
        this.labelLevelOne.visible = (data.info.big_id != null);
        this.labelLevelTwo.visible = (data.info.small_id != null);
        this.labelLevelOne.text = data.info.name;
        this.labelLevelTwo.text = data.info.help_id;
        this.groupBtnOne.touchEnabled = (data.info.big_id != null && data.info.big_id != this.curBigType);
        this.btnLevelOne.enabled = (data.info.big_id != null && data.info.big_id != this.curBigType);
        if (data.info.small_id != null && data.info.small_id == this.curSmallType) {
            data.father.selButtonItem(this);
        }
        this.refreshItemSel(this.data);
    }

    public getInfo() {
        return this.info;
    }

    private refreshItemSel(data: HelpButttonItemData) {
        this.groupBtnTwo.touchEnabled = (this.info.small_id != null && this.info.small_id != this.curSmallType);
        this.btnLevelTwo.enabled = (this.info.small_id != null && this.info.small_id != this.curSmallType);
    }

    public unSel(smallType) {
        this.curSmallType = smallType;
        this.refreshItemSel(this.data);
    }

    public sel() {
        this.curSmallType = this.info.small_id;
        this.refreshItemSel(this.data);
    }

    private onBtnLevelOne() {
        this.data.father.loadByBigType(this.info.big_id);
    }

    private onBtnLevelTwo() {
        this.data.father.selButtonItem(this);
    }


}

export class HelpButttonItemData {
    index;
    info;
    father;
    smallType;
    bigType;
}


}