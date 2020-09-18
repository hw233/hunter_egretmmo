namespace zj {
/**
 * @author xingliwei 
 * 
 * @date 2019-2-26
 * 
 * @class 奖励说明详情
 */
export class ArenaWholePop extends UI {
	private imgFrame: eui.Image;
	private imgIcon: eui.Image;
	private groupClip: eui.Group;
	private labelName: eui.Label;
	private labelPlayer: eui.Label;
	private labelNumber: eui.Label;
	private imgLogo: eui.Image;
	private labelInfo: eui.Label;

	public constructor() {
		super();
		this.skinName = "resource/skins/arena/ArenaWholePopSkin.exml";
	}
	protected dataChanged() {

	}

	public setInfo(titleInfo: message.GoodsInfo) {
		Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "armatureName", "001_daojuguang_02", 0)
			.then(display => {
				display.width = this.groupClip.width;
				display.height = this.groupClip.height;
				display.x = this.groupClip.width / 2;
				display.y = this.groupClip.height / 2;
				this.groupClip.addChild(display);
			})
			.catch(reason => {
				toast(reason);
			});

		let itemSet = PlayerItemSystem.Set(titleInfo.goodsId, 1, titleInfo.count) as any;
		this.imgFrame.source = cachekey(itemSet.Frame, this);
		this.imgIcon.source = cachekey(itemSet.Clip, this);
		this.labelName.text = itemSet.Info.name;
		this.labelNumber.text = Helper.StringFormat(TextsConfig.TextsConfig_Wonderland.fruit_cnt_label, titleInfo.count);
		this.labelInfo.text = itemSet.Info.des;
		this.imgLogo.source = cachekey(itemSet.Info.logo, this);
		this.labelInfo.text = itemSet.Info.effect;
	}
}
}