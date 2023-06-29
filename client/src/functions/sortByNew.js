//SORT ITEMS BY BRAND, ASSIGN NEW ITEMS TO THE FRONT OF ARRAY
const sortByBrand = (products) => {
  const isNew = [];
  const chairArray = [];

  const sortedChairs = products.map((item) => {
    if (item.isNew === true) {
      isNew.push(item);
    } else {
      chairArray.push(item);
    }
  });

  chairArray.sort((a, b) => {
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
  });

  isNew.sort((a, b) => {
    if (a.name > b.name) return -1;
    if (a.name < b.name) return 1;
  });

  isNew.map((item) => {
    chairArray.unshift(item);
  });

  const finalArray = chairArray;
  return finalArray;
};

export default sortByBrand;
