namespace zj {
// lizhengqiang

const oppoState = {
    "bAttack": 4,   // 被攻击
    "cAttack": 1,   // 可攻击
    "nAttack": 2,   // 不可攻击
    "cCatch": 3,    // 可追击
}

export class LeagueMatchSelectOpponentItemIR extends eui.ItemRenderer {
    private btnClickB: eui.Button;
    private lstFormateB: eui.List;
    private imgNoPerson: eui.Image;
    private lbNumber: eui.BitmapLabel;
    private imgStar1: eui.Image;
    private imgStar2: eui.Image;
    private imgStar3: eui.Image;
    private lbName: eui.Label;
    private groupFull: eui.Group;
    private imgAttack: eui.Image;
    private imgCatch: eui.Image;
    private lbBAttack: eui.Label;


    private id: number;
    private info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number, star: number, attackInfo: [any, number] };
    private myScore: number;
    private curState: number;

    private index: number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMatchSelectOpponentItemSkin.exml";
        cachekeys(<string[]>UIResource["LeagueMatchSelectOpponentItemIR"], null);

        this.btnClickB.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickB, this);
    }

    protected dataChanged() {
        this.id = this.data.i;
        this.info = this.data.info;
        this.myScore = this.data.myScore;
        this.index = this.data.type;

        this.setInfoList();
        this.setInfoOther();
    }

    private setInfoOther() {
        let hGeneral = (Table.FindR(this.info.formations.generals, (k, v) => {
            return v.general_id != 0;
        })[1] != null);

        this.imgNoPerson.visible = !hGeneral;
        if (hGeneral) {
            this.lbName.text = this.info.name;
        } else {
            this.lbName.text = TextsConfig.TextsConfig_Match.no;
        }
        this.lbNumber.text = this.id.toString();

        let star = this.info.star;
        for (let i = 1; i <= 3; i++) {
            if (i <= star) {
                switch (i) {
                    case 1: this.imgStar1.source = cachekey(UIConfig.UIConfig_Union.star[0], this); break;
                    case 2: this.imgStar2.source = cachekey(UIConfig.UIConfig_Union.star[0], this); break;
                    case 3: this.imgStar3.source = cachekey(UIConfig.UIConfig_Union.star[0], this); break;
                }
            } else {
                switch (i) {
                    case 1: this.imgStar1.source = cachekey(UIConfig.UIConfig_Union.star[1], this); break;
                    case 2: this.imgStar2.source = cachekey(UIConfig.UIConfig_Union.star[1], this); break;
                    case 3: this.imgStar3.source = cachekey(UIConfig.UIConfig_Union.star[1], this); break;
                }
            }
        }

        this.groupFull.visible = (star == 3);

        if (this.info.attackInfo != null) {
            this.curState = oppoState.bAttack;
            this.imgAttack.visible = false;
            this.imgCatch.visible = false;
            this.lbBAttack.visible = true;
            this.lbBAttack.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.bAttackNoPk, this.info.attackInfo[0]["name"]);
        } else if (PlayerLeagueSystem.GetMaxScore() <= this.myScore && hGeneral) {
            this.curState = oppoState.cCatch;
            this.imgAttack.visible = false;
            this.imgCatch.visible = true;
            this.lbBAttack.visible = false;
        } else if (star != 3) {
            this.curState = oppoState.cAttack;
            this.imgAttack.visible = true;
            this.imgCatch.visible = false;
            this.lbBAttack.visible = false;
        } else {
            this.curState = oppoState.nAttack;
            this.imgAttack.visible = false;
            this.imgCatch.visible = false;
            this.lbBAttack.visible = false;
        }
    }

    private setInfoList() {
        let formation = {};
        for (let i = 1; i <= 4; i++) {
            if (this.info.formations.generals[i - 1] == null) {
                let generalInfo = new message.GeneralSimpleInfo();
                formation[i] = generalInfo;
            } else {
                formation[i] = this.info.formations.generals[i - 1];
            }
        }

        let bShowAdd = PlayerLeagueSystem.FormationShowAdd(formation);

        let isNoPerson: boolean = true;
        for (let k in formation) {
            if (formation[k].general_id != 0) {
                isNoPerson = false;
                break;
            }
        }

        this.imgNoPerson.visible = false;
        this.lstFormateB.visible = true;
        if (isNoPerson) {
            this.imgNoPerson.visible = true;
            this.lstFormateB.visible = false;
            return;
        }

        let arrCollection = new eui.ArrayCollection();
        for (let v in formation) {
            arrCollection.addItem({ generalInfo: formation[v], bShowAdd: bShowAdd[v] });
        }
        this.lstFormateB.itemRenderer = LeagueMatchSelectDefenceFormationItemBIR;
        this.lstFormateB.dataProvider = arrCollection;
    }

    private onBtnClickB() {
        let attackFunc = () => {
            // "HXH_CommonFormationPvpGoMatch"
            let leagueInfo: message.CraftLeagueInfo = this.data.leagueInfo;
            let formations: message.SimpleFormationInfo = this.info.formations;
            //加载阵型界面
            Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MATCH_ATTACK;
            loadUI(CommonFormatePveMain)
                .then((dialog: CommonFormatePveMain) => {
                    Game.EventManager.event(GameEvent.TEAM_FIGHT_ITEM, { leagueInfo: leagueInfo, infoIndex: this.info.index, formations: formations, infoName: this.info.name, infoData: this.info });
                    dialog.show(UI.SHOW_FROM_TOP);
                    dialog.setInfo(this.index);
                });
        };

        if (this.curState == oppoState.nAttack) {
            toast_warning(LANG(TextsConfig.TextsConfig_Match.pass));
        } else if (CommonConfig.league_match_member_attack_times == Game.PlayerLeagueSystem.Member.dailyMatchBattleWinTime) {
            toast_warning(LANG(TextsConfig.TextsConfig_GroupFight.timeNotEnough));
        } else if (this.curState == oppoState.cCatch) {
            // "HXH_MatchConfirmCancel"
        } else if (this.curState == oppoState.bAttack) {
            toast_warning(LANG(Helper.StringFormat(TextsConfig.TextsConfig_Match.bAttackNoPk, this.info.attackInfo[0]["name"])));
        } else if (this.curState == oppoState.cAttack) {
            attackFunc();
        }
    }
}
}