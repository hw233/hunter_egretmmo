namespace zj {
//公会战——挑战后
//yuqingchao
//2019.03.06
export class LeagueBossFighting extends Dialog {

	private groupJoin: eui.Group;
	private groupRank: eui.Group;
	private btnCopper: eui.Button;		//普通激励按钮
	private btnGold: eui.Button;		//使劲激励按钮
	private btnFight: eui.Button;		//挑战按钮
	private btnClose: eui.Button;		//退出按钮
	private lbNum: eui.Label;		//BOSS剩余血量
	private hpMask: eui.Image; // BOSS血量条遮罩
	private imgHP: eui.Image;		//血量条
	private groupHP: eui.Group;		//血量条Group
	private lbTime: eui.Label;		//剩余挑战时间
	private lbEndTime: eui.Label;		//剩余攻击次数
	private lbCopperNum: eui.Label;		//普通激励话费金币数
	private lbGoldNum: eui.Label;		//使劲激励话费砖石数
	private lstInspire: eui.List;

	private timer: egret.Timer;
	private arrayCollection: eui.ArrayCollection;
	private id: number = 0;
	private rankItems: Array<message.LeagueBossHurtRank> = null;
	private leagueBossRank: LeagueBossRank = null;
	private process: message.ProgressInfo = null;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueBossFightingSkin.exml"
		this.btnCopper.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopper, this);
		this.btnGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGoldr, this);
		this.btnFight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFight, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onbtnClose, this);

		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, this.refreshRank, this);
		Game.EventManager.on(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.refreshBlood, this);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_BOSS_RANK, this.refreshRank, this);
			Game.EventManager.off(GameEvent.SERVER_NOTICE_LEAGUE_BOSS, this.refreshBlood, this);

			if (this.timer) this.timer.stop();
		}, null);
	}

	public init() {
		this.process = Table.FindR(Game.PlayerLeagueSystem.BaseInfo.processes, function (k, v) {
			if (v.type == message.EProcessType.PROCESS_TYPE_LEAGUE_BOSS) {
				return true;
			}
		})[0];
		this.hpMask = Util.getMaskImgBlack(this.imgHP.width, this.imgHP.height);
		this.hpMask.verticalCenter = 0;
		this.hpMask.left = 7;
		this.hpMask.visible = false;
		this.groupHP.addChild(this.hpMask);

		this.upDate();

		//定时器，一秒刷新一次
		this.timer = new egret.Timer(1000, 0);
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
		this.timer.start();

		this.lbCopperNum.text = CommonConfig.league_boss_inspire_normal.toString();
		this.lbGoldNum.text = CommonConfig.league_boss_inspire_senior.toString();

		Game.PlayerLeagueSystem.leagueBossScene().then((msg: message.LeagueBossSceneRespBody) => {
			this.setInfo(msg);
		}).catch(() => {
			if (Game.PlayerLeagueSystem.leagueBoss.bStart == false) {
				if (Game.PlayerLeagueSystem.leagueBoss.bSuccess) {
					// toast("WIN")
					loadUI(LeagueBossSccessful)
						.then((dialog: LeagueBossSccessful) => {
							dialog.show(UI.SHOW_FROM_TOP);
						})
					this.close();
				} else {
					// toast("LOSE")
					loadUI(LeagueBossLose)
						.then((dialog: LeagueBossLose) => {
							dialog.show(UI.SHOW_FROM_TOP);
						})
					this.close();
				}
			}
		});

		if (Teach.isDone(teachBattle.teachPartID_League_Boss) == false) {
			Teach.CheckAndSetTeach(teachBattle.teachPartID_League_Boss);
		}
	}

	private setInfo(msg: message.LeagueBossSceneRespBody) {
		this.rankItems = msg.rankItems;
		this.initRank();
		this.initBlood();
		this.initInspireList();
		this.SetFightCount();
	}
	public isFullScreen(){
		return true;
	}
	private upDate() {
		this.setTimeDes();
		this.initBlood();
		if (this.process && this.process.leftTime * 1000 - egret.getTimer() <= 0) {
			if (this.timer) this.timer.stop;
		}
	}

	private setTimeDes() {
		let time: number = this.process.leftTime - Math.floor(egret.getTimer() / 1000);
		this.lbTime.text = Helper.GetTimeStr(time <= 0 ? 0 : time, false);
	}

	//挑战次数
	private SetFightCount() {
		this.lbEndTime.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_fightCount,
			CommonConfig.league_boss_battle_number - Game.PlayerLeagueSystem.Member.boss_time, CommonConfig.league_boss_battle_number)
	}

	private refreshRank() {
		if (this.leagueBossRank != null) {
			this.leagueBossRank.refreash();
		}
	}

	private refreshBlood() {
		let a = Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp;
		if (Game.PlayerLeagueSystem.leagueBoss.bStart == false) {
			if (Game.PlayerLeagueSystem.leagueBoss.bSuccess) {
				this.close();
				loadUI(LeagueBossSccessful)
					.then((dialog: LeagueBossSccessful) => {
						dialog.show(UI.SHOW_FROM_TOP);
					})
			} else if (Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp >= 0 && this.process.leftTime - Math.floor(egret.getTimer() / 1000) <= 0) {
				this.close();
				loadUI(LeagueBossLose)
					.then((dialog: LeagueBossLose) => {
						dialog.show(UI.SHOW_FROM_TOP);
					})
			}

		}
	}

	//激励item
	private initInspireList() {
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < Game.PlayerLeagueSystem.leagueBoss.Inspires.length; i++) {
			this.arrayCollection.addItem({
				info: Game.PlayerLeagueSystem.leagueBoss.Inspires[i],
				i
			});
		}
		this.lstInspire.dataProvider = this.arrayCollection;
		this.lstInspire.itemRenderer = LeagueBossFightingIncertive;
	}

	private initRank() {
		this.leagueBossRank = new LeagueBossRank();
		this.leagueBossRank.setInfo(this.rankItems);
		this.groupRank.removeChildren();
		this.groupRank.addChild(this.leagueBossRank);
	}

	//BOSS血量
	private initBlood() {
		let curhp = Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].curInfo.cur_hp;		//BOSS战斗后剩余血量
		let fullhp = Game.PlayerLeagueSystem.leagueBoss.bossInfo.monster_pos3[0].baseInfo.monster_hp;		//BOSS总血量

		let curhp1;
		let fullhp1;
		if (curhp >= 100000) {
			curhp1 = (curhp / 10000).toFixed(1) + "万";
		} else {
			curhp1 = curhp;
		}
		if (fullhp >= 100000) {
			fullhp1 = (fullhp / 10000).toFixed(1) + "万";
		} else {
			fullhp1 = fullhp;
		}
		this.lbNum.text = HelpUtil.textConfigFormat(TextsConfig.TextConfig_League.animal_Exp, curhp1, fullhp1);
		let percent = curhp / fullhp;
		this.hpMask.visible = true;
		this.hpMask.width = this.imgHP.width * percent;
		this.imgHP.mask = this.hpMask;
	}

	//挑战按钮
	private onBtnFight() {
		if (Game.PlayerLeagueSystem.Member.boss_time < CommonConfig.league_boss_battle_number) {
			Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_LEAGUE_BOSS;
			//"HXH_CommonFormationPveMain"
			let msg = Game.PlayerLeagueSystem.leagueBoss.bossInfo;
			Game.PlayerStageSystem.insert(msg);
			PlayerStageSystem.stageInfoTbl = [msg];
			loadUI(CommonFormatePveMain)
				.then((dialog: CommonFormatePveMain) => {
					dialog.show(UI.SHOW_FROM_TOP);
					dialog.setInfo(this.id);
				});
		}
		else {
			toast_warning(LANG(TextsConfig.TextConfig_League.animal_maxFight));
			return;
		}
	}

	//普通激励
	private onBtnCopper() {
		this.ReqInspire(1);
	}

	//使劲激励
	private onBtnGoldr() {
		this.ReqInspire(2);
	}

	//全体激励更新
	private ReqInspire(inspireType: number) {
		Game.PlayerLeagueSystem.leagueBossInspire(inspireType).then(() => {
			this.initInspireList();
		}).catch((result) => {
			if (result == message.EC.XG_LACK_MONEY) {
				loadUI(HelpGoldDialog)
					.then((dialog: HelpGoldDialog) => {
						dialog.SetInfoList();
						dialog.show(UI.SHOW_FROM_TOP);
					});
			} else {
				return;
			}
		})
	}

	private onbtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}

}
}