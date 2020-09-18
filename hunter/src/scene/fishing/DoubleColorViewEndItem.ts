namespace zj {
//DoubleColorViewEndItem
//yuqingchao
export class DoubleColorViewEndItem extends eui.ItemRenderer {
	private groupCache: eui.Group;
	private lbTIme: eui.Label;
	private imgIcon1: eui.Image;
	private imgIcon2: eui.Image;
	private imgIcon3: eui.Image;
	private imgIcon4: eui.Image;
	private imgIcon5: eui.Image;
	private lbFruit1: eui.Label;
	private lbFruit2: eui.Label;
	private lbFruit3: eui.Label;
	private lbFruit4: eui.Label;
	private lbFruit5: eui.Label;
	private lbAwardPlayer1: eui.Label;
	private lbAwardPlayer2: eui.Label;
	private lbAwardPlayer3: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorViewEndItemSkin.exml";
		cachekeys(<string[]>UIResource["DoubleColorViewAwardItem"], null);
	}
	protected dataChanged() {
		let info = this.data.info;
		closeCache(this.groupCache);
		let num = [];
		let people = [];
		let time: any = null
		if (info != null) {
			let fruit = Game.PlayerDoubleBallSystem.serverFruit(info.redFruit, info.blueFruit);
			time = this.time(info.creatTime);
			for (let i = 0; i < 5; i++) {
				num.push(this.fruitId(fruit[i]));
			}
			people[1] = info.bestCount;
			people[2] = info.firstCount;
			people[3] = info.secondCount;
		}
		for (let i = 1; i < 6; i++) {
			this[`lbFruit${i}`].text = num[i - 1];
		}
		for (let n = 1; n < 4; n++) {
			this[`lbAwardPlayer${n}`].text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter_DoubleColor.reward_people[n - 1], people[n]);
		}
		let des = "%d-" + "%d-" + "%d";
		if (time.M < 10) {
			des = "%d-" + "0" + "%d-" + "%d";
			if (time.D < 10) {
				des = "%d-" + "0" + "%d-" + "0" + "%d";
			}
		} else if (time.D < 10) {
			des = "%d-" + "%d-" + "0" + "%d";
		}

		this.lbTIme.text = Helper.StringFormat(des, time.Y, time.M, time.D);
		setCache(this.groupCache);
	}

	private fruitId(id) {
		return id % 100;
	}

	//时间戳转换为字符串格式
	private time(timestamp: number) {
		let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		return { Y: Y, M: M, D: D };		//年月日时分秒
	}
}
}