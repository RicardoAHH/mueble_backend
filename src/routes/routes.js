export const routes = [
  { name: "Auth", path: "auth", is_protected: false },
  { name: "Users", path: "users", is_protected: true },
  { name: "Products", path: "products", is_protected: false },
  { name: "Categories", path: "categories", is_protected: false },
  { name: "Roles", path: "roles", is_protected: true },
  { name: "Quotes", path: "quotes", is_protected: false },
];
