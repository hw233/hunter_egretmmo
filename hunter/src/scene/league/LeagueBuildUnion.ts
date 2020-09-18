namespace zj {
// 公会-创建公会
// lizhengqiang
// 20181213

export class LeagueBuildUnion extends Dialog {
    private btnClose: eui.Button;
    private btnConfirm: eui.Button;
    private txtName: eui.TextInput;
    private lbProp: eui.Label;

    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueBuildUnionSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);

        this.init();
    }

    private init() {
        this.lbProp.text = CommonConfig.league_create_coins.toString();
        this.txtName.skinName = "resource/skins/common/TextInputSkin.exml";
        this.txtName.textDisplay.textColor = 0x411A03;
        this.txtName.promptDisplay.textColor = 0x411A03;
        this.txtName.promptDisplay.size = 16;
        this.txtName.inputType = egret.TextFieldType.INPUT;
        this.txtName.prompt = TextsConfig.TextConfig_Input.createLeagueName;
    }

    private onBtnConfirm() {
        let leagueName = this.txtName.text;
        if (leagueName == "") {
            toast_warning(LANG(TextsConfig.TextConfig_League.createNameNone));
            return;
        }
        Game.PlayerLeagueSystem.leagueCreate(leagueName).then(() => {
            loadUI(LeagueHomeScene)
                .then((scene: LeagueHomeScene) => {
                    this.onBtnClose();
                    Game.EventManager.event(GameEvent.LEAGUE_CHOOSE_CLOSE);

                    scene.init();
                    scene.show(UI.SHOW_FROM_TOP);
                });
        }).catch((result) => {
            if (result == message.EC.XG_LACK_TOKEN) {
                loadUI(ConfirmCancelDialog)
                    .then((dialog: ConfirmCancelDialog) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(TextsConfig.TextsConfig_Money.demstone);
                        dialog.setCB(this.addStone);
                    });
            } else if (result == message.EC.XG_LEAGUE_QUIT_TIME_TOO_SHORT) {
                if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime > 0) {
                    let strTime = Helper.FormatMsTime(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_JOIN_LEAGUE].leftTime)
                    let str = Helper.StringFormat(TextsConfig.TextConfig_League.build_league_next, strTime)
                    toast_warning(LANG(str));
                }
            } else {
                toast_warning(Game.ConfigManager.getAone2CodeReason(result));
            }
        });
    }

    private addStone = () => {
        loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}

}