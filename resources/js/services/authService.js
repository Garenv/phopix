import axios from "axios";

const LOGIN_API_URL    = "http://phopix.test/api/login";
const REGISTER_API_URL = "http://phopix.test/api/register";

const register = (username, email, password) => {
    console.log("inside register();")
    return axios.post(REGISTER_API_URL, {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(LOGIN_API_URL, {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                console.log(response);
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

export default {
    register,
    login,
    logout,
};
