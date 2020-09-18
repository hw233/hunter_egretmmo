namespace zj {
export class Common_OutPutItem extends eui.ItemRenderer {

	private groupLayer1: eui.Group;
	private groupLayer2: eui.Group;
	private groupAll: eui.Group;

	private labelNotOpen: eui.Label;
	private labelName: eui.Label;
	private labelInfo: eui.Label;

	private imgIconLock1: eui.Image;
	private imgIconLock2: eui.Image;
	private imgIcon1: eui.Image;
	private imgIcon2: eui.Image;
	public imgGo: eui.Image;

	private fromId: number;
	private mobId: number;

	public lock: boolean;

	public constructor() {
		super();
		this.skinName = "resource/skins/common/Common_OutPutItemSkin.exml";
		cachekeys(<string[]>UIResource["Common_OutPutItem"], null);
	}

	protected dataChanged() {
		this.updateView(this.data);
	}

	private updateView(data: Common_OutPutItemData) {
		this.labelNotOpen.visible = false;
		if (data.fromId != 0 && (data.mobId == null || data.mobId == undefined) && data.fromId != 41) {
			this.fromId = data.fromId;
			this.mobId = data.mobId;

			// let item = this.data as TableClientGetProp;
			let item = TableClientGetProp.Item(data.fromId);
			if (item == null) {
				throw Error("item should not null.");
			}
			this.imgIcon1.source = cachekey(item.path, this);
			this.imgIcon2.source = cachekey(item.path, this);
			this.labelName.text = item.name;
			let bOpen = Game.PlayerMissionSystem.Open(item.index);
			let color = bOpen ? 0x1C5A00 : ConstantConfig_Common.Color.red;
			this.labelInfo.text = bOpen ? item.info : item.open;
			this.labelInfo.textColor = color;
			this.imgGo.visible = (bOpen && item.skip == "1");
			// this.labelNotOpen.visible = !bOpen;
			this.imgIconLock1.visible = !bOpen;
			this.imgIconLock2.visible = !bOpen;
			this.lock = !bOpen;

			this.groupLayer1.visible = true;
			this.groupLayer2.visible = false;
		}
		else if ((data.fromId == 0 || data.fromId == 41) && data.mobId != null) {
			this.fromId = data.fromId;
			this.mobId = data.mobId;
			let inst = Game.PlayerInstanceSystem.Set(data.mobId);
			let item = TableClientGetProp.Item(data.fromId);
			if (item == null) {
				throw Error("item should not null.");
			}

			this.imgIconLock1.visible = (!inst.Open);
			this.imgIconLock2.visible = (!inst.Open);
			this.lock = !inst.Open;
			let imgIcon: Array<eui.Image> = [this.imgIcon1, this.imgIcon2];
			this.imgIcon1.source = cachekey(inst.Boss, this);
			if (Device.isReviewSwitch) {
				this.imgIcon2.source = cachekey("hero_icon_head_gw_xiaoemo_png", this);
			} else {
				this.imgIcon2.source = cachekey(inst.Boss, this);
			}
			this.labelInfo.text = inst.Info;
			this.labelInfo.textColor = inst.Color;
			this.labelName.text = inst.Name;
			this.imgGo.visible = (inst.Open && TableClientGetProp.Item(this.fromId).skip == "1");
			this.groupLayer1.visible = false;
			this.groupLayer2.visible = true;
		}
		else if (data.fromId == 29 && data.mobId != null) {
			this.fromId = data.fromId;
			this.mobId = data.mobId;
			let item = TableClientGetProp.Item(data.fromId);
			if (item == null) {
				throw Error("item should not null.");
			}
			let areaInfo: TableInstanceArea = TableInstanceArea.Item(data.mobId);
			let bOpen = Game.PlayerInstanceSystem.ElitePackCanChallenge(data.mobId);
			let color = bOpen == true ? Helper.RGBToHex("r:28.g:90,b:0") : Helper.RGBToHex("r:241,g:34,b:0");
			this.labelName.text = item.name;
			let inst = Game.PlayerInstanceSystem.Set(data.mobId);
			this.imgIcon1.source = cachekey(inst.Boss, this);
			if (Device.isReviewSwitch) {
				this.imgIcon2.source = cachekey("hero_icon_head_gw_xiaoemo_png", this);
			} else {
				this.imgIcon2.source = cachekey(inst.Boss, this);
			}
			this.labelInfo.text = Helper.StringFormat(TextsConfig.TextConfig_Instance.instance_drop, areaInfo.area_name);
			this.labelInfo.textColor = color;
			this.labelNotOpen.visible = !bOpen;
			this.imgGo.visible = bOpen;
			let imgIcon: Array<eui.Image> = [this.imgIcon1, this.imgIcon2];
			for (let i = 1; i <= imgIcon.length; i++) {
				(<eui.Image>this[`imgIcon${i}`]).source = cachekey(item.path, this);
			}
			this.groupLayer1.visible = true;
			this.groupLayer2.visible = false;
		}
	}
}

export class Common_OutPutItemData {
	fromId: number;
	mobId: number;
}
}