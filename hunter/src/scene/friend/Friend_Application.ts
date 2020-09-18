namespace zj {
// Friend_Application
// wang shen zhuo
// 2019/03/22
export class Friend_Application extends Dialog {

    public buttonClose:eui.Button;
    public labelTextApplyCnt:eui.Label;
    public labelTextFriendCnt:eui.Label;
    public listTabelView:eui.List;
    public buttonAgree:eui.Button;
    public buttonRefuse:eui.Button;
    public imageTipNoApplicate:eui.Image;

    public applyMap = [];
    public roleIds = [];

    private TableViewItem: eui.ArrayCollection;
    private TableViewIndex: number = 0;

    public bAgree : boolean;

    public father : Friend_MainFriendSence;

    public constructor() {
        super();
        this.skinName = "resource/skins/friend/Friend_ApplicationSkin.exml";
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonAgree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAgree, this);
        this.buttonRefuse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonRefuse, this);
    }

    public SetFather(father : Friend_MainFriendSence){
        this.father = father;
    }

    public SetInfo(){
        this.applyMap = Game.PlayerRelateSystem.relateResp.applys;
        this.roleIds = [];
        for(let i = 0 ; i < this.applyMap.length ; i ++){
            this.roleIds.push(this.applyMap[i].roleInfo.id);
        }
        this.SetDes();
        this.LoadList();
    }

    public SetDes(){
        this.labelTextApplyCnt.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.applicationDes1 , this.applyMap.length);
        this.labelTextFriendCnt.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.applicationDes2 , PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND) , PlayerVIPSystem.Level().reward_power);
    }

    public LoadList(){
        if(this.applyMap.length == 0){
            this.imageTipNoApplicate.visible = true;
        }else{
            this.imageTipNoApplicate.visible = false;
        }

        this.listTabelView.selectedIndex = 0; // 默认选中
        this.listTabelView.itemRenderer = Friend_ApplicationItem;//
        this.TableViewItem = new eui.ArrayCollection();
        for (let i = 0; i < this.applyMap.length; i++) {
            let data = new Friend_ApplicationItemData();
            data.father = this;
            data.index = i;
            this.TableViewItem.addItem(data);
        }

        this.listTabelView.dataProvider = this.TableViewItem;
        this.TableViewIndex = this.listTabelView.selectedIndex;

        //红点提示
        // this.father.imageTipApply.visible = Tips.GetTipsOfId(Tips.TAG.FRIEND , 2);
    }

    public onButtonAgree(){
        this.bAgree = true;
        PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds , true)
            .then((data: any) => {
                if(this.roleIds.length == 0){
                    toast_success(TextsConfig.TextsConfig_Friend.appliction);
                }else if(this.bAgree == true){
                    toast_success(TextsConfig.TextsConfig_Friend.addSuccess);
                }
                 setTimeout(() => {
                   this.SetInfo();
                },500);
            }) .catch(reason => { });
    }   

    public onButtonRefuse(){
        this.bAgree = false;
        PlayerRelateSystem.RelationAnswerFriend_Visit(this.roleIds , false)
            .then((data: any) => {
                if(this.roleIds.length == 0){
                    toast_success(TextsConfig.TextsConfig_Friend.appliction);
                }else if(this.bAgree == true){
                    toast_success(TextsConfig.TextsConfig_Friend.addSuccess);
                }
                 setTimeout(() => {
                   this.SetInfo();
                },500);
            }) .catch(reason => { });
    }   

    private onButtonClose() {
         PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
            setTimeout(() => {
                this.father.SetInfo();
            },500)
            this.close(UI.HIDE_TO_TOP);
        }).catch(reason => { });
        
    }
}


}