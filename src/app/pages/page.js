import React, { Component } from 'react';

import { connect } from 'react-redux';
import TipoEnvio from './tipo_envio/tipo_envio';
import Destino from './destino/destino';
import StepsComponent from './steps/steps';
import Measurements from './measurements/measurements';
class Pages extends Component {
  setPage() {
    switch (this.props.page) {
      case 0:
        return <TipoEnvio />;
      case 1:
        return (
          <div className='row'>
            <div className='col-12 col-lg-4'>
              {' '}
              <Destino />
            </div>
            <div className='col-12 col-lg-8'>
              <Measurements />
            </div>
          </div>
        );

      default:
        return <TipoEnvio />;
    }
  }
  render() {
    return (
      <>
        <div className='container'>{this.setPage()}</div>
        <StepsComponent />
      </>
    );
  }
}
const mapStateToProps = state => ({
  page: state.page
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
