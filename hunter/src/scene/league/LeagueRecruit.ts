namespace zj {
// 公会招募
// lizhengqiang
// 20190220
export class LeagueRecruit extends Dialog {
    private textContent: eui.TextInput;
    private btnCancel: eui.Button;
    private btnOK: eui.Button;
    private lbCost: eui.Label;
    private lbChangeTime: eui.Label;

    private timer: egret.Timer;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueRecruitSkin.exml";
        this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCancel, this);
        this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);

        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            if (this.timer) this.timer.stop();
        }, null);

        this.init();
    }

    private init() {
        this.textContent.skinName = "resource/skins/common/TextInputSkin.exml";
        this.textContent.textDisplay.textColor = 0xB19782;
        this.textContent.promptDisplay.textColor = 0xB19782;
        this.textContent.promptDisplay.size = 16;
        this.textContent.inputType = egret.TextFieldType.INPUT;
        this.textContent.prompt = TextsConfig.TextConfig_Input.commonLong;
        this.textContent.text = Helper.StringFormat(TextsConfig.TextConfig_League.recruit.defaultStr, Game.PlayerLeagueSystem.BaseInfo.name);
        if (Game.PlayerLeagueSystem.BaseInfo.recruitInfo != "") {
            this.textContent.text = Game.PlayerLeagueSystem.BaseInfo.recruitInfo;
        }

        this.lbCost.text = "x" + CommonConfig.league_recruit_contribute;
        this.updateInfo();
        this.timer = new egret.Timer(990, 0);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.updateInfo, this);
        this.timer.start();
        if (Game.PlayerLeagueSystem.BaseInfo.enliven_all - CommonConfig.league_recruit_contribute < 0) {
            this.lbCost.textColor = Helper.RGBToHex("r:255,g:38,b:0");
        }
    }

    private updateInfo() {
        let recruitTime: number = 300;

        let lastTime: number = Math.ceil(Game.PlayerLeagueSystem.recruitTime + recruitTime - Game.Controller.curServerTime);
        let canPublish: boolean = (Game.PlayerLeagueSystem.BaseInfo.enliven_all - CommonConfig.league_recruit_contribute >= 0) && (lastTime <= 0);
        this.btnOK.touchEnabled = canPublish;
        this.btnOK.currentState = (canPublish == true ? "up" : "disabled");
        this.lbChangeTime.visible = (lastTime > 0);
        this.lbChangeTime.text = Helper.StringFormat(TextsConfig.TextConfig_League.recruit.noTime, lastTime);
    }

    private onBtnOK() {
        if (this.textContent.text.length == 0) {
            toast_warning(LANG(TextsConfig.TextConfig_League.recruit.none));
            return;
        }

        Game.PlayerLeagueSystem.leagueRecruitInfo(this.textContent.text).then(() => {
            Game.PlayerLeagueSystem.recruitTime = Game.Controller.curServerTime;
            toast(LANG(TextsConfig.TextConfig_League.recruit.success));
        }).catch(reason => { });

        // 聊天
        Game.EventManager.event(GameEvent.GUILD_LOUNCH);

        this.close();
    }

    private onBtnCancel() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}