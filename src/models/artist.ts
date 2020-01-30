export class Artist {

    public id!: number;
    public username!: string;
    public speciality!: string;
    public motto!: string;
    public description!: string;
    public link!: string;

    constructor(input: Artist) {
        Object.assign(this, input);
    }
}
