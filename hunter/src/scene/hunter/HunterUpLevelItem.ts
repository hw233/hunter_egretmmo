namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-11-22
     * 
     * @class 猎人升级Item
     */
    export class HunterUpLevelItem extends eui.ItemRenderer {
        private spriteIcon: eui.Image;
        private spriteFrame: eui.Image;
        private btnAdd: eui.Button;
        public labelNum: eui.BitmapLabel;
        private labelName: eui.Label; /**物品名称 */
        private labelExp: eui.Label;
        private labelUsed: eui.Label;
        private spriteMake: eui.Image;
        protected touchBeginTime: number = 0;
        protected touchTimeInterval: number = 1000; // 长按间隔1秒
        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterUpLevelItemSkin.exml";
            cachekeys(<string[]>UIResource["HunterUpLevelItem"], null);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                this.touchBeginTime = egret.setTimeout(this.onLongPress, this, this.touchTimeInterval);
            }, this);

            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, () => {
                egret.clearTimeout(this.touchBeginTime);
                (this.data as HunterUpLevelItemData).father.visStart = false;
            }, this);

            this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                egret.clearTimeout(this.touchBeginTime);
                (this.data as HunterUpLevelItemData).father.visStart = false;
            }, this);
        }

        /** 长按延时响应的方法 */
        private onLongPress() {
            (this.data as HunterUpLevelItemData).father.visStart = true;
            (this.data as HunterUpLevelItemData).father.visOver = true;
            (this.data as HunterUpLevelItemData).father.popItem = this;
            (this.data as HunterUpLevelItemData).father.itemId = (this.data as HunterUpLevelItemData).index;
        }

        /** 修改数据源被动执行*/
        protected dataChanged() {
            this.updateView(this.data);
        }

        /**返回道具图片对象 */
        public getSpriteIcon() {
            return this.spriteIcon;
        }

        /**更新视图 */
        public updateView(data: HunterUpLevelItemData) {

            this.spriteIcon.source = cachekey(PlayerItemSystem.ItemPath(data.iconId), this);
            this.labelNum.text = "" + Game.PlayerItemSystem.itemCount(data.iconId);
            if (Game.PlayerItemSystem.itemCount(data.iconId) <= 0) {
                this.spriteMake.visible = true;
                this.btnAdd.visible = true;
            }
            let stringExperience = Helper.StringFormat("EXP+%d", TableItemProp.Item(data.iconId).general_exp);
            this.labelExp.text = stringExperience;
            this.labelName.text = PlayerItemSystem.ItemConfig(data.iconId)["name"];
            let itemSet = PlayerItemSystem.Set(data.iconId);

            this.spriteFrame.source = cachekey(itemSet.Frame, this);
        }

        public setInfoUsed(used) {
            let str_used: string;
            str_used = used > 0 ? "x" + used : "x" + "0";
            this.labelUsed.text = str_used;
        }
    }

    /**子项数据源 */
    export class HunterUpLevelItemData {
        /**父类list排名ID*/
        index: number;

        /**道具图片ID */
        iconId: number = null;

        /**父类  */
        father: HunterUpLevel;

        /**道具使用数量 */
        count: number;
    }
}