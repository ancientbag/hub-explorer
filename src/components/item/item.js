import React, { Component } from 'react';
import './item.css';

import PropTypes from 'prop-types';

export default class Item extends Component {

  constructor(props){
    super();
    this.props = props;
  }

  _round(value){
    // If value is more than 1000 then cut this to nK
    if(value > 1000){
      let thousands = value / 1000;
      value = value.toString();
      return parseInt(thousands) + 'K';
    } else {
    // If not then just return it
      return value;
    }
  }

  render() {
    return (
      <div>
        <div className="item">
          <div className="item-owner">
            <p className="oft" title={this.props.name}>{this.props.name}</p>
            <a without="true" rel="noopener noreferrer" href={this.props.owner.html_url} target="_blank" style={{color:'#949494',textDecoration:'none'}}>{this.props.owner.login}</a>
          </div>
          <p className="item-description">{this.props.description ? this.props.description : 'No description'}</p>
          { /* I would have compressed following replications into component, but it's not that much needed I guess */ }
          <div className="item-short-info">
            <div className="item-short-icon" style={{color:'#ffe25f'}}><p title="Stars">★</p></div>
            <p className="item-short-amount">{this._round(this.props.stargazers_count)}</p>
          </div>
          <div className="item-short-info">
            <div className="item-short-icon" style={{color:'#f44336'}}><p title="Open issues">!</p></div>
            <p className="item-short-amount">{this._round(this.props.open_issues_count)}</p>
          </div>
          <div className="item-short-info">
            <div className="item-short-icon" style={{color:'#868686'}}><i title="Forks" className="fas fa-share-alt"></i></div>
            <p className="item-short-amount">{this._round(this.props.forks_count)}</p>
          </div>
          <p className="item-license">{this.props.license ? this.props.license.name : 'No license'}</p>
          <a without="true" rel="noopener noreferrer" target="_blank" href={this.props.html_url} className="item-link"><i className="fas fa-link"></i></a>
        </div>
      <div className="item-hr"/>
      </div>
    );
  }
}

Item.propTypes ={
  name: PropTypes.string,
  owner: PropTypes.object,
  description: PropTypes.string,
  stargazers_count: PropTypes.number,
  open_issues_count: PropTypes.number,
  forks_count: PropTypes.number,
  license: PropTypes.object
}
