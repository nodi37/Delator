import { saveNewUser } from "../services/userService";
import UserSettings from "../models/UserSettings";

const initApp = async (): Promise<void> => {

    const name = process.env.SU_NAME as string;
    const lastName = process.env.SU_LAST_NAME as string;
    const email = process.env.SU_EMAIL as string;

    const superUser = {
        profile: {
            name,
            lastName,
            email,
        },
        settings: {
            userId: '',
            superUser: true,
            language: '',
            password: ''
        }
    }


    try {
        const count = await UserSettings.countDocuments({ superUser: true });
        if (count === 0) {
            await saveNewUser(superUser);
        }
    } catch (error) {
        console.log(error)
        console.log("Error saving super user");
        console.log("Error")
    }
}

export default initApp;