var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var AnnouceManger = (function () {
        function AnnouceManger() {
            this.cellsTbl = [];
        }
        Object.defineProperty(AnnouceManger, "Instance", {
            get: function () {
                if (AnnouceManger._instance == null) {
                    AnnouceManger._instance = new AnnouceManger();
                    zj.Gmgr.Instance.InitInfo();
                }
                return AnnouceManger._instance;
            },
            enumerable: true,
            configurable: true
        });
        AnnouceManger.prototype.init = function () {
            // 推送聊天消息
            zj.Game.EventManager.on(zj.GameEvent.SERVER_NOTICE_CHAT_MESSAGE, this.ChatMessageNotice_Visit, this);
        };
        AnnouceManger.prototype.uninit = function () {
            this.cellsTbl = [];
            this.CommonAnnouce == null;
        };
        /**
         * 推送聊天消息
         */
        AnnouceManger.prototype.ChatMessageNotice_Visit = function (msg, result) {
            msg = msg.data.body;
            for (var i = 0; i < msg.chatinfos.length; i++) {
                var chatInfo = msg.chatinfos[i];
                if (chatInfo.type == message.ChatChannelType.CHAT_CHANNEL_TYPE_ANNOUNCEMENT) {
                    var content = zj.Lang.chatContent(chatInfo);
                    content = zj.Set.DecodeJson(content);
                    this.AddAnnouce(content);
                }
            }
        };
        AnnouceManger.prototype.AddRollCell = function (typeLua, cell) {
            this.cellsTbl[typeLua] = null;
            if (this.cellsTbl[typeLua] == null) {
                this.cellsTbl[typeLua] = {
                    cellsOrig: [],
                    cellsShow: [],
                };
            }
            this.cellsTbl[typeLua].cellsOrig.push(cell);
            this.Update();
        };
        AnnouceManger.prototype.Update = function () {
            if (zj.Gmgr.Instance.layerId == zj.TableEnumLayerId.LAYER_FIGHT) {
                return;
            }
            if (!zj.Game.PlayerInfoSystem.playAnnouce) {
                return;
            }
            for (var k in this.cellsTbl) {
                if (this.cellsTbl.hasOwnProperty(k)) {
                    var v = this.cellsTbl[k];
                    if (v.cellsOrig > 0) {
                        if (v.cellsShow == 0 || (v.cellsShow != 0 && v.cellsShow[v.cellsShow]._can_next_add == true)) {
                            v.cellsShow.push(v.cellsOrig[1]);
                            v.cellsOrig.splice(0, 1);
                        }
                    }
                    if (this.CommonAnnouce != null) {
                        this.CommonAnnouce.SetInfo(this.cellsTbl, this);
                        // this.CommonAnnouce.visible = true;
                    }
                    else {
                        // let UI = Game.UIManager.AnimationGroup.getChildByName("CommonAnnouce") as CommonAnnouce;
                        // if (UI) {
                        // 	UI.visible = true;
                        // 	UI.SetInfo(this.cellsTbl, this);
                        // } else {
                        var UI_1 = new zj.CommonAnnouce();
                        // UI.name = "CommonAnnouce";
                        UI_1.x = zj.UIManager.StageWidth / 2 - 480;
                        UI_1.y = 0;
                        this.CommonAnnouce = UI_1;
                        UI_1.SetInfo(this.cellsTbl, this);
                        zj.Game.UIManager.AnimationGroup.addChild(UI_1);
                        // }
                    }
                }
            }
        };
        AnnouceManger.prototype.AddAnnouce = function (message) {
            if ((zj.Gmgr.Instance.getLayerId() != zj.TableEnumLayerId.LAYER_CITY &&
                zj.Gmgr.Instance.getLayerId() != zj.TableEnumLayerId.LAYER_LEAGUE_FIGHT &&
                zj.Gmgr.Instance.getLayerId() != zj.TableEnumLayerId.LAYER_WONDERLAND &&
                zj.Gmgr.Instance.getLayerId() != zj.TableEnumLayerId.LAYER_ZORKBOSS &&
                zj.Gmgr.Instance.getLayerId() != zj.TableEnumLayerId.LAYER_DARKLAND)
                || zj.Gmgr.Instance.bInLoading == true) {
                return;
            }
            var cell = {
                _ui_data: null,
                _added: null,
                _can_next_add: null
            };
            // cell._ui_name = "CommonAnnouce";
            cell._ui_data = message;
            cell._added = false;
            cell._can_next_add = false;
            this.AddRollCell(0, cell);
        };
        return AnnouceManger;
    }());
    zj.AnnouceManger = AnnouceManger;
    __reflect(AnnouceManger.prototype, "zj.AnnouceManger");
})(zj || (zj = {}));
//# sourceMappingURL=AnnouceManger.js.map