namespace zj {
//Friend_ApplicationItem
//wangshenzhuo
// 2019/03/22
export class Friend_ApplicationItem extends eui.ItemRenderer {


    public imageFrame:eui.Image;
    public imageHead:eui.Image;
    public labelTextName:eui.Label;
    public labelTextVIP:eui.Label;
    public labelTextLeague:eui.Label;
    public buttonCheck:eui.Button;
    public buttonAgree:eui.Button;
    public buttonRefuse:eui.Button;


    public id : number;
    public applyInfo : any ;
    public roleIds = [];
    public bAgree : boolean;

     public constructor() {
        super();
        this.skinName = "resource/skins/friend/Friend_ApplicationItemSkin.exml";
        cachekeys(<string[]>UIResource["Friend_ApplicationItem"], null);
        this.buttonCheck.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonCheck, this);
        this.buttonAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAgree, this);
        this.buttonRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonRefuse, this);
     }

    protected dataChanged() {
        this.id = this.data.index;
        this.applyInfo = this.data.father.applyMap[this.data.index];
        this.roleIds = [];
        this.roleIds.push(this.applyInfo.roleInfo.id)

        let tblHead = TableItemPic.Table();
        let tblFrame = TableItemPicFrame.Table();
        this.imageHead.source = cachekey(tblHead[this.applyInfo.roleInfo.picId].path , this) ;
        this.imageFrame.source = cachekey(tblFrame[this.applyInfo.roleInfo.picFrameId].path , this) ;
        this.labelTextName.text = this.applyInfo.roleInfo.name;

        this.labelTextVIP.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.levelDes , this.applyInfo.roleInfo.level);
        if(this.applyInfo.roleInfo.leagueId == 0){
            this.labelTextLeague.text = TextsConfig.TextConfig_Relation.leagueNone;
        }else{
            this.labelTextLeague.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.leagueDes , this.applyInfo.roleInfo.leagueName);
        }
    }

    private onButtonCheck(){
        TipManager.ReqRoleInfo(this.applyInfo.roleInfo.id , this.applyInfo.roleInfo.group_id);
    }

    private onButtonAgree(){
        this.bAgree = true;
        PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds ,true)
        .then((data: any) => {
            if(this.roleIds.length == 0){
                toast_warning(TextsConfig.TextsConfig_Friend.appliction);
            }else if(this.bAgree == true){
                toast_success(TextsConfig.TextsConfig_Friend.addSuccess);
            }
            setTimeout(() => {
                this.data.father.SetInfo();
            },500)
            
        }) .catch(reason => { });
    }

    private onButtonRefuse(){
        this.bAgree = false;
        PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds ,false)
        .then((data: any) => {
            if(this.roleIds.length == 0){
                toast_warning(TextsConfig.TextsConfig_Friend.appliction);
            }else if(this.bAgree == true){
                toast_success(TextsConfig.TextsConfig_Friend.addSuccess);
            }
            
            setTimeout(() => {
                this.data.father.SetInfo();
            },500)
        }) .catch(reason => { });
    }
    

}

export class Friend_ApplicationItemData {
    index : number;
    father : Friend_Application;
}

}