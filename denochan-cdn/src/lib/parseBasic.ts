export function parseBasic(basic: string | null) {
  if (!basic) return {
    username: "",
    password: "",
  };
  if (!basic.startsWith("Basic ")) return {
    username: "",
    password: "",
  };

  try {
    const [username, password] = atob(basic.split("Basic ")[1]).split(":");
    return {
      username,
      password,
    };
  } catch (_e) {
    return {
      username: "",
      password: "",
    }
  }
}
