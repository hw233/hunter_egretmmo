namespace zj {
	/**
	 * @author zhaiweili
	 * 
	 * @date 2019-9-27
	 * 
	 * @class 资源组加载监测
	 */
	export class RESGroupManager {

		public constructor() {
		}

		public init() {
		}

		public unInit() {
		}

		public async loadGroup(groupName: string, priority?: number, reporter?: RES.PromiseTaskReporter): Promise<void> {
			return RES.loadGroup(groupName, priority, reporter);
		}
	}

}