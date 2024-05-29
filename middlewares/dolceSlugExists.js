const posts = require("../db/posts.json");

module.exports = (req, res, next) => {
    const { slug } = req.params;
    const slugPost = posts.find(d => d.slug == slug);
    if (!slugPost) {
        return res.status(404).send("Il dolce non è stato trovato")
    }
    req.postDelete = slugPost;
    next();
}