namespace zj {
// 副本系统
export class PlayerStageSystem {
    // 副本怪物信息
    public data = {};
    public static stageInfoTbl;

    public static depressData(data: Uint8Array) {
        let para = {}
        para["index"] = 4
        let inflate = new Zlib.Inflate(data, para);
        let plain = inflate.decompress();
        let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
        let zipInfo = new message.ArmyStageZip()
        if (!zipInfo.parse_bytes(decoder)) {
            console.log("decompress playerStageSystem fail");
        }

        for (let i = 0; i < zipInfo.stageInfo.length; i++) {
            Game.PlayerStageSystem.insert(zipInfo.stageInfo[i]);
        }
        PlayerStageSystem.stageInfoTbl = zipInfo.stageInfo;
    }

    public Instance(id) {
        if (ckid(id)) return null;
        return this.data[id];
    }

    public insert(armyStage) {
        let data = {};

        for (let [k, v] of HelpUtil.GetKV(armyStage)) {
            data[k] = v;
        }

        this.data[data[`stage_id`]] = data;
        let suffixCom = "monster_";
        let suffixs = ["pos1", "pos2", "pos3", "pos4", "dialog"];

        for (let i = 0; i < suffixs.length; i++) {
            let suffix = suffixs[i];
            let mobs = armyStage[suffixCom + suffix];
            for (let j = 0; j < mobs.length; j++) {
                Game.PlayerMobSystem.insert(mobs[j]);
            }
        }

    }
    public haveStages(stages) {
        let ret = true;
        for (let i = 0; i < stages.length; i++) {
            if (this.data[stages[i]] == null) {
                ret = false;
                break;
            }
        }
        return ret;
    }

    public monsterIDs(armyMobsTbl) {
        let ret = [];
        for (let i = 0; i < armyMobsTbl.length; i++) {
            ret.push(armyMobsTbl[i].curInfo.monster_id);
        }

        return ret
    }

    public fromMonster(id) {
        if (ckid(id)) {
            return null;
        }
        let mprID = Game.PlayerMobSystem.Instance(id).monster_roleId;// TableMapRole.Item(id).  //table_map_role
        if (ckid(mprID)) {
            return null;
        }
        return TableMapRole.Item(mprID);
    }

    public unInit(){
        this.data = {};
    }

}


// 怪物系统
export class PlayerMobSystem {

    public data = {};

    // 当前怪物信息
    public cur = {};

    public Instance(id) {
        if (ckid(id)) {
            return null;
        }

        if (this.data[id] != null && this.data[id] != undefined && this.data) {
            return this.data[id];
        }
        else {
            console.log("DB<monster> item id not found [%d]", id);
        }

        return null;
    }


    public insert(armyMobs) {
        let data = {
            curInfo: null,
            baseInfo: null,
        };

        for (let [k, v] of HelpUtil.GetKV(armyMobs)) {
            data[k] = v
        }

        if (data.curInfo.monster_id != null || data.curInfo.monster_id != undefined || data.curInfo.monster_id != 1) {
            this.data[data.curInfo.monster_id] = data.baseInfo;
            this.cur[data.curInfo.monster_id] = data.curInfo;
        }
    }

    public GetCurInfo(id) {
        if (ckid(id)) return null;

        if (this.cur[id] != null && this.cur[id] != undefined) {
            return this.cur[id];
        }
        else {
            console.log("DB<monster> cur info id not found [%d]", id)
            return null;
        }
    }
}
}