namespace zj {
// lizhengqiang

export class LeagueMatchSelectOpponent extends Dialog {
    private imgFlyTitle: eui.Image;
    private groupProgress: eui.Group;
    private lbName: eui.Label;
    private lb1: eui.Label;
    private lb2: eui.Label;
    private lb3: eui.Label;
    private lbLastTime: eui.Label;
    private lb4: eui.Label;
    private lstViewRight: eui.List;
    private btnClose: eui.Button;

    private type: number;
    private legueInfo: message.CraftLeagueInfo;
    private myScore: number;
    private enemyScore: number;
    private rightInfo: Array<{ member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number, star: number, attackInfo: [any, number] }> = [];

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMatchSelectOpponentSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }

    public setInfo(type: number, leagueInfo: message.CraftLeagueInfo, myScore: number, enemyScore: number) {
        this.type = type;
        this.legueInfo = leagueInfo;
        this.myScore = myScore;
        Gmgr.Instance.matchMyScore = myScore;
        this.enemyScore = enemyScore;

        this.setInfoTitle();
        this.getDoubleInfo();
    }

    private setInfoTitle() {
        this.imgFlyTitle.source = cachekey(UIConfig.UIConfig_Union.airShipTitle[this.type - 1], this);

        this.lbLastTime.text = Helper.StringFormat(TextsConfig.TextConfig_League.donateLast, CommonConfig.league_match_member_attack_times - Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime, CommonConfig.league_match_member_attack_times);

        this.lb1.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.winAndScore[0], CommonConfig.league_match_fortress_star_socre[this.type - 1][0]);
        this.lb2.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.winAndScore[1], CommonConfig.league_match_fortress_star_socre[this.type - 1][1]);
        this.lb3.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.winAndScore[2], CommonConfig.league_match_fortress_star_socre[this.type - 1][2]);

        this.lb4.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.otherScore, CommonConfig.league_match_fortress_extra_socre[this.type - 1]);
    }

    private getDoubleInfo() {
        Game.PlayerLeagueSystem.leagueMatchOpponentFortress(this.legueInfo.leagueId, this.type, false).then((resp: { matchInfo: message.LeagueMatchInfo, battleInfo: message.LeagueMatchBattleFortressInfo, selfInfo: message.LeagueMatchInfo, leagueBattles: Array<message.leagueBattleName> }) => {
            for (let i = 0; i < CommonConfig.league_match_fortress_team_num[this.type - 1]; i++) {
                if (this.rightInfo[i] == null) {
                    let info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number, star: number, attackInfo: [any, number] } = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0, star: null, attackInfo: [0, null] };
                    info.name = "";
                    info.member_id = 0;
                    info.formationIndex = 0;
                    info.index = this.type * 100 + (i + 1);

                    let starInfo = Table.FindR(resp.battleInfo.fortressStar, (k, v) => {
                        return v.key == info.index;
                    });
                    if (starInfo[1] == null) starInfo = null;

                    let attackInfo = Table.FindR(resp.leagueBattles, (k, v) => {
                        return v.index == info.index;
                    })
                    if (attackInfo[1] == null) attackInfo = null;

                    info.star = (starInfo == null ? 0 : starInfo[0]["value"]);
                    info.attackInfo = attackInfo;

                    this.rightInfo.push(info);
                }
            }

            for (let v of resp.matchInfo.leagueFortress) {
                let info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number, star: number, attackInfo: [any, number] } = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0, star: null, attackInfo: [0, null] };
                info.formations = v.simpleFormation;
                info.member_id = v.memberId;
                info.name = v.name;
                info.formationIndex = v.formationIndex;
                info.index = v.index;

                let starInfo = Table.FindR(resp.battleInfo.fortressStar, (k, v) => {
                    return v.key == info.index;
                });
                if (starInfo[1] == null) starInfo = null;

                let attackInfo = Table.FindR(resp.leagueBattles, (k, v) => {
                    return v.index == info.index;
                })
                if (attackInfo[1] == null) attackInfo = null;

                info.star = (starInfo == null ? 0 : starInfo[0]["value"]);
                info.attackInfo = attackInfo;

                let currentId = info.index % 10;
                if (currentId > CommonConfig.league_match_fortress_team_num[this.type - 1]) continue;
                this.rightInfo[currentId - 1] = info;
            }

            this.rightInfo.sort((a, b) => {
                return a.index - b.index;
            });

            this.setInfoList();
            this.setInfoTitle2();
        });
    }

    private setInfoList() {
        let arrCollection = new eui.ArrayCollection();
        for (let k in this.rightInfo) {
            arrCollection.addItem({ i: Number(k) + 1, info: this.rightInfo[k], myScore: this.myScore, leagueInfo: this.legueInfo, type: this.type });
        }
        this.lstViewRight.itemRenderer = LeagueMatchSelectOpponentItemIR;
        this.lstViewRight.dataProvider = arrCollection;
    }

    private setInfoTitle2() {
        let maxHp: number = PlayerLeagueSystem.GetMaxScore(this.type);
        let curHp: number = 0;
        let hurt: number = 0;

        let allBe3: boolean = true;
        for (let v of this.rightInfo) {
            if (v.star != 0) {
                hurt = hurt + CommonConfig.league_match_fortress_star_socre[this.type - 1][v.star - 1];
            } else {
                allBe3 = false;
            }
        }
        hurt = allBe3 ? maxHp : hurt;
        curHp = maxHp - hurt > 0 ? maxHp - hurt : 0;
        let percent = (curHp / maxHp) * 100;
        this.lbName.textColor = Helper.RGBToHex("r:255,g:255,b:255");
        this.lbName.text = curHp + "/" + maxHp;
        this.lbName.stroke = 2;
        this.lbName.strokeColor = Helper.RGBToHex("r:42,g:42,b:42");

        let progress: eui.Image = new eui.Image(UIConfig.UIConfig_League.leaguMatchProgress2);
        progress.percentWidth = percent;
        this.groupProgress.addChild(progress);
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}