namespace zj {
/**
 * @class 贪婪之岛更换猎人头像Item
 * 
 * @author LianLei
 * 
 * 2019.05.30
 */
export class Wonderland_SelectedImageItem extends eui.ItemRenderer {

	private groupImage: eui.Group;
	private imgSelect: eui.Image;
	private imgYincang: eui.Image;
	private groupAddHero: eui.Group;
	private groupHaloBack: eui.Group;
	private groupHaloFront: eui.Group;

	public constructor() {
		super();
		this.skinName = "resource/skins/wonderland/Wonderland_SelectedImageItemSkin.exml";
		cachekeys(<string[]>UIResource["Wonderland_SelectedImageItem"], null);
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: Wonderland_SelectedImageItemData) {
		this.imgSelect.visible = false;

		if (this.selected) {
			this.imgSelect.visible = true;
		}
		else {
			this.imgSelect.visible = false;
		}

		let mapRole_id = TableItemPic.Item(data.id).mapRole_id;
		let oneGeneral: message.GeneralInfo;
		for (let i = 0; i < Game.PlayerHunterSystem.queryAllHunters().length; i++) {
			let v = Game.PlayerHunterSystem.queryAllHunters()[i];
			if (PlayerHunterSystem.GetGeneralId(v.general_id) == TableItemPic.Item(data.id).match_general) {
				oneGeneral = v;
				break;
			}
		}

		if (oneGeneral != null) {
			let fashionId = oneGeneral.fashionId
			mapRole_id = fashionId != 0 ? PlayerHunterSystem.GetFahionInfo(fashionId).fashion_roleId : mapRole_id;
		}

		let bodySpxtbl = TableMapRole.Item(mapRole_id);
		if (bodySpxtbl != null) {
			let bodySpxId = bodySpxtbl.body_spx_id;
			let scale = bodySpxtbl.spine_scale;
			if (bodySpxId != -1) {
				let spineMap: { [key: string]: TableClientFightAniSpineSource } = TableClientFightAniSpineSource.Table();
				let spineName: string = spineMap[bodySpxId].atlas;
				let aniName: string = spineMap[bodySpxId].ani_name;

				Game.DragonBonesManager.playAnimation(this, spineName, "armatureName", aniName, 0).then(display => {
					display.x = this.groupAddHero.explicitWidth / 2;
					display.y = this.groupAddHero.explicitHeight;
					display.scaleX = scale;
					display.scaleY = scale;
					this.groupAddHero.removeChildren();
					this.groupAddHero.addChild(display);
				}).catch(reason => {
					toast(reason);
				});
			}
		}
		this.imgYincang.visible = (data.index == 0);



		// 光环设置
		let haloTbl = PlayerVIPSystem.HaloItem(Game.PlayerInfoSystem.BaseInfo.haloId);

		if (haloTbl != null) {
			let auraCssIdFront = haloTbl.halo_front_aniId;
			let auraCssIdBack = haloTbl.halo_back_aniId;

			let getAinmationInfo = (id: number): [string, number] => {
				let aniUi = TableClientAniUi.Item(id);
				let cssSource = TableClientAniCssSource.Item(aniUi.css_id);
				return [cssSource.name + "_" + cssSource.number, aniUi.index];
			};


			let back1 = getAinmationInfo(auraCssIdBack);
			let front1 = getAinmationInfo(auraCssIdFront);

			// 光环龙骨
			if (auraCssIdFront != null) {
				
				Game.DragonBonesManager.playAnimation(this, front1[0], "armatureName", front1[1], 0).then(display => {
					display.x = this.groupHaloFront.explicitWidth / 2;
					display.y = this.groupHaloFront.explicitHeight;
					this.groupHaloFront.removeChildren();
					this.groupHaloFront.addChild(display);
				}).catch(reason => {
					toast(reason);
				});
			}

			if (auraCssIdBack != null) {
				
				Game.DragonBonesManager.playAnimation(this, back1[0], "armatureName", back1[1], 0).then(display => {
					display.x = this.groupHaloBack.explicitWidth / 2;
					display.y = this.groupHaloBack.explicitHeight;
					this.groupHaloBack.removeChildren();
					this.groupHaloBack.addChild(display);
				}).catch(reason => {
					toast(reason);
				});
			}
		}

	}

}

export class Wonderland_SelectedImageItemData {
	index: number;
	id: number;
	father: Wonderland_SelectedImage;
}
}