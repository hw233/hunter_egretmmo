namespace zj {
// HXH_GroupFightFormate ()
// wangshenzhuo
// 2019/03/07

enum EnumBossState {
    Info = 1,  // boss信息
    Feature = 2,  // boss特性
}

enum EnumUseState {
    Friend = 1,  // 好友
    League = 2,  // 联盟
}

enum EnumUIState {
    Boss = 1,  //Boss
    Friend = 2,  //好友
}

export class HXH_GroupFightFormate extends Scene {

    public groupLeft: eui.Group;
    public groupTeam1: eui.Group;
    public buttonSet1: eui.Button;
    public listMy1: eui.List;
    public groupTeam2: eui.Group;
    public buttonSet2: eui.Button;
    public listMy2: eui.List;
    public groupTeam3: eui.Group;
    public labelHelpName: eui.Label;
    public buttonSet3: eui.Button;
    public listFri: eui.List;
    public groupRightBoss: eui.Group;
    public groupFightPos: eui.Group;
    public buttonfight: eui.Button;
    public imageFitghtOrnA: eui.Image;
    public imageFitghtOrnB: eui.Image;
    public groupBoss1: eui.Group;
    public labelBossName1: eui.Label;
    public imageBossIcon1: eui.Image;
    public listViewBossSkill1: eui.List;
    public groupBoss2: eui.Group;
    public labelBossName2: eui.Label;
    public imageBossIcon2: eui.Image;
    public listViewBossSkill2: eui.List;
    public groupBoss0: eui.Group;
    public labelBossName3: eui.Label;
    public imageBossIcon3: eui.Image;
    public listViewBossSkill3: eui.List;
    public buttonClose: eui.Button;
    public labelLevel: eui.Label;
    private groupBossSkill3: eui.Group;
    private groupBossSkill2: eui.Group;
    private groupBossSkill1: eui.Group;
    private groupRightHelp : eui.Group;
    private labelTimes :eui.Label;
    private buttonFriendTeam : eui.Button;
    private listFriendTeam : eui.List;
    private groupBossJN : eui.Group;
    private imageBg: eui.Image;

    private listMy1Item: eui.ArrayCollection;
    private listMy1Index: number = 0;

    private listMy2Item: eui.ArrayCollection;
    private listMy2Index: number = 0;

    private listFriItem: eui.ArrayCollection;
    private listFriIndex: number = 0;

    private LayerlistItem: eui.ArrayCollection;
    private LayerlistIndex: number = 0;

    private listFriendItem: eui.ArrayCollection;
    private listFriendIndex: number = 0;

    private scrollerRewards0 : eui.Scroller;
    private AwardmoveLocation0: number = 0;
    private scrollerRewards1 : eui.Scroller;
    private AwardmoveLocation1: number = 0;
    private scrollerRewards2 : eui.Scroller;
    private AwardmoveLocation2: number = 0;


    public nodeUIState = [];

    public headBoss = [];
    public listBossFeature = [];
    public bossName = [];
    public groupBoss = [];

    public useState: number;
    public bossState: number;
    public uiState: number;

    public generalNum: number;
    public supportNum: number;

    public bGetFriendInfo: boolean = false;
    public bGetUnionInfo: boolean = false;
    public leagueInfo = [];
    public friendInfo :message.SimpleRoleFormationInfo[] = [];
    /** useType -- 0
     *  useRoleInfo -- 1*/
    public bUsedInfo = [];
    public useType: any;
    public useRoleInfo = [];  // use info
    public DiffInfo: any;

    public bossInfo = [];
    public friendFormate: any;
    public father: HXH_GroupFightMain;
    public id : number;
    public fakeRole : boolean;
    public bInTeach : boolean;

    public constructor() {
        super();
        this.skinName = "resource/skins/darkLand/HXH_GroupFightFormateSkin.exml";
        this.width = UIManager.StageWidth;
        this.height = UIManager.StageHeight;
        this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
        this.buttonSet3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSet3, this);
        this.buttonSet1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSet1, this);
        this.buttonSet2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSet2, this);
        this.groupFightPos.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonFight, this);

        this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
        if (this.width >= 1344) {
            this.imageBg.scaleX = this.width / 1334;
        }
        this.groupRightHelp.visible = false;
    }

    public init() {
        this.nodeUIState[EnumUIState.Boss] = this.groupRightBoss;
        this.nodeUIState[EnumUIState.Friend] = this.groupRightHelp;

        this.headBoss = [
            this.imageBossIcon1,
            this.imageBossIcon2,
            this.imageBossIcon3,
        ]

        this.listBossFeature = [
            this.listViewBossSkill1,
            this.listViewBossSkill2,
            this.listViewBossSkill3,
        ]

        this.bossName = [
            this.labelBossName1,
            this.labelBossName2,
            this.labelBossName3,
        ]

        this.groupBoss = [
            this.groupBossSkill3,
            this.groupBossSkill2,
            this.groupBossSkill1,
        ]

        this.useState = EnumUseState.Friend;
        this.bossState = EnumBossState.Info;
        this.uiState = EnumUIState.Boss;

        // this.nodeUIState[EnumUIState.Friend].visible = false;

        //上阵猎人数量
        this.generalNum = TableFormations.Item(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).generals;  // 参战武将数量
        this.supportNum = TableFormations.Item(message.EFormationType.FORMATION_TYPE_GROUP_FIGHT).supports;  // 援助武将数量

        this.bUsedInfo = [
            this.useType = null,
            this.useRoleInfo = [],
        ]
        PlayerGroupFightSystem.InitGroupBattleInfo();
    }

    public SetInfo(id, father: HXH_GroupFightMain) {
        this.id = id;
        this.father = father;
        this.init();
        this.DiffInfo = PlayerGroupFightSystem.Instance(id);
        this.labelLevel.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.hard, id % 10000);

        this.InitFriendState();
        this.SetInfoMyFormate();
        this.SetInfoFriendFormate();
        this.SetInfoBossInfo();


        this.SetInfoAssistTime();
    }

    //好友队伍剩余邀请次数
    public SetInfoAssistTime() {
        let useTime = Game.PlayerWantedSystem.wantedInfo.groupBattleUsed.length;
        let allTime = PlayerVIPSystem.Level().assist_time;
        this.labelTimes.text = Helper.StringFormat(TextsConfig.TextsConfig_GroupFight.timeLastAssist, (allTime - useTime), allTime);
    }

    public InitFriendState() {
        this.friendFormate = new message.SimpleFormationInfo;

        for (let i = 0; i < this.generalNum; i++) {
            this.friendFormate.generals.push(0);
        }

        for (let i = 0; i < this.supportNum; i++) {
            this.friendFormate.supports.push(0);
        }
    }

    //左侧我的队伍
    public SetInfoMyFormate() {
        //第一队-----------------------
        let Team1 = [];
        for (let i = this.supportNum; i > 0; i--) {
            let a = Game.PlayerFormationSystem.formatsGroupFight;
            let generalId = Game.PlayerFormationSystem.formatsGroupFight[0].supports[i - 1];
            if (generalId == 0) {
                Team1.push(0);
            } else {
                let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[generalId];
                Team1.push(generalInfo);
            }
        }

        for (let i = this.generalNum; i > 0; i--) {
            let generalId = Game.PlayerFormationSystem.formatsGroupFight[0].generals[i - 1];
            if (generalId == 0) {
                Team1.push(0);
            } else {
                let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[generalId];
                Team1.push(generalInfo);
            }
        }

        this.listMy1.itemRenderer = CommonArenaEnemyTeamItem;
        this.listMy1Item = new eui.ArrayCollection();

        for (let i = 0; i < Team1.length; i++) {
            let data = new CommonArenaEnemyTeamItemData();
            data.index = i + 1;
            data.showTeam = true;
            data.simpleInfo = Team1[i];
            this.listMy1Item.addItem(data);
        }
        this.listMy1.dataProvider = this.listMy1Item;
        this.listMy1Index = this.listMy1.selectedIndex;

        //第二队------------------------
        let Team2 = [];
        for (let i = this.supportNum; i > 0; i--) {
            let a = Game.PlayerFormationSystem.formatsGroupFight;
            let generalId = Game.PlayerFormationSystem.formatsGroupFight[1].supports[i - 1];
            if (generalId == 0) {
                Team2.push(0);
            } else {
                let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[generalId];
                Team2.push(generalInfo);
            }
        }

        for (let i = this.generalNum; i > 0; i--) {
            let generalId = Game.PlayerFormationSystem.formatsGroupFight[1].generals[i - 1];
            if (generalId == 0) {
                Team2.push(0);
            } else {
                let generalInfo = Game.PlayerHunterSystem.allHuntersMap()[generalId];
                Team2.push(generalInfo);
            }
        }

        this.listMy2.itemRenderer = CommonArenaEnemyTeamItem;
        this.listMy2Item = new eui.ArrayCollection();

        for (let i = 0; i < Team2.length; i++) {
            let data = new CommonArenaEnemyTeamItemData();
            data.index = i + 1;
            data.showTeam = true;
            data.simpleInfo = Team2[i];
            this.listMy2Item.addItem(data);
        }
        this.listMy2.dataProvider = this.listMy2Item;
        this.listMy2Index = this.listMy2.selectedIndex;
    }

    public SetInfoFriendFormate() {
        let TeamFriend = [];
        for (let i = 0; i < this.generalNum + this.supportNum; i++) {
            if (i < this.supportNum) {
                TeamFriend[this.supportNum - 1 - i] = this.friendFormate.supports[i] || [];
            } else {
                TeamFriend[this.generalNum + 2 * this.supportNum - i - 1] = this.friendFormate.generals[i - this.supportNum] || []
            }
        }

        this.listFri.itemRenderer = CommonArenaEnemyTeamItem;
        this.listFriItem = new eui.ArrayCollection();

        for (let i = 0; i < TeamFriend.length; i++) {
            let data = new CommonArenaEnemyTeamItemData();
            data.index = i + 1 ;
            data.showTeam = true;
            data.simpleInfo = TeamFriend[i];
            this.listFriItem.addItem(data);
        }
        this.listFri.dataProvider = this.listFriItem;
        this.listFriIndex = this.listFri.selectedIndex;

        let a = this.bUsedInfo[1].useRoleInfo;
        if(this.bUsedInfo[1].useRoleInfo){
            let str = this.bUsedInfo[1].name;
            this.labelHelpName.text = str;
        } else{
            this.labelHelpName.text = TextsConfig.TextsConfig_GroupFight.noFriend;
        }
    }

    //右侧首领信息
    public SetInfoBossInfo() {
        this.bossInfo = [];
        for (const n in this.DiffInfo.boss_roleId) {
            const info = this.DiffInfo.boss_roleId[n];
            info.id = this.DiffInfo.boss_roleId[n][0];
            info.feature = this.DiffInfo.feature[n];
            this.bossInfo.push(info)
        }

        for (const k in this.headBoss) {
            const v = this.headBoss[k];
            let m : any = this.bossInfo[k].id;
            let mapRoleId: any = PlayerHunterSystem.Table(m);
            let eyePath = TableMapRole.Item(mapRoleId.general_roleId).eye_head;
            v.source = cachekey(eyePath, this);
        }

        for (const k in this.bossName) {
            const v = this.bossName[k];
            let str = this.DiffInfo.boss_name1[k];
            v.text = str;

            for (const k in this.listBossFeature) {
                const v = this.listBossFeature[k];
                let listLenght = this.bossInfo[k].feature

                this.listBossFeature[k].itemRenderer = WantedSecondStartItem;
                this.LayerlistItem = new eui.ArrayCollection();

                for (let i = 0; i < listLenght.length; i++) {
                    let data = new WantedSecondStartItemData();
                    data.father = this;
                    data.index = i;
                    data.talent = listLenght[i];
                    data.key = Number(k); 
                    this.LayerlistItem.addItem(data);
                }

                this.listBossFeature[k].dataProvider = this.LayerlistItem;
                this.LayerlistIndex = this.listBossFeature[k].selectedIndex;
                let a = this.listBossFeature[k]

                this["scrollerRewards" + k].viewport = this.listBossFeature[k];
                this["scrollerRewards" + k].validateNow();
                this["scrollerRewards" + k].viewport.scrollH = this["AwardmoveLocation" + k];

                this["scrollerRewards" + k].left = 0;
            }
        }
    }

    //右侧好友信息
    public SetInfoFriendInfoList(bFirst?){
        
        this.listFriendTeam.itemRenderer = HXH_GroupFightFormateItem;
        this.listFriendItem = new eui.ArrayCollection();

        for (let i = 0; i < this.friendInfo.length; i++) {
            let data = new HXH_GroupFightFormateItemData();
            data.index = i;
            data.info = this.friendInfo[i];
            data.bFriend = true;
            data.father = this;
            this.listFriendItem.addItem(data);
        }

        this.listFriendTeam.dataProvider = this.listFriendItem;
        this.listFriendIndex = this.listFriendTeam.selectedIndex;
    }

    private getListAllFri: Array<HXH_GroupFightFormateItem> = [];
    private getItemList() {
        for (let i = 0; i < this.friendInfo.length; i++) {
            let item = this.listFriendTeam.getElementAt(i) as HXH_GroupFightFormateItem;
            this.getListAllFri.push(item);
        }
    }

    //选择队伍
    private onButtonSet3() {
        // this.SetFakeRoleInfo();
        // this.SetInfoFriendInfoList();
        if (this.friendInfo.length > 0 || this.bGetFriendInfo) {
            this.tmp();
        } else {
            this.GetFirendReq(()=>{this.tmp()});
        }

    }

    private tmp() {
        let state = this.uiState == EnumUIState.Boss && EnumUIState.Friend || EnumUIState.Boss;
        this.SetUITagAni(state);

    }

    private GetFirendReq( cb?: () => void) {
        let this_this = this;
        this_this.GroupBattleQuery_Visit()
            .then((data: message.GroupBattleQueryResponse) => {
                if(data.header.result == 0) {
                    // 解压其他gameinfo信息
                    let para = {}
                    para["index"] = 4
                    let inflate = new Zlib.Inflate(data.body.formations, para);
                    let plain = inflate.decompress();
                    let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
                    let RelationInfo = new message.SimpleRoleFormationZip();
                    if (!RelationInfo.parse_bytes(decoder)) {
                        toast(LANG("其他游戏数据解析失败"));
                        return;
                    }
                    this_this.bGetFriendInfo = true;
                    this_this.friendInfo = RelationInfo.formations;
                    //新手假信息
                    this_this.SetFakeRoleInfo();
                    this_this.SortMsgInfo(1);
                    this_this.SetInfoFriendInfoList(true);
                    cb();
                }else{
                    this_this.friendInfo = [];
                    //新手假信息
                    this_this.SetFakeRoleInfo();
                    this_this.SortMsgInfo(1);
                    this_this.SetInfoFriendInfoList(true);
                    cb();
                }
                
            }).catch(reason => { });
    }

    private onButtonSet1() {
        this.ButtonSetMyFormate(1);
    }

    private onButtonSet2() {
        this.ButtonSetMyFormate(2);
    }

    private ButtonSetMyFormate(index) {
        Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
        loadUI(HXH_CommonFormationPveGroupFigh)
            .then((Scene: HXH_CommonFormationPveGroupFigh) => {
                Scene.SetInfo(this);
                Scene.SetInfoButtonClick(index);
                Scene.show(UI.SHOW_FROM_TOP);
            });
    }

    public SetUITagAni(state) {
        for(const kk in this.nodeUIState){
            const vv = this.nodeUIState[kk];
            if(state == kk){
                let a = this.nodeUIState[kk]
                egret.Tween.get(this.nodeUIState[kk])
                .to({visible : true })
                .to({x : 400 } , 0)
                .to({x : 0} , 300 , egret.Ease.backOut).call(()=>{
                    this.uiState = state;
                    this.SetInfoButtonSet3Pic();
                })
            }
            else if(this.uiState == Number(kk)){
                egret.Tween.get(this.nodeUIState[kk]).wait(10)
                .to({visible : false})
                .to({x : 400} , 300).call(()=>{
                    this.uiState = state;
                    this.SetInfoButtonSet3Pic();
                })
            }
            
        }
    }

    private SetInfoButtonSet3Pic(){
        if(this.uiState == EnumUIState.Boss){
            this.enterOpen(UIConfig.UIConfig_Hunter_GroupFight.chooseTeam[1])
        }else if(this.uiState == EnumUIState.Friend){
            this.enterOpen(UIConfig.UIConfig_Hunter_GroupFight.unChooseTeam[1]);
        }
    }

    public enterOpen(ui){
        Set.ButtonBackgroud(this.buttonSet3 , ui);
        this.buttonSet3.enabled = true;
        this.buttonSet3.touchEnabled = true;
    }

    private onButtonClose() {
        this.close(UI.HIDE_TO_TOP);
    }

    private onButtonFight(){
        let times : any = Table.FindR(Game.PlayerWantedSystem.wantedInfo.groupBattleTime , function(k , v){
            return k == 1;
        })
        if(times != null && times.value == CommonConfig.group_battle_limit_times[PlayerGroupFightSystem.fightGroupExt] && !Device.isDebug ){
            //判断是否处于教学
            toast_warning(TextsConfig.TextsConfig_GroupFight.timeNotEnough);
        }

        let errorId = this.JudgeCanBat();
        if(errorId == 0 || (Teach.bInTeaching && Teach.m_bOpenTeach) ){
            this.MobsInfoReq()
				.then(() => {
					Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
                    loadUI(HXH_GroupFightCombat)
                    .then((Scene: HXH_GroupFightCombat) => {
                        Scene.SetInfo(this);
                        Scene.show(UI.SHOW_FROM_TOP);
                    });
				})
				.then(() => {

				})
            
        }else{
            toast_warning(TextsConfig.TextsConfig_GroupFight.needGeneral2[errorId - 1]);
        }
    }

    //拉取怪物副本信息
	public MobsInfoReq(): Promise<{}>{
        return new Promise((resolve, reject) => {
            let request = new message.MobsInfoRequest();
			request.body.battleType = message.EFormationType.FORMATION_TYPE_GROUP_FIGHT;
            request.body.mobsId = this.id;
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
    

    private JudgeCanBat(){
        let bat1 = Table.FindF(Game.PlayerFormationSystem.formatsGroupFight[0].generals , function(k,v){
            return v != 0;
        })
        let bat2 = Table.FindF(Game.PlayerFormationSystem.formatsGroupFight[1].generals , function(k,v){
            return v!= 0;
        })
        if(bat1 &&bat2){
            return 0;
        }else if(bat1){
            return 2;
        }else{
            return 1;
        }
    }

    public SetTeach(){
        this.bInTeach = true;
        this.fakeRole = true;
    }

    private SortMsgInfo(type) {
        let tbl = [];
        if(type == 1) {
            tbl = this.friendInfo;
        }else if(type == 2) {
            tbl = this.leagueInfo;
        }

        Table.Sort(tbl , function(a , b){
            let bUsedA = Table.FindF(Game.PlayerWantedSystem.wantedInfo.groupBattleUsed , function( k , v){
                return v == a.baseInfo.id ;
            })
            let bUsedB = Table.FindF(Game.PlayerWantedSystem.wantedInfo.groupBattleUsed , function( k , v){
                return v == b.baseInfo.id;
            })
            let useA = bUsedA && 1 || 0;
            let useB = bUsedB && 1 || 0;
            return useA - useB;
        })
    }

    //新手假信息
    private SetFakeRoleInfo(){
        if(this.bInTeach != true){
            return;
        }

        if(this.friendInfo != null){
            this.fakeRole = false;
            return;
        }

        let roleInfo = new message.RoleBriefInfo;
        roleInfo.id = 0;
        roleInfo.name = TextsConfig.TextsConfig_GroupFight.fakeRoleInfo.name;
        roleInfo.level = TextsConfig.TextsConfig_GroupFight.fakeRoleInfo.level;

        let simpleInfo = new message.SimpleFormationInfo();
        for(let i = 0 ; i < 4 ; i ++){
            let general = new message.GeneralSimpleInfo();
            general = teachBattle.groupFightFakeGeneralInfo.generals[i];
            simpleInfo.generals[i] = general;
        }

        for(let i = 0 ; i < 4 ; i ++) {
            let supports = new message.GeneralSimpleInfo();
            supports = teachBattle.groupFightFakeGeneralInfo.supports[i];
            simpleInfo.supports[i] = supports;
        }

        let baseInfo = new message.SimpleRoleFormationInfo();
        baseInfo.baseInfo = roleInfo;
        baseInfo.formation = simpleInfo;
        this.friendInfo.push(baseInfo);
    }

    public  GroupBattleQuery_Visit() {
        return new Promise((resolve, reject) => {
            let request = new message.GroupBattleQueryRequest();
            request.body.get_type = 1;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.GroupBattleQueryResponse>resp;
                console.log(response);
            
                resolve(response);
                return;
            }, (req: aone.AoneRequest): void => {
                reject(LANG("请求超时"));
                return;
            }, this, false , true);
            return;
        });
    }

       //长按 技能 详情
    private showGoodsProperty(ev: egret.Event) {
        let show = TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "Talenttouch";
        this.addChild(show);
    }

    // 长按 技能 抬起
    private removeShow() {
        let show = this.getChildByName("Talenttouch");
        if (show) {
            this.removeChild(show);
        }
    }


}

}