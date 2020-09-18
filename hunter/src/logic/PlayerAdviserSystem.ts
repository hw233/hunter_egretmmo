namespace zj {
// 玩家念兽(军师)系统
// hexiaowei 创建于2019.01.11
// 对应db_adviser.ts

export class PlayerAdviserSystem {

    public adviser: Array<message.AdviserInfo> = []; // 念兽
    public advisersMap: { [index: number]: message.AdviserInfo } = {}; // 念兽（军师）索引表
    public petInfo: Array<message.PetInfo> = []; // 宠物
    public petMap: { [index: number]: message.PetInfo } = {}; //宠物索引表

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        //初始化念兽（军师）索引表
        for (const k in TableBaseAdviser.Table()) {
            const v = TableBaseAdviser.Table()[k];
            let adviser = new message.AdviserInfo;
            adviser.adviserId = v.adviser_id;
            Game.PlayerAdviserSystem.advisersMap[v.adviser_id] = adviser;
        }

        //初始化宠物索引表
        for (const k in TableBasePet.Table()) {
            const v = TableBasePet.Table()[k];
            let pet = new message.PetInfo;
            pet.pet_id = v.pet_id;
            Game.PlayerAdviserSystem.petMap[v.pet_id] = pet;
        }

        Game.EventManager.on(GameEvent.PLAYER_ADVISER_INFO_CHANGE, this.onGeneralsChange, this);
        //Game.EventManager.on(GameEvent.PLAYER_ADVISER_INFO_CHANGE, this.onAdviserMapChange, this);
        Game.EventManager.on(GameEvent.PLAYER_PET_INFO_CHANGE, this.onPetInfo, this);
        //Game.EventManager.on(GameEvent.PLAYER_PET_INFO_CHANGE, this.onPetMapInfo, this);
    }

    public uninit() {
        this.adviser = [];
        // this.advisersMap = {};
        this.petInfo = [];
        // this.petMap = {};
    }

    /*
    private onAdviserMapChange(){

        for(const k in Game.PlayerAdviserSystem.adviser){
             const v = Game.PlayerAdviserSystem.adviser[k];
             Game.PlayerAdviserSystem.advisersMap[v.adviserId] = v;
        }

    }
    */
    private onGeneralsChange(ev: egret.Event) {
        let generals = <Array<message.AdviserInfo>>ev.data;
        for (let index = 0; index < generals.length; index++) {
            let curGeneralInfo = generals[index];
            let curGeneralID: number = curGeneralInfo.adviserId
            let bFind = false;

            for (let i = 0; i < this.adviser.length; i++) {
                let v = this.adviser[i];
                if (v.adviserId == curGeneralID && bFind == false) {
                    bFind = true;
                    this.adviser[i] = curGeneralInfo;
                }
            }
            if (bFind == false && curGeneralID != undefined && curGeneralID != 0) {
                this.adviser.push(curGeneralInfo);
            }

        }

        for (const k in Game.PlayerAdviserSystem.adviser) {
            const v = Game.PlayerAdviserSystem.adviser[k];
            Game.PlayerAdviserSystem.advisersMap[v.adviserId] = v;
        }

    }

    private onPetInfo(ev: egret.Event) {
        let generals = <Array<message.PetInfo>>ev.data;
        for (let index = 0; index < generals.length; index++) {
            let curGeneralInfo = generals[index];
            let curGeneralID: number = curGeneralInfo.pet_id
            let bFind = false;

            for (let i = 0; i < this.petInfo.length; i++) {
                let v = this.petInfo[i];
                if (v.pet_id == curGeneralID && bFind == false) {
                    bFind = true;
                    this.petInfo[i] = curGeneralInfo;
                }
            }
            if (bFind == false && curGeneralID != undefined && curGeneralID != 0) {
                this.petInfo.push(curGeneralInfo);
            }

        }

        for (const k in Game.PlayerAdviserSystem.petInfo) {
            const v = Game.PlayerAdviserSystem.petInfo[k];
            Game.PlayerAdviserSystem.petMap[v.pet_id] = v;
        }
    }

    /*
    private onPetMapInfo(){
        
        for(const k in Game.PlayerAdviserSystem.petInfo){
             const v = Game.PlayerAdviserSystem.petInfo[k];
             Game.PlayerAdviserSystem.petMap[v.pet_id] = v;
        }
        
    }
    */

    public static Instance(id: number) {

        if (id == 0 || id == -1) return null;
        return TableBaseAdviser.Item(id);

    }

    public static petSkill(id: number) {
        if (ckid(id)) return null;
        return TablePetSkill.Item(id);
    }

    //是否拥有念兽（军师）
    public static Have(id: number, advisers?: Array<message.AdviserInfo>) {

        if (advisers == null) {
            advisers = Game.PlayerAdviserSystem.adviser;
        }
        let isHave = Table.FindF(Game.PlayerAdviserSystem.adviser, function (k, v) {
            return v.adviserId == id;
        });
        return isHave;

    }

    //念兽排序
    public static GetTable() {

        let info = TableBaseAdviser.Table();
        let list = [[], [], []];
        for (const k in info) {
            const v = info[k];
            let itemId = PlayerAdviserSystem.Instance(v.adviser_id).compose_goods;
            let cur = PlayerItemSystem.Count(itemId);
            let des = PlayerAdviserSystem.Instance(v.adviser_id).compose_count;
            if (PlayerAdviserSystem.Have(v.adviser_id) == false && cur >= des) {
                list[1].push(v);
            } else if (PlayerAdviserSystem.Have(v.adviser_id) == false && cur < des) {
                list[2].push(v);
            }
        }
        //list[0]= Table.Copy(Game.PlayerAdviserSystem.adviser);
        list[0] = Game.PlayerAdviserSystem.adviser;
        list[0].sort((a, b) => {
            if (a.level == b.level) {
                if (PlayerAdviserSystem.Instance(a.adviserId).quality == PlayerAdviserSystem.Instance(b.adviserId).quality) {
                    return a.adviserId - b.adviserId;

                } else {
                    return PlayerAdviserSystem.Instance(b.adviserId).quality - PlayerAdviserSystem.Instance(a.adviserId).quality;
                }
            } else {
                return b.level - a.level;
            }
        });

        list[1].sort((a, b) => {
            if (a.quality == b.quality) {
                return a.adviser_id - b.adviser_id;
            } else {
                return b.quality - a.quality;
            }
        });

        list[2].sort((a, b) => {
            if (a.quality == b.quality) {
                return a.adviser_id - b.adviser_id
            } else {
                return b.quality - a.quality;
            }
        });

        let advisers = [];
        for (const k in list) {
            const v = list[k];
            for (const kk in v) {
                advisers.push(v[kk]);
            }
        }

        return advisers;

    }


    public static GetId(index, advisers?) {
        if (advisers == null) {
            advisers = Game.PlayerAdviserSystem.adviser;
        }
        for (const k in Game.PlayerAdviserSystem.adviser) {
            const v = Game.PlayerAdviserSystem.adviser[k];
            if (v.adviserId == index) {
                return k;
            }
        }
    }

    //根据宠物ID获取宠物信息
    public static PetBase(id: number) {
        if (id == 0 || id == -1) return null;
        return TableBasePet.Item(id);
    }

    //是否召唤宠物
    public static GetPet(petId: number, petInfo?: Array<message.PetInfo>) {
        if (petInfo == null) {
            petInfo = Game.PlayerAdviserSystem.petInfo;
        }
        let isHave = Table.FindF(Game.PlayerAdviserSystem.petInfo, function (k, v) {
            return v.pet_id == petId;
        });
        return isHave;
    }

    public static Haves() {
        let tbl = TableBaseAdviser.Table();
        let list = [];
        let min = 20;
        for (const kk in tbl) {
            const vv = tbl[kk];
            let itemId = PlayerAdviserSystem.Instance(vv.adviser_id).compose_goods;
            let cur = PlayerItemSystem.Count(itemId);
            let des = PlayerAdviserSystem.Instance(vv.adviser_id).compose_count;
            let isHave = PlayerAdviserSystem.Have(vv.adviser_id);
            if (isHave == false && cur >= des) {
                list.push(vv);
            }
        }

        let ret = Table.DeepCopy(list);
        Table.Sort(ret, function (a, b) {
            return a.adviser_id < b.adviser_id
        })
        for (const kk in ret) {
            const vv = ret[kk];
            if (vv.adviser_id < min) {
                min = vv.adviser_id;
                return min;
            }
        }
        return false;
    }

    public static Open() {
        let tbl = TableBaseAdviser.Table();
        let open = Table.FindF(tbl, function (k, v) {
            let IsHave = PlayerAdviserSystem.Have(v.adviser_id);
            let itemId = PlayerAdviserSystem.Instance(v.adviser_id).compose_goods;
            let Cur = PlayerItemSystem.Count(itemId);
            let Des = PlayerAdviserSystem.Instance(v.adviser_id).compose_count;
            return IsHave || (!IsHave && Cur >= Des);
        })
        return open;
    }

    //宠物排序
    public static SortPet() {

        let info = TableBasePet.Table();
        let list = [[], [], []];

        for (const k in info) {
            const v = info[k];
            let itemId = this.PetBase(v.pet_id).compose_goods;
            let cur = PlayerItemSystem.Count(itemId);
            let des = this.PetBase(v.pet_id).compose_count;

            if (v.is_open == 1) {
                if (this.GetPet(v.pet_id) == false && cur >= des) {
                    list[1].push(v);
                } else if (this.GetPet(v.pet_id) == false && cur < des) {
                    list[2].push(v);
                }
            }
        }
        //list[0]=Table.DeepCopy(Game.PlayerAdviserSystem.petInfo);
        list[0] = Game.PlayerAdviserSystem.petInfo;
        list[0].sort((a, b) => {
            if (a.star == b.star) {
                if (PlayerAdviserSystem.PetBase(a.pet_id).quality == PlayerAdviserSystem.PetBase(b.pet_id).quality) {
                    return a.pet_id - b.pet_id;

                } else {
                    return PlayerAdviserSystem.PetBase(b.pet_id).quality - PlayerAdviserSystem.PetBase(a.pet_id).quality;
                }
            } else {
                return b.star - a.star;
            }
        });

        list[1].sort((a, b) => {
            if (a.quality == b.quality) {
                return a.pet_id - b.pet_id;
            } else {
                return b.quality - a.quality;
            }
        });

        list[2].sort((a, b) => {
            if (a.quality == b.quality) {
                return a.pet_id - b.pet_id
            } else {
                return b.quality - a.quality;
            }
        });

        let advisers = [];
        for (const k in list) {
            const v = list[k];
            for (const kk in v) {
                advisers.push(v[kk]);
            }
        }

        return advisers;

    }

    //宠物属性
    public static AttriAdd(petId: number, star) {
        let info = [];
        let attri = 0;
        let title = 0;
        let tbl = this.PetBase(petId);
        let tblnew = [];
        for (const k in tbl) {
            const v = tbl[k];
            tblnew.push(v);
        }

        for (const k in tblnew) {
            const v = tblnew[k];
            if (Number(k) >= 16 && Number(k) <= 29) {
                info.push(v);
            }
        }

        for (const kk in info) {
            const vv = info[kk];
            if (vv[0] != 0) {
                attri = Table.Add(1, star, function (id) {
                    return vv[star - 1];
                })
                title = Number(kk);
            }
        }

        return [attri, title];
    }


    public static AdviserlvdbInstance(id: number) {
        if (id == 0 || id == -1) return null;
        return TableAdviserLevel.Item(id);
    }

    public static AdviserlvdbIsMax(id: number, level: number): boolean {
        let level_idx = id * 10000 + level;
        if (PlayerAdviserSystem.AdviserlvdbInstance(level_idx + 1) == null) {
            return true;
        } else {
            return false;
        }
    }

    //属性加成数组
    public static AdviserlvdbAttrTbl(id: number, level: number) {
        let index = id * 10000 + level;
        let tbl_item = PlayerAdviserSystem.AdviserlvdbInstance(index);
        let ret = [];

        for (const k in message.AttriInfo) {
            const v = message.AttriInfo[k];
            if (tbl_item[v[0]] != null && tbl_item[v[1]] != 0) {
                let tbl = [v[0], k]
                ret.push(tbl);
            }
        }

        return ret;
    }

    //属性加成描述
    public static AdviserLvdbAttrDes(id: number, level: number, index: number) {
        //辅助参数
        let indexlv = id * 10000 + level
        let tbl_item = PlayerAdviserSystem.AdviserlvdbInstance(indexlv);
        let attr_tbl = PlayerAdviserSystem.AdviserlvdbAttrTbl(id, level);
        let attr_key = attr_tbl[index][0];
        // 字符串拼接
        let str_attr_des = ""; // 属性描述
        let str_dt_opert = ""; // 变化符号
        let str_attr_cnt: any = ""; // 属性值
        // 返回的结构
        let ret = "";
        //属性描述
        str_attr_des = TextsConfig.TextsConfig_Artifact.attrDes[attr_key];
        //变化符号
        str_dt_opert = TextsConfig.TextsConfig_Artifact.attrAdd;
        let value = yuan3(tbl_item[attr_key] == null, 0, tbl_item[attr_key]);
        if (value < 0) {
            str_dt_opert = TextsConfig.TextsConfig_Artifact.attrReduce;
        }
        //校正
        str_attr_cnt = Math.floor(value);

        //整理结果
        ret = Helper.StringFormat(TextsConfig.TextsConfig_Adviser.attrFormat, str_attr_des, str_dt_opert, str_attr_cnt);
        return ret;
    }

    public static AdviserLvdbMinLevel(id) {

        let maxSkill_Level = this.AdviserlvdbMaxSkill(id);
        let skill_List = TableAdviserLevel.Table();
        let min = 1000;
        let list = [];
        for (const k in skill_List) {
            const v = skill_List[k];
            if (v.skill_level == maxSkill_Level && id == v.adviser_id) {
                list.push(v.level);
            }
        }

        for (const k in list) {
            const v = list[k];
            if (v < min) {
                min = v;
            }
        }
        return min;

    }

    public static AdviserlvdbMaxSkill(id: number) {

        let skill_List = TableAdviserLevel.Table();
        let max = 1;
        for (const k in skill_List) {
            const v = skill_List[k];
            if (v.skill_level >= max && id == v.adviser_id) {
                max = v.skill_level;
            }
        }
        return max;
    }

    public static AdviserLvdbGetLevel(index, id) {
        let info: any = PlayerAdviserSystem.AdviserLvdbSortLevel();
        let skill = PlayerAdviserSystem.AdviserlvdbInstance(index).skill_level;

        let list = [];
        let min = PlayerAdviserSystem.AdviserLvdbGetMaxIndex();
        let skill_level = null;
        for (const k in info) {
            const v = info[k];
            if (v.adviser_id == id && v.skill_level - 1 == skill) {
                list.push(v);
            }
        }

        for (const kk in list) {
            const vv = list[kk];
            if (vv.index <= min) {
                min = vv.index;
                skill_level = vv.level
            }
        }

        return skill_level;


    }

    public static AdviserLvdbSortLevel() {

        let tbl = TableAdviserLevel.Table();
        let ret = Table.DeepCopy(tbl);
        Table.Sort(ret, function (a, b) {
            return a.index < b.index;
        })
        return ret;
    }

    public static AdviserLvdbGetMaxIndex() {

        let list = this.AdviserLvdbSortLevel();
        let max = 1;
        for (const k in list) {
            const v = list[k];
            if (v.index > max) {
                max = v.index;
            }
        }
        return max;

    }

    public static CompletedHave(id): boolean {
        let itemId = PlayerAdviserSystem.Instance(id).compose_goods;
        let Cur = PlayerItemSystem.Count(itemId);
        let Des = PlayerAdviserSystem.Instance(id).compose_count;
        let isHave = PlayerAdviserSystem.Have(id);
        return (Cur >= Des && !isHave);
    }

    public static CompletedMax(id, level): boolean {
        if (level == 0) {
            level = 1;
        }
        let level_next = 0;
        let itemId = PlayerAdviserSystem.Instance(id).compose_goods;
        let cur = PlayerItemSystem.Count(itemId);
        let des = PlayerAdviserSystem.AdviserlvdbInstance(id * 10000 + level).consume_count;
        let money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
        let money_des = PlayerAdviserSystem.AdviserlvdbInstance(id * 10000 + level).adviser_money;
        let isHave = PlayerAdviserSystem.Have(id);
        if (!isHave) {
            level_next = level + 1;
        } else {
            level_next = level;
        }
        let isMax = PlayerAdviserSystem.AdviserlvdbIsMax(id, level_next);
        return (isHave && cur >= des && !isMax && money >= money_des)
    }

    // 宠物可召唤
    public static PetGetTips(petID): boolean {
        let itemId = PlayerAdviserSystem.PetBase(petID).compose_goods;
        let cur = PlayerItemSystem.Count(itemId);
        let des = PlayerAdviserSystem.PetBase(petID).compose_count;
        let isHave = PlayerAdviserSystem.GetPet(petID);
        return (cur >= des && !isHave);
    }

    // 宠物可升星
    public static PetUpStar(id, star): boolean {
        star = star - 1;
        let max = 35;
        let itemId = PlayerAdviserSystem.PetBase(id).up_goods[star][0];
        let cur = PlayerItemSystem.Count(itemId);
        let des = PlayerAdviserSystem.PetBase(id).up_count[star][0];
        let money = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
        let money_des = PlayerAdviserSystem.PetBase(id).up_money[star];
        let isHave = PlayerAdviserSystem.GetPet(id);
        // let isMax = PlayerAdviserSystem.AdviserlvdbIsMax(id , lev)
        return isHave && cur >= des && star != max && money >= money_des;
    }

    // 宠物可进化
    public static PetStep(id): boolean {
        let star = Game.PlayerAdviserSystem.petMap[id].star;
        let step = 0;
        if (Game.PlayerAdviserSystem.petMap[id].step == CommonConfig.pet_step_max) {
            step = Game.PlayerAdviserSystem.petMap[id].step - 1;
        } else {
            step = Game.PlayerAdviserSystem.petMap[id].step;
        }
        let goods = PlayerAdviserSystem.PetBase(id).evo_consume[step];
        let count = PlayerAdviserSystem.PetBase(id).evo_consume_good[step][0];
        let cur1 = PlayerItemSystem.Count(goods[0]);
        let money = PlayerAdviserSystem.PetBase(id).evo_consume_money[step];
        let moneyDes = PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
        let curStar = 0;
        if (step <= CommonConfig.pet_step_max) {
            curStar = PlayerAdviserSystem.PetBase(id).evo_star_req[step];
        }
        return Game.PlayerAdviserSystem.petMap[id].step != CommonConfig.pet_step_max && step <= CommonConfig.pet_step_max && Game.PlayerAdviserSystem.petMap[id].star >= curStar && cur1 >= count && moneyDes >= money;
    }

    public static GetPetEvolution(petId: number, petInfo: message.PetInfo) {
        petId = petId != null ? petId : petInfo.pet_id;
        petInfo = petInfo != null ? petInfo : Game.PlayerAdviserSystem.petMap[petId];

        let step = 0
        if (petInfo.step < PlayerAdviserSystem.PetBase(petId).unlock_step[1]) {
            step = 1
        }
        else if (petInfo.step >= PlayerAdviserSystem.PetBase(petId).unlock_step[1] && petInfo.step < PlayerAdviserSystem.PetBase(petId).unlock_step[2]) {
            step = 2;
        }
        else {
            step = 3;
        }
        let spine_id = PlayerAdviserSystem.PetBase(petId).spine_id[step - 1];

        return spine_id
    }

    //宠物休息、跟随
    public static PetBattle_Visit(pet_id: number) {

        return new Promise((resolve, reject) => {
            let request = new message.PetPlayingRequest();
            request.body.pet_id = pet_id;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.PetPlayingResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    //念兽召唤
    public static ReqSummon(adviserId: number) {
        // let data_net = Game.PlayerAdviserSystem.advisersMap[] ;

        return new Promise((resolve, reject) => {
            let request = new message.AdviserComposeRequest();
            request.body.adviserId = adviserId;
            // request.body.count = count;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.AdviserComposeResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    //宠物召唤
    public static PetGet_Req(petId: number) {

        return new Promise((resolve, reject) => {
            let request = new message.PetGetRequest();
            request.body.pet_id = petId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.PetGetResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    //宠物进化
    public static PetEvolution_Req(petId: number) {
        return new Promise((resolve, reject) => {
            let request = new message.PetEvolutionRequest();
            request.body.pet_id = petId;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.PetEvolutionResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    // 念兽升星协议
    public static AdviserUpLevel_Req(index: number) {
        let data_Id = PlayerAdviserSystem.GetId(index);
        let data_net = Game.PlayerAdviserSystem.adviser[data_Id];

        return new Promise((resolve, reject) => {
            let request = new message.AdviserUpLevelRequest();
            request.body.adviserId = data_net.adviserId;
            // request.body.count = count;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.AdviserUpLevelResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
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

    //宠物升星
    public static PetUpStar_Visit(pet_id: number) {

        return new Promise((resolve, reject) => {
            let request = new message.PetLevelUpRequest();
            request.body.pet_id = pet_id;
            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.PetLevelUpResponse>resp;
                console.log(response);
                if (response.header.result != 0) {
                    //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                    // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
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



}
}