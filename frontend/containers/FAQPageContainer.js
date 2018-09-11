import React, {Component} from 'react';
import { connect } from 'react-redux';
import Footer from "./components/Footer";
import NavBarWithLogo from "./components/NavBarWithLogo";

class FAQPageContainer extends Component {
  constructor(props) {
    super(props)
    console.log(props);
  }
  render() {
    return(
     <div>
        <div style={{backgroundColor: "#002978", height: "64px"}}>
          <NavBarWithLogo/>
        </div>
        <div className="container">
          <div style={{height: "45px"}} />
            <h2 className="center" style={{fontWeight: "300"}}>常见问题</h2>
          <div style={{height: "45px"}} />
          <div className="row">
            <div className="col s12 m10 offset-m1">
                <ul className="collapsible" data-collapsible="accordion">
                 <li>
                    <div className="collapsible-header active"><i className="material-icons">question_answer</i>Emory教授说是什么？</div>
                    <div className="collapsible-body"><span>Emory教授说是一个由Emory本科生制作，方便中国学生更好选择课程及教授的网站。我们希望能够给中国学生提供一个可靠，时效性强的教授信息平台。现在就搜索课程编号或课程名称开始使用吧！</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">whatshot</i>如何评价一门课程？</div>
                    <div className="collapsible-body"><span>您需要是一名埃默里大学的本科生，并有一个有效，以@emory.edu为后缀的学校邮箱。点击网站右上角“注册”输入相关信息后，您的学校邮箱会收到一封确认邮件，通过该电子邮件就可以激活您的帐户了。成功注册后，点击课程界面左下角的“评价这名教授”按钮即可填写评价 </span></div>
                  </li>

                  <li>
                    <div className="collapsible-header"><i className="material-icons">person_outline</i>这是匿名的吗？</div>
                    <div className="collapsible-body"><span>是的</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">attach_money</i>这是免费的吗？</div>
                    <div className="collapsible-body"><span>是的</span></div>
                  </li>
                  <li>
                    <div className="collapsible-header"><i className="material-icons">school</i>这是由校方赞助的吗？</div>
                    <div className="collapsible-body"><span>不是</span></div>
                  </li>
                </ul>
            </div>
          </div>
          <div style={{height: "90px"}} />
          </div>
        <div>
           <Footer/>
        </div>
    </div>
    );
  }
}


const mapStateToProps = (state) => {
  return{
    state
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FAQPageContainer);
