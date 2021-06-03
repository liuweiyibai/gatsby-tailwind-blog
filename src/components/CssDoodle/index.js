import React from 'react';

const rule = `
  :doodle { 
    @grid: 1x35 / 100% 100px; 
  } 
  @keyframes slide-in { 
    0% { transform: translateY(-100%); } 
    100% { transform: traslateY(0); } 
  } 
  :hover { opacity: 1; } 
  transition: opacity .2s ease-out; 
  animation: slide-in .25s ease-out; 
  opacity: @pick(0.05, 0.1, 0.2, 0.3, 0.4); 
  background: @pick(#EFBB35, #dfa612, #FAE042, #008f68, #6DB65B, #4AAE9B); 
  height: @rand(15%, 100%); 
  margin: 0 .2rem; `;

export default () => <css-doodle click-to-update>{rule}</css-doodle>;
