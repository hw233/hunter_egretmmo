namespace zj {
    //WantedSecondMeteorlnstanceItem
    //hexiaowei
    // 2019/02/13
    export class WantedSecondMeteorlnstanceItem extends eui.ItemRenderer {

        private groupFloorA: eui.Group;
        private btnInstance2: eui.Button;
        private btnInstance1: eui.Button;
        private btnInstance: eui.Button;
        private groupFloorB: eui.Group;
        private btnInstanceB2: eui.Button;
        private btnInstanceB1: eui.Button;
        private btnInstanceB: eui.Button;
        private imgLayerBoard: eui.Image;
        private labelName: eui.Label;
        private imgType: eui.Image;
        private imgBossIcon: eui.Image;
        private labelLayerBoard: eui.BitmapLabel;

        public buttonFloorA = [];
        public buttonFloorB = [];
        public tempButtonDelegate = [];

        public constructor() {
            super();
            this.skinName = "resource/skins/meteorstreet/WantedSecondMeteorlnstanceItemSkin.exml";
            cachekeys(<string[]>UIResource["WantedSecondMeteorlnstanceItem"], null);
        }

        protected dataChanged() {

            this.buttonFloorA = [
                this.btnInstance,
                this.btnInstance1,
                this.btnInstance2
            ]
            this.buttonFloorB = [
                this.btnInstanceB,
                this.btnInstanceB1,
                this.btnInstanceB2
            ]

            let index = (this.data.tableWanted.wanted_id - 10000 * this.data.indexId);
            let bSpecial = this.data.tableWanted.bSpecial == 2;
            this.imgType.visible = true;
            this.imgType.source = cachekey(UIConfig.UIConfig_Wanted.isWin[3], this);

            // if (!bSpecial) {
            this.labelLayerBoard.text = index.toString();
            // this.imgLayerBoard.source = cachekey(UIConfig.UIConfig_Wanted.number2[index - 1], this);
            // } else {
            // this.imgLayerBoard.source = cachekey(UIConfig.UIConfig_Wanted.number3[index], this);
            // }

            let floor_id = this.data.indexId - 1;

            let get_first = Table.FindK(Game.PlayerWantedSystem.wantedInfo.wantedFirstReward, Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value) != -1;
            this.labelName.text = this.data.tableWanted.Instance_name;

            if (bSpecial) {
                this.groupFloorA.visible = false;
                this.groupFloorB.visible = true;
                this.tempButtonDelegate = this.buttonFloorB;
            } else {
                this.groupFloorA.visible = true;
                this.groupFloorB.visible = false;
                this.tempButtonDelegate = this.buttonFloorA;
            }
            let a = Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100;
            if (index > Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100) {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = true;

                this.labelName.textColor = Helper.RGBToHex("r:180,g:180,b:180")
                Helper.SetImageFilterColor(this.imgLayerBoard, "gray");
            } else if (index < Game.PlayerWantedSystem.wantedInfo.typeLevel[floor_id].value % 100 || get_first) {
                this.tempButtonDelegate[0].visible = true;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = false;

                this.labelName.textColor = Helper.RGBToHex("r:255,g:255,b:0")
                Helper.SetImageFilterColor(this.imgLayerBoard);

                this.imgType.visible = true;
                this.imgType.source = cachekey(UIConfig.UIConfig_Wanted.isWin[1], this);
            } else {
                this.tempButtonDelegate[0].visible = true;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = false;

                this.labelName.textColor = Helper.RGBToHex("r:255,g:255,b:0")
                Helper.SetImageFilterColor(this.imgLayerBoard);
                this.imgType.visible = true;
                this.imgType.source = cachekey(UIConfig.UIConfig_Wanted.isWin[2], this);
            }

            if (this.selected) {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = true;
                this.tempButtonDelegate[2].visible = true;
            } else {
                this.tempButtonDelegate[0].visible = false;
                this.tempButtonDelegate[1].visible = false;
                this.tempButtonDelegate[2].visible = true;
            }
        }
    }

    //子项数据源
    export class WantedSecondMeteorlnstanceItemData {
        indexId: number;
        //数据源
        tableWanted: TableWanted;
    }
}