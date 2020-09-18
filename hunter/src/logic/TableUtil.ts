namespace zj {
// TableUtil
// hexiaowei
// 2018-11-22
export class TableUtil {
    static instance: TableUtil = null;
    static getInstance(): TableUtil{
    	if(TableUtil.instance == null)
    	{
    		TableUtil.instance = new TableUtil()
    	}
    	return TableUtil.instance
    }

    tableMap: {[index:string]: any} = {}

    getTableByName(name: string) {

    	if(this.tableMap[name] != null) {
    		return this.tableMap[name]
    	} else {
            console.log("[" + name + "] not find!")
            return null
        }
    }
}

}