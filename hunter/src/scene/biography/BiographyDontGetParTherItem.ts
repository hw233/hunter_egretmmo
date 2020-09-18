namespace zj {
//BiographyDontGetParTherItem
//yuqingchao
//2019.04.18
export class BiographyDontGetParTherItem extends eui.ItemRenderer {
	private index: number = 0;
	private id: number = 0;
	private skillId: number = 0;
	private imgspriteIcon: eui.Image;
	private groupDown: eui.Group;
	private goodsId: number = null;
	private count: number = null;
	private father: Biographyinfo;
	public constructor() {
		super();
		this.skinName = "resource/skins/hunter/HunterDontGetParTnerItemSkin.exml";
		cachekeys(<string[]>UIResource["BiographyDontGetParTherItem"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onShowDessSkill, this);
	}
	protected dataChanged() {
		this.index = this.data.index;
		this.id = this.data.id;
		this.skillId = this.data.skillId;
		this.father = this.data.father;
		this.setUI();
	}
	private setUI() {
		let tbl = Game.ConfigManager.getTable(StringConfig_Table.baseTalent + ".json"); 				//读表
		let tblGen = Game.ConfigManager.getTable(StringConfig_Table.baseSkill + ".json"); 				//读表
		if (this.index == 2) {
			this.imgspriteIcon.source = cachekey(tbl[this.skillId].path, this);
			this.goodsId = tbl[this.skillId].talent_id;
		} else if (this.index == 3) {
			this.imgspriteIcon.source = cachekey(tbl[this.skillId].path, this);
			this.goodsId = tbl[this.skillId].talent_id;
		} else {
			this.imgspriteIcon.source = cachekey(tblGen[this.skillId].path, this);
			this.goodsId = tblGen[this.skillId].skill_id;
		}

	}
	private onShowDessSkill(e: egret.TouchEvent) {
		if (this.index == 2 || this.index == 3) {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { talentId: this.goodsId, generalId: this.id, index: this.index, level: 1, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		} else {
			Game.EventManager.event(GameEvent.SHOW_GOODS_PROPERTY, { skillId: this.goodsId, index: this.index, level: 1, xy: e.localY * 0.75, cx: e.stageX, cy: e.stageY });
		}
	}
	private onShowAwakenSkillInfo() {
		if (this.index == 2 || this.index == 3) {

		} else {
			loadUI(Common_DesSkill).then((dialog: Common_DesSkill) => {
				// let baseGeneralInfo = PlayerHunterSystem.Table(this.goodsId);
				// let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.id);
				// let level = hunterInfo.awakePassive.level + 1;
				// if (hunterInfo.awakePassive.level == 5) {
				// 	level -= 1;
				// }
				dialog.setInfoSkill(this.goodsId, 1, 1);
				dialog.name = "groupAwakenSkillInfoDialog";

				let x = (this.width - dialog.width) * 0.5;
				let y = dialog.height;
				dialog.x = x;
				dialog.y = y;
				this.father.addChild(dialog);
			});
		}

	}
}
}