export default interface IUser {
    _id?: string;
    name?: string;
    lastName?: string;
    email: string;
    phoneNumber?: number;
    photo?: string;
    settingsId?: string;
    createDate?: Date;
}
