namespace zj {
//管理公会的list
//yuqingchao
//2018.12.6
export class LeagueMainMemberltem extends eui.ItemRenderer {
    private groupMain: eui.Group;
    /* 头像框 */
    private imgUserFrame: eui.Image;
    /* 头像 */
    private imgUserHead: eui.Image;
    /* 活跃度遮罩 */
    private imgBarExpMask: eui.Image;
    /* 官职 */
    private imgText: eui.Image;
    /* 点击后的图 */
    private imgTrue: eui.Image;
    /* 活跃度条 */
    private imgSpriteBarExp: eui.Image;
    /* 等级 */
    private lbTextLevel: eui.Label;
    /* 玩家姓名 */
    private lbName: eui.Label;
    /* 活跃度 */
    private lbTextProgress: eui.Label;
    /* 在线时间 */
    private lbTime: eui.Label;

    public constructor() {
        super();
        this.skinName = "resource/skins/league/LeagueMainMemberltemSkin.exml";
        cachekeys(<string[]>UIResource["LeagueMainMemberltem"], null);
        this.imgSpriteBarExp.mask = this.imgBarExpMask;
    }

    protected dataChanged() {
        closeCache(this.groupMain);
        this.imgTrue.visible = false;
        let i = this.data.i;
        let mem = this.data.mem;
        this.imgUserFrame.source = cachekey(TableItemPicFrame.Item(mem.monarchbase.picFrameId).path, this);
        this.imgUserHead.source = cachekey(TableItemPic.Item(mem.monarchbase.picId).path, this);

        //职位判定
        if (mem.officialId == message.ELeagueOfficial.LEAGUE_OFFICIAL_NORMAL) {      //判断是否为普通职员
            this.imgText.visible = false;
        }
        else {
            this.imgText.visible = true;
            this.imgText.source = cachekey(UIConfig.UIConfig_League.official[mem.officialId - 1], this);//职位图片
        }

        this.lbTextLevel.text = Helper.StringFormat(TextsConfig.TextConfig_League.levelDes, mem.monarchbase.level.toString());
        this.lbName.text = mem.monarchbase.name;
        this.imgTrue.visible = this.selected;
        this.lbTextProgress.text = mem.enliven_seven + "/" + CommonConfig.league_active_day_max * 7;
        let perect = mem.enliven_seven / (CommonConfig.league_active_day_max * 7);
        this.imgBarExpMask.x = this.imgSpriteBarExp.x - this.imgBarExpMask.width + this.imgBarExpMask.width * perect;

        //登陆时间判定
        let des = "";
        if (mem.monarchbase.is_online == true) {
            des = TextsConfig.TextsConfig_Time.online;
            this.lbTime.text = des;
            this.lbTime.textColor = ConstantConfig_Common.Color.online;        //在线字体颜色
        }
        else {
            let sec = mem.monarchbase.logoutTime;        //离线时长
            let ret: number = 0;
            if (sec > (3600 * 24) * 365) {
                ret = Math.floor(sec / ((3600 * 24) * 365));
                des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.yearsAgo, ret);
            }
            else if (sec > (3600 * 24) * 30) {
                ret = Math.floor(sec / ((3600 * 24) * 30));
                des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.monsAgo, ret);
            }
            else if (sec > (3600 * 24)) {
                ret = Math.floor(sec / (3600 * 24));
                des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.daysAgo, ret);
            }
            else if (sec > 3600) {
                ret = Math.floor(sec / 3600);
                des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.hoursAgo, ret);
            }
            else if (sec > 60) {
                ret = Math.floor(sec / 60);
                des = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Time.minsAgo, ret);
            }
            else {
                des = TextsConfig.TextsConfig_Time.justNow;
            }

            this.lbTime.text = des;
            this.lbTime.textColor = ConstantConfig_Common.Color.offline;            //离线字体颜色
        }
        setCache(this.groupMain);

    }


}
}