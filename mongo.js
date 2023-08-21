db.productquery.insertMany([
  {
    id: "1",
    product_name: "Intelligent Fresh Chips",
    product_price: 655.0,
    product_material: "Concrete",
    product_color: "mint green",
  },
  {
    id: "2",
    product_name: "Practical Fresh Sausages",
    product_price: 911.0,
    product_material: "Cotton",
    product_color: "indigo",
  },
  {
    id: "3",
    product_name: "Refined Steel Car",
    product_price: 690.0,
    product_material: "Rubber",
    product_color: "gold",
  },
  {
    id: "4",
    product_name: "Gorgeous Plastic Pants",
    product_price: 492.0,
    product_material: "Soft",
    product_color: "plum",
  },
  {
    id: "5",
    product_name: "Sleek Cotton Chair",
    product_price: 33.0,
    product_material: "Fresh",
    product_color: "black",
  },
  {
    id: "6",
    product_name: "Awesome Wooden Towels",
    product_price: 474.0,
    product_material: "Plastic",
    product_color: "orange",
  },
  {
    id: "7",
    product_name: "Practical Soft Shoes",
    product_price: 500.0,
    product_material: "Rubber",
    product_color: "pink",
  },
  {
    id: "8",
    product_name: "Incredible Steel Hat",
    product_price: 78.0,
    product_material: "Rubber",
    product_color: "violet",
  },
  {
    id: "9",
    product_name: "Awesome Wooden Ball",
    product_price: 28.0,
    product_material: "Soft",
    product_color: "azure",
  },
  {
    id: "10",
    product_name: "Generic Wooden Pizza",
    product_price: 84.0,
    product_material: "Frozen",
    product_color: "indigo",
  },
  {
    id: "11",
    product_name: "Unbranded Wooden Cheese",
    product_price: 26.0,
    product_material: "Soft",
    product_color: "black",
  },
  {
    id: "12",
    product_name: "Unbranded Plastic Salad",
    product_price: 89.0,
    product_material: "Wooden",
    product_color: "pink",
  },
  {
    id: "13",
    product_name: "Gorgeous Cotton Keyboard",
    product_price: 37.0,
    product_material: "Concrete",
    product_color: "sky blue",
  },
  {
    id: "14",
    product_name: "Incredible Steel Shirt",
    product_price: 54.0,
    product_material: "Metal",
    product_color: "white",
  },
  {
    id: "15",
    product_name: "Ergonomic Cotton Hat",
    product_price: 43.0,
    product_material: "Rubber",
    product_color: "mint green",
  },
  {
    id: "16",
    product_name: "Small Soft Chair",
    product_price: 47.0,
    product_material: "Cotton",
    product_color: "teal",
  },
  {
    id: "17",
    product_name: "Incredible Metal Car",
    product_price: 36.0,
    product_material: "Fresh",
    product_color: "indigo",
  },
  {
    id: "18",
    product_name: "Licensed Plastic Bacon",
    product_price: 88.0,
    product_material: "Steel",
    product_color: "yellow",
  },
  {
    id: "19",
    product_name: "Intelligent Cotton Chips",
    product_price: 46.0,
    product_material: "Soft",
    product_color: "azure",
  },
  {
    id: "20",
    product_name: "Handcrafted Wooden Bacon",
    product_price: 36.0,
    product_material: "Concrete",
    product_color: "lime",
  },
  {
    id: "21",
    product_name: "Unbranded Granite Chicken",
    product_price: 90.0,
    product_material: "Metal",
    product_color: "gold",
  },
  {
    id: "22",
    product_name: "Ergonomic Soft Hat",
    product_price: 99.0,
    product_material: "Rubber",
    product_color: "black",
  },
  {
    id: "23",
    product_name: "Intelligent Steel Pizza",
    product_price: 95.0,
    product_material: "Cotton",
    product_color: "azure",
  },
  {
    id: "24",
    product_name: "Tasty Rubber Cheese",
    product_price: 47.0,
    product_material: "Frozen",
    product_color: "orchid",
  },
  {
    id: "25",
    product_name: "Licensed Steel Car",
    product_price: 20.0,
    product_material: "Cotton",
    product_color: "indigo",
  },
]);

db.productquery.find().toArray();

db.productquery.find({ product_price: { $gte: 400, $lte: 800 } });

db.productquery.find({ product_price: { $not: { $gte: 400, $lte: 800 } } });

db.productquery.find({ product_price: { $gte: 400 } }).limit(4);

db.productquery.find({ product_name });

db.productquery.find().forEach(function (prod) {
  print(prod.product_name, prod.product_material);
});

db.productquery.find({ id: "10" });
db.productquery.find({ id: "10" }, { product_name: 1, product_material: 1 });

db.productquery.aggregate([{ $match: { product_material: "Soft" } }]);

db.productquery.find({
  $or: [{ product_color: "indigo" }, { product_price: 492 }],
});
db.collectionName
  .aggregate(
    [
      {
        $group: {
          _id: "$product_price",
          dups: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ],
    { allowDiskUse: true }
  )
  .forEach(function (doc) {
    doc.dups.shift();
    db.collectionName.remove({ _id: { $in: doc.dups } });
  });
db.productquery
  .aggregate(
    [
      { $sort: { product_price: 1 } },
      {
        $group: {
          _id: "$product_price",
          dups: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      { $match: { count: { $gt: 1 } } },
    ],
    { allowDiskUse: true }
  )
  .forEach(function (doc) {
    doc.dups.shift();
    db.productquery.remove({ _id: { $in: doc.dups } });
  });

db.productquery.aggregate([
  {
    $group: {
      _id: { product_price: "$product_price" },
      duplicates: { $push: "$_id" },
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $delete: {
      ids: { $slice: ["$duplicates", 1] },
    },
  },
]);

db.productquery.aggregate([
  {
    $group: {
      _id: { product_price: "$product_price" },
      duplicates: { $push: "$_id" },
      count: { $sum: 1 },
    },
  },
  {
    $sort: { count: -1 },
  },
  {
    $delete: {
      ids: { $slice: ["$duplicates", 1] },
    },
  },
]);
var duplicates = db.productquery.aggregate([
  {
    $group: {
      _id: { product_price: "$product_price" },
      duplicates: { $addToSet: "$_id" },
      count: { $sum: 1 },
    },
  },
  {
    $match: {
      count: { $gt: 1 },
    },
  },
]);
var distinctValues = duplicates.map(function (duplicate) {
  return duplicate._id;
});
db.productquery.remove({
  $or: distinctValues.map(function (distinct) {
    return {
      product_price: distinct.product_price,
    };
  }),
});

var distinctValues = db.productquery.distinct("product_price");
distinctValues.forEach(function (value) {
  var duplicates = db.productquery.find({ product_price: value }).skip(1);
  duplicates.forEach(function (duplicate) {
    db.productquery.deleteOne({ _id: duplicate._id });
  });
});
var duplicates = db.productquery.aggregate([
  {
    $group: {
      _id: { product_price: "$product_price" },
      duplicates: { $addToSet: "$_id" },
      count: { $sum: 1 },
    },
  },
  {
    $match: {
      count: { $gt: 1 },
    },
  },
]);

var duplicateIds = duplicates.reduce(function (acc, duplicate) {
  return acc.concat(duplicate.duplicates.slice(1));
}, []);

db.productquery.deleteMany({ _id: { $in: duplicateIds } });
