import { useSelector } from "react-redux";
import CategoryPreview from "../../components/category-preview/category-preview.component";

export default function CategoriesPreview() {
  const categoriesMap = useSelector((state) => state.categories.categoriesMap);

  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
}
