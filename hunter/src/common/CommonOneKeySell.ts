namespace zj {
/** 
 * @author xing li wei
 * 
 * @date 2019-5-24
 * 
 * @class 贪婪之岛包裹
 */
export class CommonOneKeySell extends Dialog {
	public LabelTips: eui.Label;
	public labelFruitTips: eui.Label;
	public groupRes: eui.Group;
	public imgCost: eui.Image;
	public labelCose: eui.Label;
	public btnClose: eui.Button;
	public btnConfirm: eui.Button;
	public listViewItem: eui.List;

	private type: number;
	private res;
	private fruitMax: number = 100;
	private goods: Array<message.GoodsInfo>;
	private cost: number = 0;
	private cb: Function;
	private function: Function;
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonOneKeySellSkin.exml";
		this.init();
	}

	private init() {
		this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
		this.btnConfirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnConfirm, this);
	}

	public SetInfo(type, cb) {
		this.type = type;
		this.cb = cb;
		this.SetInfoSell();
		if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
			this.function = (getGoods) => {
				this.SetInfoSell()
			}
		}
	}

	public SetInfoSell() {
		if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
			this.LabelTips.text = (TextsConfig.TextsConfig_Common.one_key_fruit_tips)
			this.labelFruitTips.text = (TextsConfig.TextsConfig_Common.one_key_fruit_nor)
		}

		else if (this.type == TableEnum.Enum.OneKeySell.Demon) {
			this.LabelTips.text = (TextsConfig.TextsConfig_Common.one_key_demon_tips)
			this.labelFruitTips.text = (TextsConfig.TextsConfig_Common.one_key_demon_nor)
		}

		else if (this.type == TableEnum.Enum.OneKeySell.Rogue) {
			this.LabelTips.text = (TextsConfig.TextsConfig_Common.one_key_nor_tips)
			this.labelFruitTips.text = (TextsConfig.TextsConfig_Common.one_key_rogue_nor)
		} else {
			this.LabelTips.text = (TextsConfig.TextsConfig_Common.one_key_nor_tips)
		}



		this.labelFruitTips.visible = (this.type == TableEnum.Enum.OneKeySell.Fruit || this.type == TableEnum.Enum.OneKeySell.Demon || this.type == TableEnum.Enum.OneKeySell.Rogue)
		this.groupRes.visible = (this.type != TableEnum.Enum.OneKeySell.Fruit && this.type != TableEnum.Enum.OneKeySell.Demon && this.type != TableEnum.Enum.OneKeySell.Rogue)

		//set prop
		let props = {}
		if (this.type == TableEnum.Enum.OneKeySell.MONEY) {
			props = TableEnum.Enum.PropMoney
		} else if (this.type == TableEnum.Enum.OneKeySell.CRYSTAL) {
			props = TableEnum.Enum.PropCRYSTAL
		} else if (this.type == TableEnum.Enum.OneKeySell.Qi) {
			props = TableEnum.Enum.PropQi
		} else if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
			props = Game.PlayerItemSystem.GetWonderlandFruit()
		} else if (this.type == TableEnum.Enum.OneKeySell.Demon) {
			props = Game.PlayerItemSystem.GetWonderlandDemon()
		} else if (this.type == TableEnum.Enum.OneKeySell.Rogue) {
			props = Game.PlayerItemSystem.GetWonderlandRogue()
		}

		let item_count = 0
		//set goods
		let _goods = []

		for (let k in props) {
			if (props.hasOwnProperty(k)) {
				let v = props[k];
				if (Game.PlayerCardSystem.goodsMap[v].count != 0) {
					item_count = item_count + Game.PlayerCardSystem.goodsMap[v].count;
					if (item_count > this.fruitMax && this.type == TableEnum.Enum.OneKeySell.Fruit) {
						this.labelFruitTips.text = (TextsConfig.TextsConfig_Common.one_key_fruit_max);
						if (Game.PlayerCardSystem.goodsMap[v].count - (item_count - this.fruitMax) == 0) {
							break
						} else {
							let goods = new message.GoodsInfo();
							goods.goodsId = v
							goods.count = Game.PlayerCardSystem.goodsMap[v].count - (item_count - this.fruitMax)
							goods.index = 0
							goods.showType = 0
							_goods.push(goods)
						}

					}
					let goods = new message.GoodsInfo();
					goods.goodsId = v
					goods.count = Game.PlayerCardSystem.goodsMap[v].count
					goods.index = 0
					goods.showType = 0
					_goods.push(goods)
				}
			}
		}

		this.goods = _goods
		//fix goods
		let lc_tbl = Table.DeepCopy(this.goods) as any
		let fix = PlayerItemSystem.FixCount(this.goods.length, 4, 1)
		for (let i = 0; i < fix; i++) {
			lc_tbl.push(0)
		}

		// set list
		let array = new eui.ArrayCollection();
		for (let i = 0; i < lc_tbl.length; i++) {
			let data = new CommonOneKeySellItemData();
			data.goods = lc_tbl[i];
			array.addItem(data);
		}
		this.listViewItem.itemRenderer = CommonOneKeySellItem;
		this.listViewItem.dataProvider = array;

		//set cost
		if (this.type == TableEnum.Enum.OneKeySell.MONEY) {
			this.cost = Table.Count(_goods, (i) => {
				let table = PlayerItemSystem.Item(_goods[i].goodsId) as any
				return table.money * _goods[i].count;
			})
		} else if (this.type == TableEnum.Enum.OneKeySell.CRYSTAL) {
			this.cost = Table.Count(_goods, (i) => {
				let table = PlayerItemSystem.Item(_goods[i].goodsId) as any
				return table.crystal_soul * _goods[i].count
			})
		} else if (this.type == TableEnum.Enum.OneKeySell.Qi) {
			this.cost = Table.Count(_goods, (i) => {
				let table = PlayerItemSystem.Item(_goods[i].goodsId) as any
				return table.vital_qi * _goods[i].count
			})
		} else if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
			this.cost = 0
		} else if (this.type == TableEnum.Enum.OneKeySell.Demon) {
			this.cost = 0
		} else if (this.type == TableEnum.Enum.OneKeySell.Rogue) {
			this.cost = 0
		}


		this.labelCose.text = this.cost.toString();

		//set path
		let path = ""
		if (this.type == TableEnum.Enum.OneKeySell.MONEY) {
			let a = PlayerItemSystem.Item(message.EResourceType.RESOURCE_MONEY) as any
			path = a.icon;
		} else if (this.type == TableEnum.Enum.OneKeySell.CRYSTAL) {
			// path = PlayerItemSystem.Item(message.EResourceType.RESOURCE_CRYSTALSOUL).icon
		}
		// else if (this.type == TableEnum.Enum.OneKeySell.Qi) {
		// 	path = PlayerItemSystem.Item(message.EResourceType.RESOURCE_MAGIC_CRYSTAL).icon
		// } else if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
		// 	path = PlayerItemSystem.Item(message.EResourceType.RESOURCE_MAGIC_CRYSTAL).icon
		// } else if (this.type == TableEnum.Enum.OneKeySell.Demon) {
		// 	path = PlayerItemSystem.Item(message.EResourceType.RESOURCE_MAGIC_CRYSTAL).icon
		// } 
		else if (this.type == TableEnum.Enum.OneKeySell.Rogue) {
			let a = PlayerItemSystem.Item(message.EResourceType.RESOURCE_TOKEN) as any
			path = a.icon;
		}
		this.imgCost.source = cachekey(path, this);

		//set type
		if (this.type == TableEnum.Enum.OneKeySell.MONEY) {
			this.res = message.EResourceType.RESOURCE_MONEY
		} else if (this.type == TableEnum.Enum.OneKeySell.CRYSTAL) {
			// this.res = message.EResourceType.RESOURCE_CRYSTALSOUL
			toast_warning("有错误");
		} else if (this.type == TableEnum.Enum.OneKeySell.Qi) {
			// this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
			toast_warning("有错误");
		} else if (this.type == TableEnum.Enum.OneKeySell.Fruit) {
			// this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
			toast_warning("有错误");
		} else if (this.type == TableEnum.Enum.OneKeySell.Demon) {
			// this.res = message.EResourceType.RESOURCE_MAGIC_CRYSTAL
			toast_warning("有错误");

		} else if (this.type == TableEnum.Enum.OneKeySell.Rogue) {
			this.res = message.EResourceType.RESOURCE_TOKEN
		}
	}

	private onBtnConfirm() {
		this.UsePropReqBody()
			.then((gameInfo: message.GameInfo) => {
				if (this.function) {
					this.function(gameInfo.getGoods);
				} else {
					if (this.type == TableEnum.Enum.OneKeySell.Fruit || this.type == TableEnum.Enum.OneKeySell.Demon || this.type == TableEnum.Enum.OneKeySell.Rogue) {
						let get_goods = []
						get_goods = Table.copy(gameInfo.getGoods);
						get_goods.sort((a, b) => {
							let aa = PlayerItemSystem.Set(a.goodsId).Info as any;
							let bb = PlayerItemSystem.Set(b.goodsId).Info as any;
							return a.quality - b.quality;
						})
						this.close();
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(get_goods);
								dialog.setCB(this.cb);
								dialog.show();
							});
					} else {
						Common_ShortMsg.promptBattleValue("+" + this.cost, this.res, UIManager.StageHeight / 2);
						this.close(UI.HIDE_TRAIL_OFF);
						if (this.cb) {
							this.cb();
						}
					}
				}

			}).catch(() => {

			})
	}

	private onBtnClose() {
		this.close(UI.HIDE_TRAIL_OFF);
	}

	private UsePropReqBody(): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.UsePropRequest();
			request.body.goodses = Table.copy(this.goods);
			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.UsePropResponse>resp;
				if (response.header.result != 0 || response.header.result == message.EC.XG_LACK_MONEY) {
					reject(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				resolve(response.body.gameInfo);
			},
				(req: aone.AoneRequest): void => {
					reject(LANG("请求超时"));
					return;
				}, this, false);
		});
	}
}
}