namespace zj {
    //Tavern PopA
    //hexiaowei
    //2018/11/15
    export class TavernPopA extends UI {
        private groupArray: [eui.Group];
        private groupSum: eui.Group;
        private btnOne: eui.Button; //  返回
        private btnMore: eui.Button; // 再喝十杯
        private group1: eui.Group;
        private group2: eui.Group;
        private group3: eui.Group;
        private group4: eui.Group;
        private group5: eui.Group;
        private group6: eui.Group;
        private group7: eui.Group;
        private group8: eui.Group;
        private group9: eui.Group;
        private group10: eui.Group;
        private groupBtn: eui.Group;
        private labelBeel10: eui.Label;
        private imagebackground1: eui.Image;
        private imageHunter1: eui.Image;
        private rectMask1: eui.Rect;
        private imageHuntername1: eui.Image;
        private imageRank1: eui.Image;
        private imageStar1_1: eui.Image;
        private imageStar1_2: eui.Image;

        private imagebackground2: eui.Image;
        private imageHunter2: eui.Image;
        private rectMask2: eui.Rect;
        private imageHuntername2: eui.Image;
        private imageRank2: eui.Image;
        private imageStar2_1: eui.Image;
        private imageStar2_2: eui.Image;

        private imagebackground3: eui.Image;
        private imageHunter3: eui.Image;
        private rectMask3: eui.Rect;
        private imageHuntername3: eui.Image;
        private imageRank3: eui.Image;
        private imageStar3_1: eui.Image;
        private imageStar3_2: eui.Image;

        private imagebackground4: eui.Image;
        private imageHunter4: eui.Image;
        private rectMask4: eui.Rect;
        private imageHuntername4: eui.Image;
        private imageRank4: eui.Image;
        private imageStar4_1: eui.Image;
        private imageStar4_2: eui.Image;

        private imagebackground5: eui.Image;
        private imageHunter5: eui.Image;
        private rectMask5: eui.Rect;
        private imageHuntername5: eui.Image;
        private imageRank5: eui.Image;
        private imageStar5_1: eui.Image;
        private imageStar5_2: eui.Image;

        private imagebackground6: eui.Image;
        private imageHunter6: eui.Image;
        private rectMask6: eui.Rect;
        private imageHuntername6: eui.Image;
        private imageRank6: eui.Image;
        private imageStar6_1: eui.Image;
        private imageStar6_2: eui.Image;

        private imagebackground7: eui.Image;
        private imageHunter7: eui.Image;
        private rectMask7: eui.Rect;
        private imageHuntername7: eui.Image;
        private imageRank7: eui.Image;
        private imageStar7_1: eui.Image;
        private imageStar7_2: eui.Image;

        private imagebackground8: eui.Image;
        private imageHunter8: eui.Image;
        private rectMask8: eui.Rect;
        private imageHuntername8: eui.Image;
        private imageRank8: eui.Image;
        private imageStar8_1: eui.Image;
        private imageStar8_2: eui.Image;

        private imagebackground9: eui.Image;
        private imageHunter9: eui.Image;
        private rectMask9: eui.Rect;
        private imageHuntername9: eui.Image;
        private imageRank9: eui.Image;
        private imageStar9_1: eui.Image;
        private imageStar9_2: eui.Image;

        private imagebackground10: eui.Image;
        private imageHunter10: eui.Image;
        private rectMask10: eui.Rect;
        private imageHuntername10: eui.Image;
        private imageRank10: eui.Image;
        private imageStar10_1: eui.Image;
        private imageStar10_2: eui.Image;

        private groupStar1: eui.Group;
        private groupStar2: eui.Group;
        private groupStar3: eui.Group;
        private groupStar4: eui.Group;
        private groupStar5: eui.Group;
        private groupStar6: eui.Group;
        private groupStar7: eui.Group;
        private groupStar8: eui.Group;
        private groupStar9: eui.Group;
        private groupStar10: eui.Group;

        private groupImage1: eui.Group
        private groupImage2: eui.Group
        private groupImage3: eui.Group
        private groupImage4: eui.Group
        private groupImage5: eui.Group
        private groupImage6: eui.Group
        private groupImage7: eui.Group
        private groupImage8: eui.Group
        private groupImage9: eui.Group
        private groupImage10: eui.Group

        private taverninfo: any;
        private aptitudeList: Array<number> = [];
        private tavern: TavernScene;
        private vis: boolean = true;
        public constructor() {
            super();
            this.skinName = "resource/skins/tavern/TavernPopASkin.exml";
            //this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ButtonClose, this);
            this.btnOne.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnone, this);
            this.btnMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnMore, this);
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            this.info();
        }

        public init(tavern, vis) {
            this.tavern = tavern;
            this.vis = vis;
        }

        private info() {
            this.group1.visible = false;
            this.group2.visible = false;
            this.group3.visible = false;
            this.group4.visible = false;
            this.group5.visible = false;
            this.group6.visible = false;
            this.group7.visible = false;
            this.group8.visible = false;
            this.group9.visible = false;
            this.group10.visible = false;
            this.groupBtn.visible = false;
            this.btnMore.visible = false;
            this.labelBeel10.visible = false;
            this.groupImage1.alpha = 0;
            this.groupImage2.alpha = 0;
            this.groupImage3.alpha = 0;
            this.groupImage4.alpha = 0;
            this.groupImage5.alpha = 0;
            this.groupImage6.alpha = 0;
            this.groupImage7.alpha = 0;
            this.groupImage8.alpha = 0;
            this.groupImage9.alpha = 0;
            this.groupImage10.alpha = 0;
            this.groupArray = [
                this.group1,
                this.group2,
                this.group3,
                this.group4,
                this.group5,
                this.group6,
                this.group7,
                this.group8,
                this.group9,
                this.group10
            ];
            this.imageHunter1.mask = this.rectMask1;
            this.imageHunter2.mask = this.rectMask2;
            this.imageHunter3.mask = this.rectMask3;
            this.imageHunter4.mask = this.rectMask4;
            this.imageHunter5.mask = this.rectMask5;
            this.imageHunter6.mask = this.rectMask6;
            this.imageHunter7.mask = this.rectMask7;
            this.imageHunter8.mask = this.rectMask8;
            this.imageHunter9.mask = this.rectMask9;
            this.imageHunter10.mask = this.rectMask10;
        }

        public setInfo(info) {
            this.taverninfo = info;
            for (const k in info) {
                if (info.hasOwnProperty(k)) {
                    if (PlayerItemSystem.ItemType(info[1].goodsId) == message.EGoodsType.GOODS_TYPE_GENERAL) {
                        const v = info[k];
                        let table = PlayerHunterSystem.Table(v.goodsId);
                        if (table) {
                            if (table.aptitude >= 13) {
                                console.log(k + "kaishi");
                                this.aptitudeList.push(Number(k));
                            }
                        } else {
                            console.error("这是抽到了啥：" + v.goodsId);
                        }
                    }
                }
            }
            //this.imageHuntername1.source=PlayerHunterSystem.Table(info[0].goodsId).name_pic;
            for (let i = 1; i <= 10; i++) {

                let index = i - 1;
                if (index < this.taverninfo.length) {
                    let goodsId = info[index].goodsId
                    let aptitude = PlayerHunterSystem.Table(goodsId).aptitude
                    //this.aptitudeList.push(aptitude);
                    let roleId = PlayerHunterSystem.Table(goodsId).general_roleId
                    //this[`labelHuntername${i}`].text=PlayerHunterSystem.Table(goodsId ).general_name
                    let imageHuntername = PlayerHunterSystem.Table(goodsId).name_pic;
                    let imageRank = UIConfig.UIConfig_General.hunter_grade[aptitude];
                    let imagebackground = UIConfig.UIConfig_Tavern.tavernBoard[aptitude];
                    let imageHunter = PlayerHunterSystem.MapInstance(roleId).half_path;

                    this[`imageHuntername${i}`].source = cachekey(imageHuntername, this);
                    this[`imageRank${i}`].source = cachekey(imageRank, this);
                    this[`imagebackground${i}`].source = cachekey(imagebackground, this);
                    this[`imageHunter${i}`].source = cachekey(imageHunter, this);
                    TavernPopA.GetNodeStarByAlignLeft(this[`groupStar${i}`], PlayerHunterSystem.Table(goodsId).init_star, CommonConfig.general_max_star, 0.8, null, UIConfig.UIConfig_Role.heroAwakenStar[1], null);
                }
            }
        }

        //十连抽播放动画
        public setInfoAni(ind_times: number) {
            let infonew: number = 0;
            if (ind_times > 10) {
                this.tavern.onTavernget();
                this.groupBtn.visible = true;
                if (this.vis) {
                    if (Game.PlayerInfoSystem.Rum >= 10) {
                        this.btnMore.visible = true;
                        this.labelBeel10.visible = true;
                    } else {
                        this.groupBtn.horizontalCenter = 0;
                        this.btnOne.horizontalCenter = 0;
                    }
                } else {
                    if (Game.PlayerInfoSystem.Beer >= 10) {
                        this.btnMore.visible = true;
                        this.labelBeel10.visible = true;
                    } else {
                        this.groupBtn.horizontalCenter = 0;
                        this.btnOne.horizontalCenter = 0;
                    }
                }

                return;
            };
            let display = this.groupArray[ind_times - 1];
            //display.visible = true;    //   -------------------------
            egret.Tween.get(display)
                .call(() => { display.visible = true; })
                .to({ scaleY: 3, scaleX: 3 }, 0)
                .to({ scaleY: 0.95, scaleX: 0.95 }, 150, egret.Ease.quadIn)

                .call(() => {
                    for (let m = 0; m <= this.aptitudeList.length; m++) {
                        if (ind_times == (this.aptitudeList[m] + 1)) {
                            let goodsId = this.taverninfo[this.aptitudeList[m]].goodsId;
                            infonew = PlayerHunterSystem.Table(goodsId).aptitude;
                            break;
                        }
                    }
                    if (infonew == 13) {
                        this.addAnimatoin("ui_jiuguan_sudashui_new", "001_zi", 1, display);
                        this.addAnimatoin("ui_jiuguan_sudashui_new", "004_zi_xunhuan", 0, display);
                    } else if (infonew == 14) {
                        this.addAnimatoin("ui_jiuguan_sudashui_new", "002_cheng", 1, display);
                        this.addAnimatoin("ui_jiuguan_sudashui_new", "005_cheng_xunhuan", 0, display);
                    } else {
                        this.addAnimatoin("ui_jiuguan_sudashui_new", "000_lan", 1, display);
                    }
                })
                //this.onFadingin(ind_times);   //   -------------------------
                .call(() => { this.onFadingin(ind_times) })
                .to({ scaleY: 1, scaleX: 1 }, 100, egret.Ease.quadIn)
                //.to({alpha: 1}, 100)
                .to({ scaleY: 0.85, scaleX: 0.85 }, 150, egret.Ease.sineInOut)

                .call(() => {
                    for (let m = 0; m <= this.aptitudeList.length; m++) {
                        if (ind_times == (this.aptitudeList[m] + 1)) {
                            let goodsId = this.taverninfo[this.aptitudeList[m]].goodsId;

                            this.tavern.test(() => { this.setInfoAni(ind_times + 1); }, this, goodsId);
                            return;
                        }
                    }

                    if (ind_times == 10) {
                        this.tavern.onEarnPoint(1);
                        this.groupBtn.visible = true;
                        // if (Game.PlayerInfoSystem.Beer >= 10) {
                        //     this.btnMore.visible = true;
                        //     this.labelBeel10.visible = true;
                        // } else {
                        //     this.groupBtn.horizontalCenter = 0;
                        //     this.btnOne.horizontalCenter = 0;
                        // }
                        if (this.vis) {
                            if (Game.PlayerInfoSystem.Rum >= 10) {
                                this.btnMore.visible = true;
                                this.labelBeel10.visible = true;
                            } else {
                                this.groupBtn.horizontalCenter = 0;
                                this.btnOne.horizontalCenter = 0;
                            }
                        } else {
                            if (Game.PlayerInfoSystem.Beer >= 10) {
                                this.btnMore.visible = true;
                                this.labelBeel10.visible = true;
                            } else {
                                this.groupBtn.horizontalCenter = 0;
                                this.btnOne.horizontalCenter = 0;
                            }
                        }
                        return;
                    }
                    else {
                        this.setInfoAni(ind_times + 1);
                    }

                }, this);
        }

        //添加龙骨动画
        public addAnimatoin(dbName: string, animationName: string, playTimes: number, group: eui.Group, armatureName: string = "armatureName") {
            Game.DragonBonesManager.playAnimation(this, dbName, armatureName, animationName, playTimes)
                .then(display => {
                    display.x = group.explicitWidth / 2
                    display.y = group.explicitHeight / 2;
                    // display.animation.timeScale = 2;
                    group.addChild(display);
                })
                .catch(reason => {
                    toast(reason);
                });
        }

        public onFadingin(i: number) {
            let display = this[`groupImage${i}`];
            egret.Tween.get(display)
                .to({ alpha: 0 })
                .to({ alpha: 1 }, 100)
        }

        //返回
        public onBtnone() {
            // this.tavern.removeEvent();
            this.close();
        }

        //再喝十杯
        public onBtnMore() {
            this.tavern.AddEvent();
            egret.Tween.removeTweens(this);
            egret.Tween.get(this)
                .call(() => {
                    this.close();
                    //this.tavern.removeChild(this); 
                })
                .wait(1000, true)
                .call(() => {
                    if (this.vis) {
                        this.tavern.onBtnDrinkAnother10Run()
                    } else {
                        this.tavern.onBtnDrinkAnother10Beel()
                    }
                });
            //this.setInfoAni(1);
        }

        /**
        * 获取在直线上的点
        * 
        * @param positionCenter 中心点坐标
        * @param gap 两点的间距
        * @param num 数量
        * @param angle 角度
        */
        public static GetLinePosition(centerX: number, centerY: number, gap, num, angle = 0) {
            // console.log("\n---- centerX = ", centerX, "centerY = ", centerY, " gap = ", gap, " num = ", num);
            let ret: Array<egret.Point> = [];
            for (let i = 0; i < num; i++) {
                let pos = new egret.Point();
                pos.x = centerX + gap * i;
                //pos.y = centerY + gap * i * Math.tan(this.DegreeToRadian(angle));
                ret.push(pos);
            }
            return ret;
        }

        /**
         * 居左对齐星星
         * @param node 星星节点
         * @param star 显示星星个数
         * @param maxStar 最大显示个数
         * @param scale 缩放
         * @param showDark 是否显示暗星
         * @param lightStarPath 亮星路径
         * @param darkStarPath 暗星路径
         */

        public static GetNodeStarByAlignLeft(node: eui.Group, star, maxStar?, scale?, showDark = false, lightStarPath = null, darkStarPath = null) {
            node.removeChildren();

            scale = (scale != null) ? scale : node.scaleX;
            maxStar = (maxStar != null) ? maxStar : CommonConfig.general_max_star;
            //star = (maxStar < star) ? maxStar : star;
            let showStarNum = showDark ? maxStar : star;
            lightStarPath = (lightStarPath != null) ? lightStarPath : UIConfig.UIConfig_Role.starOnNew;
            let mn = (node.width - 18 * star) / 2 - 5;
            darkStarPath = (darkStarPath != null) ? darkStarPath : UIConfig.UIConfig_Role.heroAwakenStar[0];
            let gap = node.width / (maxStar - 1);
            let centerPos = new egret.Point((node.width) / 2, node.height / 2);
            let posList = this.GetLinePosition(mn, centerPos.y, 18, star);
            for (let i = 0; i < showStarNum; i++) {
                let img = new eui.Image();
                img.source = (i < star) ? lightStarPath : darkStarPath;
                img.x = posList[i].x;
                img.y = 0;
                if (i < star) {
                    node.addChild(img);
                } else {
                    if (showDark == true) {
                        node.addChild(img);
                    }
                }
                img.scaleX = scale;
                img.scaleY = scale;
                //img.anchorOffsetX = img.width/2;
                //img.anchorOffsetY = img.height/2;
            }
        }
    }

}