var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var zj;
(function (zj) {
    // created by hhh in 2018/11/21
    var HelpUtil = (function () {
        function HelpUtil() {
        }
        HelpUtil.textConfigFormat = function (str) {
            var para = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                para[_i - 1] = arguments[_i];
            }
            if (str == null || str == undefined)
                return "";
            if (typeof str !== "string")
                return String(str);
            var count = 0;
            str = str.replace(/(%%)/g, "%");
            //通过正则替换%s
            return str.replace(/(%s)|(%d)|(%.1f)|(%.1f)|(%2d)/g, function (s, i) {
                return para[count++];
            });
        };
        HelpUtil.GetKV = function (obj) {
            var ownProps = Object.keys(obj), i = ownProps.length, resArray = new Array(i);
            while (i--)
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
            return resArray;
        };
        return HelpUtil;
    }());
    zj.HelpUtil = HelpUtil;
    __reflect(HelpUtil.prototype, "zj.HelpUtil");
})(zj || (zj = {}));
//# sourceMappingURL=HelpUtil.js.map