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
    /**
     * xingliwei
     * 2019.11.6
     * 猎人时装
     */
    var Hunterskin = (function (_super) {
        __extends(Hunterskin, _super);
        function Hunterskin() {
            var _this = _super.call(this) || this;
            _this.currentHunterFashionIndex = 0;
            _this.currentHunterFashionList = [];
            /**是否有皮肤 */
            _this.vis = false;
            /**是否可变身 */
            // public vis1: boolean = false;
            _this.listAttributeData = new eui.ArrayCollection();
            _this.skinName = "resource/skins/hunter/HunterskinSkin.exml";
            _this.init();
            return _this;
        }
        //初始化
        Hunterskin.prototype.init = function () {
            var _this = this;
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this.cb) {
                    _this.cb();
                    zj.Game.EventManager.event(zj.GameEvent.SET_HUNTER_ITEM, { generalId: _this.generalId });
                }
                _this.close(zj.UI.HIDE_TO_TOP);
            }, this);
            this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeft, this);
            this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRight, this);
            this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
            this.btnHaveHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHaveHunter, this);
        };
        /**设置信息 */
        Hunterskin.prototype.setInfo = function (generalId) {
            var _this = this;
            this.generalId = generalId;
            // let vis01: TableBaseGeneral = Table.FindR(PlayerFashionSystem.GetHunterListWithFashion(), (k, v) => {
            // 	return v.general_id == this.generalId % 100000;
            // })[0];
            // let vis02: TableGeneralTransfer = Table.FindR(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
            // 	return v.general_id == this.generalId % 100000;
            // })[0];
            this.vis = zj.Table.FindF(zj.PlayerFashionSystem.GetHunterListWithFashion(), function (k, v) {
                return v.general_id == _this.generalId % 100000;
            }) && this.generalId % 100000 != 10028; // && TableMapRole.Item(vis01.fashion_id[0]).model_id != vis02.transfer_role[0];
            // this.vis1 = Table.FindF(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
            // 	return v.general_id == this.generalId % 100000;
            // })
            this.baseInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var roleInfoId = zj.PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
            this.roleInfo = zj.PlayerHunterSystem.MapInstance(roleInfoId);
            this.hunterTbl = zj.PlayerFashionSystem.GetHunterListWithFashion();
            this.currentGeneralTbl = zj.Table.FindR(this.hunterTbl, function (k, v) {
                return v.general_id == _this.generalId % 100000;
            })[0];
            if (this.currentGeneralTbl) {
                _a = zj.PlayerFashionSystem.GetAllFashionByGeneralId(this.generalId), this.currentHunterFashionList = _a[0], this.currentHunterFashionIndex = _a[1];
            }
            this.hunterinfo();
            this.hunterFashionableDress();
            this.loadHunterInfo();
            var _a;
        };
        Hunterskin.prototype.CB = function (cb) {
            this.cb = cb;
        };
        /**界面上的猎人信息 */
        Hunterskin.prototype.hunterinfo = function () {
            var _this = this;
            var a;
            if (this.currentGeneralTbl) {
                _a = zj.PlayerFashionSystem.GetAllFashionByGeneralId(this.generalId), this.currentHunterFashionList = _a[0], a = _a[1];
            }
            else {
                this.currentHunterFashionList.push({ id: this.generalId % 100000, state: 3 });
            }
            var hunterInfo = zj.Game.PlayerHunterSystem.queryHunter(this.generalId);
            // let halfPath: string = this.roleInfo ? this.roleInfo.half_path : "";
            // if (hunterInfo.transfer_level && hunterInfo.transfer_level > 0) {
            // 	let transferTab = TableGeneralTransfer.Table();
            // 	let transformInfo = transferTab[this.baseInfo.general_id];
            // 	let picRoleInfo = PlayerHunterSystem.MapInstance(transformInfo.transfer_role)
            // 	halfPath = picRoleInfo.half_path;
            // } else {
            // 	halfPath = this.roleInfo.half_path;
            // }
            // let hunter_list = TableGeneralTransfer.Table();
            // let str = null;
            // if (halfPath.indexOf("bs") >= 0) {
            // 	str = halfPath.slice(0, Object.keys(halfPath).length - 6);
            // } else if (halfPath.indexOf("sz1") > 0) {
            // 	str = halfPath.slice(0, Object.keys(halfPath).length - 8);
            // } else {
            // 	str = halfPath.slice(0, Object.keys(halfPath).length - 4);
            // }
            var baseInfo = zj.PlayerHunterSystem.Table(this.generalId);
            var roleInfoId = zj.PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
            var roleInfo = zj.PlayerHunterSystem.MapInstance(roleInfoId);
            var halfPath = roleInfo.half_path;
            var namePath = baseInfo.name_pic;
            var transferTab = zj.TableGeneralTransfer.Table();
            var transformInfo = transferTab[baseInfo.general_id];
            var picRoleInfo = zj.PlayerHunterSystem.MapInstance(transformInfo.transfer_role);
            // if (this.vis && this.vis1) {
            if (this.currentHunterFashionIndex == 0) {
                var id = zj.TableBaseGeneral.Item(zj.PlayerHunterSystem.GetGeneralId(this.generalId)).general_roleId;
                halfPath = zj.TableMapRole.Item(id).half_path;
            }
            else if (this.currentHunterFashionIndex == 1) {
                // if (this.vis1) {
                // 	halfPath = picRoleInfo.half_path;
                // } else {
                var id = zj.TableItemFashion.Item(zj.TableBaseGeneral.Item(zj.PlayerHunterSystem.GetGeneralId(this.generalId)).fashion_id[0]).fashion_roleId;
                halfPath = zj.TableMapRole.Item(id).half_path;
                // }
            }
            else if (this.currentHunterFashionIndex == 2) {
                halfPath = picRoleInfo.half_path;
            }
            this.spriteHunterHalfDraw.source = zj.cachekey(halfPath, this);
            //使用，使用中，获取信息
            this.imgUseing.visible = false;
            // if (this.vis1 && this.currentHunterFashionIndex == 2) {
            // 	if (hunterInfo.transfer_level > 0) {
            // 		if (hunterInfo.is_show_transfer) {
            // 			this.btnHaveHunter.visible = false;//使用皮肤
            // 			this.btnUse.visible = false;
            // 			this.imgUseing.visible = true;
            // 		} else {
            // 			this.btnHaveHunter.visible = false;//不使用皮肤
            // 			this.btnUse.visible = true;
            // 			this.imgUseing.visible = false;
            // 		}
            // 	} else {
            // 		this.btnHaveHunter.visible = true;//未变身
            // 		this.btnUse.visible = false;
            // 		this.imgUseing.visible = false;
            // 	}
            // 	this.FashionName.text = TableGeneralTransfer.Item(this.generalId % 100000).general_name;
            // } else {
            var state = this.currentHunterFashionList[this.currentHunterFashionIndex].state;
            //时装名称
            if (this.currentHunterFashionList[this.currentHunterFashionIndex].state == 3) {
            }
            else {
                this.FashionName.text = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
            }
            // 武将身上时装
            var currentGeneralFashionId = 0;
            if (this.currentGeneralTbl) {
                var currentOneGeneralInfo = zj.Table.FindR(zj.Game.PlayerHunterSystem.queryAllHunters(), function (k, v) {
                    return _this.generalId == Number(v.general_id);
                });
                if (currentOneGeneralInfo[0] != null) {
                    currentGeneralFashionId = currentOneGeneralInfo[0].fashionId;
                }
            }
            if (state == 0) {
                // 未购买
                this.btnHaveHunter.visible = true;
                this.btnUse.visible = false;
                this.imgUseing.visible = false;
                this.FashionName.text = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
            }
            else if (state == 1) {
                // 购买为未使用
                this.btnHaveHunter.visible = false;
                this.btnUse.visible = true;
                this.imgUseing.visible = false;
                this.FashionName.text = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
            }
            else if (state == 2) {
                // 购买且使用
                this.btnHaveHunter.visible = false;
                this.btnUse.visible = false;
                this.imgUseing.visible = true;
                this.FashionName.text = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
            }
            else if (state == 3) {
                // 原皮肤
                // if (this.vis1) {
                // 	if (this.currentHunterFashionIndex != 0) {
                // 		this.btnHaveHunter.visible = false;
                // 		this.btnUse.visible = (hunterInfo.is_show_transfer == false);
                // 		this.imgUseing.visible = (hunterInfo.is_show_transfer == true);
                // 	} else {
                // 		this.btnHaveHunter.visible = false;
                // 		this.btnUse.visible = (currentGeneralFashionId != 0 || hunterInfo.is_show_transfer == true);
                // 		this.imgUseing.visible = (currentGeneralFashionId == 0 && hunterInfo.is_show_transfer == false);
                // 	}
                // } else {
                this.btnHaveHunter.visible = false;
                this.btnUse.visible = currentGeneralFashionId != 0;
                this.imgUseing.visible = currentGeneralFashionId == 0;
                // }
                var generalName = void 0;
                if (this.currentGeneralTbl) {
                    generalName = this.currentGeneralTbl.general_name;
                }
                else {
                    generalName = zj.TableItemGeneral.Item(this.generalId % 100000).name;
                }
                this.FashionName.text = zj.Helper.StringFormat(zj.TextsConfig.TextsConfig_Hunter.fashion.original, generalName);
                this.FashionName.textColor = zj.Helper.GetStepColor(0);
            }
            // }
            // if (this.vis && this.vis1) {
            // 	if (this.currentHunterFashionIndex == 0) {
            // 		this.img11.visible = true;
            // 		this.img22.visible = false;
            // 		this.img33.visible = false;
            // 	} else if (this.currentHunterFashionIndex == 1) {
            // 		this.img11.visible = false;
            // 		this.img22.visible = true;
            // 		this.img33.visible = false;
            // 	} else {
            // 		this.img11.visible = false;
            // 		this.img22.visible = false;
            // 		this.img33.visible = true;
            // 	}
            // } else {
            // this.img22.visible = false;
            // this.img2.visible = false;
            this.groupSellect.width = this.currentHunterFashionList.length * 23;
            for (var i = 0; i < 5; i++) {
                if (i <= this.currentHunterFashionList.length - 1) {
                    this["img" + (i + 1) + "" + (i + 1)].x = i * 23;
                    this["img" + (i + 1)].x = i * 23;
                }
                else {
                    this["img" + (i + 1) + "" + (i + 1)].x = 0;
                    this["img" + (i + 1)].x = 0;
                    this["img" + (i + 1) + "" + (i + 1)].visible = false;
                    this["img" + (i + 1)].visible = false;
                }
            }
            for (var i = 0; i < 5; i++) {
                this["img" + (i + 1) + "" + (i + 1)].visible = false;
            }
            switch (this.currentHunterFashionIndex) {
                case 0:
                    this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true;
                    break;
                case 1:
                    this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true;
                    break;
                case 2:
                    this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true;
                    break;
                case 3:
                    this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true;
                    break;
                case 4:
                    this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true;
                    break;
            }
            var _a;
            // if (this.currentHunterFashionIndex == 0) {
            // 	this.img11.visible = true;
            // 	this.img33.visible = false;
            // } else if (this.currentHunterFashionIndex == 2) {
            // 	this.img11.visible = false;
            // 	this.img33.visible = true;
            // } else if (this.currentHunterFashionIndex == 1) {
            // 	this.img11.visible = false;
            // 	this.img33.visible = true;
            // }
            // }
        };
        // }
        //猎人加成信息	
        Hunterskin.prototype.loadHunterInfo = function () {
            if (this.currentHunterFashionIndex == 0) {
                this.listAttributeData.removeAll();
                this.labelSkill.visible = true;
                return;
            }
            var info;
            // if (this.currentHunterFashionIndex == 2) {
            // 	info = TableGeneralTransfer.Item(this.generalId % 100000);
            // } else {
            // if (this.vis1) {
            // 	info = TableGeneralTransfer.Item(this.generalId % 100000);
            // } else {
            info = zj.TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id);
            // }
            // }
            var info1 = [];
            // if (this.vis1) {
            // 	if (info.general_hp[0] != 0) {
            // 		info1.push(["general_hp", info.general_hp[0]])
            // 	}
            // 	if (info.general_atk[0] != 0) {
            // 		info1.push(["general_atk", info.general_atk[0]])
            // 	}
            // 	if (info.general_def[0] != 0) {
            // 		info1.push(["general_def", info.general_def[0]])
            // 	}
            // 	if (info.atk_crit[0] != 0) {
            // 		info1.push(["atk_crit", info.atk_crit[0]])
            // 	}
            // 	if (info.crit_extra[0] != 0) {
            // 		info1.push(["crit_extra", info.crit_extra[0]])
            // 	}
            // 	if (info.hit_rate[0] != 0) {
            // 		info1.push(["hit_rate", info.hit_rate[0]])
            // 	}
            // 	if (info.ignore_magicDef[0] != 0) {
            // 		info1.push(["ignore_magicDef", info.ignore_magicDef[0]])
            // 	}
            // 	if (info.cd_speed[0] != 0) {
            // 		info1.push(["cd_speed", info.cd_speed[0]])
            // 	}
            // 	if (info.skill_atk[0] != 0) {
            // 		info1.push(["skill_atk", info.skill_atk[0]])
            // 	}
            // 	if (info.skill_def[0] != 0) {
            // 		info1.push(["skill_def", info.skill_def[0]])
            // 	}
            // } else {
            if (info.general_hp != 0) {
                info1.push(["general_hp", info.general_hp]);
            }
            if (info.general_atk != 0) {
                info1.push(["general_atk", info.general_atk]);
            }
            if (info.general_def != 0) {
                info1.push(["general_def", info.general_def]);
            }
            if (info.atk_crit != 0) {
                info1.push(["atk_crit", info.atk_crit]);
            }
            if (info.crit_extra != 0) {
                info1.push(["crit_extra", info.crit_extra]);
            }
            if (info.hit_rate != 0) {
                info1.push(["hit_rate", info.hit_rate]);
            }
            if (info.ignore_magicDef != 0) {
                info1.push(["ignore_magicDef", info.ignore_magicDef]);
            }
            if (info.ignore_phyDef != 0) {
                info1.push(["ignore_phyDef", info.ignore_phyDef]);
            }
            if (info.cd_speed != 0) {
                info1.push(["cd_speed", info.cd_speed]);
            }
            if (info.skill_atk != 0) {
                info1.push(["skill_atk", info.skill_atk]);
            }
            if (info.skill_def != 0) {
                info1.push(["skill_def", info.skill_def]);
            }
            // }
            this.labelSkill.visible = false;
            this.listAttributeData.removeAll();
            for (var i = 0; i < info1.length; i++) {
                var data = new zj.HunterskinItemData();
                data.info = info1[i];
                data.index = i;
                this.listAttributeData.addItem(data);
            }
            this.listAttribute.dataProvider = this.listAttributeData;
            this.listAttribute.itemRenderer = zj.HunterskinItem;
        };
        /**点击左侧按钮切换形象 */
        Hunterskin.prototype.onBtnLeft = function () {
            if (this.currentHunterFashionIndex > 0) {
                // if (!this.vis && this.vis1) {
                // this.currentHunterFashionIndex -= 2;
                // } else {
                this.currentHunterFashionIndex -= 1;
                // }
            }
            this.hunterinfo();
            this.hunterFashionableDress();
            this.loadHunterInfo();
        };
        /**点击右侧按钮切换形象 */
        Hunterskin.prototype.onBtnRight = function () {
            // if (this.vis && this.vis1) {
            // 	if (this.currentHunterFashionIndex < 2) {
            // 		this.currentHunterFashionIndex += 1;
            // 	}
            // } else if (!this.vis && this.vis1) {
            // 	if (this.currentHunterFashionIndex < 2) {
            // 		this.currentHunterFashionIndex += 2;
            // 	}
            // } else 
            // {
            if (this.currentHunterFashionIndex < this.currentHunterFashionList.length - 1) {
                this.currentHunterFashionIndex += 1;
            }
            // }
            this.hunterinfo();
            this.hunterFashionableDress();
            this.loadHunterInfo();
        };
        /**点击使用形象 */
        Hunterskin.prototype.onBtnUse = function () {
            var _this = this;
            // if (this.currentHunterFashionIndex == 2 || (this.currentHunterFashionIndex == 1 && this.vis == false)) {//&& this.vis1 == true
            // 	Game.PlayerFashionSystem.GeneralTransferTab(true, this.generalId).then(() => {
            // 		this.hunterinfo();
            // 	})
            // } else {
            var isUnwear = true;
            var fashionId = this.generalId;
            if (zj.PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                isUnwear = false;
                fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
            }
            var a = function () {
                zj.toast_success(zj.LANG(zj.TextsConfig.TextsConfig_Hunter.fashion.wearSuccess));
                var fashionId = 0;
                if (zj.PlayerItemSystem.Type2(_this.currentHunterFashionList[_this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                    fashionId = _this.currentHunterFashionList[_this.currentHunterFashionIndex].id;
                }
                // 设置所有武将拥有此时装
                for (var k in zj.Game.PlayerHunterSystem.allHuntersMap()) {
                    if (Number(k) == _this.generalId) {
                        zj.Game.PlayerHunterSystem.allHuntersMap()[k].fashionId = fashionId;
                    }
                }
                for (var k in zj.Game.PlayerHunterSystem.queryAllHunters()) {
                    if (Number(zj.Game.PlayerHunterSystem.queryAllHunters()[k].general_id) == _this.generalId) {
                        zj.Game.PlayerHunterSystem.queryAllHunters()[k].fashionId = fashionId;
                    }
                }
                for (var k in _this.currentHunterFashionList) {
                    if (_this.currentHunterFashionList[k].state != 3) {
                        if (_this.currentHunterFashionList[k].state == 2) {
                            _this.currentHunterFashionList[k].state = 1;
                        }
                        else if (Number(k) == _this.currentHunterFashionIndex) {
                            _this.currentHunterFashionList[k].state = 2;
                        }
                    }
                }
                _this.hunterinfo();
            };
            zj.Game.PlayerFashionSystem.fashionWear(isUnwear, fashionId, this.generalId).then(function () {
                // if (Game.PlayerHunterSystem.queryHunter(this.generalId).transfer_level > 0) {//如果猎人b变身了之后，设置变身皮肤是否显示
                // 	Game.PlayerFashionSystem.GeneralTransferTab(false, this.generalId).then(() => {
                // 		a();
                // 	})
                // } else {
                a();
                // }
            });
            // }
        };
        /**获取皮肤 */
        Hunterskin.prototype.onBtnHaveHunter = function () {
            zj.toast_success("请关注相关运营活动获取该皮肤");
            // if (this.currentHunterFashionIndex == 2) {
            // 	let thisOne = this;
            // 	loadUI(HunterTransformMainSence)
            // 		.then((scene: HunterTransformMainSence) => {
            // 			scene.show(UI.SHOW_FROM_TOP);
            // 			thisOne.close();
            // 		});
            // } else {
            // 	loadUI(FashionMain)
            // 		.then((dialog: FashionMain) => {
            // 			dialog.show(UI.SHOW_FROM_TOP);
            // 			dialog.init();
            // 		});
            // }
        };
        /**猎人时装 */
        Hunterskin.prototype.hunterFashionableDress = function () {
            var _this = this;
            // if (this.vis1 && this.currentHunterFashionIndex == 2) {
            // 	let body = TableClientFightAniSpineSource.Item(TableMapRole.Item(TableGeneralTransfer.Item(this.generalId % 100000).transfer_role).body_spx_id).json;
            // 	this.groupFashion.removeChildren();
            // 	Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
            // 		.then(display => {
            // 			display.scaleX = 0.9;
            // 			display.scaleY = 0.9;
            // 			display.name = "fashion";
            // 			this.groupFashion.addChild(display);
            // 		});
            // } else {
            var mapRoleId = null;
            if (zj.PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
                mapRoleId = zj.PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
            }
            else {
                mapRoleId = zj.PlayerHunterSystem.Table(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId;
            }
            mapRoleId = zj.TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == null ? zj.TableBaseGeneral.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId : zj.TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
            var bodySpxId = zj.TableMapRole.Item(mapRoleId).body_spx_id;
            var scale = zj.TableMapRole.Item(mapRoleId).spine_scale;
            var body = zj.TableClientFightAniSpineSource.Item(bodySpxId).json;
            // if (this.vis1 && this.currentHunterFashionIndex != 0) {
            // 	body = TableClientFightAniSpineSource.Item(TableMapRole.Item(TableGeneralTransfer.Item(this.generalId % 100000).transfer_role).body_spx_id).json;
            // }
            this.groupFashion.removeChildren();
            zj.Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
                .then(function (display) {
                display.scaleX = scale;
                display.scaleY = scale;
                display.name = "fashion";
                _this.groupFashion.addChild(display);
            });
            // }
        };
        return Hunterskin;
    }(zj.Dialog));
    zj.Hunterskin = Hunterskin;
    __reflect(Hunterskin.prototype, "zj.Hunterskin");
})(zj || (zj = {}));
//# sourceMappingURL=Hunterskin.js.map