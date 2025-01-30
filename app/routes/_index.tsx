import {json, LoaderFunction, MetaFunction, redirect} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {prisma} from "~/db.server";
import {Item} from "~/types/interfaces";
import ItemCard from "~/components/item-card";
import ItemCard2 from "~/components/item-card-2";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const featuredProducts = await prisma.item.findMany({
    where: {
      id: {
        lte: 3,
      },
    },
  });

  return json({featuredProducts});
}

export default function Index() {
  const { featuredProducts } = useLoaderData<typeof loader>();

  return (
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            <section className="bg-green-50 py-20">
              <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold mb-4">Frisches Gemüse jetzt bestellen!</h2>
                <p className="text-xl mb-8">Erkunde jetzt all unsere Produkte</p>
                <Link to="/shop" className="bg-green-600 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300">
                  Jetzt einkaufen
                </Link>
              </div>
            </section>

            <section className="py-16">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Meistgekaufte Produkte</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {featuredProducts.map((item: Item) => (
                      <ItemCard key={item.id} item={item}/>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-green-50 py-16">
              <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Warum sollten Sie uns wählen?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">

                    <h3 className="text-xl font-semibold mb-2">100% Organsisch</h3>
                    <p className="text-gray-600">Unser gesamtest Gemüse wird frei von Pestiziden und Chemikalien hergestellt</p>
                  </div>
                  <div className="text-center">

                    <h3 className="text-xl font-semibold mb-2">Schnelle Bereitschaft</h3>
                    <p className="text-gray-600">Wir versichern Ihnen eine schnelle Bereitstellung ihrer Bestellung</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">Eco-freundliche Verpackung</h3>
                    <p className="text-gray-600">Unsere Verpackungen sind zu 100% eco-freundlich</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
  );
}
