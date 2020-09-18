namespace zj {
/**
 * @author xingliwei
 * 
 * @date 2019-2-23
 * 
 * @class 帮助类，辅助做一些计算
 */

export class Formate {
	public constructor() {

	}

	public static Instence(id: number) {
		if (id == null) {
			id = message.EFormationType.FORMATION_TYPE_INSTANCE_NORMAL;
		}
		if (ckid(id)) {
			return null;
		}
		return TableFormations.Item(id);
	}
}
}