import express from "express";
const app = express();
const port = 3000;

const users = [
  { name: "Sam", age: 24 },
  { name: "Joshua", age: 25 },
  { name: "David", age: 26 },
  { name: "John", age: 27 },
];

const students = [
  { id: 101, name: "Alice" },
  { id: 102, name: "Bob" },
  { id: 103, name: "Charlie" },
  { id: 104, name: "David" },
];

// ✅ Get all students
app.get('/api/students', (req, res) => {
  res.send(students);
});

// ✅ Get student by ID
app.get('/api/students/:id', (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    res.status(400).send({ message: 'Invalid student ID' });
    return;
  }

  const student = students.find(s => s.id === parseInt(id));
  if (student) {
    res.send(student);
  } else {
    res.status(404).send({ message: 'Student not found' });
  }
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send({ message: 'Hello World' });
});

// ✅ All users with optional query filter
app.get('/api/users', (req, res) => {
  const { name, minAge, maxAge } = req.query;

  let filtered = [...users];

  // Filter by name
  if (name) {
    filtered = filtered.filter(u =>
      u.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by age range
  if (minAge) {
    filtered = filtered.filter(u => u.age >= parseInt(minAge));
  }
  if (maxAge) {
    filtered = filtered.filter(u => u.age <= parseInt(maxAge));
  }

  res.send(filtered);
});

// ✅ Single user by name (path param)
app.get('/api/users/:name', (req, res) => {
  const { name } = req.params;
  const foundUser = users.find(
    u => u.name.toLowerCase() === name.toLowerCase()
  );

  if (foundUser) {
    res.send(foundUser);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});