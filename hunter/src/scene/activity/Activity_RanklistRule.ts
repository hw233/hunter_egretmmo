namespace zj {
	/**
	 * @class 排行榜规则说明
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-12-19
	 */
	export class Activity_RanklistRule extends Dialog {
		private labelDes: eui.Label;
		private btnClose: eui.Button;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_RanklistRuleSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.setInfo();
		}

		private setInfo() {
			let activityInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
				return v.type == message.ActivityType.ACT_TYPE_RANK;
			})[0];

			let des: string = "";
			let des1: string = "";
			let title: string = "";
			switch (activityInfo.consumeType) {
				case 1:
					des = "累积消耗钻石数量";
					des1 = "消耗数量";
					title = "钻石消耗排行榜";
					break;
				case 2:
					des = "累积消耗体力数量";
					des1 = "消耗数量";
					title = "体力消耗排行榜";
					break;
				case 3:
					des = "累计消耗金币数量";
					des1 = "消耗数量";
					title = "金币消耗排行榜";
					break;
				case 4:
					des = "累计攻打次数";
					des1 = "攻打次数";
					title = "流星街攻打次数排行榜";
					break;
				case 6:
					des = "累计格斗次数";
					des1 = "格斗次数";
					title = "本服格斗排行榜";
					break;
				case 9:
					des = "累计采集数量";
					des1 = "采集数量";
					title = "果子采集排行榜";
					break;
				case 10:
					des = "累计抽卡次数";
					des1 = "抽卡次数";
					title = "累计抽卡排行榜";
					break;
				case 12:
					des = "累计击杀数量";
					des1 = "击杀数量";
					title = "大草原击杀排行榜";
					break;
				case 16:
					des = "累计抓娃娃次数";
					des1 = "抓娃娃次数";
					title = "娃娃机抽奖排行榜";
					break;
				case 17:
					des = "累计许愿次数";
					des1 = "许愿次数";
					title = "许愿次数排行榜";
					break;
			}

			let textInfo =
				"1、" + title + "为限时活动。" + "\n" +
				"2、活动期间内，玩家" + des + "达到指定数量即可上榜。" + "\n" +
				"3、排行榜上每个名次都有各自的上榜要求，当有多名玩家同时满足某个名次的上榜要求时 ，取" + des + "最多的玩家作为该名次上榜者，其余玩家的名次按" + des1 + "由高到低依次向下顺延，直到不能满足某个名次的上榜要求为止。" + "\n" +
				"4、排行榜上某个名次被玩家占据后，该名次的上榜要求变为该玩家的" + des + "。" + "\n" +
				"5、排行榜奖励将在活动结束后统一以邮件形式发放，请注意查收。"

			this.labelDes.text = textInfo;
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
}