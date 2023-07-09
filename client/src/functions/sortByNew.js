//ASSIGNS NEW ITEMS TO THE FRONT OF ARRAY
const sortByBrand = (products) => {

  const isNew = [];
  const chairArray = [];

  products.forEach((item) => {
    if (item.productIsNew === true) {
      isNew.push(item);
    } else {
      chairArray.push(item);
    }
  });

  chairArray.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
  });

  isNew.sort((a, b) => {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
    return 0;
  });

  isNew.forEach((item) => {
    chairArray.unshift(item);
  });

  const finalArray = chairArray;
  return finalArray;
};

export default sortByBrand;
