namespace zj {
// wang shen zhuo
// Activity_TimeRaseDaysItem
// 2019.05.10
export class ActivityTimeRaseDaysItem extends eui.ItemRenderer {

    public lbDays: eui.Label;
    public btnClick: eui.Button;
    public imgDays: eui.Image;
    public lbRaceNum: eui.Label;
    public imgClock: eui.Image;
    public imgTip: eui.Image;

    private Index: number;
    private father: ActivityTimeRaceMain;


    public constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivityTimeRaseDaysItemSkin.exml";
        cachekeys(<string[]>UIResource["ActivityTimeRaseDaysItem"], null);
    }

    protected dataChanged() {
        this.Index = this.data.index;
        this.father = this.data.father;
        this.SetInfoOthers();
    }

    private SetInfoOthers() {
        this.lbDays.text = Helper.StringFormat(TextsConfig.TextsConfig_Award.day, this.Index);
        this.SetInfoButtonAndLockState();
        this.SetInfoTipsAndKM();
    }

    private SetInfoButtonAndLockState() {
        if (this.father.awardTodayIndex == null) {
            return;
        }
        let daysPath = [
            "ui_acitivity_timerace_WordsDay%sDis_png",
            "ui_acitivity_timerace_WordsDay%sNor_png",
            "ui_acitivity_timerace_WordsDay%sSel_png",
        ]
        let path = null;
        if (this.Index < this.father.awardTodayIndex) {
            path = Helper.StringFormat(daysPath[0], this.Index);
            this.btnClick.enabled = false;
            this.imgClock.visible = false;
        } else {
            this.btnClick.touchEnabled = false;
            if (this.Index > this.father.awardTodayIndex) {
                path = Helper.StringFormat(daysPath[1], this.Index);
                this.imgClock.visible = true;
            } else {
                path = Helper.StringFormat(daysPath[2], this.Index);
                // this.btnClick.
                this.imgClock.visible = false;
            }
        }
        this.imgDays.source = cachekey(path , this) ;
    }

    private SetInfoTipsAndKM() {
        if (this.Index == this.father.awardTodayIndex) {
            let bTips = PlayerRaceSystem.GetTipsShow();
            this.imgTip.visible = bTips;
        }

        if (this.Index <= this.father.awardTodayIndex) {
            let strKM = Game.PlayerMissionSystem.missionActive.raceKM[this.Index - 1] || 0;
            this.lbRaceNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.completeKM, strKM);
            if (this.Index < this.father.awardTodayIndex) {
                this.lbRaceNum.textColor = Helper.RGBToHex("r:155,g:155,b:155");
                this.lbRaceNum.stroke = 2;
                this.lbRaceNum.strokeColor = Helper.RGBToHex("r:42,g:42,b:42");
            } else {
                this.lbRaceNum.stroke = 2;
                this.lbRaceNum.strokeColor = Helper.RGBToHex("r:1,g:120,b:150");
            }
        } else {
            let numKM = 0;
            for (const k in this.father.awardTbl.daily_missions[this.father.awardTodayIndex]) {
                const v = this.father.awardTbl.daily_missions[this.father.awardTodayIndex][k];
                let missionInfo = PlayerRaceSystem.MissionItem(v);
                numKM = numKM + Number(missionInfo.race_km);
            }
            this.lbRaceNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.estimateKM, numKM);
            this.lbRaceNum.textColor = Helper.RGBToHex("r:80,g:163,b:195");
            this.lbRaceNum.stroke = 2;
            this.lbRaceNum.strokeColor = Helper.RGBToHex("r:5,g:69,b:96");
        }
    }
}

export class ActivityTimeRaseDaysItemData {
    father: ActivityTimeRaceMain;
    index: number;
}
}