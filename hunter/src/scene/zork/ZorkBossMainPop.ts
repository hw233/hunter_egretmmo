namespace zj {
//贪婪之岛-寿富拉比(世界BOOS)
//yuqingchao
//2019.03.14
export class ZorkBossMainPop extends Dialog {

	private btnClose: eui.Button;
	private btnRule: eui.Button;		//说明按钮
	private btnEnter: eui.Button;		//进入战场按钮

	private lbStarTime: eui.Label;		//开启剩余时间
	private lbLevel: eui.Label;		//BOSS等级
	private lbBloodPer: eui.Label;		//剩余血量百分比
	private imgBlood: eui.Image;		//剩余血量
	private imgExpBoart: eui.Image;		//剩余血量遮罩
	private groupAward: eui.Group;		//BOSS开启前显示的Group
	private groupRank: eui.Group;		//击杀BOSS后显示的Group
	private lstViewKillReward: eui.List;		//最后一击奖励列表
	private lstAward: eui.List;		//伤害排名奖励列表
	private lstHit: eui.List;		//本次活动伤害排名列表
	private reward;
	private openLevel: number = 36;
	private arrayCollection1: eui.ArrayCollection;		//伤害排名奖励
	private arrayCollection2: eui.ArrayCollection;		//最后一击奖励
	private arrayCollection3: eui.ArrayCollection;		//伤害排名
	private bossState = null;

	private imgKill: eui.Image;
	private expsave: number = 0;
	private judgeKill: boolean;
	private isRewardTip: boolean;

	private upDateboss: number;
	private update: number;
	private proInfo;

	public constructor() {
		super();
		this.skinName = "resource/skins/zork/ZorkBossMainPopSkin.exml"
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRule, this);		//说明按钮监听
		this.btnEnter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnEnter, this);		//进入战场按钮监听
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			egret.clearInterval(this.upDateboss);
			egret.clearInterval(this.update);
		}, null);
		this.init();
	}

	public init() {
		this.groupAward.visible = false;
		this.groupRank.visible = false;
		this.reward = PlayerZorkSystem.GetWonderlandBossRankGoodsTbl(Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level);
		this.freshList(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
		this.setInfo();
		this.initBlood();
		this.upDate();
		this.upDateBoss();

		this.judgeKill = false;
		this.isRewardTip = true;

		this.imgBlood.mask = this.imgExpBoart;
		this.upDateboss = egret.setInterval(this.upDateBoss, this, 3000);
		this.update = egret.setInterval(this.upDate, this, 990);
	}

	public isFullScreen(){
		return true;
	}
	private setInfo() {
		let level;
		let name = Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_name == 0 && TextsConfig.TextsConfig_WonderlandBoss.bossName || Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_name;
		if (Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level != null) {
			level = Game.PlayerZorkSystem.zorkBoss.bossInfo.monster_level;
		}
		else {
			level = this.openLevel;
		}
		this.lbLevel.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.bossLevel, level);
		this.setIsKill(true);
	}

	private setRewardList() {
		if(!this.arrayCollection1){
			let lastRewardTbl = [];
			let goods = new message.GoodsInfo;
			goods.goodsId = CommonConfig.scene_boss_kill_reward[0];
			goods.count = CommonConfig.scene_boss_kill_reward[1];
			goods.showType = 1;
			lastRewardTbl.push(goods);
			//伤害奖励列表
			this.arrayCollection1 = new eui.ArrayCollection();
			let a = this.reward;
			for (let k in this.reward) {
				this.arrayCollection1.addItem({
					info: this.reward[k],
					boold: true,
					father: this,
				})
			}
			this.lstAward.itemRenderer = ZorkBossMainPopItem;
			this.lstAward.dataProvider = this.arrayCollection1;
			//最后一击奖励列表
			this.arrayCollection2 = new eui.ArrayCollection();
			for (let i = 0; i < 1; i++) {
				this.arrayCollection2.addItem({
					i,
					info: lastRewardTbl,
					boold: false,
					father: this,
				})
			}
			this.lstViewKillReward.itemRenderer = ZorkBossMainPopItem;
			this.lstViewKillReward.dataProvider = this.arrayCollection2;
		}
	}
	//伤害列表
	private setRankList() {
		// Game.PlayerZorkSystem.bossRank().then(() => {
		let blood = Game.PlayerZorkSystem.zorkBoss.bossInfo.bossInfo.monster_pos3[0].baseInfo.monster_hp;
		let display_num = 20;
		let rank = Game.PlayerZorkSystem.zorkBoss.rankItems;
		if (rank.length >= display_num) {
			display_num = display_num;
		}
		else {
			display_num = rank.length;
		}
		this.arrayCollection3 = new eui.ArrayCollection();
		for (let i = 0; i < display_num; i++) {
			this.arrayCollection3.addItem({
				info: rank[i],
				hp: blood
			})
		}
		this.lstHit.itemRenderer = ZorkBossMainPopHitItem;
		this.lstHit.dataProvider = this.arrayCollection3;
		// });
	}
	//更新
	private upDate() {
		this.upDateBase();
		this.upDateUI(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
		this.freshList(Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS]);
		Game.PlayerZorkSystem.bossInfo().then(() => {
			this.refreshBlood();
		})
	}
	//进去战场按钮的显示变化
	private upDateBase() {
		let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
		if (progress != null) {
			if (this.bossState != progress.info) {
				this.bossState = progress.info;
			}
		}
		if (this.bossState != 0 && Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre > 0) {
			this.btnEnter.enabled = true;
			this.btnEnter.touchEnabled = true;
		}
		else {
			this.btnEnter.enabled = false;
			this.btnEnter.touchEnabled = false;
		}
	}


	//开始或者结束时间显示变化
	private upDateUI(progress) {
		let strTime: any = progress.leftTime;//- Math.floor(egret.getTimer() / 1000) >= 0 ? progress.leftTime - Math.floor(egret.getTimer() / 1000) : 0;
		if (strTime <= 0) {
			Game.EventManager.on(GameEvent.PLAYER_PROGRESS_INFO_CHANGE, this.upDate, this);
		}
		if (progress.info == 0) {
			strTime = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen2, Helper.GetTimeStr(strTime, false))
			this.lbStarTime.textFlow = Util.RichText(strTime);
		}
		else {
			strTime = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd2, Helper.GetTimeStr(strTime, false))
			this.lbStarTime.textFlow = Util.RichText(strTime);
		}
	}
	//Group的显示调节
	private freshList(progress) {
		let hp = Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre;
		if (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre <= 0) {
			//世界BOSS开启且击杀后，显示伤害列表
			this.groupRank.visible = true;
			this.setRankList();
			this.isRewardTip = false;
			this.groupAward.visible = false;
		}
		else {
			this.groupAward.visible = true;
			this.setRewardList();
			this.isRewardTip = true;
			this.groupRank.visible = false;
		}
	}
	//剩余血量
	private initBlood() {
		let bossBlood = Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre != null && Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre || 1;
		bossBlood = bossBlood >= 0 && bossBlood || 0;
		if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info == 0) {
			bossBlood = 1;
		}
		let info = {
			node: null,
			now: bossBlood,
			level: 1,
			level_max: 1,
			exp_max: 1,
			table: [1],
			bar: this.imgBlood,
			dir: 1,
			opacity: 255,
		};
		this.expsave = info.now;
		this.lbBloodPer.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (info.now * 100).toFixed(2));
	}
	private refreshBlood() {
		let hp = Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre;
		this.lbBloodPer.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_WonderlandBoss.lastPerBlood, (hp * 100).toFixed(2));
		let num = Number(hp.toFixed(2))
		this.imgExpBoart.x = this.imgBlood.x - this.imgExpBoart.width + this.imgExpBoart.width * num; // 经验条遮罩的变化
		if (hp == 0) {
			this.setIsKill(this.judgeKill);
		}
		else {
			this.imgKill.visible = false;		//不显示击杀图片
		}
	}
	//“已击杀”图片的显示调节
	private setIsKill(action) {
		if (Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS].info == 0) {
			this.imgKill.visible = false;
		}
		else if (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre > 0) {
			this.imgKill.visible = false;
		}
		else if (Game.PlayerZorkSystem.zorkBoss.bossInfo.hp_pre <= 0) {
			this.judgeKill = true;
			this.imgKill.visible = true;
			if (action) {
				this.setAction();
			}
		}
	}
	//龙骨动画
	private setAction() {

	}
	private upDateBoss() {
		if (this.isRewardTip == false) {
			this.setRankList();
		}
	}
	//说明
	private onBtnRule() {
		loadUI(Common_RuleDialog)
			.then((dialog: Common_RuleDialog) => {
				dialog.show(UI.SHOW_FROM_TOP);
				dialog.init(RuleConfig.wonderlandBoss);
			});
	}
	//进入战场
	private onBtnEnter() {
		Game.PlayerZorkSystem.bossEntry(0, 0).then(() => {
			MapSceneLoading.getInstance().loadFightRes(19, this.wonderlandBoss, this);
		})
	}
	public wonderlandBoss() {
		StageSceneManager.Instance.ChangeScene(StageSceneZorkBoss);
	}
	//退出
	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
	//鼠标抬起，移除  掉落 材料说明
	private onRemoveAward() {
		let dialog = this.getChildByName("Item-skill-common");
		if (dialog) this.removeChild(dialog);
	}
}
}