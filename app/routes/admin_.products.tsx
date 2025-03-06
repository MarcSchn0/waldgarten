import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs, type ActionFunctionArgs, redirect } from "@remix-run/node"
import { getUser } from "~/utils/auth.server"
import { getProducts, createProduct, deleteProduct, updateProduct } from "~/utils/admin.server"
import type { Product } from "~/types/interfaces"
import AdminItemCard from "~/components/admin-item-card"
import CreateProductForm from "~/components/create-product-form"
import UpdateProductForm from "~/components/update-product-form"
import DeleteProductForm from "~/components/delete-product-form"
import { uploadProductImage, deleteProductImage } from "~/utils/image.server"
import {useState} from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const user = await getUser(request)
    if (user === undefined || !user || user.role !== "Admin") {
        return redirect("/")
    }

    const products = await getProducts()
    const hostUrl = process.env.PUBLIC_HOST_URL

    return json({ products, hostUrl })
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData()
    const formAction = formData.get("formAction")

    if (formAction === "create") {
        return await createProductHandler(formData)
    } else if (formAction === "update") {
        return await updateProductHandler(formData)
    } else if (formAction === "delete") {
        return await deleteProductHandler(formData)
    }

    return json({ error: "Invalid action" }, { status: 400 })
}

const createProductHandler = async (formData: FormData) => {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const fullImage = formData.get("fullImage")

    let imageUrl = undefined
    if (fullImage && fullImage instanceof File) {
        imageUrl = await uploadProductImage(fullImage)
    }

    const newProduct = {
        name,
        description,
        price,
        imageUrl,
    }

    await createProduct(newProduct)

    return redirect("/admin/products")
}

const updateProductHandler = async (formData: FormData) => {
    const productId = formData.get("productId") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const fullImage = formData.get("fullImage")
    let imageUrl = undefined

    if (fullImage && fullImage instanceof File) {
        imageUrl = await uploadProductImage(fullImage)
    }

    if (imageUrl !== undefined) {
        const oldImageUrl = formData.get("oldImageUrl") as string
        if (oldImageUrl) {
            deleteProductImage(oldImageUrl)
        }
    }

    await updateProduct(Number.parseInt(productId), { name, description, price, imageUrl })

    return redirect("/admin/products")
}

const deleteProductHandler = async (formData: FormData) => {
    const productId = formData.get("productId") as string
    const oldImageUrl = formData.get("oldImageUrl") as string

    if (oldImageUrl) {
        deleteProductImage(oldImageUrl)
    }

    await deleteProduct(Number.parseInt(productId))

    return redirect("/admin/products")
}

export default function AdminProducts() {
    const { products, hostUrl } = useLoaderData<{
        products: Product[]
        hostUrl: string
    }>()
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Products</h1>


            <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
                Add Product
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
                             key={product.id}>
                            <AdminItemCard item={product} url={hostUrl}/>
                            <div className="mt-4 flex gap-2">
                                <UpdateProductForm product={product} hostUrl={hostUrl}/>
                                <DeleteProductForm product={product}/>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products available.</p>
                )}
            </div>

            <CreateProductForm isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

