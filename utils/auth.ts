import * as SQLite from "expo-sqlite";

type StoredUser = {
	email: string;
	password: string;
	fullName: string;
	createdAt: string;
};

type StoredSession = {
	email: string;
	fullName: string;
	lastSignedInAt: string;
};

const db = SQLite.openDatabaseSync("recurrly-auth.db");

const initializeDatabase = () => {
	db.execSync(`
		CREATE TABLE IF NOT EXISTS auth_accounts (
			email TEXT PRIMARY KEY NOT NULL,
			password TEXT NOT NULL,
			fullName TEXT NOT NULL,
			createdAt TEXT NOT NULL
		);
	`);

	db.execSync(`
		CREATE TABLE IF NOT EXISTS auth_sessions (
			id INTEGER PRIMARY KEY CHECK (id = 1),
			email TEXT NOT NULL,
			fullName TEXT NOT NULL,
			lastSignedInAt TEXT NOT NULL
		);
	`);
};

initializeDatabase();

const getAccount = (email: string): StoredUser | null => {
	const rows = db.getAllSync<StoredUser>(
		"SELECT email, password, fullName, createdAt FROM auth_accounts WHERE email = ?",
		email,
	);

	return rows[0] ?? null;
};

const persistSession = (email: string, fullName: string) => {
	db.runSync("DELETE FROM auth_sessions");
	db.runSync(
		"INSERT INTO auth_sessions (id, email, fullName, lastSignedInAt) VALUES (?, ?, ?, ?)",
		1,
		email,
		fullName,
		new Date().toISOString(),
	);
};

const getSession = (): StoredSession | null => {
	const rows = db.getAllSync<StoredSession>(
		"SELECT email, fullName, lastSignedInAt FROM auth_sessions ORDER BY id LIMIT 1",
	);

	return rows[0] ?? null;
};

const clearSession = () => {
	db.runSync("DELETE FROM auth_sessions");
};

export const signUpAccount = async (
	fullName: string,
	email: string,
	password: string,
): Promise<{ ok: boolean; error?: string }> => {
	const normalizedEmail = email.trim().toLowerCase();
	const existing = getAccount(normalizedEmail);

	if (existing) {
		return {
			ok: false,
			error: "That email is already linked to a Recurrly account.",
		};
	}

	db.runSync(
		"INSERT INTO auth_accounts (email, password, fullName, createdAt) VALUES (?, ?, ?, ?)",
		normalizedEmail,
		password,
		fullName.trim(),
		new Date().toISOString(),
	);

	persistSession(normalizedEmail, fullName.trim());

	return { ok: true };
};

export const signInAccount = async (
	email: string,
	password: string,
): Promise<{ ok: boolean; user?: StoredUser; error?: string }> => {
	const normalizedEmail = email.trim().toLowerCase();
	const account = getAccount(normalizedEmail);

	if (!account) {
		return {
			ok: false,
			error: "We couldn't verify that account. Check your email and password.",
		};
	}

	if (account.password !== password) {
		return {
			ok: false,
			error: "We couldn't verify that account. Check your email and password.",
		};
	}

	persistSession(normalizedEmail, account.fullName);

	return { ok: true, user: account };
};

export const authSession = {
	getSession,
	clearSession,
};
