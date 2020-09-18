namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-20
	 * 
	 * @class 执照特权信息
	 */
	export class licenseProgressInfoItemB extends eui.ItemRenderer {
		public labelInfo: eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/skins/license/licenseProgressInfoItemBSkin.exml";
			cachekeys(<string[]>UIResource["licenseProgressInfoItemB"], null);
		}
		/** 修改数据源被动执行*/
		protected dataChanged() {
			this.labelInfo.textFlow = Util.RichText(this.data.id);
		}
	}
	export class licenseProgressInfoItemBData {
		id;
	}
}