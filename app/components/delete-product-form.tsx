import { Form } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import type { Product } from "~/types/interfaces"

interface DeleteProductFormProps {
    product: Product
}

export default function DeleteProductForm({ product }: DeleteProductFormProps) {
    return (
        <Form
            method="post"
            onSubmit={(e) => {
                if (!confirm("Are you sure you want to delete this product?")) {
                    e.preventDefault()
                }
            }}
        >
            <input type="hidden" name="formAction" value="delete" />
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="oldImageUrl" value={product.imageUrl} />
            <Button type="submit" variant="destructive">
                Löschen
            </Button>
        </Form>
    )
}

