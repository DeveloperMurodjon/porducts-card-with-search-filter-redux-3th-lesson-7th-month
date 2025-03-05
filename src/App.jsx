import React, { useEffect, useMemo } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store/store";
import { fetchProducts } from "./store/productSlice";
import ProductCard from "./components/ProductCard";
import useGetInputValues from "./hooks/useGetInputValues";
import useDebounce from "./hooks/useDebounce";

function ProductsPage() {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const { values, handleChange } = useGetInputValues({ search: "" });
  const debouncedSearch = useDebounce(values.search, 500);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = useMemo(() => {
    if (!debouncedSearch) return products;
    return products.filter((product) =>
      product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [products, debouncedSearch]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="mb-4">Products</h1>
      <input
        type="text"
        name="search"
        placeholder="Search products..."
        value={values.search}
        onChange={handleChange}
        className="border  border-gray-500 p-2 w-[300px] mb-5 rounded-sm bg-[#171A20] "
      />
      {status === "loading" && <p>Loading products...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ProductsPage />
    </Provider>
  );
}

export default App;
