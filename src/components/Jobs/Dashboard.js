import React, { Component } from 'react'
import JobCard from './JobCard'
import ReactPaginate from "react-paginate";
import axios from 'axios'

const PER_PAGE = 20;

export default class Dashbaord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            currentPage: 0,
            pageCount: 1,
            isLoaded: false,
        }
    }
    renderCards= (curPage) =>{
        const headers = {
            'Authorization': JSON.parse(localStorage.getItem('tokens'))
        }
        console.log("currPage"+curPage)
        axios.get(`https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page=${parseInt(curPage)+1}`, {headers: headers}).then(
            res => {
                console.log(res)
                if(res.data.message==="No jobs posted"){
                }else{
                    this.setState({ jobs: (res.data.data.data.length > 0 ? ([...res.data.data.data]) : '' )});
                   
                }
            })
    }
    componentDidMount() {
        const headers = {
            'Authorization': JSON.parse(localStorage.getItem('tokens'))
        }
        axios.get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs?page="+1, {headers: headers}).then(
            res => {
                if(res.data.message==="No jobs posted"){
                }else{
                    this.setState({ jobs: (res.data.data.data.length > 0 ? ([...res.data.data.data]) : '' )})
                    let totalPages_pre = (res.data.data.metadata.count/res.data.data.metadata.limit);
                    let totalPages = (res.data.data.metadata.count % res.data.data.metadata.limit) == 0 ? totalPages_pre : totalPages_pre + 1;
                    console.log(parseInt(totalPages));
                    this.setState({pageCount: parseInt(totalPages)})
                }
            })
    }
    handlePageChange = (selectedObject) => {
		this.setState({currentPage: selectedObject.selected},()=>{
            this.renderCards(this.state.currentPage);
        });
		
	};
    render() {
    
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
                    <ReactPaginate 
					pageCount={this.state.pageCount}
					marginPagesDisplayed={3}
                    onPageChange={this.handlePageChange}
					containerClassName={'container-blue container-blue'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}
				/><br/>
                </div>
            </div>
        )
    }
}
