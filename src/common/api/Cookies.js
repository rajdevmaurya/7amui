
function getDate(days) {
    const now = new Date();
    now.setDate(now.getDate() + days)
    return now;
}
function getCookiesObject(cookies) {

    const cookiesArr = cookies.split(";");
    return cookiesArr.reduce((init, cookieValue) => {
        const [key, value] = cookieValue?.split("=")
        init[key?.trim()] = value?.trim();
        return init;
    }, {})
}
export class Cookies {
    static setCookie(key, value, days) {
        if (typeof window === undefined) return;
        if (days) {
            document.cookie = `${key}=${value};expires=${getDate(days)}`
        } else {
            document.cookie = `${key}=${value}`
        }
    }

    static getCookie(key) {
        if (typeof window === undefined) return;
        const cookiesObj = getCookiesObject(document.cookie)
        return cookiesObj[key]
    }

    static deleteCookie(key) {
        if (typeof window === undefined) return;
        document.cookie = `${key}=;expires=${getDate(-1)}`
    }

    static clearCookies() {
        if (typeof window === undefined) return;
        const cookiesObj = getCookiesObject(document.cookie)
        for (let key in cookiesObj) {
            document.cookie = `${key}=;expires=${getDate(-1)}`
        }
    }
    static hasActiveSession() {
        return this.getCookie('token') ? true : false
    }
}