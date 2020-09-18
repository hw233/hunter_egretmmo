namespace zj {
	/** 
	 * @author xing li wei
	 * 
	 * @date 2019-3-29
	 * 
	 * @class 高手进阶
	 */
	export class ActivityNoviceHigh extends noviceBase {
		// public btnClose: eui.Button;
		// public listViewTag: eui.List;
		// public imgBar: eui.Image;
		// public imgBar1: eui.Image;
		// public labelCount: eui.BitmapLabel;
		// public listViewItem: eui.List;
		// public btnGift: eui.Button;
		// public labelTime: eui.Label;
		// public labelTime1: eui.Label;
		// public labelTime2: eui.Label;
		// public labelTime3: eui.Label;
		// public imgbg: eui.Image;

		// public noviceType: number = 1;
		// public typeId: number = 1;
		// public procType: number;
		// public missionType: number;
		// public data: Array<{ [0]: { mission: message.MissionInfo }, [1]: { typeInfo: TableMissionType }, [2]: { _ROW_ITEM: number }, [3]: { index: number }, [4]: { dataInfo: Array<TableMissionItem> }, [5]: { sort: number }, [6]: { lock: boolean }, [7]: { state: Array<number> }, [8]: { finishs: Array<any> | Array<Array<any>> }, [9]: { finish } }>;
		// public tokenNow: number = 0;
		// public tokenAll: number = 0;
		// public sizeCount;
		// public c: number;
		// public array = new eui.ArrayCollection();
		// public index: number = 3;
		// public vislist: boolean = true;
		// public TableEnumNoviceGift = {
		// 	[0]: CommonConfig.missionnew_goods, [1]: CommonConfig.missionnew_reward_one, [2]: CommonConfig.missionnew_reward_two,
		// 	[3]: CommonConfig.missionnew_reward_maqi, [4]: CommonConfig.missionnew_reward_kubi
		// }
		// public NoviceMissionType = {
		// 	[1]: TableEnum.Enum.NoviceType0,
		// 	[2]: TableEnum.Enum.NoviceType1,
		// 	[3]: TableEnum.Enum.NoviceType2,
		// 	[4]: TableEnum.Enum.NoviceTypeMAQI,
		// 	[5]: TableEnum.Enum.NoviceTypeKUBI,
		// }
		// public type;
		// /**用于赋值奖励详情界面有利于界面移除 */
		// public commonDesSkill: Common_PlayerCardPopB | CommonDesGeneral | Common_DesRes | Common_DesProp | ArenaWholePop | Common_DesRandom | PlayerCardPopDialog;
		// /**判断奖励详情界面是否已加载进界面 */
		// public commonDesSkillvis: boolean = false;
		public constructor() {
			super();
			// this.skinName = "resource/skins/activity/ActivityNoviceHighSkin.exml";
			// this.init();
		}
		// public init() {
		// 	super.init();
		// 	this.btnGift.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnGift1, this);
		// 	this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
		// }

		// public setType(type: number) {
		// 	this.noviceType = type;
		// 	this.procType = TableEnum.Enum.TableEnumNovice[this.noviceType - 1];
		// 	this.missionType = TableEnum.Enum.TableNoviceMissionType[this.noviceType - 1];
		// 	this.initAfterSetType();
		// }

		// public initAfterSetType() {


		// 	this.setInfoData();
		// 	this.loadBtnList();
		// 	this.setList();
		// 	this.setInfoCost();
		// }

		// public onBtnGift1() {
		// 	this.btnGift.scaleX = 1.1;
		// 	this.btnGift.scaleY = 1.1;
		// }
		// /**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
		// // public up() {
		// // 	this.btnGift.scaleX = 1;
		// // 	this.btnGift.scaleY = 1;
		// // 	if (this.commonDesSkillvis == true) {
		// // 		this.removeChild(this.commonDesSkill);
		// // 		this.commonDesSkillvis = false;
		// // 	}
		// // }

		// /**奖励详情 */
		// public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
		// 	super.awardParticulars(xy, cx, cy, info);
		// 	// this.commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
		// 	// if (PlayerItemSystem.ItemType(info.goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
		// 	// 	(<CommonDesGeneral>this.commonDesSkill).reSetGeneral();
		// 	// }
		// 	// this.addChild(this.commonDesSkill);
		// 	// this.commonDesSkillvis = true;
		// }
	}
}