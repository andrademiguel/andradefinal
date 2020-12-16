require("dotenv").config();

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

const getTotalRecords = () => {
    sql = "SELECT COUNT(*) FROM book";
    return pool.query(sql)
        .then(result => {
            return {
                msg: "success",
                totRecords: result.rows[0].count
            }
        })
        .catch(err => {
            return {
                msg: `Error ${err.message}`
            }
        });
};

const insertbook = (book) => {

    if (book instanceof Array) {
        params = book;
    } else {
        params = Object.values(book);
    };

    const sql = `INSERT INTO book (book_id, title, total_pages, rating, isbn, published_date)
                 VALUES ($1, $2, $3, $4, $5, $6)`;

    return pool.query(sql, params)
        .then(res => {
            return {
                trans: "success", 
                msg: `book id ${params[0]} successfully inserted`
            };
        })
        .catch(err => {
            return {
                trans: "fail", 
                msg: `Error on insert of book id ${params[0]}.  ${err.message}`
            };
        });
};

// const findBook = (book) => {

//     var i = 1;
//     params = [];
//     sql = "SELECT * FROM book WHERE true";

//     if (book.book_id !== "") {
//         params.push(parseInt(book.book_id));
//         sql += ` AND book_id = $${i}`;
//         i++;
//     };
//     if (book.title !== "") {
//         params.push(`${book.title}%`);
//         sql += ` AND UPPER(title) LIKE UPPER($${i})`;
//         i++;
//     };
//     if (book.total_pages !== "") {
//         params.push(`${book.total_pages}%`);
//         sql += ` AND UPPER(total_pages) LIKE UPPER($${i})`;
//         i++;
//     };
//     if (book.rating !== "") {
//         params.push(parseFloat(book.rating));
//         sql += ` AND rating >= $${i}`;
//         i++;
//     };
//     if (book.isbn !== "") {
//         params.push(parseFloat(book.isbn));
//         sql += ` AND isbn >= $${i}`;
//         i++;
//     };

//     if (book.published_date !== "") {
//         params.push(parseFloat(book.published_date));
//         sql += ` AND published_date >= $${i}`;
//         i++;
//     };

//     sql += ` ORDER BY book_id`;
//     // for debugging
//     console.log("sql: " + sql);
//     console.log("params: " + params);

//     return pool.query(sql, params)
//         .then(result => {
//             return {
//                 trans: "success",
//                 result: result.rows
//             }
//         })
//         .catch(err => {
//             return {
//                 trans: "Error",
//                 result: `Error: ${err.message}`
//             }
//         });
// };

// module.exports.findBook = findBook;
module.exports.insertbook = insertbook;
module.exports.getTotalRecords = getTotalRecords;