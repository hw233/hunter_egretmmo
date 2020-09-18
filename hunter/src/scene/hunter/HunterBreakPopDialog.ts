namespace zj {
    /**
     * @author chen xi
     * 
     * @date 2018-12-7
     * 
     * @class 添加技能dialog
     * 
     * @description 猎人突破->碎片， 猎人突破->技能->升级， 均需要显示对话框
     */

    export const enum HunterBreakPopDialogType {
        /** 猎人突破 */
        HunterBreak = 0,
        /** 技能升级 */
        SkillUpLevel = 1,
        /** 猎人合成 */
        HunterCompound = 2
    }

    export class HunterBreakPopDialog extends Dialog {
        private imgTitle: eui.Image;
        private btnClose: eui.Button;
        private btnConfirm: eui.Button;
        private listHunter: eui.List;
        private listData: eui.ArrayCollection = new eui.ArrayCollection();
        private imgNone: eui.Image;

        private cb: Function = null;
        private thisObj: any = null;
        public type: HunterBreakPopDialogType = null;
        /**0:任意1：同名 */
        public type1: number = 0;
        public index: number;
        public selectInfos = [];

        //虚假值用于判断进入页面和离开页面时页面上是否有修改
        private pushGeberalId: number = null;
        private generalId: number = 0;

        private lieInfo = [];//暂存道具使用量用于点击关闭按钮时将数据还原
        private lieText = [];//判断是否是防守阵营中的将自身移除掉，加载时保证自身不被移除。

        constructor() {
            super();
            this.skinName = "resource/skins/hunter/HunterBreakPopDialogSkin.exml";
            this.init();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                egret.Tween.removeTweens(this);
            }, this)
        }

        private init() {
            let tap = egret.TouchEvent.TOUCH_TAP;
            this.btnClose.addEventListener(tap, this.onBtnClose, this);
            this.btnConfirm.addEventListener(tap, this.onBtnConfirm, this);
        }

        /**
         * 设置猎人突破信息
         * 
         * @param generalId 武将ID
         * @param skillLevel X 阶技能 0 - 3
         * @param callback 回调函数
         * @param break1 所需突破数
         * @param type 0:任意猎人 1：同名猎人
         * @param thisObj 回调函数this对象
         */
        public setHunterBreak(generalId: number, skillLevel: number, star: number, break1: number, callback: Function, type: number, thisObj: any) {
            this.cb = callback;
            this.thisObj = thisObj;
            this.type = HunterBreakPopDialogType.HunterBreak;
            this.type1 = type;
            let hunterInfos: Array<message.GeneralInfo> = PlayerHunterSystem.GetCanBreakHunter(star, generalId, break1);
            this.setInfo(generalId, hunterInfos, skillLevel);
        }

        /**
         * 设置猎人技能升级信息
         * 
         * @param generalId 武将ID
         * @param skillLevel 技能等级 1- 3
         * @param id 表`table_break_skill_uplevel.json`内索引ID， 范围(100011 - 100743), 组成形式武将id*10 + 技能等级(1-3)
         * @param callback 回调函数
         * @param thisObj 回调函数this对象
         */
        public setHunberBreakSkillUpInfo(generalId: number, skillLevel: number, id: number, callback: Function, thisObj: any) {
            this.cb = callback;
            this.thisObj = thisObj;
            this.type = HunterBreakPopDialogType.SkillUpLevel;

            let hunterInfos: Array<message.GeneralInfo> = PlayerHunterSystem.GetBreakUpSkillHunter(id, skillLevel, generalId);
            this.setInfo(generalId, hunterInfos, skillLevel, id);
        }

        /**
         * 
         * @param id 
         * @param level 
         * @param star 
         * @param awaken 
         * @param aptitude 
         * @param callback 
         * @param thisObj 
         */
        public setHunterCompoundInfo(data: HunterCompoundItemRightData, callback: Function, thisObj: HunterCompoundItemRight) {
            this.cb = callback;
            this.thisObj = thisObj as HunterCompoundItemRight;
            this.type = HunterBreakPopDialogType.HunterCompound;
            this.index = data.index;
            this.selectInfos[0] = data.id;
            this.selectInfos[1] = data.level;
            this.selectInfos[2] = data.star;
            this.selectInfos[3] = data.awaken;
            this.selectInfos[4] = data.aptitude;

            //在剔除列表中将自身选中项去掉
            this.lieText = Table.DeepCopy(this.thisObj.data.father.composeTable);
            this.lieText[data.index] = null;

            //应该显示的列表信息
            let hunterInfos: Array<message.GeneralInfo> = PlayerHunterSystem.GetComposeHunter(this.lieText, this.selectInfos, false);
            this.lieInfo = Table.DeepCopy(this.thisObj.data.father.composeTable);
            this.setInfo(data.id, hunterInfos);
        }

        /**
         * 设置信息
         * 
         * @param generalId 武将id
         * @param hunterInfos 猎人信息
         * @param level 突破等级、技能等级
         */
        private setInfo(generalId: number, hunterInfos: Array<message.GeneralInfo>, level?: number, id?: number) {
            if (this.type == HunterBreakPopDialogType.HunterBreak) {
                this.imgTitle.source = cachekey("ui_hunter_break_WordsChoseHunter_png", this);
            } else if (this.type == HunterBreakPopDialogType.SkillUpLevel) {
                this.imgTitle.source = cachekey("ui_hunter_break_WordsUpChoseHunter_png", this);
            } else if (this.type == HunterBreakPopDialogType.HunterCompound) {
                this.imgTitle.source = cachekey("ui_hunter_BoardCompoundItemTip_png", this);
            }

            this.listData.removeAll();
            if (this.type == HunterBreakPopDialogType.HunterCompound) {
                //用于判断进入页面后是否有操作
                if (this.thisObj.data.father.composeTable.length == 0) {
                    this.pushGeberalId = 0;
                    this.generalId = 0;
                } else {
                    this.pushGeberalId = this.thisObj.data.father.composeTable[this.index];
                    this.generalId = this.thisObj.data.father.composeTable[this.index];
                }
            }

            for (let i = 0; i < hunterInfos.length; i++) {
                let v = hunterInfos[i];
                let itemData = new HunterBreakPopDialogItemData();
                itemData.generalId = v.general_id;
                itemData.index = i + 1;
                if (this.type == HunterBreakPopDialogType.HunterBreak) {
                    itemData.breakLevel = level;
                } else if (this.type == HunterBreakPopDialogType.SkillUpLevel) {
                    itemData.skillLevel = level;
                    itemData.id = id;
                } else if (this.type == HunterBreakPopDialogType.HunterCompound) {
                    itemData.skillLevel = level;
                    itemData.father = this;
                }
                let haveBreak
                if (this.type1 == 1) {
                    // 判断是是否已经选中
                    haveBreak = Table.FindF(PlayerHunterSystem.breakSelectedGenerals1, (_, v) => {
                        return v === itemData.generalId;
                    });
                } else {
                    // 判断是是否已经选中
                    haveBreak = Table.FindF(PlayerHunterSystem.breakSelectedGenerals, (_, v) => {
                        return v === itemData.generalId;
                    });
                }

                if (this.type == HunterBreakPopDialogType.HunterCompound) {
                    haveBreak = Table.FindF(this.thisObj.data.father.composeTable, (_, v) => {
                        return v == itemData.generalId;
                    });
                }
                itemData.isSelected = haveBreak;
                itemData.type = this.type;
                itemData.father = this;
                this.listData.addItem(itemData);
            }

            // 第一个数据特殊处理
            let itemData = new HunterBreakPopDialogItemData();
            itemData.generalId = generalId;
            itemData.index = 0;
            if (this.type == HunterBreakPopDialogType.HunterBreak) {
                itemData.breakLevel = level;
            } else if (this.type == HunterBreakPopDialogType.SkillUpLevel) {
                itemData.skillLevel = level;
                itemData.id = id;
            } else if (this.type == HunterBreakPopDialogType.HunterCompound) {
                itemData.father = this;
            }
            itemData.father = this;
            itemData.type = this.type;
            this.listData.addItemAt(itemData, 0);

            this.listHunter.dataProvider = this.listData;
            this.listHunter.itemRenderer = HunterBreakPopDialogItem;
            this.listHunter.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onListTap, this);

            this.imgNone.visible = (this.listData.length < 2);
        }

        private onListTap(e: eui.ItemTapEvent) {
            let data = this.listData.getItemAt(e.itemIndex) as HunterBreakPopDialogItemData;
            // 第一项不相应点击
            if (data == null || data.index == 0 || data.generalId == null || data.generalId == 0) {
                return;
            }
            let item = this.listHunter.getElementAt(e.itemIndex) as HunterBreakPopDialogItem;
            if (item == null) return;

            // 判断是否是防守阵营
            if (item.defenceType != 0) {
                toast(TextsConfig.TextsConfig_Hunter_Break.break_defence_general[item.defenceType]);
                return;
            }

            // 判断是否已经选中
            let isSelected
            if (this.type1 == 1) {
                isSelected = Table.FindF(PlayerHunterSystem.breakSelectedGenerals1, (_, v) => {
                    return v == data.generalId;
                });
            } else {
                isSelected = Table.FindF(PlayerHunterSystem.breakSelectedGenerals, (_, v) => {
                    return v == data.generalId;
                });
            }
            if (data.type == HunterBreakPopDialogType.HunterCompound) {
                isSelected = Table.FindF(this.thisObj.data.father.composeTable, (_, v) => {
                    return v == data.generalId;
                });
            }

            if (data.type == HunterBreakPopDialogType.HunterBreak) {
                this.onBreakTap(e.itemIndex, isSelected);
            } else if (data.type == HunterBreakPopDialogType.SkillUpLevel) {
                this.onSkillUpTap(e.itemIndex, isSelected);
            } else if (data.type == HunterBreakPopDialogType.HunterCompound) {
                this.onCompoundTap(e.itemIndex, isSelected);
            }
        }

        // 猎人突破点击
        private onBreakTap(index: number, isSelected: boolean) {
            let data = this.listData.getItemAt(index) as HunterBreakPopDialogItemData;

            let breakInfo = PlayerHunterSystem.HunterBreak(data.breakLevel);
            if (breakInfo == null) return;
            let a = () => {
                let aa = [];
                for (let i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 0) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            let b = () => {
                let aa = [];
                for (let i = 0; i < breakInfo.exchange_generals.length; i++) {
                    if (breakInfo.exchange_generals[i] == 1) {
                        aa.push(breakInfo.exchange_generals[i]);
                    }
                }
                return aa;
            };
            if (this.type1 == 1) {
                if (PlayerHunterSystem.breakSelectedGenerals1.length >= b().length && isSelected == false && b().length != 0) {
                    toast(TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                    return;
                }
            } else {
                if (PlayerHunterSystem.breakSelectedGenerals.length >= a().length && isSelected == false && a().length != 0) {
                    toast(TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                    return;
                }
            }
            data.isSelected = !data.isSelected;
            if (data.isSelected) {
                if (this.type1 == 1) {
                    PlayerHunterSystem.breakSelectedGenerals1.push(data.generalId);
                } else {
                    PlayerHunterSystem.breakSelectedGenerals.push(data.generalId);
                }
            } else {
                if (this.type1 == 1) {
                    let index = PlayerHunterSystem.breakSelectedGenerals1.indexOf(data.generalId);
                    PlayerHunterSystem.breakSelectedGenerals1.splice(index, 1);
                } else {
                    let index = PlayerHunterSystem.breakSelectedGenerals.indexOf(data.generalId);
                    PlayerHunterSystem.breakSelectedGenerals.splice(index, 1);
                }

            }

            this.listData.replaceItemAt(data, index);
        }

        // 技能升级点击
        private onSkillUpTap(index: number, isSelected: boolean) {
            let data = this.listData.getItemAt(index) as HunterBreakPopDialogItemData;

            let upLevelInfo = TableBreakSkillUplevel.Item(data.id);
            if (upLevelInfo == null) return;

            if (PlayerHunterSystem.breakSelectedGenerals.length >= upLevelInfo.exchange_ids[data.skillLevel - 1].length && isSelected == false) {
                toast(TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                return;
            }

            data.isSelected = !data.isSelected;
            if (data.isSelected) {
                PlayerHunterSystem.breakSelectedGenerals.push(data.generalId);
            } else {
                let index = PlayerHunterSystem.breakSelectedGenerals.indexOf(data.generalId);
                PlayerHunterSystem.breakSelectedGenerals.splice(index, 1);
            }

            this.listData.replaceItemAt(data, index);
            // this.thisObj.data.father.listMaterialData.refresh();
        }

        // 合成点击
        private onCompoundTap(index: number, isSelected: boolean) {

            //将非点击到自身的列表项对勾去掉
            for (let i = 0; i < this.listData.length; i++) {
                if (this.listData.getItemAt(i) != this.listData.getItemAt(index) as HunterBreakPopDialogItemData) {
                    this.listData.getItemAt(i).isSelected = false;
                    this.listData.replaceItemAt(this.listData.getItemAt(i), i);
                }
            }

            let data = this.listData.getItemAt(index) as HunterBreakPopDialogItemData;
            let upLevelInfo = TableGeneralMake.Item(data.index);
            if (upLevelInfo == null) return;

            if (this.thisObj.data.father.composeTable.length >= upLevelInfo.exchange_ids[data.skillLevel - 1] && isSelected == false) {
                toast(TextsConfig.TextsConfig_Hunter_Break.selectBreak);
                return;
            }
            data.isSelected = !data.isSelected;//将是否选中置为非
            if (data.isSelected) {
                this.thisObj.data.father.composeTable[this.thisObj.data.index] = (data.generalId);
            } else {
                let index = this.thisObj.data.father.composeTable.indexOf(data.generalId);
                this.thisObj.data.father.composeTable[this.thisObj.data.index] = null;
            }
            this.generalId = this.thisObj.data.father.composeTable;
            this.listData.replaceItemAt(data, index);
        }

        private onBtnClose() {
            if (this.type == HunterBreakPopDialogType.HunterCompound) {//判断是否是猎人合成
                if (this.pushGeberalId != this.generalId) {//判断进入页面于离开页面时是否有改变
                    let msg = TextsConfig.TextsConfig_Hunter_Compound.closeNotSave;
                    TipManager.ShowConfirmCancel(msg, () => {
                        this.thisObj.data.father.composeTable = this.lieInfo;
                        if (this.cb) {
                            this.cb.call(this.thisObj, true);
                        }
                        this.delay();
                    });
                } else {
                    this.thisObj.data.father.composeTable = this.lieInfo;
                    if (this.cb) {
                        this.cb.call(this.thisObj, true);
                    }
                    this.close(UI.HIDE_TO_TOP);
                }
                return;
            }
            if (this.cb) {
                this.cb.call(this.thisObj, true);
            }
            this.close(UI.HIDE_TO_TOP);
        }

        /**延迟调用关闭窗口的方法 */
        private delay() {
            egret.Tween.get(this).wait(1000).call(() => { this.close(UI.HIDE_TO_TOP) });
        }

        /** 使用按钮 */
        private onBtnConfirm() {
            if (this.cb) {
                this.cb();
                // this.cb.call(this.thisObj, false);
            }
            this.close(UI.HIDE_TO_TOP);
        }
    }

}