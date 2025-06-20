'use client';

import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { initialCards, SWIPE_THRESHOLD } from '@/constants'
import { Card } from "@/types";

const HeroCardStack = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const bringCardToBack = (cardId: number) => {
    setCards(prevCards => {
      const draggedCard = prevCards.find(c => c.id === cardId);
      if (!draggedCard) return prevCards;
      const remainingCards = prevCards.filter(c => c.id !== cardId);
      return [...remainingCards, draggedCard];
    });
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    cardId: number
  ) => {
    if (Math.abs(info.offset.x) > SWIPE_THRESHOLD) {
      bringCardToBack(cardId);
    }
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[450px] flex justify-center items-center">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          onClick={() => bringCardToBack(card.id)}
          className="absolute w-full cursor-pointer"
          style={{
            width: '100%',
            maxWidth: '400px',
            top: `${index * 8}px`,
            left: `${index * 4}px`,
            zIndex: cards.length - index,
            borderRadius: '0.75rem',
            overflow: 'hidden',
            backgroundColor: '#2B2B2B',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
          }}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(event, info) => handleDragEnd(event, info, card.id)}
          whileTap={{ scale: 0.95 }}
          animate={{ rotate: index * 1.5 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <img
            src={card.src}
            alt={card.title}
            className="rounded-t-lg w-full object-cover pointer-events-none" 
          />
          <div className="bg-[#2B2B2B] p-4 rounded-b-lg">
            <h5 className="text-white text-lg font-semibold">{card.title}</h5>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCardStack;
