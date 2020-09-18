namespace zj {
	// 换线界面
	// 翟伟利
	// 2019.12.14
	export class LineChangeDialog extends Dialog {
		private btnClose: eui.Button;
		private roleNums: number[] = [35, 60];// 0-角儿数量拥挤线，1-角色数量满线
		private lbLineMy: eui.Label;
		private groupList: eui.Group;

		private groupLook: eui.Group;
		private imgSelect: eui.Image;
		private isLookOther: boolean;
		public constructor() {
			super();
			this.skinName = "resource/skins/main/LineChangeDialogSkin.exml";
			this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnClose, this);
			this.groupLook.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnLook, this);
		}
		public static getLineName(key: number){
			if(key < 100){
				return 1;
			} else {
				return (key % 100) + 1;
			}
		}
		public Init() {
			this.isLookOther = Game.PlayerInfoSystem.getIsLookOtherPlayer();
			this.imgSelect.visible = this.isLookOther;
			this.lbLineMy.text = LineChangeDialog.getLineName(Game.PlayerWonderLandSystem.serverSceneId) + "线";
			this.sendGetLines();
		}
		private sendGetLines() {
			let req = new message.WonderlandGetBranchInfoRequest();
			req.body.id = 2;
			Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse) => {
				let response = <message.SetFormationResponse>resp;
				if (response.header.result != 0) {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.reqLinesBack(response as message.WonderlandGetBranchInfoResponse);
			}, null, this, false);
		}

		private reqLinesBack(resp: message.WonderlandGetBranchInfoResponse) {
			let list: message.IIKVPairs[] = resp.body.branchInfo;
			this.resetRoleNums(list);
			this.updateList(list);
		}

		private resetRoleNums(list: message.IIKVPairs[]) {
			if (list.length > 0) {
				let nums = [];
				for (let i = 0; i < list.length; ++i) {
					nums.push(list[i].value);
				}
				let sort = function (a, b) {
					return a - b;
				}
				nums.sort(sort);
				if(nums[0] >= this.roleNums[1]){
					let idx = Math.floor(list.length / 2);
					if(idx >= nums.length){
						idx = nums.length - 1;
					}
					this.roleNums[1] = nums[idx] + 1;
				}
			}
		}

		private updateList(list: message.IIKVPairs[]){
			this.groupList.removeChildren();
			for (let i = 0; i < list.length; ++i) {
				let item = new LineChangeDialogItem(this);
				item.setData(list[i], this.roleNums);
				this.groupList.addChild(item);
			}
		}

		public onSelItem(item: message.IIKVPairs){
			if(item.key != Game.PlayerWonderLandSystem.serverSceneId){
				this.sendChangeline(item.key);
			}
		}

		private sendChangeline(id: number){
			let req = new message.WonderlandChangeBranchInfoRequest();
			req.body.id = id;
			Game.Controller.send(req, (req: aone.AoneRequest, resp: aone.AoneResponse) => {
				let response = <message.SetFormationResponse>resp;
				if (response.header.result != 0) {
					toast(Game.ConfigManager.getAone2CodeReason(response.header.result));
					return;
				}
				this.reqChangeLineBack(response as message.WonderlandChangeBranchInfoResponse);
			}, null, this, false);
		}

		private reqChangeLineBack(response: message.WonderlandChangeBranchInfoResponse){
			Game.PlayerWonderLandSystem.changeLine(response);
			this.onBtnClose();
			Game.EventManager.event(GameEvent.SERVER_LINE_CHANGE);//message.WonderlandChangeBranchInfoRespBody
			// this.sendGetLines();
		}

		private onBtnLook(){
			this.isLookOther = !this.isLookOther;
			this.imgSelect.visible = this.isLookOther;
		}

		private onBtnClose() {
			this.close(UI.HIDE_TRAIL_OFF);
			Game.PlayerInfoSystem.setLookOther(this.isLookOther);
			Game.EventManager.event(GameEvent.MAIN_CITY_UPDATE);
		}
	}
}