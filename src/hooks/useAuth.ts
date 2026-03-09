export function isAuthenticated() {
  if (typeof window === "undefined") return false;

  const token = localStorage.getItem("token");
  return !!token;
}

export function logout() {
  // localStorage.removeItem("token");
  document.cookie = "token=; path=/; max-age=0";
  window.location.href = "/login";
}