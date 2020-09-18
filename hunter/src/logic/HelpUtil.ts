namespace zj {
    // created by hhh in 2018/11/21

    export class HelpUtil {
        static textConfigFormat(str: string, ...para: any[]) {
            if (str == null || str == undefined) return "";
            if (typeof str !== "string") return String(str);

            var count = 0;
            str = str.replace(/(%%)/g, "%");
            //通过正则替换%s
            return str.replace(/(%s)|(%d)|(%.1f)|(%.1f)|(%2d)/g, function (s, i) {
                return para[count++];
            });

        }

        static GetKV(obj) {
            var ownProps = Object.keys(obj),
                i = ownProps.length,
                resArray = new Array(i);
            while (i--)
                resArray[i] = [ownProps[i], obj[ownProps[i]]];
            return resArray;
        }
    }
}