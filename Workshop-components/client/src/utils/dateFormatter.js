export function formatDate(date) {
    let curDate = new Date(date);
    let result = curDate.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    return result
}