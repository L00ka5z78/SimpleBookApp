import express from "express";
import mysql from "mysql";
import cors from "cors";

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password'; wpisz w mysql w kwerendzie


const app = express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lama",
    database: "test"
});

app.get("/", (req, res) => {
    res.json("HELLO FROM backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            return res.json(err)
        } else {
            return res.json(data);

        }
    })
});
app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";

    db.query(q, [bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);

    })
});


app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ? `cover` = ? WHERE id = ?";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);

    });
});



app.listen(8800, () => {
    console.log("Backend connected!")
})

