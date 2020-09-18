namespace zj {
	/**
	 * @class 收藏有礼
	 * 
	 * @author xingliwei
	 * 
	 * 2019.08.20
	 */
	export class ActivityCollection extends Dialog {
		public imgbg: eui.Image;
		public btnClose: eui.Button;
		public btnLookOver: eui.Button;
		public btnLeaveFor: eui.Button;
		public btnGet: eui.Button;
		public btnCopy: eui.Button;
		public imgAndroid: eui.Image;
		public imgIOS1: eui.Image;
		public imgIOS2: eui.Image;
		public imgIOS3: eui.Image;

		public static URL: string = "";
		/**判断收藏有礼引导是否开启 */
		public static guidance: boolean = false;
		// 判断收藏有礼是否领取
		public static vis: boolean = true;
		public constructor() {
			super();
			this.skinName = "resource/skins/activity/ActivityCollectionSkin.exml";
			this.init();
		}

		private init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnGet, this);
			this.btnLeaveFor.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLesverFor, this);
			this.btnLookOver.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLookOver, this);
			this.btnCopy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCopy, this);
			this.setInfo();
		}
		
        public isFullScreen(){
            return true;
        }
		/**根据设备信息设置界面信息 */
		private setInfo() {
			if (Util.isWxMiniGame()) {
				this.imgAndroid.visible = true;
				this.imgIOS1.visible = false;
				this.imgIOS2.visible = false;
				this.imgIOS3.visible = false;
			} else if (ActivityCollection.myBrowser() == "Safari") {
				this.imgAndroid.visible = false;
				this.imgIOS1.visible = false;
				this.imgIOS2.visible = true;
				this.imgIOS3.visible = false;
			} else if (ActivityCollection.myBrowser() == "micromessenger") {
				this.imgAndroid.visible = false;
				this.imgIOS1.visible = true;
				this.imgIOS2.visible = false;
				this.imgIOS3.visible = false;
			} else if (egret.Capabilities.os == "iOS") {
				this.imgAndroid.visible = false;
				this.imgIOS1.visible = false;
				this.imgIOS2.visible = false;
				this.imgIOS3.visible = true;
			}

			//判断是否已经领取
			let vis: boolean = true;
			for (var key of Game.PlayerMixUnitInfoSystem.mixunitinfo.shareType) {
				if (key == 10001) {
					vis = false;
				}
			}
			if ((Util.isWxMiniGame() && egret.Capabilities.os == "Android")) {
				let a = window['wx']["getLaunchOptionsSync"]();
				if (a) {
					this.btnGet.visible = (vis && a.scene == 1023);
				}
			} else {
				// this.btnGet.visible = (vis && !window.name && ActivityCollection.URL.indexOf("from=desktop") >= 0);//window.location.href
				if (navigator) {
					if (navigator["standalone"] == true || navigator["standalone"] == false) {
						this.btnGet.visible = (vis && navigator["standalone"] == true && egret.Capabilities.os == "iOS" && ActivityCollection.myBrowser() == "Safari")//&& !window.name && ActivityCollection.URL.indexOf("?from=desktop") >= 0);//window.location.href
					}
				}
			}
			if (this.imgIOS3.visible) {
				this.btnCopy.visible = true;
			} else {
				this.btnCopy.visible = false;
				// if (!window.name && ActivityCollection.URL.indexOf("?from=desktop") < 0) {//window.location.href
				// 	window.name = 'test';
				// }
			}
		}

		/**领取 */
		private onBtnGet() {
			this.receiveAward(10001).then((gameInfo: message.GameInfo) => {
				loadUI(CommonGetDialog)
					.then((dialog: CommonGetDialog) => {
						dialog.init(gameInfo.getGoods);
						dialog.show();
						ActivityCollection.vis = false;
						dialog.setCB(() => {
							this.onBtnClose();
						})
					})
			}).catch(() => {

			})
		}

		/**前往 */
		private onBtnLesverFor() {
			ActivityCollection.guidance = true;
			this.onBtnClose();
		}

		/**查看奖励 */
		private onBtnLookOver() {
			let awards = [];
			let a = new message.GoodsInfo();
			a.count = 2;
			a.goodsId = 20020;
			awards.push(a);
			let b = new message.GoodsInfo();
			b.count = 1;
			b.goodsId = 30452;
			awards.push(b);
			let c = new message.GoodsInfo();
			c.count = 5;
			c.goodsId = 30003;
			awards.push(c);
			loadUI(Daily_AwardPop)
				.then((dialog: Daily_AwardPop) => {
					dialog.SetInfoGift(awards, null, null, null, () => {

					});
					dialog.show(UI.SHOW_FROM_TOP)
				})
		}

		/**关闭 */
		private onBtnClose() {
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
			this.close(UI.HIDE_TO_TOP);
		}

		/**领取奖励发协议 */
		public receiveAward(type: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.ShareRewardRequest();
				request.body.share_type = type
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.ShareRewardResponse>resp;
					if (response.header.result != 0) {
						return;
					}
					resolve(response.body.gameInfo);
				},
					(req: aone.AoneRequest): void => {
						reject(LANG("请求超时"));
						return;
					}, this, false);

			});
		}

		/**复制 */
		private onBtnCopy() {
			platform.setClipboardData(window.location.href);
		}

		public static myBrowser() {
			if (navigator) {
				if (navigator.userAgent) {
					var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
					var ua = navigator.userAgent.toLowerCase();
					// toast(ua);  
					var isOpera = userAgent.indexOf("Opera") > -1;
					if (isOpera) {
						return "Opera"
					}; //判断是否Opera浏览器
					if (userAgent.indexOf("Firefox") > -1) {
						return "FF";
					} //判断是否Firefox浏览器
					if (userAgent.indexOf("Chrome") > -1) {
						return "Chrome";
					}//判断是否谷歌浏览器
					if (userAgent.indexOf("Safari") > -1) {
						return "Safari";
					} //判断是否Safari浏览器
					if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
						return "IE";
					}; //判断是否IE浏览器
					var isWeixin = ua.indexOf('micromessenger') != -1;
					if (isWeixin) {
						return "micromessenger";
					}
				}
			}
			return "no"
		}

		/**
		 * 当前是否是H5版本
		 * @returns{boolean}
		 * @constructor
		 */
		public get IsHtml5(): boolean {
			return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
		}

		/**
		 * 是否是Safari浏览器
		 * @returns{boolean}
		 * @constructor
		 */
		public get IsSafariBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
		}

		/**
		 * 是否是Opera浏览器
		 * @returns{boolean}
		 * @constructor
		 */
		public get IsOperaBrowser(): boolean {
			return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
		}

	}
}