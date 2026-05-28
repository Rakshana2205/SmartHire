const USERS_KEY = "smarthire-users";

function getUsers() {
  try {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
  };
  return btoa(JSON.stringify(payload));
}

export function registerUser({ name, email, password }) {
  const users = getUsers();
  const exists = users.find((u) => u.email === email);
  if (exists) {
    throw new Error("An account with this email already exists!");
  }
  const newUser = {
    id: Date.now(),
    name,
    email,
    password,
    avatar: name.charAt(0).toUpperCase(),
    joinedAt: new Date().toLocaleDateString(),
  };
  saveUsers([...users, newUser]);
  const token = generateToken(newUser);
  const { password: _, ...safeUser } = newUser;
  return { user: safeUser, token };
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) {
    throw new Error("No account found with this email!");
  }
  if (user.password !== password) {
    throw new Error("Incorrect password. Please try again!");
  }
  const token = generateToken(user);
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
}

export function validateToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
