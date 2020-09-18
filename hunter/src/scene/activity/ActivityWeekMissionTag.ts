namespace zj {
/**
 * @author xing li wei
 * 
 * @date 2019-5-6
 * 
 * @class 赏金特训按钮list子项
 */
export class ActivityWeekMissionTag extends eui.ItemRenderer {
	public ButtonTag: eui.Button;
	public SpriteUnopen: eui.Image;
	public SpriteRedIcon: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityWeekMissionTagSkin.exml";
		this.ButtonTag.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnTag, this);
		cachekeys(<string[]>UIResource["ActivityWeekMissionTag"], null);
	}

	protected dataChanged() {
		let data = this.data as ActivityWeekMissionTagData;
		if (data.index == 3) {
			this.SpriteUnopen.source = cachekey(UIConfig.UIConfig_Activity.WeekBuy, this);
			this.SpriteRedIcon.visible = false;
		} else {
			this.SpriteUnopen.source = cachekey(data.father.data[data.index].typeInfo.week_path, this);
		}
		let uiType = Game.PlayerMissionSystem.itemMissionWeek(Game.PlayerMissionSystem.missionActive.missionWeekIndex).week_mission_type;
		Set.ButtonBackgroud(this.ButtonTag, UIConfig.UIConfig_Activity.WeekTypeButton[uiType][0], UIConfig.UIConfig_Activity.WeekTypeButton[uiType][1], UIConfig.UIConfig_Activity.WeekTypeButton[uiType][2]);
	}

	public setInfoTag(id?: number) {
		if (this.data.index == 3) {
			return;
		}
		this.setInfoTips()
	}

	public setSelect(vis: boolean) {
		this.ButtonTag.enabled = !vis;
	}

	private onBtnTag() {
		let data = this.data as ActivityWeekMissionTagData;
		data.father.SetInfoButton(data.index);
	}

	private setInfoTips() {
		let data = this.data as ActivityWeekMissionTagData;
		let bTips = Table.FindF(data.father.data[data.index].state, (k, v) => {
			return v == TableEnum.Enum.NoviceState.REWARD && !data.father.data[data.index].lock;
		});
		this.SpriteRedIcon.visible = bTips;
	}
}
export class ActivityWeekMissionTagData {
	index: number;
	father: weekActBase;
}
}