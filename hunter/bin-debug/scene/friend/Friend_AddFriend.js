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
    // Friend_AddFriend
    // wang shen zhuo
    // 2019/03/22
    var eSearchType;
    (function (eSearchType) {
        eSearchType[eSearchType["ID"] = 0] = "ID";
        eSearchType[eSearchType["NAME"] = 1] = "NAME";
        eSearchType[eSearchType["LIST"] = 3] = "LIST";
    })(eSearchType = zj.eSearchType || (zj.eSearchType = {}));
    var Friend_AddFriend = (function (_super) {
        __extends(Friend_AddFriend, _super);
        function Friend_AddFriend() {
            var _this = _super.call(this) || this;
            _this.applyMap = [];
            _this.itemMap = [];
            // 搜索结果表
            _this.searchMap = [];
            // 搜索类型，针对不同类型有不同的处理
            _this.searchType = eSearchType.LIST;
            _this.isSearch = true;
            _this.TableViewIndex = 0;
            _this.itemArray = [];
            _this.skinName = "resource/skins/friend/Friend_AddFriendSkin.exml";
            _this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClose, _this);
            _this.buttonSearchID.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSearchID, _this);
            _this.buttonSearchName.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonSearchName, _this);
            _this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonMore, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTextLable, _this);
            _this.labelTextID.type = egret.TextFieldType.INPUT;
            _this.labelTextID.inputType = egret.TextFieldInputType.TEL;
            _this.labelTextID.size = 18;
            _this.labelTextName.type = egret.TextFieldType.INPUT;
            _this.labelTextName.inputType = egret.TextFieldInputType.TEXT;
            _this.labelTextName.size = 18;
            _this.labelTextID.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.setFocus();
            }, _this);
            _this.labelTextName.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                _this.setFocus2();
            }, _this);
            return _this;
        }
        Friend_AddFriend.prototype.setFocus = function () {
            this.labelTextID1.visible = false;
        };
        Friend_AddFriend.prototype.setFocus2 = function () {
            this.labelTextName1.visible = false;
        };
        Friend_AddFriend.prototype.onTextLable = function () {
            if (this.labelTextID.text == "") {
                this.labelTextID1.visible = true;
            }
            if (this.labelTextName.text == "") {
                this.labelTextName1.visible = true;
            }
        };
        Friend_AddFriend.prototype.SetInfo = function (Seitch) {
            this.SetDes();
            this.LoadList(Seitch);
        };
        Friend_AddFriend.prototype.SetFather = function (father) {
            this.father = father;
        };
        Friend_AddFriend.prototype.SetDes = function () {
            this.labelFriendCnt.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.addDes1, zj.PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND), zj.PlayerVIPSystem.Level().relation_count);
            this.labelApplyCnt.text = zj.Helper.StringFormat(zj.TextsConfig.TextConfig_Relation.addDes2, zj.Game.PlayerRelateSystem.relateResp.relationApplying.length, zj.CommonConfig.relation_applying_count[zj.Game.PlayerMissionSystem.missionActive.licence]);
            for (var k in zj.Game.PlayerRelateSystem.relateResp.relationApplying) {
                var v = zj.Game.PlayerRelateSystem.relateResp.relationApplying[k];
                this.applyMap[v] = v;
            }
            this.itemArray = this.applyMap;
        };
        Friend_AddFriend.prototype.Init = function () {
            this.applyMap = [];
            var list = zj.Game.PlayerRelateSystem.relateResp.relationApplying;
            if (list) {
                for (var k in list) {
                    var v = list[k];
                    this.applyMap[v] = v;
                }
                this.itemArray = this.applyMap;
                //储存列表子项，显示处理
                this.itemMap = [];
                this.searchID = 0;
                this.searchName = "";
                this.beginPos = 0;
                this.numEach = 10;
                /**  删选标记变量*/
                this.bFilter = false;
                /** 是否是换一批*/
                this.bGetMore = false;
                // this.labelTextID.visible = false;
                // this.labelTextName.visible = false;
                this.labelTextID1.text = zj.TextsConfig.TextConfig_Input.addFriendID;
                this.labelTextName1.text = zj.TextsConfig.TextConfig_Input.addFriendName;
                this.searchMap = [];
                this.listIndex = 0;
                this.lastSearchMapSize = 0;
                this.searchType = eSearchType.LIST;
                this.bIgnoreFocus = true;
                this.bListEnd = false;
                this.bListING = false;
                this.SetInfo();
                // this.BoxID();
                // this.BoxName();
                this.RelationSearchList_Req();
            }
        };
        Friend_AddFriend.prototype.LoadList = function (Seitch) {
            this.listIndex = this.listIndex + 1;
            this.listTableView.selectedIndex = 0; // 默认选中
            this.listTableView.itemRenderer = zj.Friend_AddFriendItem; //
            this.TableViewItem = new eui.ArrayCollection();
            //滑列表搜索，需要插入数据不清空列表，切换时需要清空列表再加载
            if (this.searchType != eSearchType.LIST || Seitch == true || this.bGetMore == true) {
                this.itemMap = [];
                // this.listTableView.removeChildren();
            }
            if (this.bFilter) {
                for (var i = this.lastSearchMapSize; i < this.searchMap.length; i++) {
                    if (this.applyMap[this.searchMap[i].id] == null) {
                        this.TableViewList(i);
                    }
                }
            }
            else {
                for (var i = this.lastSearchMapSize; i < this.searchMap.length; i++) {
                    this.TableViewList(i);
                }
            }
            this.listTableView.dataProvider = this.TableViewItem;
            this.TableViewIndex = this.listTableView.selectedIndex;
            this.lastSearchMapSize = this.searchMap.length;
            if (this.searchType == eSearchType.LIST && Seitch != true && this.bIgnoreFocus == false) {
                this.searchMap.length = this.lastSearchMapSize;
            }
            this.bListING = false;
        };
        Friend_AddFriend.prototype.TableViewList = function (num) {
            var data = new zj.Friend_AddFriendItemData();
            data.father = this;
            data.id = num;
            data.listIndex = this.listIndex;
            this.TableViewItem.addItem(data);
        };
        Friend_AddFriend.prototype.BoxID = function () {
            var str = this.labelTextID.text;
            this.searchID = Number(str);
            if (isNaN(Number(str)) || this.searchID == null) {
                zj.toast_warning(zj.TextsConfig.TextsConfig_Common.searchNumErr);
                this.labelTextID.text = "";
                this.searchID = 0;
                this.isSearch = false;
            }
        };
        Friend_AddFriend.prototype.BoxName = function () {
            this.searchName = this.labelTextName.text;
        };
        Friend_AddFriend.prototype.onButtonSearchID = function () {
            this.isSearch = true;
            this.BoxID();
            this.BoxName();
            if (this.searchID == 0) {
                if (this.isSearch == true) {
                    zj.toast_warning(zj.TextsConfig.TextConfig_Input.addFriendID);
                }
                this.onTextLable();
            }
            else {
                this.bGetMore = false;
                this.bIgnoreFocus = true;
                this.searchType = eSearchType.ID;
                this.RelationSearchList_Req();
            }
        };
        Friend_AddFriend.prototype.onButtonSearchName = function () {
            this.BoxID();
            this.BoxName();
            if (String(this.searchName).length == 0) {
                zj.toast_warning(zj.TextsConfig.TextConfig_Input.addFriendName);
            }
            else {
                this.bGetMore = false;
                this.bIgnoreFocus = true;
                this.searchType = eSearchType.NAME;
                this.RelationSearchList_Req();
            }
        };
        Friend_AddFriend.prototype.onButtonMore = function () {
            this.bGetMore = false;
            this.labelTextName.text = "";
            this.searchName = this.labelTextName.text;
            this.SearchList(true);
        };
        Friend_AddFriend.prototype.SearchList = function (fours) {
            this.BoxID();
            this.BoxName();
            if (fours == null) {
                fours = false;
            }
            this.bIgnoreFocus = fours;
            this.searchType = eSearchType.LIST;
            this.RelationSearchList_Req();
        };
        Friend_AddFriend.prototype.RelationSearchList_Req = function () {
            var _this = this;
            //根据不同的搜索类型充值搜索条件
            var searchID = 0;
            var searchName = "";
            var beginPos = 0;
            if (this.searchType == eSearchType.ID) {
                searchID = this.searchID;
                this.beginPos = beginPos;
            }
            else if (this.searchType == eSearchType.NAME) {
                searchName = this.searchName;
                this.beginPos = beginPos;
            }
            else if (this.searchType == eSearchType.LIST) {
                searchName = this.searchName;
                beginPos = this.beginPos;
            }
            zj.PlayerRelateSystem.RelationSearchList_Visit(searchID, searchName, beginPos, this.numEach)
                .then(function (data) {
                if (_this.searchType == eSearchType.LIST && _this.bGetMore == false) {
                    //滑动列表加载信息
                    for (var i = 0; i < data.body.srhs.length; i++) {
                        _this.searchMap.push(data.body.srhs[i]);
                    }
                    //是否还有消息
                    if (data.body.srhs.length == 0) {
                        _this.bListEnd = true;
                    }
                }
                else {
                    _this.listIndex = 0;
                    _this.lastSearchMapSize = 0;
                    _this.searchMap = data.body.srhs;
                    _this.bListEnd = false;
                    if (data.body.srhs.length == 0) {
                        zj.toast_warning(zj.TextsConfig.TextsConfig_Common.srhsNone);
                    }
                }
                _this.SetInfo();
            }).catch(function (reason) { });
        };
        Friend_AddFriend.prototype.onButtonClose = function () {
            var _this = this;
            zj.PlayerRelateSystem.RelationApplyListReq().then(function (data) {
                setTimeout(function () {
                    _this.father.SetInfo();
                }, 500);
                _this.close(zj.UI.HIDE_TO_TOP);
            }).catch(function (reason) { });
        };
        return Friend_AddFriend;
    }(zj.Dialog));
    zj.Friend_AddFriend = Friend_AddFriend;
    __reflect(Friend_AddFriend.prototype, "zj.Friend_AddFriend");
})(zj || (zj = {}));
//# sourceMappingURL=Friend_AddFriend.js.map