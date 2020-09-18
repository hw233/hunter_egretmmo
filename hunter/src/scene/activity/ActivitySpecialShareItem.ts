namespace zj {
	/**
	 * @class ActivitySpecislShareItem 邀请好友Item
	 * 
	 * @author Yu Qingchao
	 * 
	 * 2019.07.30
	 */
	enum ShareTaskType {
		SHARE_TASK_TYPE_NONO = 0,			// 未知类型
		SHARE_TASK_TYPE_CREATE_ROLE = 1,	// 创建角色
		SHARE_TASK_TYPE_SIX_STAR = 2,		// 拥有6星猎人
		SHARE_TASK_TYPE_FIRST_CHARGE = 3,	// 首充奖励
		SHARE_TASK_TYPE_END = 4,			// 未知类型
	}
	export class ActivitySpecialShareItem extends eui.ItemRenderer {
		private lbTaskDesciotion: eui.Label;
		private groupBar: eui.Group;
		private imgBar: eui.Image;
		private rectMask: eui.Image; // 经验条遮罩
		private imgBox0: eui.Image;
		private imgBox1: eui.Image;
		private imgBox2: eui.Image;
		private imgBox3: eui.Image;
		private imgGet0: eui.Image;
		private imgGet1: eui.Image;
		private imgGet2: eui.Image;
		private imgGet3: eui.Image;
		private lbNum0: eui.Label;
		private lbNum1: eui.Label;
		private lbNum2: eui.Label;
		private lbNum3: eui.Label;

		private index: number = 0;
		private father: any = null;
		private shareInfo: any = null;
		private PERCENT_BAR = 0.25;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivitySpecislShareItemSkin.exml";
			this.init();
		}
		private init() {
			this.rectMask = Util.getMaskImgBlack(this.imgBar.width, this.imgBar.height);
			this.rectMask.verticalCenter = 0;
			this.rectMask.left = 7;
			this.rectMask.visible = false;
			this.groupBar.addChild(this.rectMask);

			for (let i = 0; i < 4; i++) {
				this[`imgGet${i}`].visible = false;
			}
			this.imgBox0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox0, this);
			this.imgBox1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox1, this);
			this.imgBox2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox2, this);
			this.imgBox3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onImgBox3, this);
		}

		private mixUnitInfo;
		private shareCount;
		private shareReceive;

		private SetData() {
			this.mixUnitInfo = Game.PlayerMixUnitInfoSystem.mixunitinfo;
			this.shareCount = {
				[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE]: this.mixUnitInfo.share_role_create_count,
				[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR]: this.mixUnitInfo.share_role_six_star_count,
				[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE]: this.mixUnitInfo.share_role_first_charge_count
			};
			this.shareReceive = {
				[message.ShareTaskType.SHARE_TASK_TYPE_CREATE_ROLE]: this.mixUnitInfo.share_role_create_gift,
				[message.ShareTaskType.SHARE_TASK_TYPE_SIX_STAR]: this.mixUnitInfo.share_role_six_star_gift,
				[message.ShareTaskType.SHARE_TASK_TYPE_FIRST_CHARGE]: this.mixUnitInfo.share_role_first_charge_gift
			};
		}
		private InitTips() {
			this.shareInfo = Table.DeepCopy(Game.PlayerActivitySystem.shareInfo);
			this.lbTaskDesciotion.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.shareNumStr[this.index], this.shareCount[this.index + 1])
		}
		protected dataChanged() {
			this.index = this.data.i;
			this.father = this.data.father;
			this.SetData();
			this.InitTips();
			this.SetAwardBoxStatus();
			this.SetScheduleStatus();
		}
		private onImgBox0() {
			this.InitButtonEvent(0);
		}
		private onImgBox1() {
			this.InitButtonEvent(1);
		}
		private onImgBox2() {
			this.InitButtonEvent(2);
		}
		private onImgBox3() {
			this.InitButtonEvent(3);
		}
		private InitButtonEvent(id) {
			let ButtonEvent = () => {
				getTag = Math.floor(arrSetTag[id] / 10);
				let type = arrSetTag[id] - getTag * 10 + 1;
				if (getTag > this.shareCount[type]) {
					bReceive = false;
				} else {
					for (let k in this.shareReceive[type]) {
						let v = this.shareReceive[type][k];
						if (getTag == v) {
							bReceive = false;
							break;
						}
					}
				}
				if (bReceive) {
					Game.PlayerActivitySystem.ShareTaskReward(type, getTag).then((msg: message.GameInfo) => {
						this.SetData();
						this.SetScheduleStatus();
						this.SetAwardBoxStatus();
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(msg.getGoods);
								dialog.show();
							})
					}).catch(reason => { console.log("req:", reason); });
				} else {
					let arrGoodsinfo = [];
					for (let kk in this.shareInfo[this.index]) {
						let vv = this.shareInfo[this.index][kk];
						let goodsinfo = [];
						for (let i = 0; i < vv[1].length; i++) {
							let info = new message.GoodsInfo();
							info.goodsId = vv[1][i];
							info.count = vv[2][i];
							goodsinfo.push(info);
						}
						arrGoodsinfo.push(goodsinfo);
					}
					loadUI(Daily_AwardPop)
						.then((dialog: Daily_AwardPop) => {
							Game.EventManager.event(GameEvent.ACTIVITY_TYPE_UPDATE);
							dialog.SetInfoGift(arrGoodsinfo[id], null, null);
							dialog.show(UI.SHOW_FROM_TOP);
						});
				}
			}

			let setTag: number = 0;
			let getTag: number = 0;
			let arrSetTag = [];
			let bReceive = true;
			for (let k in this.shareInfo[this.index]) {
				let v = this.shareInfo[this.index][k];
				setTag = v[0] * 10 + this.index;
				arrSetTag.push(setTag);
			}
			ButtonEvent();

		}
		private SetAwardBoxStatus() {
			let nReceiveStatus = 0;
			let bReceive = true;
			for (let k in this.shareInfo[this.index]) {
				let v = this.shareInfo[this.index][k];
				if (this.shareCount[this.index + 1] >= v[0]) {
					nReceiveStatus = 0;
					bReceive = true;
					for (let kk in this.shareReceive[this.index + 1]) {
						let vv = this.shareReceive[this.index + 1][kk];
						if (v[0] == vv) {
							nReceiveStatus = 1;
							bReceive = false;
						}
					}
				} else {
					nReceiveStatus = 0;
					bReceive = false;
				}
				this[`lbNum${k}`].text = v[0];
				this[`imgGet${k}`].visible = bReceive;
				this[`imgBox${k}`].source = UIConfig.UIConfig_Special.shareBox[k][nReceiveStatus];
			}
		}
		/**进度条遮罩设置*/
		private SetScheduleStatus() {
			let percent = 0;
			let lastNum = 0;
			for (let k in this.shareInfo[this.index]) {
				let v = this.shareInfo[this.index][k];
				if (this.shareCount[this.index + 1] >= v[0]) {
					percent = percent + this.PERCENT_BAR;
				} else {
					percent = percent + (this.shareCount[this.index + 1] - lastNum) / (v[0] - lastNum) * this.PERCENT_BAR;
					break;
				}
				lastNum = v[0];
			}
			//经验条
			this.rectMask.visible = true;
			this.rectMask.width = this.imgBar.width * percent;
			this.imgBar.mask = this.rectMask;
		}
	}
}