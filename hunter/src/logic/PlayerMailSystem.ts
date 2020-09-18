namespace zj {
// 邮件信息系统
// lizhengqiang
// 20190505

export class PlayerMailSystem {

    ///////////////////////////////////////////////////////////////////////////
    // 静态函数
    private static Decompress(data: number[]) {
        let para = {}
        para["index"] = 4
        let inflate = new Zlib.Inflate(data, para);
        return inflate.decompress();
    }

    // 解压MailInfoZip信息
    private static DecompressMailInfo(data: number[]): message.MailInfoZip {
        if (data.length == 0) return null;
        let plain = PlayerMailSystem.Decompress(data);
        let decoder = new aone.BinaryDecoder(new Uint8Array(plain))
        let mailInfo = new message.MailInfoZip()
        if (!mailInfo.parse_bytes(decoder)) {
            console.log("decompress fail");
            return null;
        }
        return mailInfo;
    }

    ///////////////////////////////////////////////////////////////////////////
    // 变量
    public mailboxInfo: Array<message.MailBoxInfo> = null;

    ///////////////////////////////////////////////////////////////////////////
    // 成员方法

    public init() {
        Game.EventManager.on(GameEvent.PLAYER_MAIL_BOX_INFO_CHANGE, this.onMailBoxInfoChange, this);
        Game.EventManager.on(GameEvent.SERVER_NOTICE_MAIL_STATE, this.onNoticeMailState, this);
    }

    public uninit() {
        this.mailboxInfo = null;
    }

    private onMailBoxInfoChange(ev: egret.Event) {
        this.mailboxInfo = <Array<message.MailBoxInfo>>ev.data;
        Tips.SetTipsOfMail();
    }

    private onNoticeMailState(ev: egret.Event) {
        let request = <message.MailStateNoticeRequest>ev.data;
        if (!request) return;
        this.mailboxInfo = request.body.mailBoxs;
        Tips.SetTipsOfMail();
    }

    public getMailList(boxType: number): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.GetMailListRequest();
            request.body.box_type = boxType;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.GetMailListResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                this.mailboxInfo = response.body.mailBoxs;

                let mailInfo = PlayerMailSystem.DecompressMailInfo(response.body.mails);

                resolve({ mails: mailInfo == null ? null : mailInfo.mails, mailBoxs: response.body.mailBoxs });
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public getMailDetail(boxType: number, mailIds: Array<string>): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.GetMailDetailRequest();
            request.body.box_type = boxType;
            request.body.mailIds = mailIds;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.GetMailDetailResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public saveAttachment(type: number, mailIds: Array<string>): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SaveAttachmentRequest();
            request.body.type = type;
            request.body.mailIds = mailIds;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SaveAttachmentResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve(response.body.gameInfo);
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

    public sendRoleMail(type: number, toId: number, toName: string, title: string, content: string): Promise<{}> {
        return new Promise((resolve, reject) => {
            let request = new message.SendRoleMailRequest();
            request.body.type = type;
            request.body.to_id = toId;
            request.body.to_name = toName;
            request.body.title = title;
            request.body.content = content;

            Game.Controller.send(request, (req: aone.AoneRequest, resp: aone.AoneResponse): void => {
                let response = <message.SendRoleMailResponse>resp;
                if (response.header.result != 0) {
                    reject(response.header.result);
                    return;
                }

                resolve();
            }, (req: aone.AoneRequest): void => {
                console.log("req:", req);
                reject("timeout");
            }, this, false, false);
        });
    }

}
}