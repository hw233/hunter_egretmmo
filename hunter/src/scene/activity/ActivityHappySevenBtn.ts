namespace zj {
	/**
	 * @class 开服七天乐天数奖励按钮
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-12-04
	 */
	export class ActivityHappySevenBtn extends eui.Button {
		private imgBoard: eui.Image;
		private labelDay: eui.Label;
		private awardDay: zj.ActivityHappySevenAwardItem;

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityHappySevenBtnSkin.exml";
		}

		public setInfo(info: TableContinueLogin, bReward: boolean, isAwardList: boolean, isHaveGot: boolean) {
			// let days = Game.PlayerMixUnitInfoSystem.mixunitinfo.sevenLoginReward.length;
			let days = Math.min(7, Helper.getDayIdx(Game.PlayerInfoSystem.BaseInfo.createTime * 1000, Game.Controller.curServerTime * 1000));
			this.imgBoard.source = info.dayIndex <= days ? cachekey("ui_acitivity_serverseven_fangkuai1_png", this) : cachekey("ui_acitivity_serverseven_fangkuai_png", this);
			this.labelDay.text = "第" + info.dayIndex + "天";
			this.awardDay.setData(info.reward_goods[0], info.reward_count[0], info.show_type[0], bReward, isAwardList, isHaveGot);
		}
	}
}