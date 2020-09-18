namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-20
 * 
 * @class 执照考试
 */
export class licenseExamination extends Dialog {
	private imgSelCard: eui.Image;
	private btnClose: eui.Button;
	private labelStarNumber: eui.BitmapLabel;
	private imgNpc: eui.Image;
	private labelExamination1: eui.Label;
	private labelExamination2: eui.Label;
	private listSkill: eui.List;
	private btnStar: eui.Button;
	private imgTitle: eui.Image;
	private level: number
	private father: licenseMain;
	private licenseArray = [];
	private type: number;
	public constructor() {
		super();
		this.skinName = "resource/skins/license/licenseExaminationSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnStar.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnStar, this);
	}

	public setInfo(level: number, index: number, type: number, father: licenseMain) {
		this.level = level + 1;
		this.type = type;
		let tbl = Game.PlayerMissionSystem.itemLicense(level + 1);
		this.labelExamination1.text = tbl.examination_name;
		this.labelExamination2.text = tbl.examination_des;
		this.labelStarNumber.text = index.toString();
		let path = TableMapRole.Item(tbl.boss_roleId[0]).half_path;
		this.imgNpc.source = cachekey(path, this);
		this.father = father;
		this.loadList(level + 1);
		if (type == 2) {
			this.labelStarNumber.x = 290;
			this.labelStarNumber.y = -3;
		}
		this.licenseArray = [tbl.examination_name, tbl.boss_roleId[0], this.level];
		this.imgTitle.source = UIConfig.UIConfig_Task.titleEH[type];
	}

	private loadList(level) {
		let array = new eui.ArrayCollection();
		let feature = TableMissionLicence.Item(level).feature;
		for (let i = 0; i < feature.length; i++) {
			let data = new licenseExaminationSkillData;
			data.feature = feature[i];
			array.addItem(data);
		}
		this.listSkill.dataProvider = array;
		this.listSkill.itemRenderer = licenseExaminationSkill;
	}

	private onBtnStar() {
		Game.PlayerMissionSystem.MobsInfo(message.EFormationType.FORMATION_TYPE_MISSION_LICENCE, this.level)
			.then(() => {
				Game.PlayerMissionSystem.licenseCurPos = this.level;
				Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_MISSION_LICENCE;
				loadUI(CommonFormatePveMain)
					.then((dialog: CommonFormatePveMain) => {
						Game.EventManager.event(GameEvent.LICENSE_ITEM, { licenseArray: this.licenseArray });
						dialog.show(UI.SHOW_FROM_TOP);
						if (this.type == 1) {
						dialog.setInfo(this.father.focusCur);
						} else if (this.type == 2) {
							dialog.setInfo(this.father.focusCurH + CommonConfig.licence_max_level)
						}
					});
			})
			.catch(() => {

			})
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}
}