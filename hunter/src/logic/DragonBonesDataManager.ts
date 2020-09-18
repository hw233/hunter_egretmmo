namespace zj {
	// 龙骨数据文件管理类
	// zhaiweili
	// 2019.9.18
	export function setDragonBonesRemove(spine: dragonBones.EgretArmatureDisplay) {
		let clear = () => {
			spine.removeEventListener(egret.Event.REMOVED_FROM_STAGE, clear, this);
			clearSpine(spine);
		}
		spine.addEventListener(egret.Event.REMOVED_FROM_STAGE, clear, this);
	}
	export function clearSpine(spine: dragonBones.EgretArmatureDisplay) {
		if (spine) {
			if (spine.parent) {
				spine.parent.removeChild(spine);
			}
			if (spine.armature) {
				if (spine.animation) {
					spine.animation.reset();
					spine.animation.stop();
				}
				spine.armature.dispose();
				Game.DragonBonesDataManager.removeArmature(spine);
			}

			spine.dispose(true);
			spine.dbClear();
			spine = null;

			// this.spine.armature.dispose();
			// this.spine.dbClear();
			//this.spine.dispose(true);
			// this.spine = null;
		}
	}
	export class DragonBonesDataManager {

		private dragFactory: dragonBones.EgretFactory;
		private dbbinDatas: { [key: string]: any };
		private skeDatas: { [key: string]: dragonBones.DragonBonesData };//dragonBones.DragonBonesData
		private texureDatas: { [key: string]: dragonBones.TextureAtlasData };//dragonBones.TextureAtlasData
		public constructor() {
			this.dragFactory = new dragonBones.EgretFactory();
			this.skeDatas = {};
			this.texureDatas = {};
			this.dbbinDatas = {};
		}

		public parseSkeData(name: string, data: any, isParse: boolean) {
			if (name && data) {
				// name = name.replace("_ske.json", "");
				name = name.replace(".json", "");
				name = name.replace(".dbbin", "");
				if (isParse) {
					this.parseSke(name, data);
				} else {
					this.dbbinDatas[name] = data;
				}
			} else {
				egret.error("parse ske data null: " + name);
			}
		}
		public checkSkeData(name: string) {
			if (!this.skeDatas[name]) {
				let data = this.dbbinDatas[name];
				if (!data) {
					data = RES.getRes(name + "_dbbin");
				}
				if (data) {
					this.parseSke(name, data);
					delete this.dbbinDatas[name];
				} else {
					egret.error("check dragon ske data error: " + name);
				}
			}
		}
		private parseSke(name: string, data: any) {
			let info = this.dragFactory.parseDragonBonesData(data, name);
			if (info) {
				this.skeDatas[name] = info;
				this.dragFactory.removeDragonBonesData(name, false);
			} else {
				egret.error("parse ske error: " + name);
			}
		}
		public getSkeData(name: string) {
			this.checkSkeData(name);
			return this.skeDatas[name];
		}
		public hasSkeData(name: string): boolean {
			if (name && (this.skeDatas[name] || this.dbbinDatas[name])) {
				return true;
			}
			return false;
		}
		public hasTextureData(name: string): boolean {
			if (name && this.texureDatas[name]) {
				return true;
			}
			return false;
		}
		private getTextureData(name: string, texture: any): dragonBones.TextureAtlasData {
			let textData = this.texureDatas[name];
			if (!textData) {
				let textureJson = RES.getRes(name + "_json");
				if (textureJson) {
					textData = this.dragFactory.parseTextureAtlasData(textureJson, texture, name);
					if (textData) {
						this.texureDatas[name] = textData;
						this.dragFactory.removeTextureAtlasData(name, false);
					}
				}
			}
			return textData;
		}

		public getDragonBonesFactory(dbName: string): dragonBones.EgretFactory {
			let texture = RES.getRes(dbName + "_tex_png");
			if (!texture) {
				egret.error("getDragonBonesFactory - texture - error: " + dbName);
				return;
			}
			let textureData = this.getTextureData(dbName + "_tex", texture);
			if (!textureData) {
				egret.error("getDragonBonesFactory - textureData - error: " + dbName);
				return;
			}
			let dragonbonesData = this.getSkeData(dbName + "_ske");
			if (!dragonbonesData) {
				egret.error("getDragonBonesFactory - dragonbonesData - error: " + dbName);
				return;
			}
			this.dragFactory.addDragonBonesData(dragonbonesData, dbName);
			this.dragFactory.addTextureAtlasData(textureData, dbName);
			textureData["renderTexture"] = texture;
			return this.dragFactory;
		}

		public removeArmature(display: dragonBones.EgretArmatureDisplay) {
			if (display.armature)
				this.dragFactory.dragonBones.clock.remove(display.armature);
		}
	}
}