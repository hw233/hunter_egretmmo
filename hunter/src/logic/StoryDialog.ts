namespace zj {
	export class StoryDialog {
		//////////////////////////////////////原Dialog.lua/////////////////////////////////
		public static Dialog = {
			// tableContentCell: Array<{ direction: number, name: string, content: string, sound: number }>,
			// tablePicCell: Array<{ spine: number, action: string, scale: number, flip: number }>,
			tableContentCell: null,
			tablePicCell: null,
		}

		public static ResetGameInfo() {
			this.Dialog.tableContentCell = [];
			this.Dialog.tablePicCell = [];
		}

		public static init() {
			this.Dialog.tableContentCell = [];
			this.Dialog.tablePicCell = [];
		}

		/**
		 * 给对话添加内容
		 * @param direction {0,1} 头像所在的位置
		 * @param name {string} 人物名字
		 * @param content {string} 对话内容
		 * @param sound {string} 音乐
		 */
		public static addContent(direction: number, name: string, content, sound: number) {
			let info = {
				direction: direction,
				name: name,
				content: content,
				sound: sound,
			};

			this.Dialog.tableContentCell.push(info);
		}

		/**
		 * 给对话添加人物头像
		 * @param spine {number} 人物spine ID
		 * @param action {string} spine的动作名称
		 * @param scale {number} spine 的缩放
		 * @param flip  {0,1} 是否翻转
		 */
		public static addHead(spine: number, action: string, scale: number, flip: number) {
			let info = {
				spine: spine,
				action: action,
				scale: scale,
				flip: flip,
			}
			this.Dialog.tablePicCell.push(info);
		}

		public static start(bShowAtOnce?: boolean) {
			// let dialog = newUI(Dialog_Main);
			// dialog['showDialog']();
			
			// loadUI(Dialog_Main)
			// 	.then((dialog: Dialog_Main) => {
			// 		dialog.show();
			// 	})
		}

		public static GetCurScene(): any {
			return StageSceneManager.Instance.GetCurScene();
		}

		/////////////////////////////////////剧情start/////////////////////////////////////

		public static startPlot(items: TableClientTableStory[], callback: Function = null, thisObj: any = null){
			let dialog = newUI(PlotMain);
			if(dialog.initData(items, callback, thisObj)){
				dialog.showDialog();
				return true;
			}
			return false;
		}

		public static getPlotCacheImg(item: TableClientTableStory){
			let str = "plot_" + item.content + "_";
			let idx = 0;
			let isHas = true;
			let result = [];
			while(isHas){
				isHas = false;
				let name = str + idx + "_png";
				if(RES.hasRes(name)){
					isHas = true;
					result.push(name);
				}
				let nameTalk = str + (idx + 10) +"_png";
				if(RES.hasRes(nameTalk)){
					isHas = true;
					result.push(nameTalk);
				}
				if(isHas){
					++idx;
				}
			}
			if(result.length == 0){
				result = null;
			}
			return result;
		}

		/////////////////////////////////////剧情end/////////////////////////////////////
		// 对话表
		private static storyMap: { [key: string]: TableClientTableStory[] };
		// tip表
		private static tipMap: { [key: string]: TableClientTableStory };
		// 剧情表
		private static plotMap: { [key: string]: TableClientTableStory[] };
		private static isInit: boolean = false;// 是否初始化
		/**
		 * 初始化剧情表，分表管理剧情和tips
		 */
		private static initStory() {
			if (!this.isInit) {
				this.isInit = true;
				this.storyMap = {};
				this.tipMap = {};
				this.plotMap = {};
				let map = TableClientTableStory.Table();
				for (let key in map) {
					this.addStory(map[key])
				}
			}
		}
		private static addStory(item: TableClientTableStory) {
			let key = item.id + "_" + item.step;
			switch (item.type) {
				case 0:
					if (!this.storyMap[key]) {
						this.storyMap[key] = [];
					}
					this.storyMap[key][item.idx] = item;
					break;
				case 1:
					this.tipMap[key] = item;
					break;
				case 2:
					if (!this.plotMap[key]) {
						this.plotMap[key] = [];
					}
					this.plotMap[key][item.idx] = item;
					break;
			}
		}
		/**
		 * 获取tips文字内容
		 */
		public static getItemTip(name, ext) {
			this.initStory();
			let key = name + "_" + ext;
			return this.tipMap[key];
		}
		
		/**
		 * 获取剧情对象
		 */
		public static getItemStory(name, ext) {
			this.initStory();
			let key = name + "_" + ext;
			return this.storyMap[key];
		}
		
		/**
		 * 获取剧情对象
		 */
		public static getItemPlot(name, ext) {
			this.initStory();
			let key = name + "_" + ext;
			return this.plotMap[key];
		}
	}
}