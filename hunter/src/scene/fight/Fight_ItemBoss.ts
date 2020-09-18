namespace zj {
export class Fight_ItemBoss extends UI {
	public constructor() {
		super();
		this.skinName = "resource/skins/fight/FightItemBossSkin.exml";

	}
	public fight_ItemBoss: eui.Group;
	public SpriteFrame: eui.Image;
	public SpriteHpPic2: eui.Image;
	public SpriteHpPic1: eui.Image;
	public SpriteHpBlack: eui.Image;
	public SpriteHpWhite: eui.Image;
	public SpriteRagePic: eui.Image;
	public BarRageNode: eui.Group;
	public SpriteHead: eui.Image;
	public HeadNode: eui.Group;
	public LabelName: eui.Label;
	public LabelHpNum: eui.BitmapLabel;


	public monster;
	public CurMonsterMaxHp = 0
	public HpScaleNotChange = 0

	public hp_num = 0
	public mod_hp = 0
	public changeHp = 0
	public oldHp = 0
	public hp_numLost = 0
	public mod_hpLost = 0
	public changeHpState = 0
	public white_num = 0
	public bossChangeHp = 0
	public oldHp_num = 0
	public mod_hpLast = 0

	public rageProgress = null
	public pressCd = null

	public cacheHp = 0
	public cacheRage = 0

	public moveTag = false
	public dieTag = false
	public actionTag = false

	public HpShowNum = -1
	public HpShowNumNext = -1
	public tableBuffPre;
	public progressRect;
	public monsterCurHp;

	public update;
	private SpriteHpBlackMask: eui.Image;
	private SpriteHpWhiteMask: eui.Image;
	private SpriteHpPic2Mask: eui.Image;
	private SpriteHpPic1Mask: eui.Image;
	public Init() {
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
		UIManager.Stage.addEventListener(egret.Event.RESIZE, this.onStageResize, this);
		this.onStageResize();
	}
	public onStageResize() {
		this.x = UIManager.StageWidth - 524;
	}
	public OnExit() {
		egret.clearInterval(this.update);
		this.update = -1;
		UIManager.Stage.removeEventListener(egret.Event.RESIZE, this.onStageResize, this);
	}
	public Load() {
		this.progressRect = this.SpriteHpPic1.width;
		this.SpriteHpWhite.visible = false;
		this.SpriteHpBlack.visible = false;
	}
	//设置信息
	public SetInfo(monsterInfo) {
		this.monster = monsterInfo;
		if (this.monster == null) {
			return;
		}
		this.SpriteHead.visible = true;
		this.SpriteHead.source = cachekey(this.monster.headPath, this);

		this.LabelName.visible = true;
		this.LabelName.text = this.monster.roleName;

		if (this.monster.getPressSkill() != null) {
			this.pressCd = SkillCdMgr.Instance.getCurCd(this.monster.getPressSkill());
		}

		this.monsterCurHp = this.monster.getHp();
		this.CurMonsterMaxHp = this.monster.getMaxHp();
		this.HpScaleNotChange = this.CurMonsterMaxHp / this.monster.nHpTube;
		this.cacheHp = this.monsterCurHp;
		this.InitBloodData()
		this.InitRage()
	}
	public ResetCurrBossInfo() {
		this.monsterCurHp = this.monster.getHp();
		this.CurMonsterMaxHp = this.monster.getMaxHp();
		this.HpScaleNotChange = this.CurMonsterMaxHp / this.monster.nHpTube;
		this.cacheHp = this.monsterCurHp;
		this.LabelName.text = this.monster.roleName;
	}
	public UpdateBlood(tick) {
		if (this.monster != null) {
			if (this.cacheHp != this.monster.getHp()) {
				let curHp = this.monster.getHp();
				this.monsterCurHp = curHp;
				let changeHp = this.cacheHp - this.monsterCurHp;
				if (changeHp < 0) {
					this.InitBloodData()
				} else {
					this.CheckMonsterHp(changeHp);
				}
				this.cacheHp = curHp
			}
			this.FreshHp(tick);
		}
	}
	//检测
	public CheckMonsterHp(changeHp) {
		this.changeHp = Math.floor(changeHp);
		if (this.changeHp <= 0) {
			this.changeHpState = 0;
		} else {
			this.changeHpState = 1;
			this.white_num = 1;
		}
		this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
		this.mod_hp = this.monsterCurHp % this.HpScaleNotChange;
		if (this.CurMonsterMaxHp >= this.changeHp) {
			this.oldHp = this.changeHp + this.monsterCurHp;
		} else {
			this.oldHp = this.CurMonsterMaxHp;
			this.changeHp = this.CurMonsterMaxHp;
		}
		this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
		this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
		this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
		this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
	}

	private IsNeedEnduringHp() {
		if (!this.monster.isActivityBoss()) return;
		if (this.oldHp < activityBossConfig.boss_min_blood_tube) {
			let addHp = activityBossConfig.boss_add_tube_add * this.HpScaleNotChange;
			let curHp = this.monster.getHp();
			this.monster.setHp(addHp + curHp);
			this.setEnduringHp();
		}
	}

	private setEnduringHp() {
		this.monsterCurHp = this.monster.getHp();
		this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
		this.mod_hp = this.monsterCurHp % this.HpScaleNotChange;
		this.oldHp = this.monsterCurHp;
		this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
		this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
		this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
		this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
	}

	public InitBloodData() {
		this.changeHp = 0
		this.changeHpState = 0
		this.hp_num = Math.ceil(this.monsterCurHp / this.HpScaleNotChange);
		this.mod_hp = (this.monsterCurHp - 0.000001) % this.HpScaleNotChange;
		this.oldHp = this.monsterCurHp
		this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
		this.mod_hpLost = this.changeHp % this.HpScaleNotChange;
		this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
		this.mod_hpLast = this.oldHp % this.HpScaleNotChange;
	}
	public rageProgressMask;
	private rageWidth;

	public InitRage() {
		// let x = this.SpriteRagePic.x;
		// let y = this.SpriteRagePic.y;
		// this.BarRageNode.x = x;
		// this.BarRageNode.y = y;
		// this.SpriteRagePic.visible = false;

		this.rageWidth = this.SpriteRagePic.width;
		this.rageProgressMask = Util.getMaskImgBlack(this.SpriteRagePic.width, this.SpriteRagePic.height);
		this.addChild(this.rageProgressMask);
		this.rageProgressMask.x = this.SpriteRagePic.x;
		this.rageProgressMask.y = this.SpriteRagePic.y;
		this.SpriteRagePic.mask = this.rageProgressMask;
		//this.rageProgressMask.x = 123+this.rageWidth;
	}
	public FreshHp(dt) {
		//如果是最后一条血量，则第二条不显示
		if (this.oldHp - this.HpScaleNotChange < 0) {
			this.SpriteHpPic2.visible = false;
		} else {
			this.SpriteHpPic2.visible = true;
		}
		//前端血条颜色
		let HpShowNum = 0;
		HpShowNum = (this.oldHp_num) % 6;
		HpShowNum = Math.floor(HpShowNum);
		if (this.HpShowNum != HpShowNum) {
			this.HpShowNum = HpShowNum;
			this.SpriteHpPic1.source = cachekey("ui_battle_BurBossBlood" + HpShowNum + "_png", this);
		}
		//前端血条掉血效果刷新
		let x = this.SpriteHpPic2.x;
		let y = this.SpriteHpPic2.y;
		let sizew = this.SpriteHpPic2.width;
		let sizeh = this.SpriteHpPic2.height;
		if (this.oldHp_num == this.hp_num) {
			if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
				x = x + sizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
			} else {
				x = x + sizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
			}
		} else {
			if (this.mod_hpLast > 0) {
				x = x + sizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
			} else {
				x = x + sizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
			}
		}
		if (this.oldHp_num == this.hp_num) {
			if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
				sizew = sizew * ((this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
			} else {
				sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
			}
		} else {
			if (this.mod_hpLast > 0) {
				sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
			} else {
				sizew = sizew * ((this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
			}
		}
		this.SpriteHpPic1Mask.x = x;
		this.SpriteHpPic1Mask.y = y;

		//后端血条颜色
		let HpShowNumNext = 0;
		HpShowNumNext = (this.oldHp_num - 1) % 6;
		HpShowNumNext = Math.floor(HpShowNumNext);
		if (this.HpShowNumNext != HpShowNumNext) {
			this.HpShowNumNext = HpShowNumNext;
			this.SpriteHpPic2.source = cachekey("ui_battle_BurBossBlood" + HpShowNumNext + "_png", this);
		}

		//黑条掉血效果刷新

		x = this.SpriteHpPic2.x;
		y = this.SpriteHpPic2.y;
		let _balckX = x;
		let blackSizew = this.SpriteHpPic2.width;
		let blackSizeh = this.SpriteHpPic2.height;
		if (this.hp_numLost < 1) {
			if (this.oldHp_num == this.hp_num) {
				if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
					x = x + blackSizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
				} else {
					x = x + blackSizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
				}
			} else {
				if (this.mod_hpLast > 0) {
					x = x + blackSizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
				} else {
					x = x + blackSizew * (1 - (this.mod_hp + this.mod_hpLost) / this.HpScaleNotChange);
				}
			}
			if (this.oldHp_num == this.hp_num) {
				if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
					blackSizew = blackSizew * ((this.mod_hpLost) / this.HpScaleNotChange);
				} else {
					blackSizew = blackSizew * ((this.mod_hpLast) / this.HpScaleNotChange);
				}
			} else {
				if (this.mod_hpLast > 0) {
					blackSizew = blackSizew * ((this.mod_hpLast) / this.HpScaleNotChange);
				} else {
					blackSizew = blackSizew * ((this.mod_hpLost) / this.HpScaleNotChange);
				}
			}
		}
		this.SpriteHpBlackMask.x = x;
		this.SpriteHpBlackMask.y = y;

		//如果没有掉血，则隐藏黑条，一旦有掉血就显示黑条，在白条图层之下
		if (this.changeHp > 0) {
			this.SpriteHpBlack.visible = true;
		} else {
			this.SpriteHpBlack.visible = false;
			this.changeHpState = 0;
			this.changeHp = 0
		}
		//血量数字以及剩余血条数刷新
		let num = 0;
		if (this.monsterCurHp == 0) {
			num = 0;
		} else if (this.monsterCurHp == this.CurMonsterMaxHp) {
			num = this.monsterCurHp / this.HpScaleNotChange;
			num = Math.ceil(num);
		} else {
			num = Math.floor((this.changeHp + this.monsterCurHp) / this.HpScaleNotChange) + 1;
		}
		let wenhao = 0;
		if (num != 0) {
			if (Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ZORK || Gmgr.Instance.fightType == message.EFormationType.FORMATION_TYPE_ACTIVITY_BOSS) {
				wenhao = 1;
			}
			this.LabelHpNum.visible = true;
			if (wenhao == 0) {
				this.LabelHpNum.text = "X" + num;
			} else {
				this.LabelHpNum.text = "???";
			}

		} else {
			this.LabelHpNum.visible = false;
		}
		//控制掉血的数据刷新，将血条分为三个阶段：
		//0.平时不掉血 
		//1.掉血后先闪一下白条（此时显示黑条） 
		//2.黑条和前端血条重叠并递减血条
		if (this.changeHpState == 0) {
			//正常阶段不掉血
			return;
		} else if (this.changeHpState == 1) {
			//闪白条阶段
			this.white_num = this.white_num - 0.07;
			if (this.white_num > 0) {
				this.SpriteHpWhite.visible = true;
			} else {
				this.SpriteHpWhite.visible = false;
				this.changeHpState = 2;
				this.white_num = 0;
			}
			let x = this.SpriteHpPic2.x;
			let y = this.SpriteHpPic2.y;
			let _whiteX = x;
			let sizew = this.SpriteHpPic2.width;
			let sizeh = this.SpriteHpPic2.height;
			if (this.hp_numLost < 1) {
				if (this.mod_hpLast != 0) {
					x = x + sizew * (1 - (this.mod_hpLast) / this.HpScaleNotChange);
				} else {
					x = x;
				}
				if (this.oldHp_num == this.hp_num) {
					if ((this.mod_hp + this.mod_hpLost) <= this.HpScaleNotChange) {
						sizew = sizew * ((this.mod_hpLost) / this.HpScaleNotChange);
					} else {
						sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
					}
				} else {
					if (this.mod_hpLast > 0) {
						sizew = sizew * ((this.mod_hpLast) / this.HpScaleNotChange);
					} else {
						sizew = sizew * ((this.mod_hpLost) / this.HpScaleNotChange);
					}
				}
			}
			this.SpriteHpWhiteMask.x = x;
			this.SpriteHpWhiteMask.y = y;
			this.SpriteHpWhite.alpha = this.white_num;
		} else if (this.changeHpState == 2) {
			//灰条掉血阶段
			//判断掉血过多时，加速掉血效果
			if (this.hp_numLost < 1) {
				if (this.changeHp > this.HpScaleNotChange / 30) {
					this.changeHp = this.changeHp - this.HpScaleNotChange / 30;
				} else {
					this.changeHp = this.changeHp - this.changeHp / 5;
				}
			} else {
				this.changeHp = this.changeHp - this.changeHp / 6;
			}
			//掉血时，即时刷新数据
			this.oldHp = this.changeHp + this.monsterCurHp;//Math.floor()
			this.oldHp_num = Math.ceil(this.oldHp / this.HpScaleNotChange);
			this.mod_hpLast = this.oldHp % this.HpScaleNotChange;//Math.ceil()
			this.hp_numLost = Math.floor(this.changeHp / this.HpScaleNotChange);
			this.mod_hpLost = this.changeHp % this.HpScaleNotChange;//Math.ceil()

			if (this.mod_hpLost > 0) {

			} else {
				this.mod_hpLost = 0;
			}
			if (this.mod_hpLast > 0) {

			} else {
				this.mod_hpLast = 0;
			}
		}
	}
	public Update(dt) {
		if (Gmgr.Instance.bPause == true) {
			return;
		}
		if (this.monster.bCanRemove == true) {
			return true;
		}
		this.UpdateBlood(dt);
		this.FreshCd();

		this.UpdateDie();
		this.FreshBuff(this.monster);
	}
	public FreshDying(general) {

	}
	public FreshRage() {

	}
	public FreshCd() {
		if (this.monster != null) {
			if (this.pressCd != null) {
				let cur = this.pressCd.getTime();
				let max = this.pressCd.getMaxTime();
				let percent = Math.floor(cur / max * 100);
				if (percent >= 100) {
					percent = 100
				} else if (percent <= 0) {
					percent = 0;
				}

				this.rageProgressMask.x = 123 + this.rageWidth / 100 * percent;

			}
		}
	}
	public FreshDeadUi() {

	}
	public UpdateDie() {

	}
	public FreshBuff(general) {

	}
}
}