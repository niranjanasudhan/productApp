const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:2701/ProductDb');
mongoose.connect('mongodb://localhost:27017/ProductDb', { useNewUrlParser: true, useUnifiedTopology: false });
const Schema = mongoose.Schema;
const NewProductSchema = new Schema({
    // _id: String,
    productId: Number,
    productName: String,
    productCode: String,
    releaseDate: String,
    description: String,
    price: Number,
    starRating: Number,
    imageUrl: String
});
var Productdata = mongoose.model('product', NewProductSchema);
module.exports = Productdata;