namespace zj {
/**
 * 扫荡Item(基础收益)
 * created by Lian Lei
 * 2019.1.21
 */
export class HXH_InstanceSweepFiveItemB extends eui.ItemRenderer {
	private labelTitle: eui.Label;
	private labelTTF: eui.Label;
	private imgExp: eui.Image;
	private labelExp: eui.Label;
	private labelTTF1: eui.Label;
	private imgCopper: eui.Image;
	private labelCopper: eui.Label;

	private totalTick: number = 0;
	private listIdx: number = 1;
	private id: number;
	private listMax: number;
	private father: HXH_InstanceSweepFive;
	private listData: eui.ArrayCollection = new eui.ArrayCollection();

	private oldValue: number;
	private newValue: number;

	public constructor() {
		super();
		this.skinName = "resource/skins/adventureMap/HXH_InstanceSweepFiveItemBSkin.exml";
		cachekeys(<string[]>UIResource["HXH_InstanceSweepFiveItemB"], null);

		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
			this.father = null;
		}, null);

		setTimeout(()=>{this.update();}, 500);
		let money = Game.PlayerInfoSystem.BaseInfo.money - Game.PlayerInfoSystem.baseInfo_pre.money;
		this.setInfo(0, money);
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: HXH_InstanceSweepFiveItemBData) {
		this.id = data.index;
		this.father = data.father;
		this.listMax = this.father.sweepDrps[data.index].length;

		if(Device.isReviewSwitch){
			this.imgCopper.y = 32;
			this.imgCopper.width = 40;
			this.imgCopper.height= 40;
		}
		this.imgCopper.visible = true;
		this.labelCopper.visible = true;
		this.imgExp.visible = true;
		this.labelExp.visible = true;

		let money = Game.PlayerInfoSystem.BaseInfo.money - Game.PlayerInfoSystem.baseInfo_pre.money;
		let exp = 0;

		if (data.father.sweepDrps[data.index][0] != null && data.father.sweepDrps[data.index][0].count != null) {
			exp = data.father.sweepDrps[data.index][0].count;
		}

		// this.labelCopper.text = "+" + money;
		if (Game.PlayerInfoSystem.BaseInfo.level == CommonConfig.role_max_level) {
			this.labelExp.text = TextsConfig.TextsConfig_Common.expMax;
		}
		else {
			this.labelExp.text = "+" + exp;
		}

		// this.setInfo(0, money);
	}

	private setInfo(oldValue: number, newValue: number) {
		this.oldValue = oldValue;
		this.newValue = newValue;
		this.labelCopper.text = "+" + this.oldValue;
	}

	private update() {
		if (0 % 10 != this.newValue % 10) {
			this.oldValue++;
			if (this.oldValue % 10 > 9) {
				this.oldValue % 10 === 0;
			}
		} else if (this.oldValue % 100 != this.newValue % 100) {
			this.oldValue += 10;
			if (this.oldValue % 10 > 9) {
				this.oldValue % 10 === 0;
			}
		} else if (this.oldValue % 1000 != this.newValue % 1000) {
			this.oldValue += 100;
			if (this.oldValue % 100 > 9) {
				this.oldValue % 100 === 0;
			}
		} else if (this.oldValue % 10000 != this.newValue % 10000) {
			this.oldValue += 1000;
			if (this.oldValue % 1000 > 9) {
				this.oldValue % 1000 === 0;
			}

		} else if (this.oldValue % 100000 != this.newValue % 100000) {
			this.oldValue += 10000;
			if (this.oldValue % 10000 > 9) {
				this.oldValue % 10000 === 0;
			}

		} else if (this.oldValue % 1000000 != this.newValue % 1000000) {
			this.oldValue += 100000;
			if (this.oldValue % 100000 > 9) {
				this.oldValue % 100000 === 0;
			}
		} else if (this.oldValue == this.newValue) {
			this.labelCopper.text = "+" + this.oldValue;
			return; // 不再继续调用
		}
		this.labelCopper.text = "+" + this.oldValue;
		setTimeout(()=>{this.update();}, 33);
	}
}

export class HXH_InstanceSweepFiveItemBData {
	index: number;
	father;
}
}