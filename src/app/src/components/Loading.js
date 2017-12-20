import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Loading.css'
import 'typeface-roboto'

export default class Connecting extends Component {
    static defaultProps = {
        message: 'Loading',
        showProgress: true
    }

    static propTypes = {
        message: PropTypes.string,
        showProgress: PropTypes.bool
    }

    state = {
        dots: 3
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({
                dots: this.state.dots === 3 ? 0 : this.state.dots + 1
            })
        }, 1000)
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }

    getProgress = () => this.props.showProgress ? '.'.repeat(this.state.dots) : ''

    render() {
        return (
            <div className="connecting-box">
                <div className="connecting-container">
                    <span className="connecting-dialog">
                        {`${this.props.message} ${this.getProgress()}`}
                    </span>
                </div>
            </div>
        )
    }
}