namespace zj {
//ActivityPotatoItem
//yuqingchao
//2019.04.02
export class ActivityPotatoItem extends eui.ItemRenderer {
	private lbName: eui.Label;				//碎片名字
	private imgCardBoard: eui.Image;
	private imgCard: eui.Image;				//碎片图
	private lbCardName: eui.Label;			//
	private lbNum: eui.Label;				//碎片序列号
	private groupStar: eui.Group;				//星级
	private imgCardType: eui.Image;			//类型
	private lbTips: eui.Label;				//需要收集的数量
	private lbAttriMain: eui.Label;			//主属性加成
	private lbAttriMainFull: eui.Label;
	private scrollerAttribute: eui.Scroller;
	private lstAttri: eui.List;
	private arrayCollection: eui.ArrayCollection;
	private info;
	private potatoList;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityPotatoItemSkin.exml";
		cachekeys(<string[]>UIResource["ActivityPotatoItem"], null);
	}
	protected dataChanged() {
		this.info = this.data.info;
		this.potatoList = Game.ConfigManager.getTable(StringConfig_Table.itemPotato + ".json");
		this.setInfoItem();
	}
	private setInfoItem() {
		let itemPiece = PlayerItemSystem.Set(this.info[0], 1, this.info[1]) as any;
		let str = itemPiece.Info.name + "x" + this.info[1];
		this.lbName.text = str;
		this.lbName.textColor = 0xFF2600;
		let potatoId = itemPiece.Info.compose_cards[1];
		let potatoTbl;
		for (let k in this.potatoList) {
			let v = this.potatoList[k];
			if (potatoId == Number(k))
				potatoTbl = v;
		}
		if (potatoTbl == null) return;
		let [, , outFrame] = PlayerCardSystem.GetItemFrame(potatoId);
		let collectNum = itemPiece.Info.compose_counts;
		this.imgCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[potatoTbl.type - 1], this);
		this.lbCardName.text = potatoTbl.name;
		this.lbNum.text = potatoTbl.num;
		this.imgCard.source = cachekey(potatoTbl.paths, this);
		this.imgCardBoard.source = cachekey(outFrame, this);
		this.lbTips.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter_Card.collect, collectNum);
		let baseStr = PlayerCardSystem.GetCardBaseAttri(potatoTbl.id, potatoTbl.star, 1);
		this.lbAttriMain.text = baseStr[0].toString()
		let [baseStrFull, baseStrFullNum] = PlayerCardSystem.GetCardBaseAttri(potatoTbl.id, CommonConfig.card_max_star, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1]);
		this.lbAttriMainFull.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Hunter.card_full_attr, CommonConfig.card_star_max_level[CommonConfig.card_star_max_level.length - 1], baseStrFullNum[0])
		Helper.NodeStarByAlignLeft(this.groupStar, potatoTbl.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
		let addStr = PlayerCardSystem.GetAddStrNotGet(potatoTbl);
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < addStr.length; i++) {
			// let data = new HunterCardAttriItemData();
			// data.index = i;
			// data.description = addStr[i];
			// data.cardInfo = potatoTbl;
			// data.width = this.scrollerAttribute.width;
			// data.fatherArray = addStr.length;

			// this.arrayCollection.addItem(data);
			this.arrayCollection.addItem({
				addStr: addStr[i],
			})

		}
		this.lstAttri.dataProvider = this.arrayCollection;
		this.lstAttri.itemRenderer = ActivityPotatoItemB;
	}
}
}