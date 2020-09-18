namespace zj {
// lizhengqiang
// 20190212
export class LeagueMatchSelectDefenceFormationItemIR extends eui.ItemRenderer {
    private btnClickA: eui.Button;
    private lstFormateA: eui.List;
    private lbName: eui.Label;
    private lbNumber: eui.BitmapLabel;

    private id: number;
    private info: { member_id: number, name: string, index: number, formations: message.SimpleFormationInfo, formationIndex: number, battleValue: number };
    private bLeft: boolean;
    private bTouch: boolean;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMatchSelectDefenceFormationItemSkin.exml";
        cachekeys(<string[]>UIResource["LeagueMatchSelectDefenceFormationItemIR"], null);

        this.btnClickA.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClickA, this);
    }

    protected dataChanged() {
        this.id = this.data.i;
        this.info = this.data.info;
        this.bLeft = this.data.bLeft;
        this.bTouch = this.data.bTouch;

        this.setInfoOther();
        this.setInfoList();

        this.btnClickA.currentState = "up";
        if (this.bLeft) {
            if (this.selected) {
                this.btnClickA.currentState = "down";
            }
        } else {
            if (this.bTouch && this.selected) {
                this.btnClickA.currentState = "down";
            }
        }
    }

    private setInfoOther() {
        if(this.info){
            if (this.info.member_id != 0) {
                this.lbName.text = Helper.StringFormat(TextsConfig.TextsConfig_Match.teamName, this.info.name, this.info.formationIndex);
            } else {
                this.lbName.text = TextsConfig.TextsConfig_Match.no;
            }

            if (!this.bLeft) {
                this.lbNumber.visible = true;
                this.lbNumber.text = this.id.toString();
            } else {
                this.lbNumber.visible = false;
            }
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
        let arrCollection = new eui.ArrayCollection();
        for (let v in formation) {
            arrCollection.addItem({ generalInfo: formation[v], bShowAdd: bShowAdd[v] });
        }
        this.lstFormateA.itemRenderer = LeagueMatchSelectDefenceFormationItemBIR;
        this.lstFormateA.dataProvider = arrCollection;
    }

    private onBtnClickA() {

    }
}
}