namespace zj {
	// 龙骨压缩包管理类
	// zhaiweili
	// 2019.8.6
	export class DragonBonesResManager {
		// // 龙骨工厂对象map
		// private dragonBonesFactoryMap: { [key: string]: dragonBones.EgretFactory } = {};
		// // 龙骨工厂对象列表
		// private dragonBonesFactoryList: string[] = null;

		// private resMap: { [key: string]: JSON } = null; // 配置表
		// private resList: string[] = null; // 配置表
		// public static readonly KEY_SKE: string = "_ske";
		// public static readonly KEY_TEX: string = "_tex";
		// public static readonly KEY_SUFFIC: string = "zip";
		// public static readonly SAVE_COUNT_MAX: number = 70;// 存储上限
		// public static readonly SAVE_COUNT_MIN: number = 50;// 存储下限

		// public static readonly SAVE_FACTORY_COUNT_MAX: number = 250;// 骨骼工厂存储上限
		// public static readonly SAVE_FACTORY_COUNT_MIN: number = 150;// 骨骼工厂存储下限
		// public constructor() {
		// 	this.resMap = {};
		// 	this.resList = [];

		// 	this.dragonBonesFactoryMap = {};
		// 	this.dragonBonesFactoryList = [];
		// }
		// /**
		//  * 解析zip文件
		//  * key：gw_005_mutou_ske
		//  * zip：RES.getRes("gw_005_mutou_ske_zip");
		//  */
		// public async parseZip(key: string, zip): Promise<{}> {
		// 	let self = this;
		// 	return new Promise((resolve, reject) => {
		// 		JSZip.loadAsync(zip).then((zipdata) => {
		// 			zipdata.forEach((path, file) => {
		// 				file.async('text').then(text => {
		// 					self.pushDragonJson(key, JSON.parse(text));
		// 					resolve();
		// 				})
		// 			});
		// 		})
		// 	});
		// }
		// // 将新解析出来的json压到集合里
		// public pushDragonJson(key: string, json: JSON) {
		// 	if (!this.resMap[key]) {
		// 		this.resMap[key] = json;
		// 		this.resList.push(key);
		// 		this.checkDestroyRes();
		// 	}
		// }
		// // 检测内存中是否有此数据文件（检测本类中栈里的资源和RES管理类中的资源）
		// public hasRes(key: string): boolean {
		// 	if (this.resMap[key] || RES.getRes(key + "_json")) {
		// 		return true;
		// 	}
		// 	return false;
		// }
		// // 获取本地存储的龙骨数据文件
		// public getDragonJson(key: string): JSON {
		// 	let result = this.resMap[key];
		// 	if (result) {
		// 		let idx = this.resList.indexOf(key);
		// 		if (idx >= 0) {
		// 			this.resList.splice(idx, 1);
		// 		}
		// 		this.resList.push(key);
		// 	}
		// 	return result;
		// }
		// // 检测销毁（只存50个，超过上限则删除）
		// private checkDestroyRes() {
		// 	if (this.resList.length > DragonBonesResManager.SAVE_COUNT_MIN) {
		// 		let max = this.resList.length > DragonBonesResManager.SAVE_COUNT_MAX ? this.resList.length : this.resList.length - DragonBonesResManager.SAVE_COUNT_MIN;
		// 		for (let i = max - 1; i >= 0; --i) {
		// 			this.deleteRes(i);
		// 		}
		// 	}
		// 	//console.log("缓存zip数据个数: " + this.resList.length);
		// }
		// private deleteRes(idx: number) {
		// 	let key = this.resList[idx];
		// 	if (!RES.getRes(key + "_zip")) {
		// 		this.resList.splice(idx, 1);
		// 		delete this.resMap[key];
		// 	}
		// }
		// // 根据名称，判断获取需要加载的数据文件类型（json或zip）
		// public getDragonResName(dbName: string, suffix: string): string {
		// 	let name = dbName + suffix;
		// 	if (RES.hasRes(name + "_json")) {
		// 		return name + "_json";
		// 	}
		// 	if (RES.hasRes(name + "_" + DragonBonesResManager.KEY_SUFFIC)) {
		// 		return name + "_" + DragonBonesResManager.KEY_SUFFIC;
		// 	}
		// 	egret.error("DragonBonesResManager - getDragonResName - error: " + dbName + " + " + suffix);
		// 	return null;
		// }

		// // 获取存储的骨骼工厂实例
		// public getDragonBonesFactory(dbName: string, dragonbonesData, textureData, texture): dragonBones.EgretFactory {
		// 	let factory: dragonBones.EgretFactory = this.dragonBonesFactoryMap[dbName];
		// 	let isHasFactory = factory ? true : false;
		// 	if (factory) {
		// 		this.updateFactory(dbName);
		// 		let AtlasDataList = factory.getTextureAtlasData(dbName);
		// 		let AtlasData = AtlasDataList ? AtlasDataList[0] : null;
		// 		if(AtlasData){
		// 			AtlasData["renderTexture"] = texture;
		// 			AtlasData["texture"] = texture;
		// 		}
		// 	} else {
		// 		factory = new dragonBones.EgretFactory();
		// 		if (!factory.parseDragonBonesData(dragonbonesData, dbName)) {
		// 			toast(LANG("动画资源解析bonesData失败: " + dbName));
		// 			return null;
		// 		}
		// 		if (!factory.parseTextureAtlasData(textureData, texture, dbName)) {
		// 			toast(LANG("动画资源解析textureData失败: " + dbName));
		// 			return null;
		// 		}
		// 	}
			
		// 	if(!isHasFactory){
		// 		this.addFactory(dbName, factory);
		// 	}
		// 	return factory;
		// }
		// // 将新创建的骨骼工厂实例添加到队列
		// private addFactory(dbName: string, factory: dragonBones.EgretFactory) {
		// 	this.dragonBonesFactoryMap[dbName] = factory;
		// 	this.dragonBonesFactoryList.push(dbName);
		// 	//console.log("缓存骨骼工厂个数: " + this.dragonBonesFactoryList.length);
		// }
		// // 将工厂移到队列最后
		// private updateFactory(dbName: string) {
		// 	let factory: dragonBones.EgretFactory = this.dragonBonesFactoryMap[dbName];
		// 	let idx = this.dragonBonesFactoryList.indexOf(dbName);
		// 	if (idx >= 0) {
		// 		this.dragonBonesFactoryList.splice(idx, 1);
		// 	}
		// 	this.dragonBonesFactoryList.push(dbName);
		// }
		// // 检测超过存储数量的工厂则被移除
		// public checkFactory() {
		// 	if (this.dragonBonesFactoryList.length > DragonBonesResManager.SAVE_FACTORY_COUNT_MIN) {
		// 		// let max = this.dragonBonesFactoryList.length > DragonBonesResManager.SAVE_FACTORY_COUNT_MAX ? this.dragonBonesFactoryList.length : this.dragonBonesFactoryList.length - DragonBonesResManager.SAVE_FACTORY_COUNT_MIN;
		// 		let max = this.dragonBonesFactoryList.length - DragonBonesResManager.SAVE_FACTORY_COUNT_MIN;
		// 		for (let i = max - 1; i >= 0; --i) {
		// 			this.deleteFactory(i);
		// 		}
		// 		//console.log("清理骨骼工厂 - 个数: " + this.dragonBonesFactoryList.length);
		// 	}
		// }
		// /**
		//  * 移除骨骼工厂
		//  * idx:队列中的位置
		//  * isCheckRes: 是否检测RES中图片是否被释放（ture：如资源没被释放，则工厂不移除； false：不检测资源，直接移除工厂）
		//  */
		// private deleteFactory(idx: number, isCheckRes: boolean = true) {
		// 	let dbName = this.dragonBonesFactoryList[idx];
		// 	if (!isCheckRes || !RES.getRes(dbName + "_tex_png")) {
		// 		let factory: dragonBones.EgretFactory = this.dragonBonesFactoryMap[dbName];
		// 		this.dragonBonesFactoryList.splice(idx, 1);
		// 		delete this.dragonBonesFactoryMap[dbName];
		// 	}
		// }
	}
}