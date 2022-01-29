export function generateToken(n: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';
    for (let i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}