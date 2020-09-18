namespace zj {
//战斗记录——防守记录
//yuqingchao
//2019.02.27
export class LeagueMatchBattleRecordItem extends eui.ItemRenderer {

	private imgWin1: eui.Image;		//a 的战斗结果
	private imgStar1: eui.Image;		//战斗星级
	private imgWin2: eui.Image;		//b 的战斗结果
	private imgStar2: eui.Image;		//战斗星级
	private imgBoard1: eui.Image;		//a的头像框
	private imgIcon1: eui.Image;		//头像
	private imgBoard2: eui.Image;		//b的头像框
	private imgIcon2: eui.Image;		//头像

	private lbName1: eui.Label;		//a的公会名
	private lbName2: eui.Label;		//b的公会名
	private lbFly: eui.Label;
	private lbTime: eui.Label;		//时间

	private groupStar4: eui.Group;
	private groupStar5: eui.Group;
	private groupStar6: eui.Group;

	private imgStar7: eui.Image;
	private imgStar8: eui.Image;
	private imgStar9: eui.Image;
	private imgStar10: eui.Image;
	private imgStar11: eui.Image;
	private imgStar12: eui.Image;

	private imgStar3: eui.Image;
	private imgStar4: eui.Image;
	private imgStar5: eui.Image;
	private imgStar6: eui.Image;
	private groupStar1: eui.Group;
	private groupStar2: eui.Group;
	private groupStar3: eui.Group;

	private info: curTable;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueMatchBattleRecordItemSkin.exml";
		cachekeys(<string[]>UIResource["LeagueMatchBattleRecordItem"], null);
	}

	protected dataChanged() {
		this.info = this.data.info;
		this.setInfo();
		this.setInfoUI(1);
		this.setInfoUI(2);
	}

	private setInfo() {
		this.lbFly.textFlow = Util.RichText(TextsConfig.TextsConfig_Match.flyName[Math.floor(Number(this.info.index) / 100) - 1]);

		let ret = 0;
		let sec = this.info.time - Date.parse(Game.Controller.serverNow().toString());
		let des = "";
		if (sec > (3600 * 24) * 365) {
			ret = Math.floor(sec / ((3600 * 24) * 365));
			des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.yearsAgo, ret);
		} else if (sec > (3600 * 24) * 30) {
			ret = Math.floor(sec / ((3600 * 24) * 30));
			des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.monsAgo, ret);
		} else if (sec > (3600 * 24)) {
			ret = Math.floor(sec / (3600 * 24));
			des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.daysAgo, ret);
		} else if (sec > (3600)) {
			ret = Math.floor(sec / 3600);
			des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.hoursAgo, ret);
		} else if (sec > (60)) {
			ret = Math.floor(sec / 60)
			des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.minsAgo, ret);
		} else {
			des = TextsConfig.TextsConfig_Time.justNow;
		}
		this.lbTime.text = des;
		this.lbTime.textColor = this.lbFly.textColor;
	}

	private setInfoUI(index: number) {
		if (index == 1) {
			let win = this.info.leftResult[0] ? 0 : 1;
			if (this.info.leftInfo[1] == "0") {
				this.imgIcon1.visible = false;
			} else {
				this.imgIcon1.source = cachekey(TableItemPic.Item(Number(this.info.leftInfo[1])).path, this);
			}

			if (this.info.leftInfo[2] == "0") {
				this.imgBoard1.source = cachekey("ui_frame_FrameHunterAsh_png", this);
			} else {
				this.imgBoard1.source = cachekey(TableItemPicFrame.Item(Number(this.info.leftInfo[2])).path, this);
			}

			this.imgWin1.source = cachekey(UIConfig.UIConfig_Mail.win[win], this);
			this.lbName1.text = this.info.leftInfo[0];
			let num = this.info.leftResult[1];
			if (num == 1) {
				this.groupStar1.visible = true;
				this.groupStar2.visible = false;
				this.groupStar3.visible = false;
				this.imgStar1.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else if (num == 2) {
				this.groupStar1.visible = false;
				this.groupStar2.visible = true;
				this.groupStar3.visible = false;
				this.imgStar2.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar3.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else if (num == 3) {
				this.groupStar1.visible = false;
				this.groupStar2.visible = false;
				this.groupStar3.visible = true;
				this.imgStar4.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar5.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar6.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else {
				this.groupStar1.visible = false;
				this.groupStar2.visible = false;
				this.groupStar3.visible = false;
			}
		} else {
			let win = this.info.rightResult[0] ? 0 : 1;

			if (this.info.rightInfo[1] == "0") {
				this.imgIcon2.visible = false;
			} else {
				this.imgIcon2.source = cachekey(TableItemPic.Item(Number(this.info.rightInfo[1])).path, this);
			}

			if (this.info.rightInfo[2] == "0") {
				this.imgBoard2.source = cachekey("ui_frame_FrameHunterAsh_png", this);
			} else {
				this.imgBoard2.source = cachekey(TableItemPicFrame.Item(Number(this.info.rightInfo[2])).path, this);
			}

			this.imgWin2.source = cachekey(UIConfig.UIConfig_Mail.win[win], this);
			this.lbName2.text = this.info.rightInfo[0];

			let num = this.info.rightResult[1];
			if (num == 1) {
				this.groupStar4.visible = true;
				this.groupStar5.visible = false;
				this.groupStar6.visible = false;
				this.imgStar7.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else if (num == 2) {
				this.groupStar4.visible = false;
				this.groupStar5.visible = true;
				this.groupStar6.visible = false;
				this.imgStar8.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar9.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else if (num == 3) {
				this.groupStar4.visible = false;
				this.groupStar5.visible = false;
				this.groupStar6.visible = true;
				this.imgStar10.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar11.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
				this.imgStar12.source = cachekey(UIConfig.UIConfig_Union.star[0], this);
			}
			else {
				this.groupStar4.visible = false;
				this.groupStar5.visible = false;
				this.groupStar6.visible = false;
			}
		}
	}
}
}