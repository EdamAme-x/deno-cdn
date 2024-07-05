export function isLockPath(path: string) {
    const lockPaths = process.env.LOCK_PATH?.split(",") || [];
    for (const lockPath of lockPaths) {
        path = path
          .trim()
          .replace(/\\/g, "/")
          .replace(process.env.DELIVARY_DIR || /^\//, "");
        if (path.startsWith(lockPath) || ("/" + path).startsWith(lockPath)) {
            return true;
        }
    }
    
    return path.includes(".cdn-lockfile/");
}