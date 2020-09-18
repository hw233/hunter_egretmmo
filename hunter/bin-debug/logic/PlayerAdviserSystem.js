var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 玩家念兽(军师)系统
    // hexiaowei 创建于2019.01.11
    // 对应db_adviser.ts
    var PlayerAdviserSystem = (function () {
        function PlayerAdviserSystem() {
            this.adviser = []; // 念兽
            this.advisersMap = {}; // 念兽（军师）索引表
            this.petInfo = []; // 宠物
            this.petMap = {}; //宠物索引表
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerAdviserSystem.prototype.init = function () {
            //初始化念兽（军师）索引表
            for (var k in zj.TableBaseAdviser.Table()) {
                var v = zj.TableBaseAdviser.Table()[k];
                var adviser = new message.AdviserInfo;
                adviser.adviserId = v.adviser_id;
                zj.Game.PlayerAdviserSystem.advisersMap[v.adviser_id] = adviser;
            }
            //初始化宠物索引表
            for (var k in zj.TableBasePet.Table()) {
                var v = zj.TableBasePet.Table()[k];
                var pet = new message.PetInfo;
                pet.pet_id = v.pet_id;
                zj.Game.PlayerAdviserSystem.petMap[v.pet_id] = pet;
            }
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_ADVISER_INFO_CHANGE, this.onGeneralsChange, this);
            //Game.EventManager.on(GameEvent.PLAYER_ADVISER_INFO_CHANGE, this.onAdviserMapChange, this);
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_PET_INFO_CHANGE, this.onPetInfo, this);
            //Game.EventManager.on(GameEvent.PLAYER_PET_INFO_CHANGE, this.onPetMapInfo, this);
        };
        PlayerAdviserSystem.prototype.uninit = function () {
            this.adviser = [];
            // this.advisersMap = {};
            this.petInfo = [];
            // this.petMap = {};
        };
        /*
        private onAdviserMapChange(){
    
            for(const k in Game.PlayerAdviserSystem.adviser){
                 const v = Game.PlayerAdviserSystem.adviser[k];
                 Game.PlayerAdviserSystem.advisersMap[v.adviserId] = v;
            }
    
        }
        */
        PlayerAdviserSystem.prototype.onGeneralsChange = function (ev) {
            var generals = ev.data;
            for (var index = 0; index < generals.length; index++) {
                var curGeneralInfo = generals[index];
                var curGeneralID = curGeneralInfo.adviserId;
                var bFind = false;
                for (var i = 0; i < this.adviser.length; i++) {
                    var v = this.adviser[i];
                    if (v.adviserId == curGeneralID && bFind == false) {
                        bFind = true;
                        this.adviser[i] = curGeneralInfo;
                    }
                }
                if (bFind == false && curGeneralID != undefined && curGeneralID != 0) {
                    this.adviser.push(curGeneralInfo);
                }
            }
            for (var k in zj.Game.PlayerAdviserSystem.adviser) {
                var v = zj.Game.PlayerAdviserSystem.adviser[k];
                zj.Game.PlayerAdviserSystem.advisersMap[v.adviserId] = v;
            }
        };
        PlayerAdviserSystem.prototype.onPetInfo = function (ev) {
            var generals = ev.data;
            for (var index = 0; index < generals.length; index++) {
                var curGeneralInfo = generals[index];
                var curGeneralID = curGeneralInfo.pet_id;
                var bFind = false;
                for (var i = 0; i < this.petInfo.length; i++) {
                    var v = this.petInfo[i];
                    if (v.pet_id == curGeneralID && bFind == false) {
                        bFind = true;
                        this.petInfo[i] = curGeneralInfo;
                    }
                }
                if (bFind == false && curGeneralID != undefined && curGeneralID != 0) {
                    this.petInfo.push(curGeneralInfo);
                }
            }
            for (var k in zj.Game.PlayerAdviserSystem.petInfo) {
                var v = zj.Game.PlayerAdviserSystem.petInfo[k];
                zj.Game.PlayerAdviserSystem.petMap[v.pet_id] = v;
            }
        };
        /*
        private onPetMapInfo(){
            
            for(const k in Game.PlayerAdviserSystem.petInfo){
                 const v = Game.PlayerAdviserSystem.petInfo[k];
                 Game.PlayerAdviserSystem.petMap[v.pet_id] = v;
            }
            
        }
        */
        PlayerAdviserSystem.Instance = function (id) {
            if (id == 0 || id == -1)
                return null;
            return zj.TableBaseAdviser.Item(id);
        };
        PlayerAdviserSystem.petSkill = function (id) {
            if (zj.ckid(id))
                return null;
            return zj.TablePetSkill.Item(id);
        };
        //是否拥有念兽（军师）
        PlayerAdviserSystem.Have = function (id, advisers) {
            if (advisers == null) {
                advisers = zj.Game.PlayerAdviserSystem.adviser;
            }
            var isHave = zj.Table.FindF(zj.Game.PlayerAdviserSystem.adviser, function (k, v) {
                return v.adviserId == id;
            });
            return isHave;
        };
        //念兽排序
        PlayerAdviserSystem.GetTable = function () {
            var info = zj.TableBaseAdviser.Table();
            var list = [[], [], []];
            for (var k in info) {
                var v = info[k];
                var itemId = PlayerAdviserSystem.Instance(v.adviser_id).compose_goods;
                var cur = zj.PlayerItemSystem.Count(itemId);
                var des = PlayerAdviserSystem.Instance(v.adviser_id).compose_count;
                if (PlayerAdviserSystem.Have(v.adviser_id) == false && cur >= des) {
                    list[1].push(v);
                }
                else if (PlayerAdviserSystem.Have(v.adviser_id) == false && cur < des) {
                    list[2].push(v);
                }
            }
            //list[0]= Table.Copy(Game.PlayerAdviserSystem.adviser);
            list[0] = zj.Game.PlayerAdviserSystem.adviser;
            list[0].sort(function (a, b) {
                if (a.level == b.level) {
                    if (PlayerAdviserSystem.Instance(a.adviserId).quality == PlayerAdviserSystem.Instance(b.adviserId).quality) {
                        return a.adviserId - b.adviserId;
                    }
                    else {
                        return PlayerAdviserSystem.Instance(b.adviserId).quality - PlayerAdviserSystem.Instance(a.adviserId).quality;
                    }
                }
                else {
                    return b.level - a.level;
                }
            });
            list[1].sort(function (a, b) {
                if (a.quality == b.quality) {
                    return a.adviser_id - b.adviser_id;
                }
                else {
                    return b.quality - a.quality;
                }
            });
            list[2].sort(function (a, b) {
                if (a.quality == b.quality) {
                    return a.adviser_id - b.adviser_id;
                }
                else {
                    return b.quality - a.quality;
                }
            });
            var advisers = [];
            for (var k in list) {
                var v = list[k];
                for (var kk in v) {
                    advisers.push(v[kk]);
                }
            }
            return advisers;
        };
        PlayerAdviserSystem.GetId = function (index, advisers) {
            if (advisers == null) {
                advisers = zj.Game.PlayerAdviserSystem.adviser;
            }
            for (var k in zj.Game.PlayerAdviserSystem.adviser) {
                var v = zj.Game.PlayerAdviserSystem.adviser[k];
                if (v.adviserId == index) {
                    return k;
                }
            }
        };
        //根据宠物ID获取宠物信息
        PlayerAdviserSystem.PetBase = function (id) {
            if (id == 0 || id == -1)
                return null;
            return zj.TableBasePet.Item(id);
        };
        //是否召唤宠物
        PlayerAdviserSystem.GetPet = function (petId, petInfo) {
            if (petInfo == null) {
                petInfo = zj.Game.PlayerAdviserSystem.petInfo;
            }
            var isHave = zj.Table.FindF(zj.Game.PlayerAdviserSystem.petInfo, function (k, v) {
                return v.pet_id == petId;
            });
            return isHave;
        };
        PlayerAdviserSystem.Haves = function () {
            var tbl = zj.TableBaseAdviser.Table();
            var list = [];
            var min = 20;
            for (var kk in tbl) {
                var vv = tbl[kk];
                var itemId = PlayerAdviserSystem.Instance(vv.adviser_id).compose_goods;
                var cur = zj.PlayerItemSystem.Count(itemId);
                var des = PlayerAdviserSystem.Instance(vv.adviser_id).compose_count;
                var isHave = PlayerAdviserSystem.Have(vv.adviser_id);
                if (isHave == false && cur >= des) {
                    list.push(vv);
                }
            }
            var ret = zj.Table.DeepCopy(list);
            zj.Table.Sort(ret, function (a, b) {
                return a.adviser_id < b.adviser_id;
            });
            for (var kk in ret) {
                var vv = ret[kk];
                if (vv.adviser_id < min) {
                    min = vv.adviser_id;
                    return min;
                }
            }
            return false;
        };
        PlayerAdviserSystem.Open = function () {
            var tbl = zj.TableBaseAdviser.Table();
            var open = zj.Table.FindF(tbl, function (k, v) {
                var IsHave = PlayerAdviserSystem.Have(v.adviser_id);
                var itemId = PlayerAdviserSystem.Instance(v.adviser_id).compose_goods;
                var Cur = zj.PlayerItemSystem.Count(itemId);
                var Des = PlayerAdviserSystem.Instance(v.adviser_id).compose_count;
                return IsHave || (!IsHave && Cur >= Des);
            });
            return open;
        };
        //宠物排序
        PlayerAdviserSystem.SortPet = function () {
            var info = zj.TableBasePet.Table();
            var list = [[], [], []];
            for (var k in info) {
                var v = info[k];
                var itemId = this.PetBase(v.pet_id).compose_goods;
                var cur = zj.PlayerItemSystem.Count(itemId);
                var des = this.PetBase(v.pet_id).compose_count;
                if (v.is_open == 1) {
                    if (this.GetPet(v.pet_id) == false && cur >= des) {
                        list[1].push(v);
                    }
                    else if (this.GetPet(v.pet_id) == false && cur < des) {
                        list[2].push(v);
                    }
                }
            }
            //list[0]=Table.DeepCopy(Game.PlayerAdviserSystem.petInfo);
            list[0] = zj.Game.PlayerAdviserSystem.petInfo;
            list[0].sort(function (a, b) {
                if (a.star == b.star) {
                    if (PlayerAdviserSystem.PetBase(a.pet_id).quality == PlayerAdviserSystem.PetBase(b.pet_id).quality) {
                        return a.pet_id - b.pet_id;
                    }
                    else {
                        return PlayerAdviserSystem.PetBase(b.pet_id).quality - PlayerAdviserSystem.PetBase(a.pet_id).quality;
                    }
                }
                else {
                    return b.star - a.star;
                }
            });
            list[1].sort(function (a, b) {
                if (a.quality == b.quality) {
                    return a.pet_id - b.pet_id;
                }
                else {
                    return b.quality - a.quality;
                }
            });
            list[2].sort(function (a, b) {
                if (a.quality == b.quality) {
                    return a.pet_id - b.pet_id;
                }
                else {
                    return b.quality - a.quality;
                }
            });
            var advisers = [];
            for (var k in list) {
                var v = list[k];
                for (var kk in v) {
                    advisers.push(v[kk]);
                }
            }
            return advisers;
        };
        //宠物属性
        PlayerAdviserSystem.AttriAdd = function (petId, star) {
            var info = [];
            var attri = 0;
            var title = 0;
            var tbl = this.PetBase(petId);
            var tblnew = [];
            for (var k in tbl) {
                var v = tbl[k];
                tblnew.push(v);
            }
            for (var k in tblnew) {
                var v = tblnew[k];
                if (Number(k) >= 16 && Number(k) <= 29) {
                    info.push(v);
                }
            }
            var _loop_1 = function (kk) {
                var vv = info[kk];
                if (vv[0] != 0) {
                    attri = zj.Table.Add(1, star, function (id) {
                        return vv[star - 1];
                    });
                    title = Number(kk);
                }
            };
            for (var kk in info) {
                _loop_1(kk);
            }
            return [attri, title];
        };
        PlayerAdviserSystem.AdviserlvdbInstance = function (id) {
            if (id == 0 || id == -1)
                return null;
            return zj.TableAdviserLevel.Item(id);
        };
        PlayerAdviserSystem.AdviserlvdbIsMax = function (id, level) {
            var level_idx = id * 10000 + level;
            if (PlayerAdviserSystem.AdviserlvdbInstance(level_idx + 1) == null) {
                return true;
            }
            else {
                return false;
            }
        };
        //属性加成数组
        PlayerAdviserSystem.AdviserlvdbAttrTbl = function (id, level) {
            var index = id * 10000 + level;
            var tbl_item = PlayerAdviserSystem.AdviserlvdbInstance(index);
            var ret = [];
            for (var k in message.AttriInfo) {
                var v = message.AttriInfo[k];
                if (tbl_item[v[0]] != null && tbl_item[v[1]] != 0) {
                    var tbl = [v[0], k];
                    ret.push(tbl);
                }
            }
            return ret;
        };
        //属性加成描述
        PlayerAdviserSystem.AdviserLvdbAttrDes = function (id, level, index) {
            //辅助参数
            var indexlv = id * 10000 + level;
            var tbl_item = PlayerAdviserSystem.AdviserlvdbInstance(indexlv);
            var attr_tbl = PlayerAdviserSystem.AdviserlvdbAttrTbl(id, level);
            var attr_key = attr_tbl[index][0];
            // 字符串拼接
            var str_attr_des = ""; // 属性描述
            var str_dt_opert = ""; // 变化符号
            var str_attr_cnt = ""; // 属性值
            // 返回的结构
            var ret = "";
            //属性描述
            str_attr_des = zj.TextsConfig.TextsConfig_Artifact.attrDes[attr_key];
            //变化符号
            str_dt_opert = zj.TextsConfig.TextsConfig_Artifact.attrAdd;
            var value = zj.yuan3(tbl_item[attr_key] == null, 0, tbl_item[attr_key]);
            if (value < 0) {
                str_dt_opert = zj.TextsConfig.TextsConfig_Artifact.attrReduce;
            }
            //校正
            str_attr_cnt = Math.floor(value);
            //整理结果
            ret = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Adviser.attrFormat, str_attr_des, str_dt_opert, str_attr_cnt);
            return ret;
        };
        PlayerAdviserSystem.AdviserLvdbMinLevel = function (id) {
            var maxSkill_Level = this.AdviserlvdbMaxSkill(id);
            var skill_List = zj.TableAdviserLevel.Table();
            var min = 1000;
            var list = [];
            for (var k in skill_List) {
                var v = skill_List[k];
                if (v.skill_level == maxSkill_Level && id == v.adviser_id) {
                    list.push(v.level);
                }
            }
            for (var k in list) {
                var v = list[k];
                if (v < min) {
                    min = v;
                }
            }
            return min;
        };
        PlayerAdviserSystem.AdviserlvdbMaxSkill = function (id) {
            var skill_List = zj.TableAdviserLevel.Table();
            var max = 1;
            for (var k in skill_List) {
                var v = skill_List[k];
                if (v.skill_level >= max && id == v.adviser_id) {
                    max = v.skill_level;
                }
            }
            return max;
        };
        PlayerAdviserSystem.AdviserLvdbGetLevel = function (index, id) {
            var info = PlayerAdviserSystem.AdviserLvdbSortLevel();
            var skill = PlayerAdviserSystem.AdviserlvdbInstance(index).skill_level;
            var list = [];
            var min = PlayerAdviserSystem.AdviserLvdbGetMaxIndex();
            var skill_level = null;
            for (var k in info) {
                var v = info[k];
                if (v.adviser_id == id && v.skill_level - 1 == skill) {
                    list.push(v);
                }
            }
            for (var kk in list) {
                var vv = list[kk];
                if (vv.index <= min) {
                    min = vv.index;
                    skill_level = vv.level;
                }
            }
            return skill_level;
        };
        PlayerAdviserSystem.AdviserLvdbSortLevel = function () {
            var tbl = zj.TableAdviserLevel.Table();
            var ret = zj.Table.DeepCopy(tbl);
            zj.Table.Sort(ret, function (a, b) {
                return a.index < b.index;
            });
            return ret;
        };
        PlayerAdviserSystem.AdviserLvdbGetMaxIndex = function () {
            var list = this.AdviserLvdbSortLevel();
            var max = 1;
            for (var k in list) {
                var v = list[k];
                if (v.index > max) {
                    max = v.index;
                }
            }
            return max;
        };
        PlayerAdviserSystem.CompletedHave = function (id) {
            var itemId = PlayerAdviserSystem.Instance(id).compose_goods;
            var Cur = zj.PlayerItemSystem.Count(itemId);
            var Des = PlayerAdviserSystem.Instance(id).compose_count;
            var isHave = PlayerAdviserSystem.Have(id);
            return (Cur >= Des && !isHave);
        };
        PlayerAdviserSystem.CompletedMax = function (id, level) {
            if (level == 0) {
                level = 1;
            }
            var level_next = 0;
            var itemId = PlayerAdviserSystem.Instance(id).compose_goods;
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = PlayerAdviserSystem.AdviserlvdbInstance(id * 10000 + level).consume_count;
            var money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var money_des = PlayerAdviserSystem.AdviserlvdbInstance(id * 10000 + level).adviser_money;
            var isHave = PlayerAdviserSystem.Have(id);
            if (!isHave) {
                level_next = level + 1;
            }
            else {
                level_next = level;
            }
            var isMax = PlayerAdviserSystem.AdviserlvdbIsMax(id, level_next);
            return (isHave && cur >= des && !isMax && money >= money_des);
        };
        // 宠物可召唤
        PlayerAdviserSystem.PetGetTips = function (petID) {
            var itemId = PlayerAdviserSystem.PetBase(petID).compose_goods;
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = PlayerAdviserSystem.PetBase(petID).compose_count;
            var isHave = PlayerAdviserSystem.GetPet(petID);
            return (cur >= des && !isHave);
        };
        // 宠物可升星
        PlayerAdviserSystem.PetUpStar = function (id, star) {
            star = star - 1;
            var max = 35;
            var itemId = PlayerAdviserSystem.PetBase(id).up_goods[star][0];
            var cur = zj.PlayerItemSystem.Count(itemId);
            var des = PlayerAdviserSystem.PetBase(id).up_count[star][0];
            var money = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var money_des = PlayerAdviserSystem.PetBase(id).up_money[star];
            var isHave = PlayerAdviserSystem.GetPet(id);
            // let isMax = PlayerAdviserSystem.AdviserlvdbIsMax(id , lev)
            return isHave && cur >= des && star != max && money >= money_des;
        };
        // 宠物可进化
        PlayerAdviserSystem.PetStep = function (id) {
            var star = zj.Game.PlayerAdviserSystem.petMap[id].star;
            var step = 0;
            if (zj.Game.PlayerAdviserSystem.petMap[id].step == zj.CommonConfig.pet_step_max) {
                step = zj.Game.PlayerAdviserSystem.petMap[id].step - 1;
            }
            else {
                step = zj.Game.PlayerAdviserSystem.petMap[id].step;
            }
            var goods = PlayerAdviserSystem.PetBase(id).evo_consume[step];
            var count = PlayerAdviserSystem.PetBase(id).evo_consume_good[step][0];
            var cur1 = zj.PlayerItemSystem.Count(goods[0]);
            var money = PlayerAdviserSystem.PetBase(id).evo_consume_money[step];
            var moneyDes = zj.PlayerItemSystem.Resource(message.EResourceType.RESOURCE_MONEY);
            var curStar = 0;
            if (step <= zj.CommonConfig.pet_step_max) {
                curStar = PlayerAdviserSystem.PetBase(id).evo_star_req[step];
            }
            return zj.Game.PlayerAdviserSystem.petMap[id].step != zj.CommonConfig.pet_step_max && step <= zj.CommonConfig.pet_step_max && zj.Game.PlayerAdviserSystem.petMap[id].star >= curStar && cur1 >= count && moneyDes >= money;
        };
        PlayerAdviserSystem.GetPetEvolution = function (petId, petInfo) {
            petId = petId != null ? petId : petInfo.pet_id;
            petInfo = petInfo != null ? petInfo : zj.Game.PlayerAdviserSystem.petMap[petId];
            var step = 0;
            if (petInfo.step < PlayerAdviserSystem.PetBase(petId).unlock_step[1]) {
                step = 1;
            }
            else if (petInfo.step >= PlayerAdviserSystem.PetBase(petId).unlock_step[1] && petInfo.step < PlayerAdviserSystem.PetBase(petId).unlock_step[2]) {
                step = 2;
            }
            else {
                step = 3;
            }
            var spine_id = PlayerAdviserSystem.PetBase(petId).spine_id[step - 1];
            return spine_id;
        };
        //宠物休息、跟随
        PlayerAdviserSystem.PetBattle_Visit = function (pet_id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PetPlayingRequest();
                request.body.pet_id = pet_id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        zj.toast(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //念兽召唤
        PlayerAdviserSystem.ReqSummon = function (adviserId) {
            // let data_net = Game.PlayerAdviserSystem.advisersMap[] ;
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.AdviserComposeRequest();
                request.body.adviserId = adviserId;
                // request.body.count = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //宠物召唤
        PlayerAdviserSystem.PetGet_Req = function (petId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PetGetRequest();
                request.body.pet_id = petId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //宠物进化
        PlayerAdviserSystem.PetEvolution_Req = function (petId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PetEvolutionRequest();
                request.body.pet_id = petId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        // 念兽升星协议
        PlayerAdviserSystem.AdviserUpLevel_Req = function (index) {
            var _this = this;
            var data_Id = PlayerAdviserSystem.GetId(index);
            var data_net = zj.Game.PlayerAdviserSystem.adviser[data_Id];
            return new Promise(function (resolve, reject) {
                var request = new message.AdviserUpLevelRequest();
                request.body.adviserId = data_net.adviserId;
                // request.body.count = count;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        //宠物升星
        PlayerAdviserSystem.PetUpStar_Visit = function (pet_id) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.PetLevelUpRequest();
                request.body.pet_id = pet_id;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        // toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        return PlayerAdviserSystem;
    }());
    zj.PlayerAdviserSystem = PlayerAdviserSystem;
    __reflect(PlayerAdviserSystem.prototype, "zj.PlayerAdviserSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerAdviserSystem.js.map