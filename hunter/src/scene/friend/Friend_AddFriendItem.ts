namespace zj {
//Friend_AddFriendItem
//wangshenzhuo
// 2019/03/22
export class Friend_AddFriendItem extends eui.ItemRenderer {


    public imageFrame:eui.Image;
    public imageHead:eui.Image;
    public labelTextName:eui.Label;
    public labelTextVIP:eui.Label;
    public labelTextLeague:eui.Label;
    public buttonCheck:eui.Button;
    public buttonAdd:eui.Button;


    private roleInfo : any;

    public constructor() {
        super();
        this.skinName = "resource/skins/friend/Friend_AddFriendItemSkin.exml";
        cachekeys(<string[]>UIResource["Friend_AddFriendItem"], null);
        this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCheck, this);
        this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAdd, this);
    }

    protected dataChanged() {
        this.roleInfo = this.data.father.searchMap[this.data.id];
        this.labelTextName.text = this.roleInfo.name;
        this.labelTextVIP.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.levelDes , this.roleInfo.level);
        if(this.roleInfo.leagueId == 0){
            this.labelTextLeague.text = TextsConfig.TextConfig_Relation.leagueNone;
        } else{
            this.labelTextLeague.text =Helper.StringFormat(TextsConfig.TextConfig_Relation.leagueDes , this.roleInfo.leagueName); 
        }

        if(this.data.father.itemArray[this.roleInfo.id] != null){
            this.buttonAdd.enabled = false;
        }else{  
            this.buttonAdd.enabled = true;
        }
        this.imageHead.source = cachekey(PlayerItemSystem.ItemPath(this.roleInfo.picId), this); 
        this.imageFrame.source =  cachekey(PlayerItemSystem.ItemPath(this.roleInfo.picFrameId), this) ;
    }

    public onButtonCheck(){
        TipManager.ReqRoleInfo(this.roleInfo.id , this.roleInfo.group_id);
    }

    public onButtonAdd(){
        TipManager.RelationAdd(this.roleInfo.id , ()=>{this.RelationAdd_Visit()} );
         setTimeout(() => {
             PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            }).catch(reason => { });
        },800)
    }

    public RelationAdd_Visit(){
        PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            setTimeout(() => {
            this.buttonAdd.enabled = false;
            this.data.father.SetDes();
        },500)
        }).catch(reason => { });
         
    }


}

export class Friend_AddFriendItemData {
    id : number;
    father : Friend_AddFriend;
    listIndex : number;
}
}