import React, { Component } from 'react'

export default class HomeMid extends Component {
    render() {
        return (
            <div>
                <div className="container mid">
                    <h3 className="h3-mid">Why Us</h3>
                    <div className="row">
                        <div className="col-md-4">
                            <div class="card mid-card-data">
                                <div class="card-body">
                                    <h4 class="card-title mid-card">Get More <br />Visibilty</h4>
                                    <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div class="card mid-card-data">
                                <div class="card-body">
                                    <h4 class="card-title mid-card">Organize Your <br />Candidates</h4>
                                    <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mid-card-data">
                                <div className="card-body">
                                    <h4 class="card-title mid-card">Verify Their <br />Ability</h4>
                                    <p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><h3 className="h3-mid">Companies Who Trust Us</h3><br />
                </div>
            </div>
        )
    }
}
