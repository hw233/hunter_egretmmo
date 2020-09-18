namespace zj {
/**
 * @class 快速上阵Item
 * 
 * @author LianLei
 * 
 * 2019.05.29
 */
export class League_WarBattleLineupItem extends eui.ItemRenderer {
	private imgBoard: eui.Image;
	private groupName: eui.Group;
	private imgHead: eui.Image;
	private imgType: eui.Image;
	private labelLevel: eui.BitmapLabel;
	private imgStar1: eui.Image;
	private imgBarHp: eui.Image;
	private groupStar: eui.Group;
	private imgDead: eui.Image;
	private imgBreak: eui.Image;
	private imgGrade: eui.Image;

	private scaleType: { small: number, middle: number, big: number };
	public dragType: number;
	private barSize: { width: number, height: number };
	private father: Wonderland_Formate;

	private touchBeginTime: number = 0;
	private isInLongPress: boolean = false;


	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/League_WarBattleLineupItemSkin.exml";
		cachekeys(<string[]>UIResource["AwardSignItem"], null);

		this.isInLongPress = false;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
			this.touchTween();
			if (this.data.generalInfo != null) {
				if (this.data.noTouch) {
					Game.EventManager.event(GameEvent.MOUSE_BEGIN, { generalId: this.data.generalInfo.id, index: -1 })
				}
				this.isInLongPress = false;
				this.touchBeginTime = egret.setTimeout(this.onLongPress, this, 1000, this.data);// 超时触发（长按）
			}

		}, this);

		this.addEventListener(egret.TouchEvent.TOUCH_MOVE, () => {
			egret.clearTimeout(this.touchBeginTime);// 注销超时触发
			Game.EventManager.event(GameEvent.DELAY_EXECUTE, { isInLongPress: this.isInLongPress });
		}, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, () => {
			this.clearTouchTween();
			egret.clearTimeout(this.touchBeginTime);
		}, this);

		this.init();
	}

	private onLongPress() {
		this.isInLongPress = true;
		this.father.onBtnOk();
	}

	private init() {
		this.scaleType = {
			small: 0.8,
			middle: 1.1,
			big: 1.5,
		}

		this.dragType = TableEnum.Enum.LeagueWarDragType.OFF;
		this.barSize = {
			width: this.imgBarHp.width,
			height: this.imgBarHp.height
		}
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: League_WarBattleLineupItemData) {
		this.father = data.father;
		if (data.itemType == TableEnum.Enum.FastFormatItemType.LOCK) {
			this.groupName.visible = false;
			return;
		}
		else if (data.itemType == TableEnum.Enum.FastFormatItemType.NORMAL) {
			this.groupName.visible = true;
		}
		else if (data.itemType == TableEnum.Enum.FastFormatItemType.VOID) {
			this.groupName.visible = false;
			return;
		}

		let headPath = PlayerHunterSystem.Head(data.generalInfo.id);
		this.imgHead.source = cachekey(headPath, this);
		this.imgBoard.source = cachekey(UIConfig.UIConfig_Role.heroFrame[data.generalInfo.step], this);
		this.labelLevel.text = data.generalInfo.level.toString();
		if (data.index > 2) {
			this.imgType.source = cachekey(UIConfig.UIConfig_Role.inFormationIcon[1], this);
		}
		this.imgStar1.visible = false;
		let awakeLevel = Game.PlayerHunterSystem.queryHunter(data.generalInfo.id).awakePassive.level;
		Helper.SetHeroAwakenStar(this.groupStar, data.generalInfo.star, awakeLevel);
		Helper.GetBreakLevelToPath(this.imgBreak, Game.PlayerHunterSystem.queryHunter(data.generalInfo.id).break_level);

		this.imgDead.visible = (data.generalInfo.hp == 0);
		let size_bar = getPercentSize(this.barSize, data.generalInfo.rage);
		size_bar = getPercentSize(this.barSize, data.generalInfo.hp);
		this.imgBarHp.width = size_bar.width;
		this.imgGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[Game.PlayerHunterSystem.Table(data.generalInfo.id).aptitude], this);
	}

	public SetDragType(type: number) {
		this.dragType = type;
		if (type == TableEnum.Enum.LeagueWarDragType.ON) {
			egret.Tween.get(this.imgHead, { loop: true })
				.to({ rotation: -5 }, 80, egret.Ease.sineOut)
				.to({ rotation: 5 }, 80, egret.Ease.sineIn)
				.to({ rotation: 5 }, 80, egret.Ease.sineOut)
				.to({ rotation: -5 }, 80, egret.Ease.sineIn);

			this.imgHead.scaleX = this.scaleType.middle;
			this.imgHead.scaleY = this.scaleType.middle;
		}
		else {
			egret.Tween.removeTweens(this.imgHead);
			egret.Tween.get(this.imgHead).to({ rotation: 0, scaleX: 0.8, scaleY: 0.8 }, 80);
		}
	}

	private touchTween() {
		this.data.father.listHero.selectedIndex = this.data.index;
		if (this.data.generalInfo == null) return;
		egret.Tween.get(this.imgHead).to({ scaleX: 1.2, scaleY: 1.2 }, 700);
	}

	public clearTouchTween() {
		if (this.data.generalInfo == null) return;
		if (this.dragType == TableEnum.Enum.LeagueWarDragType.ON) {
			this.imgHead.scaleX = this.scaleType.middle;
			this.imgHead.scaleY = this.scaleType.middle;
		}
		else {
			egret.Tween.removeTweens(this.imgHead);
			this.imgHead.scaleX = 0.8;
			this.imgHead.scaleY = 0.8;
		}
	}
}

export class League_WarBattleLineupItemData {
	index: number;
	father: Wonderland_Formate;
	generalInfo: { level: number, star: number, step: number, battle: number, id: number, hp: number, rage: number, maxHp: number, preBattle: number, isNew: boolean };
	itemType: number;
	noTouch: boolean = true;
}
}