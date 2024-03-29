import { useNavigate } from "react-router-dom";
import "./category-item.styles.jsx";
import {
  Body,
  DirectoryItemContainer,
  BackgroundImage,
} from "./category-item.styles.jsx";

export default function CategoryItem({ category: { title, imageUrl, route } }) {
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
