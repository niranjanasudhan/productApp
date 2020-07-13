export class ProductModel{
    constructor(
        public productId:number,
        public productName:String,
        public productCode:String,
        public releaseDate:String,
        public description:String,
        public price:number,
        public starRating:number,
        public imageUrl:String
    ){}
}