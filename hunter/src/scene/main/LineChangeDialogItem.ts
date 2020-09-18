namespace zj {
	// 换线界面列表item
	// 翟伟利
	// 2019.12.14
	export class LineChangeDialogItem extends UI {
		private owner: LineChangeDialog;
		private imgBG: eui.Image;
		private imgDot: eui.Image;
		private lbLine: eui.Label;
		private groupSelf: eui.Group;

		private data: message.IIKVPairs;
		public constructor(owner: LineChangeDialog) {
			super();
			this.skinName = "resource/skins/main/LineChangeDialogItemSkin.exml";
			this.owner = owner;
			cachekeys(UIResource["LineChangeDialogItem"], this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSel, this);
		}

		public setData(data: message.IIKVPairs, roleNums: number[]) {
			this.data = data;
			this.update(roleNums);
		}

		public update(roleNums: number[]){
			let data = this.data;
			this.lbLine.text = LineChangeDialog.getLineName(data.key) + "线";
			let isSelf = this.data.key == Game.PlayerWonderLandSystem.serverSceneId;
			this.groupSelf.visible = isSelf;
			this.imgBG.source = cachekey(isSelf ? "ui_line_change_item_bg_sel_png" : "ui_line_change_item_bg_nor_png", this);

			let state = 0;
			if (data.value >= roleNums[1]) {
				state = 2;
			} else if (data.value >= roleNums[0]) {
				state = 1;
			}
			this.imgDot.source = cachekey("ui_line_dot_" + state + "_b_png", this);
		}

		private onBtnSel(){
			this.owner.onSelItem(this.data);
		}

		public close(animation?: string) {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSel, this);
			super.close();
		}
	}
}