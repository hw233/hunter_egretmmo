namespace zj {
/**
 * @author 
 * 
 * @date 2019-1-25
 * 
 * @class 战报界面
 */
export class MailMainReport extends Dialog {
	private btnClose: eui.Button;
	private labelTips: eui.Label;
	private listView: eui.List;
	private labelTip: eui.Label;
	private btnTurn: eui.Button;
	private labelCount: eui.Label;
	private btnRead: eui.Button;

	private itemId: number = null;
	public mailType: number = null;
	public mailType1: number = null;
	private mailData: Array<message.MailInfo> = [];
	private MAIL_INDEX = [
		message.MailType.MAIL_TYPE_SYSTEM,
		message.MailType.MAIL_TYPE_NORMAL,
		message.MailType.MAIL_TYPE_LADDER,
		message.MailType.MAIL_TYPE_WONDERLAND,
		message.MailType.MAIL_TYPE_SINGLECRAFT
	]
	/**未读邮件*/
	private mailBoxInfo: Array<message.MailBoxInfo> = [];
	/**战报数据源 */
	private listSkillData: eui.ArrayCollection = new eui.ArrayCollection();
	public constructor() {
		super();
		this.skinName = "resource/skins/arena/MailMainReportSkin.exml";
		this.init();
	}
	private init() {
		let tap = egret.TouchEvent.TOUCH_TAP;
		this.btnClose.addEventListener(tap, this.onBtnClose, this);
		this.btnRead.addEventListener(tap, this.onBtnRead, this);
		//监听服务器发协议之后执行
		//this.reqMailList(this.mailType);

	}

	public loadFrom(father, mailType: number) {
		this.mailType1 = mailType;
		this.setInfo(mailType);
		this.setButtonTurn();
		this.labelTip.visible = mailType == TableEnum.Enum.Mail.WONDERLAND;
		this.btnTurn.visible = mailType == TableEnum.Enum.Mail.WONDERLAND;
	}

	private setInfo(mailType: number) {
		this.setMailType(mailType);
	}

	private setMailType(mailType: number) {
		this.mailType = this.MAIL_INDEX[mailType - 1];
		this.reqMailList(this.mailType);
	}

	/**子类调用 */
	public setSelect(index: number) {
		this.itemId = index;
		this.setMailIsOpen();
		this.reqMailDetail(this.mailType, [this.mailData[this.itemId].mailId]);
	}

	private reqMailDetail(mailType: number, mailId) {
		Game.PlayerArenaSystem.getMailDetail(this.mailType, mailId)
			.then(() => {
				this.setInfoList();
			})
			.catch((reason) => {

			});
	};

	private setMailIsOpen() {
		this.setMailIsRead();
		this.setInfoPlayerMailBoxCount();

		let info = this.mailData[this.itemId];
		loadUI(MailReport)
			.then((dialog: MailReport) => {
				dialog.setInfo(info, this, () => {
					this.loadFrom(null, this.mailType1);
				});
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	private setMailIsRead() {
		let mail = Table.FindV(this.mailData, this.itemId)
		if (!mail.is_read) {
			// this._item_list[self._item_id]:SetInfoRead()
			mail.is_read = true
			Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount = Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount - 1
			Tips.SetTipsOfId(Tips.TAG.MAIL, 1)
		}
	}

	private setInfoPlayerMailBoxCount() {
		let count1 = 0;
		let count2 = 0;
		for (let k in this.mailData) {
			if (this.mailData.hasOwnProperty(k)) {
				let v = this.mailData[k];
				count1 = count1 + yuan3(v.is_read, 0, 1);
				count2 = count2 + yuan3((v.attachment.length == 0) || (v.attachment.length > 0 && v.is_attachment), 0, 1)
			}
		}
		Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount = count1;
		Game.PlayerMailSystem.mailboxInfo[this.mailType].unReward = count2;
		Tips.SetTipsOfId(Tips.TAG.MAIL, 1)
	}


	private reqMailList(mailType: number) {
		Game.PlayerArenaSystem.getMailList(mailType)
			.then((resolve) => {
				this.mailBoxInfo = resolve[0];
				// Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
				Game.PlayerMailSystem.mailboxInfo = resolve[0];
				this.mailData = resolve[1];
				this.setInfoData();
				this.setInfoCount();
				this.setInfoList();


			})
			.catch((reason) => {
				//toast(reason) ;   这里返回值有错误

			});
	}

	private setInfoData() {
		let time = null;
		for (var v in this.mailData) {
			if (this.mailData.hasOwnProperty(v)) {
				var k = this.mailData[v];
				k.title = Set.DecodeJson(k.title, null);
				k.content = Set.DecodeJson(Lang.chatContent(k), null);
			}
		}
	}

	/**加载邮件列表 */
	private setInfoList() {

		this.listSkillData.removeAll();
		for (let i = 0; i < this.mailData.length; i++) {
			let data = new MailReportItemData();
			data.index = i;
			data.info = this.mailData[i];
			data.father = this;
			this.listSkillData.addItem(data);
		}
		this.listView.dataProvider = this.listSkillData;
		this.listView.itemRenderer = MailReportItem;
	}

	private setInfoCount(count?) {
		count = count || this.mailData.length;
		let strCount = Helper.StringFormat("%s", count);
		this.labelCount.text = strCount;
		this.labelTips.visible = count == 0;
	}

	/**点击全部阅读*/
	private onBtnRead() {
		let mailIds = [];
		for (var k in this.mailData) {
			if (this.mailData.hasOwnProperty(k)) {
				var v = this.mailData[k];
				if (!v.is_read) {
					mailIds.push(v.mailId);
				}
			}
		}
		if (mailIds.length > 0) {
			this.reqMailRead(mailIds);
		} else {
			toast_warning(TextsConfig.TextsConfig_Error.mail_read);
		}
	}

	private setButtonTurn() {

	}

	/**将未读邮件全部设为已读 */
	private reqMailRead(ids) {
		Game.PlayerArenaSystem.getMailDetail(this.mailType, ids)
			.then(() => {
				this.mailBoxInfo[this.mailType].unReadCount = 0;
				Game.PlayerMailSystem.mailboxInfo[this.mailType].unReadCount = 0;
				for (var k in this.mailData) {
					if (this.mailData.hasOwnProperty(k)) {
						var v = this.mailData[k];
						v.is_read = true;
					}
				}
				this.setInfoList();
				Tips.SetTipsOfId(Tips.TAG.MAIL, 1);
			})
			.catch((reason) => {
				// toast(reason);
			});
	}

	/**关闭弹窗*/
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}