
export const formatDate = (date: string): string => {
    const data = new Date(date);
    return data.toLocaleString();
}
