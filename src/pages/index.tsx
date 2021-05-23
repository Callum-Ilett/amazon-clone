import { Banner, Header, ProductFeed, Seo } from "components";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";

interface Props {
  products: Products;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const data = await fetch("https://fakestoreapi.com/products");
  const products: Products = await data.json();

  return { props: { products, session } };
};

const Home = ({ products }: Props) => {
  return (
    <>
      <Seo title="Low Prices in Electronics, Books, Sports Equipment &amp; more" />
      <div className="bg-gray-100">
        <Header />

        <main className="max-w-screen-2xl mx-auto">
          <Banner />
          <ProductFeed products={products} />
        </main>
      </div>
    </>
  );
};

export default Home;
