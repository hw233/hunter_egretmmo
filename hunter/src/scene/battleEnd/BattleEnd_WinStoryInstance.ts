namespace zj {
/**
 * @class 猎人故事副本结算
 * 
 * @author LianLei
 * 
 * @date 2019.07.31
 */
export class BattleEnd_WinStoryInstance extends BattleSettleWinDrop {

	public AdaptBoard: eui.Group;
	public NodeBoard: eui.Group;
	public TableViewDrops: eui.List;
	public TableViewHeros: eui.List;
	public ButtonGoOn: eui.Button;
	public ButtonDetail: eui.Button;
	public NodeStar: eui.Group;
	public NodeWin: eui.Group;
	public imgWordName: eui.Image;
	public LabelInstanceName: eui.Label;
	public imgWordTime: eui.Image;
	public LabelInstanceTime: eui.Label;
	public groupMission1: eui.Group;
	public imgMission1: eui.Image;
	public labelMission1: eui.Label;
	public groupMission2: eui.Group;
	public imgMission2: eui.Image;
	public labelMission2: eui.Label;
	public groupMission3: eui.Group;
	public imgMission3: eui.Image;
	public labelMission3: eui.Label;

	public bRankCome: boolean;

	public constructor() {
		super();
		this.skinName = "resource/skins/battleEnd/BattleEnd_WinStoryInstanceSkin.exml";
		this.ui_name = "BattleEnd_WinStoryInstance";
		this.bRankCome = false;
		this.width = UIManager.StageWidth;
		this.height = UIManager.StageHeight;
	}

	public Init() {
		super.Init();
		this.ButtonGoOn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonGoOn, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this);
	}

	public Load() {
		super.Load();
		this.SetFormationInfos();
	}

	public Update(tick) {
		super.Update(tick);
		this.UpdateStory();
	}

	public onButtonGoOn() {
		StageSceneManager.Instance.clearScene();
		this.close();
		Gmgr.Instance.bPause = false;
		Gmgr.Instance.bReplay = false;
		Game.UIManager.popAllScenesAndDialogs(() => {
			loadUI(StoryInstanceMainScene).then((scene: StoryInstanceMainScene) => {
				scene.Init();
				scene.SelAndOpen()
				scene.show(UI.SHOW_FROM_TOP);
			});
		});
	}

	public UpdateStory() {
		if (this.total_tick >= ConstantConfig_BattleSettle.rankComeTime * 1000 && this.bRankCome == false) {
			this.bRankCome = true;
			this.FadeInGet();
		}
	}

	public FadeInGet() {

	}

	public SetFormationInfos() {
		let getDes = otherdb.ActivityBattleGetInstanceStarDes(PlayerActivitySystem.activityBattleCurPos);
		for (let i = 1; i <= getDes.length; i++) {
			(<eui.Label>this[`labelMission${i}`]).text = getDes[i - 1].toString();
		}

		let activityInfo = otherdb.getActivityByTypeAndIndex(message.ActivityType.ACT_TYPE_INSTANCE_BATTLE, Game.PlayerInstanceSystem.activityBattleIndex);
		let curStarInfo = otherdb.ActivityBattleGetCurStarById(activityInfo, PlayerActivitySystem.activityBattleCurPos);
		for (let i = 1; i <= 3; i++) {
			if (Table.FindK(curStarInfo, i) == -1) {
				(<eui.Image>this[`imgMission${i}`]).source = cachekey(UIConfig.UIConfig_Activity.StoryCheckPath[2], this);
				(<eui.Label>this[`labelMission${i}`]).textColor = Helper.RGBToHex("r:170,g:170,b:170");
			}
			else {
				(<eui.Image>this[`imgMission${i}`]).source = cachekey(UIConfig.UIConfig_Activity.StoryCheckPath[1], this);
				(<eui.Label>this[`labelMission${i}`]).textColor = Helper.RGBToHex("r:0,g:249,b:0");
			}
		}
		this.LabelInstanceName.text = TableActivityBattleInstance.Item(PlayerActivitySystem.activityBattleCurPos).name;
	}
}
}