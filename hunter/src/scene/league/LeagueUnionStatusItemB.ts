namespace zj {
export class LeagueUnionStatusItemB extends eui.ItemRenderer {

	private lbPosition: eui.Label;
	private lstView: eui.List;
	private scrollerItem: eui.Scroller;
	private arrayCollection: eui.ArrayCollection;
	private groupItem: eui.Group;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionStatusItem1Skin.exml";
	}

	protected dataChanged() {
		let i = this.data.i;
		let info: {
			type: number,
			index: number,
			memberId: number,
			name: string,
			formationIndex: number,
			simpleFormation: message.SimpleFormationInfo,
			isBreak: boolean,
		}[] = this.data.info;
		let ht = this.data.height;
		this.scrollerItem.height = ht;
		this.groupItem.height = ht;
		this.skin.height = ht;
		let str = TextsConfig.TextsConfig_Match.flyName[i];
		this.lbPosition.textFlow = Util.RichText(str);
		this.lbPosition.y = ht / 2;
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < info.length; i++) {
			this.arrayCollection.addItem({
				i,
				info: info[i]
			});
		}
		this.lstView.dataProvider = this.arrayCollection;
		this.lstView.itemRenderer = LeagueUnionStatusItemBA;
	}
}
}