namespace zj {
    // lizhengqiang
    // 20190112
    export class Common_ChangeIconItemIR extends eui.ItemRenderer {

        private imgFrame: eui.Image;
        private imgIcon: eui.Image;
        private imgBG: eui.Image;
        private imgUse: eui.Image;

        private b_lightNormal;
        private b_lightHigh;
        private idRet;
        private vis: boolean = false;
        private mapID: number = 0;

        public constructor() {
            super();
            this.skinName = "resource/skins/common/Common_ChangeIconItemIRSKin.exml";
            cachekeys(<string[]>UIResource["Common_ChangeIconItemIR"], null);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnThis, this);
            Game.EventManager.on(GameEvent.COMMON_CHANGE_ICON_SHUAXIN, this.update, this);
            this.imgUse.visible = false;
        }

        protected dataChanged() {
            let iconType: number = this.data.iconType;
            let picId: number = this.data.picId;
            let index: number = this.data.index;
            this.mapID = (this.data.father as Common_ChangeIconContentIR).listID * _count_per_row + this.data.i;
            if (iconType != 3) {
                this.imgIcon.source = cachekey(TableItemPic.Item(picId).path, this);
                this.imgBG.visible = true;
            } else {
                this.imgIcon.visible = false;
                this.imgBG.visible = false;
                this.imgFrame.source = cachekey(TableItemPicFrame.Item(picId).path, this);
            }

            if (iconType == TableEnum.TableIconListState.GENERAL) {
                let mapID = this.data.father.listID * 4 + this.data.i;
                let totalListID = this.data.father.data.father.mapIndex;
                this.idRet = this.data.father.data.father.idMap[this.data.father.listType + 1][mapID];
                if (totalListID == 0) {
                    this.data.father.data.father.idRet = this.idRet;
                }
                this.data.father.data.father.idRet = this.idRet;
                let normalPic = PlayerItemSystem.GetNormalPic(1)
                this.b_lightNormal = Table.FindF(normalPic, (key, value) => {
                    return Number(this.idRet) == value
                })
                this.b_lightHigh = Table.FindF(Game.PlayerWonderLandSystem.otherAttri.picIds, (key, value) => {
                    return Number(this.idRet) == value
                })

                if (!(this.b_lightHigh || this.b_lightNormal)) {
                    Helper.SetImageFilterColor(this.imgIcon, 'gray');
                } else {
                    Helper.SetImageFilterColor(this.imgIcon, 'null');
                }
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.roleFrame[0], this);
                this.imgUse.visible = this.idRet == Game.PlayerInfoSystem.BaseInfo.picId;
            } else if (iconType == TableEnum.TableIconListState.LEAGUE) {
                // let normalPic = PlayerItemSystem.GetNormalPic(3)
                // this.b_lightNormal = Table.FindF(normalPic, (key, value) => {
                //     return this.idRet == value
                // })
                // this.b_lightHigh = Table.FindF(TableItemPic.Table(), (key, value) => {
                //     return this.idRet == value
                // })
                // if (!(this.b_lightHigh || this.b_lightNormal)) {
                //     Helper.SetImageFilterColor(this.imgIcon, 'gray')
                // }
                this.imgFrame.source = cachekey(UIConfig.UIConfig_Common.roleFrame[1], this);
            } else if (iconType == 3) {
                this.idRet = this.data.father.data.father.frameIdMap[this.data.father.listType][this.mapID];
                Helper.SetImageFilterColor(this.imgFrame, 'null');
                let tbl = Game.ConfigManager.getTable(StringConfig_Table.itemFrame + ".json");
                if (this.GetInPart(tbl[this.idRet].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length == 0) {
                    Helper.SetImageFilterColor(this.imgFrame, 'gray');
                } else if (this.GetInPart(tbl[this.idRet].order) == ActivityFrameType && Game.PlayerWonderLandSystem.otherAttri.picFrameIds.length != 0) {
                    let hasFrameIdList = [];
                    for (let k in Game.PlayerWonderLandSystem.otherAttri.picFrameIds) {
                        let v = Game.PlayerWonderLandSystem.otherAttri.picFrameIds[k];
                        if (v.value > Date.parse(Game.Controller.serverNow().toString()) / 1000 + 1) {
                            hasFrameIdList.push(v.key);
                        }
                    } if (!Table.VIn(hasFrameIdList, this.idRet)) {
                        Helper.SetImageFilterColor(this.imgFrame, 'gray');
                    }
                }
                this.imgUse.visible = this.idRet == Game.PlayerInfoSystem.BaseInfo.picFrameId;
            }

            if (!this.getChildByName("ani") && index == Common_ChangeIconDialog.index && this.vis == false) {//this.selected &&
                this.playAnimation();
                Game.EventManager.event("COMMON_CHANGE_ICON_SETPICID", picId);
            } else {
                let last = this.getChildByName("ani");
                if (last) {
                    this.vis = false;
                    this.removeChild(last);
                }
            }
        }
        private update() {
            this.dataChanged();
        }

        private playAnimation() {
            this.vis = true;
            Game.DragonBonesManager.playAnimation(this, "ui_tongyong_xuanzhong02", "armatureName", null, 0)
                .then(display => {
                    display.x = this.imgFrame.x + this.imgFrame.width / 2;
                    display.y = this.imgFrame.y + this.imgFrame.height / 2;
                    display.scaleX = 1.2;
                    display.scaleY = 1.2;
                    display.name = "ani";
                    this.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        private onBtnThis() {
            if (this.data.iconType == TableEnum.TableIconListState.GENERAL) {
                if (!(this.b_lightHigh || this.b_lightNormal)) {
                    toast_warning(TextsConfig.TextsConfig_User.name_none_get)
                    return;
                }
            }
            if (Common_ChangeIconDialog.index != this.data.index) {
                Common_ChangeIconDialog.index = this.data.index;
            } else {
                return;
            }
            this.data.father.data.father.FreshFocus(this.data.index, this.idRet, true);
        }
        private GetInPart(num) {
            return num / NumLevel - num / NumLevel % 1;
        }
    }
}