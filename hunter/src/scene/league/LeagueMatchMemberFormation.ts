namespace zj {
// 公会战-查看详情
// lizhengqiang
//  20190212
export class LeagueMatchMemberFormation extends Dialog {
    private imgFlyTitle: eui.Image;
    private groupProgress: eui.Group;
    private lbName: eui.Label;
    private lstView: eui.List;
    private btnClose: eui.Button;

    private type: number;
    private rightInfo: Array<{ member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number }> = [];

    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueMatchMemberFormationSkin.exml";
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
    }

    public setInfo(type: number) {
        this.type = type;
        this.setInfoTitle();
        this.setProgress();

        Game.PlayerLeagueSystem.leagueMatchFortress(this.type, false).then((resp: { leagueFortress: message.LeagueMatchInfo, member_formations: message.SimpleMemberFormationZip }) => {
            for (let i = 0; i < CommonConfig.league_match_fortress_team_num[this.type - 1]; i++) {
                if (this.rightInfo[i] == null) {
                    let info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number } = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                    info.name = "";
                    info.member_id = 0;
                    info.formationIndex = 0;
                    info.index = this.type * 100 + (i + 1);
                    this.rightInfo.push(info);
                }
            }

            for (let v of resp.leagueFortress.leagueFortress) {
                let info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number } = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                info.formations = v.simpleFormation;
                info.member_id = v.memberId;
                info.name = v.name;
                info.formationIndex = v.formationIndex;
                info.index = v.index;

                let currentId = info.index % 10;
                if (currentId > CommonConfig.league_match_fortress_team_num[this.type - 1]) continue;
                this.rightInfo[currentId - 1] = info;
            }

            this.rightInfo.sort((a, b) => {
                return a.index - b.index;
            });

            this.setInfoList();
        });
    }

    private setProgress() {
        let maxHp = PlayerLeagueSystem.GetMaxScore(this.type);
        this.lbName.textColor = Helper.RGBToHex("r:255,g:255,b:255");
        this.lbName.text = maxHp + "/" + maxHp;
        this.lbName.stroke = 2;
        this.lbName.strokeColor = Helper.RGBToHex("r:42,g:42,b:42");

        let progress: eui.Image = new eui.Image(UIConfig.UIConfig_League.leaguMatchProgress2);
        this.groupProgress.addChild(progress);
    }

    private setInfoTitle() {
        let titlePicture: string = UIConfig.UIConfig_Union.airShipTitle[this.type - 1];
        this.imgFlyTitle.source = cachekey(titlePicture, this);
    }

    private setInfoList() {
        let arrCollection = new eui.ArrayCollection();
        for (let k in this.rightInfo) {
            arrCollection.addItem({ i: Number(k) + 1, info: this.rightInfo[k], bLeft: false, bTouch: false });
        }
        this.lstView.itemRenderer = LeagueMatchSelectDefenceFormationItemIR;
        this.lstView.dataProvider = arrCollection;
    }

    private onBtnClose() {
        this.close(UI.HIDE_TO_TOP);
    }
}
}