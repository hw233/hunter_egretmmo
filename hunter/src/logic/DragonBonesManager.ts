namespace zj {
    // 龙骨动画管理器
    // guoshanhe
    // 2018.11.2

    export class DragonBonesManager {
        // 需要放大2倍的骨骼动画列表
        private static scale2: string[] = ["jg_zhaomu", "baowu_eff", "cj_ysg_eff", "gonghuifuben", "guanghuan_eff_2",
            "mapcloud", "tupo_eff", "ui_lieren_jinjie", "wishspine", "bianshen_eff",
            "cao_guanghezuoyong_eff", "cj_ysg_eff", "huo_dazibaoyan_eff", "lei_cichang-leidun_eff",
            "lei_shiwanfute_eff", "wj_000_palisitong2_eff", "wj_005_saci_eff", "wj_048_heixiaojie_eff",
            "wj_050_hongka_eff", "wj_052_leiya_eff", "wj_053_jin_eff", "wj_053_wanghou_eff",
            "wj_054_nanijia_eff", "wj_054_sikai_eff", "yihou_heidong", "youling_qiyizhiguang_eff",
            "ys_suolian2_eff"];

        // 预加载一个骨骼动画资源(异步加载)
        // ui: 缓存的资源生命周期与ui一致，如果ui为null则与topDialog或topScene一致
        public preloadDragonbone(ui: egret.DisplayObjectContainer, dbName: string): Promise<{}> {
            let groupName = `ani_${dbName}_${egret.getTimer()}_${Math.random()}`;
            while (ui) {
                if (ui instanceof Dialog || ui instanceof Scene) break;
                if (ui == ui.parent || ui.parent == null) { ui = null; break; }
                ui = ui.parent;
            }
            if (!ui) ui = Game.UIManager.topDialog();
            if (!ui) ui = Game.UIManager.topScene();
            if (ui) groupName = `ani_${Game.UIManager.findUIName(<UI>ui)}_${ui.hashCode}_${dbName}`;

            if (ui && (<UI>ui).cachedGroupNames.hasOwnProperty(groupName)) return Promise.resolve({});

            // let dbJsonFileName = dbName + "_ske_json";
            // let texJsonFileName = dbName + "_tex_json";
            // let texFileName = dbName + "_tex_png";

            // if (!RES.createGroup(groupName, [dbJsonFileName, texJsonFileName, texFileName], true)) {
            if (!this.createGroup(groupName, dbName)) {
                let str = LANG("创建资源组失败:") + groupName;
                // toast(str);
                return Promise.reject(str);
            }

            let self = this;
            return new Promise((resolve, reject) => {
                Game.RESGroupManager.loadGroup(groupName, 0)
                    .then(() => {
                        if (ui && !(<UI>ui).cachedGroupNames.hasOwnProperty(groupName)) {
                            (<UI>ui).cachedGroupNames[groupName] = 0;
                        }
                        resolve({});
                        return;
                    })
                    .catch(() => { reject(`预加载骨骼动画失败[${groupName}]`) });
            });
        }

        // 同步获取一个骨骼动显示对象
        // ui: 缓存的资源生命周期与ui一致，如果ui为null则与topScene一致
        // dbName：骨骼动画资源全局唯一名字(共三个文件，如robot_ske.json,robot_tex.json,robot_tex.png，则填写robot即可)
        // armatureName: 骨骼动画资源中的骨骼名字，不设置则播放默认骨骼
        // @return: 返回一个骨骼显示对象(用于播放动画)
        public getArmatureDisplaySync(ui: egret.DisplayObjectContainer, dbName: string, armatureName?: string): dragonBones.EgretArmatureDisplay {
            if (armatureName == null || armatureName == undefined || armatureName.length == 0) armatureName = "armatureName";

            let groupName = `ani_${dbName}_${egret.getTimer()}_${Math.random()}`;
            while (ui) {
                if (ui instanceof Dialog || ui instanceof Scene) break;
                if (ui == ui.parent || ui.parent == null) { ui = null; break; }
                ui = ui.parent;
            }
            if (!ui) ui = Game.UIManager.topDialog();
            if (!ui) ui = Game.UIManager.topScene();
            if (ui) groupName = `ani_${Game.UIManager.findUIName(<UI>ui)}_${ui.hashCode}_${dbName}`;

            if (!this.createGroup(groupName, dbName)) {
                return null;
            }
            Game.RESGroupManager.loadGroup(groupName, 0);
            // let dbJsonFileName = dbName + "_ske_json";
            // let texJsonFileName = dbName + "_tex_json";
            // let texFileName = dbName + "_tex_png";

            // let dragonbonesData = this.getCacheRes(dbName, DragonBonesResManager.KEY_SKE);
            // let dragonbonesData = this.getCacheResSke(dbName, DragonBonesResManager.KEY_SKE);
            // let textureData = this.getCacheRes(dbName, DragonBonesResManager.KEY_TEX);
            // let texture = RES.getRes(texFileName);
            // if (dragonbonesData == null || textureData == null || texture == null) {
            //     //toast(LANG("动画资源未加载完整: " + dbName + ", " + (dragonbonesData == null ? "ske," : "") + (textureData == null ? "tex," : "") + (texture == null ? "png" : "")));
            //     return null;
            // }
            // let dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
            // if (null == dragonbonesFactory.parseDragonBonesData(dragonbonesData, dbName) ||
            //     null == dragonbonesFactory.parseTextureAtlasData(textureData, texture, dbName)) {
            //     toast(LANG("动画资源解析失败: " + dbName));
            //     return null;
            // }

            // let dragonbonesFactory = this.getDragonBonesFactory(dbName, dragonbonesData, textureData, texture);
            // if (!dragonbonesFactory) {
            //     return;
            // }
            // let armatureDisplay = dragonbonesFactory.buildArmatureDisplay(armatureName);
            let armatureDisplay = this.getArmatureDisplay(dbName, armatureName);
            if (armatureDisplay == null) {
                //toast(LANG("构造骨骼动画对象失败"));
                return null;
            }
            if (DragonBonesManager.isScale2(dbName)) {
                armatureDisplay.scaleX = 2;
                armatureDisplay.scaleY = 2;
            }

            if (ui && !(<UI>ui).cachedGroupNames.hasOwnProperty(groupName)) {
                (<UI>ui).cachedGroupNames[groupName] = 0;
            }
            return armatureDisplay;
        }

        // 异步获取一个骨骼显示对象(用于播放动画)
        // ui: 缓存的资源生命周期与ui一致，如果ui为null则与topScene一致
        // dbName：骨骼动画资源全局唯一名字(共三个文件，如robot_ske.json,robot_tex.json,robot_tex.png，则填写robot即可)
        // armatureName: 骨骼动画资源中的骨骼名字，不设置则播放默认骨骼
        // @return: 返回一个骨骼显示对象(用于播放动画)
        public getArmatureDisplayAsync(ui: egret.DisplayObjectContainer, dbName: string, armatureName?: string): Promise<dragonBones.EgretArmatureDisplay> {
            if (armatureName == null || armatureName == undefined || armatureName.length == 0) armatureName = "armatureName";

            return new Promise((resolve, reject) => {
                let groupName = `ani_${dbName}_${egret.getTimer()}_${Math.random()}`;
                while (ui) {
                    if (ui instanceof Dialog || ui instanceof Scene) break;
                    if (ui == ui.parent || ui.parent == null) { ui = null; break; }
                    ui = ui.parent;
                }
                if (!ui) ui = Game.UIManager.topDialog();
                if (!ui) ui = Game.UIManager.topScene();
                if (ui) groupName = `ani_${Game.UIManager.findUIName(<UI>ui)}_${ui.hashCode}_${dbName}`;

                // 实时加载后再播放
                // if (!RES.createGroup(groupName, [dbJsonFileName, texJsonFileName, texFileName], true)) {
                //     let str = LANG("创建资源组失败:") + groupName;
                //     toast(str);
                //     reject(str);
                //     return;
                // }
                if (!this.createGroup(groupName, dbName)) {
                    let str = LANG("创建资源组失败:") + groupName;
                    reject(str);
                    return;
                }
                Game.RESGroupManager.loadGroup(groupName, 0)
                    .then(() => {
                        this.dealGetArmatureDisplayAsync(resolve, reject, dbName, ui, groupName, armatureName);
                        return;
                    })
                    .catch((e) => {
                        console.log(e);
                        let str = LANG("动画资源加载失败:") + dbName;
                        toast(str);
                        reject(str);
                        return;
                    });
                return;
            });
        }

        // 处理异步获取一个骨骼时，加载完成后解压压缩包
        private dealGetArmatureDisplayAsync(resolve, reject, dbName: string, ui, groupName, armatureName: string): dragonBones.EgretArmatureDisplay {
            // let self = this;
            // let dragonbonesData = this.getCacheResSke(dbName, DragonBonesResManager.KEY_SKE);
            // let textureData = this.getCacheRes(dbName, DragonBonesResManager.KEY_TEX);
            // let texFileName = dbName + "_tex_png";
            // let texture = RES.getRes(texFileName);
            // if (dragonbonesData == null || textureData == null || texture == null) {
            //     let str = LANG("动画资源未加载完整: " + dbName + ", " + (dragonbonesData == null ? "ske," : "") + (textureData == null ? "tex," : "") + (texture == null ? "png" : ""));
            //     toast(str);
            //     reject(str);
            //     return;
            // }
            let armatureDisplay = this.getArmatureDisplay(dbName, armatureName);
            if (armatureDisplay == null) {
                let str = LANG("构造骨骼动画对象失败");
                toast(str);
                reject(str);
                return;
            }
            if (DragonBonesManager.isScale2(dbName)) {
                armatureDisplay.scaleX = 2;
                armatureDisplay.scaleY = 2;
            }

            if (ui && !(<UI>ui).cachedGroupNames.hasOwnProperty(groupName)) {
                (<UI>ui).cachedGroupNames[groupName] = 0;
            }
            resolve(armatureDisplay);
        }

        // 播放动画（可能异步加载动画再播放）
        // 播放完自动从父对象中移除
        // ui: 缓存的资源生命周期与ui一致，如果ui为null则与topScene一致
        // animation: 字符串时表示动作名，数字表示动作序号(从0开始)，null表示播放默认动作
        public playAnimation(ui: egret.DisplayObjectContainer, dbName: string, armatureName: string | null, animation: string | number | null, playTimes?: number): Promise<dragonBones.EgretArmatureDisplay> {
            if (armatureName == null || armatureName == undefined || armatureName.length == 0) armatureName = "armatureName";
            if (playTimes == null || playTimes == undefined) playTimes = 1; // 默认播放一次

            return new Promise((resolve, reject) => {
                this.getArmatureDisplayAsync(ui, dbName, armatureName)
                    .then((armatureDisplay) => {
                        armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, (e: dragonBones.AnimationEvent) => {
                            if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        }, null);
                        setDragonBonesRemove(armatureDisplay);
                        // armatureDisplay.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                        //     armatureDisplay.animation.stop();
                        //     armatureDisplay.animation.reset();
                        //     armatureDisplay.armature.dispose();
                        //     armatureDisplay.dbClear();
                        //     armatureDisplay.dispose(true);
                        //     if (armatureDisplay.parent) armatureDisplay.parent.removeChild(armatureDisplay);
                        // }, null);

                        this.setDisplayBlend(armatureDisplay, dbName, animation);
                        if (typeof animation == "string") {
                            armatureDisplay.animation.play(animation, playTimes);
                        } else if (typeof animation == "number") {
                            let names = armatureDisplay.animation.animationNames;
                            for (let i = 0; i < names.length; i++) {
                                if (animation == i) {
                                    armatureDisplay.animation.play(names[i], playTimes);
                                    break;
                                }
                            }
                        } else {
                            armatureDisplay.animation.play(null, playTimes);
                        }

                        resolve(armatureDisplay);
                        return;
                    })
                    .catch((reason) => {
                        reject(reason);
                    });
            });
        }

        /**
         * 获取龙骨动画， 动态替换其中图片。
         * 
         * @param ui 缓存的资源生命周期与ui一致，如果ui为null则与topScene一致
         * @param dbName 骨骼动画资源全局唯一名字(共三个文件，如robot_ske.json,robot_tex.json,robot_tex.png，则填写robot即可)。
         * @param armatureNodes 骨骼动画资源中的骨骼名字，null则播放默认骨骼。
         * @param displays 替换龙骨中的显示对象。
         * @param solts 龙骨中卡槽的名称。
         */
        public getAnimationWithBindImages(ui: egret.DisplayObjectContainer, dbName: string, armatureNodes: string | null, displays: Array<egret.DisplayObject>, solts: Array<string>): Promise<dragonBones.EgretArmatureDisplay> {
            return new Promise((resolve, reject) => {
                this.getArmatureDisplayAsync(ui, dbName, armatureNodes)
                    .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                        for (let i = 0; i < solts.length; i++) {
                            let v = solts[i];
                            let slot = armatureDisplay.armature.getSlot(v);
                            let display = displays[i];
                            if (slot && display) {
                                if (display.parent) display.parent.removeChild(display);
                                slot.setDisplay(display);
                            }
                        }
                        setDragonBonesRemove(armatureDisplay);
                        resolve(armatureDisplay);
                        return;
                    }).catch((reason) => {
                        reject(reason);
                    });
            });
        }

        // 设置动画blend混合模式
        public setDisplayBlend(display: dragonBones.EgretArmatureDisplay, dbName: string, animation: string | number | null) {
            display.blendMode = egret.BlendMode.NORMAL;

            let item1 = TableClientAniCssSource.Item2(dbName);
            if (item1 == null) return;

            let index = 0;
            if (typeof animation == "string") {
                let names = display.animation.animationNames;
                for (index = 0; index < names.length; index++) {
                    if (animation == names[index]) break;
                }
            } else if (typeof animation == "number") {
                index = animation;
            }

            let item2 = TableClientAniUi.Item2(item1.id + "_" + index);
            if (item2 == null) return;
            if (item2.blend == 0) return; // 不需要混合

            display.blendMode = egret.BlendMode.ADD;
            return;
        }

        // 创建组
        private createGroup(groupName: string, dbName: string): boolean {
            let list = this.getGroupNames(dbName);
            if (RES.createGroup(groupName, list, true)) {
                Game.DragonBonesDataManager.checkSkeData(dbName + "_ske");
                return true;
            }
            toast(LANG("创建资源组失败:") + groupName);
            return false;
        }

        // 获取组的加载列表
        private getGroupNames(dbName: string): string[] {
            let list = [dbName + "_tex_png"];
            if (!Game.DragonBonesDataManager.hasTextureData(dbName + "_tex")) {
                list.push(dbName + "_tex_json");
            }
            if (!Game.DragonBonesDataManager.hasSkeData(dbName + "_ske")) {
                list.push(dbName + "_ske_dbbin");
            }
            return list;
        }

        public static isScale2(key: string): boolean {
            return DragonBonesManager.scale2.indexOf(key) >= 0;
        }

        public getArmatureDisplay(dbName: string, armatureName): dragonBones.EgretArmatureDisplay {
            let dragonbonesFactory = Game.DragonBonesDataManager.getDragonBonesFactory(dbName);
            if (!dragonbonesFactory) {
                return null;
            }
            let armatureDisplay = dragonbonesFactory.buildArmatureDisplay(armatureName);
            dragonbonesFactory.removeDragonBonesData(dbName, false);
            dragonbonesFactory.removeTextureAtlasData(dbName, false);
            return armatureDisplay;
        }
    }
}