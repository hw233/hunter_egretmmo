namespace zj {
	//Common_ChangeIcon 个性装扮
	//yuqingchao
	//2019.07.12
	export let _count_per_row = 4;
	export let HeadIcon = 1;
	export let FrameIcon = 2;
	export let CommonFrameType = 1;
	export let VipFrameType = 2;
	export let ActivityFrameType = 3;
	export let NumLevel = 1000;
	export class Common_ChangeIcon extends Dialog {
		private btnClose: eui.Button;
		private scrollerInfo: eui.Scroller;
		private lstTableViewItem: eui.List;
		private btnHead: eui.Button;			//头像按钮
		private groupHead: eui.Group;
		private btnHeadOK: eui.Button;			//使用（头像）
		private lbTipUser: eui.Label;
		private groupAni: eui.Group;			//动画Group
		private btnFrame: eui.Button;			//边框按钮
		private groupFrame: eui.Group;
		private lbWordsFrameMessage: eui.Label;		//边框介绍
		private lbWordsFrameTime: eui.Label;		//剩余时间
		private lbWordsFrameTitle: eui.Label;		//边框名称
		private imgPlayerIcon: eui.Image;			//头像
		private imgFrame: eui.Image;				//头像框
		private btnFrameOK: eui.Button;				//使用（头像框）	
		private btnGet: eui.Button;					//获取

		private idMap: any = null;
		readonly COUNT_PER_ROW: number = 4;
		public static index: number = 1;
		private picId: number = 0;
		public static picType1: number;
		private vis: boolean = false;
		private idRet;
		private CB: Function = null;
		public static iconChange: boolean = false;
		private beforeUsedPicFrame: number = 0;
		private totalFrameListID: number = 0;
		private focusFrameCur: number = 0;
		private idFrameRet: number = 0;
		private frameIdMap: any = [[], [], []];
		private mapIndex: number = 0;
		public constructor() {
			super();
			this.skinName = "resource/skins/common/Common_ChangeIconSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnHead.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHeadOK, this);
			this.btnFrame.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFrame, this);
			this.btnHeadOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this)
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnFrameOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnFrameOK, this);
			Game.EventManager.on("COMMON_CHANGE_ICON_SETPICID", this.setPicId, this);
			Common_ChangeIcon.index = 1;
			Common_ChangeIcon.picType1 = null;
			this.onBtnHeadOK();
			let a = new egret.Event(null);
			a.data = Game.PlayerInfoSystem.BaseInfo.picId
			this.setPicId(a);
		}

		public setCB(cb?, frame?: boolean) {
			this.CB = cb;
		}

		//头像
		private onBtnHeadOK() {
			this.btnHead.currentState = "down";
			this.btnFrame.currentState = "up";
			this.groupHead.visible = true;
			this.groupFrame.visible = false;
			this.loadList(1);
		}

		//头像框
		private onBtnFrame() {
			this.btnFrame.currentState = "down";
			this.btnHead.currentState = "up";
			this.groupFrame.visible = true;
			this.groupHead.visible = false;
			this.LoadFrameSet();
			this.loadList(3);
		}

		public loadList(picType: number) {
			Common_ChangeIcon.picType1 = picType;
			Common_ChangeIcon.iconChange = true;
			if (picType == TableEnum.TableIconListState.GENERAL) {
				this.loadListGENERAL();
				this.scrollerInfo.viewport = this.lstTableViewItem;
				this.scrollerInfo.validateNow();
				this.scrollerInfo.viewport.scrollV = 0;
			} else if (picType == TableEnum.TableIconListState.LEAGUE) {

			} else if (picType == 3) {
				this.loadListFrame();
				this.scrollerInfo.viewport = this.lstTableViewItem;
				this.scrollerInfo.validateNow();
				this.scrollerInfo.viewport.scrollV = 0;
			}
		}

		private itemRendererFunction(source) {
			if (source.listType == "1") {
				return Common_ChangeIconTitleIR;
			} else if (source.listType == "2") {
				return Common_ChangeIconNoneIR;
			} else if (source.listType == "3") {
				return Common_ChangeIconContentIR;
			}
		}

		private itemRendererFunction1(source) {
			if (source.listType == "1") {
				return Common_ChangeIconTitleIR;
			} else if (source.listType == "2") {
				return Common_ChangeIconNoneIR;
			} else if (source.listType == "3") {
				return Common_ChangeIconContentIR;
			}
		}

		private loadListGENERAL() {
			this.idMap = [];
			this.lbTipUser.text = TextsConfig.TextsConfig_User.text_pic_str;

			let picIdsNormal = PlayerItemSystem.GetNormalPic(1);
			let picIdsHigh = PlayerItemSystem.GetHighPic();
			let picIds_trans = PlayerItemSystem.GetTransPic();
			let ICONTYPE = {
				NORMAL: 1,
				HIGH: 2,
				TRANS: 3,
			}

			// let idMap = [];
			//主角
			this.idMap[ICONTYPE.NORMAL] = picIdsNormal;
			//变身头像
			this.idMap[ICONTYPE.HIGH] = picIds_trans;
			//高级头像
			this.idMap[ICONTYPE.TRANS] = picIdsHigh;

			let arrayCollection = new eui.ArrayCollection();
			let index1 = 0;
			for (let i = 0; i < 3; i++) {
				arrayCollection.addItem({ "listType": "1", "iconType": TableEnum.TableIconListState.GENERAL, "father": this, "titleType": i + 1, "changeWidth": true });
				for (let j = 0; j < Math.ceil(this.idMap[i + 1].length / this.COUNT_PER_ROW); j++) {
					let arr: number[] = [];
					let indexArr: number[] = [];
					for (let jk = 0; jk < 4; jk++) {
						let index = j * 4 + jk;
						if (index >= this.idMap[i + 1].length) {
							break;
						}
						indexArr.push(index1 += 1);
						arr.push(this.idMap[i + 1][index]);
					}
					arrayCollection.addItem({ "listType": "3", "iconType": TableEnum.TableIconListState.GENERAL, "picIds": arr, "index": indexArr, "father": this, "i": i, "j": j });
				}
			}
			this.lstTableViewItem.itemRendererFunction = this.itemRendererFunction1;
			this.lstTableViewItem.dataProvider = arrayCollection;
		}

		private loadListFrame() {
			let arrayCollection = new eui.ArrayCollection();
			let index1: number = 0;
			for (let i = this.FRAMETYPE.NORMAL; i < this.FRAMETYPE.ACTIVITY + 1; i++) {
				//添加标题
				if (this.frameIdMap[i].length == 0) {

				} else {
					arrayCollection.addItem({ "listType": "1", "iconType": 3, "father": this, "titleType": i + 1, "changeWidth": true });
					for (let j = 0; j < Math.ceil(this.frameIdMap[i].length / this.COUNT_PER_ROW); j++) {
						let arr: number[] = [];
						let indexArr: number[] = [];
						for (let jk = 0; jk < 4; jk++) {
							let index = j * 4 + jk;
							if (index >= this.frameIdMap[i].length) {
								break;
							}
							indexArr.push(index1 += 1);
							arr.push(this.frameIdMap[i][index]);
						}
						arrayCollection.addItem({ "listType": "3", "iconType": 3, "picIds": arr, "index": indexArr, "father": this, "i": i, "j": j });
					}
				}
			}
			this.lstTableViewItem.itemRendererFunction = this.itemRendererFunction;
			this.lstTableViewItem.dataProvider = arrayCollection;
		}

		private FRAMETYPE = {
			NORMAL: 0,
			VIP: 1,
			ACTIVITY: 2,
		}
		private LoadFrameSet() {
			let indexFrameMap = [];

			let info = Game.ConfigManager.getTable(StringConfig_Table.itemFrame + ".json");
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.vipWeal + ".json");

			let chargeList = [];
			for (let kk in tbl) {
				let vv = tbl[kk];
				if (Game.PlayerInfoSystem.BaseInfo.chargeToken >= vv.sum) {
					chargeList.push(vv);
				}
			}
			let frameMap: any = [];
			this.frameIdMap = [[], [], []];
			for (let k in chargeList) {
				let v = chargeList[k];
				if (chargeList[k].picFrame_id == 0) {
					chargeList[k].picFrame_id = 150001
				}
				frameMap.push(chargeList[k].picFrame_id);
			}
			let sortFunc = function (a, b) { info[a].order < info[b].order }
			frameMap.sort(sortFunc);
			for (let k in frameMap) {
				let v = frameMap[k];
				let frame = 0;
				frame = v;
				if (this.GetInPart(info[v].order) == CommonFrameType) {
					this.frameIdMap[this.FRAMETYPE.NORMAL].push(frame);
				}
				else if (this.GetInPart(info[v].order) == VipFrameType) {
					this.frameIdMap[this.FRAMETYPE.VIP].push(frame);
				}
				else {
					this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
				}
			}
			for (let k in info) {
				let v = info[k];
				let frame = 0;
				frame = Number(k);
				if (this.GetInPart(info[k].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
					for (let kk in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
						let vv = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kk];
						if (frame == vv.key && vv.value > Date.parse(Game.Controller.serverNow().toString())) {
							this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
							this.frameIdMap[this.FRAMETYPE.ACTIVITY].sort(sortFunc);
						}
					}
				}
			}
			for (let k in info) {
				let v = info[k];
				let frame = 0;
				frame = Number(k);
				let toCheck = true;
				if (this.GetInPart(info[k].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
					this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
					this.frameIdMap[this.FRAMETYPE.ACTIVITY].sort(sortFunc);
				} else if (this.GetInPart(info[k].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
					for (let kk in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
						let vv = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kk];
						if (frame == vv.key && vv.value < Date.parse(Game.Controller.serverNow().toString()) && toCheck) {
							this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
							toCheck = false;
						} else {
							if (toCheck) {
								let hasFrameIdList: any = [];
								for (let kkk in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
									let vvv = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[kkk];
									if (vvv.value > Date.parse(Game.Controller.serverNow().toString()) + 1) {
										hasFrameIdList.push(vvv.key);
									}
								}
								hasFrameIdList.sort(sortFunc);
								if (!Table.VIn(hasFrameIdList, frame)) {
									this.frameIdMap[this.FRAMETYPE.ACTIVITY].push(frame);
									toCheck = false;
								}
							}
						}
					}
				}
			}
			let header_pic_id: string = "" + Game.PlayerInfoSystem.BaseInfo.picId;
			let header_pic_frame: string = "" + Game.PlayerInfoSystem.BaseInfo.picFrameId;
			let item_pic = TableItemPic.Item(header_pic_id);
			if (item_pic) {
				this.imgPlayerIcon.source = cachekey(item_pic.path, this);
			}
			let item_frame = TableItemPicFrame.Item(header_pic_frame);
			if (item_frame) {
				this.imgFrame.source = cachekey(item_frame.path, this);
			}

			this.totalFrameListID = 0;
			let find: boolean = false;
			for (let i = 0; i < this.frameIdMap.length; i++) {
				for (let k = 0; k < this.frameIdMap[i].length; k++) {
					if (Game.PlayerInfoSystem.BaseInfo.picFrameId != this.frameIdMap[i][k] && !find) {
						this.totalFrameListID = this.totalFrameListID + 1;
					} else {
						find = true;
					}
				}
			}
			this.focusFrameCur = this.totalFrameListID;
			this.FreshFrameFocus(this.focusFrameCur, Game.PlayerInfoSystem.BaseInfo.picFrameId);
			this.btnGet.visible = false;
			this.btnFrameOK.visible = false;
		}

		private FreshFrameFocus(index, id) {
			this.idFrameRet = id;
			this.focusFrameCur = index;
			this.SetFrameInfo();
		}

		private SetFrameInfo() {
			if (this.beforeUsedPicFrame != null && this.beforeUsedPicFrame != Game.PlayerInfoSystem.BaseInfo.picFrameId) {
				this.beforeUsedPicFrame = Game.PlayerInfoSystem.BaseInfo.picFrameId;
				this.LoadFrameSet();
			};
			let path_frame = TableItemPicFrame.Item(this.idFrameRet);
			let info = Game.ConfigManager.getTable(StringConfig_Table.itemFrame + ".json");
			let isGet: boolean = true;
			if (this.GetInPart(info[this.idFrameRet].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
				isGet = false
			} else if (this.GetInPart(info[this.idFrameRet].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
				let hasFrameIdList = [];
				for (let k in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
					let v = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
					if (v.value > Date.parse(Game.Controller.serverNow().toString()) / 1000) {
						hasFrameIdList.push(v.key);
					}
				}
				if (!Table.VIn(hasFrameIdList, this.idFrameRet)) {
					isGet = false;
				}

			}
			let curTime = 0;
			if (this.GetInPart(info[this.idFrameRet].order) != ActivityFrameType) {
				curTime = info[this.idFrameRet].overdue_time;
			}
			else if (isGet) {
				for (let k in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
					let v = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
					if (v.key == this.idFrameRet) {
						curTime = v.value - Date.parse(Game.Controller.serverNow().toString()) / 1000;
					}
				}
			}

			let ret = Math.floor(curTime / ((3600 * 24) * 365))
			if (ret > 1) {
				this.lbWordsFrameTime.textFlow = Util.RichText(TextsConfig.TextsConfig_User.frameTime);
			} else {
				this.lbWordsFrameTime.textFlow = Util.RichText(this.upToTime(curTime));
			}

			this.lbWordsFrameTitle.text = info[this.idFrameRet].name;
			this.lbWordsFrameMessage.text = info[this.idFrameRet].extra;
			this.beforeUsedPicFrame = Game.PlayerInfoSystem.BaseInfo.picFrameId;
			this.imgFrame.source = cachekey(path_frame.path, this);
			this.btnFrameOK.visible = isGet && this.idFrameRet != Game.PlayerInfoSystem.BaseInfo.picFrameId;
			this.btnGet.visible = !isGet;
		}

		private upToTime(time: number) {
			let str;
			let day = Math.floor(time / 86400);
			let hour = Math.floor((time % 86400) / 3600);
			let min = Math.floor(((time % 86400) % 3600) / 60);
			let sec = ((time % 86400) % 3600) / 60 / 60;
			if (day == 0) {
				if (hour == 0) {
					if (min == 0) {
						if (sec == 0) {
							str = TextsConfig.TextsConfig_Gift.upToTime2[4];
						} else {
							str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime2[3], 1);
						}
					} else {
						str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime2[3], min);
					}
				} else {
					str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime2[2], hour, min);
				}
			} else {
				str = Helper.StringFormat(TextsConfig.TextsConfig_Gift.upToTime2[1], day, hour, min);
			}
			return str;
		}

		private freshFocus(id) {
			let mapRole_id = TableItemPic.Item(id).mapRole_id;
			let bodySpxtbl = TableMapRole.Item(mapRole_id);
			if (bodySpxtbl != null) {
				let bodySpxId = bodySpxtbl.body_spx_id
				let scale = bodySpxtbl.spine_scale
				if (bodySpxId != -1) {
					let tbl = Game.ConfigManager.getTable(StringConfig_Table.hunter_ani_spine + ".json");
					this.addAnimatoin(tbl[bodySpxId].atlas, tbl[bodySpxId].ani_name, 0, this.groupAni);
					this.groupAni.scaleX = this.groupAni.scaleY = scale;
				}
			}
		}

		//添加龙骨动画
		private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
			Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
				.then(display => {
					this.groupAni.removeChildren();
					display.x = group.explicitWidth / 2 + 1;
					display.y = group.explicitHeight / 2;
					group.addChild(display);
					display.scaleX = 0.8;
					display.scaleY = 0.8;
				})
				.catch(reason => {
					toast(reason);
				});
		}

		private onBtnConfirm() {
			if (this.CB != null) this.CB(this.picId, false);
			this.close(UI.HIDE_TO_TOP);
		}

		private onBtnFrameOK() {
			if (this.CB != null) this.CB(this.picId, true);
			this.close(UI.HIDE_TO_TOP);
		}

		private onBtnGet() {
			loadUI(Common_OutPutDialog)
				.then((dialog: Common_OutPutDialog) => {
					dialog.setInfo(this.idFrameRet, this);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		}

		private setPicId(ev: egret.Event) {
			this.picId = <number>ev.data;
			if (this.groupHead.visible == true) {
				this.freshFocus(Number(this.picId));
			} else if (this.groupFrame.visible == true) {
				this.FreshFrameFocus(this.focusFrameCur, this.picId);
			}
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
		private FreshFocus(index, id, vis) {
			this.idRet = id;
			this.vis = vis;
		}
		private GetInPart(num) {
			return num / NumLevel - num / NumLevel % 1;
		}
	}
}