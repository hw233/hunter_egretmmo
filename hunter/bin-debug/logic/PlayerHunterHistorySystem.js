var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 猎人图鉴
    // hexiaowei 创建于2018.12.12
    var PlayerHunterHistorySystem = (function () {
        function PlayerHunterHistorySystem() {
            ///////////////////////////////////////////////////////////////////////////
            // 静态函数
            ///////////////////////////////////////////////////////////////////////////
            // 变量
            this.generalHistoryIds = []; //猎人图鉴
            this.generalsPokedexMap = {};
        }
        ///////////////////////////////////////////////////////////////////////////
        // 成员方法
        PlayerHunterHistorySystem.prototype.init = function () {
            zj.Game.EventManager.on(zj.GameEvent.PLAYER_GENERAL_HISTORY_IDS_CHANGE, this.onGeneralHistoryIdsChange, this);
        };
        PlayerHunterHistorySystem.prototype.uninit = function () {
            this.generalHistoryIds = [];
        };
        PlayerHunterHistorySystem.prototype.onGeneralHistoryIdsChange = function (ev) {
            this.generalHistoryIds = ev.data;
        };
        // 获取所有猎人图鉴
        PlayerHunterHistorySystem.prototype.getAllGeneralHistoryIds = function () {
            return this.generalHistoryIds;
        };
        // 猎人图鉴索引
        PlayerHunterHistorySystem.prototype.getGeneralHistoryIds = function () {
            //let generalsPokedexMap: {[id: number]: {}} = {}; 
            zj.StringConfig_Table.baseGeneral;
            var m = zj.TableBaseGeneral.Table();
            for (var k in zj.TableBaseGeneral.Table()) {
                var v = zj.TableBaseGeneral.Table()[k];
                var poledex = {
                    generalId: null,
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
                var general = new message.GeneralInfo();
                general.general_id = v.general_id;
                general.level = 1;
                general.star = v.init_star;
                general.step = 1;
                var passiveInfo = new message.PassiveInfo();
                passiveInfo.talentId = v.awake_passive;
                passiveInfo.level = 1;
                general.awakePassive = passiveInfo;
                // 对应basegeneral表里的id
                poledex.generalId = v.general_id;
                // 是否已经拥有
                poledex.isHave = false;
                // 排序规则（1、资质 2、id）
                poledex.order = 100000 * v.aptitude + v.general_id;
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
                zj.Game.PlayerHunterHistorySystem.generalsPokedexMap[v.general_id] = poledex;
            }
            return zj.Game.PlayerHunterHistorySystem.generalsPokedexMap;
        };
        // 获取拥有的猎人图鉴
        PlayerHunterHistorySystem.prototype.getPokedexSkill = function () {
            var tblSkill = [];
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
        };
        // 拥有的猎人图鉴跟所有图鉴做对比
        PlayerHunterHistorySystem.prototype.pokedexDataFresh = function () {
            var hasNum = 0; //拥有的猎人数量
            var totalNum = 0; // 猎人总数量
            var mn = zj.Game.PlayerHunterHistorySystem.getGeneralHistoryIds();
            for (var k in zj.Game.PlayerHunterHistorySystem.generalsPokedexMap) {
                var v = zj.Game.PlayerHunterHistorySystem.generalsPokedexMap[k];
                if (!v.bOpen) {
                    continue;
                }
                var n = zj.Table.FindK(zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), Number(k));
                // 判断猎人是否拥有，修改属性值
                if (zj.Table.FindK(zj.Game.PlayerHunterHistorySystem.getAllGeneralHistoryIds(), Number(k)) != -1) {
                    v.isHave = true;
                }
                if (v.isHave) {
                    hasNum = hasNum + 1;
                }
                totalNum = totalNum + 1;
            }
            return [hasNum, totalNum];
        };
        PlayerHunterHistorySystem.SavePokedexKey = function (id, value) {
            zj.Gmgr.Instance.pokedexTipsTbl[id] = value;
            zj.Game.PlayerHunterHistorySystem.SetPokedexKey(id, value);
        };
        PlayerHunterHistorySystem.prototype.SetPokedexKey = function (id, value) {
            if (value == null || value == undefined || id == null || id == undefined)
                return;
            var key = "pokedex_" + id;
            zj.Game.Controller.setRoleStorageItem(key, value.toString());
        };
        //  图鉴红点
        PlayerHunterHistorySystem.GetPokedexKey = function (id, bool) {
            if (id == null || id == undefined)
                return false;
            var key = "pokedex_" + id;
            var value = zj.Game.Controller.getRoleStorageItem(key);
            if (value.length == 0)
                return false;
            var t = parseInt(value);
            if (isNaN(t))
                return false;
            return (t == 1);
        };
        return PlayerHunterHistorySystem;
    }());
    zj.PlayerHunterHistorySystem = PlayerHunterHistorySystem;
    __reflect(PlayerHunterHistorySystem.prototype, "zj.PlayerHunterHistorySystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerHunterHistorySystem.js.map