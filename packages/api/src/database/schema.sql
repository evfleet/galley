CREATE TABLE users (
  id INTEGER NOT NULL PRIMARY KEY
);

CREATE TABLE sessions (
  id TEXT NOT NULL PRIMARY KEY,
  expires_at INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE collections (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  -- delete when user is deleted
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE recipes (
  id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  collection_id INTEGER,
  -- delete all recipes when user is deleted
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  -- maybe unassign recipes from collection when collection is deleted
  FOREIGN KEY (collection_id) REFERENCES collections(id)
);

CREATE TABLE recipeIterations (
  id INTEGER NOT NULL PRIMARY KEY,
  note TEXT, 
  recipe_id INTEGER NOT NULL,
  FOREIGN KEY (recipe_id) REFERENCES recipes(id)
);

CREATE TABLE recipeIngredients (
  id INTEGER NOT NULL PRIMARY KEY,
  recipe_id INTEGER,
  ingredient_id INTEGER,
  iteration_id INTEGER NOT NULL,
  -- add measurements and units
  -- how to support 1 tsp of salt but also 1/2 recipe of sauce
  FOREIGN KEY (iteration_id) REFERENCES recipeIterations(id)
  -- https://thefirstapril.com/2020/04/22/Polymorphic-Association-in-Relational-Database/
  CONSTRAINT chk_either_id_filled CHECK (
    (ingredient_id IS NULL AND recipe_id IS NOT NULL) OR
    (ingredient_id IS NOT NULL AND recipe_id IS NULL)
  )
);

