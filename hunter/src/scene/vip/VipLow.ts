namespace zj {
	//VIP特权
	//yuqingchao
	//2019.04.10
	export class VipLow extends Dialog {
		private imgBackground: eui.Image;
		private groupBgAni: eui.Group;
		private imgName: eui.Image;
		private imgVip: eui.Image;				//当前VIP等级
		private imgVipNext: eui.Image;			//下一级VIP等级
		private imgPay: eui.Image;				//额外返利
		private imgTip: eui.Image;				//红点
		private imgExp: eui.Image;				//经验条
		private imgIcon: eui.Image;				//钻石图
		private imgSellOut: eui.Image;			//已购买
		private rectMask: eui.Image;
		private groupExp: eui.Group;
		private groupPrimer: eui.Group;
		private groupGet: eui.Group;
		private groupLeftButton: eui.Group;
		private groupSelectLeft: eui.Group;
		private groupRightButton: eui.Group;
		private groupSelectRight: eui.Group;
		private lbPrimer: eui.Label;			//原价
		private lbTokem: eui.Label;				//现价
		private lbNeed: eui.Label;				//升级VIP条件
		private lbPay: eui.Label;				//经验
		private lbLevel: eui.Label;
		private lbNeedAll: eui.Label;
		private btnPay: eui.Button;				//去充值按钮
		private btnClose: eui.Button;
		private btnLeft: eui.Button;
		private btnRight: eui.Button;
		private btnGet: eui.Button;				//购买按钮
		private lstLestInfo: eui.List;
		private lstViewItem: eui.List;
		private goods: Array<message.GoodsInfo> = [];
		private arrayCollectionLest: eui.ArrayCollection;
		private arrayCollectionLestB: eui.ArrayCollection;
		private MAX: number = 12;
		private MIN: number = 0;
		private levelCur: number = 0;
		private id: number = 0;
		private good = [];
		private count = [];
		private groupCach: eui.Group;

		private isBackground: boolean = false;
		private cb: Function//回调方法；
		public constructor() {
			super();
			this.skinName = "resource/skins/vip/VipLowSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				egret.Tween.removeTweens(this.imgName);
			}, null);
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnPay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPay, this);
			this.groupLeftButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeft, this);
			this.groupRightButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRight, this);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onRemoveAward, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
			Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
			}, null);
		}
		public init(isBackground: boolean = false) {
			this.isBackground = isBackground;
			this.imgBackground.visible = this.isBackground;
			this.imgName.source = cachekey(UIConfig.UIConfig_VipMall.low_title_name, this);
			this.imgPay.visible = false;
			this.imgTip.visible = false;
			this.rectMask = Util.getMaskImgBlack(341, 25);
			this.rectMask.verticalCenter = 0;
			this.rectMask.left = 7;
			this.rectMask.visible = false;
			this.groupExp.addChild(this.rectMask);
			Game.DragonBonesManager.playAnimation(this, "hd_tongyong_biaotidiban", "armatureName", null, 0).then(display => {
				this.groupBgAni.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
			egret.Tween.get(this.imgName, { loop: true })
				.to({ y: -34 }, 500)
				.to({ y: -30 }, 1000)
				.to({ y: -32 }, 500)

			// this.groupCach.cacheAsBitmap = true;
			// this.imgBackground.cacheAsBitmap = true;
			// this.btnClose.cacheAsBitmap = true;
			this.setFocusInfo();
			this.btnTW();
		}

		public CB(cb?) {
			this.cb = cb;
		}

		public isFullScreen() {
			return this.imgBackground.visible;
		}
		private btnTW() {
			this.groupSelectRight.removeChildren();
			Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(display => {
				this.groupSelectRight.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
			this.groupSelectLeft.removeChildren();
			Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0).then(display => {
				this.groupSelectLeft.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
		}
		private setFocusInfo() {
			this.levelCur = Game.PlayerInfoSystem.VipLevel;
			let bGetCur = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
				return v == Game.PlayerInfoSystem.VipLevel;
			});
			//0级未领取显示0
			if ((Game.PlayerInfoSystem.VipLevel == 0 && !bGetCur) || (Game.PlayerInfoSystem.VipLevel == this.MAX)) {
				this.id = Game.PlayerInfoSystem.VipLevel;
			} else {
				this.id = Game.PlayerInfoSystem.VipLevel + 1;
			}
			for (let i = 0; i < this.MAX; i++) {
				if (!Table.VIn(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, i) && i < this.id) {
					this.id = i;
				}
			}

			if (this.levelCur > this.MAX) {
				this.levelCur = this.MAX;
			}

			this.setInfo();
			this.setList();
			this.setListDes();
		}
		private setInfo() {
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.LowVip + ".json"); 		//读表
			if (this.id > this.MAX) {
				this.id = this.MAX;
			}
			if (this.levelCur != this.MAX) {
				this.imgVipNext.visible = true;
				this.lbNeed.visible = true;
				//当前星耀等级名称
				this.imgVip.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur], this);
				//下一星耀等级名称
				this.imgVipNext.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur + 1], this);
				//需要充值
				this.lbNeed.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_VipMall.vipMoney, (tbl[this.levelCur + 1].sum - Game.PlayerInfoSystem.BaseInfo.chargeToken) / 10);
			} else {
				this.imgVip.source = cachekey(UIConfig.UIConfig_VipMall.low_vip_title_new[this.levelCur], this);
				this.imgVipNext.visible = false;
				this.lbNeed.text = TextsConfig.TextsConfig_Common.expMax;
			}
			//经验
			let percent: number = 0;
			if (this.levelCur != this.MAX) {
				percent = Number((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / (tbl[this.levelCur].charge + tbl[this.levelCur].sum));
				this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / 10 + "/" + (tbl[this.levelCur].charge + tbl[this.levelCur].sum) / 10).toString();
			} else {
				percent = Number((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / tbl[this.levelCur].sum);
				this.lbPay.text = ((Game.PlayerInfoSystem.BaseInfo.vipExp + tbl[this.levelCur].sum) / 10 + "/" + tbl[this.levelCur].sum / 10).toString();
			}
			if (percent > 1) {
				percent = 1;
			} else if (percent < 0) {
				percent = 0;
			}
			//经验条
			this.rectMask.visible = true;
			this.rectMask.width = 341 * percent;
			this.imgExp.mask = this.rectMask;

			this.setButtonState();
		}
		//左侧切换按钮
		private onBtnLeft() {
			if (this.id != this.MIN) {
				this.id = this.id - 1;
				this.setList();
				this.setListDes();
				this.setButtonState();
			}
		}
		//右侧切换按钮
		private onBtnRight() {
			if (this.id != this.MAX) {
				this.id = this.id + 1;
				this.setList();
				this.setListDes();
				this.setButtonState();
			}
		}
		//设置按钮状态
		private setButtonState() {
			let tbl = Game.ConfigManager.getTable(StringConfig_Table.LowVip + ".json"); 		//读表
			this.groupLeftButton.visible = this.id != this.MIN;
			this.groupRightButton.visible = this.id != this.MAX;
			this.lbLevel.text = this.id.toString();
			this.lbNeedAll.text = (tbl[this.id].sum / 10).toString();
			let arr = Game.PlayerMixUnitInfoSystem.mixunitinfo.payIndexs;
			let id: any = this.id;
			let isHave = Table.FindF(Game.PlayerMixUnitInfoSystem.mixunitinfo.lowVipWeal, (k, v) => {
				return v == id;
			});
			if (this.id <= Game.PlayerInfoSystem.VipLevel && !isHave) {
				this.btnGet.enabled = true;
			} else {
				this.btnGet.enabled = false;
			}
			isHave;
			if (isHave) {
				this.imgSellOut.visible = true;
				this.groupGet.visible = false;
				this.groupPrimer.visible = false;
			} else {
				this.groupGet.visible = true;
				this.groupPrimer.visible = true;
				this.imgSellOut.visible = false;
			}
		}
		//VIP特权
		private setList() {
			let strVip = PlayerVIPSystem.DesVip(this.id);
			this.arrayCollectionLest = new eui.ArrayCollection();
			for (let i = 0; i < strVip.length; i++) {
				this.arrayCollectionLest.addItem({
					info: strVip[i]
				})
			}
			this.lstLestInfo.dataProvider = this.arrayCollectionLest;
			this.lstLestInfo.itemRenderer = VipLowItem;
		}
		//超值折扣
		private setListDes() {
			this.good = PlayerVIPSystem.LowWealItem(this.id).goods_content;
			this.count = PlayerVIPSystem.LowWealItem(this.id).goods_count;
			this.arrayCollectionLestB = new eui.ArrayCollection();
			for (let i = 0; i < this.good.length; i++) {
				this.arrayCollectionLestB.addItem({
					i,
					good: this.good[i],
					count: this.count[i],
					father: this
				})
			}
			this.lstViewItem.dataProvider = this.arrayCollectionLestB;
			this.lstViewItem.itemRenderer = VipLowItemB;

			this.lbTokem.text = PlayerVIPSystem.LowWealItem(this.id).consume_token.toString();
			this.lbPrimer.text = HelpUtil.textConfigFormat("%s", PlayerVIPSystem.LowWealItem(this.id).primer);// TextsConfig.TextsConfig_Gift.primer
		}

		//跳转充值界面
		private onBtnPay() {
			this.btnPay.enabled = false;
			setTimeout(() => {
				this.onBtnClose();
			}, 500);

			setTimeout(() => {
				loadUI(PayMallScene)
					.then((dialog: PayMallScene) => {
						dialog.show(UI.SHOW_FILL_OUT);
						dialog.init(this.isBackground);
					});
			}, 1000);
		}

		//购买超值折扣
		private onBtnGet() {
			Game.PlayerVIPSystem.lowVipBuyWealReward(this.id).then((resp: message.GameInfo) => {
				this.setFocusInfo();
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(resp.getGoods);
						dialog.show();
					})

			})
		}

		private onBtnClose() {
			if (this.cb) {
				this.cb();
			}
			this.close(UI.HIDE_TO_TOP);
		}

		private removeShow() {
			let show = this.getChildByName("details");
			if (show) {
				this.removeChild(show);
			}
		}

		private showGoodsProperty(ev: egret.Event) {
			let show = TipManager.ShowProp(ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
			show.name = "details";
			this.addChild(show);
		}

		// //点击移除
		// private onRemoveAward() {
		// 	let dialog = this.getChildByName("Item-skill-common");
		// 	if (dialog) this.removeChild(dialog);
		// }
	}
}