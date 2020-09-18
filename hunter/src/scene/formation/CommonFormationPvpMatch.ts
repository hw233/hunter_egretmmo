namespace zj {
// 防守阵容
// lizhengqiang
// 20190312
export class CommonFormationPvpMatch extends FormatChoose {

    private isAttack: boolean = false;
    private openIndex: number = 0;
    private currentFormationIndex: number = 1;
    private formations = {};
    private generals: Array<PosState> = [];
    private tmpFormation: { [id: number]: message.FormationInfo } = {};

    constructor() {
        super("resource/skins/formation/CommonFormationPvpMatchSkin.exml");
        this.skinName = "resource/skins/formation/CommonFormationPvpMatchSkin.exml";

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

        this["btnConfirmTeam"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirmTeam, this);

        this["btnTeam1"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam1, this);
        this["btnTeam2"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam2, this);
        this["btnTeam3"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam3, this);
        this["btnTeam4"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam4, this);
        this["btnTeam5"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam5, this);

        this["btnTeam11"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam11, this);
        this["btnTeam21"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam21, this);
        this["btnTeam31"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam31, this);
        this["btnTeam41"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam41, this);
        this["btnTeam51"].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTeam51, this);

        this.init1();
    }

    public onAddToStage() {
        super.onAddToStage();
    }

    public getSelectGenIds() {
        this.generals = [];
        for (let k in this.formations) {
            for (let v of this.formations[k]) {
                this.generals.push(v);
            }
        }
        this.loadList(this.currentFormationIndex);
        return this.generals;
    }

    public onBtnReturn() {
        loadUI(ConfirmCancelDialog)
            .then((dialog: ConfirmCancelDialog) => {
                dialog.show(UI.SHOW_FILL_OUT);
                dialog.setInfo(TextsConfig.TextsConfig_Pk.DoYouGoOut);
                dialog.setCB(this.cb);
            });
    }

    private cb = () => {
        setTimeout(() => {
            this.close(UI.HIDE_TO_TOP);
            Game.PlayerFormationSystem.formatsMatchDefine = this.tmpFormation;
        }, 300);
    };

    private init1() {
        if (this.up["TopLeft0"] != null) {
            this.up["TopLeft0"].visible = false;
        }
        if (this.up["combatNumber"] != null) {
            this.up["combatNumber"].visible = false;
        }
        if (this.up["TopRight1"] != null) {
            this.up["TopRight1"].visible = false;
        }
        if (this.up["TopLeft1"] != null) {
            this.up["TopLeft1"].visible = false;
        }
        if (this.up["restrict10"] != null) {
            this.up["restrict10"].visible = false;
        }
        if (this.up["restrict20"] != null) {
            this.up["restrict20"].visible = false;
        }
        if (this.up["restrict30"] != null) {
            this.up["restrict30"].visible = false;
        }
        if (this.up["censorshipRestrict"] != null) {
            this.up["censorshipRestrict"].visible = false;
        }

        // this["groupDown"].scaleX = 1.05;
        // this["groupDown"].scaleY = 0.85;

        this.LoadScene(39);

        this.tmpFormation = Table.DeepCopy(Game.PlayerFormationSystem.formatsMatchDefine);
        for (let i in this.tmpFormation) {
            let generals: Array<PosState> = [];
            for (let j in this.tmpFormation[i].generals) {
                generals.push(new PosState());
                generals[j].generalId = this.tmpFormation[i].generals[j];
            }

            for (let j in this.tmpFormation[i].supports) {
                generals.push(new PosState());
                generals[Number(j) + 4].generalId = this.tmpFormation[i].supports[j];
                if (generals[j].generalId != 0) generals[Number(j) + 4].state = 1;
            }
            this.formations[i] = generals;
        }

        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE;

        for (let i = 1; i <= 5; i++) {
            if (Game.PlayerFormationSystem.formatsMatchDefine[i] == null) {
                let formation = new message.FormationInfo();
                for (let j = 0; j < 4; j++) {
                    formation.generals.push(0);
                    formation.supports.push(0);
                }
                formation.formationType = message.EFormationType.FORMATION_TYPE_MATCH_DEFENSE;
                formation.formationIndex = i;
                Game.PlayerFormationSystem.formatsMatchDefine[i] = formation;
            } else {
                for (let j = 0; j < 4; j++) {
                    if (Game.PlayerFormationSystem.formatsMatchDefine[i].generals[j] == null) {
                        Game.PlayerFormationSystem.formatsMatchDefine[i].generals[j] = 0;
                    }

                    if (Game.PlayerFormationSystem.formatsMatchDefine[i].supports[j] == null) {
                        Game.PlayerFormationSystem.formatsMatchDefine[i].supports[j] = 0;
                    }
                }
            }
        }

        this.openIndex = this.initFormateOpen();
        this.setInfoUIFormateOpen();
    }

    public setState(isAttack: boolean = false) {
        this.isAttack = isAttack;
        Game.PlayerLeagueSystem.leagueMatchQueryFormation().then((formationIndex: Array<message.IIKVPairs>) => {
            this["lbError"].visible = true;
            for (let i = 1; i <= 5; i++) {
                let value = Table.FindR(formationIndex, function (k, v) {
                    return v.value == i;
                });

                if (value[0] != null) {
                    let str = TextsConfig.TextsConfig_Match.flyName[Math.floor(value[0].key / 100) - 1];
                    this["lbHunterNum" + i].textFlow = Util.RichText(str);
                } else {
                    this["lbHunterNum" + i].text = TextsConfig.TextsConfig_Match.notbSet;
                }

                this.loadList(i);
            }

            if (this.isAttack) {
                for (let v of formationIndex) {
                    this["imgLock" + v.value].visible = true;
                    // ???
                }
            }
        });
    }

    private onBtnConfirmTeam() {
        this.setFormat();
    }

    private setFormat() {
        Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill = this.openIndex;
        let formations: Array<message.FormationInfo> = [];
        for (let i in Game.PlayerFormationSystem.formatsMatchDefine) {
            formations.push(Game.PlayerFormationSystem.formatsMatchDefine[i]);
        }

        for (let i in formations) {
            for (let j in formations[i].generals) {
                if (!this.formations[Number(i) + 1]) break;
                formations[i].generals[j] = this.formations[Number(i) + 1][j].generalId;
                formations[i].supports[j] = this.formations[Number(i) + 1][Number(j) + 4].generalId;
            }
        }

        Game.PlayerLeagueSystem.setFormation(formations).then(() => {
            toast_success(TextsConfig.TextsConfig_Contend.formationSave);
            this.close();

            for (let k in formations) {
                Game.PlayerFormationSystem.formatsMatchDefine[Number(k) + 1] = formations[k];
            }
        });
    }

    private loadList(index: number) {
        if (!this["lstTeam" + index]) return;
        let arrCollection = new eui.ArrayCollection();
        for (let i = 0; i < 4; i++) {
            arrCollection.addItem({
                generalId: this.formations[index] != null ? this.formations[index][3 - i].generalId : this.up.generals[3 - i].generalId
            })
        }
        this["lstTeam" + index].itemRenderer = CommonTeamAddHunterItem;
        this["lstTeam" + index].dataProvider = arrCollection;
    }


    private onBtnTeam1() {
        this.setInfoButtonClick(1);
    }

    private onBtnTeam2() {
        this.setInfoButtonClick(2);
    }

    private onBtnTeam3() {
        this.setInfoButtonClick(3);
    }

    private onBtnTeam4() {
        this.setInfoButtonClick(4);
    }

    private onBtnTeam5() {
        this.setInfoButtonClick(5);
    }

    private setInfoButtonClick(index: number, isInit: boolean = false) {
        if (!isInit) {
            this.formations[this.currentFormationIndex] = this.up.generals;

            if (index != this.currentFormationIndex) {
                let a = 400;
                for (let i = 0; i < 4; i++) {
                    a -= 100;
                    this.up["group" + i].alpha = 0;
                    this.up["group" + i].scaleY = 1.1;
                    this.up["group" + i].scaleX = 1.1;
                    egret.Tween.get(this.up["group" + i]).wait(a).to({ alpha: 1 }, 10).to({ scaleX: 1, scaleY: 1 }, 200);
                }
            }
        }

        if (this.formations[index] != null) {
            this.up.generals = this.formations[index];
        } else {
            this.up.generals = [];
            for (let i = 0; i < 8; i++) {
                this.up.generals.push(new PosState());
            }
            this.formations[index] = this.up.generals;
        }

        this.up.drawUI();

        for (let i = 1; i <= 5; i++) {
            this["btnTeam" + i].currentState = "up";
            if (i == index) {
                this["btnTeam" + i].currentState = "down";
            }
        }

        this.currentFormationIndex = index;
    }

    private initFormateOpen(): number {
        let openIndex: number = 1;
        if (Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill == 0) {
            for (let k in Game.PlayerFormationSystem.formatsMatchDefine) {
                let hGeneral = Table.FindR(Game.PlayerFormationSystem.formatsMatchDefine[k].generals, function (k, v) {
                    return v != 0;
                });
                if (hGeneral[0]) {
                    openIndex = hGeneral[1];
                }
            }
        } else {
            openIndex = Game.PlayerFormationSystem.formatsMatchDefine[1].adviserSkill;
        }
        return openIndex;
    }

    private setInfoUIFormateOpen() {
        let openIndex = this.openIndex;
        for (let i = 1; i <= 5; i++) {
            if (this["groupTeam" + i + "1"]) {
                this["groupTeam" + i + "1"].visible = (i == openIndex + 1);
            }

            if (this["groupTeam" + i]) {
                this["groupTeam" + i].visible = (i <= openIndex);
            }
        }
        this.setInfoButtonClick(1, true);
    }

    private onBtnTeam11() {
        this.setInfoButtonClick1(1);
    }

    private onBtnTeam21() {
        this.setInfoButtonClick1(2);
    }

    private onBtnTeam31() {
        this.setInfoButtonClick1(3);
    }

    private onBtnTeam41() {
        this.setInfoButtonClick1(4);
    }

    private onBtnTeam51() {
        this.setInfoButtonClick1(5);
    }

    private setInfoButtonClick1(index: number) {
        if (this["groupTeam" + index + "1"]) {
            this["groupTeam" + index + "1"].visible = false;
        }

        if (this["groupTeam" + index]) {
            this["groupTeam" + index].visible = true;
        }

        if (this["groupTeam" + (index + 1) + "1"]) {
            this["groupTeam" + (index + 1) + "1"].visible = true;
        }

        this.openIndex = index;
        this["onBtnTeam" + this.openIndex]();
        this.setOpenAni(index);
    }

    private setOpenAni(index: number) {
        egret.Tween.get(this["groupTeam" + index]).to({ scaleX: 0 }).to({ scaleX: 1 }, 200);

        if (this["groupTeam" + (index + 1) + "1"]) {
            egret.Tween.get(this["groupTeam" + (index + 1) + "1"]).to({ scaleX: 0 }).to({ scaleX: 1 }, 250);
        }
    }
}
}