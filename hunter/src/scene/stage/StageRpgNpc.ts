namespace zj {
	export class StageRpgNpc extends StageRpgObject {
		public labelOpen: eui.Label;
		private labelTime: eui.Label;
		private groupTime: eui.Group;
		private bossState: number;
		private funType: number;
		public constructor(node, order) {
			super(node, order);
		}
		public release() {
			super.release();
		}
		public InitNpc(info, scenePosInfo) {
			this.info = info;
			this.setScenePosInfo(null)
			this.LoadData();
			this.LoadView();
			this.loadOther();
			this.setRoot(this.x, this.y);
		}
		public LoadData() {
			this.map_x = this.info.build_x;
			this.map_y = this.curScene.mapHeight - (this.info.build_y);//this.curScene.MapBlockH - 
			let screen_x = this.map_x - (this.curScene.playerLeader.moveDistance - this.curScene.playerLeader.x);
			let screen_y = this.map_y - (this.curScene.playerLeader.verDistance - this.curScene.playerLeader.y);
			this.x = screen_x;
			this.y = screen_y;
		}
		public back1;
		public tips;
		public LoadView() {
			this.funType = -1;
			this.anchorSpine = new egret.Point(0, 0);
			if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Door) {
				//传送门
				this.spineAni = this.LoadFruitAni(this.info.spine_id, this.anchorSpine, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {
				//双色果西索
				this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.PortNpc.SafeLine || this.info.build_id == TableEnum.Enum.PortNpc.SafeUp || this.info.build_id == TableEnum.Enum.PortNpc.SafeDown || this.info.build_id == TableEnum.Enum.PortNpc.SafeUp2) {
				this.anchorSpine = new egret.Point(0, 0);
				this.spineAni = this.LoadPicWithPath(this.info.path, this.anchorSpine, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.ActivityNpc.ActivityBoss) {
				//年兽BOSS
				this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Port) {
				this.funType = message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND;
				// 港口
				this.spineAni = this.LoadSpine(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Boss) {
				this.funType = message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS;
				// BOSS
				this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {
				this.funType = 67
				// 工作派遣
				this.spineAni = this.LoadGeneral(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			} else {
				this.spineAni = this.LoadSpine(this.info, this.anchorSpine, this.info.spine_scale, yuan3(this.info.is_mirror == 0, false, true));
			}
			if (this.info.name_path == "") {
				return;
			}
			// 头顶图标，红点等
			if (this.info.build_id != TableEnum.Enum.ActivityNpc.ActivityBoss) {
				let path1 = UIConfig.UIConfig_City.BuildName_Normal;
				let pathTip = UIConfig.UIConfig_City.BuildName_Tip;
				this.back1 = new eui.Image(path1);
				this.tips = new eui.Image(pathTip);
				this.back1.visible = true;
				this.back1.x = this.info.name_pos[0] - 70;
				this.back1.y = -(this.info.name_pos[1] + 30);

				this.tips.x = this.info.name_pos[0] + 40;
				this.tips.y = -(this.info.name_pos[1] + 30);

				this.titleSpace.addChild(this.back1);
				this.titleSpace.addChild(this.tips);

				let bar = new eui.Image(this.info.name_path);
				bar.x = -this.info.name_pos[0] - 50;
				bar.y = -(this.info.name_pos[1] + 15);
				this.titleSpace.addChild(bar);

				this.sizePic = { width: this.spineAni.width, height: this.spineAni.height };

				// 开启等级
				this.initOpenLabel();

				// 世界BOSS和港口加上倒计时
				this.initTimes();
			}
		}
		private initOpenLabel() {// 创建开启等级文本
			if (this.funType != -1) {
				let isOpen: boolean = PlayerHunterSystem.LevelDBFunOpenTo(this.funType);
				if(!isOpen){
					let dbitem = TableFunctionOpen.Item(this.funType);
					if (dbitem != null) {
						let label = new eui.Label();
						label.size = 18;
						label.x = this.back1.x + 43;
						label.y = this.back1.y + 52;
						label.stroke = 1.5;
						label.text = Helper.StringFormat(TextsConfig.TextsConfig_Common.openAutoLv, dbitem.condition);
						this.titleSpace.addChild(label);
						this.labelOpen = label;
					}
				}
			}
		}
		private initTimes() {// 创建倒计时
			if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Boss
				|| this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Port) {
				let group = new eui.Group();
				group.touchEnabled = group.touchChildren = false;
				group.width = 210;
				group.height = 34;

				let imgBG = new eui.Image("ui_wonderland_BoardBossEnter_png");
				imgBG.width = group.width;
				imgBG.height = group.height;
				group.addChild(imgBG);

				let imgIcon = new eui.Image("ui_wonderland_IconBossTime_png");
				imgIcon.width = 32;
				imgIcon.height = 33;
				imgIcon.verticalCenter = "0";
				imgIcon.x = 12;
				group.addChild(imgIcon);

				let label = new eui.Label();
				label.size = 20;
				label.horizontalCenter = "" + (imgIcon.width) / 2;
				label.verticalCenter = "0";
				group.addChild(label);

				group.x = this.info.name_pos[0] - group.width / 2;
				group.y = -(this.info.name_pos[1] + 60);
				this.titleSpace.addChild(group);

				group.visible = false;

				this.labelTime = label;
				this.groupTime = group;
			}
		}
		private udpateTimes() {// 更新倒计时
			if(this.labelOpen){
				let isOpen: boolean = PlayerHunterSystem.LevelDBFunOpenTo(this.funType);
				if (isOpen) {
					this.labelOpen.parent.removeChild(this.labelOpen);
					this.labelOpen = null;
				} else {
					return;
				}
			}
			if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Boss) {
				this.updateBossTime();
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Port) {
				this.updatePortTime();
			}
		}
		private updateBossTime() {
			let openBoss: boolean = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DEMON_BOSS);
			if (openBoss) {
				let progress = Game.PlayerProgressesSystem.progressMap[message.EProcessType.PROCESS_TYPE_SCENE_BOSS];
				if (progress) {
					if (this.bossState != progress.info) {
						this.bossState = progress.info;
					}
					if (progress.leftTime == 0) {
						Game.PlayerZorkSystem.bossInfo();
					}
				}
				Game.PlayerZorkSystem.bossInfo().then(() => { });
				let strTime = progress.leftTime //- Math.floor(egret.getTimer() / 1000);
				let strTimeText = Helper.GetTimeStr(strTime > 0 ? strTime : 0, false);
				if (this.bossState == 0) {
					this.labelTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTimeText));
				} else {
					this.labelTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTimeText));
				}
			}
			this.groupTime.visible = openBoss;
		}
		private updatePortTime() {
			let openPort = PlayerHunterSystem.LevelDBFunOpenTo(message.FunctionOpen.FUNCTION_OPEN_TYPE_DARKLAND);
			if (openPort) {
				let [bOpen, lastTime] = PlayerDarkSystem.PortOpenTime();
				let strTime: string = Set.timeLeaveSec(lastTime);
				if (!bOpen) {
					this.labelTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToOpen, strTime));
				} else {
					this.labelTime.textFlow = Util.RichText(Helper.StringFormat(TextsConfig.TextsConfig_WonderlandBoss.timeToEnd, strTime));
				}
			}
			this.groupTime.visible = openPort;
		}
		public Update(tick) {
			super.Update(tick);
			this.UpdateTips();
			this.udpateTimes();
		}
		private rectVisibleRt = new egret.Rectangle();
		public getVisibleRt() {
			return this.rectVisibleRt.setTo(this.x - 40, this.y, 80, 200);
		}
		public UpdateTips() {
			if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Exchange) {
				this.tips.visible = otherdb.exchangeTips();
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Mora) {
				this.tips.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.RUNES);
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Fish) {
				this.tips.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.FISH);
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.DoubleColor) {
				this.tips.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.DOUBLE);
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Boss) {
				this.tips.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.ZORK_BOSS);
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.Port) {
				this.tips.visible = Tips.GetTipsOfId(Tips.TAG.WONDERLAND, Tips.TAG.PORT);
			} else if (this.info.build_id == TableEnum.Enum.WonderlandPeaceNpc.PassCheck) {
				this.tips.visible = false;
			}
		}
		public isCanBeTouch() {
			let tag = false;
			if (this.info.be_attacked == 1) {
				tag = true;
			}
			return tag;
		}
		public loadOther() {
			if (this.info.draw_order == 5) {
				if (this.info.build_id == TableEnum.Enum.PortNpc.SafeLine || this.info.build_id == TableEnum.Enum.PortNpc.SafeUp2 || this.info.build_id == TableEnum.Enum.PortNpc.SafeUp) {
					this.nodeRoot.parent.addChild(this.nodeRoot);
				} else {
					//有问题
				}
			}
		}
		public beInScope(x, y) {
			// let tag = false;
			// let rect: egret.Rectangle = new egret.Rectangle(this.x - this.info.balk_rt[2] / 2 + this.info.balk_rt[0], this.y + this.info.balk_rt[1] - this.info.balk_rt[3], this.info.balk_rt[2], this.info.balk_rt[3]);
			// let rect1: egret.Rectangle = new egret.Rectangle(this.x - this.info.touch_rt[2] / 2 + this.info.touch_rt[0], this.y + this.info.touch_rt[1] - this.info.touch_rt[3], this.info.touch_rt[2], this.info.touch_rt[3]);
			// let point = new egret.Point(x, y);
			// if (rect.containsPoint(point) == true) {
			// 	tag = true;
			// }
			// if (rect1.containsPoint(point) == true) {
			// 	tag = true;
			// }
			// return tag;
			return Util.isPointInRect(this.x - this.info.balk_rt[2] / 2 + this.info.balk_rt[0], this.y + this.info.balk_rt[1] - this.info.balk_rt[3], this.info.balk_rt[2], this.info.balk_rt[3], x, y)
				|| Util.isPointInRect(this.x - this.info.touch_rt[2] / 2 + this.info.touch_rt[0], this.y + this.info.touch_rt[1] - this.info.touch_rt[3], this.info.touch_rt[2], this.info.touch_rt[3], x, y);
		}
		public getEventPos() {
			return [this.x, this.y - 100];
		}
		public OnTouchDown(touchs, event) {
			// let a = 1;
		}
		public OnTouchMove(touchs, event) {
			// let a = 1;
		}
		public OnTouchUp(touchs, event) {
			// let a = 1;
		}
	}
}