var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var zj;
(function (zj) {
    // created by hhh in 2018/11/14
    /************** 碎片界面 ****************/
    var CardCompose = (function (_super) {
        __extends(CardCompose, _super);
        function CardCompose() {
            var _this = _super.call(this) || this;
            _this.imageExpBarWidth = 0;
            _this.isFirstOpen = true;
            _this.listCardChipData = new eui.ArrayCollection();
            _this.cardComposeGoods = [];
            _this.curSel = 0;
            _this.lastSel = 0;
            _this.curTbl = null;
            _this.pieceTbl = null;
            _this.listAttriData = new eui.ArrayCollection();
            _this.cardType = 1;
            _this.skinName = "resource/skins/card/CardComposeSkin.exml";
            _this.width = zj.UIManager.StageWidth;
            _this.height = zj.UIManager.StageHeight;
            // 碎片遮罩
            _this.imgMask = new eui.Image;
            _this.imgMask.source = zj.cachekey(zj.UIConfig.UIConfig_Role.mask.soul, _this);
            _this.imgMask.horizontalCenter = 0;
            _this.imgMask.verticalCenter = 0;
            _this.groupAnimate.addChild(_this.imgMask);
            _this.imgMask.visible = false;
            _this.init();
            return _this;
        }
        CardCompose.prototype.init = function () {
            var _this = this;
            this.labelMainAttriConst.text = zj.LANG("主属性：");
            this.labelDeputyAttriConst.text = zj.LANG("副属性：");
            this.labelRealConst.text = zj.LANG("稀有度：");
            this.imageExpBarWidth = this.imageExpBar.width;
            this.listCardChip.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onCardSelChange, this);
            this.btnCompose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnCompose, this);
            this.btnAddCardChip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnAddCardChip, this);
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0)
                .then(function (display) {
                display.skewY = 180;
                display.x = _this.groupSelectLeft.width / 2;
                display.y = _this.groupSelectLeft.height / 2;
                _this.groupSelectLeft.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            zj.Game.DragonBonesManager.playAnimation(this, "anniu_yidong", "armatureName", null, 0)
                .then(function (display) {
                display.x = _this.groupSelectRight.width / 2;
                display.y = _this.groupSelectRight.height / 2;
                _this.groupSelectRight.addChild(display);
            })
                .catch(function (reason) {
                zj.toast(reason);
            });
            this.setUI();
        };
        CardCompose.prototype.setUI = function () {
            this.cardComposeGoods = zj.PlayerCardSystem.GetComposeTbl();
            this.curSel = 0;
            if (this.curTbl != null && this.pieceTbl != null) {
                for (var k in this.cardComposeGoods) {
                    var v = this.cardComposeGoods[k];
                    if (v.need_ids[0] == this.pieceTbl.id) {
                        this.curSel = Number(k);
                        break;
                    }
                }
            }
            this.curSel = this.curSel || 0;
            this.lastSel = this.curSel;
            this.setBottomList();
        };
        // 物品遮罩
        CardCompose.prototype.isImgMask = function (goodsId) {
            if (zj.PlayerItemSystem.ItemType(goodsId) == 4
                || zj.TableEnum.Enum.PropCardPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropAdviserPiece.indexOf(goodsId) != -1
                || zj.TableEnum.Enum.PropPotatoPiece.indexOf(goodsId) != -1
                || Math.floor(goodsId / 1000) == 37
                || zj.TableEnum.Enum.PropRole.indexOf(goodsId) != -1) {
                return true; //UIConfig.UIConfig_Role.mask.soul
            }
            return false;
        };
        CardCompose.prototype.setBottomList = function () {
            this.listCardChip.itemRenderer = zj.CardComposeItem;
            this.listCardChipData.source = this.cardComposeGoods;
            this.listCardChip.dataProvider = this.listCardChipData;
            this.listCardChip.selectedIndex = this.curSel;
            this.setBigCard(this.curSel);
            this.setPieceInfo(this.curSel);
            this.scrollList(this.getCardIndex(this.cardComposeGoods[this.curSel].product_id));
        };
        CardCompose.prototype.getCardIndex = function (id) {
            var index = -1;
            if (id == null || id == undefined || id == 0) {
                return index;
            }
            for (var i = 0; i < this.listCardChipData.length; i++) {
                var data = this.listCardChipData.getItemAt(i);
                if (data.product_id != null && data.product_id === id) {
                    index = i;
                }
            }
            return index;
        };
        CardCompose.prototype.scrollList = function (selectedIndex) {
            if (selectedIndex < 0) {
                selectedIndex = 0;
            }
            if (selectedIndex >= 6) {
                var item = new zj.CardComposeItem();
                var gap = 0;
                var scrollWidth = (item.width + gap) * selectedIndex;
                if (selectedIndex > this.cardComposeGoods.length - 6)
                    scrollWidth = (item.width + gap) * (this.cardComposeGoods.length - 6);
                egret.Tween.get(this.listCardChip)
                    .to({ scrollH: scrollWidth }, 350, egret.Ease.backIn);
            }
        };
        CardCompose.prototype.setBigCard = function (index) {
            if (this.cardComposeGoods[index].randomCard == 0) {
                this.cardType = 1;
                this.imageCardType.visible = true;
                this.groupFull.visible = true;
                this.groupAddAttri.visible = true;
                this.groupRandom.visible = false;
                var itemId = this.cardComposeGoods[index].product_id;
                this.pieceTbl = zj.TableItemProp.Item(this.cardComposeGoods[index].need_ids[0]);
                this.curTbl = zj.TableItemPotato.Item(itemId);
                var _a = zj.PlayerCardSystem.GetItemFrame(itemId), _ = _a[0], bigFramePic = _a[1], __ = _a[2];
                var baseAttri = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, this.curTbl.star, 1)[0];
                this.labelMainAttribute.text = baseAttri[0];
                this.labelCardName.text = this.curTbl.name;
                this.labelCardNum.text = this.curTbl.num;
                this.labelLevel.text = "1";
                this.labelCardDes.text = this.curTbl.des;
                var baseAttriFull = zj.PlayerCardSystem.GetCardBaseAttri(this.curTbl.id, zj.CommonConfig.card_max_star, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1])[1];
                this.labelMaxAttribute.text = zj.HelpUtil.textConfigFormat(zj.TextsConfig.TextsConfig_Hunter.card_full_attr, zj.CommonConfig.card_star_max_level[zj.CommonConfig.card_star_max_level.length - 1], baseAttriFull[0]);
                var imgCardPicPath = this.curTbl.paths;
                var imgCardTypePath = zj.UIConfig.UIConfig_Hunter_Card.card_type_small[this.curTbl.type - 1];
                var imgRarePath = zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[this.curTbl.rarity - 1];
                var imgCardFramePath = bigFramePic;
                this.imageCardPic.source = zj.cachekey(imgCardPicPath, this);
                this.imageCardType.source = zj.cachekey(imgCardTypePath, this);
                this.imageRare.source = zj.cachekey(imgRarePath, this);
                this.imageCardFrame.source = zj.cachekey(imgCardFramePath, this);
                zj.Helper.SetStar(this.groupStar, this.curTbl.star, zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
                var addStr = zj.PlayerCardSystem.GetAddStrNotGet(this.curTbl);
                this.listAttriData.removeAll();
                for (var i = 0; i < addStr.length; i++) {
                    var itemData = new zj.CardAttriItemData();
                    itemData.index = i;
                    itemData.info = addStr[i];
                    itemData.width = this.scrollerAttribute.width;
                    itemData.type = 1;
                    itemData.isHideBG = true;
                    this.listAttriData.addItem(itemData);
                }
                this.listAttribute.dataProvider = this.listAttriData;
                this.listAttribute.itemRenderer = zj.CardAttriItem;
            }
            else {
                this.cardType = 2;
                this.imageCardType.visible = false;
                this.groupFull.visible = false;
                this.groupAddAttri.visible = false;
                this.groupRandom.visible = true;
                var cardInfo = zj.PlayerItemSystem.ItemConfig(this.cardComposeGoods[index].need_ids[0]);
                this.pieceTbl = zj.TableItemProp.Item(this.cardComposeGoods[index].need_ids[0]);
                var picRaity = zj.UIConfig.UIConfig_Hunter_Card.card_difficulty[Number(cardInfo.compose_rarity) - 1];
                var bigPath = zj.UIConfig.UIConfig_Role.cardFrame[cardInfo.compose_quality];
                this.labelCardNum.text = "X";
                this.labelCardName.text = cardInfo.compose_name;
                this.labelLevel.text = "1";
                this.labelCardDes.textFlow = zj.Util.RichText(cardInfo.extra);
                this.labelRandomCardDes.textFlow = zj.Util.RichText(cardInfo.otherDes);
                this.labelRandomCost.text = this.cardComposeGoods[index].need_counts[0] + "";
                this.imageCardGrade.source = zj.cachekey(picRaity, this);
                this.imageCardFrame.source = zj.cachekey(bigPath, this);
                this.imageCardPic.source = zj.cachekey(cardInfo.compose_path, this);
                this.cardPath = cardInfo.path;
                if (cardInfo.compose_purple != "")
                    zj.Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), zj.UIConfig.UIConfig_Hunter_Card.card_star_next, 0.7, 14);
                else
                    zj.Helper.SetStar(this.groupStar, Number(cardInfo.compose_star), zj.UIConfig.UIConfig_Hunter_Card.card_star, 0.7, 14);
            }
        };
        CardCompose.prototype.setPieceInfo = function (index) {
            // 此处动画改好后 需要将注释打开
            // Game.DragonBonesManager.playAnimation(this, "ui_tongyong_daojuguang", "001_daojuguang_02", null, 0)
            //     .then(display => {
            //         display.x =  this.groupIcon.width / 2;
            //         display.y = this.groupIcon.height / 2;
            //         this.groupIcon.addChild(display);
            //     })
            //     .catch(reason => {
            //         toast(reason);
            //     });
            var curTbl = this.cardComposeGoods[index];
            var strPercent = curTbl.have_counts[0] + "/" + curTbl.need_counts[0];
            var itemInfo = zj.PlayerItemSystem.ItemConfig(curTbl.need_ids[0]);
            this.imageBoard.source = zj.cachekey(zj.UIConfig.UIConfig_Soul[itemInfo.quality], this);
            if (this.cardType == 1) {
                this.imageSmallCard.source = zj.cachekey(this.curTbl.path, this);
                this.imageSmallCard.scaleX = 1;
                this.imageSmallCard.scaleY = 1;
                this.imageSmallCard.horizontalCenter = 3;
                this.imageSmallCard.verticalCenter = 0.5;
            }
            else {
                this.imageSmallCard.source = zj.cachekey(this.cardPath, this);
                this.imageSmallCard.scaleX = 0.7;
                this.imageSmallCard.scaleY = 0.8;
                this.imageSmallCard.horizontalCenter = 0;
                this.imageSmallCard.verticalCenter = -3;
            }
            if (this.isImgMask(curTbl.need_ids[0])) {
                this.imgMask.visible = true;
                this.imageSmallCard.mask = this.imgMask;
            }
            this.imageExpBar.width = curTbl.counts_per[0] * this.imageExpBarWidth;
            this.labelCardChipNum.text = strPercent;
        };
        CardCompose.prototype.onCardSelChange = function () {
            this.curSel = this.listCardChip.selectedIndex;
            this.setBigCard(this.curSel);
            this.setPieceInfo(this.curSel);
            this.lastSel = this.curSel;
            // let data = this.listCardChipData.getItemAt(this.curSel);
            // for (let i = 0; i < this.listCardChipData.length; i++) {
            //     if (i == this.listCardChip.selectedIndex) {
            //         data.isSel = true;
            //         this.listCardChipData.replaceItemAt(this.cardComposeGoods[this.curSel], this.listCardChip.selectedIndex);
            //     }
            //     else {
            //         data.isSel = false;
            //         this.listCardChipData.replaceItemAt(this.cardComposeGoods[i], i);
            //     }
            // }
        };
        CardCompose.prototype.onBtnCompose = function () {
            var _this = this;
            // Game.PlayerInfoSystem.playAnnouce = false
            if (this.cardComposeGoods[this.curSel] != null) {
                var itemId = this.cardComposeGoods[this.curSel].need_ids[0];
                zj.Game.PlayerCardSystem.cardCompose(itemId)
                    .then(function (value) {
                    _this.playBreakBag(value);
                })
                    .catch(function (reason) {
                    // Game.PlayerInfoSystem.playAnnouce = true;
                });
            }
        };
        CardCompose.prototype.playBreakBag = function (cardInfo) {
            var _this = this;
            zj.loadUI(zj.CardComposeEndDialog)
                .then(function (dialog) {
                dialog.playAni(cardInfo[0], _this);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        CardCompose.prototype.onBtnAddCardChip = function () {
            var _this = this;
            var cb = function () {
                var getId = _this.cardComposeGoods[_this.curSel].product_id;
                var canCompose = 1;
                for (var k in _this.cardComposeGoods[_this.curSel].need_ids) {
                    var havaCount = zj.PlayerItemSystem.Count(_this.cardComposeGoods[_this.curSel].need_ids[k]);
                    var needCounts = _this.cardComposeGoods[_this.curSel].need_counts[k];
                    var perCounts = havaCount / needCounts >= 1 ? 1 : havaCount / needCounts;
                    _this.cardComposeGoods[_this.curSel].have_counts[k] = havaCount;
                    if (_this.cardComposeGoods[_this.curSel].can_compose && needCounts != null && havaCount < needCounts)
                        _this.cardComposeGoods[_this.curSel].can_compose = 0;
                    _this.listCardChipData.replaceItemAt(_this.cardComposeGoods[_this.curSel], _this.curSel);
                    _this.listCardChip.selectedIndex = _this.curSel;
                    _this.lastSel = _this.curSel;
                    _this.setPieceInfo(_this.curSel);
                }
            };
            var itemId = this.cardComposeGoods[this.curSel].need_ids[0];
            zj.loadUI(zj.Common_OutPutDialog)
                .then(function (dialog) {
                dialog.setInfo(itemId, _this, cb);
                dialog.show(zj.UI.SHOW_FROM_TOP);
            });
        };
        return CardCompose;
    }(zj.CardBase));
    zj.CardCompose = CardCompose;
    __reflect(CardCompose.prototype, "zj.CardCompose");
})(zj || (zj = {}));
//# sourceMappingURL=CardCompose.js.map