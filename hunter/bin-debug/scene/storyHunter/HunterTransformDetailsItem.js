var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    //  wangshenzhuo
    //  2019-7-16
    //  HXH_HunterTransformDetailsItem
    var HunterTransformDetailsItem = (function (_super) {
        __extends(HunterTransformDetailsItem, _super);
        function HunterTransformDetailsItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "resource/skins/storyHunter/HunterTransformDetailsItemSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.groupStoryBook.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonStoryBook, _this);
            _this.groupTransformCard.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonTransformCard, _this);
            _this.groupHunterMeterials.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonHunterMeterials, _this);
            _this.buttonTransform.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonTransform, _this);
            return _this;
        }
        HunterTransformDetailsItem.prototype.SetInfo = function (info) {
            if (info) {
                this.info = info;
                var baseInfo = zj.Game.PlayerHunterSystem.Table(info.general_id);
                var picTbl = zj.TableBaseGeneral.Table();
                var picRoleInfo = zj.PlayerHunterSystem.MapInstance(info.transfer_role);
                if (baseInfo.aptitude) {
                    this.imageGrade.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_grade[baseInfo.aptitude], this);
                    this.imageType1.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type1[baseInfo.type], this);
                    this.imageType.source = zj.cachekey(zj.UIConfig.UIConfig_General.hunter_type2[baseInfo.features], this);
                }
                if (info.transfer_des && info.transfer_des != 0) {
                    this.labelDes.text = info.transfer_des;
                }
                zj.Helper.SetStar(this.groupStart, this.info.general_star, zj.UIConfig.UIConfig_Role.heroAwakenStar[1], 0.65, 10);
                // Helper.NodeStarByAlignLeft(this.groupStart, this.info.general_star, CommonConfig.general_max_star, 0.65, false, UIConfig.UIConfig_Role.heroAwakenStar[1]);
                this.labelLevel.text = info.general_level;
                var path_aptitude = zj.UIConfig.UIConfig_General.hunter_grade[zj.Game.PlayerHunterSystem.Table(info.general_id).aptitude];
                this.imageTransLv.source = zj.cachekey(path_aptitude, this);
                this.imageHunterBottom.source = zj.cachekey(info.transfer_board, this);
                this.imageFrameHunter.source = zj.cachekey(info.transfer_floor, this);
                this.imageHunterName.source = zj.cachekey(info.name_pic, this);
                this.imageHunterTransformName.source = zj.cachekey(info.name_pic, this);
                this.imageHunterIcon.source = zj.cachekey(picRoleInfo.half_path, this);
            }
            this.createAttItems();
            this.createSkills();
            this.setConsume();
        };
        HunterTransformDetailsItem.prototype.createAttItems = function () {
            this.listAttri1.itemRenderer = zj.HunterTransformDetailsItemItem;
            var listItem = new eui.ArrayCollection();
            for (var i = 0; i < 4; i++) {
                var data = new zj.HunterTransformDetailsItemItemData();
                if (i == 0) {
                    data.index = i;
                    data.info = this.info.general_hp[0];
                }
                else if (i == 1) {
                    data.index = i;
                    data.info = this.info.general_atk[0];
                }
                else if (i == 2) {
                    data.index = i;
                    data.info = this.info.skill_atk[0];
                }
                else {
                    data.index = i;
                    data.info = this.info.skill_def[0];
                }
                data.father = this;
                listItem.addItem(data);
            }
            this.listAttri1.dataProvider = listItem;
        };
        HunterTransformDetailsItem.prototype.createSkills = function () {
            if (this.info) {
                this.listAttri2.itemRenderer = zj.HunterTransformDetailsItemItemRight;
                var listItem = new eui.ArrayCollection();
                listItem.addItem(this.info);
                this.listAttri2.dataProvider = listItem;
            }
        };
        HunterTransformDetailsItem.prototype.setConsume = function () {
            if (this.info) {
                var count11 = 0;
                var str_count = zj.Helper.StringFormat("%d/%d", 0, 0);
                for (var i = 0; i < 3; i++) {
                    if (this.info.consume_goods[i]) {
                        var itemSet = zj.PlayerItemSystem.Set(this.info.consume_goods[i][0]);
                        count11 = this.info.consume_goods[i][1];
                        str_count = zj.Helper.StringFormat("%d/%d", itemSet.Count, count11);
                        if (i == 0) {
                            this.costId = itemSet.Info["id"];
                            this.labelNumStoryBook.text = str_count;
                            this.imageIconStoryBook.source = zj.cachekey(itemSet["Path"], this);
                            zj.Set.LabelNumberGreenAndRed(this.labelNumStoryBook, itemSet.Count, count11);
                            if (itemSet.Count >= count11) {
                                this.imageAddStoryBook.visible = false;
                            }
                            else {
                                this.imageAddStoryBook.visible = true;
                            }
                        }
                        else if (i == 1) {
                            this.cardId = itemSet.Info["id"];
                            this.labelNumTransformCard.text = str_count;
                            this.imageIconTransformCard.source = zj.cachekey(itemSet["Path"], this);
                            zj.Set.LabelNumberGreenAndRed(this.labelNumTransformCard, itemSet.Count, count11);
                            if (itemSet.Count >= count11) {
                                this.imageAddTransformCard.visible = false;
                            }
                            else {
                                this.imageAddTransformCard.visible = true;
                            }
                        }
                        else {
                            count11 = 1;
                            if (zj.PlayerHunterSystem.transformSel != 1) {
                                itemSet.Count = 1;
                            }
                            else {
                                itemSet.Count = 0;
                            }
                            str_count = zj.Helper.StringFormat("%d/%d", itemSet.Count, count11);
                            this.generalId = this.info.general_id;
                            this.labelNumHunterMeterials.text = str_count;
                            this.imageIconHunterMeterials.source = zj.cachekey(itemSet["Path"], this);
                            zj.Set.LabelNumberGreenAndRed(this.labelNumHunterMeterials, itemSet.Count, count11);
                            if (itemSet.Count >= count11) {
                                this.imageAddHunterMeterials.visible = false;
                            }
                            else {
                                this.imageAddHunterMeterials.visible = true;
                            }
                        }
                    }
                    else {
                        count11 = 1;
                        var itemSets = new message.GoodsInfo;
                        if (zj.PlayerHunterSystem.transformSel != 1) {
                            itemSets.count = 1;
                        }
                        else {
                            itemSets.count = 0;
                        }
                        str_count = zj.Helper.StringFormat("%d/%d", itemSets.count, count11);
                        this.generalId = this.info.general_id;
                        this.labelNumHunterMeterials.text = str_count;
                        var iconTab = zj.TableItemPic.Table();
                        var info_gnr = zj.PlayerHunterSystem.Table(this.generalId);
                        var info_map = zj.TableMapRole.Item(info_gnr.general_roleId);
                        var path_head = info_map.head_path;
                        this.imageIconHunterMeterials.source = path_head;
                        zj.Set.LabelNumberGreenAndRed(this.labelNumHunterMeterials, itemSets.count, count11);
                        if (itemSets.count >= count11) {
                            this.imageAddHunterMeterials.visible = false;
                        }
                        else {
                            this.imageAddHunterMeterials.visible = true;
                        }
                    }
                }
            }
        };
        HunterTransformDetailsItem.prototype.onButtonStoryBook = function () {
            var _this = this;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(_this.costId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterTransformDetailsItem.prototype.onButtonTransformCard = function () {
            var _this = this;
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(_this.cardId, _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterTransformDetailsItem.prototype.onButtonHunterMeterials = function () {
            var _this = this;
            var newGeneralId = zj.PlayerHunterSystem.replaceGeneralID(this.info.general_id);
            zj.loadUI(zj.HunterTransformSkillPop)
                .then(function (popDialog) {
                popDialog.SetInfo(_this.info.general_id, _this.info.general_id, _this.info, _this);
                popDialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        HunterTransformDetailsItem.prototype.onButtonTransform = function () {
            var _this = this;
            if (this.info) {
                var newGeneralId = zj.PlayerHunterSystem.replaceGeneralID(this.info.general_id);
                var generalId = zj.PlayerHunterSystem.transformSel;
                HunterTransformDetailsItem.GeneralTransferReq(generalId).then(function (data) {
                    zj.loadUI(zj.CommonGetGeneral).then(function (dialog) {
                        dialog.setInfo(data.body.gameInfo.generals[0].general_id, 0, function () {
                            _this.setConsume();
                        });
                        dialog.show(zj.UI.SHOW_FILL_OUT);
                        zj.PlayerHunterSystem.transformSel = 1;
                    });
                }).catch(function (reason) { });
            }
        };
        HunterTransformDetailsItem.GeneralTransferReq = function (generalId) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var request = new message.GeneralTransferRequest();
                request.body.generalId = generalId;
                zj.Game.Controller.send(request, function (req, resp) {
                    var response = resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        reject(zj.Game.ConfigManager.getAone2CodeReason(response.header.result));
                        return;
                    }
                    resolve(response);
                    return;
                }, function (req) {
                    reject(zj.LANG("请求超时"));
                    return;
                }, _this, false);
                return;
            });
        };
        HunterTransformDetailsItem.prototype.onButtonClose = function () {
            this.info = null;
            zj.PlayerHunterSystem.transformSel = 1;
            this.close(zj.UI.HIDE_TO_TOP);
        };
        return HunterTransformDetailsItem;
    }(zj.Scene));
    zj.HunterTransformDetailsItem = HunterTransformDetailsItem;
    __reflect(HunterTransformDetailsItem.prototype, "zj.HunterTransformDetailsItem");
})(zj || (zj = {}));
//# sourceMappingURL=HunterTransformDetailsItem.js.map