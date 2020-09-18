namespace zj {
//TavernMask
//hexiaowei
//2018/11/16
export class TavernMask extends UI {
    private groupMask: eui.Group;
    private tavern: TavernScene;

    public constructor() {
        super();
        this.skinName = "resource/skins/tavern/TavernMaskSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.groupMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupMask, this);
    }

    public init(tavern) {
        this.tavern = tavern;
    }

    public onGroupMask() {
        if (this.tavern.tavernDoorKeelAnimation.parent) {
            this.tavern.tavernDoorKeelAnimation.parent.removeChild(this.tavern.tavernDoorKeelAnimation);
        }
        this.tavern.animationType = true;
        console.log("jieshu");
    }

}

}