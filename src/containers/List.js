import React, { Component } from 'react';
import Card from '../components/Card.js';
import '../assets/data.json';

class List extends Component {

	constructor() {
		super();
		this.state = {
			data: [],
			loading: true,
		};

		//this.loadMovies = this.loadMovies.bind(this);
	}

	loadMovies() {

		setTimeout(() => {

			fetch('data.json', 
				{
					method: 'GET',
					header: {
						'Content-Type': 'application/json'
					}
				})
			.then(movies => movies.json())
			.then(moviesJSON => {
				if (moviesJSON) { 
					this.setState({
						data: moviesJSON,
						loading: false
					});
				}
			});				
		},
		1000 * Math.random());		
	}

	componentDidMount() {
		this.loadMovies();
	}

	render() {

		const { data, loading } = this.state;

		if (loading) {
			return ( 
			<div className="spinner-border" role="status">
				<span className="sr-only">Loading...</span>
			</div>);
		}

		return (
			<div className='row'>
				{
					data.map(movie => 
						<div key={ movie.id } className='col-sm-2'>
							<Card movie={ movie } />
						</div>)
				}
			</div>
		);
	}
} 

export default List;