/////// Assignment 3
//////////// Part1 ///////////
//////// Start Q1 ////////////
/*
 Nodejs Event loop => is a controller that controll the callbacks and asynchronous operations allowing Nodejs handle input output "I/O" without blocking the main js thread where walk on steps of loop as first "timers, pending callback, poll, check, close callbacks"
*/
//////// End Q1 ////////////
//////// Start Q2 ////////////
/*
libuv => is a library made with C language to talk with machine language 'operating system' and handle the asynchronous I/O in nodejs and provide event loop
it does => handle asynchronous operations without blocking main JS thread is blocked where event loop check for ready callbacks that can call in stack queue and make a pool of threads to work in same time to execute methods
 */
//////// End Q2 ////////////
//////// Start Q3 ////////////
/*
 Nodejs handle as => the operation from application go to V8 where it execute JS code using call stack where the asynchronous operations go to libuv by Node Api or Nodejs Binding where libuv determine mechanisme used if will throw to OS or to thread pool 'worker threads' then when callbacks become ready to execute, the event Loop coordinates its execution on the Call Stack
 */
//////// End Q3 ////////////
//////// Start Q4 ////////////
/*
call stack => execute JS code
Event Queue => is the queue has the callbacks ready to execute when call stack is free
Event loop => coordinates the callback in event queue to get into call stack when free
*/
//////// End Q4 ////////////
//////// Start Q5 ////////////
/*
Nodejs thread pool => is a vitural pool of worker threads in nodejs by libuv to handle asynchronous operations without blocking main js thread code execution
set thread pool => set UV_THREADPOOL_SIZE=8 where 8 is the numbers of threads
*/
//////// End Q5 ////////////
//////// Start Q6 ////////////
/*
Nodejs handle blocking code => by main JS thread where execute call stack
Nodejs handle Non-blocking code => by libuv where determine that it will make by OS or asynchronous I/O operations where has worker threads and event loop
*/
//////// End Q6 ////////////
//////////// Part2 ///////////
const path = require("node:path");
const absolutePath = path.resolve("users.json");
const fs = require("node:fs");
const express = require("express");
const app = express();
app.use(express.json());
//////// Start Q1 ////////////
app.post("/user", (req, res) => {
  const body = req.body;
  const users = JSON.parse(fs.readFileSync(absolutePath), "utf-8");
  const existUser = users.find((user) => user.email == body.email);
  if (existUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  const newUser = {
    id: users.length + 1,
    ...body,
    is_active: true,
  };

  users.push(newUser);

  fs.writeFileSync(absolutePath, JSON.stringify(users, null, 2));

  res.status(200).json({ message: "User added successfully" });
});
//////// End Q1 ////////////
//////// Start Q2 ////////////
app.patch("/user/:id", (req, res) => {
  const params = req.params;
  const body = req.body;
  const users = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  const userExist = users.find((user) => user.id == params.id);
  console.log(userExist);

  if (userExist) {
    Object.assign(userExist, body);
    fs.writeFileSync(absolutePath, JSON.stringify(users, null, 2));
    const changedField = Object.keys(body)
      .map((key) => `${key}`)
      .join(", ");
    return res
      .status(200)
      .json({ message: `User ${changedField} updated successfully` });
  }
  res.status(400).json({ message: "User ID not found" });
});
//////// End Q2 ////////////
//////// Start Q3 ////////////
app.delete("/user/:id", (req, res) => {
  const params = req.params;
  const users = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  const userExist = users.find((user) => user.id == params.id);

  if (userExist) {
    const specificUser = users.findIndex((user) => user == userExist);
    users.splice(specificUser, 1);
    fs.writeFileSync(absolutePath, JSON.stringify(users, null, 2));
    return res.status(200).json({ message: "User deleted successfully." });
  }
  res.status(400).json({ message: "User ID not found" });
});
//////// End Q3 ////////////
//////// Start Q4 ////////////
app.get("/user/getByName", (req, res) => {
  const query = req.query;
  const users = JSON.parse(fs.readFileSync(absolutePath), "utf-8");
  const userNameExist = users.find((user) => user.name == query.name);
  if (userNameExist) {
    return res.status(200).json(userNameExist);
  }
  res.status(400).json({ message: "User name not found" });
});
//////// End Q4 ////////////
//////// Start Q5 ////////////
app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(absolutePath), "utf-8");
  return res.status(200).json(users);
});
//////// End Q5 ////////////
//////// Start Q6 ////////////
app.get("/users/filter", (req, res) => {
  const query = req.query;
  const users = JSON.parse(fs.readFileSync(absolutePath), "utf-8");
  const usersFilter = users.filter((user) => user.age >= query.minAge);
  if (usersFilter[0]) {
    return res.status(200).json(usersFilter);
  }
  res.status(400).json({ message: "User not found" });
});
//////// End Q6 ////////////
//////// Start Q7 ////////////
app.get("/user/:id", (req, res) => {
  const params = req.params;
  const users = JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
  const userExist = users.find((user) => user.id == params.id);
  if (userExist) {
    return res.status(200).json(userExist);
  }
  res.status(400).json({ message: "User not found" });
});
//////// End Q7 ////////////
app.use((req, res) => {
  res.status(404).json({
    message: "Invalid URL",
  });
});
app.listen(3000);
