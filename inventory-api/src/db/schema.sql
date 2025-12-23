-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Roles table
CREATE TABLE IF NOT EXISTS roles (
  role_name TEXT PRIMARY KEY,
  permissions TEXT NOT NULL
);

-- Inventory items
CREATE TABLE IF NOT EXISTS inventory_items (
  sku TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  quantity INTEGER NOT NULL,
  reorder_level INTEGER DEFAULT 0,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Transactions (issue / return)
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id TEXT PRIMARY KEY,
  type TEXT CHECK(type IN ('ISSUE','RETURN')),
  sku TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  user_id TEXT NOT NULL,
  status TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Rules engine
CREATE TABLE IF NOT EXISTS rules (
  id TEXT PRIMARY KEY,
  trigger TEXT,
  condition TEXT,
  action TEXT,
  enabled INTEGER DEFAULT 1
);

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  event TEXT,
  details TEXT,
  user_id TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
