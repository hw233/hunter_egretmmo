namespace zj {
/**
 * @class 快速上阵
 * 
 * @author LianLei
 * 
 * 2019.05.27
 */
export class Wonderland_Formate extends Dialog {

	private groupAll: eui.Group;
	private groupLeft: eui.Group;
	private groupAddPet: eui.Group;
	private groupAddHero: eui.Group;
	private groupHaloFront: eui.Group;
	private groupHaloBack: eui.Group;
	private btnChangeHunter: eui.Button;
	private btnChangerPet: eui.Button;
	private groupImage: eui.Group;
	private labelPlayerPower: eui.Label;
	private labelTextHeroPowerNum: eui.BitmapLabel;
	private imgHpBar: eui.Image;
	private imgHpBarMask: eui.Image;
	private labelHp: eui.Label;
	private groupBlood: eui.Group;
	private btnPetHelp: eui.Button;
	private groupRight: eui.Group;
	private scrollerHero: eui.Scroller;
	private listHero: eui.List;
	private imgLeftUp: eui.Image;
	private imgRightUp: eui.Image;
	private imgLeftDown: eui.Image;
	private imgRightDown: eui.Image;
	private labelTips: eui.Label;
	private btnAuto: eui.Button;
	private btnOk: eui.Button;
	private btnClose: eui.Button;


	private serverFormat: message.FormationInfo;
	private funcGetGeneral: (serverFormation: message.FormationInfo) => void;
	private isChange: boolean;
	private generalList: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }>;
	private popTips: boolean;
	private type: number;
	private listHeroData: eui.ArrayCollection = new eui.ArrayCollection();
	private tmpChangeGen;
	private tmpMoveIdx;
	private tmpGenID;
	private father;
	private subPower: number;
	private subMaxHp: number;
	private subCurHp: number;
	public barSize: { width: number, height: number };
	private mapRoleId: number;
	private bodySpxId: number;
	private prePetId: number;
	private curPetId: number;

	// 拖动图片
	private moveImg = new eui.Image;
	private moveGId = null;
	private moveIndex = 0;
	private groupPosRect = [];
	private generals: Array<{ level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean }> = [];

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/WonderLand_FormateSkin.exml";
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnOk, this);
		this.btnAuto.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAuto, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnPetHelp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPetHelp, this);
		this.btnChangerPet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangePet, this);
		this.btnChangeHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnChangeHunter, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTapRemoveTween, this);
		this.init();
	}

	public isFullScreen(){
		return true;
	}

	private addEvent() {
		this.scrollerHero.scrollPolicyV = eui.ScrollPolicy.OFF;
		this.scrollerHero.scrollPolicyH = eui.ScrollPolicy.OFF;
		this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);// 拖动list上阵猎人图片
		Game.EventManager.on(GameEvent.DRAG_LOOSEN, this.ondragLoosen, this);// 拖动图片松开时触发
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);// 在舞台上拖动移动

		// list列表猎人拖动数据
		Game.EventManager.on(GameEvent.MOUSE_BEGIN, (e) => {
			let objectData = e.data;
			if (objectData.generalId != 0) {
				this.moveImg.width = 95 * 0.8;
				this.moveImg.height = 93 * 0.8;
				this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
				this.moveImg.visible = false;
				this.moveImg.x = e.stageX - 95 / 2;
				this.moveImg.y = e.stageY - 93 / 2;
				this.moveGId = objectData.generalId;
				this.moveIndex = objectData.index;
			}
		}, this);
		this.addChild(this.moveImg);
	}

	private removeEvent() {
		this.scrollerHero.scrollPolicyV = eui.ScrollPolicy.ON;
		this.moveImg.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);// 拖动list上阵猎人图片
		Game.EventManager.off(GameEvent.DRAG_LOOSEN, this.ondragLoosen, this);// 拖动图片松开时触发
		this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);// 在舞台上拖动移动

		// list列表猎人拖动数据
		Game.EventManager.off(GameEvent.MOUSE_BEGIN, (e) => {
			let objectData = e.data;
			if (objectData.generalId != 0) {
				this.moveImg.width = 95 * 0.8;
				this.moveImg.height = 93 * 0.8;
				this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
				this.moveImg.visible = false;
				this.moveImg.x = e.stageX - 95 / 2;
				this.moveImg.y = e.stageY - 93 / 2;
				this.moveGId = objectData.generalId;
				this.moveIndex = objectData.index;
			}
		}, this);
		this.removeChild(this.moveImg);
	}

	private ondragLoosen() {
		// this.generals = [];
		for (let i = 0; i < this.listHeroData.length; i++) {
			this.onAddToStage(i);
		}
	}

	/**
	 * 拖动list上阵猎人图片
	 */
	private mouseUp(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.DRAG_LOOSEN, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex });
		this.moveImg.visible = false;
		this.moveImg.source = "";
	}

	/**
     * 获取坐标
     */
	public onAddToStage(i) {
		let item = this.listHero.getElementAt(i) as League_WarBattleLineupItem;
		if (item != undefined) {
			// this.generals.push(item.data.generalInfo);

			let worldPointUp = this.listHero.localToGlobal(item.x, item.y);
			worldPointUp.x -= Game.UIManager.x;
			this.groupPosRect[i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, item.width, item.height);

			if (this.groupPosRect[i].contains(this.moveImg.x, this.moveImg.y) == true) {
				// toast("" + i);
				let index = i;
				for (let k = 0; k < this.generals.length; k++) {
					if (this.moveGId == this.generals[k].id) { // 当前拖动的猎人
						// let tmp = this.generals[k];
						let tmp = this.generals[k];
						if (this.generalList[index] == undefined) return;
						this.generals[k] = this.generalList[index];
						this.generals[index] = tmp;
						for (let q = 0; q < this.generals.length; q++) {
							this.generalList[q] = this.generals[q];
						}
						this.refreshList();
						return;
					}
				}

			}
		}
	}

	/**
	 * 在舞台上拖动移动
	 */
	public mouseMove(e: egret.TouchEvent) {
		this.moveIndex = this.listHero.selectedIndex;
		this.moveImg.visible = false;
		this.moveImg.x = e.stageX - 95 / 2;
		this.moveImg.y = e.stageY - 93 / 2;

		let listWorld = this.groupRight.localToGlobal(this.scrollerHero.x - 45, this.scrollerHero.y);
		listWorld.x -= Game.UIManager.x;
		let listRect = new egret.Rectangle(listWorld.x, listWorld.y, this.listHero.width + 45, this.listHero.height);

		if (listRect.contains(this.moveImg.x, this.moveImg.y) == true) {
			this.moveImg.visible = true;
		}
	}







	private init() {
		this.btnChangerPet.visible = false;
		this.generalList = [];
		this.tmpChangeGen = null;
		this.tmpMoveIdx = null;
		this.tmpGenID = null;

		this.Load(message.EFormationType.FORMATION_TYPE_WONDERLAND, Game.PlayerHunterSystem.getWonderlandGeneral);
		if (Game.PlayerAdviserSystem.petInfo == null || Game.PlayerAdviserSystem.petInfo.length == 0) {
			this.btnPetHelp.visible = false;
		}
	}

	private Load(_type: number, funcGetGeneral: (serverFormation: message.FormationInfo) => void) {
		this.serverFormat = Game.PlayerFormationSystem.curFormations[_type - 1];
		if (this.serverFormat.generals[0] == 0) {
			this.serverFormat = Game.PlayerFormationSystem.formatsServer[_type];
		}
		this.funcGetGeneral = funcGetGeneral;
		this.SetPlayerAni();
		this.InitList();
	}


	private InitList() {
		this.generalList = this.funcGetGeneral(this.serverFormat)[0];
		this.isChange = this.funcGetGeneral(this.serverFormat)[1];
		this.generals = this.generalList;

		this.SetList();

		if (this.isChange) {
			this.popTips = false;
			this.SaveFormat();
		}
	}

	private SetPlayerAni() {
		let groupX: number = 14;

		if (this.groupHaloFront == null) {
			this.groupHaloFront = new eui.Group();
			this.groupHaloBack = new eui.Group();

			this.groupAll.addChild(this.groupHaloBack);
			this.groupAll.addChild(this.groupHaloFront);
		}

		// 光环设置
		let haloTbl = PlayerVIPSystem.HaloItem(Game.PlayerInfoSystem.BaseInfo.haloId);

		if (haloTbl != null) {
			let auraCssIdFront = haloTbl.halo_front_aniId;
			let auraCssIdBack = haloTbl.halo_back_aniId;

			let getAinmationInfo = (id: number): [string, number] => {
				let aniUi = TableClientAniUi.Item(id);
				let cssSource = TableClientAniCssSource.Item(aniUi.css_id);
				return [cssSource.name + "_" + cssSource.number, aniUi.index];
			};


			let back1 = getAinmationInfo(auraCssIdBack);
			let front1 = getAinmationInfo(auraCssIdFront);

			// 光环龙骨
			if (auraCssIdFront != null) {
				this.groupHaloFront.removeChildren();
				Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(display => {
					display.x = this.groupHaloFront.explicitWidth / 2;
					display.y = this.groupHaloFront.explicitHeight;
					this.groupHaloFront.addChild(display);
				}).catch(reason => {
					toast(reason);
				});
			}

			if (auraCssIdBack != null) {
				this.groupHaloBack.removeChildren();
				Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(display => {
					display.x = this.groupHaloBack.explicitWidth / 2;
					display.y = this.groupHaloBack.explicitHeight;
					this.groupHaloBack.addChild(display);
				}).catch(reason => {
					toast(reason);
				});
			}
		}

		this.mapRoleId = PlayerVIPSystem.GetMapRoleInfo(Game.PlayerInfoSystem.BaseInfo);
		let bodySpxId = TableMapRole.Item(this.mapRoleId).body_spx_id;
		let scale = TableMapRole.Item(this.mapRoleId).spine_scale;
		let dbName = TableClientFightAniSpineSource.Item(bodySpxId).atlas;
		let animation = TableClientFightAniSpineSource.Item(bodySpxId).ani_name;

		this.groupAddHero.removeChildren();
		// 猎人龙骨
		Game.DragonBonesManager.playAnimation(this, dbName, "armatureName", animation, 0).then(display => {
			display.scaleX = scale;
			display.scaleY = scale;
			display.x = this.groupAddHero.explicitWidth / 2;
			display.y = this.groupAddHero.explicitHeight;
			this.groupAddHero.addChild(display);
		}).catch(reason => {
			toast(reason);
		});

		// 宠物龙骨
		if (Game.PlayerAdviserSystem.petInfo == null || Game.PlayerAdviserSystem.petInfo.length == 0) return;

		let petInfo: message.PetInfo;
		for (let i = 0; i < Game.PlayerAdviserSystem.petInfo.length; i++) {
			let v = Game.PlayerAdviserSystem.petInfo[i];
			if (v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
				petInfo = v;
				break;
			}
		}

		if (petInfo != null) {
			this.groupAddPet.removeChildren();
			this.groupAddPet.visible = true;
			let petTbl = PlayerAdviserSystem.PetBase(petInfo.pet_id)
			let spineId = PlayerAdviserSystem.GetPetEvolution(petInfo.pet_id, petInfo);
			let spineMap: { [key: string]: TableClientAniSpineSource } = TableClientAniSpineSource.Table();
			let spineName: string = spineMap[spineId].atlas

			Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", null, 0).then(display => {
				display.x = this.groupAddPet.explicitWidth / 2 - 40;
				display.y = this.groupAddPet.explicitHeight;
				display.scaleX = 0.5;
				display.scaleY = 0.5;
				this.groupAddPet.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
			if (this.groupAddHero.x == groupX + 60) return;
			this.groupAddHero.x = this.groupAddHero.x + 60;
			this.groupHaloFront.x = this.groupHaloFront.x + 60;
			this.groupHaloBack.x = this.groupHaloBack.x + 60;
		}
		else {
			this.groupAddPet.visible = false;
			this.groupAddHero.x = groupX;
			this.groupHaloFront.x = groupX;
			this.groupHaloBack.x = groupX;
		}
	}

	private SetList() {
		this.type = null;

		this.listHeroData.removeAll();

		for (let i = 0; i < this.generalList.length; i++) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = i;
			itemData.generalInfo = this.generalList[i];
			itemData.itemType = TableEnum.Enum.FastFormatItemType.NORMAL;
			this.listHeroData.addItem(itemData);
		}

		for (let i = this.listHeroData.length; i < PlayerVIPSystem.Item().scene_formation; i++) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = i;
			itemData.generalInfo = null;
			itemData.itemType = TableEnum.Enum.FastFormatItemType.LOCK;
			this.listHeroData.addItem(itemData);
		}

		if (Game.PlayerVIPSystem.NextFastFormatOpenLevel() != -1) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = null;
			itemData.generalInfo = null;
			itemData.itemType = TableEnum.Enum.FastFormatItemType.LOCK;
			this.listHeroData.addItem(itemData);
		}

		for (let [ik, iv] of HelpUtil.GetKV(this.generalList)) {
			if (iv.isNew) {
				this.listHero.selectedIndex = Number(ik);
				break;
			}
		}

		this.listHero.itemRenderer = League_WarBattleLineupItem;
		this.listHero.dataProvider = this.listHeroData;

		this.SetDragType(TableEnum.Enum.LeagueWarDragType.OFF);
	}

	private refreshList() {
		this.listHeroData.removeAll();

		for (let i = 0; i < this.generalList.length; i++) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = i;
			itemData.generalInfo = this.generalList[i];
			itemData.itemType = TableEnum.Enum.FastFormatItemType.NORMAL;
			this.listHeroData.addItem(itemData);
		}

		for (let i = this.listHeroData.length; i < PlayerVIPSystem.Item().scene_formation; i++) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = i;
			itemData.generalInfo = null;
			itemData.itemType = TableEnum.Enum.FastFormatItemType.LOCK;
			this.listHeroData.addItem(itemData);
		}

		if (Game.PlayerVIPSystem.NextFastFormatOpenLevel() != -1) {
			let itemData = new League_WarBattleLineupItemData();
			itemData.father = this;
			itemData.index = null;
			itemData.generalInfo = null;
			itemData.itemType = TableEnum.Enum.FastFormatItemType.LOCK;
			this.listHeroData.addItem(itemData);
		}

		for (let [ik, iv] of HelpUtil.GetKV(this.generalList)) {
			if (iv == undefined) return;
			if (iv.isNew) {
				this.listHero.selectedIndex = Number(ik);
				break;
			}
		}

		this.listHero.itemRenderer = League_WarBattleLineupItem;
		this.listHero.dataProvider = this.listHeroData;
	}

	private SetDragType(type: number) {
		if (this.type == type) return;

		this.type = type;

		this.RunDragAni();

		for (let i = 0; i < this.listHeroData.length; i++) {
			let item = this.listHero.getElementAt(i) as League_WarBattleLineupItem;
			if (item == undefined) continue;
			item.SetDragType(type);

		}

		this.imgLeftUp.visible = (type == TableEnum.Enum.LeagueWarDragType.ON);
		this.imgLeftDown.visible = (type == TableEnum.Enum.LeagueWarDragType.ON);
		this.imgRightUp.visible = (type == TableEnum.Enum.LeagueWarDragType.ON);
		this.imgRightDown.visible = (type == TableEnum.Enum.LeagueWarDragType.ON);

		this.btnAuto.enabled = (type == TableEnum.Enum.LeagueWarDragType.OFF);
		if (type == TableEnum.Enum.LeagueWarDragType.OFF) {
			Set.ButtonBackgroud(this.btnOk, cachekey(UIConfig.UIConfig_Wonderland.sortOpen[1], this), cachekey(UIConfig.UIConfig_Wonderland.sortOpen[2], this), cachekey(UIConfig.UIConfig_Wonderland.sortOpen[3], this));
			this.labelTips.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_tips, (PlayerVIPSystem.Item().scene_formation)));
		}
		else {
			Set.ButtonBackgroud(this.btnOk, cachekey(UIConfig.UIConfig_Wonderland.sortClose[1], this), cachekey(UIConfig.UIConfig_Wonderland.sortClose[2], this), cachekey(UIConfig.UIConfig_Wonderland.sortClose[3], this));
			this.labelTips.text = TextsConfig.TextConfig_League.war_fast_tips2;
		}
	}

	private RunDragAni() {
		egret.Tween.removeTweens(this.imgLeftUp);
		egret.Tween.removeTweens(this.imgRightUp);
		egret.Tween.removeTweens(this.imgLeftDown);
		egret.Tween.removeTweens(this.imgRightDown);
		egret.Tween.get(this.imgLeftUp, { loop: true })
			.to({ x: 10, y: 10 }, 400, egret.Ease.sineOut)
			.to({ x: -10, y: -10 }, 400, egret.Ease.sineIn);

		egret.Tween.get(this.imgLeftDown, { loop: true })
			.to({ x: 10, y: -10 }, 400, egret.Ease.sineOut)
			.to({ x: -10, y: 10 }, 400, egret.Ease.sineIn);

		egret.Tween.get(this.imgRightUp, { loop: true })
			.to({ x: -10, y: 10 }, 400, egret.Ease.sineOut)
			.to({ x: 10, y: -10 }, 400, egret.Ease.sineIn);

		egret.Tween.get(this.imgRightDown, { loop: true })
			.to({ x: -10, y: -10 }, 400, egret.Ease.sineOut)
			.to({ x: 10, y: 10 }, 400, egret.Ease.sineIn);
	}

	private SaveFormat() {
		Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals = [];
		Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves = [];

		for (let [k, v] of HelpUtil.GetKV(this.generalList)) {
			if (Number(k) < 4) {
				Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].generals.push(v.id);
			}
			else {
				Game.PlayerFormationSystem.curFormations[message.EFormationType.FORMATION_TYPE_WONDERLAND - 1].reserves.push(v.id);
			}
		}

		Game.PlayerWonderLandSystem.SetFormatReqOnly()
			.then((value: any) => {
				this.SetDragType(TableEnum.Enum.LeagueWarDragType.OFF);
				if (this.popTips) {
					toast_success(TextsConfig.TextsConfig_Wonderland.auto_format_success);
					this.popTips = false;
				}
			})
			.catch((reason) => {

			});
	}

	public SetFather(father) {
		this.father = father;
		this.InitPlayerInfo();
	}

	private InitPlayerInfo() {
		this.subPower = 0;
		this.subMaxHp = 0;
		this.subCurHp = 0;

		for (let [k, v] of HelpUtil.GetKV(this.generalList)) {
			this.subPower = this.subPower + v.battle;
			this.subMaxHp = this.subMaxHp + Number(v.maxHp);
			this.subCurHp = this.subCurHp + v.maxHp * v.hp;
		}
		let subCurHp = this.subMaxHp;

		if (this.father.scene != null) {
			subCurHp = this.father.scene.playerLeader.sceneHpPercent * this.subMaxHp / 100;
		}

		this.labelPlayerPower.text = Set.NumberUnit3(this.subPower);
		this.labelHp.text = Helper.StringFormat(TextsConfig.TextConfig_League.war_fast_format_hp, Set.NumberUnit3(Math.floor(subCurHp)), Set.NumberUnit3(Math.floor(this.subMaxHp)));
		// let size_bar = getPercentSize(this.barSize, subCurHp / this.subMaxHp);
		// this.imgHpBar.width = this.barSize.width;
		this.imgHpBar.mask = this.imgHpBarMask;

		let size_bar = getPercentSize(this.imgHpBarMask, subCurHp / this.subMaxHp);
		// size_bar.width = 100;
		this.imgHpBarMask.width = size_bar.width;
		// this.imgHpBar.width = this.imgHpBar.width - size_bar.width;
	}

	public onBtnOk() {
		if (this.type == TableEnum.Enum.LeagueWarDragType.OFF) {
			this.addEvent();
			this.SetDragType(TableEnum.Enum.LeagueWarDragType.ON);
			// this.scrollerHero.enabled = false;
		}
		else {
			// this.scrollerHero.enabled = true;
			this.removeEvent();
			this.popTips = true;
			this.SaveFormat();
			this.SetDragType(TableEnum.Enum.LeagueWarDragType.OFF);
		}
	}

	private onBtnAuto() {
		let tempList = this.generalList;
		this.generalList = null;
		this.generalList = Game.PlayerHunterSystem.getWonderlandGeneral(null)[0];
		for (let [gk, gv] of HelpUtil.GetKV(this.generalList)) {
			gv.isNew = false;
		}
		let is_eq = true;
		if (tempList.length == this.generalList.length) {
			for (let [gk, gv] of HelpUtil.GetKV(this.generalList)) {
				if (tempList[Number(gk)].id != gv.id) {
					is_eq = false;
					break;
				}
			}
		}
		else {
			is_eq = false;
		}

		if (!is_eq) {
			this.SetList();
			this.popTips = true;
			this.SaveFormat();
		}
		else {
			toast_success(TextsConfig.TextsConfig_Wonderland.auto_format_success);
		}
	}

	private onBtnPetHelp() {
		loadUI(Wonderland_PropertyView)
			.then((dialog: Wonderland_PropertyView) => {
				dialog.show(UI.SHOW_FROM_TOP);
			});
	}

	private onBtnChangeHunter() {
		TipManager.ShowChangeIcon((picId) => {
			this.ReqModifyUserHeadBefore(picId);
		});
	}

	private ReqModifyUserHeadBefore(headId: number) {
		if (headId != Game.PlayerInfoSystem.BaseInfo.picId) {
			Game.PlayerWonderLandSystem.ReqModifyUserInfo(headId, null, null, null)
				.then((value: any) => {
					this.SetPlayerAni();
					if (this.father != null && this.father.SpriteHead != null) {
						this.father.SpriteHead.source = cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this);
					}
				})
				.catch((reason) => {

				});
		}
	}

	private onBtnChangePet() {
		if (Game.PlayerAdviserSystem.petInfo == null || Game.PlayerAdviserSystem.petInfo.length == 0) {
			toast_warning(TextsConfig.TextsConfig_DarkLand.noPetCanSelect);
		}
		else {
			TipManager.ShowChangePet((petInfo) => {
				this.ReqModifyPet(petInfo)
			});
		}
	}

	private ReqModifyPet(petInfo: message.PetInfo) {
		let prePetId: number = null;
		let curPetId: number = null;
		let prePetInfo: message.PetInfo;

		for (let i = 0; i < Game.PlayerAdviserSystem.petInfo.length; i++) {
			let v = Game.PlayerAdviserSystem.petInfo[i];
			if (v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION) {
				prePetInfo = v;
				break;
			}
		}

		prePetId = prePetInfo != null ? prePetInfo.pet_id : null;

		if (petInfo != null) {
			curPetId = petInfo.pet_id;
			if (curPetId == prePetId) {
				return;
			}
		}
		else {
			curPetId = prePetId
		}

		if (prePetId != null || curPetId != null) {
			this.prePetId = prePetId;
			this.curPetId = curPetId;

			Game.PlayerWonderLandSystem.ReqModifyCarryPet(curPetId)
				.then((value: any) => {
					if (this.prePetId != this.curPetId && this.prePetId != null) {
						Game.PlayerAdviserSystem.petMap[this.prePetId].situtation = 0;

						let key: number;
						for (let i = 0; i < Game.PlayerAdviserSystem.petInfo.length; i++) {
							let v = Game.PlayerAdviserSystem.petInfo[i];
							if (v.pet_id == this.prePetId) {
								key = v.pet_id;
								break;
							}
						}

						if (key != null) {
							Game.PlayerAdviserSystem.petMap[key].situtation = 0;
						}
					}

					this.SetPlayerAni();
				})
				.catch((reason) => {

				});
		}
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
		if (this.father.scene != null) {
			this.father.scene.playerLeader.resetBody(this.mapRoleId);

			if (this.father.scene.playerLeaderPet != null && Game.PlayerAdviserSystem.petInfo != null && Game.PlayerAdviserSystem.petInfo.length != 0) {
				let petInfo = Table.FindR(Game.PlayerAdviserSystem.petInfo, function (_k, _v) {
					return _v.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION;
				});
				this.father.scene.playerLeaderPet.resetPetBody(petInfo);
			}

		}
		this.father.imgHead.source = (cachekey(PlayerItemSystem.ItemPath(Game.PlayerInfoSystem.BaseInfo.picId), this));
	}

	private onTapRemoveTween() {
		let item = this.listHero.getElementAt(this.listHero.selectedIndex) as League_WarBattleLineupItem;
		if (item == null || item == undefined) return;
		if (item.dragType == TableEnum.Enum.LeagueWarDragType.ON) return;
		item.clearTouchTween();
	}
}
}