namespace zj {
export class League_WarSelectThingItem extends eui.ItemRenderer {

	private ButtonEvent: eui.Button;
	private LabelThingName: eui.Label;
	private LabelThingDes: eui.Label;
	private SpriteAction: eui.Image;

	private time: number;
	private thing: any;
	private id: number;
	private bVisible: boolean;
	private father: League_WarSelectThings;

	public constructor() {
		super();
		this.skinName = "resource/skins/fight/League_WarSelectThingItemSkin.exml";
		cachekeys(<string[]>UIResource["League_WarSelectThingItem"], null);
		this.init();
	}

	public init() {
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeClose, this);
		this.ButtonEvent.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonReturn, this);
		this.time = egret.setInterval(this.Update, this, 330);
	}

	protected dataChanged() {
		this.SetItemInfo(this.data);
	}

	private SetItemInfo(data: League_WarSelectThingItemData) {
		this.id = data.index;
		this.thing = data.thing;
		this.father = data.father;
		this.SpriteAction.source = cachekey(UIConfig.UIConfig_RpgScene.warActionIcon[this.thing.type], this);
		this.LabelThingDes.visible = false;
		this.bVisible = false;

		if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Person) {
			this.LabelThingName.text = this.thing.data.playerInfo.name;
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Building) {
			this.LabelThingName.text = this.thing.data.info.build_name;
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Partner) {
			this.LabelThingName.text = this.thing.data.playerInfo.name;
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Npc) {
			this.LabelThingName.text = this.thing.data.info.build_name;
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Grass) {
			this.LabelThingName.text = this.thing.data.info.tree_name;
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Mob) {
			let num = Number(this.thing.data.playerInfo.name);
			let data = TableLanguage.Item(this.thing.data.playerInfo.name);
			let text = (num && data) ? (data.ch == null ? data['zhcn'] : data.ch) : this.thing.data.playerInfo.name;
			this.LabelThingName.text = text;
		}
	}

	private procPerson() {
		if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Person || this.thing.type == TableEnum.Enum.LeagueWarTouchType.Partner) {
			if (this.thing.data.bProgressing == true && this.bVisible == false) {
				this.LabelThingDes.visible = true;
				this.bVisible = true;
			}

			if (this.thing.data.bProgressing == false && this.bVisible == true) {
				this.LabelThingDes.visible = false;
				this.bVisible = false;
			}

			if (this.thing.data.bProgressing == true && this.bVisible == true) {
				let value = this.thing.data.controlFrame / this.thing.data.controlMaxFrame * 100;
				let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.person_gather, value);
				this.LabelThingDes.text = _tmp;
			}
		}
	}

	private procTree() {
		if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Grass) {
			if (this.bVisible == false) {
				this.LabelThingDes.visible = true;
				this.bVisible = true;
			}

			if (this.bVisible == true) {
				if (this.thing.data.bMature == false) {
					if (this.thing.data.unkonwnTime == false) {
						let _str = Helper.FormatMsTime3(this.thing.data.matureTime / 1000);
						let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
						this.LabelThingDes.text = _tmp;
					}
					else {
						this.LabelThingDes.text = TextsConfig.TextsConfig_Wonderland.fruit_unknown_time_lable;
					}
				}
				else {
					let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, this.thing.data.fruitCnt);
					this.LabelThingDes.text = _tmp;
				}
			}
		}
	}

	private ButtonReturn() {
		this.father.onBtnClose();

		// 安全区域检测
		let fightId = this.thing.type == TableEnum.Enum.LeagueWarTouchType.Person && this.thing.data.playerInfo.id || 0;
		let scene = StageSceneManager.Instance.GetCurScene();
		let canDo = scene.delSafeAreaCheck(this.thing.type, fightId);

		if (!canDo) return;
		if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Person) {
			scene.collideObjectReq(this.thing.data.playerInfo.id, null);
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Mob) {
			scene.collideObjectReq(this.thing.data.playerInfo.id, null);
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Building) {
			scene.controlBuildReq(this.thing.data.info.build_id, null);
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Partner) {
			scene.pushPersonInterface(this.thing.data.playerInfo);
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Npc) {
			if (this.thing.data.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
				loadUI(ExchangeMainSence).then((scene: ExchangeMainSence) => {
					scene.show(UI.SHOW_FROM_TOP);
				});
			}
			else if (this.thing.data.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Mora) {
				loadUI(MoraMainScene).then((scene: MoraMainScene) => {
					scene.Init();
					scene.show(UI.SHOW_FROM_TOP);
				});
			}
			else if (this.thing.data.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Fish) {
				loadUI(FishingMain).then((dialog: FishingMain) => {
					dialog.show(UI.SHOW_FROM_TOP);
				});
			}
			else {
				return;
			}
		}
		else if (this.thing.type == TableEnum.Enum.LeagueWarTouchType.Grass) {
			scene.wonderlandCollectionReq(this.thing.data.scenePosInfo.roleBase.id, null);
		}

	}

	private removeClose() {
		this.father = null;
		egret.clearInterval(this.time);
	}

	public Update() {
		this.procPerson();
		this.procTree();
	}
}

export class League_WarSelectThingItemData {
	index: number;
	thing: any;
	father: League_WarSelectThings;
}
}