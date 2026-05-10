/**
 * Shortens a Solana address for display
 * e.g., "43VWkd99HjqkhFTZbWBpMpRhjG469nWa7x7uEsgSH7We" → "43VW...H7We"
 */
export function shortenAddress(address: string, startChars = 4, endChars = 4): string {
    if (address.length <= startChars + endChars) {
        return address;
    }
    return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
