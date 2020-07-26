
const productsModel = require('../models/products');					
const { check, validationResult } = require('express-validator');

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		productsModel.findById(req.params.productId, function(err, productInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Product found!!!", data:{products: productInfo}});
			}
		});
	},

	getAll: function(req, res, next) {
		let productList = [];

		productsModel.find({}, function(err, products){
			if (err){
				next(err);
			} else{
				for (let p of products) {
					productList.push(p);
				}
				res.json({status:"success", message: "Products list found!!!", data:{products: productList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ status:"error",errors: errors.array() });
		}
		// console.log("updateById: "+JSON.stringify(req.param,null,2));
	
		productsModel.update({"_id":req.params.productId},
			{				
				$set: {
				  "title": req.body.title,
				  "price": req.body.price,
				  "description": req.body.description,
				  "imagePath": req.body.imagePath,				  
				  "categoryid":req.body.categoryid,				  
				  "available_size": req.body.available_size,
				  "available_colors": req.body.available_colors,
				  "unitsInStock": req.body.unitsInStock,
				  "setminorder":req.body.setminorder,
				  "product_available": req.body.product_available,
				  "updatedon":Date()
				}
			  }, function(err, productInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success",
				 message: "Product updated successfully!!!",
				productInfo:productInfo});
			}
		});
	},

	deleteById: function(req, res, next) {
		productsModel.findByIdAndRemove(req.params.productId, function(err, productInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Product deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ status:"error",errors: errors.array() });
		}

		var pObj=new productsModel();
		pObj.title=req.body.title?req.body.title:'';
		pObj.brand=req.body.brand?req.body.brand:'';
		pObj.imagePath=req.body.imagePath?req.body.imagePath:'';
		pObj.description=req.body.description?req.body.description:'';
		pObj.price=req.body.price?req.body.price:'';
		pObj.price_mrp=req.body.price_mrp?req.body.price_mrp:'';		
		pObj.categoryid=req.body.categoryid?req.body.categoryid:'';
		pObj.available_size=req.body.available_size?req.body.available_size:'';
		pObj.available_colors=req.body.available_colors?req.body.available_colors:'';
		pObj.unitsInStock=req.body.unitsInStock?req.body.unitsInStock:'';
		pObj.setminorder=req.body.setminorder?req.body.setminorder:'';
		pObj.product_available=req.body.product_available?req.body.product_available:false;
		pObj.createdon=new Date();
      
		productsModel.findOne({'title':pObj.title},function(err,product){
			if(err){				
				next(err);
			}
			if(product){				
				return res.status(500).json({status:"error"
				, message: "Already product exists with same name",title:pObj.title
				});									
			}
		
			productsModel.create(pObj, function (err, result) {
					if (err) 
						next(err);
					else
						res.json({status: "success", message: "Product added successfully!!!", data: null});
					
					});
		});
	},

}					