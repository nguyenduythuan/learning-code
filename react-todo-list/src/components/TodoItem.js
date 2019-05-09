import React from 'react';
import classNames from 'classnames';
import propTypes from 'prop-types';

import './TodoItem.css';
import CheckComplate from '../image/CheckComplate.svg';
import CheckImg from '../image/CheckImg.svg';
import Clear from '../image/clear.svg';

class TodoItem extends React.Component {
    render () {
        const { item, onClick, onClickDelete} = this.props;
        let url = CheckImg;
        if(item.isComplate){
            url = CheckComplate;
        }
        return (
            <div>
                <li className = { 
                classNames('TodoItem', 
                {'TodoItem-Complate': item.isComplate}) } >
                <img src={url} onClick={ onClick}  alt="check item"></img>
                <p>{ item.title }</p>
                <img className={ classNames('Clears')} onClick={ onClickDelete } src={Clear} alt='clear'></img>
                </li>
            </div>                      
        );
    }
}

TodoItem.propTypes = {
    item: propTypes.shape({
        title: propTypes.string,    //kiểu string
        isComplat: propTypes.bool   //kiểu true false
    }),     // định ghĩa item là một object
    onClick: propTypes.func,    //kiểu function 
    onClickDelete: propTypes.func 
};

export default TodoItem; 
