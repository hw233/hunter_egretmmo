namespace zj {
/**
 * @author xingliwei 
 * 
 * @time 2019-7-30
 * 
 * @class 猎人念力组合效果长按详情界面
 */
export class CommonDesPsychicGroup extends UI {
	public imgFrame: eui.Image;
	public imgIcon: eui.Image;
	public labelName: eui.Label;
	public labelType: eui.Label;
	public listDes: eui.List;

	private info;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonDesPsychicGroupSkin.exml";
		this.addEventListener(egret.TouchEvent.TOUCH_END, () => { this.close() }, this)
	}

	public SetInfo(groupInfo) {
		this.setPsychicGroupInfo(groupInfo)
		this.setListDes()
	}

	private setPsychicGroupInfo(groupInfo) {
		this.info = groupInfo
		this.imgIcon.source = this.info.path;
		this.labelName.text = this.info.name
		this.labelType.text = (TextsConfig.TextsConfig_HeroMain.level + this.info.psychic.level)
	}

	private setListDes() {
		let talentData = TableGeneralTalent.Item(this.info.group_talent);
		let effectData = TableGeneralTalentEffect.Item(talentData.talent_type * 100 + 1);

		let array = new eui.ArrayCollection();
		for (let i = 0; i < talentData.max_level; i++) {
			let data = new CommonDesPsychicGroupItemData;
			let value = 0;
			let bGetEffect = true;
			if (effectData.effect_value2 && effectData.effect_value2.length > 0) {
				value = effectData.effect_value2[0] + effectData.effect_value2[1] * (i + 1);
			} else {
				value = effectData.effect_value[0] + effectData.effect_value[1] * (i + 1);
			}
			let describeStr = Helper.StringFormat(talentData.talent_describe, value);
			if ((i + 1) == this.info.psychic.level) {
				describeStr = describeStr + TextsConfig.TextsConfig_Hunter_psychic.curAttriEffect
			} else if ((i + 1) > this.info.psychic.level) {
				bGetEffect = false
			}
			data.bGetEffect = bGetEffect;
			data.describeStr = describeStr;
			array.addItem(data);
		}
		this.listDes.dataProvider = array;
		this.listDes.itemRenderer = CommonDesPsychicGroupItem;
	}
}
}