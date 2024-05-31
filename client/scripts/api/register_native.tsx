import axios from "axios";
import { ServiceUri } from "../config_native";

interface RegitserRequest{
    id: string;
    email: string;
    password: string;
}

export default async function NativeRegister(regitserRequest: RegitserRequest): Promise<Boolean> {
    try{
        const response = await axios.post<Boolean>("/service/auth/signup", regitserRequest);
		if(!response.data.success){
			console.log(response);
		}
        return response.data;
    }
    catch(err){
        console.error(err);
        return false;
    }
}