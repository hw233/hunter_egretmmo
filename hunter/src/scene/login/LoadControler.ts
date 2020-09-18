namespace zj {
	// 资源加载控制类
	// 翟伟利 
	// 创建于2020.1.7
	export class LoadControler {
		private resKeys: string[];

		private callFinish: Function;
		private callProgress: Function;

		private reLoadNum: number;
		private loadIdx: number;
		private isStart: boolean;

		public constructor(keys: string[], callFinish: Function, callProgress: Function) {
			this.callFinish = callFinish;
			this.callProgress = callProgress;
			this.isStart = false;
			this.initDatas(keys);
		}
		public initDatas(keys: string[]) {
			if (!this.isStart) {
				this.resKeys = keys;
			} else {
				console.log("已开始加载则不能重置加载列表");
			}
		}
		public addDatas(keys: string[]) {
			if (keys && keys.length > 0) {
				this.resKeys = this.resKeys.concat(keys);
			}
		}
		public onStart() {
			if (!this.isStart) {
				if (this.resKeys && this.resKeys.length > 0) {
					this.loadIdx = 0;
					this.isStart = true;
					this.loadRes();
				} else {
					if (this.callFinish) {
						this.callFinish();
					}
				}
			}
		}

		private loadRes() {
			this.reLoadNum = 2;
			this.load();
		}

		private load() {
			if (this.loadIdx < this.resKeys.length) {
				let self = this;
				let key = this.resKeys[this.loadIdx];
				RES.getResAsync(key)
					.then((data: any) => {
						if (this.callProgress) {
							this.callProgress(key, self.loadIdx);
						}
						self.loadIdx++;
						self.loadRes();
					})
					.catch((e) => {
						if (--this.reLoadNum < 0) {
							Main.renetDialog.show(() => {
								self.loadRes();
							});
						} else {
							this.load();
						}
					});
			} else {
				if (this.callFinish) {
					this.callFinish();
				}
			}
		}
	}
}