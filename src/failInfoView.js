import React,{Component} from 'react'
import './css/failInfoView.css';

class FailInfoView extends Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    searchText: "",
    addFunc:()=>{}
  }

  render() {

    return (
      <div className="div000">
        <div className="div0000">
          Failed to find related information. Do you want to add
          infromation for
          "{this.props.searchText}"?
        </div>
        <div className="div0001">Please click on the button below to add</div>
        <button className="button1" onClick={this.props.addFunc}>ADD</button>
      </div>
    )
  }
}

export default FailInfoView
