namespace zj {
/**
 * 升星界面右侧Item
 * created by Lian Lei
 * 2018.12.05
 */
export class CardUpStarNewItemB extends UI {
	private imgIconStar: eui.Image;
	private imgNode: eui.Image;
	private groupIcon: eui.Group;
	private imgFrame2: eui.Image;
	private imgCardType: eui.Image;
	private imgIcon: eui.Image;
	private labelLevel: eui.BitmapLabel;
	private groupStar: eui.Group;
	private imgGrade: eui.Image;
	private imgLock: eui.Image;

	public cardInfo;
	public index: number;
	private cardIndex: number;
	private id: number = null;
	private father;
	private cb: (index: number) => void;

	public constructor() {
		super();
		this.skinName = "resource/skins/card/CardUpStarNewItemBSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, ()=> {
			this.father = null;
		}, null);

		cachekeys(<string[]>UIResource["CardUpStarNewItemB"], null);

		this.groupIcon.visible = false;
		this.imgLock.visible = false;
		this.imgNode.visible = true;
		this.imgIconStar.visible = false;
	}

	setInfo(id: number, father: CardUpStarNewDialog, cb?: (index: number) => void) {
		this.father = father;
		this.cardInfo = this.father.cardInfo;
		if (this.cardInfo) {
			this.index = this.cardInfo.index;
		}
		this.groupIcon.visible = false;
		this.imgLock.visible = false;
		this.imgNode.visible = true;
		this.imgIconStar.visible = false;
		this.id = id;
		this.cb = cb;
	}

	// 点击调用 取消选择升星材料 回调函数
	private onTap() {
		if (this.index > 0 && this.cb != null) {
			this.cb(this.cardIndex);
		}
	}

	//刷新右侧卡片显示信息
	public setFresh(info: any) {
		// info = -1 显示锁
		if (info == -1) {
			this.cardInfo == null;
			this.groupIcon.visible = false;
			this.imgLock.visible = true;
			this.imgIconStar.visible = false;
			this.imgNode.visible = false;
		}
		// info = 0 显示星星
		else if (info == 0) {
			this.cardInfo = null;
			this.groupIcon.visible = false;
			this.imgLock.visible = false;
			this.imgIconStar.visible = true;
			if (this.father.cardInfo.star == null) {
				this.imgIconStar.visible = false;
			}
			else {
				this.imgIconStar.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_upstar_bottom[this.father.cardInfo.star - 1], this);
			}
			this.imgNode.visible = false;
		}
		// info = cardInex 显示卡片信息
		else if (info as message.PotatoInfo) {
			this.cardInfo = info;
			this.cardIndex = info.index;
			this.groupIcon.visible = true;
			this.imgLock.visible = false;
			this.imgIconStar.visible = false;
			this.imgNode.visible = false;

			let [potatoInfo, _] = Table.FindR(this.father.propTbl, (k, v) => {
				// return info.index == v.index && info.cHostId == v.cHostId && info.pos == v.pos;
				return info.index == v.index && info.pos == v.pos;
			});

			if (potatoInfo == null) {
				return;
			}

			let tbl = TableItemPotato.Item(potatoInfo.id);
			let framePic = PlayerCardSystem.GetItemFrame(potatoInfo.id)[0];

			this.imgCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
			this.imgIcon.source = cachekey(tbl.path, this);

			let addStr = PlayerCardSystem.GetAddStr(potatoInfo);
			if (addStr.length == 5) {
				Helper.SetStar(this.groupStar, potatoInfo.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.6, 7);
			}
			else {
				Helper.SetStar(this.groupStar, potatoInfo.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.6, 7);
			}
			this.imgGrade.visible = false;
			this.imgFrame2.source = cachekey(framePic, this);

			this.labelLevel.text = potatoInfo.level;
		}
	}
}

}