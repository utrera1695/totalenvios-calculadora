import React, { Component } from 'react';
import { Steps } from 'antd';
import { connect } from 'react-redux';
import './step.css';
const { Step } = Steps;
class StepsComponent extends Component {
  setClassStep(n) {
    if (n < this.props.page) {
      return 'finish';
    } else if (n === this.props.page) {
      return 'process';
    }
    return 'wait';
  }
  render() {
    return (
      <>
        <div className='container steps_content' style={{ paddingTop: '60px' }}>
          <Steps
            current={this.props.page}
            progressDot
            onChange={this.props.changePage}
          >
            <Step title='Tipo de envio' />
            <Step title='Origen y Destino' />
            <Step title='Medidas' />
            <Step title='Done' />
          </Steps>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  page: state.page
});
const mapDispatchToProps = dispatch => ({
  changePage(page) {
    dispatch({
      type: 'CHANGE_PAGE',
      page: page
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StepsComponent);
