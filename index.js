// Pemanggilan package express
const express = require('express')

const { urlencoded, req } = require('express');

// Menggunakan package express
const app = express()

// set template engine
app.set('view engine', 'hbs')

app.use('/public', express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false })) //convert link html to json

// true => sudah login
// false => belum login
const isLogin = true

const blogs = [
    {
        inputProject: "Pasar Coding di Indonesia Dinilai Masih Menjanjikan",
        inputDescription: "Ketimpangan sumber daya manusia (SDM) di sektor digital masih menjadi isu yang belum terpecahkan. Berdasarkan penelitian ManpowerGroup, ketimpangan SDM global, termasuk Indonesia, meningkat dua kali lipat dalam satu dekade terakhir. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, molestiae numquam! Deleniti maiores expedita eaque deserunt quaerat! Dicta, eligendi debitis?",
        author: "Ichsan Emrald Alamsyah",
        posted_at: "12 Jul 2021 22:30 WIB",
        durasi: "1 bulan",
        reactjs: "reactjs.jpeg",
    }
]

let month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
]

// Set endpoint
app.get('/', function (req, res) {
    res.send("index")
})


app.get('/home', function (req, res) {
    // console.log(blogs) // hanya ada 4 properti

    let dataBlogs = blogs.map(function (data) {
        return {
            ...data,
            isLogin: isLogin
        }
    })

    res.render('index' , { isLogin: isLogin, blogs: dataBlogs })
})


app.get('/blog', function (req, res) { 

    res.render('blog')
})

// app.get('/add-blog', function (req, res) {

//     if (!isLogin) {
//         res.redirect('/home')
//     }

//     res.render('form-blog')
// })

app.post('/blog', function (req, res) {
    let inputProject = req.body.inputProject ;
    let inputStart = req.body.inputStartDate;
    let inputEnd = req.body.inputEndDate;
    let inputDescription =req.body.inputDescription;
    let image = req.body.image;
    let nodejs = req.body.nodejs;
    let reactjs = req.body.reactjs;
    let textscript = req.body.textscript;
    let typescript = req.body.typescript;
    
    let date = new Date()

    let blog = {
        inputProject,
        durasi : durationTime(inputStart,inputEnd),
        inputDescription,
        image,
        author: "Ichsan Emrald Alamsyah",
        posted_at: getFullTime(date),
        nodejs,
        reactjs,
        textscript,
        typescript,

    }
    console.log('ljbfuiodfbdskfjbsdkjf',inputStart)
    blogs.push(blog)
    

    res.redirect('/home')
    // console.log(blogs);

})

app.get('/blog/:id', function (req, res) {
    let id = req.params.id

    res.render('blog-detail', { id: id })
})

app.get('/delete-blog/:index', function (req, res) {
    let index = req.params.index

    blogs.splice(index, 1)
    res.redirect('/home')
})

app.get('/update-project/:index', function (req, res) {
    let index = req.params.index
    index = blogs [index] 
    
    res.render("update-project")
})


app.get('/contact-me', function (req, res) {
    res.render('contact')

})

// Konfigurasi port aplikasi
const port = 5000
app.listen(port, function () {
    console.log(`Server running on port ${port}`);
})

function getFullTime(time) {
    let date = time.getDate()
    let monthIndex = time.getMonth()
    let year = time.getFullYear()

    let hours = time.getHours()
    let minutes = time.getMinutes()

    if (minutes < 10) {
        minutes = '0' + minutes
    }

    return `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`
}


// app.get('/form-blog', (req,res)=>{
//     res.render('form-blog')
//     })

//function
function durationTime(inputStart, inputEnd) {
    // Convert Start - End Date to Days
    let newStartDate = new Date(inputStart)
    let newEndDate = new Date(inputEnd)
    let duration = Math.abs(newStartDate - newEndDate)
    // console.log(newStartDate)
    let day = Math.floor(duration / (1000 * 60 * 60 * 24))
    
    if (day < 30) {
        return day + ` days `
    } else {
        let diffMonths = Math.ceil(duration / (1000 * 60 * 60 * 24 * 30));
        if (diffMonths >= 1) {
            return diffMonths + ` month `
        }

    }
};






