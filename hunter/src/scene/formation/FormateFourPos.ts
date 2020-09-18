namespace zj {
    export class PosState {
        // 武将id
        public generalId = 0;
        // 武将状态
        public state = 0;
        // 通关1-7级开启
        public restrict = 0;
        // 10/20/30级开启
        public grade = 0;
        // 10/20/30级开启
        public backer = 0;
    }

    export class guidance {
        public x = 0;
        public y = 0;
        public width = 0;
        public height = 0;
    }

    /**
     * 选择上阵猎人--阵容战力
     */
    export class FormateFourPos extends UI {
        public ButtonTeam1: eui.Button;// 1队
        public ButtonTeam2: eui.Button;// 2队
        public ButtonTeam3: eui.Button;// 3队
        public labelHunterNum1: eui.Label;// 0/4
        public labelHunterNum2: eui.Label;// 0/4
        public labelHunterNum3: eui.Label;// 0/4
        public ButtonSet: eui.Button;  // 阵容方案

        // 阵容方案
        public TopRight1: eui.Group;
        // 1.2.3队阵容信息
        public TopLeft1: eui.Group;
        // 选择上阵猎人
        // public TopLeft0: eui.Group;
        // 战斗力box
        public combatNumber: eui.Group;
        // 玩家战力值
        public labelPlayerPower: eui.Label;
        // 副本类型
        public type: number = Game.PlayerInstanceSystem.curInstanceType;

        // 设置ui名称
        public static ID = "FormateFourPos";
        // 上阵武将列表
        public generals: Array<PosState> = [];
        // 上阵所有武将列表
        public generalss: Array<PosState> = [];
        private idType: number = 0;
        private down: FormateBottomList;

        // 新手引导--剧情
        public plot: eui.Image;
        // 头像框
        public dramaImage: eui.Image;
        // 开启限制
        public restrict10: eui.BitmapLabel;
        public restrict20: eui.BitmapLabel;
        public restrict30: eui.BitmapLabel;
        public censorshipRestrict: eui.BitmapLabel;
        public clearanceLock: eui.Image;
        public clearanceLock0: eui.Image;
        public clearanceLock1: eui.Image;
        public clearanceLock2: eui.Image;
        public clearanceLock3: eui.Image;
        public grouphunter3: eui.Group;
        // 主将保存
        public lieutenant: number = 0;
        // 副将保存
        public mainstay: number = 0;

        public groupAll: eui.Group;
        private _curFormationMap: Array<message.CustomFormationInfo> = Game.PlayerFormationSystem.curFormationMap;
        // 其他副本阵型保存
        private _formationInfo: Array<message.FormationInfo> = Game.PlayerFormationSystem.curFormations;
        // 跨服格斗场阵型保存
        public _formatsSingleAttack: { [id: number]: message.FormationInfo } = Game.PlayerFormationSystem.formatsSingleAttack;
        // 流星街阵型保存
        public _formatsWant: Array<message.FormationInfo> = Game.PlayerFormationSystem.formatsWant;
        // 遗迹探索阵营保存
        private _formatsRelic: Array<message.FormationInfo> = Game.PlayerFormationSystem.formatsRelic;
        // 通关1-7副本开启
        public mobInfo: message.MobInfo;
        public maxMobID: number;

        // 新手引导id武将
        public blowGuide = Game.PlayerFormationSystem.blowGuide;
        // 等级限制开启
        public Level = Game.PlayerInfoSystem.Level;
        // 筛除死亡猎人
        private forbidGenerals = [];

        constructor() {
            super();
            //this.cacheAsBitmap = true;
            // 加载ui
            this.skinName = "resource/skins/formation/FormateFourPosSkin.exml";
            // 点击下方list数据放到上阵列表中
            Game.EventManager.on(GameEvent.ON_MOVE, this.onMove, this);
            // this.groupAll.cacheAsBitmap = true;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);// 设置阵型位置

            this.ButtonTeam1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTeam1, this);// 1队
            this.ButtonTeam2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTeam2, this);// 2队
            this.ButtonTeam3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonTeam3, this);// 3队
            this.ButtonSet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonSet, this);// 阵容方案
            for (let i = 0; i < 8; i++) {
                this[`groupPos${i}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                    if (this.generals[i].generalId != 0) {
                        Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
                    }
                }, this);

                // 选择上阵猎人list注册事件formate_refresh_list
                this[`groupPos${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                    if (this.generals[i].generalId != 0) {
                        // 播放音效--武将下阵
                        Game.SoundManager.playEffect(SoundManager.SoundOpen(30060), 100);
                        Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST, { id: PlayerHunterSystem.Head(this.generals[i].generalId) });
                    }
                    if (i < 4) {
                        this.generals[i].generalId = 0;
                        this.generals[i + 4].generalId = 0;
                        this.generals[i + 4].state = 0;
                    } else {
                        this.generals[i].generalId = 0;
                    }
                    this.drawUI();
                    Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
                }, this);
            }
            // egret.setTimeout(this.tipManager, this, 1000);// 延迟执行
            // 匿名函数注销事件--待测试
            // var func = () => { 
            //     this.labelPlayerPower.text = this.LoadTotalBattleValue(); 
            // }
            // this.addEventListener(GameEvent.BATTLE_VALUE_CHANGE, func, this);
            // Game.EventManager.off(GameEvent.BATTLE_VALUE_CHANGE, func, this);

            Game.EventManager.on(GameEvent.BATTLE_VALUE_CHANGE, this.onBattlevaluechange, this);// 玩家战斗力
            Game.EventManager.on(GameEvent.USING_SUCCESSFUL, this.onUsingSuccessful, this);// 方案使用成功

            this.down = new FormateBottomList();
            Set.ButtonBackgroud(this.ButtonTeam1, "ui_arena_ButtonNumTeamNor1_png", );
            if (this.type == 24) {
                if (Game.PlayerLeagueSystem.Member != null) {
                    this.forbidGenerals = Game.PlayerLeagueSystem.Member.usedMatchGenerals;
                    // 筛除死亡猎人
                    this.ReCreateAttakFormation();
                }
            }
            this.init();// 初始化ui
            this.transcriptInfo();// 所有副本初始化  
            this.MoreTeamPlay(); // 跨服/三队切磋上阵武将初始化
            this.OnOffensive();//其他上阵武将初始化  
            // egret.Tween.get(this).wait(100).call(() => {
            //     this.onButtonTeam3();
            //     this.onButtonTeam1();
            // });
        }

        /**
         * 筛除死亡猎人
         */
        public ReCreateAttakFormation() {
            if (this.forbidGenerals == null) {
                return;
            }
            for (let k in Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["generals"]) {
                let v = Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["generals"][k];
                if (v != null && v != 0) {
                    let find = Table.FindF(this.forbidGenerals, (_k, _v) => {
                        return _v == v;
                    });
                    if (find) {
                        Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["generals"][k] = 0;
                    }
                }
            }
            for (let k in Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["supports"]) {
                let v = Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["supports"][k];
                if (v != null && v != 0) {
                    let find = Table.FindF(this.forbidGenerals, (_k, _v) => {
                        return _v == v;
                    });
                    if (find) {
                        Game.PlayerFormationSystem.curFormations[Game.PlayerInstanceSystem.curInstanceType - 1]["supports"][k] = 0;
                    }
                }
            }
        }

        /**
         * 方案使用成功
         */
        public onUsingSuccessful(e) {
            let index = e.data[0];
            let data = e.data[1];//
            switch (index) {
                case 1: toast_success(LANG("成功使用第1套阵容方案")); break;
                case 2: toast_success(LANG("成功使用第2套阵容方案")); break;
                case 3: toast_success(LANG("成功使用第3套阵容方案")); break;
                case 4: toast_success(LANG("成功使用第4套阵容方案")); break;
                case 5: toast_success(LANG("成功使用第5套阵容方案")); break;
            }
            // 重置数据
            if (this.type == 7 || this.type == 21) {// 本服/单队切磋
                this._formationInfo[this.type - 1].generals = [];
                this._formationInfo[this.type - 1].supports = [];
            } else if (this.type == 16 || this.type == 22) {// 跨服/多队切磋
                if (this.idType == 0) {
                    this._formatsSingleAttack[0].generals = [];
                    this._formatsSingleAttack[0].supports = [];
                } else if (this.idType == 1) {
                    this._formatsSingleAttack[1].generals = [];
                    this._formatsSingleAttack[1].supports = [];
                } else if (this.idType == 2) {
                    this._formatsSingleAttack[2].generals = [];
                    this._formatsSingleAttack[2].supports = [];
                }
            }
            // 替换数据
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.type == 7 || this.type == 21) {
                        this._formationInfo[this.type - 1].generals[i] = data.generals[i];
                    } else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this._formatsSingleAttack[0].generals[i] = data.generals[i];
                        } else if (this.idType == 1) {
                            this._formatsSingleAttack[1].generals[i] = data.generals[i];
                        } else if (this.idType == 2) {
                            this._formatsSingleAttack[2].generals[i] = data.generals[i];
                        }
                    }
                } else {
                    if (this.type == 7 || this.type == 21) {
                        this._formationInfo[this.type - 1].supports[i - 4] = data.supports[i - 4];
                    } else if (this.type == 16 || this.type == 22) {
                        if (this.idType == 0) {
                            this._formatsSingleAttack[0].supports[i - 4] = data.supports[i - 4];
                        } else if (this.idType == 1) {
                            this._formatsSingleAttack[1].supports[i - 4] = data.supports[i - 4];
                        } else if (this.idType == 2) {
                            this._formatsSingleAttack[2].supports[i - 4] = data.supports[i - 4];
                        }
                    }
                }
            }
            this.OnOffensive();
            this.down.setInfo(this);
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    this.generals[i].generalId = data.generals[i]
                } else {
                    this.generals[i].generalId = data.supports[i - 4];
                }
            }
            //this.drawUI();
            //this.down.init();
            this.refreshOverallInfo();
            //this.down.listBottomData.refresh();     
        }

        /**
         * 玩家战力值
         */
        public onBattlevaluechange() {
            this.labelPlayerPower.text = Set.NumberUnit3(this.LoadTotalBattleValue());
            Game.EventManager.event(GameEvent.FIGHTING_CAPACITY, { text: this.LoadTotalBattleValue() });
        }

        /**
         * 新手引导卡座等级开启限制
         */
        public guidance() {
            // if(){

            // }
            // this.type
            for (let i = 5; i < 8; i++) {
                this.generals[i].grade = 1;
            }

            if (this.Level < 10) {// 10级开启
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
            if (this.Level > 10 && this.Level < 20) {// 20级开启
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
            if (this.Level > 20 && this.Level < 30) {// 30级开启
                this.restrict10.visible = false;
                this.restrict20.visible = false;
                this.restrict30.visible = true;
                this.generals[5].grade = 0;
                this.generals[6].grade = 0;
                this.generals[7].grade = 1;
                this.generals[7].generalId = 0;
            }
            if (this.Level >= 30) {// 大于30级
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
        }

        /**
         * 隐藏新手引导武将头像
         */
        public hideBootImage() {
            this.plot.visible = false;
            this.dramaImage.visible = false;
            this[`groupPos${4}`].visible = false;// box groupPos4  dramaImage
            this[`imgUpIcon${0}`].visible = false;// 头像
            this[`imgUpNum${0}`].visible = false;// 数量
            this[`imgUpLock${0}`].visible = true;// 锁头
            this[`imgUpYuan${0}`].visible = false;// 援助  
        }

        /**
         * 显示新手引导武将头像
         */
        public showBootImage(blowGuide) {
            this.plot.visible = true;
            this.dramaImage.visible = true;// 头像框根据小杰的品质改变
            this.dramaImage.source = cachekey(PlayerHunterSystem.Frame(110032), this);
            this[`groupPos${4}`].visible = true;// box groupPos4  dramaImage
            this[`imgUpIcon${0}`].visible = true;// 头像
            this[`imgUpNum${0}`].visible = false;// 数量
            this[`imgUpIcon${0}`].source = cachekey(PlayerHunterSystem.Head(blowGuide), this);// 辅助头像imgUpIcon0
        }

        /**
         * 新手引导
         */
        public novicePilot() {
            this.maxMobID = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].maxMobID
            this.mobInfo = Game.PlayerInstanceSystem.curInstances[Game.PlayerInstanceSystem.curInstanceType].mobsMap[this.blowGuide]
            // 新手引导剧情人物
            if (Teach.m_bOpenTeach == true && this.mobInfo != undefined && this.mobInfo != null) {//&& this.mobInfo.firstReward == false
                if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                    if (this.blowGuide == 100004 || this.blowGuide == 100005) {// 奇犽 45           
                        this.showBootImage(10001);
                        this.generals[4].generalId = 110001;
                        this.generals[4].backer = 1;

                    } else {// 凯特 23 67
                        this.showBootImage(10005);
                        this.generals[4].generalId = 110005;
                        this.generals[4].backer = 1;
                    }
                }
            }
        }

        /**
         * 所有副本初始化
         */
        public transcriptInfo() {
            if (this.type == 1 || this.type == 2 || this.type == 5 || this.type == 8 || this.type == 10 || this.type == 11) {
                // 玩家战力值默认"0"
                this.labelPlayerPower.text = Set.NumberUnit3(this.LoadTotalBattleValue());
                //新手引导
                if (Teach.m_bOpenTeach == true) {
                    if (this.type == 1 || this.type == 2) {
                        this.novicePilot();
                        if (this.mobInfo == null) {
                            return;
                        } else {
                            if (this.mobInfo.mobId == 100007) {
                                if (this.mobInfo.star != 0 && this.mobInfo.firstReward == true) {
                                    this.generals[3].restrict = 0;
                                } else {
                                    this.generals[3].restrict = 1;
                                }
                            }
                        }
                        if (this.maxMobID < 100008) {
                            this.generals[3].restrict = 1;
                        }
                    } else {
                        this.generals[3].restrict = 0;
                    }
                } else {
                    if (this.type == 1 || this.type == 2) {
                        this.novicePilot();
                        if (this.mobInfo == null) {
                            return;
                        } else {
                            if (this.mobInfo.mobId == 100007) {
                                if (this.mobInfo.star != 0 && this.mobInfo.firstReward == true) {
                                    this.generals[3].restrict = 0;
                                } else {
                                    this.generals[3].restrict = 1;
                                }
                            }
                        }
                        if (this.maxMobID < 100008) {
                            this.generals[3].restrict = 1;
                        }
                    } else {
                        this.generals[3].restrict = 0;
                    }
                }
            } else if (this.type == 16 || this.type == 22) {// 跨服格斗场 / 好友三队切磋
                this.combatNumber.visible = false;
                this.TopLeft1.visible = true;
                this.TopRight1.visible = true;
                this.onButtonTeam1();
            } else if (this.type == 24 || this.type == 17) {// 工会战 24 
                this.combatNumber.visible = false;
            } else if (this.type == 7 || this.type == 21) {// 本服格斗场 / 好友单队切磋
                this.combatNumber.visible = false;
                this.TopRight1.visible = true;
            }

            if (Teach.m_bOpenTeach == true) {
                if (this.type == 1 || this.type == 2) {
                    if (this.generals[3].restrict == 0) {// 解锁1-7
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }

                    if (this.generals[3].restrict == 1) {// 限制1-7
                        this.censorshipRestrict.visible = true;
                        this.clearanceLock.visible = true;
                        this.clearanceLock3.visible = false;
                    }

                    if (this.maxMobID > 100008) {
                        this.generals[3].restrict == 0;
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                } else {
                    if (this.generals[3].restrict == 0) {// 解锁1-7
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
            } else {
                if (this.type == 1 || this.type == 2) {
                    if (this.generals[3].restrict == 0) {// 解锁1-7
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }

                    if (this.generals[3].restrict == 1) {// 限制1-7
                        this.censorshipRestrict.visible = true;
                        this.clearanceLock.visible = true;
                        this.clearanceLock3.visible = false;
                    }

                    if (this.maxMobID > 100008) {
                        this.generals[3].restrict == 0;
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                } else {
                    if (this.generals[3].restrict == 0) {// 解锁1-7
                        this.censorshipRestrict.visible = false;
                        this.clearanceLock.visible = false;
                    }
                }
            }
            this.guidance();// 新手引导卡座等级开启限制        
        }

        /**
         * 玩家战力值默认"0"
         */
        public LoadTotalBattleValue() {
            let allBV = 0;
            let allGens = this.getBattleGenerals();
            for (let i = 0; i < allGens.length; i++) {
                if (allGens[i].generalId != 0) {
                    if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                        if (allGens[i].generalId == 110001 || allGens[i].generalId == 110005) {
                            return allBV;
                        } else {
                            if (Game.PlayerHunterSystem.queryHunter(allGens[i].generalId) == null) {
                                return allBV;
                            } else {
                                allBV += Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                            }
                        }
                    } else {
                        if (Game.PlayerHunterSystem.queryHunter(allGens[i].generalId) == null) {
                            return allBV;
                        } else {
                            allBV += Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                        }
                    }
                }
            }
            return allBV;
        }

        /**
         * 1队
         */
        public onButtonTeam1() {
            //this.hunterInfo(this.idType);
            this.idType = 0;
            this.refreshInfo(0);
            this.btnColour();
            Set.ButtonBackgroud(this.ButtonTeam1, "ui_arena_ButtonNumTeamNor1_png", );
        }

        /**
         * 2队
         */
        public onButtonTeam2(e) {
            //this.hunterInfo(this.idType);
            this.idType = 1;
            this.refreshInfo(1);
            this.btnColour();
            Set.ButtonBackgroud(this.ButtonTeam2, "ui_arena_ButtonNumTeamNor1_png", );
        }

        /**
         * 3队
         */
        public onButtonTeam3() {
            //this.hunterInfo(this.idType);
            this.idType = 2;
            this.refreshInfo(2);
            this.btnColour();
            Set.ButtonBackgroud(this.ButtonTeam3, "ui_arena_ButtonNumTeamNor1_png", );
        }

        /** 
         * 将所有按钮颜色变暗 
         */
        private btnColour() {
            Set.ButtonBackgroud(this.ButtonTeam1, "ui_arena_ButtonNumTeamSel2_png", );
            Set.ButtonBackgroud(this.ButtonTeam2, "ui_arena_ButtonNumTeamSel2_png", );
            Set.ButtonBackgroud(this.ButtonTeam3, "ui_arena_ButtonNumTeamSel2_png", );
        }

        private hunterInfo(id: number) {
            if (id == 0) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            } else if (id == 1) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            } else if (id == 2) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }

            for (let i = 0; i < this.generals.length; i++) {
                if (i < 4) {
                    this._formatsSingleAttack[id].generals[i] = this.generals[i].generalId;
                } else {
                    this._formatsSingleAttack[id].supports[i - 4] = this.generals[i].generalId;
                }
            }
        }

        private refreshInfo(id: number) {
            this.generals = [];
            for (let i = 0; i < 8; i++) {
                let posState = new PosState();
                if (i < 4) {
                    if (this._formatsSingleAttack[id].generals[i] != null && this._formatsSingleAttack[id].generals[i] != 0) {
                        posState.generalId = this._formatsSingleAttack[id].generals[i];
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                } else {
                    if (this._formatsSingleAttack[id].supports[i - 4] != null && this._formatsSingleAttack[id].supports[i - 4] != 0) {
                        posState.generalId = this._formatsSingleAttack[id].supports[i - 4]
                        posState.state = 1;
                    }
                    this.generals.push(posState);
                }
            }
            this.refreshOverallInfo();
        }

        /** 刷新全局信息 */
        private refreshOverallInfo() {
            this.drawUI();
            this.hunterInfo(this.idType);
            this.down.init();
            this.battleNum();
            Game.EventManager.event(GameEvent.CROSS_BEAM_FIELD, this.generalss);// 跨服格斗场临时存放阵型   
        }

        public battleNum() {
            let num1 = 0;
            let num2 = 0;
            let num3 = 0;
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i].generalId != 0) {
                        num1 = num1 + 1;
                        this.labelHunterNum1.text = num1 + "/4" + "";
                    } else {
                        this.labelHunterNum1.text = num1 + "/4" + "";
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i + 8].generalId != 0) {
                        num2 = num2 + 1;
                        this.labelHunterNum2.text = num2 + "/4" + "";
                    } else {
                        // num2 = num2 - 1;
                        this.labelHunterNum2.text = num2 + "/4" + "";
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generalss[i + 16].generalId != 0) {
                        num3 = num3 + 1;
                        this.labelHunterNum3.text = num3 + "/4" + "";
                    } else {
                        // num3 = num3 - 1;
                        this.labelHunterNum3.text = num3 + "/4" + "";
                    }
                }
            }
        }

        /**
         * 阵容方案
         */
        public onButtonSet() {
            //toast(LANG("功能未开启"));
            loadUI(CommonFormationSet)
                .then((dialog: CommonFormationSet) => {
                    dialog.show(UI.SHOW_FROM_TOP);
                    //dialog.setInfo(this.father.focusCur);
                });
        }

        /**
         * 初始化ui
         */
        public init() {
            // 1-4号位置文字图片
            for (let i = 0; i < 4; i++) {
                this[`imgPos${i}`].source = cachekey(UIConfig.UIConfig_Role.formationPosWord[i], this);
            }

            for (let i = 0; i < 8; i++) {
                let posState = new PosState();
                this.generals.push(posState);
            }

            for (let i = 0; i < 24; i++) {
                let posState = new PosState();
                this.generalss.push(posState);
            }

            this.drawUI();
        }

        /**
        * 跨服/三队切磋上阵武将初始化 
        */
        public MoreTeamPlay() {
            if (this.type == 16 || this.type == 22) {
                for (let i = 0; i < 8; i++) {
                    if (i < 4) {
                        this.generalss[i].generalId = this._formatsSingleAttack[0].generals[i];
                        this.generalss[i + 8].generalId = this._formatsSingleAttack[1].generals[i];
                        this.generalss[i + 16].generalId = this._formatsSingleAttack[2].generals[i];
                    } else {
                        this.generalss[i].generalId = this._formatsSingleAttack[0].supports[i - 4];
                        this.generalss[i + 8].generalId = this._formatsSingleAttack[1].supports[i - 4];
                        this.generalss[i + 16].generalId = this._formatsSingleAttack[2].supports[i - 4];
                    }
                }
                this.battleNum();
            }
        }

        /**
         * 其他上阵武将初始化  
         * lieutenant 主将
         * mainstay 副将  
         */
        private OnOffensive() {
            let peopleNumber = 0;
            for (let i = 5; i < 8; i++) {
                if (this.generals[i].grade == 1) {
                    this[`groupPos${i}`].visible = false;
                    this[`imgUpLock${i - 4}`].visible = true;// 锁头
                    this[`imgUpYuan${i - 4}`].visible = false;// 援助
                } else {
                    this[`groupPos${i}`].visible = false;
                    this[`imgUpLock${i - 4}`].visible = true;// 锁头
                    this[`imgUpYuan${i - 4}`].visible = false;// 援助
                }
            }
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.type == 8) {// 流星街
                        let street: number = Game.PlayerWantedSystem.wantedBossDifficulty;
                        for (let num = 0; num < 8; num++) {
                            if (street == num) {// 难度一 ~ 难度七    
                                this.lieutenant = this._formatsWant[num].generals[i];// 主将    
                            }
                        }
                    } else if (this.type == 16 || this.type == 22) {// 跨服格斗场
                        if (this.idType == 0) {// 第一队
                            this.lieutenant = this._formatsSingleAttack[0].generals[i];// 主将    
                        } else if (this.idType == 1) { // 第二队
                            this.lieutenant = this._formatsSingleAttack[1].generals[i];// 主将    
                        } else if (this.idType == 2) {// 第三队
                            this.lieutenant = this._formatsSingleAttack[2].generals[i];// 主将    
                        }
                    } else if (this.type == 26) {// 遗迹探索
                        let siteIndex = Game.PlayerFormationSystem.siteIndex;
                        if (siteIndex == 0) {
                            this.lieutenant = this._formatsRelic[0].generals[i];// 主将    
                        } else if (siteIndex == 1) {
                            this.lieutenant = this._formatsRelic[1].generals[i];// 主将 
                        } else if (siteIndex == 2) {
                            this.lieutenant = this._formatsRelic[2].generals[i];// 主将 
                        }
                    } else {// 其他副本
                        this.lieutenant = this._formationInfo[this.type - 1].generals[i];// 主将      
                        // 新手引导初始化上阵无武将
                        if (Teach.m_bOpenTeach == true) {
                            if (this.type == 1 || this.type == 2) {

                            } else {
                                if (this.type == 7) {
                                    if (Teach.isDone(1003) == true) {

                                    } else {
                                        this.lieutenant = 0;
                                    }
                                }
                            }
                        }
                    }

                    let hunterList = Game.PlayerHunterSystem.queryHunter(this.lieutenant);
                    if (hunterList == null || hunterList == undefined) {
                        this._formationInfo[this.type - 1].supports[i] = 0;
                    } else {
                        this.generals[i].generalId = this.lieutenant;
                    }

                    if (this.lieutenant == 0) {
                        this[`groupPos${i}`].visible = false;
                        // this[`imgArrow${i}`].visible = true;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                        this[`groupPos${i + 4}`].visible = false;
                        this[`imgUpLock${i}`].visible = true;
                        this[`imgUpYuan${i}`].visible = false;

                        peopleNumber = peopleNumber + 1;
                    } else {
                        if (Game.PlayerHunterSystem.queryHunter(this.lieutenant) == null) {
                            this.lieutenant = 0;
                            this.generals[i].generalId = this.lieutenant;
                            this[`groupPos${i}`].visible = false;
                            // this[`imgArrow${i}`].visible = true;
                            // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            this[`groupPos${i + 4}`].visible = false;
                            this[`imgUpLock${i}`].visible = true;
                            this[`imgUpYuan${i}`].visible = false;
                        }
                        else {
                            this.lieutenantStatus(i);
                            // this[`imgDownFrame${i}`].source = cachekey(PlayerHunterSystem.Frame(this.lieutenant), this);// 品质框
                            this["clearanceLock" + i].visible = false;
                            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                                // this[`imgDownIcon${i}`].source = cachekey("wx_" + PlayerHunterSystem.Head(this.lieutenant), this);// 1-4号主将位置
                            } else {
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
                            } else {
                                // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);// 辅助通道开启
                            }

                            if (i == 0) {
                                if (this.generals[i + 4].state == 0) {
                                    this.generals[i + 4].state = 1;
                                    this.openLieutenant(i);
                                }
                            }
                            for (let i = 1; i < 4; i++) {
                                if (this.generals[i + 4].grade == 1) {
                                    this[`groupPos${i + 4}`].visible = false;
                                    this[`imgUpLock${i}`].visible = true;// 锁头
                                    this[`imgUpYuan${i}`].visible = false;// 援助
                                } else {
                                    if (this.generals[i + 4].state == 0) {
                                        this.generals[i + 4].state = 1;
                                        this.openLieutenant(i);
                                    }
                                }
                            }

                            if (i == 3) {
                                if (this.generals[i + 4].grade == 0) {
                                    this[`groupPos${i + 4}`].visible = false;
                                    this[`imgUpLock${i}`].visible = false;// 锁头
                                    this[`imgUpYuan${i}`].visible = true;// 援助
                                }
                            }
                        }
                    }
                } else {
                    if (this.type == 8) {
                        let street: number = Game.PlayerWantedSystem.wantedBossDifficulty;
                        for (let num = 0; num < 7; num++) {
                            if (street == num) {// 难度一      
                                this.mainstay = this._formatsWant[num].supports[i - 4];// 主将    
                            }
                        }
                    } else if (this.type == 16 || this.type == 22) {// 跨服格斗场
                        if (this.idType == 0) {// 第一队                       
                            this.mainstay = this._formatsSingleAttack[0].supports[i - 4];// 主将    
                        } else if (this.idType == 1) {// 第二队                        
                            this.mainstay = this._formatsSingleAttack[1].supports[i - 4];// 主将    
                        } else if (this.idType == 2) {// 第三队                        
                            this.mainstay = this._formatsSingleAttack[2].supports[i - 4];// 主将    
                        }
                    } else if (this.type == 26) {// 遗迹探索
                        let siteIndex = Game.PlayerFormationSystem.siteIndex;
                        if (siteIndex == 0) {
                            this.mainstay = this._formatsRelic[0].supports[i - 4];// 主将    
                        } else if (siteIndex == 1) {
                            this.mainstay = this._formatsRelic[1].supports[i - 4];// 主将    
                        } else if (siteIndex == 2) {
                            this.mainstay = this._formatsRelic[2].supports[i - 4];// 主将    
                        }
                    } else {
                        this.mainstay = this._formationInfo[this.type - 1].supports[i - 4];// 副将        
                    }
                    this.generals[i].generalId = this.mainstay;
                    if (this.mainstay == 0) {
                        peopleNumber = peopleNumber + 1;
                        if (this[`imgArrow${i % 4}`].source == "ui_instance_IconArrowlockSupport_png") {
                            this[`groupPos${i}`].visible = false;
                            this[`imgUpLock${i % 4}`].visible = true;// 锁头
                            this[`imgUpYuan${i % 4}`].visible = false;// 默认头像                    
                        }
                    } else {
                        if (Game.PlayerHunterSystem.queryHunter(this.mainstay) == null) {
                            this.mainstay = 0;
                            this.generals[i].generalId = this.mainstay;
                            this[`groupPos${i}`].visible = false;
                            // this[`imgArrow${i % 4}`].visible = true;
                            // this[`imgArrow${i % 4}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            this[`imgUpLock${i % 4}`].visible = true;
                            this[`imgUpYuan${i % 4}`].visible = false;
                        } else {
                            this.mainstayStatus(i);
                            this[`imgFrame${i % 4}`].source = cachekey(PlayerHunterSystem.Frame(this.mainstay), this);// 1-4辅助位置
                            if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                                this[`imgUpIcon${i % 4}`].source = cachekey("wx_" + PlayerHunterSystem.Head(this.mainstay), this);// 1-4辅助位置
                            } else {
                                this[`imgUpIcon${i % 4}`].source = cachekey(PlayerHunterSystem.Head(this.mainstay), this);// 1-4辅助位置
                            }
                            this[`imgUpNum${i % 4}`].text = Game.PlayerHunterSystem.queryHunter(this.mainstay).level.toString();// 上阵数量
                        }
                    }
                }
            }
            this.novicePilot();
            this.drawUI();
            Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);// 阵容战力值       
            let hunterList = PlayerHunterSystem.GetHunterList().length;
            Game.EventManager.event(GameEvent.CONTINUE, [peopleNumber, hunterList]);// 还有未上阵的武将是否上阵
        }


        private hunterFashionableDress(generalId: number, group: eui.Group) {
            let generalInfo = Game.PlayerHunterSystem.queryHunter(generalId);
            let mapRoleId: number = null;
            if (generalInfo.fashionId != 0) {
                mapRoleId = PlayerHunterSystem.GetFahionInfo(generalInfo.fashionId).fashion_roleId;
            } else {
                mapRoleId = PlayerHunterSystem.Table(PlayerHunterSystem.GetGeneralId(generalId)).general_roleId;
            }
            let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
            let scale = TableMapRole.Item(mapRoleId).spine_scale;
            let body = TableClientFightAniSpineSource.Item(bodySpxId).json;
            Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                .then(display => {
                    group.removeChildren();
                    display.scaleX = scale*0.9;
                    display.scaleY = scale*0.9;
                    display.name = "fashion";
                    group.addChild(display);
                });
        }
        /**
         * 解锁副将位
         */
        public openLieutenant(i) {
            // if (this[`imgArrow${i}`].source == "ui_instance_IconArrowOpenSupport_png") {// 辅助通道开启
            this[`groupPos${i + 4}`].visible = false;
            this[`imgUpLock${i}`].visible = false;// 锁头
            this[`imgUpYuan${i}`].visible = true;// 援助
            // }
        }
        /**
         * 主将状态
         */
        private lieutenantStatus(i) {
            this[`groupPos${i}`].visible = true;
            // this[`imgDownFrame${i}`].visible = true;
            // this[`imgDownIcon${i}`].visible = true;
            // this[`groupDownStar${i}`].visible = true;
            // this[`imgDownNum${i}`].visible = true;
            // this[`imgArrow${i}`].visible = true;

            this[`groupPos${i + 4}`].visible = false;
            this[`imgUpLock${i}`].visible = false;
            this[`imgUpYuan${i}`].visible = true;
        }

        /**
         * 副将状态
         */
        private mainstayStatus(i) {
            this[`groupPos${i}`].visible = true;
            this[`imgUpIcon${i % 4}`].visible = true;
            this[`imgUpNum${i % 4}`].visible = true;
            this[`imgUpLock${i % 4}`].visible = false;// 锁头
            this[`imgUpYuan${i % 4}`].visible = false;// 默认头像
        }

        /**
         * 设置阵型位置
         */
        public onAddToStage() {
            for (let i = 0; i < 8; i++) {
                let groupPos_x = this[`groupPos${i}`].x;
                let groupPos_y = this[`groupPos${i}`].y;
                let worldPointUp = this[`group${i % 4}`].localToGlobal(groupPos_x, groupPos_y);// 本地坐标 转换 世界坐标  groupPos0 group0     
                worldPointUp.x -= Game.UIManager.x;
                let worldPointUp_x = worldPointUp.x;
                let worldPointUp_y = worldPointUp.y;
                let worldPointUp_width = this[`groupPos${i}`].width;
                let worldPointUp_height = this[`groupPos${i}`].height;

                let lead = new guidance();
                lead.x = worldPointUp_x;
                lead.y = worldPointUp_y;
                lead.width = worldPointUp_width;
                lead.height = worldPointUp_height;
                Game.PlayerFormationSystem.blowGuideFormations.push(lead);

                // let rect = new eui.Rect(this[`groupPosRect${i}`].width, this[`groupPosRect${i}`].height, 0xffffff);   
                // rect.x = this[`groupPosRect${i}`].x;
                // rect.y = this[`groupPosRect${i}`].y;
                // this.stage.addChild(rect);

                if (this[`groupPosRect${i}`] == null) {
                    this[`groupPosRect${i}`] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this[`groupPos${i}`].width, this[`groupPos${i}`].height);
                } else {
                    this[`groupPosRect${i}`].x = worldPointUp.x;
                    this[`groupPosRect${i}`].y = worldPointUp.y;   // = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this[`groupPos${i}`].width, this[`groupPos${i}`].height);
                }

                // let rect = new eui.Rect(this[`groupPosRect${i}`].width, this[`groupPosRect${i}`].height, 0x0000FF);
                // rect.x = this[`groupPosRect${i}`].x;
                // rect.y = this[`groupPosRect${i}`].y;
                // this.stage.addChild(rect);
            }
        }

        /**
         * 点击下方list数据显示到上阵列表中
         */
        public onMove(e) {
            this.onAddToStage();
            let objectData = e.data;
            for (let i = 0; i < 8; i++) {
                let rect = this[`groupPosRect${i}`];
                if (rect.contains(objectData.x, objectData.y)) {
                    this.novicePilot();
                    let pTarget = this.generals[i];
                    if (pTarget.restrict == 1) {
                        toast_warning(LANG("通关1-7开启"))
                    } else if (pTarget.grade == 1) {
                        toast_warning(LANG("等级不足"))
                        return;
                    } else {
                        // if (this.maxMobID < 100008 && this.type == 1) {
                        //     this.generals[4].state = 1
                        // }
                        if (i < 4) {// 主将
                            if (objectData.index == -1) {
                                // 播放音效--武将上阵
                                Game.SoundManager.playEffect(SoundManager.SoundOpen(30059), 100);
                                pTarget.generalId = objectData.generalId;
                            }
                            else {
                                if (objectData.index < 4) {
                                    [pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
                                    [this.generals[i + 4].generalId, this.generals[objectData.index + 4].generalId] = [this.generals[objectData.index + 4].generalId, this.generals[i + 4].generalId];
                                    [this.generals[i + 4].state, this.generals[objectData.index + 4].state] = [this.generals[objectData.index + 4].state, this.generals[i + 4].state];
                                }
                                else {
                                    [pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
                                }
                            }

                            if (i == 0) {
                                this.generals[i + 4].state = 1;
                            } else {
                                if (this.generals[i + 4].grade == 1) {
                                    this.generals[i + 4].state = 0;
                                } else {
                                    this.generals[i + 4].state = 1;
                                }
                            }
                        } else {// 副将
                            if (pTarget.state != 0 && !(i == objectData.index + 4 && pTarget.state == 1 && pTarget.generalId == 0)) {
                                if (objectData.index == -1) {
                                    pTarget.generalId = objectData.generalId;
                                }
                                else {
                                    if (pTarget.backer == 1) {
                                        pTarget.generalId = objectData.generalId;
                                    } else {
                                        [pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
                                        if (objectData.index < 4) {
                                            if (this.generals[objectData.index].generalId == 0) {
                                                this.generals[objectData.index + 4].generalId = 0;
                                                this.generals[objectData.index + 4].state = 0;
                                            }
                                        }
                                        else {
                                            [pTarget.state, this.generals[objectData.index].state] = [this.generals[objectData.index].state, pTarget.state];
                                        }
                                    }
                                }
                            }
                            this.novicePilot();
                        }

                        this.drawUI();// 点击上阵列表中的数据返回到下方list中--从上阵列表中把数据去除
                        this.guidance();
                        break;
                    }
                }
            }
            Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST_ITEM);
        }

        /**
         * 点击上阵列表中的数据返回到下方list中--从上阵列表中把数据去除
         */
        public drawUI() {

            for (let i = 0; i < 8; i++) {
                let pS = Table.DeepCopy(this.generals[i]);
                let framePath = null;
                let iconPath = null;
                let hunterInfo = null;
                let baseGeneralInfo = null;
                if (Teach.m_bOpenTeach == true) {
                    if ((this.generals[4].generalId == 110001 || this.generals[4].generalId == 110005) && this.blowGuide > 100001 && this.blowGuide < 100008) {
                        if (i == 4) {
                            pS.generalId = 0;
                        }
                    }
                }
                if (pS.generalId != 0) {
                    framePath = PlayerHunterSystem.Frame(pS.generalId);
                    iconPath = PlayerHunterSystem.Head(pS.generalId);
                    hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);
                    baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
                }
                this.guidance();

                if (i < 4) {
                    if (pS.generalId) {
                        // this[`imgDownFrame${i}`].source = cachekey(framePath, this);

                        if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                            // this[`imgDownIcon${i}`].source = cachekey("wx_" + iconPath, this);// 1-4号位置
                        } else {
                            // this[`imgDownIcon${i}`].source = cachekey(iconPath, this);// 1-4号位置
                            this["clearanceLock" + i].visible = false;
                            this.hunterFashionableDress(pS.generalId, this["grouphunter" + i]);
                        }
                        // this[`imgDownNum${i}`].text = hunterInfo.level.toString();
                        // Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], hunterInfo.star, hunterInfo.awakePassive.level);
                        this[`groupPos${i}`].visible = true;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.open, this);

                        if (Teach.m_bOpenTeach == true) {
                            // 只限新手引导武将显示隐藏
                            this.restrictNovice();
                        }
                    }
                    else {
                        this["clearanceLock" + i].visible = true;
                        this[`groupPos${i}`].visible = false;
                        // this[`imgArrow${i}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                        this.generals[i + 4].state = 0;
                    }
                }
                else {
                    if (pS.generalId) {
                        this[`imgFrame${i % 4}`].source = cachekey(framePath, this);// 框
                        if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                            this[`imgUpIcon${i % 4}`].source = cachekey("wx_" + iconPath, this);// 1-4辅助位置
                        } else {
                            this[`imgUpIcon${i % 4}`].source = cachekey(iconPath, this);// 1-4辅助位置
                        }
                        if (hunterInfo != null) {
                            this[`imgUpNum${i % 4}`].text = hunterInfo.level.toString();
                        } else {
                            this[`imgUpNum${i % 4}`].text = "";
                        }

                        this[`groupPos${i}`].visible = true;
                    }
                    else {
                        this["imgFrame" + (i % 4)].source = cachekey("ui_frame_FrameHunterAsh_png", this);
                        this[`groupPos${i}`].visible = false;
                        if (Teach.m_bOpenTeach == true && this.type == 1) {
                            if (this.maxMobID < 100008) {
                                this.generals[4].state = 1;
                            }
                        } else {
                            if (this.maxMobID < 100008) {
                                this.generals[4].state = 0;
                            }
                        }
                        if (i == 5 || i == 6 || i == 7) {
                            if (pS.grade == 1) {
                                this[`imgUpLock${i % 4}`].visible = true;
                                this[`imgUpYuan${i % 4}`].visible = false;
                                // this[`imgArrow${i % 4}`].source = cachekey(UIConfig.UIConfig_Role.formationSptArrow.lock, this);
                            } else {
                                if (pS.state == 0) {
                                    this[`imgUpLock${i % 4}`].visible = true;
                                    this[`imgUpYuan${i % 4}`].visible = false;
                                }
                                else {
                                    this[`imgUpLock${i % 4}`].visible = false;
                                    this[`imgUpYuan${i % 4}`].visible = true;
                                }
                            }
                        } else {
                            if (Teach.m_bOpenTeach == true) {
                                if (pS.state == 0) {
                                    this[`imgUpLock${i % 4}`].visible = true;
                                    this[`imgUpYuan${i % 4}`].visible = false;
                                }
                                else {
                                    this[`imgUpLock${i % 4}`].visible = false;
                                    this[`imgUpYuan${i % 4}`].visible = true;
                                }
                            } else {
                                if (this.generals[i % 4].generalId != 0) {
                                    this[`imgUpLock${i % 4}`].visible = false;
                                    this[`imgUpYuan${i % 4}`].visible = true;
                                } else {
                                    this[`imgUpLock${i % 4}`].visible = true;
                                    this[`imgUpYuan${i % 4}`].visible = false;
                                }
                            }
                        }

                        if (Teach.m_bOpenTeach == true) {
                            // 只限新手引导武将显示隐藏
                            this.restrictNovice();
                        }
                    }
                }
            }
            for (let i = 0; i < 8; i++) {
                if (i < 4) {
                    if (this.generals[i].generalId != 0) {
                        this.generals[i + 4].state = 1;
                    }
                }
            }
            if (this.type == 16 || this.type == 22) {
                // this.hunterInfo(this.idType);
                this.battleNum();
                Game.EventManager.event(GameEvent.CROSS_BEAM_FIELD, this.generalss);// 跨服格斗场临时存放阵型     
            } else {
                egret.Tween.get(this).wait(100).call(() => {
                    Game.EventManager.event(GameEvent.FORMATION_DATE, this.generals);// 临时存放阵型
                })
                Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);// 阵容战力值
            }
            let num = 0;
            for (let i = 0; i < 8; i++) {
                if (this.generals[i].generalId == 0) {
                    num = num + 1;
                }
            }
            let hunterList = PlayerHunterSystem.GetHunterList().length;
            Game.EventManager.event(GameEvent.CONTINUE, [num, hunterList]);// 还有未上阵的武将是否上阵
        }

        // 只限新手引导武将显示隐藏
        public restrictNovice() {
            if (this.blowGuide > 100001 && this.blowGuide < 100008) {
                if (this.blowGuide == 100004 || this.blowGuide == 100005) {// 奇犽 45           
                    if (this.generals[0].generalId != 0) {
                        this.showBootImage(10001);
                    } else {
                        this.hideBootImage();
                    }
                } else {// 凯特 23 67
                    if (this.generals[0].generalId != 0) {
                        this.showBootImage(10005);
                    } else {
                        this.hideBootImage();
                    }
                }
            }
        }

        /**
         * 向上拖动选择上阵猎人list调用
         */
        public addGeneral(generalId) {
            for (let i = 0; i < 8; i++) {
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
                        Game.SoundManager.playEffect(SoundManager.SoundOpen(30059), 100);
                        this.generals[i].generalId = generalId;
                    } else {
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
                    Game.EventManager.event(GameEvent.FORMATE_REFRESH_LIST, { x: this[`groupPosRect${i}`].x, y: this[`groupPosRect${i}`].y, id: PlayerHunterSystem.Head(generalId) });
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
        }

        /**
         * 注销事件
         */
        public unEvent() {
            Game.EventManager.off(GameEvent.ON_MOVE, this.onMove, this);
            Game.EventManager.off(GameEvent.BATTLE_VALUE_CHANGE, this.onBattlevaluechange, this);
            Game.EventManager.off(GameEvent.USING_SUCCESSFUL, this.onUsingSuccessful, this);
        }

        /**
         * 只有一个列表数据
         */
        public getBattleGenerals() {
            let a = this.getMultitudeList();
            for (let i = 0; i < a.length; i++) {
                if (a[i].generalId != 0) {
                    return a;
                }
            }
            return this.generals;
        }

        /**
         * 1.2.3队列表数据
         */
        public getMultitudeList() {
            if (this.idType == 0) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            } else if (this.idType == 1) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            } else if (this.idType == 2) {
                for (let i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            return this.generalss;
        }
    }


}