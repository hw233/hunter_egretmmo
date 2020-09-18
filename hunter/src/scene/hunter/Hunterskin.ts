namespace zj {
	/**
	 * xingliwei
	 * 2019.11.6
	 * 猎人时装
	 */
	export class Hunterskin extends Dialog {
		public imgSprite: eui.Image;
		public groupLeft: eui.Group;
		public spriteHunterHalfDraw: eui.Image;
		public FashionName: eui.Label;
		public btnLeft: eui.Button;
		public btnRight: eui.Button;
		public groupProgress0: eui.Group;
		public img1: eui.Image;
		public img2: eui.Image;
		public img3: eui.Image;
		public groupSellect: eui.Group;
		public img11: eui.Image;
		public img22: eui.Image;
		public img33: eui.Image;
		public btnHaveHunter: eui.Button;
		public btnUse: eui.Button;
		public imgUseing: eui.Image;
		public groupRight: eui.Group;
		public imgFloor: eui.Image;
		public groupFashion: eui.Group;
		public labelSkill: eui.Label;
		public scroll: eui.Scroller;
		public listAttribute: eui.List;
		public btnClose: eui.Button;

		public generalId;
		public currentHunterFashionIndex = 0;
		public currentHunterFashionList = [];
		public baseInfo;
		public roleInfo;
		public hunterTbl;
		public currentGeneralTbl;
		/**是否有皮肤 */
		public vis: boolean = false;
		public cb: Function;
		/**是否可变身 */
		// public vis1: boolean = false;
		public listAttributeData: eui.ArrayCollection = new eui.ArrayCollection();
		public constructor() {
			super();
			this.skinName = "resource/skins/hunter/HunterskinSkin.exml";
			this.init();
		}

		//初始化
		public init() {
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				if (this.cb) {
					this.cb();
					Game.EventManager.event(GameEvent.SET_HUNTER_ITEM, { generalId: this.generalId });
				}
				this.close(UI.HIDE_TO_TOP);
			}, this);

			this.btnLeft.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLeft, this);
			this.btnRight.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRight, this);
			this.btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUse, this);
			this.btnHaveHunter.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnHaveHunter, this);
		}

		/**设置信息 */
		public setInfo(generalId) {
			this.generalId = generalId;

			// let vis01: TableBaseGeneral = Table.FindR(PlayerFashionSystem.GetHunterListWithFashion(), (k, v) => {
			// 	return v.general_id == this.generalId % 100000;
			// })[0];
			// let vis02: TableGeneralTransfer = Table.FindR(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
			// 	return v.general_id == this.generalId % 100000;
			// })[0];

			this.vis = Table.FindF(PlayerFashionSystem.GetHunterListWithFashion(), (k, v) => {
				return v.general_id == this.generalId % 100000
			}) && this.generalId % 100000 != 10028;  // && TableMapRole.Item(vis01.fashion_id[0]).model_id != vis02.transfer_role[0];

			// this.vis1 = Table.FindF(PlayerHunterSystem.getGeneralTransfer(), (k, v) => {
			// 	return v.general_id == this.generalId % 100000;
			// })

			this.baseInfo = PlayerHunterSystem.Table(this.generalId);
			let roleInfoId = PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
			this.roleInfo = PlayerHunterSystem.MapInstance(roleInfoId);
			this.hunterTbl = PlayerFashionSystem.GetHunterListWithFashion()
			this.currentGeneralTbl = Table.FindR(this.hunterTbl, (k, v) => {
				return v.general_id == this.generalId % 100000;
			})[0];
			if (this.currentGeneralTbl) {
				[this.currentHunterFashionList, this.currentHunterFashionIndex] = PlayerFashionSystem.GetAllFashionByGeneralId(this.generalId);
			}
			this.hunterinfo();
			this.hunterFashionableDress();
			this.loadHunterInfo();
		}

		public CB(cb) {
			this.cb = cb;
		}

		/**界面上的猎人信息 */
		public hunterinfo() {
			let a;
			if (this.currentGeneralTbl) {
				[this.currentHunterFashionList, a] = PlayerFashionSystem.GetAllFashionByGeneralId(this.generalId);
			} else {
				this.currentHunterFashionList.push({ id: this.generalId % 100000, state: 3 });
			}
			let hunterInfo = Game.PlayerHunterSystem.queryHunter(this.generalId);
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
			let baseInfo = PlayerHunterSystem.Table(this.generalId);
			let roleInfoId = PlayerHunterSystem.GetGeneralRoleInfoID(this.generalId);
			let roleInfo = PlayerHunterSystem.MapInstance(roleInfoId);
			let halfPath = roleInfo.half_path;
			let namePath = baseInfo.name_pic;
			let transferTab = TableGeneralTransfer.Table();
			let transformInfo = transferTab[baseInfo.general_id];
			let picRoleInfo = PlayerHunterSystem.MapInstance(transformInfo.transfer_role);

			// if (this.vis && this.vis1) {
			if (this.currentHunterFashionIndex == 0) {
				let id = TableBaseGeneral.Item(PlayerHunterSystem.GetGeneralId(this.generalId)).general_roleId;
				halfPath = TableMapRole.Item(id).half_path;
			} else if (this.currentHunterFashionIndex == 1) {
				// if (this.vis1) {
				// 	halfPath = picRoleInfo.half_path;
				// } else {
				let id = TableItemFashion.Item(TableBaseGeneral.Item(PlayerHunterSystem.GetGeneralId(this.generalId)).fashion_id[0]).fashion_roleId;
				halfPath = TableMapRole.Item(id).half_path;
				// }
			} else if (this.currentHunterFashionIndex == 2) {
				halfPath = picRoleInfo.half_path;
			}


			this.spriteHunterHalfDraw.source = cachekey(halfPath, this);
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
			let state = this.currentHunterFashionList[this.currentHunterFashionIndex].state;
			//时装名称
			if (this.currentHunterFashionList[this.currentHunterFashionIndex].state == 3) {

			} else {
				this.FashionName.text = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
			}

			// 武将身上时装
			let currentGeneralFashionId: number = 0;
			if (this.currentGeneralTbl) {
				let currentOneGeneralInfo = Table.FindR(Game.PlayerHunterSystem.queryAllHunters(), (k, v) => {
					return this.generalId == Number(v.general_id);
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
				this.FashionName.text = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
			} else if (state == 1) {
				// 购买为未使用
				this.btnHaveHunter.visible = false;
				this.btnUse.visible = true;
				this.imgUseing.visible = false;
				this.FashionName.text = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
			} else if (state == 2) {// && !hunterInfo.is_show_transfer&& this.currentHunterFashionIndex != 0
				// 购买且使用
				this.btnHaveHunter.visible = false;
				this.btnUse.visible = false;
				this.imgUseing.visible = true;
				this.FashionName.text = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
			}
			//  else if (state == 2) { //&& hunterInfo.is_show_transfer
			// 	// 变身皮肤正在使用
			// 	this.btnHaveHunter.visible = false;
			// 	this.btnUse.visible = true;
			// 	this.imgUseing.visible = false;
			// 	this.FashionName.text = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).name;
			// } 
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
				let generalName
				if (this.currentGeneralTbl) {
					generalName = this.currentGeneralTbl.general_name;
				} else {
					generalName = TableItemGeneral.Item(this.generalId % 100000).name;
				}

				this.FashionName.text = Helper.StringFormat(TextsConfig.TextsConfig_Hunter.fashion.original, generalName);
				this.FashionName.textColor = Helper.GetStepColor(0);
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
			for (let i = 0; i < 5; i++) {
				if (i <= this.currentHunterFashionList.length - 1) {
					this["img" + (i + 1) + "" + (i + 1)].x = i * 23;
					this["img" + (i + 1)].x = i * 23;
				} else {
					this["img" + (i + 1) + "" + (i + 1)].x = 0;
					this["img" + (i + 1)].x = 0;
					this["img" + (i + 1) + "" + (i + 1)].visible = false;
					this["img" + (i + 1)].visible = false;
				}
			}
			for (let i = 0; i < 5; i++) {
				this["img" + (i + 1) + "" + (i + 1)].visible = false;
			}
			switch (this.currentHunterFashionIndex) {
				case 0:
					this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true
					break;
				case 1:
					this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true
					break;
				case 2:
					this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true
					break;
				case 3:
					this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true
					break;
				case 4:
					this["img" + (this.currentHunterFashionIndex + 1) + "" + (this.currentHunterFashionIndex + 1)].visible = true
					break;
			}

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
		}
		// }

		//猎人加成信息	
		public loadHunterInfo() {
			if (this.currentHunterFashionIndex == 0) {
				this.listAttributeData.removeAll();
				this.labelSkill.visible = true;
				return;
			}
			let info: TableItemFashion | TableGeneralTransfer;
			// if (this.currentHunterFashionIndex == 2) {
			// 	info = TableGeneralTransfer.Item(this.generalId % 100000);
			// } else {
			// if (this.vis1) {
			// 	info = TableGeneralTransfer.Item(this.generalId % 100000);
			// } else {
			info = TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id);
			// }
			// }
			let info1 = [];
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
				info1.push(["general_hp", info.general_hp])
			}
			if (info.general_atk != 0) {
				info1.push(["general_atk", info.general_atk])
			}
			if (info.general_def != 0) {
				info1.push(["general_def", info.general_def])
			}
			if (info.atk_crit != 0) {
				info1.push(["atk_crit", info.atk_crit])
			}
			if (info.crit_extra != 0) {
				info1.push(["crit_extra", info.crit_extra])
			}
			if (info.hit_rate != 0) {
				info1.push(["hit_rate", info.hit_rate])
			}
			if (info.ignore_magicDef != 0) {
				info1.push(["ignore_magicDef", info.ignore_magicDef])
			}
			if (info.ignore_phyDef != 0) {
				info1.push(["ignore_phyDef", info.ignore_phyDef])
			}
			if (info.cd_speed != 0) {
				info1.push(["cd_speed", info.cd_speed])
			}
			if (info.skill_atk != 0) {
				info1.push(["skill_atk", info.skill_atk])
			}
			if (info.skill_def != 0) {
				info1.push(["skill_def", info.skill_def])
			}
			// }


			this.labelSkill.visible = false;
			this.listAttributeData.removeAll();
			for (let i = 0; i < info1.length; i++) {
				let data = new HunterskinItemData();
				data.info = info1[i];
				data.index = i;
				this.listAttributeData.addItem(data);
			}
			this.listAttribute.dataProvider = this.listAttributeData;
			this.listAttribute.itemRenderer = HunterskinItem;
		}

		/**点击左侧按钮切换形象 */
		public onBtnLeft() {
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
		}

		/**点击右侧按钮切换形象 */
		public onBtnRight() {
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
		}

		/**点击使用形象 */
		public onBtnUse() {
			// if (this.currentHunterFashionIndex == 2 || (this.currentHunterFashionIndex == 1 && this.vis == false)) {//&& this.vis1 == true
			// 	Game.PlayerFashionSystem.GeneralTransferTab(true, this.generalId).then(() => {
			// 		this.hunterinfo();
			// 	})
			// } else {
			let isUnwear: boolean = true;
			let fashionId: number = this.generalId;
			if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
				isUnwear = false;
				fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
			}

			let a = () => {
				toast_success(LANG(TextsConfig.TextsConfig_Hunter.fashion.wearSuccess));
				let fashionId: number = 0;
				if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
					fashionId = this.currentHunterFashionList[this.currentHunterFashionIndex].id;
				}
				// 设置所有武将拥有此时装
				for (let k in Game.PlayerHunterSystem.allHuntersMap()) {
					if (Number(k) == this.generalId) {
						Game.PlayerHunterSystem.allHuntersMap()[k].fashionId = fashionId;
					}
				}
				for (let k in Game.PlayerHunterSystem.queryAllHunters()) {
					if (Number(Game.PlayerHunterSystem.queryAllHunters()[k].general_id) == this.generalId) {
						Game.PlayerHunterSystem.queryAllHunters()[k].fashionId = fashionId;
					}
				}
				for (let k in this.currentHunterFashionList) {
					if (this.currentHunterFashionList[k].state != 3) {
						if (this.currentHunterFashionList[k].state == 2) {
							this.currentHunterFashionList[k].state = 1;
						} else if (Number(k) == this.currentHunterFashionIndex) {
							this.currentHunterFashionList[k].state = 2;
						}
					}
				}
				this.hunterinfo();
			}
			Game.PlayerFashionSystem.fashionWear(isUnwear, fashionId, this.generalId).then(() => {
				// if (Game.PlayerHunterSystem.queryHunter(this.generalId).transfer_level > 0) {//如果猎人b变身了之后，设置变身皮肤是否显示
				// 	Game.PlayerFashionSystem.GeneralTransferTab(false, this.generalId).then(() => {
				// 		a();
				// 	})
				// } else {
				a();
				// }
			});
			// }
		}

		/**获取皮肤 */
		public onBtnHaveHunter() {
			toast_success("请关注相关运营活动获取该皮肤");
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
		}

		/**猎人时装 */
		private hunterFashionableDress() {
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
			let mapRoleId: number = null;
			if (PlayerItemSystem.Type2(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == message.EGoodsType.GOODS_TYPE_FASHION) {
				mapRoleId = PlayerHunterSystem.GetFahionInfo(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
			} else {
				mapRoleId = PlayerHunterSystem.Table(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId;
			}
			mapRoleId = TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id) == null ? TableBaseGeneral.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id).general_roleId : TableItemFashion.Item(this.currentHunterFashionList[this.currentHunterFashionIndex].id).fashion_roleId;
			let bodySpxId = TableMapRole.Item(mapRoleId).body_spx_id;
			let scale = TableMapRole.Item(mapRoleId).spine_scale;
			let body = TableClientFightAniSpineSource.Item(bodySpxId).json;
			// if (this.vis1 && this.currentHunterFashionIndex != 0) {
			// 	body = TableClientFightAniSpineSource.Item(TableMapRole.Item(TableGeneralTransfer.Item(this.generalId % 100000).transfer_role).body_spx_id).json;
			// }

			this.groupFashion.removeChildren();
			Game.DragonBonesManager.playAnimation(this, body, "armatureName", 1, 0)
				.then(display => {
					display.scaleX = scale;
					display.scaleY = scale;
					display.name = "fashion";
					this.groupFashion.addChild(display);
				});
			// }

		}

	}
}
