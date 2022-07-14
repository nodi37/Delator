export default interface IUser {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    photo: string;
    superUser: boolean;
    language: string;
    password: string;
    createDate: Date;
}
