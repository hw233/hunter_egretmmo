namespace zj {
/**
 * 帮助界面---获取表中数据
 * created by Lian Lei
 * 2018.12.19
 */

export class HelpOther {

    static helpSmallTypeInstance(id) {
        let info = TableClientHelpSmallType.Item(id);
        return info;
    }

    static helpBigTypeInstance(id) {
        let info = TableClientHelpBigType.Item(id);
        return info;
    }

    static helpInstance(id) {
        let info = TableClientHelp.Item(id);
        return info;
    }


    static getHelpBySmallType(smallType) {
        let ret = [];
        let smallTypeTbl = this.helpSmallTypeInstance(smallType).help_ids;
        if (typeof (smallTypeTbl) == "number" || typeof (smallTypeTbl) == "string") {
            ret.push(this.helpInstance(smallTypeTbl));
        } else {
            for (const k in smallTypeTbl) {
                if (smallTypeTbl.hasOwnProperty(k)) {
                    const v = smallTypeTbl[k];
                    ret.push(this.helpInstance(v));
                }
            }
        }
        return ret;
    }


    static getHelpListByBigType(bigType) {
        let ret = [];
        // let _table_big_type = TableUtil.getInstance().getTableByName(StringConfig_Table.help_big_type);
        let _table_big_type = TableClientHelpBigType.Table();
        //let _cur_small_types = this.helpBigTypeInstance(bigType).small_ids.split("|");
        let _cur_small_types = this.helpBigTypeInstance(bigType).small_ids;
        for (const i in _table_big_type) {
            if (_table_big_type.hasOwnProperty(i)) {
                const v = _table_big_type[i];
                ret.push(v);
                if (v.big_id == bigType) {
                    for (const ii in _cur_small_types) {
                        if (_cur_small_types.hasOwnProperty(ii)) {
                            const vv = _cur_small_types[ii];
                            ret.push(this.helpSmallTypeInstance(vv));
                        }
                    }
                }
            }
        }
        return ret;
    }
}
}