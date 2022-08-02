const router = require("express").Router();
const { Category, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const catData = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!catData) {
      res.status(404).json({ message: "No related id" });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  // create a new category
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const catData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(catData);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
