namespace zj {
//RelicRankList
//hexiaowei
// 2019/03/06
export class RelicRankList extends eui.ItemRenderer {

    private LabelName:eui.Label;
    private labelLevel:eui.Label;
    private imgBest:eui.Image;
    private LabelFont:eui.BitmapLabel;
    private imgFrame:eui.Image;
    private imgIcon:eui.Image;
    private imageHurt:eui.Image;



    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/RelicRankListSkin.exml";
        cachekeys(<string[]>UIResource["RelicRankList"], null);

    }

    protected dataChanged() {

        this.labelLevel.visible = false;

        let data : RelicRankListData  = this.data;
        let str_level = "";
        let path_best ="";
        if(data.index <=2){
            path_best =UIConfig.UIConfig_Rank.best[data.index];
            this.LabelFont.visible = false;
        }else{
            this.LabelFont.visible = true;
            str_level = data.index.toString();
            path_best = UIConfig.UIConfig_Common.nothing;
        }

        
        let str_name = Helper.StringFormat("%s", data.tableRankBase.baseInfo.name);
        let path_icon = PlayerItemSystem.ItemPath(data.tableRankBase.baseInfo.picId);
        let path_frame = PlayerItemSystem.ItemPath( data.tableRankBase.baseInfo.picFrameId);

        this.imgIcon.source = cachekey(path_icon , this) ;
        this.imgFrame.source = cachekey(path_frame , this) ;
        this.imgBest.source = cachekey(UIConfig.UIConfig_Rank.best[data.index] , this) ;
        this.labelLevel.text = data.index.toString();
        this.LabelName.text = str_name;
        this.labelLevel.visible = true;

        if(data.father.rankType == 1){
             this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple,singLecraft.decodeGroupName(data.tableRankBase.baseInfo.group_name,"&",false),singLecraft.decodeGroupName(data.tableRankBase.baseInfo.group_name,"&",true));
        }else{
            this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_Rank.pop_league,data.tableRankBase.baseInfo.leagueName);
        }
        


        this.LabelFont.text = Helper.StringFormat(TextsConfig.TextsConfig_Rank.floor_next,(data.index + 1));

        let hurtPic = UIConfig.UIConfig_DarkLand.relicHurtLevel2[PlayerDarkSystem.GetLevelByHurt(  data.father.relicId, data.tableRankBase.value )]
        this.imageHurt.source = cachekey(hurtPic , this) ;
       
    }

   

}

//子项数据源
export class RelicRankListData {
    index : number;
    //数据源
    tableRankBase: message.RankBaseItemInfo;

    father : RelicRank;

}


}