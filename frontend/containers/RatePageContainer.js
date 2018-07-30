import ReactStars from 'react-stars'
import React, {Component} from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'

class RatePageContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        courseId: "",
        profID: "",
        comment:"",
        difficulty: 0.0,
        overall: 0.0,
        workload: 0.0,
        accent: 0.0,
        attendance: null,
        curve: null
      }
      this._handleKeyPress = this._handleKeyPress.bind(this);
      this.setWorkload = this.setWorkload.bind(this);
      this.setDifficulty = this.setDifficulty.bind(this);
      this.setAccent = this.setAccent.bind(this);
      this.setAttendance = this.setAttendance.bind(this);
      this.setCurve = this.setCurve.bind(this);
    }

    componentWillMount() {
    console.log('mount');
    console.log(location.search);

    var querystring = require('query-string');
    var parsed = querystring.parse(location.search);
    console.log(parsed);
    console.log(parsed.course);
    console.log(parsed.prof);
    var pname = parsed.prof.replace("_",", ");
    this.state.courseId= parsed.course;
    this.state.profID= pname;
    console.log(this.state.courseId);
    console.log(this.state.profID);

  }

    updateComment(event){
      this.setState({comment: event.target.value});
      console.log(this.state.comment)
    }

    _handleKeyPress(e) {
      if (e.key === 'Enter') {

        e.preventDefault();
        this.submitReview();


      }
    }

    setWorkload(event) {
      this.setState({workload: parseInt(event.target.value)});
    }

    setDifficulty(event) {
      this.setState({difficulty: parseInt(event.target.value)});
    }

    setAccent(event){
      this.setState({accent: parseInt(event.target.value)});
    }

    setAttendance(event){
      this.setState({attendance: event.target.value});
    }

    setCurve(event){
      this.setState({curve: event.target.value});
    }

    submitReview() {
      if(this.state.difficulty!=0 && this.state.overall!=0 && this.state.workload!=0 && this.state.accent!=0)
      {
          // Send a POST request
          axios({
            method: 'post',
            url: '/course/add_rating',
            data: {
              class_id: this.state.courseId,
              prof_id: this.state.profID,
              difficulty_rating: this.state.difficulty,
              overall_rating: this.state.overall,
              workload_rating: this.state.workload,
              accent_rating: this.state.accent,
              attendance_rating: this.state.attendance,
              curve_rating: this.state.curve,
              comment: this.state.comment
            }
          })
          .then(function (response) {
            console.log(response.status);
               if(response.data.message){
                  Materialize.toast(response.data.message, 4000);

               }
               /*if(response.data.redirectUrl){
                 window.location.href =response.data.redirectUrl;
               }else{ */

                 window.location.href ='/rating'+location.search;
               //}
          })
          .catch(function (error) {
            console.log(error.response.data.message);
          });
      }
      else
      {
        Materialize.toast("Please fill out all ratings!", 4000);
      }

    }

render() {

  var titleurl='/rating'+location.search;

  const overallRating = (newRating) => {
    this.state.overall = (newRating)
  }

  const difficultyRating = (newRating) => {
    this.state.difficulty = (newRating)
  }

  const workloadRating = (newRating) => {
    this.state.workload = (newRating)
  }

    return(
     <div>

     <div className = "header">
         <Link to={titleurl} className = "header-title" style={{color: '#FFD700'}}> <span className = "header-title-emory">Emory</span> Course Critique </Link>
     </div>
       <lbody>
         <div id="login-page" className="row">
           <div className="col l8 push-l2 m10 push-m1 s12 z-depth-4 card-panel nohover2" style={{position: 'relative' , top: '50px', padding: '0 48px'}}>
             <form className="login-form">
               <div className = "page col m6">
                 <p className = "ratingFactor">请你对{this.state.profID}的{this.state.courseId}做出评价</p>
                 <div className = "divider"></div>


                   <div className = "ratingFactor">
                     <span>整体评分</span>
                     <div className = "center" style={{position:"relative"}}><ReactStars style={{margin:"0 auto", width:"26%"}}
                       count={5}
                       value={this.state.overall}
                       onChange={overallRating}
                       size={24}
                       half={false}
                       color2={'#ffd700'} /></div>
                   </div>

                   <div className = "divider"></div>

                   <div className = "ratingFactor">
                     <span>课业负担</span>
                     <div className="center" onChange={this.setWorkload} style={{}}>

                       <input className="width-gap" type="radio" name="group1" id="1" value="1"/>
                       <label className="labelOverride" htmlFor="1" style={{marginLeft: "0"}}>1</label>

                       <input className="width-gap" type="radio" name="group1" id="2" value="2"/>
                       <label className="labelOverride" htmlFor="2">2</label>

                       <input className="width-gap" type="radio" name="group1" id="3" value="3"/>
                       <label className="labelOverride" htmlFor="3">3</label>

                       <input className="width-gap" type="radio" name="group1" id="4" value="4"/>
                       <label className="labelOverride" htmlFor="4">4</label>

                       <input className="width-gap" type="radio" name="group1" id="5" value="5"/>
                       <label className="labelOverride" htmlFor="5">5</label>
                     </div>
                   </div>

                   <div className = "divider"></div>

                   <div className = "ratingFactor">
                     <span>拿A难度</span>
                     <div className="center" onChange={this.setDifficulty} style={{}}>

                       <input className="width-gap" type="radio" name="group2" id="6" value="1"/>
                       <label className="labelOverride" htmlFor="6" style={{marginLeft: "0"}}>1</label>

                       <input className="width-gap" type="radio" name="group2" id="7" value="2"/>
                       <label className="labelOverride" htmlFor="7">2</label>

                       <input className="width-gap" type="radio" name="group2" id="8" value="3"/>
                       <label className="labelOverride" htmlFor="8">3</label>

                       <input className="width-gap" type="radio" name="group2" id="9" value="4"/>
                       <label className="labelOverride" htmlFor="9">4</label>

                       <input className="width-gap" type="radio" name="group2" id="10" value="5"/>
                       <label className="labelOverride" htmlFor="10">5</label>
                     </div>
                  </div>

                  <div className = "divider"></div>

                   <div className = "ratingFactor">
                     <span>口音</span>
                     <div className="center" onChange={this.setAccent} style={{}}>

                       <input className="width-gap" type="radio" name="group3" id="11" value="1"/>
                       <label className="labelOverride" htmlFor="11" style={{marginLeft: "0"}}>1</label>

                       <input className="width-gap" type="radio" name="group3" id="12" value="2"/>
                       <label className="labelOverride" htmlFor="12">2</label>

                       <input className="width-gap" type="radio" name="group3" id="13" value="3"/>
                       <label className="labelOverride" htmlFor="13">3</label>

                       <input className="width-gap" type="radio" name="group3" id="14" value="4"/>
                       <label className="labelOverride" htmlFor="14">4</label>

                       <input className="width-gap" type="radio" name="group3" id="15" value="5"/>
                       <label className="labelOverride" htmlFor="15">5</label>
                     </div>
                   </div>

                   <div className = "divider"></div>

                   <div className = "ratingFactor">
                     <span>记不记考勤</span>
                     <div className="center" onChange={this.setAttendance} style={{}}>
                       <input className="width-gap" type="radio" name="group4" id="16" value={true}/>
                       <label className="labelOverride" htmlFor="16" style={{marginLeft: "0"}}>记</label>

                       <input className="width-gap" type="radio" name="group4" id="17" value={false}/>
                       <label className="labelOverride" htmlFor="17">不记</label>
                     </div>
                   </div>

                   <div className = "divider"></div>

                   <div className = "ratingFactor">
                     <span>给不给Curve</span>
                     <div className="center" onChange={this.setCurve} style={{}}>
                       <input className="width-gap" type="radio" name="group5" id="18" value={true}/>
                       <label className="labelOverride" htmlFor="18" style={{marginLeft: "0"}}>给</label>

                       <input className="width-gap" type="radio" name="group5" id="19" value={false}/>
                       <label className="labelOverride" htmlFor="19">不给</label>
                     </div>
                   </div>
               </div>
               <div className ="page col m6">
                 <div className="col s12">
                   <div className="row">
                   <div></div>
                     <div className="input-field col s12">
                       <i className="material-icons prefix">mode_edit</i>
                       <textarea id="icon_prefix2" type="text" className="materialize-textarea" value={this.state.comment} onChange= {(event) => this.updateComment(event)} style={{}}></textarea>
                       <label htmlFor="icon_prefix2">如有更详细的文字评价可在此处添加</label>
                     </div>
                   </div>
                 </div>
               </div>
               <div className="row margin">
                <div className="input-field col s12">
                  <div className="submit-button-row">
                    <button
                    className="btn-large waves-effect waves-light"
                    type="button" onClick={() => this.submitReview()}>
                    提交评价!
                    </button>
                  </div>
                </div>
              </div>
             </form>
           </div>
         </div>

       </lbody>
     </div>
    )

  }

};

const mapStateToProps = (state) => {
  return{
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RatePageContainer);
