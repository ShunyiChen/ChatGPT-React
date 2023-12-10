export function getLogoIcon(name: string) {
    return new URL(`../assets/logo/${name}`, import.meta.url).href;
}


export function getIcon(name: string) {
    return new URL(`../assets/${name}`, import.meta.url).href;
}

export function isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
}

export function isYesterday(date: Date): boolean {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
}

export function isWithinLast7Days(date: Date): boolean {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
  
    return date >= sevenDaysAgo && date <= today;
}

export function isWithinLast30Days(date: Date): boolean {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
  
    return date >= thirtyDaysAgo && date <= today;
}

export function isDateInCurrentYearMonth(date: Date, targetMonth: number): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === targetMonth - 1
    ); // 月份是从0开始计数，所以需要减去1
}

export const isDateBeforeThisYear = (date: Date): boolean => {
    const currentYear = new Date().getFullYear();
    const yearOfDate = date.getFullYear();
  
    return yearOfDate < currentYear;
};