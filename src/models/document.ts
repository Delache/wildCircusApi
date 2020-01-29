/**
 * Cette classe est un modèle
 * Elle représente la forme de l'objet Document (documents)
 */
export class Document {

    public id!: number;
    public title!: string;
    public description!: string;
    public name!: string;

    constructor(input: Document) {
        Object.assign(this, input);
    }
}
