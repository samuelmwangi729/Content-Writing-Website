//set the title variable to global
//change the value later
let title = ''
//the index page 
const Index = (req,res)=>{
    title='HomePage'
    res.render('Index.ejs',{title:title})
}

module.exports = {Index}