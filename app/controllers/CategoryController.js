const BaseController = require("./BaseController");

class CategoryController extends BaseController{
    constructor(){
        super("Category")
    }
}
module.exports = new CategoryController();