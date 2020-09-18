namespace zj {
// ActivityXuyuanPop
// yuqingchao
// 2019.05.08
export class ActivityXuyuanPop extends Dialog {
	private group39_40_41: eui.Group;
	private groupStar: eui.Group;
	private groupOther: eui.Button;
	private groupButton: eui.Button;
	private lstItem: eui.List;
	private lstItem0: eui.List;
	private lbCloseTip: eui.Label;				//跳过动画
	private lbCore: eui.Label;					//获得星星数量
	private btnReturn: eui.Button;				//返回
	private btnMore: eui.Button;				//许愿十次
	private btnOne: eui.Button;					//许愿一次
	private imgSale: eui.Image;					//九折
	private imgFloor: eui.Image;
	private imgCost: eui.Image;					//许愿符
	private lbMore: eui.Label;					//许愿次数
	private lbFreeTime: eui.Label;				//本次免费
	private itemList = [];
	private boomAniRet = [];
	private bones = [];
	private paths = [];
	private lanternNodes = [];
	private boomState = [];
	private father: ActivityXuyuanBoom;
	private goods;
	private groupMain: eui.Group;
	private donghua: any = null;
	private denglongAnimation = [];
	private baozhaAnimation = [];
	private animationBoolean: boolean = false;
	private scrollerAni: eui.Scroller;
	private item: ACtivityXuyuanPopItem;
	private itemArr = [];
	private btnDown: eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/skins/activity/ActivityXuyuanPopSkin.exml";
		this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);
		this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOne, this);
		this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
		this.btnDown.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
		Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			egret.Tween.removeTweens(this);
		}, this);
		this.init();

	}
	private init() {
		this.lbCore.x = 0;
		this.lstItem0.visible = false;
		this.scrollerAni.visible = true;
		this.lstItem.visible = true;
	}
	public setInfo(goods, father) {
		this.goods = goods;
		this.father = father;

		this.createPosition();
		this.setInfoEggAni();
		this.groupButton.visible = false;
		this.groupStar.visible = false;

		let num = this.father.takeNum;
		let score = this.father.curTopicInfo.score;;

		let scoreAdd = this.father.takeNum * this.father.curTopicInfo.score;
		this.lbCore.text = scoreAdd.toString();

		for (let i = 0; i < this.goods.length; i++) {
			let tbl = [] as any;
			tbl.bFinish = false;
			tbl.runTime = 0;
			this.boomState.push(tbl);
		}
	}
	private createPosition() {
		let linePos = [];
		if (Object.keys(this.goods).length <= 5) {
			let pos = [] as any;
			pos.x = this.width / 2 + this.width / 20;
			pos.y = Device.screenHeight / 2;
			linePos.push(pos);
		} else {
			let num = Math.ceil(Object.keys(this.goods).length / 5);
			for (let i = 0; i < num; i++) {
				let pos = [] as any;
				pos.x = this.width / 2 + this.width / 20;
				pos.y = Device.screenHeight * (num + 1 - i) / (num + 1) + 30;
				linePos.push(pos);
			}
		}
		let lineNodes = [];
		for (let i = 0; i < linePos.length; i++) {
			let node = new eui.Group;
			node.anchorOffsetX = node.width / 2;
			node.anchorOffsetY = node.height / 2;
			node.x = linePos[i].x;
			node.y = linePos[i].y;
		}

		let lanternPos = [];
		let heightDiff = 0;
		let widthDiff = 170;
		if (Object.keys(this.goods).length <= 5) {
			let pos = new eui.Group;
			pos.x = this.width / 2;
			pos.y = linePos[0].y + heightDiff - 160;
			lanternPos.push(pos);
			setTimeout(() => {
				this.setButtonOpen();
			}, 3500);
		} else {
			for (let i = 0; i < Object.keys(this.goods).length; i++) {
				let pos = new eui.Group;
				let tbl = linePos;
				let index = i > 4 && (i - 4) || i + 1;
				let index2 = i > 4 ? 0 : 1;
				let num = (index - 3) * widthDiff;
				let ix = linePos[0].x;
				pos.x = (index - 3) * widthDiff + this.width / 2;
				pos.y = linePos[index2].y + Math.abs(2 - index) * heightDiff - 400;
				lanternPos.push(pos);
				setTimeout(() => {
					this.setButtonOpen();
				}, 4500);
			}
		}
		let LanternLightNode = [];
		this.lanternNodes = [];
		let lanternSprite = [];
		for (let i = 0; i < lanternPos.length; i++) {
			let light = new eui.Group;
			light.anchorOffsetX = light.width / 2;
			light.anchorOffsetY = light.height / 2;
			light.x = lanternPos[i].x;
			light.y = lanternPos[i].y;
			let aniId = null;
			if (PlayerItemSystem.ItemQuality(this.goods[i].goodsId) >= 5) {
				aniId = 800502;
			} else if (PlayerItemSystem.ItemQuality(this.goods[i].goodsId) == 4) {
				aniId = 800504
			}
			if (aniId != null) {
				// light.addChild()
			}
			light.visible = false;

			LanternLightNode[i] = light;

			let node = new eui.Group;
			node.anchorOffsetX = node.width / 2;
			node.anchorOffsetY = node.height / 2;
			node.x = lanternPos[i].x;
			node.y = lanternPos[i].y;

			this.lanternNodes[i] = node;

			let sprite = new eui.Group;
			sprite.anchorOffsetX = sprite.width / 2;
			sprite.anchorOffsetY = sprite.height / 2;
			sprite.x = lanternPos[i].x;
			sprite.y = lanternPos[i].y;

			lanternSprite[i] = sprite;
		}
	}
	private setInfoEggAni() {
		let thisOne = this;
		for (let k in Object.keys(this.goods)) {
			let v = this.goods[k];
			this.bones[k] = [];
			this.paths[k] = [];

			this.item = new ACtivityXuyuanPopItem();
			this.item.SetInfo(k, v, this);
			this.itemArr.push(this.item);

			let bone = "001_tubiao";
			let path = this.item.groupMain;
			path.anchorOffsetX = path.width / 2;
			path.anchorOffsetY = path.height / 2;

			this.bones[k].push(bone);
			this.paths[k].push(path);
		}
		this.lanternAni();
	}
	private lanternAni() {
		for (let i = 0; i < this.lanternNodes.length; i++) {
			egret.Tween.get(this).wait(i * 180).call(() => {
				if (this.animationBoolean == true) return;
				let item = PlayerItemSystem.Item(this.goods[i].goodsId) as any;
				Game.DragonBonesManager.playAnimation(this, "denglong_eff", null, "001_denglong_chuxian", 1)
					.then((display: dragonBones.EgretArmatureDisplay) => {
						this.lstItem.addChild(this.lanternNodes[i]);
						this.lanternNodes[i].addChild(display);
						if (item.quality >= 4) {
							Game.DragonBonesManager.playAnimation(this, "denglong_eff", null, "003_denglong_xunhuan2", 2)
								.then((display: dragonBones.EgretArmatureDisplay) => {
									this.lanternNodes[i].removeChildren();
									this.lstItem.addChild(this.lanternNodes[i]);
									this.lanternNodes[i].addChild(display);
									this.denglongAnimation[i] = display;
									setTimeout(function () {
										if (this.animationBoolean == true) return;
										baoZha();
									}, 3000);
								})
						} else {
							Game.DragonBonesManager.playAnimation(this, "denglong_eff", null, "002_denglong_xunhuan", 2)
								.then((display: dragonBones.EgretArmatureDisplay) => {
									this.lanternNodes[i].removeChildren();
									this.lstItem.addChild(this.lanternNodes[i]);
									this.lanternNodes[i].addChild(display);
									this.denglongAnimation[i] = display;
									setTimeout(function () {
										if (this.animationBoolean == true) return;
										baoZha();
									}, 3000);
								})
						}
					})
				let baoZha = () => {
					if (this.animationBoolean == true) return;
					Game.DragonBonesManager.getAnimationWithBindImages(this, "denglong_eff", null, this.paths[i], this.bones[i])
						.then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
							this.lanternNodes[i].removeChildren();
							this.donghua = armatureDisplay;
							this.lstItem.addChild(this.lanternNodes[i]);
							this.lanternNodes[i].addChild(armatureDisplay);
							this.baozhaAnimation[i] = armatureDisplay;
							// armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
							// 	armatureDisplay.animation.stop();
							// 	armatureDisplay.animation.reset();
							// 	armatureDisplay.armature.dispose();
							// 	armatureDisplay.dbClear();
							// 	armatureDisplay.dispose(true);
							// 	if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
							// }, null);
							this.donghua.animation.play("004_denglong_baozha", 1);
							armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, () => {
								armatureDisplay.animation.stop();
								this.btnDown.enabled = false;
							}, this);
						})
				}
			})
		}
	}
	private setButtonOpen() {
		this.btnDown.enabled = false;
		this.groupStar.visible = true;
		egret.Tween.get(this.lbCore).to({ x: 277 }, 500)
		this.groupButton.visible = true;
		this.lbCloseTip.visible = false;

		let state = {
			none: 0,
			useOne: 1,
			useTen: 2,
			freeOne: 3,
		}
		let lastFreeTime = TableLicence.Item(Game.PlayerInfoSystem.LecenceLevel).xuyuan_free - Game.PlayerVIPSystem.vipInfo.xuyuan_free;
		let lastUseTime = this.father.curTopicInfo.max_time - Game.PlayerMixUnitInfoSystem.mixunitinfo.xuyuan_time;
		let curState = state.none;

		if (lastUseTime > 0) {
			if (this.goods.length > 1 && lastUseTime >= 10) {
				curState = state.useTen;
			} else if (lastFreeTime > 0) {
				curState = state.freeOne;
			}
			else {
				curState = state.useOne;
			}
		} else if (lastFreeTime > 0) {
			curState = state.freeOne;
		}

		if (curState == state.none) {
			this.groupOther.visible = false;
		} else if (curState == state.useOne) {
			this.btnMore.visible = false;
			this.lbFreeTime.visible = false;
			this.imgSale.visible = false;
		} else if (curState == state.useTen) {
			this.btnOne.visible = false;
			this.lbFreeTime.visible = false;
		} else if (curState == state.freeOne) {
			this.btnOne.visible = true;
			this.btnMore.visible = false;
			this.imgCost.visible = false;
			this.lbMore.visible = false;
			this.imgSale.visible = false;

			this.lbFreeTime.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_Activity.wishing_tree_free, lastFreeTime);
		}
		let price;
		if (curState == state.useTen) {
			price = this.father.curTopicInfo.consume_pai_ten;
		} else {
			price = this.father.curTopicInfo.consume_pai;
		}
		this.lbMore.text = price;
	}
	private onTouchTap() {
		this.setButtonOpen();
		this.animationBoolean = true;
		this.lstItem0.visible = true;
		this.lstItem.visible = false;
		this.lstItem.removeChildren();
		this.scrollerAni.visible = false;
		this.scrollerAni.removeChildren();
		for (let i = 0; i < this.lanternNodes.length; i++) {
			this.lanternNodes[i].removeChildren();
			this.paths[i][0].anchorOffsetX = this.paths[i][0].width / 2;
			this.paths[i][0].anchorOffsetY = this.paths[i][0].height / 2;
			this.lstItem0.addChild(this.lanternNodes[i]);
			this.lanternNodes[i].addChild(this.paths[i][0]);
		}
	}
	private onBtnOne() {
		this.btnMore.enabled = false;
		this.close();
		this.father.onBtnOne();
	}
	private onBtnMore() {
		this.btnOne.enabled = false;
		this.close();
		this.father.onBtnMore();
	}
	private onBtnReturn() {
		this.close(UI.HIDE_TO_TOP);
		loadUI(CommonGetDialog)
			.then((dialog: CommonGetDialog) => {
				dialog.init(this.goods);
				dialog.show();
			});
	}
	//删除长按
	private removeShow() {
		let show = this.getChildByName("details");
		if (show) {
			this.removeChild(show);
		}
	}
	//长按点击详情
	private showGoodsProperty(ev: egret.Event) {
		let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
		show.name = "details";
		this.addChild(show);
	}
}
}