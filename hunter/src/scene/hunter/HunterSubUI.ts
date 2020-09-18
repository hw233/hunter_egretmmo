namespace zj {

/**
 * @author chen xi
 * 
 * @date 2018-12-23
 * 
 * @class 猎人界面基类
 */
export abstract class HunterSubUI extends UI {
    public generalId: number = null;
    public groupMain: eui.Group;

    constructor() {
        super();
    }

    private _father: HunterMainScene = null;
    public set father(v: HunterMainScene) {
        this._father = v;
    }
    public get father(): HunterMainScene {
        return this._father
    }

    public setSelected(isSelected: boolean, generalId: number, animation = true) {
        this.generalId = generalId;
        if (isSelected) {
            this.enterAnimation(animation);
            Game.EventManager.event(HUNTER_REFRESH_TIP);
            this.reloadGeneral();
        } else {
            this.exitAnimation(animation);
        }
    }

    private enterAnimation(animation = true) {
        if (this.groupMain.visible == true) return;

        let width = UIManager.StageWidth;
        let destX = width * 0.5 * (1 - 0.15);
        if (animation) {
            egret.Tween.get(this.groupMain)
                .call(() => {
                    this.groupMain.visible = true;
                }, this)
                .to({ x: width }, 0)
                .to({ x: destX, alpha: 1 }, 100, egret.Ease.quartOut)
                .call(() => { 
                    Game.EventManager.event(GameEvent.SHOW_UI, { typeName: egret.getQualifiedClassName(this) });
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                });
            // .wait(50);
            // .to({ alpha: 1 }, 100);
        } else {
            this.groupMain.visible = true;
            this.groupMain.x = destX;
            this.groupMain.alpha = 1;
            Game.EventManager.event(GameEvent.SHOW_UI, {typeName: egret.getQualifiedClassName(this) });
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
        }

    }

    private exitAnimation(animation = true) {
        if (this.groupMain.visible == false) return;

        if (animation) {
            let width = UIManager.StageWidth;
            egret.Tween.get(this.groupMain)
                .to({ x: width }, 100, egret.Ease.quartIn)
                .to({ alpha: 0 }, 100)
                .call(() => {
                    this.groupMain.visible = false;
                    Game.EventManager.event(GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(this) });
                    Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
                }, this);
        } else {
            this.groupMain.x = UIManager.StageWidth;
            this.groupMain.alpha = 0;
            this.groupMain.visible = false;
            Game.EventManager.event(GameEvent.CLOSE_UI, { typeName: egret.getQualifiedClassName(this) });
            Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
        }
    }

    protected abstract reloadGeneral();
}

export const HUNTER_REFRESH_TIP = "hunter-refresh-tip";

// 子界面事件类型
export enum HunterSubUIEvent {
    Refresh = 0,      // 界面刷新
    GoAwaken = 1,     // 前往觉醒
    UnableAwaken = 2  // 无法觉醒
}

// 子界面类型
export enum HunterSubUIType {
    Detail = 0,
    Skill = 1,
    Card = 2,
    Awaken = 3,
    Collection = 4,
    Psychic = 5
}

}