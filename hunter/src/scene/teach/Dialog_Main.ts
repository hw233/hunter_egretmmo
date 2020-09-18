namespace zj {
	/**
	 * 剧情对话
	 * created by Lian Lei
	 */
	export class Dialog_Main extends Dialog {
		private groupUI: eui.Group;
		private btnContinue: eui.Group;
		private groupLeft: eui.Group;
		private imgBGL: eui.Image;
		private imgLeftHand: eui.Image;
		private labelNameL: eui.Label;
		private lableContentL: eui.Label;
		private groupRight: eui.Group;
		private imgBGR: eui.Image;
		private imgRightHand: eui.Image;
		private labelNameR: eui.Label;
		private lableContentR: eui.Label;
		private btnSkip: eui.Button;
		private groupHeadRight: eui.Group;
		private groupHeadLeft: eui.Group;
		private imgNameL: eui.Image;
		private imgNameR: eui.Image;
		private groupAniR: eui.Group;
		private groupAniL: eui.Group;

		private dialogIndex: number;
		private direction: number

		public constructor() {
			super();
			this.skinName = "resource/skins/teach/Dialog_MainSkin.exml";

			this.init();
		}

		private addEvent() {
			this.btnSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnSkip, this);
			this.btnContinue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnContinue, this);
		}

		// 显示对话框
		public showDialog(animation?: string) {
			this.width = UIManager.StageWidth;
			this.height = UIManager.StageHeight;
			Game.UIManager.GroupStory.addChild(this);
		}

		// 关闭对话框
		public closeDialog(animation?: string) {
			if (this.parent) this.parent.removeChild(this);
			Game.UIManager.removeCacheResouce(this); // 移除UI缓存资源到待释放队列
			Game.UIManager.GroupStory.removeChildren();
		}

		private init() {
			this.dialogIndex = 1;// 数据索引
			this.groupLeft.alpha = 0;
			this.groupRight.alpha = 0;
			this.setInfo();
			this.DoActionsIn();
		}

		private setInfo() {
			this.groupLeft.scaleX = 1;
			this.groupLeft.scaleY = 1;
			this.groupRight.scaleX = 1;
			this.groupRight.scaleY = 1;

			let headInfo = zj.StoryDialog.Dialog.tablePicCell[this.dialogIndex - 1];
			let textInfo = zj.StoryDialog.Dialog.tableContentCell[this.dialogIndex - 1];

			this.direction = textInfo.direction;
			if (this.direction == 0) {
				this.groupLeft.alpha = 1;
				this.groupRight.alpha = 0;
			}
			else if (this.direction == 1) {
				this.groupLeft.alpha = 0;
				this.groupRight.alpha = 1;
			}

			if (headInfo.spine == 10060) { // 比丝姬spine
				this.imgLeftHand.visible = false;
				this.imgRightHand.visible = false;

				this.groupHeadLeft.removeChildren();
				this.groupHeadRight.removeChildren();
				let spineMap: { [key: string]: TableClientAniSpineSource } = TableClientAniSpineSource.Table();
				let spineName: string = spineMap[10060].atlas; // 龙骨动画名
				let aniName: string = spineMap[10060].ani_name; // spine的动作名称

				if (this.direction == 0) {
					Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0)
						.then(display => {
							// display.height = this.groupHeadLeft.height;
							display.x = this.groupHeadLeft.x + display.width / 3;
							display.y = display.height + 10;
							if (headInfo.flip != null && headInfo.flip == 1) {
								display.scaleX = -1;
							}
							this.groupHeadLeft.addChild(display);
						})
						.catch(reason => {
							toast(reason);
						});
				}
				else if (this.direction == 1) {
					Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0)
						.then(display => {
							// display.height = this.groupHeadRight.height;
							display.x = this.groupHeadRight.x + display.width / 3;
							display.y = display.height + 10;
							if (headInfo.flip != null && headInfo.flip == 1) {
								display.scaleX = -1;
							}
							this.groupHeadRight.addChild(display);
						})
						.catch(reason => {
							toast(reason);
						});
				}
			}
			else {
				let ret: TableMapRole = TableMapRole.Item(headInfo.spine);
				if (ret != null) {
					if (this.direction == 0) {
						this.imgLeftHand.source = cachekey(ret.half_path, this);
						this.imgLeftHand.scaleX = ret.half_scale | 1;
						if (headInfo.flip != null && headInfo.flip == 1) {
							this.imgLeftHand.scaleX = 1;
						}
					}
					else if (this.direction == 1) {
						this.imgRightHand.source = cachekey(ret.half_path, this);
						this.imgRightHand.scaleX = ret.half_scale | 1;
						if (headInfo.flip != null && headInfo.flip == 1) {
							this.imgRightHand.scaleX = 1;
						}
					}

				}
			}

			if (this.direction == 0) {
				this.labelNameL.text = textInfo.name;
				this.lableContentL.textFlow = Util.RichText(textInfo.content);

				this.groupAniL.removeChildren();
				Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 2, 0)
					.then(display => {

						display.x = this.groupAniL.explicitWidth / 2;
						display.y = this.groupAniL.explicitHeight / 2;
						this.groupAniL.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			}
			else if (this.direction == 1) {
				this.labelNameR.text = textInfo.name;
				this.lableContentR.textFlow = Util.RichText(textInfo.content);

				this.groupAniR.removeChildren();
				Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xinshou", "armatureName", 2, 0)
					.then(display => {

						display.x = this.groupAniR.explicitWidth / 2;
						display.y = this.groupAniR.explicitHeight / 2;
						this.groupAniR.addChild(display);
					})
					.catch(reason => {
						toast(reason);
					});
			}


		}

		private DoActionsIn() {			
			// if (this.direction == 0) {
			// 	this.groupLeft.alpha = 1;
			// 	this.groupRight.alpha = 0;
			// }
			// else if (this.direction == 1) {
			// 	this.groupLeft.alpha = 0;
			// 	this.groupRight.alpha = 1;
			// }
			this.groupLeft.alpha = 0;
			this.groupRight.alpha = 0;

			if (this.direction == 0) {
				egret.Tween.get(this.groupLeft)
					.to({ x: 0 - this.groupLeft.width, alpha: 1 }, 0)
					.to({ x: 0 }, 500, egret.Ease.backIn)
					.wait(300)
					.call(() => {
						this.addEvent();
					}, this);
			}
			else if (this.direction == 1) {
				egret.Tween.get(this.groupRight)
					.to({ x: 0 + this.groupRight.width, alpha: 1 }, 0)
					.to({ x: 0 }, 500, egret.Ease.backIn)
					.wait(300)
					.call(() => {
						this.addEvent();
					}, this);
			}
		}

		private DoActionsOut() {
			let time = 8 / 45 * 1000;
		}

		private onBtnSkip() {
			this.closeDialog();
			Story.bFinish = true;
			Teach.DoOperateTeach();
		}

		private onBtnContinue() {
			if (this.dialogIndex >= Game.PlayerMissionSystem.tableLength(zj.StoryDialog.Dialog.tableContentCell)) {
				this.closeDialog();
				console.log("-----------------------" + "关闭对话界面" + "----------------------");
				Story.bFinish = true;
				Teach.DoOperateTeach();
			}
			else {
				this.dialogIndex = this.dialogIndex + 1;
				Story.bFinish = false;
				this.setInfo();
			}
		}
	}
}