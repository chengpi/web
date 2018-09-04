import React,{Component} from 'react'
import './css/showInputView.css';
// import App from './App';
import './css/App.css';
import Myapp from './myapp';

var NebPay = require("./dist/nebpay");
var nebPay = new NebPay();

const dappAddress = "n1iFu87ifaQkuGBEgtwo2tAq1cpTNMVVUhB"
//const dappAddress = "n1hzd3q6g9sqUvVp63b2joqoh2ysv6zxDN1"
//49b024d88f97d5f0b06b290394fdb106346012f7ebf4838d0c7e6d0c5a12b20c
class ShowInputView extends Component {
  constructor(props) {
    super(props)

    this.state={
      isShowApp: true
    }
  }
  static defaultProps = {
    addText: "",
    // ValueRef:"",
    addFunction:()=>{}
  }



  render() {

    return (
        this.state.isShowApp ?
        <div className="divinput0">
          <div className="divinput00">
            <label className="mylab">曲名:</label>
            <input
              ref="inputValueRef1"
              type="text"
              //value={this.props.addText}
              // onfocus={()=>{
              //   if(this.value=='请输入内容'){
              //     this.value=''
              //   }
              //   this.value=this.props.addText
              // }}
              onFocus={this.value=''}
              value={this.props.addText}

              className="input1" />
          </div>
          <div className="divinput00">
            <label className="mylab">链接:</label>
            <input
              ref="inputValueRef"
              className="input1" />
          </div>
          <div className="divinput00">
            <button
              onClick={() => {
                console.log("调用合约的set方法!")
                // var myaddText=this.props.addText
                //console.log(this.refs.inputValueRef.value)
                // this.refs.inputValueRef1.value=this.props.addText
                if (this.refs.inputValueRef.value ==""){
                  this.refs.inputValueRef.value="不可为空"
                }else if(this.refs.inputValueRef.value!="不可为空"){
                  var value = "0";
                  var callFunction = "set"
                  var callArgs = "[\"" + this.refs.inputValueRef1.value+ "\",\"" + this.refs.inputValueRef.value + "\"]"
                  console.log(callArgs)
                  nebPay.call(dappAddress, value, callFunction, callArgs, {    //使用nebpay的call接口去调用合约,
                    listener: this.addFunction        //设置listener, 处理交易返回信息
                  });
                }
              }}
              className="button2">SAVE</button>
            <button
              onClick={()=>{
                this.setState({isShowApp:false})
              }}
              className="button2">CANCEL</button>
          </div>
        </div>
        :
        <Myapp isappInputRef={true} />
        // <div className="div01">
        //   <input className="input0" ref="inputRef"></input>
        //   <button
        //   className="button0"
        //   onClick={()=>{
        //     // console.log("搜索")
        //     // console.log(this.refs.inputRef.value)
        //     console.log("111")
        //     // App.Submit()
        //     //App.ApiGet()
        //
        //   }
        // }>SEARCH
        //   </button>
        // </div>


    )
  }
}

export default ShowInputView
