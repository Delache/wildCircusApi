export class Token {

    public id?: number;
    public value!: string;
    // tslint:disable-next-line: variable-name
    public user_id!: number;

    constructor(input: Token) {
        Object.assign(this, input);
    }
}
