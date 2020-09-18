namespace zj {
/**
 * 帮助界面右边item
 * created by Lian Lei
 * 2018.12.19
 */
export class HelpDesItem extends eui.ItemRenderer {
    private groupAll: eui.Group;
    private groupLabTitle: eui.Group;
    private groupLabDes: eui.Group;
    private imageTitleFloor: eui.Image;
    private imageTitlePic: eui.Image;
    private labelTitle: eui.Label;
    private labelDes: eui.Label;
    private info;

    public constructor() {
        super();
        this.skinName = "resource/skins/help/HelpDesItemSkin.exml";
    }
    protected dataChanged() {
        this.setInfo(this.data);
    }

    private setInfo(data: HelpDesItemData) {
        // 显示右侧信息icon
        if (data.info.path) {
            this.imageTitlePic.source = cachekey(data.info.path, this);
        } else {
            this.imageTitlePic.source = null;
        }
        this.labelTitle.text = data.info.title;
        this.labelDes.text = data.info.des;
        
        // 设置标题文本背景宽度
        // if (this.labelTitle.width <= 50) {
        //     let labelTitleWidth: number = this.labelTitle.width;
        //     this.imageTitleFloor.width = labelTitleWidth * 3;
        // }
        // else if (this.labelTitle.width > 50 && this.labelTitle.width <= 70) {
        //     let labelTitleWidth: number = this.labelTitle.width;
        //     this.imageTitleFloor.width = labelTitleWidth * 2.5;
        // }
        // else {
        //     let labelTitleWidth: number = this.labelTitle.width;
        //     this.imageTitleFloor.width = labelTitleWidth * 2;
        // }

        // // 设置右侧详细信息内容文本高度变化
        // this.labelDes.height = this.labelDes.textHeight;
        // this.groupLabDes.height = this.labelDes.height + 25;
        // this.groupAll.height = this.groupLabDes.height + this.groupLabTitle.height + 25;
        // this.skin.height = this.groupLabDes.height + this.groupLabTitle.height + 25;
    }

}

export class HelpDesItemData {
    info;
}

}