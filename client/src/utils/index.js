const token = localStorage.getItem('x-access-token');

export const logout = () => {
    localStorage.removeItem('x-access-token');
}

export const isLogin = () => {
    if (token) {
        return true;
    }
    return false;
}
