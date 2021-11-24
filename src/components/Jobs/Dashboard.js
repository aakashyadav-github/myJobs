import React, { Component } from 'react'
import JobCard from './JobCard'
import ReactPaginate from "react-paginate";
import axios from 'axios'

const PER_PAGE = 3;

export default class Dashbaord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            currentPage: 0,
            pageCount: 0,
        }
    }
    componentDidMount() {
        const headers = {
            'Authorization': JSON.parse(localStorage.getItem('tokens'))
        }
        axios.get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs", {headers: headers}).then(
            res => {
                console.log(res)
                if(res.data.message==="No jobs posted"){
                   
                }else{
                    this.setState({ jobs: (res.data.data.data.length > 0 ? ([...res.data.data.data]) : '' )})
                }
            })
    }
    // handlePageClick = (selectedPage) => {
    //     this.setState({currentPage: selectedPage});
    //   }
    render() {
        // const pageCount = Math.ceil(this.state.jobs.length / PER_PAGE);
        // const offset = this.state.currentPage * PER_PAGE;
        // const currentPageData = this.state.jobs
        // .slice(this.offset, this.offset + PER_PAGE)
        // .map(({ job }) => console.log(job));
    
        return (
            <div className="reactangle-dashboard">
                <div className="container">
                    <i className="fa fa-home " aria-hidden="true"></i><label className="text-dec">Home</label>
                    <h3 className="job-header">Jobs posted by you</h3>
                    <div className="row">{
                        this.state.jobs.length > 0 ?
                            this.state.jobs.map((job) => {
                                return (<JobCard jobData={job} />)
                            }) : (<h2>Your posted jobs will show here</h2>)
                    }

                    </div>
                    {/* <ReactPaginate
                        previousLabel={"← Previous"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={this.handlePageClick()}
                        containerClassName={"pagination"}
                        previousLinkClassName={"pagination__link"}
                        nextLinkClassName={"pagination__link"}
                        disabledClassName={"pagination__link--disabled"}
                        activeClassName={"pagination__link--active"}
                    /> */}
                </div>
            </div>
        )
    }
}
