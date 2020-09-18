namespace zj {
    // Friend_AddFriend
    // wang shen zhuo
    // 2019/03/22

    export enum eSearchType {
        ID = 0,
        NAME = 1,
        LIST = 3,
    }

    export class Friend_AddFriend extends Dialog {

        public buttonClose: eui.Button;
        public labelTextID: eui.Label;
        public buttonSearchID: eui.Button;
        public labelTextName: eui.Label;
        public buttonSearchName: eui.Button;
        public labelFriendCnt: eui.Label;
        public labelApplyCnt: eui.Label;
        public listTableView: eui.List;
        public buttonMore: eui.Button;
        public labelTextID1: eui.Label;
        public labelTextName1: eui.Label;

        public applyMap = [];
        private itemMap = [];

        /** 协议相关变量*/
        public searchID: number;
        public searchName: any;
        public beginPos: number;
        public numEach: number;
        /**  删选标记变量*/
        public bFilter: boolean;
        /** 是否是换一批*/
        public bGetMore: boolean;

        // 搜索结果表
        public searchMap = [];
        // 子项项数
        public listIndex: number;
        // 记录已使用搜索结果的数量
        public lastSearchMapSize: number;
        // 搜索类型，针对不同类型有不同的处理
        public searchType = eSearchType.LIST
        // 忽略聚焦到末尾
        public bIgnoreFocus: boolean;
        // 滑动列表加载到底了
        public bListEnd: boolean;
        // 列表加载中
        public bListING: boolean;

        private isSearch: boolean = true;

        private TableViewItem: eui.ArrayCollection;
        private TableViewIndex: number = 0;
        public father: Friend_MainFriendSence;

        public itemArray = [];

        public constructor() {
            super();
            this.skinName = "resource/skins/friend/Friend_AddFriendSkin.exml";
            this.buttonClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClose, this);
            this.buttonSearchID.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSearchID, this);
            this.buttonSearchName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonSearchName, this);
            this.buttonMore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonMore, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTextLable, this);

            this.labelTextID.type = egret.TextFieldType.INPUT;
            this.labelTextID.inputType = egret.TextFieldInputType.TEL;
            this.labelTextID.size = 18;

            this.labelTextName.type = egret.TextFieldType.INPUT;
            this.labelTextName.inputType = egret.TextFieldInputType.TEXT;
            this.labelTextName.size = 18;

            this.labelTextID.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                this.setFocus();
            }, this);
            this.labelTextName.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                this.setFocus2();
            }, this);
        }

        private setFocus() {
            this.labelTextID1.visible = false;
        }

        private setFocus2() {
            this.labelTextName1.visible = false;
        }

        private onTextLable() {
            if (this.labelTextID.text == "") {
                this.labelTextID1.visible = true;
            }
            if (this.labelTextName.text == "") {
                this.labelTextName1.visible = true;
            }
        }

        public SetInfo(Seitch?) {
            this.SetDes();
            this.LoadList(Seitch);
        }

        public SetFather(father: Friend_MainFriendSence) {
            this.father = father;
        }

        public SetDes() {
            this.labelFriendCnt.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.addDes1, PlayerRelateSystem.Count(message.ERelationType.RELATION_TYPE_FRIEND), PlayerVIPSystem.Level().relation_count);
            this.labelApplyCnt.text = Helper.StringFormat(TextsConfig.TextConfig_Relation.addDes2, Game.PlayerRelateSystem.relateResp.relationApplying.length, CommonConfig.relation_applying_count[Game.PlayerMissionSystem.missionActive.licence]);
            for (const k in Game.PlayerRelateSystem.relateResp.relationApplying) {
                const v = Game.PlayerRelateSystem.relateResp.relationApplying[k];
                this.applyMap[v] = v;
            }
            this.itemArray = this.applyMap;
        }

        public Init() {
            this.applyMap = [];
            let list = Game.PlayerRelateSystem.relateResp.relationApplying;
            if (list) {
                for (const k in list) {
                    const v = list[k];
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
                this.labelTextID1.text = TextsConfig.TextConfig_Input.addFriendID;
                this.labelTextName1.text = TextsConfig.TextConfig_Input.addFriendName;

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


        }

        private LoadList(Seitch) {
            this.listIndex = this.listIndex + 1;
            this.listTableView.selectedIndex = 0; // 默认选中
            this.listTableView.itemRenderer = Friend_AddFriendItem;//
            this.TableViewItem = new eui.ArrayCollection();
            //滑列表搜索，需要插入数据不清空列表，切换时需要清空列表再加载
            if (this.searchType != eSearchType.LIST || Seitch == true || this.bGetMore == true) {
                this.itemMap = [];
                // this.listTableView.removeChildren();
            }
            if (this.bFilter) {
                for (let i = this.lastSearchMapSize; i < this.searchMap.length; i++) {
                    if (this.applyMap[this.searchMap[i].id] == null) {
                        this.TableViewList(i);
                    }
                }
            } else {
                for (let i = this.lastSearchMapSize; i < this.searchMap.length; i++) {
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
        }

        private TableViewList(num) {
            let data = new Friend_AddFriendItemData();
            data.father = this;
            data.id = num;
            data.listIndex = this.listIndex;
            this.TableViewItem.addItem(data);
        }

        private BoxID() {
            let str = this.labelTextID.text;
            this.searchID = Number(str);
            if (isNaN(Number(str)) || this.searchID == null) {
                toast_warning(TextsConfig.TextsConfig_Common.searchNumErr);
                this.labelTextID.text = "";
                this.searchID = 0;
                this.isSearch = false;
            }
        }

        private BoxName() {
            this.searchName = this.labelTextName.text;
        }

        public onButtonSearchID() {
            this.isSearch = true;
            this.BoxID();
            this.BoxName();

            if (this.searchID == 0) {
                if (this.isSearch == true) {
                    toast_warning(TextsConfig.TextConfig_Input.addFriendID);
                }
                this.onTextLable();
            } else {
                this.bGetMore = false;
                this.bIgnoreFocus = true;
                this.searchType = eSearchType.ID;
                this.RelationSearchList_Req();
            }
        }

        public onButtonSearchName() {
            this.BoxID();
            this.BoxName();
            if (String(this.searchName).length == 0) {
                toast_warning(TextsConfig.TextConfig_Input.addFriendName);
            } else {
                this.bGetMore = false;
                this.bIgnoreFocus = true;
                this.searchType = eSearchType.NAME;
                this.RelationSearchList_Req();
            }
        }

        public onButtonMore() {
            this.bGetMore = false;
            this.labelTextName.text = "";
            this.searchName = this.labelTextName.text;
            this.SearchList(true);
        }

        public SearchList(fours?) {
            this.BoxID();
            this.BoxName();
            if (fours == null) {
                fours = false;
            }
            this.bIgnoreFocus = fours;
            this.searchType = eSearchType.LIST;
            this.RelationSearchList_Req();
        }

        private RelationSearchList_Req() {
            //根据不同的搜索类型充值搜索条件
            let searchID = 0;
            let searchName = "";
            let beginPos = 0;
            if (this.searchType == eSearchType.ID) {
                searchID = this.searchID;
                this.beginPos = beginPos;
            } else if (this.searchType == eSearchType.NAME) {
                searchName = this.searchName;
                this.beginPos = beginPos;
            } else if (this.searchType == eSearchType.LIST) {
                searchName = this.searchName;
                beginPos = this.beginPos;
            }
            PlayerRelateSystem.RelationSearchList_Visit(searchID, searchName, beginPos, this.numEach)
                .then((data: message.RelationSearchListResponse) => {
                    if (this.searchType == eSearchType.LIST && this.bGetMore == false) {
                        //滑动列表加载信息
                        for (let i = 0; i < data.body.srhs.length; i++) {
                            this.searchMap.push(data.body.srhs[i]);
                        }
                        //是否还有消息
                        if (data.body.srhs.length == 0) {
                            this.bListEnd = true;
                        }
                    } else {
                        this.listIndex = 0;
                        this.lastSearchMapSize = 0;
                        this.searchMap = data.body.srhs;
                        this.bListEnd = false;
                        if (data.body.srhs.length == 0) {
                            toast_warning(TextsConfig.TextsConfig_Common.srhsNone);
                        }
                    }
                    this.SetInfo();
                }).catch(reason => { });
        }



        private onButtonClose() {
            PlayerRelateSystem.RelationApplyListReq().then((data: any) => {
                setTimeout(() => {
                    this.father.SetInfo();
                }, 500)
                this.close(UI.HIDE_TO_TOP);
            }).catch(reason => { });

        }
    }
}