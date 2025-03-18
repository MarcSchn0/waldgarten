import {json, LoaderFunction, MetaFunction, redirect} from "@remix-run/node";
import {Link, useLoaderData} from "@remix-run/react";
import {prisma} from "~/db.server";
import {Product} from "~/types/interfaces";
import ItemCard from "~/components/item-card";
import ItemCard2 from "~/components/item-card-2";
import {Leaf, PackageCheck, Truck} from "lucide-react";


export const meta: MetaFunction = () => {
  return [
    { title: "Hauptseite" },
    { name: "Welcome Page", content: "Willkomen bei Waldgarten!" },
  ];
};

export const loader: LoaderFunction = async ({ params }) => {
  const featuredProducts = await prisma.item.findMany({
    where: {
      id: {
        lte: 4,
      },
    },
  });

  const hostUrl = process.env.PUBLIC_HOST_URL;

  return json({featuredProducts, hostUrl});
}

export default function Index() {
  const { featuredProducts, hostUrl } = useLoaderData<typeof loader>();

  return (
      <div className="min-h-screen flex flex-col bg-white">
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-green-800 to-green-900 py-24">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl font-bold mb-6 text-white">Frische BIO-Jungpflanzen jetzt bestellen!</h2>
              <p className="text-xl mb-10 text-green-100">Entdecken Sie unsere sorgfältig gezüchteten Jungpflanzen für
                Ihren Garten</p>
              <Link to="/shop"
                  className="bg-white text-green-800 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition duration-300 shadow-lg">
                Jetzt einkaufen
              </Link>
            </div>
          </section>

          {/* Price List Section */}
          <section className="py-20 bg-green-50">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6 text-green-900">Jungpflanzenliste</h2>
              <p className="text-lg mb-10 text-green-700">Durchstöbern Sie unser vielfältiges Angebot an
                Jungpflanzen</p>
              <Link to="/preisliste"
                  className="bg-green-800 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition duration-300 shadow-lg">
                Preisliste ansehen
              </Link>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-4xl font-bold mb-16 text-center text-green-900">Warum Sie uns wählen sollten</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center p-6 rounded-xl hover:shadow-xl transition duration-300">
                  <div className="flex justify-center mb-6">
                    <Leaf className="w-12 h-12 text-green-700"/>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">100% Organisch</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unsere Jungpflanzen werden nachhaltig und ohne Pestizide oder schädliche Chemikalien gezüchtet
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl hover:shadow-xl transition duration-300">
                  <div className="flex justify-center mb-6">
                    <Truck className="w-12 h-12 text-green-700"/>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">Schnelle Bereitschaft</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Wir garantieren eine zügige Bearbeitung und Bereitstellung Ihrer Bestellung
                  </p>
                </div>

                <div className="text-center p-6 rounded-xl hover:shadow-xl transition duration-300">
                  <div className="flex justify-center mb-6">
                    <PackageCheck className="w-12 h-12 text-green-700"/>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-green-800">Öko-Verpackung</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Wir verwenden ausschließlich umweltfreundliche und recycelbare Verpackungsmaterialien
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Image Banner Section */}
          <section className="relative h-96 bg-cover bg-center bg-no-repeat"
                   style={{backgroundImage: 'url("https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")'}}>
            <div className="absolute inset-0 bg-green-900/60"></div>
            <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-6">Naturverbunden und Nachhaltig</h2>
                <p className="text-xl text-green-50">Für eine grünere Zukunft - Pflanze für Pflanze</p>
              </div>
            </div>
          </section>
        </main>
      </div>
  );
}
