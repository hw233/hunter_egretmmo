namespace zj {
// lizhengqiang
// 20190103
export class LeagueInstanceViewAwardItemIR extends eui.ItemRenderer {
    private imgName: eui.Image;
    private lstAward1: eui.List;
    private lstAward2: eui.List;
    private lstAward3: eui.List;
    private father: LeagueInstanceViewAward;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueInstanceViewAwardItemIRSkin.exml";
        cachekeys(<string[]>UIResource["LeagueInstanceViewAwardItemIR"], null);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            this.father = null;
        }, null);
    }

    protected dataChanged() {
        let instance: TableLeagueInstance = this.data.instance;
        this.imgName.source = cachekey(UIConfig.UIConfig_League.leagueInstanceName[instance.instance_id], this);
        this.setList(instance);

    }

    private setList(instance: TableLeagueInstance) {
        let bossGoods: Array<Array<number>> = instance.boss_goods;
        let bossCount: Array<Array<number>> = instance.boss_count;
        let father = this.data.father;
        if (bossGoods.length != 3 || bossGoods.length != 3) return;

        for (let i in bossGoods) {
            let arrCollection = new eui.ArrayCollection();
            for (let j in bossGoods[i]) {
                arrCollection.addItem({ i, j, "goodsId": bossGoods[i][j], "count": bossCount[i][j], father });
            }
            if (Number(i) == 0) {
                this.lstAward1.itemRenderer = LeagueInstanceViewAwardItemItemIR;
                this.lstAward1.dataProvider = arrCollection;
            } else if (Number(i) == 1) {

                this.lstAward2.itemRenderer = LeagueInstanceViewAwardItemItemIR;
                this.lstAward2.dataProvider = arrCollection;
            } else if (Number(i) == 2) {
                this.lstAward3.itemRenderer = LeagueInstanceViewAwardItemItemIR;
                this.lstAward3.dataProvider = arrCollection;
            }
        }
    }
}
}