namespace zj {
	/**
	 * 移动Npc类
	 * xingliwei
	 * 2020.1.6
	 */
    export class SceneSceneNpc extends egret.DisplayObjectContainer {
        private owner: any;
        public playerInfo: message.IIKVPairs;
        public name;
        public body: Spx;
        public auraBack: dragonBones.EgretArmatureDisplay;
        public auraFront: dragonBones.EgretArmatureDisplay;
        public actionId;
        public lastDir;
        public speed: number; // 移动速度
        public shadow;// 脚底黑圈
        private state: number;// 0-站立；1-移动
        private toPosList: egret.Point[];// 移动目标X坐标
        private toY: number;// 移动目标Y坐标
        private labelTime: eui.Label;
        private index: number = 1;
        public constructor(owner: any, info: message.IIKVPairs) {
            super();
            this.owner = owner;
            this.playerInfo = info;
            this.index = info.key;
            this.toPosList = [];
            this.width = 80;
            this.height = 110;
            this.loadSlots();
            let a = new eui.Rect(this.width, this.height);
            a.alpha = 0.001;
            this.addChild(a);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.TouchTap, this);
            let pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            pid = Math.floor(Util.randomValue(Math.max(pid - 3, 1), Math.min(pid, 14)));
            let xy = SceneManager.adventurePos = new egret.Point(this.owner.adventureList[pid].bornX, this.owner.adventureList[pid].bornY);
            this.setMove([PoolManager.getInstance().getPoint(xy.x, xy.y)]);
        }

        public TouchTap() {
            this.ReqGetMobsInfo(this.index).then(() => {
                Game.PlayerInstanceSystem.curInstanceType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                loadUI(CommonFormatePveMain)
                    .then((dialog: CommonFormatePveMain) => {
                        dialog.show(UI.SHOW_FROM_TOP);
                        dialog.setInfo(this.index);
                    });
            })

        }

        public setSceneInfo() {
            this.speed = 4;
            this.setPlayerInfo();
            this.loadBody();
        }

        public setPlayerInfo() {
            let labelTime = new eui.Label();
            labelTime.text = TableActivityRandInstance.Item(this.playerInfo.key).name;
            labelTime.width = 180;
            labelTime.size = 16;
            labelTime.stroke = 1;
            labelTime.y = 20;
            labelTime.textColor = 0xFFCF00;
            labelTime.textAlign = "center";
            labelTime.anchorOffsetX = labelTime.width / 2;
            labelTime.x = this.width / 2;
            this.addChild(labelTime);
            this.labelTime = new eui.Label();
            this.labelTime.text = "1:11:35";
            this.labelTime.width = 180;
            this.labelTime.size = 16;
            this.labelTime.textColor = 0xff0000;
            this.labelTime.stroke = 1;
            this.labelTime.textAlign = "center";
            this.labelTime.anchorOffsetX = this.labelTime.width / 2;
            this.labelTime.x = this.width / 2;
            this.addChild(this.labelTime);
        }

        public loadBody() {
            if (this.body) {
                this.body.clearSpine();
                this.body = null;
            }
            let bodyUI = this.owner.sceneUI;
            let scale = 0.4;

            let spineTable: TableClientFightAniSpineSource = TableClientFightAniSpineSource.Item(1131);
            Game.DragonBonesManager.getArmatureDisplayAsync(bodyUI, spineTable.json)
                .then((armatureDisplay: dragonBones.EgretArmatureDisplay) => {
                    let spx = new Spx();
                    spx.spineScaleX = armatureDisplay.scaleX;
                    spx.spineScaleY = armatureDisplay.scaleY;
                    armatureDisplay.scaleX *= scale * 0.8;
                    armatureDisplay.scaleY *= scale * 0.8;
                    spx.scale = armatureDisplay.scaleY;
                    spx.spine = armatureDisplay;
                    spx.name = spineTable.json;
                    setDragonBonesRemove(armatureDisplay);
                    spx.init();
                    this.body = spx;
                    spx.spine.y = this.height;
                    spx.spine.x = 40;
                    this.addChild(this.body.spine);
                    this.actionId = -1;
                    this.changeAction(TableEnum.TableEnumBaseState.State_None, TableEnum.TableEnumDir.Dir_Right);
                });

        }
        public setPos(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
        public setMove(posList: egret.Point[]) {
            this.stopMove();
            this.toPosList = posList;
            let dir = posList[0].x > this.x ? TableEnum.TableEnumDir.Dir_Right : TableEnum.TableEnumDir.Dir_Left;
            this.changeAction(TableEnum.TableEnumBaseState.State_Walk, dir);
        }

        public stopMove() {
            this.setStand();
            while (this.toPosList.length > 0) {
                PoolManager.getInstance().addPoint(this.toPosList.shift());
            }
        }

        public setStand() {
            this.changeAction(TableEnum.TableEnumBaseState.State_None, this.lastDir);
        }

        //脚底黑圈
        public loadSlots() {
            if (this.shadow == null) {
                this.shadow = new eui.Image(UIConfig.UIConfig_CommonBattle.common_shadow);
                this.addChild(this.shadow);
                this.shadow.x = -55;
                this.shadow.y = -10;
            }
        }
        public changeAction(actionId, dir) {
            if (this.actionId == actionId && this.lastDir == dir) {
                return;
            }
            this.actionId = actionId;
            this.lastDir = dir;
            if (this.body != null) {
                let bFlipX = yuan3(dir == TableEnum.TableEnumDir.Dir_Right, false, true);
                this.body.setFlipX(bFlipX);
                this.body.SetLoop(true);
                this.body.ChangeAction(actionId);
            }
        }
        //计时用
        private n: number = 0;
        private n1: number = (60 * 2 + (Math.random() * 5 * 500));
        private pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
        public Update(dt) {
            // this.n++;
            let info = Table.FindR(Game.PlayerInstanceSystem.InstanceInfo.activityRandMobs, (k, v: message.IIKVPairs) => {
                return v.key == this.playerInfo.key;
            })
            if (!info[0]) {
                this.close1();
            }

            let infotime = this.playerInfo.value - Math.floor(egret.getTimer() / 1000);
            let hour = Math.floor(infotime / 3600 % 24);
            let min = Math.floor(infotime / 60 % 60).toString();
            if (Number(min) < 10) {
                min = "0" + min;
            }
            let miao = Math.floor(infotime % 60).toString();
            if (Number(miao) < 10) {
                miao = "0" + miao;
            }
            this.labelTime.text = hour + ":" + min + ":" + miao;
            // if (this.n > this.n1) {
            //     this.n = 0;
            //     this.n1 = (60 * 2 + (Math.random() * 5 * 500));
            //     this.pid = Math.max(Game.PlayerInstanceSystem.getmaxAreaID(message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL), 1);
            //     this.pid = Math.floor(Util.randomValue(Math.max(this.pid - 3, 1), Math.min(this.pid, 14)));
            //     let xy = SceneManager.adventurePos = new egret.Point(this.owner.adventureList[this.pid].bornX, this.owner.adventureList[this.pid].bornY);
            //     this.setMove([PoolManager.getInstance().getPoint(xy.x, xy.y)]);
            //     this.onMove();
            // }
        }


        public ReqGetMobsInfo(wantedId: number) {
            return new Promise((resolve, reject) => {
                let request = new message.MobsInfoRequest();
                request.body.battleType = message.EFormationType.FORMATION_TYPE_ACTIVITY_RAND;
                request.body.mobsId = wantedId;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MobsInfoResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        //reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }

        private onMoveRun(offx: number, offy: number) {
            // if (this.owner) {
            //     this.owner.playerMove(this, offx, offy);
            // }
        }

        private onMoveFinish() {
            this.setStand();
            // if (this.owner) {
            //     this.owner.playerMoveFinish(this);
            // }
        }

        public close1() {

            let info = Table.FindR(this.owner.Npcs, (k, v: this) => {
                return v.playerInfo.key == this.playerInfo.key;
            })
            this.owner.Npcs.splice(info[1], 1);
            this.owner.removeUnit(this);
            dragonBonesPool.getInstance().dbArr.push(this.body);
        }

        private onMove() {
            let pos = this.toPosList[0];
            if (this.move(pos.x, pos.y)) {
                PoolManager.getInstance().addPoint(this.toPosList.shift());
                if (this.toPosList.length == 0) {
                    this.onMoveFinish();
                } else if (this.toPosList[0].x != this.x) {
                    let dir = this.toPosList[0].x > this.x ? TableEnum.TableEnumDir.Dir_Right : TableEnum.TableEnumDir.Dir_Left;
                    this.changeAction(TableEnum.TableEnumBaseState.State_Walk, dir);
                }
            }
        }
        private move(tox: number, toy: number): boolean {
            let [isFinish, offx, offy] = Util.moveObj(this, this.speed, tox, toy);
            if (!this.checkBlock(this.x + offx, this.y + offy)) {
                this.x += offx;
                this.y += offy;
                this.onMoveRun(offx, offy);
            }
            return isFinish;
        }

        private checkBlock(nx: number, ny: number): boolean {
            return false;
        }
    }
}