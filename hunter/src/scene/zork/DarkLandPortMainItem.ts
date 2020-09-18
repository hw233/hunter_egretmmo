namespace zj {
// wang shen zhuo
// DarkLandPortMainItem
// 20190411
export class DarkLandPortMainItem extends eui.ItemRenderer {

    public labelRank:eui.Label;
    public listReward:eui.List;

    private index: number ;
    private info ;
    private father : DarkLandPortMainSence;
    private TableViewItem: eui.ArrayCollection;

    public constructor() {
        super();
        this.skinName = "resource/skins/zork/DarkLandPortMainItemSkin.exml";
    }
    protected dataChanged() {
        this.index = this.data.index;
        this.info = this.data.info;
        this.father = this.data.father;
        this.SetInfoItem();
    }   

    private SetInfoItem() {
        if((this.info.rank_min + 1) == this.info.rank_max) {
            this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank1 , this.info.rank_max);
        }else{
            this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.rewardRank2 , (this.info.rank_min + 1) , this.info.rank_max);
        }

        this.SetInfoList();
    }

    private SetInfoList() {
        let award = [];
        for(let i = 0 ; i < this.info.rank_reward.length ; i ++) {
            let goods = new message.GoodsInfo();
            goods.goodsId = this.info.rank_reward[i][0];
            goods.count = this.info.rank_reward[i][1];
            award.push(goods);
        }

        this.listReward.itemRenderer = GiftCommonAwardItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < award.length; i++) {
            this.TableViewItem.addItem(award[i]);
        }
        this.listReward.dataProvider = this.TableViewItem;
    }
    
}

export class DarkLandPortMainItemData {
    father: DarkLandPortMainSence;
    info: any;
    index: number;
}
}