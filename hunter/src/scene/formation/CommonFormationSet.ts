namespace zj {
/**
 * 阵容方案
 */
export class CommonFormationSet extends Dialog {
	private btnSelect1: eui.Group;
	private imgSet1: eui.Image;
	private imgSetSel1: eui.Image;
	private listMine1: eui.List;
	private btnSelect2: eui.Group;
	private imgSet2: eui.Image;
	private imgSetSel2: eui.Image;
	private listMine2: eui.List;
	private btnSelect3: eui.Group;
	private imgSet3: eui.Image;
	private imgSetSel3: eui.Image;
	private listMine3: eui.List;
	private btnSelect4: eui.Group;
	private imgSet4: eui.Image;
	private imgSetSel4: eui.Image;
	private listMine4: eui.List;
	private btnSelect5: eui.Group;
	private imgSet5: eui.Image;
	private imgSetSel5: eui.Image;
	private listMine5: eui.List;
	private btnSet: eui.Button;
	private btnSave: eui.Button;
	private btnCancel: eui.Button;
	private btnColse: eui.Button;

	// 底部list
	private listGeneral: eui.List;
	// 底部数据data
	private listBottomData: eui.ArrayCollection = new eui.ArrayCollection();
	private battleList: eui.Group;// 选择上阵猎人

	// 每组武将列表
	public generals: Array<PosState> = [];
	// 所有队伍武将列表
	public generalss: Array<PosState> = [];
	// 当前选中的队伍
	public idType: number = 1;
	public dataType: number = 1;

	// 拖动图片
	public moveImg = new eui.Image;
	public moveGId = null;
	public moveIndex = 0;

	// 阵容方案--本服
	public saveFrom: Array<message.FormationInfo> = Game.PlayerFormationSystem.squadPlan;
	// 阵容方案-- 跨服
	public crossBeam: Array<message.FormationInfo> = Game.PlayerFormationSystem.crossBeam;
	// 阵容方案-- 好友单队切磋
	public friendsTeams: Array<message.FormationInfo> = Game.PlayerFormationSystem.friendsTeams;
	// 阵容方案-- 好友多队切磋
	public moreTeam: Array<message.FormationInfo> = Game.PlayerFormationSystem.moreTeam;

	// 副本类型
	public type: number = Game.PlayerInstanceSystem.curInstanceType;

	// 主将保存
	public commanderSave: number = 0;
	// 副将保存
	public mainstaySave: number = 0;

	public constructor() {
		super();
		this.skinName = "resource/skins/formation/CommonFormationSetSkin.exml";
		this.initData();// 初始化数据
		this.registerEvents();// 监听事件
		this.initializer();// 初始化上阵
	}

	/**
	 * 初始化数据
	 */
	public initData() {
		for (let i = 0; i < 8; i++) {
			if (i > 3) {// 副将
				this.lieutenant(i);
			} else {// 主将
				this.commandingGeneral(i);
			}
		}
		for (let i = 8; i < 16; i++) {
			if (i > 11) {
				this.lieutenant(i);
			} else {
				this.commandingGeneral(i);
			}
		}
		for (let i = 16; i < 24; i++) {
			if (i > 19) {
				this.lieutenant(i);;
			} else {
				this.commandingGeneral(i);
			}
		}
		for (let i = 24; i < 32; i++) {
			if (i > 27) {
				this.lieutenant(i);
			} else {
				this.commandingGeneral(i);
			}
		}
		for (let i = 32; i < 40; i++) {
			if (i > 35) {
				this.lieutenant(i);
			} else {
				this.commandingGeneral(i);
			}
		}
		for (let i = 0; i < 8; i++) {
			let posState = new PosState();
			this.generals.push(posState);
		}
		for (let i = 0; i < 40; i++) {
			let posState = new PosState();
			this.generalss.push(posState);
		}
	}

	/**
	 * 副将--锁头状态
	 */
	public lieutenant(i) {
		this[`imgUpIcon${i}`].visible = false;// 头像
		this[`imgUpYuan${i}`].visible = false;// 辅助
		this[`imgUpLock${i}`].visible = true;// 锁头
		this[`groupDownStar${i}`].visible = false;// 星星
		this[`imgUpNum${i}`].visible = false;// 数量	
	}

	/**
	 * 副将--援助状态
	 */
	public lieutenantAid(i) {
		this[`imgUpIcon${i}`].visible = false;// 头像
		this[`imgUpLock${i}`].visible = false;// 锁头
		this[`imgUpYuan${i}`].visible = true;// 辅助
		this[`groupDownStar${i}`].visible = false;// 星星
		this[`imgUpNum${i}`].visible = false;// 数量	
	}

	/**
	 * 主将
	 */
	public commandingGeneral(i) {
		this[`imgDownIcon${i}`].visible = false;// 头像
		this[`imgDownFrame${i}`].source = cachekey("ui_frame_FrameHunterGreen1_png", this);// 框	
		this[`groupDownStar${i}`].visible = false;// 星星
		this[`imgDownNum${i}`].visible = false;// 数量	
	}

	/**
	 * 监听事件
	 */
	public registerEvents() {
		this.btnSave.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSave, this);// 保存
		this.btnSet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSet, this);// 编辑		
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnCancel, this);// 取消
		this.btnColse.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnColse, this);// 关闭

		this.btnSelect1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect1, this);// 队伍1
		this.btnSelect2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect2, this);// 队伍2
		this.btnSelect3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect3, this);// 队伍3
		this.btnSelect4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect4, this);// 队伍4
		this.btnSelect5.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnSelect5, this);// 队伍5

		this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);// 拖动list上阵猎人图片
		Game.EventManager.on(GameEvent.DRAG_LOOSEN, this.ondragLoosen, this);// 拖动图片松开时触发
		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);// 在舞台上拖动移动	
		this.teamClick();//1-5队伍点击

		// list列表猎人拖动数据
		Game.EventManager.on(GameEvent.MOUSE_BEGIN, (e) => {
			let objectData = e.data;
			if (objectData.generalId != 0) {
				this.moveImg.width = 95;
				this.moveImg.height = 93;
				this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
				this.moveImg.visible = false;
				this.moveImg.x = e.stageX - 95 / 2;
				this.moveImg.y = e.stageY - 93 / 2;
				this.moveGId = objectData.generalId;
				this.moveIndex = objectData.index;
			}
		}, this);
		this.addChild(this.moveImg);
	}

	/**
	 * 1-5队伍点击
	 */
	public teamClick() {
		for (let i = 0; i < 8; i++) {// 第1队点击
			this[`groupPos${i}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
				Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				this.initList();
			}, this);
			this[`groupPos${i}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				if (i < 4) {
					this.generals[i].generalId = 0;
					this.generals[i + 4].generalId = 0;
					this.generals[i + 4].state = 0
				} else {
					this.generals[i].generalId = 0;
				}
				this.refreshOverallInfo();
			}, this);
		}
		for (let i = 0; i < 8; i++) {// 第2队点击
			this[`groupPos${i + 8}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
				Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				this.initList();
			}, this);
			this[`groupPos${i + 8}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				if (i < 4) {
					this.generals[i].generalId = 0;
					this.generals[i + 4].generalId = 0;
					this.generals[i + 4].state = 0
				} else {
					this.generals[i].generalId = 0;
				}
				this.refreshOverallInfo();
			}, this);
		}
		for (let i = 0; i < 8; i++) {// 第3队点击
			this[`groupPos${i + 16}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
				Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				this.initList();
			}, this);
			this[`groupPos${i + 16}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				if (i < 4) {
					this.generals[i].generalId = 0;
					this.generals[i + 4].generalId = 0;
					this.generals[i + 4].state = 0
				} else {
					this.generals[i].generalId = 0;
				}
				this.refreshOverallInfo();
			}, this);
		}
		for (let i = 0; i < 8; i++) {// 第4队点击
			this[`groupPos${i + 24}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
				Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				this.initList();
			}, this);
			this[`groupPos${i + 24}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				if (i < 4) {
					this.generals[i].generalId = 0;
					this.generals[i + 4].generalId = 0;
					this.generals[i + 4].state = 0
				} else {
					this.generals[i].generalId = 0;
				}
				this.refreshOverallInfo();
			}, this);
		}
		for (let i = 0; i < 8; i++) {	// 第5队点击
			this[`groupPos${i + 32}`].addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
				Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.generals[i].generalId, index: i });
				this.initList();
			}, this);
			this[`groupPos${i + 32}`].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
				if (i < 4) {
					this.generals[i].generalId = 0;
					this.generals[i + 4].generalId = 0;
					this.generals[i + 4].state = 0
				} else {
					this.generals[i].generalId = 0;
				}
				this.refreshOverallInfo();
			}, this);
		}
	}

	/**
	 * 主将显示
	 */
	public commanderReveal(i) {
		this[`imgDownIcon${i}`].visible = true;
		this[`groupDownStar${i}`].visible = true;
		this[`imgDownNum${i}`].visible = true;
		this[`imgDownFrame${i}`].source = cachekey(PlayerHunterSystem.Frame(this.commanderSave), this);// 品质框
		this[`imgDownIcon${i}`].source = cachekey(cachekey(PlayerHunterSystem.Head(this.commanderSave), this), this);// 1-4号主将位置
		Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], Game.PlayerHunterSystem.queryHunter(this.commanderSave).star,
			Game.PlayerHunterSystem.queryHunter(this.commanderSave).awakePassive.level);// 几星武将
		this[`imgDownNum${i}`].text = Game.PlayerHunterSystem.queryHunter(this.commanderSave).level.toString();// 上阵数量  
	}
	/**
	 * 主将隐藏
	 */
	public commanderConceal(i) {
		this[`imgDownIcon${i}`].visible = false;
		this[`groupDownStar${i}`].visible = false;
		this[`imgDownNum${i}`].visible = false;
	}

	/**
	 * 副将显示
	 */
	public mainstayReveal(i) {
		this[`imgUpIcon${i}`].visible = true;
		this[`groupDownStar${i}`].visible = true;
		this[`imgUpNum${i}`].visible = true;
		this[`imgUpLock${i}`].visible = false;
		this[`imgUpYuan${i}`].visible = false;
		this[`imgDownFrame${i}`].source = cachekey(PlayerHunterSystem.Frame(this.mainstaySave), this);// 品质框
		this[`imgUpIcon${i}`].source = cachekey(PlayerHunterSystem.Head(this.mainstaySave), this);// 1-4号主将位置
		Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], Game.PlayerHunterSystem.queryHunter(this.mainstaySave).star,
			Game.PlayerHunterSystem.queryHunter(this.mainstaySave).awakePassive.level);// 几星武将
		this[`imgUpNum${i}`].text = Game.PlayerHunterSystem.queryHunter(this.mainstaySave).level.toString();// 上阵数量 
	}

	public circulationInfo() {
		for (let i = 0; i < 8; i++) {
			this.generals[i].state = 0;
		}
	}

	/**
	 * 1 2 3 4 5队伍主将本地加载
	 */
	public troopsGenerals(num, i) {
		if (this.type == 7) {
			this.saveFrom[num].formationType = 7;
			this.commanderSave = this.saveFrom[num].generals[i];
		} else if (this.type == 16) {
			this.crossBeam[num].formationType = 16;
			this.commanderSave = this.crossBeam[num].generals[i];
		} else if (this.type == 21) {
			this.friendsTeams[num].formationType = 21;
			this.commanderSave = this.friendsTeams[num].generals[i];
		} else if (this.type == 22) {
			this.moreTeam[num].formationType = 22;
			this.commanderSave = this.moreTeam[num].generals[i];
		}
	}

	/**
	 * 1 2 3 4 5队伍副将本地加载
	 */
	public troopsmainstay(num, i) {
		if (this.type == 7) {
			this.saveFrom[num].formationType = 7;
			this.mainstaySave = this.saveFrom[num].supports[i - 4];
		} else if (this.type == 16) {
			this.crossBeam[num].formationType = 16;
			this.mainstaySave = this.crossBeam[num].supports[i - 4];
		} else if (this.type == 21) {
			this.friendsTeams[num].formationType = 21;
			this.mainstaySave = this.friendsTeams[num].supports[i - 4];
		} else if (this.type == 22) {
			this.moreTeam[num].formationType = 22;
			this.commanderSave = this.moreTeam[num].supports[i - 4];
		}
	}

	/**
 * 初始化上阵
 */
	public initializer() {
		for (let i = 0; i < 8; i++) {// 第1队
			let num = 0;
			if (i < 4) {
				this.troopsGenerals(num, i);
				this.generals[i].generalId = this.commanderSave;
				if (this.commanderSave == 0) {
					this.commanderConceal(i);// 主将隐藏 	
					this.generals[i + 4].state = 0;
				} else {
					if (Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
						this.generals[i].generalId = 0;
						this.commanderSave = 0;
						this.commanderConceal(i);// 主将隐藏 	
						this.generals[i + 4].state = 0;
					} else {
						this.commanderReveal(i);// 主将显示	
						this.generals[i + 4].state = 1;
					}
				}
			} else {
				this.troopsmainstay(num, i);
				this.generals[i].generalId = this.mainstaySave;
				if (this.mainstaySave == 0) {
					if (this.generals[i].state == 1) {
						this[`imgUpLock${i}`].visible = false;
						this[`imgUpYuan${i}`].visible = true;
					} else {
						this[`imgUpLock${i}`].visible = true;
						this[`imgUpYuan${i}`].visible = false;
					}
				} else {
					this.mainstayReveal(i);
				}
			}
		}
		this.circulationInfo();

		for (let i = 0; i < 8; i++) {// 第2队
			let num = 1;
			if (i < 4) {
				this.troopsGenerals(num, i);
				this.generals[i].generalId = this.commanderSave;
				if (this.commanderSave == 0) {
					this.commanderConceal(i + 8);// 主将隐藏 
					this.generals[i + 4].state = 0;
				} else {
					if (Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
						this.generals[i].generalId = 0;
						this.commanderSave = 0;
						this.commanderConceal(i + 8);// 主将隐藏 	
						this.generals[i + 4].state = 0;
					} else {
						this.commanderReveal(i + 8);// 主将显示
						this.generals[i + 4].state = 1;
					}
				}
			} else {
				this.troopsmainstay(num, i);
				this.generals[i].generalId = this.mainstaySave;
				if (this.mainstaySave == 0) {
					if (this.generals[i].state == 1) {
						this[`imgUpLock${i + 8}`].visible = false;
						this[`imgUpYuan${i + 8}`].visible = true;
					} else {
						this[`imgUpLock${i + 8}`].visible = true;
						this[`imgUpYuan${i + 8}`].visible = false;
					}
				} else {
					this.mainstayReveal(i + 8);
				}
			}
		}
		this.circulationInfo();

		for (let i = 0; i < 8; i++) {// 第3队
			let num = 2;
			if (i < 4) {
				this.troopsGenerals(num, i);
				this.generals[i].generalId = this.commanderSave;
				if (this.commanderSave == 0) {
					this.commanderConceal(i + 16);// 主将隐藏 
					this.generals[i + 4].state = 0;
				} else {
					if (Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
						this.generals[i].generalId = 0;
						this.commanderSave = 0;
						this.commanderConceal(i + 16);// 主将隐藏 	
						this.generals[i + 4].state = 0;
					} else {
						this.commanderReveal(i + 16);// 主将显示
						this.generals[i + 4].state = 1;
					}
				}
			} else {
				this.troopsmainstay(num, i);
				this.generals[i].generalId = this.mainstaySave;
				if (this.mainstaySave == 0) {
					if (this.generals[i].state == 1) {
						this[`imgUpLock${i + 16}`].visible = false;
						this[`imgUpYuan${i + 16}`].visible = true;
					} else {
						this[`imgUpLock${i + 16}`].visible = true;
						this[`imgUpYuan${i + 16}`].visible = false;
					}
				} else {
					this.mainstayReveal(i + 16);
				}
			}
		}
		this.circulationInfo();

		for (let i = 0; i < 8; i++) {// 第4队
			let num = 3;
			if (i < 4) {
				this.troopsGenerals(num, i);
				this.generals[i].generalId = this.commanderSave;
				if (this.commanderSave == 0) {
					this.commanderConceal(i + 24);// 主将隐藏 
					this.generals[i + 4].state = 0;
				} else {
					if (Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
						this.generals[i].generalId = 0;
						this.commanderSave = 0;
						this.commanderConceal(i + 24);// 主将隐藏 	
						this.generals[i + 4].state = 0;
					} else {
						this.commanderReveal(i + 24);// 主将显示
						this.generals[i + 4].state = 1;
					}
				}
			} else {
				this.troopsmainstay(num, i);
				this.generals[i].generalId = this.mainstaySave;
				if (this.mainstaySave == 0) {
					if (this.generals[i].state == 1) {
						this[`imgUpLock${i + 24}`].visible = false;
						this[`imgUpYuan${i + 24}`].visible = true;
					} else {
						this[`imgUpLock${i + 24}`].visible = true;
						this[`imgUpYuan${i + 24}`].visible = false;
					}
				} else {
					this.mainstayReveal(i + 24);
				}
			}
		}
		this.circulationInfo();

		for (let i = 0; i < 8; i++) {// 第5队
			let num = 4;
			if (i < 4) {
				this.troopsGenerals(num, i);
				this.generals[i].generalId = this.commanderSave;
				if (this.commanderSave == 0) {
					this.commanderConceal(i + 32);// 主将隐藏 
					this.generals[i + 4].state = 0;
				} else {
					if (Game.PlayerHunterSystem.queryHunter(this.commanderSave) == null) {
						this.generals[i].generalId = 0;
						this.commanderSave = 0;
						this.commanderConceal(i + 32);// 主将隐藏 	
						this.generals[i + 4].state = 0;
					} else {
						this.commanderReveal(i + 32);// 主将显示
						this.generals[i + 4].state = 1;
					}
				}
			} else {
				this.troopsmainstay(num, i);
				this.generals[i].generalId = this.mainstaySave;
				if (this.mainstaySave == 0) {
					if (this.generals[i].state == 1) {
						this[`imgUpLock${i + 32}`].visible = false;
						this[`imgUpYuan${i + 32}`].visible = true;
					} else {
						this[`imgUpLock${i + 32}`].visible = true;
						this[`imgUpYuan${i + 32}`].visible = false;
					}
				} else {
					this.mainstayReveal(i + 32);
				}
			}
		}
	}

	/**
	 * 在舞台上拖动移动
	 */
	public mouseMove(e: egret.TouchEvent) {
		this.moveImg.visible = false;
		this.moveImg.x = e.stageX - 95 / 2;
		this.moveImg.y = e.stageY - 93 / 2;

		let listWorld = this.battleList.localToGlobal(this[`slide`].x, this[`slide`].y);
		listWorld.x -= Game.UIManager.x;
		let listRect = new egret.Rectangle(listWorld.x, listWorld.y, this[`listGeneral`].width, this[`listGeneral`].height);

		if (listRect.contains(this.moveImg.x, this.moveImg.y) == false) {
			this.moveImg.visible = true;
		}
	}

	/**
	 * 拖动list上阵猎人图片
	 */
	public mouseUp(e: egret.TouchEvent) {
		Game.EventManager.event(GameEvent.DRAG_LOOSEN, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex });
		this.moveImg.visible = false;
		this.moveImg.source = "";
		this.initList();
	}

	/**
     * 获取坐标
     */
	public onAddToStage(idType, i) {
		let worldPointUp = this[`btnSelect${idType}`].localToGlobal(this[`groupPos${i}`].x, this[`groupPos${i}`].y);
		worldPointUp.x -= Game.UIManager.x;
		this[`groupPosRect${i}`] = new egret.Rectangle(worldPointUp.x, worldPointUp.y, this[`groupPos${i}`].width, this[`groupPos${i}`].height);
	}

	/**
	 * 拖动图片松开时触发
	 */
	public ondragLoosen(e) {
		for (let i = 0; i < 8; i++) {
			if (this.idType == 1) {
				this.onAddToStage(this.idType, i);
			} else if (this.idType == 2) {
				this.onAddToStage(this.idType, i + 8);
			} else if (this.idType == 3) {
				this.onAddToStage(this.idType, i + 16);
			} else if (this.idType == 4) {
				this.onAddToStage(this.idType, i + 24);
			} else if (this.idType == 5) {
				this.onAddToStage(this.idType, i + 32);
			}
		}
		let objectData = e.data;
		for (let i = 0; i < 8; i++) {
			if (this.idType == 1) {
				if (this[`groupPosRect${i}`].contains(objectData.x, objectData.y)) {
					this.teamDrag(objectData, i);
				}
			} else if (this.idType == 2) {
				if (this[`groupPosRect${i + 8}`].contains(objectData.x, objectData.y)) {
					this.teamDrag(objectData, i);
				}
			} else if (this.idType == 3) {
				if (this[`groupPosRect${i + 16}`].contains(objectData.x, objectData.y)) {
					this.teamDrag(objectData, i);
				}
			} else if (this.idType == 4) {
				if (this[`groupPosRect${i + 24}`].contains(objectData.x, objectData.y)) {
					this.teamDrag(objectData, i);
				}
			} else if (this.idType == 5) {
				if (this[`groupPosRect${i + 32}`].contains(objectData.x, objectData.y)) {
					this.teamDrag(objectData, i);
				}
			}
		}
	}

	/**
	 * 队伍拖动
	 */
	public teamDrag(objectData, i) {
		let pTarget = this.generals[i];
		if (i < 4) {// 主将
			if (objectData.index == -1) {
				pTarget.generalId = objectData.generalId;
			} else {
				if (objectData.index < 4) {
					[pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
					[this.generals[i + 4].generalId, this.generals[objectData.index + 4].generalId] = [this.generals[objectData.index + 4].generalId, this.generals[i + 4].generalId];
					[this.generals[i + 4].state, this.generals[objectData.index + 4].state] = [this.generals[objectData.index + 4].state, this.generals[i + 4].state];
				} else {
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
				} else {
					[pTarget.generalId, this.generals[objectData.index].generalId] = [this.generals[objectData.index].generalId, pTarget.generalId];
					if (objectData.index < 4) {
						if (this.generals[objectData.index].generalId == 0) {
							this.generals[objectData.index + 4].generalId = 0;
							this.generals[objectData.index + 4].state = 0;
						}
					} else {
						[pTarget.state, this.generals[objectData.index].state] = [this.generals[objectData.index].state, pTarget.state];
					}
				}
			}
		}
		this.refreshOverallInfo();
	}

	/**
	 * 初始化上阵猎人
	 */
	public initList() {
		let hunterList = PlayerHunterSystem.GetHunterList();
		this.listBottomData.removeAll();

		for (let i = 0; i < hunterList.length; i++) {
			const v = hunterList[i];
			let data = new FormatChooseHeroData();
			data.father = this;
			data.generalId = v;
			data.isCanTouch = true;
			this.listBottomData.addItem(data);
		}
		// 列表数据源--dataProvider
		this.listGeneral.dataProvider = this.listBottomData;
		// 每个item显示--item数据类需要继承eui.ItemRenderer接口
		this.listGeneral.itemRenderer = FormatChooseHeroItem;
		// 每个item点击触发
		this.listGeneral.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListHerosTap, this);
		// 每个item是否选中状态
		this.listGeneral.allowMultipleSelection = true;
	}

	/**
	* list中每个点击触发--eui.ItemTapEvent
	*/
	public onListHerosTap(e: eui.ItemTapEvent) {
		// 获取每一个item索引
		let index = e.itemIndex;
		let point = this.listGeneral.localToGlobal(e.itemRenderer.x, e.itemRenderer.y);
		point.x -= Game.UIManager.x;
		this.moveImg.x = point.x;
		this.moveImg.y = point.y;
		if (!e.item.isCanTouch) {
			return;
		}
		// 每个item点击触发
		this.addGeneral(e.item.generalId);
	}

	/**
	 *  每个item点击触发
	 */
	public addGeneral(generalId) {
		for (let i = 0; i < 8; i++) {
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
	}

	/**
	 * 点击右边上阵列表每一个item触发
	 */
	public drawUI() {
		if (this.idType == 1) {// 队伍1	
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];
				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);// 框
					iconPath = cachekey(PlayerHunterSystem.Head(pS.generalId), this);// 头像
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);// 星星
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				if (i < 4) {
					if (pS.generalId) {
						this.mainstayShow(i);
						this[`imgDownFrame${i}`].source = cachekey(framePath, this);// 框
						this[`imgDownIcon${i}`].source = cachekey(iconPath, this);// 头像 
						Helper.SetHeroAwakenStar(this[`groupDownStar${i}`], hunterInfo.star, hunterInfo.awakePassive.level);// 星星
						this[`imgDownNum${i}`].text = hunterInfo.level.toString();// 数量
					} else {
						this.commandingGeneral(i);
					}
				}
				else {
					if (pS.generalId) {
						this.lieutenantShow(i);
						this[`imgDownFrame${i}`].source = cachekey(framePath, this);// 框
						this[`imgUpIcon${i}`].source = cachekey(iconPath, this);// 头像
						this[`imgUpNum${i}`].text = hunterInfo.level.toString();// 数量
						this[`imgUpLock${i}`].visible = false;// 锁头
						this[`imgUpYuan${i}`].visible = false;// 援助
					}
					else {
						if (pS.state == 0) {
							this.lieutenant(i);
						} else {
							this.lieutenantAid(i);
						}
					}
				}
			}
		} else if (this.idType == 2) {// 队伍2
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];
				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);// 框
					iconPath = cachekey(PlayerHunterSystem.Head(pS.generalId), this);// 头像
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);// 星星
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				if (i < 4) {
					if (pS.generalId) {
						this.mainstayShow(i + 8);
						this[`imgDownFrame${i + 8}`].source = cachekey(framePath, this);// 框
						this[`imgDownIcon${i + 8}`].source = cachekey(iconPath, this);// 头像 
						Helper.SetHeroAwakenStar(this[`groupDownStar${i + 8}`], hunterInfo.star, hunterInfo.awakePassive.level);// 星星
						this[`imgDownNum${i + 8}`].text = hunterInfo.level.toString();// 数量
					} else {
						this.commandingGeneral(i + 8);
					}
				}
				else {
					if (pS.generalId) {
						this.lieutenantShow(i + 8);
						this[`imgDownFrame${i + 8}`].source = cachekey(framePath, this);// 框
						this[`imgUpIcon${i + 8}`].source = cachekey(iconPath, this);// 头像
						this[`imgUpNum${i + 8}`].text = hunterInfo.level.toString();// 数量
						this[`imgUpLock${i + 8}`].visible = false;// 锁头
						this[`imgUpYuan${i + 8}`].visible = false;// 援助
					}
					else {
						if (pS.state == 0) {
							this.lieutenant(i + 8);
						} else {
							this.lieutenantAid(i + 8);
						}
					}
				}
			}
		} else if (this.idType == 3) {// 队伍3
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];
				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);// 框
					iconPath = cachekey(PlayerHunterSystem.Head(pS.generalId), this);// 头像
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);// 星星
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				if (i < 4) {
					if (pS.generalId) {
						this.mainstayShow(i + 16);
						this[`imgDownFrame${i + 16}`].source = cachekey(framePath, this);// 框
						this[`imgDownIcon${i + 16}`].source = cachekey(iconPath, this);// 头像 
						Helper.SetHeroAwakenStar(this[`groupDownStar${i + 16}`], hunterInfo.star, hunterInfo.awakePassive.level);// 星星
						this[`imgDownNum${i + 16}`].text = hunterInfo.level.toString();// 数量
					} else {
						this.commandingGeneral(i + 16);
					}
				}
				else {
					if (pS.generalId) {
						this.lieutenantShow(i + 16);
						this[`imgDownFrame${i + 16}`].source = cachekey(framePath, this);// 框
						this[`imgUpIcon${i + 16}`].source = cachekey(iconPath, this);// 头像
						this[`imgUpNum${i + 16}`].text = hunterInfo.level.toString();// 数量
						this[`imgUpLock${i + 16}`].visible = false;// 锁头
						this[`imgUpYuan${i + 16}`].visible = false;// 援助
					}
					else {
						if (pS.state == 0) {
							this.lieutenant(i + 16);
						} else {
							this.lieutenantAid(i + 16);
						}
					}
				}
			}
		} else if (this.idType == 4) {// 队伍4
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];
				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);// 框
					iconPath = cachekey(PlayerHunterSystem.Head(pS.generalId), this);// 头像
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);// 星星
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				if (i < 4) {
					if (pS.generalId) {
						this.mainstayShow(i + 24);
						this[`imgDownFrame${i + 24}`].source = cachekey(framePath, this);// 框
						this[`imgDownIcon${i + 24}`].source = cachekey(iconPath, this);// 头像 
						Helper.SetHeroAwakenStar(this[`groupDownStar${i + 24}`], hunterInfo.star, hunterInfo.awakePassive.level);// 星星
						this[`imgDownNum${i + 24}`].text = hunterInfo.level.toString();// 数量
					} else {
						this.commandingGeneral(i + 24);
					}
				}
				else {
					if (pS.generalId) {
						this.lieutenantShow(i + 24);
						this[`imgDownFrame${i + 24}`].source = cachekey(framePath, this);// 框
						this[`imgUpIcon${i + 24}`].source = cachekey(iconPath, this);// 头像
						this[`imgUpNum${i + 24}`].text = hunterInfo.level.toString();// 数量
						this[`imgUpLock${i + 24}`].visible = false;// 锁头
						this[`imgUpYuan${i + 24}`].visible = false;// 援助
					}
					else {
						if (pS.state == 0) {
							this.lieutenant(i + 24);
						} else {
							this.lieutenantAid(i + 24);
						}
					}
				}
			}
		} else if (this.idType == 5) {// 队伍5
			for (let i = 0; i < 8; i++) {
				let pS = this.generals[i];
				let framePath = null;
				let iconPath = null;
				let hunterInfo = null;
				let baseGeneralInfo = null;
				if (pS.generalId != 0) {
					framePath = PlayerHunterSystem.Frame(pS.generalId);// 框
					iconPath = cachekey(PlayerHunterSystem.Head(pS.generalId), this);// 头像
					hunterInfo = Game.PlayerHunterSystem.queryHunter(pS.generalId);// 星星
					baseGeneralInfo = PlayerHunterSystem.Table(pS.generalId);
				}
				if (i < 4) {
					if (pS.generalId) {
						this.mainstayShow(i + 32);
						this[`imgDownFrame${i + 32}`].source = cachekey(framePath, this);// 框
						this[`imgDownIcon${i + 32}`].source = cachekey(iconPath, this);// 头像 
						Helper.SetHeroAwakenStar(this[`groupDownStar${i + 32}`], hunterInfo.star, hunterInfo.awakePassive.level);// 星星
						this[`imgDownNum${i + 32}`].text = hunterInfo.level.toString();// 数量
					} else {
						this.commandingGeneral(i + 32);
					}
				}
				else {
					if (pS.generalId) {
						this.lieutenantShow(i + 32);
						this[`imgDownFrame${i + 32}`].source = cachekey(framePath, this);// 框
						this[`imgUpIcon${i + 32}`].source = cachekey(iconPath, this);// 头像
						this[`imgUpNum${i + 32}`].text = hunterInfo.level.toString();// 数量
						this[`imgUpLock${i + 32}`].visible = false;// 锁头
						this[`imgUpYuan${i + 32}`].visible = false;// 援助
					}
					else {
						if (pS.state == 0) {
							this.lieutenant(i + 32);
						} else {
							this.lieutenantAid(i + 32);
						}
					}
				}
			}
		}
	}

	/**
	 * 主将显示
	 */
	public mainstayShow(i) {
		this[`imgDownFrame${i}`].visible = true;// 框
		this[`imgDownIcon${i}`].visible = true;// 头像 
		this[`groupDownStar${i}`].visible = true;// 星星 
		this[`imgDownNum${i}`].visible = true;// 数量
	}

	/**
	 * 副将显示
	 */
	public lieutenantShow(i) {
		this[`imgDownFrame${i}`].visible = true;// 框
		this[`imgUpIcon${i}`].visible = true;// 头像 
		this[`imgUpNum${i}`].visible = true;// 数量
	}

	/**
	 * 编辑
	 */
	public onBtnSet() {
		this.battleList.visible = true;
		this.imgSetSel1.visible = true;
		this.imgSet1.source = cachekey("ui_arena_plan_WordsSeting_png", this);
		this.btnSet.visible = false;
		this.btnColse.visible = false;
		this.btnSave.visible = true;
		this.btnCancel.visible = true;
		this.initList();
	}

	/**
	 * 保存
	 */
	public onBtnSave() {
		// 初始化
		this.compile();
		this.battleList.visible = false;
		this.btnSet.visible = true;
		this.btnColse.visible = true;
		this.btnSave.visible = false;
		this.btnCancel.visible = false;
		if (this.type == 7) {
			Game.PlayerFormationSystem.SaveSquadPlan();// 阵容方案本服保存
		} else if (this.type == 16) {
			Game.PlayerFormationSystem.SaveCrossBeam();// 阵容方案跨服保存
		} else if (this.type == 21) {
			Game.PlayerFormationSystem.SaveFriendsTeams();// 阵容方案好友单队切磋保存
		} else if (this.type == 22) {
			Game.PlayerFormationSystem.SaveMoreTeam();// 阵容方案好友多队切磋保存
		}
	}

	/**
	 * 取消
	 */
	public onBtnCancel() {
		TipManager.ShowConfirmCancel("确定不保存本次调整吗?", () => {
			// 确定从新加载此界面 初始化
			this.compile();
			this.btnSet.visible = true;
			this.btnColse.visible = true;
			this.btnSave.visible = false;
			this.btnCancel.visible = false;
		})
	}

	/**
	 * 关闭
	 */
	public onBtnColse() {
		this.onClose();
	}

	/**
	 * 队伍1
	 */
	public onBtnSelect1() {
		if (this.btnSave.visible == false && this.btnCancel.visible == false) {
			this.onClose();
			if (this.type == 7) {
				this.usingSuccessful(1, this.saveFrom);
			} else if (this.type == 16) {
				this.usingSuccessful(1, this.crossBeam);
			} else if (this.type == 21) {
				this.usingSuccessful(1, this.friendsTeams);
			} else if (this.type == 22) {
				this.usingSuccessful(1, this.moreTeam);
			}
		} else {
			this.compile();
			this.imgSet1.source = cachekey("ui_arena_plan_WordsSeting_png", this);
			this.imgSetSel1.visible = true;
			this.hunterInfo(this.idType);
			this.idType = 1;
			this.refreshInfo(this.idType);
		}
	}

	/**
	 * 队伍2
	 */
	public onBtnSelect2() {
		if (this.btnSave.visible == false && this.btnCancel.visible == false) {
			this.onClose();
			if (this.type == 7) {
				this.usingSuccessful(2, this.saveFrom);
			} else if (this.type == 16) {
				this.usingSuccessful(2, this.crossBeam);
			} else if (this.type == 21) {
				this.usingSuccessful(2, this.friendsTeams);
			} else if (this.type == 22) {
				this.usingSuccessful(2, this.moreTeam);
			}
		} else {
			this.compile();
			this.imgSet2.source = cachekey("ui_arena_plan_WordsSeting_png", this);
			this.imgSetSel2.visible = true;
			this.hunterInfo(this.idType);
			this.idType = 2;
			this.refreshInfo(this.idType);
		}
	}

	/**
	 * 队伍3
	 */
	public onBtnSelect3() {
		if (this.btnSave.visible == false && this.btnCancel.visible == false) {
			this.onClose();
			if (this.type == 7) {
				this.usingSuccessful(3, this.saveFrom);
			} else if (this.type == 16) {
				this.usingSuccessful(3, this.crossBeam);
			} else if (this.type == 21) {
				this.usingSuccessful(3, this.friendsTeams);
			} else if (this.type == 22) {
				this.usingSuccessful(3, this.moreTeam);
			}
		} else {
			this.compile();
			this.imgSet3.source = cachekey("ui_arena_plan_WordsSeting_png", this);
			this.imgSetSel3.visible = true;
			this.hunterInfo(this.idType);
			this.idType = 3;
			this.refreshInfo(this.idType);
		}
	}

	/**
	 * 队伍4
	 */
	public onBtnSelect4() {
		if (this.btnSave.visible == false && this.btnCancel.visible == false) {
			this.onClose();
			if (this.type == 7) {
				this.usingSuccessful(4, this.saveFrom);
			} else if (this.type == 16) {
				this.usingSuccessful(4, this.crossBeam);
			} else if (this.type == 21) {
				this.usingSuccessful(4, this.friendsTeams);
			} else if (this.type == 22) {
				this.usingSuccessful(4, this.moreTeam);
			}
		} else {
			this.compile();
			this.imgSet4.source = cachekey("ui_arena_plan_WordsSeting_png", this);
			this.imgSetSel4.visible = true;
			this.hunterInfo(this.idType);
			this.idType = 4;
			this.refreshInfo(this.idType);
		}
	}

	/**
	 * 队伍5
	 */
	public onBtnSelect5() {
		if (this.btnSave.visible == false && this.btnCancel.visible == false) {
			this.onClose();
			if (this.type == 7) {
				this.usingSuccessful(5, this.saveFrom);
			} else if (this.type == 16) {
				this.usingSuccessful(5, this.crossBeam);
			} else if (this.type == 21) {
				this.usingSuccessful(5, this.friendsTeams);
			} else if (this.type == 22) {
				this.usingSuccessful(5, this.moreTeam);
			}
		} else {
			this.compile();
			this.imgSet5.source = cachekey("ui_arena_plan_WordsSeting_png", this);
			this.imgSetSel5.visible = true;
			this.hunterInfo(this.idType);
			this.idType = 5;
			this.refreshInfo(this.idType);
		}
	}

	/**
	 * 当前方案使用成功
	 */
	public usingSuccessful(index, succeedData) {
		switch (index) {
			case 1: Game.EventManager.event(GameEvent.USING_SUCCESSFUL, [index, succeedData[0]]); break;
			case 2: Game.EventManager.event(GameEvent.USING_SUCCESSFUL, [index, succeedData[1]]); break;
			case 3: Game.EventManager.event(GameEvent.USING_SUCCESSFUL, [index, succeedData[2]]); break;
			case 4: Game.EventManager.event(GameEvent.USING_SUCCESSFUL, [index, succeedData[3]]); break;
			case 5: Game.EventManager.event(GameEvent.USING_SUCCESSFUL, [index, succeedData[4]]); break;
		}
	}

	/**
	 * 所有队伍置成点击编辑
	 */
	public compile() {
		for (let i = 1; i < 6; i++) {
			this[`imgSet${i}`].source = cachekey("ui_arena_plan_WordsSet_png", this);
			this[`imgSetSel${i}`].visible = false;
		}
	}

	/**
	 * 1-5队伍数据存储
	 */
	private hunterInfo(id: number) {
		if (id == 1) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i] = this.generals[i];
			}
		} else if (id == 2) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 8] = this.generals[i];
			}
		} else if (id == 3) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 16] = this.generals[i];
			}
		} else if (id == 4) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 24] = this.generals[i];
			}
		} else if (id == 5) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 32] = this.generals[i];
			}
		}

		// 本地缓存
		if (this.type == 7) {// 本服	
			this.saveFrom[id - 1].formationType = this.type;
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.saveFrom[id - 1].generals[i] = this.generals[i].generalId;
				} else {
					this.saveFrom[id - 1].supports[i - 4] = this.generals[i].generalId;
				}
			}
		} else if (this.type == 16) {// 跨服
			this.crossBeam[id - 1].formationType = this.type;
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.crossBeam[id - 1].generals[i] = this.generals[i].generalId;
				} else {
					this.crossBeam[id - 1].supports[i - 4] = this.generals[i].generalId;
				}
			}
		} else if (this.type == 21) {// 好友单队切磋
			this.friendsTeams[id - 1].formationType = this.type;
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.friendsTeams[id - 1].generals[i] = this.generals[i].generalId;
				} else {
					this.friendsTeams[id - 1].supports[i - 4] = this.generals[i].generalId;
				}
			}
		} else if (this.type == 22) {// 好友多队切磋		
			this.moreTeam[id - 1].formationType = this.type;
			for (let i = 0; i < this.generals.length; i++) {
				if (i < 4) {
					this.moreTeam[id - 1].generals[i] = this.generals[i].generalId;
				} else {
					this.moreTeam[id - 1].supports[i - 4] = this.generals[i].generalId;
				}
			}
		}
	}

	/**
	 * 1-5队伍初始化
	 */
	private refreshInfo(id: number) {
		this.generals = [];
		if (this.type == 7) {// 本服
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					if (this.saveFrom[id - 1].generals[i] != null && this.saveFrom[id - 1].generals[i] != 0) {
						posState.generalId = this.saveFrom[id - 1].generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (this.saveFrom[id - 1].supports[i - 4] != null && this.saveFrom[id - 1].generals[i - 4] != 0) {
						posState.generalId = this.saveFrom[id - 1].supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}
			}
		} else if (this.type == 16) {// 跨服
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					if (this.crossBeam[id - 1].generals[i] != null && this.crossBeam[id - 1].generals[i] != 0) {
						posState.generalId = this.crossBeam[id - 1].generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (this.crossBeam[id - 1].supports[i - 4] != null && this.crossBeam[id - 1].generals[i - 4] != 0) {
						posState.generalId = this.crossBeam[id - 1].supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}
			}
		} else if (this.type == 21) {// 好友单队切磋  SaveFriendsTeams
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					if (this.friendsTeams[id - 1].generals[i] != null && this.friendsTeams[id - 1].generals[i] != 0) {
						posState.generalId = this.friendsTeams[id - 1].generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (this.friendsTeams[id - 1].supports[i - 4] != null && this.friendsTeams[id - 1].generals[i - 4] != 0) {
						posState.generalId = this.friendsTeams[id - 1].supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}
			}
		} else if (this.type == 22) {// 好友三队切磋			
			for (let i = 0; i < 8; i++) {
				let posState = new PosState();
				if (i < 4) {
					if (this.moreTeam[id - 1].generals[i] != null && this.moreTeam[id - 1].generals[i] != 0) {
						posState.generalId = this.moreTeam[id - 1].generals[i];
						posState.state = 1;
					}
					this.generals.push(posState);
				} else {
					if (this.moreTeam[id - 1].supports[i - 4] != null && this.moreTeam[id - 1].generals[i - 4] != 0) {
						posState.generalId = this.moreTeam[id - 1].supports[i - 4];
						posState.state = 1;
					}
					this.generals.push(posState);
				}
			}
		}
		this.refreshOverallInfo();
	}

	/**
	 * 刷新全局数据
	 */
	public refreshOverallInfo() {
		this.drawUI();
		this.hunterInfo(this.idType);
		this.initList();
	}

	/**
	 * 界面关闭
	 */
	public onClose() {
		this.cancelEvent();
		this.close();
	}

	/**
	 * 注销事件
	 */
	public cancelEvent() {
		Game.EventManager.off(GameEvent.DRAG_LOOSEN, this.ondragLoosen, this);
	}

	/**
	 * 1-5队伍item数据
	 */
	public getSelectGenIds() {
		if (this.idType == 1) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i] = this.generals[i];
			}
		} else if (this.idType == 2) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 8] = this.generals[i];
			}
		} else if (this.idType == 3) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 16] = this.generals[i];
			}
		} else if (this.idType == 4) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 24] = this.generals[i];
			}
		} else if (this.idType == 5) {
			for (let i = 0; i < 8; i++) {
				this.generalss[i + 32] = this.generals[i];
			}
		}
		return this.generalss;
	}
}
}