var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var SkillCd = (function () {
        function SkillCd(role, skill, bEntry) {
            // body	
            this.belong_role = null;
            this.belong_skill = null;
            this.maxTime = 0;
            this.time = 0;
            this.cdTime = null;
            this.overflow = null;
            this.bFinish = false;
            this.bPause = false;
            this.isComplete = false;
            this.belong_role = role;
            this.belong_skill = skill;
            this.maxTime = 0;
            this.time = 0;
            var t_value = this.belong_role.handleTalentEffect_EntryTime();
            this.entryTime = skill.getCdEntry() + t_value;
            if (this.entryTime <= 0) {
                this.entryTime = 0;
            }
            //教学关特殊处理
            if (zj.teachBattle.teach_value[zj.Game.TeachSystem.curPart] != null) {
                var tbl = zj.teachBattle.teach_value[zj.Game.TeachSystem.curPart][zj.PlayerHunterSystem.GetGeneralId(role.roleId)];
                if (tbl != null) {
                    if (tbl.cd != null) {
                        this.entryTime = tbl.cd;
                    }
                }
            }
            this.cdTime = skill.getCd();
            this.maxTime = bEntry && this.entryTime || this.cdTime;
            this.time = this.maxTime;
            this.overflow = 0;
            this.bFinish = false;
            this.bPause = false;
        }
        SkillCd.prototype.release = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.belong_role = null;
            this.belong_skill = null;
        };
        SkillCd.prototype.update = function (tick) {
            // body	
            //if( this.bFinish == true or this.bPause == true ){
            //	return 
            //}
            if (this.time <= 0) {
                this.bFinish = true;
                return;
            }
            this.bFinish = false;
            if (this.belong_role.bSleep == true) {
                return;
            }
            if (this.belong_role.isWeeking() == true) {
                return;
            }
            var speedUpRatio = this.belong_role.getBuffSpeedUp();
            var speedDownRatio = this.belong_role.getBuffSpeedDown();
            var ratio = 1.0 + speedUpRatio - speedDownRatio;
            /*
            if( this.belong_role.bSpeedDown == true ){
                ratio = 0.5
            }
            */
            this.isComplete = true;
            this.time = this.time - tick * 1000 * ratio;
            if (this.time <= 0) {
                this.time = 0;
                this.bFinish = true;
            }
        };
        SkillCd.prototype.openNext = function (args) {
            // body
            if (this.belong_skill != null) {
                this.cdTime = this.belong_skill.getCd();
            }
            this.maxTime = this.cdTime;
            this.time = this.maxTime;
            this.overflow = 0;
        };
        SkillCd.prototype.setIsPause = function (tag) {
            // body
            this.bPause = tag;
        };
        SkillCd.prototype.isPause = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.bPause;
        };
        SkillCd.prototype.setIsFinish = function (tag) {
            // body
            this.bFinish = tag;
        };
        SkillCd.prototype.IsFinish = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            var tag = false;
            if (this.time <= 0 || this.bFinish) {
                if (this.isComplete == true) {
                    tag = true;
                }
            }
            return tag;
        };
        SkillCd.prototype.getTime = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.time;
        };
        SkillCd.prototype.getMaxTime = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.maxTime;
        };
        SkillCd.prototype.setTime = function (time) {
            this.time = time;
        };
        SkillCd.prototype.setMaxTime = function (time) {
            this.maxTime = time;
        };
        SkillCd.prototype.getBelongSkill = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.belong_skill;
        };
        SkillCd.prototype.getBelongRole = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            return this.belong_role;
        };
        return SkillCd;
    }());
    zj.SkillCd = SkillCd;
    __reflect(SkillCd.prototype, "zj.SkillCd");
    var SkillCdMgr = (function () {
        function SkillCdMgr() {
            this.tableCd = {};
            this.battleFormulaValue = 3500;
        }
        Object.defineProperty(SkillCdMgr, "Instance", {
            get: function () {
                if (SkillCdMgr.instance_ == null) {
                    SkillCdMgr.instance_ = new SkillCdMgr();
                }
                return SkillCdMgr.instance_;
            },
            enumerable: true,
            configurable: true
        });
        SkillCdMgr.prototype.construct = function () {
        };
        SkillCdMgr.prototype.clearCd = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // body
            this.resetCd();
        };
        SkillCdMgr.prototype.addSkillCd = function (role, skill, bEntry) {
            // body
            //let tag = this.isSkillExit( skill )
            //if( tag == true ){ assert(true) }
            // skill.StableObjectId
            if (this.tableCd[skill.onlyId] == null) {
                var tmp = new SkillCd(role, skill, bEntry);
                this.tableCd[skill.onlyId] = tmp;
            }
            //this.modifyCdUi( role, skill, tmp )
        };
        SkillCdMgr.prototype.modifySkillCd = function (role, skill, time, tag, isOverFlow) {
            // body
            if (tag == null) {
                tag = false;
            }
            var cd = this.tableCd[skill.onlyId];
            if (cd == null) {
                return;
            }
            var curTime = cd.getTime();
            var maxTime = cd.getMaxTime();
            var belongRole = cd.getBelongRole();
            if (time < 0) {
                var tmp = curTime + time;
                if (tmp < 0) {
                    if (maxTime == cd.entryTime) {
                        cd.maxTime = cd.cdTime;
                        maxTime = cd.maxTime;
                    }
                    cd.setTime(0);
                    if (tag == true) {
                        cd.overflow = tmp;
                    }
                    else {
                        cd.overflow = 0;
                    }
                }
                else {
                    cd.setTime(tmp);
                }
            }
            else {
                var tmp = curTime + time;
                if (isOverFlow) {
                }
                else {
                    if (tmp >= cd.maxTime) {
                        tmp = cd.maxTime;
                    }
                }
                cd.setTime(tmp);
            }
            /*
            let cd = this.tableCd[ skill ]
            if( cd == null ){ return }
            if( cd.isPause() == true ){ return }
            do
                let maxTime = cd.getMaxTime()
                let belongRole = cd.getBelongRole()
                let curTime = cd.getTime()
                if( time < 0 ){
                    let tmp = curTime + time
                    if( tmp < 0 ){
                        if( maxTime == cd.entryTime ){
                            cd.maxTime = cd.cdTime
                            maxTime = cd.maxTime
                        }
                        belongRole.addBean()
                        if( belongRole.isBeanMax() == true ){
                            cd.setIsFinish(false)
                            cd.setIsPause(true)
                        }else{
                            let extra = maxTime - math.abs(tmp)
                            if( extra >= 0 ){
                                cd.setTime(extra)
                            }
                        }
                    }else{
                        cd.setTime(tmp)
                    }
                }else if( time > 0 ){
                    let tmp = curTime + time
                    if( tmp >= cd.cdTime ){
                        tmp = cd.cdTime
                    }
                    cd.setTime(tmp)
                }
            }
            */
        };
        SkillCdMgr.prototype.isSkillExit = function (skill) {
            // body
            if (skill == null) {
                return [false, null];
            }
            if (this.tableCd[skill.onlyId] == null) {
                return [false, null];
            }
            return [true, this.tableCd[skill.onlyId]];
            /*
            let tag = false
            let cd = null
            for k,v in pairs(this.tableCd) do
                if( v.belong_skill == skill ){
                    tag = true
                    cd = v
                    break
                }
            }
            return tag, cd
            */
        };
        // 从cdTable中获取数据
        SkillCdMgr.prototype.getCurCd = function (skill) {
            if (skill == null) {
                return null;
            }
            if (this.tableCd[skill.onlyId] == null) {
                return null;
            }
            return this.tableCd[skill.onlyId];
            /*
            for k,v in pairs(this.tableCd) do
                if( v.belong_skill == skill ){
                    return v
                }
            }
            return null
            */
        };
        SkillCdMgr.prototype.update = function (tick) {
            for (var key in this.tableCd) {
                this.tableCd[key].update(tick);
            }
            // // body   
            // let i = 1
            // //while i <= this.tableCd.length do
            // for (let[k,cur] of HelpUtil.GetKV(this.tableCd)){
            //     cur.update(tick)
            //     //let cur = this.tableCd[i]	
            //     /*	
            //     if( cur.bFinish == true ){
            //         cur.setIsFinish(false)
            //         cur.belong_role.addBean()
            //         if( cur.belong_role.isBeanMax() == true ){
            //             cur.setIsFinish(false)
            //             cur.setIsPause(true)
            //         }else{
            //             cur.openNext()
            //         }                    
            //     }else{
            //         cur.update(tick)
            //         //i = i + 1
            //     }
            //     */
            // }
        };
        SkillCdMgr.prototype.resetCd = function () {
            // body     
            for (var k in this.tableCd) {
                zj.CC_SAFE_DELETE(this.tableCd[k]);
            }
            this.tableCd = {};
        };
        SkillCdMgr.prototype.reCalcCd = function (skill) {
            if (skill == null) {
                return;
            }
            if (this.tableCd[skill.onlyId] != null) {
                this.tableCd[skill.onlyId].cdTime = skill.getCd();
            }
        };
        SkillCdMgr.prototype.cleanRoleCd = function (role) {
            var skill = role.getPressSkill();
            if (skill != null) {
                delete this.tableCd[skill.onlyId];
            }
            /*
            let i = 1
            while i <= this.tableCd.length do
                let cur = this.tableCd[i]
                if( cur.getBelongRole() == role ){
                    table.remove(this.tableCd, i)
                }else{
                    i = i + 1
                }
            }
            */
        };
        SkillCdMgr.prototype.setRoleCd = function (role, cd) {
            var skill = role.getPressSkill();
            if (skill != null) {
                this.tableCd[skill.onlyId] = cd;
            }
        };
        return SkillCdMgr;
    }());
    zj.SkillCdMgr = SkillCdMgr;
    __reflect(SkillCdMgr.prototype, "zj.SkillCdMgr");
})(zj || (zj = {}));
//# sourceMappingURL=SkillCd.js.map