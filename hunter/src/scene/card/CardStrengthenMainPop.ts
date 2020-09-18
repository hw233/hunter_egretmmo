namespace zj {
	export class CardStrengthenMainPop extends Dialog {
		private groupABRight: eui.Group;
		private labelTips: eui.Label;
		private labelTips1: eui.Label;
		private groupCard: eui.Group;
		private imgFrame: eui.Image;
		private imgCard: eui.Image;
		private imgCardType: eui.Image;
		private labelCardNum: eui.Label;
		private labelCardName: eui.Label;
		private labelCardDetails: eui.Label;
		private labelLevel: eui.BitmapLabel;
		private groupStar: eui.Group;
		private labelDes: eui.Label;
		private labelAttri1: eui.Label;
		private labelAttri2: eui.Label;
		private labelAttri3: eui.Label;
		private imgAttri1: eui.Image;
		private imgAttri2: eui.Image;
		private groupBack: eui.Group;
		private groupTmp: eui.Group;

		private callBack: Function = null;
		private thisObj: CardStrengthenMain = null;
		private rangeResult: number;
		private growthValue: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/card/CardStrengthenMainPopSkin.exml";
			// this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.groupABRight.width = UIManager.StageWidth;
			this.groupABRight.height = UIManager.StageHeight;
			this.groupBack.width = UIManager.StageWidth;
			this.groupBack.height = UIManager.StageHeight;
			this.groupTmp.width = UIManager.StageWidth;
			this.groupTmp.height = UIManager.StageHeight;
		}

		public SetInfo(attriId: number, cur_card: message.PotatoInfo, info: TableItemPotato, growthValue: number, rangeResult: number, value: number, perShow: number, cb: Function, thisObj: CardStrengthenMain) {
			this.callBack = cb;
			this.thisObj = thisObj;
			this.rangeResult = rangeResult;
			this.growthValue = growthValue;

			let bigFramePic = PlayerCardSystem.GetItemFrame(cur_card.id)[1];
			this.labelTips.visible = false;
			this.labelTips1.visible = false;
			this.labelAttri1.visible = false;
			this.labelAttri2.visible = false;

			// 卡片信息
			this.imgFrame.source = cachekey(bigFramePic, this);
			this.labelCardNum.text = info.num;
			this.labelCardName.text = info.name;
			this.imgCard.source = cachekey(info.paths, this);
			this.imgCardType.source = UIConfig.UIConfig_Hunter_Card.card_type_small[info.type - 1];
			this.labelCardDetails.text = info.des;
			this.labelLevel.text = "LV" + cur_card.level;

			let addStr = PlayerCardSystem.GetAddStr(cur_card);
			if (addStr.length == 5) {
				Helper.SetStar(this.groupStar, cur_card.star, UIConfig.UIConfig_Hunter_Card.card_star_next, 0.8, 16);
			}
			else {
				Helper.SetStar(this.groupStar, cur_card.star, UIConfig.UIConfig_Hunter_Card.card_star, 0.8, 16);
			}

			// 属性变化
			this.labelDes.text = Game.PlayerCardSystem.attriInstance(attriId).des;
			if (rangeResult > Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
				if (perShow == 1) {
					if (growthValue == 0) {
						this.labelAttri1.textFlow = Util.RichText(value.toString());
					}
					else {
						if (growthValue > Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, growthValue));
						}
						else {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, growthValue));
						}
					}
					this.labelAttri2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, rangeResult));

					let str = Math.abs(rangeResult - growthValue);
					let str1 = str.toString();
					let pos = str1.indexOf(".") + 3; // 获取小数点的位置
					let count = str1.length - pos; // 获取小数点后的个数
					let text = null;
					if (count > 0 && pos != 0) {
						text = Number(str.toFixed(1));
					}
					else {
						text = Math.abs(rangeResult - growthValue);
					}
					if (rangeResult > growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
					}
					else if (rangeResult < growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
					}
				}
				else {
					if (growthValue == 0) {
						this.labelAttri1.textFlow = Util.RichText(value + "%");
					}
					else {
						if (growthValue > Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, growthValue));
						}
						else {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, growthValue));
						}
					}
					this.labelAttri2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, rangeResult));
					let str = Math.abs(rangeResult - growthValue);
					let str1 = str.toString();
					let pos = str1.indexOf(".") + 3; // 获取小数点的位置
					let count = str1.length - pos; // 获取小数点后的个数
					let text = null;
					if (count > 0 && pos != 0) {
						text = Number(str.toFixed(1)) + "%";
					}
					else {
						text = Math.abs(rangeResult - growthValue) + "%";
					}
					if (rangeResult > growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
					}
					else if (rangeResult < growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
					}
				}
			}
			else {
				if (perShow == 1) {
					if (growthValue == 0) {
						this.labelAttri1.textFlow = Util.RichText(value.toString());
					}
					else {
						if (growthValue > Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per, value, growthValue));
						}
						else {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, growthValue));
						}
					}
					this.labelAttri2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per, value, rangeResult));
					let str = Math.abs(rangeResult - growthValue);
					let str1 = str.toString();
					let pos = str1.indexOf(".") + 3; // 获取小数点的位置
					let count = str1.length - pos; // 获取小数点后的个数
					let text = null;
					if (count > 0 && pos != 0) {
						text = Number(str.toFixed(1));
					}
					else {
						text = Math.abs(rangeResult - growthValue);
					}
					if (rangeResult > growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
					}
					else if (rangeResult < growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
					}
				}
				else {
					if (growthValue == 0) {
						this.labelAttri1.textFlow = Util.RichText(value.toString() + "%");
					}
					else {
						if (growthValue > Game.PlayerCardSystem.attriInstance(attriId).range_growth[0][1]) {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popb_per_up, value, growthValue));
						}
						else {
							this.labelAttri1.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, growthValue));
						}
					}
					this.labelAttri2.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_popa_per_up, value, rangeResult));
					let str = Math.abs(rangeResult - growthValue);
					let str1 = str.toString();
					let pos = str1.indexOf(".") + 3; // 获取小数点的位置
					let count = str1.length - pos; // 获取小数点后的个数
					let text = null;
					if (count > 0 && pos != 0) {
						text = Number(str.toFixed(1)) + "%";
					}
					else {
						text = Math.abs(rangeResult - growthValue) + "%";
					}
					if (rangeResult > growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_gr, text));
					}
					else if (rangeResult < growthValue) {
						this.labelAttri3.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_Hunter_Card.card_attri_re, text));
					}
				}
			}

			this.SetAniInfo();
			this.SetAttriInfo();
		}

		private SetAniInfo() {
			let dbName = "xilian_eff";
			let animationName = "001_kapai";
			let displays = [this.groupCard];
			let solts = ["000_kabei"];

			Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

				// armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {

				// }, this);
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.animation.play(animationName, 1);

				armatureDisplay.x = this.groupBack.explicitWidth / 2.2;
				armatureDisplay.y = this.groupBack.explicitHeight / 2;
				armatureDisplay.scaleX = 2;
				armatureDisplay.scaleY = 2;
				this.groupBack.addChild(armatureDisplay);

			}).catch((reason) => {
				toast_warning(reason);
			});
		}

		private SetAttriInfo() {
			// ui_card_enchant_WordsResult_png
			let name = new eui.Image(cachekey("ui_card_enchant_WordsResult_png", this));
			name.width = 225;
			name.height = 59;
			name.anchorOffsetX = name.width / 2;
			name.anchorOffsetY = name.height / 2;

			let dbName = "xilian_eff";
			let animationName = null;
			let displays = [this.labelDes, this.labelAttri1, this.labelAttri2, this.labelAttri3, name];
			let solts = ["001_xinxi1", "001_xilianqian", "001_xilianhou", "001_bianhua", "001_biaoti"];

			this.labelDes.anchorOffsetX = this.labelDes.width / 2;
			this.labelDes.anchorOffsetY = this.labelDes.height / 2;
			for (let i = 1; i <= 3; i++) {
				(<eui.Label>this[`labelAttri${i}`]).anchorOffsetX = (<eui.Label>this[`labelAttri${i}`]).width / 2;
				(<eui.Label>this[`labelAttri${i}`]).anchorOffsetY = (<eui.Label>this[`labelAttri${i}`]).height / 2;
			}

			if (this.rangeResult > this.growthValue) {
				animationName = "002_wenzi-1";
			}
			else if (this.rangeResult == this.growthValue) {
				animationName = "003_wenzi-2";
			}
			else {
				animationName = "004_wenzi-3";
			}

			Game.DragonBonesManager.getAnimationWithBindImages(this, dbName, null, displays, solts).then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {

				armatureDisplay.armature.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
					this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
					this.labelTips1.visible = true;
					egret.Tween.get(this.labelTips1, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
					if (this.rangeResult < this.growthValue) {
						this.labelTips.visible = true;
						this.labelTips.text = TextsConfig.TextsConfig_Hunter_Card.card_down;
						this.labelTips.anchorOffsetX = this.labelTips.width / 2;
						this.labelTips.anchorOffsetY = this.labelTips.height / 2;
						this.labelTips.x = UIManager.StageWidth / 1.8 + armatureDisplay.width / 2;

					}
				}, this);
				// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				// 	armatureDisplay.animation.stop();
				// 	armatureDisplay.animation.reset();
				// 	armatureDisplay.armature.dispose();
				// 	armatureDisplay.dbClear();
				// 	armatureDisplay.dispose(true);
				// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
				// }, null);
				armatureDisplay.animation.play(animationName, 1);

				armatureDisplay.x = UIManager.StageWidth / 1.8 + armatureDisplay.width / 2;
				armatureDisplay.y = this.height / 2;
				armatureDisplay.scaleX = 2;
				armatureDisplay.scaleY = 2;
				this.groupTmp.addChild(armatureDisplay);

			}).catch((reason) => {
				toast_warning(reason);
			});

		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
			if (this.callBack != null) {
				this.callBack.call(this.thisObj);
			}
			this.callBack = null;
			this.thisObj = null;
		}
	}
}