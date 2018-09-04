import React, {Component} from 'react'
import "./css/resultInfo.css"

class ResultInfo extends Component{
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    keyInfo: "liudehua",
    valueInfo: "刘德华",
    accountInfo: "n1YLc2ndCuzS5hKthxvpBDtv1c1YPa6Pacw"
  }

  render() {
    return (
      <div className="divinfo0">
          <h1>{this.props.keyInfo}</h1>
          <div className="divinfo00"></div>
          <h2 className="h2info0"><a href={this.props.valueInfo} target=""_blank>{this.props.valueInfo}</a></h2>
          <h2 className="h2info1">上传者地址: {this.props.accountInfo}</h2>
      </div>
    )
  }
}

export default ResultInfo
