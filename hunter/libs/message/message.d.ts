declare module aone {
    /**
     *
     * @author guoshanhe@ibrat.io
     *
     */
    interface AoneHeader {
        id: number;
        sequence: number;
        reserve: number;
        ext: any;
        parse_bytes(decoder: BinaryDecoder): boolean;
        to_bytes(encoder: BinaryEncoder): boolean;
    }
    interface AoneBody {
        parse_bytes(decoder: BinaryDecoder): boolean;
        to_bytes(encoder: BinaryEncoder): boolean;
    }
    interface AoneMessage {
        header: AoneHeader;
        body: AoneBody;
        parse_bytes(decoder: BinaryDecoder): boolean;
        to_bytes(encoder: BinaryEncoder): boolean;
    }
    class AoneReqHeader implements AoneHeader {
        id: number;
        sequence: number;
        reserve: number;MutationEvent
        srcid: number;
        session: number;
        ext: any;
        constructor(id: number);
        parse_bytes(decoder: BinaryDecoder): boolean;
        to_bytes(encoder: BinaryEncoder): boolean;
    }
    class AoneRespHeader implements AoneHeader {
        id: number;
        sequence: number;
        reserve: number;
        result: number;
        ext: any;
        constructor(id: number);
        parse_bytes(decoder: BinaryDecoder): boolean;
        to_bytes(encoder: BinaryEncoder): boolean;
    }
    interface AoneRequest extends AoneMessage {
        header: AoneReqHeader;
        body: AoneBody;
    }
    interface AoneResponse extends AoneMessage {
        header: AoneRespHeader;
        body: AoneBody;
    }
    class MessageFactory {
        private map;
        private static instance_;
        static getInstance(): MessageFactory;
        register(id: number, creator: () => AoneMessage): void;
        create(id: number): AoneMessage;
    }
}
declare namespace message {
    class MallListReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MallListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRespBody implements aone.AoneBody {
        items: Array<MallItem>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MallListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallBuyReqBody implements aone.AoneBody {
        type: number;
        mallId: number;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallBuyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MallBuyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallBuyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallBuyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MallBuyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRefreshReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRefreshRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MallListRefreshReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRefreshRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        items: Array<MallItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallListRefreshResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MallListRefreshRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace aone {
    class BinaryDecoder {
        private bytes_;
        private cursor_;
        private is_error_;
        constructor(bytes: Uint8Array);
        readonly length: number;
        readonly position: number;
        readonly remain: number;
        eof(): boolean;
        set_position(pos: number): boolean;
        has_error(): boolean;
        subdecoder(begin: number, length: number): BinaryDecoder;
        read_fixuint32(): number;
        read_bool(): boolean;
        read_byte(): number;
        read_int8(): number;
        read_uint8(): number;
        read_int16(): number;
        read_uint16(): number;
        read_int32(): number;
        read_uint32(): number;
        read_int64(): number;
        read_uint64(): number;
        read_float32(): number;
        read_float64(): number;
        read_enum(): number;
        read_string(): string;
        read_bool_array(len: number): Array<boolean>;
        read_byte_array(len: number): Array<number>;
        read_int8_array(len: number): Array<number>;
        read_uint8_array(len: number): Array<number>;
        read_int16_array(len: number): Array<number>;
        read_uint16_array(len: number): Array<number>;
        read_int32_array(len: number): Array<number>;
        read_uint32_array(len: number): Array<number>;
        read_int64_array(len: number): Array<number>;
        read_uint64_array(len: number): Array<number>;
        read_float32_array(len: number): Array<number>;
        read_float64_array(len: number): Array<number>;
        read_enum_array(len: number): Array<number>;
        read_string_array(len: number): Array<string>;
        read_bool_vector(): Array<boolean>;
        read_byte_vector(): Array<number>;
        read_int8_vector(): Array<number>;
        read_uint8_vector(): Array<number>;
        read_int16_vector(): Array<number>;
        read_uint16_vector(): Array<number>;
        read_int32_vector(): Array<number>;
        read_uint32_vector(): Array<number>;
        read_int64_vector(): Array<number>;
        read_uint64_vector(): Array<number>;
        read_float32_vector(): Array<number>;
        read_float64_vector(): Array<number>;
        read_enum_vector(): Array<number>;
        read_string_vector(): Array<string>;
    }
}
declare namespace message {
    class QueryActivitysReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivitysRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryActivitysReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInfoZip implements aone.AoneBody {
        activities: Array<ActivityInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivitysRespBody implements aone.AoneBody {
        activities: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivitysResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryActivitysRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRewardReqBody implements aone.AoneBody {
        type: number;
        index: number;
        rewardIndex: number;
        is_gift: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRankReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UpLevelRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRankRespBody implements aone.AoneBody {
        rankItem: Array<ActivityUpLevelRankItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UpLevelRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshWishTreeReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshWishTreeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RefreshWishTreeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshWishTreeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshWishTreeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RefreshWishTreeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetWishTreeRewardReqBody implements aone.AoneBody {
        index: number;
        rewardIndex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetWishTreeRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetWishTreeRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetWishTreeRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetWishTreeRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetWishTreeRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeRankReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChargeRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeRankRespBody implements aone.AoneBody {
        items: Array<RankBaseItemInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChargeRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecretMallBuyReqBody implements aone.AoneBody {
        index: number;
        mall_id: number;
        item_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecretMallBuyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SecretMallBuyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecretMallBuyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecretMallBuyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SecretMallBuyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceResultReqBody implements aone.AoneBody {
        sequence: number;
        instanceId: number;
        activityIndex: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityInstanceResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceResultRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        battle_star: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityInstanceResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceBuyTimeReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceBuyTimeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityInstanceBuyTimeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceBuyTimeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceBuyTimeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityInstanceBuyTimeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceExchangeReqBody implements aone.AoneBody {
        activityIndex: number;
        zone: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceExchangeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityInstanceExchangeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceExchangeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInstanceExchangeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityInstanceExchangeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityLotterPondReqBody implements aone.AoneBody {
        activityIndex: number;
        soda_num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityLotterPondRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityLotterPondReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityLotterPondRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityLotterPondResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityLotterPondRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivityRankReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivityRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryActivityRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivityRankRespBody implements aone.AoneBody {
        items: Array<RankBaseItemInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryActivityRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryActivityRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeAddLotterReqBody implements aone.AoneBody {
        activityIndex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeAddLotterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChargeAddLotterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeAddLotterRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeAddLotterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChargeAddLotterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRandInstanceResultReqBody implements aone.AoneBody {
        sequence: number;
        instanceId: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRandInstanceResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityRandInstanceResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRandInstanceResultRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRandInstanceResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityRandInstanceResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRedPacketGrabReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRedPacketGrabRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ActivityRedPacketGrabReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRedPacketGrabRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRedPacketGrabResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ActivityRedPacketGrabRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class AdviserUpLevelReqBody implements aone.AoneBody {
        adviserId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserUpLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AdviserUpLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserUpLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserUpLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AdviserUpLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserComposeReqBody implements aone.AoneBody {
        adviserId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AdviserComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AdviserComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserInfoReqBody implements aone.AoneBody {
        adviserId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AdviserInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserInfoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AdviserInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserSkillRewardReqBody implements aone.AoneBody {
        adviserId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserSkillRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AdviserSkillRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserSkillRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserSkillRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AdviserSkillRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class ArtifactComposeReqBody implements aone.AoneBody {
        artifactId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWearReqBody implements aone.AoneBody {
        artifactId: number;
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWearRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactWearReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWearRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWearResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactWearRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashReqBody implements aone.AoneBody {
        artifactId: number;
        type: number;
        wash_times: number;
        lockIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactWashReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactWashRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashReplaceReqBody implements aone.AoneBody {
        artifactId: number;
        is_save: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashReplaceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactWashReplaceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashReplaceRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactWashReplaceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactWashReplaceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactBreakReqBody implements aone.AoneBody {
        artifactId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactBreakRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactBreakReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactBreakRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactBreakResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactBreakRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactSplitTransferReqBody implements aone.AoneBody {
        count: number;
        propId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactSplitTransferRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ArtifactSplitTransferReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactSplitTransferRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactSplitTransferResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ArtifactSplitTransferRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GambleJadeReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GambleJadeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GambleJadeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GambleJadeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GambleJadeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GambleJadeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeReqBody implements aone.AoneBody {
        jadeId: number;
        is_all: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeQuickReqBody implements aone.AoneBody {
        jadeIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeQuickRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeComposeQuickReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeQuickRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeComposeQuickResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeComposeQuickRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshReqBody implements aone.AoneBody {
        jadeId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeRefreshReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeRefreshRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshQuickReqBody implements aone.AoneBody {
        jadeIds: Array<GoodsInfo>;
        types: Array<number>;
        token: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshQuickRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeRefreshQuickReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshQuickRespBody implements aone.AoneBody {
        refreshTimes: number;
        uplevelTimes: number;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeRefreshQuickResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeRefreshQuickRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountReqBody implements aone.AoneBody {
        artifactId: number;
        pos: number;
        jadeId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeMountReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeMountRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountQuickReqBody implements aone.AoneBody {
        artifactId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountQuickRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: JadeMountQuickReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountQuickRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class JadeMountQuickResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: JadeMountQuickRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class SetFormationReqBody implements aone.AoneBody {
        formations: Array<FormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetFormationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetFormationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetFormationRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetFormationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetFormationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsInfoReqBody implements aone.AoneBody {
        battleType: number;
        mobsId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MobsInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArmyStageZip implements aone.AoneBody {
        stageInfo: Array<ArmyStage>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsInfoRespBody implements aone.AoneBody {
        stageInfo: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MobsInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleStartReqBody implements aone.AoneBody {
        type: number;
        id: number;
        ext: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleStartRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BattleStartReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleStartRespBody implements aone.AoneBody {
        sequence: number;
        detailFormation: Array<number>;
        stageInfos: Array<number>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleStartResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BattleStartRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBattleReqBody implements aone.AoneBody {
        battle_id: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBattleRespBody implements aone.AoneBody {
        battleData: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimpleRoleFormationZip implements aone.AoneBody {
        formations: Array<SimpleRoleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleQueryReqBody implements aone.AoneBody {
        get_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleQueryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GroupBattleQueryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleQueryRespBody implements aone.AoneBody {
        formations: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleQueryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GroupBattleQueryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MoreSimpleFormationInfo implements aone.AoneBody {
        battle_result: Array<number>;
        simpleFormation: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PVPBattleResultReqBody implements aone.AoneBody {
        roleId: number;
        group_id: number;
        result: number;
        battle_type: number;
        battle_date: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PVPBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PVPBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PVPBattleResultRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PVPBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PVPBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class BossEntryReqBody implements aone.AoneBody {
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossEntryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossEntryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossEntryRespBody implements aone.AoneBody {
        roleInfo: BossRoleInfo;
        posInfos: Array<ScenePosInfo>;
        sceneId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossEntryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossEntryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossExitReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossExitRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossExitReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossExitRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossExitResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossExitRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossMoveReqBody implements aone.AoneBody {
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossMoveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossMoveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossMoveRespBody implements aone.AoneBody {
        roleInfo: Array<BossRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossMoveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossMoveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossDeadCoolingReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossDeadCoolingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossDeadCoolingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossDeadCoolingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: BossRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossDeadCoolingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossDeadCoolingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossSynchronousHurtReqBody implements aone.AoneBody {
        sequence: number;
        hurtValue: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossSynchronousHurtRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossSynchronousHurtReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossSynchronousHurtRespBody implements aone.AoneBody {
        value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossSynchronousHurtResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossSynchronousHurtRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossBattleReqBody implements aone.AoneBody {
        sequence: number;
        battleInfo: BattleResultInfo;
        totalDamage: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossBattleRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: BossRoleInfo;
        is_kill: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRankReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRankRespBody implements aone.AoneBody {
        items: Array<RankBaseItemInfo>;
        rank: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossInfoRespBody implements aone.AoneBody {
        bossInfo: BossInfo;
        items: Array<RankBaseItemInfo>;
        progresses: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BossInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class EnterChatReqBody implements aone.AoneBody {
        channel_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnterChatRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: EnterChatReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnterChatRespBody implements aone.AoneBody {
        channel_id: number;
        channel_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnterChatResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: EnterChatRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendChatReqBody implements aone.AoneBody {
        type: number;
        receiverId: number;
        content: string;
        show_type: number;
        show_id: number;
        battle_id: string;
        receiver_groupId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendChatRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SendChatReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendChatRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendChatResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SendChatRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatHistroyReqBody implements aone.AoneBody {
        type: number;
        chat_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatHistroyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChatHistroyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatMessageChunk implements aone.AoneBody {
        chats: Array<ChatMessage>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatHistroyRespBody implements aone.AoneBody {
        chats: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatHistroyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChatHistroyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class PostInfosChunk implements aone.AoneBody {
        infos: Array<PostInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostPublishReqBody implements aone.AoneBody {
        type: number;
        type_id: number;
        content: string;
        formationInfo: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostPublishRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PostPublishReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostPublishRespBody implements aone.AoneBody {
        postInfo: PostInfo;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostPublishResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PostPublishRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostDeleteReqBody implements aone.AoneBody {
        post_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostDeleteRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PostDeleteReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostDeleteRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostDeleteResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PostDeleteRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PraiseClickReqBody implements aone.AoneBody {
        post_id: number;
        is_praise: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PraiseClickRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PraiseClickReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PraiseClickRespBody implements aone.AoneBody {
        praises: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PraiseClickResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PraiseClickRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentPublishReqBody implements aone.AoneBody {
        type: number;
        post_id: number;
        content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentPublishRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CommentPublishReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentPublishRespBody implements aone.AoneBody {
        commentInfo: CommentInfo;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentPublishResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CommentPublishRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentDeleteReqBody implements aone.AoneBody {
        post_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentDeleteRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CommentDeleteReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentDeleteRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentDeleteResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CommentDeleteRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostListReqBody implements aone.AoneBody {
        type: number;
        type_id: number;
        is_self: boolean;
        start_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PostListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostListRespBody implements aone.AoneBody {
        posts: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PostListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostCommentReqBody implements aone.AoneBody {
        post_id: number;
        start_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostCommentRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PostCommentReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostCommentRespBody implements aone.AoneBody {
        infos: Array<CommentInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostCommentResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PostCommentRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class GoodsInfo implements aone.AoneBody {
        goodsId: number;
        count: number;
        index: number;
        showType: number;
        overdue_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GoodsGroupInfo implements aone.AoneBody {
        goodsInfo: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TributeInfo implements aone.AoneBody {
        tribute_id: number;
        tribute_name: string;
        buy_type: number;
        pay_index: number;
        discount: number;
        goodses: Array<GoodsInfo>;
        sort_power: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TributeGroupInfo implements aone.AoneBody {
        tributeInfo: Array<TributeInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ProgressInfo implements aone.AoneBody {
        type: number;
        info: number;
        leftTime: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetInfo implements aone.AoneBody {
        pet_id: number;
        step: number;
        star: number;
        situtation: number;
        hat_expireTime: number;
        is_hidden: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleBriefInfo implements aone.AoneBody {
        id: number;
        name_type: number;
        name: string;
        level: number;
        picId: number;
        picFrameId: number;
        fashionId: number;
        haloId: number;
        titleId: number;
        ladderRank: number;
        ladderMax: number;
        leagueId: number;
        leagueName: string;
        matchScore: number;
        is_online: boolean;
        logoutTime: number;
        battleValue: number;
        licenceLevel: number;
        vipLevel: number;
        maxInstance: number;
        petInfo: Array<PetInfo>;
        agree_detail: boolean;
        agree_enter: boolean;
        group_id: number;
        server_id: number;
        group_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleBaseInfo implements aone.AoneBody {
        id: number;
        name: string;
        identification_type: number;
        bind_phone: number;
        level: number;
        cur_exp: number;
        picId: number;
        picFrameId: number;
        fashionId: number;
        haloId: number;
        titleId: number;
        viceTitleId: number;
        chargeToken: number;
        chargeCount: number;
        is_chargeToday: boolean;
        ladderRank: number;
        ladderMax: number;
        ladderScore: number;
        leagueId: number;
        leagueName: string;
        matchScore: number;
        is_online: boolean;
        logoutTime: number;
        battleValue: number;
        battleValueThree: number;
        battleValueSix: number;
        licenceLevel: number;
        vipLevel: number;
        vipExp: number;
        permitLevel: number;
        permitExp: number;
        permitPay: number;
        pay_day: number;
        createTime: number;
        lastLoginTime: number;
        token: number;
        money: number;
        leagueCoin: number;
        wantedCoin: number;
        arrestCoin: number;
        huntCoin: number;
        power: number;
        beer: number;
        redWine: number;
        champagne: number;
        soda: number;
        rum: number;
        psychicFruit: number;
        lotteryScore: number;
        lierenCoin: number;
        goldPlate: number;
        honorCoin: number;
        leagueScore: number;
        relicCoin: number;
        promiseCoin: number;
        dollCoin: number;
        modify_name: number;
        agree_detail: boolean;
        agree_enter: boolean;
        potato_buy_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MailInfo implements aone.AoneBody {
        type: number;
        mailId: string;
        from_id: number;
        roleBaseInfo: Array<RoleBriefInfo>;
        title: string;
        content: string;
        content_type: string;
        attachment: Array<GoodsInfo>;
        is_read: boolean;
        is_attachment: boolean;
        createtime: number;
        war_id: string;
        battleResult: number;
        rank_change: number;
        goodsInfo: Array<GoodsInfo>;
        battleDate: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MailBoxInfo implements aone.AoneBody {
        unReward: number;
        unReadCount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatMessage implements aone.AoneBody {
        type: number;
        channel_id: number;
        chat_id: number;
        sender_id: number;
        sender_name: string;
        sender_level: number;
        sender_licence: number;
        sender_pic: number;
        sender_title: number;
        sender_picFrame: number;
        sender_league_id: number;
        sender_league_name: string;
        send_time: number;
        content_type: string;
        content: string;
        receiver_id: number;
        receiver_name: string;
        show_type: number;
        show_uid: number;
        battle_id: string;
        sender_group_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMoneyItem implements aone.AoneBody {
        token: number;
        money: number;
        multiple: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GiftInfo implements aone.AoneBody {
        index: number;
        gift_index: number;
        giftType: number;
        trigger_time: number;
        buy_times: number;
        dailyIndex: number;
        lastRefreshTime: number;
        mark: number;
        markIndex: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublicFruitItem implements aone.AoneBody {
        redFruit: number;
        blueFruit: Array<number>;
        bestCount: number;
        firstCount: number;
        secondCount: number;
        creatTime: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublicFruitInfo implements aone.AoneBody {
        dailyLotteryFruit: PublicFruitItem;
        historyLotteryFruit: Array<PublicFruitItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleMixUnit implements aone.AoneBody {
        isBindReward: boolean;
        firstChargeReward: Array<number>;
        spgeneralReward: Array<number>;
        isMissionnewReward: Array<number>;
        modifyName: number;
        getNewToken: number;
        sign_time: number;
        is_signToday: boolean;
        buy_money_list: Array<BuyMoneyItem>;
        payIndexs: Array<number>;
        buy_fund: boolean;
        fund_reward: Array<number>;
        shareType: Array<number>;
        loginTodayReward: boolean;
        loginDaysIndex: number;
        isCollectFruit: Array<number>;
        isSceneMobs: boolean;
        isJadeRefresh: boolean;
        facebookReward: Array<number>;
        runes: number;
        exchangeMalls: Array<IIKVPairs>;
        collectionFruit: Array<IIKVPairs>;
        fishing_refresh: number;
        already_fish: Array<number>;
        process: ProgressInfo;
        goodses: Array<GoodsInfo>;
        refresh_purple_time: number;
        refresh_double_time: number;
        last_publish_post_time: Array<IIKVPairs>;
        monthGift: Array<number>;
        redFruit: number;
        blueFruit: Array<number>;
        integral_allScore: number;
        integral_currentScore: number;
        integral_isFree: boolean;
        integral_freeZone: Array<number>;
        integral_exchangeZone: Array<IIKVPairs>;
        lotteryRewards: Array<number>;
        levelReward: Array<number>;
        monthReward: Array<number>;
        starReward: Array<IIKVPairs>;
        last_publish_comment_time: Array<IIKVPairs>;
        vipReward: Array<number>;
        newFirstChargeReward: Array<number>;
        old_chargeToken: number;
        newGiftSeven: Array<number>;
        sevenLoginReward: Array<number>;
        lowVipWeal: Array<number>;
        xuyuan_allScore: number;
        xuyuan_currentScore: number;
        xuyuan_time: number;
        xuyuan_freeZone: Array<number>;
        xuyuan_exchangeZone: Array<IIKVPairs>;
        share_role_create_count: number;
        share_role_six_star_count: number;
        share_role_first_charge_count: number;
        share_general_id_count: number;
        share_role_create_gift: Array<number>;
        share_role_six_star_gift: Array<number>;
        share_role_first_charge_gift: Array<number>;
        share_general_id_gift: Array<number>;
        collect_goods: Array<IIKVPairs>;
        share_url: string;
        beer_s_time: number;
        wonderlandRebirthTime: number;
        missionToken: Array<IIKVPairs>;
        missionReward: Array<number>;
        first_beer: boolean;
        instancePower: Array<number>;
        bossBattleTime: Array<IIKVPairs>;
        bossCommonInspire: Array<IIKVPairs>;
        bossSeniorInspire: Array<IIKVPairs>;
        contend_battleTime: number;
        contend_win_count: number;
        contend_win_blood: number;
        contend_fail_hunt: number;
        title_check: Array<IIKVPairs>;
        online_reward: Array<number>;
        pay_reward: Array<number>;
        mission_gift: Array<number>;
        permit_free_reward: Array<number>;
        permit_pay_reward: Array<number>;
        permitMissionReward: Array<number>;
        is_rewardTodayPay: boolean;
        uplotter_dayfree: Array<number>;
        praiseRanks: Array<number>;
        permit_monthgift: Array<number>;
        activityGrab: Array<IIKVPairs>;
        activityGrabDes: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LicenceInfo implements aone.AoneBody {
        pvpPower: number;
        buyPvpPower: number;
        buyPower: number;
        buyPlate: number;
        strategy_time: number;
        tower_time: number;
        lottery_beer_time: number;
        lottery_redwine_time: number;
        lottery_champagne_time: number;
        lottery_soda_time: number;
        mall_ordinary_time: number;
        rewardPower: number;
        buy_money: number;
        buy_money_exp: number;
        league_fishing: number;
        normal_gamble: number;
        normal_gamble_free: number;
        wish_tree_time: number;
        gain_runes_time: number;
        change_runes_time: number;
        craft_time: number;
        craft_buy: number;
        buy_wantedtime: number;
        buy_arresttime: number;
        buy_hunttime: number;
        assist_time: number;
        xuyuan_free: number;
        mall_relic_time: number;
        buy_coin_free_time: number;
        activity_time: number;
        buy_activity_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionInfo implements aone.AoneBody {
        type: number;
        subType: number;
        missionId: number;
        isFinish: boolean;
        value: number;
        valueEx: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionActive implements aone.AoneBody {
        activeScore: number;
        activeIndex: Array<number>;
        licence: number;
        licenceReward: Array<number>;
        raceKM: Array<number>;
        raceRewards: Array<number>;
        jewelToday: number;
        jewelAll: number;
        jewelHave: number;
        jewelMall: Array<IIKVPairs>;
        missionWeekIndex: number;
        missionWeekStart: number;
        missionWeekReward: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AttriInfo implements aone.AoneBody {
        general_hp: number;
        general_atk_all: number;
        general_atk: number;
        general_def: number;
        skill_atk: number;
        skill_def: number;
        atk_crit: number;
        skill_crit: number;
        crit_extra: number;
        crit_resistance: number;
        dodge_rate: number;
        hit_rate: number;
        ignore_phyDef: number;
        ignore_magicDef: number;
        final_extra: number;
        final_reduce: number;
        rage_reduce: number;
        general_def_all: number;
        all_crit: number;
        ignore_def_all: number;
        universal_resistance: number;
        ignore_resistance: number;
        float_resistance: number;
        cd_speed: number;
        support_consume: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoAttriItem implements aone.AoneBody {
        attriId: number;
        attriValue: number;
        growthValue: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoInfo implements aone.AoneBody {
        id: number;
        index: number;
        pos: number;
        star: number;
        level: number;
        add_attri: Array<PotatoAttriItem>;
        is_lock: boolean;
        attri: AttriInfo;
        battleValue: number;
        break_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillInfo implements aone.AoneBody {
        pos: number;
        level: number;
        skillId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LifeInfo implements aone.AoneBody {
        pos: number;
        lifeId: number;
        statPoints: Array<number>;
        winPoints: Array<number>;
        battleValue: number;
        attri: AttriInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArtifactInfo implements aone.AoneBody {
        artifactId: number;
        attri: AttriInfo;
        newAttri: Array<AttriInfo>;
        goodses: Array<GoodsInfo>;
        battleValue: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EquipInfo implements aone.AoneBody {
        equipId: number;
        level: number;
        step: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PassiveInfo implements aone.AoneBody {
        pos: number;
        level: number;
        talentId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FriendsInfo implements aone.AoneBody {
        general_id: number;
        level: number;
        exp: number;
        is_baseown: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PsychicInfo implements aone.AoneBody {
        pos: number;
        level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralInfo implements aone.AoneBody {
        general_id: number;
        level: number;
        exp: number;
        star: number;
        step: number;
        battleValue: number;
        attri: AttriInfo;
        partner: Array<number>;
        skills: Array<SkillInfo>;
        artifactId: number;
        fashionId: number;
        potatoInfo: Array<PotatoInfo>;
        lifes: Array<LifeInfo>;
        passives: Array<PassiveInfo>;
        skill_num: number;
        awakePassive: PassiveInfo;
        friendsInfo: Array<FriendsInfo>;
        choiceFriend: number;
        use_skillItem: number;
        is_ware: boolean;
        psychicInfo: Array<PsychicInfo>;
        break_level: number;
        break_skill: Array<IIKVPairs>;
        using_break_skill: Array<number>;
        equipInfo: Array<EquipInfo>;
        transfer_level: number;
        is_show_transfer: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSimpleInfo implements aone.AoneBody {
        general_id: number;
        level: number;
        star: number;
        step: number;
        fashionId: number;
        battleValue: number;
        awaken_level: number;
        transfer_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AdviserInfo implements aone.AoneBody {
        adviserId: number;
        level: number;
        battleValue: number;
        levelfa_times: number;
        last_addTime: number;
        reward_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FormationInfo implements aone.AoneBody {
        formationType: number;
        formationIndex: number;
        adviserId: number;
        strategyId: number;
        adviserSkill: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimpleFormationInfo implements aone.AoneBody {
        adviserId: number;
        strategyId: number;
        adviserSkill: number;
        generals: Array<GeneralSimpleInfo>;
        reserves: Array<GeneralSimpleInfo>;
        supports: Array<GeneralSimpleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DetailFormationInfo implements aone.AoneBody {
        adviserId: number;
        strategyId: number;
        adviserSkill: number;
        generals: Array<GeneralInfo>;
        reserves: Array<GeneralInfo>;
        supports: Array<GeneralInfo>;
        advisers: Array<AdviserInfo>;
        artifacts: Array<ArtifactInfo>;
        pets: Array<PetInfo>;
        historyGenerals: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimpleRoleFormationInfo implements aone.AoneBody {
        baseInfo: RoleBriefInfo;
        formation: SimpleFormationInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimpleMemberFormationInfo implements aone.AoneBody {
        baseInfo: RoleBriefInfo;
        formation: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DetailRoleFormationInfo implements aone.AoneBody {
        baseInfo: RoleBriefInfo;
        formation: DetailFormationInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobInfo implements aone.AoneBody {
        mobId: number;
        dayTime: number;
        star: number;
        allTime: number;
        buyTime: number;
        chestReward: boolean;
        firstReward: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceReward implements aone.AoneBody {
        instanceId: number;
        indexs: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MallItem implements aone.AoneBody {
        mall_id: number;
        mall_name: number;
        buy_limit: number;
        goods_id: Array<number>;
        goods_count: Array<number>;
        show_type: Array<number>;
        consume_type: number;
        original_price: number;
        discount_price: number;
        remain: number;
        picId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceTraining implements aone.AoneBody {
        instanceId: number;
        isFinish: boolean;
        isReward: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceSearch implements aone.AoneBody {
        id: number;
        order_id: number;
        index: number;
        des_id: number;
        goodInfos: Array<GoodsInfo>;
        general_step: number;
        general_level: number;
        general_star: number;
        general_aptitude: number;
        general_type: Array<number>;
        time: number;
        start_time: number;
        generalId: Array<number>;
        is_reward: boolean;
        is_lock: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceRelic implements aone.AoneBody {
        id: number;
        star: number;
        damage_reward: number;
        damage_max: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceInfo implements aone.AoneBody {
        instance_money: number;
        instance_money_time: number;
        instance_exp: number;
        instance_exp_time: number;
        instance_money_max: number;
        instance_exp_max: number;
        instance_money_last: number;
        instance_exp_last: number;
        normalReward: Array<InstanceReward>;
        eliteReward: Array<InstanceReward>;
        training: Array<InstanceTraining>;
        searchInfo: Array<InstanceSearch>;
        lastTowerRefreshTime: number;
        monsterTowerIndex: number;
        relicInfo: Array<InstanceRelic>;
        relicChest: Array<IIKVPairs>;
        relicBattleTimes: Array<IIKVPairs>;
        activityRandMobs: Array<IIKVPairs>;
        activityBattleCount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TowerInfo implements aone.AoneBody {
        towerCur: number;
        towerMax: number;
        sweep_time: number;
        sweep_reward: boolean;
        towerRewardId: Array<number>;
        mallItems: Array<MallItem>;
        towerFirstReward: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleOtherAttri implements aone.AoneBody {
        picIds: Array<number>;
        picFrameIds: Array<IIKVPairs>;
        titleIds: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfo implements aone.AoneBody {
        type: number;
        roleInfo: RoleBriefInfo;
        canReward: boolean;
        isReward: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleApply implements aone.AoneBody {
        roleInfo: RoleBriefInfo;
        applyMsg: string;
        applyTime: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TeachItem implements aone.AoneBody {
        part: number;
        is_jump: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArmyUnitBase implements aone.AoneBody {
        monster_roleId: number;
        monster_name: number;
        des: number;
        role_type: number;
        monster_profession: number;
        monster_level: number;
        monster_star: number;
        monster_step: number;
        skill_ids: Array<number>;
        skill_levels: Array<number>;
        talent_ids: Array<number>;
        talent_levels: Array<number>;
        hide_talent_ids: Array<number>;
        bean_max: number;
        hp_tube: number;
        monster_rage: number;
        monster_hp: number;
        monster_atk: number;
        monster_def: number;
        skill_atk: number;
        skill_def: number;
        atk_crit: number;
        skill_crit: number;
        crit_extra: number;
        crit_resistance: number;
        dodge_rate: number;
        hit_rate: number;
        ignore_phyDef: number;
        ignore_magicDef: number;
        final_extra: number;
        final_reduce: number;
        stiff_resistance: number;
        get_up_time: number;
        is_stir_up: number;
        stir_up_resistance: number;
        stir_again_def: number;
        is_gravity: number;
        move_speed: number;
        universal_resistance: number;
        ignore_resistance: number;
        float_resistance: number;
        cd_speed: number;
        support_consume: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArmyUnitCur implements aone.AoneBody {
        monster_id: number;
        is_dead: boolean;
        cur_pos: number;
        cur_hp: number;
        cur_rage: number;
        cur_bean: number;
        cur_skillCd: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArmyMobs implements aone.AoneBody {
        curInfo: ArmyUnitCur;
        baseInfo: ArmyUnitBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ArmyStage implements aone.AoneBody {
        stage_id: number;
        stage_type: number;
        state_time: number;
        bossDes: number;
        monster_pos1: Array<ArmyMobs>;
        monster_pos2: Array<ArmyMobs>;
        monster_pos3: Array<ArmyMobs>;
        monster_pos4: Array<ArmyMobs>;
        monster_dialog: Array<ArmyMobs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleRankInfo implements aone.AoneBody {
        type: number;
        baseInfo: RoleBriefInfo;
        rank: number;
        value: number;
        battleId: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedInfo implements aone.AoneBody {
        refreshTime: number;
        typeLevel: Array<IIKVPairs>;
        itemIds: Array<number>;
        maxBattleStar: Array<number>;
        battleStar: Array<IIKVPairs>;
        leftTime: number;
        wantedFirstReward: Array<number>;
        groupBattleUsed: Array<number>;
        groupBattleTime: Array<IIKVPairs>;
        groupBattleFirst: Array<number>;
        groupBattleStar: Array<IIKVPairs>;
        wantedTicketTime: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityExchangeInfo implements aone.AoneBody {
        index: number;
        exchangeInfo: Array<GoodsInfo>;
        goodsInfo: Array<GoodsInfo>;
        exchangeCount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityMallItem implements aone.AoneBody {
        index: number;
        original_price: number;
        discount_price: number;
        pic_id: number;
        goodsInfo: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityVipItem implements aone.AoneBody {
        mallItem: ActivityMallItem;
        vip_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityUplevelItem implements aone.AoneBody {
        index: number;
        goodsInfo: Array<GoodsInfo>;
        picId: number;
        rewardCount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityDailyAddItem implements aone.AoneBody {
        index: number;
        chargeCount: number;
        rewardZone: Array<number>;
        rewards: Array<GoodsGroupInfo>;
        rewardIndex: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityUpLevelRankItem implements aone.AoneBody {
        roleId: number;
        rank: number;
        name: string;
        rewardTime: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityMissionItem implements aone.AoneBody {
        mission_type: number;
        mission_condition: number;
        rewards: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivitySecretMall implements aone.AoneBody {
        mall_id: number;
        level_min: number;
        level_max: number;
        items: Array<TributeGroupInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityCollectItem implements aone.AoneBody {
        type: number;
        goodId: number;
        randPower: number;
        dailyNum: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityRankItem implements aone.AoneBody {
        goodsInfo: Array<GoodsInfo>;
        rankZone: Array<number>;
        ext: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityLotteryGoods implements aone.AoneBody {
        goodId: Array<number>;
        goodNum: Array<number>;
        goodPower: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActivityInfo implements aone.AoneBody {
        type: number;
        index: number;
        noticeType: number;
        picId: number;
        name: string;
        des: string;
        openTime: number;
        closeTime: number;
        stopTime: number;
        topTime: number;
        buffType: number;
        buffValue: number;
        chargeDaily: number;
        collectId: number;
        consumeType: number;
        uplevel: number;
        uplevelItems: Array<ActivityUplevelItem>;
        exchanges: Array<ActivityExchangeInfo>;
        vipMall: Array<ActivityVipItem>;
        discountMall: Array<ActivityMallItem>;
        dailyAddItems: Array<ActivityDailyAddItem>;
        rewardZone: Array<number>;
        rewards: Array<GoodsGroupInfo>;
        todayReward: boolean;
        daysIndex: number;
        itemCount: number;
        is_uplevel: boolean;
        uplevelReward: number;
        rewardIndex: Array<number>;
        kvInfos: Array<IIKVPairs>;
        wishTreeReward: Array<GoodsInfo>;
        missions: Array<ActivityMissionItem>;
        rankRewards: Array<ActivityRankItem>;
        secretMalls: Array<ActivitySecretMall>;
        collectItems: Array<ActivityCollectItem>;
        lotteryGoods: Array<ActivityLotteryGoods>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LegInstRewardSupply implements aone.AoneBody {
        instanceId: number;
        supplyReward: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LegInstRewardInfo implements aone.AoneBody {
        instanceId: number;
        mobsReward: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MemberInfo implements aone.AoneBody {
        officialId: number;
        contribution: number;
        is_donate: number;
        enliven_all: number;
        enliven_day: number;
        enliven_seven: number;
        monarchbase: RoleBriefInfo;
        boss_time: number;
        buffIds: Array<number>;
        bossHurt: number;
        party_time: number;
        party_time_add: number;
        is_party_join: boolean;
        is_boss_join: boolean;
        applying: Array<number>;
        instance_time: number;
        instance_attendance: number;
        mobsReward: Array<LegInstRewardInfo>;
        leagueOutNumber: number;
        dailyMatchBattleWinTime: number;
        dailyMatchBattleScore: number;
        usedMatchGenerals: Array<number>;
        weekMatchBattleTime: number;
        weekMatchBattleScore: number;
        skillLevel: Array<IIKVPairs>;
        skillReset: Array<IIKVPairs>;
        instance_buy_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MemberStatic implements aone.AoneBody {
        memberId: number;
        level: number;
        pic_id: number;
        frame_id: number;
        memberName: string;
        donate_all: number;
        donate_day: number;
        donate_seven: number;
        animal_all: number;
        animal_day: number;
        animal_seven: number;
        instance_all: number;
        instance_day: number;
        instance_seven: number;
        dailyMatchBattleWinTime: number;
        dailyMatchBattleScore: number;
        weekMatchBattleWinTime: number;
        weekMatchBattleScore: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SinglecraftInfo implements aone.AoneBody {
        index: number;
        active_time: number;
        active_win: number;
        passive_time: number;
        passive_win: number;
        all_time: number;
        all_win: number;
        histroy_max_score: number;
        histroy_max_rank: number;
        active_win_swarm: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GameInfo implements aone.AoneBody {
        baseInfo: Array<RoleBaseInfo>;
        mixUnitInfo: Array<RoleMixUnit>;
        potatos: Array<PotatoInfo>;
        goodsInfo: Array<GoodsInfo>;
        delGoods: Array<number>;
        licenceInfo: Array<LicenceInfo>;
        missionInfo: Array<MissionInfo>;
        missionActive: Array<MissionActive>;
        generals: Array<GeneralInfo>;
        mobInfos: Array<MobInfo>;
        instanceInfo: Array<InstanceInfo>;
        towerInfo: Array<TowerInfo>;
        advisers: Array<AdviserInfo>;
        formations: Array<FormationInfo>;
        progresses: Array<ProgressInfo>;
        memberInfo: Array<MemberInfo>;
        wantedInfo: Array<WantedInfo>;
        activities: Array<ActivityInfo>;
        otherAttri: Array<RoleOtherAttri>;
        artifacts: Array<ArtifactInfo>;
        giftInfos: Array<GiftInfo>;
        delGiftIndexs: Array<number>;
        enemyCamp: Array<IIKVPairs>;
        singlecraft: Array<SinglecraftInfo>;
        generalHistoryIds: Array<number>;
        potatoHistoryIds: Array<number>;
        petInfo: Array<PetInfo>;
        getGoods: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemInfo implements aone.AoneBody {
        type: number;
        itemId: number;
        rank: number;
        value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankBaseItemInfo implements aone.AoneBody {
        rank: number;
        value: number;
        baseInfo: RoleBriefInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ClientOperate implements aone.AoneBody {
        operate_local: string;
        operate_scene: string;
        operate_object: string;
        operate_type: string;
        operate_result: string;
        operate_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBase implements aone.AoneBody {
        leagueId: number;
        picId: number;
        picFrameId: number;
        name: string;
        level: number;
        exp: number;
        rank: number;
        curNum: number;
        introduce: string;
        notice: string;
        join_condition: number;
        join_level: number;
        enliven_all: number;
        enliven_day: number;
        enliven_seven: number;
        leaderId: number;
        leaderName: string;
        isOnline: boolean;
        processes: Array<ProgressInfo>;
        adopted_count: number;
        instanceId: number;
        modify_name: number;
        match_join: boolean;
        match_score: number;
        match_rank: number;
        battle_value: number;
        recruitInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MemberApply implements aone.AoneBody {
        applicantTime: number;
        monarchbase: RoleBriefInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRecord implements aone.AoneBody {
        type: number;
        operater: string;
        operate_object: string;
        operate_result: number;
        generate_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkill implements aone.AoneBody {
        type: number;
        level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossHurtRank implements aone.AoneBody {
        roleId: number;
        rank: number;
        value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfo implements aone.AoneBody {
        stageInfo: ArmyStage;
        pos: number;
        generalIds: Array<number>;
        battleValue: number;
        is_win: boolean;
        is_boss: boolean;
        battle_time: number;
        memberId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfoSimple implements aone.AoneBody {
        pos: number;
        is_win: boolean;
        is_boss: boolean;
        curHp: number;
        roleMap: number;
        battle_time: number;
        memberId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceSimple implements aone.AoneBody {
        instance_id: number;
        startTime: number;
        stageInfos: Array<LeagueInstanceStageInfoSimple>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceRankItem implements aone.AoneBody {
        rank: number;
        value: number;
        baseInfo: RoleBriefInfo;
        battleValue: number;
        battleId: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortress implements aone.AoneBody {
        type: number;
        index: number;
        memberId: number;
        name: string;
        formationIndex: number;
        simpleFormation: SimpleFormationInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchInfo implements aone.AoneBody {
        leagueFortress: Array<LeagueMatchFortress>;
        fortressStar: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleFortressInfo implements aone.AoneBody {
        fortressStar: Array<IIKVPairs>;
        fortressTime: Array<IIKVPairs>;
        fortressMember: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInfo implements aone.AoneBody {
        info: LeagueBase;
        members: Array<MemberInfo>;
        applicants: Array<MemberApply>;
        picIds: Array<number>;
        picFrameIds: Array<number>;
        skills: Array<LeagueSkill>;
        instances: Array<LeagueInstanceSimple>;
        openInstanceIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OtherGameInfo implements aone.AoneBody {
        info: Array<LeagueInfo>;
        mailBoxs: Array<MailBoxInfo>;
        teachItems: Array<TeachItem>;
        operations: Array<boolean>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActionStateInfo implements aone.AoneBody {
        triggerTime: number;
        state: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ActionSkillInfo implements aone.AoneBody {
        triggerTime: number;
        type: number;
        index: number;
        atomic: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleActionInfo implements aone.AoneBody {
        skillInfos: Array<ActionSkillInfo>;
        stateInfos: Array<ActionStateInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillHurtTableInfo implements aone.AoneBody {
        hurt_id: number;
        proof_value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillTableInfo implements aone.AoneBody {
        skill_id: number;
        skill_cd: number;
        skill_cd_entry: number;
        skill_consume_rage: number;
        skill_hurt_ratio: number;
        skill_extra_value: number;
        hurts: Array<SkillHurtTableInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleGeneralInfo implements aone.AoneBody {
        stage: number;
        pos: number;
        type: number;
        generalInfo: GeneralInfo;
        totalDamage: number;
        recoverValue: number;
        skills: Array<SkillTableInfo>;
        plugin_state: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleStageAction implements aone.AoneBody {
        generalId: number;
        stage: number;
        pos: number;
        action: BattleActionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneEventAction implements aone.AoneBody {
        triggerTime: number;
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReplayDetailInfo implements aone.AoneBody {
        roleInfo: RoleBriefInfo;
        generals: Array<BattleGeneralInfo>;
        formation: FormationInfo;
        advisers: Array<AdviserInfo>;
        artifacts: Array<ArtifactInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReplayBattleInfo implements aone.AoneBody {
        seed: number;
        bgId: number;
        helpMaxNum: number;
        stageTimes: Array<number>;
        leftReplayInfo: ReplayDetailInfo;
        rightReplayInfo: ReplayDetailInfo;
        generalsCur: Array<ArmyUnitCur>;
        stageInfo: Array<ArmyStage>;
        stageActions: Array<BattleStageAction>;
        eventActions: Array<SceneEventAction>;
        battleSpeeds: Array<IIKVPairs>;
        buffTypes: Array<number>;
        battle_const: Array<number>;
        battleFakeData: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleResultInfo implements aone.AoneBody {
        is_check: boolean;
        battleId: string;
        battleType: number;
        battleResult: number;
        battleStar: number;
        battleTime: number;
        totalDamage: number;
        maxCombo: number;
        battleData: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MultiResultInfo implements aone.AoneBody {
        results: Array<BattleResultInfo>;
        leftFormation: Array<SimpleFormationInfo>;
        rightFormation: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ScenePosItem implements aone.AoneBody {
        joiner_id: number;
        sceneType: number;
        sceneId: number;
        posState: number;
        joinerType: number;
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ScenePosInfo implements aone.AoneBody {
        posItem: ScenePosItem;
        roleBase: RoleBriefInfo;
        hpPre: number;
        recovery_hp: number;
        buildId: number;
        clickTime: number;
        deadProtectTime: number;
        battleProtectTime: number;
        invincibleTime: number;
        fasterTime: number;
        frozenTime: number;
        otherBase: Array<RoleBriefInfo>;
        battleMode: number;
        kill_combo: number;
        kill_time: number;
        kill_rank: number;
        evil_value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleImitateResult implements aone.AoneBody {
        sceneType: number;
        sceneId: number;
        generate_time: number;
        battleType: number;
        battleResult: number;
        battleStar: number;
        leftRoleBase: RoleBriefInfo;
        rightRoleBase: RoleBriefInfo;
        leftArmy: Array<ArmyUnitCur>;
        rightArmy: Array<ArmyUnitCur>;
        leftGenerals: Array<GeneralSimpleInfo>;
        rightGenerals: Array<GeneralSimpleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneFightRoleInfo implements aone.AoneBody {
        posItem: ScenePosItem;
        battleMode: number;
        kill_combo: number;
        kill_combo_max: number;
        kill_time: number;
        killed_time: number;
        hpPre: number;
        buildId: number;
        clickTime: number;
        addBloodLeftTime: number;
        addSpeedLeftTime: number;
        fasterTime: number;
        deadProtectTime: number;
        battleProtectTime: number;
        invincibleTime: number;
        frozenTime: number;
        curGenerals: Array<ArmyUnitCur>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandRoleInfo implements aone.AoneBody {
        posInfo: SceneFightRoleInfo;
        mobsKillCount: number;
        evil_value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandRoleInfo implements aone.AoneBody {
        posInfo: SceneFightRoleInfo;
        mobsKillCount: number;
        evil_value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRoleInfo implements aone.AoneBody {
        posInfo: SceneFightRoleInfo;
        bossHurt: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossInfo implements aone.AoneBody {
        monster_id: number;
        monster_roleId: number;
        monster_name: number;
        des: number;
        monster_level: number;
        hp_pre: number;
        bossInfo: ArmyStage;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommentInfo implements aone.AoneBody {
        role_id: number;
        role_level: number;
        role_name: string;
        comment_id: number;
        post_id: number;
        publish_time: number;
        content: string;
        topValue: number;
        is_better: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PostInfo implements aone.AoneBody {
        type: number;
        type_id: number;
        post_id: number;
        role_info: RoleBriefInfo;
        publish_time: number;
        content: string;
        praises: number;
        is_praise: boolean;
        steps: number;
        is_step: boolean;
        power: number;
        formationInfo: SimpleFormationInfo;
        comment_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftRoleInfo implements aone.AoneBody {
        index: number;
        is_win: boolean;
        role_id: number;
        group_id: number;
        group_name: string;
        craft_score: number;
        craft_rank: number;
        craft_rank_self: number;
        battle_value: number;
        role_name: string;
        role_level: number;
        licence_level: number;
        pic: number;
        title_id: number;
        fashion_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftFormationInfo implements aone.AoneBody {
        index: number;
        simpleInfo: SimpleFormationInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesListItem implements aone.AoneBody {
        group_name: Array<string>;
        roles: Array<CraftRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftLeagueInfo implements aone.AoneBody {
        leagueId: number;
        leagueName: string;
        group_id: number;
        group_name: string;
        score: number;
        rank_self: number;
        opponentId: number;
        rank_final: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftLeagueBattleResultInfo implements aone.AoneBody {
        leagueId: number;
        result: number;
        self_star: string;
        self_old_score: number;
        self_score_changge: number;
        opponent_name: string;
        opponent_star: string;
        opponent_old_score: number;
        opponent_score_changge: number;
        battleId: number;
        createTime: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftLeagueRankInfo implements aone.AoneBody {
        group_id: number;
        leagueName: string;
        score: number;
        leagueId: number;
        rank: number;
        group_name: string;
        server_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandRankInfo implements aone.AoneBody {
        group_id: number;
        roleName: string;
        roleId: number;
        rank: number;
        score: number;
        groupName: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class CustomInstanceInfo implements aone.AoneBody {
        mobsMap: Array<MobInfo>;
        curAreaID: number;
        maxAreaID: number;
        curChapterID: number;
        maxChapterID: number;
        curMobID: number;
        maxMobID: number;
        bClear: boolean;
        bReview: boolean;
        instanceType: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomFormationInfo implements aone.AoneBody {
        formations: Array<FormationInfo>;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomFormationMap implements aone.AoneBody {
        units: Array<CustomFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomCharmInfo implements aone.AoneBody {
        formations: Array<number>;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomPushingGiftIndexInfo implements aone.AoneBody {
        index: Array<number>;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomSingleFormationInfo implements aone.AoneBody {
        formations: Array<FormationInfo>;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomPreSetBFormationInfo implements aone.AoneBody {
        formations: string;
        formationType: number;
        useIndex: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomPreSetFormationInfo implements aone.AoneBody {
        formations: Array<CustomPreSetBFormationInfo>;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CustomLastDoubleInfo implements aone.AoneBody {
        doubleInfo: string;
        lastTime: string;
        bPushed: boolean;
        ID: string;
        OwnerGroupID: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class SceneTribeInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneTribeInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneTribeInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneTribeInfoRespBody implements aone.AoneBody {
        tribeInfo: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneTribeInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneTribeInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChooseTribeReqBody implements aone.AoneBody {
        tribe: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChooseTribeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneChooseTribeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChooseTribeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChooseTribeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneChooseTribeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneEnterReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneEnterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneEnterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneEnterRespBody implements aone.AoneBody {
        sceneId: number;
        roleInfo: DarklandRoleInfo;
        posInfos: Array<ScenePosInfo>;
        cityId: number;
        group_name: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneEnterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneEnterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneLeaveReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneLeaveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneLeaveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneLeaveRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneLeaveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneLeaveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneMoveReqBody implements aone.AoneBody {
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneMoveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneMoveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneMoveRespBody implements aone.AoneBody {
        roleInfo: Array<DarklandRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneMoveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneMoveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneDeadCoolingReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneDeadCoolingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneDeadCoolingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneDeadCoolingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneDeadCoolingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneDeadCoolingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneFasterReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneFasterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneFasterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneFasterRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneFasterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneFasterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneAddBloodReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneAddBloodRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneAddBloodReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneAddBloodRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneAddBloodResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneAddBloodRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollectionReqBody implements aone.AoneBody {
        treeId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollectionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneCollectionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollectionRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollectionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneCollectionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollideReqBody implements aone.AoneBody {
        objectId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollideRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneCollideReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollideRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        battleResult: Array<number>;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneCollideResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneCollideRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneGetBranchInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneGetBranchInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneGetBranchInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneGetBranchInfoRespBody implements aone.AoneBody {
        branchInfo: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneGetBranchInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneGetBranchInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChangeBranchInfoReqBody implements aone.AoneBody {
        scene: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChangeBranchInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneChangeBranchInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChangeBranchInfoRespBody implements aone.AoneBody {
        sceneId: number;
        roleInfo: DarklandRoleInfo;
        posInfos: Array<ScenePosInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneChangeBranchInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneChangeBranchInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneClearEvilReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneClearEvilRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneClearEvilReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneClearEvilRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: DarklandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneClearEvilResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneClearEvilRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneQueryScoreRankReqBody implements aone.AoneBody {
        get_all: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneQueryScoreRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneQueryScoreRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneQueryScoreRankRespBody implements aone.AoneBody {
        ranks: Array<DarklandRankInfo>;
        self_rank: DarklandRankInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneQueryScoreRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SceneQueryScoreRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossEnterReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossEnterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossEnterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossEnterRespBody implements aone.AoneBody {
        roleInfo: DarklandRoleInfo;
        posInfos: Array<ScenePosInfo>;
        cityId: number;
        group_name: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossEnterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossEnterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossLeaveReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossLeaveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossLeaveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossLeaveRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossLeaveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossLeaveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossMoveReqBody implements aone.AoneBody {
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossMoveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossMoveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossMoveRespBody implements aone.AoneBody {
        roleInfo: Array<DarklandRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossMoveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossMoveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossInspireReqBody implements aone.AoneBody {
        inspireType: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossInspireRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossInspireReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossInspireRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossInspireResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossInspireRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossBattleResultReqBody implements aone.AoneBody {
        mobId: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        totalDamage: number;
        score: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossBattleResultRespBody implements aone.AoneBody {
        battle_id: string;
        new_score: number;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossScoreRankReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossScoreRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: DarklandBossScoreRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossScoreRankRespBody implements aone.AoneBody {
        ranks: Array<DarklandRankInfo>;
        self_rank: DarklandRankInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class DarklandBossScoreRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: DarklandBossScoreRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class GeneralExpPropReqBody implements aone.AoneBody {
        generalId: number;
        goods: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralExpPropRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralExpPropReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralExpPropRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralExpPropResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralExpPropRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRecruitReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRecruitRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralRecruitReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRecruitRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRecruitResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralRecruitRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSellReqBody implements aone.AoneBody {
        general_ids: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSellRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralSellReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSellRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSellResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralSellRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralWareHouseReqBody implements aone.AoneBody {
        is_ware: boolean;
        general_ids: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralWareHouseRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralWareHouseReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralWareHouseRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralWareHouseResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralWareHouseRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralComposeReqBody implements aone.AoneBody {
        compose_index: number;
        general_ids: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarReqBody implements aone.AoneBody {
        generalId: number;
        itemId: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralUpStarReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralUpStarRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpQualityReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpQualityRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralUpQualityReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpQualityRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpQualityResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralUpQualityRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralBreakReqBody implements aone.AoneBody {
        generalId: number;
        exchange_ids: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralBreakRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralBreakReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralBreakRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralBreakResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralBreakRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UseBreakSkillReqBody implements aone.AoneBody {
        generalId: number;
        skillId: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UseBreakSkillRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UseBreakSkillReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UseBreakSkillRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UseBreakSkillResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UseBreakSkillRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BreakSkillUplevelReqBody implements aone.AoneBody {
        generalId: number;
        skillId: number;
        index: number;
        consume_generalIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BreakSkillUplevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BreakSkillUplevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BreakSkillUplevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BreakSkillUplevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BreakSkillUplevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerComposeReqBody implements aone.AoneBody {
        partnerId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PartnerComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PartnerComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerActivateReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerActivateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PartnerActivateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerActivateRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PartnerActivateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PartnerActivateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarBatchReqBody implements aone.AoneBody {
        generalIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarBatchRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralUpStarBatchReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarBatchRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpStarBatchResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralUpStarBatchRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillUpLevelReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        isQuick: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillUpLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SkillUpLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillUpLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillUpLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SkillUpLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PassiveUpLevelReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PassiveUpLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PassiveUpLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PassiveUpLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PassiveUpLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PassiveUpLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AwakenPassiveToDoReqBody implements aone.AoneBody {
        is_study: boolean;
        is_upLevel: boolean;
        generalId: number;
        general: Array<number>;
        doll_num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AwakenPassiveToDoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AwakenPassiveToDoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AwakenPassiveToDoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AwakenPassiveToDoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AwakenPassiveToDoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddSkillReqBody implements aone.AoneBody {
        generalId: number;
        goods: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddSkillRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralAddSkillReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddSkillRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddSkillResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralAddSkillRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddFreindExpReqBody implements aone.AoneBody {
        generalId: number;
        friendId: number;
        goods: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddFreindExpRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralAddFreindExpReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddFreindExpRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralAddFreindExpResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralAddFreindExpRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FreindsToDoReqBody implements aone.AoneBody {
        is_activate: boolean;
        generalId: number;
        friendId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FreindsToDoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FreindsToDoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FreindsToDoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FreindsToDoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FreindsToDoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillResetReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillResetRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SkillResetReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillResetRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SkillResetResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SkillResetRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChooseFriendReqBody implements aone.AoneBody {
        generalId: number;
        friendId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChooseFriendRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChooseFriendReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChooseFriendRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChooseFriendResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChooseFriendRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionBuyReqBody implements aone.AoneBody {
        fashionId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionBuyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FashionBuyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionBuyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionBuyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FashionBuyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionWearReqBody implements aone.AoneBody {
        is_unwear: boolean;
        fashion_id: number;
        general_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionWearRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FashionWearReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionWearRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FashionWearResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FashionWearRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ComposeCarvePropReqBody implements aone.AoneBody {
        propId: number;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ComposeCarvePropRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ComposeCarvePropReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ComposeCarvePropRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ComposeCarvePropResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ComposeCarvePropRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRebirthReqBody implements aone.AoneBody {
        generalId: number;
        is_general_level: boolean;
        is_general_quality: boolean;
        is_general_skill: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRebirthRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralRebirthReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRebirthRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralRebirthResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralRebirthRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatActivateReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        statId: number;
        assist_item: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatActivateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralLifeStatActivateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatActivateRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatActivateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralLifeStatActivateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatBattleReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        statId: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralLifeStatBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralLifeStatBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralLifeStatBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicActivateReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicActivateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralPsychicActivateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicActivateRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicActivateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralPsychicActivateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicRefreshReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        consume_generalId: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicRefreshRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralPsychicRefreshReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicRefreshRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralPsychicRefreshResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralPsychicRefreshRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSelectEquipReqBody implements aone.AoneBody {
        generalId: number;
        equip_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSelectEquipRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralSelectEquipReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSelectEquipRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralSelectEquipResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralSelectEquipRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUplevelEquipReqBody implements aone.AoneBody {
        generalId: number;
        equip_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUplevelEquipRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralUplevelEquipReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUplevelEquipRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUplevelEquipResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralUplevelEquipRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpstepEquipReqBody implements aone.AoneBody {
        generalId: number;
        equip_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpstepEquipRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralUpstepEquipReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpstepEquipRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralUpstepEquipResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralUpstepEquipRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralTransferReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralTransferRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferSkillUpReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferSkillUpRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralTransferSkillUpReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferSkillUpRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferSkillUpResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralTransferSkillUpRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferTabReqBody implements aone.AoneBody {
        generalId: number;
        is_show_transfer: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferTabRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GeneralTransferTabReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferTabRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GeneralTransferTabResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GeneralTransferTabRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class ChallengeMobReqBody implements aone.AoneBody {
        sequence: number;
        mobsId: number;
        is_jump: boolean;
        battleInfo: BattleResultInfo;
        formation: Array<FormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeMobRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChallengeMobReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeMobRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        resultInfo: Array<BattleImitateResult>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeMobResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChallengeMobRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SweepMobsReqBody implements aone.AoneBody {
        mobsId: number;
        sweepCount: number;
        is_down: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SweepMobsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SweepMobsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SweepGoods implements aone.AoneBody {
        goodsInfo: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SweepMobsRespBody implements aone.AoneBody {
        sweepGoods: Array<SweepGoods>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SweepMobsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SweepMobsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMobsTimeReqBody implements aone.AoneBody {
        mobsId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMobsTimeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyMobsTimeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMobsTimeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMobsTimeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyMobsTimeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceChestReqBody implements aone.AoneBody {
        mobsId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceChestRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: InstanceChestReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceChestRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class InstanceChestResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: InstanceChestRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MobsListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsListRespBody implements aone.AoneBody {
        mobInfos: Array<MobInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MobsListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MobsListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardInstanceReqBody implements aone.AoneBody {
        type: number;
        instanceId: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardInstanceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardInstanceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardInstanceRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardInstanceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardInstanceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeVillageReqBody implements aone.AoneBody {
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeVillageRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChallengeVillageReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeVillageRespBody implements aone.AoneBody {
        addPerc: number;
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeVillageResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChallengeVillageRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VillageSweepReqBody implements aone.AoneBody {
        battle_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VillageSweepRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: VillageSweepReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VillageSweepRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VillageSweepResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: VillageSweepRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeTrainingReqBody implements aone.AoneBody {
        sequence: number;
        mobsId: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeTrainingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChallengeTrainingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeTrainingRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeTrainingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChallengeTrainingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardTrainingReqBody implements aone.AoneBody {
        mobsId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardTrainingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardTrainingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardTrainingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardTrainingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardTrainingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class StartSearchingReqBody implements aone.AoneBody {
        id: number;
        generals: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class StartSearchingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: StartSearchingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class StartSearchingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class StartSearchingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: StartSearchingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SpeedSearchingReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SpeedSearchingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SpeedSearchingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SpeedSearchingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SpeedSearchingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SpeedSearchingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardSearchingReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardSearchingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardSearchingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardSearchingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardSearchingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardSearchingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeRelicResultReqBody implements aone.AoneBody {
        sequence: number;
        mobsId: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeRelicResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChallengeRelicResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeRelicResultRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChallengeRelicResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChallengeRelicResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OpenRelicChestReqBody implements aone.AoneBody {
        chest_id: number;
        is_open_all: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OpenRelicChestRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OpenRelicChestReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OpenRelicChestRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OpenRelicChestResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OpenRelicChestRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshSearchingReqBody implements aone.AoneBody {
        id: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshSearchingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RefreshSearchingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshSearchingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RefreshSearchingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RefreshSearchingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LockSearchingReqBody implements aone.AoneBody {
        id: number;
        is_lock: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LockSearchingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LockSearchingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LockSearchingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LockSearchingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LockSearchingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LadderListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderListRespBody implements aone.AoneBody {
        ladders: Array<SimpleRoleFormationInfo>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderBattleReqBody implements aone.AoneBody {
        sequence: number;
        roleId: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderCoolingClearReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderCoolingClearRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderCoolingClearReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderCoolingClearRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderCoolingClearResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderCoolingClearRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderChallengeAddReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderChallengeAddRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderChallengeAddReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderChallengeAddRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderChallengeAddResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderChallengeAddRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderQuickRewardReqBody implements aone.AoneBody {
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderQuickRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderQuickRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderQuickRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderQuickRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderQuickRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderPraiseRankReqBody implements aone.AoneBody {
        rank: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderPraiseRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LadderPraiseRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderPraiseRankRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        ladder_praise: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LadderPraiseRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LadderPraiseRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LeagueOpenBossReqBody implements aone.AoneBody {
        animalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOpenBossRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueOpenBossReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOpenBossRespBody implements aone.AoneBody {
        bossInfo: ArmyStage;
        processes: Array<ProgressInfo>;
        members: Array<MemberInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOpenBossResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueOpenBossRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossSceneReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossSceneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossSceneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossSceneRespBody implements aone.AoneBody {
        bossInfo: ArmyStage;
        roleIds: Array<number>;
        rankItems: Array<LeagueBossHurtRank>;
        buffIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossSceneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueBossSceneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossInspireReqBody implements aone.AoneBody {
        inspireType: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossInspireRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossInspireReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossInspireRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        buffIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossInspireResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueBossInspireRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossBattleReqBody implements aone.AoneBody {
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossBattleRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        is_kill: boolean;
        bossHp: number;
        members: Array<MemberInfo>;
        progresses: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueBossBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossHurtReqBody implements aone.AoneBody {
        sequence: number;
        hurtValue: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossHurtRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossHurtReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossHurtRespBody implements aone.AoneBody {
        value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossHurtResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueBossHurtRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartySceneReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartySceneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeaguePartySceneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartySceneRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        members: Array<MemberInfo>;
        roleIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartySceneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeaguePartySceneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyReqBody implements aone.AoneBody {
        is_add: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeaguePartyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        members: Array<MemberInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeaguePartyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyAddReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyAddRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeaguePartyAddReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyAddRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        processes: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePartyAddResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeaguePartyAddRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRefreshReqBody implements aone.AoneBody {
        is_key: boolean;
        is_teach: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRefreshRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueFishingRefreshReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRefreshRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRefreshResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueFishingRefreshRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingStartReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingStartRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueFishingStartReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingStartRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingStartResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueFishingStartRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingEndReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingEndRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueFishingEndReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingEndRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingEndResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueFishingEndRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRewardReqBody implements aone.AoneBody {
        is_double: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueFishingRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueFishingRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueFishingRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceInfoReqBody implements aone.AoneBody {
        instanceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceInfoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        instances: Array<LeagueInstanceSimple>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBuyTimeReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBuyTimeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceBuyTimeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBuyTimeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBuyTimeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceBuyTimeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBattleReqBody implements aone.AoneBody {
        instanceId: number;
        pos: number;
        sequence: number;
        monstersCur: Array<ArmyUnitCur>;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        stageInfos: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceMobRewardReqBody implements aone.AoneBody {
        instanceId: number;
        pos: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceMobRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceMobRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceMobRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceMobRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceMobRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceRecordReqBody implements aone.AoneBody {
        instanceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceRecordRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceRecordReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceRecordRespBody implements aone.AoneBody {
        records: Array<LeagueRecord>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceRecordResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceRecordRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceHurtRankReqBody implements aone.AoneBody {
        instanceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceHurtRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceHurtRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceHurtRankRespBody implements aone.AoneBody {
        items: Array<LeagueInstanceRankItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceHurtRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceHurtRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceListRespBody implements aone.AoneBody {
        instances: Array<LeagueInstanceSimple>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfoReqBody implements aone.AoneBody {
        instanceId: number;
        pos: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceStageInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfoRespBody implements aone.AoneBody {
        stageInfos: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceStageInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInstanceStageInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LeagueMatchFortressReqBody implements aone.AoneBody {
        type: number;
        get_member: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchFortressReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimpleMemberFormationZip implements aone.AoneBody {
        formations: Array<SimpleMemberFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRespBody implements aone.AoneBody {
        leagueFortress: LeagueMatchInfo;
        member_formations: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchFortressRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSetFortressReqBody implements aone.AoneBody {
        type: number;
        member_id: Array<number>;
        formationIndex: Array<number>;
        index: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSetFortressRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchSetFortressReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSetFortressRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSetFortressResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchSetFortressRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSignReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchSignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSignRespBody implements aone.AoneBody {
        info: LeagueBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchSignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchSignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchOpponentInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentInfoRespBody implements aone.AoneBody {
        opponentInfo: CraftLeagueInfo;
        is_air: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchOpponentInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentFortressReqBody implements aone.AoneBody {
        league_id: number;
        type: number;
        get_self: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentFortressRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchOpponentFortressReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class leagueBattleName implements aone.AoneBody {
        index: number;
        name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentFortressRespBody implements aone.AoneBody {
        matchInfo: LeagueMatchInfo;
        battleInfo: LeagueMatchBattleFortressInfo;
        selfInfo: LeagueMatchInfo;
        leagueBattles: Array<leagueBattleName>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchOpponentFortressResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchOpponentFortressRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressTeamReqBody implements aone.AoneBody {
        league_id: number;
        type: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressTeamRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchFortressTeamReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressTeamRespBody implements aone.AoneBody {
        datailRoleFormation: DetailRoleFormationInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressTeamResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchFortressTeamRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressBattleResultReqBody implements aone.AoneBody {
        type: number;
        index: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        extraStr: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchFortressBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressBattleResultRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        battleInfo: LeagueMatchBattleFortressInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchFortressBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRecordReqBody implements aone.AoneBody {
        is_self: boolean;
        self_type: number;
        league_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRecordRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchFortressRecordReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRecordRespBody implements aone.AoneBody {
        records: Array<LeagueRecord>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFortressRecordResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchFortressRecordRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFinalListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFinalListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchFinalListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFinalListRespBody implements aone.AoneBody {
        firstRound: Array<CraftLeagueInfo>;
        winBattle: Array<CraftLeagueInfo>;
        lostBattle: Array<CraftLeagueInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchFinalListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchFinalListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryRankReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryRankRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchQueryRankReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryRankRespBody implements aone.AoneBody {
        ranks: Array<CraftLeagueRankInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryRankResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchQueryRankRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleResultReqBody implements aone.AoneBody {
        battle_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleResultRespBody implements aone.AoneBody {
        battleResult: CraftLeagueBattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryFormationReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryFormationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchQueryFormationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryFormationRespBody implements aone.AoneBody {
        formationIndex: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchQueryFormationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMatchQueryFormationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LeagueCreateReqBody implements aone.AoneBody {
        name: string;
        introduce: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueCreateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueCreateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueCreateRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        info: LeagueInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueCreateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueCreateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSearchReqBody implements aone.AoneBody {
        leagueId: number;
        key: string;
        start: number;
        num: number;
        is_batch: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSearchRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueSearchReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSearchRespBody implements aone.AoneBody {
        info: Array<LeagueBase>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSearchResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueSearchRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyReqBody implements aone.AoneBody {
        leagueid: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueApplyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        info: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueApplyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyDealReqBody implements aone.AoneBody {
        roleId: Array<number>;
        pass: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyDealRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueApplyDealReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyDealRespBody implements aone.AoneBody {
        info: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyDealResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueApplyDealRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInfoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        info: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueLogReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueLogRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueLogReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueLogRespBody implements aone.AoneBody {
        records: Array<LeagueRecord>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueLogResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueLogRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDonateReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDonateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueDonateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDonateRespBody implements aone.AoneBody {
        baseInfo: LeagueBase;
        members: Array<MemberInfo>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDonateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueDonateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillUpReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillUpRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueSkillUpReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillUpRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillUpResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueSkillUpRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillResetReqBody implements aone.AoneBody {
        types: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillResetRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueSkillResetReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillResetRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillResetResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueSkillResetRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillSelectReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillSelectRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueSkillSelectReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillSelectRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSkillSelectResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueSkillSelectRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePicReqBody implements aone.AoneBody {
        picId: number;
        picFrame: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePicRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeaguePicReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePicRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeaguePicResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeaguePicRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueJoinConditionReqBody implements aone.AoneBody {
        join_condition: number;
        join_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueJoinConditionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueJoinConditionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueJoinConditionRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueJoinConditionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueJoinConditionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueNoticeReqBody implements aone.AoneBody {
        notice: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueNoticeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueNoticeRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueNoticeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueNoticeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueIntroduceReqBody implements aone.AoneBody {
        introduce: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueIntroduceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueIntroduceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueIntroduceRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueIntroduceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueIntroduceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOfficialReqBody implements aone.AoneBody {
        roleId: number;
        official: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOfficialRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueOfficialReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOfficialRespBody implements aone.AoneBody {
        members: Array<MemberInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueOfficialResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueOfficialRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueModifyNameReqBody implements aone.AoneBody {
        name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueModifyNameRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueModifyNameReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueModifyNameRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        info: LeagueBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueModifyNameResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueModifyNameRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberStaticReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberStaticRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMemberStaticReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberStaticRespBody implements aone.AoneBody {
        members: Array<MemberStatic>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberStaticResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueMemberStaticRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueTransferReqBody implements aone.AoneBody {
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueTransferRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueTransferReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueTransferRespBody implements aone.AoneBody {
        info: LeagueBase;
        members: Array<MemberInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueTransferResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueTransferRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDisbandReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDisbandRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueDisbandReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDisbandRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueDisbandResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueDisbandRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueKickOutReqBody implements aone.AoneBody {
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueKickOutRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueKickOutReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueKickOutRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueKickOutResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueKickOutRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueQuitReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueQuitRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueQuitReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueQuitRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueQuitResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueQuitRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyQuickReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyQuickRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueApplyQuickReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyQuickRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        info: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyQuickResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueApplyQuickRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryLeagueInfoReqBody implements aone.AoneBody {
        leagueId: number;
        groupId: number;
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryLeagueInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryLeagueInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryLeagueInfoRespBody implements aone.AoneBody {
        info: Array<LeagueBase>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryLeagueInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryLeagueInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRecruitInfoReqBody implements aone.AoneBody {
        recruitInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRecruitInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueRecruitInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRecruitInfoRespBody implements aone.AoneBody {
        info: LeagueBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRecruitInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueRecruitInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LoginGameserverReqBody implements aone.AoneBody {
        token: number;
        roleId: number;
        userId: number;
        screen_w: number;
        screen_h: number;
        login_channel: string;
        push_channel: string;
        push_token: string;
        local_language: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginGameserverRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LoginGameserverReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginGameserverRespBody implements aone.AoneBody {
        sessionId: number;
        close_vip: boolean;
        close_func: boolean;
        preload: boolean;
        auth_type: number;
        gameInfo: Array<number>;
        loginInterval: number;
        web_pay: string;
        customer_name: string;
        customer_qq: string;
        customer_weichat: string;
        customer_web_pay: string;
        web_pay_sea: string;
        pay_types: Array<number>;
        pay_rebate: boolean;
        is_bindphone: boolean;
        share_roleId: number;
        is_share: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginGameserverResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LoginGameserverRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginByNameReqBody implements aone.AoneBody {
        roleName: string;
        passwd: string;
        deviceId: string;
        screen_w: number;
        screen_h: number;
        login_channel: string;
        push_channel: string;
        push_token: string;
        local_language: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginByNameRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LoginByNameReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginByNameRespBody implements aone.AoneBody {
        sessionId: number;
        close_vip: boolean;
        close_func: boolean;
        preload: boolean;
        auth_type: number;
        userid: number;
        gameInfo: Array<number>;
        loginInterval: number;
        web_pay: string;
        customer_name: string;
        customer_qq: string;
        customer_weichat: string;
        customer_web_pay: string;
        web_pay_sea: string;
        pay_types: Array<number>;
        pay_rebate: boolean;
        is_bindphone: boolean;
        share_roleId: number;
        is_share: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginByNameResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LoginByNameRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReconnectReqBody implements aone.AoneBody {
        sessionId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReconnectRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ReconnectReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReconnectRespBody implements aone.AoneBody {
        messageSeq: number;
        lastResponse: string;
        is_monitor: boolean;
        openTime: number;
        serverTime: number;
        week: number;
        lastPower: number;
        lastGoldPlate: number;
        loginInterval: number;
        version: number;
        gameInfo: Array<number>;
        web_pay: string;
        customer_name: string;
        customer_qq: string;
        customer_weichat: string;
        customer_web_pay: string;
        web_pay_sea: string;
        pay_types: Array<number>;
        pay_rebate: boolean;
        is_bindphone: boolean;
        share_roleId: number;
        is_share: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReconnectResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ReconnectRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleOtherInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleOtherInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryRoleOtherInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleOtherInfoRespBody implements aone.AoneBody {
        otherInfo: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleOtherInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryRoleOtherInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginPayReqBody implements aone.AoneBody {
        token: number;
        roleId: number;
        userId: number;
        screen_w: number;
        screen_h: number;
        login_channel: string;
        auto_type: number;
        push_channel: string;
        push_token: string;
        local_language: string;
        account_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LoginPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginPayRespBody implements aone.AoneBody {
        sessionId: number;
        close_vip: boolean;
        close_func: boolean;
        preload: boolean;
        auth_type: number;
        gameInfo: Array<number>;
        web_pay: string;
        customer_name: string;
        customer_qq: string;
        customer_weichat: string;
        customer_web_pay: string;
        web_pay_sea: string;
        pay_types: Array<number>;
        pay_rebate: boolean;
        is_bindphone: boolean;
        share_roleId: number;
        is_share: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LoginPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class GetMailCountReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailCountRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetMailCountReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailCountRespBody implements aone.AoneBody {
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailCountResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetMailCountRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailListReqBody implements aone.AoneBody {
        box_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetMailListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MailInfoZip implements aone.AoneBody {
        mails: Array<MailInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailListRespBody implements aone.AoneBody {
        mailBoxs: Array<MailBoxInfo>;
        mails: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetMailListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailDetailReqBody implements aone.AoneBody {
        box_type: number;
        mailIds: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailDetailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetMailDetailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailDetailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetMailDetailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetMailDetailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendRoleMailReqBody implements aone.AoneBody {
        type: number;
        to_id: number;
        to_name: string;
        title: string;
        content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendRoleMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SendRoleMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendRoleMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendRoleMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SendRoleMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveMailsReqBody implements aone.AoneBody {
        type: number;
        mailIds: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveMailsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RemoveMailsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveMailsRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveMailsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RemoveMailsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveAllMailsReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveAllMailsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RemoveAllMailsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveAllMailsRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveAllMailsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RemoveAllMailsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveAttachmentReqBody implements aone.AoneBody {
        type: number;
        mailIds: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveAttachmentRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SaveAttachmentReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveAttachmentRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveAttachmentResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SaveAttachmentRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryMailBoxsReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryMailBoxsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryMailBoxsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryMailBoxsRespBody implements aone.AoneBody {
        mailBoxs: Array<MailBoxInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryMailBoxsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryMailBoxsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace aone {
    class BinaryEncoder {
        private bytes_;
        private cursor_;
        constructor();
        private grow(need_length);
        readonly buffer: ArrayBuffer;
        readonly length: number;
        write_fixuint32(value: number, position?: number): void;
        write_bool(value: boolean): void;
        write_byte(value: number): void;
        write_int8(value: number): void;
        write_uint8(value: number): void;
        write_int16(value: number): void;
        write_uint16(value: number): void;
        write_int32(value: number): void;
        write_uint32(value: number): void;
        write_int64(value: number): void;
        write_uint64(value: number): void;
        write_float32(value: number): void;
        write_float64(value: number): void;
        write_enum(value: number): void;
        write_string(value: string): void;
        write_bool_array(value: Array<boolean>, len: number): void;
        write_byte_array(value: Array<number>, len: number): void;
        write_int8_array(value: Array<number>, len: number): void;
        write_uint8_array(value: Array<number>, len: number): void;
        write_int16_array(value: Array<number>, len: number): void;
        write_uint16_array(value: Array<number>, len: number): void;
        write_int32_array(value: Array<number>, len: number): void;
        write_uint32_array(value: Array<number>, len: number): void;
        write_int64_array(value: Array<number>, len: number): void;
        write_uint64_array(value: Array<number>, len: number): void;
        write_float32_array(value: Array<number>, len: number): void;
        write_float64_array(value: Array<number>, len: number): void;
        write_enum_array(value: Array<number>, len: number): void;
        write_string_array(value: Array<string>, len: number): void;
        write_bool_vector(value: Array<boolean>): void;
        write_byte_vector(value: Array<number>): void;
        write_int8_vector(value: Array<number>): void;
        write_uint8_vector(value: Array<number>): void;
        write_int16_vector(value: Array<number>): void;
        write_uint16_vector(value: Array<number>): void;
        write_int32_vector(value: Array<number>): void;
        write_uint32_vector(value: Array<number>): void;
        write_int64_vector(value: Array<number>): void;
        write_uint64_vector(value: Array<number>): void;
        write_float32_vector(value: Array<number>): void;
        write_float64_vector(value: Array<number>): void;
        write_enum_vector(value: Array<number>): void;
        write_string_vector(value: Array<string>): void;
    }
}
declare namespace message {
    class MissionListReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionListRespBody implements aone.AoneBody {
        infos: Array<MissionInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardReqBody implements aone.AoneBody {
        type: number;
        subType: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionActiveReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionActiveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionActiveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionActiveRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionActiveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionActiveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionNewReqBody implements aone.AoneBody {
        mission_type: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionNewRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionNewReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionNewRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionNewResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionNewRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionLicenceTestReqBody implements aone.AoneBody {
        licenceId: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionLicenceTestRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionLicenceTestReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionLicenceTestRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionLicenceTestResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionLicenceTestRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardLicenceReqBody implements aone.AoneBody {
        licenceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardLicenceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionRewardLicenceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardLicenceRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRewardLicenceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionRewardLicenceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRaceRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRaceRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionRaceRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRaceRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionRaceRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionRaceRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionJewelExchangeReqBody implements aone.AoneBody {
        index: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionJewelExchangeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionJewelExchangeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionJewelExchangeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionJewelExchangeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionJewelExchangeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionWeekMallReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionWeekMallRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MissionWeekMallReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionWeekMallRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MissionWeekMallResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: MissionWeekMallRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class RoleInfoNotice implements aone.AoneBody {
        gameInfo: GameInfo;
        is_pay: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleInfoNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RoleInfoNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleOtherInfoNotice implements aone.AoneBody {
        serverTime: number;
        week: number;
        otherGameInfo: OtherGameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleOtherInfoNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RoleOtherInfoNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatChannelChangeNotice implements aone.AoneBody {
        channel_id: number;
        channel_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatChannelChangeNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChatChannelChangeNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPCheckResultNotice implements aone.AoneBody {
        result: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPCheckResultNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IPCheckResultNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatMessageNotice implements aone.AoneBody {
        chatinfos: Array<ChatMessage>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChatMessageNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChatMessageNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MailStateNotice implements aone.AoneBody {
        mailBoxs: Array<MailBoxInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MailStateNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MailStateNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeNotice implements aone.AoneBody {
        token: number;
        chargeToken: number;
        chargeCount: number;
        vipLevel: number;
        vipExp: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChargeNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChargeNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyNotice implements aone.AoneBody {
        applyInfo: Array<MemberApply>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueApplyNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueApplyNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FriendApplyNotice implements aone.AoneBody {
        roleId: number;
        roleName: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FriendApplyNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FriendApplyNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveFormationNotice implements aone.AoneBody {
        type: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RemoveFormationNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RemoveFormationNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TeachStepNotice implements aone.AoneBody {
        items: Array<TeachItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TeachStepNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: TeachStepNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSceneJoinNotice implements aone.AoneBody {
        roleIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueSceneJoinNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueSceneJoinNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossNotice implements aone.AoneBody {
        type: number;
        value: number;
        progresses: Array<ProgressInfo>;
        is_win: boolean;
        rankItems: Array<LeagueBossHurtRank>;
        kill_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossRankNotice implements aone.AoneBody {
        rankItems: Array<LeagueBossHurtRank>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossRankNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossRankNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberNotice implements aone.AoneBody {
        noticeType: number;
        value: number;
        valueEx: number;
        strValue: string;
        members: Array<MemberInfo>;
        memberCount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMemberNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMemberNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossPartyNotice implements aone.AoneBody {
        progresses: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueBossPartyNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueBossPartyNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceNotice implements aone.AoneBody {
        instances: Array<LeagueInstanceSimple>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueInstanceNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueInstanceNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleNotice implements aone.AoneBody {
        matchInfo: LeagueMatchInfo;
        is_sign: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueMatchBattleNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueMatchBattleNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneItemPosInfoNotice implements aone.AoneBody {
        posInfos: Array<ScenePosInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneItemPosInfoNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneItemPosInfoNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleImitateResultNotice implements aone.AoneBody {
        battleResult: Array<number>;
        posInfos: Array<ScenePosInfo>;
        goodsInfo: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BattleImitateResultNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BattleImitateResultNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneItemPosNotice implements aone.AoneBody {
        posInfos: Array<ScenePosItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneItemPosNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneItemPosNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandRoleInfoNotice implements aone.AoneBody {
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandRoleInfoNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandRoleInfoNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossHpChangeNotice implements aone.AoneBody {
        joiner_id: number;
        cur_hp: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossHpChangeNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossHpChangeNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRoleInfoNotice implements aone.AoneBody {
        roleInfo: BossRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BossRoleInfoNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BossRoleInfoNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneBossResultNotice implements aone.AoneBody {
        cur_hp: number;
        max_hp: number;
        is_kill: boolean;
        kill_name: string;
        items: Array<RankBaseItemInfo>;
        progresses: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SceneBossResultNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SceneBossResultNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MatchingResultNotice implements aone.AoneBody {
        serverId: number;
        serverName: number;
        serverHost: string;
        serverPort: number;
        roleId: number;
        sessionId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MatchingResultNoticeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: MatchingResultNotice;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class PetGetReqBody implements aone.AoneBody {
        pet_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetGetRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PetGetReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetGetRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetGetResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PetGetRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetLevelUpReqBody implements aone.AoneBody {
        pet_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetLevelUpRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PetLevelUpReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetLevelUpRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetLevelUpResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PetLevelUpRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetEvolutionReqBody implements aone.AoneBody {
        pet_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetEvolutionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PetEvolutionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetEvolutionRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetEvolutionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PetEvolutionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetPlayingReqBody implements aone.AoneBody {
        pet_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetPlayingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PetPlayingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetPlayingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PetPlayingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PetPlayingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetPetHatReqBody implements aone.AoneBody {
        pet_id: number;
        is_hidden: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetPetHatRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetPetHatReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetPetHatRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetPetHatResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetPetHatRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class PotatoComposeReqBody implements aone.AoneBody {
        itemId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoComposeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoComposeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoComposeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoComposeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoComposeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakReqBody implements aone.AoneBody {
        index: number;
        generalId: number;
        potatoPos: number;
        otherIndex: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoBreakReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoBreakRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUplevelReqBody implements aone.AoneBody {
        index: number;
        generalId: number;
        potatoPos: number;
        upLevel: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUplevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoUplevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUplevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUplevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoUplevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoSoldReqBody implements aone.AoneBody {
        index: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoSoldRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoSoldReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoSoldRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoSoldResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoSoldRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoLockReqBody implements aone.AoneBody {
        index: number;
        generalId: number;
        potatoPos: number;
        is_lock: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoLockRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoLockReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoLockRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoLockResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoLockRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoWearReqBody implements aone.AoneBody {
        generalId: number;
        index: number;
        potatoPos: number;
        replaceJade: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoWearRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoWearReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoWearRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoWearResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoWearRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakthroughReqBody implements aone.AoneBody {
        index: number;
        generalId: number;
        potatoPos: number;
        otherIndex: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakthroughRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoBreakthroughReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakthroughRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoBreakthroughResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoBreakthroughRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUnloadAllReqBody implements aone.AoneBody {
        generalId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUnloadAllRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoUnloadAllReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUnloadAllRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoUnloadAllResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoUnloadAllRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoGrowthReqBody implements aone.AoneBody {
        index: number;
        generalId: number;
        potatoPos: number;
        attriId: number;
        range: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoGrowthRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PotatoGrowthReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoGrowthRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        rangeResult: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PotatoGrowthResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PotatoGrowthRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class RankLeagueItemInfo implements aone.AoneBody {
        rank: number;
        value: number;
        leagueInfo: LeagueBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemInfoReqBody implements aone.AoneBody {
        type: number;
        start: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RankItemInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemsZip implements aone.AoneBody {
        rankItemsInfo: Array<RankBaseItemInfo>;
        itemsInfo: Array<RankLeagueItemInfo>;
        praiseInfo: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemInfoRespBody implements aone.AoneBody {
        itemsZip: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RankItemInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RankItemInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelicRankInfoReqBody implements aone.AoneBody {
        instead_type: number;
        rank_type: number;
        start: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelicRankInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelicRankInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelicRankInfoRespBody implements aone.AoneBody {
        rankInfo: Array<RankBaseItemInfo>;
        sign: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelicRankInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelicRankInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRankInfoReqBody implements aone.AoneBody {
        rank_type: number;
        start: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRankInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LeagueRankInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRankInfoRespBody implements aone.AoneBody {
        info: Array<LeagueBase>;
        league_rank: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeagueRankInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LeagueRankInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class RelationAddReqBody implements aone.AoneBody {
        type: number;
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAddRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationAddReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAddRespBody implements aone.AoneBody {
        relations: Array<RelationInfo>;
        applying: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAddResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationAddRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAnswerFriendReqBody implements aone.AoneBody {
        roleIds: Array<number>;
        is_agree: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAnswerFriendRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationAnswerFriendReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAnswerFriendRespBody implements aone.AoneBody {
        relations: Array<RelationInfo>;
        applys: Array<RoleApply>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationAnswerFriendResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationAnswerFriendRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationDeleteReqBody implements aone.AoneBody {
        type: number;
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationDeleteRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationDeleteReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationDeleteRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationDeleteResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationDeleteRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfoZip implements aone.AoneBody {
        relationApplying: Array<number>;
        applys: Array<RoleApply>;
        relations: Array<RelationInfo>;
        givepower: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfoRespBody implements aone.AoneBody {
        relationInfo: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationListReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationListRespBody implements aone.AoneBody {
        relations: Array<RelationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationApplyListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationApplyListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationApplyListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationApplyListRespBody implements aone.AoneBody {
        applys: Array<RoleApply>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationApplyListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationApplyListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationSearchListReqBody implements aone.AoneBody {
        roleId: number;
        roleName: string;
        beginPos: number;
        num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationSearchListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationSearchListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationSearchListRespBody implements aone.AoneBody {
        srhs: Array<RoleBriefInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationSearchListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationSearchListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationGivePowerReqBody implements aone.AoneBody {
        roleIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationGivePowerRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationGivePowerReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationGivePowerRespBody implements aone.AoneBody {
        givepower: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationGivePowerResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationGivePowerRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationRewardPowerReqBody implements aone.AoneBody {
        roleIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationRewardPowerRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RelationRewardPowerReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationRewardPowerRespBody implements aone.AoneBody {
        relations: Array<RelationInfo>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RelationRewardPowerResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RelationRewardPowerRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class ClientOperateChunk implements aone.AoneBody {
        clientOperate: Array<ClientOperate>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HeartBeatReqBody implements aone.AoneBody {
        clientOperate: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HeartBeatRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: HeartBeatReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HeartBeatRespBody implements aone.AoneBody {
        is_monitor: boolean;
        auth_type: number;
        token: number;
        money: number;
        power: number;
        goldPlate: number;
        openTime: number;
        serverTime: number;
        week: number;
        lastPower: number;
        lastGoldPlate: number;
        version: number;
        processes: Array<ProgressInfo>;
        singlecraftState: number;
        towerRefreshTime: number;
        server_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HeartBeatResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: HeartBeatRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleInfoReqBody implements aone.AoneBody {
        roleId: number;
        group_id: number;
        battle_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryRoleInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleInfoZip implements aone.AoneBody {
        baseInfo: RoleBriefInfo;
        generals: Array<GeneralInfo>;
        advisers: Array<AdviserInfo>;
        artifacts: Array<ArtifactInfo>;
        formations: Array<DetailFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleInfoRespBody implements aone.AoneBody {
        roleInfo: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryRoleInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryRoleInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeDetailReqBody implements aone.AoneBody {
        agree_detail: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeDetailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetAgreeDetailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeDetailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeDetailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetAgreeDetailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeEnterReqBody implements aone.AoneBody {
        agree_enter: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeEnterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetAgreeEnterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeEnterRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetAgreeEnterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetAgreeEnterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UsePropReqBody implements aone.AoneBody {
        goodses: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UsePropRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UsePropReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UsePropRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        goodses: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UsePropResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UsePropRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SellGoodsReqBody implements aone.AoneBody {
        goodses: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SellGoodsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SellGoodsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SellGoodsRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SellGoodsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SellGoodsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckProcessReqBody implements aone.AoneBody {
        types: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckProcessRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CheckProcessReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckProcessRespBody implements aone.AoneBody {
        processes: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckProcessResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CheckProcessRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPowerReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPowerRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyPowerReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPowerRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPowerResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyPowerRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPlateReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPlateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyPlateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPlateRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPlateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyPlateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRoleNameReqBody implements aone.AoneBody {
        name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRoleNameRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ModifyRoleNameReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRoleNameRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRoleNameResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ModifyRoleNameRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRolePicReqBody implements aone.AoneBody {
        picId: number;
        picFrame: number;
        titleId: number;
        viceTitleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRolePicRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ModifyRolePicReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRolePicRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ModifyRolePicResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ModifyRolePicRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardRoleTitleReqBody implements aone.AoneBody {
        titleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardRoleTitleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardRoleTitleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardRoleTitleRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardRoleTitleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardRoleTitleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryTeachInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryTeachInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryTeachInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryTeachInfoRespBody implements aone.AoneBody {
        teachItems: Array<TeachItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryTeachInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryTeachInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveTeachInfoReqBody implements aone.AoneBody {
        teachItems: Array<TeachItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveTeachInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SaveTeachInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveTeachInfoRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveTeachInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SaveTeachInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveClientOperationReqBody implements aone.AoneBody {
        clientOperation: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveClientOperationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SaveClientOperationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveClientOperationRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SaveClientOperationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SaveClientOperationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ClientCoreRecordReqBody implements aone.AoneBody {
        errorLine: string;
        errorStack: string;
        deviceInfo: DeviceInfo;
        appVersion: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ClientCoreRecordRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ClientCoreRecordReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ClientCoreRecordRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ClientCoreRecordResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ClientCoreRecordRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayBackByHuntCoinReqBody implements aone.AoneBody {
        index: string;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayBackByHuntCoinRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PayBackByHuntCoinReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayBackByHuntCoinRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayBackByHuntCoinResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PayBackByHuntCoinRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class SimulateModifyRoleLevelReqBody implements aone.AoneBody {
        level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyRoleLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateModifyRoleLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyRoleLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyRoleLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateModifyRoleLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyGoodsReqBody implements aone.AoneBody {
        goods: Array<GoodsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyGoodsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateModifyGoodsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyGoodsRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyGoodsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateModifyGoodsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChargeReqBody implements aone.AoneBody {
        activity_index: number;
        secret_mall: number;
        payIndex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChargeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateChargeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChargeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChargeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateChargeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyResReqBody implements aone.AoneBody {
        type: number;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyResRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateModifyResReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyResRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyResResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateModifyResRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateDeleteGoodsReqBody implements aone.AoneBody {
        itemIds: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateDeleteGoodsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateDeleteGoodsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateDeleteGoodsRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateDeleteGoodsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateDeleteGoodsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyLeagueLevelReqBody implements aone.AoneBody {
        id: number;
        level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyLeagueLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateModifyLeagueLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyLeagueLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateModifyLeagueLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateModifyLeagueLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateInstanceReqBody implements aone.AoneBody {
        instanceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateInstanceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateInstanceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateInstanceRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateInstanceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateInstanceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueEnlivenReqBody implements aone.AoneBody {
        enliven: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueEnlivenRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLeagueEnlivenReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueEnlivenRespBody implements aone.AoneBody {
        leagueInfo: LeagueInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueEnlivenResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLeagueEnlivenRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceClearReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceClearRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLeagueInstanceClearReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceClearRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceClearResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLeagueInstanceClearRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateArtifactReqBody implements aone.AoneBody {
        artifactId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateArtifactRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateArtifactReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateArtifactRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateArtifactResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateArtifactRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGenaralStarReqBody implements aone.AoneBody {
        generalId: number;
        star_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGenaralStarRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateGenaralStarReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralStarRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralStarResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateGeneralStarRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLeagueInstanceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceRespBody implements aone.AoneBody {
        info: LeagueBase;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLeagueInstanceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateResetSceneBossReqBody implements aone.AoneBody {
        time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateResetSceneBossRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateResetSceneBossReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateResetSceneBossRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateResetSceneBossResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateResetSceneBossRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5QueryRoleInfoReqBody implements aone.AoneBody {
        role_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5QueryRoleInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateH5QueryRoleInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5QueryRoleInfoRespBody implements aone.AoneBody {
        h5_pay_info: H5RolePayInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5QueryRoleInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateH5QueryRoleInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5ReceiveChargeRewardReqBody implements aone.AoneBody {
        role_id: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5ReceiveChargeRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateH5ReceiveChargeRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5ReceiveChargeRewardRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateH5ReceiveChargeRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateH5ReceiveChargeRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeMobReqBody implements aone.AoneBody {
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        mobsId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeMobRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateChallengeMobReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeMobRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeMobResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateChallengeMobRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeVillageReqBody implements aone.AoneBody {
        sequence: number;
        battleType: number;
        battleResult: number;
        battleStar: number;
        battleTime: number;
        totalDamage: number;
        maxCombo: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeVillageRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateChallengeVillageReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeVillageRespBody implements aone.AoneBody {
        addPerc: number;
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateChallengeVillageResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateChallengeVillageRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLadderBattleReqBody implements aone.AoneBody {
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLadderBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLadderBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLadderBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLadderBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLadderBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTowerChallengeReqBody implements aone.AoneBody {
        battleType: number;
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        instanceId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTowerChallengeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateTowerChallengeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTowerChallengeRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTowerChallengeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateTowerChallengeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateWantedBattleReqBody implements aone.AoneBody {
        wantedId: number;
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateWantedBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateWantedBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateWantedBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateWantedBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateWantedBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTrainingReqBody implements aone.AoneBody {
        sequence: number;
        mobsId: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTrainingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateTrainingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTrainingRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateTrainingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateTrainingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueBossReqBody implements aone.AoneBody {
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        totalDamage: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueBossRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLeagueBossReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueBossRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        is_kill: boolean;
        bossHp: number;
        members: Array<MemberInfo>;
        progresses: Array<ProgressInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueBossResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLeagueBossRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceBattleReqBody implements aone.AoneBody {
        instanceId: number;
        pos: number;
        sequence: number;
        monstersCur: Array<ArmyUnitCur>;
        battleResult: number;
        battleStar: number;
        totalDamage: number;
        maxCombo: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateLeagueInstanceBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        stageInfos: Array<LeagueInstanceStageInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateLeagueInstanceBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateLeagueInstanceBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateEnemyCampBattleReqBody implements aone.AoneBody {
        enemyCampId: number;
        sequence: number;
        battleResult: number;
        battleStar: number;
        generals: Array<number>;
        reserves: Array<number>;
        supports: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateEnemyCampBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateEnemyCampBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateEnemyCampBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateEnemyCampBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateEnemyCampBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralLifeStatBattleReqBody implements aone.AoneBody {
        generalId: number;
        pos: number;
        statId: number;
        sequence: number;
        battleResult: number;
        battleStar: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralLifeStatBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateGeneralLifeStatBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralLifeStatBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateGeneralLifeStatBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateGeneralLifeStatBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateCraftBattleReqBody implements aone.AoneBody {
        sequence: number;
        battleResult: number;
        battleStar: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateCraftBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SimulateCraftBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateCraftBattleRespBody implements aone.AoneBody {
        craft_result: number;
        craft_score: number;
        craft_rank: number;
        battle_id: string;
        gameInfo: GameInfo;
        leftFormation: Array<SimpleFormationInfo>;
        rightFormation: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SimulateCraftBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SimulateCraftBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class CraftRoleInfoChunk implements aone.AoneBody {
        roles: Array<CraftRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryListReqBody implements aone.AoneBody {
        is_refresh: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftQueryListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryListRespBody implements aone.AoneBody {
        index: number;
        roleinfos: Array<CraftRoleInfo>;
        score: number;
        rank: number;
        rank_self: number;
        zone: number;
        group_name: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftQueryListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryDetailReqBody implements aone.AoneBody {
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryDetailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftQueryDetailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryDetailRespBody implements aone.AoneBody {
        formations: Array<CraftFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftQueryDetailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftQueryDetailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBuyTimeReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBuyTimeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftBuyTimeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBuyTimeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBuyTimeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftBuyTimeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBattleReqBody implements aone.AoneBody {
        sequence: number;
        battleInfo: BattleResultInfo;
        leftFormation: Array<SimpleFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBattleRespBody implements aone.AoneBody {
        result: number;
        battle_id: string;
        gameInfo: GameInfo;
        leftFormation: Array<SimpleFormationInfo>;
        rightFormation: Array<SimpleFormationInfo>;
        score: number;
        rank: number;
        other_score: number;
        other_rank: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftRankListReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftRankListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftRankListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftRankListRespBody implements aone.AoneBody {
        roles: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftRankListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftRankListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesListChunk implements aone.AoneBody {
        items: Array<CraftElitesListItem>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesRankListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesRankListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CraftElitesRankListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesRankListRespBody implements aone.AoneBody {
        items: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CraftElitesRankListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CraftElitesRankListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContendQueryListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryListRespBody implements aone.AoneBody {
        firstRound: Array<IIKVPairs>;
        secondRound: Array<IIKVPairs>;
        thirdRound: Array<IIKVPairs>;
        fourthRound: Array<IIKVPairs>;
        fifthRound: Array<IIKVPairs>;
        battle_roles: Array<number>;
        opponent: number;
        last_opponent: number;
        zone: number;
        round: number;
        group_name: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContendQueryListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryDetailReqBody implements aone.AoneBody {
        opponent: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryDetailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContendQueryDetailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryDetailRespBody implements aone.AoneBody {
        formations: Array<CraftFormationInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryDetailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContendQueryDetailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendBattleResultReqBody implements aone.AoneBody {
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContendBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendBattleResultRespBody implements aone.AoneBody {
        result: number;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContendBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendRankInfoReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendRankInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContendRankInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendRankInfoRespBody implements aone.AoneBody {
        roles: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendRankInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContendRankInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryResultReqBody implements aone.AoneBody {
        round: number;
        role_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContendQueryResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryResultRespBody implements aone.AoneBody {
        battle_result: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContendQueryResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContendQueryResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class TowerChallengeReqBody implements aone.AoneBody {
        sequence: number;
        instanceId: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TowerChallengeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: TowerChallengeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TowerChallengeRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class TowerChallengeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: TowerChallengeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LoginRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LoginRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LoginRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LoginRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FacebookRewardReqBody implements aone.AoneBody {
        index: number;
        general_id: number;
        equip_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FacebookRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FacebookRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FacebookRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FacebookRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FacebookRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNormalLotteryReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNormalLotteryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardNormalLotteryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNormalLotteryRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNormalLotteryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardNormalLotteryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FirstChargeRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FirstChargeRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FirstChargeRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FirstChargeRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FirstChargeRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FirstChargeRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SPgeneralRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SPgeneralRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SPgeneralRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SPgeneralRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SPgeneralRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SPgeneralRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NormalLotteryReqBody implements aone.AoneBody {
        lottery_type: number;
        soda_num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NormalLotteryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: NormalLotteryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NormalLotteryRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NormalLotteryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: NormalLotteryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CardBagOpenReqBody implements aone.AoneBody {
        bag_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CardBagOpenRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CardBagOpenReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CardBagOpenRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CardBagOpenResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CardBagOpenRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMonthGiftReqBody implements aone.AoneBody {
        gift_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMonthGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyMonthGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMonthGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMonthGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyMonthGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitLevelReqBody implements aone.AoneBody {
        is_senior: boolean;
        level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitLevelRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardPermitLevelReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitLevelRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitLevelResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardPermitLevelRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitMissionReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitMissionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardPermitMissionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitMissionRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardPermitMissionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardPermitMissionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMoneyReqBody implements aone.AoneBody {
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMoneyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyMoneyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMoneyRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMoneyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyMoneyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyFundRewardReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyFundRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyFundRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyFundRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyFundRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyFundRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReceiveFundRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReceiveFundRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ReceiveFundRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReceiveFundRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ReceiveFundRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ReceiveFundRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRewardReqBody implements aone.AoneBody {
        share_type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ShareRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ShareRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NewGiftExistReqBody implements aone.AoneBody {
        giftIndex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NewGiftExistRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: NewGiftExistReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NewGiftExistRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class NewGiftExistResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: NewGiftExistRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AcceptActivationReqBody implements aone.AoneBody {
        activation: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AcceptActivationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AcceptActivationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AcceptActivationRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AcceptActivationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AcceptActivationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GainRunesReqBody implements aone.AoneBody {
        isNovice: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GainRunesRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GainRunesReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GainRunesRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GainRunesResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GainRunesRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChangeRunesReqBody implements aone.AoneBody {
        isNovice: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChangeRunesRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ChangeRunesReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChangeRunesRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChangeRunesResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ChangeRunesRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RunesRewardReqBody implements aone.AoneBody {
        isNovice: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RunesRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RunesRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RunesRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RunesRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RunesRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNewGiftReqBody implements aone.AoneBody {
        giftIndex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNewGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardNewGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNewGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardNewGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardNewGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetNewGiftReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetNewGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetNewGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetNewGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetNewGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetNewGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardFormNewGiftReqBody implements aone.AoneBody {
        giftIndex: number;
        dailyindex: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardFormNewGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardFormNewGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardFormNewGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardFormNewGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardFormNewGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangeMallReqBody implements aone.AoneBody {
        type: number;
        mallId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangeMallRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ExchangeMallReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangeMallRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangeMallResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ExchangeMallRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetRoleLotteryFruitReqBody implements aone.AoneBody {
        redFruit: number;
        blueFruit: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetRoleLotteryFruitRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetRoleLotteryFruitReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetRoleFruitInfoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        fruitInfo: PublicFruitInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetRoleFruitInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetRoleFruitInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetLotteryFruitInfoReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetLotteryFruitInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetLotteryFruitInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetLotteryFruitInfoRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        fruitInfo: PublicFruitInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetLotteryFruitInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetLotteryFruitInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationReqBody implements aone.AoneBody {
        identificationCode: string;
        realName: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IdentificationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IdentificationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationQueryReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationQueryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IdentificationQueryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationQueryRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdentificationQueryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IdentificationQueryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyResourceReqBody implements aone.AoneBody {
        restype: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyResourceRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyResourceReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyResourceRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyResourceResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyResourceRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickMallReqBody implements aone.AoneBody {
        item_id: number;
        item_num: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickMallRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QuickMallReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickMallRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickMallResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QuickMallRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIntegralReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIntegralRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryIntegralReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIntegralRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIntegralResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryIntegralRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralLotteryReqBody implements aone.AoneBody {
        lottery_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralLotteryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IntegralLotteryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralLotteryRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralLotteryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IntegralLotteryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralExchangeReqBody implements aone.AoneBody {
        exchangeId: number;
        exchange_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralExchangeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IntegralExchangeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralExchangeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralExchangeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IntegralExchangeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpStarRewardReqBody implements aone.AoneBody {
        star_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpStarRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UpStarRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpStarRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpStarRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UpStarRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UpLevelRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UpLevelRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UpLevelRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BigVipRewardReqBody implements aone.AoneBody {
        star_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BigVipRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BigVipRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BigVipRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BigVipRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BigVipRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetHaloReqBody implements aone.AoneBody {
        halo_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetHaloRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SetHaloReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetHaloRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SetHaloResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SetHaloRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuySevenNewGiftReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuySevenNewGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuySevenNewGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuySevenNewGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuySevenNewGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuySevenNewGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangePartnerReqBody implements aone.AoneBody {
        partnerId: number;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangePartnerRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ExchangePartnerReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangePartnerRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExchangePartnerResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ExchangePartnerRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPotatoCountReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPotatoCountRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyPotatoCountReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPotatoCountRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyPotatoCountResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyPotatoCountRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanLotteryReqBody implements aone.AoneBody {
        lottery_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanLotteryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: XuyuanLotteryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanLotteryRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanLotteryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: XuyuanLotteryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanExchangeReqBody implements aone.AoneBody {
        exchangeId: number;
        exchange_time: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanExchangeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: XuyuanExchangeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanExchangeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanExchangeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: XuyuanExchangeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanStepRewardReqBody implements aone.AoneBody {
        step_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanStepRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: XuyuanStepRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanStepRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XuyuanStepRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: XuyuanStepRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyPhoneCodeReqBody implements aone.AoneBody {
        phone: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyPhoneCodeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ApplyPhoneCodeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyPhoneCodeRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyPhoneCodeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ApplyPhoneCodeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyPhoneCodeReqBody implements aone.AoneBody {
        phone: string;
        code: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyPhoneCodeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: VerifyPhoneCodeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyPhoneCodeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyPhoneCodeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: VerifyPhoneCodeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBindPhoneReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBindPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryBindPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBindPhoneRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryBindPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryBindPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRelationReqBody implements aone.AoneBody {
        roleId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRelationRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ShareRelationReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRelationRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareRelationResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ShareRelationRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareTaskRewardReqBody implements aone.AoneBody {
        type: number;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareTaskRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ShareTaskRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareTaskRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareTaskRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ShareTaskRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareUrlReqBody implements aone.AoneBody {
        share_url: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareUrlRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ShareUrlReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareUrlRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareUrlResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ShareUrlRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LowVipBuyWealReqBody implements aone.AoneBody {
        weal_level: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LowVipBuyWealRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: LowVipBuyWealReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LowVipBuyWealRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LowVipBuyWealResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: LowVipBuyWealRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecievePowerReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecievePowerRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecievePowerReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecievePowerRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecievePowerResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecievePowerRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralBuyGiftReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralBuyGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IntegralBuyGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralBuyGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IntegralBuyGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IntegralBuyGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareSGeneralReqBody implements aone.AoneBody {
        general_index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareSGeneralRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ShareSGeneralReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareSGeneralRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ShareSGeneralResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ShareSGeneralRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OnlineTimeRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OnlineTimeRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OnlineTimeRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OnlineTimeRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OnlineTimeRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OnlineTimeRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContinuePayRewardReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContinuePayRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ContinuePayRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContinuePayRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ContinuePayRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ContinuePayRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SignReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SignRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMissionGiftReqBody implements aone.AoneBody {
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMissionGiftRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BuyMissionGiftReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMissionGiftRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BuyMissionGiftResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BuyMissionGiftRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardEverydayChargeReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardEverydayChargeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RewardEverydayChargeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardEverydayChargeRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RewardEverydayChargeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RewardEverydayChargeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class WantedQueryReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedQueryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WantedQueryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedQueryRespBody implements aone.AoneBody {
        mapRoles: Array<number>;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedQueryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WantedQueryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedRefreshRewardReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedRefreshRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WantedRefreshRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedRefreshRewardRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedRefreshRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WantedRefreshRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedSweepReqBody implements aone.AoneBody {
        wantedId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedSweepRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WantedSweepReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedSweepRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedSweepResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WantedSweepRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBattleReqBody implements aone.AoneBody {
        wantedId: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WantedBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WantedBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBuyTicketReqBody implements aone.AoneBody {
        ticketId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBuyTicketRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WantedBuyTicketReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBuyTicketRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WantedBuyTicketResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WantedBuyTicketRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampQueryReqBody implements aone.AoneBody {
        type: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampQueryRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: EnemyCampQueryReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampQueryRespBody implements aone.AoneBody {
        leftTime: number;
        mapRoles: number;
        maxLevel: number;
        rankItems: Array<BattleRankInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampQueryResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: EnemyCampQueryRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampBattleReqBody implements aone.AoneBody {
        enemyCampId: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampBattleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: EnemyCampBattleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampBattleRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class EnemyCampBattleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: EnemyCampBattleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleResultReqBody implements aone.AoneBody {
        Id: number;
        sequence: number;
        battleInfo: BattleResultInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleResultRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GroupBattleResultReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleResultRespBody implements aone.AoneBody {
        battle_id: string;
        gameInfo: GameInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupBattleResultResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GroupBattleResultRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class WonderlandEnterReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandEnterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandEnterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandEnterRespBody implements aone.AoneBody {
        roleInfo: WonderlandRoleInfo;
        posInfos: Array<ScenePosInfo>;
        sceneId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandEnterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandEnterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandLeaveReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandLeaveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandLeaveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandLeaveRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandLeaveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandLeaveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandMoveReqBody implements aone.AoneBody {
        scene_x: number;
        scene_y: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandMoveRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandMoveReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandMoveRespBody implements aone.AoneBody {
        roleInfo: Array<WonderlandRoleInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandMoveResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandMoveRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandDeadCoolingReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandDeadCoolingRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandDeadCoolingReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandDeadCoolingRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandDeadCoolingResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandDeadCoolingRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandFasterReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandFasterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandFasterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandFasterRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandFasterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandFasterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandAddBloodReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandAddBloodRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandAddBloodReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandAddBloodRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandAddBloodResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandAddBloodRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandBattleModeReqBody implements aone.AoneBody {
        battleMode: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandBattleModeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandBattleModeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandBattleModeRespBody implements aone.AoneBody {
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandBattleModeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandBattleModeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollectionReqBody implements aone.AoneBody {
        treeId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollectionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandCollectionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollectionRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollectionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandCollectionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandClearEvilReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandClearEvilRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandClearEvilReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandClearEvilRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandClearEvilResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandClearEvilRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollideReqBody implements aone.AoneBody {
        objectId: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollideRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandCollideReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollideRespBody implements aone.AoneBody {
        gameInfo: GameInfo;
        battleResult: Array<number>;
        roleInfo: WonderlandRoleInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandCollideResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandCollideRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandGetBranchInfoReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandGetBranchInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandGetBranchInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandGetBranchInfoRespBody implements aone.AoneBody {
        branchInfo: Array<IIKVPairs>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandGetBranchInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandGetBranchInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandChangeBranchInfoReqBody implements aone.AoneBody {
        id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandChangeBranchInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WonderlandChangeBranchInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandChangeBranchInfoRespBody implements aone.AoneBody {
        sceneId: number;
        roleInfo: WonderlandRoleInfo;
        posInfos: Array<ScenePosInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WonderlandChangeBranchInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WonderlandChangeBranchInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class QuickLoginReqBody implements aone.AoneBody {
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        delay_ms: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QuickLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        aone_account: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QuickLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SDKLoginReqBody implements aone.AoneBody {
        sdk_userid: string;
        sdk_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        sdk_version: string;
        delay_ms: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SDKLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SDKLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SDKLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        ext: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SDKLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SDKLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthLoginReqBody implements aone.AoneBody {
        oauth_type: string;
        oauth_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        delay_ms: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OAuthLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        ext: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OAuthLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthBindReqBody implements aone.AoneBody {
        oauth_type: string;
        oauth_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        oauth_account: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthBindRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OAuthBindReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthBindRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        ext: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthBindResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OAuthBindRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindReqBody implements aone.AoneBody {
        account: string;
        password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneBindReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        aone_account: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneBindRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneRegisterReqBody implements aone.AoneBody {
        account: string;
        password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneRegisterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneRegisterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneRegisterRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneRegisterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneRegisterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneLoginReqBody implements aone.AoneBody {
        account: string;
        password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        delay_ms: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneChangePasswordReqBody implements aone.AoneBody {
        user_id: number;
        token: string;
        old_password: string;
        new_password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneChangePasswordRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneChangePasswordReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneChangePasswordRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneChangePasswordResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneChangePasswordRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByPhoneReqBody implements aone.AoneBody {
        action: string;
        phone: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ApplyTokenByPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByPhoneRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ApplyTokenByPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindPhoneReqBody implements aone.AoneBody {
        user_id: number;
        phone: string;
        phone_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneBindPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindPhoneRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneBindPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindPhoneReqBody implements aone.AoneBody {
        user_id: number;
        phone: string;
        phone_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneUnBindPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindPhoneRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneUnBindPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByPhoneReqBody implements aone.AoneBody {
        phone: string;
        phone_token: string;
        password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneResetPasswordByPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByPhoneRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneResetPasswordByPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByMailReqBody implements aone.AoneBody {
        action: string;
        mail: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ApplyTokenByMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyTokenByMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ApplyTokenByMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindMailReqBody implements aone.AoneBody {
        user_id: number;
        mail: string;
        mail_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneBindMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneBindMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneBindMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindMailReqBody implements aone.AoneBody {
        user_id: number;
        mail: string;
        mail_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneUnBindMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneUnBindMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneUnBindMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByMailReqBody implements aone.AoneBody {
        mail: string;
        mail_token: string;
        password: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneResetPasswordByMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneResetPasswordByMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneResetPasswordByMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountInfoReqBody implements aone.AoneBody {
        user_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneAccountInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountInfoRespBody implements aone.AoneBody {
        user_id: number;
        account: string;
        device_id: string;
        phone: string;
        mail: string;
        weixin: string;
        real_name: string;
        identity_number: string;
        flag: number;
        create_time: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneAccountInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthInfoReqBody implements aone.AoneBody {
        oauth_type: string;
        oauth_token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OAuthInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthInfoRespBody implements aone.AoneBody {
        is_register_device: boolean;
        is_register_oauth: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OAuthInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OAuthInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickRegisterReqBody implements aone.AoneBody {
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        delay_ms: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickRegisterRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QuickRegisterReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickRegisterRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        aone_account: string;
        aone_password: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QuickRegisterResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QuickRegisterRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountCertificateReqBody implements aone.AoneBody {
        user_id: number;
        real_name: string;
        identity_number: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountCertificateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneAccountCertificateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountCertificateRespBody implements aone.AoneBody {
        flag: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAccountCertificateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneAccountCertificateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneSdkCheckVersionReqBody implements aone.AoneBody {
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneSdkCheckVersionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneSdkCheckVersionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneSdkCheckVersionRespBody implements aone.AoneBody {
        new_version_info: Array<ChannelVersionInfo>;
        cur_version_info: Array<ChannelVersionInfo>;
        server_time: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneSdkCheckVersionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneSdkCheckVersionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountIdentityInfoReqBody implements aone.AoneBody {
        user_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountIdentityInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AccountIdentityInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountIdentityInfoRespBody implements aone.AoneBody {
        flag: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountIdentityInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AccountIdentityInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountCertificateReqBody implements aone.AoneBody {
        user_id: number;
        real_name: string;
        identity_number: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountCertificateRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AccountCertificateReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountCertificateRespBody implements aone.AoneBody {
        flag: number;
        real_name: string;
        identity_number: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AccountCertificateResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AccountCertificateRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppLoginReqBody implements aone.AoneBody {
        code: string;
        raw_data: string;
        signature: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WxAppLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        openid: string;
        session_key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WxAppLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppLoginReqBody implements aone.AoneBody {
        code: string;
        nickname: string;
        headimgurl: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BaiduAppLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        openid: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BaiduAppLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FBInstantLoginReqBody implements aone.AoneBody {
        id: string;
        name: string;
        photo: string;
        signature: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FBInstantLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: FBInstantLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FBInstantLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class FBInstantLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: FBInstantLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppQueryOpenidReqBody implements aone.AoneBody {
        code: string;
        raw_data: string;
        signature: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppQueryOpenidRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WxAppQueryOpenidReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppQueryOpenidRespBody implements aone.AoneBody {
        openid: string;
        session_key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxAppQueryOpenidResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WxAppQueryOpenidRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WechatOfficalAccountQueryOpenidReqBody implements aone.AoneBody {
        code: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WechatOfficalAccountQueryOpenidRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WechatOfficalAccountQueryOpenidReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WechatOfficalAccountQueryOpenidRespBody implements aone.AoneBody {
        openid: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WechatOfficalAccountQueryOpenidResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WechatOfficalAccountQueryOpenidRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelReviewVersionsReqBody implements aone.AoneBody {
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelReviewVersionsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryChannelReviewVersionsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelReviewVersionsRespBody implements aone.AoneBody {
        reviewVersions: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelReviewVersionsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryChannelReviewVersionsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGameLoginReqBody implements aone.AoneBody {
        code: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGameLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QQGameLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGameLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        openid: string;
        session_key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGameLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QQGameLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQQueryOpenidReqBody implements aone.AoneBody {
        code: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQQueryOpenidRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QQQueryOpenidReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQQueryOpenidRespBody implements aone.AoneBody {
        openid: string;
        session_key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQQueryOpenidResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QQQueryOpenidRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorLoginReqBody implements aone.AoneBody {
        userId: string;
        userName: string;
        userSex: number;
        userImg: string;
        isSubscribe: boolean;
        isShowSubscribe: boolean;
        shareCode: string;
        friendCode: string;
        time: number;
        sign: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: HortorLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorLoginRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        token: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: HortorLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelConfigReqBody implements aone.AoneBody {
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        code: string;
        is_wifi: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelConfigRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryChannelConfigReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelConfigRespBody implements aone.AoneBody {
        channel_params: Array<KVPair>;
        channel_products: Array<PayProductInfo>;
        entryserver_ip: string;
        entryserver_port: number;
        app_langs: Array<KVPair>;
        bbs_url: string;
        is_enable: boolean;
        channel_products_ext: Array<PayProductExtInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryChannelConfigResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryChannelConfigRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKDownloadExceptionReqBody implements aone.AoneBody {
        dns: string;
        ip: string;
        url: string;
        code: string;
        detail: string;
        use_ms: number;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKDownloadExceptionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordSDKDownloadExceptionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKDownloadExceptionRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKDownloadExceptionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordSDKDownloadExceptionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordGameDownloadExceptionReqBody implements aone.AoneBody {
        url: string;
        code: string;
        detail: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordGameDownloadExceptionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordGameDownloadExceptionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordGameDownloadExceptionRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordGameDownloadExceptionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordGameDownloadExceptionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKPayExceptionReqBody implements aone.AoneBody {
        code: string;
        detail: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKPayExceptionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordSDKPayExceptionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKPayExceptionRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordSDKPayExceptionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordSDKPayExceptionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIsEnableLocalPayReqBody implements aone.AoneBody {
        code: string;
        is_wifi: boolean;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIsEnableLocalPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryIsEnableLocalPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIsEnableLocalPayRespBody implements aone.AoneBody {
        is_enable: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryIsEnableLocalPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryIsEnableLocalPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserVerifyReqBody implements aone.AoneBody {
        user_id: number;
        token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserVerifyRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UserVerifyReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserVerifyRespBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserVerifyResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UserVerifyRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayReqBody implements aone.AoneBody {
        user_id: number;
        role_id: number;
        receipt: string;
        pay_channel: string;
        cp_ext: string;
        pay_no: string;
        product_id: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        cp_role_id: string;
        cp_group_id: string;
        channel_user_id: string;
        product_quantity: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayRespBody implements aone.AoneBody {
        pay_no: string;
        discount: number;
        amount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AlipaySignReqBody implements aone.AoneBody {
        content: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AlipaySignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AlipaySignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AlipaySignRespBody implements aone.AoneBody {
        sign_content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AlipaySignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AlipaySignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryExceptionPayOrdersReqBody implements aone.AoneBody {
        role_id: number;
        pay_channel: string;
        begin_time: string;
        end_time: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryExceptionPayOrdersRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryExceptionPayOrdersReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ExceptionPayOrder implements aone.AoneBody {
        pay_no: string;
        pay_out_no: string;
        is_verify: boolean;
        status: string;
        user_id: number;
        role_id: number;
        pay_channel: string;
        cp_ext: string;
        receipt: string;
        notify_url: string;
        product_id: string;
        pay_commit_time: string;
        pay_finished_time: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryExceptionPayOrdersRespBody implements aone.AoneBody {
        pay_orders: Array<ExceptionPayOrder>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryExceptionPayOrdersResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryExceptionPayOrdersRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommitReceiptReqBody implements aone.AoneBody {
        pay_no: string;
        receipt: string;
        pay_channel: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommitReceiptRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CommitReceiptReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommitReceiptRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CommitReceiptResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CommitReceiptRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryOrderStatusReqBody implements aone.AoneBody {
        user_id: number;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryOrderStatusRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryOrderStatusReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryOrderStatusRespBody implements aone.AoneBody {
        pay_no: string;
        currency: string;
        amount: number;
        amount_usd: number;
        coin: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryOrderStatusResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryOrderStatusRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryPayNoStatusReqBody implements aone.AoneBody {
        app_id: number;
        pay_no: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryPayNoStatusRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryPayNoStatusReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryPayNoStatusRespBody implements aone.AoneBody {
        status: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryPayNoStatusResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryPayNoStatusRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxappPayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        openid: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxappPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WxappPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxappPayRespBody implements aone.AoneBody {
        timeStamp: string;
        nonceStr: string;
        package: string;
        signType: string;
        paySign: string;
        pay_no: string;
        discount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxappPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WxappPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppPayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BaiduAppPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppPayRespBody implements aone.AoneBody {
        dealId: string;
        appKey: string;
        rsaSign: string;
        totalAmount: number;
        dealTitle: string;
        pay_no: string;
        discount: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaiduAppPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BaiduAppPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XiaomiQGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        appAccountId: string;
        session: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XiaomiQGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: XiaomiQGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XiaomiQGamePayRespBody implements aone.AoneBody {
        orderInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class XiaomiQGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: XiaomiQGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxMiniGamePayReqBody implements aone.AoneBody {
        pay_no: string;
        open_id: string;
        session_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxMiniGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: WxMiniGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxMiniGamePayRespBody implements aone.AoneBody {
        pay_no: string;
        state: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WxMiniGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: WxMiniGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OppoGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        open_id: string;
        app_version: string;
        engine_version: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OppoGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: OppoGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OppoGamePayRespBody implements aone.AoneBody {
        timestamp: string;
        orderNo: string;
        paySign: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class OppoGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: OppoGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VivoQGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        vivo_version: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VivoQGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: VivoQGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VivoQGamePayRespBody implements aone.AoneBody {
        respJson: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VivoQGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: VivoQGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HuaweiQGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HuaweiQGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: HuaweiQGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HuaweiQGamePayRespBody implements aone.AoneBody {
        orderInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HuaweiQGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: HuaweiQGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaisibudejieWGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        open_id: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaisibudejieWGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: BaisibudejieWGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaisibudejieWGamePayRespBody implements aone.AoneBody {
        pay_data: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class BaisibudejieWGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: BaisibudejieWGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowPayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        deviceType: string;
        payChannelType: string;
        outputType: string;
        consumerId: string;
        frontNotifyUrl: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IPayNowPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowPayRespBody implements aone.AoneBody {
        pay_data: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IPayNowPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetWechatJsTicketReqBody implements aone.AoneBody {
        url: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetWechatJsTicketRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetWechatJsTicketReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetWechatJsTicketRespBody implements aone.AoneBody {
        appid: string;
        noncestr: string;
        timestamp: number;
        signature: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetWechatJsTicketResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetWechatJsTicketRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class YilewanWGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        passport: string;
        uid: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class YilewanWGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: YilewanWGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class YilewanWGamePayRespBody implements aone.AoneBody {
        payInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class YilewanWGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: YilewanWGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GamerealWGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        uid: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GamerealWGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GamerealWGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GamerealWGamePayRespBody implements aone.AoneBody {
        payInfo: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GamerealWGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GamerealWGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGamePayReqBody implements aone.AoneBody {
        user_id: number;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        openid: string;
        session_key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGamePayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QQGamePayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGamePayRespBody implements aone.AoneBody {
        prepayId: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QQGamePayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QQGamePayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorPayReqBody implements aone.AoneBody {
        user_id: number;
        hortor_user_id: string;
        product_id: string;
        product_quantity: number;
        cp_role_id: string;
        cp_group_id: string;
        cp_ext: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorPayRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: HortorPayReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorPayRespBody implements aone.AoneBody {
        prepayId: string;
        order_id: string;
        app_id: string;
        timestamp: string;
        nonce_str: string;
        package: string;
        sign_type: string;
        pay_sign: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class HortorPayResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: HortorPayRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendMailReqBody implements aone.AoneBody {
        recipients: Array<string>;
        subject: string;
        content: string;
        timeout: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendMailRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SendMailReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendMailRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendMailResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SendMailRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendSMSReqBody implements aone.AoneBody {
        phones: Array<string>;
        content: string;
        timeout: number;
        selected: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendSMSRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: SendSMSReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendSMSRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SendSMSResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: SendSMSRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushMessageReqBody implements aone.AoneBody {
        tokens: Array<string>;
        title: string;
        content: string;
        timeout: number;
        push_style: string;
        push_channel: string;
        channel: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushMessageRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PushMessageReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushMessageRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushMessageResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PushMessageRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushTagMessageReqBody implements aone.AoneBody {
        tag: string;
        title: string;
        content: string;
        timeout: number;
        push_style: string;
        push_channel: string;
        channel: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushTagMessageRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PushTagMessageReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushTagMessageRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushTagMessageResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PushTagMessageRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushBroadcastMessageReqBody implements aone.AoneBody {
        title: string;
        content: string;
        timeout: number;
        push_style: string;
        push_channel: string;
        channel: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushBroadcastMessageRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PushBroadcastMessageReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushBroadcastMessageRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PushBroadcastMessageResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PushBroadcastMessageRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryProductInfoReqBody implements aone.AoneBody {
        product_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryProductInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryProductInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryProductInfoRespBody implements aone.AoneBody {
        website_product: WebsiteProductInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryProductInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryProductInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryWebsiteProductListReqBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryWebsiteProductListRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryWebsiteProductListReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryWebsiteProductListRespBody implements aone.AoneBody {
        website_products: Array<number>;
        channel_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryWebsiteProductListResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryWebsiteProductListRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppChannelsReqBody implements aone.AoneBody {
        appid: number;
        is_use_alias: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppChannelsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryAppChannelsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppChannelsRespBody implements aone.AoneBody {
        channels: Array<KVPair>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppChannelsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryAppChannelsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppLangsReqBody implements aone.AoneBody {
        appid: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppLangsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryAppLangsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppLangsRespBody implements aone.AoneBody {
        langs: Array<KVPair>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppLangsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryAppLangsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppProductsReqBody implements aone.AoneBody {
        channel: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppProductsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryAppProductsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppProductsRespBody implements aone.AoneBody {
        products: Array<PayProductInfo>;
        channel_products_ext: Array<PayProductExtInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAppProductsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryAppProductsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowSignReqBody implements aone.AoneBody {
        channel: string;
        content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowSignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IPayNowSignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowSignRespBody implements aone.AoneBody {
        sign_content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IPayNowSignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IPayNowSignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAlipaySignReqBody implements aone.AoneBody {
        channel: string;
        content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAlipaySignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneAlipaySignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAlipaySignRespBody implements aone.AoneBody {
        sign_content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneAlipaySignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneAlipaySignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRoleLoginReqBody implements aone.AoneBody {
        user_id: number;
        group_id: string;
        role_id: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        group_name: string;
        role_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRoleLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordRoleLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRoleLoginRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRoleLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordRoleLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryShareInfoReqBody implements aone.AoneBody {
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        code: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryShareInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryShareInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryShareInfoRespBody implements aone.AoneBody {
        url: string;
        user_data: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryShareInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryShareInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublishShareInfoReqBody implements aone.AoneBody {
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        user_data: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublishShareInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: PublishShareInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublishShareInfoRespBody implements aone.AoneBody {
        url: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PublishShareInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: PublishShareInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAoneGroupIdReqBody implements aone.AoneBody {
        app_id: number;
        cp_group_id: string;
        cp_group_name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAoneGroupIdRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryAoneGroupIdReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAoneGroupIdRespBody implements aone.AoneBody {
        aone_group_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryAoneGroupIdResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryAoneGroupIdRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneCEBSignReqBody implements aone.AoneBody {
        appid: string;
        channel: string;
        content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneCEBSignRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: AoneCEBSignReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneCEBSignRespBody implements aone.AoneBody {
        sign_content: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AoneCEBSignResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: AoneCEBSignRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryUserPhoneBindReqBody implements aone.AoneBody {
        user_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryUserPhoneBindRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: QueryUserPhoneBindReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryUserPhoneBindRespBody implements aone.AoneBody {
        is_bind: boolean;
        phone: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class QueryUserPhoneBindResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: QueryUserPhoneBindRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyCodeByPhoneReqBody implements aone.AoneBody {
        type: string;
        phone: string;
        user_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyCodeByPhoneRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: ApplyCodeByPhoneReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyCodeByPhoneRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApplyCodeByPhoneResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: ApplyCodeByPhoneRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyCodeReqBody implements aone.AoneBody {
        type: string;
        phone: string;
        code: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyCodeRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: VerifyCodeReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyCodeRespBody implements aone.AoneBody {
        is_success: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class VerifyCodeResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: VerifyCodeRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordDevicePointReqBody implements aone.AoneBody {
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        sdk_point: number;
        is_first_login: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordDevicePointRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordDevicePointReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordDevicePointRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordDevicePointResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordDevicePointRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRolePointReqBody implements aone.AoneBody {
        user_id: number;
        cp_role_id: string;
        cp_role_name: string;
        cp_group_id: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        game_point: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRolePointRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: RecordRolePointReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRolePointRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RecordRolePointResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: RecordRolePointRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    enum ETargetPosType {
        TARGET_POS_NONE = 0,
        TARGET_POS_MINE = 1,
        TARGET_POS_ENEMY = 2,
        TARGET_POS_CNT = 3,
    }
    enum ESkillType {
        SKILL_TYPE_NONE = 0,
        SKILL_TYPE_COMMON = 1,
        SKILL_TYPE_HANDLE = 2,
        SKILL_TYPE_DEATH = 3,
        SKILL_TYPE_CNT = 4,
    }
    enum EDamageType {
        DAMAGE_TYPE_NONE = 0,
        DAMAGE_TYPE_PHY = 1,
        DAMAGE_TYPE_MAGIC = 2,
        DAMAGE_TYPE_CNT = 3,
    }
    enum EEffectType {
        EFFECT_TYPE_NONE = 0,
        EFFECT_TYPE_COLLISION = 1,
        EFFECT_TYPE_TARGET = 2,
        EFFECT_TYPE_MISSILE = 3,
        EFFECT_TYPE_CNT = 4,
    }
    enum ETargetId {
        TARGET_COLLISION = 0,
        TARGET_ALL = 1,
        TARGET_RANDOM_ONE = 2,
        TARGET_HP_MIN = 3,
        TARGET_HP_MAX = 4,
        TARGET_RAGE_MIN = 5,
        TARGET_SELF = 6,
        TARGET_RAGE_MAX = 7,
        TARGET_BRING_HURT_ROLE = 8,
        TARGET_HURTING_ROLE = 9,
        TARGET_RANDOM_TWO = 10,
        TARGET_HP_PERCENT_MIN = 11,
        TARGET_HP_PERCENT_MAX = 12,
        TARGET_POS_1 = 13,
        TARGET_POS_2 = 14,
        TARGET_POS_3 = 15,
        TARGET_DIS_NEAR = 16,
        TARGET_DIS_MID = 17,
        TARGET_DIS_FAR = 18,
        TARGET_BOSS = 19,
        TARGET_POS_4 = 20,
        TARGET_MAP = 21,
        TARGET_FEATURE_ATTACK = 22,
        TARGET_FEATURE_DEFENSE = 23,
        TARGET_FEATURE_ASSIST = 24,
        TARGET_REVIVE_PERSON = 25,
        TARGET_PROPERTY_MAX = 26,
        TARGET_PROPERTY_MIN = 27,
        TARGET_CD_MAX = 28,
        TARGET_CD_MIN = 29,
        TARGET_DEBUFF_MAX = 30,
        TARGET_BUFF_MAX = 31,
        TARGET_CNT = 32,
    }
    enum EActionFlashType {
        FLASH_TYPE_NONE = 0,
        FLASH_TYPE_LASTPOS = 1,
        FLASH_TYPE_ORIGIN = 2,
        FLASH_TYPE_LOCAL = 3,
        FLASH_TYPE_DETAILPOS = 4,
        FLASH_TYPE_TARGET = 5,
        FLASH_TYPE_CNT = 6,
    }
}
declare namespace message {
    enum ELanguageType {
        LANGUAGE_TYPE_NONO = 0,
        LANGUAGE_TYPE_CHINESE = 1,
        LANGUAGE_TYPE_MISCHINESE = 2,
        LANGUAGE_TYPE_ENGLISH = 3,
        LANGUAGE_TYPE_VIETNAMESE = 4,
        LANGUAGE_TYPE_CNT = 5,
    }
    enum IdentificationType {
        IDENTIFICATION_TYPE_NONO = 0,
        IDENTIFICATION_TYPE_UNDERAGE = 1,
        IDENTIFICATION_TYPE_ADULT = 2,
        IDENTIFICATION_TYPE_NOT = 3,
        IDENTIFICATION_TYPE_END = 4,
    }
    enum EBindPhone {
        BIND_PHONE_NONO = 0,
        BIND_PHONE_NOT_BIND = 1,
        BIND_PHONE_BIND = 2,
        BIND_PHONE_END = 3,
    }
    enum EAutoType {
        AUTO_TYPE_NONO = 0,
        AUTO_TYPE_MYSELF = 1,
        AUTO_TYPE_LADDER = 101,
        AUTO_TYPE_SCRIPT = 200,
        AUTO_TYPE_BUG = 201,
    }
    enum ETextArgType {
        TEXT_ARG_TYPE_NONO = 0,
        TEXT_ARG_TYPE_GOODS = 1,
        TEXT_ARG_TYPE_MOBS = 2,
        TEXT_ARG_TYPE_WONDERLAND = 3,
        TEXT_ARG_TYPE_WONDERLAND_TREE = 4,
        TEXT_ARG_TYPE_LEAGUEMATCH_SCORE = 5,
        TEXT_ARG_TYPE_ARTIFACT = 6,
        TEXT_ARG_TYPE_GENERAL = 7,
        TEXT_ARG_TYPE_FORMATION_COMPOSE = 8,
        TEXT_ARG_TYPE_LEAUGE_INSTANCE = 9,
        TEXT_ARG_TYPE_SCENE_BOSS = 10,
        TEXT_ARG_TYPE_GIFT = 11,
        TEXT_ARG_TYPE_GROUP = 12,
        TEXT_ARG_TYPE_SINGLECRAFT_SECTION = 13,
        TEXT_ARG_TYPE_ADVISER = 14,
        TEXT_ARG_TYPE_FRUIT = 15,
        TEXT_ARG_TYPE_GIFT_BACK = 16,
        TEXT_ARG_TYPE_END = 17,
    }
    enum ClientOperation {
        CLIENT_OPERATION_NONO = 0,
        CLIENT_OPERATION_POWERFULL = 1,
        CLIENT_OPERATION_POWERREWARD = 2,
        CLIENT_OPERATION_ACTIVITYOPEN = 3,
        CLIENT_OPERATION_LADDER = 4,
        CLIENT_OPERATION_LEAGUE_WAR = 5,
        CLIENT_OPERATION_BOSS = 7,
        CLIENT_OPERATION_END = 8,
    }
    enum FunctionOpen {
        FUNCTION_OPEN_TYPE_NONO = 0,
        FUNCTION_OPEN_TYPE_LEAGUE = 1,
        FUNCTION_OPEN_TYPE_LADDER = 2,
        FUNCTION_OPEN_TYPE_GENERAL_BREAK = 3,
        FUNCTION_OPEN_TYPE_WONDERLAND = 4,
        FUNCTION_OPEN_TYPE_TOWER = 5,
        FUNCTION_OPEN_TYPE_VILLAGE_MONEY = 6,
        FUNCTION_OPEN_TYPE_WANTED = 7,
        FUNCTION_OPEN_TYPE_SKILLUP = 8,
        FUNCTION_OPEN_TYPE_EQUIP = 9,
        FUNCTION_OPEN_TYPE_MISSIONWEEK = 10,
        FUNCTION_OPEN_TYPE_TALENT = 11,
        FUNCTION_OPEN_TYPE_EQUIP_CARVE = 12,
        FUNCTION_OPEN_TYPE_ADVISER = 13,
        FUNCTION_OPEN_TYPE_DARKLAND = 14,
        FUNCTION_OPEN_TYPE_ELITE = 15,
        FUNCTION_OPEN_TYPE_TRAINING = 16,
        FUNCTION_OPEN_TYPE_FUND = 17,
        FUNCTION_OPEN_TYPE_ADVISER_FORMATION = 18,
        FUNCTION_OPEN_TYPE_SUPPORT = 19,
        FUNCTION_OPEN_TYPE_BATTLE_TRUST = 20,
        FUNCTION_OPEN_TYPE_SEVEN_DAY = 21,
        FUNCTION_OPEN_TYPE_GENERAL_UP = 22,
        FUNCTION_OPEN_TYPE_GENERAL_STAR = 23,
        FUNCTION_OPEN_TYPE_GENERAL_QUALITY = 24,
        FUNCTION_OPEN_TYPE_DAYLY = 25,
        FUNCTION_OPEN_TYPE_MALL = 26,
        FUNCTION_OPEN_TYPE_CHEST = 27,
        FUNCTION_OPEN_TYPE_VILLAGE_EXP = 28,
        FUNCTION_OPEN_TYPE_GENERAL_FATE = 29,
        FUNCTION_OPEN_TYPE_ARTIFACT = 30,
        FUNCTION_OPEN_TYPE_ARTIFACT_WASH = 31,
        FUNCTION_OPEN_TYPE_ARTIFACT_MOUNT = 32,
        FUNCTION_OPEN_TYPE_IMMORTAL = 33,
        FUNCTION_OPEN_TYPE_CHAT = 34,
        FUNCTION_OPEN_TYPE_RANK = 35,
        FUNCTION_OPEN_TYPE_WONDERLAND_2 = 36,
        FUNCTION_OPEN_TYPE_WONDERLAND_3 = 37,
        FUNCTION_OPEN_TYPE_GAMBLE_JADE = 38,
        FUNCTION_OPEN_TYPE_VILLAGE_SWEEP = 39,
        FUNCTION_OPEN_TYPE_LADDER_QUICK = 40,
        FUNCTION_OPEN_TYPE_WORLD_FIRST = 41,
        FUNCTION_OPEN_TYPE_DEMON = 42,
        FUNCTION_OPEN_TYPE_POTATO = 43,
        FUNCTION_OPEN_TYPE_RECOVERY = 44,
        FUNCTION_OPEN_TYPE_DEMON_BOSS = 45,
        FUNCTION_OPEN_TYPE_DEMON_RUNES = 46,
        FUNCTION_OPEN_TYPE_RECOVERY_GEN = 47,
        FUNCTION_OPEN_TYPE_RECOVERY_EQU = 48,
        FUNCTION_OPEN_TYPE_ENEMY_CAMP_CAVE = 49,
        FUNCTION_OPEN_TYPE_ENEMY_CAMP_GOBI = 50,
        FUNCTION_OPEN_TYPE_ENEMY_CAMP_NEVE = 51,
        FUNCTION_OPEN_TYPE_SINGLE_CRAFT = 52,
        FUNCTION_OPEN_TYPE_SELL_GENERAL = 53,
        FUNCTION_OPEN_TYPE_MISSION_LICENCE = 54,
        FUNCTION_OPEN_TYPE_AWAKEN = 55,
        FUNCTION_OPEN_TYPE_GENERAL_MAKE = 56,
        FUNCTION_OPEN_TYPE_PVP_SINGLE = 57,
        FUNCTION_OPEN_TYPE_PVP_THIRD = 58,
        FUNCTION_OPEN_TYPE_GROUP_FIGHT = 59,
        FUNCTION_OPEN_TYPE_GENERAL_PSYCHIC = 60,
        FUNCTION_OPEN_TYPE_WANTED7 = 61,
        FUNCTION_OPEN_TYPE_DARKLAND2 = 62,
        FUNCTION_OPEN_TYPE_POTATO_UPLEVEL = 63,
        FUNCTION_OPEN_TYPE_POTATO_UPSTAR = 64,
        FUNCTION_OPEN_TYPE_ACTIVITY_BATTLE = 65,
        FUNCTION_OPEN_TYPE_ACTIVITY_BOSS = 66,
        FUNCTION_OPEN_TYPE_NED = 67,
    }
    enum ELeagueOfficial {
        LEAGUE_OFFICIAL_NONO = 0,
        LEAGUE_OFFICIAL_NORMAL = 1,
        LEAGUE_OFFICIAL_ELDER = 2,
        LEAGUE_OFFICIAL_LEADER = 3,
        LEAGUE_OFFICIAL_END = 4,
    }
    enum LeagueJoinCondition {
        LEAGUE_JOIN_NONO = 0,
        LEAGUE_JOIN_ALL = 1,
        LEAGUE_JOIN_VERIFY = 2,
        LEAGUE_JOIN_NOT = 3,
        LEAGUE_JOIN_END = 4,
    }
    enum LeagueRecordType {
        LEAGUE_RECORD_TYPE_NONO = 0,
        LEAGUE_RECORD_TYPE_JOIN = 1,
        LEAGUE_RECORD_TYPE_QUIT = 2,
        LEAGUE_RECORD_TYPE_KICK = 3,
        LEAGUE_RECORD_TYPE_ELDER = 4,
        LEAGUE_RECORD_TYPE_UNELDER = 5,
        LEAGUE_RECORD_TYPE_TRANSFER = 6,
        LEAGUE_RECORD_TYPE_MODIFY_NAME = 7,
        LEAGUE_RECORD_TYPE_MODIFY_PIC = 8,
        LEAGUE_RECORD_TYPE_MODIFY_PICFRAME = 9,
        LEAGUE_RECORD_TYPE_JOIN_CONDITION = 10,
        LEAGUE_RECORD_TYPE_JOIN_LEVEL = 11,
        LEAGUE_RECORD_TYPE_MODIFY_NOTICE = 12,
        LEAGUE_RECORD_TYPE_MODIFY_INTRODUCE = 13,
        LEAGUE_RECORD_TYPE_LEVEL_UP = 14,
        LEAGUE_RECORD_TYPE_SKILL_UP = 15,
        LEAGUE_RECORD_TYPE_SKILL_RESET = 16,
        LEAGUE_RECORD_TYPE_IMPEACH = 17,
        LEAGUE_RECORD_TYPE_UNIMPEACH = 18,
        LEAGUE_RECORD_TYPE_IMPEACH_SUCCESS = 19,
        LEAGUE_RECORD_TYPE_FEED_NORMAL = 20,
        LEAGUE_RECORD_TYPE_FEED_SENIOR = 21,
        LEAGUE_RECORD_TYPE_ANIMAL_ADOPT = 22,
        LEAGUE_RECORD_TYPE_BOSS_OPEN = 23,
        LEAGUE_RECORD_TYPE_BOSS_KILL = 24,
        LEAGUE_RECORD_TYPE_BOSS_NOT_KILL = 25,
        LEAGUE_RECORD_TYPE_PARTY_ADD = 26,
        LEAGUE_RECORD_TYPE_DEMISE_ELDER = 27,
        LEAGUE_RECORD_TYPE_DEMISE_NORMAL = 28,
        LEAGUE_RECORD_TYPE_INSTANCE_OPEN = 29,
        LEAGUE_RECORD_TYPE_INSTANCE_KILL = 30,
        LEAGUE_RECORD_TYPE_INSTANCE_PASS = 31,
        LEAGUE_RECORD_TYPE_INSTANCE_BUY_POWER = 32,
        LEAGUE_RECORD_TYPE_INSTANCE_HURT = 33,
        LEAGUE_RECORD_TYPE_MATCH_BATTLE = 34,
        LEAGUE_RECORD_TYPE_MATCH_HISTORY = 35,
        LEAGUE_RECORD_TYPE_MODIFY_RECRUIT = 36,
        LEAGUE_RECORD_TYPE_END = 37,
    }
    enum LeagueNoticeType {
        LEAGUE_NOTICE_TYPE_NONO = 0,
        LEAGUE_NOTICE_TYPE_PIC = 1,
        LEAGUE_NOTICE_TYPE_JOIN_CONDITION = 2,
        LEAGUE_NOTICE_TYPE_INTRODUCE = 3,
        LEAGUE_NOTICE_TYPE_NOTICE = 4,
        LEAGUE_NOTICE_TYPE_OFFICIAL = 5,
        LEAGUE_NOTICE_TYPE_NAME = 6,
        LEAGUE_NOTICE_TYPE_DELETE = 7,
        LEAGUE_NOTICE_TYPE_ADD = 8,
        LEAGUE_NOTICE_INSTANCE_BUY_TIME = 9,
        LEAGUE_NOTICE_TYPE_END = 10,
    }
    enum MailType {
        MAIL_TYPE_UNKNOWN = 0,
        MAIL_TYPE_SYSTEM = 1,
        MAIL_TYPE_LEAGUE = 2,
        MAIL_TYPE_NORMAL = 3,
        MAIL_TYPE_LADDER = 4,
        MAIL_TYPE_WONDERLAND = 5,
        MAIL_TYPE_SINGLECRAFT = 6,
        MAIL_TYPE_PVP = 7,
        MAIL_TYPE_END = 8,
    }
    enum CommentType {
        COMMENT_TYPE_UNKNOWN = 0,
        COMMENT_TYPE_HUNTER = 1,
        COMMENT_TYPE_TOWER = 2,
        COMMENT_TYPE_LICENCE = 3,
        COMMENT_TYPE_INSTANCE = 4,
        COMMENT_TYPE_WANTED = 5,
        COMMENT_TYPE_TOTAL = 6,
        COMMENT_TYPE_PUNITIVE = 7,
        COMMENT_TYPE_RELIC = 8,
        COMMENT_TYPE_END = 9,
    }
    enum AttriType {
        ATTRI_TYPE_NONO = 0,
        ATTRI_TYPE_HP = 1,
        ATTRI_TYPE_ATK = 2,
        ATTRI_TYPE_DEF = 3,
        ATTRI_TYPE_SKILL_ATK = 4,
        ATTRI_TYPE_SKILL_DEF = 5,
        ATTRI_TYPE_ATK_CRIT = 6,
        ATTRI_TYPE_SKILL_CRIT = 7,
        ATTRI_TYPE_CRIT_EXTRA = 8,
        ATTRI_TYPE_CRIT_RESISTANCE = 9,
        ATTRI_TYPE_DODGE_RATE = 10,
        ATTRI_TYPE_HIT_RATE = 11,
        ATTRI_TYPE_IGNORE_PHYDEF = 12,
        ATTRI_TYPE_IGNORE_MAGICDEF = 13,
        ATTRI_TYPE_FINAL_EXTRA = 14,
        ATTRI_TYPE_FINAL_REDUCE = 15,
        ATTRI_TYPE_RAGE_REDUCE = 16,
        ATTRI_TYPE_ATK_ALL = 17,
        ATTRI_TYPE_DEF_ALL = 18,
        ATTRI_TYPE_ALL_CRIT = 19,
        ATTRI_TYPE_IGNORE_DEF_ALL = 20,
        ATTRI_TYPE_UNIL_RESIS = 21,
        ATTRI_TYPE_IGNORE_RESIS = 22,
        ATTRI_TYPE_FLOAT_RESIS = 23,
        ATTRI_TYPE_CD_SPEED = 24,
        ATTRI_TYPE_SUPPORT_CONSUME = 25,
        ATTRI_TYPE_END = 26,
    }
    enum EPotatoAttriType {
        ATTRI_TYPE_NONO = 0,
        ATTRI_TYPE_GENERAL_VALUE = 1,
        ATTRI_TYPE_GENERAL_PRE = 2,
        ATTRI_TYPE_END = 3,
    }
    enum EHoleType {
        HOLE_TYPE_NONO = 0,
        HOLE_TYPE_ARTIFACT = 1,
        HOLE_TYPE_POTATO = 2,
        HOLE_TYPE_END = 3,
    }
    enum EQuality {
        QUALITY_NONE = 0,
        QUALITY_F = 1,
        QUALITY_E = 2,
        QUALITY_D = 3,
        QUALITY_C = 4,
        QUALITY_B = 5,
        QUALITY_A = 6,
        QUALITY_S = 7,
        QUALITY_NUM = 10,
    }
    enum EGoodsType {
        GOODS_TYPE_NONO = 0,
        GOODS_TYPE_GENERAL = 1,
        GOODS_TYPE_RESOURCE = 2,
        GOODS_TYPE_PROP = 3,
        GOODS_TYPE_GENERAL_SOUL = 4,
        GOODS_TYPE_TALENT_BOOK = 5,
        GOODS_TYPE_PARTNER = 6,
        GOODS_TYPE_PET_HAT = 7,
        GOODS_TYPE_EQUIP_FORGE = 8,
        GOODS_TYPE_EQUIP_CARVE = 9,
        GOODS_TYPE_POTATO = 10,
        GOODS_TYPE_COLLECT = 11,
        GOODS_TYPE_JADE = 12,
        GOODS_TYPE_CIMELIA = 13,
        GOODS_TYPE_PIC = 14,
        GOODS_TYPE_PIC_FRAME = 15,
        GOODS_TYPE_TITLE = 16,
        GOODS_TYPE_SECRET = 17,
        GOODS_TYPE_FASHION = 18,
        GOODS_TYPE_TRANSEFER = 19,
        GOODS_TYPE_CLIENT = 20,
        GOODS_TYPE_END = 21,
    }
    enum EResourceType {
        RESOURCE_NONO = 20000,
        RESOURCE_MONEY = 20001,
        RESOURCE_TOKEN = 20002,
        RESOURCE_POWER = 20003,
        RESOURCE_LADDER = 20004,
        RESOURCE_LEAGUE_SCORE = 20005,
        RESOURCE_PSYCHIC = 20006,
        RESOURCE_LEAGUE = 20007,
        RESOURCE_RELIC_COIN = 20008,
        RESOURCE_PROMISE = 20009,
        RESOURCE_LIEREN_COIN = 20010,
        RESOURCE_ROLE_EXP = 20011,
        RESOURCE_VIP_EXP = 20012,
        RESOURCE_GINSENG = 20013,
        RESOURCE_LOTTERYSCORE = 20014,
        RESOURCE_GOLD_PLATE = 20015,
        RESOURCE_WANTED_COIN = 20016,
        RESOURCE_ARREST_COIN = 20017,
        RESOURCE_HUNT_COIN = 20018,
        RESOURCE_HONOR_COIN = 20019,
        RESOURCE_BEER = 20020,
        RESOURCE_REDWINE = 20021,
        RESOURCE_CHAMPAGNE = 20022,
        RESOURCE_SODA = 20023,
        RESOURCE_DOLL_COIN = 20024,
        RESOURCE_DUST = 20025,
        RESOURCE_CRYSTAL = 20026,
        RESOURCE_PERMIT_EXP = 20027,
        RESOURCE_AUCTIONSCORE = 20028,
        RESOURCE_STARDUST = 20029,
        RESOURCE_STARSAND = 20030,
        RESOURCE_LEAF = 20031,
        RESOURCE_RUM = 20032,
    }
    enum ChatChannelType {
        CHAT_CHANNEL_TYPE_UNKONWN = 0,
        CHAT_CHANNEL_TYPE_CROSS = 1,
        CHAT_CHANNEL_TYPE_WORLD = 2,
        CHAT_CHANNEL_TYPE_LEAGUE = 3,
        CHAT_CHANNEL_TYPE_PERSONAL = 4,
        CHAT_CHANNEL_TYPE_SYSTEM = 5,
        CHAT_CHANNEL_TYPE_ANNOUNCEMENT = 6,
        CHAT_CHANNEL_TYPE_CHEST = 7,
        CHAT_CHANNEL_TYPE_SCENE = 8,
        CHAT_CHANNEL_TYPE_SCENE_SYSTEM = 9,
        CHAT_CHANNEL_TYPE_NEAR = 10,
        CHAT_CHANNEL_TYPE_DARKLAND_SYSTEM = 11,
        CHAT_CHANNEL_TYPE_DARKLAND_CITY = 12,
        CHAT_CHANNEL_TYPE_END = 13,
    }
    enum EChatType {
        CHAT_TYPE_CROSS = 0,
        CHAT_TYPE_DARKLAND_CITY = 1,
        CHAT_TYPE_SCENE_NEAR = 2,
        CHAT_TYPE_END = 3,
    }
    enum ChatShowType {
        CHAT_SHOW_TYPE_NONE = 0,
        CHAT_SHOW_TYPE_GENERAL = 1,
        CHAT_SHOW_TYPE_GOODS = 2,
        CHAT_SHOW_TYPE_WARREPORT = 3,
        CHAT_SHOW_TYPE_WARREPORT_BIG = 4,
        CHAT_SHOW_TYPE_RECRUIT = 5,
        CHAT_SHOW_TYPE_END = 6,
    }
    enum EProcessType {
        PROCESS_TYPE_NONO = 0,
        PROCESS_TYPE_NEXTDAY = 1,
        PROCESS_TYPE_ACTIVITIES = 101,
        PROCESS_TYPE_LADDER = 1001,
        PROCESS_TYPE_LOTTERY_DOUBLE = 1002,
        PROCESS_TYPE_LEAGUE_MATCH = 1003,
        PROCESS_TYPE_IMPEACH = 1004,
        PROCESS_TYPE_JOIN_LEAGUE = 1005,
        PROCESS_TYPE_CHAT_FORBID = 1006,
        PROCESS_TYPE_REWARD_POWER = 1007,
        PROCESS_TYPE_OPEN_POWER = 1008,
        PROCESS_TYPE_MALL_LADDER = 1009,
        PROCESS_TYPE_MALL_LEAGUE = 1010,
        PROCESS_TYPE_MALL_NORMAL = 1011,
        PROCESS_TYPE_MALL_LOTTERY = 1012,
        PROCESS_TYPE_MISSION_SEVEN = 1013,
        PROCESS_TYPE_GAMBLE_NORMAL = 1014,
        PROCESS_TYPE_GAMBLE_SENIOR = 1015,
        PROCESS_TYPE_SCENE_BOSS = 1016,
        PROCESS_TYPE_MALL_HONOR = 1018,
        PROCESS_TYPE_SINGLECRAFT = 1019,
        PROCESS_TYPE_POST_FORBID = 1020,
        PROCESS_TYPE_MALL_RELIC = 1021,
        PROCESS_TYPE_ACTIVITY_BOSS = 1022,
        PROCESS_TYPE_CONTEND = 1023,
        PROCESS_TYPE_LEAGUE_BOSS = 1050,
        PROCESS_TYPE_LEAGUE_PARTY = 1051,
        PROCESS_TYPE_LEAGUE_FISHING = 1052,
        PROCESS_TYPE_MALL_LEAGUE_SCORE = 1053,
        PROCESS_TYPE_INTEGRAL_EGG = 1054,
        PROCESS_TYPE_COMMENT_FORBID = 1055,
        PROCESS_TYPE_FIRST_REWARD = 1056,
        PROCESS_TYPE_XUYUAN = 1057,
        PROCESS_TYPE_MISSION_ONE = 1058,
        PROCESS_TYPE_MISSION_TWO = 1059,
        PROCESS_TYPE_MISSION_MAQI = 1060,
        PROCESS_TYPE_MISSION_KUBI = 1061,
        PROCESS_TYPE_INSTANCE_POWER = 1062,
        PROCESS_TYPE_MISSION_WEEK = 1063,
        PROCESS_TYPE_ACTIVITY_REDPACKET = 1064,
        PROCESS_TYPE_DARKLAND = 2000,
    }
    enum EBossType {
        BOSS_TYPE_NONO = 0,
        BOSS_TYPE_WORLD = 1,
        BOSS_TYPE_LEAGUE = 2,
        BOSS_TYPE_END = 3,
    }
    enum ERecoveryType {
        RECOVERY_TYPE_NONO = 0,
        RECOVERY_TYPE_GENERAL_LEVEL = 1,
        RECOVERY_TYPE_GENERAL_STEP = 2,
        RECOVERY_TYPE_GENERAL_SKILL = 3,
        RECOVERY_TYPE_GENERAL_TALENT = 4,
        RECOVERY_TYPE_EQUIP_SKILL = 5,
        RECOVERY_TYPE_EQUIP_FORGE = 6,
        RECOVERY_TYPE_EQUIP_CARVE = 7,
        RECOVERY_TYPE_END = 8,
    }
    enum ERankType {
        RANK_TYPE_NONO = 0,
        RANK_TYPE_LEVEL = 1,
        RANK_TYPE_LADDER = 2,
        RANK_TYPE_LEAGUE = 3,
        RANK_TYPE_TOWER = 4,
        RANK_TYPE_HIGH_TOWER = 5,
        RANK_TYPE_RELIC_INSTANCE = 6,
        RANK_TYPE_END = 7,
    }
    enum ELeagueRankType {
        RANK_TYPE_NONO = 0,
        RANK_TYPE_LEVEL = 1,
        RANK_TYPE_POWER = 2,
        RANK_TYPE_DAN = 3,
        RANK_TYPE_ACTIVE = 4,
        RANK_TYPE_END = 5,
    }
    enum EFormationType {
        FORMATION_TYPE_NONO = 0,
        FORMATION_TYPE_INSTANCE_NORMAL = 1,
        FORMATION_TYPE_INSTANCE_ELITE = 2,
        FORMATION_TYPE_INSTANCE_MONEY = 3,
        FORMATION_TYPE_INSTANCE_EXP = 4,
        FORMATION_TYPE_INSTANCE_TOWER = 5,
        FORMATION_TYPE_LADDER_DEFENCE = 6,
        FORMATION_TYPE_LADDER_ATTACK = 7,
        FORMATION_TYPE_WANTED = 8,
        FORMATION_TYPE_TRAINING = 9,
        FORMATION_TYPE_LEAGUE_BOSS = 10,
        FORMATION_TYPE_LEAGUE_INSTANCE = 11,
        FORMATION_TYPE_ACTIVITY_BOSS = 12,
        FORMATION_TYPE_WONDERLAND = 13,
        FORMATION_TYPE_MISSION_LICENCE = 14,
        FORMATION_TYPE_CRAFT = 15,
        FORMATION_TYPE_CRAFT_ATTACK = 16,
        FORMATION_TYPE_ZORK = 17,
        FORMATION_TYPE_WANTED_ENEMY_CAMP = 18,
        FORMATION_TYPE_GENERAL_LIFE_STAT = 19,
        FORMATION_TYPE_INSTANCE_HIGH_TOWER = 20,
        FORMATION_TYPE_PVP_SIMPLE = 21,
        FORMATION_TYPE_PVP_THIRD = 22,
        FORMATION_TYPE_GROUP_FIGHT = 23,
        FORMATION_TYPE_MATCH_ATTACK = 24,
        FORMATION_TYPE_MATCH_DEFENSE = 25,
        FORMATION_TYPE_RELIC = 26,
        FORMATION_TYPE_CONTEND_ATTACK = 27,
        FORMATION_TYPE_CONTEND_DEFENSE = 28,
        FORMATION_TYPE_ACTIVITY = 29,
        FORMATION_TYPE_SPRING_BATTLE = 30,
        FORMATION_TYPE_SPRING_DEFENSE = 31,
        FORMATION_TYPE_ACTIVITY_RAND = 32,
        FORMATION_TYPE_CNT = 33,
    }
    enum EMobType {
        MOB_TYPE_NONO = 0,
        MOB_TYPE_LEAGUE_INSTANCE = 1,
        MOB_TYPE_WONDERLAND = 2,
        MOB_TYPE_WANTED = 3,
        MOB_TYPE_END = 5,
    }
    enum EGeneralAptitude {
        GENERAL_APTITUDE_NONO = 10,
        GENERAL_APTITUDE_C = 11,
        GENERAL_APTITUDE_B = 12,
        GENERAL_APTITUDE_A = 13,
        GENERAL_APTITUDE_S = 14,
        GENERAL_APTITUDE_END = 15,
    }
    enum EGeneralFeature {
        GENERAL_FEATURE_NONO = 0,
        GENERAL_FEATURE_ATTACK = 1,
        GENERAL_FEATURE_DEFENCE = 2,
        GENERAL_FEATURE_SKILL = 3,
        GENERAL_FEATURE_END = 4,
    }
    enum EGeneralType {
        GENERAL_TYPE_NONO = 0,
        GENERAL_TYPE_QIANGHUA = 1,
        GENERAL_TYPE_FANGCHU = 2,
        GENERAL_TYPE_XIANHUA = 3,
        GENERAL_TYPE_TEZHI = 4,
        GENERAL_TYPE_BIANHUA = 5,
        GENERAL_TYPE_CAOZUO = 6,
        GENERAL_TYPE_END = 7,
    }
    enum ECardType {
        CARD_TYPE_NONO = 0,
        CARD_TYPE_CHAN = 1,
        CARD_TYPE_JUE = 2,
        CARD_TYPE_LIAN = 3,
        CARD_TYPE_FA = 4,
        CARD_TYPE_YUAN = 5,
        CARD_TYPE_JIAN = 6,
        CARD_TYPE_YING = 7,
        CARD_TYPE_END = 8,
    }
    enum EAdviserType {
        ADVISER_TYPE_POWER = 10,
        ADVISER_TYPE_MONEY = 11,
        ADVISER_TYPE_TOKEN = 12,
    }
    enum EPetStatusType {
        PET_TYPE_STANDBY = 0,
        PET_TYPE_IN_POSTION = 1,
        PET_TYPE_END = 2,
    }
    enum ESceneType {
        SCENE_TYPE_NONO = 0,
        SCENE_TYPE_WONDERLAND = 1,
        SCENE_TYPE_BOSS = 2,
        SCENE_TYPE_DARKLAND = 3,
        SCENE_TYPE_END = 4,
    }
    enum ESceneItemType {
        SCENE_ITEM_TYPE_ROLE = 0,
        SCENE_ITEM_TYPE_BUILD = 1,
        SCENE_ITEM_TYPE_COLLECTION = 2,
        SCENE_ITEM_TYPE_MOBS = 3,
        SCENE_ITEM_TYPE_MOBS_PRODUCE = 4,
        SCENE_ITEM_TYPE_BOSS = 5,
        SCENE_ITEM_TYPE_END = 6,
    }
    enum ESceneBuildType {
        SCENE_BUILD_TYPE_NONO = 0,
        SCENE_BUILD_TYPE_OBSTACLE = 1,
        SCENE_BUILD_TYPE_VICE_TOWER = 2,
        SCENE_BUILD_TYPE_MAIN_TOWER = 3,
        SCENE_BUILD_TYPE_CANNON = 4,
        SCENE_BUILD_TYPE_END = 5,
    }
    enum ESceneItemState {
        SCENE_ITEM_STATE_NONO = 0,
        SCENE_ITEM_STATE_MOVE = 1,
        SCENE_ITEM_STATE_LEAVE = 2,
        SCENE_ITEM_STATE_DEAD = 3,
        SCENE_ITEM_STATE_JOIN = 4,
        SCENE_ITEM_STATE_RELIVE = 5,
        SCENE_ITEM_STATE_FASTER = 6,
        SCENE_ITEM_STATE_ADDBLOOD = 7,
        SCENE_ITEM_STATE_CHANGE_MODE = 8,
        SCENE_ITEM_STATE_COLLECTION = 9,
        SCENE_ITEM_STATE_COLLECTION_BREAK = 10,
        SCENE_ITEM_STATE_FRUIT_RIPE = 11,
        SCENE_ITEM_STATE_BATTLE = 12,
        SCENE_ITEM_STATE_BATTLED = 13,
        SCENE_ITEM_STATE_DECLARE = 14,
        SCENE_ITEM_STATE_DECLARED = 15,
        SCENE_ITEM_STATE_KILL_RANK = 16,
        SCENE_ITEM_STATE_BOMB = 17,
        SCENE_ITEM_STATE_FROZEN = 18,
        SCENE_ITEM_STATE_FRUIT_DOUBLE = 19,
        SCENE_ITEM_STATE_MACHINE_FASTER = 20,
        SCENE_ITEM_STATE_MACHINE_ADDBLOOD = 21,
        SCENE_ITEM_STATE_CANNON = 22,
        SCENE_ITEM_STATE_CANNON_LAUNCH = 23,
        SCENE_ITEM_STATE_CANNON_COLLECTION = 29,
        SCENE_ITEM_STATE_CANNON_BUILD = 30,
        SCENE_ITEM_STATE_ATTACKBOSS = 31,
        SCENE_ITEM_STATE_BOSS_SKILL_READY = 32,
        SCENE_ITEM_STATE_BOSS_SKILL_LAUNCH = 33,
        SCENE_ITEM_STATE_BOSS_HURTED = 34,
        SCENE_ITEM_STATE_VIEW_JOIN = 101,
        SCENE_ITEM_STATE_VIEW_LEAVE = 102,
    }
    enum EBattleMode {
        BATTLE_MODE_PEACE = 0,
        BATTLE_MODE_FIGHTING = 1,
        BATTLE_MODE_KILLING = 2,
        BATTLE_MODE_END = 4,
    }
    enum ESceneMachine {
        SCENE_MACHINE_NONO = 0,
        SCENE_MACHINE_BOMB = 1,
        SCENE_MACHINE_FROZEN = 2,
        SCENE_MACHINE_ADDSPEED = 3,
        SCENE_MACHINE_ADDBLOOD = 4,
        SCENE_MACHINE_ADDFRUIT = 5,
        SCENE_MACHINE_END = 6,
    }
    enum EMallType {
        MALL_TYPE_NONO = 0,
        MALL_TYPE_ORDINARY = 1,
        MALL_TYPE_LADDER = 2,
        MALL_TYPE_LEAGUE = 3,
        MALL_TYPE_HONOR = 4,
        MALL_TYPE_LOTTERY = 5,
        MALL_TYPE_LEAGUE_SCORE = 6,
        MALL_TYPE_RELIC = 7,
        MALL_TYPE_END = 8,
    }
    enum ELotteryType {
        ELotteryType_TYPE_NONO = 0,
        ELotteryType_TYPE_BEER = 1,
        ELotteryType_TYPE_REDWINE = 2,
        ELotteryType_TYPE_CHAMPAGNE = 3,
        ELotteryType_TYPE_SODA = 4,
        ELotteryType_TYPE_RUM = 5,
        ELotteryType_TYPE_END = 6,
    }
    enum EExchangeMallType {
        EXCHANGEMALL_TYPE_NONO = 0,
        EXCHANGEMALL_TYPE_WONDERLAND = 1,
        EXCHANGEMALL_TYPE_LEAGUE = 2,
        EXCHANGEMALL_TYPE_DEMON = 3,
        EXCHANGEMALL_TYPE_END = 4,
    }
    enum EGoodsShow {
        GOODS_SHOW_NONO = 0,
        GOODS_SHOW_LOTTERY = 1,
        GOODS_SHOW_CHEST = 2,
        GOODS_SHOW_WANTED = 3,
        GOODS_SHOW_FIRSTCHARGE = 4,
        GOODS_SHOW_WONDERFRUIT = 5,
        GOODS_SHOW_JAMBLEJADE = 6,
        GOODS_SHOW_INTEGRAL = 7,
        GOODS_SHOW_END = 8,
    }
    enum EGiftType {
        GIFT_TYPE_NONO = 0,
        GIFT_TYPE_LEVEL = 1,
        GIFT_TYPE_BACK = 2,
        GIFT_TYPE_POTATO_STAR = 3,
        GIFT_TYPE_GENERAL_STAR = 4,
        GIFT_TYPE_GENERAL_QUAILTY = 5,
        GIFT_TYPE_PAY = 6,
        GIFT_TYPE_H5 = 7,
        GIFT_TYPE_LICENCE = 8,
        GIFT_TYPE_SMALL = 9,
        GIFT_TYPE_GENERAL_QUAILTY_ONLY = 10,
        GIFT_TYPE_WANTED = 11,
        GIFT_TYPE_END = 12,
    }
    enum EGiftForm {
        GIFT_FORM_NONO = 0,
        GIFT_FORM_TIMES = 1,
        GIFT_FORM_DAILY_BUY = 2,
        GIFT_FORM_DAILY_REWARD = 3,
        GIFT_FORM_WEEK_BUY = 4,
        GIFT_FORM_DAILY_BUY_REWARD = 5,
        GIFT_FORM_LEVEL_BUY = 6,
        GIFT_FORM_END = 7,
    }
    enum EPayType {
        PAY_TYPE_NONO = 0,
        PAY_TYPE_RMB = 1,
        PAY_TYPE_TOKEN = 2,
        PAY_TYPE_FREE = 3,
        PAY_TYPE_END = 4,
    }
    enum VStarLevelType {
        STAR_LEVEL_NONE = 0,
        STAR_LEVEL_ONE = 1,
        STAR_LEVEL_TWO = 2,
        STAR_LEVEL_THREE = 3,
        STAR_LEVEL_FOUR = 4,
        STAR_LEVEL_FIVE = 5,
        STAR_LEVEL_SIX = 6,
        STAR_LEVEL_SEVEN = 7,
        STAR_LEVEL_END = 8,
    }
    enum PermitMissionType {
        PERMIT_MISSION_TYPE_NONE = 0,
        PERMIT_MISSION_TYPE_LOGIN = 1,
        PERMIT_MISSION_TYPE_PAY = 2,
        PERMIT_MISSION_TYPE_ACTIVE = 3,
        PERMIT_MISSION_TYPE_END = 4,
    }
    enum MissionType {
        MISSION_TYPE_NONE = 0,
        MISSION_TYPE_ACHIEVE = 1,
        MISSION_TYPE_DAILY = 2,
        MISSION_TYPE_MAIN = 3,
        MISSION_TYPE_SEVEN = 4,
        MISSION_TYPE_LICENCE = 5,
        MISSION_TYPE_RACE = 6,
        MISSION_TYPE_JEWEL = 7,
        MISSION_TYPE_MISSION_ONE = 8,
        MISSION_TYPE_MISSION_TWO = 9,
        MISSION_TYPE_MISSION_MAQI = 10,
        MISSION_TYPE_MISSION_KUBI = 11,
        MISSION_TYPE_WEEK = 12,
        MISSION_TYPE_HIGH_LICENCE = 13,
        MISSION_TYPE_WEEK_REFRESH = 14,
        MISSION_TYPE_MONTH_REFRESH = 15,
        MISSION_TYPE_END = 16,
    }
    enum MissionJewelCheck {
        MISSION_JEWEL_CHECK_NONE = 0,
        MISSION_JEWEL_CHECK_POTATO_STAR = 1,
        MISSION_JEWEL_CHECK_POTATO_UPSTAR = 2,
        MISSION_JEWEL_CHECK_GENERAL_STAR = 3,
        MISSION_JEWEL_CHECK_GENERAL_UPSTAR = 4,
        MISSION_JEWEL_CHECK_GOODS = 5,
        MISSION_JEWEL_CHECK_END = 6,
    }
    enum MissionSubType {
        MISSION_SUB_TYPE_NONO = 0,
        MISSION_SUB_TYPE_UPLEVEL = 1,
        MISSION_SUB_TYPE_NORMAL_INSTANCE = 2,
        MISSION_SUB_TYPE_ELITE_INSTANCE = 3,
        MISSION_SUB_TYPE_GENERAL_VISITOR = 4,
        MISSION_SUB_TYPE_BUY_POWER = 5,
        MISSION_SUB_TYPE_GENERAL_CNT = 6,
        MISSION_SUB_TYPE_GENERAL_UPLEVEL = 7,
        MISSION_SUB_TYPE_GENERAL_QUALITY = 8,
        MISSION_SUB_TYPE_GENERAL_UPSTAR = 9,
        MISSION_SUB_TYPE_GENERAL_STAR = 10,
        MISSION_SUB_TYPE_NORMAL_MONTH = 11,
        MISSION_SUB_TYPE_SENIOR_MONTH = 12,
        MISSION_SUB_TYPE_GENERAL_LEVEL_NUM = 13,
        MISSION_SUB_TYPE_GENERAL_AWAKEN = 14,
        MISSION_SUB_TYPE_GENERAL_QUALITY_NUM = 15,
        MISSION_SUB_TYPE_ADD_CHARGE = 16,
        MISSION_SUB_TYPE_WONDERLAND_COLLECTION = 17,
        MISSION_SUB_TYPE_USE_MONEY = 18,
        MISSION_SUB_TYPE_USE_LADDERSCORE = 19,
        MISSION_SUB_TYPE_LADDER = 20,
        MISSION_SUB_TYPE_FREIND = 21,
        MISSION_SUB_TYPE_ENEMY = 22,
        MISSION_SUB_TYPE_USE_LEAGUECOIN = 23,
        MISSION_SUB_TYPE_LICENCE = 24,
        MISSION_SUB_TYPE_TOWER = 25,
        MISSION_SUB_TYPE_LEAGUE_JOIN = 26,
        MISSION_SUB_TYPE_LEAGUE_DONATE = 27,
        MISSION_SUB_TYPE_CHAT_WORLD = 28,
        MISSION_SUB_TYPE_WANTED_FOUR_USEBUFF = 29,
        MISSION_SUB_TYPE_WANTED_FIVE_USEBUFF = 30,
        MISSION_SUB_TYPE_NORMAL_INSTANCE_NUMBER = 31,
        MISSION_SUB_TYPE_ELITE_INSTANCE_NUMBER = 32,
        MISSION_SUB_TYPE_WANTED_SIX_USEBUFF = 33,
        MISSION_SUB_TYPE_TOWER_NUMBER = 34,
        MISSION_SUB_TYPE_LADDER_NUMBER = 35,
        MISSION_SUB_TYPE_SKILL_UPLEVEL_NUMBER = 36,
        MISSION_SUB_TYPE_BUYMONEY = 37,
        MISSION_SUB_TYPE_USE_POWER = 38,
        MISSION_SUB_TYPE_WANTED_NUMBER = 39,
        MISSION_SUB_TYPE_ADVISER_UPLEVEL = 40,
        MISSION_SUB_TYPE_SIX_BATTLEVALUE = 44,
        MISSION_SUB_TYPE_EXCHANGE_TIMES = 45,
        MISSION_SUB_TYPE_LEAGUE_FISHING = 46,
        MISSION_SUB_TYPE_ADVISER_UPLEVEL_NUMBER = 47,
        MISSION_SUB_TYPE_LICENCE_DAILY_REWARD = 48,
        MISSION_SUB_TYPE_GENERAL_QUALITY_NUMBER = 49,
        MISSION_SUB_TYPE_ADD_CHARGE1 = 50,
        MISSION_SUB_TYPE_LEAGUE_INSTANCE = 51,
        MISSION_SUB_TYPE_POTATO_BREAK_TIME = 52,
        MISSION_SUB_TYPE_WANTED_TIMES = 53,
        MISSION_SUB_TYPE_PRAISE = 54,
        MISSION_SUB_TYPE_WANTED_SOUL = 55,
        MISSION_SUB_TYPE_WANTED_ARREST = 56,
        MISSION_SUB_TYPE_WANTED_HUNT = 57,
        MISSION_SUB_TYPE_GET_RUNES = 58,
        MISSION_SUB_TYPE_CHANGE_RUNES = 59,
        MISSION_SUB_TYPE_BATTLE_STEP = 60,
        MISSION_SUB_TYPE_POTATO_NUM = 61,
        MISSION_SUB_TYPE_INSTANCE_SEARCH = 62,
        MISSION_SUB_TYPE_WONDERLAND_BATTLE = 63,
        MISSION_SUB_TYPE_POTATO_UPLEVEL = 64,
        MISSION_SUB_TYPE_POTATO_UPLEVEL_TIME = 65,
        MISSION_SUB_TYPE_OPEN_CARDBAG = 66,
        MISSION_SUB_TYPE_GIVE_POWER = 67,
        MISSION_SUB_TYPE_POTATO_STAR = 68,
        MISSION_SUB_TYPE_WANTED_FOUR = 69,
        MISSION_SUB_TYPE_WANTED_FIVE = 70,
        MISSION_SUB_TYPE_WANTED_SIX = 71,
        MISSION_SUB_TYPE_GENERAL_UPSTARTIME = 72,
        MISSION_SUB_TYPE_GROUPBATTLE_TIME = 73,
        MISSION_SUB_TYPE_PVP_BATTLE_TIME = 74,
        MISSION_SUB_TYPE_JEWEL_NUM = 75,
        MISSION_SUB_TYPE_WANTED_SEVEN = 76,
        MISSION_SUB_TYPE_WANTED_SEVEN_USEBUFF = 77,
        MISSION_SUB_TYPE_LOTTERY_BEER = 78,
        MISSION_SUB_TYPE_CARD_NUM = 79,
        MISSION_SUB_TYPE_AWAKEN_TIME = 80,
        MISSION_SUB_TYPE_WANTED = 81,
        MISSION_SUB_TYPE_CARD_UPLEVEL = 82,
        MISSION_SUB_TYPE_CARD_FA_NUM = 83,
        MISSION_SUB_TYPE_CARD_FA_LEVEL = 84,
        MISSION_SUB_TYPE_CARD_JIAN_NUM = 85,
        MISSION_SUB_TYPE_CARD_JIAN_LEVEL = 86,
        MISSION_SUB_TYPE_GENERAL_APT_NUM = 87,
        MISSION_SUB_TYPE_FISH_ZI = 88,
        MISSION_SUB_TYPE_EQUIP_UPLEVEL = 89,
        MISSION_SUB_TYPE_BEER_EGG = 90,
        MISSION_SUB_TYPE_USE_GOODS = 91,
        MISSION_SUB_TYPE_EGG_TIMES = 92,
        MISSION_SUB_TYPE_XUYUAN_TIMES = 93,
        MISSION_SUB_TYPE_RELIC_COIN = 94,
        MISSION_SUB_TYPE_HUNTER_UPSTARTIME = 95,
        MISSION_SUB_TYPE_HIGH_TOWER = 96,
        MISSION_SUB_TYPE_RELIC_DAMAGE_ONE = 97,
        MISSION_SUB_TYPE_GENERAL_BREAK = 98,
        MISSION_SUB_TYPE_TYPE_SEARCH = 99,
        MISSION_SUB_TYPE_LEAGUESKILL = 100,
        MISSION_SUB_TYPE_SEARCH_ZI = 101,
        MISSION_SUB_TYPE_SEARCH_CHENG = 102,
        MISSION_SUB_TYPE_SEARCH_HONG = 103,
        MISSION_SUB_TYPE_CARD_ZI = 104,
        MISSION_SUB_TYPE_CARD_CHENG = 105,
        MISSION_SUB_TYPE_CARD_HONG = 106,
        MISSION_SUB_TYPE_END = 107,
    }
    enum TitleCheckType {
        TITLE_CHECK_TYPE_NONE = 0,
        TITLE_CHECK_FRIENDS = 1,
        TITLE_CHECK_BREAK_NUM = 2,
        TITLE_CHECK_TRANSFER_NUM = 3,
        TITLE_CHECK_AWAKEN_LEVEL = 4,
        TITLE_CHECK_BREAK_LEVEL = 5,
        TITLE_CHECK_SIGN_TIME = 6,
        TITLE_CHECK_HIGH_TOWER = 7,
        TITLE_CHECK_WANTEND = 8,
        TITLE_CHECK_BUY_FASHION = 9,
        TITLE_CHECK_BATTLE_VALUE = 10,
        TITLE_CHECK_OWN_GENERAL = 11,
        TITLE_CHECK_SGENERAL_NUM = 12,
        TITLE_CHECK_SCORD_NUM = 13,
        TITLE_CHECK_LEAGUE = 14,
        TITLE_CHECK_TYPE_END = 15,
    }
    enum ERelationType {
        RELATION_TYPE_NONO = 0,
        RELATION_TYPE_FRIEND = 1,
        RELATION_TYPE_ENEMY = 2,
        RELATION_TYPE_BLACK = 3,
        RELATION_TYPE_END = 4,
    }
    enum EGroupBattleType {
        GROUPBATTLE_TYPE_NONO = 0,
        GROUPBATTLE_TYPE_ONE = 1,
        GROUPBATTLE_TYPE_END = 2,
    }
    enum EWantedType {
        WANTED_TYPE_NONO = 0,
        WANTED_TYPE_EASY = 1,
        WANTED_TYPE_HARD = 2,
        WANTED_TYPE_HELL = 3,
        WANTED_TYPE_FOUR = 4,
        WANTED_TYPE_FIVE = 5,
        WANTED_TYPE_SIX = 6,
        WANTED_TYPE_SEVEN = 7,
        WANTED_TYPE_END = 8,
    }
    enum EWantedEnemyCampType {
        ENEMY_CAMP_TYPE_NONO = 0,
        ENEMY_CAMP_TYPE_CAVE = 1,
        ENEMY_CAMP_TYPE_GOBI = 2,
        ENEMY_CAMP_TYPE_NEVE = 3,
        ENEMY_CAMP_TYPE_END = 4,
    }
    enum ShareType {
        SHARE_TYPE_NONO = 0,
        SHARE_TYPE_VILLAGE_COMBO = 1,
        SHARE_TYPE_VILLAGE_HURT = 2,
        SHARE_TYPE_LEVEL = 3,
        SHARE_TYPE_LADDER = 4,
        SHARE_TYPE_TOWER = 5,
        SHARE_TYPE_END = 6,
    }
    enum EBattleStar {
        BATTLE_STAR_NONO = 0,
        BATTLE_STAR_1 = 1,
        BATTLE_STAR_2 = 2,
        BATTLE_STAR_3 = 3,
        BATTLE_STAR_END = 4,
    }
    enum EFacebookType {
        FACEBOOK_TYPE_NONO = 0,
        FACEBOOK_TYPE_LEVEL = 1,
        FACEBOOK_TYPE_VIP = 2,
        FACEBOOK_TYPE_GENERAL = 3,
        FACEBOOK_TYPE_CARVE = 4,
        FACEBOOK_TYPE_FORGE = 5,
        FACEBOOK_TYPE_END = 6,
    }
    enum BattleResultState {
        BATTLE_RESULT_STATE_NO = 0,
        BATTLE_RESULT_STATE_WIN = 1,
        BATTLE_RESULT_STATE_FAIL = 2,
        BATTLE_RESULT_STATE_DRAW = 3,
    }
    enum PetSkillType {
        PET_SKILL_TYPE_NONO = 0,
        PET_SKILL_TYPE_ATTRI = 1,
        PET_SKILL_TYPE_QIANG = 2,
        PET_SKILL_TYPE_CAIJI = 3,
        PET_SKILL_TYPE_FUHUO = 4,
        PET_SKILL_TYPE_BLOOD = 5,
        PET_SKILL_TYPE_END = 6,
    }
    enum ActivityNoticeType {
        ACT_NOTICE_NONE = 0,
        ACT_NOTICE_COM = 1,
        ACT_NOTICE_HOT = 2,
        ACT_NOTICE_NEW = 3,
        ACT_NOTICE_END = 4,
    }
    enum ActivityBuffType {
        ACTIVITY_BUFF_TYPE_NONE = 0,
        ACTIVITY_BUFF_TYPE_NORMAL_GOODS = 1,
        ACTIVITY_BUFF_TYPE_ELITE_GOODS = 2,
        ACTIVITY_BUFF_TYPE_ELITE_SOUL = 3,
        ACTIVITY_BUFF_TYPE_VILLAGE = 4,
        ACTIVITY_BUFF_TYPE_TOWER = 5,
        ACTIVITY_BUFF_TYPE_WANTED = 6,
        ACTIVITY_BUFF_TYPE_SEARCH_GOODS = 7,
        ACTIVITY_BUFF_TYPE_LOTTERYSCORE = 8,
        ACTIVITY_BUFF_TYPE_CNT = 9,
    }
    enum ConsumeType {
        CONSUME_TYPE_NONE = 0,
        CONSUME_TYPE_TOKEN = 1,
        CONSUME_TYPE_POWER = 2,
        CONSUME_TYPE_MONEY = 3,
        CONSUME_TYPE_WANTED = 4,
        CONSUME_TYPE_LOTTERY = 5,
        CONSUME_TYPE_LADDER = 6,
        CONSUME_TYPE_NORMAL_INSTANCE = 7,
        CONSUME_TYPE_ELITE_INSTANCE = 8,
        CONSUME_TYPE_WONDERLAND_FRUIT = 9,
        CONSUME_TYPE_LOTTERY_BEER = 10,
        CONSUME_TYPE_LOTTERY_REDWINE = 11,
        CONSUME_TYPE_WONDERLAND_KILL = 12,
        CONSUME_TYPE_FREIND_EXP = 13,
        CONSUME_TYPE_GAINRUNES = 14,
        CONSUME_TYPE_CHANGERUNES = 15,
        CONSUME_TYPE_INTEGRAL = 16,
        CONSUME_TYPE_XUYUAN = 17,
        CONSUME_TYPE_LOTTERY_RUM = 18,
        CONSUME_TYPE_END = 18,
    }
    enum ActivityMissionType {
        ACTIVITY_MISSION_TYPE_NONO = 0,
        ACTIVITY_MISSION_LOGIN = 1,
        ACTIVITY_MISSION_NORMAL_INSTANCE_NUMBER = 2,
        ACTIVITY_MISSION_ELITE_INSTANCE_NUMBER = 3,
        ACTIVITY_MISSION_LADDER_NUMBER = 4,
        ACTIVITY_MISSION_WONDERLAND_COLLECTION = 5,
        ACTIVITY_MISSION_LEAGUE_FISHING = 6,
        ACTIVITY_MISSION_ARTIFACT_WASH = 7,
        ACTIVITY_MISSION_GENERAL_VISITOR = 8,
        ACTIVITY_MISSION_ELITE_CHEST = 9,
        ACTIVITY_MISSION_REDUCE_TOKEN = 10,
        ACTIVITY_MISSION_ADD_TOKEN = 11,
        ACTIVITY_MISSION_REDUCE_MONGEY = 12,
        ACTIVITY_MISSION_ADVISER_UPLEVEL_NUMBER = 13,
        ACTIVITY_MISSION_CHAT_WORLD = 14,
        ACTIVITY_MISSION_EXP_INSTANCE_NUMBER = 15,
        ACTIVITY_MISSION_TOWER_NUMBER = 16,
        ACTIVITY_MISSION_BUYMONEY = 17,
        ACTIVITY_MISSION_LEAGUE_INSTANCE = 18,
        ACTIVITY_MISSION_JADE_WASH = 19,
        ACTIVITY_MISSION_JADE_COMPOSE = 20,
        ACTIVITY_MISSION_JADE_GAMBLE = 21,
        ACTIVITY_MISSION_BUY_POWER = 22,
        ACTIVITY_MISSION_GAINRUNES = 23,
        ACTIVITY_MISSION_CHANGERUNES = 24,
        ACTIVITY_MISSION_INSTANCE_SEARCH = 25,
        ACTIVITY_MISSION_WONDERLAND_BATTLE = 26,
        ACTIVITY_MISSION_SUB_TYPE_POTATO_UPLEVEL_TIME = 27,
        ACTIVITY_MISSION_SUB_TYPE_OPEN_CARDBAG = 28,
        ACTIVITY_MISSION_SUB_TYPE_UP_QUALITY = 29,
        ACTIVITY_MISSION_SUB_TYPE_POTATO_UPSTAR_THREE = 30,
        ACTIVITY_MISSION_SUB_TYPE_POTATO_UPSTAR_FOUR = 31,
        ACTIVITY_MISSION_SUB_TYPE_POTATO_UPSTAR_FIVE = 32,
        ACTIVITY_MISSION_REDUCE_POWER = 33,
        ACTIVITY_MISSION_GET_POTATO_STAR_THREE = 34,
        ACTIVITY_MISSION_GET_POTATO_STAR_FOUR = 35,
        ACTIVITY_MISSION_GET_POTATO_STAR_FIVE = 36,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_UPSTAR = 37,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_UPSTAR_FIVE = 38,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_UPSTAR_SIX = 39,
        ACTIVITY_MISSION_SUB_TYPE_PVP_BATTLE = 40,
        ACTIVITY_MISSION_SUB_TYPE_GROUPBATTLE_TIME = 41,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_UPSTAR_FOUR = 42,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_UPSTAR_NUM = 43,
        ACTIVITY_MISSION_SUB_TYPE_HUNTER_AWAKEN_NUM = 44,
        ACTIVITY_MISSION_TYPE_END = 45,
    }
    enum ActivityInstanceStarType {
        ACT_INSTANCE_TYPE_NONO = 0,
        ACT_INSTANCE_TYPE_BATTLE_WIN = 1,
        ACT_INSTANCE_TYPE_GENERAL_TYPE = 2,
        ACT_INSTANCE_TYPE_GENERAL_ID = 3,
        ACT_INSTANCE_TYPE_END = 4,
    }
    enum ActivityType {
        ACT_TYPE_NONO = 0,
        ACT_TYPE_CONTINUELOGIN = 1,
        ACT_TYPE_CHARGEDAILY = 2,
        ACT_TYPE_CHARGEADD = 3,
        ACT_TYPE_BUFFS = 4,
        ACT_TYPE_OTHER = 5,
        ACT_TYPE_COLLECT = 6,
        ACT_TYPE_CONSUME = 7,
        ACT_TYPE_UPLEVEL = 8,
        ACT_TYPE_VIPMALL = 9,
        ACT_TYPE_DISCOUNT = 10,
        ACT_TYPE_DAILYADD = 11,
        ACT_TYPE_ADVERTISEMENT = 12,
        ACT_TYPE_CHARGE_BACK = 13,
        ACT_TYPE_WISHTREE = 14,
        ACT_TYPE_MISSION = 15,
        ACT_TYPE_BENEFIT = 16,
        ACT_TYPE_CHARGERANK = 17,
        ACT_TYPE_MONTHFIT = 18,
        ACT_TYPE_LOTTERY_DOUBLING = 19,
        ACT_TYPE_SECRET_MALL = 20,
        ACT_TYPE_INSTANCE_BATTLE = 21,
        ACT_TYPE_BOSS_BATTLE = 22,
        ACT_TYPE_LOTTERY_POND = 23,
        ACT_TYPE_CONSUME_BACK = 24,
        ACT_TYPE_AUCTION = 25,
        ACT_TYPE_EVENT_GIFT = 26,
        ACT_TYPE_RANK = 27,
        ACT_TYPE_INSTANCE_RAND = 28,
        ACT_TYPE_RED_PACKET = 29,
        ACT_TYPE_END = 30,
    }
    enum CraftStateType {
        CRAFT_STATE_TYPE_NONO = 0,
        CRAFT_STATE_TYPE_READY = 1,
        CRAFT_STATE_TYPE_FIGHTING = 2,
        CRAFT_STATE_TYPE_FINISH = 3,
        CRAFT_STATE_TYPE_END = 4,
    }
    enum ContendStateType {
        CONTEND_STATE_TYPE_READY = 1,
        CONTEND_STATE_TYPE_FIGHT = 2,
        CONTEND_STATE_TYPE_CLOSE = 3,
        CONTEND_STATE_TYPE_SHOW = 4,
    }
    enum LeagueFortressType {
        LEAGUE_FORTRESS_TYPE_UNKNOWN = 0,
        LEAGUE_FORTRESS_TYPE_HARD = 1,
        LEAGUE_FORTRESS_TYPE_COMMON_ONE = 2,
        LEAGUE_FORTRESS_TYPE_COMMON_TWO = 3,
        LEAGUE_FORTRESS_TYPE_EASY_ONE = 4,
        LEAGUE_FORTRESS_TYPE_EASY_TWO = 5,
        LEAGUE_FORTRESS_TYPE_END = 6,
    }
    enum LeagueMatchStateType {
        LEAGUEMATCH_TYPE_NONO = 0,
        LEAGUEMATCH_TYPE_READY = 1,
        LEAGUEMATCH_TYPE_BATTLE = 2,
        LEAGUEMATCH_TYPE_END = 3,
    }
    enum TribeType {
        TRIBE_TYPE_NONO = 0,
        TRIBE_TYPE_ONE = 1,
        TRIBE_TYPE_TWO = 2,
        TRIBE_TYPE_THREE = 3,
        TRIBE_TYPE_FOUR = 4,
        TRIBE_TYPE_END = 5,
    }
    enum ShareTaskType {
        SHARE_TASK_TYPE_NONO = 0,
        SHARE_TASK_TYPE_CREATE_ROLE = 1,
        SHARE_TASK_TYPE_SIX_STAR = 2,
        SHARE_TASK_TYPE_FIRST_CHARGE = 3,
        SHARE_TASK_TYPE_GENERAL_S = 4,
        SHARE_TASK_TYPE_END = 5,
    }
    class IIKVPairs implements aone.AoneBody {
        key: number;
        value: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IdGroup implements aone.AoneBody {
        ids: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class LogInfo implements aone.AoneBody {
        level: number;
        keep_days: number;
        port: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ServerInfo implements aone.AoneBody {
        host: string;
        port: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecurityServerInfo implements aone.AoneBody {
        host: string;
        port: number;
        key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ListenInfo implements aone.AoneBody {
        ip: string;
        port: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SecurityListenInfo implements aone.AoneBody {
        ip: string;
        port: number;
        key: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RedisInfo implements aone.AoneBody {
        host: string;
        port: number;
        password: string;
        db: number;
        conn_count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class MysqlInfo implements aone.AoneBody {
        host: string;
        port: number;
        user: string;
        password: string;
        scheme: string;
        name: string;
        group: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LeveldbInfo implements aone.AoneBody {
        path: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class SMTPInfo implements aone.AoneBody {
        host: string;
        port: number;
        user: string;
        password: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ApnsInfo implements aone.AoneBody {
        appid: number;
        host: string;
        port: number;
        cert_file: string;
        key_file: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ServerConfigInfo implements aone.AoneBody {
        server_id: number;
        password: string;
        center_host: string;
        center_port: number;
        web_port: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_CenterServer implements aone.AoneBody {
        aone_listen_port: number;
        http_listen_port: number;
        log: LogInfo;
        db: RedisInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_ApiRecordServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        log_info: LogInfo;
        mysql_info: MysqlInfo;
        leveldb_info: LeveldbInfo;
        api_server: ServerInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_ApiServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        listen_http: ListenInfo;
        log_info: LogInfo;
        mysql_info: MysqlInfo;
        redis_infos: Array<RedisInfo>;
        account_servers: Array<SecurityServerInfo>;
        sms_server: SecurityServerInfo;
        mail_server: SecurityServerInfo;
        push_server: SecurityServerInfo;
        record_server: SecurityServerInfo;
        datacenter_server: ServerConfigInfo;
        listen_websocket: ListenInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_PayServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        listen_http: ListenInfo;
        log_info: LogInfo;
        mysql_info: MysqlInfo;
        leveldb_info: LeveldbInfo;
        record_server: SecurityServerInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_AccountServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        log_info: LogInfo;
        mysql_info: MysqlInfo;
        redis_infos: Array<RedisInfo>;
        leveldb_info: LeveldbInfo;
        record_server: SecurityServerInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_MailServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        log_info: LogInfo;
        redis_info: RedisInfo;
        smtp_info: SMTPInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_PushServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        log_info: LogInfo;
        redis_info: RedisInfo;
        apns_production: number;
        apns: Array<ApnsInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Config_SmsServer implements aone.AoneBody {
        listen_aone_rc4: SecurityListenInfo;
        log_info: LogInfo;
        redis_info: RedisInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    class GameGroupInfo implements aone.AoneBody {
        group_id: number;
        group_name: string;
        server_ip: string;
        server_port: number;
        status: number;
        is_recommend: boolean;
        is_initialed: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckVersionReqBody implements aone.AoneBody {
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckVersionRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CheckVersionReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckVersionRespBody implements aone.AoneBody {
        major_version: number;
        minor_version: number;
        revision_version: number;
        status: number;
        notice: string;
        download_url: string;
        update_url: string;
        big_patcher_url: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CheckVersionResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CheckVersionRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetGameGroupsReqBody implements aone.AoneBody {
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetGameGroupsRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetGameGroupsReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetGameGroupsRespBody implements aone.AoneBody {
        groups: Array<GameGroupInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetGameGroupsResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetGameGroupsRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CreateRoleReqBody implements aone.AoneBody {
        user_id: number;
        user_account: string;
        user_token: number;
        group_id: number;
        role_type: number;
        role_name: string;
        role_features: Array<KVPair>;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CreateRoleRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: CreateRoleReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CreateRoleRespBody implements aone.AoneBody {
        role: RoleShortInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class CreateRoleResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: CreateRoleRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserLoginReqBody implements aone.AoneBody {
        user_id: number;
        token: string;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserLoginRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: UserLoginReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserLoginRespBody implements aone.AoneBody {
        user_token: number;
        roles: Array<RoleShortInfo>;
        groups: Array<GameGroupInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class UserLoginResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: UserLoginRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetRoleInfoReqBody implements aone.AoneBody {
        role_id: number;
        auth_key: string;
        device_info: DeviceInfo;
        version_info: AppVersionInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetRoleInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: GetRoleInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetRoleInfoRespBody implements aone.AoneBody {
        role: RoleShortInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GetRoleInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: GetRoleInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetRoleShortInfoByUserIdReqBody implements aone.AoneBody {
        user_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetRoleShortInfoByUserIdRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IE_GetRoleShortInfoByUserIdReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetRoleShortInfoByUserIdRespBody implements aone.AoneBody {
        roles: Array<RoleShortInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetRoleShortInfoByUserIdResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IE_GetRoleShortInfoByUserIdRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetH5RolePayInfoReqBody implements aone.AoneBody {
        role_id: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetH5RolePayInfoRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IE_GetH5RolePayInfoReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetH5RolePayInfoRespBody implements aone.AoneBody {
        h5_pay_info: H5RolePayInfo;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_GetH5RolePayInfoResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IE_GetH5RolePayInfoRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveChargeRewardReqBody implements aone.AoneBody {
        role_id: number;
        index: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveChargeRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IE_ReceiveChargeRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveChargeRewardRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveChargeRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IE_ReceiveChargeRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveH5OverSeaRewardReqBody implements aone.AoneBody {
        role_id: number;
        index: string;
        count: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveH5OverSeaRewardRequest implements aone.AoneRequest {
        static ID: number;
        header: aone.AoneReqHeader;
        body: IE_ReceiveH5OverSeaRewardReqBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveH5OverSeaRewardRespBody implements aone.AoneBody {
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class IE_ReceiveH5OverSeaRewardResponse implements aone.AoneResponse {
        static ID: number;
        header: aone.AoneRespHeader;
        body: IE_ReceiveH5OverSeaRewardRespBody;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
declare namespace message {
    enum EC {
        SUCCESS = 0,
        AGENT_ERROR = 100,
        AGENT_INVALID_ARG = 101,
        AGENT_AUTH_FAILED = 102,
        AGENT_UNMATCHED_TYPE = 103,
        AGENT_INVALID_ROLEID_OR_SESSION = 104,
        AGENT_NOSUPPORT_RESTART = 105,
        AGENT_FILE_OPERAT_FORBID = 106,
        AGENT_CANNOT_FIND_FILE = 107,
        AGENT_FILE_TOO_BIG = 108,
        AGENT_CAN_NOT_FIND_ROLE = 109,
        AGENT_CAN_NOT_FIND_UNION = 110,
        AGENT_ITEM_EXIST = 111,
        AGENT_ITEM_COUNT_TO_BIG = 112,
        AGENT_FULL = 113,
        AGENT_CANNOT_FIND_UNION = 114,
        AGENT_CAN_NOT_ZERO = 115,
        AGENET_CAN_NOT_EMPTY = 116,
        AGENT_ERROR_LIMIT = 199,
        AGENT_FILE_TYPE_ERROR = 200,
        AGENT_FILE_CODING_ERROR = 201,
        AGENT_FILE_LOAD = 202,
        AGENT_FILE_STUFF = 203,
        AGENT_FILE_CHECK = 204,
        AGENT_FILE_SAVE = 205,
        AGENT_TIME_ERROR = 206,
        AGENT_FILE_UPDATING = 207,
        AGENT_SET_OPEN_SERVER = 208,
        XA_ERROR = 1000,
        XA_INVALID_ARG = 1001,
        XA_NOT_SUPPORT = 1002,
        XA_VERIFY_KEY = 1003,
        XA_UID_DISABLE = 1004,
        XA_NOT_FOUND_UID = 1005,
        XA_NOT_FOUND_ACCOUNT = 1006,
        XA_ACCOUNT_EXIST = 1007,
        XA_INVALID_TOKEN = 1008,
        XA_INVALID_PASSWD = 1009,
        XA_DUPLICATE_BIND = 1010,
        XA_DATABASE_ERROR = 1011,
        XA_SENDMAIL_FAILED = 1012,
        XA_OPERATE_TIMEOUT = 1013,
        XA_OPEN_API_ERROR = 1014,
        XA_NOT_FOUND_DEVICEID = 1015,
        XA_NOT_FOUND_SINA_ACCOUNT = 1017,
        XA_NOT_FOUND_TENCENT_ACCOUNT = 1018,
        XA_NOT_FOUND_FACEBOOK_ACCOUNT = 1019,
        XA_NOT_FOUND_AONE_ACCOUNT_BY_UID = 1020,
        XA_NOT_FOUND_AONE_ACCOUNT_BY_PHONE = 1021,
        XA_NOT_FOUND_AONE_ACCOUNT_BY_MAIL = 1022,
        XA_NOT_FOUND_AONE_ACCOUNT_BY_WEIXIN = 1023,
        XA_NOT_FOUND_CHANNEL_NAME = 1024,
        XA_PHONE_ALREADY_BIND = 1201,
        XA_MAIL_ALREADY_BIND = 1202,
        XA_INVALID_SESSION = 1297,
        XA_INVALID_TICKET = 1298,
        XA_ERROR_LIMIT = 1299,
        XE_ERROR = 1500,
        XE_TIMEOUT = 1501,
        XE_INVALID_ARG = 1502,
        XE_NOT_SUPPORT = 1503,
        XE_INVALID_VERIFY_KEY = 1504,
        XE_INVALID_GAME_CODE = 1505,
        XE_INVALID_CLIENT_VERSION = 1506,
        XE_FORBID = 1507,
        XE_CREATEROLE_FORBID = 1508,
        XE_ERROR_LIMIT = 1699,
        XI_ERROR = 1700,
        XI_TIMEOUT = 1701,
        XI_INVALID_ARG = 1702,
        XI_INVALID_STATUS = 1703,
        XI_INVALID_VERIFY_KEY = 1704,
        XI_DB_ERROR = 1705,
        XI_INVALID_USER_TOKEN = 1706,
        XI_NOT_FOUND_USER_TOKEN = 1707,
        XI_INVALID_PHONE = 1708,
        XI_INVALID_MAIL = 1709,
        XI_INVALID_AONE_ACCOUNT = 1710,
        XI_INVALID_PASSWORD = 1711,
        XI_NOT_FOUND_APP = 1712,
        XI_INVALID_SIGN = 1713,
        XI_INVALID_JSON = 1714,
        XI_INVALID_JSON_STRUCT = 1715,
        XI_NOT_FOUND_CHANNEL_CONFIG = 1716,
        XI_NOT_FOUND_CHANNEL_PRODUCTS = 1717,
        XI_NOT_VALID_ENTRY_SERVER = 1718,
        XI_INVALID_AONE_ACCOUNT_LEN = 1719,
        XI_INVALID_AONE_ACCOUNT_CHA = 1720,
        XI_UNSUPPORT_CHANNEL = 1721,
        XI_LIMITAPICALL_CHANGEPWD = 1722,
        XI_INVALID_REAL_NAME = 1723,
        XI_INVALID_IDENTITY_NUMBER = 1724,
        XI_FORBID_LOGIN = 1725,
        XI_IP_NOT_MATCHE = 1726,
        XI_COIN_NOT_ENOUGH = 1727,
        XI_ID_CARD_AUTH_FAIL = 1728,
        XI_LIMITAPICALL_SMSSEND = 1729,
        XI_PHONE_ALREADY_BIND = 1730,
        XI_ERROR_LIMIT = 1999,
        XP_ERROR = 2000,
        XP_OPERATE_TIMEOUT = 2001,
        XP_NOT_AUTH = 2002,
        XP_GENERATE_PAYNO = 2003,
        XP_SERVERID_NOT_MATCH = 2004,
        XP_DB_ERROR = 2005,
        XP_INVALID_ARG = 2006,
        XP_UNSUPPORT_PAYCHANNEL = 2007,
        XP_EMPTY_PRODUCTS = 2008,
        XP_THIRDPARTY_COMM_ERR = 2009,
        XP_THIRDPARTY_INVALID_PARAM = 2010,
        XP_DEVICE_LIMITED = 2011,
        XP_PAY_FAILED = 2012,
        XP_PAY_UNFINISHED = 2013,
        XP_ERROR_LIMIT = 2499,
        XR_ERROR = 2500,
        XR_OPERATE_TIMEOUT = 2501,
        XR_INVALID_ARG = 2502,
        XR_SERVER_ALREADY_CONNECTED = 2503,
        XR_REDIS_ERROR = 2504,
        XR_MYSQL_ERROR = 2505,
        XR_AUTH_INVALID_USERTOKEN = 2506,
        XR_AUTH_INVALID_TICKET = 2507,
        XR_CHAR_CREATE_NAME_IN_USE = 2508,
        XR_CHAR_CREATE_ACCOUNT_LIMIT = 2509,
        XR_CHAR_CREATE_SERVER_LIMIT = 2510,
        XR_CHAR_CREATE_DISABLED = 2511,
        XR_CHAR_LOGIN_NO_WORLD = 2512,
        XR_CHAR_LOGIN_DISABLED = 2513,
        XR_CHAR_NAME_PROFANE = 2514,
        XR_CHAR_COIN_NOT_ENOUGH = 2515,
        XR_DB_ERROR = 2516,
        XR_PAY_SIGN_UNMATCH = 2517,
        XR_NAME_INVALID = 2518,
        XR_NOT_FOUND_ROLE = 2519,
        XR_ERROR_LIMIT = 2999,
        XL_ERROR = 3000,
        XL_ALREADY_CONNECTED = 3001,
        XL_ERROR_LIMIT = 3499,
        XL_GAME_ERROR = 3500,
        XL_GAME_ERROR_LIMIT = 3999,
        XC_ERROR = 4000,
        XC_INVALID_ARG = 4001,
        XC_NOT_SUPPORT = 4002,
        XC_DB_ERROR = 4003,
        XC_INVALID_SESSION = 4004,
        XC_SERVER_ID_NOT_EXIST = 4005,
        XC_REPEAT_REGISTER = 4006,
        XC_INVALID_PASSWORD = 4007,
        XC_ALREADY_REGISTER = 4008,
        XC_INVALID_TICKET = 4009,
        XC_TRANSFER_TIMEOUT = 4010,
        XC_TRANSFER_ERROR = 4011,
        XC_CODE_NOT_EXIST = 4012,
        XC_CODE_ALREADY_USED = 4013,
        XC_CODE_COUNT_LIMIT = 4014,
        XC_CODE_PLATFORM_LIMIT = 4015,
        XC_CODE_GROUP_LIMIT = 4016,
        XC_CODE_TIME_LIMIT = 4017,
        XC_ERROR_LIMIT = 4799,
        XK_ERROR = 4800,
        XK_ERROR_LIMIT = 4899,
        XN_ERROR = 5000,
        XN_TIMEOUT = 5001,
        XN_INVALID_ARG = 5002,
        XN_NOT_SUPPORT = 5003,
        XN_SAVE_FAIL = 5004,
        XN_ERROR_LIMIT = 5499,
        XU_ERROR = 5500,
        XU_ERROR_LIMIT = 5899,
        XS_ERROR = 5900,
        XS_ERROR_LIMIT = 5999,
        XD_ERROR = 6000,
        XD_NO_AUTH = 6001,
        XD_SERVER_NOT_FOUND = 6002,
        XD_JSON_CONVERT_FAILED = 6003,
        XD_REQUEST_PATH_NOT_FOUND = 6004,
        XD_SEND_TO_SERVER_FAILED = 6005,
        XD_ERROR_CONFIG_ITEM_ERROR = 6006,
        XD_ERROR_OFFLINE = 6007,
        XD_REGIST_CENTER_SERVER_ERROR = 6008,
        XD_REGIST_ROLE_SERVER_ERROR = 6009,
        XD_REGIST_IP_NOT_MATCHE = 6010,
        XD_REGIST_PORT_NOT_MATCHE = 6011,
        XD_HEATBEAT_FAILED = 6012,
        XD_TIME_OUT = 6013,
        XD_ERROR_LIMIT = 6099,
        XG_ERROR = 10000,
        XG_TIMEOUT = 10001,
        XG_INVALID_ARG = 10002,
        XG_NOT_SUPPORT = 10003,
        XG_INVALID_GAME_CODE = 10004,
        XG_INVALID_ROLEID_OR_SESSION = 10005,
        XG_INVALID_LOGIN = 10006,
        XG_NAME_WRONG = 10007,
        XG_NAME_TOO_LONG = 10008,
        XG_NAME_REPEATED = 10009,
        XG_INVALID_NOT_LOGIN = 10010,
        XG_ROLE_NOT_FINDED = 10050,
        XG_SENSITIVE_WORD = 10051,
        XG_ROLE_TYPE_FAILED = 10052,
        XG_ROLE_STOPED = 10053,
        XG_SERVER_STOPED = 10054,
        XG_FREE_NUM_EMPTY = 10055,
        XG_DBSERVER_ERR = 10056,
        XG_MODIFY_SAME_NAME = 10057,
        XG_SERCH_WORD_NOT_EMPTY = 10058,
        XG_LOGIN_FORBIND = 10059,
        XG_SERVER_RESTART = 10060,
        XG_PAY_MATCH_ERROR = 10061,
        XG_CHAT_REPEATED = 10062,
        XG_ROLE_GROUP_NOT_MATCH = 10063,
        XG_OPENFUNCTION_LEAGUE = 10100,
        XG_OPENFUNCTION_LADDER = 10101,
        XG_OPENFUNCTION_MINE = 10102,
        XG_OPENFUNCTION_VISITOR = 10103,
        XG_OPENFUNCTION_TOWER = 10104,
        XG_OPENFUNCTION_VILLAGE = 10105,
        XG_OPENFUNCTION_WANTED = 10106,
        XG_OPENFUNCTION_GENERALSKILL = 10107,
        XG_OPENFUNCTION_GENERALEQUIP = 10108,
        XG_OPENFUNCTION_GENERALFORGE = 10109,
        XG_OPENFUNCTION_GENERALTALENT = 10110,
        XG_OPENFUNCTION_GENERALCARVE = 10111,
        XG_OPENFUNCTION_ADVISER = 10112,
        XG_OPENFUNCTION_INSTANCE = 10113,
        XG_OPENFUNCTION_TRAINING = 10114,
        XG_OPENFUNCTION_TALENT = 10115,
        XG_OPENFUNCTION_ELITE = 10116,
        XG_OPENFUNCTION_FORMATION = 10117,
        XG_OPENFUNCTION_SEVENDAY = 10118,
        XG_OPENFUNCTION_CHAT = 10119,
        XG_OPENFUNCTION_LADDER_QUICK = 10120,
        XG_OPENFUNCTION_CONTEND = 10121,
        XG_OPENFUNCTION_NOT_OPEN = 10122,
        XG_OPENFUNCTION_ENEMY_CAMP = 10123,
        XG_OPENFUNCTION_SINGLE_CRAFT = 10124,
        XG_LICENCE_LEVEL_NOT_ENOUGH = 10200,
        XG_ROLE_IS_EXIST = 10201,
        XG_ROLE_LEVEL_IS_NOT_ENOUGH = 10202,
        XG_LACK_POWER = 10203,
        XG_NICK_LEN_IS_ERROR = 10204,
        XG_CLIENT_LOGIN_FAILED = 10205,
        XG_CLIENT_KICKED = 10206,
        XG_ACCOUNT_ISNOT_BIND = 10207,
        XG_REWARD_BINDACCOUNT = 10208,
        XG_LACK_TOKEN = 10209,
        XG_LACK_MONEY = 10210,
        XG_CANNOTFIND_GOODS = 10211,
        XG_GOODS_NOT_ENOUGH = 10212,
        XG_GOODS_CANNOT_SELL = 10213,
        XG_PACKAGE_SELL_NUM_IS_ERROR = 10214,
        XG_BATTLE_ATTACKED_FRIEND = 10215,
        XG_BATTLE_ATTACKED_SAME_LEAUGE = 10216,
        XG_LACK_HONOR_COIN = 10217,
        XG_ACTIVATION_TYPE_ERROR = 10220,
        XG_ACTIVATION_NUMBER_NOTFIND = 10230,
        XG_ACTIVATION_NUMBER_FINISH = 10231,
        XG_WARPAPER_NOT_FIND = 10232,
        XG_PROCESS_COOLING = 10233,
        XG_PROCESS_NOT_COOLING = 10234,
        XG_LADDER_BUY_LIMIT = 10235,
        XG_POWER_BUY_LIMIT = 10236,
        XG_LACK_LADDERSCORE = 10237,
        XG_MALL_LIMIT_COUNTS = 10238,
        XG_GOODS_NOT_USED = 10239,
        XG_PLATE_BUY_LIMIT = 10240,
        XG_IMMORTAL_CANNOT_GET = 10241,
        XG_FASHION_NOT_ENOUGH = 10242,
        XG_CHEST_TYPE_ERROR = 10243,
        XG_VIP_LEVEL_NOT_ENOUGH = 10245,
        XG_POWER_FULL = 10246,
        XG_ROLE_PIC_ERROR = 10247,
        XG_ROLE_PICFRAME_ERROR = 10248,
        XG_LACK_CHAMPAGNE = 10249,
        XG_LACK_LEAGUECOIN = 10250,
        XG_SIGN_FAILD = 10251,
        XG_LIEREN_COIN_NOT_ENOUGH = 10252,
        XG_SIGN_RECEIVE_FAILD = 10253,
        XG_REWARD_POWER_NOT_TIME = 10254,
        XG_REWARD_POWER_ALREADY = 10255,
        XG_ROLE_TITLE_ERROR = 10256,
        XG_ROLE_TITLE_VICETITLE_SAME = 10257,
        XG_BUYMONEY_NOT_ENOUGH = 10258,
        XG_LACK_PSYCHICFRUIT = 10259,
        XG_SIGN_ALREADY = 10260,
        XG_SELL_GOODS_EMPTY = 10261,
        XG_LADDER_CHALLENGE_SELF = 10262,
        XG_FORMATION_TYPE_ERROR = 10263,
        XG_FORMATION_MAIN_GENERAL = 10264,
        XG_FORMATION_SUPPORT_GENERAL = 10265,
        XG_FORMATION_RESERVE_GENERAL = 10266,
        XG_FORMATION_GENERAL_REPEATED = 10267,
        XG_FORMATION_GENERAL_LEVEL = 10268,
        XG_LACK_BEER = 10269,
        XG_LACK_REDWINE = 10270,
        XG_CHARGE_ENMPTY = 10271,
        XG_GIFT_ALREADY_BUY = 10272,
        XG_LEVEL_TOO_HIGHT = 10273,
        XG_LACK_LOTTERY_SCORE = 10274,
        XG_LADDER_BATTLING = 10275,
        XG_PLUGIN_CHECK_SPEEDUP = 10276,
        XG_LACK_WANTEDCOIN = 10277,
        XG_CHARGE_LACK = 10278,
        XG_LACK_GOLDPLATE = 10279,
        XG_POTATO_BUY_COUNT_IS_MAX = 10280,
        XG_LOTTERY_REWARD_ALREADY = 10281,
        XG_LOTTERY_REWARD_COOLING = 10282,
        XG_LOTTERY_REWARD_TIME_NOT_ENOUGH = 10283,
        XG_USE_GOODS_TOO = 10284,
        XG_ROLE_CREATING = 10285,
        XG_LOCK_LEAGUE_SCORE = 10286,
        XG_FACEBOOK_REWARD_ALREADY = 10287,
        XG_FACEBOOK_GENERAL_NOT_ENOUGH = 10288,
        XG_PRAISE_COUNT_IS_ENOUGH = 10289,
        XG_PRAISE_COUNT_OTHER_IS_ENOUGH = 10290,
        XG_PRAISE_REWARD_ALREADY = 10291,
        XG_PRAISE_COUNT_ISNOT_ENOUGH = 10292,
        XG_PRAISED_COUNT_ISNOT_ENOUGH = 10293,
        XG_PRAISE_NOT_OPERATION = 10294,
        XG_RUNES_NOT_GAIN = 10295,
        XG_RUNES_IS_GAIN = 10296,
        XG_GAIN_RUNES_NOT_ENOUGH = 10297,
        XG_GAIN_RUNES_REWARD_ISMAX = 10298,
        XG_EXCHANGE_MALL_IS_CDING = 10299,
        XG_GENERAL_NO_EXSIT = 10300,
        XG_GENERAL_OWN = 10301,
        XG_GENERAL_UNOWN = 10302,
        XG_GENERAL_UP_QUALITY_ERROR = 10303,
        XG_GENERAL_QUALITY_MAX = 10304,
        XG_GENERAL_LEVEL_MAX = 10305,
        XG_GENERAL_LEVEL_LOWER = 10306,
        XG_GENERAL_LEVEL_OVER_ROLELEVEL = 10307,
        XG_GENERAL_SKILL_ERROR = 10308,
        XG_GENERAL_BREAK_MAX = 10309,
        XG_GENERAL_STAR_MAX = 10310,
        XG_GENERAL_BRUST_ERROR = 10311,
        XG_EQUIPLEVEL_OVER_GENERALLEVEL = 10312,
        XG_BRUST_FORMATION_ERROR = 10313,
        XG_FORMATION_IS_EMPTY = 10314,
        XG_EQUIPSMELT_MATERIAL_ISNOT_ENOUGH = 10315,
        XG_EQUIPSMELT_LOCKATTRI_ERROR = 10316,
        XG_EQUIPSMELT_EQUIPLEVEL_ISNOT_ENOUGH = 10317,
        XG_EQUIPSMELT_EQUIPLEVEL_ISNOT_QUALITY = 10318,
        XG_GENERAL_PARTNER_ALREADY_ACTIVATE = 10319,
        XG_GENERAL_SKILL_LEVEL_MAX = 10320,
        XG_GENERAL_BREAK_LEVEL_MIN = 10321,
        XG_GENERAL_EQUIP_NO_EXSIT = 10322,
        XG_GENERAL_EQUIP_QUALITY_MAX = 10323,
        XG_SKILL_NO_EXSIT = 10324,
        XG_GENERAL_EQUIP_CARVE_MAX = 10325,
        XG_GENERAL_BREAK_STAR_MIN = 10326,
        XG_GENERAL_BREAK_AWAKEN_MIN = 10327,
        XG_ADVISER_NO_EXSIT = 10328,
        XG_ADVISER_LOCK = 10329,
        XG_ADVISER_LEVEL_MAX = 10330,
        XG_GENERAL_SIZE_NOT_ENOUGH = 10331,
        XG_GENERAL_NOT_FIT = 10332,
        XG_ADVISER_NOT_REWARD = 10333,
        XG_ADVISER_LEVEL_NOT_ENOUGH = 10334,
        XG_BREAK_SKILL_UNOWN = 10335,
        XG_EQUIPSMELT_EQUIPLEVEL_IS_MAX = 10336,
        XG_GENERAL_TALENT_BOOK_NO_EXSIT = 10337,
        XG_ADVISER_OVER_ROLELEVEL = 10338,
        XG_GENERAL_TALENT_OVER_GENERALLEVEL = 10339,
        XG_GENERAL_FORMATION_TYPE_ERROR = 10340,
        XG_GENERAL_FORMATION_NAME_INVALID = 10341,
        XG_BRUST_GENERAL_REPEATED = 10342,
        XG_EQUIPSMELT_OVER_GENERAL_QUALITY = 10343,
        XG_EQUIP_LEVEL_ISNOT_ENOUGH = 10344,
        XG_EQUIP_FORGE_ISNOT_ENOUGH = 10345,
        XG_GENERAL_TALEN_STUDY = 10346,
        XG_CANNOT_BUY = 10347,
        XG_STRATEGY_NOT_UNLOCK = 10348,
        XG_GENERAL_LEVEL_LOWER_FATE = 10349,
        XG_ARTIFACT_IS_EXSIT = 10350,
        XG_ARTIFACT_ISNOT_EXSIT = 10351,
        XG_ARTIFACT_WASH_ATTRI_EMPTY = 10352,
        XG_ARTIFACT_NOT_BREAK = 10353,
        XG_ARTIFACT_LOCK_MORE = 10354,
        XG_ARTIFACT_BREAK_MAX = 10355,
        XG_SKILL_AWAKEN = 10356,
        XG_SKILL_NOT_MAX = 10357,
        XG_LACK_AWAKENBOOK = 10358,
        XG_SKILL_NOT_AWAKEN = 10359,
        XG_COMPOSE_OPEN = 10360,
        XG_COMPOSE_NOT_OPEN = 10361,
        XG_COMPOSE_MAX_LEVEL = 10362,
        XG_COMPOSE_MAX_EXP = 10363,
        XG_COMPOSE_NOT_COMPLETE = 10364,
        XG_ADVISER_COMPOSE_NOT_FIND = 10365,
        XG_ADVISER_COMPOSE_REWARD = 10366,
        XG_ARTIFACT_WASH_ATTRI_ISNOT_EMPTY = 10367,
        XG_JADE_COMPOSE_LEVEL_MAX = 10368,
        XG_JADE_GAMBLE_JADE_TIME_NOT_ENOUGH = 10369,
        XG_ARTIFACT_JADE_NOT_FIND = 10370,
        XG_ARTIFACT_JADE_TYPE_NOT_MATCH = 10371,
        XG_ARTIFACT_POS_NOT_OPEN = 10372,
        XG_JADE_AUTO_REFRESH_TOKEN_ERROR = 10373,
        XG_JADE_REFRESH_EMPTY = 10374,
        XG_JADE_REFRESH_EXPECT = 10375,
        XG_JADE_REFRESH_TYPE_EXPECT_SAME = 10376,
        XG_JADE_REFRESH_TOKEN_TOO_MUCH = 10377,
        XG_JADE_REFRESH_TOKEN_TOO_LOW = 10378,
        XG_JADE_REFRESH_TYPE_ERROR = 10379,
        XG_CARVE_COMPOSE_LEVEL_MAX = 10380,
        XG_GENERAL_SKILL_PROR_LIMIT = 10381,
        XG_POTATO_ISNOT_EXSIT = 10382,
        XG_POTATO_BREAK_MAX = 10383,
        XG_POTATO_JADE_NOT_FIND = 10384,
        XG_POTATO_POS_NOT_OPEN = 10385,
        XG_POTATO_JADE_TYPE_NOT_MATCH = 10386,
        XG_POTATO_CAN_NOT_RESET = 10387,
        XG_POTATO_SIZE_ISNOT_ENOUGH = 10388,
        XG_POTATO_BREAK_GOOD_NOT_MATCH = 10389,
        XG_POTATO_APPRAISE_GOOD_NOT_MATCH = 10390,
        XG_GENERAL_LIFE_UNOWN = 10391,
        XG_GENERAL_LIFE_STAT_UNOWN = 10392,
        XG_GENERAL_LIFE_STAT_NOT_SATISFY = 10394,
        XG_GENERAL_LIFE_STAT_ACTIVATED = 10395,
        XG_GENERAL_LIFE_STAT_IS_BATTLE = 10396,
        XG_GENERAL_LIFE_STAT_CANNOT_USE_PROP = 10397,
        XG_SKILLPOINT_IS_NOT_ENOUGH = 10398,
        XG_SKILL_LEVEL_IS_TOO_HIGH = 10399,
        XG_CHAT_FORBIT = 10400,
        XG_CHAT_FREQUENCY_LIMIT = 10401,
        XG_CHAT_CANNOT_SPEAK_CHANEL = 10402,
        XG_CHAT_CANNOT_SPEAK_TO_YOURSELF = 10403,
        XG_CHAT_CONTEXT_TOO_LENGTH = 10404,
        XG_CHAT_PRIVATE_ISNOT_ONLINE = 10405,
        XG_CHAT_TYPE_NOT_PERSONAL = 10406,
        XG_INSTANCE_ID_ERROR = 10450,
        XG_INSTANCE_MODID_ERROR = 10451,
        XG_INSTANCE_LIMIT_MOB_TIMES = 10452,
        XG_INSTANCE_NOTOPEN = 10453,
        XG_INSTANCE_NOT_SWEEP = 10454,
        XG_INSTANCE_INVALID = 10455,
        XG_INSTANCE_QUALITY_NOT_ENOUGH = 10456,
        XG_INSTANCE_BUY_TIMES_MAX = 10457,
        XG_INSTANCE_EXP_NOT_ENOUGH = 10458,
        XG_INSTANCE_MONEY_NOT_ENOUGH = 10459,
        XG_INSTANCE_STAR_REWARD = 10460,
        XG_INSTANCE_CHAPTER_NOT_FIND = 10461,
        XG_INSTANCE_CHAPTER_ISNOT_ENOUGH = 10462,
        XG_TOWER_SWEEP_NOT_REWARD = 10463,
        XG_TOWER_CANNOT_SWEEP = 10464,
        XG_TOWER_MAX_LAYER = 10465,
        XG_TOWER_SWEEP_MAX_LAYER = 10466,
        XG_TOWER_SWEEPING = 10467,
        XG_TOWER_SWEEP_REWARD = 10468,
        XG_TOWER_ONT_TOWERING = 10469,
        XG_INSTANCE_NOT_OPEN_SWEEP = 10470,
        XG_TOWER_NOT_CHALLENGE = 10471,
        XG_TOWER_REWARD_FINISHED = 10472,
        XG_TRAINING_FINISHED = 10473,
        XG_TRAINING_NOT_FINISHED = 10474,
        XG_TRAINING_REWARDED = 10475,
        XG_TRAINING_NOTALL_FINISH = 10476,
        XG_TOWER_BATTLEVALUE_NOT_ENOUGH = 10478,
        XG_TOWER_NOT_FIND = 10479,
        XG_INSTANCE_CHEST = 10480,
        XG_INSTANCE_NOTWIN_MOB = 10481,
        XG_INSTANCE_CDING = 10482,
        XG_INSTANCE_BATTLE_ERROR = 10483,
        XG_INSTANCE_IS_SEARCHING = 10484,
        XG_INSTANCE_GENERAL_SEARCHING = 10485,
        XG_INSTANCE_GENERAL_ERROR = 10486,
        XG_INSTANCE_SEARCH_NOT_FINSISH = 10487,
        XG_INSTANCE_SEARCH_IS_NOTSEARCH = 10488,
        XG_INSTANCE_SEARCH_TIME_LIMIT = 10489,
        XG_RELATION_CANNOT_ADD_MYSELF = 10500,
        XG_RELATION_FRIEND_APPLY_LENGTH = 10501,
        XG_RELATION_FRIEND_APPLY_NOT_EXIST = 10502,
        XG_RELATION_IN_BLACKLIST = 10503,
        XG_RELATION_OTHER_FRIEND_LIST_FULL = 10504,
        XG_RELATION_APPLY_LIST_FULL = 10505,
        XG_RELATION_FRIEND_EXIST = 10506,
        XG_RELATION_ENEMY_EXIST = 10507,
        XG_RELATION_BLIGHTER_EXIST = 10508,
        XG_RELATION_FRIEND_NOT_EXIST = 10509,
        XG_RELATION_BLIGHTER_NOT_EXIST = 10510,
        XG_RELATION_ENEMY_NOT_EXIST = 10511,
        XG_RELATION_FRIEND_LIST_FULL = 10512,
        XG_RELATION_BLACK_LIST_FULL = 10513,
        XG_RELATION_ENEMY_LIST_FULL = 10514,
        XG_RELATION_GIVEPOWERED = 10515,
        XG_RELATION_NOT_REWARDPOWER = 10516,
        XG_RELATION_ALREAY_REWARDPOWER = 10517,
        XG_RELATION_REWARDPOWER_FULL = 10518,
        XG_RELATION_APPLY_LIST_EXIST = 10519,
        XG_RELATION_FRIEND_IS_EMPTY = 10520,
        XG_EMAIL_NOT_EXIST = 10550,
        XG_EMAIL_TITLE_INVALID = 10551,
        XG_EMAIL_CONTENT_INVALID = 10552,
        XG_EMAIL_ISNOT_ATTACHMENT = 10553,
        XG_EMAIL_SEND_YOURSELF = 10554,
        XG_EMAIL_TYPE_ILLEGAL = 10555,
        XG_EMAIL_SENDER_INVALID = 10556,
        XG_EMAIL_RECEIVER_INVALID = 10557,
        XG_EMAIL_BLIGHTER_CANNOT_SEND = 10558,
        XG_EMAIL_YOU_IN_HIS_ENEMYS_OR_BLIGHTERS = 10559,
        XG_EMAIL_IS_ATTACHMENT = 10560,
        XG_LEAGUE_NOTFIND = 10600,
        XG_LEAGUE_NAME_EXIST = 10601,
        XG_LEAGUE_YOURSLEF_NOT_LEAGUE = 10602,
        XG_LEAGUE_LEVEL_NOT_ENOUGH = 10603,
        XG_LEAGUE_NAME_LIMIT = 10604,
        XG_LEAGUE_INFO_LIMIT = 10605,
        XG_LEAGUE_ACOUSTICS_LIMIT = 10606,
        XG_LEAGUE_NUM_LIMIT = 10607,
        XG_LEAGUE_MENMBER_NOT_FIND = 10608,
        XG_LEAGUE_KICKOUT_YOURSELF = 10609,
        XG_LEAGUE_OFFICE_NOT_OPERATE = 10610,
        XG_LEAGUE_ADDJOIN_TIME_SMALL = 10611,
        XG_LEAGUE_ALREADY_MENMBER = 10612,
        XG_LEAGUE_ALREADY_HAS_LEAGUE = 10613,
        XG_LEAGUE_LEADER_NOT_KICKOUT = 10614,
        XG_LEAGUE_LEADER_NOT_QUIT = 10615,
        XG_LEAGUE_OPERATE_TO_YOURSELF = 10617,
        XG_LEAGUE_APPLY_LIST_MAX = 10618,
        XG_LEAGUE_ALREADY_APPLIED = 10619,
        XG_LEAGUE_PROFFER_NOTENOUGH = 10620,
        XG_LEAGUE_APPLY_LIST_EMPTY = 10621,
        XG_LEAGUE_APPLY_NOT_EXIST = 10622,
        XG_LEAGUE_IMPEACH_NOT_HAVE = 10623,
        XG_LEAGUE_IMPEACH_NOT_YOURSELF = 10624,
        XG_LEAGUE_IMPEACH_NOT_LEADER = 10625,
        XG_LEAGUE_IMPEACH_HVAE_IMPEACH = 10626,
        XG_LEAGUE_IMPEACH_NOT_IMPEACH = 10627,
        XG_LEAGUE_ROLE_APPLY_LEAGUE_COUNT = 10629,
        XG_LEAGUE_QUIT_TIME_TOO_SHORT = 10630,
        XG_LEAGUE_NOT_JOIN = 10631,
        XG_LEAGUE_PIC_ERROR = 10632,
        XG_LEAGUE_PICFRAME_ERROR = 10633,
        XG_LEAGUE_PRESENTED = 10634,
        XG_LEAGUE_PRESENT_TYPE_ERROR = 10635,
        XG_LEAGUE_SKILL_NOT_FIND = 10636,
        XG_LEAGUE_SKILL_LEVEL_MAX = 10637,
        XG_LEAGUE_SKILL_EXP_NOT_ENOUGH = 10638,
        XG_LEAGUE_SKILL_RESET_EMPTY = 10639,
        XG_LEAGUE_SKILL_SELECT_EMPTY = 10640,
        XG_LEAGUE_OFFICIAL_NOT_ENTOUGH = 10641,
        XG_LEAGUE_OFFICIAL_ROLE_MAX = 10642,
        XG_LEAGUE_ANIMAL_NOT_FIND = 10643,
        XG_LEAGUE_ANIMAL_EXIST = 10644,
        XG_LEAGUE_ANIMAL_FEED_TYPE = 10645,
        XG_LEAGUE_ANIMAL_FEED_SENIOR = 10646,
        XG_LEAGUE_ANIMAL_FEED_NORMAL = 10647,
        XG_LEAGUE_BOSS_NOT_FIND = 10648,
        XG_LEAGUE_BOSS_EXIST = 10649,
        XG_LEAGUE_BOSS_GROW_NOT_ENOUGH = 10650,
        XG_LEAGUE_LACK_RES = 10651,
        XG_LEAGUE_BOSS_INSPIRE_ENOUGH = 10652,
        XG_LEAGUE_BOSS_BATTLE_TIME = 10653,
        XG_LEAGUE_BOSS_DEAD = 10654,
        XG_LEAGUE_PARTY_ALREADY = 10655,
        XG_LEAGUE_PARTY_ADD_ALREADY = 10656,
        XG_LEAGUE_PARTY_ADD_EXIST = 10657,
        XG_LEAGUE_PARTY_TIME_OUT = 10658,
        XG_LEAGUE_PARTY_NOT_JOIN = 10659,
        XG_LEAGUE_PARTY_ADD_NOT_EXIST = 10660,
        XG_LEAGUE_PARTY_OPENED = 10661,
        XG_LEAGUE_FISHING_NUMBER = 10662,
        XG_LEAGUE_FISHING_REWARD_ALREADY = 10663,
        XG_LEAGUE_FISHING_NOT_REWARD = 10664,
        XG_LEAGUE_FISHING_NOT_FINISH = 10665,
        XG_LEAGUE_FISHING_NOT_START = 10666,
        XG_LEAGUE_INSTNACE_NOT_FIND = 10667,
        XG_LEAGUE_INSTNACE_OTHER_OPEN = 10668,
        XG_LEAGUE_INSTNACE_LEADER_LEVEL_NOT_ENOUGH = 10669,
        XG_LEAGUE_LACK_ENLIVEN = 10670,
        XG_LEAGUE_INSTANCE_SUPPLY_NOT_REWARD = 10671,
        XG_LEAGUE_INSTANCE_BATTLING = 10672,
        XG_LEAGUE_INSTANCE_MOBS_WIN = 10673,
        XG_LEAGUE_INSTANCE_TIME_NOT_ENOUGH = 10674,
        XG_LEAGUE_INSTANCE_BUY_TIME_MAX = 10675,
        XG_LEAGUE_INSTANCE_MOBS_ELITES_NOT_WIN = 10676,
        XG_LEAGUE_NOT_FIND_APPROPRIATE = 10677,
        XG_LEAGUE_NOT_OPERATOR = 10678,
        XG_LEAGUE_ANIMAL_IS_ADOPTED = 10679,
        XG_LEAGUE_OTHER_OFFICIAL_NOT_ENTOUGH = 10680,
        XG_LEAGUE_ROLE_LEVEL_IS_NOT_ENOUGH = 10681,
        XG_LEAGUE_INSTANCE_NOT_OPEN = 10682,
        XG_LEAGUE_INSTANCE_DAY_ALREADY_OPEN = 10683,
        XG_LEAGUE_CHEST_IS_REWARD = 10684,
        XG_LEAGUE_QUIET_TIME_ISLIMIT = 10685,
        XG_BREAK_SKILL_MAX_LEVEL = 10686,
        XG_LEAGUE_RANK_MAX_RANGE = 10687,
        XG_BREAK_SKILL_GENERAL_NUM_ERROR = 10688,
        XG_LEAGUE_RECRUITINFO_LIMIT = 10689,
        XG_POTATO_STAR_ISNOT_ENOUGH = 10690,
        XG_POTATO_ATTRIID_ERROR = 10691,
        XG_POTATO_ATTRIID_NOT_FIND = 10692,
        XG_POTATO_ATTRIID_NOT_GROWTH = 10693,
        XG_MISSION_ACTIVE_NOT_ENOUGH = 10700,
        XG_MISSION_ACTIVE_REWARD = 10701,
        XG_MISSION_NOT_FIND = 10702,
        XG_MISSION_FINISH_REWARD = 10703,
        XG_MISSION_NOT_FINISH = 10704,
        XG_MISSION_NOT_OPEN = 10705,
        XG_MISSION_LICENCE_NOT_OPEN = 10706,
        XG_MISSION_LICENCE_IS_REWARD = 10707,
        XG_MISSION_LICENCE_NOT_SAME = 10708,
        XG_ACTIVITY_REWARDED = 10800,
        XG_ACTIVITY_NOT_OPEN = 10801,
        XG_MONTH_TODAY_REWARD = 10802,
        XG_FUND_BUY_ALREADY = 10803,
        XG_FUND_NOT_BUY = 10804,
        XG_FUND_REWARD_ALREADY = 10805,
        XG_ACTIVITY_ZONE_ERROR = 10806,
        XG_ACTIVITY_CHARGE_NOT_ENOUGH = 10807,
        XG_ACTIVITY_COLLECT_NOT_ENOUGH = 10808,
        XG_ACTIVITY_MALL_BUYED = 10809,
        XG_ACTIVITY_OPEN_ONLEY = 10810,
        XG_ACTIVITY_NOT_REWAED = 10811,
        XG_ACTIVITY_NEXTREWAED_ISSET = 10812,
        XG_ACTIVITY_MALL_BUYED_NOT_ENOUGH = 10813,
        XG_INTEGRAL_PROCESS_IS_CLOSE = 10814,
        XG_INTEGRAL_PROCESS_INFO_ERROR = 10815,
        XG_INTEGRAL_EXCHANGEID_ERROR = 10816,
        XG_INTEGRAL_EXCHANGE_COUNT_MAX = 10817,
        XG_INTEGRAL_EXCHANGE_SCORE_LACK = 10818,
        XG_INTEGRAL_INDEX_ERROR = 10819,
        XG_INTEGRAL_ALLSCORE_NOT_ENOUGH = 10820,
        XG_INTEGRAL_PRIZE_RECEIVE = 10821,
        XG_ACTIVITY_MONTHCARD_NOT_BUY = 10822,
        XG_XUYUANWU_PROCESS_IS_CLOSE = 10823,
        XG_XUYUANWU_PROCESS_INFO_ERROR = 10824,
        XG_XUYUANWU_EXCHANGEID_ERROR = 10825,
        XG_XUYUANWU_EXCHANGE_COUNT_MAX = 10826,
        XG_XUYUANWU_EXCHANGE_SCORE_LACK = 10827,
        XG_XUYUANWU_INDEX_ERROR = 10828,
        XG_XUYUANWU_ALLSCORE_NOT_ENOUGH = 10829,
        XG_XUYUANWU_PRIZE_RECEIVE = 10830,
        XG_XUYUANWU_TIME_LACK = 10831,
        XG_BATTLE_DATA_PARSER_FAILED = 10900,
        XG_BATTLE_DATA_CHECK_FAILED = 10901,
        XG_BATTLE_MAIN_NUMBER_IS_ERROR = 10902,
        XG_BATTLE_RESERVE_NUMBER_IS_ERROR = 10903,
        XG_BATTLE_SUPPORT_NUMBER_IS_ERROR = 10904,
        XG_WANTED_TIME_NOT_ENOUGH = 11101,
        XG_WANTED_NOT_FIND_MOBS = 11102,
        XG_WANTED_MOBS_NOT_WIN = 11103,
        XG_WANTED_MOBS_REWARED = 11104,
        XG_WANTED_CHALLENGE_START = 11105,
        XG_WANTED_MOBS_ELITES_NOT_WIN = 11106,
        XG_WANTED_MOBS_WIN = 11107,
        XG_WANTED_DOING = 11108,
        XG_WANTED_NOT_OPEN = 11109,
        XG_WANTED_NOT_SWEEP = 11110,
        XG_WANTED_MOBS_KILLED = 11111,
        XG_LACK_ARRESTCOIN = 11112,
        XG_LACK_HUNTCOIN = 11113,
        XG_WANTED_TYPE_ERROR = 11114,
        XG_WANTED_NOT_THREE_BATTLE_STAR = 11115,
        XG_ENEMY_CAMP_TYPE_ERROR = 11116,
        XG_GROUPBATTLE_NOT_FIND_MOBS = 11117,
        XG_GROUPBATTLE_BATTLE_TIME_LIMIT = 11118,
        XG_GROUPBATTLE_ASSIST_TIME_LIMIT = 11119,
        XG_GROUPBATTLE_ASSIST_IS_USED = 11120,
        XG_LEAGUE_WAR_NOT_OPEN = 11201,
        XG_LEAGUE_WAR_OBJECT_SAME = 11202,
        XG_LEAGUE_WAR_HONOR_INSPIRE_NOT_ENOUGH = 11203,
        XG_LEAGUE_WAR_HONOR_NOT_ENOUGH = 11204,
        XG_LEAGUE_WAR_OBJECT_NOT_JOIN = 11206,
        XG_LEAGUE_WAR_ENTERY_NOT_TIME = 11207,
        XG_LEAGUE_WAR_BUILD_NOT_FIND = 11208,
        XG_LEAGUE_WAR_BUILD_IS_DEAD = 11209,
        XG_LEAGUE_WAR_TOWER_NOT_DEAD = 11210,
        XG_LEAGUE_WAR_BUILD_OWNER = 11211,
        XG_LEAGUE_WAR_DOING = 11213,
        XG_LEAGUE_WAR_NOT_ENROLL = 11218,
        XG_LEAGUE_WAR_READY = 11219,
        XG_LEAGUE_WAR_NOT_BATTLING = 11220,
        XG_LEAGUE_WAR_ENROLL_ALREADY = 11221,
        XG_LEAGUE_WAR_TOKEN_INSPIRE_NOT_ENOUGH = 11222,
        XG_LEAGUE_WAR_FINISH = 11223,
        XG_LEAGUE_WAR_RANK_IS_EXIST = 11224,
        XG_LEAGUE_WAR_CANNON_MYSELF = 11225,
        XG_LEAGUE_WAR_CANNON_SEIZEING = 11226,
        XG_LEAGUE_WAR_MYSELF_COLLECTIONING = 11227,
        XG_LEAGUE_MATCH_IS_OPEN = 11250,
        XG_LEAGUE_MATCH_MEMBER_LIMIT = 11251,
        XG_LEAGUE_MATCH_DEFENSE_LIMIT = 11252,
        XG_LEAGUE_MATCH_FORTRESS_LIMIT = 11253,
        XG_LEAGUE_MATCH_NOT_JOIN = 11254,
        XG_LEAGUE_MATCH_BATTLE_TIME_LIMIT = 11255,
        XG_LEAGUE_MATCH_STAR_MAX = 11256,
        XG_LEAGUE_MATCH_IS_BATTLEING = 11257,
        XG_LEAGUE_MATCH_NOT_FIND_RESULT = 11258,
        XG_SCENE_OTHER_DEAD_PROTECT = 11301,
        XG_SCENE_OTHER_BATTLE_PROTECT = 11302,
        XG_SCENE_OWNER_DEAD_PROTECT = 11303,
        XG_SCENE_OWNER_BATTLE_PROTECT = 11304,
        XG_SCENE_FASTER_DURATION = 11305,
        XG_SCENE_NOT_JOIN = 11306,
        XG_SCENE_OWNER_NOT_DEAD = 11307,
        XG_SCENE_COOLING = 11308,
        XG_SCENE_MODIFY_BATTLEMODE = 11309,
        XG_SCENE_EVIL_NOT_ZERO = 11310,
        XG_SCENE_DECLARE_RELATION_EXIST = 11311,
        XG_SCENE_NOT_BATTLE = 11312,
        XG_SCENE_NOT_CHALLENGE_OBJECT = 11313,
        XG_SCENE_NOT_OPEN = 11314,
        XG_SCENE_CHALLENGE_LIMIT = 11315,
        XG_SCENE_DECLARE_MYSELF = 11316,
        XG_SCENE_OTHER_INVINCIBLE_PROTECT = 11317,
        XG_SCENE_OWNER_INVINCIBLE_PROTECT = 11318,
        XG_SCENE_BLOOD_FULL = 11319,
        XG_SCENE_PEOPLE_MAX = 11320,
        XG_SCENE_OWNER_FROZEN = 11321,
        XG_SCENE_BOSS_DEAD = 11322,
        XG_SCENE_OWNER_ACTTACKING = 11323,
        XG_RELIC_BATTLETIME_LIMIT = 11350,
        XG_RELIC_CHEST_NOT_OWN = 11351,
        XG_RELIC_CHEST_NOT_OPEN = 11352,
        XG_RELIC_COIN_NOT_ENOUGH = 11353,
        XG_RELIC_NOT_BATTLE_TIME = 11354,
        XG_RELIC_MALL_REFRESH_LIMIT = 11355,
        XG_RELIC_TYPE_ERROR = 11356,
        XG_WONDERLAND_LEVEL_ZONE_ERROR = 11401,
        XG_WONDERLAND_TREE_NOT_FIND = 11402,
        XG_WONDERLAND_TREE_HAVENOT_FRUIT = 11403,
        XG_WONDERLAND_TREE_FRUIT_ENOUGH = 11404,
        XG_WONDERLAND_TREE_OTHER_COLLECTIONING = 11405,
        XG_WONDERLAND_TREE_MYSELF_COLLECTIONING = 11406,
        XG_WONDERLAND_TREE_COLLECTIONING_ENOUGH = 11407,
        XG_PVP_SINGELE_ERROR = 11501,
        XG_PVP_OTHER_NOT_OPEN = 11502,
        XG_LACK_PROMISE = 11503,
        XG_CONTEND_BATTLING = 11504,
        XG_CONTEND_NOT_LOCK_OBJECT = 11505,
        XG_CONTEND_NOT_OPEN = 11506,
        XG_CONTEND_CHALLENGE_TIME = 11507,
        XG_GIFT_BUYTIME_NOT_ENOUGH = 11601,
        XG_GIFT_NOT_FIND = 11602,
        XG_EXCHANGE_MALL_GOODS_NOT_SATISFY = 11603,
        XG_POTATO_CANNOT_REFRESH = 11604,
        XG_POTATO_IS_REFRESH = 11605,
        XG_POTATO_NOT_REFRESH = 11606,
        XG_POTATO_LEVEL_LIMIT = 11607,
        XG_POTATO_TYPE_LIMIT = 11608,
        XG_WANTED_BUY_LIMIT = 11609,
        XG_POTATO_IS_LOCK = 11610,
        XG_DOUBLE_FRUIT_IS_ERROR = 11611,
        XG_DOUBLE_FRUIT_TIME_IS_ERROR = 11612,
        XG_DOUBLE_FRUIT_RESULT_IS_EXIST = 11613,
        XG_GENERAL_AWAKEN_NUM_ERROR = 11614,
        XG_GENERAL_AWAKEN_UPLEVEL_NUM_ERROR = 11615,
        XG_GENERAL_STAR_NOT_ENOUGH = 11616,
        XG_GENERAL_UPSTAR_REWARD_ALREADY = 11617,
        XG_UPLEVEL_NOT_ENOUGH = 11618,
        XG_UPLEVEL_REWARD_ALREADY = 11619,
        XG_GENERAL_REMAIN_NUM_LESS = 11620,
        XG_GENERAL_STAR_LARGE = 11621,
        XG_GENERAL_WAREHOUSE_IS_MAX = 11622,
        XG_GENERAL_IN_AIM_LIST = 11623,
        XG_GENERAL_MAKE_ID_ERROR = 11624,
        XG_GENERAL_MAKE_LEVEL_ERROR = 11625,
        XG_GENERAL_MAKE_STAR_ERROR = 11626,
        XG_GENERAL_MAKE_AWAKEN_ERROR = 11627,
        XG_OPENFUNCTION_HIGH_TOWER = 11628,
        XG_GENERAL_PSYCHIC_UNLOCK = 11629,
        XG_GENERAL_PSYCHIC_AWAKEN = 11630,
        XG_GENERAL_PSYCHIC_NOT_AWAKEN = 11631,
        XG_GENERAL_MAKE_APTITUDE_ERROR = 11632,
        XG_FANSHION_NOT_BUY = 11633,
        XG_GENERAL_LEVEL_OVER_STEP = 11634,
        XG_GENERAL_BREAK_NUM_ERROR = 11635,
        XG_GENERAL_PSYCHIC_NOT_USE = 11636,
        XG_GENERAL_PSYCHIC_NOT_UNLOCK = 11637,
        XG_GENERAL_PSYCHIC_ALREADY_UNLOCK = 11638,
        XG_OLD_CHARGE_NOT_EMPTY = 11639,
        XG_FIRST_REWARD_NOT_LEFT_TIME = 11640,
        XG_MIX_SEVENGIFT_CANNOT_BUY = 11641,
        XG_MIX_SEVENGIFT_ALREADY_BUY = 11642,
        XG_MIX_SEVENREWARD_CANNOT_BUY = 11643,
        XG_POTATO_BREAKTHROUGH_MAX_LEVEL = 11644,
        XC_POTATO_BREAKTHROUGH_COUNT_NOT_ENOUGH = 11645,
        XG_POTATO_BREAKTHROUGH_GOOD_NOT_MATCH = 11646,
        XG_POTATO_BREAKTHROUGH_GOOD_NOT_SAME = 11647,
        XG_POTATO_BREAKTHROUGH_LEVEL_NOT_ENOUGH = 11648,
        XG_PET_NO_EXSIT = 11649,
        XG_PET_STAR_MAX = 11650,
        XG_PET_STAR_LACK = 11651,
        XG_PET_STEP_MAX = 11652,
        XG_GENERAL_APTITUDE_NOT_ENOUGH = 11653,
        XG_GENERAL_EQUIP_ALREADY_COMPOSE = 11654,
        XG_GENERAL_EQUIP_NOT_COMPOSE = 11655,
        XG_GENERAL_EQUIP_LEVEL_MAX = 11656,
        XG_GENERAL_EQUIP_STEP_MAX = 11657,
        XG_GENERAL_EQUIP_COMPOSE_LEVEL_LOW = 11658,
        XG_BIND_PHONE_READY = 11659,
        XG_VIP_SYSTEM_NOT_OPEN = 11660,
        XG_VIP_PRMISSION_ISNOT_ENOUGH = 11661,
        XG_RECIEVE_POWER_INDEX_ERROR = 11662,
        XG_RECIEVE_POWER_INDEX_RECIEVE = 11663,
        XG_DOLL_COIN_NOT_ENOUGH = 11664,
        XG_PSYCHIC_ATTRI_LEVEL_MAX = 11665,
        XG_PET_HAT_NO_EXSIT = 11666,
        XG_PET_HAT_IS_AIM_STATE = 11667,
        XG_GENERAL_TRANSFER_ERROR = 11668,
        XG_GENERAL_NOT_TRANSFER = 11669,
        XG_GENERAL_HAVE_TRANSFER = 11670,
        XG_GENERAL_TRANSFER_SKILL_ERROR = 11671,
        XG_TITLE_IS_OWN = 11672,
        XG_TITLE_NOT_FIT = 11673,
        XG_GENERAL_HAVE_APTITUDE = 11674,
        XG_LACK_DUST = 11675,
        XG_LACK_CRYSTAL = 11676,
        XG_PERMIT_LEVEL_LIMIT = 11677,
        XG_PERMIT_LIMIT_REWARD = 11678,
        XG_GENERAL_NOT_BREAKLEVEL = 11679,
        XG_MOBS_TIMEOUT = 11683,
        XG_PROCESS_ERROR = 11684,
        XG_ACTIVITY_GRAB_REDPACKET = 11685,
        XG_SINGLECRAFT_NOT_FIGHTING = 11700,
        XG_SINGLECRAFT_CHALLENGE_TIME = 11701,
        XG_SINGLECRAFT_CHALLENGE_FINISH = 11702,
        XPUBLIC_ERROR = 19600,
        XPUBLIC_OPERATE_TIMEOUT = 19601,
        XPUBLIC_SERVER_MYSQL_NOT_FIND = 19602,
        XPUBLIC_SERVER_NOT_FIND = 19603,
        XPUBLIC_ROLE_NOT_FIND = 19604,
        XPUBLIC_VERSION_NOT_MATCH = 19605,
        XPUBLIC_NOT_JOIN = 19606,
        XPUBLIC_CHALLENGE_WIN = 19607,
        XPUBLIC_BUY_NOT_ENOUGH = 19608,
        XPUBLIC_SERVER_STOP = 19609,
        XCOMMENT_PUBLISH_TIME_LIMIT = 19700,
        XCOMMENT_CONTENT_TOO_LONG = 19701,
        XCOMMENT_PUBLISH_FAILT = 19702,
        XCOMMENT_IS_NOT_EXISTS = 19703,
        XCOMMENT_DELETE_FAILT = 19704,
        XCOMMENT_QUERY_EXISTS_FAILT = 19705,
        XCOMMENT_QUERY_ID_FAILT = 19706,
        XCOMMENT_QUERY_LIST_FAILT = 19707,
        XCOMMENT_POST_TYPE_ERROR = 19708,
        XCOMMENT_POST_PUBLISH_TIME_LIMIT = 19709,
        XCOMMENT_POST_CONTENT_TOO_LONG = 19710,
        XCOMMENT_POST_PUBLISH_FAILT = 19711,
        XCOMMENT_POST_IS_NOT_EXISTS = 19712,
        XCOMMENT_POST_IS_NOT_POSTER = 19713,
        XCOMMENT_POST_DELETE_FAILT = 19714,
        XCOMMENT_POST_QUERY_POSTTIMES_FAILT = 19715,
        XCOMMENT_POST_QUERY_POSTEXIST_FAILT = 19716,
        XCOMMENT_POST_QUERY_ISPOSTER_FAILT = 19717,
        XCOMMENT_POST_QUERY_LIST_FAILT = 19718,
        XCOMMENT_PRAISE_TIME_LIMIT = 19719,
        XCOMMENT_PRAISE_QUERY_CLICKTIME_FAILT = 19720,
        XCOMMENT_PRAISE_FAILT = 19721,
        XCOMMENT_POST_IS_EMPTY = 19722,
        XCOMMENT_CONTENT_IS_EMPTY = 19723,
        XCOMMENT_STEP_FAILT = 19724,
        XCOMMENT_TOP_FAILT = 19725,
        XCOMMENT_POST_QUERY_TOP_LIST_FAILT = 19726,
        XCOMMENT_CANCEL_TOP_FAILT = 19727,
        XCOMMENT_POST_FORBID = 19728,
        XCOMMENT_FORBID = 19729,
        XCOMMENT_PUBLISH_INTERVAL_IS_SHORT = 19730,
        XCOMMENT_GET_POST_COUNT_FAILT = 19731,
        XCOMMENT_TOP_POWER_ERROR = 19732,
        XCOMMENT_POST_LIST_NUMBER_LIMIT = 19733,
        XCOMMENT_POST_QUERY_HOT_LIST_FAILT = 19734,
        XCOMMENT_TOP_NUMBER_MORE_THREE = 19735,
        XCOMMENT_GET_TOP_NUMBER_FAILT = 19736,
        XCOMMENT_QUERY_ROLEINFO_FAILT = 19737,
        XCOMMENT_SERVER_ERROR = 19738,
        XCOMMENT_GET_ROLEINFO_FAILT = 19739,
        XCOMMENT_SAVE_ROLEINFO_FAILT = 19740,
        XCOMMENT_QUERY_REFRESH_INTERVAL_FAILT = 19741,
        XCOMMENT_SEND_PRIVATE_CHAT_FAILT = 19742,
        XCOMMENT_SEND_BATTLE_MAIL_FAILT = 19743,
        XCOMMENT_PUBLISH_TIME_IS_SHORT = 19744,
        XCOMMENT_GET_COMMETN_LIST_FAILT = 19745,
        XCOMMENT_POST_IS_SYSTEM = 19746,
        XCOMMENT_SERVER_NOT_FIND = 19747,
        XCOMMENT_ERROR = 19748,
        XCOMMENT_INVALID_ARG = 19749,
        XCOMMENT_ROLE_NOT_EXISTS = 19750,
        XCOMMENT_IS_ROLE_FAILT = 19751,
        XCOMMENT_GET_POST_DETAIL_FAILT = 19752,
        XCOMMENT_GET_ROLE_POST_LIST_FAILT = 19753,
        XCOMMENT_QUERY_COMMENT_DETAIL_FAILT = 19754,
        XCOMMENT_COM_TOP_FAILT = 19755,
        XCOMMENT_COM_TOP_NUMBER_MORE_THREE = 19756,
        XCOMMENT_COM_TOP_CANCEL_FAILT = 19757,
        XCOMMENT_COM_NOT_TOP = 19758,
        XCOMMENT_COM_BETTER_FAILT = 19759,
        XCOMMENT_COM_BETTER_NUM_MORE = 19760,
        XCOMMENT_COM_BETTER_CANCEL_FAILT = 19761,
        XCOMMENT_COM_BETTER_NOT_BETTER = 19762,
        XCOMMENT_QUERY_MANY_ROLES_FAILT = 19763,
        XCHAT_ERROR = 19800,
        XCHAT_SERVER_NOT_FIND = 19801,
        XCHAT_SERVER_ROLEID_ZERO = 19802,
        XACTIVITY_ERROR = 19850,
        XACTIVITY_TYPE_NOT_EXISTS = 19851,
        XACTIVITY_QUERY_ACTIVITY_SERVERIDS = 19852,
        XACTIVITY_SET_ACTIVITY_SERVERIDS = 19853,
        XACTIVITY_REDIS_QUERY_SERVERID_ACTIVITY = 19854,
        XACTIVITY_MYSQL_ACTIVITY_DETAIL_FAILT = 19855,
        XCRAFT_ERROR = 19900,
        XCRAFT_OPERATE_TIMEOUT = 19901,
        XCRAFT_SERVER_MYSQL_NOT_FIND = 19902,
        XCRAFT_SERVER_NOT_FIND = 19903,
        XCRAFT_ROLE_NOT_FIND = 19904,
        XCRAFT_VERSION_NOT_MATCH = 19905,
        XCRAFT_NOT_JOIN = 19906,
        XCRAFT_CHALLENGE_WIN = 19907,
        XCRAFT_BUY_NOT_ENOUGH = 19908,
        XCRAFT_SERVER_STOP = 19909,
        XCRAFT_CONTEND_NOT_JION = 19910,
        XSCENE_NOT_JION = 19950,
        XSCENE_NOT_OPEN = 19951,
        XERROR_LIMIT = 29999,
    }
}
declare namespace message {
    enum DA {
        STEP_NONO = 0,
        STEP_APP_START = 10,
        STEP_CHECK_VERSION = 20,
        STEP_UPDATE_START = 30,
        STEP_UPDATE_FINISH = 40,
        STEP_SDK_CALL = 50,
        STEP_SDK_LOGIN = 60,
        STEP_NOTICE_TIPS = 70,
        STEP_CREATE_ROLE_START = 80,
        STEP_CREATE_ROLE_FINISH = 90,
        STEP_ENTRY_GAME = 100,
        STEP_END = 9999,
    }
    class DeviceInfo implements aone.AoneBody {
        device_id: string;
        locale: string;
        language: string;
        model: string;
        os: string;
        imei: string;
        ip: string;
        mac: string;
        idfa: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class AppVersionInfo implements aone.AoneBody {
        app_id: number;
        app_lang: string;
        channel: string;
        major_version: number;
        minor_version: number;
        revision_version: number;
        ext: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class KVPair implements aone.AoneBody {
        key: string;
        value: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class RoleShortInfo implements aone.AoneBody {
        user_id: number;
        role_id: number;
        owner_groupid: number;
        last_groupid: number;
        last_logintime: string;
        role_createtime: string;
        role_type: number;
        role_level: number;
        role_name: string;
        role_features: Array<KVPair>;
        channel: string;
        device_id: string;
        role_vip: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayProductInfo implements aone.AoneBody {
        id: string;
        name: string;
        describe: string;
        currency: string;
        amount: number;
        amount_usd: number;
        coin: number;
        type: string;
        discount: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class PayProductExtInfo implements aone.AoneBody {
        id: string;
        cp_product_id: string;
        history_discount: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class Payways implements aone.AoneBody {
        pay_channel: string;
        pay_type: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChannelVersionInfo implements aone.AoneBody {
        major_version: number;
        minor_version: number;
        revision_version: number;
        update_addr: string;
        announce_addr: string;
        announce_begin: string;
        announce_end: string;
        announce_rate: number;
        is_show_announce: boolean;
        version_desc: string;
        update_option: number;
        is_test: boolean;
        is_whitelist: boolean;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ChannelInfo implements aone.AoneBody {
        id: string;
        alias: string;
        name: string;
        channel_params: Array<KVPair>;
        channel_products: Array<PayProductInfo>;
        mcc_codes: Array<KVPair>;
        bank_payways: Array<Payways>;
        card_payways: Array<Payways>;
        channel_products_ext: Array<PayProductExtInfo>;
        channel_version_info: Array<ChannelVersionInfo>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class LanguagesInfo implements aone.AoneBody {
        code: string;
        name: string;
        describe: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class GroupInfo implements aone.AoneBody {
        aone_group_id: number;
        cp_group_id: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ForbidInfo implements aone.AoneBody {
        forbid_ip: Array<string>;
        forbid_device_id: Array<string>;
        forbid_uid: Array<number>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class ProductWhiteList implements aone.AoneBody {
        ip: Array<string>;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class WebsiteProductInfo implements aone.AoneBody {
        id: number;
        key: string;
        name: string;
        describe: string;
        product_line_name: string;
        paynotify_url: string;
        payserver: SecurityServerInfo;
        bbs_url: string;
        entryservers: Array<ServerInfo>;
        languages: Array<LanguagesInfo>;
        groups: Array<GroupInfo>;
        channels: Array<ChannelInfo>;
        share_url: string;
        redirect_url: string;
        share_domain: string;
        forbid_info: ForbidInfo;
        max_group_id: number;
        product_whitelist: ProductWhiteList;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class H5ProductInfo implements aone.AoneBody {
        id: string;
        title: string;
        content: string;
        desc: string;
        limit_count: number;
        pay_index: string;
        show_type: number;
        is_first: boolean;
        give_token: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class H5ChargeRewardInfo implements aone.AoneBody {
        index: number;
        charge_sum: number;
        is_reward: boolean;
        goods: Array<KVPair>;
        name: string;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
    class H5RolePayInfo implements aone.AoneBody {
        role_id: number;
        user_id: number;
        group_id: number;
        role_name: string;
        role_level: number;
        vip_level: number;
        product_items: Array<H5ProductInfo>;
        role_channel: string;
        group_name: string;
        charge_sum: number;
        charge_count: number;
        charge_rewards: Array<H5ChargeRewardInfo>;
        h5_oversea_coin: number;
        parse_bytes(decoder: aone.BinaryDecoder): boolean;
        to_bytes(encoder: aone.BinaryEncoder): boolean;
    }
}
