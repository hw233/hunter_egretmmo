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
    var PosState = (function () {
        function PosState() {
            // 武将id
            this.generalId = 0;
            // 武将状态
            this.state = 0;
            // 通关1-7级开启
            this.restrict = 0;
            // 10/20/30级开启
            this.grade = 0;
            // 10/20/30级开启
            this.backer = 0;
        }
        return PosState;
    }());
    zj.PosState = PosState;
    __reflect(PosState.prototype, "zj.PosState");
    var guidance = (function () {
        function guidance() {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }
        return guidance;
    }());
    zj.guidance = guidance;
    __reflect(guidance.prototype, "zj.guidance");
    /**
     * 选择上阵猎人--阵容战力
     */
    var FormateFourPos = (function (_super) {
        __extends(FormateFourPos, _super);
        function FormateFourPos() {
            var _this = _super.call(this) || this;
            // 副本类型
            _this.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            // 上阵武将列表
            _this.generals = [];
            // 上阵所有武将列表
            _this.generalss = [];
            _this.idType = 0;
            // 主将保存
            _this.lieutenant = 0;
            // 副将保存
            _this.mainstay = 0;
            _this._curFormationMap = zj.Game.PlayerFormationSystem.curFormationMap;
            // 其他副本阵型保存
            _this._formationInfo = zj.Game.PlayerFormationSystem.curFormations;
            // 跨服格斗场阵型保存
            _this._formatsSingleAttack = zj.Game.PlayerFormationSystem.formatsSingleAttack;
            // 流星街阵型保存
            _this._formatsWant = zj.Game.PlayerFormationSystem.formatsWant;
            // 遗迹探索阵营保存
            _this._formatsRelic = zj.Game.PlayerFormationSystem.formatsRelic;
            // 新手引导id武将
            _this.blowGuide = zj.Game.PlayerFormationSystem.blowGuide;
            // 等级限制开启
            _this.Level = zj.Game.PlayerInfoSystem.Level;
            // 筛除死亡猎人
            _this.forbidGenerals = [];
            //this.cacheAsBitmap = true;
            // 加载ui
            _this.skinName = "resource/skins/formation/FormateFourPosSkin.exml";
            // 点击下方list数据放到上阵列表中
            zj.Game.EventManager.on(zj.GameEvent.ON_MOVE, _this.onMove, _this);
            // this.groupAll.cacheAsBitmap = true;
            _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this); // 设置阵型位置
            _this.ButtonTeam1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonTeam1, _this); // 1队
            _this.ButtonTeam2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonTeam2, _this); // 2队
            _this.ButtonTeam3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonTeam3, _this); // 3队
            _this.ButtonSet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onButtonSet, _this); // 阵容方案
            var _loop_1 = function (i) {
                this_1["groupPos" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    if (_this.generals[i].generalId != 0) {
                        zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    }
                }, this_1);
                // 选择上阵猎人list注册事件formate_refresh_list
                this_1["groupPos" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (_this.generals[i].generalId != 0) {
                        // 播放音效--武将下阵
                        zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30060), 100);
                        zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST, { id: zj.PlayerHunterSystem.Head(_this.generals[i].generalId) });
                    }
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.drawUI();
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
            // egret.setTimeout(this.tipManager, this, 1000);// 延迟执行
            // 匿名函数注销事件--待测试
            // var func = () => { 
            //     this.labelPlayerPower.text = this.LoadTotalBattleValue(); 
            // }
            // this.addEventListener(GameEvent.BATTLE_VALUE_CHANGE, func, this);
            // Game.EventManager.off(GameEvent.BATTLE_VALUE_CHANGE, func, this);
            zj.Game.EventManager.on(zj.GameEvent.BATTLE_VALUE_CHANGE, _this.onBattlevaluechange, _this); // 玩家战斗力
            zj.Game.EventManager.on(zj.GameEvent.USING_SUCCESSFUL, _this.onUsingSuccessful, _this); // 方案使用成功
            _this.down = new zj.FormateBottomList();
            zj.Set.ButtonBackgroud(_this.ButtonTeam1, "ui_arena_ButtonNumTeamNor1_png");
            if (_this.type == 24) {
                if (zj.Game.PlayerLeagueSystem.Member != null) {
                    _this.forbidGenerals = zj.Game.PlayerLeagueSystem.Member.usedMatchGenerals;
                    // 筛除死亡猎人
                    _this.ReCreateAttakFormation();
                }
            }
            _this.init(); // 初始化ui
            _this.transcriptInfo(); // 所有副本初始化  
            _this.MoreTeamPlay(); // 跨服/三队切磋上阵武将初始化
            _this.OnOffensive(); //其他上阵武将初始化  
            return _this;
            // egret.Tween.get(this).wait(100).call(() => {
            //     this.onButtonTeam3();
            //     this.onButtonTeam1();
            // });
        }
        /**
         * 筛除死亡猎人
         */
        FormateFourPos.prototype.ReCreateAttakFormation = function () {
            if (this.forbidGenerals == null) {
                return;
            }
            var _loop_2 = function (k) {
                var v = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["generals"][k];
                if (v != null && v != 0) {
                    var find = zj.Table.FindF(this_2.forbidGenerals, function (_k, _v) {
                        return _v == v;
                    });
                    if (find) {
                        zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["generals"][k] = 0;
                    }
                }
            };
            var this_2 = this;
            for (var k in zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["generals"]) {
                _loop_2(k);
            }
            var _loop_3 = function (k) {
                var v = zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["supports"][k];
                if (v != null && v != 0) {
                    var find = zj.Table.FindF(this_3.forbidGenerals, function (_k, _v) {
                        return _v == v;
                    });
                    if (find) {
                        zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["supports"][k] = 0;
                    }
                }
            };
            var this_3 = this;
            for (var k in zj.Game.PlayerFormationSystem.curFormations[zj.Game.PlayerInstanceSystem.curInstanceType - 1]["supports"]) {
                _loop_3(k);
            }
        };
        /**
         * 方案使用成功
         */
        FormateFourPos.prototype.onUsingSuccessful = function (e) {
            var index = e.data[0];
            var data = e.data[1]; //
            switch (index) {
                case 1:
                    zj.toast_success(zj.LANG("成功使用第1套阵容方案"));
                    break;
                case 2:
                    zj.toast_success(zj.LANG("成功使用第2套阵容方案"));
                    break;
                case 3:
                    zj.toast_success(zj.LANG("成功使用第3套阵容方案"));
                    break;
                case 4:
                    zj.toast_success(zj.LANG("成功使用第4套阵容方案"));
                    break;
                case 5:
                    zj.toast_success(zj.LANG("成功使用第5套阵容方案"));
                    break;
            }
            // 重置数据
            if (this.type == 7 || this.type == 21) {
                this._formationInfo[this.type - 1].generals = [];
                this._formationInfo[this.type - 1].supports = [];
            }
            else if (this.type == 16 || this.type == 22) {
                if (this.idType == 0) {
                    this._formatsSingleAttack[0].generals = [];
                    this._formatsSingleAttack[0].supports = [];
                }
                else if (this.idType == 1) {
                    this._formatsSingleAttack[1].generals = [];
                    this._formatsSingleAttack[1].supports = [];
                }
                else if (this.idType == 2) {
                    this._formatsSingleAttack[2].generals = [];
                    this._formatsSingleAttack[2].supports = [];
                }
            }
            // 替换数据
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.type == 7 || this.type == 21) {
                        this._formationInfo[this.type - 1].generals[i] = data.generals[i];
                    }
                    else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this._formatsSingleAttack[0].generals[i] = data.generals[i];
                        }
                        else if (this.idType == 1) {
                            this._formatsSingleAttack[1].generals[i] = data.generals[i];
                        }
                        else if (this.idType == 2) {
                            this._formatsSingleAttack[2].generals[i] = data.generals[i];
                        }
                    }
                }
                else {
                    if (this.type == 7 || this.type == 21) {
                        this._formationInfo[this.type - 1].supports[i - 4] = data.supports[i - 4];
                    }
                    else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this._formatsSingleAttack[0].supports[i - 4] = data.supports[i - 4];
                        }
                        else if (this.idType == 1) {
                            this._formatsSingleAttack[1].supports[i - 4] = data.supports[i - 4];
                        }
                        else if (this.idType == 2) {
                            this._formatsSingleAttack[2].supports[i - 4] = data.supports[i - 4];
                        }
                    }
                }
            }
            this.OnOffensive();
            this.down.setInfo(this);
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    this.generals[i].generalId = data.generals[i];
                }
                else {
                    this.generals[i].generalId = data.supports[i - 4];
                }
            }
            //this.drawUI();
            //this.down.init();
            this.refreshOverallInfo();
            //this.down.listBottomData.refresh();     
        };
        /**
         * 玩家战力值
         */
        FormateFourPos.prototype.onBattlevaluechange = function () {
            this.labelPlayerPower.text = zj.Set.NumberUnit3(this.LoadTotalBattleValue());
            zj.Game.EventManager.event(zj.GameEvent.FIGHTING_CAPACITY, { text: this.LoadTotalBattleValue() });
        };
        /**
         * 新手引导卡座等级开启限制
         */
        FormateFourPos.prototype.guidance = function () {
            // if(){
            // }
            // this.type
            for (var i = 5; i < 8; i++) {
                this.generals[i].grade = 1;
            }
            if (this.Level < 10) {
                this.restrict10.visible = true;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 1;
                this.generals[6].grade = 1;
                this.generals[7].grade = 1;
                this.generals[5].generalId = 0;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level == 10) {
                this.restrict10.visible = false;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level > 10 && this.Level < 20) {
                this.restrict10.visible = false;
                this.restrict20.visible = true;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 1;
                this.generals[7].grade = 1;
                this.generals[6].generalId = 0;
                this.generals[7].generalId = 0;
            }
            if (this.Level == 20) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 1;
                this.generals[7].generalId = 0;
            }
            if (this.Level > 20 && this.Level < 30) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 1;
                this.generals[7].generalId = 0;
            }
            if (this.Level >= 30) {
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = false;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 0;
            }
            if (this.type == 25) {
                // this.restrict10.visible = false;
                // this.restrict20.visible = false;
                // this.restrict30.visible = false;
                // this.generals[5].grade = 0;
                // this.generals[6].grade = 0;
                // this.generals[7].grade = 0;
            }
        };
        /**
         * 隐藏新手引导武将头像
         */
        FormateFourPos.prototype.hideBootImage = function () {
            this.plot.visible = false;
            this.dramaImage.visible = false;
            this["groupPos" + 4].visible = false; // box groupPos4  dramaImage
            this["imgUpIcon" + 0].visible = false; // 头像
            this["imgUpNum" + 0].visible = false; // 数量
            this["imgUpLock" + 0].visible = true; // 锁头
            this["imgUpYuan" + 0].visible = false; // 援助  
        };
        /**
         * 显示新手引导武将头像
         */
        FormateFourPos.prototype.showBootImage = function (blowGuide) {
            this.plot.visible = true;
            this.dramaImage.visible = true; // 头像框根据小杰的品质改变
            this.dramaImage.source = zj.cachekey(zj.PlayerHunterSystem.Frame(110032), this);
            this["groupPos" + 4].visible = true; // box groupPos4  dramaImage
            this["imgUpIcon" + 0].visible = true; // 头像
            this["imgUpNum" + 0].visible = false; // 数量
            this["imgUpIcon" + 0].source = zj.cachekey(zj.PlayerHunterSystem.Head(blowGuide), this); // 辅助头像imgUpIcon0
        };
        /**
         * 新手引导
         */
        FormateFourPos.prototype.novicePilot = function () {
            this.maxMobID = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].maxMobID;
            this.mobInfo = zj.Game.PlayerInstanceSystem.curInstances[zj.Game.PlayerInstanceSystem.curInstanceType].mobsMap[this.blowGuide];
            // 新手引导剧情人物
            if (zj.Teach.m_bOpenTeach == true && this.mobInfo != undefined && this.mobInfo != null) {
                if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                    if (this.blowGuide == 100004 || this.blowGuide == 100005) {
                        this.showBootImage(10001);
                        this.generals[4].generalId = 110001;
                        this.generals[4].backer = 1;
                    }
                    else {
                        this.showBootImage(10005);
                        this.generals[4].generalId = 110005;
                        this.generals[4].backer = 1;
                    }
                }
            }
        };
        /**
         * 所有副本初始化
         */
        FormateFourPos.prototype.transcriptInfo = function () {
            if (this.type == 1 || this.type == 2 || this.type == 5 || this.type == 8 || this.type == 10 || this.type == 11) {
                // 玩家战力值默认"0"
                this.labelPlayerPower.text = zj.Set.NumberUnit3(this.LoadTotalBattleValue());
                //新手引导
                if (zj.Teach.m_bOpenTeach == true) {
                    if (this.type == 1 || this.type == 2) {
                        this.novicePilot();
                        if (this.mobInfo == null) {
                            return;
                        }
                        else {
                            if (this.mobInfo.mobId == 100007) {
                                if (this.mobInfo.star != 0 && this.mobInfo.firstReward == true) {
                                    this.generals[3].restrict = 0;
                                }
                                else {
                                    this.generals[3].restrict = 1;
                                }
                            }
                        }
                        if (this.maxMobID < 100008) {
                            this.generals[3].restrict = 1;
                        }
                    }
                    else {
                        this.generals[3].restrict = 0;
                    }
                }
                else {
                    if (this.type == 1 || this.type == 2) {
                        this.novicePilot();
                        if (this.mobInfo == null) {
                            return;
                        }
                        else {
                            if (this.mobInfo.mobId == 100007) {
                                if (this.mobInfo.star != 0 && this.mobInfo.firstReward == true) {
                                    this.generals[3].restrict = 0;
                                }
                                else {
                                    this.generals[3].restrict = 1;
                                }
                            }
                        }
                        if (this.maxMobID < 100008) {
                            this.generals[3].restrict = 1;
                        }
                    }
                    else {
                        this.generals[3].restrict = 0;
                    }
                }
            }
            else if (this.type == 16 || this.type == 22) {
                this.combatNumber.visible = false;
                this.TopLeft1.visible = true;
                this.TopRight1.visible = true;
                this.onButtonTeam1();
            }
            else if (this.type == 24 || this.type == 17) {
                this.combatNumber.visible = false;
            }
            else if (this.type == 7 || this.type == 21) {
                this.combatNumber.visible = false;
                this.TopRight1.visible = true;
            }
            if (zj.Teach.m_bOpenTeach == true) {
                if (this.type == 1 || this.type == 2) {
                    if (this.generals[3].restrict == 0) {
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                    if (this.generals[3].restrict == 1) {
                        this.censorshipRestrict.visible = true;
                        this.clearanceLock.visible = true;
                        this.clearanceLock3.visible = false;
                    }
                    if (this.maxMobID > 100008) {
                        this.generals[3].restrict == 0;
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
                else {
                    if (this.generals[3].restrict == 0) {
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
            }
            else {
                if (this.type == 1 || this.type == 2) {
                    if (this.generals[3].restrict == 0) {
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                    if (this.generals[3].restrict == 1) {
                        this.censorshipRestrict.visible = true;
                        this.clearanceLock.visible = true;
                        this.clearanceLock3.visible = false;
                    }
                    if (this.maxMobID > 100008) {
                        this.generals[3].restrict == 0;
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
                else {
                    if (this.generals[3].restrict == 0) {
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
            }
            this.guidance(); // 新手引导卡座等级开启限制        
        };
        /**
         * 玩家战力值默认"0"
         */
        FormateFourPos.prototype.LoadTotalBattleValue = function () {
            var allBV = 0;
            var allGens = this.getBattleGenerals();
            for (var i = 0; i < allGens.length; i++) {
                if (allGens[i].generalId != 0) {
                    if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                        if (allGens[i].generalId == 110001 || allGens[i].generalId == 110005) {
                            return allBV;
                        }
                        else {
                            if (zj.Game.PlayerHunterSystem.queryHunter(allGens[i].generalId) == null) {
                                return allBV;
                            }
                            else {
                                allBV += zj.Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                            }
                        }
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(allGens[i].generalId) == null) {
                            return allBV;
                        }
                        else {
                            allBV += zj.Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                        }
                    }
                }
            }
            return allBV;
        };
        /**
         * 1队
         */
        FormateFourPos.prototype.onButtonTeam1 = function () {
            //this.hunterInfo(this.idType);
            this.idType = 0;
            this.refreshInfo(0);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.ButtonTeam1, "ui_arena_ButtonNumTeamNor1_png");
        };
        /**
         * 2队
         */
        FormateFourPos.prototype.onButtonTeam2 = function (e) {
            //this.hunterInfo(this.idType);
            this.idType = 1;
            this.refreshInfo(1);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.ButtonTeam2, "ui_arena_ButtonNumTeamNor1_png");
        };
        /**
         * 3队
         */
        FormateFourPos.prototype.onButtonTeam3 = function () {
            //this.hunterInfo(this.idType);
            this.idType = 2;
            this.refreshInfo(2);
            this.btnColour();
            zj.Set.ButtonBackgroud(this.ButtonTeam3, "ui_arena_ButtonNumTeamNor1_png");
        };
        /**
         * 将所有按钮颜色变暗
         */
        FormateFourPos.prototype.btnColour = function () {
            zj.Set.ButtonBackgroud(this.ButtonTeam1, "ui_arena_ButtonNumTeamSel2_png");
            zj.Set.ButtonBackgroud(this.ButtonTeam2, "ui_arena_ButtonNumTeamSel2_png");
            zj.Set.ButtonBackgroud(this.ButtonTeam3, "ui_arena_ButtonNumTeamSel2_png");
        };
        FormateFourPos.prototype.hunterInfo = function (id) {
            if (id == 0) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (id == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (id == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            for (var i = 0; i < this.generals.length; i++) {
                if (i < 4) {
                    this._formatsSingleAttack[id].generals[i] = this.generals[i].generalId;
                }
                else {
                    this._formatsSingleAttack[id].supports[i - 4] = this.generals[i].generalId;
                }
            }
        };
        FormateFourPos.prototype.refreshInfo = function (id) {
            this.generals = [];
            for (var i = 0; i < 8; i++) {
                var posState = new PosState();
                if (i < 4) {
                    if (this._formatsSingleAttack[id].generals[i] != null && this._formatsSingleAttack[id].generals[i] != 0) {
                        posState.generalId = this._formatsSingleAttack[id].generals[i];
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                }
                else {
                    if (this._formatsSingleAttack[id].supports[i - 4] != null && this._formatsSingleAttack[id].supports[i - 4] != 0) {
                        posState.generalId = this._formatsSingleAttack[id].supports[i - 4];
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                }
            }
            this.refreshOverallInfo();
        };
        /** 刷新全局信息 */
        FormateFourPos.prototype.refreshOverallInfo = function () {
            this.drawUI();
            this.hunterInfo(this.idType);
            this.down.init();
            this.battleNum();
            zj.Game.EventManager.event(zj.GameEvent.CROSS_BEAM_FIELD, this.generalss); // 跨服格斗场临时存放阵型   
        };
        FormateFourPos.prototype.battleNum = function () {
            var num1 = 0;
            var num2 = 0;
            var num3 = 0;
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i].generalId != 0) {
                        num1 = num1 + 1;
                        this.labelHunterNum1.text = num1 + "/4" + "";
                    }
                    else {
                        this.labelHunterNum1.text = num1 + "/4" + "";
                    }
                }
            }
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i + 8].generalId != 0) {
                        num2 = num2 + 1;
                        this.labelHunterNum2.text = num2 + "/4" + "";
                    }
                    else {
                        // num2 = num2 - 1;
                        this.labelHunterNum2.text = num2 + "/4" + "";
                    }
                }
            }
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i + 16].generalId != 0) {
                        num3 = num3 + 1;
                        this.labelHunterNum3.text = num3 + "/4" + "";
                    }
                    else {
                        // num3 = num3 - 1;
                        this.labelHunterNum3.text = num3 + "/4" + "";
                    }
                }
            }
        };
        /**
         * 阵容方案
         */
        FormateFourPos.prototype.onButtonSet = function () {
            //toast(LANG("功能未开启"));
            zj.loadUI(zj.CommonFormationSet)
                .then(function (dialog) {
                dialog.show(zj.UI.SHOW_FROM_TOP);
                //dialog.setInfo(this.father.focusCur);
            });
        };
        /**
         * 初始化ui
         */
        FormateFourPos.prototype.init = function () {
            // 1-4号位置文字图片
            for (var i = 0; i < 4; i++) {
                this["imgPos" + i].source = zj.cachekey(zj.UIConfig.UIConfig_Role.formationPosWord[i], this);
            }
            for (var i = 0; i < 8; i++) {
                var posState = new PosState();
                this.generals.push(posState);
            }
            for (var i = 0; i < 24; i++) {
                var posState = new PosState();
                this.generalss.push(posState);
            }
            this.drawUI();
        };
        /**
        * 跨服/三队切磋上阵武将初始化
        */
        FormateFourPos.prototype.MoreTeamPlay = function () {
            if (this.type == 16 || this.type == 22) {
                for (var i = 0; i < 8; i++) {
                    if (i < 4) {
                        this.generalss[i].generalId = this._formatsSingleAttack[0].generals[i];
                        this.generalss[i + 8].generalId = this._formatsSingleAttack[1].generals[i];
                        this.generalss[i + 16].generalId = this._formatsSingleAttack[2].generals[i];
                    }
                    else {
                        this.generalss[i].generalId = this._formatsSingleAttack[0].supports[i - 4];
                        this.generalss[i + 8].generalId = this._formatsSingleAttack[1].supports[i - 4];
                        this.generalss[i + 16].generalId = this._formatsSingleAttack[2].supports[i - 4];
                    }
                }
                this.battleNum();
            }
        };
        /**
         * 其他上阵武将初始化
         * lieutenant 主将
         * mainstay 副将
         */
        FormateFourPos.prototype.OnOffensive = function () {
            var peopleNumber = 0;
            for (var i = 5; i < 8; i++) {
                if (this.generals[i].grade == 1) {
                    this["groupPos" + i].visible = false;
                    this["imgUpLock" + (i - 4)].visible = true; // 锁头
                    this["imgUpYuan" + (i - 4)].visible = false; // 援助
                }
                else {
                    this["groupPos" + i].visible = false;
                    this["imgUpLock" + (i - 4)].visible = true; // 锁头
                    this["imgUpYuan" + (i - 4)].visible = false; // 援助
                }
            }
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.type == 8) {
                        var street = zj.Game.PlayerWantedSystem.wantedBossDifficulty;
                        for (var num = 0; num < 8; num++) {
                            if (street == num) {
                                this.lieutenant = this._formatsWant[num].generals[i]; // 主将    
                            }
                        }
                    }
                    else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this.lieutenant = this._formatsSingleAttack[0].generals[i]; // 主将    
                        }
                        else if (this.idType == 1) {
                            this.lieutenant = this._formatsSingleAttack[1].generals[i]; // 主将    
                        }
                        else if (this.idType == 2) {
                            this.lieutenant = this._formatsSingleAttack[2].generals[i]; // 主将    
                        }
                    }
                    else if (this.type == 26) {
                        var siteIndex = zj.Game.PlayerFormationSystem.siteIndex;
                        if (siteIndex == 0) {
                            this.lieutenant = this._formatsRelic[0].generals[i]; // 主将    
                        }
                        else if (siteIndex == 1) {
                            this.lieutenant = this._formatsRelic[1].generals[i]; // 主将 
                        }
                        else if (siteIndex == 2) {
                            this.lieutenant = this._formatsRelic[2].generals[i]; // 主将 
                        }
                    }
                    else {
                        this.lieutenant = this._formationInfo[this.type - 1].generals[i]; // 主将      
                        // 新手引导初始化上阵无武将
                        if (zj.Teach.m_bOpenTeach == true) {
                            if (this.type == 1 || this.type == 2) {
                            }
                            else {
                                if (this.type == 7) {
                                    if (zj.Teach.isDone(1003) == true) {
                                    }
                                    else {
                                        this.lieutenant = 0;
                                    }
                                }
                            }
                        }
                    }
                    var hunterList_1 = zj.Game.PlayerHunterSystem.queryHunter(this.lieutenant);
                    if (hunterList_1 == null || hunterList_1 == undefined) {
                        this._formationInfo[this.type - 1].supports[i] = 0;
                    }
                    else {
                        this.generals[i].generalId = this.lieutenant;
                    }
                    if (this.lieutenant == 0) {
                        this["groupPos" + i].visible = false;
                        // this[`imgArrow${i}`].visible = true;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                        this["groupPos" + (i + 4)].visible = false;
                        this["imgUpLock" + i].visible = true;
                        this["imgUpYuan" + i].visible = false;
                        peopleNumber = peopleNumber + 1;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.lieutenant) == null) {
                            this.lieutenant = 0;
                            this.generals[i].generalId = this.lieutenant;
                            this["groupPos" + i].visible = false;
                            // this[`imgArrow${i}`].visible = true;
                            // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            this["groupPos" + (i + 4)].visible = false;
                            this["imgUpLock" + i].visible = true;
                            this["imgUpYuan" + i].visible = false;
                        }
                        else {
                            this.lieutenantStatus(i);
                            // this[`imgDownFrame${i}`].source = cachekey(PlayerHunterSystem.Frame(this.lieutenant), this);// 品质框
                            this["clearanceLock" + i].visible = false;
                            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                                // this[`imgDownIcon${i}`].source = cachekey("wx_" + PlayerHunterSystem.Head(this.lieutenant), this);// 1-4号主将位置
                            }
                            else {
                                // this[`imgDownIcon${i}`].source = cachekey(PlayerHunterSystem.Head(this.lieutenant), this);// 1-4号主将位置
                                this.hunterFashionableDress(this.lieutenant, this["grouphunter" + i]);
                                this["clearanceLock" + i].visible = true;
                            }
                            // Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], Game.PlayerHunterSystem.queryHunter(this.lieutenant).star,
                            // Game.PlayerHunterSystem.queryHunter(this.lieutenant).awakePassive.level);// 几星武将
                            // this[`imgDownNum${i}`].text = Game.PlayerHunterSystem.queryHunter(this.lieutenant).level.toString();// 上阵数量   
                            // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);// 辅助通道开启
                            if (this.generals[i + 4].grade == 1) {
                                // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            }
                            else {
                                // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);// 辅助通道开启
                            }
                            if (i == 0) {
                                if (this.generals[i + 4].state == 0) {
                                    this.generals[i + 4].state = 1;
                                    this.openLieutenant(i);
                                }
                            }
                            for (var i_1 = 1; i_1 < 4; i_1++) {
                                if (this.generals[i_1 + 4].grade == 1) {
                                    this["groupPos" + (i_1 + 4)].visible = false;
                                    this["imgUpLock" + i_1].visible = true; // 锁头
                                    this["imgUpYuan" + i_1].visible = false; // 援助
                                }
                                else {
                                    if (this.generals[i_1 + 4].state == 0) {
                                        this.generals[i_1 + 4].state = 1;
                                        this.openLieutenant(i_1);
                                    }
                                }
                            }
                            if (i == 3) {
                                if (this.generals[i + 4].grade == 0) {
                                    this["groupPos" + (i + 4)].visible = false;
                                    this["imgUpLock" + i].visible = false; // 锁头
                                    this["imgUpYuan" + i].visible = true; // 援助
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.type == 8) {
                        var street = zj.Game.PlayerWantedSystem.wantedBossDifficulty;
                        for (var num = 0; num < 7; num++) {
                            if (street == num) {
                                this.mainstay = this._formatsWant[num].supports[i - 4]; // 主将    
                            }
                        }
                    }
                    else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this.mainstay = this._formatsSingleAttack[0].supports[i - 4]; // 主将    
                        }
                        else if (this.idType == 1) {
                            this.mainstay = this._formatsSingleAttack[1].supports[i - 4]; // 主将    
                        }
                        else if (this.idType == 2) {
                            this.mainstay = this._formatsSingleAttack[2].supports[i - 4]; // 主将    
                        }
                    }
                    else if (this.type == 26) {
                        var siteIndex = zj.Game.PlayerFormationSystem.siteIndex;
                        if (siteIndex == 0) {
                            this.mainstay = this._formatsRelic[0].supports[i - 4]; // 主将    
                        }
                        else if (siteIndex == 1) {
                            this.mainstay = this._formatsRelic[1].supports[i - 4]; // 主将    
                        }
                        else if (siteIndex == 2) {
                            this.mainstay = this._formatsRelic[2].supports[i - 4]; // 主将    
                        }
                    }
                    else {
                        this.mainstay = this._formationInfo[this.type - 1].supports[i - 4]; // 副将        
                    }
                    this.generals[i].generalId = this.mainstay;
                    if (this.mainstay == 0) {
                        peopleNumber = peopleNumber + 1;
                        if (this["imgArrow" + i % 4].source == "ui_instance_IconArrowlockSupport_png") {
                            this["groupPos" + i].visible = false;
                            this["imgUpLock" + i % 4].visible = true; // 锁头
                            this["imgUpYuan" + i % 4].visible = false; // 默认头像                    
                        }
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.mainstay) == null) {
                            this.mainstay = 0;
                            this.generals[i].generalId = this.mainstay;
                            this["groupPos" + i].visible = false;
                            // this[`imgArrow${i % 4}`].visible = true;
                            // this[`imgArrow${i % 4}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            this["imgUpLock" + i % 4].visible = true;
                            this["imgUpYuan" + i % 4].visible = false;
                        }
                        else {
                            this.mainstayStatus(i);
                            this["imgFrame" + i % 4].source = zj.cachekey(zj.PlayerHunterSystem.Frame(this.mainstay), this); // 1-4辅助位置
                            if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                                this["imgUpIcon" + i % 4].source = zj.cachekey("wx_" + zj.PlayerHunterSystem.Head(this.mainstay), this); // 1-4辅助位置
                            }
                            else {
                                this["imgUpIcon" + i % 4].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.mainstay), this); // 1-4辅助位置
                            }
                            this["imgUpNum" + i % 4].text = zj.Game.PlayerHunterSystem.queryHunter(this.mainstay).level.toString(); // 上阵数量
                        }
                    }
                }
            }
            this.novicePilot();
            this.drawUI();
            zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE); // 阵容战力值       
            var hunterList = zj.PlayerHunterSystem.GetHunterList().length;
            zj.Game.EventManager.event(zj.GameEvent.CONTINUE, [peopleNumber, hunterList]); // 还有未上阵的武将是否上阵
        };
        FormateFourPos.prototype.hunterFashionableDress = function (generalId, group) {
            var generalInfo = zj.Game.PlayerHunterSystem.queryHunter(generalId);
            var mapRoleId = null;
            if (generalInfo.fashionId != 0) {
                mapRoleId = zj.PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId).fashion_roleId;
            }
            else {
                mapRoleId = zj.PlayerHunterSystem.Table(zj.PlayerHunterSystem.GetGeneralId(generalId)).general_roleId;
            }
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var scale = zj.TableMapRole.Item(mapRoleId).spine_scale;
            var body = zj.TableClientFightAniSpineSource.Item(bodySpxId).json;
            zj.Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                .then(function (display) {
                group.removeChildren();
                display.scaleX = scale * 0.9;
                display.scaleY = scale * 0.9;
                display.name = "fashion";
                group.addChild(display);
            });
        };
        /**
         * 解锁副将位
         */
        FormateFourPos.prototype.openLieutenant = function (i) {
            // if (this[`imgArrow${i}`].source == "ui_instance_IconArrowOpenSupport_png") {// 辅助通道开启
            this["groupPos" + (i + 4)].visible = false;
            this["imgUpLock" + i].visible = false; // 锁头
            this["imgUpYuan" + i].visible = true; // 援助
            // }
        };
        /**
         * 主将状态
         */
        FormateFourPos.prototype.lieutenantStatus = function (i) {
            this["groupPos" + i].visible = true;
            // this[`imgDownFrame${i}`].visible = true;
            // this[`imgDownIcon${i}`].visible = true;
            // this[`groupDownStar${i}`].visible = true;
            // this[`imgDownNum${i}`].visible = true;
            // this[`imgArrow${i}`].visible = true;
            this["groupPos" + (i + 4)].visible = false;
            this["imgUpLock" + i].visible = false;
            this["imgUpYuan" + i].visible = true;
        };
        /**
         * 副将状态
         */
        FormateFourPos.prototype.mainstayStatus = function (i) {
            this["groupPos" + i].visible = true;
            this["imgUpIcon" + i % 4].visible = true;
            this["imgUpNum" + i % 4].visible = true;
            this["imgUpLock" + i % 4].visible = false; // 锁头
            this["imgUpYuan" + i % 4].visible = false; // 默认头像
        };
        /**
         * 设置阵型位置
         */
        FormateFourPos.prototype.onAddToStage = function () {
            for (var i = 0; i < 8; i++) {
                var groupPos_x = this["groupPos" + i].x;
                var groupPos_y = this["groupPos" + i].y;
                var worldPointUp = this["group" + i % 4].localToGlobal(groupPos_x, groupPos_y); // 本地坐标 转换 世界坐标  groupPos0 group0     
                worldPointUp.x -= zj.Game.UIManager.x;
                var worldPointUp_x = worldPointUp.x;
                var worldPointUp_y = worldPointUp.y;
                var worldPointUp_width = this["groupPos" + i].width;
                var worldPointUp_height = this["groupPos" + i].height;
                var lead = new guidance();
                lead.x = worldPointUp_x;
                lead.y = worldPointUp_y;
                lead.width = worldPointUp_width;
                lead.height = worldPointUp_height;
                zj.Game.PlayerFormationSystem.blowGuideFormations.push(lead);
                // let rect = new eui.Rect(this[`groupPosRect${i}`].width, this[`groupPosRect${i}`].height, 0xffffff);   
                // rect.x = this[`groupPosRect${i}`].x;
                // rect.y = this[`groupPosRect${i}`].y;
                // this.stage.addChild(rect);
                if (this["groupPosRect" + i] == null) {
                    this["groupPosRect" + i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this["groupPos" + i].width, this["groupPos" + i].height);
                }
                else {
                    this["groupPosRect" + i].x = worldPointUp.x;
                    this["groupPosRect" + i].y = worldPointUp.y; // = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this[`groupPos${i}`].width, this[`groupPos${i}`].height);
                }
                // let rect = new eui.Rect(this[`groupPosRect${i}`].width, this[`groupPosRect${i}`].height, 0x0000FF);
                // rect.x = this[`groupPosRect${i}`].x;
                // rect.y = this[`groupPosRect${i}`].y;
                // this.stage.addChild(rect);
            }
        };
        /**
         * 点击下方list数据显示到上阵列表中
         */
        FormateFourPos.prototype.onMove = function (e) {
            this.onAddToStage();
            var objectData = e.data;
            for (var i = 0; i < 8; i++) {
                var rect = this["groupPosRect" + i];
                if (rect.contains(objectData.x, objectData.y)) {
                    this.novicePilot();
                    var pTarget = this.generals[i];
                    if (pTarget.restrict == 1) {
                        zj.toast_warning(zj.LANG("通关1-7开启"));
                    }
                    else if (pTarget.grade == 1) {
                        zj.toast_warning(zj.LANG("等级不足"));
                        return;
                    }
                    else {
                        // if (this.maxMobID < 100008 && this.type == 1) {
                        //     this.generals[4].state = 1
                        // }
                        if (i < 4) {
                            if (objectData.index == -1) {
                                // 播放音效--武将上阵
                                zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30059), 100);
                                pTarget.generalId = objectData.generalId;
                            }
                            else {
                                if (objectData.index < 4) {
                                    _a = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _a[0], this.generals[objectData.index].generalId = _a[1];
                                    _b = [this.generals[objectData.index + 4].generalId, this.generals[i + 4].generalId], this.generals[i + 4].generalId = _b[0], this.generals[objectData.index + 4].generalId = _b[1];
                                    _c = [this.generals[objectData.index + 4].state, this.generals[i + 4].state], this.generals[i + 4].state = _c[0], this.generals[objectData.index + 4].state = _c[1];
                                }
                                else {
                                    _d = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _d[0], this.generals[objectData.index].generalId = _d[1];
                                }
                            }
                            if (i == 0) {
                                this.generals[i + 4].state = 1;
                            }
                            else {
                                if (this.generals[i + 4].grade == 1) {
                                    this.generals[i + 4].state = 0;
                                }
                                else {
                                    this.generals[i + 4].state = 1;
                                }
                            }
                        }
                        else {
                            if (pTarget.state != 0 && !(i == objectData.index + 4 && pTarget.state == 1 && pTarget.generalId == 0)) {
                                if (objectData.index == -1) {
                                    pTarget.generalId = objectData.generalId;
                                }
                                else {
                                    if (pTarget.backer == 1) {
                                        pTarget.generalId = objectData.generalId;
                                    }
                                    else {
                                        _e = [this.generals[objectData.index].generalId, pTarget.generalId], pTarget.generalId = _e[0], this.generals[objectData.index].generalId = _e[1];
                                        if (objectData.index < 4) {
                                            if (this.generals[objectData.index].generalId == 0) {
                                                this.generals[objectData.index + 4].generalId = 0;
                                                this.generals[objectData.index + 4].state = 0;
                                            }
                                        }
                                        else {
                                            _f = [this.generals[objectData.index].state, pTarget.state], pTarget.state = _f[0], this.generals[objectData.index].state = _f[1];
                                        }
                                    }
                                }
                            }
                            this.novicePilot();
                        }
                        this.drawUI(); // 点击上阵列表中的数据返回到下方list中--从上阵列表中把数据去除
                        this.guidance();
                        break;
                    }
                }
            }
            zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST_ITEM);
            var _a, _b, _c, _d, _e, _f;
        };
        /**
         * 点击上阵列表中的数据返回到下方list中--从上阵列表中把数据去除
         */
        FormateFourPos.prototype.drawUI = function () {
            var _this = this;
            for (var i = 0; i < 8; i++) {
                var pS = zj.Table.DeepCopy(this.generals[i]);
                var framePath = null;
                var iconPath = null;
                var hunterInfo = null;
                var baseGeneralInfo = null;
                if (zj.Teach.m_bOpenTeach == true) {
                    if ((this.generals[4].generalId == 110001 || this.generals[4].generalId == 110005) && this.blowGuide > 100001 && this.blowGuide < 100008) {
                        if (i == 4) {
                            pS.generalId = 0;
                        }
                    }
                }
                if (pS.generalId != 0) {
                    framePath = zj.PlayerHunterSystem.Frame(pS.generalId);
                    iconPath = zj.PlayerHunterSystem.Head(pS.generalId);
                    hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId);
                    baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                }
                this.guidance();
                if (i < 4) {
                    if (pS.generalId) {
                        // this[`imgDownFrame${i}`].source = cachekey(framePath, this);
                        if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                            // this[`imgDownIcon${i}`].source = cachekey("wx_" + iconPath, this);// 1-4号位置
                        }
                        else {
                            // this[`imgDownIcon${i}`].source = cachekey(iconPath, this);// 1-4号位置
                            this["clearanceLock" + i].visible = false;
                            this.hunterFashionableDress(pS.generalId, this["grouphunter" + i]);
                        }
                        // this[`imgDownNum${i}`].text = hunterInfo.level.toString();
                        // Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], hunterInfo.star, hunterInfo.awakePassive.level);
                        this["groupPos" + i].visible = true;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);
                        if (zj.Teach.m_bOpenTeach == true) {
                            // 只限新手引导武将显示隐藏
                            this.restrictNovice();
                        }
                    }
                    else {
                        this["clearanceLock" + i].visible = true;
                        this["groupPos" + i].visible = false;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                        this.generals[i + 4].state = 0;
                    }
                }
                else {
                    if (pS.generalId) {
                        this["imgFrame" + i % 4].source = zj.cachekey(framePath, this); // 框
                        if (zj.Device.isReviewSwitch && zj.Util.isWxMiniGame()) {
                            this["imgUpIcon" + i % 4].source = zj.cachekey("wx_" + iconPath, this); // 1-4辅助位置
                        }
                        else {
                            this["imgUpIcon" + i % 4].source = zj.cachekey(iconPath, this); // 1-4辅助位置
                        }
                        if (hunterInfo != null) {
                            this["imgUpNum" + i % 4].text = hunterInfo.level.toString();
                        }
                        else {
                            this["imgUpNum" + i % 4].text = "";
                        }
                        this["groupPos" + i].visible = true;
                    }
                    else {
                        this["imgFrame" + (i % 4)].source = zj.cachekey("ui_frame_FrameHunterAsh_png", this);
                        this["groupPos" + i].visible = false;
                        if (zj.Teach.m_bOpenTeach == true && this.type == 1) {
                            if (this.maxMobID < 100008) {
                                this.generals[4].state = 1;
                            }
                        }
                        else {
                            if (this.maxMobID < 100008) {
                                this.generals[4].state = 0;
                            }
                        }
                        if (i == 5 || i == 6 || i == 7) {
                            if (pS.grade == 1) {
                                this["imgUpLock" + i % 4].visible = true;
                                this["imgUpYuan" + i % 4].visible = false;
                                // this[`imgArrow${i % 4}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            }
                            else {
                                if (pS.state == 0) {
                                    this["imgUpLock" + i % 4].visible = true;
                                    this["imgUpYuan" + i % 4].visible = false;
                                }
                                else {
                                    this["imgUpLock" + i % 4].visible = false;
                                    this["imgUpYuan" + i % 4].visible = true;
                                }
                            }
                        }
                        else {
                            if (zj.Teach.m_bOpenTeach == true) {
                                if (pS.state == 0) {
                                    this["imgUpLock" + i % 4].visible = true;
                                    this["imgUpYuan" + i % 4].visible = false;
                                }
                                else {
                                    this["imgUpLock" + i % 4].visible = false;
                                    this["imgUpYuan" + i % 4].visible = true;
                                }
                            }
                            else {
                                if (this.generals[i % 4].generalId != 0) {
                                    this["imgUpLock" + i % 4].visible = false;
                                    this["imgUpYuan" + i % 4].visible = true;
                                }
                                else {
                                    this["imgUpLock" + i % 4].visible = true;
                                    this["imgUpYuan" + i % 4].visible = false;
                                }
                            }
                        }
                        if (zj.Teach.m_bOpenTeach == true) {
                            // 只限新手引导武将显示隐藏
                            this.restrictNovice();
                        }
                    }
                }
            }
            for (var i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generals[i].generalId != 0) {
                        this.generals[i + 4].state = 1;
                    }
                }
            }
            if (this.type == 16 || this.type == 22) {
                // this.hunterInfo(this.idType);
                this.battleNum();
                zj.Game.EventManager.event(zj.GameEvent.CROSS_BEAM_FIELD, this.generalss); // 跨服格斗场临时存放阵型     
            }
            else {
                egret.Tween.get(this).wait(100).call(function () {
                    zj.Game.EventManager.event(zj.GameEvent.FORMATION_DATE, _this.generals); // 临时存放阵型
                });
                zj.Game.EventManager.event(zj.GameEvent.BATTLE_VALUE_CHANGE); // 阵容战力值
            }
            var num = 0;
            for (var i = 0; i < 8; i++) {
                if (this.generals[i].generalId == 0) {
                    num = num + 1;
                }
            }
            var hunterList = zj.PlayerHunterSystem.GetHunterList().length;
            zj.Game.EventManager.event(zj.GameEvent.CONTINUE, [num, hunterList]); // 还有未上阵的武将是否上阵
        };
        // 只限新手引导武将显示隐藏
        FormateFourPos.prototype.restrictNovice = function () {
            if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                if (this.blowGuide == 100004 || this.blowGuide == 100005) {
                    if (this.generals[0].generalId != 0) {
                        this.showBootImage(10001);
                    }
                    else {
                        this.hideBootImage();
                    }
                }
                else {
                    if (this.generals[0].generalId != 0) {
                        this.showBootImage(10005);
                    }
                    else {
                        this.hideBootImage();
                    }
                }
            }
        };
        /**
         * 向上拖动选择上阵猎人list调用
         */
        FormateFourPos.prototype.addGeneral = function (generalId) {
            for (var i = 0; i < 8; i++) {
                if (i == 5 || i == 6 || i == 7) {
                    if (this.generals[i].grade == 1) {
                        return;
                    }
                }
                if (this.type == 1) {
                    if (i == 3) {
                        if (this.generals[i].restrict == 1) {
                            continue;
                        }
                    }
                }
                if (this.generals[i].generalId == 0) {
                    if (this.generals[i].restrict != 1) {
                        // 播放音效--武将上阵
                        zj.Game.SoundManager.playEffect(zj.SoundManager.SoundOpen(30059), 100);
                        this.generals[i].generalId = generalId;
                    }
                    else {
                        this.generals[i].generalId = generalId;
                        this.generals[i].state = 0;
                    }
                    // if (this.generals[i].restrict != 1) {
                    //     this.generals[i].generalId = generalId;
                    // }
                    if (i < 4) {
                        if (this.generals[i + 4].state == 0) {
                            this.generals[i + 4].state = 1;
                        }
                        if (this.generals[i + 4].grade == 1) {
                            this.generals[i + 4].state = 0;
                        }
                    }
                    this.novicePilot();
                    this.drawUI();
                    this.onAddToStage();
                    zj.Game.EventManager.event(zj.GameEvent.FORMATE_REFRESH_LIST, { x: this["groupPosRect" + i].x, y: this["groupPosRect" + i].y, id: zj.PlayerHunterSystem.Head(generalId) });
                    break;
                }
                // else {
                //     if (i < 4) {
                //         if (this.generals[i + 4].state == 0) {
                //             this.generals[i + 4].state = 1;
                //         }
                //         if (this.generals[i + 4].grade == 1) {
                //             this.generals[i + 4].state = 0;
                //         }
                //     }
                // }
            }
        };
        /**
         * 注销事件
         */
        FormateFourPos.prototype.unEvent = function () {
            zj.Game.EventManager.off(zj.GameEvent.ON_MOVE, this.onMove, this);
            zj.Game.EventManager.off(zj.GameEvent.BATTLE_VALUE_CHANGE, this.onBattlevaluechange, this);
            zj.Game.EventManager.off(zj.GameEvent.USING_SUCCESSFUL, this.onUsingSuccessful, this);
        };
        /**
         * 只有一个列表数据
         */
        FormateFourPos.prototype.getBattleGenerals = function () {
            var a = this.getMultitudeList();
            for (var i = 0; i < a.length; i++) {
                if (a[i].generalId != 0) {
                    return a;
                }
            }
            return this.generals;
        };
        /**
         * 1.2.3队列表数据
         */
        FormateFourPos.prototype.getMultitudeList = function () {
            if (this.idType == 0) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (this.idType == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (this.idType == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            return this.generalss;
        };
        // 设置ui名称
        FormateFourPos.ID = "FormateFourPos";
        return FormateFourPos;
    }(zj.UI));
    zj.FormateFourPos = FormateFourPos;
    __reflect(FormateFourPos.prototype, "zj.FormateFourPos");
})(zj || (zj = {}));
//# sourceMappingURL=FormateFourPos.js.map