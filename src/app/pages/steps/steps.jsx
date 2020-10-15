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
        <div className='container steps_content'>
          <Steps current={this.props.page} progressDot>
            <Step title='Tipo de envío' />
            <Step title='Datos del envío' />
            <Step title='Opciones del envío' />
            <Step title='Cálculo estimado' />
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
