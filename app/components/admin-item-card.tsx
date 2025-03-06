import { Product } from "~/types/interfaces";
import {DollarSign, FileText, ImageIcon, Package2} from "lucide-react";
import React from "react";

export default function AdminItemCard({ item, url }: { item: Product; url: string }) {
    return (
        <div>
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                {item.imageUrl ? (
                    <img
                        src={`${url}/imgs/${item.imageUrl}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-16 h-16 text-gray-400" />
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="flex items-center text-emerald-600 font-semibold">
            <DollarSign className="w-4 h-4 mr-1" />
              {item.price.toFixed(2)}
          </span>
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{item.name}</h3>
                    <Package2 className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                </div>

                <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                </div>
            </div>
        </div>
    );
}
