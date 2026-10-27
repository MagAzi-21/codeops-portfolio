"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import DishDetailModal from "./DishDetailModal";
import { etb } from "@/lib/format";

export default function DishCard({ dish }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition">
        <div className="relative w-full h-44 bg-slate-100">
          <Image
            src={dish.imageUrl}
            alt={dish.altText || `Photograph of ${dish.name}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-1">
              {/* Keyboard-accessible semantic link */}
              <Link
                href={`/menu/${dish.id}`}
                className="font-bold text-slate-900 text-base hover:text-amber-700"
              >
                {dish.name}
              </Link>
              {dish.spicy && (
                <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  Spicy
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mb-1">{dish.category}</p>
            <p className="text-xs text-slate-600 line-clamp-2 mb-4">{dish.description}</p>
          </div>

          <div className="flex justify-between items-center border-t pt-3">
            <span className="text-amber-700 font-extrabold text-sm">{etb.format(dish.price)}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="touch-target px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-700"
              >
                Details
              </button>
              <AddToCartButton dish={dish} />
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <DishDetailModal dish={dish} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}