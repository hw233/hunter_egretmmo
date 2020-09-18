namespace zj {
/**
 * @author chen xi
 * 
 * @date 2018-12-3
 * 
 * @class 列表部分基类，封装了长按事件
 * 
 */
export abstract class HunterBaseItem extends eui.ItemRenderer {
    protected touchBeginTime: number = 0;
    protected touchTimeInterval: number = 1000; // 长按间隔1秒

    /** 是否处于长按状态中 */
    public isInLongPress: boolean = false;

    constructor() {
        super();

        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            this.isInLongPress = false;
            this.touchBeginTime = egret.setTimeout(this.onLongPress, this, this.touchTimeInterval, this.data);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, () => {
            egret.clearTimeout(this.touchBeginTime);
        }, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
            egret.clearTimeout(this.touchBeginTime);
        }, this);
    }

    protected abstract onLongPress(data: any);
}

/** 猎人列表数据基类 */
export class HunterBaseItemData {
    /** 武将id */
    generalId: number;

    /** 是否是选中状态 */
    isSelected: boolean = false;

    /** 是否相应长按手势 */
    isLongPress: boolean = true;

    father: HunterHeroSell;
}
}