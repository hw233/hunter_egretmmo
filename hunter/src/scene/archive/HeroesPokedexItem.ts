namespace zj {
//HeroesPokedexItem
//hexiaowei
// 2018/12/06
export class HeroesPokedexItem extends eui.ItemRenderer {
    private groupPokedex: eui.Group;
    private imgSel: eui.Image;
    private imgSpriteHunterBoard: eui.Image;
    private imgSpriteHeroIcon: eui.Image;
    private imgSpriteHunterName: eui.Image;
    private labelHeroAttri: eui.Label;
    private imgSpriteHeroGrade: eui.Image;
    private imgSpriteHunterAttType: eui.Image;
    private imgSpriteIconRed: eui.Image;
    private ButtonItem: eui.Button;

    public isdown: boolean = false;

    public _pokedxScene: HeroesPokedexScene;

    public constructor(pokedxScene) {
        super();
        cachekeys(<string[]>UIResource["HeroesPokedexItem"], null);
        this._pokedxScene = pokedxScene;
        this.skinName = "resource/skins/archive/HeroesPokedexItemSkin.exml";

    }

    protected dataChanged() {
        let mapRoleIns = TableMapRole.Item(this.data.mapRoleId);
        let generalIns = PlayerHunterSystem.Table(this.data.generalId);
        this.imgSpriteHunterBoard.visible = false;
        this.imgSpriteHunterName.source = cachekey(generalIns.name_pic, this);
        this.imgSpriteHeroIcon.source = cachekey(mapRoleIns.body_path, this);
        this.imgSpriteHeroGrade.source = cachekey(UIConfig.UIConfig_General.hunter_grade[this.data.aptitude], this);
        this.imgSpriteHunterAttType.source = cachekey(UIConfig.UIConfig_Hunter_Pokedex.feature[this.data.feature], this);
        this.isdown = this.data.isdown;
        this.imgSel.visible = false;
        this.imgSpriteHunterBoard.visible = false;

        if (this.selected) {
            this.imgSpriteHunterBoard.visible = true;
        }
        else {
            this.imgSel.visible = true;
        }

        if (this.data.isHave != true) {
            Helper.SetImageFilterColor(this.imgSpriteHeroIcon, "black");
        } else {
            Helper.SetImageFilterColor(this.imgSpriteHeroIcon);
        }
        // let des = PlayerTalentSystem.Des(generalIns.pokedex_attri, 1);
        this.labelHeroAttri.text = "";//des;
        // 页面红点
        if (!this.data.isHave) {
            this.imgSpriteIconRed.visible = false;
        } else {
            this.imgSpriteIconRed.visible = !PlayerHunterHistorySystem.GetPokedexKey(this.data.generalId);
        }
    }

    public FreshTips() {
        let general_Id = this.data.generalId;
        if (!PlayerHunterHistorySystem.GetPokedexKey(general_Id)) {
            PlayerHunterHistorySystem.SavePokedexKey(general_Id, 1);
        }
        if (this.imgSpriteIconRed != null && this.data.isHave) {
            this.imgSpriteIconRed.visible = false;
        }
    }

}

}