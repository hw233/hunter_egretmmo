namespace zj {
//DoubleColorPopItemSkin
//yuqingchao
export class DoubleColorPopItem extends eui.ItemRenderer {
	private imgicon: eui.Image;
	private lbNumID: eui.Label;
	private lbNum: eui.Label;
	private imgShadow: eui.Image;
	private groupAll: eui.Group;
	private btnDown: eui.Button;
	private id: number = 0;
	private color: any = null;
	public fruitId: number = 0;
	private count: number = 0;
	private father: DoubleColorPop;
	public constructor() {
		super()
		this.skinName = "resource/skins/fishing/DoubleColorPopItemSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorPopItem"], null);
		this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroupDown, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null)
		this.groupAll.scaleX = this.groupAll.scaleY = 0.8;
	}
	protected dataChanged() {
		this.id = this.data.id;
		this.fruitId = this.data.info.goodsId;
		this.count = this.data.info.count;
		this.color = this.data.color;
		this.father = this.data.father;

		this.lbNum.visible = false;
		this.imgShadow.visible = false;
		this.lbNumID.text = Game.PlayerDoubleBallSystem.fruitId(this.fruitId).toString();
		this.lbNum.text = this.count.toString();
		this.imgicon.source = cachekey(UIConfig.UIConfig_Hunter_DoubleColor.RedOrBlue2[this.color], this);
		this.btnDown.enabled = true;
	}

	public addNum() {
		this.imgShadow.visible = false;
		this.count = this.count + 1;
		this.lbNum.text = this.count.toString();
		this.btnDown.enabled = true;
	}

	public MinusNum() {
		this.imgShadow.visible = true;
		this.count = this.count - 1;
		this.lbNum.text = this.count.toString();
		this.btnDown.enabled = false;
	}

	private onGroupDown() {
		let find = Table.FindF(this.father._my_bet_blue_id, function (_k, _v) {
			return _v == 0;
		});
		if (this.color == 0 && this.father._my_bet_red_id == 0) {
			this.father.insertIntoMyBet(this.fruitId, this.color);
			this.father.SetBetAni();
		} else if (this.color == 1 && find) {
			this.father.insertIntoMyBet(this.fruitId, this.color);
		} else {
			toast_warning(TextsConfig.TextsConfig_Hunter_DoubleColor.pos_not_enough);
		}
	}

}
}