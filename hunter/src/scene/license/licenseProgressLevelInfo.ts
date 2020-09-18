namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-3-20
 * 
 * @class 执照主界面几星猎人list子项
 */
export class licenseProgressLevelInfo extends eui.ItemRenderer {
	public btnHunterLicence: eui.Button;
	public imgRedIcon: eui.Image;
	public imgGet: eui.Image;
	public constructor() {
		super();
		this.skinName = "resource/skins/license/licenseProgressLevelInfoSkin.exml";
		cachekeys(<string[]>UIResource["licenseProgressLevelInfo"], null);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.down, this);
	}
	/** 修改数据源被动执行*/
	protected dataChanged() {
		let data = this.data as licenseProgressLevelInfoData;
		this.imgRedIcon.visible = false;
		let infos = TableMissionType.Table();
		for (let kk in infos) {
			if (infos.hasOwnProperty(kk)) {
				let vv = infos[kk];
				if (data.type == 1 && vv.type == message.MissionType.MISSION_TYPE_LICENCE) {
					let list = Game.PlayerMissionSystem.GetItemMissionId(vv.index);
					let list_1 = Game.PlayerMissionSystem.GetMaxCondition(vv.index);
					let star = Game.PlayerMissionSystem.GetMaxStar(vv.index);
					let info = Game.PlayerMissionSystem.missionMap[vv.index];
					let starId = Game.PlayerMissionSystem.itemSubType(vv.index).start_id;
					let tbl = Game.PlayerMissionSystem.itemInfo(starId + data.index);
					let subId = Game.PlayerMissionSystem.itemSubType(vv.index).sub_type;
					let value = info.value;
					let start = starId + data.index;
					let max = 0;
					if (subId == 55 || subId == 69) {
						value = info.value % 10000;
					} else if (subId == 3) {
						if (info.valueEx.length == 0) {
							value = 0;
						} else {
							let IsHave;
							for (var k in list) {
								if (list.hasOwnProperty(k)) {
									var v = list[k];
									IsHave = Table.FindF(info.valueEx, (k1, v1) => {
										return v.condition == v1;
									})
								}
							}
							if (IsHave == true || IsHave == null) {
								for (var kkk in info.valueEx) {
									if (info.valueEx.hasOwnProperty(kkk)) {
										var vvv = info.valueEx[kkk];
										if (vvv > max) {
											max = vvv;
											value = max;
										}
									}
								}
							} else {
								for (var k0 in list_1) {
									if (list_1.hasOwnProperty(k0)) {
										var v0 = list_1[k0];
										if (v0.id > max) {
											max = v0.id;
											value = v0.condition;
										}
									}
								}
							}
						}
					}
					if (value >= tbl.condition && info.missionId < start && data.index <= star) {
						this.imgRedIcon.visible = true;
					} else if (value >= tbl.condition && info.missionId == start && data.index <= star && info.isFinish == false) {
						this.imgRedIcon.visible = true;
					}
				} else if (data.type == 2 && vv.type == message.MissionType.MISSION_TYPE_HIGH_LICENCE) {
					let starHighId = Game.PlayerMissionSystem.itemSubType(vv.index).start_id
					let Hightbl = Game.PlayerMissionSystem.itemInfo(starHighId + data.index)
					let infoH = Game.PlayerMissionSystem.missionMap[vv.index]
					let valueH = infoH.value
					let starIdH = Game.PlayerMissionSystem.itemSubType(vv.index).start_id
					let startH = starIdH + data.index;
					let starH = Game.PlayerMissionSystem.GetMaxStar(vv.index)
					let subId = Game.PlayerMissionSystem.itemSubType(vv.index).sub_type
					if (subId == 69) {
						valueH = infoH.value % 10000;
					}
					if (valueH >= Hightbl.condition && infoH.missionId < startH && data.index <= starH - 1) {
						this.imgRedIcon.visible = true;
					} else if (valueH >= Hightbl.condition && infoH.missionId == startH && data.index <= starH && !infoH.isFinish) {
						this.imgRedIcon.visible = true;
					}
				}
			}
		}
		this.setScale();
	}

	private setScale() {
		let data = this.data as licenseProgressLevelInfoData;
		this.btnHunterLicence.scaleX = 1;
		this.btnHunterLicence.scaleY = 1;
		if (data.type == 1) {
		if (data.index + 1 <= Game.PlayerMissionSystem.missionActive.licence) {
			if (data.index + 1 == data.father.focusCur) {
				this.btnHunterLicence.scaleX = 1.2;
				this.btnHunterLicence.scaleY = 1.2;
				Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonSel[this.data.index + 1]);
			} else {
				this.btnHunterLicence.scaleX = 1;
				this.btnHunterLicence.scaleY = 1;
				Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonNum[this.data.index + 1]);
			}
			this.imgGet.visible = true;
		} else {
			if (data.index + 1 == data.father.focusCur) {
				this.btnHunterLicence.scaleX = 1.2;
				this.btnHunterLicence.scaleY = 1.2;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonDis[data.index + 1]);
			} else {
				this.btnHunterLicence.scaleX = 1;
				this.btnHunterLicence.scaleY = 1;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonLock[data.index + 1]);
			}
			this.imgGet.visible = false;
			}
		} else {
			if (data.index + 1 + CommonConfig.licence_max_level <= Game.PlayerMissionSystem.missionActive.licence) {
				if (data.index + 1 == data.father.focusCurH) {
					this.btnHunterLicence.scaleX = 1.2;
					this.btnHunterLicence.scaleY = 1.2;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonHighSel[data.index + 1]);
				} else {
					this.btnHunterLicence.scaleX = 1;
					this.btnHunterLicence.scaleY = 1;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonHighNum[data.index + 1]);
				}
				this.imgGet.visible = true;
			} else {
				if (data.index + 1 == data.father.focusCurH) {
					this.btnHunterLicence.scaleX = 1.2;
					this.btnHunterLicence.scaleY = 1.2;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonHighDis[this.data.index + 1]);
				} else {
					this.btnHunterLicence.scaleX = 1;
					this.btnHunterLicence.scaleY = 1;
					Set.ButtonBackgroud(this.btnHunterLicence, UIConfig.UIConfig_Task.buttonHighLock[this.data.index + 1]);
				}
				this.imgGet.visible = false;
			}
		}
	}

	public down() {
		let data = this.data as licenseProgressLevelInfoData;
		let licenseId
		if (data.type == 1) {
		if (this.data.index + 1 == this.data.father.focusCur) {
			return;
		}
			licenseId = Game.PlayerMissionSystem.SetExamination(this.data.index + 1);
		this.data.father.setSelect(this.data.index + 1, licenseId.length == 4);
		} else if (data.type == 2) {
			if (this.data.index + 1 == this.data.father.focusCurH) {
				return;
			}
			licenseId = Game.PlayerMissionSystem.SetExaminationHigh(this.data.index + 1);
			this.data.father.setSelectH(this.data.index + 1, licenseId.length == 4);
		}
	}
}
export class licenseProgressLevelInfoData {
	index: number;
	father: licenseMain;
	isSel: boolean;
	type: number;
}
}