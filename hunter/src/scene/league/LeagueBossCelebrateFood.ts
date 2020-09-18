namespace zj {
//公会BOSS-庆功宴Item
//yuqingchao
//2019.03.11
export class LeagueBossCelebrateFood extends eui.ItemRenderer {
	private imgFood: eui.Image;
	private btnGraEat: eui.Button;			//感恩的吃
	private btnAddFood: eui.Button;			//加菜
	private btnEat: eui.Button;				//吃
	private imgGold: eui.Image;
	private lbMoney: eui.Label;
	private lbAdd: eui.Label;
	private imgBack: eui.Image;
	private type: number;
	private process: message.ProgressInfo = null;
	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossCelebrateFoodSkin.exml";
		this.btnEat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEat, this);
		this.btnGraEat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGraEat, this);
		this.btnAddFood.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddFood, this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, this.refreash, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_PARTY, this.refreash, this);
		}, null);
	}
	protected dataChanged() {
		let i = this.data.i;
		this.type = this.data.type;
		let num = this.data.num;
		this.refreash();
	}
	private refreash() {
		if (this.type == TableEnum.Enum.League_CelebrateType.NORMAL) {
			this.setNormal();
		}
		if (this.type == TableEnum.Enum.League_CelebrateType.ADD) {
			this.setAdd();
		}
	}
	private setNormal() {
		let tm = Game.PlayerLeagueSystem.Member.party_time;
		this.btnEat.visible = true;
		this.btnAddFood.visible = false;
		this.btnGraEat.visible = false;

		this.imgBack.visible = false;
		this.imgGold.visible = false;
		this.lbMoney.visible = false;
		this.lbAdd.visible = false;
		let a = Game.PlayerLeagueSystem.Member.party_time;
		if (Game.PlayerLeagueSystem.Member.party_time == 0) {
			this.btnEat.enabled = true;
		}
		else if (Game.PlayerLeagueSystem.Member.party_time > 0) {
			this.btnEat.enabled = false;
		}
		this.imgFood.source = cachekey(UIConfig.UIConfig_League.leagueAddFood[0], this);
	}
	private setAdd() {
		this.btnEat.visible = false;
		this.btnAddFood.visible = false;
		this.btnGraEat.visible = false;

		this.process = Table.FindR(Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
			if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_PARTY) {
				return true;
			}
		})[0];
		this.imgFood.source = cachekey(UIConfig.UIConfig_League.leagueAddFood[1], this);
		if (this.process.info == 0) {
			Helper.SetImageFilterColor(this.imgFood, "gray");
			this.btnAddFood.visible = true;
			this.imgBack.visible = true;
			this.lbAdd.visible = true;
			this.imgGold.visible = true;
			this.lbMoney.visible = true;
			this.lbMoney.text = CommonConfig.league_party_add_consume.toString();
			this.lbAdd.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_celeNoAdd, CommonConfig.league_party_power));
		}
		else {
			Helper.SetImageFilterColor(this.imgFood, null);
			this.btnGraEat.visible = true;
			this.imgBack.visible = true;
			this.lbAdd.visible = true;
			this.btnAddFood.visible = false;
			this.imgGold.visible = false;
			this.lbMoney.visible = false;
			let info = this.process.info;
			let mem = Table.FindR(Game.PlayerLeagueSystem.Members, function (k, v) {
				if (v.monarchbase.id == info) {
					return true;
				}
			})
			let name = mem[0].monarchbase.name
			if (mem[0] == null) {
				let des = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_celeAdd, TextsConfig.TextConfig_League.animal_noName);
				this.lbAdd.textFlow = Util.RichText(des);
			}
			else {
				this.lbAdd.textFlow = Util.RichText(HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_celeAdd, name));
			}
			if (Game.PlayerLeagueSystem.Member.party_time_add == 0) {
				this.btnGraEat.enabled = true;
			}
			else if (Game.PlayerLeagueSystem.Member.party_time_add > 0) {
				this.btnGraEat.enabled = false;
			}
		}
	}
	private onBtnEat() {
		this.leagueParty(false);
	}
	private onBtnGraEat() {
		this.leagueParty(true);
	}
	private onBtnAddFood() {
		Game.PlayerLeagueSystem.leaguePartyAdd().then(() => {
			this.setAdd();
			toast_success(LANG(TextsConfig.TextConfig_League.animal_celeAddSuccess));
		})
	}
	private leagueParty(is_add) {
		Game.PlayerLeagueSystem.leagueParty(is_add).then(() => {
			this.refreash();
			let str_power = Helper.StringFormat("+%d", CommonConfig.league_party_power);
			Game.EventManager.event(GameEvent.SHOW_COMMON_MESSAGE, { source: "ui_currencyicon_IconStrength_png", text: str_power });
		})
	}

}
}