import { StarIcon } from "@heroicons/react/solid";
import { useAppDispatch } from "lib/hooks";
import { removeFromBasket } from "lib/redux/slices/basketSlice";
import Image from "next/image";
import { MouseEventHandler } from "react";
import Currency from "react-currency-formatter";

const CheckoutProduct = (props: Product) => {
  const { id, title, rating, isPrime, price, description, image } = props;

  const dispatch = useAppDispatch();

  const removeItem: MouseEventHandler<HTMLParagraphElement> = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>

        <div className="flex">
          {Array.from({ length: rating }, (_, i) => i + 1).map((num) => (
            <StarIcon
              className="h-5 text-yellow-500"
              key={`${id}-rating(${num})`}
            />
          ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="GBP" />

        {isPrime && (
          <div className="flex items-center space-x-2">
            <img
              className="w-12"
              src="/images/prime-tag.png"
              alt="Prime Item"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <p
            className="text-purple-400 text-xs border-r pr-4 cursor-pointer"
            onClick={removeItem}
          >
            Delete
          </p>
          <p className="text-purple-400 text-xs cursor-pointer">
            Save for later
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
