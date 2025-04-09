import { useRouter } from 'vue-router';

const router = useRouter();

export const setToken = (token) => {
    localStorage.setItem('token', token);
}

export const setUser = (user) => {
    let localStorageUser = JSON.stringify(user);

    console.log(localStorageUser);
    localStorage.setItem(
        "user",
        btoa(localStorageUser).split("").reverse().join("")
    );
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUser = () => {
    try {
        let localStorageUser = localStorage
            .getItem("user")
            .split("")
            .reverse()
            .join("");

        return JSON.parse(atob(localStorageUser));
    } catch (error) {
        localStorage.clear();
        router.push("/");
    }
};

export const setLocalStorage = (name, data) => {
    let localStorageData = JSON.stringify(data);

    localStorage.setItem(
        name,
        btoa(localStorageData).split("").reverse().join("")
    );
};

export const getLocalStorage = (name, whenNotFound = null) => {
    try {
        let localStorageUser = localStorage
            .getItem(name)
            .split("")
            .reverse()
            .join("");

        return JSON.parse(atob(localStorageUser));
    } catch (error) {
        return whenNotFound;
    }
};

export const removeLocalStorage = (name) => {
    localStorage.removeItem(name);
};
