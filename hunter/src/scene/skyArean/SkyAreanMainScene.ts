namespace zj {
    //SkyAreanMainScene
    //wangshenzhuo
    //天空竞技场
    // 2019/02/23
    export class SkyAreanMainScene extends Scene {
        private floorInfo: any;

        private imgBackBoard2: eui.Image;
        private scrollerInfo: eui.Scroller;
        private liatLayer: eui.List;
        private buttonChange: eui.Button;
        private labelTier: eui.BitmapLabel;
        private imgRank: eui.Image;
        private labelRank: eui.BitmapLabel;
        private playerFrame: eui.Image;
        private playerIcon: eui.Image;
        private playerName: eui.Label;
        private labelPlayerTier: eui.BitmapLabel;
        private listRankingAward: eui.List;
        private listPassAward: eui.List;
        private listBossSkill: eui.List;
        private listRanking: eui.List;
        private energy: eui.Image;
        private labelGemstone: eui.Label;
        private buttonAdd: eui.Button;
        private btnRule: eui.Button;
        private btnClose: eui.Button;
        private labelaward: eui.Label;


        private LayerlastItem: eui.ArrayCollection;
        private LayerlastIndex: number = 0;

        public constructor() {
            super();
            this.skinName = "resource/skins/skyArean/SkyAreanMainSkin.exml";
            this.width = UIManager.StageWidth;
            this.height = UIManager.StageHeight;
            if (this.width >= 1344) {
                this.imgBackBoard2.scaleX = this.width / 1334;
            }
            this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
            this.buttonAdd.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonAdd, this);
            this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonTipInfo, this);
            this.buttonChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonChange, this)
            /**监听体力变化 */
            Game.EventManager.on(GameEvent.PLAYER_POWER_CHANGE, this.Update, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.removeShow, this);
            Game.EventManager.on(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, () => {
                Game.EventManager.off(GameEvent.SHOW_GOODS_PROPERTY, this.showGoodsProperty, this);
            }, null);
            this.Init();
        }

        public SetInfo() {
        }

        public Init() {
            this.floorInfo = PlayerTowerSystem.floorInfo();
            this.SetInfoList();
            this.SetRankList();
            this.setFloorInfo();
            this.Update();
            this.buttonAward(PlayerTowerSystem.floorInfo()[0].length - Game.PlayerTowerSystem.towerInfo.towerCur);
        }

        /**加载排行List */
        private SetRankList() {

            Game.PlayerArenaSystem.rankItemInfo(4, 0, CommonConfig.rank_list_max - 1).then((body: message.RankItemsZip) => {
                // console.log("--- body = ", body);
                let lastIndex = body.rankItemsInfo.length - 1;
                let value = body.rankItemsInfo[lastIndex].value;
                // this.labelValue.text = "当前层数：" + (value);
                let itemsInfo = (body.rankItemsInfo);
                if (itemsInfo.length == 0) return;
                let rank = itemsInfo[lastIndex].rank;
                if (rank == 0) {
                    this.imgRank.visible = true;
                    this.labelRank.visible = false;
                } else {
                    this.imgRank.visible = false;
                    this.labelRank.visible = true;
                    this.labelRank.text = rank.toString()
                }
                //知道自己排名后加载排名奖励
                this.setjiangli(rank);

                let info = Game.PlayerInfoSystem.BaseInfo as message.RoleBaseInfo;
                this.playerName.text = info.name;
                this.playerFrame.source = cachekey(PlayerItemSystem.ItemPath(info.picFrameId), this);
                this.playerIcon.source = cachekey(TableItemPic.Item(info.picId).path, this);
                this.labelPlayerTier.text = "第" + value + "层";

                itemsInfo.splice(lastIndex, 1);
                let array = new eui.ArrayCollection();
                for (let i = 0; i < itemsInfo.length; i++) {
                    let data = new SkeArenaRankItemData();
                    data.index = 4;
                    data.info = itemsInfo[i];
                    array.addItem(data);
                }
                this.listRanking.dataProvider = array;
                this.listRanking.itemRenderer = SkeArenaRankItem;
            });
        }

        /**排名奖励 */
        private setjiangli(n: number) {
            let info;
            this.labelaward.visible = false;
            if (n == 0) {
                this.labelaward.visible = true;
                return;
            } else if (n == 1 || n == 2 || n == 3) {
                info = TableTowerRankReward.Item(n);
            } else if (n >= 4 && n <= 20) {
                info = TableTowerRankReward.Item(4);
            } else if (n >= 21 && n <= 100) {
                info = TableTowerRankReward.Item(5);
            }
            let goods = [];
            for (let i = 0; i < info.tower_rank_good_id.length; i++) {
                let a = new message.GoodsInfo();
                a.goodsId = info.tower_rank_good_id[i];
                a.count = info.tower_rank_good_count[i];
                goods.push(a);
            }
            let array = new eui.ArrayCollection();
            for (let i = 0; i < goods.length; i++) {
                let data = new SkyAreanMainAwardItemData();
                data.father = this;
                data.index = i;
                data.good = goods[i];
                data.goodsId = goods[i].goodsId;
                array.addItem(data);
            }
            this.listRankingAward.dataProvider = array;
            this.listRankingAward.itemRenderer = SkyAreanMainAwardItem;
        }

        private SetFloorInfo(index) {
            let floor_info = PlayerTowerSystem.Item(index);
            let feature = null;
            let bodySpxId = null;
            let scale = null;

            feature = floor_info.feature[Game.PlayerInstanceSystem.MonsterTowerIndex % 2];
            bodySpxId = TableMapRole.Item(floor_info.boss_roleId[Game.PlayerInstanceSystem.MonsterTowerIndex % 2]).body_spx_id;
            scale = TableMapRole.Item(floor_info.boss_roleId[Game.PlayerInstanceSystem.MonsterTowerIndex % 2]).spine_scale;

            let reward = [];
            for (const k in floor_info.reward_good_id) {
                const v = floor_info.reward_good_id[k];
                let good = new message.GoodsInfo;
                good.goodsId = v;
                good.showType = floor_info.reward_good_show_type[k];
                good.count = floor_info.reward_good_count[k];
                reward.push(good);
            }
            let a = PlayerTowerSystem.floorInfo()[0][index - 1];
            let good = new message.GoodsInfo;
            good.goodsId = a.first_reward[0][0];
            good.count = a.first_reward[0][1];
            reward.push(good);

            //第几层
            this.labelTier.text = Helper.StringFormat(TextsConfig.TextConfig_Tower.floor, index);

            this.SetFloorReward(reward);
            //boss技能
            this.listBossSkill.selectedIndex = 0; // 默认选中
            this.listBossSkill.itemRenderer = WantedSecondStartItem;//

            let startItem = new eui.ArrayCollection();
            for (let i = 0; i < feature.length; i++) {
                let boosTalent = new WantedSecondStartItemData();
                boosTalent.father = this;
                boosTalent.index = i;
                boosTalent.talent = feature[i];
                startItem.addItem(boosTalent);
            }

            this.listBossSkill.dataProvider = startItem;
        }

        // //掉落
        private SetFloorReward(goods) {
            //     //掉落奖励
            this.listPassAward.selectedIndex = 0; // 默认选中
            this.listPassAward.itemRenderer = SkyAreanMainAwardItem;//
            let skyAreanItem = new eui.ArrayCollection();
            for (let i = 0; i < goods.length; i++) {
                let data = new SkyAreanMainAwardItemData();
                data.father = this;
                data.index = i;
                data.good = goods[i];
                data.goodsId = goods[i].goodsId;
                skyAreanItem.addItem(data);
            }

            this.listPassAward.dataProvider = skyAreanItem;

        }

        private Update() {
            let str = "";
            if (Game.PlayerInfoSystem.Power > 100000) {
                if (((Game.PlayerInfoSystem.Power / 1000) >>> 0) % 10 == 0) {
                    str += ((Game.PlayerInfoSystem.Power / 10000) >>> 0) + "万";
                } else {
                    str += (Game.PlayerInfoSystem.Power / 10000).toFixed(1) + "万";
                }
            } else {
                str += Game.PlayerInfoSystem.Power.toString();
            }
            let str_energy = Helper.StringFormat("%d/%d", str, (TableLevel.Item(Game.PlayerInfoSystem.Level).role_power + PlayerVIPSystem.LowLevel().power_add));
            this.labelGemstone.text = str_energy;
        }

        private SetInfoList() {
            let floorsInfo = [];
            floorsInfo = this.floorInfo[0];
            this.liatLayer.selectedIndex = floorsInfo.length - Game.PlayerTowerSystem.towerInfo.towerCur;// 默认选中
            if (this.liatLayer.selectedIndex <= 0) {
                this.liatLayer.selectedIndex = 0;
            }
            this.liatLayer.itemRenderer = SkyAreanMainItem;
            this.LayerlastItem = new eui.ArrayCollection();

            floorsInfo.sort(function (a: any, b: any) { return b.id - a.id });
            floorsInfo.splice(0, 0, null);
            for (let i = 0; i < Math.floor((floorsInfo.length) / 2) + 1; i++) {
                let data = new SkyAreanMainItemData();
                data.father = this;
                data.index = (floorsInfo.length) / 2 - 1 - i;
                data.info = floorsInfo[1 + i * 2];
                data.info1 = floorsInfo[i * 2];
                data.father = this;
                this.LayerlastItem.addItem(data);
            }

            this.liatLayer.dataProvider = this.LayerlastItem;
            this.LayerlastIndex = this.liatLayer.selectedIndex;

            this.scrollerInfo.viewport = this.liatLayer;
            this.scrollerInfo.validateNow();

            let index = (this.LayerlastIndex) * (229 / 2) - 70;
            if (index > 0) {
                this.scrollerInfo.viewport.scrollV = index;
            } else {
                this.scrollerInfo.viewport.scrollV = 0;
            }
        }

        //点击竞技场层主
        public buttonAward(index) {
            if (this.LayerlastIndex == index) {
                return;
            }
            if (this.LayerlastIndex != index) {
                this.LayerlastItem.itemUpdated(this.LayerlastItem.source[this.LayerlastIndex]);
                this.LayerlastItem.itemUpdated(this.LayerlastItem.source[this.liatLayer.selectedIndex]);
                this.LayerlastIndex = index;
            }

            this.setFloorInfo();
            this.SetInfo();
        }

        private setFloorInfo() {
            let floorsInfo = [];
            floorsInfo = PlayerTowerSystem.floorInfo()[0];
            floorsInfo.sort(function (a: any, b: any) { return b.id - a.id });

            let index = floorsInfo[this.LayerlastIndex].id;
            this.SetFloorInfo(index);
        }

        private onButtonClose() {
            this.close(UI.HIDE_TO_TOP);
        }


        //长按 技能 详情
        private showGoodsProperty(ev: egret.Event) {
            if (Game.UIManager.dialogCount() != 0) {
                return;
            }
            if (ev.data.info.talent) {
                let show = TipManager.ShowTalent(ev.data.info.talent, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            } else if (ev.data.info) {
                let show = TipManager.ShowProp(ev.data.info.good || ev.data.info, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            } else {
                let show = TipManager.ShowProp(ev.data, this, ev.data.xy, ev.data.cx, ev.data.cy);
                show.name = "Talenttouch";
                this.addChild(show);
            }
        }

        // 长按 技能 抬起
        private removeShow() {
            let show = this.getChildByName("Talenttouch");
            if (show) {
                this.removeChild(show);
            }
        }

        /**规则说明 */
        private onButtonTipInfo() {
            loadUI(Common_RuleDialog)
                .then((dialog: Common_RuleDialog) => {
                    dialog.init(RuleConfig.tower);
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }
        /**体力 */
        private onButtonAdd() {
            loadUI(HXH_HunterUserStrength)
                .then((dialog: HXH_HunterUserStrength) => {
                    dialog.SetInfo();
                    dialog.show(UI.SHOW_FROM_TOP);
                });
        }

        //跳转战斗
        private onButtonChange() {
            if (PlayerTowerSystem.floorInfo()[0].length - this.LayerlastIndex > Game.PlayerTowerSystem.towerInfo.towerCur) {
                toast_warning("未解锁");
                return;
            } else if (PlayerTowerSystem.floorInfo()[0].length - this.LayerlastIndex < Game.PlayerTowerSystem.towerInfo.towerCur) {
                toast_warning("已挑战");
                return;
            }
            let formate_type = 5
            let floor = Game.PlayerTowerSystem.towerInfo.towerCur;
            this.MobsInfo_Visit()
                .then((msg: message.TowerInfo) => {
                    Game.PlayerTowerSystem.towerType = 1;
                    Game.PlayerInstanceSystem.curInstanceType = 5;
                    loadUI(CommonFormatePveMain)
                        .then((dialog: CommonFormatePveMain) => {
                            dialog.show(UI.SHOW_FROM_TOP);
                            dialog.setInfo(floor);
                        });
                })
                .catch(reason => { toast_warning(reason) });
        }

        public MobsInfo_Visit() {
            return new Promise((resolve, reject) => {
                let formate_type = 5;
                let floor = Game.PlayerTowerSystem.towerInfo.towerCur; //第几层
                let request = new message.MobsInfoRequest();
                request.body.battleType = formate_type;
                request.body.mobsId = floor;
                Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                    let response = <message.MobsInfoResponse>resp;
                    console.log(response);
                    if (response.header.result != 0) {
                        return;
                    }
                    resolve(response);
                    return;
                }, (req: aone.AoneRequest): void => {
                    reject(LANG("请求超时"));
                    return;
                }, this, false);
                return;
            });
        }
    }
}