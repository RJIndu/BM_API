
const categoriesModel = require('../models/categories');					
const { check, validationResult } = require('express-validator');
const productsModel = require('../models/products');	

module.exports = {
	getById: function(req, res, next) {
		console.log(req.body);
		categoriesModel.findById(req.params.categoryId, function(err, categoryInfo){
			if (err) {
				next(err);
			} else {
				res.json({status:"success", message: "Category found!!!", data:{categories: categoryInfo}});
			}
		});
	},

	
	getAll: function(req, res, next) {
		let categoryList = [];

		// categoriesModel.find({"level":1}).populate("_products");
		categoriesModel.find({}, function(err, categories){
			if (err){
				next(err);
			} else{
				for (let c of categories) {
					
					categoryList.push(c);
				}
				res.json({status:"success", message: "Categorys list found!!!", data:{categories: categoryList}});
							
			}

		});
	},

	updateById: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ status:"error",errors: errors.array() });
		}
		// console.log("updateById: "+JSON.stringify(req.param,null,2));
	
		categoriesModel.update({"_id":req.params.categoryId},
			{				
				$set: {
				  "name": req.body.name,
				  "active": req.body.active,
				  "parentid": req.body.parentid,
                  "productid": req.body.productid,
                  "level": req.body.level,
				  "updatedon":Date()
				}
			  }, function(err, categoryInfo){

			if(err)
				next(err);
			else {
				res.json({status:"success",
				 message: "Category updated successfully!!!",
				categoryInfo:categoryInfo});
			}
		});
	},

	deleteById: function(req, res, next) {
		categoriesModel.findByIdAndRemove(req.params.categoryId, function(err, categoryInfo){
			if(err)
				next(err);
			else {
				res.json({status:"success", message: "Category deleted successfully!!!", data:null});
			}
		});
	},

	create: function(req, res, next) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ status:"error",errors: errors.array() });
		}

		var cObj=new categoriesModel();
        cObj.name=req.body.name?req.body.name:'';
        cObj.level=req.body.level?req.body.level:0;
        cObj.productid=req.body.productid?req.body.productid:'';
        cObj.parentid=req.body.parentid?req.body.parentid:'';
		cObj.active=req.body.active?req.body.active:false;
		cObj.createdon=new Date();
      
		categoriesModel.findOne({'name':cObj.name},function(err,category){
			if(err){				
				next(err);
			}
			if(category){				
				return res.status(500).json({status:"error"
				, message: "Already category exists with same name",name:cObj.name
				});									
			}
		
			categoriesModel.create(cObj, function (err, result) {
					if (err) 
						next(err);
					else
						res.json({status: "success", message: "Category added successfully!!!", data: null});
					
					});
		});
	},

}					