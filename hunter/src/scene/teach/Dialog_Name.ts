namespace zj {
/**
 * 起战队名Dialog
 * created by LianLei
 * 2019.04.22
 */
export class Dialog_Name extends Dialog {
	private groupAni: eui.Group;
	private editBoxContent: eui.EditableText;
	private btnOk: eui.Button;
	private btnRandom: eui.Button;


	private editRet: string;

	public constructor() {
		super();
		this.skinName = "resource/skins/teach/Dialog_NameSkin.exml";
		this.btnRandom.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnRand, this);
		this.btnOk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnOk, this);
		this.editBoxContent.addEventListener(egret.FocusEvent.FOCUS_OUT, this.EditBoxContent, this)
		this.init();
	}

	private init() {
		this.editRet = "";
		this.editBoxContent.prompt = LANG("长度不可超过六个字");
		this.editBoxContent.textColor = 0x470707;
		this.editBoxContent.promptColor = 0x470707;
	}

	private EditBoxContent() {
		this.editRet = this.editBoxContent.text;
	}


	private onBtnRand() {
		this.editRet = this.getRandName();
		this.editBoxContent.text = this.editRet;
	}

	private getRandName(): string {
		let tableFamilyName = TableClientRandomFamilyName.Table();
		let tableName = TableClientRandomName.Table();
		let name1 = this.GetRandItem(tableFamilyName).family_name;
		let name2 = this.GetRandItem(tableName).name;
		let nameFinal = name1 + name2;
		return nameFinal;
	}

	private GetRandItem(tbl) {
		let total = [];
		let length = Game.PlayerMissionSystem.tableLength(tbl);
		for (let i = 0; i < length; i++) {
			total.push(tbl[i]);
		}

		let randNum = Helper.Rand(length);
		let rowNum = (randNum % total.length) + 1;

		return total[rowNum];
	}

	private onBtnOk() {
		// let re = /^[A-Za-z0-9#]{1,}$/;
		// if (!re.test(this.textContent.text)) { 
		// 	console.log(!re.test(this.textContent.text));
		// }
		Game.TeachSystem.ModifyRoleName_Req(this.editRet)
			.then((value: {}) => {
				Teach.addTeaching();
				this.close();
			})
			.catch((reason) => {

			});
	}
}
}