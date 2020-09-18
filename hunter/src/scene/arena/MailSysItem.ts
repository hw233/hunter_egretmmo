namespace zj {

/** 
 * @author xing li wei
 * 
 * @date 2019-1-30
 * 
 * @class 战报子项界面
 */
export class MailSysItem extends eui.ItemRenderer {
	private imgBG: eui.Image;
	private imgLogo: eui.Image;
	private labelTitle: eui.Label;
	private labelFrom: eui.Label;
	private imgGet: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/MailSysItemSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.down, this);
		cachekeys(<string[]>UIResource["MailSysItem"], null);
	}
	protected dataChanged() {
		let data = this.data as MailSysItemData;
		let pathLogo = data.info.is_read && UIConfig.UIConfig_Mail.read[0] || UIConfig.UIConfig_Mail.read[1];
		let bRead = !data.info.is_read;
		let bGet = data.info.attachment && data.info.is_attachment;
		let strTitle = Helper.StringFormat("%s", data.info.title);
		let strFrom = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_Mail.from, TextsConfig.TextsConfig_Mail.system);
		let steTime = Helper.StringFormat(data.info.createtime);
		this.imgLogo.source = cachekey(pathLogo, this);
		this.imgGet.visible = bGet;
		this.labelTitle.text = strTitle;
		this.labelFrom.text = strFrom;
	}

	private down() {
		this.data.father.setSelect(this.data.index);
	}
}
/**子项数据源 */
export class MailSysItemData {
	index: number;
	info;
	father: MailMainReport;
}
}