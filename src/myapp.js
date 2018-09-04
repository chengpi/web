//import React,{Component} from 'react'
// import './css/showInputView.css';
// import App from './App';
import React, {Component} from 'react'
//import "./css/resultInfo.css"
import './css/App.css';
import logo from './img/Video.png';

class Myapp extends Component{
  constructor(props) {
    super(props)

    this.state={

    }

  }

  static defaultProps = {
    isappInputRef:false,
    myApiGet:(ref)=>{}
  }

  render() {
    return (
      <div className="idiv0">
        {
          this.props.isappInputRef ?
          <div className="div01">
            <input className="input0" ref="inputRef"></input>
            <button
            className="button0"
            onClick={()=>{
              console.log("搜索")
              // console.log(this.refs.inputRef.value)
              this.props.myApiGet(this.refs.inputRef.value)

            }
          }>SEARCH
            </button>
          </div>
          :<div />
        }
      </div>
    )
  }
}

export default Myapp
