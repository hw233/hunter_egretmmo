namespace zj {
//Friend_MainFriendItem
//wangshenzhuo
// 2019/03/22
export class Friend_MainFriendItem extends eui.ItemRenderer {

    public imageBg:eui.Image;
    public imageSelect:eui.Image;
    public imageFrame:eui.Image;
    public imageHead:eui.Image;
    public labelTextName:eui.Label;
    public labelTextVip:eui.Label;
    public labelTextLeague:eui.Label;
    public labelTextTime:eui.Label;
    public buttonGet:eui.Button;
    public buttonSend:eui.Button;
    public imageSendTip:eui.Image;
    public groupmain:eui.Group;

    private labelServer:eui.Label;

    public id : number;
    public relation : any;
    public roleIds = [];
    public newpower : number = 0;

    public constructor() {
        super();
        this.skinName = "resource/skins/friend/Friend_MainFriendItemSkin.exml";
        cachekeys(<string[]>UIResource["Friend_MainFriendItem"], null);
        this.buttonSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSend, this);
        this.buttonGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGet, this);
        this.groupmain.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            (this.data as Friend_MainFriendItemData).father.onlistTableView();
        }, this);
    }

    protected dataChanged() {
        this.id = this.data.index;
        this.SetItemInfo(this.data.index);

        if (this.selected) {
            this.imageSelect.visible = true;
        }
        else {
            this.imageSelect.visible = false;
        }
    }

    private SetItemInfo(index){
        this.relation = this.data.father.relationMap[this.data.index];
        this.roleIds = [];
        this.roleIds.push(this.relation.roleInfo.id);
        //默认不选中
        this.imageSelect.visible = false;
        this.labelTextName.text = this.relation.roleInfo.name;
        this.imageHead.source = cachekey(PlayerItemSystem.ItemPath(this.relation.roleInfo.picId), this) ;
        this.imageFrame.source = cachekey(PlayerItemSystem.ItemPath(this.relation.roleInfo.picFrameId), this) ;
        this.labelTextVip.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.levelDes , this.relation.roleInfo.level);

        if(this.relation.roleInfo.leagueId == 0){
            this.labelTextLeague.text = TextsConfig.TextConfig_Relation.leagueNone;
        } else{
            this.labelTextLeague.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.leagueDes , this.relation.roleInfo.leagueName);
        }
    
        if(this.relation.canReward && this.relation.isReward == false){
            this.data.father.imageTipGet.visible = true;
        }

        if(this.data.father.relationType == message.ERelationType.RELATION_TYPE_ENEMY){
            this.buttonGet.visible = false;
            this.buttonSend.visible = false;
            this.imageSendTip.visible = false;
        }else{
            if(this.relation.canReward && this.relation.isReward == false){
                this.buttonGet.visible = true;
            }else{
                this.buttonGet.visible = false;
            }
            let a = Game.PlayerRelateSystem.relateResp.givepower;
            let b = Game.PlayerRelateSystem.givepower();
            if(Game.PlayerRelateSystem.givepower()[this.relation.roleInfo.id] == null){
                this.buttonSend.visible = true;
                this.imageSendTip.visible = false;
            }else{
                this.buttonSend.visible = false;
                this.imageSendTip.visible = true;
            }
        }

        let timesDes = this.GetTimeDes();
        this.labelTextTime.text = String(timesDes);
        if(this.relation.roleInfo.is_online == true){
            this.labelTextTime.textColor = ConstantConfig_Common.Color.online;
        }else{
            this.labelTextTime.textColor = ConstantConfig_Common.Color.offline;
        }

        // //服务器名称
        let name1 = null;
        if(Game.Controller.groupOwnerID() != this.relation.roleInfo.group_id && this.relation.roleInfo.group_name != ""){
            let json = JSON.parse(this.relation.roleInfo.group_name);
            let desc = "";
            if (desc.length <= 0 && json["zhcn"]) desc = json["zhcn"];
            if (desc.length <= 0 && json["zhtw"]) desc = json["zhtw"];
            if (desc.length <= 0 && json["en"]) desc = json["en"];
            let items = desc.split("&");
            if (items.length >= 2) {
                this.labelServer.text = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, items[0], items[1]);
            }
        }else{
            this.labelServer.text = TextsConfig.TextsConfig_Chat.serverSelf;
        }
        Game.PlayerRelateSystem.serverName = name1;
    }

    private GetTimeDes(){
        let des = "";
        let sec = this.relation.roleInfo.logoutTime;
        if(this.relation.roleInfo.is_online == true){
            des = TextsConfig.TextsConfig_Time.online;
        }else{
            let ret = 0;
            if(sec > (3600 * 24) * 30){
                des = TextsConfig.TextsConfig_Time.noLogin;
            }else if(sec > (3600 * 24)){
                ret = Math.floor(sec / (3600 * 24));
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.daysAgo , ret); 
            }else if(sec > 3600){
                ret = Math.floor(sec / 3600);
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.hoursAgo , ret); 
            }else if(sec > 60){
                ret = Math.floor(sec / 60);
                des = Helper.StringFormat(TextsConfig.TextsConfig_Time.minsAgo , ret); 
            }else{
                des = TextsConfig.TextsConfig_Time.justNow
            }
        }
        return des;
    }

    private onButtonSend(){
        PlayerRelateSystem.RelationGivePower_Req(this.roleIds)
            .then((data: any) => {
                setTimeout(() => {
                    this.data.father.SetRoleIds();
                    this.data.father.LoadList(true);
                    this.data.father.SetDes();
                    
                    this.SetItemInfo(this.id)
                }, 800);
                
            }) .catch(reason => { toast_warning(reason)});
    }

    private onButtonGet(){
        this.newpower = Game.PlayerInfoSystem.BaseInfo.power;
        PlayerRelateSystem.RelationRewardPower_Req(this.roleIds)
            .then((data: any) => {
               let a = this.relation.roleInfo.id;
               let isReward = Table.FindF(this.roleIds , function(k , v){
                   return v == a;
               })
               if(isReward){
                   this.relation.canReward = false;
               }
                setTimeout(() => {
                    this.data.father.SetRoleIds();
                    this.data.father.LoadList(true);
                    this.data.father.SetDes();
                    this.SetItemInfo(this.id);
                    this.data.father.SetInfo();
                   
                    let powerDt = Game.PlayerInfoSystem.BaseInfo.power - this.newpower;
                    Common_Tip.AddTip(Helper.StringFormat(TextsConfig.TextsConfig_Friend.getPower , powerDt) , this.data.father.height , this.data.father.width);
                  
                }, 800);      
            }) .catch(reason => { toast_warning(reason)});
    }
}


//子项数据源
export class Friend_MainFriendItemData {
    index : number;
    father : Friend_MainFriendSence;

}

}