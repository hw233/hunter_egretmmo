var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    var Fight_ItemBoss = (function (_super) {
        __extends(Fight_ItemBoss, _super);
        function Fight_ItemBoss() {
            var _this = _super.call(this) || this;
            _this.CurMonsterMaxHp = 0;
            _this.HpScaleNotChange = 0;
            _this.hp_num = 0;
            _this.mod_hp = 0;
            _this.changeHp = 0;
            _this.oldHp = 0;
            _this.hp_numLost = 0;
            _this.mod_hpLost = 0;
            _this.changeHpState = 0;
            _this.white_num = 0;
            _this.bossChangeHp = 0;
            _this.oldHp_num = 0;
            _this.mod_hpLast = 0;
            _this.rageProgress = null;
            _this.pressCd = null;
            _this.cacheHp = 0;
            _this.cacheRage = 0;
            _this.moveTag = false;
            _this.dieTag = false;
            _this.actionTag = false;
            _this.HpShowNum = -1;
            _this.HpShowNumNext = -1;
            _this.skinName = "resource/skins/fight/FightItemBossSkin.exml";
            return _this;
        }
        Fight_ItemBoss.prototype.Init = function () {
            this.SpriteHpBlackMask = new eui.Image("ui_battle_BurBossBlood1_png");
            this.SpriteHpWhiteMask = new eui.Image("ui_battle_BurBossBloodWhite_png");
            this.SpriteHpPic2Mask = new eui.Image("ui_battle_BurBossBlood2_png");
            this.SpriteHpPic1Mask = new eui.Image("ui_battle_BurBossBlood3_png");
            this.addChild(this.SpriteHpBlackMask);
            this.addChild(this.SpriteHpWhiteMask);
            this.addChild(this.SpriteHpPic2Mask);
            this.addChild(this.SpriteHpPic1Mask);
            this.SpriteHpBlackMask.y = this.SpriteHpBlack.y;
            this.SpriteHpWhiteMask.y = this.SpriteHpWhite.y;
            this.SpriteHpPic2Mask.y = this.SpriteHpPic2.y;
            this.SpriteHpPic1Mask.y = this.SpriteHpPic1.y;
            this.SpriteHpBlackMask.x = this.SpriteHpBlack.x;
            this.SpriteHpWhiteMask.x = this.SpriteHpWhite.x;
            this.SpriteHpPic2Mask.x = this.SpriteHpPic2.x;
            this.SpriteHpPic1Mask.x = this.SpriteHpPic1.x;
            this.SpriteHpBlack.mask = this.SpriteHpBlackMask;
            this.SpriteHpWhite.mask = this.SpriteHpWhiteMask;
            this.SpriteHpPic2.mask = this.SpriteHpPic2Mask;
            this.SpriteHpPic1.mask = this.SpriteHpPic1Mask;
            this.tableBuffPre = [];
            this.update = egret.setInterval(this.Update, this, 0);
            zj.UIManager.Stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
            this.onStageResize();
        };
        Fight_ItemBoss.prototype.onStageResize = function () {
            this.x = zj.UIManager.StageWidth - 524;
        };
        Fight_ItemBoss.prototype.OnExit = function () {
            egret.clearInterval(this.update);
            this.update = -1;
            zj.UIManager.Stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
        };
        Fight_ItemBoss.prototype.Load = function () {
            this.progressRect = this.SpriteHpPic1.width;
            this.SpriteHpWhite.visible = false;
            this.SpriteHpBlack.visible = false;
        };
        //设置信息
        Fight_ItemBoss.prototype.SetInfo = function (monsterInfo) {
            this.monster = monsterInfo;
            if (this.monster == null) {
                return;
            }
            this.SpriteHead.visible = true;
            this.SpriteHead.source = zj.cachekey(this.monster.headPath, this);
            this.LabelName.visible = true;
            this.LabelName.text = this.monster.roleName;
            if (this.monster.getPressSkill() != null) {
                this.pressCd = zj.SkillCdMgr.Instance.getCurCd(this.monster.getPressSkill());
            }
            this.monsterCurHp = this.monster.getHp();
            this.CurMonsterMaxHp = this.monster.getMaxHp();
            this.HpScaleNotChange = this.CurMonsterMaxHp / this.monster.nHpTube;
            this.cacheHp = this.monsterCurHp;
            this.InitBloodData();
            this.InitRage();
        };
        Fight_ItemBoss.prototype.ResetCurrBossInfo = function () {
            this.monsterCurHp = this.monster.getHp();
            this.CurMonsterMaxHp = this.monster.getMaxHp();
            this.HpScaleNotChange = this.CurMonsterMaxHp / this.monster.nHpTube;
            this.cacheHp = this.monsterCurHp;
            this.LabelName.text = this.monster.roleName;
        };
        Fight_ItemBoss.prototype.UpdateBlood = function (tick) {
            if (this.monster != null) {
                if (this.cacheHp != this.monster.getHp()) {
                    var curHp = this.monster.getHp();
                    this.monsterCurHp = curHp;
                    var changeHp = this.cacheHp - this.monsterCurHp;
                    if (changeHp < 0) {
                        this.InitBloodData();
                    }
                    else {
                        this.CheckMonsterHp(changeHp);
                    }
                    this.cacheHp = curHp;
                }
                this.FreshHp(tick);
            }
        };
        //检测
        Fight_ItemBoss.prototype.CheckMonsterHp = function (changeHp) {
            this.changeHp = Math.floor(changeHp);
            if (this.changeHp <= 0) {
                this.changeHpState = 0;
            }
            else {
                this.changeHpState = 1;
                this.white_num = 1;
            }
            this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
            this.mod_hp = this.monsterCurHp % this.HpScaleNotChange;
            if (this.CurMonsterMaxHp >= this.changeHp) {
                this.oldHp = this.changeHp + this.monsterCurHp;
            }
            else {
                this.oldHp = this.CurMonsterMaxHp;
                this.changeHp = this.CurMonsterMaxHp;
            }
            this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
            this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
            this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
            this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
        };
        Fight_ItemBoss.prototype.IsNeedEnduringHp = function () {
            if (!this.monster.isActivityBoss())
                return;
            if (this.oldHp < zj.activityBossConfig.boss_min_blood_tube) {
                var addHp = zj.activityBossConfig.boss_add_tube_add * this.HpScaleNotChange;
                var curHp = this.monster.getHp();
                this.monster.setHp(addHp + curHp);
                this.setEnduringHp();
            }
        };
        Fight_ItemBoss.prototype.setEnduringHp = function () {
            this.monsterCurHp = this.monster.getHp();
            this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
            this.mod_hp = this.monsterCurHp % this.HpScaleNotChange;
            this.oldHp = this.monsterCurHp;
            this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
            this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
            this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
            this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
        };
        Fight_ItemBoss.prototype.InitBloodData = function () {
            this.changeHp = 0;
            this.changeHpState = 0;
            this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
            this.mod_hp = (this.monsterCurHp - 0.000001) % this.HpScaleNotChange;
            this.oldHp = this.monsterCurHp;
            this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
            this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
            this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
            this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
        };
        Fight_ItemBoss.prototype.InitRage = function () {
            // let x = this.SpriteRagePic.x;
            // let y = this.SpriteRagePic.y;
            // this.BarRageNode.x = x;
            // this.BarRageNode.y = y;
            // this.SpriteRagePic.visible = false;
            this.rageWidth = this.SpriteRagePic.width;
            this.rageProgressMask = zj.Util.getMaskImgBlack(this.SpriteRagePic.width, this.SpriteRagePic.height);
            this.addChild(this.rageProgressMask);
            this.rageProgressMask.x = this.SpriteRagePic.x;
            this.rageProgressMask.y = this.SpriteRagePic.y;
            this.SpriteRagePic.mask = this.rageProgressMask;
            //this.rageProgressMask.x = 123+this.rageWidth;
        };
        Fight_ItemBoss.prototype.FreshHp = function (dt) {
            //如果是最后一条血量，则第二条不显示
            if (this.oldHp - this.HpScaleNotChange < 0) {
                this.SpriteHpPic2.visible = false;
            }
            else {
                this.SpriteHpPic2.visible = true;
            }
            //前端血条颜色
            var HpShowNum = 0;
            HpShowNum = (this.oldHp_num) % 6;
            HpShowNum = Math.floor(HpShowNum);
            if (this.HpShowNum != HpShowNum) {
                this.HpShowNum = HpShowNum;
                this.SpriteHpPic1.source = zj.cachekey("ui_battle_BurBossBlood" + HpShowNum + "_png", this);
            }
            //前端血条掉血效果刷新
            var x = this.SpriteHpPic2.x;
            var y = this.SpriteHpPic2.y;
            var sizew = this.SpriteHpPic2.width;
            var sizeh = this.SpriteHpPic2.height;
            if (this.oldHp_num == this.hp_num) {
                if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
                    x = x + sizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                }
                else {
                    x = x + sizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
                }
            }
            else {
                if (this.mod_hpLast > 0) {
                    x = x + sizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
                }
                else {
                    x = x + sizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                }
            }
            if (this.oldHp_num == this.hp_num) {
                if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
                    sizew = sizew * ((this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                }
                else {
                    sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
                }
            }
            else {
                if (this.mod_hpLast > 0) {
                    sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
                }
                else {
                    sizew = sizew * ((this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                }
            }
            this.SpriteHpPic1Mask.x = x;
            this.SpriteHpPic1Mask.y = y;
            //后端血条颜色
            var HpShowNumNext = 0;
            HpShowNumNext = (this.oldHp_num - 1) % 6;
            HpShowNumNext = Math.floor(HpShowNumNext);
            if (this.HpShowNumNext != HpShowNumNext) {
                this.HpShowNumNext = HpShowNumNext;
                this.SpriteHpPic2.source = zj.cachekey("ui_battle_BurBossBlood" + HpShowNumNext + "_png", this);
            }
            //黑条掉血效果刷新
            x = this.SpriteHpPic2.x;
            y = this.SpriteHpPic2.y;
            var _balckX = x;
            var blackSizew = this.SpriteHpPic2.width;
            var blackSizeh = this.SpriteHpPic2.height;
            if (this.hp_numLost < 1) {
                if (this.oldHp_num == this.hp_num) {
                    if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
                        x = x + blackSizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                    }
                    else {
                        x = x + blackSizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
                    }
                }
                else {
                    if (this.mod_hpLast > 0) {
                        x = x + blackSizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
                    }
                    else {
                        x = x + blackSizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
                    }
                }
                if (this.oldHp_num == this.hp_num) {
                    if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
                        blackSizew = blackSizew * ((this.mod_hpLost) / this.HpScaleNotChange);
                    }
                    else {
                        blackSizew = blackSizew * ((this.mod_hpLast) / this.HpScaleNotChange);
                    }
                }
                else {
                    if (this.mod_hpLast > 0) {
                        blackSizew = blackSizew * ((this.mod_hpLast) / this.HpScaleNotChange);
                    }
                    else {
                        blackSizew = blackSizew * ((this.mod_hpLost) / this.HpScaleNotChange);
                    }
                }
            }
            this.SpriteHpBlackMask.x = x;
            this.SpriteHpBlackMask.y = y;
            //如果没有掉血，则隐藏黑条，一旦有掉血就显示黑条，在白条图层之下
            if (this.changeHp > 0) {
                this.SpriteHpBlack.visible = true;
            }
            else {
                this.SpriteHpBlack.visible = false;
                this.changeHpState = 0;
                this.changeHp = 0;
            }
            //血量数字以及剩余血条数刷新
            var num = 0;
            if (this.monsterCurHp == 0) {
                num = 0;
            }
            else if (this.monsterCurHp == this.CurMonsterMaxHp) {
                num = this.monsterCurHp / this.HpScaleNotChange;
                num = Math.ceil(num);
            }
            else {
                num = Math.floor((this.changeHp + this.monsterCurHp) / this.HpScaleNotChange) + 1;
            }
            var wenhao = 0;
            if (num != 0) {
                if (zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK || zj.Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
                    wenhao = 1;
                }
                this.LabelHpNum.visible = true;
                if (wenhao == 0) {
                    this.LabelHpNum.text = "X" + num;
                }
                else {
                    this.LabelHpNum.text = "???";
                }
            }
            else {
                this.LabelHpNum.visible = false;
            }
            //控制掉血的数据刷新，将血条分为三个阶段：
            //0.平时不掉血 
            //1.掉血后先闪一下白条（此时显示黑条） 
            //2.黑条和前端血条重叠并递减血条
            if (this.changeHpState == 0) {
                //正常阶段不掉血
                return;
            }
            else if (this.changeHpState == 1) {
                //闪白条阶段
                this.white_num = this.white_num - 0.07;
                if (this.white_num > 0) {
                    this.SpriteHpWhite.visible = true;
                }
                else {
                    this.SpriteHpWhite.visible = false;
                    this.changeHpState = 2;
                    this.white_num = 0;
                }
                var x_1 = this.SpriteHpPic2.x;
                var y_1 = this.SpriteHpPic2.y;
                var _whiteX = x_1;
                var sizew_1 = this.SpriteHpPic2.width;
                var sizeh_1 = this.SpriteHpPic2.height;
                if (this.hp_numLost < 1) {
                    if (this.mod_hpLast != 0) {
                        x_1 = x_1 + sizew_1 * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
                    }
                    else {
                        x_1 = x_1;
                    }
                    if (this.oldHp_num == this.hp_num) {
                        if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
                            sizew_1 = sizew_1 * ((this.mod_hpLost) / this.HpScaleNotChange);
                        }
                        else {
                            sizew_1 = sizew_1 * ((this.mod_hpLast) / this.HpScaleNotChange);
                        }
                    }
                    else {
                        if (this.mod_hpLast > 0) {
                            sizew_1 = sizew_1 * ((this.mod_hpLast) / this.HpScaleNotChange);
                        }
                        else {
                            sizew_1 = sizew_1 * ((this.mod_hpLost) / this.HpScaleNotChange);
                        }
                    }
                }
                this.SpriteHpWhiteMask.x = x_1;
                this.SpriteHpWhiteMask.y = y_1;
                this.SpriteHpWhite.alpha = this.white_num;
            }
            else if (this.changeHpState == 2) {
                //灰条掉血阶段
                //判断掉血过多时，加速掉血效果
                if (this.hp_numLost < 1) {
                    if (this.changeHp > this.HpScaleNotChange / 30) {
                        this.changeHp = this.changeHp - this.HpScaleNotChange / 30;
                    }
                    else {
                        this.changeHp = this.changeHp - this.changeHp / 5;
                    }
                }
                else {
                    this.changeHp = this.changeHp - this.changeHp / 6;
                }
                //掉血时，即时刷新数据
                this.oldHp = this.changeHp + this.monsterCurHp; //Math.floor()
                this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
                this.mod_hpLast = this.oldHp % this.HpScaleNotChange; //Math.ceil()
                this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
                this.mod_hpLost = this.changeHp % this.HpScaleNotChange; //Math.ceil()
                if (this.mod_hpLost > 0) {
                }
                else {
                    this.mod_hpLost = 0;
                }
                if (this.mod_hpLast > 0) {
                }
                else {
                    this.mod_hpLast = 0;
                }
            }
        };
        Fight_ItemBoss.prototype.Update = function (dt) {
            if (zj.Gmgr.Instance.bPause == true) {
                return;
            }
            if (this.monster.bCanRemove == true) {
                return true;
            }
            this.UpdateBlood(dt);
            this.FreshCd();
            this.UpdateDie();
            this.FreshBuff(this.monster);
        };
        Fight_ItemBoss.prototype.FreshDying = function (general) {
        };
        Fight_ItemBoss.prototype.FreshRage = function () {
        };
        Fight_ItemBoss.prototype.FreshCd = function () {
            if (this.monster != null) {
                if (this.pressCd != null) {
                    var cur = this.pressCd.getTime();
                    var max = this.pressCd.getMaxTime();
                    var percent = Math.floor(cur / max * 100);
                    if (percent >= 100) {
                        percent = 100;
                    }
                    else if (percent <= 0) {
                        percent = 0;
                    }
                    this.rageProgressMask.x = 123 + this.rageWidth / 100 * percent;
                }
            }
        };
        Fight_ItemBoss.prototype.FreshDeadUi = function () {
        };
        Fight_ItemBoss.prototype.UpdateDie = function () {
        };
        Fight_ItemBoss.prototype.FreshBuff = function (general) {
        };
        return Fight_ItemBoss;
    }(zj.UI));
    zj.Fight_ItemBoss = Fight_ItemBoss;
    __reflect(Fight_ItemBoss.prototype, "zj.Fight_ItemBoss");
})(zj || (zj = {}));
//# sourceMappingURL=Fight_ItemBoss.js.map