import React from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/TodoItem';
import tick from './image/checked.svg';


class App extends React.Component {
  constructor () {
    super();
    if(!localStorage.getItem('todoItem')){
      localStorage.setItem('newItem', '');
      localStorage.setItem('currentFilter', 'All');
      localStorage.setItem('todoItem', '');
    }
    if(localStorage.getItem('todoItem') != ''){
      var arr = JSON.parse(localStorage.getItem('todoItem'));
    }else{
      var arr = localStorage.getItem('todoItem');
    }
    this.state = {
      newItem: localStorage.getItem('newItem'),
      currentFilter: localStorage.getItem('currentFilter'),
      todoItem: [
        ...arr
      ]
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickAll = this.onClickAll.bind(this);
    this.onClickAcctive = this.onClickAcctive.bind(this);
    this.onClickComplate = this.onClickComplate.bind(this);
    this.onClickTick = this.onClickTick.bind(this);
    this.onClickClear = this.onClickClear.bind(this);
  };
  onItemClicked(item){
    return (event) => {
      const isComplate = item.isComplate;
      const index = this.state.todoItem.indexOf(item);
      const { todoItem } = this.state; 
      this.setState({
        todoItem: [
          ...todoItem.slice(0, index),
          {
            ...item, isComplate: !isComplate
          },
          ...todoItem.slice(index + 1)
        ]
      });
      localStorage.setItem('todoItem', JSON.stringify(todoItem.slice(0, index).concat(
      {
        ...item, isComplate: !isComplate
      }).concat(
      todoItem.slice(index + 1))));
    };
  }
  onKeyUp(event) {
    if(event.keyCode === 13)
    {
      let text = event.target.value;
      if( !text ) { return; }
      text = text.trim();
      if( !text ) { return; }
      this.setState({
        newItem: '',
        todoItem: [
          ...this.state.todoItem,
          {
            title: text, isComplate: false
          }
        ]
      });
      localStorage.setItem('todoItem', JSON.stringify(this.state.todoItem.concat({
        title: text, isComplate: false
      })));
    }
  }
  onChange(event){
    this.setState({
      newItem: event.target.value
    });
  }
  onClickAll(event){  
    this.setState({
      currentFilter: event.target.title

    });
  }
  onClickAcctive(event){
    this.setState({
      currentFilter: event.target.title,
        todo: [
          ...this.state.todoItem.filter((item) => {
            return item.isComplate === false;
          })
        ]
    });
  }
  onClickComplate(event){
    this.setState({
      currentFilter: event.target.title,
      todo: [
        ...this.state.todoItem.filter((item) => {
          return item.isComplate === true;
        })
      ]
    });
  }
  onClickTick(event) {
    const {todoItem} = this.state;
    if((todoItem.filter((item) => item.isComplate === false)).length === 0){
      this.setState({
        todoItem: [
          ...todoItem.map((item) => {
            const c = Object.assign({}, item);
            c.isComplate = false;
            return c;
          })
        ]
      });
      localStorage.setItem('todoItem', JSON.stringify(todoItem.map((item) => {
        const c = Object.assign({}, item);
        c.isComplate = false;
        return c;
      })));
    }
    else{
      this.setState({
        todoItem: [
          ...todoItem.map((item) => {
            const c = Object.assign({}, item);
            c.isComplate = true;
            return c;
          })
        ]
      });
      localStorage.setItem('todoItem', JSON.stringify(todoItem.map((item) => {
        const c = Object.assign({}, item);
        c.isComplate = true;
        return c;
      })));
    }
  }
  onClickClear(event){
    const { todoItem } = this.state;
    this.setState({
      todoItem: [
        ...todoItem.filter((item) => 
        item.isComplate === false
        )
      ]
    });
    localStorage.setItem('todoItem', JSON.stringify(todoItem.filter((item) => 
    item.isComplate === false
    )));
  }
  onClickDelete(item){
    return (event) => {
      const index = this.state.todoItem.indexOf(item);
      const { todoItem } = this.state; 
      this.setState({
        todoItem: [
          ...todoItem.slice(0, index),
          ...todoItem.slice(index + 1)
        ]
      });
      localStorage.setItem('todoItem', JSON.stringify(todoItem.slice(0, index).concat(todoItem.slice(index + 1))));
    };
  }
  render () {
    const {newItem, currentFilter} = this.state;
    var a;
    if(currentFilter === 'All'){
      var {todoItem} = this.state;
      if(todoItem.length > 0){
        a = 1;
      }
    }
    if(currentFilter === 'Acctive' || currentFilter === 'Complated'){
      var todoItem = this.state.todo;
      a = 2;
    }
    return (
      <div className="App">
        <label className="name">todos</label>
          <ul className="tab">
          <div>
            <li className="li-input">
              <img src={ tick } alt="tick" onClick={this.onClickTick}></img>
              <input type="text" className="Input" onKeyUp={this.onKeyUp} 
              value={newItem} onChange={this.onChange} 
              placeholder="What needs to be done?"></input>
            </li>
          </div>
            {
            todoItem.map((item, index) =>
              todoItem.length > 0 &&<TodoItem key={ index } item={ item } 
              onClick={this.onItemClicked(item)} onClickDelete={this.onClickDelete(item)}/>
            )}
            {
            a > 0 && <div>
              <li className="button">
                <label className='items-left'>{(todoItem.filter((item) => item.isComplate === false)).length} items left</label>
                <label title="All" className={classNames('All', {'check': currentFilter==="All"})} 
                onClick={ this.onClickAll }>All</label>
                <label title="Acctive" className={classNames('Acctive', {'check': currentFilter==="Acctive"})}
                onClick={ this.onClickAcctive }>Active</label>
                <label title="Complated" className={classNames('Complated', {'check': currentFilter==="Complated"})}
                onClick={ this.onClickComplate }>Completed</label>
                {
                  (todoItem.filter((item) => item.isComplate === true)).length > 0 && 
                  <label className='Clear' onClick={ this.onClickClear }>Clear complated</label>
                }
              </li>
            </div>
            }
          </ul>
      </div>
    );
  }
}

export default App;
