namespace zj {
	export class MainCityTouchTitle extends UI {

		public static funcIdList: number[] = [0, // 0-酒馆
				message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE,// 1-工会
				message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER,// 2-格斗
				message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER,// 5-天空竞技场
				message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2,// 62-黑暗大陆
				message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED,// 7-流星街
				message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL,// 26-商店
				message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3// 37-大草原（贪婪之岛）
		];

		public static movePosList = {
			0: [1200, 424],// 0-酒馆
			1: [2055, 424],// 1-工会
			2: [2400, 424],// 2-格斗
			5: [1484, 424],// 5-天空竞技场
			62: [2856, 406],// 6-黑暗大陆
			7: [660, 406],// 7-流星街
			26: [1844, 462],// 26-商店
			37: [250, 416]// 37-大草原（贪婪之岛）
		};

		public static getFuncIdx(type: number): number{
			for(let i = 0; i < this.funcIdList.length; ++i){
				if(type == this.funcIdList[i]){
					return i;
				}
			}
			return -1;
		}

		private groupTitle: eui.Group;
		// private imgBtn: eui.Image;
		private imgFlagPub: eui.Image;
		private groupLock: eui.Group;
		private lbOpenLevel: eui.Label;
		private lbName: eui.Label;

		// private resSourceUp: string;
		// private resSourceDown: string;

		private isOpen: boolean;
		public type: message.FunctionOpen;
		private touchGroup: eui.Group;
		private redFunc: Function;
		private thisObj: any;
		private touchCall: Function;
		private touchThis: any;
		public constructor() {
			super();
		}
		public initGroup(type: message.FunctionOpen, touchGroup: eui.Group){
			this.imgFlagPub.visible = this.groupLock.visible = false;
			this.type = type;
			this.touchGroup = touchGroup;
			touchGroup.name = "touchGroup" + type;
			this.groupTitle.name = "titleGroup" + type;
			if(type == 0){
				this.lbName.text = "招募";
			} else {
				let item = TableFunctionOpen.Item(this.type);
				this.lbName.text = item.name;
			}
			// switch (this.type) {
			// 	case 0:// 酒馆
			// 		this.resSourceUp = "ui_mainui_BtnPubNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnPubSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_LEAGUE:// 1工会
			// 		this.resSourceUp = "ui_mainui_BtnUnionNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnUnionSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_LADDER:// 2格斗
			// 		this.resSourceUp = "ui_mainui_BtnHunterCambatfieldNor_png";
			// 		this.resSourceDown = "ui_mainui_btnHunterCambatfieldSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_TOWER:// 5天空竞技场
			// 		this.resSourceUp = "ui_mainui_BtnSkyArenaNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnSkyArenaSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2:// 62黑暗大陆
			// 		this.resSourceUp = "ui_mainui_BtnDarkContinentNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnDarkContinentSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_WANTED:// 7流星街
			// 		this.resSourceUp = "ui_mainui_BtnMeteorStreetNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnMeteorStreetSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_MALL:// 26商店
			// 		this.resSourceUp = "ui_mainui_BtnShopingMallNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnShopingMallSel_png";
			// 		break;
			// 	case message.FunctionOpen.FUNCTION_OPEN_TYPE_WONDERLAND_3:// 37大草原
			// 		this.resSourceUp = "ui_mainui_BtnGreedyIslandNor_png";
			// 		this.resSourceDown = "ui_mainui_BtnGreedyIslandSel_png";
			// 		break;
			// }
			this.setUp();
		}
		public init(touchCall: Function, touchThis: any, redFunc: Function = null, thisObj: any = null) {
			this.touchCall = touchCall;
			this.touchThis = touchThis;
			this.redFunc = redFunc;
			this.thisObj = thisObj;
			this.setUp();
			this.addListeners();
		}

		private addListeners() {
			this.groupTitle.touchChildren = false;
			this.addListener(this.groupTitle);
			this.addListener(this.touchGroup);
		}

		private addListener(group: eui.Group){
			group.touchEnabled = true;
			group.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
			group.addEventListener(egret.TouchEvent.TOUCH_END, this.setUp, this);
			group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUp, this);
		}

		public getTouchGroup(){
			return this.touchGroup;
		}
		// private removeListeners() {
		// 	this.removeListener(this.groupTitle);
		// 	this.removeListener(this.touchGroup);
		// }

		// private removeListener(group: eui.Group) {
		// 	group.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setDown, this);
		// 	group.removeEventListener(egret.TouchEvent.TOUCH_END, this.setUp, this);
		// 	group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchUp, this);
		// }

		private setUp(){
			// this.imgBtn.source = this.resSourceUp;
		}

		private setDown(){
			// this.imgBtn.source = this.resSourceDown;
		}

		public refreshState(isAlert: boolean = false) {
			let item = TableFunctionOpen.Item(this.type);
			if(item){
				this.isOpen = item ? PlayerHunterSystem.LevelDBFunOpenTo(this.type, isAlert) : true;
				this.groupLock.visible = !this.isOpen;
				if (this.isOpen) {
					if(this.redFunc){
						this.imgFlagPub.visible = this.redFunc.call(this.thisObj);
					} else {
						this.imgFlagPub.visible = false;
					}
					return true;
				}
				else {
					let str = Helper.StringFormat(TextsConfig.TextsConfig_Common.openAutoLv, item.condition);
					this.lbOpenLevel.text = str;
					// if(isAlert){
					// 	toast_warning(item.unopen_tip);
					// 	// toast(str);
					// }
				}
				return false;
			}
			return true;
		}
		private onTouchDown(){
			this.setDown();
			this.touchCall.call(this.touchThis, this, 0);
		}
		private onTouchUp() {
			this.touchCall.call(this.touchThis, this, 1);
		}

		public getTouchRandom(){
			if(this.type == message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND2){
				return this.touchGroup.width / 4;
			}
			return this.touchGroup.width / 3;
		}

		public close(animation?: string) {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.close, this);
            if (this.parent) this.parent.removeChild(this);
			// this.removeListeners();
		}
	}
}