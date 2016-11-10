class Utils {
    public static store(namespace: string, data?: any) {
        console.log(data);
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    }
}
export { Utils };