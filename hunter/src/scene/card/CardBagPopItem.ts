namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-29
 * 
 * @class  挑战掉落物品界面
 */
export class CardBagPopItem extends Dialog {
	private groupGetCard: eui.Group;
	private groupCard1: eui.Group;
	private groupCardAni1: eui.Group;
	private groupCardContent1: eui.Group;
	private imageFrame1: eui.Image;
	private labelCardId1: eui.Label;
	private labelCardName1: eui.Label;
	private imageIcon1: eui.Image;
	private imageCardType1: eui.Image;
	private labelCardInfo1: eui.Label;
	private labelConstRarity1: eui.Label;
	private imageGradeLevel1: eui.Image;
	private groupStar1: eui.Group;
	private labelLevel1: eui.BitmapLabel;
	private groupCardAniFront1: eui.Group;
	private groupItemContent1: eui.Group;
	private groupOrn1: eui.Group;
	private imgItemFrame1: eui.Image;
	private SpriteNode1: eui.Group;
	private imgItemIcon1: eui.Image;
	private labelItemNum1: eui.BitmapLabel;
	private labelItemName1: eui.Label;
	private NodeClip1: eui.Group;
	private imageBack1: eui.Image;
	private groupSell1: eui.Group;
	private btnSell1: eui.Button;
	private imgIcon1: eui.Image;
	private LabelSellNum1: eui.BitmapLabel;
	private imgSale1: eui.Image;
	private groupCard2: eui.Group;
	private groupCardAni2: eui.Group;
	private groupCardContent2: eui.Group;
	private imageFrame2: eui.Image;
	private labelCardInfo2: eui.Label;
	private imageIcon2: eui.Image;
	private labelLevel2: eui.BitmapLabel;
	private groupStar2: eui.Group;
	private imageCardType2: eui.Image;
	private labelCardName2: eui.Label;
	private labelCardId2: eui.Label;
	private imageGradeLevel2: eui.Image;
	private labelConstRarity2: eui.Label;
	private groupCardAniFront2: eui.Group;
	private groupItemContent2: eui.Group;
	private groupOrn2: eui.Group;
	private imgItemFrame2: eui.Image;
	private SpriteNode2: eui.Group;
	private imgItemIcon2: eui.Image;
	private labelItemNum2: eui.BitmapLabel;
	private labelItemName2: eui.Label;
	private NodeClip2: eui.Group;
	private imageBack2: eui.Image;
	private groupSell2: eui.Group;
	private btnSell2: eui.Button;
	private imgIcon2: eui.Image;
	private LabelSellNum2: eui.BitmapLabel;
	private imgSale2: eui.Image;
	private groupCard3: eui.Group;
	private groupCardAni3: eui.Group;
	private groupCardContent3: eui.Group;
	private imageFrame3: eui.Image;
	private labelCardInfo3: eui.Label;
	private imageIcon3: eui.Image;
	private labelLevel3: eui.BitmapLabel;
	private groupStar3: eui.Group;
	private imageCardType3: eui.Image;
	private labelCardName3: eui.Label;
	private labelCardId3: eui.Label;
	private imageGradeLevel3: eui.Image;
	private labelConstRarity3: eui.Label;
	private groupCardAniFront3: eui.Group;
	private groupSell3: eui.Group;
	private btnSell3: eui.Button;
	private imgIcon3: eui.Image;
	private LabelSellNum3: eui.BitmapLabel;
	private imgSale3: eui.Image;
	private groupItemContent3: eui.Group;
	private groupOrn3: eui.Group;
	private imgItemFrame3: eui.Image;
	private SpriteNode3: eui.Group;
	private imgItemIcon3: eui.Image;
	private labelItemNum3: eui.BitmapLabel;
	private labelItemName3: eui.Label;
	private NodeClip3: eui.Group;
	private imageBack3: eui.Image;
	private btnGetCard: eui.Button;
	private groupExtra: eui.Group;
	private listBossAward: eui.List;
	private imgItemFrame11: eui.Image;
	private imgItemFrame22: eui.Image;
	private imgItemFrame33: eui.Image;
	private groupCard11: eui.Group;
	private groupCard22: eui.Group;
	private groupCard33: eui.Group;


	private groupCardArr: Array<eui.Group> = [];
	private groupCardAniArr: Array<eui.Group> = [];
	private groupCardContentArr: Array<eui.Group> = [];
	private groupCardAniFrontArr: Array<eui.Group> = [];
	private groupCardAniBackArr: Array<eui.Group> = [];
	private groupStarArr: Array<eui.Group> = [];

	private labelCardIdArr: Array<eui.Label> = [];
	private labelCardNameArr: Array<eui.Label> = [];
	private labelLevelArr: Array<eui.BitmapLabel> = [];
	private labelCardInfoArr: Array<eui.Label> = [];

	private imageIconArr: Array<eui.Image> = [];
	private imageCardTypeArr: Array<eui.Image> = [];
	private imageFrameArr: Array<eui.Image> = [];
	private imageGradeLevelArr: Array<eui.Image> = [];
	private imageBackArr: Array<eui.Image> = [];

	private groupCardCenterX: number;
	private potatos;
	private cardstbl: Array<message.PotatoInfo> = [];
	private turnNode = [];
	private father: CardBag;
	private cardInfo: Array<message.GoodsInfo>;
	private currindex: number;
	private scene = StageSceneManager.Instance.GetCurScene();
	private CB: Function;
	private commonDesSkill;
	public constructor() {
		super();
		this.skinName = "resource/skins/card/CardBagPopItemSkin.exml";
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);
		cachekeys(<string[]>UIResource["CardBagPopItem"], null);

		this.init();
	}

	private init() {
		this.labelConstRarity1.text = LANG("稀有度：");
		this.labelConstRarity2.text = LANG("稀有度：");
		this.labelConstRarity3.text = LANG("稀有度：");

		this.btnGetCard.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGetCard, this);
		// this.groupItemContent1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard1, this);
		// this.groupItemContent2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard2, this);
		// this.groupItemContent3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchGroupCard3, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);

		this.btnSell1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell1, this);
		this.btnSell2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell2, this);
		this.btnSell3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSell3, this);

		this.groupCardArr = [
			this.groupCard1,
			this.groupCard2,
			this.groupCard3
		];
		this.groupCardAniArr = [
			this.groupCardAni1,
			this.groupCardAni2,
			this.groupCardAni3
		];
		this.groupCardContentArr = [
			this.groupCardContent1,
			this.groupCardContent2,
			this.groupCardContent3
		];
		this.groupCardAniFrontArr = [
			this.groupCardAniFront1,
			this.groupCardAniFront2,
			this.groupCardAniFront3
		];
		this.groupStarArr = [
			this.groupStar1,
			this.groupStar2,
			this.groupStar3,
		];

		this.labelCardIdArr = [
			this.labelCardId1,
			this.labelCardId2,
			this.labelCardId3
		];
		this.labelCardNameArr = [
			this.labelCardName1,
			this.labelCardName2,
			this.labelCardName3
		];
		this.labelLevelArr = [
			this.labelLevel1,
			this.labelLevel2,
			this.labelLevel3
		];
		this.labelCardInfoArr = [
			this.labelCardInfo1,
			this.labelCardInfo2,
			this.labelCardInfo3
		];

		this.imageIconArr = [
			this.imageIcon1,
			this.imageIcon2,
			this.imageIcon3
		];
		this.imageCardTypeArr = [
			this.imageCardType1,
			this.imageCardType2,
			this.imageCardType3
		];
		this.imageFrameArr = [
			this.imageFrame1,
			this.imageFrame2,
			this.imageFrame3
		];
		this.imageGradeLevelArr = [
			this.imageGradeLevel1,
			this.imageGradeLevel2,
			this.imageGradeLevel3
		];
		this.imageBackArr = [
			this.imageBack1,
			this.imageBack2,
			this.imageBack3
		];

		this.groupCard1.touchEnabled = false;
		this.groupCard2.touchEnabled = false;
		this.groupCard3.touchEnabled = false;

		this.groupGetCard.alpha = 1;
		this.groupGetCard.scaleX = 0;
		this.groupGetCard.scaleY = 0;

		this.groupCardCenterX = this.groupCard2.x;

		this.groupSell1.visible = false;
		this.groupSell2.visible = false;
		this.groupSell3.visible = false;
		this.groupSell1.alpha = 0;
		this.groupSell2.alpha = 0;
		this.groupSell3.alpha = 0;
		this.btnSell1.touchEnabled = false;
		this.btnSell2.touchEnabled = false;
		this.btnSell3.touchEnabled = false;
		this.groupCardContent1.visible = false;
		this.groupCardContent2.visible = false;
		this.groupCardContent1.visible = false;
		this.imgSale1.visible = false;
		this.imgSale2.visible = false;
		this.imgSale3.visible = false;
		this.groupExtra.visible = false;
		this.imgItemIcon1.mask = this.imgItemFrame11;
		this.imgItemIcon2.mask = this.imgItemFrame22;
		this.imgItemIcon3.mask = this.imgItemFrame33;
		this.btnGetCard.alpha = 0;
		this.btnGetCard.touchEnabled = false;
	}

	private setCardInfo(info: Array<message.GoodsInfo>) {
		this.cardInfo = info;
		let goodsNum = info.length;
		if (goodsNum > 3) {
			goodsNum = 3;
		}
		for (let i = 1; i <= goodsNum; i++) {
			let goodsnum: message.GoodsInfo = info[i - 1];
			let goodsType = PlayerItemSystem.ItemType(goodsnum.goodsId);
			if (goodsType == message.EGoodsType.GOODS_TYPE_POTATO) {
				let [v, k] = Table.FindR(this.potatos, (k, v) => {
					if (v.id == goodsnum.goodsId) {
						return true;
					}
				})
				if (v != null) {
					let curCard = v;
					this.cardstbl[i] = v;
					let curTbl = TableItemPotato.Item(curCard.id);
					let [_, bigFramePic] = PlayerCardSystem.GetItemFrame(curCard.id);
					this["labelCardId" + i].text = curTbl.num;
					this["labelCardName" + i].text = curTbl.name;
					this["labelLevel" + i].text = curTbl.level.toString();
					this["imageIcon" + i].source = cachekey(curTbl.paths, this);
					this["imageCardType" + i].source = cachekey(UIConfig.UIConfig_Hunter_Card.card_type_small[curTbl.type - 1], this);
					this["labelCardInfo" + i].text = curTbl.des;
					this["imageFrame" + i].source = cachekey(bigFramePic, this);
					this["imageGradeLevel" + i].source = cachekey(UIConfig.UIConfig_Hunter_Card.card_difficulty[curTbl.rarity - 1], this);
					if (curCard.add_attri.length + 1 == 5 && curCard.star < 6) {
						Helper.NodeStarByAlignLeft(this["groupStar" + i], curCard.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
					} else if (curCard.add_attri.length == 5 && curCard.star >= 6) {
						Helper.NodeStarByAlignLeft(this["groupStar" + i], curCard.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star_next);
					} else {
						Helper.NodeStarByAlignLeft(this["groupStar" + i], curCard.star, CommonConfig.card_max_star, 1, false, UIConfig.UIConfig_Hunter_Card.card_star);
					}
					this.turnNode[i - 1] = this["groupCardContent" + i];
					this["groupSell" + i].visible = true;
					egret.Tween.get(this["groupSell" + i]).wait(1000).to({ alpha: 1 }, 1000).call(() => {
						this.btnSell1.touchEnabled = true;
						this.btnSell2.touchEnabled = true;
						this.btnSell3.touchEnabled = true;
					});
					this["groupItemContent" + i].visible = false;
					this["imageBack" + i].source = cachekey(UIConfig.UIConfig_Potato.outside_frame.card, this);
					this["LabelSellNum" + i].text = curTbl.price.toString();
				} else {
					let itemSet = PlayerItemSystem.Set(goodsnum.goodsId, null, goodsnum.count) as any;
					this["imgItemFrame" + i].source = cachekey(itemSet.Frame, this);
					this["imgItemFrame" + i + "" + i].source = cachekey(itemSet.Frame, this);
					this["imgItemIcon" + i].source = cachekey(itemSet.Clip, this);
					this["labelItemNum" + i].text = goodsnum.count.toString();
					this["labelItemName" + i].text = itemSet.Info.name;
					this.turnNode[i - 1] = this["groupItemContent" + i];
					this["groupCardContent" + i].visible = false;
					this["imageBack" + i].source = cachekey(UIConfig.UIConfig_Potato.outside_frame.item, this);
					this["imgSale" + i].visible = false;
					this["btnSell" + i].visible = false;
					this["LabelSellNum" + 1].visible = false;
					this["imgIcon" + i].visible = false;
					toast_warning(TextsConfig.TextsConfig_Hunter.card_is_full);
				}
			} else {
				let itemSet = PlayerItemSystem.Set(goodsnum.goodsId, null, goodsnum.count) as any;
				this["imgItemFrame" + i].source = cachekey(itemSet.Frame, this);
				this["imgItemFrame" + i + "" + i].source = cachekey(itemSet.Frame, this);
				this["imgItemIcon" + i].source = cachekey(itemSet.Clip, this);
				this["labelItemNum" + i].text = goodsnum.count.toString();
				this["labelItemName" + i].text = itemSet.Info.name;

				this["imgSale" + i].visible = false;
				this["btnSell" + i].visible = false;
				this["LabelSellNum" + i].visible = false;
				this["imgIcon" + i].visible = false;

				this.turnNode[i - 1] = this["groupItemContent" + i];
				this["groupCardContent" + i].visible = false;
				this["imageBack" + i].source = cachekey(UIConfig.UIConfig_Potato.outside_frame.item, this);
			}
		}
		if (goodsNum == 2) {
			this.groupCard1.left = 150;
			this.groupCard2.right = 150
			this.groupCard3.visible = false;
		} else if (goodsNum == 1) {
			this.groupCard1.left = 350;
			this.groupCard2.visible = false;
			this.groupCard3.visible = false;
		}

		for (let i = 0; i < this.turnNode.length; i++) {
			this.turnNode[i].visible = true;
		}

	}

	public playAni(transp, info: Array<message.GoodsInfo>, extraInfo, father, cb, potatos) {
		this.father = father;
		this.potatos = potatos;
		this.setCardInfo(info);
		this.CB = cb;
		let aniNameArr = [
			"kapai_baise",
			"kapai_zise",
			"kapai_chengse",
			"kapai_hongse"
		];

		let cardMoveBy = (index, node, posX) => {
			let aniName = "kapai_baise";;

			// let curCard = cardInfo[index];
			if ((index + 1) > info.length) {
				return;
			}
			let curTbl = TableItemPotato.Item(info[index].goodsId);
			if (curTbl == null || curTbl == undefined) {
				aniName = "kapai_baise";
			} else {
				if (curTbl.quality >= 3) {
					// 3蓝 4紫 5橙 6红
					aniName = aniNameArr[curTbl.quality - 3];
				}
			}
			// Game.PlayerItemSystem.GetItemQuality()
			egret.Tween.get(node)
				.to({ x: node.x + posX }, 200, egret.Ease.sineInOut)
				.wait(300 * (index + 1))
				.call(() => {
					Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "000_chuxian", 1)
						.then(display => {
							display.scaleX = 1.2;
							display.scaleY = 1.24;
							display.x = this.groupCardArr[index].width / 2;
							display.y = this.groupCardArr[index].height / 2 - 70;
							this.groupCardArr[index].addChild(display);
						})
						.catch(reason => {
							toast(reason);
						});
					if (this["groupItemContent" + (index + 1)].visible == false) {
						Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "001_xunhuan_qian", 0)
							.then(display => {
								display.x = this.groupCardArr[index].width / 2;
								display.y = this.groupCardArr[index].height / 2;
								this.groupCardArr[index].addChild(display);
							})
							.catch(reason => {
								toast(reason);
							});
					}
					let curCard = info[index];
					egret.Tween.get(node)
						.wait(100)
						.wait((22 / 60 + index * 3 / 60) * 100)
						.call(() => {

							Game.DragonBonesManager.playAnimation(this, aniName, "armatureName", "002_xunhuan_hou", 0)
								.then(display => {
									display.scaleX = 1.2;
									display.scaleY = 1.2;
									display.x = this.groupCardAniFrontArr[index].width / 2;
									display.y = this.groupCardAniFrontArr[index].height / 2 - 70;
									this.groupCardAniFrontArr[index].addChild(display);
								})
								.catch(reason => {
									toast(reason);
								});
							this.imageBackArr[index].visible = false;
						})
				});
			Game.PlayerInfoSystem.playAnnouce = true;
		}

		for (let i = 1; i <= 3; i++) {
			Game.DragonBonesManager.playAnimation(this, "ui_tongyong_beijingguang", "armatureName", "003_beijingguang_04", 0)
				.then(display => {
					display.x = this["groupOrn" + i].width / 2;
					display.y = this["groupOrn" + i].height;
					display.scaleX = 0.8;
					display.scaleY = 0.8;
					this["groupOrn" + i].addChild(display);
				}).catch(reason => {
					toast(reason);
				});
		}

		egret.Tween.get(this.groupGetCard)
			.to({ alpha: 1 }, 200)
			.to({ scaleX: 1, scaleY: 1, }, 200, egret.Ease.backOut)
			.call(() => {
				for (let i = 0; i < 3; i++) {
					cardMoveBy(i, this.groupCardArr[i], 0);//(i + 1) * 300 - 2 * 300
				}
			})
			.wait(600)
			.call(() => {
				this.btnGetCard.visible = true;
				egret.Tween.get(this.btnGetCard).to({ alpha: 1 }, 300).call(() => {
					this.btnGetCard.touchEnabled = true;
					this.groupCard11.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupCard1, this);
					this.groupCard22.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupCard2, this);
					this.groupCard33.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchGroupCard3, this);
				});
			});

	}

	public SetContinueCB(cb: Function) {
		this.CB = cb;
	}

	private onTouchGroupCard1(e: egret.TouchEvent) {
		this.ShowTips(0, e);
	}

	private onTouchGroupCard2(e: egret.TouchEvent) {
		this.ShowTips(1, e);
	}

	private onTouchGroupCard3(e: egret.TouchEvent) {
		this.ShowTips(2, e);
	}

	private onBtnGetCard() {
		// this.father.setUI();
		if (this.CB) {
			this.CB();
		}
		this.close(UI.HIDE_TO_TOP);
	}

	private ShowTips(index: number, e: egret.TouchEvent) {
		if (this.potatos != null && PlayerItemSystem.ItemType(this.cardInfo[index].goodsId) == message.EGoodsType.GOODS_TYPE_POTATO) {
			let [v, k] = Table.FindR(this.potatos, (_k, _v) => {
				if (_v.id == this.cardInfo[index].goodsId) {
					return true;
				}
			})
			if (v != null) {
				TipManager.ShowCard(v);
			} else {
				let ui = this.getChildByName("UI");
				if (ui) {
					return;
				}
				let commonDesSkill = TipManager.ShowProp(this.cardInfo[index], this, e.localY * 0.75, e.stageX, e.stageY);
				commonDesSkill.name = "UI";
				this.addChild(commonDesSkill);
			}
		} else {
			let ui = this.getChildByName("UI");
			if (ui) {
				return;
			}
			let commonDesSkill = TipManager.ShowProp(this.cardInfo[index], this, e.localY * 0.75, e.stageX, e.stageY);
			commonDesSkill.name = "UI";
			this.addChild(commonDesSkill);
		}
	}

	private up() {
		let ui = this.getChildByName("UI");
		if (ui) {
			this.removeChild(ui);
		}
	}

	private onBtnSell1() {
		let thisOne = this;
		this.potatoSoldReq(1)
			.then(() => {
				toast_success("出售成功");
				Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
				thisOne.FreshCurrSell();
				thisOne.DelGetPotatoItem();
				thisOne.currindex = -1;
			})
			.catch(() => {

			})
	}

	private onBtnSell2() {
		let thisOne = this;
		this.potatoSoldReq(2)
			.then(() => {
				toast_success("出售成功");
				Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
				thisOne.FreshCurrSell();
				thisOne.DelGetPotatoItem();
				thisOne.currindex = -1;
			})
			.catch(() => {

			});
	}

	private onBtnSell3() {
		let thisOne = this;
		this.potatoSoldReq(3)
			.then(() => {
				toast_success("出售成功");
				Game.PlayerCardSystem.deleteCardByIndex(thisOne.cardstbl[thisOne.currindex].index);
				thisOne.FreshCurrSell();
				thisOne.DelGetPotatoItem();
				thisOne.currindex = -1;
			})
			.catch(() => {

			})
	}

	private FreshCurrSell() {
		if (this["imgSale" + this.currindex] != null) {
			this["imgSale" + this.currindex].visible = true;
		}
		if (this["btnSell" + this.currindex] != null) {
			this["btnSell" + this.currindex].visible = false;
		}
		this.setPriceCisible(this.currindex, false);
	}

	private setPriceCisible(index: number, visible: boolean) {
		if (this["LabelSellNum" + index] != null) {
			this["LabelSellNum" + index].visible = visible;
		}
		if (this["imgIcon" + index] != null) {
			this["imgIcon" + index].visible = visible;
		}
	}

	private DelGetPotatoItem() {
		let index = -1;
		for (let k in this.scene.getItemInfo.items) {
			if (this.scene.getItemInfo.items.hasOwnProperty(k)) {
				let v = this.scene.getItemInfo.items[k];
				if (v.goodsId == this.cardstbl[this.currindex - 1].id) {
					index = Number(k);
					break;
				}
			}
		}
		if (index != -1) {
			this.scene.getItemInfo.items.slice(index - 1);
		}
		index = -1;
		for (let k in Game.PlayerBattleSystem.continueBattleDropItems) {
			if (Game.PlayerBattleSystem.continueBattleDropItems.hasOwnProperty(k)) {
				let v = Game.PlayerBattleSystem.continueBattleDropItems[k];
				if (v.goodsId == this.cardstbl[this.currindex - 1].id) {
					if (PlayerItemSystem.ItemIsOverlap(v.goodsId)) {
						v.count -= 1;
						if (v.count <= 0) {
							index = Number(k);
						}
					} else {
						index = Number(k);
					}
					break;
				}
			}
		}
		if (index != -1) {
			Game.PlayerBattleSystem.continueBattleDropItems.slice(index - 1);
		}
	}

	private potatoSoldReq(index: number): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.PotatoSoldRequest()
			request.body.index = [this.cardstbl[index].index];
			this.currindex = index;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.PotatoSoldResponse>resp;
				if (response.header.result != 0) {
					reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve();
			},
				(req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
				}, this, false);
		});
	}
}

}