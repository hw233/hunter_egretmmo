namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-20
 * 
 * @class 执照考试界面考试特性
 */
export class licenseExaminationSkill extends eui.ItemRenderer {
	private imgBoard: eui.Image;
	private imgIcon: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/license/licenseExaminationSkillSkin.exml"
		cachekeys(<string[]>UIResource["licenseExaminationSkill"], null);
	}

	/** 修改数据源被动执行*/
	protected dataChanged() {
		let data = this.data as licenseExaminationSkillData;
		let info = TableClientWantedMobsFeature.Item(data.feature);
		let frame = PlayerItemSystem.QualityFrame(info.quality);
		this.imgBoard.source = cachekey(frame, this);
		this.imgIcon.source = cachekey(info.path, this);
	}
}
export class licenseExaminationSkillData {
	feature;
}
}