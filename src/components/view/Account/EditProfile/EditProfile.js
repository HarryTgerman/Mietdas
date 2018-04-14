import React, {Component} from 'react';
import firebase from 'firebase'


class EditProfile extends Component{

  constructor(props){
    super(props)
    this.state={
      loading: true
    }
}

componentDidMount(){
  firebase.database().ref().child("app/users").child(this.props.uid)
  .once('value', snap=>{
    let url = snap.val().url
    let email = snap.val().email
    let name = snap.val().name

    this.setState({
      url: url,
      email:email,
      name:name,
      loading: false,
    })
  })
}

handleChange(event){
  event.preventDefault()
  if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({avatarImg: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
}

        render(){
          return(
              <div>
                {this.state.loading?(<h1>Lade Daten</h1>):(<section className="padd-0">
                  <div className="container">
                    <div className="col-md-10 translateY-60 col-sm-12 col-md-offset-1">
                      <div className="  edit-info mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <div className="avater-box">
                          <img style={{height:"130px" ,width:"130px"}} src={this.state.url} className="img-responsive img-circle edit-avater" alt="" />
                          <div style={{marginLeft:"11px"}} className="upload-btn-wrapper">
                            <button className="btn theme-btn">Profilbild</button>
                            <input type="file" name="myfile"   ref={(input) => { this.profilePic = input; }} onChange={this.handleChange.bind(this)}/>
                          </div>
                          </div>
                          <h3>{this.state.name}</h3>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Name</label>
                              <input type="text" className="form-control" value="Daniel Deve"/>
                            </div>
                            <div className="col-sm-6">
                              <label>Email</label>
                              <input type="text" className="form-control" value="support@listinghub.com"/>
                            </div>
                            <div className="col-sm-6">
                              <label>Phone</label>
                              <input type="text" className="form-control" value="91 258 587 4123"/>
                            </div>
                            <div className="col-sm-6">
                              <label>DOB</label>
                              <input type="text" data-lang="en" data-format="F S, Y" data-default-date="11-13-2018" data-fx-mobile="true" data-theme="my-style" data-large-default="true" className="datedropper form-control"/>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="  add-location mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-location-pin theme-cl"></i>
                          <h3>Edit Location</h3>
                          <p>Write Address Information about your listing Location</p>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Address</label>
                              <input type="text" className="form-control" value=" 1126 Sunrise Road, NV 89107"/>
                            </div>
                            <div className="col-sm-6">
                              <label>Temporary Address</label>
                              <input type="text" className="form-control" value=" 1126 Sunrise Road, NV 89107"/>
                            </div>
                            <div className="col-sm-6">
                              <label>City</label>
                              <select data-placeholder="Choose City" className="form-control chosen-select" tabIndex="2">
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>Chicago</option>
                                <option>Phoenix</option>
                              </select>
                            </div>
                            <div className="col-sm-6">
                              <label>State</label>
                              <select data-placeholder="Choose State" className="form-control chosen-select" tabIndex="2">
                                <option>New York</option>
                                <option>Los Angeles</option>
                                <option>Chicago</option>
                                <option>Phoenix</option>
                              </select>
                            </div>
                            <div className="col-sm-6">
                              <label>Country</label>
                              <input type="text" className="form-control" value="India"/>
                            </div>
                            <div className="col-sm-6">
                              <label>Zip-Code</label>
                              <input type="text" className="form-control" value="2582 452 258"/>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div className="  full-detail mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-write theme-cl"></i>
                          <h3>Full Details</h3>
                          <p>Write full detail information about listing Owner</p>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Owner Name</label>
                              <input type="text" className="form-control"  value="Daniel Deve"/>
                            </div>

                            <div className="col-sm-6">
                              <label>Website</label>
                              <input type="text" className="form-control"  value="http://Www.listing.com"/>
                            </div>

                            <div className="col-sm-6">
                              <label>Owner Designation</label>
                              <input type="text" className="form-control"  value="Account Manager"/>
                            </div>

                            <div className="col-sm-6">
                              <label>Company</label>
                              <input type="text" className="form-control"  value="Info Soft Ltd"/>
                            </div>

                            <div className="col-sm-6">
                              <label><i className="fa fa-facebook mrg-r-5" aria-hidden="true"></i>Facebook Link</label>
                              <input type="text" className="form-control" value="https://www.facebook.com"/>
                            </div>

                            <div className="col-sm-6">
                              <label><i className="fa fa-twitter mrg-r-5" aria-hidden="true"></i>Twitter User</label>
                              <input type="text" className="form-control" value="https://www.twitter.com/"/>
                            </div>

                            <div className="col-sm-6">
                              <label><i className="fa fa-google-plus mrg-r-5" aria-hidden="true"></i>Google Plus</label>
                              <input type="text" className="form-control" value="https://www.twitter.com/"/>
                            </div>

                            <div className="col-sm-6">
                              <label><i className="fa fa-linkedin-square mrg-r-5" aria-hidden="true"></i>Linked In</label>
                              <input type="text" className="form-control" value="https://www.twitter.com/"/>
                            </div>

                            <div className="col-sm-12">
                              <label>Description</label>
                              <textarea className="h-100 form-control"></textarea>
                            </div>

                          </div>
                        </form>
                      </div>

                      <div className="  amenities mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-gift theme-cl"></i>
                          <h3>Amenities</h3>
                          <p>Write something general information about your listing</p>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-4">
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select1" Checked/>
                                <label for="select1"></label>
                                Alarm system
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select2"/>
                                <label for="select2"></label>
                                Depanneur in building
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select3" Checked/>
                                <label for="select3"></label>
                                Onsite management
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select4"/>
                                <label for="select4"></label>
                                Janitor
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select5" Checked/>
                                <label for="select5"></label>
                                Security cameras
                              </span>
                            </div>

                            <div className="col-sm-4">
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select6" Checked/>
                                <label for="select6"></label>
                                dLaundry room in building
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select7"/>
                                <label for="select7"></label>
                                Door attendant
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select8" Checked/>
                                <label for="select8"></label>
                                Street parking
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select9" Checked/>
                                <label for="select9"></label>
                                Intercom
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select10"/>
                                <label for="select10"></label>
                                Attached garage
                              </span>
                            </div>

                            <div className="col-sm-4">
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select11"/>
                                <label for="select11"></label>
                                Elevator
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select12" Checked/>
                                <label for="select12"></label>
                                Wheelchair accessible
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select13" Checked/>
                                <label for="select13"></label>
                                Heating
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select14"/>
                                <label for="select14"></label>
                                Hot water
                              </span>
                              <span className="custom-checkbox d-block">
                                <input type="checkbox" id="select15"/>
                                <label for="select15"></label>
                                Electricity
                              </span>
                            </div>

                          </div>
                        </form>
                      </div>

                      <div className="  opening-day mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-wallet theme-cl"></i>
                          <h3>Bank Accountd</h3>
                          <p>Remember, Your Password should not be easy and common</p>
                        </div>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-md-12">
                              <div className="pull-right">
                                <span className="custom-checkbox">
                                  <input type="checkbox" id="select16"/>
                                  <label for="select16"></label>
                                  Remember
                                </span>
                              </div>
                              <form>
                                <div className="row mrg-0">
                                  <div className="col-md-12 mob-padd-0">
                                    <div className="form-group">
                                      <label>CARD NUMBER</label>
                                      <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Valid Card Number"/>
                                        <span className="input-group-addon"><span className="glyphicon glyphicon-lock"></span></span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row mob-mrg-0 mrg-0 mrg-r-10 mrg-l-10">
                                  <div className="col-sm-12 col-md-7 padd-0">
                                    <div className="form-group">
                                      <div className="row mrg-r-10 mrg-l-10 mob-mrg-0">
                                        <label className="prizm">EXPIRY DATE</label>
                                        <div className="col-xs-6 col-lg-6 pl-ziro padd-0">
                                          <input type="text" className="form-control" placeholder="MM" />
                                        </div>
                                        <div className="col-xs-6 col-lg-6 pl-ziro padd-r-0">
                                          <input type="text" className="form-control" placeholder="YY" />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-5 col-sm-12 padd-l-5 padd-r-5 mob-padd-0">
                                    <div className="form-group">
                                      <label for="cvCode">
                                        CV CODE</label>
                                      <input type="password" className="form-control" id="cvCode" placeholder="CV" required />
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                      </div>


                      <div className="  opening-day mrg-bot-25 padd-bot-30 padd-top-25">
                        <div className="listing-box-header">
                          <i className="ti-lock theme-cl"></i>
                          <h3>Change Password</h3>
                          <p>Remember, Your Password should not be easy and common</p>
                        </div>
                        <form>
                          <div className="row mrg-r-10 mrg-l-10">
                            <div className="col-sm-6">
                              <label>Old Password</label>
                              <input type="text" className="form-control" value="*********"/>
                            </div>

                            <div className="col-sm-6">
                              <label>New Password</label>
                              <input type="text" className="form-control" value="*********"/>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="text-center">
                        <a href="#" className="btn theme-btn" title="Submit Listing">Update Profile</a>
                      </div>
                    </div>
                  </div>
                </section>)}
              </div>
            )
        }
    }

export default EditProfile;
