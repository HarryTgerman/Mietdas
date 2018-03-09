import React, {Component} from 'react';
import {NavLink, Redirect} from 'react-router-dom';
import firebase from 'firebase'
import Dropzone from 'react-dropzone'

class Artikelbearbeiten extends Component{

  constructor(props){
    super(props)
    this.state = {
       authenticated: false,
       redirect: false,
       imageFiles: [],
       pictures: [],

    }
  }



  componentWillMount(){
    this.removeAuthListener = firebase.auth().onAuthStateChanged((user)=>{
      const userProfile = firebase.auth().currentUser;
      if(user){
        this.setState({
          authenticated: true,
          name : userProfile.displayName,
          email : userProfile.email,
          uid : userProfile.uid,
          })
      } else {
        this.setState({
          authenticated: false,
        })
        return <Redirect to="/"/>
      }
    })
  }



  componentWillUnmount(){
    this.removeAuthListener();
  }

  onDrop(imageFiles) {

   this.setState({
       imageFiles: imageFiles,
       pictures: this.state.pictures.concat(imageFiles),
   }, ()=>{
     const userId = this.state.uid;
     const heading = this.props.location.state.snap.cardHeading;
     firebase.storage()
       .ref().child("images/artikelimgaes" + userId+"/artikel/"+ heading)
       .delete()
       .then(()=>{
   // File deleted successfully
     }).catch((error)=>{
   // Uh-oh, an error occurred!
     });
   })
   console.log(imageFiles)
}


update(event){
    event.preventDefault();
    this.setState({
        loading: true
      })
    const userId = this.state.uid;
    const array = []
    const pictures = this.state.pictures[0]
    const heading = this.props.location.state.snap.cardHeading;
    const keys = Object.keys(pictures)
    console.log("update");
    let keysPromises = keys.map(
      key =>
        new Promise((resolve, reject) => {
          const picture = pictures[key];
          firebase
            .storage()
            .ref("images")
            .child("artikelimgaes/" + userId)
            .child("artikel/")
            .child(heading)
            .child(picture.name)
            .put(picture)
            .then(() => {
              firebase
                .storage()
                .ref("images")
                .child("artikelimgaes/" + userId)
                .child("artikel/")
                .child(heading)
                .child(picture.name)
                .getDownloadURL()
                .then(url => {
                  const imgUrl = url;
                  array.push(url);
                  this.setState({ Arr: array }, resolve());
                });
            });
        })
    );

    Promise.all(keysPromises).then(() => {
      const id = this.props.id
      const db = firebase.database().ref('app').child('cards').child(id);
      const userId = this.state.uid;
      const timeInMs = Date.now();

      const pdfUrl = this.state.pdf;
      const images = this.state.Arr;
      const imageUrl = this.state.Arr[0]
      db.update({
        hersteller: this.herstellerInput.value,
          cardHeading: this.titelInput.value,
          cardPreis: this.preisInput.value,
          cardDesc: this.beschreibungInput.value,
          imageArr: images,
          imageUrl: imageUrl,

              })
              this.setState({
                loading: false,
                redirect: true
              })
            })
}

        render(){
          return(
              <div className="wrapper">
                <div className="container">
                <div className="navbar navbar-default navbar-fixed navbar-transparent white bootsnav">
                <div style={{paddingBottom: "0"}}  className="container">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                    <i className="ti-align-left"></i>
                  </button>

                   {/*Start Header Navigation*/}
                  <div className="navbar-header">
                    <NavLink to="/">
                      <img src="../assets/img/logo.png" className="logo logo-display" alt=""/>
                      <img src="../assets/img/logo.png" className="logo logo-scrolled" alt=""/>
                    </NavLink>
                  </div>

                   {/*Collect the nav links, forms, and other content for toggling*/}
                  <div className="collapse navbar-collapse" id="navbar-menu">
                    <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">

                    <li className="dropdown">
                      <NavLink to="/mieten" >Mieten</NavLink>
                    </li>
                    <li className="dropdown">
                      <NavLink to="/vermieten" >Vermieten</NavLink>
                    </li>
                      {this.state.authenticated ?(<li className="dropdown">
                          <NavLink to="/logout" >Logout</NavLink>
                        </li>)
                      :(<li><a  href="javascript:void(0)"  data-toggle="modal" data-target="#signup">Log-In</a></li>)}
                    </ul>
                    <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
                    { this.state.authenticated ?(<li className="no-pd"><NavLink to="/benutzeraccount" className="addlist"><i className="ti-user"></i>{this.state.name}</NavLink></li>)
                    :(<p></p>)
                    }
                    </ul>
                  </div>
                   {/*.navbar-collapse*/}
                </div>
              </div>
               {/*End Navigation*/}


                <div className="cardStyle full-detail mrg-bot-25 padd-bot-30 padd-top-25" >

                   {/* /. ROW  */}
                  <div id="page-inner">
                    <div className="row bott-wid">
                      <div className="col-md-12 col-sm-12">
                        <div className="card">

                          <div className="cardHead">
                            <h4>Artikel bearbeiten</h4>
                          </div>

                          <div className="card-body">
                            <form className="form-horizontal" style={{padding: "25px"}} method="post">



                              <form onSubmit={this.update.bind(this)}>
                  								<div className="extra-field-box">
                  									<div className="multi-box">
                  										<div className="dublicat-box mrg-bot-40">
                  											<div className="row mrg-0">
                  												<div className="col-md-12 col-sm-12">
                  													<label>Titel</label>
                  													<input type="text" className="form-control" ref={(input) => { this.titelInput = input; }} placeholder={this.props.location.state.snap.cardHeading}/>
                  												</div>
                  											</div>
                  											<div className="row mrg-0">
                  												<div className="col-md-6 col-sm-6">
                  													<label>Preis</label>
                  													<input type="text" className="form-control"  ref={(input) => { this.preisInput = input; }} placeholder={this.props.location.state.snap.cardPreis + "€"}/>
                  												</div>
                  												<div className="col-md-6 col-sm-6">
                  													<label>Hersteller</label>
                  													<input type="text" className="form-control"  ref={(input) => { this.herstellerInput = input; }} placeholder={this.props.location.state.snap.hersteller}/>
                  												</div>
                  											</div>
                                        <div className="row mrg-0">
                  												<div className="col-md-12 col-sm-12">
                  													<label>Beschreibung</label>
                  													<textarea className="form-control height-120" ref={(input) => { this.beschreibungInput = input; }} placeholder={this.props.location.state.snap.cardDesc}></textarea>
                  												</div>
                  											</div>
                  										</div>
                  									</div>
                  								</div>
                                  <div className="full-detail mrg-bot-25 padd-bot-30 padd-top-25">
                                    <div className="listing-box-header">
                                      <i className="ti-gallery theme-cl"></i>
                                      <h3>Add Gallery</h3>
                                      <p>Write full detail information about listing Owner</p>
                                    </div>
                                    <form style={{cursor:'pointer'}}  className="dz-clickable primary-dropzone">
                                      <Dropzone
                                          className="dropzone"
                                          onDrop={this.onDrop.bind(this)}
                                          activeClassName='active-dropzone'
                                          multiple={true}>
                                          <div className="dz-default dz-message">
                                            <i className="ti-gallery"></i>
                                            <span>Ändere deine Bilder</span>
                                          </div>
                                          <div className="row">
                                          {this.state.imageFiles.length > 0 ? <div>
                                          <div>{this.state.imageFiles.map((file) => <div  className="col-md-4 col-sm-12" ><img stlye={{height: "120px", width: "120px", borderRadius: "4px"}}  src={file.preview} /></div> )}</div>
                                          </div> : null}
                                          </div>
                                        </Dropzone>
                                    </form>
                                  </div>

                                  <div className="form-group">
                                    <div className="col-md-12 col-sm-12 text-center">
                                      <button type="submit" className="btn theme-btn">Artikel aktuallisieren</button>
                                    </div>
                                  </div>
                  							</form>
                              </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            )
        }
    }

export default Artikelbearbeiten;
