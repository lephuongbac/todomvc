export class Utils {
    public static store(namespace: string, data?: any) {
        if (data) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }

        let store = localStorage.getItem(namespace);
        return (store && JSON.parse(store)) || [];
    }
}