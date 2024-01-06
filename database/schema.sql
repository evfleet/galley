CREATE TABLE auth_user (
    id TEXT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL
);

CREATE TABLE user_key (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    hashed_password TEXT
);

CREATE TABLE user_session (
    id TEXT NOT NULL PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES auth_user(id),
    active_expires BIGINT NOT NULL,
    idle_expires BIGINT NOT NULL
);