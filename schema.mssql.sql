IF DB_ID(N'cse3100_testA1') IS NULL
BEGIN
    CREATE DATABASE cse3100_testA1;
END;
GO

USE cse3100_testA1;
GO

IF OBJECT_ID(N'dbo.posts', N'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.posts;
END;
GO

IF OBJECT_ID(N'dbo.users', N'U') IS NOT NULL
BEGIN
    DROP TABLE dbo.users;
END;
GO

CREATE TABLE dbo.users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100) NULL,
    email VARCHAR(100) NULL,
    password VARCHAR(100) NULL
);
GO

CREATE TABLE dbo.posts (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(MAX) NOT NULL,
    CONSTRAINT FK_posts_users
        FOREIGN KEY (user_id) REFERENCES dbo.users (id)
        ON DELETE CASCADE
);
GO

INSERT INTO dbo.users (name, email, password)
VALUES ('Alice', 'alice@example.com', 'password123');
GO

INSERT INTO dbo.posts (user_id, title, content)
VALUES (1, 'My First Post', 'This is the content of my first post.');
GO
