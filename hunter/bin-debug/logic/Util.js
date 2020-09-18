var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    var Util = (function () {
        function Util() {
        }
        // 是否为PC浏览器环境
        Util.isPC = function () {
            if (!('navigator' in window))
                return false;
            if (!window.navigator.userAgent)
                return false;
            return !/(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);
        };
        // 是否为移动浏览器环境
        Util.isMobile = function () {
            if (!('navigator' in window))
                return false;
            if (!window.navigator.userAgent)
                return false;
            return !!/(iPhone|iPad|iPod|iOS|Android)/i.test(window.navigator.userAgent);
        };
        // 是否为微信公众号或浏览器环境
        Util.isWeixin = function () {
            if (!('navigator' in window))
                return false;
            if (!window.navigator.userAgent)
                return false;
            var ua = window.navigator.userAgent.toLowerCase();
            return !!/micromessenger/.test(ua);
        };
        // 是否为微信小游戏环境
        Util.isWxMiniGame = function () {
            return window['WxAppPlatform'] && (zj.platform instanceof window['WxAppPlatform']);
        };
        // 是否需要禁用支付系统
        Util.isDisabledPay = function () {
            return window['WxAppPlatform'] && (zj.platform instanceof window['WxAppPlatform']) && (egret.Capabilities.os == "iOS");
        };
        // 截取字符串，超过len部分替换成...
        // len是英文字符长度，一个中文等于两个英文字符长度
        Util.cutString = function (str, len) {
            if (str.length * 2 <= len)
                return str;
            var s = "";
            var strlen = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) >= 128) {
                    strlen += 2; // 英文字符以外的字符都算2个
                }
                else {
                    strlen += 1;
                }
                if (strlen > len) {
                    return s + "...";
                }
                else {
                    s += str.charAt(i);
                }
            }
            return s;
        };
        // 给数字加上逗号分隔符
        Util.commaNumber = function (num) {
            var n = Math.floor(num);
            var s = n.toString();
            if (s.length <= 4)
                return s;
            var count = 0;
            var str = "";
            for (var i = s.length - 1; i >= 0; i--) {
                if (count % 4 == 0 && count != 0)
                    str += ",";
                count++;
                str += s.charAt(i);
            }
            var ret = "";
            for (var i = str.length - 1; i >= 0; i--) {
                ret += str.charAt(i);
            }
            return ret;
        };
        // 获取URL参数
        Util.getQueryString = function (name) {
            if (!('location' in window))
                return "";
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return r[2];
            }
            else {
                return "";
            }
        };
        // 字符串是否未定义或为空
        Util.IsNullOrEmptyString = function (str) {
            return (str == undefined || str == null || str.length == 0);
        };
        //判断obj是否为{}
        Util.isEmptyObj = function (obj) {
            for (var key in obj) {
                if (key) {
                    return false;
                }
            }
            return true;
        };
        Util.getDeviceModel = function () {
            if (window && ('navigator' in window) && ('userAgent' in window['navigator'])) {
                return window.navigator.userAgent;
            }
            else {
                egret.Capabilities.runtimeType;
            }
        };
        Util.getDeviceInfo = function () {
            if (this.deviceinfo == null) {
                // 生成全局唯一设备ID
                var device_id = zj.Controller.getGlobalStorageItem("device_id");
                if (!device_id || device_id.length == 0) {
                    device_id = "DEVICEID_" + Math.floor(new Date().getTime() / 100) + "_" + Math.floor(Math.random() * 10000);
                    zj.Controller.setGlobalStorageItem("device_id", device_id);
                }
            }
            this.deviceinfo = new message.DeviceInfo();
            this.deviceinfo.locale = "zh";
            this.deviceinfo.language = "zhcn";
            this.deviceinfo.model = zj.Controller.getGlobalStorageItem("model") || Util.getDeviceModel();
            this.deviceinfo.os = egret.Capabilities.os;
            this.deviceinfo.imei = "";
            this.deviceinfo.ip = "";
            this.deviceinfo.mac = "";
            this.deviceinfo.idfa = zj.Controller.getGlobalStorageItem("idfa");
            this.deviceinfo.device_id = zj.Controller.getGlobalStorageItem("device_id"); // 微信环境下可能会用openid作为设备ID
            return this.deviceinfo;
        };
        Util.getAppVersionInfo = function () {
            this.versioninfo = new message.AppVersionInfo();
            this.versioninfo.app_id = zj.AppConfig.AppId;
            this.versioninfo.app_lang = "zhcn";
            this.versioninfo.channel = zj.AppConfig.Channel;
            this.versioninfo.major_version = zj.AppConfig.MajorVersion;
            this.versioninfo.minor_version = zj.AppConfig.MinorVersion;
            this.versioninfo.revision_version = zj.AppConfig.RevisionVersion;
            this.versioninfo.ext = "";
            return this.versioninfo;
        };
        // 计算AuthKey
        Util.AuthKey = function (device_id, appkey) {
            var str = "0123456789ABCDEF";
            var char1 = str.charAt(Util._randomInt(16));
            var char2 = str.charAt(Util._randomInt(16));
            var str1 = "";
            if (appkey) {
                str1 = new md5().hex_md5(device_id + appkey).toUpperCase();
            }
            else {
                str1 = new md5().hex_md5(device_id).toUpperCase();
            }
            var cArray1 = Util._stringToArray(str1);
            cArray1[0] = char1;
            cArray1[cArray1.length - 1] = char2;
            var str11 = cArray1.join("");
            var str2 = new md5().hex_md5(str11);
            var cArray2 = Util._stringToArray(str2);
            cArray2[0] = char1;
            cArray2[cArray2.length - 1] = char2;
            var str22 = cArray2.join("").toUpperCase();
            return "A" + str22;
        };
        ;
        Util._randomInt = function (max) {
            return Math.floor(Math.random() * max);
        };
        ;
        Util.randomValue = function (a, b) {
            if (a == b) {
                return a;
            }
            if (a > b) {
                a = a + b;
                b = a - b;
                a = a - b;
            }
            return a + (Math.random() * (b - a));
        };
        Util._stringToArray = function (str) {
            var temp = [];
            for (var _i = 0, str_1 = str; _i < str_1.length; _i++) {
                var char = str_1[_i];
                temp.push(char);
            }
            return temp;
        };
        ;
        // 添加富文本字符串
        Util.RichText = function (text) {
            if (text == null || text == undefined || !(typeof text === "string")) {
                console.log("text is null");
                return new egret.HtmlTextParser().parser("");
            }
            if (text.indexOf("<text>") != -1 || text.indexOf("<color>") != -1) {
                // cocos2dx项目中使用的富文本格式
                var index = 0;
                var out = "";
                var color = "";
                while (index < text.length) {
                    var ret1 = text.indexOf("<text>", index);
                    var ret2 = text.indexOf("<color>", index);
                    if (ret1 == -1 && ret2 == -1) {
                        out += text.substr(index);
                        break;
                    }
                    else if ((ret1 != -1 && ret2 == -1) || (ret1 != -1 && ret2 != -1 && ret1 < ret2)) {
                        if (index != ret1)
                            out += text.substring(index, ret1);
                        index = ret1 + 6; // 跳过<text>
                        var ret3 = text.indexOf("</text>", index);
                        if (ret3 == -1) {
                            out += text.substr(index);
                            break;
                        }
                        out += "<font";
                        if (color.length > 0)
                            out += " color=" + color;
                        color = "";
                        out += ">";
                        out += text.substring(index, ret3);
                        out += "</font>";
                        index = ret3 + 7; // 跳过</text>
                    }
                    else if ((ret1 == -1 && ret2 != -1) || (ret1 != -1 && ret2 != -1 && ret1 > ret2)) {
                        if (index != ret2)
                            out += text.substring(index, ret2);
                        index = ret2 + 7; // 跳过<color>
                        var ret4 = text.indexOf("</color>", index);
                        if (ret4 == -1) {
                            out += text.substr(index);
                            break;
                        }
                        var newcolor = text.substring(index, ret4);
                        index = ret4 + 8; // 跳过</color>
                        color = function (str) {
                            var r = parseInt(str.substr(str.indexOf("r:") + 2));
                            var g = parseInt(str.substr(str.indexOf("g:") + 2));
                            var b = parseInt(str.substr(str.indexOf("b:") + 2));
                            if (isNaN(r))
                                r = parseInt(str.substr(str.indexOf("r=") + 2));
                            if (isNaN(g))
                                g = parseInt(str.substr(str.indexOf("g=") + 2));
                            if (isNaN(b))
                                b = parseInt(str.substr(str.indexOf("b=") + 2));
                            if (isNaN(r))
                                r = 0;
                            if (isNaN(g))
                                g = 0;
                            if (isNaN(b))
                                b = 0;
                            var rgb = (r & 0xff) << 16 | (g & 0xff) << 8 | (b & 0xff);
                            return "0x" + rgb.toString(16);
                        }(newcolor);
                    }
                }
                text = out;
            }
            return new egret.HtmlTextParser().parser(text);
        };
        // html转义
        Util.escapeHtml = function (str) {
            str = str.replace(/&/g, '&amp;');
            str = str.replace(/</g, '&lt;');
            str = str.replace(/>/g, '&gt;');
            str = str.replace(/"/g, '&quto;');
            str = str.replace(/'/g, '&#39;');
            str = str.replace(/`/g, '&#96;');
            str = str.replace(/\//g, '&#x2F;');
            return str;
        };
        Util.getCurrTime = function () {
            return new Date().getTime();
        };
        Util.getMaskImgBlack = function (w, h) {
            if (w === void 0) { w = 0; }
            if (h === void 0) { h = 0; }
            var img = new eui.Image();
            img.source = "ui_common_mask_black_jpg";
            img.width = w;
            img.height = h;
            return img;
        };
        /**
         * 读取arrayBuffer并输出
         */
        Util.readArrayBuffer = function (arrayBuffer) {
            if (!arrayBuffer) {
                egret.log("arrayBuffer is " + arrayBuffer);
                return;
            }
            var posIndex = 0;
            var data = new DataView(arrayBuffer);
            var str = "";
            while (true) {
                try {
                    var byte = data.getInt8(posIndex);
                    posIndex++;
                    str += "" + byte;
                }
                catch (e) {
                    // egret.log("-------------");
                    // egret.log("idx: " + posIndex);
                    // egret.log("data:\n" + str);
                    // egret.log("-------------");
                    return;
                }
            }
        };
        /**
         * 滑动（Scroller）容器设为group，隐藏显示区域外的单元
         * isVertical: 是否为纵向滑动
         */
        Util.setScroller = function (scroller, isVertical) {
            if (isVertical === void 0) { isVertical = true; }
            if (scroller && scroller.viewport && scroller.viewport instanceof eui.Group) {
                var group_1 = scroller.viewport;
                var intersects_1;
                if (isVertical) {
                    intersects_1 = function (rect, item) {
                        return Math.max(item.y, rect.y) <= Math.min(item.y + item.height, rect.bottom);
                    };
                }
                else {
                    intersects_1 = function (rect, item) {
                        return Math.max(item.x, rect.x) <= Math.min(item.x + item.width, rect.right);
                    };
                }
                var checkGroup_1 = function (scroller, group) {
                    var scrollRect = group.scrollRect;
                    for (var i = group.numChildren - 1; i >= 0; --i) {
                        var item = group.getChildAt(i);
                        item.visible = intersects_1(scrollRect, item);
                    }
                };
                scroller.addEventListener(egret.Event.CHANGE, function () {
                    checkGroup_1(scroller, group_1);
                }, this);
                egret.setTimeout(function () {
                    checkGroup_1(scroller, group_1);
                }, this, 50);
            }
        };
        Util.getValueStr = function (value) {
            if (value > 100000) {
                if (((value / 1000) >>> 0) % 10 == 0) {
                    return ((value / 10000) >>> 0) + "万";
                }
                else {
                    return (value / 10000).toFixed(1) + "万";
                }
            }
            return value.toString();
        };
        /**
         * 检测点point是否在rect区域中
         * rx,ry,rw,rh:rect的x，y，宽高
         * px，py： 点坐标
         */
        Util.isPointInRect = function (rx, ry, rw, rh, px, py) {
            return this.rectPR.setTo(rx, ry, rw, rh).containsPoint(this.pointPR.setTo(px, py));
        };
        Util.pDisPoint = function (x1, y1, x2, y2) {
            return Math.pow(Math.abs((x1 - x2) * (x1 - x2)) + Math.abs((y1 - y2) * (y1 - y2)), 0.5);
        };
        /**两【线段】是否相交
     * @param l1x1 线段1的x1
     * @param l1y1 线段1的y1
     * @param l1x2 线段1的x2
     * @param l1y2 线段1的y2
     * @param l2x1 线段2的x1
     * @param l2y1 线段2的y1
     * @param l2x2 线段2的x2
     * @param l2y2 线段2的y2
     * @return 是否相交
     */
        Util.intersection = function (l1x1, l1y1, l1x2, l1y2, l2x1, l2y1, l2x2, l2y2) {
            // 快速排斥实验 首先判断两条线段在 x 以及 y 坐标的投影是否有重合。 有一个为真，则代表两线段必不可交。
            if (Math.max(l1x1, l1x2) < Math.min(l2x1, l2x2)
                || Math.max(l1y1, l1y2) < Math.min(l2y1, l2y2)
                || Math.max(l2x1, l2x2) < Math.min(l1x1, l1x2)
                || Math.max(l2y1, l2y2) < Math.min(l1y1, l1y2)) {
                return false;
            }
            // 跨立实验  如果相交则矢量叉积异号或为零，大于零则不相交
            if ((((l1x1 - l2x1) * (l2y2 - l2y1) - (l1y1 - l2y1) * (l2x2 - l2x1))
                * ((l1x2 - l2x1) * (l2y2 - l2y1) - (l1y2 - l2y1) * (l2x2 - l2x1))) > 0
                || (((l2x1 - l1x1) * (l1y2 - l1y1) - (l2y1 - l1y1) * (l1x2 - l1x1))
                    * ((l2x2 - l1x1) * (l1y2 - l1y1) - (l2y2 - l1y1) * (l1x2 - l1x1))) > 0) {
                return false;
            }
            return true;
        };
        /**
         * 单位向目标点移动
         */
        Util.moveObj = function (obj, speed, tox, toy) {
            var disp = Util.pDisPoint(obj.x, obj.y, tox, toy);
            var offx = 0;
            var offy = 0;
            if (disp <= speed) {
                offx = tox - obj.x;
                offy = toy - obj.y;
                return [true, offx, offy];
            }
            else {
                var c = speed / disp;
                offx = (tox - obj.x) * c;
                offy = (toy - obj.y) * c;
            }
            return [false, offx, offy];
        };
        /**
         * 根据角度算出圆上一点
         * x，y：圆心
         * angle: 角度
         * distance: 半径/距离
         */
        Util.getPosByRadiiAndAngle = function (x, y, rotation, distance) {
            rotation = 360 - rotation;
            return [Math.ceil(x + distance * Math.cos(rotation * Math.PI / 180)),
                Math.ceil(y - distance * Math.sin(rotation * Math.PI / 180))];
        };
        /**
         * 获取3点间夹角的角度
         * x,y:夹角点坐标
         */
        Util.getAngle = function (x, y, fx, fy, sx, sy) {
            var ma_x = fx - x;
            var ma_y = fy - y;
            var mb_x = sx - x;
            var mb_y = sy - y;
            var v1 = (ma_x * mb_x) + (ma_y * mb_y);
            var ma_val = Math.sqrt(ma_x * ma_x + ma_y * ma_y);
            var mb_val = Math.sqrt(mb_x * mb_x + mb_y * mb_y);
            var cosM = v1 / (ma_val * mb_val);
            var angleAMB = Math.acos(cosM) * 180 / Math.PI;
            return angleAMB;
        };
        Util.angle = function (startx, starty, endx, endy) {
            var diff_x = endx - startx;
            var diff_y = endy - starty;
            // 返回角度，不是弧度
            return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
        };
        Util.angleTo360 = function (startPosx, startPosy, endPosx, endPosy) {
            var angle = this.angle(startPosx, startPosy, endPosx, endPosy);
            if (endPosy >= startPosy) {
                if (endPosx >= startPosx) {
                    angle = 180 - angle;
                }
                else {
                    angle = -angle;
                }
            }
            else {
                if (endPosx >= startPosx) {
                    angle = 180 - angle;
                }
                else {
                    angle = 360 - angle;
                }
            }
            return angle;
        };
        /**
         * 获取圆内坐标X
         * @param r 半径
         * @param ao 角度(0-360)
         * @return
         */
        Util.getArcX = function (r, ao) {
            return r * Math.cos(ao * Math.PI / 180);
        };
        /**
         * 获取圆内坐标Y
         * @param r 半径
         * @param ao 角度(0-360)
         * @return
         */
        Util.getArcY = function (r, ao) {
            return r * Math.sin(ao * Math.PI / 180);
        };
        Util.setRect = function (node, color, width, height, alpha) {
            if (color === void 0) { color = 0x000000; }
            if (width === void 0) { width = 30; }
            if (height === void 0) { height = 30; }
            if (alpha === void 0) { alpha = 1; }
            var rect = new eui.Rect();
            rect.width = width * 2;
            rect.height = height * 2;
            rect.anchorOffsetX = width;
            rect.anchorOffsetY = height;
            rect.fillColor = color;
            rect.alpha = alpha;
            node.addChild(rect);
        };
        // 设置混合模式
        Util.setBlendMode = function (obj, type) {
            if (type === void 0) { type = egret.BlendMode.ADD; }
            obj.blendMode = type; // 叠加模式
        };
        Util.destroyRes = function (name, force) {
            RES.destroyRes(name, force);
        };
        Util.printExcepteion = function (e) {
            if (!e) {
                return;
            }
            if (e.hasOwnProperty("message")) {
                console.error(e["message"]);
            }
            if (e.hasOwnProperty("stack")) {
                console.error(e["stack"]);
            }
        };
        // 获取设备信息
        Util.deviceinfo = null;
        // 获取版本信息
        Util.versioninfo = null;
        Util.rectPR = new egret.Rectangle();
        Util.pointPR = new egret.Point();
        return Util;
    }());
    zj.Util = Util;
    __reflect(Util.prototype, "zj.Util");
})(zj || (zj = {}));
//# sourceMappingURL=Util.js.map