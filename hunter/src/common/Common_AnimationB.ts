namespace zj {
	/**
	 * 区域解锁动画
	 * created by Lian Lei
	 * 2019.04.02
	 */
	export class Common_AnimationB extends Dialog {
		// public static isAni: boolean = false;
		private static resList: string[];
		private groupUI: eui.Group;
		private imgBG: eui.Image;
		private imgBGB: eui.Image;
		private labelTip: eui.Label;
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

		public constructor() {
			super();
			this.skinName = "resource/skins/common/Common_AnimationBSkin.exml";
			this.btnExit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnExit, this);
			this.init();
		}

		private init() {
			this.picIndex = 0;
			this.aniIndex = 1;
			this.ani_end = false;
			this.pic = [this.imgBG, this.imgBGB];
			this.tblAni = TableClientTeachCartoon.Table();
			this.maxIndex = Game.PlayerMissionSystem.tableLength(this.tblAni);
			if (Common_AnimationB.resList && Common_AnimationB.resList.length > 0) {
				cachekeys(Common_AnimationB.resList, this);
				Common_AnimationB.resList = null;
			}
		}
		/** 添加预加载资源 */
		public static initResCachekeys(index: number) {
			this.resList = [];
			let tblAni = TableClientTeachCartoon.Table();
			for (let [k, v] of HelpUtil.GetKV(tblAni)) {
				if (v.graph == index) {
					this.resList.push(v.pic_path + "_jpg");
				}
			}
		}

		public LoadAni(index: number) {
			// Common_AnimationB.isAni = true;
			Game.SoundManager.playMusic("demon_mp3");
			this.index = index;
			this.init_ani_index = 1;
			this.max_ani_index = 1;

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
			this.SetPicAniMation()
		}

		private SetPicIndex() {
			this.picIndex = this.picIndex == 0 ? 1 : 0;
		}

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
			let first_delay = this.aniIndex == 1 ? 600 : 0;
			// 图片淡入时间
			let fadeInTime = this.tblAni[this.aniIndex].pic_opacity_time1;
			// 图片淡出时间
			let fadeOutTime = this.tblAni[this.aniIndex].pic_opacity_time2;
			fadeOutTime = pic_time - fadeInTime >= this.Fade_Min ? fadeOutTime : pic_time - fadeInTime;
			// 图片淡出延迟时间
			let fadeOutDelay = pic_time - fadeOutTime;
			let opacity = this.tblAni[this.aniIndex].pic_opacity >= 255 ? 120 : this.tblAni[this.aniIndex].pic_opacity;
			// 文字延迟时间
			let text_delayTime = this.tblAni[this.aniIndex].text_delayTime > pic_time ? 0 : this.tblAni[this.aniIndex].text_delayTime;
			// 文字淡入时间
			let text_fadeInTime = this.Fade_Min;
			// 文字淡出时间
			let text_fadeOutTime = this.Fade_Min;
			// 文字淡出延迟时间
			let text_delayTime2 = pic_time - fadeOutTime - text_fadeOutTime;
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

			egret.Tween.get(this.labelTip)
				.wait(1000)
				.to({ alpha: 1 }, 3000)
				.wait(3000)
				.to({ alpha: 0 }, 3000);

			egret.Tween.removeTweens(this.pic[this.picIndex]);
			egret.Tween.get(this.pic[this.picIndex])
				.wait(first_delay * 600)
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
				.to({ alpha: 0 }, fadeOutTime * 600)
				.call(() => {
					if (this.aniIndex != this.max_ani_index && this.tblAni[this.aniIndex + 1].graph == this.index) {
						this.aniIndex = this.aniIndex + 1;
						this.SetPicIndex();
						this.SetPicAniMation();
					}
					else {
						fadeOutTime = fadeOutTime > 4 ? 4 : fadeOutTime;
						egret.Tween.removeTweens(this.groupUI);
						egret.Tween.get(this.groupUI)
							.to({ alpha: 0 }, fadeOutTime * 500)
							.wait(200)
							.call(() => { this.InstanceAreaCallBack() });

						egret.Tween.removeTweens(this.rectTop);
						egret.Tween.get(this.rectTop)
							.to({ alpha: 0 }, fadeOutTime * 500)
							.wait(200)
							.call(() => { this.InstanceAreaCallBack() });

						egret.Tween.removeTweens(this.btnExit);
						egret.Tween.get(this.btnExit)
							.to({ alpha: 0 }, fadeOutTime * 500)
							.wait(200)
							.call(() => { this.InstanceAreaCallBack() });
						this.btnExit.visible = false;
					}
				});
		}

		private onBtnExit() {
			this.btnExit.visible = false;
			// egret.Tween.removeAllTweens();
			Game.UIManager.removeTweenAll();
			egret.Tween.get(this.pic[this.picIndex])
				.to({ alpha: 0 }, 500)
				.call(() => {
					this.InstanceAreaCallBack();
				})
				.wait(500)
				.call(() => {
					egret.Tween.removeTweens(this.pic[this.picIndex]);
					egret.Tween.get(this.groupUI)
						.to({ alpha: 0 }, 500)
						.wait(400)
						.call(() => {
							egret.Tween.removeTweens(this.groupUI)
							this.close();
						});
				});

			egret.Tween.removeTweens(this.labelTip);
			egret.Tween.get(this.labelTip)
				.to({ alpha: 0 }, 500)
				.call(()=>{
					egret.Tween.removeTweens(this.labelTip);
				});
		}

		private InstanceAreaCallBack() {
			this.close();
		}

		public close(){
			Game.TeachSystem.playAreaAnimate = false;
			Game.SoundManager.playMusic("city_mp3", 0);
			super.close();
			Game.EventManager.event(GameEvent.END_OF_THE_ANIMATION, { isAni: true });
			// Common_AnimationB.isAni = false;
		}
	}
}