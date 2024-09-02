export function getPartialObject<T>(data: T) {
    return <K extends keyof T>(keys: K[]) => {
        const obj: any = {}
        keys.forEach(key => {
            obj[key] = data[key] ?? null
        })
        return obj as {
            [P in K]: T[P];
        }
    }

}