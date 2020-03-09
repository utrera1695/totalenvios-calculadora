import React, { Component } from 'react';
import { connect } from 'react-redux';
class PriceResult extends Component {

  render() {
    return (
      <>
        <div
          className='card'
          style={{ backgroundColor: '#004e69', color: 'white' }}
        >
          <div className='card-body'>
            
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PriceResult);
