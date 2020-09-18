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
    /**
     * 阵容方案
     */
    var CommonFormationSet = (function (_super) {
        __extends(CommonFormationSet, _super);
        function CommonFormationSet() {
            var _this = _super.call(this) || this;
            // 底部数据data
            _this.listBottomData = new eui.ArrayCollection();
            // 每组武将列表
            _this.generals = [];
            // 所有队伍武将列表
            _this.generalss = [];
            // 当前选中的队伍
            _this.idType = 1;
            _this.dataType = 1;
            // 拖动图片
            _this.moveImg = new eui.Image;
            _this.moveGId = null;
            _this.moveIndex = 0;
            // 阵容方案--本服
            _this.saveFrom = zj.Game.PlayerFormationSystem.squadPlan;
            // 阵容方案-- 跨服
            _this.crossBeam = zj.Game.PlayerFormationSystem.crossBeam;
            // 阵容方案-- 好友单队切磋
            _this.friendsTeams = zj.Game.PlayerFormationSystem.friendsTeams;
            // 阵容方案-- 好友多队切磋
            _this.moreTeam = zj.Game.PlayerFormationSystem.moreTeam;
            // 副本类型
            _this.type = zj.Game.PlayerInstanceSystem.curInstanceType;
            // 主将保存
            _this.commanderSave = 0;
            // 副将保存
            _this.mainstaySave = 0;
            _this.skinName = "resource/skins/formation/CommonFormationSetSkin.exml";
            _this.initData(); // 初始化数据
            _this.registerEvents(); // 监听事件
            _this.initializer(); // 初始化上阵
            return _this;
        }
        /**
         * 初始化数据
         */
        CommonFormationSet.prototype.initData = function () {
            for (var i = 0; i < 8; i++) {
                if (i > 3) {
                    this.lieutenant(i);
                }
                else {
                    this.commandingGeneral(i);
                }
            }
            for (var i = 8; i < 16; i++) {
                if (i > 11) {
                    this.lieutenant(i);
                }
                else {
                    this.commandingGeneral(i);
                }
            }
            for (var i = 16; i < 24; i++) {
                if (i > 19) {
                    this.lieutenant(i);
                    ;
                }
                else {
                    this.commandingGeneral(i);
                }
            }
            for (var i = 24; i < 32; i++) {
                if (i > 27) {
                    this.lieutenant(i);
                }
                else {
                    this.commandingGeneral(i);
                }
            }
            for (var i = 32; i < 40; i++) {
                if (i > 35) {
                    this.lieutenant(i);
                }
                else {
                    this.commandingGeneral(i);
                }
            }
            for (var i = 0; i < 8; i++) {
                var posState = new zj.PosState();
                this.generals.push(posState);
            }
            for (var i = 0; i < 40; i++) {
                var posState = new zj.PosState();
                this.generalss.push(posState);
            }
        };
        /**
         * 副将--锁头状态
         */
        CommonFormationSet.prototype.lieutenant = function (i) {
            this["imgUpIcon" + i].visible = false; // 头像
            this["imgUpYuan" + i].visible = false; // 辅助
            this["imgUpLock" + i].visible = true; // 锁头
            this["groupDownStar" + i].visible = false; // 星星
            this["imgUpNum" + i].visible = false; // 数量	
        };
        /**
         * 副将--援助状态
         */
        CommonFormationSet.prototype.lieutenantAid = function (i) {
            this["imgUpIcon" + i].visible = false; // 头像
            this["imgUpLock" + i].visible = false; // 锁头
            this["imgUpYuan" + i].visible = true; // 辅助
            this["groupDownStar" + i].visible = false; // 星星
            this["imgUpNum" + i].visible = false; // 数量	
        };
        /**
         * 主将
         */
        CommonFormationSet.prototype.commandingGeneral = function (i) {
            this["imgDownIcon" + i].visible = false; // 头像
            this["imgDownFrame" + i].source = zj.cachekey("ui_frame_FrameHunterGreen1_png", this); // 框	
            this["groupDownStar" + i].visible = false; // 星星
            this["imgDownNum" + i].visible = false; // 数量	
        };
        /**
         * 监听事件
         */
        CommonFormationSet.prototype.registerEvents = function () {
            var _this = this;
            this.btnSave.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSave, this); // 保存
            this.btnSet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSet, this); // 编辑		
            this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnCancel, this); // 取消
            this.btnColse.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnColse, this); // 关闭
            this.btnSelect1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect1, this); // 队伍1
            this.btnSelect2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect2, this); // 队伍2
            this.btnSelect3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect3, this); // 队伍3
            this.btnSelect4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect4, this); // 队伍4
            this.btnSelect5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect5, this); // 队伍5
            this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this); // 拖动list上阵猎人图片
            zj.Game.EventManager.on(zj.GameEvent.DRAG_LOOSEN, this.ondragLoosen, this); // 拖动图片松开时触发
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this); // 在舞台上拖动移动	
            this.teamClick(); //1-5队伍点击
            // list列表猎人拖动数据
            zj.Game.EventManager.on(zj.GameEvent.MOUSE_BEGIN, function (e) {
                var objectData = e.data;
                if (objectData.generalId != 0) {
                    _this.moveImg.width = 95;
                    _this.moveImg.height = 93;
                    _this.moveImg.source = zj.cachekey(zj.PlayerHunterSystem.Head(objectData.generalId), _this);
                    _this.moveImg.visible = false;
                    _this.moveImg.x = e.stageX - 95 / 2;
                    _this.moveImg.y = e.stageY - 93 / 2;
                    _this.moveGId = objectData.generalId;
                    _this.moveIndex = objectData.index;
                }
            }, this);
            this.addChild(this.moveImg);
        };
        /**
         * 1-5队伍点击
         */
        CommonFormationSet.prototype.teamClick = function () {
            var _this = this;
            var _loop_1 = function (i) {
                this_1["groupPos" + i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    _this.initList();
                }, this_1);
                this_1["groupPos" + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 8; i++) {
                _loop_1(i);
            }
            var _loop_2 = function (i) {
                this_2["groupPos" + (i + 8)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    _this.initList();
                }, this_2);
                this_2["groupPos" + (i + 8)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                }, this_2);
            };
            var this_2 = this;
            for (var i = 0; i < 8; i++) {
                _loop_2(i);
            }
            var _loop_3 = function (i) {
                this_3["groupPos" + (i + 16)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    _this.initList();
                }, this_3);
                this_3["groupPos" + (i + 16)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                }, this_3);
            };
            var this_3 = this;
            for (var i = 0; i < 8; i++) {
                _loop_3(i);
            }
            var _loop_4 = function (i) {
                this_4["groupPos" + (i + 24)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    _this.initList();
                }, this_4);
                this_4["groupPos" + (i + 24)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                }, this_4);
            };
            var this_4 = this;
            for (var i = 0; i < 8; i++) {
                _loop_4(i);
            }
            var _loop_5 = function (i) {
                this_5["groupPos" + (i + 32)].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                    zj.Game.EventManager.event(zj.GameEvent.MOUSE_BEGIN, { generalId: _this.generals[i].generalId, index: i });
                    _this.initList();
                }, this_5);
                this_5["groupPos" + (i + 32)].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    if (i < 4) {
                        _this.generals[i].generalId = 0;
                        _this.generals[i + 4].generalId = 0;
                        _this.generals[i + 4].state = 0;
                    }
                    else {
                        _this.generals[i].generalId = 0;
                    }
                    _this.refreshOverallInfo();
                }, this_5);
            };
            var this_5 = this;
            for (var i = 0; i < 8; i++) {
                _loop_5(i);
            }
        };
        /**
         * 主将显示
         */
        CommonFormationSet.prototype.commanderReveal = function (i) {
            this["imgDownIcon" + i].visible = true;
            this["groupDownStar" + i].visible = true;
            this["imgDownNum" + i].visible = true;
            this["imgDownFrame" + i].source = zj.cachekey(zj.PlayerHunterSystem.Frame(this.commanderSave), this); // 品质框
            this["imgDownIcon" + i].source = zj.cachekey(zj.cachekey(zj.PlayerHunterSystem.Head(this.commanderSave), this), this); // 1-4号主将位置
            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + i], zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave).star, zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave).awakePassive.level); // 几星武将
            this["imgDownNum" + i].text = zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave).level.toString(); // 上阵数量  
        };
        /**
         * 主将隐藏
         */
        CommonFormationSet.prototype.commanderConceal = function (i) {
            this["imgDownIcon" + i].visible = false;
            this["groupDownStar" + i].visible = false;
            this["imgDownNum" + i].visible = false;
        };
        /**
         * 副将显示
         */
        CommonFormationSet.prototype.mainstayReveal = function (i) {
            this["imgUpIcon" + i].visible = true;
            this["groupDownStar" + i].visible = true;
            this["imgUpNum" + i].visible = true;
            this["imgUpLock" + i].visible = false;
            this["imgUpYuan" + i].visible = false;
            this["imgDownFrame" + i].source = zj.cachekey(zj.PlayerHunterSystem.Frame(this.mainstaySave), this); // 品质框
            this["imgUpIcon" + i].source = zj.cachekey(zj.PlayerHunterSystem.Head(this.mainstaySave), this); // 1-4号主将位置
            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + i], zj.Game.PlayerHunterSystem.queryHunter(this.mainstaySave).star, zj.Game.PlayerHunterSystem.queryHunter(this.mainstaySave).awakePassive.level); // 几星武将
            this["imgUpNum" + i].text = zj.Game.PlayerHunterSystem.queryHunter(this.mainstaySave).level.toString(); // 上阵数量 
        };
        CommonFormationSet.prototype.circulationInfo = function () {
            for (var i = 0; i < 8; i++) {
                this.generals[i].state = 0;
            }
        };
        /**
         * 1 2 3 4 5队伍主将本地加载
         */
        CommonFormationSet.prototype.troopsGenerals = function (num, i) {
            if (this.type == 7) {
                this.saveFrom[num].formationType = 7;
                this.commanderSave = this.saveFrom[num].generals[i];
            }
            else if (this.type == 16) {
                this.crossBeam[num].formationType = 16;
                this.commanderSave = this.crossBeam[num].generals[i];
            }
            else if (this.type == 21) {
                this.friendsTeams[num].formationType = 21;
                this.commanderSave = this.friendsTeams[num].generals[i];
            }
            else if (this.type == 22) {
                this.moreTeam[num].formationType = 22;
                this.commanderSave = this.moreTeam[num].generals[i];
            }
        };
        /**
         * 1 2 3 4 5队伍副将本地加载
         */
        CommonFormationSet.prototype.troopsmainstay = function (num, i) {
            if (this.type == 7) {
                this.saveFrom[num].formationType = 7;
                this.mainstaySave = this.saveFrom[num].supports[i - 4];
            }
            else if (this.type == 16) {
                this.crossBeam[num].formationType = 16;
                this.mainstaySave = this.crossBeam[num].supports[i - 4];
            }
            else if (this.type == 21) {
                this.friendsTeams[num].formationType = 21;
                this.mainstaySave = this.friendsTeams[num].supports[i - 4];
            }
            else if (this.type == 22) {
                this.moreTeam[num].formationType = 22;
                this.commanderSave = this.moreTeam[num].supports[i - 4];
            }
        };
        /**
     * 初始化上阵
     */
        CommonFormationSet.prototype.initializer = function () {
            for (var i = 0; i < 8; i++) {
                var num = 0;
                if (i < 4) {
                    this.troopsGenerals(num, i);
                    this.generals[i].generalId = this.commanderSave;
                    if (this.commanderSave == 0) {
                        this.commanderConceal(i); // 主将隐藏 	
                        this.generals[i + 4].state = 0;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
                            this.generals[i].generalId = 0;
                            this.commanderSave = 0;
                            this.commanderConceal(i); // 主将隐藏 	
                            this.generals[i + 4].state = 0;
                        }
                        else {
                            this.commanderReveal(i); // 主将显示	
                            this.generals[i + 4].state = 1;
                        }
                    }
                }
                else {
                    this.troopsmainstay(num, i);
                    this.generals[i].generalId = this.mainstaySave;
                    if (this.mainstaySave == 0) {
                        if (this.generals[i].state == 1) {
                            this["imgUpLock" + i].visible = false;
                            this["imgUpYuan" + i].visible = true;
                        }
                        else {
                            this["imgUpLock" + i].visible = true;
                            this["imgUpYuan" + i].visible = false;
                        }
                    }
                    else {
                        this.mainstayReveal(i);
                    }
                }
            }
            this.circulationInfo();
            for (var i = 0; i < 8; i++) {
                var num = 1;
                if (i < 4) {
                    this.troopsGenerals(num, i);
                    this.generals[i].generalId = this.commanderSave;
                    if (this.commanderSave == 0) {
                        this.commanderConceal(i + 8); // 主将隐藏 
                        this.generals[i + 4].state = 0;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
                            this.generals[i].generalId = 0;
                            this.commanderSave = 0;
                            this.commanderConceal(i + 8); // 主将隐藏 	
                            this.generals[i + 4].state = 0;
                        }
                        else {
                            this.commanderReveal(i + 8); // 主将显示
                            this.generals[i + 4].state = 1;
                        }
                    }
                }
                else {
                    this.troopsmainstay(num, i);
                    this.generals[i].generalId = this.mainstaySave;
                    if (this.mainstaySave == 0) {
                        if (this.generals[i].state == 1) {
                            this["imgUpLock" + (i + 8)].visible = false;
                            this["imgUpYuan" + (i + 8)].visible = true;
                        }
                        else {
                            this["imgUpLock" + (i + 8)].visible = true;
                            this["imgUpYuan" + (i + 8)].visible = false;
                        }
                    }
                    else {
                        this.mainstayReveal(i + 8);
                    }
                }
            }
            this.circulationInfo();
            for (var i = 0; i < 8; i++) {
                var num = 2;
                if (i < 4) {
                    this.troopsGenerals(num, i);
                    this.generals[i].generalId = this.commanderSave;
                    if (this.commanderSave == 0) {
                        this.commanderConceal(i + 16); // 主将隐藏 
                        this.generals[i + 4].state = 0;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
                            this.generals[i].generalId = 0;
                            this.commanderSave = 0;
                            this.commanderConceal(i + 16); // 主将隐藏 	
                            this.generals[i + 4].state = 0;
                        }
                        else {
                            this.commanderReveal(i + 16); // 主将显示
                            this.generals[i + 4].state = 1;
                        }
                    }
                }
                else {
                    this.troopsmainstay(num, i);
                    this.generals[i].generalId = this.mainstaySave;
                    if (this.mainstaySave == 0) {
                        if (this.generals[i].state == 1) {
                            this["imgUpLock" + (i + 16)].visible = false;
                            this["imgUpYuan" + (i + 16)].visible = true;
                        }
                        else {
                            this["imgUpLock" + (i + 16)].visible = true;
                            this["imgUpYuan" + (i + 16)].visible = false;
                        }
                    }
                    else {
                        this.mainstayReveal(i + 16);
                    }
                }
            }
            this.circulationInfo();
            for (var i = 0; i < 8; i++) {
                var num = 3;
                if (i < 4) {
                    this.troopsGenerals(num, i);
                    this.generals[i].generalId = this.commanderSave;
                    if (this.commanderSave == 0) {
                        this.commanderConceal(i + 24); // 主将隐藏 
                        this.generals[i + 4].state = 0;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
                            this.generals[i].generalId = 0;
                            this.commanderSave = 0;
                            this.commanderConceal(i + 24); // 主将隐藏 	
                            this.generals[i + 4].state = 0;
                        }
                        else {
                            this.commanderReveal(i + 24); // 主将显示
                            this.generals[i + 4].state = 1;
                        }
                    }
                }
                else {
                    this.troopsmainstay(num, i);
                    this.generals[i].generalId = this.mainstaySave;
                    if (this.mainstaySave == 0) {
                        if (this.generals[i].state == 1) {
                            this["imgUpLock" + (i + 24)].visible = false;
                            this["imgUpYuan" + (i + 24)].visible = true;
                        }
                        else {
                            this["imgUpLock" + (i + 24)].visible = true;
                            this["imgUpYuan" + (i + 24)].visible = false;
                        }
                    }
                    else {
                        this.mainstayReveal(i + 24);
                    }
                }
            }
            this.circulationInfo();
            for (var i = 0; i < 8; i++) {
                var num = 4;
                if (i < 4) {
                    this.troopsGenerals(num, i);
                    this.generals[i].generalId = this.commanderSave;
                    if (this.commanderSave == 0) {
                        this.commanderConceal(i + 32); // 主将隐藏 
                        this.generals[i + 4].state = 0;
                    }
                    else {
                        if (zj.Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
                            this.generals[i].generalId = 0;
                            this.commanderSave = 0;
                            this.commanderConceal(i + 32); // 主将隐藏 	
                            this.generals[i + 4].state = 0;
                        }
                        else {
                            this.commanderReveal(i + 32); // 主将显示
                            this.generals[i + 4].state = 1;
                        }
                    }
                }
                else {
                    this.troopsmainstay(num, i);
                    this.generals[i].generalId = this.mainstaySave;
                    if (this.mainstaySave == 0) {
                        if (this.generals[i].state == 1) {
                            this["imgUpLock" + (i + 32)].visible = false;
                            this["imgUpYuan" + (i + 32)].visible = true;
                        }
                        else {
                            this["imgUpLock" + (i + 32)].visible = true;
                            this["imgUpYuan" + (i + 32)].visible = false;
                        }
                    }
                    else {
                        this.mainstayReveal(i + 32);
                    }
                }
            }
        };
        /**
         * 在舞台上拖动移动
         */
        CommonFormationSet.prototype.mouseMove = function (e) {
            this.moveImg.visible = false;
            this.moveImg.x = e.stageX - 95 / 2;
            this.moveImg.y = e.stageY - 93 / 2;
            var listWorld = this.battleList.localToGlobal(this["slide"].x, this["slide"].y);
            listWorld.x -= zj.Game.UIManager.x;
            var listRect = new egret.Rectangle(listWorld.x, listWorld.y, this["listGeneral"].width, this["listGeneral"].height);
            if (listRect.contains(this.moveImg.x, this.moveImg.y) == false) {
                this.moveImg.visible = true;
            }
        };
        /**
         * 拖动list上阵猎人图片
         */
        CommonFormationSet.prototype.mouseUp = function (e) {
            zj.Game.EventManager.event(zj.GameEvent.DRAG_LOOSEN, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex });
            this.moveImg.visible = false;
            this.moveImg.source = "";
            this.initList();
        };
        /**
         * 获取坐标
         */
        CommonFormationSet.prototype.onAddToStage = function (idType, i) {
            var worldPointUp = this["btnSelect" + idType].localToGlobal(this["groupPos" + i].x, this["groupPos" + i].y);
            worldPointUp.x -= zj.Game.UIManager.x;
            this["groupPosRect" + i] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this["groupPos" + i].width, this["groupPos" + i].height);
        };
        /**
         * 拖动图片松开时触发
         */
        CommonFormationSet.prototype.ondragLoosen = function (e) {
            for (var i = 0; i < 8; i++) {
                if (this.idType == 1) {
                    this.onAddToStage(this.idType, i);
                }
                else if (this.idType == 2) {
                    this.onAddToStage(this.idType, i + 8);
                }
                else if (this.idType == 3) {
                    this.onAddToStage(this.idType, i + 16);
                }
                else if (this.idType == 4) {
                    this.onAddToStage(this.idType, i + 24);
                }
                else if (this.idType == 5) {
                    this.onAddToStage(this.idType, i + 32);
                }
            }
            var objectData = e.data;
            for (var i = 0; i < 8; i++) {
                if (this.idType == 1) {
                    if (this["groupPosRect" + i].contains(objectData.x, objectData.y)) {
                        this.teamDrag(objectData, i);
                    }
                }
                else if (this.idType == 2) {
                    if (this["groupPosRect" + (i + 8)].contains(objectData.x, objectData.y)) {
                        this.teamDrag(objectData, i);
                    }
                }
                else if (this.idType == 3) {
                    if (this["groupPosRect" + (i + 16)].contains(objectData.x, objectData.y)) {
                        this.teamDrag(objectData, i);
                    }
                }
                else if (this.idType == 4) {
                    if (this["groupPosRect" + (i + 24)].contains(objectData.x, objectData.y)) {
                        this.teamDrag(objectData, i);
                    }
                }
                else if (this.idType == 5) {
                    if (this["groupPosRect" + (i + 32)].contains(objectData.x, objectData.y)) {
                        this.teamDrag(objectData, i);
                    }
                }
            }
        };
        /**
         * 队伍拖动
         */
        CommonFormationSet.prototype.teamDrag = function (objectData, i) {
            var pTarget = this.generals[i];
            if (i < 4) {
                if (objectData.index == -1) {
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
            this.refreshOverallInfo();
            var _a, _b, _c, _d, _e, _f;
        };
        /**
         * 初始化上阵猎人
         */
        CommonFormationSet.prototype.initList = function () {
            var hunterList = zj.PlayerHunterSystem.GetHunterList();
            this.listBottomData.removeAll();
            for (var i = 0; i < hunterList.length; i++) {
                var v = hunterList[i];
                var data = new zj.FormatChooseHeroData();
                data.father = this;
                data.generalId = v;
                data.isCanTouch = true;
                this.listBottomData.addItem(data);
            }
            // 列表数据源--dataProvider
            this.listGeneral.dataProvider = this.listBottomData;
            // 每个item显示--item数据类需要继承eui.ItemRenderer接口
            this.listGeneral.itemRenderer = zj.FormatChooseHeroItem;
            // 每个item点击触发
            this.listGeneral.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
            // 每个item是否选中状态
            this.listGeneral.allowMultipleSelection = true;
        };
        /**
        * list中每个点击触发--eui.ItemTapEvent
        */
        CommonFormationSet.prototype.onListHerosTap = function (e) {
            // 获取每一个item索引
            var index = e.itemIndex;
            var point = this.listGeneral.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
            point.x -= zj.Game.UIManager.x;
            this.moveImg.x = point.x;
            this.moveImg.y = point.y;
            if (!e.item.isCanTouch) {
                return;
            }
            // 每个item点击触发
            this.addGeneral(e.item.generalId);
        };
        /**
         *  每个item点击触发
         */
        CommonFormationSet.prototype.addGeneral = function (generalId) {
            for (var i = 0; i < 8; i++) {
                if (this.generals[i].generalId == 0) {
                    this.generals[i].generalId = generalId;
                    if (i < 4) {
                        if (this.generals[i + 4].state == 0) {
                            this.generals[i + 4].state = 1;
                        }
                    }
                    this.refreshOverallInfo();
                    break;
                }
            }
        };
        /**
         * 点击右边上阵列表每一个item触发
         */
        CommonFormationSet.prototype.drawUI = function () {
            if (this.idType == 1) {
                for (var i = 0; i < 8; i++) {
                    var pS = this.generals[i];
                    var framePath = null;
                    var iconPath = null;
                    var hunterInfo = null;
                    var baseGeneralInfo = null;
                    if (pS.generalId != 0) {
                        framePath = zj.PlayerHunterSystem.Frame(pS.generalId); // 框
                        iconPath = zj.cachekey(zj.PlayerHunterSystem.Head(pS.generalId), this); // 头像
                        hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId); // 星星
                        baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                    }
                    if (i < 4) {
                        if (pS.generalId) {
                            this.mainstayShow(i);
                            this["imgDownFrame" + i].source = zj.cachekey(framePath, this); // 框
                            this["imgDownIcon" + i].source = zj.cachekey(iconPath, this); // 头像 
                            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + i], hunterInfo.star, hunterInfo.awakePassive.level); // 星星
                            this["imgDownNum" + i].text = hunterInfo.level.toString(); // 数量
                        }
                        else {
                            this.commandingGeneral(i);
                        }
                    }
                    else {
                        if (pS.generalId) {
                            this.lieutenantShow(i);
                            this["imgDownFrame" + i].source = zj.cachekey(framePath, this); // 框
                            this["imgUpIcon" + i].source = zj.cachekey(iconPath, this); // 头像
                            this["imgUpNum" + i].text = hunterInfo.level.toString(); // 数量
                            this["imgUpLock" + i].visible = false; // 锁头
                            this["imgUpYuan" + i].visible = false; // 援助
                        }
                        else {
                            if (pS.state == 0) {
                                this.lieutenant(i);
                            }
                            else {
                                this.lieutenantAid(i);
                            }
                        }
                    }
                }
            }
            else if (this.idType == 2) {
                for (var i = 0; i < 8; i++) {
                    var pS = this.generals[i];
                    var framePath = null;
                    var iconPath = null;
                    var hunterInfo = null;
                    var baseGeneralInfo = null;
                    if (pS.generalId != 0) {
                        framePath = zj.PlayerHunterSystem.Frame(pS.generalId); // 框
                        iconPath = zj.cachekey(zj.PlayerHunterSystem.Head(pS.generalId), this); // 头像
                        hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId); // 星星
                        baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                    }
                    if (i < 4) {
                        if (pS.generalId) {
                            this.mainstayShow(i + 8);
                            this["imgDownFrame" + (i + 8)].source = zj.cachekey(framePath, this); // 框
                            this["imgDownIcon" + (i + 8)].source = zj.cachekey(iconPath, this); // 头像 
                            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 8)], hunterInfo.star, hunterInfo.awakePassive.level); // 星星
                            this["imgDownNum" + (i + 8)].text = hunterInfo.level.toString(); // 数量
                        }
                        else {
                            this.commandingGeneral(i + 8);
                        }
                    }
                    else {
                        if (pS.generalId) {
                            this.lieutenantShow(i + 8);
                            this["imgDownFrame" + (i + 8)].source = zj.cachekey(framePath, this); // 框
                            this["imgUpIcon" + (i + 8)].source = zj.cachekey(iconPath, this); // 头像
                            this["imgUpNum" + (i + 8)].text = hunterInfo.level.toString(); // 数量
                            this["imgUpLock" + (i + 8)].visible = false; // 锁头
                            this["imgUpYuan" + (i + 8)].visible = false; // 援助
                        }
                        else {
                            if (pS.state == 0) {
                                this.lieutenant(i + 8);
                            }
                            else {
                                this.lieutenantAid(i + 8);
                            }
                        }
                    }
                }
            }
            else if (this.idType == 3) {
                for (var i = 0; i < 8; i++) {
                    var pS = this.generals[i];
                    var framePath = null;
                    var iconPath = null;
                    var hunterInfo = null;
                    var baseGeneralInfo = null;
                    if (pS.generalId != 0) {
                        framePath = zj.PlayerHunterSystem.Frame(pS.generalId); // 框
                        iconPath = zj.cachekey(zj.PlayerHunterSystem.Head(pS.generalId), this); // 头像
                        hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId); // 星星
                        baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                    }
                    if (i < 4) {
                        if (pS.generalId) {
                            this.mainstayShow(i + 16);
                            this["imgDownFrame" + (i + 16)].source = zj.cachekey(framePath, this); // 框
                            this["imgDownIcon" + (i + 16)].source = zj.cachekey(iconPath, this); // 头像 
                            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 16)], hunterInfo.star, hunterInfo.awakePassive.level); // 星星
                            this["imgDownNum" + (i + 16)].text = hunterInfo.level.toString(); // 数量
                        }
                        else {
                            this.commandingGeneral(i + 16);
                        }
                    }
                    else {
                        if (pS.generalId) {
                            this.lieutenantShow(i + 16);
                            this["imgDownFrame" + (i + 16)].source = zj.cachekey(framePath, this); // 框
                            this["imgUpIcon" + (i + 16)].source = zj.cachekey(iconPath, this); // 头像
                            this["imgUpNum" + (i + 16)].text = hunterInfo.level.toString(); // 数量
                            this["imgUpLock" + (i + 16)].visible = false; // 锁头
                            this["imgUpYuan" + (i + 16)].visible = false; // 援助
                        }
                        else {
                            if (pS.state == 0) {
                                this.lieutenant(i + 16);
                            }
                            else {
                                this.lieutenantAid(i + 16);
                            }
                        }
                    }
                }
            }
            else if (this.idType == 4) {
                for (var i = 0; i < 8; i++) {
                    var pS = this.generals[i];
                    var framePath = null;
                    var iconPath = null;
                    var hunterInfo = null;
                    var baseGeneralInfo = null;
                    if (pS.generalId != 0) {
                        framePath = zj.PlayerHunterSystem.Frame(pS.generalId); // 框
                        iconPath = zj.cachekey(zj.PlayerHunterSystem.Head(pS.generalId), this); // 头像
                        hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId); // 星星
                        baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                    }
                    if (i < 4) {
                        if (pS.generalId) {
                            this.mainstayShow(i + 24);
                            this["imgDownFrame" + (i + 24)].source = zj.cachekey(framePath, this); // 框
                            this["imgDownIcon" + (i + 24)].source = zj.cachekey(iconPath, this); // 头像 
                            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 24)], hunterInfo.star, hunterInfo.awakePassive.level); // 星星
                            this["imgDownNum" + (i + 24)].text = hunterInfo.level.toString(); // 数量
                        }
                        else {
                            this.commandingGeneral(i + 24);
                        }
                    }
                    else {
                        if (pS.generalId) {
                            this.lieutenantShow(i + 24);
                            this["imgDownFrame" + (i + 24)].source = zj.cachekey(framePath, this); // 框
                            this["imgUpIcon" + (i + 24)].source = zj.cachekey(iconPath, this); // 头像
                            this["imgUpNum" + (i + 24)].text = hunterInfo.level.toString(); // 数量
                            this["imgUpLock" + (i + 24)].visible = false; // 锁头
                            this["imgUpYuan" + (i + 24)].visible = false; // 援助
                        }
                        else {
                            if (pS.state == 0) {
                                this.lieutenant(i + 24);
                            }
                            else {
                                this.lieutenantAid(i + 24);
                            }
                        }
                    }
                }
            }
            else if (this.idType == 5) {
                for (var i = 0; i < 8; i++) {
                    var pS = this.generals[i];
                    var framePath = null;
                    var iconPath = null;
                    var hunterInfo = null;
                    var baseGeneralInfo = null;
                    if (pS.generalId != 0) {
                        framePath = zj.PlayerHunterSystem.Frame(pS.generalId); // 框
                        iconPath = zj.cachekey(zj.PlayerHunterSystem.Head(pS.generalId), this); // 头像
                        hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(pS.generalId); // 星星
                        baseGeneralInfo = zj.PlayerHunterSystem.Table(pS.generalId);
                    }
                    if (i < 4) {
                        if (pS.generalId) {
                            this.mainstayShow(i + 32);
                            this["imgDownFrame" + (i + 32)].source = zj.cachekey(framePath, this); // 框
                            this["imgDownIcon" + (i + 32)].source = zj.cachekey(iconPath, this); // 头像 
                            zj.Helper.SetHeroAwakenStar(this["groupDownStar" + (i + 32)], hunterInfo.star, hunterInfo.awakePassive.level); // 星星
                            this["imgDownNum" + (i + 32)].text = hunterInfo.level.toString(); // 数量
                        }
                        else {
                            this.commandingGeneral(i + 32);
                        }
                    }
                    else {
                        if (pS.generalId) {
                            this.lieutenantShow(i + 32);
                            this["imgDownFrame" + (i + 32)].source = zj.cachekey(framePath, this); // 框
                            this["imgUpIcon" + (i + 32)].source = zj.cachekey(iconPath, this); // 头像
                            this["imgUpNum" + (i + 32)].text = hunterInfo.level.toString(); // 数量
                            this["imgUpLock" + (i + 32)].visible = false; // 锁头
                            this["imgUpYuan" + (i + 32)].visible = false; // 援助
                        }
                        else {
                            if (pS.state == 0) {
                                this.lieutenant(i + 32);
                            }
                            else {
                                this.lieutenantAid(i + 32);
                            }
                        }
                    }
                }
            }
        };
        /**
         * 主将显示
         */
        CommonFormationSet.prototype.mainstayShow = function (i) {
            this["imgDownFrame" + i].visible = true; // 框
            this["imgDownIcon" + i].visible = true; // 头像 
            this["groupDownStar" + i].visible = true; // 星星 
            this["imgDownNum" + i].visible = true; // 数量
        };
        /**
         * 副将显示
         */
        CommonFormationSet.prototype.lieutenantShow = function (i) {
            this["imgDownFrame" + i].visible = true; // 框
            this["imgUpIcon" + i].visible = true; // 头像 
            this["imgUpNum" + i].visible = true; // 数量
        };
        /**
         * 编辑
         */
        CommonFormationSet.prototype.onBtnSet = function () {
            this.battleList.visible = true;
            this.imgSetSel1.visible = true;
            this.imgSet1.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
            this.btnSet.visible = false;
            this.btnColse.visible = false;
            this.btnSave.visible = true;
            this.btnCancel.visible = true;
            this.initList();
        };
        /**
         * 保存
         */
        CommonFormationSet.prototype.onBtnSave = function () {
            // 初始化
            this.compile();
            this.battleList.visible = false;
            this.btnSet.visible = true;
            this.btnColse.visible = true;
            this.btnSave.visible = false;
            this.btnCancel.visible = false;
            if (this.type == 7) {
                zj.Game.PlayerFormationSystem.SaveSquadPlan(); // 阵容方案本服保存
            }
            else if (this.type == 16) {
                zj.Game.PlayerFormationSystem.SaveCrossBeam(); // 阵容方案跨服保存
            }
            else if (this.type == 21) {
                zj.Game.PlayerFormationSystem.SaveFriendsTeams(); // 阵容方案好友单队切磋保存
            }
            else if (this.type == 22) {
                zj.Game.PlayerFormationSystem.SaveMoreTeam(); // 阵容方案好友多队切磋保存
            }
        };
        /**
         * 取消
         */
        CommonFormationSet.prototype.onBtnCancel = function () {
            var _this = this;
            zj.TipManager.ShowConfirmCancel("确定不保存本次调整吗?", function () {
                // 确定从新加载此界面 初始化
                _this.compile();
                _this.btnSet.visible = true;
                _this.btnColse.visible = true;
                _this.btnSave.visible = false;
                _this.btnCancel.visible = false;
            });
        };
        /**
         * 关闭
         */
        CommonFormationSet.prototype.onBtnColse = function () {
            this.onClose();
        };
        /**
         * 队伍1
         */
        CommonFormationSet.prototype.onBtnSelect1 = function () {
            if (this.btnSave.visible == false && this.btnCancel.visible == false) {
                this.onClose();
                if (this.type == 7) {
                    this.usingSuccessful(1, this.saveFrom);
                }
                else if (this.type == 16) {
                    this.usingSuccessful(1, this.crossBeam);
                }
                else if (this.type == 21) {
                    this.usingSuccessful(1, this.friendsTeams);
                }
                else if (this.type == 22) {
                    this.usingSuccessful(1, this.moreTeam);
                }
            }
            else {
                this.compile();
                this.imgSet1.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
                this.imgSetSel1.visible = true;
                this.hunterInfo(this.idType);
                this.idType = 1;
                this.refreshInfo(this.idType);
            }
        };
        /**
         * 队伍2
         */
        CommonFormationSet.prototype.onBtnSelect2 = function () {
            if (this.btnSave.visible == false && this.btnCancel.visible == false) {
                this.onClose();
                if (this.type == 7) {
                    this.usingSuccessful(2, this.saveFrom);
                }
                else if (this.type == 16) {
                    this.usingSuccessful(2, this.crossBeam);
                }
                else if (this.type == 21) {
                    this.usingSuccessful(2, this.friendsTeams);
                }
                else if (this.type == 22) {
                    this.usingSuccessful(2, this.moreTeam);
                }
            }
            else {
                this.compile();
                this.imgSet2.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
                this.imgSetSel2.visible = true;
                this.hunterInfo(this.idType);
                this.idType = 2;
                this.refreshInfo(this.idType);
            }
        };
        /**
         * 队伍3
         */
        CommonFormationSet.prototype.onBtnSelect3 = function () {
            if (this.btnSave.visible == false && this.btnCancel.visible == false) {
                this.onClose();
                if (this.type == 7) {
                    this.usingSuccessful(3, this.saveFrom);
                }
                else if (this.type == 16) {
                    this.usingSuccessful(3, this.crossBeam);
                }
                else if (this.type == 21) {
                    this.usingSuccessful(3, this.friendsTeams);
                }
                else if (this.type == 22) {
                    this.usingSuccessful(3, this.moreTeam);
                }
            }
            else {
                this.compile();
                this.imgSet3.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
                this.imgSetSel3.visible = true;
                this.hunterInfo(this.idType);
                this.idType = 3;
                this.refreshInfo(this.idType);
            }
        };
        /**
         * 队伍4
         */
        CommonFormationSet.prototype.onBtnSelect4 = function () {
            if (this.btnSave.visible == false && this.btnCancel.visible == false) {
                this.onClose();
                if (this.type == 7) {
                    this.usingSuccessful(4, this.saveFrom);
                }
                else if (this.type == 16) {
                    this.usingSuccessful(4, this.crossBeam);
                }
                else if (this.type == 21) {
                    this.usingSuccessful(4, this.friendsTeams);
                }
                else if (this.type == 22) {
                    this.usingSuccessful(4, this.moreTeam);
                }
            }
            else {
                this.compile();
                this.imgSet4.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
                this.imgSetSel4.visible = true;
                this.hunterInfo(this.idType);
                this.idType = 4;
                this.refreshInfo(this.idType);
            }
        };
        /**
         * 队伍5
         */
        CommonFormationSet.prototype.onBtnSelect5 = function () {
            if (this.btnSave.visible == false && this.btnCancel.visible == false) {
                this.onClose();
                if (this.type == 7) {
                    this.usingSuccessful(5, this.saveFrom);
                }
                else if (this.type == 16) {
                    this.usingSuccessful(5, this.crossBeam);
                }
                else if (this.type == 21) {
                    this.usingSuccessful(5, this.friendsTeams);
                }
                else if (this.type == 22) {
                    this.usingSuccessful(5, this.moreTeam);
                }
            }
            else {
                this.compile();
                this.imgSet5.source = zj.cachekey("ui_arena_plan_WordsSeting_png", this);
                this.imgSetSel5.visible = true;
                this.hunterInfo(this.idType);
                this.idType = 5;
                this.refreshInfo(this.idType);
            }
        };
        /**
         * 当前方案使用成功
         */
        CommonFormationSet.prototype.usingSuccessful = function (index, succeedData) {
            switch (index) {
                case 1:
                    zj.Game.EventManager.event(zj.GameEvent.USING_SUCCESSFUL, [index, succeedData[0]]);
                    break;
                case 2:
                    zj.Game.EventManager.event(zj.GameEvent.USING_SUCCESSFUL, [index, succeedData[1]]);
                    break;
                case 3:
                    zj.Game.EventManager.event(zj.GameEvent.USING_SUCCESSFUL, [index, succeedData[2]]);
                    break;
                case 4:
                    zj.Game.EventManager.event(zj.GameEvent.USING_SUCCESSFUL, [index, succeedData[3]]);
                    break;
                case 5:
                    zj.Game.EventManager.event(zj.GameEvent.USING_SUCCESSFUL, [index, succeedData[4]]);
                    break;
            }
        };
        /**
         * 所有队伍置成点击编辑
         */
        CommonFormationSet.prototype.compile = function () {
            for (var i = 1; i < 6; i++) {
                this["imgSet" + i].source = zj.cachekey("ui_arena_plan_WordsSet_png", this);
                this["imgSetSel" + i].visible = false;
            }
        };
        /**
         * 1-5队伍数据存储
         */
        CommonFormationSet.prototype.hunterInfo = function (id) {
            if (id == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (id == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (id == 3) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            else if (id == 4) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 24] = this.generals[i];
                }
            }
            else if (id == 5) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 32] = this.generals[i];
                }
            }
            // 本地缓存
            if (this.type == 7) {
                this.saveFrom[id - 1].formationType = this.type;
                for (var i = 0; i < this.generals.length; i++) {
                    if (i < 4) {
                        this.saveFrom[id - 1].generals[i] = this.generals[i].generalId;
                    }
                    else {
                        this.saveFrom[id - 1].supports[i - 4] = this.generals[i].generalId;
                    }
                }
            }
            else if (this.type == 16) {
                this.crossBeam[id - 1].formationType = this.type;
                for (var i = 0; i < this.generals.length; i++) {
                    if (i < 4) {
                        this.crossBeam[id - 1].generals[i] = this.generals[i].generalId;
                    }
                    else {
                        this.crossBeam[id - 1].supports[i - 4] = this.generals[i].generalId;
                    }
                }
            }
            else if (this.type == 21) {
                this.friendsTeams[id - 1].formationType = this.type;
                for (var i = 0; i < this.generals.length; i++) {
                    if (i < 4) {
                        this.friendsTeams[id - 1].generals[i] = this.generals[i].generalId;
                    }
                    else {
                        this.friendsTeams[id - 1].supports[i - 4] = this.generals[i].generalId;
                    }
                }
            }
            else if (this.type == 22) {
                this.moreTeam[id - 1].formationType = this.type;
                for (var i = 0; i < this.generals.length; i++) {
                    if (i < 4) {
                        this.moreTeam[id - 1].generals[i] = this.generals[i].generalId;
                    }
                    else {
                        this.moreTeam[id - 1].supports[i - 4] = this.generals[i].generalId;
                    }
                }
            }
        };
        /**
         * 1-5队伍初始化
         */
        CommonFormationSet.prototype.refreshInfo = function (id) {
            this.generals = [];
            if (this.type == 7) {
                for (var i = 0; i < 8; i++) {
                    var posState = new zj.PosState();
                    if (i < 4) {
                        if (this.saveFrom[id - 1].generals[i] != null && this.saveFrom[id - 1].generals[i] != 0) {
                            posState.generalId = this.saveFrom[id - 1].generals[i];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                    else {
                        if (this.saveFrom[id - 1].supports[i - 4] != null && this.saveFrom[id - 1].generals[i - 4] != 0) {
                            posState.generalId = this.saveFrom[id - 1].supports[i - 4];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                }
            }
            else if (this.type == 16) {
                for (var i = 0; i < 8; i++) {
                    var posState = new zj.PosState();
                    if (i < 4) {
                        if (this.crossBeam[id - 1].generals[i] != null && this.crossBeam[id - 1].generals[i] != 0) {
                            posState.generalId = this.crossBeam[id - 1].generals[i];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                    else {
                        if (this.crossBeam[id - 1].supports[i - 4] != null && this.crossBeam[id - 1].generals[i - 4] != 0) {
                            posState.generalId = this.crossBeam[id - 1].supports[i - 4];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                }
            }
            else if (this.type == 21) {
                for (var i = 0; i < 8; i++) {
                    var posState = new zj.PosState();
                    if (i < 4) {
                        if (this.friendsTeams[id - 1].generals[i] != null && this.friendsTeams[id - 1].generals[i] != 0) {
                            posState.generalId = this.friendsTeams[id - 1].generals[i];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                    else {
                        if (this.friendsTeams[id - 1].supports[i - 4] != null && this.friendsTeams[id - 1].generals[i - 4] != 0) {
                            posState.generalId = this.friendsTeams[id - 1].supports[i - 4];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                }
            }
            else if (this.type == 22) {
                for (var i = 0; i < 8; i++) {
                    var posState = new zj.PosState();
                    if (i < 4) {
                        if (this.moreTeam[id - 1].generals[i] != null && this.moreTeam[id - 1].generals[i] != 0) {
                            posState.generalId = this.moreTeam[id - 1].generals[i];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                    else {
                        if (this.moreTeam[id - 1].supports[i - 4] != null && this.moreTeam[id - 1].generals[i - 4] != 0) {
                            posState.generalId = this.moreTeam[id - 1].supports[i - 4];
                            posState.state = 1;
                        }
                        this.generals.push(posState);
                    }
                }
            }
            this.refreshOverallInfo();
        };
        /**
         * 刷新全局数据
         */
        CommonFormationSet.prototype.refreshOverallInfo = function () {
            this.drawUI();
            this.hunterInfo(this.idType);
            this.initList();
        };
        /**
         * 界面关闭
         */
        CommonFormationSet.prototype.onClose = function () {
            this.cancelEvent();
            this.close();
        };
        /**
         * 注销事件
         */
        CommonFormationSet.prototype.cancelEvent = function () {
            zj.Game.EventManager.off(zj.GameEvent.DRAG_LOOSEN, this.ondragLoosen, this);
        };
        /**
         * 1-5队伍item数据
         */
        CommonFormationSet.prototype.getSelectGenIds = function () {
            if (this.idType == 1) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i] = this.generals[i];
                }
            }
            else if (this.idType == 2) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 8] = this.generals[i];
                }
            }
            else if (this.idType == 3) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 16] = this.generals[i];
                }
            }
            else if (this.idType == 4) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 24] = this.generals[i];
                }
            }
            else if (this.idType == 5) {
                for (var i = 0; i < 8; i++) {
                    this.generalss[i + 32] = this.generals[i];
                }
            }
            return this.generalss;
        };
        return CommonFormationSet;
    }(zj.Dialog));
    zj.CommonFormationSet = CommonFormationSet;
    __reflect(CommonFormationSet.prototype, "zj.CommonFormationSet");
})(zj || (zj = {}));
//# sourceMappingURL=CommonFormationSet.js.map