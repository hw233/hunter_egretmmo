namespace zj {
// HXH_GroupFightMain (飞龙营地)
// wangshenzhuo
// 2019/03/05
export class HXH_GroupFightMain extends Scene {

    public groupLeftTop:eui.Group;
    public buttonClose:eui.Button;
    public imageBoss1:eui.Image;
    public imageBoss2:eui.Image;
    public imageBoss3:eui.Image;
    public imageBoss4:eui.Image;
    public labelBossName:eui.Label;
    public labelBossInfo:eui.Label;
    public buttonChallenge:eui.Button;
    public labelTimes:eui.BitmapLabel;
    public buttonExplain:eui.Button;
    public buttonDropList:eui.Button;
    public buttonLevel:eui.Button;
    public labelLevel:eui.BitmapLabel;
    public groupBossClick:eui.Group;
    public listTableView:eui.List;
    public groupYinCang : eui.Group;
    public groupBossInfo :eui.Group;
    private groupBoss :eui.Group;
    private labelToken : eui.Label;
    private btnAddToken : eui.Button;
    private lbStrength : eui.Label;
    private btnAddStrength : eui.Button;
    private imageBackGroud: eui.Image;

    private listOpen : boolean = false;

    public base_id = 10000;

    private imageTalk = [];

    public allHardInfo : any;
    public hardIndex : number = 0;;
    public talker : any;
    private curHardInfo : any;

    public listTableItem: eui.ArrayCollection;
    public listTableIndex: number = 0;

    private timenpc: Array<number> = [];
    public formats : any = [];

    private scale_x : number;
    private scale_y : number;;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightMainSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;

        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonDropList.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonDropList, this);
        this.buttonLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonLevel, this);
        this.groupBossClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.imagemove, this);
        this.buttonChallenge.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChallenge, this);
        this.listTableView.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.buttonlistTableView, this);
        this.btnAddToken.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddGemstone, this);
        this.btnAddStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddStrength, this);
        this.buttonExplain.addEventListener(egret.TouchEvent.TOUCH_TAP , this.onButtonExplain , this);
        Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
        Game.EventManager.on(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE , ()=>{
            egret.Tween.removeTweens(this.groupBoss);  //特殊处理
        } , null);
        if (this.width >= 1344) {
            this.imageBackGroud.scaleX = this.width / 1334;
        }
    }

    public Init(){
        this.imageTalk = [
            this.imageBoss1,
            this.imageBoss2,
            this.imageBoss3,
            // this.imageBoss4,
        ]

        for(const k in this.imageTalk){
            const v = this.imageTalk[k];
            v.visible = false;
        }

        this.labelBossInfo.visible = false;

        this.listOpen = false;
        PlayerGroupFightSystem.fightGroupExt = message.EGroupBattleType.GROUPBATTLE_TYPE_ONE;
        this.allHardInfo = PlayerGroupFightSystem.GetCurGroupTbl(PlayerGroupFightSystem.fightGroupExt);
        this.hardIndex = PlayerGroupFightSystem.GetMaxCustomsByIndex(PlayerGroupFightSystem.fightGroupExt);
        
        this.SetInfo();
        this.InitMyGroupFormation();
    }

    private SetInfo(){
        this.groupYinCang.visible = false;
        this.curHardInfo = this.allHardInfo[this.hardIndex];
        this.SetInfoList();
        this.SetInfoUI();
        egret.Tween.get(this).wait(400).call(()=>{
            this.imagemove();
        })
        
        this.updateUIStates();
    }

    private updateUIStates(){
         //鑽石
        if (Game.PlayerInfoSystem.Token > 100000) {
            this.labelToken.text = (Game.PlayerInfoSystem.Token / 10000).toFixed(1) + "万";
        } else {
            this.labelToken.text = Game.PlayerInfoSystem.Token.toString();
        }

        let str_energy = Helper.StringFormat("%d/%d" , Game.PlayerInfoSystem.Power , TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add);
        this.lbStrength.text = str_energy;
    }

    private onRemoveFromStage(){
        Game.EventManager.off(GameEvent.PLAYER_POWER_CHANGE, this.updateUIStates, this);
        Game.EventManager.off(GameEvent.PLAYER_TOKEN_CHANGE, this.updateUIStates, this);
        egret.Tween.removeTweens(this);
    }

    private SetInfoList(){
        this.listTableView.selectedIndex = (this.hardIndex % 10000 - 1); // 默认选中
        this.listTableView.itemRenderer = HXH_GroupFightMainItem;//
        
        this.listTableItem = new eui.ArrayCollection();
        let allHardInfo = PlayerGroupFightSystem.GetCurGroup(PlayerGroupFightSystem.fightGroupExt);
        for (let i = 0; i < allHardInfo.length; i++) {
            let data = new HXH_GroupFightMainItemData();
            data.father = this;
            data.index = i + 1 ;
            data.id = PlayerGroupFightSystem.fightGroupExt * 10000 + i;
            this.listTableItem.addItem(data);
        }

        this.listTableView.dataProvider = this.listTableItem;
        this.listTableIndex = this.listTableView.selectedIndex;
    }

    private buttonlistTableView(e: eui.ItemTapEvent){
        let maxId = PlayerGroupFightSystem.GetMaxCustomsByIndex(PlayerGroupFightSystem.fightGroupExt) % 10;
        if (this.listTableIndex != this.listTableView.selectedIndex) {
            if (this.listTableView.selectedIndex + 1 > maxId) {
                toast_warning(Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.chooseTips , this.listTableIndex + 1) )
                return;
            }
            this.listTableItem.itemUpdated(this.listTableItem.source[this.listTableIndex]);
            this.listTableItem.itemUpdated(this.listTableItem.source[this.listTableView.selectedIndex]);
            this.listTableIndex = this.listTableView.selectedIndex;
        }
        
        
        if(this.listTableIndex + 1  == (this.hardIndex % 10000)){
            return;
        }else if (this.listTableIndex + 1 > maxId){
           
            return;
        }
        this.hardIndex = this.listTableIndex + 10001;
        this.SetInfo();
        this.onGroupDialogue();
        this.SetInfoUI();
    }

    private SetInfoUI(){
        let name = this.curHardInfo.boss_name;
        let times : any = Table.FindR(Game.PlayerWantedSystem.wantedInfo.groupBattleTime , function( k , v ){
            return k == (PlayerGroupFightSystem.fightGroupExt - 1);
        })
        if(times[0] == null){
            times[0] = 0 ;
        }else{
            times[0] = times[0].value;
        }
        let timeStr = CommonConfig.group_battle_limit_times[PlayerGroupFightSystem.fightGroupExt - 1] - times[0] + "/" + CommonConfig.group_battle_limit_times[PlayerGroupFightSystem.fightGroupExt - 1];
        this.labelBossName.text = name;
        this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.hard , this.hardIndex % 10000);
        this.labelTimes.text = timeStr; 
    }

    
    private onButtonLevel(){
        egret.Tween.removeTweens(this.groupYinCang);
        if(this.listOpen){
            this.listAniClose();
        }else{
            this.ListAniOpen();
        }
        this.listOpen = !this.listOpen;
        
    }

    private InitMyGroupFormation(){
        for (let i = 0; i < 2; i++) {
			this.formats[i] = new message.FormationInfo();
		}

        let buttonName = ["generals", "reserves", "supports"]
        let a = Game.PlayerFormationSystem.formatsGroupFight;
        for(let kk in Game.PlayerFormationSystem.formatsGroupFight){
            let vv = Game.PlayerFormationSystem.formatsGroupFight[kk];
            if(vv.formationIndex <= 2){
                this.formats[vv.formationIndex - 1] = vv;
            }
        }

        for(let fk in this.formats){
            let fv = this.formats[fk];
            for(let kk in buttonName){
                let vv = buttonName[kk];
                for(let i = 0 ; i < 4 ; i ++){
                    if(fv[vv][i] == null){
                        fv[vv][i] = 0; // 空缺补0
                    }
                }   
            }
            this.formats[fk].formationType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            this.formats[fk].formationIndex = Number(fk) + 1;
        }
        Game.PlayerFormationSystem.formatsGroupFight = this.formats;
        let b = Game.PlayerFormationSystem.formatsGroupFight;
    }

    private onButtonChallenge(){
         this.MobsInfo_Visit()
            .then((data: any) => {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT ;
                 loadUI(HXH_GroupFightFormate)
                .then((Scene : HXH_GroupFightFormate) => {
                    Scene.SetInfo(this.hardIndex,this);
                    Scene.show(UI.SHOW_FROM_TOP);
                });
            })
       .catch(reason => { toast_warning(reason)});
    }

    private MobsInfo_Visit(){
          return new Promise((resolve, reject) => {
            let request = new message.MobsInfoRequest();
            request.body.battleType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            request.body.mobsId = this.hardIndex;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.MobsInfoResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    return;
                }
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false);
            return;
        });
    }

    public onGroupDialogue() {
        //toast("对话框");
        // this.groupBossInfo.visible = false;
        this.labelBossInfo.visible = false;
        egret.Tween.removeTweens(this.groupBossInfo);
        if (this.timenpc.length > 0) {
            for (let i = 0; i < this.timenpc.length; i++) {
                egret.clearTimeout(this.timenpc[i]);
            }
        }

        let npc_id = TableEnum.EnumTalkNpcId["GROUPFIGHT"];
        let str_talk = PlayerHunterSystem.NpcDialog(npc_id);
    
        if(str_talk == ""){
            return "";
        }

        egret.Tween.get(this.groupBossInfo)
            .wait(100, false)
            .call(() => {
                this.groupBossInfo.visible = true;
                this.labelBossInfo.visible = true;
                this.typerEffect(this.labelBossInfo, str_talk, 30);
            }).wait(0.1).call(()=>{
                this.imageBossMove();
            })
    }

    private imageBossMove(){
         egret.Tween.get( this.groupBoss ,  { loop: true })
            .to({ y: 215 }, 0)
            .to({ y: 210 }, 1000)
            .to({ y: 220 }, 2000)
            .to({ y: 215 }, 1000)
    }

    private imagemove(){
        egret.Tween.removeTweens(this.imageTalk);
        egret.Tween.removeTweens(this.groupBossInfo)
        egret.Tween.removeTweens(this.groupBoss);
        this.labelBossInfo.visible = false;
        for(const k in this.imageTalk)
            {
            const v = this.imageTalk[k];
            let scale_x : number = v.scaleX ;
            let scale_y : number = v.scaleY ;

            if(Number(k) == 0){
                egret.Tween.get(v).to({alpha : 0.5} , 0)
                    .to({alpha : 1} , 350);
                egret.Tween.get(v).wait(10)
                    .to({visible : false})
                    .to({scaleX : 0.2 , scaleY : 0.2 } , 0)
                    .to({visible :true})
                    .to({scaleX : 0.9 , scaleY : 0.9} , 400 , egret.Ease.backOut)
                }

            if(Number(k) == 1){
                egret.Tween.get(v).to({alpha : 0.5} , 0)
                    .to({alpha : 1} , 350);
                egret.Tween.get(v).wait(60)
                    .to({visible : false})
                    .to({scaleX : 0 , scaleY : 0} , 0)
                    .to({visible :true})
                    .to({scaleX : 0.75 , scaleY : 0.75} , 430 , egret.Ease.backOut)
                }

            if(Number(k) == 2){
                egret.Tween.get(v).to({alpha : 0.5} , 0)
                    .to({alpha : 1} , 350);
                egret.Tween.get(v).wait(110)
                    .to({visible : false})
                    .to({scaleX : 0.5 , scaleY : 0.5 } , 0)
                    .to({visible :true})
                    .to({scaleX : 0.8 , scaleY : 0.8} , 400 , egret.Ease.backOut).call(()=>{
                         this.onGroupDialogue();
                    })
                }
            }
            
         
                    
    }

    private typerEffect(obj, content: string = "", interval: number = 200, backFun: Function = null): void {
        var strArr: Array<any> = content.split("");
        var len: number = strArr.length;
        obj.text = "";
        this.timenpc = [];
        for (let i = 0; i < len; i++) {

            let timenum = egret.setTimeout(function () {
                obj.appendText(strArr[Number(this)]);
            }, i, interval * i);

            this.timenpc.push(timenum);
        }
    }

    //list关闭动画
    private listAniClose(){ 
		egret.Tween.get(this.groupYinCang )
            .to({ x : 742 , y : 85} , 0 ).wait(50)
            .to({ x : 742 , y : 115 , } , 200 )

        egret.Tween.get(this.groupYinCang)
            .to( {scaleX : 1 , scaleY : 0.1}, 300 , egret.Ease.backIn).wait(0.1)
            .to({ visible : false} )
            
    }

    //list打开动画
    private ListAniOpen(){ 
            
        egret.Tween.get(this.groupYinCang )
            .to({ x : 742 , y : 115 , } , 0 )
            .to({visible : true}).wait(0.1)
            .to({ x : 742 , y : 85 , } , 150 , egret.Ease.backOut).wait(10)
            .to( {scaleX : 1 , scaleY : 1}, 300 , egret.Ease.backOut)
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onButtonDropList(){
        loadUI(HXH_GroupFightDropInfo)
            .then((Dialog : HXH_GroupFightDropInfo) => {
                Dialog.SetInfo();
                Dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onBtnAddGemstone() {
         loadUI(PayMallScene)
            .then((scene: PayMallScene) => {
                scene.show(UI.SHOW_FROM_TOP);
                scene.init();
            });
    }

    private onBtnAddStrength(){
        loadUI(HXH_HunterUserStrength)
            .then((dialog: HXH_HunterUserStrength) => {
                dialog.SetInfo();
                dialog.show(UI.SHOW_FROM_TOP);
            });
    }

    private onButtonExplain() {
        toast_warning("高手攻略暂未开启！")
    }
}

}