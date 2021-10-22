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

const login = (email, password) => {
    console.log("inside login(); authService.js")
    return axios
        .post(LOGIN_API_URL, {
            email,
            password,
        })
        .then((response) => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            // console.log(response.data);

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
