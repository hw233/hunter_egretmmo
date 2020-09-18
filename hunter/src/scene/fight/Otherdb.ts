namespace zj {
export class Otherdb {
	public constructor() {
	}
	public static reward_power_time = [14400, 43200, 72000];

	public static GetTitleFightSkill(titleId) {
		let result = [];
		if (titleId == 0 || titleId == -1) {
			return;
		}
		let tbl = TableItemTitle.Table();
		if (tbl[titleId] != null) {
			let ret = { skillId: tbl[titleId].skill_normal, skillLevel: 1 };
			result.push(ret);
		}
		return result;
	}

	public static getErrorString(result) {
		let tableError = TableClientError.Table();
		if (result == null) {
			return Helper.StringFormat("error");
		} else if (tableError[result] == null) {
			return Helper.StringFormat("%s[%d]", TextsConfig.TextsConfig_Common.unknownError, result);
		} else if (tableError[result].des_custom != "") {
			return Helper.StringFormat("%s[%d]", tableError[result].des_custom, result);
		} else {
			return Helper.StringFormat("%s[%d]", tableError[result].des_default, result);
		}
	}

	public static MissionGeneral(id): TableMissionGeneral {
		if (id == undefined || id == null) return null;
		return TableMissionGeneral.Item(id);
	}

	public static FundReward(): boolean {
		return false;
	}

	public static GetActivityInShow(activityType, index) {
		let allShowActivity = PlayerActivitySystem.GetActivityUI()

		let find = Table.FindF(allShowActivity, (_k, _v) => {
			return _v.type == activityType && _v.index == index
		});
		return find;
	}
	//和平仙境在采集阶段未采集
	public static inPeaceWonderlandNotPick(id) {
		let quantum = null;
		let hour = Set.TimeFormatBeijing().getHours();
		for (let k = 0; k < Otherdb.reward_power_time.length; k++) {
			let v = Otherdb.reward_power_time[k];
			if (hour >= Math.floor(v / 3600)) {
				quantum = k;
			}
		}
		if ((quantum == null) && hour < (Otherdb.reward_power_time[0] / 3600)) {
			quantum = Otherdb.reward_power_time.length;
		}
		if (quantum == null) {
			return false;
		}
		let find = Table.FindFCall(Game.PlayerMixUnitInfoSystem.mixunitinfo.collectionFruit, function (k, v) {
			return v.key-1 == quantum && v.value == id;
		}, this);
		return !find;
	}
	public static inPeaceWonderlandLastTime() {
		let time = Set.TimeFormatBeijing();
		let quantum = null;
		let hour = time.getHours();
		for (let k = 0; k < Otherdb.reward_power_time.length; k++) {
			let v = Otherdb.reward_power_time[k];
			if (hour >= Math.floor(v / 3600)) {
				quantum = k;
			}
		}
		if ((quantum == null) && hour < Math.floor(Otherdb.reward_power_time[0] / 3600)) {
			quantum = Otherdb.reward_power_time.length;
		}
		if (quantum == null) {
			return "";
		}
		let nextQuanTum = (quantum % Otherdb.reward_power_time.length);
		let nextTimeHour = Otherdb.reward_power_time[nextQuanTum]
		let minusTime = (nextTimeHour + 24 * 3600 - (time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds())) % (24 * 3600)
		let _str = Helper.FormatMsTime3(minusTime);
		let _tmp = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_mature_time_label, _str);
		return _tmp;
	}

}
}