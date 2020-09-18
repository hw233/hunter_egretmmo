namespace zj {
// 猎人图鉴
// hexiaowei 创建于2018.12.12

export class PlayerHunterHistorySystem
{
    ///////////////////////////////////////////////////////////////////////////
    // 静态函数
    

   
    ///////////////////////////////////////////////////////////////////////////
    // 变量
     private generalHistoryIds : Array<number> = []; //猎人图鉴
    
    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        Game.EventManager.on(GameEvent.PLAYER_GENERAL_HISTORY_IDS_CHANGE, this.onGeneralHistoryIdsChange, this);
    }

    public uninit() {
        this.generalHistoryIds = [];
    }

    private onGeneralHistoryIdsChange(ev: egret.Event) {
        this.generalHistoryIds = <Array<number>>ev.data;
    }
    
    // 获取所有猎人图鉴
    public getAllGeneralHistoryIds() {
        return this.generalHistoryIds;
    }

    public generalsPokedexMap: {[id: number]: {}} = {}; 

    // 猎人图鉴索引
    public  getGeneralHistoryIds() {
        //let generalsPokedexMap: {[id: number]: {}} = {}; 
        StringConfig_Table.baseGeneral
        let m=TableBaseGeneral.Table();
        for (const k in TableBaseGeneral.Table()) {
                const v=TableBaseGeneral.Table()[k];
                let poledex = {
                generalId : null,
                isHave: null,
                order: null,
                mapRoleId: null,
                dpt: null,
                aptitude: null,
                feature: null,
                generalInfo: null,
                poledexTalent: null,
                bOpen: null
            };
            let general = new message.GeneralInfo();
            general.general_id = v.general_id;
            general.level = 1;
            general.star = v.init_star;
            general.step = 1;

            let passiveInfo: any = new message.PassiveInfo();
            passiveInfo.talentId = v.awake_passive;
            passiveInfo.level = 1;
            general.awakePassive = passiveInfo;

            // 对应basegeneral表里的id
            poledex.generalId = v.general_id;
            // 是否已经拥有
            poledex.isHave = false;
            // 排序规则（1、资质 2、id）
            poledex.order = 100000 * v.aptitude +v.general_id;
            // mapRoleId
            poledex.mapRoleId = v.general_roleId;
            // 派系
            poledex.dpt = v.type;
            // 品质
            poledex.aptitude = v.aptitude;
            // 特性
            poledex.feature = v.features;
            // 基础武将信息
            poledex.generalInfo = general; 
            // 武将图鉴技能
            poledex.poledexTalent = v.pokedex_attri;  
            // 是否开启
            poledex.bOpen = v.is_open == 0 ? false : true;
            
            // dict
           Game.PlayerHunterHistorySystem.generalsPokedexMap[v.general_id] = poledex;
        }
        return Game.PlayerHunterHistorySystem.generalsPokedexMap;
    }
    
    // 获取拥有的猎人图鉴
    public getPokedexSkill(){
        let tblSkill=[];
        // for (const k in Game.PlayerHunterHistorySystem.generalsPokedexMap ){
        //      let v:any=Game.PlayerHunterHistorySystem.generalsPokedexMap[k];
        //      if(v.isHave==true){
        //            if(tblSkill[v.dpt]==null){
        //                tblSkill[v.dpt]=[];
        //            }
        //            tblSkill[v.dpt].push(v.poledexTalent);
        //      }
        // }
        return tblSkill;
    }

    // 拥有的猎人图鉴跟所有图鉴做对比
    public pokedexDataFresh(){
        let hasNum=0; //拥有的猎人数量
        let totalNum=0; // 猎人总数量
        let mn=  Game.PlayerHunterHistorySystem.getGeneralHistoryIds();
        for (const k in Game.PlayerHunterHistorySystem.generalsPokedexMap ){
             let v:any=Game.PlayerHunterHistorySystem.generalsPokedexMap[k];
             if(!v.bOpen){
                continue;
             }  
              
             let n=Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(),Number(k));
             // 判断猎人是否拥有，修改属性值
             if(Table.FindK(Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(),Number(k))!=-1){
                 v.isHave=true;
             }
             
             if(v.isHave){
                 hasNum=hasNum+1;
             }

             totalNum=totalNum+1;
        }
        return [hasNum,totalNum];

    }

    public static SavePokedexKey(id : number , value) {
        Gmgr.Instance.pokedexTipsTbl[id] = value;
        Game.PlayerHunterHistorySystem.SetPokedexKey(id , value);
    }
    public SetPokedexKey(id, value?) {
        if (value == null || value == undefined || id == null || id == undefined) return;
        let key = `pokedex_${id}`;
        Game.Controller.setRoleStorageItem(key, value.toString());
    }

     //  图鉴红点
    public static GetPokedexKey(id: number, bool?: boolean): boolean {
        if (id == null || id == undefined) return false;
        let key = `pokedex_${id}`;
        let value = Game.Controller.getRoleStorageItem(key);
        if (value.length == 0) return false;
        let t = parseInt(value);
        if (isNaN(t)) return false;
        return (t == 1);
    }
}
}