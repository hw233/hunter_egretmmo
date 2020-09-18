/**龙骨动画对象池*/
namespace zj {
	export class dragonBonesPool {
		/**对象池*/
		private pool = {};
		private static _instance: dragonBonesPool;
		public constructor() {
		}
		public static getInstance(): dragonBonesPool {
			if (dragonBonesPool._instance == null) {
				dragonBonesPool._instance = new dragonBonesPool();
			}
			return dragonBonesPool._instance;
		}
		/**
		 * 根据类型将对象回收对象池。
		 * @param itemName对象类名
		 * @param item对象实例
		 * */
		public returnItem(itemName: string, item: any) {
			if (!this.pool[itemName]) {//这个判断是为了那些不需要在对象池创建的用
				this.pool[itemName] = [];
			}
			this.pool[itemName].push(item);
		}
		/**根据类型从对象池里拿一个出来，如果没有就返回null*/
		public getTypeItem(itemName: string) {
			if (!this.pool[itemName]) {//这个判断是为了那些不需要在对象池创建的用
				this.pool[itemName] = [];
			}
			let arr = this.pool[itemName];
			if (arr.length > 0) {
				let obj = arr[0];
				arr.splice(0, 1);
				return obj;
			}
			return null;
		}
		// public removeFromStage(spine: dragonBones.EgretArmatureDisplay, name: string){
		// 	let list: dragonBones.EgretArmatureDisplay[] = this.pool[name];
		// 	if (list) {
		// 		for(let i = 0; i < list.length; ++i){
		// 			if(list)
		// 		}
		// 		clearSpine(spine.spine);
		// 	}
		// }
		/**根据类型释放对应的对象池*/
		public destoryTypePool(itemName: string) {
			if (this.pool[itemName]) {
				let arr = this.pool[itemName];
				while (arr.length > 0) {
					let spine = arr[0];
					clearSpine(spine.spine);
					arr.splice(0, 1);
					spine = null;
				}
			}
		}
		public dbArr = [];
		/**释放对象池所有对象 */
		public destoryPool() {
			// if (this.dbArr.length > 150) {
				for (let k in this.pool) {
					this.destoryTypePool(k);
					this.pool[k].length = 0;
				}
				this.pool = {};
				while (this.dbArr.length > 0) {
					let spine = this.dbArr[0];
					clearSpine(spine.spine);
					this.dbArr.splice(0, 1);
					spine.spine = null;
					spine = null;
				}
				this.dbArr.length = 0;
				// Game.DragonBonesResManager.checkFactory();
			// }
		}
	}
}