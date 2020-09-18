namespace zj {
	/**
	 * @class 排行榜Item
	 * 
	 * @author LianLei
	 * 
	 * @date 2019-11-26
	 */
	export class Activity_RanklistMainItem extends eui.ItemRenderer {
		private imgRank: eui.Image;
		private imgFrame: eui.Image;
		private imgIcon: eui.Image;
		private imgHead: eui.Image;
		private labelName: eui.Label;
		private labelTime: eui.Label;
		private labelRank: eui.BitmapLabel;
		private scrollerAward: eui.Scroller;
		private listAward: eui.List;

		private listAwardData: eui.ArrayCollection = new eui.ArrayCollection();

		public constructor() {
			super();
			this.skinName = "resource/skins/activity/Activity_RanklistMainItemSkin.exml";
			cachekeys(<string[]>UIResource["Activity_RanklistMainItem"], null);
		}

		protected dataChanged() {
			this.updateView(this.data);
		}

		private updateView(data: message.RankBaseItemInfo) {
			this.imgRank.visible = data.rank <= 3;
			this.labelRank.visible = data.rank > 3;
			this.imgHead.visible = data.baseInfo == null;
			this.imgFrame.visible = data.baseInfo != null;
			this.imgIcon.visible = data.baseInfo != null;
			this.labelName.visible = data.baseInfo != null;

			if (data.rank <= 3) this.imgRank.source = cachekey("ui_acitivity_rankinglist_paiming" + data.rank + "_png", this);
			this.labelRank.text = data.rank.toString();

			if (data.baseInfo != null) {
				let item_frame = TableItemPicFrame.Item(data.baseInfo.picFrameId).path;
				let item_pic = TableItemPic.Item(data.baseInfo.picId).path;
				this.imgFrame.source = cachekey(item_frame, this);
				this.imgIcon.source = cachekey(item_pic, this);
				this.labelName.text = data.baseInfo.name;
			}

			let activityInfo: message.ActivityInfo = Table.FindR(Game.PlayerActivitySystem.Activities, function (k, v) {
				return v.type == message.ActivityType.ACT_TYPE_RANK;
			})[0];

			if (activityInfo == null || activityInfo.rankRewards == null) return;

			let rankInfo = activityInfo.rankRewards;

			let goodsInfo: Array<message.GoodsInfo> = [];

			for (let i = 0; i < rankInfo.length; i++) {
				if (data.rank >= rankInfo[i].rankZone[0] && data.rank <= rankInfo[i].rankZone[1]) {
					goodsInfo = rankInfo[i].goodsInfo;
					break;
				}
			}

			this.listAwardData.removeAll();
			for (let i = 0; i < goodsInfo.length; i++) {
				if (goodsInfo[i].goodsId != 0) {
					this.listAwardData.addItem({ goodsInfo: goodsInfo[i] });
				}
			}
			this.listAward.dataProvider = this.listAwardData;
			this.listAward.itemRenderer = Activity_RanklistAwardItem;

			// this.labelTime.text = "钻石消耗：" + data.value;
			let value = data.value > 100000 ? (((data.value / 1000) >>> 0) % 10 == 0 ? ((data.value / 10000) >>> 0) + "万" : (data.value / 10000).toFixed(1) + "万") : data.value.toString();
			this.labelTime.text = "钻石消耗：" + value;
			switch (activityInfo.consumeType) {
				case 1:
					this.labelTime.text = "钻石消耗：" + value;
					break;
				case 2:
					this.labelTime.text = "体力消耗：" + value;
					break;
				case 3:
					this.labelTime.text = "金币消耗：" + value;
					break;
				case 4:
					this.labelTime.text = "总次数：" + value;
					break;
				case 6:
					this.labelTime.text = "格斗次数：" + value;
					break;
				case 9:
					this.labelTime.text = "采集数量：" + value;
					break;
				case 10:
					this.labelTime.text = "抽卡数量：" + value;
					break;
				case 12:
					this.labelTime.text = "击杀数量：" + value;
					break;
				case 16:
					this.labelTime.text = "抽奖数量：" + value;
					break;
				case 17:
					this.labelTime.text = "许愿次数" + value;
					break;
			}
		}
	}
}