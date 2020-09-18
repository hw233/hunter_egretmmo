namespace zj {
//DoubleColorPop(投注界面)
//yuqingchao
export class DoubleColorPop extends Dialog {
	private btnClose: eui.Button;
	private lstRed: eui.List;
	private redArr: eui.ArrayCollection;
	private lstBlue: eui.List;
	private blueArr: eui.ArrayCollection;
	private btnOK: eui.Button;					//确定
	public btnViewEnd: eui.Button;				//随机选择
	private groupFruit0: eui.Group;
	private groupFruit1: eui.Group;
	private groupFruit2: eui.Group;
	private groupFruit3: eui.Group;
	private groupFruit4: eui.Group;

	private _my_list_red: Array<DoubleColorPopItem> = [];
	private _my_list_blue: Array<DoubleColorPopItem> = [];
	private _my_bet_fruit: Array<DoubleColorPopItemTop> = [];
	public _my_bet_blue_id = [0, 0, 0, 0];
	public _my_bet_red_id = 0;
	private _my_fruit_red;
	private _my_fruit_blue;
	private myBet = [];
	private father: DoubleColorSence;
	public constructor() {
		super();
		this.skinName = "resource/skins/fishing/DoubleColorPopSkin.exml";
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnOK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.btnViewEnd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnViewEnd, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null)
	}

	public init(father) {
		this.father = father;
		this._my_fruit_red = Game.PlayerItemSystem.GetWonderlandFruitByType(0);
		this._my_fruit_blue = Game.PlayerItemSystem.GetWonderlandFruitByType(1);
		this.initMyBetGroup();
		this.setInfoMyFruitList();

	}

	private initMyBetGroup() {
		for (let i = 0; i < 5; i++) {
			let item = new DoubleColorPopItemTop();
			if (i <= 3) {
				item.setInfo(i, 1, this);
			} else {
				item.setInfo(i, 0, this);
			}
			this[`groupFruit${i}`].addChild(item);
			this.myBet.push(item);
			this._my_bet_fruit.push(item);
		}
	}

	private setInfoMyFruitList() {
		//红球
		this.redArr = new eui.ArrayCollection();
		for (let i = 0; i < this._my_fruit_red.length; i++) {
			this.redArr.addItem({
				id: i,
				info: this._my_fruit_red[i],
				color: 0,
				father: this,
			})
		}
		this.lstRed.dataProvider = this.redArr;
		this.lstRed.itemRenderer = DoubleColorPopItem;


		//蓝球
		this.blueArr = new eui.ArrayCollection();
		for (let i = 0; i < this._my_fruit_blue.length; i++) {
			this.blueArr.addItem({
				id: i,
				info: this._my_fruit_blue[i],
				color: 1,
				father: this,
			})
		}
		this.lstBlue.dataProvider = this.blueArr;
		this.lstBlue.itemRenderer = DoubleColorPopItem;

		setTimeout(() => {
			this.listPush();
		}, 100);

	}
	private listPush() {
		this._my_list_red = [];
		for (let i = 0; i < this._my_fruit_red.length; i++) {
			let item = this.lstRed.getElementAt(i) as DoubleColorPopItem;
			this._my_list_red.push(item);
		}
		this._my_list_blue = [];
		for (let i = 0; i < this._my_fruit_blue.length; i++) {
			let any = this.lstBlue;
			let item = this.lstBlue.getElementAt(i) as DoubleColorPopItem;
			this._my_list_blue.push(item);
		}
	}


	public insertIntoMyBet(id, color) {
		if (id == 0) return;
		if (color == 1) {
			let [cur_list, modify_list] = Game.PlayerDoubleBallSystem.FruitListStateC2hange(this._my_bet_blue_id, id);
				for (let k in modify_list.add) {
					let v = modify_list.add[k];
					this._my_bet_fruit[v.pos].Add(v.id);
				}
				for (let k in modify_list.change) {
					let v = modify_list.change[k];
					if (v.length != 0)
						this._my_bet_fruit[v.pos].Change(v.id);
				}
				let any = this._my_list_blue;
				let [_, kk] = Table.FindR(this._my_list_blue, function (_k, _v) {
					return _v.fruitId == id;
				});
				if (kk != null) {
					this._my_list_blue[kk].MinusNum();
				}
				this._my_bet_blue_id = cur_list;
		} else {
			if (this._my_bet_red_id == 0) {
				this._my_bet_fruit[4].Add(id);
			} else {
				this._my_bet_fruit[4].Change(id)
			}

			let [_, kk_1] = Table.FindR(this._my_list_red, function (_k, _v) {
				return _v.fruitId == id;
			});
			let [__, kk_2] = Table.FindR(this._my_list_red, function (_k, _v) {
				return _v.fruitId == this._my_bet_red_id;
			});

			if (kk_1 != null) {
				this._my_list_red[kk_1].MinusNum();
			}
			if (kk_2 != null) {
				this._my_list_red[kk_1].addNum();
			}
			this._my_bet_red_id = id;
		}
	}

	public DeleteFromMyBet(id, color) {
		if (id == 0) return;
		if (color == 1) {
			let [cur_list, modify_list] = Game.PlayerDoubleBallSystem.FruitListStateDelete(this._my_bet_blue_id, id);
			for (let k in modify_list.delete) {
				let v = modify_list.delete[k];
				this._my_bet_fruit[v.pos].Delete()
			}
			for (let k in modify_list.change) {
				let v = modify_list.change[k];
				this._my_bet_fruit[v.pos].Change(v.id)
			}
			let kk = Table.FindR(this._my_list_blue, function (k, v) {
				return v.fruitId == id;
			})[1];
			if (kk != null) {
				this._my_list_blue[kk].addNum();
			}
			this._my_bet_blue_id = cur_list;
		} else {
			if (this._my_bet_red_id == 0) return;
			if (this._my_bet_red_id == id) {
				this._my_bet_fruit[4].Delete();
			}
			let kk = Table.FindR(this._my_list_red, function (_k, _v) {
				return _v.fruitId == id;
			})[1];
			if (kk != null) {
				this._my_list_red[kk].addNum()
			}
			this._my_bet_red_id = 0;
		}
	}

	public SetBetAni() {
		for (let i = 0; i < 5; i++) {
			if (i == 0) {
				this._my_bet_fruit[4].SetAni(i);
			} else {
				this._my_bet_fruit[i].SetAni(i);
			}
		}
	}

	private onBtnOk() {
		let find_blue = Table.FindF(this._my_bet_blue_id, function (k, v) {
			return v == 0;
		});
		if (!find_blue && this._my_bet_red_id != 0) {
			let redFruit = this._my_bet_red_id;
			let blueFruit = this._my_bet_blue_id;
			Game.PlayerDoubleBallSystem.setRoleLotteryFruit(redFruit, blueFruit)
				.then((data: message.SetRoleFruitInfoResponse) => {
					Game.PlayerDoubleBallSystem.my_id = Game.PlayerDoubleBallSystem.serverFruit(data.body.gameInfo.mixUnitInfo[0].redFruit, data.body.gameInfo.mixUnitInfo[0].blueFruit);
					this.onBtnClose();
					this.father.onAbovePop();
					toast_success(TextsConfig.TextsConfig_Hunter_DoubleColor.bet_succsee);
					this.father.upDate();
					let lastDoubleInfo = this._my_bet_red_id + "&"
					for (let i = 0; i < CommonConfig.double_fruit_blue_number; i++) {
						if (i == CommonConfig.double_fruit_blue_number) {
							lastDoubleInfo = lastDoubleInfo + this._my_bet_blue_id[i]
						} else {
							lastDoubleInfo = lastDoubleInfo + this._my_bet_blue_id[i] + "&";
						}

					}
					Game.PlayerDoubleBallSystem.lastDoubleInfo.doubleInfo = lastDoubleInfo;
					let cur = this.time(Date.parse(Game.Controller.serverNow().toString()) / 100);
					let sec = cur.h * 3600 + cur.m * 60 + cur.s;
					let lastTime = "";
					if (sec <= CommonConfig.double_fruit_bet_time[2]) {
						let curLast = this.time(Date.parse(Game.Controller.serverNow().toString()) / 100 - 86400);
						lastTime = Helper.StringFormat("%4d%02d%02d", curLast.Y, curLast.M, curLast.D)
					}
					else {
						lastTime = Helper.StringFormat("%4d%02d%02d", cur.Y, cur.M, cur.D);
					}
					Game.PlayerDoubleBallSystem.lastDoubleInfo.lastTime = lastTime;
					Game.PlayerDoubleBallSystem.lastDoubleInfo.bPushed = false;
					Game.PlayerDoubleBallSystem.SaveLastDoubleInfo();
				})
		} else {
			toast_warning(TextsConfig.TextsConfig_Hunter_DoubleColor.fruit_not_enough);
		}
	}

	private onBtnViewEnd() {
		let random = Game.PlayerDoubleBallSystem.RandomFruit();
		let minus_index = 3;

		for (let i = 0; i < 5; i++) {
			if (i == 4) {
				this.DeleteFromMyBet(this._my_bet_red_id, 0);
			} else {
				this.DeleteFromMyBet(this._my_bet_blue_id[minus_index], 1);
				minus_index = minus_index - 1;
			}
		}

		for (let k in random) {
			let v = random[k];
			if (Number(k) == 4) {
				this.insertIntoMyBet(random[Number(k)], 0);
			} else {
				this.insertIntoMyBet(random[Number(k)], 1);
			}
		}
		this.SetBetAni();
	}

	private onBtnClose() {
		this.close(UI.HIDE_TO_TOP);
	}
	//时间戳转换为字符串格式
	private time(timestamp: number) {
		let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		let Y = date.getFullYear();
		let M = (date.getMonth() + 1 < 10 ? (date.getMonth() + 1) : date.getMonth() + 1);
		let D = date.getDate();
		let h = date.getHours();
		let m = date.getMinutes();
		let s = date.getSeconds();
		return { Y: Y, M: M, D: D, h: h, m: m, s: s };		//年月日时分秒
	}
}

}