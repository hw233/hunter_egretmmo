namespace zj {
	export class AdventureTitle extends UI {
		public lbName: eui.Label;
		public lbLock: eui.Label;
		// public imgLock: eui.Image;// 锁定（未开启）
		// public imgFlag: eui.Image;// 新开启
		public constructor() {
			super();
			// this.skinName = "resource/skins/adventure/AdventureTitleSkin.exml";
		}

		public setData(ui, _data: TableInstanceArea) {
			let idx = _data.area_id;
			this.lbName.text = _data.area_id + "." + _data.area_name;
			this.setState(0);
		}

		public setState(state: number, param = null) {// 0-未开启，1-开启，2-当前, 3-下一关
			switch (state) {
				case 0:
					this.visible = false;
					break;
				case 1:
					this.currentState = "pass";
					this.visible = true;
					break;
				case 2:
					this.currentState = "curr";
					this.visible = true;
					break;
				case 3:
					this.currentState = "lock";
					this.lbLock.text = param;
					this.visible = true;
					break;
			}
		}
	}
}