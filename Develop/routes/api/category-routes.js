const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:{
      model: Product,
      attributes: ['id','product_name','price','stock','category_id']
    }
  }).then(dbCatData=>{
    if(!dbCatData){
      res.status(404).json({message : 'There is no category to be found'})
      return;
    }
    res.json(dbCatData);
  }).catch(e =>{
    console.error(e);
    res.status(500).json(e)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id: req.params.id
    },
    include:{
      model: Product,
      attributes: ['id','product_name','price','stock','category_id']
    }    
  }).then(data=>{
    if(!data){
      res.status(404).json({message: "Required category is not found"})
    }
  }).catch(e =>{
    console.error(e);
    res.status(500).json(e)
  })
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
      if (!data){
        res.status(404).json({message: 'Required category is not founds'});
        return;
      }
      res.json(data);
    })
    .catch(e => {
      console.error(e);
      res.status(500).json(e);
    });
});
});

module.exports = router;
