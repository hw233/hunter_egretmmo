var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // 副本系统
    var PlayerStageSystem = (function () {
        function PlayerStageSystem() {
            // 副本怪物信息
            this.data = {};
        }
        PlayerStageSystem.depressData = function (data) {
            var para = {};
            para["index"] = 4;
            var inflate = new Zlib.Inflate(data, para);
            var plain = inflate.decompress();
            var decoder = new aone.BinaryDecoder(new Uint8Array(plain));
            var zipInfo = new message.ArmyStageZip();
            if (!zipInfo.parse_bytes(decoder)) {
                console.log("decompress playerStageSystem fail");
            }
            for (var i = 0; i < zipInfo.stageInfo.length; i++) {
                zj.Game.PlayerStageSystem.insert(zipInfo.stageInfo[i]);
            }
            PlayerStageSystem.stageInfoTbl = zipInfo.stageInfo;
        };
        PlayerStageSystem.prototype.Instance = function (id) {
            if (zj.ckid(id))
                return null;
            return this.data[id];
        };
        PlayerStageSystem.prototype.insert = function (armyStage) {
            var data = {};
            for (var _i = 0, _a = zj.HelpUtil.GetKV(armyStage); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                data[k] = v;
            }
            this.data[data["stage_id"]] = data;
            var suffixCom = "monster_";
            var suffixs = ["pos1", "pos2", "pos3", "pos4", "dialog"];
            for (var i = 0; i < suffixs.length; i++) {
                var suffix = suffixs[i];
                var mobs = armyStage[suffixCom + suffix];
                for (var j = 0; j < mobs.length; j++) {
                    zj.Game.PlayerMobSystem.insert(mobs[j]);
                }
            }
        };
        PlayerStageSystem.prototype.haveStages = function (stages) {
            var ret = true;
            for (var i = 0; i < stages.length; i++) {
                if (this.data[stages[i]] == null) {
                    ret = false;
                    break;
                }
            }
            return ret;
        };
        PlayerStageSystem.prototype.monsterIDs = function (armyMobsTbl) {
            var ret = [];
            for (var i = 0; i < armyMobsTbl.length; i++) {
                ret.push(armyMobsTbl[i].curInfo.monster_id);
            }
            return ret;
        };
        PlayerStageSystem.prototype.fromMonster = function (id) {
            if (zj.ckid(id)) {
                return null;
            }
            var mprID = zj.Game.PlayerMobSystem.Instance(id).monster_roleId; // TableMapRole.Item(id).  //table_map_role
            if (zj.ckid(mprID)) {
                return null;
            }
            return zj.TableMapRole.Item(mprID);
        };
        PlayerStageSystem.prototype.unInit = function () {
            this.data = {};
        };
        return PlayerStageSystem;
    }());
    zj.PlayerStageSystem = PlayerStageSystem;
    __reflect(PlayerStageSystem.prototype, "zj.PlayerStageSystem");
    // 怪物系统
    var PlayerMobSystem = (function () {
        function PlayerMobSystem() {
            this.data = {};
            // 当前怪物信息
            this.cur = {};
        }
        PlayerMobSystem.prototype.Instance = function (id) {
            if (zj.ckid(id)) {
                return null;
            }
            if (this.data[id] != null && this.data[id] != undefined && this.data) {
                return this.data[id];
            }
            else {
                console.log("DB<monster> item id not found [%d]", id);
            }
            return null;
        };
        PlayerMobSystem.prototype.insert = function (armyMobs) {
            var data = {
                curInfo: null,
                baseInfo: null,
            };
            for (var _i = 0, _a = zj.HelpUtil.GetKV(armyMobs); _i < _a.length; _i++) {
                var _b = _a[_i], k = _b[0], v = _b[1];
                data[k] = v;
            }
            if (data.curInfo.monster_id != null || data.curInfo.monster_id != undefined || data.curInfo.monster_id != 1) {
                this.data[data.curInfo.monster_id] = data.baseInfo;
                this.cur[data.curInfo.monster_id] = data.curInfo;
            }
        };
        PlayerMobSystem.prototype.GetCurInfo = function (id) {
            if (zj.ckid(id))
                return null;
            if (this.cur[id] != null && this.cur[id] != undefined) {
                return this.cur[id];
            }
            else {
                console.log("DB<monster> cur info id not found [%d]", id);
                return null;
            }
        };
        return PlayerMobSystem;
    }());
    zj.PlayerMobSystem = PlayerMobSystem;
    __reflect(PlayerMobSystem.prototype, "zj.PlayerMobSystem");
})(zj || (zj = {}));
//# sourceMappingURL=PlayerStageMobSystem.js.map