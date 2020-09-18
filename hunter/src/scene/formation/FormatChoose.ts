namespace zj {

    export class ChooseState {
        public generalId = 0;
        public index = -1;
    }

    /**
     * 冒险上阵界面基类
     */
    export class FormatChoose extends Dialog {

        public static ID = "FormatChoose"
        // 返回
        private btnReturn: eui.Button;
        // 上阵位置
        public up: FormateFourPos;
        // list
        public down: FormateBottomList;

        // 最大的容器box
        public groupAll: eui.Group;
        // 左边容器box
        public groupRD: eui.Group;
        // 当前上阵liet
        public groupUp: eui.Group;
        // 向上拖动选择上阵猎人
        public groupDown: eui.Group;

        // 拖动图片
        public moveImg = new eui.Image;

        private listRect = new egret.Rectangle();

        public moveGId = null;
        public moveIndex = 0;
        private scene;
        constructor(sk) {
            super();
            this.skinName = sk;
            this.scene = new GoFightMap();
            this.addChildAt(this.scene, 0);
            this.btnReturn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturn, this);//返回按钮
            Game.EventManager.on(GameEvent.FORMATE_REFRESH_LIST, this.onFormate_refresh_list, this);
            Game.EventManager.on(GameEvent.MOUSE_BEGIN, this.onMouseBegin, this);

            this.up = new FormateFourPos;
            this.down = new FormateBottomList();
            this.down.setInfo(this);
            Game.EventManager.on(GameEvent.DELAY_EXECUTE, this.ontouchBeginTime, this);

            // (function () {
            //     var count = egret.$hashCount;
            //     setInterval(() => {
            //         var newcount = egret.$hashCount;
            //         var diff = newcount - count;
            //         count = newcount;
            //         console.log("new object: ", diff);
            //     }, 1000);
            // })();
        }

        /**
         * 关闭滑动bug
         */
        public ontouchBeginTime(e) {
            if (e.data.isInLongPress == true) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            } else {
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            }
        }

        public onFormate_refresh_list(e) {
            // this.LoadListMine();
            this.moveImg.source = cachekey(e.data.id, this);
            if (e.data != null && e.data != undefined) {
                this.moveImg.visible = true;
                let objectData = e.data;
                if (objectData.x == undefined && objectData.y == undefined) {
                    this.moveImg.visible = false;
                    this.moveImg.source = "";
                } else {
                    egret.Tween.get(this.moveImg).wait(100).to({ x: objectData.x, y: objectData.y }, 300)//346  178
                        .call(() => {
                            this.moveImg.visible = false;
                            this.moveImg.source = "";
                        });
                }
            }
        }

        public onMouseBegin(e) {
            let objectData = e.data;
            if (objectData.generalId != 0) {
                this.moveImg.width = 95;
                this.moveImg.height = 93;
                this.moveImg.anchorOffsetX = this.moveImg.width / 2;
                this.moveImg.anchorOffsetY = this.moveImg.height / 2;
                if (Device.isReviewSwitch && Util.isWxMiniGame()) {
                    this.moveImg.source = cachekey("wx_" + PlayerHunterSystem.Head(objectData.generalId), this);
                } else {
                    this.moveImg.source = cachekey(PlayerHunterSystem.Head(objectData.generalId), this);
                }
                this.moveImg.visible = false;
                this.moveGId = objectData.generalId;
                this.moveIndex = objectData.index;
            }
        }

        public LoadScene(mapID) {
            this.scene.LoadMap(mapID);//这里是不同功能的地图ID
        }

        public isFullScreen(){
            return true;
        }
        /**
         * 该方法被它的子类调用
         */
        public onAddToStage() {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
            this.groupUp.addChild(this.up);
            this.down.setInfo(this);
            this.groupDown.addChild(this.down);
            this.init();
            this.addChild(this.moveImg);
        }

        public mouseMove(e: egret.TouchEvent) {
            try{
                if(this.stage){
                    this.down.scroller.scrollPolicyH = eui.ScrollPolicy.ON;
                    if (Game.TeachSystem.curPart == 3002 || Game.TeachSystem.curPart == 1003) {
                        this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    }
                    this.moveImg.visible = false;
                    // let rate = 18 / 9;
                    // if (egret.Capabilities.os == "iOS") rate = 18 / 9; // 苹果18/9，其他平台18/9
                    // if (this.stage.stageWidth / this.stage.stageHeight >= rate) {
                    //     // let width = this.stage.stageHeight * rate;
                    //     // let mask_width = (this.stage.stageWidth - width) / 2;
                    //     // // UIManager.StageWidth = width;
                    // }
                    this.moveImg.x = e.stageX - (this.stage.stageWidth - this.width) / 2;
                    this.moveImg.y = e.stageY;

                    let listWorld = this.groupDown.localToGlobal(this.down.scroller.x, this.down.scroller.y);
                    listWorld.x -= Game.UIManager.x;
                    this.listRect.setTo(listWorld.x, listWorld.y, this.down.listBottom.width, this.down.listBottom.height);

                    if (this.listRect.contains(this.moveImg.x, this.moveImg.y) == false) {
                        this.moveImg.visible = true;
                        this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
                    }
                }
            } catch(ex){}
        }


        public init() {
            this.moveImg.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
            this.LoadListMine();
        }

        public mouseUp(e: egret.TouchEvent) {
            this.down.scroller.scrollPolicyH = eui.ScrollPolicy.ON;// 总是允许滚动
            if (Game.TeachSystem.curPart == 3002 || Game.TeachSystem.curPart == 1003) {
                this.down.scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
            }
            Game.EventManager.event(GameEvent.ON_MOVE, { x: e.stageX, y: e.stageY, generalId: this.moveGId, index: this.moveIndex });// 向上拖动选择上阵猎人
            this.moveImg.visible = false;
            this.moveImg.source = "";
            this.LoadListMine();

            Game.EventManager.event(GameEvent.BATTLE_VALUE_CHANGE);// 阵容战斗力
        }

        // private up() {
        // 	this.vis = true;
        // 	this.scroller.scrollPolicyH = eui.ScrollPolicy.ON
        // 	this.moveImg.visible = false;
        // 	this.moveImg.source = "";
        // }

        public LoadListMine() {
            this.down.init();
        }

        /**
         * 注销事件
         */
        public unEvent() {
            Game.EventManager.off(GameEvent.FORMATE_REFRESH_LIST, this.onFormate_refresh_list, this);
            Game.EventManager.off(GameEvent.MOUSE_BEGIN, this.onMouseBegin, this);
            //Game.EventManager.off(GameEvent.DELAY_EXECUTE, this.ontouchBeginTime, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
        }

        /**
         * 返回按钮
         */
        public onBtnReturn() {
            egret.Tween.removeTweens(this.moveImg);
            this.up.unEvent();
            this.unEvent();
            this.scene.close();
            this.close();
            this.up.close();
            this.down.close();
        }

        /**
         * 上阵猎人列表
         */
        public getSelectGenIds() {
            return this.up.getBattleGenerals();
        }

        /**
         * 1.2.3队上阵猎人列表
         */
        public getTeamMultitudeList() {
            return this.up.getMultitudeList();
        }

        /**
         * 猎人战斗力
         */
        public LoadTotalBattleValue() {
            let allBV = 0;
            let allGens = this.up.getBattleGenerals();
            for (let i = 0; i < allGens.length; i++) {
                if (allGens[i].generalId != 0) {
                    allBV += Game.PlayerHunterSystem.queryHunter(allGens[i].generalId).battleValue;
                }
            }
            return Set.NumberUnit3(allBV);
        }
    }


}