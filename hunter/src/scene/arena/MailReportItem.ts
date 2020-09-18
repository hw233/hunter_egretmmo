namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-2-20
 * 
 * @class 战报子项界面
 */
export class MailReportItem extends eui.ItemRenderer {
	private groupItem: eui.Group;
	private imgBG: eui.Image;
	private imgRead: eui.Image;
	private labelTitle: eui.Label;
	private labelFrom: eui.Label;
	private labelTime: eui.Label;
	private imgGet: eui.Image;
	private imgFrame: eui.Image;
	private imgUser: eui.Image;
	private imgWin: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/MailReportItemSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.down, this);
		cachekeys(<string[]>UIResource["MailReportItem"], null);
		this.imgBG.source = cachekey("ui_mail_LayerMailSeconde_png", this);
	}
	protected dataChanged() {
        closeCache(this.groupItem);
		let data = this.data as MailReportItemData;
		let role = data.info.roleBaseInfo[0];
		if (role && role.picFrameId > 0 && role.picId > 0) {
			this.imgFrame.source = cachekey(PlayerItemSystem.ItemPath(role.picFrameId), this);
			this.imgUser.source = cachekey(PlayerItemSystem.ItemPath(role.picId), this);
		}
		let bRead = data.info.is_read && 1 || 2;
		let bGet = false;
		let pathWin = UIConfig.UIConfig_Mail.win[data.info.battleResult - 1];

		let pathLogo = data.info.is_read && UIConfig.UIConfig_Mail.read[0] || UIConfig.UIConfig_Mail.read[1];
		// let bRead = !data.info.is_read;
		// let bGet = data.info.attachment && data.info.is_attachment;
		let strTitle = Helper.StringFormat("%s", data.info.title);
		let strFrom = Helper.StringFormat("%s%s", TextsConfig.TextsConfig_Mail.from, TextsConfig.TextsConfig_Mail.system);
		let strTime = data.info.createtime;
		this.imgRead.source = cachekey(UIConfig.UIConfig_Mail.read[bRead - 1], this);
		this.imgGet.visible = bGet;
		this.imgWin.source = cachekey(pathWin, this);
		this.labelTitle.text = strTitle;
		this.labelFrom.text = strFrom;
		this.labelTime.text = Set.TimeOffset(strTime).toString();
        setCache(this.groupItem);
	}

	private down() {
		this.data.father.setSelect(this.data.index);
	}

	private setinfoRead() {
		this.imgRead.source = cachekey(UIConfig.UIConfig_Mail.read[0], this);
	}

	private setInfoGet() {
		this.imgGet.visible = false;
	}
}
/**子项数据源 */
export class MailReportItemData {
	index: number;
	info: message.MailInfo;
	father: MailMainReport;
}
}