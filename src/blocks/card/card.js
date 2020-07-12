import React, { useState } from "react";
import ReactDOM from "react-dom";

// Вспомогательная функция, возвращает существительное с ожидаемым окончанием в зависимости от количества
function caseEnding(number_num, singular_str, singularGenitive_str, pluralGenitive_str) {
    number_num = Number(number_num);
    let caseEnding = ''
    if (number_num < 2) {
        caseEnding = singular_str;
    } else if (number_num < 5) {
        caseEnding = singularGenitive_str;
    } else if (number_num < 21) {
        caseEnding = pluralGenitive_str;
    } else if (
        String(number_num)[String(number_num).length - 1] === '1' && 
        String(number_num)[String(number_num).length - 2] + 
        String(number_num)[String(number_num).length - 1] != '11'
        ) {
        caseEnding = singular_str;
    } else if (
        String(number_num)[String(number_num).length - 1] === '2' && 
        String(number_num)[String(number_num).length - 2] + 
        String(number_num)[String(number_num).length - 1] != '12' || 
        String(number_num)[String(number_num).length - 1] === '3' && 
        String(number_num)[String(number_num).length - 2] + 
        String(number_num)[String(number_num).length - 1] != '13' || 
        String(number_num)[String(number_num).length - 1] === '4' && 
        String(number_num)[String(number_num).length - 2] + 
        String(number_num)[String(number_num).length - 1] != '14' 
        ) {
        caseEnding = singularGenitive_str;
    } else {
        caseEnding = pluralGenitive_str;
    }

    return caseEnding;
}

// Основная функция
export function Card(props) {
  // Хук
  const [boxState, setBoxState] = useState('default');

  // Обработчики
  function selectBox() {
    if (boxState === 'default') {
        setBoxState('selected');
    } else {
        setBoxState('default');   
    }
  }
  function hoverInBox() {
    if (boxState === 'selected') {
        setBoxState('hover')
    }
  }
  function hoverOutBox() {
    if (boxState === 'hover') {
        setBoxState('selected')
    }
  }

  // Элементы шаблона
  const cardTop = (<div className='card__top'><span>Сказочное заморское яство</span></div>)
  const cardTopHover = (<div className='card__top--hover'><span>Котэ не одобряет?</span></div>)
  const cardMain = (
    <div className='card__main'>
        <div className='card__title text'><span>Нямушка</span></div>
        <div className='card__type text'><span>{props.type}</span></div>
        <div className='card__description text'>
            <div className='card__portion'>
                <span><b>{props.portion}</b> {caseEnding(props.portion, 'порция','порции','порций')}</span>
            </div>
            <div className='card__mice'>
                {props.mice === '1'? 
                <span>мышь в подарок</span>: 
                <span><b>{props.mice}</b> {caseEnding(props.mice, 'мышь','мыши','мышей')} в подарок</span>}
            </div>
            {props.satisfied === 'true'?<div className='card__satisfied'><span>заказчик доволен</span></div>: null}
        </div>
        <div className='card__image'></div>
        <div className='card__size'>
            <div className='card__size-value'><span>{props.size}</span></div>
            <div className='card__size-unit'><span>кг</span></div>
        </div>
    </div>    
    )
  const cardBottomLabelDefault = (
    <div className='card__bottom-label'>Чего сидишь? Порадуй котэ, <span onClick={selectBox}>купи.</span></div>
    )
  var cardBottomLabelSelected = null;
  if (props.type === 'с фуа-гра') {
    cardBottomLabelSelected = (<div className='card__bottom-label'>Печень утки разварная с артишоками.</div>)
  } else if (props.type === 'с рыбой') {
    cardBottomLabelSelected = (<div className='card__bottom-label'>Головы щучьи с чесноком да свежайшая сёмгушка.</div>)
  } else if (props.type === 'c курой') {
    cardBottomLabelSelected = (<div className='card__bottom-label'>Филе из цыплят с трюфелями в бульоне.</div>)
  }
  const cardBottomLabelDisabled = (
    <div className='card__bottom-label--disabled'>Печалька, {props.type} закончился</div>
    )

  // Четыре основных шаблона
  const cardTempDefault = (
    <div className='card'>
        <div className='card__body' onClick={selectBox}>
            {cardTop}
            {cardMain}
        </div>
        {cardBottomLabelDefault}
    </div>
    )
  const cardTempSelected = (
    <div className='card--selected'>
        <div className='card__body' onClick={selectBox} onMouseEnter={hoverInBox}>
            {cardTop}
            {cardMain}
        </div>
        {cardBottomLabelSelected}
    </div>
    )
  const cardTempHover = (
    <div className='card--selected'>
        <div className='card__body' onClick={selectBox} onMouseLeave={hoverOutBox}>
            {cardTopHover}
            {cardMain}
        </div>
        {cardBottomLabelSelected}
    </div>
    )
  const cardTempDisabled = (
    <div className='card--disabled'>
        <div className='card__body'>
            {cardTop}
            {cardMain}
        </div>
        {cardBottomLabelDisabled}
    </div>
    )

  // Выбор шаблона в зависимости от контекста
  var cardTemp = null;
  if (props.availability === 'false') {
    cardTemp = cardTempDisabled
  }
  else if (boxState === 'default') {
    cardTemp = cardTempDefault
  } else if (boxState === 'selected') {
    cardTemp = cardTempSelected
  } else if (boxState === 'hover') {
    cardTemp = cardTempHover
  }
  
  return cardTemp;
};


// Примеры вызова функции:
// ReactDOM.render(<Card type='с фуа-гра' portion='10' mice='1' size='0,5' />, document.getElementById("root"));
// ReactDOM.render(<Card type='с рыбой' portion='40' mice='2' size='2' />, document.getElementById("shmoot"));
// ReactDOM.render(<Card type='c курой' portion='100' mice='5' size='5' satisfied='true' availability='false' />, document.getElementById("groot"));