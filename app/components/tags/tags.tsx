import { Link } from "react-router";

export { default as styles } from "./tags.css?url";

export function Tags({
  tags,
  highlighted = null,
  hideAllTag = false,
}: {
  tags: string[];
  highlighted?: string | null;
  hideAllTag?: boolean;
}) {
  if (!tags.length) return null;

  return (
    <ul className="tags">
      {!hideAllTag && (
        <li>
          <Link to="/recipes" className={highlighted === "All" ? "active" : ""}>
            All
          </Link>
        </li>
      )}
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            to={`/recipes?tag=${tag}`}
            className={highlighted === tag ? "active" : ""}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
