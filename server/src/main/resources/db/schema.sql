CREATE TABLE member (
    memberId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    point INT NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255)
);

CREATE TABLE product (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(255) NOT NULL UNIQUE,
    detail VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    point INT NOT NULL,
    storeLink VARCHAR(255) NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255),
    category VARCHAR(255) NOT NULL
);

CREATE TABLE review (
    reviewId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    productId INT NOT NULL,
    context VARCHAR(255) NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255),
    FOREIGN KEY (memberId) REFERENCES member(memberId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE image (
    imageId INT AUTO_INCREMENT PRIMARY KEY,
    imageUri VARCHAR(255) NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255),
    reviewId INT,
    productId INT,
    FOREIGN KEY (reviewId) REFERENCES review(reviewId),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE cart (
    likeId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    productId INT NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255),
    FOREIGN KEY (memberId) REFERENCES member(id),
    FOREIGN KEY (productId) REFERENCES product(id)
);

CREATE TABLE place (
    placeId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    placeName VARCHAR(255),
    lat DOUBLE NOT NULL,
    longi DOUBLE NOT NULL,
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255)
);


CREATE TABLE challenge (
    ChallengeId INT AUTO_INCREMENT PRIMARY KEY,
    memberId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(1000) NOT NULL,
    image VARCHAR(255),
    createdAt DATETIME,
    createdBy VARCHAR(255),
    updatedAt DATETIME,
    updatedBy VARCHAR(255)
);