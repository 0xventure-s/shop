import { prisma } from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-country";

async function main() {
  //1. Borrar registros previos
  await prisma.country.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries,
  });

  const categoriesData = categories.map((category) => ({
    name: category,
  }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>); // 1S. Label, 2S. CategoryID

  //Productos

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Images
    const imagesData = images.map((image) => ({
      url: image,
      productImage: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

(() => {
  main();
})();
