namespace zj {
	export class MainCityTouchs extends UI {
		public static key_ani: string = "ani";
		public static key_img_flash: string = "imgFlash";
		public static key_img_move: string = "imgMove";
		public static key_img_cloud: string = "imgCloud";
		public static key_img_static: string = "imgStatic";
		public static key_img_car: string = "imgCar";
		public static key_dragon: string = "dragon";
		public static key_img_light: string = "imgLight";

		public constructor() {
			super();
            this.skinName = "resource/skins/main/MainCityTouchsSkin.exml";
		}

		public getBanner(stage): MainCityBanner{
			let bannerGroup = this["banner"];
			// banner.parent.removeChild(banner);
			let group = stage["group" + "_node_map_title"];
			// group.addChild(banner);
			let banner = newUI(MainCityBanner);
			banner.init();
			banner.x = bannerGroup.x;
			banner.y = bannerGroup.y;
			group.addChild(banner);
			return banner;
		}
		
		public initTitles(stage){
			let result = {};
			let list = MainCityTouchTitle.funcIdList;
			for(let i = 0; i < list.length; ++i){
				let touchGroup = this["touchGroup" + list[i]] as eui.Group;
				let touchTitle = this["touchTitle" + list[i]] as MainCityTouchTitle;
				if(touchGroup && touchTitle && touchTitle.parent == touchGroup){
						let lname = touchGroup.parent.name;
						let group = stage[lname + "_node_map_title"];//_node_map_orgin
						touchGroup.parent.removeChild(touchGroup);
						group.addChild(touchGroup);
						touchTitle.initGroup(list[i], touchGroup);
						result[list[i]] = touchTitle;
				} else {
					egret.error("MainTouchTouchs - init - error: " + list[i]);
				}
			}
			return result;
		}
		
		public initMainAnis(key: string){
			let result = [];
			let idx = 0;
			while(this[key + idx]){
				let item = this[key + idx];
				item.touchEnabled = false;
				if(item){
					result.push([item.parent.name, item]);
				}
				++idx;
			}
			if(result.length == 0){
				result = null;
			}
			return result;
		}
	}
}