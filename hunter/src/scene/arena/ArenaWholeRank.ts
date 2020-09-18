namespace zj {
	/** 
	 * @author 
	 * 
	 * @date 2019-1-29
	 * 
	 * @class 跨服排行界面
	 */
	const enum enumArenaWholeRankType {
		/**今日排名 */
		todayRanking = 1,
		/**昨日排名 */
		yesterdayRanking = 2,
		/**天下第一 */
		worldFirst = 3,
		/**世界精英 */
		worldElite = 4,
	}
	export class ArenaWholeRank extends Dialog {
		private groupMain: eui.Group;
		private btnDayRank: eui.Button;
		private btnOneSelf: eui.Button;
		private btnOne: eui.Button;
		private btnEachServer: eui.Button;
		private btnClose: eui.Button;
		/**天下第一组 */
		private GroupFirst: eui.Group;
		private imgBoard1: eui.Image;
		private imgIcon1: eui.Image;
		private labelPlayerName1: eui.Label;
		private labelPlayerQu1: eui.Label;
		private labelPlayerJiFen1: eui.Label;
		private imgBoard3: eui.Image;
		private imgIcon3: eui.Image;
		private labelPlayerName3: eui.Label;
		private labelPlayerQu3: eui.Label;
		private labelPlayerJiFen3: eui.Label;
		private imgBoard2: eui.Image;
		private imgIcon2: eui.Image;
		private labelPlayerName2: eui.Label;
		private labelPlayerQu2: eui.Label;
		private labelPlayerJiFen2: eui.Label;
		/**今日与昨日排名组 */
		private GroupRanking: eui.Group;
		private labelChangehao: eui.Label;
		private labelJiFen: eui.Label;
		private labelGrade: eui.Label;
		private labelQu: eui.Label;
		private labelPlayerName: eui.Label;
		private labelRank: eui.Label;
		private imgTitle: eui.Image;
		private listRank: eui.List;
		private iconGroup: eui.Image;
		private iconNum: eui.Image;
		/**世界精英组 */
		private groupWorldElite: eui.Group;
		private group1: eui.Group
		private listScroller: eui.Scroller;
		private imgTip: eui.Image;
		public type: number;
		private father: ArenaWhole;
		private list = [];
		/**list数据源 */
		private array = new eui.ArrayCollection();
		public constructor() {
			super();
			this.skinName = "resource/skins/arena/ArenaWholeRankSkin.exml";
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
				this.father = null;
			}, null);
			this.init();

		}
		private init() {
			let tap = egret.TouchEvent.TOUCH_TAP;
			this.btnClose.addEventListener(tap, this.onBtnClose, this);
			this.btnDayRank.addEventListener(tap, this.onBtnDayRank, this);
			this.btnOneSelf.addEventListener(tap, this.onBtnOneSelf, this);
			this.btnOne.addEventListener(tap, this.onBtnOne, this);
			this.btnEachServer.addEventListener(tap, this.onBtnEachServer, this);

			this.onBtnDayRank();
		}

		public setInfo(father: ArenaWhole, type: number) {
			if (type == 1) {
				this.group1.visible = false;
				this.GroupFirst.visible = false;
				this.groupWorldElite.visible = false;
			}
			this.father = father;
		}

		/**今日排名 */
		private onBtnDayRank() {
			if (this.type == enumArenaWholeRankType.todayRanking) { return };
			this.type = enumArenaWholeRankType.todayRanking;
			this.btnColour();
			Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamSel_png", );//将按钮颜色变亮 
			this.GroupRanking.visible = true;
			this.req(4);
			this.listScroller.visible = true;
		}

		/**昨日排名 */
		private onBtnOneSelf() {
			if (this.type == enumArenaWholeRankType.yesterdayRanking) { return };
			this.type = enumArenaWholeRankType.yesterdayRanking;
			this.btnColour();
			Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonNumTeamSel_png", );//将按钮颜色变亮 
			this.GroupRanking.visible = true;
			this.req(2);
			this.listScroller.visible = true;
		}

		/**天下第一 */
		private onBtnOne() {
			if (this.type == enumArenaWholeRankType.worldFirst) { return };
			this.type = enumArenaWholeRankType.worldFirst;
			this.btnColour();
			Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonNumTeamSel_png", );//将按钮颜色变亮 
			this.GroupFirst.visible = true;
			this.listScroller.visible = false;
			this.req(3);


		}

		/**世界精英 */
		private onBtnEachServer() {
			if (this.type == enumArenaWholeRankType.worldElite) { return };
			this.type = enumArenaWholeRankType.worldElite;
			this.btnColour();
			Set.ButtonBackgroud(this.btnEachServer, "ui_arena_ButtonWordBossSel_png", );//将按钮颜色变亮 
			this.groupWorldElite.visible = true;
			this.listScroller.visible = true;
			this.eachServerRankReq();

		}

		/**世界精英的协议 */
		private eachServerRankReq() {
			Game.PlayerArenaSystem.craftElitesRankList()
				.then((roles) => {
					this.list = [];
					let data = this.setEathServerItems(roles);
					this.list = Table.DeepCopy(data);
					this.loadWorldList();
				})
				.catch((reason) => {
					toast(reason);
				})
		}

		private setEathServerItems(item) {
			let msg = [];
			for (var k in item) {
				if (item.hasOwnProperty(k)) {
					var v = item[k];
					for (var kk in v.group_name) {
						if (v.group_name.hasOwnProperty(kk)) {
							var vv = v.group_name[kk];
							let serverId = singLecraft.decodeGroupName(vv, "&", false);
							let serverName = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(vv, "&", false), singLecraft.decodeGroupName(vv, "&", true))
							let serverData = {};
							for (let i = 0; i < 3; i++) {
								if (v.roles[i] != 0 && v.roles[i] != null) {
									serverData[v.roles[i].craft_rank_self] = v.roles[i];
								} else {
									Object.keys(serverData).push("0");
								}
							}
							msg.push({ serverId, serverName, serverData });
						}
					}
				}
			}
			Table.Sort(msg, function (a, b) {
				a[0].toString < b[0].toStrimg;
			})
			return msg;
		}

		/**将所有按钮颜色变暗所有组隐藏 */
		private btnColour() {
			Set.ButtonBackgroud(this.btnDayRank, "ui_arena_ButtonNumTeamNor_png", );
			Set.ButtonBackgroud(this.btnOneSelf, "ui_arena_ButtonNumTeamNor_png", );
			Set.ButtonBackgroud(this.btnOne, "ui_arena_ButtonNumTeamNor_png", );
			Set.ButtonBackgroud(this.btnEachServer, "ui_arena_ButtonWordBossNor_png", );
			this.GroupFirst.visible = false;
			this.GroupRanking.visible = false;
			this.groupWorldElite.visible = false;
			this.imgTip.source = cachekey(UIConfig.UIConfig_Pk.tips[this.type], this);
		}

		/**关闭弹窗*/
		private onBtnClose() {
			this.close(UI.HIDE_TO_TOP);
		}

		/**加载天下第一页信息 */
		private oneSetInfo() {
			let table = [];
			for (let i = 1; i <= 3; i++) {
				let tbl = {};
				for (let k in this.list) {
					if (this.list.hasOwnProperty(k)) {
						let v = this.list[k];
						if (v.craft_rank == i) {
							tbl = v;
							break;
						}
					}
				}
				table.push(tbl);
			}
			for (let i = 0; i < 3; i++) {
				if (table[i] != null) {
					let groupName = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(table[i].group_name, "&", false), singLecraft.decodeGroupName(table[i].group_name, "&", true))

					let path = PlayerItemSystem.ItemPath(table[i].pic);
					this["imgIcon" + (i + 1)].source = cachekey(path, this);
					this["labelPlayerName" + (i + 1)].text = table[i].role_name;
					this["labelPlayerQu" + (i + 1)].text = groupName;
					this["labelPlayerJiFen" + (i + 1)].text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.battlePoints, table[i].craft_score);
				} else {
					let path = PlayerItemSystem.ItemPath(140001);
					this["imgIcon" + (i + 1)].source = cachekey(path, this);
					this["labelPlayerName" + (i + 1)].text = TextsConfig.TextsConfig_Pk.norank.name;
					this["labelPlayerQu" + (i + 1)].text = TextsConfig.TextsConfig_Pk.norank.qu;
					this["labelPlayerJiFen" + (i + 1)].text = TextsConfig.TextsConfig_Pk.norank.score;
				}
			}
		}

		private decodeGroupName(str, strchar, bafather) {
			if (str == null) {
				return;
			}
			// let jsonstr = Helper.d
		}

		private req(type: number) {
			Game.PlayerArenaSystem.craftRankList(type - 1)
				.then((roles: Array<message.CraftRoleInfo>) => {
					this.list = [];
					this.list = Table.DeepCopy(roles);

					if (type == 3) {
						this.oneSetInfo();
					} else {
						this.loadList();
					}

				})
				.catch((reason) => {
					toast(reason);
				})
		}

		private loadList() {
			let score = (this.father.myInfo.craft_score != null) ? this.father.myInfo.craft_score : -1;
			let title = (this.father.myInfo.titleId != null) ? this.father.myInfo.titleId : 160001;
			let level = (score == -1) ? 0 : (singLecraft.GetLevel(score) - 1);
			let groupStr = (this.father.myInfo.groupName != null) ? this.father.myInfo.groupName : Device.gameserver.name;

			let titleName = TableItemTitle.Item(title).name;
			let titlelogo = TableItemTitle.Item(title).logo;
			let strRank = "";
			if (this.type == 1 || this.type == 2) {
				if (this.father.myInfo.craft_rank != null) {
					strRank = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.order, this.father.myInfo.craft_rank);
				} else {
					strRank = TextsConfig.TextsConfig_Pk.norank.rank;
				}
			} else {

			}

			let strLevel = (this.type == 1 && level != 0) ? Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.level, TextsConfig.TextsConfig_Common.numCH[Number(level) - 1]) : TextsConfig.TextsConfig_Pk.norank.level;

			let strScore = (this.type == 1 && score != -1) ? Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.score, score) : TextsConfig.TextsConfig_Pk.norank.score;

			this.labelChangehao.visible = (title == 160001);
			this.imgTitle.visible = (title != 160001);
			if (title != 160001) {
				this.imgTitle.source = cachekey(titlelogo, this);
			}
			this.labelRank.text = strRank;
			this.labelPlayerName.text = Game.PlayerInfoSystem.BaseInfo.name;
			this.labelQu.text = groupStr;
			this.labelGrade.text = strLevel;
			this.labelJiFen.text = strScore;
			this.labelChangehao.text = titleName;
			this.iconGroup.source = cachekey(UIConfig.UIConfig_Pk.Grade[this.type], this);
			this.iconNum.source = cachekey(UIConfig.UIConfig_Pk.Num[this.type], this);

			Table.Sort(this.list, function (a, b) { return a.craft_self < b.craft_rank });

			let myInfo = [];
			for (var k in this.list) {
				if (this.list.hasOwnProperty(k)) {
					var v = this.list[k];
					if (v.role_id == Game.PlayerInfoSystem.BaseInfo.id) {
						myInfo.push(v);
					}
				}
			}
			// setInfoMyInfo();
			let a = () => {

				let level = singLecraft.GetLevel(myInfo[0].craft_score);
				let levelStr = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.level, TextsConfig.TextsConfig_Common.numCH[level - 1] || 0);
				let groupStr = "";
				if (myInfo[0].group_name != "") {
					groupStr = Helper.StringFormat(TextsConfig.TextsConfig_Login.serverDesSimple, singLecraft.decodeGroupName(myInfo[0].group_name, "&", false),
						singLecraft.decodeGroupName(myInfo[0].group_name, "&", true));
				}
				if (this.type == 1 || this.type == 2) {
					this.labelRank.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.order, myInfo[0].craft_rank);
				}
				this.labelPlayerName.text = myInfo[0].role_name;
				this.labelQu.text = groupStr;
				this.labelGrade.text = levelStr;
				this.labelJiFen.text = Helper.StringFormat(TextsConfig.TextsConfig_Pk.rank.score, myInfo[0].craft_score);
				if (myInfo[0].title_id == 0) {
					this.labelChangehao.text = TextsConfig.TextsConfig_Pk.rank.noTitile;
					this.imgTitle.visible = false;
				} else {
					this.labelChangehao.visible = myInfo[0].title_id == 160001;
					this.imgTitle.visible = myInfo[0].title_id != 160001;
					let name = TableItemTitle.Item(myInfo[0].title_id).name;
					let logo = TableItemTitle.Item(myInfo[0].title_id).logo;
					this.labelChangehao.text = name;
					if (myInfo[0].title_id != 160001) {
						this.imgTitle.source = cachekey(logo, this);
					}
				}

			}
			if (myInfo.length > 0) { a(); };

			let b = () => {
				let canMove = Object.keys(this.list).length > 6;
				let num = Object.keys(this.list).length > 100 && 100 || Object.keys(this.list).length;
				egret.Tween.get(this.listRank).to({ alpha: 0 }, 100).call(() => {
					this.listScroller.stopAnimation();
					this.listRank.scrollV = 0;
					this.array.removeAll(); // this.alpha
					// this.listScroller
					for (let i = 0; i < num; i++) {
						let data = new ArenaWholeRankPlayerItemData();
						data.index = i;
						data.info = this.list[i];
						data.father = this;
						this.array.addItem(data);
					}
					this.listRank.dataProvider = this.array;
					this.listRank.itemRenderer = ArenaWholeRankPlayerItem;
					this.listRank.scrollV = 0;
				}).to({ alpha: 1 }, 200);

			}
			b();

		}

		/**加载世界list */
		private loadWorldList() {
			let canMove = Object.keys(this.list).length > 6;
			this.array.removeAll();
			for (let i = 0; i < Object.keys(this.list).length; i++) {
				let data = new ArenaWholeRankPlayerSelfItemData();
				data.index = i;
				data.info = this.list[i];
				this.array.addItem(data);
			}
			this.listRank.dataProvider = this.array;
			this.listRank.itemRenderer = ArenaWholeRankPlayerSelfItem;
		}
	}

}