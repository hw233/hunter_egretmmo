namespace zj {
// 福利-天空竞技场
// lizhengqiang
// 20190323
export class ActivitySpecialSkyArena extends UI {
    private groupViewAward: eui.Group;
    private btnGo: eui.Button;

    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivitySpecialSkyArenaSkin.exml";
        this.btnGo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGo, this);
        this.groupViewAward.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupViewAward, this);
    }

    public init() {
        Game.DragonBonesManager.playAnimation(this, "ui_chakanjiangli", "armatureName", null, 0).then(display => {
            this.groupViewAward.addChild(display);
        }).catch(reason => {
            toast(reason);
        });

        Game.EventManager.event(GameEvent.ACTIVITY_SPECIAL_TYPE_UPDATE);
    }

    // 查看奖励
    private onGroupViewAward() {
        loadUI(SkeArenaDropInfoDialog)
            .then((dialog: SkeArenaDropInfoDialog) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnGo() {
        if (PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER, true)) {
            loadUI(SkyAreanMainScene)
                .then((scene: SkyAreanMainScene) => {
                    scene.show(UI.SHOW_FROM_TOP);
                    scene.Init();
                });
        }
    }
}
}