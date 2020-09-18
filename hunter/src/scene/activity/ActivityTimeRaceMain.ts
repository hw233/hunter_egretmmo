namespace zj {
// 时间赛跑
// wangshenzhou
// 2019.05.10
export class ActivityTimeRaceMain extends Scene {

	public groupAdapt1: eui.Group;
	public lstViewDays: eui.List;
	public lstMission: eui.List;
	public groupBgAni: eui.Group;
	public imgName: eui.Image;
	public btnClose: eui.Button;
	public groupAdapt: eui.Group;
	public img1: eui.Image;
	public img5: eui.Image;
	public img9: eui.Image;
	public img13: eui.Image;
	public img17: eui.Image;
	public img21: eui.Image;
	public lbTotalNum: eui.Label;
	public lbTime: eui.Label;
	public btnTry: eui.Button;
	public groupMan: eui.Group;
	public lbDoneNum: eui.Label;
	public groupAward1: eui.Group;
	public imgItemFrame1: eui.Image;
	public imgItemIcon1: eui.Image;
	public imgItemGet1: eui.Image;
	public groupButton1: eui.Group;
	public groupAward2: eui.Group;
	public imgItemFrame2: eui.Image;
	public imgItemIcon2: eui.Image;
	public imgItemGet2: eui.Image;
	public groupButton2: eui.Group;
	public groupAward3: eui.Group;
	public imgItemFrame3: eui.Image;
	public imgItemIcon3: eui.Image;
	public imgItemGet3: eui.Image;
	public groupButton3: eui.Group;
	public groupAward4: eui.Group;
	public imgItemFrame4: eui.Image;
	public imgItemIcon4: eui.Image;
	public imgItemGet4: eui.Image;
	public groupButton4: eui.Group;
	public groupManImage: eui.Group;
	public groupAward5: eui.Group;
	public imgItemFrame5: eui.Image;
	public imgItemIcon5: eui.Image;
	public imgItemGet5: eui.Image;
	public groupButton5: eui.Group;
	public img2: eui.Image;
	public img3: eui.Image;
	public img4: eui.Image;
	public img6: eui.Image;
	public img7: eui.Image;
	public img8: eui.Image;
	public img10: eui.Image;
	public img11: eui.Image;
	public img12: eui.Image;
	public img14: eui.Image;
	public img15: eui.Image;
	public img16: eui.Image;
	public img18: eui.Image;
	public img19: eui.Image;
	public img20: eui.Image;
	public image1: eui.Image;
	public image2: eui.Image;
	public image3: eui.Image;
	public image4: eui.Image;
	public image5: eui.Image;
	public image6: eui.Image;
	public image7: eui.Image;
	public image8: eui.Image;
	public image9: eui.Image;
	public image10: eui.Image;
	public image11: eui.Image;
	public image12: eui.Image;
	public image13: eui.Image;
	public image14: eui.Image;
	public image15: eui.Image;
	public image16: eui.Image;
	public image17: eui.Image;
	public image18: eui.Image;
	public image19: eui.Image;
	public image20: eui.Image;
	public image21: eui.Image;
	public lbNum1: eui.Label;
	public lbNum2: eui.Label;
	public lbNum3: eui.Label;
	public lbNum4: eui.Label;
	public lbNum5: eui.Label;
	public lbNum6: eui.Label;
	public imageReck: eui.Image;
	public groupImg: eui.Group;
	public groupMain: eui.Group;

	private ArrayImg = [];


	private TotlePointNum: number = 21;
	private ALL_CORE_TBL = [1, 5, 9, 13, 17, 21];
	private curActivityTurn: number;

	private progressTbl = [];
	private saveAwardState = [];
	public awardTbl: any;
	private awardCores: any;
	public awardTodayIndex;
	private awardInfos = [];
	public allKM: number;
	private bigPointPos;
	public lastCore: number = 0;
	public runAni: boolean;
	public disAllCirle = [];

	private timer: egret.Timer;

	private listDaysItem: eui.ArrayCollection;
	private listDaysIndex: number = 0;

	private listMissionItem: eui.ArrayCollection;
	private listMissionIndex: number = 0;


	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityTimeRaceMainSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
		//创建一个计时器对象
		this.timer = new egret.Timer(999, 0);
		//注册事件侦听器
		this.timer.addEventListener(egret.TimerEvent.TIMER, this.update, this);
		this.groupButton1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetInfoClickAward1, this);
		this.groupButton2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetInfoClickAward2, this);
		this.groupButton3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetInfoClickAward3, this);
		this.groupButton4.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetInfoClickAward4, this);
		this.groupButton5.addEventListener(egret.TouchEvent.TOUCH_TAP, this.SetInfoClickAward5, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
        Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
            Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
        }, null);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
		this.timer.start();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			if (this.timer) this.timer.stop();
		}, null);
		this.init();
	}
	public init() {
		this.imageReck.width = 0;
		this.imageReck.alpha = 0.0001;
		this.groupImg.visible = false;
		this.ArrayImg = [
			this.img2,
			this.img3,
			this.img4,
			this.img6,
			this.img7,
			this.img8,
			this.img10,
			this.img11,
			this.img12,
			this.img14,
			this.img15,
			this.img16,
			this.img18,
			this.img19,
			this.img20,
		]
		this.update();
		this.LoadPicSpine();
		Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", "000_diban1", 0)
			.then((display: dragonBones.EgretArmatureDisplay) => {
				display.x = 20;
				display.y = display.height / 2 - 3;
				this.groupBgAni.addChild(display);
			});
		// 当前活动轮数
		this.curActivityTurn = PlayerRaceSystem.GetActivityIndex();
		this.progressTbl = [];
		this.saveAwardState = [];
		this.allKM = PlayerRaceSystem.GetAllKM();
		this.SetALlCoresInfo();

		this.SetBigPointTbl();
		//设置奖励可领取
		this.InitAwardGetHide();
		this.lastCore = 0;
		this.runAni = true;
		this.smallImg();
		// this.SetInfoAward();

		this.SetInfoMsg();

		egret.Tween.get(this.imgName, { loop: true })
			.to({ y: 47.48 }, 0)
			.to({ y: 43 }, 1000)
			.to({ y: 47.48 }, 1000);
	}

	public Imagemask() {
		this.allKM = PlayerRaceSystem.GetAllKM();
		let widthnum = this.imageReck.width;
		this.imageReck.width = 50 + (780 - 52) * (this.allKM / 100);
		let time: number = (this.imageReck.width / 50) * 60;
		if (this.imageReck.width < 52) {
			this.imageReck.width = 52;
			widthnum = 52;
		}
		egret.Tween.get(this.imageReck)
			.to({ width: widthnum }, 0)
			.to({ width: this.imageReck.width }, time);
		this.groupImg.visible = true;
		this.groupImg.mask = this.imageReck;

		let playernum = this.groupManImage.x;
		if (this.groupManImage.x < 34) {
			this.groupManImage.x = 34;
			playernum = 34;
		} else {
			egret.Tween.get(this.groupManImage)
				.to({ x: playernum }, 0)
				.to({ x: this.imageReck.width - 20 }, time);
		}
	}

	private smallImg() {
		for (const k in this.ArrayImg) {
			const v = this.ArrayImg[k];
			v.visible = false;
		}
		setTimeout(() => {
			for (const k in this.ArrayImg) {
				const v = this.ArrayImg[k];
				egret.Tween.get(v).wait(Number(k) * 50)
					.to({ alpha: 0 }, 0)
					.to({ visible: true }, 20)
					.to({ alpha: 1 }, 80);
			}
		}, 500)

		setTimeout(() => {
			this.EnterUIAni();
			this.Imagemask();
		}, 1500)

	}

	private LoadPicSpine() {
		this.lbDoneNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.kilometre, 0);
		let picId = Game.PlayerInfoSystem.BaseInfo.picId;
		let mapRole_id = TableItemPic.Item(picId).mapRole_id;
		let bodySpxtbl = TableMapRole.Item(mapRole_id);
		if (bodySpxtbl != null) {
			let bodySpxId = bodySpxtbl.body_spx_id;
			let bodyScale = bodySpxtbl.spine_scale;
			let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(bodySpxId);
			let ani_dbName = spineTable.json;

			Game.DragonBonesManager.playAnimation(this, ani_dbName, "armatureName", 2, 0)
				.then((display: dragonBones.EgretArmatureDisplay) => {
					display.x = this.groupManImage.width / 2;
					display.y = this.groupManImage.height;
					display.scaleX = bodyScale * 0.35;
					display.scaleY = bodyScale * 0.35;
					this.groupManImage.addChild(display);
				});
		}
	}

	//获取点对应积分
	public SetALlCoresInfo() {
		this.awardTbl = PlayerRaceSystem.RewardItem(this.curActivityTurn);
		this.awardCores = this.awardTbl.zone_km;
		this.awardTodayIndex = PlayerRaceSystem.GetActivityDays(this.curActivityTurn);

		//奖励信息
		this.awardInfos = [];
		for (let i = 0; i < this.awardTbl.zone_reward_goods.length; i++) {
			this.awardInfos[i] = [];
			for (let j = 0; j < this.awardTbl.zone_reward_goods[i].length; j++) {
				let goods = new message.GoodsInfo();
				goods.goodsId = this.awardTbl.zone_reward_goods[i][j];
				goods.count = this.awardTbl.zone_reward_count[i][j];
				goods.showType = 1;
				this.awardInfos[i].push(goods);
			}

		}
	}

	private SetInfoClickAward1() {
		this.SetInfoClickAward(0)
	}

	private SetInfoClickAward2() {
		this.SetInfoClickAward(1)
	}

	private SetInfoClickAward3() {
		this.SetInfoClickAward(2)
	}

	private SetInfoClickAward4() {
		this.SetInfoClickAward(3)
	}

	private SetInfoClickAward5() {
		this.SetInfoClickAward(4)
	}

	//设置奖励按钮点击
	public SetInfoClickAward(i) {
		// for (let i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
		if (this.saveAwardState[i] == 0 || this.saveAwardState[i] == null) {
			//不可领取
			loadUI(Common_DesAward)
				.then((dialog: Common_DesAward) => {
					dialog.setInfoActivity(this.awardInfos[i]);
					dialog.show(UI.SHOW_FROM_TOP);
				});
		} else if (this.saveAwardState[i] == 1) {
			//可领取
			this.ReqGetMissionReward(i);
		} else if (this.saveAwardState[i] == 2) {
			//已领取
			return;
		}
		// }
	}

	//查看阶段奖励状态
	public SetInfoAward() {
		this.saveAwardState = [];
		let thisthen = this;
		for (let i = 0; i < thisthen.ALL_CORE_TBL.length - 1; i++) {
			//0 不可领取 1 可领取 2 已领取
			if (thisthen.allKM >= thisthen.bigPointPos[thisthen.ALL_CORE_TBL[i + 1]]) {
				let hasGet = Table.FindF(Game.PlayerMissionSystem.missionActive.raceRewards, function (k, v) {
					return v == (i + 1);
				})
				if (hasGet) {
					//已领取
					thisthen.saveAwardState[i] = 2;
					thisthen["imgItemGet" + (i + 1)].visible = true;
					thisthen["imgItemGet" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.canGet[2], this);

					if (i == (thisthen.ALL_CORE_TBL.length - 1)) {
						thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[1], this);
					} else {
						thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[1], this);
					}
				} else {
					//可领取
					thisthen.saveAwardState[i] = 1;
					thisthen["imgItemGet" + (i + 1)].visible = true;
					thisthen["imgItemGet" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.canGet[1], this);

					if (i == (thisthen.ALL_CORE_TBL.length - 1)) {
						thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this);
					} else {
						thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this);
					}
				}
			} else {
				//不可领取
				thisthen.saveAwardState[i] = 0;
				thisthen["imgItemGet" + (i + 1)].visible = false;

				if (i == (thisthen.ALL_CORE_TBL.length - 2)) {
					thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this);
				} else {
					thisthen["imgItemIcon" + (i + 1)].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this);
				}
			}
		}
	}

	//计算所需积分对应进展
	private GetProgressByCore(core) {
		let preBigPos = 1;
		let nextBigPos = this.TotlePointNum;
		let num = 1;
		for (const k in this.bigPointPos) {
			const v = this.bigPointPos[k];
			if ((core >= v) && this.bigPointPos[preBigPos] <= v) {
				preBigPos = Number(k);
			}
			if ((core < v) && (v < this.bigPointPos[nextBigPos])) {
				nextBigPos = Number(k);
			}
		}

		if (preBigPos == nextBigPos) {
			if (core >= this.bigPointPos[this.ALL_CORE_TBL[this.ALL_CORE_TBL.length]] + 5) {
				return [this.ALL_CORE_TBL[this.ALL_CORE_TBL.length], 100];
			} else {
				preBigPos = this.ALL_CORE_TBL[this.ALL_CORE_TBL.length - 1];
			}
		}

		let minusPointsNum = (this.bigPointPos[nextBigPos] - this.bigPointPos[preBigPos]) / (nextBigPos - preBigPos);
		let get1 = Math.floor((core - this.bigPointPos[preBigPos]) / minusPointsNum);
		let get2 = ((core - this.bigPointPos[preBigPos]) / minusPointsNum) - get1;
		let allNum = preBigPos + get1;
		let per = get2 * 100;
		return [allNum, per];

	}

	//圆点progress动态, 人物随圈移动动态
	public CircleMoveAni(core1, core2) {
		let [beginPoint, beginPer] = this.GetProgressByCore(core1);
		let [endPoint, endPer] = this.GetProgressByCore(core2 + 5);

		beginPoint = beginPoint >= this.TotlePointNum && this.TotlePointNum || beginPoint;
		endPoint = endPoint >= this.TotlePointNum && this.TotlePointNum || endPoint;
		let DelayTime = 0.07;
		let beginUseTime = (100 - beginPer) / 100 * DelayTime;
		let endUseTime = endPer / 100 * DelayTime;
		if (beginPoint == endPoint && this.TotlePointNum == endPoint) {
			this.runAni = false;
		}

		for (let i = beginPoint; i < endPoint; i++) {
			let delayTime = (i - beginPoint - 1) * DelayTime + beginUseTime
			delayTime = (delayTime < 0) && 0 || delayTime
			let useTime = DelayTime
			if (i == beginPoint) {
				useTime = beginUseTime;
			} else if (i == endPoint) {
				useTime = endUseTime;
			}

			// 	//圆点动态
			// 	let per = (i == endPoint) && endPer || 100;
			// 	let [_, bigNum] = Table.FindR(this.ALL_CORE_TBL, function (k, v) {
			// 		return v == i;
			// 	})
			// 	if ((bigNum != null) && (per >= 50)) {
			// 		this["lbNum" + (bigNum + 1)].textColor = Helper.RGBToHex("r:113,g:61,b:6")
			// 	}
			// 	if ((bigNum != null) && (bigNum != 1)) {
			// 		this.SetBoxStateByIndex();
			// 	}

			// if (i == endPoint) {
			// 	this.runAni = false;
			// 	this.lastCore = core2;
			// }
			}
				this.SetBoxStateByIndex();
			this.lbDoneNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.kilometre, this.allKM);
	}

	private EnterUIAni() {
		let delayTime = 20;
		for (let i = 0; i < this.ALL_CORE_TBL[this.ALL_CORE_TBL.length - 1]; i++) {
			this.CircleMoveAni(this.lastCore, this.allKM);
		}
	}

	private SetBoxStateByIndex() {
		// 0 不可领取 1 可领取 2 已领取
		for (let i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
			let index = i + 1;
			let thisthis = this;
			if (thisthis.allKM >= thisthis.bigPointPos[thisthis.ALL_CORE_TBL[index]]) {
				let hasGet = Table.FindF(Game.PlayerMissionSystem.missionActive.raceRewards, function (k, v) {
					return v == (index);
				})
				if (hasGet) {
					//已领取
					thisthis.saveAwardState[index - 1] = 2;
					thisthis["imgItemGet" + index].visible = true;
					thisthis["imgItemGet" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.canGet[2], this);

					if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
						thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[1], this);
					} else {
						thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[1], this);
					}
				} else {
					//可领取
					thisthis.saveAwardState[index - 1] = 1;
					thisthis["imgItemGet" + index].visible = true;
					thisthis["imgItemGet" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.canGet[1], this);
					if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
						thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this);
					} else {
						thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this);
					}
				}
			} else {
				//不可领取
				thisthis.saveAwardState[index - 1] = 0;
				thisthis["imgItemGet" + index].visible = false;
				if (index == (thisthis.ALL_CORE_TBL.length - 1)) {
					thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.special[0], this);
				} else {
					thisthis["imgItemIcon" + index].source = cachekey(UIConfig.UIConfig_Mission_Race.boxSprite.normal[0], this);
				}
			}
		}

	}

	private SetBigPointTbl() {
		//位置队形分数
		let coreTbl = this.awardCores;
		this.bigPointPos = [];
		//所有点代表距离
		this.disAllCirle = [];

		for (const k in this.ALL_CORE_TBL) {
			const v = this.ALL_CORE_TBL[k];
			if (Number(k) == 0) {
				this.bigPointPos[v] = 0;
				this.disAllCirle[v] = 0;
			} else {
				this.bigPointPos[v] = coreTbl[Number(k) - 1];
				this.disAllCirle[v] = coreTbl[Number(k) - 1];
			}
			this["lbNum" + (Number(k) + 1)].text = this.bigPointPos[v];
			let left = v;
			let right = this.ALL_CORE_TBL[Number(k) + 1];
			if (right == null) {
				return;
			}
			let num = right - left;
			let leftNum = coreTbl[Number(k) - 1] || 0;
			let rightNum = coreTbl[k];
			let disDiffAve = (rightNum - leftNum) / num;
			for (let i = left + 1; i < right; i++) {
				let value = (i - left) * disDiffAve + this.disAllCirle[v];
				this.disAllCirle[i] = value;
			}
		}
	}

	public ButtonCloseAndGo(mainType, subType) {
		let missionGo = () => {
			let call = Game.PlayerMissionSystem.getMission(mainType, subType);
			this.onButtonClose(null, () => {
				call();
			})
		}
		missionGo();
	}

	private InitAwardGetHide() {
		for (let i = 0; i < this.ALL_CORE_TBL.length - 1; i++) {
			this["imgItemGet" + (i + 1)].visible = false;
		}
	}

	public SetInfo() {
		//设置公里数
		this.SetInfoRaceDis();
	}

	private SetInfoMsg() {
		this.SetDaysList();
		this.SetMissionList();
		this.SetInfo();
	}

	//目前完成距离
	private SetInfoRaceDis() {
		this.lbTotalNum.text = Helper.StringFormat(TextsConfig.TextsConfig_Activity.kilometre, this.allKM);
	}

	//倒计时
	private update() {
		let time = PlayerRaceSystem.GetLastTime(this.curActivityTurn);
		this.lbTime.text = time;
	}

	//设置天数列表
	public SetDaysList() {
		this.lstViewDays.selectedIndex = -1; // 默认选中
		this.lstViewDays.itemRenderer = ActivityTimeRaseDaysItem;//
		this.listDaysItem = new eui.ArrayCollection();
		for (let i = 0; i < this.awardTbl.day_num; i++) {
			let data = new ActivityTimeRaseDaysItemData();
			data.index = i + 1;
			data.father = this;
			this.listDaysItem.addItem(data);
		}

		this.lstViewDays.dataProvider = this.listDaysItem;
		this.listDaysIndex = this.lstViewDays.selectedIndex;
	}

	//设置任务列表
	public SetMissionList() {
		let missionTbls = PlayerRaceSystem.SortActivityMission(this.curActivityTurn, this.awardTodayIndex);
		this.lstMission.itemRenderer = ActivityTimeRaceMissionItem;//
		this.listMissionItem = new eui.ArrayCollection();
		for (let i = 0; i < missionTbls.length; i++) {
			let data = new ActivityTimeRaceMissionItemData();
			data.index = i;
			data.info = missionTbls[i];
			data.father = this;
			this.listMissionItem.addItem(data);
		}

		this.lstMission.dataProvider = this.listMissionItem;
		this.listMissionIndex = this.lstMission.selectedIndex;
	}

	private ReqGetMissionReward(index) {
		PlayerRaceSystem.ReqGetMissionReward_Visit(index + 1).then((data: message.MissionRaceRewardResponse) => {
			loadUI(CommonGetDialog)
				.then((dialog: CommonGetDialog) => {
					dialog.init(data.body.gameInfo.getGoods);
					dialog.setCB(() => { this.SetInfoAward() });
					dialog.show();
				});
		}).catch(reason => { });
	}

	//鼠标抬起，移除 物品详情
	private onRemoveAward() {
		let dialog = this.groupMain.getChildByName("Item-skill-common");
		if (dialog) this.groupMain.removeChild(dialog);
	}

	private onButtonClose(a, cb?: Function) {
		this.timer.stop();
		this.timer.reset();
		if (cb != null) {
			cb();
		}
		this.close(UI.HIDE_TO_TOP);
	}

	private showGoodsProperty(ev: egret.Event) {
		if(Game.UIManager.dialogCount() != 0) {
            return;
        }
        let a = ev.data;
        let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
        show.name = "details";
        this.addChild(show);
    }

    private removeShow() {
        let show = this.getChildByName("details");
        if (show) {
            this.removeChild(show);
        }
    }
}
}