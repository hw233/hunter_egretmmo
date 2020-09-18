namespace zj {
    // created by hhh in 2018/12/4
    export enum ListType {
        List_Instance = 0,
        List_Instance2 = 41,
        List_Elite = 29
    }

    export class Common_OutPutDialog extends Dialog {
        public static ID = "Common_OutPutDialog";

        private btnClose: eui.Button;

        private imageFrame: eui.Image;
        private imageIcon: eui.Image;

        private labelName: eui.Label;
        private labelNum: eui.Label;

        private listPath: eui.List;
        private groupAnimate: eui.Group;

        private itemId: number = null;
        private father: any;
        private cb;
        private area: Array<TableInstanceArea>;
        private listData: eui.ArrayCollection = new eui.ArrayCollection();

        private imgMask: eui.Image;
        private rectMask: eui.Rect;
        private rectMaskCommon: eui.Rect;

        private needNum: number;

        public constructor() {
            super();

            this.skinName = "resource/skins/common/Common_OutPutDialogSkin.exml";

            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
            this.listPath.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onlistPathTap, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                this.father = null;
                egret.Tween.removeTweens(this);
            }, this);

            // 碎片遮罩
            this.imgMask = new eui.Image;
            this.imgMask.source = cachekey(UIConfig.UIConfig_Role.mask.soul, this);
            this.imgMask.horizontalCenter = 0;
            this.imgMask.verticalCenter = 0;
            this.groupAnimate.addChild(this.imgMask);
            this.imgMask.visible = false;

            // 徽章遮罩
            this.rectMask = new eui.Rect(73, 70, 0x000000);
            this.rectMask.horizontalCenter = 0;
            this.rectMask.verticalCenter = 0;
            this.groupAnimate.addChild(this.rectMask);
            this.rectMask.visible = false;

            //普通物品遮罩
            this.rectMaskCommon = new eui.Rect(83, 84, 0x000000);
            this.rectMaskCommon.horizontalCenter = 0;
            this.rectMaskCommon.verticalCenter = -2;
            this.groupAnimate.addChild(this.rectMaskCommon);
            this.rectMaskCommon.visible = false;
        }

        /**
         * 设置基本信息
         * 
         * @param itemId 物品ID
         * @param father 父类
         * @param call 回调函数
         */
        public setInfo(itemId: number, father: any, call?, area?: Array<TableInstanceArea>) {
            this.itemId = itemId;
            this.father = father;
            this.cb = call;
            this.area = area;

            let info = <TableItemProp>PlayerItemSystem.ItemConfig(itemId);
            let frame = PlayerItemSystem.Set(itemId);

            this.imageFrame.source = cachekey(frame.Frame, this);
            this.imageIcon.source = cachekey(info.path, this);
            egret.Tween.get(this).wait(10).call(() => {
                if (this.imageIcon.width > 100 || this.imageIcon.height > 100) {
                    this.imageIcon.scaleX = 0.8;
                    this.imageIcon.scaleY = 0.8;
                }
            });
            if (this.isImgMask(itemId)) {
                this.imgMask.visible = true;
                this.imageIcon.mask = this.imgMask;
            } else if (this.isRectMask(itemId)) {
                this.rectMask.visible = true;
                this.imageIcon.mask = this.rectMask;
            } else {
                this.imgMask.visible = false;
                this.rectMask.visible = false;
                this.rectMaskCommon.visible = true;
                this.imageIcon.mask = this.rectMaskCommon;
            }
            if (itemId == 20006) {
                this.labelNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_HeroMain.has, Game.PlayerInfoSystem.BaseInfo.psychicFruit);
            } else {
                this.labelNum.text = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_HeroMain.has, PlayerItemSystem.Count(itemId));
            }
            this.labelName.text = info.name;

            // this.loadGetList(info.from);
            this.freshInfo();

        }

        public OnAbovePop() {
            let str_has = Helper.StringFormat(TextsConfig.TextsConfig_HeroMain.has, PlayerItemSystem.Count(this.itemId));
            this.labelNum.text = str_has;
            if (this.needNum != null) {
                if (PlayerItemSystem.Count(this.itemId) >= this.needNum) {
                    this.onBtnClose();
                }
            }
        }

        public setNeedNum(needNum) {
            this.needNum = needNum;
        }

        private freshInfo() {
            let itemSet = PlayerItemSystem.Set(this.itemId) as any;
            let str_has = "";
            if (this.itemId == 20006) {
                str_has = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_HeroMain.has, Game.PlayerInfoSystem.BaseInfo.psychicFruit);
            } else {
                str_has = HelpUtil.textConfigFormat(TextsConfig.TextsConfig_HeroMain.has, PlayerItemSystem.Count(this.itemId));
            }
            this.imageFrame.source = cachekey(itemSet.Frame, this);
            this.imageIcon.source = cachekey(itemSet.Path, this);
            this.labelName.text = itemSet.Info.name;
            this.labelNum.text = str_has;
            this.labelNum.visible = (PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_GENERAL);



            let list = [[], [], []];
            let arr = itemSet.Info.from;
            if (itemSet.Info.from instanceof Array) {

            } else {
                arr = itemSet.Info.from.split("|");
                for (let i = 0; i < arr.length; i++) {
                    arr[i] = Number(arr[i]);
                }
            }

            for (let i = 0; i < arr.length; i++) {
                let id: number = arr[i];
                if (id == ListType.List_Instance) {
                    let drops = Game.PlayerInstanceSystem.GetProp(this.itemId);
                    for (let j = 0; j < drops.length; j++) {
                        let v = drops[j];
                        if (this.isInstanceOpen(Number(v))) {
                            let find: boolean = false;
                            for (let k = 0; k < list[1].length; k++) {
                                let _v = list[1][k];
                                if (_v[1] == v) {
                                    find = true;
                                } else {
                                    find = false;
                                }
                            }
                            if (!find && Number(v) < 200000) {
                                list[1].push(0);
                                list[1].push(v);
                            }
                        }

                    }
                }
                else if (id == ListType.List_Instance2) {
                    let drops = Game.PlayerInstanceSystem.GetProp(this.itemId);
                    for (let j = 0; j < drops.length; j++) {
                        let v = drops[j];
                        if (this.isInstanceOpen(Number(v))) {
                            let find: boolean = false;
                            for (let k = 0; k < list[1].length; k++) {
                                let _v = list[1][k];
                                if (_v[1] == v) {
                                    find = true
                                } else {
                                    find = false;
                                }
                            }

                            if (!find) {
                                list[1].push(ListType.List_Instance2);
                                list[1].push(v);
                            }
                        }
                    }
                }
                else if (id == ListType.List_Elite) {
                    if (this.area != null) {
                        for (let [k, v] of HelpUtil.GetKV(this.area)) {
                            list[1].push(ListType.List_Elite);
                            list[1].push(v);
                        }
                    }
                }
                else {
                    if (isNaN(Number(id))) {
                        continue;
                    }
                    if (Table.VIn(TableEnum.Enum.HIDE_REVIEW, id) == false) {
                        /*if (PlayerMissionSystem.beHide(id)) {
    
                        }
                        else*/
                        if (Game.PlayerMissionSystem.Open(id)) {
                            list[0].push(id);
                        } else {
                            if (id == 7 && Game.PlayerInfoSystem.LeagueId != 0) {
                                list[2].push(id);
                            } else if (id != 7) {
                                list[2].push(id);
                            }
                        }
                    } else {
                        if (id == 7 && Game.PlayerInfoSystem.LeagueId != 0) {
                            list[2].push(id);
                        } else if (id != 7) {
                            list[2].push(id);
                        }
                    }
                }
            }




            let item = [];
            if (list[1].length != 0) item = [[], [], []];
            for (let i = 0; i < list.length; i++) {
                if (list[1].length != 0) {
                    for (let j = 0; j < list[i].length; j++) {
                        item[i].push(list[i][j]);
                    }
                } else {
                    for (let j = 0; j < list[i].length; j++) {
                        item.push(list[i][j]);
                    }
                }
            }

            this.listData.removeAll();
            for (let i = 0; i < item.length; i++) {
                if (item[i] != null && item[i].length != 0 && item[i] != undefined) {
                    let itemData = new Common_OutPutItemData();
                    if (item[i][0] == null || item[i][0] == undefined) {
                        itemData.fromId = item[i];
                        itemData.mobId = null;
                    }
                    else {
                        itemData.fromId = item[i][0];
                        itemData.mobId = item[i][1];
                    }


                    this.listData.addItem(itemData);
                }

            }
            this.listPath.dataProvider = this.listData;
            this.listPath.itemRenderer = Common_OutPutItem;
        }

        private isInstanceOpen(instanceId: number) {
            let [chapter, idx] = Game.PlayerInstanceSystem.getChapterByInstanceId(instanceId);
            if (chapter) {
                return chapter.chapter_id <= SceneManager.adventureOpenMax;
            }
            return false;
        }

        private onBtnClose() {
            if (this.cb != null) {
                // this.cb();
            }

            this.close(UI.HIDE_TO_TOP);
        }

        private onlistPathTap(e: eui.ItemTapEvent) {
            // let data = this.listData.getItemAt(e.itemIndex) as TableClientGetProp;
            let item = this.listPath.getElementAt(e.itemIndex) as Common_OutPutItem;
            let data = this.listData.getItemAt(e.itemIndex) as Common_OutPutItemData;
            if (data == null || data == undefined) return;
            if (item.imgGo.visible == false) {
                return;
            }
            if (item.lock == true) {
                toast_warning("暂未解锁");
                return;
            }
            if (data.fromId == 0 && (data.mobId != null || data.mobId != undefined)) {
                // if (Game.PlayerInstanceSystem.Chapter(data.mobId).chapter_id >= 17 ||
                //     PlayerItemSystem.ItemType(this.itemId) != message.EGoodsType.GOODS_TYPE_PARTNER) {
                //     this.onBtnClose();
                //     let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.StartFast(data.mobId, this.itemId, this.needNum, this) }, this, 1000);
                // }
                // else {
                    this.onBtnClose();
                    let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.StartFast(data.mobId, this.itemId, this.needNum, this, this.cb) }, this, 1000);
                // }
            }
            else if (data.fromId == 41 && (data.mobId != null || data.mobId != undefined)) {
                // 高级副本
                this.onBtnClose();
                let timer = egret.setTimeout(() => { Game.PlayerInstanceSystem.Start2(data.mobId, this.itemId, this.needNum, this) }, this, 1000);
                // Game.PlayerInstanceSystem.Start2(data.mobId, this.itemId, this.needNum, this, () => {
                //     this.freshInfo();
                // });
            }
            else if (data.fromId == ListType.List_Elite && data.mobId != null) {
                // loadUI(Adventurems)
                //     .then((dialog: Adventurems) => {
                //         dialog.LoadFromCardOutPut(data.mobId);
                //         dialog.show(UI.SHOW_FROM_TOP);
                //     });
                SceneManager.instance.EnterAdventure(-2, data.mobId);
            }
            else {
                if (this.cb) {
                    this.cb();
                }
                this.onBtnClose();
                let timer = egret.setTimeout(() => { Game.PlayerMissionSystem.jump(data.fromId) }, this, 1000);
            }

        }

        // 物品遮罩
        private isImgMask(goodsId: number): boolean {
            if (PlayerItemSystem.ItemType(goodsId) == 4
                //||(PlayerItemSystem.ItemType(goodsId)==3 && mn % 32000 > 500 &&  mn % 32000 < 1000)
                || TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }

            return false;
        }

        // 徽章遮罩
        private isRectMask(goodsId: number): boolean {
            if (TableClientTypePackage.Item(4)["itemId"].indexOf(goodsId) != -1 || PlayerItemSystem.ItemType(goodsId) == 6) {
                return true;
            }

            return false;
        }
    }

}