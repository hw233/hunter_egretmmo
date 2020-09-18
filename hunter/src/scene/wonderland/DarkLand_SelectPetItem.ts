namespace zj {
/**
 * @class 黑暗大陆更换宠物形象 Item
 * 
 * @author LianLei
 * 
 * 2019.05.31
 */
export class DarkLand_SelectPetItem extends eui.ItemRenderer {

	private groupImage: eui.Group;
	private imgSelect: eui.Image;
	private imgYincang: eui.Image;
	private groupNotCall: eui.Group;
	private imgShadow: eui.Image;
	private imgNotCall: eui.Image;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/DarkLand_SelectPetItemSkin.exml";
		cachekeys(<string[]>UIResource["DarkLand_SelectPetItem"], null);
		this.init();
	}

	private init() {
		this.groupNotCall.visible = false;
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: DarkLand_SelectPetItemData) {
		this.imgSelect.visible = false;

		if (this.selected) {
			this.imgSelect.visible = true;
		}
		else {
			this.imgSelect.visible = false;
		}

		let petInfo = PlayerAdviserSystem.PetBase(data.info.pet_id);
		let spineId = PlayerAdviserSystem.GetPetEvolution(data.info.pet_id, data.info);

		if (spineId != null) {
			let spineMap: { [key: string]: TableClientAniSpineSource } = TableClientAniSpineSource.Table();
			let spineName: string = spineMap[spineId].atlas;
			let aniName: string = spineMap[spineId].ani_name;
			this.groupImage.removeChildren();
			Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0).then(display => {
				display.x = this.groupImage.explicitWidth / 2;
				display.y = this.groupImage.explicitHeight;
				display.scaleX = 0.6;
				display.scaleY = 0.6;
				this.groupImage.addChild(display);
			}).catch(reason => {
				toast(reason);
			});
		}

		this.imgYincang.visible = (data.info.situtation == message.EPetStatusType.PET_TYPE_IN_POSTION);

		if (data.info.star == 0) {
			this.groupNotCall.visible = true;
		}
	}
}


export class DarkLand_SelectPetItemData {
	index: number;
	info: message.PetInfo;
	father: DarkLand_SelectPet;
}
}