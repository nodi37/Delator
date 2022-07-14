import { saveNewUser } from "../services/userService";
import User from "../models/User";

const initApp = async (): Promise<void> => {

    const name = process.env.SU_NAME as string;
    const lastName = process.env.SU_LAST_NAME as string;
    const email = process.env.SU_EMAIL as string;

    const superUser = {
        name,
        lastName,
        email,
        superUser: true
    }

    try {
        const count = await User.countDocuments({ superUser: true });
        if (count === 0) {
            await saveNewUser(superUser);
        }
    } catch (error) {
        console.log("Error saving super user");
        console.log("Error")
    }
}

export default initApp;