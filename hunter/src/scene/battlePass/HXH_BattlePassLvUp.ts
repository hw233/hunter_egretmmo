namespace zj {
	/**
	 * @class 通行证恭喜升级UI
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-22
	 */
	export class HXH_BattlePassLvUp extends Dialog {
		private groupTouch: eui.Group;
		private imgPass: eui.Image;
		private labelLevel: eui.BitmapLabel;
		private labelClose: eui.Label;

		private level: number;

		public constructor() {
			super();
			this.skinName = "resource/skins/battlePass/HXH_BattlePassLvUpSkin.exml";
			this.groupTouch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		}

		public setInfo(level: number) {
			this.level = level;
			this.labelLevel.text = level.toString();
			this.imgPass.source = cachekey(Game.PlayerInfoSystem.BaseInfo.permitPay == 1 ? UIConfig.UIConfig_BattlePass.iconHighPass : UIConfig.UIConfig_BattlePass.iconLowPass, this);
			egret.Tween.get(this.labelClose, { loop: true }).to({ alpha: 0 }, 1200).to({ alpha: 1 }, 1200);
		}

		private onBtnClose() {
			Game.EventManager.event(GameEvent.UPDATE_BATTLEPASS_GIFT);
			if (Game.PlayerInfoSystem.BaseInfo.permitPay == 1 && this.level % 10 == 0) {
				this.close();
				loadUI(HXH_BattlePassGetReward).then((dialog: HXH_BattlePassGetReward) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.level);
				});
			}
			else if (Game.PlayerInfoSystem.BaseInfo.permitPay == 0 && this.level % 10 == 0) {
				loadUI(HXH_BattlePassGetGood).then((dialog: HXH_BattlePassGetGood) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.level);
					this.close();
				});
			}
			else {
				this.close(UI.HIDE_TO_TOP);
			}
		}
	}
}
