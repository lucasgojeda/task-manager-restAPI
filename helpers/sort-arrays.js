const sortArray = (array, orderBy, filterBy) => {
  let filteredProducts = [];

  // console.log('filterBy: ', filterBy);
  // console.log('filterBy: ', array[0][filterBy]);
  // console.log('Number: ', (typeof array[0][filterBy] === 'number' ? 'true' : 'false'));
  // console.log('String: ', (typeof array[0][filterBy] === 'string' ? 'true' : 'false'));

  // Filtrado de numeros
  if (typeof array[0][filterBy] === "number") {
    if (orderBy === "asc") {
      filteredProducts = [...array].sort((a, b) => a[filterBy] - b[filterBy]);
    } else {
      filteredProducts = [...array].sort((a, b) => b[filterBy] - a[filterBy]);
    }
  }

  // Filtrado de strings
  if (typeof array[0][filterBy] === "string") {
    if (orderBy === "asc") {
      filteredProducts = [...array].sort((a, b) =>
        a[filterBy]
          .toLocaleLowerCase()
          .localeCompare(b[filterBy].toLocaleLowerCase())
      );
    } else {
      filteredProducts = [...array].sort((a, b) =>
        b[filterBy]
          .toLocaleLowerCase()
          .localeCompare(a[filterBy].toLocaleLowerCase())
      );
    }
  }

  // Filtrado de objetos (debemos acceder al valor dentro del mismo que se utilizará para el filtrado)
  if (typeof array[0][filterBy] === "object") {
    if (filterBy === "category" || filterBy === "user") {
      if (orderBy === "asc") {
        filteredProducts = [...array].sort((a, b) =>
          a[filterBy]?.name
            .toLocaleLowerCase()
            .localeCompare(b[filterBy]?.name.toLocaleLowerCase())
        );
      } else {
        filteredProducts = [...array].sort((a, b) =>
          b[filterBy]?.name
            .toLocaleLowerCase()
            .localeCompare(a[filterBy]?.name.toLocaleLowerCase())
        );
      }
    }
  }

  // Filtrado de fechas
  if (
    filterBy === "date" ||
    filterBy === "date_requested" ||
    filterBy === "date_sended"
  ) {
    if (orderBy === "asc") {
      filteredProducts = [...array].sort((a, b) => a[filterBy] - b[filterBy]);
    } else {
      filteredProducts = [...array].sort((a, b) => b[filterBy] - a[filterBy]);
    }
  }

  return filteredProducts;
};

module.exports = {
  sortArray,
};
