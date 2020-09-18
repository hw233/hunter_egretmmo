namespace zj {
//FishingMainItem
//yuqingchao
//2019.05.16
//FishingMainItem
//yuqingchao
export class FishingMainItem extends eui.ItemRenderer {

	private imgBoard: eui.Image;
	private imgFish: eui.Image;
	private imgLable: eui.Image;
	private lbTime: eui.Label;
	private id: number = null;

	public constructor() {
		super();
		//
		//yuqingchao
		this.skinName = "resource/skins/fishing/FishingMainItemSkin.exml";
		cachekeys(<string[]>UIResource["FishingMainItem"], null);
	}
	protected dataChanged() {
		this.id = this.data.id;
		this.setFishInfo();
	}
	private setFishInfo() {
		let fishTbl = Game.ConfigManager.getTable(StringConfig_Table.leagueFish + ".json");
		let fish = fishTbl[this.id];
		this.imgLable.source = cachekey(fish.image_title, this);
		this.imgBoard.source = cachekey(fish.image_board, this);
		this.imgFish.source = cachekey(fish.fish_image, this);
		let costTime = fish.fishing_duration;
		this.lbTime.text = Helper.StringFormat(TextsConfig.TextConfig_League.fish_costTime, this.formatTime(costTime));
	}
	private formatTime(sec) {
		let time = null;
		if (sec < 60) {
			time = sec + TextsConfig.TextConfig_League.fish_costTime_sec;
		} else if (sec % 60 != 0) {
			time = Math.ceil(sec / 60) + TextsConfig.TextConfig_League.fish_costTime_min + sec % 60 + TextsConfig.TextConfig_League.fish_costTime_sec;
		} else {
			time = Math.ceil(sec / 60) + TextsConfig.TextConfig_League.fish_costTime_min;
		}
		return time;
	}
}
}