import {prisma} from "~/db.server";
import {Product} from "~/types/interfaces";

export async function getProducts() {
    return prisma.item.findMany();
}

export async function getProductById(id: number) {
    return prisma.item.findUnique({ where: { id } });
}

export async function updateProduct(id: number, product: Partial<Product>) {
    await prisma.item.update({
        where: { id: id },
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            ...(product.imageUrl !== null && { imageUrl: product.imageUrl })
        }
    })
}

export async function deleteProduct(id: number) {
    await prisma.item.delete({ where: { id: id } });
}

export async function createProduct(product: Partial<Product>) {
    if(product.imageUrl === null || product.imageUrl === undefined || product.name === undefined || product.description === undefined || product.price === undefined) {
        return false;
    }

    await prisma.item.create({
        data: {
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl,
        }
    })
}