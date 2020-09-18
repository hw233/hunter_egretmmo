namespace zj {
	/**
	 * MovieClip 管理类
	 * 翟伟利
	 * 2019.12.10
	 */
	export class AnimationManager {
		
		private pool: AnimationBody[] = [];
		private poolTime: AnimationTime[] = [];

		private checkRes(res: string){
			if(res && RES.hasRes(res + "_png") && RES.hasRes(res + "_json")){
				return true;
			}
			console.error("AnimationBody - create - res - not found: " + res);
			return false;
		}

		public create(res: string, actionName: string = null, isAutoRemove: boolean = false) {
			if (!this.checkRes(res)) {
				return null;
			}
			let ani: AnimationBody = null;
			if (this.pool.length > 0) {
				ani = this.pool.shift();
			} else {
				ani = new AnimationBody();
			}
			ani.setRes(res, actionName, isAutoRemove);
			return ani;
		}

		public createTime(res: string, timeMin: number, timeMax: number){
			if (!this.checkRes(res)) {
				return null;
			}
			let ani: AnimationTime = null;
			if (this.poolTime.length > 0) {
				ani = this.poolTime.shift();
			} else {
				ani = new AnimationTime();
			}
			ani.setRes(res);
			ani.setTime(timeMin, timeMax);
			return ani;
		}

		public return(body: AnimationBody){
			// let className = egret.getQualifiedClassName(body);
			// if("zj.AnimationTime" == className){
			// 	this.poolTime.push(body as AnimationTime);
			// } else if("zj.AnimationBody" == className){
			// 	this.pool.push(body);
			// }
		}
	}
}