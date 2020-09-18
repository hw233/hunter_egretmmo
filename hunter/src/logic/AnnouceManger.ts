namespace zj {
export class AnnouceManger {

	private cellsTbl = [];
	public CommonAnnouce: CommonAnnouce;
	public constructor() {

	}

	// 提供单例接口
	private static _instance: AnnouceManger;
	public static get Instance(): AnnouceManger {
		if (AnnouceManger._instance == null) {
			AnnouceManger._instance = new AnnouceManger();
			Gmgr.Instance.InitInfo();
		}
		return AnnouceManger._instance;
	}

	public init() {
		// 推送聊天消息
		Game.EventManager.on(GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
	}

	public uninit() {
		this.cellsTbl = [];
		this.CommonAnnouce == null;
	}

	/**
     * 推送聊天消息
     */
	public ChatMessageNotice_Visit(msg, result) {
		msg = msg.data.body;
		for (let i = 0; i < msg.chatinfos.length; i++) {
			let chatInfo = msg.chatinfos[i]
			if (chatInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
				let content = Lang.chatContent(chatInfo)
				content = Set.DecodeJson(content)
				this.AddAnnouce(content)
			}
		}
	}

	public AddRollCell(typeLua, cell) {
		this.cellsTbl[typeLua] = null;
		if (this.cellsTbl[typeLua] == null) {
			this.cellsTbl[typeLua] = {
				cellsOrig: [],  // 原始子项
				cellsShow: [], //展示子项
			}
		}
		this.cellsTbl[typeLua].cellsOrig.push(cell)
		this.Update();
	}

	public Update() {
		if (Gmgr.Instance.layerId == TableEnumLayerId.LAYER_FIGHT) {
			return;
		}
		if (!Game.PlayerInfoSystem.playAnnouce) {
			return;
		}
		for (let k in this.cellsTbl) {
			if (this.cellsTbl.hasOwnProperty(k)) {
				let v = this.cellsTbl[k] as any;
				if (v.cellsOrig > 0) {
					if (v.cellsShow == 0 || (v.cellsShow != 0 && v.cellsShow[v.cellsShow]._can_next_add == true)) {
						v.cellsShow.push(v.cellsOrig[1])
						v.cellsOrig.splice(0, 1);
					}
				}
				if (this.CommonAnnouce != null) {
					this.CommonAnnouce.SetInfo(this.cellsTbl, this);
					// this.CommonAnnouce.visible = true;
				} else {
					// let UI = Game.UIManager.AnimationGroup.getChildByName("CommonAnnouce") as CommonAnnouce;
					// if (UI) {
					// 	UI.visible = true;
					// 	UI.SetInfo(this.cellsTbl, this);
					// } else {
					let UI = new CommonAnnouce();
					// UI.name = "CommonAnnouce";
					UI.x = UIManager.StageWidth / 2 - 480;
					UI.y = 0;
					this.CommonAnnouce = UI;
					UI.SetInfo(this.cellsTbl, this);
					Game.UIManager.AnimationGroup.addChild(UI);
					// }

				}
			}
		}
	}

	public AddAnnouce(message) {
		if ((Gmgr.Instance.getLayerId() != TableEnumLayerId.LAYER_CITY &&
			Gmgr.Instance.getLayerId() != TableEnumLayerId.LAYER_LEAGUE_FIGHT &&
			Gmgr.Instance.getLayerId() != TableEnumLayerId.LAYER_WONDERLAND &&
			Gmgr.Instance.getLayerId() != TableEnumLayerId.LAYER_ZORKBOSS &&
			Gmgr.Instance.getLayerId() != TableEnumLayerId.LAYER_DARKLAND)
			|| Gmgr.Instance.bInLoading == true) {
			return;
		}
		let cell = {
			_ui_data: null,
			_added: null,
			_can_next_add: null
		}
		// cell._ui_name = "CommonAnnouce";
		cell._ui_data = message;
		cell._added = false;
		cell._can_next_add = false;

		this.AddRollCell(0, cell)
	}
}
}