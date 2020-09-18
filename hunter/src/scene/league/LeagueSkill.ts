namespace zj {
	/**
	 * 2019.11.21
	 * xingliwei
	 * @class 公会技能界面 
	 */
	export class LeagueSkill extends Dialog {
		private imgSkillFrame1: eui.Image;
		private imgSkillIcon1: eui.Image;
		private imgSkillIconbg1: eui.Image;
		private labelSkillName1: eui.Label;
		private imgSkillbg1: eui.Image;
		private labelSkillElevate1: eui.Label;
		private imgSkillFrame2: eui.Image;
		private imgSkillIcon2: eui.Image;
		private imgSkillIconbg2: eui.Image;
		private labelSkillName2: eui.Label;
		private imgSkillbg2: eui.Image;
		private labelSkillElevate2: eui.Label;
		private imgSkillFrame3: eui.Image;
		private imgSkillIcon3: eui.Image;
		private imgSkillIconbg3: eui.Image;
		private labelSkillName3: eui.Label;
		private imgSkillbg3: eui.Image;
		private labelSkillElevate3: eui.Label;
		private imgSkillFrame4: eui.Image;
		private imgSkillIcon4: eui.Image;
		private imgSkillIconbg4: eui.Image;
		private labelSkillName4: eui.Label;
		private imgSkillbg4: eui.Image;
		private labelSkillElevate4: eui.Label;
		private imgSkillFrame5: eui.Image;
		public imgSkillIcon5: eui.Image;
		public imgSkillIconbg5: eui.Image;
		public labelSkillName5: eui.Label;
		public imgSkillbg5: eui.Image;
		public labelSkillElevate5: eui.Label;
		public imgSkillFrame6: eui.Image;
		public imgSkillIcon6: eui.Image;
		public imgSkillIconbg6: eui.Image;
		public labelSkillName6: eui.Label;
		public imgSkillbg6: eui.Image;
		public labelSkillElevate6: eui.Label;
		public labelSkillLevel: eui.BitmapLabel;
		public listBonuses: eui.List;
		public labelConsortiaGold: eui.Label;
		public labelGold: eui.Label;
		public btnUpgrade: eui.Button;
		public btnType1: eui.Button;
		public btnType2: eui.Button;
		public btnType3: eui.Button;
		public btnClose: eui.Button;

		private array: eui.ArrayCollection = new eui.ArrayCollection();
		private levels: Array<message.IIKVPairs> = [];
		private tableSkillInfo: { [key: string]: TableLeagueSkill };
		private tableLevel: { [key: string]: TableLevel }
		/**1:攻击型 2：防御型 3：辅助型 */
		private type: number = 1;
		/**技能索引 */
		private skillIndex: number;
		public constructor() {
			super();
			this.skinName = "resource/skins/league/LeagueSkillSkin.exml";

			this.init();
		}

		private init() {

			for (let i = 1; i <= 6; i++) {
				this["imgSkillIcon" + i].mask = this["imgSkillIconbg" + i];
			}
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.btnUpgrade.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUpgrade, this);
			this.btnType1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType1, this);
			this.btnType2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType2, this);
			this.btnType3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnType3, this);
			this.tableSkillInfo = TableLeagueSkill.Table();
			this.tableLevel = TableLevel.Table();
			this.onBtnType1();

		}

		/**点击攻击 */
		private onBtnType1() {
			this.btnType(1);
		}

		/**点击防御 */
		private onBtnType2() {
			this.btnType(2);
		}

		/**点击辅助 */
		private onBtnType3() {
			this.btnType(3);
		}

		/**设置按钮是否选中 */
		private btnType(type: number) {
			let self = this;
			self.setSkillLevelInfo();
			self.type = type;
			for (let j = 1; j <= 3; j++) {
				self["btnType" + j].enabled = true;
			}
			self["btnType" + type].enabled = false;

			let a = [];
			for (let i = 1; i <= 6; i++) {
				self["labelSkillName" + i].text = zj.TextsConfig.TextsConfig_Potato.AttriStr[self.tableSkillInfo[i + (type - 1) * 6].attri_type - 1];
				self["imgSkillIcon" + i].source = self.getimg(self.tableSkillInfo[i + (type - 1) * 6].attri_type);
				self["imgSkillFrame" + i].visible = false;
				self["labelSkillName" + i].strokeColor = 0x000000;   //描边颜色
				self["labelSkillName" + i].stroke = 3;
				let num = 0;
				for (let k = 0; k < self.levels[i + (type - 1) * 6 - 1].value; k++) {
					num += self.tableSkillInfo[i + (type - 1) * 6].attri_value[k];
				}
				let type1 = self.tableSkillInfo[i + (type - 1) * 6].attri_type;
				if (type1 == 24) {
					self["labelSkillElevate" + i].text = "+" + num.toFixed(1);
				} else {
					self["labelSkillElevate" + i].text = "+" + num.toFixed(1) + "%";
				}

				//self.levels[i + (type - 1) * 6 - 1].value >= self.tableLevel[Game.PlayerLeagueSystem.BaseInfo.level].league_skill || self.levels[i + (type - 1) * 6 - 1].value == 0
				if (self.levels[i + (type - 1) * 6 - 1].value <= self.levels[self.getSkill() + (type - 1) * 6].value) {
					Helper.SetImageFilterColor(self["imgSkillIcon" + i], "gray");
					self["imgSkillbg" + i].visible = false;
				} else {
					Helper.SetImageFilterColor(self["imgSkillIcon" + i], null)
					self["imgSkillbg" + i].visible = true;
				}
				let b: [TableLeagueSkill, number] = Table.FindR(a, (k, v) => {
					return v[0] == self.tableSkillInfo[i + (type - 1) * 6].attri_type;
				});
				if (b[0]) {
					a[b[1]][1] += num;
				} else {
					a.push([self.tableSkillInfo[i + (type - 1) * 6].attri_type, num, TextsConfig.TextsConfig_Potato.AttriStr[self.tableSkillInfo[i + (type - 1) * 6].attri_type - 1], type1])
				}
			}
			self.loadList(a);
			let index = self.getSkill();
			self["imgSkillFrame" + (index + 1)].visible = true;

			let n1 = self.tableSkillInfo[(index + 1) + (type - 1) * 6].consume_coin[self.levels[index + (type - 1) * 6].value] || 0;
			let n2 = self.tableSkillInfo[(index + 1) + (type - 1) * 6].consume_money[self.levels[index + (type - 1) * 6].value] || 0
			self.setInfo(n1, n2);
			self.skillIndex = ((index + 1) + (type - 1) * 6);
			self.labelSkillLevel.text = self.levels[index + (type - 1) * 6].value.toString();
		}

		/**设置技能等级信息 */
		private setSkillLevelInfo() {
			let info = Game.PlayerLeagueSystem.Member.skillLevel;
			for (let i = 0; i < 18; i++) {
				let a = Table.FindR(info, (k, v: message.IIKVPairs) => {
					return v.key == (i + 1);
				})[0];
				if (a) {
					this.levels[i] = a;
				} else {
					let a = new message.IIKVPairs();
					a.key = i;
					a.value = 0;
					this.levels[i] = a;
				}
			}
		}

		/**获取第几个技能 */
		private getSkill() {
			let info: Array<message.IIKVPairs> = [];
			for (let i = 0; i < 6; i++) {
				info.push(this.levels[(i + (this.type - 1) * 6)]);
			}
			for (let i = 0; i < info.length; i++) {
				if (i != info.length - 1) {
					if (info[i + 1].value < info[i].value) {
						return (i + 1);
					}
				} else {
					if (info[info.length - 1].value == info[0].value) {
						return 0;
					}
				}
			}
		}

		private loadList(info) {
			this.array.removeAll();
			for (let i = 0; i < info.length; i++) {
				let data = new LeagueSkillItemData();
				data.index = i;
				data.info = info[i];
				data.father = this;
				this.array.addItem(data);
			}
			this.listBonuses.dataProvider = this.array;
			this.listBonuses.itemRenderer = LeagueSkillItem;
		}


		private setInfo(n1: number, n2: number) {
			//公会币消耗数量
			let a = PlayerItemSystem.Str_Resoure(20007);

			this.labelConsortiaGold.text = n1 + "/" + a;
			//金币消耗数量
			let token = Game.PlayerInfoSystem.Coin;
			let text = "";
			if (token > 100000) {
				text = Math.floor((token / 10000) * 10) / 10 + "万";
			} else {
				text = token.toString();
			}
			this.labelGold.text = n2 + "/" + text;
		}

		/**点击升级 */
		private onBtnUpgrade() {

			this.leagueSkillUp(this.skillIndex).then((gameInfo: message.GameInfo) => {
				this.btnType(this.type);
			}).catch(() => {

			})
		}

		/**公会技能升级请求 */
		private leagueSkillUp(type: number): Promise<{}> {
			return new Promise((resolve, reject) => {
				let request = new message.LeagueSkillUpRequest();
				request.body.type = type
				Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
					let response = <message.LeagueSkillUpResponse>resp;
					if (response.header.result != 0) {
						reject(response.header.result);
						return;
					}
					resolve(response.body.gameInfo);
				}, (req: aone.AoneRequest): void => {
					console.log("req:", req);
					reject("timeout");
				}, this, false, false);
			});
		}

		public getimg(type: number) {
			let src = [
				"skill_icon_leiouli04_png",
				"skill_icon_lianji_png",
				"skill_icon_gaofangyu_png", // 3
				"skill_icon_danti_png", // 4
				"效果抵抗",
				"ui_union_skill_icon_baoshang_2_png", // 6
				"x技能暴击",
				"skill_icon_yinda01_png", // 8
				"skill_icon_break_icon_fangyuzengshang_png",
				"格挡率", // 10
				"忽视格挡",
				"忽视防御",
				"x忽视魔防",
				"x终伤附加",
				"x终伤减免",
				"怒气减免",
				"x攻击",
				"x防御",
				"x暴击",
				"x忽视防御",
				"异常抵抗",
				"忽视异常抵抗",
				"浮空抵抗",
				"skill_icon_shuishou01_png", // 24
				"援护怒气",
			]
			return cachekey(src[type - 1], this);
		}

		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}
	}
} 