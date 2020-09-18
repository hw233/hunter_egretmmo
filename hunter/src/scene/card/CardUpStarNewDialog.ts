namespace zj {
/**
 * 升星界面Dialog
 * created by Lian Lei
 * 2018.12.03
 */
export class CardUpStarNewDialog extends Dialog {
	private group: eui.Group;
	private groupAni: eui.Group;
	private groupAttInfo: eui.Group;
	private groupStar: eui.Group;
	private groupFrame: eui.Group;
	private img5: eui.Image;
	private groupHeroInfo: eui.Group;
	private imgFrame: eui.Image;
	private imgNode: eui.Image;
	private imgCardType: eui.Image;
	private imgHead: eui.Image;
	private labelLevel: eui.BitmapLabel;
	private groupAdd1: eui.Group;
	private groupAdd2: eui.Group;
	private groupAdd3: eui.Group;
	private groupAdd4: eui.Group;
	private groupAdd5: eui.Group;
	private groupCurrencyStar: eui.Group;
	private listHeroes: eui.List;
	private labelHunterTip: eui.Label;
	private groupYinCang: eui.Group;
	private btnCardSort: eui.Button;
	private btnClose: eui.Button;
	private btnAddStar: eui.Button;
	private labelUpStarNum: eui.Label;
	private imgEmpty: eui.Image;


	private labelGold: eui.Label;
	private btnAddGold: eui.Button;

	private upStar: boolean;
	private sx: number;
	private sy: number;
	public cardInfo: message.PotatoInfo;
	private initCardInfo: message.PotatoInfo;
	public propTbl: Array<any>;
	public metList: Array<CardUpStarNewItemB> = [];
	public metGeneralTbl: Array<number>;

	public listDataArr: eui.ArrayCollection = new eui.ArrayCollection();
	public cardUpStar: CardUpStar;

	private callBack: Function;

	public constructor() {
		super();
		this.skinName = "resource/skins/card/CardUpStarNewDialogSkin.exml";
		this.group.width = UIManager.StageWidth;
		this.group.height = UIManager.StageHeight;

		this.init();
	}
	public isFullScreen(){
		return true;
	}
	public setInfo(cardInfo: message.PotatoInfo, cb: Function) {
		this.cardInfo = cardInfo;
		this.initCardInfo = cardInfo;
		this.callBack = cb;

		this.refreshInfo();
		this.setInfoAni();
	}

	private init() {
		this.initCardInfo = null;
		this.upStar = false;
		this.imgEmpty.visible = false;
		this.sx = 0;
		this.sy = 0;
		this.groupYinCang.x = this.sx - 90;
		this.groupYinCang.y = this.sy;
		this.groupYinCang.alpha = 0;

		this.propTbl = [];
		this.metGeneralTbl = [0, 0, 0, 0, 0];

		this.initMeterialNode();
		this.btnCardSort.visible = false;
		this.groupYinCang.visible = false;
		this.groupStar.visible = true;
		this.listHeroes.itemRenderer = CardUpStarNewItem;
		this.refreshGold();

		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.imgHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
		this.imgFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
		this.imgCardType.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
		this.imgNode.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
		this.labelLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHero, this);
		this.listHeroes.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHeroesTap, this);
		this.btnAddStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStar, this);
		this.btnAddGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGold, this);
	}

	private initBaseCard() {
		this.cardInfo = null;

		this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
		this.labelUpStarNum.text = "0";
		this.imgCardType.visible = false;
		this.imgHead.visible = false;
		this.imgFrame.visible = false;
		this.labelLevel.text = "";
		this.groupCurrencyStar.removeChildren();
		this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.itemFrame[0], this);

		for (let i = 0; i < this.metList.length; i++) {
			let v = this.metList[i];
			v.setInfo(i, this);
		}

		this.loadLeftList();

	}

	private refreshGold() {
		if (Game.PlayerInfoSystem.Coin > 100000) {
			this.labelGold.text = (Game.PlayerInfoSystem.Coin / 10000).toFixed(1) + "万";
		} else {
			this.labelGold.text = Game.PlayerInfoSystem.Coin.toString();
		}
	}

	// 加载右侧升星材料
	private initMeterialNode() {
		let cardUpStarNewItemB1: CardUpStarNewItemB = new CardUpStarNewItemB();
		this.groupAdd1.addChild(cardUpStarNewItemB1);
		this.metList.push(cardUpStarNewItemB1);
		cardUpStarNewItemB1.setInfo(0, this, (index: number) => {
			this.onMaterialDeselected(index);
		});

		let cardUpStarNewItemB2: CardUpStarNewItemB = new CardUpStarNewItemB();
		this.groupAdd2.addChild(cardUpStarNewItemB2);
		this.metList.push(cardUpStarNewItemB2);
		cardUpStarNewItemB2.setInfo(1, this, (index: number) => {
			this.onMaterialDeselected(index);
		});;

		let cardUpStarNewItemB3: CardUpStarNewItemB = new CardUpStarNewItemB();
		this.groupAdd3.addChild(cardUpStarNewItemB3);
		this.metList.push(cardUpStarNewItemB3);
		cardUpStarNewItemB3.setInfo(2, this, (index: number) => {
			this.onMaterialDeselected(index);
		});

		let cardUpStarNewItemB4: CardUpStarNewItemB = new CardUpStarNewItemB();
		this.groupAdd4.addChild(cardUpStarNewItemB4);
		this.metList.push(cardUpStarNewItemB4);
		cardUpStarNewItemB4.setInfo(3, this, (index: number) => {
			this.onMaterialDeselected(index);
		});

		let cardUpStarNewItemB5: CardUpStarNewItemB = new CardUpStarNewItemB();
		this.groupAdd5.addChild(cardUpStarNewItemB5);
		this.metList.push(cardUpStarNewItemB5);
		cardUpStarNewItemB5.setInfo(4, this, (index: number) => {
			this.onMaterialDeselected(index);
		});
	}

	// 左侧list列表取消选中回调函数
	private onMaterialDeselected(index: number) {
		if (index <= 0 || index == null) {
			return;
		}

		let i = this.metGeneralTbl.indexOf(index);
		if (i >= 0) {
			// 刷新材料
			this.metGeneralTbl[i] = 0;
			this.metList[i].setFresh(this.metGeneralTbl[i]);

			// list 取消选中
			let itemIndex = -1;
			for (let i = 0; i < this.listDataArr.length; i++) {
				let v = this.listDataArr.getItemAt(i) as CardUpStarNewItemData;
				if (v.cardInfo.index == index) {
					itemIndex = i;
					break;
				}
			}

			if (itemIndex < 0) {
				return;
			}

			let itemData = this.listDataArr.getItemAt(itemIndex) as CardUpStarNewItemData;
			itemData.isSelected = false;
			this.listDataArr.replaceItemAt(itemData, itemIndex);
		}
	}

	// 右侧 0显示星星 -1显示锁 cardInfo显示卡片信息
	public setMaterialInfo(card_info?: message.PotatoInfo) {
		if (card_info == null || card_info == undefined) {
			let star = this.cardInfo.star;
			let pos = CommonConfig.card_up_star_consume_cards[star - 1];
			for (let [k, v] of HelpUtil.GetKV(this.metGeneralTbl)) {
				if (pos == CommonConfig.card_max_star) {
					this.metGeneralTbl[k] = -1;
				} else {
					if (k > pos - 1) {
						this.metGeneralTbl[k] = -1;
					} else {
						this.metGeneralTbl[k] = 0;
					}
				}
			}
			for (let i = 0; i < this.metList.length; i++) {
				let v = this.metList[i];
				v.setFresh(this.metGeneralTbl[i]);
			}

		} else {
			let findk = null;
			for (let i = 0; i < this.metGeneralTbl.length; i++) {
				let index = this.metGeneralTbl[i];
				if (index == card_info.index) {
					findk = i;
					break;
				}
			}
			if (findk == null) {
				let emptyk = null;
				for (let [k, v] of HelpUtil.GetKV(this.metGeneralTbl)) {
					if (v == 0) {
						emptyk = k;
						break;
					}
				}
				if (emptyk != null) {
					this.metGeneralTbl[emptyk] = card_info.index;
				}
				this.metList[emptyk].setInfo(emptyk, this, (index: number) => {
					this.onMaterialDeselected(card_info.index);
				});
				this.metList[emptyk].setFresh(card_info);

			} else {
				this.metGeneralTbl[findk] = 0;
				this.metList[findk].setFresh(0);
			}
		}
	}

	// 刷新列表
	public refreshInfo() {
		this.loadLeftList();

		this.setRightCardInfo();

		this.setMaterialInfo();

		this.setCardAttributeInfo();

		this.refreshGold();
	}

	private setInfoAni() {
		let bg = "ui_hunter_BackGroundCard_png";
		let bones = ["004_daoju01", "005tishi", "001_bg"];
		let paths = [this.groupHeroInfo, this.groupFrame, bg];

		for (let i = 1; i < CommonConfig.card_max_star; i++) {
			bones.push("002_diban1" + i);
			paths.push(this["groupAdd" + i]);
		}

		this.groupAni.removeChildren();
		Game.DragonBonesManager.playAnimation(this, "ui_zuheshengxing_eff", "armatureName", null, 0)
			.then(display => {
				display.x = 0;
				display.y = this.groupAni.height;
				display.scaleX = 0.85;
				display.height = this.groupAni.height;
				this.groupAni.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});

		let showChangeCard = Tips.GetSaveBoolForGeneralUpStar();
		this.groupFrame.visible = !showChangeCard;
	}

	private upStarAni() {
		let bg = "ui_hunter_BackGroundCard_png";
		let bones = ["004_daoju01", "005tishi", "bg"];
		let paths = [this.groupHeroInfo, this.groupFrame, bg];

		for (let i = 1; i < CommonConfig.card_max_star; i++) {
			bones.push("002_diban1" + i);
			paths.push(this["groupAdd" + i]);
		}

		Game.DragonBonesManager.playAnimation(this, "ui_zuheshengxing_eff", "armatureName", Number(this.initCardInfo.star - 1), 1)
			.then(display => {
				display.x = 0;
				display.y = this.groupAni.height;
				display.scaleX = 0.85;
				display.height = this.groupAni.height;
				this.groupAni.addChild(display);
				let timeOut = egret.setTimeout(() => { toast(TextsConfig.TextsConfig_Hunter_Card.upstar_success); }, this, 1500);
			})
			.catch(reason => {
				toast(reason);
			});

	}

	// 加载卡片列表
	private loadLeftList() {
		let showChangeCard = Tips.GetSaveBoolForGeneralUpStar();
		this.groupFrame.visible = !showChangeCard;
		// this.groupFrame.visible = true;
		this.img5.visible = false;

		if (this.initCardInfo) {
			this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarMet;
		}

		this.propTbl = PlayerCardSystem.GetAllCard(this.initCardInfo);
		let lcTbl: Array<any> = Table.DeepCopy(this.propTbl);
		let fix = PlayerItemSystem.FixCount(this.propTbl.length, 16, 4);
		for (let i = 0; i < fix; i++) {
			lcTbl.push(new message.PotatoInfo());
		}

		this.listDataArr.removeAll();

		let index = -1;
		for (let i = 0; i < lcTbl.length; i++) {
			let v = lcTbl[i];
			let itemData = new CardUpStarNewItemData();
			itemData.cardInfo = v;
			itemData.father = this;
			if (this.cardInfo != null && this.cardInfo.index != 0 && itemData.cardInfo.index == this.cardInfo.index) {
				itemData.isSelected = true;
				index = i;
			}
			else {
				itemData.isSelected = false;
			}
			this.listDataArr.addItem(itemData);
		}
		this.listHeroes.dataProvider = this.listDataArr;


		this.scrollList(index);
	}

	private scrollList(selectedIndex: number) {
		if (selectedIndex < 0) {
			return;
		}
		if (this.listHeroes.scrollV != 0) {
			return;
		}
		let realRow = selectedIndex / 3.8;
		if (realRow < 3.8) {
			return;
		}

		let item = new CardUpStarNewItem();

		if (realRow + 3.8 >= (this.listDataArr.length / 3.8)) {
			realRow = (this.listDataArr.length / 3.8) - 3.8;
		}
		else {
			realRow -= 2;
		}

		let scrolHeight = realRow * item.height;

		egret.Tween.get(this.listHeroes)
			.to({ scrollV: scrolHeight }, 350, egret.Ease.backIn);
	}

	// 升星信息
	private setCardAttributeInfo() {
		this.groupAttInfo.visible = true;
		loadUI(CardUpStar)
			.then((dialog: CardUpStar) => {
				this.cardUpStar = dialog;
				this.groupAttInfo.addChild(this.cardUpStar);
				this.cardUpStar.setInfo(this.cardInfo);
			});
	}

	// 右侧上方头像信息
	private setRightCardInfo() {
		this.imgCardType.visible = true;
		this.imgHead.visible = true;
		this.imgFrame.visible = true;

		let tbl = TableItemPotato.Item(this.cardInfo.id);
		let framePic = PlayerCardSystem.GetItemFrame(this.cardInfo.id)[0];

		this.imgCardType.source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_right[tbl.type - 1], this);
		this.imgHead.source = cachekey(tbl.path, this);
		this.imgFrame.source = cachekey(framePic, this);

		this.labelLevel.text = this.cardInfo.level.toString();
		this.groupCurrencyStar.removeChildren();

		let addStr = PlayerCardSystem.GetAddStr(this.cardInfo);
		if (addStr.length == 5) {
			Helper.SetStar(this.groupCurrencyStar, this.cardInfo.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 9);
		}
		else {
			Helper.SetStar(this.groupCurrencyStar, this.cardInfo.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 9);
		}

		let potatoInfo = TableItemPotato.Item(this.cardInfo.id);
		let cost = potatoInfo.up_money[this.cardInfo.star - 1] || 0;

		this.labelUpStarNum.text = ("" + cost) || "" + 0;
	}

	// 关闭升星界面
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
		this.callBack();
	}

	// 点击右侧上方卡片头像 
	private onBtnHero() {
		if (this.cardInfo) {
			Tips.SetSaveBoolForGeneralUpStar(true);
			this.groupFrame.visible = false;
			this.cardUpStar.groupYincang.visible = false;
			this.cardUpStar.groupStar.visible = false;
			this.cardUpStar.imgMax.visible = false;
			this.initBaseCard();
			this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
			this.cardUpStar.imgUpStarAtt.visible = true;
			this.imgEmpty.visible = true;
		}

	}

	// 左侧list列表点击
	private onListHeroesTap(e: eui.ItemTapEvent) {
		let item = this.listHeroes.getElementAt(e.itemIndex) as CardUpStarNewItem;
		let data = this.listDataArr.getItemAt(e.itemIndex) as CardUpStarNewItemData;

		if (this.cardInfo == null) {
			if (data.cardInfo == null) {
				return;
			}
			else {
				data.type = data.CurState.Base;
				this.cardInfo = Table.DeepCopy(data.cardInfo) as message.PotatoInfo;
				this.refreshInfo();

				this.cardUpStar.imgUpStarAtt.visible = false;
				this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarMet;
			}
		}
		else {
			if (data.cardInfo == null) {
				return;
			}
			else if (this.cardInfo != null && this.cardInfo.index == data.cardInfo.index && this.cardInfo.pos == data.cardInfo.pos) {
				this.initBaseCard();
				this.cardUpStar.groupYincang.visible = false;
				this.cardUpStar.groupStar.visible = false;
				this.cardUpStar.imgMax.visible = false;
				this.cardUpStar.imgUpStarAtt.visible = true;
				this.imgEmpty.visible = true;
				this.labelHunterTip.text = TextsConfig.TextsConfig_Hunter.chooseUpStarCard;
			}
			else if (data.type == data.CurState.BHost) {
				toast(TextsConfig.TextsConfig_Hunter.card_be_hosted);
				return;
			}
			else if (data.type == data.CurState.Lock) {
				toast(TextsConfig.TextsConfig_Hunter.card_be_locked);
				return;
			}
			else if (data.type == data.CurState.BFirst) {
				toast(TextsConfig.TextsConfig_Hunter.card_be_first);
				return;
			}
			else if (data.cardInfo.star == this.cardInfo.star) {
				let h_empty = Table.FindF(this.metGeneralTbl, (_k, _v) => {
					return _v == 0;
				});

				if ((!h_empty) && (!data.isSelected)) {
					toast(TextsConfig.TextsConfig_Hunter.card_upstar_num_max);
					return;
				}

				data.isSelected = !data.isSelected;

				if (data.isSelected == true) {
					data.type = data.CurState.Select;
					this.cardUpStar.groupYincang.visible = true;
					this.cardUpStar.groupStar.visible = true;

				}
				else {
					data.type = data.CurState.NoSelect;
				}
				this.listDataArr.replaceItemAt(data, e.itemIndex);
				this.setMaterialInfo(data.cardInfo);
			}
			else {
				return;
			}
		}
	}

	private onBtnAddStar() {
		this.addStarBefore();
	}

	private addStarBefore() {
		// let met_tbl = [];
		// for (let [k, v] of HelpUtil.GetKV(this.metGeneralTbl)) {
		// 	if (v != -1 && v != 0 && v != null) {
		// 		met_tbl.push(v);
		// 	}
		// }
		// if (this.cardInfo == null) {
		// 	toast(TextsConfig.TextsConfig_Hunter.chooseUpStarCard);
		// 	return;
		// }
		// else if (Table.VIn(this.metGeneralTbl, 0)) {
		// 	toast(TextsConfig.TextsConfig_Adviser.goods);
		// 	return;
		// }
		// else if (met_tbl.length == 0) {
		// 	toast("<color>r:255,g:0,b:0</color><text>该卡片已经强化到最高等级</text>");
		// 	return;
		// }
		this.reqAddStar();
	}

	// 升星发协议
	private reqAddStar() {
		let met_tbl = [];
		for (let [k, v] of HelpUtil.GetKV(this.metGeneralTbl)) {
			if (v != -1 && v != 0 && v != null) {
				met_tbl.push(v);
			}
		}

		Game.PlayerCardSystem.potatoAddStar(this.cardInfo, met_tbl)
			.then((value: { gameInfo }) => {
				this.upStar = true;

				let cardInfo = null;
				let general_cardInfo = null;

				if (value.gameInfo.potatos.length > 0) {
					cardInfo = Table.FindR(value.gameInfo.potatos, (_k, _v) => {
						return _v.index == this.cardInfo.index && _v.pos == this.cardInfo.pos;
					})[0];
				}

				if (value.gameInfo.generals.length > 0) {
					general_cardInfo = Table.FindR(value.gameInfo.generals[0].potatoInfo, (_k, _v) => {
						return _v.index == this.cardInfo.index && _v.pos == this.cardInfo.pos;
					})[0];
				}

				if (cardInfo != null) {
					this.cardInfo = Table.DeepCopy(cardInfo) as message.PotatoInfo;
				}
				else if (general_cardInfo != null) {
					this.cardInfo = general_cardInfo;
				}
				this.initCardInfo = Table.DeepCopy(this.cardInfo) as message.PotatoInfo;
				for (let [k, v] of HelpUtil.GetKV(met_tbl)) {
					if (v != -1 && v != 0 && v != null) {
						Game.PlayerCardSystem.deleteCardByIndex(v);
					}
				}

				this.refreshInfo();
				this.upStarAni();
				this.cardPosition(this.cardInfo.index);
				if (this.callBack) {// 回调函数调用父类刷新卡片方法
					this.callBack();
				}
			})
			.catch((reason) => {
					// toast(reason);
			})
	}

	private onBtnAddGold() {
		//toast("加金币功能未开启");
		loadUI(HelpGoldDialog)
			.then((dialog: HelpGoldDialog) => {
				dialog.SetInfoList();
				// dialog.setInfo(HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Money.moneys));
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	/**
	 * 升星之后卡片定位 
	 */
	private cardPosition(id: number) {// id:卡片唯一索引index
		let item = new CardUpStarNewItem();
		let gap = 6;

		let index = this.cardIndexFromId(id);
		let row = Math.floor(index / 4);
		let maxRow = Math.floor(this.listDataArr.length / 4);
		if (maxRow - row <= 4) {
			row = maxRow - 4;
		}

		let scrollerHeight = (item.height + gap) * row;
		egret.Tween.get(this.listHeroes)
			.to({ scrollV: scrollerHeight }, 350, egret.Ease.backIn);
	}

	private cardIndexFromId(cardIndex: number) {
		let index: number = -1;
		if (cardIndex == null || cardIndex == 0) {
			return index;
		}

		for (let i = 0; i < this.listDataArr.length; i++) {
			let data = this.listDataArr.getItemAt(i) as CardUpStarNewItemData;
			if (data.cardInfo.index == cardIndex) {
				index = i;
				break;
			}
		}
		return index;
	}
}

}