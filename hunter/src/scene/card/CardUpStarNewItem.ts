namespace zj {
/**
 * 升星界面卡片左侧Item
 * created by Lian Lei
 * 2018.12.05
 */
export class CardUpStarNewItem extends eui.ItemRenderer {
	private groupAll: eui.Group;
	private imgFrame: eui.Image;
	private imgCardType: eui.Image;
	private imgIcon: eui.Image;
	private imgBingo: eui.Image;
	private imgLock: eui.Image;
	private labelLevel: eui.BitmapLabel;
	private groupStar: eui.Group;
	private imgGrade: eui.Image;
	private labelCardName: eui.Label;
	private imgShadow: eui.Image;

	public type: number;
	public CurState = {
		/**升星卡片 */
		Base: 1,
		/**选中升星材料 */
		Select: 2,
		/**空项 */
		Empty: 3,
		/**非材料 */
		NoUse: 4,
		/**升星材料未选中 */
		NoSelect: 5,
		Lock: 6,
		BHost: 7,
		/**首次进入 */
		BFirst: 8
	};
	private cardInfo: message.PotatoInfo;

	private touchX: number = 0;
	private touchY: number = 0;
	private timeOut: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/card/CardUpStarNewItemSkin.exml";
		cachekeys(<string[]>UIResource["CardUpStarNewItem"], null);
		this.init();
	}

	private init() {
		this.type = this.CurState.Empty;
		// this.groupBingo.visible = false;
		this.imgShadow.visible = false;
		this.imgLock.visible = false;

		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchGroupAllBegin, this);
		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onBtnTouchGroupAllMove, this);
		this.groupAll.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnTouchGroupAllEnd, this);
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	/**外部手动调用刷新Item事件 */
	public onTap() {
		this.updateView(this.data);
	}

	private updateView(data: CardUpStarNewItemData) {
		this.cardInfo = data.cardInfo;
		closeCache(this.groupAll);
		this.initBase();
		this.setInfoType(data);
		this.setInfoItem(data);
		this.resume();
		setCache(this.groupAll);
	}

	// 刷新页面动画
	private resume() {
		this.groupAll.alpha = 0;
		let tw = egret.Tween.get(this.groupAll);
		tw.to({ scaleX: 0.7, scaleY: 0.7 }).to({ scaleX: 1, scaleY: 1 });
		tw.to({ alpha: 1 }, 100);
	}

	// 初始化信息
	private initBase() {
		this.groupStar.removeChildren();
		this.groupAll.visible = true;
		// this.groupBingo.visible = false;
		this.imgLock.visible = false;
		this.imgShadow.visible = false;
		this.imgBingo.visible = false;
		this.imgBingo.source = cachekey(UIConfig.UIConfig_Hunter.upStarColor[1], this);
		this.type = this.CurState.Empty;
	}

	// 判断当前选中卡片状态类型
	private setInfoType(data: CardUpStarNewItemData) {
		if (data.father.cardInfo == null) {
			if (data.cardInfo == null || ((data.cardInfo.id == 0 && data.cardInfo.index == 0))) {
				data.type = data.CurState.Empty;
			}
			else {
				data.type = data.CurState.NoSelect;
			}
		}
		else {
			let hostInfo = Game.PlayerCardSystem.getCardToHunterInfo(data.cardInfo.index);
			let cHostId = hostInfo.cHostId;

			let fatherHostInfo = Game.PlayerCardSystem.getCardToHunterInfo(data.father.cardInfo.index);
			let fatherCHostId = fatherHostInfo.cHostId;

			if (data.cardInfo == null) {
				data.type = data.CurState.Empty;
			}
			else if (data.father.cardInfo.index == data.cardInfo.index && fatherCHostId == cHostId && data.father.cardInfo.pos == data.cardInfo.pos) {
				data.type = data.CurState.Base;
			}
			else if (data.cardInfo.star == data.father.cardInfo.star) {
				if (cHostId != null && data.cardInfo.pos != 0) {
					data.type = data.CurState.BHost;
				}
				else if (data.cardInfo.is_lock) {
					data.type = data.CurState.Lock;
				}
				// else if (data.cardInfo.index == data.father.cardInfo.index) {
				// 	data.type = data.CurState.NoSelect;
				// }
				else {
					data.type = (data.isSelected) ? data.CurState.Select : data.CurState.NoSelect;
				}
			}
			else {
				data.type = data.CurState.NoUse;
			}
		}


	}

	// 设置卡片信息 
	private setInfoItem(data: CardUpStarNewItemData) {
		if (data.cardInfo == null || (data.cardInfo.id == 0 && data.cardInfo.index == 0)) {// 升星之后所用材料隐藏
			this.groupAll.visible = false;
			return;
		}

		let hostInfo = Game.PlayerCardSystem.getCardToHunterInfo(data.cardInfo.index);
		let cHostId = hostInfo.cHostId;

		let [potatoInfo, _] = Table.FindR(data.father.propTbl, (_k, _v) => {
			if (data.cardInfo) {
				return data.cardInfo.index == _v.index && data.cardInfo.pos == _v.pos;
			} else {
				return false;
			}
		});

		if (potatoInfo == null) {
			return;
		}

		let tbl = TableItemPotato.Item(potatoInfo.id);
		let framePic = PlayerCardSystem.GetItemFrame(potatoInfo.id)[0];
		this.imgCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
		this.imgIcon.source = cachekey(tbl.path, this);
		this.labelCardName.text = tbl.name;

		let addStr = PlayerCardSystem.GetAddStr(potatoInfo);
		if (addStr.length == 5) {
			Helper.SetStar(this.groupStar, potatoInfo.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 9);
		}
		else {
			Helper.SetStar(this.groupStar, potatoInfo.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 9);
		}

		this.imgGrade.visible = data.cardInfo.is_lock;
		this.imgFrame.source = cachekey(framePic, this);
		this.labelLevel.text = potatoInfo.level;

		if (data.type == data.CurState.Base || data.type == data.CurState.Select) {
			// this.groupBingo.visible = true;
			this.imgBingo.visible = true;
			this.imgShadow.visible = false;
			this.imgLock.visible = false;
			if (data.type == data.CurState.Base) {
				this.imgBingo.source = cachekey(UIConfig.UIConfig_Hunter.upStarColor[0], this);
			}
			else {
				this.imgBingo.source = cachekey(UIConfig.UIConfig_Hunter.upStarColor[1], this);
			}

		}
		else if (data.type == data.CurState.Empty || data.type == data.CurState.NoSelect) {
			this.imgLock.visible = false;
			// this.groupBingo.visible = false;
			this.imgBingo.visible = false;
			this.imgShadow.visible = false;
		}
		else if (data.type == data.CurState.NoUse) {
			this.imgLock.visible = false;
			// this.groupBingo.visible = true;
			this.imgBingo.visible = false;
			this.imgShadow.visible = true;
		}
		else if (data.type == data.CurState.Lock || data.type == data.CurState.BHost || data.type == data.CurState.BFirst) {
			this.imgLock.visible = true;
			// this.groupBingo.visible = true;
			this.imgBingo.visible = false;
			this.imgShadow.visible = true;
		}
	}

	//长按卡片显示卡片详细信息
	private onBtnTouchGroupAllBegin(e: egret.TouchEvent) {
		this.touchX = e.stageX;
		this.touchY = e.stageY;

		this.timeOut = egret.setTimeout(() => { TipManager.ShowCard(this.cardInfo); }, this, 1000);
	}

	private onBtnTouchGroupAllMove(e: egret.TouchEvent) {
		if (Math.abs(e.stageX - this.touchX) <= 3 && Math.abs(e.stageY - this.touchY) <= 3)
			return;

		egret.clearTimeout(this.timeOut);
	}

	private onBtnTouchGroupAllEnd(e: egret.TouchEvent) {
		egret.clearTimeout(this.timeOut);
	}

}

/**
 * 卡片升星数据
 * created by Lian Lei
 * 2018.12.08
 */
export class CardUpStarNewItemData {
	isSelected: boolean = false;
	index: number;
	cardInfo: message.PotatoInfo;
	father: CardUpStarNewDialog;
	CurState = {
		/**升星卡片 */
		Base: 1,
		/**选中升星材料 */
		Select: 2,
		/**空项 */
		Empty: 3,
		/**非材料 */
		NoUse: 4,
		/**升星材料未选中 */
		NoSelect: 5,
		Lock: 6,
		BHost: 7,
		/**首次进入 */
		BFirst: 8
	};
	type: number;
}
}