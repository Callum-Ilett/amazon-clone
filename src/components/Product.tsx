import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";
import { useAppDispatch } from "lib/hooks";
import { addToBasket } from "lib/redux/slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;

const Product = (props: Product) => {
  const dispatch = useAppDispatch();

  const { id, title, price, description, category, image } = props;

  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const [isPrime] = useState(Math.random() < 0.5);

  const addItemToBasket: MouseEventHandler<HTMLButtonElement> = () => {
    const product = { ...props, isPrime, rating };

    dispatch(addToBasket(product));
  };

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain" />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array.from({ length: rating }, (_, i) => i + 1).map((num) => (
          <StarIcon
            className="h-5 text-yellow-500"
            key={`${id}-rating(${num})`}
          />
        ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <div className="mb-5">
        <Currency quantity={price} currency="GBP" />
      </div>

      {isPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img className="w-12" src="/images/prime-tag.png" alt="" />
          <p className="text-xs text-gray-500">Free Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button" onClick={addItemToBasket}>
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
