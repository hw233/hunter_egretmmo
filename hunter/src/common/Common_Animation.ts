namespace zj {
	/**
	 * 演示关动画
	 * created by Lian Lei
	 * 2019.05.09
	 */
	export class Common_Animation extends Dialog {
		private groupUI: eui.Group;
		private imgBG: eui.Image;
		private imgBGB: eui.Image;
		private labelTip: eui.BitmapLabel;
		private rectTop: eui.Image;
		private btnExit: eui.Button;


		/**效果淡出淡入最小时间 */
		private Fade_Min = 500;
		private picIndex: number; // 图片轮次
		private aniIndex: number; // 动画轮次
		private ani_end: boolean;
		private pic: Array<eui.Image> = [];
		private tblAni: { [key: string]: TableClientTeachCartoon };
		private maxIndex: number;
		private index: number;
		private init_ani_index: number;
		private max_ani_index: number;
		private callBack: () => void;

		public constructor() {
			super();
			this.skinName = "resource/skins/common/Common_AnimationBSkin.exml";
			this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnExit, this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
			this.init();
		}

		private init() {
			this.picIndex = 0;
			this.aniIndex = 1;
			this.ani_end = false;
			this.pic = [this.imgBG, this.imgBGB];
			this.tblAni = TableClientTeachCartoon.Table();
			this.maxIndex = Game.PlayerMissionSystem.tableLength(this.tblAni);
		}

		protected onAddedToStage() {
			Game.SoundManager.playMusic("demon_mp3", 0);
		}

		public LoadAni(index: number, cb: () => void) {
			this.index = index;
			this.init_ani_index = 1;
			this.max_ani_index = 1;
			this.callBack = cb;
			this.btnExit.visible = true;
			this.btnExit.alpha = 1;

			for (let [k, v] of HelpUtil.GetKV(this.pic)) {
				v.alpha = 0;
			}

			for (let [k, v] of HelpUtil.GetKV(this.tblAni)) {
				if (v.graph == index) {
					this.aniIndex = Number(k);
					break;
				}
			}

			for (let [k, v] of HelpUtil.GetKV(this.tblAni)) {
				if (v.graph == index) {
					this.max_ani_index = Number(k);
				}
			}

			this.init_ani_index = this.aniIndex
			this.labelTip.alpha = 0;
			this.groupUI.alpha = 0;
			this.SetPicAniMation();
		}

		private SetPicIndex() {
			this.picIndex = this.picIndex == 0 ? 1 : 0;
		}

		private fadeOutTime: number;
		private isPlot: boolean = false;
		private SetPicAniMation() {
			this.pic[this.picIndex].source = cachekey(this.tblAni[this.aniIndex].pic_path + "_jpg", this);
			let rect = { x: this.pic[this.picIndex].x, y: this.pic[this.picIndex].y, height: this.pic[this.picIndex].height, width: this.pic[this.picIndex].width, };
			let x = 0;
			let y = 0;
			let end_x = 0;
			let end_y = 0;
			let pic_time = this.tblAni[this.aniIndex].pic_time;
			let pic_speed = this.tblAni[this.aniIndex].pic_speed;
			// 第一次时间延迟
			let first_delay = this.aniIndex == 1 ? 0 : 0;
			// 图片淡入时间
			let fadeInTime = this.tblAni[this.aniIndex].pic_opacity_time1;
			// 图片淡出时间
			this.fadeOutTime = this.tblAni[this.aniIndex].pic_opacity_time2;
			this.fadeOutTime = pic_time - fadeInTime >= this.Fade_Min ? this.fadeOutTime : pic_time - fadeInTime;
			// 图片淡出延迟时间
			let fadeOutDelay = pic_time - this.fadeOutTime;
			let opacity = this.tblAni[this.aniIndex].pic_opacity >= 255 ? 120 : this.tblAni[this.aniIndex].pic_opacity;
			// 文字延迟时间
			let text_delayTime = this.tblAni[this.aniIndex].text_delayTime > pic_time ? 0 : this.tblAni[this.aniIndex].text_delayTime;
			// 文字淡入时间
			let text_fadeInTime = this.Fade_Min;
			// 文字淡出时间
			let text_fadeOutTime = this.Fade_Min;
			// 文字淡出延迟时间
			let text_delayTime2 = pic_time - this.fadeOutTime - text_fadeOutTime;
			let str = this.tblAni[this.aniIndex].text_info == null ? "" : this.tblAni[this.aniIndex].text_info;
			this.labelTip.text = str;


			let rate = UIManager.StageHeight / rect.height;
			this.pic[this.picIndex].height *= rate;
			this.pic[this.picIndex].width *= rate;
			if (this.picIndex % 2 == 0) {
				x = -(this.pic[this.picIndex].width - UIManager.StageWidth);
				y = 0;
				end_x = 0;
				end_y = 0;
			} else {
				x = 0;
				y = 0;
				end_x = -(this.pic[this.picIndex].width - UIManager.StageWidth);
				end_y = 0;
			}


			this.pic[this.picIndex].x = x;
			this.pic[this.picIndex].y = y;
			if (this.aniIndex != this.init_ani_index) {
				this.pic[this.picIndex].alpha = Math.floor(opacity / 255);
			}

			egret.Tween.get(this.labelTip).wait(1000).to({ alpha: 1 }, 3000).wait(3000).to({ alpha: this.aniIndex == this.max_ani_index ? 0.5 : 0 }, 3000);

			// egret.Tween.removeTweens(this.pic[this.picIndex]);
			let tween: egret.Tween = egret.Tween.get(this.pic[this.picIndex]);

			tween.wait(first_delay * 400)
				.call(() => {
					if (this.aniIndex == this.init_ani_index) {
						egret.Tween.get(this.groupUI)
							.wait(first_delay * 600)
							.to({ alpha: 1 }, fadeInTime * 1000);
					}
				})
				.to({ alpha: 1 }, fadeInTime * 600)
				.to({ x: end_x, y: end_y }, pic_time * 800)
				.wait(fadeOutDelay * 600)
				.to({ alpha: this.aniIndex == this.max_ani_index ? 0.5 : 0 }, this.fadeOutTime * 600)
				.call(() => { // 第一幕退出处理
					// if (this.aniCallBack1(() => { tween.play(); })) {
					// 	tween.pause();
					// }
				})
				.wait(this.fadeOutTime)
				.call(() => {
					if (this.aniIndex != this.max_ani_index && this.tblAni[this.aniIndex + 1].graph == this.index) {
						this.aniIndex = this.aniIndex + 1;
						egret.Tween.removeTweens(this.pic[this.picIndex]);
						this.SetPicIndex();
						this.SetPicAniMation();
					}
					else {
						egret.Tween.removeTweens(this.pic[this.picIndex]);
						egret.Tween.removeTweens(this.groupUI);
						egret.Tween.get(this.groupUI).to({ alpha: 0.5 }, 500).wait(200).call(() => {
							this.aniCallback2();
						});

						egret.Tween.removeTweens(this.rectTop);
						egret.Tween.get(this.rectTop).to({ alpha: 0.5 }, 500).wait(200).call(() => {
							// this.aniCallback2();
						});

						egret.Tween.removeTweens(this.btnExit);
						egret.Tween.get(this.btnExit).to({ alpha: 0.5 }, 500).wait(200).call(() => {
							// this.aniCallback2();
						});
						this.btnExit.visible = false;
					}
				});
		}

		private onBtnExit() {
			this.btnExit.visible = false;
			// egret.Tween.removeAllTweens();
			Game.UIManager.removeTweenAll();
			egret.Tween.get(this.pic[this.picIndex])
				.to({ alpha: 0.5 }, 500)
				.call(() => {
					this.InstanceAreaCallBack();
					// 去掉演示关特殊处理
					Game.TeachSystem.isEndCommonAnimation = true;// 去掉演示关特殊处理
					Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });// 去掉演示关特殊处理
				})
				.wait(500)
				.call(() => {
					egret.Tween.removeTweens(this.pic[this.picIndex])
					egret.Tween.get(this.groupUI).to({ alpha: 0.5 }, 500).wait(400).call(() => {
						egret.Tween.removeTweens(this.groupUI)
						this.aniCallback2();
					});
				});

			egret.Tween.removeTweens(this.labelTip);
			egret.Tween.get(this.labelTip).to({ alpha: 0.5 }, 500).call(() => {
				egret.Tween.removeTweens(this.labelTip);
			});
		}

		private InstanceAreaCallBack() {
			// if (this.index == 2) {
			// 	let scene = StageSceneManager.Instance.GetCurScene();
			// 	scene.bEnd = true;
			// }
		}


		private aniCallBack1(callbackPlot: Function) {
			// if (this.aniIndex == this.max_ani_index && this.index == 1) {
			// 	egret.Tween.get(this.groupUI)
			// 		.to({ alpha: 0.5 }, 500);
			// 	this.btnExit.visible = false;
			// 	let scene = StageSceneManager.Instance.GetCurScene();
			// 	// scene.bEnd = true;
			// }
		}

		private aniCallback2() {
			// if (this.index == 2) {

			// }
			// else {
			// 	// Helper.PlaybgmByID(100006);
			// 	// let scene = StageSceneManager.Instance.GetCurScene();
			// 	// scene.bMp4 = false;
			// 	if (this.callBack != null) {
			// 		this.callBack();
			// 	}

			// 	Game.TeachSystem.isEndCommonAnimation = true;// 去掉演示关特殊处理
			// 	Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });// 去掉演示关特殊处理

			// 	// Game.EventManager.event(GameEvent.OPEN_LOGING_SCENE);
			// 	// Game.EventManager.event(GameEvent.LOGING_SCENE_PROGRESS, 1);

			// 	//this.close();
			// }

			if (this.isPlot) {
				this.close();
				// egret.Tween.removeAllTweens();
				Game.UIManager.removeTweenAll();
				if (this.callBack != null) this.callBack();

				Game.TeachSystem.isEndCommonAnimation = true;// 去掉演示关特殊处理
				Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });// 去掉演示关特殊处理
				return;
			}
			else {
				loadUI(Dialog_InstanceArea).then((dialog: Dialog_InstanceArea) => {
					dialog.show();
					dialog.cloudAni(() => {
						Story.playStory(100000, 1, () => {
							dialog.close();
							this.isPlot = true;
							Story.bFinish = false;
							this.LoadAni(1001, () => {
								// egret.Tween.removeAllTweens();
								Game.UIManager.removeTweenAll();
								Game.TeachSystem.init();
								Teach.SetTeachPart(teachBattle.teachPart); // 去掉演示关特殊处理
								Game.SoundManager.pauseMusic();
							});
						}, this)
					});
				});
			}
		}
	}
}