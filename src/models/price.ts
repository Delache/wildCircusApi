
export class Price {

    public id!: number;
    public type!: string;
    public categorie!: string;
    public value!: string;

    constructor(input: Price) {
        Object.assign(this, input);
    }
}
