import React, {  useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  selectproduct,
  setproducts,
} from "../../features/products/productsSLice";

const Deposit = () => {
  // create a state for all products
  // const [products, setProducts] = useState({});
  const dispatch = useDispatch();

  // use useEffect to get the products list from the server if error show error to user
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let result = await axios.post(
          `${process.env.REACT_APP_SERVER}/products`,
          {},
          {
            withCredentials: true,
          }
        );
        // set the products to state
        // console.log(result.data);
        dispatch(setproducts(result.data));
        // setProducts(result.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchdata();
  }, [dispatch]);
  const { products } = useSelector((state) => state.products);
  // console.log(productslist);

  // since products is an object use object keys to get length -done
  // Use map to loop through every key as price is set -done
  // onclick Buy token payment state should be set to current loop name-done

  return (
    <>
      <section className="">
        <article className=" h-full flex flex-wrap justify-evenly  w-full pt-8 gap-4">
          {Object.keys(products).map((productname, index) => {
            return (
              <div
                className="border border-gray-300 w-64 h-64 rounded flex flex-col mb-4 "
                key={index}
              >
                <div className=" text-6xl text-center bg-yellow-300">MTOG</div>
                <div className="h-32 relative p-4 flex-grow">
                  <div>
                    Price:{(products[productname].price / 100).toLocaleString()}{" "}
                    KShs
                  </div>
                  <div>
                    Amount:
                    {(products[productname].price / 100).toLocaleString()}{" "}
                    Tokens
                  </div>
                  <div className="absolute bottom-5 right-5 ">
                    <button
                      className="bg-yellow-400 p-2 rounded-md  focus:outline-black"
                      onClick={() => {
                        dispatch(
                          selectproduct({
                            name: products[productname].name,
                            price: products[productname].price / 100,
                          })
                        );
                      }}
                    >
                      Buy Tokens
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </article>
      </section>
    </>
  );
};

export default Deposit;
