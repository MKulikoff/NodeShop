const {Router} = require('express')
const router = Router() 

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Node Shop',
        isHome: true
    })
})

module.exports = router