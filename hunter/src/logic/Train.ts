namespace zj {
/**
 * created by Lian Lei
 * 2019.03.39
 */
export class Train {

	private static isWaitCallBack: boolean = false;
	private static isWaitPushUI: boolean = false;
	private static isWaitPopUI: boolean = false;
	private static isWaitAddSubWin: boolean = false;
	private static isWaitDeleteSubWin: boolean = false;
	private static isWaitProtocal: boolean = false;
	private static waitProtocal: number = -1;
	private static waitParam1;
	private static waitParam2;
	private static cbFunc: () => void = null;


	public static OnPushUI(ui) {
		if (this.isWaitPushUI && ui == this.waitParam1) {
			this.ClearWait();
			if (this.cbFunc != null) {
				this.cbFunc();
			}
		}
	}

	public static OnPopUI() {
		if (this.isWaitPushUI) {
			this.ClearWait();
			if (this.cbFunc != null) {
				this.cbFunc();
			}
		}
	}

	public static OnAddSubWin(ui, subName: string) {
		if (this.isWaitAddSubWin && ui == this.waitParam1 && subName == this.waitParam2) {
			this.ClearWait();
			if (this.cbFunc != null) {
				this.cbFunc();
			}
		}
	}

	public static OnDeleteSubWin() {
		if (this.isWaitDeleteSubWin) {
			this.ClearWait();
			if (this.cbFunc != null) {
				this.cbFunc();
			}
		}
	}

	public static ClearWait() {
		this.isWaitCallBack = false;
		this.isWaitPushUI = false;
		this.isWaitPopUI = false;
		this.isWaitAddSubWin = false;
		this.isWaitDeleteSubWin = false;
		this.isWaitProtocal = false;
		this.waitProtocal = -1;
		this.waitParam1 = "";
		this.waitParam2 = "";
	}

	public static WaitPushUI(ui, cbThisPointer, cbFunc: () => void) {
		this.waitParam1 = ui;
		this.isWaitPushUI = true;
		this.cbFunc = cbFunc;
	}

	public static WaitPopUI(cbThisPointer, cbFunc: () => void) {
		this.isWaitPopUI = true;
		this.cbFunc = cbFunc;
	}

	public static WaitAddSubWin(ui, subName, cbThisPointer, cbFunc) {
		this.waitParam1 = ui;
		this.waitParam2 = subName;
		this.isWaitAddSubWin = true;
		this.cbFunc = cbFunc();
	}

	public static WaitDeleteSubWin(cbThisPointer, cbFunc) {
		this.isWaitDeleteSubWin = true;
		this.cbFunc = cbFunc;
	}
}
}