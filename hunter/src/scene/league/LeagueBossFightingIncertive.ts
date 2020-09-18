namespace zj {
//LeagueBossFightingIncertive
//yuqingchao
//2019.03.08
export class LeagueBossFightingIncertive extends eui.ItemRenderer {
	private lbTitle: eui.Label;
	private lbTip: eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossFightingIncertiveSkin.exml"
	}
	protected dataChanged() {
		let i = this.data.i;
		let info = this.data.info;
		let buffDes = Game.ConfigManager.getTable(StringConfig_Table.buff + ".json");		//buff
		this.lbTip.text = buffDes[info].buff_des;
		this.lbTitle.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_buff, i+1);
	}
}
}