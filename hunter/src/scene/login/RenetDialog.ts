namespace zj {
	// 进主城前加载失败弹框
	// 翟伟利 
	// 创建于2020.1.4
	export class RenetDialog extends eui.Component {
		private rectBack: eui.Rect;
		private rect_ok: eui.Group;
		private lbMsg: eui.Label;
		private lbBtn: eui.Label;
		private lbLog: eui.Label;
		private callbackOk: Function;
		private rootStage: egret.Stage = null;
		private isShow: boolean = false;
		public constructor(stage: egret.Stage) {
			super();
			this.rootStage = stage;
			this.isShow = false;
			this.initUI();
			this.rect_ok.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
			this.lbLog.text = "";
			this.onAddStage();
		}

		private initUI() {
			// 参考 RenetDialogSkin.exml
			// 大背景半透
			let rect = new eui.Rect();
			rect.fillColor = 0;
			rect.strokeColor = 0;
			rect.fillAlpha = 0;
			rect.touchEnabled = true;
			rect.left = 0;
			rect.top = 0;
			rect.right = 0;
			rect.bottom = 0;
			this.addChild(rect);
			this.rectBack = rect;
			// 中间UI区group
			let group = new eui.Group();
			group.width = 440;
			group.height = 200;
			group.horizontalCenter = "0";
			group.verticalCenter = "0";
			this.addChild(group);
			// 中间UI区域白底儿
			rect = new eui.Rect();
			rect.fillColor = 0xffffff;
			rect.strokeColor = 0;
			rect.ellipseWidth = 10;
			rect.ellipseHeight = 10;
			rect.left = 0;
			rect.top = 0;
			rect.right = 0;
			rect.bottom = 0;
			group.addChild(rect);
			// UI区域灰线Y坐标
			let line = 120;
			// UI区域中间灰线
			rect = new eui.Rect();
			rect.height = 2;
			rect.y = line;
			rect.fillColor = 0x565859;
			rect.fillAlpha = 0.3;
			rect.strokeAlpha = 0;
			rect.left = 0;
			rect.right = 0;
			group.addChild(rect);
			// UI区域上方提示文字
			let label = new eui.Label();
			label.height = line;
			label.size = 25;
			label.verticalAlign = "middle";
			label.textAlign = "center";
			label.textColor = 0x8a8e8e;
			label.left = 0;
			label.right = 0;
			label.text = "网络加载超时，请检查网络后重试";
			group.addChild(label);
			this.lbMsg = label;
			// UI区域下方按钮文字
			label = new eui.Label();
			label.height = group.height - line;
			label.size = 28;
			label.verticalAlign = "middle";
			label.textAlign = "center";
			label.textColor = 0x004AFF;
			label.left = 0;
			label.right = 0;
			label.bottom = 0;
			label.text = "重试";
			group.addChild(label);
			this.lbBtn = label;
			// UI区域下方按钮
			let groupBtn = new eui.Group();
			groupBtn.height = group.height - line;
			groupBtn.left = 0;
			groupBtn.right = 0;
			groupBtn.bottom = 0;
			group.addChild(groupBtn);
			this.rect_ok = groupBtn;
			// 左下角log（用于输出提示类型或打点）
			label = new eui.Label();
			label.size = 18;
			label.left = 4;
			label.bottom = 4;
			label.textColor = 0xffffff;
			this.addChild(label);
			this.lbLog = label;
		}

		private onAddStage() {
			this.rectBack.fillAlpha = 0;
			egret.Tween.get(this.rectBack).to({ fillAlpha: 0.5 }, 1000, egret.Ease.sineIn);
		}

		public setLog(str: string) {
			this.lbLog.text = str;
		}

		public setBtnStr(str: string) {
			this.lbBtn.text = str;
		}

		public setMsgStr(str: string) {
			this.lbMsg.text = str;
		}

		public show(callbackOk: Function) {
			this.callbackOk = callbackOk;
			if(!this.isShow){
				this.width = this.rootStage.stageWidth;
				this.height = this.rootStage.stageHeight;
				this.rootStage.addChild(this);
				this.isShow = true;
			}
		}

		public close() {
			// this.rect_ok.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOK, this);
			if (this.parent) {
				this.parent.removeChild(this);
			}
			this.isShow = false;
		}

		private onBtnOK() {
			this.close();
			if (this.callbackOk) {
				this.callbackOk();
				this.callbackOk = null;
			}
		}
	}
}