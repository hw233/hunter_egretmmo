namespace zj {
// 公会界面
// lizhengqiang
// 2018/12/11
export class LeagueChooseScene extends Scene {
    private btnClose: eui.Button;
    private lbGemstone: eui.Label;
    private btnAddGemstone: eui.Label;
    private btnJoin: eui.Button;
    private btnBuild: eui.Button;
    private btnRankingList: eui.Button;

    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueChooseSceneSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnAddGemstone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        this.btnJoin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnJoin, this);
        this.btnBuild.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnBuild, this);
        this.btnRankingList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRankingList, this);

        Game.EventManager.on(GameEvent.LEAGUE_CHOOSE_CLOSE, this.onBtnClose, this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.init, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.LEAGUE_CHOOSE_CLOSE, this.onBtnClose, this);
            Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.init, this);
        }, null);
    }

    public init() {
        this.lbGemstone.text = PlayerItemSystem.Str_Resoure(message.EResourceType.RESOURCE_TOKEN);
    }

    // 购买代币
    private onBtnAddGemstone() {
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    // 加入公会
    private onBtnJoin() {
        loadUI(LeagueBeforeJoinNew)
            .then((dialog: LeagueBeforeJoinNew) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    // 创建公会
    private onBtnBuild() {
        loadUI(LeagueBuildUnion)
            .then((dialog: LeagueBuildUnion) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    // 公会排行榜
    private onBtnRankingList() {
        loadUI(LeagueRankingListNew)
            .then((dialog: LeagueRankingListNew) => {
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnClose(data: { type: number } = { type: 0 }) {
        if (data.type == 1) {
            this.close();
        } else {
            this.close(UI.HIDE_TO_TOP);
        }
    }
}

}