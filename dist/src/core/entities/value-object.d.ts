export declare abstract class ValueObject<Props> {
    protected props: Props;
    protected constructor(props: Props);
    equals(valueObject: ValueObject<unknown>): boolean;
}
