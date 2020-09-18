namespace zj {
//PlayerDoubleBallSystem
//yuqingchao
export class PlayerDoubleBallSystem {
	public constructor() {
	}
	public my_id = [0, 0, 0, 0, 0];
	public public_id = [0, 0, 0, 0, 0];
	// public lastDoubleInfo: Array<message.CustomLastDoubleInfo> = [];					//昨日双色球信息
	private RedNum = 1;
	private BlueNum = 3;
	/**双色球信息 */
	private _lastDoubleInfo: message.CustomLastDoubleInfo = new message.CustomLastDoubleInfo();
	public get lastDoubleInfo() {
		return this._lastDoubleInfo;
	}
	public set lastDoubleInfo(v: message.CustomLastDoubleInfo) {
		this._lastDoubleInfo = v;
	}
	/** 信息 */
	private _LastDoubleInfoMap: Array<message.CustomLastDoubleInfo> = [];
	public get LastDoubleInfoMap() {
		return this._LastDoubleInfoMap;
	}
	public set LastDoubleInfoMap(v: Array<message.CustomLastDoubleInfo>) {
		this._LastDoubleInfoMap = v;
	}

	public init() {
		//初始化
		this.InitLastDoubleInfo(); //双色球初始化
		Game.EventManager.on(GameEvent.NET_SERVER_CONNECTED, this.LoadLastDoubleInfo, this);// 双色球加载
	}

	/**
   * 双色球结果初始化
   */
	private InitLastDoubleInfo() {
		// this.lastDoubleInfo = [];
		let redNum = 1
		let blueNum = CommonConfig.double_fruit_blue_number;
		let initDoubleInfoStr = "";
		for (let i = 0; i < (redNum + blueNum); i++) {
			if (i == 0) {
				initDoubleInfoStr = initDoubleInfoStr + "0";
			} else if (i < 4) {
				initDoubleInfoStr = initDoubleInfoStr + "&0";
			}
		}

		this.lastDoubleInfo.doubleInfo = initDoubleInfoStr;
		this.lastDoubleInfo.lastTime = "0";
		this.lastDoubleInfo.bPushed = false;

	}

	/**
	* 双色球加载
	*/
	private LoadLastDoubleInfo() {
		let msg = Game.Controller.getRoleStorageItem("lastDoubleInfo");
		if (msg == null || msg == undefined || msg.length < 1) {
			return;
		}
		let map = JSON.parse(msg);

		this.lastDoubleInfo.bPushed = map[0].bPushed
		this.lastDoubleInfo.doubleInfo = map[0].doubleInfo
		this.lastDoubleInfo.lastTime = map[0].lastTime

	}


	/**
     * 保存信息
     */
	public SaveLastDoubleInfo() {
		let formatInfo = this.getSaveLastDoubleInfoStreet();
		this.LastDoubleInfoMap.push(formatInfo);
		let msg = JSON.stringify(this.LastDoubleInfoMap);
		Game.Controller.setRoleStorageItem("lastDoubleInfo", msg);
	}

	private getSaveLastDoubleInfoStreet(): message.CustomLastDoubleInfo {
		let msg = new message.CustomLastDoubleInfo();
		msg.doubleInfo = this.lastDoubleInfo.doubleInfo;
		msg.lastTime = this.lastDoubleInfo.lastTime;
		msg.bPushed = this.lastDoubleInfo.bPushed;
		return msg;
	}


	public serverFruit(red, blue) {
		let tbl = [];
		let c_blue = Table.DeepCopy(blue);
		c_blue.sort((a, b) => {
			return a - b;
		});
		for (let i = 0; i < 4; i++) {
			if (c_blue[i]) {
				tbl.push(c_blue[i]);
			} else {
				tbl.push(0);
			}
		}
		tbl.push(red);
		return tbl;
	}
	public fruitId(id) {
		return id % 100;
	}
	/**
	 * 果子颜色
	 * */
	private fruitColor(id) {
		let color =  Math.floor((id % 1000)/100) // id % 1000 >= 100 ? 1 : 0;
		return color;
	}
	/**
	 * 根据颜色查找果子
	 * */
	public findFruitByColor(list, color) {
		let colorList = [];
		for (let k in list) {
			let v = list[k];
			if (this.fruitColor(v) == color) {
				colorList.push(v);
			}
		}
		return this.sortById(colorList);
	}
	private sortById(list) {
		let newTbl = Table.DeepCopy(list);
		let soretByValue = (a, b) => {
			return a > b;
		}
		newTbl.sort(soretByValue);
		return newTbl;
	}
	/**
	 * 投注情况对应奖励
	 * */
	public betReward(my, win) {
		let c_my = Table.DeepCopy(my);
		let c_win = Table.DeepCopy(win);
		let inn = [];
		let point = 0;
		let size = 0;
		//每个位置是否中奖
		let is_lottory = [];
		for (let k in c_my) {
			let v = c_my[k];
			inn.push(v);
			point = point + 1;
			size = size + 1;
			let find = Table.FindF(c_win, function (_k, _v) {
				return _v = v;
			});
			if (!find) {
				//非中奖果子
				let ann = inn;
				let num = point - 1;
				inn.splice(num, 1);
				point = point - 1;
				size = size - 1;
				is_lottory.push(false);
			} else {
				is_lottory.push(true);
			}
		}
		if (Object.keys(inn).length == 1) {
			inn = this.findFruitByColor(inn, 0);
		}
		return [inn, is_lottory];
	};

	/**
	 * 红蓝混色按照4蓝1红排序
	 * */
	private SortByIdAndColor(list) {
		let sortByValue = (a, b) => {
			if (this.fruitColor(a) == this.fruitColor(b)) {
				return a - b;
			} else {
				return this.fruitColor(b) - this.fruitColor(a);
			}
		}
		list.sort(sortByValue);
		return list;
	}

	/**
	 * 是否有资格下注
	 * */
	public canPour() {
		let blue_num = 0
		let red_num = 0
		let fruits = Game.PlayerItemSystem.getWonderlandFruits();
		for (let k in fruits) {
			let v = fruits[k];
			if (this.fruitColor(v) == 0) {
				red_num = red_num + 1;
			} else if (this.fruitColor(v) == 1) {
				blue_num = blue_num + 1
			}
			if (blue_num > this.BlueNum && red_num >= this.RedNum) {
				return true;
			}
		}
		return false;
	}
	/**
	 *单个插入，修改原有队列 
	*/
	public FruitListStateC2hange(pre_list, id): [any, any] {
		let any = pre_list;
		if (pre_list[this.BlueNum] != 0) return [any, -1];
		let modify_list = {
			add: [],
			delete: [],
			change: [],
		};
		let cur_list = [];
		let cur_list_copy = Table.DeepCopy(pre_list);
		cur_list_copy.push(id);
		for (let k in cur_list_copy) {
			let v = cur_list_copy[k];
			if (v != 0) {
				cur_list.push(v);
			}
		}
		cur_list = this.sortById(cur_list);
		for (let i = 0; i < 4; i++) {
			if (cur_list[i] == null) {
				cur_list.push(0);
			}
		}
		for (let k in cur_list) {
			let v = cur_list[k];
			if (pre_list[k] == 0 && v != 0) {
				let tbl = {
					pos: k,
					id: v,
				};
				modify_list.add.push(tbl);
			} else if (pre_list[k] != v) {
				let tbl = {
					pos: k,
					id: v,
				};
				modify_list.change.push(tbl);
			}
		}
		return [cur_list, modify_list]
	}

	/**
	 * 单个删除，修改原有队列 
	 * */
	public FruitListStateDelete(pre_list, id): [any, any] {
		if (id == 0) return;

		let modify_list = {
			add: [],
			delete: [],
			change: [],
		}
		let cur_list = Table.DeepCopy(pre_list)
		let find_k = Table.FindR(cur_list, function (_k, _v) {
			return _v == id;
		})[1];
		if (find_k != null) {
			cur_list.splice(find_k, 1);
			cur_list.push(0);
		}

		for (let k in pre_list) {
			let v = pre_list[k];
			if (cur_list[k] == 0 && v != 0) {
				let tbl = {
					pos: k,
					id: v,
				}
				modify_list.delete.push(tbl);
			} else if (cur_list[k] != v) {
				let tbl = {
					pos: k,
					id: cur_list[k],
				};
				modify_list.change.push(tbl);
			} else {

			}
		}
		return [cur_list, modify_list];
	}

	/**
	 * 随机果子
	 * */
	public RandomFruit() {
		let per = 80;
		let is_whole_random = Math.random() * 100 < per;
		let fruits = Game.PlayerItemSystem.getWonderlandFruits();
		let randomList = [0, 0, 0, 0, 0];
		let redList = [];
		let blueList = [];
		let blueMoreTen = [];

		for (let k in fruits) {
			let v = fruits[k];
			if (this.fruitColor(v) == 0) {
				redList.push(v);
			} else if (this.fruitColor(v) == 1) {
				blueList.push(v);
				if (this.fruitId(v) >= 10) {
					//蓝色编号大于10
					blueMoreTen.push(v);
				}
			}
		}
		let num = Math.round(Math.random() * (redList.length - 1));
		randomList[4] = redList[num];
		if (is_whole_random) {
			//全随机
			for (let i = 0; i < 4; i++) {
				let any = blueList.length;
				let random_k = Math.round(Math.random() * (blueList.length - 1));
				randomList[i] = blueList[random_k];
				blueList.splice(random_k, 1);
			}
		} else {
			//概率随机
			for (let i = 0; i < 4; i++) {
				if (i == 0) {
					if (blueMoreTen.length != 0) {
						let blueFrist = blueMoreTen[Math.round(Math.random() * (blueMoreTen.length - 1))];
						let kk = Table.FindR(blueList, function (k, v) {
							return v == blueFrist;
						})[1];
						if (kk != null) {
							randomList[i] = blueList[kk];
							blueList.splice(kk, 1);
						}
					} else {
						let random_k = Math.round(Math.random() * (blueList.length - 1));
						randomList[i] = blueList[random_k];
						blueList.splice(random_k, 1);
					}
				} else {
					let random_k = Math.round(Math.random() * (blueList.length - 1));
					randomList[i] = blueList[random_k];
					blueList.splice(random_k, 1);
				}
			}
		}
		let any = randomList;
		return this.SortByIdAndColor((randomList));
	}

	//网络协议
	//下注
	public setRoleLotteryFruit(redFruit: number, blueFruit: Array<number>): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.SetRoleLotteryFruitRequest();
			request.body.redFruit = redFruit;
			request.body.blueFruit = blueFruit;
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.SetRoleFruitInfoResponse>resp;
				console.log(response);
				if (response.header.result != 0) {
					toast_warning(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve(response);
				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false, true);
			return;
		});
	}
	//
	public GetLotteryFruitInfoReqBody_Visit = () => {
		return new Promise((resolve, reject) => {
			let request = new message.GetLotteryFruitInfoRequest();
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.GetLotteryFruitInfoResponse>resp;
				console.log(response);
				if (response.header.result != 0 && response.header.result != message.EC.XG_LACK_TOKEN && response.header.result != message.EC.XG_LACK_PROMISE) {
					toast_warning(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve(response);
				return;
			}, (req: aone.AoneRequest): void => {
				reject(LANG("请求超时"));
				return;
			}, this, false, true);
			return;
		});
	}

}

/**
 * 其他存储
 */
export class LastDoubleInfoMap {
	units: Array<message.CustomLastDoubleInfo> = [];
}
}