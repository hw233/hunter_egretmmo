namespace zj {

	export function closeCache(obj: egret.DisplayObjectContainer): void {
		CacheImgManager.getInstance().closeCache(obj);
	}
	export function closeCaches(objs: egret.DisplayObjectContainer[]): void {
		CacheImgManager.getInstance().closeCacheList(objs);
	}
	export function setCache(obj: egret.DisplayObject, count: number = 3): void {
		CacheImgManager.getInstance().setCache(obj, count);
	}
	export function setCaches(objs: egret.DisplayObject[], count: number = 3): void {
		CacheImgManager.getInstance().setCaches(objs, count);
	}

	/**
	 * 位图缓存管理类
	 */
	export class CacheImgManager {

		public static isOpenCache: boolean = true;// 位图缓存开关

		private static instance: CacheImgManager = null;
		private constructor() {
		}
		public static getInstance(): CacheImgManager {
			if (!CacheImgManager.instance) {
				CacheImgManager.instance = new CacheImgManager();
			}
			return CacheImgManager.instance;
		}

		public closeCache(obj: egret.DisplayObjectContainer) {
			obj.cacheAsBitmap = false;
		}
		public closeCacheList(objs: egret.DisplayObjectContainer[]) {
			if (objs) {
				for (let i = objs.length - 1; i >= 0; --i) {
					this.closeCache(objs[i]);
				}
			}
		}

		public setCaches(objs: egret.DisplayObject[], count: number = 3) {
			if (objs) {
				for (let i = objs.length - 1; i >= 0; --i) {
					this.setCache(objs[i], count);
				}
			}
		}
		public setCache(obj: egret.DisplayObject, count: number = 3) {
			if (CacheImgManager.isOpenCache) {
				if (this.checkRes(obj)) {
					obj.cacheAsBitmap = true;
				} else {
					if (count > 0) {
						egret.setTimeout(this.setCache, this, 500, obj, count - 1);
					} else {
						egret.error("setCache fail");
					}
				}
			}
		}

		private checkRes(obj: egret.DisplayObject): boolean {
			if (!obj.visible) {
				return true;
			}
			if (egret.is(obj, "eui.Image")) {
				let res = (obj as eui.Image).source as string;
				if (res && !RES.getRes(res)) {
					return false;
				}
				return true;
			}
			if (egret.is(obj, "egret.DisplayObjectContainer")) {
				for (let i = (obj as egret.DisplayObjectContainer).numChildren - 1; i >= 0; --i) {
					let childDisplay = (obj as egret.DisplayObjectContainer).getChildAt(i);
					if (!this.checkRes(childDisplay)) {
						return false;
					}
				}
			}
			return true;
		}
	}
}