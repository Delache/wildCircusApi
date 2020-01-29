/**
 * Cette classe est un modèle
 * Elle représente la forme de l'objet user
 */
export class User {

    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public email_active!: number;
    public role!: string;

    constructor(input: User) {
        Object.assign(this, input);
    }
}
