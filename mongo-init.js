// MongoDB initialization script
db = db.getSiblingDB('splitwise-dev');

// Create a user for the application
db.createUser({
  user: 'splitwise-user',
  pwd: 'splitwise-password',
  roles: [
    {
      role: 'readWrite',
      db: 'splitwise-dev',
    },
  ],
});

// Create collections with some initial indexes
db.createCollection('users');

// Create indexes for performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ createdAt: -1 });

print('Database initialization completed');
