namespace zj {
// 公会战-布置防守
// lizhengqiang
// 20190212
export class LeagueMatchSelectDefenceFormation extends Dialog {
    private groupLeft: eui.Group;
    private lstViewLeft: eui.List;
    private groupRight: eui.Group;
    private imgFlyTitle: eui.Image;
    private groupProgress: eui.Group;
    private lbName: eui.Label;
    private lstViewRight: eui.List;
    private btnClose: eui.Button;
    private btnGraison: eui.Button;
    private btnDisarm: eui.Button;
    private btnOneKey: eui.Button;
    private btnDownGar: eui.Button;

    private type: number = 0;
    private leftInfo: Array<{ member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number }> = [];
    private rightInfo: Array<{ member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number }> = [];
    private leftMaxIndex: number = 0;

    private arrCollectionLeft: eui.ArrayCollection = new eui.ArrayCollection();
    private arrCollectionRight: eui.ArrayCollection = new eui.ArrayCollection();
    private leftIndex: number = -1;
    private rightIndex: number = -1;
    private leftSelected: boolean = false;
    private rightSelected: boolean = true;
    private colorGrayMatrix: number[] = [
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0.3, 0.6, 0, 0, 0,
        0, 0, 0, 1, 0
    ];
    private colorDefaultMatrix: number[] = [
        1, 0, 0, 0, 0,
        0, 1, 0, 0, 0,
        0, 0, 1, 0, 0,
        0, 0, 0, 1, 0
    ];
    private exchangeList: [number, number] = [0, 0];
    private selectLeftInfo: [number, Object] = [0, {}];
    private selectRightInfo: [number, Object] = [0, {}];

    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationSkin.exml";

        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
        this.btnGraison.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGraison, this);
        this.btnDisarm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDisarm, this);
        this.btnOneKey.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOneKey, this);
        this.btnDownGar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnDownGar, this);

        this.lstViewLeft.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstViewLeft, this);
        this.lstViewRight.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onLstViewRight, this);
    }

    public setInfo(type: number) {
        this.type = type;
        this.setInfoTitle();
        this.setProgress();

        Game.PlayerLeagueSystem.leagueMatchFortress(this.type, true).then((resp: { leagueFortress: message.LeagueMatchInfo, member_formations: message.SimpleMemberFormationZip }) => {
            this.leftMaxIndex = 1001;

            for (let v of resp.member_formations.formations) {
                for (let i = 1; i <= v.formation.length; i++) {
                    let info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number } = { member_id: 0, name: "", index: 0, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
                    info.member_id = v.baseInfo.id;
                    info.name = v.baseInfo.name;
                    info.index = this.leftMaxIndex;

                    // formation
                    info.formations = v.formation[i - 1];
                    info.formationIndex = v.formation[i - 1].adviserSkill;
                    info.battleValue = function (): number {
                        let battleValue: number = 0;
                        for (let v of info.formations.generals) {
                            battleValue = battleValue + v.battleValue;
                        }
                        return battleValue;
                    } ();

                    this.leftInfo.push(info);
                    this.leftMaxIndex = this.leftMaxIndex + 1;
                }
            }

            this.leftInfo.sort((a, b) => {
                return b.battleValue - a.battleValue;
            });

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
        this.lbName.stroke = 2;
        this.lbName.strokeColor = Helper.RGBToHex("r:42,g:42,b:42");
        this.lbName.text = maxHp + "/" + maxHp;

        let progress: eui.Image = new eui.Image(UIConfig.UIConfig_League.leaguMatchProgress2);
        this.groupProgress.addChild(progress);
    }

    private setInfoTitle() {
        let titlePicture: string = UIConfig.UIConfig_Union.airShipTitle[this.type - 1];
        this.imgFlyTitle.source = cachekey(titlePicture, this);
    }

    private setInfoList() {
        this.arrCollectionLeft = new eui.ArrayCollection();
        for (let k in this.leftInfo) {
            this.arrCollectionLeft.addItem({ i: Number(k) + 1, info: this.leftInfo[k], bLeft: true, bTouch: true });
        }
        this.lstViewLeft.itemRenderer = LeagueMatchSelectDefenceFormationItemIR;
        this.lstViewLeft.dataProvider = this.arrCollectionLeft;

        this.arrCollectionRight = new eui.ArrayCollection();
        let isFirstEmpty: boolean = false;
        for (let k in this.rightInfo) {
            this.arrCollectionRight.addItem({ i: Number(k) + 1, info: this.rightInfo[k], bLeft: false, bTouch: true });
            if (!isFirstEmpty && this.rightInfo[k].member_id == 0) {
                this.lstViewRight.selectedIndex = Number(k);
                this.rightIndex = Number(k);
                isFirstEmpty = true;
            }
        }
        this.lstViewRight.itemRenderer = LeagueMatchSelectDefenceFormationItemIR;
        this.lstViewRight.dataProvider = this.arrCollectionRight;
        if (!isFirstEmpty) {
            this.btnGraison.visible = false;
            this.btnDisarm.visible = true;
            this.lstViewRight.selectedIndex = 0;
            this.rightIndex = 0;
        } else {
            this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
            this.btnGraison.touchEnabled = false;
            this.btnGraison.visible = true;
            this.btnDisarm.visible = false;
        }
    }

    private onLstViewLeft() {
        if (this.leftIndex != this.lstViewLeft.selectedIndex) {
            if (this.leftIndex == -1) this.leftIndex = 0;
            this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
            this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.lstViewLeft.selectedIndex]);
            this.leftIndex = this.lstViewLeft.selectedIndex;
            this.leftSelected = true;
        } else {
            if (this.leftSelected) {
                this.lstViewLeft.selectedIndex = -1;
                this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
                this.lstViewLeft.selectedIndex = this.leftIndex;
                this.leftSelected = false;
            } else {
                this.arrCollectionLeft.itemUpdated(this.arrCollectionLeft.source[this.leftIndex]);
                this.leftSelected = true;
            }
        }

        if (this.leftSelected) {
            if (this.rightSelected) {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorDefaultMatrix)];
                this.btnGraison.visible = true;
                this.btnGraison.touchEnabled = true;
                this.btnDisarm.visible = false;
            } else {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                this.btnGraison.touchEnabled = false;
                this.btnGraison.visible = true;
                this.btnDisarm.visible = false;
            }
        } else {
            if (this.rightSelected) {
                if (this.lstViewRight.selectedItem.info.member_id == 0) {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                    this.btnGraison.touchEnabled = false;
                    this.btnGraison.visible = true;
                    this.btnDisarm.visible = false;
                } else {
                    this.btnGraison.visible = false;
                    this.btnDisarm.visible = true;
                }
            } else {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                this.btnGraison.touchEnabled = false;
                this.btnGraison.visible = true;
                this.btnDisarm.visible = false;
            }
        }
    }

    private onLstViewRight() {
        if (this.rightIndex != this.lstViewRight.selectedIndex) {
            if (this.rightIndex == -1) this.rightIndex = 0;
            this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
            this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.lstViewRight.selectedIndex]);
            this.rightIndex = this.lstViewRight.selectedIndex;
            this.rightSelected = true;
        } else {
            if (this.rightSelected) {
                this.lstViewRight.selectedIndex = -1;
                this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
                this.lstViewRight.selectedIndex = this.rightIndex;
                this.rightSelected = false;
            } else {
                this.arrCollectionRight.itemUpdated(this.arrCollectionRight.source[this.rightIndex]);
                this.rightSelected = true;
            }
        }

        if (this.rightSelected) {
            if (this.leftSelected) {
                this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorDefaultMatrix)];
                this.btnGraison.visible = true;
                this.btnGraison.touchEnabled = true;
                this.btnDisarm.visible = false;
            } else {
                if (this.lstViewRight.selectedItem.info.member_id == 0) {
                    this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
                    this.btnGraison.touchEnabled = false;
                    this.btnGraison.visible = true;
                    this.btnDisarm.visible = false;
                } else {
                    this.btnGraison.visible = false;
                    this.btnDisarm.visible = true;
                }
            }
        } else {
            this.btnGraison.filters = [new egret.ColorMatrixFilter(this.colorGrayMatrix)];
            this.btnGraison.touchEnabled = false;
            this.btnGraison.visible = true;
            this.btnDisarm.visible = false;
        }
    }

    private onBtnClose() {
        let type: number = this.type;
        let arrarMemberId: number[] = [];
        let arrayFormationIndex: number[] = [];
        let arrayIndex: number[] = [];
        for (let i = 0; i < CommonConfig.league_match_fortress_team_num[this.type - 1]; i++) {
            arrarMemberId.push(this.rightInfo[i].member_id);
            arrayFormationIndex.push(this.rightInfo[i].formationIndex);
            arrayIndex.push(this.rightInfo[i].index);
        }

        Game.PlayerLeagueSystem.leagueMatchSetFortress(type, arrarMemberId, arrayFormationIndex, arrayIndex).then(() => {
            toast(LANG(TextsConfig.TextsConfig_Contend.formationSave));
            Game.EventManager.event(GameEvent.LEAGUE_UNION_BATTLE_MAIN_UPDATE2);
        });
        this.close(UI.HIDE_TO_TOP);
    }

    private onBtnGraison() {
        // toast("驻防");
        this.rightInfo[this.rightIndex] = this.leftInfo[this.leftIndex];
        this.rightInfo[this.rightIndex].index = this.type * 100 + this.rightIndex + 1;
        this.leftInfo.splice(this.leftIndex, 1);
        this.leftInfo.sort((a, b) => {
            return b.battleValue - a.battleValue;
        });
        this.setInfoList();
    }

    private battleValue = (data): number => {
        let battleValue: number = 0;
        for (let v of data.formations.generals) {
            battleValue = battleValue + v.battleValue;
        }
        return battleValue;
    };

    private onBtnDisarm() {
        // toast("撤防");
        this.leftInfo.push(this.rightInfo[this.rightIndex]);
        this.leftInfo[this.leftInfo.length - 1].battleValue = this.battleValue(this.rightInfo[this.rightIndex]);
        this.rightInfo[this.rightIndex] = { member_id: 0, name: "", index: this.rightInfo[this.rightIndex].index, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
        this.leftInfo.sort((a, b) => {
            return b.battleValue - a.battleValue;
        });
        this.setInfoList();
    }

    private onBtnOneKey() {
        // toast("一键驻防");
        for (let k in this.rightInfo) {
            if (this.leftInfo.length == 0) break;
            if (this.rightInfo[k].member_id != 0) continue;
            this.rightInfo[k] = this.leftInfo[0];
            this.rightInfo[k].index = this.type * 100 + Number(k) + 1;
            this.leftInfo.splice(0, 1);
        }
        this.leftInfo.sort((a, b) => {
            return b.battleValue - a.battleValue;
        });
        this.setInfoList();
        toast(LANG(TextsConfig.TextsConfig_Match.oneKeySuccess));
    }

    private onBtnDownGar() {
        // toast("一键撤防");
        for (let k in this.rightInfo) {
            if (this.rightInfo[k].member_id == 0) continue;
            this.leftInfo.push(this.rightInfo[k]);
            this.leftInfo[this.leftInfo.length - 1].battleValue = this.battleValue(this.rightInfo[k]);
            this.rightInfo[k] = { member_id: 0, name: "", index: this.rightInfo[k].index, formations: new message.SimpleFormationInfo(), formationIndex: 0, battleValue: 0 };
        }
        this.leftInfo.sort((a, b) => {
            return b.battleValue - a.battleValue;
        });
        this.setInfoList();
        toast(LANG(TextsConfig.TextsConfig_Match.downGarSuccess));
    }
}
}