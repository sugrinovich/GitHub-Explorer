// 950 → "950", 1234 → "1.2K", 999999 → "1M"
const formatter = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
});

export function numberFormatter(num: number): string {
    return formatter.format(num);
}
