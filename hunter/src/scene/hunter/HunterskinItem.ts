namespace zj {
	/**
	 * xingliwei
	 * 2019.12.1
	 * @class 皮肤属性子项
	 */
	export class HunterskinItem extends eui.ItemRenderer {
		public imgProperty: eui.Image;
		public labelPlayerInfo: eui.Label;
		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterskinItemSkin.exml";
		}
		protected dataChanged() {
			let data = this.data as HunterskinItemData;
			let info = data.info;
			this.imgProperty.source = this.scour()
			let index = this.data.index + 1;
			let value = info;
			if (value[0] == "cd_speed") {//速度不为百分比值
				this.labelPlayerInfo.text = TextsConfig.TextsConfig_Artifact.attrDes[value[0]] + "+" + value[1];
			} else {
				this.labelPlayerInfo.text = TextsConfig.TextsConfig_Artifact.attrDes[value[0]] + "+" + value[1] + "%";
			}
		}

		private scour(): string {
			let attrDes = {
				general_hp: "ui_hunter_collection_blood_png",
				general_atk: "ui_hunter_collection_atk_png",
				general_def: "ui_hunter_collection_def_png",
				skill_atk: "ui_hunter_collection_xiaoguomingzhong_png",
				skill_def: "ui_hunter_collection_xiaoguodikang_png",
				atk_crit: "ui_hunter_collection_hit_png",
				skill_crit: "技能暴击",
				crit_extra: "ui_hunter_collection_baojishanghai_png",
				crit_resistance: "ui_hunter_collection_baojidikang_png",
				dodge_rate: "ui_hunter_collection_gedang_png",
				hit_rate: "ui_hunter_collection_hushigedang_png",
				ignore_phyDef: "ui_hunter_collection_hushifangyu_png",
				ignore_magicDef: "忽视魔防",
				final_extra: "终伤附加",
				final_reduce: "终伤减免",
				rage_reduce: "怒气减免",
				general_atk_all: "攻击",
				general_def_all: "防御",
				all_crit: "ui_hunter_collection_baoji_png",
				ignore_def_all: "ui_hunter_collection_hushifangyu_png",
				universal_resistance: "异常抵抗",
				ignore_resistance: "忽视异常抵抗",
				float_resistance: "浮空抵抗",
				cd_speed: "ui_hunter_collection_sudu_png"
			}

			return cachekey(attrDes[this.data.info[0]], this)
		}
	}
	export class HunterskinItemData {
		info;
		index;
	}
}
