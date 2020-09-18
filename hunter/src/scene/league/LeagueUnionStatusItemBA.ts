namespace zj {
export class LeagueUnionStatusItemBA extends eui.ItemRenderer {

	private lbTeamStatus: eui.Label;
	private imgHeroFrame0: eui.Image;
	private imgIcon0: eui.Image;
	private imgHeroFrame1: eui.Image;
	private imgIcon2: eui.Image;
	private imgHeroFrame2: eui.Image;
	private imgIcon3: eui.Image;
	private imgHeroFrame3: eui.Image;
	private imgIcon4: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueUnionStatusItem2Skin.exml";
	}

	protected dataChanged() {
		let info = this.data.info;
		if (info.isBreak) {
			let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.union_status[8], info.name, info.formationIndex);
			this.lbTeamStatus.textFlow = Util.RichText(str);
		}
		else {
			let str = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Match.union_status[7], info.name, info.formationIndex);
			this.lbTeamStatus.text = str;
		}
		let formation = info.simpleFormation.generals;
		for (let k in formation) {
			let v = formation[k];
			if (v.general_id != 0) {
				this["imgIcon" + k].source = cachekey(PlayerHunterSystem.Head(v.general_id), this);
				this["imgHeroFrame" + k].source = cachekey(UIConfig.UIConfig_Role.heroFrame[v.step], this);
			}
		}

	}
}
}