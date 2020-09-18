namespace zj {
// 公会-公会排行榜
// lizhengqiang
// 20181227
export class LeagueRankingListNew extends Dialog {
	private groupTitle: eui.Group;
	private scrollerLeagueRanking: eui.Scroller;
	private lstLeagueRanking: eui.List;
	private groupMyUnion: eui.Group;
	private lbLeagueNo: eui.Label;
	private lbLeagueName: eui.Label;
	private lbLeagueLevel: eui.Label;
	private lbMemberNum: eui.Label;
	private imgStar: eui.Image;
	private lbLeaderStrength: eui.Label;
	private lbLeaderName: eui.Label;
	private lbMyUnion: eui.Label;
	private groupSort: eui.Group;
	private btnUnionLevel: eui.Button;
	private btnUnionRank: eui.Button;
	private btnUnionStrength: eui.Button;
	private btnUnionSort: eui.Button;
	private btnClose: eui.Button;

	private arrCollection: eui.ArrayCollection;
	private arrLeagueBase: message.LeagueBase[] = [];
	private rankType: number = message.ELeagueRankType.RANK_TYPE_LEVEL; // 公会排行类型（1：按等级RANK_TYPE_LEVEL，2：按总战力RANK_TYPE_POWER，3：按段位RANK_TYPE_DAN）
	private myLeagueRank: number = 0; // 本公会排名
	private isOpen: boolean = false;

	private start: number = 0;
	private numEach: number = 20;

	public constructor() {
		super();
		this.skinName = "resource/skins/league/LeagueRankingListNewSkin.exml";
		this.scrollerLeagueRanking.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerEnd, this);
		this.btnUnionLevel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnionLevel, this);
		this.btnUnionRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnionRank, this);
		this.btnUnionStrength.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnionStrength, this);
		this.btnUnionSort.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnUnionSort, this);
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);

		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

		this.init();
	}

	public init() {
		this.groupSort.visible = false;

		this.rankInfo();
	}

	private rankInfo() {
		this.start = 0;
		this.arrLeagueBase = [];
		Game.PlayerLeagueSystem.leagueRankInfo(this.rankType, this.start, this.numEach).then((resp: message.LeagueRankInfoResponse) => {
			// if (resp.body.info.length == 0) {
			// 	toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
			// }
			this.start = this.start + resp.body.info.length;
			this.arrLeagueBase = this.arrLeagueBase.concat(resp.body.info);
			this.myLeagueRank = resp.body.league_rank;
			this.loadList();
			this.setMyleagueInfo();
		});
	}

	private setMyleagueInfo() {
		if (Game.PlayerInfoSystem.LeagueId == 0) {
			this.groupMyUnion.visible = false;
			this.lbMyUnion.visible = true;
		} else {
			let info = Game.PlayerLeagueSystem.BaseInfo;
			// 排名
			if (this.myLeagueRank == 0) {
				this.lbLeagueNo.text = TextsConfig.TextsConfig_Rank.noRank;
			} else {
				this.lbLeagueNo.text = this.myLeagueRank.toString();
			}
			// 公会名称
			this.lbLeagueName.text = info.name;
			// 等级
			this.lbLeagueLevel.text = info.level.toString();
			// 人数
			this.lbMemberNum.text = Helper.StringFormat(TextsConfig.TextConfig_League.memberDesRank, info.curNum, TableLevel.Item(info.level).league_people);
			if (info.curNum >= TableLevel.Item(info.level).league_people) {
				this.lbMemberNum.textColor = ConstantConfig_Common.Color.red;
			}
			// 段位
			let starPath = PlayerLeagueSystem.GetSegment(info.match_score)[4];
			if (starPath != "") {
				this.imgStar.source = cachekey(starPath, this);
			} else {
				this.imgStar.visible = false;
			}
			// 总战力
			this.lbLeaderStrength.text = (Math.floor(info.battle_value / 10000)).toString() + "万";
			// 会长
			this.lbLeaderName.text = info.leaderName;
		}
	}

	private loadList() {
		this.arrCollection = new eui.ArrayCollection();
		let rankNo: number = 1;
		for (let v of this.arrLeagueBase) {
			this.arrCollection.addItem({ "rankNo": rankNo, "leagueBase": v, "father": this });
			rankNo += 1;
		}
		this.lstLeagueRanking.itemRenderer = LeagueRankingListItemNewIR;
		this.lstLeagueRanking.dataProvider = this.arrCollection;
	}

	private onScrollerEnd() {
		if (this.lstLeagueRanking.scrollV + this.scrollerLeagueRanking.height >= this.lstLeagueRanking.contentHeight) {
			if (this.arrLeagueBase.length < 100) {
				Game.PlayerLeagueSystem.leagueRankInfo(this.rankType, this.start, this.numEach).then((resp: message.LeagueRankInfoResponse) => {
					if (resp.body.info.length == 0) {
						// toast_warning(LANG(TextsConfig.TextsConfig_Common.srhsNone));
						return;
					}

					this.start = this.start + resp.body.info.length;
					this.arrLeagueBase = this.arrLeagueBase.concat(resp.body.info);

					let arrCollection = new eui.ArrayCollection();
					let rankNo: number = 1;
					for (let v of this.arrLeagueBase) {
						arrCollection.addItem({ "rankNo": rankNo, "leagueBase": v, "father": this });
						rankNo += 1;
					}

					if (arrCollection.source.length == 0) return;
					this.arrCollection.replaceAll(arrCollection.source);
				});
			}
		}
	}

	// 排序选项展开
	private sortAnimationOpen() {
		egret.Tween.get(this.groupSort)
			.call(() => { this.isOpen = true; this.groupSort.visible = true; })
			.to({ scaleY: 1 }, 500, egret.Ease.backOut);
	}

	// 排序选项关闭
	private sortAnimationClose() {
		egret.Tween.get(this.groupSort)
			.to({ scaleY: 0.2 }, 400, egret.Ease.backIn)
			.call(() => { this.isOpen = false; this.groupSort.visible = false; });
	}

	// 按钮换肤
	private changeButtonSkin(type: number) {
		let index = type * 2 - 2;
		let arrIcon = [
			"ui_union_rankinglist_ButtonUnionLevelSortNor_png",
			"ui_union_rankinglist_ButtonUnionLevelSortSel_png",
			"ui_union_rankinglist_ButtonUnionZhanliSortNor_png",
			"ui_union_rankinglist_ButtonUnionZhanliSortSel_png",
			"ui_union_rankinglist_ButtonUnionRankSortNor_png",
			"ui_union_rankinglist_ButtonUnionRankSortSel_png",
		];
		if (index < 0 && index + 1 > arrIcon.length) return;

		// 正常
		let image: eui.Image = <eui.Image>this.btnUnionSort.getChildAt(0);
		image.source = cachekey(arrIcon[index], this);

		// 按下 
		if (this.btnUnionSort.skin == null && this.btnUnionSort.skin.states == null && this.btnUnionSort.skin.states[1].overrides.length < 1) return;
		let property: eui.SetProperty = <eui.SetProperty>this.btnUnionSort.skin.states[1].overrides[0];
		if (property.name == "source") {
			property.value = arrIcon[index + 1];
		}
	}

	// 按等级
	private onBtnUnionLevel() {
		this.sortAnimationClose();
		if (this.rankType == message.ELeagueRankType.RANK_TYPE_LEVEL) return;
		this.rankType = message.ELeagueRankType.RANK_TYPE_LEVEL;
		this.changeButtonSkin(this.rankType);
		this.rankInfo();
	}

	// 按段位
	private onBtnUnionRank() {
		this.sortAnimationClose();
		if (this.rankType == message.ELeagueRankType.RANK_TYPE_DAN) return;
		this.rankType = message.ELeagueRankType.RANK_TYPE_DAN;
		this.changeButtonSkin(this.rankType);
		this.rankInfo();
	}


	// 按总战力
	private onBtnUnionStrength() {
		this.sortAnimationClose();
		if (this.rankType == message.ELeagueRankType.RANK_TYPE_POWER) return;
		this.rankType = message.ELeagueRankType.RANK_TYPE_POWER;
		this.changeButtonSkin(this.rankType);
		this.rankInfo();
	}

	// 当前公会排序
	private onBtnUnionSort() {
		if (this.isOpen) {
			this.sortAnimationClose();
		} else {
			this.sortAnimationOpen();
		}

		this.isOpen = !this.isOpen;
	}

	private onClose(e: egret.TouchEvent) {
		let groupSortWorld = this.groupSort.localToGlobal();
		groupSortWorld.x -= Game.UIManager.x;
		let groupSortRect = new egret.Rectangle(groupSortWorld.x, groupSortWorld.y, this.groupSort.width, this.groupSort.height);

		if (groupSortRect.contains(e.stageX, e.stageY) == false && this.isOpen) {
			this.sortAnimationClose();
		}

		let tmp = this.getChildByName("Chat_UserPopB");
		if (tmp) {
			let world = tmp["groupAdaptBoard"].localToGlobal();
			world.x -= Game.UIManager.x;
			let rect = new egret.Rectangle(world.x, world.y, tmp["groupAdaptBoard"].width, tmp["groupAdaptBoard"].height);

			if (rect.contains(e.stageX, e.stageY) == false) {
				this.removeChild(tmp);
			}
		}
	}

	public managePop(msg: message.RoleInfoZip, point: egret.Point) {
		let tmp = this.getChildByName("Chat_UserPopB");
		if (tmp) this.removeChild(tmp);

		let pop = new Chat_UserPopB();
		pop.name = "Chat_UserPopB";
		pop.setMsgInfo(msg);
		pop.y = point.y - pop.height / 2 + 10;
		pop.horizontalCenter = 0;
		this.addChild(pop);
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
}

}