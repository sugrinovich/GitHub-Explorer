export function dateFormatter(str: string): string {
    const today = new Date();
    const gitDate = new Date(str);

    const diff = today.getTime() - gitDate.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (minutes < 60)   return `${minutes}m ago`;

    else if (hours < 24) return `${hours}h ago`;

    else if (days === 1)  return "yesterday";
    else if (days < 30) return `${days}d ago`

    else if (months < 12)    return `${months}mo ago`;

    return `${years}y ago`;
}

