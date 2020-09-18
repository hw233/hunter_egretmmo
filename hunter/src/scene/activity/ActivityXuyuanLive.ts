namespace zj {
//ActivityXuyuanLive
// yuqingchao
// 2019.05.09
export class ActivityXuyuanLive extends Dialog {
	private groupCache: eui.Group;
	private active;
	private btnClose: eui.Button;			//关闭
	private lbCore: eui.Label;				//当前可用Star数量
	private lbCount: eui.Label;				//累计获得Star数量
	private lstViewTask: eui.List;
	private arrayCollection: eui.ArrayCollection;

	private imgBar: eui.Image;				//进度条
	private rectMask: eui.Image;
	private groupBar: eui.Group;
	private lbTag0: eui.Label;				//各奖励所需Star数量
	private lbTag1: eui.Label;				//各奖励所需Star数量
	private lbTag2: eui.Label;				//各奖励所需Star数量
	private lbTag3: eui.Label;				//各奖励所需Star数量	
	private lbTag4: eui.Label;				//各奖励所需Star数量

	private groupLight0: eui.Group;
	private groupLight1: eui.Group;
	private groupLight2: eui.Group;
	private groupLight3: eui.Group;
	private groupLight4: eui.Group;

	private imgBag0: eui.Image;
	private imgBag1: eui.Image;
	private imgBag2: eui.Image;
	private imgBag3: eui.Image;
	private imgBag4: eui.Image;

	private groupClip0: eui.Group;
	private groupClip1: eui.Group;
	private groupClip2: eui.Group;
	private groupClip3: eui.Group;
	private groupClip4: eui.Group;

	private imgFrame0: eui.Image;
	private imgFrame1: eui.Image;
	private imgFrame2: eui.Image;
	private imgFrame3: eui.Image;
	private imgFrame4: eui.Image;

	private imgGet0: eui.Image;				//已领取Image
	private imgGet1: eui.Image;				//已领取Image
	private imgGet2: eui.Image;				//已领取Image
	private imgGet3: eui.Image;				//已领取Image
	private imgGet4: eui.Image;				//已领取Image

	private groupDown0: eui.Group;
	private groupDown1: eui.Group;
	private groupDown2: eui.Group;
	private groupDown3: eui.Group;
	private groupDown4: eui.Group;

	private lbNum0: eui.Label;				//宝箱数量
	private lbNum1: eui.Label;				//宝箱数量
	private lbNum2: eui.Label;				//宝箱数量
	private lbNum3: eui.Label;				//宝箱数量
	private lbNum4: eui.Label;				//宝箱数量

	public curTopicInfo: any;
	private percent: number = null;
	private count: number = null;
	/**用于赋值奖励详情界面有利于界面移除 */
	public commonDesSkill = null;
	/**判断奖励详情界面是否已加载进界面 */
	public commonDesSkillvis: boolean = false;
	private touchID: number = 0;
	private displayAnimatoin = null; // 添加龙骨动画
	private father: ActivityXuyuanBoom;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanLiveSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.groupDown0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup0, this)
		this.groupDown1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup1, this)
		this.groupDown2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup2, this)
		this.groupDown3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup3, this)
		this.groupDown4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGroup4, this)
			this.groupDown0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin1, this)
			this.groupDown1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin2, this)
			this.groupDown2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin3, this)
			this.groupDown3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin4, this)
			this.groupDown4.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin5, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this)
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.up, this)
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			let displayAnimatoin = this.displayAnimatoin;
			this.displayAnimatoin = null;
			this.father = null;
			if (displayAnimatoin && displayAnimatoin.parent) {
				displayAnimatoin.parent.removeChild(displayAnimatoin);
			}

		}, null);
	}
	public init(father: ActivityXuyuanBoom) {
		this.father = father;
		this.rectMask = Util.getMaskImgBlack(this.imgBar.width, this.imgBar.height);
		this.rectMask.verticalCenter = 0;
		this.rectMask.visible = false;
		this.groupBar.addChild(this.rectMask);
		let activityCount = 5;
		let xuyuanTbl = Game.ConfigManager.getTable(StringConfig_Table.xuyuan_random + ".json");         //读表
		let len = Object.keys(xuyuanTbl).length;
		let index = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_XUYUAN].info % len;
		index = index == 0 && len || index;
		this.curTopicInfo = xuyuanTbl[index];
		for (let i = 0; i < activityCount; i++) {
			let itemSet = PlayerItemSystem.Set(this.curTopicInfo.step_reward[i][0], 1, this.curTopicInfo.step_reward[i][1]);

			this[`groupClip${i}`].removeChildren();
			this[`lbTag${i}`].text = this.curTopicInfo.step_score[i];
			this[`imgBag${i}`].source = cachekey(itemSet.Clip, this);
			this[`imgFrame${i}`].source = cachekey(itemSet.Frame, this);
			this[`imgGet${i}`].visible = false;
			this[`groupDown${i}`].visible = true;
			this[`lbNum${i}`].text = this.curTopicInfo.step_reward[i][1];
		}
		for (let i = 0; i < 5; i++) {
			// Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", null, 0)
			// 	.then(display => {
			// 		this[`groupClip${i}`].addChild(display);
			// 	});
			this[`groupClip${i}`].removeChildren();
			this.displayAnimatoin = null;
			this.addAnimatoin("ui_tongyong_daojuguang", "001_daojuguang_02", 0, this[`groupClip${i}`]);
			this.touchID = i;
		}

		this.setInfoLive();
		this.setInfoScoreList();
	}
	//添加龙骨动画
	private addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
		Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
			.then(display => {
				display.x = group.explicitWidth / 2 + 1;
				display.y = group.explicitHeight / 2;
				group.addChild(display);
				display.scaleX = 0.8;
				display.scaleY = 0.8;
				this.displayAnimatoin = display;
			})
			.catch(reason => {
			});
	}
	private setInfoLive() {
		let score = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
		this.lbCount.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Egg_Random.score, score);
		let ratio = [20, 40, 60, 80, 100];
		let curKey = 4;
		for (let k in this.curTopicInfo.step_score) {
			let v = this.curTopicInfo.step_score[k];
			if (Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore < v) {
				let num = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore;
				curKey = Number(k);
				break;
			}
		}
		let per = 1;
		if (curKey == 0) {
			per = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore / this.curTopicInfo.step_score[curKey] * 20;
			if (per > 100) {
				per = 100;
			}
		}
		else {
			per = ratio[curKey - 1] + ((Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_allScore - this.curTopicInfo.step_score[curKey - 1]) / (this.curTopicInfo.step_score[curKey] - this.curTopicInfo.step_score[curKey - 1])) * 20;
			if (per > 100) {
				per = 100;
			}
		}
		this.count = this.curTopicInfo.step_score.length;
		this.rectMask.visible = true;
		this.percent = per / 100;
		this.rectMask.width = this.imgBar.width * per / 100;
		this.imgBar.mask = this.rectMask;

		for (let k in Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone) {
			let v = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone[k];
			this[`imgGet${v}`].visible = true;
		}
		for (let i = 0; i < 5; i++) {
			if ((this.percent * this.count) - 1 >= i) {
				if (!this[`imgGet${i}`].visible) {
					this[`groupLight${i}`].removeChildren();
					Game.DragonBonesManager.playAnimation(this, "ui_tongyong_lingqu", "armatureName", null, 0)
						.then(display => {
							this[`groupLight${i}`].addChild(display);
						});
				}
			}
		}
	}
	private onGroup0(e: egret.TouchEvent, i: number = 0) {
		this.setInfoButtonRewardClick(e, i)
	}
	private onGroup1(e: egret.TouchEvent, i: number = 1) {
		this.setInfoButtonRewardClick(e, i)
	}
	private onGroup2(e: egret.TouchEvent, i: number = 2) {
		this.setInfoButtonRewardClick(e, i)
	}
	private onGroup3(e: egret.TouchEvent, i: number = 3) {
		this.setInfoButtonRewardClick(e, i)
	}
	private onGroup4(e: egret.TouchEvent, i: number = 4) {
		this.setInfoButtonRewardClick(e, i)
	}
	private setInfoButtonRewardClick(e: egret.TouchEvent, i) {
		if ((this.percent * this.count) - 1 >= i) {
			if (!this[`imgGet${i}`].visible) {
				let hasBought = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_freeZone, function (k, v) {
					return v == i;
				})
				this.xuyuanStepReqBody_Visit(i).then((data: message.XuyuanStepRewardResponse) => {
					if (data.header.result == 0) {
						this[`groupLight${i}`].removeChildren();
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(data.body.gameInfo.getGoods);
								dialog.show();
								dialog.setCB(() => { this.setInfoLive() })
							});

					}
				})
			}
		}
	}
	private setInfoScoreList() {
		let goods = [];
		for (let k in this.curTopicInfo.exchange_goods) {
			let v = this.curTopicInfo.exchange_goods[k];
			let good = new message.GoodsInfo();
			good.goodsId = v[0];
			good.count = v[1];
			goods.push(good);
		}
		let lcTbl = Table.DeepCopy(goods);
		let fix = PlayerItemSystem.FixCount(goods.length, 8, 4);
		for (let i = 0; i < fix; i++) {
			let good = new message.GoodsInfo();
			good.goodsId = 0;
			good.count = 0;
			goods.push(good);
		}
		this.arrayCollection = new eui.ArrayCollection();
		for (let i = 0; i < goods.length; i++) {
			this.arrayCollection.addItem({
				i,
				info: goods[i],
				father: this,
			});
		}
		this.lstViewTask.dataProvider = this.arrayCollection;
		this.lstViewTask.itemRenderer = ActivityXuyuanLiveItem;
		this.refreshScoreList();
	}
	public refreshScoreList() {
		let curScore = Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_currentScore;
		this.lbCore.text = curScore.toString();
	}
	private onBtnClose() {
		this.father.OnAbovePop();
		this.close(UI.HIDE_TO_TOP);
	}

	private xuyuanStepReqBody_Visit(step_id: number) {
		return new Promise((resolve, reject) => {
			let request = new message.XuyuanStepRewardRequest();
			request.body.step_id = step_id;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.XuyuanStepRewardResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					console.log(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve(response);
				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false, true);
			return;
		});
	}
		private onTouchBegin1(e: egret.TouchEvent,) {
			this.onChooseItemTap(e, 0);
		}
		private onTouchBegin2(e: egret.TouchEvent,) {
			this.onChooseItemTap(e, 1);
		}
		private onTouchBegin3(e: egret.TouchEvent,) {
			this.onChooseItemTap(e, 2);
		}
		private onTouchBegin4(e: egret.TouchEvent,) {
			this.onChooseItemTap(e, 3);
		}
		private onTouchBegin5(e: egret.TouchEvent,) {
			this.onChooseItemTap(e, 4);
	}
	// 鼠标点击 掉落 材料说明
	private onChooseItemTap(e, i) {
		let info = new message.GoodsInfo();
		info.goodsId = this.curTopicInfo.step_reward[i][0];
		info.count = this.curTopicInfo.step_reward[i][1];
		this.awardParticulars(e.localY * 0.75, e.stageX, e.stageY, info);
	}
	/**抬起时将按钮缩回去 */ /**抬起移除奖励详情界面 */
	public up() {
		if (this.commonDesSkillvis == true) {
			this.removeChild(this.commonDesSkill);
			this.commonDesSkillvis = false;
		}
	}

	/**奖励详情 */
	public awardParticulars(xy: number, cx: number, cy: number, info: message.GoodsInfo) {
		this.commonDesSkill = TipManager.ShowProp(info, this, xy, cx, cy);
		this.addChild(this.commonDesSkill);
		this.commonDesSkillvis = true;
	}
}
}