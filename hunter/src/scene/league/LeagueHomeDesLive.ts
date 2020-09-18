namespace zj {
// 
// lizhengqiang
// 20181221

export class LeagueHomeDesLive extends UI {
    public groupMain: eui.Group;
    private lbLeagueActive: eui.Label;
    private lbMineActive: eui.Label;
    private lbTody: eui.Label;


    public constructor() {
        super();

        this.skinName = "resource/skins/league/LeagueHomeDesLiveSkin.exml";
        this.init();
    }

    public init() {
        this.lbLeagueActive.text = Helper.StringFormat(TextsConfig.TextConfig_League.home_pop_active, Game.PlayerLeagueSystem.BaseInfo.enliven_all) + "/" + TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_enliven_all;
        this.lbMineActive.text = Helper.StringFormat(TextsConfig.TextConfig_League.home_pop_mine_active, Game.PlayerLeagueSystem.Member.enliven_day, CommonConfig.league_active_day_max);
        this.lbTody.text = Helper.StringFormat(TextsConfig.TextConfig_League.home_pop_today, Game.PlayerLeagueSystem.BaseInfo.enliven_day, TableLevel.Item(Game.PlayerLeagueSystem.BaseInfo.level).league_enliven);
    }

}

}