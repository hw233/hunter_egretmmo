namespace zj {


    export class FightHelper {
        public static FIGHT_ASSISTANCE_IDX = 4;
        public static FIGHT_ASSISTANCE: number = 102;// 援护
        private static rc: egret.Rectangle = new egret.Rectangle();
        private static pzPoint: egret.Point = new egret.Point();
        public static getSpineRect(spine, name) {
            let pz = name + "_pz";
            let pzSlot = spine.armature.getSlot(pz);
            if (!pzSlot || pzSlot.display == null) {
                this.rc.x = 0;
                this.rc.y = 0;
                this.rc.width = 0;
                this.rc.height = 0;
                return this.rc;
            }
            let rootScaleX = 1;//root上不能有信息 现在这个没用了，就默认1
            let rootScaleY = 1;
            let rootParent;
            let rootRotation = 0;
            rootParent = pzSlot.parent;
            for (let i = 0; i < 10; i++) {
                if (rootParent) {
                    if (rootParent.name == "fuji") {
                        rootScaleX = rootParent.global.scaleX;
                        rootScaleY = rootParent.global.scaleY;
                        rootRotation = rootParent.global.rotation * (180 / Math.PI);
                    }
                    rootParent = rootParent.parent;
                    if (rootParent && rootParent.name == "root") {
                        break;
                    }
                } else {
                    break;
                }
            }

            let angBone = pzSlot.parent.global.rotation * (180 / Math.PI);
            let angSlot = pzSlot.global.rotation * (180 / Math.PI);
            if (angBone > 0 && angBone <= 10) {//判断一些手误导致的角度只限制-10到10
                angBone = 0;
            }
            if (angSlot < 0 && angSlot >= -10) {
                angSlot = 0;
            }
            let radioX = 0;
            let radioY = 0;

            let pzSlotdisplayW = pzSlot.display.width;
            let pzSlotdisplayH = pzSlot.display.height;

            let pzSlotglobalScaleX = pzSlot.global.scaleX;
            let pzSlotglobalScaleY = pzSlot.global.scaleY;

            let parentglobalScaleX = pzSlot.parent.global.scaleX;
            let parentglobalScaleY = pzSlot.parent.global.scaleY;

            rootRotation = rootRotation >= 0 ? Math.floor(rootRotation) : Math.ceil(rootRotation);
            if (rootRotation > 0) {
                angBone = rootRotation;
            }
            angBone = angBone >= 0 ? Math.floor(angBone) : Math.ceil(angBone);
            angSlot = angSlot >= 0 ? Math.floor(angSlot) : Math.ceil(angSlot);

            if ((angBone + angSlot + rootRotation) % 180 != 0) {
                [pzSlotdisplayW, pzSlotdisplayH] = [pzSlot.display.height, pzSlot.display.width];
                [pzSlotglobalScaleX, pzSlotglobalScaleY] = [pzSlot.global.scaleY, pzSlot.global.scaleX];
                [parentglobalScaleX, parentglobalScaleY] = [pzSlot.parent.global.scaleY, pzSlot.parent.global.scaleX];
                [rootScaleX, rootScaleY] = [rootScaleY, rootScaleX];
            }

            let standX = pzSlot.parent.global.x;
            let standY = pzSlot.parent.global.y;

            switch (angBone) {
                case 0:
                    radioX = standX + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
                case 90:
                    // standX = pzSlot.parent.global.y * -1;
                    // standY = pzSlot.parent.global.x * -1;
                    radioX = standX - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case -90:
                    // standX = pzSlot.parent.global.y //+ pzSlot.parent.global.y;
                    // standY = pzSlot.parent.global.x //+ pzSlot.parent.global.x;
                    radioX = standX + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case 180:
                    radioX = standX - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
            }
            let worldPoint = spine.armature.display.localToGlobal(radioX, radioY, this.pzPoint);
            worldPoint.x -= Game.UIManager.x;
            this.rc.width = pzSlotdisplayW * pzSlotglobalScaleX * parentglobalScaleX * rootScaleX;//这两句是龙骨里面最终的大小
            this.rc.height = pzSlotdisplayH * pzSlotglobalScaleY * parentglobalScaleY * rootScaleY;
            this.rc.width = this.rc.width * spine.scaleY// * StageSceneManager.Instance.GetCurScene().uiScale;
            this.rc.height = this.rc.height * spine.scaleY// * StageSceneManager.Instance.GetCurScene().uiScaleY;//这两句是龙骨到游戏里最终的大小
            this.rc.x = worldPoint.x - this.rc.width / 2;
            this.rc.y = worldPoint.y - this.rc.height / 2;
            return this.rc;
        }

    }

    // 战斗辅助类
    // Lilou
    // 2018-12-10

    // 辅助函数
    export function adjustIndex(index): number {
        return index - 1;
    }
    export function CC_SAFE_DELETE(instance) {
        if (instance != null) {
            instance.release();
            instance = null;
        }
    }

    export function isCanUseVec(t) {
        if (t == null) return false;
        let s = t.length;
        if (s == 0) return false;
        if (s == 1 && s[0] == -1) return false;
        return true;
    }


    export function booln(num) {
        return num > 0
    }

    export function yuan3(condition, param1, param2) {
        if (condition == true) {
            return param1
        }
        else
            return param2
    }

    export function getBoolean(number) {
        return number > 0 ? true : false;
    }

    export function turnBool(b) {
        return b != true
    }

    export function createAiSpeedRoleInfo(id, bEnemy, bSupport, speed, pressCd, _bSupport, pos) {
        let info = { id: id, bEnemy: bEnemy, bSupport: bSupport, speed: speed, ext: 0 * 100000 + speed * 1000 + (5 - pos) * 10 + yuan3(bEnemy == false, 1, 0) }
        info.id = id
        info.bEnemy = bEnemy
        info.bSupport = bSupport
        info.speed = speed
        let tmp = 0
        if (pressCd != null) {
            //tmp =  math.abs( pressCd.overflow/1000 )     
        }
        // + yuan3(bSupport == true, 4, 2)
        return info
    }

    export function isPointInCircle(point, center, r) {
        let tag = false
        let px1 = point.x
        let py1 = point.y
        let px2 = center.x
        let py2 = center.y

        let x = px1 - px2
        let y = py1 - py2
        let xie = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        if (xie <= r) {
            tag = true
        }

        return tag
    }


    export function getSpineIsCollision(left, right) {
        // let aa = right.getRect();
        // let bb = left.getRect();
        //console.log("leftname:"+left.name+"left:x"+bb.x,"left:y"+bb.y,"left:width"+bb.width,"left:height"+bb.height);
        //console.log("rightname:"+right.name+"right:x"+aa.x,"right:y"+aa.y,"right:width"+aa.width,"right:height"+aa.height);
        let boo = left.getRect().intersects(right.getRect());
        //console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ______"+boo);

        return boo;
    }

    export function adaptRoleY(y) {
        // body
        let ww = UIManager.StageWidth;
        let aa = y / (UIManager.StageWidth / 960);
        return Math.floor(y / (960 / 960))
    }

    export function fromGeneral(id, transferLevel?) {
        // if (ckid(id)) {
        //     return null;
        // }
        // let mpr = PlayerHunterSystem.Table(id);
        // if (ckid(mpr)) {
        //     return null;
        // }
        // let mprID = mpr.general_roleId;
        // if (ckid(mprID)) {
        //     return null;
        // }
        // return TableMapRole.Item(mprID);

        if (ckid(id)) return null;
        let gnd = Game.PlayerHunterSystem.queryHunter(id);
        let mpr = Game.PlayerHunterSystem.Table(id, transferLevel || (gnd != null && gnd.transfer_level));
        if (ckid(mpr)) return null;
        // let mprID = (transferLevel != null || gnd != null) ? mpr.transfer_role : mpr.general_roleId;
        let mprID = (transferLevel != null || gnd != null) && mpr.transfer_role || mpr.general_roleId
        if (ckid(mprID)) return null;
        return TableMapRole.Item(mprID);
    }
    export function getPercentSize(size, percent) {
        return { width: size.width * percent, height: size.height }
    }

    // 兼容cocos动画的接口类
    export class Spx {

        public bInit = false;
        public name: string = ""
        public spine: dragonBones.EgretArmatureDisplay = null;
        private spineState: dragonBones.AnimationState
        public bLoop: boolean = true;
        private actionId: number = 0;
        public scale: number = 1;
        private isScale;
        public spineScaleX;
        public spineScaleY;

        constructor() {
        }

        public attachDisplay(display: dragonBones.EgretArmatureDisplay) {
            this.spine = display;
        }

        public setVisibleSpx(bVisible) {
            this.spine.visible = bVisible;
        }

        public getPositionX() {
            return this.spine.x;
        }

        public getPositionY() {
            return this.spine.y;
        }

        public SetPosition(x: number, y: number) {
            this.spine.x = x;
            this.spine.y = y;
        }
        //设置混合模式
        public setBlendAdditive(blend) {
            if (blend) {
                this.spine.blendMode = egret.BlendMode.ADD;
            } else {
                this.spine.blendMode = "";
            }

        }

        public isVisible() {
            return this.spine.visible;
        }
        public setSpeedScale(playSpeed) {
            this.spine.animation.timeScale = playSpeed;
        }
        public setScaleX(scaleX) {
            this.spine.scaleX = scaleX;
        }
        public setFlipX(bFlip) {
            this.isScale = bFlip;
            let scalex = this.scale;
            this.spine.scaleX = (bFlip ? -scalex : scalex);
        }
        /***是否循环 */
        public SetLoop(bLoop) {
            this.bLoop = bLoop;
        }
        public setOpacity(trans) {
            this.spine.alpha = trans;
        }

        public stopAllActions() {
            this.spine.animation.stop();
        }
        public clearSpine() {
            if (this.spine && this.spine.parent) {
                this.spine.parent.removeChild(this.spine);
                this.spine.animation.reset();
                this.stopAllActions();

                // this.spine.armature.dispose();
                // this.spine.dbClear();
                //this.spine.dispose(true);
                // this.spine = null;
            }
            dragonBonesPool.getInstance().returnItem(this.name, this);
        }
        private playerName;
        public ChangeAction(spxActionId) {
            this.actionId = spxActionId;
            let names = this.spine.animation.animationNames;
            for (let i = 0; i < names.length; i++) {
                if (this.actionId == i) {
                    this.playerName = names[i];
                    this.spineState = this.spine.animation.play(names[i], this.bLoop ? 0 : 1);
                    // egret.setTimeout(() => { this.spine.animation.play(names[i], 0); }, this, 1000);
                    break;
                }
            }
        }
        /**播放指定名字动画 */
        public ChangeAnimation(name) {
            let names = this.spine.animation.animationNames;
            for (let i = 0; i < names.length; i++) {
                if (names[i] == name) {
                    this.actionId = i;
                    this.playerName = names[i];
                    this.spineState = this.spine.animation.play(this.playerName, this.bLoop ? 0 : 1);
                    // egret.setTimeout(() => { this.spine.animation.play(this.playerName, 0) }, this, 1000);
                }
            }
        }

        public GetCurFrm() {
            if (this.spineState.animationData) {
                return this.spineState.animationData.frameCount * (this.spineState.currentTime / this.spineState.totalTime);
            } else {
                return 0;
            }

        }

        // 是否帧变化
        public isLoopChange() {
            return this.bLoop;
        }

        public UpdataAni(tick) {
            //
        }

        public Stop() {
            this.spine.animation.stop();
        }

        public SetAutoUpdate(bUpdate?) {
            //
        }

        public GetPosX() {
            return this.spine.x;
        }

        public GetPosY() {
            return this.spine.y;
        }

        public IsActEnd() {
            return this.spine.animation.isCompleted;
        }

        public resume() {
            //
            if (this.spineState) {
                this.spineState.play();
            }
        }

        public Pause() {
            //
            if (this.spineState) {
                this.spineState.stop();
            }
        }

        public setRotation(rotation) {
            this.spine.rotation = rotation;
        }
        public init() {
            if (this.spine) {
                this.lastFrame = -1;
            }
        }
        private lastFrame: number;

        private rc: egret.Rectangle = new egret.Rectangle();
        private pzPoint: egret.Point = new egret.Point();
        public getRect() {
            let pz = this.name + "_pz";
            let pzSlot = this.spine.armature.getSlot(pz);
            if (!pzSlot || pzSlot.display == null) {
                this.rc.x = 0;
                this.rc.y = 0;
                this.rc.width = 0;
                this.rc.height = 0;
                return this.rc;
            }
            let rootScaleX = 1;//root上不能有信息 现在这个没用了，就默认1
            let rootScaleY = 1;
            let rootParent;
            let rootRotation = 0;
            rootParent = pzSlot.parent;
            for (let i = 0; i < 10; i++) {
                if (rootParent) {
                    if (rootParent.name == "fuji") {
                        rootScaleX = rootParent.global.scaleX;
                        rootScaleY = rootParent.global.scaleY;
                        rootRotation = rootParent.global.rotation * (180 / Math.PI);
                    }
                    rootParent = rootParent.parent;
                    if (rootParent && rootParent.name == "root") {
                        break;
                    }
                } else {
                    break;
                }
            }

            let angBone = pzSlot.parent.global.rotation * (180 / Math.PI);
            let angSlot = pzSlot.global.rotation * (180 / Math.PI);
            if (angBone > 0 && angBone <= 10) {//判断一些手误导致的角度只限制-10到10
                angBone = 0;
            }
            if (angSlot < 0 && angSlot >= -10) {
                angSlot = 0;
            }
            let radioX = 0;
            let radioY = 0;

            let pzSlotdisplayW = pzSlot.display.width;
            let pzSlotdisplayH = pzSlot.display.height;

            let pzSlotglobalScaleX = pzSlot.global.scaleX;
            let pzSlotglobalScaleY = pzSlot.global.scaleY;

            let parentglobalScaleX = pzSlot.parent.global.scaleX;
            let parentglobalScaleY = pzSlot.parent.global.scaleY;

            rootRotation = rootRotation >= 0 ? Math.floor(rootRotation) : Math.ceil(rootRotation);
            if (rootRotation > 0) {
                angBone = rootRotation;
            }
            angBone = angBone >= 0 ? Math.floor(angBone) : Math.ceil(angBone);
            angSlot = angSlot >= 0 ? Math.floor(angSlot) : Math.ceil(angSlot);



            if ((angBone + angSlot + rootRotation) % 180 != 0) {
                [pzSlotdisplayW, pzSlotdisplayH] = [pzSlot.display.height, pzSlot.display.width];
                [pzSlotglobalScaleX, pzSlotglobalScaleY] = [pzSlot.global.scaleY, pzSlot.global.scaleX];
                [parentglobalScaleX, parentglobalScaleY] = [pzSlot.parent.global.scaleY, pzSlot.parent.global.scaleX];
                [rootScaleX, rootScaleY] = [rootScaleY, rootScaleX];
            }

            let standX = pzSlot.parent.global.x;
            let standY = pzSlot.parent.global.y;

            switch (angBone) {
                case 0:
                    radioX = standX + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
                case 90:
                    // standX = pzSlot.parent.global.y * -1;
                    // standY = pzSlot.parent.global.x * -1;
                    radioX = standX - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY + pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case -90:
                    // standX = pzSlot.parent.global.y //+ pzSlot.parent.global.y;
                    // standY = pzSlot.parent.global.x //+ pzSlot.parent.global.x;
                    radioX = standX + pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    radioY = standY - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    break;
                case 180:
                    radioX = standX - pzSlot.global.x * parentglobalScaleX * rootScaleX;
                    radioY = standY - pzSlot.global.y * parentglobalScaleY * rootScaleY;
                    break;
            }
            let worldPoint = this.spine.armature.display.localToGlobal(radioX, radioY, this.pzPoint);
            worldPoint.x -= Game.UIManager.x;
            this.rc.width = pzSlotdisplayW * pzSlotglobalScaleX * parentglobalScaleX * rootScaleX;//这两句是龙骨里面最终的大小
            this.rc.height = pzSlotdisplayH * pzSlotglobalScaleY * parentglobalScaleY * rootScaleY;
            this.rc.width = this.rc.width * this.spine.scaleY// * StageSceneManager.Instance.GetCurScene().uiScale;
            this.rc.height = this.rc.height * this.spine.scaleY// * StageSceneManager.Instance.GetCurScene().uiScaleY;//这两句是龙骨到游戏里最终的大小
            this.rc.x = worldPoint.x - this.rc.width / 2;
            this.rc.y = worldPoint.y - this.rc.height / 2;
            return this.rc;
        }
        // public getRect() {
        //     let temp = this.spine.animation.getStates()[0];
        //     let timeDis = 1 / temp.animationData.frameCount;// 每帧间隔时间
        //     let currTime = temp.currentTime;// 骨骼动画当前已播放的时间
        //     let frameIdx = Math.floor(currTime / timeDis);// 动画当前播放的帧索引
        //     if(frameIdx == this.lastFrame){
        //         return this.rc;
        //     } 
        //     else if(frameIdx - this.lastFrame > 1){// 如果跳帧，则检测前N帧的碰撞
        //         this.rc = FightHelper.getSpineRect(this.spine, this.name);
        //         for(let i = this.lastFrame + 1; i < frameIdx; ++i){
        //             temp.currentTime = (i + 0.5) * timeDis;
        //             this.spine.armature.advanceTime(0);
        //             this.updateRect(this.rc, FightHelper.getSpineRect(this.spine, this.name));
        //         }
        //         temp.currentTime = currTime;
        //         this.spine.armature.advanceTime(0);
        //         this.lastFrame = frameIdx;
        //         return this.rc;
        //     }
        //     this.lastFrame = frameIdx;
        //     let rect = FightHelper.getSpineRect(this.spine, this.name);
        //     this.rc.setTo(rect.x,rect.y,rect.width,rect.height);
        //     return this.rc;
        // }

        private updateRect(rectMy: egret.Rectangle, rect: egret.Rectangle) {
            if (rect.width != 0 && rect.height != 0) {
                if (rectMy.width != 0 && rectMy.height != 0) {
                    rectMy.left = Math.min(rectMy.left, rect.left);
                    rectMy.top = Math.min(rectMy.top, rect.top);
                    rectMy.right = Math.max(rectMy.right, rect.right);
                    rectMy.bottom = Math.max(rectMy.bottom, rect.bottom);
                } else {
                    rectMy.setTo(rect.x, rect.y, rect.width, rect.height);
                }
            }
        }

        public SetScale(scale) {
            this.scale = scale;
            this.spine.scaleX = this.scale;
            this.spine.scaleY = this.scale;
            this.setFlipX(this.isScale);
        }

    }
    // 返回spine
    export function HunterSpineX(spineId: number, scale: number = 1, armatureName?: string, spineName?: string, isPool = true, ui: any = null): [Spx, number] {
        let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(spineId);
        let dbName = "";
        if (spineTable && spineName == null) {
            dbName = spineTable.json;
        } else {
            dbName = spineName;
        }
        // if (dbName == "gw_019_shoushuishou") {
        //     let aaaa;
        // }
        let spx: Spx;
        let order = 0;
        if (isPool) {
            spx = dragonBonesPool.getInstance().getTypeItem(dbName);
        }
        if (!spx) {
            let scene = ui ? ui : StageSceneManager.Instance.gettemporaryScene;
            let armatureDisplay: dragonBones.EgretArmatureDisplay = Game.DragonBonesManager.getArmatureDisplaySync(scene, dbName, armatureName);
            if (armatureDisplay) {
                spx = new Spx();
                if (isPool) {
                    dragonBonesPool.getInstance().dbArr.push(spx);
                }
                spx.spineScaleX = armatureDisplay.scaleX;
                spx.spineScaleY = armatureDisplay.scaleY;
                armatureDisplay.scaleX *= scale;
                armatureDisplay.scaleY *= scale;
                spx.scale = armatureDisplay.scaleY;
                spx.spine = armatureDisplay;
                spx.name = dbName;
                if (spineTable) {
                    order = spineTable.order;
                }
                spx.init();
            } else {
                // for (let i = 0; i < FightLoading.getInstance().resArr.length; i++) {
                //     if (FightLoading.getInstance().resArr[i] == dbName) {
                //         console.log("战斗预加载加载到了，一定是加载到了！！！！！！");
                //     }
                // }
                // console.log(FightLoading.getInstance().resArr);
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(贪婪之岛的不算)战斗资源没被加载到，这里这里:" + dbName);
            }
        } else {
            if (DragonBonesManager.isScale2(dbName)) {
                spx.spine.scaleX = 2;
                spx.spine.scaleY = 2;
            } else {
                spx.spine.scaleX = 1;
                spx.spine.scaleY = 1;
            }
            //  if (dbName == "jg_zhaomu" || dbName == "baowu_eff" || dbName == "cj_ysg_eff" || dbName == "gonghuifuben" || dbName == "guanghuan_eff_2" ||
            //     dbName == "mapcloud" || dbName == "tupo_eff" || dbName == "ui_lieren_jinjie" || dbName == "wishspine" || dbName == "bianshen_eff" ||
            //     dbName == "cao_guanghezuoyong_eff" || dbName == "cj_ysg_eff" || dbName == "huo_dazibaoyan_eff" || dbName == "lei_cichang-leidun_eff" ||
            //     dbName == "lei_shiwanfute_eff" || dbName == "wj_000_palisitong2_eff" || dbName == "wj_005_saci_eff" || dbName == "wj_048_heixiaojie_eff" ||
            //     dbName == "wj_050_hongka_eff" || dbName == "wj_052_leiya_eff" || dbName == "wj_053_jin_eff" || dbName == "wj_053_wanghou_eff" ||
            //     dbName == "wj_054_nanijia_eff" || dbName == "wj_054_sikai_eff" || dbName == "yihou_heidong" || dbName == "youling_qiyizhiguang_eff" ||
            //     dbName == "ys_suolian2_eff") {
            //     spx.spine.scaleX = 2;
            //     spx.spine.scaleY = 2;
            // }
            spx.setVisibleSpx(true);
            spx.spine.scaleX *= scale;
            spx.spine.scaleY *= scale;
            spx.scale = spx.spine.scaleY;
        }
        return [spx, order];
    }

    export function TsMtirand() {
        let num;
        // if(Gmgr.Instance.fightType == TableEnum.TableEnumFightType.FIGHT_TYPE_TEACH){
        //     num = Random(Gmgr.Instance.seed);//新手特殊的随机算法种子初始值13
        // }else{
        //     let Range = 4294967295;
        //     let Rand = Math.random();
        //     num = Math.round(Rand * Range); //四舍五入
        // }
        let Range = 4294967295;
        let Rand = Math.random();
        num = Math.round(Rand * Range); //四舍五入

        return num;
    }

    //seed 随机种子
    export function Random(seed: number): number {
        let k = seed;
        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        k ^= k >>> 24;
        k = (((k & 0xffff) * 0x5bd1e995) + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        let h = (97 ^ 4);
        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k;
        h ^= h >>> 13;
        h = (((h & 0xffff) * 0x5bd1e995) + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16));
        h ^= h >>> 15;
        Gmgr.Instance.seed = seed += 1;
        return (h >>> 0) & 0x7fffffff;
    }
    export function ckid(id) {
        return (id == null || id == -1)
    }
}