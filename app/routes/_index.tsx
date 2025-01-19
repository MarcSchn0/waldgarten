import {LoaderFunction, MetaFunction, redirect} from "@remix-run/node";
import {Link} from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
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
                  {featuredProducts.map((product) => (
                      <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
                        <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
                        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                      </div>
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

const featuredProducts = [
  {
    id: 1,
    name: "Organic Carrots",
    description: "Sweet and crunchy carrots, perfect for snacking or cooking",
    price: 2.99,
    image: "http://localhost:5173/tomato-image.jpg??height=200&width=300",
  },
  {
    id: 2,
    name: "Fresh Spinach",
    description: "Nutrient-packed spinach leaves, great for salads and smoothies",
    price: 3.49,
    image: "http://localhost:5173/tomato-image.jpg??height=200&width=300",
  },
  {
    id: 3,
    name: "Ripe Tomatoes",
    description: "Juicy, flavorful tomatoes, ideal for sandwiches and sauces",
    price: 4.99,
    image: "http://localhost:5173/tomato-image.jpg??height=200&width=300",
  },
];
