import React from "react";

const ProductCard = React.memo(({ product }) => {
    return (
        <div
            style={{
                border: "",
                borderRadius: "8px",
            }}
            className="bg-[#2F2F2F] m-2.5 w-60 p-2.5   hover:bg-[#1B1B1B] shadow-2xs"
        >
            <img
                style={{ border: "solid" }}
                src={product.image}
                alt={product.title}
                className="rounded-lg w-[100%] h-[150px] object-contain"
            />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
        </div>
    );
});

export default ProductCard;
