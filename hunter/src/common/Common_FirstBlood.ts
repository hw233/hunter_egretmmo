namespace zj {
/**
 * 首杀奖励
 * created by LianLei
 * 2019.4.13
 */
export class Common_FirstBlood extends Dialog {
	private imgGet: eui.Image;
	private imgGetB: eui.Image;
	private btnOk: eui.Button;
	private imgFrameFirstBlood: eui.Image;
	private imgIconFirstBlood: eui.Image;
	private labelFirstBloodNum: eui.BitmapLabel;
	private imgGetFirstBlood: eui.Image;
	private labelFirstBloodTip: eui.Label;
	private groupBackdrop: eui.Group;
	private rectOk: eui.Rect;
	private groupTouch: eui.Group;

	private callBack: () => void;

	private goodsId: number;
	private count: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/Common_FirstBloodSkin.exml";
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnTouchBeginFirstBlood, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnTouchEndFirstBlood, this);
	}

	public SetInfoGet(goods: Array<any>) {
		let goodId = goods[0].goodsId;
		let count = goods[0].count;
		this.goodsId = goodId;
		this.count = count;
		let itemSet = PlayerItemSystem.Set(goodId, null, count) as any;
		let name = itemSet.Info.name;
		this.imgIconFirstBlood.source = cachekey(itemSet.Path, this);
		this.labelFirstBloodNum.text = count.toString();

		if (Game.PlayerInstanceSystem.curInstanceType != message.EFormationType.FORMATION_TYPE_RELIC) {
			this.labelFirstBloodTip.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.awardFirst, name, count));
		}
		else {
			let scene = Game.UIManager.topScene();
			let step = scene['getCurrChapSetp']() || 1
			this.labelFirstBloodTip.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Instance.relicAwardFirst, step, name, count));
		}

		this.imgFrameFirstBlood.source = cachekey(itemSet.Frame, this);

		let path = "WordsBattleEndPopTip_png";
		this.playAnimation();
		this.addBackdropAnimatoin("ui_tongyong_beijingguang", "001_beijignguang_02", 0, this.groupBackdrop);

		let cardInfo = TableItemPotato.Table();
		for (let [k, v] of HelpUtil.GetKV(cardInfo)) {
			if (v.id == goodId) {
				return goodId;
			}
		}
	}

	//添加龙骨动画背景发光
	private addBackdropAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2;
				display.y = group.explicitHeight;
				group.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});
	}

	private onBtnClose() {
		// Teach.addTeaching();
		if (this.callBack) {
			this.callBack();
		}
		this.close();
	}

	public SetCB(cb: () => void) {
		this.callBack = cb;
	}

	private playAnimation() {
		this.imgGet.scaleX = 10;
		this.imgGet.scaleY = 10;
		this.imgGet.alpha = 1;
		egret.Tween.get(this.imgGet)
			// .to({ scaleY: 10, scaleX: 10, alpha: 0.75, fillAlpha: 0.75 }, 0)
			// .to({ fillAlpha: 0.75 }, 0)
			// .to({ alpha: 1 }, 0)
			.to({ scaleY: 0.85, scaleX: 0.85 }, 230, egret.Ease.quadIn)
			.call(() => {
				this.imgGetB.scaleX = 0.85;
				this.imgGetB.scaleY = 0.85;
				this.imgGetB.alpha = 0.75;
				egret.Tween.get(this.imgGetB)
					// .to({ scaleY: 0.85, scaleX: 0.85, fillAlpha: 0.75 })
					// .to({ alpha: 0.75 }, 0)
					.to({ scaleY: 2.5, scaleX: 2.5, alpha: 0 }, 1000, egret.Ease.sineInOut)
					.call(()=>{
						egret.Tween.removeTweens(this.imgGetB);
					});

			})
			.to({ scaleY: 1.04, scaleX: 1.04 }, 130, egret.Ease.quadInOut)
			.to({ scaleY: 1, scaleX: 1 }, 300, egret.Ease.sineInOut)
			.call(()=>{
				egret.Tween.removeTweens(this.imgGet);
			});
	}


	private onBtnTouchBeginFirstBlood(e: egret.TouchEvent) {
		let newThis = this;
		let touchX = e.stageX;
		let groupY: number;
		let type: number = 0;// type == 1 点击位置大于父类高度的一半

		groupY = e.stageY - e.localY;
		type = 1;

		let cardInfo = TableItemPotato.Table();
		let cardId: boolean = Table.FindF(cardInfo, (_k, _v) => {
			return _v.id == this.goodsId;
		});

		if (!cardId) {
			let _type = PlayerItemSystem.ItemType(this.goodsId);
			if (_type == message.EGoodsType.GOODS_TYPE_GENERAL) {
				loadUI(CommonDesGeneral).then((dialog: CommonDesGeneral) => {
					dialog.name = "First_Blood";
					dialog.x = touchX - dialog.width / 2 - 20;
					dialog.y = groupY - dialog.height;
					dialog.setInfo(newThis.goodsId, newThis.count);
					newThis.addChild(dialog);
				});
			} else if (_type == message.EGoodsType.GOODS_TYPE_RESOURCE) {
				loadUI(Common_DesRes).then((dialog: Common_DesRes) => {
					dialog.name = "First_Blood";
					dialog.x = touchX - dialog.width / 2 - 20;
					dialog.y = groupY - dialog.height;
					dialog.setInfo(newThis.goodsId, newThis.count);
					newThis.addChild(dialog);
				});
			} else {
				loadUI(CommonDesProp).then((dialog: CommonDesProp) => {
					dialog.name = "First_Blood";
					dialog.x = touchX - dialog.width / 2 - 20;
					dialog.y = groupY - dialog.height;
					dialog.init(newThis.goodsId, newThis.count);
					newThis.addChild(dialog);
				});
			}
		}
		else {
			let showCardInfo: TableItemPotato = cardInfo[this.goodsId];
			loadUI(PlayerCardPopDialog)
				.then((dialog: PlayerCardPopDialog) => {
					dialog.loadNotGet(showCardInfo, false, () => {
						dialog.close();
					});
					dialog.name = "First_Blood";
					dialog.show();
				});
		}
	}

	private onBtnTouchEndFirstBlood() {
		let dialogFirstBlood = this.getChildByName("First_Blood");
		if (dialogFirstBlood) this.removeChild(dialogFirstBlood);
	}
}
}