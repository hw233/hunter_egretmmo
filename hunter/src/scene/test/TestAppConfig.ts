namespace zj {
	/**
	 * @author 翟伟利
	 * @date 2019-12-26
	 * @class 测试正式服务器数据
	 */
	export class TestAppConfig {
		public static isTest = false;
		public constructor() {
		}
		// 本地跑正式环境数据（测试用）
		public static initReleaseTest() {
			TestAppConfig.isTest = true;
			zj.AppConfig.AppId = 2039;
			zj.AppConfig.Channel = "aone_h5game";
			zj.AppConfig.MajorVersion = 2;
			zj.AppConfig.MinorVersion = 0;
			zj.AppConfig.RevisionVersion = 4;
			zj.AppConfig.ResourceVersion = 2001010;
			zj.AppConfig.ApiUrlRoot = "https://hunterh5api.zhijian-game.com";
			zj.AppConfig.EntryUrlRoot = "https://hunterh5login.zhijian-game.com";
			zj.AppConfig.ProjectUrlRoot = "https://testapi01.smartspace-game.com/hunter/";// 资源用测试地址的
		}

		public static checkTest(){
			if(TestAppConfig.isTest){
				toast("测试正式数据中。。。");
			}
		}
	}
}