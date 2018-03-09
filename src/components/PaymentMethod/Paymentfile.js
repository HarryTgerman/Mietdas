<div className="detail-wrapper">
  <div className="detail-wrapper-header">
    <h4><i className="ti-credit-card theme-cl mrg-r-5 "></i>Payment Methode</h4>
  </div>
  <div className="detail-wrapper-body">
    {/* End Paypal Option */}
    <div className="payment-card">
      <header className="payment-card-header cursor-pointer" data-toggle="collapse" data-target="#paypal">
        <div className="payment-card-title flexbox">
          <h4>PayPal</h4>
        </div>
        <div className="pull-right">
          <img src={PaypalImg} className="img-responsive" alt="" />
        </div>
      </header>
      <div className="collapse" id="paypal">
        <div className="payment-card-body">
          <div className="row mrg-r-10 mrg-l-10">
            <div className="col-sm-6">
              <label>PayPal Name</label>
              <input type="text" className="form-control"/>
            </div>
            <div className="col-sm-6">
              <label>PayPal Email</label>
              <input type="email" className="form-control"/>
            </div>
            <div className="col-sm-6">
              <label>Phone No.</label>
              <input type="email" className="form-control"/>
            </div>
            <div className="col-sm-6">
              <label>Have A Coupon Code?</label>
              <input type="email" className="form-control"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Paypal Option */}

    {/* Debit & Credit Option */}
    <div className="payment-card">
      <header className="payment-card-header cursor-pointer" data-toggle="collapse" data-target="#debit-credit">
        <div className="payment-card-title flexbox">
          <h4>Credit / Debit Card</h4>
        </div>
        <div className="pull-right">
          <img src={CreditPng} className="img-responsive" alt="" />
        </div>
      </header>
      <div className="collapse" id="debit-credit">
        <div className="payment-card-body">
           <div className="row mrg-r-10 mrg-l-10">
            <div className="col-sm-6">
              <label>Card Holder Name</label>
              <input type="text" className="form-control" placeholder="Daniel Singh"/>
            </div>
            <div className="col-sm-6">
              <label>Card No.</label>
              <input type="email" className="form-control" placeholder="1235 4785 4758 1458"/>
            </div>
          </div>
          <div className="row mrg-r-10 mrg-l-10">
            <div className="col-sm-4 col-md-4">
              <label>Expire Month</label>
              <input type="text" className="form-control" placeholder="07"/>
            </div>
            <div className="col-sm-4 col-md-4">
              <label>Expire Year</label>
              <input type="email" className="form-control" placeholder="2020"/>
            </div>
            <div className="col-sm-4 col-md-4">
              <label>CCV Code</label>
              <input type="email" className="form-control" placeholder="258"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* End Debit & Credit Option */}

  </div>
</div>
</div>
