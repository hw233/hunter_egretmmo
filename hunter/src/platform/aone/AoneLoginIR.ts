namespace zj {
	export class AoneLoginIR extends eui.ItemRenderer {
		public lb_tail: eui.Label;
		public box: eui.Group;
		public lb_account: eui.Label;
		public img_delete: eui.Image;
		public rect_bg: eui.Rect;

		public constructor() {
			super();
			this.skinName = "resource/skins/aone/AoneLoginIRSkin.exml";
			cachekeys(<string[]>UIResource["AoneLoginIR"], null);

			this.img_delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDelete, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelect, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
			this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
		}

		protected dataChanged() {
			this.rect_bg.fillColor = 0xffffff;
			if (this.data == "") {
				this.lb_tail.visible = true;
				this.box.visible = false;
			} else {
				this.lb_tail.visible = false;
				this.box.visible = true;
				this.lb_account.text = this.data;
			}
		}

		private onDelete() {
			Game.EventManager.event(GameEvent.AONE_DELETE_ACCOUNT, this.data);
		}

		private onSelect() {
			Game.EventManager.event(GameEvent.AONE_SELECT_ACCOUNT, this.data);
		}

		private onBegin() {
			this.rect_bg.fillColor = 0xD1C132;
		}

		private onEnd() {
			this.rect_bg.fillColor = 0xffffff;
		}
	}
}