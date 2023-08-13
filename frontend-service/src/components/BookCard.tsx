import React from 'react';
import { Book } from '../@types';

interface BookCardProps extends Book {}

const BookCard = ({ coverImageUrl: coverImage, discountRate, price, title }: BookCardProps) => {
  return (
    <div className="w-[187px] flex-grow max-w-[378px] cursor-pointer hover:bg-slate-100">
      <img src={coverImage} alt={title} className="object-cover w-full aspect-square" />
      <div className="flex flex-col gap-1 p-1 w-full">
        <h3 className="">{title}</h3>
        <p className="flex items-center justify-between">
          <span className="font-bold text-red-500">{discountRate}%</span>
          <span className="flex items-center gap-1">
            <span className="font-bold">{price.toLocaleString()}</span>원
          </span>
        </p>
      </div>
    </div>
  );
};

export default BookCard;
