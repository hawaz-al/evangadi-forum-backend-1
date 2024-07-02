require("dotenv").config();
const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  connectionLimit: 10,
});

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS registration(
      userid INT AUTO_INCREMENT,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY (userid),
      UNIQUE KEY (username)
    )`,
    `CREATE TABLE IF NOT EXISTS profile(
      user_profile_id INT AUTO_INCREMENT,
      userid INT NOT NULL,
      firstname VARCHAR(255) NOT NULL,
      lastname VARCHAR(255) NOT NULL,
      PRIMARY KEY (user_profile_id),
      FOREIGN KEY (userid) REFERENCES registration(userid)
    )`,
    `CREATE TABLE IF NOT EXISTS question(
      question_id INT AUTO_INCREMENT,
      userid INT NOT NULL,
      title VARCHAR(200) NOT NULL,
      question VARCHAR(1000) NOT NULL,
      time DATETIME NOT NULL,
      PRIMARY KEY (question_id),
      FOREIGN KEY (userid) REFERENCES registration(userid)
    )`,
    `CREATE TABLE IF NOT EXISTS answer(
      answer_id INT AUTO_INCREMENT,
      userid INT NOT NULL,
      question_id INT NOT NULL,
      answer VARCHAR(5000) NOT NULL,
      time DATETIME NOT NULL,
      PRIMARY KEY (answer_id),
      FOREIGN KEY (userid) REFERENCES registration(userid),
      FOREIGN KEY (question_id) REFERENCES question(question_id)
    )`,
  ];

  for (const query of queries) {
    await dbConnection.promise().query(query);
  }
};

createTables()
  .then(() => console.log("Tables created successfully"))
  .catch((err) => console.error("Error creating tables:", err));

module.exports = dbConnection.promise();

// const mysql2 = require("mysql2");

// const dbConnection = mysql2.createPool({

//   user: process.env.USER,
//   database: process.env.DATABASE,
//   host: process.env.HOST,
//   password: process.env.PASSWORD,
//   connectionLimit: 10,
// });

// let registration = `CREATE TABLE if not exists registration(
//   userid int auto_increment,
//   username varchar(255) not null,
//   email varchar(255) not null,
//   password varchar(255) not null,
//   PRIMARY KEY (userid),
//   UNIQUE KEY (username)
//   )`;
// let profile = `CREATE TABLE if not exists profile(
//   user_profile_id int auto_increment,
//   userid int not null,
//   firstname varchar(255) not null,
//   lastname varchar(255) not null,
//   PRIMARY KEY (user_profile_id),
//   FOREIGN KEY (userid) REFERENCES registration(userid)
// )`;

// let question = `CREATE TABLE if not exists question(
//   question_id int auto_increment,
//   userid int not null,
//   title varchar(200) not null,
//   question varchar(1000) not null,
//   time DateTime not null,
//   PRIMARY KEY (question_id),
//   FOREIGN KEY (userid) REFERENCES registration(userid)
// )`;
// let answer = `CREATE TABLE if not exists answer(
//   answer_id int auto_increment,
//   userid int not null,
//   question_id int not null,
//   answer varchar(5000) not null,
//   time DateTime not null,
//   PRIMARY KEY (answer_id),
//   FOREIGN KEY (userid) REFERENCES registration(userid),
//   FOREIGN KEY (question_id) REFERENCES question(question_id)
// )`;

// dbConnection.query(registration, (err, results) => {
//   if (err) throw err;
//   console.log("registration table created");
// });
// dbConnection.query(profile, (err, results) => {
//   if (err) throw err;
//   console.log("profile table created");
// });

// dbConnection.query(question, (err, results) => {
//   if (err) throw err;
//   console.log("question table created");
// });
// dbConnection.query(answer, (err, results) => {
//   if (err) throw err;
//   console.log("answer table created");
// });

// module.exports = dbConnection.promise();
