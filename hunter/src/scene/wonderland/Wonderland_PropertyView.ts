namespace zj {
/**
 * 
 *  2019-5-29 
 * @class 贪婪之岛 阵容  详情
 */
export class Wonderland_PropertyView extends Dialog {
	public btnClose: eui.Button;
	public scrollerTableView: eui.Scroller;
	public listTableView: eui.List;
	public scrollerTableViewB: eui.Scroller;
	public listTableViewB: eui.List;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/Wonderland_PropertyViewSkin.exml";
		this.init();
	}

	private init() {
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

		this.setLeftList();
		this.setRightList();
	}

	private setLeftList() {
		let attriResult = Helper.CreateGeneralAttrTbl();
		for (let k in Game.PlayerAdviserSystem.petInfo) {
			if (Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
				let v = Game.PlayerAdviserSystem.petInfo[k];
				let petTbl = TableBasePet.Item(v.pet_id);
				if (petTbl) {
					for (let i = 0; i < TableEnum.EnumGelAttribName.length; i++) {
						let typeName = TableEnum.EnumGelAttribName[i];
						if (petTbl[typeName] != null) {
							for (let j = 0; j < v.star; j++) {
								attriResult[i] = attriResult[i] + petTbl[typeName][j];
							}
						}
					}
					for (let i = 0; i < v.step + 1; i++) {
						let skillId = petTbl.skill_island[i];
						if (skillId != null && skillId != 0) {
							let skillTbl = TablePetSkill.Item(skillId);
							if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
								let attrKey = skillTbl.attri_add[0];
								let attrValue = skillTbl.attri_add[1];
								attriResult[attrKey] = attriResult[attrKey] + attrValue;
							}
						}
					}
				}
			}
		}

		let otherSkillTbl = []
		for (let i = message.PetSkillType.PET_SKILL_TYPE_ATTRI; i <= message.PetSkillType.PET_SKILL_TYPE_FUHUO; i++) {
			let curTbl = {
				key: i + 1000,
				value: 0
			}
			otherSkillTbl.push(curTbl);
		}
		for (let k in Game.PlayerAdviserSystem.petInfo) {
			if (Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
				let v = Game.PlayerAdviserSystem.petInfo[k];
				let petTbl = TableBasePet.Item(v.pet_id);
				if (petTbl) {
					for (let kk in petTbl.skill_island) {
						if (petTbl.skill_island.hasOwnProperty(kk)) {
							let vv = petTbl.skill_island[kk];
							if (vv != 0) {
								let skillTbl = TablePetSkill.Item(vv);
								if (skillTbl.b_fight == 1 && skillTbl.type != message.PetSkillType.PET_SKILL_TYPE_ATTRI) {
									if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_QIANG) {
										let value = otherSkillTbl[skillTbl.type].value + skillTbl.rand[1]
										if (value >= 100) {
											value = 100
										}
										otherSkillTbl[skillTbl.type - 1].value = value
									} else {
										otherSkillTbl[skillTbl.type - 1].value = otherSkillTbl[skillTbl.type - 1].value + Number(skillTbl.value)
									}
								}
							}
						}
					}
				}
			}
		}

		let tbl = [];
		for (let k in attriResult) {
			if (attriResult.hasOwnProperty(k)) {
				let v = attriResult[k];
				let curTbl = {
					key: k,
					value: v
				}
				if (v != 0) {
					tbl.push(curTbl);
				}
			}
		}
		for (let k in otherSkillTbl) {
			if (otherSkillTbl.hasOwnProperty(k)) {
				let v = otherSkillTbl[k];
				if (v.value > 0) {
					tbl.push(v);
				}
			}
		}
		let array = new eui.ArrayCollection();
		for (let i = 0; i < tbl.length; i++) {
			let data = new Wonderland_PropertyViewItemData();
			data.index = i;
			data.info = tbl[i];
			data.father = this;
			array.addItem(data);
		}
		this.listTableView.dataProvider = array;
		this.listTableView.itemRenderer = Wonderland_PropertyViewItem;
	}

	private setRightList() {
		let otherSkillTbl = []
		for (let i = message.PetSkillType.PET_SKILL_TYPE_ATTRI; i <= message.PetSkillType.PET_SKILL_TYPE_FUHUO; i++) {
			let curTbl = {
				key: i + 1000,
				value: 0
			}
			otherSkillTbl.push(curTbl);
		}
		for (let k in Game.PlayerAdviserSystem.petInfo) {
			if (Game.PlayerAdviserSystem.petInfo.hasOwnProperty(k)) {
				let v = Game.PlayerAdviserSystem.petInfo[k];
				let petTbl = TableBasePet.Item(v.pet_id);
				if (petTbl) {
					for (let kk in petTbl.skill_island) {
						if (petTbl.skill_island.hasOwnProperty(kk)) {
							let vv = petTbl.skill_island[kk];
							if (vv != 0 && (Number(kk) <= (v.step + 1))) {
								let skillTbl = TablePetSkill.Item(vv);
								if (skillTbl.b_fight == 0) {
									if (skillTbl.type == message.PetSkillType.PET_SKILL_TYPE_QIANG) {
										let value = otherSkillTbl[skillTbl.type].value + skillTbl.rand[0]
										if (value >= 100) {
											value = 100
										}
										otherSkillTbl[skillTbl.type - 1].value = value
									} else {
										otherSkillTbl[skillTbl.type - 1].value = otherSkillTbl[skillTbl.type - 1].value + Number(skillTbl.value)
									}
								}
							}
						}
					}
				}
			}
		}
		let tbl = [];
		for (let k in otherSkillTbl) {
			if (otherSkillTbl.hasOwnProperty(k)) {
				let v = otherSkillTbl[k];
				if (v.value > 0) {
					tbl.push(v);
				}
			}
		}
		let array = new eui.ArrayCollection();
		for (let i = 0; i < tbl.length; i++) {
			let data = new Wonderland_PropertyViewItemData();
			data.info = i;
			data.info = tbl[i];
			data.father = this;
			array.addItem(data);
		}
		this.listTableViewB.dataProvider = array;
		this.listTableViewB.itemRenderer = Wonderland_PropertyViewItem;

	}


	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}