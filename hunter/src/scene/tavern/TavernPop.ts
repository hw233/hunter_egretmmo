namespace zj {
    //Tavern Pop
    //hexiaowei
    //2018/11/12
    export class TavernPop extends UI {
        private groupArray: [eui.Group];
        private groupSum: eui.Group;
        private btnOne: eui.Button;
        private btnMore: eui.Button;
        private group1: eui.Group;
        private group2: eui.Group;
        private group3: eui.Group;
        private group4: eui.Group;
        private group5: eui.Group;
        private labelPossessSodaNum: eui.Label;

        private imagebackground1: eui.Image;
        private imageHunter1: eui.Image;
        private rectMask1: eui.Image;
        private imageHuntername1: eui.Image;
        private imageRank1: eui.Image;

        private imagebackground2: eui.Image;
        private imageHunter2: eui.Image;
        private rectMask2: eui.Image;
        private imageHuntername2: eui.Image;
        private imageRank2: eui.Image;

        private imagebackground3: eui.Image;
        private imageHunter3: eui.Image;
        private rectMask3: eui.Image;
        private imageHuntername3: eui.Image;
        private imageRank3: eui.Image;

        private imagebackground4: eui.Image;
        private imageHunter4: eui.Image;
        private rectMask4: eui.Image;
        private imageHuntername4: eui.Image;
        private imageRank4: eui.Image;

        private imagebackground5: eui.Image;
        private imageHunter5: eui.Image;
        private rectMask5: eui.Image;
        private imageHuntername5: eui.Image;
        private imageRank5: eui.Image;

        private groupStar1: eui.Group;
        private groupStar2: eui.Group;
        private groupStar3: eui.Group;
        private groupStar4: eui.Group;
        private groupStar5: eui.Group;

        private groupImage1: eui.Group;
        private groupImage2: eui.Group;
        private groupImage3: eui.Group;
        private groupImage4: eui.Group;
        private groupImage5: eui.Group;

        private taverninfo: any;
        private num: number;
        private sodaNum: number;
        private tavern: TavernScene;

        public constructor() {
            super();
            this.skinName = "resource/skins/tavern/TavernPopSkin.exml";
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            /*
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnone, this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
            */
            this.btnOne.enabled = false;
            this.btnMore.enabled = false;
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.info();
        }

        public init(tavern) {
            this.tavern = tavern;
        }

        public info() {

            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.group4.visible = false;
            this.group5.visible = false;
            this.imageHunter1.mask = this.rectMask1;
            this.imageHunter2.mask = this.rectMask2;
            this.imageHunter3.mask = this.rectMask3;
            this.imageHunter4.mask = this.rectMask4;
            this.imageHunter5.mask = this.rectMask5;

            this.groupArray = [
                this.group1,
                this.group2,
                this.group3,
                this.group4,
                this.group5
            ];

        }

        public setInfo(info?: message.GoodsInfo) {
            this.taverninfo = info;
            this.num = this.taverninfo.length;
            if (this.taverninfo.length == 2) {
                //this.group1.horizontalCenter = -350;
                //this.group2.horizontalCenter = 350;
                this.group1.horizontalCenter = -(this.width * 0.24);
                this.group2.horizontalCenter = this.width * 0.24;
            }
            else if (this.taverninfo.length == 3) {
                /*
                this.group1.horizontalCenter = -450;
                this.group2.horizontalCenter = 0;
                this.group3.horizontalCenter = 450;
                */
                this.group1.horizontalCenter = -(this.width * 0.34);
                this.group2.horizontalCenter = 0;
                this.group3.horizontalCenter = this.width * 0.34;
            }
            else if (this.taverninfo.length == 4) {
                /*
                this.group1.horizontalCenter = -480;
                this.group2.horizontalCenter = -160;
                this.group3.horizontalCenter = 160;
                this.group4.horizontalCenter = 480;
                */
                this.group1.horizontalCenter = -(this.width * 0.375);
                this.group2.horizontalCenter = -(this.width * 0.125);
                this.group3.horizontalCenter = this.width * 0.125;
                this.group4.horizontalCenter = this.width * 0.375;
            }

            if (Game.PlayerInfoSystem.Soda >= 5) {
                this.labelPossessSodaNum.text = (5).toString();
                this.sodaNum = 5;
            }

            else if (Game.PlayerInfoSystem.Soda >= 1) {
                this.labelPossessSodaNum.text = Game.PlayerInfoSystem.Soda.toString();
                this.sodaNum = Game.PlayerInfoSystem.Soda;
            }

            else {
                this.btnMore.visible = false;
                this.labelPossessSodaNum.visible = false;
                this.btnOne.horizontalCenter = 0;
            }

            for (let i = 1; i <= 5; i++) {

                let index = i - 1;
                if (index < this.taverninfo.length) {
                    let goodsId = info[index].goodsId
                    let aptitude = PlayerHunterSystem.Table(goodsId).aptitude
                    //this.aptitudeList.push(aptitude);
                    let roleId = PlayerHunterSystem.Table(goodsId).general_roleId
                    //this[`labelHuntername${i}`].text=PlayerHunterSystem.Table(goodsId ).general_name
                    this[`imageHuntername${i}`].source = cachekey(PlayerHunterSystem.Table(goodsId).name_pic, this);
                    this[`imageRank${i}`].source = cachekey(UIConfig.UIConfig_General.hunter_grade[aptitude], this);
                    this[`imagebackground${i}`].source = cachekey(UIConfig.UIConfig_Tavern.tavernBoard[aptitude], this);

                    let path = PlayerHunterSystem.MapInstance(roleId).half_path
                    console.log(path);
                    this[`imageHunter${i}`].source = cachekey(path, this);
                    TavernPopA.GetNodeStarByAlignLeft(this[`groupStar${i}`], PlayerHunterSystem.Table(goodsId).init_star, CommonConfig.general_max_star, 0.8, null, UIConfig.UIConfig_Role.heroAwakenStar[1], null);

                }
            }

            //this.setInfoAni(1); 
        }

        public setInfoAni(i: number) {
            if (i > this.num) {
                this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnone, this);
                this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
                this.btnOne.enabled = true;
                this.btnMore.enabled = true;
                return;
            };
            let display = this.groupArray[i - 1];
            egret.Tween.get(display)
                .call(() => { display.visible = true; })
                .to({ scaleY: 3, scaleX: 3 }, 0)
                .to({ scaleY: 0.95, scaleX: 0.95 }, 150, egret.Ease.quadIn)
                .call(() => { this.addAnimatoin("ui_jiuguan_sudashui_new", "000_lan", 1, display) })
                //.to({alpha: 0}, 100)
                .call(() => { this.onFadingin(i) })
                .to({ scaleY: 1.03, scaleX: 1.03 }, 100, egret.Ease.quadIn)
                //.to({alpha: 1}, 100)
                .to({ scaleY: 1, scaleX: 1 }, 150, egret.Ease.sineInOut)
                .call(() => { console.log(i++); this.setInfoAni(i++); }, this);
        }

        public onFadingin(i: number) {
            let display = this[`groupImage${i}`];
            egret.Tween.get(display)
                .to({ alpha: 0 })
                .to({ alpha: 1 }, 100)
        }

        //返回
        public onBtnone() {
            this.tavern.removeEvent();
            this.close();
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2
                    //display.y =this.height*0.25;
                    display.y = group.explicitHeight / 2;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        //再喝多少杯
        public onBtnMore() {
            egret.Tween.get(this)
                .call(() => {
                    //this.tavern.removeChild(this);
                    this.close();
                })
                .wait(1000, true)
                .call(() => {
                    // this.tavern.removeEvent();
                    if (Game.PlayerInfoSystem.Soda >= 2) {
                        this.tavern.onBtnxxxSoda(this.sodaNum)
                    } else {
                        this.tavern.onBtnDrinkOneSoda();
                    }
                });
            //this.setInfoAni(1);
        }
    }

}