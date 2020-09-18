namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-5-17
 * 
 * @class 玩家信息激活码
 */
export class CommonInputCode extends Dialog {
	private editBoxContent: eui.TextInput;
	private btnCancel: eui.Button;
	private btnOk: eui.Button;

	private editRet: string;
	public constructor() {
		super();
		this.skinName = "resource/skins/common/CommonInputCodeSkin.exml";
		this.init();
	}

	private init() {
		this.editBoxContent.skinName = "resource/skins/common/TextInputSkin.exml";
		this.editBoxContent.textDisplay.textColor = 0x5A3722;
		this.editBoxContent.promptDisplay.textColor = 0xB19782;
		this.editBoxContent.inputType = egret.TextFieldType.INPUT;
		this.editBoxContent.prompt = TextsConfig.TextsConfig_User.key_tips;

		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.btnCancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnclose, this);

	}

	private onBtnOk() {
		if (this.editBoxContent.text != null && Object.keys(this.editBoxContent.text).length == 20) {
			this.AcceptActivationReqBody()
				.then((gameInfo: message.GameInfo) => {
					if (gameInfo.getGoods != null) {
						loadUI(CommonGetDialog)
							.then((dialog: CommonGetDialog) => {
								dialog.init(gameInfo.getGoods);
								dialog.show();
							});
					} else {
						toast_warning(TextsConfig.TextsConfig_User.key_tips_error);
					}
					this.close(UI.HIDE_TO_TOP);
				}).catch(() => {

				})
		} else {
			toast_warning(TextsConfig.TextsConfig_User.key_tips);
		}

	}

	private onBtnclose() {
		this.close(UI.HIDE_TO_TOP);
	}

	public AcceptActivationReqBody(): Promise<{}> {
		return new Promise((resolve, reject) => {
			let request = new message.AcceptActivationRequest();
			request.body.activation = this.editBoxContent.text;

			Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
				let response = <message.AcceptActivationResponse>resp;
				if (response.header.result != 0) {
					reject(response.header.result);
					return;
				}
				resolve(response.body.gameInfo);
			}, (req: aone.AoneRequest): void => {
				console.log("req:", req);
				reject("timeout");
			}, this, false);
		});
	}
}
}