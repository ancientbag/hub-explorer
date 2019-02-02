import React, { Component } from 'react';
import './App.css';

import Item from '../components/item/item';

class App extends Component {

  constructor(){
    super();
    this.state = {
      q:'',
      items:[],
      sort:'popular',
      page:0,
      per_page:10
    }
  }

  componentDidMount(){
    this.explore();
  }

  explore(more){
    let url = `https://api.github.com/search/repositories?order=desc&page=${this.state.page}&per_page=${this.state.per_page}&q=javascript`+(this.state.q !== '' ?  '+'+this.state.q : '' );
    if(this.state.sort !== 'popluar'){
      url += '&sort='+this.state.sort;
    }
    fetch(url)
      .then(response => response.json())
      .then(data => more ? this.setState({items:this.state.items.concat(data.items)}) : this.setState({items:data.items}))
  }

  parseData(data,more){
    console.log(data);
    this.setState({items:data.items});
  }

  _round(value){
    if(value > 1000){
      value = value.toString();
      return value[0] + (value[1] !== '0' ? '.'+value[1] + 'K' : 'K');
    } else {
      return value;
    }
  }

  setSort(method){
    if(method !== this.state.sort){
      this.setState({sort:method,page:0},()=>{
      });
    }
  }

  onSearch(){
    this.setState({page:0,q:this.state.q.trim().replace(/\s+/g,'+')},()=>{
      this.explore();
    });
  }

  render() {
    return (
      <div id="container">
        <div id="head">
          <div id="head-logo">
            <div className="point"/> hub-explorer
          </div>
          <div id="head-search">
            <input id="search-input" type="text" onChange={((e)=>{this.setState({q:e.target.value})})} onKeyDown={((e)=>{if(e.key === 'Enter') this.onSearch()})} />
            <button onClick={(()=>{this.onSearch()})} id="go">
              <i className="fas fa-search" />
            </button>
            <div id="search-sort">
              <div className="search-radio"><input onChange={(()=>{this.setSort('popular')})} type="radio" name="sort" value="stars" checked={this.state.sort === 'popular'}/> popular</div>
              <div className="search-radio"><input onChange={(()=>{this.setSort('stars')})} type="radio" name="sort" value="stars" checked={this.state.sort === 'stars'}/> stars</div>
              <div className="search-radio"><input onChange={(()=>{this.setSort('forks')})} type="radio" name="sort" value="forks" checked={this.state.sort === 'forks'}/> forks</div>
            </div>
          </div>
        </div>
        <div id="content">
          {this.state.items.map((item,index)=>
            <Item {...item} key={index} />
          )}
          <div id="load_more" onClick={(()=>{this.setState({page:this.state.page+1},()=>{this.explore(true)})})}>load more</div>
        </div>
      </div>
    );
  }
}

export default App;
